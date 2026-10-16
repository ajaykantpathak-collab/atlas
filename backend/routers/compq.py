# -*- coding: utf-8 -*-
"""compq router — serve the CBQ (competency-based question) bank.

Endpoints (mounted additively in main.py; everything read-only):

  GET  /api/compq/node/{node_id}
       Every CBQ touching the node: _comp seed sub-parts (question-side only —
       the authored Guideline / traps / variants are WITHHELD here) plus the
       node-embedded competency questions, plus the node's worked examples.

  POST /api/compq/attempt         {compq_id, sub_part_id, student_answer}
       Grade one authored sub-part.
       - numeric  : deterministic gate-matching against the authored
                    Verify+Answer numbers (unit-aware, 2% tolerance); an
                    optional solver cross-check runs through the solve-isolation
                    boundary (services/solve_isolation) — never inline.
       - theory   : self-assessed against the authored 5-step Guideline
                    (rubric-style guidance; no fake autograde).
       On a miss the response carries the authored Guideline, the named
       misconception Traps, and — when the node has diagnostics — the closest
       diagnostic's misconception carve.

  GET  /api/compq/variants/{compq_id}
       The authored Variants V1-V5 of that sub-part as fresh practice
       instances (base question + the authored mutation text; numeric
       mutations are served as authored parameter substitutions).

Node ids travel only as opaque fetch keys — every *display* string in the
served payloads was scrubbed at bank-build time (services/compq_bank.scrub_node_ids).
"""
from __future__ import annotations

import logging
import re
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from backend.services.compq_bank import (
    CompqBank,
    get_bank,
    grade_numeric_attempt,
    method_payload,
    numeric_variants,
    match_gates,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/compq", tags=["compq"])

_NODE_ID_RE = re.compile(r"^[A-Za-z0-9_]{1,80}$")
_COMPQ_ID_RE = re.compile(r"^cq_[0-9a-f]{16}$")


class AttemptRequest(BaseModel):
    compq_id: str = Field(..., min_length=1, max_length=64)
    sub_part_id: Optional[str] = Field(None, min_length=1, max_length=4)
    student_answer: str = Field(..., min_length=1, max_length=8000)
    check_with_solver: bool = False


# --------------------------------------------------------------------------- #
# Solver cross-check — through the isolation boundary, never inline
# --------------------------------------------------------------------------- #

def _solver_numeric_sync(question_text: str) -> Dict[str, Any]:
    """Runs on the dedicated solve pool (services.solve_isolation)."""
    from backend.services.solver_gateway import answer  # lazy: heavy import

    result = answer(question_text)
    return {"label": result.label, "numeric": result.numeric,
            "answer": result.answer, "refusal": result.refusal_reason}


async def _solver_crosscheck(compq_id: str, row: Dict[str, Any],
                             student_answer: str) -> Dict[str, Any]:
    """Optional second opinion: pipeline numeric vs the authored gates."""
    from backend.services import solve_isolation

    qtext = (row.get("q") or "")[:1500]
    outcome = await solve_isolation.run_async(
        f"compq:{compq_id}", _solver_numeric_sync, qtext, budget_s=45)
    if outcome.timed_out:
        return {"solver": "budget_exceeded",
                "note": "solver moved to background practice; gate grade stands"}
    if outcome.saturated:
        return {"solver": "busy", "note": "gate grade stands"}
    res = outcome.result or {}
    label = res.get("label")
    numeric = res.get("numeric")
    verdict: Optional[str] = None
    if numeric is not None:
        gates = row.get("answer_gates") or []
        hit = any(any(abs(numeric - t) <= max(0.011, 0.02 * max(abs(numeric), abs(t)))
                      for t in numeric_variants(g["value"], g["unit"]))
                  for g in gates)
        verdict = "solver_agrees" if hit else "solver_disagrees"
    return {"solver": label or "no_result", "solver_numeric": numeric,
            "solver_verdict": verdict}


# --------------------------------------------------------------------------- #
# GET /node/{node_id}
# --------------------------------------------------------------------------- #

@router.get("/node/{node_id}")
async def node_cbqs(node_id: str, include_worked_examples: bool = True) -> Any:
    if not _NODE_ID_RE.match(node_id):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="bad node id")
    bank: CompqBank = get_bank().ensure()
    sub_parts = bank.by_node.get(node_id) or []
    embedded = bank.embedded_for(node_id)
    bundle = bank.get_bundle(node_id) or {}
    if not sub_parts and not embedded and not bundle:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="no CBQ content for this node")
    payload: Dict[str, Any] = {
        "node": node_id,
        "board": (sub_parts or embedded or [bundle])[0].get("board"),
        "subject": ((sub_parts or embedded or [bundle])[0].get("subject_label")),
        "counts": {
            "cbq_sub_parts": len(sub_parts),
            "embedded_cqs": len(embedded),
            "worked_examples": len(bundle.get("worked_examples") or []),
            "diagnostics": len(bundle.get("diagnostics") or []),
        },
        "cbqs": [bank.question_payload(r) for r in sub_parts],
        "embedded_cqs": [bank.embedded_question_payload(r) for r in embedded],
    }
    if include_worked_examples:
        payload["worked_examples"] = bundle.get("worked_examples") or []
        # diagnostics: question side only — answers/misconceptions come back
        # on an attempt miss (match_diagnostic), never in the listing.
        payload["diagnostics"] = [{"index": d.get("index"), "q": d.get("q")}
                                  for d in (bundle.get("diagnostics") or [])]
    return payload


# --------------------------------------------------------------------------- #
# POST /attempt
# --------------------------------------------------------------------------- #

def _rubric_guidance(row: Dict[str, Any]) -> List[str]:
    """Theory self-assessment rubric: authored steps as criteria."""
    labels = {
        "1": "Identified the right concept and recalled the rule",
        "2": "Set the problem up correctly (data -> relationships)",
        "3": "Executed the reasoning/derivation without gaps",
        "4": "Reached the authored conclusion (verify your answer against it)",
        "5": "Generalised to the variant case",
    }
    rubric = []
    for s in row.get("guideline_steps") or []:
        crit = labels.get(s.get("step"), s.get("label"))
        rubric.append(f"Step {s.get('step')} ({s.get('label')}): {crit}")
    return rubric


def grade_attempt(row: Dict[str, Any], student_answer: str,
                  check_with_solver: bool) -> Dict[str, Any]:
    """Pure grading logic (no I/O) — the unit-tested core of POST /attempt."""
    kind = row.get("kind") or "theory"
    if kind == "numeric":
        grade = grade_numeric_attempt(row, student_answer)
    else:
        grade = {"verdict": "self_assessed", "graded_by": "authored_guideline",
                 "reason": "theory-guided sub-part: compare your reasoning "
                           "with the authored 5-step guideline below"}
    resp: Dict[str, Any] = {
        "compq_id": row["compq_id"],
        "sub_part_id": row.get("sub_part_id"),
        "kind": kind,
        "verdict": grade.get("verdict"),
        "graded_by": grade.get("graded_by"),
    }
    if kind == "numeric":
        resp["gates_matched"] = grade.get("matched")
        resp["gates_total"] = grade.get("total")
    miss = resp["verdict"] in ("incorrect", "partial")
    resp["method"] = method_payload(row, include_answer_step=True)
    if resp["verdict"] == "correct" or kind != "numeric":
        resp["shortcut"] = row.get("shortcut")
    if miss or kind != "numeric":
        resp["traps"] = row.get("traps") or []
    if kind == "theory":
        resp["rubric"] = _rubric_guidance(row)
    return resp


@router.post("/attempt")
async def attempt(req: AttemptRequest) -> Any:
    if not _COMPQ_ID_RE.match(req.compq_id):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="bad compq id")
    bank: CompqBank = get_bank().ensure()
    row = bank.by_id.get(req.compq_id)
    if row is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="unknown compq id")
    if req.sub_part_id and req.sub_part_id != row.get("sub_part_id"):
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="compq id does not match this sub-part")

    resp = grade_attempt(row, req.student_answer, req.check_with_solver)

    # scope add: on a miss, surface the node's matching diagnostic misconception
    if resp["verdict"] in ("incorrect", "partial"):
        diag = bank.match_diagnostic(row.get("parent_node") or "", row.get("q") or "")
        if diag:
            resp["diagnostic"] = diag

    # optional solver second opinion (numeric misses or explicit ask)
    if row.get("kind") == "numeric" and req.check_with_solver:
        try:
            resp["crosscheck"] = await _solver_crosscheck(req.compq_id, row,
                                                          req.student_answer)
        except Exception as exc:                      # honest degradation
            logger.warning("compq attempt: solver crosscheck failed: %s", exc)
            resp["crosscheck"] = {"solver": "unavailable"}
    return resp


# --------------------------------------------------------------------------- #
# GET /variants/{compq_id}
# --------------------------------------------------------------------------- #

def variants_payload(row: Dict[str, Any]) -> Dict[str, Any]:
    """Authored variants as fresh practice instances. Numeric mutations are
    served as authored parameter substitutions: base question + the authored
    mutation text (the authoring already states the substitution, e.g.
    'Dev gets 15% share')."""
    instances = []
    for v in row.get("variants") or []:
        instances.append({
            "variant": v.get("variant"),
            "base_question": row.get("q"),
            "mutation": v.get("text"),
            "practice_prompt": (
                f"{row.get('q') or ''} "
                f"[Variation {v.get('variant')}: {v.get('text')} — rework the "
                "same case with this change]"
            ).strip(),
            "time_sec": row.get("time_sec"),
            "kind": row.get("kind"),
        })
    return {
        "compq_id": row["compq_id"],
        "seed_title": row.get("seed_title"),
        "scenario": row.get("scenario"),
        "subject": row.get("subject_label"),
        "sub_part_id": row.get("sub_part_id"),
        "instances": instances,
        "note": "variants are authored parameter mutations of this sub-part; "
                "attempt them and grade via POST /api/compq/attempt",
    }


@router.get("/variants/{compq_id}")
async def variants(compq_id: str) -> Any:
    if not _COMPQ_ID_RE.match(compq_id):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="bad compq id")
    bank: CompqBank = get_bank().ensure()
    row = bank.by_id.get(compq_id)
    if row is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="unknown compq id")
    return variants_payload(row)
