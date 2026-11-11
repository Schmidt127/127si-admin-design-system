import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/** A message about the page or the last action. Danger and warning are announced immediately. */
export function AdminNotice({ tone = "info", title, children, className }) {
    const urgent = tone === "danger" || tone === "warning";
    return (_jsxs("div", { className: cx("si-admin-notice", `is-${tone}`, className), role: urgent ? "alert" : "status", children: [title ? _jsx("strong", { className: "si-admin-notice-title", children: title }) : null, children ? _jsx("div", { className: "si-admin-notice-body", children: children }) : null] }));
}
