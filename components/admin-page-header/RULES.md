# Admin page header

`AdminPageHeader` from `@127si/design-system`.

## What it is for

The title block at the top of an admin page: optional eyebrow, the page title (the page's only `h1`), an
optional one-line description, and the page's main actions on the right.

## When to use it

Once per admin page, first thing inside the shell content. Do not hand-write an admin `h1` with its own styles.

## What may vary

- `title`, `description`, `eyebrow` text.
- `actions`: buttons built with `AdminButton`.

## What may not vary

- Heading level, size, colour and spacing.
- No more than one primary (blue) action in `actions`.
