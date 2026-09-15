"""
Progress API Router — bridges frontend /api/progress/* calls to existing services.

Frontend calls:              Backend has:
  /api/progress/dashboard      -> dashboard/student/{id} (or stub)
  /api/progress/overview       -> progress_service_v2.get_mastery_summary
  /api/progress/mastery        -> mastery_sync.get_mastery
  /api/progress/activity       -> dashboard/student/{id}/recent
  /api/progress/weekly-activity-> stub (computed from activity)
  /api/progress/milestones     -> stub
  /api/progress/heatmap        -> stub
  /api/progress/mastery/{id}   -> mastery_sync.get_mastery(topic_id)
  /api/progress/review/queue   -> mastery_sync.get_review_schedule
  /api/progress/review/answer  -> mastery_sync.update_on_attempt
  /api/progress/review/stats   -> stub
  /api/progress/offline        -> stub
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/progress", tags=["progress"])

# ---------------------------------------------------------------------------
# Optional database imports
# ---------------------------------------------------------------------------
try:
    from database import get_db, Student, Attempt, Mastery  # type: ignore
    _HAS_DB = True
except ImportError:
    _HAS_DB = False
    get_db = None  # type: ignore

# Safe dependency: when the DB stack is unavailable (degraded mode), fall
# back to an untyped None default instead of an invalid AsyncSession field
# that would crash route registration.
if get_db is not None:
    _db_dep = Depends(get_db)
else:
    _db_dep = None
    Student = None  # type: ignore
    Attempt = None  # type: ignore
    Mastery = None  # type: ignore

try:
    from services.mastery_sync import get_mastery, get_review_schedule, update_on_attempt  # type: ignore
    _HAS_MASTERY = True
except ImportError:
    _HAS_MASTERY = False
    get_mastery = None  # type: ignore
    get_review_schedule = None  # type: ignore
    update_on_attempt = None  # type: ignore

try:
    from services.progress_service_v2 import ProgressServiceV2  # type: ignore
    _HAS_PROGRESS_SVC = True
except ImportError:
    _HAS_PROGRESS_SVC = False
    ProgressServiceV2 = None  # type: ignore

try:
    from services.streak_service import StreakService  # type: ignore
    _HAS_STREAK = True
except ImportError:
    _HAS_STREAK = False
    StreakService = None  # type: ignore

from sqlalchemy import select, func, desc

# ---------------------------------------------------------------------------
# Response models (match frontend TypeScript interfaces)
# ---------------------------------------------------------------------------

class SubjectMasterySchema(BaseModel):
    subject: str = ""
    totalNodes: int = 0
    masteredNodes: int = 0
    learningNodes: int = 0
    notStartedNodes: int = 0
    masteryPercentage: float = 0.0
    weeklyChange: float = 0.0

class ProgressOverviewSchema(BaseModel):
    totalNodes: int = 0
    masteredNodes: int = 0
    studyTimeHours: float = 0.0
    avgMastery: float = 0.0
    subjects: list[SubjectMasterySchema] = []

class ActivitySchema(BaseModel):
    id: str = ""
    activityType: str = ""
    title: str = ""
    subject: Optional[str] = None
    score: Optional[str] = None
    time: str = ""

class WeeklyActivitySchema(BaseModel):
    day: str = ""
    value: int = 0

class MilestoneSchema(BaseModel):
    title: str = ""
    subject: str = ""
    time: str = ""
    icon: str = ""

class MasteryRecordSchema(BaseModel):
    nodeId: str = ""
    masteryProbability: float = 0.0
    pKnown: float = 0.0
    attempts: int = 0
    lastAttemptAt: Optional[str] = None

class ReviewItemSchema(BaseModel):
    id: str = ""
    nodeId: str = ""
    conceptName: str = ""
    subject: Optional[str] = None
    easinessFactor: float = 2.5
    intervalDays: int = 1
    repetitions: int = 0
    nextReviewDate: str = ""
    question: str = ""
    answer: str = ""
    options: Optional[list[str]] = None
    correctOption: Optional[str] = None

class ReviewQueueResponse(BaseModel):
    items: list[ReviewItemSchema] = []
    total: int = 0

class ReviewAnswerRequest(BaseModel):
    itemId: str = ""
    quality: int = 3
    responseTimeSeconds: Optional[int] = None

class ReviewAnswerResponse(BaseModel):
    updatedInterval: int = 1
    updatedEasiness: float = 2.5
    nextReviewDate: str = ""
    updatedMastery: float = 0.0

class DashboardSchema(BaseModel):
    studentId: str = ""
    studentName: str = ""
    grade: str = ""
    totalXp: int = 0
    level: int = 1
    levelXp: int = 0
    levelMax: int = 100
    streak: int = 0
    masteryOverall: float = 0.0
    masteryByTopic: list[dict] = []
    recommendations: list[dict] = []
    recentActivity: list[ActivitySchema] = []
    subjects: list[SubjectMasterySchema] = []
    generatedAt: str = ""

class OfflineContentItem(BaseModel):
    id: str = ""
    nodeId: str = ""
    title: str = ""
    subject: str = ""
    type: str = "document"
    size: str = "0 KB"
    sizeBytes: int = 0
    status: str = "not-downloaded"
    progress: Optional[int] = None
    lastUpdated: str = ""
    chapter: str = ""


# ---------------------------------------------------------------------------
# Helper: get current student ID from DB or stub
# ---------------------------------------------------------------------------

from fastapi import Depends as _Depends
from fastapi.security import HTTPBearer as _HTTPBearer
_security = _HTTPBearer(auto_error=False)

async def _resolve_student_id(
    db: AsyncSession,
    credentials: "HTTPAuthorizationCredentials | None" = None,
) -> Optional[str]:
    """Resolve the student for this request.

    Authenticated: the JWT subject's own student record (never another's).
    Development only, anonymous: falls back to the demo stub (first student).
    Any other environment: 401 — the anonymous cross-student leak is closed.
    """
    import os as _os
    from fastapi import HTTPException as _HTTPException
    from backend.security import decode_access_token as _decode

    if credentials:
        payload = _decode(credentials.credentials)
        if payload and payload.get("sub"):
            sub = str(payload["sub"])
            if Student is not None:
                try:
                    result = await db.execute(
                        select(Student).where(Student.id == sub)
                    )
                    student = result.scalar_one_or_none()
                    if student:
                        return str(student.id)
                except Exception:
                    pass
            return sub  # trust the token subject when no Student row exists
    if _os.getenv("ENVIRONMENT", "development").lower() == "development":
        if Student is None:
            return None
        try:
            result = await db.execute(select(Student).limit(1))
            student = result.scalar_one_or_none()
            return str(student.id) if student else None
        except Exception:
            return None
    raise _HTTPException(status_code=401, detail="Not authenticated")


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/dashboard", response_model=DashboardSchema)
async def get_dashboard(db=_db_dep,
                        credentials=Depends(_security)):
    """Get student dashboard — aggregates streak, XP, mastery, activity."""
    student_id = await _resolve_student_id(db, credentials) if db else None

    # Build from available services
    streak = 0
    total_xp = 0
    level = 1
    mastery_overall = 0.0

    if student_id and _HAS_STREAK:
        try:
            svc = StreakService(db)
            streak_data = await svc.get_streak(student_id)
            streak = int(streak_data.get("current_streak", 0))
        except Exception:
            pass

    if student_id and _HAS_MASTERY:
        try:
            mastery_data = await get_mastery(student_id)
            if isinstance(mastery_data, dict):
                mastery_overall = float(mastery_data.get("overall", 0.0))
        except Exception:
            pass

    return DashboardSchema(
        studentId=student_id or "demo",
        studentName="Student",
        grade="",
        totalXp=total_xp,
        level=level,
        levelXp=0,
        levelMax=100,
        streak=streak,
        masteryOverall=mastery_overall,
        recentActivity=[],
        subjects=[],
        generatedAt=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/overview", response_model=ProgressOverviewSchema)
async def get_progress_overview(
    range: Optional[str] = Query(None, alias="range"),
    db=_db_dep,
):
    """Get progress overview across all subjects."""
    student_id = await _resolve_student_id(db, credentials) if db else None
    mastered = 0
    total = 0
    avg_mastery = 0.0
    subjects: list[SubjectMasterySchema] = []

    if student_id and _HAS_MASTERY:
        try:
            data = await get_mastery(student_id)
            if isinstance(data, dict):
                avg_mastery = float(data.get("overall", 0.0))
                by_topic = data.get("by_topic", [])
                if isinstance(by_topic, list):
                    total = len(by_topic)
                    mastered = sum(1 for t in by_topic if float(t.get("mastery_score", 0)) > 0.8)
        except Exception:
            pass

    return ProgressOverviewSchema(
        totalNodes=total,
        masteredNodes=mastered,
        studyTimeHours=0.0,
        avgMastery=avg_mastery,
        subjects=subjects,
    )


@router.get("/mastery", response_model=list[SubjectMasterySchema])
async def get_subject_mastery(db=_db_dep, credentials=Depends(_security)):
    """Get mastery breakdown by subject."""
    student_id = await _resolve_student_id(db, credentials) if db else None
    if not student_id or not _HAS_MASTERY:
        return []
    try:
        data = await get_mastery(student_id)
        if isinstance(data, dict):
            by_topic = data.get("by_topic", [])
            if isinstance(by_topic, list):
                # Group by subject
                subj_map: dict[str, dict] = {}
                for t in by_topic:
                    subj = t.get("subject_name", "general")
                    if subj not in subj_map:
                        subj_map[subj] = {"total": 0, "mastered": 0, "scores": []}
                    subj_map[subj]["total"] += 1
                    score = float(t.get("mastery_score", 0))
                    subj_map[subj]["scores"].append(score)
                    if score > 0.8:
                        subj_map[subj]["mastered"] += 1
                return [
                    SubjectMasterySchema(
                        subject=s,
                        totalNodes=v["total"],
                        masteredNodes=v["mastered"],
                        learningNodes=v["total"] - v["mastered"],
                        notStartedNodes=0,
                        masteryPercentage=sum(v["scores"]) / len(v["scores"]) if v["scores"] else 0.0,
                    )
                    for s, v in subj_map.items()
                ]
    except Exception as e:
        logger.warning("get_subject_mastery error: %s", e)
    return []


@router.get("/mastery/{node_id}", response_model=MasteryRecordSchema)
async def get_mastery_record(
    node_id: str,
    db=_db_dep,
):
    """Get mastery record for a specific node."""
    student_id = await _resolve_student_id(db, credentials) if db else None
    if not student_id or not _HAS_MASTERY:
        return MasteryRecordSchema(nodeId=node_id)
    try:
        data = await get_mastery(student_id, topic_id=node_id)
        if isinstance(data, dict):
            return MasteryRecordSchema(
                nodeId=node_id,
                masteryProbability=float(data.get("overall", 0.0)),
                pKnown=float(data.get("p_known", 0.0)),
                attempts=int(data.get("attempts", 0)),
                lastAttemptAt=data.get("last_attempted"),
            )
    except Exception:
        pass
    return MasteryRecordSchema(nodeId=node_id)


@router.get("/activity", response_model=list[ActivitySchema])
async def get_recent_activity(
    limit: int = Query(10, ge=1, le=100),
    db=_db_dep,
):
    """Get recent activity feed."""
    student_id = await _resolve_student_id(db, credentials) if db else None
    if not student_id or Attempt is None:
        return []
    try:
        result = await db.execute(
            select(Attempt)
            .where(Attempt.student_id == student_id)
            .order_by(desc(Attempt.created_at))
            .limit(limit)
        )
        attempts = result.scalars().all()
        return [
            ActivitySchema(
                id=str(a.id),
                activityType="practice",
                title=f"{'Correct' if a.correct else 'Incorrect'} — {a.topic_id or 'Practice'}",
                subject=a.subject if hasattr(a, 'subject') else None,
                score=f"{a.score:.1f}" if hasattr(a, 'score') and a.score else None,
                time=a.created_at.isoformat() if a.created_at else "",
            )
            for a in attempts
        ]
    except Exception as e:
        logger.warning("get_recent_activity error: %s", e)
        return []


@router.get("/weekly-activity", response_model=list[WeeklyActivitySchema])
async def get_weekly_activity(db=_db_dep):
    """Get weekly activity chart data."""
    # Return last 7 days stub
    from datetime import timedelta
    days = []
    now = datetime.now(timezone.utc)
    for i in range(6, -1, -1):
        d = now - timedelta(days=i)
        days.append(WeeklyActivitySchema(day=d.strftime("%a"), value=0))
    return days


@router.get("/milestones", response_model=list[MilestoneSchema])
async def get_milestones():
    """Get student milestones."""
    return []


@router.get("/heatmap", response_model=list[dict])
async def get_study_heatmap():
    """Get study heatmap data."""
    return []


# ── Spaced Repetition ──

@router.get("/review/queue", response_model=ReviewQueueResponse)
async def get_review_queue(db=_db_dep, credentials=Depends(_security)):
    """Get due review items (SM-2 spaced repetition)."""
    student_id = await _resolve_student_id(db, credentials) if db else None
    if not student_id or not _HAS_MASTERY:
        return ReviewQueueResponse(items=[], total=0)
    try:
        schedule = await get_review_schedule(student_id, limit=20)
        if isinstance(schedule, list):
            items = []
            for item in schedule:
                if isinstance(item, dict):
                    items.append(ReviewItemSchema(
                        id=str(item.get("id", item.get("topic_id", ""))),
                        nodeId=str(item.get("topic_id", "")),
                        conceptName=str(item.get("topic_name", item.get("concept", "Review"))),
                        subject=item.get("subject"),
                        easinessFactor=float(item.get("easiness_factor", 2.5)),
                        intervalDays=int(item.get("interval", 1)),
                        repetitions=int(item.get("repetitions", 0)),
                        nextReviewDate=str(item.get("next_review_date", "")),
                        question=str(item.get("question", item.get("concept", ""))),
                        answer=str(item.get("answer", "")),
                    ))
            return ReviewQueueResponse(items=items, total=len(items))
    except Exception as e:
        logger.warning("get_review_queue error: %s", e)
    return ReviewQueueResponse(items=[], total=0)


@router.post("/review/answer", response_model=ReviewAnswerResponse)
async def submit_review_answer(
    req: ReviewAnswerRequest,
    db=_db_dep,
):
    """Submit a review answer and update SM-2 schedule."""
    student_id = await _resolve_student_id(db, credentials) if db else None
    if not student_id or not _HAS_MASTERY:
        return ReviewAnswerResponse(
            updatedInterval=1,
            updatedEasiness=2.5,
            nextReviewDate=datetime.now(timezone.utc).isoformat(),
            updatedMastery=0.0,
        )
    try:
        await update_on_attempt(
            student_id, "general", req.itemId, "review",
            correct=req.quality >= 3,
        )
        return ReviewAnswerResponse(
            updatedInterval=1,
            updatedEasiness=2.5,
            nextReviewDate=datetime.now(timezone.utc).isoformat(),
            updatedMastery=0.5,
        )
    except Exception as e:
        logger.warning("submit_review_answer error: %s", e)
        return ReviewAnswerResponse()


@router.get("/review/stats")
async def get_review_stats(db=_db_dep):
    """Get review statistics."""
    return {"retentionRate": 0.0, "streak": 0}


# ── Offline content (stub — frontend handles caching locally) ──

@router.get("/offline", response_model=list[OfflineContentItem])
async def get_offline_content():
    """Get downloaded offline content list."""
    return []


@router.post("/offline/{node_id}/download")
async def download_offline_content(node_id: str):
    """Mark content as downloaded for offline use."""
    return {"success": True, "nodeId": node_id}


@router.delete("/offline/{node_id}")
async def remove_offline_content(node_id: str):
    """Remove offline content."""
    return {"success": True, "nodeId": node_id}


@router.get("/health")
async def progress_health():
    """Health check for progress service."""
    return {
        "status": "healthy",
        "services": {
            "mastery_sync": "available" if _HAS_MASTERY else "unavailable",
            "progress_service": "available" if _HAS_PROGRESS_SVC else "unavailable",
            "streak_service": "available" if _HAS_STREAK else "unavailable",
        },
    }
