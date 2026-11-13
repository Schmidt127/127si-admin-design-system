import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
/**
 * The "Before you register" block shown above the form. Facts stay visible; policy text is
 * behind buttons, closed by default, so nothing legal appears before the family has started.
 */
export function RegistrationSummary({ title = "Before you register", facts = [], preparation, nextSteps, disclosures = [] }) {
    const baseId = useId();
    const [open, setOpen] = useState(null);
    return (_jsxs("section", { "aria-labelledby": `${baseId}-title`, className: "si-reg-summary", children: [_jsx("h2", { id: `${baseId}-title`, children: title }), facts.length > 0 ? (_jsx("dl", { children: facts.map((fact) => (_jsxs("div", { children: [_jsx("dt", { children: fact.label }), _jsx("dd", { children: fact.value })] }, fact.label))) })) : null, preparation ? (_jsxs("div", { className: "si-reg-summary-section", children: [_jsx("h3", { children: preparation.heading ?? "Have ready" }), _jsx("div", { children: preparation.body })] })) : null, nextSteps ? (_jsxs("div", { className: "si-reg-summary-section", children: [_jsx("h3", { children: nextSteps.heading ?? "What happens next" }), _jsx("div", { children: nextSteps.body })] })) : null, disclosures.length > 0 ? (_jsxs("div", { className: "si-reg-summary-section", children: [_jsx("div", { className: "si-reg-summary-actions", children: disclosures.map((item) => {
                            const expanded = open === item.id;
                            return (_jsxs("button", { type: "button", id: `${baseId}-${item.id}-toggle`, "aria-expanded": expanded, "aria-controls": `${baseId}-${item.id}`, onClick: () => setOpen((current) => (current === item.id ? null : item.id)), className: "si-reg-disclosure-button", children: [item.label, _jsx("span", { "aria-hidden": "true", children: expanded ? "-" : "+" })] }, item.id));
                        }) }), disclosures.map((item) => (_jsx("div", { id: `${baseId}-${item.id}`, role: "region", "aria-labelledby": `${baseId}-${item.id}-toggle`, hidden: open !== item.id, className: "si-reg-disclosure-panel", children: item.content }, item.id)))] })) : null] }));
}
