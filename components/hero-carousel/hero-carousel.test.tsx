import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroCarousel } from "./HeroCarousel.js";

const slides = [
  { id: "a", src: "/a.webp", srcMobile: "/a-phone.webp", alt: "Players warming up", objectPosition: "50% 30%" },
  { id: "b", src: "/b.webp", alt: "A team huddle" },
  { id: "c", src: "/c.webp", alt: "A free throw" },
];

const html = renderToStaticMarkup(
  <HeroCarousel
    slides={slides}
    eyebrow="127 Sports Intensity"
    headline="Stay in the game"
    subhead="One place for every program."
    primaryCta={{ href: "/register", label: "Register" }}
    secondaryCta={{ href: "/about", label: "How it works" }}
  >
    <p>extra</p>
  </HeroCarousel>,
);

test("HeroCarousel is a labelled carousel with one h1 and both calls to action", () => {
  assert.match(html, /^<section class="si-hero" aria-roledescription="carousel" aria-label="Featured photos">/);
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.match(html, /<h1 class="si-hero__headline">Stay in the game<\/h1>/);
  assert.match(html, /<a href="\/register" class="si-hero__cta is-primary">Register<\/a>/);
  assert.match(html, /<a href="\/about" class="si-hero__cta is-secondary">How it works<\/a>/);
  assert.match(html, /<p>extra<\/p>/);
});

test("HeroCarousel shows the first slide, hides the rest from assistive technology, and only it has alt text", () => {
  assert.equal((html.match(/class="si-hero__slide is-active" aria-hidden="false"/g) || []).length, 1);
  assert.equal((html.match(/class="si-hero__slide" aria-hidden="true"/g) || []).length, 2);
  assert.match(html, /alt="Players warming up"/);
  assert.ok(!html.includes('alt="A team huddle"'));
  assert.match(html, /<source media="\(max-width: 767px\)" srcSet="\/a-phone.webp"\/>/);
  assert.match(html, /style="object-position:50% 30%"/);
});

test("HeroCarousel has previous, next, pause and one labelled dot per slide, with a slide counter", () => {
  for (const label of ["Previous slide", "Next slide", "Pause slideshow", "Go to slide 1", "Go to slide 2", "Go to slide 3"]) {
    assert.ok(html.includes(`aria-label="${label}"`), label);
  }
  assert.match(html, /aria-label="Go to slide 1" aria-current="true"/);
  assert.match(html, /<span class="si-visually-hidden">Slide <\/span>01[^0-9]*\/[^0-9]*03<\/span>/);
  assert.match(html, /aria-label="Pause slideshow" aria-pressed="false"/);
});

test("HeroCarousel has the colour wash by default and none when wash is off (Team Shot Tracker)", () => {
  assert.ok(html.includes("si-hero__wash"));
  const unwashed = renderToStaticMarkup(<HeroCarousel slides={slides} headline="x" wash={false} />);
  assert.ok(!unwashed.includes("si-hero__wash"));
  assert.match(unwashed, /class="si-hero is-unwashed"/);
});

test("HeroCarousel passes responsive image candidates through", () => {
  const responsive = renderToStaticMarkup(<HeroCarousel slides={[{ id: "a", src: "/a.webp", srcSet: "/a-640.webp 640w, /a-1920.webp 1920w", alt: "A" }]} headline="x" />);
  assert.match(responsive, /srcSet="\/a-640.webp 640w, \/a-1920.webp 1920w" sizes="100vw"/);
  assert.ok(!html.includes("sizes="));
});

test("HeroCarousel with a single slide shows no controls", () => {
  const single = renderToStaticMarkup(<HeroCarousel slides={slides.slice(0, 1)} headline="x" />);
  assert.ok(!single.includes("si-hero__controls"));
});

test("HeroCarousel can keep one photo still and keep a group photo fully in view on phones", () => {
  const framed = renderToStaticMarkup(
    <HeroCarousel slides={[{ id: "a", src: "/a.webp", alt: "A", motion: "none", keepVisibleWidth: 800 / 1920 }, { id: "b", src: "/b.webp", alt: "B" }]} headline="x" />,
  );
  assert.match(framed, /class="si-hero__slide is-active" aria-hidden="false" data-motion="0"/);
  assert.match(framed, /<picture class="is-keep-group" style="--si-hero-keep-h:1\.3500">/);
  assert.match(framed, /class="si-hero__slide" aria-hidden="true" data-motion="2"><picture>/);
});
