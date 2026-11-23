# Consumer upgrade note (to v1.9.1)

**Target pin (library code):** `@127si/design-system` at commit
`a7e6b6bc5da52ea2641844155b66c23226f81629` (`package.json` version **1.9.1**).

This is the newest **released** component code on `master`. Three newer commits on `master` are
docs and CI only (`CHANGELOG`, `docs/RELEASING.md`, dry-run `upgrade-consumers` workflow, Brand System
v4 doc in `brand/`). They do not change `dist/` component output until someone cuts a new version and
tag.

**Git tags today:** `v1.0.0` through `v1.3.4` only. Versions `v1.4.0`–`v1.9.1` are documented in
[`CHANGELOG.md`](../CHANGELOG.md) with merge SHAs; Mike must push tags before the upgrade workflow can
run on a tag push. Do not merge consumer upgrades until each platform's CI passes.

Full release notes: [`CHANGELOG.md`](../CHANGELOG.md). Manual steps: [`RELEASING.md`](RELEASING.md)
and README "Upgrading from `@127si/admin-design-system`".

---

## Where each platform stands (2026-11-23)

| Platform | Pin today | Version at pin | Notes |
| --- | --- | --- | --- |
| Referee | `a7e6b6b…` | 1.9.1 | Current. |
| Bracket | `b0fe48f…` | 1.3.4 | |
| Challenge | `b0fe48f…` | 1.3.4 | |
| Fairfield (`web/`) | `b0fe48f…` | 1.3.4 | |
| Communication | `b0fe48f…` | 1.3.4 | On `@127si/design-system` (no longer pre-v1 name). |
| Content | `2bf00ce…` | 1.0.1 | Full SHA pin; correct package name. |
| Shared Data | `cf48b9d…` | 1.3.3 | One patch behind the 1.3.4 cluster. |
| Curriculum | `6307af6…` | 1.8.1 | Ahead of the 1.3.4 cluster; small gap to 1.9.1. |
| TST | *(none)* | — | Does not depend on this package. |

Draft upgrade PRs (pin bump + lockfile only) should stay **draft** until Mike reviews visible UI changes.

---

## Bracket, Challenge, Fairfield, Communication (from v1.3.4)

**What you gain**

- **Registration layout** (`RegistrationShell`, `RegistrationStep`, `RegistrationSummary`) so new or
  refactored registration pages can match Referee and Challenge without local shells.
- **`DataTable`** and banner/toolbar pieces for large public directories (filters, mobile cards,
  export hooks). Optional until you wire them in.
- **Hero carousel** `washDirection="left"` for a softer left-edge wash on public heroes.
- **Accessibility and polish:** registration summary label contrast (v1.5.1), admin table keyboard
  scrolling, compiled `dist/utilities.css` so the app need not run Tailwind for design-system classes.
- **DataTable** toolbar layout and compact-density sizing fixes (v1.7.x–v1.9.1).

**What can break or need a visual check**

- **`AdminTable` restyle (v1.8.0)** — visible everywhere you use it: navy header, smaller body text,
  tighter rows. Compare admin list pages after upgrade.
- **Any screen that assumed old admin greys** — you are already on v1.3.4 brand colours; the jump to
  1.9.1 does not repeat the pre-v1 rename shock, but new components may expose token names you have
  not imported yet if you duplicated local CSS.
- **New optional APIs** — default props are safe; only pages that opt into `rowHeader`, `showSearch`,
  etc. change.

---

## Content (from v1.0.1)

**What you gain**

- Everything in the v1.3.4 section above, plus the whole arc from early v1 (public **TopNav**,
  **Footer**, **HeroCarousel**, full admin set, tokens and fonts aligned with Brand System v4).
- **`DataTable`** if Content admin or public pages adopt shared tables later.

**What can break or need a visual check**

- **`AdminTable` navy header (v1.8.0)** if Content uses `AdminTable` today.
- **Import and CSS paths** — you already use `@127si/design-system` and SHA pinning; re-run guard
  tests and scan admin chrome for layout shifts.
- **Larger dependency diff** than the 1.3.4 cluster (roughly 32 commits). Budget time for CI and a
  quick admin smoke pass.

---

## Shared Data (from v1.3.3)

Same story as the 1.3.4 group for behaviour; you pick up v1.3.4 fixes on the way to 1.9.1. Check
**`AdminTable`** pages for the v1.8.0 look.

---

## Curriculum (from v1.8.1)

**What you gain**

- **DataTable** toolbar contrast fix (v1.9.1) and **AdminTable** optional `rowHeader` / `captionHidden`
  (v1.9.0), both off by default.

**What can break**

- Little beyond regression risk; you already have the v1.8.0 **AdminTable** look. Run existing CI and
  spot-check admin tables.

---

## Referee (already on 1.9.1)

No pin change required for library code. Stay on `a7e6b6b` until the next tagged release.

---

## TST (not pinned — not adopted)

**What you would gain by adopting later**

- One shared **TopNav**, **Footer**, fonts and tokens; **`data-si-theme="tst"`** for the Scoreboard
  palette documented in `brand/themes/tst.css`.
- Same admin and public components as other platforms once local duplicates are removed.

**What can break**

- **Full visual migration** — TST today uses its own styling; adoption is a product decision, not a
  semver bump. ADR 0001 still has an open item: confirm live TST colours with Mike before pinning.
- **Enforcement** — you would add the design-system guard test and delete local chrome copies (d12–d14).

---

## Suggested order

1. Draft pin PRs for **Communication**, **Bracket**, **Challenge**, **Fairfield**, **Content**,
   **Shared Data** (largest visual risk on admin tables and Content's longer jump).
2. **Curriculum** (small delta).
3. **TST** only after owner palette sign-off and a dedicated adoption PR, not a pin-only bump.

Mike: push **git tags** `v1.4.0`–`v1.9.1` when ready (see `CHANGELOG.md` SHAs). Until then,
consumer PRs pin the documented commit directly. To turn on automatic upgrade PRs later: add
`CONSUMER_UPGRADE_TOKEN`, set `CONSUMER_UPGRADE_LIVE=true` — **do not enable live mode** until pins
and tags are stable.