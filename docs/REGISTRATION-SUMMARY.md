# Registration summary: ecosystem template

Status: owner-approved November 13, 2026. Mike requested a summary section for **each registration** across the 127 Sports Intensity ecosystem, following the JR Ref Clinic improvement. This extends the Full-page forms standard in Brand System v4.

## Placement and purpose

Every public registration (individual, team, mentor, clinic, challenge and future programs) includes a concise **Before you register** summary inside the form sheet, before the first step or fields. It helps a family understand the offering and prepare before entering information. It is separate from the final review of their entered answers. Routine daily activity submissions are not registrations and do not need this extra section.

Keep it restrained: a neutral surface, quiet border, clear heading, aligned labels and values, generous readable spacing and subtle separators. Use the shared brand tokens and existing typography. Do not add decorative icons, animation, competing colours or a second promotional hero.

## Required content, when applicable

| Group | What to show |
| --- | --- |
| Program facts | What registration is for; instruction or services included; date, local time with time zone, venue/address or online format. Existing visible masthead facts can supply date/location without repeating every value. |
| Cost and eligibility | Current configured tuition/fee and pricing window; applicable grades/age/other eligibility. These remain visible, including on phones. |
| Have ready | Required photo or documents, information needed, payment method if charged, and which adult or participant must complete any waiver. |
| What happens next | Short, accurate explanation of the steps and whether submission leads to payment, a waitlist, review or immediate confirmation. Do not imply a guaranteed seat or successful payment before it is established. |
| Information disclosures | Matching expandable Refund policy, Questions, and Waiver headings where applicable. Questions exposes the program's real support contact; policy and waiver expose their actual text. Omit irrelevant controls instead of showing empty panels. |

A free registration does not request a payment card. A registration without a headshot requirement does not request a photo. Each platform supplies the correct content from its owning configuration and existing policy sources; never copy Referee's price, dates, eligibility, contact or refund terms into another program as defaults.

## Layout and disclosure behavior

- Use semantic label/value rows (`dl`, `dt`, `dd`). Align labels in one column and values in the next on wide screens; stack each label above its value on phones.
- Separate Have ready and the information controls with modest spacing and thin neutral rules.
- All information controls have the same styling and plus/minus or equivalent state cue. Their labels remain stable.
- Place the controls horizontally on wider screens and vertically on phones. Allow wrapping without truncation or horizontal scrolling.
- Default to closed panels. One panel opens at a time beneath the controls and uses the available content width. The active control remains focused; opening a panel must not navigate away or clear form entries.
- Use native buttons (`type="button"`), unique IDs, `aria-expanded` and `aria-controls`. Label the revealed content region from its control; hide closed content from visual and assistive-technology navigation. Enter and Space operate the controls.
- Maintain visible keyboard focus, readable contrast and touch targets at least 44 CSS pixels high. Long addresses, contact emails and waiver text must wrap.
- Use one policy content source for the standalone policy page and inline disclosure. A template is layout, not legal authority: only display the owning program's approved/effective policy and waiver versions. Revealing a waiver never records acceptance or replaces the actual consent/signature step.
- Fees, eligibility, essential preparation and material cancellation deadlines must not be hidden solely inside collapsed content when needed to make the registration decision.

## Reference and verification

Reference implementation: Referee `src/components/registration/clinic-registration-full.tsx`, with the live clinic at https://referee.fairfieldbasketballclub.com/clinics/jrrefclinicff/register (Referee PR #312). The form shell itself remains the master identified in ADR 0001; this document adds the summary pattern, not a new shell.

Verify at 1440x900 and 390x844, plus a narrow 320 CSS-pixel screen: all important facts visible, no horizontal overflow, appropriate control direction, every panel opens/closes by keyboard, exactly one open panel, no loss of entered answers, and no serious/critical axe findings with each panel open. Capture desktop/mobile screenshots. Do not create real registrations or payments merely to test summary styling.

## Adoption

This is the formal template requirement for new and updated registrations throughout the ecosystem. Referee is the first implementation. Publishing this standard does not retroactively change every existing site or claim that all registrations have already migrated; record consumer rollout separately. Layout/control extraction into a released shared component follows the normal package recipe (RULES, tests, catalogue, generated dist, versioned release and pinned consumer upgrade). Keep program data and business logic in the owning apps.

Design references: [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/), [USWDS typography](https://designsystem.digital.gov/components/typography/).
