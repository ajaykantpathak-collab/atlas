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

/** lazily load ONLY the class module containing a sim — the page's
 *  module graph stays ~1/7th the size of the full static index. */
const CLASS_LOADERS: Record<number, () => Promise<{ default?: unknown } & Record<string, unknown>>> = {
    1: () => import('./class1'), 2: () => import('./class2'),
    3: () => import('./class3'), 4: () => import('./class4'),
    5: () => import('./class5'), 6: () => import('./class6'),
    7: () => import('./class7'), 8: () => import('./class8'),
    9: () => import('./class9'), 10: () => import('./class10'),
    11: () => import('./class11'), 12: () => import('./class12'),
};

/** per-sim loader maps (generated): each entry is its own webpack chunk,
 *  so playing ONE sim compiles only that sim's module — not the whole
 *  class barrel and not 48 wrapped masters. */
const V3_LOADER_FILES: Record<number, () => Promise<{ V3_LOADERS: Record<string, () => Promise<Record<string, unknown>>> }>> = {
    6: () => import('./class6/v3_loaders'), 7: () => import('./class7/v3_loaders'),
    8: () => import('./class8/v3_loaders'), 9: () => import('./class9/v3_loaders'),
    10: () => import('./class10/v3_loaders'), 11: () => import('./class11/v3_loaders'),
    12: () => import('./class12/v3_loaders'),
};
const V3W_LOADER_FILES: Record<number, () => Promise<{ V3W_LOADERS: Record<string, () => Promise<Record<string, unknown>>> }>> = {
    6: () => import('./class6/v3w_loaders'), 7: () => import('./class7/v3w_loaders'),
    8: () => import('./class8/v3w_loaders'), 9: () => import('./class9/v3w_loaders'),
    10: () => import('./class10/v3w_loaders'), 11: () => import('./class11/v3w_loaders'),
    12: () => import('./class12/v3w_loaders'),
};

const pickDef = (mod: Record<string, unknown>, id: string) =>
    Object.values(mod).find(v => v && typeof v === 'object' && (v as { id?: string }).id === id) ?? null;

export async function loadSimDef(id: string) {
    const meta = IDX[id];
    const cls = meta?.c ?? +(id.match(/_c(\d+)_/)?.[1] ?? 6);
    try {
        const files = id.startsWith('v3w_') ? V3W_LOADER_FILES : id.startsWith('v3_') ? V3_LOADER_FILES : null;
        const loader = files?.[cls] ? (await files[cls]!()) : null;
        const load = loader && (id.startsWith('v3w_')
            ? (loader as { V3W_LOADERS: Record<string, () => Promise<Record<string, unknown>>> }).V3W_LOADERS[id]
            : (loader as { V3_LOADERS: Record<string, () => Promise<Record<string, unknown>>> }).V3_LOADERS[id]);
        if (load) {
            const def = pickDef(await load(), id);
            if (def) return def;
        }
    } catch { /* fall through to the class barrel */ }
    // compiled diagnostic sims (backend/its/competency/simdef_compiler.py) —
    // one lazy chunk per class_subject file, like the v3 loaders above
    if (id.startsWith('gen_')) {
        try {
            const g = await import('./generated/loaders');
            const genLoad = g.GENERATED_LOADERS[id];
            if (genLoad) {
                const def = pickDef(await genLoad(), id);
                if (def) return def;
            }
        } catch { /* fall through to the class barrel */ }
    }
    const mod = await (CLASS_LOADERS[cls] ?? CLASS_LOADERS[6])();
    const all = Object.values(mod).flatMap(v => Array.isArray(v) ? v : []) as { id: string }[];
    return all.find(s => s.id === id) ?? null;
}
