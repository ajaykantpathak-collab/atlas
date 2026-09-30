#!/usr/bin/env node
/**
 * check-tokens.js — Batch 1 "token lock".
 *
 * The design system in tailwind.config.js (brand / accent / mint / gold / sky /
 * surface) is the single source of truth for colour. This gate keeps raw hex
 * literals from leaking back into app/, components/ and lib/ — the way visual
 * drift and un-revisitable UI both start.
 *
 * RATCHET, not zero. The legacy tree already carries ~78k raw-hex occurrences
 * (canvas/pixi/three material params, generated sim JSON, canvasLab palettes).
 * Requiring zero would be unactionable, so the baseline is recorded in
 * scripts/tokens-baseline.json and the gate fails only on GROWTH:
 *   - new violation in a previously clean file  -> fail
 *   - total count above the locked baseline    -> fail
 * Fixing drift is then always safe: it only lowers the count, and
 * `--update-baseline` re-locks after a deliberate sweep.
 *
 *   node scripts/check-tokens.js               # ratchet gate, exit 1 on growth
 *   node scripts/check-tokens.js --report      # report only, always exit 0
 *   node scripts/check-tokens.js --update-baseline   # re-lock after a sweep
 */
'use strict';
const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, '..', 'frontend');
const BASELINE_FILE = path.join(__dirname, 'tokens-baseline.json');
const REPORT_ONLY = process.argv.includes('--report');
const UPDATE_BASELINE = process.argv.includes('--update-baseline');

const SCAN_DIRS = ['app', 'components', 'lib'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

// Skip build output, vendored trees and generated sim definitions.
const SKIP_DIRS = new Set(['node_modules', '.next', '.next-mobile', 'dist', 'out', '.git', 'public', '_generated']);
// Files allowed to hold raw hex: the token definitions themselves, inline SVG
// data-URIs and the canvas/DOM-palette code that must match a library's
// hardcoded colour space (Konva/pixi/three material params).
const ALLOW_FILES = [
  'tailwind.config.js',
  'app/globals.css',
  'components/sims_v2/engine/lexgen.ts',
];

// Deny-list: Lumen/Premium are frozen surfaces. The plan is to add performance
// guards and reuse Premium components — never to re-skin or rebuild them.
// The frozen tree is recorded as a MANIFEST (generated from the tree as it
// stands), so the gate means "no NEW files" rather than "only these N files".
// Adding a file here is how a silent rebuild starts; if one is genuinely
// required it must be reviewed and re-locked deliberately.
const DENY_MANIFEST = path.join(__dirname, 'frozen-surfaces.json');
const DENY_DIRS = ['components/lumen', 'components/premium'];

const HEX = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;
// Tailwind arbitrary values that bypass the palette: bg-[#abc123], text-[#...].
const ARBITRARY = /\b(?:bg|text|border|ring|from|via|to|shadow|fill|stroke|decoration|accent|caret|outline)-\[(&?\w+|#?[0-9a-fA-F]{3,8})\]/g;

const rel = (p) => path.relative(FRONTEND, p).replace(/\\/g, '/');
const allowed = (r) => ALLOW_FILES.some((a) => r === a || r.startsWith(a + '/'));

// Unfiltered walk — used for the frozen-surface manifest so shaders, .glsl and
// other non-JS assets are captured too.
function* walkAll(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isSymbolicLink()) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walkAll(p);
    } else {
      yield p;
    }
  }
}

function* walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isSymbolicLink()) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(p);
    } else if (SCAN_EXT.has(path.extname(e.name))) {
      yield p;
    }
  }
}

const violations = [];
let scanned = 0;

for (const d of SCAN_DIRS) {
  for (const abs of walk(path.join(FRONTEND, d))) {
    scanned++;
    const r = rel(abs);
    if (allowed(r)) continue;
    const src = fs.readFileSync(abs, 'utf8');
    src.split('\n').forEach((line, i) => {
      // Comments are documentation, not rendering — they may mention tokens.
      const code = line.replace(/^\s*(\/\/|\*|\/\*).*$/, '');
      HEX.lastIndex = 0;
      let m;
      while ((m = HEX.exec(code))) {
        violations.push({ file: r, line: i + 1, kind: 'raw-hex', token: m[0], text: line.trim().slice(0, 90) });
      }
      ARBITRARY.lastIndex = 0;
      while ((m = ARBITRARY.exec(code))) {
        violations.push({ file: r, line: i + 1, kind: 'arbitrary-color', token: m[0], text: line.trim().slice(0, 90) });
      }
    });
  }
}

// Deny-list: any file under a frozen surface that the manifest doesn't know
// about. Deletions are fine (that's de-duplication); additions are not.
let frozen = [];
if (fs.existsSync(DENY_MANIFEST)) {
  try { frozen = JSON.parse(fs.readFileSync(DENY_MANIFEST, 'utf8')).files || []; } catch { /* corrupt → rebuild */ }
}
const frozenSet = new Set(frozen);
const present = new Set();
for (const d of DENY_DIRS) {
  const base = path.join(FRONTEND, d);
  if (!fs.existsSync(base)) continue;
  for (const abs of walkAll(base)) present.add(rel(abs));
}
const newFrozen = [...present].filter((f) => !frozenSet.has(f)).sort();

if (UPDATE_BASELINE && !fs.existsSync(DENY_MANIFEST)) {
  fs.writeFileSync(DENY_MANIFEST, JSON.stringify({
    lockedAt: new Date().toISOString(),
    note: 'Frozen Lumen/Premium surface. Reuse + add perf guards; do not rebuild or re-skin.',
    files: [...present].sort(),
  }, null, 2) + '\n');
  console.log(`frozen-surfaces: manifest created, ${present.size} file(s) locked.`);
}

// ── ratchet comparison ───────────────────────────────────────
let baseline = { total: 0, byFile: {} };
if (fs.existsSync(BASELINE_FILE)) {
  try { baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')); } catch { /* corrupt → re-baseline */ }
}

const currentByFile = {};
for (const v of violations) currentByFile[v.file] = (currentByFile[v.file] || 0) + 1;
const currentTotal = violations.length;

if (UPDATE_BASELINE) {
  const files = Object.keys(currentByFile).sort();
  fs.writeFileSync(BASELINE_FILE, JSON.stringify({
    lockedAt: new Date().toISOString(),
    note: 'Ratchet floor. Re-lock only after a deliberate de-drift sweep; never raise it to make a failing build pass.',
    total: currentTotal,
    byFile: Object.fromEntries(files.map((f) => [f, currentByFile[f]])),
  }, null, 2) + '\n');
  console.log(`check-tokens: baseline re-locked at ${currentTotal} across ${files.length} file(s).`);
  process.exit(0);
}

const regressed = [];
for (const [f, n] of Object.entries(currentByFile)) {
  const was = baseline.byFile[f] ?? 0;
  if (n > was) regressed.push({ file: f, was, now: n });
}
regressed.sort((a, b) => (b.now - b.was) - (a.now - a.was));

const grew = currentTotal > baseline.total;
const report = [];
report.push(`check-tokens: ${scanned} files scanned`);
report.push(`  raw-hex occurrences: ${currentTotal} (baseline ${baseline.total}, delta ${currentTotal - baseline.total >= 0 ? '+' : ''}${currentTotal - baseline.total})`);
report.push(`  regressed files: ${regressed.length}`);

if (regressed.length) {
  report.push('\n  These files gained raw hex — use a token or extend tailwind.config.js:');
  for (const r of regressed.slice(0, 20)) {
    report.push(`    ${r.file}  ${r.was} -> ${r.now}  (+${r.now - r.was})`);
  }
  if (regressed.length > 20) report.push(`    … ${regressed.length - 20} more`);
}

if (newFrozen.length) {
  report.push(`\n  DENY-LIST: ${newFrozen.length} new file(s) under frozen Lumen/Premium surfaces:`);
  for (const f of newFrozen) report.push(`    ${f}`);
}

// Top existing offenders, so the sweep order is obvious.
const top = Object.entries(currentByFile).sort((a, b) => b[1] - a[1]).slice(0, 10);
if (top.length) {
  report.push('\n  largest existing debt (de-drift targets):');
  for (const [f, n] of top) report.push(`    ${n.toString().padStart(6)}  ${f}`);
}

console.log(report.join('\n'));

const fail = grew || regressed.length > 0 || newFrozen.length > 0;
if (fail && !REPORT_ONLY) {
  console.log('\nRatchet violated: raw hex is growing. Fix the listed files, or run');
  console.log('  node scripts/check-tokens.js --update-baseline');
  console.log('only if the growth was deliberate and reviewed.');
  process.exit(1);
}
process.exit(0);
