import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminButton } from "./AdminButton.js";

test("AdminButton is a primary button by default", () => {
  assert.equal(renderToStaticMarkup(<AdminButton type="submit">Save</AdminButton>), '<button class="si-admin-button is-primary" type="submit">Save</button>');
});

test("AdminButton supports every variant", () => {
  for (const variant of ["primary", "secondary", "ghost", "accent", "danger"] as const) {
    assert.match(renderToStaticMarkup(<AdminButton variant={variant}>x</AdminButton>), new RegExp(`is-${variant}`));
  }
});

test("AdminButton renders as a link and keeps extra classes and props", () => {
  const html = renderToStaticMarkup(
    <AdminButton as="a" href="/admin/new" variant="secondary" className="extra">
      New
    </AdminButton>,
  );
  assert.equal(html, '<a class="si-admin-button is-secondary extra" href="/admin/new">New</a>');
});
