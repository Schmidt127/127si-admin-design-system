import type { ReactNode } from "react";
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
export declare function AdminField({ htmlFor, label, required, hint, error, children, className }: AdminFieldProps): import("react").JSX.Element;
export type AdminFormSectionProps = {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
};
/** A titled group of fields inside a form. */
export declare function AdminFormSection({ title, description, children, className }: AdminFormSectionProps): import("react").JSX.Element;
