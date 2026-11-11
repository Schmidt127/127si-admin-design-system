import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
/** Previous / next links with "Page 2 of 7". Renders nothing when there is only one page. */
export function AdminPager({ page, pageCount, hrefFor, total, noun = "record", LinkComponent, className }) {
    if (pageCount <= 1)
        return null;
    const Link = LinkComponent ?? "a";
    const current = Math.min(Math.max(page, 1), pageCount);
    return (_jsxs("nav", { className: cx("si-admin-pager", className), "aria-label": "Pages", children: [current > 1 ? (_jsx(Link, { className: "si-admin-pager-link", href: hrefFor(current - 1), rel: "prev", children: "Previous" })) : (_jsx("span", { className: "si-admin-pager-link is-disabled", "aria-disabled": "true", children: "Previous" })), _jsxs("span", { className: "si-admin-pager-status", "aria-current": "page", children: ["Page ", current, " of ", pageCount, typeof total === "number" ? ` (${total} ${total === 1 ? noun : `${noun}s`})` : ""] }), current < pageCount ? (_jsx(Link, { className: "si-admin-pager-link", href: hrefFor(current + 1), rel: "next", children: "Next" })) : (_jsx("span", { className: "si-admin-pager-link is-disabled", "aria-disabled": "true", children: "Next" }))] }));
}
