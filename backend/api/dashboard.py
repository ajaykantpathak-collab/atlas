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
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc

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
    Enrollment = None  # type: ignore
    Achievement = None  # type: ignore
    ActivityLog = None  # type: ignore
    Attempt = None  # type: ignore
    Mastery = None  # type: ignore
    Subject = None  # type: ignore
    Topic = None  # type: ignore

# ---------------------------------------------------------------------------
# Optional service imports
# ---------------------------------------------------------------------------
try:
    from services.progress_service_v2 import ProgressServiceV2  # type: ignore
    _HAS_PROGRESS_SVC = True
except ImportError:
    _HAS_PROGRESS_SVC = False

try:
    from services.streak_service import StreakService  # type: ignore
    _HAS_STREAK_SVC = True
except ImportError:
    _HAS_STREAK_SVC = False

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
                "streak_service": "available",
                "achievement_service": "available",
            },
            "database": "connected",
        }
    }}


class StreakData(BaseModel):
    """Student streak information."""

    current_streak: int = Field(..., ge=0, description="Current active streak in days")
    longest_streak: int = Field(..., ge=0, description="Personal best streak")
    last_active_date: Optional[str] = Field(None, description="ISO date of last activity")
    streak_freeze_available: bool = Field(False, description="Whether a streak freeze is available")

    model_config = {"json_schema_extra": {
        "example": {
            "current_streak": 5,
            "longest_streak": 12,
            "last_active_date": "2026-01-14",
            "streak_freeze_available": True,
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
    mastery_overall: float = Field(..., ge=0, le=100)
    mastery_by_topic: list[TopicMastery] = Field(default_factory=list)
    recommendations: list[Recommendation] = Field(default_factory=list)
    generated_at: str

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-001",
            "student_name": "Rahul Sharma",
            "grade": "10",
            "streak": {"current_streak": 5, "longest_streak": 12, "last_active_date": "2026-01-14", "streak_freeze_available": True},
            "xp": {"total_xp": 2450, "level": 7, "current_level_xp": 450, "xp_to_next_level": 500},
            "mastery_overall": 65.3,
            "mastery_by_topic": [],
            "recommendations": [],
            "generated_at": "2026-01-15T10:30:00+00:00",
        }
    }}


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
    subjects_practiced: list[str] = Field(default_factory=list)


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
    """Safely call ProgressServiceV2 and return a default dict on failure."""
    default: dict[str, Any] = {"overall": 0.0, "by_topic": []}
    if not _HAS_PROGRESS_SVC:
        return default
    try:
        svc = ProgressServiceV2(db)
        return await svc.get_mastery(student_id)
    except Exception as exc:
        logger.warning("ProgressServiceV2 error for %s: %s", student_id, exc)
        return default


async def _get_service_xp(db: AsyncSession, student_id: str) -> dict[str, Any]:
    """Safely call ProgressServiceV2 for XP summary."""
    default: dict[str, Any] = {"total_xp": 0, "level": 1, "current_level_xp": 0, "xp_to_next_level": 100}
    if not _HAS_PROGRESS_SVC:
        return default
    try:
        svc = ProgressServiceV2(db)
        return await svc.get_xp_summary(student_id)
    except Exception as exc:
        logger.warning("ProgressServiceV2 XP error for %s: %s", student_id, exc)
        return default


async def _get_service_streak(db: AsyncSession, student_id: str) -> dict[str, Any]:
    """Safely call StreakService."""
    default: dict[str, Any] = {"current_streak": 0, "longest_streak": 0, "last_active_date": None, "streak_freeze_available": False}
    if not _HAS_STREAK_SVC:
        return default
    try:
        svc = StreakService(db)
        return await svc.get_streak(student_id)
    except Exception as exc:
        logger.warning("StreakService error for %s: %s", student_id, exc)
        return default


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Check API health and availability of downstream services."""
    now = datetime.now(timezone.utc)
    services: dict[str, str] = {}

    services["progress_service"] = "available" if _HAS_PROGRESS_SVC else "unavailable"
    services["streak_service"] = "available" if _HAS_STREAK_SVC else "unavailable"
    services["achievement_service"] = "available" if _HAS_ACHIEVEMENT_SVC else "unavailable"

    db_status = "connected" if _HAS_DB else "not_configured"

    return HealthResponse(
        status="healthy",
        timestamp=now.isoformat(),
        services=services,
        database=db_status,
    )


@router.get("/student/{student_id}", response_model=StudentDashboardResponse)
async def get_student_dashboard(
    student_id: str,
    db: AsyncSession = Depends(get_db),
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

    result = await db.execute(select(Student).where(Student.id == student_id))
    student = result.scalar_one_or_none()
    if student is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student '{student_id}' not found",
        )

    # ---- Streak ----
    streak_raw = await _get_service_streak(db, student_id)
    streak_data = StreakData(
        current_streak=int(streak_raw.get("current_streak", 0)),
        longest_streak=int(streak_raw.get("longest_streak", 0)),
        last_active_date=streak_raw.get("last_active_date"),
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
    mastery_overall = float(mastery_raw.get("overall", 0.0))
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
) -> ParentDashboardResponse:
    """
    Return the dashboard for a parent, covering all linked children.

    Includes per-child progress summaries, aggregate insights, and alerts
    that may require parent action.
    """
    if Parent is None or Student is None or Enrollment is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    result = await db.execute(select(Parent).where(Parent.id == parent_id))
    parent = result.scalar_one_or_none()
    if parent is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parent '{parent_id}' not found",
        )

    # Fetch enrollments for this parent
    enroll_rows = (await db.execute(
        select(Enrollment).where(Enrollment.parent_id == parent_id)
    )).scalars().all()

    children: list[ChildProgressSummary] = []
    for enrollment in enroll_rows:
        child_row = (await db.execute(
            select(Student).where(Student.id == enrollment.student_id)
        )).scalar_one_or_none()
        if child_row is None:
            continue

        overall_mastery = 0.0
        total_xp = 0
        current_level = 1
        current_streak = 0

        mastery_data = await _get_service_progress(db, child_row.id)
        overall_mastery = float(mastery_data.get("overall", 0.0))

        xp_info = await _get_service_xp(db, child_row.id)
        total_xp = int(xp_info.get("total_xp", 0))
        current_level = int(xp_info.get("level", 1))

        streak_info = await _get_service_streak(db, child_row.id)
        current_streak = int(streak_info.get("current_streak", 0))

        children.append(ChildProgressSummary(
            student_id=child_row.id,
            student_name=child_row.name,
            grade=str(child_row.student_class) if child_row.student_class else "",
            overall_mastery=overall_mastery,
            total_xp=total_xp,
            current_level=current_level,
            current_streak=current_streak,
            weekly_practice_minutes=0,
            subjects_practiced=[],
        ))

    # ---- Insights ----
    insights: list[ParentInsight] = []
    if children:
        avg = sum(c.overall_mastery for c in children) / len(children)
        if avg < 40:
            insights.append(ParentInsight(
                category="performance",
                title="Needs Attention",
                detail="Average mastery is below 40%. Consider scheduling extra practice time.",
                trend="declining",
                value=avg,
            ))
        elif avg >= 80:
            insights.append(ParentInsight(
                category="performance",
                title="Excellent Progress",
                detail="Children are performing well with mastery above 80 percent.",
                trend="improving",
                value=avg,
            ))
        else:
            insights.append(ParentInsight(
                category="performance",
                title="Steady Progress",
                detail="Children are making steady progress. Keep encouraging regular practice.",
                trend="stable",
                value=avg,
            ))

    # ---- Alerts ----
    alerts: list[ParentAlert] = []
    for child in children:
        if child.current_streak == 0:
            alerts.append(ParentAlert(
                alert_type="streak_broken",
                severity="warning",
                message=f"{child.student_name} has no active streak. Encourage them to practice today.",
                created_at=datetime.now(timezone.utc).isoformat(),
                action_required=True,
            ))
        if child.overall_mastery < 30:
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
        parent_id=parent.id,
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
) -> TeacherDashboardResponse:
    """
    Return the dashboard for a teacher.

    Includes class overview with per-subject averages, a list of struggling
    students sorted by lowest mastery, and recent class-wide activity.
    """
    if Teacher is None or Student is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

    result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
    teacher = result.scalar_one_or_none()
    if teacher is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Teacher '{teacher_id}' not found",
        )

    class_name = getattr(teacher, "class_name", None) or getattr(teacher, "department", "Class")

    # Gather students taught by this teacher
    student_ids: list[str] = []
    if Enrollment is not None:
        enroll_rows = (await db.execute(
            select(Enrollment).where(Enrollment.teacher_id == teacher_id)
        )).scalars().all()
        student_ids = list({e.student_id for e in enroll_rows})

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
    if ActivityLog is not None:
        for sid in student_ids[:30]:
            rows = (await db.execute(
                select(ActivityLog)
                .where(ActivityLog.student_id == sid)
                .order_by(desc(ActivityLog.timestamp))
                .limit(5)
            )).scalars().all()
            for row in rows:
                ts = row.timestamp.isoformat() if row.timestamp else ""
                recent_activity.append({
                    "student_id": sid,
                    "type": getattr(row, "type", "unknown"),
                    "title": getattr(row, "title", ""),
                    "timestamp": ts,
                })
        recent_activity.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        recent_activity = recent_activity[:20]

    return TeacherDashboardResponse(
        teacher_id=teacher.id,
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

    # Primary source: ActivityLog
    if ActivityLog is not None:
        count_row = (await db.execute(
            select(func.count()).select_from(ActivityLog).where(ActivityLog.student_id == student_id)
        )).scalar_one()
        total_count = int(count_row) if count_row is not None else 0

        rows = (await db.execute(
            select(ActivityLog)
            .where(ActivityLog.student_id == student_id)
            .order_by(desc(ActivityLog.timestamp))
            .limit(limit)
            .offset(offset)
        )).scalars().all()

        for row in rows:
            ts = row.timestamp.isoformat() if row.timestamp else ""
            activities.append(ActivityItem(
                activity_id=row.id,
                type=getattr(row, "type", "unknown"),
                title=getattr(row, "title", ""),
                description=getattr(row, "description", ""),
                subject=getattr(row, "subject", None),
                topic=getattr(row, "topic", None),
                xp_earned=int(getattr(row, "xp_earned", 0) or 0),
                mastery_delta=getattr(row, "mastery_delta", None),
                timestamp=ts,
                metadata=getattr(row, "metadata", None),
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
) -> AchievementsResponse:
    """
    Return all earned achievements for a student.

    Results are sourced from the AchievementService with a direct database
    fallback. The ``recent_achievements`` subset contains items earned
    within the last 7 days.
    """
    if Student is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database models not configured",
        )

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
    now = datetime.now(timezone.utc)

    # Primary source: AchievementService
    if _HAS_ACHIEVEMENT_SVC:
        try:
            svc = AchievementService(db)
            raw_list = await svc.get_earned_achievements(student_id)
            for ach in raw_list:
                item = AchievementItem(
                    achievement_id=str(ach.get("achievement_id", "")),
                    name=str(ach.get("name", "")),
                    description=str(ach.get("description", "")),
                    icon=str(ach.get("icon", "star")),
                    category=str(ach.get("category", "general")),
                    earned_at=str(ach.get("earned_at", "")),
                    rarity=str(ach.get("rarity", "common")),
                    xp_bonus=int(ach.get("xp_bonus", 0)),
                    progress=ach.get("progress"),
                )
                all_achievements.append(item)
            total_earned = len(all_achievements)
            for item in all_achievements:
                try:
                    ed = datetime.fromisoformat(item.earned_at)
                    if ed.tzinfo is None:
                        ed = ed.replace(tzinfo=timezone.utc)
                    if (now - ed).days <= 7:
                        recent_items.append(item)
                except (ValueError, TypeError):
                    pass
        except Exception as exc:
            logger.warning("AchievementService error for %s: %s", student_id, exc)

    # Fallback: query Achievement table directly
    if not all_achievements and Achievement is not None:
        try:
            rows = (await db.execute(
                select(Achievement).where(Achievement.student_id == student_id).order_by(desc(Achievement.earned_at))
            )).scalars().all()

            for ach in rows:
                earned_ts = ""
                if ach.earned_at is not None:
                    earned_ts = ach.earned_at.isoformat() if isinstance(ach.earned_at, datetime) else str(ach.earned_at)

                item = AchievementItem(
                    achievement_id=ach.id,
                    name=str(getattr(ach, "name", "")),
                    description=str(getattr(ach, "description", "")),
                    icon=str(getattr(ach, "icon", "star")),
                    category=str(getattr(ach, "category", "general")),
                    earned_at=earned_ts,
                    rarity=str(getattr(ach, "rarity", "common")),
                    xp_bonus=int(getattr(ach, "xp_bonus", 0)),
                    progress=getattr(ach, "progress", None),
                )
                all_achievements.append(item)

                try:
                    if ach.earned_at is not None:
                        if isinstance(ach.earned_at, datetime):
                            ed = ach.earned_at
                        else:
                            ed = datetime.fromisoformat(str(ach.earned_at))
                        if ed.tzinfo is None:
                            ed = ed.replace(tzinfo=timezone.utc)
                        if (now - ed).days <= 7:
                            recent_items.append(item)
                except (ValueError, TypeError):
                    pass

            total_earned = len(all_achievements)
        except Exception as exc:
            logger.warning("Achievement table fallback error: %s", exc)

    return AchievementsResponse(
        student_id=student_id,
        total_earned=total_earned,
        achievements=all_achievements,
        recent_achievements=recent_items,
    )