# ADR 0002: typography ruling

Status: Accepted as the default, 2026-11-11. The owner may change it; it is a token change, not a rebuild.

## The conflict

Two standards on Challenge `main` disagree, and the code follows neither consistently.

| Role | Brand System v4, Typography System | Public shell standard (2026-11-09) |
| --- | --- | --- |
| Display, nav, headings | Maven Pro or Montserrat (headings); Barlow Condensed (athletic accents) | Saira 700/800 |
| Body | Source Sans 3 | Maven Pro 400-700 |
| Admin and data | Source Sans 3 or IBM Plex Sans | not covered |
| Email | Arial, Helvetica, sans-serif | not covered |

What `main` actually loads on 2026-11-11 ([baseline](../../baseline/INVENTORY.md)): Saira + Maven Pro on
Challenge, Communication, Curriculum, Shared Data and Bracket; Maven Pro + Source Sans 3 + Barlow Condensed
on Referee; Barlow + Barlow Condensed on Team Shot Tracker; Arial on Content; plus stray Geist, Inter, IBM
Plex Sans, Georgia and Segoe UI.

## Ruling

Three families, self-hosted from this package (never fetched from Google at build or run time):

| Token | Family | Weights | Use |
| --- | --- | --- | --- |
| `--si-font-display` | **Saira** | 700, 800 | Navigation, hero headlines, page and section headings, table headers, buttons on public pages, athletic labels. Takes over the "athletic accent" role from Barlow Condensed. |
| `--si-font-body` | **Maven Pro** | 400, 500, 600, 700 | Public body text, forms, parent UI. |
| `--si-font-data` | **Source Sans 3** | 400, 600, 700, 400 italic | Admin and dense data UI; italic quotes (Maven Pro has no true italic). |
| `--si-font-mono` | system monospace stack | | Codes, IDs. |

Email stays Arial, Helvetica, sans-serif. Logo artwork is never recreated in live text.

## Why

- The public shell standard is the later decision, it is what five public sites already ship, and it was
  applied ecosystem-wide two days ago. Choosing it moves the fewest pixels.
- Brand v4 already names Maven Pro and Source Sans 3; this ruling keeps both and assigns each one job, so
  the two documents agree on everything except the display face.
- One display face instead of two (Saira plus Barlow Condensed) removes a choice agents kept making
  differently.

## Consequences

- Brand v4's Typography System table is amended to this ruling when the brand doc moves into `brand/`
  (ADR 0001, decision 15). Until then this ADR governs typography for anything built on the package.
- Visible changes on adoption: Referee's condensed accents (Barlow Condensed) become Saira and its body
  becomes Maven Pro; Content's Arial becomes Source Sans 3 (admin) and Maven Pro (public); Curriculum drops
  Geist and Inter.
- Retired from UI: Barlow, Barlow Condensed, Bebas Neue, Manrope, Montserrat, IBM Plex Sans, Geist, Inter,
  Segoe UI, Georgia.
- Team Shot Tracker's exception is its palette. Its fonts follow this ruling unless the owner says
  otherwise; the `tst` theme does not override the font tokens.
