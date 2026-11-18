# 127 Sports Intensity Brand System v4

> **Canonical copy.** This file is the home of Brand System v4 (ADR 0001, decision 15). It was moved here on
> 2026-11-18 from `127si-challenge-platform/docs/brand/127_SPORTS_INTENSITY_BRAND_SYSTEM_V4.md` as of
> Challenge commit `5b0e1a7` (2026-11-09). Copies in platform repositories are pointers to this file.
>
> **Authority.** The official brand kit ([`kit/README.md`](kit/README.md)) outranks this guide. This guide
> extends the kit; [`RULES.md`](RULES.md) and [`tokens.css`](tokens.css) are how the design system applies it.
>
> **Changes made on the move.** The Typography System table is amended to the owner's 2026-11-11 ruling
> ([ADR 0002](../docs/decisions/0002-typography.md)); the old rows are kept below it for the record.
> Implementation priority 1 now points here. Nothing else changed.

Enterprise brand, design, template, and agent-use standard.

This guide is the required brand reference for 127 Sports Intensity websites, software platforms, emails, documents, public pages, parent pages, admin pages, social graphics, and future program materials.

## Required Use Rule

Any person or agent creating or editing 127 SI webpages, app UI, emails, PDFs, Word documents, presentations, social graphics, certificates, or public-facing copy must read this guide first.

Do not invent a new theme, color palette, font system, email style, document format, or page design when this guide already defines the rule.

If a platform has existing tokens or components, extend them using this guide rather than replacing them with a separate visual system.

If a request conflicts with this guide, pause and identify the conflict before changing production-facing design.

## Official Source Assets

- Brand kit: brand kit PDF and AI source file. Highest authority for official colors, fonts, logo variants, pattern, and stationery direction.
- Logos: blue/orange, gray/orange, white, black PNG and SVG sets.
- Stamps: seven stamp marks in PNG and SVG.
- Patterns: five line patterns in PNG and SVG.
- Stationery: business card, letterhead PDF and DOCX.
- Social assets: profile pictures, banners, platform icons.

## Brand Architecture

- Parent brand: 127 Sports Intensity. Umbrella identity. All programs inherit this brand foundation.
- Local organization: Fairfield Basketball Club. Community anchor and local public identity.
- Platforms: Challenge Platform, Curriculum Platform, Communication Platform. Each platform may have distinct workflows, but not a separate brand.
- Programs: Dribble Challenge, Shooting Challenge, Team Shot Tracker, Jr Ref Clinic. Program pages may use sub-palettes and imagery while preserving parent brand.
- Instances: 2027 Dribble Challenge, etc. Time-bound operating instance with dates, rules, registrations, communications, and outcomes.

## Official Color System

| Token         |     Hex | Role                                                                   |
| ------------- | ------: | ---------------------------------------------------------------------- |
| brand.blue    | #0034B7 | Primary brand, trust, structure, wordmark, primary buttons, active nav |
| brand.orange  | #FF8B00 | Energy, action, movement, athletic accent, key callouts                |
| neutral.black | #262626 | Primary text, black mark, formal print                                 |
| neutral.gray  | #C4C4C4 | Secondary marks, borders, disabled states                              |
| neutral.light | #F2F2F2 | Watermark, soft sections, light page surfaces                          |
| white         | #FFFFFF | Main background and reverse space                                      |

## Extended Digital Color System

| Token              |     Hex | Role                                                          |
| ------------------ | ------: | ------------------------------------------------------------- |
| brand.blue.hover   | #002A94 | Blue hover, active, selected state                            |
| brand.blue.deep    | #001F6B | Full-page form background (see Full-page forms)               |
| brand.blue.light   | #E8F0FF | Soft branded surface and selected row                         |
| brand.orange.hover | #D97700 | Orange hover and strong accent                                |
| brand.orange.light | #FFF1DC | Soft warm surface and highlight                               |
| accent.teal        | #0F766E | Learning, growth, curriculum progress, calm positive progress |
| accent.teal.light  | #E6FFFA | Soft learning or parent progress section                      |
| accent.gold        | #F5B301 | Awards, milestones, streak celebration, certificates          |
| accent.gold.light  | #FFF7D6 | Soft award surface and recognition background                 |
| success            | #15803D | Complete, paid, passed, verified upload                       |
| warning            | #D97706 | Pending, needs review, approaching deadline                   |
| danger             | #DC2626 | Failed, blocked, destructive, serious error                   |
| muted              | #64748B | Helper text and lower-priority metadata                       |

## Color Use Rules

- Blue and orange are the core identity.
- Teal and gold are supporting colors with assigned purposes, not replacement brand colors.
- Avoid purple gradients, neon blends, glass panels, floating decorative blobs, random glow effects, and generic AI/SaaS visual patterns.
- Use mostly solid colors, official patterns, light surfaces, real sports imagery, and clean borders.
- Use gold sparingly so awards feel earned.
- Use teal for learning and growth, not for every positive state.

## Full-page forms (ecosystem standard)

Every public form across the 127 ecosystem uses the same page look and behavior; only the questions differ. That covers individual, team, mentor and clinic registration (multi-step) and daily submissions such as minutes or shots (one page, phone first). The JR Ref clinic registration at `referee.fairfieldbasketballclub.com/clinics/<slug>/register` is the reference implementation. Admin forms stay on the shared admin design system.

| Layer           | Standard                                                                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page background | `brand.blue.deep` `#001F6B`. No site header or marketing chrome.                                                                                                |
| Image wash      | A real program photo in grayscale, seen at about 20% opacity through the deep blue (roughly an 80% blue wash), fading to solid deep blue behind the lower form. |
| Texture         | The diamond lattice, faint: white lines at about 26% layer opacity, soft-light blend, 68px tile. Texture only; never competes with the photo or text.           |
| Masthead        | Translucent brand blue panel; white title; program name in `brand.orange`.                                                                                      |
| Form sheet      | White card, `neutral.black` `#262626` text, section headings in `brand.blue`.                                                                                   |
| Primary button  | `brand.blue` with white text; `brand.blue.hover` on hover.                                                                                                      |
| Accents         | `brand.orange` only for the current step, progress bar, fact labels, required marks and small icons. Never body text on white.                                  |
| Status          | `success`, `warning`, `danger` from the extended palette.                                                                                                       |

Per program, change only the photo and, if needed, one small accent (for example `accent.teal` for Curriculum). The page color, wash and texture stay the same everywhere. Team Shot Tracker keeps its own scoreboard palette.

Daily submission forms use the same page with a short photo band instead of the full masthead, a single page with no step tracker, large inputs, and an immediate confirmation.

## Typography System

Amended 2026-11-18 to the owner's ruling of 2026-11-11 ([ADR 0002](../docs/decisions/0002-typography.md)): Magistral
is not used as live text; Saira replaces it on screen. All three families are self-hosted from
[`fonts/`](fonts/) with their OFL licences; no font loads from a remote service.

| Use                        | Font                           | Token               | Rule                                                                 |
| -------------------------- | ------------------------------ | ------------------- | -------------------------------------------------------------------- |
| Logo                       | Official logo artwork          |                     | Do not recreate the logo with live text                              |
| Brand/display, headings    | Saira 700, 800                 | `--si-font-display` | Free replacement for the kit's Magistral; navigation, hero headlines, page and section headings, table headers, athletic labels |
| Body and parent UI         | Maven Pro 400 to 700           | `--si-font-body`    | Kit supporting type; public body text, forms, parent UI              |
| Admin/data UI              | Source Sans 3 400, 600, 700    | `--si-font-data`    | Dense tables, dashboards, filters, operational pages; italic quotes  |
| Codes and IDs              | System monospace stack         | `--si-font-mono`    |                                                                      |
| Emails                     | Arial, Helvetica, sans-serif   |                     | Email clients must remain readable without custom fonts              |

Retired from UI: Magistral as live text, Montserrat, Barlow Condensed (its athletic-accent role goes to Saira),
IBM Plex Sans, and every other face listed in ADR 0002.

<details>
<summary>Typography table before the 2026-11-11 ruling (superseded)</summary>

| Use                  | Preferred Font                 | Fallback Rule                                                               |
| -------------------- | ------------------------------ | --------------------------------------------------------------------------- |
| Logo                 | Official logo artwork          | Do not recreate the logo with live text                                     |
| Brand/display assets | Magistral when licensed        | If license is unclear, keep Magistral only inside existing logo/assets      |
| Marketing headings   | Maven Pro or Montserrat        | Public pages, document covers, section headings                             |
| Athletic accents     | Barlow Condensed               | Hero labels, leaderboard headings, awards, challenge moments; use sparingly |
| Body and parent UI   | Source Sans 3                  | Explanations, forms, instructions, app UI                                   |
| Admin/data UI        | Source Sans 3 or IBM Plex Sans | Dense tables, dashboards, filters, operational pages                        |
| Emails               | Arial, Helvetica, sans-serif   | Email clients must remain readable without custom fonts                     |

</details>

## Logo And Asset Rules

- Blue wordmark: primary website, document, and email identity on light backgrounds.
- Blue/orange full logo: main full-color lockup for public pages, covers, cards, social, and branded sections.
- Icon mark: favicon, app icon, profile image, compact UI mark.
- White logo: use only on blue, black, or dark photo overlays with sufficient contrast.
- Black logo: one-color printing, forms, engraving, low-color contexts.
- Gray/orange logo: softer secondary mark when full blue is too strong.
- Stamp marks: awards, certificates, apparel, athletic graphics, watermarks, program flair.

Do not stretch, recolor, distort, crop, rotate, outline, add drop shadows, or place logos on low-contrast backgrounds.

## Component Design System

| Component        | Rule                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Primary button   | brand.blue background, white text, brand.blue.hover on hover                                        |
| Secondary button | White or brand.blue.light with blue text and border                                                 |
| Accent button    | Orange only for registration/action emphasis when blue is already dominant                          |
| Danger button    | Danger red only for destructive or serious corrective action                                        |
| Cards            | White surface, light border, restrained shadow, no unnecessary nested cards                         |
| Forms            | Required fields visible, clear helper text, specific error messages, accessible focus states        |
| Tables           | Admin tables dense and scannable; public tables simpler with explanatory labels                     |
| Alerts           | Use success, warning, danger, and info consistently; lead with action needed                        |
| Badges           | Stable badge tokens for XP, streaks, milestones, payment, video, attendance, registration           |
| Uploads          | Show required state, progress, preview, failure recovery, and durable storage status where relevant |

## Badge And Award System

- XP: blue with light blue surface.
- Streak: gold with blue support.
- Milestone: gold or orange.
- Learning/Curriculum: teal.
- Video Feedback: teal or blue.
- Payment/Registration: success, warning, danger.
- Admin Exception: warning/danger.

## Template Library Rules

- Public web pages: explain clearly, encourage registration, use real imagery, strong blue structure, orange CTAs, no generic SaaS design.
- Parent portal pages: practical, reassuring, next-step focused, private progress only behind sign-in.
- Admin pages: operational, dense, filterable, status-first, existing admin nav retained.
- Emails: logo header, blue primary button, orange/gold accents only when useful, safe fonts, consistent footer.
- Documents: logo cover/header, blue section structure, readable body, tables with blue headers, restrained accent use.
- Manuals and game guides: clear section hierarchy, rules, checklists, schedules, diagrams/tables where useful, parent/athlete action steps.
- Certificates: more celebratory, gold permitted, stamp mark appropriate, still clean and official.
- Social graphics: official pattern, logo, blue/orange identity, brief text, no off-brand effects.
- Motivational quotes: use the matching style from the Motivational Quote System (email, document, website, or graphic).

## Audience Layer Rules

- Public visitor: understand and register. Show overview, dates, cost, expectations, public progress, FAQ. Protect private feedback, videos by default, payments, contacts, admin notes.
- Parent/guardian: know what to do. Show child progress, private feedback, videos, homework, schedule, next action. Protect other families private records and admin-only notes.
- Athlete: stay motivated. Show progress, awards, goals, next action. Protect sensitive admin/payment/family data.
- Admin/coach: operate program. Show all relevant records, exceptions, reviews, corrections, communication state. Avoid public exposure of private operational data.

## Platform Specific Rules

- Challenge Platform: primary blue/orange sports identity. Gold for streaks/milestones. Teal for coaching/growth/lesson progress.
- Curriculum Platform: same parent brand. Teal may be more prominent for learning, but blue remains the anchor.
- Communication Platform: brand shows through email templates, buttons, headers, footers, and tone. Admin UI remains restrained.
- Team Shot Tracker: blue/orange team sports feel. No XP styling unless intentionally added later.
- Jr Ref Clinic: blue/black/orange with clean educational structure. Use orange for rule emphasis and action.

## Document Formatting Rules

- Cover: logo, document title, program name, season/year, restrained blue/orange structure.
- Headings: Maven Pro or approved fallback; clear hierarchy; avoid oversized text except cover.
- Body: Source Sans 3, Aptos, or other approved readable font.
- Tables: blue header row, light borders, adequate padding, repeated headers for long tables.
- Checklists: simple checkboxes or bullets; do not make dense spreadsheet-like forms.
- Callouts: restrained text emphasis; avoid heavy boxes and decorative clutter. Motivational quotes use the Document Quote Block (see Motivational Quote System).
- Footers: document title or program name plus page number.
- Images: real program imagery where possible, with clear cropping and captions when needed.

## Email Template Rules

- Use official logo image in the header when supported.
- Do not rely on special web fonts in email.
- Use royal blue for the main button and dark text for readability.
- Orange, gold, and teal may support achievements and learning moments.
- Every email should state who it is about, what happened or is needed, and the next action.
- Never include expiring signed media URLs as permanent images.
- Footer should be consistent across Communication Platform templates.

## Motivational Quote System

Motivational quotes (for example, Challenge-specific quotes in Daily Check-In confirmation emails) use one of four related quote styles. All four share one anatomy so a family recognizes the same 127 SI quote whether it arrives by email, in a manual, on the website, or on a poster. Each medium may use its own strengths and limitations.

### Decision Rule

| Medium                                                  | Use                        |
| ------------------------------------------------------- | -------------------------- |
| Any email                                               | Email Quote Block          |
| Manuals, parent guides, packets, handouts, PDF/Word     | Document Quote Block       |
| Public pages, landing pages, parent portal, athlete UI  | Website Quote Block        |
| Standalone visuals: social, posters, cards, award image | Graphic/Social Quote Style |

If a piece spans media (for example, a web page later exported to PDF), style it for the final medium the reader sees.

### Shared Anatomy

Every quote style keeps these elements so the four remain visibly related:

1. **Blue structure.** A `brand.blue` (`#0034B7`) vertical rule on the left, or a solid blue field on graphics.
2. **Orange accent.** One short `brand.orange` (`#FF8B00`) bar or thin rule. Orange is an accent only; never use it for quote or attribution text on white or light surfaces (about 2.3:1 contrast).
3. **Quote text.** Sentence case, typographic quotation marks (“ ”), italic where the font supports it. Never set the full quote in all caps.
4. **Attribution.** On its own line, separated from the quote by space, led by an em dash: `— Name`. Bold, not italic. Optional second line for role or context in `neutral.black` or `muted`.

### Content Rules (All Styles)

- One quote per email, page section, or graphic.
- Keep quotes short: about 40 words maximum for email, documents, and web; about 25 words for graphics.
- Verify attribution before publishing. If the author cannot be verified, use `— Unknown` or do not use the quote. Never invent or embellish a quote.
- A quote supports the message; it never replaces the required content. In emails, the quote comes after who/what/next action, never above it.
- Quotes may be Challenge-specific (for example, a shooting quote in the Shooting Challenge), but styling does not change by Challenge.

### 1. Email Quote Block

**Purpose.** Daily Check-In confirmations, welcome emails, weekly summaries, Zoom reminders, and other family communications.

**When to use.** Any email that includes a motivational quote. Place it after the main content and before the footer.

**Visual description.** Conservative, clean, classic varsity feel. A very light blue panel with a 4px blue left rule, a short orange bar above the quote, the quote in italic dark text slightly larger than body text, and a bold blue attribution line below.

**Do**

- Build with a single-column `<table>` layout and inline styles only.
- Use `bgcolor` attributes alongside inline `background-color` so Outlook renders the panel.
- Use the Arial/Helvetica font stack from the Typography System.
- Keep the block full width of the email content column (`width="100%"`) so it reflows on mobile.

**Don't**

- Do not use CSS transforms, skewing, pseudo-elements, absolute/relative positioning, floats, background images, web fonts, or image-based quote marks.
- Do not use neon colors, black/red powerlifting styling, heavy drop shadows, or all-caps quotes.
- Do not put a CTA button inside the quote block.

**Example layout guidance.** Content column (max 600px) → 24px space → quote panel (orange bar, quote, attribution) → 24px space → footer.

**Color usage.** Panel `brand.blue.light` `#E8F0FF`; left rule `brand.blue` `#0034B7`; accent bar `brand.orange` `#FF8B00`; quote text `neutral.black` `#262626`; attribution `brand.blue` `#0034B7`.

**Typography.** `Arial, Helvetica, sans-serif`. Quote 18px italic, line-height 1.5 (body text is 16px). Attribution 15px bold, not italic.

**Spacing.** Panel padding 20px 24px (16px 20px is acceptable in tight templates). Orange bar 40px × 3px with 12px below. 12px between quote and attribution.

**Accessibility and readability.** Quote text on the panel exceeds 12:1 contrast; blue attribution on the panel exceeds 8:1. Dark-mode aware: the block uses only solid colors and text (no images or transparent PNGs), so clients that invert colors keep the rule, bar, and text legible. Do not rely on white text anywhere in the block, which can disappear when a client forces a light background. Quote text stays real text so screen readers read it.

**Email-safe example.**

```html
<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="margin:24px 0;"
>
  <tr>
    <td
      bgcolor="#E8F0FF"
      style="background-color:#E8F0FF;border-left:4px solid #0034B7;padding:20px 24px;font-family:Arial,Helvetica,sans-serif;"
    >
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td
            width="40"
            height="3"
            bgcolor="#FF8B00"
            style="background-color:#FF8B00;font-size:0;line-height:0;"
          >
            &nbsp;
          </td>
        </tr>
      </table>
      <p style="margin:12px 0 0;font-size:18px;line-height:1.5;font-style:italic;color:#262626;">
        “You miss 100% of the shots you don’t take.”
      </p>
      <p style="margin:12px 0 0;font-size:15px;line-height:1.4;font-weight:bold;color:#0034B7;">
        — Wayne Gretzky
      </p>
    </td>
  </tr>
</table>
```

### 2. Document Quote Block

**Purpose.** Player manuals, parent guides, coaching packets, curriculum handouts, and PDF/Word exports.

**When to use.** To open a section, close a chapter, or set the tone of a packet. Use sparingly: about one per major section.

**Visual description.** The Email Quote Block adapted for print: a blue left rule, a thin orange top rule, a light gray panel, comfortable padding, italic quote, and a right-aligned attribution. This is the one sanctioned boxed callout; it stays restrained (no full border box, no shadow).

**Do**

- Use a light `neutral.light` panel so it prints cleanly and survives grayscale.
- Keep the quote readable when printed in black and white: structure comes from the rules and italics, not from color alone.
- Keep the block with its attribution on the same page ("keep with next" in Word).

**Don't**

- Do not place quotes inside tables, over photos, or in page headers/footers.
- Do not stack multiple quote blocks or use them as decoration between every heading.
- Do not use colored text for the quote.

**Example layout guidance.** Section heading → quote block → body text. Block spans the text column width; indent is created by padding, not by narrowing the margins.

**Color usage.** Panel `neutral.light` `#F2F2F2`; left rule `brand.blue` `#0034B7` (4.5pt); top rule `brand.orange` `#FF8B00` (1.5pt); quote `neutral.black` `#262626`; attribution `brand.blue` `#0034B7` or `neutral.black`. In grayscale the blue rule prints dark and the orange rule prints mid-gray, so both remain visible.

**Typography.** Body font from Document Formatting Rules (Source Sans 3, Aptos, or approved fallback). Quote italic at body size + 2pt (for example 13pt on 11pt body), line spacing 1.3. Attribution bold, not italic, at body size.

**Spacing.** Padding 12pt top/bottom and 16pt left/right. 12pt space before and after the block. 6pt between quote and attribution.

**Accessibility and readability.** Tagged PDFs: export the quote as real text (not an image). Keep contrast high; the gray panel must not be darker than `#F2F2F2`.

**Word/PDF formatting guidance.**

1. Create a paragraph style named `SI Quote`: body font, italic, body size + 2pt, color `#262626`, line spacing 1.3, space before 12pt.
2. Paragraph borders: left border solid `#0034B7` 4.5pt with 12pt text distance; top border solid `#FF8B00` 1.5pt.
3. Paragraph shading: `#F2F2F2`. Left and right indent 0; set border-to-text padding to 12-16pt.
4. Create `SI Quote Attribution`: same shading and left border (no top border), bold, not italic, right-aligned, space after 12pt, "keep with previous."
5. Type the attribution as `— Name` (em dash, then a space).

### 3. Website Quote Block

**Purpose.** Public website sections, Challenge landing pages, parent portal motivation sections, and athlete progress pages.

**When to use.** As a single motivational band within a page, typically between content sections or near progress summaries. Not in admin pages.

**Visual description.** More expressive than email or documents: larger responsive typography, a subtle full-width `brand.blue.light` band, the blue left rule, a short orange bar, and an optional official stamp or the court-line pattern at low contrast. Same blue/orange varsity identity.

**Do**

- Use the shared component class, not per-page one-off styling.
- Use a semantic `<figure>` with `<blockquote>` and `<figcaption>`.
- Use official assets only for decoration: `public/brand/Stamp_*.png` or `public/brand/patterns/court-line-pattern.svg`, decorative (`alt=""` / `aria-hidden`).
- Offer a blue-field variant (white quote, orange bar) for high-emphasis moments, at most one per page.

**Don't**

- Do not add animations that delay reading the quote, parallax, glass effects, gradients, glows, or floating decorative shapes.
- Do not place quote text over photos without a solid overlay.
- Do not use Magistral or Barlow Condensed for the quote body.

**Example layout guidance.** Full-width band → centered content container (max about 48rem for the quote) → orange bar → quote → attribution. Optional stamp sits at the band's right edge, hidden on narrow screens.

**Color usage.** Light variant: band `brand.blue.light`, rule `brand.blue`, bar `brand.orange`, quote `neutral.black`, attribution `brand.blue`. Blue variant: band `brand.blue`, bar `brand.orange`, quote and attribution white.

**Typography.** Quote in Source Sans 3 italic (Maven Pro has no true italic), `clamp(1.25rem, 1rem + 1.2vw, 1.75rem)`, line-height 1.45. Attribution Source Sans 3 bold, 1rem; an optional short context label may use Barlow Condensed uppercase.

**Spacing.** Band padding `clamp(2rem, 5vw, 4rem)` vertical. Left rule 6px; 1.5rem between rule and text. Orange bar 3rem × 4px with 1rem below. 1rem between quote and attribution.

**Accessibility and readability.** Minimum 20px quote text on mobile. Light variant exceeds 12:1; blue variant white text exceeds 9:1. Do not use orange text on white. Decorative stamps and patterns must not reduce text contrast.

**CSS example** (uses the Brand System v4 `--xp-*` tokens from `src/styles/marketing-experience.css`, with v4 fallbacks):

```css
.si-quote {
  margin: 0;
  padding-block: clamp(2rem, 5vw, 4rem);
  background: var(--xp-blue-light, #e8f0ff);
}
.si-quote__inner {
  max-width: 48rem;
  margin-inline: auto;
  padding-left: 1.5rem;
  border-left: 6px solid var(--xp-blue, #0034b7);
}
.si-quote__inner::before {
  content: "";
  display: block;
  width: 3rem;
  height: 4px;
  margin-bottom: 1rem;
  background: var(--xp-orange, #ff8b00);
}
.si-quote blockquote {
  margin: 0;
  font-style: italic;
  font-size: clamp(1.25rem, 1rem + 1.2vw, 1.75rem);
  line-height: 1.45;
  color: var(--xp-ink, #262626);
}
.si-quote figcaption {
  margin-top: 1rem;
  font-weight: 700;
  color: var(--xp-blue, #0034b7);
}
.si-quote--blue {
  background: var(--xp-blue, #0034b7);
}
.si-quote--blue .si-quote__inner {
  border-left-color: var(--xp-white, #ffffff);
}
.si-quote--blue blockquote,
.si-quote--blue figcaption {
  color: var(--xp-white, #ffffff);
}
```

```html
<figure class="si-quote">
  <div class="si-quote__inner">
    <blockquote><p>“You miss 100% of the shots you don’t take.”</p></blockquote>
    <figcaption>— Wayne Gretzky</figcaption>
  </div>
</figure>
```

### 4. Graphic/Social Quote Style

**Purpose.** Social graphics, posters, printable challenge cards, Canva-style graphics, and award/recognition images.

**When to use.** When the quote is the whole message and stands alone as a visual.

**Visual description.** Strong athletic layout: large quote text dominating the canvas, a solid blue field or white field, an orange accent bar, clear attribution, and the official logo in a fixed position. The official line pattern or a stamp may add texture at low contrast.

**Do**

- Use official logos from `public/brand/` (or the brand kit source files) without modification.
- Use the white logo on blue fields and the blue or blue/orange logo on white fields.
- Keep the layout to three elements plus logo: accent bar, quote, attribution.

**Don't**

- Do not use neon, black/red powerlifting palettes, heavy textures, drop shadows on text, or stock clipart.
- Do not place the quote over a busy photo without a solid or controlled overlay.
- Do not recreate the logo in live text or crowd it with other marks.
- Do not set the full quote in all caps.

**Example layout guidance.**

| Format            | Size           | Safe margin                                            | Logo placement                      |
| ----------------- | -------------- | ------------------------------------------------------ | ----------------------------------- |
| Square            | 1080 × 1080 px | 80 px on all sides                                     | Bottom-left or bottom-center        |
| Story             | 1080 × 1920 px | 80 px sides; keep top 250 px and bottom 340 px clear   | Bottom-center, above the clear zone |
| Letter (portrait) | 8.5 × 11 in    | 0.75 in (0.5 in minimum); add 0.125 in bleed for print | Bottom-center or bottom-right       |

Stack top to bottom: orange bar → quote → attribution → logo. Logo height about 8-10% of the canvas short edge. An optional stamp mark may appear as a watermark at low contrast behind the lower corner, never behind the quote text.

**Color usage.** Blue variant: field `brand.blue` `#0034B7`, quote white, bar `brand.orange`, attribution white or orange (orange only at 24px+ bold, about 4.1:1 on blue). White variant: field white or `neutral.light`, quote `brand.blue` or `neutral.black`, bar `brand.orange`, attribution `brand.blue`. Gold (`accent.gold`) only for award/recognition graphics.

**Typography.** Quote in Montserrat Bold or SemiBold (italic optional), sized so the quote fills about 50-60% of the safe area; minimum 48px on square/story and 28pt on letter. Attribution in Barlow Condensed SemiBold; uppercase is allowed for the attribution line only. Magistral stays inside the logo artwork.

**Spacing.** Orange bar about 8% of canvas width × 8-10px, with space below equal to the bar's width ÷ 2. Space between quote and attribution at least one line of quote text. Logo at least one logo-height clear of the attribution.

**Accessibility and readability.** When posting, include the full quote and attribution in the post text or alt text. Check legibility at thumbnail size (about 300px wide). Keep contrast at 4.5:1 or higher for quote text.

## Accessibility And Professional Quality Rules

- Maintain readable contrast for all text, buttons, badges, and table headers.
- Do not place important text over busy photos unless a solid or controlled overlay makes it readable.
- Use visible focus states for keyboard navigation.
- Use alt text for meaningful images, especially logos, athlete headshots, and instructional images.
- Avoid small gray text for essential instructions, dates, errors, or payment information.

## Developer Implementation Rules

- Design tokens: expose official colors, extended accents, spacing, radius, typography, and badge tokens in the app theme.
- CSS/Tailwind: use tokens, not one-off hex values in page components.
- Components: reuse shared components before adding page-specific styling.
- Gradients: no purple, neon, glass, orb, or generic AI gradients. If used, restrict to blue-to-darker-blue or photo overlays.
- Icons: use one consistent icon family with consistent stroke weight. Prefer lucide or existing app icon set for interface icons.
- Radius/shadows: moderate radius and restrained shadows. Avoid overly pillowy SaaS cards.
- Images: use real/program-relevant photos or official assets. Avoid generic abstract hero art.
- Agent requirement: agents must read this guide before UI, email, document, or public copy work.

## Remaining Asset Checklist

- Final favicon and app icon export package.
- Exact logo clear-space and minimum-size diagram.
- Email header/footer master template.
- Player Manual template.
- Game Guide template.
- Parent Packet template.
- Certificate and award templates.
- Social share-card template for Challenge pages.
- Badge design sheet for XP, streaks, milestones, video feedback, Zoom attendance, and registration/payment states.
- Photo cropping guide for headshots, hero images, cards, thumbnails, and documents.

## Implementation Priorities

1. Done 2026-11-18: this guide lives in `127si-admin-design-system/brand/BRAND-SYSTEM-V4.md`; each platform repo links to it instead of keeping a copy.
2. Create code tokens in Challenge Platform using this guide.
3. Audit Challenge public, parent, admin, registration, leaderboard, and athlete pages against this guide.
4. Update Communication Platform email templates to use this guide.
5. Create document templates for Player Manual, Game Guide, Parent Packet, and Certificates.
6. Create sub-brand examples for Team Shot Tracker, Jr Ref Clinic, and Curriculum Platform.
