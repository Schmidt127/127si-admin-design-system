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
    /**
     * Program photo behind the deep-blue page (FORM-IMAGES.md "background" slot), e.g.
     * "/forms/default/background.png". Always decorative: shown in grey at low strength, hidden from
     * assistive technology, never carries information. Omit for the plain deep-blue page.
     */
    formBackgroundSrc?: string;
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
 * The full-page registration layout: deep brand-blue page, an optional faint program photo
 * behind it (formBackgroundSrc), the masthead with an optional program picture (formHeroSrc),
 * a fact strip, and a white form sheet that holds the steps.
 */
export declare function RegistrationShell({ titleAccent, titlePlace, subtitle, facts, factsLabel, formHeroSrc, formHeroAlt, formBackgroundSrc, logo, titleId, ImageComponent, children, className, }: RegistrationShellProps): import("react").JSX.Element;
