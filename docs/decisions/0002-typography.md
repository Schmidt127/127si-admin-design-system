# ADR 0002: typography ruling

Status: Accepted. Display font is an **owner decision dated 2026-11-11**.

## Authority

The official 127 SI brand kit (2023) is the highest authority for `brand/`
([`brand/kit/README.md`](../../brand/kit/README.md)). The kit names two typefaces:

- **Display: Magistral.** A commercial font.
- **Supporting: Maven Pro.** Open (OFL).

## Owner decision, 2026-11-11

Asked about Magistral for web use, the owner decided: **"Lets use a replacement free font for magistral."**

So Magistral is not used as live text anywhere. It stays only inside the existing logo artwork. No Magistral
font files and no remote font service are added to any repository.

## Ruling

Three families, self-hosted from this package's `brand/fonts/` with their OFL licence files. No font is
loaded from a remote service at build or run time.

| Token | Family | Source | Weights | Use |
| --- | --- | --- | --- | --- |
| `--si-font-display` | **Saira** | Free replacement for the kit's Magistral (owner decision above) | 700, 800 | Navigation, hero headlines, page and section headings, table headers, buttons on public pages, athletic labels |
| `--si-font-body` | **Maven Pro** | Brand kit supporting type | 400, 500, 600, 700 | Public body text, forms, parent UI |
| `--si-font-data` | **Source Sans 3** | Brand System v4 extension | 400, 600, 700, 400 italic | Admin and dense data UI; italic quotes (Maven Pro has no true italic) |
| `--si-font-mono` | system monospace stack | This design system | | Codes, IDs |

Email stays Arial, Helvetica, sans-serif (Brand System v4). Logo artwork is never recreated in live text.

## Why Saira is the replacement

- `docs/brand/ECOSYSTEM-PUBLIC-SHELL.md` in Challenge (2026-11-09) already names Saira as the display face, and
  it is what Challenge, Communication, Curriculum, Shared Data and Bracket ship today, self-hosted with its
  OFL licence. Choosing it moves the fewest pixels.
- It takes over the "athletic accent" role Brand System v4 gave to Barlow Condensed, so there is one display
  face instead of two.

No other open font was evaluated side by side against Magistral. If someone later shows a closer match, that
is a suggestion for the owner; the token changes only on the owner's decision.

## What the code loaded before this ruling

Measured on 2026-11-11 ([baseline](../../baseline/INVENTORY.md)): Saira + Maven Pro on Challenge,
Communication, Curriculum, Shared Data and Bracket; Maven Pro + Source Sans 3 + Barlow Condensed on Referee;
Barlow + Barlow Condensed on Team Shot Tracker; Arial on Content; plus stray Geist, Inter, IBM Plex Sans,
Georgia and Segoe UI.

## Consequences

- Brand System v4's Typography System table (which lists "Magistral when licensed", "Maven Pro or Montserrat"
  headings, Barlow Condensed accents and Source Sans 3 body) is amended to this ruling when the brand doc
  moves into `brand/` (ADR 0001, decision 15). Until then this ADR governs typography for anything built on
  the package.
- Visible changes on adoption: Referee's condensed accents (Barlow Condensed) become Saira and its body
  becomes Maven Pro; Content's Arial becomes Maven Pro (public) and Source Sans 3 (admin); Curriculum drops
  Geist and Inter.
- Retired from UI: Barlow, Barlow Condensed, Bebas Neue, Manrope, Montserrat, IBM Plex Sans, Geist, Inter,
  Segoe UI, Georgia.
- Team Shot Tracker's exception is its palette. Its fonts follow this ruling unless the owner says
  otherwise; the `tst` theme does not override the font tokens.
