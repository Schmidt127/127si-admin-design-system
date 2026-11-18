import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/**
 * The full-page registration layout: deep brand-blue page, an optional faint program photo
 * behind it (formBackgroundSrc), the masthead with an optional program picture (formHeroSrc),
 * a fact strip, and a white form sheet that holds the steps.
 */
export function RegistrationShell({ titleAccent, titlePlace, subtitle, facts = [], factsLabel = "Details", formHeroSrc, formHeroAlt = "", formBackgroundSrc, logo, titleId, ImageComponent = "img", children, className, }) {
    return (_jsxs("div", { className: cx("si-reg-root", className), children: [_jsx("div", { className: "si-reg-atmosphere", "aria-hidden": "true", children: formBackgroundSrc ? _jsx("img", { className: "si-reg-atmosphere__photo", src: formBackgroundSrc, alt: "", decoding: "async" }) : null }), _jsxs("div", { className: "si-reg-page", children: [_jsxs("header", { className: "si-reg-masthead", children: [_jsxs("div", { children: [logo ? _jsx("div", { className: "si-reg-logo", children: logo }) : null, _jsxs("h1", { id: titleId, children: [_jsx("span", { className: "si-reg-accent", children: titleAccent }), " ", _jsx("span", { className: "si-reg-place", children: titlePlace })] }), _jsx("p", { className: "si-reg-subtitle", children: subtitle })] }), formHeroSrc ? _jsx(ImageComponent, { className: "si-reg-hero", src: formHeroSrc, alt: formHeroAlt }) : null] }), facts.length > 0 ? (_jsx("section", { className: "si-reg-facts", "aria-label": factsLabel, children: _jsx("dl", { children: facts.map((fact) => (_jsxs("div", { children: [_jsx("dt", { children: fact.label }), _jsx("dd", { children: fact.value })] }, fact.label))) }) })) : null, _jsx("div", { className: "si-reg-sheet", children: children })] })] }));
}
