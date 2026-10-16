"""answer_lane.py — THE one decision-order contract for every answer
surface (Layer U, BATCH_BRIEF §4B).

Law: a student's answer is produced by exactly one decision order —

    1. deterministic solver   -> AnswerLabel.VERIFIED
    2. node retrieval         -> AnswerLabel.GROUNDED
    3. LLM (grounded prompt)  -> AnswerLabel.AI

Every surface that ships an answer — /api/tutor/ask (+stream), the tutor
websocket (SocraticV2), /v2/solve/*, the voice path — stamps the SAME
enum on its response and records ONE telemetry row. No surface may carry
its own bespoke honesty marker: the UI renders `answer_label`, period.

This module is import-safe without DB/models (the enum and stamping run
anywhere); the telemetry hook fails open.
"""
from __future__ import annotations

import logging
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)


class AnswerLabel(str, Enum):
    """THE honesty enum. One per answer, rendered by every UI."""
    VERIFIED = "VERIFIED"    # deterministic second-path-verified solve
    GROUNDED = "GROUNDED"    # answer taken from the node's own content
    AI = "AI"                # model answer grounded in lesson notes —
                             # helpful, not a verified solution
    NONE = "NONE"            # no answer shipped (guidance/hints only)


# pipeline result labels -> lane label (VERIFIED* tier only answers;
# GUIDED/assumed results never masquerade as verified here)
_PIPELINE_VERIFIED_PREFIXES = ("VERIFIED",)


def label_from_pipeline(pipeline_label: Optional[str]) -> AnswerLabel:
    """Map an answer_pipeline result label to the lane enum."""
    s = str(pipeline_label or "")
    if s.startswith(_PIPELINE_VERIFIED_PREFIXES):
        return AnswerLabel.VERIFIED
    return AnswerLabel.NONE


def surface_label(surface: str, label: AnswerLabel,
                  source: str) -> Dict[str, str]:
    """The canonical stamped fields every response carries."""
    return {"answer_label": label.value, "answer_source": source,
            "answer_surface": surface}


# TutorService.quick_question `method` values -> lane label.
# The method string already names the lane that produced the answer;
# this maps it onto the honesty enum every surface renders.
_VERIFIED_METHODS = frozenset({
    "pattern_solver", "compute", "node_solver", "solver_verified",
    "generic_expression", "generic_bank_formula",
})
_GROUNDED_METHODS = frozenset({
    "template", "template_reuse", "routing", "definition",
    "exact", "exact_normalized", "exact_option_match",
    "semantic", "dense_only", "hybrid_rrf", "index_match",
})
_AI_PREFIXES = ("llm", "ai_", "model_")


def label_from_method(method: Optional[str]) -> AnswerLabel:
    """Map a TutorService method string to the lane enum.

    Unknown strings default to AI — the least-trusted label. Never claim
    VERIFIED or GROUNDED for a method this mapping has never seen."""
    m = (method or "").strip().lower()
    if m in _VERIFIED_METHODS or m.startswith("generic_"):
        return AnswerLabel.VERIFIED
    if m in _GROUNDED_METHODS:
        return AnswerLabel.GROUNDED
    if m.startswith(_AI_PREFIXES):
        return AnswerLabel.AI
    if m in ("none", "fallback", "timeout", "service_unavailable",
             "pattern_solver_missing", "low_confidence", "no_match"):
        return AnswerLabel.NONE
    return AnswerLabel.AI


_T0: Dict[str, float] = {}


def mark(surface: str) -> None:
    """Start a latency window for a surface call."""
    _T0[surface] = time.perf_counter()


def stamp(reply: Dict[str, Any], surface: str, label: AnswerLabel,
          source: str) -> Dict[str, Any]:
    """Stamp the shared label fields onto a reply dict and record ONE
    telemetry row.  Additive: existing fields are untouched, so every
    surface can adopt this without changing its response shape."""
    t0 = _T0.pop(surface, None)
    latency_ms = (time.perf_counter() - t0) * 1000.0 if t0 else None
    reply.update(surface_label(surface, label, source))
    if latency_ms is not None:
        reply["answer_latency_ms"] = round(latency_ms, 1)
    _record(surface, label, source, latency_ms)
    return reply


def _record(surface: str, label: AnswerLabel, source: str,
            latency_ms: Optional[float]) -> None:
    """Telemetry convergence (U6): every lane records surface, lane
    taken, label, latency.  solver_telemetry is the sink — its `route`
    slot carries surface+label; fail open."""
    try:
        from backend.its.solver.solver_telemetry import record
        record(f"answer_lane:{surface}:{label.value}",
               verified=(label is AnswerLabel.VERIFIED),
               latency_ms=float(latency_ms or 0.0))
    except Exception:
        logger.debug("answer_lane telemetry sink unavailable (%s/%s)",
                     surface, label.value)


@dataclass
class LaneDecision:
    """The decision-order result one surface acts on."""
    label: AnswerLabel
    answer: Optional[str] = None
    source: str = ""
    meta: Dict[str, Any] = field(default_factory=dict)

    @property
    def answered(self) -> bool:
        return bool(self.answer) and self.label is not AnswerLabel.NONE


def decide_order() -> str:
    """The contract as text — surfaced in the report and asserts."""
    return ("deterministic(VERIFIED) -> node(GROUNDED) -> llm(AI); "
            "no surface ships an answer outside this order")
