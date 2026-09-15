"""
kst_path_selector.py
Knowledge Space Theory (KST) path selector for optimal next-node selection.

This is Layer 2 (part 2) of the ITS stack. It uses the prerequisite graph
(from Neo4j or from .bloom.marker remediation paths) to determine what a
student is ready to learn next, targeting ~80% success probability
(the Duolingo Birdbrain pattern for maintaining flow state).

KST core concepts we use:
  1. Surmise relation: prerequisite graph (if you know X, you probably know Y)
  2. Knowledge state: subset of nodes a student has mastered
  3. Adaptive assessment: select next node that student is ready for
  4. Optimal next: node where P(success) ≈ 0.80

What this replaces:
  - Static "next topic" recommendation in _finish_diagnostic (tutor_service.py line 2543)
  - Instead of just following forward_node_ids, KST selects the optimal next node
    based on the student's actual knowledge state

What this does NOT replace:
  - The prerequisite graph itself (Neo4j owns that)
  - The forward_node_ids in enrichment (those become candidates, KST ranks them)

Pure Python — no external KST library needed. The kst/iructl package is a CLI
tool, not a clean Python API, so we implement the core KST logic directly.
"""

from __future__ import annotations

import logging
import random
from typing import Any

logger = logging.getLogger(__name__)

# Target success probability (Birdbrain/Duolingo pattern — maintains flow state)
TARGET_SUCCESS_PROB = 0.80


class KnowledgeState:
    """Represents what a student knows — a set of mastered node IDs."""

    def __init__(self, mastered: set[str] | None = None):
        self.mastered: set[str] = mastered or set()

    def add(self, node_id: str) -> None:
        self.mastered.add(node_id)

    def remove(self, node_id: str) -> None:
        self.mastered.discard(node_id)

    def has(self, node_id: str) -> bool:
        return node_id in self.mastered

    def to_dict(self) -> dict:
        return {"mastered": list(sorted(self.mastered))}

    @classmethod
    def from_dict(cls, data: dict) -> "KnowledgeState":
        return cls(mastered=set(data.get("mastered", [])))


class PrerequisiteGraph:
    """Prerequisite graph for KST surmise relations.

    Maps node_id -> list of prerequisite node_ids.
    A node is "learnable" if all or most prerequisites are mastered.
    """

    def __init__(self, prereqs: dict[str, list[str]] | None = None):
        # prereqs[node_id] = [prereq_node_id, ...]
        self.prereqs: dict[str, list[str]] = prereqs or {}

    def get_prereqs(self, node_id: str) -> list[str]:
        return self.prereqs.get(node_id, [])

    def add_prereq(self, node_id: str, prereq_id: str) -> None:
        if node_id not in self.prereqs:
            self.prereqs[node_id] = []
        if prereq_id not in self.prereqs[node_id]:
            self.prereqs[node_id].append(prereq_id)

    def all_nodes(self) -> set[str]:
        nodes: set[str] = set()
        for node_id, prereqs in self.prereqs.items():
            nodes.add(node_id)
            nodes.update(prereqs)
        return nodes


def estimate_success_probability(
    node_id: str,
    prereqs: list[str],
    knowledge_state: KnowledgeState,
    mastery_scores: dict[str, float] | None = None,
) -> float:
    """Estimate P(student will succeed on node) given their knowledge state.

    Uses a simple model:
      - Each prerequisite mastered = +1/n_prereqs to probability
      - If no prereqs, base probability = 0.5 (unknown)
      - Mastery scores (from BKT/CDM) refine the estimate

    This is a simplified IRT-like model. Not mathematically rigorous KST,
    but captures the key insight: more mastered prereqs = higher success prob.
    """
    if not prereqs:
        # No prerequisites — moderate probability
        return 0.5

    n_prereqs = len(prereqs)
    n_mastered = sum(1 for p in prereqs if knowledge_state.has(p))

    # Base: fraction of prereqs mastered
    p = n_mastered / n_prereqs

    # Refine with mastery scores if available
    if mastery_scores:
        scores = []
        for p_id in prereqs:
            if p_id in mastery_scores:
                scores.append(mastery_scores[p_id])
        if scores:
            avg_mastery = sum(scores) / len(scores)
            # Blend: 70% from binary mastery, 30% from continuous mastery scores
            p = 0.7 * p + 0.3 * avg_mastery

    return min(1.0, max(0.0, p))


def select_next_node(
    candidate_nodes: list[str],
    prereq_graph: PrerequisiteGraph,
    knowledge_state: KnowledgeState,
    mastery_scores: dict[str, float] | None = None,
    target_prob: float = TARGET_SUCCESS_PROB,
    exclude: set[str] | None = None,
) -> dict | None:
    """Select the optimal next node for the student to learn.

    KST/Birdbrain pattern: select the node where P(success) is closest to 0.80.
    This keeps the student in flow state — not too easy, not too hard.

    Args:
        candidate_nodes: List of node IDs the student could learn next
            (typically forward_node_ids from current node + unmastered siblings)
        prereq_graph: Prerequisite graph
        knowledge_state: What the student has mastered so far
        mastery_scores: Optional continuous mastery scores per node (from BKT/CDM)
        target_prob: Target success probability (default 0.80)
        exclude: Node IDs to exclude (already mastered, already failed badly, etc.)

    Returns:
        {"node_id": str, "success_prob": float, "prereqs_mastered": int,
         "prereqs_total": int, "reason": str}
        or None if no suitable node found.
    """
    exclude = exclude or set()
    # Also exclude already-mastered nodes
    exclude = exclude | knowledge_state.mastered

    scored: list[dict] = []
    for node_id in candidate_nodes:
        if node_id in exclude:
            continue

        prereqs = prereq_graph.get_prereqs(node_id)
        prob = estimate_success_probability(node_id, prereqs, knowledge_state, mastery_scores)
        n_mastered = sum(1 for p in prereqs if knowledge_state.has(p))

        scored.append({
            "node_id": node_id,
            "success_prob": prob,
            "prereqs_mastered": n_mastered,
            "prereqs_total": len(prereqs),
            "distance_from_target": abs(prob - target_prob),
        })

    if not scored:
        return None

    # Sort by distance from target probability (closest to 0.80 first)
    scored.sort(key=lambda x: x["distance_from_target"])

    best = scored[0]
    prob = best["success_prob"]

    # Generate reason
    if prob >= 0.9:
        reason = "Easy review — you've mastered all prerequisites"
    elif prob >= 0.7:
        reason = "Just right — you're ready for this challenge"
    elif prob >= 0.5:
        reason = "Stretch goal — most prerequisites are mastered"
    elif prob >= 0.3:
        reason = "Challenging — some prerequisites still need work"
    else:
        reason = "Hard — consider reviewing prerequisites first"

    best["reason"] = reason
    best["all_candidates"] = scored[:5]  # Top 5 for debugging

    return best


def build_prereq_graph_from_nodes(
    nodes: list[dict],
    prereq_field: str = "prerequisite_node_ids",
) -> PrerequisiteGraph:
    """Build a PrerequisiteGraph from a list of node dicts.

    Each node dict should have a 'node_id' field and a prerequisite field
    containing a list of prerequisite node IDs.
    """
    graph = PrerequisiteGraph()
    for node in nodes:
        node_id = node.get("node_id", "")
        if not node_id:
            continue
        prereqs = node.get(prereq_field, [])
        if isinstance(prereqs, list):
            for p in prereqs:
                if isinstance(p, str) and p:
                    graph.add_prereq(node_id, p)
    return graph


def build_prereq_graph_from_bloom_markers(
    bloom_markers: dict[str, dict],
) -> PrerequisiteGraph:
    """Build a PrerequisiteGraph from parsed .bloom.marker files.

    Uses remediation_paths to infer prerequisites:
      Q1_FAILS -> REVIEW c10_sci_cbse_008
    means c10_sci_cbse_008 is a prerequisite for this node.
    """
    graph = PrerequisiteGraph()
    for node_id, marker_data in bloom_markers.items():
        remediation = marker_data.get("remediation_paths", {})
        for q_key, path_data in remediation.items():
            review_node = path_data.get("review", "")
            if review_node and review_node != "none":
                graph.add_prereq(node_id, review_node)
    return graph


def adaptive_assessment_step(
    candidate_nodes: list[str],
    prereq_graph: PrerequisiteGraph,
    knowledge_state: KnowledgeState,
    mastery_scores: dict[str, float] | None = None,
) -> dict | None:
    """One step of KST adaptive assessment.

    Selects the node that would be most informative for determining
    the student's knowledge state — the node closest to 50% success probability
    (maximum information gain in IRT terms).

    Use this for initial assessment (placing a new student).
    Use select_next_node for ongoing learning (target 80%).
    """
    return select_next_node(
        candidate_nodes=candidate_nodes,
        prereq_graph=prereq_graph,
        knowledge_state=knowledge_state,
        mastery_scores=mastery_scores,
        target_prob=0.50,  # Maximum information at 50%
    )
