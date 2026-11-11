# Admin toolbar

`AdminToolbar` from `@127si/design-system`.

## What it is for

The row above an admin table or list: filters and search on the left, actions on the right.

## When to use it

Whenever a list has filters, a search box or list-level buttons. One toolbar per list, directly above it.

## What may vary

- The filter controls (built with `AdminField`) and the `actions` (built with `AdminButton`).
- `label`, which names the group for screen readers.

## What may not vary

- Layout: filters left, actions right, wrapping on narrow screens.
- At most one primary (blue) button in `actions`.
