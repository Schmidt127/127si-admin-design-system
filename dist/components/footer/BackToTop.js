"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { cx } from "../_shared/cx.js";
/** Hidden until the visitor scrolls past the first screen, so it never covers hero buttons. */
const SHOW_AFTER_PX = 600;
export function BackToTop({ href = "#top" }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (_jsx("a", { href: href, className: cx("si-back-to-top", visible && "is-visible"), "aria-label": "Back to top", "aria-hidden": !visible, tabIndex: visible ? undefined : -1, children: _jsx("span", { "aria-hidden": "true", children: "↑" }) }));
}
