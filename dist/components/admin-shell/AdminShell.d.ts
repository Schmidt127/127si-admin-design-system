import type { ElementType, ReactNode } from "react";
export type AdminNavItem = {
    href: string;
    label: string;
    icon?: ReactNode;
    /** Plain <a> even when a LinkComponent is given (downloads, API routes, other sites). */
    external?: boolean;
};
export type AdminSidebarProps = {
    platform?: string;
    navigation?: AdminNavItem[];
    activeHref?: string;
    /** White 127 SI logo (`@127si/design-system/assets/logos/logo-white.png`). Without it a text mark is shown. */
    logoSrc?: string;
    /** Where the logo links to. Default "/admin". */
    homeHref?: string;
    /** The app's router link (next/link). Internal nav items and the logo use it. */
    LinkComponent?: ElementType;
    /** Small print at the bottom of the sidebar: who is signed in, sign out, link to the public site. */
    sidebarFooter?: ReactNode;
};
export declare function AdminSidebar({ platform, navigation, activeHref, logoSrc, homeHref, LinkComponent, sidebarFooter, }: AdminSidebarProps): import("react").JSX.Element;
export type AdminHeaderProps = {
    platform?: string;
    eyebrow?: string;
    /** Replaces the platform label in the header, for example "Operations workspace". */
    title?: string;
    actions?: ReactNode;
    children?: ReactNode;
};
export declare function AdminHeader({ platform, eyebrow, title, actions, children }: AdminHeaderProps): import("react").JSX.Element;
export type AdminShellProps = AdminSidebarProps & {
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
    headerEyebrow?: string;
    headerTitle?: string;
    /** Right side of the header: environment chip, account, sign out. */
    headerActions?: ReactNode;
    /** id on the content area, for a "skip to content" link. It is made focusable. */
    contentId?: string;
};
export declare function AdminShell({ platform, navigation, activeHref, logoSrc, homeHref, LinkComponent, sidebarFooter, children, footer, className, headerEyebrow, headerTitle, headerActions, contentId, }: AdminShellProps): import("react").JSX.Element;
