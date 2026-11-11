import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
export type AdminButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "danger";
export type AdminButtonProps<T extends ElementType = "button"> = {
    variant?: AdminButtonVariant;
    /** Element or component to render, for example "a" or a router Link. */
    as?: T;
    className?: string;
    children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;
export declare function AdminButton<T extends ElementType = "button">({ variant, as, className, children, ...props }: AdminButtonProps<T>): import("react").JSX.Element;
