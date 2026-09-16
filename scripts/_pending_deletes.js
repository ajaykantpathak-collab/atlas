const fs = require('fs'), path = require('path');
const SKIP_DIRS = new Set(['node_modules', '.next', '__pycache__', '.pytest_cache', '.venv', 'venv', '_archive', '_dedupe_archive', 'c6_12_chem_backups', 'c6_12_chem_upgraded', 'authored']);
const SKIP_FILES = [/^\.env/, /\.log$/, /\.tsbuildinfo$/, /\.raw$/, /^_batch\d*\.json$/, /^SIM_FILE_MAP\.json$/, /\.gen\.ts$/];
const TREE_SKIP = { backend: ['_cache', '.env', 'db/migrations', 'alembic.ini'], frontend: ['.env.local', '.env.production', 'public/sims'], content: [] };
function* walk(dir, skipPaths = [], prefix = '') {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const rel = prefix ? prefix + '/' + e.name : e.name;
        if (skipPaths.some(s => rel === s || rel.startsWith(s + '/'))) continue;
        if (e.isDirectory() ? SKIP_DIRS.has(e.name) : SKIP_FILES.some(r => r.test(e.name))) continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) yield* walk(p, skipPaths, rel); else yield p;
    }
}
for (const tree of ['backend', 'frontend']) {
    const src = tree, dst = 'deploy/' + tree;
    const srcSet = new Set();
    for (const f of walk(src)) srcSet.add(path.relative(src, f).replace(/\\/g, '/'));
    const del = [];
    for (const f of walk(dst, TREE_SKIP[tree])) {
        const r = path.relative(dst, f).replace(/\\/g, '/');
        if (!srcSet.has(r)) del.push(r);
    }
    console.log(`=== ${tree}: ${del.length} pending deletes ===`);
    del.slice(0, 40).forEach(d => console.log(' ', d));
    if (del.length > 40) console.log(`  …+${del.length - 40} more`);
}
// content: verify every deploy-only file exists under _trash/content
const srcSet = new Set(); for (const f of walk('content')) srcSet.add(path.relative('content', f).replace(/\\/g, '/'));
const trashSet = new Set(); try { for (const f of walk('_trash/content')) trashSet.add(path.relative('_trash/content', f).replace(/\\/g, '/')); } catch {}
let inTrash = 0, orphan = [];
for (const f of walk('deploy/content')) {
    const r = path.relative('deploy/content', f).replace(/\\/g, '/');
    if (!srcSet.has(r)) { if (trashSet.has(r)) inTrash++; else orphan.push(r); }
}
console.log(`=== content: ${inTrash + orphan.length} deploy-only; ${inTrash} preserved in _trash/, ${orphan.length} NOT preserved ===`);
orphan.slice(0, 30).forEach(o => console.log('  ORPHAN:', o));
