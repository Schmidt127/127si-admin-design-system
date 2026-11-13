# Admin table

`AdminTable` from `@127si/design-system`.

## What it is for

Dense, scannable lists of records in admin screens.

## When to use it

Any admin list of rows and columns. Put it inside an `AdminCard`. **Public** tables (rosters, standings,
directories on marketing or program pages) must use **`DataTable`**, not this component. See
[`docs/PUBLIC-DATA-TABLE.md`](../../docs/PUBLIC-DATA-TABLE.md).

## What may vary

- `columns` (`key`, `label`, optional `render`), `rows`, `rowKey`.
- `caption`: a short name for the table. Give one whenever the card title does not already name it.
- `emptyMessage`.

## What may not vary

- Header style, row height, borders and hover colour.
- It is always a real `<table>` with `scope="col"` headers; it scrolls sideways on narrow screens.
- Paging, sorting and filters are not in v1.0.0. If a page needs them, add them here first.
