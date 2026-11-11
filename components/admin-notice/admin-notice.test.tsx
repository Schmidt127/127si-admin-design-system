import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminNotice } from "./AdminNotice.js";

test("AdminNotice is a polite status by default", () => {
  assert.equal(
    renderToStaticMarkup(<AdminNotice title="Saved">Changes are live.</AdminNotice>),
    '<div class="si-admin-notice is-info" role="status"><strong class="si-admin-notice-title">Saved</strong><div class="si-admin-notice-body">Changes are live.</div></div>',
  );
});

test("AdminNotice announces warnings and errors immediately", () => {
  for (const tone of ["warning", "danger"] as const) {
    assert.match(renderToStaticMarkup(<AdminNotice tone={tone}>x</AdminNotice>), new RegExp(`is-${tone}" role="alert"`));
  }
  assert.match(renderToStaticMarkup(<AdminNotice tone="success">x</AdminNotice>), /is-success" role="status"/);
});
