#!/usr/bin/env node
/**
 * Batch vectorize all platform WebP icons using Vectorizer.ai API
 * Requires API subscription at https://vectorizer.ai/pricing
 *
 * Usage: node scripts/vectorize-platforms.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CREDS = fs.readFileSync('/Users/metasal/.credentials/vectorizer-api.txt', 'utf-8').trim();
const [API_ID, API_SECRET] = CREDS.split(':');

const WEBP_DIR = path.join(__dirname, '..', 'webp', 'platforms');
const SVG_DIR  = path.join(__dirname, '..', 'svg', 'platforms');
const FAILED_LOG = path.join(__dirname, '..', 'vectorize-failures.json');

// Concurrency limit — Vectorizer.ai allows up to 5 concurrent requests
const CONCURRENCY = 5;

fs.mkdirSync(SVG_DIR, { recursive: true });

async function vectorize(webpPath, svgPath) {
  const res = await fetch('https://vectorizer.ai/api/v1/vectorize', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${API_ID}:${API_SECRET}`).toString('base64'),
    },
    body: (() => {
      const form = new FormData();
      form.append('image', new Blob([fs.readFileSync(webpPath)], { type: 'image/webp' }), path.basename(webpPath));
      form.append('output.svg.version', '1.1');
      return form;
    })(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err}`);
  }

  const svg = await res.text();
  fs.writeFileSync(svgPath, svg);
}

async function runBatch(files, batchNum, total) {
  await Promise.all(files.map(async (file) => {
    const name = file.replace('.webp', '');
    const webpPath = path.join(WEBP_DIR, file);
    const svgPath  = path.join(SVG_DIR, `${name}.svg`);

    // Skip if already vectorized
    if (fs.existsSync(svgPath) && fs.statSync(svgPath).size > 500) {
      process.stdout.write(`  ⏭  ${name}\n`);
      return;
    }

    try {
      await vectorize(webpPath, svgPath);
      process.stdout.write(`  ✓  ${name}\n`);
    } catch (e) {
      process.stdout.write(`  ✗  ${name}: ${e.message}\n`);
      return { name, error: e.message };
    }
  }));
}

async function main() {
  const files = fs.readdirSync(WEBP_DIR).filter(f => f.endsWith('.webp')).sort();
  const total = files.length;
  const failures = [];

  console.log(`\n🎨 Vectorizing ${total} platform icons via Vectorizer.ai...\n`);

  // Process in batches of CONCURRENCY
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const batchNum = Math.floor(i / CONCURRENCY) + 1;
    const totalBatches = Math.ceil(files.length / CONCURRENCY);
    console.log(`Batch ${batchNum}/${totalBatches} (${i + 1}-${Math.min(i + CONCURRENCY, total)}/${total})`);

    const results = await runBatch(batch, batchNum, total);
    if (results) failures.push(...results.filter(Boolean));

    // Small delay between batches to be polite to the API
    if (i + CONCURRENCY < files.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  const svgCount = fs.readdirSync(SVG_DIR).filter(f => f.endsWith('.svg')).length;
  console.log(`\n✅ Done! ${svgCount} SVGs in svg/platforms/`);

  if (failures.length > 0) {
    console.log(`⚠️  ${failures.length} failures logged to vectorize-failures.json`);
    fs.writeFileSync(FAILED_LOG, JSON.stringify(failures, null, 2));
  }
}

main().catch(console.error);
