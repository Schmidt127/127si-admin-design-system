import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TopNav } from "./TopNav.js";

const links = [
  { href: "/programs", label: "Programs" },
  { href: "/standings", label: "Standings" },
  { href: "https://example.org", label: "Club", external: true },
  {
    href: "#help",
    label: "Help",
    children: [
      { href: "/faq", label: "FAQ" },
      { href: "mailto:coach@example.org", label: "Contact" },
    ],
  },
];

const html = renderToStaticMarkup(
  <TopNav logoSrc="/logo.png" badge="Challenges" links={links} action={{ href: "/login", label: "Parent Login" }} activeHref="/standings" />,
);

test("TopNav shows the logo lockup with the platform badge directly beneath it", () => {
  assert.match(
    html,
    /<a href="\/" class="si-top-nav__lockup"><img class="si-top-nav__logo" src="\/logo.png" alt="127 Sports Intensity" width="143" height="24"\/><span class="si-platform-badge">Challenges<\/span><\/a>/,
  );
});

test("TopNav marks only the current page link", () => {
  assert.match(html, /<a href="\/standings" class="si-top-nav__link" aria-current="page">Standings<\/a>/);
  assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
});

test("TopNav opens external links safely and keeps mailto links plain", () => {
  assert.match(html, /<a href="https:\/\/example.org" class="si-top-nav__link" target="_blank" rel="noopener noreferrer">Club<\/a>/);
  assert.match(html, /<a href="mailto:coach@example.org">Contact<\/a>/);
});

test("TopNav renders a dropdown as a details menu and the single action as a button-styled link", () => {
  assert.match(html, /<details class="si-top-nav__menu"><summary class="si-top-nav__link">Help<\/summary>/);
  assert.match(html, /<a href="\/login" class="si-top-nav__action">Parent Login<\/a>/);
});

test("TopNav phone menu button is labelled, starts closed and controls the menu", () => {
  assert.match(html, /<button type="button" class="si-top-nav__toggle" aria-expanded="false" aria-controls="[^"]+-menu">/);
  assert.match(html, /<span class="si-visually-hidden">Open menu<\/span>/);
  assert.ok(!html.includes("si-top-nav__sheet"));
});

test("TopNav phone menu lists every link, the dropdown and the action, in order", () => {
  const open = renderToStaticMarkup(<TopNav logoSrc="/logo.png" badge="Challenges" links={links} action={{ href: "/login", label: "Parent Login" }} defaultOpen />);
  const sheet = open.slice(open.indexOf("si-top-nav__sheet"));
  assert.match(open, /aria-expanded="true"/);
  assert.match(sheet, /<nav aria-label="Mobile primary">/);
  const order = [">Programs<", ">Standings<", ">Club<", ">Help<", ">FAQ<", ">Parent Login<"].map((label) => sheet.indexOf(label));
  assert.ok(order.every((position) => position > -1));
  assert.deepEqual([...order].sort((a, b) => a - b), order);
});

test("TopNav uses the app link component for internal links only", () => {
  const Router = (props: { href: string; className?: string; children?: unknown }) => (
    <a data-router="yes" href={props.href} className={props.className}>
      {props.children as never}
    </a>
  );
  const routed = renderToStaticMarkup(<TopNav logoSrc="/logo.png" badge="Referee" links={links} LinkComponent={Router} />);
  assert.match(routed, /<a data-router="yes" href="\/programs" class="si-top-nav__link">Programs/);
  assert.ok(!/data-router="yes" href="https:/.test(routed));
  assert.ok(!routed.includes('class="si-top-nav__action"'));
});

test("TopNav logo keeps its natural proportions (fixed width, automatic height)", () => {
  const css = readFileSync(new URL("./top-nav.css", import.meta.url), "utf8");
  assert.match(css, /\.si-top-nav__logo \{ width: 9rem; max-width: 100%; height: auto;/);
});
