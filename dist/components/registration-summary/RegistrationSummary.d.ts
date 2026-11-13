import { type ReactNode } from "react";
import type { RegistrationFact } from "../registration-shell/RegistrationShell.js";
export type RegistrationSummaryDisclosure = {
    id: string;
    label: string;
    content: ReactNode;
};
export type RegistrationSummaryProps = {
    /** Heading of the summary block. Defaults to "Before you register". */
    title?: string;
    facts?: RegistrationFact[];
    /** "Have ready": what the family needs before starting (photo, documents, payment). */
    preparation?: {
        heading?: string;
        body: ReactNode;
    };
    /** "What happens next": steps, and whether submission leads to payment, a waitlist or confirmation. */
    nextSteps?: {
        heading?: string;
        body: ReactNode;
    };
    /** Expandable panels such as Refund policy, Questions and Waiver. Only one is open at a time. */
    disclosures?: RegistrationSummaryDisclosure[];
};
/**
 * The "Before you register" block shown above the form. Facts stay visible; policy text is
 * behind buttons, closed by default, so nothing legal appears before the family has started.
 */
export declare function RegistrationSummary({ title, facts, preparation, nextSteps, disclosures }: RegistrationSummaryProps): import("react").JSX.Element;
