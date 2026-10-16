"""test_slugmap_post.py -- POST /api/content/slugmap parity with GET.

Run:
      cd D:\platform\deploy
      python -m pytest backend/tests/test_slugmap_post.py -q

Why: the learn page builds GET /api/content/slugmap?ids=<CSV>; large id
sets overflow the proxy request-target limit (431).  The POST twin takes
{ "ids": [...] } in the body with the same 500 cap, same cache path and
same response shape.
"""

import sys

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

import pytest  # noqa: E402
from fastapi import FastAPI  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from backend.database import get_db  # noqa: E402
from backend.routers.content import router  # noqa: E402


async def _dead_db():
    """No DB in the unit tier -- a session whose execute() always fails,
    so the endpoint exercises its degrade-to-{} path (augment index may
    still resolve ids; the assertions below are shape- only)."""

    class _Dead:
        async def execute(self, *a, **k):
            raise RuntimeError("unit test: no db")

    yield _Dead()


@pytest.fixture(scope="module")
def client():
    app = FastAPI()
    app.include_router(router)
    app.dependency_overrides[get_db] = _dead_db
    with TestClient(app) as c:
        yield c


IDS = ["c10_sci_physics_light", "c9_math_quad", "c8_eng_tenses"]


def test_get_slugmap_shape(client):
    r = client.get("/api/content/slugmap", params={"ids": ",".join(IDS)})
    assert r.status_code == 200, r.text
    body = r.json()
    assert isinstance(body, dict)
    for k, v in body.items():
        assert set(v.keys()) <= {"slug", "title"}


def test_post_slugmap_parity(client):
    g = client.get("/api/content/slugmap", params={"ids": ",".join(IDS)})
    p = client.post("/api/content/slugmap", json={"ids": IDS})
    assert g.status_code == 200 and p.status_code == 200
    assert p.json() == g.json(), "POST must return the same map as GET"


def test_post_rejects_over_500(client):
    p = client.post("/api/content/slugmap",
                    json={"ids": [f"n{i}" for i in range(501)]})
    assert p.status_code == 422


def test_post_rejects_empty(client):
    p = client.post("/api/content/slugmap", json={"ids": []})
    assert p.status_code == 422


def test_post_rejects_missing_body(client):
    p = client.post("/api/content/slugmap", json={})
    assert p.status_code == 422
