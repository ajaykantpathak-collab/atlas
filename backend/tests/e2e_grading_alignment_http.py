# -*- coding: utf-8 -*-
"""E2E: grading alignment over the REAL HTTP API surface.

Boots a FastAPI app carrying the REAL practice router (real selector,
real Postgres question bank — the dev DB the verify instance uses) and
walks full practice sessions over HTTP:

  POST /api/practice/start            -> displayed question list
  POST /api/practice/{id}/submit      -> feedback for EVERY served question

Acceptance (the #1 trust-killer contract):
  for every submission,  feedback["question_id"] == the question_id the
  student was actually shown and answered  — no 500s, session completes.

Run:  cd D:\\platform\\deploy\\backend
      DATABASE_URL=postgresql+asyncpg://... python tests/e2e_grading_alignment_http.py
(full-app dev_verify boot is NOT required: this mounts the practice
router alone, so no corpus-index preload is needed)
"""

import json
import os
import sys

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")
# package-safe import (tests/ has __init__.py; scripts may not run
# from backend/ — try the package first, then the local dir)
try:
    from tests import _db_url
except ImportError:
    import os as _os, sys as _sys
    _sys.path.insert(0, _os.path.dirname(os.path.abspath(__file__)))
    import _db_url

# Postgres dev bank (same DSN dev_verify.cmd pins). Overridable via env.
os.environ.setdefault(
    "DATABASE_URL",
    _db_url.url())

from fastapi import FastAPI  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from backend.api.practice import router as practice_router  # noqa: E402

app = FastAPI()
app.include_router(practice_router)
client = TestClient(app)  # real ASGI stack: HTTP -> pydantic -> endpoint


def _call(method: str, path: str, payload: dict | None = None) -> dict:
    resp = client.request(method, path, json=payload)
    assert resp.status_code in (200, 201), (
        f"{method} {path} -> {resp.status_code}: {resp.text[:300]}")
    return resp.json()


def _walk_session(subject: str, num_questions: int) -> int:
    """Start a REAL session, answer every SERVED question over HTTP;
    assert feedback.question_id == displayed question_id throughout."""
    res = _call("POST", "/api/practice/start", {
        "student_id": "grading-fix-e2e",
        "subject": subject,
        "num_questions": num_questions,
        "class_level": 10,
    })
    sid = res["session_id"]
    assert res["questions"], f"{subject}: no planned questions issued"
    print(f"  [{subject}] session {sid[:8]}.. planned={len(res['questions'])} "
          f"first={res['current_question']['question_id'][:40]}")

    submitted = 0
    current = res["current_question"]
    for _ in range(num_questions + 2):
        qid = current["question_id"]
        assert qid, f"{subject}: served question without an id"
        # a deliberately-wrong answer: alignment is the contract, and the
        # verdict must come back for THIS question id
        r = _call("POST", f"/api/practice/{sid}/submit", {
            "question_id": qid,
            "answer": "!!alignment-probe!!",
            "time_taken_seconds": 5,
        })
        fb = r.get("feedback") or {}
        assert fb.get("question_id") == qid, (
            f"{subject}: submit {qid!r} got feedback for "
            f"{fb.get('question_id')!r} — MISALIGNED GRADING")
        assert isinstance(r.get("is_correct"), bool)
        submitted += 1
        if r.get("is_complete") or not r.get("next_question"):
            break
        current = r["next_question"]
    print(f"  [{subject}] aligned submissions: {submitted}/{num_questions} "
          f"complete={r.get('is_complete')}")
    assert submitted >= 1, f"{subject}: session served nothing"
    return submitted


def main() -> int:
    total = 0
    for subject in ("mathematics", "physics", "biology"):
        total += _walk_session(subject, 5)
    print(f"E2E GRADING ALIGNMENT: PASS ({total} aligned submissions across "
          f"3 subjects on the real bank)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
