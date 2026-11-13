import type { DataTableColumnDef } from "./DataTable.js";

/** Demo and default roster row for participant tables across 127SI platforms. */
export type ParticipantRow = {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
  /** School brand colour for avatar ring and optional row rail (app-supplied hex). */
  schoolColor?: string;
  grade: string;
  jerseySize: string;
  clinicsAttended: number;
  email?: string;
  cell?: string;
  status?: string;
  avatarUrl?: string;
};

export const DATA_TABLE_VISIBILITY_PUBLIC: Record<string, boolean> = {
  participant: true,
  school: true,
  grade: true,
  jerseySize: true,
  clinics: true,
  email: false,
  cell: false,
  status: false,
};

export const DATA_TABLE_VISIBILITY_STAFF: Record<string, boolean> = {
  ...DATA_TABLE_VISIBILITY_PUBLIC,
  email: true,
  cell: true,
  status: true,
};

/** Registered-participant columns for parent-facing rosters. */
export function participantColumnsPublic(): Array<DataTableColumnDef<ParticipantRow>> {
  return [
    {
      id: "participant",
      header: "Participant",
      cellKind: "participant",
      enableSorting: true,
      enableHiding: false,
      accessorFn: (row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { id: "school", header: "School", accessorKey: "school", enableSorting: true },
    { id: "grade", header: "Grade", accessorKey: "grade", cellKind: "grade", enableSorting: true },
    { id: "jerseySize", header: "Jersey size", accessorKey: "jerseySize", cellKind: "jersey", enableSorting: true },
    { id: "clinics", header: "Jr ref clinics", accessorKey: "clinicsAttended", cellKind: "clinics", enableSorting: true, tabular: true },
  ];
}

/** Staff roster preset adds contact and status columns. */
export function participantColumnsStaff(): Array<DataTableColumnDef<ParticipantRow>> {
  return [
    ...participantColumnsPublic(),
    { id: "email", header: "Email", accessorKey: "email", enableSorting: true },
    { id: "cell", header: "Cell", accessorKey: "cell", enableSorting: true, tabular: true },
    { id: "status", header: "Status", accessorKey: "status", cellKind: "status", enableSorting: true },
  ];
}

/** Catalogue and tests use a varied demo roster. */
export const PARTICIPANT_DEMO_ROWS: ParticipantRow[] = [
  {
    id: "1",
    firstName: "Ava",
    lastName: "Jensen",
    school: "Fairfield",
    schoolColor: "#0034B7",
    grade: "7th",
    jerseySize: "YM",
    clinicsAttended: 4,
    email: "ava.j@example.org",
    cell: "406.555.0101",
    status: "active",
  },
  {
    id: "2",
    firstName: "Noah",
    lastName: "Lund",
    school: "Choteau",
    schoolColor: "#B91C1C",
    grade: "8th",
    jerseySize: "YL",
    clinicsAttended: 2,
    email: "noah.l@example.org",
    cell: "406.555.0102",
    status: "pending",
  },
  {
    id: "3",
    firstName: "Mia",
    lastName: "Ortiz",
    school: "Power",
    schoolColor: "#15803D",
    grade: "6th",
    jerseySize: "YS",
    clinicsAttended: 0,
    email: "mia.o@example.org",
    cell: "406.555.0103",
    status: "withdrawn",
  },
  {
    id: "4",
    firstName: "Eli",
    lastName: "Nguyen",
    school: "Fairfield",
    schoolColor: "#0034B7",
    grade: "9th",
    jerseySize: "AS",
    clinicsAttended: 1,
    email: "eli.n@example.org",
    cell: "406.555.0104",
    status: "active",
  },
  {
    id: "5",
    firstName: "Sofia",
    lastName: "Reed",
    school: "Belt",
    schoolColor: "#7C3AED",
    grade: "10th",
    jerseySize: "AM",
    clinicsAttended: 3,
    email: "sofia.r@example.org",
    cell: "406.555.0105",
    status: "active",
  },
];
