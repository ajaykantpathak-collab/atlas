"""scenarios.py — the weighted traffic mix for the load generator.

Four scenario families, weighted like a real student session:

  content_get   70%   learn-page GETs against real corpus node ids and the
                      real doodle-card webp assets the page loads
  solve_post    15%   POST /api/practice/deterministic/solve with one of 20
                      real bank questions (numeric / bank-hit / prose)
  tutor_flow    10%   signup-or-login probe -> tutor session -> tutor reply
  auth_progress  5%   GET /api/auth/me + progress overview/dashboard

Scenarios are plain coroutines so tests can drive them through an
httpx.MockTransport client without a live server.
"""

from __future__ import annotations

import asyncio
import random
import time
import uuid
from dataclasses import dataclass, field
from typing import Awaitable, Callable, Dict, List, Optional, Protocol

import httpx

from backend.harness.loadgen import corpus

# --------------------------------------------------------------------------- #
# Weights (must sum to 100 — asserted by tests)
# --------------------------------------------------------------------------- #
SCENARIO_WEIGHTS: Dict[str, int] = {
    "content_get": 70,
    "solve_post": 15,
    "tutor_flow": 10,
    "auth_progress": 5,
}

# Sub-mix inside the content scenario (learn page: node card + enrichment +
# questions tab + the webp/map assets the page pulls).
_CONTENT_MIX: List[tuple] = [
    ("node", 0.40),
    ("enrichment", 0.30),
    ("questions", 0.10),
    ("asset", 0.20),
]

# Endpoint labels (templates — these are the table rows in the report).
L_NODE = "GET /api/content/nodes/{id}"
L_ENRICH = "GET /api/content/nodes/{id}/enrichment"
L_QUESTIONS = "GET /api/content/nodes/{id}/questions"
L_ASSET = "GET /doodle_cards/{cls}/{id}.webp"
L_SOLVE = "POST /api/practice/deterministic/solve"
L_SIGNUP = "POST /api/auth/signup"
L_LOGIN = "POST /api/auth/login"
L_ME = "GET /api/auth/me"
L_OVERVIEW = "GET /api/progress/overview"
L_DASHBOARD = "GET /api/progress/dashboard"
L_TUTOR_START = "POST /api/tutor/sessions"
L_TUTOR_REPLY = "POST /api/tutor/sessions/{id}/reply"

TUTOR_OPENERS = [
    "I don't understand this step, can you explain it more simply?",
    "Why is this answer negative? I expected a positive number.",
    "Can you give me a hint without telling me the answer?",
    "What formula should I start from here?",
]

SOLVE_TIMEOUT_S = 45.0  # server solve budget default is 60s; don't give up first


class Recorder(Protocol):
    """Called once per HTTP request with (endpoint, ms, status).

    status -1 means a transport-level failure (connect/read error)."""

    def __call__(self, endpoint: str, ms: float, status: int) -> None: ...


@dataclass
class LoadState:
    """Shared, lock-guarded session state (auth bootstrap + signup budget)."""

    rng: random.Random
    run_id: str = field(default_factory=lambda: uuid.uuid4().hex[:8])
    password: str = "Loadgen!secure23"
    signup_budget: int = 50  # throwaway signup probes per run (DB hygiene)
    auth_header: Optional[Dict[str, str]] = None
    primary_email: Optional[str] = None
    bootstrap_failed: bool = False
    signups_used: int = 0
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)

    def new_email(self) -> str:
        return f"loadgen_{self.run_id}_{self.signups_used}@example.com"


def pick_scenario(rng: random.Random) -> str:
    """Weighted scenario choice (weights asserted to sum to 100 in tests)."""
    roll = rng.uniform(0, 100)
    acc = 0
    for name, w in SCENARIO_WEIGHTS.items():
        acc += w
        if roll < acc:
            return name
    return "content_get"


# --------------------------------------------------------------------------- #
# Auth bootstrap — one primary user per run, shared by authed scenarios.
# Signup 409 (email exists) falls back to login; total failure is remembered
# so we stop hammering signup and let downstream 401s show up honestly.
# --------------------------------------------------------------------------- #
async def ensure_user(client: httpx.AsyncClient, state: LoadState, record) -> None:
    if state.auth_header is not None or state.bootstrap_failed:
        return
    async with state.lock:
        if state.auth_header is not None or state.bootstrap_failed:
            return
        email = state.new_email()
        state.signups_used += 1
        payload = {
            "name": "Loadgen Probe",
            "email": email,
            "password": state.password,
            "role": "student",
            "class_level": 10,
        }
        t0 = time.perf_counter()
        try:
            resp = await client.post("/api/auth/signup", json=payload)
        except httpx.RequestError:
            record(L_SIGNUP, (time.perf_counter() - t0) * 1000.0, -1)
            state.bootstrap_failed = True
            return
        record(L_SIGNUP, (time.perf_counter() - t0) * 1000.0, resp.status_code)

        token = None
        if resp.status_code in (200, 201):
            token = (resp.json() or {}).get("access_token")
            state.primary_email = email
        else:
            # duplicate -> login (also the post-budget path: reuse primary)
            login_email = email if state.primary_email is None else state.primary_email
            t1 = time.perf_counter()
            try:
                r2 = await client.post(
                    "/api/auth/login",
                    json={"email": login_email, "password": state.password},
                )
            except httpx.RequestError:
                record(L_LOGIN, (time.perf_counter() - t1) * 1000.0, -1)
                state.bootstrap_failed = True
                return
            record(L_LOGIN, (time.perf_counter() - t1) * 1000.0, r2.status_code)
            if r2.status_code == 200:
                token = (r2.json() or {}).get("access_token")
                state.primary_email = login_email

        if token:
            state.auth_header = {"Authorization": f"Bearer {token}"}
        else:
            state.bootstrap_failed = True


async def _timed_request(
    client: httpx.AsyncClient,
    record,
    endpoint: str,
    method: str,
    path: str,
    *,
    headers: Optional[Dict[str, str]] = None,
    json_body=None,
    timeout: Optional[float] = None,
) -> Optional[httpx.Response]:
    """One measured request; transport errors recorded as status -1."""
    t0 = time.perf_counter()
    try:
        resp = await client.request(
            method,
            path,
            headers=headers,
            json=json_body,
            timeout=timeout,
        )
    except httpx.RequestError:
        record(endpoint, (time.perf_counter() - t0) * 1000.0, -1)
        return None
    record(endpoint, (time.perf_counter() - t0) * 1000.0, resp.status_code)
    return resp


# --------------------------------------------------------------------------- #
# Scenario 1 — content GETs (70%)
# --------------------------------------------------------------------------- #
async def content_get(client: httpx.AsyncClient, state: LoadState, record) -> None:
    rng = state.rng
    roll = rng.random()
    acc = 0.0
    kind = _CONTENT_MIX[-1][0]
    for k, w in _CONTENT_MIX:
        acc += w
        if roll < acc:
            kind = k
            break

    if kind == "asset":
        path = corpus.doodle_asset_path(rng)
        cls, fname = path.split("/")[2], path.split("/")[3]
        await _timed_request(client, record, L_ASSET.format(cls=cls, id=fname[:-5]),
                             "GET", path)
        return

    nid = corpus.random_node_id(rng)
    if kind == "node":
        await _timed_request(client, record, L_NODE, "GET", f"/api/content/nodes/{nid}")
    elif kind == "enrichment":
        await _timed_request(client, record, L_ENRICH, "GET",
                             f"/api/content/nodes/{nid}/enrichment")
    else:
        await _timed_request(client, record, L_QUESTIONS, "GET",
                             f"/api/content/nodes/{nid}/questions")


# --------------------------------------------------------------------------- #
# Scenario 2 — deterministic solve POSTs (15%)
# --------------------------------------------------------------------------- #
async def solve_post(client: httpx.AsyncClient, state: LoadState, record) -> None:
    q = corpus.random_question(state.rng)
    await _timed_request(
        client,
        record,
        L_SOLVE,
        "POST",
        "/api/practice/deterministic/solve",
        json_body={"text": q["text"], "node_id": q["node_id"]},
        timeout=SOLVE_TIMEOUT_S,
    )


# --------------------------------------------------------------------------- #
# Scenario 3 — tutor reply flow (10%): signup/login probe -> session -> reply
# --------------------------------------------------------------------------- #
async def tutor_flow(client: httpx.AsyncClient, state: LoadState, record) -> None:
    await ensure_user(client, state, record)

    headers = state.auth_header
    nid = corpus.random_node_id(state.rng)

    # Throwaway signup probes stay inside the run budget, then we reuse the
    # primary user's login so the users table isn't flooded.
    if state.signups_used < state.signup_budget and state.rng.random() < 0.5:
        probe_email = (
            f"loadgen_{state.run_id}_probe{state.signups_used + 1}@example.com"
        )
        state.signups_used += 1
        t0 = time.perf_counter()
        try:
            resp = await client.post(
                "/api/auth/signup",
                json={
                    "name": "Loadgen Probe",
                    "email": probe_email,
                    "password": state.password,
                    "role": "student",
                    "class_level": 10,
                },
            )
        except httpx.RequestError:
            record(L_SIGNUP, (time.perf_counter() - t0) * 1000.0, -1)
            return
        record(L_SIGNUP, (time.perf_counter() - t0) * 1000.0, resp.status_code)
        if resp.status_code in (200, 201):
            tok = (resp.json() or {}).get("access_token")
            if tok:
                headers = {"Authorization": f"Bearer {tok}"}

    resp = await _timed_request(
        client, record, L_TUTOR_START, "POST", "/api/tutor/sessions",
        headers=headers, json_body={"node_id": nid, "topic": None},
    )
    if resp is None or resp.status_code >= 300:
        return
    session_id = (resp.json() or {}).get("session_id") or ""
    if not session_id:
        return
    await _timed_request(
        client, record, L_TUTOR_REPLY, "POST",
        f"/api/tutor/sessions/{session_id}/reply",
        headers=headers,
        json_body={
            "session_id": session_id,
            "message": state.rng.choice(TUTOR_OPENERS),
        },
        timeout=SOLVE_TIMEOUT_S,
    )


# --------------------------------------------------------------------------- #
# Scenario 4 — auth/progress (5%)
# --------------------------------------------------------------------------- #
async def auth_progress(client: httpx.AsyncClient, state: LoadState, record) -> None:
    await ensure_user(client, state, record)
    headers = state.auth_header
    await _timed_request(client, record, L_ME, "GET", "/api/auth/me", headers=headers)
    await _timed_request(client, record, L_OVERVIEW, "GET",
                         "/api/progress/overview?range=all", headers=headers)
    await _timed_request(client, record, L_DASHBOARD, "GET",
                         "/api/progress/dashboard", headers=headers)


SCENARIOS: Dict[
    str, Callable[[httpx.AsyncClient, LoadState, Recorder], Awaitable[None]]
] = {
    "content_get": content_get,
    "solve_post": solve_post,
    "tutor_flow": tutor_flow,
    "auth_progress": auth_progress,
}
