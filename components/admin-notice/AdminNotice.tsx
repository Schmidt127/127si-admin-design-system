import type { ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type AdminNoticeTone = "info" | "success" | "warning" | "danger";

export type AdminNoticeProps = {
  tone?: AdminNoticeTone;
  /** Short bold lead, for example "Saved" or "Delivery halted". */
  title?: string;
  children?: ReactNode;
  className?: string;
};

/** A message about the page or the last action. Danger and warning are announced immediately. */
export function AdminNotice({ tone = "info", title, children, className }: AdminNoticeProps) {
  const urgent = tone === "danger" || tone === "warning";
  return (
    <div className={cx("si-admin-notice", `is-${tone}`, className)} role={urgent ? "alert" : "status"}>
      {title ? <strong className="si-admin-notice-title">{title}</strong> : null}
      {children ? <div className="si-admin-notice-body">{children}</div> : null}
    </div>
  );
}
