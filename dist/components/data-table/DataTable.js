"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId, useMemo, useState, } from "react";
import { cx } from "../_shared/cx.js";
import { clinicTierDisplay, clinicTierKind } from "./clinic-tier.js";
import { applyPublicColumnPolicy, DEFAULT_PUBLIC_OPT_OUT_FIELD, filterOptedOutRows, } from "./privacy.js";
function initials(first, last) {
    const a = (first?.trim().charAt(0) || "").toUpperCase();
    const b = (last?.trim().charAt(0) || "").toUpperCase();
    return a + b || "?";
}
function isMissingValue(value) {
    return value == null || value === "";
}
function escapeCsv(value) {
    if (/[",\n]/.test(value))
        return `"${value.replace(/"/g, '""')}"`;
    return value;
}
function columnValue(def, row) {
    if (def.accessorFn)
        return def.accessorFn(row);
    if (def.accessorKey)
        return row[def.accessorKey];
    return undefined;
}
function rowSearchText(row, columns) {
    return columns
        .map((column) => {
        const value = columnValue(column, row);
        return value == null ? "" : String(value);
    })
        .join(" ")
        .toLowerCase();
}
function compareValues(a, b) {
    if (a == null && b == null)
        return 0;
    if (a == null)
        return 1;
    if (b == null)
        return -1;
    if (typeof a === "number" && typeof b === "number")
        return a - b;
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}
function renderBuiltinCell(def, row, value, showSchoolInParticipantCell) {
    if (def.cell)
        return def.cell({ row, value });
    switch (def.cellKind) {
        case "participant": {
            const p = row;
            const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
            const ringStyle = p.schoolColor
                ? {
                    borderColor: p.schoolColor,
                    background: p.avatarUrl ? undefined : p.schoolColor,
                    boxShadow: `0 0 0 2px var(--si-white, #fff), 0 0 0 4px ${p.schoolColor}`,
                }
                : undefined;
            return (_jsxs("div", { className: "si-dt-participant", children: [p.avatarUrl ? (_jsx("img", { className: cx("si-dt-avatar", p.schoolColor && "has-ring"), src: p.avatarUrl, alt: "", style: ringStyle })) : (_jsx("span", { className: cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring"), style: ringStyle, "aria-hidden": true, children: initials(p.firstName, p.lastName) })), _jsxs("span", { className: "si-dt-participant-text", children: [_jsx("span", { className: "si-dt-participant-name", children: name || String(value ?? "") }), showSchoolInParticipantCell && p.school ? _jsx("span", { className: "si-dt-participant-sub", children: p.school }) : null] })] }));
        }
        case "grade":
            return _jsx("span", { className: "si-dt-pill is-grade", children: String(value ?? "") });
        case "jersey":
            if (isMissingValue(value))
                return _jsx("span", { className: "si-dt-tabular", children: "-" });
            return _jsx("span", { className: "si-dt-pill is-jersey", children: String(value) });
        case "clinics": {
            const tier = clinicTierDisplay(typeof value === "number" ? value : null);
            return _jsx("span", { className: cx("si-dt-pill", "is-clinics", `tier-${tier.kind}`), children: tier.label });
        }
        case "badge":
            return (_jsx("span", { className: "si-dt-pill is-badge", children: def.badgeLabel ? def.badgeLabel(value, row) : value == null ? "" : String(value) }));
        default:
            return _jsx("span", { className: def.tabular ? "si-dt-tabular" : undefined, children: value == null ? "" : String(value) });
    }
}
function SortButton({ label, sorted }) {
    return (_jsxs("span", { className: "si-dt-sort-label", children: [_jsx("span", { children: label }), _jsx("span", { className: cx("si-dt-sort-caret", sorted && `is-${sorted}`), "aria-hidden": true })] }));
}
function builtInChipFilters(auto) {
    const filters = [];
    if (auto?.includes("school")) {
        filters.push({
            id: "school",
            ariaLabel: "School filter",
            allLabel: "All schools",
            getValue: (row) => {
                const school = row.school;
                return school?.trim() || undefined;
            },
        });
    }
    if (auto?.includes("grade")) {
        filters.push({
            id: "grade",
            ariaLabel: "Grade filter",
            allLabel: "All grades",
            getValue: (row) => {
                const grade = row.grade;
                return grade?.trim() || undefined;
            },
        });
    }
    return filters;
}
export function DataTable({ columns: columnDefs, rows, audience = "public", optOutField = DEFAULT_PUBLIC_OPT_OUT_FIELD, loading = false, enableExport = false, exportFileName = "participants.csv", emptyState, theme = "light", variant = "premium", density = "comfortable", caption, rowKey, className, showSchoolRail = true, toolbarLabel = "Table filters", showToolbar = true, showSchoolInParticipantCell = false, enableClinicsTierFilter = false, clinicsTierField = "clinicsAttended", chipFilters, autoChipFilters, }) {
    const baseId = useId();
    const visibleColumns = useMemo(() => applyPublicColumnPolicy(columnDefs, audience), [columnDefs, audience]);
    const visibleRows = useMemo(() => filterOptedOutRows(rows, audience, optOutField), [rows, audience, optOutField]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [densityState, setDensityState] = useState(density);
    const [columnsOpen, setColumnsOpen] = useState(false);
    const [hiddenColumns, setHiddenColumns] = useState({});
    const [sort, setSort] = useState(null);
    const [chipFilterValues, setChipFilterValues] = useState({});
    const [tierFilter, setTierFilter] = useState("all");
    const activeChipFilters = useMemo(() => [...builtInChipFilters(autoChipFilters), ...(chipFilters ?? [])], [autoChipFilters, chipFilters]);
    const chipOptions = useMemo(() => {
        const map = {};
        for (const filter of activeChipFilters) {
            const values = new Set();
            for (const row of visibleRows) {
                const value = filter.getValue(row);
                if (value)
                    values.add(value);
            }
            map[filter.id] = [...values].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        }
        return map;
    }, [activeChipFilters, visibleRows]);
    const filteredRows = useMemo(() => {
        const query = globalFilter.trim().toLowerCase();
        return visibleRows.filter((row) => {
            for (const filter of activeChipFilters) {
                const selected = chipFilterValues[filter.id] ?? "all";
                if (selected !== "all" && filter.getValue(row) !== selected)
                    return false;
            }
            if (enableClinicsTierFilter && tierFilter !== "all") {
                const raw = row[clinicsTierField];
                const clinics = typeof raw === "number" ? raw : null;
                if (clinicTierKind(clinics) !== tierFilter)
                    return false;
            }
            if (query && !rowSearchText(row, visibleColumns).includes(query))
                return false;
            return true;
        });
    }, [
        visibleRows,
        activeChipFilters,
        chipFilterValues,
        enableClinicsTierFilter,
        tierFilter,
        clinicsTierField,
        globalFilter,
        visibleColumns,
    ]);
    const sortedRows = useMemo(() => {
        if (!sort)
            return filteredRows;
        const column = visibleColumns.find((entry) => entry.id === sort.columnId);
        if (!column)
            return filteredRows;
        const copy = [...filteredRows];
        copy.sort((left, right) => {
            const result = compareValues(columnValue(column, left), columnValue(column, right));
            return sort.desc ? -result : result;
        });
        return copy;
    }, [filteredRows, sort, visibleColumns]);
    const displayedColumns = useMemo(() => visibleColumns.filter((column) => hiddenColumns[column.id] !== true), [hiddenColumns, visibleColumns]);
    const visibleCount = sortedRows.length;
    const totalCount = filteredRows.length;
    const isEmpty = !loading && visibleCount === 0;
    const toggleSort = (column) => {
        if (column.enableSorting === false)
            return;
        setSort((current) => {
            if (!current || current.columnId !== column.id)
                return { columnId: column.id, desc: false };
            if (!current.desc)
                return { columnId: column.id, desc: true };
            return null;
        });
    };
    const sortDirection = (columnId) => {
        if (!sort || sort.columnId !== columnId)
            return false;
        return sort.desc ? "desc" : "asc";
    };
    const handleHeaderKey = (column) => (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleSort(column);
        }
    };
    const handleExport = () => {
        const exportColumns = displayedColumns;
        const header = exportColumns.map((column) => escapeCsv(column.header)).join(",");
        const body = sortedRows.map((row) => exportColumns
            .map((column) => escapeCsv(String(columnValue(column, row) ?? "")))
            .join(","));
        const csv = [header, ...body].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = exportFileName;
        anchor.click();
        URL.revokeObjectURL(url);
    };
    const empty = emptyState ?? { message: "No rows match these filters." };
    const resolveRowKey = (row, index) => (rowKey ? rowKey(row) : String(row.id ?? index));
    return (_jsxs("div", { className: cx("si-data-table", theme === "dark" && "is-dark", variant === "premium" && "is-premium", loading && "is-loading", className), "data-si-dt-density": densityState, children: [showToolbar ? (_jsxs("div", { className: cx("si-dt-toolbar", variant === "premium" && "si-dt-toolbar--card"), role: "group", "aria-label": toolbarLabel, children: [_jsxs("div", { className: "si-dt-toolbar-start", children: [_jsxs("label", { className: "si-dt-search", children: [_jsx("span", { className: "si-dt-visually-hidden", children: "Search table" }), _jsx("input", { type: "search", className: "si-dt-search-input", value: globalFilter, onChange: (event) => setGlobalFilter(event.target.value), placeholder: "Search participants", "aria-controls": `${baseId}-table`, disabled: loading })] }), activeChipFilters.map((filter) => {
                                const options = chipOptions[filter.id] ?? [];
                                if (options.length <= 1)
                                    return null;
                                const selected = chipFilterValues[filter.id] ?? "all";
                                return (_jsxs("div", { className: "si-dt-chips", role: "group", "aria-label": filter.ariaLabel, children: [_jsx("button", { type: "button", className: cx("si-dt-chip", selected === "all" && "is-active"), onClick: () => setChipFilterValues((state) => ({ ...state, [filter.id]: "all" })), "aria-pressed": selected === "all", disabled: loading, children: filter.allLabel }), options.map((value) => (_jsx("button", { type: "button", className: cx("si-dt-chip", selected === value && "is-active"), onClick: () => setChipFilterValues((state) => ({ ...state, [filter.id]: value })), "aria-pressed": selected === value, disabled: loading, children: value }, value)))] }, filter.id));
                            }), enableClinicsTierFilter ? (_jsx("div", { className: "si-dt-chips", role: "group", "aria-label": "Clinic tier filter", children: [
                                    ["all", "All tiers"],
                                    ["first", "First clinic"],
                                    ["returning", "Returning"],
                                    ["veteran", "Veterans"],
                                ].map(([tier, label]) => (_jsx("button", { type: "button", className: cx("si-dt-chip", tierFilter === tier && "is-active"), onClick: () => setTierFilter(tier), "aria-pressed": tierFilter === tier, disabled: loading, children: label }, tier))) })) : null] }), _jsxs("div", { className: "si-dt-toolbar-end", children: [_jsx("span", { className: "si-dt-count", "aria-live": "polite", children: loading ? ("Loading…") : (_jsxs(_Fragment, { children: [_jsx("span", { className: "si-dt-count-strong", children: visibleCount }), globalFilter ? ` of ${totalCount} shown` : ` row${visibleCount === 1 ? "" : "s"}`] })) }), _jsxs("div", { className: "si-dt-density", role: "group", "aria-label": "Row density", children: [_jsx("button", { type: "button", className: cx("si-dt-density-btn", densityState === "comfortable" && "is-active"), onClick: () => setDensityState("comfortable"), "aria-pressed": densityState === "comfortable", disabled: loading, children: "Comfortable" }), _jsx("button", { type: "button", className: cx("si-dt-density-btn", densityState === "compact" && "is-active"), onClick: () => setDensityState("compact"), "aria-pressed": densityState === "compact", disabled: loading, children: "Compact" })] }), _jsxs("div", { className: "si-dt-columns", children: [_jsx("button", { type: "button", className: "si-dt-columns-toggle", "aria-expanded": columnsOpen, "aria-controls": `${baseId}-columns`, onClick: () => setColumnsOpen((open) => !open), disabled: loading, children: "Columns" }), columnsOpen ? (_jsx("div", { className: "si-dt-columns-panel", id: `${baseId}-columns`, role: "group", "aria-label": "Column visibility", children: visibleColumns
                                            .filter((column) => column.enableHiding !== false)
                                            .map((column) => (_jsxs("label", { className: "si-dt-columns-item", children: [_jsx("input", { type: "checkbox", checked: hiddenColumns[column.id] !== true, onChange: () => setHiddenColumns((state) => ({
                                                        ...state,
                                                        [column.id]: state[column.id] === true ? false : true,
                                                    })) }), _jsx("span", { children: column.header })] }, column.id))) })) : null] }), enableExport ? (_jsx("button", { type: "button", className: "si-dt-export", onClick: handleExport, disabled: loading, children: "Export CSV" })) : null] })] })) : null, _jsxs("div", { className: cx("si-dt-card", variant === "premium" && "si-dt-card--premium"), children: [_jsx("div", { className: "si-dt-scroll", children: _jsxs("table", { className: "si-dt-table", id: `${baseId}-table`, children: [caption ? _jsx("caption", { className: "si-dt-caption", children: caption }) : null, _jsx("thead", { className: "si-dt-head", children: _jsx("tr", { children: displayedColumns.map((column) => {
                                            const sorted = sortDirection(column.id);
                                            const canSort = column.enableSorting !== false;
                                            return (_jsx("th", { scope: "col", className: cx(canSort && "is-sortable", sorted && "is-sorted"), "aria-sort": sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : canSort ? "none" : undefined, children: canSort ? (_jsx("button", { type: "button", className: "si-dt-sort-btn", onClick: () => toggleSort(column), onKeyDown: handleHeaderKey(column), children: _jsx(SortButton, { label: column.header, sorted: sorted }) })) : (column.header) }, column.id));
                                        }) }) }), _jsx("tbody", { className: "si-dt-body", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: displayedColumns.length || 1, className: "si-dt-loading-cell", children: _jsxs("div", { className: "si-dt-loading", role: "status", children: [_jsx("span", { className: "si-dt-loading-mark", "aria-hidden": true }), "Loading participants\u2026"] }) }) })) : isEmpty ? (_jsx("tr", { children: _jsx("td", { colSpan: displayedColumns.length || 1, className: "si-dt-empty-cell", children: _jsxs("div", { className: "si-dt-empty", children: [_jsx("span", { className: "si-dt-empty-mark", "aria-hidden": true, children: "00" }), _jsx("p", { className: "si-dt-empty-title", children: empty.title ?? "Nothing to show yet" }), _jsx("p", { className: "si-dt-empty-msg", children: empty.message }), empty.actionLabel && empty.actionHref ? (_jsx("a", { className: "si-dt-empty-action", href: empty.actionHref, children: empty.actionLabel })) : empty.actionLabel ? (_jsx("button", { type: "button", className: "si-dt-empty-action", onClick: empty.onAction, children: empty.actionLabel })) : null] }) }) })) : (sortedRows.map((row, index) => (_jsx("tr", { className: cx(showSchoolRail && row.schoolColor && "has-rail"), children: displayedColumns.map((column) => (_jsx("td", { className: cx(column.tabular && "is-tabular", column.id === "participant" && "is-primary"), children: renderBuiltinCell(column, row, columnValue(column, row), showSchoolInParticipantCell) }, column.id))) }, resolveRowKey(row, index))))) })] }) }), _jsx("ul", { className: "si-dt-mobile", "aria-label": caption ?? "Participant roster", children: loading ? (_jsx("li", { className: "si-dt-mobile-card is-loading", role: "status", children: "Loading participants\u2026" })) : isEmpty ? (_jsxs("li", { className: "si-dt-mobile-card is-empty", children: [_jsx("p", { children: empty.message }), empty.actionLabel && empty.actionHref ? (_jsx("a", { className: "si-dt-empty-action", href: empty.actionHref, children: empty.actionLabel })) : null] })) : (sortedRows.map((row, index) => {
                            const p = row;
                            const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
                            const ringStyle = p.schoolColor
                                ? {
                                    borderColor: p.schoolColor,
                                    background: p.avatarUrl ? undefined : p.schoolColor,
                                    boxShadow: `0 0 0 2px var(--si-white, #fff), 0 0 0 4px ${p.schoolColor}`,
                                }
                                : undefined;
                            const grade = columnDefs.find((column) => column.id === "grade");
                            const jersey = columnDefs.find((column) => column.id === "jerseySize");
                            const clinics = columnDefs.find((column) => column.id === "clinics");
                            const schoolCol = columnDefs.find((column) => column.id === "school");
                            return (_jsxs("li", { className: cx("si-dt-mobile-card", showSchoolRail && p.schoolColor && "has-rail"), children: [_jsxs("div", { className: "si-dt-mobile-main", children: [_jsx("span", { className: cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring"), style: ringStyle, "aria-hidden": true, children: initials(p.firstName, p.lastName) }), _jsxs("div", { children: [_jsx("p", { className: "si-dt-mobile-name", children: name }), schoolCol ? _jsx("p", { className: "si-dt-mobile-sub", children: p.school }) : null] })] }), _jsxs("div", { className: "si-dt-mobile-pills", children: [grade
                                                ? renderBuiltinCell(grade, row, grade.accessorKey ? row[grade.accessorKey] : columnValue(grade, row), showSchoolInParticipantCell)
                                                : null, jersey
                                                ? renderBuiltinCell(jersey, row, jersey.accessorKey ? row[jersey.accessorKey] : columnValue(jersey, row), showSchoolInParticipantCell)
                                                : null, clinics
                                                ? renderBuiltinCell(clinics, row, clinics.accessorKey ? row[clinics.accessorKey] : columnValue(clinics, row), showSchoolInParticipantCell)
                                                : null] })] }, resolveRowKey(row, index)));
                        })) })] })] }));
}
