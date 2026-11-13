import type { HTMLAttributes, ReactNode } from "react";
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
export declare function RegistrationStep({ headingId, title, subtitle, icon, children, className, ...rest }: RegistrationStepProps): import("react").JSX.Element;
