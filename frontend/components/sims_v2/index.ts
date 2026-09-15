/**
 * sims_v2 central registry — every class' SimDefs in one lookup.
 * Route: app/(student)/sims-v2/[id] renders SimPlayer(def, senior for ≥6).
 */
import type { SimDef } from './engine/types';
import { CLASS1_SIMS } from './class1';
import { CLASS2_SIMS } from './class2';
import { CLASS3_SIMS } from './class3';
import { CLASS4_SIMS } from './class4';
import { CLASS5_SIMS } from './class5';
import { CLASS6_SIMS } from './class6';
import { CLASS7_SIMS } from './class7';
import { CLASS8_SIMS } from './class8';
import { CLASS9_SIMS } from './class9';
import { CLASS10_SIMS } from './class10';
import { CLASS11_SIMS } from './class11';
import { CLASS12_SIMS } from './class12';
import { GENERATED_SIMS } from './generated';

export const ALL_SIMS_V2: SimDef[] = [
    ...CLASS1_SIMS, ...CLASS2_SIMS, ...CLASS3_SIMS, ...CLASS4_SIMS,
    ...CLASS5_SIMS, ...CLASS6_SIMS, ...CLASS7_SIMS, ...CLASS8_SIMS,
    ...CLASS9_SIMS, ...CLASS10_SIMS, ...CLASS11_SIMS, ...CLASS12_SIMS,
    // compiled diagnostic sims LAST — curated sims keep node-routing priority;
    // generated sims close the MISSING/PARTIAL depth gaps
    ...GENERATED_SIMS,
];

const BY_ID = new Map(ALL_SIMS_V2.map(s => [s.id, s]));
const BY_NODE = new Map<string, SimDef[]>();
const BY_CHAPTER = new Map<string, SimDef[]>();
for (const s of ALL_SIMS_V2) {
    for (const n of s.nodeIds ?? []) {
        if (!BY_NODE.has(n)) BY_NODE.set(n, []);
        BY_NODE.get(n)!.push(s);
    }
    for (const c of s.chapters ?? []) {
        if (!BY_CHAPTER.has(c)) BY_CHAPTER.set(c, []);
        BY_CHAPTER.get(c)!.push(s);
    }
}

export const getSimDef = (id: string): SimDef | undefined => BY_ID.get(id);
export const getSimsForNode = (nodeId: string): SimDef[] => BY_NODE.get(nodeId) ?? [];
export const getSimsForChapter = (chapterId: string): SimDef[] => BY_CHAPTER.get(chapterId) ?? [];
export const getSimsForClass = (cls: number): SimDef[] => ALL_SIMS_V2.filter(s => s.classLevel === cls);

// ── node graph: prereq/forward edges → next-sim routing ─────────────
import NODE_GRAPH from './NODE_GRAPH.json';
type Edges = { pre: string[]; fwd: string[] };
const GRAPH = NODE_GRAPH as Record<string, Edges>;

/** sims that teach the prerequisite of a node (for remediation routing) */
export function getPrereqSims(nodeId: string): SimDef[] {
    return (GRAPH[nodeId]?.pre ?? []).flatMap(getSimsForNode);
}
/** sims that teach what a node leads to (for "next up" routing) */
export function getNextSims(nodeId: string): SimDef[] {
    return (GRAPH[nodeId]?.fwd ?? []).flatMap(getSimsForNode);
}
