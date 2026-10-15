export declare const adminTheme: {
  readonly colors: {
    readonly navy: "#102A43";
    readonly blue: "#1F4E79";
    readonly orange: "#E8752A";
    readonly ink: "#243B53";
    readonly muted: "#627D98";
    readonly wash: "#F6F8FB";
    readonly line: "#D9E2EC";
  };
  readonly labels: {
    readonly content: "127SI CONTENT ADMIN";
    readonly curriculum: "127SI CURRICULUM ADMIN";
    readonly challenge: "127SI CHALLENGE ADMIN";
    readonly referee: "127SI REFEREE ADMIN";
  };
};

export type AdminPlatform = keyof typeof adminTheme.labels;

export declare function platformLabel<P extends AdminPlatform>(platform: P): (typeof adminTheme.labels)[P];

export {
  AdminShell,
  AdminHeader,
  AdminSidebar,
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminStatusBadge,
  AdminTable,
} from "./components.js";
