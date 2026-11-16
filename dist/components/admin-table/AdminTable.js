import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AdminTable({ columns = [], rows = [], rowKey, emptyMessage = "No records found.", caption, captionHidden = false, rowHeader = false, }) {
    return (_jsx("div", { className: "si-admin-table-wrap", tabIndex: 0, role: "region", "aria-label": caption ?? "Scrollable table", children: _jsxs("table", { className: "si-admin-table", children: [caption ? _jsx("caption", { className: captionHidden ? "si-admin-sr-caption" : undefined, children: caption }) : null, _jsx("thead", { children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { scope: "col", children: column.label }, column.key))) }) }), _jsx("tbody", { children: rows.length ? (rows.map((row, index) => (_jsx("tr", { children: columns.map((column, columnIndex) => {
                            const value = column.render ? column.render(row) : (row[column.key] ?? null);
                            if (rowHeader && columnIndex === 0) {
                                return (_jsx("th", { scope: "row", className: "si-admin-row-header", children: value }, column.key));
                            }
                            return _jsx("td", { children: value }, column.key);
                        }) }, rowKey ? rowKey(row) : index)))) : (_jsx("tr", { children: _jsx("td", { colSpan: columns.length || 1, className: "si-admin-empty", children: emptyMessage }) })) })] }) }));
}
