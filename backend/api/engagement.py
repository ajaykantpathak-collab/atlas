"""Engagement router — the retention layer (daily goals, streak protection,
notification center, weekly parent digest).

Everything here is DERIVED from real recorded data; nothing is invented:

- Daily goal progress counts today's real ``activity_log`` quiz rows (the
  rows written by actual practice/assessment submissions).
- Streak state mirrors the exact day-boundary math of
  ``ProgressService.update_streak`` (server-local ``date.today()``) so the
  "at risk" nudge can never disagree with the streak service.
- Notifications are computed on read from real rows (activity_log,
  user_achievements, review_items, users.last_activity_date) and carry
  stable ids so per-student mark-as-read state can be persisted.
- The weekly digest aggregates the same real quiz rows for the last 7 days
  and is only readable by the student themself or a LINKED parent
  (parent_student_links).

Honesty rules: a student with no recorded activity gets empty lists and
``null`` topic fields — never zeros dressed up as data, never fabricated
notifications. Raw node ids never appear in any field the UI renders
directly (topic names come from the knowledge-node label).
"""

from __future__ import annotations

import logging
from datetime import date, datetime, time, timedelta, timezone
from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.progress import ActivityLog
from backend.models.user import User

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/engagement", tags=["engagement"])

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

QUESTIONS_MIN, QUESTIONS_MAX = 1, 200
MINUTES_MIN, MINUTES_MAX = 5, 480
NOTIF_READ_CAP = 300          # persisted mark-as-read keys kept per student
ACHIEVEMENT_NOTIF_WINDOW_DAYS = 7
DIGEST_DAYS = 7

# The platform's real XP award for quiz activity (identical on the practice,
# assessment and diagnostics paths — see ProgressService callers):
XP_PER_CORRECT, XP_PER_INCORRECT = 10, 2

_PREFS_KEY = "engagement"      # users.preferences["engagement"]
_GOAL_KEY = "daily_goal"
_READS_KEY = "notif_reads"


# ---------------------------------------------------------------------------
# Small pure helpers
# ---------------------------------------------------------------------------

def _server_today() -> date:
    """The SAME boundary ProgressService.update_streak uses (date.today())."""
    return date.today()


def _prefs_block(user: User) -> dict[str, Any]:
    """Read a COPY of the namespaced engagement block.

    A copy is mandatory: callers mutate the returned dict. If we handed out
    the live nested object from ``user.preferences``, in-place mutation would
    alias the original value and SQLAlchemy's attribute history would see
    "no change" — silently emitting ``UPDATE users SET updated_at=...`` only
    (observed live). Copy-first guarantees the flush writes the column.
    """
    prefs = user.preferences if isinstance(user.preferences, dict) else {}
    block = prefs.get(_PREFS_KEY)
    return dict(block) if isinstance(block, dict) else {}


def _merge_prefs_block(user: User, block: dict[str, Any]) -> None:
    """Merge-write the engagement block back WITHOUT clobbering other keys.

    ``block`` must not alias any nested object inside ``user.preferences``
    (see _prefs_block) or the change will be invisible to the unit of work.
    """
    prefs = dict(user.preferences) if isinstance(user.preferences, dict) else {}
    prefs[_PREFS_KEY] = block
    user.preferences = prefs
    user.updated_at = datetime.now(timezone.utc)


def _stored_goal(user: User) -> Optional[dict[str, Any]]:
    block = _prefs_block(user)
    goal = block.get(_GOAL_KEY)
    if not isinstance(goal, dict):
        return None
    metric = goal.get("metric")
    target = goal.get("target")
    if metric not in ("questions", "minutes") or not isinstance(target, int):
        return None
    return {
        "metric": metric,
        "target": target,
        "updated_at": goal.get("updated_at"),
    }


def _row_utc(row: Any) -> Optional[datetime]:
    ts = getattr(row, "created_at", None)
    if ts is None:
        return None
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    return ts


def _row_correct(row: Any) -> bool:
    meta = row.extra_data if isinstance(row.extra_data, dict) else {}
    raw = meta.get("is_correct")
    if raw is None:
        return str(row.score or "").strip().lower() == "correct"
    return bool(raw)


def _row_seconds(row: Any) -> int:
    meta = row.extra_data if isinstance(row.extra_data, dict) else {}
    try:
        return int(meta.get("time_taken_seconds") or 0)
    except (TypeError, ValueError):
        return 0


def _streak_state(user: User, today: date) -> dict[str, Any]:
    """Three honest states, mirroring update_streak's day math exactly.

    - active_today: last activity == today → the streak is counted today.
    - at_risk:      last activity == yesterday → a session TODAY keeps the
                    streak alive (tomorrow it would lapse).
    - lapsed:       streak > 0 and last activity < yesterday → the recorded
                    streak already broke; a session today STARTS A NEW one
                    (never claim today can save it).
    - none:         no streak.
    """
    # Shared implementation with the student/parent dashboards, so the two
    # read paths cannot drift apart. Imported locally in this module's style.
    from backend.services.streak_state import classify_streak

    s = classify_streak(user.streak_days, user.last_activity_date, today)
    return {
        # `current` keeps its established meaning here (the recorded counter);
        # only the classification is shared.
        "current": s["recorded_streak"],
        "last_activity_date": s["last_activity_date"],
        "state": s["state"],
    }

def _today_summary(rows: List[Any], today: date) -> dict[str, Any]:
    """Aggregate TODAY's quiz rows — the only source of goal progress."""
    questions = 0
    seconds = 0
    for row in rows:
        ts = _row_utc(row)
        if ts is None:
            continue
        if ts.date() == today:
            questions += 1
            seconds += _row_seconds(row)
    return {
        "date": today.isoformat(),
        "questions": questions,
        "minutes": seconds // 60,
        "seconds": seconds,
    }


def _goal_completed(goal: Optional[dict[str, Any]], today_stats: dict[str, Any]) -> bool:
    if not goal:
        return False
    if goal["metric"] == "questions":
        return today_stats["questions"] >= goal["target"]
    return today_stats["minutes"] >= goal["target"]


async def _quiz_rows_since(
    db: AsyncSession, user_id: str, since: datetime,
) -> List[Any]:
    """Real quiz activity rows written by actual submissions."""
    result = await db.execute(
        select(ActivityLog)
        .where(
            ActivityLog.user_id == user_id,
            ActivityLog.activity_type == "quiz",
            ActivityLog.created_at >= since,
        )
        .order_by(ActivityLog.created_at.asc())
    )
    return list(result.scalars().all())


async def _goal_payload(user: User, db: AsyncSession) -> dict[str, Any]:
    today = _server_today()
    day_start = datetime.combine(today, time.min, tzinfo=timezone.utc)
    # Pull yesterday too so "today" filtering is purely date-based (defensive
    # against clock-edge writes); _today_summary keeps only today's rows.
    rows = await _quiz_rows_since(db, str(user.id), day_start - timedelta(days=1))
    today_stats = _today_summary(rows, today)
    goal = _stored_goal(user)
    return {
        "goal": goal,
        "today": today_stats,
        "completed": _goal_completed(goal, today_stats),
        "streak": _streak_state(user, today),
        "server_date": today.isoformat(),
    }


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class GoalIn(BaseModel):
    metric: str = Field(..., description="questions | minutes")
    target: int = Field(..., ge=1, description="Daily target")


class MarkReadIn(BaseModel):
    ids: List[str] = Field(..., max_length=100)


# ---------------------------------------------------------------------------
# Daily goal
# ---------------------------------------------------------------------------

@router.get("/goal")
async def get_goal(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Today's goal + real progress (activity_log quiz rows today)."""
    return await _goal_payload(user, db)


async def _persist_user(db: AsyncSession, user: User, what: str) -> None:
    try:
        await db.flush()
        await db.refresh(user)
    except Exception as exc:  # DB write failure must not fake success
        logger.warning("%s persist failed for %s: %s", what, user.id, exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Could not save the {what} — try again",
        )


@router.put("/goal")
async def set_goal(
    payload: GoalIn,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Set (or update) the daily goal. Persisted on the users row."""
    metric = str(payload.metric).strip().lower()
    if metric not in ("questions", "minutes"):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="metric must be 'questions' or 'minutes'",
        )
    target = int(payload.target)
    if metric == "questions" and not (QUESTIONS_MIN <= target <= QUESTIONS_MAX):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"questions target must be {QUESTIONS_MIN}-{QUESTIONS_MAX}",
        )
    if metric == "minutes" and not (MINUTES_MIN <= target <= MINUTES_MAX):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"minutes target must be {MINUTES_MIN}-{MINUTES_MAX}",
        )
    block = _prefs_block(user)
    block[_GOAL_KEY] = {
        "metric": metric,
        "target": target,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    _merge_prefs_block(user, block)
    await _persist_user(db, user, "goal")
    return await _goal_payload(user, db)


@router.delete("/goal")
async def clear_goal(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Remove the daily goal (honest opt-out; progress stays recorded)."""
    block = _prefs_block(user)
    block.pop(_GOAL_KEY, None)
    _merge_prefs_block(user, block)
    await _persist_user(db, user, "goal")
    return await _goal_payload(user, db)


# ---------------------------------------------------------------------------
# Notification center (derived — zero fabricated notifications)
# ---------------------------------------------------------------------------

def _read_map(user: User) -> dict[str, str]:
    block = _prefs_block(user)
    reads = block.get(_READS_KEY)
    return dict(reads) if isinstance(reads, dict) else {}


async def _build_notifications(user: User, db: AsyncSession) -> List[dict[str, Any]]:
    today = _server_today()
    now = datetime.now(timezone.utc)
    out: List[dict[str, Any]] = []
    reads = _read_map(user)

    def _add(
        nid: str, ntype: str, title: str, body: str,
        created: datetime, href: str,
    ) -> None:
        out.append({
            "id": nid,
            "type": ntype,
            "title": title,
            "body": body,
            "created_at": created.isoformat(),
            "read": nid in reads,
            "href": href,
        })

    # 1. Streak protection — real users row, real day math.
    streak = _streak_state(user, today)
    if streak["state"] == "at_risk":
        n = streak["current"]
        _add(
            f"streak_at_risk:{today.isoformat()}", "streak_at_risk",
            f"Your {n}-day streak is at risk",
            "Nothing recorded today. One session before the day ends keeps it alive.",
            now, "/practice",
        )
    elif streak["state"] == "lapsed":
        _add(
            f"streak_lapsed:{today.isoformat()}", "streak_lapsed",
            "Your streak has lapsed",
            "A session today starts a fresh streak — day one counts from today.",
            now, "/practice",
        )

    # 2. Goal completed TODAY — only when real rows meet the real target.
    goal = _stored_goal(user)
    if goal:
        day_start = datetime.combine(today, time.min, tzinfo=timezone.utc)
        rows = await _quiz_rows_since(db, str(user.id), day_start - timedelta(days=1))
        stats = _today_summary(rows, today)
        if _goal_completed(goal, stats):
            done = (
                f"{stats['questions']} of {goal['target']}"
                if goal["metric"] == "questions"
                else f"{stats['minutes']} of {goal['target']} minutes"
            )
            unit = "questions" if goal["metric"] == "questions" else "practice minutes"
            _add(
                f"goal_completed:{today.isoformat()}", "goal_completed",
                "Daily goal complete",
                f"You logged {done} {unit} today. Goal met — anything more is bonus.",
                now, "/dashboard",
            )

    # 3. Achievement unlocks — real user_achievements rows, recent only.
    try:
        from backend.models.achievement import Achievement, UserAchievement

        cutoff = now - timedelta(days=ACHIEVEMENT_NOTIF_WINDOW_DAYS)
        arows = (
            await db.execute(
                select(UserAchievement, Achievement)
                .join(Achievement, Achievement.id == UserAchievement.achievement_id)
                .where(
                    UserAchievement.user_id == user.id,
                    UserAchievement.unlocked.is_(True),
                    UserAchievement.unlocked_at.isnot(None),
                    UserAchievement.unlocked_at >= cutoff,
                )
                .order_by(UserAchievement.unlocked_at.desc())
                .limit(10)
            )
        ).all()
        for ua, ach in arows:
            when = ua.unlocked_at
            if when.tzinfo is None:
                when = when.replace(tzinfo=timezone.utc)
            _add(
                f"achievement:{ach.achievement_id}:{when.isoformat()}",
                "achievement_unlocked",
                f"Achievement unlocked: {ach.title}",
                ach.description or "New badge added to your wall.",
                when, "/achievements",
            )
    except Exception as exc:
        logger.warning("achievement notifications unavailable: %s", exc)

    # 4. Review items due — real SM-2 queue, only when genuinely due.
    try:
        from backend.models.progress import ReviewItem

        result = await db.execute(
            select(ReviewItem.node_id)
            .where(
                ReviewItem.user_id == user.id,
                ReviewItem.next_review_date.isnot(None),
                ReviewItem.next_review_date <= today,
            )
        )
        due = len(set(result.scalars().all()))
        if due > 0:
            _add(
                f"review_due:{today.isoformat()}", "review_due",
                "Review items are due",
                f"{due} topic{'s are' if due != 1 else ' is'} scheduled for review today — clear them before they slip.",
                now, "/progress",
            )
    except Exception as exc:
        logger.warning("review notifications unavailable: %s", exc)

    # Newest first.
    out.sort(key=lambda n: n["created_at"], reverse=True)
    return out


@router.get("/notifications")
async def get_notifications(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Real notifications only — computed from recorded data, never stored."""
    items = await _build_notifications(user, db)
    unread = sum(1 for n in items if not n["read"])
    return {
        "notifications": items,
        "unread": unread,
        "server_date": _server_today().isoformat(),
    }


@router.post("/notifications/read")
async def mark_notifications_read(
    payload: MarkReadIn,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Persist mark-as-read per student (stable notification ids)."""
    reads = dict(_read_map(user))
    now_iso = datetime.now(timezone.utc).isoformat()
    marked = 0
    for nid in payload.ids:
        nid = str(nid).strip()
        if not nid or len(nid) > 200:
            continue
        if nid not in reads:
            marked += 1
        reads[nid] = now_iso
    # Cap the stored set: keep the most recently read keys.
    if len(reads) > NOTIF_READ_CAP:
        keep = sorted(reads.items(), key=lambda kv: kv[1], reverse=True)[:NOTIF_READ_CAP]
        reads = dict(keep)
    block = _prefs_block(user)
    block[_READS_KEY] = reads
    _merge_prefs_block(user, block)
    await _persist_user(db, user, "read state")
    return {"marked": marked, "read_ids": sorted(reads.keys())}


# ---------------------------------------------------------------------------
# Weekly parent digest (self or linked-parent gated)
# ---------------------------------------------------------------------------

@router.get("/weekly-digest/{student_id}")
async def get_weekly_digest(
    student_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Real weekly summary for one student — self or linked parent only."""
    # ---- Authorization: the student themself or a LINKED parent ----
    if str(user.id) != str(student_id):
        if (getattr(user, "role", None) or "") != "parent":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this student",
            )
        from backend.services.auth_service import ParentStudentLinkModel

        link = await db.execute(
            select(ParentStudentLinkModel.id).where(
                ParentStudentLinkModel.parent_id == user.id,
                ParentStudentLinkModel.student_id == student_id,
            )
        )
        if link.scalar_one_or_none() is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This student is not linked to your account",
            )

    # ---- Window: the last 7 days INCLUDING today, server-date boundary ----
    today = _server_today()
    week_start_date = today - timedelta(days=DIGEST_DAYS - 1)
    window_start = datetime.combine(week_start_date, time.min, tzinfo=timezone.utc)

    student = (
        await db.execute(select(User).where(User.id == student_id))
    ).scalar_one_or_none()
    if student is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

    # ---- Real quiz activity in the window ----
    rows = await _quiz_rows_since(db, str(student.id), window_start)

    per_day: dict[str, dict[str, int]] = {
        (week_start_date + timedelta(days=i)).isoformat(): {
            "date": (week_start_date + timedelta(days=i)).isoformat(),
            "questions": 0, "correct": 0, "minutes": 0,
        }
        for i in range(DIGEST_DAYS)
    }
    questions = correct = seconds = 0
    for row in rows:
        ts = _row_utc(row)
        if ts is None:
            continue
        day = per_day.get(ts.date().isoformat())
        if day is None:
            continue  # defensive; the query already bounds the window
        was_correct = _row_correct(row)
        sec = _row_seconds(row)
        questions += 1
        if was_correct:
            correct += 1
        seconds += sec
        day["questions"] += 1
        day["correct"] += 1 if was_correct else 0
        day["minutes"] += sec // 60

    active_days = sum(1 for d in per_day.values() if d["questions"] > 0)
    accuracy = round(correct * 100.0 / questions, 1) if questions > 0 else None
    xp = correct * XP_PER_CORRECT + (questions - correct) * XP_PER_INCORRECT

    # ---- Strongest / weakest topic actually PRACTICED this week ----
    top_topic = weakest_topic = None
    try:
        from backend.models.content import KnowledgeNodeModel
        from backend.models.progress import MasteryRecord

        trows = (
            await db.execute(
                select(MasteryRecord, KnowledgeNodeModel)
                .join(KnowledgeNodeModel, KnowledgeNodeModel.node_id == MasteryRecord.node_id)
                .where(
                    MasteryRecord.user_id == student.id,
                    MasteryRecord.attempts > 0,
                    MasteryRecord.last_attempt_at.isnot(None),
                    MasteryRecord.last_attempt_at >= window_start,
                )
            )
        ).all()
        topics = [
            {
                "name": node.label,
                "subject": node.subject,
                "mastery": round(float(rec.mastery_probability or 0.0) * 100, 1),
                "attempts": int(rec.attempts or 0),
            }
            for rec, node in trows
        ]
        if topics:
            top_topic = max(topics, key=lambda t: (t["mastery"], t["attempts"]))
            weakest_topic = min(topics, key=lambda t: (t["mastery"], -t["attempts"]))
    except Exception as exc:
        logger.warning("digest topics unavailable for %s: %s", student.id, exc)

    streak = _streak_state(student, today)

    return {
        "student_id": str(student.id),
        "student_name": student.name,
        "class_level": student.class_level,
        "week_start": week_start_date.isoformat(),
        "week_end": today.isoformat(),
        "has_activity": questions > 0,
        "questions": questions,
        "correct": correct,
        "accuracy": accuracy,
        "minutes": seconds // 60,
        "xp": xp,
        "active_days": active_days,
        "streak": streak,
        "top_topic": top_topic,
        "weakest_topic": weakest_topic,
        "by_day": list(per_day.values()),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }


# ---------------------------------------------------------------------------
# Consolidated daily surface — one call for the habit loop
# ---------------------------------------------------------------------------

@router.get("/daily")
async def get_daily(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Everything the student needs for today's session in one payload:
    streak state, goal progress, due SM-2 reviews, and a suggested action.
    """
    today = _server_today()
    goal_payload = await _goal_payload(user, db)
    streak = goal_payload["streak"]

    due_items: list[Any] = []
    try:
        from backend.services.progress_service import ProgressService
        due_items = await ProgressService.get_review_queue(db, str(user.id))
    except Exception:
        pass  # queue table may be absent in minimal deployments

    completed = goal_payload["completed"]
    due_count = len(due_items)
    if due_count:
        action = {
            "kind": "review",
            "label": f"{due_count} review question"
                     f"{'s' if due_count != 1 else ''} due",
            "href": "/review",
        }
    elif not completed:
        action = {
            "kind": "goal",
            "label": "Finish today's goal",
            "href": "/practice",
        }
    else:
        action = {
            "kind": "explore",
            "label": "Learn something new",
            "href": "/galaxy",
        }

    return {
        "server_date": today.isoformat(),
        "streak": streak,
        "goal": goal_payload["goal"],
        "today": goal_payload["today"],
        "completed": completed,
        "due_reviews": due_count,
        "due_items": [
            {
                "id": str(getattr(i, "id", "")),
                "topic": getattr(i, "topic", None),
                "node_id": getattr(i, "node_id", None),
            }
            for i in due_items[:10]
        ],
        "suggested_action": action,
    }
