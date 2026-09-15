"""Prometheus metrics for the K-12 learning platform.

Exposes counters and histograms for:
  - HTTP requests (count, latency, status code)
  - Solver invocations (backend used, cache hit/miss, duration, success)
  - Circuit breaker state
  - Process pool state
  - Intelligence persistence events

Usage:
    from backend.services.metrics import (
        REQUEST_COUNT, REQUEST_LATENCY, SOLVER_REQUESTS,
        SOLVER_DURATION, CACHE_HITS, CIRCUIT_BREAKER_STATE,
        record_solver_call,
    )
"""

from __future__ import annotations

from prometheus_client import (
    Counter,
    Histogram,
    Gauge,
    Info,
    generate_latest,
    CONTENT_TYPE_LATEST,
)

# ═══════════════════════════════════════════════════════════════════
# HTTP metrics
# ═══════════════════════════════════════════════════════════════════

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP requests",
    ["method", "endpoint", "status"],
)

REQUEST_LATENCY = Histogram(
    "http_request_duration_seconds",
    "HTTP request latency in seconds",
    ["method", "endpoint"],
    buckets=(0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0),
)

REQUEST_IN_PROGRESS = Gauge(
    "http_requests_in_progress",
    "Number of HTTP requests currently in progress",
)

# ═══════════════════════════════════════════════════════════════════
# Solver metrics
# ═══════════════════════════════════════════════════════════════════

SOLVER_REQUESTS = Counter(
    "solver_requests_total",
    "Total solver invocations",
    ["endpoint", "backend_used", "cache_hit", "success"],
)

SOLVER_DURATION = Histogram(
    "solver_duration_seconds",
    "Solver execution duration in seconds",
    ["endpoint", "backend_used"],
    buckets=(0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0),
)

SOLVE_TIMEOUTS = Counter(
    "solver_timeouts_total",
    "Total solver timeouts",
    ["endpoint", "backend_used"],
)

# ═══════════════════════════════════════════════════════════════════
# Cache metrics
# ═══════════════════════════════════════════════════════════════════

CACHE_HITS = Counter(
    "cache_hits_total",
    "Total cache hits",
    ["layer"],  # memory, redis, disk
)

CACHE_MISSES = Counter(
    "cache_misses_total",
    "Total cache misses",
)

# ═══════════════════════════════════════════════════════════════════
# Circuit breaker metrics
# ═══════════════════════════════════════════════════════════════════

CIRCUIT_BREAKER_STATE = Gauge(
    "circuit_breaker_state",
    "Circuit breaker state (0=closed, 1=open, 2=half-open)",
    ["backend"],
)

CIRCUIT_BREAKER_FALLBACKS = Counter(
    "circuit_breaker_fallbacks_total",
    "Total circuit breaker fallbacks",
    ["backend"],
)

# ═══════════════════════════════════════════════════════════════════
# Process pool metrics
# ═══════════════════════════════════════════════════════════════════

POOL_SIZE = Gauge(
    "process_pool_size",
    "Current process pool worker count",
)

POOL_ACTIVE = Gauge(
    "process_pool_active_workers",
    "Active process pool workers",
)

POOL_QUEUED = Gauge(
    "process_pool_queued_tasks",
    "Queued tasks in the process pool",
)

# ═══════════════════════════════════════════════════════════════════
# Intelligence persistence metrics
# ═══════════════════════════════════════════════════════════════════

INTEL_EVENTS_PERSISTED = Counter(
    "intelligence_events_persisted_total",
    "Total intelligence events persisted to DB",
    ["event_type"],  # student_answer, hint_request, misconception
)

INTEL_PERSIST_ERRORS = Counter(
    "intelligence_persist_errors_total",
    "Total intelligence persistence errors",
)

INTEL_REPLAY_EVENTS = Gauge(
    "intelligence_replay_events",
    "Events replayed on startup",
)

# ═══════════════════════════════════════════════════════════════════
# App info
# ═══════════════════════════════════════════════════════════════════

APP_INFO = Info(
    "k12_platform",
    "K-12 Learning Platform application info",
)

# ═══════════════════════════════════════════════════════════════════
# Helpers
# ═══════════════════════════════════════════════════════════════════

def record_solver_call(
    endpoint: str,
    backend_used: str,
    cache_hit: bool,
    success: bool,
    duration_s: float,
) -> None:
    """Record a single solver call across all relevant metrics."""
    SOLVER_REQUESTS.labels(
        endpoint=endpoint,
        backend_used=backend_used or "unknown",
        cache_hit=str(cache_hit),
        success=str(success),
    ).inc()
    SOLVER_DURATION.labels(
        endpoint=endpoint,
        backend_used=backend_used or "unknown",
    ).observe(duration_s)


def metrics_response():
    """Return a Response with Prometheus-format metrics."""
    from fastapi import Response
    return Response(
        content=generate_latest(),
        media_type=CONTENT_TYPE_LATEST,
    )
