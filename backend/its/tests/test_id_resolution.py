"""test_id_resolution.py -- the two id spaces get ONE resolver.

Locks the contract of backend/its/solver/id_resolution.py:

  - ``enh:<node>`` and bare ``<node>`` are the SAME node in two
    spellings (concept space keys the synthetic teach-concepts
    ``enh:<node_id>``; the SQLite knowledge graph keys the same ids
    bare).
  - ``resolve_concept_id`` returns the EXACT key under which an id
    lives in ``engine.concepts`` (the /path endpoint's goal
    resolution).
  - ``resolve_node_id`` canonicalizes into node space (the tutor's
    prerequisite-retreat graph lookups).
  - ``same_node`` is space-insensitive equality.

Also pins the tutor's ``_prerequisite_for`` behavior through the
resolver in the spellings the live data uses.  Fully hermetic: a temp
corpus, no SQLite, no live catalog.
"""
import json
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.id_resolution import (
    resolve_concept_id,
    resolve_node_id,
    same_node,
    strip_enh_prefix,
)
from backend.its.solver.tutor import TutorEngine


class _FakeEngine:
    """resolve_concept_id/resolve_node_id only need `.concepts`."""

    def __init__(self, keys):
        self.concepts = {k: object() for k in keys}


# ---------------------------------------------------------------- #
# strip + node space
# ---------------------------------------------------------------- #

def test_strip_enh_prefix_variants():
    assert strip_enh_prefix("enh:c10_bio_cbse_01_001") \
        == "c10_bio_cbse_01_001"
    assert strip_enh_prefix("c10_bio_cbse_01_001") \
        == "c10_bio_cbse_01_001"
    assert strip_enh_prefix("  enh:jemh.103.3 ") == "jemh.103.3"
    assert strip_enh_prefix("jemh.103.3") == "jemh.103.3"
    assert strip_enh_prefix(None) == ""
    assert strip_enh_prefix("") == ""


def test_resolve_node_id_canonicalizes_both_spellings():
    node = "c10_bio_cbse_01_001"
    assert resolve_node_id(node) == node
    assert resolve_node_id("enh:" + node) == node
    # catalog concept ids without a node twin pass through as
    # themselves (their mastery is keyed by their own id)
    assert resolve_node_id("jemh.103.3") == "jemh.103.3"
    assert resolve_node_id(None) is None
    assert resolve_node_id("  ") is None


def test_resolve_node_id_with_engine_lookup():
    node = "c10_bio_cbse_01_001"
    eng = _FakeEngine(["enh:" + node, "jemh.103.3"])
    assert resolve_node_id("enh:" + node, eng) == node
    assert resolve_node_id(node, eng) == node
    # an unknown id still canonicalizes best-effort so callers can
    # probe the prerequisite graph with it
    assert resolve_node_id("c9_chem_03_002", eng) == "c9_chem_03_002"
    assert resolve_node_id("jemh.103.3", eng) == "jemh.103.3"


# ---------------------------------------------------------------- #
# concept space
# ---------------------------------------------------------------- #

def test_resolve_concept_id_exact_and_twin_forms():
    node = "c10_bio_cbse_01_001"
    eng = _FakeEngine(["jemh.103.3", "enh:" + node])
    # 1. already a concept key
    assert resolve_concept_id("jemh.103.3", eng) == "jemh.103.3"
    assert resolve_concept_id("enh:" + node, eng) == "enh:" + node
    # 2. bare node id -> its enh: concept twin (the /path goal case)
    assert resolve_concept_id(node, eng) == "enh:" + node
    # 3. enh:-spelled catalog id -> its bare concept key
    assert resolve_concept_id("enh:jemh.103.3", eng) == "jemh.103.3"
    # 4. miss -> None (caller decides 404 vs fuzzy fallback)
    assert resolve_concept_id("c11_phy_09_003", eng) is None
    assert resolve_concept_id("", eng) is None
    assert resolve_concept_id(None, eng) is None
    # no engine / empty concept space -> honest None
    assert resolve_concept_id(node, None) is None
    assert resolve_concept_id(node, _FakeEngine([])) is None


def test_resolve_concept_id_bare_keyed_concept():
    """A node id loaded bare (no enh: twin) resolves to itself."""
    eng = _FakeEngine(["c10_bio_cbse_01_001"])
    assert resolve_concept_id("c10_bio_cbse_01_001", eng) \
        == "c10_bio_cbse_01_001"
    assert resolve_concept_id("enh:c10_bio_cbse_01_001", eng) \
        == "c10_bio_cbse_01_001"


# ---------------------------------------------------------------- #
# space-insensitive equality
# ---------------------------------------------------------------- #

def test_same_node_across_spaces():
    node = "c10_bio_cbse_01_001"
    assert same_node(node, "enh:" + node)
    assert same_node("enh:" + node, node)
    assert same_node("enh:" + node, "enh:" + node)
    assert same_node("jemh.103.3", "jemh.103.3")
    assert not same_node("jemh.103.3", "jemh.104.1")
    assert not same_node("enh:c10_bio_cbse_01_001",
                         "c10_bio_cbse_01_002")
    assert not same_node(None, "x")
    assert not same_node("x", None)


# ---------------------------------------------------------------- #
# the tutor retreat goes through the resolver (real engine)
# ---------------------------------------------------------------- #

_CAT = {
    "class": 7, "subject": "science", "chapter": 4,
    "worked_examples": [{"q": "Convert 0 C to kelvin.", "a": "273 K"}],
    "concepts": [{"id": "x.4.1", "title": "Heat", "formula": "-"}],
}


def _engine_with_enh(tmp_path):
    d = tmp_path / "cats"
    d.mkdir(parents=True)
    json.dump(_CAT, open(d / "catalog_0.json", "w", encoding="utf-8"))
    g = tmp_path / "questions" / "generated"
    g.mkdir(parents=True)
    json.dump({"concepts": [{"id": "enh:c7_sci_004_002",
                             "title": "Conduction advanced",
                             "questions": [{"q": "Energy passed along "
                                            "equals?", "a": "42"}]}]},
              open(g / "enhanced_000.json", "w", encoding="utf-8"))
    return TutorEngine(str(d))


def test_prerequisite_for_resolves_enh_graph_edge(tmp_path, monkeypatch):
    """Graph keyed bare, concepts keyed enh:<node>: the retreat finds
    the enh: concept via the resolver (the live-data spelling)."""
    monkeypatch.setattr(TutorEngine, "_graph_prereq_map",
                        lambda self: {"c7_sci_004_002":
                                      "c7_sci_004_001"})
    eng = _engine_with_enh(tmp_path)
    eng.prereq_overrides.clear()
    # the prerequisite concept must exist as a teach-concept
    eng.concepts["enh:c7_sci_004_001"] = eng.concepts["enh:c7_sci_004_002"]
    assert eng._prerequisite_for("enh:c7_sci_004_002") \
        == "enh:c7_sci_004_001"
    # same_node agrees both spellings are one node
    assert same_node("enh:c7_sci_004_002", "c7_sci_004_002")


def test_prerequisite_for_never_retreats_to_self(tmp_path, monkeypatch):
    """A degenerate self-referential graph edge (node lists itself)
    must not retreat a concept onto its own enh: spelling; no
    same-subject earlier concept exists, so there is no target."""
    monkeypatch.setattr(TutorEngine, "_graph_prereq_map",
                        lambda self: {"c7_sci_004_002":
                                      "c7_sci_004_002"})
    eng = _engine_with_enh(tmp_path)
    eng.prereq_overrides.clear()
    assert eng._prerequisite_for("enh:c7_sci_004_002") is None
    assert same_node("enh:c7_sci_004_002", "c7_sci_004_002")


# ---------------------------------------------------------------- #
# the /path endpoint resolves goals through the resolver
# ---------------------------------------------------------------- #

@pytest.fixture()
def path_api(tmp_path):
    import backend.api.competency_tutor as ct
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    d = tmp_path / "cats"
    d.mkdir(parents=True)
    json.dump({"class": 7, "subject": "science", "chapter": 4,
               "worked_examples": [{"q": "Convert 0 C to kelvin.",
                                    "a": "273 K"}],
               "concepts": [{"id": "jemh.1.1", "title": "Heat",
                             "formula": "-"}]},
              open(d / "catalog_0.json", "w", encoding="utf-8"))
    g = tmp_path / "questions" / "generated"
    g.mkdir(parents=True)
    json.dump({"concepts": [{"id": "enh:c7_sci_004_002",
                             "title": "Conduction",
                             "questions": [{"q": "Energy passed along "
                                            "equals?", "a": "42"}]}]},
              open(g / "enhanced_000.json", "w", encoding="utf-8"))
    eng = TutorEngine(str(d))
    saved = getattr(ct, "_engine", None)
    ct._engine = eng
    app = FastAPI()
    app.include_router(ct.router)
    try:
        with TestClient(app) as c:
            yield c, eng
    finally:
        ct._engine = saved


def test_path_goal_bare_node_id_resolves_to_enh_concept(path_api):
    """The /path endpoint accepts a bare node id (graph space) and
    resolves it to the enh:<node> teach-concept (concept space)."""
    c, eng = path_api
    out = c.get("/api/tutor-graph/path",
                params={"goal": "c7_sci_004_002"}).json()
    assert out["goal"] == "enh:c7_sci_004_002"
    assert "enh:c7_sci_004_002" in eng.concepts


def test_path_goal_concept_id_passthrough(path_api):
    c, _eng = path_api
    out = c.get("/api/tutor-graph/path",
                params={"goal": "jemh.1.1"}).json()
    assert out["goal"] == "jemh.1.1"


def test_path_unknown_goal_is_404_not_fuzzy_noise(path_api):
    """An unknown goal must 404. (Regression: collapsing an unresolved
    id to "" used to make the legacy fuzzy fallback match the FIRST
    concept in the engine and silently serve a wrong-topic path.)"""
    c, _eng = path_api
    r = c.get("/api/tutor-graph/path",
              params={"goal": "c99_ghost_99_999"})
    assert r.status_code == 404
