# Registration summary

`RegistrationSummary` from `@127si/design-system`.

## What it is for

The "Before you register" block above a registration form. It shows the program facts a family needs
(what, when, where, cost), what to have ready, what happens next, and expandable panels for the refund
policy, questions and the waiver.

## When to use it

Every public registration (individual, team, mentor, clinic, challenge and future programs), placed first
inside `RegistrationShell`. Follows the ecosystem standard in `docs/REGISTRATION-SUMMARY.md` of the
design-system repository.

## What may vary

- `title`, `facts`, `preparation`, `nextSteps` headings and text.
- `disclosures`: the app supplies the real policy and waiver text, and omits panels that do not apply.

## What may not vary

- Fees, eligibility and cancellation deadlines are never placed only inside a collapsed panel. Keep them in `facts`
  or the visible text.
- Only one disclosure is open at a time. Panels start closed.
- Opening a panel never navigates away or clears form entries.
- Buttons are native `button` elements with `aria-expanded` and `aria-controls`.
- The package never supplies policy text, prices or contact details.
