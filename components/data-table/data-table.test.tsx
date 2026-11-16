import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { clinicTierDisplay, clinicTierKind } from "./clinic-tier.js";
import { DataTable } from "./DataTable.js";
import { DataTableBanner } from "./DataTableBanner.js";
import {
  applyPublicColumnPolicy,
  filterOptedOutRows,
  isSensitiveColumnKind,
} from "./privacy.js";
import { youthParticipantColumns, YOUTH_PARTICIPANT_SAMPLE_ROWS } from "./youth-participant-example.js";

test("clinic tier labels match the Referee directory", () => {
  assert.deepEqual(clinicTierDisplay(null), { kind: "first", label: "First clinic", count: 0 });
  assert.equal(clinicTierKind(2), "returning");
  assert.equal(clinicTierKind(4), "veteran");
});

test("public column policy removes email and cell by default", () => {
  const columns = youthParticipantColumns();
  const publicColumns = applyPublicColumnPolicy(columns, "public");
  assert.ok(!publicColumns.some((column) => isSensitiveColumnKind(column.sensitiveKind)));
  assert.equal(applyPublicColumnPolicy(columns, "internal").length, columns.length);
});

test("filterOptedOutRows removes opted-out participants on public pages", () => {
  const visible = filterOptedOutRows(YOUTH_PARTICIPANT_SAMPLE_ROWS, "public");
  assert.ok(!visible.some((row) => row.id === "demo-3"));
  assert.equal(filterOptedOutRows(YOUTH_PARTICIPANT_SAMPLE_ROWS, "internal").length, YOUTH_PARTICIPANT_SAMPLE_ROWS.length);
});

test("DataTable renders premium header band, toolbar, and roster", () => {
  const rows = YOUTH_PARTICIPANT_SAMPLE_ROWS.filter((row) => !row.publicDirectoryOptOut);
  const html = renderToStaticMarkup(
    <DataTableBanner title="Youth Participants" stats={[{ id: "total", label: "Participants", value: rows.length }]}>
      <DataTable
        columns={youthParticipantColumns()}
        rows={rows}
        audience="public"
        variant="premium"
        caption="Youth participant highlights"
        enableClinicsTierFilter
        autoChipFilters={["school", "grade"]}
      />
    </DataTableBanner>,
  );
  assert.match(html, /si-dt-directory__band/);
  assert.match(html, /si-dt-directory__title/);
  assert.match(html, /Youth participant highlights/);
  assert.match(html, /si-dt-caption-bar/);
  assert.match(html, /si-dt-table-controls/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /Comfortable/);
  assert.match(html, /si-dt-table-controls[\s\S]*Comfortable/);
  assert.match(html, /First clinic/);
  assert.match(html, /si-dt-chip/);
  assert.match(html, /Preview/);
  assert.doesNotMatch(html, /hidden@example\.org/);
});

test("DataTable aligns view controls without a caption", () => {
  const html = renderToStaticMarkup(
    <DataTable
      columns={[{ id: "name", header: "Name", accessorKey: "name" }]}
      rows={[{ id: "1", name: "Alex" }]}
      showToolbar={false}
    />,
  );
  assert.match(html, /si-dt-caption-bar si-dt-caption-bar--solo/);
  assert.match(html, /si-dt-table-controls/);
  assert.match(html, /Columns/);
});

test("DataTableBanner titleLevel selects heading tag while keeping title styles", () => {
  const defaultTitle = renderToStaticMarkup(<DataTableBanner title="Default">child</DataTableBanner>);
  assert.match(defaultTitle, /<h2[^>]*class="si-dt-directory__title"/);

  const pageTitle = renderToStaticMarkup(
    <DataTableBanner title="Page title" titleLevel={1}>
      child
    </DataTableBanner>,
  );
  assert.match(pageTitle, /<h1[^>]*class="si-dt-directory__title"/);
  assert.doesNotMatch(pageTitle, /<h2[^>]*class="si-dt-directory__title"/);
});

test("DataTable countLabel customizes toolbar result count", () => {
  const rows = [{ id: "a", name: "One" }];
  const singular = renderToStaticMarkup(
    <DataTable
      columns={[{ id: "name", header: "Name", accessorKey: "name" }]}
      rows={rows}
      countLabel={{ one: "participant", other: "participants" }}
    />,
  );
  assert.match(singular, /1<\/span> participant/);

  const plural = renderToStaticMarkup(
    <DataTable
      columns={[{ id: "name", header: "Name", accessorKey: "name" }]}
      rows={[
        { id: "a", name: "One" },
        { id: "b", name: "Two" },
      ]}
      countLabel={{ one: "participant", other: "participants" }}
    />,
  );
  assert.match(plural, /2<\/span> participants/);

  const defaultRows = renderToStaticMarkup(
    <DataTable columns={[{ id: "name", header: "Name", accessorKey: "name" }]} rows={rows} />,
  );
  assert.match(defaultRows, /1<\/span> row/);
});

test("DataTable shows loading and empty states", () => {
  const loading = renderToStaticMarkup(
    <DataTable columns={[{ id: "name", header: "Name", accessorKey: "name" }]} rows={[]} loading />,
  );
  assert.match(loading, /Loading participants/);

  const empty = renderToStaticMarkup(
    <DataTable
      columns={[{ id: "name", header: "Name", accessorKey: "name" }]}
      rows={[]}
      emptyState={{ title: "Quiet gym", message: "No rows yet." }}
    />,
  );
  assert.match(empty, /Quiet gym/);
  assert.match(empty, /No rows yet\./);
});