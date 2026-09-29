#!/usr/bin/env node
/**
 * wrap_masters.mjs — wrap every c6_12 / c6_12_new master sim in the v3
 * adaptive shell (explore.component), with beats + misconception-keyed
 * challenges generated from the EXACT nodes each master declares via its
 * `const NODE_X = 'c12_comm_021'` constants.
 *
 *   node tools/wrap_masters.mjs --class 12
 *   node tools/wrap_masters.mjs               # all masters, all classes
 *
 * Emits: sims_v2/class<N>/v3w/<Comp>.ts + v3w_index.ts per class.
 * Masters are mounted, never modified (SPEC protect rule).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS_DIR = path.resolve(HERE, '..');
const FRONTEND = path.resolve(SIMS_DIR, '..', '..');
const MASTER_DIRS = [
    path.join(FRONTEND, 'components', 'simulations', 'c6_12'),
    path.join(FRONTEND, 'components', 'simulations', 'c6_12_new'),
    path.join(FRONTEND, 'components', 'simulations', 'three'),
];
const MD_DIR = process.env.SIM_MD_CACHE ?? 'C:\\Users\\Alesha4285\\Desktop\\enhanced_nodes\\md_cache';
const SRC_DIR = process.env.SIM_NODE_SRC ?? path.join(path.dirname(MD_DIR), 'source');
const ARGS = process.argv.slice(2);
const DRY = ARGS.includes('--dry');
const ONLY_CLASS = ARGS.includes('--class') ? Number(ARGS[ARGS.indexOf('--class') + 1]) : null;

// ── helpers (kept in sync with build_simdefs.mjs) ────────────────────
const SECTION_RE = /^#{1,3}\s*(.+?)\s*$/gm;
const sectionsOf = (text) => {
    const out = {}; let last = null, lastEnd = 0;
    for (const m of text.matchAll(SECTION_RE)) {
        if (last) out[last] = text.slice(lastEnd, m.index).trim();
        last = m[1].toUpperCase().replace(/\s+/g, '_'); lastEnd = m.index + m[0].length;
    }
    if (last) out[last] = text.slice(lastEnd).trim();
    return out;
};
const sent = (s, max = 220) => {
    const t = (s ?? '').replace(/\s+/g, ' ').trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max);
    const dot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
    return (dot > 60 ? cut.slice(0, dot + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '.').trim();
};
const esc = (s) => (s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
const slug = (s) => (s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
const misSlug = (s) => slug((s ?? '').replace(/^(students?\s+(often\s+)?(think|believe|assume)s?\s*(that\s+)?)/i, '').split(/[.,;]/)[0]).split('-').slice(0, 5).join('-') || 'wrong-idea';
const STOP_END = /\b(the|a|an|of|to|in|is|are|that|and|or|for|with|by|it|its)\.?$/i;
const shortAnswer = (a) => {
    let t = (a ?? '').replace(/\s+/g, ' ').trim();
    // authored step-list answers: keep the FIRST step's own text instead of
    // the literal "Steps: 1)" scaffold (a bare "Steps: 1" is a placeholder)
    if (/^steps?\s*:/i.test(t)) {
        t = t.replace(/^steps?\s*:\s*/i, '').replace(/^\d+\s*[).]\s*/, '');
        const stepItems = t.split(/\s+\d+\s*[).]\s*/);
        if (stepItems.length > 1 && stepItems[0].split(' ').length >= 3) t = stepItems[0];
        else t = stepItems.join(' ');
    }
    t = (t.split(/(?<=[.!?])\s+/)[0] ?? t);
    for (const m of [' because ', ' — ', ' which ', ' since ', '; ', ' as it ', ' this is ', ' a wrong answer', ' a student']) {
        const i = t.toLowerCase().indexOf(m);
        if (i > 15) { t = t.slice(0, i); break; }
    }
    t = t.replace(/[.,;:\s]+$/, '').trim();
    if (t.length > 90) t = t.slice(0, 90).replace(/\s\S*$/, '').trim();
    return t;
};
const resolveLetter = (q, a) => {
    const m = (a ?? '').match(/correct answer is \(?([a-e])\)?/i) ?? (a ?? '').match(/^\(?([a-e])\)?[\s.:]/);
    if (!m) return null;
    const L = m[1].toLowerCase();
    const om = (q ?? '').match(new RegExp(`${L}\\)\\s*(.{4,80}?)(?=\\s*[a-e]\\)|$)`, 'i'));
    return om ? shortAnswer(om[1]) : null;
};
function wrongClaims(ans, misconception, cap = 3) {
    const found = [];
    const src = `${ans ?? ''}. ${misconception ?? ''}`;
    const wrongCtx = src.split(/(?<=[.!?])\s+/)
        .filter(s => /wrong answer|misconceiv|confus|students?\s+(often\s+)?(think|believe|assume)|if they (chose|picked|said)|student who (answers|chose|picks|says|writes)/i.test(s))
        .join(' ');
    for (const m of wrongCtx.matchAll(/"([^"]{6,80})"|“([^”]{6,80})”/g)) found.push(m[1] ?? m[2]);
    for (const m of wrongCtx.matchAll(/(?:think|believe|assume)s?\s+(?:that\s+)?(.{6,90}?)(?:\.|;|$)/gi)) found.push(m[1]);
    const seen = new Set();
    return found.map(shortAnswer)
        .filter(x => x.length >= 6 && x.length <= 80 && !STOP_END.test(x))
        .filter(x => { const k = x.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
        .slice(0, cap);
}
const SRC = {};
try {
    for (const f of fs.readdirSync(SRC_DIR)) {
        if (!f.endsWith('.json')) continue;
        for (const n of JSON.parse(fs.readFileSync(path.join(SRC_DIR, f), 'utf8')))
            if (n?.node_id) SRC[n.node_id] = { chapter: n.chapter_name, topic: n.topic };
    }
} catch { }
// backend map: master file -> real corpus node ids + match strength
const SIM_MAP = {};
try {
    const mapPath = path.join(FRONTEND, '..', 'backend', 'its', 'competency', 'SIM_NODE_MAP.json');
    for (const e of JSON.parse(fs.readFileSync(mapPath, 'utf8')))
        if (e?.file) SIM_MAP[path.basename(e.file).replace(/\.tsx$/, '')] = e;
} catch { }

const MD = {}; // nodeId -> sections (lazy)
const mdSec = (nid) => {
    if (nid in MD) return MD[nid];
    try { MD[nid] = sectionsOf(fs.readFileSync(path.join(MD_DIR, nid + '.md'), 'utf8')); }
    catch { MD[nid] = null; }
    return MD[nid];
};

// masters that fail compile/runtime under a strict loader — keep out of
// the v3 registry (they stay reachable via the legacy game registry).
const CORRUPT = new Set(JSON.parse(fs.readFileSync(path.join(HERE, '_corrupt_masters.json'), 'utf8')));

// strict syntax gate: transpile each master and inspect diagnostics —
// transpileModule emits JS even on errors, but SWC (Next) refuses them.
const ts = createRequire(path.join(FRONTEND, 'package.json'))('typescript');
function masterCompiles(file, dir) {
    const src = fs.readFileSync(path.join(dir, file), 'utf8');
    const r = ts.transpileModule(src, {
        fileName: file, reportDiagnostics: true,
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
    });
    return !(r.diagnostics ?? []).some(d => d.category === ts.DiagnosticCategory.Error && d.code < 8000);
}

// ── master → wrapped SimDef ──────────────────────────────────────────
const titleCase = (s) => s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
const SUBJ_GUESS = /^(Biology|Biotech|Chemistry|Physics|Mathematics|Maths|Science|EVS|Geography|HistoryCivics|History|Civics|PoliticalScience|Economics|Eco|Commerce|Accountancy|BusinessStudies|MassMedia|ComputerScience|CS|Psychology|Sociology|English|Hindi|Sanskrit|PhysicalEducation)/;
const SUBJ_NORM = {
    biology: 'biology', biotech: 'biotechnology', chemistry: 'chemistry', physics: 'physics',
    mathematics: 'mathematics', maths: 'mathematics', science: 'science', evs: 'evs',
    geography: 'geography', historycivics: 'history', history: 'history', civics: 'civics',
    politicalscience: 'political_science', economics: 'economics', eco: 'economics',
    commerce: 'business_studies', accountancy: 'accountancy', businessstudies: 'business_studies',
    massmedia: 'mass_media', computerscience: 'computer_science', cs: 'computer_science',
    psychology: 'psychology', sociology: 'sociology', english: 'english', hindi: 'hindi',
    sanskrit: 'sanskrit', physicaleducation: 'physical_education',
};
const normSubj = (s) => SUBJ_NORM[(s ?? '').toLowerCase()] ?? s;

function wrapMaster(file, dir) {
    const comp = file.replace(/\.tsx$/, '');
    if (CORRUPT.has(comp) || !masterCompiles(file, dir)) return null;
    const cm = comp.match(/^C(\d+)_/);
    if (!cm) return null;
    const cls = +cm[1];
    if (ONLY_CLASS && cls !== ONLY_CLASS) return null;
    if (cls < 6 || cls > 12) return null;
    const src = fs.readFileSync(path.join(dir, file), 'utf8');
    // skip corrupted masters — duplicated export identifiers or no default
    // export mean the file can't compile (audit found ~35 such files).
    const exportNames = [...src.matchAll(/export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g)].map(m => m[1]);
    if (new Set(exportNames).size !== exportNames.length) return null;
    const defaultExports = (src.match(/export\s+default\s/g) ?? []).length;
    if (defaultExports !== 1) return null;   // 0 = none, >1 = corrupted (dup export)
    // real corpus ids come from SIM_NODE_MAP (the NODE_* constants inside
    // the file use a legacy scheme that doesn't exist in md_cache)
    const mapped = SIM_MAP[comp]?.nodeIds ?? [];
    const nodeIds = mapped.length
        ? mapped
        : [...src.matchAll(/const NODE_[A-Z0-9_]+ = '([a-z0-9_]+)'/g)].map(m => m[1]);
    const body = comp.slice(cm[0].length).replace(/Sim$/, '');
    const subjM = body.match(SUBJ_GUESS);
    const subject = normSubj(subjM?.[1] ?? 'science');
    // Title/topic come from the mapped corpus node's own curriculum topic —
    // component names are legacy engineering slugs ("Ohms", "WaterCycle")
    // that routinely contradict what the master actually teaches.
    const srcTopic = (SRC[nodeIds[0]]?.topic ?? '').replace(/\s+/g, ' ').trim();
    const compTitle = titleCase(body.replace(SUBJ_GUESS, '')
        .replace(/(detailed|general|interactive|introductory|intro|basic|advanced|simulation|sim|v2)$/i, ''))
        || titleCase(body);
    const title = srcTopic || compTitle;
    const topic = srcTopic || compTitle;

    // challenges from the master's OWN declared nodes — with remediation
    const challenges = [], beats = [];
    for (const nid of nodeIds.slice(0, 6)) {
        const s = mdSec(nid);
        if (!s) continue;
        const ms = misSlug(s.COMMON_MISCONCEPTION);
        const parts = [];
        for (let i = 1; i <= 4 && parts.length < 3; i++) {
            const q = (s[`DIAGNOSTIC_QUESTION_${i}`] ?? '').trim();
            const a = (s[`DIAGNOSTIC_ANSWER_${i}`] ?? '').trim();
            if (!q || !a) continue;
            const correct = resolveLetter(q, a) ?? shortAnswer(a);
            if (/^(steps?:\s*\d+|n\/?a|yes|no|true|false)\.?$/i.test(correct) || correct.length < 4 || correct.length > 80) continue;
            const wrongs = wrongClaims(a, s.COMMON_MISCONCEPTION, 2).filter(w => w.toLowerCase() !== correct.toLowerCase());
            const opts = [correct, ...wrongs];
            if (opts.length < 2) continue;
            parts.push(`                { id: '${String.fromCharCode(97 + parts.length)}', prompt: '${esc(sent(q, 160))}', answer: '${esc(correct)}',\n                  options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],\n                  hint: 'Check your reasoning on the interactive.',\n                  misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? '', 140))}' }`);
        }
        // fallback for prose-only nodes: definition vs sibling definitions
        if (!parts.length) {
            const correct = shortAnswer(s.DEFINITION ?? '');
            if (correct && correct.length >= 15 && correct.length <= 90) {
                const siblings = nodeIds.filter(x => x !== nid)
                    .map(x => shortAnswer((mdSec(x) ?? {}).DEFINITION ?? ''))
                    .filter(x => x && x.length >= 10 && x.length <= 90 && x.toLowerCase() !== correct.toLowerCase())
                    .slice(0, 3);
                if (siblings.length >= 2) {
                    parts.push(`                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '${esc(correct)}',\n                  options: [${[correct, ...siblings].map(o => `'${esc(o)}'`).join(', ')}],\n                  hint: 'Check your reasoning on the interactive.',\n                  misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? '', 140))}' }`);
                }
            }
        }
        if (parts.length) {
            const stepFmt = [...(s.ON_FAILURE ?? '').matchAll(/Step\s*\d+:\s*(.+?)(?=Step\s*\d+:|$)/gis)].map(m => sent(m[1], 120)).filter(Boolean);
            let remSteps = stepFmt.length ? stepFmt
                : (s.ON_FAILURE ?? '').split(/(?<=[.!?])\s+/).map(x => sent(x, 120)).filter(x => x.length > 25).slice(0, 4);
            if (!remSteps.length) {
                remSteps = [
                    s.COMMON_MISCONCEPTION ? `The common error: ${sent(s.COMMON_MISCONCEPTION, 110)}` : `Remember: ${sent(s.DEFINITION ?? title, 110)}`,
                    'Check the interactive again, then retry.',
                ];
            }
            const remediation = remSteps.length
                ? `,\n            remediations: { '${ms}': { steps: [${remSteps.map(r => `'${esc(r)}'`).join(', ')}] } }` : '';
            challenges.push(`        { type: 'subpart', nodeId: '${nid}', difficulty: 'standard',\n          question: '${esc(sent(s.DEFINITION ?? 'Check yourself:', 80))}',\n          hint: '${esc(sent(s.PREREQ_STUCK ?? 'Work step by step.', 90))}',\n          misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? 'Check each part.', 120))}',\n          parts: [\n${parts.join(',\n')}\n          ]${remediation} }`);
            // fresh retest variant — diagnostics 5-6 of the same node
            const rparts = [];
            for (const i of [5, 6, ...(parts.length < 3 ? [4] : [])]) {
                if (rparts.length >= 3) break;
                const q = (s[`DIAGNOSTIC_QUESTION_${i}`] ?? '').trim();
                const a = (s[`DIAGNOSTIC_ANSWER_${i}`] ?? '').trim();
                if (!q || !a) continue;
                const correct = resolveLetter(q, a) ?? shortAnswer(a);
                if (/^(steps?:\s*\d+|n\/?a|yes|no|true|false)\.?$/i.test(correct) || correct.length < 4 || correct.length > 80) continue;
                const wrongs = wrongClaims(a, s.COMMON_MISCONCEPTION, 3).filter(w => w.toLowerCase() !== correct.toLowerCase());
                const opts = [correct, ...wrongs].filter(Boolean);
                if (opts.length < 2) continue;
                rparts.push(`                { id: '${String.fromCharCode(97 + rparts.length)}', prompt: '${esc(sent(q, 160))}', answer: '${esc(correct)}',\n                  options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],\n                  hint: 'Check your reasoning on the interactive.',\n                  misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? '', 140))}' }`);
            }
            if (rparts.length) {
                challenges.push(`        { type: 'subpart', nodeId: '${nid}', difficulty: 'advanced',\n          question: 'Prove it again — new questions.',\n          hint: 'Same idea, different angle.',\n          misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? 'Check each part.', 120))}',\n          parts: [\n${rparts.join(',\n')}\n          ]${remediation} }`);
            }
        }
        // beat: scaffold from worked example, else case from walkthrough
        const we = s.WORKED_EXAMPLE_1;
        const steps = we ? [...we.matchAll(/-\s*Step\s*\d+:\s*(.+)/gi)].map(m => m[1]) : [];
        const ans = (we ?? '').match(/ANSWER:\s*(.+)/)?.[1] ?? '';
        const prob = (we ?? '').match(/PROBLEM:\s*(.+)/)?.[1] ?? '';
        if (steps.length >= 2 && prob.trim().length > 10 && ans.trim().length > 2) {
            const stepsTs = steps.map((st, i) => `            { text: '${esc(sent(st, 120))}'${i === steps.length - 1 ? `, faded: true, blankAnswer: '${esc(sent(ans, 60))}'` : ''} }`).join(',\n');
            beats.push(`        { type: 'scaffold', nodeId: '${nid}', title: '${esc(sent(s.DEFINITION ?? nid, 40))}',\n          scaffold: { problem: '${esc(sent(prob, 140))}',\n            steps: [\n${stepsTs}\n            ] } }`);
        } else if (s.WALKTHROUGH) {
            const w = wrongClaims(s.DIAGNOSTIC_ANSWER_1, s.COMMON_MISCONCEPTION, 2);
            const cor = shortAnswer(s.DIAGNOSTIC_ANSWER_1 ?? '');
            const o = [cor, ...w].filter(Boolean).slice(0, 4);
            if (o.length >= 2 && (s.DIAGNOSTIC_QUESTION_1 ?? '').trim()) {
                const ms2 = misSlug(s.COMMON_MISCONCEPTION);
                const optTs = o.map((x, i) => `                { text: '${esc(x)}', outcome: '${i === 0 ? esc(sent(s.DIAGNOSTIC_ANSWER_1, 100)) : esc('Not quite — ' + sent(s.COMMON_MISCONCEPTION ?? 'revisit the idea', 100))}'${i === 0 ? '' : `, reveals: '${ms2}'`} }`).join(',\n');
                beats.push(`        { type: 'case', nodeId: '${nid}', title: '${esc(sent(s.DEFINITION ?? nid, 40))}',\n          caseStudy: { intro: '${esc(sent(s.WALKTHROUGH, 160))}',\n            decisions: [{ prompt: '${esc(sent(s.DIAGNOSTIC_QUESTION_1, 140))}', options: [\n${optTs}\n            ] }] } }`);
            }
        }
    }
    const n0 = mdSec(nodeIds[0]) ?? {};
    // discovery: walk nodes×diagnostics for a clean MCQ hook
    let discovery = `    // discovery omitted — no cleanly extractable hook`;
    for (const nid of nodeIds.slice(0, 6)) {
        const s = mdSec(nid) ?? {};
        let done = false;
        for (let i = 1; i <= 6; i++) {
            const q = (s[`DIAGNOSTIC_QUESTION_${i}`] ?? '').trim();
            const a = (s[`DIAGNOSTIC_ANSWER_${i}`] ?? '').trim();
            if (!q || !a || q.length < 15) continue;
            const correct = resolveLetter(q, a) ?? shortAnswer(a);
            if (!correct || correct.length < 4 || correct.length > 80) continue;
            if (/^(steps?:\s*\d+|n\/?a|yes|no|true|false)\.?$/i.test(correct)) continue;
            const wrongs = wrongClaims(a, s.COMMON_MISCONCEPTION, 2).filter(w => w.toLowerCase() !== correct.toLowerCase());
            const opts = [correct, ...wrongs];
            if (opts.length < 3 || new Set(opts.map(o => o.toLowerCase())).size !== opts.length) continue;
            discovery = `    discovery: {\n        question: '${esc(sent(q, 160))}',\n        options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],\n        answer: '${esc(correct)}',\n        hook: '${esc(sent(s.COMMON_MISCONCEPTION ?? "Let's find out!", 120))}',\n    },`;
            done = true; break;
        }
        if (done) break;
    }
    // variety: if only one beat type emitted, add a dissect from node topics
    const types = new Set(beats.map(b => b.match(/type: '(\w+)'/)?.[1]));
    if (types.size < 2 && nodeIds.length >= 2) {
        const spots = [], seen = new Set();
        for (const nid of nodeIds.slice(0, 6)) {
            const s = mdSec(nid) ?? {};
            const topic = (s.DEFINITION ?? '').split(/\s+/).slice(0, 5).join(' ').replace(/[^\w\s-]/g, '').trim();
            if (topic.length < 4 || topic.length > 60 || seen.has(topic.toLowerCase())) continue;
            seen.add(topic.toLowerCase());
            spots.push({ label: topic, prompt: `Which idea is this? — ${sent(s.DEFINITION ?? topic, 90)}`, answer: topic });
        }
        if (spots.length >= 2) {
            const all = spots.map(x => x.answer);
            const spotsTs = spots.map((sp, i) => {
                const others = all.filter(x => x !== sp.answer).slice(0, 3);
                return `            { id: 's${i + 1}', label: '${esc(sp.label)}', prompt: '${esc(sp.prompt)}', answer: '${esc(sp.answer)}', options: [${[sp.answer, ...others].map(o => `'${esc(o)}'`).join(', ')}] }`;
            }).join(',\n');
            beats.push(`        { type: 'dissect', nodeId: '${nodeIds[1] ?? nodeIds[0]}', title: 'Identify each idea',\n          dissect: { specimen: '${esc(title)}', spots: [\n${spotsTs}\n          ] } }`);
        }
    }

    // definition-based fallback when no diagnostic shapes a clean MCQ
    if (discovery.includes('omitted')) {
        for (const nid of nodeIds.slice(0, 6)) {
            const s = mdSec(nid) ?? {};
            const correct = shortAnswer(s.DEFINITION ?? '');
            if (!correct || correct.length < 15 || correct.length > 80) continue;
            const wrongs = wrongClaims('', s.COMMON_MISCONCEPTION, 3).filter(w => w.toLowerCase() !== correct.toLowerCase());
            const opts = [correct, ...wrongs].slice(0, 4);
            if (opts.length < 3 || new Set(opts.map(o => o.toLowerCase())).size !== opts.length) continue;
            discovery = `    discovery: {\n        question: 'At its core — what does "${esc(sent(title, 50))}" mean?',\n        options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],\n        answer: '${esc(correct)}',\n        hook: '${esc(sent(s.COMMON_MISCONCEPTION ?? "Let's find out!", 120))}',\n    },`;
            break;
        }
    }
    const simId = `v3w_${comp.toLowerCase()}`;
    const def = `import type { SimDef } from '../../engine/types';
import ${comp} from '../../../simulations/${path.basename(dir)}/${comp}';

/** v3 wrapped master — ${comp}. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_${comp.toLowerCase()}: SimDef = {
    id: '${simId}',
    title: '${esc(title)}',
    subtitle: '${esc(sent(n0.SCOPE_BOUNDARY ?? topic, 90))}',
    classLevel: ${cls}, subject: '${esc(subject)}', topic: '${esc(topic)}',
    chapters: [],
    nodeIds: [${nodeIds.map(x => `'${x}'`).join(', ')}],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class ${cls} learner', intro: '${esc(sent(n0.WALKTHROUGH ?? topic, 110))}', goal: 'Master ${esc(sent(title, 50))}.' },
${discovery}
    teaching: [
        { title: '${esc(sent(n0.DEFINITION ?? title, 45))}', text: '${esc(sent(n0.DEFINITION ?? topic, 200))}', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [\n${beats.join(',\n')}\n    ],
    explore: { component: ${comp}, prompt: 'Explore the interactive — ${esc(title)}' },
    challenges: [
${challenges.join(',\n')}
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
`;
    return { cls, comp, file: `${comp}.ts`, def, challenges: challenges.length, nodeIds: nodeIds.length };
}

// ── main ─────────────────────────────────────────────────────────────
const byClass = new Map();
let wrapped = 0, skipped = 0;
for (const dir of MASTER_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.tsx') || file === 'c6_wrapped.ts') continue;
        const w = wrapMaster(file, dir);
        // a wrapped master with zero generated diagnostics can't feed BKT —
        // don't put it in the v3 loop; it stays reachable via the old registry
        if (!w || w.challenges === 0) { skipped++; continue; }
        if (!byClass.has(w.cls)) byClass.set(w.cls, []);
        byClass.get(w.cls).push(w);
        wrapped++;
    }
}
for (const [cls, list] of byClass) {
    const dir = path.join(SIMS_DIR, `class${cls}`, 'v3w');
    if (!DRY) fs.mkdirSync(dir, { recursive: true });
    const imports = [], names = [];
    for (const b of list) {
        if (!DRY) fs.writeFileSync(path.join(dir, b.file), b.def, 'utf8');
        imports.push(`import { w_${b.comp.toLowerCase()} } from './v3w/${b.comp}';`);
        names.push(`    w_${b.comp.toLowerCase()},`);
    }
    const idx = `/** GENERATED — wrapped masters class ${cls}. Rebuilt by tools/wrap_masters.mjs. */\nimport type { SimDef } from '../engine/types';\n${imports.join('\n')}\n\nexport const CLASS${cls}_V3W_SIMS: SimDef[] = [\n${names.join('\n')}\n];\n`;
    if (!DRY) fs.writeFileSync(path.join(SIMS_DIR, `class${cls}`, 'v3w_index.ts'), idx, 'utf8');
    // per-sim lazy loaders — one master sim must not drag the other 47
    // bespoke components into the compile graph
    const ldr = `/** GENERATED — per-sim lazy loaders, class ${cls} masters. Rebuilt by tools/wrap_masters.mjs. */\nexport const V3W_LOADERS: Record<string, () => Promise<Record<string, unknown>>> = {\n${list.map(b => `    'v3w_${b.comp.toLowerCase()}': () => import('./v3w/${b.comp}'),`).join('\n')}\n};\n`;
    if (!DRY) fs.writeFileSync(path.join(SIMS_DIR, `class${cls}`, 'v3w_loaders.ts'), ldr, 'utf8');
}
console.log(`wrapped ${wrapped} masters across classes ${[...byClass.keys()].join(', ')} (skipped ${skipped})`);
const withCh = [...byClass.values()].flat().filter(b => b.challenges > 0).length;
console.log(`with generated diagnostics: ${withCh}/${wrapped}`);
