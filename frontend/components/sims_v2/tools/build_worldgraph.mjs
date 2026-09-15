/**
 * build_worldgraph.mjs — lay the 9,010-node corpus out as a 3D galaxy.
 * Emits components/world/GALAXY.json:
 *   nodes: [{ id, cls, subj, chap, pos:[x,y,z], sim }]
 *   edges: [[i,j], ...]            prereq/forward links (node indices)
 * Layout: class rings × subject sectors; each chapter is a small
 * constellation spiral. Deterministic — same input, same universe.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS = path.resolve(HERE, '..');
const MD_DIR = process.env.SIM_MD_CACHE ?? 'C:\\Users\\Alesha4285\\Desktop\\enhanced_nodes\\md_cache';
const OUT = path.resolve(SIMS, '..', 'world', 'GALAXY.json');

const PATS = [
    /^c(?<cls>\d+)_(?<subj>.+)_cbse_(?<chap>\d+)_(?<num>\d+)$/,
    /^c(?<cls>\d+)_(?<subj>.+?)_ch0*(?<chap>\d+)_(?<num>\d+)$/,
    /^c(?<cls>\d+)_(?<subj>.+?)_u0*(?<chap>\d+)_(?<num>\d+)$/,
];
const parse = (stem) => {
    if (stem.endsWith('_comp')) return null;
    for (const p of PATS) { const m = stem.match(p); if (m) return { cls: +m.groups.cls, subj: m.groups.subj, chap: +m.groups.chap }; }
    return null;
};

// node → sim lookup from generated files
const nodeToSim = {};
const v3dirs = fs.readdirSync(SIMS).filter(d => /^class\d+$/.test(d) && fs.existsSync(path.join(SIMS, d, 'v3')));
for (const f of v3dirs.flatMap(c =>
    fs.readdirSync(path.join(SIMS, c, 'v3')).filter(x => x.endsWith('.ts')).map(x => path.join(SIMS, c, 'v3', x)))) {
    const src = fs.readFileSync(f, 'utf8');
    const id = src.match(/id: '([^']+)'/)?.[1];
    const nids = src.match(/nodeIds: \[([^\]]*)\]/)?.[1].match(/'(c\d+_\w+)'/g)?.map(s => s.slice(1, -1)) ?? [];
    for (const n of nids) if (!nodeToSim[n]) nodeToSim[n] = id;
}
for (const f of fs.readdirSync(SIMS).filter(d => /^class\d+$/.test(d)).flatMap(c => {
    const d = path.join(SIMS, c, 'v3w'); return fs.existsSync(d) ? fs.readdirSync(d).filter(x => x.endsWith('.ts')).map(x => path.join(d, x)) : [];
})) {
    const src = fs.readFileSync(f, 'utf8');
    const id = src.match(/id: '([^']+)'/)?.[1];
    const nids = src.match(/nodeIds: \[([^\]]*)\]/)?.[1].match(/'(c\d+_\w+)'/g)?.map(s => s.slice(1, -1)) ?? [];
    for (const n of nids) nodeToSim[n] ??= id;
}

// subject → sector angle (stable hash order)
const SUBJ_SECTOR = {};
let sectorCount = 0;
const sectorOf = (subj) => SUBJ_SECTOR[subj] ?? (SUBJ_SECTOR[subj] = sectorCount++);

// build nodes with galaxy positions
const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md') && !f.endsWith('_comp.md'));
const groups = new Map();   // 'cls|subj|chap' → node ids
for (const f of files) {
    const stem = f.replace(/\.md$/, '');
    const p = parse(stem);
    if (!p) continue;
    const key = `${p.cls}|${p.subj}|${p.chap}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(stem);
}

const nodes = [], index = new Map();
const edges = [];
/* Pizza-galaxy: each subject owns a contiguous wedge whose width is
 * proportional to its chapter count. Within a wedge, class decides
 * radius (c6 inner → c12 outer = progression outward). Chapters sit
 * evenly across the wedge; nodes spiral inside each chapter. */
const bySubj = new Map();                               // subj → [keys]
for (const key of groups.keys()) {
    const subj = key.split('|')[1];
    (bySubj.get(subj) ?? bySubj.set(subj, []).get(subj)).push(key);
}
const totalChaps = groups.size;
let wedgeStart = 0;
const sectorLabel = [];                                 // {subj, theta, r, n} for region labels
for (const [subj, sKeys] of [...bySubj.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const W = (sKeys.length / totalChaps) * Math.PI * 2;
    const thetaMid = wedgeStart + W / 2;
    const nSubj = sKeys.reduce((s, k) => s + groups.get(k).length, 0);
    sectorLabel.push({ subj, theta: thetaMid, r: 235, n: nSubj });
    sKeys.sort();
    sKeys.forEach((key, j) => {
        const [cls, , chap] = key.split('|');
        const R = 55 + (+cls - 6) * 28;                 // class ring: 6 inner → 12 outer
        const theta = wedgeStart + ((j + 0.5) / sKeys.length) * W;
        const ids = groups.get(key).sort();
        ids.forEach((id, i) => {
            const a = i * 0.9, r = 2.5 + i * 1.0;       // chapter constellation spiral
            const x = R * Math.cos(theta) + r * Math.cos(a);
            const z = R * Math.sin(theta) + r * Math.sin(a);
            const y = (chap % 5 - 2) * 1.6 + Math.sin(a * 0.7) * 1.4;
            index.set(id, nodes.length);
            nodes.push({ id, cls: +cls, subj, chap: +chap, pos: [x, y, z].map(n => +n.toFixed(2)), sim: nodeToSim[id] ?? null });
        });
    });
    wedgeStart += W;
}
const SECT_LABELS = sectorLabel;

// prereq/forward edges from md fields
for (const f of files) {
    const src = fs.readFileSync(path.join(MD_DIR, f), 'utf8');
    const self = f.replace(/\.md$/, '');
    const i = index.get(self);
    if (i == null) continue;
    const grab = (k) => (src.match(new RegExp(`## ${k}\\r?\\n([\\s\\S]*?)(?=\\r?\\n## |$)`))?.[1] ?? '')
        .match(/c\d+_\w+/g) ?? [];
    for (const j of grab('PREREQUISITE_NODE_IDS')) { const t = index.get(j); if (t != null) edges.push([t, i]); }
    for (const j of grab('FORWARD_NODE_IDS')) { const t = index.get(j); if (t != null) edges.push([i, t]); }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
    nodes, edges,
    subjects: Object.keys(SUBJ_SECTOR).sort(),
    sectors: SECT_LABELS.map(s => ({ subj: s.subj, pos: [+(s.r * Math.cos(s.theta)).toFixed(1), 30, +(s.r * Math.sin(s.theta)).toFixed(1)], n: s.n })),
}));
console.log(`galaxy: ${nodes.length} nodes · ${edges.length} edges · ${Object.keys(SUBJ_SECTOR).length} subjects → ${path.relative(process.cwd(), OUT)}`);
