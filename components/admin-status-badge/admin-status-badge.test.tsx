import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminStatusBadge } from "./AdminStatusBadge.js";

test("AdminStatusBadge turns the status into a class and shows the word", () => {
  assert.equal(renderToStaticMarkup(<AdminStatusBadge status="Published" />), '<span class="si-admin-status is-published">Published</span>');
  assert.equal(renderToStaticMarkup(<AdminStatusBadge status="needs review" />), '<span class="si-admin-status is-needs-review">needs review</span>');
});

test("AdminStatusBadge can show a different label than its status", () => {
  assert.equal(renderToStaticMarkup(<AdminStatusBadge status="paid">Paid in full</AdminStatusBadge>), '<span class="si-admin-status is-paid">Paid in full</span>');
});

test("AdminStatusBadge reads the status from a text child", () => {
  assert.equal(renderToStaticMarkup(<AdminStatusBadge>Draft</AdminStatusBadge>), '<span class="si-admin-status is-draft">Draft</span>');
});
