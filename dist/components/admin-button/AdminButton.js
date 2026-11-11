import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
export function AdminButton({ variant = "primary", as, className, children, ...props }) {
    const Component = as ?? "button";
    return (_jsx(Component, { className: cx("si-admin-button", `is-${variant}`, className), ...props, children: children }));
}
