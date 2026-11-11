#!/usr/bin/env node
/** Fail if U+2013 (en dash) appears in UI sources under brand/, components/ or catalogue/. */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ENDASH = "–";
const ROOT = process.cwd();
const UI_DIRS = ["brand", "components", "catalogue"];
const UI_EXTENSIONS = new Set([".js", ".css", ".tsx", ".ts"]);

async function walk(dir, out) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
      continue;
    }
    if (!UI_EXTENSIONS.has(path.extname(entry.name))) continue;
    out.push(full);
  }
}

const files = [];
for (const dir of UI_DIRS) await walk(path.join(ROOT, dir), files);

const violations = [];
for (const file of files.sort()) {
  const text = await readFile(file, "utf8");
  let index = text.indexOf(ENDASH);
  while (index !== -1) {
    const before = text.slice(0, index).split("\n");
    violations.push({ file: path.relative(ROOT, file), line: before.length, col: before[before.length - 1].length + 1 });
    index = text.indexOf(ENDASH, index + 1);
  }
}

if (violations.length === 0) {
  console.log(`OK: no U+2013 en dash in ${files.length} design-system UI file(s).`);
  process.exit(0);
}

console.error("En dash (U+2013) is not allowed in UI source. Use ASCII hyphen (-) instead:\n");
for (const v of violations) console.error(`  ${v.file}:${v.line}:${v.col}`);
process.exit(1);
