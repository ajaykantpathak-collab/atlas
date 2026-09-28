"""misconception_analytics.py — aggregate the misconception-tagged attempt
log into the teacher/student-facing analytics.

Every diagnostic attempt carries misconception_id (authored per-question in
the corpus). Grouping the its_attempt_log by that column gives the trap
heatmap: which misconceptions burn the most students, where, and how often.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from sqlalchemy import select as sa_select, func as sa_func, desc as sa_desc
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.telemetry import AttemptLog


async def trap_heatmap(
    db: AsyncSession,
    days: int = 30,
    student_id: Optional[str] = None,
    subject_hint: Optional[str] = None,
    limit: int = 50,
) -> Dict[str, Any]:
    """Global (or per-student) misconception trap counts over the window."""
    since = datetime.now(timezone.utc) - timedelta(days=days)
    stmt = (
        sa_select(
            AttemptLog.misconception_id,
            sa_func.count(AttemptLog.id).label("hits"),
            sa_func.count(sa_func.distinct(AttemptLog.student_id)).label("students"),
            sa_func.sum(sa_func.cast(AttemptLog.is_correct, sa_func.coerce(0) if False else __import__("sqlalchemy").Integer)).label("wrong"),
        )
        .where(AttemptLog.misconception_id.isnot(None))
        .where(AttemptLog.created_at >= since)
    )
    if student_id:
        stmt = stmt.where(AttemptLog.student_id == student_id)
    stmt = stmt.group_by(AttemptLog.misconception_id).order_by(sa_desc("hits")).limit(limit)
    rows = (await db.execute(stmt)).all()

    traps: List[Dict[str, Any]] = []
    for mid, hits, students, correct_sum in rows:
        wrong = int(hits or 0) - int(correct_sum or 0)
        traps.append({
            "misconception_id": mid,
            "hits": int(hits or 0),
            "students_burned": int(students or 0),
            "wrong_share": round(wrong / hits, 3) if hits else 0.0,
        })
    return {"window_days": days, "student_id": student_id, "traps": traps}


async def student_trap_profile(db: AsyncSession, student_id: str) -> Dict[str, Any]:
    """Per-student: the traps they have hit, most-recent first, with mastery."""
    stmt = (
        sa_select(
            AttemptLog.misconception_id,
            AttemptLog.node_id,
            sa_func.count(AttemptLog.id).label("hits"),
            sa_func.max(AttemptLog.created_at).label("last_seen"),
        )
        .where(AttemptLog.student_id == student_id)
        .where(AttemptLog.misconception_id.isnot(None))
        .group_by(AttemptLog.misconception_id, AttemptLog.node_id)
        .order_by(sa_desc("last_seen"))
        .limit(100)
    )
    rows = (await db.execute(stmt)).all()
    traps = [
        {"misconception_id": mid, "node_id": node, "hits": int(hits), "last_seen": str(last)}
        for mid, node, hits, last in rows
    ]
    return {"student_id": student_id, "trap_count": len(traps), "traps": traps}


async def class_remediation_bundle(
    db: AsyncSession, student_ids: List[str], min_students: int = 2,
) -> Dict[str, Any]:
    """Traps hit by >= min_students of the given students → remedial
    assignment suggestions (the one-click bundle)."""
    if not student_ids:
        return {"bundles": []}
    stmt = (
        sa_select(
            AttemptLog.misconception_id,
            sa_func.count(sa_func.distinct(AttemptLog.student_id)).label("students"),
            sa_func.count(AttemptLog.id).label("hits"),
        )
        .where(AttemptLog.student_id.in_(student_ids))
        .where(AttemptLog.misconception_id.isnot(None))
        .group_by(AttemptLog.misconception_id)
        .having(sa_func.count(sa_func.distinct(AttemptLog.student_id)) >= min_students)
        .order_by(sa_desc("students"))
    )
    rows = (await db.execute(stmt)).all()
    bundles = [
        {"misconception_id": mid, "students_affected": int(students), "total_hits": int(hits),
         "suggested_action": "assign prereq lessons + node sims for this misconception"}
        for mid, students, hits in rows
    ]
    return {"students_queried": len(student_ids), "bundles": bundles}
