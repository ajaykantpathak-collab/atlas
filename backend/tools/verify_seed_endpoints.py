"""Verify the seeded assessment (exams / quiz) and graph endpoints via
FastAPI TestClient against the local SQLite platform database.

Run:
    PLATFORM_DATABASE_URL=sqlite+aiosqlite:///<repo>/backend_local.db \
        python -m backend.tools.verify_seed_endpoints

Exits non-zero if any expected endpoint returns an empty payload.
"""

from __future__ import annotations

import os
import sys

_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))
os.environ.setdefault(
    "PLATFORM_DATABASE_URL",
    "sqlite+aiosqlite:///"
    + os.path.join(_REPO_ROOT, "backend_local.db").replace("\\", "/"),
)

import sqlite3

from fastapi import FastAPI
from fastapi.testclient import TestClient


def _db_path() -> str:
    url = os.environ["PLATFORM_DATABASE_URL"]
    if "///" in url:
        return url.split("///", 1)[1]
    return os.path.join(_REPO_ROOT, "backend_local.db").replace("\\", "/")


def _pick_targets() -> dict:
    con = sqlite3.connect(_db_path())
    cur = con.cursor()
    exam_id = cur.execute(
        "SELECT exam_id FROM exams WHERE is_published = 1 AND exam_id LIKE 'bq-c%' "
        "ORDER BY class_level DESC LIMIT 1"
    ).fetchone()[0]
    quiz_node = cur.execute(
        "SELECT node_id FROM quiz_questions GROUP BY node_id "
        "ORDER BY COUNT(*) DESC LIMIT 1"
    ).fetchone()[0]
    prereq_node = cur.execute(
        "SELECT node_id FROM knowledge_nodes WHERE prerequisites IS NOT NULL "
        "AND prerequisites NOT IN ('[]', 'null', '') AND class_level BETWEEN 6 AND 12 "
        "LIMIT 1"
    ).fetchone()[0]
    con.close()
    return {"exam_id": exam_id, "quiz_node": quiz_node, "prereq_node": prereq_node}


class _StubUser:
    """Minimal stand-in for the authenticated user dependency."""

    id = "262d3de5-4045-4e9b-985c-81a96fec4b47"  # demo user present in DB
    email = "demo@dreamapp.in"
    is_active = True


def main() -> None:
    from backend.deps import get_current_user
    from backend.routers.assessment import router as assessment_router
    from backend.routers.graph import router as graph_router

    app = FastAPI()
    app.include_router(assessment_router)
    app.include_router(graph_router)
    app.dependency_overrides[get_current_user] = lambda: _StubUser()

    targets = _pick_targets()
    print(f"Targets: {targets}")

    failures: list[str] = []

    def check(label: str, cond: bool, detail: str = "") -> None:
        mark = "PASS" if cond else "FAIL"
        print(f"[{mark}] {label} {detail}")
        if not cond:
            failures.append(label)

    with TestClient(app) as client:
        # ---- Assessment: exams list ------------------------------------
        r = client.get("/api/assessment/exams")
        body = r.json()
        check("GET /api/assessment/exams", r.status_code == 200 and len(body.get("exams", [])) > 0,
              f"status={r.status_code} exams={len(body.get('exams', []))}")
        sample = (body.get("exams") or [{}])[0]
        print("   sample exam row:", sample)

        r = client.get("/api/assessment/exams", params={"class_level": 10})
        body = r.json()
        check("GET /api/assessment/exams?class_level=10",
              r.status_code == 200 and len(body.get("exams", [])) > 0,
              f"exams={len(body.get('exams', []))}")

        # ---- Assessment: exam detail ------------------------------------
        r = client.get(f"/api/assessment/exams/{targets['exam_id']}")
        body = r.json()
        check("GET /api/assessment/exams/{exam_id}",
              r.status_code == 200 and len(body.get("sections", [])) > 0,
              f"status={r.status_code} sections={len(body.get('sections', []))} "
              f"title={body.get('title')}")
        qcount = sum(len(s.get("questions", [])) for s in body.get("sections", []))
        print(f"   detail questions total: {qcount}")

        # ---- Assessment: quiz -------------------------------------------
        r = client.get(f"/api/assessment/quiz/{targets['quiz_node']}")
        body = r.json()
        check("GET /api/assessment/quiz/{node_id}",
              r.status_code == 200 and len(body) > 0,
              f"status={r.status_code} questions={len(body)}")
        if body:
            q0 = body[0]
            print("   sample quiz question:", q0.get("node_id"), q0.get("question", "")[:70])

        # ---- Graph -------------------------------------------------------
        r = client.get("/api/graph/stats")
        body = r.json()
        check("GET /api/graph/stats", r.status_code == 200 and body.get("total_nodes", 0) > 0,
              f"status={r.status_code} stats={body}")

        r = client.get("/api/graph/class/10", params={"subject": "physics"})
        body = r.json()
        check("GET /api/graph/class/10?subject=physics",
              r.status_code == 200 and body.get("count", 0) > 0,
              f"nodes={body.get('count')}")

        r = client.get("/api/graph/visualize", params={"class_level": 11, "subject": "maths"})
        body = r.json()
        check("GET /api/graph/visualize?class_level=11&subject=maths",
              r.status_code == 200 and len(body.get("nodes", [])) > 0 and len(body.get("edges", [])) > 0,
              f"nodes={len(body.get('nodes', []))} edges={len(body.get('edges', []))}")

        r = client.get(f"/api/graph/prerequisites/{targets['prereq_node']}")
        body = r.json()
        check("GET /api/graph/prerequisites/{node_id}",
              r.status_code == 200 and body.get("count", 0) > 0,
              f"prereqs={body.get('count')}")

        r = client.get("/api/graph/search", params={"q": "light"})
        body = r.json()
        check("GET /api/graph/search?q=light",
              r.status_code == 200 and body.get("count", 0) > 0,
              f"matches={body.get('count')}")

        r = client.get(f"/api/graph/node/{targets['prereq_node']}")
        body = r.json()
        check("GET /api/graph/node/{node_id}",
              r.status_code == 200 and body.get("node", {}).get("node_id") == targets["prereq_node"],
              f"status={r.status_code}")

    if failures:
        print(f"\n{len(failures)} check(s) FAILED: {failures}")
        sys.exit(1)
    print("\nAll endpoint checks passed.")


if __name__ == "__main__":
    main()
