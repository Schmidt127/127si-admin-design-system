# Agent instructions

This repository is the **127SI design system** npm package `@127si/design-system`. It holds brand tokens, themes, fonts, logos, and shared React components that the live 127 Sports Intensity platforms install by pinning a full Git commit SHA. The GitHub repo name (`127si-admin-design-system`) is older than the package name; do not rename the repo.

Authoritative docs live in [`README.md`](README.md), component and brand rules in `RULES.md` files, and release steps in [`docs/RELEASING.md`](docs/RELEASING.md).

## Skills

If Mike asks to cut a design-system release, bump a version, tag a release, or help live apps pick up a new design-system version, first open [`.agents/skills/release-a-new-version/SKILL.md`](.agents/skills/release-a-new-version/SKILL.md).

If a skill and a runbook or `RULES.md` disagree, the runbook wins.

## What agents should not do without Mike

- Publish or cut a release (version bump, tag push, consumer upgrade PRs) unless Mike explicitly asked for that release in this conversation.
- Change package version, `CHANGELOG.md`, or committed `dist/` when the task is documentation or skills only.
- Enable live consumer upgrade automation (`CONSUMER_UPGRADE_LIVE`) or create GitHub tokens without Mike's instruction.