import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    "accent-text", "text", "text-muted", "heading", "link", "surface", "surface-alt", "border", "border-soft", "border-strong",
    "shell", "shell-deep", "on-shell", "table-head", "on-table-head", "row-hover", "row-selected",
    "success", "success-soft", "warning", "warning-soft", "danger", "danger-soft", "focus",
];
const TYPE = [
    ["display", "Saira 800", "var(--si-font-display)", 800, "Hero and section headings, navigation. Free replacement for the brand kit display font, Magistral"],
    ["body", "Maven Pro 400", "var(--si-font-body)", 400, "Brand kit supporting font. Public body text, forms and parent pages"],
    ["data", "Source Sans 3 400", "var(--si-font-data)", 400, "Admin screens and dense tables"],
    ["mono", "System monospace", "var(--si-font-mono)", 400, "Codes and IDs"],
];
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
];
const STAMPS = ["1", "2", "3", "4", "5", "6", "7"];
const PATTERNS = ["2", "3", "4", "5"];
const rows = [
    { name: "Ava Jensen", school: "Fairfield", status: "paid" },
    { name: "Noah Lund", school: "Choteau", status: "pending" },
    { name: "Mia Ortiz", school: "Power", status: "failed" },
];
function Swatches({ prefix, names }) {
    return (_jsx("ul", { className: "cat-swatches", children: names.map((name) => (_jsxs("li", { children: [_jsx("span", { className: "cat-chip", style: { background: `var(${prefix}${name})` } }), _jsx("code", { children: `${prefix}${name}` })] }, name))) }));
}
function AdminDemo() {
    return (_jsxs(AdminShell, { platform: "challenge", activeHref: "/admin/enrollments", navigation: [
            { href: "/admin", label: "Overview" },
            { href: "/admin/enrollments", label: "Enrollments" },
            { href: "/admin/payments", label: "Payments" },
        ], footer: "127 Sports Intensity", children: [_jsx(AdminPageHeader, { eyebrow: "Winter 2027", title: "Enrollments", description: "Everyone registered for this challenge.", actions: _jsxs(_Fragment, { children: [_jsx(AdminButton, { variant: "ghost", children: "Export" }), _jsx(AdminButton, { children: "New enrollment" })] }) }), _jsx(AdminCard, { title: "Buttons", description: "Primary is blue. Orange is for emphasis only.", children: _jsxs("div", { className: "cat-row", children: [_jsx(AdminButton, { children: "Primary" }), _jsx(AdminButton, { variant: "secondary", children: "Secondary" }), _jsx(AdminButton, { variant: "ghost", children: "Ghost" }), _jsx(AdminButton, { variant: "accent", children: "Accent" }), _jsx(AdminButton, { variant: "danger", children: "Danger" }), _jsx(AdminButton, { disabled: true, children: "Disabled" })] }) }), _jsx("div", { className: "cat-gap" }), _jsx(AdminCard, { title: "Recent enrollments", actions: _jsx(AdminStatusBadge, { status: "active" }), children: _jsx(AdminTable, { caption: "Sample rows", columns: [
                        { key: "name", label: "Athlete" },
                        { key: "school", label: "School" },
                        { key: "status", label: "Payment", render: (row) => _jsx(AdminStatusBadge, { status: row.status }) },
                    ], rows: rows, rowKey: (row) => row.name }) })] }));
}
function ThemeBlock({ theme, title, note, children }) {
    return (_jsxs("section", { className: "cat-theme", "data-si-theme": theme, children: [_jsx("h3", { children: title }), _jsx("p", { className: "cat-note", children: note }), children] }));
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
.cat-assets { display: grid; grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr)); gap: var(--si-space-4); margin-top: var(--si-space-5); }
.cat-asset { margin: 0; border: 1px solid var(--si-gray); border-radius: var(--si-radius-md); padding: var(--si-space-3); background: var(--si-white); text-align: center; }
.cat-asset.is-dark { background: var(--si-blue); }
.cat-asset.is-dark figcaption { color: var(--si-white); }
.cat-asset img { max-width: 100%; height: 4.5rem; object-fit: contain; }
.cat-asset figcaption { font-size: var(--si-text-xs); color: var(--si-black); margin-top: var(--si-space-2); }
`;
export function renderCatalogue({ version, components }) {
    const body = renderToStaticMarkup(_jsxs(_Fragment, { children: [_jsxs("header", { className: "cat-top", children: [_jsx("img", { src: "../assets/logos/logo-white.png", alt: "127 Sports Intensity" }), _jsx("h1", { children: "127SI design system" }), _jsxs("p", { children: ["Version ", version, ". Every colour, font and shared component used by the 127 Sports Intensity platforms, shown in the default theme and in the Team Shot Tracker theme. If something on a live site does not look like this page, the site is wrong."] })] }), _jsxs("main", { className: "cat-main", children: [_jsx("h2", { children: "Brand kit" }), _jsx("p", { className: "cat-note", children: "The official 127 SI brand kit is the highest authority. These five colours, the logos, stamps and patterns come straight from it." }), _jsx(Swatches, { prefix: "--si-", names: KIT }), _jsxs("div", { className: "cat-assets", children: [LOGOS.map(([file, label, dark]) => (_jsxs("figure", { className: dark ? "cat-asset is-dark" : "cat-asset", children: [_jsx("img", { src: `../assets/${file}`, alt: label, loading: "lazy" }), _jsx("figcaption", { children: label })] }, file))), STAMPS.map((n) => (_jsxs("figure", { className: "cat-asset", children: [_jsx("img", { src: `../assets/stamps/stamp-${n}.png`, alt: `Stamp ${n}`, loading: "lazy" }), _jsxs("figcaption", { children: ["Stamp ", n] })] }, n))), PATTERNS.map((n) => (_jsxs("figure", { className: "cat-asset", children: [_jsx("img", { src: `../assets/patterns/pattern-${n}.png`, alt: `Pattern ${n}`, loading: "lazy" }), _jsxs("figcaption", { children: ["Pattern ", n] })] }, n)))] }), _jsx("h2", { children: "All colours" }), _jsx("p", { className: "cat-note", children: "The kit colours plus the Brand System v4 extensions and the text-safe variants this system adds. Blue is primary (buttons, active navigation). Orange is the accent. These never change with the theme." }), _jsx(Swatches, { prefix: "--si-", names: PALETTE }), _jsx("h2", { children: "Colour roles by theme" }), _jsx("p", { className: "cat-note", children: "Components use roles, not palette colours, so a theme can change them in one place." }), _jsx(ThemeBlock, { title: "Default theme", note: "Every platform except Team Shot Tracker.", children: _jsx(Swatches, { prefix: "--si-color-", names: ROLES }) }), _jsx(ThemeBlock, { theme: "tst", title: "Team Shot Tracker theme (Scoreboard)", note: "Team Shot Tracker only: black, LED amber, shot-clock red, chalk.", children: _jsx(Swatches, { prefix: "--si-color-", names: ROLES }) }), _jsx("h2", { children: "Type" }), _jsx("div", { className: "cat-type", children: TYPE.map(([token, name, family, weight, use]) => (_jsxs("div", { children: [_jsx("p", { className: "cat-sample", style: { fontFamily: family, fontWeight: weight }, children: "Every rep counts. 0123456789" }), _jsxs("p", { className: "cat-note", children: [_jsx("code", { children: `--si-font-${token}` }), " ", name, ". ", use, "."] })] }, token))) }), _jsx("div", { className: "cat-scale", children: SIZES.map((size) => (_jsxs("div", { children: [_jsx("span", { style: { fontSize: `var(--si-text-${size})`, display: "block" }, children: "Aa" }), _jsx("code", { children: size })] }, size))) }), _jsx("h2", { children: "Spacing, radius and shadow" }), _jsx("div", { className: "cat-scale", children: SPACES.map((step) => (_jsxs("div", { children: [_jsx("span", { className: "cat-box", style: { width: `var(--si-space-${step})`, height: `var(--si-space-${step})` } }), _jsxs("code", { children: ["space-", step] })] }, step))) }), _jsx("div", { className: "cat-gap" }), _jsxs("div", { className: "cat-scale", children: [RADII.map((radius) => (_jsxs("div", { children: [_jsx("span", { className: "cat-box", style: { width: "4rem", height: "3rem", borderRadius: `var(--si-radius-${radius})` } }), _jsxs("code", { children: ["radius-", radius] })] }, radius))), ["sm", "md"].map((shadow) => (_jsxs("div", { children: [_jsx("span", { className: "cat-box", style: { width: "4rem", height: "3rem", background: "var(--si-white)", borderColor: "var(--si-line)", boxShadow: `var(--si-shadow-${shadow})` } }), _jsxs("code", { children: ["shadow-", shadow] })] }, shadow)))] }), _jsx("h2", { children: "Admin components" }), _jsx("p", { className: "cat-note", children: "The admin surface is the same brand, quieter: deep blue sidebar, white work area, blue primary action." }), _jsx(ThemeBlock, { title: "Default theme", note: "Shell, page header, card, buttons, status badges and table.", children: _jsx("div", { className: "cat-frame", children: _jsx(AdminDemo, {}) }) }), _jsx(ThemeBlock, { theme: "tst", title: "Team Shot Tracker theme", note: "The same components with the Scoreboard palette.", children: _jsx("div", { className: "cat-frame", children: _jsx(AdminDemo, {}) }) }), _jsx("h2", { children: "Component folders in this version" }), _jsx("ul", { className: "cat-list", children: components.map((name) => (_jsx("li", { children: _jsxs("code", { children: ["components/", name] }) }, name))) }), _jsx("p", { className: "cat-note", children: "Public navigation, footer, hero carousel, form shell and tables are added in later versions and will appear here." })] })] }));
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
