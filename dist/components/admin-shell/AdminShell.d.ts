import type { ReactNode } from "react";
export type AdminNavItem = {
    href: string;
    label: string;
    icon?: ReactNode;
};
export type AdminSidebarProps = {
    platform?: string;
    navigation?: AdminNavItem[];
    activeHref?: string;
};
export declare function AdminSidebar({ platform, navigation, activeHref }: AdminSidebarProps): import("react").JSX.Element;
export type AdminHeaderProps = {
    platform?: string;
    eyebrow?: string;
    actions?: ReactNode;
    children?: ReactNode;
};
export declare function AdminHeader({ platform, eyebrow, actions, children }: AdminHeaderProps): import("react").JSX.Element;
export type AdminShellProps = {
    platform?: string;
    navigation?: AdminNavItem[];
    activeHref?: string;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
};
export declare function AdminShell({ platform, navigation, activeHref, children, footer, className }: AdminShellProps): import("react").JSX.Element;
