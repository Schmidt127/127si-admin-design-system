# Admin pager

`AdminPager` from `@127si/design-system`.

## What it is for

Moving between pages of an admin list: Previous, "Page 2 of 7", Next.

## When to use it

Under any admin table or list that is split into pages. It renders nothing when there is one page.

## What may vary

- `page`, `pageCount`, `total` and the `noun` for the total ("record", "school").
- `hrefFor`, which builds the app's own page links, and `LinkComponent` (the app's router link).

## What may not vary

- The wording and order: Previous, status, Next.
- Pages are links, so they work without JavaScript and can be bookmarked. Do not turn them into buttons
  that fetch in place.
