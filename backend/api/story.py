"""
Story API Router -- Story-based learning and Junior World for CISCE K-12 platform
===============================================================================

Endpoints:
  GET  /api/story/junior/levels                     List Junior World levels (Class 1-5)
  GET  /api/story/junior/{level_id}                 Get a level with story and games
  POST /api/story/junior/{level_id}/complete        Mark level complete, award stars
  GET  /api/story/adventures                       List learning adventures for all classes
  GET  /api/story/adventure/{adventure_id}          Get adventure details
  POST /api/story/adventure/{adventure_id}/progress Save adventure progress
  GET  /api/story/health                            Health check
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from database import get_db
from services.junior_service import JuniorService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/story", tags=["story"])


# ---------------------------------------------------------------------------
# Service import with graceful degradation
# ---------------------------------------------------------------------------
try:
    from services.junior_service import JuniorService

    HAS_JUNIOR_SERVICE = True
except ImportError:
    HAS_JUNIOR_SERVICE = False
    logger.warning("JuniorService not available; endpoints will return 503")

try:
    # AdventureService not available

    HAS_ADVENTURE_SERVICE = True
except ImportError:
    HAS_ADVENTURE_SERVICE = False
    logger.warning("AdventureService not available; adventure endpoints will return 503")


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class LevelSummary(BaseModel):
    """Summary of a Junior World level."""

    level_id: str = Field(..., description="Unique level identifier")
    level_number: int = Field(..., ge=1, description="Level number (1-5 for Classes 1-5)")
    class_name: str = Field(..., description="Class name, e.g. 'Class 3'")
    title: str = Field(..., description="Level title")
    description: str = Field(..., description="Brief description of the level")
    theme: str = Field(..., description="Visual/learning theme of the level")
    total_stars: int = Field(..., ge=0, description="Maximum stars achievable")
    is_locked: bool = Field(..., description="Whether the level is locked for this student")
    is_completed: bool = Field(..., description="Whether the student has completed the level")
    stars_earned: int = Field(..., ge=0, description="Stars earned by the student")

    model_config = {"json_schema_extra": {
        "example": {
            "level_id": "junior-level-3",
            "level_number": 3,
            "class_name": "Class 3",
            "title": "Magical Forest",
            "description": "Explore the magical forest and help the animals!",
            "theme": "forest",
            "total_stars": 15,
            "is_locked": False,
            "is_completed": False,
            "stars_earned": 7,
        }
    }}


class StoryContent(BaseModel):
    """Story content within a level."""

    story_id: str = Field(..., description="Unique story identifier")
    title: str = Field(..., description="Story title")
    narrative: str = Field(..., description="Story text content")
    character_name: str = Field(..., description="Main character name")
    character_avatar: Optional[str] = Field(None, description="URL to character avatar image")
    pages: list[str] = Field(..., description="Ordered list of story pages text")
    moral: Optional[str] = Field(None, description="Story moral or lesson")

    model_config = {"json_schema_extra": {
        "example": {
            "story_id": "story-forest-1",
            "title": "The Lost Kitten",
            "narrative": "Maya found a tiny kitten in the forest...",
            "character_name": "Maya",
            "character_avatar": None,
            "pages": ["Page 1 text...", "Page 2 text..."],
            "moral": "Always help those in need.",
        }
    }}


class GameSummary(BaseModel):
    """Summary of a mini-game within a level."""

    game_id: str = Field(..., description="Unique game identifier")
    game_type: str = Field(..., description="Type: quiz / puzzle / drag_drop / matching")
    title: str = Field(..., description="Game title")
    description: str = Field(..., description="Game description")
    difficulty: str = Field(..., description="easy / medium / hard")
    points_available: int = Field(..., ge=0, description="Points available from this game")
    is_completed: bool = Field(..., description="Whether the student completed this game")
    score: Optional[int] = Field(None, ge=0, description="Student score if completed")

    model_config = {"json_schema_extra": {
        "example": {
            "game_id": "game-match-animals",
            "game_type": "matching",
            "title": "Match the Animals",
            "description": "Match each animal with its sound.",
            "difficulty": "easy",
            "points_available": 10,
            "is_completed": True,
            "score": 8,
        }
    }}


class LevelDetailResponse(BaseModel):
    """Full detail of a Junior World level including story and games."""

    level_id: str = Field(..., description="Unique level identifier")
    level_number: int = Field(..., ge=1)
    class_name: str = Field(..., description="Class name")
    title: str = Field(..., description="Level title")
    description: str = Field(..., description="Level description")
    theme: str = Field(..., description="Visual theme")
    total_stars: int = Field(..., ge=0)
    stars_earned: int = Field(..., ge=0)
    is_locked: bool = Field(...)
    is_completed: bool = Field(...)
    story: Optional[StoryContent] = Field(None, description="Story content for this level")
    games: list[GameSummary] = Field(default_factory=list, description="Mini-games in this level")
    rewards: list[str] = Field(default_factory=list, description="Rewards unlocked upon completion")

    model_config = {"json_schema_extra": {
        "example": {
            "level_id": "junior-level-3",
            "level_number": 3,
            "class_name": "Class 3",
            "title": "Magical Forest",
            "description": "Explore the magical forest...",
            "theme": "forest",
            "total_stars": 15,
            "stars_earned": 7,
            "is_locked": False,
            "is_completed": False,
            "story": None,
            "games": [],
            "rewards": ["badge-forest-explorer"],
        }
    }}


class CompleteLevelRequest(BaseModel):
    """Request to mark a Junior World level as complete."""

    student_id: str = Field(..., min_length=1, description="Student unique identifier")
    game_scores: dict[str, int] = Field(
        default_factory=dict,
        description="Map of game_id to score achieved",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "student-abc-123",
            "game_scores": {
                "game-match-animals": 8,
                "game-spell-words": 10,
            },
        }
    }}


class CompleteLevelResponse(BaseModel):
    """Response after marking a level complete."""

    level_id: str = Field(..., description="Level identifier")
    student_id: str = Field(..., description="Student identifier")
    stars_awarded: int = Field(..., ge=0, description="Stars awarded in this completion")
    total_stars: int = Field(..., ge=0, description="Total stars now earned")
    new_badges: list[str] = Field(default_factory=list, description="Newly unlocked badges")
    is_completed: bool = Field(..., description="Whether the level is now fully completed")
    next_level_unlocked: bool = Field(..., description="Whether the next level is now unlocked")
    completed_at: datetime = Field(..., description="Timestamp of completion")

    model_config = {"json_schema_extra": {
        "example": {
            "level_id": "junior-level-3",
            "student_id": "student-abc-123",
            "stars_awarded": 10,
            "total_stars": 17,
            "new_badges": ["badge-forest-master"],
            "is_completed": True,
            "next_level_unlocked": True,
            "completed_at": "2026-01-15T10:30:00Z",
        }
    }}


class AdventureSummary(BaseModel):
    """Summary of a learning adventure."""

    adventure_id: str = Field(..., description="Unique adventure identifier")
    title: str = Field(..., description="Adventure title")
    class_name: str = Field(..., description="Target class, e.g. 'Class 8'")
    subject: str = Field(..., description="Subject area")
    description: str = Field(..., description="Brief description")
    difficulty: str = Field(..., description="easy / medium / hard")
    estimated_duration_minutes: int = Field(..., ge=1, description="Estimated duration in minutes")
    total_steps: int = Field(..., ge=1, description="Total number of steps in the adventure")
    is_started: bool = Field(..., description="Whether the student has started this adventure")
    is_completed: bool = Field(..., description="Whether the student completed this adventure")
    progress_percent: int = Field(..., ge=0, le=100, description="Progress percentage 0-100")
    thumbnail_url: Optional[str] = Field(None, description="URL to thumbnail image")

    model_config = {"json_schema_extra": {
        "example": {
            "adventure_id": "adv-chemistry-lab",
            "title": "Chemistry Lab Adventure",
            "class_name": "Class 8",
            "subject": "Chemistry",
            "description": "Explore the chemistry lab and conduct experiments!",
            "difficulty": "medium",
            "estimated_duration_minutes": 45,
            "total_steps": 10,
            "is_started": True,
            "is_completed": False,
            "progress_percent": 40,
            "thumbnail_url": None,
        }
    }}


class AdventureDetailResponse(BaseModel):
    """Full details of a learning adventure."""

    adventure_id: str = Field(..., description="Unique adventure identifier")
    title: str = Field(..., description="Adventure title")
    class_name: str = Field(..., description="Target class")
    subject: str = Field(..., description="Subject area")
    description: str = Field(..., description="Detailed description")
    difficulty: str = Field(..., description="Difficulty level")
    estimated_duration_minutes: int = Field(..., ge=1)
    total_steps: int = Field(..., ge=1)
    steps: list[dict[str, Any]] = Field(
        default_factory=list,
        description="Ordered list of adventure steps",
    )
    learning_objectives: list[str] = Field(
        default_factory=list,
        description="Learning objectives for this adventure",
    )
    prerequisites: list[str] = Field(
        default_factory=list,
        description="Prerequisites or required topics",
    )
    rewards: list[str] = Field(default_factory=list, description="Rewards on completion")
    thumbnail_url: Optional[str] = Field(None)

    model_config = {"json_schema_extra": {
        "example": {
            "adventure_id": "adv-chemistry-lab",
            "title": "Chemistry Lab Adventure",
            "class_name": "Class 8",
            "subject": "Chemistry",
            "description": "Detailed description...",
            "difficulty": "medium",
            "estimated_duration_minutes": 45,
            "total_steps": 10,
            "steps": [],
            "learning_objectives": [],
            "prerequisites": [],
            "rewards": [],
            "thumbnail_url": None,
        }
    }}


class SaveProgressRequest(BaseModel):
    """Request to save adventure progress."""

    student_id: str = Field(..., min_length=1, description="Student unique identifier")
    current_step: int = Field(..., ge=0, description="Current step index (0-based)")
    step_data: dict[str, Any] = Field(
        default_factory=dict,
        description="Arbitrary data for the current step",
    )
    completed: bool = Field(default=False, description="Whether the adventure is fully completed")

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "student-abc-123",
            "current_step": 3,
            "step_data": {"quiz_score": 8, "time_spent_seconds": 120},
            "completed": False,
        }
    }}


class SaveProgressResponse(BaseModel):
    """Response after saving adventure progress."""

    adventure_id: str = Field(..., description="Adventure identifier")
    student_id: str = Field(..., description="Student identifier")
    current_step: int = Field(..., ge=0, description="Updated current step")
    progress_percent: int = Field(..., ge=0, le=100, description="Updated progress percentage")
    completed: bool = Field(..., description="Whether the adventure is now completed")
    new_rewards: list[str] = Field(default_factory=list, description="Newly unlocked rewards")
    saved_at: datetime = Field(..., description="Timestamp when progress was saved")

    model_config = {"json_schema_extra": {
        "example": {
            "adventure_id": "adv-chemistry-lab",
            "student_id": "student-abc-123",
            "current_step": 3,
            "progress_percent": 40,
            "completed": False,
            "new_rewards": [],
            "saved_at": "2026-01-15T10:30:00Z",
        }
    }}


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Overall health status")
    service: str = Field(..., description="Service name")
    junior_service_available: bool = Field(..., description="Whether JuniorService is available")
    adventure_service_available: bool = Field(..., description="Whether AdventureService is available")
    timestamp: datetime = Field(..., description="Health check timestamp")


# ---------------------------------------------------------------------------
# In-memory data fallbacks (used when services are unavailable)
# ---------------------------------------------------------------------------

DEFAULT_JUNIOR_LEVELS: list[dict[str, Any]] = [
    {
        "level_id": "junior-level-1",
        "level_number": 1,
        "class_name": "Class 1",
        "title": "Sunny Meadow",
        "description": "A gentle introduction to numbers and shapes in a sunny meadow.",
        "theme": "meadow",
        "total_stars": 10,
        "is_locked": False,
        "is_completed": False,
        "stars_earned": 0,
    },
    {
        "level_id": "junior-level-2",
        "level_number": 2,
        "class_name": "Class 2",
        "title": "Counting Garden",
        "description": "Learn counting and basic addition in a beautiful garden.",
        "theme": "garden",
        "total_stars": 12,
        "is_locked": False,
        "is_completed": False,
        "stars_earned": 0,
    },
    {
        "level_id": "junior-level-3",
        "level_number": 3,
        "class_name": "Class 3",
        "title": "Magical Forest",
        "description": "Explore the magical forest and solve puzzles with friendly creatures.",
        "theme": "forest",
        "total_stars": 15,
        "is_locked": True,
        "is_completed": False,
        "stars_earned": 0,
    },
    {
        "level_id": "junior-level-4",
        "level_number": 4,
        "class_name": "Class 4",
        "title": "Ocean Depths",
        "description": "Dive deep into the ocean and discover marine math adventures.",
        "theme": "ocean",
        "total_stars": 18,
        "is_locked": True,
        "is_completed": False,
        "stars_earned": 0,
    },
    {
        "level_id": "junior-level-5",
        "level_number": 5,
        "class_name": "Class 5",
        "title": "Space Explorers",
        "description": "Blast off into space and conquer advanced arithmetic challenges.",
        "theme": "space",
        "total_stars": 20,
        "is_locked": True,
        "is_completed": False,
        "stars_earned": 0,
    },
]

DEFAULT_ADVENTURES: list[dict[str, Any]] = [
    {
        "adventure_id": "adv-numbers-quest",
        "title": "Numbers Quest",
        "class_name": "Class 1",
        "subject": "Mathematics",
        "description": "Join the numbers quest and learn counting from 1 to 100!",
        "difficulty": "easy",
        "estimated_duration_minutes": 30,
        "total_steps": 8,
        "is_started": False,
        "is_completed": False,
        "progress_percent": 0,
    },
    {
        "adventure_id": "adv-grammar-forest",
        "title": "Grammar Forest",
        "class_name": "Class 2",
        "subject": "English",
        "description": "Navigate through the grammar forest and master nouns, verbs, and adjectives.",
        "difficulty": "easy",
        "estimated_duration_minutes": 35,
        "total_steps": 10,
        "is_started": False,
        "is_completed": False,
        "progress_percent": 0,
    },
    {
        "adventure_id": "adv-science-lab",
        "title": "Science Lab Adventure",
        "class_name": "Class 4",
        "subject": "Science",
        "description": "Conduct virtual experiments in the science lab!",
        "difficulty": "medium",
        "estimated_duration_minutes": 45,
        "total_steps": 12,
        "is_started": False,
        "is_completed": False,
        "progress_percent": 0,
    },
    {
        "adventure_id": "adv-history-time-machine",
        "title": "History Time Machine",
        "class_name": "Class 5",
        "subject": "History",
        "description": "Travel through time and discover ancient civilizations!",
        "difficulty": "medium",
        "estimated_duration_minutes": 50,
        "total_steps": 15,
        "is_started": False,
        "is_completed": False,
        "progress_percent": 0,
    },
    {
        "adventure_id": "adv-geometry-world",
        "title": "Geometry World",
        "class_name": "Class 6",
        "subject": "Mathematics",
        "description": "Explore shapes, angles, and geometric transformations.",
        "difficulty": "hard",
        "estimated_duration_minutes": 60,
        "total_steps": 20,
        "is_started": False,
        "is_completed": False,
        "progress_percent": 0,
    },
]


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------


def _utcnow() -> datetime:
    """Return current UTC datetime."""
    return datetime.now(timezone.utc)


def _check_junior_service() -> JuniorService:
    """Return JuniorService instance or raise 503."""
    if not HAS_JUNIOR_SERVICE:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Junior World service is not available",
        )
    return JuniorService()


def _check_adventure_service() -> "AdventureService":
    """Return AdventureService instance or raise 503."""
    if not HAS_ADVENTURE_SERVICE:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Adventure service is not available",
        )
    return None


def _apply_student_context(levels: list[dict[str, Any]], student_id: str) -> list[dict[str, Any]]:
    """Apply student-specific context (locked/completed/stars) to level summaries."""
    # In a real implementation, this would query the database for the student's
    # progress. For now we return the defaults.
    result = []
    for level in levels:
        level_copy = dict(level)
        level_copy["is_locked"] = level_copy.get("is_locked", False)
        level_copy["is_completed"] = level_copy.get("is_completed", False)
        level_copy["stars_earned"] = level_copy.get("stars_earned", 0)
        result.append(level_copy)
    return result


# ---------------------------------------------------------------------------
# Endpoints: Junior World
# ---------------------------------------------------------------------------


@router.get(
    "/junior/levels",
    response_model=list[LevelSummary],
    summary="List Junior World levels",
    description="Returns a list of all Junior World levels for Classes 1 through 5.",
)
async def list_junior_levels(
    student_id: Optional[str] = Query(None, description="Optional student ID for progress context"),
    db: AsyncSession = Depends(get_db),
) -> list[LevelSummary]:
    """List all Junior World levels (Class 1-5) with optional student progress context."""
    try:
        service = _check_junior_service()
        raw_levels = await service.list_levels(db=db, student_id=student_id)
        return [LevelSummary(**lvl) for lvl in raw_levels]
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error listing junior levels: %s", exc)
        # Fallback to default data
        fallback = _apply_student_context(DEFAULT_JUNIOR_LEVELS, student_id or "")
        return [LevelSummary(**lvl) for lvl in fallback]


@router.get(
    "/junior/{level_id}",
    response_model=LevelDetailResponse,
    summary="Get Junior World level detail",
    description="Returns full detail for a specific level including story content and mini-games.",
)
async def get_junior_level(
    level_id: str,
    student_id: Optional[str] = Query(None, description="Optional student ID for progress context"),
    db: AsyncSession = Depends(get_db),
) -> LevelDetailResponse:
    """Get a specific Junior World level with story content and games."""
    try:
        service = _check_junior_service()
        level_data = await service.get_level_detail(
            db=db, level_id=level_id, student_id=student_id
        )
        if level_data is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Junior World level '{level_id}' not found",
            )
        return LevelDetailResponse(**level_data)
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error fetching junior level '%s': %s", level_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch level detail",
        )


@router.post(
    "/junior/{level_id}/complete",
    response_model=CompleteLevelResponse,
    summary="Mark Junior World level complete",
    description="Marks a level as complete for the student, calculates stars, and awards badges.",
    status_code=status.HTTP_200_OK,
)
async def complete_junior_level(
    level_id: str,
    request: CompleteLevelRequest,
    db: AsyncSession = Depends(get_db),
) -> CompleteLevelResponse:
    """Mark a Junior World level as complete and award stars to the student."""
    try:
        service = _check_junior_service()
        result = await service.complete_level(
            db=db,
            level_id=level_id,
            student_id=request.student_id,
            game_scores=request.game_scores,
        )
        return CompleteLevelResponse(**result)
    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error("Error completing junior level '%s': %s", level_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to complete level",
        )


# ---------------------------------------------------------------------------
# Endpoints: Learning Adventures
# ---------------------------------------------------------------------------


@router.get(
    "/adventures",
    response_model=list[AdventureSummary],
    summary="List learning adventures",
    description="Returns a list of all learning adventures available across classes.",
)
async def list_adventures(
    class_name: Optional[str] = Query(None, description="Filter by class name, e.g. 'Class 8'"),
    subject: Optional[str] = Query(None, description="Filter by subject slug"),
    student_id: Optional[str] = Query(None, description="Optional student ID for progress context"),
    db: AsyncSession = Depends(get_db),
) -> list[AdventureSummary]:
    """List all learning adventures, optionally filtered by class and subject."""
    try:
        service = _check_adventure_service()
        raw_adventures = await service.list_adventures(
            db=db, class_name=class_name, subject=subject, student_id=student_id
        )
        return [AdventureSummary(**adv) for adv in raw_adventures]
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error listing adventures: %s", exc)
        # Fallback to default data
        adventures = DEFAULT_ADVENTURES
        if class_name:
            adventures = [a for a in adventures if a.get("class_name") == class_name]
        if subject:
            adventures = [a for a in adventures if a.get("subject", "").lower() == subject.lower()]
        return [AdventureSummary(**adv) for adv in adventures]


@router.get(
    "/adventure/{adventure_id}",
    response_model=AdventureDetailResponse,
    summary="Get adventure details",
    description="Returns full details of a specific learning adventure including all steps.",
)
async def get_adventure_detail(
    adventure_id: str,
    student_id: Optional[str] = Query(None, description="Optional student ID for progress context"),
    db: AsyncSession = Depends(get_db),
) -> AdventureDetailResponse:
    """Get full details of a specific learning adventure."""
    try:
        service = _check_adventure_service()
        adv_data = await service.get_adventure_detail(
            db=db, adventure_id=adventure_id, student_id=student_id
        )
        if adv_data is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Adventure '{adventure_id}' not found",
            )
        return AdventureDetailResponse(**adv_data)
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error fetching adventure '%s': %s", adventure_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch adventure detail",
        )


@router.post(
    "/adventure/{adventure_id}/progress",
    response_model=SaveProgressResponse,
    summary="Save adventure progress",
    description="Saves the student's current progress in an adventure and returns updated state.",
    status_code=status.HTTP_200_OK,
)
async def save_adventure_progress(
    adventure_id: str,
    request: SaveProgressRequest,
    db: AsyncSession = Depends(get_db),
) -> SaveProgressResponse:
    """Save the student's progress in a learning adventure."""
    try:
        service = _check_adventure_service()
        result = await service.save_progress(
            db=db,
            adventure_id=adventure_id,
            student_id=request.student_id,
            current_step=request.current_step,
            step_data=request.step_data,
            completed=request.completed,
        )
        return SaveProgressResponse(**result)
    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error("Error saving progress for adventure '%s': %s", adventure_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save adventure progress",
        )


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Story service health check",
    description="Returns the health status of the Story API and its dependent services.",
)
async def health_check(db: AsyncSession = Depends(get_db)) -> HealthResponse:
    """Health check endpoint for the Story API."""
    junior_ok = False
    adventure_ok = False

    if HAS_JUNIOR_SERVICE:
        try:
            junior_ok = await _check_junior_service().health_check(db=db)
        except Exception:
            junior_ok = False

    if HAS_ADVENTURE_SERVICE:
        try:
            adventure_ok = await _check_adventure_service().health_check(db=db)
        except Exception:
            adventure_ok = False

    overall_status = "healthy" if (junior_ok and adventure_ok) else "degraded"
    if not HAS_JUNIOR_SERVICE and not HAS_ADVENTURE_SERVICE:
        overall_status = "unavailable"

    return HealthResponse(
        status=overall_status,
        service="story-api",
        junior_service_available=HAS_JUNIOR_SERVICE and junior_ok,
        adventure_service_available=HAS_ADVENTURE_SERVICE and adventure_ok,
        timestamp=_utcnow(),
    )