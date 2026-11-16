# DataTable usage

The Referee youth-participants directory is the reference implementation. Import from `@127si/design-system` after adding the package styles.

## Styles

```tsx
import "@127si/design-system/fonts.css";
import "@127si/design-system/styles.css";
```

`styles.css` includes every `DataTable` rule (premium gradient band, pills, badges, mobile cards). CI fails if those selectors are missing from `dist/styles.css` or `dist/components.css`.

Preview the catalogue example with styles loaded: `npm run preview:catalogue` then open `http://127.0.0.1:4173/catalogue/index.html` (serve **`dist/`** as the web root, not `dist/catalogue/` alone).

## Minimal example (Referee sample)

```tsx
import {
  DataTable,
  DataTableBanner,
  YOUTH_PARTICIPANT_SAMPLE_ROWS,
  youthParticipantColumns,
  YouthParticipantDataTableExample,
} from "@127si/design-system";

// Full Referee-style demo (catalogue uses this):
export function Page() {
  return <YouthParticipantDataTableExample />;
}
```

Compose your own banner and table:

```tsx
import { DataTable, DataTableBanner, schoolAccentColor } from "@127si/design-system";

const columns = youthParticipantColumns();

export function Directory({ rows }) {
  const enriched = rows.map((row) => ({
    ...row,
    schoolColor: schoolAccentColor(row.school),
  }));

  return (
    <DataTableBanner
      eyebrow="Your club"
      title="Youth Participants"
      lede="Public roster. Opt-outs are excluded."
      stats={[
        { id: "total", value: enriched.length, label: "Participants" },
      ]}
    >
      <DataTable
        columns={columns}
        rows={enriched}
        audience="public"
        variant="premium"
        enableClinicsTierFilter
        autoChipFilters={["school", "grade"]}
        showSchoolRail={false}
      />
    </DataTableBanner>
  );
}
```

## Column API

| Field | Purpose |
| --- | --- |
| `id`, `header` | Column identity and label |
| `accessorKey` / `accessorFn` | Sorting, search, export |
| `cellKind` | Built-in renderers: `participant`, `grade`, `jersey`, `clinics`, `badge` |
| `cell` | Custom renderer |
| `sensitiveKind` | `email`, `phone`, or `cell`; stripped when `audience="public"` |
| `enableSorting`, `enableHiding`, `tabular` | Behaviour flags |

## Row shape (participant cells)

Participant rows may include `firstName`, `lastName`, `school`, `schoolColor`, `avatarUrl`, and `publicDirectoryOptOut`.

Clinic tiers use `clinicsAttended` (number or null) with `cellKind: "clinics"` or export `clinicTierDisplay` / `clinicTierKind` from the package.

## Adopting on a live site

1. Bump `@127si/design-system` to the release that contains `DataTable`.
2. Import styles once in the root layout.
3. Replace local participant-table markup with `DataTableBanner` + `DataTable`.
4. Map API rows to the column accessors; never pass email/cell on public pages unless `audience="internal"`.
5. Honour `public_participant_directory_opt_out` in the query and set `publicDirectoryOptOut` on each row.
6. Keep page width at `max-width: 78rem` (`DataTableBanner` applies this on the directory shell).

See `components/data-table/youth-participant-example.tsx` for sample data and `components/data-table/RULES.md` for guardrails.