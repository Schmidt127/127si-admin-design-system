export const adminTheme = {
  colors: {
    navy: "#102A43",
    blue: "#1F4E79",
    orange: "#E8752A",
    ink: "#243B53",
    muted: "#627D98",
    wash: "#F6F8FB",
    line: "#D9E2EC",
  },
  labels: {
    content: "127SI CONTENT ADMIN",
    curriculum: "127SI CURRICULUM ADMIN",
    challenge: "127SI CHALLENGE ADMIN",
    referee: "127SI REFEREE ADMIN",
  },
} as const;

export type AdminPlatform = keyof typeof adminTheme.labels;

export function platformLabel(platform: AdminPlatform) {
  return adminTheme.labels[platform];
}
