import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminToolbar } from "./AdminToolbar.js";

test("AdminToolbar groups filters and actions under one label", () => {
  const html = renderToStaticMarkup(
    <AdminToolbar label="Enrollment filters" actions={<button>Export</button>}>
      <input aria-label="Search" />
    </AdminToolbar>,
  );
  assert.match(html, /^<div class="si-admin-toolbar" role="group" aria-label="Enrollment filters">/);
  assert.match(html, /si-admin-toolbar-filters"><input aria-label="Search"\/>/);
  assert.match(html, /si-admin-toolbar-actions"><button>Export<\/button>/);
});

test("AdminToolbar without actions renders no empty action area", () => {
  assert.ok(!renderToStaticMarkup(<AdminToolbar>x</AdminToolbar>).includes("si-admin-toolbar-actions"));
});
