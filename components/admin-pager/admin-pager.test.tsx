import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AdminPager } from "./AdminPager.js";

const hrefFor = (page: number) => `/admin/people?page=${page}`;

test("AdminPager links to the previous and next page and states where you are", () => {
  const html = renderToStaticMarkup(<AdminPager page={2} pageCount={7} hrefFor={hrefFor} total={128} />);
  assert.match(html, /^<nav class="si-admin-pager" aria-label="Pages">/);
  assert.match(html, /href="\/admin\/people\?page=1" rel="prev">Previous/);
  assert.match(html, /aria-current="page">Page 2 of 7 \(128 records\)/);
  assert.match(html, /href="\/admin\/people\?page=3" rel="next">Next/);
});

test("AdminPager disables the link that has nowhere to go", () => {
  const first = renderToStaticMarkup(<AdminPager page={1} pageCount={3} hrefFor={hrefFor} />);
  assert.match(first, /<span class="si-admin-pager-link is-disabled" aria-disabled="true">Previous/);
  const last = renderToStaticMarkup(<AdminPager page={3} pageCount={3} hrefFor={hrefFor} total={1} noun="school" />);
  assert.match(last, /is-disabled" aria-disabled="true">Next/);
  assert.match(last, /\(1 school\)/);
});

test("AdminPager renders nothing for a single page", () => {
  assert.equal(renderToStaticMarkup(<AdminPager page={1} pageCount={1} hrefFor={hrefFor} />), "");
});
