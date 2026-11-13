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
export declare const DATA_TABLE_VISIBILITY_PUBLIC: Record<string, boolean>;
export declare const DATA_TABLE_VISIBILITY_STAFF: Record<string, boolean>;
/** Registered-participant columns for parent-facing rosters. */
export declare function participantColumnsPublic(): Array<DataTableColumnDef<ParticipantRow>>;
/** Staff roster preset adds contact and status columns. */
export declare function participantColumnsStaff(): Array<DataTableColumnDef<ParticipantRow>>;
/** Catalogue and tests use a varied demo roster. */
export declare const PARTICIPANT_DEMO_ROWS: ParticipantRow[];
