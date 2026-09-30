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
  // Both corpora share the class{N} shelves: CBSE ids (c10_bio_…) and CISCE
  // ids (c10_bio_icse_… / c11_hist_isc_…) are disjoint by the board token,
  // so one merged per-class map is collision-free. A class errors out only
  // when NEITHER corpus content file exists for it.
  const files = [
    `doodle_content_class${c}.json`,
    `doodle_content_cisce_class${c}.json`,
  ];
  const maps = [];
  for (const f of files) {
    const p = path.join(CONTENT_DIR, f);
    if (!fs.existsSync(p)) continue;
    const src = JSON.parse(fs.readFileSync(p, 'utf-8'));
    maps.push(new Map(src.cards.map((e) => [e.node_id, e])));
    src.cards.forEach((e) => allIds.add(e.node_id));
  }
  if (maps.length === 0) {
    console.error(`[rebuild] missing all of ${files.join(', ')} for class ${c}`);
    process.exit(1);
  }
  content[c] = new Map(maps.flatMap((m) => [...m.entries()]));
}

let totalOrphans = 0;
let totalPending = 0;
const homeMap = {};
const boardOf = (nid) =>
  nid.includes('_icse_') ? 'ICSE' : nid.includes('_isc_') ? 'ISC' : 'CBSE';
for (let c = 6; c <= 12; c++) {
  const dirp = path.join(PUBLIC_DIR, `class${c}`);
  fs.mkdirSync(dirp, { recursive: true });
  // scan both formats: webp is the corpus standard (720x900), legacy png
  // cards stay indexed until their conversion lands. webp wins if both exist.
  const byId = {};
  for (const f of fs.readdirSync(dirp)) {
    const m = f.match(/^(.+)\.(png|webp)$/);
    if (!m) continue;
    const nid = m[1];
    const prev = byId[nid];
    if (!prev || (m[2] === 'webp' && prev.ext === 'png')) byId[nid] = { ext: m[2], file: f };
  }
  const orphans = [];
  const cards = [];
  const inContent = content[c];
  for (const nid of Object.keys(byId)) {
    const { ext, file } = byId[nid];
    const meta = inContent.get(nid);
    if (!meta) {
      orphans.push(nid);
      continue;
    }
    const isWebp = ext === 'webp';
    cards.push({
      node_id: nid,
      title: meta.title,
      subject: meta.subject,
      chapter: meta.chapter,
      boards: [boardOf(nid)],
      png: path.join(dirp, file),
      width: isWebp ? 720 : WIDTH,
      height: isWebp ? 900 : HEIGHT,
      format: ext,
      exported: true,
    });
  }
  const have = new Set(Object.keys(byId));
  const pending = [...inContent.keys()].filter((nid) => !have.has(nid));
  totalOrphans += orphans.length;
  totalPending += pending.length;
  const doc = {
    class: c,
    generated_at_iso: new Date().toISOString(),
    total: cards.length,
    size: { width: 720, height: 900 },
    formats: { webp: cards.filter((x) => x.format === 'webp').length, png: cards.filter((x) => x.format === 'png').length },
    source: 'rebuilt from actual card files on disk by scripts/rebuild_doodle_indexes.mjs',
    cards,
  };
  const outPath = path.join(PUBLIC_DIR, `class${c}_index.json`);
  fs.writeFileSync(outPath, JSON.stringify(doc, null, 1), 'utf-8');
  for (const card of cards) homeMap[card.node_id] = String(c);
  console.log(
    `[rebuild] class${c}: indexed=${cards.length} (webp=${doc.formats.webp} png=${doc.formats.png}) pending_export=${pending.length} orphans=${orphans.length}`
  );
  if (orphans.length) console.warn(`  orphan cards (not indexed): ${orphans.slice(0, 8).join(', ')}${orphans.length > 8 ? ' …' : ''}`);
}
/* node_id -> shelf class, consumed by DoodleCardImage when the caller passes
   no classLevel (today / study session). ~330 KB JSON, one cached fetch. */
fs.writeFileSync(
  path.join(PUBLIC_DIR, 'doodle_home_map.json'),
  JSON.stringify(homeMap),
  'utf-8'
);
console.log(`[rebuild] DONE. orphans=${totalOrphans} pending_export=${totalPending} home_map=${Object.keys(homeMap).length}`);
