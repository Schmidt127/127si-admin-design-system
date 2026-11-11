import type { ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type AdminCardProps = {
  title?: string;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function AdminCard({ title, description, actions, children, className }: AdminCardProps) {
  return (
    <section className={cx("si-admin-card", className)}>
      {title || actions ? (
        <div className="si-admin-card-header">
          <div>
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
          {actions ? <div className="si-admin-card-actions">{actions}</div> : null}
        </div>
      ) : null}
      <div className="si-admin-card-body">{children}</div>
    </section>
  );
}
