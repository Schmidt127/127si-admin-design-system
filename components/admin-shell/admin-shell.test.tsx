import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminHeader, AdminShell, AdminSidebar } from "./AdminShell.js";

const navigation = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/people", label: "People" },
];

test("AdminShell renders sidebar, header, content and footer on the admin surface", () => {
  const html = renderToStaticMarkup(
    <AdminShell platform="challenge" navigation={navigation} activeHref="/admin/people" footer="Footer text">
      <p>Page</p>
    </AdminShell>,
  );
  assert.match(html, /data-si-surface="admin"/);
  assert.match(html, /<aside class="si-admin-sidebar">/);
  assert.match(html, /<main class="si-admin-main">/);
  assert.match(html, /127SI CHALLENGE ADMIN/);
  assert.match(html, /<p>Page<\/p>/);
  assert.match(html, /<footer class="si-admin-footer">Footer text<\/footer>/);
});

test("AdminSidebar marks the active link for assistive technology", () => {
  const html = renderToStaticMarkup(<AdminSidebar platform="referee" navigation={navigation} activeHref="/admin/people" />);
  assert.match(html, /<nav class="si-admin-nav" aria-label="Admin navigation">/);
  assert.match(html, /href="\/admin\/people" class="si-admin-nav-link is-active" aria-current="page"/);
  assert.equal((html.match(/aria-current/g) || []).length, 1);
});

test("an unknown platform falls back to a generic label instead of crashing", () => {
  assert.match(renderToStaticMarkup(<AdminHeader platform="something-new" />), /127SI ADMIN/);
});

test("every platform has its own label", () => {
  for (const platform of ["challenge", "referee", "curriculum", "communication", "content", "shared-data", "tst", "bracket"]) {
    assert.match(renderToStaticMarkup(<AdminHeader platform={platform} />), /127SI [A-Z ]+ ADMIN/);
  }
});
