"""
Dashboard Data API Router -- CISCE K-12 Learning Platform
=========================================================

Endpoints:
  GET  /api/dashboard/student/{student_id}          Student dashboard
  GET  /api/dashboard/parent/{parent_id}            Parent dashboard
  GET  /api/dashboard/teacher/{teacher_id}          Teacher dashboard
  GET  /api/dashboard/student/{student_id}/recent   Recent activity feed
  GET  /api/dashboard/student/{student_id}/achievements  Earned achievements
  GET  /api/dashboard/health                         Health check
"""

from __future__ import annotations

import logging
from datetime import date, datetime, timedelta, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc

from backend.deps import canonical_user_id, get_current_user_optional  # noqa: E402
from backend.services.honesty_metrics import (
    rounded_minutes,
    weighted_overall_mastery,
)
from backend.services.streak_state import (  # noqa: E402
    STREAK_NONE,
    STREAK_UNKNOWN,
    classify_streak,
    unknown_streak,
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

# ---------------------------------------------------------------------------
# Optional database imports
# ---------------------------------------------------------------------------
try:
    from database import get_db
    _HAS_DB = True
except ImportError:
    _HAS_DB = False
    get_db = None  # type: ignore

try:
    from database import Student, Parent, Teacher, Attempt, Mastery, Topic, PracticeSession  # type: ignore
    _HAS_MODELS = True
except ImportError:
    _HAS_MODELS = False
    Student = None  # type: ignore
    Parent = None  # type: ignore
    Teacher = None  # type: ignore
    ActivityLog = None  # type: ignore
    Attempt = None  # type: ignore
    Mastery = None  # type: ignore
    Subject = None  # type: ignore
    Topic = None  # type: ignore

# Parent↔student links live in parent_student_links (users↔users) —
# the real auth link table from services/auth_service.py.
try:
    from backend.services.auth_service import ParentStudentLinkModel  # type: ignore
    from backend.models.user import User as UserModel  # type: ignore
except ImportError:
    ParentStudentLinkModel = None  # type: ignore
    UserModel = None  # type: ignore

# ---------------------------------------------------------------------------
# Optional service imports
# ---------------------------------------------------------------------------
try:
    from services.progress_service_v2 import ProgressServiceV2  # type: ignore
    _HAS_PROGRESS_SVC = True
except ImportError:
    _HAS_PROGRESS_SVC = False

try:
    from services.achievement_service import AchievementService  # type: ignore
    _HAS_ACHIEVEMENT_SVC = True
except ImportError:
    _HAS_ACHIEVEMENT_SVC = False


# ---------------------------------------------------------------------------
# Pydantic v2 response schemas
# ---------------------------------------------------------------------------

class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Overall health status")
    timestamp: str = Field(..., description="ISO timestamp of check")
    services: dict[str, str] = Field(..., description="Per-service availability")
    database: str = Field(..., description="Database connection status")

    model_config = {"json_schema_extra": {
        "example": {
            "status": "healthy",
            "timestamp": "2026-01-15T10:30:00+00:00",
            "services": {
                "progress_service": "available",
                "achievement_service": "available",
            },
            "database": "connected",
        }
    }}


class StreakData(BaseModel):
    """Student streak information."""

    current_streak: int = Field(
        ..., ge=0,
        description=(
            "Streak in days, but only while it is genuinely alive: a lapsed "
            "streak reads 0 (single source of truth: services/streak_state.py)"
        ),
    )
    # No column records a personal best, so this is None (unknown) instead of a
    # copy of the current streak, which would invent a fact the DB does not hold.
    longest_streak: Optional[int] = Field(
        None, ge=0, description="Personal best streak; null when unknown"
    )
    last_active_date: Optional[str] = Field(None, description="ISO date of last activity")
    recorded_streak: int = Field(
        0, ge=0,
        description="Raw stored counter before decay, so nothing is hidden",
    )
    streak_state: str = Field(
        STREAK_UNKNOWN,
        description="none | active_today | at_risk | lapsed | unknown",
    )
    streak_freeze_available: bool = Field(False, description="Whether a streak freeze is available")

    model_config = {"json_schema_extra": {
        "example": {
            "current_streak": 5,
            "longest_streak": None,
            "last_active_date": "2026-01-14",
            "recorded_streak": 5,
            "streak_state": "at_risk",
            "streak_freeze_available": False,
        }
    }}


class XPData(BaseModel):
    """Student XP and level data."""

    total_xp: int = Field(..., ge=0, description="Lifetime earned XP")
    level: int = Field(..., ge=1, description="Current level")
    current_level_xp: int = Field(..., ge=0, description="XP earned toward current level")
    xp_to_next_level: int = Field(..., ge=0, description="XP required to reach next level")

    model_config = {"json_schema_extra": {
        "example": {
            "total_xp": 2450,
            "level": 7,
            "current_level_xp": 450,
            "xp_to_next_level": 500,
        }
    }}


class TopicMastery(BaseModel):
    """Per-topic mastery breakdown."""

    topic_id: str = Field(..., description="Topic identifier")
    topic_name: str = Field(..., description="Human-readable topic name")
    subject_name: str = Field(..., description="Subject this topic belongs to")
    mastery_score: float = Field(..., ge=0, le=100, description="Mastery percentage 0-100")
    attempts: int = Field(..., ge=0, description="Total practice attempts on this topic")
    last_practiced: Optional[str] = Field(None, description="ISO date of last practice")

    model_config = {"json_schema_extra": {
        "example": {
            "topic_id": "math-quadratic",
            "topic_name": "Quadratic Equations",
            "subject_name": "Mathematics",
            "mastery_score": 72.5,
            "attempts": 14,
            "last_practiced": "2026-01-13",
        }
    }}


class Recommendation(BaseModel):
    """Personalized learning recommendation."""

    type: str = Field(..., description="Recommendation type: practice / review / challenge")
    topic_id: Optional[str] = Field(None, description="Related topic if applicable")
    title: str = Field(..., description="Short recommendation title")
    description: str = Field(..., description="Detailed guidance for the student")
    priority: str = Field(..., description="Priority: high / medium / low")
    estimated_minutes: int = Field(..., ge=1, description="Estimated time to complete")

    model_config = {"json_schema_extra": {
        "example": {
            "type": "practice",
            "topic_id": "math-quadratic",
            "title": "Practice Quadratic Equations",
            "description": "Your mastery is at 35%. Strengthen fundamentals with guided problems.",
            "priority": "high",
            "estimated_minutes": 15,
        }
    }}


class StudentDashboardResponse(BaseModel):
    """Full student dashboard payload."""

    student_id: str
    student_name: str
    grade: str
    streak: StreakData
    xp: XPData
    # None means "no mastery records yet" — which is NOT 0% mastery. A child
    # who has never practised was shown a confident 0.0% headline number; the
    # frontend contract already types this as `number | null`.
    mastery_overall: Optional[float] = Field(
        None, ge=0, le=100, description="Attempt-weighted overall mastery, or null when unmeasured"
    )
    mastery_by_topic: list[TopicMastery] = Field(default_factory=list)
    recommendations: list[Recommendation] = Field(default_factory=list)
    generated_at: str

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-001",
            "student_name": "Rahul Sharma",
            "grade": "10",
            "streak": {"current_streak": 5, "longest_streak": None, "last_active_date": "2026-01-14", "recorded_streak": 5, "streak_state": "at_risk", "streak_freeze_available": False},
            "xp": {"total_xp": 2450, "level": 7, "current_level_xp": 450, "xp_to_next_level": 500},
            "mastery_overall": 65.3,
            "mastery_by_topic": [],
            "recommendations": [],
            "generated_at": "2026-01-15T10:30:00+00:00",
        }
    }}


class RecentAttempt(BaseModel):
    """One real recorded practice attempt by the child (activity_log row)."""

    title: str = Field("", description="Activity title (e.g. the practiced question)")
    subject: Optional[str] = Field(None, description="Subject, when recorded")
    correct: Optional[bool] = Field(None, description="Correct / incorrect, when recorded")
    seconds: Optional[int] = Field(None, description="Time spent in seconds, when recorded")
    at: str = Field("", description="ISO timestamp of the attempt")


class ChildProgressSummary(BaseModel):
    """Summary of a single child for parent dashboard."""

    student_id: str
    student_name: str
    grade: str
    overall_mastery: float = Field(..., ge=0, le=100)
    total_xp: int = Field(..., ge=0)
    current_level: int = Field(..., ge=1)
    current_streak: int = Field(..., ge=0)
    weekly_practice_minutes: int = Field(..., ge=0)
    # False means the weekly total could not be read (a failed query), which is
    # NOT the same as 0 minutes. Consumers must not render an unread value as
    # "your child did not practise this week".
    weekly_practice_measured: bool = Field(
        True, description="Whether weekly_practice_minutes is a real measurement"
    )
    subjects_practiced: list[str] = Field(default_factory=list)
    # Real practice activity (activity_log quiz rows written by practice
    # submissions). has_data=False means the child has not engaged yet —
    # consumers must show an honest "no activity yet" state, not zeros-as-data.
    practice_attempts: int = Field(0, ge=0, description="Recorded practice answers (all time)")
    practice_correct: int = Field(0, ge=0, description="Recorded correct practice answers")
    last_active_at: Optional[str] = Field(None, description="ISO timestamp of last recorded activity")
    has_data: bool = Field(False, description="Whether the child has any recorded engagement")
    recent_attempts: list[RecentAttempt] = Field(default_factory=list, description="Last recorded attempts, newest first")
    has_mastery_data: bool = Field(False, description="Whether any mastery records exist for the child")


class ParentInsight(BaseModel):
    """Actionable insight for a parent."""

    category: str = Field(..., description="Insight category: performance / engagement / trends")
    title: str = Field(..., description="Short headline")
    detail: str = Field(..., description="Elaboration with context")
    trend: str = Field(..., description="Trend direction: improving / stable / declining")
    value: Optional[float] = Field(None, description="Numeric value associated with the insight")


class ParentAlert(BaseModel):
    """Alert requiring parent attention."""

    alert_type: str = Field(..., description="Alert category identifier")
    severity: str = Field(..., description="Severity: info / warning / urgent")
    message: str = Field(..., description="Human-readable alert message")
    created_at: str = Field(..., description="ISO timestamp when alert was generated")
    action_required: bool = Field(..., description="Whether parent action is needed")


class ParentDashboardResponse(BaseModel):
    """Full parent dashboard payload."""

    parent_id: str
    parent_name: str
    children: list[ChildProgressSummary] = Field(default_factory=list)
    insights: list[ParentInsight] = Field(default_factory=list)
    alerts: list[ParentAlert] = Field(default_factory=list)
    generated_at: str


class SubjectOverview(BaseModel):
    """Per-subject class overview for teacher."""

    subject_id: str
    subject_name: str
    total_students: int = Field(..., ge=0)
    avg_mastery: float = Field(..., ge=0, le=100)
    completion_rate: float = Field(..., ge=0, le=100)


class StrugglingStudent(BaseModel):
    """Student flagged as needing support."""

    student_id: str
    student_name: str
    topics_struggling: list[str] = Field(default_factory=list)
    avg_mastery: float = Field(..., ge=0, le=100)
    missed_sessions: int = Field(..., ge=0)
    last_active: Optional[str] = Field(None, description="ISO date of last activity")


class TeacherDashboardResponse(BaseModel):
    """Full teacher dashboard payload."""

    teacher_id: str
    teacher_name: str
    class_name: str
    total_students: int = Field(..., ge=0)
    active_students: int = Field(..., ge=0)
    subject_overviews: list[SubjectOverview] = Field(default_factory=list)
    struggling_students: list[StrugglingStudent] = Field(default_factory=list)
    recent_class_activity: list[dict[str, Any]] = Field(default_factory=list)
    generated_at: str


class ActivityItem(BaseModel):
    """A single entry in the activity feed."""

    activity_id: str
    type: str = Field(..., description="Activity type identifier")
    title: str = Field(..., description="Short title")
    description: str = Field(..., description="Full description")
    subject: Optional[str] = Field(None, description="Related subject slug")
    topic: Optional[str] = Field(None, description="Related topic slug")
    xp_earned: int = Field(..., ge=0)
    mastery_delta: Optional[float] = Field(None, description="Change in mastery score")
    timestamp: str = Field(..., description="ISO timestamp")
    metadata: Optional[dict[str, Any]] = Field(None, description="Arbitrary extra data")


class RecentActivityResponse(BaseModel):
    """Paginated recent activity feed."""

    student_id: str
    activities: list[ActivityItem] = Field(default_factory=list)
    has_more: bool = Field(..., description="Whether more pages exist")
    total_count: int = Field(..., ge=0, description="Total matching records")


class AchievementItem(BaseModel):
    """A single earned achievement."""

    achievement_id: str
    name: str = Field(..., description="Achievement title")
    description: str = Field(..., description="What the student accomplished")
    icon: str = Field(..., description="Icon identifier")
    category: str = Field(..., description="Achievement category")
    earned_at: str = Field(..., description="ISO timestamp of earning")
    rarity: str = Field(..., description="Rarity: common / rare / epic / legendary")
    xp_bonus: int = Field(..., ge=0)
    progress: Optional[float] = Field(None, ge=0, le=100, description="Progress for multi-tier achievements")


class AchievementsResponse(BaseModel):
    """All achievements for a student."""

    student_id: str
    total_earned: int = Field(..., ge=0)
    achievements: list[AchievementItem] = Field(default_factory=list)
    recent_achievements: list[AchievementItem] = Field(default_factory=list, description="Earned in the last 7 days")
    # False means BOTH read paths failed and this payload is empty because we
    # could not look, not because the child has earned nothing. The two must
    # never look the same to a child: "no badges yet" is encouraging, "we could
    # not load your badges" is a bug report.
    source_readable: bool = Field(
        True, description="Whether total_earned/achievements are a real reading"
    )


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _build_recommendations(mastery_by_topic: list[dict[str, Any]]) -> list[Recommendation]:
    """Generate simple rule-based recommendations from topic mastery data."""
    recommendations: list[Recommendation] = []

    low = [t for t in mastery_by_topic if float(t.get("mastery_score", 0)) < 50]
    medium = [t for t in mastery_by_topic if 50 <= float(t.get("mastery_score", 0)) < 80]
    high = [t for t in mastery_by_topic if float(t.get("mastery_score", 0)) >= 80]

    for t in low[:3]:
        recommendations.append(Recommendation(
            type="practice",
            topic_id=t.get("topic_id"),
            title="Practice " + str(t.get("topic_name", "Topic")),
            description=(
                "Mastery is at "
                + str(round(float(t.get("mastery_score", 0)))) 
                + "%. Strengthen fundamentals with guided problems."
            ),
            priority="high",
            estimated_minutes=15,
        ))

    for t in medium[:2]:
        recommendations.append(Recommendation(
            type="review",
            topic_id=t.get("topic_id"),
            title="Review " + str(t.get("topic_name", "Topic")),
            description=(
                "You are at "
                + str(round(float(t.get("mastery_score", 0))))
                + "% mastery. A quick review will help you reach proficiency."
            ),
            priority="medium",
            estimated_minutes=10,
        ))

    for t in high[:1]:
        recommendations.append(Recommendation(
            type="challenge",
            topic_id=t.get("topic_id"),
            title="Challenge: " + str(t.get("topic_name", "Topic")),
            description=(
                "Great work at "
                + str(round(float(t.get("mastery_score", 0))))
                + "%! Test yourself with harder problems."
            ),
            priority="low",
            estimated_minutes=20,
        ))

    if not recommendations:
        recommendations.append(Recommendation(
            type="practice",
            topic_id=None,
            title="Start Practicing",
            description="Begin your learning journey with any topic in your curriculum.",
            priority="high",
            estimated_minutes=15,
        ))

    return recommendations


async def _get_service_progress(db: AsyncSession, student_id: str) -> dict[str, Any]:
    """Mastery by topic, computed directly from mastery_records ⋈ knowledge_nodes.

    (ProgressServiceV2 exposes a different call surface, and the old service
    calls here always fell to defaults, so every dashboard read zeros. Query
    the real tables instead.)
    """
    # `overall` is None when there is nothing to measure — see honesty_metrics.
    default: dict[str, Any] = {"overall": None, "by_topic": [], "topics": 0, "attempts": 0}
    try:
        from backend.models.progress import MasteryRecord
        from backend.models.content import KnowledgeNodeModel

        rows = (
            await db.execute(
                select(MasteryRecord, KnowledgeNodeModel)
                .join(KnowledgeNodeModel, KnowledgeNodeModel.node_id == MasteryRecord.node_id)
                .where(MasteryRecord.user_id == student_id)
                .order_by(MasteryRecord.updated_at.desc())
            )
        ).all()
        if not rows:
            return default
        by_topic: list[dict[str, Any]] = []
        for rec, node in rows:
            by_topic.append(
                {
                    # NOTE: this id is a KNOWLEDGE NODE id, not a topic id. The
                    # key is kept as `topic_id` because the frontend contract
                    # (TopicMastery.topic_id) names it that; `node_id` is now
                    # also emitted so consumers stop having to guess.
                    "topic_id": node.node_id,
                    "node_id": node.node_id,
                    "topic_name": node.label,
                    "subject_id": (node.subject or "unknown").lower(),
                    "subject_name": node.subject or "Unknown",
                    "mastery_score": round(float(rec.mastery_probability or 0.0) * 100, 1),
                    "attempts": int(rec.attempts or 0),
                    "last_practiced": rec.last_attempt_at.isoformat() if rec.last_attempt_at else None,
                }
            )
        # Attempt-weighted, not a flat average over topics — see
        # services/honesty_metrics.py for why (this number gates an URGENT
        # parent alert at < 30%, so one stray topic must not dominate it).
        overall, total_attempts = weighted_overall_mastery(by_topic)
        return {
            "overall": overall,
            "by_topic": by_topic,
            # Exposed so a surface can say "across N topics, M attempts"
            # instead of presenting a bare percentage.
            "topics": len(by_topic),
            "attempts": total_attempts,
        }
    except Exception as exc:
        logger.warning("mastery query error for %s: %s", student_id, exc)
        return default


async def _get_service_xp(db: AsyncSession, student_id: str) -> dict[str, Any]:
    """XP/level summary — canonical derivation (services/reward_ledger.py).

    Level is ALWAYS re-derived from total_xp with the canonical formula; the
    users.current_level column is a write cache the ledger maintains and no
    reader may trust it over a fresh derivation. The student dashboard
    (ProgressService.get_dashboard) uses the same function, so both surfaces
    can no longer disagree about a level.
    """
    try:
        from backend.services.reward_ledger import level_breakdown
    except ImportError:  # pragma: no cover - fallback keeps the shape
        def level_breakdown(xp):
            xp = int(xp or 0)
            return {"level": max(1, xp // 100 + 1),
                    "current_level_xp": xp % 100,
                    "xp_to_next_level": 100 - (xp % 100)}

    try:
        from backend.models.user import User as _User

        row = (
            await db.execute(
                select(_User.total_xp).where(_User.id == student_id)
            )
        ).first()
        if row is None:
            return {
                "total_xp": 0,
                "level": 1,
                "current_level_xp": 0,
                "xp_to_next_level": 100,
            }
        total_xp = int(row[0] or 0)
        breakdown = level_breakdown(total_xp)
        return {
            "total_xp": total_xp,
            "level": breakdown["level"],
            "current_level_xp": breakdown["current_level_xp"],
            "xp_to_next_level": breakdown["xp_to_next_level"],
        }
    except Exception as exc:
        logger.warning("xp query error for %s: %s", student_id, exc)
        return {
            "total_xp": 0,
            "level": 1,
            "current_level_xp": 0,
            "xp_to_next_level": 100,
        }


async def _get_service_streak(db: AsyncSession, student_id: str) -> dict[str, Any]:
    """Streak summary from the users row (streak_days / last_activity_date).

    `streak_days` is a counter that `update_streak` decays LAZILY, on the
    student's next practice, so it is not a current streak on its own. It is
    classified by `classify_streak` (services/streak_state.py), which mirrors
    the writer's day math exactly and zeroes a lapsed streak.

    `longest_streak` is None (unknown): no column records a personal best, so
    copying the current counter into it would report an invented fact.
    """
    try:
        from backend.models.user import User as _User

        row = (
            await db.execute(
                select(_User.streak_days, _User.last_activity_date).where(_User.id == student_id)
            )
        ).first()
        if row is None:
            return {
                "current_streak": 0,
                "recorded_streak": 0,
                "longest_streak": None,
                "state": STREAK_NONE,
                "last_active_date": None,
                "days_since_last": None,
                "streak_freeze_available": False,
            }
        state = classify_streak(row[0], row[1])
        # Honest freeze availability: read the REAL token balance from the
        # canonical ledger's streak_freezes table — this used to hardcode
        # False while the writer happily consumed tokens, so the badge and
        # the balance disagreed.
        freeze_available = False
        try:
            from backend.services.reward_ledger import get_freeze_tokens

            freeze_available = await get_freeze_tokens(db, student_id) > 0
        except Exception as exc:
            logger.warning("freeze token read failed for %s: %s", student_id, exc)
        return {
            "current_streak": state["current_streak"],
            "recorded_streak": state["recorded_streak"],
            "longest_streak": None,
            "state": state["state"],
            "last_active_date": state["last_activity_date"],
            "days_since_last": state["days_since_last"],
            "streak_freeze_available": freeze_available,
        }
    except Exception as exc:
        # A failed read is NOT a zero streak: report "unknown" so no surface
        # tells a student (or a parent) their streak is 0 on a DB blip.
        logger.warning("streak query error for %s: %s", student_id, exc)
        return {
            **unknown_streak(),
            "longest_streak": None,
            "streak_freeze_available": False,
        }


async def _get_weekly_practice_minutes(
    db: AsyncSession, student_id: str
) -> dict[str, Any]:
    """Practice minutes over the last 7 days from activity-log metadata.

    Returns `{"minutes": int, "measured": bool}`.

    `measured=False` means the number could not be read. Returning a bare 0 on
    failure is the same conflation this codebase already fixed for streaks: "0
    minutes" is a real measurement (this child did not practise this week) and
    must stay distinguishable from "we could not find out", which otherwise
    reads to a parent as a worrying drop-off.

    Minutes are ROUNDED, not floored. Flooring reported a child who practised
    for 30 seconds as 0 minutes, i.e. a real session displayed as no session.
    """
    if db is None:
        return {"minutes": 0, "measured": False}
    try:
        from backend.models.progress import ActivityLog as _ActivityLog

        start = datetime.now(timezone.utc) - timedelta(days=7)
        metas = (await db.execute(
            select(_ActivityLog.extra_data).where(
                _ActivityLog.user_id == student_id,
                _ActivityLog.created_at >= start,
            )
        )).scalars().all()
        total_seconds = 0
        for meta in metas:
            if isinstance(meta, dict):
                try:
                    total_seconds += int(meta.get("time_taken_seconds") or 0)
                except (TypeError, ValueError):
                    pass
        return {"minutes": rounded_minutes(total_seconds), "measured": True}
    except Exception as exc:
        logger.warning("weekly practice minutes error for %s: %s", student_id, exc)
        return {"minutes": 0, "measured": False}


async def _get_practice_activity(
    db: AsyncSession, student_id: str, recent_limit: int = 20
) -> dict[str, Any]:
    """Real practice activity for a child, from activity_log quiz rows.

    These rows are written by actual practice submissions (api/practice.py),
    so counts reflect genuine answered questions — never synthesized.
    Returns aggregate counts, per-week buckets (for honest trend direction),
    and the most recent attempts (newest first).
    """
    empty: dict[str, Any] = {
        "attempts": 0,
        "correct": 0,
        "last_active_at": None,
        "this_week": 0,
        "last_week": 0,
        "recent": [],
    }
    if db is None:
        return empty
    try:
        from backend.models.progress import ActivityLog as _ActivityLog

        rows = (await db.execute(
            select(_ActivityLog)
            .where(
                _ActivityLog.user_id == student_id,
                _ActivityLog.activity_type == "quiz",
            )
            .order_by(desc(_ActivityLog.created_at))
            .limit(5000)
        )).scalars().all()

        now = datetime.now(timezone.utc)
        week_start = (now - timedelta(days=now.weekday())).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        prev_week_start = week_start - timedelta(days=7)

        out: dict[str, Any] = {"attempts": 0, "correct": 0, "last_active_at": None,
                               "this_week": 0, "last_week": 0, "recent": []}
        for i, row in enumerate(rows):
            ts = row.created_at
            if ts is None:
                continue
            if ts.tzinfo is None:
                ts = ts.replace(tzinfo=timezone.utc)
            out["attempts"] += 1
            if str(row.score or "").strip().lower() == "correct":
                out["correct"] += 1
            if out["last_active_at"] is None:
                out["last_active_at"] = ts.isoformat()
            if ts >= week_start:
                out["this_week"] += 1
            elif ts >= prev_week_start:
                out["last_week"] += 1
            if i < recent_limit:
                meta = row.extra_data if isinstance(row.extra_data, dict) else {}
                correct_raw = meta.get("is_correct")
                if correct_raw is None and row.score:
                    correct_raw = str(row.score).strip().lower() == "correct"
                seconds = None
                try:
                    seconds = int(meta.get("time_taken_seconds")) if meta.get("time_taken_seconds") is not None else None
                except (TypeError, ValueError):
                    seconds = None
                out["recent"].append({
                    "title": str(row.title or ""),
                    "subject": row.subject,
                    "correct": bool(correct_raw) if correct_raw is not None else None,
                    "seconds": seconds,
                    "at": ts.isoformat(),
                })
        return out
    except Exception as exc:
        logger.warning("practice activity error for %s: %s", student_id, exc)
        return empty


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Check API health and availability of downstream services."""
    now = datetime.now(timezone.utc)
    services: dict[str, str] = {}

    services["progress_service"] = "available" if _HAS_PROGRESS_SVC else "unavailable"
    services["achievement_service"] = "available" if _HAS_ACHIEVEMENT_SVC else "unavailable"

    db_status = "connected" if _HAS_DB else "not_configured"

    return HealthResponse(
        status="healthy",
        timestamp=now.isoformat(),
        services=services,
        database=db_status,
    )


def _require_self_or_staff(user, target_id: str, target_role: str):
    """IDOR guard for role-scoped dashboard reads.

    Owner always passes.  Student targets are additionally readable by
    teacher/parent/admin roles (dashboard consumption by staff/family);
    parent and teacher targets are owner-or-admin only.
    """
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )
    # Malformed target ids can never match a row; letting them through used to
    # 500 on the GUID bind (ValueError: badly formed hexadecimal UUID string)
    # once a staff/parent token passed the role checks below. Reject as 422.
    target_id = canonical_user_id(target_id)
    if str(getattr(user, "id", "")) == str(target_id):
        return
    role = str(getattr(user, "role", "") or "").lower()
    if role == "admin":
        return
    if target_role == "student" and role in ("teacher", "parent"):
        return
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Cannot read another user's dashboard",
    )


@router.get("/student/{student_id}", response_model=StudentDashboardResponse)
async def get_student_dashboard(
    student_id: str,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
) -> StudentDashboardResponse:
    """
    Return the complete dashboard for a student.

    Includes current streak, XP/level summary, topic-level mastery breakdown,
    and personalized recommendations.
    """
    if Student is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    _require_self_or_staff(user, student_id, "student")

    # parent readers must be LINKED to this student, not merely parents
    if (str(getattr(user, "role", "") or "").lower() == "parent"
            and ParentStudentLinkModel is not None):
        linked = (await db.execute(
            select(ParentStudentLinkModel.student_id)
            .where(ParentStudentLinkModel.parent_id == str(user.id))
            .where(ParentStudentLinkModel.student_id == str(student_id))
            .limit(1)
        )).scalar_one_or_none()
        if linked is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Parent is not linked to this student",
            )

    result = await db.execute(select(Student).where(Student.id == student_id))
    student = result.scalar_one_or_none()
    if student is None:
        # First-run provisioning: signups on legacy accounts created only
        # the users row, so brand-new uids 404ed here.  An authenticated
        # student requesting their OWN uid gets an honest empty profile.
        if (user is not None and str(user.id) == str(student_id)
                and str(getattr(user, "role", "") or "").lower() == "student"):
            student = Student(
                id=student_id,
                name=user.name,
                student_class=(str(user.class_level)
                               if getattr(user, "class_level", None) else None),
            )
            db.add(student)
            await db.commit()
            await db.refresh(student)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Student '{student_id}' not found",
            )
    elif (not student.student_class and user is not None
          and str(user.id) == str(student_id)
          and getattr(user, "class_level", None)):
        # Backfill the class from the users row so the practice selector
        # can gate the question pool (class-leak fix).
        student.student_class = str(user.class_level)
        db.add(student)
        await db.commit()
        await db.refresh(student)

    # ---- Streak ----
    streak_raw = await _get_service_streak(db, student_id)
    streak_data = StreakData(
        current_streak=int(streak_raw.get("current_streak", 0)),
        longest_streak=streak_raw.get("longest_streak"),
        last_active_date=streak_raw.get("last_active_date"),
        recorded_streak=int(streak_raw.get("recorded_streak", 0)),
        streak_state=str(streak_raw.get("state", STREAK_UNKNOWN)),
        streak_freeze_available=bool(streak_raw.get("streak_freeze_available", False)),
    )

    # ---- XP / Level ----
    xp_raw = await _get_service_xp(db, student_id)
    xp_data = XPData(
        total_xp=int(xp_raw.get("total_xp", 0)),
        level=int(xp_raw.get("level", 1)),
        current_level_xp=int(xp_raw.get("current_level_xp", 0)),
        xp_to_next_level=int(xp_raw.get("xp_to_next_level", 100)),
    )

    # ---- Mastery ----
    mastery_raw = await _get_service_progress(db, student_id)
    # Pass through as-is: None means unmeasured, and must not become 0.0.
    mastery_overall = mastery_raw.get("overall")
    by_topic_raw = mastery_raw.get("by_topic", [])
    if not isinstance(by_topic_raw, list):
        by_topic_raw = []

    topic_list: list[TopicMastery] = []
    for tm in by_topic_raw:
        topic_list.append(TopicMastery(
            topic_id=str(tm.get("topic_id", "")),
            topic_name=str(tm.get("topic_name", "")),
            subject_name=str(tm.get("subject_name", "")),
            mastery_score=float(tm.get("mastery_score", 0.0)),
            attempts=int(tm.get("attempts", 0)),
            last_practiced=tm.get("last_practiced"),
        ))

    # ---- Recommendations ----
    recs = _build_recommendations(by_topic_raw)

    return StudentDashboardResponse(
        student_id=str(student.id),
        student_name=student.name,
        grade=str(student.student_class) if student.student_class else "",
        streak=streak_data,
        xp=xp_data,
        mastery_overall=mastery_overall,
        mastery_by_topic=topic_list,
        recommendations=recs,
        generated_at=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/parent/{parent_id}", response_model=ParentDashboardResponse)
async def get_parent_dashboard(
    parent_id: str,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
) -> ParentDashboardResponse:
    """
    Return the dashboard for a parent, covering all linked children.

    Includes per-child progress summaries, aggregate insights, and alerts
    that may require parent action.
    """
    _require_self_or_staff(user, parent_id, "parent")
    if ParentStudentLinkModel is None or UserModel is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    # parent_id is the parent's users.id — verify it exists and is a parent
    result = await db.execute(select(UserModel).where(UserModel.id == parent_id))
    parent = result.scalar_one_or_none()
    if parent is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parent '{parent_id}' not found",
        )
    if getattr(parent, "role", None) != "parent":
        # Student-login fallback: resolve the parent linked to this student
        # (parent_student_links) so a demo student login can view their own
        # child dashboard via /parent-overview. Keeps the 403 for unrelated ids.
        linked_parent_id = (
            await db.execute(
                select(ParentStudentLinkModel.parent_id)
                .where(ParentStudentLinkModel.student_id == parent_id)
                .limit(1)
            )
        ).scalar_one_or_none()
        if linked_parent_id is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not a parent account",
            )
        parent_id = str(linked_parent_id)
        parent = (
            await db.execute(select(UserModel).where(UserModel.id == parent_id))
        ).scalar_one()

    # Linked children via parent_student_links (parent_id → student users.id)
    enroll_rows = (await db.execute(
        select(ParentStudentLinkModel.student_id)
        .where(ParentStudentLinkModel.parent_id == parent_id)
    )).scalars().all()

    children: list[ChildProgressSummary] = []
    for student_id in enroll_rows:
        child_row = (await db.execute(
            select(UserModel).where(UserModel.id == student_id)
        )).scalar_one_or_none()
        if child_row is None:
            continue

        overall_mastery = 0.0
        total_xp = 0
        current_level = 1
        current_streak = 0

        mastery_data = await _get_service_progress(db, child_row.id)
        # `overall` is None when nothing is measured; the parent view needs a
        # number, but every consumer below is gated on has_mastery_data, so 0.0
        # is only ever reached when there genuinely is no mastery record.
        overall_mastery = float(mastery_data.get("overall") or 0.0)
        has_mastery_data = bool(mastery_data.get("by_topic"))

        xp_info = await _get_service_xp(db, child_row.id)
        total_xp = int(xp_info.get("total_xp", 0))
        current_level = int(xp_info.get("level", 1))

        streak_info = await _get_service_streak(db, child_row.id)
        current_streak = int(streak_info.get("current_streak", 0))

        weekly = await _get_weekly_practice_minutes(db, str(child_row.id))
        weekly_minutes = int(weekly["minutes"])

        # Real practice activity (activity_log quiz rows written by practice
        # submissions) — attempts/correct counts, recency, and the actual
        # recent attempts. No fabricated numbers anywhere.
        activity = await _get_practice_activity(db, str(child_row.id))
        has_data = bool(
            activity.get("attempts") or total_xp > 0 or has_mastery_data
        )

        children.append(ChildProgressSummary(
            student_id=str(child_row.id),
            student_name=child_row.name,
            grade=str(child_row.class_level) if child_row.class_level else "",
            overall_mastery=overall_mastery,
            total_xp=total_xp,
            current_level=current_level,
            current_streak=current_streak,
            weekly_practice_minutes=weekly_minutes,
            weekly_practice_measured=bool(weekly["measured"]),
            subjects_practiced=sorted({
                str(t.get("subject_name", ""))
                for t in (mastery_data.get("by_topic") or [])
                if t.get("subject_name")
            }),
            practice_attempts=int(activity.get("attempts", 0)),
            practice_correct=int(activity.get("correct", 0)),
            last_active_at=activity.get("last_active_at"),
            has_data=has_data,
            recent_attempts=[RecentAttempt(**a) for a in activity.get("recent", [])],
            has_mastery_data=has_mastery_data,
        ))

    # ---- Insights ----
    # Only generated from REAL recorded data. A child who has never engaged
    # gets no performance verdict (no fabricated "0%" or "declining").
    insights: list[ParentInsight] = []
    engaging = [c for c in children if c.has_data]
    if engaging:
        with_mastery = [c for c in engaging if c.has_mastery_data]
        if with_mastery:
            avg = sum(c.overall_mastery for c in with_mastery) / len(with_mastery)
            if avg < 40:
                insights.append(ParentInsight(
                    category="performance",
                    title="Needs Attention",
                    detail="Average mastery is below 40%. Consider scheduling extra practice time.",
                    trend="stable",
                    value=round(avg, 1),
                ))
            elif avg >= 80:
                insights.append(ParentInsight(
                    category="performance",
                    title="Excellent Progress",
                    detail="Mastery is above 80 percent. Keep up the regular practice.",
                    trend="stable",
                    value=round(avg, 1),
                ))
            else:
                insights.append(ParentInsight(
                    category="performance",
                    title="Steady Progress",
                    detail="Mastery is building steadily. Keep encouraging regular practice.",
                    trend="stable",
                    value=round(avg, 1),
                ))
        else:
            insights.append(ParentInsight(
                category="engagement",
                title="Practice Is Landing",
                detail="Practice answers are being recorded; mastery summaries appear as lessons complete.",
                trend="stable",
                value=float(sum(c.practice_attempts for c in engaging)),
            ))

    # ---- Alerts ----
    # Fired only on real thresholds over real data:
    #  - streak_broken: the child HAS engaged, has no active streak NOW, and
    #    their last recorded activity is not today.
    #  - low_mastery: real mastery records exist AND the measured average is
    #    below 30% (a never-practiced child is "no data yet", not "urgent").
    alerts: list[ParentAlert] = []
    # The day boundary MUST match the streak writer's. The canonical writer
    # (services/reward_ledger.update_streak) buckets with the IST student day
    # (services/streak_state.student_today), so this alert pass uses the SAME
    # boundary — the old server-local date.today() fired/lapsed alerts at the
    # wrong hour on a UTC host. Timestamps below stay stored-UTC until their
    # date is taken in IST.
    from backend.services.streak_state import student_today as _student_today, to_ist as _to_ist

    today = _student_today()
    for child in children:
        if not child.has_data:
            continue
        last_active_day = None
        if child.last_active_at:
            try:
                _parsed = datetime.fromisoformat(
                    child.last_active_at.replace("Z", "+00:00")
                )
                if _parsed.tzinfo is not None:
                    # Stored in UTC; "today" is the IST student calendar.
                    _parsed = _to_ist(_parsed)
                last_active_day = _parsed.date()
            except ValueError:
                last_active_day = None
        # current_streak is the DECAYED value (services/streak_state.py), so a
        # child who stopped practising reads 0 and this re-engagement alert is
        # reachable again. It was dead before: the raw counter only ever grew,
        # so this branch could not fire for any child who had ever practised.
        if child.current_streak == 0 and last_active_day != today:
            when = (
                f"Last recorded activity {last_active_day.isoformat()}."
                if last_active_day
                else "No recorded activity yet."
            )
            alerts.append(ParentAlert(
                alert_type="streak_broken",
                severity="warning",
                message=f"{child.student_name} has no active streak. {when} A short practice today restarts it.",
                created_at=datetime.now(timezone.utc).isoformat(),
                action_required=True,
            ))
        if child.has_mastery_data and child.overall_mastery < 30:
            alerts.append(ParentAlert(
                alert_type="low_mastery",
                severity="urgent",
                message=f"{child.student_name} has very low mastery ({child.overall_mastery:.0f}%). Extra support may be needed.",
                created_at=datetime.now(timezone.utc).isoformat(),
                action_required=True,
            ))

    severity_order = {"urgent": 0, "warning": 1, "info": 2}
    alerts.sort(key=lambda a: severity_order.get(a.severity, 3))

    return ParentDashboardResponse(
        parent_id=str(parent.id),
        parent_name=parent.name,
        children=children,
        insights=insights,
        alerts=alerts,
        generated_at=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/teacher/{teacher_id}", response_model=TeacherDashboardResponse)
async def get_teacher_dashboard(
    teacher_id: str,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
) -> TeacherDashboardResponse:
    """
    Return the dashboard for a teacher.

    Includes class overview with per-subject averages, a list of struggling
    students sorted by lowest mastery, and recent class-wide activity.
    """
    _require_self_or_staff(user, teacher_id, "teacher")
    if Teacher is None or Student is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
    teacher = result.scalar_one_or_none()
    if teacher is None:
        # First-run provisioning: teacher-role accounts created through
        # signup own a users row but no teachers row -- materialise an
        # honest empty profile instead of 404ing the owner's dashboard.
        if (user is not None and str(user.id) == str(teacher_id)
                and str(getattr(user, "role", "") or "").lower()
                == "teacher"):
            try:
                import uuid as _uuid
                teacher = Teacher(
                    id=_uuid.UUID(str(teacher_id)),
                    name=getattr(user, "name", "") or "Teacher",
                    is_active=True,
                )
                db.add(teacher)
                await db.commit()
                await db.refresh(teacher)
            except Exception:
                await db.rollback()
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Teacher '{teacher_id}' not found",
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Teacher '{teacher_id}' not found",
            )

    class_name = getattr(teacher, "class_name", None) or getattr(teacher, "department", "Class")

    # Gather students taught by this teacher — linked via homework they
    # assigned (the only persisted teacher→student edge in the schema).
    student_ids: list[str] = []
    try:
        from database import Homework  # type: ignore
        hw_rows = (await db.execute(
            select(Homework.student_id)
            .where(Homework.teacher_id == teacher_id)
            .distinct()
        )).scalars().all()
        student_ids = [str(s) for s in hw_rows]
    except Exception:
        pass

    students: list[Any] = []
    for sid in student_ids:
        row = (await db.execute(select(Student).where(Student.id == sid))).scalar_one_or_none()
        if row is not None:
            students.append(row)

    total_students = len(students)
    active_students = total_students

    # ---- Subject overviews ----
    subject_groups: dict[str, list[dict[str, Any]]] = {}
    for s in students:
        m_data = await _get_service_progress(db, s.id)
        for tm in m_data.get("by_topic", []):
            subj_id = str(tm.get("subject_id", "unknown"))
            subject_groups.setdefault(subj_id, []).append(tm)

    subject_overviews: list[SubjectOverview] = []
    for subj_id, entries in subject_groups.items():
        subj_name = entries[0].get("subject_name", subj_id) if entries else subj_id
        scores = [float(e.get("mastery_score", 0.0)) for e in entries]
        avg_score = sum(scores) / len(scores) if scores else 0.0
        unique_students = len({e.get("student_id") for e in entries if e.get("student_id")})
        subject_overviews.append(SubjectOverview(
            subject_id=subj_id,
            subject_name=str(subj_name),
            total_students=unique_students,
            avg_mastery=avg_score,
            completion_rate=min(100.0, avg_score),
        ))

    # ---- Struggling students ----
    struggling: list[StrugglingStudent] = []
    for s in students:
        low_topics: list[str] = []
        score_sum = 0.0
        score_count = 0
        m_data = await _get_service_progress(db, s.id)
        for tm in m_data.get("by_topic", []):
            sc = float(tm.get("mastery_score", 0.0))
            score_sum += sc
            score_count += 1
            if sc < 40:
                low_topics.append(str(tm.get("topic_name", tm.get("topic_id", ""))))

        if low_topics:
            avg_m = score_sum / score_count if score_count > 0 else 0.0
            struggling.append(StrugglingStudent(
                student_id=s.id,
                student_name=s.name,
                topics_struggling=low_topics,
                avg_mastery=avg_m,
                missed_sessions=0,
                last_active=None,
            ))

    struggling.sort(key=lambda x: x.avg_mastery)

    # ---- Recent class activity ----
    recent_activity: list[dict[str, Any]] = []
    try:
        from backend.models.progress import ActivityLog as _TchActivityLog
    except Exception:
        _TchActivityLog = None
    if _TchActivityLog is not None:
        for sid in student_ids[:30]:
            rows = (await db.execute(
                select(_TchActivityLog)
                .where(_TchActivityLog.user_id == sid)
                .order_by(desc(_TchActivityLog.created_at))
                .limit(5)
            )).scalars().all()
            for row in rows:
                ts = row.created_at.isoformat() if row.created_at else ""
                recent_activity.append({
                    "student_id": sid,
                    "type": getattr(row, "activity_type", "unknown"),
                    "title": getattr(row, "title", ""),
                    "timestamp": ts,
                })
        recent_activity.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        recent_activity = recent_activity[:20]

    return TeacherDashboardResponse(
        teacher_id=str(teacher.id),
        teacher_name=teacher.name,
        class_name=class_name,
        total_students=total_students,
        active_students=active_students,
        subject_overviews=subject_overviews,
        struggling_students=struggling,
        recent_class_activity=recent_activity,
        generated_at=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/student/{student_id}/recent", response_model=RecentActivityResponse)
async def get_recent_activity(
    student_id: str,
    limit: int = Query(default=20, ge=1, le=100, description="Max items to return"),
    offset: int = Query(default=0, ge=0, description="Pagination offset"),
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
) -> RecentActivityResponse:
    """
    Return a paginated feed of recent activity for a student.

    Data is sourced from the ActivityLog table with a fallback to the
    Attempt table when ActivityLog is unavailable.
    """
    if Student is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    _require_self_or_staff(user, student_id, "student")

    student_row = (await db.execute(
        select(Student).where(Student.id == student_id)
    )).scalar_one_or_none()
    if student_row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    activities: list[ActivityItem] = []
    total_count = 0

    # The model import is handler-local: the module-level ``ActivityLog`` name
    # is only bound in the ImportError fallback above, so referencing it here
    # unconditionally raised NameError on every call.
    try:
        from backend.models.progress import ActivityLog
    except Exception:
        ActivityLog = None

    # Primary source: ActivityLog
    # BUGFIX (pillar-6, round 2): this branch referenced ActivityLog.student_id
    # and ActivityLog.timestamp — columns that do not exist on the model
    # (it has user_id / created_at) — so the query build itself raised
    # AttributeError and GET /api/dashboard/student/{id}/recent was a
    # guaranteed 500. Column and attribute accesses now match the model.
    if ActivityLog is not None:
        count_row = (await db.execute(
            select(func.count()).select_from(ActivityLog).where(ActivityLog.user_id == student_id)
        )).scalar_one()
        total_count = int(count_row) if count_row is not None else 0

        rows = (await db.execute(
            select(ActivityLog)
            .where(ActivityLog.user_id == student_id)
            .order_by(desc(ActivityLog.created_at))
            .limit(limit)
            .offset(offset)
        )).scalars().all()

        for row in rows:
            ts = row.created_at.isoformat() if row.created_at else ""
            activities.append(ActivityItem(
                activity_id=str(row.id),
                type=getattr(row, "activity_type", "unknown"),
                title=getattr(row, "title", ""),
                description=getattr(row, "title", ""),
                subject=getattr(row, "subject", None),
                topic=getattr(row, "topic", None),
                xp_earned=int(getattr(row, "xp_earned", 0) or 0),
                mastery_delta=getattr(row, "mastery_delta", None),
                timestamp=ts,
                metadata=getattr(row, "extra_data", None),
            ))

    # Fallback source: Attempt table
    elif Attempt is not None:
        count_row = (await db.execute(
            select(func.count()).select_from(Attempt).where(Attempt.student_id == student_id)
        )).scalar_one()
        total_count = int(count_row) if count_row is not None else 0

        rows = (await db.execute(
            select(Attempt)
            .where(Attempt.student_id == student_id)
            .order_by(desc(Attempt.created_at))
            .limit(limit)
            .offset(offset)
        )).scalars().all()

        for row in rows:
            ts = row.created_at.isoformat() if row.created_at else ""
            activities.append(ActivityItem(
                activity_id=row.id,
                type="practice_attempt",
                title=getattr(row, "question_type", "Practice Question"),
                description=getattr(row, "summary", ""),
                subject=getattr(row, "subject", None),
                topic=getattr(row, "topic", None),
                xp_earned=int(getattr(row, "xp_earned", 0) or 0),
                mastery_delta=getattr(row, "mastery_delta", None),
                timestamp=ts,
                metadata=getattr(row, "metadata", None),
            ))
        total_count = total_count or len(activities)

    has_more = (offset + len(activities)) < total_count

    return RecentActivityResponse(
        student_id=student_id,
        activities=activities,
        has_more=has_more,
        total_count=total_count,
    )


@router.get("/student/{student_id}/achievements", response_model=AchievementsResponse)
async def get_student_achievements(
    student_id: str,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
) -> AchievementsResponse:
    """
    Return all earned achievements for a student.

    Single source of truth: ``AchievementService.get_achievements`` (the same
    static API the ``/api/achievements`` router serves) filtered to unlocked
    badges. The ``recent_achievements`` subset contains items earned within
    the last 7 days.
    """
    if Student is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    _require_self_or_staff(user, student_id, "student")

    student_row = (await db.execute(
        select(Student).where(Student.id == student_id)
    )).scalar_one_or_none()
    if student_row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    all_achievements: list[AchievementItem] = []
    recent_items: list[AchievementItem] = []
    total_earned = 0
    # Stays False unless a read path actually succeeded, so an empty payload
    # can be reported as unreadable instead of "this child has no badges".
    read_ok = False
    now = datetime.now(timezone.utc)

    # Single real read path (audit fix, was two dead ones): this used to
    # construct the service and call get_earned_achievements(...) on it — a
    # method that has never existed (the service is all-staticmethods taking
    # ``(db, user_id)``) — and then fall into a "fallback" that queried
    # columns the achievements table does not have (student_id, earned_at,
    # name) on a model ``database`` does not even export. Net effect: the
    # dead call logged a warning on every request and the fallback raised
    # NameError in production. One honest path now, shared with the
    # /api/achievements router.
    if _HAS_ACHIEVEMENT_SVC:
        try:
            data = await AchievementService.get_achievements(
                db, user_id=student_id, filter="unlocked"
            )
            raw_list = (
                data.get("achievements", []) if isinstance(data, dict) else list(data or [])
            )
            for ach in raw_list:
                max_progress = int(ach.get("max_progress") or 0)
                progress_pct: Optional[float] = None
                if max_progress > 0:
                    cur = float(ach.get("progress") or 0)
                    progress_pct = min(100.0, round(cur / max_progress * 100.0, 1))
                earned_at = str(ach.get("unlocked_at") or "")
                item = AchievementItem(
                    achievement_id=str(ach.get("achievement_id", "")),
                    name=str(ach.get("title", "")),
                    description=str(ach.get("description", "")),
                    icon=str(ach.get("icon_name") or "star"),
                    # The canonical badge classification is its tier
                    # (bronze/silver/gold); there is no separate rarity
                    # concept in the achievements model, so every badge is
                    # honestly "common".
                    category=str(ach.get("tier", "general")),
                    earned_at=earned_at,
                    rarity="common",
                    xp_bonus=int(ach.get("xp_reward", 0)),
                    progress=progress_pct,
                )
                all_achievements.append(item)
                try:
                    if earned_at:
                        ed = datetime.fromisoformat(earned_at)
                        if ed.tzinfo is None:
                            ed = ed.replace(tzinfo=timezone.utc)
                        if (now - ed).days <= 7:
                            recent_items.append(item)
                except (ValueError, TypeError):
                    pass
            read_ok = True
            total_earned = len(all_achievements)
        except Exception as exc:
            logger.warning("AchievementService error for %s: %s", student_id, exc)

    return AchievementsResponse(
        student_id=student_id,
        total_earned=total_earned,
        achievements=all_achievements,
        recent_achievements=recent_items,
        source_readable=read_ok,
    )