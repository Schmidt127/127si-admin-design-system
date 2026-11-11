import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminField, AdminFormSection } from "./AdminField.js";

test("AdminField ties the label, hint and error to the control by id", () => {
  const html = renderToStaticMarkup(
    <AdminField htmlFor="school" label="School" required hint="As it appears on the roster." error="Choose a school.">
      <input id="school" className="si-admin-input" aria-describedby="school-hint school-error" aria-invalid />
    </AdminField>,
  );
  assert.match(html, /^<div class="si-admin-field has-error">/);
  assert.match(html, /<label class="si-admin-field-label" for="school">School/);
  assert.match(html, /aria-hidden="true"> \*<\/span>/);
  assert.match(html, /<p class="si-admin-field-hint" id="school-hint">As it appears on the roster\.<\/p>/);
  assert.match(html, /<p class="si-admin-field-error" id="school-error" role="alert">Choose a school\.<\/p>/);
});

test("AdminField without hint or error renders only the label and control", () => {
  const html = renderToStaticMarkup(
    <AdminField htmlFor="q" label="Search">
      <input id="q" />
    </AdminField>,
  );
  assert.equal(html, '<div class="si-admin-field"><label class="si-admin-field-label" for="q">Search</label><input id="q"/></div>');
});

test("AdminFormSection is a fieldset with a legend", () => {
  const html = renderToStaticMarkup(
    <AdminFormSection title="Contact" description="How we reach the family.">
      <p>fields</p>
    </AdminFormSection>,
  );
  assert.match(html, /^<fieldset class="si-admin-form-section"><legend class="si-admin-form-section-title">Contact<\/legend>/);
  assert.match(html, /si-admin-form-section-description">How we reach the family\./);
});
