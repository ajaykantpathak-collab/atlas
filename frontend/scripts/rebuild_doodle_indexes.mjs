#!/usr/bin/env node
/**
 * rebuild_doodle_indexes.mjs — regenerate class{N}_index.json from the ACTUAL
 * PNG files on disk + the current doodle_content_class{N}.json (pillar-4 fix:
 * indexes used to be exported-run artifacts that drifted from disk — stale
 * shelf copies and dead-node PNGs stayed listed; new nodes stayed unlisted).
 *
 * An entry is emitted for every PNG present in class{N}/ whose node_id is in
 * the content json (title/subject/chapter pulled from there). PNGs whose
 * node_id is NOT in any content json are reported as orphans (not indexed).
 * Content cards whose PNG is missing are reported as pending (not indexed —
 * DoodleCardImage renders nothing for them; export script fills them on the
 * next run).
 *
 * Usage: node scripts/rebuild_doodle_indexes.mjs [--public <dir>] [--content <dir>]
 * Default public dir: ../public/doodle_cards (relative to this script).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const PUBLIC_DIR = path.resolve(get('--public') || path.join(__dirname, '..', 'public', 'doodle_cards'));
const CONTENT_DIR = path.resolve(get('--content') || PUBLIC_DIR);

const WIDTH = 1080;
const HEIGHT = 1350;

const allIds = new Set();
const content = {};
for (let c = 6; c <= 12; c++) {
  const p = path.join(CONTENT_DIR, `doodle_content_class${c}.json`);
  if (!fs.existsSync(p)) {
    console.error(`[rebuild] missing ${p}`);
    process.exit(1);
  }
  const src = JSON.parse(fs.readFileSync(p, 'utf-8'));
  content[c] = new Map(src.cards.map((e) => [e.node_id, e]));
  src.cards.forEach((e) => allIds.add(e.node_id));
}

let totalOrphans = 0;
let totalPending = 0;
const homeMap = {};
for (let c = 6; c <= 12; c++) {
  const dirp = path.join(PUBLIC_DIR, `class${c}`);
  fs.mkdirSync(dirp, { recursive: true });
  const files = fs.readdirSync(dirp).filter((f) => f.endsWith('.png'));
  const orphans = [];
  const cards = [];
  const inContent = content[c];
  for (const f of files) {
    const nid = f.slice(0, -4);
    const meta = inContent.get(nid);
    if (!meta) {
      orphans.push(nid);
      continue;
    }
    cards.push({
      node_id: nid,
      title: meta.title,
      subject: meta.subject,
      chapter: meta.chapter,
      png: path.join(dirp, f),
      width: WIDTH,
      height: HEIGHT,
      exported: true,
    });
  }
  const pending = [...inContent.keys()].filter((nid) => !files.includes(`${nid}.png`));
  totalOrphans += orphans.length;
  totalPending += pending.length;
  const doc = {
    class: c,
    generated_at_iso: new Date().toISOString(),
    total: cards.length,
    size: { width: WIDTH, height: HEIGHT },
    source: 'rebuilt from actual PNG files on disk by scripts/rebuild_doodle_indexes.mjs',
    cards,
  };
  const outPath = path.join(PUBLIC_DIR, `class${c}_index.json`);
  fs.writeFileSync(outPath, JSON.stringify(doc, null, 1), 'utf-8');
  for (const card of cards) homeMap[card.node_id] = String(c);
  console.log(
    `[rebuild] class${c}: indexed=${cards.length} pending_export=${pending.length} orphans=${orphans.length}`
  );
  if (orphans.length) console.warn(`  orphan pngs (not indexed): ${orphans.slice(0, 8).join(', ')}${orphans.length > 8 ? ' …' : ''}`);
}
/* node_id -> shelf class, consumed by DoodleCardImage when the caller passes
   no classLevel (today / study session). ~330 KB JSON, one cached fetch. */
fs.writeFileSync(
  path.join(PUBLIC_DIR, 'doodle_home_map.json'),
  JSON.stringify(homeMap),
  'utf-8'
);
console.log(`[rebuild] DONE. orphans=${totalOrphans} pending_export=${totalPending} home_map=${Object.keys(homeMap).length}`);
