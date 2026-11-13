# Shared component adoption by platform

Hand-maintained status for mandatory shell and public-pattern components from `@127si/design-system`.
**Adopted** means the platform's `main` branch imports the package component for that concern and local masters
are removed or deprecated. **Not adopted** means a local file or hand-styled table still ships.

Generated inventory (file names, hex counts): [`baseline/INVENTORY.md`](../baseline/INVENTORY.md). This table is
the owner-facing rollup for migration planning.

| Platform | Repository | TopNav | Footer | HeroCarousel | Registration summary | DataTable (public) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Challenge | `127si-challenge-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | Local `SiteHeader`, `SiteFooter`, `HeroSlideshow`, standings tables |
| Referee | `127si-referee-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | **First `DataTable` target:** `youth-participants` (reference implementation) |
| Team Shot Tracker | `127si-tst-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | `HomeTeamsTable` migrates to `DataTable` when adopted |
| Curriculum | `127si-curriculum-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | |
| Communication | `127si-communication-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | |
| Content | `127si-content-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | Local `DataTable.tsx` is admin content tooling, not this component |
| Shared Data | `127si-shared-data-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | |
| Bracket | `127si-bracket-platform` | not adopted | not adopted | not adopted | not adopted | not adopted | Agent may lack repo access; owner migrates |
| Fairfield hub | `127si-fairfield-basketball-club` | not adopted | not adopted | not adopted | not adopted | not adopted | Public shell only; joins last per ADR 0001 |

Update this file when a platform merge PR lands. Set **DataTable** to **adopted** only when every **public**
table on that platform uses `DataTable` or the owner documents an explicit exception.
