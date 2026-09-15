r"""
main.py — FastAPI application shell for the K-12 learning platform.

Mounts all routers under /api/, wires middleware (CORS, JWT auth),
registers error handlers, WebSocket routes, and health check.

Path: D:\platform\backend\app.py
"""

from __future__ import annotations

import logging
import os
import time
import uuid
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, Request, status, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

# Structured logging — opt-in via LOG_FORMAT=json. Must be configured before
# any logger is used so the JSON handler is in place from the first record.
from backend.services.json_logging import setup_logging, set_request_id

# Sentry error monitoring — opt-in via SENTRY_DSN. No-op if unset.
from backend.services.sentry_setup import init_sentry, capture_exception, set_request_context, flush as sentry_flush

setup_logging(log_format=os.environ.get("LOG_FORMAT", "text"), debug=(os.environ.get("DEBUG", "").lower() in ("1", "true", "yes")))

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

ENV = os.environ.get("ENVIRONMENT", os.environ.get("ENV", "development"))
DEBUG = ENV not in ("production", "prod")

CORS_ORIGINS: list[str] = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

ALLOWED_WEBSOCKET_ORIGINS: list[str] = ["*"]  # tighten in production


# ---------------------------------------------------------------------------
# Lifespan — startup / shutdown hooks
# ---------------------------------------------------------------------------

class ConnectionManager:
    """Manages active WebSocket connections for real-time features."""

    def __init__(self) -> None:
        self.active: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, conn_id: str) -> None:
        await websocket.accept()
        self.active[conn_id] = websocket
        logger.info("ws connected: %s", conn_id)

    def disconnect(self, conn_id: str) -> None:
        self.active.pop(conn_id, None)
        logger.info("ws disconnected: %s", conn_id)

    async def send_json(self, conn_id: str, payload: dict) -> None:
        ws = self.active.get(conn_id)
        if ws:
            try:
                await ws.send_json(payload)
            except Exception:
                self.disconnect(conn_id)

    async def broadcast(self, payload: dict) -> None:
        for cid in list(self.active):
            await self.send_json(cid, payload)


ws_manager = ConnectionManager()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Startup / shutdown lifecycle."""
    startup_ts = datetime.now(timezone.utc).isoformat()
    logger.info("Application starting at %s (env=%s)", startup_ts, ENV)

    # Initialize Sentry error monitoring (no-op if SENTRY_DSN is unset).
    try:
        sentry_on = init_sentry()
        app.state.sentry_enabled = sentry_on
        logger.info("Sentry error monitoring: %s", "enabled" if sentry_on else "disabled (no SENTRY_DSN)")
    except Exception as e:
        app.state.sentry_enabled = False
        logger.warning("Sentry init failed: %s", e)

    # Initialize connection pools (50k concurrency infrastructure)
    try:
        from infrastructure import ConnectionPools
        ConnectionPools.init_postgres()
        ConnectionPools.init_neo4j()
        ConnectionPools.init_redis()
        logger.info("Connection pools initialised (PG=%d+%, Neo4j=50, Redis=200)",
                    ConnectionPools.pg_engine.pool.size() if ConnectionPools.pg_engine else 0,
                    ConnectionPools.pg_engine.pool.overflow() if ConnectionPools.pg_engine else 0)
    except Exception:
        logger.exception("Failed to initialize connection pools — continuing without")

    # Initialize solver registry
    try:
        from solvers.registry import get_registry
        registry = get_registry()
        stats = registry.initialize()
        app.state.solver_registry = registry
        logger.info(
            "Solver registry initialized: %d solvers, %d problem types, %d failed modules",
            stats.solver_count,
            stats.total_problem_types,
            len(stats.failed_modules),
        )
    except Exception as e:
        logger.warning("Failed to initialize solver registry: %s", e)

    # Pre-warm the solution cache with common step types so the first
    # student requests are instant (not 2s SymPy cold starts).
    try:
        from backend.services.process_solver_pool import adaptive_solve_step
        _WARM_STEPS = [
            ("percentage_of", {"percent": "10", "whole": "50"}, "", ""),
            ("percentage", {"part": "25", "whole": "200"}, "", ""),
            ("percentage_change", {"old": "40", "new": "50"}, "", ""),
            ("linear_equation_one_var", {"expression": "2*x + 5 - 15", "var": "x"}, "maths", "8"),
            ("quadratic_formula", {"a": "1", "b": "-5", "c": "6"}, "maths", "10"),
            ("differentiate", {"expression": "x**2 + 3*x", "var": "x"}, "maths", "12"),
            ("differentiate_at_point", {"expression": "x*sin(x)", "var": "x", "point": "1"}, "maths", "12"),
        ]
        warmed = 0
        for step_id, inputs, subj, cls in _WARM_STEPS:
            r = adaptive_solve_step(step_id, inputs, subject=subj, class_level=cls)
            if r.success:
                warmed += 1
        logger.info("Cache pre-warmed: %d/%d step types", warmed, len(_WARM_STEPS))
    except Exception as e:
        logger.warning("Cache pre-warm skipped: %s", e)

    # Wire intelligence event persistence + replay shared state.
    # Best-effort — if the DB is down the app still runs (in-memory mode).
    try:
        from backend.services.intelligence_persistence import wire_persistence
        wired = wire_persistence()
        logger.info("Intelligence persistence wired: %s", wired)
    except Exception as e:
        logger.warning("Intelligence persistence not wired: %s", e)

    try:
        yield
    finally:
        # Dispose sync engine (intelligence persistence layer)
        try:
            from backend.database import dispose_sync_engine
            await dispose_sync_engine()
        except Exception:
            logger.exception("Error disposing sync engine")
        # Close connection pools on shutdown
        try:
            from infrastructure import ConnectionPools
            await ConnectionPools.close_all()
        except Exception:
            logger.exception("Error closing connection pools")
        # Flush any pending Sentry events before the process exits
        try:
            sentry_flush(timeout=2.0)
        except Exception:
            logger.exception("Error flushing Sentry events")
        shutdown_ts = datetime.now(timezone.utc).isoformat()
        logger.info("Application shutting down at %s", shutdown_ts)


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------

app = FastAPI(
    title="K-12 Learning Platform API",
    description=(
        "Backend API for the CISCE/ICSE/ISC learning platform. "
        "Provides endpoints for solvers, practice sessions, AI tutoring, "
        "mastery tracking, content delivery, authentication, diagnostics, "
        "and exam simulation."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
    debug=DEBUG,
)


# ---------------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------------

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=None,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID", "X-Response-Time"],
    expose_headers=["X-Request-ID", "X-Response-Time"],
)

# --- Rate-limit middleware (50k concurrency support) ---
try:
    from infrastructure import RateLimitMiddleware
    app.add_middleware(RateLimitMiddleware)
    logger.info("Rate-limit middleware registered")
except ImportError:
    logger.warning("infrastructure module not available; rate limiting disabled")

# --- Request-ID + timing + Prometheus metrics middleware ---

@app.middleware("http")
async def add_request_id_and_timing(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    # Bind the request id to the logging context so every log line emitted
    # during this request is correlated (used by JSON logging + structured logs).
    rid_token = set_request_id(request_id)
    # Also tag the Sentry scope so any captured event is correlated.
    set_request_context(request_id)
    start = time.perf_counter()
    try:
        # Prometheus: track in-progress requests
        try:
            from backend.services.metrics import REQUEST_IN_PROGRESS, REQUEST_COUNT, REQUEST_LATENCY
            REQUEST_IN_PROGRESS.inc()
        except Exception:
            pass
        response = await call_next(request)
    except Exception:
        raise
    finally:
        try:
            REQUEST_IN_PROGRESS.dec()
        except Exception:
            pass
        # Restore the prior request-id context (None outside a request).
        set_request_id(None, rid_token)
    elapsed_ms = (time.perf_counter() - start) * 1000
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time"] = f"{elapsed_ms:.1f}ms"
    # Prometheus: record request count + latency
    try:
        endpoint = request.url.path
        method = request.method
        status = str(response.status_code)
        REQUEST_COUNT.labels(method=method, endpoint=endpoint, status=status).inc()
        REQUEST_LATENCY.labels(method=method, endpoint=endpoint).observe(elapsed_ms / 1000.0)
    except Exception:
        pass
    return response


# --- Global authentication gate ---
# Public paths (health, docs, auth login/signup) are the only routes that
# work without a Bearer token. Everything else requires auth.
# Individual routers may add their OWN stricter checks on top of this.

PUBLIC_PATHS = frozenset({
    "/", "/health", "/health/detailed", "/docs", "/redoc", "/openapi.json",
    "/metrics", "/favicon.ico",
})
PUBLIC_PREFIXES = ("/api/auth/login", "/api/auth/signup", "/api/auth/forgot",
                   "/api/auth/verify", "/api/auth/refresh", "/api/auth/otp",
                   "/api/public/", "/ws/")

@app.middleware("http")
async def global_auth_gate(request: Request, call_next):
    """Rejects unauthenticated requests to all non-public paths."""
    path = request.url.path
    if path in PUBLIC_PATHS or any(path.startswith(p) for p in PUBLIC_PREFIXES):
        return await call_next(request)

    auth_header = request.headers.get("authorization", "")
    if not auth_header.startswith("Bearer ") or len(auth_header) < 10:
        return JSONResponse(
            status_code=401,
            content={"detail": "Not authenticated. Send Authorization: Bearer <token>.",
                     "error_code": "NOT_AUTHENTICATED"},
        )
    # Token validity is checked per-endpoint by get_current_user / deps.
    # This middleware only ensures a token EXISTS.
    return await call_next(request)


# --- Request body size limit ---
# Rejects oversized request bodies early (before handlers parse them).
# Protects against memory exhaustion from large payloads.
MAX_REQUEST_BODY_BYTES = 2 * 1024 * 1024  # 2 MB default

@app.middleware("http")
async def limit_request_body_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length and content_length.isdigit():
        if int(content_length) > MAX_REQUEST_BODY_BYTES:
            return JSONResponse(
                status_code=413,
                content={"detail": "Request body too large. Maximum 2 MB allowed."},
            )
    return await call_next(request)


# ---------------------------------------------------------------------------
# Custom error handlers — no stack traces to the frontend
# ---------------------------------------------------------------------------

class AppError(Exception):
    """Base application error."""

    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        *,
        error_code: str = "APP_ERROR",
        details: dict | None = None,
    ) -> None:
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details or {}
        super().__init__(self.message)


class NotFoundError(AppError):
    def __init__(self, message: str = "Resource not found", **kwargs):
        super().__init__(message, status.HTTP_404_NOT_FOUND, error_code="NOT_FOUND", **kwargs)


class UnauthorizedError(AppError):
    def __init__(self, message: str = "Unauthorized", **kwargs):
        super().__init__(message, status.HTTP_401_UNAUTHORIZED, error_code="UNAUTHORIZED", **kwargs)


class ForbiddenError(AppError):
    def __init__(self, message: str = "Forbidden", **kwargs):
        super().__init__(message, status.HTTP_403_FORBIDDEN, error_code="FORBIDDEN", **kwargs)


class ValidationError(AppError):
    def __init__(self, message: str = "Validation failed", **kwargs):
        super().__init__(message, status.HTTP_422_UNPROCESSABLE_ENTITY, error_code="VALIDATION_ERROR", **kwargs)


class SolverError(AppError):
    def __init__(self, message: str = "Solver computation failed", **kwargs):
        super().__init__(message, status.HTTP_422_UNPROCESSABLE_ENTITY, error_code="SOLVER_ERROR", **kwargs)


@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    payload = {
        "detail": exc.message,
        "error_code": exc.error_code,
        "details": exc.details,
    }
    logger.warning("AppError %s on %s: %s", exc.error_code, request.url.path, exc.message)
    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(RequestValidationError)
async def pydantic_validation_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    errors: list[dict] = []
    for err in exc.errors():
        errors.append(
            {
                "loc": err.get("loc", []),
                "msg": err.get("msg", ""),
                "type": err.get("type", ""),
            }
        )
    payload = {
        "detail": "Request validation failed",
        "error_code": "VALIDATION_ERROR",
        "details": {"errors": errors},
    }
    logger.warning("Validation error on %s: %s", request.url.path, errors)
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=payload)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, str) else str(exc.detail)
    error_code_map = {
        400: "BAD_REQUEST",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        405: "METHOD_NOT_ALLOWED",
        409: "CONFLICT",
        422: "VALIDATION_ERROR",
        429: "RATE_LIMIT_EXCEEDED",
        500: "INTERNAL_ERROR",
        503: "SERVICE_UNAVAILABLE",
    }
    payload = {
        "detail": detail,
        "error_code": error_code_map.get(exc.status_code, "HTTP_ERROR"),
        "details": {},
    }
    logger.error(
        "HTTPException %s on %s: %s", exc.status_code, request.url.path, detail
    )
    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Catch-all — logs full traceback server-side, returns generic message."""
    logger.exception("Unhandled exception on %s", request.url.path)
    # Report to Sentry (no-op if not initialized). Tag with the request path
    # so the error is correlated with the failing endpoint.
    try:
        capture_exception(exc, request=request, handler="unhandled_exception_handler")
    except Exception:
        pass
    if DEBUG and os.environ.get("SHOW_TRACEBACKS", "").lower() in ("1", "true", "yes"):
        # Tracebacks ONLY when explicitly enabled, never by default in dev
        import traceback
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "detail": "Internal server error",
                "error_code": "INTERNAL_ERROR",
                "details": {"traceback": traceback.format_exc()},
            },
        )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error. Please try again later.",
            "error_code": "INTERNAL_ERROR",
            "details": {},
        },
    )


# ---------------------------------------------------------------------------
# Shared Pydantic v2 schemas (used across routers)
# ---------------------------------------------------------------------------

from pydantic import BaseModel, Field, ConfigDict
from typing import Literal


class HealthResponse(BaseModel):
    model_config = ConfigDict(json_schema_extra={"examples": [{"status": "ok"}]})

    status: str = Field(..., description="Service health status")
    timestamp: str = Field(..., description="ISO-8601 timestamp")
    env: str = Field(..., description="Deployment environment")
    version: str = Field(..., description="API version")


class ErrorResponse(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "examples": [{"detail": "Something went wrong", "error_code": "APP_ERROR", "details": {}}]
    })

    detail: str
    error_code: str
    details: dict


class PaginatedResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    items: list
    total: int = Field(..., ge=0)
    page: int = Field(..., ge=1)
    page_size: int = Field(..., ge=1, le=100)
    pages: int = Field(..., ge=0)


# ---------------------------------------------------------------------------
# Router imports — lazy so the app starts even if a router has issues
# ---------------------------------------------------------------------------

# Each router is imported inside a try/except so one missing router
# does not crash the entire application.

from fastapi import APIRouter

_router_map: dict[str, tuple[str, APIRouter]] = {}


def _try_import(router_path: str) -> APIRouter | None:
    """Dynamically import a router module and return its router."""
    try:
        import importlib
        mod = importlib.import_module(router_path)
        router = getattr(mod, "router", None)
        if router is None:
            logger.warning("Router module %s has no 'router' attribute — skipping", router_path)
            return None
        if not isinstance(router, APIRouter):
            logger.warning(
                "Module %s 'router' is %s, not APIRouter — skipping",
                router_path, type(router),
            )
            return None
        return router
    except ImportError as exc:
        logger.warning("Could not import router %s: %s", router_path, exc)
        return None
    except Exception as exc:
        logger.exception("Unexpected error importing router %s", router_path)
        return None


# --- Solver router ---
solver_router = _try_import("api.solver")
if solver_router:
    _router_map["/api/solver"] = ("api.solver", solver_router)

# --- Solver v2 router (unified facade + v2 endpoints) ---
# routers/solver.py contains the v2 unified facade endpoints (solve/step,
# solve/problem, solve/free-text, identify, problem-types, health, hint,
# show-another) plus the structured step-type catalog. It already has
# prefix="/api/solver" so it's mounted without an additional prefix.
# Non-overlapping paths coexist with the legacy api.solver router.
solver_v2_router = _try_import("routers.solver")
if solver_v2_router:
    _router_map["/api/solver-v2"] = ("routers.solver", solver_v2_router)

# --- Practice router ---
practice_router = _try_import("api.practice")
if practice_router:
    _router_map["/api/practice"] = ("api.practice", practice_router)

# --- Tutor router ---
tutor_router = _try_import("api.tutor")
if tutor_router:
    _router_map["/api/tutor"] = ("api.tutor", tutor_router)

# --- Mastery router ---
mastery_router = _try_import("api.mastery")
if mastery_router:
    _router_map["/api/mastery"] = ("api.mastery", mastery_router)

# --- Quest router (Session Composer: daily quests + boss battles) ---
quest_router = _try_import("api.quest")
if quest_router:
    _router_map["/api/quest"] = ("api.quest", quest_router)

# --- Content router ---
content_router = _try_import("api.content")
if content_router:
    _router_map["/api/content"] = ("api.content", content_router)

# --- Auth router ---
auth_router = _try_import("api.auth")
if auth_router:
    _router_map["/api/auth"] = ("api.auth", auth_router)

# --- Diagnostic router ---
diagnostic_router = _try_import("api.diagnostic")
if diagnostic_router:
    _router_map["/api/diagnostic"] = ("api.diagnostic", diagnostic_router)

# --- Exam router ---
exam_router = _try_import("api.exam")
if exam_router:
    _router_map["/api/exam"] = ("api.exam", exam_router)

# --- Graph router (bonus from existing api/) ---
graph_router = _try_import("api.graph")
if graph_router:
    _router_map["/api/graph"] = ("api.graph", graph_router)

# --- Dashboard router ---
dashboard_router = _try_import("api.dashboard")
if dashboard_router:
    _router_map["/api/dashboard"] = ("api.dashboard", dashboard_router)

# --- Nodes router ---
nodes_router = _try_import("api.nodes")
if nodes_router:
    _router_map["/api/nodes"] = ("api.nodes", nodes_router)

# --- Questions router ---
questions_router = _try_import("api.questions")
if questions_router:
    _router_map["/api/questions"] = ("api.questions", questions_router)

# --- Story router ---
story_router = _try_import("api.story")
if story_router:
    _router_map["/api/story"] = ("api.story", story_router)

# --- Subskills router ---
subskills_router = _try_import("api.subskills")
if subskills_router:
    _router_map["/api/subskills"] = ("api.subskills", subskills_router)

# --- Sim router ---
sim_router = _try_import("api.sim")
if sim_router:
    _router_map["/api/sim"] = ("api.sim", sim_router)

# --- Analytics router ---
analytics_router = _try_import("api.analytics")
if analytics_router:
    _router_map["/api/analytics"] = ("api.analytics", analytics_router)

# --- Progress router (bridges frontend /api/progress/* to services) ---
progress_router = _try_import("api.progress")
if progress_router:
    _router_map["/api/progress"] = ("api.progress", progress_router)

# --- Assessment router (bridges frontend /api/assessment/* to exam) ---
assessment_router = _try_import("api.assessment")
if assessment_router:
    _router_map["/api/assessment"] = ("api.assessment", assessment_router)

# --- Achievements router ---
achievements_router = _try_import("api.achievements")
if achievements_router:
    _router_map["/api/achievements"] = ("api.achievements", achievements_router)

# --- Intelligence router (full intelligence pipeline) ---
intelligence_router = _try_import("api.intelligence")
if intelligence_router:
    _router_map["/api/intelligence"] = ("api.intelligence", intelligence_router)


# Mount all discovered routers
# Some routers have full prefix (e.g. /api/content), others have partial (e.g. /solver)
for prefix, (module_name, router) in _router_map.items():
    existing_prefix = getattr(router, "prefix", "")
    if existing_prefix.startswith("/api/"):
        # Router already has full /api/... prefix, mount without additional prefix
        app.include_router(router, tags=[prefix.split("/")[-1]])
    else:
        app.include_router(router, prefix=prefix, tags=[prefix.split("/")[-1]])
    logger.info("Mounted router %s at %s (router_prefix=%s)", module_name, prefix, existing_prefix)


# ---------------------------------------------------------------------------
# Health check endpoint
# ---------------------------------------------------------------------------

@app.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Returns service health status. Does not require authentication.",
    tags=["system"],
)
async def health_check() -> HealthResponse:
    """Health check endpoint for load balancers and monitoring."""
    return HealthResponse(
        status="ok",
        timestamp=datetime.now(timezone.utc).isoformat(),
        env=ENV,
        version="1.0.0",
    )


@app.get(
    "/metrics",
    summary="Prometheus metrics",
    description="Returns Prometheus-format metrics for monitoring.",
    tags=["system"],
)
async def prometheus_metrics():
    """Prometheus metrics endpoint for scraping."""
    from backend.services.metrics import APP_INFO, metrics_response
    APP_INFO.info({"version": "1.0.0", "env": ENV})
    return metrics_response()


@app.get(
    "/health/detailed",
    summary="Detailed health check",
    description="Returns health status of all backing services (Postgres, Neo4j, Redis, Qdrant).",
    tags=["system"],
)
async def detailed_health_check() -> JSONResponse:
    """Detailed health check aggregating all service statuses."""
    try:
        from infrastructure import HealthAggregator
        aggregator = HealthAggregator()
        report = await aggregator.check_all()
        status_code = 200 if report["status"] != "unhealthy" else 503
        return JSONResponse(report, status_code=status_code)
    except ImportError:
        return JSONResponse(
            {"status": "degraded", "detail": "infrastructure module not available"},
            status_code=200,
        )


# ---------------------------------------------------------------------------
# WebSocket endpoints
# ---------------------------------------------------------------------------

@app.websocket("/ws/tutor/{student_id}")
async def ws_tutor(websocket: WebSocket, student_id: str) -> None:
    """Real-time AI tutor chat over WebSocket.

    Protocol: client sends JSON {\"type\": \"message\", \"text\": \"...\"}
              server replies with JSON {\"type\": \"response\", \"text\": \"...\"}
              or {\"type\": \"error\", \"detail\": \"...\"}
    """
    origin = websocket.headers.get("origin", "")
    if ALLOWED_WEBSOCKET_ORIGINS != ["*"] and origin not in ALLOWED_WEBSOCKET_ORIGINS:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    conn_id = f"tutor:{student_id}:{uuid.uuid4().hex[:8]}"
    await ws_manager.connect(websocket, conn_id)
    try:
        while True:
            raw = await websocket.receive_text()
            # Echo back with a typing indicator (real impl would call tutor service)
            await ws_manager.send_json(
                conn_id,
                {
                    "type": "typing",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                },
            )
            await ws_manager.send_json(
                conn_id,
                {
                    "type": "response",
                    "text": "(tutor response placeholder — wire to tutor service)",
                    "student_id": student_id,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                },
            )
    except WebSocketDisconnect:
        ws_manager.disconnect(conn_id)
    except Exception:
        logger.exception("WebSocket error for %s", conn_id)
        ws_manager.disconnect(conn_id)


@app.websocket("/ws/mastery/{student_id}")
async def ws_mastery(websocket: WebSocket, student_id: str) -> None:
    """Real-time mastery progress updates over WebSocket.

    Server pushes JSON {\"type\": \"mastery_update\", \"skill\": \"...", \"value\": 0.85}
    whenever the student's mastery profile changes.
    """
    origin = websocket.headers.get("origin", "")
    if ALLOWED_WEBSOCKET_ORIGINS != ["*"] and origin not in ALLOWED_WEBSOCKET_ORIGINS:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    conn_id = f"mastery:{student_id}:{uuid.uuid4().hex[:8]}"
    await ws_manager.connect(websocket, conn_id)
    try:
        while True:
            await websocket.receive_text()  # keepalive
    except WebSocketDisconnect:
        ws_manager.disconnect(conn_id)
    except Exception:
        logger.exception("WebSocket error for %s", conn_id)
        ws_manager.disconnect(conn_id)


# ---------------------------------------------------------------------------
# Root
# ---------------------------------------------------------------------------

@app.get(
    "/",
    summary="API root",
    description="Returns API metadata and links.",
    tags=["system"],
)
async def root() -> dict:
    mounted = [
        {
            "prefix": p,
            "module": m,
            "endpoints": [r.path for r in r.routes],
        }
        for p, (m, r) in _router_map.items()
    ]
    return {
        "name": "K-12 Learning Platform API",
        "version": "1.0.0",
        "env": ENV,
        "docs": "/docs",
        "openapi": "/openapi.json",
        "health": "/health",
        "websockets": [
            "/ws/tutor/{student_id}",
            "/ws/mastery/{student_id}",
        ],
        "mounted_routers": mounted,
    }


# ---------------------------------------------------------------------------
# Dev entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    # Logging was already configured at import time via setup_logging() above.
    # basicConfig would re-add a text handler and clobber the JSON handler, so
    # we only adjust the level here (uvicorn reads log_level separately).
    logging.getLogger().setLevel(logging.DEBUG if DEBUG else logging.INFO)
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=DEBUG,
        log_level="debug" if DEBUG else "info",
    )
