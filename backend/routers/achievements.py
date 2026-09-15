"""Achievements router for the DREAM_APP educational platform.

Exposes endpoints for listing achievements, viewing individual achievements,
and retrieving achievement statistics.
"""

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
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

    total_achievements: int = 0
    unlocked_count: int = 0
    locked_count: int = 0
    total_xp_earned: int = 0
    completion_percentage: float = 0.0
    recent_unlocks: list = []


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #
@router.get("/", response_model=AchievementListResponse)
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
    return _fill_compat(
        AchievementListResponse(
            achievements=items,
            unlocked_count=len(unlocked),
            total_xp=total_xp,
        )
    )


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
