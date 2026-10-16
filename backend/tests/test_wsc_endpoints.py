# -*- coding: utf-8 -*-
"""tests/test_wsc_endpoints.py — WS-C step 1: tutor endpoint characterization.

Pins the tutor-route contract BEFORE any consolidation refactor:

  * the exact route inventory of the three mounted tutor routers
    (routers/tutor.py, api/tutor.py, api/competency_tutor.py — 26 routes);
  * the auth wiring of every route (which take get_current_user, which
    carry the optional bearer reader, which are anonymous);
  * the reachable behavior of each serving path via an in-process
    FastAPI TestClient on a mini app that mounts ONLY these three
    routers (no backend.main boot, no server, no Docker).

This file characterizes the CONTRACT (paths, methods, auth, response
shapes), not internal lane choices — so it stays green across the
consolidation.  Lane-level behavior flips (v3 serving, mastery
write-back) are proven in tests/test_wsc_pipeline.py.
"""

from __future__ import annotations

import os
import sys


def _ensure_database_url() -> None:
    """DATABASE_URL before backend.database import (native pytest env).

    deploy/.env carries only POSTGRES_PASSWORD; the async engine-create
    inside backend/database needs the full URL.  Same bootstrap the other
    DB-touching suites use (tests/_db_url.py).
    """
    if os.environ.get("DATABASE_URL"):
        return
    try:
        pw_lines = [
            line.strip().split("=", 1)[1]
            for line in open(r"D:\platform\deploy\.env", encoding="utf-8")
            if line.startswith("POSTGRES_PASSWORD=")
        ]
        if pw_lines:
            os.environ["DATABASE_URL"] = (
                "postgresql+asyncpg://dream_user:"
                f"{pw_lines[0]}@127.0.0.1:5432/dream_app"
            )
    except OSError:
        pass


_ensure_database_url()

import asyncio  # noqa: E402
import inspect  # noqa: E402

import pytest  # noqa: E402
from fastapi import FastAPI  # noqa: E402
from fastapi.params import Depends as _DependsClass  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from backend.api import competency_tutor  # noqa: E402
from backend.api import tutor as its_tutor  # noqa: E402
from backend.routers import tutor as routers_tutor  # noqa: E402

# synthetic student ids: never UUIDs, can never collide with real accounts
SID = "wsc-char-guest"


# --------------------------------------------------------------------------- #
# mini app: exactly the three tutor routers, nothing else
# --------------------------------------------------------------------------- #
@pytest.fixture(scope="module")
def app() -> FastAPI:
    _app = FastAPI()
    _app.include_router(routers_tutor.router)
    _app.include_router(competency_tutor.router)
    _app.include_router(its_tutor.router)
    return _app


@pytest.fixture(scope="module")
def client(app: FastAPI) -> TestClient:
    return TestClient(app)


def _route_table(router) -> set:
    out = set()
    for r in router.routes:
        methods = getattr(r, "methods", None) or set()
        methods = set(methods) - {"HEAD"}
        if not methods:
            out.add(("WS", r.path))
        else:
            for m in methods:
                out.add((m, r.path))
    return out


def _dep_names(func) -> list:
    found = []
    for param in inspect.signature(func).parameters.values():
        if isinstance(param.default, _DependsClass):
            dep = param.default.dependency
            found.append(getattr(dep, "__name__", repr(dep)))
    return found


def _endpoint(router, method: str, path: str):
    for r in router.routes:
        r_methods = getattr(r, "methods", None) or set()
        if method in r_methods and r.path == path:
            return r.endpoint
    raise AssertionError(f"route {method} {path} not found on router")


# --------------------------------------------------------------------------- #
# 1. Route inventory — the exact mounted surface
# --------------------------------------------------------------------------- #
ROUTERS_TUTOR_ROUTES = {
    ("POST", "/api/tutor/sessions"),
    ("POST", "/api/tutor/sessions/{session_id}/reply"),
    ("GET", "/api/tutor/sessions/{session_id}"),
    ("GET", "/api/tutor/sessions"),
    ("POST", "/api/tutor/sessions/{session_id}/end"),
    ("POST", "/api/tutor/sessions/{session_id}/hint"),
    ("GET", "/api/tutor/sessions/{session_id}/export"),
    ("POST", "/api/tutor/ask"),
    ("POST", "/api/tutor/ask-stream"),
    ("POST", "/api/tutor/hint"),
    ("POST", "/api/tutor/explain-step"),
}

ITS_TUTOR_ROUTES = {
    ("GET", "/api/tutor/its/health"),
    ("POST", "/api/tutor/its/route"),
    ("POST", "/api/tutor/its/quick-question"),
    ("POST", "/api/tutor/its/reply"),
    ("POST", "/api/tutor/its/start"),
    ("POST", "/api/tutor/its/input"),
    ("WS", "/api/tutor/its/ws"),
}

TUTOR_GRAPH_ROUTES = {
    ("GET", "/api/tutor-graph/stats"),
    ("GET", "/api/tutor-graph/teach"),
    ("GET", "/api/tutor-graph/serve"),
    ("POST", "/api/tutor-graph/submit"),
    ("GET", "/api/tutor-graph/hint"),
    ("GET", "/api/tutor-graph/progress"),
    ("POST", "/api/tutor-graph/ask"),
    ("GET", "/api/tutor-graph/path"),
}


class TestRouteInventory:
    def test_routers_tutor_routes(self):
        table = _route_table(routers_tutor.router)
        assert table == ROUTERS_TUTOR_ROUTES, (
            f"routers/tutor.py route set changed: +{table - ROUTERS_TUTOR_ROUTES} "
            f"-{ROUTERS_TUTOR_ROUTES - table}")

    def test_its_tutor_routes(self):
        table = _route_table(its_tutor.router)
        assert table == ITS_TUTOR_ROUTES, (
            f"api/tutor.py route set changed: +{table - ITS_TUTOR_ROUTES} "
            f"-{ITS_TUTOR_ROUTES - table}")

    def test_tutor_graph_routes(self):
        table = _route_table(competency_tutor.router)
        assert table == TUTOR_GRAPH_ROUTES, (
            f"api/competency_tutor.py route set changed: "
            f"+{table - TUTOR_GRAPH_ROUTES} -{TUTOR_GRAPH_ROUTES - table}")

    def test_prefixes_unchanged(self):
        assert routers_tutor.router.prefix == "/api/tutor"
        assert its_tutor.router.prefix == "/api/tutor/its"
        assert competency_tutor.router.prefix == "/api/tutor-graph"

    def test_total_mounted_tutor_routes(self):
        assert (len(ROUTERS_TUTOR_ROUTES) + len(ITS_TUTOR_ROUTES)
                + len(TUTOR_GRAPH_ROUTES)) == 26


# --------------------------------------------------------------------------- #
# 2. Auth wiring — which routes demand identity
# --------------------------------------------------------------------------- #
class TestAuthWiring:
    def test_session_routes_require_get_current_user(self):
        for method, path in [
            ("POST", "/api/tutor/sessions"),
            ("POST", "/api/tutor/sessions/{session_id}/reply"),
            ("GET", "/api/tutor/sessions/{session_id}"),
            ("GET", "/api/tutor/sessions"),
            ("POST", "/api/tutor/sessions/{session_id}/end"),
            ("POST", "/api/tutor/sessions/{session_id}/hint"),
            ("GET", "/api/tutor/sessions/{session_id}/export"),
        ]:
            deps = _dep_names(_endpoint(routers_tutor.router, method, path))
            assert "get_current_user" in deps, (method, path, deps)

    def test_public_ask_routes_are_anonymous(self):
        for method, path in [
            ("POST", "/api/tutor/ask"),
            ("POST", "/api/tutor/ask-stream"),
            ("POST", "/api/tutor/hint"),
            ("POST", "/api/tutor/explain-step"),
        ]:
            deps = _dep_names(_endpoint(routers_tutor.router, method, path))
            assert "get_current_user" not in deps, (method, path, deps)

    def test_tutor_graph_state_routes_have_bearer_reader(self):
        for method, path in [
            ("GET", "/api/tutor-graph/serve"),
            ("POST", "/api/tutor-graph/submit"),
            ("GET", "/api/tutor-graph/hint"),
            ("GET", "/api/tutor-graph/path"),
        ]:
            func = _endpoint(competency_tutor.router, method, path)
            params = inspect.signature(func).parameters
            assert "credentials" in params, (method, path)
            assert isinstance(params["credentials"].default, _DependsClass), (
                method, path)

    def test_tutor_graph_progress_requires_auth(self):
        """Lane-B audit (2026-10-15): /progress served a guest payload to
        anonymous callers — a personal mastery record must require a token,
        so it now depends on get_current_user (401 when absent)."""
        func = _endpoint(competency_tutor.router, "GET",
                         "/api/tutor-graph/progress")
        assert "get_current_user" in _dep_names(func)

    def test_tutor_graph_readonly_routes_are_anonymous(self):
        for method, path in [("GET", "/api/tutor-graph/stats"),
                             ("GET", "/api/tutor-graph/teach"),
                             ("POST", "/api/tutor-graph/ask")]:
            func = _endpoint(competency_tutor.router, method, path)
            params = inspect.signature(func).parameters
            assert "credentials" not in params, (method, path)

    def test_its_routes_are_anonymous(self):
        from fastapi.security import HTTPBearer
        for method, path in ITS_TUTOR_ROUTES - {("WS", "/api/tutor/its/ws")}:
            func = _endpoint(its_tutor.router, method, path)
            for param in inspect.signature(func).parameters.values():
                dep = param.default
                if not isinstance(dep, _DependsClass):
                    continue
                # WS-C §3: an optional HTTPBearer(auto_error=False)
                # reads a token when presented but NEVER rejects
                # anonymous callers — the route stays anonymous.
                assert (isinstance(dep.dependency, HTTPBearer)
                        and dep.dependency.auto_error is False), (
                    method, path)


# --------------------------------------------------------------------------- #
# 3. Reachable behavior — in-process TestClient probes
# --------------------------------------------------------------------------- #
class TestItsSurface:
    def test_health(self, client):
        r = client.get("/api/tutor/its/health")
        assert r.status_code == 200
        assert r.json() == {"status": "ok", "service": "tutor-its"}

    def test_reply_unknown_session_without_node_404(self, client):
        r = client.post("/api/tutor/its/reply",
                        json={"sessionId": "wsc-nope", "message": "hello"})
        assert r.status_code == 404

    def test_reply_creates_session_with_node_and_answers(self, client):
        """Shape characterization: 200 + TutorReplyResponse fields populated.

        (Which lane produced the text is pipeline behavior, pinned
        separately in test_wsc_pipeline.py.)"""
        r = client.post("/api/tutor/its/reply", json={
            "sessionId": "wsc-char-s1", "message": "I am confused",
            "nodeId": "c10_bio_cbse_01_001", "topic": "photosynthesis",
        })
        assert r.status_code == 200
        body = r.json()
        assert body["sessionId"] == "wsc-char-s1"
        assert body["reply"]["role"] == "tutor"
        assert body["reply"]["content"].strip()

    def test_reply_second_turn_same_session(self, client):
        for msg in ("first turn", "second turn"):
            r = client.post("/api/tutor/its/reply", json={
                "sessionId": "wsc-char-s2", "message": msg,
                "nodeId": "c10_bio_cbse_01_001",
            })
            assert r.status_code == 200
            assert r.json()["reply"]["content"].strip()

    def test_start_unknown_node_offscript_with_snapshot(self, client):
        """Deterministic with the empty default bloom dir: every node is
        unknown -> OFF_SCRIPT error + a client-held state_snapshot."""
        r = client.post("/api/tutor/its/start",
                        json={"student_id": "guest",
                              "node_id": "c99_zzz_999_999"})
        assert r.status_code == 200
        body = r.json()
        assert body["state"] == "off_script"
        assert "state_snapshot" in body

    def test_input_with_blank_state_degrades_not_crashes(self, client):
        r = client.post("/api/tutor/its/input",
                        json={"state": {}, "input": "hello"})
        assert r.status_code == 200
        assert r.json()["state"] == "off_script"

    def test_ws_unknown_type_error_message(self, client):
        with client.websocket_connect("/api/tutor/its/ws") as ws:
            ws.send_json({"type": "bogus"})
            msg = ws.receive_json()
            assert msg["type"] == "error"
            assert "bogus" in msg["message"]

    def test_ws_its_start_offscript_roundtrip(self, client):
        with client.websocket_connect("/api/tutor/its/ws?user_id=wsc-ws") as ws:
            ws.send_json({"type": "its_start", "student_id": "guest",
                          "node_id": "c99_zzz_999_999"})
            msg = ws.receive_json()
            assert msg["type"] == "its_response"
            assert msg["state"] == "off_script"

    def test_ws_its_input_state_roundtrip(self, client):
        with client.websocket_connect("/api/tutor/its/ws") as ws:
            ws.send_json({"type": "its_input", "state": {},
                          "input": "hi"})
            msg = ws.receive_json()
            assert msg["type"] == "its_response"
            assert "state" in msg  # the echoed state snapshot


class TestTutorGraphSurface:
    """Engine-backed routes.  The TutorEngine build (catalog parse) is
    paid once per process on the first route call."""

    def test_stats(self, client):
        r = client.get("/api/tutor-graph/stats")
        assert r.status_code == 200
        body = r.json()
        assert body["concepts"] > 1000
        assert "subjects" in body

    def test_teach_requires_key(self, client):
        r = client.get("/api/tutor-graph/teach")
        assert r.status_code == 400

    def test_teach_unknown_node_404(self, client):
        r = client.get("/api/tutor-graph/teach",
                       params={"node_id": "c99_zzz_999_999"})
        assert r.status_code in (404, 503)  # 503 when corpus index absent

    def test_serve_submit_hint_progress_loop(self, client, app):
        # serve
        r = client.get("/api/tutor-graph/serve",
                       params={"student_id": SID, "subject": "maths"})
        assert r.status_code == 200
        served = r.json()
        assert served["question_id"]
        assert served["question"]
        # submit a deliberately wrong answer
        r = client.post("/api/tutor-graph/submit", json={
            "student_id": SID, "question_id": served["question_id"],
            "answer": "999999999",
        })
        assert r.status_code == 200
        graded = r.json()
        assert graded["outcome"] in ("wrong", "ungraded", "correct",
                                     "micro_win", "self_check",
                                     "lets_learn", "incorrect")
        assert "mastery" in graded or "outcome" in graded
        # hint ladder level 1
        r = client.get("/api/tutor-graph/hint", params={
            "student_id": SID, "question_id": served["question_id"],
            "level": 1})
        assert r.status_code == 200
        hint = r.json()
        assert "hint" in hint
        # progress is a personal record: anonymous callers get 401
        # (lane-B audit 2026-10-15 — was a guest-200).
        r = client.get("/api/tutor-graph/progress",
                       params={"student_id": SID})
        assert r.status_code == 401
        # the authed caller reads THEIR OWN record — a supplied student_id
        # never widens access.
        from types import SimpleNamespace
        from backend.deps import get_current_user
        app.dependency_overrides[get_current_user] = (
            lambda: SimpleNamespace(id=SID, role="student", is_active=True))
        try:
            r = client.get("/api/tutor-graph/progress",
                           params={"student_id": "someone-else"})
        finally:
            app.dependency_overrides.pop(get_current_user, None)
        assert r.status_code == 200
        prog = r.json()
        assert "per_subject" in prog
        assert prog["total_attempts"] >= 1

    def test_path_unknown_goal_404(self, client):
        r = client.get("/api/tutor-graph/path", params={
            "student_id": SID, "goal": "zzz_not_a_concept_zzz"})
        assert r.status_code == 404

    def test_ask_teach_lane_simple_explainer(self, client):
        """A classic-confusion doubt answers from the authored explainer
        table — deterministic, no solver, no corpus needed."""
        r = client.post("/api/tutor-graph/ask", json={
            "student_id": SID,
            "question": "what is the difference between speed and velocity?",
            "class_level": 9,
        })
        assert r.status_code == 200
        body = r.json()
        assert body.get("answer")
        assert body.get("label")


class TestPublicAskRoutes:
    def test_ask_degrades_gracefully_without_db(self):
        """Direct coroutine probe with db=None: the public ask box must
        answer (fallback text), never 500."""
        payload = routers_tutor.QuickQuestionRequest(
            message="what is 2+2", subject="maths", class_level=6)
        result = asyncio.run(routers_tutor.quick_question(payload, db=None))
        assert result.answer
        assert result.method in ("fallback", "exact_kernel")

    def test_ask_route_requires_auth_free_401(self, client):
        """The DB-session routes reject anonymous callers (dependency
        level) — pinned so the consolidation never loosens it."""
        r = client.get("/api/tutor/sessions")
        assert r.status_code in (401, 403)

    def test_standalone_hint_deterministic_fallback(self, monkeypatch):
        async def _no_llm(context, level, language_pref):
            return None

        monkeypatch.setattr(routers_tutor, "_llm_hint", _no_llm)
        payload = routers_tutor.TutorHintRequest(
            context="The mitochondria is the powerhouse of the cell "
                    "because it produces ATP through oxidative "
                    "phosphorylation.",
            hint_level=1)
        out = asyncio.run(routers_tutor.standalone_hint(payload))
        assert out["hint"]
        assert out["hint_level"] == 1

    def test_hint_ladder_escalates(self, monkeypatch):
        async def _no_llm(context, level, language_pref):
            return None

        monkeypatch.setattr(routers_tutor, "_llm_hint", _no_llm)
        ctx = ("To find the area of a circle, use the formula A = pi r "
               "squared where r is the radius of the circle.")
        hints = []
        for lvl in (1, 2, 3):
            payload = routers_tutor.TutorHintRequest(context=ctx,
                                                     hint_level=lvl)
            hints.append(asyncio.run(
                routers_tutor.standalone_hint(payload))["hint"])
        assert len({h for h in hints}) == 3, (
            f"levels 1/2/3 must differ, got {hints}")

    def test_explain_step_deterministic_fallback(self, monkeypatch):
        """LLM down -> the plain-language restate fallback still answers."""
        import backend.services.llm_client as llm_mod

        def _boom(*a, **k):
            raise RuntimeError("llm offline")

        monkeypatch.setattr(llm_mod, "LLMClient", _boom)
        payload = routers_tutor.ExplainStepRequest(
            step_rule="Ohm's law", step_formula="V = I R",
            step_explanation="The voltage equals current times resistance.")
        out = asyncio.run(routers_tutor.explain_step(payload))
        assert out["simplified"]
        assert "In simple words" in out["simplified"]
