# The 127 SI brand kit

The official 127 Sports Intensity brand kit (four pages, 2023) is the **highest authority** for everything in
`brand/`. It outranks Brand System v4, the public shell standard and every other document.

## What the kit fixes

| Element | Kit value | Token |
| --- | --- | --- |
| Primary blue | `#0034B7` | `--si-blue` |
| Orange | `#FF8B00` | `--si-orange` |
| Off-white | `#F2F2F2` | `--si-gray-light` |
| Mid-gray | `#C4C4C4` | `--si-gray` |
| Charcoal | `#262626` | `--si-black` |
| Display type | Magistral | see below |
| Supporting type | Maven Pro | `--si-font-body` |
| Logos | Horizontal and stacked lockups, standalone symbol, circular stamp, light and dark versions | [`../assets/logos/`](../assets/logos/) |
| Stamps | Seven stamp marks | [`../assets/stamps/`](../assets/stamps/) |
| Pattern | Thin geometric line motif | [`../assets/patterns/`](../assets/patterns/) |

**Display type.** The kit's display face is Magistral, a commercial font. Owner decision, 2026-11-11: use a free
replacement on screen; Magistral stays only inside the existing logo artwork. The replacement is **Saira**
(700 and 800), self-hosted from `brand/fonts/` with its OFL licence. See
[ADR 0002](../../docs/decisions/0002-typography.md).

## What is an extension, and from where

Everything else in `brand/` extends the kit. `brand/tokens.css` labels every group with its source.

| Source | What it adds |
| --- | --- |
| Brand System v4 | Hover and light shades of blue and orange, `blue.deep #001F6B`, teal, gold, success, warning, danger, muted, Source Sans 3 for admin and data |
| Public shell standard | Saira as the on-screen display face, the container, gutter and section spacing |
| This design system | Text-safe variants needed for contrast (`--si-orange-text`, `--si-warning-text`, `--si-danger-text`, `--si-slate`), soft status surfaces, the hairline `--si-line`, the Team Shot Tracker theme |

An extension may never change a kit value. If the kit and an extension disagree, the kit wins and the
extension is corrected.

## Files

- [`127SI-CHALLENGE-ADMIN-BRAND-GUIDE.md`](127SI-CHALLENGE-ADMIN-BRAND-GUIDE.md): the transcription of the kit made for
  the Challenge admin (2026). Its layout advice is Challenge-specific; its "Facts shown in the source kit" table
  is the kit transcription used above.
- [`../assets/`](../assets/) with [`manifest.json`](../assets/manifest.json): the logo, stamp and pattern files.
- **The kit PDF is not in this repository.** This repository is public, and the kit's sample stationery shows
  old contact details (an earlier domain and a school email address). The PDF stays in the private Challenge
  repository at `brand-kit/source/127_SI_Brand_Kit (1).pdf` until the owner decides whether it may be
  published here.

Never reuse the contact details printed in the kit's stationery. Current contact details come from each
platform's own configuration.
