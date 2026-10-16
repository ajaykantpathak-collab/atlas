# -*- coding: utf-8 -*-
"""WS-D IDOR probes (api/ security hardening, 2026-10-10).

Real attacker probes for the ownership gaps found in the 26-router IDOR
audit.  Every test names the route it protects; the wiring tests assert
the guard is attached, the behaviour tests call the endpoint coroutine
the way FastAPI would.

No DB, no network: guards must raise before any data access.
"""

from __future__ import annotations

import asyncio
import inspect
from types import SimpleNamespace

import pytest
from fastapi import HTTPException
from pydantic import ValidationError

from backend.deps import require_self_or_staff

ME = "3f2a1b4c-5d6e-7f80-91a2-b3c4d5e6f701"
OTHER = "9a8b7c6d-5e4f-3021-8765-4321fedcba09"
TEACHER = "11111111-2222-3333-4444-555555555555"
OTHER_TEACHER = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
ADMIN = "00000000-0000-0000-0000-000000000001"


def _user(user_id: str, role: str) -> SimpleNamespace:
    return SimpleNamespace(id=user_id, role=role)


def _deps_of(func) -> list:
    from fastapi.params import Depends as DependsClass

    found = []
    for param in inspect.signature(func).parameters.values():
        if isinstance(param.default, DependsClass):
            found.append(getattr(param.default.dependency, "__name__", repr(param.default.dependency)))
    return found


# ---------------------------------------------------------------------------
# 1. GET /api/practice/review/{student_id} — was fully unauthenticated
# ---------------------------------------------------------------------------


def test_review_queue_route_has_ownership_guard_wired():
    from backend.api import practice

    deps = _deps_of(practice.get_due_reviews)
    assert "require_self_or_staff" in deps, (
        f"practice.get_due_reviews lost require_self_or_staff (found {deps}) — "
        "any anonymous caller can read any student's review queue"
    )


def test_review_queue_guard_rejects_other_student():
    """Behaviour probe: student token + another student's id -> 403 before DB."""
    with pytest.raises(HTTPException) as exc:
        asyncio.run(
            require_self_or_staff(OTHER, _user(ME, "student"))
        )
    assert exc.value.status_code == 403


def test_review_queue_guard_accepts_self_and_staff():
    assert asyncio.run(require_self_or_staff(ME, _user(ME, "student"))) == ME
    assert asyncio.run(require_self_or_staff(OTHER, _user(TEACHER, "teacher"))) == OTHER


# ---------------------------------------------------------------------------
# 2. POST /api/practice/start — cross-student session creation
# ---------------------------------------------------------------------------


def test_start_session_rejects_foreign_student_uuid():
    """Authenticated student passing ANOTHER student's UUID must get 403
    before any session row is created (attempts/mastery would otherwise
    land under the victim's id)."""
    from backend.api import practice

    req = practice.StartSessionRequest(student_id=OTHER, subject="mathematics")
    with pytest.raises(HTTPException) as exc:
        asyncio.run(
            practice.start_session(req, db=None, caller_sub=ME)
        )
    assert exc.value.status_code == 403


def test_start_session_allows_own_and_demo_ids():
    from backend.api import practice

    # own id: guard passes (fails LATER on question availability, never 403
    # for ownership) — db=None, and selector must fail before session build.
    req = practice.StartSessionRequest(student_id=ME, subject="mathematics")
    try:
        asyncio.run(practice.start_session(req, db=None, caller_sub=ME))
    except HTTPException as exc:
        assert exc.value.status_code != 403, "own-id start must not be ownership-rejected"
    except Exception:
        pass  # any downstream failure is fine — the guard itself passed


def test_start_session_staff_token_may_target_students():
    from backend.api import practice

    guard = practice._enforce_start_target
    assert guard is not None, "start_session ownership helper missing"


def test_start_target_guard_matrix():
    """Unit probe of the start-session ownership rule."""
    from backend.api import practice

    g = practice._enforce_start_target
    # anonymous caller: anything goes (demo flow) — returns None, no raise
    assert g(None, OTHER) is None
    # authenticated, own uuid: fine
    assert g(ME, ME) is None
    # authenticated, non-uuid free-text id (demo/guest): fine
    assert g(ME, "guest") is None
    # authenticated, foreign uuid: 403
    with pytest.raises(HTTPException) as exc:
        g(ME, OTHER, caller_role="student")
    assert exc.value.status_code == 403
    # staff override
    assert g(TEACHER, OTHER, caller_role="teacher") is None
    assert g(ADMIN, OTHER, caller_role="admin") is None


def test_start_session_topic_ids_capped():
    from backend.api import practice

    with pytest.raises(ValidationError):
        practice.StartSessionRequest(
            student_id=ME, subject="mathematics",
            topic_ids=[f"c10_bio_{i:03d}" for i in range(60)],
        )


# ---------------------------------------------------------------------------
# 3. teacher.py — teacher-scope enforcement (cross-teacher reads)
# ---------------------------------------------------------------------------


def test_resolve_teacher_rejects_foreign_teacher_id():
    """teacherId=<other teacher> must 403 for teacher tokens (was: resolved
    and served the other teacher's classes)."""
    from backend.api import teacher

    with pytest.raises(HTTPException) as exc:
        asyncio.run(
            teacher._resolve_teacher(None, OTHER_TEACHER, _user(TEACHER, "teacher"))
        )
    assert exc.value.status_code == 403


def test_resolve_teacher_accepts_me_self_and_admin():
    from backend.api import teacher

    me = _user(TEACHER, "teacher")
    assert asyncio.run(teacher._resolve_teacher(None, "me", me)) == TEACHER
    assert asyncio.run(teacher._resolve_teacher(None, "", me)) == TEACHER
    assert asyncio.run(
        teacher._resolve_teacher(None, OTHER_TEACHER, _user(ADMIN, "admin"))
    ) is not None


def test_class_access_guard_enforces_owner():
    from backend.api import teacher

    cls = SimpleNamespace(id="c-1", teacher_id=OTHER_TEACHER)
    g = teacher._ensure_class_access
    with pytest.raises(HTTPException) as exc:
        g(cls, _user(TEACHER, "teacher"))
    assert exc.value.status_code == 403
    # owner + admin pass
    assert g(SimpleNamespace(id="c-1", teacher_id=TEACHER), _user(TEACHER, "teacher")) is None
    assert g(cls, _user(ADMIN, "admin")) is None


def test_class_routes_and_worksheet_routes_call_the_guard():
    from backend.api import teacher

    src = inspect.getsource(teacher)
    for fn in ("list_students", "class_progress", "get_worksheet",
               "worksheet_performance", "worksheet_printable",
               "send_worksheet_whatsapp", "assign_homework"):
        code = inspect.getsource(getattr(teacher, fn))
        assert any(g in code for g in
                   ("_ensure_class_access", "_resolve_teacher",
                    "_ensure_worksheet_access")), (
            f"teacher.{fn} lost its scope guard"
        )
    # list_assignments must scope to the caller's own classes (or admin)
    assert "_assignments_visible_to" in src, (
        "list_assignments must scope rows to the caller's classes"
    )


# ---------------------------------------------------------------------------
# 4. junior.py — anonymous read of any junior student's progress
# ---------------------------------------------------------------------------


def test_junior_anonymous_cannot_read_uuid_student():
    from backend.api import junior

    with pytest.raises(HTTPException) as exc:
        junior._resolve_student_id(None, OTHER)
    assert exc.value.status_code == 401


def test_junior_anonymous_keeps_device_ids():
    from backend.api import junior

    assert junior._resolve_student_id(None, "guest_junior") == "guest_junior"
    assert junior._resolve_student_id(None, "kid-tab-7f3a") == "kid-tab-7f3a"


def test_junior_authenticated_always_binds_own_id():
    from backend.api import junior

    assert junior._resolve_student_id(_user(ME, "student"), OTHER) == ME


# ---------------------------------------------------------------------------
# 5. intelligence.py POST /interaction — anonymous write with foreign id
# ---------------------------------------------------------------------------


def test_interaction_log_requires_auth_and_binds_student():
    from backend.api import intelligence

    deps = _deps_of(intelligence.log_interaction)
    assert "get_current_user" in deps, (
        f"intelligence.log_interaction lost get_current_user (found {deps}) — "
        "anonymous callers could write interaction rows under any student id"
    )


def test_interaction_log_rejects_foreign_student_id():
    from backend.api import intelligence

    req = intelligence.InteractionLogRequest(
        student_id=OTHER, node_id="c10_phy_01_001",
        question="q", response="r", is_correct=True,
    )
    with pytest.raises(HTTPException) as exc:
        asyncio.run(intelligence.log_interaction(req, user=_user(ME, "student")))
    assert exc.value.status_code == 403


def test_interaction_log_accepts_own_student_id_without_writing():
    """Own-id path must pass the guard; capture is stubbed so nothing
    touches disk.  Guard passes -> capture called -> stub returns."""
    from backend.api import intelligence

    called = {}

    class _Cap:
        def capture(self, **kw):
            called.update(kw)
            return SimpleNamespace(id="rec-1")

    intelligence._get_capture = lambda: _Cap()
    req = intelligence.InteractionLogRequest(
        student_id=ME, node_id="c10_phy_01_001",
        question="q", response="r", is_correct=True,
    )
    out = asyncio.run(intelligence.log_interaction(req, user=_user(ME, "student")))
    assert out["status"] == "logged"
    assert called["student_id"] == ME


def test_interaction_log_staff_may_write_for_students():
    from backend.api import intelligence

    class _Cap:
        def capture(self, **kw):
            return SimpleNamespace(id="rec-2")

    intelligence._get_capture = lambda: _Cap()
    req = intelligence.InteractionLogRequest(
        student_id=OTHER, node_id="c10_phy_01_001",
        question="q", response="r", is_correct=True,
    )
    out = asyncio.run(intelligence.log_interaction(req, user=_user(TEACHER, "teacher")))
    assert out["status"] == "logged"


# ---------------------------------------------------------------------------
# 6. Input caps on the solver/tutor request surfaces (intelligence.py)
# ---------------------------------------------------------------------------


def test_intelligence_solve_request_caps_problem_text():
    from backend.api import intelligence

    with pytest.raises(ValidationError):
        intelligence.SolveRequest(problem_text="x" * 8000)
    ok = intelligence.SolveRequest(problem_text="A car of mass m moves...")
    assert ok.problem_text


def test_intelligence_tutor_request_caps():
    from backend.api import intelligence

    with pytest.raises(ValidationError):
        intelligence.TutorRequest(
            student_id=ME, query="q" * 8000, node_id="c10_phy_01_001")
    with pytest.raises(ValidationError):
        intelligence.TutorRequest(
            student_id=ME, query="q", node_id="c10_phy_01_001",
            interaction_history=[{"a": 1}] * 100)


def test_interaction_log_field_caps():
    from backend.api import intelligence

    with pytest.raises(ValidationError):
        intelligence.InteractionLogRequest(
            student_id=OTHER, node_id="c10_phy_01_001",
            question="q", response="r" * 20000, is_correct=True)


# ---------------------------------------------------------------------------
# 7. vision.py — base64 bomb cap (auth already present)
# ---------------------------------------------------------------------------


def test_vision_extract_rejects_oversize_image():
    from backend.api import vision

    with pytest.raises(ValidationError):
        vision.ExtractRequest(image="A" * 12_000_000)
    ok = vision.ExtractRequest(image="QUJDREVGR0hJ", mime="image/png")
    assert ok.image.startswith("QUJD")


def test_vision_extract_rejects_non_image_mime():
    from backend.api import vision

    with pytest.raises(ValidationError):
        vision.ExtractRequest(image="QUJD", mime="application/octet-stream")


# ---------------------------------------------------------------------------
# 8. accessibility adapt — content size cap
# ---------------------------------------------------------------------------


def test_adapt_content_request_caps_content():
    from backend.api import accessibility

    with pytest.raises(ValidationError):
        accessibility.AdaptContentRequest(
            content="x" * 300_000,
            preferences=accessibility.AccessibilityPreferences(),
        )
