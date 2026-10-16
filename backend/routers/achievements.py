"""Achievements router for the DREAM_APP educational platform.

Exposes endpoints for listing achievements, viewing individual achievements,
and retrieving achievement statistics.
"""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from sqlalchemy.exc import StatementError
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.schemas.achievement import AchievementListResponse, AchievementSchema
from backend.services.achievement_service import AchievementService

router = APIRouter(prefix="/api/achievements", tags=["achievements"])


# --------------------------------------------------------------------------- #
# Lightweight response schema (not in the schemas module)
# --------------------------------------------------------------------------- #
from pydantic import BaseModel


class AchievementStatsResponse(BaseModel):
    """Aggregated achievement statistics for a user."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    total_achievements: int = 0
    unlocked_count: int = 0
    locked_count: int = 0
    # Badge-wall XP (sum of unlocked badge xp_reward) — NOT the wallet.
    total_xp_earned: int = 0
    # Canonical wallet XP (users.total_xp via services/reward_ledger.py).
    wallet_xp: int = 0
    completion_percentage: float = 0.0
    recent_unlocks: list = []
    tier_breakdown: dict = {}


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
# One canonical handler serves GET /api/achievements (no slash). The trailing
# slash form is NOT a duplicate registration: Next's dev rewrite normalizes
# the slash before proxying, so browser calls arrive slash-less, while legacy
# links/bookmarks still hit the slash form. Redirecting it ourselves (307,
# RELATIVE Location) keeps both forms working without FastAPI's built-in
# redirect_slashes answer, whose absolute Location
# (http://localhost:8001/api/achievements) made the browser's follow-up a
# cross-origin request that failed CORS preflight — the badge wall silently
# emptied on :3000.
@router.get("", response_model=AchievementListResponse)
async def get_achievements(
    filter: Optional[str] = Query(
        default=None,
        description="Filter: 'unlocked', 'locked', or None for all",
    ),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return all achievements with the user's unlock status."""
    achievements = await AchievementService.get_achievements(
        db, user_id=str(user.id), filter=filter
    )

    def _fill_compat(resp: AchievementListResponse) -> AchievementListResponse:
        """Fill web-client compat fields: items mirror + name/icon aliases."""
        for a in resp.achievements:
            if not a.name:
                a.name = a.title
            if not a.icon:
                a.icon = a.icon_name
        resp.items = resp.achievements
        return resp

    if isinstance(achievements, AchievementListResponse):
        return _fill_compat(achievements)
    if isinstance(achievements, dict):
        return _fill_compat(AchievementListResponse(**achievements))

    # Assume a list of achievement items
    items: list[AchievementSchema] = []
    for item in achievements:
        if isinstance(item, AchievementSchema):
            items.append(item)
        elif isinstance(item, dict):
            items.append(AchievementSchema(**item))
        else:
            items.append(AchievementSchema.model_validate(item))

    unlocked = [a for a in items if a.unlocked]
    total_xp = sum(a.xp_reward for a in unlocked)
    wallet_xp = 0
    try:
        from sqlalchemy import select as _select

        row = (
            await db.execute(_select(User.total_xp).where(User.id == str(user.id)))
        ).first()
        wallet_xp = int(row[0] or 0) if row else 0
    except Exception:
        wallet_xp = 0
    return _fill_compat(
        AchievementListResponse(
            achievements=items,
            unlocked_count=len(unlocked),
            total_xp=total_xp,
            wallet_xp=wallet_xp,
        )
    )


@router.get("/", include_in_schema=False)
async def get_achievements_trailing_slash() -> RedirectResponse:
    """307 the legacy trailing-slash form onto the canonical slash-less route.

    Relative Location keeps the browser's follow-up same-origin (through
    nginx / the Next dev proxy), unlike redirect_slashes' absolute one.
    """
    return RedirectResponse("/api/achievements", status_code=307)


@router.get("/stats", response_model=AchievementStatsResponse)
async def get_achievement_stats(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return aggregated achievement statistics for the user."""
    stats = await AchievementService.get_stats(db, str(user.id))

    if isinstance(stats, dict):
        return AchievementStatsResponse(**stats)
    return AchievementStatsResponse.model_validate(stats)


@router.get("/{achievement_id}", response_model=AchievementSchema)
async def get_achievement(
    achievement_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return a single achievement with the user's unlock status."""
    try:
        achievement = await AchievementService.get_achievement(
            db, user_id=str(user.id), achievement_id=achievement_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
    except StatementError:
        # A non-UUID achievement_id reaches the UUID primary-key probe inside
        # the service; SQLAlchemy wraps the ValueError in StatementError,
        # which used to escape as a 500. Same 404 contract as ValueError.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Achievement '{achievement_id}' not found",
        )

    if isinstance(achievement, AchievementSchema):
        out = achievement
    elif isinstance(achievement, dict):
        out = AchievementSchema(**achievement)
    else:
        out = AchievementSchema.model_validate(achievement)

    if not out.name:
        out.name = out.title
    if not out.icon:
        out.icon = out.icon_name
    return out
