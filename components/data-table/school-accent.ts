/** Deterministic accent for school initials rings (no PII). */
const SCHOOL_RING_PALETTE = ["#0034B7", "#001F6B", "#FF8B00", "#F5B301", "#2E6FD4", "#0B7A54", "#6B4BC4"] as const;

export function schoolAccentColor(schoolName: string): string {
  const normalized = schoolName.trim().toLowerCase() || "school";
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return SCHOOL_RING_PALETTE[hash % SCHOOL_RING_PALETTE.length] ?? SCHOOL_RING_PALETTE[0];
}