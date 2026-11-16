export type SensitiveColumnKind = "email" | "phone" | "cell";

export type PrivacyAwareColumn = {
  sensitiveKind?: SensitiveColumnKind;
};

export type DataTableAudience = "public" | "internal";

const SENSITIVE_KINDS = new Set<SensitiveColumnKind>(["email", "phone", "cell"]);

export const DEFAULT_PUBLIC_OPT_OUT_FIELD = "publicDirectoryOptOut";

export function isSensitiveColumnKind(kind: string | undefined): kind is SensitiveColumnKind {
  return kind != null && SENSITIVE_KINDS.has(kind as SensitiveColumnKind);
}

/** Drop email/phone/cell columns when the table is shown on a public page. */
export function applyPublicColumnPolicy<Column extends PrivacyAwareColumn>(
  columns: Column[],
  audience: DataTableAudience,
): Column[] {
  if (audience === "internal") return columns;
  return columns.filter((column) => !isSensitiveColumnKind(column.sensitiveKind));
}

export type PublicRowOptOut = {
  publicDirectoryOptOut?: boolean;
};

export function filterOptedOutRows<Row extends Record<string, unknown>>(
  rows: Row[],
  audience: DataTableAudience,
  optOutField: keyof Row & string = DEFAULT_PUBLIC_OPT_OUT_FIELD,
): Row[] {
  if (audience === "internal") return rows;
  return rows.filter((row) => row[optOutField] !== true);
}