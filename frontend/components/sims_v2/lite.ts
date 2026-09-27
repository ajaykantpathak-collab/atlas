/**
 * lite.ts — metadata-only registry + graph routing.
 * Reads SIM_INDEX.json (0.6MB, one module) instead of statically
 * importing 2,374 full SimDef modules — keeps route bundles small
 * and dev compiles fast. Full defs load lazily per-class at play time.
 */
import SIM_INDEX_JSON from './SIM_INDEX.json';
import NODE_GRAPH from './NODE_GRAPH.json';

export interface SimMeta { id: string; t: string; c: number; s: string; n: string[]; ch: string; d: string }

const IDX = SIM_INDEX_JSON as Record<string, Omit<SimMeta, 'id'>>;
const GRAPH = NODE_GRAPH as Record<string, { pre: string[]; fwd: string[] }>;

export const allSimsMeta = (): SimMeta[] =>
    Object.entries(IDX).map(([id, m]) => ({ id, ...m }));

export const getSimMeta = (id: string): SimMeta | undefined =>
    IDX[id] ? { id, ...IDX[id] } : undefined;

const simsForNode = (nodeId: string): SimMeta[] =>
    Object.entries(IDX).filter(([, m]) => m.n.includes(nodeId)).map(([id, m]) => ({ id, ...m }));

export const prereqLinks = (nodeId: string): SimMeta[] =>
    (GRAPH[nodeId]?.pre ?? []).flatMap(simsForNode);

export const nextLinks = (nodeId: string): SimMeta[] =>
    (GRAPH[nodeId]?.fwd ?? []).flatMap(simsForNode);

/** SimDefs are emitted as JSON by scripts/emit-sim-json.js (prebuild) —
 *  served statically from /sims/, fetched one pack at a time at play time.
 *  This keeps ~80MB of generated data OUT of the webpack module graph;
 *  only the component code (masters + interactives) is compiled. */
import SIM_FILE_MAP_JSON from './SIM_FILE_MAP.json';
const FILE_MAP = SIM_FILE_MAP_JSON as Record<string, string>;

const packs = new Map<string, Promise<Record<string, unknown> | null>>();
const loadPack = (file: string) => {
    let p = packs.get(file);
    if (!p) {
        p = fetch(`/sims/${file}.json`)
            .then(r => (r.ok ? r.json() : null))
            .catch(() => null);
        packs.set(file, p);
    }
    return p;
};

const pickDef = (mod: Record<string, unknown>, id: string) =>
    Object.values(mod).find(v => v && typeof v === 'object' && (v as { id?: string }).id === id) ?? null;

export async function loadSimDef(id: string) {
    const file = FILE_MAP[id];
    if (file) {
        const pack = await loadPack(file);
        const def = pack?.[id];
        if (def) return def;
    }
    // defs that could not be JSON-serialized keep their real modules
    try {
        const { RESIDUAL_LOADERS } = await import('./residual_loaders.gen');
        const load = RESIDUAL_LOADERS[id];
        if (load) return pickDef(await load(), id);
    } catch { /* no residual match */ }
    return null;
}

// ─── node → sim resolution (subject+chapter, never cross-subject) ──────────

/** Whole-subject synonyms ONLY — compound subjects (eng_h, hin_a, eng_w)
 *  must stay themselves so they can never fold onto another subject's
 *  chapter ("c11_eng_h_cbse_02_014" is English-Elective-Hornbill, not the
 *  English-core "engl" chapters). */
const SUBJECT_SYNONYMS: Record<string, string> = {
    physics: 'phy', chemistry: 'chem', biology: 'bio',
    maths: 'math', mathematics: 'math',
    english: 'eng', hindi: 'hin', civics: 'civ', economics: 'eco',
    geography: 'geo', history: 'hist', social: 'soc', science: 'sci',
};

const normSubject = (s: string): string => SUBJECT_SYNONYMS[s] ?? s;

interface NodeAddr { cls: string; subj: string; chap: string }

/**
 * Parse an index chapter code into {class, subject, chapter}. Handles the
 * zero-padded and compound-subject shapes ("c10_bio_ch01", "c9_physics_ch1",
 * "c11_eng_h_ch02"). Returns null for the classes 1-5 book-name codes
 * ("Marigold-1: poems") — those carry no cbse-style node ids to match.
 */
function parseChapterCode(ch: string): NodeAddr | null {
    const m = /^c(\d{1,2})_([a-z0-9]+(?:_[a-z0-9]+)*?)_ch0*(\d{1,3})$/.exec(ch);
    return m ? { cls: m[1], subj: normSubject(m[2]), chap: String(parseInt(m[3], 10)) } : null;
}

/**
 * Parse a corpus node id into {class, subject, chapter}. The subject is
 * every token between the class and the chapter marker, kept WHOLE, so it
 * can only ever match the same subject in the index. Handles both id
 * shapes: "c10_bio_cbse_01_001" and "c6_physics_ch03_012".
 */
function parseNodeAddress(nodeId: string): NodeAddr | null {
    const head = /^c(\d{1,2})_/.exec(nodeId);
    if (!head) return null;
    const toks = nodeId.split('_');
    let chap: string | null = null;
    let mark = -1;
    for (let i = 1; i < toks.length; i++) {
        const tk = toks[i];
        if (/^ch\d{1,3}$/i.test(tk)) { chap = String(parseInt(tk.slice(2), 10)); mark = i; break; }
        if (/^\d{1,3}$/.test(tk)) { chap = String(parseInt(tk, 10)); mark = i; break; }
    }
    if (chap === null || mark < 2) return null;
    let subj = toks.slice(1, mark);
    if (subj.length > 1 && /^(cbse|ncert|ch)$/i.test(subj[subj.length - 1])) subj = subj.slice(0, -1);
    if (!subj.length) return null;
    return { cls: head[1], subj: normSubject(subj.join('_')), chap };
}

/**
 * The sim that teaches this node — resolved from the sims index.
 *
 * 1. An index entry that lists the node id EXACTLY wins outright.
 * 2. Otherwise the lowest-id entry (part 1 before part 2) whose chapter
 *    equals the node's own parsed class+subject+chapter. The address is
 *    parsed from the node id itself, so a cross-subject match is
 *    impossible by construction.
 *
 * Returns null when nothing matches — callers must fall back honestly,
 * never guess a neighbouring subject's sim.
 */
export function findSimForNode(nodeId: string): SimMeta | null {
    if (!nodeId) return null;
    const node = parseNodeAddress(nodeId);
    let chapterPick: SimMeta | null = null;
    for (const [id, m] of Object.entries(IDX)) {
        if (m.n.includes(nodeId)) return { id, ...m };
        if (!node) continue;
        const addr = parseChapterCode(m.ch);
        if (addr && addr.cls === node.cls && addr.subj === node.subj && addr.chap === node.chap) {
            if (!chapterPick || id < chapterPick.id) chapterPick = { id, ...m };
        }
    }
    return chapterPick;
}
