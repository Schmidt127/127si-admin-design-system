import type { ReactNode } from "react";
export type AdminPageHeaderProps = {
    title: string;
    description?: string;
    actions?: ReactNode;
    eyebrow?: string;
};
export declare function AdminPageHeader({ title, description, actions, eyebrow }: AdminPageHeaderProps): import("react").JSX.Element;
