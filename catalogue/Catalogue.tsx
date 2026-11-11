import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminButton } from "../components/admin-button/AdminButton.js";
import { AdminCard } from "../components/admin-card/AdminCard.js";
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
  "accent-text", "text", "text-muted", "heading", "link", "surface", "surface-alt", "border", "border-strong",
  "shell", "shell-deep", "on-shell", "table-head", "on-table-head", "row-hover", "row-selected",
  "success", "success-soft", "warning", "warning-soft", "danger", "danger-soft", "focus",
];
const TYPE = [
  ["display", "Saira 800", "var(--si-font-display)", 800, "Hero and section headings, navigation"],
  ["body", "Maven Pro 400", "var(--si-font-body)", 400, "Public body text, forms and parent pages"],
  ["data", "Source Sans 3 400", "var(--si-font-data)", 400, "Admin screens and dense tables"],
  ["mono", "System monospace", "var(--si-font-mono)", 400, "Codes and IDs"],
] as const;
const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
const SPACES = ["1", "2", "3", "4", "5", "6", "7", "8"];
const RADII = ["xs", "sm", "md", "lg", "xl", "pill"];

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

function AdminDemo() {
  return (
    <AdminShell
      platform="challenge"
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
      <AdminCard title="Recent enrollments" actions={<AdminStatusBadge status="active" />}>
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
      </AdminCard>
    </AdminShell>
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
.cat-list { padding-left: 1.25rem; }
`;

export function renderCatalogue({ version, components }: { version: string; components: string[] }): string {
  const body = renderToStaticMarkup(
    <>
      <header className="cat-top">
        <img src="../logos/127si-logo-white.png" alt="127 Sports Intensity" />
        <h1>127SI design system</h1>
        <p>
          Version {version}. Every colour, font and shared component used by the 127 Sports Intensity platforms, shown in the default theme
          and in the Team Shot Tracker theme. If something on a live site does not look like this page, the site is wrong.
        </p>
      </header>
      <main className="cat-main">
        <h2>Brand colours</h2>
        <p className="cat-note">Brand System v4. Blue is primary (buttons, active navigation). Orange is the accent. These never change with the theme.</p>
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

        <h2>Admin components</h2>
        <p className="cat-note">The admin surface is the same brand, quieter: deep blue sidebar, white work area, blue primary action.</p>
        <ThemeBlock title="Default theme" note="Shell, page header, card, buttons, status badges and table.">
          <div className="cat-frame">
            <AdminDemo />
          </div>
        </ThemeBlock>
        <ThemeBlock theme="tst" title="Team Shot Tracker theme" note="The same components with the Scoreboard palette.">
          <div className="cat-frame">
            <AdminDemo />
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
        <p className="cat-note">Public navigation, footer, hero carousel, form shell and tables are added in later versions and will appear here.</p>
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
