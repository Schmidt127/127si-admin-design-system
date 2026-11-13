# 127SI design system

`@127si/design-system`: the one source of brand tokens, themes, fonts, logos and shared React components for
every 127 Sports Intensity platform. Authority: the official 127 SI brand kit, extended by Brand System v4
(blue `#0034B7` primary, orange `#FF8B00` accent). Team Shot Tracker alone uses the `tst` ("Scoreboard") theme.

Before v1.0.0 this package was `@127si/admin-design-system` (admin only, non-brand colours). The repository
keeps its old name so existing commit pins still resolve.

- Decisions: [`docs/decisions/`](docs/decisions/) (0001 one design system, 0002 typography).
- Starting point measured across the platforms: [`baseline/`](baseline/).
- Registration template: [`docs/REGISTRATION-SUMMARY.md`](docs/REGISTRATION-SUMMARY.md) (required Before you register summary for every registration).
- Catalogue (every token and component in every theme): `dist/catalogue/index.html`.

## Layout

```
brand/                 tokens.css, themes/tst.css, legacy.css, fonts.css, fonts/, theme.ts, RULES.md
  kit/                   the official brand kit: what it fixes and what is an extension (highest authority)
  assets/                logos, stamps and patterns from the kit, with manifest.json
components/
  admin-shell/         one folder per component:
    AdminShell.tsx       the component
    admin-shell.css      its styles, brand tokens only
    RULES.md             what it is for, when to use it, what may and may not vary (binding)
    admin-shell.test.tsx render and accessibility check
  admin-button/ admin-card/ admin-page-header/ admin-status-badge/ admin-table/
  data-table/            participant rosters (public and staff presets)
  top-nav/ footer/ hero-carousel/
catalogue/             the page that shows everything in every theme
dist/                  built output, committed (what consumers install)
```

Each `RULES.md` is binding on people and agents. Start with [`brand/RULES.md`](brand/RULES.md).

## Using it in a platform

Install by the full commit SHA of a tagged release, with the platform's own package manager:

```json
"@127si/design-system": "github:Schmidt127/127si-admin-design-system#<full 40-character sha>"
```

- Never pin a branch (`#master`), a tag name or a short SHA. The consumer lockfile records the commit.
- Upgrade by changing the SHA and regenerating that platform's lockfile in the same PR.

Import the styles once, in the app's global stylesheet:

```css
@import "@127si/design-system/fonts.css";   /* Saira, Maven Pro, Source Sans 3, self-hosted */
@import "@127si/design-system/styles.css";  /* tokens + all component styles */
```

`@127si/design-system/tokens.css` is the tokens alone; `components.css` is the component styles alone.

```tsx
import {
  AdminShell,
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminStatusBadge,
  AdminTable,
  DataTable,
  participantColumnsPublic,
} from "@127si/design-system";

<AdminShell platform="content" navigation={[{ label: "Overview", href: "/admin" }]} activeHref="/admin">
  <AdminPageHeader title="Content" actions={<AdminButton>New record</AdminButton>} />
  <AdminCard title="Recent records"><AdminStatusBadge status="published" /></AdminCard>
</AdminShell>

<DataTable
  caption="Program roster"
  columns={participantColumnsPublic()}
  rows={rows}
  columnVisibilityPreset="public"
  rowKey={(row) => row.id}
  showSchoolRail
/>
```

Components are plain React and plain CSS. They import no Next.js, router, icon library or CSS framework.
`DataTable` requires peer dependency `@tanstack/react-table` (v8+). Team Shot Tracker's public layout sets
`data-si-theme="tst"`; nothing else sets a theme.

## Upgrading from `@127si/admin-design-system` (0.1.0)

1. Rename the dependency to `@127si/design-system` and pin the v1 commit SHA.
2. Replace `@127si/admin-design-system/tokens.css` with `@127si/design-system/styles.css` (the old
   `tokens.css` also carried the `.si-admin-*` classes; they now live in `styles.css`).
3. Replace `from "@127si/admin-design-system"` with `from "@127si/design-system"`. Every old export still
   exists (`adminTheme` and `AdminPlatform` are deprecated names for `siTheme` and `SiPlatform`).
4. Delete local overrides of `--127si-*`. Those variables still work but are now aliases of the v1 tokens
   and already carry Brand System v4 values.

What changes on screen: admin blue, orange and navy become the brand values; the primary admin button turns
from orange to blue (`variant="accent"` is the orange one); status and table colours come from brand tokens.

## How it ships

Sources are TypeScript. `npm run build` compiles them to `dist/` (ES modules and `.d.ts`), bundles the CSS and
renders the catalogue. `dist/` is committed and CI fails if it is stale, so consumers install ready-to-run
files with no build step. There are no runtime dependencies and no install scripts; do not add a `prepare`
script. No lockfile is committed here (consumers pin by SHA; dev dependencies are for local checks only).

## Working in this repository

```sh
npm install
npm run check        # build, typecheck, en dash guard, tests (render, brand contrast, structure guards, axe)
npm run check:dist   # what CI runs first: fails if the committed dist/ differs from a fresh build
```

Adding a component is a fixed recipe:

1. Create `components/<name>/` with the component, `<name>.css`, `RULES.md` and `<name>.test.tsx`.
2. Style it with brand tokens only. The guard test rejects raw colours, raw font names and unknown tokens.
3. Export it from `index.ts` and show it in `catalogue/Catalogue.tsx`.
4. `npm run check`, commit including `dist/`, open a PR.
5. Bump the version, tag the merge commit (`vX.Y.Z`) and open an upgrade PR in each platform with the new SHA.

A change to a token name, class name or prop that an app could be using is a major version.
