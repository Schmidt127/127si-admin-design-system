# Where form images go

Every full-page form (registration, daily submission) has two pictures that belong to the platform or
program, not to the shared design system:

| Slot | What it is | File name |
| --- | --- | --- |
| Background | The picture behind the deep-blue wash, seen faintly in grey | `background` |
| Header | The picture on the right side of the form header | `header` |

Logos, stamps, patterns and fonts are the same everywhere and live in this package (`brand/assets/`).
Form pictures are content: they stay in the platform that shows them.

## The one path, in every platform

```
<platform repo>/public/forms/<program>/background.<png|webp|jpg|svg>
<platform repo>/public/forms/<program>/header.<png|webp|jpg|svg>
```

- `<program>` is a short lowercase name with hyphens: `dribble`, `shooting`, `jr-ref`, `team`, `mentor`.
- `default` is the program name for "every form on this platform that has no folder of its own".
- One `background` and one `header` per folder. No dates, numbers or "(1)" in the name.

Examples:

```
127si-challenge-platform/public/forms/default/background.png
127si-challenge-platform/public/forms/dribble/header.webp
127si-referee-platform/public/forms/jr-ref/header.webp
```

## Replacing a picture

Save the new file over the old one, same folder, same name, same file type. Nothing else changes. It goes
live when that change is committed and deployed.

## Adding a picture for a new program, or a different file type

Save it in a new `public/forms/<program>/` folder, then ask an agent to register it. Each platform keeps a
short list of which programs have their own pictures (in Challenge: `src/lib/forms/form-images.ts`). A file
that is saved but not on that list is not shown.

## Picture guidance

- Background: a real program photo, landscape, at least 1600 px wide. It is shown in grey at low strength
  under the blue, so detail and colour do not matter; shape and contrast do.
- Header: about 4:3, at least 560 px wide. A transparent background works well on the blue header.
- Keep each file under about 500 KB; WebP is best for photos.
- Per Brand System v4, only the photo changes per program. The page colour, wash and texture are the same
  everywhere, and Team Shot Tracker keeps its Scoreboard palette.

## Status, 2026-11-11

| Platform | State |
| --- | --- |
| Challenge | Uses `public/forms/` |
| Referee | Still on `public/registration/intensity-v2/`; moves to `public/forms/` in its own PR |
| Others | No full-page forms on the shared look yet; they get `public/forms/` when their forms move to it |

When the shared form shell ships in this package it takes these two pictures as props, so the paths above
do not change.
