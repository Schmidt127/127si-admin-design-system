#!/usr/bin/env node
/** Fail when a fresh build produced files under dist/ that are not committed. */
import { execFileSync } from "node:child_process";

const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "--", "dist"], { encoding: "utf8" }).trim();
if (untracked) {
  console.error("dist/ has files that are not committed. Run `npm run build` and commit dist/:\n" + untracked);
  process.exit(1);
}
console.log("OK: dist/ matches a fresh build.");
