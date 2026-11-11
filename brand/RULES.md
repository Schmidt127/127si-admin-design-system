# Brand rules

The base every component builds on: tokens, themes, fonts and logos. Binding on people and agents.

## What it is for

One definition of every colour, font, size, radius, shadow and spacing step used by a 127 Sports Intensity
platform. Standard: Brand System v4. Typography: [ADR 0002](../docs/decisions/0002-typography.md).

## When to use it

Always. An app imports the tokens once and then only writes `var(--si-*)`.

```css
@import "@127si/design-system/fonts.css";   /* the three brand families, self-hosted */
@import "@127si/design-system/styles.css";  /* tokens + every component's styles */
/* or, for tokens only: @import "@127si/design-system/tokens.css"; */
```

Tailwind v4 apps map tokens, they do not copy values:

```css
@theme inline {
  --color-primary: var(--si-color-primary);
  --font-sans: var(--si-font-body);
}
```

## What may vary

- **Theme.** Team Shot Tracker sets `data-si-theme="tst"` on `<html>`. Nobody else sets a theme.
- **Surface.** Admin areas set `data-si-surface="admin"` (the admin shell does this itself).
- **Program accent.** A program page may use one supporting colour for its assigned purpose: `--si-teal`
  (learning, Curriculum) or `--si-gold` (awards). Never as a replacement for blue and orange.
- **Imagery.** Photos and artwork are content and belong to the app.

## What may not vary

- No hex, `rgb()` or named colours in app or component CSS. Use a token. If a token is missing, add it here.
- No font families other than the three brand families. Never load fonts from Google at build or run time.
- Primary buttons are `--si-color-primary` with `--si-color-on-primary` text. Orange is the accent; text on
  orange is dark (`--si-color-on-accent`), and orange text on a light background uses `--si-color-accent-text`.
- Do not redefine a `--si-*` variable in an app. Do not define new `--127si-*` variables: they are deprecated
  aliases kept only until every platform has migrated.
- Logos come from `@127si/design-system/logos/`. Never redraw, recolour, stretch or CSS-invert a logo; use
  the white file on blue, black or photo backgrounds.
- No purple or neon gradients, glass panels, blobs or glows.

## Token groups

| Group | Examples |
| --- | --- |
| Palette | `--si-blue`, `--si-orange`, `--si-black`, `--si-gray-light`, `--si-success` |
| Colour roles | `--si-color-primary`, `--si-color-accent`, `--si-color-text`, `--si-color-surface`, `--si-color-border`, `--si-color-shell` |
| Type | `--si-font-display`, `--si-font-body`, `--si-font-data`, `--si-text-sm` to `--si-text-hero`, `--si-weight-bold` |
| Space and layout | `--si-space-1` to `--si-space-8`, `--si-container-max`, `--si-gutter`, `--si-section-pad` |
| Shape | `--si-radius-sm` to `--si-radius-xl`, `--si-radius-pill`, `--si-shadow-sm`, `--si-shadow-md` |
| Focus and layers | `--si-focus-ring`, `--si-focus-width`, `--si-z-header`, `--si-z-dialog` |

Use colour roles in components; use the palette only when a role does not fit.
