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

export function AdminTable<Row = any>({ columns = [], rows = [], rowKey, emptyMessage = "No records found.", caption }: AdminTableProps<Row>) {
  return (
    <div className="si-admin-table-wrap">
      <table className="si-admin-table">
        {caption ? <caption>{caption}</caption> : null}
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
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : ((row as Record<string, ReactNode>)[column.key] ?? null)}</td>
                ))}
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
