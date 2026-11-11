import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/** The row of filters and actions above a table or list. */
export function AdminToolbar({ children, actions, label, className }) {
    return (_jsxs("div", { className: cx("si-admin-toolbar", className), role: "group", "aria-label": label, children: [_jsx("div", { className: "si-admin-toolbar-filters", children: children }), actions ? _jsx("div", { className: "si-admin-toolbar-actions", children: actions }) : null] }));
}
