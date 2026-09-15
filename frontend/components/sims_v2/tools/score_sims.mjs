#!/usr/bin/env node
/**
 * score_sims.mjs — measurable quality score per sim + corpus mean.
 * This is the number the improvement loop optimises — NOT a vibe.
 *
 *   node tools/score_sims.mjs            # report + top deficits
 *   node tools/score_sims.mjs --json     # machine-readable
 *   node tools/score_sims.mjs --class 12 # one class
 *
 * Rubric (10.0 per sim):
 *   structure   1.5  title, subtitle, scenario, reflect, success/tryAgain
 *   teaching    2.0  beats present 1.0 · ≥2 beat types 0.5 · beats valid 0.5
 *                    (component-mounted worlds count as the world, not beats)
 *   diagnostics 2.0  per challenge: nodeId .25 · hint .25 · misconception .25
 *                    · keyed distractors .25  (mean over challenges)
 *   remediation 1.5  every reveals-key has a remediation branch
 *   world       1.5  explore.lab or explore.component bound
 *   phases      1.0  discovery clean .5 · observe+predict when lab .5
 *   retest      0.5  retestKind or variants present
 * Hard errors cap a sim at 4.0.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS_DIR = path.resolve(HERE, '..');
const FRONTEND = path.resolve(SIMS_DIR, '..', '..');
const require_ = createRequire(path.join(FRONTEND, 'package.json'));
const ARGS = process.argv.slice(2);
const AS_JSON = ARGS.includes('--json');
const CLASS_ONLY = ARGS.includes('--class') ? Number(ARGS[ARGS.indexOf('--class') + 1]) : null;
const ONLY_V3 = ARGS.includes('--new-only');

// ── require hook (same as validator) ────────────────────────────────
const ts = require_('typescript');
const Module = require_('module');
const origResolve = Module._resolveFilename;
const REACT_PATH = require_.resolve('react');
const REACT_JSX_PATH = require_.resolve('react/jsx-runtime');
const STUB_PATH = path.join(HERE, '_stub.cjs');
if (!fs.existsSync(STUB_PATH)) fs.writeFileSync(STUB_PATH, `const P = new Proxy(function(){}, { get: (t,k)=>k==='__esModule'?true:(k==='default'?P:P), apply: ()=>P }); module.exports = P;`);
Module._resolveFilename = function (request, parent, ...rest) {
    if (request.startsWith('.') && parent?.filename) {
        const base = path.resolve(path.dirname(parent.filename), request);
        for (const ext of ['.ts', '.tsx', '.js', '.mjs']) {
            if (fs.existsSync(base + ext)) {
                const p = base + ext;
                if (p.endsWith('.tsx') && p.includes(`components${path.sep}simulations`)) return STUB_PATH;
                return p;
            }
        }
        if (fs.existsSync(path.join(base, 'index.ts'))) return path.join(base, 'index.ts');
        if (fs.existsSync(path.join(base, 'index.tsx'))) return path.join(base, 'index.tsx');
    }
    if (request === 'react') return REACT_PATH;
    if (request === 'react/jsx-runtime' || request === 'react/jsx-dev-runtime') return REACT_JSX_PATH;
    if (path.isAbsolute(request) || /^[A-Za-z]:[\\/]/.test(request)) {
        if (fs.existsSync(request)) return request;
        return origResolve.call(this, request, parent, ...rest);
    }
    if (request.startsWith('@/')) return STUB_PATH;
    if (!request.startsWith('.')) {
        const bare = request.replace(/^node:/, '');
        if (Module.builtinModules.includes(bare)) return origResolve.call(this, request, parent, ...rest);
        return STUB_PATH;
    }
    return origResolve.call(this, request, parent, ...rest);
};
for (const ext of ['.ts', '.tsx']) {
    Module._extensions[ext] = function (mod, filename) {
        const src = fs.readFileSync(filename, 'utf8');
        const { outputText } = ts.transpileModule(src, {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
            fileName: filename,
        });
        mod._compile(outputText, filename);
    };
}
const LABS = require_(path.join(SIMS_DIR, 'engine', 'canvasLab.tsx')).LABS ?? {};
const WIDGETS = require_(path.join(SIMS_DIR, 'engine', 'widgets.tsx')).WIDGETS ?? {};
const GEN_KEYS = new Set(Object.keys(require_(path.join(SIMS_DIR, 'engine', 'generators.ts')).GENERATORS ?? {}));

// ── corpus node ids ──────────────────────────────────────────────────
const MD_DIR = process.env.SIM_MD_CACHE ?? 'C:\\Users\\Alesha4285\\Desktop\\enhanced_nodes\\md_cache';
const NODE_IDS = new Set();
try { for (const f of fs.readdirSync(MD_DIR)) if (f.endsWith('.md')) NODE_IDS.add(f.replace(/\.md$/, '')); } catch { }

const optText = (o) => (typeof o === 'string' ? o : o?.text ?? '');
const optReveals = (o) => (typeof o === 'string' ? undefined : o?.reveals);

// ── scoring ──────────────────────────────────────────────────────────
function scoreSim(def) {
    const s = { total: 0, parts: {}, errs: [] };
    const errs = (m) => s.errs.push(m);

    // structure 1.5
    let p = 0;
    if (def.title?.trim()) p += 0.3;
    if (def.subtitle?.trim()) p += 0.2;
    if (def.scenario?.role && def.scenario?.intro) p += 0.3;
    if (def.reflect?.prompts?.length) p += 0.2;
    if (def.successLine && def.tryAgainLine) p += 0.3;
    if (def.emoji) p += 0.2;
    s.parts.structure = Math.min(1.5, p);

    // teaching 2.0 — beats present (1.0) + ≥2 types (0.5) + all valid (0.5)
    const beats = def.beats ?? [];
    let tp = 0;
    if (beats.length) {
        tp += 1.0;
        const types = new Set(beats.map(b => b.type));
        if (types.size >= 2) tp += 0.5;
        let ok = true;
        for (const b of beats) {
            if (b.type === 'mission' && !(WIDGETS[b.mission?.widget] || LABS[b.mission?.widget])) { ok = false; errs(`mission widget '${b.mission?.widget}' missing`); }
            if (b.type === 'scaffold' && b.scaffold?.steps?.some(st => st.faded && !st.blankAnswer?.trim())) { ok = false; errs('scaffold faded w/o blank'); }
            if (b.type === 'case' && b.caseStudy?.decisions?.some(d => !(d.options ?? []).some(o => !o.reveals))) { ok = false; errs('case w/o correct path'); }
            if (b.type === 'drill' && !(b.drill?.kind ?? '').split(',').some(k => GEN_KEYS.has(k.trim()))) { ok = false; errs('drill kind unresolved'); }
        }
        if (ok) tp += 0.5;
    }
    s.parts.teaching = Math.min(2, tp);

    // diagnostics 2.0 — mean over challenges
    const chs = def.challenges ?? [];
    let dp = 0;
    if (chs.length) {
        let per = 0;
        for (const c of chs) {
            if (c.nodeId) per += 0.25; else errs(`${c.type}: no nodeId`);
            if (c.hint?.trim()) per += 0.25;
            if (c.misconception?.trim()) per += 0.25;
            const opts = (c.options ?? []);
            if (opts.some(o => optReveals(o)) || c.type === 'subpart') per += 0.25;
        }
        dp = (per / chs.length) * 2;
    } else errs('no challenges');
    s.parts.diagnostics = Math.min(2, dp);

    // remediation 1.5 — every reveals-key has a branch; subpart misconception counts
    let rp = 0;
    const remSims = chs.filter(c => c.remediations && Object.keys(c.remediations).length);
    const keyed = chs.filter(c => (c.options ?? []).some(o => optReveals(o)) || (c.parts ?? []).some(pp => pp.misconception));
    if (remSims.length) rp += 1.0;
    if (keyed.length) {
        const covered = remSims.length / keyed.length;
        rp += 0.5 * Math.min(1, covered);
    } else rp += 0.5;
    s.parts.remediation = Math.min(1.5, rp);

    // world 1.5
    s.parts.world = (def.explore?.lab || def.explore?.component) ? 1.5 : 0;

    // phases 1.0
    let pp = 0;
    if (def.discovery?.answer && (def.discovery.options ?? []).includes(def.discovery.answer)) pp += 0.5;
    if (def.explore?.lab) { if (def.observe) pp += 0.25; if (def.predict?.verifyWidget) pp += 0.25; }
    else pp += 0.5;   // no lab → observe/predict not expected
    s.parts.phases = Math.min(1, pp);

    // retest 0.5 — retestKind, drill beat, or per-node variants (same nodeId in ≥2 challenges)
    const nodeCounts = {};
    for (const c of chs) if (c.nodeId) nodeCounts[c.nodeId] = (nodeCounts[c.nodeId] ?? 0) + 1;
    const hasRetest = chs.some(c => c.retestKind) || beats.some(b => b.type === 'drill')
        || Object.values(nodeCounts).some(n => n >= 2);
    s.parts.retest = hasRetest ? 0.5 : 0;

    s.total = Object.values(s.parts).reduce((a, b) => a + b, 0);
    if (s.errs.length) s.total = Math.min(s.total, 4);
    return s;
}

// ── load class registries ────────────────────────────────────────────
const classes = CLASS_ONLY ? [CLASS_ONLY] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const sims = [];
for (const c of classes) {
    const idx = path.join(SIMS_DIR, `class${c}`, 'index.ts');
    if (!fs.existsSync(idx)) continue;
    try {
        const mod = require_(idx);
        for (const k of Object.keys(mod)) {
            const v = mod[k];
            if (Array.isArray(v) && v.length && v[0]?.id && v[0]?.challenges !== undefined) sims.push(...v);
        }
    } catch (e) { console.error(`class${c} load failed: ${e.message}`); }
}
const target = ONLY_V3 ? sims.filter(s => /^(v3_|v3w_|w_)/.test(s.id)) : sims;
const scored = target.map(d => ({ id: d.id, cls: d.classLevel, ...scoreSim(d) }));

const mean = scored.reduce((a, s) => a + s.total, 0) / (scored.length || 1);
const deficit = {};
for (const s of scored) for (const [k, v] of Object.entries(s.parts)) {
    const max = { structure: 1.5, teaching: 2, diagnostics: 2, remediation: 1.5, world: 1.5, phases: 1, retest: 0.5 }[k];
    deficit[k] = (deficit[k] ?? 0) + (max - v);
}
const errSims = scored.filter(s => s.errs.length);

const report = {
    sims: scored.length,
    meanScore: +mean.toFixed(3),
    distribution: {
        '≥9.5': scored.filter(s => s.total >= 9.5).length,
        '8-9.4': scored.filter(s => s.total >= 8 && s.total < 9.5).length,
        '6-7.9': scored.filter(s => s.total >= 6 && s.total < 8).length,
        '<6': scored.filter(s => s.total < 6).length,
    },
    deficits: Object.fromEntries(Object.entries(deficit).map(([k, v]) => [k, +v.toFixed(1)]).sort((a, b) => b[1] - a[1])),
    simsWithErrors: errSims.length,
    worst: scored.sort((a, b) => a.total - b.total).slice(0, 8).map(s => ({ id: s.id, total: +s.total.toFixed(2), errs: s.errs.slice(0, 3) })),
};

if (AS_JSON) console.log(JSON.stringify(report, null, 1));
else {
    console.log(`\n═══ SIM QUALITY SCORE ═══`);
    console.log(`sims: ${report.sims} · mean ${report.meanScore}/10`);
    console.log(`distribution:`, report.distribution);
    console.log(`deficit points (max − actual, corpus-wide):`, report.deficits);
    console.log(`sims capped by errors: ${report.simsWithErrors}`);
    console.log(`worst 8:`, report.worst);
}
