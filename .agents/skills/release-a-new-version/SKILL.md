---
name: release-a-new-version
description: Cut a new @127si/design-system version and help live platforms pick it up. Use only when Mike explicitly asks to release, tag, or roll out a design-system version.
---

# Release a new design-system version

**Stop unless Mike clearly asked you to release** (for example: "cut 1.10.0", "tag this merge", "roll out the design system to the apps"). If the ask is unclear, describe what a release would involve and wait for Mike.

This skill does not replace [`docs/RELEASING.md`](../../../docs/RELEASING.md). When anything here and that file disagree, **RELEASING.md wins**.

## What a release is in this repo

1. **In the design-system PR (before merge):** semver bump in `package.json`, one `CHANGELOG.md` entry, passing checks, and a rebuilt committed `dist/`.
2. **After merge to `master`:** an annotated git tag `vX.Y.Z` on the merge commit, pushed to `origin` (owner or explicit yes).
3. **In each platform repo:** upgrade PR that pins `"@127si/design-system": "github:Schmidt127/127si-admin-design-system#<full 40-character sha>"` and refreshes that app's lockfile.

Consumers never pin branch names, tag names, or short SHAs. See README "Using it in a platform".

## Commands that exist here (do not invent others)

From repository root, after `npm install`:

| Command | Purpose |
| --- | --- |
| `npm run check` | `build`, `typecheck`, `check:ui-en-dash`, and tests — use before merging a release PR |
| `npm run check:dist` | What CI uses first: rebuild and fail if `dist/` differs from a fresh build or has untracked files |
| `npm run build` | Compile to `dist/` only |

There is no `npm publish` script; shipping is **git tags + SHA pins** in platform repos, not npm registry publish (`package.json` has `"private": true`).

## Step 1 — Prepare the release PR (on a feature branch)

Mike should already have merged or be merging the component/docs changes that deserve a version. The **release bump can be in the same PR as the changes or a follow-up PR**, but RELEASING.md requires **one version per PR**.

1. Read README semver rules and [`docs/RELEASING.md`](../../../docs/RELEASING.md) section 1:
   - **major** — token, class, or prop an app might use changes or disappears
   - **minor** — new component, prop, or option (even default-off)
   - **patch** — fix with no API change
2. Set `version` in `package.json` to `X.Y.Z`. If `master` already has that version from another merge, bump again.
3. Add a section to [`CHANGELOG.md`](../../../CHANGELOG.md): version, date, plain-language changes, PR link. Say clearly when something is **visible on screen** for existing consumers.
4. Run `npm run check` and commit any `dist/` changes from the build.
5. Open the PR; do not merge unless Mike asked you to merge.

## Step 2 — After merge: tag (owner-sensitive)

Tagging is documented in RELEASING.md section 2. **Do not push tags unless Mike explicitly authorized this release's tag push.**

```sh
git fetch origin
git tag -a vX.Y.Z <merge-sha> -m "vX.Y.Z"
git push origin vX.Y.Z
```

The tag records which commit is the release. Platforms still pin the **full commit SHA** (`git rev-parse vX.Y.Z^{commit}`).

If Mike asks you to tag but you lack permission to push tags, stop and tell Mike to run the push or grant access.

## Step 3 — Help live apps pick up the version

RELEASING.md section 3 and [`docs/CONSUMER-UPGRADE-NOTE.md`](../../../docs/CONSUMER-UPGRADE-NOTE.md) describe per-platform risk and order.

For **each** platform that should upgrade:

1. Set the dependency to the new full SHA in that repo's `package.json`.
2. Regenerate the lockfile with **that platform's** package manager in the same PR.
3. Read CHANGELOG between old and new version; visually check anything marked visible.
4. Run that platform's own CI, including its design-system guard test (ADR 0001 decision 14).

Platforms still on `@127si/admin-design-system` need README "Upgrading from `@127si/admin-design-system`" first.

### Automatic upgrade workflow (usually dry-run)

[`.github/workflows/upgrade-consumers.yml`](../../../.github/workflows/upgrade-consumers.yml) runs on `v*` tag push. It is **dry-run by default** until Mike:

1. Adds secret `CONSUMER_UPGRADE_TOKEN` (fine-grained PAT with Contents + Pull requests on consumer repos only)
2. Sets repository variable `CONSUMER_UPGRADE_LIVE` to `true`

**Do not set `CONSUMER_UPGRADE_LIVE` or create tokens unless Mike asked.** Until live mode is on, plan **manual** upgrade PRs in each consumer listed at the top of that workflow file.

Suggested rollout order and per-app notes: [`docs/CONSUMER-UPGRADE-NOTE.md`](../../../docs/CONSUMER-UPGRADE-NOTE.md). Prefer **draft** upgrade PRs until Mike reviews visible UI changes.

**TST** does not depend on this package today; adoption is a product decision, not a semver bump (see CONSUMER-UPGRADE-NOTE).

## Gaps — stop and ask Mike

- Release requested but **no merged commit** on `master` with the right `package.json` version and `dist/` yet.
- **Unclear semver** (API vs visual-only); ask rather than guess major/minor/patch.
- **Tag push** or **GitHub Actions secrets/variables** needed and Mike has not said to do it.
- Consumer repo not listed in `upgrade-consumers.yml` or using a nonstandard pin — ask before editing.
- Anything in CHANGELOG or CONSUMER-UPGRADE-NOTE that conflicts with what you see on `origin`; refresh from git and ask Mike.