"""quest_service.py — The Session Composer.

Turns the ITS stack's signals (SM-2 due items, BKT/IRT mastery, sim catalog,
debate moments) into ONE lively, deterministic daily quest per student —
plus a weekly boss battle. This is the layer that makes the app *not*
monotonic: every session mixes at least three modalities.

Composition contract (per student, per day, deterministic by seed):

    1. REVIEW   up to 3 due SM-2 items              (retention)
    2. DRILL    1-2 seeded generator questions      (flow: IRT-filtered
               to ~70-85% predicted success)        (stretch)
    3. SIM      1 interactive simulation            (delight + intuition)
    4. DEBATE   1 misconception debate moment       (novelty)  [optional]
    5. BOSS     weekly mixed-topic battle on boss day (stakes)

All providers are injected, so this module is pure orchestration logic:
no DB, no imports of solvers_regen at module scope (see
``generator_registry.get_drill_generator`` for the default drill source).

Usage::

    svc = QuestService(
        deps=ComposerDeps(
            due_reviews=...,
            node_meta=...,
            generate_drill=generator_registry.get_drill_generator(...).make,
            predict_pass=tracing.predict_performance_irt,
            sims_for_node=...,
            debate_for_student=...,
        )
    )
    quest = svc.compose_daily(student_id="stu_1", mastery_map={...}, today=...)
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date
from typing import Callable, Dict, List, Optional, Tuple

from backend.its.contracts import (
    ActionType,
    DailyQuest,
    QuestItem,
    daily_seed,
    seeded_rng,
)

# ---------------------------------------------------------------------------
# Tunables (single place to tune the feel of the app)
# ---------------------------------------------------------------------------

MAX_REVIEWS = 3
MAX_DRILLS = 2
FLOW_LOW = 0.70          # IRT pass-probability window for drills
FLOW_HIGH = 0.85
FLOW_FALLBACK_TARGET = 0.75

XP = {ActionType.REVIEW: 5, ActionType.DRILL: 10, ActionType.SIM: 15,
      ActionType.DEBATE: 10, ActionType.BOSS: 50, ActionType.TUTOR: 8}

BOSS_WEEKDAY = 5         # ISO weekday 5 = Saturday


# ---------------------------------------------------------------------------
# Injected providers
# ---------------------------------------------------------------------------

@dataclass
class ComposerDeps:
    """Everything the composer needs from the outside world.

    Keeping these as injected callables makes composition pure: the same
    (student, date) always yields the same quest for the same inputs, and
    tests need no database.
    """

    due_reviews: Callable[[str], List[Dict[str, Any]]]
    """student_id -> [{"node_id": ..., "ref_id": ...}, ...]"""

    node_meta: Callable[[str], Dict[str, Any]]
    """node_id -> {"subject": "maths", "class_level": 12, "title": ...}"""

    generate_drill: Optional[Callable[[str, int, int], Optional[Dict[str, Any]]]]
    """(subject, class_level, seed) -> DrillCandidate | None
       (bind generator_registry.get_drill_generator(subject, level).make)"""

    predict_pass: Optional[Callable[[Dict[str, Any]], float]]
    """question dict -> P(correct) per the student's IRT theta"""

    sims_for_node: Optional[Callable[[str], List[Dict[str, Any]]]] = None
    """node_id -> [{"sim_id": ..., "title": ...}, ...]"""

    debate_for_student: Optional[Callable[[str], Optional[Dict[str, Any]]]] = None
    """student_id -> {"debate_id": ..., "topic": ...} | None"""


# ---------------------------------------------------------------------------
# Service
# ---------------------------------------------------------------------------

class QuestService:
    """Composes deterministic daily quests and weekly boss battles."""

    def __init__(self, deps: ComposerDeps) -> None:
        self.deps = deps

    # ------------------------------------------------------------------ #
    # Public API
    # ------------------------------------------------------------------ #

    def compose_daily(
        self,
        student_id: str,
        mastery_map: Dict[str, float],
        today: Optional[date] = None,
        target_nodes: Optional[List[str]] = None,
    ) -> DailyQuest:
        """Compose today's quest.

        ``mastery_map``: node_id -> p_known (from the Student Learning Model).
        ``target_nodes``: optional candidate node list; when omitted, derived
        from due reviews plus the zone-of-proximal-development filter over
        ``mastery_map``.
        """
        today = today or date.today()
        rng = seeded_rng(student_id, today.isoformat())
        seed = daily_seed(student_id, today)
        items: List[QuestItem] = []

        # 1) RETENTION — due SM-2 reviews first (they anchor the session)
        for rev in self._take(self.deps.due_reviews(student_id), MAX_REVIEWS):
            node_id = rev.get("node_id")
            if not node_id:
                continue
            items.append(QuestItem(
                kind=ActionType.REVIEW, node_id=node_id,
                ref_id=rev.get("ref_id"), est_minutes=3,
                title=f"Review: {rev.get('title') or node_id}",
            ))

        # 2) STRETCH — seeded drills in the flow zone
        items += self._drills(student_id, mastery_map, target_nodes, rng, seed)

        # 3) DELIGHT — one simulation, seeded choice
        sim = self._pick_sim(mastery_map, rng)
        if sim:
            items.append(sim)

        # 4) NOVELTY — a debate moment, if one is available
        if self.deps.debate_for_student:
            debate = self.deps.debate_for_student(student_id)
            if debate:
                items.append(QuestItem(
                    kind=ActionType.DEBATE,
                    node_id=debate.get("node_id", ""),
                    ref_id=debate.get("debate_id"),
                    est_minutes=5,
                    title=f"Watch the argument: {debate.get('topic', '')}".strip(),
                    payload=debate,
                ))

        # 5) STAKES — weekly boss battle
        boss = None
        if today.isoweekday() == BOSS_WEEKDAY:
            boss = self._compose_boss(student_id, mastery_map, today, rng)

        xp = sum(XP.get(i.kind, 5) for i in items) + (XP[ActionType.BOSS] if boss else 0)
        return DailyQuest(
            student_id=student_id,
            quest_date=today.isoformat(),
            items=items,
            boss=boss,
            xp_total=xp,
            seed=seed,
        )

    # ------------------------------------------------------------------ #
    # Internals
    # ------------------------------------------------------------------ #

    def _drills(
        self,
        student_id: str,
        mastery_map: Dict[str, float],
        target_nodes: Optional[List[str]],
        rng,
        base_seed: int,
    ) -> List[QuestItem]:
        """1-2 seeded drills, IRT-filtered into the flow window."""
        if not self.deps.generate_drill:
            return []
        nodes = self._zpd_nodes(mastery_map, target_nodes)
        out: List[QuestItem] = []
        for offset, node_id in enumerate(nodes):
            if len(out) >= MAX_DRILLS:
                break
            meta = self._safe_meta(node_id)
            subject, level = meta.get("subject", "maths"), int(meta.get("class_level", 10))
            item_seed = (base_seed + offset * 7919) & 0x7FFFFFFF
            first = self.deps.generate_drill(subject, level, item_seed)
            if not first:
                continue
            p_first = self.deps.predict_pass(first) if self.deps.predict_pass else None
            candidate, p_pass = first, p_first
            # one best-of-two retry outside the flow window; keep the better
            if p_first is not None and not (FLOW_LOW <= p_first <= FLOW_HIGH):
                second = self.deps.generate_drill(subject, level, item_seed ^ 0x5EED)
                if second:
                    p_second = self.deps.predict_pass(second) if self.deps.predict_pass else None
                    closer = (p_second is None
                              or abs((p_second or FLOW_FALLBACK_TARGET) - FLOW_FALLBACK_TARGET)
                              <= abs((p_first or FLOW_FALLBACK_TARGET) - FLOW_FALLBACK_TARGET))
                    if closer:
                        candidate, p_pass = second, p_second
            out.append(QuestItem(
                kind=ActionType.DRILL, node_id=node_id,
                ref_id=candidate.get("source"), seed=item_seed,
                est_minutes=6,
                irt_pass_probability=p_pass,
                title=f"Drill: {meta.get('title') or node_id}",
                payload={"question": candidate},
            ))
        return out

    def _zpd_nodes(
        self,
        mastery_map: Dict[str, float],
        target_nodes: Optional[List[str]],
    ) -> List[str]:
        """Nodes in the zone of proximal development (0.4 <= p <= 0.7),
        falling back to nearest-0.5 ordering when the zone is empty."""
        candidates = list(target_nodes) if target_nodes else list(mastery_map)
        zone = [n for n in candidates
                if 0.4 <= mastery_map.get(n, 0.5) <= 0.7]
        if zone:
            zone.sort(key=lambda n: abs(mastery_map.get(n, 0.5) - 0.55))
            return zone
        return sorted(candidates, key=lambda n: abs(mastery_map.get(n, 0.5) - 0.5))

    def _pick_sim(
        self,
        mastery_map: Dict[str, float],
        rng,
    ) -> Optional[QuestItem]:
        if not self.deps.sims_for_node:
            return None
        # prefer the weakest strong-candidate node that has a sim
        for node_id in self._zpd_nodes(mastery_map, None):
            sims = self.deps.sims_for_node(node_id)
            if sims:
                chosen = sims[rng.randrange(len(sims))]
                return QuestItem(
                    kind=ActionType.SIM, node_id=node_id,
                    ref_id=chosen.get("sim_id"),
                    est_minutes=8,
                    title=f"Play: {chosen.get('title') or node_id}",
                    payload=chosen,
                )
        return None

    def _compose_boss(
        self,
        student_id: str,
        mastery_map: Dict[str, float],
        today: date,
        rng,
    ) -> QuestItem:
        """Weekly boss: 5 mixed-topic seeded questions in one sitting."""
        nodes = self._zpd_nodes(mastery_map, None)[:5]
        parts: List[Dict[str, Any]] = []
        base = daily_seed(student_id, today) ^ 0xB055
        for idx, node_id in enumerate(nodes):
            meta = self._safe_meta(node_id)
            if not self.deps.generate_drill:
                break
            candidate = self.deps.generate_drill(
                meta.get("subject", "maths"),
                int(meta.get("class_level", 10)),
                (base + idx * 104729) & 0x7FFFFFFF,
            )
            if candidate:
                parts.append(candidate)
        return QuestItem(
            kind=ActionType.BOSS, node_id="weekly_boss",
            seed=base, est_minutes=15,
            title=f"Weekly Boss — {today.strftime('week %W')}",
            payload={"parts": parts, "part_count": len(parts)},
        )

    def _safe_meta(self, node_id: str) -> Dict[str, Any]:
        try:
            return self.deps.node_meta(node_id) or {}
        except Exception:  # noqa: BLE001 — provider failures must not kill composition
            return {}

    @staticmethod
    def _take(seq: List[Dict[str, Any]], n: int) -> List[Dict[str, Any]]:
        return seq[:n] if isinstance(seq, list) else []
