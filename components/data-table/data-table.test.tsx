import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { DataTable } from "./DataTable.js";
import { PARTICIPANT_DEMO_ROWS, participantColumnsPublic, participantColumnsStaff } from "./participantPresets.js";

test("DataTable renders an accessible table with column headers", () => {
  const html = renderToStaticMarkup(
    <DataTable
      caption="Winter roster"
      columns={participantColumnsPublic()}
      rows={PARTICIPANT_DEMO_ROWS}
      columnVisibilityPreset="public"
      showToolbar={false}
      rowKey={(row) => row.id}
    />,
  );
  assert.match(html, /<caption class="si-dt-caption">Winter roster<\/caption>/);
  assert.match(html, /<table class="si-dt-table"/);
  const headers = html.match(/<th[^>]*scope="col"/g) ?? [];
  assert.ok(headers.length >= 5);
  assert.match(html, /si-dt-participant-name/);
  assert.match(html, /si-dt-pill is-grade/);
});

test("DataTable staff preset includes status column in markup when visible", () => {
  const html = renderToStaticMarkup(
    <DataTable
      columns={participantColumnsStaff()}
      rows={PARTICIPANT_DEMO_ROWS.slice(0, 2)}
      columnVisibilityPreset="staff"
      showToolbar={false}
      rowKey={(row) => row.id}
    />,
  );
  assert.match(html, /si-dt-pill is-status/);
});

test("DataTable empty state", () => {
  const html = renderToStaticMarkup(
    <DataTable
      columns={participantColumnsPublic()}
      rows={[]}
      emptyState={{ title: "Nobody here", message: "Invite athletes to register." }}
      showToolbar={false}
    />,
  );
  assert.match(html, /Nobody here/);
  assert.match(html, /Invite athletes to register\./);
});

test("DataTable supports dark theme class", () => {
  const html = renderToStaticMarkup(
    <DataTable columns={participantColumnsPublic()} rows={PARTICIPANT_DEMO_ROWS.slice(0, 1)} theme="dark" showToolbar={false} rowKey={(r) => r.id} />,
  );
  assert.match(html, /class="si-data-table is-dark"/);
});
