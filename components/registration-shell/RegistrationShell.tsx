import type { ElementType, ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type RegistrationFact = { label: string; value: string };

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
export function RegistrationShell({
  titleAccent,
  titlePlace,
  subtitle,
  facts = [],
  factsLabel = "Details",
  formHeroSrc,
  formHeroAlt = "",
  ImageComponent = "img",
  children,
  className,
}: RegistrationShellProps) {
  return (
    <div className={cx("si-reg-root", className)}>
      <div className="si-reg-atmosphere" aria-hidden="true" />
      <div className="si-reg-page">
        <header className="si-reg-masthead">
          <div>
            <h1>
              <span className="si-reg-accent">{titleAccent}</span> <span className="si-reg-place">{titlePlace}</span>
            </h1>
            <p className="si-reg-subtitle">{subtitle}</p>
          </div>
          {formHeroSrc ? <ImageComponent className="si-reg-hero" src={formHeroSrc} alt={formHeroAlt} /> : null}
        </header>
        {facts.length > 0 ? (
          <section className="si-reg-facts" aria-label={factsLabel}>
            <dl>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <div className="si-reg-sheet">{children}</div>
      </div>
    </div>
  );
}
