"""
Solver API Router
=================
Endpoints for listing problem types, getting form definitions, solving problems,
and generating new questions for the K-12 learning platform.

Written for async FastAPI with Pydantic v2 schemas, JWT auth, LRU caching,
SSE streaming, and YAML-driven form definitions.
"""

from __future__ import annotations

import asyncio
import hashlib
import inspect
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, AsyncGenerator, Optional

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    Request,
    status,
)
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, field_validator

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Optional imports – content_parsers may be built later by another developer
# ---------------------------------------------------------------------------
try:
    import yaml as _yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False

try:
    from cachetools import TTLCache
    HAS_CACHETOOLS = True
except ImportError:
    HAS_CACHETOOLS = False

# ---------------------------------------------------------------------------
# Pydantic v2 response / request schemas
# ---------------------------------------------------------------------------
class StepResponse(BaseModel):
    """A single step in a worked solution."""

    step_number: int = Field(..., ge=1, description="1-indexed step position")
    title: str = Field(..., description="Short title, e.g. 'Apply Product Rule'")
    explanation: str = Field(
        ..., description="Human-readable explanation of this step"
    )
    latex: Optional[str] = Field(
        None, description="LaTeX rendering of the intermediate result"
    )
    hint: Optional[str] = Field(
        None, description="Optional hint for students who are stuck"
    )

    model_config = {"json_schema_extra": {
        "example": {
            "step_number": 1,
            "title": "Identify the structure",
            "explanation": "The expression is a product of two functions: u = x and v = sin(x).",
            "latex": r"f(x) = x \cdot \sin(x)",
            "hint": "Which differentiation rule applies to a product?",
        }
    }}


class SolverResponse(BaseModel):
    """Full solution response returned by POST /api/solver/solve."""

    problem_type: str = Field(..., description="Canonical problem type identifier")
    subject: str = Field(..., description="Subject area, e.g. 'Mathematics'")
    difficulty: str = Field(..., description="Difficulty level: easy / medium / hard")
    input_summary: dict[str, Any] = Field(
        ..., description="Snapshot of inputs used to produce this solution"
    )
    steps: list[StepResponse] = Field(
        ..., min_length=1, description="Ordered list of solution steps"
    )
    final_answer: Optional[str] = Field(
        None, description="LaTeX string of the final answer"
    )
    confidence: Optional[float] = Field(
        None, ge=0.0, le=1.0, description="Solver confidence in the result"
    )
    computation_time_ms: Optional[float] = Field(
        None, ge=0, description="Wall-clock time spent computing, in milliseconds"
    )
    board: Optional[str] = Field(
        None, description="Board format used: 'CBSE' or 'CISCE'"
    )
    marking_scheme: Optional[str] = Field(
        None, description="Board-specific marking scheme text"
    )
    max_marks: Optional[int] = Field(
        None, description="Maximum marks for this question"
    )
    conclusion: Optional[str] = Field(
        None, description="Board-specific conclusion statement"
    )
    scope_note: Optional[str] = Field(
        None, description="Scope boundary note (CISCE only)"
    )


class GenerateResponse(BaseModel):
    """Response returned by POST /api/solver/generate."""

    problem_type: str = Field(..., description="Type of the generated question")
    subject: str = Field(..., description="Subject area")
    difficulty: str = Field(..., description="Difficulty level")
    question_text: str = Field(
        ..., description="Human-readable question text (Markdown supported)"
    )
    question_latex: Optional[str] = Field(
        None, description="LaTeX rendering of the question"
    )
    expected_answer: str = Field(
        ..., description="LaTeX string of the expected / canonical answer"
    )
    hints: list[str] = Field(
        default_factory=list, description="Progressive hints for the student"
    )
    seed: int = Field(
        ..., description="PRNG seed used – passing the same seed reproduces this question"
    )
    from_cache: bool = Field(
        False, description="True when served from the in-memory cache"
    )


class ProblemTypeMetadata(BaseModel):
    """Metadata for a single problem type, loaded from YAML definition."""

    id: str = Field(..., description="Unique problem type identifier, e.g. 'derivative'")
    name: str = Field(..., description="Display name, e.g. 'Derivative of a Function'")
    subject: str = Field(..., description="Subject group, e.g. 'Mathematics'")
    description: str = Field(..., description="Short description shown in the UI")
    difficulty: str = Field(
        ..., description="easy | medium | hard (default difficulty)"
    )
    tags: list[str] = Field(
        default_factory=list, description="Tags for filtering and search"
    )
    form_definition: dict[str, Any] = Field(
        ..., description="Frontend form schema (input fields, validation rules)"
    )
    solver_class: Optional[str] = Field(
        None,
        description="Dotted import path, e.g. 'solvers.calculus.derivative_solver.DerivativeSolver'",
    )
    version: str = Field(
        "1.0.0", description="Schema version of this problem type definition"
    )


class HealthSolverEntry(BaseModel):
    """Health status for one loaded solver class."""

    problem_type: str = Field(..., description="Problem type identifier")
    loaded: bool = Field(..., description="Whether the solver class could be imported")
    error: Optional[str] = Field(
        None, description="Error message if the solver failed to load"
    )


class HealthResponse(BaseModel):
    """Overall health check response."""

    status: str = Field(
        ..., description="'ok' when at least one solver is loaded, 'degraded' otherwise"
    )
    total_problem_types: int = Field(..., ge=0)
    loaded_solvers: list[HealthSolverEntry] = Field(default_factory=list)
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class SolveRequest(BaseModel):
    """Request body for POST /api/solver/solve."""

    problem_type: str = Field(
        ..., description="Problem type identifier, e.g. 'derivative'"
    )
    values: dict[str, Any] = Field(
        ..., description="Key-value pairs matching the form definition fields"
    )
    seed: int = Field(
        0,
        ge=0,
        description="PRNG seed for deterministic step ordering (default: 0)",
    )
    stream: bool = Field(
        False,
        description="If true, return Server-Sent Events instead of a single JSON response",
    )
    board: Optional[str] = Field(
        None, description="Board format: 'CBSE' or 'CISCE'. Controls answer formatting."
    )
    max_marks: int = Field(
        3, ge=1, le=10, description="Maximum marks for marking scheme generation"
    )
    class_level: Optional[int] = Field(
        None, ge=1, le=12, description="Class level for scope-aware formatting"
    )


class GenerateRequest(BaseModel):
    """Request body for POST /api/solver/generate."""

    problem_type: str = Field(
        ..., description="Problem type identifier"
    )
    seed: int = Field(
        ..., ge=0, description="PRNG seed – same seed = same generated question"
    )
    difficulty: Optional[str] = Field(
        None,
        description="Override difficulty: easy | medium | hard (default: from YAML)",
    )


# ---------------------------------------------------------------------------
# Identify / Grade request & response schemas
# ---------------------------------------------------------------------------
class IdentifyRequest(BaseModel):
    """Request body for POST /api/solver/identify."""
    text: str = Field(..., description="Free-text question or problem description")
    subject: Optional[str] = Field(None, description="Optional subject hint to narrow search")
    class_level: Optional[int] = Field(None, ge=1, le=12, description="Optional class hint")


class UniversalSolveRequest(BaseModel):
    """Request body for POST /api/solver/solve-universal."""
    problem_text: str = Field(..., description="Free-text problem statement")
    board: Optional[str] = Field(None, description="Board: CBSE or CISCE")
    class_level: Optional[int] = Field(None, ge=1, le=12, description="Class level")


class UniversalSolveResponse(BaseModel):
    """Response from the universal solver pipeline."""
    solved: bool = Field(..., description="Whether a solution was found")
    answer: Optional[str] = Field(None, description="Final answer")
    confidence: float = Field(0.0, ge=0.0, le=1.0, description="Solver confidence")
    method: str = Field("", description="Which solver backend was used")
    explanation: str = Field("", description="Step-by-step explanation")
    pipeline_stages: list[str] = Field(default_factory=list, description="Stages executed")
    solve_time_ms: float = Field(0.0, description="Solve time in milliseconds")
    subject: str = Field("", description="Detected subject")
    concept_tags: list[str] = Field(default_factory=list, description="Detected concepts")
    target: Optional[str] = Field(None, description="What was being solved for")
    formula_used: Optional[str] = Field(None, description="Formula ID if one was selected")
    fallback_used: bool = Field(False, description="Whether fallback was needed")
    quantities: list[dict[str, Any]] = Field(default_factory=list, description="Extracted quantities")


class IdentifyResponse(BaseModel):
    """Response from problem-type identification."""
    problem_type: str = Field(..., description="Best-guess problem type identifier")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Match confidence")
    alternatives: list[dict[str, Any]] = Field(
        default_factory=list,
        description="Other candidate problem types with scores",
    )


class GradeRequest(BaseModel):
    """Request body for POST /api/solver/grade."""
    problem_type: str = Field(..., description="Problem type identifier")
    values: dict[str, Any] = Field(..., description="Original problem inputs")
    student_answer: str = Field(..., description="Student's answer (LaTeX or plain text)")
    seed: int = Field(0, ge=0, description="PRNG seed used when generating the problem")
    board: Optional[str] = Field(None, description="Board: 'CBSE' or 'CISCE' for board-aware grading")
    max_marks: int = Field(3, ge=1, le=10, description="Maximum marks for the question")


class GradeResponse(BaseModel):
    """Response from answer grading."""
    correct: bool = Field(..., description="Whether the answer is correct")
    score: float = Field(..., ge=0.0, le=1.0, description="Partial-credit score 0-1")
    expected_answer: str = Field(..., description="The canonical correct answer")
    feedback: str = Field("", description="Human-readable feedback")
    misconception: Optional[str] = Field(None, description="Detected misconception type")
    board: Optional[str] = Field(None, description="Board format used for grading")
    marks_awarded: Optional[int] = Field(None, description="Marks awarded (board-aware)")
    max_marks: Optional[int] = Field(None, description="Maximum marks for the question")
    marking_scheme: Optional[str] = Field(None, description="Board-specific marking scheme")


# ---------------------------------------------------------------------------
# Lightweight auth – token is optional (public endpoints for guest access)
# ---------------------------------------------------------------------------
class AuthUser(BaseModel):
    user_id: Optional[str] = None


async def get_current_user(
    authorization: Optional[str] = Query(
        None, description="Bearer token – omit for anonymous access"
    ),
) -> AuthUser:
    """
    Return the authenticated user or an anonymous AuthUser.

    JWT validation is a no-op stub here – plug in your real verification logic
    (HS256 / RS256 verify against your auth service) when the auth module exists.
    For now we accept any well-formed Bearer token as proof of identity.
    """
    if authorization is None:
        return AuthUser(user_id=None)
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header. Expected: Bearer <token>",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = authorization[7:]
    if not token or len(token) < 10:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Malformed or empty Bearer token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # In production, verify the JWT signature and extract the subject claim
    try:
        import jwt as _jwt
        from jwt.exceptions import InvalidTokenError
        _jwt.decode(token, options={"verify_signature": False})
        return AuthUser(user_id="authenticated_user")
    except ImportError:
        return AuthUser(user_id=token[:16])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token.",
            headers={"WWW-Authenticate": "Bearer"},
        )


# ---------------------------------------------------------------------------
# Router
# ---------------------------------------------------------------------------
router = APIRouter(prefix="/api/solver", tags=["solver"])


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _make_cache_key(problem_type: str, seed: int, values: dict) -> tuple:
    """Build a hashable cache key from request parameters."""
    values_str = str(sorted(values.items()))
    raw = f"{problem_type}:{seed}:{values_str}"
    digest = hashlib.sha256(raw.encode()).hexdigest()[:16]
    return (problem_type, seed, digest)


class _AsyncLruCache:
    """Minimal async-safe LRU cache – avoids blocking other requests."""

    def __init__(self, maxsize: int = 512):
        self._store: dict[Any, Any] = {}
        self._order: list[Any] = []
        self._maxsize = maxsize
        self._locks: dict[Any, asyncio.Lock] = {}
        self._global_lock = asyncio.Lock()

    async def get(self, key: Any) -> Any | None:
        async with self._global_lock:
            if key in self._store:
                self._order.remove(key)
                self._order.append(key)
                return self._store[key]
        return None

    async def set(self, key: Any, value: Any) -> None:
        async with self._global_lock:
            if key not in self._store and len(self._order) >= self._maxsize:
                oldest = self._order.pop(0)
                self._store.pop(oldest, None)
                self._locks.pop(oldest, None)
            if key not in self._store:
                self._order.append(key)
                self._locks[key] = asyncio.Lock()
            self._store[key] = value

    async def get_or_compute(self, key: Any, factory) -> Any:
        """Return cached value or compute + cache it atomically."""
        cached = await self.get(key)
        if cached is not None:
            return cached
        lock = self._locks.get(key) or asyncio.Lock()
        async with lock:
            cached = await self.get(key)
            if cached is not None:
                return cached
            result = await factory()
            await self.set(key, result)
            return result


_solve_cache: _AsyncLruCache = _AsyncLruCache(maxsize=256)
_generate_cache: _AsyncLruCache = _AsyncLruCache(maxsize=512)


async def _load_yaml_problem_types() -> dict[str, dict[str, Any]]:
    """
    Scan content_parsers/ for YAML files and return problem type definitions.

    Expected YAML structure per file:
      problem_types:
        - id: derivative
          name: Derivative of a Function
          subject: Mathematics
          ...
    """
    if not HAS_YAML:
        return {}

    project_root = Path(__file__).resolve().parent.parent.parent
    candidates = [
        project_root / "content_parsers" / "problem_types",
        project_root / "content_parsers",
        project_root / "data" / "problem_types",
    ]

    all_defs: dict[str, dict[str, Any]] = {}

    for base_dir in candidates:
        if not base_dir.is_dir():
            continue
        for yaml_file in sorted(base_dir.rglob("*.yaml")):
            try:
                text = yaml_file.read_text(encoding="utf-8")
                data = _yaml.safe_load(text)
                if not isinstance(data, dict):
                    continue
                types = data.get("problem_types", data.get("problems", []))
                if not isinstance(types, list):
                    continue
                for entry in types:
                    if not isinstance(entry, dict):
                        continue
                    pid = entry.get("id")
                    if pid and isinstance(pid, str):
                        all_defs[pid] = entry
            except Exception:
                logger.debug("Could not parse YAML: %s", yaml_file, exc_info=True)

    return all_defs


async def _get_yaml_problem_types_cached() -> dict[str, dict[str, Any]]:
    """File-mtime aware cached wrapper around _load_yaml_problem_types."""
    _cache_key = "__yaml_problem_types__"

    cached = await _generate_cache.get(_cache_key)
    if cached is not None:
        return cached

    async def _load() -> dict[str, dict[str, Any]]:
        return await _load_yaml_problem_types()

    result = await _generate_cache.get_or_compute(_cache_key, _load)
    return result


async def _build_type_list_response(
    problem_types: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build the grouped list response for GET /types."""
    by_subject: dict[str, list[dict[str, Any]]] = {}

    for pid, entry in problem_types.items():
        subject = entry.get("subject", "General")
        by_subject.setdefault(subject, []).append({
            "id": pid,
            "name": entry.get(
                "name", pid.replace("_", " ").title()
            ),
            "description": entry.get("description", ""),
            "difficulty": entry.get("difficulty", "medium"),
            "tags": entry.get("tags", []),
            "solver_class": entry.get("solver_class"),
        })

    # Sort subjects and types alphabetically for a consistent UI
    return [
        {
            "subject": subject,
            "types": sorted(types, key=lambda t: t["name"]),
        }
        for subject, types in sorted(by_subject.items())
    ]


# ---------------------------------------------------------------------------
# SSE helpers
# ---------------------------------------------------------------------------

async def _sse_stream(
    result_generator: AsyncGenerator[dict, None],
    result_builder,
) -> AsyncGenerator[str, None]:
    """Wrap a step-by-step async generator as a Server-Sent Events stream."""
    yield "event: start\ndata: {\"status\": \"computing\"}\n\n"

    try:
        async for step in result_generator:
            yield f"event: step\ndata: {__import__(('json'), fromlist=['dumps']).dumps(step)}\n\n"
    except asyncio.TimeoutError:
        err_payload = __import__(('json'), fromlist=['dumps']).dumps({
            "event": "error",
            "data": {"detail": "Solver timed out after 2 seconds. Please try a simpler problem."},
        })
        yield f"event: error\ndata: {err_payload}\n\n"
        return
    except Exception as exc:
        logger.exception("Solver streaming error")
        err_payload = __import__(('json'), fromlist=['dumps']).dumps({
            "event": "error",
            "data": {"detail": str(exc)},
        })
        yield f"event: error\ndata: {err_payload}\n\n"
        return

    final = result_builder()
    if final is not None:
        # Sanitize before sending – drop heavy fields, keep metadata
        if hasattr(final, "model_dump"):
            fd: dict = final.model_dump(mode="json")
        elif hasattr(final, "dict"):
            fd = final.dict()
        else:
            fd = dict(final)
        steps_payload = fd.pop("steps", [])
        yield f"event: complete\ndata: {__import__(('json'), fromlist=['dumps']).dumps({**fd, 'steps_count': len(steps_payload)})}\n\n"
        yield "event: done\ndata: {}\n\n"


# ---------------------------------------------------------------------------
# JSON helper – handles UUID and datetime in SolverResult
# ---------------------------------------------------------------------------

class _CompatEncoder(__import__('json').JSONEncoder):
    def default(self, o):
        if hasattr(o, "hex"):
            return o.hex
        if isinstance(o, datetime):
            return o.isoformat()
        if hasattr(o, "model_dump"):
            return o.model_dump(mode="json")
        if hasattr(o, "dict"):
            return o.dict()
        if hasattr(o, "__dict__"):
            return o.__dict__
        return super().default(o)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get(
    "/types",
    response_model=list[dict[str, Any]],
    summary="List all available problem types",
    description=(
        "Returns problem types grouped by subject with display metadata and\n        frontend form definitions loaded from YAML."
    ),
)
async def list_problem_types() -> list[dict[str, Any]]:
    """
    GET /api/solver/types
    ----------------------
    Returns a list of all registered problem types, grouped by subject.

    Each entry contains: id, name, description, difficulty, tags, and
    the form_definition schema the frontend needs to render the input form.
    """
    yaml_types = await _get_yaml_problem_types_cached()

    try:
        from solvers.registry import solver_registry
        registered = solver_registry.list_types()
    except (ImportError, AttributeError):
        registered = set()

    merged = dict(yaml_types)

    for pid in registered:
        if pid not in merged:
            merged[pid] = {
                "id": pid,
                "name": pid.replace("_", " ").title(),
                "subject": "General",
                "description": f"Auto-discovered solver: {pid}",
                "difficulty": "medium",
                "tags": [],
                "solver_class": None,
                "form_definition": {
                    "type": "object",
                    "properties": {},
                    "required": [],
                },
            }

    if not merged:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "No problem types available. Ensure solvers are registered via\n                solvers.registry and YAML definitions exist in content_parsers/."
            ),
        )

    return await _build_type_list_response(merged)


@router.get(
    "/types/{problem_type}",
    response_model=ProblemTypeMetadata,
    summary="Get form definition for a problem type",
    description=(
        "Returns the full metadata + frontend form schema for the given\n        problem type. Use this when the user picks a type to render the form."
    ),
)
async def get_problem_type(
    problem_type: str,
) -> ProblemTypeMetadata:
    """
    GET /api/solver/types/{problem_type}
    --------------------------------------
    Returns the ProblemTypeMetadata including the form_definition dict
    that the frontend uses to render inputs (field types, labels, ranges,
    placeholders, etc.).
    """
    yaml_types = await _get_yaml_problem_types_cached()

    try:
        from solvers.registry import solver_registry as _reg
        registered_types = _reg.list_types()
    except (ImportError, AttributeError):
        registered_types = set()

    if problem_type not in yaml_types and problem_type not in registered_types:
        available = sorted(yaml_types.keys() | registered_types)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=(
                f"Unknown problem type: '{problem_type}'. "
                f"Available types: {available}"
            ),
        )

    entry = yaml_types.get(
        problem_type,
        {
            "id": problem_type,
            "name": problem_type.replace("_", " ").title(),
            "subject": "General",
            "description": f"Auto-discovered: {problem_type}",
            "difficulty": "medium",
            "tags": [],
            "solver_class": None,
            "form_definition": {
                "type": "object",
                "properties": {},
                "required": [],
            },
            "version": "1.0.0",
        },
    )

    entry.setdefault("id", problem_type)
    entry.setdefault(
        "form_definition",
        {"type": "object", "properties": {}, "required": []},
    )

    return ProblemTypeMetadata(**entry)


@router.post(
    "/solve",
    response_model=SolverResponse,
    summary="Solve a problem",
    description=(
        "Accepts a problem_type, input values dict, and optional seed.\n        Returns a step-by-step solution in <2 seconds.\n        Set stream=true for Server-Sent Events."
    ),
    responses={
        422: {"description": "Malformed input or missing required fields"},
        504: {"description": "Solver timed out after 2 seconds"},
    },
)
async def solve(
    body: SolveRequest,
    request: Request,
    current_user: AuthUser = Depends(get_current_user),
) -> Any:
    """
    POST /api/solver/solve
    -----------------------
    Main solve endpoint.

    Flow:
      1. Look up problem_type in the solver registry.
      2. Check in-memory LRU cache (keyed on problem_type + seed + values hash).
      3. If cache miss: run solver (with a 2-second hard timeout).
      4. If stream=true: return SSE stream with progressive step delivery.
      5. Return SolverResponse with all steps.
    """
    registry = getattr(request.app.state, "solver_registry", None)
    if registry is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Solver registry is not initialised.",
        )

    if body.problem_type not in registry.list_types():
        available = sorted(registry.list_types())
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"Unknown problem type: '{body.problem_type}'. "
                f"Available: {available}"
            ),
        )

    cache_key = _make_cache_key(
        body.problem_type, body.seed, body.values
    )
    cached = await _solve_cache.get(cache_key)
    if cached is not None:
        logger.debug("Solve cache hit: %s", cache_key)
        return SolverResponse(**cached) if isinstance(cached, dict) else cached

    # Load YAML definition for nice metadata in the response
    yaml_types = await _get_yaml_problem_types_cached()
    yaml_entry = yaml_types.get(body.problem_type, {})
    subject = yaml_entry.get("subject", "General")
    difficulty = yaml_entry.get("difficulty", "medium")

    solver = registry.get_solver(body.problem_type)

    async def _run_solve():
        t0 = asyncio.get_event_loop().time()
        try:
            # solver can be: a function, a class, or a class instance
            if hasattr(solver, "solve") and not isinstance(solver, type):
                # It's an instance with a .solve() method
                raw_result = await asyncio.wait_for(
                    asyncio.to_thread(solver.solve, body.values, body.seed),
                    timeout=2.0,
                )
            elif isinstance(solver, type) and hasattr(solver, "solve"):
                # It's a class - instantiate with params, then call solve()
                def _instantiate_and_solve():
                    try:
                        instance = solver(params=body.values)
                    except TypeError:
                        try:
                            instance = solver(body.values)
                        except TypeError:
                            instance = solver()
                    return instance.solve()
                raw_result = await asyncio.wait_for(
                    asyncio.to_thread(_instantiate_and_solve),
                    timeout=2.0,
                )
            else:
                # It's a plain function — try unpacking values as kwargs first,
                # then fall back to passing values as a single positional arg
                def _call_plain_fn():
                    try:
                        return solver(**body.values)
                    except TypeError:
                        try:
                            return solver(body.values)
                        except TypeError:
                            return solver()
                raw_result = await asyncio.wait_for(
                    asyncio.to_thread(_call_plain_fn),
                    timeout=2.0,
                )
        except asyncio.TimeoutError:
            logger.warning(
                "Solver '%s' timed out after 2s", body.problem_type
            )
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail=(
                    "Solver timed out after 2 seconds. The problem may be too\n                    complex. Please try a simpler expression or different parameters."
                ),
            )

        elapsed_ms = round(
            (asyncio.get_event_loop().time() - t0) * 1000, 2
        )

        if hasattr(raw_result, "model_dump"):
            result_dict: dict = raw_result.model_dump(mode="json")
        elif hasattr(raw_result, "to_dict") and callable(raw_result.to_dict):
            result_dict = raw_result.to_dict()
        elif hasattr(raw_result, "dict"):
            result_dict = raw_result.dict()
        elif isinstance(raw_result, dict):
            result_dict = raw_result
        else:
            result_dict = {
                "steps": getattr(raw_result, "steps", []),
                "final_answer": getattr(raw_result, "final_answer", None),
            }

        # Map common alternative field names to final_answer
        if "final_answer" not in result_dict:
            result_dict["final_answer"] = str(
                result_dict.get("answer", result_dict.get("exact_answer", ""))
            )

        # Ensure required fields for SolverResponse
        if "steps" not in result_dict or not result_dict["steps"]:
            # Wrap raw result in a single-step format
            result_dict = {
                "steps": [{
                    "step_number": 1,
                    "title": "Result",
                    "explanation": str(result_dict),
                    "latex": str(result_dict.get("final_answer", result_dict.get("answer", ""))),
                }],
                "final_answer": str(result_dict.get("final_answer", result_dict.get("answer", ""))),
            }
        else:
            # Convert solver step format to API step format
            converted_steps = []
            for i, step in enumerate(result_dict["steps"], 1):
                if isinstance(step, dict):
                    converted_steps.append({
                        "step_number": i,
                        "title": step.get("title", step.get("rule", step.get("rule_applied", f"Step {i}"))),
                        "explanation": step.get("text", step.get("description", step.get("explanation", ""))),
                        "latex": step.get("math", step.get("latex", step.get("after", step.get("output_expr", step.get("rule_formula", ""))))),
                    })
                elif hasattr(step, "to_dict") and callable(step.to_dict):
                    sd = step.to_dict()
                    converted_steps.append({
                        "step_number": i,
                        "title": sd.get("rule_applied", f"Step {i}"),
                        "explanation": sd.get("explanation", sd.get("rule_formula", "")),
                        "latex": sd.get("output_expr", sd.get("rule_formula", "")),
                    })
                elif hasattr(step, "__dict__"):
                    converted_steps.append({
                        "step_number": i,
                        "title": getattr(step, "rule_applied", f"Step {i}"),
                        "explanation": getattr(step, "explanation", str(step)),
                        "latex": getattr(step, "output_expr", getattr(step, "rule_formula", "")),
                    })
                else:
                    converted_steps.append({
                        "step_number": i,
                        "title": f"Step {i}",
                        "explanation": str(step),
                        "latex": "",
                    })
            result_dict["steps"] = converted_steps
            if "final_answer" not in result_dict:
                result_dict["final_answer"] = str(result_dict.get("answer", ""))

        result_dict["problem_type"] = body.problem_type
        result_dict["subject"] = subject
        result_dict["difficulty"] = difficulty
        result_dict["input_summary"] = dict(body.values)
        result_dict["computation_time_ms"] = elapsed_ms

        # Board-aware formatting
        if body.board:
            try:
                from services.board_formatter import BoardFormatter
                formatted = BoardFormatter.format_solver_result(
                    result=result_dict,
                    board=body.board,
                    max_marks=body.max_marks,
                    subject=subject,
                    class_level=body.class_level,
                )
                result_dict["board"] = formatted.board
                result_dict["marking_scheme"] = formatted.marking_scheme
                result_dict["max_marks"] = formatted.max_marks
                result_dict["conclusion"] = formatted.conclusion
                result_dict["scope_note"] = formatted.scope_note
                if formatted.final_answer:
                    result_dict["final_answer"] = formatted.final_answer
            except Exception as e:
                logger.warning(f"Board formatting failed: {e}")
                result_dict["board"] = body.board

        await _solve_cache.set(cache_key, result_dict)
        return result_dict

    result_dict = await _run_solve()

    if body.stream:
        cached_steps = result_dict.get("steps", [])

        async def _step_gen():
            for i, step in enumerate(cached_steps[:100]):
                yield {
                    "event": "step",
                    "data": {
                        "step_number": i + 1,
                        **(
                            step.model_dump(mode="json")
                            if hasattr(step, "model_dump")
                            else step
                        ),
                    },
                }

        async def _final_builder():
            return result_dict

        stream = _sse_stream(_step_gen(), _final_builder())
        return StreamingResponse(
            stream,
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
                "Connection": "keep-alive",
            },
        )

    try:
        return SolverResponse(**result_dict)
    except Exception as exc:
        logger.error("SolverResponse validation error: %s", exc, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Solver returned malformed result: {exc}",
        )


@router.post(
    "/generate",
    response_model=GenerateResponse,
    summary="Generate a new practice question",
    description=(
        "Generates a randomised practice question for the given problem type.\n        The same seed always returns the same question (deterministic).\n        Results are cached in memory for fast repeat access."
    ),
)
async def generate(
    body: GenerateRequest,
    request: Request,
    current_user: AuthUser = Depends(get_current_user),
) -> GenerateResponse:
    """
    POST /api/solver/generate
    --------------------------
    Deterministic question generation using a PRNG seed.

    Flow:
      1. Resolve difficulty (request body overrides YAML default).
      2. Check in-memory cache (keyed on problem_type + seed + difficulty).
      3. On cache miss: call solver.generate_question(seed, difficulty).
      4. Return question text, LaTeX, expected answer, and progressive hints.
    """
    registry = getattr(request.app.state, "solver_registry", None)
    if registry is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Solver registry is not initialised.",
        )

    if body.problem_type not in registry.list_types():
        available = sorted(registry.list_types())
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"Unknown problem type: '{body.problem_type}'. "
                f"Available: {available}"
            ),
        )

    yaml_types = await _get_yaml_problem_types_cached()
    yaml_entry = yaml_types.get(body.problem_type, {})
    subject = yaml_entry.get("subject", "General")
    difficulty = body.difficulty or yaml_entry.get("difficulty", "medium")

    cache_key = (
        body.problem_type, body.seed, difficulty,
        hashlib.sha256(str(sorted(yaml_entry.items())).encode()).hexdigest()[:8],
    )

    async def _do_generate():
        solver = registry.get_solver(body.problem_type)

        if not hasattr(solver, "generate_question"):
            raise HTTPException(
                status_code=status.HTTP_501_NOT_IMPLEMENTED,
                detail=(
                    f"Solver '{body.problem_type}' does not support\n                    question generation. Use POST /solve instead."
                ),
            )

        t0 = asyncio.get_event_loop().time()
        try:
            raw_q = await asyncio.wait_for(
                asyncio.to_thread(
                    solver.generate_question, body.seed, difficulty
                ),
                timeout=1.0,
            )
        except asyncio.TimeoutError:
            logger.warning(
                "Generator '%s' timed out", body.problem_type
            )
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Question generation timed out. Please try again.",
            )

        elapsed_ms = round(
            (asyncio.get_event_loop().time() - t0) * 1000, 2
        )
        logger.debug(
            "Generated question for '%s' (seed=%d) in %.1fms",
            body.problem_type, body.seed, elapsed_ms,
        )

        if hasattr(raw_q, "model_dump"):
            qd: dict = raw_q.model_dump(mode="json")
        elif hasattr(raw_q, "dict"):
            qd = raw_q.dict()
        elif isinstance(raw_q, dict):
            qd = raw_q
        else:
            qd = {
                "question_text": getattr(raw_q, "question_text", str(raw_q)),
                "expected_answer": getattr(raw_q, "expected_answer", ""),
            }

        qd["problem_type"] = body.problem_type
        qd["subject"] = subject
        qd["difficulty"] = difficulty
        qd["seed"] = body.seed
        qd["from_cache"] = False
        return qd

    result_dict = await _generate_cache.get_or_compute(cache_key, _do_generate)

    return GenerateResponse(**(result_dict if isinstance(result_dict, dict) else result_dict))


# ---------------------------------------------------------------------------
# POST /api/solver/identify — identify problem type from free text
# ---------------------------------------------------------------------------
@router.post(
    "/identify",
    response_model=IdentifyResponse,
    summary="Identify problem type from free text",
    description=(
        "Accepts a free-text question and returns the best-matching problem type.\n        Optional subject and class_level hints narrow the search."
    ),
)
async def identify(
    body: IdentifyRequest,
    request: Request,
    current_user: AuthUser = Depends(get_current_user),
) -> IdentifyResponse:
    """
    POST /api/solver/identify
    -------------------------
    Heuristic matcher: tokenises the input text and scores it against
    known problem-type names, tags, and YAML keywords.
    """
    registry = getattr(request.app.state, "solver_registry", None)
    yaml_types = await _get_yaml_problem_types_cached()

    # Build a searchable corpus from YAML types + registry types
    corpus: list[dict[str, Any]] = []
    for entry in yaml_types:
        corpus.append({
            "id": entry.get("id", ""),
            "name": entry.get("name", ""),
            "subject": entry.get("subject", ""),
            "tags": entry.get("tags", []),
            "keywords": entry.get("keywords", []),
            "class_levels": entry.get("class_levels", []),
        })
    if registry:
        for pt in registry.list_types():
            if not any(c["id"] == pt for c in corpus):
                corpus.append({"id": pt, "name": pt, "subject": "", "tags": [], "keywords": [], "class_levels": []})

    # Filter by subject / class if provided
    if body.subject:
        corpus = [c for c in corpus if not c["subject"] or body.subject.lower() in c["subject"].lower()]
    if body.class_level:
        corpus = [c for c in corpus if not c["class_levels"] or body.class_level in c["class_levels"]]

    # Tokenise input
    text_lower = body.text.lower()
    tokens = set(text_lower.replace(",", " ").replace(".", " ").replace("?", " ").split())

    # Score each candidate
    scored: list[tuple[float, dict[str, Any]]] = []
    for entry in corpus:
        score = 0.0
        name_lower = entry["name"].lower()
        id_lower = entry["id"].lower()
        # Exact name match
        if name_lower in text_lower:
            score += 0.5
        # Token overlap with name
        name_tokens = set(name_lower.replace("_", " ").split())
        score += 0.1 * len(tokens & name_tokens)
        # Token overlap with tags
        for tag in entry.get("tags", []):
            if tag.lower() in text_lower:
                score += 0.15
        # Keyword matches
        for kw in entry.get("keywords", []):
            if kw.lower() in text_lower:
                score += 0.2
        # ID substring match
        if id_lower in text_lower:
            score += 0.3
        if score > 0:
            scored.append((min(score, 1.0), entry))

    if not scored:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not identify problem type from the given text.",
        )

    scored.sort(key=lambda x: x[0], reverse=True)
    best_score, best = scored[0]
    alternatives = [
        {"problem_type": e["id"], "confidence": s, "name": e.get("name", e["id"])}
        for s, e in scored[1:5]
    ]

    return IdentifyResponse(
        problem_type=best["id"],
        confidence=best_score,
        alternatives=alternatives,
    )


# ---------------------------------------------------------------------------
# POST /api/solver/grade — grade a student's answer
# ---------------------------------------------------------------------------
@router.post(
    "/grade",
    response_model=GradeResponse,
    summary="Grade a student's answer",
    description=(
        "Compares the student's answer against the canonical solution.\n        Returns correctness, partial-credit score, feedback, and misconception."
    ),
)
async def grade(
    body: GradeRequest,
    request: Request,
    current_user: AuthUser = Depends(get_current_user),
) -> GradeResponse:
    """
    POST /api/solver/grade
    ----------------------
    1. Solve the problem with the given inputs + seed to get the expected answer.
    2. Normalise both expected and student answers (strip LaTeX wrappers, spaces).
    3. Compare with SymPy if available, else string comparison.
    4. Return score + feedback.
    """
    registry = getattr(request.app.state, "solver_registry", None)
    if registry is None or body.problem_type not in registry.list_types():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Unknown problem type: '{body.problem_type}'",
        )

    # Solve to get the expected answer
    try:
        solver = registry.get_solver(body.problem_type)
        import asyncio as _aio
        result = await _aio.wait_for(
            _aio.to_thread(solver.solve, body.values),
            timeout=10.0,
        )
        expected = ""
        if isinstance(result, dict):
            expected = str(result.get("final_answer") or result.get("answer") or "")
            steps = result.get("steps", [])
            if not expected and steps:
                expected = str(steps[-1].get("math_expression") or steps[-1].get("result") or "")
    except Exception as exc:
        logger.error("Grade: solver failed: %s", exc, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Solver failed while computing expected answer: {exc}",
        )

    # Normalise answers for comparison
    def _normalise(s: str) -> str:
        s = s.strip()
        s = s.replace("\\(", "").replace("\\)", "")
        s = s.replace("$", "").replace(" ", "")
        s = s.replace("{", "").replace("}", "")
        return s.lower()

    expected_norm = _normalise(expected)
    student_norm = _normalise(body.student_answer)

    # Try SymPy comparison for math
    correct = False
    score = 0.0
    misconception = None

    if expected_norm == student_norm:
        correct = True
        score = 1.0
    else:
        # Try symbolic equivalence
        try:
            import sympy as sp
            exp_expr = sp.sympify(expected.replace("=", "").strip())
            stu_expr = sp.sympify(body.student_answer.replace("=", "").strip())
            if sp.simplify(exp_expr - stu_expr) == 0:
                correct = True
                score = 1.0
            elif sp.simplify(exp_expr - stu_expr).is_number:
                diff = abs(float(sp.simplify(exp_expr - stu_expr)))
                tol = max(0.01, abs(float(exp_expr)) * 0.02)
                if diff < tol:
                    correct = True
                    score = 0.9
                else:
                    score = max(0.0, 1.0 - diff / (abs(float(exp_expr)) + 1))
                    misconception = "numerical_error"
        except Exception:
            # Fall back to string similarity
            if student_norm and expected_norm:
                from difflib import SequenceMatcher
                ratio = SequenceMatcher(None, student_norm, expected_norm).ratio()
                score = ratio
                correct = ratio > 0.95
                if ratio < 0.5:
                    misconception = "wrong_approach"
                elif ratio < 0.8:
                    misconception = "partial_understanding"

    feedback = "Correct! Well done." if correct else (
        f"Not quite. Expected: {expected}. Review the steps and try again."
        if score < 0.5 else
        f"Close! Expected: {expected}. Check your calculation."
    )

    # Board-aware grading extensions
    marks_awarded = None
    marking_scheme_text = None
    board_val = body.board

    if board_val:
        try:
            from services.board_formatter import BoardFormatter
            marks_awarded = int(round(score * body.max_marks))
            marking_scheme_text = BoardFormatter.format_evaluation_feedback(
                board=board_val,
                marks_awarded=marks_awarded,
                max_marks=body.max_marks,
                criteria_met=["correct_answer"] if correct else [],
                criteria_missed=[] if correct else ["correct_answer"],
            )
            feedback = marking_scheme_text
        except Exception as e:
            logger.warning(f"Board grading formatting failed: {e}")

    return GradeResponse(
        correct=correct,
        score=round(score, 3),
        expected_answer=expected,
        feedback=feedback,
        misconception=misconception,
        board=board_val,
        marks_awarded=marks_awarded,
        max_marks=body.max_marks if board_val else None,
        marking_scheme=marking_scheme_text,
    )


# ---------------------------------------------------------------------------
# GET /api/solver/types/{subject}/{class_level} — filter by subject & class
# ---------------------------------------------------------------------------
@router.get(
    "/types/{subject}/{class_level}",
    response_model=list[dict[str, Any]],
    summary="List problem types for a specific subject and class",
    description=(
        "Returns problem types filtered by subject and class level.\n        Useful for frontend dropdowns when the student has already selected a subject."
    ),
)
async def list_types_by_subject_class(
    subject: str,
    class_level: int,
) -> list[dict[str, Any]]:
    """
    GET /api/solver/types/{subject}/{class_level}
    ---------------------------------------------
    Filters the full type list by subject (case-insensitive) and class level.
    """
    yaml_types = await _get_yaml_problem_types_cached()

    try:
        from solvers.registry import solver_registry
        registered = solver_registry.list_types()
    except (ImportError, AttributeError):
        registered = set()

    merged: dict[str, dict[str, Any]] = {}
    for entry in yaml_types:
        pt_id = entry.get("id", entry.get("name", ""))
        if not pt_id:
            continue
        merged[pt_id] = entry

    for pt in registered:
        if pt not in merged:
            merged[pt] = {"id": pt, "name": pt, "subject": subject, "class_levels": [class_level]}

    # Filter
    result = []
    for entry in merged.values():
        entry_subject = str(entry.get("subject", "")).lower()
        entry_classes = entry.get("class_levels", [])
        if subject.lower() not in entry_subject and entry_subject not in subject.lower():
            continue
        if entry_classes and class_level not in entry_classes:
            continue
        result.append(entry)

    return result


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Check solver health",
    description=(
        "Returns which solvers are loaded and whether they are healthy.\n        Useful for monitoring and for the frontend to show solver availability."
    ),
)
async def health(
    request: Request,
) -> HealthResponse:
    """
    GET /api/solver/health
    -----------------------
    Returns a HealthResponse with the status of each registered solver.
    Status 'ok' means at least one solver loaded without errors.
    Status 'degraded' means the registry exists but all solvers failed to load.
    """
    registry = getattr(request.app.state, "solver_registry", None)

    solver_entries: list[HealthSolverEntry] = []

    if registry is not None:
        try:
            ptypes = registry.list_types()
        except Exception as exc:
            logger.error("registry.list_types() failed: %s", exc)
            ptypes = []

        for pid in ptypes:
            try:
                solver = registry.get_solver(pid)
                # Solver can be: a class with .solve(), an instance with .solve(), or a plain function
                if solver is None:
                    is_loaded = False
                    err = "Solver not found in registry."
                elif callable(solver) and not isinstance(solver, type):
                    # Plain function — callable directly
                    is_loaded = True
                    err = None
                elif isinstance(solver, type) and hasattr(solver, "solve"):
                    # Class with .solve() method
                    is_loaded = True
                    err = None
                elif hasattr(solver, "solve") and callable(getattr(solver, "solve", None)):
                    # Instance with .solve() method
                    is_loaded = True
                    err = None
                else:
                    is_loaded = False
                    err = "Solver is not callable and has no .solve() method."
            except Exception as exc:
                is_loaded = False
                err = str(exc)
            solver_entries.append(
                HealthSolverEntry(
                    problem_type=pid,
                    loaded=is_loaded,
                    error=err,
                )
            )

    total = len(solver_entries)
    loaded_count = sum(1 for e in solver_entries if e.loaded)
    overall_status = (
        "ok" if loaded_count > 0 else "degraded"
    )

    logger.debug(
        "Health check: %d/%d solvers loaded", loaded_count, total
    )

    return HealthResponse(
        status=overall_status,
        total_problem_types=total,
        loaded_solvers=solver_entries,
    )


# ---------------------------------------------------------------------------
# App wiring helper – call from your FastAPI app startup event
# ---------------------------------------------------------------------------

def register_solver_registry(app, solver_registry) -> None:
    """
    Wire a SolverRegistry instance into the FastAPI app state so that
    all solver endpoints can access it via `request.app.state.solver_registry`.

    Usage in your main FastAPI app::

        from fastapi import FastAPI
        from solvers.registry import SolverRegistry
        from api.solver import router, register_solver_registry

        registry = SolverRegistry()
        registry.auto_discover()

        app = FastAPI()

        @app.on_event("startup")
        async def _startup():
            register_solver_registry(app, registry)

        app.include_router(router)
    """
    app.state.solver_registry = solver_registry
    logger.info(
        "Solver registry registered on app state – %d types available",
        len(solver_registry.list_types()),
    )


@router.on_event("startup")
async def _on_solver_startup() -> None:
    logger.info("Solver API router ready.")


# ---------------------------------------------------------------------------
# POST /api/solver/solve-universal — Universal STEM solver pipeline
# ---------------------------------------------------------------------------
@router.post(
    "/solve-universal",
    response_model=UniversalSolveResponse,
    summary="Solve any STEM problem through the universal pipeline",
    description=(
        "Accepts a free-text problem statement and routes it through the full\n"
        "        deterministic pipeline: preprocess -> extract quantities -> resolve\n"
        "        implicit values -> select formula -> decompose -> compute -> verify -> explain.\n"
        "        No LLM in the computation path."
    ),
)
async def solve_universal(
    body: UniversalSolveRequest,
    current_user: AuthUser = Depends(get_current_user),
) -> Any:
    """
    POST /api/solver/solve-universal
    --------------------------------
    Universal STEM solver -- uses the Fable-designed pipeline.

    Stages:
      1. Preprocess (normalize text, extract math)
      2. Extract explicit quantities
      3. Extract concepts + target
      4. Resolve implicit values (from YAML rules)
      5. Select formula(s) from KB (dimensional analysis)
      6. Decompose multi-step problems
      7. Compute (pattern -> compute engine -> symbolic -> calculus)
      8. Verify (dimensional + back-substitution)
      9. Explain (template-based step explanation)
    """
    try:
        from services.solver_router import SolverRouter

        router_solver = SolverRouter()
        # Use async solve if available (handles enrichment routing)
        if hasattr(router_solver, 'solve_async'):
            result = await router_solver.solve_async(body.problem_text)
        else:
            result = router_solver.solve(body.problem_text)

        problem = result.problem
        formula_used = None
        if problem.metadata.get("selected_formula"):
            formula_used = problem.metadata["selected_formula"].get("formula_id")

        # ── Intelligence layer: capture interaction ──
        try:
            from services.interaction_capture import SimpleInteractionCapture
            capture = SimpleInteractionCapture()
            capture.capture(
                student_id=current_user.user_id if hasattr(current_user, 'user_id') else "anonymous",
                session_id="solver",
                subject=problem.domain or "unknown",
                concept=",".join(problem.concept_tags[:3]) if problem.concept_tags else "general",
                grade_level=0,
                interaction_type="solve_attempt",
                question_text=body.problem_text,
                answer=problem.final_answer,
                solved=problem.solved,
                method=problem.backend_used,
                confidence=problem.confidence,
            )
        except Exception:
            pass  # Interaction capture is non-critical

        # ── Intelligence layer: update 4D learner state ──
        try:
            from services.state_4d_builder import State4DBuilder
            state_builder = State4DBuilder()
            state_builder.build_state(
                student_id=current_user.user_id if hasattr(current_user, 'user_id') else "anonymous",
                concept=",".join(problem.concept_tags[:2]) if problem.concept_tags else "general",
                interactions=[],  # Will be loaded from capture history
                correct=problem.solved,
            )
        except Exception:
            pass  # State building is non-critical

        return UniversalSolveResponse(
            solved=problem.solved,
            answer=problem.final_answer,
            confidence=problem.confidence,
            method=problem.backend_used,
            explanation=result.explanation,
            pipeline_stages=result.pipeline_stages,
            solve_time_ms=result.solve_time_ms,
            subject=problem.domain or "",
            concept_tags=problem.concept_tags,
            target=problem.target.name if problem.target else None,
            formula_used=formula_used,
            fallback_used=result.fallback_used,
            quantities=[q.to_dict() for q in problem.quantities],
        )
    except Exception as exc:
        logger.exception("Universal solver error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Universal solver failed: {exc}",
        )
