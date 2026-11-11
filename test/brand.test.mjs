// Brand tokens: Brand System v4 values, the TST theme, and readable contrast for the pairs components use.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

/** Declarations inside the first block whose selector matches. */
function block(cssText, selector) {
  const start = cssText.indexOf(selector + " {");
  assert.ok(start !== -1, `selector ${selector} not found`);
  const body = cssText.slice(cssText.indexOf("{", start) + 1, cssText.indexOf("}", start));
  const out = {};
  for (const m of body.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

const base = block(read("brand/tokens.css"), ":root");
const themes = {
  default: base,
  tst: { ...base, ...block(read("brand/themes/tst.css"), '[data-si-theme="tst"]') },
};

function resolve(vars, value, depth = 0) {
  assert.ok(depth < 12, `variable loop at ${value}`);
  const m = /^var\((--[a-z0-9-]+)\)$/.exec(value);
  if (!m) return value;
  assert.ok(vars[m[1]], `${m[1]} is not defined`);
  return resolve(vars, vars[m[1]], depth + 1);
}

function luminance(hex) {
  const n = hex.replace("#", "");
  const full = n.length === 3 ? [...n].map((c) => c + c).join("") : n;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test("palette is Brand System v4", () => {
  const expected = {
    "--si-blue": "#0034b7", "--si-blue-hover": "#002a94", "--si-blue-deep": "#001f6b", "--si-blue-light": "#e8f0ff",
    "--si-orange": "#ff8b00", "--si-orange-hover": "#d97700", "--si-orange-light": "#fff1dc",
    "--si-black": "#262626", "--si-gray": "#c4c4c4", "--si-gray-light": "#f2f2f2", "--si-white": "#ffffff",
    "--si-teal": "#0f766e", "--si-teal-light": "#e6fffa", "--si-gold": "#f5b301", "--si-gold-light": "#fff7d6",
    "--si-success": "#15803d", "--si-warning": "#d97706", "--si-danger": "#dc2626", "--si-muted": "#64748b",
  };
  for (const [name, hex] of Object.entries(expected)) assert.equal(base[name], hex, name);
});

test("primary button is blue with white text; TST is amber with black text", () => {
  assert.equal(resolve(themes.default, "var(--si-color-border)"), "#c4c4c4");
  assert.equal(resolve(themes.default, "var(--si-color-primary)"), "#0034b7");
  assert.equal(resolve(themes.default, "var(--si-color-on-primary)"), "#ffffff");
  assert.equal(resolve(themes.tst, "var(--si-color-primary)"), "#ffb000");
  assert.equal(resolve(themes.tst, "var(--si-color-on-primary)"), "#121417");
  assert.equal(resolve(themes.tst, "var(--si-color-accent)"), "#d62839");
  assert.equal(resolve(themes.tst, "var(--si-color-surface-alt)"), "#f5f5f2");
});

// [foreground, background, minimum ratio]. 4.5 for text, 3 for large text and UI boundaries.
const PAIRS = [
  ["--si-color-on-primary", "--si-color-primary", 4.5],
  ["--si-color-on-primary", "--si-color-primary-hover", 4.5],
  ["--si-color-on-accent", "--si-color-accent", 4.5],
  ["--si-color-on-accent", "--si-color-accent-hover", 4.5],
  ["--si-color-text", "--si-color-surface", 4.5],
  ["--si-color-text", "--si-color-surface-alt", 4.5],
  ["--si-color-text-muted", "--si-color-surface", 4.5],
  ["--si-color-text-subtle", "--si-color-surface-alt", 4.5],
  ["--si-color-heading", "--si-color-surface", 4.5],
  ["--si-color-link", "--si-color-surface", 4.5],
  ["--si-color-link", "--si-color-primary-soft", 4.5],
  ["--si-color-accent-text", "--si-color-surface", 4.5],
  ["--si-color-on-shell", "--si-color-shell", 4.5],
  ["--si-color-on-shell", "--si-color-shell-deep", 4.5],
  ["--si-color-accent", "--si-color-shell-deep", 3],
  ["--si-color-on-table-head", "--si-color-table-head", 4.5],
  ["--si-color-success", "--si-color-success-soft", 4.5],
  ["--si-color-warning-text", "--si-color-warning-soft", 4.5],
  ["--si-color-danger-text", "--si-color-danger-soft", 4.5],
  ["--si-color-danger", "--si-color-surface", 4.5],
  ["--si-white", "--si-color-danger", 4.5],
  ["--si-color-border-strong", "--si-color-surface", 3],
];

for (const [name, vars] of Object.entries(themes)) {
  test(`contrast holds in the ${name} theme`, () => {
    for (const [fg, bg, min] of PAIRS) {
      const ratio = contrast(resolve(vars, `var(${fg})`), resolve(vars, `var(${bg})`));
      assert.ok(ratio >= min, `${fg} on ${bg} is ${ratio.toFixed(2)}, needs ${min} (${name})`);
    }
  });
}

test("the TST theme only overrides tokens that exist, plus its own --si-tst-* palette", () => {
  for (const name of Object.keys(block(read("brand/themes/tst.css"), '[data-si-theme="tst"]'))) {
    assert.ok(name.startsWith("--si-tst-") || name in base, `${name} is not a base token`);
  }
});
