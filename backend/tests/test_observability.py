"""
Behavioural tests for backend/observability.py (ATLAS_10x10_PLAN.md §3).

These drive the middleware and formatter for real rather than asserting on
source text, so a rewrite that breaks the 429 path fails here.

`observability` is loaded by path for the same reason as `streak_state`: the
`backend` package `__init__` chain pulls in scipy and can take the interpreter
down before collection on this box (see pytest.ini).
"""

from __future__ import annotations

import asyncio
import importlib.util
import json
import logging
import pathlib
import sys

_BACKEND = pathlib.Path(__file__).resolve().parent.parent

_spec = importlib.util.spec_from_file_location(
    "_observability_under_test", _BACKEND / "observability.py"
)
assert _spec is not None and _spec.loader is not None
obs = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(obs)


# ---------------------------------------------------------------------------
# JSON logging
# ---------------------------------------------------------------------------
class TestJsonLogFormatter:
    def _record(self, msg="hello", level=logging.INFO, **extra):
        rec = logging.LogRecord("t", level, __file__, 1, msg, (), None)
        for k, v in extra.items():
            setattr(rec, k, v)
        return rec

    def test_emits_one_valid_json_object(self):
        payload = json.loads(obs.JsonLogFormatter().format(self._record("boot ok")))
        assert payload["msg"] == "boot ok"
        assert payload["level"] == "INFO"
        assert payload["logger"] == "t"
        assert payload["ts"].endswith("Z")

    def test_preserves_structured_context(self):
        """student_id etc. must survive, not be flattened into the message."""
        payload = json.loads(
            obs.JsonLogFormatter().format(
                self._record("served", student_id="stu-1", duration_ms=12)
            )
        )
        assert payload["student_id"] == "stu-1"
        assert payload["duration_ms"] == 12

    def test_non_serialisable_extra_does_not_raise(self):
        json.loads(obs.JsonLogFormatter().format(self._record("x", ctx=object())))

    def test_includes_traceback(self):
        try:
            raise ValueError("boom")
        except ValueError:
            rec = logging.LogRecord(
                "t", logging.ERROR, __file__, 1, "failed", (), sys.exc_info()
            )
        assert "ValueError" in json.loads(obs.JsonLogFormatter().format(rec))["exc"]


# ---------------------------------------------------------------------------
# Rate limiting
# ---------------------------------------------------------------------------
class _FakeApp:
    """Minimal ASGI app that records whether it was reached."""

    def __init__(self):
        self.calls = 0

    async def __call__(self, scope, receive, send):
        self.calls += 1
        await send({"type": "http.response.start", "status": 200, "headers": []})
        await send({"type": "http.response.body", "body": b"ok"})


def _scope(path="/api/practice", client=("1.2.3.4", 5555)):
    return {
        "type": "http",
        "method": "GET",
        "path": path,
        "headers": [],
        "client": client,
    }


def _call(middleware, scope):
    sent = []

    async def send(message):
        sent.append(message)

    asyncio.run(middleware(scope, None, send))
    return sent


class TestRateLimitMiddleware:
    def test_allows_up_to_burst_then_returns_429(self):
        app = _FakeApp()
        mw = obs.RateLimitMiddleware(app, rps=5, burst=5)
        for _ in range(5):
            assert _call(mw, _scope())[0]["status"] == 200
        assert _call(mw, _scope())[0]["status"] == 429
        assert app.calls == 5  # the 6th never reached the app

    def test_429_body_is_json_with_retry_after(self):
        mw = obs.RateLimitMiddleware(_FakeApp(), rps=1, burst=1)
        _call(mw, _scope())
        headers = dict(_call(mw, _scope())[0]["headers"])
        assert headers[b"retry-after"] == b"1"
        body = _call(mw, _scope())[1]["body"]
        assert json.loads(body)["detail"] == "Rate limit exceeded"

    def test_health_probe_is_never_limited(self):
        """A 429 on /health looks like a dead service to Docker."""
        app = _FakeApp()
        mw = obs.RateLimitMiddleware(app, rps=1, burst=1)
        for path in ("/health", "/api/health", "/docs", "/openapi.json"):
            for _ in range(5):
                assert _call(mw, _scope(path=path))[0]["status"] == 200
        assert app.calls == 20

    def test_preflight_is_never_limited(self):
        mw = obs.RateLimitMiddleware(_FakeApp(), rps=1, burst=1)
        scope = _scope()
        scope["method"] = "OPTIONS"
        for _ in range(5):
            assert _call(mw, scope)[0]["status"] == 200

    def test_clients_are_limited_independently(self):
        app = _FakeApp()
        mw = obs.RateLimitMiddleware(app, rps=1, burst=1)
        _call(mw, _scope(client=("1.1.1.1", 1)))
        assert _call(mw, _scope(client=("1.1.1.1", 1)))[0]["status"] == 429
        assert _call(mw, _scope(client=("2.2.2.2", 1)))[0]["status"] == 200

    def test_window_resets_after_a_second(self):
        mw = obs.RateLimitMiddleware(_FakeApp(), rps=1, burst=1)
        _call(mw, _scope())
        assert _call(mw, _scope())[0]["status"] == 429
        # Age the recorded hits instead of sleeping a real second.
        mw._hits["1.2.3.4"] = [h - 2.0 for h in mw._hits["1.2.3.4"]]
        assert _call(mw, _scope())[0]["status"] == 200

    def test_websocket_scope_passes_through(self):
        app = _FakeApp()
        mw = obs.RateLimitMiddleware(app, rps=1, burst=1)

        async def send(_message):
            return None

        asyncio.run(mw({"type": "websocket"}, None, send))
        assert app.calls == 1

    def test_burst_is_never_below_rps(self):
        mw = obs.RateLimitMiddleware(_FakeApp(), rps=50, burst=1)
        assert mw.burst >= mw.rps


class _App:
    """Stands in for FastAPI to capture add_middleware calls."""

    def __init__(self):
        self.mw = []

    def add_middleware(self, cls, **kw):
        self.mw.append((cls, kw))


class TestInstallRateLimit:
    def test_disabled_by_env(self, monkeypatch):
        monkeypatch.setenv("RATE_LIMIT_ENABLED", "false")
        assert obs.install_rate_limit(_App()) is None

    def test_enabled_by_default_at_50rps(self, monkeypatch):
        monkeypatch.delenv("RATE_LIMIT_ENABLED", raising=False)
        app = _App()
        assert obs.install_rate_limit(app) is obs.RateLimitMiddleware
        assert app.mw[0][0] is obs.RateLimitMiddleware
        assert app.mw[0][1]["rps"] == obs.DEFAULT_RPS == 50

    def test_bad_env_falls_back_to_defaults(self, monkeypatch):
        monkeypatch.delenv("RATE_LIMIT_ENABLED", raising=False)
        monkeypatch.setenv("RATE_LIMIT_RPS", "not-a-number")
        app = _App()
        obs.install_rate_limit(app)
        assert app.mw[0][1]["rps"] == obs.DEFAULT_RPS


class TestSentryOptIn:
    def test_no_dsn_is_a_noop(self, monkeypatch):
        monkeypatch.delenv("SENTRY_DSN", raising=False)
        assert obs.init_sentry(_App()) is False

    def test_blank_dsn_is_a_noop(self, monkeypatch):
        monkeypatch.setenv("SENTRY_DSN", "   ")
        assert obs.init_sentry(_App()) is False


class TestSetupLogging:
    def test_replaces_handlers_and_sets_level(self, monkeypatch):
        monkeypatch.setenv("LOG_LEVEL", "DEBUG")
        root = logging.getLogger()
        before = list(root.handlers)
        try:
            obs.setup_logging()
            assert root.level == logging.DEBUG
            assert root.handlers and root.handlers[0] is not before[-1:][0]
        finally:
            for h in list(root.handlers):
                root.removeHandler(h)
            for h in before:
                root.addHandler(h)

    def test_uvicorn_handlers_are_cleared(self, monkeypatch):
        monkeypatch.setenv("LOG_LEVEL", "INFO")
        logging.getLogger("uvicorn.access").handlers = [logging.NullHandler()]
        root = logging.getLogger()
        before = list(root.handlers)
        try:
            obs.setup_logging()
            assert logging.getLogger("uvicorn.access").handlers == []
        finally:
            for h in list(root.handlers):
                root.removeHandler(h)
            for h in before:
                root.addHandler(h)
