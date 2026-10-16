"""A4-SOLVE-UX acceptance — solve modalities + auth UX (verification only).

This file NEVER changes backend behaviour.  It verifies, in order:

  1. STATIC WIRING — the A4 frontend surfaces exist and point at the real
     endpoints (solve-voice, grade-work, change-password, profile),
     contain no console.log leftovers and no node-id-shaped display text.
  2. LIVE VOICE FLOW — a real spoken-question audio blob (committed
     fixture, cloud-TTS recording of "What is 25 percent of 80?") is
     uploaded to /api/practice/deterministic/solve-voice exactly like the
     MediaRecorder page does (multipart 'file'); the response must carry
     an honest transcription and the verified-card fields.
  3. LIVE GRADE-WORK FLOW — a real image of handwritten working
     (committed PNG fixture) is graded; the response carries per-step
     verdicts + the canonical answer.
  4. LIVE PASSWORD CYCLE — change → old password fails login → change
     back → original works.  The account is left on its ORIGINAL
     password, always (try/finally).
  5. LIVE OFFLINE ROUNDTRIP — /api/progress/offline list → download one
     node → remove it (state restored).

Live tests skip cleanly when no backend is reachable; run them against a
live stack with:

    python -m pytest deploy/backend/tests/test_a4_solveux.py -v

External flakiness note: solve-voice transcription calls the upstream
audio model, which occasionally answers 503 (high demand) or exceeds the
backend's 60s LLM budget.  The voice test retries and FAILS HONESTLY
(reporting the upstream detail) rather than masking a refusal.
"""

from __future__ import annotations

import os
import re
import time
from pathlib import Path

import pytest
import requests

# --------------------------------------------------------------------------- #
# Configuration
# --------------------------------------------------------------------------- #

BACKEND_DIR = Path(__file__).resolve().parents[1]
DEPLOY_DIR = BACKEND_DIR.parent
FRONTEND_DIR = DEPLOY_DIR / "frontend"
FIXTURES = Path(__file__).resolve().parent / "fixtures"

# Direct backend port by default (no nginx 60s gateway cap on slow cold
# vision calls); override for another stack.
BASE_URL = os.environ.get("A4_BASE_URL", "http://localhost:8001").rstrip("/")

# Dedicated throwaway account for the password cycle.  The test CREATES it
# if missing and ALWAYS restores the original password (try/finally).
TEST_EMAIL = os.environ.get("A4_TEST_EMAIL", "a4.solveux@atlas-test.com")
TEST_PASSWORD = os.environ.get("A4_TEST_PASSWORD", "A4solveux!2026")
TEST_PASSWORD_NEW = TEST_PASSWORD + "x"

VOICE_WAV = FIXTURES / "a4_voice_question.wav"
GRADEWORK_PNG = FIXTURES / "a4_gradework_correct.png"

TIMEOUT_SLOW = 240  # solve-voice/grade-work include LLM round-trips


def _backend_up() -> bool:
    try:
        r = requests.get(f"{BASE_URL}/api/health", timeout=5)
        return r.status_code == 200
    except requests.RequestException:
        return False


def _require_live_backend() -> None:
    if not _backend_up():
        pytest.skip(f"live backend not reachable at {BASE_URL}")


def _login(email: str, password: str) -> requests.Response:
    return requests.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": email, "password": password},
        timeout=30,
    )


def _ensure_test_account() -> None:
    """Create the dedicated account if it does not exist yet."""
    if _login(TEST_EMAIL, TEST_PASSWORD).status_code == 200:
        return
    requests.post(
        f"{BASE_URL}/api/auth/signup",
        json={
            "name": "A4 SolveUX Verification",
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD,
            "role": "student",
            "board": "CBSE",
            "classLevel": 10,
        },
        timeout=30,
    )


def _auth_header(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


# --------------------------------------------------------------------------- #
# 1. Static wiring — the A4 surfaces exist and point at the real endpoints
# --------------------------------------------------------------------------- #

_A4_FILES = [
    FRONTEND_DIR / "app" / "(student)" / "solve" / "voice" / "page.tsx",
    FRONTEND_DIR / "app" / "(student)" / "solve" / "gradework" / "page.tsx",
    FRONTEND_DIR / "app" / "(student)" / "settings" / "page.tsx",
    FRONTEND_DIR / "components" / "solve" / "solveTypes.ts",
    FRONTEND_DIR / "components" / "solve" / "VerifiedAnswerCard.tsx",
    FRONTEND_DIR / "components" / "solve" / "ErrorBanner.tsx",
]

_NODE_ID_SHAPE = re.compile(r"c\d+_[a-z]{2,}_[a-z0-9]+_\d+_\d+|c\d+_[a-z]{2,}_\d+_\d+")


def test_a4_frontend_files_exist():
    missing = [str(p) for p in _A4_FILES if not p.is_file()]
    assert not missing, f"missing A4 frontend files: {missing}"


def test_voice_page_wired_to_solve_voice_and_mediarecorder():
    src = _A4_FILES[0].read_text(encoding="utf-8")
    assert "/api/practice/deterministic/solve-voice" in src
    assert "MediaRecorder" in src
    assert "getUserMedia" in src
    # denied-permission path handled, not just the happy path
    assert "NotAllowedError" in src
    assert "NotFoundError" in src


def test_gradework_page_wired_to_grade_work():
    src = _A4_FILES[1].read_text(encoding="utf-8")
    assert "/api/practice/deterministic/grade-work" in src
    assert "capture=\"environment\"" in src or "capture='environment'" in src


def test_settings_page_wired_to_change_password_and_profile():
    src = _A4_FILES[2].read_text(encoding="utf-8")
    assert "/api/auth/change-password" in src
    assert "/api/auth/me" in src
    # the old honest placeholder must be gone — the control is REAL now
    assert "Not available yet\" />\n                    <SettingRow label=\"Two-Factor" not in src


def test_a4_frontend_no_console_logs_and_no_node_ids_in_display_sources():
    offenders = []
    for p in _A4_FILES:
        src = p.read_text(encoding="utf-8")
        if "console.log(" in src:
            offenders.append(f"{p.name}: console.log")
        # node-id-shaped LITERALS in source (runtime fetch keys come from
        # JSON and are accepted-by-design; literals in display code are not)
        for m in _NODE_ID_SHAPE.finditer(src):
            offenders.append(f"{p.name}: node-id-shaped literal {m.group(0)!r}")
    assert not offenders, offenders


# --------------------------------------------------------------------------- #
# 2. LIVE voice flow — real audio blob -> /solve-voice -> verified card
# --------------------------------------------------------------------------- #

def test_live_solve_voice_real_audio_end_to_end():
    _require_live_backend()
    assert VOICE_WAV.is_file(), f"missing fixture {VOICE_WAV}"

    last_detail = ""
    for attempt in range(6):
        with VOICE_WAV.open("rb") as fh:
            r = requests.post(
                f"{BASE_URL}/api/practice/deterministic/solve-voice",
                files={"file": ("question.wav", fh, "audio/wav")},
                timeout=TIMEOUT_SLOW,
            )
        if r.status_code == 200:
            payload = r.json()
            heard = str(payload.get("transcribed_text") or "")
            # backend honesty gate: internal fallback strings must never
            # masquerade as a transcription
            if heard.startswith("[LLM"):
                last_detail = f"upstream returned fallback string {heard!r}"
                time.sleep(35)  # outlive the backend's 30s LLM circuit breaker
                continue
            # the spoken question is "What is 25 percent of 80?"
            assert "25" in heard and "80" in heard, f"wrong transcription: {heard!r}"
            # the verified-answer card fields the page renders
            assert "tier" in payload and "steps" in payload
            assert "repertoire" in payload
            assert "answer" in payload and "refusal_reason" in payload
            return
        last_detail = f"HTTP {r.status_code}: {r.text[:200]}"
        time.sleep(35)  # upstream 503 spikes / circuit-breaker cooldown

    pytest.fail(
        "solve-voice never returned a clean transcription — "
        f"last upstream detail: {last_detail}"
    )


# --------------------------------------------------------------------------- #
# 3. LIVE grade-work flow — real image -> /grade-work -> step verdicts
# --------------------------------------------------------------------------- #

def test_live_grade_work_real_image_end_to_end():
    _require_live_backend()
    assert GRADEWORK_PNG.is_file(), f"missing fixture {GRADEWORK_PNG}"

    # The vision-transcription leg rides the same upstream LLM as the
    # voice flow — retry past 503 spikes and circuit-breaker windows.
    payload = None
    last_detail = ""
    for attempt in range(4):
        with GRADEWORK_PNG.open("rb") as fh:
            r = requests.post(
                f"{BASE_URL}/api/practice/deterministic/grade-work",
                files={"file": ("work.png", fh, "image/png")},
                timeout=TIMEOUT_SLOW,
            )
        if r.status_code == 200:
            payload = r.json()
            break
        last_detail = f"HTTP {r.status_code}: {r.text[:200]}"
        time.sleep(35)
    assert payload is not None, (
        f"grade-work never succeeded — last detail: {last_detail}"
    )
    assert payload["tier"] == "STEP_FEEDBACK"
    assert payload["steps_total"] >= 1
    assert payload["verdict"] in ("correct", "partial", "incorrect")
    assert payload["steps_ok"] <= payload["steps_total"]
    assert isinstance(payload["canonical_steps"], list)
    # the fixture solves 25% of 80 correctly — canonical answer must be 20
    # (only asserted when the canonical pipeline itself verified)
    if payload.get("canonical_answer") is not None:
        assert payload["canonical_answer"].strip() == "20"


def test_live_grade_work_rejects_non_image():
    _require_live_backend()
    r = requests.post(
        f"{BASE_URL}/api/practice/deterministic/grade-work",
        files={"file": ("notes.txt", b"not an image", "text/plain")},
        timeout=30,
    )
    assert r.status_code == 400


# --------------------------------------------------------------------------- #
# 4. LIVE password cycle — change -> old fails -> change back (original kept)
# --------------------------------------------------------------------------- #

def test_live_change_password_full_cycle():
    _require_live_backend()
    _ensure_test_account()

    r = _login(TEST_EMAIL, TEST_PASSWORD)
    assert r.status_code == 200, f"could not log in to the test account: {r.status_code}"
    token = r.json()["access_token"]

    # change it
    r = requests.post(
        f"{BASE_URL}/api/auth/change-password",
        json={"currentPassword": TEST_PASSWORD, "newPassword": TEST_PASSWORD_NEW},
        headers=_auth_header(token),
        timeout=30,
    )
    assert r.status_code == 200, f"change-password failed: {r.status_code} {r.text[:200]}"

    try:
        # old password must now fail login
        assert _login(TEST_EMAIL, TEST_PASSWORD).status_code == 401, (
            "old password still logs in after the change"
        )
        # new password must work
        r = _login(TEST_EMAIL, TEST_PASSWORD_NEW)
        assert r.status_code == 200, "new password does not log in"
        fresh_token = r.json()["access_token"]
        # wrong current password is rejected with 400
        r = requests.post(
            f"{BASE_URL}/api/auth/change-password",
            json={"currentPassword": "definitely-wrong", "newPassword": TEST_PASSWORD_NEW + "y"},
            headers=_auth_header(fresh_token),
            timeout=30,
        )
        assert r.status_code == 400, "wrong current password was accepted"
    finally:
        # ALWAYS restore the original password for the account
        r = _login(TEST_EMAIL, TEST_PASSWORD_NEW)
        assert r.status_code == 200, "cannot restore: new password stopped working"
        restore_token = r.json()["access_token"]
        r = requests.post(
            f"{BASE_URL}/api/auth/change-password",
            json={"currentPassword": TEST_PASSWORD_NEW, "newPassword": TEST_PASSWORD},
            headers=_auth_header(restore_token),
            timeout=30,
        )
        assert r.status_code == 200, "failed to change the password BACK"

    # the original password works again — account left as found
    assert _login(TEST_EMAIL, TEST_PASSWORD).status_code == 200


# --------------------------------------------------------------------------- #
# 5. LIVE offline roundtrip — list -> download -> remove (state restored)
# --------------------------------------------------------------------------- #

def test_live_offline_download_roundtrip():
    _require_live_backend()
    _ensure_test_account()
    token = _login(TEST_EMAIL, TEST_PASSWORD).json()["access_token"]
    hdrs = _auth_header(token)

    # a real node id from the SAME universe the offline service resolves
    # against (the Postgres knowledge-node table, exposed via
    # /api/content/search) — /api/graph reads Neo4j and the md-corpus
    # listing reads files; both 404 on the offline endpoints.
    r = requests.get(
        f"{BASE_URL}/api/content/search",
        params={"q": "motion"},
        timeout=30,
    )
    assert r.status_code == 200, f"content search failed: {r.status_code}"
    nodes = r.json() or []
    assert nodes, "no content nodes returned to pick an offline target from"
    node_id = str(nodes[0].get("node_id") or "")

    # list (baseline)
    r = requests.get(f"{BASE_URL}/api/progress/offline", headers=hdrs, timeout=30)
    assert r.status_code == 200, f"offline listing failed: {r.status_code} {r.text[:200]}"
    assert "items" in r.json()

    if not node_id:
        pytest.skip("no usable node id in listing — download/remove not exercised")
    try:
        r = requests.post(
            f"{BASE_URL}/api/progress/offline/{node_id}/download",
            headers=hdrs, timeout=30,
        )
        assert r.status_code == 200, f"offline download failed: {r.status_code} {r.text[:200]}"
        r = requests.get(f"{BASE_URL}/api/progress/offline", headers=hdrs, timeout=30)
        ids = {str(it.get("node_id") or it.get("id") or "") for it in r.json().get("items", [])}
        assert node_id in ids, "downloaded node missing from the offline list"
    finally:
        # restore state
        requests.delete(
            f"{BASE_URL}/api/progress/offline/{node_id}", headers=hdrs, timeout=30
        )
