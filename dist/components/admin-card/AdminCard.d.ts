import type { ReactNode } from "react";
export type AdminCardProps = {
    title?: string;
    description?: string;
    actions?: ReactNode;
    children?: ReactNode;
    className?: string;
};
export declare function AdminCard({ title, description, actions, children, className }: AdminCardProps): import("react").JSX.Element;
