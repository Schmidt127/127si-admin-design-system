# Releasing

How a change in this repository becomes a version every platform can pin. Short on purpose; the README's
"Adding a component" recipe and ADR 0001 (decisions 10, 14 and 16) are the source rules.

## 1. In the PR

- Bump `version` in `package.json` by semver:
  - **major**: a token name, class name or prop that an app could be using changes or goes away;
  - **minor**: a new component, prop or option (even one that is off by default);
  - **patch**: a fix that changes no API (contrast, spacing, a bug).
- One version per PR. If master already has that version (another PR merged first), bump again.
- Add a section to [`CHANGELOG.md`](../CHANGELOG.md): version, date, the changes in plain words, the PR link.
  Say plainly when a change is visible on screen for existing consumers.
- `npm run check` passes and `dist/` is rebuilt and committed (CI runs `npm run check:dist`).

## 2. After the merge: tag

Tag the merge commit on master with the version, then push the tag. Pushing tags is an owner action (or an
agent with the owner's yes for that release).

```sh
git fetch origin
git tag -a vX.Y.Z <merge sha> -m "vX.Y.Z"
git push origin vX.Y.Z
```

The tag is the record of which commit a version is. Consumers still pin the **full commit SHA**, never the
tag name (`git rev-parse vX.Y.Z^{commit}` prints it).

## 3. Upgrade each consumer

Each platform upgrades in its own PR:

1. Set the dependency to the new SHA:
   `"@127si/design-system": "github:Schmidt127/127si-admin-design-system#<full 40-character sha>"`.
2. Regenerate that platform's lockfile with its own package manager, in the same PR.
3. Read the CHANGELOG sections between the old and new version; for anything marked visible, check the
   affected screens.
4. Run the platform's own checks, including its design-system guard test (ADR 0001 decision 14).

Consumers on the pre-v1 name `@127si/admin-design-system` follow the README's upgrade section first.

### The upgrade-PR workflow

`.github/workflows/upgrade-consumers.yml` opens step 3's PRs automatically when a `v*` tag is pushed (ADR 0001
decision 16). It ships in **dry-run**: it prints what it would change in each consumer and opens nothing.
It goes live only when the owner:

1. creates a fine-grained personal access token for the agent account with, on each consumer repository
   only, **Contents: read and write** and **Pull requests: read and write**;
2. stores it in this repository as the Actions secret `CONSUMER_UPGRADE_TOKEN`;
3. sets the repository variable `CONSUMER_UPGRADE_LIVE` to `true`.

Until then, the releasing agent opens the upgrade PRs by hand. The consumer list lives at the top of the
workflow file.
