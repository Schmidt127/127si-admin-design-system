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

export function AdminTable<Row = any>({
  columns = [],
  rows = [],
  rowKey,
  emptyMessage = "No records found.",
  caption,
  captionHidden = false,
  rowHeader = false,
}: AdminTableProps<Row>) {
  return (
    <div className="si-admin-table-wrap" tabIndex={0} role="region" aria-label={caption ?? "Scrollable table"}>
      <table className="si-admin-table">
        {caption ? <caption className={captionHidden ? "si-admin-sr-caption" : undefined}>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={rowKey ? rowKey(row) : index}>
                {columns.map((column, columnIndex) => {
                  const value = column.render ? column.render(row) : ((row as Record<string, ReactNode>)[column.key] ?? null);
                  if (rowHeader && columnIndex === 0) {
                    return (
                      <th key={column.key} scope="row" className="si-admin-row-header">
                        {value}
                      </th>
                    );
                  }
                  return <td key={column.key}>{value}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length || 1} className="si-admin-empty">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
