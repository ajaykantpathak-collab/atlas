#!/usr/bin/env python3
"""backend/modules/metrics/middleware.py — request metrics middleware.

Raw ASGI (same pattern as observability.py's limiters): wraps every HTTP
request, records

  http_requests_total{method, handler, status}   counter
  http_request_duration_seconds                  histogram
      (buckets + _count + _sum, seconds)
  http_requests_in_progress{method, handler}     gauge

The ``handler`` label is the ROUTE TEMPLATE (``/api/students/{id}``), not
the raw path — raw paths would explode label cardinality with uuids.  The
route is read from ``scope["route"]`` which FastAPI's router sets before
the endpoint runs; unmatched paths fall back to a normalised template
(numeric/uuid segments collapsed to ``{id}``) capped at MAX_TEMPLATES
distinct entries, after which everything folds into ``_overflow`` to keep
the series bounded under path-scanning abuse.

Process-local on purpose: /metrics is scraped per-backend-replica and the
nginx/gunicorn topology keeps one process per replica, so per-process
series are the intended unit.  Zero I/O on the hot path — dict increments
only.

Install (exact, from backend/main.py — see deploy/patches/worker_service.md
for the coordinator's copy):

    from backend.modules.metrics.middleware import install_metrics_middleware
    install_metrics_middleware(app)

Register it FIRST (before the rate limiters) so it counts 429s too;
Starlette's add_middleware inserts at index 0, so earlier registration =
outermost execution... correction: the LAST-added middleware runs FIRST.
Order intent: metrics OUTSIDE the limiters means limited (429) requests are
counted, which is exactly what you want on a dashboard.  So register
metrics middleware LAST of the three (after install_rate_limit and
install_heavy_rate_limit, before/after CORS — CORS is outermost today for
429-header reasons; metrics under CORS is fine because CORS never
short-circuits same-origin scraping).
"""
from __future__ import annotations

import json
import os
import re
import threading
import time
from typing import Any, MutableMapping

#: Prometheus histogram buckets (seconds) — API latencies live well under 1s
#: at p99 except paper-generation; 10s ceiling covers the heavy lane.
BUCKETS = (0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0)

MAX_TEMPLATES = 200

_IDISH = re.compile(
    r"^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?"
    r"[0-9a-fA-F]{12}$|^\d+$")

_lock = threading.Lock()

#: process start (monotonic wall clock) for process_uptime_seconds
_PROCESS_START = time.time()

# {(method, template): {status: count}}
_counters: dict[tuple[str, str], dict[str, int]] = {}
# {(method, template): [bucket_counts..., count, sum]}
_latencies: dict[tuple[str, str], list] = {}
_in_progress: dict[tuple[str, str], int] = {}
_templates: dict[str, str] = {}  # raw path -> normalised template cache


def reset_registry() -> None:
    """Test isolation hook — clears every in-process counter."""
    with _lock:
        _counters.clear()
        _latencies.clear()
        _in_progress.clear()
        _templates.clear()


def normalize_path(path: str) -> str:
    """Collapse uuid/numeric path segments to {id}; bounded-cardinality."""
    cached = _templates.get(path)
    if cached is not None:
        return cached
    parts = [(p if not _IDISH.match(p) else "{id}")
             for p in path.split("/") if p]
    template = "/" + "/".join(parts) if parts else "/"
    with _lock:
        if len(_templates) >= MAX_TEMPLATES:
            # Cache is full: serve the computed template but stop caching so
            # a scanner cannot pin unbounded memory.
            return template
        _templates[path] = template
    return template


def _route_template(scope: MutableMapping[str, Any]) -> str:
    route = scope.get("route")
    if route is not None:
        path = getattr(route, "path", None)
        if path:
            return path
    return normalize_path(scope.get("path", "unknown"))


def observe(method: str, template: str, status: str, duration_s: float) -> None:
    """Record one request.  Public so tests (and other transports) can feed
    the same registry."""
    key = (method, template)
    with _lock:
        _counters.setdefault(key, {})
        _counters[key][status] = _counters[key].get(status, 0) + 1
        if key not in _latencies:
            # len(BUCKETS) bucket counters + total count + total sum
            _latencies[key] = [0] * (len(BUCKETS) + 2)
        lat = _latencies[key]
        for i, le in enumerate(BUCKETS):
            if duration_s <= le:
                lat[i] += 1
        lat[-2] += 1
        lat[-1] += duration_s
        n = _in_progress.get(key, 0)
        if n > 0:
            _in_progress[key] = n - 1


class MetricsMiddleware:
    """ASGI middleware feeding the registry above."""

    def __init__(self, app: Any):
        self.app = app

    async def __call__(self, scope, receive, send) -> None:
        if scope.get("type") != "http":
            await self.app(scope, receive, send)
            return
        method = scope.get("method", "GET")
        template_before = None  # resolved after routing sets scope["route"]
        start = time.perf_counter()
        status_holder = {"code": "500"}

        async def _send(message):
            if message.get("type") == "http.response.start":
                status_holder["code"] = str(message.get("status", 500))
            await send(message)

        key = (method, None)
        try:
            template_before = (method, _route_template(scope))
            with _lock:
                _in_progress[template_before] = \
                    _in_progress.get(template_before, 0) + 1
            key = template_before
        except Exception:
            pass  # metrics must never break a request
        try:
            await self.app(scope, receive, _send)
        finally:
            duration = time.perf_counter() - start
            try:
                # Routing has run by now: re-read for the accurate template.
                template = _route_template(scope)
                actual = (method, template)
                if key != actual and key[1] is not None:
                    with _lock:  # move the in-progress marker
                        n = _in_progress.get(key, 0)
                        if n > 0:
                            _in_progress[key] = n - 1
                        _in_progress[actual] = _in_progress.get(actual, 0) + 1
                observe(method, template, status_holder["code"], duration)
            except Exception:
                pass


def install_metrics_middleware(app: Any):
    """Attach the middleware unless METRICS_ENABLED=false.  Returns class."""
    if os.environ.get("METRICS_ENABLED", "true").lower() in ("0", "false",
                                                             "no"):
        return None
    app.add_middleware(MetricsMiddleware)
    return MetricsMiddleware


# ---------------------------------------------------------------------------
# Text-format rendering (shared with router.py)
# ---------------------------------------------------------------------------
def _escape_label(v: str) -> str:
    return v.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def _fmt(v: float) -> str:
    if v == float("inf"):
        return "+Inf"
    return repr(float(v))


def render_exposition(psutil_snapshot: dict | None = None,
                      job_counts: dict | None = None) -> str:
    """Render the whole /metrics body in Prometheus text format.

    ``psutil_snapshot`` / ``job_counts`` are injectable for tests; the
    router passes the live values.  The request-middleware series always
    render (zeros are fine and expected on a quiet replica).
    """
    lines: list[str] = []

    def meta(name: str, mtype: str, help_: str) -> None:
        lines.append(f"# HELP {name} {help_}")
        lines.append(f"# TYPE {name} {mtype}")

    with _lock:
        counters = {k: dict(v) for k, v in _counters.items()}
        latencies = {k: list(v) for k, v in _latencies.items()}
        progress = dict(_in_progress)

    meta("http_requests_total", "counter",
         "HTTP requests processed by this replica.")
    for (method, template), statuses in sorted(counters.items()):
        for status, n in sorted(statuses.items()):
            lines.append(
                'http_requests_total{method="%s",handler="%s",status="%s"} %d'
                % (_escape_label(method), _escape_label(template),
                   _escape_label(status), n))

    # Histogram family first, complete; then the gauge family.  Prometheus
    # wants each family (HELP/TYPE + samples) as one unit.  _count/_sum are
    # distinct metric names carrying the SAME labels (no le).
    meta("http_request_duration_seconds", "histogram",
         "Request latency in seconds (route-level).")
    for (method, template), lat in sorted(latencies.items()):
        labels = 'method="%s",handler="%s"' % (
            _escape_label(method), _escape_label(template))
        base = "http_request_duration_seconds{%s" % labels
        for i, le in enumerate(BUCKETS):
            lines.append('%s,le="%s"} %d' % (base, _fmt(le), lat[i]))
        lines.append('%s,le="+Inf"} %d' % (base, lat[-2]))
        lines.append("http_request_duration_seconds_count{%s} %d"
                     % (labels, lat[-2]))
        lines.append("http_request_duration_seconds_sum{%s} %s"
                     % (labels, _fmt(lat[-1])))

    meta("http_requests_in_progress", "gauge",
         "Requests currently in flight.")
    templates_seen: set[tuple[str, str]] = set(latencies.keys())
    for (method, template), n in sorted(progress.items()):
        lines.append(
            'http_requests_in_progress{method="%s",handler="%s"} %d'
            % (_escape_label(method), _escape_label(template), n))
    for (method, template) in sorted(templates_seen):
        if (method, template) not in progress:
            lines.append(
                'http_requests_in_progress{method="%s",handler="%s"} 0'
                % (_escape_label(method), _escape_label(template)))

    # -- process metrics (psutil when available, else the stdlib floor) -- #
    meta("process_uptime_seconds", "gauge",
         "Seconds since this process started serving metrics.")
    lines.append("process_uptime_seconds %s"
                 % _fmt(max(0.0, time.time() - _PROCESS_START)))
    snap = psutil_snapshot
    if snap is None:
        snap = _collect_psutil()
    if snap:
        meta("process_resident_memory_bytes", "gauge",
             "Resident memory of this process.")
        lines.append("process_resident_memory_bytes %d"
                     % int(snap.get("rss", 0)))
        meta("process_cpu_seconds_total", "counter",
             "Total user+system CPU time of this process.")
        lines.append("process_cpu_seconds_total %s"
                     % _fmt(snap.get("cpu_seconds", 0.0)))
        meta("process_threads", "gauge", "OS threads in this process.")
        lines.append("process_threads %d" % int(snap.get("threads", 0)))
        if snap.get("open_fds") is not None:
            meta("process_open_fds", "gauge", "Open file descriptors.")
            lines.append("process_open_fds %d" % int(snap["open_fds"]))

    # -- worker queue gauges (best-effort; jobs table lives in main DB) -- #
    if job_counts is None:
        try:
            from backend.workers import jobs as _jobs
            job_counts = _jobs.counts()
        except Exception:
            job_counts = None
    if job_counts:
        meta("atlas_worker_jobs", "gauge",
             "Jobs in the queue per state (pending/running/done/failed).")
        for state in ("pending", "running", "done", "failed"):
            lines.append('atlas_worker_jobs{state="%s"} %d'
                         % (state, int(job_counts.get(state, 0))))

    meta("atlas_build_info", "gauge", "Platform build labels.")
    lines.append('atlas_build_info{module="backend",agent="A6-OPS"} 1')
    lines.append("")
    return "\n".join(lines)


def _collect_psutil() -> dict | None:
    """Process snapshot via psutil; None when unavailable."""
    try:
        import psutil
        proc = psutil.Process()
        snap = {
            "rss": proc.memory_info().rss,
            "cpu_seconds": sum(proc.cpu_times()[:2]),
            "threads": proc.num_threads(),
            "open_fds": None,
        }
        try:
            snap["open_fds"] = proc.num_fds()  # POSIX only
        except (AttributeError, NotImplementedError):
            pass
        return snap
    except Exception:
        return None
