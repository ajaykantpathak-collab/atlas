#!/usr/bin/env node
/**
 * export_doodle_cards.mjs — render DoodleCards to PNG with Playwright.
 *
 * Usage:
 *   node scripts/export_doodle_cards.mjs --class 12
 *   node scripts/export_doodle_cards.mjs --class 12 --only <node_id,node_id,...>
 *   node scripts/export_doodle_cards.mjs --class 12 --limit 5
 *
 * Input : content/doodle_cards/doodle_content_class<N>.json
 *         (built by backend/tools/build_doodle_content.py — all text
 *          VERBATIM from the node's authored content)
 * Output: content/doodle_cards/class<N>/<node_id>.png   (1080x1350, 4:5)
 *         content/doodle_cards/class<N>_index.json
 *
 * Deterministic: same card data -> same PNG (local fonts, fixed layout,
 * fixed fit ladder, no animations, no network). Resumable: existing PNGs
 * are skipped unless --force.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const PLATFORM_ROOT = path.resolve(FRONTEND_ROOT, '..');
const TEMPLATE = path.join(__dirname, 'doodle_card_template.html');
const CONTENT_DIR = path.join(PLATFORM_ROOT, 'content', 'doodle_cards');

const WIDTH = 1080;
const HEIGHT = 1350;

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  return {
    classLevel: get('--class') || '12',
    only: get('--only') ? get('--only').split(',').map((s) => s.trim()) : null,
    limit: get('--limit') ? parseInt(get('--limit'), 10) : null,
    start: get('--start') ? parseInt(get('--start'), 10) : null,
    end: get('--end') ? parseInt(get('--end'), 10) : null,
    force: args.includes('--force'),
  };
}

async function main() {
  const opts = parseArgs();
  const srcPath = path.join(CONTENT_DIR, `doodle_content_class${opts.classLevel}.json`);
  if (!fs.existsSync(srcPath)) {
    console.error(`[export] missing content file: ${srcPath}`);
    console.error('[export] run: python backend/tools/build_doodle_content.py');
    process.exit(1);
  }
  const src = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
  let cards = src.cards || [];
  if (opts.only) cards = cards.filter((c) => opts.only.includes(c.node_id));
  if (opts.limit) cards = cards.slice(0, opts.limit);
  if (opts.start != null || opts.end != null) {
    const s = opts.start != null ? opts.start : 0;
    const e = opts.end != null ? opts.end : cards.length;
    cards = cards.slice(s, e);
  }

  const outDir = path.join(CONTENT_DIR, `class${opts.classLevel}`);
  fs.mkdirSync(outDir, { recursive: true });

  const t0 = Date.now();
  console.log(`[export] class ${opts.classLevel}: ${cards.length} cards -> ${outDir}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
  });
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  await page.goto('file:///' + TEMPLATE.replace(/\\/g, '/'), { waitUntil: 'load' });
  // All fonts must be ready once; each card reuses the same font set.
  await page.evaluate(() => document.fonts.ready);

  const index = [];
  let done = 0;
  let skipped = 0;
  let bottomedOut = [];

  for (const card of cards) {
    const pngPath = path.join(outDir, `${card.node_id}.png`);
    if (!opts.force && fs.existsSync(pngPath)) {
      skipped += 1;
      done += 1;
      index.push({
        node_id: card.node_id,
        title: card.title,
        subject: card.subject,
        chapter: card.chapter,
        png: pngPath,
        width: WIDTH,
        height: HEIGHT,
      });
      continue;
    }
    try {
      const fit = await page.evaluate((data) => {
        window.renderDoodleCard(data);
        return window.fitCard();
      }, card);
      if (fit <= 55) bottomedOut.push({ node_id: card.node_id, fit });
      await page.locator('#card').screenshot({ path: pngPath, type: 'png' });
      index.push({
        node_id: card.node_id,
        title: card.title,
        subject: card.subject,
        chapter: card.chapter,
        png: pngPath,
        width: WIDTH,
        height: HEIGHT,
      });
    } catch (err) {
      console.error(`[export] FAILED ${card.node_id}: ${err.message}`);
    }
    done += 1;
    if (done % 200 === 0) {
      const mins = ((Date.now() - t0) / 60000).toFixed(1);
      console.log(`[export] ${done}/${cards.length} rendered (${mins} min elapsed)`);
    }
  }

  await browser.close();

  // The index always covers the FULL source card list (not just the slice
  // this run processed), so chunked runs merge cleanly instead of clobbering.
  const indexPath = path.join(CONTENT_DIR, `class${opts.classLevel}_index.json`);
  const rendered = new Set(index.map((e) => e.node_id));
  const indexDoc = {
    class: parseInt(opts.classLevel, 10),
    generated_at_iso: new Date().toISOString(),
    total: 0,
    size: { width: WIDTH, height: HEIGHT },
    source: srcPath,
    cards: [],
  };
  for (const card of src.cards || []) {
    const pngPath = path.join(outDir, `${card.node_id}.png`);
    const exists = fs.existsSync(pngPath);
    if (!exists && !rendered.has(card.node_id)) continue; // not exported yet
    indexDoc.cards.push({
      node_id: card.node_id,
      title: card.title,
      subject: card.subject,
      chapter: card.chapter,
      png: pngPath,
      width: WIDTH,
      height: HEIGHT,
      exported: exists,
    });
  }
  indexDoc.total = indexDoc.cards.length;
  fs.writeFileSync(indexPath, JSON.stringify(indexDoc, null, 1), 'utf-8');

  const totalMin = ((Date.now() - t0) / 60000).toFixed(2);
  console.log(`[export] DONE ${done} cards (${skipped} skipped-existing) in ${totalMin} min`);
  console.log(`[export] index: ${indexPath}`);
  if (bottomedOut.length) {
    console.warn(`[export] WARNING ${bottomedOut.length} cards hit minimum fit scale:`);
    bottomedOut.slice(0, 20).forEach((b) => console.warn(`  - ${b.node_id} (fit=${b.fit})`));
  }
}

main().catch((err) => {
  console.error('[export] fatal:', err);
  process.exit(1);
});
