import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RegistrationSummary } from "./RegistrationSummary.js";

const disclosures = [
  { id: "refund", label: "Refund policy", content: <p>Refund text</p> },
  { id: "questions", label: "Questions", content: <p>Contact us</p> },
];

test("RegistrationSummary shows facts, preparation and next steps by default", () => {
  const html = renderToStaticMarkup(
    <RegistrationSummary
      facts={[{ label: "Tuition", value: "$40.00" }]}
      preparation={{ body: <p>A headshot.</p> }}
      nextSteps={{ body: <p>Submit, then pay.</p> }}
    />,
  );
  assert.match(html, /<h2[^>]*>Before you register<\/h2>/);
  assert.match(html, /<dt[^>]*>Tuition<\/dt><dd[^>]*>\$40\.00<\/dd>/);
  assert.match(html, /Have ready/);
  assert.match(html, /What happens next/);
  assert.match(html, /A headshot\./);
});

test("RegistrationSummary disclosures start closed and are linked to their buttons", () => {
  const html = renderToStaticMarkup(<RegistrationSummary disclosures={disclosures} />);
  const buttons = html.match(/<button[^>]*>/g) ?? [];
  assert.equal(buttons.length, 2);
  for (const button of buttons) {
    assert.match(button, /type="button"/);
    assert.match(button, /aria-expanded="false"/);
    assert.match(button, /aria-controls="[^"]+"/);
  }
  const panels = html.match(/<div[^>]*role="region"[^>]*>/g) ?? [];
  assert.equal(panels.length, 2);
  for (const panel of panels) assert.match(panel, / hidden=""/);
});

test("RegistrationSummary without disclosures renders no buttons", () => {
  assert.ok(!renderToStaticMarkup(<RegistrationSummary />).includes("<button"));
});
