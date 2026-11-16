#!/usr/bin/env node
/** Serve dist/ so dist/catalogue/index.html resolves fonts.css and styles.css. */
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/" || pathname === "") pathname = "/catalogue/index.html";
  const filePath = path.join(dist, pathname);
  try {
    const data = readFileSync(filePath);
    const ext = path.extname(filePath);
    response.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
    response.end(data);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Catalogue preview: http://127.0.0.1:${port}/catalogue/index.html`);
});