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

// single-quoted TS string capture that survives escaped quotes/apostrophes
// ("Valli\'s ..." must not truncate at the \'), then unescaped.
const SQ_STR = String.raw`'((?:[^'\\]|\\.)*)'`;
const unesc = (s) => s.replace(/\\(['\\])/g, '$1');
// double-quoted JSON string capture (generated packs), JSON.parse-decoded.
const DQ_STR = String.raw`"((?:[^"\\]|\\.)*)"`;

function indexFile(src, fallbackName) {
    // a .ts file may export MULTIPLE SimDefs (junior root files like
    // class1/maths.ts hold every chapter) — split on `export const` so each
    // SimDef's own fields are parsed in isolation.
    const marks = [...src.matchAll(/export const \w+/g)].map(m => m.index);
    for (let i = 0; i < marks.length; i++) {
        const seg = src.slice(marks[i], marks[i + 1] ?? src.length);
        const id = seg.match(new RegExp(`id: ${SQ_STR}`))?.[1];
        const clsStr = seg.match(/classLevel: (\d+)/)?.[1];
        if (!id || !clsStr || index[id]) continue;
        const title = seg.match(new RegExp(`title: ${SQ_STR}`))?.[1];
        const subj = seg.match(new RegExp(`subject: ${SQ_STR}`))?.[1] ?? '';
        const nodes = seg.match(/nodeIds: \[([^\]]*)\]/)?.[1].match(/'([^']+)'/g)?.map(x => x.slice(1, -1)) ?? [];
        const chap = seg.match(new RegExp(`chapters: \\[${SQ_STR}\\]`))?.[1] ?? '';
        const sub = seg.match(new RegExp(`subtitle: ${SQ_STR}`))?.[1] ?? '';
        index[id] = { t: title ? unesc(title) : fallbackName, c: +clsStr, s: unesc(subj), n: nodes, ch: unesc(chap), d: unesc(sub) };
    }
}

function indexGeneratedFile(src, fallbackName) {
    // generated/<cls>_<subj>_gen.ts files hold `export const X: SimDef[] = [ ... ]`
    // — JSON-style defs with double-quoted fields. Split on `"id":` anchors.
    // `_p<N>` part-suffixes are top-level defs too (e.g. gen_c8_eng_ch01_p1);
    // nested challenge ids (…_q<N>) still fail the filter and never anchor.
    const marks = [...src.matchAll(/"id": "([^"]+)"/g)]
        .filter(m => /^gen_c\d+_[a-z_]+_ch\d+(_p\d+)?$/.test(m[1]))
        .map(m => m.index);
    for (let i = 0; i < marks.length; i++) {
        const seg = src.slice(marks[i], marks[i + 1] ?? src.length);
        // keep only segments that look like a top-level SimDef (have classLevel
        // before any nested challenge/option id fields confuse the parse)
        const id = seg.match(/"id": "([^"]+)"/)?.[1];
        const clsStr = seg.match(/"classLevel": (\d+)/)?.[1];
        if (!id || !clsStr || index[id]) continue;
        // JSON string fields may hold escaped quotes ("\"Before You Read");
        // capture the full escaped run and JSON.parse-decode it.
        const dq = (re) => {
            const m = seg.match(re)?.[1];
            if (m === undefined) return undefined;
            try { return JSON.parse(`"${m}"`); } catch { return m; }
        };
        const title = dq(new RegExp(`"title": ${DQ_STR}`));
        const subj = dq(new RegExp(`"subject": ${DQ_STR}`)) ?? '';
        const nodes = seg.match(/"nodeIds": \[([^\]]*)\]/)?.[1].match(/"([^"]+)"/g)?.map(x => x.slice(1, -1)) ?? [];
        const chap = dq(new RegExp(`"chapters": \\[${DQ_STR}\\]`)) ?? '';
        const sub = dq(new RegExp(`"subtitle": ${DQ_STR}`)) ?? '';
        index[id] = { t: title ?? fallbackName, c: +clsStr, s: subj, n: nodes, ch: chap, d: sub };
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
