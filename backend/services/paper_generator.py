"""paper_generator.py — assemble board-pattern question papers from the
board_questions corpus (233k+ tagged questions with marking schemes).

Anyone picks class / subject / chapters / difficulty mix / total marks →
a sectioned paper (short / medium / long) plus a complete answer key with
per-question marking schemes. Serves student mock exams, teacher class
tests, and the paper-export surface.

Deterministic when `seed` is provided; random otherwise. Closed-world:
questions come only from the board_questions table — nothing generated.
"""
from __future__ import annotations

import random
from typing import Any, Dict, List, Optional

from sqlalchemy import func as sa_func, select as sa_select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.enrichment import BoardQuestion
from backend.services.exam_service import _EXAM_SUBJECT_ALIASES


class PaperRequest:
    def __init__(
        self,
        class_level: int,
        subject: str,
        total_marks: int = 80,
        duration_minutes: int = 180,
        chapters: Optional[List[str]] = None,
        difficulty: Optional[List[str]] = None,
        paper_title: str = "",
        seed: Optional[int] = None,
    ):
        self.class_level = class_level
        self.subject = subject
        self.total_marks = total_marks
        self.duration_minutes = duration_minutes
        self.chapters = chapters or []
        self.difficulty = difficulty or []
        self.paper_title = paper_title
        self.seed = seed


SECTION_BLUEPRINT = [
    # (section_id, label, mark band, share of total marks)
    ("A", "Short Answer", (1, 2), 0.40),
    ("B", "Medium Answer", (3, 5), 0.35),
    ("C", "Long Answer", (5, 999), 0.25),
]


def _aliases(subject: str) -> List[str]:
    return _EXAM_SUBJECT_ALIASES.get(
        subject.lower().replace(" ", "_"), [subject.lower()])


def _in_band(marks: int, band) -> bool:
    lo, hi = band
    return lo <= marks <= hi


async def _fetch_pool(
    db: AsyncSession,
    req: PaperRequest,
) -> List[Any]:
    subs = _aliases(req.subject)
    stmt = (
        sa_select(BoardQuestion)
        .where(BoardQuestion.subject.in_(subs))
        .where(BoardQuestion.class_level == req.class_level)
        .where(BoardQuestion.correct_answer.isnot(None))
    )
    if req.chapters:
        stmt = stmt.where(BoardQuestion.chapter.in_(req.chapters))
    if req.difficulty:
        stmt = stmt.where(BoardQuestion.difficulty.in_(
            [d.lower() for d in req.difficulty]))
    # generous pool: enough for dedupe + mark-band fit
    stmt = stmt.order_by(sa_func.random()).limit(req.total_marks * 5 + 100)
    rows = (await db.execute(stmt)).scalars().all()
    return list(rows)


def _assemble(req: PaperRequest, rows: List[Any], rng: random.Random) -> Dict[str, Any]:
    sections_out: List[Dict[str, Any]] = []
    answer_key: List[Dict[str, Any]] = []
    used: set = set()
    qn = 1
    total_assigned = 0

    for si, (sec_id, label, band, share) in enumerate(SECTION_BLUEPRINT):
        is_last = si == len(SECTION_BLUEPRINT) - 1
        budget = round(req.total_marks * share)
        if is_last:
            budget = req.total_marks - total_assigned  # soak up remainder
        if budget <= 0:
            continue
        sec_marks = 0
        questions: List[Dict[str, Any]] = []

        # bucket: fit the band, prefer marks close to the band midpoint
        mid = (band[0] + min(band[1], 8)) / 2
        pool = [
            q for q in rows
            if q.id not in used and _in_band(q.marks or 1, band)
        ]
        pool.sort(key=lambda q: abs((q.marks or 1) - mid))

        for q in pool:
            m = q.marks or 1
            if sec_marks + m > budget:
                continue
            used.add(q.id)
            qn_out = qn
            qn += 1
            sec_marks += m
            questions.append({
                "qn": qn_out,
                "marks": m,
                "chapter": q.chapter or "",
                "question_type": q.question_type,
                "question_text": q.question_text,
                "options": q.options or None,
                "source_id": str(q.id),
                "difficulty": q.difficulty,
            })
            answer_key.append({
                "qn": qn_out,
                "correct_answer": (q.correct_answer or "")[:400],
                "model_answer": (q.model_answer or "")[:1200],
                "marking_scheme": (q.marking_scheme or "")[:600],
                "explanation": (q.explanation or "")[:600],
            })
            total_assigned += m

        sections_out.append({
            "section_id": sec_id,
            "label": label,
            "marks": sec_marks,
            "questions": questions,
        })

    return {
        "paper_title": req.paper_title or (
            f"{req.subject.title()} — Class {req.class_level} "
            f"Practice Paper ({req.total_marks} marks, {req.duration_minutes} min)"),
        "subject": req.subject,
        "class_level": req.class_level,
        "total_marks": total_assigned,
        "duration_minutes": req.duration_minutes,
        "chapters_filter": req.chapters,
        "sections": sections_out,
        "answer_key": answer_key,
        "questions_used": len(used),
        "shortfall": max(0, req.total_marks - total_assigned),
    }


async def generate_paper(db: AsyncSession, req: PaperRequest) -> Dict[str, Any]:
    rng = random.Random(req.seed) if req.seed is not None else random.Random()
    rows = await _fetch_pool(db, req)
    if not rows:
        return {
            "paper_title": req.paper_title or "No questions available",
            "subject": req.subject, "class_level": req.class_level,
            "total_marks": 0, "duration_minutes": req.duration_minutes,
            "sections": [], "answer_key": [], "questions_used": 0,
            "shortfall": req.total_marks,
            "note": "no matching questions in the corpus for this filter",
        }
    rng.shuffle(rows)
    return _assemble(req, rows, rng)


async def coverage(db: AsyncSession, class_level: int, subject: str) -> Dict[str, Any]:
    subs = _aliases(subject)
    base = (
        sa_select(
            BoardQuestion.chapter,
            BoardQuestion.difficulty,
            sa_func.count(BoardQuestion.id),
        )
        .where(BoardQuestion.subject.in_(subs))
        .where(BoardQuestion.class_level == class_level)
        .where(BoardQuestion.correct_answer.isnot(None))
        .group_by(BoardQuestion.chapter, BoardQuestion.difficulty)
    )
    rows = (await db.execute(base)).all()
    chapters: Dict[str, int] = {}
    difficulties: Dict[str, int] = {}
    total = 0
    for chapter, difficulty, n in rows:
        c = chapter or "Unlabelled"
        chapters[c] = chapters.get(c, 0) + n
        difficulties[difficulty] = difficulties.get(difficulty, 0) + n
        total += n
    return {
        "class_level": class_level,
        "subject": subject,
        "total": total,
        "chapters": [{"chapter": c, "count": n} for c, n in
                     sorted(chapters.items(), key=lambda kv: -kv[1])],
        "difficulties": difficulties,
    }
