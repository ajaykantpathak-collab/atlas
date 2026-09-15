import type { BKTState } from "@/types";
// masters import BKTState from here — re-export the canonical type
export type { BKTState };

// accepts either a node id (ignored — state is keyed by the caller's map) or
// numeric priors (pKnown, pTransit, pSlip, pGuess) — legacy masters use both.
export function createBKTState(
  idOrPKnown?: string | number,
  pTransit = 0.1,
  pSlip = 0.1,
  pGuess = 0.25,
): BKTState {
  const pKnown = typeof idOrPKnown === 'number' ? idOrPKnown : 0.0;
  return { pKnown, pTransit, pSlip, pGuess };
}

/** v3: priors tuned by the node's COGNITIVE_LEVEL — a remember-level item
 * is more guessable than a create-level one, and harder items slip more. */
export function createBKTStateForLevel(level?: string): BKTState {
  const base = createBKTState();
  switch ((level ?? '').toLowerCase()) {
    case 'remember':  return { ...base, pGuess: 0.35, pSlip: 0.05, pTransit: 0.12 };
    case 'understand': return { ...base, pGuess: 0.25, pSlip: 0.08, pTransit: 0.10 };
    case 'apply':      return { ...base, pGuess: 0.20, pSlip: 0.10, pTransit: 0.09 };
    case 'analyze':
    case 'evaluate':
    case 'create':     return { ...base, pGuess: 0.12, pSlip: 0.15, pTransit: 0.06 };
    default:           return base;
  }
}

/** v3: edge-weighted credit propagation — evidence on a node damps into its
 * graph neighbours (prereqs & successors) so mastery on hard nodes warms
 * the estimate of related nodes instead of treating them as independent.
 * weight per hop, applied to the delta of the source update. */
export function propagateEvidence(
  sourceId: string,
  sourceDelta: number,
  edges: Map<string, string[]>,          // nodeId -> linked nodeIds
  bktStates: Map<string, BKTState>,
  weight = 0.25,
): Map<string, BKTState> {
  const next = new Map(bktStates);
  const linked = edges.get(sourceId) ?? [];
  for (const nid of linked) {
    const s = next.get(nid);
    if (!s) continue;
    next.set(nid, {
      ...s,
      pKnown: Math.min(1, Math.max(0, s.pKnown + sourceDelta * weight)),
    });
  }
  return next;
}

export function bktUpdate(state: Partial<BKTState>, observedCorrect: boolean): BKTState {
  // legacy masters sometimes hand us a partial { pKnown } — fall back to the
  // standard priors for missing params instead of producing NaN posteriors.
  const pKnown = state?.pKnown ?? 0;
  const pTransit = state?.pTransit ?? 0.1;
  const pSlip = state?.pSlip ?? 0.1;
  const pGuess = state?.pGuess ?? 0.25;

  const numerator = observedCorrect
    ? pKnown * (1 - pSlip)
    : pKnown * pSlip;
  const denominator = observedCorrect
    ? pKnown * (1 - pSlip) + (1 - pKnown) * pGuess
    : pKnown * pSlip + (1 - pKnown) * (1 - pGuess);

  let pKnownPosterior = denominator > 0 ? numerator / denominator : 0;
  pKnownPosterior = pKnownPosterior + (1 - pKnownPosterior) * pTransit;

  return {
    pKnown: Math.min(1, Math.max(0, pKnownPosterior)),
    pTransit,
    pSlip,
    pGuess,
  };
}

// accepts either the raw probability or a whole BKTState — legacy masters
// pass `state` directly; resolve it to pKnown instead of letting an object
// comparison silently pick the wrong band.
export function getMasteryLevel(p: number | BKTState): "not-started" | "beginner" | "developing" | "proficient" | "mastered" {
  const pKnown = typeof p === "number" ? p : p.pKnown;
  if (pKnown === 0) return "not-started";
  if (pKnown < 0.25) return "beginner";
  if (pKnown < 0.5) return "developing";
  if (pKnown < 0.85) return "proficient";
  return "mastered";
}

export function getAdaptivePath(
  nodes: { id: string; prerequisites?: string[] }[],
  bktStates: Map<string, BKTState>
): { path: string[]; gaps: string[] } {
  const mastered = new Set<string>();
  const gaps: string[] = [];

  for (const [nodeId, state] of Array.from(bktStates.entries())) {
    if (state.pKnown >= 0.85) mastered.add(nodeId);
  }

  const unmastered = nodes.filter((node) => {
    const state = bktStates.get(node.id);
    return !state || state.pKnown < 0.85;
  });

  const path: string[] = [];
  const visited = new Set<string>();

  function visit(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    if (node.prerequisites) {
      for (const prereq of node.prerequisites) {
        if (!mastered.has(prereq)) {
          gaps.push(prereq);
          visit(prereq);
        }
      }
    }

    const state = bktStates.get(nodeId);
    if (!state || state.pKnown < 0.85) {
      path.push(nodeId);
    }
  }

  for (const node of unmastered) {
    visit(node.id);
  }

  return { path: Array.from(new Set(path)), gaps: Array.from(new Set(gaps)) };
}

/** masters that need the raw 0–1 probability (for ×100 displays, sums,
 * thresholds) should call this — getMasteryLevel returns the band string. */
export function masteryProb(p: number | { pKnown: number }): number {
  return typeof p === "number" ? p : (p?.pKnown ?? 0);
}

export function getRecommendedDifficulty(p: number | BKTState): "easy" | "medium" | "hard" {
  const pKnown = typeof p === "number" ? p : p.pKnown;
  if (pKnown < 0.3) return "easy";
  if (pKnown < 0.7) return "medium";
  return "hard";
}
