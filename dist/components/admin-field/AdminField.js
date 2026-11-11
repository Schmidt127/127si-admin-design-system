import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/** Label, optional hint, the control, and its error message. The app owns the control and its validation. */
export function AdminField({ htmlFor, label, required, hint, error, children, className }) {
    return (_jsxs("div", { className: cx("si-admin-field", error && "has-error", className), children: [_jsxs("label", { className: "si-admin-field-label", htmlFor: htmlFor, children: [label, required ? (_jsxs("span", { className: "si-admin-field-required", "aria-hidden": true, children: [" ", "*"] })) : null] }), hint ? (_jsx("p", { className: "si-admin-field-hint", id: `${htmlFor}-hint`, children: hint })) : null, children, error ? (_jsx("p", { className: "si-admin-field-error", id: `${htmlFor}-error`, role: "alert", children: error })) : null] }));
}
/** A titled group of fields inside a form. */
export function AdminFormSection({ title, description, children, className }) {
    return (_jsxs("fieldset", { className: cx("si-admin-form-section", className), children: [_jsx("legend", { className: "si-admin-form-section-title", children: title }), description ? _jsx("p", { className: "si-admin-form-section-description", children: description }) : null, _jsx("div", { className: "si-admin-form-section-fields", children: children })] }));
}
