import { type DataTableColumnDef } from "./DataTable.js";
export type YouthParticipantRow = {
    id: string;
    firstName: string;
    lastName: string;
    school: string;
    schoolColor?: string;
    grade: string;
    jerseySize: string | null;
    clinicsAttended: number | null;
    avatarUrl?: string;
    email?: string;
    cell?: string;
    publicDirectoryOptOut?: boolean;
};
export declare const YOUTH_PARTICIPANT_SAMPLE_ROWS: YouthParticipantRow[];
export declare function youthParticipantColumns(): Array<DataTableColumnDef<YouthParticipantRow>>;
export declare function YouthParticipantDataTableExample(): import("react").JSX.Element;
