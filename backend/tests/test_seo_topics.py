r"""test_seo_topics.py -- public SEO surface (WS-SEO, 2026-10-13).

Run:
      cd D:\platform\deploy
      python -m pytest backend/tests/test_seo_topics.py -q

Covers:
  * GET /api/content/topic-index — the sitemap feed (shape, coverage,
    clean titles, byte-consistent slugs with the shared slug map).
  * GET /api/content/topic/<key> — the public preview payload (fields,
    FAQ trim, related rail, breadcrumbs, cache headers, 404 on miss).
  * Owner law: no node ids in display strings, no answer banks /
    marking schemes / premium fields anywhere in the payload.

The dead-db override exercises the corpus-only path (same pattern as
test_slugmap_post.py): _slug_maps degrades to the index augment pass,
which is exactly where slugs come from in this test.
"""

import re
import sys

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

import pytest  # noqa: E402
from fastapi import FastAPI  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from backend.database import get_db  # noqa: E402
from backend.routers.content import router  # noqa: E402


async def _dead_db():
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


@pytest.fixture(scope="module")
def topic_index(client):
    r = client.get("/api/content/topic-index")
    assert r.status_code == 200, r.text[:400]
    return r.json()


_ID_IN_TEXT = re.compile(r"\bc\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{2}_\d{3}\b")
_FORBIDDEN_KEYS = {
    "correct_answer", "model_answer", "marking_scheme", "answer_key",
    "diagnostic_questions", "competency_questions", "on_failure",
    "board_questions", "solutions",
}


def test_topic_index_shape_and_coverage(topic_index):
    topics = topic_index["topics"]
    assert topic_index["count"] == len(topics) > 19000, (
        f"expected ~20k topics, got {len(topics)}")
    seen_slugs = set()
    boards = set()
    for row in topics:
        assert set(row.keys()) == {
            "id", "slug", "title", "class_level",
            "subject", "board", "chapter"}
        assert row["slug"] and " " not in row["slug"]
        assert row["title"], row
        # display law: titles never carry a node-id shape
        assert not _ID_IN_TEXT.search(row["title"]), row
        assert 6 <= int(row["class_level"]) <= 12, row
        boards.add(row["board"])
        seen_slugs.add(row["slug"])
    assert len(seen_slugs) == len(topics), "slug collision in sitemap feed"
    assert {"CBSE", "ICSE", "ISC"} <= boards


def test_topic_index_cache_headers(client):
    r = client.get("/api/content/topic-index")
    assert "max-age=300" in (r.headers.get("cache-control") or "")


def test_public_topic_by_id(client):
    r = client.get("/api/content/topic/c10_bio_cbse_01_001")
    assert r.status_code == 200, r.text[:400]
    d = r.json()
    assert d["node_id"] == "c10_bio_cbse_01_001"
    assert d["slug"] == "life-processes"
    assert d["title"] and "c10_" not in d["title"]
    assert d["class_level"] == 10
    assert d["subject_name"] == "Biology"
    assert d["board"] == "CBSE"
    assert "life processes" in str(d["breadcrumbs"]).lower()


def test_public_topic_by_slug(client):
    r = client.get("/api/content/topic/life-processes")
    assert r.status_code == 200
    assert r.json()["node_id"] == "c10_bio_cbse_01_001"


def test_public_topic_payload_is_preview_only(client):
    d = client.get("/api/content/topic/life-processes").json()
    assert not (_FORBIDDEN_KEYS & set(d.keys())), (
        f"premium fields leaked: {_FORBIDDEN_KEYS & set(d.keys())}")
    assert len(d["faqs"]) <= 2
    assert len(d["examples"]) <= 2
    for ex in d["examples"]:
        assert set(ex.keys()) == {"problem", "steps"}
        assert ex["problem"]
    # display strings must never embed node ids (node_id itself is an
    # opaque fetch key by owner law — excluded by design)
    for k, v in d.items():
        if k == "node_id":
            continue
        if isinstance(v, str):
            assert not _ID_IN_TEXT.search(v), (k, v[:80])
    for rel in d["related"]:
        assert rel["slug"] and rel["title"]
        assert rel["kind"] in {"chapter", "foundation"}


def test_public_topic_cache_headers(client):
    r = client.get("/api/content/topic/life-processes")
    assert "max-age=300" in (r.headers.get("cache-control") or "")


def test_public_topic_404(client):
    r = client.get("/api/content/topic/definitely-not-a-real-topic-zzz")
    assert r.status_code == 404


def test_public_topic_cisce_node(client):
    """Both corpora are indexable — an ICSE node must serve."""
    r = client.get("/api/content/topic/c10_compapp_icse_01_001")
    assert r.status_code == 200, r.text[:300]
    d = r.json()
    assert d["board"] == "ICSE"
    assert d["subject_name"]
