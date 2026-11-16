import { type ReactNode } from "react";
import { type DataTableAudience, type SensitiveColumnKind } from "./privacy.js";
export type DataTableTheme = "light" | "dark";
export type DataTableDensity = "comfortable" | "compact";
export type DataTableVariant = "standard" | "premium";
export type DataTableCellKind = "participant" | "text" | "grade" | "jersey" | "clinics" | "badge" | "custom";
export type DataTableColumnDef<Row> = {
    id: string;
    header: string;
    accessorKey?: keyof Row & string;
    accessorFn?: (row: Row) => unknown;
    cellKind?: DataTableCellKind;
    cell?: (ctx: {
        row: Row;
        value: unknown;
    }) => ReactNode;
    enableSorting?: boolean;
    enableHiding?: boolean;
    tabular?: boolean;
    sensitiveKind?: SensitiveColumnKind;
    /** Used with cellKind `badge` when no custom cell is provided. */
    badgeLabel?: (value: unknown, row: Row) => string;
};
export type DataTableEmptyState = {
    title?: string;
    message: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
};
export type DataTableCountLabel = {
    one: string;
    other: string;
};
/** Referee youth-participant directory defaults; callers override for other rosters. */
export declare const DEFAULT_DATA_TABLE_SEARCH_PLACEHOLDER = "Search participants";
export declare const DEFAULT_DATA_TABLE_LOADING_MESSAGE = "Loading participants\u2026";
export declare const DEFAULT_DATA_TABLE_EXPORT_FILE_NAME = "participants.csv";
export type DataTableChipFilter<Row> = {
    id: string;
    ariaLabel: string;
    allLabel: string;
    getValue: (row: Row) => string | undefined;
};
export type DataTableProps<Row extends Record<string, unknown> = Record<string, unknown>> = {
    columns: Array<DataTableColumnDef<Row>>;
    rows: Row[];
    audience?: DataTableAudience;
    optOutField?: keyof Row & string;
    loading?: boolean;
    enableExport?: boolean;
    exportFileName?: string;
    emptyState?: DataTableEmptyState;
    theme?: DataTableTheme;
    variant?: DataTableVariant;
    density?: DataTableDensity;
    caption?: string;
    rowKey?: (row: Row) => string;
    className?: string;
    showSchoolRail?: boolean;
    toolbarLabel?: string;
    showToolbar?: boolean;
    /** When false, hides the toolbar search field (default true). */
    showSearch?: boolean;
    showSchoolInParticipantCell?: boolean;
    enableClinicsTierFilter?: boolean;
    clinicsTierField?: keyof Row & string;
    chipFilters?: Array<DataTableChipFilter<Row>>;
    autoChipFilters?: Array<"school" | "grade">;
    /** Toolbar count noun (e.g. `{ one: "participant", other: "participants" }`). Defaults to row/rows. */
    countLabel?: DataTableCountLabel;
    /** Search field placeholder when `showSearch` is true. Default Referee “Search participants”. */
    searchPlaceholder?: string;
    /** Loading row and mobile card copy when `loading` is true. Default Referee “Loading participants…”. */
    loadingMessage?: string;
};
export declare function DataTable<Row extends Record<string, unknown> = Record<string, unknown>>({ columns: columnDefs, rows, audience, optOutField, loading, enableExport, exportFileName, emptyState, theme, variant, density, caption, rowKey, className, showSchoolRail, toolbarLabel, showToolbar, showSearch, showSchoolInParticipantCell, enableClinicsTierFilter, clinicsTierField, chipFilters, autoChipFilters, countLabel, searchPlaceholder, loadingMessage, }: DataTableProps<Row>): import("react").JSX.Element;
