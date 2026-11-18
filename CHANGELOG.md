# Changelog

Every release of `@127si/design-system`. Newest first. Versions follow semver as the README defines it: a
change to a token name, class name or prop that an app could be using is a major version; a new prop,
component or option is a minor version; a fix that changes no API is a patch.

Consumers pin a release by the full commit SHA of its tag (see [`docs/RELEASING.md`](docs/RELEASING.md)).
Tags `v1.0.0` to `v1.3.4` exist. Tags for `v1.4.0` to `v1.9.1` are proposed below and not yet pushed; until
they are, the "Commit" column is the SHA to pin.

PR links point to `Schmidt127/127si-admin-design-system`.

## v1.9.1 (2026-11-16)

Commit `a7e6b6bc5da52ea2641844155b66c23226f81629`

- **DataTable**: toolbar buttons (Compact, Columns, density) use the full subtle text colour. They were at 72%
  of it, 3.73:1 on white, below WCAG AA; now about 7.6:1. ([#36](https://github.com/Schmidt127/127si-admin-design-system/pull/36))

## v1.9.0 (2026-11-16)

Commit `671f90a5c63b0aeb6315cdb01c7190ec87f318aa`

- **AdminTable**: two new options, both off by default so existing tables are unchanged. `rowHeader` renders
  the first column as row headers; `captionHidden` keeps the caption for screen readers only. Header styling
  now applies to the header row only. ([#35](https://github.com/Schmidt127/127si-admin-design-system/pull/35))

## v1.8.1 (2026-11-16)

Commit `6307af65cc1d66cff6d1c776197044ebd4a4ddc4`

- **DataTable**: in compact density the search box, Export, density buttons, columns toggle and record count
  shrink to match the rows. Comfortable density is unchanged. ([#34](https://github.com/Schmidt127/127si-admin-design-system/pull/34))

## v1.8.0 (2026-11-16)

Commit `a14c50bd755df5e8d55e4cb96b33b0a242f6036a`

Two PRs both set the version to 1.8.0. The tag goes on the later one, which contains both.

- **AdminTable**: navy header (`--si-color-shell-deep` with on-shell text), body one step smaller
  (`--si-text-xs`), compact rows, tabular numerals, matching the Challenge enrollments table. Visible change
  for every AdminTable. ([#32](https://github.com/Schmidt127/127si-admin-design-system/pull/32), merge `3d97dd9`)
- **DataTable**: new `searchPlaceholder` and `loadingMessage` props. Defaults keep the Referee participant
  wording. `exportFileName` is now documented. ([#33](https://github.com/Schmidt127/127si-admin-design-system/pull/33))

## v1.7.2 (2026-11-16)

Commit `73aea35e6bd527643bc168f37d86fa05c4f11061`

- **DataTable**: new `showSearch` prop (default `true`). `false` removes the toolbar search field and closes
  the gap it left. The youth participant example sets it for the Referee directory.
  ([#31](https://github.com/Schmidt127/127si-admin-design-system/pull/31))
  Note: a new prop is a minor change by the rules above; this one shipped as a patch.

## v1.7.1 (2026-11-16)

Commit `91bb4a1b5ec23b3464fc6bd40a0713f81ebb3c70`

- **DataTable**: Comfortable, Compact and Columns move to the right of the caption row with muted ghost
  styling; the filtered count stays in the toolbar. ([#30](https://github.com/Schmidt127/127si-admin-design-system/pull/30))
- **AdminTable** RULES: paging line updated (points to AdminPager; sorting and filters still unsupported).
  Docs only. ([#28](https://github.com/Schmidt127/127si-admin-design-system/pull/28))

## v1.7.0 (2026-11-16)

Commit `d5e43538b4bb3788a6a8985e958c9139c72ce75f`

- **DataTable**: `DataTableBanner` takes `titleLevel` (1 to 6, default 2) so the banner title can be the
  page's only `h1`. `DataTable` takes `countLabel` (singular and plural) for the toolbar count.
  ([#29](https://github.com/Schmidt127/127si-admin-design-system/pull/29))

## v1.6.0 (2026-11-16)

Commit `63cc231f85b4c7f0106d08c8e657eda04504858f`

- **DataTable** (new): the Referee youth participant directory as a generic typed table: banner stats,
  filter pills, clinic badges, mobile cards and privacy guards. Docs in [`docs/DATA-TABLE.md`](docs/DATA-TABLE.md),
  a catalogue example and `dist/demos/youth-participant-datatable.html`.
  ([#27](https://github.com/Schmidt127/127si-admin-design-system/pull/27))
- **Catalogue**: CSS loads from `dist/` via a base href; `npm run preview:catalogue` serves it.
- **HeroCarousel**: new `washDirection="left"` (Referee, owner decision 2026-11-14): a soft blue wash from the
  left edge instead of the bottom wash, then softened the same day. Merged between v1.5.1 and v1.6.0 without
  a version bump of its own, so v1.6.0 is the first release that carries it.
  ([#25](https://github.com/Schmidt127/127si-admin-design-system/pull/25), [#26](https://github.com/Schmidt127/127si-admin-design-system/pull/26))

## v1.5.1 (2026-11-13)

Commit `ebb38b9fbfd89ca0e65aab20ef4f2077609f66c5`

- **RegistrationSummary**: labels use the main text colour. The muted grey was 4.25:1 on the summary panel,
  below WCAG AA. ([#24](https://github.com/Schmidt127/127si-admin-design-system/pull/24))

## v1.5.0 (2026-11-13)

Commit `c749b178f8db2b13713fe89caeac74b9b47f7478`

- **RegistrationShell**: accepts the app's own `logo` (with its own home link) and a `titleId`, so a form can
  use `aria-labelledby` with the page title. Additive. ([#23](https://github.com/Schmidt127/127si-admin-design-system/pull/23))

## v1.4.0 (2026-11-13)

Commit `8fe8e58b0b1e6b2c0de9c4fcd7f93a3b37c73e76`

- **RegistrationShell** (new): the full-page registration layout.
- **RegistrationStep** (new): shadcn-style step card.
- **RegistrationSummary** (new): the "Before you register" block with closed disclosures
  ([`docs/REGISTRATION-SUMMARY.md`](docs/REGISTRATION-SUMMARY.md)).
- **Build**: Tailwind v4 utilities compile into `dist/utilities.css` (ADR 0001 decision 5). Consumers do not
  need Tailwind.
- **Fixes**: admin platform label contrast; keyboard access to scrollable admin tables.
  ([#22](https://github.com/Schmidt127/127si-admin-design-system/pull/22))

Merged on master between v1.3.4 and v1.4.0, with no package change:

- "Before you register" summary standard for every registration, docs only.
  ([#17](https://github.com/Schmidt127/127si-admin-design-system/pull/17))
- ADR 0001 decision 5: Tailwind v4 and shadcn/ui allowed; WCAG 2.1 AA required.
  ([#18](https://github.com/Schmidt127/127si-admin-design-system/pull/18))
- An early DataTable and governance PR was merged and reverted the same day; it is not in any release.
  ([#19](https://github.com/Schmidt127/127si-admin-design-system/pull/19), revert `289bba3`)

## v1.3.4 and earlier

Tagged (`v1.0.0` to `v1.3.4`). See `git log v1.0.0..v1.3.4`. Before v1.0.0 this package was
`@127si/admin-design-system` (0.1.0); the README's "Upgrading from `@127si/admin-design-system`" section covers
that move.
