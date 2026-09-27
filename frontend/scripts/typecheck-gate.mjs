#!/usr/bin/env node
/**
 * typecheck-gate.mjs — the "tsc baseline" CI gate.
 *
 * The tree does not typecheck clean today, and a wall of pre-existing errors is
 * not a usable gate: it trains everyone to ignore it. So this is a RATCHET.
 * The first run records every current error in scripts/typecheck-baseline.json
 * (code + file + line, so a real regression is distinguishable from churn).
 * After that the gate fails only when:
 *   - a NEW error appears (an error code/file/line not in the baseline), or
 *   - the total error count grows.
 * Fixing errors is always safe: it only lowers the count. Re-lock deliberately
 * with --update-baseline after a sweep you have reviewed.
 *
 * Runs tsc with an 8GB heap. Node's default ~4GB is NOT enough — the default
 * run OOMs after ~9 minutes with "Ineffective mark-compacts near heap limit".
 *
 *   node scripts/typecheck-gate.mjs
 *   node scripts/typecheck-gate.mjs --update-baseline
 *   node scripts/typecheck-gate.mjs --report
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND = path.resolve(HERE, '..');
const BASELINE = path.join(HERE, 'typecheck-baseline.json');
const UPDATE = process.argv.includes('--update-baseline');
const REPORT = process.argv.includes('--report');

console.log('typecheck-gate: running tsc (this takes several minutes)...');
const t0 = Date.now();

const res = spawnSync(
    process.execPath,
    ['--max-old-space-size=8192', path.join(FRONTEND, 'node_modules', 'typescript', 'bin', 'tsc'), '--noEmit', '--pretty', 'false'],
    { cwd: FRONTEND, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, shell: false }
);

const out = `${res.stdout || ''}${res.stderr || ''}`;
const secs = ((Date.now() - t0) / 1000).toFixed(1);

if (res.error) {
    console.error(`typecheck-gate: tsc failed to start: ${res.error.message}`);
    process.exit(1);
}

// An OOM is a distinct failure from "has type errors" — never treat it as a
// passing baseline, or the next run would lock in a bogus zero.
if (/heap out of memory|Ineffective mark-compacts|FATAL ERROR/.test(out)) {
    console.error(`typecheck-gate: tsc ran out of memory after ${secs}s.`);
    console.error('  Raise --max-old-space-size above 8192, or narrow tsconfig include/exclude.');
    process.exit(1);
}

// "file(line,col): error TS1234: msg"  and  the multi-line "error TS1234:" form.
const current = new Set();
const codes = new Map();
for (const line of out.split('\n')) {
    const m = line.match(/^(.+?)\((\d+),\d+\):\s+error\s+(TS\d+):/);
    if (!m) continue;
    const key = `${m[3]}|${m[1].replace(/\\/g, '/')}|${m[2]}`;
    current.add(key);
    codes.set(m[3], (codes.get(m[3]) || 0) + 1);
}

const currentList = [...current].sort();
const total = currentList.length;

if (UPDATE) {
    const byCode = {};
    for (const k of currentList) {
        const c = k.split('|')[0];
        byCode[c] = (byCode[c] || 0) + 1;
    }
    fs.writeFileSync(BASELINE, JSON.stringify({
        lockedAt: new Date().toISOString(),
        note: 'Type-error ratchet floor. Re-lock only after a deliberate fix sweep; never raise it to make a failing build pass.',
        total,
        byCode,
        errors: currentList,
    }, null, 2) + '\n');
    console.log(`typecheck-gate: baseline re-locked at ${total} error(s) in ${secs}s.`);
    process.exit(0);
}

let base = { total: 0, errors: [] };
if (fs.existsSync(BASELINE)) {
    try { base = JSON.parse(fs.readFileSync(BASELINE, 'utf8')); } catch { console.error('typecheck-gate: baseline unreadable — run --update-baseline'); process.exit(1); }
}
const known = new Set(base.errors || []);
const fresh = currentList.filter((k) => !known.has(k));
const fixedCount = (base.errors || []).filter((k) => !current.has(k)).length;

console.log(`typecheck-gate: ${total} error(s) in ${secs}s (baseline ${base.total}, delta ${total - base.total >= 0 ? '+' : ''}${total - base.total})`);
console.log(`  new: ${fresh.length}   fixed since baseline: ${fixedCount}`);

if (fresh.length) {
    console.log('\n  NEW type errors (regression — these are not in the baseline):');
    for (const k of fresh.slice(0, 30)) console.log(`    ${k.replace(/\|/g, '  ')}`);
    if (fresh.length > 30) console.log(`    … ${fresh.length - 30} more`);
}
if (fixedCount > 0 && !fresh.length) {
    console.log('\n  Good — strictly better than baseline. Re-lock with --update-baseline to bank the gain.');
}

if (codes.size) {
    const top = [...codes.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    console.log('\n  largest error groups (fix targets):');
    for (const [c, n] of top) console.log(`    ${n.toString().padStart(5)}  ${c}`);
}

const fail = fresh.length > 0 || total > base.total;
if (fail && !REPORT) {
    console.log('\nType ratchet violated. Fix the new errors listed above.');
    process.exit(1);
}
process.exit(0);
