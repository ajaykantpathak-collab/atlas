"""bkt_engine.py -- Bayesian Knowledge Tracing (BKT) & Adaptive Student Mastery Engine.

Implements cognitive science-grounded student modeling:
1. Standard 4-parameter Bayesian Knowledge Tracing (Corbett & Anderson).
2. Latent mastery state updates per skill/concept node.
3. Zone of Proximal Development (ZPD) adaptive difficulty selector.
4. Forgetting curve adjustments (Ebbinghaus decay over elapsed time).
"""

from __future__ import annotations

import math
import time
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple, Any

# Default BKT parameters calibrated for STEM numericals
DEFAULT_P_L0 = 0.20   # Prior probability of mastery
DEFAULT_P_T  = 0.15   # Transition / learning probability
DEFAULT_P_G  = 0.15   # Guess probability (multiple choice ~0.25, numerical ~0.05)
DEFAULT_P_S  = 0.10   # Slip probability (student knows but makes arithmetic error)

MASTERY_THRESHOLD = 0.92
FORGETTING_RATE   = 0.005  # daily half-life decay parameter


@dataclass
class SkillParameters:
    p_l0: float = DEFAULT_P_L0
    p_t: float = DEFAULT_P_T
    p_g: float = DEFAULT_P_G
    p_s: float = DEFAULT_P_S


@dataclass
class SkillState:
    skill_id: str
    p_mastery: float = DEFAULT_P_L0
    attempts: int = 0
    correct_count: int = 0
    last_interaction_ts: float = field(default_factory=time.time)
    history: List[bool] = field(default_factory=list)

    @property
    def is_mastered(self) -> bool:
        return self.p_mastery >= MASTERY_THRESHOLD


class BKTEngine:
    """In-memory & persistent Bayesian Knowledge Tracing Engine."""

    def __init__(self, skill_params: Optional[Dict[str, SkillParameters]] = None):
        self.skill_params: Dict[str, SkillParameters] = skill_params or {}
        # student_id -> {skill_id -> SkillState}
        self._profiles: Dict[str, Dict[str, SkillState]] = {}

    def get_skill_params(self, skill_id: str) -> SkillParameters:
        return self.skill_params.get(skill_id, SkillParameters())

    def get_or_create_state(self, student_id: str, skill_id: str) -> SkillState:
        student_profile = self._profiles.setdefault(student_id, {})
        if skill_id not in student_profile:
            params = self.get_skill_params(skill_id)
            student_profile[skill_id] = SkillState(skill_id=skill_id, p_mastery=params.p_l0)
        return student_profile[skill_id]

    def apply_ebbinghaus_decay(self, state: SkillState, current_ts: Optional[float] = None) -> float:
        """Decay latent mastery based on elapsed days since last practice."""
        now = current_ts or time.time()
        elapsed_days = max(0.0, (now - state.last_interaction_ts) / 86400.0)
        if elapsed_days > 1.0:
            # Retention R = e^(-t/S)
            retention = math.exp(-FORGETTING_RATE * elapsed_days)
            state.p_mastery = max(DEFAULT_P_L0, state.p_mastery * retention)
        return state.p_mastery

    def update(self, student_id: str, skill_id: str, is_correct: bool,
               timestamp: Optional[float] = None) -> Tuple[float, Dict[str, Any]]:
        """Perform classical BKT Bayesian update upon student response."""
        now = timestamp or time.time()
        state = self.get_or_create_state(student_id, skill_id)
        params = self.get_skill_params(skill_id)

        # 1. Decay prior based on retention curve
        self.apply_ebbinghaus_decay(state, now)
        p_l = state.p_mastery
        p_g = params.p_g
        p_s = params.p_s
        p_t = params.p_t

        # 2. Bayesian Posterior Update P(L_t | observation)
        if is_correct:
            p_obs = p_l * (1.0 - p_s) + (1.0 - p_l) * p_g
            p_l_given_obs = (p_l * (1.0 - p_s)) / p_obs if p_obs > 0 else p_l
        else:
            p_obs = p_l * p_s + (1.0 - p_l) * (1.0 - p_g)
            p_l_given_obs = (p_l * p_s) / p_obs if p_obs > 0 else p_l

        # 3. Transition to next state: P(L_{t+1}) = P(L_t | obs) + (1 - P(L_t | obs)) * P(T)
        p_l_next = p_l_given_obs + (1.0 - p_l_given_obs) * p_t
        p_l_next = min(0.999, max(0.001, p_l_next))

        # 4. Save state
        state.p_mastery = p_l_next
        state.attempts += 1
        if is_correct:
            state.correct_count += 1
        state.last_interaction_ts = now
        state.history.append(is_correct)

        # 5. Diagnostic ZPD assessment
        zpd_tier = self.recommended_zpd_tier(p_l_next)

        return p_l_next, {
            "p_mastery": p_l_next,
            "is_mastered": state.is_mastered,
            "zpd_tier": zpd_tier,
            "attempts": state.attempts,
            "accuracy": state.correct_count / state.attempts,
        }

    @staticmethod
    def recommended_zpd_tier(p_mastery: float) -> str:
        """Select problem difficulty matching student's Zone of Proximal Development."""
        if p_mastery < 0.55:
            return "scaffolded_guided"   # High instructional guidance / worked example
        elif p_mastery < 0.85:
            return "practice_grade"      # Standard grade-level practice
        else:
            return "desirable_challenge"  # Deep multi-step transfer problem


# Global singleton instance
bkt_tracker = BKTEngine()
