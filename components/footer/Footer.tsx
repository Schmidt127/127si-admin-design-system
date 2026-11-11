import type { CSSProperties, ElementType } from "react";
import { cx } from "../_shared/cx.js";
import { BackToTop } from "./BackToTop.js";

export type FooterLink = { href: string; label: string; external?: boolean };

export type FooterColumn = {
  title: string;
  /** Colour of the rule above the column title. Default "white". */
  accent?: "white" | "gray" | "accent";
  links: FooterLink[];
};

export type FooterContact = {
  /** "Mike Schmidt" */
  name: string;
  /** "Coordinator" */
  role?: string;
  /** Display text and tel: link, e.g. { label: "406.590.2677", href: "tel:+14065902677" } */
  phone?: { label: string; href: string };
  /** Display text and mailto: link. */
  email?: { label: string; href: string };
  /** The organisation's own site, e.g. { label: "fairfieldbasketballclub.com", href: "https://…" } */
  site?: { label: string; href: string };
};

export type FooterProps = {
  /** White logo: `@127si/design-system/assets/logos/logo-white.png`. Never a CSS-inverted colour logo. */
  logoSrc: string;
  contact: FooterContact;
  /** Two columns of the platform's own real routes. */
  columns: FooterColumn[];
  /** Links in the bottom bar: privacy, terms and similar. Only routes that exist. */
  legalLinks?: FooterLink[];
  /** Name after the copyright sign. Default "127 Sports Intensity". */
  legalName?: string;
  /** Copyright year. Pass it from the server so it never differs between server and browser. */
  year: number;
  /** Background pattern: `@127si/design-system/assets/patterns/pattern-3.png`. */
  patternSrc?: string;
  /** Show the round back-to-top link once the visitor has scrolled. Default true. */
  backToTop?: boolean;
  LinkComponent?: ElementType;
  id?: string;
  className?: string;
};

/** Public site footer: brand and contact, two link columns, legal bar, back to top. */
export function Footer({
  logoSrc,
  contact,
  columns,
  legalLinks = [],
  legalName = "127 Sports Intensity",
  year,
  patternSrc,
  backToTop = true,
  LinkComponent,
  id = "contact",
  className,
}: FooterProps) {
  const Link: ElementType = LinkComponent ?? "a";
  const link = (item: FooterLink) =>
    item.external || /^(mailto:|tel:|https?:)/.test(item.href) ? (
      <a href={item.href} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {item.label}
      </a>
    ) : (
      <Link href={item.href}>{item.label}</Link>
    );
  const contactParts = [contact.phone, contact.email, contact.site].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <footer className={cx("si-footer", className)} id={id}>
      {patternSrc ? (
        <div className="si-footer__pattern" aria-hidden="true" style={{ "--si-footer-pattern": `url("${patternSrc}")` } as CSSProperties} />
      ) : null}
      <div className="si-container si-footer__main">
        <div className="si-footer__brand">
          <img className="si-footer__logo" src={logoSrc} alt="127 Sports Intensity" width={200} height={33} loading="lazy" />
          <p className="si-footer__contact">
            <strong>{contact.name}</strong>
            {contact.role ? `, ${contact.role}` : null}
            {contactParts.length ? <br /> : null}
            {contactParts.map((part, index) => (
              <span key={part.href}>
                {index > 0 ? " · " : null}
                <a href={part.href} rel={part.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {part.label}
                </a>
              </span>
            ))}
          </p>
        </div>
        <div className="si-footer__columns">
          {columns.map((column) => (
            <div key={column.title} className={cx("si-footer__col", `is-${column.accent ?? "white"}`)}>
              <h2 className="si-footer__col-title">{column.title}</h2>
              <ul>
                {column.links.map((item) => (
                  <li key={item.label}>{link(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="si-footer__legal">
        <div className="si-container si-footer__legal-inner">
          <p>
            {"©"} {year} {legalName}
          </p>
          {legalLinks.length ? (
            <nav aria-label="Footer">
              {legalLinks.map((item) => (
                <span key={item.label}>{link(item)}</span>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
      {backToTop ? <BackToTop /> : null}
    </footer>
  );
}
