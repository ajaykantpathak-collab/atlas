#!/usr/bin/env node
/**
 * export_doodle_cards.mjs — render DoodleCards to PNG with Playwright.
 *
 * Usage:
 *   node scripts/export_doodle_cards.mjs --class 12
 *   node scripts/export_doodle_cards.mjs --class 12 --corpus cisce
 *   node scripts/export_doodle_cards.mjs --class 12 --corpus cisce \
 *        --format webp --width 720
 *
 * Input : <out-dir>/doodle_content[_cisce]_class<N>.json
 *         (built by backend/tools/build_doodle_content.py — all text
 *          VERBATIM from the node's authored content)
 * Output: <out-dir>/class<N>/<node_id>.png|webp        (4:5, 1080x1350 png
 *         or 720x900 webp ~100KB — the corpus standard since the cisce wave)
 *         <out-dir>/class<N>_index.json                  (cbse corpus)
 *         <out-dir>/class<N>_index_cisce.json            (cisce corpus —
 *          separate artifact so a cisce run never clobbers the cbse index;
 *          scripts/rebuild_doodle_indexes.mjs writes the canonical merged
 *          class<N>_index.json + doodle_home_map.json from disk)
 *
 * Corpus flag: --corpus cbse (default, legacy file names) | cisce → reads
 * doodle_content_cisce_class<N>.json. CISCE ids embed the board token
 * (c10_bio_icse_… / c11_hist_isc_…), so PNGs share the class{N} folders
 * with CBSE with zero name collisions; DoodleCardImage resolves the same
 * folder from the c{N}_ id prefix.
 *
 * Format: --format png (default, legacy) | webp. WebP cards render at the
 * native 1080x1350 layout, then convert_doodle_webp.py LANCZOS-downscales
 * to --width x 4:5 (default 720x900) in ONE batch pass per run — the card
 * CSS is never re-laid-out, so a webp card is pixel-identical to its png
 * sibling, just smaller.
 *
 * Deterministic: same card data -> same image (local fonts, fixed layout,
 * fixed fit ladder, no animations, no network). Resumable: existing cards
 * (of the requested format) are skipped unless --force.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const PLATFORM_ROOT = path.resolve(FRONTEND_ROOT, '..');
const TEMPLATE = path.join(__dirname, 'doodle_card_template.html');
const CONVERTER = path.join(__dirname, 'convert_doodle_webp.py');
const CONTENT_DIR = path.join(PLATFORM_ROOT, 'content', 'doodle_cards');

// native render size (the card CSS is authored against this); webp output
// is a LANCZOS downscale of the same render, never a re-layout
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
    corpus: (get('--corpus') || 'cbse').toLowerCase(),
    outDir: get('--out-dir') ? path.resolve(get('--out-dir')) : CONTENT_DIR,
    format: (get('--format') || 'png').toLowerCase(),
    width: get('--width') ? parseInt(get('--width'), 10) : 720,
    only: get('--only') ? get('--only').split(',').map((s) => s.trim()) : null,
    limit: get('--limit') ? parseInt(get('--limit'), 10) : null,
    start: get('--start') ? parseInt(get('--start'), 10) : null,
    end: get('--end') ? parseInt(get('--end'), 10) : null,
    force: args.includes('--force'),
  };
}

async function main() {
  const opts = parseArgs();
  if (opts.corpus !== 'cbse' && opts.corpus !== 'cisce') {
    console.error(`[export] unknown corpus: ${opts.corpus} (use cbse | cisce)`);
    process.exit(1);
  }
  if (opts.format !== 'png' && opts.format !== 'webp') {
    console.error(`[export] unknown format: ${opts.format} (use png | webp)`);
    process.exit(1);
  }
  const ext = opts.format === 'webp' ? 'webp' : 'png';
  const outW = opts.format === 'webp' ? opts.width : WIDTH;
  const outH = opts.format === 'webp' ? Math.round((opts.width * HEIGHT) / WIDTH) : HEIGHT;
  const contentName =
    opts.corpus === 'cbse'
      ? `doodle_content_class${opts.classLevel}.json`
      : `doodle_content_${opts.corpus}_class${opts.classLevel}.json`;
  const srcPath = path.join(opts.outDir, contentName);
  if (!fs.existsSync(srcPath)) {
    console.error(`[export] missing content file: ${srcPath}`);
    console.error(
      `[export] run: python backend/tools/build_doodle_content.py --corpus ${opts.corpus}`
    );
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

  const outDir = path.join(opts.outDir, `class${opts.classLevel}`);
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
  const renderedPngs = []; // temp pngs awaiting webp conversion

  for (const card of cards) {
    const finalPath = path.join(outDir, `${card.node_id}.${ext}`);
    const renderPath =
      opts.format === 'webp'
        ? path.join(outDir, `${card.node_id}.png`) // transient, converted below
        : finalPath;
    if (!opts.force && fs.existsSync(finalPath)) {
      skipped += 1;
      done += 1;
      index.push({
        node_id: card.node_id,
        title: card.title,
        subject: card.subject,
        chapter: card.chapter,
        png: finalPath,
        width: outW,
        height: outH,
      });
      continue;
    }
    try {
      const fit = await page.evaluate((data) => {
        window.renderDoodleCard(data);
        return window.fitCard();
      }, card);
      if (fit <= 55) bottomedOut.push({ node_id: card.node_id, fit });
      await page.locator('#card').screenshot({ path: renderPath, type: 'png' });
      if (opts.format === 'webp') renderedPngs.push(renderPath);
      index.push({
        node_id: card.node_id,
        title: card.title,
        subject: card.subject,
        chapter: card.chapter,
        png: finalPath,
        width: outW,
        height: outH,
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

  // webp pass: one batched LANCZOS downscale+encode per run (720x900 default,
  // ~100KB/card). The converter refuses any filename without a CISCE board
  // token, so a shared shelf's CBSE PNGs are structurally untouchable.
  if (opts.format === 'webp' && renderedPngs.length) {
    const manifest = path.join(outDir, `.webp_manifest_class${opts.classLevel}.txt`);
    fs.writeFileSync(manifest, renderedPngs.join('\n'), 'utf-8');
    const res = spawnSync(
      'python',
      [CONVERTER, '--manifest', manifest],
      { stdio: 'inherit' }
    );
    fs.unlinkSync(manifest);
    if (res.status !== 0) {
      console.error('[export] webp conversion failed — pngs left in place');
      process.exitCode = 1;
    }
  }

  // The index always covers the FULL source card list (not just the slice
  // this run processed), so chunked runs merge cleanly instead of clobbering.
  const indexName =
    opts.corpus === 'cbse'
      ? `class${opts.classLevel}_index.json`
      : `class${opts.classLevel}_index_${opts.corpus}.json`;
  const indexPath = path.join(opts.outDir, indexName);
  const rendered = new Set(index.map((e) => e.node_id));
  const indexDoc = {
    class: parseInt(opts.classLevel, 10),
    generated_at_iso: new Date().toISOString(),
    total: 0,
    size: { width: outW, height: outH },
    format: opts.format,
    source: srcPath,
    cards: [],
  };
  for (const card of src.cards || []) {
    const finalPath = path.join(outDir, `${card.node_id}.${ext}`);
    const exists = fs.existsSync(finalPath);
    if (!exists && !rendered.has(card.node_id)) continue; // not exported yet
    indexDoc.cards.push({
      node_id: card.node_id,
      title: card.title,
      subject: card.subject,
      chapter: card.chapter,
      png: finalPath,
      width: outW,
      height: outH,
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
