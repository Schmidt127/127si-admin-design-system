# Data table

`DataTable` from `@127si/design-system`.

## What it is for

Rich participant rosters and similar public or staff lists: sortable columns, search and filters, optional
selection and CSV export, participant avatars and pills, and a mobile card layout. Built on TanStack Table
with brand styling (gradient header, pinned first column, on-brand pills).

## When to use it

- Participant rosters (school programs, clinics, registrations) on public or admin pages.
- Staff views that need extra columns (email, cell, status) via the staff column preset.
- Prefer `AdminTable` inside `AdminCard` when you only need a simple static list without sorting or toolbar
  chrome.

## What may vary

- `columns` (`DataTableColumnDef`: `id`, `header`, `accessorKey` / `accessorFn`, `cellKind`, optional `cell`).
- `rows`, `rowKey`, `caption`.
- `columnVisibilityPreset`: `"public"`, `"staff"`, or a column-id map.
- Helpers: `participantColumnsPublic()`, `participantColumnsStaff()`, `PARTICIPANT_DEMO_ROWS`.
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
