export type ClinicTierKind = "first" | "returning" | "veteran";

export type ClinicTierDisplay = {
  kind: ClinicTierKind;
  label: string;
  count: number;
};

export function normalizeClinicsAttended(value: number | null | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(20, Math.trunc(value)));
}

export function clinicTierDisplay(priorCount: number | null | undefined): ClinicTierDisplay {
  const count = normalizeClinicsAttended(priorCount);
  if (count <= 0) {
    return { kind: "first", label: "First clinic", count: 0 };
  }
  if (count <= 2) {
    return { kind: "returning", label: `${count} prior`, count };
  }
  return { kind: "veteran", label: "Veteran", count };
}

export function clinicTierKind(priorCount: number | null | undefined): ClinicTierKind {
  return clinicTierDisplay(priorCount).kind;
}