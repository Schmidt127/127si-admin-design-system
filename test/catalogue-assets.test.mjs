// Catalogue HTML must resolve fonts, styles and assets from dist/ (open dist/catalogue/index.html or serve dist/ at web root).
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const distPath = fileURLToPath(new URL("../dist/", import.meta.url));
const html = readFileSync(new URL("../dist/catalogue/index.html", import.meta.url), "utf8");

test("catalogue sets base href so styles resolve from dist/", () => {
  assert.match(html, /<base href="\.\.\/">/);
  assert.match(html, /<link rel="stylesheet" href="fonts\.css">/);
  assert.match(html, /<link rel="stylesheet" href="styles\.css">/);
});

test("catalogue stylesheet and asset links exist on disk", () => {
  for (const rel of ["fonts.css", "styles.css", "components.css", "assets/logos/logo-white.png"]) {
    assert.ok(existsSync(path.join(distPath, rel)), `missing dist/${rel}`);
  }
});

test("catalogue includes the DataTable example markup", () => {
  assert.match(html, /si-dt-directory__band/);
  assert.match(html, /si-data-table is-premium/);
  assert.match(html, /Youth Participants/);
});

test("built standalone DataTable demo html exists for screenshots", () => {
  const demo = readFileSync(new URL("../dist/demos/youth-participant-datatable.html", import.meta.url), "utf8");
  assert.match(demo, /si-dt-directory__band/);
  assert.match(demo, /href="\.\.\/styles\.css"/);
});