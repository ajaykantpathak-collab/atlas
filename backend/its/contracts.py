"""its.contracts — Canonical typed contracts for the ITS pipeline.

Single source of truth for the data shapes that cross layer boundaries:

    routing -> diagnosis -> tutoring -> agents -> brain

Design rules
------------
1. Dependency-free: stdlib only, so any layer (and the frontend contract
   generator) can import this module safely.
2. Every contract round-trips: ``to_dict()`` / ``from_dict()`` are exact
   inverses, so turns can be logged, replayed and shipped to the frontend
   without shape drift.
3. Determinism helpers live here: ``seeded_rng`` makes "same student +
   same week = same quest" a one-liner everywhere.
4. Validation at construction: bad data raises ``ValueError`` immediately
   instead of poisoning a session downstream.

Unification notes (why this module exists)
------------------------------------------
Before this module there were three competing ``AgentAction`` shapes
(specialized_agents, deterministic_orchestrator, socratic_pipeline state)
and no shared telemetry or quest contract. ``AgentProposal`` replaces all
agent-side action shapes; ``AttemptEvent`` replaces ad-hoc telemetry dicts;
``DailyQuest``/``QuestItem`` formalize the engagement layer.

Future migration (Phase 1 completion): ``specialized_agents.AgentAction``
and ``deterministic_orchestrator.AgentAction`` become thin aliases of
``AgentProposal``. Until then, ``.to_legacy_*()`` helpers provide exact
conversions.
"""

from __future__ import annotations

import hashlib
import json
import random
from dataclasses import asdict, dataclass, field
from datetime import date, datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional


# ---------------------------------------------------------------------------
# Enums — the shared vocabulary
# ---------------------------------------------------------------------------

class ActionType(str, Enum):
    """Every action any layer may propose. Superset of all legacy enums."""

    # Layer 4 agents (specialized_agents.py)
    ASSESS = "assess"
    SCAFFOLD = "scaffold"
    FEEDBACK = "feedback"
    MOTIVATE = "motivate"
    TUTOR = "tutor"
    ETHICS_CHECK = "ethics_check"

    # Layer 3 state machine (socratic_state_machine.py)
    TEACH = "teach"              # INTRODUCE / CHUNKED_TEACH
    PROBE = "probe"              # diagnostic checkpoint question
    REMEDIATE = "remediate"      # misconception-driven correction
    SIMPLIFY = "simplify"        # ELI5 fallback
    MASTERY = "mastery"          # mastery confirmed for the node
    NEXT_NODE = "next_node"      # KST recommendation
    OFF_SCRIPT = "off_script"    # outside enrichment -> renderer fallback

    # Engagement layer (Session Composer / QuestService)
    REVIEW = "review"            # SM-2 due item
    DRILL = "drill"              # generated practice question
    SIM = "sim"                  # interactive simulation
    DEBATE = "debate"            # multi-agent misconception debate
    FLASHCARD = "flashcard"
    BOSS = "boss"                # weekly boss battle


class MasteryBand(str, Enum):
    """PCR gating bands (Progressive Context Revelation)."""

    LOW = "low"            # < 0.4  -> context only, hints, no answers
    MEDIUM = "medium"      # 0.4-0.7 -> prerequisite-first, partial
    HIGH = "high"          # > 0.7  -> full reveal


class HintLevel(int, Enum):
    """Scaffolding intensity (1 = nudge ... 4 = near-complete)."""

    L1 = 1
    L2 = 2
    L3 = 3
    L4 = 4


class Modality(str, Enum):
    """Student-facing activity types the Session Composer may mix."""

    READ = "read"
    SOCRATIC = "socratic"
    PRACTICE = "practice"
    SIMULATION = "simulation"
    DEBATE_WATCH = "debate_watch"
    REVIEW = "review"
    BOSS_BATTLE = "boss_battle"


def mastery_band(p_known: float) -> MasteryBand:
    """Classify a mastery probability into its PCR band."""
    if p_known < 0.4:
        return MasteryBand.LOW
    if p_known < 0.7:
        return MasteryBand.MEDIUM
    return MasteryBand.HIGH


# ---------------------------------------------------------------------------
# Determinism helpers
# ---------------------------------------------------------------------------

def seeded_rng(*parts: Any) -> random.Random:
    """A deterministic RNG from arbitrary parts.

    ``seeded_rng("stu_1", "week_42")`` always yields the same stream, so
    quests, boss battles and question variants are reproducible per
    (student, period) without storing anything.
    """
    payload = "|".join(str(p) for p in parts).encode("utf-8")
    digest = hashlib.sha256(payload).hexdigest()
    return random.Random(int(digest[:16], 16))


def daily_seed(student_id: str, day: Optional[date] = None) -> int:
    """Integer seed for a student's daily challenges (UTC day)."""
    day = day or datetime.now(timezone.utc).date()
    return int(hashlib.sha256(f"{student_id}|{day.isoformat()}".encode()).hexdigest()[:12], 16)


# ---------------------------------------------------------------------------
# Agent layer — canonical proposal / decision
# ---------------------------------------------------------------------------

@dataclass
class AgentProposal:
    """What one agent proposes to do next (decision, pre-wording).

    Replaces ``specialized_agents.AgentAction`` and aligns with
    ``deterministic_orchestrator.AgentAction`` (the orchestrator decides
    *which* proposal wins; the renderer decides *how to say it*).
    """

    agent_name: str
    action_type: ActionType
    payload: Dict[str, Any] = field(default_factory=dict)
    priority: int = 100                 # lower runs first / wins ties
    rationale: str = ""
    constraints_checked: List[str] = field(default_factory=list)
    effectiveness: Optional[float] = None  # rolling score 0.0-1.0, if known

    def __post_init__(self) -> None:
        if not self.agent_name:
            raise ValueError("agent_name is required")
        if not isinstance(self.action_type, ActionType):
            try:
                self.action_type = ActionType(self.action_type)
            except ValueError:
                raise ValueError(f"unknown action_type: {self.action_type!r}")
        if not 0.0 <= (self.effectiveness if self.effectiveness is not None else 0.5) <= 1.0:
            raise ValueError("effectiveness must be within [0, 1]")

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["action_type"] = self.action_type.value
        return d

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> "AgentProposal":
        return cls(
            agent_name=d["agent_name"],
            action_type=ActionType(d["action_type"]),
            payload=d.get("payload", {}),
            priority=int(d.get("priority", 100)),
            rationale=d.get("rationale", ""),
            constraints_checked=list(d.get("constraints_checked", [])),
            effectiveness=d.get("effectiveness"),
        )


@dataclass
class OrchestratorDecision:
    """The orchestrator's final call for this turn."""

    chosen: AgentProposal
    rule_name: str
    reasoning: str = ""
    rejected: List[Dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "chosen": self.chosen.to_dict(),
            "rule_name": self.rule_name,
            "reasoning": self.reasoning,
            "rejected": self.rejected,
        }


# ---------------------------------------------------------------------------
# Diagnosis layer — mastery + telemetry contracts
# ---------------------------------------------------------------------------

@dataclass
class MasteryUpdate:
    """Result of the unified tracing engine (BKT + IRT + AFM)."""

    student_id: str
    node_id: str
    p_known: float
    theta: float = 0.0                   # IRT ability estimate
    p_transit: float = 0.1               # AFM-adjusted BKT learning rate
    irt_pass_probability: float = 0.5    # P(correct) on the next question
    method: str = "bkt_irt_afm"

    def __post_init__(self) -> None:
        for name, value in (("p_known", self.p_known), ("irt_pass_probability", self.irt_pass_probability)):
            if not 0.0 <= value <= 1.0:
                raise ValueError(f"{name} must be within [0, 1], got {value}")
        self.band = mastery_band(self.p_known)

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["band"] = self.band.value
        return d


@dataclass
class AttemptEvent:
    """One student attempt, at step resolution.

    This is the telemetry contract the whole loop mines: the Meta-Brain's
    strategy effectiveness, misconception discovery and content-gap detection
    are only as good as the streams conforming to this shape.
    """

    student_id: str
    node_id: str
    question_id: Optional[str]
    is_correct: bool
    modality: Modality = Modality.PRACTICE
    step_index: Optional[int] = None     # which solver step failed, if applicable
    hint_level: Optional[HintLevel] = None
    response_ms: Optional[int] = None
    misconception_id: Optional[str] = None
    session_id: Optional[str] = None
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    def __post_init__(self) -> None:
        if not isinstance(self.modality, Modality):
            self.modality = Modality(self.modality)
        if self.hint_level is not None and not isinstance(self.hint_level, HintLevel):
            self.hint_level = HintLevel(self.hint_level)
        if self.response_ms is not None and self.response_ms < 0:
            raise ValueError("response_ms cannot be negative")

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["modality"] = self.modality.value
        d["hint_level"] = self.hint_level.value if self.hint_level is not None else None
        return d

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> "AttemptEvent":
        return cls(
            student_id=d["student_id"],
            node_id=d["node_id"],
            question_id=d.get("question_id"),
            is_correct=bool(d["is_correct"]),
            modality=Modality(d.get("modality", Modality.PRACTICE.value)),
            step_index=d.get("step_index"),
            hint_level=HintLevel(d["hint_level"]) if d.get("hint_level") is not None else None,
            response_ms=d.get("response_ms"),
            misconception_id=d.get("misconception_id"),
            session_id=d.get("session_id"),
            created_at=d.get("created_at") or datetime.now(timezone.utc).isoformat(),
        )


# ---------------------------------------------------------------------------
# Engagement layer — quests and the session composer
# ---------------------------------------------------------------------------

@dataclass
class QuestItem:
    """One activity inside a daily quest or boss battle."""

    kind: ActionType                    # REVIEW | DRILL | SIM | DEBATE | BOSS ...
    node_id: str
    ref_id: Optional[str] = None        # sim id / question id / debate id
    seed: Optional[int] = None          # deterministic variant selector
    est_minutes: int = 5
    irt_pass_probability: Optional[float] = None  # flow-target ~0.7-0.85
    title: str = ""
    payload: Dict[str, Any] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if not isinstance(self.kind, ActionType):
            self.kind = ActionType(self.kind)
        if self.est_minutes <= 0:
            raise ValueError("est_minutes must be positive")
        if self.irt_pass_probability is not None and not 0.0 <= self.irt_pass_probability <= 1.0:
            raise ValueError("irt_pass_probability must be within [0, 1]")

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["kind"] = self.kind.value
        return d


@dataclass
class DailyQuest:
    """A student's composed day: mixed modalities, deterministic by seed."""

    student_id: str
    quest_date: str                     # ISO date
    items: List[QuestItem] = field(default_factory=list)
    boss: Optional[QuestItem] = None    # weekly boss battle, if due
    xp_total: int = 0
    seed: int = 0
    theme: str = ""                     # e.g. "circuit-lab week"

    def __post_init__(self) -> None:
        if not self.items:
            raise ValueError("a quest needs at least one item")
        if self.xp_total < 0:
            raise ValueError("xp_total cannot be negative")
        for item in self.items:
            if not isinstance(item, QuestItem):
                raise TypeError("items must be QuestItem instances")

    def total_minutes(self) -> int:
        return sum(i.est_minutes for i in self.items) + (self.boss.est_minutes if self.boss else 0)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "student_id": self.student_id,
            "quest_date": self.quest_date,
            "items": [i.to_dict() for i in self.items],
            "boss": self.boss.to_dict() if self.boss else None,
            "xp_total": self.xp_total,
            "seed": self.seed,
            "theme": self.theme,
            "total_minutes": self.total_minutes(),
        }

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False)
