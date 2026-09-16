const fs = require('fs'), path = require('path');
const SKIP_DIRS = new Set(['node_modules', '.next', '__pycache__', '.pytest_cache', '.venv', 'venv', '_archive', '_dedupe_archive', 'c6_12_chem_backups', 'c6_12_chem_upgraded', 'authored']);
const SKIP_FILES = [/^\.env/, /\.log$/, /\.tsbuildinfo$/, /\.raw$/, /^_batch\d*\.json$/, /^SIM_FILE_MAP\.json$/, /\.gen\.ts$/];
function* walk(dir) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) yield* walk(p) } else if (!SKIP_FILES.some(r => r.test(e.name))) yield p } }
const src = 'content', dst = 'deploy/content';
const srcSet = new Set(); for (const f of walk(src)) srcSet.add(path.relative(src, f).replace(/\\/g, '/'));
const extra = {};
for (const f of walk(dst)) {
    const r = path.relative(dst, f).replace(/\\/g, '/');
    if (!srcSet.has(r)) extra[r.split('/')[0]] = (extra[r.split('/')[0]] || 0) + 1;
}
console.log('deploy-only by top dir:', extra);
// and reverse: repo-only
const dstSet = new Set(); for (const f of walk(dst)) dstSet.add(path.relative(dst, f).replace(/\\/g, '/'));
const missing = {};
for (const f of walk(src)) {
    const r = path.relative(src, f).replace(/\\/g, '/');
    if (!dstSet.has(r)) missing[r.split('/')[0]] = (missing[r.split('/')[0]] || 0) + 1;
}
console.log('repo-only by top dir:', missing);
