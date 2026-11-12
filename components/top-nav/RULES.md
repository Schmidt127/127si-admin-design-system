# Top navigation

`TopNav` from `@127si/design-system`. Master: Challenge `SiteHeader.tsx` (public shell standard, "Header").

## What it is for

The header of every public page on every platform: the 127 SI logo with the platform badge beneath it, the
primary links, one action button on the right, and a full-screen menu on phones.

## When to use it

Once, at the top of the public layout. Do not build another header, logo lockup or phone menu in a platform.
Full-page forms (registration, daily submission) have no site header. Admin uses the admin shell.

## What may vary

- `badge`: the platform or program name in the orange badge ("Challenges", "Referee", "Schools").
- `links`: the platform's own routes (real routes only). A link may have one level of `children`, shown as a
  dropdown.
- `action`: the one button on the right ("Parent Login", "Admin Login").
- `activeHref`: the current page.
- `logoSrc`: always the colour logo from `@127si/design-system/assets/logos/logo-full-color.png`.
- `LinkComponent`: the app's router link.

## What may not vary

- White sticky bar, 5.5rem tall, 4.75rem with a blue shadow once the page scrolls.
- The logo is 9rem wide at its natural proportions; it is never stretched or squashed.
- The badge sits directly under the logo: orange background, dark text, uppercase.
- Links are blue in the display font; the current and hovered link get the orange underline; the current link
  carries `aria-current="page"`.
- The action is a blue button with white text. One action only.
- Below 64rem the links collapse into the menu button. The menu covers the page, closes with Escape (focus
  returns to the menu button) and on navigation, and the page behind does not scroll while it is open.
- Team Shot Tracker gets its own colours from the `tst` theme; it does not restyle this component.
