import {
  AdminButton,
  AdminCard,
  AdminPageHeader,
  AdminShell,
  AdminStatusBadge,
  AdminTable,
  adminTheme,
  platformLabel,
  type AdminPlatform,
} from "@127si/admin-design-system";

const platform: AdminPlatform = "challenge";
const label: "127SI CHALLENGE ADMIN" = platformLabel(platform);
const navy: "#102A43" = adminTheme.colors.navy;

// @ts-expect-error unknown platforms are rejected
platformLabel("unknown");

export const page = (
  <AdminShell platform={platform} navigation={[{ href: "/admin", label }]} activeHref="/admin">
    <AdminPageHeader title="Records" actions={<AdminButton variant="secondary">New</AdminButton>} />
    <AdminCard title={navy}>
      <AdminStatusBadge status="published" />
    </AdminCard>
    <AdminTable columns={[{ key: "name", label: "Name" }]} rows={[{ name: "Row" }]} rowKey={(row) => row.name} />
  </AdminShell>
);
