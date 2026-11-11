import { type ElementType } from "react";
export type TopNavLink = {
    href: string;
    label: string;
    /** Opens in a new tab; rendered as a plain link. Also used for mailto: and downloads. */
    external?: boolean;
    /** A dropdown of further links under this label (one level only). */
    children?: Array<{
        href: string;
        label: string;
        external?: boolean;
    }>;
};
export type TopNavProps = {
    /** Colour logo for the white header: `@127si/design-system/assets/logos/logo-full-color.png`. */
    logoSrc: string;
    /** Short platform or program name shown in the orange badge under the logo, e.g. "Challenges". */
    badge: string;
    links: TopNavLink[];
    /** The one button on the right, e.g. { href: "/login", label: "Parent Login" }. */
    action?: {
        href: string;
        label: string;
    };
    /** href of the page being viewed; that link is marked current. */
    activeHref?: string;
    homeHref?: string;
    /** The app's router link (next/link). */
    LinkComponent?: ElementType;
    className?: string;
};
/** Public site header: logo with platform badge, primary navigation, one action, and a phone menu. */
export declare function TopNav({ logoSrc, badge, links, action, activeHref, homeHref, LinkComponent, className }: TopNavProps): import("react").JSX.Element;
