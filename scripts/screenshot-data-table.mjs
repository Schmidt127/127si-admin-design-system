#!/usr/bin/env node
/**
 * Captures DataTable catalogue demos for PR evidence.
 * Requires: npm run build first, then npx playwright install chromium (one-time).
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outDir = path.join(root, "components/data-table/screenshots");
const catalogue = path.join(root, "dist/catalogue/index.html");

mkdirSync(outDir, { recursive: true });

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Install Playwright locally: npx playwright install chromium");
  process.exit(1);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();

  const fileUrl = pathToFileURL(catalogue).href;
  await page.goto(fileUrl, { waitUntil: "networkidle" });

  const publicTable = page.locator(".si-data-table").first();
  await publicTable.scrollIntoViewIfNeeded();
  await page.setViewportSize({ width: 1440, height: 900 });
  await publicTable.screenshot({ path: path.join(outDir, "data-table-desktop.png") });

  await page.setViewportSize({ width: 390, height: 844 });
  await publicTable.scrollIntoViewIfNeeded();
  await publicTable.screenshot({ path: path.join(outDir, "data-table-mobile.png") });

  const darkTable = page.locator(".si-data-table.is-dark").first();
  await darkTable.scrollIntoViewIfNeeded();
  await page.setViewportSize({ width: 1440, height: 900 });
  await darkTable.screenshot({ path: path.join(outDir, "data-table-dark.png") });

  console.log(`Wrote screenshots under ${outDir}`);
} finally {
  await browser.close();
}
