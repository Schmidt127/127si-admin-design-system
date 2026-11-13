# Data table

`DataTable` from `@127si/design-system`.

## What it is for

Rich, modern roster tables for registered participants across 127SI platforms: sortable columns, filters,
optional staff-only fields, and a mobile card layout. Built on TanStack Table with brand styling inspired by
the Team Shot Tracker home teams table, but more expressive and on-brand.

## When to use it

- **Required** for every public-facing table in the 127SI ecosystem
  ([`docs/PUBLIC-DATA-TABLE.md`](../../docs/PUBLIC-DATA-TABLE.md), ADR 0003). Parent-facing URLs use the
  public column preset (no email or cell).
- Staff participant rosters and admin program lists that need search, filters, column visibility, density, or
  optional CSV export.
- Do not use for simple static lists inside `AdminCard`; use `AdminTable` when you do not need sorting,
  filters, or the participant cell chrome.

## What may vary

- `columns` (`DataTableColumnDef`: `id`, `header`, `accessorKey` / `accessorFn`, `cellKind`, optional `cell`).
- `rows`, `rowKey`, `caption`.
- `columnVisibilityPreset`: `"public"`, `"staff"`, or a column-id map.
- Participant presets: `participantColumnsPublic()`, `participantColumnsStaff()`, `PARTICIPANT_DEMO_ROWS`.
- `enableSelection`, `enableExport` (default off), `emptyState`, `theme` (`light` | `dark`), `density`,
  `showSchoolRail`, `showToolbar`.

## What may not vary

- Card radius, navy shadow, gradient header band, orange header rule, and orange interaction accents.
- Real `<table>` with `caption` and `scope="col"` on desktop; card list below 768px.
- Pinned first column on horizontal scroll.
- Pill semantics: grade (blue-light), jersey, clinics tiers, status (success / warning / danger; orange is not
  used for warnings).
- Hover wash, orange left rail, and selection tint.
- Styles come from `data-table.css` and `--si-*` tokens only.
- Consumers must install peer dependency `@tanstack/react-table` (v8+).
