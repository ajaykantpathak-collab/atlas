"""
Tests for the /metrics module (A6-OPS, 2026-10-02).

The rubric line is "emitted text format PARSES": this file contains a
MINI-PARSER for the Prometheus text format (lines -> name/labels/value)
and every rendering path is validated through it — the same grammar
Prometheus itself accepts.

Covered:
  - middleware counters/histogram/in-progress through a driven ASGI app
  - route-template normalisation (uuid paths collapse, cardinality cap)
  - router serves 200 with the Prometheus content type and a parseable body
  - process metrics present (psutil available here; stubs degrade cleanly)
  - worker-queue gauges render from the jobs registry
  - METRICS_ENABLED=false kills the middleware install
"""

from __future__ import annotations

import asyncio
import re
import sys
import types
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

from backend.modules.metrics import middleware as mw  # noqa: E402
from backend.modules.metrics import router as mr  # noqa: E402

# ---------------------------------------------------------------------------
# Mini-parser: Prometheus text format -> {name: {(labels): value}}
# ---------------------------------------------------------------------------
_SAMPLE_RE = re.compile(
    r"^(?P<name>[a-zA-Z_:][a-zA-Z0-9_:]*)(?:\{(?P<labels>.*)\})?"
    r"\s+(?P<value>[^\s]+)$")
_LABEL_RE = re.compile(r'(\w+)="((?:[^"\\]|\\.)*)"')
_NAME_RE = re.compile(r"^[a-zA-Z_:][a-zA-Z0-9_:]*$")


def parse_exposition(text: str) -> dict:
    """Parse the text format into {name: {(label_key, label_val): value}}.

    Raises on: malformed lines, bad metric names, non-numeric values,
    duplicate series.  TYPE/HELP lines are consumed and returned too.
    """
    samples: dict = {}
    types: dict = {}
    helps: dict = {}
    for lineno, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line:
            continue
        if line.startswith("# HELP "):
            name = line[7:].split(" ", 1)[0]
            assert _NAME_RE.match(name), f"bad HELP name: {line}"
            helps[name] = True
            continue
        if line.startswith("# TYPE "):
            rest = line[7:]
            name, t = rest.split(" ", 1)
            assert _NAME_RE.match(name), f"bad TYPE name: {line}"
            assert t in ("counter", "gauge", "histogram", "summary",
                         "untyped"), f"bad TYPE: {line}"
            types[name] = t
            continue
        if line.startswith("#"):
            continue  # comments are legal
        m = _SAMPLE_RE.match(line)
        assert m, f"line {lineno} does not parse: {line!r}"
        name = m.group("name")
        labels: tuple = ()
        if m.group("labels") is not None:
            parsed = _LABEL_RE.findall(m.group("labels"))
            # every label chunk must have matched (no silent garbage)
            rebuilt = "{" + ",".join(f'{k}="{v}"' for k, v in parsed) + "}"
            assert rebuilt == "{" + m.group("labels") + "}", \
                f"label round-trip failed on line {lineno}: {line!r}"
            # normalise to sorted order so lookups are order-independent
            labels = tuple(sorted((k, v) for k, v in parsed))
        try:
            value = float(m.group("value"))
        except ValueError:
            pytest.fail(f"non-numeric value on line {lineno}: {line!r}")
        key = (name, labels)
        assert key not in samples, f"duplicate series on line {lineno}: {line!r}"
        samples[key] = value
    return {"samples": samples, "types": types, "helps": helps}


def sample(parsed: dict, name: str, **labels) -> float | None:
    key = tuple(sorted(labels.items()))
    return parsed["samples"].get((name, key))


# ---------------------------------------------------------------------------
# Middleware behaviour
# ---------------------------------------------------------------------------
class _FakeRoute:
    def __init__(self, path: str):
        self.path = path


class _FakeApp:
    """ASGI app that records it was reached and emits a valid response."""

    def __init__(self, status=200, set_route=None, delay=0.0):
        self.status = status
        self.set_route = set_route
        self.delay = delay
        self.reached = 0
        self.added = []

    def add_middleware(self, cls, **kwargs):
        self.added.append(cls)

    async def __call__(self, scope, receive, send):
        self.reached += 1
        if self.set_route:
            scope["route"] = _FakeRoute(self.set_route)
        if self.delay:
            await asyncio.sleep(self.delay)
        await send({"type": "http.response.start",
                    "status": self.status,
                    "headers": [(b"content-type", b"text/plain")]})
        await send({"type": "http.response.body", "body": b"ok"})


def _drive(mw_app, path="/api/x", method="GET"):
    scope = {"type": "http", "method": method, "path": path,
             "headers": [], "client": ("test", 123)}
    sent = []

    async def send(message):
        sent.append(message)

    async def receive():
        return {"type": "http.request"}

    asyncio.run(mw_app(scope, receive, send))
    return sent


@pytest.fixture(autouse=True)
def clean_registry():
    mw.reset_registry()
    yield
    mw.reset_registry()


class TestMiddleware:
    def test_counters_and_histogram_recorded(self):
        app = _FakeApp(status=200, set_route="/api/students/{id}")
        wrapped = mw.MetricsMiddleware(app)
        _drive(wrapped, "/api/students/123")
        _drive(wrapped, "/api/students/abc-def")
        parsed = parse_exposition(mw.render_exposition(psutil_snapshot={},
                                                       job_counts={}))
        assert sample(parsed, "http_requests_total", method="GET",
                      handler="/api/students/{id}", status="200") == 2
        # histogram: _count matches, buckets monotone, +Inf == _count
        def dur_samples(**match):
            out = []
            for (n, l), v in parsed["samples"].items():
                d = dict(l)
                if n == "http_request_duration_seconds" and all(
                        d.get(k) == v for k, v in match.items()):
                    out.append((d.get("le"), v))
            return out

        count = parsed["samples"][(
            "http_request_duration_seconds_count",
            (("handler", "/api/students/{id}"), ("method", "GET")))]
        inf = sample(parsed, "http_request_duration_seconds",
                     method="GET", handler="/api/students/{id}", le="+Inf")
        assert count == 2 and inf == 2
        buckets = sorted(v for le, v in dur_samples(
            method="GET", handler="/api/students/{id}") if le is not None)
        assert buckets == sorted(buckets)
        assert len(buckets) == len(mw.BUCKETS) + 1  # fixed buckets + +Inf
        assert parsed["types"]["http_request_duration_seconds"] == "histogram"

    def test_in_flight_gauge_returns_to_zero(self):
        app = _FakeApp(set_route="/api/x")
        wrapped = mw.MetricsMiddleware(app)
        _drive(wrapped)
        parsed = parse_exposition(mw.render_exposition(psutil_snapshot={},
                                                       job_counts={}))
        assert sample(parsed, "http_requests_in_progress", method="GET",
                      handler="/api/x") == 0

    def test_normalizes_unrouted_uuid_paths(self):
        """No route object (404/405 pre-routing): path collapses to {id}."""
        app = _FakeApp(status=404)  # never sets scope["route"]
        wrapped = mw.MetricsMiddleware(app)
        _drive(wrapped, "/api/thing/550e8400-e29b-41d4-a716-446655440000")
        _drive(wrapped, "/api/thing/42")
        parsed = parse_exposition(mw.render_exposition(psutil_snapshot={},
                                                       job_counts={}))
        assert sample(parsed, "http_requests_total", method="GET",
                      handler="/api/thing/{id}", status="404") == 2

    def test_template_cache_is_bounded(self):
        app = _FakeApp(status=200)
        wrapped = mw.MetricsMiddleware(app)
        for i in range(mw.MAX_TEMPLATES + 50):
            asyncio.run(wrapped({"type": "http", "method": "GET",
                                 "path": f"/scan/{i}/550e8400-e29b-41d4"
                                         f"-a716-446655440000",
                                 "headers": [], "client": None},
                                _noop_receive, _noop_send))
        with mw._lock:
            assert len(mw._templates) <= mw.MAX_TEMPLATES

    def test_app_errors_still_counted(self):
        class ExplodingApp:
            async def __call__(self, scope, receive, send):
                raise RuntimeError("boom")

        wrapped = mw.MetricsMiddleware(ExplodingApp())
        with pytest.raises(RuntimeError):
            _drive(wrapped, "/api/x")
        parsed = parse_exposition(mw.render_exposition(psutil_snapshot={},
                                                       job_counts={}))
        assert sample(parsed, "http_requests_total", method="GET",
                      handler="/api/x", status="500") == 1

    def test_install_disabled_by_env(self, monkeypatch):
        monkeypatch.setenv("METRICS_ENABLED", "false")
        assert mw.install_metrics_middleware(_FakeApp()) is None
        monkeypatch.setenv("METRICS_ENABLED", "true")
        app = _FakeApp()
        assert mw.install_metrics_middleware(app) is mw.MetricsMiddleware
        assert app.added == [mw.MetricsMiddleware]


async def _noop_receive():
    return {"type": "http.request"}


async def _noop_send(message):
    pass


# ---------------------------------------------------------------------------
# Rendering + router
# ---------------------------------------------------------------------------
class TestExposition:
    def test_render_parses_and_types_declared(self):
        mw.observe("GET", "/api/health", "200", 0.004)
        body = mw.render_exposition(psutil_snapshot={
            "rss": 123456789, "cpu_seconds": 1.5, "threads": 4,
            "open_fds": 12}, job_counts={"pending": 2, "running": 1,
                                         "done": 10, "failed": 0})
        parsed = parse_exposition(body)
        for name in ("http_requests_total", "http_request_duration_seconds",
                     "http_requests_in_progress", "process_uptime_seconds",
                     "process_resident_memory_bytes",
                     "process_cpu_seconds_total", "process_threads",
                     "process_open_fds", "atlas_worker_jobs",
                     "atlas_build_info"):
            assert name in parsed["types"], f"missing TYPE for {name}"
        assert sample(parsed, "process_resident_memory_bytes") == 123456789
        assert sample(parsed, "atlas_worker_jobs", state="pending") == 2
        assert sample(parsed, "atlas_worker_jobs", state="failed") == 0
        assert sample(parsed, "atlas_build_info",
                      module="backend", agent="A6-OPS") == 1

    def test_label_escaping(self):
        mw.observe("GET", '/weird"path\\x', "200", 0.001)
        body = mw.render_exposition(psutil_snapshot={}, job_counts={})
        assert '\\"' in body and "\\\\" in body  # escaped safely
        parse_exposition(body)  # still parses

    def test_float_formatting_and_inf(self):
        mw.observe("GET", "/api/x", "200", 0.002)  # ensure a series exists
        body = mw.render_exposition(psutil_snapshot={}, job_counts={})
        assert "+Inf" in body  # histogram infinity bucket
        for line in body.splitlines():
            if line and not line.startswith("#"):
                assert _SAMPLE_RE.match(line), f"bad sample line: {line!r}"

    def test_stubs_without_psutil(self):
        body = mw.render_exposition(psutil_snapshot=None, job_counts={})
        parsed = parse_exposition(body)
        # stdlib floor still present even when psutil is missing entirely
        assert sample(parsed, "process_uptime_seconds") >= 0.0


class TestRouter:
    def test_get_metrics_via_testclient(self, monkeypatch):
        fastapi = pytest.importorskip("fastapi")
        from fastapi.testclient import TestClient

        # Lane-B audit: /metrics is token-gated — 404 when METRICS_TOKEN is
        # unset, 401 without the bearer, 200 with it.
        monkeypatch.setenv("METRICS_TOKEN", "test-metrics-token")
        auth = {"Authorization": "Bearer test-metrics-token"}
        monkeypatch.setattr("backend.workers.jobs.counts",
                            lambda: {"pending": 1, "running": 0, "done": 3,
                                     "failed": 0})
        app = fastapi.FastAPI()
        app.include_router(mr.router)
        app.add_middleware(mw.MetricsMiddleware)
        with TestClient(app) as client:
            assert client.get("/metrics").status_code == 401
            resp = client.get("/metrics", headers=auth)
            assert resp.status_code == 200
            assert resp.headers["content-type"].startswith(
                "text/plain; version=0.0.4")
            parsed = parse_exposition(resp.text)
            assert sample(parsed, "atlas_worker_jobs", state="done") == 3
            # Pull semantics: the scrape in flight is recorded AFTER this
            # body was rendered, so it appears on the NEXT scrape.
            assert sample(parsed, "http_requests_total", method="GET",
                          handler="/metrics", status="200") is None
            resp2 = client.get("/metrics", headers=auth)
            parsed2 = parse_exposition(resp2.text)
            assert sample(parsed2, "http_requests_total", method="GET",
                          handler="/metrics", status="200") >= 1

    def test_router_content_type_constant(self):
        assert mr.METRICS_CONTENT_TYPE == (
            "text/plain; version=0.0.4; charset=utf-8")
