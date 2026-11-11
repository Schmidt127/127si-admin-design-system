import type { ReactNode } from "react";

export type AdminPageHeaderProps = {
  title: string;
  /** One line under the title. Text, or text with a link. */
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: string;
};

export function AdminPageHeader({ title, description, actions, eyebrow }: AdminPageHeaderProps) {
  return (
    <div className="si-admin-page-header">
      <div>
        {eyebrow ? <div className="si-admin-eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="si-admin-page-actions">{actions}</div> : null}
    </div>
  );
}
