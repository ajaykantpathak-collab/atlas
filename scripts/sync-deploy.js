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
 *
 * Deletions only ever happen inside the synced trees — deploy-owned files
 * at the deploy root are never removed.
 */
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const DEPLOY = path.join(REPO, 'deploy');
const CHECK_ONLY = process.argv.includes('--check');

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

const isSkipped = (name, isDir) =>
    isDir ? SKIP_DIRS.has(name) : SKIP_FILES.some(re => re.test(name));

const relOf = (base, p) => path.relative(base, p).replace(/\\/g, '/');

const crypto = require('crypto');
const _hashCache = new Map();
function hashFile(p) {
    const st = fs.statSync(p);
    const key = `${p}|${st.size}|${st.mtimeMs}`;
    let h = _hashCache.get(key);
    if (!h) {
        h = crypto.createHash('sha1').update(fs.readFileSync(p)).digest('hex');
        _hashCache.set(key, h);
    }
    return h;
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

function syncTree(tree) {
    const src = path.join(REPO, tree);
    const dst = path.join(DEPLOY, tree);
    const skipPaths = TREE_SKIP[tree] ?? [];
    const stats = { copied: 0, deleted: 0, unchanged: 0 };

    if (!fs.existsSync(src)) { console.log(`! ${tree}: source missing`); return stats; }
    fs.mkdirSync(dst, { recursive: true });

    const seen = new Set();
    for (const absSrc of walk(src, skipPaths)) {
        const rel = relOf(src, absSrc);
        seen.add(rel);
        const absDst = path.join(dst, rel);
        const s = fs.statSync(absSrc);
        let copy = true;
        if (fs.existsSync(absDst)) {
            const d = fs.statSync(absDst);
            // same-size files are hash-compared so identical content is never
            // recopied just because mtimes differ between the trees
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

    // delete dest files that no longer exist in source (skipPaths apply too,
    // so previously-synced-now-excluded files get cleaned)
    for (const absDst of fs.existsSync(dst) ? walk(dst, skipPaths) : []) {
        const rel = relOf(dst, absDst);
        if (!seen.has(rel)) {
            stats.deleted++;
            if (!CHECK_ONLY) fs.rmSync(absDst, { force: true });
        }
    }
    return stats;
}

console.log(CHECK_ONLY ? 'sync-deploy --check (dry run)' : 'sync-deploy');
let drift = false;
for (const tree of ['backend', 'frontend', 'content']) {
    const t0 = Date.now();
    const s = syncTree(tree);
    if (s.copied || s.deleted) drift = true;
    console.log(`${tree}: +${s.copied} copied, -${s.deleted} deleted, ` +
        `${s.unchanged} unchanged  (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
process.exit(CHECK_ONLY && drift ? 1 : 0);
