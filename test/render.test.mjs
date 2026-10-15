import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as ads from "@127si/admin-design-system";

const navigation = [{ href: "/admin", label: "Overview" }];
const cases = {
  AdminShell: { platform: "challenge", navigation, activeHref: "/admin" },
  AdminSidebar: { platform: "challenge", navigation, activeHref: "/admin" },
  AdminHeader: { platform: "challenge" },
  AdminPageHeader: { title: "Records" },
  AdminCard: { title: "Card" },
  AdminButton: { variant: "primary" },
  AdminStatusBadge: { status: "published" },
  AdminTable: { columns: [{ key: "name", label: "Name" }], rows: [{ name: "Row" }] },
};

let failures = 0;
for (const [name, props] of Object.entries(cases)) {
  try {
    const html = renderToStaticMarkup(React.createElement(ads[name], props, "child"));
    assert.ok(html.length > 0);
    if (["AdminShell", "AdminSidebar", "AdminHeader"].includes(name)) {
      assert.match(html, /127SI CHALLENGE ADMIN/);
    }
    console.log(`ok - ${name}`);
  } catch (error) {
    failures += 1;
    console.log(`not ok - ${name}: ${error.message}`);
  }
}

assert.equal(ads.platformLabel("content"), "127SI CONTENT ADMIN");
console.log(`${Object.keys(cases).length - failures}/${Object.keys(cases).length} components rendered`);
process.exit(failures ? 1 : 0);
