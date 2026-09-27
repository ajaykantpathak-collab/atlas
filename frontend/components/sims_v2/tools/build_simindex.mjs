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

function indexFile(src, fallbackName) {
    // a .ts file may export MULTIPLE SimDefs (junior root files like
    // class1/maths.ts hold every chapter) — split on `export const` so each
    // SimDef's own fields are parsed in isolation.
    const marks = [...src.matchAll(/export const \w+/g)].map(m => m.index);
    for (let i = 0; i < marks.length; i++) {
        const seg = src.slice(marks[i], marks[i + 1] ?? src.length);
        const id = seg.match(/id: '([^']+)'/)?.[1];
        const clsStr = seg.match(/classLevel: (\d+)/)?.[1];
        if (!id || !clsStr || index[id]) continue;
        const title = seg.match(/title: '([^']+)'/)?.[1] ?? fallbackName;
        const subj = seg.match(/subject: '([^']+)'/)?.[1] ?? '';
        const nodes = seg.match(/nodeIds: \[([^\]]*)\]/)?.[1].match(/'([^']+)'/g)?.map(x => x.slice(1, -1)) ?? [];
        const chap = seg.match(/chapters: \['([^']+)'\]/)?.[1] ?? '';
        const sub = seg.match(/subtitle: '([^']+)'/)?.[1] ?? '';
        index[id] = { t: title, c: +clsStr, s: subj, n: nodes, ch: chap, d: sub };
    }
}

function indexGeneratedFile(src, fallbackName) {
    // generated/<cls>_<subj>_gen.ts files hold `export const X: SimDef[] = [ ... ]`
    // — JSON-style defs with double-quoted fields. Split on `"id":` anchors.
    const marks = [...src.matchAll(/"id": "([^"]+)"/g)]
        .filter(m => /^gen_c\d+_[a-z_]+_ch\d+$/.test(m[1]))
        .map(m => m.index);
    for (let i = 0; i < marks.length; i++) {
        const seg = src.slice(marks[i], marks[i + 1] ?? src.length);
        // keep only segments that look like a top-level SimDef (have classLevel
        // before any nested challenge/option id fields confuse the parse)
        const id = seg.match(/"id": "([^"]+)"/)?.[1];
        const clsStr = seg.match(/"classLevel": (\d+)/)?.[1];
        if (!id || !clsStr || index[id]) continue;
        const title = seg.match(/"title": "([^"]+)"/)?.[1] ?? fallbackName;
        const subj = seg.match(/"subject": "([^"]+)"/)?.[1] ?? '';
        const nodes = seg.match(/"nodeIds": \[([^\]]*)\]/)?.[1].match(/"([^"]+)"/g)?.map(x => x.slice(1, -1)) ?? [];
        const chap = seg.match(/"chapters": \["([^"]+)"\]/)?.[1] ?? '';
        const sub = seg.match(/"subtitle": "([^"]+)"/)?.[1] ?? '';
        index[id] = { t: title, c: +clsStr, s: subj, n: nodes, ch: chap, d: sub };
    }
}

const genDir = path.join(SIMS, 'generated');
if (fs.existsSync(genDir)) {
    for (const f of fs.readdirSync(genDir).filter(x => x.endsWith('.ts'))) {
        indexGeneratedFile(fs.readFileSync(path.join(genDir, f), 'utf8'), f.replace(/\.ts$/, ''));
    }
}

for (const clsDir of fs.readdirSync(SIMS).filter(d => /^class\d+$/.test(d))) {
    // junior authored sims live at class<N>/*.ts (multi-export files)
    for (const f of fs.readdirSync(path.join(SIMS, clsDir)).filter(x => x.endsWith('.ts'))) {
        indexFile(fs.readFileSync(path.join(SIMS, clsDir, f), 'utf8'), f.replace(/\.ts$/, ''));
    }
    for (const sub of ['v3', 'v3w']) {
        const dir = path.join(SIMS, clsDir, sub);
        if (!fs.existsSync(dir)) continue;
        for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.ts'))) {
            indexFile(fs.readFileSync(path.join(dir, f), 'utf8'), f.replace(/\.ts$/, ''));
        }
    }
}
fs.writeFileSync(OUT, JSON.stringify(index));
console.log(`SIM_INDEX: ${Object.keys(index).length} sims → ${path.relative(process.cwd(), OUT)} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(1)}MB)`);
