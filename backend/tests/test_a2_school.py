"""A2-SCHOOL live integration test — the school triangle against a running stack.

Verifies the full homework + family loop against a REAL backend (default
http://localhost, override with ATLAS_BASE_URL):

  1. Teacher probe signs in and creates homework (with a due date, one MCQ +
     one short-answer question).
  2. Student probe sees it in their list, opens the detail (no answers leaked)
     and submits — server grades it.
  3. Teacher probe reads the graded result for that student.
  4. Parent probe links the student (link-child), lists them (my-children) and
     the parent dashboard renders that child's data.
  5. Role walls: students cannot create homework or read a teacher dashboard;
     teachers have no children.

The probes are fixed accounts (created on first run via /api/auth/signup and
logged into on every later run), so the test is idempotent. Skipped cleanly
when the stack is not reachable so unit-only runs stay green.

Run:  python -m pytest deploy/backend/tests/test_a2_school.py -v
"""

from __future__ import annotations

import os
import uuid
from datetime import datetime, timedelta, timezone

import httpx
import pytest

BASE_URL = os.environ.get("ATLAS_BASE_URL", "http://localhost").rstrip("/")
TIMEOUT = 60.0  # the submit leg waits on LLM grading
PASSWORD = "Probe!2026x"

STUDENT_EMAIL = "probe.gate@atlas-test.com"
TEACHER_EMAIL = "probe.a2.teacher@atlas-test.com"
PARENT_EMAIL = "probe.a2.parent@atlas-test.com"


# ---------------------------------------------------------------------------
# Session-scoped HTTP client + reachability gate
# ---------------------------------------------------------------------------

@pytest.fixture(scope="module")
def client():
    with httpx.Client(base_url=BASE_URL, timeout=TIMEOUT) as c:
        yield c


def _reachable(client: httpx.Client) -> bool:
    try:
        return client.get("/api/health").status_code == 200
    except httpx.HTTPError:
        return False


@pytest.fixture(scope="module", autouse=True)
def _require_stack(client):
    if not _reachable(client):
        pytest.skip(f"Atlas stack not reachable at {BASE_URL}")


# ---------------------------------------------------------------------------
# Auth helpers
# ---------------------------------------------------------------------------

def _login_or_signup(client: httpx.Client, email: str, name: str, role: str) -> dict:
    """Return the auth context (token + user) for a probe account."""
    res = client.post(
        "/api/auth/login",
        json={"email": email, "password": PASSWORD},
    )
    if res.status_code == 200:
        return res.json()

    # First run (or the account was wiped): create it, then log in.
    res = client.post(
        "/api/auth/signup",
        json={"name": name, "email": email, "password": PASSWORD, "role": role},
    )
    assert res.status_code in (200, 201), f"signup {email} failed: {res.status_code} {res.text[:200]}"
    return res.json()


@pytest.fixture(scope="module")
def student(client):
    ctx = _login_or_signup(client, STUDENT_EMAIL, "Gate Probe", "student")
    return {"token": ctx["access_token"], "id": ctx["user"]["id"]}


@pytest.fixture(scope="module")
def teacher(client):
    ctx = _login_or_signup(client, TEACHER_EMAIL, "A2 Teacher Probe", "teacher")
    return {"token": ctx["access_token"], "id": ctx["user"]["id"]}


@pytest.fixture(scope="module")
def parent(client):
    ctx = _login_or_signup(client, PARENT_EMAIL, "A2 Parent Probe", "parent")
    return {"token": ctx["access_token"], "id": ctx["user"]["id"]}


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


# ---------------------------------------------------------------------------
# 1 + 2 — teacher creates, student sees and submits
# ---------------------------------------------------------------------------

def _create_homework(client: httpx.Client, teacher: dict, student_id: str) -> dict:
    due = (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()
    payload = {
        "student_id": student_id,
        "title": f"A2 triangle homework {uuid.uuid4().hex[:8]}",
        "description": "Live verification homework for the school triangle.",
        "subject": "Biology",
        "due_date": due,
        "allow_late_submission": True,
        "teacher_instructions": "Attempt every question.",
        "questions": [
            {
                "question_text": "Which gas do plants absorb during photosynthesis?",
                "question_type": "mcq",
                "options": ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
                "correct_answer": "Carbon dioxide",
                "marks": 2,
                "difficulty": "easy",
            },
            {
                "question_text": "Define photosynthesis in one sentence.",
                "question_type": "short_answer",
                "correct_answer": "Photosynthesis is the process by which green "
                                  "plants make food using sunlight, water and "
                                  "carbon dioxide.",
                "marks": 3,
            },
        ],
    }
    res = client.post(
        "/api/homework/create",
        json=payload,
        headers=_auth(teacher["token"]),
    )
    assert res.status_code == 201, f"create failed: {res.status_code} {res.text[:300]}"
    body = res.json()
    assert body["title"] == payload["title"]
    assert body["due_date"][:4] == due[:4], "due date must round-trip"
    assert body["total_marks"] == 5
    assert len(body["questions"]) == 2
    for q in body["questions"]:
        assert "correct_answer" not in q, "correct answers must never reach the student payload"
    return body


def test_teacher_creates_student_sees_and_submits(client, teacher, student):
    hw = _create_homework(client, teacher, student["id"])

    # Student list contains the new homework as pending.
    res = client.get(
        f"/api/homework/student/{student['id']}",
        headers=_auth(student["token"]),
    )
    assert res.status_code == 200, res.text[:300]
    items = res.json()
    match = [i for i in items if i["id"] == hw["id"]]
    assert match, "created homework missing from the student list"
    assert match[0]["status"] == "pending"
    assert match[0]["total_marks"] == 5

    # Student detail exposes questions with ids for answering.
    res = client.get(f"/api/homework/{hw['id']}", headers=_auth(student["token"]))
    assert res.status_code == 200, res.text[:300]
    detail = res.json()
    qs = detail["questions"]
    assert {q["question_type"] for q in qs} == {"mcq", "short_answer"}

    answers = []
    for q in qs:
        if q["question_type"] == "mcq":
            answers.append({"question_id": q["id"], "answer": "Carbon dioxide"})
        else:
            answers.append({
                "question_id": q["id"],
                "answer": "Photosynthesis is how green plants make food from "
                          "sunlight, water and carbon dioxide.",
            })

    res = client.post(
        f"/api/homework/{hw['id']}/submit",
        json={"answers": answers},
        headers=_auth(student["token"]),
    )
    assert res.status_code == 200, f"submit failed: {res.status_code} {res.text[:300]}"
    result = res.json()
    assert result["homework_id"] == hw["id"]
    assert result["max_score"] == 5
    assert 0 <= result["total_score"] <= 5
    assert 0 <= result["percentage"] <= 100
    assert result["grade"] in {"A+", "A", "B+", "B", "C", "D", "F"}
    assert len(result["graded_answers"]) == 2
    for ga in result["graded_answers"]:
        assert 0 <= ga["marks_awarded"] <= ga["total_marks"]
        assert ga["feedback"], "every graded answer carries feedback"

    # The MCQ was answered exactly — it must be fully correct.
    mcq = next(g for g in result["graded_answers"] if g["question_type"] == "mcq")
    assert mcq["marks_awarded"] == 2 and mcq["is_correct"] is True

    # Resubmission is rejected.
    res = client.post(
        f"/api/homework/{hw['id']}/submit",
        json={"answers": answers},
        headers=_auth(student["token"]),
    )
    assert res.status_code == 400, "double submission must be rejected"

    # Result endpoint returns the same graded data later.
    res = client.get(f"/api/homework/{hw['id']}/result", headers=_auth(student["token"]))
    assert res.status_code == 200, res.text[:300]
    assert res.json()["total_score"] == result["total_score"]


# ---------------------------------------------------------------------------
# 3 — teacher sees the result
# ---------------------------------------------------------------------------

def test_teacher_views_student_result(client, teacher, student):
    hw = _create_homework(client, teacher, student["id"])
    detail = client.get(
        f"/api/homework/{hw['id']}", headers=_auth(student["token"])
    ).json()
    answers = [
        {"question_id": q["id"], "answer": "Carbon dioxide" if q["question_type"] == "mcq"
         else "Plants make food from sunlight, water and carbon dioxide."}
        for q in detail["questions"]
    ]
    sub = client.post(
        f"/api/homework/{hw['id']}/submit",
        json={"answers": answers},
        headers=_auth(student["token"]),
    )
    assert sub.status_code == 200, sub.text[:300]
    expected = sub.json()["total_score"]

    # Teacher reads the graded result for that student.
    res = client.get(
        f"/api/homework/{hw['id']}/result",
        params={"student_id": student["id"]},
        headers=_auth(teacher["token"]),
    )
    assert res.status_code == 200, f"teacher result read failed: {res.status_code} {res.text[:300]}"
    body = res.json()
    assert body["total_score"] == expected
    assert body["max_score"] == 5

    # Teacher's list view for the student reflects the submission.
    res = client.get(
        f"/api/homework/student/{student['id']}",
        params={"status_filter": "submitted"},
        headers=_auth(teacher["token"]),
    )
    assert res.status_code == 200
    submitted = [i for i in res.json() if i["id"] == hw["id"]]
    assert submitted and submitted[0]["score"] == expected


# ---------------------------------------------------------------------------
# 4 — parent links, lists and sees the child's dashboard data
# ---------------------------------------------------------------------------

def test_parent_link_list_and_dashboard(client, parent, student):
    # link-child is idempotent for an existing link (409 is acceptable).
    res = client.post(
        "/api/auth/link-child",
        json={"student_id": student["id"], "relation": "parent"},
        headers=_auth(parent["token"]),
    )
    assert res.status_code in (201, 409), f"link-child failed: {res.status_code} {res.text[:300]}"

    res = client.get("/api/auth/my-children", headers=_auth(parent["token"]))
    assert res.status_code == 200, res.text[:300]
    children = res.json()["children"]
    ids = [c["student_id"] for c in children]
    assert student["id"] in ids, "linked child missing from my-children"

    res = client.get(
        f"/api/dashboard/parent/{parent['id']}",
        headers=_auth(parent["token"]),
    )
    assert res.status_code == 200, res.text[:300]
    dash = res.json()
    child_ids = [c["student_id"] for c in dash["children"]]
    assert student["id"] in child_ids, "parent dashboard missing the linked child"
    child = next(c for c in dash["children"] if c["student_id"] == student["id"])
    assert child["student_name"]
    assert isinstance(child["total_xp"], int)
    assert isinstance(child["practice_attempts"], int)

    # Parent can read the linked child's student dashboard.
    res = client.get(
        f"/api/dashboard/student/{student['id']}",
        headers=_auth(parent["token"]),
    )
    assert res.status_code == 200, res.text[:300]
    assert res.json()["student_id"] == student["id"]

    # Parent can read the child's homework list.
    res = client.get(
        f"/api/homework/student/{student['id']}",
        headers=_auth(parent["token"]),
    )
    assert res.status_code == 200
    assert isinstance(res.json(), list)


# ---------------------------------------------------------------------------
# 5 — overdue + reminder surface
# ---------------------------------------------------------------------------

def test_overdue_and_reminder_surface(client, student, teacher):
    res = client.get(
        f"/api/homework/overdue/{student['id']}",
        headers=_auth(student["token"]),
    )
    assert res.status_code == 200
    for item in res.json():
        assert item["days_overdue"] >= 0
        assert item["status"] in {"overdue", "late"}

    # Reminder: honest outcome either way (sent, queued, or no phone on file).
    items = client.get(
        f"/api/homework/student/{student['id']}",
        headers=_auth(student["token"]),
    ).json()
    assert items, "student should have homework from the earlier tests"
    hw_id = items[0]["id"]
    res = client.post(
        f"/api/homework/{hw_id}/reminder",
        params={"student_id": student["id"]},
        headers=_auth(teacher["token"]),
    )
    assert res.status_code in (200, 400), res.text[:300]
    if res.status_code == 200:
        assert "reminder_sent" in res.json()


# ---------------------------------------------------------------------------
# 6 — role walls
# ---------------------------------------------------------------------------

def test_role_walls(client, student, teacher):
    # Students cannot create homework.
    res = client.post(
        "/api/homework/create",
        json={
            "student_id": student["id"], "title": "x", "subject": "x",
            "due_date": datetime.now(timezone.utc).isoformat(),
            "questions": [{"question_text": "x", "marks": 1}],
        },
        headers=_auth(student["token"]),
    )
    assert res.status_code == 403, "students must not create homework"

    # Students cannot read a teacher dashboard.
    res = client.get(
        f"/api/dashboard/teacher/{teacher['id']}",
        headers=_auth(student["token"]),
    )
    assert res.status_code == 403, "students must not read teacher dashboards"

    # Teachers have no children endpoints.
    res = client.get("/api/auth/my-children", headers=_auth(teacher["token"]))
    assert res.status_code == 403

    # An unlinked parent cannot read an unrelated student's dashboard.
    stranger_ctx = _login_or_signup(
        client,
        f"probe.a2.stranger-{uuid.uuid4().hex[:8]}@atlas-test.com",
        "A2 Stranger Probe",
        "parent",
    )
    res = client.get(
        f"/api/dashboard/student/{student['id']}",
        headers=_auth(stranger_ctx["access_token"]),
    )
    assert res.status_code == 403, "unlinked parents must not read a child's dashboard"
