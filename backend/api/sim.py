"""
Simulation API Router - K-12 Learning Platform (CISCE/ICSE/ISC)
=================================================================

Simulation browser and launcher API for discovering, launching, and
tracking interactive simulations mapped to the CISCE curriculum.

Endpoints:
  GET  /api/sim/list             - List all simulations (with filters)
  GET  /api/sim/{sim_id}         - Get simulation metadata and component path
  GET  /api/sim/topic/{node_id}  - Get simulations mapped to a curriculum node
  POST /api/sim/{sim_id}/launch  - Log simulation launch (analytics)
  POST /api/sim/{sim_id}/complete - Log simulation completion
  GET  /api/sim/verified         - List only verified simulations
  GET  /api/sim/health           - Health check
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from database import get_db
from services.analytics_service import AnalyticsService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/sim", tags=["Simulation"])


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class SimulationListItem(BaseModel):
    """Summary of a simulation for list responses."""

    sim_id: str = Field(..., description="Unique simulation identifier")
    title: str = Field(..., description="Display title of the simulation")
    description: Optional[str] = Field(
        None, description="Short description of what the simulation covers"
    )
    subject: str = Field(..., description="Subject slug, e.g. 'physics'")
    class_level: str = Field(..., description="CISCE class, e.g. '10'")
    topic_id: Optional[str] = Field(
        None, description="Linked curriculum topic node ID"
    )
    topic_name: Optional[str] = Field(
        None, description="Human-readable topic name"
    )
    is_verified: bool = Field(
        default=False, description="Whether the simulation is verified"
    )
    thumbnail_url: Optional[str] = Field(
        None, description="URL to thumbnail preview image"
    )
    estimated_duration_min: Optional[int] = Field(
        None, ge=1, description="Estimated completion time in minutes"
    )
    launch_count: int = Field(
        default=0, description="Total number of launches"
    )
    created_at: Optional[datetime] = Field(
        None, description="ISO-8601 creation timestamp"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "sim_id": "sim-phy-001",
            "title": "Projectile Motion Lab",
            "description": "Explore how angle and velocity affect projectile range.",
            "subject": "physics",
            "class_level": "10",
            "topic_id": "phy-kin-003",
            "topic_name": "Kinematics",
            "is_verified": True,
            "thumbnail_url": "https://cdn.example.com/sims/projectile-thumb.png",
            "estimated_duration_min": 15,
            "launch_count": 342,
            "created_at": "2025-08-10T08:00:00Z",
        }
    }}


class SimulationDetail(BaseModel):
    """Full metadata for a single simulation."""

    sim_id: str = Field(..., description="Unique simulation identifier")
    title: str = Field(..., description="Display title")
    description: Optional[str] = Field(None, description="Detailed description")
    instructions: Optional[str] = Field(
        None, description="Step-by-step instructions for the student"
    )
    learning_objectives: list[str] = Field(
        default_factory=list,
        description="List of learning objectives this simulation addresses",
    )
    subject: str = Field(..., description="Subject slug")
    class_level: str = Field(..., description="CISCE class level")
    topic_id: Optional[str] = Field(None, description="Linked topic node ID")
    topic_name: Optional[str] = Field(None, description="Topic display name")
    is_verified: bool = Field(default=False, description="Verification status")
    component_path: str = Field(
        ..., description="Relative path to the simulation web component/bundle"
    )
    component_type: str = Field(
        default="web",
        description="Type of component: web, unity, html5, p5js, phET",
    )
    parameters_schema: Optional[dict[str, Any]] = Field(
        None,
        description="JSON Schema for configurable simulation parameters",
    )
    tags: list[str] = Field(
        default_factory=list, description="Free-form tags for discovery"
    )
    prerequisites: list[str] = Field(
        default_factory=list,
        description="List of concept IDs that should be mastered first",
    )
    estimated_duration_min: Optional[int] = Field(
        None, ge=1, description="Estimated duration in minutes"
    )
    launch_count: int = Field(default=0)
    avg_completion_rate: Optional[float] = Field(
        None, ge=0.0, le=1.0, description="Average completion rate (0-1)"
    )
    created_at: Optional[datetime] = Field(None)
    updated_at: Optional[datetime] = Field(None)

    model_config = {"json_schema_extra": {
        "example": {
            "sim_id": "sim-phy-001",
            "title": "Projectile Motion Lab",
            "description": "Explore projectile motion by adjusting launch angle and velocity.",
            "instructions": "1. Set the angle. 2. Set the initial velocity. 3. Press Launch.",
            "learning_objectives": ["Calculate range", "Analyze trajectory", "Understand components of velocity"],
            "subject": "physics",
            "class_level": "10",
            "topic_id": "phy-kin-003",
            "topic_name": "Kinematics",
            "is_verified": True,
            "component_path": "sims/physics/projectile-motion/index.html",
            "component_type": "html5",
            "parameters_schema": {
                "type": "object",
                "properties": {
                    "angle": {"type": "number", "minimum": 0, "maximum": 90},
                    "velocity": {"type": "number", "minimum": 1, "maximum": 100},
                },
                "required": ["angle", "velocity"],
            },
            "tags": ["kinematics", "projectile", "interactive"],
            "prerequisites": ["phy-vectors-001"],
            "estimated_duration_min": 15,
            "launch_count": 342,
            "avg_completion_rate": 0.87,
            "created_at": "2025-08-10T08:00:00Z",
            "updated_at": "2025-09-01T12:00:00Z",
        }
    }}


class LaunchRequest(BaseModel):
    """Request to log a simulation launch."""

    student_id: str = Field(..., min_length=1, description="Student identifier")
    session_id: Optional[str] = Field(
        None, description="Optional session context identifier"
    )
    parameters: Optional[dict[str, Any]] = Field(
        default_factory=dict,
        description="Parameters passed to the simulation",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-2024-001",
            "session_id": "sess-phy-abc123",
            "parameters": {"angle": 45, "velocity": 50},
        }
    }}


class CompleteRequest(BaseModel):
    """Request to log a simulation completion."""

    student_id: str = Field(..., min_length=1, description="Student identifier")
    session_id: Optional[str] = Field(None, description="Session context identifier")
    score: Optional[float] = Field(
        None,
        ge=0.0,
        description="Optional score or metric from the simulation (0-100)",
    )
    time_spent_sec: Optional[int] = Field(
        None, ge=0, description="Total time spent in seconds"
    )
    feedback: Optional[str] = Field(
        None, description="Free-form feedback from the student"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-2024-001",
            "session_id": "sess-phy-abc123",
            "score": 92.0,
            "time_spent_sec": 840,
            "feedback": "Very helpful for understanding range optimization.",
        }
    }}


class LaunchLogResponse(BaseModel):
    """Response after logging a simulation launch."""

    sim_id: str = Field(..., description="Simulation identifier")
    student_id: str = Field(..., description="Student identifier")
    logged_at: datetime = Field(..., description="Timestamp of the log entry")
    message: str = Field(default="Launch logged successfully")

    model_config = {"json_schema_extra": {
        "example": {
            "sim_id": "sim-phy-001",
            "student_id": "stu-2024-001",
            "logged_at": "2025-10-15T10:30:00Z",
            "message": "Launch logged successfully",
        }
    }}


class CompleteLogResponse(BaseModel):
    """Response after logging a simulation completion."""

    sim_id: str = Field(..., description="Simulation identifier")
    student_id: str = Field(..., description="Student identifier")
    logged_at: datetime = Field(..., description="Timestamp of the log entry")
    message: str = Field(default="Completion logged successfully")

    model_config = {"json_schema_extra": {
        "example": {
            "sim_id": "sim-phy-001",
            "student_id": "stu-2024-001",
            "logged_at": "2025-10-15T10:50:00Z",
            "message": "Completion logged successfully",
        }
    }}


class HealthResponse(BaseModel):
    """Health check response for the simulation service."""

    status: str = Field(..., description="Overall health status")
    sim_count: int = Field(..., description="Total simulation count")
    verified_count: int = Field(..., description="Verified simulation count")
    timestamp: datetime = Field(
        ..., description="Time the health check was performed"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "status": "healthy",
            "sim_count": 120,
            "verified_count": 98,
            "timestamp": "2025-10-15T10:00:00Z",
        }
    }}


class ListResponse(BaseModel):
    """Wrapper for paginated simulation list responses."""

    total: int = Field(..., description="Total number of matching simulations")
    page: int = Field(..., ge=1, description="Current page number")
    page_size: int = Field(..., ge=1, description="Items per page")
    simulations: list[SimulationListItem] = Field(
        ..., description="List of simulation summaries"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "total": 2,
            "page": 1,
            "page_size": 20,
            "simulations": [],
        }
    }}


# ---------------------------------------------------------------------------
# Service integration helpers
# ---------------------------------------------------------------------------


def _get_analytics_service(request: Request) -> Optional[AnalyticsService]:
    """Attempt to retrieve AnalyticsService from app state.

    Returns None if the service is not registered (graceful degradation).
    """
    try:
        return request.app.state.analytics_service
    except AttributeError:
        logger.debug("AnalyticsService not available in app state.")
        return None


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "/list",
    response_model=ListResponse,
    summary="List all simulations",
    description=(
        "Returns a paginated list of simulations. Supports filtering by "
        "subject, class_level, and topic."
    ),
)
async def list_simulations(
    request: Request,
    subject: Optional[str] = Query(
        None,
        description="Filter by subject slug (e.g. 'physics')",
    ),
    class_level: Optional[str] = Query(
        None,
        description="Filter by CISCE class level (e.g. '10')",
    ),
    topic: Optional[str] = Query(
        None,
        description="Filter by topic node ID",
    ),
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
) -> ListResponse:
    """List all available simulations with optional filters and pagination."""
    try:
        from models import Simulation  # type: ignore

        stmt = select(Simulation)

        if subject:
            stmt = stmt.where(Simulation.subject == subject)
        if class_level:
            stmt = stmt.where(Simulation.class_level == class_level)
        if topic:
            stmt = stmt.where(Simulation.topic_id == topic)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_result = await db.execute(count_stmt)
        total = total_result.scalar() or 0

        stmt = stmt.offset((page - 1) * page_size).limit(page_size)
        result = await db.execute(stmt)
        rows = result.scalars().all()

        items = [
            SimulationListItem(
                sim_id=row.sim_id,
                title=row.title,
                description=row.description,
                subject=row.subject,
                class_level=row.class_level,
                topic_id=row.topic_id,
                topic_name=row.topic_name,
                is_verified=row.is_verified,
                thumbnail_url=row.thumbnail_url,
                estimated_duration_min=row.estimated_duration_min,
                launch_count=row.launch_count or 0,
                created_at=row.created_at,
            )
            for row in rows
        ]

        return ListResponse(
            total=total,
            page=page,
            page_size=page_size,
            simulations=items,
        )
    except ImportError:
        logger.info(
            "Simulation DB model not available. Falling back to filesystem discovery."
        )
        return _list_from_filesystem(subject, class_level, topic, page, page_size)
    except Exception as exc:
        logger.error("Error listing simulations: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve simulations.",
        )


def _list_from_filesystem(
    subject: Optional[str],
    class_level: Optional[str],
    topic: Optional[str],
    page: int,
    page_size: int,
) -> ListResponse:
    """Fallback: list simulations discovered from the frontend filesystem."""
    from services.simulation_discovery import SimulationDiscovery

    discovery = SimulationDiscovery()
    all_sims = discovery.filter(subject=subject, class_level=class_level, topic=topic)
    total = len(all_sims)
    start = (page - 1) * page_size
    end = start + page_size
    page_sims = all_sims[start:end]

    items = [
        SimulationListItem(
            sim_id=s["sim_id"],
            title=s["title"],
            description=s.get("description"),
            subject=s["subject"],
            class_level=s["class_level"],
            topic_id=s.get("topic_id"),
            topic_name=s.get("topic_name"),
            is_verified=s.get("is_verified", True),
            thumbnail_url=s.get("thumbnail_url"),
            estimated_duration_min=s.get("estimated_duration_min"),
            launch_count=s.get("launch_count", 0),
            created_at=s.get("created_at"),
        )
        for s in page_sims
    ]
    return ListResponse(total=total, page=page, page_size=page_size, simulations=items)


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Simulation service health check",
    description="Returns health status with simulation counts.",
)
async def health_check(db: AsyncSession = Depends(get_db)) -> HealthResponse:
    """Health check endpoint for the simulation service."""
    now = datetime.now(timezone.utc)
    sim_count = 0
    verified_count = 0

    try:
        from models import Simulation  # type: ignore

        count_stmt = select(func.count()).select_from(Simulation)
        total_result = await db.execute(count_stmt)
        sim_count = total_result.scalar() or 0

        verified_stmt = (
            select(func.count())
            .select_from(Simulation)
            .where(Simulation.is_verified == True)  # noqa: E712
        )
        verified_result = await db.execute(verified_stmt)
        verified_count = verified_result.scalar() or 0
    except ImportError:
        # Fallback: count from filesystem discovery
        try:
            from services.simulation_discovery import SimulationDiscovery
            discovery = SimulationDiscovery()
            sim_count = discovery.count()
            verified_count = sim_count  # All discovered sims are considered verified
        except Exception as exc:
            logger.debug("Filesystem discovery also failed: %s", exc)
    except Exception as exc:
        logger.error("Health check database query failed: %s", exc)

    return HealthResponse(
        status="healthy" if sim_count >= 0 else "degraded",
        sim_count=sim_count,
        verified_count=verified_count,
        timestamp=now,
    )


@router.get(
    "/verified",
    response_model=list[SimulationListItem],
    summary="List verified simulations",
    description="Returns all simulations that have passed content verification.",
)
async def list_verified_simulations(
    request: Request,
    subject: Optional[str] = Query(
        None,
        description="Filter by subject slug",
    ),
    class_level: Optional[str] = Query(
        None,
        description="Filter by CISCE class level",
    ),
    db: AsyncSession = Depends(get_db),
) -> list[SimulationListItem]:
    """Return only simulations with is_verified=True."""
    try:
        from models import Simulation  # type: ignore

        stmt = select(Simulation).where(Simulation.is_verified == True)  # noqa: E712

        if subject:
            stmt = stmt.where(Simulation.subject == subject)
        if class_level:
            stmt = stmt.where(Simulation.class_level == class_level)

        stmt = stmt.order_by(Simulation.created_at.desc())
        result = await db.execute(stmt)
        rows = result.scalars().all()

        return [
            SimulationListItem(
                sim_id=row.sim_id,
                title=row.title,
                description=row.description,
                subject=row.subject,
                class_level=row.class_level,
                topic_id=row.topic_id,
                topic_name=row.topic_name,
                is_verified=row.is_verified,
                thumbnail_url=row.thumbnail_url,
                estimated_duration_min=row.estimated_duration_min,
                launch_count=row.launch_count or 0,
                created_at=row.created_at,
            )
            for row in rows
        ]
    except ImportError:
        logger.info("Simulation DB model not available. Using filesystem discovery.")
        from services.simulation_discovery import SimulationDiscovery
        discovery = SimulationDiscovery()
        all_sims = discovery.filter(subject=subject, class_level=class_level)
        return [
            SimulationListItem(
                sim_id=s["sim_id"],
                title=s["title"],
                description=s.get("description"),
                subject=s["subject"],
                class_level=s["class_level"],
                topic_id=s.get("topic_id"),
                topic_name=s.get("topic_name"),
                is_verified=s.get("is_verified", True),
                thumbnail_url=s.get("thumbnail_url"),
                estimated_duration_min=s.get("estimated_duration_min"),
                launch_count=s.get("launch_count", 0),
                created_at=s.get("created_at"),
            )
            for s in all_sims
        ]
    except Exception as exc:
        logger.error("Error listing verified simulations: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve verified simulations.",
        )


@router.get(
    "/resolve",
    response_model=SimulationDetail,
    summary="Resolve the correct simulation for a student's class level",
    description=(
        "Given a topic name and the student's class level, returns the "
        "correct version of the simulation. E.g. a Class 2 student asking "
        "for 'Plants' gets 2_PlantsGame, not 1_PlantsGame."
    ),
)
async def resolve_simulation(
    topic: str = Query(..., description="Topic name (e.g. 'Plants', 'Atomic Structure')"),
    class_level: str = Query(..., description="Student's class level (e.g. '2', '10', '6-8')"),
    subject: Optional[str] = Query(None, description="Optional subject filter"),
    db: AsyncSession = Depends(get_db),
) -> SimulationDetail:
    """Resolve the correct simulation version for a student's class level."""
    from services.simulation_discovery import SimulationDiscovery

    discovery = SimulationDiscovery()
    all_sims = discovery.discover()

    # Normalize for matching
    topic_clean = topic.lower().replace(" ", "").replace("_", "").replace("-", "")

    # 1. Find candidates matching the topic name
    candidates = []
    for s in all_sims:
        s_topic = s.get("topic_name", "").lower().replace(" ", "").replace("_", "").replace("-", "")
        s_id = s["sim_id"].lower().replace("_", "").replace("-", "")
        if topic_clean in s_topic or topic_clean in s_id:
            if subject and s.get("subject", "") != subject:
                continue
            candidates.append(s)

    if not candidates:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No simulation found for topic '{topic}'.",
        )

    # 2. Find the one matching the student's class level
    exact_match = [s for s in candidates if str(s["class_level"]) == str(class_level)]
    if exact_match:
        sim = exact_match[0]
    else:
        # 3. Closest class level fallback
        def class_distance(s):
            cl = s.get("class_level", "general")
            try:
                return abs(int(str(cl).split("-")[0]) - int(str(class_level).split("-")[0]))
            except (ValueError, TypeError):
                return 999
        candidates.sort(key=class_distance)
        sim = candidates[0]

    return SimulationDetail(
        sim_id=sim["sim_id"],
        title=sim["title"],
        description=sim.get("description", ""),
        instructions=None,
        learning_objectives=[],
        subject=sim["subject"],
        class_level=sim["class_level"],
        topic_id=sim.get("topic_id"),
        topic_name=sim.get("topic_name"),
        is_verified=sim.get("is_verified", True),
        component_path=sim.get("component_path", ""),
        component_type="web",
        parameters_schema=None,
        tags=[],
        prerequisites=[],
        estimated_duration_min=sim.get("estimated_duration_min"),
        launch_count=sim.get("launch_count", 0),
        avg_completion_rate=None,
        created_at=sim.get("created_at"),
        updated_at=None,
    )


@router.get(
    "/{sim_id}",
    response_model=SimulationDetail,
    summary="Get simulation metadata",
    description=(
        "Returns full metadata for a single simulation including its "
        "component path, parameters schema, and learning objectives."
    ),
)
async def get_simulation(
    sim_id: str,
    db: AsyncSession = Depends(get_db),
) -> SimulationDetail:
    """Get full metadata and component path for a specific simulation."""
    try:
        from models import Simulation  # type: ignore

        stmt = select(Simulation).where(Simulation.sim_id == sim_id)
        result = await db.execute(stmt)
        row = result.scalar_one_or_none()

        if row is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Simulation '{sim_id}' not found.",
            )

        return SimulationDetail(
            sim_id=row.sim_id,
            title=row.title,
            description=row.description,
            instructions=row.instructions,
            learning_objectives=row.learning_objectives or [],
            subject=row.subject,
            class_level=row.class_level,
            topic_id=row.topic_id,
            topic_name=row.topic_name,
            is_verified=row.is_verified,
            component_path=row.component_path,
            component_type=row.component_type or "web",
            parameters_schema=row.parameters_schema,
            tags=row.tags or [],
            prerequisites=row.prerequisites or [],
            estimated_duration_min=row.estimated_duration_min,
            launch_count=row.launch_count or 0,
            avg_completion_rate=row.avg_completion_rate,
            created_at=row.created_at,
            updated_at=row.updated_at,
        )
    except ImportError:
        # Fallback: use filesystem discovery
        from services.simulation_discovery import SimulationDiscovery
        discovery = SimulationDiscovery()
        sim = discovery.get_by_id(sim_id)
        if sim is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Simulation '{sim_id}' not found.",
            )
        return SimulationDetail(
            sim_id=sim["sim_id"],
            title=sim["title"],
            description=sim.get("description", ""),
            instructions=None,
            learning_objectives=[],
            subject=sim["subject"],
            class_level=sim["class_level"],
            topic_id=sim.get("topic_id"),
            topic_name=sim.get("topic_name"),
            is_verified=sim.get("is_verified", True),
            component_path=sim.get("component_path", ""),
            component_type="web",
            parameters_schema=None,
            tags=[],
            prerequisites=[],
            estimated_duration_min=sim.get("estimated_duration_min"),
            launch_count=sim.get("launch_count", 0),
            avg_completion_rate=None,
            created_at=sim.get("created_at"),
            updated_at=None,
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error fetching simulation %s: %s", sim_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve simulation metadata.",
        )


@router.get(
    "/topic/{node_id}",
    response_model=list[SimulationListItem],
    summary="Get simulations for a curriculum node",
    description=(
        "Returns all simulations mapped to the given curriculum topic node."
    ),
)
async def get_simulations_for_topic(
    node_id: str,
    class_level: Optional[str] = Query(
        None,
        description="Filter by student's class level (e.g. '2', '10', '6-8')",
    ),
    db: AsyncSession = Depends(get_db),
) -> list[SimulationListItem]:
    """Return all simulations linked to a specific curriculum topic node.

    When class_level is provided, only returns simulations matching that
    class level — so a Class 2 student gets 2_PlantsGame, not 1_PlantsGame.
    """
    try:
        from models import Simulation  # type: ignore

        stmt = (
            select(Simulation)
            .where(Simulation.topic_id == node_id)
            .order_by(Simulation.created_at.desc())
        )
        if class_level:
            stmt = stmt.where(Simulation.class_level == class_level)

        result = await db.execute(stmt)
        rows = result.scalars().all()

        return [
            SimulationListItem(
                sim_id=row.sim_id,
                title=row.title,
                description=row.description,
                subject=row.subject,
                class_level=row.class_level,
                topic_id=row.topic_id,
                topic_name=row.topic_name,
                is_verified=row.is_verified,
                thumbnail_url=row.thumbnail_url,
                estimated_duration_min=row.estimated_duration_min,
                launch_count=row.launch_count or 0,
                created_at=row.created_at,
            )
            for row in rows
        ]
    except ImportError:
        # Filesystem fallback — filter by topic name and class_level
        from services.simulation_discovery import SimulationDiscovery
        discovery = SimulationDiscovery()
        all_sims = discovery.discover()

        # Match by topic name (node_id could be a topic name or slug)
        node_lower = node_id.lower().replace("_", "").replace("-", "")
        matches = []
        for s in all_sims:
            topic_lower = s.get("topic_name", "").lower().replace(" ", "").replace("_", "").replace("-", "")
            sim_id_lower = s["sim_id"].lower().replace("_", "").replace("-", "")
            if node_lower in topic_lower or node_lower in sim_id_lower:
                matches.append(s)

        # Filter by class_level if provided
        if class_level:
            matches = [s for s in matches if str(s.get("class_level", "")) == str(class_level)]

        return [
            SimulationListItem(
                sim_id=s["sim_id"],
                title=s["title"],
                description=s.get("description"),
                subject=s["subject"],
                class_level=s["class_level"],
                topic_id=s.get("topic_id"),
                topic_name=s.get("topic_name"),
                is_verified=s.get("is_verified", True),
                thumbnail_url=s.get("thumbnail_url"),
                estimated_duration_min=s.get("estimated_duration_min"),
                launch_count=s.get("launch_count", 0),
                created_at=s.get("created_at"),
            )
            for s in matches
        ]
    except Exception as exc:
        logger.error(
            "Error fetching simulations for topic %s: %s", node_id, exc
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve simulations for topic.",
        )


@router.post(
    "/{sim_id}/launch",
    response_model=LaunchLogResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Log a simulation launch",
    description=(
        "Records that a student has launched a simulation. Used for "
        "analytics tracking and engagement metrics."
    ),
)
async def log_launch(
    sim_id: str,
    payload: LaunchRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> LaunchLogResponse:
    """Log that a student launched a specific simulation."""
    # Validate simulation exists
    try:
        from models import Simulation  # type: ignore

        stmt = select(Simulation).where(Simulation.sim_id == sim_id)
        result = await db.execute(stmt)
        sim = result.scalar_one_or_none()

        if sim is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Simulation '{sim_id}' not found.",
            )
    except ImportError:
        logger.warning(
            "Simulation model not available. Proceeding without validation."
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error validating simulation %s: %s", sim_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to validate simulation.",
        )

    now = datetime.now(timezone.utc)

    # Log analytics event via AnalyticsService if available
    analytics = _get_analytics_service(request)
    if analytics is not None:
        try:
            await analytics.track_event(
                event_type="sim_launch",
                student_id=payload.student_id,
                resource_id=sim_id,
                resource_type="simulation",
                metadata={
                    "session_id": payload.session_id,
                    "parameters": payload.parameters,
                },
                timestamp=now,
            )
        except Exception as exc:
            logger.warning(
                "Analytics tracking failed for sim_launch %s: %s",
                sim_id,
                exc,
            )

    logger.info(
        "Logged launch: sim_id=%s, student_id=%s", sim_id, payload.student_id
    )

    return LaunchLogResponse(
        sim_id=sim_id,
        student_id=payload.student_id,
        logged_at=now,
    )


@router.post(
    "/{sim_id}/complete",
    response_model=CompleteLogResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Log a simulation completion",
    description=(
        "Records that a student completed a simulation, with optional "
        "score, time spent, and feedback."
    ),
)
async def log_completion(
    sim_id: str,
    payload: CompleteRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> CompleteLogResponse:
    """Log that a student completed a specific simulation."""
    # Validate simulation exists
    try:
        from models import Simulation  # type: ignore

        stmt = select(Simulation).where(Simulation.sim_id == sim_id)
        result = await db.execute(stmt)
        sim = result.scalar_one_or_none()

        if sim is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Simulation '{sim_id}' not found.",
            )
    except ImportError:
        logger.warning(
            "Simulation model not available. Proceeding without validation."
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Error validating simulation %s: %s", sim_id, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to validate simulation.",
        )

    now = datetime.now(timezone.utc)

    # Log analytics event via AnalyticsService if available
    analytics = _get_analytics_service(request)
    if analytics is not None:
        try:
            await analytics.track_event(
                event_type="sim_complete",
                student_id=payload.student_id,
                resource_id=sim_id,
                resource_type="simulation",
                metadata={
                    "session_id": payload.session_id,
                    "score": payload.score,
                    "time_spent_sec": payload.time_spent_sec,
                    "feedback": payload.feedback,
                },
                timestamp=now,
            )
        except Exception as exc:
            logger.warning(
                "Analytics tracking failed for sim_complete %s: %s",
                sim_id,
                exc,
            )

    logger.info(
        "Logged completion: sim_id=%s, student_id=%s", sim_id, payload.student_id
    )

    return CompleteLogResponse(
        sim_id=sim_id,
        student_id=payload.student_id,
        logged_at=now,
    )


