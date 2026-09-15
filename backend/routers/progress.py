"""Progress router for the DREAM_APP educational platform.

Exposes endpoints for the dashboard, progress overview, subject mastery,
activity logs, milestones, study heatmap, mastery records, spaced-repetition
review queue, and offline content management.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.schemas.progress import (
    ActivitySchema,
    DashboardSchema,
    MasteryRecordSchema,
    ProgressOverviewSchema,
    ReviewAnswerRequest,
    ReviewAnswerResponse,
    ReviewQueueResponse,
    SimResultRequest,
    SimResultResponse,
    SubjectMasterySchema,
    WeeklyActivitySchema,
)
from backend.services.progress_service import ProgressService

router = APIRouter(prefix="/api/progress", tags=["progress"])


# --------------------------------------------------------------------------- #
# Lightweight response schemas (not in the schemas module)
# --------------------------------------------------------------------------- #
from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

_CAMEL_CFG = ConfigDict(
    populate_by_name=True,
    alias_generator=to_camel,
)


class MilestoneSchema(BaseModel):
    """A single milestone in the user's learning journey."""

    model_config = _CAMEL_CFG

    id: str
    title: str
    description: Optional[str] = None
    achieved: bool = False
    achieved_at: Optional[str] = Field(
        default=None,
        validation_alias=to_camel("achieved_at"),
    )
    # Fields the web client renders (subject + human "time" label).
    subject: Optional[str] = None
    time: Optional[str] = None
    progress: Optional[int] = None
    max_progress: Optional[int] = Field(
        default=None,
        validation_alias=to_camel("max_progress"),
    )
    icon: Optional[str] = None


class HeatmapResponse(BaseModel):
    """Study activity heatmap data."""

    data: List[dict] = []
    total_days: int = 0
    active_days: int = 0
    total_minutes: int = 0


class ReviewStatsResponse(BaseModel):
    """Spaced-repetition review statistics."""

    model_config = _CAMEL_CFG

    total_items: int = 0
    due_today: int = 0
    reviewed_today: int = 0
    streak_days: int = 0
    accuracy: float = 0.0
    average_interval: float = 0.0
    # Web client reads { retentionRate, streak }.
    retention_rate: float = 0.0
    streak: int = 0


class OfflineContentItemSchema(BaseModel):
    """A single offline content item."""

    model_config = _CAMEL_CFG

    node_id: str
    label: Optional[str] = None
    subject: Optional[str] = None
    content_type: Optional[str] = None
    file_size_mb: Optional[float] = None
    downloaded_at: Optional[str] = None
    # Web client compat fields.
    id: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None
    size: Optional[str] = None
    size_bytes: Optional[int] = None
    status: str = "downloaded"
    last_updated: Optional[str] = None


class OfflineContentResponse(BaseModel):
    items: List[OfflineContentItemSchema] = []
    total_size_mb: float = 0.0


class OfflineDownloadResponse(BaseModel):
    node_id: str
    status: str = "downloaded"
    file_size_mb: Optional[float] = None
    message: str = "Content downloaded for offline use"


class OfflineRemoveResponse(BaseModel):
    node_id: str
    status: str = "removed"
    message: str = "Offline content removed"


# --------------------------------------------------------------------------- #
# Dashboard & overview
# --------------------------------------------------------------------------- #
@router.get("/dashboard", response_model=DashboardSchema)
async def get_dashboard(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the aggregated dashboard data for the authenticated user."""
    dashboard = await ProgressService.get_dashboard(db, str(user.id))

    if isinstance(dashboard, DashboardSchema):
        return dashboard
    if isinstance(dashboard, dict):
        return DashboardSchema(**dashboard)
    return DashboardSchema.model_validate(dashboard)


@router.get("/overview", response_model=ProgressOverviewSchema)
async def get_progress_overview(
    range: str = Query(default="all", description="Time range: all, month, week"),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return a high-level progress overview across all subjects."""
    overview = await ProgressService.get_progress_overview(
        db, str(user.id), time_range=range
    )

    if isinstance(overview, ProgressOverviewSchema):
        return overview
    if isinstance(overview, dict):
        return ProgressOverviewSchema(**overview)
    return ProgressOverviewSchema.model_validate(overview)


@router.get("/mastery", response_model=List[SubjectMasterySchema])
async def get_subject_mastery(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return mastery breakdown per subject for the authenticated user."""
    mastery = await ProgressService.get_subject_mastery(db, str(user.id))

    results: List[SubjectMasterySchema] = []
    for item in mastery:
        if isinstance(item, SubjectMasterySchema):
            results.append(item)
        elif isinstance(item, dict):
            results.append(SubjectMasterySchema(**item))
        else:
            results.append(SubjectMasterySchema.model_validate(item))
    return results


# --------------------------------------------------------------------------- #
# Activity
# --------------------------------------------------------------------------- #
@router.get("/activity", response_model=List[ActivitySchema])
async def get_recent_activity(
    limit: int = Query(default=20, ge=1, le=100),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return recent activity entries for the authenticated user."""
    activities = await ProgressService.get_recent_activity(
        db, str(user.id), limit=limit
    )

    results: List[ActivitySchema] = []
    for item in activities:
        if isinstance(item, ActivitySchema):
            results.append(item)
        elif isinstance(item, dict):
            results.append(ActivitySchema(**item))
        else:
            results.append(ActivitySchema.model_validate(item))
    return results


@router.get("/weekly-activity", response_model=List[WeeklyActivitySchema])
async def get_weekly_activity(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return study activity for the last 7 days."""
    weekly = await ProgressService.get_weekly_activity(db, str(user.id))

    results: List[WeeklyActivitySchema] = []
    for item in weekly:
        if isinstance(item, WeeklyActivitySchema):
            results.append(item)
        elif isinstance(item, dict):
            results.append(WeeklyActivitySchema(**item))
        else:
            results.append(WeeklyActivitySchema.model_validate(item))
    return results


# --------------------------------------------------------------------------- #
# Milestones & heatmap
# --------------------------------------------------------------------------- #
@router.get("/milestones", response_model=List[MilestoneSchema])
async def get_milestones(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return learning milestones for the authenticated user.

    The web client expects a bare JSON array of milestone objects
    (title/subject/time/icon), so the response is a plain list.
    """
    milestones = await ProgressService.get_milestones(db, str(user.id))

    items: List[MilestoneSchema] = []
    raw_list = milestones if isinstance(milestones, list) else milestones.get("milestones", []) if isinstance(milestones, dict) else []
    for item in raw_list:
        if isinstance(item, dict):
            data = dict(item)
            # Web client compat: human-readable time label + subject guess.
            if not data.get("time"):
                data["time"] = data.get("achieved_at") or ""
            items.append(MilestoneSchema(**data))
        else:
            items.append(MilestoneSchema.model_validate(item))

    return items


@router.get("/heatmap", response_model=List[dict])
async def get_study_heatmap(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return study-activity heatmap data for the authenticated user.

    The web client expects a bare JSON array of {date, intensity} days.
    """
    heatmap = await ProgressService.get_study_heatmap(db, str(user.id))

    if isinstance(heatmap, dict):
        days = heatmap.get("data", []) if isinstance(heatmap, dict) else []
    elif isinstance(heatmap, list):
        days = heatmap
    else:
        days = []

    result = []
    for d in days:
        if not isinstance(d, dict):
            continue
        day = dict(d)
        if "intensity" not in day:
            activities = day.get("activities_count")
            if activities is None:
                activities = 1 if day.get("completed") else 0
            day["intensity"] = activities
        result.append(day)
    return result


# --------------------------------------------------------------------------- #
# Mastery records
# --------------------------------------------------------------------------- #
@router.get("/mastery/{node_id}", response_model=MasteryRecordSchema)
async def get_mastery_record(
    node_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the mastery record for a specific node."""
    try:
        record = await ProgressService.get_mastery_record(
            db, user_id=str(user.id), node_id=node_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if record is None:
        # No mastery record yet — return a default (not started)
        return MasteryRecordSchema(node_id=node_id)

    if isinstance(record, MasteryRecordSchema):
        return record
    if isinstance(record, dict):
        return MasteryRecordSchema(**record)
    return MasteryRecordSchema.model_validate(record)


@router.post("/sim-result", response_model=SimResultResponse)
async def record_sim_result(
    payload: SimResultRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Record a completed simulation run for the current user.

    One call per sim completion: updates BKT mastery for every node the
    sim covers and emits a ``student_answer`` event onto the intelligence
    bus so misconception/remediation persistence actually fires.

    ``correct`` is derived from score (>= 70) — the sims engine reports
    a single aggregate score per run.
    """
    correct = payload.score >= 70.0
    mastery: dict = {}
    updated: list = []

    for node_id in payload.node_ids:
        p = await ProgressService.update_mastery_bkt(
            db, user_id=str(user.id), node_id=node_id, is_correct=correct
        )
        mastery[node_id] = p
        updated.append(node_id)

    await db.commit()

    # Feed the intelligence layer — this is what actually persists
    # InteractionOutcome + drives remediation/misconception tracking.
    try:
        from backend.services.intelligence_bus import emit_student_answer
        for node_id in payload.node_ids:
            emit_student_answer(
                problem_type_id=node_id,
                correct=correct,
                student_id=str(user.id),
            )
    except Exception:
        pass  # never break a sim result on telemetry

    return SimResultResponse(updated=updated, mastery=mastery, correct=correct)


# --------------------------------------------------------------------------- #
# Spaced-repetition review
# --------------------------------------------------------------------------- #
@router.get("/review/queue", response_model=ReviewQueueResponse)
async def get_review_queue(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the user's spaced-repetition review queue."""
    queue = await ProgressService.get_review_queue(db, str(user.id))

    if isinstance(queue, ReviewQueueResponse):
        return queue
    if isinstance(queue, dict):
        return ReviewQueueResponse(**queue)
    # Assume a list of items
    from backend.schemas.progress import ReviewItemSchema

    items = [
        ReviewItemSchema(**item) if isinstance(item, dict) else ReviewItemSchema.model_validate(item)
        for item in queue
    ]
    return ReviewQueueResponse(items=items, total=len(items))


@router.post("/review/answer", response_model=ReviewAnswerResponse)
async def submit_review_answer(
    payload: ReviewAnswerRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a spaced-repetition review answer and get the updated schedule."""
    try:
        result = await ProgressService.submit_review(
            db,
            user_id=str(user.id),
            data={
                "item_id": payload.item_id,
                "quality": payload.quality,
                "response_time_seconds": payload.response_time_seconds,
            },
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, ReviewAnswerResponse):
        return result
    if isinstance(result, dict):
        return ReviewAnswerResponse(**result)
    return ReviewAnswerResponse.model_validate(result)


@router.get("/review/stats", response_model=ReviewStatsResponse)
async def get_review_stats(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return spaced-repetition review statistics for the user."""
    stats = await ProgressService.get_review_stats(db, str(user.id))

    if isinstance(stats, dict):
        resp = ReviewStatsResponse(**stats)
    else:
        resp = ReviewStatsResponse.model_validate(stats)

    # Web client reads { retentionRate, streak } — derive them from
    # accuracy (0-1 fraction → percentage) and streak_days.
    if not resp.retention_rate:
        resp.retention_rate = round(resp.accuracy * 100, 1) if resp.accuracy <= 1 else resp.accuracy
    if not resp.streak:
        resp.streak = resp.streak_days
    return resp


# --------------------------------------------------------------------------- #
# Offline content
# --------------------------------------------------------------------------- #
@router.get("/offline", response_model=OfflineContentResponse)
async def get_offline_content(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the list of content the user has downloaded for offline use."""
    content = await ProgressService.get_offline_content(db, str(user.id))

    if isinstance(content, dict):
        return OfflineContentResponse(**content)

    items: List[OfflineContentItemSchema] = []
    for item in (content if isinstance(content, list) else []):
        if isinstance(item, dict):
            data = dict(item)
            node = str(data.get("node_id", "") or "")
            mb = data.get("file_size_mb")
            # Web client compat fields.
            data.setdefault("id", node)
            data.setdefault("title", data.get("label") or node)
            data.setdefault("type", data.get("content_type") or "document")
            if data.get("size") is None:
                data["size"] = f"{mb or 0:.1f} MB"
            if data.get("size_bytes") is None and mb is not None:
                data["size_bytes"] = int(float(mb) * 1024 * 1024)
            data.setdefault("status", "downloaded")
            data.setdefault("last_updated", data.get("downloaded_at"))
            items.append(OfflineContentItemSchema(**data))
        else:
            items.append(OfflineContentItemSchema.model_validate(item))

    total_size = sum(i.file_size_mb or 0 for i in items)
    return OfflineContentResponse(items=items, total_size_mb=total_size)


@router.post("/offline/{node_id}/download", response_model=OfflineDownloadResponse)
async def download_offline_content(
    node_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Mark content for a node as downloaded for offline use."""
    try:
        result = await ProgressService.download_content(
            db, user_id=str(user.id), node_id=node_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, dict):
        return OfflineDownloadResponse(**result)
    return OfflineDownloadResponse(
        node_id=node_id,
        status=getattr(result, "status", "downloaded"),
        file_size_mb=getattr(result, "file_size_mb", None),
        message=getattr(result, "message", "Content downloaded for offline use"),
    )


@router.delete("/offline/{node_id}", response_model=OfflineRemoveResponse)
async def remove_offline_content(
    node_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Remove offline content for a node."""
    try:
        result = await ProgressService.remove_offline_content(
            db, user_id=str(user.id), node_id=node_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    if isinstance(result, dict):
        return OfflineRemoveResponse(**result)
    return OfflineRemoveResponse(
        node_id=node_id,
        status=getattr(result, "status", "removed"),
        message=getattr(result, "message", "Offline content removed"),
    )
