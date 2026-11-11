"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState } from "react";
import { cx } from "../_shared/cx.js";
function isPlain(link) {
    return link.external || link.href.startsWith("mailto:") || link.href.startsWith("tel:");
}
/** Public site header: logo with platform badge, primary navigation, one action, and a phone menu. */
export function TopNav({ logoSrc, badge, links, action, activeHref, homeHref = "/", LinkComponent, defaultOpen = false, className }) {
    const Link = LinkComponent ?? "a";
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(defaultOpen);
    const menuId = useId();
    const toggleRef = useRef(null);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        document.body.classList.toggle("si-top-nav-open", open);
        if (!open)
            return () => document.body.classList.remove("si-top-nav-open");
        const onKey = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
                // Return focus to the button that opened the menu (from Referee's port).
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.classList.remove("si-top-nav-open");
        };
    }, [open]);
    const close = () => setOpen(false);
    const item = (link, itemClass) => {
        const current = activeHref === link.href ? "page" : undefined;
        if (isPlain(link)) {
            return (_jsx("a", { href: link.href, className: itemClass, "aria-current": current, onClick: close, ...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : undefined), children: link.label }));
        }
        return (_jsx(Link, { href: link.href, className: itemClass, "aria-current": current, onClick: close, children: link.label }));
    };
    return (_jsxs("header", { id: "top", className: cx("si-top-nav", scrolled && "is-scrolled", className), children: [_jsx("div", { className: "si-top-nav__bar", children: _jsxs("div", { className: "si-container si-top-nav__inner", children: [_jsxs("button", { ref: toggleRef, type: "button", className: "si-top-nav__toggle", "aria-expanded": open, "aria-controls": `${menuId}-menu`, onClick: () => setOpen((value) => !value), children: [_jsx("span", { className: "si-visually-hidden", children: open ? "Close menu" : "Open menu" }), _jsx("span", { "aria-hidden": "true", children: open ? "✕" : "☰" })] }), _jsxs(Link, { href: homeHref, className: "si-top-nav__lockup", onClick: close, children: [_jsx("img", { className: "si-top-nav__logo", src: logoSrc, alt: "127 Sports Intensity", width: 143, height: 24 }), _jsx("span", { className: "si-platform-badge", children: badge })] }), _jsx("nav", { className: "si-top-nav__links", "aria-label": "Primary", children: _jsx("ul", { children: links.map((link) => (_jsx("li", { children: link.children ? (_jsxs("details", { className: "si-top-nav__menu", children: [_jsx("summary", { className: "si-top-nav__link", children: link.label }), _jsx("ul", { className: "si-top-nav__panel", children: link.children.map((child) => (_jsx("li", { children: item(child) }, child.label))) })] })) : (item(link, "si-top-nav__link")) }, link.label))) }) }), _jsx("div", { className: "si-top-nav__actions", children: action ? (_jsx(Link, { href: action.href, className: "si-top-nav__action", children: action.label })) : null })] }) }), open ? (_jsx("div", { id: `${menuId}-menu`, className: "si-top-nav__sheet", children: _jsx("nav", { "aria-label": "Mobile primary", children: _jsxs("ul", { className: "si-top-nav__sheet-list", children: [links.map((link) => (_jsx("li", { children: link.children ? (_jsxs("details", { children: [_jsx("summary", { children: link.label }), _jsx("ul", { children: link.children.map((child) => (_jsx("li", { children: item(child) }, child.label))) })] })) : (item(link)) }, link.label))), action ? (_jsx("li", { children: _jsx(Link, { href: action.href, onClick: close, children: action.label }) })) : null] }) }) })) : null] }));
}
