# Admin shell

`AdminShell`, `AdminSidebar`, `AdminHeader` from `@127si/design-system`.

## What it is for

The frame around every admin page on every platform: deep blue sidebar with the 127 mark, the platform label
and navigation; a white header; the page content; an optional footer.

## When to use it

Wrap every admin route in one `AdminShell` in the admin layout. Do not build a second sidebar, top bar or
admin navigation in a platform. Public and parent pages never use it.

## What may vary

- `platform`: one of `challenge`, `referee`, `curriculum`, `communication`, `content`, `shared-data`, `tst`,
  `bracket`. It sets the label ("127SI CHALLENGE ADMIN").
- `navigation`: the platform's own links (`href`, `label`, optional `icon`) and `activeHref`.
- `children` (page content) and `footer`.

## What may not vary

- Colours, fonts, sidebar width, spacing and the label style. They come from brand tokens.
- No local CSS that restyles `.si-admin-*` classes. If the shell needs to change, change it here.
- The shell sets `data-si-surface="admin"`; do not remove it.
