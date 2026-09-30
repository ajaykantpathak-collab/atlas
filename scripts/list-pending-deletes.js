/**
 * list-pending-deletes.js — READ-ONLY companion to sync-deploy.
 *
 * Prints exactly which files a real `node scripts/sync-deploy.js` would delete,
 * without deleting anything. Any sync that reports a non-zero delete count
 * MUST be inspected with this first — a mirror on a tree with deploy-only data
 * can wipe live corpora (see PROTECTED in sync-deploy.js).
 *
 *   node scripts/list-pending-deletes.js            # all trees
 *   node scripts/list-pending-deletes.js content    # one tree
 *   node scripts/list-pending-deletes.js content -v # include the protected set
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const DEPLOY = path.join(REPO, 'deploy');
const VERBOSE = process.argv.includes('-v');
const TREES = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const TARGETS = TREES.length ? TREES : ['backend', 'frontend', 'content'];

// Mirrors of sync-deploy.js — keep in sync if that file changes.
const SKIP_DIRS = new Set([
    'node_modules', '.next', '__pycache__', '.pytest_cache', '.venv', 'venv',
    '_archive', '_dedupe_archive', 'c6_12_chem_backups', 'c6_12_chem_upgraded',
    'authored',
]);
const SKIP_FILES = [
    /^\.env/, /\.log$/, /\.tsbuildinfo$/, /\.raw$/, /^_batch\d*\.json$/,
    /^SIM_FILE_MAP\.json$/, /\.gen\.ts$/, /^tsconfig\.tsbuildinfo$/,
];
const TREE_SKIP = {
    backend: ['_cache', '.env'],
    frontend: ['.env.local', '.env.production', 'public/sims'],
    content: [],
};
const PROTECTED = ['cisce', 'cisce_nodes_md', 'cisce_nodes_v2'];

const isSkipped = (name, isDir) =>
    isDir ? SKIP_DIRS.has(name) : SKIP_FILES.some((re) => re.test(name));
const relOf = (base, p) => path.relative(base, p).replace(/\\/g, '/');

function* walk(dir, skipPaths = [], prefix = '') {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isSymbolicLink()) continue;
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (skipPaths.some((s) => rel === s || rel.startsWith(s + '/'))) continue;
    if (isSkipped(e.name, e.isDirectory())) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p, skipPaths, rel);
    else yield p;
  }
}

let totalPending = 0;
for (const tree of TARGETS) {
  const src = path.join(REPO, tree);
  const dst = path.join(DEPLOY, tree);
  if (!fs.existsSync(src) || !fs.existsSync(dst)) {
    console.log(`! ${tree}: missing src or dst — skipped`);
    continue;
  }
  const skipPaths = TREE_SKIP[tree] ?? [];
  const protectedPaths = tree === 'content' ? PROTECTED : [];

  const seen = new Set();
  for (const abs of walk(src, skipPaths)) seen.add(relOf(src, abs));

  const pending = [];
  let protectedCount = 0;
  for (const absDst of walk(dst, skipPaths)) {
    const rel = relOf(dst, absDst);
    if (protectedPaths.some((p) => rel === p || rel.startsWith(p + '/'))) { protectedCount++; continue; }
    if (!seen.has(rel)) pending.push(rel);
  }

  totalPending += pending.length;
  console.log(`\n=== ${tree}: ${pending.length} file(s) would be deleted, ${protectedCount} protected file(s) spared`);
  if (protectedCount && VERBOSE) console.log(`    (protected: ${protectedPaths.join(', ')})`);

  if (pending.length) {
    // Group by top-level folder so the shape of the drift is obvious.
    const byTop = new Map();
    for (const rel of pending) {
      const top = rel.includes('/') ? rel.slice(0, rel.indexOf('/')) : '(root)';
      if (!byTop.has(top)) byTop.set(top, []);
      byTop.get(top).push(rel);
    }
    for (const [top, list] of [...byTop.entries()].sort((a, b) => b[1].length - a[1].length)) {
      console.log(`  ${top}/  (${list.length})`);
      for (const rel of list.slice(0, 12)) console.log(`      ${rel}`);
      if (list.length > 12) console.log(`      … ${list.length - 12} more`);
    }
  }
}

console.log(`\nTOTAL pending deletions: ${totalPending}`);
console.log('This script only reads. Nothing was modified.');
process.exit(0);
