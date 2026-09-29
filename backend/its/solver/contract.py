"""contract.py — the strict solver result contract.

Every solver lane (modeling families, kernel/CAS, competency catalog,
LLM fallback) publishes its result through ONE shape so the API can
enforce a single rule: a student-facing ANSWER exists only when the
work is VERIFIED.  Anything else ships method/steps with an honest
refusal reason — never an unverified number.

Statuses (SolverStatus):
    VERIFIED           deterministic execution + the family's own
                       verification beat passed (exact kernel checks,
                       back-substitution, gate stack). Answer released.
    GUIDED_PRACTICE    method/steps only; answer withheld (unverified
                       or deliberately withheld tier).
    AMBIGUOUS          more than one reading survived; Socratic confirm
                       data rides alongside.
    UNSUPPORTED        no canonical structure matched, or policy refused
                       to ship an unverified result.
    NEEDS_HUMAN_REVIEW every lane (including the fallback) declined --
                       the item goes to the review queue.

LLM-usage policy (central knobs live in config.py, gated in policy.py):
    SOLVER_LLM_MODE              off | parse_only | fallback | explain_only
                                 (default parse_only)
    SOLVER_REQUIRE_VERIFICATION  default true
    SOLVER_ALLOW_UNVERIFIED_ANSWER  default false

    parse_only+  competency `_llm_canonicalize` (slot EXTRACTION only --
                 the model maps numbers onto roles, never computes)
    fallback     services/llm_fallback_handler may run at all; in any
                 other mode it degrades to its template response
                 without contacting the LLM
    explain_only tutor/explanation lanes may rewrite prose; answers stay
                 deterministic

    With SOLVER_ALLOW_UNVERIFIED_ANSWER=false (the default) a fallback
    result that fails verification returns UNSUPPORTED -- never an
    answer.  `final_answer`/`answer` are surfaced by the API ONLY when
    status == VERIFIED; `answer_released` is the single gate.

ModelResult adoption: existing families keep returning ModelResult;
`SolverOutcome.from_model_result(...)` adapts at the answer_pipeline /
solve API boundary (no per-family rewrite).  `verified=True` must be
passed only when the family's own verification beat ran and passed --
which the step contract already mandates for VERIFIED promotion
(answer_pipeline's confidence>=0.85 + numeric/answer gate).

Structured logging: one `solver_metrics` JSON line per solve (logger
"solver.metrics") carrying route, solver_version, status, llm_used,
latency_ms, refusal_reason -- the JSON formatter comes from
observability.setup_logging (LOG_FORMAT=json).

solver_version: git sha injected at build time via env SOLVER_VERSION
(default "dev").
"""

from __future__ import annotations

import json
import logging
import os
import sys
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional


def _resolve_version() -> str:
    raw = (os.getenv("SOLVER_VERSION") or "").strip()
    return raw or "dev"


# git sha injected at build (deploy: SOLVER_VERSION env); "dev" locally.
SOLVER_VERSION = _resolve_version()

# answer_pipeline's VERIFIED promotion gate, restated once so the
# sandbox and every adapter use the SAME predicate for "verified".
PROMOTION_CONFIDENCE_FLOOR = 0.85


# --------------------------------------------------------------------------- #
# ProblemIR — the canonical problem representation (phase-2 target).
# --------------------------------------------------------------------------- #

@dataclass
class ProblemIR:
    """Canonical intermediate representation of one problem.

    Extraction INTO this IR is phase 2 — the type is defined now so
    lanes and tests can target it.  Only `subject` and `question_type`
    are required; everything else is optional because real extraction
    is partial by nature.
    """

    subject: str
    question_type: str                  # numeric | symbolic | mcq | proof | ...
    class_level: Optional[int] = None
    entities: List[str] = field(default_factory=list)
    quantities: Dict[str, float] = field(default_factory=dict)   # role -> SI value
    units: Dict[str, str] = field(default_factory=dict)          # role -> unit
    constraints: List[str] = field(default_factory=list)
    required_output: Optional[str] = None
    source_reference: Optional[str] = None
    ambiguity_flags: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "subject": self.subject,
            "question_type": self.question_type,
            "class_level": self.class_level,
            "entities": list(self.entities),
            "quantities": dict(self.quantities),
            "units": dict(self.units),
            "constraints": list(self.constraints),
            "required_output": self.required_output,
            "source_reference": self.source_reference,
            "ambiguity_flags": list(self.ambiguity_flags),
        }


# --------------------------------------------------------------------------- #
# Status + outcome
# --------------------------------------------------------------------------- #

class SolverStatus(str, Enum):
    VERIFIED = "VERIFIED"
    GUIDED_PRACTICE = "GUIDED_PRACTICE"
    AMBIGUOUS = "AMBIGUOUS"
    UNSUPPORTED = "UNSUPPORTED"
    NEEDS_HUMAN_REVIEW = "NEEDS_HUMAN_REVIEW"


# answer_pipeline truth labels that count as verified tiers
_VERIFIED_LABELS = frozenset({
    "VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL"})


@dataclass
class SolverOutcome:
    """One solve, published under the strict contract."""

    status: SolverStatus
    answer: Optional[str] = None       # surfaced ONLY when VERIFIED
    numeric: Optional[float] = None
    steps: List[str] = field(default_factory=list)
    proof: Dict[str, Any] = field(default_factory=dict)   # exact-kernel-style evidence
    route: List[str] = field(default_factory=list)
    structure: str = ""
    note: str = ""
    solver_version: str = SOLVER_VERSION
    llm_used: bool = False
    latency_ms: float = 0.0
    refusal_reason: Optional[str] = None

    @property
    def answer_released(self) -> bool:
        """The single gate every API path must apply."""
        return self.status == SolverStatus.VERIFIED

    def released_answer(self) -> Optional[str]:
        return self.answer if self.answer_released else None

    def to_payload(self) -> Dict[str, Any]:
        """Additive-safe dict for API responses.

        `answer`/`numeric` are released ONLY on VERIFIED.  A relaxed
        policy (allow_unverified_answer) keeps the raw answer on the
        outcome for internal consumers; here it rides explicitly as
        `unverified_answer` so it can never masquerade as verified."""
        unverified = (self.answer
                      if (self.status is SolverStatus.GUIDED_PRACTICE
                          and self.answer and not self.answer_released)
                      else None)
        return {
            "status": self.status.value,
            "answer": self.released_answer(),
            "numeric": self.numeric if self.answer_released else None,
            "unverified_answer": unverified,
            "steps": list(self.steps),
            "proof": dict(self.proof),
            "route": list(self.route),
            "structure": self.structure,
            "note": self.note,
            "solver_version": self.solver_version,
            "llm_used": self.llm_used,
            "latency_ms": self.latency_ms,
            "refusal_reason": self.refusal_reason,
        }

    # ---- adapters ------------------------------------------------------- #

    @classmethod
    def from_model_result(
        cls,
        mr: Any,
        *,
        verified: bool = False,
        route: Optional[List[str]] = None,
        llm_used: bool = False,
        latency_ms: Optional[float] = None,
        source: str = "deterministic",
    ) -> "SolverOutcome":
        """Adopt a ModelResult (modeling_layer / family registry) without
        rewriting the family.

        source: "deterministic" (family registry / kernel) or "fallback"
        (the LLM fallback lane).  The fallback lane is policy-gated: an
        unverified fallback result returns UNSUPPORTED unless the
        operator explicitly relaxed BOTH verification knobs.
        """
        lazy = latency_ms if latency_ms is not None else 0.0
        matched = bool(getattr(mr, "matched", False))
        note = str(getattr(mr, "note", "") or "")
        structure = str(getattr(mr, "structure", "") or "")
        steps = list(getattr(mr, "steps", []) or [])
        answer = getattr(mr, "final_answer", None)
        numeric = getattr(mr, "numeric_answer", None)
        proof = {
            "structure": structure,
            "governing_equation": str(getattr(mr, "governing_equation", "") or ""),
            "quantities": dict(getattr(mr, "quantities", {}) or {}),
            "confidence": float(getattr(mr, "confidence", 0.0) or 0.0),
        }

        # 1) no canonical structure matched -> honest unsupported
        if not matched:
            return cls(
                status=SolverStatus.UNSUPPORTED,
                answer=None, numeric=None, steps=steps, proof=proof,
                route=list(route or []), structure=structure, note=note,
                llm_used=llm_used, latency_ms=lazy,
                refusal_reason=note or "no canonical structure matched")

        # 2) verified tier: the family's own verification beat ran + passed
        if verified:
            return cls(
                status=SolverStatus.VERIFIED,
                answer=answer, numeric=numeric, steps=steps, proof=proof,
                route=list(route or []), structure=structure, note=note,
                llm_used=llm_used, latency_ms=lazy,
                refusal_reason=None)

        # 3) matched but UNVERIFIED — policy decides what may ship
        from backend.its.solver.policy import (require_verification,
                                               allow_unverified_answer)
        require = require_verification()
        allow = allow_unverified_answer()

        if source == "fallback":
            if require or not allow:
                return cls(
                    status=SolverStatus.UNSUPPORTED,
                    answer=None, numeric=None, steps=steps, proof=proof,
                    route=list(route or []), structure=structure, note=note,
                    llm_used=True, latency_ms=lazy,
                    refusal_reason=("verification required: unverified "
                                    "fallback result refused "
                                    "(SOLVER_REQUIRE_VERIFICATION=%s, "
                                    "SOLVER_ALLOW_UNVERIFIED_ANSWER=%s)"
                                    % (str(require).lower(),
                                       str(allow).lower())))
            # both knobs relaxed: the raw answer may ride, but the status
            # stays honest — never VERIFIED without verification.
            return cls(
                status=SolverStatus.GUIDED_PRACTICE,
                answer=answer, numeric=numeric, steps=steps, proof=proof,
                route=list(route or []), structure=structure, note=note,
                llm_used=True, latency_ms=lazy,
                refusal_reason=("unverified answer surfaced under relaxed "
                                "policy; NOT verified — never treat as "
                                "ground truth"))

        # deterministic unverified work: method/steps only, answer withheld
        refusal = ("method shown; answer withheld pending verification")
        if note:
            refusal = f"{note} — {refusal}"
        return cls(
            status=SolverStatus.GUIDED_PRACTICE,
            answer=None, numeric=None, steps=steps, proof=proof,
            route=list(route or []), structure=structure, note=note,
            llm_used=llm_used, latency_ms=lazy,
            refusal_reason=refusal)


# --------------------------------------------------------------------------- #
# Pipeline adapter (answer_pipeline PipelineResult -> SolverOutcome)
# --------------------------------------------------------------------------- #

def outcome_from_pipeline(result: Any) -> SolverOutcome:
    """Adapt an answer_pipeline PipelineResult (duck-typed) — the Truth
    Core already withholds answers on unverified tiers; this maps its
    labels onto SolverStatus honestly and carries the audit route."""
    label = str(getattr(result, "label", "") or "")
    steps = list(getattr(result, "steps", []) or [])
    refusal = getattr(result, "refusal_reason", None)
    audit = getattr(result, "audit", None)
    route = list(getattr(audit, "route", []) or []) if audit is not None else []
    latency = float(getattr(audit, "elapsed_ms", 0.0) or 0.0) \
        if audit is not None else 0.0
    socratic = getattr(result, "socratic", None)

    # llm_used honesty: the pipeline is deterministic end to end, but the
    # competency canonicalizer stamps its (parse-only) LLM assists into
    # notes/steps — surface that rather than claim a pure run.
    haystack = " ".join(str(s) for s in steps).lower()
    if audit is not None:
        haystack += " " + " ".join(
            str(a) for a in (getattr(audit, "assumptions", []) or [])).lower()
    llm_used = "llm" in haystack

    status: SolverStatus
    answer: Optional[str] = None
    numeric: Optional[float] = None
    if label in _VERIFIED_LABELS:
        status = SolverStatus.VERIFIED
        answer = getattr(result, "answer", None)
        numeric = getattr(result, "numeric", None)
    elif label == "AMBIGUOUS":
        status = SolverStatus.AMBIGUOUS
    else:
        status = SolverStatus.GUIDED_PRACTICE

    proof = {"lane": getattr(audit, "lane", None) if audit is not None
             else None,
             "gates_passed": list(getattr(audit, "gates_passed", []) or [])
             if audit is not None else [],
             "assumptions": list(getattr(audit, "assumptions", []) or [])
             if audit is not None else []}
    if socratic:
        # Socratic confirm data (ambiguity/guidance) is method evidence,
        # never an answer — ride it in proof so it stays out of `answer`.
        proof["socratic_keys"] = sorted(
            str(k) for k in (socratic if isinstance(socratic, dict) else {}))

    return SolverOutcome(
        status=status,
        answer=answer,
        numeric=numeric,
        steps=steps,
        proof=proof,
        route=route,
        structure=(route[-1] if route else "") or label,
        note="",
        llm_used=llm_used,
        latency_ms=latency,
        refusal_reason=refusal,
    )


# --------------------------------------------------------------------------- #
# Sandbox promotion gate (mirrors answer_pipeline's VERIFIED gate)
# --------------------------------------------------------------------------- #

def promotion_gate(mr: Any) -> bool:
    """True only when a ModelResult may carry a student-facing answer:
    matched, confidence at/above the promotion floor, and it actually
    produced an answer — the SAME predicate answer_pipeline applies
    before promoting a registry family to VERIFIED."""
    matched = bool(getattr(mr, "matched", False))
    confidence = float(getattr(mr, "confidence", 0.0) or 0.0)
    produced = (getattr(mr, "numeric_answer", None) is not None
                or bool(getattr(mr, "final_answer", None)))
    return matched and confidence >= PROMOTION_CONFIDENCE_FLOOR and produced


# --------------------------------------------------------------------------- #
# Structured logging: one solver_metrics line per solve
# --------------------------------------------------------------------------- #

_metrics_logger = logging.getLogger("solver.metrics")
_metrics_handler_ready = False


def _ensure_metrics_handler() -> None:
    """Make the metrics line visible even before observability.setup_logging
    ships to the running image (it installs the root handler; until then
    an INFO record with no handler anywhere is silently dropped).

    Attaches a stderr stream handler to THIS logger only when the root
    logger has no handlers, and only once per process — so when the
    observability wave lands there is exactly one emission path."""
    global _metrics_handler_ready
    if _metrics_handler_ready:
        return
    _metrics_handler_ready = True
    try:
        root = logging.getLogger()
        if not root.handlers:
            handler = logging.StreamHandler(sys.stderr)
            handler.setFormatter(logging.Formatter("%(message)s"))
            _metrics_logger.addHandler(handler)
            _metrics_logger.setLevel(logging.INFO)
            _metrics_logger.propagate = True
    except Exception:  # pragma: no cover — never break the solve
        pass


def emit_solver_metrics(outcome: SolverOutcome, **extra: Any) -> None:
    """Emit THE solver_metrics line.  Never raises — logging must not
    break the answer path."""
    try:
        _ensure_metrics_handler()
        payload = {
            "event": "solver_metrics",
            "ts": round(time.time(), 3),
            "route": outcome.route,
            "solver_version": outcome.solver_version,
            "status": outcome.status.value
            if isinstance(outcome.status, SolverStatus)
            else str(outcome.status),
            "llm_used": bool(outcome.llm_used),
            "latency_ms": round(float(outcome.latency_ms or 0.0), 2),
            "refusal_reason": outcome.refusal_reason,
        }
        for k, v in extra.items():
            payload.setdefault(k, v)
        _metrics_logger.info(json.dumps(payload, ensure_ascii=False,
                                        default=str))
    except Exception:  # pragma: no cover — never break the solve
        pass
