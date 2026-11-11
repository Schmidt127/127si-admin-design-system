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

test("AdminShell takes the logo, the app link component, a sidebar footer, header content and a skip target", () => {
  const Link = ({ href, className, children, ...rest }: { href: string; className?: string; children?: unknown }) => (
    <a data-router="yes" href={href} className={className} {...rest}>
      {children as never}
    </a>
  );
  const html = renderToStaticMarkup(
    <AdminShell
      platform="communication"
      logoSrc="/logo-white.png"
      LinkComponent={Link}
      navigation={[
        { href: "/admin", label: "Console" },
        { href: "/api/health", label: "Health JSON", external: true },
      ]}
      activeHref="/admin"
      sidebarFooter={<a href="/">Public home</a>}
      headerEyebrow="127 SI / Communications"
      headerTitle="Operations workspace"
      headerActions={<span>Internal operations</span>}
      contentId="main-content"
    >
      <p>Page</p>
    </AdminShell>,
  );
  assert.match(html, /<a data-router="yes" href="\/admin" class="si-admin-brand si-admin-brand--logo"><img class="si-admin-brand-image" src="\/logo-white.png" alt="127 Sports Intensity"/);
  assert.ok(!html.includes("si-admin-brand-mark"));
  assert.match(html, /<a data-router="yes" href="\/admin" class="si-admin-nav-link is-active" aria-current="page">Console/);
  assert.match(html, /<a href="\/api\/health" class="si-admin-nav-link">Health JSON/);
  assert.match(html, /si-admin-sidebar-footer"><a href="\/">Public home/);
  assert.match(html, /si-admin-eyebrow">127 SI \/ Communications/);
  assert.match(html, /si-admin-header-label">Operations workspace/);
  assert.match(html, /si-admin-header-actions"><span>Internal operations/);
  assert.match(html, /<div class="si-admin-content" id="main-content" tabindex="-1">/);
});

test("an unknown platform falls back to a generic label instead of crashing", () => {
  assert.match(renderToStaticMarkup(<AdminHeader platform="something-new" />), /127SI ADMIN/);
});

test("every platform has its own label", () => {
  for (const platform of ["challenge", "referee", "curriculum", "communication", "content", "shared-data", "tst", "bracket"]) {
    assert.match(renderToStaticMarkup(<AdminHeader platform={platform} />), /127SI [A-Z ]+ ADMIN/);
  }
});
