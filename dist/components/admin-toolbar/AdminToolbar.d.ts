import type { ReactNode } from "react";
export type AdminToolbarProps = {
    /** Left side: search box, filters, tabs. */
    children?: ReactNode;
    /** Right side: buttons that act on the list below. */
    actions?: ReactNode;
    /** Names the group for screen readers, for example "Enrollment filters". */
    label?: string;
    className?: string;
};
/** The row of filters and actions above a table or list. */
export declare function AdminToolbar({ children, actions, label, className }: AdminToolbarProps): import("react").JSX.Element;
