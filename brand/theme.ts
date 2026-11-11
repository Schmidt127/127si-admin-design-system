/** TypeScript mirror of brand/tokens.css for code that cannot read CSS (emails, PDFs, charts). */
export const siTheme = {
  colors: {
    blue: "#0034B7",
    blueHover: "#002A94",
    blueDeep: "#001F6B",
    blueLight: "#E8F0FF",
    orange: "#FF8B00",
    orangeHover: "#D97700",
    orangeLight: "#FFF1DC",
    orangeText: "#B45309",
    black: "#262626",
    gray: "#C4C4C4",
    grayLight: "#F2F2F2",
    white: "#FFFFFF",
    teal: "#0F766E",
    tealLight: "#E6FFFA",
    gold: "#F5B301",
    goldLight: "#FFF7D6",
    success: "#15803D",
    warning: "#D97706",
    danger: "#DC2626",
    muted: "#64748B",
    slate: "#475569",
    line: "#E2E6EE",
  },
  themes: {
    tst: {
      black: "#121417",
      amber: "#FFB000",
      amberText: "#8A5A00",
      red: "#D62839",
      chalk: "#F5F5F2",
    },
  },
  fonts: {
    display: "Saira",
    body: "Maven Pro",
    data: "Source Sans 3",
    email: "Arial, Helvetica, sans-serif",
  },
  labels: {
    challenge: "127SI CHALLENGE ADMIN",
    referee: "127SI REFEREE ADMIN",
    curriculum: "127SI CURRICULUM ADMIN",
    communication: "127SI COMMUNICATION ADMIN",
    content: "127SI CONTENT ADMIN",
    "shared-data": "127SI SHARED DATA ADMIN",
    tst: "127SI TEAM SHOT TRACKER ADMIN",
    bracket: "127SI BRACKET ADMIN",
  },
} as const;

export type SiPlatform = keyof typeof siTheme.labels;
export type SiThemeName = "default" | "tst";

/** Admin workspace label for a platform, for example "127SI CHALLENGE ADMIN". */
export function platformLabel<P extends SiPlatform>(platform: P): (typeof siTheme.labels)[P] {
  return siTheme.labels[platform];
}

/**
 * @deprecated Pre-v1 name. Same labels; colours now carry Brand System v4 values under the old keys.
 * Use `siTheme`. Removed in v2.0.0.
 */
export const adminTheme = {
  colors: {
    navy: siTheme.colors.blueDeep,
    blue: siTheme.colors.blue,
    orange: siTheme.colors.orange,
    ink: siTheme.colors.black,
    muted: siTheme.colors.slate,
    wash: siTheme.colors.grayLight,
    line: siTheme.colors.line,
  },
  labels: siTheme.labels,
} as const;

/** @deprecated Use `SiPlatform`. */
export type AdminPlatform = SiPlatform;
