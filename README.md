# 127SI Admin Design System

Shared visual foundation for every 127SI administrative platform.

## Platforms

- Content Platform
- Curriculum Platform
- Challenge Platform
- Referee Platform

## Design direction

The admin experience is intentionally quieter than the public websites: navy workspace navigation, white work surfaces, royal-blue utility color, and orange reserved for primary actions. Every platform keeps the same structure while identifying itself with a prominent platform label.

## Usage

Import the tokens into an admin app:

```css
@import "@127si/admin-design-system/tokens.css";
```

Use the shared label configuration:

```ts
import { platformLabel } from "@127si/admin-design-system";

platformLabel("content");
```

Import the browser-compatible React components and the tokens stylesheet:

```tsx
import "@127si/admin-design-system/tokens.css";
import {
  AdminShell, AdminPageHeader, AdminCard, AdminButton,
  AdminStatusBadge, AdminTable,
} from "@127si/admin-design-system";

<AdminShell platform="content" navigation={[{ label: "Overview", href: "/admin" }]}>
  <AdminPageHeader title="Content" actions={<AdminButton>New record</AdminButton>} />
  <AdminCard title="Recent records"><AdminStatusBadge status="published" /></AdminCard>
</AdminShell>
```

The components use plain React and HTML props only. They do not import Next.js, a router, an icon library, or a CSS framework. `AdminShell` accepts platform navigation and page content so each application can connect its own routes and data.

The package is intentionally dependency-light so it can be adopted by separate Next.js repositories without forcing a monorepo migration.

## Change process

Update tokens and shared conventions here first. Each platform then upgrades the package version in a controlled change, allowing the admin experience to evolve consistently without requiring every platform to change at once.
