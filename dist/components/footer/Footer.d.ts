import type { ElementType } from "react";
export type FooterLink = {
    href: string;
    label: string;
    external?: boolean;
};
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
    phone?: {
        label: string;
        href: string;
    };
    /** Display text and mailto: link. */
    email?: {
        label: string;
        href: string;
    };
    /** The organisation's own site, e.g. { label: "fairfieldbasketballclub.com", href: "https://…" } */
    site?: {
        label: string;
        href: string;
    };
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
export declare function Footer({ logoSrc, contact, columns, legalLinks, legalName, year, patternSrc, backToTop, LinkComponent, id, className, }: FooterProps): import("react").JSX.Element;
