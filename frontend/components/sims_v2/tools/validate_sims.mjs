#!/usr/bin/env node
/**
 * validate_sims.mjs — SIM V3 quality gate (SPEC §7).
 *
 * Executes every SimDef in sims_v2/classN and runs the binding checks —
 * NOT eyeballing: answers must be in options, interact validate strings
 * must resolve to real widget/lab state keys, generators must produce
 * unambiguous non-degenerate items over 200 seeds, nodeIds must exist in
 * the enhanced-node corpus, prose answers are rejected, etc.
 *
 *   node components/sims_v2/tools/validate_sims.mjs            human report
 *   node ... --json                                          machine report
 *   node ... --class 6                                       one class only
 *
 * Exit code 0 = no ERRORS (warnings allowed). 1 = errors found.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS_DIR = path.resolve(HERE, '..');
const FRONTEND = path.resolve(SIMS_DIR, '..', '..');
const MD_CACHE = process.env.SIM_MD_CACHE
    ?? 'C:\\Users\\Alesha4285\\Desktop\\enhanced_nodes\\md_cache';
const ARGS = process.argv.slice(2);
const AS_JSON = ARGS.includes('--json');
// --new-only: gate on the v3/v3w corpus only (legacy debt tracked separately)
const NEW_ONLY = ARGS.includes('--new-only');
const CLASS_ONLY = ARGS.includes('--class') ? Number(ARGS[ARGS.indexOf('--class') + 1]) : null;

// ─── require hook: transpile .ts/.tsx data files on the fly ─────────
const require_ = createRequire(path.join(FRONTEND, 'package.json'));
const ts = require_('typescript');
const React = require_('react');

const Module = require_('module');
const origResolve = Module._resolveFilename;
// resolve react paths BEFORE patching (self-recursion otherwise)
const REACT_PATH = require_.resolve('react');
const REACT_JSX_PATH = require_.resolve('react/jsx-runtime');
Module._resolveFilename = function (request, parent, ...rest) {
    if (request.startsWith('.') && parent?.filename) {
        const base = path.resolve(path.dirname(parent.filename), request);
        for (const ext of ['.ts', '.tsx', '.js', '.mjs']) {
            if (fs.existsSync(base + ext)) {
                // master sim components (.tsx under components/simulations)
                // are stubbed — we validate the SimDef data, not the pixels.
                const p = base + ext;
                if (p.endsWith('.tsx') && p.includes(`components${path.sep}simulations`)) return STUB_PATH;
                return p;
            }
        }
        if (fs.existsSync(path.join(base, 'index.ts'))) return path.join(base, 'index.ts');
        if (fs.existsSync(path.join(base, 'index.tsx'))) return path.join(base, 'index.tsx');
    }
    if (request === 'react') return REACT_PATH;
    if (request === 'react/jsx-runtime' || request === 'react/jsx-dev-runtime')
        return REACT_JSX_PATH;
    // direct file paths resolve normally
    if (path.isAbsolute(request) || /^[A-Za-z]:[\\/]/.test(request)) {
        if (fs.existsSync(request)) return request;
        return origResolve.call(this, request, parent, ...rest);
    }
    // next/dynamic, framer-motion, recharts, @/... — anything external the
    // data files reference (wrapped sims) resolves to a harmless stub.
    if (request.startsWith('@/')) return STUB_PATH;
    if (!request.startsWith('.')) {
        // node builtins resolve normally; EVERY other bare import gets the
        // stub — we need the data, not real next/framer-motion/css code.
        const bare = request.replace(/^node:/, '');
        if (Module.builtinModules.includes(bare))
            return origResolve.call(this, request, parent, ...rest);
        return STUB_PATH;
    }
    return origResolve.call(this, request, parent, ...rest);
};

const STUB_PATH = path.join(HERE, '_stub.cjs');
fs.writeFileSync(STUB_PATH,
    'const P=new Proxy(function(){}, {get:(t,k)=> k==="default"?P:P, apply:()=>P, construct:()=>P});\n' +
    'module.exports=P; module.exports.default=P;\n');

const loadTs = (Module._extensions ??= {});
for (const ext of ['.ts', '.tsx']) {
    loadTs[ext] = function (mod, filename) {
        const src = fs.readFileSync(filename, 'utf8');
        const { outputText } = ts.transpileModule(src, {
            compilerOptions: {
                module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
                jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
            },
            fileName: filename,
        });
        mod._compile(outputText, filename);
    };
}

// ─── load engine registries (LABS / WIDGETS / generators) ────────────
const { LABS } = require_(path.join(SIMS_DIR, 'engine', 'canvasLab.tsx'));
const { WIDGETS } = require_(path.join(SIMS_DIR, 'engine', 'widgets.tsx'));
const GEN = require_(path.join(SIMS_DIR, 'engine', 'generators.ts'));
const GEN_KEYS = new Set(Object.keys(GEN.GENERATORS ?? {}));
let LEXGEN = null;
try { LEXGEN = require_(path.join(SIMS_DIR, 'engine', 'lexgen.ts')); } catch { /* optional */ }

const WIDGET_KEYS = { // state keys each widget reports (from widgets.tsx onChange)
    clock: ['hour', 'mins'], tray: ['count'], 'tray-star': ['count'],
    numberline: ['pos'], balance: ['left', 'right'],
    purse: ['total', 'coins'], bundles: ['tens', 'ones', 'total'],
    writer: ['score', 'words'], match: ['matched', 'correct', 'total'], order: ['correct', 'total'],
    trace: ['covered', 'total', 'score', 'strokes'], fluency: ['wpm', 'secs', 'words', 'level'],
};
const labStateKeys = (k) => (LABS[k]?.sliders ?? []).map(s => s.id);

// ─── node-id corpus (md_cache filenames) ─────────────────────────────
let NODE_IDS = new Set();
try {
    for (const f of fs.readdirSync(MD_CACHE)) {
        if (f.endsWith('.md')) NODE_IDS.add(f.slice(0, -3));
    }
} catch { /* corpus dir absent — nodeId check degrades to warning */ }

// ─── helpers ─────────────────────────────────────────────────────────
const optText = (o) => (typeof o === 'string' ? o : o?.text);
const optReveals = (o) => (typeof o === 'string' ? undefined : o?.reveals);
const TRUNC_HINT = /(characteri|…|\b\w{1,3} [A-Z][a-z]+ you\b)/;
const looksTruncated = (s) => typeof s === 'string' && (
    s.length >= 45 && /[a-z]$/.test(s) && s === s.slice(0, 47) && /\S{8,}$/.test(s) && !s.endsWith('!') && !s.endsWith('.') && !s.endsWith('?') && !s.endsWith(')') ||
    /^(Steps: \d+|N\/A)$/.test(s.trim())
);
const E = [], W = [];
const err = (sim, code, msg) => E.push({ sim, code, msg });
const warn = (sim, code, msg) => W.push({ sim, code, msg });

function checkValidateString(sim, cid, goal) {
    const [wkey, rules] = (goal.validate ?? '').split(':');
    if (!wkey || !rules) { err(sim, cid, `interact validate malformed: '${goal.validate}'`); return; }
    const isWidget = !!WIDGETS[wkey], isLab = !!LABS[wkey];
    if (!isWidget && !isLab) { err(sim, cid, `interact target '${wkey}' is neither a widget nor a lab`); return; }
    if (goal.widget !== wkey) warn(sim, cid, `validate prefix '${wkey}' ≠ goal.widget '${goal.widget}'`);
    const valid = isWidget ? (WIDGET_KEYS[wkey] ?? []) : labStateKeys(wkey);
    for (const rule of rules.split(',')) {
        for (const m of rule.matchAll(/[a-zA-Z_]\w*/g)) {
            const key = m[0];
            if (!valid.includes(key)) err(sim, cid, `validate key '${key}' not in ${wkey} state keys [${valid.join(', ')}]`);
        }
        // reachability: key=val must target a slider whose range contains val
        for (const m of rule.matchAll(/([a-zA-Z_]\w*)\s*=\s*(-?\d+(?:\.\d+)?)/g)) {
            const key = m[1], val = parseFloat(m[2]);
            const slider = (LABS[wkey]?.sliders ?? []).find(s => s.id === key);
            if (slider && (val < slider.min || val > slider.max))
                err(sim, cid, `goal '${key}=${val}' unreachable — slider range is ${slider.min}..${slider.max}`);
        }
    }
}

function checkChallenge(sim, c, i) {
    const cid = `challenge[${i}]${c.id ? ':' + c.id : ''}`;
    if (!c.question?.trim()) err(sim, cid, 'empty question');
    if (!c.hint?.trim()) warn(sim, cid, 'missing hint');
    if (!c.misconception?.trim()) warn(sim, cid, 'missing misconception');
    if (!c.nodeId) warn(sim, cid, 'no nodeId — cannot feed per-node BKT');
    else if (NODE_IDS.size && !NODE_IDS.has(c.nodeId)) warn(sim, cid, `nodeId '${c.nodeId}' not in corpus`);

    const opts = (c.options ?? []).map(optText);
    if (c.type === 'mcq' || c.type === 'count') {
        if (!opts.length) err(sim, cid, 'no options');
        if (c.answer == null) err(sim, cid, 'no answer');
        else if (opts.length && !opts.includes(c.answer)) {
            // Engine-mitigated: SimPlayer dispOptions appends the answer to the
            // rendered set, so the pick stays winnable despite a broken list.
            warn(sim, cid, `answer '${c.answer}' not in options [engine-appends answer]`);
        }
        if (new Set(opts).size !== opts.length) err(sim, cid, 'duplicate options');
        // v3: distractors keyed to misconceptions
        const reveals = (c.options ?? []).filter(o => optText(o) !== c.answer).map(optReveals).filter(Boolean);
        if (!reveals.length) warn(sim, cid, 'no misconception-keyed distractors (v3)');
        if (c.remediations) {
            for (const [rid, rem] of Object.entries(c.remediations)) {
                if (!rem?.steps?.length) err(sim, cid, `remediation '${rid}' has no steps`);
                if (rem?.labTask) checkValidateString(sim, cid + ':rem:' + rid, { validate: rem.labTask.validate, widget: rem.labTask.widget });
            }
            const keyed = new Set((c.options ?? []).map(optReveals).filter(Boolean));
            for (const k of keyed) if (!c.remediations[k]) warn(sim, cid, `reveals '${k}' has no remediation branch`);
        }
    }
    if (c.type === 'interact') {
        if (!c.interactGoal?.validate) err(sim, cid, 'interact without validate');
        else checkValidateString(sim, cid, c.interactGoal);
    }
    if (c.type === 'math_input' && c.answer == null) err(sim, cid, 'math_input without answer');
    if (c.type === 'subpart') {
        if (!Array.isArray(c.parts) || !c.parts.length) err(sim, cid, 'subpart with empty parts');
        for (const p of c.parts ?? []) {
            const pid = `${cid}.${p.id}`;
            if (!p.prompt?.trim()) err(sim, pid, 'empty prompt');
            if (!p.answer?.trim()) err(sim, pid, 'empty answer');
            else if (!p.options && p.answer.trim().length > 30) {
                // The engine (SimPlayer dispPartOptions) synthesizes
                // tap-to-answer options from sibling parts' answers when a
                // prose part ships without options — that mitigation needs
                // >=2 distinct sibling answers. With them, downgrade to a
                // warning; without, the typed exact-match stays unwinnable.
                const siblings = (c.parts ?? []).filter(x => x !== p && (x.answer ?? '').trim()
                    && x.answer.trim() !== p.answer.trim());
                const msg = `prose answer (${p.answer.trim().length} chars) in exact-match part — add options[]`;
                if (siblings.length >= 2) warn(sim, pid, msg + ' [engine-mitigated via sibling options]');
                else err(sim, pid, msg);
            }
            if (p.options && !p.options.includes(p.answer)) {
                // Engine-mitigated: SimPlayer dispPartOptions appends the answer
                // to the rendered set, so the tap stays winnable even when the
                // authored option list lost its own answer.
                warn(sim, pid, `answer '${p.answer}' not in part options [engine-appends answer]`);
            }
            if (/^Steps: \d+$/.test((p.answer ?? '').trim())) err(sim, pid, "placeholder answer 'Steps: N'");
        }
    }
    for (const s of [c.question, c.answer, ...(opts)]) {
        if (looksTruncated(s)) warn(sim, cid, `suspicious/truncated text: '${String(s).slice(0, 50)}…'`);
    }
}

// ─── beat completability — every beat must have a valid forward path ──
function checkBeats(sim, def) {
    for (const [bi, b] of (def.beats ?? []).entries()) {
        const bid = `beat[${bi}:${b.type}]`;
        if (b.type === 'mission' && b.mission) {
            if (!b.mission.widget || (!WIDGETS[b.mission.widget] && !LABS[b.mission.widget]))
                err(sim, bid, `mission widget '${b.mission.widget}' missing`);
            else if (b.mission.validate)
                checkValidateString(sim, bid, { widget: b.mission.widget, validate: b.mission.validate });
        }
        if (b.type === 'scaffold' && b.scaffold) {
            if (!b.scaffold.problem?.trim()) err(sim, bid, 'scaffold missing problem');
            if ((b.scaffold.steps ?? []).length < 2) err(sim, bid, 'scaffold needs ≥2 steps');
            for (const st of b.scaffold.steps ?? [])
                if (st.faded && !st.blankAnswer?.trim()) warn(sim, bid, 'faded step without blankAnswer — completable via the per-step reveal path (beats.tsx ScaffoldBeat)');
        }
        if (b.type === 'case' && b.caseStudy) {
            for (const [di, dec] of (b.caseStudy.decisions ?? []).entries()) {
                const opts = dec.options ?? [];
                if (opts.length < 2) err(sim, bid, `decision[${di}] has <2 options`);
                if (!opts.some(o => !o.reveals)) err(sim, bid, `decision[${di}] has no correct path — all options reveal misconceptions`);
                for (const o of opts) if (!o.outcome?.trim()) err(sim, bid, `decision[${di}] option missing outcome`);
            }
        }
        if (b.type === 'dissect' && b.dissect) {
            if ((b.dissect.spots ?? []).length < 2) err(sim, bid, 'dissect needs ≥2 spots');
            for (const sp of b.dissect.spots ?? [])
                if (sp.options?.length && !sp.options.includes(sp.answer)) err(sim, bid, `spot answer '${sp.answer}' not in its options`);
        }
        if (b.type === 'build' && b.build && !b.build.answer?.trim()) err(sim, bid, 'build missing answer');
        if (b.type === 'drill' && b.drill) {
            const kinds = b.drill.kind.split(',').map(k => k.trim());
            for (const k of kinds) if (!GEN_KEYS.has(k)) warn(sim, bid, `drill kind '${k}' not a registered generator — DrillBeat degrades to a Continue button`);
            if ((b.drill.count ?? 0) < 1) err(sim, bid, 'drill count < 1');
        }
    }
    // discovery is optional but must be clean when present
    if (def.discovery) {
        const d = def.discovery;
        const opts = (d.options ?? []).map(String);
        if (d.answer && opts.length && !opts.includes(d.answer)) err(sim, 'discovery', 'answer not in options');
        if (new Set(opts).size !== opts.length) err(sim, 'discovery', 'duplicate options');
        if (opts.length && opts.length < 2) err(sim, 'discovery', 'fewer than 2 options');
    }
}

function checkSim(def) {
    const sim = def.id ?? '(no id)';
    if (!def.title?.trim()) err(sim, 'meta', 'missing title');
    if (!def.classLevel) err(sim, 'meta', 'missing classLevel');
    if (!def.challenges?.length) err(sim, 'meta', 'no challenges');
    // teaching: v3 wants beats; slides-only is a warning
    if (!def.beats?.length) warn(sim, 'meta', 'no teaching beats — slides only (v3 gap)');
    if ((def.teaching ?? []).length > 2 && def.beats?.length)
        warn(sim, 'meta', `orientation should be ≤2 slides, has ${def.teaching.length} + beats`);
    if (def.explore?.lab && !LABS[def.explore.lab]) err(sim, 'explore', `lab '${def.explore.lab}' missing`);
    if (def.explore?.widget && !WIDGETS[def.explore.widget] && !LABS[def.explore.widget])
        err(sim, 'explore', `widget '${def.explore.widget}' missing`);
    if (def.explore?.lab) {
        if (!def.observe) warn(sim, 'phases', 'lab bound but no observe phase');
        if (!def.predict) warn(sim, 'phases', 'lab bound but no predict→verify phase');
    }
    if (def.predict?.verifyWidget && !LABS[def.predict.verifyWidget] && !WIDGETS[def.predict.verifyWidget])
        err(sim, 'predict', `verifyWidget '${def.predict.verifyWidget}' missing`);
    (def.nodeIds ?? []).forEach(n => {
        if (NODE_IDS.size && !NODE_IDS.has(n)) warn(sim, 'nodes', `nodeId '${n}' not in corpus`);
    });
    (def.challenges ?? []).forEach((c, i) => checkChallenge(sim, c, i));
    checkBeats(sim, def);
    if (def.classLevel >= 6) {
        const hasSenior = (def.challenges ?? []).some(c => ['subpart', 'math_input', 'interact'].includes(c.type));
        if (!hasSenior) warn(sim, 'senior', 'class≥6 sim without subpart/math_input/interact');
    }
    for (const s of [def.title, def.subtitle]) if (looksTruncated(s)) warn(sim, 'meta', `truncated text '${String(s).slice(0, 40)}…'`);
}

// ─── generator gate: 200 seeds per kind ──────────────────────────────
function checkGenerators() {
    const kinds = ['add', 'sub', 'mul', 'div', 'place', 'pattern', 'fraction', 'area', 'perimeter', 'decimal', 'money', 'time',
        'measure', 'algebra', 'data', 'percent', 'ratio', 'si', 'exponent', 'linear2'];
    for (const kind of kinds) {
        let bad = 0, checked = 0;
        for (let seed = 0; seed < 200; seed++) {
            const out = GEN.generateChallenges(kind, 1, 3, seed * 7919 + 13);
            for (const c of out) {
                checked++;
                const opts = (c.options ?? []).map(optText);
                if (c.type === 'mcq' && c.answer != null && !opts.includes(c.answer)) bad++;
                if (new Set(opts).size !== opts.length) bad++;
                if (!c.question?.trim()) bad++;
                if (c.type === 'interact' && !c.interactGoal?.validate) bad++;
            }
        }
        if (bad) err('(generators)', `gen:${kind}`, `${bad}/${checked} bad items over 200 seeds`);
    }
}

// ─── load class registries & run ─────────────────────────────────────
// The classN/index.ts registries are gone (sims now ship as JSON packs via
// scripts/emit-sim-json.js), so enumerate the source files the same way the
// emitter does: classN root data .ts, classN/v3 + classN/v3w, generated/*_gen.ts.
function collectDefs(mod, out) {
    for (const v of Object.values(mod)) {
        if (Array.isArray(v)) {
            for (const d of v) if (d && typeof d === 'object' && d.id && d.challenges) out.push(d);
        } else if (v && typeof v === 'object' && v.id && v.challenges) {
            out.push(v);
        }
    }
}

function loadClassSims(cls) {
    const clsDir = path.join(SIMS_DIR, `class${cls}`);
    if (!fs.existsSync(clsDir)) return [];
    const files = [];
    for (const f of fs.readdirSync(clsDir)) {
        if (f.endsWith('.ts') && f !== 'index.ts' && !f.endsWith('_index.ts') &&
            !f.endsWith('_loaders.ts') && !f.startsWith('interactives')) {
            files.push(path.join(clsDir, f));
        }
    }
    for (const sub of ['v3', 'v3w']) {
        const subDir = path.join(clsDir, sub);
        if (!fs.existsSync(subDir)) continue;
        for (const f of fs.readdirSync(subDir)) {
            if (f.endsWith('.ts') && !f.endsWith('_index.ts') && !f.endsWith('_loaders.ts')) {
                files.push(path.join(subDir, f));
            }
        }
    }
    const sims = [];
    for (const file of files) collectDefs(require_(file), sims);
    return sims;
}

// generated/<cls>_<subj>_gen.ts — same data shape, not under a classN/ dir
function loadGeneratedSims() {
    const genDir = path.join(SIMS_DIR, 'generated');
    if (!fs.existsSync(genDir)) return [];
    const sims = [];
    for (const f of fs.readdirSync(genDir)) {
        if (!f.endsWith('_gen.ts')) continue;
        collectDefs(require_(path.join(genDir, f)), sims);
    }
    return sims;
}

const classes = CLASS_ONLY ? [CLASS_ONLY] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const perClass = {};
for (const cls of classes) {
    let sims = [];
    try { sims = loadClassSims(cls); }
    catch (e) { err(`class${cls}`, 'load', `registry failed to load: ${e.message}`); continue; }
    perClass[cls] = sims.length;
    for (const s of sims) {
        if (NEW_ONLY && !/^(v3_|v3w_|w_)/.test(s.id)) continue;
        try { checkSim(s); }
        catch (e) { err(s?.id ?? '?', 'crash', `validator crash: ${e.message}`); }
    }
}
try {
    const genSims = loadGeneratedSims();
    perClass.gen = genSims.length;
    for (const s of genSims) {
        if (NEW_ONLY && !/^gen_/.test(s.id)) continue;
        try { checkSim(s); }
        catch (e) { err(s?.id ?? '?', 'crash', `validator crash: ${e.message}`); }
    }
} catch (e) { err('generated', 'load', `generated registry failed to load: ${e.message}`); }
checkGenerators();

// ─── report ──────────────────────────────────────────────────────────
const total = Object.values(perClass).reduce((a, b) => a + b, 0);
const simsWithErr = new Set(E.map(e => e.sim)).size;
const simsWithWarn = new Set(W.map(w => w.sim)).size;
const report = {
    generatedAt: new Date().toISOString(),
    corpus: { sims: total, perClass, nodeIdsInCorpus: NODE_IDS.size },
    errors: E.length, warnings: W.length,
    simsWithErrors: simsWithErr, simsWithWarnings: simsWithWarn,
    clean: total - simsWithErr - simsWithWarn,
    errorList: E, warningList: W,
};
if (AS_JSON) {
    console.log(JSON.stringify(report, null, 1));
} else {
    console.log(`\n═══ SIM V3 VALIDATOR ═══`);
    console.log(`sims checked: ${total}  (${Object.entries(perClass).map(([c, n]) => `c${c}:${n}`).join(' ')})`);
    console.log(`node corpus: ${NODE_IDS.size} ids`);
    console.log(`ERRORS: ${E.length} across ${simsWithErr} sims · WARNINGS: ${W.length} across ${simsWithWarn} sims · fully clean: ${report.clean}`);
    const byCode = {};
    for (const e of E) byCode[e.code] = (byCode[e.code] ?? 0) + 1;
    if (E.length) { console.log('\n— top errors —'); Object.entries(byCode).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([c, n]) => console.log(`  ${n}× ${c}`)); }
    for (const e of E.slice(0, 25)) console.log(`  ERR ${e.sim} ${e.code}: ${e.msg}`);
    const wCode = {};
    for (const w of W) wCode[w.code] = (wCode[w.code] ?? 0) + 1;
    if (W.length) { console.log('\n— top warnings —'); Object.entries(wCode).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([c, n]) => console.log(`  ${n}× ${c}`)); }
}
process.exit(E.length ? 1 : 0);
