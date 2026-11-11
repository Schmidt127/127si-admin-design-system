import type { ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type AdminStatusBadgeProps = { status?: string; children?: ReactNode };

export function AdminStatusBadge({ status, children }: AdminStatusBadgeProps) {
  const value = String(status || (typeof children === "string" ? children : "") || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return <span className={cx("si-admin-status", value && `is-${value}`)}>{children || status}</span>;
}
