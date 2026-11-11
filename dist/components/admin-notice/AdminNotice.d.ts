import type { ReactNode } from "react";
export type AdminNoticeTone = "info" | "success" | "warning" | "danger";
export type AdminNoticeProps = {
    tone?: AdminNoticeTone;
    /** Short bold lead, for example "Saved" or "Delivery halted". */
    title?: string;
    children?: ReactNode;
    className?: string;
};
/** A message about the page or the last action. Danger and warning are announced immediately. */
export declare function AdminNotice({ tone, title, children, className }: AdminNoticeProps): import("react").JSX.Element;
