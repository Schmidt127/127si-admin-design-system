#!/usr/bin/env node
/** Fail if U+2013 (en dash) appears in component UI sources under src/. */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ENDASH = "\u2013";
const ROOT = process.cwd();
const UI_DIR = path.join(ROOT, "src");
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
    const ext = path.extname(entry.name);
    if (!UI_EXTENSIONS.has(ext)) continue;
    if (entry.name.endsWith(".d.ts")) continue;
    out.push(full);
  }
}

const files = [];
await walk(UI_DIR, files);

const violations = [];
for (const file of files.sort()) {
  const text = await readFile(file, "utf8");
  let index = text.indexOf(ENDASH);
  while (index !== -1) {
    const before = text.slice(0, index).split("\n");
    const line = before.length;
    const col = before[before.length - 1].length + 1;
    violations.push({ file: path.relative(ROOT, file), line, col });
    index = text.indexOf(ENDASH, index + 1);
  }
}

if (violations.length === 0) {
  console.log(
    `OK: no U+2013 en dash in ${files.length} admin-design-system UI file(s) under src/.`,
  );
  process.exit(0);
}

console.error(
  "En dash (U+2013) is not allowed in UI source. Use ASCII hyphen (-) instead:\n",
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}:${v.col}`);
}
process.exit(1);
