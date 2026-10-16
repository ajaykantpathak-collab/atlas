"""guided_compute.py — Mechanisms 1 & 2: On-Demand Compute and Student Answer Checking.

Mechanism 1 (On-Demand Compute / Solution Reveal):
    Computes final numerical scalar, symbolic expression, and unscrubbed
    derivation steps for questions on GUIDED_PRACTICE via isolated sandbox
    calculation (PAL/SymPy) so students can self-check their work.

Mechanism 2 (Interactive "Check My Answer" / Self-Testing):
    Verifies student submissions against solved reference answers:
      - MCQ option letters (A-D)
      - Numerical scalar values (with 1.5% relative / 1e-4 absolute tolerance)
      - Symbolic algebraic expressions (via sandboxed SymPy simplification)
      - Subjective derivations (delegates to Mechanism 3 rubric grader)
"""

from __future__ import annotations

import logging
import re
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

log = logging.getLogger(__name__)

QB_PATH = Path(r"D:\platform\runtime_data\question_bank.db")
if not QB_PATH.exists():
    alt = Path(r"D:\platform\cbse_data\question_bank.db")
    if alt.exists():
        QB_PATH = alt

_NUM_RE = re.compile(r"[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?")
_MCQ_OPT_RE = re.compile(r"^\(?([A-Da-d])\)?(?:\s*[\.\:\-\)]|\s*$)")
_MCQ_WORD_RE = re.compile(r"\b(?:option|choice|ans(?:wer)?)\s*[:\-\)]?\s*\(?([A-Da-d])\)?\b", re.I)


def extract_numeric(text: str) -> Optional[float]:
    """Extract the first valid numeric float from a string."""
    if not text:
        return None
    cleaned = str(text).replace(",", "").strip()
    m = _NUM_RE.search(cleaned)
    if m:
        try:
            return float(m.group(0))
        except (ValueError, OverflowError):
            return None
    return None


def extract_mcq_letter(text: str) -> Optional[str]:
    """Extract an MCQ option letter (A-D) from student submission or answer string."""
    if not text:
        return None
    s = str(text).strip()
    m = _MCQ_OPT_RE.match(s)
    if m:
        return m.group(1).upper()
    m = _MCQ_WORD_RE.search(s)
    if m:
        return m.group(1).upper()
    # Check "(A)" or "(b)" pattern anywhere in string
    m2 = re.search(r"\(([A-Da-d])\)", s)
    if m2:
        return m2.group(1).upper()
    return None


def lookup_official_answer(question_text: str) -> Optional[Dict[str, Any]]:
    """Check question_bank.db official_answers table for an authored answer."""
    if not QB_PATH.exists() or len(question_text.strip()) < 8:
        return None
    lead = question_text.strip()[:60]
    try:
        with sqlite3.connect(str(QB_PATH)) as con:
            cur = con.cursor()
            cur.execute(
                """
                SELECT oa.letter, oa.answer_text, oa.marks
                FROM questions q
                JOIN official_answers oa ON oa.doc_id = q.doc_id AND oa.qno = q.qno
                WHERE q.text LIKE ?
                LIMIT 1
                """,
                (f"{lead}%",),
            )
            row = cur.fetchone()
            if row:
                return {
                    "letter": row[0].strip().upper() if row[0] else None,
                    "answer_text": row[1].strip() if row[1] else None,
                    "marks": row[2] or 1,
                }
    except Exception as exc:
        log.debug("lookup_official_answer degraded: %s", type(exc).__name__)
    return None


def compute_solution(
    question: str, context: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Mechanism 1: On-Demand Compute / Solution Reveal.

    Computes the final answer, scalar numeric value, and unscrubbed steps
    without withholding them.
    """
    from backend.its.solver.answer_pipeline import _answer_impl

    # 1. Run the solver engine implementation
    raw = None
    try:
        raw = _answer_impl(question, context=context)
    except Exception as exc:
        log.debug("compute_solution _answer_impl degraded: %s", type(exc).__name__)

    ans = getattr(raw, "answer", None)
    num = getattr(raw, "numeric", None)
    steps = list(getattr(raw, "steps", []) or [])

    # If numeric is not parsed yet, try extracting from answer string
    # WS-FIX: ONLY extract from short answer strings (e.g. <= 12 words / 80 chars),
    # NEVER from full-length conceptual teaching nodes where arbitrary example numbers appear!
    if num is None and ans and len(str(ans).split()) <= 12 and len(str(ans)) <= 80:
        num = extract_numeric(str(ans))

    # 2. Check official answers bank if answer/num is still missing
    official = lookup_official_answer(question)
    if official:
        if not ans and official.get("answer_text"):
            ans = official["answer_text"]
        if official.get("letter") and not extract_mcq_letter(str(ans or "")):
            ans = f"({official['letter']}) {ans or ''}".strip()
        if num is None and official.get("answer_text"):
            num = extract_numeric(official["answer_text"])

    # 3. If still missing numeric calculation on a calculation ask, run PAL SymPy sandbox
    if num is None and re.search(
        r"calculate|compute|find|determine|evaluate|solve|what\s+(?:is|are|will|would)|how\s+(?:much|many|far|fast|long)|total\s+(?:amount|issue|proceeds|capital|cost|value|number|resistance|current|voltage|work)",
        question,
        re.I,
    ):
        try:
            from backend.its.solver.pal_executor import pal_compute

            pal = pal_compute(question)
            if pal and (pal.get("numeric") is not None or pal.get("answer_text")):
                if pal.get("numeric") is not None:
                    num = pal["numeric"]
                if pal.get("answer_text"):
                    # If prior ans was a long text node, replace ans with the calculation answer
                    if not ans or len(str(ans).split()) > 15:
                        ans = pal["answer_text"]
                if pal.get("steps"):
                    steps = list(pal["steps"])
        except Exception as exc:
            log.debug("compute_solution pal_compute degraded: %s", type(exc).__name__)

    return {
        "ok": True,
        "verdict": "computed",
        "answer": str(ans) if ans is not None else None,
        "numeric": num,
        "steps": steps,
        "method": getattr(raw, "method", None),
        "source": getattr(raw, "stage", "solver_pipeline"),
    }


def _check_symbolic_equivalence(
    student_expr: str, ref_expr: str
) -> bool:
    """Verify algebraic/symbolic equivalence using the sandboxed worker."""
    from backend.its.solver.pal_executor import run_program

    clean_s = student_expr.replace("^", "**").strip()
    clean_r = ref_expr.replace("^", "**").strip()

    code = f"""
import sympy as sp
try:
    e1 = sp.sympify({clean_s!r})
    e2 = sp.sympify({clean_r!r})
    diff = sp.simplify(e1 - e2)
    answer = bool(diff == 0)
except Exception:
    answer = False
"""
    res = run_program(code, timeout_s=4.0)
    if res and res.get("answer_text") == "True":
        return True
    return False


async def check_student_answer(
    question: str,
    student_submission: str,
    context: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Mechanism 2: Interactive "Check My Answer" / Self-Testing verification.

    Validates student submission against solved reference:
      - MCQ option letter
      - Scalar numeric with tolerance
      - Symbolic math expression
      - Subjective prose (delegates to Mechanism 3)
    """
    if not student_submission or not student_submission.strip():
        return {
            "ok": False,
            "verdict": "mismatch",
            "hint": "Please enter an answer to check.",
            "earned_marks": 0.0,
        }

    s_sub = student_submission.strip()

    # Case 1: Subjective prose (> 15 words or long sentence)
    words = s_sub.split()
    if len(words) > 15:
        from backend.services.subjective_grader import grade_subjective_answer

        subj_res = await grade_subjective_answer(
            question_text=question,
            student_answer=s_sub,
            context=context,
        )
        return {
            "ok": subj_res.get("verdict") == "match",
            "verdict": subj_res.get("verdict", "graded"),
            "hint": subj_res.get("feedback", ""),
            "earned_marks": subj_res.get("earned"),
            "max_marks": subj_res.get("of"),
            "criteria_met": subj_res.get("criteria_met", []),
            "criteria_missed": subj_res.get("criteria_missed", []),
        }

    # Obtain computed reference answer
    ref = compute_solution(question, context=context)
    ref_ans = ref.get("answer") or ""
    ref_num = ref.get("numeric")
    ref_steps = ref.get("steps") or []

    # extracted once up-front: the ambiguity probe consults them in
    # every decisive branch (incl. the MCQ branch, which returns before
    # the numeric path's old assignment site)
    s_letter = extract_mcq_letter(s_sub)
    s_num = extract_numeric(s_sub)

    # AMBIGUITY CROSS-CHECK (wave98 hardening): when a second family
    # confidently parses the same stem into a DIFFERENT expected answer,
    # a bare match/mismatch verdict is dishonest — the student's number
    # may be right under the other reading.  The probe re-reads the
    # sweep alternates the solve already produced (memo-warm: zero
    # added latency), and the decisive verdicts below consult it.
    _rival_key = None
    try:
        from backend.its.solver.modeling_layer import model_problem
        from backend.its.solver.tiered_response import (
            expected_answer_key as _eak,
            family_ambiguity as _fam_amb)
        _mdl = model_problem(question)
        _r = _fam_amb(_mdl)
        if _r is not None:
            _rival_key = _eak(_r)
    except Exception as exc:
        log.debug("solve_check ambiguity probe degraded: %s",
                  type(exc).__name__)
        _rival_key = None

    def _submission_matches_key(key) -> bool:
        """Student submission consistent with a reading's expected
        answer?  Numeric tolerance identical to the primary check;
        text keys match on normalized equality or an MCQ letter."""
        if key is None:
            return False
        kind, val = key[0], key[1]   # ("num", v, unit) | ("txt", s, "")
        if kind == "num":
            if s_num is None:
                return False
            denom = max(abs(float(val)), 1e-300)
            return (abs(s_num - float(val)) / denom <= 0.02
                    or (abs(float(val)) > 1e-4
                        and abs(s_num - float(val)) <= 1e-4))
        txt = str(val)
        if s_letter:
            rl = extract_mcq_letter(txt)
            if rl and rl == s_letter:
                return True
        return " ".join(s_sub.lower().split()) == txt

    _AMB_NOTE = (" Note: this question also supports a second valid "
                 "reading with a different expected value — check which "
                 "quantities (and units) it is really about.")

    def _ambiguity_verdict():
        """Honest ambiguity signal: a confident rival family reading with
        a DIFFERENT expected answer turns the verdict into 'ambiguous'
        when the submission fits that rival reading — a bare 'mismatch'
        would be a confident-wrong verdict on a correct answer.  A
        primary-reading match still stands (the answer IS right under
        the served reading) but its hint carries _AMB_NOTE.  Never
        reveals either number (same leak rule as mismatch)."""
        if _rival_key is not None and _submission_matches_key(_rival_key):
            return {
                "ok": True,
                "verdict": "ambiguous",
                "hint": ("This question can be read two different ways, "
                         "and each reading expects a different answer — "
                         "your answer fits one of them. Check which "
                         "quantities the question is really about."),
                "earned_marks": None,
                "max_marks": 1.0,
            }
        return None

    def _match_hint(base: str) -> str:
        return base + (_AMB_NOTE if _rival_key is not None else "")

    # Case 2: MCQ option check
    r_letter = extract_mcq_letter(ref_ans)
    if not r_letter:
        official = lookup_official_answer(question)
        if official and official.get("letter"):
            r_letter = official["letter"]

    if s_letter and r_letter:
        _amb = _ambiguity_verdict()
        if _amb is not None:
            return _amb
        if s_letter.upper() == r_letter.upper():
            return {
                "ok": True,
                "verdict": "match",
                "hint": _match_hint(
                    f"Correct! Option ({s_letter.upper()}) is the right "
                    "answer."),
                "earned_marks": 1.0,
                "max_marks": 1.0,
            }
        else:
            return {
                "ok": False,
                "verdict": "mismatch",
                "hint": "Not quite. Re-check the conceptual relation and options given.",
                "earned_marks": 0.0,
                "max_marks": 1.0,
            }

    # Case 3: Numerical scalar check
    if s_num is not None and ref_num is not None:
        denom = max(abs(ref_num), 1e-300)
        rel_diff = abs(s_num - ref_num) / denom
        is_close = (rel_diff <= 0.02) or (abs(ref_num) > 1e-4 and abs(s_num - ref_num) <= 1e-4)
        _amb = _ambiguity_verdict()
        if _amb is not None:
            return _amb
        if is_close:
            return {
                "ok": True,
                "verdict": "match",
                "hint": _match_hint(
                    "That checks out! Your calculated value is "
                    "consistent with the givens."),
                "earned_marks": 1.0,
                "max_marks": 1.0,
            }
        else:
            recheck_hint = "Not quite — re-check your substitution and arithmetic."
            if ref_steps:
                # Give a hint about the formula or first step — but never
                # leak the reference answer inside it: blank its digit
                # runs out of the quoted step (same ____ rule as the
                # tier scrub; stated givens stay readable).
                _step = str(ref_steps[0])[:120]
                _banned = set()
                if ref_num is not None:
                    _banned |= {"%g" % ref_num, str(ref_num)}
                for _m in re.finditer(r"\d+(?:[.,]\d+)*", str(ref_ans)):
                    _banned.add(_m.group(0))
                for _tok in sorted(_banned, key=len, reverse=True):
                    if _tok:
                        _step = _step.replace(_tok, "____")
                recheck_hint = f"Not quite — re-check this step: {_step}"
            return {
                "ok": False,
                "verdict": "mismatch",
                "hint": recheck_hint,
                "earned_marks": 0.0,
                "max_marks": 1.0,
            }


    # Case 4: Symbolic algebraic check
    if any(ch in s_sub for ch in "+-*/^=()") and ref_ans:
        try:
            if _check_symbolic_equivalence(s_sub, ref_ans):
                _amb = _ambiguity_verdict()
                if _amb is not None:
                    return _amb
                return {
                    "ok": True,
                    "verdict": "match",
                    "hint": _match_hint(
                        "Correct! Your algebraic expression is "
                        "equivalent to the standard form."),
                    "earned_marks": 1.0,
                    "max_marks": 1.0,
                }
        except Exception:
            pass

    # Fallback to independent_verifier check_route if modeled
    try:
        from backend.its.solver.modeling_layer import model_problem
        from backend.its.solver.independent_verifier import check_route

        model = model_problem(question)
        if model and getattr(model, "matched", False) and str(getattr(model, "structure", "") or "") not in ("", "UNRECOGNIZED", "NONE"):
            class _Claim:
                def __init__(self, q, ans):
                    self.quantities = dict(q or {})
                    self.numeric_answer = s_num
                    self.final_answer = s_sub

            verdict, _ = check_route(str(model.structure), question, _Claim(model.quantities, s_sub))
            _amb = _ambiguity_verdict()
            if _amb is not None:
                return _amb
            if verdict == "pass":
                return {
                    "ok": True,
                    "verdict": "match",
                    "hint": _match_hint(
                        "That checks out — your answer is consistent "
                        "with the givens."),
                    "earned_marks": 1.0,
                    "max_marks": 1.0,
                }
            elif verdict == "fail":
                return {
                    "ok": False,
                    "verdict": "mismatch",
                    "hint": "Not quite — re-check your governing equation and substitution.",
                    "earned_marks": 0.0,
                    "max_marks": 1.0,
                }
    except Exception as exc:
        log.debug("check_route fallback degraded: %s", type(exc).__name__)

    return {
        "ok": True,
        "verdict": "unknown",
        "hint": "We couldn't verify this answer automatically — review the steps and verify your method.",
        "earned_marks": None,
        "max_marks": 1.0,
    }
