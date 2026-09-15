"""experience_engine.py — Tier 3: polish that compounds over a school year.

Tier 1 fixed starting. Tier 2 fixed the path. Tier 3 fixes everything around
it — the metacognition, the motivation, and which variant of a question the
student sees.

  1. MetacognitivePlanner — "what's your plan?" prompts before solving.
     Students who articulate a plan transfer skills to new problems
     significantly better than students who dive in.

  2. SkillTree — renders the C6-C12 graph as visible progress. Nodes light
     up as BKT mastery grows; prereq gates become visible unlock conditions.

  3. AffectMonitor — detects frustration/disengagement from behavior signals
     (rapid wrongs, abandonment, session collapse) and feeds MotivateBot the
     right intervention instead of a generic cheer-up.

  4. VariantSelector — picks WHICH sub-part variant to serve. The comp files
     give ~100 variants per node; this chooses by IRT theta + misconception
     state + recency (don't repeat a variant family too soon).
"""

from __future__ import annotations

import logging
import math
import random
from dataclasses import dataclass, field
from typing import Any, Optional

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# 1. MetacognitivePlanner — planning prompts before solving
# ---------------------------------------------------------------------------

class MetacognitivePlanner:
    """Injects a plan-first beat before problems above a difficulty floor."""

    MIN_LEVEL_FOR_PLAN = 2     # don't interrupt level-0/1 fading with planning

    def plan_prompt(self, node_topic: str, difficulty: str) -> Optional[str]:
        if difficulty not in ("Advanced", "Advanced+"):
            return None
        return (f"Before you touch the numbers: in one or two sentences, "
                f"what's your plan for this {node_topic} problem? "
                f"Which concepts will you need, in what order?")

    def grade_plan(self, plan_text: str, required_concepts: list[str]) -> dict:
        """Light rubric: does the plan mention the required concepts?"""
        low = plan_text.lower()
        hit = [c for c in required_concepts
               if any(w in low for w in c.lower().split("_"))]
        return {
            "concepts_identified": hit,
            "coverage": len(hit) / len(required_concepts) if required_concepts else 0.0,
            "has_sequence": any(w in low for w in ("first", "then", "next", "finally")),
            "feedback": ("Good plan." if hit else
                         "Your plan doesn't name the concepts you'll need — "
                         "try identifying the topic of each sub-part before solving."),
        }


# ---------------------------------------------------------------------------
# 2. SkillTree — visible progress map over the C6-C12 graph
# ---------------------------------------------------------------------------

@dataclass
class TreeNode:
    node_id: str
    topic: str
    p_known: float
    state: str             # mastered | in_progress | unlocked | locked
    blocking: list[str] = field(default_factory=list)


class SkillTree:
    """Projects the prereq graph + mastery into a student-visible tree."""

    P_MASTERED = 0.90
    P_IN_PROGRESS = 0.30

    def build(self, nodes: list[str], topics: dict[str, str],
              edges: dict[str, list[str]],
              mastery: dict[str, float]) -> list[TreeNode]:
        out: list[TreeNode] = []
        for nid in nodes:
            p = mastery.get(nid, 0.0)
            blocking = [pre for pre in edges.get(nid, [])
                        if mastery.get(pre, 0.0) < self.P_MASTERED]
            if p >= self.P_MASTERED:
                state = "mastered"
            elif p >= self.P_IN_PROGRESS:
                state = "in_progress"
            elif blocking:
                state = "locked"
            else:
                state = "unlocked"
            out.append(TreeNode(nid, topics.get(nid, nid), p, state, blocking))
        return out

    def next_unlocks(self, tree: list[TreeNode], n: int = 3) -> list[TreeNode]:
        """Nodes closest to unlocking — the 'you're almost there' list."""
        locked = [t for t in tree if t.state == "locked"]
        locked.sort(key=lambda t: len(t.blocking))
        return locked[:n]


# ---------------------------------------------------------------------------
# 3. AffectMonitor — frustration / disengagement detection
# ---------------------------------------------------------------------------

class AffectState:
    ENGAGED = "engaged"
    FRUSTRATED = "frustrated"
    DISENGAGING = "disengaging"
    BORED = "bored"          # too easy — everything right, very fast


@dataclass
class AffectReading:
    state: str
    signals: list[str]
    motivate_action: str


class AffectMonitor:
    """Turns session telemetry into an emotional-state guess for MotivateBot."""

    def read(self, recent: list[dict], session_minutes: float,
             abandonments: int) -> AffectReading:
        signals: list[str] = []
        if not recent:
            return AffectReading(AffectState.DISENGAGING,
                                 ["no attempts this session"], "gentle_checkin")

        wrongs = sum(1 for a in recent if not a.get("is_correct"))
        fast = sum(1 for a in recent
                   if (a.get("response_ms") or 0) < 5000)
        correct = len(recent) - wrongs

        if abandonments >= 2 or (wrongs >= 4 and fast >= 3):
            signals.append(f"{abandonments} abandoned items")
            signals.append(f"{fast} sub-5s responses (likely frustration clicks)")
            return AffectReading(AffectState.FRUSTRATED, signals,
                                 "drop_difficulty_empathy_first")

        if session_minutes > 40 and wrongs / len(recent) > 0.6:
            signals.append(f"{session_minutes:.0f}min session with {wrongs/len(recent):.0%} wrong")
            return AffectReading(AffectState.DISENGAGING, signals,
                                 "suggest_break_or_easier_node")

        if correct == len(recent) and fast == len(recent):
            signals.append("all correct, all fast — under-challenged")
            return AffectReading(AffectState.BORED, signals,
                                 "raise_difficulty")

        return AffectReading(AffectState.ENGAGED, signals or ["normal pattern"],
                             "none")


# ---------------------------------------------------------------------------
# 4. VariantSelector — which of ~100 comp variants to serve
# ---------------------------------------------------------------------------

@dataclass
class VariantChoice:
    variant_id: str
    reason: str


class VariantSelector:
    """Chooses the next question variant for a node.

    Strategy:
      * if the student has an active misconception for this node -> serve the
        variant whose trap targets that misconception
      * else pick by IRT: variant difficulty closest to theta + 0.5
        (desirable difficulty — challenging but winnable)
      * never repeat a variant family within `cooldown` items
    """

    COOLDOWN = 5

    def choose(self, variants: list[dict], theta: float,
               active_misconception: Optional[str],
               recent_families: list[str]) -> Optional[VariantChoice]:
        if not variants:
            return None

        fresh = [v for v in variants
                 if v.get("family") not in recent_families[-self.COOLDOWN:]]
        pool = fresh or variants

        if active_misconception:
            targeted = [v for v in pool
                        if v.get("targets_misconception") == active_misconception]
            if targeted:
                return VariantChoice(random.choice(targeted).get("variant_id", "?"),
                                     f"targets active misconception {active_misconception}")

        # IRT match: closest difficulty to theta + 0.5
        def dist(v: dict) -> float:
            return abs((v.get("difficulty_b", 0.0)) - (theta + 0.5))
        best = min(pool, key=dist)
        return VariantChoice(best.get("variant_id", "?"),
                             f"IRT match: b={best.get('difficulty_b', 0):.2f} "
                             f"vs theta+0.5={theta + 0.5:.2f}")
