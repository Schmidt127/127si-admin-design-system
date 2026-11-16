#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { YouthParticipantDataTableExample } from "../dist/components/data-table/youth-participant-example.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const outDir = process.argv[2] ?? path.join(root, "dist", "demos");
mkdirSync(outDir, { recursive: true });

const body = renderToStaticMarkup(React.createElement(YouthParticipantDataTableExample));
const html = [
  "<!doctype html>",
  '<html lang="en">',
  "<head>",
  '<meta charset="utf-8" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  '<link rel="stylesheet" href="../fonts.css" />',
  '<link rel="stylesheet" href="../styles.css" />',
  "<style>body{margin:0;padding:1.5rem;background:#f4f6fb;}</style>",
  "<title>Youth participant DataTable demo</title>",
  "</head>",
  `<body>${body}</body>`,
  "</html>",
  "",
].join("\n");

const outPath = path.join(outDir, "youth-participant-datatable.html");
writeFileSync(outPath, html);
console.log(outPath);