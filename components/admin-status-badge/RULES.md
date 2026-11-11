# Admin status badge

`AdminStatusBadge` from `@127si/design-system`.

## What it is for

A small pill that shows the state of a record in admin lists and cards.

## When to use it

Wherever a status word appears next to a record: published, draft, paid, pending, failed. Do not invent a
local pill or colour a status word by hand.

## What may vary

- `status` (or the text child). Known states and their meaning:
  - green: `published`, `active`, `paid`, `complete`, `approved`
  - amber: `draft`, `pending`, `review`
  - red: `failed`, `blocked`, `error`, `cancelled`
  - anything else: neutral grey
- The visible label, by passing children.

## What may not vary

- The colours. They are the brand status colours (success, warning, danger).
- Status is never shown by colour alone: the badge always carries a word.
