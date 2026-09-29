# -*- coding: utf-8 -*-
"""Tests for the two actionable daily digests (adult-guidance plan):

  GET /api/guidance/parent/tonight     — per linked child: one topic to
      practise together, one misconception to listen for, one win.
  GET /api/guidance/teacher/tomorrow   — per OWNED class: the top 7-day trap,
      the 3 students who need it most, a ready remediation opener.

Covered here (per the build contract):
  * parent scoping  — a parent token sees ONLY parent_student_links children;
    another parent's child never appears; non-parent roles get 403.
  * teacher scoping — a class_id must be OWNED by the caller (403 otherwise),
    unknown → 404, malformed → 422, student token → 403.
  * deterministic content — with fixed seeds the digest picks the exact
    most-overdue review item, the most recent tagged trap, and the specific
    mastered topic; two runs return byte-equal JSON.
  * honest empty states — a fresh parent/teacher gets "no data yet" reasons,
    never fabricated numbers or generic praise.
  * display-text hygiene — parent-visible strings carry TITLES only; a node
    id never leaks into a sentence.

No network, no docker: a minimal FastAPI app mounts ONLY the guidance
router over an in-memory SQLite DB seeded with fixed rows; requests carry
real minted JWTs so the full auth dependency chain runs.
"""

from __future__ import annotations

import asyncio
import uuid as uuid_mod
from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict

import httpx
import pytest
import pytest_asyncio  # noqa: F401  (availability guard for CI parity)
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from backend.database import get_db
from backend.models.progress import MasteryRecord, ReviewItem
from backend.models.telemetry import AttemptLog
from backend.models.user import User as UserModel
from backend.routers import guidance as guidance_router
from backend.services import guidance_service as gs
from backend.security import create_access_token


# ---------------------------------------------------------------------------
# Fixed fixture data — everything deterministic, no clocks drifting mid-test
# ---------------------------------------------------------------------------

NOW = datetime.now(timezone.utc)

PARENT_A = "a0a0a0a0-0000-4000-8000-00000000000a"
PARENT_B = "a0a0a0a0-0000-4000-8000-00000000000b"
TEACHER_A = "a0a0a0a0-0000-4000-8000-0000000000a1"
TEACHER_B = "a0a0a0a0-0000-4000-8000-0000000000b2"
ADMIN = "a0a0a0a0-0000-4000-8000-0000000000ad"
CHILD_A = "b1b1b1b1-0000-4000-8000-00000000000a"
CHILD_B = "b1b1b1b1-0000-4000-8000-00000000000b"
CHILD_C = "b1b1b1b1-0000-4000-8000-00000000000c"   # parent B's child
CHILD_D = "b1b1b1b1-0000-4000-8000-00000000000d"   # teacher-A class, no data
S1 = "c2c2c2c2-0000-4000-8000-000000000001"
S2 = "c2c2c2c2-0000-4000-8000-000000000002"
S3 = "c2c2c2c2-0000-4000-8000-000000000003"

CLASS_A_ID = "d4d4d4d4-0000-4000-8000-00000000000a"   # owned by TEACHER_A
CLASS_B_ID = "d4d4d4d4-0000-4000-8000-00000000000b"   # owned by TEACHER_B

NODE_REVIEW_OLD = "c10_bio_cbse_01_001"   # most overdue review item
NODE_REVIEW_NEW = "c10_bio_cbse_01_002"
NODE_TRAP = "c10_chem_cbse_02_001"        # child's most recent tagged trap
NODE_WIN = "c10_phy_cbse_03_001"          # the mastered topic
NODE_MATH = "c10_math_cbse_04_001"        # teacher-side trap node

AUTHORED = {
    NODE_REVIEW_OLD: {
        "title": "Life Processes",
        "listen_for": "AUTHORED-LISTEN: students say plants only respire at night",
        "remediation": "AUTHORED-FIX: Step 1 dark cupboard, Step 2 bright light",
        "question": "AUTHORED-Q: why do plants respire day and night?",
    },
    NODE_REVIEW_NEW: {
        "title": "Nutrition",
        "listen_for": "AUTHORED-LISTEN-2",
        "remediation": "AUTHORED-FIX-2",
        "question": "AUTHORED-Q-2",
    },
    NODE_TRAP: {
        "title": "Balancing Equations",
        "listen_for": "AUTHORED-LISTEN: forgets to balance oxygen last",
        "remediation": "AUTHORED-FIX: count atoms in a table first",
        "question": "AUTHORED-Q: balance Mg + O2",
    },
    NODE_WIN: {
        "title": "Laws of Motion",
        "listen_for": None,
        "remediation": None,
        "question": None,
    },
    NODE_MATH: {
        "title": "Linear Equations",
        "listen_for": "AUTHORED-LISTEN: sign flips when moving terms",
        "remediation": "AUTHORED-FIX: rewrite every move as a zero-sum step",
        "question": "AUTHORED-Q: solve 3x + 2 = 11",
    },
}


def _fake_corpus(node_id: str):
    return AUTHORED.get(node_id)


@pytest.fixture(autouse=True)
def stub_corpus(monkeypatch):
    """Deterministic authored text — the real 14k-file corpus is not a test
    dependency. One test below re-enables the honest-None path."""
    monkeypatch.setattr(gs, "_load_corpus_node", _fake_corpus)


# ---------------------------------------------------------------------------
# App + DB harness
# ---------------------------------------------------------------------------

def _mk_user(uid: str, role: str, name: str, class_level=None) -> UserModel:
    return UserModel(
        id=uuid_mod.UUID(uid), email=f"{name.replace(' ', '.').lower()}@t.test",
        name=name, role=role, class_level=class_level,
        is_active=True, is_verified=True,
    )


async def _seed(db) -> None:
    users = [
        _mk_user(PARENT_A, "parent", "Parent A"),
        _mk_user(PARENT_B, "parent", "Parent B"),
        _mk_user(TEACHER_A, "teacher", "Teacher A"),
        _mk_user(TEACHER_B, "teacher", "Teacher B"),
        _mk_user(ADMIN, "admin", "Admin"),
        _mk_user(CHILD_A, "student", "Child A", class_level=10),
        _mk_user(CHILD_B, "student", "Child B", class_level=10),
        _mk_user(CHILD_C, "student", "Child C", class_level=9),
        _mk_user(CHILD_D, "student", "Child D", class_level=10),
        _mk_user(S1, "student", "Student One", class_level=10),
        _mk_user(S2, "student", "Student Two", class_level=10),
        _mk_user(S3, "student", "Student Three", class_level=10),
    ]
    for u in users:
        db.add(u)
    await db.flush()

    from backend.services.auth_service import ParentStudentLinkModel, TeacherClassModel
    from backend.api.teacher import ClassEnrollmentModel

    db.add(ParentStudentLinkModel(parent_id=uuid_mod.UUID(PARENT_A),
                                  student_id=uuid_mod.UUID(CHILD_A)))
    db.add(ParentStudentLinkModel(parent_id=uuid_mod.UUID(PARENT_A),
                                  student_id=uuid_mod.UUID(CHILD_B)))
    db.add(ParentStudentLinkModel(parent_id=uuid_mod.UUID(PARENT_B),
                                  student_id=uuid_mod.UUID(CHILD_C)))

    db.add(TeacherClassModel(id=uuid_mod.UUID(CLASS_A_ID), teacher_id=uuid_mod.UUID(TEACHER_A),
                             class_name="Class 10 A", section="A", subject="Science"))
    db.add(TeacherClassModel(id=uuid_mod.UUID(CLASS_B_ID), teacher_id=uuid_mod.UUID(TEACHER_B),
                             class_name="Class 10 B", section="B", subject="Maths"))
    await db.flush()

    for sid, roll in [(CHILD_A, 1), (CHILD_B, 2), (S1, 3), (S2, 4), (S3, 5)]:
        db.add(ClassEnrollmentModel(class_id=uuid_mod.UUID(CLASS_A_ID),
                                    student_id=uuid_mod.UUID(sid), roll_number=roll))
    db.add(ClassEnrollmentModel(class_id=uuid_mod.UUID(CLASS_B_ID),
                                student_id=uuid_mod.UUID(CHILD_D), roll_number=1))
    await db.flush()

    # ── CHILD_A: two review items (most-overdue must win deterministically),
    #    one mastered topic, one most-recent tagged trap, one stale trap.
    db.add(ReviewItem(user_id=uuid_mod.UUID(CHILD_A), node_id=NODE_REVIEW_OLD,
                      concept_name="life processes", easiness_factor=2.5,
                      interval_days=1, repetitions=2,
                      next_review_date=date.today() - timedelta(days=5)))
    db.add(ReviewItem(user_id=uuid_mod.UUID(CHILD_A), node_id=NODE_REVIEW_NEW,
                      concept_name="nutrition", easiness_factor=2.5,
                      interval_days=1, repetitions=1,
                      next_review_date=date.today() - timedelta(days=2)))
    db.add(MasteryRecord(user_id=uuid_mod.UUID(CHILD_A), node_id=NODE_WIN,
                         mastery_probability=0.92, p_known=0.92, attempts=7,
                         last_attempt_at=NOW - timedelta(days=1)))
    db.add(AttemptLog(student_id=CHILD_A, node_id=NODE_TRAP,
                      misconception_id="mis_mc_01", is_correct=False,
                      created_at=NOW - timedelta(hours=6)))
    db.add(AttemptLog(student_id=CHILD_A, node_id=NODE_TRAP,
                      misconception_id="mis_mc_02", is_correct=False,
                      created_at=NOW - timedelta(days=9)))   # stale trap

    # ── CHILD_B: no review items → next-best fallback (weakest below floor),
    #    one mastered win, no traps.
    db.add(MasteryRecord(user_id=uuid_mod.UUID(CHILD_B), node_id=NODE_REVIEW_OLD,
                         mastery_probability=0.41, p_known=0.41, attempts=2,
                         last_attempt_at=NOW - timedelta(days=2)))
    db.add(MasteryRecord(user_id=uuid_mod.UUID(CHILD_B), node_id=NODE_WIN,
                         mastery_probability=0.88, p_known=0.88, attempts=9,
                         last_attempt_at=NOW - timedelta(days=3)))

    # ── CHILD_C (parent B's child): review item overdue → proves the digests
    #    of the two parents never cross.
    db.add(ReviewItem(user_id=uuid_mod.UUID(CHILD_C), node_id=NODE_REVIEW_NEW,
                      concept_name="nutrition", easiness_factor=2.5,
                      interval_days=1, repetitions=0,
                      next_review_date=date.today() - timedelta(days=1)))

    # ── Teacher class A traps: NODE_MATH/mis_sign flips is the top trap.
    def att(student, node, mid, correct, days_ago, hours=0):
        return AttemptLog(student_id=student, node_id=node, misconception_id=mid,
                          is_correct=correct,
                          created_at=NOW - timedelta(days=days_ago, hours=hours))
    db.add(att(S1, NODE_MATH, "mis_sign_flip", False, 1))
    db.add(att(S1, NODE_MATH, "mis_sign_flip", False, 2))
    db.add(att(S2, NODE_MATH, "mis_sign_flip", False, 3))
    db.add(att(S3, NODE_MATH, "mis_sign_flip", True, 1))       # correct — not a burn
    db.add(att(S2, NODE_TRAP, "mis_oz_once", False, 4))         # fewer hits
    db.add(att(S1, NODE_MATH, "mis_sign_flip", False, 9))       # outside the 7-day window
    await db.commit()


@pytest.fixture()
def api_client(monkeypatch):
    """A minimal app mounting ONLY the guidance router over seeded SQLite."""
    async def _build():
        engine = create_async_engine("sqlite+aiosqlite:///:memory:")
        from backend.database import Base as CoreBase
        from backend.services.auth_service import ParentStudentLinkModel, TeacherClassModel  # noqa: F401
        from backend.api.teacher import ClassEnrollmentModel  # noqa: F401

        async with engine.begin() as conn:
            await conn.run_sync(CoreBase.metadata.create_all)
        maker = async_sessionmaker(engine, expire_on_commit=False)
        async with maker() as db:
            await _seed(db)

        async def _override_get_db():
            async with maker() as session:
                yield session

        app = FastAPI()
        app.include_router(guidance_router.router)
        app.dependency_overrides[get_db] = _override_get_db
        transport = httpx.ASGITransport(app=app)
        return httpx.AsyncClient(transport=transport, base_url="http://test")
    return _build


def _token(uid: str) -> str:
    return create_access_token({"sub": uid})


def _run(api_client, method: str, url: str, token: str | None = None) -> httpx.Response:
    async def _go():
        client = await api_client()
        try:
            headers = {"Authorization": f"Bearer {_token(token)}"} if token else {}
            return await client.request(method, url, headers=headers)
        finally:
            await client.aclose()
    return asyncio.run(_go())


def _get(api_client, url: str, token: str | None = None) -> httpx.Response:
    return _run(api_client, "GET", url, token)


# ---------------------------------------------------------------------------
# 1. Parent scoping
# ---------------------------------------------------------------------------

def test_parent_sees_only_linked_children(api_client):
    r = _get(api_client, "/api/guidance/parent/tonight", PARENT_A)
    assert r.status_code == 200
    body = r.json()
    ids = [c["student_id"] for c in body["children"]]
    assert ids == [CHILD_A, CHILD_B], "parent A must see exactly their own links, in link order"
    assert CHILD_C not in ids and CHILD_D not in ids

    r2 = _get(api_client, "/api/guidance/parent/tonight", PARENT_B)
    assert r2.status_code == 200
    ids2 = [c["student_id"] for c in r2.json()["children"]]
    assert ids2 == [CHILD_C]
    assert CHILD_A not in ids2, "a parent must never see another parent's child"


def test_parent_digest_rejects_other_roles_and_anonymous(api_client):
    assert _get(api_client, "/api/guidance/parent/tonight", CHILD_A).status_code == 403
    assert _get(api_client, "/api/guidance/parent/tonight", TEACHER_A).status_code == 403
    assert _get(api_client, "/api/guidance/parent/tonight", None).status_code == 401


def test_teacher_tomorrow_rejects_wrong_role_and_anonymous(api_client):
    assert _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}",
                S1).status_code == 403
    assert _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}",
                PARENT_A).status_code == 403
    assert _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}",
                None).status_code == 401


# ---------------------------------------------------------------------------
# 2. Teacher scoping
# ---------------------------------------------------------------------------

def test_teacher_tomorrow_scoped_to_owned_class(api_client):
    ok = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}", TEACHER_A)
    assert ok.status_code == 200
    assert ok.json()["class_id"] == CLASS_A_ID

    other = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_B_ID}", TEACHER_A)
    assert other.status_code == 403, "a teacher must not read another teacher's class"

    reverse = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}", TEACHER_B)
    assert reverse.status_code == 403

    admin = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}", ADMIN)
    assert admin.status_code == 200, "admin may read any class"

    assert _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={uuid_mod.uuid4()}",
                TEACHER_A).status_code == 404
    assert _get(api_client, "/api/guidance/teacher/tomorrow?class_id=not-a-uuid",
                TEACHER_A).status_code == 422


def test_teacher_tomorrow_roster_is_enrollment_scoped(api_client):
    """The focus + top-students lists only ever draw on the class roster."""
    body = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}",
                TEACHER_A).json()
    assert body["roster_size"] == 5
    names = {s["name"] for s in body["focus"]["top_students"]}
    assert names <= {"Student One", "Student Two", "Student Three"}
    assert "Child D" not in names, "CHILD_D is enrolled elsewhere — must never leak in"


# ---------------------------------------------------------------------------
# 3. Deterministic content given fixed data
# ---------------------------------------------------------------------------

def test_parent_tonight_picks_exact_items(api_client):
    body = _get(api_client, "/api/guidance/parent/tonight", PARENT_A).json()
    assert body["expected_minutes"] == 10
    child = next(c for c in body["children"] if c["student_id"] == CHILD_A)

    # (a) the MOST overdue review item wins (5 days overdue, not 2)
    assert child["practice"]["kind"] == "review"
    assert child["practice"]["title"] == "Life Processes"
    assert child["practice"]["overdue_days"] == 5
    assert child["practice"]["reason"] == "Review is 5 days overdue"

    # (b) the MOST RECENT tagged trap, with authored phrasing to listen for
    assert child["misconception"]["title"] == "Balancing Equations"
    assert child["misconception"]["listen_for"] == \
        "AUTHORED-LISTEN: forgets to balance oxygen last"
    assert child["misconception"]["misconception_id"] == "mis_mc_01"

    # (c) a SPECIFIC win — the mastered topic, not generic praise
    assert child["win"]["kind"] == "mastered_topic"
    assert child["win"]["title"] == "Laws of Motion"
    assert "92%" in child["win"]["detail"]

    # (d) fixed expected time
    assert child["expected_minutes"] == 10


def test_parent_tonight_is_deterministic(api_client):
    a = _get(api_client, "/api/guidance/parent/tonight", PARENT_A).json()
    b = _get(api_client, "/api/guidance/parent/tonight", PARENT_A).json()
    a.pop("date"), b.pop("date")
    assert a == b, "the same records must always produce the same digest"


def test_parent_tonight_next_best_fallback_when_no_reviews(api_client):
    """CHILD_B has no review items → the weakest prereq-gated topic must be
    the practice pick (mastery 0.41, not the 0.88 one)."""
    body = _get(api_client, "/api/guidance/parent/tonight", PARENT_A).json()
    child = next(c for c in body["children"] if c["student_id"] == CHILD_B)
    assert child["practice"]["kind"] == "ready_to_learn"
    assert child["practice"]["title"] == "Life Processes"
    assert child["practice"]["mastery"] == 0.41
    # honest trap absence — never a fabricated misconception
    assert child["misconception"] is None
    # the win still names the specific mastered topic
    assert child["win"]["title"] == "Laws of Motion"


def test_teacher_tomorrow_picks_top_trap_with_openers(api_client):
    body = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}",
                TEACHER_A).json()
    assert body["has_data"] is True
    focus = body["focus"]
    assert focus["misconception_id"] == "mis_sign_flip"
    assert focus["node_id"] == NODE_MATH
    assert focus["node_title"] == "Linear Equations"
    assert focus["hits_7d"] == 4, "4 tagged in-window attempts (9-day-old excluded; 1 was correct)"
    assert focus["wrong_7d"] == 3, "3 in-window WRONG answers — the actual burns"
    assert focus["students_burned"] == 2, "the correct attempt is not a burn"
    assert focus["question_pattern"] == "AUTHORED-Q: solve 3x + 2 = 11"
    assert focus["wrong_pattern"] == "AUTHORED-LISTEN: sign flips when moving terms"
    assert focus["remediation_opener"] == \
        "AUTHORED-FIX: rewrite every move as a zero-sum step"

    top = focus["top_students"]
    assert [t["name"] for t in top] == ["Student One", "Student Two"], \
        "ranked by wrong count; correct answers never count as burns"
    assert top[0]["wrong_count"] == 2 and top[1]["wrong_count"] == 1
    assert len(top) <= 3


def test_teacher_tomorrow_is_deterministic(api_client):
    url = f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}"
    a = _get(api_client, url, TEACHER_A).json()
    b = _get(api_client, url, TEACHER_A).json()
    assert a == b


def test_teacher_window_excludes_stale_traps(api_client):
    """The 9-day-old mis_sign_flip hit must not inflate the 7-day counts."""
    body = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_A_ID}",
                TEACHER_A).json()
    assert body["focus"]["hits_7d"] == 4
    assert body["focus"]["wrong_7d"] == 3


# ---------------------------------------------------------------------------
# 4. Honest empty states
# ---------------------------------------------------------------------------

def test_new_parent_gets_honest_empty_state(api_client):
    lonely = _mk_user("e5e5e5e5-0000-4000-8000-00000000000e", "parent", "Lonely Parent")
    async def _extra():
        engine = create_async_engine("sqlite+aiosqlite:///:memory:")
        from backend.database import Base as CoreBase
        from backend.services.auth_service import ParentStudentLinkModel  # noqa: F401
        from backend.services.auth_service import TeacherClassModel  # noqa: F401
        from backend.api.teacher import ClassEnrollmentModel  # noqa: F401
        async with engine.begin() as conn:
            await conn.run_sync(CoreBase.metadata.create_all)
        maker = async_sessionmaker(engine, expire_on_commit=False)
        async with maker() as db:
            db.add(lonely)
            await db.commit()

        async def _override():
            async with maker() as session:
                yield session

        app = FastAPI()
        app.include_router(guidance_router.router)
        app.dependency_overrides[get_db] = _override
        transport = httpx.ASGITransport(app=app)
        client = httpx.AsyncClient(transport=transport, base_url="http://test")
        try:
            r = await client.get("/api/guidance/parent/tonight", headers={
                "Authorization": f"Bearer {_token(str(lonely.id))}"})
            return r.json()
        finally:
            await client.aclose()
            await engine.dispose()
    body = asyncio.run(_extra())
    assert body["has_data"] is False
    assert body["children"] == []
    assert "linked" in body["message"].lower(), "the digest must SAY the account has no links"


def test_child_without_data_is_honest_not_fabricated(api_client):
    """CHILD_D is linked to a class but has no records at all."""
    lonely_parent = _mk_user("e6e6e6e6-0000-4000-8000-00000000000e", "parent",
                             "D Parent")
    async def _extra():
        engine = create_async_engine("sqlite+aiosqlite:///:memory:")
        from backend.database import Base as CoreBase
        from backend.services.auth_service import ParentStudentLinkModel  # noqa: F401
        from backend.services.auth_service import TeacherClassModel  # noqa: F401
        from backend.api.teacher import ClassEnrollmentModel  # noqa: F401
        async with engine.begin() as conn:
            await conn.run_sync(CoreBase.metadata.create_all)
        maker = async_sessionmaker(engine, expire_on_commit=False)
        async with maker() as db:
            db.add(lonely_parent)
            db.add(_mk_user(CHILD_D, "student", "Child D", class_level=10))
            await db.flush()
            db.add(ParentStudentLinkModel(parent_id=lonely_parent.id,
                                          student_id=uuid_mod.UUID(CHILD_D)))
            await db.commit()

        async def _override():
            async with maker() as session:
                yield session

        app = FastAPI()
        app.include_router(guidance_router.router)
        app.dependency_overrides[get_db] = _override
        transport = httpx.ASGITransport(app=app)
        client = httpx.AsyncClient(transport=transport, base_url="http://test")
        try:
            r = await client.get("/api/guidance/parent/tonight", headers={
                "Authorization": f"Bearer {_token(str(lonely_parent.id))}"})
            return r.json()
        finally:
            await client.aclose()
            await engine.dispose()
    body = asyncio.run(_extra())
    assert body["children"][0]["has_data"] is False
    assert body["children"][0]["practice"] is None
    assert body["children"][0]["misconception"] is None
    assert body["children"][0]["win"] is None
    assert "not enough recorded" in body["children"][0]["message"].lower()


def test_empty_class_gets_honest_teacher_state(api_client):
    """CLASS_B has a roster of one (CHILD_D) with zero tagged attempts — the
    panel must say so, never invent a focus."""
    body = _get(api_client, f"/api/guidance/teacher/tomorrow?class_id={CLASS_B_ID}",
                TEACHER_B).json()
    assert body["has_data"] is False
    assert body["focus"] is None
    assert body["roster_size"] == 1
    assert "no misconception-tagged attempts" in body["message"].lower()


def test_corpus_miss_is_honest_not_placeholder(api_client, monkeypatch):
    """When the corpus has no authored text the digest degrades to honest
    fallback labels — never a bare node id shown to a parent."""
    monkeypatch.setattr(gs, "_load_corpus_node", lambda nid: None)
    body = _get(api_client, "/api/guidance/parent/tonight", PARENT_A).json()
    child = next(c for c in body["children"] if c["student_id"] == CHILD_A)
    assert child["practice"]["title"] == "life processes"  # authored concept_name fallback
    assert NODE_REVIEW_OLD not in (child["practice"]["title"] or "")
    assert child["win"] is None, "a win without a corpus title must be dropped, not shown as an id"


# ---------------------------------------------------------------------------
# 5. Display-text hygiene + wiring
# ---------------------------------------------------------------------------

def test_parent_visible_text_never_carries_node_ids(api_client):
    body = _get(api_client, "/api/guidance/parent/tonight", PARENT_A).json()

    def strings(x):
        if isinstance(x, str):
            yield x
        elif isinstance(x, dict):
            for k, v in x.items():
                if k in {"node_id", "student_id", "misconception_id", "parent_id"}:
                    continue  # opaque fetch-key fields, allowed
                yield from strings(v)
        elif isinstance(x, list):
            for v in x:
                yield from strings(v)

    visible = list(strings(body))
    assert visible, "digest should carry text"
    for s in visible:
        for nid in AUTHORED:
            assert nid not in s, f"node id {nid} leaked into parent-visible text: {s!r}"


def test_guidance_routes_carry_the_auth_guard():
    """Wiring regression: both endpoints must sit behind get_current_user —
    deleting the dependency would silently make the digests anonymous."""
    from fastapi.params import Depends as DependsClass

    for endpoint in (guidance_router.parent_tonight, guidance_router.teacher_tomorrow):
        deps = [p.default.dependency for p in
                inspect_signature(endpoint).parameters.values()
                if isinstance(p.default, DependsClass)]
        from backend.deps import get_current_user as _gcu
        assert _gcu in deps, f"{endpoint.__name__} lost its auth dependency"


def inspect_signature(func):
    import inspect
    return inspect.signature(func)
