# Public data table: ecosystem standard

Status: binding on people and agents. Authority: [ADR 0003](decisions/0003-public-data-table.md) (2026-11-13).

## What this governs

Every **public** table on a 127 Sports Intensity platform: participant rosters, program directories, team
lists on marketing pages, and any visitor-facing grid that looks like a data table. Registration **Before you
register** summaries are not tables and follow [`REGISTRATION-SUMMARY.md`](REGISTRATION-SUMMARY.md) instead.

## Mandatory component

Use **`DataTable`** from `@127si/design-system`. Import styles with the rest of the package:

```css
@import "@127si/design-system/fonts.css";
@import "@127si/design-system/styles.css";
```

Install the peer dependency in the consuming app:

```json
"@tanstack/react-table": "^8.21.0"
```

## What platforms may do

- Define **columns** (`DataTableColumnDef`) and **rows** from the owning API or database.
- Choose **`columnVisibilityPreset`**: `"public"` (default for parent-facing URLs), `"staff"` (adds email,
  cell, status), or a custom visibility map.
- Set **`caption`**, **`rowKey`**, **`emptyState`**, **`showSchoolRail`**, **`enableExport`** (off on public
  pages unless the owner approves download), and **`theme`** when the table sits on a dark band.
- Wrap the table in normal page layout (section, heading, prose). The wrapper must not re-style the table.

## What platforms may not do

- Hand-write a public `<table>` with custom header gradients, row hovers, or pill classes.
- Copy `DataTable` markup or CSS into the app "for speed."
- Expose email or cell on a **public** preset without owner approval.
- Use Challenge admin tables, legacy standings CSS, or Tailwind table recipes as a visual reference for new
  public work (TST `HomeTeamsTable` is the layout baseline only; the shipped look is `DataTable`).

## Presets shipped in the package

| Preset | Function | Visible columns |
| --- | --- | --- |
| Public | `participantColumnsPublic()` | Participant, school, grade, jersey size, jr ref clinics |
| Staff | `participantColumnsStaff()` | Public columns plus email, cell, status |

Row shape for demos and jr-ref-style rosters: `ParticipantRow` in `participantPresets.ts`.

## Reference consumer

**Referee** `youth-participants` will be the first adopted route and the implementation other platforms should
mirror after upgrade. Until that PR merges, no platform is marked adopted in
[`CONSUMER-ADOPTION.md`](CONSUMER-ADOPTION.md).

## Implementation recipe

Copy-paste starter and the platform checklist: [`PUBLIC-DATA-TABLE-ADOPTION.md`](PUBLIC-DATA-TABLE-ADOPTION.md).

Component binding detail: [`components/data-table/RULES.md`](../components/data-table/RULES.md).
