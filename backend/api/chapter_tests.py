"""Chapter Tests — a proper chapter-level assessment flow over the REAL
board_questions bank (147k+ node-derived CBSE questions).

Contract
--------
  GET  /api/chapter-tests/chapters?subject=&class_level=
       → chapter catalog with honest availability (question counts).
  POST /api/chapter-tests/start
       {subject, class_level, chapter, num_questions 15-25, timed_minutes?}
       → a test spanning the chapter's NODES (round-robin across nodes,
         difficulty-balanced, no repeats), answers withheld.
  POST /api/chapter-tests/{session_id}/answer   {question_id, answer, ...}
       → records the raw answer (no feedback — test conditions).
  POST /api/chapter-tests/{session_id}/finish
       → graded report: score, per-node breakdown, Story links for weak
         nodes, honest "not enough questions" never fabricated away.
  GET  /api/chapter-tests/{session_id}/result
       → the stored report (reload-safe).

Zero-wrong: every question, option, answer and explanation comes verbatim
from the board_questions bank; a thin chapter is reported honestly.  Node
ids stay internal — the student sees node TITLES; Story links use the
existing sanctioned /learn/{id}/story route (same as competency tutor).
"""

from __future__ import annotations

import json
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
from backend.models.enrichment import BoardQuestion, EnrichmentContent
from backend.models.user import User
from backend.api._assessment_sessions import TestSessionStore, grade_answer
from backend.services.feedback_scrub import (
    scrub_answer_key, scrub_explanation)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chapter-tests", tags=["chapter-tests"])


def _clean(text: Any) -> Any:
    """Student-visible normalizer (render-fix wave, 2026-10-04).

    Board-question rows and enrichment titles can carry raw LaTeX
    ("$XY = 7\\,\\text{cm}$"), markdown markers ("**Collection of
    Data**"), unrounded floats or NaN — normalize everything that
    reaches a student.  Fails open: a scrub error never breaks a test.
    """
    if not isinstance(text, str) or not text:
        return text
    try:
        from backend.services.display_scrub import normalize_student_text
        return normalize_student_text(text) or text
    except Exception:  # noqa: BLE001
        return text

# ── Subject slugs the UI uses → board_questions subject codes ────────────
# TESTCOV coverage fix: the bank stores ONE subject under SEVERAL codes —
# two ingestion generations spell subjects differently (c6-c9 full names
# "physics"/"chemistry"/"history"/…, c10+ short "phy"/"chem"/"hist") and
# the senior English/Hindi corpora split per NCERT book (eng_f/eng_k/eng_v,
# hin_a/hin_ar/hin_al/hin_v).  The old flat _SUBJECT_CODES map both missed
# codes outright (c6-c9 "physics" = 5,711 orphaned questions; every
# 11-12 commerce/humanities subject 400'd "Unknown subject") and merged
# DIFFERENT subjects that share a chapter number (c9 science "Chapter 1"
# served 182 biology-cell + 170 chemistry-mixture questions as one test).
#
# Model:  subject slug → LANES → alias codes within a lane.
#   * codes inside one lane hold the same content and MERGE, with chapter
#     numbers normalised (a chapter double-ingested as "ch1" and "ch01"
#     becomes one entry that draws on both rows);
#   * different lanes are different sciences/books that both number
#     chapters from 1 — they never merge.  Whenever a subject defines
#     more than one lane, catalog/start chapter keys are scoped as
#     "<lane>:<chapter>" (e.g. "Biology:ch1").
def _lane(*codes: str) -> List[str]:
    """Expand a lane's codes with their same-content aliases."""
    _same = {
        "math": ("math", "mathematics"), "phy": ("phy", "physics"),
        "chem": ("chem", "chemistry"), "bio": ("bio", "biology"),
        "hist": ("hist", "history"), "geo": ("geo", "geography"),
        "civ": ("civ", "civics"), "eco": ("eco", "economics"),
        "engl": ("engl", "english"), "gram": ("gram", "grammar"),
    }
    out: List[str] = []
    for c in codes:
        for variant in _same.get(c, (c,)):
            if variant not in out:
                out.append(variant)
    return out


_ENGLISH_LANES: Dict[str, List[str]] = {
    "": _lane("engl"), "Hornbill": ["eng_h"], "Snapshots": ["eng_s"],
    "Woven Words": ["eng_w"], "Flamingo": ["eng_f"],
    "Kaleidoscope": ["eng_k"], "Vistas": ["eng_v"],
}

_SUBJECT_LANES: Dict[str, Dict[str, List[str]]] = {
    "mathematics": {"": _lane("math")},
    "math": {"": _lane("math")}, "maths": {"": _lane("math")},
    "physics": {"": _lane("phy")},
    "chemistry": {"": _lane("chem")},
    "biology": {"": _lane("bio")},
    "science": {"Physics": _lane("phy"), "Chemistry": _lane("chem"),
                "Biology": _lane("bio")},
    "history": {"": _lane("hist")},
    "geography": {"": _lane("geo")},
    "civics": {"": _lane("civ")},
    "economics": {"": _lane("eco"), "Statistics": ["stat"]},
    "social_science": {"History": _lane("hist"), "Geography": _lane("geo"),
                       "Civics": _lane("civ"), "Economics": _lane("eco")},
    "english": _ENGLISH_LANES, "eng": _ENGLISH_LANES,
    # C10 audit [STUDENT-C10][P2 SUBJECT-CARD-EMPTY]: grammar has real
    # banks in every class 6-12 (74-208 rows) — the UI's slug just wasn't
    # mapped here, so those subjects 400'd instead of chapter-testing.
    "grammar": {"": _lane("gram")}, "gram": {"": _lane("gram")},
    "computer": {"": ["comp"]},
    "computer_science": {"": ["cs"], "Computer": ["comp"]},
    # deep-link aliases the Learn page sends (C7 audit: unmatched keys
    # silently fell back to Mathematics)
    "chem": {"": _lane("chem")}, "bio": {"": _lane("bio")},
    "geo": {"": _lane("geo")}, "eco": {"": _lane("eco")},
    "hist": {"": _lane("hist")}, "cs": {"": ["cs"], "Computer": ["comp"]},
    # senior-stream subjects (the audits' "Unknown subject" list — every
    # one has a real bank at classes 11-12)
    "accountancy": {"": ["acc"], "Computerised Accounting": ["ca"]},
    "accounts": {"": ["acc"], "Computerised Accounting": ["ca"]},
    "business_studies": {"": ["bs"]}, "bs": {"": ["bs"]},
    "political_science": {"": ["ps"]}, "pol_science": {"": ["ps"]},
    "psychology": {"": ["psy"]},
    "sociology": {"": ["soc", "soc_d"]},
    "informatics_practices": {"": ["ip"]}, "ip": {"": ["ip"]},
    "hindi": {"Aroh": ["hin_a", "hin_ar", "hin_al"], "Vitan": ["hin_v"]},
    "biotechnology": {"": ["biotech"]}, "biotech": {"": ["biotech"]},
    "home_science": {"": ["hs"]}, "hefs": {"": ["hs"]},
}

_SUBJECT_LABELS: Dict[str, str] = {
    "mathematics": "Mathematics", "math": "Mathematics",
    "maths": "Mathematics", "science": "Science",
    "social_science": "Social Science",
    "english": "English", "eng": "English",
    "grammar": "Grammar", "gram": "Grammar",
    "computer": "Computer", "computer_science": "Computer Science",
    "cs": "Computer Science",
    "physics": "Physics", "chemistry": "Chemistry", "chem": "Chemistry",
    "biology": "Biology", "bio": "Biology",
    "history": "History", "hist": "History",
    "geography": "Geography", "geo": "Geography",
    "civics": "Civics", "economics": "Economics", "eco": "Economics",
    "accountancy": "Accountancy", "accounts": "Accountancy",
    "business_studies": "Business Studies", "bs": "Business Studies",
    "political_science": "Political Science",
    "pol_science": "Political Science",
    "psychology": "Psychology", "sociology": "Sociology",
    "informatics_practices": "Informatics Practices",
    "ip": "Informatics Practices",
    "hindi": "Hindi",
    "biotechnology": "Biotechnology", "biotech": "Biotechnology",
    "home_science": "Home Science",
    "hefs": "Human Ecology & Family Sciences",
}

MIN_QUESTIONS = 8          # a full-length chapter test
SHORT_MIN_QUESTIONS = 3    # 3-7 questions still earn an honest short test
DEFAULT_QUESTIONS = 20
_PASS_PCT = 33.0           # CBSE pass convention
_WEAK_PCT = 60.0           # below this a node gets a Story link
_SHORT_NOTE = "Short chapter test — more questions coming."

# ── Session persistence (survives nginx round-robin via Redis) ───────────
_store = TestSessionStore("chtest")


async def _save(session: Dict[str, Any]) -> None:
    await _store.save(session)


async def _load(session_id: str) -> Optional[Dict[str, Any]]:
    return await _store.load(session_id)


def _owned(sess: Dict[str, Any], user: User) -> None:
    if sess.get("user_id") not in ("", str(user.id)) and user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            detail="Not your chapter test session.")


# ── Helpers ───────────────────────────────────────────────────────────────

def _norm_text(t: str) -> str:
    return " ".join(str(t or "").split()).lower()


def _node_of(row: BoardQuestion) -> str:
    tags = row.node_tags or []
    return str(tags[0]) if tags else ""


def _num_from_chapter(code: str) -> str:
    m = re.search(r"(\d+)", str(code or ""))
    return m.group(1).lstrip("0") or (m.group(1) if m else str(code or ""))


async def _chapter_num_titles(db: AsyncSession, subjects: List[str],
                              class_level: int) -> Dict[str, str]:
    """Normalised chapter number → display title for one lane
    ("Chapter 3 · <anchor node title>").  Anchor = the chapter's
    lowest-numbered node, mirroring the content router's convention.
    Keyed by NUMBER so a chapter double-ingested as ch1/ch01 resolves to
    one title regardless of which code variant the bank favours."""
    try:
        rows = (await db.execute(
            sa_select(EnrichmentContent.node_id, EnrichmentContent.title,
                      EnrichmentContent.chapter)
            .where(EnrichmentContent.subject.in_(subjects))
            .where(EnrichmentContent.class_level == class_level)
            .where(EnrichmentContent.chapter.isnot(None))
        )).all()
    except Exception:
        return {}
    anchors: Dict[str, tuple[int, str]] = {}
    for node_id, title, chap in rows:
        code = str(chap or "")
        if not code:
            continue
        num = _num_from_chapter(code)
        try:
            seq = int(str(node_id).rsplit("_", 1)[-1])
        except (ValueError, IndexError):
            seq = 9999
        if num not in anchors or seq < anchors[num][0]:
            anchors[num] = (seq, str(title or ""))
    out: Dict[str, str] = {}
    for num, (_seq, title) in anchors.items():
        title = str(_clean(title) or "")
        out[num] = f"Chapter {num} · {title}" if title else f"Chapter {num}"
    return out


async def _lane_chapter_counts(db: AsyncSession, codes: List[str],
                               class_level: int):
    """chapter code → answerable-question count for one lane's codes."""
    return (await db.execute(
        sa_select(BoardQuestion.chapter, sa_func.count())
        .where(BoardQuestion.subject.in_(codes))
        .where(BoardQuestion.class_level == class_level)
        .where(BoardQuestion.correct_answer.isnot(None))
        .where(BoardQuestion.correct_answer != "")
        .group_by(BoardQuestion.chapter)
    )).all()


# ── Catalog ───────────────────────────────────────────────────────────────

def _subject_key(subject: str) -> str:
    return str(subject or "").lower().strip().replace(" ", "_").replace("-", "_")


def _chapter_entry_title(lane_label: str, num: str, anchor: str) -> str:
    """Multi-lane subjects prefix the lane so two sciences/books that both
    have a "Chapter 1" are distinguishable in the picker."""
    base = f"Chapter {num} · {anchor}" if anchor else f"Chapter {num}"
    return f"{lane_label} · {base}" if lane_label else base


@router.get("/chapters")
async def chapter_catalog(
    subject: str = Query(..., description="mathematics, science, ..."),
    class_level: int = Query(..., ge=1, le=12),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    lanes = _SUBJECT_LANES.get(_subject_key(subject))
    if lanes is None:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail=f"Unknown subject {subject!r}.")
    multi_lane = len(lanes) > 1
    entries = []          # (lane_label, num, total, canonical_code)
    lane_titles: Dict[str, Dict[str, str]] = {}
    for lane_label, codes in lanes.items():
        try:
            counts = await _lane_chapter_counts(db, codes, class_level)
        except Exception:
            counts = []
        if not counts:
            continue
        # merge the chapter's code variants (ch1 + ch01 → one chapter)
        by_num: Dict[str, List[Any]] = {}
        for chap, n in counts:
            code = str(chap or "")
            if not code:
                continue
            num = _num_from_chapter(code)
            rec = by_num.setdefault(num, [0, code, 0])
            rec[0] += int(n)
            if int(n) > rec[2]:
                rec[1], rec[2] = code, int(n)
        lane_titles[lane_label] = await _chapter_num_titles(
            db, codes, class_level)
        for num, (total, code, _n) in by_num.items():
            entries.append((lane_label, num, total, code))
    entries.sort(key=lambda e: (list(lanes).index(e[0])
                                if e[0] in lanes else 99,
                                e[1].zfill(4)))
    chapters = []
    for lane_label, num, total, code in entries:
        titles = lane_titles.get(lane_label) or {}
        anchor = titles.get(num, "")
        anchor_part = anchor.split(" · ", 1)[1] if " · " in anchor else ""
        key = f"{lane_label}:{code}" if multi_lane else code
        short = total < MIN_QUESTIONS
        chapters.append({
            "chapter": key,
            "title": _chapter_entry_title(lane_label, num, anchor_part),
            "questionCount": total,
            "testReady": total >= MIN_QUESTIONS,
            "short": short,
            "shortNote": _SHORT_NOTE if short else None,
            "maxQuestions": min(25, total),
        })
    return {
        "subject": subject,
        "subjectLabel": _SUBJECT_LABELS.get(_subject_key(subject),
                                            subject.title()),
        "classLevel": class_level,
        "chapters": chapters,
    }


# ── Start ────────────────────────────────────────────────────────────────

class StartChapterTestIn(BaseModel):
    subject: str
    classLevel: int = Field(ge=1, le=12)
    chapter: str
    numQuestions: int = Field(default=DEFAULT_QUESTIONS, ge=3, le=25)
    timedMinutes: Optional[int] = Field(default=None, ge=5, le=180)


_TF_TRUE = {"true", "t", "yes"}
_TF_FALSE = {"false", "f", "no"}


def _q_payload(row: BoardQuestion, idx: int) -> dict:
    opts = row.options if isinstance(row.options, list) else None
    if not opts and (row.question_type or "").lower() == "true_false":
        # True/False rows are objective: serve the two chips their own
        # type declares (the stored key is an exact "True"/"False").
        key = str(row.correct_answer or "").strip().lower()
        if key in _TF_TRUE or key in _TF_FALSE:
            opts = ["True", "False"]
    return {
        "question_id": str(row.id),
        "index": idx,
        "text": _clean(row.question_text),
        "options": [_clean(o) for o in (opts or []) if isinstance(o, str)]
                   or (opts or []),
        "marks": 1,  # filled from the section plan at assembly time
        "question_type": row.question_type or "short_answer",
        # answer/explanation/model_answer stay on the server row copy
    }


@router.post("/start")
async def start_chapter_test(
    payload: StartChapterTestIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    lanes = _SUBJECT_LANES.get(_subject_key(payload.subject))
    if lanes is None:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail=f"Unknown subject {payload.subject!r}.")
    chap_raw = str(payload.chapter or "").strip()

    # ── resolve the chapter to (lane codes, all stored code variants) ──
    codes: List[str] = []
    lane_label = ""
    if ":" in chap_raw:                       # scoped key "<lane>:<chapter>"
        lane_label, _, chap_code = chap_raw.partition(":")
        codes = lanes.get(lane_label) or []
        if not codes:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=f"Unknown chapter lane {lane_label!r} for "
                       f"{payload.subject!r}.")
        wanted = _num_from_chapter(chap_code)
    else:                                     # bare code
        wanted = _num_from_chapter(chap_raw)
        matches = []
        for lbl, lcodes in lanes.items():
            try:
                counts = await _lane_chapter_counts(db, lcodes,
                                                    payload.classLevel)
            except Exception:
                counts = []
            if any(_num_from_chapter(str(c or "")) == wanted
                   for c, _n in counts):
                matches.append((lbl, lcodes))
        if not matches:
            raise HTTPException(status.HTTP_404_NOT_FOUND,
                                detail=f"Chapter {chap_raw!r} has no question "
                                       f"bank for this subject and class.")
        if len(matches) > 1:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=f"Chapter {chap_raw!r} exists in several "
                       f"{_SUBJECT_LABELS.get(_subject_key(payload.subject), payload.subject)} "
                       f"books ({', '.join(lbl for lbl, _c in matches)}) — "
                       f"request it as '<book>:<chapter>'.")
        lane_label, codes = matches[0]

    # every stored spelling of this chapter inside the lane (ch1, ch01, …)
    try:
        distinct = (await db.execute(
            sa_select(BoardQuestion.chapter)
            .where(BoardQuestion.subject.in_(codes))
            .where(BoardQuestion.class_level == payload.classLevel)
            .where(BoardQuestion.chapter.isnot(None))
            .distinct()
        )).scalars().all()
    except Exception:
        distinct = []
    variants = [str(c) for c in distinct
                if c and _num_from_chapter(c) == wanted]
    if not variants:
        variants = [chap_raw]

    q = (sa_select(BoardQuestion)
         .where(BoardQuestion.subject.in_(codes))
         .where(BoardQuestion.class_level == payload.classLevel)
         .where(BoardQuestion.chapter.in_(variants))
         .where(BoardQuestion.correct_answer.isnot(None))
         .where(BoardQuestion.correct_answer != "")
         .order_by(sa_func.random())
         .limit(600))
    try:
        rows = list((await db.execute(q)).scalars().all())
    except Exception:
        rows = []

    if len(rows) < SHORT_MIN_QUESTIONS:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(f"Not enough questions for this chapter yet — "
                    f"{len(rows)} available, a chapter test needs at least "
                    f"{SHORT_MIN_QUESTIONS}. Practice or the diagnostic can "
                    f"still use this chapter."))

    # Span the chapter's nodes: round-robin across node groups so the test
    # covers the whole chapter, difficulty-rotating within each node.
    groups: Dict[str, List[BoardQuestion]] = {}
    for r in rows:
        groups.setdefault(_node_of(r) or "_", []).append(r)
    for g in groups.values():
        order = {"easy": 0, "medium": 1, "hard": 2}
        g.sort(key=lambda r: order.get((r.difficulty or "medium").lower(), 1))

    picked: List[BoardQuestion] = []
    seen_texts: set = set()
    group_iters = list(groups.values())
    level = 0
    while len(picked) < payload.numQuestions and any(group_iters):
        progressed = False
        for g in list(group_iters):
            if not g:
                continue
            # difficulty rotation: closest to the requested rung first
            target = level % 3
            cand_i = min(
                range(len(g)),
                key=lambda i: abs(
                    {"easy": 0, "medium": 1, "hard": 2}.get(
                        (g[i].difficulty or "medium").lower(), 1) - target),
            )
            cand = g.pop(cand_i)
            tkey = _norm_text(cand.question_text)
            if tkey in seen_texts:
                progressed = True
                continue
            seen_texts.add(tkey)
            picked.append(cand)
            progressed = True
            if len(picked) >= payload.numQuestions:
                break
        if not progressed:
            break
        level += 1

    # honest short test: a thin chapter (fewer than a full test's worth of
    # questions) still gets tested with what exists — never padded,
    # clearly labelled.
    is_short = len(picked) < MIN_QUESTIONS
    if len(picked) < SHORT_MIN_QUESTIONS:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(f"Not enough distinct questions for this chapter yet — "
                    f"{len(picked)} unique after dedup. A chapter test "
                    f"needs at least {SHORT_MIN_QUESTIONS}."))

    questions = [_q_payload(r, i + 1) for i, r in enumerate(picked)]
    # server-side key store (never sent to the client)
    keys: Dict[str, Any] = {}
    for r, qp in zip(picked, questions):
        keys[qp["question_id"]] = {
            "correct_answer": r.correct_answer or "",
            "marks": 1,
            "node_id": _node_of(r),
            "explanation": r.explanation or r.model_answer or "",
            "question_text": r.question_text,
        }
    chapter_title = ""
    try:
        num_titles = await _chapter_num_titles(db, codes, payload.classLevel)
        anchor = num_titles.get(wanted, "")
        anchor_part = anchor.split(" · ", 1)[1] if " · " in anchor else ""
        chapter_title = _chapter_entry_title(lane_label, wanted, anchor_part)
    except Exception:
        chapter_title = _chapter_entry_title(lane_label, wanted, "")

    session = {
        "session_id": secrets.token_urlsafe(12),
        "user_id": str(user.id),
        "subject": _subject_key(payload.subject),
        "subject_label": _SUBJECT_LABELS.get(_subject_key(payload.subject),
                                             payload.subject.title()),
        "class_level": payload.classLevel,
        "chapter": chap_raw,
        "chapter_title": chapter_title,
        "timed_minutes": payload.timedMinutes,
        "short_test": is_short,
        "short_note": _SHORT_NOTE if is_short else None,
        "questions": questions,
        "keys": keys,
        "answers": {},           # question_id -> {"answer", "time", "at"}
        "started_at": datetime.now(timezone.utc).isoformat(),
        "completed": False,
        "report": None,
    }
    await _save(session)
    safe = {k: v for k, v in session.items()
            if k not in ("keys", "user_id")}
    safe["answered"] = 0
    return safe


# ── Answer recording ─────────────────────────────────────────────────────

class AnswerIn(BaseModel):
    questionId: str
    answer: str = ""
    timeTakenSeconds: float = Field(default=0, ge=0)


@router.post("/{session_id}/answer")
async def record_answer(
    session_id: str,
    payload: AnswerIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    sess = await _load(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Chapter test session not found.")
    _owned(sess, user)
    if sess.get("completed"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Chapter test already finished.")
    qid = str(payload.questionId or "")
    if qid not in sess["keys"]:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Unknown question for this session.")
    sess["answers"][qid] = {
        "answer": str(payload.answer or ""),
        "time": float(payload.timeTakenSeconds or 0),
        "at": datetime.now(timezone.utc).isoformat(),
    }
    await _save(sess)
    return {
        "recorded": True,
        "answered": len(sess["answers"]),
        "total": len(sess["questions"]),
    }


# ── Finish / result ──────────────────────────────────────────────────────

async def _node_titles(db: AsyncSession, node_ids: List[str]) -> Dict[str, str]:
    ids = [n for n in {i for i in node_ids if i} ]
    if not ids:
        return {}
    try:
        rows = (await db.execute(
            sa_select(EnrichmentContent.node_id, EnrichmentContent.title)
            .where(EnrichmentContent.node_id.in_(ids))
        )).all()
    except Exception:
        return {}
    return {str(nid): str(title or "") for nid, title in rows}


async def _build_report(db: AsyncSession, sess: Dict[str, Any]) -> dict:
    keys = sess["keys"]
    per_node: Dict[str, Dict[str, Any]] = {}
    total_score = 0.0
    max_score = 0.0
    correct_count = 0
    review = []
    for q in sess["questions"]:
        qid = q["question_id"]
        key = keys.get(qid, {})
        marks = float(key.get("marks", 1))
        max_score += marks
        rec = sess["answers"].get(qid)
        skipped = rec is None
        student = str((rec or {}).get("answer") or "")
        is_correct = False
        if not skipped:
            is_correct = grade_answer(student, key.get("correct_answer", ""))
        if is_correct:
            total_score += marks
            correct_count += 1
        node = str(key.get("node_id") or "")
        bucket = per_node.setdefault(
            node, {"correct": 0, "total": 0})
        bucket["total"] += 1
        bucket["correct"] += 1 if is_correct else 0
        review.append({
            "questionId": qid,
            "question": _clean(q["text"]),
            "studentAnswer": "" if skipped else student,
            # bank fields can hold GRADER prose — scrub at serving; the
            # raw key already did its grading job above.
            "expectedAnswer": _clean(scrub_answer_key(
                key.get("correct_answer"))),
            "isCorrect": is_correct,
            "skipped": skipped,
            "explanation": _clean(scrub_explanation(
                key.get("explanation"), is_correct)),
        })

    titles = await _node_titles(db, list(per_node.keys()))
    node_rows = []
    for node, b in per_node.items():
        pct = round(b["correct"] / b["total"] * 100, 1) if b["total"] else 0.0
        title = _clean(titles.get(node)) or sess["chapter_title"]
        node_rows.append({
            "nodeId": node,  # internal key — UI renders title only
            "title": title,
            "storyUrl": f"/learn/{node}/story" if node else None,
            "correct": b["correct"],
            "total": b["total"],
            "pct": pct,
            "weak": pct < _WEAK_PCT,
        })
    node_rows.sort(key=lambda r: (not r["weak"], r["pct"]))

    pct_total = round(total_score / max_score * 100, 1) if max_score else 0.0
    time_taken = sum((a or {}).get("time", 0) for a in sess["answers"].values())
    report = {
        "sessionId": sess["session_id"],
        "subject": sess["subject_label"],
        "classLevel": sess["class_level"],
        "chapter": sess["chapter_title"],
        "timedMinutes": sess.get("timed_minutes"),
        "shortTest": bool(sess.get("short_test")),
        "shortNote": sess.get("short_note"),
        "totalScore": round(total_score, 1),
        "maxScore": round(max_score, 1),
        "percentage": pct_total,
        "passed": pct_total >= _PASS_PCT,
        "questionsTotal": len(sess["questions"]),
        "questionsAnswered": len(sess["answers"]),
        "correctCount": correct_count,
        "timeTakenSeconds": round(time_taken, 1),
        "nodeBreakdown": node_rows,
        "weakNodes": [
            {"title": r["title"], "storyUrl": r["storyUrl"], "pct": r["pct"],
             "correct": r["correct"], "total": r["total"]}
            for r in node_rows if r["weak"]
        ],
        "review": review,
        "completedAt": datetime.now(timezone.utc).isoformat(),
    }
    return report


@router.post("/{session_id}/finish")
async def finish_chapter_test(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    sess = await _load(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Chapter test session not found.")
    _owned(sess, user)
    if not sess.get("completed"):
        sess["completed"] = True
        sess["report"] = await _build_report(db, sess)
        await _save(sess)
        # honest mastery propagation for the chapter's nodes — through the
        # ONE ledger (one-record rule): dual-writes mastery_records +
        # mastery_state, exactly-once per (session, question).
        try:
            from backend.services.mastery_ledger import record_assessment

            for q in sess["questions"]:
                key = sess["keys"].get(q["question_id"], {})
                node = key.get("node_id")
                if not node or q["question_id"] not in sess["answers"]:
                    continue
                rec = sess["answers"][q["question_id"]]
                ok = grade_answer(str(rec.get("answer") or ""),
                                  key.get("correct_answer", ""))
                await record_assessment(
                    db, user_id=str(user.id), node_id=node, is_correct=ok,
                    source="chapter_test",
                    time_ms=int((rec.get("time") or 0) * 1000),
                    subject=sess.get("subject") or "general",
                    client_token=f"chaptest:{sess.get('id')}:{q['question_id']}",
                )
        except Exception as exc:
            logger.warning("[chapter-tests] mastery propagation failed: %s", exc)
    return sess["report"]


@router.get("/{session_id}/result")
async def chapter_test_result(
    session_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    sess = await _load(session_id)
    if not sess:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Chapter test session not found.")
    _owned(sess, user)
    if not sess.get("completed") or not sess.get("report"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            detail="Chapter test not finished yet.")
    return sess["report"]
