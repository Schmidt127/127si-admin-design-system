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
- `ImageComponent`: pass `next/image` in Next.js apps.
- `className` for layout only.

## What may not vary

- Page, sheet, fact and text colours; font families; radii and shadows (brand tokens only).
- The masthead title is an `h1`. The page never shows a second promotional hero.
- Program content (prices, dates, contacts, policies) comes from the app, never from defaults in the package.
