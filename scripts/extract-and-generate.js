#!/usr/bin/env node
/**
 * For each SVG in svg/:
 * - If it's a real SVG (no base64 wrapper): copy as-is to preview/public/svg/, convert to PNG
 * - If it's a base64 wrapper: extract the PNG, save to preview/public/png/, wrap in clean SVG
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgDir = path.join(__dirname, '..', 'svg');
const outSvgDir = path.join(__dirname, '..', 'preview', 'public', 'svg');
const outPngDir = path.join(__dirname, '..', 'preview', 'public', 'png');

let real = 0, extracted = 0, errors = 0;

async function processFile(svgPath, relPath) {
  const content = fs.readFileSync(svgPath, 'utf8');
  const outSvg = path.join(outSvgDir, relPath);
  const outPng = path.join(outPngDir, relPath.replace('.svg', '.png'));

  fs.mkdirSync(path.dirname(outSvg), { recursive: true });
  fs.mkdirSync(path.dirname(outPng), { recursive: true });

  const base64Match = content.match(/href="data:image\/png;base64,([^"]+)"/);

  if (!base64Match) {
    // Real SVG — copy and convert to PNG via sharp
    fs.copyFileSync(svgPath, outSvg);
    try {
      await sharp(Buffer.from(content), { density: 300 })
        .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outPng);
      real++;
    } catch (e) {
      // SVG might have complex features — try resvg fallback
      errors++;
      console.error(`PNG convert failed for ${relPath}: ${e.message}`);
    }
  } else {
    // Base64 wrapper — extract PNG data
    const pngBuffer = Buffer.from(base64Match[1], 'base64');

    // Save clean PNG at 512px
    try {
      await sharp(pngBuffer)
        .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outPng);
    } catch(e) {
      await sharp(pngBuffer).toFile(outPng);
    }

    // Create a clean SVG that embeds the PNG as base64 (proper viewBox, no wrapper hack)
    const cleanPngB64 = fs.readFileSync(outPng).toString('base64');
    const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${cleanPngB64}" width="512" height="512"/>
</svg>`;
    fs.writeFileSync(outSvg, cleanSvg);
    extracted++;
  }
}

async function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, relPath);
    } else if (entry.name.endsWith('.svg')) {
      await processFile(fullPath, relPath);
      process.stdout.write(`\r${real + extracted + errors} processed...`);
    }
  }
}

walk(svgDir).then(() => {
  console.log(`\nDone! Real SVGs: ${real}, Extracted from base64: ${extracted}, Errors: ${errors}`);
});
