/**
 * sync-deploy — regenerate deploy/{backend,frontend,content} from the repo.
 *
 * deploy/ is a BUILD OUTPUT, not a second source tree: the three synced
 * trees are gitignored and rebuilt by this script; everything else in
 * deploy/ (Dockerfiles, compose files, *.example, README, cbse_data) is
 * deploy-owned config that sync never touches.
 *
 *   node scripts/sync-deploy.js          # mirror (create/update/delete)
 *   node scripts/sync-deploy.js --check  # report drift, write nothing
 *   node scripts/sync-deploy.js --check --quick  # fast drift gate (size-only, CI-safe)
 *
 * Deletions only ever happen inside the synced trees - deploy-owned files
 * at the deploy root are never removed.
 *
 * SAFETY: deploy/ is a build output, but some directories under it are NOT
 * regenerable from the repo — they hold corpora that exist only in deploy/
 * (e.g. content/cisce_nodes_v2 backs the live Qdrant "nodes" collection per
 * backend/services/qdrant_service.py). A blind mirror would DELETE them.
 * PROTECTED lists those paths; the sync refuses to remove them and fails loud
 * instead. Do not add a source-backed tree here — that defeats the mirror.
 */
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const DEPLOY = path.join(REPO, 'deploy');
const CHECK_ONLY = process.argv.includes('--check');
// --quick skips the sha1 of files whose SIZE already differs (those are being
// copied anyway, so hashing them is pure waste). Files whose size matches are
// STILL hashed, because a same-length content change is routine (a version
// string, a swapped identifier, "dev" -> "prd") and a size-only compare would
// report that as "in sync" — the exact false-negative a drift gate exists to
// prevent. So --quick is a speed optimisation, never a weaker verdict.
// It is only valid in dry-run: a real mirror must be authoritative (F2).
const QUICK = process.argv.includes('--quick');
if (QUICK && !CHECK_ONLY) {
    console.error('! --quick is only valid with --check. A real mirror must use full hashing.');
    process.exit(2);
}

/** dir names skipped anywhere in a synced tree */
const SKIP_DIRS = new Set([
    'node_modules', '.next', '__pycache__', '.pytest_cache', '.venv', 'venv',
    '_archive', '_dedupe_archive', 'c6_12_chem_backups', 'c6_12_chem_upgraded',
    'authored',           // generator sources — only needed to regenerate, not to build
]);
/** file names / patterns skipped anywhere */
const SKIP_FILES = [
    /^\.env/, /\.log$/, /\.tsbuildinfo$/, /\.raw$/, /^_batch\d*\.json$/,
    /^SIM_FILE_MAP\.json$/, /\.gen\.ts$/, /^tsconfig\.tsbuildinfo$/,
];
/** per-tree exclusions as relative path prefixes */
const TREE_SKIP = {
    backend: ['_cache', '.env'],
    frontend: ['.env.local', '.env.production', 'public/sims'],
    content: [],
};

/**
 * SYNCABLE: the ONLY top-level entries under a tree that this script may delete.
 *
 * The safety model is an allowlist, deliberately NOT a denylist. A denylist of
 * "known deploy-only data" fails open: the moment someone adds a new corpus to
 * deploy/, it is unprotected and the next mirror deletes it. An allowlist fails
 * closed — anything not named here is treated as deploy-owned and left alone.
 *
 * Under content/ only these four are mirrored from the repo; everything else in
 * deploy/content is deploy-owned live data. Known deploy-owned entries:
 *   cisce, cisce_nodes_md, cisce_nodes_v2  (Qdrant "nodes" collection +
 *     read-only host corpora; see backend/services/qdrant_service.py and
 *     deploy/docker-compose.prod.yml), plus index, nodes, practice_variants
 *     (documented corpora in docs/notes/FILE_MAP.md, currently empty).
 *
 * `null` means the WHOLE tree is mirrored (the normal case). Only `content`
 * uses an allowlist, because only content/ holds deploy-only data. An empty
 * array would be a bug: it would report every top-level dir as deploy-owned
 * while still deleting it, i.e. a false safety claim.
 */
const SYNCABLE = {
    content: ['doodle_cards', 'enhanced_nodes_md', 'marking_points', 'model_answers'],
    backend: null,
    frontend: null,
};

const isSkipped = (name, isDir) =>
    isDir ? SKIP_DIRS.has(name) : SKIP_FILES.some(re => re.test(name));

const relOf = (base, p) => path.relative(base, p).replace(/\\/g, '/');

const crypto = require('crypto');
// No cache. The source tree is immutable for the lifetime of a run, but a
// size+mtime cache key can serve a stale digest if a file is rewritten with an
// identical length inside one mtime tick, wrongly reporting it unchanged (F9).
// Hashing is the dominant cost of --check, so it must be correct first.
function hashFile(p) {
    return crypto.createHash('sha1').update(fs.readFileSync(p)).digest('hex');
}

function* walk(dir, skipPaths = [], base = dir, prefix = '') {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        // junctions/symlinks report isDirectory()=false — skipping them keeps
        // a linked node_modules from being treated as a stray file
        if (e.isSymbolicLink()) continue;
        const rel = prefix ? `${prefix}/${e.name}` : e.name;
        if (skipPaths.some(s => rel === s || rel.startsWith(s + '/'))) continue;
        if (isSkipped(e.name, e.isDirectory())) continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) yield* walk(p, skipPaths, base, rel);
        else yield p;
    }
}

/** Case-insensitive segment-boundary match. The FS is case-insensitive on
 * Windows, so a case-sensitive compare here would let a renamed
 * `CISCE_NODES_V2/` slip past the delete guard (F8). */
const underList = (rel, list) => {
    const r = rel.toLowerCase();
    return list.some((p) => {
        const q = p.toLowerCase();
        return r === q || r.startsWith(q + '/');
    });
};

/** Pre-flight only: no writes. Reports deploy-owned top-level entries under dst
 * that are not in SYNCABLE — they are safe (never deleted) but should be added
 * to SYNCABLE deliberately if they are ever meant to be mirrored. */
function auditDeployOwned(tree) {
    const dst = path.join(DEPLOY, tree);
    // A tree with no allowlist (null) is mirrored in full — nothing in it is
    // deploy-owned, so there is nothing to report.
    const allowed = SYNCABLE[tree];
    if (allowed === null || allowed === undefined) return [];
    if (!fs.existsSync(dst)) return [];
    const lower = allowed.map((s) => s.toLowerCase());
    const found = [];
    for (const e of fs.readdirSync(dst, { withFileTypes: true })) {
        if (!e.isDirectory() || e.isSymbolicLink()) continue;
        if (SKIP_DIRS.has(e.name)) continue;
        if (lower.includes(e.name.toLowerCase())) continue;
        found.push(e.name);
    }
    return found.sort();
}

function syncTree(tree) {
    const src = path.join(REPO, tree);
    const dst = path.join(DEPLOY, tree);
    const skipPaths = TREE_SKIP[tree] ?? [];
    // Allowlist: when an array, ONLY these top-level entries may be deleted and
    // everything else under deploy/ is deploy-owned and never removed (F4).
    // `null` (backend, frontend) means the whole tree is mirrored — do NOT
    // coalesce it to `[]`, that would make every entry look deploy-owned while
    // still deleting it: a false safety claim.
    const syncable = SYNCABLE[tree] ?? null;
    const stats = { copied: 0, deleted: 0, unchanged: 0, blocked: 0, sourceFiles: 0, deployOwned: [] };

    if (!fs.existsSync(src)) {
        // A missing source is NOT "in sync" — it must gate, or a CI runner with
        // no checkout silently reports a clean deploy.
        console.log(`! ${tree}: source missing — treating as BLOCKED, not clean.`);
        stats.blocked = 1;
        return stats;
    }

    stats.deployOwned = auditDeployOwned(tree);
    for (const d of stats.deployOwned) {
        console.log(`  ${tree}/${d} is deploy-owned (not in SYNCABLE) — never deleted by this script.`);
    }

    fs.mkdirSync(dst, { recursive: true });

    const seen = new Set();
    for (const absSrc of walk(src, skipPaths)) {
        const rel = relOf(src, absSrc);
        // Only mirror what is in the allowlist. When the tree has no allowlist
        // (null = mirror everything) there is nothing to filter.
        if (syncable && !underList(rel.split('/')[0], syncable)) continue;
        seen.add(rel);
        stats.sourceFiles++;
        const absDst = path.join(dst, rel);
        const s = fs.statSync(absSrc);
        let copy = true;
        if (fs.existsSync(absDst)) {
            const d = fs.statSync(absDst);
            // Size differs => definitely drifted, no hash needed.
            // Size matches => must hash. A same-length content edit is common
            // and would otherwise be reported as "in sync" (F1). --quick only
            // skips the hash on the size-mismatch path, which is already a
            // guaranteed copy, so the verdict is identical either way.
            copy = d.size !== s.size || hashFile(absSrc) !== hashFile(absDst);
            if (!copy) stats.unchanged++;
        }
        if (copy) {
            stats.copied++;
            if (!CHECK_ONLY) {
                fs.mkdirSync(path.dirname(absDst), { recursive: true });
                fs.copyFileSync(absSrc, absDst);
            }
        }
    }

    // Fail closed on an empty/absent source: `content/` is 100% gitignored, so
    // a fresh clone or CI runner can have the directory present but EMPTY. With
    // `seen` empty, the delete pass below would wipe the whole deploy tree (F5).
    if (stats.sourceFiles === 0) {
        console.log(`  ${tree}: source yielded 0 files — SKIPPING the delete pass (fail-closed).`);
        stats.blocked = 1;
        return stats;
    }

    // Delete dest files that no longer exist in source. Only inside SYNCABLE:
    // anything else under deploy/ is deploy-owned live data.
    const prune = [];
    // Prune deploy-owned top-level entries from the delete walk (F10).
    for (const d of stats.deployOwned) {
        if (syncable && underList(d, syncable)) continue;
        prune.push(d.toLowerCase());
    }
    for (const absDst of fs.existsSync(dst) ? walk(dst, skipPaths, prune) : []) {
        const rel = relOf(dst, absDst);
        if (syncable && !underList(rel.split('/')[0], syncable)) continue;
        if (!seen.has(rel)) {
            stats.deleted++;
            if (!CHECK_ONLY) fs.rmSync(absDst, { force: true });
        }
    }
    return stats;
}

console.log(CHECK_ONLY ? 'sync-deploy --check (dry run)' : 'sync-deploy');
const TREES = ['backend', 'frontend', 'content'];
let drift = false;
let blockedTotal = 0;

// ── PHASE 1: pre-flight every tree before mutating anything ──────────────
// Previously each tree's safety check ran inside its own syncTree call, so a
// problem found in `content` (processed last) was only detected AFTER
// deploy/backend and deploy/frontend had already been overwritten — a
// half-applied run that exits 1 (F7). Check all trees up front, and abort the
// whole run before the first write if any tree is unsafe.
const preflight = [];
for (const tree of TREES) {
    const src = path.join(REPO, tree);
    if (!fs.existsSync(src)) {
        console.log(`! ${tree}: source missing — treating as BLOCKED, not clean.`);
        preflight.push({ tree, blocked: 1 });
        continue;
    }
    const owned = auditDeployOwned(tree);
    preflight.push({ tree, blocked: 0, deployOwned: owned });
}
const preflightBlocked = preflight.reduce((n, p) => n + p.blocked, 0);
if (preflightBlocked && !CHECK_ONLY) {
    console.log(`\n${preflightBlocked} tree(s) unsafe — ABORTING before any write. deploy/ left untouched.`);
    process.exit(1);
}

// ── PHASE 2: sync ───────────────────────────────────────────────────────
for (const { tree, deployOwned } of preflight) {
    const t0 = Date.now();
    const s = syncTree(tree);
    if (s.copied || s.deleted) drift = true;
    blockedTotal += s.blocked;
    // Status must be explicit: a blocked tree and a clean tree both have
    // zeroed counters, so a reader of the summary alone could not tell them
    // apart (F6).
    const status = s.blocked
        ? `  !! BLOCKED (${s.blocked}) - not verified, not deleted`
        : (s.copied || s.deleted ? '  (drift)' : '');
    console.log(`${tree}: +${s.copied} copied, -${s.deleted} deleted, ` +
        `${s.unchanged} unchanged${status}  (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
if (blockedTotal) {
    console.log(`\n${blockedTotal} tree(s) BLOCKED — see above. Do not treat deploy/ as verified.`);
}
// --check exits 1 on drift so it can gate CI; a blocked tree always fails, in
// --check or not, because it means the mirror could not be verified.
process.exit((blockedTotal || (CHECK_ONLY && drift)) ? 1 : 0);
