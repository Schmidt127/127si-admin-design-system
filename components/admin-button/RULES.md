# Admin button

`AdminButton` from `@127si/design-system`.

## What it is for

Every button and button-styled link in admin screens.

## When to use it

Any admin action. Use `as="a"` (or pass a router link component) for navigation that should look like a
button. Do not write a raw `<button>` with local styles in admin.

## What may vary

- `variant`:
  - `primary` (default): blue with white text. The main action. One per view.
  - `secondary`: light blue with blue text and border.
  - `ghost`: transparent with a border, for low-emphasis actions.
  - `accent`: orange with dark text. Only for registration or action emphasis when blue already dominates.
  - `danger`: red. Only for destructive or serious corrective actions.
- The label, `as`, and normal element props (`type`, `onClick`, `href`, `disabled`).

## What may not vary

- Colours, size, radius and font weight.
- Orange is never the default action colour, and white text is never placed on orange.
- Before v1.0.0 `primary` was orange; it is blue from v1.0.0 (Brand System v4).
