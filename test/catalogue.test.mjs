// Accessibility check of the catalogue page (every component in every theme) with axe-core.
// jsdom has no layout, so colour contrast is covered by test/brand.test.mjs instead.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { JSDOM } from "jsdom";

const require = createRequire(import.meta.url);
const html = readFileSync(new URL("../dist/catalogue/index.html", import.meta.url), "utf8");

test("catalogue shows both themes and every component folder", () => {
  assert.match(html, /data-si-theme="tst"/);
  for (const name of ["admin-shell", "admin-page-header", "admin-card", "admin-button", "admin-status-badge", "admin-table"]) {
    assert.ok(html.includes(`components/${name}`), name);
  }
});

test("catalogue has no axe violations", async () => {
  const dom = new JSDOM(html, { runScripts: "outside-only", pretendToBeVisual: true });
  dom.window.eval(readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"));
  const results = await dom.window.axe.run(dom.window.document, {
    rules: { "color-contrast": { enabled: false }, "landmark-unique": { enabled: false }, "landmark-no-duplicate-main": { enabled: false }, "landmark-main-is-top-level": { enabled: false } },
  });
  const summary = results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length}) ${v.nodes[0]?.html?.slice(0, 120)}`);
  assert.equal(summary.join("\n"), "");
});
