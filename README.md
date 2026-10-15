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

## Package entry points and types

- `@127si/admin-design-system` → runtime `src/index.js`, types `src/index.d.ts` (`exports["."].types` plus the top-level `types` field).
- `@127si/admin-design-system/tokens.css` → `src/tokens.css`.

The runtime is plain ESM JavaScript; types are hand-written declarations (`src/index.d.ts`, `src/components.d.ts`). There is no build step and no TypeScript source in the published package, so consumers never compile this package's source under their own compiler settings. Type resolution works with `moduleResolution` `bundler`, `node16`, `nodenext`, and `node10`. Keep the declarations in sync with the JavaScript whenever an export or prop changes.

## Consuming the package

Consumers install this package from GitHub, pinned to a **full 40-character commit SHA that exists on GitHub**:

```json
"@127si/admin-design-system": "github:Schmidt127/127si-admin-design-system#<full-sha>"
```

- Never pin a branch (`#master`) or omit the ref; that floats and makes builds non-reproducible.
- Avoid short SHAs: they work today, but a full SHA cannot become ambiguous and matches what lockfiles record.
- Each consumer uses its own declared package manager (`packageManager` field and committed lockfile: npm `package-lock.json` or pnpm `pnpm-lock.yaml`). The consumer lockfile is what pins the resolved commit.
- Upgrade by changing the SHA in the consumer's `package.json` and regenerating that consumer's lockfile in the same PR.

## Package manager and lockfile policy (this repository)

This repository is consumed by git SHA, not from a registry, and has no runtime dependencies (React is a peer dependency). It therefore commits **no lockfile** and declares **no `packageManager`**; lockfiles are git-ignored. The dev dependencies exist only for local checks and are never installed by consumers (npm and pnpm do not install a git dependency's dev dependencies unless it has a `prepare` script, so do not add one).

## Local checks

```sh
npm install
npm run check   # tsc declaration/consumer typecheck + server-render smoke test of every component
```

## Change process

Update tokens and shared conventions here first. Each platform then upgrades to the new full commit SHA in a controlled change, allowing the admin experience to evolve consistently without requiring every platform to change at once.
