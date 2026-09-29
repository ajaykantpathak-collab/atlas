#!/usr/bin/env node
/**
 * build_simdefs.mjs — deterministic md_cache → v3 SimDef generator.
 *
 * Turns every chapter of enhanced-node markdown into a SimDef that the
 * validator can execute. This is the coverage backbone for classes 6-12:
 * chapters WITHOUT a wrapped master get a generated sim that is VALID by
 * construction (real misconceptions, remediation steps from ON_FAILURE,
 * worked-example scaffolds, distractors extracted from each answer's own
 * "a wrong answer reveals X" analysis).
 *
 *   node tools/build_simdefs.mjs --class 6          # one class
 *   node tools/build_simdefs.mjs                    # classes 6-12
 *   node tools/build_simdefs.mjs --dry --class 10   # report, no writes
 *
 * Output: sims_v2/class<N>/v3/<chapter>.ts + index regenerated.
 * Idempotent: rewrites generated files only; never touches hand-authored.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS_DIR = path.resolve(HERE, '..');
const MD_DIR = process.env.SIM_MD_CACHE ?? 'C:\\Users\\Alesha4285\\Desktop\\enhanced_nodes\\md_cache';
const SRC_DIR = process.env.SIM_NODE_SRC ?? path.join(path.dirname(MD_DIR), 'source');
// authored overlays: authored_content.json (hand-written, always wins) +
// tools/authored/*.json shards (generated/reviewed batches — disjoint files
// so multiple writers never collide on one file).
const AUTHORED = (() => {
    const out = {};
    // deep-merge per chapter key so shards can contribute single fields
    // (e.g. dilemmas.json adds {dilemma} without clobbering c12.json's discovery)
    const merge = (obj) => {
        for (const [k, v] of Object.entries(obj)) {
            if (k === '_readme' || !v || typeof v !== 'object' || Array.isArray(v)) continue;
            out[k] = { ...(out[k] ?? {}), ...v };
        }
    };
    const dir = path.join(HERE, 'authored');
    if (fs.existsSync(dir)) {
        for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json') && !x.startsWith('_')).sort()) {
            try {
                const parsed = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                // apply*.json shards carry flat scenario entries {title,scenario,
                // prompt,options} — nest them under `apply` so their `title`
                // can never clobber the chapter overlay's own title.
                const normalized = /^apply/.test(f)
                    ? Object.fromEntries(Object.entries(parsed).map(([k, v]) =>
                        [k, v && typeof v === 'object' && !v.apply ? { apply: v } : v]))
                    : parsed;
                merge(normalized);
            } catch { }
        }
    }
    try { merge(JSON.parse(fs.readFileSync(path.join(HERE, 'authored_content.json'), 'utf8'))); } catch { }
    delete out._readme;
    return out;
})();
// node-keyed warm misconception rewrites (tools/authored/misconceptions.json)
const MISC_OV = (() => { try { return JSON.parse(fs.readFileSync(path.join(HERE, 'authored', 'misconceptions.json'), 'utf8')); } catch { return {}; } })();
const ARGS = process.argv.slice(2);
const DRY = ARGS.includes('--dry');
const ONLY_CLASS = ARGS.includes('--class') ? Number(ARGS[ARGS.indexOf('--class') + 1]) : null;

// ─── filename parsing (mirrors backend/services/enhanced_nodes.py) ───
const PATS = [
    /^c(?<cls>\d+)_(?<subj>.+)_cbse_(?<chap>\d+)_(?<num>\d+)$/,
    /^c(?<cls>\d+)_(?<subj>.+?)_ch0*(?<chap>\d+)_(?<num>\d+)$/,
    /^c(?<cls>\d+)_(?<subj>.+?)_u0*(?<chap>\d+)_(?<num>\d+)$/,
];
const parseName = (stem) => {
    if (stem.endsWith('_comp')) return null;    // _comp companions are NOT sim nodes
    for (const p of PATS) {
        const m = stem.match(p);
        if (m) return { cls: +m.groups.cls, subj: m.groups.subj, chap: +m.groups.chap, num: +m.groups.num };
    }
    return null;
};

// ─── md section parsing ──────────────────────────────────────────────
const SECTION_RE = /^#{1,3}\s*(.+?)\s*$/gm;
function sectionsOf(text) {
    const out = {};
    let last = null, lastEnd = 0;
    for (const m of text.matchAll(SECTION_RE)) {
        if (last) out[last] = text.slice(lastEnd, m.index).trim();
        last = m[1].toUpperCase().replace(/\s+/g, '_'); lastEnd = m.index + m[0].length;
    }
    if (last) out[last] = text.slice(lastEnd).trim();
    return out;
}

const sent = (s, max = 220) => {
    // trim to sentence boundary, never mid-word
    const t = (s ?? '').replace(/\s+/g, ' ').trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max);
    const dot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
    let out = dot > 60 ? cut.slice(0, dot + 1) : cut.slice(0, cut.lastIndexOf(' '));
    // never end mid-number, mid-token, or on a dangling opener — back off
    out = out.replace(/[×÷=+−\-–—(/,;:(\s]+$/, '').replace(/\s[a-zA-Z]{0,2}$/, '').trim();
    if (out.length < 40) out = cut.slice(0, cut.lastIndexOf(' ')).replace(/[.,;:]+$/, '');
    return out.endsWith('.') || out.endsWith('!') || out.endsWith('?') ? out : out + '.';
};
const slug = (s) => (s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
/** short misconception id — first ~5 content words of the misconception */
const misSlug = (s) => slug((s ?? '').replace(/^(students?\s+(often\s+)?(think|believe|assume)s?\s*(that\s+)?)/i, '').split(/[.,;]/)[0]).split('-').slice(0, 5).join('-') || 'wrong-idea';
/** short option text: FIRST sentence only, cut at explanation markers —
 *  never swallows the "A wrong answer reveals…" meta-commentary. */
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
    // strip meta prefixes: "The correct answer is X" → "X"
    t = t.replace(/^the correct answer (?:is|highlights)\s*/i, '').trim();
    if (t.length > 90) t = t.slice(0, 90).replace(/\s\S*$/, '').trim();
    return t;
};
/** "The correct answer is (b)" → resolve to the actual lettered option
 *  text inside the question, e.g. `b) It bounces off the surface.` */
const resolveLetter = (q, a) => {
    const m = (a ?? '').match(/correct answer is \(?([a-e])\)?/i)
        ?? (a ?? '').match(/^\(?([a-e])\)?[\s.:]/);
    if (!m) return null;
    const L = m[1].toLowerCase();
    const re = new RegExp(`${L}\\)\\s*(.{4,80}?)(?=\\s*[a-e]\\)|$)`, 'i');
    const om = (q ?? '').match(re);
    return om ? shortAnswer(om[1]) : null;
};

// node_id → {chapter_name, topic} from enhanced_nodes/source/*.json
// canonical subject names — filename tags are abbreviations; the app's
// subject routing does prefix-matching ('phys', 'chem'…) so normalize.
const SUBJ_NORM = {
    phy: 'physics', phys: 'physics', chem: 'chemistry', bio: 'biology',
    math: 'mathematics', maths: 'mathematics', stat: 'statistics',
    geo: 'geography', hist: 'history', civ: 'civics', ps: 'political_science',
    pol: 'political_science', eco: 'economics', soc: 'sociology',
    psy: 'psychology', cs: 'computer_science', ip: 'informatics_practices',
    bs: 'business_studies', acc: 'accountancy', ca: 'computerised_accounting',
    hs: 'home_science', sci: 'science', evs: 'evs', biotech: 'biotechnology',
    mm: 'mass_media', ent: 'entrepreneurship', legal: 'legal_studies',
};
const normSubj = (s) => SUBJ_NORM[(s ?? '').toLowerCase()] ?? s;

const SRC = {};
try {
    for (const f of fs.readdirSync(SRC_DIR)) {
        if (!f.endsWith('.json')) continue;
        for (const n of JSON.parse(fs.readFileSync(path.join(SRC_DIR, f), 'utf8')))
            if (n?.node_id) SRC[n.node_id] = { chapter: n.chapter_name, topic: n.topic };
    }
} catch { /* source dir absent — titles fall back to definitions */ }
const esc = (s) => (s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

/** Extract short wrong-claims — ONLY from sentences that talk about wrong
 *  answers/misconceptions, so we never grab quoted pedagogical terms. */
function wrongClaims(ans, misconception, cap = 3) {
    const found = [];
    const src = `${ans ?? ''}. ${misconception ?? ''}`;
    // keep only sentences that diagnose a wrong answer — corpus phrases
    // vary: "A student who answers X is confusing…", "wrong answer (e.g.…)",
    // "students often think…", "confuses X with Y"
    const wrongCtx = src.split(/(?<=[.!?])\s+/)
        .filter(s => /wrong answer|misconceiv|confus|students?\s+(often\s+)?(think|believe|assume)|if they (chose|picked|said)|student who (answers|chose|picks|says|writes)/i.test(s))
        .join(' ');
    for (const m of wrongCtx.matchAll(/"([^"]{6,80})"|“([^”]{6,80})”/g))
        found.push(m[1] ?? m[2]);
    for (const m of wrongCtx.matchAll(/e\.g\.,?\s*(?:listing|choosing|saying|thinking|stating|naming)\s+"?(.{4,90}?)"?(?:\)|,?\s*(?:shows|reveals|indicates))/gi))
        found.push(m[1]);
    // "such as naming Babur or Aurangzeb", "—like saying X", "answers Y or Z"
    for (const m of wrongCtx.matchAll(/(?:such as|—like|, like)\s+(?:naming|saying|choosing|stating|listing|answering)\s+(.{4,90}?)(?:—|\.|,?\s*(?:reveals|shows|indicates|misses))/gi))
        found.push(m[1]);
    for (const m of wrongCtx.matchAll(/answers?\s+"?([A-Z][^",]{3,60})"?\s+or\s+"?([A-Z][^",.]{3,60})"?/g)) {
        found.push(m[1], m[2]);
    }
    // "answers that they left solely for better farming land"
    for (const m of wrongCtx.matchAll(/answers?\s+that\s+(.{6,90}?)(?:\.|;|,\s*(?:misunderstands|misses|reveals|shows))/gi))
        found.push(m[1]);
    for (const m of wrongCtx.matchAll(/assumes?\s+(?:that\s+)?(.{6,90}?)(?:\.|;|,\s*(?:missing|misunderstands|misses))/gi))
        found.push(m[1]);
    for (const m of wrongCtx.matchAll(/(?:think|believe|assume)s?\s+(?:that\s+)?(.{6,90}?)(?:\.|;|$)/gi))
        found.push(m[1]);
    const seen = new Set();
    return found
        .map(x => shortAnswer(x))
        .filter(x => x.length >= 6 && x.length <= 80)
        .filter(x => !STOP_END.test(x))                 // no dangling fragments
        .filter(x => { const k = x.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
        .slice(0, cap);
}

/** First interrogative or "imagine" hook from a walkthrough. */
function hookOf(walk, topic) {
    const w = (walk ?? '').replace(/\s+/g, ' ');
    const q = w.match(/[^.?!]*\?/);
    if (q) return sent(q[0], 140);
    const im = w.match(/Imagine[^.]*\./i);
    if (im) return sent(im[0], 140);
    return `What do you already know about ${topic || 'this'}?`;
}

// ─── lab matching by chapter content keywords ─────────────────────────
const LAB_RULES = [
    [/\b(coulomb|electrostatic|electric field|field (line|intensity)|capacit|quantiz)\b/i, 'efield'],
    [/\b(electric|circuit|current|voltage|bulb|battery|ohm|resist)\b/i, 'circuit'],
    [/\b(magnet|electromagnetic|induction|flux|coil|emf|solenoid|faraday)\b/i, 'emag'],
    [/\b(lens|refraction|focal|image formation|ray diagram|optics)\b/i, 'lens'],
    [/\b(light|shadow|reflec|prism|spectrum|mirror|dispersion)\b/i, 'prism'],
    [/\b(wave|sound|amplitude|frequency|wavelength|shm|harmonic|doppler|superposition)\b/i, 'wave'],
    [/\b(function|linear equation|straight line|coordinate|slope|graph|conic|parabola|ellipse|hyperbola)\b/i, 'graph'],
    [/\b(vector|scalar|dot product|cross product|component of)\b/i, 'vector'],
    [/\b(gas|pressure|boyle|charles|kinetic theory|ideal gas|piston|mole fraction)\b/i, 'gas'],
    [/\b(titrat|acid|base|ph\b|indicator|neutraliz|alkal)\b/i, 'titrate'],
    [/\b(equilibrium|le chatelier|reversible|k_eq|reaction rate)\b/i, 'equilibrium'],
    [/\b(orbit|planet|earth|rotation|revolution|solar|satellite|gravit)\b/i, 'orbit'],
    [/\b(pendulum|oscillat|swing|period)\b/i, 'pendulum'],
    [/\b(projectile|motion|velocity|acceleration|kinemat|throw|launch|trajectory)\b/i, 'projectile'],
    [/\b(cell|organelle|mitochondri|chloroplast|membrane)\b/i, 'cell'],
    [/\b(mitosis|meiosis|cell division|chromosome)\b/i, 'mitosis'],
    [/\b(heart|blood|circulat|pulse|cardiac)\b/i, 'heart'],
    [/\b(nephron|kidney|excret|urine|filtration)\b/i, 'nephron'],
    [/\b(atom|electron|proton|neutron|nucleus|element|shell)\b/i, 'atom'],
    [/\b(plant|seed|grow|photosynthes|germination|leaf)\b/i, 'grow'],
    [/\b(rain|water cycle|evaporat|cloud|weather)\b/i, 'cycle'],
    [/\b(weigh|mass|measure|kilogram|gram)\b/i, 'weigh'],
    [/\b(volume|capacity|litre|liter|pour|fill)\b/i, 'pour'],
    [/\b(balance|equal|equation|equality)\b/i, 'balance'],
    [/\b(fraction|part of|portion)\b/i, 'fraction'],
    [/\b(dna|gene|chromosom|nucleotid|replication|helix|genetic)\b/i, 'dna'],
    [/\b(demand|supply|market|equilibrium price|price determin)\b/i, 'supply'],
    [/\b(reflex|neuron|nerve|nervous|synapse|impulse|coordination)\b/i, 'reflex'],
    [/\b(digest|nutrition|enzyme|stomach|intestin|alimentary|absorption)\b/i, 'digest'],
    [/\b(ph|acid|base|alkali|indicator|neutralis|neutraliz)\b/i, 'ph'],
    [/\b(moon|lunar|eclipse|phase|tide)\b/i, 'moon'],
    [/\b(spectrum|electromagnetic wave|radio wave|x-ray|ultraviolet|infrared|frequency band)\b/i, 'spectrum'],
    [/\b(conic|parabola|hyperbola|ellipse|cone|section)\b/i, 'conic'],
    [/\b(molecule|molecular|covalent|compound|organic|protein|enzyme|amino acid|carbohydrate|lipid|polymer|peptide|nucleotide)\b/i, 'molecule'],
    [/\b(volume|surface area|mensurat|cylinder|sphere|cuboid|hemisphere|frustum|solid)\b/i, 'solid'],
    [/\b(trigonometr|radian|degree|sine|cosine|tangent|unit circle|angle)\b/i, 'unitcircle'],
    [/\b(earth|rotation|revolution|season|latitude|longitude|hemisphere|axis|equator|pole)\b/i, 'globe'],
];
// Labs only bind where a physical model is truthful — STEM subjects.
// Civics/history/economics get case/dissect beats, not a fake lab.
const STEM_SUBJ = /^(phy|physics|chem|chemistry|bio|biology|sci|science|evs|math|maths|mathematics)/i;
// humanities instruments — honest worlds: timeline for temporal content,
// flow for process content (bill→law, digestion, trade routes…)
const HUM_SUBJ = /^(hist|history|geo|geography|civ|civics|ps|political_science|eco|economics|bs|business_studies|acc|accountancy|soc|sociology|comm|eng|english|hin|hindi|urd|urdu|san|sanskrit|kar|kannada|ca|computer|cs|ip|informatics|stat|statistics|hs|home_science)/i;
const HUM_RULES = [
    [/\b(war|battle|empire|dynasty|invasion|centur|era|period|ancient|medieval|independence|revolution|timeline|chronolog|movement)\b/i, 'timeline'],
    [/\b(process|procedure|stage|step|cycle|flow|how .*(becomes|works|made|produced)|production|digestion|trade route|supply chain|election|constitution|bill)\b/i, 'flow'],
    [/\b(tense|verb|sentence|clause|grammar|active voice|passive|direct|indirect speech|transform|narrat)\b/i, 'flow'],
    [/\b(story|poem|stanza|character|plot|narrative|chapter|paragraph|essay|letter|article)\b/i, 'flow'],
    [/\b(demand|supply|market|price determin|equilibrium price|elasticity)\b/i, 'supply'],
];
// unambiguous scene keywords can bind at ≥2 hits; generic words need ≥3
const PRECISE_LABS = new Set(['efield', 'lens', 'wave', 'graph', 'vector', 'gas', 'titrate', 'emag', 'equilibrium', 'timeline', 'flow', 'dna', 'supply', 'reflex', 'digest', 'ph', 'moon', 'spectrum', 'conic']);
const labFor = (subj, blob) => {
    if (STEM_SUBJ.test(subj)) {
        // score every rule — the lab with the MOST keyword hits wins, so a
        // circuits chapter that mentions "coulomb" still binds to circuit
        let best = null, bestHits = 0;
        for (const [re, lab] of LAB_RULES) {
            const hits = (blob.match(new RegExp(re.source, 'gi')) ?? []).length;
            if (hits >= (PRECISE_LABS.has(lab) ? 2 : 3) && hits > bestHits) { best = lab; bestHits = hits; }
        }
        return best;
    }
    // non-STEM: only the honest instruments — timeline/flow — and only
    // when the chapter is actually about a temporal/process concept
    if (!HUM_SUBJ.test(subj)) return null;
    for (const [re, lab] of HUM_RULES) {
        const hits = (blob.match(new RegExp(re.source, 'gi')) ?? []).length;
        if (hits >= 3) return lab;
    }
    // subject-level fallback — history is temporal, civics/econ are processes
    if (/^hist|^history/.test(subj)) return 'timeline';
    if (/^(civ|civics|ps|political_science|geo|geography)/.test(subj)) return 'flow';
    if (/^(eco|economics|bs|business_studies|acc|accountancy)/.test(subj)) return 'flow';
    if (/^(cs|computer|ip|informatics|ca)/.test(subj)) return 'flow';   // algorithms = step sequences
    if (/^(stat|statistics)/.test(subj)) return 'graph';               // data plots
    if (/^(hs|home_science|soc|sociology)/.test(subj)) return 'flow';
    if (/^(eng|english|hin|hindi|urd|urdu|san|sanskrit|kar|kannada|tam|tel|mar|ben)/.test(subj)) return 'flow';
    return null;
};

/** A real, reachable single-key goal per lab — the remediation task must
 *  be completable, so target a slider's exact value (not a range). */
const LAB_GOALS = {
    circuit: 'circuit:switch=1', electric: 'electric:power=60',
    prism: 'prism:angle=60', orbit: 'orbit:speed=50', grow: 'grow:sun=60',
    cell: 'cell:zoom=70', heart: 'heart:rate=80', nephron: 'nephron:flow=60',
    atom: 'atom:electrons=4', mitosis: 'mitosis:stage=50',
    pendulum: 'pendulum:length=60', projectile: 'projectile:angle=45',
    cycle: 'cycle:heat=60', pour: 'pour:fill=50', weigh: 'weigh:grams=40',
    balance: 'balance:left=5,right=5', fraction: 'fraction:parts=4',
    stretch: 'stretch:length=50', jump: 'jump:pos=5',
    efield: 'efield:q1=80,q2=20', lens: 'lens:focal=50',
    wave: 'wave:amplitude=80', graph: 'graph:slope=75',
    gas: 'gas:temperature=80', titrate: 'titrate:drops=50',
    emag: 'emag:speed=80', vector: 'vector:ax=60',
    equilibrium: 'equilibrium:concentration=80',
    timeline: 'timeline:year=80', flow: 'flow:stage=80',
    dna: 'dna:unzip=70', supply: 'supply:demand=80', reflex: 'reflex:speed=70',
    digest: 'digest:progress=60', ph: 'ph:probe=25', moon: 'moon:phase=80',
    spectrum: 'spectrum:band=90', conic: 'conic:tilt=60',
    molecule: 'molecule:atoms=4', solid: 'solid:radius=60',
    unitcircle: 'unitcircle:angle=50', globe: 'globe:tilt=60',
};
const LAB_INSTR = {
    circuit: 'close the switch so the circuit is complete — does the bulb light?',
    electric: 'turn the power up to 60 — watch what happens to the output',
    prism: 'set the light angle to 60° — how does the spectrum shift?',
    orbit: 'raise the orbital speed to 50 — does the orbit hold?',
    grow: 'give the plant 60% sunlight — watch its growth rate',
    cell: 'zoom into the cell to 70% — what organelles appear?',
    heart: 'raise the heart rate to 80 bpm — watch the ECG trace',
    nephron: 'increase the filtration flow to 60 — what gets filtered?',
    atom: 'place 4 electrons — which shell fills first?',
    mitosis: 'move to stage 50 — what phase is the cell in?',
    pendulum: 'set the pendulum length to 60 — how does the period change?',
    projectile: 'launch at 45° — is that the maximum range?',
    cycle: 'add heat to 60 — how does the cycle respond?',
    pour: 'fill to 50 — what changes?',
    weigh: 'weigh out 40 g — is the scale balanced?',
    balance: 'balance both sides at 5 — is the scale level?',
    fraction: 'split into 4 parts — what fraction is each part?',
    stretch: 'stretch to length 50 — what happens to the material?',
    jump: 'reach position 5 — how far did it go?',
    efield: 'make charge A positive and B negative — do the field lines connect?',
    lens: 'set the focal length mid-range — where does the image form?',
    wave: 'push the amplitude up — do the particles move faster or just higher?',
    graph: 'steepen the slope — what does m control?',
    gas: 'heat the gas — watch the particles. Now compress the piston — same effect?',
    titrate: 'add titrant slowly — find the endpoint where the colour flips',
    emag: 'move the magnet fast — is a still magnet enough to make current?',
    vector: 'add vector b to a — is the result just the lengths added?',
    equilibrium: 'add more reactant — which way does the balance shift?',
    timeline: 'scrub to 80% through the era — what came before what?',
    flow: 'walk the process to the final stage — what order did it take?',
    dna: 'unzip the helix past 70% — what do the base pairs do?',
    supply: 'push demand to 80 — where does the price settle?',
    reflex: 'speed up the signal — how fast does the reflex fire?',
    digest: 'push the food to 60% — which organ is it in?',
    ph: 'probe a pH below 4 — acid or base?',
    moon: 'sweep to full moon — what does the lit fraction do?',
    spectrum: 'scan to the far right — which band has the most energy?',
    conic: 'tilt the plane past 60° — what curve do you get?',
    molecule: 'set atoms to 4 — how do the bonds hold the chain together?',
    solid: 'set radius to 60 — how does the volume respond?',
    unitcircle: 'sweep the angle to 180° — what happens to sin?',
    globe: 'tilt the axis — which hemisphere gets more light?',
};
const labGoalText = (lab) => LAB_INSTR[lab] ?? `explore the ${lab} interactive to the target state`;

// discovery only when extraction produced a clean MCQ — a malformed hook
// (stray 'Ask:', unbalanced quotes, <3 options) is worse than none.
function discoveryBlock(nodes, simTitle) {
    // try every node × every diagnostic until a clean MCQ-shaped one exists
    for (const n of nodes.slice(0, 6)) {
        const s = n.sec;
        for (let i = 1; i <= 6; i++) {
            const q = (s[`DIAGNOSTIC_QUESTION_${i}`] ?? '').trim();
            const a = (s[`DIAGNOSTIC_ANSWER_${i}`] ?? '').trim();
            if (!q || !a) continue;
            const correct = resolveLetter(q, a) ?? shortAnswer(a);
            if (!correct || correct.length < 4 || correct.length > 80) continue;
            if (/^(steps?:\s*\d+|n\/?a|yes|no|true|false)\.?$/i.test(correct)) continue;
            const wrongs = wrongClaims(a, s.COMMON_MISCONCEPTION, 2)
                .filter(w => w.toLowerCase() !== correct.toLowerCase());
            const opts = [correct, ...wrongs];
            if (opts.length < 3 || new Set(opts.map(o => o.toLowerCase())).size !== opts.length) continue;
            if (q.length < 15) continue;
            return `    discovery: {
        question: '${esc(sent(q, 160))}',
        options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],
        answer: '${esc(correct)}',
        hook: '${esc(sent(s.COMMON_MISCONCEPTION ?? 'Let\'s find out!', 120))}',
    },`;
        }
    }
    // last resort: definition-based discovery from the first node's DEFINITION
    // + misconception claims — still grounded in real corpus fields
    for (const n of nodes.slice(0, 6)) {
        const s = n.sec;
        const correct = shortAnswer(s.DEFINITION ?? '');
        if (!correct || correct.length < 15 || correct.length > 80) continue;
        const wrongs = wrongClaims('', s.COMMON_MISCONCEPTION, 3)
            .filter(w => w.toLowerCase() !== correct.toLowerCase());
        const opts = [correct, ...wrongs].slice(0, 4);
        if (opts.length < 3 || new Set(opts.map(o => o.toLowerCase())).size !== opts.length) continue;
        return `    discovery: {
        question: 'At its core — what does "${esc(simTitle)}" mean?',
        options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],
        answer: '${esc(correct)}',
        hook: '${esc(sent(s.COMMON_MISCONCEPTION ?? 'Let\'s find out!', 120))}',
    },`;
    }
    return `    // discovery omitted — no cleanly extractable hook in this chapter`;
}

// ─── beat variety: dissect for bio, drill for math ───────────────────
const DRILL_KIND = [
    [/percent|profit|loss|discount|interest/i, 'percent'],
    [/ratio|proportion|variation/i, 'ratio'],
    [/simple interest|compound interest|annu/i, 'si'],
    [/exponent|indices|power|logarithm/i, 'exponent'],
    [/linear|equation|inequation|variable/i, 'linear2'],
    [/algebra|polynomial|expression/i, 'algebra,linear2'],
    [/mean|median|mode|data|statistic|probability/i, 'data'],
    [/area|perimeter|mensuration|surface|volume/i, 'area,perimeter'],
    [/fraction|decimal|rational/i, 'fraction,decimal'],
];
const drillKindFor = (subj, blob) => {
    if (!/^(math|maths|mathematics|applied)/i.test(subj)) return null;
    for (const [re, k] of DRILL_KIND) if (re.test(blob)) return k;
    return 'algebra,linear2';
};

// bio dissect: each node's topic becomes a specimen spot to identify;
// options are sibling node topics — real confusion-space distractors.
function dissectBeat(nodes, specimen) {
    const spots = [];
    const seen = new Set();
    for (const n of nodes.slice(0, 6)) {
        const topic = SRC[n.id]?.topic ?? (n.sec.DEFINITION ?? '').split(/\s+/).slice(0, 5).join(' ');
        const short = topic.replace(/[^\w\s-]/g, '').trim();
        if (short.length < 4 || short.length > 60 || seen.has(short.toLowerCase())) continue;
        seen.add(short.toLowerCase());
        spots.push({ label: short, prompt: `Which idea is this? — ${sent(n.sec.DEFINITION ?? short, 90)}`, answer: short });
    }
    if (spots.length < 2) return null;
    const allLabels = spots.map(s => s.answer);
    const spotsTs = spots.map(sp => {
        const others = allLabels.filter(x => x !== sp.answer).slice(0, 3);
        return `            { id: 's${spots.indexOf(sp) + 1}', label: '${esc(sp.label)}', prompt: '${esc(sp.prompt)}', answer: '${esc(sp.answer)}', options: [${[sp.answer, ...others].map(o => `'${esc(o)}'`).join(', ')}] }`;
    }).join(',\n');
    return `        { type: 'dissect', nodeId: '${nodes[1]?.id ?? nodes[0].id}', title: 'Identify each idea',
          dissect: { specimen: '${esc(specimen)}', spots: [\n${spotsTs}\n          ] } }`;
}

// ─── chapter → SimDef ────────────────────────────────────────────────
function buildChapter(cls, subj, chap, files) {
    const allNodes = files.map(f => ({
        id: f.replace(/\.md$/, ''),
        sec: sectionsOf(fs.readFileSync(path.join(MD_DIR, f), 'utf8')),
    })).sort((a, b) => a.id.localeCompare(b.id));

    const topicBlob = allNodes.map(n => `${n.id} ${n.sec.DEFINITION ?? ''} ${n.sec.WALKTHROUGH ?? ''}`).join(' ');
    const lab = labFor(subj, topicBlob);
    const chapterBase = `c${cls}_${subj}_ch${String(chap).padStart(2, '0')}`;
    const titleBase = SRC[allNodes[0].id]?.chapter
        ?? sent(allNodes[0].sec.DEFINITION ?? `${subj.replace(/_/g, ' ')} chapter ${chap}`, 48);

    // one sim per ≤6-node part — a 15-node chapter becomes 3 sessions
    const partGroups = [];
    for (let i = 0; i < allNodes.length; i += 6) partGroups.push(allNodes.slice(i, i + 6));
    return partGroups.map((nodes, pi) => {
    const n0 = nodes[0].sec;
    const chapterId = partGroups.length > 1 ? `${chapterBase}_p${pi + 1}` : chapterBase;
    const simTitle = partGroups.length > 1 ? `${titleBase} · Part ${pi + 1}/${partGroups.length}` : titleBase;
    const nodeIds = nodes.map(n => n.id);

    // ── orientation (≤2 slides) ──
    const nodeTitle = (n) => SRC[n.id]?.topic ?? sent(n.sec?.DEFINITION ?? n.id, 40);
    const teaching = [
        `        { title: '${esc(nodeTitle(nodes[0]))}', text: '${esc(sent(n0.DEFINITION, 200))}', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }`,
    ];

    // ── beats: scaffold from worked examples, else case from walkthrough ──
    const beats = [];
    // mission beat first when a world is bound — students DO before they read
    const auth = AUTHORED[chapterBase];
    // short stage/era captions for flow+timeline missions — the chapter's real
    // node topics, trimmed to a few words so they fit beside a 3D node.
    const labLabels = (() => {
        const out = [];
        for (const n of nodes.slice(0, 6)) {
            let t = (SRC[n.id]?.topic ?? '').replace(/\s+/g, ' ').trim().replace(/\.+$/, '');
            t = t.split(' ').slice(0, 4).join(' ').replace(/[:\s]+$/, '').replace(/\s+(of|the|a|an|in|on|to|and|or|for|vs\.?|de|la|is|are)$/i, '').replace(/[:\s]+$/, '').trim();
            if (t && !out.includes(t)) out.push(t);
        }
        return out;
    })();
    if (lab && LAB_GOALS[lab]) {
        beats.push(`        { type: 'mission', nodeId: '${nodes[0].id}', title: 'Your mission',
          mission: { widget: '${lab}', validate: '${LAB_GOALS[lab]}',
            instruction: '${esc(`On the lab: ${labGoalText(lab)}.`)}',${auth?.mission ? `\n        context: '${esc(auth.mission)}',` : ''}${(lab === 'flow' || lab === 'timeline') && labLabels.length ? `\n        labels: [${labLabels.map(t => `'${esc(t)}'`).join(', ')}],` : ''}
            observePrompt: '${esc('What did the ' + lab + ' interactive show you?')}' } }`);
    }
    for (const n of nodes.slice(0, 6)) {
        const s = n.sec;
        const we = s.WORKED_EXAMPLE_1;
        const compType = (s.COMPUTATION_TYPE ?? '').toLowerCase();
        if (we && /arithmetic|algebraic|geometric|statistical/.test(compType)) {
            const steps = [...we.matchAll(/-\s*Step\s*\d+:\s*(.+)/gi)].map(m => m[1]);
            const ans = (we.match(/ANSWER:\s*(.+)/)?.[1] ?? '').trim();
            const prob = we.match(/PROBLEM:\s*(.+)/)?.[1] ?? '';
            // completability: scaffold needs a real problem AND a real blankAnswer
            if (steps.length >= 2 && prob.trim().length > 10 && ans.trim().length > 2) {
                const stepsTs = steps.map((st, i) => {
                    const faded = i >= steps.length - 1;
                    return `            { text: '${esc(sent(st, 120))}'${faded ? `, faded: true, blankAnswer: '${esc(sent(ans, 60))}'` : ''} }`;
                }).join(',\n');
                beats.push(`        { type: 'scaffold', nodeId: '${n.id}', title: '${esc(nodeTitle(n))}',\n          scaffold: { problem: '${esc(sent(prob, 140))}',\n            steps: [\n${stepsTs}\n            ] } }`);
                continue;
            }
        }
        // case beat: walkthrough scenario + decision from first diagnostic
        const q1 = (s.DIAGNOSTIC_QUESTION_1 ?? '').trim();
        const a1 = (s.DIAGNOSTIC_ANSWER_1 ?? '').trim();
        if (s.WALKTHROUGH && q1) {
            const wrongs = wrongClaims(a1, s.COMMON_MISCONCEPTION, 2);
            const correct = shortAnswer(a1);
            const opts = [correct, ...wrongs].filter(Boolean).slice(0, 4);
            if (opts.length >= 2) {
                const ms = misSlug(s.COMMON_MISCONCEPTION);
                const optTs = opts.map((o, i) => `                { text: '${esc(o)}', outcome: '${i === 0 ? esc(sent(a1, 100)) : esc('Not quite — ' + sent(s.COMMON_MISCONCEPTION ?? 'revisit the idea', 100))}'${i === 0 ? '' : `, reveals: '${ms}'`} }`).join(',\n');
                beats.push(`        { type: 'case', nodeId: '${n.id}', title: '${esc(nodeTitle(n))}',\n          caseStudy: { intro: '${esc(sent(s.WALKTHROUGH, 160))}',\n            decisions: [{ prompt: '${esc(sent(q1, 140))}', options: [\n${optTs}\n            ] }] } }`);
            }
        }
    }
    // dissect for bio-family subjects — specimen = chapter, spots = node ideas
    if (/^(bio|biology|biotech|hs|home_science|evs|sci|science)/i.test(subj)) {
        const d = dissectBeat(nodes, simTitle);
        if (d) beats.push(d);
    }
    // drill for math-family — generator produces fresh retrieval items
    const dk = drillKindFor(subj, topicBlob);
    if (dk) {
        beats.push(`        { type: 'drill', nodeId: '${nodes[nodes.length - 1].id}', title: 'Rapid check',
          drill: { kind: '${dk}', count: 4, level: ${Math.min(5, Math.max(1, cls - 5))} } }`);
    }
    // variety floor: a chapter with only one beat type gets a case beat
    // from the last node that has walkthrough+diagnostic content
    const beatTypes = new Set(beats.map(b => b.match(/type: '(\w+)'/)?.[1]));
    if (beatTypes.size < 2) {
        for (const n of [...nodes].reverse()) {
            const s = n.sec, q1 = (s.DIAGNOSTIC_QUESTION_1 ?? '').trim(), a1 = (s.DIAGNOSTIC_ANSWER_1 ?? '').trim();
            const intro = s.WALKTHROUGH ?? s.DEFINITION;   // case framing can be the definition
            if (!intro || !q1 || !a1) continue;
            const correct = resolveLetter(q1, a1) ?? shortAnswer(a1);
            const wrongs = wrongClaims(a1, s.COMMON_MISCONCEPTION, 2).filter(w => w.toLowerCase() !== correct.toLowerCase());
            const opts = [correct, ...wrongs].filter(Boolean).slice(0, 4);
            if (!correct || correct.length > 80 || opts.length < 2) continue;
            const ms2 = misSlug(s.COMMON_MISCONCEPTION);
            const optTs = opts.map((o, i) => `                { text: '${esc(o)}', outcome: '${i === 0 ? esc(sent(a1, 100)) : esc('Not quite — ' + sent(s.COMMON_MISCONCEPTION ?? 'revisit the idea', 100))}'${i === 0 ? '' : `, reveals: '${ms2}'`} }`).join(',\n');
            beats.push(`        { type: 'case', nodeId: '${n.id}', title: '${esc(nodeTitle(n))}',\n          caseStudy: { intro: '${esc(sent(intro, 160))}',\n            decisions: [{ prompt: '${esc(sent(q1, 140))}', options: [\n${optTs}\n            ] }] } }`);
            break;
        }
        // second fallback: dissect works for ANY subject — node topics as spots
        const nowTypes = new Set(beats.map(b => b.match(/type: '(\w+)'/)?.[1]));
        if (nowTypes.size < 2) {
            const d = dissectBeat(nodes, simTitle);
            if (d) beats.push(d);
        }
        // third fallback: build — reconstruct a worked example's step order
        const nowTypes2 = new Set(beats.map(b => b.match(/type: '(\w+)'/)?.[1]));
        if (nowTypes2.size < 2) {
            for (const n of nodes) {
                const we = n.sec.WORKED_EXAMPLE_1;
                const steps = we ? [...we.matchAll(/-\s*Step\s*\d+:\s*(.+)/gi)].map(m => sent(m[1], 60)) : [];
                if (steps.length < 3) continue;
                const blocks = [...steps].sort(() => 0.5 - Math.random()).map(s2 => `'${esc(s2)}'`).join(', ');
                beats.push(`        { type: 'build', nodeId: '${n.id}', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: [${blocks}], answer: '${esc(steps.join(' '))}' } }`);
                break;
            }
        }
    }

    // ── authored dilemma (values/ethics) — human-authored only, rides the
    // case machinery: options carry outcomes, none marked 'reveals' so
    // there is no wrong answer — only reasoned consequences.
    if (auth?.dilemma?.options?.length >= 2) {
        const d = auth.dilemma;
        const dOpts = d.options.map(o =>
            `                { text: '${esc(o.text)}', outcome: '${esc(o.outcome)}' }`).join(',\n');
        beats.push(`        { type: 'case', nodeId: '${nodes[0].id}', title: '${esc(d.title ?? 'A real-world call')}',
          caseStudy: { intro: '${esc(d.scenario)}',
            decisions: [{ prompt: '${esc(d.prompt)}', options: [\n${dOpts}\n            ] }] } }`);
    }

    // ── authored apply beat — "use it in the wild" transfer scenario ──
    // accepts nested {apply:{...}} OR a bare {scenario,prompt,options} entry
    const applySrc = auth?.apply ?? (auth?.scenario && auth?.options ? auth : null);
    if (applySrc?.options?.length >= 2) {
        const ap = applySrc;
        const apOpts = ap.options.map((o, i) =>
            `                { text: '${esc(o.text)}', outcome: '${esc(o.outcome)}'${o.correct ? '' : `, reveals: '${esc(o.reveals ?? 'revisit')}'`} }`).join(',\n');
        beats.push(`        { type: 'case', nodeId: '${nodes[0].id}', title: '${esc(auth?.apply?.title ?? 'Use it in the wild')}',
          caseStudy: { intro: '${esc(ap.scenario)}',
            decisions: [{ prompt: '${esc(ap.prompt)}', options: [\n${apOpts}\n            ] }] } }`);
    }

    // ── narrative arc: close each part with a finale + cliffhanger ──
    const nextPart = partGroups.length > 1 && pi < partGroups.length - 1;
    const nextTitle = nextPart ? `${titleBase} · Part ${pi + 2}/${partGroups.length}` : null;
    beats.push(`        { type: 'case', nodeId: '${nodes[nodes.length - 1].id}', title: '${nextPart ? 'The bigger picture' : 'You made it'}',
          caseStudy: { intro: '${esc(auth?.finale ?? (nextPart
            ? `You just worked through ${titleBase} like a real scientist — observed, predicted, tested, retried.`
            : `You finished ${titleBase} — every node, every misconception, earned not given.`))}',
            decisions: [{ prompt: '${esc(nextPart ? `What comes next? ${nextTitle} picks up right here.` : 'Ready to see how far you have come?')}', options: [
                { text: '${nextPart ? 'Continue — next part awaits' : 'Show me my results'}', outcome: '${esc(nextPart ? `Onward — ${nextTitle} builds on exactly this.` : 'Your mastery map is waiting.')}' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }`);

    // ── challenges: diagnostics → subpart w/ tap options, misconception-keyed ──
    const challenges = [];
    let retestEmitted = false;
    for (const n of nodes) {                    // every node gets diagnostics
        const s = n.sec;
        const ms = misSlug(s.COMMON_MISCONCEPTION);
        // ON_FAILURE is usually prose — "Step N:" first, else sentences
        const stepFmt = [...(s.ON_FAILURE ?? '').matchAll(/Step\s*\d+:\s*(.+?)(?=Step\s*\d+:|$)/gis)].map(m => sent(m[1], 120)).filter(Boolean);
        let remSteps = stepFmt.length ? stepFmt
            : (s.ON_FAILURE ?? '').split(/(?<=[.!?])\s+/).map(x => sent(x, 120)).filter(x => x.length > 25).slice(0, 4);
        // fallback: misconception itself becomes the remediation step
        // (warm human-authored rewrite wins when present)
        const miscText = MISC_OV[n.id] ?? (s.COMMON_MISCONCEPTION ? sent(s.COMMON_MISCONCEPTION, 110) : null);
        if (!remSteps.length && miscText) {
            remSteps = [
                MISC_OV[n.id] ? miscText : `The common error: ${miscText}`,
                s.PREREQ_STUCK ? sent(s.PREREQ_STUCK, 110) : 'Go back to the interactive and check each idea.',
                'Then answer the question again — slowly.',
            ];
        }
        // last fallback: definition-as-correction
        if (!remSteps.length && (s.DEFINITION ?? '').length > 40) {
            remSteps = [
                `Remember: ${sent(s.DEFINITION, 140)}`,
                'Check that idea against the interactive, then try again.',
            ];
        }
        // always-emit: a minimal remediation beats none
        if (!remSteps.length) {
            remSteps = [
                s.COMMON_MISCONCEPTION ? `The common error: ${sent(s.COMMON_MISCONCEPTION, 110)}` : `Remember: ${sent(s.DEFINITION ?? simTitle, 110)}`,
                'Go back, check each idea carefully, then answer again.',
            ];
        }
        const labTask = lab && LAB_GOALS[lab]
            ? `, labTask: { instruction: '${esc(`On the interactive: ${labGoalText(lab)} — then check.`)}', widget: '${lab}', validate: '${LAB_GOALS[lab]}' }` : '';
        const remediation = remSteps.length
            ? `,\n            remediations: { '${ms}': { steps: [${remSteps.slice(0, 4).map(r => `'${esc(r)}'`).join(', ')}]${labTask} } }` : '';
        // up to 4 diagnostics → subpart parts with tap options
        const parts = [];
        for (let i = 1; i <= 4; i++) {
            const q = (s[`DIAGNOSTIC_QUESTION_${i}`] ?? '').trim();
            const a = (s[`DIAGNOSTIC_ANSWER_${i}`] ?? '').trim();
            if (!q || !a) continue;
            const correct = resolveLetter(q, a) ?? shortAnswer(a);
            // skip placeholder/garbage answers present in the corpus itself
            if (/^(steps?:\s*\d+|n\/?a|yes|no|true|false)\.?$/i.test(correct) || correct.length < 4) continue;
            const wrongs = wrongClaims(a, s.COMMON_MISCONCEPTION, 3).filter(w => w.toLowerCase() !== correct.toLowerCase());
            const opts = [correct, ...wrongs].filter(Boolean);
            if (opts.length < 2 || !correct || correct.length > 80) continue;
            parts.push(`                { id: '${String.fromCharCode(96 + parts.length + 1)}', prompt: '${esc(sent(q, 160))}', answer: '${esc(correct)}',\n                  options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],\n                  hint: '${esc(sent(s.PREREQ_STUCK ?? 'Think about the key idea.', 100))}',\n                  misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? '', 140))}' }`);
        }
        // fallback for prose-only nodes: definition-mcq — correct = this node's
        // definition; distractors = sibling nodes' definitions (real confusion
        // space — they're what the chapter teaches, not fabricated wrong answers)
        if (!parts.length) {
            const correct = shortAnswer(s.DEFINITION ?? '');
            if (correct && correct.length >= 15 && correct.length <= 90) {
                const siblings = allNodes.filter(x => x.id !== n.id)
                    .map(x => shortAnswer(x.sec.DEFINITION ?? ''))
                    .filter(x => x && x.length >= 10 && x.length <= 90 && x.toLowerCase() !== correct.toLowerCase())
                    .slice(0, 3);
                if (siblings.length >= 2) {
                    parts.push(`                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '${esc(correct)}',\n                  options: [${[correct, ...siblings].map(o => `'${esc(o)}'`).join(', ')}],\n                  hint: '${esc(sent(s.PREREQ_STUCK ?? 'Recall the definition.', 100))}',\n                  misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? '', 140))}' }`);
                }
            }
        }
        if (parts.length) {
            challenges.push(`        { type: 'subpart', nodeId: '${n.id}', difficulty: 'standard',\n          question: '${esc(sent(s.DEFINITION ?? 'Apply the idea:', 80))}',\n          hint: '${esc(sent(s.PREREQ_STUCK ?? 'Work step by step.', 90))}',\n          misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? 'Check each part.', 120))}',\n          parts: [\n${parts.join(',\n')}\n          ]${remediation} }`);
            // fresh retest variant — first node that HAS diagnostics 5-6
            if (!retestEmitted) {
                const rparts = [];
                for (let i = 5; i <= 6 && rparts.length < 3; i++) {
                    const q = (s[`DIAGNOSTIC_QUESTION_${i}`] ?? '').trim();
                    const a = (s[`DIAGNOSTIC_ANSWER_${i}`] ?? '').trim();
                    if (!q || !a) continue;
                    const correct = resolveLetter(q, a) ?? shortAnswer(a);
                    if (/^(steps?:\s*\d+|n\/?a|yes|no|true|false)\.?$/i.test(correct) || correct.length < 4 || correct.length > 80) continue;
                    const wrongs = wrongClaims(a, s.COMMON_MISCONCEPTION, 3).filter(w => w.toLowerCase() !== correct.toLowerCase());
                    const opts = [correct, ...wrongs].filter(Boolean);
                    if (opts.length < 2) continue;
                    rparts.push(`                { id: '${String.fromCharCode(96 + rparts.length + 1)}', prompt: '${esc(sent(q, 160))}', answer: '${esc(correct)}',\n                  options: [${opts.map(o => `'${esc(o)}'`).join(', ')}],\n                  hint: '${esc(sent(s.PREREQ_STUCK ?? 'Think about the key idea.', 100))}',\n                  misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? '', 140))}' }`);
                }
                if (rparts.length) {
                    retestEmitted = true;
                    challenges.push(`        { type: 'subpart', nodeId: '${n.id}', difficulty: 'advanced',\n          question: 'Prove it again — new questions.',\n          hint: 'Same idea, different angle.',\n          misconception: '${esc(sent(s.COMMON_MISCONCEPTION ?? 'Check each part.', 120))}',\n          parts: [\n${rparts.join(',\n')}\n          ]${remediation} }`);
                }
            }
        }
    }
    if (!challenges.length) return null;

    const def = `import type { SimDef } from '../../engine/types';

/** v3 generated — ${chapterId} (${nodes.length} nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const ${chapterId.replace(/-/g, '_')}: SimDef = {
    id: 'v3_${chapterId}',
    title: '${esc(auth?.title ?? simTitle)}',
    subtitle: '${esc(auth?.subtitle ?? sent(n0.SCOPE_BOUNDARY ?? '', 90))}',
    classLevel: ${cls}, subject: '${esc(normSubj(subj))}', topic: '${esc(auth?.title ?? simTitle)}',
    chapters: ['${chapterBase}'],
    nodeIds: [${nodeIds.map(x => `'${x}'`).join(', ')}],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
${challenges.length > 10 ? `    sampleChallenges: 10,                    // long chapters rotate — fresh set each run\n` : ''}
    scenario: { role: '${esc(auth?.role ?? 'a class ' + cls + ' learner')}', intro: '${esc(auth?.intro ?? sent(n0.WALKTHROUGH ?? '', 110))}', goal: '${esc(auth?.goal ?? 'Master every idea in this chapter.')}' },
${auth?.discovery ? `    discovery: {
        question: '${esc(auth.discovery.question)}',
        options: [${auth.discovery.options.map(o => `'${esc(o)}'`).join(', ')}],
        answer: '${esc(auth.discovery.answer)}',
        hook: '${esc(auth.discovery.hook)}',
    },` : discoveryBlock(nodes, simTitle)}
    teaching: [\n${teaching.join(',\n')}\n    ],
    beats: [\n${beats.join(',\n')}\n    ],
${lab ? `    explore: { lab: '${lab}', prompt: '${esc('Explore the ' + lab + ' interactive — watch what changes!')}' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: '${lab}', verifyPrompt: 'Try it — were you right?' },
` : ''}    challenges: [\n${challenges.join(',\n')}\n    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
`;
    return { file: `${chapterId}.ts`, def, chapterId, nodeCount: nodes.length, lab };
    }).filter(Boolean);
}

// ─── main: scan corpus, group, emit ──────────────────────────────────
const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md'));
const groups = new Map();
for (const f of files) {
    const p = parseName(f.replace(/\.md$/, ''));
    if (!p) continue;
    if (ONLY_CLASS && p.cls !== ONLY_CLASS) continue;
    if (p.cls < 6 || p.cls > 12) continue;
    const key = `${p.cls}|${p.subj}|${p.chap}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(f);
}

const built = [], skipped = [];
for (const [key, flist] of [...groups.entries()].sort()) {
    const [cls, subj, chap] = key.split('|');
    const outs = buildChapter(+cls, subj, +chap, flist.sort());
    if (!outs.length) { skipped.push(key); continue; }
    built.push(...outs.map(o => ({ ...o, cls, subj })));
}

// write per-class dirs + index
const byClass = new Map();
for (const b of built) {
    if (!byClass.has(b.cls)) byClass.set(b.cls, []);
    byClass.get(b.cls).push(b);
}
for (const [cls, list] of byClass) {
    const dir = path.join(SIMS_DIR, `class${cls}`, 'v3');
    if (!DRY) fs.mkdirSync(dir, { recursive: true });
    const imports = [], names = [];
    for (const b of list) {
        if (!DRY) fs.writeFileSync(path.join(dir, b.file), b.def, 'utf8');
        const varName = b.chapterId.replace(/-/g, '_');
        imports.push(`import { ${varName} } from './v3/${b.chapterId}';`);
        names.push(`    ${varName},`);
    }
    const idx = `/** GENERATED — v3 sims for class ${cls}. Rebuilt by tools/build_simdefs.mjs. */\nimport type { SimDef } from '../engine/types';\n${imports.join('\n')}\n\nexport const CLASS${cls}_V3_SIMS: SimDef[] = [\n${names.join('\n')}\n];\n`;
    if (!DRY) fs.writeFileSync(path.join(SIMS_DIR, `class${cls}`, 'v3_index.ts'), idx, 'utf8');
    // per-sim lazy loaders: each entry is its own chunk, so playing ONE
    // sim compiles/loads ONLY that sim's module — not the whole class barrel.
    const ldr = `/** GENERATED — per-sim lazy loaders, class ${cls}. Rebuilt by tools/build_simdefs.mjs. */\nexport const V3_LOADERS: Record<string, () => Promise<Record<string, unknown>>> = {\n${list.map(b => `    'v3_${b.chapterId}': () => import('./v3/${b.chapterId}'),`).join('\n')}\n};\n`;
    if (!DRY) fs.writeFileSync(path.join(SIMS_DIR, `class${cls}`, 'v3_loaders.ts'), ldr, 'utf8');
}

// ── node graph: prereq/forward edges for results-screen routing ──────
if (!DRY) {
    const graph = {};
    for (const f of fs.readdirSync(MD_DIR)) {
        if (!f.endsWith('.md')) continue;
        const nid = f.replace(/\.md$/, '');
        const sec = sectionsOf(fs.readFileSync(path.join(MD_DIR, f), 'utf8'));
        const list = (k) => (sec[k] ?? '').split(/[\n,]+/).map(x => x.trim().split(/[\s:]/)[0]).filter(x => /^c\d+_/.test(x));
        const pre = list('PREREQUISITE_NODE_IDS'), fwd = list('FORWARD_NODE_IDS');
        if (pre.length || fwd.length) graph[nid] = { pre, fwd };
    }
    fs.writeFileSync(path.join(SIMS_DIR, 'NODE_GRAPH.json'), JSON.stringify(graph));
    console.log(`node graph: ${Object.keys(graph).length} nodes with edges`);
}

console.log(`built ${built.length} chapter sims across classes ${[...byClass.keys()].join(', ')}`);
console.log(`skipped (no usable diagnostics): ${skipped.length}${skipped.length && skipped.length < 30 ? ' — ' + skipped.join(', ') : ''}`);
console.log(`with labs: ${built.filter(b => b.lab).length} / ${built.length}`);
if (DRY) for (const b of built.slice(0, 10)) console.log(`  ${b.chapterId} — ${b.nodeCount} nodes${b.lab ? ' lab:' + b.lab : ''}`);
