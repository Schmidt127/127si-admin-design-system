import type { ReactNode } from "react";
import { cx } from "../_shared/cx.js";

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
export function AdminToolbar({ children, actions, label, className }: AdminToolbarProps) {
  return (
    <div className={cx("si-admin-toolbar", className)} role="group" aria-label={label}>
      <div className="si-admin-toolbar-filters">{children}</div>
      {actions ? <div className="si-admin-toolbar-actions">{actions}</div> : null}
    </div>
  );
}
