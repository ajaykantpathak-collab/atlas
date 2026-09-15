/**
 * build_simindex.mjs — metadata-only registry. Scans generated v3/v3w
 * sim files and emits SIM_INDEX.json: id → {t, c, s, n, ch}.
 * Routes/catalog/routing resolve metadata from this tiny map instead
 * of statically importing 2,374 full SimDef modules.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS = path.resolve(HERE, '..');
const OUT = path.join(SIMS, 'SIM_INDEX.json');

const index = {};
for (const clsDir of fs.readdirSync(SIMS).filter(d => /^class\d+$/.test(d))) {
    for (const sub of ['v3', 'v3w']) {
        const dir = path.join(SIMS, clsDir, sub);
        if (!fs.existsSync(dir)) continue;
        for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.ts'))) {
            const src = fs.readFileSync(path.join(dir, f), 'utf8');
            const id = src.match(/id: '([^']+)'/)?.[1];
            if (!id) continue;
            const title = src.match(/title: '([^']+)'/)?.[1] ?? f.replace(/\.ts$/, '');
            const cls = +(src.match(/classLevel: (\d+)/)?.[1] ?? 0);
            const subj = src.match(/subject: '([^']+)'/)?.[1] ?? '';
            const nodes = src.match(/nodeIds: \[([^\]]*)\]/)?.[1].match(/'([^']+)'/g)?.map(x => x.slice(1, -1)) ?? [];
            const chap = src.match(/chapters: \['([^']+)'\]/)?.[1] ?? '';
            const sub = src.match(/subtitle: '([^']+)'/)?.[1] ?? '';
            index[id] = { t: title, c: cls, s: subj, n: nodes, ch: chap, d: sub };
        }
    }
}
fs.writeFileSync(OUT, JSON.stringify(index));
console.log(`SIM_INDEX: ${Object.keys(index).length} sims → ${path.relative(process.cwd(), OUT)} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(1)}MB)`);
