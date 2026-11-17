# Build status

This repository has no separate roadmap file. The plan is
[ADR 0001](decisions/0001-one-design-system.md) (16 decisions, masters, open items), with
[ADR 0002](decisions/0002-typography.md), [`FORM-IMAGES.md`](FORM-IMAGES.md),
[`REGISTRATION-SUMMARY.md`](REGISTRATION-SUMMARY.md) and [`DATA-TABLE.md`](DATA-TABLE.md). This file records
how far the code has got against that plan. Code is the source of truth; the ADRs are the plan.

## Code audit (2026-11-17)

Audited at `origin/master` `a7e6b6b` (`package.json` version 1.9.1). Static reading only; nothing was built,
installed or run.

**Code-complete: 85%** (19 done, 3 partial, 2 not started, of 24 planned in-repo items).

### Method

- Planned items are the in-repo deliverables of ADR 0001 decisions 1 to 11, 15 and 16, the masters in
  decision 7, the ADR open item on catalogue hosting, ADR 0002, and the component extractions required by
  `FORM-IMAGES.md`, `REGISTRATION-SUMMARY.md` and `DATA-TABLE.md`.
- Decisions 12, 13 and 14 (delete local copies, marketing hub joins, per-platform guard tests) are work in the
  consumer repositories. They are tracked under Adoption below, not in the percentage.
- Each item was checked against `components/`, `brand/`, `index.ts` exports, `catalogue/Catalogue.tsx`,
  `test/`, `scripts/`, `.github/workflows/` and git history.
- Score = (DONE + 0.5 x PARTIAL) / planned = (19 + 1.5) / 24 = 85.4%.

### Inventory

- 17 component folders (plus `_shared/`). Every folder has its component, CSS, `RULES.md` and one
  `*.test.tsx` (17 of 17). Every component is exported from `index.ts` and rendered in the catalogue.
- Repository-level tests: `test/brand.test.mjs`, `catalogue.test.mjs` (includes axe), `catalogue-assets`,
  `guards.test.mjs` (brand tokens only, no Next.js or CSS framework imports, no runtime deps),
  `package.test.mjs`. CI (`.github/workflows/ci.yml`) runs dist freshness, typecheck, en dash guard and tests.

### Items

| # | Planned item (source) | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Rename to `@127si/design-system` v1.0.0 (ADR 0001 d1) | DONE | `package.json` name; commit `139648d` |
| 2 | Public and admin surfaces (d1) | DONE | `brand/tokens.css:188` `[data-si-surface="admin"]` |
| 3 | Brand kit as top authority, kit assets in repo (d2) | DONE | `brand/kit/README.md`, `brand/assets/manifest.json`, logos, stamps, patterns |
| 4 | TST theme only exception (d3) | DONE | `brand/themes/tst.css` (owner still to confirm palette, see Discrepancies) |
| 5 | Tokens first, `--si-*` only, guard (d4) | DONE | `brand/tokens.css`; `test/guards.test.mjs` "CSS uses brand tokens only" |
| 6 | Tailwind v4 build, compiled CSS shipped (d5) | DONE | `brand/tailwind.css`; `scripts/build.mjs:29` writes `dist/utilities.css` |
| 7 | WCAG 2.1 AA with axe checks (d5) | DONE | axe in `test/catalogue.test.mjs` |
| 8 | No Next.js imports; `LinkComponent` / `ImageComponent` props (d5) | DONE | `AdminShell.tsx`, `TopNav.tsx`, `Footer.tsx`, `HeroCarousel.tsx`, `RegistrationShell.tsx`, `AdminPager.tsx`; guard in `test/guards.test.mjs` |
| 9 | One folder per component with `RULES.md`, test, catalogue (d6) | DONE | 17 of 17 folders; `test/guards.test.mjs` structure check |
| 10 | Admin components from this package (d7) | DONE | `admin-shell`, `admin-page-header`, `admin-card`, `admin-button`, `admin-status-badge`, `admin-table`, `admin-notice`, `admin-toolbar`, `admin-field`, `admin-pager` |
| 11 | Public header from Challenge `SiteHeader.tsx` (d7) | DONE | `components/top-nav/` (v1.3.0) |
| 12 | Public footer from Challenge `SiteFooter.tsx` (d7) | DONE | `components/footer/Footer.tsx`, `BackToTop.tsx` |
| 13 | Hero from Challenge `HeroSlideshow.tsx` (d7) | DONE | `components/hero-carousel/` (v1.3.0 to v1.3.4) |
| 14 | Form shell from Referee registration shell (d7, `FORM-IMAGES.md`) | PARTIAL | `components/registration-shell/`, `registration-step/` exist (v1.4.0). `FORM-IMAGES.md` says the shell takes two pictures (background and header); `RegistrationShell` has only `formHeroSrc` (header). No background picture prop. |
| 15 | Before you register summary component (`REGISTRATION-SUMMARY.md`) | DONE | `components/registration-summary/` (v1.4.0, v1.5.1) |
| 16 | Public table from the public shell Tables section (d7, `DATA-TABLE.md`) | DONE | `components/data-table/` (v1.6.0 to v1.9.1); every prop in `DATA-TABLE.md` present |
| 17 | `dist/` committed, CI fails when stale (d9) | DONE | `dist/`; `ci.yml` runs `npm run check:dist` |
| 18 | Semver with a git tag per release (d10) | PARTIAL | Tags stop at `v1.3.4`. v1.4.0 to v1.9.1 are untagged; `1.8.0` was used by two merges (`3d97dd9`, `a14c50b`). |
| 19 | `--127si-*` and `.si-admin-*` kept as aliases (d11) | DONE | `brand/legacy.css` (14 `--127si-` vars); `.si-admin-*` classes in the admin component CSS |
| 20 | Typography: Saira, Maven Pro, Source Sans 3, self-hosted with OFL (ADR 0002) | DONE | `brand/fonts/`, `brand/fonts.css` |
| 21 | Brand System v4 document moves into `brand/` (d15) | PARTIAL | Kit transcription and asset manifest moved (`brand/kit/`). The Brand System v4 document itself is not in the repo, so ADR 0002's amendment to its typography table has not happened. |
| 22 | Release workflow opens upgrade PRs in consumers (d16) | NOT STARTED | `.github/workflows/` holds only `ci.yml`. Blocked on an owner-created repository secret. |
| 23 | Hosted catalogue page (ADR 0001 open item) | NOT STARTED | Catalogue builds to `dist/catalogue/index.html`; no Pages or Vercel config. Needs repo admin. |
| 24 | Baseline UI inventory and script (Phase 0) | DONE | `baseline/INVENTORY.md`, `inventory.json`, `scripts/inventory.mjs` |

### Adoption

Pins as reported for each app's `package.json` on 2026-11-17 (not re-read here). Versions and distances
verified in this repository with `git log`, `git describe` and `git rev-list --count <sha>..origin/master`.

| Consumer | Package name used | Pin | Version at pin | Behind 1.9.1 |
| --- | --- | --- | --- | --- |
| referee | `@127si/design-system` | `a7e6b6b` | 1.9.1 | current |
| bracket | `@127si/design-system` | `b0fe48f` | 1.3.4 (tag `v1.3.4`) | 11 releases, 21 commits |
| challenge | `@127si/design-system` | `b0fe48f` | 1.3.4 | 11 releases, 21 commits |
| fairfield-basketball-club | `@127si/design-system` | `b0fe48f` | 1.3.4 | 11 releases, 21 commits |
| communication | `@127si/admin-design-system` | `ae9357d` | 0.1.0 (pre-rename, untagged) | major: pre-v1, 37 commits |
| curriculum | `@127si/admin-design-system` | `ae9357d` | 0.1.0 | major: pre-v1, 37 commits |
| content | `@127si/admin-design-system` | `#master` | floats (resolves to 1.9.1 today) | unpinned |
| shared-data | `@127si/admin-design-system` | `#master` | floats | unpinned |
| tst | not a dependency | - | - | not adopted |

Risks:

- **Name mismatch.** Four consumers still declare `@127si/admin-design-system`. For communication and
  curriculum that matches the 0.1.0 commit they pin. For content and shared-data, `#master` now serves a
  package named `@127si/design-system`, so the declared name no longer matches the installed package and
  imports from the old name can break on the next lockfile refresh. Follow the README "Upgrading from
  `@127si/admin-design-system`" steps.
- **Unpinned `#master`.** Content and shared-data violate ADR 0001 d10 and the README ("Never pin a branch").
  Any merge here reaches them unreviewed. `baseline/README.md` recorded both as pinned by full SHA on
  2026-11-11, so this is a regression.
- **Short SHAs.** The pins above are 7-character as reported; the README requires the full 40-character SHA.
  Confirm in each consumer.
- **TST** has not adopted the package or the `tst` theme; its live palette differs from the documented one.
- **Enforcement (d14)** guard tests in each platform are not verified by this audit.

### Major builds remaining (prioritized)

1. **Consumer migration**: rename and pin content and shared-data (unpinned, wrong name), then
   communication and curriculum (0.1.0 to 1.9.1 with the visible colour change), then bracket, challenge and
   fairfield-basketball-club (1.3.4 to 1.9.1). Bracket and fairfield need agent Write access (ADR open item).
2. **Release hygiene**: tag v1.4.0 to v1.9.1 on their merge commits, add a CHANGELOG, then build the
   upgrade-PR release workflow (d16, needs owner secret).
3. **Form shell background picture**: add the background slot `FORM-IMAGES.md` promises, so Challenge and
   Referee forms can drop local shells.
4. **Platform guard tests (d14)** in each consumer: hex ratchet, SHA-pin check, no local nav/footer/table.
5. **Brand System v4 doc into `brand/`** (d15) with ADR 0002's typography amendment.
6. **TST adoption** once the owner rules on its palette.
7. **Hosted catalogue** (needs repository admin for Pages or Vercel).

### Discrepancies (docs versus code)

- `README.md` Layout lists six components; there are 17 (`admin-notice`, `admin-toolbar`, `admin-field`,
  `admin-pager`, `top-nav`, `footer`, `hero-carousel`, `registration-*`, `data-table` are missing).
- `README.md` says components are "plain React and plain CSS"; ADR 0001 d5 was amended on 2026-11-13 to allow
  Tailwind v4 and shadcn/ui, and the build runs Tailwind (`scripts/build.mjs:29`).
- `README.md` release step 5 says tag every merge; no tag exists after `v1.3.4`.
- `FORM-IMAGES.md` promises a background picture prop on the shared form shell; `RegistrationShell` has none.
  Its "Status, 2026-11-11" table predates the shell (v1.4.0).
- `baseline/README.md` says only Referee pins `#master`; today Referee is SHA-pinned and content and
  shared-data are on `#master`.
- ADR 0001 open item: TST live colours versus documented Scoreboard palette is still unresolved.
- No CHANGELOG; release notes exist only in commit subjects.

### Branches not merged into `origin/master`

`git branch -r --no-merged origin/master` lists 13 branches. None is in-flight work:

- 10 are squash-merged (no unique patches per `git cherry`): `claude/admin-table-rowheader`,
  `claude/adr-amend-tailwind-shadcn`, `claude/dt-contrast`, `claude/registration-shell-package`,
  `claude/shell-title-logo`, `claude/summary-label-contrast`, `codex/registration-summary-standard`,
  `cursor/datatable-toolbar-wording-5977`, `cursor/revert-pr19-datatable-3734`, `fix/hero-srcset`.
- 3 carry patches not byte-identical to master but appear superseded by later merges (not checked line by
  line): `claude/relaxed-hawking-edybfz` (admin-table v1.8.0, landed as #28 and #32),
  `cursor/data-table-design-review-3734` and `cursor/data-table-youth-participants-6b06` (DataTable, landed
  as #27).

All 13 are candidates for deletion once the owner confirms.
