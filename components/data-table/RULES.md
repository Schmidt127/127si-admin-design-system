# Data table

`DataTable`, `DataTableBanner` and helpers from `@127si/design-system`.

## What it is for

Public and admin-facing rosters with filters, badges, stats, empty/loading states, and a phone-width card layout.
The default `premium` variant matches the approved Referee youth-participants directory.

## When to use it

- Public participant or athlete directories.
- Any roster that needs tier filter pills, school/grade chips, and orange clinic badges.

Use `AdminTable` for simple admin-only lists inside `AdminCard`.

## Privacy (public tables)

- Set `audience="public"` (default). Email, phone and cell columns tagged with `sensitiveKind` are never rendered.
- Rows with `publicDirectoryOptOut: true` are omitted. Override with `optOutField` when needed.
- Filter opted-out rows in the data layer as well; the component is a second guard.

## What may vary

- `columns`, `rows`, `rowKey`, `caption`, `emptyState`, `loading`, `chipFilters`, `autoChipFilters`.
- `DataTableBanner`: `eyebrow`, `title`, `lede`, `stats` (max width 78rem).
- `variant`: `premium` (Referee default) or `standard`.
- `theme`: `light` or `dark`.

## Toolbar layout

- Filter chips, search, and the live row count live in the toolbar.
- Row density and column visibility sit on the caption bar (right-aligned, ghost style), not in the toolbar.

## What may not vary

- Navy-to-blue gradient header band, 3px orange rule, tier badge colours, and premium row hover.
- Maven Pro column headers and banner title; Source Sans 3 table body (`--si-font-data`).
- Mobile card layout below 48rem instead of horizontal scroll.