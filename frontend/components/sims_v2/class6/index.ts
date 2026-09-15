/**
 * sims_v2/class6 — senior-mode gap sims built on the shared engine.
 * Covers the enhanced-graph nodes the standalone c6_12 sims miss:
 * English (u1-u5), math, civics/economics/geography/history, science.
 * Real nodeIds throughout.
 */
import type { SimDef } from '../engine/types';
import { c6EnglishSims } from './english';
import { c6MathsSims } from './maths';
import { c6SocialSims } from './social';
import { c6ScienceSims } from './science';
import { C6_DEEP } from './deep';
// C6_WRAPPED removed — superseded by v3w_* (same components + beats/discovery/remediation)
import { CLASS6_V3_SIMS } from './v3_index';
import { CLASS6_V3W_SIMS } from './v3w_index';

export const CLASS6_SIMS: SimDef[] = [
    ...CLASS6_V3W_SIMS,
    ...CLASS6_V3_SIMS,
    ...c6EnglishSims,
    ...c6MathsSims,
    ...c6SocialSims,
    ...c6ScienceSims,
    ...C6_DEEP,
];
