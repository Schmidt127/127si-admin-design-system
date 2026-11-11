import type { ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type AdminFieldProps = {
  /** The id of the control inside. The label points at it; hint and error ids derive from it. */
  htmlFor: string;
  label: string;
  required?: boolean;
  /** Helper text shown under the label. Give the control aria-describedby="<htmlFor>-hint". */
  hint?: string;
  /** Specific error message. Give the control aria-invalid and aria-describedby="<htmlFor>-error". */
  error?: string;
  /** The input, select or textarea. Add className="si-admin-input" to it. */
  children: ReactNode;
  className?: string;
};

/** Label, optional hint, the control, and its error message. The app owns the control and its validation. */
export function AdminField({ htmlFor, label, required, hint, error, children, className }: AdminFieldProps) {
  return (
    <div className={cx("si-admin-field", error && "has-error", className)}>
      <label className="si-admin-field-label" htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="si-admin-field-required" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p className="si-admin-field-hint" id={`${htmlFor}-hint`}>
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p className="si-admin-field-error" id={`${htmlFor}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type AdminFormSectionProps = { title: string; description?: string; children: ReactNode; className?: string };

/** A titled group of fields inside a form. */
export function AdminFormSection({ title, description, children, className }: AdminFormSectionProps) {
  return (
    <fieldset className={cx("si-admin-form-section", className)}>
      <legend className="si-admin-form-section-title">{title}</legend>
      {description ? <p className="si-admin-form-section-description">{description}</p> : null}
      <div className="si-admin-form-section-fields">{children}</div>
    </fieldset>
  );
}
