const SENSITIVE_KINDS = new Set(["email", "phone", "cell"]);
export const DEFAULT_PUBLIC_OPT_OUT_FIELD = "publicDirectoryOptOut";
export function isSensitiveColumnKind(kind) {
    return kind != null && SENSITIVE_KINDS.has(kind);
}
/** Drop email/phone/cell columns when the table is shown on a public page. */
export function applyPublicColumnPolicy(columns, audience) {
    if (audience === "internal")
        return columns;
    return columns.filter((column) => !isSensitiveColumnKind(column.sensitiveKind));
}
export function filterOptedOutRows(rows, audience, optOutField = DEFAULT_PUBLIC_OPT_OUT_FIELD) {
    if (audience === "internal")
        return rows;
    return rows.filter((row) => row[optOutField] !== true);
}
