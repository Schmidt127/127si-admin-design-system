import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminCard } from "./AdminCard.js";

test("AdminCard renders a section with a header and body", () => {
  const html = renderToStaticMarkup(
    <AdminCard title="Recent" description="Last seven days" actions={<a href="/all">All</a>} className="wide">
      <p>Body</p>
    </AdminCard>,
  );
  assert.match(html, /<section class="si-admin-card wide">/);
  assert.match(html, /<h2>Recent<\/h2><p>Last seven days<\/p>/);
  assert.match(html, /si-admin-card-actions"><a href="\/all">All<\/a>/);
  assert.match(html, /si-admin-card-body"><p>Body<\/p>/);
});

test("AdminCard without a title or actions has no header", () => {
  assert.ok(!renderToStaticMarkup(<AdminCard>Body</AdminCard>).includes("si-admin-card-header"));
});
