// Type-level check of the public API, resolved through the package's own exports map (dist/).
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminNotice,
  AdminPager,
  AdminToolbar,
  Footer,
  HeroCarousel,
  TopNav,
  AdminPageHeader,
  AdminShell,
  AdminStatusBadge,
  AdminTable,
  DataTable,
  participantColumnsPublic,
  PARTICIPANT_DEMO_ROWS,
  adminTheme,
  platformLabel,
  siTheme,
  type AdminPlatform,
  type SiPlatform,
} from "@127si/design-system";

const platform: SiPlatform = "challenge";
const legacyPlatform: AdminPlatform = platform;
const label: "127SI CHALLENGE ADMIN" = platformLabel(platform);
const blue: "#0034B7" = siTheme.colors.blue;
const legacyBlue: "#0034B7" = adminTheme.colors.blue;

// @ts-expect-error unknown platforms are rejected
platformLabel("unknown");

type Row = { name: string };

export const publicPage = (
  <>
    <TopNav logoSrc="/logo.png" badge="Challenges" links={[{ href: "/a", label: "A", children: [{ href: "/b", label: "B" }] }]} action={{ href: "/login", label: "Login" }} />
    <HeroCarousel slides={[{ id: "a", src: "/a.webp", alt: "A" }]} headline={<>Title</>} wash={false} />
    <Footer logoSrc="/white.png" year={2026} contact={{ name: "Name" }} columns={[{ title: "Info", accent: "gray", links: [{ href: "/a", label: "A" }] }]} />
  </>
);

export const page = (
  <AdminShell platform={legacyPlatform} navigation={[{ href: "/admin", label }]} activeHref="/admin">
    <AdminPageHeader title="Records" actions={<AdminButton variant="secondary">New</AdminButton>} />
    <AdminButton as="a" href="/admin/new" variant="accent">
      Link styled as a button
    </AdminButton>
    <AdminNotice tone="warning" title="Check">Body</AdminNotice>
    <AdminToolbar label="Filters" actions={<AdminButton variant="ghost">Export</AdminButton>}>
      <AdminField htmlFor="q" label="Search">
        <input id="q" className="si-admin-input" />
      </AdminField>
    </AdminToolbar>
    <AdminPager page={1} pageCount={3} hrefFor={(p) => `/admin?page=${p}`} />
    <AdminCard title={blue + legacyBlue}>
      <AdminStatusBadge status="published" />
    </AdminCard>
    <AdminTable<Row> columns={[{ key: "name", label: "Name" }]} rows={[{ name: "Row" }]} rowKey={(row) => row.name} />
    <DataTable
      columns={participantColumnsPublic()}
      rows={PARTICIPANT_DEMO_ROWS}
      columnVisibilityPreset="public"
      caption="Roster"
      rowKey={(row) => row.id}
      showSchoolRail
    />
  </AdminShell>
);
