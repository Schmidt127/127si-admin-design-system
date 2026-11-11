// The built package (dist/), as a consumer sees it through the exports map.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as ds from "@127si/design-system";

const require = createRequire(import.meta.url);
const css = (entry) => readFileSync(require.resolve(`@127si/design-system/${entry}`), "utf8");

// Everything the pre-v1 package exposed. Removing any of these is a breaking change (v2).
const LEGACY_EXPORTS = ["adminTheme", "platformLabel", "AdminShell", "AdminHeader", "AdminSidebar", "AdminPageHeader", "AdminCard", "AdminButton", "AdminStatusBadge", "AdminTable"];
const LEGACY_VARIABLES = ["navy", "blue", "orange", "ink", "muted", "wash", "line", "radius-sm", "radius-md", "radius-lg", "shadow-sm", "shadow-md", "sidebar-width"];
const LEGACY_CLASSES = [
  "si-admin-shell", "si-admin-sidebar", "si-admin-brand", "si-admin-brand-mark", "si-admin-platform-label", "si-admin-nav", "si-admin-nav-link",
  "si-admin-nav-icon", "si-admin-main", "si-admin-header", "si-admin-eyebrow", "si-admin-header-label", "si-admin-content", "si-admin-page-header",
  "si-admin-page-actions", "si-admin-header-actions", "si-admin-card-actions", "si-admin-card", "si-admin-card-header", "si-admin-card-body",
  "si-admin-button", "si-admin-status", "si-admin-table-wrap", "si-admin-table", "si-admin-empty", "si-admin-footer",
];

test("pre-v1 exports still exist", () => {
  for (const name of LEGACY_EXPORTS) assert.ok(ds[name], `missing export ${name}`);
  assert.equal(ds.platformLabel("content"), "127SI CONTENT ADMIN");
  assert.equal(ds.platformLabel("challenge"), "127SI CHALLENGE ADMIN");
});

test("every platform has an admin label", () => {
  for (const platform of ["challenge", "referee", "curriculum", "communication", "content", "shared-data", "tst", "bracket"]) {
    assert.match(ds.platformLabel(platform), /^127SI .+ ADMIN$/);
  }
});

test("pre-v1 --127si-* variables are aliases of v1 tokens", () => {
  const tokens = css("tokens.css");
  for (const name of LEGACY_VARIABLES) assert.match(tokens, new RegExp(`--127si-${name}:\\s*var\\(--si-`), `--127si-${name}`);
});

test("pre-v1 .si-admin-* classes are still styled", () => {
  const styles = css("styles.css");
  for (const name of LEGACY_CLASSES) assert.ok(styles.includes(`.${name}`), `.${name}`);
});

test("styles.css is tokens.css plus components.css, and tokens.css has no component rules", () => {
  assert.ok(!css("tokens.css").includes(".si-admin-"));
  assert.ok(css("styles.css").includes("--si-blue: #0034b7"));
  assert.ok(css("components.css").includes(".si-admin-shell"));
});

test("fonts.css points at font files that ship", () => {
  const fonts = css("fonts.css");
  const files = [...fonts.matchAll(/url\("\.\/fonts\/([^"]+)"\)/g)].map((m) => m[1]);
  assert.equal(files.length, 10);
  for (const file of files) assert.ok(require.resolve(`@127si/design-system/fonts/${file}`));
});

test("brand assets and the deprecated v1.0 logo paths resolve", () => {
  for (const file of ["assets/logos/logo-white.png", "assets/stamps/stamp-1.png", "assets/patterns/pattern-3.png", "assets/manifest.json", "logos/127si-logo.png", "logos/127si-logo-white.png"]) {
    assert.ok(require.resolve(`@127si/design-system/${file}`), file);
  }
});

test("built components render on the server", () => {
  const html = renderToStaticMarkup(
    React.createElement(ds.AdminShell, { platform: "challenge", navigation: [{ href: "/admin", label: "Overview" }], activeHref: "/admin" }, "child"),
  );
  assert.match(html, /127SI CHALLENGE ADMIN/);
  assert.match(html, /data-si-surface="admin"/);
});
