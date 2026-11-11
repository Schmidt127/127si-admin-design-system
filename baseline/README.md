# Baseline

`INVENTORY.md` and `inventory.json` record what each platform's UI looked like in code when the shared design
system work started (2026-11-11). They are generated; do not edit them by hand.

```sh
# fetch origin/main in each sibling checkout first, then:
node scripts/inventory.mjs --root .. --ref origin/main --out baseline
```

The script only runs read-only git commands against the ref, so it is safe to run next to checkouts that have
other work in progress.

## Reading notes for the 2026-11-11 run

- Seven repositories were fetched on 2026-11-11 before the run. **Bracket was not fetched**: the agent account
  (`MikeSchmidtAgent`) has no access to `Schmidt127/127si-bracket-platform`, so its row is the local
  `origin/main` ref as last fetched by the owner (commit dated 2026-11-09) and may be behind GitHub.
- The marketing hub `127si-fairfield-basketball-club` is not cloned on the workstation and the agent account
  cannot read it; it is not in the inventory.
- Counts are by pattern match and indicate scale. Hex literals in TS/JSX are counted only when quoted. "Local
  shell and pattern files" is a file-name match, not proof that a file is in use.
- Findings that differ from the 2026-11-11 audit of stale checkouts:
  - Content and Shared Data already pin the package by full SHA. Only Referee still pins `#master`.
  - Content already has CI (`ci.yml`, `production-smoke.yml`).
  - Shared Data tracks both lockfiles; its CI runs `npm ci` and fails on `main` because `package-lock.json`
    still records Next 15.5.29 while `package.json` and `pnpm-lock.yaml` say 16.4.5.
  - Team Shot Tracker's live token values on `main` are not the documented Scoreboard palette: `--sb-black` is
    `#18181b`, `--sb-amber` is `#06b6d4` (cyan) and `--tst-alert` is `#10b981`, since TST PR #129 (2026-11-09).
    `docs/BRAND.md` and `decisions.md` in that repo still say black `#121417`, amber `#FFB000`, red `#D62839`.
    The owner must say which is intended before TST adopts the shared theme.

The guard tests added in the enforcement phase ratchet from these numbers: a count may go down, never up.
