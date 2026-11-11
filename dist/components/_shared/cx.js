/** Join class names, skipping empty values. */
export function cx(...values) {
    return values.filter(Boolean).join(" ");
}
