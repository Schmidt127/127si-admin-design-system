# 127 Sports Intensity — Challenge Admin Brand Guide

Source: `127_SI_Brand_Kit (1).pdf` (four-page brand kit, 2023). Scope: Shooting Challenge Platform admin interface. This guide transcribes the kit's named assets and makes explicit interface recommendations; recommendations are not rules printed in the kit.

## Where the files go

Place this guide in the repository-root `brand-kit/` folder and the original PDF in `brand-kit/source/`. The repository-root `package.json` belongs to the Next.js website. Keep the committed web assets in repository-root `public/brand/`, including `logo.png`, `logo-circle.png`, and the supplied logo and pattern variants. Reference materials should remain outside `public/`.

```text
127si-challenge-platform/
  package.json
  brand-kit/
    127SI-CHALLENGE-ADMIN-BRAND-GUIDE.md
    source/
      127_SI_Brand_Kit (1).pdf
  public/
    brand/
      logo.png
      logo-circle.png
      Logo_Icon_Black (1).png
      Pattern_2 (1).png
      ... other committed variants
```

Keep original vector logo exports and licensed font files in `brand-kit/source/` if you have them. The PDF shows logo variants but does not supply a clearly named set of independent production-ready web files. Do not crop a low-resolution logo from a screenshot if originals exist. Do not publish font files unless the license allows web embedding.

## Facts shown in the source kit

| Element         | Brand-kit value                                                                                                              | Suggested admin use                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Primary blue    | `#0034B7`                                                                                                                    | Selected navigation, primary actions, links and focus accents                                              |
| Orange          | `#FF8B00`                                                                                                                    | Small highlights and selected metrics; do not use as the sole status signal                                |
| Off-white       | `#F2F2F2`                                                                                                                    | Subtle page or divider treatment                                                                           |
| Mid-gray        | `#C4C4C4`                                                                                                                    | Decorative boundaries only; check contrast for controls                                                    |
| Charcoal        | `#262626`                                                                                                                    | Main text                                                                                                  |
| Display type    | Magistral                                                                                                                    | Brand/display headings where licensed and available                                                        |
| Supporting type | Maven Pro                                                                                                                    | Headings or UI text if readable at small sizes and licensed                                                |
| Logos           | Horizontal and stacked 127 Sports Intensity lockups; standalone symbol; circular SPORTS INTENSITY stamp; light/dark versions | Use supplied `logo.png` and `logo-circle.png` after inspecting which variants those files actually contain |
| Pattern         | Thin geometric repeated line motif in light gray, gray, black, orange or blue                                                | Optional, limited to an empty/header area; avoid behind data                                               |
| Other assets    | Sport/activity icons, social icons, stationery and banner examples                                                           | Do not add sport or social icons to operational screens without a task-related purpose                     |

The sample stationery contains older `fairfieldeagles.com` and school email contact details. Those are examples in the 2023 artwork; do not copy them into current Challenge admin UI or email settings. Confirm current contact details separately.

## Admin Overview design direction

Build a fast, information-dense staff dashboard with restrained branding. Use the circular mark in compact navigation and the full horizontal lockup only where it fits without crowding navigation. Give the page a clear title and challenge selector, then show a short row of actionable summary cards and useful tables. Reserve orange for small emphasis. Use blue for navigation and primary actions. Let neutral surfaces carry data-heavy content.

Prioritize scan speed: clear labels, dates and units; concise card summaries that link to filtered detail; sortable/filterable tables with stable widths; visible loading, empty and error states; responsive navigation; keyboard focus; and readable contrast. Avoid decorative shadows, motion, large header art, repeated logos, dense background patterns and chart widgets that duplicate a table. Make the first screen useful without fetching every historical record. Verify behavior and performance using representative data.

Suggested first-pass sections to validate with the owner against available Challenge data: current program/challenge status, enrollment count, recent submissions, items requiring staff action (grading and feedback), delivery/automation health, and recent activity. These are design candidates, not assertions that the existing APIs expose every metric. Never show invented live numbers; use clearly labeled fixtures in a prototype.

## Implementation rules for Cursor and Impeccable

1. Inspect the existing Challenge app structure, styles, admin routes and the two actual logo files before changing paths. Keep established authentication, roles and navigation intact.
2. Read the PDF and this guide, then document the chosen interface tokens and components in the app's root `DESIGN.md`. Label any new layout, spacing or component decisions as product-design choices rather than source-kit requirements.
3. Define semantic tokens for primary, accent, text, canvas, surface, border, muted text, focus and status. The five source colors are starting inputs, not a complete accessible status palette. Check contrast before assigning text and control colors; do not assume orange or mid-gray works for small text on white.
4. Use licensed font files if supplied; otherwise choose a legible fallback and document it. Avoid blocking the first paint on remote font downloads.
5. Create one Admin Overview prototype and inspect desktop and mobile screenshots with realistic data. Review it with the owner before applying the design to other admin pages.
6. Optimize logo file size, reserve intrinsic dimensions to prevent layout shift, and provide meaningful alt text where the logo conveys identity. A repeated decorative logo can use empty alt text.

## Ready-to-paste Cursor request

> Work in the **127 Challenge Platform**, on its Admin Overview. Read `brand-kit/source/127_SI_Brand_Kit (1).pdf` and `brand-kit/127SI-CHALLENGE-ADMIN-BRAND-GUIDE.md`, and inspect `public/brand/logo.png` and `public/brand/logo-circle.png` and existing app styles. Use Impeccable's product/dashboard approach to record an initial `DESIGN.md` with tokens and component rules. Build one fast, accessible Admin Overview prototype using useful cards and tables, restrained blue and orange accents, and accurate existing data or explicitly labeled fixtures. Preserve established admin access and navigation. Provide desktop and mobile previews, measurable performance observations, and a short list of data endpoints still needed. Do not spread the design to other pages before the owner reviews the prototype.

## Open items to resolve from source files

- Confirm whether `logo.png` is the horizontal or stacked lockup, and whether `logo-circle.png` is the circular stamp or a cropped standalone symbol.
- Confirm availability and web-use licenses for Magistral and Maven Pro font files.
- Confirm whether original vector logos and pattern files exist; retain the PDF as the visual reference until they are supplied.
