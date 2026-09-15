"""
Sub-skills Diagnosis and Remediation API Router
================================================

Endpoints for diagnosing weak sub-skills, retrieving remediation paths,
and generating targeted practice for K-12 students on the CISCE platform.

Written for async FastAPI with Pydantic v2 schemas.
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/subskills", tags=["Sub-skills"])


# ---------------------------------------------------------------------------
# Optional service imports with graceful degradation
# ---------------------------------------------------------------------------
try:
    from services.diagnostic_service import DiagnosticService
    HAS_DIAGNOSTIC_SERVICE = True
except ImportError:
    HAS_DIAGNOSTIC_SERVICE = False
    logger.debug("diagnostic_service not available; diagnosis endpoints degraded")

try:
    from services.remediation_service import RemediationService
    HAS_REMEDIATION_SERVICE = True
except ImportError:
    HAS_REMEDIATION_SERVICE = False
    logger.debug("remediation_service not available; remediation endpoints degraded")

try:
    from services.diagnostic_engine import DiagnosticEngine
    HAS_DIAGNOSTIC_ENGINE = True
except ImportError:
    HAS_DIAGNOSTIC_ENGINE = False
    logger.debug("diagnostic_engine not available")

try:
    from sqlalchemy.ext.asyncio import AsyncSession
    from sqlalchemy import select, func
    from database import get_db
    HAS_DATABASE = True
except ImportError:
    HAS_DATABASE = False
    logger.debug("database not available")

try:
    from services.mastery_sync import MasterySyncService
    HAS_MASTERY_SYNC = True
except ImportError:
    HAS_MASTERY_SYNC = False
    logger.debug("mastery_sync not available")


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------


class SubSkillResponse(BaseModel):
    """A single sub-skill under a knowledge node."""

    sub_skill_id: str = Field(..., description="Unique sub-skill identifier")
    name: str = Field(..., description="Human-readable sub-skill name")
    description: str = Field(..., description="Detailed description of the sub-skill")
    difficulty: str = Field(..., description="Difficulty level: easy / medium / hard")
    prerequisites: list[str] = Field(
        default_factory=list, description="IDs of prerequisite sub-skills"
    )
    mastery_threshold: float = Field(
        ..., ge=0.0, le=1.0, description="Proportion correct required for mastery"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "sub_skill_id": "ss-001",
            "name": "Factorization",
            "description": "Factor quadratic expressions of the form ax^2 + bx + c",
            "difficulty": "medium",
            "prerequisites": ["ss-000"],
            "mastery_threshold": 0.8,
        }
    }}


class SubSkillListResponse(BaseModel):
    """Response for GET /subskills/{node_id}."""

    node_id: str = Field(..., description="Knowledge node identifier")
    sub_skills: list[SubSkillResponse] = Field(
        ..., description="Sub-skills belonging to this node"
    )
    total: int = Field(..., ge=0, description="Total number of sub-skills")

    model_config = {"json_schema_extra": {
        "example": {
            "node_id": "node-101",
            "sub_skills": [],
            "total": 0,
        }
    }}


class DiagnoseRequest(BaseModel):
    """Request body for POST /subskills/diagnose."""

    student_id: str = Field(..., min_length=1, description="Student unique identifier")
    node_id: str = Field(..., min_length=1, description="Target knowledge node")
    attempt_ids: list[str] | None = Field(
        default=None,
        description="Specific attempt IDs to use for diagnosis (defaults to all recent attempts)",
    )
    lookback_days: int = Field(
        default=30, ge=1, le=365, description="How many days of history to consider"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-001",
            "node_id": "node-101",
            "attempt_ids": ["att-001", "att-002"],
            "lookback_days": 30,
        }
    }}


class WeakSubSkill(BaseModel):
    """A single sub-skill flagged as weak for the student."""

    sub_skill_id: str = Field(..., description="Sub-skill identifier")
    name: str = Field(..., description="Sub-skill name")
    mastery_score: float = Field(
        ..., ge=0.0, le=1.0, description="Current mastery score (0.0 to 1.0)"
    )
    mastery_threshold: float = Field(
        ..., ge=0.0, le=1.0, description="Score required for mastery"
    )
    gap: float = Field(..., description="Gap between current score and threshold")
    num_attempts: int = Field(..., ge=0, description="Number of attempts recorded")
    last_attempted_at: datetime | None = Field(
        None, description="Timestamp of the most recent attempt"
    )
    severity: str = Field(
        ...,
        description="Severity label: critical / moderate / mild",
        pattern="^(critical|moderate|mild)$",
    )

    model_config = {"json_schema_extra": {
        "example": {
            "sub_skill_id": "ss-001",
            "name": "Factorization",
            "mastery_score": 0.35,
            "mastery_threshold": 0.8,
            "gap": 0.45,
            "num_attempts": 12,
            "last_attempted_at": "2025-01-15T10:30:00Z",
            "severity": "critical",
        }
    }}


class DiagnoseResponse(BaseModel):
    """Response for POST /subskills/diagnose."""

    student_id: str = Field(..., description="Student identifier")
    node_id: str = Field(..., description="Knowledge node identifier")
    diagnosed_at: datetime = Field(..., description="Timestamp of diagnosis")
    weak_sub_skills: list[WeakSubSkill] = Field(
        ..., description="Sub-skills below mastery threshold"
    )
    total_sub_skills: int = Field(..., ge=0, description="Total sub-skills in the node")
    num_weak: int = Field(..., ge=0, description="Number of weak sub-skills identified")
    overall_mastery: float = Field(
        ..., ge=0.0, le=1.0, description="Overall mastery across all sub-skills"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-001",
            "node_id": "node-101",
            "diagnosed_at": "2025-01-15T10:00:00Z",
            "weak_sub_skills": [],
            "total_sub_skills": 5,
            "num_weak": 0,
            "overall_mastery": 0.85,
        }
    }}


class RemediationStep(BaseModel):
    """A single step in a remediation path."""

    step_number: int = Field(..., ge=1, description="1-indexed step position")
    sub_skill_id: str = Field(..., description="Sub-skill to practice")
    sub_skill_name: str = Field(..., description="Sub-skill display name")
    action: str = Field(
        ...,
        description="Action to take: review / practice / reassess",
        pattern="^(review|practice|reassess)$",
    )
    estimated_time_minutes: int = Field(
        ..., ge=1, description="Estimated time for this step"
    )
    description: str = Field(..., description="Detailed instruction for this step")
    resource_url: str | None = Field(
        None, description="Optional link to learning material"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "step_number": 1,
            "sub_skill_id": "ss-001",
            "sub_skill_name": "Factorization",
            "action": "review",
            "estimated_time_minutes": 15,
            "description": "Review the factorization method for quadratic trinomials.",
            "resource_url": "https://example.com/resources/factorization",
        }
    }}


class RemediationPathResponse(BaseModel):
    """Response for GET /subskills/{node_id}/remediation."""

    student_id: str = Field(..., description="Student identifier")
    node_id: str = Field(..., description="Knowledge node identifier")
    generated_at: datetime = Field(..., description="When the path was generated")
    steps: list[RemediationStep] = Field(
        ..., description="Ordered remediation steps"
    )
    total_estimated_minutes: int = Field(
        ..., ge=0, description="Total estimated time in minutes"
    )
    weak_sub_skills_addressed: list[str] = Field(
        ..., description="Sub-skill IDs that this path targets"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-001",
            "node_id": "node-101",
            "generated_at": "2025-01-15T10:00:00Z",
            "steps": [],
            "total_estimated_minutes": 0,
            "weak_sub_skills_addressed": [],
        }
    }}


class PracticeItem(BaseModel):
    """A single targeted practice item."""

    item_id: str = Field(..., description="Unique practice item identifier")
    sub_skill_id: str = Field(..., description="Target sub-skill")
    sub_skill_name: str = Field(..., description="Sub-skill display name")
    question: str = Field(..., description="Practice question text")
    question_type: str = Field(
        ...,
        description="Question type: mcq / short_answer / long_answer / numerical",
    )
    options: list[str] | None = Field(
        default=None, description="Options for MCQ questions"
    )
    correct_answer: str | None = Field(
        default=None, description="Correct answer (hidden from student)"
    )
    explanation: str = Field(..., description="Explanation of the correct answer")
    difficulty: str = Field(..., description="Difficulty level")
    estimated_time_seconds: int = Field(..., ge=1, description="Time estimate")

    model_config = {"json_schema_extra": {
        "example": {
            "item_id": "pi-001",
            "sub_skill_id": "ss-001",
            "sub_skill_name": "Factorization",
            "question": "Factorize x^2 + 5x + 6.",
            "question_type": "short_answer",
            "options": None,
            "correct_answer": "(x+2)(x+3)",
            "explanation": "Find two numbers that multiply to 6 and add to 5.",
            "difficulty": "easy",
            "estimated_time_seconds": 120,
        }
    }}


class PracticeGenerateResponse(BaseModel):
    """Response for POST /subskills/{node_id}/practice."""

    student_id: str = Field(..., description="Student identifier")
    node_id: str = Field(..., description="Knowledge node identifier")
    generated_at: datetime = Field(..., description="Generation timestamp")
    items: list[PracticeItem] = Field(
        ..., description="Targeted practice items for weak sub-skills"
    )
    total_items: int = Field(..., ge=0, description="Total number of items")
    estimated_total_seconds: int = Field(
        ..., ge=0, description="Total estimated time in seconds"
    )
    targeted_sub_skills: list[str] = Field(
        ..., description="Sub-skill IDs targeted by these items"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "student_id": "stu-001",
            "node_id": "node-101",
            "generated_at": "2025-01-15T10:00:00Z",
            "items": [],
            "total_items": 0,
            "estimated_total_seconds": 0,
            "targeted_sub_skills": [],
        }
    }}


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Overall health status")
    services: dict[str, str] = Field(
        ..., description="Status of each integrated service"
    )
    timestamp: datetime = Field(..., description="Check timestamp")


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------


def _severity_label(score: float, threshold: float) -> str:
    """Return a severity label given a mastery score and threshold."""
    gap = threshold - score
    if gap >= 0.4:
        return "critical"
    if gap >= 0.2:
        return "moderate"
    return "mild"


def _service_health() -> dict[str, str]:
    """Return the health status of each optional service."""
    services: dict[str, str] = {}
    services["diagnostic_service"] = (
        "available" if HAS_DIAGNOSTIC_SERVICE else "unavailable"
    )
    services["remediation_service"] = (
        "available" if HAS_REMEDIATION_SERVICE else "unavailable"
    )
    services["diagnostic_engine"] = (
        "available" if HAS_DIAGNOSTIC_ENGINE else "unavailable"
    )
    services["database"] = "available" if HAS_DATABASE else "unavailable"
    services["mastery_sync"] = (
        "available" if HAS_MASTERY_SYNC else "unavailable"
    )
    return services


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "/subskills/{node_id}",
    response_model=SubSkillListResponse,
    summary="List sub-skills for a knowledge node",
    description="Retrieve all sub-skills associated with a given knowledge node, "
                "including difficulty, prerequisites, and mastery threshold.",
)
async def get_sub_skills(
    node_id: str,
    subject: str | None = Query(
        default=None,
        description="Optional subject filter (e.g. 'mathematics')",
    ),
    grade: int | None = Query(
        default=None,
        ge=1,
        le=12,
        description="Optional grade level filter (1-12)",
    ),
) -> SubSkillListResponse:
    """Return sub-skills for the given knowledge node.

    Args:
        node_id: The knowledge node identifier.
        subject: Optional subject filter.
        grade: Optional grade level filter.

    Returns:
        SubSkillListResponse with the list of sub-skills.
    """
    if not node_id or not node_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="node_id must be a non-empty string.",
        )

    logger.info(
        "Fetching sub-skills for node_id=%s, subject=%s, grade=%s",
        node_id,
        subject,
        grade,
    )

    sub_skills: list[SubSkillResponse] = []

    # Attempt to load from the diagnostic service when available
    if HAS_DIAGNOSTIC_SERVICE and HAS_DATABASE:
        try:
            diag_service = DiagnosticService()
            raw_skills = await diag_service.get_sub_skills(
                node_id=node_id,
                subject=subject,
                grade=grade,
            )
            for raw in raw_skills:
                sub_skills.append(
                    SubSkillResponse(
                        sub_skill_id=raw.get("sub_skill_id", ""),
                        name=raw.get("name", ""),
                        description=raw.get("description", ""),
                        difficulty=raw.get("difficulty", "medium"),
                        prerequisites=raw.get("prerequisites", []),
                        mastery_threshold=float(
                            raw.get("mastery_threshold", 0.8)
                        ),
                    )
                )
        except Exception as exc:
            logger.error(
                "Failed to load sub-skills from DiagnosticService: %s",
                exc,
                exc_info=True,
            )

    if not sub_skills:
        # Fallback: return an empty but valid response so clients are not blocked
        logger.debug(
            "No sub-skills found for node_id=%s; returning empty list.", node_id
        )

    return SubSkillListResponse(
        node_id=node_id,
        sub_skills=sub_skills,
        total=len(sub_skills),
    )


@router.post(
    "/subskills/diagnose",
    response_model=DiagnoseResponse,
    summary="Diagnose weak sub-skills for a student",
    description="Analyse a student's past attempts and identify which sub-skills "
                "within a node are below mastery, including severity ratings.",
)
async def diagnose_sub_skills(
    payload: DiagnoseRequest,
    db = Depends(get_db) if HAS_DATABASE else None,
) -> DiagnoseResponse:
    """Diagnose weak sub-skills for a student in a given knowledge node.

    Args:
        payload: Diagnosis request with student_id, node_id, and optional filters.

    Returns:
        DiagnoseResponse listing weak sub-skills and overall mastery.
    """
    student_id = payload.student_id.strip()
    node_id = payload.node_id.strip()

    if not student_id or not node_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="student_id and node_id must be non-empty strings.",
        )

    logger.info(
        "Diagnosing sub-skills for student_id=%s, node_id=%s",
        student_id,
        node_id,
    )

    weak_sub_skills: list[WeakSubSkill] = []
    total_sub_skills = 0
    overall_mastery = 0.0

    # Preferred path: use DiagnosticEngine when available
    if HAS_DIAGNOSTIC_ENGINE:
        try:
            engine = DiagnosticEngine()
            result = await engine.diagnose(
                student_id=student_id,
                node_id=node_id,
                attempt_ids=payload.attempt_ids,
                lookback_days=payload.lookback_days,
            )
            total_sub_skills = result.get("total_sub_skills", 0)
            overall_mastery = float(result.get("overall_mastery", 0.0))
            for raw in result.get("weak_sub_skills", []):
                score = float(raw.get("mastery_score", 0.0))
                threshold = float(raw.get("mastery_threshold", 0.8))
                weak_sub_skills.append(
                    WeakSubSkill(
                        sub_skill_id=raw.get("sub_skill_id", ""),
                        name=raw.get("name", ""),
                        mastery_score=score,
                        mastery_threshold=threshold,
                        gap=round(threshold - score, 4),
                        num_attempts=int(raw.get("num_attempts", 0)),
                        last_attempted_at=raw.get("last_attempted_at"),
                        severity=_severity_label(score, threshold),
                    )
                )
        except Exception as exc:
            logger.error(
                "DiagnosticEngine.diagnose failed: %s",
                exc,
                exc_info=True,
            )

    # Fallback: use DiagnosticService
    elif HAS_DIAGNOSTIC_SERVICE:
        try:
            diag_service = DiagnosticService()
            result = await diag_service.diagnose(
                student_id=student_id,
                node_id=node_id,
                lookback_days=payload.lookback_days,
            )
            total_sub_skills = result.get("total_sub_skills", 0)
            overall_mastery = float(result.get("overall_mastery", 0.0))
            for raw in result.get("weak_sub_skills", []):
                score = float(raw.get("mastery_score", 0.0))
                threshold = float(raw.get("mastery_threshold", 0.8))
                weak_sub_skills.append(
                    WeakSubSkill(
                        sub_skill_id=raw.get("sub_skill_id", ""),
                        name=raw.get("name", ""),
                        mastery_score=score,
                        mastery_threshold=threshold,
                        gap=round(threshold - score, 4),
                        num_attempts=int(raw.get("num_attempts", 0)),
                        last_attempted_at=raw.get("last_attempted_at"),
                        severity=_severity_label(score, threshold),
                    )
                )
        except Exception as exc:
            logger.error(
                "DiagnosticService.diagnose failed: %s",
                exc,
                exc_info=True,
            )

    # Final fallback: return empty but structurally correct response
    if not total_sub_skills and not weak_sub_skills:
        logger.debug(
            "No diagnostic results available for student_id=%s node_id=%s; "
            "returning empty diagnosis.",
            student_id,
            node_id,
        )

    return DiagnoseResponse(
        student_id=student_id,
        node_id=node_id,
        diagnosed_at=datetime.now(timezone.utc),
        weak_sub_skills=weak_sub_skills,
        total_sub_skills=total_sub_skills,
        num_weak=len(weak_sub_skills),
        overall_mastery=overall_mastery,
    )


@router.get(
    "/subskills/{node_id}/remediation",
    response_model=RemediationPathResponse,
    summary="Get remediation path for weak sub-skills",
    description="Given a knowledge node, build an ordered remediation path "
                "that targets the student's weak sub-skills.",
)
async def get_remediation_path(
    node_id: str,
    student_id: str = Query(
        ...,
        min_length=1,
        description="Student unique identifier",
    ),
    max_steps: int = Query(
        default=10,
        ge=1,
        le=50,
        description="Maximum number of remediation steps",
    ),
) -> RemediationPathResponse:
    """Return a remediation path for the student's weak sub-skills.

    Args:
        node_id: The knowledge node identifier.
        student_id: The student identifier.
        max_steps: Maximum number of steps in the remediation path.

    Returns:
        RemediationPathResponse with ordered remediation steps.
    """
    if not node_id or not node_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="node_id must be a non-empty string.",
        )
    if not student_id or not student_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="student_id must be a non-empty string.",
        )

    logger.info(
        "Generating remediation path for student_id=%s, node_id=%s, max_steps=%s",
        student_id,
        node_id,
        max_steps,
    )

    steps: list[RemediationStep] = []
    weak_ids: list[str] = []

    if HAS_REMEDIATION_SERVICE:
        try:
            rem_service = RemediationService()
            path_data = await rem_service.build_path(
                student_id=student_id,
                node_id=node_id,
                max_steps=max_steps,
            )
            weak_ids = path_data.get("weak_sub_skill_ids", [])
            for idx, step_data in enumerate(path_data.get("steps", []), start=1):
                steps.append(
                    RemediationStep(
                        step_number=idx,
                        sub_skill_id=step_data.get("sub_skill_id", ""),
                        sub_skill_name=step_data.get("sub_skill_name", ""),
                        action=step_data.get("action", "practice"),
                        estimated_time_minutes=int(
                            step_data.get("estimated_time_minutes", 10)
                        ),
                        description=step_data.get("description", ""),
                        resource_url=step_data.get("resource_url"),
                    )
                )
        except Exception as exc:
            logger.error(
                "RemediationService.build_path failed: %s",
                exc,
                exc_info=True,
            )

    total_minutes = sum(s.estimated_time_minutes for s in steps)

    return RemediationPathResponse(
        student_id=student_id,
        node_id=node_id,
        generated_at=datetime.now(timezone.utc),
        steps=steps,
        total_estimated_minutes=total_minutes,
        weak_sub_skills_addressed=weak_ids,
    )


@router.post(
    "/subskills/{node_id}/practice",
    response_model=PracticeGenerateResponse,
    summary="Generate targeted practice for weak sub-skills",
    description="Given a knowledge node and a student, generate practice items "
                "that specifically target the student's weak sub-skills.",
)
async def generate_practice(
    node_id: str,
    student_id: str = Query(
        ...,
        min_length=1,
        description="Student unique identifier",
    ),
    num_items: int = Query(
        default=5,
        ge=1,
        le=50,
        description="Number of practice items to generate",
    ),
    difficulty: str | None = Query(
        default=None,
        description="Override difficulty: easy / medium / hard",
    ),
) -> PracticeGenerateResponse:
    """Generate targeted practice items for a student's weak sub-skills.

    Args:
        node_id: The knowledge node identifier.
        student_id: The student identifier.
        num_items: Number of practice items to generate.
        difficulty: Optional difficulty override.

    Returns:
        PracticeGenerateResponse with targeted practice items.
    """
    if not node_id or not node_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="node_id must be a non-empty string.",
        )
    if not student_id or not student_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="student_id must be a non-empty string.",
        )

    if difficulty and difficulty not in ("easy", "medium", "hard"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="difficulty must be one of: easy, medium, hard.",
        )

    logger.info(
        "Generating %d practice items for student_id=%s, node_id=%s",
        num_items,
        student_id,
        node_id,
    )

    items: list[PracticeItem] = []
    targeted_ids: list[str] = []

    # Try to build a diagnosis first so we know which sub-skills are weak
    weak_sub_skill_ids: list[str] = []
    if HAS_DIAGNOSTIC_ENGINE:
        try:
            engine = DiagnosticEngine()
            diag_result = await engine.diagnose(
                student_id=student_id,
                node_id=node_id,
                lookback_days=30,
            )
            weak_sub_skill_ids = [
                w["sub_skill_id"] for w in diag_result.get("weak_sub_skills", [])
            ]
        except Exception as exc:
            logger.warning(
                "Could not run diagnosis for practice targeting: %s",
                exc,
            )
    elif HAS_DIAGNOSTIC_SERVICE:
        try:
            diag_service = DiagnosticService()
            diag_result = await diag_service.diagnose(
                student_id=student_id,
                node_id=node_id,
                lookback_days=30,
            )
            weak_sub_skill_ids = [
                w["sub_skill_id"] for w in diag_result.get("weak_sub_skills", [])
            ]
        except Exception as exc:
            logger.warning(
                "Could not run diagnosis for practice targeting: %s",
                exc,
            )

    # Generate items from remediation service if available
    if HAS_REMEDIATION_SERVICE:
        try:
            rem_service = RemediationService()
            practice_data = await rem_service.generate_practice(
                student_id=student_id,
                node_id=node_id,
                weak_sub_skill_ids=weak_sub_skill_ids,
                num_items=num_items,
                difficulty=difficulty,
            )
            targeted_ids = practice_data.get("targeted_sub_skill_ids", [])
            for raw_item in practice_data.get("items", []):
                q_type = raw_item.get("question_type", "short_answer")
                opts = raw_item.get("options")
                if opts is not None and not isinstance(opts, list):
                    opts = None
                items.append(
                    PracticeItem(
                        item_id=raw_item.get("item_id", ""),
                        sub_skill_id=raw_item.get("sub_skill_id", ""),
                        sub_skill_name=raw_item.get("sub_skill_name", ""),
                        question=raw_item.get("question", ""),
                        question_type=q_type,
                        options=opts,
                        correct_answer=raw_item.get("correct_answer"),
                        explanation=raw_item.get("explanation", ""),
                        difficulty=raw_item.get("difficulty", "medium"),
                        estimated_time_seconds=int(
                            raw_item.get("estimated_time_seconds", 120)
                        ),
                    )
                )
        except Exception as exc:
            logger.error(
                "RemediationService.generate_practice failed: %s",
                exc,
                exc_info=True,
            )

    total_seconds = sum(i.estimated_time_seconds for i in items)

    return PracticeGenerateResponse(
        student_id=student_id,
        node_id=node_id,
        generated_at=datetime.now(timezone.utc),
        items=items,
        total_items=len(items),
        estimated_total_seconds=total_seconds,
        targeted_sub_skills=targeted_ids,
    )


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check for the sub-skills API",
    description="Returns the operational status of the sub-skills API and all "
                "integrated downstream services.",
)
async def health_check() -> HealthResponse:
    """Return health status for the sub-skills API and its dependencies.

    Returns:
        HealthResponse with overall status and per-service health.
    """
    services = _service_health()
    all_ok = all(status == "available" for status in services.values())
    overall = "healthy" if all_ok else "degraded"

    return HealthResponse(
        status=overall,
        services=services,
        timestamp=datetime.now(timezone.utc),
    )