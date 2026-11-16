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
    /** Names the table for screen readers. Shown above the table unless `captionHidden` is set. */
    caption?: string;
    /** Keep the caption for screen readers only (it is not drawn). */
    captionHidden?: boolean;
    /** Render the first column's cells as row headers (`th scope="row"`). */
    rowHeader?: boolean;
};
export declare function AdminTable<Row = any>({ columns, rows, rowKey, emptyMessage, caption, captionHidden, rowHeader, }: AdminTableProps<Row>): import("react").JSX.Element;
