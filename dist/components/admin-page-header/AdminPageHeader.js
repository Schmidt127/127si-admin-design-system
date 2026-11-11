import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AdminPageHeader({ title, description, actions, eyebrow }) {
    return (_jsxs("div", { className: "si-admin-page-header", children: [_jsxs("div", { children: [eyebrow ? _jsx("div", { className: "si-admin-eyebrow", children: eyebrow }) : null, _jsx("h1", { children: title }), description ? _jsx("p", { children: description }) : null] }), actions ? _jsx("div", { className: "si-admin-page-actions", children: actions }) : null] }));
}
