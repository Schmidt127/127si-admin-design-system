import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type AdminButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "danger";

export type AdminButtonProps<T extends ElementType = "button"> = {
  variant?: AdminButtonVariant;
  /** Element or component to render, for example "a" or a router Link. */
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function AdminButton<T extends ElementType = "button">({ variant = "primary", as, className, children, ...props }: AdminButtonProps<T>) {
  const Component: ElementType = as ?? "button";
  return (
    <Component className={cx("si-admin-button", `is-${variant}`, className)} {...props}>
      {children}
    </Component>
  );
}
