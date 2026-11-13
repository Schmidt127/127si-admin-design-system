# Registration step

`RegistrationStep` from `@127si/design-system`.

## What it is for

One step of a registration form (for example Participant, Parent, Review), shown as a card on the white form
sheet. Each step is a labelled region, so screen-reader users can jump between steps.

## When to use it

Once per step of a multi-step registration. Use it inside `RegistrationShell`. Do not nest a step inside a
step, and do not use it for a single-page form that has no steps.

## What may vary

- `title`, `subtitle`, `icon` (decorative only), and the step content.
- `hidden`, `inert` and `data-*` attributes, so an app can show one step at a time.
- `className` for layout only (margin, grid placement).

## What may not vary

- Card surface, border, radius, shadow and padding (brand tokens only).
- The title is always an `h2` with the id given in `headingId`.
- Step content must not change the card's own styling.
