import type { ReactNode } from "react";
export type AdminTableColumn<Row> = {
    key: string;
    label: string;
    render?: (row: Row) => ReactNode;
};
export type AdminTableProps<Row = any> = {
    columns?: Array<AdminTableColumn<Row>>;
    rows?: Row[];
    rowKey?: (row: Row) => string | number;
    emptyMessage?: string;
    /** Names the table for screen readers and sits above it. */
    caption?: string;
};
export declare function AdminTable<Row = any>({ columns, rows, rowKey, emptyMessage, caption }: AdminTableProps<Row>): import("react").JSX.Element;
