"use client";

import { useEffect, useId, useState, type ElementType } from "react";
import { cx } from "../_shared/cx.js";

export type TopNavLink = {
  href: string;
  label: string;
  /** Opens in a new tab; rendered as a plain link. Also used for mailto: and downloads. */
  external?: boolean;
  /** A dropdown of further links under this label (one level only). */
  children?: Array<{ href: string; label: string; external?: boolean }>;
};

export type TopNavProps = {
  /** Colour logo for the white header: `@127si/design-system/assets/logos/logo-full-color.png`. */
  logoSrc: string;
  /** Short platform or program name shown in the orange badge under the logo, e.g. "Challenges". */
  badge: string;
  links: TopNavLink[];
  /** The one button on the right, e.g. { href: "/login", label: "Parent Login" }. */
  action?: { href: string; label: string };
  /** href of the page being viewed; that link is marked current. */
  activeHref?: string;
  homeHref?: string;
  /** The app's router link (next/link). */
  LinkComponent?: ElementType;
  className?: string;
};

function isPlain(link: { href: string; external?: boolean }) {
  return link.external || link.href.startsWith("mailto:") || link.href.startsWith("tel:");
}

/** Public site header: logo with platform badge, primary navigation, one action, and a phone menu. */
export function TopNav({ logoSrc, badge, links, action, activeHref, homeHref = "/", LinkComponent, className }: TopNavProps) {
  const Link: ElementType = LinkComponent ?? "a";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("si-top-nav-open", open);
    if (!open) return () => document.body.classList.remove("si-top-nav-open");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("si-top-nav-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  const item = (link: { href: string; label: string; external?: boolean }, itemClass?: string) => {
    const current = activeHref === link.href ? ("page" as const) : undefined;
    if (isPlain(link)) {
      return (
        <a
          href={link.href}
          className={itemClass}
          aria-current={current}
          onClick={close}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : undefined)}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link href={link.href} className={itemClass} aria-current={current} onClick={close}>
        {link.label}
      </Link>
    );
  };

  return (
    <header id="top" className={cx("si-top-nav", scrolled && "is-scrolled", className)}>
      <div className="si-top-nav__bar">
        <div className="si-container si-top-nav__inner">
          <button
            type="button"
            className="si-top-nav__toggle"
            aria-expanded={open}
            aria-controls={`${menuId}-menu`}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="si-visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>

          <Link href={homeHref} className="si-top-nav__lockup" onClick={close}>
            <img className="si-top-nav__logo" src={logoSrc} alt="127 Sports Intensity" width={143} height={24} />
            <span className="si-platform-badge">{badge}</span>
          </Link>

          <nav className="si-top-nav__links" aria-label="Primary">
            <ul>
              {links.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <details className="si-top-nav__menu">
                      <summary className="si-top-nav__link">{link.label}</summary>
                      <ul className="si-top-nav__panel">
                        {link.children.map((child) => (
                          <li key={child.label}>{item(child)}</li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    item(link, "si-top-nav__link")
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="si-top-nav__actions">
            {action ? (
              <Link href={action.href} className="si-top-nav__action">
                {action.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {open ? (
        <div id={`${menuId}-menu`} className="si-top-nav__sheet">
          <nav aria-label="Mobile primary">
            <ul className="si-top-nav__sheet-list">
              {links.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <details>
                      <summary>{link.label}</summary>
                      <ul>
                        {link.children.map((child) => (
                          <li key={child.label}>{item(child)}</li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    item(link)
                  )}
                </li>
              ))}
              {action ? (
                <li>
                  <Link href={action.href} onClick={close}>
                    {action.label}
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
