"""
specialized_agents.py
Six specialized pedagogical agents for an ES-LLMs tutoring architecture.

Design principle (AIED 2026): separate decision-making from wording.
Each agent proposes a structured action (AgentAction). The orchestrator
(separate file) selects the winning action. The LLM renderer turns the
chosen action into natural language.

All agents receive:
  - student_state : dict  (4-D state from state_4d_builder.py)
  - teaching_context : dict  (Graph-RAG context from graph_rag_retriever.py)
  - interaction_history : list[dict]
"""

from __future__ import annotations

import logging
import math
import random
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

class ActionType(str, Enum):
    ASSESS = "assess"
    SCAFFOLD = "scaffold"
    FEEDBACK = "feedback"
    MOTIVATE = "motivate"
    TUTOR = "tutor"
    ETHICS_CHECK = "ethics_check"


@dataclass
class AgentParameter:
    """Tunable parameter stored in the AgentParameter table."""
    name: str
    value: Any
    description: str = ""
    min_value: Optional[float] = None
    max_value: Optional[float] = None


@dataclass
class AgentAction:
    """A structured proposal from a single agent."""
    agent_name: str
    action_type: str
    content_payload: dict
    priority: int
    rationale: str
    constraints_checked: list[str]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _safe_get(d: dict, *keys, default=None):
    """Nested dict access with a safe default."""
    cur = d
    for k in keys:
        if isinstance(cur, dict) and k in cur:
            cur = cur[k]
        else:
            return default
    return cur


def _irt_probability(ability: float, difficulty: float, discrimination: float = 1.0,
                     guessing: float = 0.25) -> float:
    """2-PL IRT logistic function."""
    try:
        z = discrimination * (ability - difficulty)
        return guessing + (1.0 - guessing) / (1.0 + math.exp(-z))
    except Exception:
        return 0.5


# ---------------------------------------------------------------------------
# BaseAgent
# ---------------------------------------------------------------------------

class BaseAgent(ABC):
    """Abstract base for all pedagogical agents."""

    agent_name: str = "base"
    priority: int = 999
    action_type: str = ""

    # Tunable parameters (populated by subclasses)
    parameters: Dict[str, AgentParameter] = {}

    # Known misconception catalogue (populated by subclasses)
    MISCONCEPTIONS: Dict[str, dict] = {}

    def __init__(self):
        self._param_cache: Dict[str, Any] = {}
        for name, param in self.parameters.items():
            self._param_cache[name] = param.value

    # -- parameter access ---------------------------------------------------
    def get_param(self, name: str, default: Any = None) -> Any:
        return self._param_cache.get(name, default)

    def set_param(self, name: str, value: Any) -> None:
        if name in self.parameters:
            self._param_cache[name] = value
            self.parameters[name].value = value

    # -- abstract interface --------------------------------------------------
    @abstractmethod
    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list[dict],
    ) -> AgentAction:
        """Return a structured action proposal."""

    # -- helpers subclasses can use -----------------------------------------
    def _build_action(
        self,
        action_type: str,
        content_payload: dict,
        priority: int,
        rationale: str,
        constraints_checked: list[str],
    ) -> AgentAction:
        return AgentAction(
            agent_name=self.agent_name,
            action_type=action_type,
            content_payload=content_payload,
            priority=priority,
            rationale=rationale,
            constraints_checked=constraints_checked,
        )

    def _get_mastery(self, student_state: dict) -> float:
        """Extract overall mastery score (0-1) from 4-D state."""
        cog = _safe_get(student_state, "cognitive", default={})
        if isinstance(cog, dict):
            return float(_safe_get(cog, "mastery", default=0.0))
        return 0.0

    def _get_topic_mastery(self, student_state: dict, topic: str) -> float:
        """Topic-specific mastery from cognitive dimension."""
        cog = _safe_get(student_state, "cognitive", default={})
        per_topic = _safe_get(cog, "per_topic_mastery", default={})
        if isinstance(per_topic, dict):
            return float(per_topic.get(topic, 0.0))
        return 0.0

    def _get_frustration(self, student_state: dict) -> float:
        aff = _safe_get(student_state, "affective", default={})
        return float(_safe_get(aff, "frustration", default=0.0))

    def _get_boredom(self, student_state: dict) -> float:
        aff = _safe_get(student_state, "affective", default={})
        return float(_safe_get(aff, "boredom", default=0.0))

    def _get_confidence(self, student_state: dict) -> float:
        aff = _safe_get(student_state, "affective", default={})
        return float(_safe_get(aff, "confidence", default=0.5))

    def _get_current_topic(self, teaching_context: dict) -> str:
        return _safe_get(teaching_context, "current_topic", default="general")

    def _get_scope_boundary(self, teaching_context: dict) -> List[str]:
        return list(_safe_get(teaching_context, "scope_boundary", default=[]))

    def _get_available_hints(self, interaction_history: list) -> int:
        """Count hints already given in this conversation for the current question."""
        return sum(
            1 for turn in interaction_history
            if _safe_get(turn, "role", default="") == "agent"
            and _safe_get(turn, "action_type", default="") == "scaffold"
        )

    def _student_attempted_current(self, interaction_history: list) -> bool:
        """Check if student has made any attempt on current question."""
        return any(
            _safe_get(turn, "role", default="") == "student"
            and _safe_get(turn, "has_attempt", default=False)
            for turn in interaction_history
        )

    def _infer_learning_style(self, student_state: dict) -> str:
        meta = _safe_get(student_state, "metacognitive", default={})
        style = _safe_get(meta, "learning_style_preference", default="reading")
        valid = {"visual", "auditory", "kinesthetic", "reading"}
        return style if style in valid else "reading"


# ---------------------------------------------------------------------------
# 1. EthicsBot — priority 10 (highest, safety first)
# ---------------------------------------------------------------------------

class EthicsBot(BaseAgent):
    agent_name = "ethics_bot"
    priority = 10
    action_type = ActionType.ETHICS_CHECK.value

    parameters: Dict[str, AgentParameter] = {
        "hint_cap_per_question": AgentParameter(
            name="hint_cap_per_question",
            value=3,
            description="Maximum hints allowed per question",
            min_value=1,
            max_value=10,
        ),
        "attempt_required_before_hint": AgentParameter(
            name="attempt_required_before_hint",
            value=True,
            description="Block hints if student has not attempted",
        ),
        "enable_age_filter": AgentParameter(
            name="enable_age_filter",
            value=True,
            description="Check content age-appropriateness",
        ),
        "student_age": AgentParameter(
            name="student_age",
            value=14,
            description="Student age for content filtering",
        ),
    }

    MISCONCEPTIONS: Dict[str, dict] = {}

    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list,
    ) -> AgentAction:
        constraints: list[str] = []
        try:
            last_turn = interaction_history[-1] if interaction_history else {}
            student_msg = _safe_get(last_turn, "content", default="").lower().strip()

            # --- Check 1: scope boundary ---
            scope_ok, scope_reason = self._check_scope(student_msg, teaching_context)
            if not scope_ok:
                constraints.append("scope_boundary_violation")
                return self._build_action(
                    action_type="block_with_explanation",
                    content_payload={
                        "message": (
                            f"That topic is outside our current learning scope. "
                            f"{scope_reason} Let's stay focused on "
                            f"{self._get_current_topic(teaching_context)} — shall we?"
                        ),
                        "violation_type": "scope_boundary",
                    },
                    priority=self.priority,
                    rationale=f"Student query outside scope: {scope_reason}",
                    constraints_checked=constraints,
                )
            constraints.append("scope_boundary_ok")

            # --- Check 2: direct answer request (gaming) ---
            gaming_detected = self._detect_gaming(student_msg)
            if gaming_detected:
                constraints.append("gaming_detected")
                return self._build_action(
                    action_type="block_with_explanation",
                    content_payload={
                        "message": (
                            "I can't give away the answer directly, but I can "
                            "help guide your thinking. What have you tried so far?"
                        ),
                        "violation_type": "direct_answer_request",
                    },
                    priority=self.priority,
                    rationale="Student appears to be requesting direct answers (gaming).",
                    constraints_checked=constraints,
                )
            constraints.append("no_gaming")

            # --- Check 3: attempt-before-hint rule ---
            hint_cap = self.get_param("hint_cap_per_question", 3)
            hints_used = self._get_available_hints(interaction_history)
            is_hint_request = any(kw in student_msg for kw in
                                  ["hint", "help", "don't know", "clue", "give up", "stuck"])
            if is_hint_request:
                if self.get_param("attempt_required_before_hint", True):
                    if not self._student_attempted_current(interaction_history):
                        constraints.append("attempt_required_not_met")
                        return self._build_action(
                            action_type="block_with_explanation",
                            content_payload={
                                "message": (
                                    "Before I give a hint, try to work through it "
                                    "yourself first — even a partial attempt helps me "
                                    "guide you better. What do you think so far?"
                                ),
                                "violation_type": "attempt_required",
                            },
                            priority=self.priority,
                            rationale="Student requested hint without attempting first.",
                            constraints_checked=constraints,
                        )
                    constraints.append("attempt_required_met")

                if hints_used >= hint_cap:
                    constraints.append("hint_cap_exceeded")
                    return self._build_action(
                        action_type="redirect_to_safe_content",
                        content_payload={
                            "message": (
                                f"You've used all {hint_cap} hints for this question. "
                                "Let's review the related concepts together instead — "
                                "that will be more valuable than another hint."
                            ),
                            "redirect_target": "concept_review",
                        },
                        priority=self.priority,
                        rationale=f"Hint cap ({hint_cap}) reached for current question.",
                        constraints_checked=constraints,
                    )
                constraints.append(f"hint_cap_ok_{hints_used}_of_{hint_cap}")

            # --- Check 4: age-appropriateness ---
            if self.get_param("enable_age_filter", True):
                age_ok, age_note = self._check_age_appropriate(student_msg)
                if not age_ok:
                    constraints.append("age_inappropriate")
                    return self._build_action(
                        action_type="redirect_to_safe_content",
                        content_payload={
                            "message": (
                                "That topic might not be the best fit for right now. "
                                "Let's explore something else that's just as interesting!"
                            ),
                            "redirect_target": "safe_alternative",
                        },
                        priority=self.priority,
                        rationale=f"Content flagged as age-inappropriate: {age_note}",
                        constraints_checked=constraints,
                    )
                constraints.append("age_appropriate")

            # --- All clear ---
            constraints.append("all_ethics_checks_passed")
            return self._build_action(
                action_type="allow",
                content_payload={"allowed": True},
                priority=self.priority,
                rationale="All ethical checks passed; content is safe to proceed.",
                constraints_checked=constraints,
            )

        except Exception as exc:
            logger.exception("EthicsBot error: %s", exc)
            return self._build_action(
                action_type="allow",
                content_payload={"allowed": True, "fallback": True},
                priority=self.priority,
                rationale="Ethics check encountered an error; defaulting to allow.",
                constraints_checked=["error_fallback"],
            )

    # -- EthicsBot private helpers -------------------------------------------
    def _check_scope(self, msg: str, context: dict) -> tuple:
        scope = self._get_scope_boundary(context)
        if not scope:
            return True, ""
        for keyword in scope:
            if keyword.lower() in msg:
                return False, f"Topic '{keyword}' is out of scope."
        return True, ""

    def _detect_gaming(self, msg: str) -> bool:
        gaming_phrases = [
            "just give me the answer",
            "give me the solution",
            "tell me the answer",
            "i don't want to learn",
            "skip to answer",
            "what's the answer",
            "give me answers",
            "solve it for me",
        ]
        return any(p in msg for p in gaming_phrases)

    def _check_age_appropriate(self, msg: str) -> tuple:
        age = self.get_param("student_age", 14)
        sensitive = ["violence", "drugs", "explicit", "adult", "suicide", "self-harm"]
        for term in sensitive:
            if term in msg:
                return False, f"Potentially sensitive term: {term}"
        return True, ""


# ---------------------------------------------------------------------------
# 2. AssessmentBot — priority 20
# ---------------------------------------------------------------------------

class AssessmentBot(BaseAgent):
    agent_name = "assessment_bot"
    priority = 20
    action_type = ActionType.ASSESS.value

    parameters: Dict[str, AgentParameter] = {
        "irt_discrimination": AgentParameter(
            name="irt_discrimination",
            value=1.0,
            description="IRT discrimination parameter",
            min_value=0.1,
            max_value=3.0,
        ),
        "irt_guessing": AgentParameter(
            name="irt_guessing",
            value=0.25,
            description="IRT guessing (chance) parameter",
            min_value=0.0,
            max_value=0.5,
        ),
        "low_mastery_threshold": AgentParameter(
            name="low_mastery_threshold",
            value=0.35,
            description="Mastery below this = low",
            min_value=0.0,
            max_value=1.0,
        ),
        "high_mastery_threshold": AgentParameter(
            name="high_mastery_threshold",
            value=0.75,
            description="Mastery above this = high",
            min_value=0.0,
            max_value=1.0,
        ),
        "assessment_cooldown": AgentParameter(
            name="assessment_cooldown",
            value=3,
            description="Minimum turns between assessments",
            min_value=1,
            max_value=20,
        ),
    }

    MISCONCEPTIONS: Dict[str, dict] = {}

    QUESTION_TYPE_BY_MASTERY = {
        "low": "recall",
        "medium": "application",
        "high": "synthesis",
    }

    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list,
    ) -> AgentAction:
        constraints: list[str] = []
        try:
            topic = self._get_current_topic(teaching_context)
            mastery = self._get_topic_mastery(student_state, topic)
            overall_mastery = self._get_mastery(student_state)

            # --- Cooldown check ---
            cooldown = self.get_param("assessment_cooldown", 3)
            recent_assessments = sum(
                1 for turn in interaction_history[-20:]
                if _safe_get(turn, "action_type", default="") == "assess"
            )
            if recent_assessments >= 2:
                constraints.append("cooldown_active")
                return self._build_action(
                    action_type="none",
                    content_payload={"skip": True, "reason": "assessment_cooldown"},
                    priority=self.priority,
                    rationale=f"Assessment cooldown active ({recent_assessments} recent assessments).",
                    constraints_checked=constraints,
                )
            constraints.append("cooldown_ok")

            # --- Determine mastery band ---
            low_thresh = self.get_param("low_mastery_threshold", 0.35)
            high_thresh = self.get_param("high_mastery_threshold", 0.75)
            if mastery < low_thresh:
                band = "low"
            elif mastery < high_thresh:
                band = "medium"
            else:
                band = "high"

            constraints.append(f"mastery_band_{band}")
            question_type = self.QUESTION_TYPE_BY_MASTERY[band]

            # --- IRT optimal difficulty selection ---
            optimal_difficulty = self._select_irt_difficulty(
                ability=mastery,
                discrimination=self.get_param("irt_discrimination", 1.0),
                guessing=self.get_param("irt_guessing", 0.25),
            )
            constraints.append(f"irt_difficulty_{optimal_difficulty:.2f}")

            # --- Retrieve diagnostic question from enrichment ---
            enrichment = _safe_get(teaching_context, "enrichment", default={})
            question_bank = _safe_get(enrichment, "diagnostic_questions", default=[])
            selected_question = self._pick_question(
                question_bank, question_type, optimal_difficulty, topic
            )

            if selected_question is None:
                # Fallback: generate a generic question description
                selected_question = {
                    "id": f"gen_{topic}_{question_type}",
                    "type": question_type,
                    "difficulty": round(optimal_difficulty, 2),
                    "text": (
                        f"[{question_type.upper()}] Can you explain or apply "
                        f"the key concept of {topic}?"
                    ),
                    "topic": topic,
                    "generated": True,
                }
                constraints.append("question_generated_fallback")
            else:
                constraints.append("question_from_bank")

            return self._build_action(
                action_type="assess",
                content_payload={
                    "question": selected_question,
                    "question_type": question_type,
                    "mastery_band": band,
                    "current_mastery": round(mastery, 3),
                    "irt_difficulty": round(optimal_difficulty, 3),
                },
                priority=self.priority,
                rationale=(
                    f"Mastery on '{topic}' is {mastery:.2f} ({band}). "
                    f"Selected {question_type} question at difficulty {optimal_difficulty:.2f} "
                    f"to probe understanding."
                ),
                constraints_checked=constraints,
            )

        except Exception as exc:
            logger.exception("AssessmentBot error: %s", exc)
            return self._build_action(
                action_type="none",
                content_payload={"skip": True, "error": str(exc)},
                priority=self.priority,
                rationale="AssessmentBot encountered an error.",
                constraints_checked=["error_fallback"],
            )

    def _select_irt_difficulty(
        self, ability: float, discrimination: float = 1.0, guessing: float = 0.25
    ) -> float:
        """Select difficulty that gives ~0.5 probability of correct response."""
        try:
            # P(θ) = g + (1-g)/(1+exp(-D*(θ-b)))
            # Set P=0.5 => b ≈ θ  (for D=1, g=0.25 this is approximately true)
            difficulty = ability
            # Clamp
            return max(0.0, min(1.0, difficulty))
        except Exception:
            return ability

    def _pick_question(
        self,
        bank: list,
        question_type: str,
        difficulty: float,
        topic: str,
    ) -> Optional[dict]:
        """Pick closest-matching question from bank."""
        if not bank:
            return None
        candidates = [
            q for q in bank
            if _safe_get(q, "type", default="") == question_type
            and _safe_get(q, "topic", default="") == topic
        ]
        if not candidates:
            candidates = [q for q in bank if _safe_get(q, "type", default="") == question_type]
        if not candidates:
            candidates = bank

        # Pick question with closest difficulty
        def _diff_distance(q):
            return abs(float(_safe_get(q, "difficulty", default=0.5)) - difficulty)

        candidates.sort(key=_diff_distance)
        return candidates[0]


# ---------------------------------------------------------------------------
# 3. ScaffoldBot — priority 30
# ---------------------------------------------------------------------------

class ScaffoldBot(BaseAgent):
    agent_name = "scaffold_bot"
    priority = 30
    action_type = ActionType.SCAFFOLD.value

    parameters: Dict[str, AgentParameter] = {
        "hint_level_thresholds": AgentParameter(
            name="hint_level_thresholds",
            value={"low": 0.35, "medium": 0.65, "high": 0.85},
            description="Mastery thresholds mapping to hint levels",
        ),
        "frustration_boost_threshold": AgentParameter(
            name="frustration_boost_threshold",
            value=0.7,
            description="Frustration above this boosts hint level",
            min_value=0.0,
            max_value=1.0,
        ),
        "max_attempts_for_full_hint": AgentParameter(
            name="max_attempts_for_full_hint",
            value=4,
            description="Attempts beyond this = full hint",
            min_value=1,
            max_value=10,
        ),
        "hint_dependency_penalty": AgentParameter(
            name="hint_dependency_penalty",
            value=0.15,
            description="Mastery reduction per overuse of hints",
            min_value=0.0,
            max_value=1.0,
        ),
    }

    MISCONCEPTIONS: Dict[str, dict] = {}

    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list,
    ) -> AgentAction:
        constraints: list[str] = []
        try:
            topic = self._get_current_topic(teaching_context)
            mastery = self._get_topic_mastery(student_state, topic)
            frustration = self._get_frustration(student_state)
            attempt_number = self._count_attempts(interaction_history)

            constraints.append(f"mastery_{mastery:.2f}")
            constraints.append(f"frustration_{frustration:.2f}")
            constraints.append(f"attempts_{attempt_number}")

            # --- Determine base hint level from thresholds ---
            thresholds = self.get_param("hint_level_thresholds", {})
            if not isinstance(thresholds, dict):
                thresholds = {"low": 0.35, "medium": 0.65, "high": 0.85}

            if mastery < thresholds.get("low", 0.35):
                base_level = "full"
            elif mastery < thresholds.get("medium", 0.65):
                base_level = "medium"
            else:
                base_level = "minimal"

            # --- Frustration boost ---
            frustration_thresh = self.get_param("frustration_boost_threshold", 0.7)
            if frustration > frustration_thresh:
                level_order = ["minimal", "medium", "full"]
                idx = level_order.index(base_level)
                base_level = level_order[min(idx + 1, len(level_order) - 1)]
                constraints.append("frustration_boost_applied")

            # --- Attempt-based escalation ---
            max_attempts = self.get_param("max_attempts_for_full_hint", 4)
            if attempt_number >= max_attempts:
                base_level = "full"
                constraints.append("attempt_escalation_full")

            constraints.append(f"hint_level_{base_level}")

            # --- Generate hint content (never the direct answer) ---
            hint_content = self._generate_hint(base_level, topic, teaching_context)
            constraints.append("no_full_answer")

            return self._build_action(
                action_type="scaffold",
                content_payload={
                    "hint_level": base_level,
                    "hint": hint_content,
                    "mastery": round(mastery, 3),
                    "frustration": round(frustration, 3),
                    "attempt_number": attempt_number,
                    "topic": topic,
                },
                priority=self.priority,
                rationale=(
                    f"Mastery={mastery:.2f}, frustration={frustration:.2f}, "
                    f"attempts={attempt_number}. Selected '{base_level}' hint level."
                ),
                constraints_checked=constraints,
            )

        except Exception as exc:
            logger.exception("ScaffoldBot error: %s", exc)
            return self._build_action(
                action_type="none",
                content_payload={"skip": True, "error": str(exc)},
                priority=self.priority,
                rationale="ScaffoldBot encountered an error.",
                constraints_checked=["error_fallback"],
            )

    def _count_attempts(self, history: list) -> int:
        return sum(
            1 for turn in history
            if _safe_get(turn, "role", default="") == "student"
            and _safe_get(turn, "has_attempt", default=False)
        )

    def _generate_hint(self, level: str, topic: str, context: dict) -> dict:
        enrichment = _safe_get(context, "enrichment", default={})
        hints_bank = _safe_get(enrichment, "hints", default={})
        topic_hints = _safe_get(hints_bank, topic, default=[])

        if topic_hints:
            idx_map = {"minimal": 0, "medium": 1, "full": 2}
            idx = min(idx_map.get(level, 0), len(topic_hints) - 1)
            return {"text": topic_hints[idx], "source": "bank", "level": level}

        # Generic hint templates
        templates = {
            "minimal": {
                "text": f"Think about what you already know about {topic}. What's the first step?",
                "source": "template",
            },
            "medium": {
                "text": (
                    f"Here's a partial approach for {topic}: consider the key "
                    f"variables and the relationship between them. Try setting up "
                    f"the problem with those in mind."
                ),
                "source": "template",
            },
            "full": {
                "text": (
                    f"Let's work through {topic} step by step. First, identify the "
                    f"given information. Then, apply the core formula or principle. "
                    f"Finally, check your result."
                ),
                "source": "template",
            },
        }
        return templates.get(level, templates["minimal"])


# ---------------------------------------------------------------------------
# 4. FeedbackBot — priority 40
# ---------------------------------------------------------------------------

class FeedbackBot(BaseAgent):
    agent_name = "feedback_bot"
    priority = 40
    action_type = ActionType.FEEDBACK.value

    parameters: Dict[str, AgentParameter] = {
        "positive_ratio": AgentParameter(
            name="positive_ratio",
            value=0.5,
            description="Fraction of feedback that is positive/reinforcing",
            min_value=0.0,
            max_value=1.0,
        ),
        "misconception_confidence_threshold": AgentParameter(
            name="misconception_confidence_threshold",
            value=0.7,
            description="Minimum confidence to label as known misconception",
            min_value=0.0,
            max_value=1.0,
        ),
    }

    # Catalogue of known misconceptions keyed by topic
    MISCONCEPTIONS: Dict[str, dict] = {
        "fractions": {
            "adding_denominators": {
                "patterns": ["add denominators", "sum of denominators"],
                "correction": (
                    "When adding fractions, you need a common denominator. "
                    "You add the numerators, not the denominators."
                ),
                "socratic": "Why do you think we add the bottom numbers? What does the denominator represent?",
            }
        },
        "algebra": {
            "distributive_forgetting": {
                "patterns": ["2(x+3) = 2x+3", "forgot to distribute"],
                "correction": (
                    "Remember the distributive property: a(b+c) = ab + ac. "
                    "Both terms inside the parentheses need to be multiplied."
                ),
                "socratic": "What does the 2 multiply in 2(x+3)? Does it reach both terms?",
            }
        },
        "physics_newton": {
            "heavier_falls_faster": {
                "patterns": [
                    "heavier falls faster",
                    "more mass faster",
                    "gravity pulls harder on heavier",
                ],
                "correction": (
                    "All objects fall at the same rate in a vacuum regardless of mass. "
                    "Air resistance causes the difference we observe."
                ),
                "socratic": (
                    "If gravity pulls harder on a heavier object, "
                    "what happens to its resistance to acceleration?"
                ),
            }
        },
    }

    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list,
    ) -> AgentAction:
        constraints: list[str] = []
        try:
            topic = self._get_current_topic(teaching_context)
            last_student = self._last_student_turn(interaction_history)
            student_answer = _safe_get(last_student, "content", default="")

            # --- Check for known misconception ---
            misconception = self._match_misconception(student_answer, topic)
            if misconception:
                constraints.append("known_misconception_matched")
                feedback_type = "misconception_addressal"
                content = {
                    "feedback_type": feedback_type,
                    "positive": "Good thinking — you're applying what you know.",
                    "constructive": misconception["correction"],
                    "socratic_question": misconception.get("socratic", ""),
                    "matched_misconception": True,
                }
                rationale = (
                    f"Matched known misconception for topic '{topic}'. "
                    f"Addressing directly with correction + Socratic question."
                )
            else:
                constraints.append("no_known_misconception")
                # Classify and log novel error
                error_type = self._classify_error(student_answer, topic)
                constraints.append(f"error_classified_{error_type}")

                feedback_type_map = {
                    "correct": "correction",
                    "partial": "correction",
                    "incorrect": "correction",
                    "incomplete": "socratic_question",
                    "new_pattern": "socratic_question",
                }
                feedback_type = feedback_type_map.get(error_type, "socratic_question")

                if error_type in ("correct", "partial"):
                    content = {
                        "feedback_type": feedback_type,
                        "positive": (
                            "That's on the right track!" if error_type == "partial"
                            else "Exactly right — well done!"
                        ),
                        "constructive": (
                            "Let's refine one detail to make it complete."
                            if error_type == "partial"
                            else ""
                        ),
                        "log_for_metabrain": error_type == "new_pattern",
                    }
                else:
                    content = {
                        "feedback_type": feedback_type,
                        "positive": "I can see you're engaging with this — that's great.",
                        "constructive": (
                            "Let's try a different angle. What happens if you reconsider "
                            f"the key principle of {topic}?"
                        ),
                        "socratic_question": (
                            f"What would change if you applied the core concept "
                            f"of {topic} differently?"
                        ),
                        "log_for_metabrain": True,
                    }
                rationale = (
                    f"No known misconception matched. Classified as '{error_type}'. "
                    f"Feedback type: {feedback_type}."
                )

            constraints.append("format_positive_first")

            return self._build_action(
                action_type="feedback",
                content_payload=content,
                priority=self.priority,
                rationale=rationale,
                constraints_checked=constraints,
            )

        except Exception as exc:
            logger.exception("FeedbackBot error: %s", exc)
            return self._build_action(
                action_type="none",
                content_payload={"skip": True, "error": str(exc)},
                priority=self.priority,
                rationale="FeedbackBot encountered an error.",
                constraints_checked=["error_fallback"],
            )

    def _last_student_turn(self, history: list) -> dict:
        for turn in reversed(history):
            if _safe_get(turn, "role", default="") == "student":
                return turn
        return {}

    def _match_misconception(self, answer: str, topic: str) -> Optional[dict]:
        topic_catalogue = self.MISCONCEPTIONS.get(topic, {})
        answer_lower = answer.lower()
        for _misconception_name, data in topic_catalogue.items():
            for pattern in data.get("patterns", []):
                if pattern.lower() in answer_lower:
                    return data
        return None

    def _classify_error(self, answer: str, topic: str) -> str:
        if not answer.strip():
            return "incomplete"
        positive = ["correct", "yes", "right", "true", "exactly", "that's it"]
        if any(p in answer.lower() for p in positive):
            return "correct"
        if len(answer.strip()) < 15:
            return "incomplete"
        return "new_pattern"


# ---------------------------------------------------------------------------
# 5. MotivatorBot — priority 50
# ---------------------------------------------------------------------------

class MotivatorBot(BaseAgent):
    agent_name = "motivator_bot"
    priority = 50
    action_type = ActionType.MOTIVATE.value

    parameters: Dict[str, AgentParameter] = {
        "frustration_threshold": AgentParameter(
            name="frustration_threshold",
            value=0.6,
            description="Frustration above this triggers empathy mode",
            min_value=0.0,
            max_value=1.0,
        ),
        "boredom_threshold": AgentParameter(
            name="boredom_threshold",
            value=0.6,
            description="Boredom above this triggers challenge mode",
            min_value=0.0,
            max_value=1.0,
        ),
        "streak_celebration_threshold": AgentParameter(
            name="streak_celebration_threshold",
            value=3,
            description="Consecutive correct answers to trigger celebration",
            min_value=1,
            max_value=20,
        ),
        "confidence_boost_threshold": AgentParameter(
            name="confidence_boost_threshold",
            value=0.8,
            description="Confidence above this = celebration mode",
            min_value=0.0,
            max_value=1.0,
        ),
    }

    MISCONCEPTIONS: Dict[str, dict] = {}

    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list,
    ) -> AgentAction:
        constraints: list[str] = []
        try:
            topic = self._get_current_topic(teaching_context)
            mastery = self._get_topic_mastery(student_state, topic)
            frustration = self._get_frustration(student_state)
            boredom = self._get_boredom(student_state)
            confidence = self._get_confidence(student_state)
            streak = self._get_streak(interaction_history)
            mastery_trend = self._get_mastery_trend(student_state, topic)

            constraints.append(f"frustration={frustration:.2f}")
            constraints.append(f"boredom={boredom:.2f}")
            constraints.append(f"confidence={confidence:.2f}")
            constraints.append(f"streak={streak}")
            constraints.append(f"mastery_trend={mastery_trend:+.2f}")

            # --- Decision tree ---
            if frustration >= self.get_param("frustration_threshold", 0.6):
                mode = "empathy"
                payload = {
                    "mode": mode,
                    "message": (
                        "I can see this is tricky — that's completely okay. "
                        "Learning happens in the struggle. Let's take it one small "
                        "step at a time together."
                    ),
                    "difficulty_adjustment": "reduce",
                    "affect_target": "frustration",
                }
                rationale = (
                    f"Frustration ({frustration:.2f}) above threshold. "
                    "Providing empathy and reducing difficulty."
                )

            elif boredom >= self.get_param("boredom_threshold", 0.6):
                mode = "challenge"
                payload = {
                    "mode": mode,
                    "message": (
                        f"You seem ready for something more stimulating. "
                        f"Let me throw a slightly harder twist on {topic} at you — "
                        f"I think you'll enjoy the stretch."
                    ),
                    "difficulty_adjustment": "increase",
                    "novelty_suggestion": True,
                    "affect_target": "boredom",
                }
                rationale = (
                    f"Boredom ({boredom:.2f}) above threshold. "
                    "Increasing novelty and difficulty."
                )

            elif (
                streak >= self.get_param("streak_celebration_threshold", 3)
                or (mastery_trend > 0.1 and mastery >= 0.7)
                or confidence >= self.get_param("confidence_boost_threshold", 0.8)
            ):
                mode = "celebration"
                next_concept = self._suggest_next_concept(teaching_context)
                payload = {
                    "mode": mode,
                    "message": (
                        f"Outstanding work on {topic}! You're really building strong "
                        f"understanding. Ready to level up? "
                        + (
                            f"Let's look at {next_concept} next."
                            if next_concept
                            else ""
                        )
                    ),
                    "celebration_data": {
                        "streak": streak,
                        "mastery_gain": round(mastery_trend, 3),
                        "current_mastery": round(mastery, 3),
                    },
                    "difficulty_adjustment": "increase",
                    "next_concept": next_concept,
                    "affect_target": "confidence",
                }
                rationale = (
                    f"Student is achieving (streak={streak}, "
                    f"mastery_trend={mastery_trend:+.2f}, mastery={mastery:.2f}). "
                    "Celebrating and introducing harder concept."
                )

            else:
                mode = "encouragement"
                payload = {
                    "mode": mode,
                    "message": (
                        "You're making progress — keep going! Every attempt "
                        "builds your understanding."
                    ),
                    "difficulty_adjustment": "maintain",
                    "affect_target": "general",
                }
                rationale = (
                    "No strong affective signal. Providing general encouragement."
                )

            constraints.append(f"mode_{mode}")
            return self._build_action(
                action_type="motivate",
                content_payload=payload,
                priority=self.priority,
                rationale=rationale,
                constraints_checked=constraints,
            )

        except Exception as exc:
            logger.exception("MotivatorBot error: %s", exc)
            return self._build_action(
                action_type="none",
                content_payload={"skip": True, "error": str(exc)},
                priority=self.priority,
                rationale="MotivatorBot encountered an error.",
                constraints_checked=["error_fallback"],
            )

    def _get_streak(self, history: list) -> int:
        """Count consecutive correct student answers from the end."""
        streak = 0
        for turn in reversed(history):
            if (
                _safe_get(turn, "role", default="") == "student"
                and _safe_get(turn, "is_correct", default=False)
            ):
                streak += 1
            else:
                break
        return streak

    def _get_mastery_trend(self, student_state: dict, topic: str) -> float:
        """Simplified mastery trend from cognitive dimension snapshots."""
        snapshots = _safe_get(
            student_state, "cognitive", default={}
        )
        history_snapshots = _safe_get(
            snapshots, "mastery_history", default=[]
        )
        if isinstance(history_snapshots, list) and len(history_snapshots) >= 2:
            return history_snapshots[-1] - history_snapshots[0]
        return 0.0

    def _suggest_next_concept(self, context: dict) -> Optional[str]:
        learning_path = _safe_get(context, "learning_path", default=[])
        if isinstance(learning_path, list) and len(learning_path) > 1:
            return learning_path[1]
        return None


# ---------------------------------------------------------------------------
# 6. TutorBot — priority 60
# ---------------------------------------------------------------------------

class TutorBot(BaseAgent):
    agent_name = "tutor_bot"
    priority = 60
    action_type = ActionType.TUTOR.value

    parameters: Dict[str, AgentParameter] = {
        "prerequisite_gap_action": AgentParameter(
            name="prerequisite_gap_action",
            value="redirect",
            description="Action when prerequisite gap detected: redirect or scaffold",
        ),
        "default_format": AgentParameter(
            name="default_format",
            value="text_explanation",
            description="Default teaching format",
        ),
    }

    FORMAT_BY_STYLE = {
        "visual": ["visual_diagram", "walkthrough"],
        "auditory": ["socratic_dialogue", "text_explanation"],
        "kinesthetic": ["simulation", "walkthrough"],
        "reading": ["text_explanation", "visual_diagram"],
    }

    MISCONCEPTIONS: Dict[str, dict] = {}

    def propose_action(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list,
    ) -> AgentAction:
        constraints: list[str] = []
        try:
            topic = self._get_current_topic(teaching_context)
            mastery = self._get_topic_mastery(student_state, topic)
            learning_style = self._infer_learning_style(student_state)
            prerequisites = self._get_prerequisites(topic, teaching_context)

            constraints.append(f"topic={topic}")
            constraints.append(f"mastery={mastery:.2f}")
            constraints.append(f"style={learning_style}")

            # --- Prerequisite check ---
            missing_prereqs = self._check_prerequisites(student_state, prerequisites)
            if missing_prereqs:
                constraints.append(f"prereq_gap:{','.join(missing_prereqs)}")
                prereq_action = self.get_param("prerequisite_gap_action", "redirect")
                if prereq_action == "redirect":
                    return self._build_action(
                        action_type="tutor",
                        content_payload={
                            "teaching_action": "redirect_to_prerequisites",
                            "format": "text_explanation",
                            "missing_prerequisites": missing_prereqs,
                            "redirect_message": (
                                f"Before we dive into {topic}, let's make sure "
                                f"the foundation is solid. We need to cover "
                                f"{' and '.join(missing_prereqs)} first — "
                                f"they're essential building blocks."
                            ),
                            "redirect_target": missing_prereqs[0],
                        },
                        priority=self.priority,
                        rationale=(
                            f"Prerequisite gap detected: {missing_prereqs}. "
                            "Redirecting to build foundational knowledge first."
                        ),
                        constraints_checked=constraints,
                    )
                constraints.append("prereq_scaffold_mode")

            # --- Select format based on learning style + mastery ---
            style_formats = self.FORMAT_BY_STYLE.get(
                learning_style, ["text_explanation"]
            )
            if mastery < 0.3:
                # Low mastery → more structured formats
                selected_format = (
                    "walkthrough"
                    if "walkthrough" in style_formats
                    else style_formats[0]
                )
            elif mastery < 0.7:
                selected_format = (
                    style_formats[1] if len(style_formats) > 1 else style_formats[0]
                )
            else:
                # High mastery → Socratic dialogue
                selected_format = (
                    "socratic_dialogue"
                    if "socratic_dialogue" in style_formats
                    else style_formats[0]
                )

            constraints.append(f"format={selected_format}")

            # --- Build teaching payload ---
            enrichment = _safe_get(teaching_context, "enrichment", default={})
            explanations = _safe_get(enrichment, "explanations", default={})
            topic_explanation = _safe_get(explanations, topic, default="")

            teaching_content = self._build_teaching_content(
                selected_format, topic, topic_explanation, mastery, teaching_context
            )

            return self._build_action(
                action_type="tutor",
                content_payload={
                    "teaching_action": "present_content",
                    "format": selected_format,
                    "topic": topic,
                    "content": teaching_content,
                    "learning_style": learning_style,
                    "mastery_level": (
                        "beginner" if mastery < 0.3
                        else "intermediate" if mastery < 0.7
                        else "advanced"
                    ),
                },
                priority=self.priority,
                rationale=(
                    f"Teaching '{topic}' using '{selected_format}' format "
                    f"(style={learning_style}, mastery={mastery:.2f}). "
                    "All prerequisites satisfied."
                ),
                constraints_checked=constraints,
            )

        except Exception as exc:
            logger.exception("TutorBot error: %s", exc)
            return self._build_action(
                action_type="none",
                content_payload={"skip": True, "error": str(exc)},
                priority=self.priority,
                rationale="TutorBot encountered an error.",
                constraints_checked=["error_fallback"],
            )

    def _get_prerequisites(self, topic: str, context: dict) -> list:
        topic_graph = _safe_get(context, "topic_graph", default={})
        nodes = _safe_get(topic_graph, "nodes", default={})
        topic_node = _safe_get(nodes, topic, default={})
        return list(_safe_get(topic_node, "prerequisites", default=[]))

    def _check_prerequisites(self, student_state: dict, prerequisites: list) -> list:
        if not prerequisites:
            return []
        missing = []
        for prereq in prerequisites:
            mastery = self._get_topic_mastery(student_state, prereq)
            if mastery < 0.4:
                missing.append(prereq)
        return missing

    def _build_teaching_content(
        self, fmt: str, topic: str, explanation: str, mastery: float, context: dict
    ) -> dict:
        if fmt == "text_explanation":
            return {
                "type": "text_explanation",
                "text": explanation
                or f"Let me explain {topic} in a clear, step-by-step way.",
                "key_points": [topic],
            }
        elif fmt == "visual_diagram":
            return {
                "type": "visual_diagram",
                "description": (
                    f"A visual breakdown of {topic} showing the key relationships "
                    f"and flow of concepts."
                ),
                "diagram_type": "concept_map",
                "topic": topic,
            }
        elif fmt == "socratic_dialogue":
            return {
                "type": "socratic_dialogue",
                "opening_question": (
                    f"What do you already understand about how {topic} works?"
                ),
                "guided_questions": [
                    f"What role does the main concept of {topic} play?",
                    f"How would you explain {topic} to a friend?",
                    f"What would happen if a key part of {topic} were missing?",
                ],
            }
        elif fmt == "walkthrough":
            steps = [
                f"Step 1: Understand the problem in {topic}",
                f"Step 2: Identify the key principles at work",
                f"Step 3: Apply the method step by step",
                f"Step 4: Verify your result",
            ]
            return {"type": "walkthrough", "steps": steps, "topic": topic}
        elif fmt == "simulation":
            return {
                "type": "simulation",
                "description": f"Interactive simulation of {topic} concepts.",
                "interactive_elements": ["parameter_slider", "run_button", "result_display"],
                "topic": topic,
            }
        else:
            return {"type": fmt, "topic": topic, "text": explanation or f"Content for {topic}"}


# ---------------------------------------------------------------------------
# AgentEnsemble
# ---------------------------------------------------------------------------

class AgentEnsemble:
    """
    Runs all six specialized agents and returns their action proposals.
    The orchestrator (separate file) selects the winning action.
    """

    def __init__(self):
        self.agents: List[BaseAgent] = [
            EthicsBot(),
            AssessmentBot(),
            ScaffoldBot(),
            FeedbackBot(),
            MotivatorBot(),
            TutorBot(),
        ]
        # Sort by priority (lower = runs first / wins ties)
        self.agents.sort(key=lambda a: a.priority)

    def register_agent(self, agent: BaseAgent) -> None:
        self.agents.append(agent)
        self.agents.sort(key=lambda a: a.priority)

    def run_all_agents(
        self,
        student_state: dict,
        teaching_context: dict,
        interaction_history: list[dict],
    ) -> List[AgentAction]:
        """
        Execute every agent and collect their proposals.
        Never propagates exceptions — individual agents handle their own errors.
        """
        actions: List[AgentAction] = []
        for agent in self.agents:
            try:
                action = agent.propose_action(
                    student_state=student_state,
                    teaching_context=teaching_context,
                    interaction_history=interaction_history,
                )
                actions.append(action)
                logger.debug(
                    "Agent '%s' proposed %s (priority=%d)",
                    agent.agent_name,
                    action.action_type,
                    action.priority,
                )
            except Exception as exc:
                logger.exception(
                    "Agent '%s' raised unhandled exception: %s", agent.agent_name, exc
                )
                fallback = AgentAction(
                    agent_name=agent.agent_name,
                    action_type="none",
                    content_payload={"error": str(exc), "skip": True},
                    priority=getattr(agent, "priority", 999),
                    rationale=f"Unhandled exception in {agent.agent_name}: {exc}",
                    constraints_checked=["unhandled_error"],
                )
                actions.append(fallback)
        return actions

    def get_agent(self, name: str) -> Optional[BaseAgent]:
        for agent in self.agents:
            if agent.agent_name == name:
                return agent
        return None

    def list_agents(self) -> List[Dict[str, Any]]:
        return [
            {
                "name": a.agent_name,
                "priority": a.priority,
                "action_type": a.action_type,
                "parameter_count": len(a.parameters),
            }
            for a in self.agents
        ]


# ---------------------------------------------------------------------------
# Convenience factory
# ---------------------------------------------------------------------------

def create_ensemble() -> AgentEnsemble:
    """Factory function used by the orchestrator."""
    return AgentEnsemble()