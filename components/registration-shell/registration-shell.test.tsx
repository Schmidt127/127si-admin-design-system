import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RegistrationShell } from "./RegistrationShell.js";

test("RegistrationShell renders the masthead, facts and the form sheet", () => {
  const html = renderToStaticMarkup(
    <RegistrationShell
      titleAccent="JR REF CLINIC"
      titlePlace="Fairfield"
      subtitle="Learn the rules."
      facts={[{ label: "Date", value: "March 20, 2027" }]}
      factsLabel="Clinic details"
    >
      <p>Form</p>
    </RegistrationShell>,
  );
  assert.match(html, /<h1><span class="si-reg-accent">JR REF CLINIC<\/span>/);
  assert.match(html, /<section class="si-reg-facts" aria-label="Clinic details">/);
  assert.match(html, /<dt>Date<\/dt><dd>March 20, 2027<\/dd>/);
  assert.match(html, /<div class="si-reg-sheet"><p>Form<\/p><\/div>/);
});

test("RegistrationShell omits the fact strip and picture when not given", () => {
  const html = renderToStaticMarkup(
    <RegistrationShell titleAccent="A" titlePlace="B" subtitle="C">
      <p>Form</p>
    </RegistrationShell>,
  );
  assert.ok(!html.includes("si-reg-facts"));
  assert.ok(!html.includes("si-reg-hero"));
});

test("RegistrationShell uses the picture component the app passes in", () => {
  const Picture = (props: { src: string; alt: string; className?: string }) => <img {...props} data-custom="1" />;
  const html = renderToStaticMarkup(
    <RegistrationShell titleAccent="A" titlePlace="B" subtitle="C" formHeroSrc="/forms/x/header.webp" formHeroAlt="Program" ImageComponent={Picture}>
      <p>Form</p>
    </RegistrationShell>,
  );
  assert.match(html, /data-custom="1"/);
  assert.match(html, /alt="Program"/);
});
