export type SensitiveColumnKind = "email" | "phone" | "cell";
export type PrivacyAwareColumn = {
    sensitiveKind?: SensitiveColumnKind;
};
export type DataTableAudience = "public" | "internal";
export declare const DEFAULT_PUBLIC_OPT_OUT_FIELD = "publicDirectoryOptOut";
export declare function isSensitiveColumnKind(kind: string | undefined): kind is SensitiveColumnKind;
/** Drop email/phone/cell columns when the table is shown on a public page. */
export declare function applyPublicColumnPolicy<Column extends PrivacyAwareColumn>(columns: Column[], audience: DataTableAudience): Column[];
export type PublicRowOptOut = {
    publicDirectoryOptOut?: boolean;
};
export declare function filterOptedOutRows<Row extends Record<string, unknown>>(rows: Row[], audience: DataTableAudience, optOutField?: keyof Row & string): Row[];
