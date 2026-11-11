import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
export function AdminCard({ title, description, actions, children, className }) {
    return (_jsxs("section", { className: cx("si-admin-card", className), children: [title || actions ? (_jsxs("div", { className: "si-admin-card-header", children: [_jsxs("div", { children: [title ? _jsx("h2", { children: title }) : null, description ? _jsx("p", { children: description }) : null] }), actions ? _jsx("div", { className: "si-admin-card-actions", children: actions }) : null] })) : null, _jsx("div", { className: "si-admin-card-body", children: children })] }));
}
