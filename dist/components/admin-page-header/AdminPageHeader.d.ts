import type { ReactNode } from "react";
export type AdminPageHeaderProps = {
    title: string;
    /** One line under the title. Text, or text with a link. */
    description?: ReactNode;
    actions?: ReactNode;
    eyebrow?: string;
};
export declare function AdminPageHeader({ title, description, actions, eyebrow }: AdminPageHeaderProps): import("react").JSX.Element;
