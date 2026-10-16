"""subjective_grader.py — Mechanism 3: Rubric Grader Integration for Subjective Derivations.

Evaluates student free-text answers and multi-step derivations against
official CBSE/ISC marking rubrics using LLMGrader (with Ollama local LLM
and deterministic keyword fallback) and RubricGenerator.
"""

from __future__ import annotations

import asyncio
import logging
import os
import re
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional

from backend.services.llm_grader import LLMGrader, LLMGradeResult
from backend.services.rubric_generator import Rubric, RubricCriterion, RubricGenerator

log = logging.getLogger(__name__)

QB_PATH = Path(r"D:\platform\runtime_data\question_bank.db")
if not QB_PATH.exists():
    alt = Path(r"D:\platform\cbse_data\question_bank.db")
    if alt.exists():
        QB_PATH = alt


def _resolve_marking_steps_qb(question_text: str) -> Optional[Dict[str, Any]]:
    """Look up authored marking_steps in question_bank.db."""
    if not QB_PATH.exists() or len(question_text.strip()) < 8:
        return None
    lead = question_text.strip()[:60]
    try:
        with sqlite3.connect(str(QB_PATH)) as con:
            cur = con.cursor()
            cur.execute(
                """
                SELECT q.id, q.doc_id, q.qno, q.marks
                FROM questions q
                WHERE q.text LIKE ?
                LIMIT 1
                """,
                (f"{lead}%",),
            )
            row = cur.fetchone()
            if not row:
                return None
            qid, doc_id, qno, marks = row
            # Marking steps may be linked directly or on companion doc (doc_id - 1)
            cur.execute(
                """
                SELECT step_no, text
                FROM marking_steps
                WHERE (doc_id = ? OR doc_id = ?) AND qno = ?
                ORDER BY doc_id DESC, step_no
                """,
                (doc_id, doc_id - 1, qno),
            )
            steps = cur.fetchall()
            if steps:
                pts = [s[1].strip() for s in steps if s[1] and len(s[1].strip()) > 3]
                if pts:
                    return {
                        "source": "marking_steps_qb",
                        "points": pts,
                        "marks": marks or len(pts),
                        "model_answer": "\n".join(pts),
                    }
    except Exception as exc:
        log.debug("resolve_marking_steps_qb degraded: %s", type(exc).__name__)
    return None


async def resolve_rubric(
    question_text: str,
    max_marks: Optional[int] = None,
    context: Optional[Dict[str, Any]] = None,
) -> Rubric:
    """Resolve or generate a rubric for a given question.

    Priority:
    1. Authored marking_steps from question_bank.db
    2. Marking data resolved via marking_scheme_grader (board_questions)
    3. Derived from curriculum model answer / steps via RubricGenerator
    """
    marks_val = max_marks or 3

    # 1. Check SQLite question_bank.db marking_steps
    qb_data = _resolve_marking_steps_qb(question_text)
    if qb_data and qb_data.get("points"):
        pts = qb_data["points"]
        return RubricGenerator.generate_from_marking_steps(
            pts, max_marks=qb_data.get("marks") or marks_val
        )

    # 2. Check marking_scheme_grader.resolve_marking
    try:
        from backend.services.marking_scheme_grader import resolve_marking

        ctx = context or {}
        resolved = await asyncio.to_thread(
            resolve_marking,
            question_text,
            board=ctx.get("board"),
            class_level=ctx.get("class_level") or ctx.get("class"),
            subject=ctx.get("subject"),
        )
        if resolved and resolved.get("points"):
            pts = resolved["points"]
            return RubricGenerator.generate_from_marking_steps(
                pts, max_marks=resolved.get("marks") or marks_val
            )
    except Exception as exc:
        log.debug("resolve_rubric resolve_marking degraded: %s", type(exc).__name__)

    # 3. Derive from solver curriculum answer / model answer
    try:
        from backend.its.solver.answer_pipeline import _answer_impl

        res = await asyncio.to_thread(_answer_impl, question_text, context=context)
        model_text = ""
        if res.answer and len(str(res.answer)) > 30:
            model_text = str(res.answer)
        elif res.steps:
            model_text = "\n".join(str(s) for s in res.steps)

        if model_text:
            return RubricGenerator.generate_from_model_answer(
                model_text, max_marks=marks_val
            )
    except Exception as exc:
        log.debug("resolve_rubric answer_impl degraded: %s", type(exc).__name__)

    # Default fallback rubric
    return Rubric(
        criteria=[
            RubricCriterion(
                id="c1",
                description="Complete correct explanation addressing all parts of the question",
                marks=marks_val,
            )
        ],
        max_marks=marks_val,
        source="default_fallback",
    )


async def grade_subjective_answer(
    question_text: str,
    student_answer: str,
    max_marks: Optional[int] = None,
    context: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Grade a subjective student response or derivation against rubric criteria.

    Returns:
        Dict with earned, of, criteria_met, criteria_missed, feedback, verdict.
    """
    if not student_answer or not student_answer.strip():
        return {
            "ok": False,
            "verdict": "mismatch",
            "earned": 0,
            "of": max_marks or 3,
            "criteria_met": [],
            "criteria_missed": ["c1"],
            "feedback": "No answer provided.",
            "source": "empty",
        }

    rubric = await resolve_rubric(question_text, max_marks=max_marks, context=context)
    total_marks = rubric.max_marks or max_marks or 3

    model_answer = " ".join(c.description for c in rubric.criteria)

    # Evaluate using LLMGrader (local Ollama with robust keyword fallback)
    grade_res: LLMGradeResult = await LLMGrader.grade(
        student_answer=student_answer,
        model_answer=model_answer,
        rubric=rubric,
        max_marks=total_marks,
    )

    # Compute verdict
    verdict = "graded"
    if grade_res.marks_awarded >= total_marks:
        verdict = "match"
    elif grade_res.marks_awarded == 0:
        verdict = "mismatch"

    return {
        "ok": True,
        "verdict": verdict,
        "earned": grade_res.marks_awarded,
        "of": total_marks,
        "criteria_met": grade_res.criteria_met,
        "criteria_missed": grade_res.criteria_missed,
        "feedback": grade_res.feedback,
        "grammar": grade_res.grammar,
        "model": grade_res.model,
        "source": rubric.source,
    }
