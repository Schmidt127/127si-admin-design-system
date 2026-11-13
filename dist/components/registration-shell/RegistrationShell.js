import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/**
 * The full-page registration layout: deep brand-blue page, a faint program photo behind
 * the masthead, a fact strip, and a white form sheet that holds the steps.
 */
export function RegistrationShell({ titleAccent, titlePlace, subtitle, facts = [], factsLabel = "Details", formHeroSrc, formHeroAlt = "", ImageComponent = "img", children, className, }) {
    return (_jsxs("div", { className: cx("si-reg-root", className), children: [_jsx("div", { className: "si-reg-atmosphere", "aria-hidden": "true" }), _jsxs("div", { className: "si-reg-page", children: [_jsxs("header", { className: "si-reg-masthead", children: [_jsxs("div", { children: [_jsxs("h1", { children: [_jsx("span", { className: "si-reg-accent", children: titleAccent }), " ", _jsx("span", { className: "si-reg-place", children: titlePlace })] }), _jsx("p", { className: "si-reg-subtitle", children: subtitle })] }), formHeroSrc ? _jsx(ImageComponent, { className: "si-reg-hero", src: formHeroSrc, alt: formHeroAlt }) : null] }), facts.length > 0 ? (_jsx("section", { className: "si-reg-facts", "aria-label": factsLabel, children: _jsx("dl", { children: facts.map((fact) => (_jsxs("div", { children: [_jsx("dt", { children: fact.label }), _jsx("dd", { children: fact.value })] }, fact.label))) }) })) : null, _jsx("div", { className: "si-reg-sheet", children: children })] })] }));
}
