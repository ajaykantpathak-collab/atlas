"""mastery_passport.py — the student-facing transcript.

Assembles, per user: per-subject mastery bars, traps conquered, review
streak, and an exam-readiness score per subject. Everything reads existing
tables (mastery_records, review_items, its_attempt_log, activity_logs) —
a presentation layer over data that already exists.
"""
from __future__ import annotations

from datetime import date, timedelta
from typing import Any, Dict, List

from sqlalchemy import select as sa_select, func as sa_func, desc as sa_desc
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.progress import MasteryRecord, ReviewItem, ActivityLog
from backend.models.telemetry import AttemptLog

MASTERED = 0.85
LEARNING = 0.5

_SUBJECTS = [
    ("math", "Mathematics"), ("phy", "Physics"), ("chem", "Chemistry"),
    ("bio", "Biology"), ("eng", "English"), ("hin", "Hindi"),
    ("hist", "History & Civics"), ("geo", "Geography"),
    ("eco", "Economics"), ("comst", "Commercial Studies"),
    ("compapp", "Computer Applications"), ("compst", "Computer Studies"),
    ("envsci", "Environmental Science"), ("biotech", "Biotechnology"),
    ("acc", "Accountancy"), ("bst", "Business Studies"),
    ("cs", "Computer Science"), ("econ", "Economics"),
]


def _subject_of(node_id: str) -> str:
    parts = node_id.split("_")
    return parts[1] if len(parts) > 1 else node_id


async def build_passport(db: AsyncSession, user_id: str) -> Dict[str, Any]:
    # per-node mastery
    mrows = (await db.execute(
        sa_select(MasteryRecord).where(MasteryRecord.user_id == user_id)
    )).scalars().all()

    by_subject: Dict[str, Dict[str, Any]] = {}
    total_mastered = 0
    total_nodes = 0
    for r in mrows:
        subj_code = _subject_of(r.node_id)
        subj_name = next((nm for code, nm in _SUBJECTS if code == subj_code), subj_code)
        bucket = by_subject.setdefault(subj_name, {
            "nodes": 0, "mastered": 0, "learning": 0, "mastery_sum": 0.0,
        })
        bucket["nodes"] += 1
        bucket["mastery_sum"] += r.mastery_probability
        if r.mastery_probability >= MASTERED:
            bucket["mastered"] += 1
            total_mastered += 1
        elif r.mastery_probability >= LEARNING:
            bucket["learning"] += 1
        total_nodes += 1

    subjects = []
    for subj_name, b in by_subject.items():
        avg = b["mastery_sum"] / b["nodes"] if b["nodes"] else 0.0
        subjects.append({
            "subject": subj_name,
            "nodes_tracked": b["nodes"],
            "mastered": b["mastered"],
            "learning": b["nodes"] - b["mastered"],
            "avg_mastery": round(avg, 3),
            "mastery_pct": round(avg * 100, 1),
        })
    subjects.sort(key=lambda s: -s["nodes_tracked"])

    # traps conquered: distinct misconceptions eventually answered correctly
    wrong_nodes = (
        sa_select(AttemptLog.node_id, AttemptLog.misconception_id)
        .where(AttemptLog.student_id == user_id)
        .where(AttemptLog.misconception_id.isnot(None))
    )
    wrong_rows = (await db.execute(wrong_nodes)).all()
    trap_nodes = {(n, m) for n, m in wrong_rows}

    later_correct = (
        sa_select(AttemptLog.node_id, AttemptLog.misconception_id)
        .where(AttemptLog.student_id == user_id)
        .where(AttemptLog.is_correct.is_(True))
    )
    later_rows = (await db.execute(later_correct)).all()
    fixed = {(n, m) for n, m in later_rows}
    traps_conquered = len({m for (n, m) in trap_nodes if (n, m) in fixed or
                           any(fn == n for (fn, fm) in fixed)})
    traps_total = len({m for (_, m) in trap_nodes})

    # review streak from review history / next review dates
    rrows = (await db.execute(
        sa_select(ReviewItem).where(ReviewItem.user_id == user_id)
    )).scalars().all()
    streak_days = 0
    day = date.today()
    active_days = set()
    for r in rrows:
        if r.last_review_date:
            active_days.add(r.last_review_date)
    while day in active_days:
        streak_days += 1
        day -= timedelta(days=1)

    # exam readiness: share of tracked nodes mastered, weighted per subject
    readiness = {}
    for s in subjects:
        readiness[s["subject"]] = s["mastery_pct"]
    overall = round(total_mastered / total_nodes * 100, 1) if total_nodes else 0.0

    # recent activity
    arows = (await db.execute(
        sa_select(ActivityLog)
        .where(ActivityLog.user_id == user_id)
        .order_by(sa_desc(ActivityLog.created_at))
        .limit(10)
    )).all()
    recent = [
        {"type": a.activity_type, "title": a.title, "subject": a.subject,
         "score": a.score, "when": str(a.created_at)}
        for a in arows
    ]

    return {
        "user_id": user_id,
        "overall": {
            "nodes_tracked": total_nodes,
            "mastered": total_mastered,
            "mastery_pct": overall,
            "review_streak_days": streak_days,
            "traps_conquered": traps_conquered,
            "traps_total": traps_total,
        },
        "subjects": subjects,
        "exam_readiness": readiness,
        "recent_activity": recent,
    }
