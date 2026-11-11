// Type-level check of the public API, resolved through the package's own exports map (dist/).
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminNotice,
  AdminPager,
  AdminToolbar,
  AdminPageHeader,
  AdminShell,
  AdminStatusBadge,
  AdminTable,
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
  </AdminShell>
);
