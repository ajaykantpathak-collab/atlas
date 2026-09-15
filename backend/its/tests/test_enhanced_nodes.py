"""test_enhanced_nodes.py -- TEACHING CONTENT layer (enhanced nodes).

Covers:
* parser correctness on 3 real corpus files (c10_bio_cbse_01_001,
  c6_biology_ch06_001, c11_math_cbse_01_001),
* the enhanced_nodes API router (200s via TestClient),
* malformed-file tolerance (skip + count, never raise),
* the tutor-graph hook (/stats "teaching_nodes", /teach card).

Real-corpus tests skip cleanly when the md_cache dir is absent so the
suite stays green on machines without the corpus.
"""

from __future__ import annotations

import os
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.api import enhanced_nodes as enhanced_nodes_api
from backend.api.enhanced_nodes import router as enhanced_nodes_router
from backend.services.enhanced_nodes import (
    DEFAULT_MD_DIR,
    build_index,
    parse_filename,
    parse_node_file,
    split_misconception,
)

MD_DIR = Path(DEFAULT_MD_DIR)
HAS_CORPUS = MD_DIR.is_dir()

REAL_NODE = "c10_bio_cbse_01_001"


def _md_path(name: str) -> Path:
    return MD_DIR / name


# ---------------------------------------------------------------------------
# Fixtures: a small synthetic corpus incl. malformed files
# ---------------------------------------------------------------------------

GOOD_CBSE = """## DEFINITION
Velocity is the rate of change of displacement with respect to time.

## COGNITIVE_LEVEL
remember

## MASTERY_CRITERIA
The student can state the definition and compute v = d/t.

## SCOPE_BOUNDARY
Covers average velocity only; does NOT cover instantaneous velocity.

## WALKTHROUGH
Walk through a bus trip: 100 m in 20 s means v = 5 m/s.

## DIAGNOSTIC_QUESTION_1
A car covers 150 m in 10 s. What is its average velocity?

## DIAGNOSTIC_ANSWER_1
v = 150/10 = 15 m/s. A wrong answer (e.g., 15 m without the unit or
direction) reveals that the student treats velocity as a scalar and
forgets displacement is a vector with direction.

## DIAGNOSTIC_QUESTION_2
Why is velocity called a vector quantity?

## DIAGNOSTIC_ANSWER_2
Because it has both magnitude and direction. A poor answer says "because
it is fast", which confuses speed with velocity entirely.
"""

GOOD_LEGACY = """## DEFINITION
Fractions represent equal parts of a whole.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can shade 3/4 of a shape and compare two fractions.

## SCOPE_BOUNDARY
Unit fractions and comparison only; no addition of fractions.

## WALKTHROUGH
Cut a chapati into 4 equal pieces; 3 pieces are 3/4.

## DIAGNOSTIC_QUESTION_1
Which is larger: 2/3 or 3/5?

## DIAGNOSTIC_ANSWER_1
2/3 (common denominator 15: 10/15 vs 9/15).
"""


@pytest.fixture(scope="module")
def fixture_dir(tmp_path_factory) -> Path:
    d = tmp_path_factory.mktemp("enhanced_nodes")
    (d / "c9_phy_cbse_01_001.md").write_text(GOOD_CBSE, encoding="utf-8")
    (d / "c7_math_ch03_002.md").write_text(GOOD_LEGACY, encoding="utf-8")
    # malformed: LLM preamble leaked, no sections at all
    (d / "c12_hin_a_cbse_03_011.md").write_text(
        "The user wants me to create a detailed pedagogy ...\n"
        "Let me analyze the reference text provided.\n", encoding="utf-8")
    # malformed: unparseable filename
    (d / "not_a_node.md").write_text("## DEFINITION\nx\n", encoding="utf-8")
    # malformed: empty body
    (d / "c8_chem_cbse_02_009.md").write_text("", encoding="utf-8")
    return d


@pytest.fixture(scope="module")
def fixture_index(fixture_dir):
    return build_index(str(fixture_dir))


@pytest.fixture()
def fixture_client(fixture_index, monkeypatch):
    # function-scoped so the patch is undone before the real-corpus
    # tests in this module hit the real get_index()
    app = FastAPI()
    app.include_router(enhanced_nodes_router)
    monkeypatch.setattr(enhanced_nodes_api, "get_index",
                        lambda: fixture_index)
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def real_client():
    if not HAS_CORPUS:
        pytest.skip("enhanced nodes md_cache absent")
    app = FastAPI()
    app.include_router(enhanced_nodes_router)
    with TestClient(app) as c:
        yield c


# ---------------------------------------------------------------------------
# Filename parsing
# ---------------------------------------------------------------------------


def test_parse_filename_shapes():
    cbse = parse_filename("c10_bio_cbse_01_001")
    assert cbse == {"class": 10, "subject": "bio", "board": "cbse",
                    "chapter": 1, "node_num": 1}
    multi = parse_filename("c12_hin_al_cbse_03_011")
    assert multi["subject"] == "hin_al" and multi["chapter"] == 3
    legacy = parse_filename("c6_biology_ch06_001")
    assert legacy["class"] == 6 and legacy["subject"] == "biology"
    assert legacy["chapter"] == 6 and legacy["board"] == ""
    unit = parse_filename("c6_english_u1_001")
    assert unit["chapter"] == 1 and unit["subject"] == "english"
    assert parse_filename("garbage_name") is None
    assert parse_filename("readme") is None


def test_split_misconception():
    ans = ("v = 150/10 = 15 m/s. A wrong answer (e.g., 15 m) reveals that "
           "the student treats velocity as a scalar.")
    misc = split_misconception(ans)
    assert misc.startswith("A wrong answer")
    assert misc in ans
    assert split_misconception("v = d/t, plainly correct.") == ""
    # marker at position 0 -> no split (whole text is the analysis)
    assert split_misconception("A wrong answer reveals confusion.") == ""


# ---------------------------------------------------------------------------
# Parser correctness on real corpus files
# ---------------------------------------------------------------------------


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_parser_real_c10_bio():
    node, err = parse_node_file(str(_md_path(REAL_NODE + ".md")))
    assert err is None and node is not None
    assert node["node_id"] == REAL_NODE
    assert node["class"] == 10 and node["subject"] == "bio"
    assert node["chapter"] == 1 and node["board"] == "cbse"
    assert node["definition"].startswith("Life processes")
    assert node["cognitive_level"] == "understand"
    assert node["walkthrough"] and node["mastery_criteria"]
    assert node["scope_boundary"]
    assert len(node["diagnostics"]) == 6          # this node ships 6, not 5
    d1 = node["diagnostics"][0]
    assert d1["q"].startswith('Define "life processes"')
    assert "nutrition, respiration, transportation, and excretion" in d1["a"]
    assert d1["misconception"].startswith("A wrong answer")
    assert not node["missing_sections"]


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_parser_real_c6_legacy_naming():
    node, err = parse_node_file(str(_md_path("c6_biology_ch06_001.md")))
    assert err is None
    assert node["class"] == 6 and node["subject"] == "biology"
    assert node["chapter"] == 6 and node["board"] == ""
    assert node["definition"]
    assert len(node["diagnostics"]) >= 5


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_parser_real_c11_math():
    node, err = parse_node_file(str(_md_path("c11_math_cbse_01_001.md")))
    assert err is None
    assert node["class"] == 11 and node["subject"] == "math"
    assert node["chapter"] == 1
    assert "set" in node["definition"].lower()
    assert len(node["diagnostics"]) >= 5
    assert all(d["misconception"] for d in node["diagnostics"][:3])


# ---------------------------------------------------------------------------
# Malformed-file tolerance
# ---------------------------------------------------------------------------


def test_malformed_files_skipped_and_counted(fixture_index, fixture_dir):
    stats = fixture_index.stats
    assert stats["files_found"] == 5
    assert stats["parsed"] == 2
    assert stats["skipped"] == 3
    skipped = stats["skipped_files"]
    assert skipped["c12_hin_a_cbse_03_011.md"] == \
        "malformed: no core sections (DEFINITION/WALKTHROUGH)"
    assert skipped["not_a_node.md"] == "unparseable_filename"
    assert skipped["c8_chem_cbse_02_009.md"] == \
        "malformed: no core sections (DEFINITION/WALKTHROUGH)"


def test_malformed_parse_returns_reason(tmp_path):
    bad = tmp_path / "c9_sci_cbse_01_001.md"
    bad.write_text("no headers here at all", encoding="utf-8")
    node, reason = parse_node_file(str(bad))
    assert node is None
    assert "no core sections" in reason
    assert parse_node_file(str(tmp_path / "zzz.md"))[1] == "unparseable_filename"


def test_fixture_index_content(fixture_index):
    assert fixture_index.node_count() == 2
    node = fixture_index.get("c9_phy_cbse_01_001")
    assert node["walkthrough"].startswith("Walk through a bus trip")
    assert len(node["diagnostics"]) == 2
    assert node["diagnostics"][0]["misconception"].startswith("A wrong answer")
    assert node["diagnostics"][1]["misconception"].startswith('A poor answer')
    # listing + search on the fixture
    assert len(fixture_index.by_class_subject(9, "phy")) == 1
    hits = fixture_index.search("chapati")
    assert [h["node_id"] for h in hits] == ["c7_math_ch03_002"]
    assert fixture_index.search("") == []


# ---------------------------------------------------------------------------
# Router (fixture index, monkeypatched accessor)
# ---------------------------------------------------------------------------


def test_router_node_200(fixture_client):
    r = fixture_client.get("/api/nodes/node",
                           params={"node_id": "c9_phy_cbse_01_001"})
    assert r.status_code == 200
    body = r.json()
    assert body["node_id"] == "c9_phy_cbse_01_001"
    assert body["definition"].startswith("Velocity")
    assert body["diagnostics"][0]["q"].startswith("A car covers")


def test_router_node_404(fixture_client):
    assert fixture_client.get("/api/nodes/node",
                              params={"node_id": "nope"}).status_code == 404


def test_router_by_class_subject_200(fixture_client):
    r = fixture_client.get("/api/nodes/by-class-subject",
                           params={"class": 7, "subject": "math"})
    assert r.status_code == 200
    body = r.json()
    assert body["total"] == 1 and body["count"] == 1
    assert body["nodes"][0]["node_id"] == "c7_math_ch03_002"


def test_router_by_class_subject_404(fixture_client):
    r = fixture_client.get("/api/nodes/by-class-subject",
                           params={"class": 7, "subject": "sanskrit"})
    assert r.status_code == 404


def test_router_search_200(fixture_client):
    r = fixture_client.get("/api/nodes/search", params={"q": "velocity"})
    assert r.status_code == 200
    body = r.json()
    assert body["count"] >= 1
    assert body["results"][0]["node_id"] == "c9_phy_cbse_01_001"


def test_router_stats_200(fixture_client):
    r = fixture_client.get("/api/nodes/stats")
    assert r.status_code == 200
    body = r.json()
    assert body["nodes"] == 2
    assert body["classes"] == [7, 9]
    assert body["load_stats"]["skipped"] == 3


# ---------------------------------------------------------------------------
# Router against the real corpus (fast: JSON cache path)
# ---------------------------------------------------------------------------


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_real_router_node_200(real_client):
    r = real_client.get("/api/nodes/node", params={"node_id": REAL_NODE})
    assert r.status_code == 200
    body = r.json()
    assert body["node_id"] == REAL_NODE
    assert body["walkthrough"]
    assert len(body["diagnostics"]) >= 5


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_real_router_by_class_subject_200(real_client):
    r = real_client.get("/api/nodes/by-class-subject",
                        params={"class": 10, "subject": "bio"})
    assert r.status_code == 200
    body = r.json()
    assert body["total"] == 45
    assert all(n["node_id"].startswith("c10_bio") for n in body["nodes"])


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_real_router_search_200(real_client):
    r = real_client.get("/api/nodes/search",
                        params={"q": "photosynthesis", "limit": 5})
    assert r.status_code == 200
    assert r.json()["count"] >= 1


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_real_corpus_scale(real_client):
    stats = real_client.get("/api/nodes/stats").json()
    assert stats["nodes"] >= 8800
    # Skips are audited legitimate contract-outs, never silent data loss of
    # a teaching node.  2026-09 corpus audit
    # (backend/its/competency/NODE_GRAPH_VALIDATION.json): the 9,118-file
    # corpus skips exactly 110 files -- 108 `_comp` case-study companions
    # (PARENT_NODE_ID + seed questions, no DEFINITION/WALKTHROUGH by design
    # -> "unparseable_filename") and 2 genuinely malformed Hindi nodes.
    load_stats = stats["load_stats"]
    assert load_stats["skipped"] <= 200               # tripwire, not a quota
    legit_reasons = {"unparseable_filename",
                     "malformed: no core sections (DEFINITION/WALKTHROUGH)"}
    skipped_files = load_stats["skipped_files"]
    assert set(skipped_files.values()) <= legit_reasons
    assert all(fname.endswith("_comp.md")
               for fname, reason in skipped_files.items()
               if reason == "unparseable_filename")
    assert stats["classes"] == [6, 7, 8, 9, 10, 11, 12]


# ---------------------------------------------------------------------------
# Tutor-graph hook: /stats "teaching_nodes" + /teach card
# ---------------------------------------------------------------------------


@pytest.fixture(scope="module")
def tutor_client():
    from backend.api.competency_tutor import router as tutor_graph_router
    app = FastAPI()
    app.include_router(tutor_graph_router)
    with TestClient(app) as c:
        yield c


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_tutor_stats_reports_teaching_nodes(tutor_client):
    r = tutor_client.get("/api/tutor-graph/stats")
    assert r.status_code == 200
    body = r.json()
    assert "teaching_nodes" in body
    assert body["teaching_nodes"] >= 8800


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_tutor_teach_card(tutor_client):
    r = tutor_client.get("/api/tutor-graph/teach",
                         params={"node_id": REAL_NODE})
    assert r.status_code == 200
    body = r.json()
    assert body["node_id"] == REAL_NODE
    assert "life processes" in body["walkthrough"].lower()
    diag = body["diagnostic"]
    assert diag["question"].startswith('Define "life processes"')
    assert diag["answer"]
    assert diag["misconception"].startswith("A wrong answer")


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_tutor_teach_concept_id_alias(tutor_client):
    r = tutor_client.get("/api/tutor-graph/teach",
                         params={"concept_id": REAL_NODE})
    assert r.status_code == 200
    assert r.json()["node_id"] == REAL_NODE


def test_tutor_tech_requires_param(tutor_client):
    assert tutor_client.get("/api/tutor-graph/teach").status_code == 400


@pytest.mark.skipif(not HAS_CORPUS, reason="corpus absent")
def test_tutor_teach_unknown_404(tutor_client):
    r = tutor_client.get("/api/tutor-graph/teach",
                         params={"node_id": "c99_ghost_cbse_99_999"})
    assert r.status_code == 404


# ---------------------------------------------------------------------------
# Mounting contract: routers package + main app expose the new router
# ---------------------------------------------------------------------------


def test_router_exported_from_routers_package():
    import backend.routers as r
    assert hasattr(r, "enhanced_nodes_router")


def test_main_app_has_enhanced_node_routes():
    from backend.main import app
    # app.routes may hold deferred _IncludedRouter wrappers under the
    # patched FastAPI here -- the OpenAPI schema shows effective paths.
    paths = set(app.openapi().get("paths", {}))
    assert "/api/nodes/node" in paths
    assert "/api/nodes/by-class-subject" in paths
    assert "/api/nodes/search" in paths
    assert "/api/tutor-graph/teach" in paths
