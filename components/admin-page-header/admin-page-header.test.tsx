import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminPageHeader } from "./AdminPageHeader.js";

test("AdminPageHeader renders one h1, with optional eyebrow, description and actions", () => {
  const html = renderToStaticMarkup(<AdminPageHeader eyebrow="Winter" title="Enrollments" description="Everyone registered." actions={<button>New</button>} />);
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.match(html, /<h1>Enrollments<\/h1>/);
  assert.match(html, /si-admin-eyebrow">Winter/);
  assert.match(html, /<p>Everyone registered\.<\/p>/);
  assert.match(html, /si-admin-page-actions"><button>New<\/button>/);
});

test("AdminPageHeader omits optional parts", () => {
  const html = renderToStaticMarkup(<AdminPageHeader title="Only a title" />);
  assert.ok(!html.includes("si-admin-eyebrow"));
  assert.ok(!html.includes("si-admin-page-actions"));
  assert.ok(!html.includes("<p>"));
});
