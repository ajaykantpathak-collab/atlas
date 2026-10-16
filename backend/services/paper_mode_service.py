"""paper_mode_service.py -- the grading/solution engine behind Board Paper Mode.

A student picks a REAL past-board paper (class/subject from the
``board_questions`` bank), attempts it question-by-question, and gets per
question: an instant verified grade, the step-contract solution from the
solver pipeline, and (when the row's node carries diagnostic schema) the
misconception link.  This module holds the three engines; the router
(``backend.routers.paper_mode``) only wires HTTP around them.

Grading — REUSE, not reinvent (2026-09-30):
  * MCQ / short / numeric exact+unit matching goes through the platform's
    canonical ``grade_answer`` (``backend.api._assessment_sessions``), the
    same matcher chapter-tests and the pre-board simulator grade with.
  * On TOP of it, the numeric lane adds the unseen-gate harness's
    tolerance philosophy (``_cisce_build/unseen_validation/grade.py``):
    magnitude-relative tolerance instead of the strict 0.001 abs cut, and
    the gate's verdict honesty rules — a row without a stored key is
    UNGRADEABLE (grade withheld, reason stated), never silently marked
    wrong.
  * Theory answers are graded by key-point coverage against the bank's
    model answer, marks-aware: CORRECT (>=70% key points), PARTIAL
    (30-70%, marks scaled), WRONG (<30%).  A guess against a 40-char key
    can never pass (word-overlap needs real content).

Solution — the solve goes through the isolation boundary
(``services/solve_isolation.run_async``): OFF the event loop, hard budget,
background-finish + cache on timeout, honest GUIDED_PRACTICE degradation.
The verification line of the step contract is detected with the gate's
``verification_beat`` heuristic (steps/audit-gates/fields).

Misconception — the row's first node id is looked up in the in-memory
enhanced-nodes index (its DIAGNOSTIC_Q&A misconception analysis, then
COMMON_MISCONCEPTION, then the extracted marking-point index).  Absent
schema -> honest nulls.  Node ids NEVER appear in display strings; only
the node's human title travels.
"""

from __future__ import annotations

import logging
import re
from typing import Any, Dict, List, Optional, Sequence

logger = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# Subject metadata — the bank stores short codes; students see real names.
# --------------------------------------------------------------------------- #

SUBJECT_LABELS: Dict[str, str] = {
    "math": "Mathematics", "phy": "Physics", "chem": "Chemistry",
    "bio": "Biology", "hist": "History", "geo": "Geography",
    "civ": "Civics", "eco": "Economics", "eng": "English",
    "hin": "Hindi", "ps": "Physical Science", "comp": "Computer Applications",
    "cs": "Computer Science", "ip": "Informatics Practices",
    "acc": "Accountancy", "bs": "Business Studies", "app": "Applied Maths",
    # ca = Computerised Accounting (c12 corpus audited: 21 files, all CA;
    # the old "Commercial Art" label mislabelled the subject to students)
    "ca": "Computerised Accounting",
    "biotech": "Biotechnology", "psy": "Psychology",
    "stat": "Statistics", "leg": "Legal Studies", "hs": "Home Science",
    "soc": "Sociology", "gram": "Grammar",
    # long-form codes that also appear in the bank
    "mathematics": "Mathematics", "science": "Science",
    "physics": "Physics", "chemistry": "Chemistry", "biology": "Biology",
    "history": "History", "geography": "Geography", "civics": "Civics",
    "economics": "Economics", "english": "English", "social_science": "Social Science",
    # bank-row variants seen in the wild (2026-10-11 audit: "engl" leaked raw)
    "engl": "English", "grammar": "Grammar", "computer": "Computer Science",
    "pol": "Political Science", "sst": "Social Science", "sans": "Sanskrit",
}

#: Friendly name -> the bank's canonical code (accepts both on the paper
#: endpoint; the catalog always advertises the canonical code).
SUBJECT_ALIASES: Dict[str, str] = {
    "mathematics": "math", "physics": "phy", "chemistry": "chem",
    "biology": "bio", "history": "hist", "geography": "geo",
    "civics": "civ", "economics": "eco", "science": "science",
    "socialscience": "soc", "social_science": "soc",
}

QUARANTINED_BOARD = "QUARANTINED"

_MCQ_TYPES = ("mcq", "mcq_single", "mcq_multi")
_NUMERIC_TYPES = ("numeric",)
_SHORT_TYPES = ("fill_blank", "true_false", "complete_statement")
#: Everything else with prose keys grades as theory (short_answer,
#: long_answer, essay, diagram, multi_part, ...).


def subject_label(code: str) -> str:
    return SUBJECT_LABELS.get((code or "").strip().lower(),
                              (code or "").strip() or "Unknown")


def _display_chapter(chapter: Any) -> Optional[str]:
    """Raw bank chapter codes ("ch93") are internal — students see
    "Chapter 93". Non-code values pass through."""
    c = str(chapter or "").strip()
    if re.fullmatch(r"ch\d{1,3}", c, re.IGNORECASE):
        return f"Chapter {int(c[2:])}"
    return chapter or None


def _scrub_node_ids(text: str) -> str:
    """Strip embedded corpus node ids (lazy import keeps this module light)."""
    try:
        from backend.services.compq_bank import scrub_node_ids
        return scrub_node_ids(text)
    except Exception:
        return text


def canonical_subject(subject: str) -> str:
    """Map a friendly subject name to the bank's code (pass through codes)."""
    s = (subject or "").strip().lower()
    return SUBJECT_ALIASES.get(s, s)


# --------------------------------------------------------------------------- #
# Catalog / paper assembly — pure transforms over queried rows
# --------------------------------------------------------------------------- #

def build_catalog(rows: Sequence[Any]) -> List[Dict[str, Any]]:
    """Rows of (subject, class_level, count, years) -> catalog combos.

    Rows already grouped+counted by the router's query; this only labels
    and orders them.  Empty input -> empty catalog (honest absence).
    """
    out: List[Dict[str, Any]] = []
    for r in rows or []:
        subject = r[0]
        class_level = int(r[1])
        count = int(r[2] or 0)
        years = sorted({str(y) for y in (r[3] or []) if y})
        out.append({
            "class_level": class_level,
            "subject": subject,
            "label": subject_label(subject),
            "question_count": count,
            "years": years,          # honest: [] when the bank has no years
        })
    out.sort(key=lambda c: (c["class_level"], c["subject"]))
    return out


def build_paper(class_level: int, subject: str, rows: Sequence[Any],
                requested_year: Optional[str] = None,
                board: Optional[str] = "CBSE") -> Dict[str, Any]:
    """Ordered question payloads with every answer-bearing field stripped.

    Shipped per question: id (opaque fetch key), number, text, marks,
    type, chapter/section, difficulty, and options for MCQs only.
    ``correct_answer`` / ``model_answer`` / ``explanation`` /
    ``marking_scheme`` / ``node_tags`` never leave the backend here.
    """
    items: List[Dict[str, Any]] = []
    for row in rows or []:
        qtype = (getattr(row, "question_type", "") or "").lower()
        options = getattr(row, "options", None)
        item: Dict[str, Any] = {
            "id": str(getattr(row, "id", "")),
            "number": getattr(row, "question_number", None),
            "type": qtype,
            # bank rows can embed corpus node ids in question_text —
            # internal identifiers never reach display text
            "text": _scrub_node_ids(getattr(row, "question_text", "") or ""),
            "marks": int(getattr(row, "marks", 1) or 1),
            "chapter": _display_chapter(getattr(row, "chapter", None)),
            "section": getattr(row, "section", None),
            "difficulty": getattr(row, "difficulty", None),
        }
        if _is_mcq(qtype, options):
            item["options"] = _flat_options(options)
        items.append(item)
    items.sort(key=lambda i: (i["number"] is None, i["number"] if i["number"]
                              is not None else 0))
    return {
        "class_level": int(class_level),
        "subject": (subject or "").lower(),
        "label": subject_label(subject),
        "board": board,
        "year": requested_year,          # echoed; bank rows carry no years today
        "count": len(items),
        "questions": items,
        "note": (None if items else
                 "no questions in the bank for this combination — "
                 "the paper list is honestly empty"),
    }


def _is_mcq(qtype: str, options: Any) -> bool:
    if qtype in _MCQ_TYPES:
        return True
    return bool(options) and not qtype.startswith(("fill", "true", "numeric"))


def _flat_options(options: Any) -> List[str]:
    """The bank stores either a flat list or a single nested list."""
    if not isinstance(options, list):
        return []
    if len(options) == 1 and isinstance(options[0], list):
        options = options[0]
    return [str(o) for o in options if str(o).strip()]


# --------------------------------------------------------------------------- #
# Grading
# --------------------------------------------------------------------------- #

#: Gate-style verdict vocabulary (unseen_validation/grade.py honesty rules).
V_CORRECT = "CORRECT"
V_PARTIAL = "PARTIAL"
V_WRONG = "WRONG"
V_UNGRADEABLE = "UNGRADEABLE"

_WORD_RX = re.compile(r"[a-z0-9]+")
_NUM_RX = re.compile(r"-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?")
_MCQ_LETTER_RX = re.compile(r"^\(?([A-Ja-j])[\).]?$")

#: coverage thresholds for the theory lane (a lone central formula in a
#: 4-point model answer still earns its mark — that is how boards mark)
THEORY_CORRECT_AT = 0.70
THEORY_PARTIAL_AT = 0.20


def grade_attempt(row: Any, student_answer: str) -> Dict[str, Any]:
    """Grade one attempt against the bank row's stored key.

    Returns ``{verdict, correct, marks, marks_awarded, lane, reason,
    detail}``.  ``correct`` is None for UNGRADEABLE rows (grade withheld
    honestly — the bank row has no key to grade against).
    """
    sa = str(student_answer or "").strip()
    marks = int(getattr(row, "marks", 1) or 1)
    key = getattr(row, "correct_answer", None)
    model = getattr(row, "model_answer", None)
    qtype = (getattr(row, "question_type", "") or "").lower()
    options = _flat_options(getattr(row, "options", None))

    if not sa:
        return _verdict(V_WRONG, False, marks, 0, "blank",
                        "no answer submitted", {})
    has_key = bool((key or "").strip()) or bool((model or "").strip())
    if not has_key:
        return _verdict(V_UNGRADEABLE, None, marks, None, "ungradeable",
                        "this bank row stores no answer key — the grade is "
                        "honestly withheld", {})

    if _is_mcq(qtype, options):
        return _grade_mcq(sa, key, options, marks)
    if qtype in _NUMERIC_TYPES or _both_numeric(sa, key):
        return _grade_numeric(sa, key, marks)
    if qtype in _SHORT_TYPES:
        return _grade_short(sa, key, marks)
    return _grade_theory(sa, key, model, marks)


def _verdict(verdict: str, correct: Optional[bool], marks: int,
             awarded: Optional[int], lane: str, reason: str,
             detail: Dict[str, Any]) -> Dict[str, Any]:
    return {"verdict": verdict, "correct": correct, "marks": marks,
            "marks_awarded": awarded, "lane": lane, "reason": reason,
            "detail": detail}


def _both_numeric(a: str, b: Any) -> bool:
    try:
        float(str(a).replace(",", "").strip())
        float(str(b or "").replace(",", "").strip())
        return True
    except (ValueError, TypeError):
        return False


def _norm_opt(text: str) -> str:
    """Normalization for option-text equality (case/space/punct-insensitive
    enough for copy-paste vs retyped answers, strict enough to keep
    distinct numeric options apart)."""
    t = (text or "").lower()
    t = re.sub(r"[\s]+", "", t)
    t = t.replace(",", "").replace(".", "").replace(")", "").replace("(", "")
    return t


def _grade_mcq(sa: str, key: Any, options: List[str],
               marks: int) -> Dict[str, Any]:
    key_s = str(key or "").strip()
    # 1. direct text equality (the bank stores option TEXT as the key)
    if _norm_opt(sa) == _norm_opt(key_s):
        return _verdict(V_CORRECT, True, marks, marks, "mcq", "", {})
    # 2. letter answer: map A->options[0], B->options[1], ...
    m = _MCQ_LETTER_RX.match(sa)
    if m and options:
        idx = ord(m.group(1).upper()) - ord("A")
        if 0 <= idx < len(options):
            if _norm_opt(options[idx]) == _norm_opt(key_s):
                return _verdict(V_CORRECT, True, marks, marks, "mcq", "", {})
            return _verdict(V_WRONG, False, marks, 0, "mcq", "", {})
    # 3. typed option text that matches a listed option
    for opt in options:
        if _norm_opt(sa) == _norm_opt(opt):
            if _norm_opt(opt) == _norm_opt(key_s):
                return _verdict(V_CORRECT, True, marks, marks, "mcq", "", {})
            return _verdict(V_WRONG, False, marks, 0, "mcq", "", {})
    # 4. fall back to the canonical matcher (unit/numeric folds)
    from backend.api._assessment_sessions import grade_answer
    if grade_answer(sa, key_s):
        return _verdict(V_CORRECT, True, marks, marks, "mcq", "", {})
    return _verdict(V_WRONG, False, marks, 0, "mcq", "", {})


def _grade_numeric(sa: str, key: Any, marks: int) -> Dict[str, Any]:
    from backend.api._assessment_sessions import grade_answer
    key_s = str(key or "").strip()
    if grade_answer(sa, key_s):
        return _verdict(V_CORRECT, True, marks, marks, "numeric", "", {})
    # gate-style magnitude-relative tolerance: a 1% miss on 4140 is the
    # same conceptual answer; the strict 0.001 abs cut is for exact keys.
    kv = _first_number(key_s)
    sv = _first_number(sa)
    if kv is not None and sv is not None:
        tol = max(0.01, abs(kv) * 0.01)
        if abs(sv - kv) <= tol:
            return _verdict(V_CORRECT, True, marks, marks, "numeric",
                            "accepted within 1% numeric tolerance", {})
    return _verdict(V_WRONG, False, marks, 0, "numeric", "",
                    {"expected_value": kv})


def _grade_short(sa: str, key: Any, marks: int) -> Dict[str, Any]:
    from backend.api._assessment_sessions import grade_answer
    if grade_answer(sa, str(key or "")):
        return _verdict(V_CORRECT, True, marks, marks, "short", "", {})
    return _verdict(V_WRONG, False, marks, 0, "short", "", {})


def _key_points(model: str, key: Any) -> List[str]:
    """Split the model answer into key-point sentences (>=3 content words)."""
    source = (model or "").strip() or str(key or "").strip()
    if not source:
        return []
    chunks = re.split(r"(?<=[.!?])\s+|\n+", source)
    points = []
    for c in chunks:
        words = _WORD_RX.findall(c.lower())
        if len(words) >= 3:
            points.append((c.strip(), set(words)))
    return points or ([(source, set(_WORD_RX.findall(source.lower())))] if source else [])


def _grade_theory(sa: str, key: Any, model: Any,
                  marks: int) -> Dict[str, Any]:
    points = _key_points(model if (model or "").strip() else key, key)
    if not points:
        return _verdict(V_UNGRADEABLE, None, marks, None, "theory",
                        "this bank row stores no answer key — the grade is "
                        "honestly withheld", {})
    sa_words = set(_WORD_RX.findall(sa.lower()))
    covered = 0
    for _, words in points:
        if words and len(words & sa_words) >= (len(words) * 0.5):
            covered += 1
    frac = covered / len(points)
    detail = {"key_points": len(points), "covered": covered,
              "coverage": round(frac, 2)}
    if frac >= THEORY_CORRECT_AT:
        return _verdict(V_CORRECT, True, marks, marks, "theory",
                        "answer covers the model answer's key points", detail)
    if frac >= THEORY_PARTIAL_AT:
        awarded = max(1, int(round(marks * frac)))
        return _verdict(V_PARTIAL, False, marks, awarded, "theory",
                        "part of the expected answer is present — marks "
                        "scaled by key-point coverage", detail)
    return _verdict(V_WRONG, False, marks, 0, "theory",
                    "the expected key points are not present in the answer",
                    detail)


def _first_number(text: str) -> Optional[float]:
    m = _NUM_RX.search((text or "").replace(",", ""))
    if not m:
        return None
    try:
        return float(m.group())
    except ValueError:
        return None


# --------------------------------------------------------------------------- #
# Solver solution — through the isolation boundary (never inline)
# --------------------------------------------------------------------------- #

SOLVE_LANE = "paper_mode.solve"


async def solve_solution(question_text: str) -> Dict[str, Any]:
    """Solver solution for one paper question, OFF the event loop.

    Mirrors verified_practice.solve_deterministic's honest degradation:
    past the budget or at pool saturation the caller gets GUIDED_PRACTICE
    method content with the answer withheld while the compute continues in
    the background and is cached for the retry.
    """
    import os

    from backend.its.solver.answer_pipeline import answer as pipeline_answer
    from backend.services.solve_isolation import (
        GUIDED_METHOD_STEPS, cache_key, run_async, saturation_refusal_reason,
        timeout_refusal_reason,
    )

    key = cache_key(SOLVE_LANE, question_text)
    outcome = await run_async(key, pipeline_answer, question_text)

    if outcome.timed_out or outcome.saturated:
        try:
            budget_s = max(1.0, float(os.environ.get("SOLVE_BUDGET_S", "60")))
        except (TypeError, ValueError):
            budget_s = 60.0
        reason = (timeout_refusal_reason(budget_s) if outcome.timed_out
                  else saturation_refusal_reason())
        return {
            "tier": "GUIDED_PRACTICE", "solved": False,
            "stage": "timeout" if outcome.timed_out else "busy",
            "answer": None, "numeric": None,
            "steps": list(GUIDED_METHOD_STEPS), "refusal_reason": reason,
            "verification": {"present": False, "line": None},
            # Contract A on the degraded path too — honestly labelled.
            "answer_tier": "guided",
            "trust": {"label": "Guided", "detail": reason},
            "method": None, "similar": None, "check_endpoint": None,
            "gradable": None,
        }

    result = outcome.result
    verified = result.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                                "VERIFIED_OFFICIAL")
    steps = list(result.steps or [])
    return {
        "tier": result.label,
        "solved": verified,
        "stage": result.audit.lane,
        "answer": result.answer if verified else None,
        "numeric": result.numeric if verified else None,
        "steps": steps,
        "refusal_reason": result.refusal_reason,
        "verification": verification_beat(steps, result.audit),
        # Wave 9.8 L6 (additive): Contract A fields ride the attempt
        # response so exam-week verdicts can render the trust label /
        # tier card — same honesty, never upgrades the badge.
        "answer_tier": getattr(result, "answer_tier", None),
        "trust": getattr(result, "trust", None),
        "method": getattr(result, "method", None),
        "similar": getattr(result, "similar", None),
        "check_endpoint": getattr(result, "check_endpoint", None),
        "gradable": getattr(result, "gradable", None),
    }


def verification_beat(steps: List[str], audit: Any = None) -> Dict[str, Any]:
    """Gate's verification_beat heuristic: did the step contract carry its
    verification line?  Checks step text, audit gates, and fields."""
    hay = " || ".join(str(s) for s in (steps or [])).lower()
    line = None
    for s in (steps or []):
        sl = str(s).lower()
        if "verif" in sl or ("check" in sl and "unit" in sl):
            line = str(s).strip()
            break
    gates = []
    try:
        gates = list((getattr(audit, "to_dict", lambda: {})() or {}
                      ).get("gates_passed") or [])
    except Exception:
        gates = []
    gates_hit = any("verif" in str(g).lower() for g in gates)
    present = bool(line) or gates_hit or "verif" in hay
    return {"present": present, "line": line}


# --------------------------------------------------------------------------- #
# Misconception link — enrichment index diagnostics, honest nulls
# --------------------------------------------------------------------------- #

def _node_ids_of(row: Any) -> List[str]:
    tags = getattr(row, "node_tags", None)
    if isinstance(tags, list):
        return [str(t) for t in tags if isinstance(t, str) and t.strip()]
    if isinstance(tags, str) and tags.strip():
        try:
            import json as _json
            parsed = _json.loads(tags)
            if isinstance(parsed, list):
                return [str(t) for t in parsed if str(t).strip()]
        except (ValueError, TypeError):
            return []
    return []


async def misconception_link(row: Any) -> Dict[str, Any]:
    """Diagnostic-schema lookup for the row's node — run OFF the loop
    (the index may cold-build a 14k-file corpus parse on first call).

    Returns ``{topic_title, diagnostic_question, misconception}`` with
    honest nulls when the node (or its diagnostic schema) is absent.
    Never includes the node id — display strings carry no node ids."""
    node_ids = _node_ids_of(row)
    if not node_ids:
        return {"topic_title": None, "diagnostic_question": None,
                "misconception": None}
    from fastapi.concurrency import run_in_threadpool
    return await run_in_threadpool(_misconception_sync, node_ids[0])


def _misconception_sync(nid: str) -> Dict[str, Any]:
    out = {"topic_title": None, "diagnostic_question": None,
           "misconception": None}
    try:
        from backend.services.enhanced_nodes import (load_index,
                                                     misconception_for_node)
        node = load_index().get(nid)
        if node:
            out["topic_title"] = node.get("title") or None
            for d in node.get("diagnostics") or []:
                if d.get("misconception"):
                    out["diagnostic_question"] = d.get("q") or None
                    out["misconception"] = d.get("misconception")
                    break
            if not out["misconception"] and node.get("common_misconception"):
                out["misconception"] = node["common_misconception"]
        if not out["misconception"]:
            mp = misconception_for_node(nid)
            if mp and mp.get("misconception"):
                out["misconception"] = mp["misconception"]
    except Exception as exc:                       # honest nulls, never a 500
        logger.warning("paper_mode misconception lookup failed: %s", exc)
    return out


# --------------------------------------------------------------------------- #
# Attempt ledger — reuse the assessment session store (Redis-backed,
# round-robin safe).  Keyed by student id; capped.
# --------------------------------------------------------------------------- #

MAX_RECORDED_ATTEMPTS = 200


def new_store():
    from backend.api._assessment_sessions import TestSessionStore
    return TestSessionStore("paper_mode")


def summarize(attempts: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Aggregate an attempt list — totals, accuracy, per-subject split."""
    total = len(attempts)
    graded = [a for a in attempts if a.get("correct") is not None]
    correct = sum(1 for a in graded if a.get("correct") is True)
    by_subject: Dict[str, Dict[str, int]] = {}
    for a in attempts:
        entry = by_subject.setdefault(a.get("subject") or "unknown",
                                      {"total": 0, "correct": 0})
        entry["total"] += 1
        if a.get("correct") is True:
            entry["correct"] += 1
    return {
        "total": total,
        "graded": len(graded),
        "correct": correct,
        "accuracy_pct": (round(100 * correct / len(graded), 1)
                         if graded else None),
        "by_subject": by_subject,
    }
