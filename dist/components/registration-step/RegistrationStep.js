import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/**
 * One registration step as a shadcn-style card. Attributes such as `hidden`, `inert`
 * and `data-*` pass through to the section, so an app can show one step at a time.
 */
export function RegistrationStep({ headingId, title, subtitle, icon, children, className, ...rest }) {
    return (_jsxs("section", { "aria-labelledby": headingId, className: cx("si-reg-step", className), ...rest, children: [_jsxs("header", { className: "si-reg-step-header", children: [icon ? (_jsx("span", { "aria-hidden": "true", className: "si-reg-step-icon", children: icon })) : null, _jsxs("div", { className: "si-reg-step-text", children: [_jsx("h2", { id: headingId, children: title }), subtitle ? _jsx("p", { children: subtitle }) : null] })] }), children] }));
}
