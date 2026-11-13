"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type CSSProperties, type KeyboardEvent, type ReactNode, useId, useMemo, useState } from "react";
import { cx } from "../_shared/cx.js";

export type DataTableTheme = "light" | "dark";
export type DataTableDensity = "comfortable" | "compact";
export type DataTableCellKind = "participant" | "text" | "grade" | "jersey" | "clinics" | "status" | "custom";

export type DataTableColumnDef<Row> = {
  id: string;
  header: string;
  accessorKey?: keyof Row & string;
  accessorFn?: (row: Row) => unknown;
  cellKind?: DataTableCellKind;
  cell?: (ctx: { row: Row; value: unknown }) => ReactNode;
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

type ParticipantFields = {
  firstName?: string;
  lastName?: string;
  school?: string;
  schoolColor?: string;
  avatarUrl?: string;
};

function initials(first?: string, last?: string): string {
  const a = (first?.trim().charAt(0) || "").toUpperCase();
  const b = (last?.trim().charAt(0) || "").toUpperCase();
  return a + b || "?";
}

function clinicsLabel(count: number): string {
  if (count <= 0) return "First clinic";
  if (count >= 3) return "Veteran";
  return `${count} clinic${count === 1 ? "" : "s"}`;
}

function clinicsTier(count: number): string {
  if (count <= 0) return "neutral";
  if (count >= 3) return "gold";
  return "blue";
}

function statusTone(status: string): string {
  const value = status.toLowerCase().replace(/\s+/g, "-");
  if (["active", "paid", "complete", "approved", "registered"].includes(value)) return "success";
  if (["pending", "review", "draft", "waitlist"].includes(value)) return "warning";
  if (["withdrawn", "failed", "cancelled", "blocked", "inactive"].includes(value)) return "danger";
  return "neutral";
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function buildTanstackColumns<Row extends Record<string, unknown>>(
  defs: Array<DataTableColumnDef<Row>>,
): Array<ColumnDef<Row, unknown>> {
  return defs.map((def) => ({
    id: def.id,
    accessorKey: def.accessorKey,
    accessorFn: def.accessorFn ?? (def.accessorKey ? (row) => row[def.accessorKey as keyof Row] : undefined),
    enableSorting: def.enableSorting ?? true,
    enableHiding: def.enableHiding ?? true,
    header: def.header,
    meta: { def },
    cell: ({ row, getValue }) => renderBuiltinCell(def, row.original, getValue()),
  }));
}

function renderBuiltinCell<Row extends Record<string, unknown>>(def: DataTableColumnDef<Row>, row: Row, value: unknown): ReactNode {
  if (def.cell) return def.cell({ row, value });

  switch (def.cellKind) {
    case "participant": {
      const p = row as Row & ParticipantFields;
      const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
      const ringStyle: CSSProperties | undefined = p.schoolColor
        ? { outline: `3px solid ${p.schoolColor}` }
        : undefined;
      return (
        <div className="si-dt-participant">
          {p.avatarUrl ? (
            <img className={cx("si-dt-avatar", p.schoolColor && "has-ring")} src={p.avatarUrl} alt="" style={ringStyle} />
          ) : (
            <span className={cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring")} style={ringStyle} aria-hidden>
              {initials(p.firstName, p.lastName)}
            </span>
          )}
          <span className="si-dt-participant-text">
            <span className="si-dt-participant-name">{name || String(value ?? "")}</span>
            {p.school ? <span className="si-dt-participant-sub">{p.school}</span> : null}
          </span>
        </div>
      );
    }
    case "grade":
      return <span className="si-dt-pill is-grade">{String(value ?? "")}</span>;
    case "jersey":
      return <span className="si-dt-pill is-jersey">{String(value ?? "")}</span>;
    case "clinics": {
      const count = Number(value ?? 0);
      return <span className={cx("si-dt-pill", "is-clinics", `tier-${clinicsTier(count)}`)}>{clinicsLabel(count)}</span>;
    }
    case "status":
      return <span className={cx("si-dt-pill", "is-status", `tone-${statusTone(String(value ?? ""))}`)}>{String(value ?? "")}</span>;
    default:
      return <span className={def.tabular ? "si-dt-tabular" : undefined}>{value == null ? "" : String(value)}</span>;
  }
}

function SortButton({ label, sorted }: { label: string; sorted: false | "asc" | "desc" }) {
  return (
    <span className="si-dt-sort-label">
      <span>{label}</span>
      <span className={cx("si-dt-sort-caret", sorted && `is-${sorted}`)} aria-hidden />
    </span>
  );
}

export function DataTable<Row extends Record<string, unknown> = Record<string, unknown>>({
  columns: columnDefs,
  rows,
  columnVisibilityPreset,
  enableSelection = false,
  enableExport = false,
  emptyState,
  theme = "light",
  density = "comfortable",
  caption,
  rowKey,
  className,
  showSchoolRail = false,
  toolbarLabel = "Table filters",
  showToolbar = true,
}: DataTableProps<Row>) {
  const baseId = useId();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [densityState, setDensityState] = useState<DataTableDensity>(density);
  const [schoolFilter, setSchoolFilter] = useState<string>("all");
  const [columnsOpen, setColumnsOpen] = useState(false);

  const initialVisibility = useMemo((): VisibilityState => {
    if (!columnVisibilityPreset) return {};
    if (columnVisibilityPreset === "public") {
      return { email: false, cell: false, status: false };
    }
    if (columnVisibilityPreset === "staff") return {};
    return columnVisibilityPreset;
  }, [columnVisibilityPreset]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility);

  const schoolOptions = useMemo(() => {
    const schools = new Set<string>();
    for (const row of rows) {
      const school = (row as ParticipantFields).school;
      if (school?.trim()) schools.add(school.trim());
    }
    return [...schools].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (schoolFilter === "all") return rows;
    return rows.filter((row) => (row as ParticipantFields).school === schoolFilter);
  }, [rows, schoolFilter]);

  const tanstackColumns = useMemo(() => {
    const cols = buildTanstackColumns(columnDefs);
    if (!enableSelection) return cols;
    const selectCol: ColumnDef<Row, unknown> = {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <input
          type="checkbox"
          className="si-dt-checkbox"
          checked={table.getIsAllPageRowsSelected()}
          ref={(el) => {
            if (el) el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
          }}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="si-dt-checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
        />
      ),
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
    getRowId: rowKey ? (row) => rowKey(row) : (row, index) => String((row as { id?: string }).id ?? index),
  });

  const visibleCount = table.getFilteredRowModel().rows.length;
  const totalCount = filteredRows.length;
  const isEmpty = visibleCount === 0;

  const handleHeaderKey = (columnId: string) => (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const column = table.getColumn(columnId);
      if (column?.getCanSort()) column.toggleSorting();
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
    const body = table.getFilteredRowModel().rows.map((row) =>
      visible
        .map((vis) => {
          const column = table.getColumn(vis.id);
          const def = (column?.columnDef.meta as { def?: DataTableColumnDef<Row> } | undefined)?.def;
          const raw = def?.accessorKey ? row.original[def.accessorKey as keyof Row] : column?.id ? row.getValue(column.id) : "";
          return escapeCsv(raw == null ? "" : String(raw));
        })
        .join(","),
    );
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

  return (
    <div className={cx("si-data-table", theme === "dark" && "is-dark", className)} data-si-dt-density={densityState}>
      {showToolbar ? (
        <div className="si-dt-toolbar" role="group" aria-label={toolbarLabel}>
          <div className="si-dt-toolbar-start">
            <label className="si-dt-search">
              <span className="si-dt-visually-hidden">Search roster</span>
              <input
                type="search"
                className="si-dt-search-input"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search participants"
                aria-controls={`${baseId}-table`}
              />
            </label>
            {schoolOptions.length > 1 ? (
              <div className="si-dt-chips" role="group" aria-label="School filter">
                <button
                  type="button"
                  className={cx("si-dt-chip", schoolFilter === "all" && "is-active")}
                  onClick={() => setSchoolFilter("all")}
                  aria-pressed={schoolFilter === "all"}
                >
                  All schools
                </button>
                {schoolOptions.map((school) => (
                  <button
                    key={school}
                    type="button"
                    className={cx("si-dt-chip", schoolFilter === school && "is-active")}
                    onClick={() => setSchoolFilter(school)}
                    aria-pressed={schoolFilter === school}
                  >
                    {school}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="si-dt-toolbar-end">
            <span className="si-dt-count" aria-live="polite">
              <span className="si-dt-count-strong">{visibleCount}</span>
              {globalFilter ? ` of ${totalCount} shown` : ` participant${visibleCount === 1 ? "" : "s"}`}
            </span>
            <div className="si-dt-density" role="group" aria-label="Row density">
              <button
                type="button"
                className={cx("si-dt-density-btn", densityState === "comfortable" && "is-active")}
                onClick={() => setDensityState("comfortable")}
                aria-pressed={densityState === "comfortable"}
              >
                Comfortable
              </button>
              <button
                type="button"
                className={cx("si-dt-density-btn", densityState === "compact" && "is-active")}
                onClick={() => setDensityState("compact")}
                aria-pressed={densityState === "compact"}
              >
                Compact
              </button>
            </div>
            <div className="si-dt-columns">
              <button
                type="button"
                className="si-dt-columns-toggle"
                aria-expanded={columnsOpen}
                aria-controls={`${baseId}-columns`}
                onClick={() => setColumnsOpen((open) => !open)}
              >
                Columns
              </button>
              {columnsOpen ? (
                <div className="si-dt-columns-panel" id={`${baseId}-columns`} role="group" aria-label="Column visibility">
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide())
                    .map((col) => (
                      <label key={col.id} className="si-dt-columns-item">
                        <input
                          type="checkbox"
                          checked={col.getIsVisible()}
                          onChange={col.getToggleVisibilityHandler()}
                        />
                        <span>{String(col.columnDef.header ?? col.id)}</span>
                      </label>
                    ))}
                </div>
              ) : null}
            </div>
            {enableExport ? (
              <button type="button" className="si-dt-export" onClick={handleExport}>
                Export CSV
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="si-dt-card">
        <div className="si-dt-scroll" data-si-surface="admin">
          <table className="si-dt-table" id={`${baseId}-table`}>
            {caption ? <caption className="si-dt-caption">{caption}</caption> : null}
            <thead className="si-dt-head">
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  {group.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    const canSort = header.column.getCanSort();
                    const def = (header.column.columnDef.meta as { def?: DataTableColumnDef<Row> } | undefined)?.def;
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className={cx(canSort && "is-sortable", sorted && "is-sorted")}
                        aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : canSort ? "none" : undefined}
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            type="button"
                            className="si-dt-sort-btn"
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={handleHeaderKey(header.column.id)}
                          >
                            <SortButton label={def?.header ?? String(header.column.columnDef.header)} sorted={sorted} />
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="si-dt-body">
              {isEmpty ? (
                <tr>
                  <td colSpan={table.getVisibleLeafColumns().length} className="si-dt-empty-cell">
                    <div className="si-dt-empty">
                      <span className="si-dt-empty-mark" aria-hidden>
                        00
                      </span>
                      <p className="si-dt-empty-title">{empty.title ?? "No participants yet"}</p>
                      <p className="si-dt-empty-msg">{empty.message}</p>
                      {empty.actionLabel ? (
                        <button type="button" className="si-dt-empty-action" onClick={empty.onAction}>
                          {empty.actionLabel}
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => {
                  const schoolColor = (row.original as ParticipantFields).schoolColor;
                  const rowStyle: CSSProperties | undefined =
                    showSchoolRail && schoolColor ? { boxShadow: `inset 3px 0 0 ${schoolColor}` } : undefined;
                  return (
                    <tr
                      key={row.id}
                      className={cx(row.getIsSelected() && "is-selected", showSchoolRail && schoolColor && "has-rail")}
                      style={rowStyle}
                      data-state={row.getIsSelected() ? "selected" : undefined}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const def = (cell.column.columnDef.meta as { def?: DataTableColumnDef<Row> } | undefined)?.def;
                        return (
                          <td key={cell.id} className={cx(def?.tabular && "is-tabular", def?.id === "participant" && "is-primary")}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <ul className="si-dt-mobile" aria-label={caption ?? "Participant roster"}>
          {isEmpty ? (
            <li className="si-dt-mobile-card is-empty">
              <p>{empty.message}</p>
            </li>
          ) : (
            table.getRowModel().rows.map((row) => {
              const p = row.original as Row & ParticipantFields;
              const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
              const ringStyle: CSSProperties | undefined = p.schoolColor ? { outline: `3px solid ${p.schoolColor}` } : undefined;
              const railStyle: CSSProperties | undefined = p.schoolColor
                ? { borderLeft: `3px solid ${p.schoolColor}` }
                : undefined;
              const grade = columnDefs.find((c) => c.id === "grade");
              const jersey = columnDefs.find((c) => c.id === "jerseySize");
              const clinics = columnDefs.find((c) => c.id === "clinics");
              const status = columnDefs.find((c) => c.id === "status");
              return (
                <li key={row.id} className={cx("si-dt-mobile-card", p.schoolColor && "has-rail")} style={railStyle}>
                  <div className="si-dt-mobile-main">
                    <span className={cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring")} style={ringStyle} aria-hidden>
                      {initials(p.firstName, p.lastName)}
                    </span>
                    <div>
                      <p className="si-dt-mobile-name">{name}</p>
                      <p className="si-dt-mobile-sub">{p.school}</p>
                    </div>
                  </div>
                  <div className="si-dt-mobile-pills">
                    {grade && table.getColumn("grade")?.getIsVisible()
                      ? renderBuiltinCell(grade, row.original, row.original[grade.accessorKey as keyof Row])
                      : null}
                    {jersey && table.getColumn("jerseySize")?.getIsVisible()
                      ? renderBuiltinCell(jersey, row.original, row.original[jersey.accessorKey as keyof Row])
                      : null}
                    {clinics && table.getColumn("clinics")?.getIsVisible()
                      ? renderBuiltinCell(clinics, row.original, row.original[clinics.accessorKey as keyof Row])
                      : null}
                    {status && table.getColumn("status")?.getIsVisible()
                      ? renderBuiltinCell(status, row.original, row.original[status.accessorKey as keyof Row])
                      : null}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
