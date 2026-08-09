#!/usr/bin/env node
/**
 * Generate static icon metadata for OpenNext Workers
 * (no runtime fs.readdir of public/svg).
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const svgDir = path.join(root, "package", "svg");
const outFile = path.join(root, "app", "icons-data.json");

function walk() {
  const icons = [];
  if (!fs.existsSync(svgDir)) {
    throw new Error(`Missing ${svgDir}`);
  }
  const categories = fs
    .readdirSync(svgDir)
    .filter((item) => fs.statSync(path.join(svgDir, item)).isDirectory())
    .sort();

  for (const category of categories) {
    const categoryPath = path.join(svgDir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".svg"))
      .sort();
    for (const file of files) {
      icons.push({
        name: file.replace(/\.svg$/, ""),
        category,
        path: `/svg/${category}/${file}`,
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    count: icons.length,
    categories: Array.from(new Set(icons.map((i) => i.category))).sort(),
    icons,
  };
}

const data = walk();
fs.writeFileSync(outFile, JSON.stringify(data));
console.log(
  `Wrote ${outFile} — ${data.count} icons, ${data.categories.length} categories`
);
