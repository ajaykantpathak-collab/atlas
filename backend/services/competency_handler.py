"""competency_handler.py — CBSE 2025-26 competency question handler.

Detects competency questions, runs the deterministic calculation, and
generates a justification using the local LLM (with template fallback).

CBSE 2025-26 competency questions require:
  1. Calculation (deterministic — SymPy/compute engine)
  2. Justification/explanation (LLM — explains WHY, never computes)

Detection (per fable_stem_solver_design.md Section E2):
  - "justify", "explain", "give reason", "why does", "state the principle"
  - Comparison questions ("who did more", "which is greater", "compare A and B")
  - Scenario comprehension (multiple entities, multiple conditions)
  - Prediction/consequence ("what will happen if", "predict the effect")

Split logic:
  - Calculation path: ALWAYS deterministic. LLM has NO access to compute engine.
  - Comprehension path: Deterministic extraction. LLM may assist if confidence < 0.8.
  - Justification path: LLM-generated prose, constrained by computed result.

Author: Platform Backend Team
"""

from __future__ import annotations

import logging
import re
from typing import Any, Optional

logger = logging.getLogger(__name__)

# ── competency detection patterns ────────────────────────────────────────────

_JUSTIFY_PATTERNS = [
    r"\bjustify\b",
    r"\bexplain\b",
    r"\bgive\s+reason\b",
    r"\bwhy\s+does\b",
    r"\bwhy\s+is\b",
    r"\bstate\s+the\s+principle\b",
    r"\bwhat\s+is\s+the\s+physics\b",
    r"\bwhat\s+is\s+the\s+chemistry\b",
    r"\bwhat\s+is\s+the\s+maths\b",
    r"\bshow\s+that\b",
    r"\bprove\s+that\b",
    r"\bdeduce\b",
]

_COMPARE_PATTERNS = [
    r"\bwho\s+(did|expended|used|has)\s+more\b",
    r"\bwhich\s+is\s+(greater|larger|smaller|less|more)\b",
    r"\bcompare\b",
    r"\bversus\b",
    r"\bvs\.?\b",
    r"\bdifference\s+between\b",
]

_PREDICT_PATTERNS = [
    r"\bwhat\s+will\s+happen\b",
    r"\bpredict\b",
    r"\bwhat\s+would\s+happen\b",
    r"\bconsequence\b",
    r"\beffect\s+of\b",
]

_ALL_PATTERNS = _JUSTIFY_PATTERNS + _COMPARE_PATTERNS + _PREDICT_PATTERNS

# ── template justifications (fallback when LLM unavailable) ──────────────────

_TEMPLATE_JUSTIFICATIONS = {
    "physics_power": (
        "The principle here is that power is the rate of doing work. "
        "Work done against gravity is W = mgh. Power P = W/t = mgh/t. "
        "The student who climbs stairs does work against gravity, while "
        "walking on flat ground at constant speed does no work against gravity."
    ),
    "physics_energy": (
        "The principle is conservation of energy. Energy transforms between "
        "kinetic and potential forms but total mechanical energy is conserved "
        "in the absence of non-conservative forces."
    ),
    "physics_force": (
        "The principle is Newton's second law: F = ma. The net force on an "
        "object determines its acceleration. In equilibrium, net force is zero."
    ),
    "chemistry_equilibrium": (
        "The principle is Le Chatelier's principle: when a system at equilibrium "
        "is disturbed, it shifts to counteract the change. This explains why "
        "changing concentration, pressure, or temperature affects the equilibrium."
    ),
    "math_calculus": (
        "The principle is that differentiation gives the rate of change, and "
        "integration gives the accumulated quantity. At critical points, the "
        "derivative is zero, indicating maxima or minima."
    ),
    "default": (
        "The calculation above applies the relevant formula from the curriculum. "
        "The result follows directly from substituting the given values into "
        "the formula and solving step by step."
    ),
}


class CompetencyHandler:
    """Handles CBSE 2025-26 competency questions.

    Detection is deterministic. Calculation is deterministic.
    Justification uses the local LLM with template fallback.
    """

    def __init__(self, client: Any = None):
        self._client = client

    def _get_client(self):
        if self._client is None:
            from .llm_client import get_llm_client
            self._client = get_llm_client()
        return self._client

    # ── detection ─────────────────────────────────────────────────────────────

    def is_competency_question(self, problem_text: str) -> bool:
        """Check if a question is a competency question.

        Returns True if ANY competency pattern matches.
        """
        text_lower = problem_text.lower()
        for pattern in _ALL_PATTERNS:
            if re.search(pattern, text_lower):
                return True
        return False

    def detect_competency_type(self, problem_text: str) -> str:
        """Detect the specific type of competency question.

        Returns: 'justify', 'compare', 'predict', or 'general'
        """
        text_lower = problem_text.lower()

        for pattern in _JUSTIFY_PATTERNS:
            if re.search(pattern, text_lower):
                return "justify"

        for pattern in _COMPARE_PATTERNS:
            if re.search(pattern, text_lower):
                return "compare"

        for pattern in _PREDICT_PATTERNS:
            if re.search(pattern, text_lower):
                return "predict"

        return "general"

    def detect_concept_tags(self, problem_text: str) -> list[str]:
        """Detect concept tags from the problem text for justification context."""
        text_lower = problem_text.lower()
        tags = []

        # Physics concepts
        if any(w in text_lower for w in ["power", "work", "energy", "climb", "stairs"]):
            tags.append("PHY_WORK")
        if any(w in text_lower for w in ["force", "newton", "acceleration", "mass"]):
            tags.append("PHY_NLM")
        if any(w in text_lower for w in ["velocity", "speed", "motion", "kinematic"]):
            tags.append("PHY_KIN")
        if any(w in text_lower for w in ["gravity", "gravitation", "orbit", "planet"]):
            tags.append("PHY_GRAV")
        if any(w in text_lower for w in ["circuit", "current", "voltage", "resistance"]):
            tags.append("PHY_ELC")
        if any(w in text_lower for w in ["lens", "mirror", "refraction", "optics"]):
            tags.append("PHY_OPT")
        if any(w in text_lower for w in ["magnet", "magnetic", "field", "flux"]):
            tags.append("PHY_MAG")

        # Chemistry concepts
        if any(w in text_lower for w in ["equilibrium", "le chatelier", "reaction"]):
            tags.append("CHM_EQM")
        if any(w in text_lower for w in ["mole", "stoichiometry", "mass", "reactant"]):
            tags.append("CHM_STO")
        if any(w in text_lower for w in ["acid", "base", "ph", "indicator"]):
            tags.append("CHM_ABD")
        if any(w in text_lower for w in ["bond", "molecule", "structure"]):
            tags.append("CHM_BND")

        # Math concepts
        if any(w in text_lower for w in ["derivative", "differentiate", "rate of change"]):
            tags.append("MATH_CALC")
        if any(w in text_lower for w in ["integral", "integrate", "area under"]):
            tags.append("MATH_INT")
        if any(w in text_lower for w in ["probability", "chance", "likely"]):
            tags.append("MATH_PROB")
        if any(w in text_lower for w in ["matrix", "determinant"]):
            tags.append("MATH_MAT")

        return tags or ["GENERAL"]

    # ── main handler ──────────────────────────────────────────────────────────

    async def handle(
        self,
        problem_text: str,
        computed_result: dict | None = None,
        board: str = "CBSE",
        class_level: str = "10",
    ) -> dict:
        """Handle a competency question end-to-end.

        1. Detect if it's a competency question
        2. If computed_result is provided, generate justification
        3. If not, flag for calculation then justification

        Returns:
          - is_competency: bool
          - competency_type: str
          - concept_tags: list[str]
          - justification: str
          - justification_source: 'llm' | 'template'
          - llm_error: bool
        """
        is_comp = self.is_competency_question(problem_text)

        if not is_comp:
            return {
                "is_competency": False,
                "competency_type": "none",
                "concept_tags": [],
                "justification": "",
                "justification_source": "none",
                "llm_error": False,
            }

        comp_type = self.detect_competency_type(problem_text)
        concept_tags = self.detect_concept_tags(problem_text)

        # Generate justification
        if computed_result:
            justification, source, llm_error = await self._generate_justification(
                problem_text, computed_result, concept_tags, board, class_level
            )
        else:
            # No computation yet — return detection result for the solver to compute first
            return {
                "is_competency": True,
                "competency_type": comp_type,
                "concept_tags": concept_tags,
                "justification": "",
                "justification_source": "pending",
                "llm_error": False,
                "needs_calculation": True,
            }

        return {
            "is_competency": True,
            "competency_type": comp_type,
            "concept_tags": concept_tags,
            "justification": justification,
            "justification_source": source,
            "llm_error": llm_error,
        }

    # ── justification generation ──────────────────────────────────────────────

    async def _generate_justification(
        self,
        problem_text: str,
        computed_result: dict,
        concept_tags: list[str],
        board: str,
        class_level: str,
    ) -> tuple[str, str, bool]:
        """Generate justification text.

        Tries LLM first, falls back to template if LLM unavailable.
        Returns (justification_text, source, llm_error).
        """
        # Try LLM justification
        try:
            client = self._get_client()
            justification = await client.generate_justification(
                problem_text=problem_text,
                computed_result=computed_result,
                concept_tags=concept_tags,
                board=board,
                class_level=class_level,
            )

            if justification and not justification.startswith("[LLM"):
                return justification, "llm", False
        except Exception as exc:
            logger.warning("LLM justification failed: %s", exc)

        # Template fallback
        template_key = self._select_template(concept_tags)
        template_text = _TEMPLATE_JUSTIFICATIONS.get(
            template_key, _TEMPLATE_JUSTIFICATIONS["default"]
        )

        return template_text, "template", True

    def _select_template(self, concept_tags: list[str]) -> str:
        """Select the best template based on concept tags."""
        tags_str = " ".join(concept_tags).upper()

        if "PHY_WORK" in tags_str or "PHY_POWER" in tags_str:
            return "physics_power"
        if "PHY_NLM" in tags_str:
            return "physics_force"
        if "PHY_ENERGY" in tags_str or "PHY_KIN" in tags_str:
            return "physics_energy"
        if "CHM_EQM" in tags_str:
            return "chemistry_equilibrium"
        if "MATH_CALC" in tags_str or "MATH_INT" in tags_str:
            return "math_calculus"
        return "default"


# ── singleton ────────────────────────────────────────────────────────────────

_handler: Optional[CompetencyHandler] = None


def get_competency_handler() -> CompetencyHandler:
    """Get or create the singleton competency handler."""
    global _handler
    if _handler is None:
        _handler = CompetencyHandler()
    return _handler
