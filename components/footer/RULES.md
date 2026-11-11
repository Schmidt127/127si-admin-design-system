# Footer

`Footer` (and `BackToTop`) from `@127si/design-system`. Master: Challenge `SiteFooter.tsx` (public shell
standard, "Footer").

## What it is for

The footer of every public page: the white 127 SI logo with the contact line, two columns of links, the legal
bar, and the back-to-top link.

## When to use it

Once, at the bottom of the public layout. Do not build another footer in a platform. Full-page forms and
admin have no site footer.

## What may vary

- `columns`: two columns of the platform's own routes, each with a title. Real routes only; never invent a
  link to fill space.
- `legalLinks`: privacy, terms and similar, only if the platform has those pages.
- `contact`: name, role, phone, email and the organisation's site. Use the current public contact details
  from the platform's own configuration, never the ones printed in the brand kit's sample stationery.
- `year`: passed from the server.
- `logoSrc` (always the white logo file) and `patternSrc` (pattern 3), both from
  `@127si/design-system/assets/`.

## What may not vary

- Blue background, 6px orange top border, the pattern at 8% strength, charcoal legal bar.
- The logo is the real white file. Never a colour logo turned white with a CSS filter.
- Link colour, column title style, spacing.
- The back-to-top link appears only after scrolling and is hidden from keyboard and screen readers until then.
- Team Shot Tracker gets its own colours from the `tst` theme; it does not restyle this component.
