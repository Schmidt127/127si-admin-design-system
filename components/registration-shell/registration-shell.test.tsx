import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("RegistrationShell renders the app logo and a title id for the form to name itself", () => {
  const html = renderToStaticMarkup(
    <RegistrationShell
      titleAccent="A"
      titlePlace="B"
      subtitle="C"
      titleId="registration-form-title"
      logo={<a href="/">Home</a>}
    >
      <p>Form</p>
    </RegistrationShell>,
  );
  assert.match(html, /<div class="si-reg-logo"><a href="\/">Home<\/a><\/div>/);
  assert.match(html, /<h1 id="registration-form-title">/);
});

test("RegistrationShell puts the background photo, decorative, inside the hidden backdrop", () => {
  const html = renderToStaticMarkup(
    <RegistrationShell titleAccent="A" titlePlace="B" subtitle="C" formBackgroundSrc="/forms/default/background.png">
      <p>Form</p>
    </RegistrationShell>,
  );
  assert.match(
    html,
    /<div class="si-reg-atmosphere" aria-hidden="true"><img class="si-reg-atmosphere__photo" src="\/forms\/default\/background.png" alt="" decoding="async"\/><\/div>/,
  );
});

test("RegistrationShell without a background photo keeps the plain deep-blue backdrop", () => {
  const html = renderToStaticMarkup(
    <RegistrationShell titleAccent="A" titlePlace="B" subtitle="C">
      <p>Form</p>
    </RegistrationShell>,
  );
  assert.match(html, /<div class="si-reg-atmosphere" aria-hidden="true"><\/div>/);
  assert.ok(!html.includes("si-reg-atmosphere__photo"));
});

// Contrast over the photo. Worst case is a pure white photo at the CSS opacity over the deep blue
// (any darker pixel only raises the contrast of the light masthead text).
const read = (file: string) => readFileSync(new URL(file, import.meta.url), "utf8");
const hex = (name: string) => {
  const m = read("../../brand/tokens.css").match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(m, `${name} is a hex token`);
  return [1, 3, 5].map((i) => parseInt(m[1].slice(i, i + 2), 16));
};
const over = (fg: number[], alpha: number, bg: number[]) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));
const luminance = (rgb: number[]) => {
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: number[], b: number[]) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test("masthead text stays readable over the brightest possible background photo", () => {
  const css = read("./registration-shell.css").replace(/\/\*[\s\S]*?\*\//g, "");
  const rule = css.match(/\.si-reg-atmosphere__photo\s*\{([^}]*)\}/);
  assert.ok(rule, "photo rule exists");
  const opacity = Number(rule[1].match(/opacity:\s*([0-9.]+)/)?.[1]);
  assert.ok(opacity > 0 && opacity <= 0.2, `photo opacity ${opacity} is at most 0.2 (Brand System v4)`);

  const white = hex("--si-white");
  const page = over(white, opacity, hex("--si-blue-deep"));
  const muted = over(white, 0.78, page); // --si-color-on-shell-muted is white at 78%
  assert.ok(ratio(white, page) >= 4.5, `title and facts: ${ratio(white, page).toFixed(2)}:1`);
  assert.ok(ratio(muted, page) >= 4.5, `subtitle: ${ratio(muted, page).toFixed(2)}:1`);
  // The orange program name is large bold text (WCAG AA large text: 3:1).
  assert.ok(ratio(hex("--si-orange"), page) >= 3, `orange title: ${ratio(hex("--si-orange"), page).toFixed(2)}:1`);
});
