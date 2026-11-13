"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { useId, useMemo, useState } from "react";
import { cx } from "../_shared/cx.js";
function initials(first, last) {
    const a = (first?.trim().charAt(0) || "").toUpperCase();
    const b = (last?.trim().charAt(0) || "").toUpperCase();
    return a + b || "?";
}
function clinicsLabel(count) {
    if (count <= 0)
        return "First clinic";
    if (count >= 3)
        return "Veteran";
    return `${count} clinic${count === 1 ? "" : "s"}`;
}
function clinicsTier(count) {
    if (count <= 0)
        return "neutral";
    if (count >= 3)
        return "gold";
    return "blue";
}
function statusTone(status) {
    const value = status.toLowerCase().replace(/\s+/g, "-");
    if (["active", "paid", "complete", "approved", "registered"].includes(value))
        return "success";
    if (["pending", "review", "draft", "waitlist"].includes(value))
        return "warning";
    if (["withdrawn", "failed", "cancelled", "blocked", "inactive"].includes(value))
        return "danger";
    return "neutral";
}
function escapeCsv(value) {
    if (/[",\n]/.test(value))
        return `"${value.replace(/"/g, '""')}"`;
    return value;
}
function buildTanstackColumns(defs) {
    return defs.map((def) => ({
        id: def.id,
        accessorKey: def.accessorKey,
        accessorFn: def.accessorFn ?? (def.accessorKey ? (row) => row[def.accessorKey] : undefined),
        enableSorting: def.enableSorting ?? true,
        enableHiding: def.enableHiding ?? true,
        header: def.header,
        meta: { def },
        cell: ({ row, getValue }) => renderBuiltinCell(def, row.original, getValue()),
    }));
}
function renderBuiltinCell(def, row, value) {
    if (def.cell)
        return def.cell({ row, value });
    switch (def.cellKind) {
        case "participant": {
            const p = row;
            const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
            const ringStyle = p.schoolColor
                ? { outline: `3px solid ${p.schoolColor}` }
                : undefined;
            return (_jsxs("div", { className: "si-dt-participant", children: [p.avatarUrl ? (_jsx("img", { className: cx("si-dt-avatar", p.schoolColor && "has-ring"), src: p.avatarUrl, alt: "", style: ringStyle })) : (_jsx("span", { className: cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring"), style: ringStyle, "aria-hidden": true, children: initials(p.firstName, p.lastName) })), _jsxs("span", { className: "si-dt-participant-text", children: [_jsx("span", { className: "si-dt-participant-name", children: name || String(value ?? "") }), p.school ? _jsx("span", { className: "si-dt-participant-sub", children: p.school }) : null] })] }));
        }
        case "grade":
            return _jsx("span", { className: "si-dt-pill is-grade", children: String(value ?? "") });
        case "jersey":
            return _jsx("span", { className: "si-dt-pill is-jersey", children: String(value ?? "") });
        case "clinics": {
            const count = Number(value ?? 0);
            return _jsx("span", { className: cx("si-dt-pill", "is-clinics", `tier-${clinicsTier(count)}`), children: clinicsLabel(count) });
        }
        case "status":
            return _jsx("span", { className: cx("si-dt-pill", "is-status", `tone-${statusTone(String(value ?? ""))}`), children: String(value ?? "") });
        default:
            return _jsx("span", { className: def.tabular ? "si-dt-tabular" : undefined, children: value == null ? "" : String(value) });
    }
}
function SortButton({ label, sorted }) {
    return (_jsxs("span", { className: "si-dt-sort-label", children: [_jsx("span", { children: label }), _jsx("span", { className: cx("si-dt-sort-caret", sorted && `is-${sorted}`), "aria-hidden": true })] }));
}
export function DataTable({ columns: columnDefs, rows, columnVisibilityPreset, enableSelection = false, enableExport = false, emptyState, theme = "light", density = "comfortable", caption, rowKey, className, showSchoolRail = false, toolbarLabel = "Table filters", showToolbar = true, }) {
    const baseId = useId();
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [densityState, setDensityState] = useState(density);
    const [schoolFilter, setSchoolFilter] = useState("all");
    const [columnsOpen, setColumnsOpen] = useState(false);
    const initialVisibility = useMemo(() => {
        if (!columnVisibilityPreset)
            return {};
        if (columnVisibilityPreset === "public") {
            return { email: false, cell: false, status: false };
        }
        if (columnVisibilityPreset === "staff")
            return {};
        return columnVisibilityPreset;
    }, [columnVisibilityPreset]);
    const [columnVisibility, setColumnVisibility] = useState(initialVisibility);
    const schoolOptions = useMemo(() => {
        const schools = new Set();
        for (const row of rows) {
            const school = row.school;
            if (school?.trim())
                schools.add(school.trim());
        }
        return [...schools].sort((a, b) => a.localeCompare(b));
    }, [rows]);
    const filteredRows = useMemo(() => {
        if (schoolFilter === "all")
            return rows;
        return rows.filter((row) => row.school === schoolFilter);
    }, [rows, schoolFilter]);
    const tanstackColumns = useMemo(() => {
        const cols = buildTanstackColumns(columnDefs);
        if (!enableSelection)
            return cols;
        const selectCol = {
            id: "select",
            enableSorting: false,
            enableHiding: false,
            header: ({ table }) => (_jsx("input", { type: "checkbox", className: "si-dt-checkbox", checked: table.getIsAllPageRowsSelected(), ref: (el) => {
                    if (el)
                        el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
                }, onChange: table.getToggleAllPageRowsSelectedHandler(), "aria-label": "Select all rows" })),
            cell: ({ row }) => (_jsx("input", { type: "checkbox", className: "si-dt-checkbox", checked: row.getIsSelected(), disabled: !row.getCanSelect(), onChange: row.getToggleSelectedHandler(), "aria-label": "Select row" })),
        };
        return [selectCol, ...cols];
    }, [columnDefs, enableSelection]);
    const table = useReactTable({
        data: filteredRows,
        columns: tanstackColumns,
        state: { sorting, globalFilter, columnFilters, columnVisibility, rowSelection },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "includesString",
        enableRowSelection: enableSelection,
        getRowId: rowKey ? (row) => rowKey(row) : (row, index) => String(row.id ?? index),
    });
    const visibleCount = table.getFilteredRowModel().rows.length;
    const totalCount = filteredRows.length;
    const isEmpty = visibleCount === 0;
    const handleHeaderKey = (columnId) => (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const column = table.getColumn(columnId);
            if (column?.getCanSort())
                column.toggleSorting();
        }
    };
    const handleExport = () => {
        const visible = table
            .getAllColumns()
            .filter((col) => col.getIsVisible() && col.id !== "select")
            .map((col) => ({
            id: col.id,
            header: String(col.columnDef.header ?? col.id),
        }));
        const body = table.getFilteredRowModel().rows.map((row) => visible
            .map((vis) => {
            const column = table.getColumn(vis.id);
            const def = column?.columnDef.meta?.def;
            const raw = def?.accessorKey ? row.original[def.accessorKey] : column?.id ? row.getValue(column.id) : "";
            return escapeCsv(raw == null ? "" : String(raw));
        })
            .join(","));
        const csv = [visible.map((c) => escapeCsv(c.header)).join(","), ...body].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "roster-export.csv";
        anchor.click();
        URL.revokeObjectURL(url);
    };
    const empty = emptyState ?? { message: "No participants match these filters." };
    return (_jsxs("div", { className: cx("si-data-table", theme === "dark" && "is-dark", className), "data-si-dt-density": densityState, children: [showToolbar ? (_jsxs("div", { className: "si-dt-toolbar", role: "group", "aria-label": toolbarLabel, children: [_jsxs("div", { className: "si-dt-toolbar-start", children: [_jsxs("label", { className: "si-dt-search", children: [_jsx("span", { className: "si-dt-visually-hidden", children: "Search roster" }), _jsx("input", { type: "search", className: "si-dt-search-input", value: globalFilter, onChange: (e) => setGlobalFilter(e.target.value), placeholder: "Search participants", "aria-controls": `${baseId}-table` })] }), schoolOptions.length > 1 ? (_jsxs("div", { className: "si-dt-chips", role: "group", "aria-label": "School filter", children: [_jsx("button", { type: "button", className: cx("si-dt-chip", schoolFilter === "all" && "is-active"), onClick: () => setSchoolFilter("all"), "aria-pressed": schoolFilter === "all", children: "All schools" }), schoolOptions.map((school) => (_jsx("button", { type: "button", className: cx("si-dt-chip", schoolFilter === school && "is-active"), onClick: () => setSchoolFilter(school), "aria-pressed": schoolFilter === school, children: school }, school)))] })) : null] }), _jsxs("div", { className: "si-dt-toolbar-end", children: [_jsxs("span", { className: "si-dt-count", "aria-live": "polite", children: [_jsx("span", { className: "si-dt-count-strong", children: visibleCount }), globalFilter ? ` of ${totalCount} shown` : ` participant${visibleCount === 1 ? "" : "s"}`] }), _jsxs("div", { className: "si-dt-density", role: "group", "aria-label": "Row density", children: [_jsx("button", { type: "button", className: cx("si-dt-density-btn", densityState === "comfortable" && "is-active"), onClick: () => setDensityState("comfortable"), "aria-pressed": densityState === "comfortable", children: "Comfortable" }), _jsx("button", { type: "button", className: cx("si-dt-density-btn", densityState === "compact" && "is-active"), onClick: () => setDensityState("compact"), "aria-pressed": densityState === "compact", children: "Compact" })] }), _jsxs("div", { className: "si-dt-columns", children: [_jsx("button", { type: "button", className: "si-dt-columns-toggle", "aria-expanded": columnsOpen, "aria-controls": `${baseId}-columns`, onClick: () => setColumnsOpen((open) => !open), children: "Columns" }), columnsOpen ? (_jsx("div", { className: "si-dt-columns-panel", id: `${baseId}-columns`, role: "group", "aria-label": "Column visibility", children: table
                                            .getAllColumns()
                                            .filter((col) => col.getCanHide())
                                            .map((col) => (_jsxs("label", { className: "si-dt-columns-item", children: [_jsx("input", { type: "checkbox", checked: col.getIsVisible(), onChange: col.getToggleVisibilityHandler() }), _jsx("span", { children: String(col.columnDef.header ?? col.id) })] }, col.id))) })) : null] }), enableExport ? (_jsx("button", { type: "button", className: "si-dt-export", onClick: handleExport, children: "Export CSV" })) : null] })] })) : null, _jsxs("div", { className: "si-dt-card", children: [_jsx("div", { className: "si-dt-scroll", "data-si-surface": "admin", children: _jsxs("table", { className: "si-dt-table", id: `${baseId}-table`, children: [caption ? _jsx("caption", { className: "si-dt-caption", children: caption }) : null, _jsx("thead", { className: "si-dt-head", children: table.getHeaderGroups().map((group) => (_jsx("tr", { children: group.headers.map((header) => {
                                            const sorted = header.column.getIsSorted();
                                            const canSort = header.column.getCanSort();
                                            const def = header.column.columnDef.meta?.def;
                                            return (_jsx("th", { scope: "col", className: cx(canSort && "is-sortable", sorted && "is-sorted"), "aria-sort": sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : canSort ? "none" : undefined, children: header.isPlaceholder ? null : canSort ? (_jsx("button", { type: "button", className: "si-dt-sort-btn", onClick: header.column.getToggleSortingHandler(), onKeyDown: handleHeaderKey(header.column.id), children: _jsx(SortButton, { label: def?.header ?? String(header.column.columnDef.header), sorted: sorted }) })) : (flexRender(header.column.columnDef.header, header.getContext())) }, header.id));
                                        }) }, group.id))) }), _jsx("tbody", { className: "si-dt-body", children: isEmpty ? (_jsx("tr", { children: _jsx("td", { colSpan: table.getVisibleLeafColumns().length, className: "si-dt-empty-cell", children: _jsxs("div", { className: "si-dt-empty", children: [_jsx("span", { className: "si-dt-empty-mark", "aria-hidden": true, children: "00" }), _jsx("p", { className: "si-dt-empty-title", children: empty.title ?? "No participants yet" }), _jsx("p", { className: "si-dt-empty-msg", children: empty.message }), empty.actionLabel ? (_jsx("button", { type: "button", className: "si-dt-empty-action", onClick: empty.onAction, children: empty.actionLabel })) : null] }) }) })) : (table.getRowModel().rows.map((row) => {
                                        const schoolColor = row.original.schoolColor;
                                        const rowStyle = showSchoolRail && schoolColor ? { boxShadow: `inset 3px 0 0 ${schoolColor}` } : undefined;
                                        return (_jsx("tr", { className: cx(row.getIsSelected() && "is-selected", showSchoolRail && schoolColor && "has-rail"), style: rowStyle, "data-state": row.getIsSelected() ? "selected" : undefined, children: row.getVisibleCells().map((cell) => {
                                                const def = cell.column.columnDef.meta?.def;
                                                return (_jsx("td", { className: cx(def?.tabular && "is-tabular", def?.id === "participant" && "is-primary"), children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                            }) }, row.id));
                                    })) })] }) }), _jsx("ul", { className: "si-dt-mobile", "aria-label": caption ?? "Participant roster", children: isEmpty ? (_jsx("li", { className: "si-dt-mobile-card is-empty", children: _jsx("p", { children: empty.message }) })) : (table.getRowModel().rows.map((row) => {
                            const p = row.original;
                            const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
                            const ringStyle = p.schoolColor ? { outline: `3px solid ${p.schoolColor}` } : undefined;
                            const railStyle = p.schoolColor
                                ? { borderLeft: `3px solid ${p.schoolColor}` }
                                : undefined;
                            const grade = columnDefs.find((c) => c.id === "grade");
                            const jersey = columnDefs.find((c) => c.id === "jerseySize");
                            const clinics = columnDefs.find((c) => c.id === "clinics");
                            const status = columnDefs.find((c) => c.id === "status");
                            return (_jsxs("li", { className: cx("si-dt-mobile-card", p.schoolColor && "has-rail"), style: railStyle, children: [_jsxs("div", { className: "si-dt-mobile-main", children: [_jsx("span", { className: cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring"), style: ringStyle, "aria-hidden": true, children: initials(p.firstName, p.lastName) }), _jsxs("div", { children: [_jsx("p", { className: "si-dt-mobile-name", children: name }), _jsx("p", { className: "si-dt-mobile-sub", children: p.school })] })] }), _jsxs("div", { className: "si-dt-mobile-pills", children: [grade && table.getColumn("grade")?.getIsVisible()
                                                ? renderBuiltinCell(grade, row.original, row.original[grade.accessorKey])
                                                : null, jersey && table.getColumn("jerseySize")?.getIsVisible()
                                                ? renderBuiltinCell(jersey, row.original, row.original[jersey.accessorKey])
                                                : null, clinics && table.getColumn("clinics")?.getIsVisible()
                                                ? renderBuiltinCell(clinics, row.original, row.original[clinics.accessorKey])
                                                : null, status && table.getColumn("status")?.getIsVisible()
                                                ? renderBuiltinCell(status, row.original, row.original[status.accessorKey])
                                                : null] })] }, row.id));
                        })) })] })] }));
}
