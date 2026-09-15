"""llm_fallback_handler.py — LLM safety net for the STEM solver.

Triggered ONLY when all deterministic solvers fail. Uses the local LLM
(FreeLLMAPI / Ollama) with strict guardrails — the LLM never computes,
it only analyses and suggests approaches.

Guardrails (per fable_stem_solver_design.md Section F):
  ALLOWED:
    - Parse ambiguous text and return structured extraction
    - Identify which formula/concept applies when KB match fails
    - Generate explanation/justification text for competency questions
    - Diagnose why a deterministic solve failed
    - Propose decomposition for novel multi-step problems

  NOT ALLOWED:
    - Perform computation (numeric or symbolic)
    - Override deterministic answers
    - Invent formulas not in KB
    - Answer biology essay questions without computational component

Trigger conditions:
  - parse_confidence < 0.7 AND no legacy solver match
  - Formula selector returns empty set
  - Multi-step decomposer cannot find path
  - Verification failed (back-substitution or dimensional check)
  - Chemistry reaction unknown
  - Novel problem type (concept tags empty)

Author: Platform Backend Team
"""

from __future__ import annotations

import logging
import re
from typing import Any, Optional

logger = logging.getLogger(__name__)

# ── trigger reasons ──────────────────────────────────────────────────────────

TRIGGER_PARSE_FAILURE = "parse_failure"
TRIGGER_NO_FORMULA = "no_formula_match"
TRIGGER_DEAD_END = "multi_step_dead_end"
TRIGGER_VERIFICATION_FAILED = "verification_failed"
TRIGGER_UNKNOWN_REACTION = "unknown_reaction"
TRIGGER_NOVEL_PROBLEM = "novel_problem"
TRIGGER_COMPETENCY = "competency_justification"

ALL_TRIGGERS = {
    TRIGGER_PARSE_FAILURE,
    TRIGGER_NO_FORMULA,
    TRIGGER_DEAD_END,
    TRIGGER_VERIFICATION_FAILED,
    TRIGGER_UNKNOWN_REACTION,
    TRIGGER_NOVEL_PROBLEM,
    TRIGGER_COMPETENCY,
}


class LLMFallbackHandler:
    """Safety-net handler that calls the local LLM when deterministic solvers fail.

    Never raises — returns a best-effort result with confidence and disclosure.
    """

    def __init__(self, client: Any = None):
        # Lazy import to avoid circular deps
        if client is not None:
            self._client = client
        else:
            self._client = None

        # Circuit breaker: if LLM fails N times in a row, stop trying
        self._consecutive_failures = 0
        self._max_consecutive_failures = 5
        self._circuit_open = False

    def _get_client(self):
        """Lazy-init the LLM client."""
        if self._client is None:
            from .llm_client import get_llm_client
            self._client = get_llm_client()
        return self._client

    # ── public API ────────────────────────────────────────────────────────────

    async def handle(
        self,
        problem_text: str,
        trigger_reason: str,
        canonical_ir: dict | None = None,
        attempted_solution: dict | None = None,
        error_details: str = "",
    ) -> dict:
        """Handle a solver fallback request.

        Returns a dict with:
          - success: bool
          - extraction: dict (quantities, target, concept_tags)
          - formula_candidates: list[str]
          - explanation_text: str
          - confidence: float (0.0-1.0)
          - fallback_used: bool (always True)
          - disclosure: str (shown to user)
          - llm_error: bool (True if LLM was unavailable)
        """
        if trigger_reason not in ALL_TRIGGERS:
            logger.warning("Unknown trigger reason: %s", trigger_reason)
            trigger_reason = TRIGGER_NOVEL_PROBLEM

        # Circuit breaker check
        if self._circuit_open:
            logger.info("LLM circuit breaker open — returning template fallback")
            return self._template_fallback(problem_text, trigger_reason)

        # Call the LLM
        try:
            client = self._get_client()
            result = await client.solver_fallback(
                problem_text=problem_text,
                trigger_reason=trigger_reason,
                canonical_ir=canonical_ir,
                attempted_solution=attempted_solution,
                error_details=error_details,
            )

            # Validate the LLM output
            validated = self._validate_output(result, trigger_reason)

            # Reset circuit breaker on success
            self._consecutive_failures = 0
            self._circuit_open = False

            # Add disclosure
            validated["fallback_used"] = True
            validated["disclosure"] = (
                "This problem required AI-assisted interpretation. "
                "The computation was performed by the deterministic engine; "
                "the AI assisted with problem analysis only."
            )

            logger.info(
                "LLM fallback succeeded (trigger=%s, confidence=%.2f)",
                trigger_reason,
                validated.get("confidence", 0.0),
            )
            return validated

        except Exception as exc:
            logger.warning("LLM fallback failed: %s", exc)
            self._consecutive_failures += 1
            if self._consecutive_failures >= self._max_consecutive_failures:
                self._circuit_open = True
                logger.warning(
                    "LLM circuit breaker opened after %d consecutive failures",
                    self._consecutive_failures,
                )
            return self._template_fallback(problem_text, trigger_reason, str(exc))

    # ── validation ────────────────────────────────────────────────────────────

    def _validate_output(self, raw: dict, trigger: str) -> dict:
        """Validate and sanitise the LLM output.

        - Ensures required keys exist
        - Caps confidence at 0.7 (LLM suggestions are never high-confidence)
        - Strips any computed numerical answers from explanation_text
        - Checks formula candidates against known patterns
        """
        validated = {
            "success": True,
            "extraction": raw.get("extraction", {
                "quantities": [],
                "target": "",
                "concept_tags": [],
            }),
            "formula_candidates": raw.get("formula_candidates", []),
            "explanation_text": raw.get("explanation_text", ""),
            "confidence": min(float(raw.get("confidence", 0.5)), 0.7),
            "fallback_used": True,
            "llm_error": raw.get("llm_error", False),
        }

        # If LLM errored, mark as unsuccessful
        if validated["llm_error"]:
            validated["success"] = False
            validated["confidence"] = 0.0
            return validated

        # Strip any direct numerical answers from explanation (guardrail)
        validated["explanation_text"] = self._strip_computed_answers(
            validated["explanation_text"]
        )

        # Validate formula candidates — must look like formulas, not prose
        validated["formula_candidates"] = [
            f for f in validated["formula_candidates"]
            if isinstance(f, str) and len(f) < 200 and "=" in f
        ][:5]  # max 5 candidates

        return validated

    def _strip_computed_answers(self, text: str) -> str:
        """Remove patterns like 'the answer is 42' or '= 42' from explanation text.

        The LLM is NOT allowed to compute — if it slips in a number, remove it.
        """
        if not text:
            return text

        # Remove "the answer is X" / "the solution is X" / "result: X" / "result is: X"
        text = re.sub(
            r"(the\s+answer\s+is|the\s+solution\s+is|result\s*[:is]+\s*:?)\s*[\d.]+",
            "[answer removed — computed by deterministic engine]",
            text,
            flags=re.IGNORECASE,
        )

        # Remove standalone "= <number>" at end of sentences
        text = re.sub(
            r"=\s*\d+\.?\d*\s*(m/s|kg|N|J|W|Pa|K|mol|L|m|s|Hz|V|A|Ω|C|T|G|N/m)?\b",
            "= [computed]",
            text,
            flags=re.IGNORECASE,
        )

        return text

    # ── template fallback (no LLM) ────────────────────────────────────────────

    def _template_fallback(
        self,
        problem_text: str,
        trigger: str,
        error: str = "",
    ) -> dict:
        """Return a template-based fallback when LLM is unavailable.

        This ensures the system degrades gracefully — the student still gets
        a helpful response even with no LLM.
        """
        templates = {
            TRIGGER_PARSE_FAILURE: (
                "I had trouble understanding this problem. "
                "Could you rephrase it or break it into smaller parts? "
                "For example, tell me what values are given and what you need to find."
            ),
            TRIGGER_NO_FORMULA: (
                "I couldn't find the right formula for this problem in my knowledge base. "
                "This might be a topic I haven't covered yet. "
                "Try checking your textbook for the relevant formula, or ask your teacher."
            ),
            TRIGGER_DEAD_END: (
                "This problem requires multiple steps, and I couldn't find a clear path "
                "from the given information to the answer. Try breaking it into smaller "
                "sub-problems: identify what you can calculate first, then use that result."
            ),
            TRIGGER_VERIFICATION_FAILED: (
                "I solved this problem but the answer didn't pass verification checks. "
                "This might mean an assumption was wrong or a value was misread. "
                "Please double-check the given values and try again."
            ),
            TRIGGER_UNKNOWN_REACTION: (
                "I don't have this chemical reaction in my database. "
                "Try identifying the reactants and products separately, "
                "then balance the equation manually."
            ),
            TRIGGER_NOVEL_PROBLEM: (
                "This seems like a new type of problem I haven't encountered before. "
                "I'd recommend asking your teacher or checking the textbook for similar examples."
            ),
            TRIGGER_COMPETENCY: (
                "This is a competency-based question that requires explanation. "
                "Focus on the physics/chemistry/maths principle behind the calculation."
            ),
        }

        explanation = templates.get(trigger, templates[TRIGGER_NOVEL_PROBLEM])

        return {
            "success": False,
            "extraction": {"quantities": [], "target": "", "concept_tags": []},
            "formula_candidates": [],
            "explanation_text": explanation,
            "confidence": 0.0,
            "fallback_used": True,
            "disclosure": "AI interpretation was unavailable. Showing a template response.",
            "llm_error": True,
            "error": error,
        }

    # ── circuit breaker control ───────────────────────────────────────────────

    def reset_circuit_breaker(self) -> None:
        """Reset the circuit breaker (call after a successful deterministic solve)."""
        self._consecutive_failures = 0
        self._circuit_open = False

    def is_circuit_open(self) -> bool:
        """Check if the circuit breaker is open (LLM calls being suppressed)."""
        return self._circuit_open


# ── singleton ────────────────────────────────────────────────────────────────

_handler: Optional[LLMFallbackHandler] = None


def get_fallback_handler() -> LLMFallbackHandler:
    """Get or create the singleton LLM fallback handler."""
    global _handler
    if _handler is None:
        _handler = LLMFallbackHandler()
    return _handler
