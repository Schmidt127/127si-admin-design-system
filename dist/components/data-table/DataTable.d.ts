import { type ReactNode } from "react";
export type DataTableTheme = "light" | "dark";
export type DataTableDensity = "comfortable" | "compact";
export type DataTableCellKind = "participant" | "text" | "grade" | "jersey" | "clinics" | "status" | "custom";
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
};
export type DataTableEmptyState = {
    title?: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
};
export type DataTableProps<Row extends Record<string, unknown> = Record<string, unknown>> = {
    columns: Array<DataTableColumnDef<Row>>;
    rows: Row[];
    /** Named public/staff presets or an explicit column-id visibility map. */
    columnVisibilityPreset?: "public" | "staff" | Record<string, boolean>;
    enableSelection?: boolean;
    /** CSV download control in the toolbar. Off by default. */
    enableExport?: boolean;
    emptyState?: DataTableEmptyState;
    theme?: DataTableTheme;
    density?: DataTableDensity;
    caption?: string;
    rowKey?: (row: Row) => string;
    className?: string;
    /** Shows a school-colour left rail when rows supply `schoolColor`. */
    showSchoolRail?: boolean;
    toolbarLabel?: string;
    /** When false, only the table card is rendered (no search/filters). */
    showToolbar?: boolean;
};
export declare function DataTable<Row extends Record<string, unknown> = Record<string, unknown>>({ columns: columnDefs, rows, columnVisibilityPreset, enableSelection, enableExport, emptyState, theme, density, caption, rowKey, className, showSchoolRail, toolbarLabel, showToolbar, }: DataTableProps<Row>): import("react").JSX.Element;
