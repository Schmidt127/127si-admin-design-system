"use client";

import { useCallback, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type HeroSlide = {
  id: string;
  src: string;
  /** Responsive candidates for `src`, e.g. from the app image optimiser (next/image `getImageProps`). */
  srcSet?: string;
  /** `sizes` for `srcSet`. Default "100vw". */
  sizes?: string;
  /** Smaller or taller crop for phones (below 768px). */
  srcMobile?: string;
  alt: string;
  /** CSS object-position for the crop, e.g. "50% 30%". Default "center". */
  objectPosition?: string;
};

export type HeroCarouselProps = {
  slides: HeroSlide[];
  eyebrow?: string;
  headline: ReactNode;
  subhead?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  /** Extra content under the buttons, owned by the app (for example a "choose your challenge" list). */
  children?: ReactNode;
  /** Compact card beside the copy on wide screens. */
  aside?: ReactNode;
  /**
   * Dark-to-brand colour wash over the photos, for text legibility. Default true.
   * Team Shot Tracker sets false (owner decision 2026-11-09) and relies on the text shadow.
   */
  wash?: boolean;
  /** Seconds each slide shows. Default 7 (10 when the visitor prefers reduced motion). */
  intervalSeconds?: number;
  /** Names the carousel for screen readers. Default "Featured photos". */
  label?: string;
  LinkComponent?: ElementType;
  className?: string;
};

const two = (value: number) => String(value).padStart(2, "0");

/** Full-bleed photo carousel with a headline and calls to action. */
export function HeroCarousel({
  slides,
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  children,
  aside,
  wash = true,
  intervalSeconds = 7,
  label = "Featured photos",
  LinkComponent,
  className,
}: HeroCarouselProps) {
  const Link: ElementType = LinkComponent ?? "a";
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (paused || held || count <= 1) return;
    const seconds = reducedMotion ? Math.max(intervalSeconds, 10) : intervalSeconds;
    timer.current = setTimeout(() => {
      if (!document.hidden) go(index + 1);
    }, seconds * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [paused, held, count, index, go, intervalSeconds, reducedMotion]);

  return (
    <section
      className={cx("si-hero", paused && "is-paused", !wash && "is-unwashed", className)}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <div className="si-hero__media">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cx("si-hero__slide", i === index && "is-active")}
            aria-hidden={i !== index}
            data-motion={(i % 4) + 1}
          >
            {failed[slide.id] ? null : (
              <picture>
                {slide.srcMobile ? <source media="(max-width: 767px)" srcSet={slide.srcMobile} /> : null}
                <img
                  className="si-hero__img"
                  src={slide.src}
                  srcSet={slide.srcSet}
                  sizes={slide.srcSet ? (slide.sizes ?? "100vw") : undefined}
                  alt={i === index ? slide.alt : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  style={{ objectPosition: slide.objectPosition ?? "center" }}
                  onError={() => setFailed((current) => ({ ...current, [slide.id]: true }))}
                />
              </picture>
            )}
          </div>
        ))}
        {wash ? <div className="si-hero__wash" aria-hidden="true" /> : null}
      </div>

      <div className="si-container si-hero__content">
        <div className="si-hero__copy">
          {eyebrow ? <p className="si-hero__eyebrow">{eyebrow}</p> : null}
          <h1 className="si-hero__headline">{headline}</h1>
          {subhead ? <p className="si-hero__subhead">{subhead}</p> : null}
          {primaryCta || secondaryCta ? (
            <div className="si-hero__ctas">
              {primaryCta ? (
                <Link href={primaryCta.href} className="si-hero__cta is-primary">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="si-hero__cta is-secondary">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>

        {aside ? <div className="si-hero__aside">{aside}</div> : null}

        {count > 1 ? (
          <div className="si-hero__controls">
            <button type="button" className="si-hero__step" aria-label="Previous slide" onClick={() => go(index - 1)}>
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
                <path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="si-hero__counter" aria-live="polite">
              <span className="si-visually-hidden">Slide </span>
              {two(index + 1)} / {two(count)}
            </span>
            <div className="si-hero__dots" role="group" aria-label="Choose a slide">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  className={cx("si-hero__dot", i === index && "is-active")}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button type="button" className="si-hero__step" aria-label="Next slide" onClick={() => go(index + 1)}>
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
                <path d="M5.5 2.5 11 8l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="si-hero__step"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
            >
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
                {paused ? <path d="M4 2.5v11l9-5.5z" fill="currentColor" /> : <path d="M4 2.5h2.75v11H4zM9.25 2.5H12v11H9.25z" fill="currentColor" />}
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
