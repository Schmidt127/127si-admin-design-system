export function normalizeClinicsAttended(value) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(20, Math.trunc(value)));
}
export function clinicTierDisplay(priorCount) {
    const count = normalizeClinicsAttended(priorCount);
    if (count <= 0) {
        return { kind: "first", label: "First clinic", count: 0 };
    }
    if (count <= 2) {
        return { kind: "returning", label: `${count} prior`, count };
    }
    return { kind: "veteran", label: "Veteran", count };
}
export function clinicTierKind(priorCount) {
    return clinicTierDisplay(priorCount).kind;
}
