import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "./Footer.js";

const props = {
  logoSrc: "/logo-white.png",
  year: 2026,
  contact: {
    name: "Pat Example",
    role: "Coordinator",
    phone: { label: "555.010.0100", href: "tel:+15550100100" },
    email: { label: "pat@example.org", href: "mailto:pat@example.org" },
    site: { label: "example.org", href: "https://example.org" },
  },
  columns: [
    { title: "Compete", links: [{ href: "/standings", label: "Standings" }] },
    { title: "Info", accent: "gray" as const, links: [{ href: "https://club.example.org", label: "Club" }] },
  ],
  legalLinks: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

test("Footer shows the white logo, the contact line and two link columns", () => {
  const html = renderToStaticMarkup(<Footer {...props} />);
  assert.match(html, /^<footer class="si-footer" id="contact">/);
  assert.match(html, /<img class="si-footer__logo" src="\/logo-white.png" alt="127 Sports Intensity" width="200" height="33" loading="lazy"\/>/);
  assert.match(html, /<strong>Pat Example<\/strong>, Coordinator<br\/>/);
  assert.match(html, /<a href="tel:\+15550100100">555.010.0100<\/a>/);
  assert.match(html, /<a href="mailto:pat@example.org">pat@example.org<\/a>/);
  assert.match(html, /<a href="https:\/\/example.org" rel="noopener noreferrer">example.org<\/a>/);
  assert.match(html, /<div class="si-footer__col is-white"><h2 class="si-footer__col-title">Compete<\/h2>/);
  assert.match(html, /<div class="si-footer__col is-gray"><h2 class="si-footer__col-title">Info<\/h2>/);
});

test("Footer legal bar carries the year passed in and the legal links", () => {
  const html = renderToStaticMarkup(<Footer {...props} />);
  assert.match(html, /<p>© 2026 127 Sports Intensity<\/p>/);
  assert.match(html, /<nav aria-label="Footer"><span><a href="\/privacy">Privacy<\/a><\/span><span><a href="\/terms">Terms<\/a><\/span><\/nav>/);
});

test("Footer back-to-top link is hidden from keyboard and screen readers until it shows", () => {
  const html = renderToStaticMarkup(<Footer {...props} />);
  assert.match(html, /<a href="#top" class="si-back-to-top" aria-label="Back to top" aria-hidden="true" tabindex="-1">/);
  assert.ok(!renderToStaticMarkup(<Footer {...props} backToTop={false} />).includes("si-back-to-top"));
});

test("Footer uses the app link component for internal links and a plain link for other sites", () => {
  const Router = (p: { href: string; children?: unknown }) => (
    <a data-router="yes" href={p.href}>
      {p.children as never}
    </a>
  );
  const html = renderToStaticMarkup(<Footer {...props} LinkComponent={Router} patternSrc="/pattern-3.png" />);
  assert.match(html, /<a data-router="yes" href="\/standings">Standings<\/a>/);
  assert.match(html, /<a href="https:\/\/club.example.org" rel="noopener noreferrer">Club<\/a>/);
  assert.match(html, /class="si-footer__pattern" aria-hidden="true" style="--si-footer-pattern:url\(&quot;\/pattern-3.png&quot;\)"/);
});
