import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { platformLabel } from "../../brand/theme.js";
import { cx } from "../_shared/cx.js";
function labelFor(platform) {
    return platformLabel(platform) ?? "127SI ADMIN";
}
export function AdminSidebar({ platform = "content", navigation = [], activeHref }) {
    return (_jsxs("aside", { className: "si-admin-sidebar", children: [_jsxs("div", { className: "si-admin-brand", children: [_jsx("span", { className: "si-admin-brand-mark", children: "127" }), _jsx("span", { children: "Sports Intensity" })] }), _jsx("div", { className: "si-admin-platform-label", children: labelFor(platform) }), _jsx("nav", { className: "si-admin-nav", "aria-label": "Admin navigation", children: navigation.map((item) => (_jsxs("a", { href: item.href, className: cx("si-admin-nav-link", activeHref === item.href && "is-active"), "aria-current": activeHref === item.href ? "page" : undefined, children: [item.icon ? (_jsx("span", { className: "si-admin-nav-icon", "aria-hidden": true, children: item.icon })) : null, item.label] }, item.href || item.label))) })] }));
}
export function AdminHeader({ platform = "content", eyebrow = "Administrative workspace", actions, children }) {
    return (_jsxs("header", { className: "si-admin-header", children: [_jsxs("div", { children: [_jsx("div", { className: "si-admin-eyebrow", children: eyebrow }), _jsx("div", { className: "si-admin-header-label", children: labelFor(platform) })] }), children || (actions ? _jsx("div", { className: "si-admin-header-actions", children: actions }) : null)] }));
}
export function AdminShell({ platform = "content", navigation = [], activeHref, children, footer, className }) {
    return (_jsxs("div", { className: cx("si-admin-shell", className), "data-si-surface": "admin", children: [_jsx(AdminSidebar, { platform: platform, navigation: navigation, activeHref: activeHref }), _jsxs("main", { className: "si-admin-main", children: [_jsx(AdminHeader, { platform: platform }), _jsx("div", { className: "si-admin-content", children: children }), footer ? _jsx("footer", { className: "si-admin-footer", children: footer }) : null] })] }));
}
