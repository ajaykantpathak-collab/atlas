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
