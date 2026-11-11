import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminTable } from "./AdminTable.js";

type Row = { id: number; name: string; paid: boolean };
const rows: Row[] = [
  { id: 1, name: "Ava", paid: true },
  { id: 2, name: "Noah", paid: false },
];

test("AdminTable renders an accessible table", () => {
  const html = renderToStaticMarkup(
    <AdminTable<Row>
      caption="Athletes"
      columns={[
        { key: "name", label: "Name" },
        { key: "paid", label: "Paid", render: (row) => (row.paid ? "Yes" : "No") },
      ]}
      rows={rows}
      rowKey={(row) => row.id}
    />,
  );
  assert.match(html, /<caption>Athletes<\/caption>/);
  assert.equal((html.match(/<th scope="col">/g) || []).length, 2);
  assert.match(html, /<td>Ava<\/td><td>Yes<\/td>/);
  assert.match(html, /<td>Noah<\/td><td>No<\/td>/);
});

test("AdminTable shows the empty message across all columns", () => {
  const html = renderToStaticMarkup(<AdminTable columns={[{ key: "a", label: "A" }, { key: "b", label: "B" }]} rows={[]} emptyMessage="Nothing yet." />);
  assert.match(html, /<td colSpan="2" class="si-admin-empty">Nothing yet\.<\/td>/i);
});
