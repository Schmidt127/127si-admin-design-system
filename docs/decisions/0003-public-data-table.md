# ADR 0003: mandatory `DataTable` for every public table

Status: Accepted, 2026-11-13 (owner direction, DataTable v1.4.0).

## Context

Public rosters, standings-style directories, and other visitor-facing tables were implemented per platform
with local `<table>` markup, Tailwind classes, or one-off CSS. Copies drift from the brand, miss mobile
layouts, and repeat accessibility mistakes. ADR 0001 names the public shell standard's Tables section as a
master for a shared public table; the Team Shot Tracker home teams table (`HomeTeamsTable`) is the typography
and density baseline, not Challenge admin tables.

`DataTable` ships in `@127si/design-system` v1.4.0 with participant presets, toolbar, mobile cards, and
binding `components/data-table/RULES.md`. Referee `/youth-participants` will be the first consumer and the
reference implementation.

## Decisions

1. **Every public-facing table** on a 127 Sports Intensity platform (anything a parent, coach, or visitor
   reads on a marketing or program page, including embedded rosters and directories) **must** render through
   `DataTable` from `@127si/design-system`, with data and column configuration owned by the app.
2. **Hand-written public table styling is not allowed.** Platforms may not add bespoke CSS for visitor tables,
   duplicate the gradient header, pills, or mobile card pattern locally, or fork markup that mirrors `DataTable`.
   Admin-only dense lists inside `AdminCard` may still use `AdminTable` when sorting and filters are not
   required (see `components/admin-table/RULES.md`).
3. **Local wrappers are configuration only.** A platform file may map API records to rows, choose
   `participantColumnsPublic()` or an extended column list, set `columnVisibilityPreset`, `caption`, and
   `emptyState`. It must not change classes, structure, or colours.
4. **Public preset by default.** Parent-facing pages use `columnVisibilityPreset="public"` (no email, cell, or
   status unless the owner explicitly approves exposing them on a public URL).
5. **Enforcement** matches ADR 0001: each platform's guard test should fail on new local public `<table>` styling
   where `DataTable` applies, ratcheting from [`baseline/INVENTORY.md`](../../baseline/INVENTORY.md).
6. **Adoption tracking** lives in [`docs/CONSUMER-ADOPTION.md`](../CONSUMER-ADOPTION.md). All platforms start
   as **not adopted** for `DataTable` until their upgrade PR merges.

## Consequences

- Visual and accessibility fixes ship once in this repository and reach platforms on SHA upgrade.
- Consumers add peer dependency `@tanstack/react-table` (v8+).
- Replacing `HomeTeamsTable`, Challenge standings tables, and similar files is a deliberate migration per
  platform, not a drive-by in unrelated PRs.

## References

- Binding rules and recipes: [`docs/PUBLIC-DATA-TABLE.md`](../PUBLIC-DATA-TABLE.md)
- Adoption checklist: [`docs/PUBLIC-DATA-TABLE-ADOPTION.md`](../PUBLIC-DATA-TABLE-ADOPTION.md)
- Component RULES: [`components/data-table/RULES.md`](../../components/data-table/RULES.md)
