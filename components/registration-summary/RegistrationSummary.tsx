import { useId, useState, type ReactNode } from "react";
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
  preparation?: { heading?: string; body: ReactNode };
  /** "What happens next": steps, and whether submission leads to payment, a waitlist or confirmation. */
  nextSteps?: { heading?: string; body: ReactNode };
  /** Expandable panels such as Refund policy, Questions and Waiver. Only one is open at a time. */
  disclosures?: RegistrationSummaryDisclosure[];
};

/**
 * The "Before you register" block shown above the form. Facts stay visible; policy text is
 * behind buttons, closed by default, so nothing legal appears before the family has started.
 */
export function RegistrationSummary({ title = "Before you register", facts = [], preparation, nextSteps, disclosures = [] }: RegistrationSummaryProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      aria-labelledby={`${baseId}-title`}
      className="si-reg-summary"
    >
      <h2 id={`${baseId}-title`}>{title}</h2>

      {facts.length > 0 ? (
        <dl>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {preparation ? (
        <div className="si-reg-summary-section">
          <h3>{preparation.heading ?? "Have ready"}</h3>
          <div>{preparation.body}</div>
        </div>
      ) : null}

      {nextSteps ? (
        <div className="si-reg-summary-section">
          <h3>{nextSteps.heading ?? "What happens next"}</h3>
          <div>{nextSteps.body}</div>
        </div>
      ) : null}

      {disclosures.length > 0 ? (
        <div className="si-reg-summary-section">
          <div className="si-reg-summary-actions">
            {disclosures.map((item) => {
              const expanded = open === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`${baseId}-${item.id}-toggle`}
                  aria-expanded={expanded}
                  aria-controls={`${baseId}-${item.id}`}
                  onClick={() => setOpen((current) => (current === item.id ? null : item.id))}
                  className="si-reg-disclosure-button"
                >
                  {item.label}
                  <span aria-hidden="true">{expanded ? "-" : "+"}</span>
                </button>
              );
            })}
          </div>
          {disclosures.map((item) => (
            <div
              key={item.id}
              id={`${baseId}-${item.id}`}
              role="region"
              aria-labelledby={`${baseId}-${item.id}-toggle`}
              hidden={open !== item.id}
              className="si-reg-disclosure-panel"
            >
              {item.content}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
