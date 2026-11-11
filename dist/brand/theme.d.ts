/** TypeScript mirror of brand/tokens.css for code that cannot read CSS (emails, PDFs, charts). */
export declare const siTheme: {
    readonly colors: {
        readonly blue: "#0034B7";
        readonly blueHover: "#002A94";
        readonly blueDeep: "#001F6B";
        readonly blueLight: "#E8F0FF";
        readonly orange: "#FF8B00";
        readonly orangeHover: "#D97700";
        readonly orangeLight: "#FFF1DC";
        readonly orangeText: "#B45309";
        readonly black: "#262626";
        readonly gray: "#C4C4C4";
        readonly grayLight: "#F2F2F2";
        readonly white: "#FFFFFF";
        readonly teal: "#0F766E";
        readonly tealLight: "#E6FFFA";
        readonly gold: "#F5B301";
        readonly goldLight: "#FFF7D6";
        readonly success: "#15803D";
        readonly warning: "#D97706";
        readonly danger: "#DC2626";
        readonly muted: "#64748B";
        readonly slate: "#475569";
        readonly line: "#E2E6EE";
    };
    readonly themes: {
        readonly tst: {
            readonly black: "#121417";
            readonly amber: "#FFB000";
            readonly amberText: "#8A5A00";
            readonly red: "#D62839";
            readonly chalk: "#F5F5F2";
        };
    };
    readonly fonts: {
        readonly display: "Saira";
        readonly body: "Maven Pro";
        readonly data: "Source Sans 3";
        readonly email: "Arial, Helvetica, sans-serif";
    };
    readonly labels: {
        readonly challenge: "127SI CHALLENGE ADMIN";
        readonly referee: "127SI REFEREE ADMIN";
        readonly curriculum: "127SI CURRICULUM ADMIN";
        readonly communication: "127SI COMMUNICATION ADMIN";
        readonly content: "127SI CONTENT ADMIN";
        readonly "shared-data": "127SI SHARED DATA ADMIN";
        readonly tst: "127SI TEAM SHOT TRACKER ADMIN";
        readonly bracket: "127SI BRACKET ADMIN";
    };
};
export type SiPlatform = keyof typeof siTheme.labels;
export type SiThemeName = "default" | "tst";
/** Admin workspace label for a platform, for example "127SI CHALLENGE ADMIN". */
export declare function platformLabel<P extends SiPlatform>(platform: P): (typeof siTheme.labels)[P];
/**
 * @deprecated Pre-v1 name. Same labels; colours now carry Brand System v4 values under the old keys.
 * Use `siTheme`. Removed in v2.0.0.
 */
export declare const adminTheme: {
    readonly colors: {
        readonly navy: "#001F6B";
        readonly blue: "#0034B7";
        readonly orange: "#FF8B00";
        readonly ink: "#262626";
        readonly muted: "#475569";
        readonly wash: "#F2F2F2";
        readonly line: "#E2E6EE";
    };
    readonly labels: {
        readonly challenge: "127SI CHALLENGE ADMIN";
        readonly referee: "127SI REFEREE ADMIN";
        readonly curriculum: "127SI CURRICULUM ADMIN";
        readonly communication: "127SI COMMUNICATION ADMIN";
        readonly content: "127SI CONTENT ADMIN";
        readonly "shared-data": "127SI SHARED DATA ADMIN";
        readonly tst: "127SI TEAM SHOT TRACKER ADMIN";
        readonly bracket: "127SI BRACKET ADMIN";
    };
};
/** @deprecated Use `SiPlatform`. */
export type AdminPlatform = SiPlatform;
