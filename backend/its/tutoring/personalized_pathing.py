"""personalized_pathing.py — Tier 2: the graph adapts to the student, not vice versa.

Tier 1 fixed the per-question experience. Tier 2 fixes the path between
questions. Four engines:

  1. GraphNavigator  — shortest personal path from current mastery to a goal
                       node, using the C6-C12 prerequisite graph + BKT state.
                       Not a fixed sequence: a route computed per student.

  2. StruggleMonitor — reads response_ms + hint usage + error streaks and
                       classifies "productive struggle" vs "flailing".
                       Flailing -> intervene now. Productive -> let them cook.

  3. TeachingCheck   — "learning by teaching": after mastery, ask the student
                       to explain the concept back or solve a teach-the-bot
                       variant. Protege effect — explaining doubles retention.

  4. Interleaver     — mixes topics within review sessions instead of blocked
                       same-topic practice (spiral_service currently blocks).

All engines are pure — they take state in, return decisions out. Persistence
and rendering live elsewhere.
"""

from __future__ import annotations

import heapq
import logging
import math
from collections import defaultdict, deque
from dataclasses import dataclass, field
from typing import Any, Optional

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# 1. GraphNavigator — shortest personal path through the C6-C12 graph
# ---------------------------------------------------------------------------

@dataclass
class PathStep:
    node_id: str
    p_known: float
    reason: str            # "goal" | "prereq_gap" | "bridge"


@dataclass
class PersonalPath:
    goal: str
    steps: list[PathStep]
    skipped_mastered: int = 0

    def summary(self) -> str:
        return (f"Path to {self.goal}: {len(self.steps)} steps, "
                f"{self.skipped_mastered} prereqs already mastered")


class GraphNavigator:
    """Computes the shortest unmastered path to a goal node.

    edges: {node_id: [prereq_ids]} — the graph we built for C6-C12.
    mastery: {node_id: p_known}    — from knowledge_tracing.py.
    """

    def __init__(self, edges: dict[str, list[str]], p_gate: float = 0.90):
        self.edges = edges
        self.p_gate = p_gate

    def path_to(self, goal: str, mastery: dict[str, float],
                max_steps: int = 12) -> PersonalPath:
        """BFS backward from goal over unmastered prerequisites.

        Mastered nodes (p_known >= p_gate) are skipped — the path only
        contains what the student still has to learn, ordered so every
        node appears after its own prerequisites.
        """
        needed: set[str] = set()
        skipped = 0
        queue = deque([goal])
        while queue:
            node = queue.popleft()
            if node in needed:
                continue
            if mastery.get(node, 0.0) >= self.p_gate:
                skipped += 1
                continue
            needed.add(node)
            for pre in self.edges.get(node, []):
                if mastery.get(pre, 0.0) < self.p_gate:
                    queue.append(pre)

        # topo-sort the needed subgraph so prereqs come first
        order = self._topo(needed, mastery)
        steps = [
            PathStep(nid, mastery.get(nid, 0.0),
                     "goal" if nid == goal else "prereq_gap")
            for nid in order[:max_steps]
        ]
        return PersonalPath(goal=goal, steps=steps, skipped_mastered=skipped)

    def _topo(self, nodes: set[str], mastery: dict[str, float]) -> list[str]:
        """Kahn's algorithm restricted to the needed set."""
        indeg: dict[str, int] = {n: 0 for n in nodes}
        for n in nodes:
            for pre in self.edges.get(n, []):
                if pre in nodes:
                    indeg[n] += 1
        # lowest mastery first when several nodes are simultaneously ready —
        # fix the deepest gap first
        heap = [(-mastery.get(n, 0.0), n) for n, d in indeg.items() if d == 0]
        heapq.heapify(heap)
        out: list[str] = []
        while heap:
            _, n = heapq.heappop(heap)
            out.append(n)
            for m in nodes:
                if n in self.edges.get(m, []) and m not in out:
                    indeg[m] -= 1
                    if indeg[m] == 0:
                        heapq.heappush(heap, (-mastery.get(m, 0.0), m))
        return out


# ---------------------------------------------------------------------------
# 2. StruggleMonitor — productive struggle vs flailing
# ---------------------------------------------------------------------------

class StruggleState:
    PRODUCTIVE = "productive"     # thinking hard, trying things — let them work
    FLAILING = "flailing"         # random guessing / rapid failures — intervene
    IDLE = "idle"                 # not engaging — check in
    FLOW = "flow"                 # smooth progress — don't interrupt


@dataclass
class StruggleSignal:
    state: str
    evidence: list[str]
    recommended_action: str


class StruggleMonitor:
    """Classifies the student's current effort state from telemetry."""

    RAPID_MS = 8000        # answers faster than this are probably guesses
    STUCK_MS = 300_000     # no answer for 5 min = idle
    FLAIL_STREAK = 3       # rapid wrong answers in a row

    def classify(self, recent: list[dict], hints_used: int) -> StruggleSignal:
        """recent: last N attempts [{is_correct, response_ms}] newest-first."""
        evidence: list[str] = []
        if not recent:
            return StruggleSignal(StruggleState.IDLE, ["no recent attempts"],
                                  "check_in_prompt")

        wrongs = [a for a in recent if not a.get("is_correct")]
        rapid_wrong = [a for a in wrongs
                       if (a.get("response_ms") or 0) < self.RAPID_MS]

        if len(rapid_wrong) >= self.FLAIL_STREAK:
            evidence.append(f"{len(rapid_wrong)} rapid wrong answers (<{self.RAPID_MS}ms)")
            return StruggleSignal(StruggleState.FLAILING, evidence,
                                  "stop_and_scaffold_now")

        if wrongs and all((a.get("response_ms") or 0) > self.RAPID_MS * 3
                          for a in wrongs[:3]):
            evidence.append("wrong answers but slow, considered attempts")
            evidence.append(f"{hints_used} hints used")
            return StruggleSignal(StruggleState.PRODUCTIVE, evidence,
                                  "let_them_struggle_light_hint_only")

        if not wrongs:
            return StruggleSignal(StruggleState.FLOW, ["recent answers correct"],
                                  "no_intervention")

        return StruggleSignal(StruggleState.PRODUCTIVE,
                              evidence or ["mixed results"],
                              "monitor")


# ---------------------------------------------------------------------------
# 3. TeachingCheck — learning by teaching (protege effect)
# ---------------------------------------------------------------------------

@dataclass
class TeachTask:
    kind: str                     # explain_back | teach_bot | find_the_error
    prompt: str
    rubric: list[str]             # what a good explanation must contain


class TeachingCheck:
    """Generates explain-it-back tasks for mastered concepts."""

    def build(self, node: dict, mastery: float) -> Optional[TeachTask]:
        if mastery < 0.85:
            return None    # not ready to teach it yet
        topic = node.get("topic", node.get("node_id", "this concept"))
        mis = node.get("top_misconception")
        if mis:
            return TeachTask(
                kind="find_the_error",
                prompt=(f"A classmate says: \"{mis.get('description', '')}\" "
                        f"Explain to them why they're wrong about {topic}, "
                        f"and what the correct idea is."),
                rubric=["identifies the wrong belief", "states the correct rule",
                        "explains WHY it's correct", "gives a correct example"],
            )
        return TeachTask(
            kind="explain_back",
            prompt=(f"Explain {topic} to a student one class below you. "
                    f"Include: what it is, when to use it, and one worked "
                    f"example you'd give them."),
            rubric=["correct definition", "when/why to apply",
                    "valid worked example", "mentions a common mistake"],
        )


# ---------------------------------------------------------------------------
# 4. Interleaver — mixed-topic review instead of blocked practice
# ---------------------------------------------------------------------------

class Interleaver:
    """Shuffles review items across topics so retrieval is effortful.

    spiral_service serves same-topic blocks. Interleaved practice feels
    harder but produces ~30-50% better long-term retention (Rohrer &
    Taylor). Constraint: never two consecutive items from the same node —
    enough spacing to force re-retrieval, not so much the session feels random.
    """

    def interleave(self, items: list[dict]) -> list[dict]:
        """Reorder review items to avoid same-node adjacency."""
        buckets: dict[str, deque] = defaultdict(deque)
        for it in items:
            buckets[it.get("node_id", "?")].append(it)
        if len(buckets) < 2:
            return items  # nothing to interleave

        out: list[dict] = []
        last_node = None
        while buckets:
            # pick the fullest bucket that isn't the last node used
            order = sorted(buckets.keys(),
                           key=lambda k: -len(buckets[k]))
            picked = None
            for k in order:
                if k != last_node:
                    picked = k
                    break
            if picked is None:
                picked = order[0]
            out.append(buckets[picked].popleft())
            if not buckets[picked]:
                del buckets[picked]
            last_node = picked
        return out
