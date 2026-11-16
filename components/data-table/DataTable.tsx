"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useMemo,
  useState,
} from "react";
import { cx } from "../_shared/cx.js";
import { clinicTierDisplay, clinicTierKind, type ClinicTierKind } from "./clinic-tier.js";
import {
  applyPublicColumnPolicy,
  DEFAULT_PUBLIC_OPT_OUT_FIELD,
  filterOptedOutRows,
  type DataTableAudience,
  type SensitiveColumnKind,
} from "./privacy.js";

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
  cell?: (ctx: { row: Row; value: unknown }) => ReactNode;
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

const DEFAULT_COUNT_LABEL: DataTableCountLabel = { one: "row", other: "rows" };

function formatCountSuffix(count: number, label: DataTableCountLabel): string {
  return count === 1 ? label.one : label.other;
}

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
};

type ParticipantFields = {
  firstName?: string;
  lastName?: string;
  school?: string;
  schoolColor?: string;
  avatarUrl?: string;
};

type SortState = { columnId: string; desc: boolean } | null;

function initials(first?: string, last?: string): string {
  const a = (first?.trim().charAt(0) || "").toUpperCase();
  const b = (last?.trim().charAt(0) || "").toUpperCase();
  return a + b || "?";
}

function isMissingValue(value: unknown): boolean {
  return value == null || value === "";
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function columnValue<Row extends Record<string, unknown>>(def: DataTableColumnDef<Row>, row: Row): unknown {
  if (def.accessorFn) return def.accessorFn(row);
  if (def.accessorKey) return row[def.accessorKey];
  return undefined;
}

function rowSearchText<Row extends Record<string, unknown>>(row: Row, columns: Array<DataTableColumnDef<Row>>): string {
  return columns
    .map((column) => {
      const value = columnValue(column, row);
      return value == null ? "" : String(value);
    })
    .join(" ")
    .toLowerCase();
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function renderBuiltinCell<Row extends Record<string, unknown>>(
  def: DataTableColumnDef<Row>,
  row: Row,
  value: unknown,
  showSchoolInParticipantCell: boolean,
): ReactNode {
  if (def.cell) return def.cell({ row, value });

  switch (def.cellKind) {
    case "participant": {
      const p = row as Row & ParticipantFields;
      const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
      const ringStyle: CSSProperties | undefined = p.schoolColor
        ? {
            borderColor: p.schoolColor,
            background: p.avatarUrl ? undefined : p.schoolColor,
            boxShadow: `0 0 0 2px var(--si-white, #fff), 0 0 0 4px ${p.schoolColor}`,
          }
        : undefined;
      return (
        <div className="si-dt-participant">
          {p.avatarUrl ? (
            <img className={cx("si-dt-avatar", p.schoolColor && "has-ring")} src={p.avatarUrl} alt="" style={ringStyle} />
          ) : (
            <span
              className={cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring")}
              style={ringStyle}
              aria-hidden
            >
              {initials(p.firstName, p.lastName)}
            </span>
          )}
          <span className="si-dt-participant-text">
            <span className="si-dt-participant-name">{name || String(value ?? "")}</span>
            {showSchoolInParticipantCell && p.school ? <span className="si-dt-participant-sub">{p.school}</span> : null}
          </span>
        </div>
      );
    }
    case "grade":
      return <span className="si-dt-pill is-grade">{String(value ?? "")}</span>;
    case "jersey":
      if (isMissingValue(value)) return <span className="si-dt-tabular">-</span>;
      return <span className="si-dt-pill is-jersey">{String(value)}</span>;
    case "clinics": {
      const tier = clinicTierDisplay(typeof value === "number" ? value : null);
      return <span className={cx("si-dt-pill", "is-clinics", `tier-${tier.kind}`)}>{tier.label}</span>;
    }
    case "badge":
      return (
        <span className="si-dt-pill is-badge">
          {def.badgeLabel ? def.badgeLabel(value, row) : value == null ? "" : String(value)}
        </span>
      );
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

function builtInChipFilters<Row extends Record<string, unknown>>(
  auto: Array<"school" | "grade"> | undefined,
): Array<DataTableChipFilter<Row>> {
  const filters: Array<DataTableChipFilter<Row>> = [];
  if (auto?.includes("school")) {
    filters.push({
      id: "school",
      ariaLabel: "School filter",
      allLabel: "All schools",
      getValue: (row) => {
        const school = (row as ParticipantFields).school;
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
        const grade = (row as { grade?: string }).grade;
        return grade?.trim() || undefined;
      },
    });
  }
  return filters;
}

export function DataTable<Row extends Record<string, unknown> = Record<string, unknown>>({
  columns: columnDefs,
  rows,
  audience = "public",
  optOutField = DEFAULT_PUBLIC_OPT_OUT_FIELD as keyof Row & string,
  loading = false,
  enableExport = false,
  exportFileName = "participants.csv",
  emptyState,
  theme = "light",
  variant = "premium",
  density = "comfortable",
  caption,
  rowKey,
  className,
  showSchoolRail = true,
  toolbarLabel = "Table filters",
  showToolbar = true,
  showSearch = true,
  showSchoolInParticipantCell = false,
  enableClinicsTierFilter = false,
  clinicsTierField = "clinicsAttended" as keyof Row & string,
  chipFilters,
  autoChipFilters,
  countLabel = DEFAULT_COUNT_LABEL,
}: DataTableProps<Row>) {
  const baseId = useId();
  const visibleColumns = useMemo(() => applyPublicColumnPolicy(columnDefs, audience), [columnDefs, audience]);
  const visibleRows = useMemo(
    () => filterOptedOutRows(rows, audience, optOutField),
    [rows, audience, optOutField],
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [densityState, setDensityState] = useState<DataTableDensity>(density);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState<Record<string, boolean>>({});
  const [sort, setSort] = useState<SortState>(null);
  const [chipFilterValues, setChipFilterValues] = useState<Record<string, string>>({});
  const [tierFilter, setTierFilter] = useState<ClinicTierKind | "all">("all");

  const activeChipFilters = useMemo(
    () => [...builtInChipFilters<Row>(autoChipFilters), ...(chipFilters ?? [])],
    [autoChipFilters, chipFilters],
  );

  const chipOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const filter of activeChipFilters) {
      const values = new Set<string>();
      for (const row of visibleRows) {
        const value = filter.getValue(row);
        if (value) values.add(value);
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
        if (selected !== "all" && filter.getValue(row) !== selected) return false;
      }
      if (enableClinicsTierFilter && tierFilter !== "all") {
        const raw = row[clinicsTierField];
        const clinics = typeof raw === "number" ? raw : null;
        if (clinicTierKind(clinics) !== tierFilter) return false;
      }
      if (query && !rowSearchText(row, visibleColumns).includes(query)) return false;
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
    if (!sort) return filteredRows;
    const column = visibleColumns.find((entry) => entry.id === sort.columnId);
    if (!column) return filteredRows;
    const copy = [...filteredRows];
    copy.sort((left, right) => {
      const result = compareValues(columnValue(column, left), columnValue(column, right));
      return sort.desc ? -result : result;
    });
    return copy;
  }, [filteredRows, sort, visibleColumns]);

  const displayedColumns = useMemo(
    () => visibleColumns.filter((column) => hiddenColumns[column.id] !== true),
    [hiddenColumns, visibleColumns],
  );

  const visibleCount = sortedRows.length;
  const totalCount = filteredRows.length;
  const isEmpty = !loading && visibleCount === 0;

  const toggleSort = (column: DataTableColumnDef<Row>) => {
    if (column.enableSorting === false) return;
    setSort((current) => {
      if (!current || current.columnId !== column.id) return { columnId: column.id, desc: false };
      if (!current.desc) return { columnId: column.id, desc: true };
      return null;
    });
  };

  const sortDirection = (columnId: string): false | "asc" | "desc" => {
    if (!sort || sort.columnId !== columnId) return false;
    return sort.desc ? "desc" : "asc";
  };

  const handleHeaderKey = (column: DataTableColumnDef<Row>) => (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSort(column);
    }
  };

  const handleExport = () => {
    const exportColumns = displayedColumns;
    const header = exportColumns.map((column) => escapeCsv(column.header)).join(",");
    const body = sortedRows.map((row) =>
      exportColumns
        .map((column) => escapeCsv(String(columnValue(column, row) ?? "")))
        .join(","),
    );
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
  const resolveRowKey = (row: Row, index: number) => (rowKey ? rowKey(row) : String((row as { id?: string }).id ?? index));

  const tableViewControls = (
    <div className="si-dt-table-controls">
      <div className="si-dt-density" role="group" aria-label="Row density">
        <button
          type="button"
          className={cx("si-dt-density-btn", densityState === "comfortable" && "is-active")}
          onClick={() => setDensityState("comfortable")}
          aria-pressed={densityState === "comfortable"}
          disabled={loading}
        >
          Comfortable
        </button>
        <button
          type="button"
          className={cx("si-dt-density-btn", densityState === "compact" && "is-active")}
          onClick={() => setDensityState("compact")}
          aria-pressed={densityState === "compact"}
          disabled={loading}
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
          disabled={loading}
        >
          Columns
        </button>
        {columnsOpen ? (
          <div className="si-dt-columns-panel" id={`${baseId}-columns`} role="group" aria-label="Column visibility">
            {visibleColumns
              .filter((column) => column.enableHiding !== false)
              .map((column) => (
                <label key={column.id} className="si-dt-columns-item">
                  <input
                    type="checkbox"
                    checked={hiddenColumns[column.id] !== true}
                    onChange={() =>
                      setHiddenColumns((state) => ({
                        ...state,
                        [column.id]: state[column.id] === true ? false : true,
                      }))
                    }
                  />
                  <span>{column.header}</span>
                </label>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      className={cx(
        "si-data-table",
        theme === "dark" && "is-dark",
        variant === "premium" && "is-premium",
        loading && "is-loading",
        className,
      )}
      data-si-dt-density={densityState}
    >
      {showToolbar ? (
        <div
          className={cx(
            "si-dt-toolbar",
            variant === "premium" && "si-dt-toolbar--card",
            !showSearch && "si-dt-toolbar--no-search",
          )}
          role="group"
          aria-label={toolbarLabel}
        >
          <div className={cx("si-dt-toolbar-start", !showSearch && "si-dt-toolbar-start--no-search")}>
            {showSearch ? (
              <label className="si-dt-search">
                <span className="si-dt-visually-hidden">Search table</span>
                <input
                  type="search"
                  className="si-dt-search-input"
                  value={globalFilter}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  placeholder="Search participants"
                  aria-controls={`${baseId}-table`}
                  disabled={loading}
                />
              </label>
            ) : null}
            {activeChipFilters.map((filter) => {
              const options = chipOptions[filter.id] ?? [];
              if (options.length <= 1) return null;
              const selected = chipFilterValues[filter.id] ?? "all";
              return (
                <div key={filter.id} className="si-dt-chips" role="group" aria-label={filter.ariaLabel}>
                  <button
                    type="button"
                    className={cx("si-dt-chip", selected === "all" && "is-active")}
                    onClick={() => setChipFilterValues((state) => ({ ...state, [filter.id]: "all" }))}
                    aria-pressed={selected === "all"}
                    disabled={loading}
                  >
                    {filter.allLabel}
                  </button>
                  {options.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={cx("si-dt-chip", selected === value && "is-active")}
                      onClick={() => setChipFilterValues((state) => ({ ...state, [filter.id]: value }))}
                      aria-pressed={selected === value}
                      disabled={loading}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              );
            })}
            {enableClinicsTierFilter ? (
              <div className="si-dt-chips" role="group" aria-label="Clinic tier filter">
                {(
                  [
                    ["all", "All tiers"],
                    ["first", "First clinic"],
                    ["returning", "Returning"],
                    ["veteran", "Veterans"],
                  ] as const
                ).map(([tier, label]) => (
                  <button
                    key={tier}
                    type="button"
                    className={cx("si-dt-chip", tierFilter === tier && "is-active")}
                    onClick={() => setTierFilter(tier)}
                    aria-pressed={tierFilter === tier}
                    disabled={loading}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="si-dt-toolbar-end">
            <span className="si-dt-count" aria-live="polite">
              {loading ? (
                "Loading…"
              ) : (
                <>
                  <span className="si-dt-count-strong">{visibleCount}</span>
                  {globalFilter
                    ? ` of ${totalCount} shown`
                    : ` ${formatCountSuffix(visibleCount, countLabel)}`}
                </>
              )}
            </span>
            {enableExport ? (
              <button type="button" className="si-dt-export" onClick={handleExport} disabled={loading}>
                Export CSV
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={cx("si-dt-card", variant === "premium" && "si-dt-card--premium")}>
        <div className="si-dt-scroll">
          <div className={cx("si-dt-caption-bar", !caption && "si-dt-caption-bar--solo")}>
            {caption ? (
              <p className="si-dt-caption-text" id={`${baseId}-caption`}>
                {caption}
              </p>
            ) : null}
            {tableViewControls}
          </div>
          <table className="si-dt-table" id={`${baseId}-table`} aria-labelledby={caption ? `${baseId}-caption` : undefined}>
            <thead className="si-dt-head">
              <tr>
                {displayedColumns.map((column) => {
                  const sorted = sortDirection(column.id);
                  const canSort = column.enableSorting !== false;
                  return (
                    <th
                      key={column.id}
                      scope="col"
                      className={cx(canSort && "is-sortable", sorted && "is-sorted")}
                      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : canSort ? "none" : undefined}
                    >
                      {canSort ? (
                        <button
                          type="button"
                          className="si-dt-sort-btn"
                          onClick={() => toggleSort(column)}
                          onKeyDown={handleHeaderKey(column)}
                        >
                          <SortButton label={column.header} sorted={sorted} />
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="si-dt-body">
              {loading ? (
                <tr>
                  <td colSpan={displayedColumns.length || 1} className="si-dt-loading-cell">
                    <div className="si-dt-loading" role="status">
                      <span className="si-dt-loading-mark" aria-hidden />
                      Loading participants…
                    </div>
                  </td>
                </tr>
              ) : isEmpty ? (
                <tr>
                  <td colSpan={displayedColumns.length || 1} className="si-dt-empty-cell">
                    <div className="si-dt-empty">
                      <span className="si-dt-empty-mark" aria-hidden>
                        00
                      </span>
                      <p className="si-dt-empty-title">{empty.title ?? "Nothing to show yet"}</p>
                      <p className="si-dt-empty-msg">{empty.message}</p>
                      {empty.actionLabel && empty.actionHref ? (
                        <a className="si-dt-empty-action" href={empty.actionHref}>
                          {empty.actionLabel}
                        </a>
                      ) : empty.actionLabel ? (
                        <button type="button" className="si-dt-empty-action" onClick={empty.onAction}>
                          {empty.actionLabel}
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ) : (
                sortedRows.map((row, index) => (
                  <tr
                    key={resolveRowKey(row, index)}
                    className={cx(showSchoolRail && (row as ParticipantFields).schoolColor && "has-rail")}
                  >
                    {displayedColumns.map((column) => (
                      <td
                        key={column.id}
                        className={cx(column.tabular && "is-tabular", column.id === "participant" && "is-primary")}
                      >
                        {renderBuiltinCell(column, row, columnValue(column, row), showSchoolInParticipantCell)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ul className="si-dt-mobile" aria-label={caption ?? "Participant roster"}>
          {loading ? (
            <li className="si-dt-mobile-card is-loading" role="status">
              Loading participants…
            </li>
          ) : isEmpty ? (
            <li className="si-dt-mobile-card is-empty">
              <p>{empty.message}</p>
              {empty.actionLabel && empty.actionHref ? (
                <a className="si-dt-empty-action" href={empty.actionHref}>
                  {empty.actionLabel}
                </a>
              ) : null}
            </li>
          ) : (
            sortedRows.map((row, index) => {
              const p = row as Row & ParticipantFields;
              const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
              const ringStyle: CSSProperties | undefined = p.schoolColor
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
              return (
                <li
                  key={resolveRowKey(row, index)}
                  className={cx("si-dt-mobile-card", showSchoolRail && p.schoolColor && "has-rail")}
                >
                  <div className="si-dt-mobile-main">
                    <span
                      className={cx("si-dt-avatar", "is-initials", p.schoolColor && "has-ring")}
                      style={ringStyle}
                      aria-hidden
                    >
                      {initials(p.firstName, p.lastName)}
                    </span>
                    <div>
                      <p className="si-dt-mobile-name">{name}</p>
                      {schoolCol ? <p className="si-dt-mobile-sub">{p.school}</p> : null}
                    </div>
                  </div>
                  <div className="si-dt-mobile-pills">
                    {grade
                      ? renderBuiltinCell(
                          grade,
                          row,
                          grade.accessorKey ? row[grade.accessorKey] : columnValue(grade, row),
                          showSchoolInParticipantCell,
                        )
                      : null}
                    {jersey
                      ? renderBuiltinCell(
                          jersey,
                          row,
                          jersey.accessorKey ? row[jersey.accessorKey] : columnValue(jersey, row),
                          showSchoolInParticipantCell,
                        )
                      : null}
                    {clinics
                      ? renderBuiltinCell(
                          clinics,
                          row,
                          clinics.accessorKey ? row[clinics.accessorKey] : columnValue(clinics, row),
                          showSchoolInParticipantCell,
                        )
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