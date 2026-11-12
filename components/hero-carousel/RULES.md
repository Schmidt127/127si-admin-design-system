# Hero carousel

`HeroCarousel` from `@127si/design-system`. Master: Challenge `HeroSlideshow.tsx` (public shell standard,
"Hero carousel"), with the accessibility refinements from Referee's port and the slide counter.

## What it is for

The full-width photo carousel at the top of a platform's public home page: real program photos that fade from
one to the next behind a headline and one or two buttons.

## When to use it

Once, on the public home page, directly under the top navigation. Interior pages do not use it. Do not build
another slideshow in a platform.

## What may vary

- `slides`: the photos, each with alt text, an optional phone crop (`srcMobile`) and `objectPosition`.
  Pass `srcSet` from the app image optimiser (in Next.js, `getImageProps`) so phones do not download the
  full-size file.
  Photos are content and live in the platform.
  `caption` is one short line shown while that slide is up. A slide without `src` is the plain brand
  colour, for a message that has no real photo yet; never fill it with stock or generated art.
  `motion: "none"` keeps one photo still when the slow zoom would cut into it (heads at the top edge).
  `keepVisibleWidth` (a fraction of the photo's width) keeps a whole group in view on phones.
- `eyebrow`, `headline`, `subhead`, `primaryCta`, `secondaryCta`. In the headline, `<em>` or `<strong>`
  turns words orange.
- `children`: the platform's own extra block under the buttons (for example Challenge's "choose your
  challenge" list). `aside`: a compact card beside the copy on wide screens.
- `wash`: `false` only for Team Shot Tracker (owner decision 2026-11-09: no colour wash; text keeps a shadow).
- `intervalSeconds`, `label`, `LinkComponent`.

## What may not vary

- Full-bleed photos, crossfade, and the dark-to-brand wash that keeps the text readable.
- The primary button is orange with dark text; the secondary is a white outline. No other button styles.
- Controls: previous, next, pause or play, one dot per slide and the "01 / 03" counter, all labelled and
  reachable by keyboard. Autoplay pauses on hover and on keyboard focus.
- Reduced motion: no zoom and no crossfade, and slides stay at least 10 seconds.
- Only the visible slide has alt text; hidden slides are hidden from screen readers.
- If a photo fails to load, the slide shows the brand colour and the text stays readable.
- Photos must be real, program-relevant images. No generic stock or abstract art.
