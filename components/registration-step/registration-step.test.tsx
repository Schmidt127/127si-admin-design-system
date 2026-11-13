import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RegistrationStep } from "./RegistrationStep.js";

test("RegistrationStep is a labelled section with a heading", () => {
  const html = renderToStaticMarkup(
    <RegistrationStep headingId="participant-heading" title="Participant Information" subtitle="Tell us about the participant.">
      <p>Fields</p>
    </RegistrationStep>,
  );
  assert.match(html, /<section aria-labelledby="participant-heading"/);
  assert.match(html, /<h2 id="participant-heading"/);
  assert.match(html, />Participant Information<\/h2>/);
  assert.match(html, /<p>Fields<\/p>/);
});

test("RegistrationStep passes hidden, inert and data attributes through to the section", () => {
  const html = renderToStaticMarkup(
    <RegistrationStep headingId="review-heading" title="Review" hidden data-registration-step="3">
      <p>Review</p>
    </RegistrationStep>,
  );
  assert.match(html, /<section[^>]* hidden=""/);
  assert.match(html, /data-registration-step="3"/);
});

test("RegistrationStep without a subtitle or icon renders neither", () => {
  const html = renderToStaticMarkup(<RegistrationStep headingId="x" title="Plain" />);
  assert.ok(!html.includes("<p"));
  assert.ok(!html.includes("aria-hidden"));
});
