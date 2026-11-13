# Adopting `DataTable` on a platform

Use this checklist when replacing a local public table with the shared component. Referee
`youth-participants` is the canonical first adopter.

## Checklist

1. **Pin the package** by the full 40-character commit SHA of the tagged release that includes `DataTable`
   (v1.4.0 or newer). Regenerate the platform lockfile in the same PR.
2. **Install peers:** `react`, `react-dom`, and `@tanstack/react-table` (v8+).
3. **Import styles** once globally (`fonts.css` + `styles.css`), not a tokens-only import, so `data-table.css`
   is included.
4. **Delete** local public table CSS and duplicate table components for that route (keep admin `AdminTable` until
   migrated separately if needed).
5. **Use the public preset:** `participantColumnsPublic()` and `columnVisibilityPreset="public"` on parent-facing
   URLs (no email or cell).
6. **Map data** to `ParticipantRow` (or a typed extension) in a thin wrapper; pass `rowKey`, `caption`, and
   `showSchoolRail` when schools supply colours.
7. **Verify mobile:** below 768px the component shows cards with a coloured left edge, avatar, name, and pills;
   confirm no horizontal overflow at 390px and 320px width.
8. **Verify a11y:** caption present, keyboard sort on headers, axe serious/critical clean on the page.
9. **Update** [`CONSUMER-ADOPTION.md`](CONSUMER-ADOPTION.md) in this repository when the platform PR merges
   (design-system repo PR or follow-up).

## Typed column config (public roster)

```tsx
"use client";

import {
  DataTable,
  participantColumnsPublic,
  type DataTableColumnDef,
  type ParticipantRow,
} from "@127si/design-system";

/** Extend only when the program needs extra fields; keep cellKind or custom render in the wrapper. */
type YouthParticipantRow = ParticipantRow & { programYear?: number };

const columns: Array<DataTableColumnDef<YouthParticipantRow>> = [
  ...participantColumnsPublic(),
  // Example optional column (staff routes use participantColumnsStaff() instead):
  // { id: "programYear", header: "Year", accessorKey: "programYear", tabular: true },
];

export function mapApiToRows(records: ApiRecord[]): YouthParticipantRow[] {
  return records.map((r) => ({
    id: r.id,
    firstName: r.firstName,
    lastName: r.lastName,
    school: r.schoolName,
    schoolColor: r.schoolPrimaryColor,
    grade: r.gradeLabel,
    jerseySize: r.jerseySize,
    clinicsAttended: r.clinicsCount,
    avatarUrl: r.photoUrl ?? undefined,
  }));
}
```

## Thin page wrapper (public route)

```tsx
"use client";

import { DataTable, participantColumnsPublic } from "@127si/design-system";
import { mapApiToRows, type YouthParticipantRow } from "./youth-participant-rows";

type Props = { records: ApiRecord[] };

export function YouthParticipantsTable({ records }: Props) {
  const rows = mapApiToRows(records);
  return (
    <DataTable<YouthParticipantRow>
      caption="Registered youth participants"
      columns={participantColumnsPublic()}
      rows={rows}
      rowKey={(row) => row.id}
      columnVisibilityPreset="public"
      showSchoolRail
      emptyState={{
        title: "No participants yet",
        message: "Registrations will appear here when families complete sign-up.",
      }}
    />
  );
}
```

Wire the wrapper from a server page that loads data; do not fetch inside `DataTable`.

## Staff-only routes

```tsx
<DataTable
  columns={participantColumnsStaff()}
  columnVisibilityPreset="staff"
  enableExport
  /* same rows + rowKey */
/>
```

## What not to copy

- Do not import Tailwind table utilities for these routes.
- Do not restyle `.si-dt-*` classes in the app.
- Do not use Challenge `StandingsTable` or TST `HomeTeamsTable` markup as the long-term source; migrate to
  `DataTable` when the route is touched.
