import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminButton } from "../components/admin-button/AdminButton.js";
import { AdminCard } from "../components/admin-card/AdminCard.js";
import { AdminField, AdminFormSection } from "../components/admin-field/AdminField.js";
import { AdminNotice } from "../components/admin-notice/AdminNotice.js";
import { AdminPager } from "../components/admin-pager/AdminPager.js";
import { AdminToolbar } from "../components/admin-toolbar/AdminToolbar.js";
import { Footer } from "../components/footer/Footer.js";
import { HeroCarousel } from "../components/hero-carousel/HeroCarousel.js";
import { TopNav } from "../components/top-nav/TopNav.js";
import { AdminPageHeader } from "../components/admin-page-header/AdminPageHeader.js";
import { AdminShell } from "../components/admin-shell/AdminShell.js";
import { AdminStatusBadge } from "../components/admin-status-badge/AdminStatusBadge.js";
import { AdminTable } from "../components/admin-table/AdminTable.js";

const PALETTE = [
  "blue", "blue-hover", "blue-deep", "blue-light", "orange", "orange-hover", "orange-light", "orange-text",
  "black", "gray", "gray-light", "white", "teal", "teal-light", "gold", "gold-light",
  "success", "warning", "danger", "muted", "slate", "line",
];
const ROLES = [
  "primary", "primary-hover", "on-primary", "primary-soft", "accent", "accent-hover", "on-accent", "accent-soft",
  "accent-text", "text", "text-muted", "heading", "link", "surface", "surface-alt", "border", "border-soft", "border-strong",
  "shell", "shell-deep", "on-shell", "table-head", "on-table-head", "row-hover", "row-selected",
  "success", "success-soft", "warning", "warning-soft", "danger", "danger-soft", "focus",
];
const TYPE = [
  ["display", "Saira 800", "var(--si-font-display)", 800, "Hero and section headings, navigation. Free replacement for the brand kit display font, Magistral"],
  ["body", "Maven Pro 400", "var(--si-font-body)", 400, "Brand kit supporting font. Public body text, forms and parent pages"],
  ["data", "Source Sans 3 400", "var(--si-font-data)", 400, "Admin screens and dense tables"],
  ["mono", "System monospace", "var(--si-font-mono)", 400, "Codes and IDs"],
] as const;
const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
const SPACES = ["1", "2", "3", "4", "5", "6", "7", "8"];
const RADII = ["xs", "sm", "md", "lg", "xl", "pill"];
const KIT = ["blue", "orange", "black", "gray", "gray-light"];
const LOGOS = [
  ["logos/logo-full-color.png", "Full colour lockup", false],
  ["logos/logo-white.png", "White lockup (on blue, black or photos)", true],
  ["logos/logo-circle.png", "Circular mark", false],
  ["logos/logo-v1-black.png", "Black lockup, version 1", false],
  ["logos/logo-v2-black.png", "Black lockup, version 2", false],
  ["logos/logo-text-black.png", "Black wordmark", false],
  ["logos/logo-icon-black.png", "Black symbol", false],
] as const;
const STAMPS = ["1", "2", "3", "4", "5", "6", "7"];
const PATTERNS = ["2", "3", "4", "5"];

const rows = [
  { name: "Ava Jensen", school: "Fairfield", status: "paid" },
  { name: "Noah Lund", school: "Choteau", status: "pending" },
  { name: "Mia Ortiz", school: "Power", status: "failed" },
];

function Swatches({ prefix, names }: { prefix: string; names: string[] }) {
  return (
    <ul className="cat-swatches">
      {names.map((name) => (
        <li key={name}>
          <span className="cat-chip" style={{ background: `var(${prefix}${name})` }} />
          <code>{`${prefix}${name}`}</code>
        </li>
      ))}
    </ul>
  );
}

function AdminDemo({ idPrefix }: { idPrefix: string }) {
  return (
    <AdminShell
      platform="challenge"
      logoSrc="../assets/logos/logo-white.png"
      homeHref="#"
      sidebarFooter={<span>Signed in as coach@example.org</span>}
      headerActions={<AdminStatusBadge status="active">Production</AdminStatusBadge>}
      activeHref="/admin/enrollments"
      navigation={[
        { href: "/admin", label: "Overview" },
        { href: "/admin/enrollments", label: "Enrollments" },
        { href: "/admin/payments", label: "Payments" },
      ]}
      footer="127 Sports Intensity"
    >
      <AdminPageHeader
        eyebrow="Winter 2027"
        title="Enrollments"
        description="Everyone registered for this challenge."
        actions={
          <>
            <AdminButton variant="ghost">Export</AdminButton>
            <AdminButton>New enrollment</AdminButton>
          </>
        }
      />
      <AdminNotice tone="success" title="Saved">
        The enrollment was updated.
      </AdminNotice>
      <div className="cat-gap" />
      <AdminNotice tone="warning" title="3 payments need review">
        Open Payments to resolve them before the deadline.
      </AdminNotice>
      <div className="cat-gap" />
      <AdminCard title="Buttons" description="Primary is blue. Orange is for emphasis only.">
        <div className="cat-row">
          <AdminButton>Primary</AdminButton>
          <AdminButton variant="secondary">Secondary</AdminButton>
          <AdminButton variant="ghost">Ghost</AdminButton>
          <AdminButton variant="accent">Accent</AdminButton>
          <AdminButton variant="danger">Danger</AdminButton>
          <AdminButton disabled>Disabled</AdminButton>
        </div>
      </AdminCard>
      <div className="cat-gap" />
      <AdminCard title="Form fields">
        <AdminFormSection title="Contact" description="How we reach the family.">
          <AdminField htmlFor={`${idPrefix}-email`} label="Parent email" required hint="Used for receipts only.">
            <input id={`${idPrefix}-email`} className="si-admin-input" type="email" defaultValue="parent@example.org" aria-describedby={`${idPrefix}-email-hint`} />
          </AdminField>
          <AdminField htmlFor={`${idPrefix}-zip`} label="ZIP code" error="Enter a 5-digit ZIP code.">
            <input id={`${idPrefix}-zip`} className="si-admin-input" defaultValue="594" aria-invalid aria-describedby={`${idPrefix}-zip-error`} />
          </AdminField>
        </AdminFormSection>
      </AdminCard>
      <div className="cat-gap" />
      <AdminCard title="Recent enrollments" actions={<AdminStatusBadge status="active" />}>
        <AdminToolbar label={`${idPrefix} enrollment filters`} actions={<AdminButton variant="ghost">Export</AdminButton>}>
          <AdminField htmlFor={`${idPrefix}-search`} label="Search">
            <input id={`${idPrefix}-search`} className="si-admin-input" type="search" />
          </AdminField>
        </AdminToolbar>
        <AdminTable
          caption="Sample rows"
          columns={[
            { key: "name", label: "Athlete" },
            { key: "school", label: "School" },
            { key: "status", label: "Payment", render: (row) => <AdminStatusBadge status={row.status} /> },
          ]}
          rows={rows}
          rowKey={(row) => row.name}
        />
        <AdminPager page={2} pageCount={7} total={128} hrefFor={(p) => `#page-${p}`} />
      </AdminCard>
    </AdminShell>
  );
}

function PublicDemo({ tst }: { tst?: boolean }) {
  return (
    <>
      <TopNav
        logoSrc={tst ? "../assets/logos/logo-white.png" : "../assets/logos/logo-full-color.png"}
        badge={tst ? "Team Shot Tracker" : "Challenges"}
        activeHref="#standings"
        links={[
          { href: "#programs", label: "Programs" },
          { href: "#standings", label: "Standings" },
          { href: "#help", label: "Help", children: [{ href: "#faq", label: "Parent FAQ" }, { href: "#contact", label: "Contact" }] },
        ]}
        action={{ href: "#login", label: "Parent Login" }}
      />
      <HeroCarousel
        label={tst ? "Sample photos, Team Shot Tracker theme" : "Sample photos"}
        wash={!tst}
        slides={[
          { id: "one", src: "../assets/patterns/pattern-3.png", alt: "Sample slide one (brand pattern standing in for a program photo)" },
          { id: "two", src: "../assets/patterns/pattern-4.png", alt: "Sample slide two" },
          { id: "three", src: "../assets/patterns/pattern-5.png", alt: "Sample slide three" },
        ]}
        eyebrow="127 Sports Intensity"
        headline={
          <>
            Every rep <em>counts</em>
          </>
        }
        subhead="Real program photos go here. The brand pattern stands in for them on this page."
        primaryCta={{ href: "#register", label: "Register" }}
        secondaryCta={{ href: "#how", label: "How it works" }}
      />
      <Footer
        id={tst ? "footer-tst" : "footer-default"}
        logoSrc="../assets/logos/logo-white.png"
        patternSrc="../assets/patterns/pattern-3.png"
        year={2026}
        backToTop={false}
        contact={{ name: "Coordinator name", role: "Coordinator", phone: { label: "555.010.0100", href: "tel:+15550100100" }, email: { label: "info@example.org", href: "mailto:info@example.org" } }}
        columns={[
          { title: "Compete", links: [{ href: "#dribble", label: "Dribble" }, { href: "#shooting", label: "Shooting" }] },
          { title: "Info", accent: "gray", links: [{ href: "#about", label: "About 127 SI" }, { href: "#faq", label: "Parent FAQ" }] },
        ]}
        legalLinks={[{ href: "#privacy", label: "Privacy" }, { href: "#terms", label: "Terms" }]}
      />
    </>
  );
}

function ThemeBlock({ theme, title, note, children }: { theme?: string; title: string; note: string; children: ReactNode }) {
  return (
    <section className="cat-theme" data-si-theme={theme}>
      <h3>{title}</h3>
      <p className="cat-note">{note}</p>
      {children}
    </section>
  );
}

const PAGE_CSS = `
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: var(--si-font-body); color: var(--si-color-text); background: var(--si-color-surface); line-height: var(--si-leading-normal); }
.cat-top { background: var(--si-color-shell); color: var(--si-color-on-shell); border-bottom: 6px solid var(--si-color-accent); padding: var(--si-space-6) var(--si-gutter); }
.cat-top h1 { font-family: var(--si-font-display); font-size: var(--si-text-3xl); line-height: var(--si-leading-tight); margin: 0; }
.cat-top p { margin: var(--si-space-2) 0 0; color: var(--si-color-on-shell); max-width: 60rem; }
.cat-top img { height: 2.5rem; width: auto; margin-bottom: var(--si-space-4); }
main.cat-main { max-width: var(--si-container-max); margin: 0 auto; padding: var(--si-space-6) var(--si-gutter) var(--si-space-8); }
.cat-main h2 { font-family: var(--si-font-display); font-size: var(--si-text-2xl); color: var(--si-blue); margin: var(--si-space-7) 0 var(--si-space-3); }
.cat-main h3 { font-family: var(--si-font-display); font-size: var(--si-text-xl); margin: 0 0 var(--si-space-2); }
.cat-note { color: var(--si-slate); margin: 0 0 var(--si-space-4); }
.cat-swatches { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr)); gap: var(--si-space-3); }
.cat-swatches li { display: flex; align-items: center; gap: var(--si-space-3); min-width: 0; }
.cat-swatches code { font-family: var(--si-font-mono); font-size: var(--si-text-xs); color: var(--si-black); overflow-wrap: anywhere; }
.cat-chip { flex: 0 0 2.5rem; height: 2.5rem; border-radius: var(--si-radius-md); border: 1px solid var(--si-gray); }
.cat-theme { border: 1px solid var(--si-gray); border-radius: var(--si-radius-lg); padding: var(--si-space-5); margin-bottom: var(--si-space-5); background: var(--si-white); color: var(--si-color-text); overflow: hidden; }
.cat-type { display: grid; gap: var(--si-space-4); }
.cat-type p { margin: 0; }
.cat-type .cat-sample { font-size: var(--si-text-2xl); line-height: var(--si-leading-tight); }
.cat-scale { display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--si-space-4); }
.cat-scale div { text-align: center; font-size: var(--si-text-xs); }
.cat-box { background: var(--si-blue-light); border: 1px solid var(--si-blue); display: block; margin: 0 auto var(--si-space-1); }
.cat-row { display: flex; flex-wrap: wrap; gap: var(--si-space-3); align-items: center; }
.cat-gap { height: var(--si-space-5); }
.cat-frame { border: 1px solid var(--si-gray); border-radius: var(--si-radius-md); overflow: hidden; }
.cat-frame .si-admin-shell { min-height: 0; }
.cat-frame .si-hero { min-height: 30rem; }
.cat-frame .si-top-nav { position: relative; }
.cat-list { padding-left: 1.25rem; }
.cat-assets { display: grid; grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr)); gap: var(--si-space-4); margin-top: var(--si-space-5); }
.cat-asset { margin: 0; border: 1px solid var(--si-gray); border-radius: var(--si-radius-md); padding: var(--si-space-3); background: var(--si-white); text-align: center; }
.cat-asset.is-dark { background: var(--si-blue); }
.cat-asset.is-dark figcaption { color: var(--si-white); }
.cat-asset img { max-width: 100%; height: 4.5rem; object-fit: contain; }
.cat-asset figcaption { font-size: var(--si-text-xs); color: var(--si-black); margin-top: var(--si-space-2); }
`;

export function renderCatalogue({ version, components }: { version: string; components: string[] }): string {
  const body = renderToStaticMarkup(
    <>
      <header className="cat-top">
        <img src="../assets/logos/logo-white.png" alt="127 Sports Intensity" />
        <h1>127SI design system</h1>
        <p>
          Version {version}. Every colour, font and shared component used by the 127 Sports Intensity platforms, shown in the default theme
          and in the Team Shot Tracker theme. If something on a live site does not look like this page, the site is wrong.
        </p>
      </header>
      <main className="cat-main">
        <h2>Brand kit</h2>
        <p className="cat-note">The official 127 SI brand kit is the highest authority. These five colours, the logos, stamps and patterns come straight from it.</p>
        <Swatches prefix="--si-" names={KIT} />
        <div className="cat-assets">
          {LOGOS.map(([file, label, dark]) => (
            <figure key={file} className={dark ? "cat-asset is-dark" : "cat-asset"}>
              <img src={`../assets/${file}`} alt={label} loading="lazy" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
          {STAMPS.map((n) => (
            <figure key={n} className="cat-asset">
              <img src={`../assets/stamps/stamp-${n}.png`} alt={`Stamp ${n}`} loading="lazy" />
              <figcaption>Stamp {n}</figcaption>
            </figure>
          ))}
          {PATTERNS.map((n) => (
            <figure key={n} className="cat-asset">
              <img src={`../assets/patterns/pattern-${n}.png`} alt={`Pattern ${n}`} loading="lazy" />
              <figcaption>Pattern {n}</figcaption>
            </figure>
          ))}
        </div>

        <h2>All colours</h2>
        <p className="cat-note">The kit colours plus the Brand System v4 extensions and the text-safe variants this system adds. Blue is primary (buttons, active navigation). Orange is the accent. These never change with the theme.</p>
        <Swatches prefix="--si-" names={PALETTE} />

        <h2>Colour roles by theme</h2>
        <p className="cat-note">Components use roles, not palette colours, so a theme can change them in one place.</p>
        <ThemeBlock title="Default theme" note="Every platform except Team Shot Tracker.">
          <Swatches prefix="--si-color-" names={ROLES} />
        </ThemeBlock>
        <ThemeBlock theme="tst" title="Team Shot Tracker theme (Scoreboard)" note="Team Shot Tracker only: black, LED amber, shot-clock red, chalk.">
          <Swatches prefix="--si-color-" names={ROLES} />
        </ThemeBlock>

        <h2>Type</h2>
        <div className="cat-type">
          {TYPE.map(([token, name, family, weight, use]) => (
            <div key={token}>
              <p className="cat-sample" style={{ fontFamily: family, fontWeight: weight }}>
                Every rep counts. 0123456789
              </p>
              <p className="cat-note">
                <code>{`--si-font-${token}`}</code> {name}. {use}.
              </p>
            </div>
          ))}
        </div>
        <div className="cat-scale">
          {SIZES.map((size) => (
            <div key={size}>
              <span style={{ fontSize: `var(--si-text-${size})`, display: "block" }}>Aa</span>
              <code>{size}</code>
            </div>
          ))}
        </div>

        <h2>Spacing, radius and shadow</h2>
        <div className="cat-scale">
          {SPACES.map((step) => (
            <div key={step}>
              <span className="cat-box" style={{ width: `var(--si-space-${step})`, height: `var(--si-space-${step})` }} />
              <code>space-{step}</code>
            </div>
          ))}
        </div>
        <div className="cat-gap" />
        <div className="cat-scale">
          {RADII.map((radius) => (
            <div key={radius}>
              <span className="cat-box" style={{ width: "4rem", height: "3rem", borderRadius: `var(--si-radius-${radius})` }} />
              <code>radius-{radius}</code>
            </div>
          ))}
          {["sm", "md"].map((shadow) => (
            <div key={shadow}>
              <span className="cat-box" style={{ width: "4rem", height: "3rem", background: "var(--si-white)", borderColor: "var(--si-line)", boxShadow: `var(--si-shadow-${shadow})` }} />
              <code>shadow-{shadow}</code>
            </div>
          ))}
        </div>

        <h2>Public shell</h2>
        <p className="cat-note">The header, hero carousel and footer every public site uses. Only the links, words and photos change between platforms.</p>
        <ThemeBlock title="Default theme" note="Top navigation, hero carousel and footer.">
          <div className="cat-frame">
            <PublicDemo />
          </div>
        </ThemeBlock>
        <ThemeBlock theme="tst" title="Team Shot Tracker theme" note="The same components with the Scoreboard palette; the hero has no colour wash.">
          <div className="cat-frame">
            <PublicDemo tst />
          </div>
        </ThemeBlock>

        <h2>Admin components</h2>
        <p className="cat-note">The admin surface is the same brand, quieter: deep blue sidebar, white work area, blue primary action.</p>
        <ThemeBlock title="Default theme" note="Shell, page header, card, buttons, status badges and table.">
          <div className="cat-frame">
            <AdminDemo idPrefix="default" />
          </div>
        </ThemeBlock>
        <ThemeBlock theme="tst" title="Team Shot Tracker theme" note="The same components with the Scoreboard palette.">
          <div className="cat-frame">
            <AdminDemo idPrefix="tst" />
          </div>
        </ThemeBlock>

        <h2>Component folders in this version</h2>
        <ul className="cat-list">
          {components.map((name) => (
            <li key={name}>
              <code>components/{name}</code>
            </li>
          ))}
        </ul>
        <p className="cat-note">Buttons, form fields, the full-page form shell and public tables are added in later versions and will appear here.</p>
      </main>
    </>,
  );
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>127SI design system v${version}</title>`,
    '<link rel="stylesheet" href="../fonts.css">',
    '<link rel="stylesheet" href="../styles.css">',
    `<style>${PAGE_CSS}</style>`,
    "</head>",
    `<body>${body}</body>`,
    "</html>",
    "",
  ].join("\n");
}
