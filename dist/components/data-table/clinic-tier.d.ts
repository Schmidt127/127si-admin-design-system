export type ClinicTierKind = "first" | "returning" | "veteran";
export type ClinicTierDisplay = {
    kind: ClinicTierKind;
    label: string;
    count: number;
};
export declare function normalizeClinicsAttended(value: number | null | undefined): number;
export declare function clinicTierDisplay(priorCount: number | null | undefined): ClinicTierDisplay;
export declare function clinicTierKind(priorCount: number | null | undefined): ClinicTierKind;
