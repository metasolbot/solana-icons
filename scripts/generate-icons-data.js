#!/usr/bin/env node
/**
 * Generate static icon metadata for OpenNext Workers
 * (no runtime fs.readdir of public/svg).
 *
 * Prefer specific categories over flat `platforms/` so "All"
 * does not double-list the same project.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const svgDir = path.join(root, "package", "svg");
const outFile = path.join(root, "app", "icons-data.json");

function normalizeName(name) {
  return name.toLowerCase().replace(/[-_]/g, "");
}

function walk() {
  if (!fs.existsSync(svgDir)) {
    throw new Error(`Missing ${svgDir}`);
  }

  const categories = fs
    .readdirSync(svgDir)
    .filter((item) => fs.statSync(path.join(svgDir, item)).isDirectory())
    .sort();

  const byCat = {};
  for (const category of categories) {
    const categoryPath = path.join(svgDir, category);
    byCat[category] = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".svg"))
      .sort()
      .map((file) => ({
        name: file.replace(/\.svg$/, ""),
        category,
        path: `/svg/${category}/${file}`,
      }));
  }

  const icons = [];
  const claimed = new Set();

  // Specific categories first (not platforms)
  for (const category of categories) {
    if (category === "platforms") continue;
    for (const icon of byCat[category] || []) {
      icons.push(icon);
      claimed.add(normalizeName(icon.name));
    }
  }

  // platforms only if not already claimed under a better category
  for (const icon of byCat.platforms || []) {
    const key = normalizeName(icon.name);
    if (claimed.has(key)) continue;
    icons.push(icon);
    claimed.add(key);
  }

  const nonEmpty = categories.filter((c) => (byCat[c] || []).length > 0);

  return {
    generatedAt: new Date().toISOString(),
    count: icons.length,
    categories: nonEmpty,
    icons,
  };
}

const data = walk();
fs.writeFileSync(outFile, JSON.stringify(data));
console.log(
  `Wrote ${outFile} — ${data.count} icons, ${data.categories.length} categories`
);
