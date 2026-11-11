#!/usr/bin/env node
/**
 * UI inventory of the 127SI platform repositories, read from a git ref (never the working tree).
 *
 *   node scripts/inventory.mjs --root <folder holding the sibling checkouts> [--ref origin/main] [--out baseline]
 *
 * It only runs read-only git commands (`ls-tree`, `show`), so it is safe to point at a checkout
 * that has other work in progress. Fetch the ref first; this script does not fetch.
 *
 * Output: <out>/inventory.json (machine readable, the baseline the guard tests ratchet from)
 * and <out>/INVENTORY.md (the same numbers as tables).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const REPOS = [
  "127si-communication-platform",
  "127si-content-platform",
  "127si-shared-data",
  "127si-curriculum-platform",
  "127si-referee-platform",
  "127si-bracket-platform",
  "127si-tst-platform",
  "127si-challenge-platform",
];

const PACKAGE_NAMES = ["@127si/design-system", "@127si/admin-design-system"];
const SKIP_DIRS = /(^|\/)(node_modules|\.next|dist|build|coverage|out|_worktrees|worktrees|\.claude|\.cursor|playwright-report|test-results)\//;
const CODE_EXT = /\.(tsx|jsx|ts|js|mjs|css)$/;
const TEST_FILE = /(\.test\.|\.spec\.|\/__tests__\/|\/e2e\/|\/tests?\/)/;

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const root = path.resolve(arg("root", ".."));
const ref = arg("ref", "origin/main");
const outDir = path.resolve(arg("out", "baseline"));

function git(repo, gitArgs) {
  return execFileSync("git", ["-C", path.join(root, repo), ...gitArgs], {
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024,
  });
}

/** Read many blobs in one git process. */
function readBlobs(repo, files) {
  const out = new Map();
  if (!files.length) return out;
  const input = files.map((f) => `${ref}:${f}`).join("\n") + "\n";
  const buf = execFileSync("git", ["-C", path.join(root, repo), "cat-file", "--batch"], {
    input,
    maxBuffer: 1024 * 1024 * 1024,
  });
  let offset = 0;
  for (const file of files) {
    const nl = buf.indexOf(10, offset);
    const header = buf.subarray(offset, nl).toString("utf8");
    const size = Number(header.split(" ")[2]);
    out.set(file, buf.subarray(nl + 1, nl + 1 + size).toString("utf8"));
    offset = nl + 1 + size + 1;
  }
  return out;
}

const count = (text, re) => (text.match(re) || []).length;
const bump = (map, key, by = 1) => map.set(key, (map.get(key) || 0) + by);
const top = (map, n = 40) =>
  Object.fromEntries([...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]))).slice(0, n));

const SHELL_PATTERNS = {
  nav: /(site-?header|public-?header|top-?nav|landing-?(top-?)?nav|landing-header|public-chrome|public-?shell|main-?nav|navbar)/i,
  footer: /(footer)/i,
  hero: /(hero|slideshow|carousel)/i,
  formShell: /(registration-.*shell|form-?shell|registration-template|join-form|register-.*form|daily-?form|submit-form)/i,
  adminShell: /(admin-?(shell|nav|sidebar|layout|header|appbar))/i,
  table: /(table|standings)/i,
  button: /(^|\/)(button|btn)[^/]*\.(tsx|jsx)$/i,
};

function inventoryRepo(repo) {
  const sha = git(repo, ["rev-parse", ref]).trim();
  const date = git(repo, ["log", "-1", "--format=%cI", ref]).trim();
  const all = git(repo, ["ls-tree", "-r", "--name-only", ref]).split("\n").filter(Boolean);
  const tracked = all.filter((f) => !SKIP_DIRS.test(`${f}`));
  const code = tracked.filter((f) => CODE_EXT.test(f) && !/\.d\.ts$/.test(f) && !/\.min\./.test(f));
  const ui = code.filter((f) => !TEST_FILE.test(f) && !/^(scripts|infra|supabase|tools|docs)\//.test(f));

  // package.json files (a repo may keep its app in a sub-folder)
  const pkgFiles = tracked.filter((f) => /(^|\/)package\.json$/.test(f) && f.split("/").length <= 2);
  const pkgBlobs = readBlobs(repo, pkgFiles);
  let pin = null;
  let pinName = null;
  let next = null;
  let tailwind = null;
  let packageManager = null;
  for (const [, text] of pkgBlobs) {
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      continue;
    }
    const deps = { ...json.dependencies, ...json.devDependencies };
    for (const name of PACKAGE_NAMES) {
      if (deps[name]) {
        pin = deps[name];
        pinName = name;
      }
    }
    next = next || deps.next || null;
    tailwind = tailwind || deps.tailwindcss || null;
    packageManager = packageManager || json.packageManager || null;
  }
  const refPart = pin ? (pin.split("#")[1] ?? "") : null;
  const pinKind = pin === null ? "not installed" : /^[0-9a-f]{40}$/.test(refPart) ? "full SHA" : /^[0-9a-f]{7,39}$/.test(refPart) ? "short SHA" : refPart ? `branch or tag (${refPart})` : "no ref";

  const blobs = readBlobs(repo, ui);
  const cssFiles = ui.filter((f) => f.endsWith(".css"));
  const jsxFiles = ui.filter((f) => /\.(tsx|jsx)$/.test(f));

  const hex = new Map();
  let hexTotal = 0;
  let hexInCss = 0;
  let hexInJsx = 0;
  const tokenPrefixes = new Map();
  const fontFamilies = new Map();
  const nextFonts = new Map();
  let cssLines = 0;
  const raw = { button: 0, table: 0, input: 0, select: 0, textarea: 0, inlineStyle: 0 };
  const packageImports = new Map();
  let overridesLegacyTokens = 0;

  for (const [file, text] of blobs) {
    const hexes = text.match(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g) || [];
    // In TS/JS a "#abc" can be a URL fragment or id; only count those inside quotes or CSS.
    const counted = file.endsWith(".css") ? hexes : (text.match(/["'`(:\s]#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?=["'`);,\s])/g) || []).map((h) => h.slice(1));
    for (const h of counted) bump(hex, h.toLowerCase());
    hexTotal += counted.length;
    if (file.endsWith(".css")) hexInCss += counted.length;
    else hexInJsx += counted.length;

    if (file.endsWith(".css")) {
      cssLines += text.split("\n").length;
      for (const m of text.matchAll(/(^|[;{\s])(--[a-zA-Z0-9]+)-[a-zA-Z0-9-]*\s*:/g)) bump(tokenPrefixes, m[2]);
      for (const m of text.matchAll(/font-family\s*:\s*([^;}]+)/g)) {
        for (const fam of m[1].split(",")) {
          const name = fam.trim().replace(/^["']|["']$/g, "").replace(/\s*!important$/, "");
          if (name && !/[()]|^var\(|^inherit$|^-apple-system$|^system-ui$|^sans-serif$|^serif$|^monospace$|^ui-|^BlinkMacSystemFont$/.test(name)) bump(fontFamilies, name);
        }
      }
      overridesLegacyTokens += count(text, /--127si-[a-z-]+\s*:/g);
    } else {
      for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g)) {
        for (const name of m[1].split(",")) bump(nextFonts, name.trim().replace(/_/g, " "));
      }
      if (/next\/font\/local/.test(text)) {
        for (const m of text.matchAll(/fonts?\/([a-z-]+?)-(?:latin|variable|[0-9])/gi)) bump(nextFonts, `${m[1]} (local)`);
      }
      for (const name of PACKAGE_NAMES) {
        for (const m of text.matchAll(new RegExp(`import\\s*(?:type\\s*)?\\{([^}]+)\\}\\s*from\\s*["']${name.replace("/", "\\/")}["']`, "g"))) {
          for (const sym of m[1].split(",")) {
            const clean = sym.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0];
            if (clean) bump(packageImports, clean);
          }
        }
      }
    }
    if (/\.(tsx|jsx)$/.test(file)) {
      raw.button += count(text, /<button\b/g);
      raw.table += count(text, /<table\b/g);
      raw.input += count(text, /<input\b/g);
      raw.select += count(text, /<select\b/g);
      raw.textarea += count(text, /<textarea\b/g);
      raw.inlineStyle += count(text, /\bstyle=\{\{/g);
    }
    for (const name of PACKAGE_NAMES) {
      if (text.includes(`${name}/tokens.css`)) bump(packageImports, "tokens.css");
    }
  }

  const local = {};
  for (const [kind, re] of Object.entries(SHELL_PATTERNS)) {
    local[kind] = jsxFiles
      .concat(kind === "formShell" ? cssFiles : [])
      .filter((f) => re.test(kind === "button" ? f : path.basename(f)))
      .sort();
  }

  const lockfiles = tracked.filter((f) => /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?)$/.test(f) && f.split("/").length <= 2);
  const workflows = tracked.filter((f) => /^\.github\/workflows\/.+\.ya?ml$/.test(f));

  return {
    repo,
    ref,
    sha,
    committed: date,
    next,
    tailwind,
    packageManager,
    lockfiles,
    workflows,
    package: { name: pinName, pin, pinKind, imports: top(packageImports), localOverridesOfLegacyTokens: overridesLegacyTokens },
    css: { files: cssFiles.length, modules: cssFiles.filter((f) => f.endsWith(".module.css")).length, lines: cssLines },
    hex: { total: hexTotal, inCss: hexInCss, inJsx: hexInJsx, distinct: hex.size, top: top(hex, 25) },
    tokenPrefixes: top(tokenPrefixes, 30),
    fonts: { cssFamilies: top(fontFamilies, 30), nextFont: top(nextFonts, 30) },
    raw,
    local,
  };
}

const results = [];
const skipped = [];
for (const repo of REPOS) {
  try {
    results.push(inventoryRepo(repo));
  } catch (error) {
    skipped.push({ repo, reason: String(error.message).split("\n")[0] });
  }
}

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "inventory.json"), JSON.stringify({ ref, repos: results, skipped }, null, 2) + "\n");

const short = (r) => r.repo.replace(/^127si-/, "").replace(/-platform$/, "");
const row = (cells) => `| ${cells.join(" | ")} |`;
const table = (head, rows) => [row(head), row(head.map(() => "---")), ...rows.map(row)].join("\n");
const keys = (o) => Object.keys(o).join(", ") || "none";

let md = `# UI inventory baseline\n\nGenerated by \`scripts/inventory.mjs\` from \`${ref}\` of each repository. Do not edit by hand; re-run the script.\nThe guard tests in each platform ratchet down from these numbers (\`inventory.json\` is the machine-readable copy).\n\n`;
md += "## Commit read\n\n" + table(["Repo", "Commit", "Committed"], results.map((r) => [short(r), `\`${r.sha}\``, r.committed.slice(0, 10)])) + "\n\n";
md += "## Stack and package pin\n\n" + table(
  ["Repo", "Next", "Tailwind", "Package manager", "Lockfiles", "CI workflows", "Design system pin", "Imports from package"],
  results.map((r) => [short(r), r.next ?? "-", r.tailwind ?? "-", r.packageManager ?? "-", r.lockfiles.join(", ") || "none", String(r.workflows.length), r.package.pinKind + (r.package.pin && r.package.pinKind === "full SHA" ? ` \`${r.package.pin.split("#")[1].slice(0, 8)}\`` : ""), keys(r.package.imports)]),
) + "\n\n";
md += "## Styling\n\n" + table(
  ["Repo", "CSS files", "CSS modules", "CSS lines", "Hex literals", "in CSS", "in TS/JSX", "Distinct hex", "Local `--127si-*` definitions", "Token prefixes defined"],
  results.map((r) => [short(r), r.css.files, r.css.modules, r.css.lines, r.hex.total, r.hex.inCss, r.hex.inJsx, r.hex.distinct, r.package.localOverridesOfLegacyTokens, Object.entries(r.tokenPrefixes).map(([k, v]) => `\`${k}-\` ${v}`).join(", ") || "none"].map(String)),
) + "\n\n";
md += "## Fonts\n\n" + table(["Repo", "Families named in CSS", "Loaded through next/font"], results.map((r) => [short(r), keys(r.fonts.cssFamilies), keys(r.fonts.nextFont)])) + "\n\n";
md += "## Raw elements in TSX/JSX (no shared component)\n\n" + table(
  ["Repo", "`<button>`", "`<table>`", "`<input>`", "`<select>`", "`<textarea>`", "inline `style={{`"],
  results.map((r) => [short(r), r.raw.button, r.raw.table, r.raw.input, r.raw.select, r.raw.textarea, r.raw.inlineStyle].map(String)),
) + "\n\n";
md += "## Local shell and pattern files (by file name)\n\n";
for (const r of results) {
  md += `### ${short(r)}\n\n`;
  for (const [kind, files] of Object.entries(r.local)) {
    md += `- ${kind} (${files.length})${files.length ? ": " + files.slice(0, 25).map((f) => `\`${f}\``).join(", ") + (files.length > 25 ? ", ..." : "") : ""}\n`;
  }
  md += "\n";
}
if (skipped.length) {
  md += "## Not read\n\n" + skipped.map((s) => `- ${s.repo}: ${s.reason}`).join("\n") + "\n";
}
writeFileSync(path.join(outDir, "INVENTORY.md"), md);
console.log(`Wrote ${results.length} repos to ${outDir}${skipped.length ? `; skipped ${skipped.map((s) => s.repo).join(", ")}` : ""}`);
