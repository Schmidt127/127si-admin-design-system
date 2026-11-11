import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
export function AdminStatusBadge({ status, children }) {
    const value = String(status || (typeof children === "string" ? children : "") || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
    return _jsx("span", { className: cx("si-admin-status", value && `is-${value}`), children: children || status });
}
