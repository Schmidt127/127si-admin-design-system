# Admin table

`AdminTable` from `@127si/design-system`.

## What it is for

Dense, scannable lists of records in admin screens.

## When to use it

Any admin list of rows and columns. Put it inside an `AdminCard`. Public tables (standings, directories) use
the public data table, not this one.

## What may vary

- `columns` (`key`, `label`, optional `render`), `rows`, `rowKey`.
- `caption`: a short name for the table. Give one whenever the card title does not already name it.
- `emptyMessage`.
- `captionHidden`: keep the caption for screen readers only, when the card title already names the table.
- `rowHeader`: render the first column as row headers (`th scope="row"`), for tables where each row has a name.

## What may not vary

- Header: the admin navigation colour (`--si-color-shell-deep`) with `--si-color-on-shell` text, uppercase labels, no wrapping.
- Body text is `--si-text-xs` (12px) with tabular numerals, in compact rows (`--si-space-1` top and bottom, `--si-space-2` sides). Borders and hover colour are fixed.
- It is always a real `<table>` with `scope="col"` headers; it scrolls sideways on narrow screens.
- Sorting and filters are not supported. Paging is a separate component: put `AdminPager` (`components/admin-pager/RULES.md`) below the table. If a page needs sorting or filters, add them here first.
