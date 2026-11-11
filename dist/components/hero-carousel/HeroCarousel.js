"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "../_shared/cx.js";
const two = (value) => String(value).padStart(2, "0");
/** Full-bleed photo carousel with a headline and calls to action. */
export function HeroCarousel({ slides, eyebrow, headline, subhead, primaryCta, secondaryCta, children, aside, wash = true, intervalSeconds = 7, label = "Featured photos", LinkComponent, className, }) {
    const Link = LinkComponent ?? "a";
    const count = slides.length;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [held, setHeld] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [failed, setFailed] = useState({});
    const timer = useRef(null);
    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setReducedMotion(query.matches);
        apply();
        query.addEventListener("change", apply);
        return () => query.removeEventListener("change", apply);
    }, []);
    const go = useCallback((next) => setIndex(((next % count) + count) % count), [count]);
    useEffect(() => {
        if (timer.current)
            clearTimeout(timer.current);
        if (paused || held || count <= 1)
            return;
        const seconds = reducedMotion ? Math.max(intervalSeconds, 10) : intervalSeconds;
        timer.current = setTimeout(() => {
            if (!document.hidden)
                go(index + 1);
        }, seconds * 1000);
        return () => {
            if (timer.current)
                clearTimeout(timer.current);
        };
    }, [paused, held, count, index, go, intervalSeconds, reducedMotion]);
    return (_jsxs("section", { className: cx("si-hero", paused && "is-paused", !wash && "is-unwashed", className), "aria-roledescription": "carousel", "aria-label": label, onMouseEnter: () => setHeld(true), onMouseLeave: () => setHeld(false), onFocusCapture: () => setHeld(true), onBlurCapture: (event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setHeld(false);
        }, children: [_jsxs("div", { className: "si-hero__media", children: [slides.map((slide, i) => (_jsx("div", { className: cx("si-hero__slide", i === index && "is-active"), "aria-hidden": i !== index, "data-motion": (i % 4) + 1, children: failed[slide.id] ? null : (_jsxs("picture", { children: [slide.srcMobile ? _jsx("source", { media: "(max-width: 767px)", srcSet: slide.srcMobile }) : null, _jsx("img", { className: "si-hero__img", src: slide.src, alt: i === index ? slide.alt : "", loading: i === 0 ? "eager" : "lazy", fetchPriority: i === 0 ? "high" : "auto", decoding: "async", style: { objectPosition: slide.objectPosition ?? "center" }, onError: () => setFailed((current) => ({ ...current, [slide.id]: true })) })] })) }, slide.id))), wash ? _jsx("div", { className: "si-hero__wash", "aria-hidden": "true" }) : null] }), _jsxs("div", { className: "si-container si-hero__content", children: [_jsxs("div", { className: "si-hero__copy", children: [eyebrow ? _jsx("p", { className: "si-hero__eyebrow", children: eyebrow }) : null, _jsx("h1", { className: "si-hero__headline", children: headline }), subhead ? _jsx("p", { className: "si-hero__subhead", children: subhead }) : null, primaryCta || secondaryCta ? (_jsxs("div", { className: "si-hero__ctas", children: [primaryCta ? (_jsx(Link, { href: primaryCta.href, className: "si-hero__cta is-primary", children: primaryCta.label })) : null, secondaryCta ? (_jsx(Link, { href: secondaryCta.href, className: "si-hero__cta is-secondary", children: secondaryCta.label })) : null] })) : null, children] }), aside ? _jsx("div", { className: "si-hero__aside", children: aside }) : null, count > 1 ? (_jsxs("div", { className: "si-hero__controls", children: [_jsx("button", { type: "button", className: "si-hero__step", "aria-label": "Previous slide", onClick: () => go(index - 1), children: _jsx("svg", { viewBox: "0 0 16 16", width: "12", height: "12", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "M10.5 2.5 5 8l5.5 5.5", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsxs("span", { className: "si-hero__counter", "aria-live": "polite", children: [_jsx("span", { className: "si-visually-hidden", children: "Slide " }), two(index + 1), " / ", two(count)] }), _jsx("div", { className: "si-hero__dots", role: "group", "aria-label": "Choose a slide", children: slides.map((slide, i) => (_jsx("button", { type: "button", className: cx("si-hero__dot", i === index && "is-active"), "aria-label": `Go to slide ${i + 1}`, "aria-current": i === index ? "true" : undefined, onClick: () => go(i) }, slide.id))) }), _jsx("button", { type: "button", className: "si-hero__step", "aria-label": "Next slide", onClick: () => go(index + 1), children: _jsx("svg", { viewBox: "0 0 16 16", width: "12", height: "12", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "M5.5 2.5 11 8l-5.5 5.5", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("button", { type: "button", className: "si-hero__step", "aria-label": paused ? "Play slideshow" : "Pause slideshow", "aria-pressed": paused, onClick: () => setPaused((value) => !value), children: _jsx("svg", { viewBox: "0 0 16 16", width: "12", height: "12", "aria-hidden": "true", focusable: "false", children: paused ? _jsx("path", { d: "M4 2.5v11l9-5.5z", fill: "currentColor" }) : _jsx("path", { d: "M4 2.5h2.75v11H4zM9.25 2.5H12v11H9.25z", fill: "currentColor" }) }) })] })) : null] })] }));
}
