# Build status

This repository has no separate roadmap file. The plan is
[ADR 0001](decisions/0001-one-design-system.md) (16 decisions, masters, open items), with
[ADR 0002](decisions/0002-typography.md), [`FORM-IMAGES.md`](FORM-IMAGES.md),
[`REGISTRATION-SUMMARY.md`](REGISTRATION-SUMMARY.md) and [`DATA-TABLE.md`](DATA-TABLE.md). This file records
how far the code has got against that plan. Code is the source of truth; the ADRs are the plan.

## Code audit (2026-11-23)

Audited at `origin/master` `96aa00c` (`package.json` version **1.9.1**). Static reading only; nothing was
built, installed or run. Supersedes the 2026-11-17 pass on this file (same method, fresher `master` and
consumer pins).

**Code-complete: 90%** (20 done, 3 partial, 1 not started, of 24 planned in-repo items).

### Method

- Planned items are the in-repo deliverables of ADR 0001 decisions 1 to 11, 15 and 16, the masters in
  decision 7, the ADR open item on catalogue hosting, ADR 0002, and the component extractions required by
  `FORM-IMAGES.md`, `REGISTRATION-SUMMARY.md` and `DATA-TABLE.md`.
- Decisions 12, 13 and 14 (delete local copies, marketing hub joins, per-platform guard tests) are work in the
  consumer repositories. They are tracked under Adoption below, not in the percentage.
- Each item was checked against `components/`, `brand/`, `index.ts` exports, `catalogue/Catalogue.tsx`,
  `test/`, `scripts/`, `.github/workflows/` and git history.
- Score = (DONE + 0.5 x PARTIAL) / planned = (20 + 1.5) / 24 = 89.6% (rounded 90%).

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
| 21 | Brand System v4 document moves into `brand/` (d15) | DONE | `brand/BRAND-SYSTEM-V4.md` ([#41](https://github.com/Schmidt127/127si-admin-design-system/pull/41)); README and ADR 0002 link here. |
| 22 | Release workflow opens upgrade PRs in consumers (d16) | PARTIAL | `.github/workflows/upgrade-consumers.yml` ([#40](https://github.com/Schmidt127/127si-admin-design-system/pull/40)): dry-run until `CONSUMER_UPGRADE_TOKEN` and `CONSUMER_UPGRADE_LIVE=true`. |
| 23 | Hosted catalogue page (ADR 0001 open item) | NOT STARTED | Catalogue builds to `dist/catalogue/index.html`; no Pages or Vercel config. Needs repo admin. |
| 24 | Baseline UI inventory and script (Phase 0) | DONE | `baseline/INVENTORY.md`, `inventory.json`, `scripts/inventory.mjs` |

### Adoption

Consumer pins re-read from each platform's `package.json` on **2026-11-23** (full 40-character SHAs).
Library version at each pin from `git show <sha>:package.json`. Distance to **v1.9.1** code pin
`a7e6b6bc5da52ea2641844155b66c23226f81629` via `git rev-list --count <sha>..a7e6b6b`.

Plain-language upgrade guidance: [`CONSUMER-UPGRADE-NOTE.md`](CONSUMER-UPGRADE-NOTE.md).

| Consumer | Package name | Pin (prefix) | Version at pin | Behind 1.9.1 |
| --- | --- | --- | --- | --- |
| referee | `@127si/design-system` | `a7e6b6b` | 1.9.1 | current |
| bracket | `@127si/design-system` | `b0fe48f` | 1.3.4 (`v1.3.4`) | 21 commits |
| challenge | `@127si/design-system` | `b0fe48f` | 1.3.4 | 21 commits |
| fairfield-basketball-club (`web/`) | `@127si/design-system` | `b0fe48f` | 1.3.4 | 21 commits |
| communication | `@127si/design-system` | `b0fe48f` | 1.3.4 | 21 commits |
| content | `@127si/design-system` | `2bf00ce` | 1.0.1 (`v1.0.1`) | 32 commits |
| shared-data | `@127si/design-system` | `cf48b9d` | 1.3.3 | 22 commits |
| curriculum | `@127si/design-system` | `6307af6` | 1.8.1 | 3 commits |
| tst | *(not listed)* | — | — | not adopted |

Risks:

- **Most platforms still on 1.3.4 or older library code**, while Referee runs 1.9.1. Admin table chrome
  and any future `DataTable` extraction will diverge until draft upgrade PRs merge.
- **Content at 1.0.1** is a larger jump than the 1.3.4 cluster; budget extra visual QA on admin chrome.
- **Tags lag `CHANGELOG`.** Git has tags through `v1.3.4` only; v1.4.0–v1.9.1 SHAs are in
  [`CHANGELOG.md`](../CHANGELOG.md). Mike must push tags before tag-driven automation is trustworthy.
- **TST** has no dependency and no `tst` theme in production; palette sign-off is still open (ADR 0001).
- **Enforcement (d14)** per-platform guard tests were not re-audited here.

### Major builds remaining (prioritized)

1. **Consumer pin upgrades to 1.9.1** (draft PRs): bracket, challenge, fairfield, communication, content,
   shared-data; then curriculum (small delta). See [`CONSUMER-UPGRADE-NOTE.md`](CONSUMER-UPGRADE-NOTE.md).
2. **Release hygiene (Mike):** push git tags `v1.4.0`–`v1.9.1` per [`CHANGELOG.md`](../CHANGELOG.md); keep
   `CONSUMER_UPGRADE_LIVE` false until tags and token scope are ready.
3. **Form shell background picture**: `FORM-IMAGES.md` still describes an app-supplied background image;
   `RegistrationShell` only exposes `formHeroSrc` (header); atmosphere is a fixed deep-blue layer in CSS.
4. **Platform guard tests (d14)** in each consumer: hex ratchet, SHA-pin check, no local nav/footer/table.
5. **TST adoption** once the owner rules on its palette.
6. **Hosted catalogue** (needs repository admin for Pages or Vercel).

### Discrepancies (docs versus code)

- `README.md` Layout lists six admin components as examples; the repo ships **17** component folders (see
  Inventory). A fuller list in README is still optional housekeeping.
- `README.md` says components are "plain React and plain CSS"; ADR 0001 d5 allows Tailwind v4 in the
  **build** (`scripts/build.mjs` writes `dist/utilities.css`); runtime components remain framework-agnostic.
- **Tags versus `CHANGELOG`:** release step 5 expects a tag per version; git tags stop at `v1.3.4` while
  `CHANGELOG.md` documents through **v1.9.1**.
- `FORM-IMAGES.md` describes separate `background` and `header` assets per form; `RegistrationShell` only
  accepts `formHeroSrc` for the header image.
- `baseline/README.md` adoption table may be stale versus the pins in the table above (re-sync when baseline
  is next updated).
- ADR 0001 open item: TST live colours versus documented Scoreboard palette is still unresolved.

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
