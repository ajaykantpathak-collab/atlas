"""
Achievements API Router — bridges frontend /api/achievements/* calls.

Endpoints:
  GET /api/achievements           List achievements (optional filter)
  GET /api/achievements/{id}      Get single achievement
  GET /api/achievements/stats     Get achievement stats
"""

from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/achievements", tags=["achievements"])

# ---------------------------------------------------------------------------
# Optional imports
# ---------------------------------------------------------------------------
try:
    from database import get_db, Student  # type: ignore
    _HAS_DB = True
except ImportError:
    _HAS_DB = False
    get_db = None  # type: ignore
    Student = None  # type: ignore

# ---------------------------------------------------------------------------
# Response models
# ---------------------------------------------------------------------------

class AchievementSchema(BaseModel):
    id: str = ""
    achievementId: str = ""
    title: str = ""
    description: str = ""
    iconName: str = "trophy"
    tier: str = "bronze"
    xpReward: int = 0
    unlocked: bool = False
    unlockedAt: Optional[str] = None
    progress: Optional[int] = None
    maxProgress: Optional[int] = None

class AchievementListResponse(BaseModel):
    achievements: list[AchievementSchema] = []
    unlockedCount: int = 0
    totalXp: int = 0

class AchievementStats(BaseModel):
    unlockedCount: int = 0
    totalXp: int = 0
    completionPercentage: float = 0.0


# ---------------------------------------------------------------------------
# Default achievement catalog (used when DB has no achievements)
# ---------------------------------------------------------------------------

_DEFAULT_ACHIEVEMENTS = [
    AchievementSchema(id="first_lesson", achievementId="first_lesson",
        title="First Steps", description="Complete your first lesson",
        iconName="book-open", tier="bronze", xpReward=10),
    AchievementSchema(id="first_quiz", achievementId="first_quiz",
        title="Quiz Rookie", description="Complete your first quiz",
        iconName="clipboard-check", tier="bronze", xpReward=15),
    AchievementSchema(id="streak_7", achievementId="streak_7",
        title="Week Warrior", description="7-day study streak",
        iconName="flame", tier="silver", xpReward=50),
    AchievementSchema(id="streak_30", achievementId="streak_30",
        title="Monthly Master", description="30-day study streak",
        iconName="flame", tier="gold", xpReward=200),
    AchievementSchema(id="mastery_first", achievementId="mastery_first",
        title="Concept Master", description="Master your first topic",
        iconName="star", tier="bronze", xpReward=20),
    AchievementSchema(id="mastery_10", achievementId="mastery_10",
        title="Scholar", description="Master 10 topics",
        iconName="graduation-cap", tier="silver", xpReward=100),
    AchievementSchema(id="mastery_50", achievementId="mastery_50",
        title="Expert", description="Master 50 topics",
        iconName="crown", tier="gold", xpReward=500),
    AchievementSchema(id="perfect_quiz", achievementId="perfect_quiz",
        title="Perfect Score", description="Get 100% on a quiz",
        iconName="target", tier="silver", xpReward=75),
    AchievementSchema(id="exam_complete", achievementId="exam_complete",
        title="Exam Warrior", description="Complete a full exam",
        iconName="award", tier="silver", xpReward=100),
    AchievementSchema(id="tutor_session", achievementId="tutor_session",
        title="Curious Mind", description="Start a tutor session",
        iconName="message-circle", tier="bronze", xpReward=10),
    AchievementSchema(id="simulation_run", achievementId="simulation_run",
        title="Scientist", description="Run your first simulation",
        iconName="flask-conical", tier="bronze", xpReward=15),
    AchievementSchema(id="level_5", achievementId="level_5",
        title="Rising Star", description="Reach level 5",
        iconName="trending-up", tier="silver", xpReward=100),
    AchievementSchema(id="level_10", achievementId="level_10",
        title="Achiever", description="Reach level 10",
        iconName="trending-up", tier="gold", xpReward=300),
    AchievementSchema(id="level_25", achievementId="level_25",
        title="Champion", description="Reach level 25",
        iconName="trophy", tier="platinum", xpReward=1000),
    AchievementSchema(id="all_subjects", achievementId="all_subjects",
        title="Renaissance Student", description="Practice in 5 different subjects",
        iconName="globe", tier="gold", xpReward=250),
]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("", response_model=AchievementListResponse)
async def list_achievements(
    filter: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db) if _HAS_DB else None,
):
    """List all achievements with unlock status."""
    achievements = list(_DEFAULT_ACHIEVEMENTS)

    if filter == "unlocked":
        achievements = [a for a in achievements if a.unlocked]
    elif filter == "locked":
        achievements = [a for a in achievements if not a.unlocked]

    unlocked_count = sum(1 for a in achievements if a.unlocked)
    total_xp = sum(a.xpReward for a in achievements if a.unlocked)

    return AchievementListResponse(
        achievements=achievements,
        unlockedCount=unlocked_count,
        totalXp=total_xp,
    )


@router.get("/stats", response_model=AchievementStats)
async def get_achievement_stats(db: AsyncSession = Depends(get_db) if _HAS_DB else None):
    """Get achievement statistics."""
    total = len(_DEFAULT_ACHIEVEMENTS)
    unlocked = sum(1 for a in _DEFAULT_ACHIEVEMENTS if a.unlocked)
    total_xp = sum(a.xpReward for a in _DEFAULT_ACHIEVEMENTS if a.unlocked)
    return AchievementStats(
        unlockedCount=unlocked,
        totalXp=total_xp,
        completionPercentage=(unlocked / total * 100) if total > 0 else 0.0,
    )


@router.get("/health")
async def achievements_health():
    """Health check."""
    return {"status": "healthy", "achievements": len(_DEFAULT_ACHIEVEMENTS)}


@router.get("/{achievement_id}", response_model=AchievementSchema)
async def get_achievement(achievement_id: str):
    """Get a single achievement by ID."""
    for a in _DEFAULT_ACHIEVEMENTS:
        if a.achievementId == achievement_id or a.id == achievement_id:
            return a
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Achievement '{achievement_id}' not found",
    )
