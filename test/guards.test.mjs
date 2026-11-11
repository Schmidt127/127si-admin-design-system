// Structure rules for this repository: one folder per component, tokens only in component CSS.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");
const folders = readdirSync(new URL("components/", root), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
  .map((entry) => entry.name);

const defined = new Set([...(read("brand/tokens.css") + read("brand/themes/tst.css")).matchAll(/(--si-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
// Provided by the consuming app through next/font; tokens fall back to the package fonts.
const EXTERNAL = new Set(["--font-si-display", "--font-si-body", "--font-si-data"]);

test("there is at least one component folder", () => assert.ok(folders.length > 0));

for (const folder of folders) {
  const files = readdirSync(new URL(`components/${folder}/`, root));

  test(`components/${folder} has a component, styles, rules and a test`, () => {
    assert.ok(files.some((f) => /^[A-Z].*\.tsx$/.test(f) && !f.includes(".test.")), "component .tsx");
    assert.ok(files.includes(`${folder}.css`), `${folder}.css`);
    assert.ok(files.includes("RULES.md"), "RULES.md");
    assert.ok(files.includes(`${folder}.test.tsx`), `${folder}.test.tsx`);
    const rules = read(`components/${folder}/RULES.md`);
    for (const heading of ["## What it is for", "## When to use it", "## What may vary", "## What may not vary"]) {
      assert.ok(rules.includes(heading), `RULES.md is missing "${heading}"`);
    }
  });

  test(`components/${folder} CSS uses brand tokens only`, () => {
    for (const file of files.filter((f) => f.endsWith(".css"))) {
      const text = read(`components/${folder}/${file}`).replace(/\/\*[\s\S]*?\*\//g, "");
      assert.equal(text.match(/#[0-9a-fA-F]{3,8}\b/g), null, `${file}: raw hex colour`);
      assert.equal(text.match(/\b(rgb|rgba|hsl|hsla|oklch)\(/g), null, `${file}: raw colour function`);
      assert.equal(text.match(/font-family\s*:(?!\s*(?:var\(|inherit))/g), null, `${file}: raw font family`);
      for (const m of text.matchAll(/var\((--[a-z0-9-]+)/g)) {
        assert.ok(defined.has(m[1]) || EXTERNAL.has(m[1]), `${file}: ${m[1]} is not a brand token`);
      }
    }
  });
}

test("brand tokens only reference tokens that exist", () => {
  const text = read("brand/tokens.css") + read("brand/themes/tst.css") + read("brand/legacy.css");
  for (const m of text.matchAll(/var\((--[a-z0-9-]+)/g)) assert.ok(defined.has(m[1]) || EXTERNAL.has(m[1]), `${m[1]} is not defined`);
});

// Admin helper text sits on the tinted admin background (--si-color-surface-alt). The muted role is
// only readable on white, and an app may render .si-admin-* markup without data-si-surface="admin".
test("admin text on the tinted background does not use the muted role", () => {
  const onTint = [".si-admin-footer", ".si-admin-page-header p", ".si-admin-eyebrow", ".si-admin-status "];
  const css = folders.flatMap((folder) => readdirSync(new URL(`components/${folder}/`, root)).filter((f) => f.endsWith(".css")).map((f) => read(`components/${folder}/${f}`))).join("\n");
  for (const selector of onTint) {
    const rule = css.split(/\r?\n/).find((line) => line.startsWith(selector));
    assert.ok(rule, `${selector} rule not found`);
    assert.ok(!rule.includes("var(--si-color-text-muted)"), `${selector} uses --si-color-text-muted`);
  }
});

test("the package has no runtime dependencies and no install scripts", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies, undefined);
  for (const script of ["prepare", "preinstall", "install", "postinstall"]) assert.equal(pkg.scripts[script], undefined, script);
});

test("sources do not import Next.js or a CSS framework", () => {
  for (const folder of folders) {
    for (const file of readdirSync(new URL(`components/${folder}/`, root)).filter((f) => /\.tsx?$/.test(f))) {
      assert.equal(read(`components/${folder}/${file}`).match(/from\s+["'](next|next\/[^"']+|tailwindcss[^"']*)["']/), null, `${folder}/${file}`);
    }
  }
});
