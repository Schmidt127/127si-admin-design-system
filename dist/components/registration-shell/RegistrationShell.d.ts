import type { ElementType, ReactNode } from "react";
export type RegistrationFact = {
    label: string;
    value: string;
};
export type RegistrationShellProps = {
    /** Program name, shown in orange at the start of the title, e.g. "JR REF CLINIC". */
    titleAccent: string;
    /** Place or label, shown in white after the program name, e.g. "Fairfield". */
    titlePlace: string;
    subtitle: string;
    /** Fact boxes under the masthead (date, location, grades, tuition...). Omit for none. */
    facts?: RegistrationFact[];
    factsLabel?: string;
    /** Program picture shown at the top right. Form pictures belong to the app, not the package. */
    formHeroSrc?: string;
    /** Empty string or omitted means the picture is decorative. */
    formHeroAlt?: string;
    /** Optional logo shown above the title, e.g. the app's link to its home page. */
    logo?: ReactNode;
    /** Id of the title, so a form can name itself with it (aria-labelledby). */
    titleId?: string;
    /** Use next/image in Next.js apps. Defaults to a plain img. */
    ImageComponent?: ElementType;
    /** The form: registration summary, then the registration steps. */
    children: ReactNode;
    className?: string;
};
/**
 * The full-page registration layout: deep brand-blue page, a faint program photo behind
 * the masthead, a fact strip, and a white form sheet that holds the steps.
 */
export declare function RegistrationShell({ titleAccent, titlePlace, subtitle, facts, factsLabel, formHeroSrc, formHeroAlt, logo, titleId, ImageComponent, children, className, }: RegistrationShellProps): import("react").JSX.Element;
