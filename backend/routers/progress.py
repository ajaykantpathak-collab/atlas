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
    #
    # None means "not measured". These used to default to 0, and the endpoint
    # below derived them with a falsy check (`if not resp.retention_rate:`), so
    # a GENUINE 0% retention was overwritten with `accuracy * 100` — swapping a
    # real measurement for a different, usually more flattering one. The client
    # already guards on `retention != null`.
    retention_rate: Optional[float] = None
    streak: Optional[int] = None


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
class MasteryBatchRequest(BaseModel):
    model_config = _CAMEL_CFG
    node_ids: List[str] = Field(default_factory=list, max_length=500)


class MasteryAllRow(BaseModel):
    """One touched node in the galaxy mastery overlay (GET /mastery/all)."""

    model_config = _CAMEL_CFG

    node_id: str
    mastery_probability: float
    attempts: int = 0


@router.post("/mastery/batch", response_model=List[MasteryRecordSchema])
async def get_mastery_batch(
    payload: MasteryBatchRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return mastery records for a list of nodes — used by the sims
    mastery store to hydrate a fresh device from server-side state."""
    out: List[MasteryRecordSchema] = []
    for node_id in payload.node_ids:
        try:
            record = await ProgressService.get_mastery_record(
                db, user_id=str(user.id), node_id=node_id
            )
        except ValueError:
            continue
        if record is None:
            continue
        if isinstance(record, MasteryRecordSchema):
            out.append(record)
        elif isinstance(record, dict):
            out.append(MasteryRecordSchema(**record))
        else:
            out.append(MasteryRecordSchema.model_validate(record))
    return out


@router.get("/mastery/all", response_model=List[MasteryAllRow])
async def get_all_mastery(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return every mastery record the user has actually earned.

    Compact, deduped by ``node_id`` (keeping the best probability — the
    table can hold several rows per node from repeated practice), and
    limited to nodes with at least one recorded attempt. Powers the
    galaxy's living-sky overlay: absent nodes stay dim, and a fresh
    account gets an honest empty list — never fabricated stars.
    """
    return await ProgressService.get_all_mastery_records(db, str(user.id))


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


class GameResultRequest(BaseModel):
    """A completed junior game run (Classes 1-5 /play)."""
    model_config = _CAMEL_CFG
    game_file: str
    score: float = Field(ge=0, le=100)
    mastered: bool = False
    subject: Optional[str] = None
    class_level: Optional[int] = Field(default=None, ge=1, le=5)
    title: Optional[str] = None
    sim_id: Optional[str] = None
    time_taken_seconds: Optional[float] = None


class GameResultResponse(BaseModel):
    model_config = _CAMEL_CFG
    recorded: bool = True


@router.post("/game-result", response_model=GameResultResponse)
async def record_game_result(
    payload: GameResultRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Record a junior-game completion for the current user.

    Junior mastery was previously localStorage-only — invisible to the
    streak system, daily goals, weekly parent digest, and teacher view.
    This endpoint writes an ``activity_log`` row (activity_type
    ``junior_game``) so the whole engagement pipeline sees real play.
    Best-effort: the client swallows failures — a dropped log never
    breaks the game.
    """
    await ProgressService.log_activity(
        db,
        user_id=str(user.id),
        activity_type="junior_game",
        title=payload.title or payload.game_file,
        subject=payload.subject,
        score=f"{round(payload.score)}%",
        metadata={
            "game_file": payload.game_file,
            "score": payload.score,
            "mastered": payload.mastered,
            "class_level": payload.class_level,
            "sim_id": payload.sim_id,
            "time_taken_seconds": payload.time_taken_seconds,
        },
    )
    await db.commit()
    return GameResultResponse(recorded=True)


class GameMasteryItem(BaseModel):
    model_config = _CAMEL_CFG
    game_file: str
    best_score: float
    attempts: int
    mastered: bool
    last_played_at: Optional[str] = None
    subject: Optional[str] = None


@router.get("/game-mastery", response_model=List[GameMasteryItem])
async def get_game_mastery(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Junior-game mastery, read back from the activity_log rows that
    /game-result writes.  Lets /play seed its local MasteryStore with the
    backend record — cross-device progress + parent/teacher visibility."""
    from backend.models.progress import ActivityLog as _AL
    from sqlalchemy import select as _sel
    rows = (await db.execute(
        _sel(_AL).where(_AL.user_id == user.id, _AL.activity_type == "junior_game")
        .order_by(_AL.created_at.desc())
    )).scalars().all()
    best: dict = {}
    for r in rows:
        meta = r.extra_data or {}
        gf = meta.get("game_file") or r.title
        if not gf:
            continue
        score = float(meta.get("score", 0) or 0)
        cur = best.get(gf)
        if cur is None:
            best[gf] = {
                "game_file": gf, "best_score": score, "attempts": 1,
                "mastered": bool(meta.get("mastered")),
                "last_played_at": r.created_at.isoformat() if r.created_at else None,
                "subject": r.subject,
            }
        else:
            cur["attempts"] += 1
            cur["best_score"] = max(cur["best_score"], score)
            cur["mastered"] = cur["mastered"] or bool(meta.get("mastered"))
    return [GameMasteryItem(**v) for v in best.values()]


class HelpfulVoteRequest(BaseModel):
    model_config = _CAMEL_CFG
    node_id: str
    helpful: bool


@router.post("/helpful", status_code=status.HTTP_201_CREATED)
async def record_helpful(
    payload: HelpfulVoteRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """One-tap 'did this help?' signal on a topic card — feeds the
    content-quality view so thin nodes surface for review."""
    await ProgressService.log_activity(
        db, user_id=str(user.id), activity_type="helpful_vote",
        title=payload.node_id, subject=None,
        score="1" if payload.helpful else "0",
        metadata={"helpful": payload.helpful},
    )
    await db.commit()
    return {"recorded": True}


class ClientErrorRequest(BaseModel):
    model_config = _CAMEL_CFG
    message: str = Field(max_length=2000)
    url: Optional[str] = Field(default=None, max_length=500)
    stack: Optional[str] = Field(default=None, max_length=4000)
    component: Optional[str] = Field(default=None, max_length=200)


@router.post("/client-error", status_code=status.HTTP_202_ACCEPTED)
async def record_client_error(
    payload: ClientErrorRequest,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """MON-01 lite: client error ingest — frontend error boundaries +
    window.onerror POST here so real-user crashes land in activity_log
    instead of being invisible. Not a Sentry replacement — a first pulse."""
    import logging
    logging.getLogger("atlas.client").warning(
        "client-error user=%s url=%s msg=%s", user.id, payload.url, payload.message[:200],
    )
    await ProgressService.log_activity(
        db, user_id=str(user.id), activity_type="client_error",
        title=(payload.message or "client error")[:250],
        subject=None, score=None,
        metadata={
            "url": payload.url,
            "stack": (payload.stack or "")[:3000],
            "component": payload.component,
        },
    )
    await db.commit()
    return {"recorded": True}


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
    # Enrich with slug + authored title — the UI links by slug and raw
    # corpus node ids must never render as the concept name.
    node_ids = [i.node_id for i in items if i.node_id]
    if node_ids:
        try:
            from backend.models.enrichment import EnrichmentContent as _EC
            from sqlalchemy import select as _sel

            rows = (
                await db.execute(
                    _sel(_EC.node_id, _EC.title, _EC.slug).where(
                        _EC.node_id.in_(node_ids)
                    )
                )
            ).all()
            meta = {r.node_id: r for r in rows}
            for it in items:
                m = meta.get(it.node_id)
                if m is not None:
                    it.slug = m.slug
                    if m.title:
                        it.concept_name = m.title
        except Exception:
            pass
    return ReviewQueueResponse(items=items, total=len(items))


@router.get("/next-step")
async def get_next_step(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """The adaptive orchestrator — ONE next-best action for the student.

    Unifies every learning surface: due SM-2 review wins, then
    unresolved-misconception remediation, then prerequisite-aware
    teaching for weak nodes, then consolidation practice, and finally
    exploration. Returns student-safe identifiers only (title + slug).
    """
    from backend.services.orchestrator import LearningOrchestrator

    return await LearningOrchestrator.next_step(db, str(user.id))


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


class TeachItRequest(BaseModel):
    """'I taught this to someone' — a real activity row, not a vanity flag.

    Learning-by-teaching is the transfer mechanic the pedagogy audit found
    missing (§10). The row lands in the child's activity feed (and any
    digest that reads it) like every other logged activity.
    """

    node_id: str = Field(min_length=1, max_length=120)
    title: str = Field(min_length=1, max_length=300)
    subject: Optional[str] = Field(default=None, max_length=80)
    # Who the student explained to — a self-report, kept generic on purpose.
    audience: Optional[str] = Field(default=None, max_length=60)


@router.post("/teach-it", status_code=status.HTTP_201_CREATED)
async def record_teach_it(
    payload: TeachItRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Record a 'taught it to someone' moment as a first-class activity."""
    await ProgressService.log_activity(
        db,
        user_id=str(user.id),
        activity_type="teach",
        title=f"Taught it: {payload.title}",
        subject=payload.subject,
        metadata={"node_id": payload.node_id, "audience": payload.audience or "someone"},
    )
    await db.commit()
    return {"ok": True}


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

    # Web client reads { retentionRate, streak }. Derive them ONLY when the
    # service did not supply them (`is None`), never on a falsy 0 — a real 0%
    # retention or a real 0-day streak is a measurement, not a missing value.
    if resp.retention_rate is None and resp.accuracy:
            # derive only from a real source value
        resp.retention_rate = (
            round(resp.accuracy * 100, 1) if resp.accuracy <= 1 else resp.accuracy
        )
    if resp.streak is None and resp.streak_days:
            # derive only from a real source value
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
