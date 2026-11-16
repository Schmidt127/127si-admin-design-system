import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from "../_shared/cx.js";
const BANNER_TITLE_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
export function DataTableBanner({ eyebrow, title, lede, stats = [], titleId = "si-dt-banner-title", titleLevel = 2, className, children, }) {
    const TitleTag = BANNER_TITLE_TAGS[titleLevel - 1];
    return (_jsxs("div", { className: cx("si-dt-directory", className), children: [_jsxs("header", { className: "si-dt-directory__band", "aria-labelledby": titleId, children: [_jsxs("div", { className: "si-dt-directory__band-copy", children: [eyebrow ? _jsx("p", { className: "si-dt-directory__eyebrow", children: eyebrow }) : null, _jsx(TitleTag, { id: titleId, className: "si-dt-directory__title", children: title }), lede ? _jsx("p", { className: "si-dt-directory__lede", children: lede }) : null] }), stats.length ? (_jsx("ul", { className: "si-dt-directory__stats", "aria-label": "Directory summary", children: stats.map((stat) => (_jsxs("li", { className: cx("si-dt-directory__stat", stat.emphasis === "gold" && "si-dt-directory__stat--gold"), children: [_jsx("span", { className: "si-dt-directory__stat-value", children: stat.value }), _jsx("span", { className: "si-dt-directory__stat-label", children: stat.label })] }, stat.id))) })) : null] }), children] }));
}
