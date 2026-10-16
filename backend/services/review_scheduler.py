"""review_scheduler.py — the daily spaced-repetition driver.

The review_items table already stores full SM-2 state per user per node
(easiness_factor, interval_days, repetitions, next_review_date). What was
missing was the daily driver: query what is due today, and apply SM-2
grades when the student reviews. This module is exactly that.
"""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, List

from sqlalchemy import select as sa_select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.progress import ReviewItem


async def due_queue(
    db: AsyncSession, user_id: str, limit: int = 20, include_overdue: bool = True,
) -> Dict[str, Any]:
    """The daily driver: items due today (or overdue), most-overdue first."""
    today = date.today()
    cutoff = today if include_overdue else today
    stmt = (
        sa_select(ReviewItem)
        .where(ReviewItem.user_id == user_id)
        .where(ReviewItem.next_review_date != None)  # noqa: E711
        .where(ReviewItem.next_review_date <= cutoff)
        .order_by(ReviewItem.next_review_date)
        .limit(limit)
    )
    rows = (await db.execute(stmt)).scalars().all()
    items = []
    for r in rows:
        overdue_days = (today - r.next_review_date).days if r.next_review_date else 0
        items.append({
            "node_id": r.node_id,
            "concept_name": r.concept_name,
            "repetitions": r.repetitions,
            "easiness_factor": r.easiness_factor,
            "interval_days": r.interval_days,
            "due_date": str(r.next_review_date),
            "overdue_days": max(0, overdue_days),
        })
    return {
        "user_id": user_id,
        "today": str(today),
        "due_count": len(items),
        "items": items,
    }


async def upcoming(
    db: AsyncSession, user_id: str, days: int = 7, limit: int = 50,
) -> Dict[str, Any]:
    """What is coming due in the next `days` days — the planning view."""
    today = date.today()
    horizon = today + timedelta(days=days)
    stmt = (
        sa_select(ReviewItem)
        .where(ReviewItem.user_id == user_id)
        .where(ReviewItem.next_review_date != None)  # noqa: E711
        .where(ReviewItem.next_review_date <= horizon)
        .where(ReviewItem.next_review_date >= today)
        .order_by(ReviewItem.next_review_date)
        .limit(limit)
    )
    rows = (await db.execute(stmt)).scalars().all()
    by_day: Dict[str, int] = {}
    for r in rows:
        key = str(r.next_review_date)
        by_day[key] = by_day.get(key, 0) + 1
    return {"user_id": user_id, "horizon_days": days, "upcoming_count": len(rows),
            "by_day": by_day}


def _sm2(item: ReviewItem, quality: int) -> None:
    """Apply an SM-2 grade (0-5) in place.

    MASTERY-SOLID: canonical SM-2 order — the easiness factor updates
    FIRST, and the interval for reps >= 3 multiplies by the NEW EF. This
    module writes the same review_items rows as
    ProgressService.submit_review / schedule_practice_review, so it must
    reproduce their math exactly; the old version multiplied by the OLD
    EF (interval drift from the third review on) and rounded EF to 4dp.
    """
    quality = max(0, min(5, quality))
    # Update easiness factor first (canonical SM-2 step 1)
    new_ef = item.easiness_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    item.easiness_factor = max(1.3, new_ef)
    if quality < 3:
        item.repetitions = 0
        item.interval_days = 1
    else:
        if item.repetitions == 0:
            item.interval_days = 1
        elif item.repetitions == 1:
            item.interval_days = 6
        else:
            item.interval_days = max(1, round(item.interval_days * item.easiness_factor))
        item.repetitions += 1
    item.last_review_date = date.today()
    item.next_review_date = date.today() + timedelta(days=item.interval_days)


async def apply_grade(
    db: AsyncSession, user_id: str, node_id: str, quality: int,
) -> Dict[str, Any]:
    """Grade one review (quality 0-5) and reschedule that item."""
    stmt = sa_select(ReviewItem).where(
        ReviewItem.user_id == user_id).where(ReviewItem.node_id == node_id)
    item = (await db.execute(stmt)).scalars().first()
    if item is None:
        # first review of this node — seed the SM-2 state
        item = ReviewItem(user_id=user_id, node_id=node_id,
                          concept_name=node_id, easiness_factor=2.5,
                          interval_days=1, repetitions=0)
        db.add(item)
    _sm2(item, max(0, min(5, quality)))
    await db.commit()
    return {
        "node_id": node_id,
        "repetitions": item.repetitions,
        "easiness_factor": item.easiness_factor,
        "interval_days": item.interval_days,
        "next_review_date": str(item.next_review_date),
    }
