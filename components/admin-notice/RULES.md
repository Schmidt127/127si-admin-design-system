# Admin notice

`AdminNotice` from `@127si/design-system`.

## What it is for

A message about the page or the result of the last action: saved, needs attention, failed, halted.

## When to use it

Any banner, alert or confirmation in admin screens. Do not hand-build a coloured box. Field-level errors
belong to `AdminField`, not here.

## What may vary

- `tone`: `info` (default), `success`, `warning`, `danger`.
- `title` (short lead) and the body. Lead with what the reader must do.

## What may not vary

- Colours: they are the brand status colours.
- Tone is never shown by colour alone: the text says what happened.
- `warning` and `danger` are announced to screen readers immediately (`role="alert"`); do not use them for
  routine information.
