import { jsx as _jsx } from "react/jsx-runtime";
import { clinicTierKind } from "./clinic-tier.js";
import { DataTable } from "./DataTable.js";
import { DataTableBanner } from "./DataTableBanner.js";
import { schoolAccentColor } from "./school-accent.js";
export const YOUTH_PARTICIPANT_SAMPLE_ROWS = [
    {
        id: "demo-1",
        firstName: "Preview",
        lastName: "Pat Example",
        school: "Fairfield",
        grade: "7th",
        jerseySize: "YM",
        clinicsAttended: 4,
        email: "hidden@example.org",
        cell: "406-555-0101",
    },
    {
        id: "demo-2",
        firstName: "Sample",
        lastName: "Casey Demo",
        school: "Choteau",
        grade: "8th",
        jerseySize: "YL",
        clinicsAttended: 2,
    },
    {
        id: "demo-3",
        firstName: "Placeholder",
        lastName: "Jordan Test",
        school: "Power",
        grade: "6th",
        jerseySize: null,
        clinicsAttended: null,
        publicDirectoryOptOut: true,
    },
    {
        id: "demo-4",
        firstName: "Mock",
        lastName: "Riley Sample",
        school: "Fairfield",
        grade: "9th",
        jerseySize: "AM",
        clinicsAttended: 1,
    },
    {
        id: "demo-5",
        firstName: "Fake",
        lastName: "Avery Preview",
        school: "Belt",
        grade: "10th",
        jerseySize: "AL",
        clinicsAttended: 3,
    },
];
export function youthParticipantColumns() {
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
        {
            id: "clinics",
            header: "Jr ref clinics attended",
            accessorKey: "clinicsAttended",
            cellKind: "clinics",
            enableSorting: true,
            tabular: true,
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
            sensitiveKind: "email",
            enableHiding: true,
        },
        {
            id: "cell",
            header: "Cell",
            accessorKey: "cell",
            sensitiveKind: "cell",
            enableHiding: true,
        },
    ];
}
function youthDirectoryStats(rows) {
    const schools = new Set();
    let veterans = 0;
    for (const row of rows) {
        if (row.publicDirectoryOptOut)
            continue;
        if (row.school && row.school !== "-")
            schools.add(row.school);
        if (clinicTierKind(row.clinicsAttended) === "veteran")
            veterans += 1;
    }
    const visible = rows.filter((row) => row.publicDirectoryOptOut !== true);
    return { total: visible.length, schools: schools.size, veterans };
}
export function YouthParticipantDataTableExample() {
    const enriched = YOUTH_PARTICIPANT_SAMPLE_ROWS.map((row) => ({
        ...row,
        schoolColor: row.schoolColor ?? schoolAccentColor(row.school),
    }));
    const stats = youthDirectoryStats(enriched);
    return (_jsx(DataTableBanner, { eyebrow: "Fairfield Basketball Club", title: "Youth Participants", lede: "Registered athletes in the junior referee program. Families may opt out of this public list during registration.", stats: [
            { id: "total", value: stats.total, label: "Participants" },
            { id: "schools", value: stats.schools, label: "Schools" },
            { id: "veterans", value: stats.veterans, label: "Veterans", emphasis: "gold" },
        ], children: _jsx(DataTable, { columns: youthParticipantColumns(), rows: enriched, audience: "public", variant: "premium", enableClinicsTierFilter: true, autoChipFilters: ["school", "grade"], showSchoolRail: false, caption: "Youth participant highlights", toolbarLabel: "Filter youth participants", emptyState: {
                title: "No registered participants yet",
                message: "Registered participants appear here by default. Families who opt out during registration are not listed.",
                actionLabel: "Find a clinic",
                actionHref: "#clinics",
            } }) }));
}
