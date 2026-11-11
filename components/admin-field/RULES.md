# Admin field and form section

`AdminField`, `AdminFormSection` and the `si-admin-input` class from `@127si/design-system`.

## What it is for

Every labelled control in an admin form or filter: the label, optional helper text, the control, and its
error message. `AdminFormSection` groups related fields under a title.

## When to use it

Any input, select or textarea in admin screens. Public and parent forms use the public form components, not
these.

## What may vary

- `label`, `required`, `hint`, `error`.
- The control itself. The app renders its own `<input>`, `<select>` or `<textarea>` with
  `className="si-admin-input"`, and owns its name, value and validation.

## What may not vary

- Every control has a visible label. A placeholder is not a label.
- The control's `id` matches `htmlFor`; when there is a hint or error the control carries
  `aria-describedby="<id>-hint <id>-error"`, and `aria-invalid` when there is an error.
- Error text is specific ("Enter a 5-digit ZIP code"), never just red.
- Control size, border, radius and focus ring.
- This component never changes field names, values, validation or what a form submits.
