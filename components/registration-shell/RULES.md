# Registration shell

`RegistrationShell` from `@127si/design-system`.

## What it is for

The full-page layout for a public registration: the deep brand-blue page, the masthead (program name, place,
subtitle), an optional fact strip (date, location, grades, tuition) and the white form sheet that holds the
summary and the steps.

## When to use it

Once per public registration page (clinics, teams, mentors, challenges and future programs). Put
`RegistrationSummary` first and `RegistrationStep` cards inside it.

## What may vary

- `titleAccent`, `titlePlace`, `subtitle`, `facts`, `factsLabel`.
- The program picture (`formHeroSrc`, `formHeroAlt`). The picture file belongs to the app's
  `public/forms/<program>/` folder; the package never ships program photos.
- The background photo (`formBackgroundSrc`): the app's `public/forms/<program>/background.*`
  ([`docs/FORM-IMAGES.md`](../../docs/FORM-IMAGES.md)). Omit it for the plain deep-blue page.
- `logo`: the app's logo, with the app's own link to its home page. The package does not ship logo files here.
- `titleId`: the id of the title, so the form can name itself with it.
- `ImageComponent`: pass `next/image` in Next.js apps.
- `className` for layout only.

## What may not vary

- Page, sheet, fact and text colours; font families; radii and shadows (brand tokens only).
- How the background photo is shown: grey, at most 20% strength through the deep blue, fading to solid deep
  blue behind the lower form (Brand System v4, Full-page forms). It is always decorative (`alt=""`, inside an
  `aria-hidden` backdrop), so it never carries information; put anything a reader needs in text. A test
  checks that white, muted and orange masthead text keep WCAG AA contrast over a pure white photo at that
  strength; raising the strength fails it.
- The masthead title is an `h1`. The page never shows a second promotional hero.
- Program content (prices, dates, contacts, policies) comes from the app, never from defaults in the package.
