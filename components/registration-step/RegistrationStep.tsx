import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type RegistrationStepProps = HTMLAttributes<HTMLElement> & {
  /** Id of the step heading. The step is labelled by it. */
  headingId: string;
  title: string;
  subtitle?: string;
  /** Optional decorative icon, shown beside the title. */
  icon?: ReactNode;
  children?: ReactNode;
};

/**
 * One registration step as a shadcn-style card. Attributes such as `hidden`, `inert`
 * and `data-*` pass through to the section, so an app can show one step at a time.
 */
export function RegistrationStep({ headingId, title, subtitle, icon, children, className, ...rest }: RegistrationStepProps) {
  return (
    <section aria-labelledby={headingId} className={cx("si-reg-step", className)} {...rest}>
      <header className="si-reg-step-header">
        {icon ? (
          <span aria-hidden="true" className="si-reg-step-icon">
            {icon}
          </span>
        ) : null}
        <div className="si-reg-step-text">
          <h2 id={headingId}>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}
