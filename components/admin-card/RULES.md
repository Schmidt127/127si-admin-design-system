# Admin card

`AdminCard` from `@127si/design-system`.

## What it is for

A white panel that groups one topic on an admin page: an optional header (title, description, actions) and a
body.

## When to use it

For each distinct block on an admin page (a table, a form section, a summary). Do not nest a card inside a
card. Public pages do not use it.

## What may vary

- `title`, `description`, `actions`, and the body content.
- `className` for layout only (grid placement, margin).

## What may not vary

- Surface colour, border, radius, shadow and padding.
- The title is an `h2`.
