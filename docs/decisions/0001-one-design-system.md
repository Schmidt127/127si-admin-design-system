# ADR 0001: one 127SI design system, in this repository

Status: Accepted, 2026-11-11 (owner defaults from the design system build prompt). Decision 5 amended by the owner on 2026-11-13.

## Context

Eight platforms (Challenge, Referee, Curriculum, Communication, Content, Shared Data, Team Shot Tracker,
Bracket) and the marketing hub each carry their own colours, fonts, navigation, footer, hero, buttons, forms
and tables. The public shell standard told every site to copy Challenge's code, and the full-page form
standard was re-implemented rather than shared. Copies drift. This package existed but was admin-only, used
colours that are not the brand, and was mostly consumed for its token file. The measured starting point is in
[`baseline/INVENTORY.md`](../../baseline/INVENTORY.md).

## Decisions

1. **One package, in this repository.** `@127si/admin-design-system` becomes `@127si/design-system` at
   v1.0.0. It has two surfaces: public (default) and admin (`data-si-surface="admin"`, visually quieter).
   The GitHub repository keeps its name so existing SHA pins keep resolving.
2. **The brand kit is the highest authority; Brand System v4 extends it.** (Owner direction 2026-11-11.) The
   official 127 SI brand kit fixes the five base colours, Maven Pro and the logo, stamp and pattern artwork;
   `brand/kit/` and `brand/assets/` in this repository are their home. Brand System v4 and this design system
   add to the kit and never change a kit value; `brand/tokens.css` labels each group with its source. Blue `#0034B7` is primary (buttons, active nav), orange `#FF8B00`
   is the accent. The package's old colours (`#1f4e79`, `#e8752a`, `#102a43`) are retired. Curriculum's
   admin, which still shows them, changes visibly when it upgrades.
3. **Team Shot Tracker is the only theme exception.** It applies `data-si-theme="tst"` (the "Scoreboard"
   palette). Every other platform uses the default theme. No other platform may add a theme.
4. **Tokens first.** One file of CSS custom properties with one prefix, `--si-*`. Components use tokens
   only: no raw colours and no font names in component CSS. Themes and surfaces are attribute-scoped
   overrides of the same tokens.
5. **Tailwind v4 and shadcn/ui are allowed; accessibility is required.** (Owner amendment, 2026-11-13,
   replacing the earlier "plain CSS and plain React" rule.) Components may be built with Tailwind CSS v4 and
   shadcn/ui patterns. The published package ships compiled CSS (`styles.css`) and ready-to-run JavaScript, so a
   consumer app does not need Tailwind to use it, and apps that do use Tailwind map the tokens through
   `@theme inline` and never redefine values. The package still has no Next.js imports: components that render
   links or images accept `LinkComponent` and `ImageComponent` props, and each app passes `next/link` and
   `next/image`. Every component must meet WCAG 2.1 AA: no serious or critical axe findings, visible keyboard
   focus, labelled controls, and 44 CSS px touch targets on phones. Tokens still come from `brand/`; component
   code still uses `var(--si-*)` only.
6. **Layout: one folder per component, each with a binding `RULES.md`.** `brand/` (tokens, themes, fonts,
   logos), `components/<name>/` (component, styles, `RULES.md`, test), `catalogue/` (every token and
   component in every theme). Adding a component is: create the folder, build from brand tokens, write
   `RULES.md`, add it to the catalogue, release.
7. **Masters.** Shared components are extracted from: Referee `registration-intensity-shell.tsx` (form
   shell), Challenge `SiteHeader.tsx`, `SiteFooter.tsx` and `HeroSlideshow.tsx` (public shell), the public
   shell standard's Tables section (public table), and this package (admin). Where a platform's copy
   differs from the master, the master wins unless the difference is the TST exception.
8. **Pages stay in the apps.** The package provides layout and controls. Data, validation, pricing, routes
   and rules stay in the owning platform.
9. **How typed components ship without a consumer build step.** Sources are TypeScript (`.tsx`) under
   `components/` and `brand/`. `npm run build` compiles them with `tsc` to `dist/` (ES modules plus generated
   `.d.ts`) and copies the CSS and font files. **`dist/` is committed**, and CI fails if a fresh build
   differs from the committed `dist/`. Consumers install by commit SHA and get ready-to-run JavaScript and
   declarations: no `prepare` script, no build in the consumer, no `transpilePackages`, and no hand-written
   declarations to keep in sync. The package has no runtime dependencies; React is a peer dependency.
10. **Versioning.** Semver with git tags (`v1.0.0`). Consumers pin the full 40-character commit SHA of a
    tagged release, never a branch or a short SHA. A breaking change to a token name, class name or prop is
    a major version.
11. **Backward compatibility.** The `--127si-*` variables and `.si-admin-*` classes remain as deprecated
    aliases of the new tokens until every consumer has migrated; they are removed in the next major version.
    Their values change to Brand v4 in v1.0.0 (decision 2).
12. **The package replaces "copy from Challenge".** Once a component ships here, the public shell standard
    says "install", and local copies are deleted from the platforms.
13. **Marketing hub.** `127si-fairfield-basketball-club` joins last, for the public shell only.
14. **Enforcement.** Each platform gets a guard test, required in CI, that fails on new hex colour literals
    outside the token import (ratchet from the baseline), on a branch-pinned or short-SHA package ref, and
    on a locally defined nav, footer, button or table where a package one exists.
15. **Canonical brand doc.** The Brand System v4 document and asset manifest move into `brand/` here; each
    platform's copy becomes a pointer. Until that move is merged, Challenge's copy stays authoritative.
16. **Upgrade PRs.** On a tagged release, a workflow opens an upgrade PR in each consumer. It needs a
    repository secret holding the agent account's token; creating that secret is an owner action. Until it
    exists, the releasing agent opens the upgrade PRs by hand.

## Consequences

- A visual change is made once here and reaches a platform when that platform upgrades its pin.
- `dist/` in git means generated files appear in diffs; the CI freshness check keeps them honest.
- Admin colours change on upgrade wherever a platform had not already overridden them to Brand v4.

## Open items for the owner

- Team Shot Tracker's live colours differ from its documented Scoreboard palette (see
  [`baseline/README.md`](../../baseline/README.md)). The theme published here uses the documented values.
- The agent account cannot reach `127si-bracket-platform` or `127si-fairfield-basketball-club`. Those two
  cannot be migrated until it is given Write access.
- Hosting for the catalogue page needs GitHub Pages (or a Vercel project) enabled on this repository, which
  requires repository admin.
