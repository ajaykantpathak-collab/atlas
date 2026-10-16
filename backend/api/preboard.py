"""Pre-Board Simulator — full CBSE-pattern papers assembled ONLY from the
real board_questions bank (147k+ node-derived questions).

Contract
--------
  GET  /api/preboard/papers?class_level=10|12
       → the paper catalog: CBSE-pattern blueprints for classes 10/12 major
         subjects with honest availability (bank depth per blueprint).
  POST /api/preboard/{subject}/start?class_level=
       → assembles a paper: sections with per-question marks (the marking
         scheme), internal-choice pairs ("answer either") where the bank
         supports them, objective/short/long/application mix, timer.
         Answer keys are withheld.
  POST /api/preboard/{session_id}/submit
       {answers: [{questionId, answer, timeTakenSeconds}]}
       → grades: exact/numeric-tolerant answer matching, choice pairs score
         the better attempted leg, section-wise totals, chapter breakdown,
         CBSE pass mark (33%), full review with the real model answers.
  GET  /api/preboard/{session_id}/result
       → the stored report (reload-safe).

Honesty rules: no invented content — every question/answer/model answer is
verbatim from the bank.  Sections whose format the bank cannot support
(e.g. true case-study passages, map questions, essays) are not faked: the
blueprint's last section becomes an application/long-answer section built
from worked problems, and a thin bank shrinks the paper with an explicit
shortfall note instead of padding.
"""

from __future__ import annotations

import logging
import re
import secrets
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select as sa_select, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.enrichment import BoardQuestion
from backend.models.user import User
from backend.api._assessment_sessions import TestSessionStore, grade_answer
from backend.services.feedback_scrub import (
    scrub_answer_key, scrub_explanation)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/preboard", tags=["preboard"])

_store = TestSessionStore("preboard")

_PASS_PCT = 33.0

# ── Subject codes (board_questions.subject) per catalog key ─────────────
_CODES: Dict[str, List[str]] = {
    "mathematics": ["math"],
    "science": ["phy", "chem", "bio"],
    "social_science": ["hist", "geo", "civ", "eco"],
    "physics": ["phy"], "chemistry": ["chem"], "biology": ["bio"],
}
_LABELS: Dict[str, str] = {
    "mathematics": "Mathematics", "science": "Science",
    "social_science": "Social Science",
    "physics": "Physics", "chemistry": "Chemistry", "biology": "Biology",
}


class _Section:
    def __init__(self, sid: str, title: str, note: str, count: int,
                 marks: int, kinds: List[str], choices: int = 0):
        self.sid, self.title, self.note = sid, title, note
        self.count, self.marks, self.kinds, self.choices = \
            count, marks, kinds, choices


def _s(sid, title, note, count, marks, kinds, choices=0) -> _Section:
    return _Section(sid, title, note, count, marks, kinds, choices)


# ── CBSE-pattern blueprints (class 10/12 major subjects) ─────────────────
# Sections carry the official marks distribution and duration; question
# formats follow what the bank honestly contains (objective = the bank's
# true_false / fill_blank / mcq / one-liner items, application = the bank's
# worked problems — the bank holds no case-study passages, so that format
# is never claimed).
_BLUEPRINTS: Dict[tuple, Dict[str, Any]] = {
    ("mathematics", 10): {
        "duration_minutes": 180, "total_marks": 80,
        "sections": [
            _s("A", "Section A — Objective & Very Short Answer",
               "All questions compulsory. 1 mark each. True/False items carry answer chips; the bank holds no MCQs for class 10 yet, so the rest are typed one-mark questions.", 20, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=4),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 5, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 6, 3,
               ["short_answer", "fill_blank"], choices=2),
            _s("D", "Section D — Long Answer", "5 marks each. Internal choice where offered.", 4, 5,
               ["long_answer", "worked_example", "seed"], choices=2),
            _s("E", "Section E — Application", "4 marks each. Source-based/application questions.", 3, 4,
               ["worked_example", "long_answer"], choices=1),
        ],
    },
    ("science", 10): {
        "duration_minutes": 180, "total_marks": 80,
        "sections": [
            _s("A", "Section A — Objective & Very Short Answer",
               "All questions compulsory. 1 mark each. True/False items carry answer chips; the bank holds no MCQs for class 10 yet, so the rest are typed one-mark questions.", 20, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=4),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 6, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 7, 3,
               ["short_answer", "fill_blank"], choices=2),
            _s("D", "Section D — Long Answer", "5 marks each. Internal choice where offered.", 3, 5,
               ["long_answer", "worked_example", "seed"], choices=1),
            _s("E", "Section E — Application", "4 marks each. Application questions.", 3, 4,
               ["worked_example", "long_answer"], choices=1),
        ],
    },
    ("social_science", 10): {
        "duration_minutes": 180, "total_marks": 80,
        "sections": [
            _s("A", "Section A — Objective & Very Short Answer",
               "All questions compulsory. 1 mark each. True/False items carry answer chips; the bank holds no MCQs for class 10 yet, so the rest are typed one-mark questions.", 20, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=4),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 5, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 6, 3,
               ["short_answer", "fill_blank"], choices=2),
            _s("D", "Section D — Long Answer", "5 marks each. Internal choice where offered.", 4, 5,
               ["long_answer", "worked_example", "seed"], choices=2),
            _s("E", "Section E — Application", "4 marks each. Application questions.", 3, 4,
               ["worked_example", "long_answer"], choices=1),
        ],
    },
    ("mathematics", 12): {
        "duration_minutes": 180, "total_marks": 80,
        "sections": [
            _s("A", "Section A — Objective", "All questions compulsory. 1 mark each.", 20, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=4),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 5, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 6, 3,
               ["short_answer", "fill_blank"], choices=2),
            _s("D", "Section D — Long Answer", "5 marks each. Internal choice where offered.", 4, 5,
               ["long_answer", "worked_example", "seed"], choices=2),
            _s("E", "Section E — Application", "4 marks each. Application questions.", 3, 4,
               ["worked_example", "long_answer"], choices=1),
        ],
    },
    ("physics", 12): {
        "duration_minutes": 180, "total_marks": 70,
        "sections": [
            _s("A", "Section A — Objective", "All questions compulsory. 1 mark each.", 16, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=3),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 5, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 7, 3,
               ["short_answer", "fill_blank"], choices=2),
            _s("D", "Section D — Application", "4 marks each. Application questions.", 2, 4,
               ["worked_example", "long_answer"], choices=1),
            _s("E", "Section E — Long Answer", "5 marks each. Internal choice where offered.", 3, 5,
               ["long_answer", "worked_example", "seed"], choices=1),
        ],
    },
    ("chemistry", 12): {
        "duration_minutes": 180, "total_marks": 70,
        "sections": [
            _s("A", "Section A — Objective", "All questions compulsory. 1 mark each.", 18, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=4),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 7, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 5, 3,
               ["short_answer", "fill_blank"], choices=1),
            _s("D", "Section D — Application", "4 marks each. Application questions.", 2, 4,
               ["worked_example", "long_answer"], choices=1),
            _s("E", "Section E — Long Answer", "5 marks each. Internal choice where offered.", 3, 5,
               ["long_answer", "worked_example", "seed"], choices=1),
        ],
    },
    ("biology", 12): {
        "duration_minutes": 180, "total_marks": 70,
        "sections": [
            _s("A", "Section A — Objective", "All questions compulsory. 1 mark each.", 16, 1,
               ["true_false", "mcq_single", "fill_blank", "short_answer"], choices=3),
            _s("B", "Section B — Very Short Answer", "2 marks each. Internal choice where offered.", 5, 2,
               ["short_answer", "fill_blank"], choices=2),
            _s("C", "Section C — Short Answer", "3 marks each. Internal choice where offered.", 7, 3,
               ["short_answer", "fill_blank"], choices=2),
            _s("D", "Section D — Application", "4 marks each. Application questions.", 2, 4,
               ["worked_example", "long_answer"], choices=1),
            _s("E", "Section E — Long Answer", "5 marks each. Internal choice where offered.", 3, 5,
               ["long_answer", "worked_example", "seed"], choices=1),
        ],
    },
}


def _norm_text(t: Any) -> str:
    return " ".join(str(t or "").split()).lower()


# ── Honest-content guards (C10 audit fixes) ──────────────────────────────
# (1) Propositional-logic items are NOT in any CBSE core syllabus these
#     papers rehearse (the C10 math paper carried ~15 marks of them, e.g.
#     "Construct the truth table for 'p OR NOT p'"). The bank rows are
#     purged; this net keeps a re-seed from ever reaching a paper again.
#     Markers are deliberately high-precision: bare "contradiction" is
#     legit class-10 math (proof by contradiction) and "connective" is
#     legit biology (connective tissue), so neither is matched alone.
_LOGIC_TEXT_RE = re.compile(
    r"(propositional|\bis a proposition\b|proposition\?|tautology"
    r"|truth table|truth value|biconditional|logical connective"
    r"|the symbol\s*['\"’]?[∧∨→↔~]"
    r"|given\s+p\s*=\s*(true|false)"
    r"|\bif\s+p\s*=\s*(true|false)"
    r"|\bp\s*(?:and|or|implies|→|↔)\s*(?:not\s+)?q\b)",
    re.IGNORECASE)

# An MCQ whose ENTIRE option set is logic operators is a logic question
# however its stem is phrased ("candidate A wins if ... OR ...": the
# answer chips are OR/NOT/IF-THEN/AND).
_LOGIC_OPTION_SET = {
    "and", "or", "not", "if-then", "if and only if", "biconditional",
    "implies", "tautology", "contradiction", "contingency",
}


def _is_logic_item(row: BoardQuestion) -> bool:
    txt = str(row.question_text or "")
    if _LOGIC_TEXT_RE.search(txt):
        return True
    opts = row.options if isinstance(row.options, list) else []
    stripped = [re.sub(r"^[A-Da-d][\)\.:]\s*", "", str(o or "")).strip().lower()
                for o in opts]
    stripped = [o for o in stripped if o]
    if len(stripped) >= 2 and all(o in _LOGIC_OPTION_SET for o in stripped):
        return True
    return any(_LOGIC_TEXT_RE.search(str(o or "")) for o in opts)


# (2) Rows whose question TEXT embeds an option block ("A) …/B) …") that
#     does not match the row's own `options` array are unanswerable as
#     rendered (the C10 math paper's Q21-24 served one option set in the
#     text and a DIFFERENT set as chips, with a duplicated chip). Such
#     rows are refused rather than served broken.
_OPT_LINE_RE = re.compile(r"^\s*([A-Da-d])[\)\.\:]\s+(\S.*)$")


def _embedded_options(text: str) -> List[str]:
    out: List[str] = []
    for line in str(text or "").splitlines():
        m = _OPT_LINE_RE.match(line)
        if m:
            out.append(m.group(2).strip())
    return out


def _has_broken_options(row: BoardQuestion) -> bool:
    opts = row.options if isinstance(row.options, list) else []
    opts = [str(o or "").strip() for o in opts if str(o or "").strip()]
    embedded = _embedded_options(row.question_text or "")
    if len(embedded) >= 2 and opts:
        # both present — they must describe the SAME option block
        if len(embedded) != len(opts):
            return True
        norm = lambda s: " ".join(s.lower().split())
        strip_prefix = lambda s: re.sub(r"^[A-Da-d][\)\.\:]\s*", "", s)
        emb = {norm(strip_prefix(e)) for e in embedded}
        ser = {norm(strip_prefix(o)) for o in opts}
        return emb != ser
    bare = [re.sub(r"^[A-Da-d][\)\.\:]\s*", "", o).strip().lower() for o in opts]
    if len(bare) - len(set(bare)) > 0:
        # duplicate options inside the served array (Q24's double chip)
        return True
    return False


# (3) True/False rows ARE objective questions — the bank stores them with
#     no options array but an exact "True"/"False" key, so they are served
#     with the two chips the question's own type declares (nothing is
#     invented: text and key are verbatim from the bank).
_TF_TRUE = {"true", "t", "yes"}
_TF_FALSE = {"false", "f", "no"}


def _tf_options(row: BoardQuestion) -> Optional[List[str]]:
    if (row.question_type or "").lower() != "true_false":
        return None
    key = str(row.correct_answer or "").strip().lower()
    if key in _TF_TRUE:
        return ["True", "False"]
    if key in _TF_FALSE:
        return ["True", "False"]
    return None


def _q_kind(row: BoardQuestion) -> str:
    st = (row.source_type or "").lower()
    qt = (row.question_type or "").lower()
    if st == "worked_example":
        return "worked_example"
    return qt


def _section_pool(all_rows: List[BoardQuestion], sec: _Section,
                  used: set) -> List[BoardQuestion]:
    """Rows for a section: preferred question kinds first, then anything
    else the bank has — never repeating a text across the paper.

    Honest-content guards: propositional-logic rows (out of syllabus for
    every subject these papers rehearse) and rows whose embedded option
    text contradicts their own options array (unanswerable as rendered)
    never enter a paper.
    """
    out: List[BoardQuestion] = []
    seen: set = set()

    def sweep(match) -> None:
        for r in all_rows:
            if r.id in used:
                continue
            tkey = _norm_text(r.question_text)
            if tkey in seen:
                continue
            if not str(r.correct_answer or "").strip():
                continue
            if _is_logic_item(r) or _has_broken_options(r):
                continue
            if match(_q_kind(r)):
                out.append(r)
                seen.add(tkey)

    for kind in sec.kinds:
        sweep(lambda k, _kind=kind: k == _kind)
    sweep(lambda k: k not in sec.kinds)
    return out


def _take(pool: List[BoardQuestion], n: int, used: set,
          kind_order: Optional[List[str]] = None) -> List[BoardQuestion]:
    """Take n rows spread across chapters (round-robin by chapter).

    Within a chapter, the section's kind priority wins (Section A asks for
    true_false/fill/short BEFORE long_answer — the old source_type sort
    let alphabetical-'competency' 5-mark long_answers fill Section A and
    starve it of the objective items the blueprint asks for first)."""
    ranks = {k: i for i, k in enumerate(kind_order or [])}

    def _priority(r: BoardQuestion) -> tuple:
        return (ranks.get(_q_kind(r), len(ranks)),
                str(r.source_type or ""))

    by_chap: Dict[str, List[BoardQuestion]] = {}
    for r in pool:
        if r.id in used:
            continue
        by_chap.setdefault(str(r.chapter or ""), []).append(r)
    for lst in by_chap.values():
        lst.sort(key=_priority)
    out: List[BoardQuestion] = []
    chap_cycle = sorted(by_chap.keys())
    i = 0
    while len(out) < n and chap_cycle and any(by_chap[c] for c in chap_cycle):
        c = chap_cycle[i % len(chap_cycle)]
        if by_chap[c]:
            out.append(by_chap[c].pop(0))
        i += 1
        if i > 10 * max(n, 1) * max(len(chap_cycle), 1):
            break
    return out


@router.get("/papers")
async def paper_catalog(
    class_level: int = Query(..., ge=9, le=12),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    catalog = []
    blueprints = [(subject, cls, bp) for (subject, cls), bp in _BLUEPRINTS.items()
                  if cls == class_level]
    # ONE grouped COUNT instead of one full-pool COUNT per subject: each
    # per-subject count scanned the 233k-row board_questions table, so the
    # catalog took >40s in production (2026-09). Grouped once, the pool is
    # scanned a single time.
    all_codes = sorted({code for subject, _cls, bp in blueprints
                        for code in _CODES[subject]})
    counts: dict = {}
    if all_codes:
        try:
            rows = (await db.execute(
                sa_select(BoardQuestion.subject,
                          sa_func.count())
                .select_from(BoardQuestion)
                .where(BoardQuestion.subject.in_(all_codes))
                .where(BoardQuestion.class_level == class_level)
                .where(BoardQuestion.correct_answer.isnot(None))
                .where(BoardQuestion.correct_answer != "")
                .group_by(BoardQuestion.subject)
            )).all()
            counts = {subject: int(n) for subject, n in rows}
        except Exception:
            counts = {}
    for subject, cls, bp in blueprints:
        codes = _CODES[subject]
        need = sum(s.count for s in bp["sections"])
        total = sum(counts.get(code, 0) for code in codes)
        sections = [{
            "sectionId": s.sid, "title": s.title, "note": s.note,
            "questions": s.count, "marksEach": s.marks,
            "marks": s.count * s.marks,
        } for s in bp["sections"]]
        catalog.append({
            "subject": subject,
            "label": _LABELS[subject],
            "classLevel": cls,
            "board": "CBSE",
            "durationMinutes": bp["duration_minutes"],
            "totalMarks": sum(s["marks"] for s in sections),
            "sections": sections,
            "questionCount": need,
            "bankQuestions": int(total),
            # honest readiness: a full paper needs roughly 2x for choice
            # pairs and chapter spread; below half need it degrades with
            # an explicit shortfall note.
            "ready": total >= need,
            "depthNote": ("" if total >= need * 2 else
                          "The question bank is thin for this paper — sections "
                          "may carry fewer questions or fewer internal choices."),
        })
    catalog.sort(key=lambda p: p["subject"])
    return {"classLevel": class_level, "papers": catalog}


async def _fetch_rows(db: AsyncSession, codes: List[str], cls: int) -> List[BoardQuestion]:
    q = (sa_select(BoardQuestion)
         .where(BoardQuestion.subject.in_(codes))
         .where(BoardQuestion.class_level == cls)
         .where(BoardQuestion.correct_answer.isnot(None))
         .where(BoardQuestion.correct_answer != "")
         .order_by(sa_func.random())
         .limit(1200))
    try:
        return list((await db.execute(q)).scalars().all())
    except Exception:
        return []


@router.post("/{subject}/start")
async def start_preboard(
    subject: str,
    class_level: int = Query(..., ge=9, le=12),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    key = (subject.lower().replace(" ", "_"), class_level)
    bp = _BLUEPRINTS.get(key)
    if bp is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=(f"No CBSE pre-board blueprint for {subject} class "
                    f"{class_level}. Available papers: use the catalog."))

    codes = _CODES[subject.lower().replace(" ", "_")]
    rows = await _fetch_rows(db, codes, class_level)
    if not rows:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(f"No board questions available for {_LABELS.get(subject, subject)} "
                    f"class {class_level} — the paper cannot be assembled honestly."))

    used: set = set()
    paper_questions: List[dict] = []
    keys: Dict[str, Any] = {}
    sections_out: List[dict] = []
    qn = 0
    shortfalls: List[str] = []

    for sec in bp["sections"]:
        pool = _section_pool(rows, sec, used)
        need_main = sec.count
        mains = _take(pool, need_main, used, sec.kinds)
        for r in mains:
            used.add(r.id)
        served: List[dict] = []
        for r in mains:
            qn += 1
            row_opts = r.options if isinstance(r.options, list) else []
            entry = {
                "questionId": str(r.id), "number": qn,
                "text": r.question_text,
                # True/False rows are real objective questions: the bank
                # stores an exact "True"/"False" key, so they are served
                # with the two chips their own type declares (nothing
                # invented — text and key are verbatim).
                "options": (row_opts if row_opts else
                            (_tf_options(r) or [])),
                "marks": sec.marks,
                "questionType": _q_kind(r),
                "chapter": str(r.chapter or ""),
                "choiceGroup": None, "alternativeOf": None,
                "markingScheme": str(r.marking_scheme or ""),
            }
            served.append(entry)
            keys[str(r.id)] = {
                "correct_answer": r.correct_answer or "",
                "marks": sec.marks, "section": sec.sid,
                "chapter": str(r.chapter or ""),
                "model_answer": r.model_answer or "",
                "explanation": r.explanation or "",
                "question_text": r.question_text,
                "choice_partner": None,
            }
        # internal choice: attach an alternative to up to sec.choices
        # questions (latest ones — CBSE puts choices at section end),
        # strictly from the same section pool and only while it lasts.
        alts_added = 0
        for entry in reversed(served):
            if alts_added >= sec.choices:
                break
            alt_pool = [r for r in pool if r.id not in used
                        and _norm_text(r.question_text) != _norm_text(entry["text"])]
            alt = _take(alt_pool, 1, used, sec.kinds)
            if not alt:
                continue
            ar = alt[0]
            used.add(ar.id)
            alts_added += 1
            qn += 1
            alt_opts = ar.options if isinstance(ar.options, list) else []
            alt_entry = {
                "questionId": str(ar.id), "number": qn,
                "text": ar.question_text,
                "options": (alt_opts if alt_opts else
                            (_tf_options(ar) or [])),
                "marks": sec.marks,
                "questionType": _q_kind(ar),
                "chapter": str(ar.chapter or ""),
                "choiceGroup": f"{sec.sid}-choice-{alts_added}",
                "alternativeOf": entry["questionId"],
                "markingScheme": str(ar.marking_scheme or ""),
            }
            served.append(alt_entry)
            keys[str(ar.id)] = {
                "correct_answer": ar.correct_answer or "",
                "marks": sec.marks, "section": sec.sid,
                "chapter": str(ar.chapter or ""),
                "model_answer": ar.model_answer or "",
                "explanation": ar.explanation or "",
                "question_text": ar.question_text,
                "choice_partner": entry["questionId"],
            }
            keys[entry["questionId"]]["choice_partner"] = str(ar.id)
            entry["choiceGroup"] = alt_entry["choiceGroup"]
            entry["hasAlternative"] = True
        if len(mains) < need_main:
            shortfalls.append(
                f"{sec.title}: served {len(mains)} of {need_main} questions "
                f"(bank is thin for this class/subject).")

        # Honest section labelling (C10 audit): a section may only be
        # titled "Objective" if it actually serves option-bearing items.
        # The class-10 bank holds true/false objective items but no MCQs,
        # so Section A either mixes both honestly or degrades to a
        # one-mark short-answer section with an explicit note — it never
        # silently serves typed questions under an "Objective" banner.
        sec_title, sec_note = sec.title, sec.note
        obj_count = sum(1 for q in served if q["options"])
        if sec.title.startswith("Section A"):
            if obj_count == 0:
                sec_title = "Section A — Very Short Answer"
                sec_note = ("All questions compulsory. 1 mark each — typed "
                            "answers. (The question bank holds no MCQs for "
                            "this subject yet, so no objective section is "
                            "claimed.)")
                shortfalls.append(
                    "Section A: served as one-mark typed questions — the "
                    "bank has no MCQ/assertion-reason items for this "
                    "subject yet.")
            elif obj_count < len(served):
                sec_title = "Section A — Objective & Very Short Answer"
                sec_note = ("All questions compulsory. 1 mark each. "
                            "True/False items carry answer chips; the rest "
                            "are typed one-mark questions (the bank holds "
                            "no MCQs for this subject yet).")
        sections_out.append({
            "sectionId": sec.sid, "title": sec_title, "note": sec_note,
            "marksEach": sec.marks,
            "attemptQuestions": len(mains),
            "questions": served,
            "marks": len(mains) * sec.marks,
        })

    # Honest map-skills disclosure: CBSE awards ~5 marks of map skills in
    # the class-10 Social Science paper. The bank holds no map-skills
    # questions (its only "map" rows are reading passages), so the paper
    # carries none and says so — it never fakes a map question.
    if subject.lower() == "social_science":
        shortfalls.append(
            "Map-skills questions (~5 marks on the CBSE pattern) are not in "
            "the question bank yet — this paper carries no map question "
            "rather than a fake one.")

    total_served = sum(len(s["questions"]) for s in sections_out) or 0
    mains_served = sum(s["attemptQuestions"] for s in sections_out)
    if mains_served < 8:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=("Not enough questions for this paper yet — "
                    f"{mains_served} could be served. The bank is thin for "
                    "this subject/class combination."))

    session = {
        "session_id": secrets.token_urlsafe(12),
        "user_id": str(user.id),
        "subject": subject.lower(),
        "label": _LABELS.get(subject.lower(), subject.title()),
        "classLevel": class_level,
        "board": "CBSE",
        "paperTitle": (f"CBSE Pre-Board — {_LABELS.get(subject, subject.title())} "
                       f"(Class {class_level})"),
        "durationMinutes": bp["duration_minutes"],
        "sections": sections_out,
        "keys": keys,
        "answers": {},
        "startedAt": datetime.now(timezone.utc).isoformat(),
        "completed": False,
        "report": None,
        "shortfalls": shortfalls,
        "totalMarks": sum(s["marks"] for s in sections_out),
    }
    await _store.save(session)

    safe = {k: v for k, v in session.items() if k not in ("keys", "user_id")}
    safe["questionCount"] = total_served
    return safe


class PaperAnswerIn(BaseModel):
    questionId: str
    answer: str = Field(default="")
    timeTakenSeconds: float = Field(default=0, ge=0)


class SubmitPaperIn(BaseModel):
    answers: List[PaperAnswerIn] = Field(default_factory=list)


async def _grade(db: AsyncSession, sess: Dict[str, Any]) -> dict:
    keys = sess["keys"]
    submitted = sess.get("_submit_answers") or []
    answered: Dict[str, str] = {
        str(a.get("questionId")): str(a.get("answer") or "")
        for a in submitted if isinstance(a, dict)}
    # store raw answers on the session for /result replay
    for qid, ans in answered.items():
        if qid in keys:
            sess["answers"][qid] = ans

    # grade every key; choice partners collapse to the better leg
    graded: Dict[str, Dict[str, Any]] = {}
    for qid, key in keys.items():
        correct = grade_answer(answered.get(qid, ""),
                                key.get("correct_answer", ""))
        attempted = qid in answered and str(answered[qid]).strip() != ""
        graded[qid] = {
            "correct": correct and attempted,
            "attempted": attempted,
            "marks": key["marks"] if (correct and attempted) else 0.0,
        }

    # Rubric partial credit: a long answer that isn't exact-match still
    # earns marks per marking point hit — that's how boards actually score.
    # Bounded: only 3+ mark questions, substantive attempts, max 10 calls.
    rubric_budget = 10
    qtext_by_id = {q["questionId"]: q.get("text", "")
                   for s in sess["sections"] for q in s["questions"]}
    for qid, key in keys.items():
        if rubric_budget <= 0:
            break
        g = graded.get(qid, {})
        ans = answered.get(qid, "")
        if (g.get("correct") or not g.get("attempted")
                or key.get("marks", 0) < 3 or len(ans) < 40):
            continue
        rubric_budget -= 1
        try:
            from backend.services.enhanced_nodes import (
                grade_answer as _rubric)
            import asyncio as _aio
            rub = await _aio.to_thread(
                _rubric, qtext_by_id.get(qid, ""), ans)
        except Exception:
            rub = None
        if rub:
            frac = rub.get("estimated_fraction") or 0.0
            partial = round(frac * key["marks"], 1)
            if partial > g.get("marks", 0.0):
                g["marks"] = partial
                g["correct"] = partial >= key["marks"] * 0.99
            g["rubric"] = {
                "points_hit": rub.get("points_hit"),
                "points_total": rub.get("points_total"),
                "misses": [m.get("point") for m in
                           (rub.get("misses") or [])[:4]],
            }

    # collapse choice pairs: better leg scores, the other leg is excluded
    # from the denominator (attempt-one-of-both CBSE convention).
    partner_seen: set = set()
    score = 0.0
    max_score = 0.0
    section_scores: Dict[str, Dict[str, float]] = {}
    chapter_rows: Dict[str, Dict[str, Any]] = {}
    for qid, key in keys.items():
        partner = key.get("choice_partner")
        if partner and partner in partner_seen:
            continue  # the partner leg already counted this pair
        partner_seen.add(qid)
        legs = [graded[qid]]
        if partner:
            legs.append(graded[partner])
        best = max(legs, key=lambda g: g["marks"])
        marks = best["marks"]
        score += marks
        max_score += key["marks"]
        sec = key.get("section", "")
        sb = section_scores.setdefault(sec, {"score": 0.0, "max": 0.0})
        sb["score"] += marks
        sb["max"] += key["marks"]
        chap = key.get("chapter") or "General"
        cb = chapter_rows.setdefault(chap, {"score": 0.0, "max": 0.0})
        cb["score"] += marks
        cb["max"] += key["marks"]

    sections_report = []
    for s in sess["sections"]:
        sb = section_scores.get(s["sectionId"], {"score": 0.0, "max": 0.0})
        sections_report.append({
            "sectionId": s["sectionId"], "title": s["title"],
            "score": round(sb["score"], 1), "max": round(sb["max"], 1),
            "pct": round(sb["score"] / sb["max"] * 100, 1) if sb["max"] else 0.0,
        })
    chapters = [{
        "chapter": c,
        "score": round(v["score"], 1), "max": round(v["max"], 1),
        "pct": round(v["score"] / v["max"] * 100, 1) if v["max"] else 0.0,
    } for c, v in sorted(chapter_rows.items(),
                         key=lambda kv: kv[1]["score"] / max(kv[1]["max"], 1))]
    pct = round(score / max_score * 100, 1) if max_score else 0.0
    grade = ("A+" if pct >= 90 else "A" if pct >= 80 else "B" if pct >= 70
             else "C" if pct >= 60 else "D" if pct >= 50 else
             "E" if pct >= 40 else "F")

    review = []
    for s in sess["sections"]:
        for q in s["questions"]:
            key = keys.get(q["questionId"], {})
            g = graded.get(q["questionId"], {})
            partner = key.get("choice_partner")
            counted = True
            if partner and graded.get(partner, {}).get("marks", 0) > g.get("marks", 0):
                counted = False  # partner leg scored better; this leg not counted
            review.append({
                "questionId": q["questionId"],
                "number": q["number"],
                "section": s["sectionId"],
                "question": q["text"],
                "studentAnswer": answered.get(q["questionId"], ""),
                # bank fields can hold GRADER prose — scrub at serving.
                # model_answer is authored prose: never scrubbed.
                "expectedAnswer": scrub_answer_key(
                    key.get("correct_answer")),
                "modelAnswer": str(key.get("model_answer") or ""),
                "explanation": scrub_explanation(
                    key.get("explanation"), bool(g.get("correct"))),
                "isCorrect": bool(g.get("correct")),
                "attempted": bool(g.get("attempted")),
                "marks": round(g.get("marks", 0.0), 1),
                "maxMarks": key.get("marks", 1),
                "countedForScore": counted,
                "choiceGroup": q.get("choiceGroup"),
                "rubric": g.get("rubric"),
            })

    return {
        "sessionId": sess["session_id"],
        "paperTitle": sess["paperTitle"],
        "subject": sess["label"],
        "classLevel": sess["classLevel"],
        "completedAt": datetime.now(timezone.utc).isoformat(),
        "timeTakenSeconds": round(sum(
            float((a.get("timeTakenSeconds") or 0)) for a in submitted
            if isinstance(a, dict)), 1),
        "totalScore": round(score, 1),
        "maxScore": round(max_score, 1),
        "percentage": pct,
        "grade": grade,
        "passed": pct >= _PASS_PCT,
        "sections": sections_report,
        "chapterBreakdown": chapters,
        "weakChapters": [c for c in chapters if c["pct"] < 60],
        "review": review,
        "shortfalls": sess.get("shortfalls") or [],
    }


@router.post("/{session_id}/submit")
async def submit_preboard(
    session_id: str,
    payload: SubmitPaperIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    sess = await _store.load(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Pre-board session not found.")
    if sess.get("user_id") not in ("", str(user.id)) and user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            detail="Not your pre-board session.")
    if sess.get("completed") and sess.get("report"):
        return sess["report"]
    sess["_submit_answers"] = [a.model_dump() for a in payload.answers]
    sess["report"] = await _grade(db, sess)
    sess["completed"] = True
    sess.pop("_submit_answers", None)
    await _store.save(sess)
    return sess["report"]


@router.get("/{session_id}/result")
async def preboard_result(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    sess = await _store.load(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Pre-board session not found.")
    if sess.get("user_id") not in ("", str(user.id)) and user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            detail="Not your pre-board session.")
    if not sess.get("completed") or not sess.get("report"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Paper not submitted yet.")
    return sess["report"]
