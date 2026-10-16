# -*- coding: utf-8 -*-
"""graph_edges tests — the ONE hard/soft prerequisite-edge classifier (D11).

Pins owner decision D11 (2026-09-30): prerequisite GATING uses HARD EDGES
ONLY.  An edge A→B (B listed in A's PREREQUISITE_NODE_IDS, i.e. "A
requires B") is a HARD gate iff B's class is strictly below A's OR B's
subject differs; same-class sibling mesh, upward noise and unresolvable
prereqs are SOFT and never gate.

Covers, in order:
  1. the classifier itself — every bucket, with REAL corpus id pairs
     (measured 2026-09-30, see _cisce_build/gatefix_d11/) as docexamples;
  2. subject-code spelling twins (physics/phy, engl/english) never fake a
     cross-subject gate, while genuine different-subject codes do;
  3. edge_stats bucket counts;
  4. next_best_lesson on a HERMETIC fixture corpus (built from real md
     headers via enhanced_nodes.build_index — the live data path, NOT the
     retired stale NODE_GRAPH.json export):
       - a FRESH student gets non-empty gated recommendations (D2);
       - an unmastered class-10 gate suppresses the class-11 node (D11);
       - same-class siblings NEVER suppress;
       - cross-subject gates apply;
       - mastering the gate opens the node;
  5. learnpath._hard_prereqs consumes the SAME classifier (cross-subject
     gates gate there too);
  6. graph_service.find_gaps / find_root_gaps / get_learning_path (the
     /api/graph/gaps and /api/graph/path endpoints) hard-filter only.

Style: like test_learnpath.py — repo-root on sys.path, hermetic
DATABASE_URL, fixture corpus in a tmp dir (never the global env/singleton),
asyncio.run per test, monkeypatch for service seams.
"""

from __future__ import annotations

import asyncio
import os
import pathlib
import sys
import tempfile

import pytest


def _repo_root() -> pathlib.Path:
    for cand in pathlib.Path(__file__).resolve().parents:
        if ((cand / "backend" / "services" / "learnpath.py").exists()
                and (cand / "deploy" / "backend" / "services" / "learnpath.py").exists()):
            return cand
    return pathlib.Path(__file__).resolve().parents[2]


_ROOT = _repo_root()
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

# Hermetic stores BEFORE any backend import.
os.environ["DATABASE_URL"] = "sqlite+aiosqlite://"

from backend.services import graph_edges  # noqa: E402

# ── measured REAL corpus examples (CBSE enhanced_nodes_md, 2026-09-30) ────
# from _cisce_build/gatefix_d11/measure_via_classifier.py:
#   10,979 teaching nodes; 60,011 edges: HARD 23,837 / SOFT 36,174
REAL_CROSS_CLASS = ({"node_id": "c10_bio_cbse_01_001", "class": 10, "subject": "bio"},
                    {"node_id": "c9_bio_ch1_2", "class": 9, "subject": "bio"})
REAL_CROSS_SUBJECT_SAME_CLASS = (
    {"node_id": "c10_civ_cbse_05_002", "class": 10, "subject": "civ"},
    {"node_id": "c10_eco_cbse_01_001", "class": 10, "subject": "eco"})
REAL_SAME_CLASS_SIBLING = (
    {"node_id": "c10_bio_cbse_01_002", "class": 10, "subject": "bio"},
    {"node_id": "c10_bio_cbse_01_001", "class": 10, "subject": "bio"})
REAL_UPWARD_NOISE = ({"node_id": "c11_geo_cbse_03_008", "class": 11, "subject": "geo"},
                     {"node_id": "c12_geo_cbse_13_008", "class": 12, "subject": "geo"})


# ── 1. the classifier buckets ─────────────────────────────────────────────

def test_cross_class_down_is_hard():
    a, b = REAL_CROSS_CLASS
    assert graph_edges.classify(a, b) == graph_edges.HARD
    assert graph_edges.is_hard(a, b)


def test_cross_subject_same_class_is_hard():
    a, b = REAL_CROSS_SUBJECT_SAME_CLASS
    assert graph_edges.classify(a, b) == graph_edges.HARD


def test_same_class_sibling_is_soft():
    a, b = REAL_SAME_CLASS_SIBLING
    assert graph_edges.classify(a, b) == graph_edges.SOFT
    assert not graph_edges.is_hard(a, b)


def test_upward_noise_is_soft():
    a, b = REAL_UPWARD_NOISE
    assert graph_edges.classify(a, b) == graph_edges.SOFT


def test_unknown_coords_never_gate():
    """A gate must be provable: missing class AND missing subject → SOFT
    (real corpus case: c10_engl_cbse_91_001 lists the literal 'N/A')."""
    a = {"node_id": "c10_engl_cbse_91_001", "class": 10, "subject": "engl"}
    assert graph_edges.classify(a, {"node_id": "N/A"}) == graph_edges.SOFT
    assert graph_edges.classify({"node_id": "ghost"}, {"node_id": "x", "class": 3}) == graph_edges.SOFT
    # class-known-but-not-below is soft even when the subject is unknown
    assert graph_edges.classify({"class": 10}, {"class": 10}) == graph_edges.SOFT


def test_spelling_twins_never_fake_cross_subject_gates():
    """Measured corpus drift: 'physics' vs 'phy', 'engl' vs 'english' are
    the SAME subject — same-class edges between them stay SOFT.  A
    different code (math) still gates."""
    twin_pairs = [
        ({"class": 10, "subject": "phy"}, {"class": 10, "subject": "physics"}),
        ({"class": 10, "subject": "physics"}, {"class": 10, "subject": "phy"}),
        ({"class": 10, "subject": "engl"}, {"class": 10, "subject": "english"}),
        ({"class": 6, "subject": "english"}, {"class": 6, "subject": "engl"}),
        ({"class": 9, "subject": "maths"}, {"class": 9, "subject": "math"}),
    ]
    for a, b in twin_pairs:
        assert graph_edges.classify(a, b) == graph_edges.SOFT, (a, b)
    # …but the class rule still fires for twins across classes
    assert graph_edges.classify({"class": 10, "subject": "engl"},
                                {"class": 6, "subject": "english"}) == graph_edges.HARD
    # …and genuinely different electives gate (eng_w vs eng_h are
    # different BOOKS by design, like hin_ga vs hin_v)
    assert graph_edges.classify({"class": 10, "subject": "eng_w"},
                                {"class": 10, "subject": "eng_h"}) == graph_edges.HARD


def test_hard_prereq_ids_and_unmet():
    nodes = {
        "c11_math_cbse_01_001": {"class": 11, "subject": "math",
                                 "prereq_ids": ["c10_math_cbse_01_001",
                                                "c11_math_cbse_01_002",
                                                "c12_ghost"]},
        "c10_math_cbse_01_001": {"class": 10, "subject": "math", "prereq_ids": []},
        "c11_math_cbse_01_002": {"class": 11, "subject": "math", "prereq_ids": []},
    }
    node = nodes["c11_math_cbse_01_001"]
    hard = graph_edges.hard_prereq_ids(node, nodes.get)
    assert hard == ["c10_math_cbse_01_001"]  # sibling + unknown ghost stay out
    assert graph_edges.hard_unmet(node, nodes.get, {}) == ["c10_math_cbse_01_001"]
    assert graph_edges.hard_unmet(node, nodes.get, {"c10_math_cbse_01_001": 0.9}) == []
    assert graph_edges.hard_unmet(node, nodes.get,
                                  {"c10_math_cbse_01_001": 0.9}, floor=0.95) == ["c10_math_cbse_01_001"]


# ── 2. edge_stats buckets ─────────────────────────────────────────────────

def test_edge_stats_counts_every_bucket():
    nodes = {
        "c10_bio_cbse_01_001": {"class": 10, "subject": "bio",
                                "prereq_ids": ["c9_bio_ch1_2", "c10_bio_cbse_01_002", "N/A"]},
        "c10_bio_cbse_01_002": {"class": 10, "subject": "bio",
                                "prereq_ids": ["c10_bio_cbse_01_001", "c10_eco_cbse_01_001"]},
        "c9_bio_ch1_2": {"class": 9, "subject": "bio", "prereq_ids": []},
        "c10_eco_cbse_01_001": {"class": 10, "subject": "eco", "prereq_ids": []},
        "c11_geo_cbse_03_008": {"class": 11, "subject": "geo",
                                "prereq_ids": ["c12_geo_cbse_13_008"]},
        "c12_geo_cbse_13_008": {"class": 12, "subject": "geo", "prereq_ids": []},
    }
    s = graph_edges.edge_stats(nodes)
    assert s["nodes"] == 6
    assert s["hard"]["total"] == 2
    assert s["hard"]["cross_class_down"] == 1       # c10 bio → c9 bio
    assert s["hard"]["cross_subject_same_class"] == 1  # c10 bio → c10 eco
    assert s["soft"]["same_class_sibling"] == 2     # the mutual bio sibling pair
    assert s["soft"]["upward_noise"] == 1           # c11 geo → c12 geo
    assert s["soft"]["unknown_coords"] == 1         # "N/A"
    # each bucket carries one real example pair
    assert s["examples"]["hard.cross_class_down"] == ("c10_bio_cbse_01_001", "c9_bio_ch1_2")
    assert s["examples"]["hard.cross_subject_same_class"] == ("c10_bio_cbse_01_002", "c10_eco_cbse_01_001")
    assert s["examples"]["soft.same_class_sibling"] == ("c10_bio_cbse_01_001", "c10_bio_cbse_01_002")
    assert s["examples"]["soft.upward_noise"] == ("c11_geo_cbse_03_008", "c12_geo_cbse_13_008")
    assert s["examples"]["soft.unknown_coords"] == ("c10_bio_cbse_01_001", "N/A")


def test_filter_hard_rows_for_graph_service():
    target = {"node_id": "c11_math_cbse_01_001", "subject": "math", "class_level": "11"}
    rows = [
        {"node_id": "c10_math_cbse_01_001", "subject": "math", "class_level": "10"},   # hard gate
        {"node_id": "c11_math_cbse_01_002", "subject": "math", "class_level": "11"},   # sibling soft
        {"node_id": "c11_phy_cbse_01_001", "subject": "phy", "class_level": "11"},     # cross-subject hard
        {"node_id": "c12_math_cbse_01_001", "subject": "math", "class_level": "12"},   # upward soft
        {"node_id": "N/A", "subject": None, "class_level": None},                      # unknown soft
    ]
    kept = [r["node_id"] for r in graph_edges.filter_hard_rows(rows, target)]
    assert kept == ["c10_math_cbse_01_001", "c11_phy_cbse_01_001"]
    # unknown target → nothing provable → nothing gates
    assert graph_edges.filter_hard_rows(rows, None) == []


# ── 3. hermetic fixture corpus (real md headers → live index) ──────────────

_FIXTURE_ROOT = pathlib.Path(tempfile.mkdtemp(prefix="gate_edges_fixture_"))
_MD_DIR = _FIXTURE_ROOT / "md"

_NODE_MD = """## DEFINITION
{title} is the fixture topic for the graph-edges gate tests.

## WALKTHROUGH
Step one: read the definition. Step two: work the example.

## PREREQUISITE_NODE_IDS
{prereqs}

## MASTERY_CRITERIA
- student can state the {title} rule in their own words
"""

_NODES = {
    # class 9 — the deep root (real corpus shape: c9 feeds c10 gates)
    "c9_math_cbse_01_001": {"cls": 9, "title": "Number systems", "prereqs": ""},
    # class 10 — THE GATE (real shape: c10_bio_cbse_01_001 requires c9_bio_ch1_2)
    "c10_math_cbse_01_001": {"cls": 10, "title": "Real numbers",
                             "prereqs": "c9_math_cbse_01_001"},
    # class 11 math — gated by the class-10 gate
    "c11_math_cbse_01_001": {"cls": 11, "title": "Sets",
                             "prereqs": "c10_math_cbse_01_001"},
    # same-class sibling mesh (cyclic in the real corpus — never gates)
    "c11_math_cbse_01_002": {"cls": 11, "title": "Relations",
                             "prereqs": "c11_math_cbse_01_001"},
    # a class-11 node with no gates at all — the honest day-one start
    "c11_math_cbse_01_003": {"cls": 11, "title": "Principle of counting",
                             "prereqs": ""},
    # cross-subject gate, same class (real shape: c10_civ requires c10_eco)
    "c11_phy_cbse_01_001": {"cls": 11, "title": "Units and measurement",
                            "prereqs": "c11_math_cbse_01_003"},
}


def _fixture_index():
    """Build the fixture corpus index from real md headers — the same
    parse path the live corpus takes (enhanced_nodes.build_index), without
    touching the global env/singleton other tests use."""
    from backend.services.enhanced_nodes import build_index

    if not (_MD_DIR / "c11_phy_cbse_01_001.md").exists():
        _MD_DIR.mkdir(parents=True, exist_ok=True)
        for nid, meta in _NODES.items():
            (_MD_DIR / f"{nid}.md").write_text(
                _NODE_MD.format(title=meta["title"], prereqs=meta["prereqs"]),
                encoding="utf-8")
    return build_index([str(_MD_DIR)])


@pytest.fixture()
def nbl(monkeypatch):
    import backend.services.next_best_lesson as next_best_lesson

    idx = _fixture_index()
    monkeypatch.setattr(next_best_lesson, "_corpus_index", lambda: idx)
    return next_best_lesson


async def _make_db():
    from backend.database import Base
    from backend.models.progress import MasteryRecord
    from backend.models.user import User
    from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
    from sqlalchemy.pool import StaticPool

    engine = create_async_engine(
        "sqlite+aiosqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    async with engine.begin() as conn:
        await conn.run_sync(
            lambda sync: Base.metadata.create_all(
                sync, tables=[User.__table__, MasteryRecord.__table__]))
    return async_sessionmaker(engine, expire_on_commit=False)()


async def _seed_user(db, class_level=11) -> str:
    import uuid

    from backend.models.user import User

    uid = uuid.uuid4()
    db.add(User(id=uid, email=f"{uid}@fixture.test", name="Fixture",
                role="student", class_level=class_level))
    await db.commit()
    return str(uid)


async def _seed_ledger(db, uid: str, rows: dict):
    import uuid

    from backend.models.progress import MasteryRecord

    for nid, (p, att) in rows.items():
        db.add(MasteryRecord(user_id=uuid.UUID(uid), node_id=nid,
                             mastery_probability=p, attempts=att))
    await db.commit()


# ── 4. next_best_lesson: fresh student + hard gating ──────────────────────

def test_fresh_student_gets_nonempty_gated_recommendations(nbl):
    """D2 + D11: no ledger rows at all — recommendations still flow (the
    gate-free syllabus heads), and the class-11 node whose class-10 gate
    is unmastered is NOT offered (suppressed until its gate opens)."""
    async def run():
        db = await _make_db()
        uid = await _seed_user(db, class_level=11)
        return await nbl.next_best(db, uid, limit=5)

    out = asyncio.run(run())
    ready = [e["node_id"] for e in out["ready_to_learn"]]
    repair = {e["node_id"]: e for e in out["repair_first"]}
    assert ready, "fresh student must get non-empty recommendations"
    # the gated c11 node is suppressed from ready…
    assert "c11_math_cbse_01_001" not in ready
    # …and since the student never started it, it is not a repair entry
    # either — repair-first is for STARTED nodes with open foundations
    assert "c11_math_cbse_01_001" not in repair
    # the free c11 node is the honest day-one start
    assert "c11_math_cbse_01_003" in ready
    # same-class mesh sibling (002) is gate-free → ready as well
    assert "c11_math_cbse_01_002" in ready
    # live corpus source, not the retired stale export
    assert out["source"].startswith("corpus_index")
    assert out["graph_size"] == 4  # the four class-11 fixture nodes
    # cross-subject gate: the untouched physics node is suppressed too
    assert "c11_phy_cbse_01_001" not in ready
    assert "c11_phy_cbse_01_001" not in repair


def test_started_gated_node_surfaces_in_repair(nbl):
    """Once the student STARTS a gated node, its open hard foundations
    surface as repair_first naming the missing ids (earlier class)."""
    async def run():
        db = await _make_db()
        uid = await _seed_user(db, class_level=11)
        await _seed_ledger(db, uid, {"c11_math_cbse_01_001": (0.20, 1)})
        return await nbl.next_best(db, uid, limit=5)

    out = asyncio.run(run())
    repair = {e["node_id"]: e for e in out["repair_first"]}
    assert "c11_math_cbse_01_001" in repair
    assert "c10_math_cbse_01_001" in repair["c11_math_cbse_01_001"]["unmet_prereqs"]
    # untouched gated nodes stay out of repair
    assert "c11_phy_cbse_01_001" not in repair


def test_unmastered_gate_suppresses_but_mastered_gate_opens(nbl):
    async def run():
        db = await _make_db()
        uid = await _seed_user(db, class_level=11)
        first = await nbl.next_best(db, uid, limit=5)
        await _seed_ledger(db, uid, {"c9_math_cbse_01_001": (0.92, 4)})
        mid = await nbl.next_best(db, uid, limit=5)
        await _seed_ledger(db, uid, {"c10_math_cbse_01_001": (0.90, 4)})
        final = await nbl.next_best(db, uid, limit=5)
        return first, mid, final

    first, mid, final = asyncio.run(run())
    ready_first = {e["node_id"] for e in first["ready_to_learn"]}
    ready_mid = {e["node_id"] for e in mid["ready_to_learn"]}
    ready_final = {e["node_id"] for e in final["ready_to_learn"]}
    # c9 root mastered alone does NOT open the c11 node (gate is the c10 one)
    assert "c11_math_cbse_01_001" not in ready_first
    assert "c11_math_cbse_01_001" not in ready_mid
    # the c10 GATE mastered → the c11 node opens even though its same-class
    # sibling (c11_math_cbse_01_002) is still untouched
    assert "c11_math_cbse_01_001" in ready_final
    assert "c11_math_cbse_01_001" not in {e["node_id"] for e in final["repair_first"]}


def test_same_class_sibling_never_suppresses(nbl):
    """D11 core: c11_math_01_002 lists c11_math_01_001 as its 'prereq' —
    same class, same subject → SOFT.  It must not block 002."""
    async def run():
        db = await _make_db()
        uid = await _seed_user(db, class_level=11)
        return await nbl.next_best(db, uid, limit=6)

    out = asyncio.run(run())
    ready = [e["node_id"] for e in out["ready_to_learn"]]
    assert "c11_math_cbse_01_002" in ready, (
        "same-class sibling mesh must never gate recommendations")


def test_cross_subject_gate_applies(nbl):
    """A same-class, different-subject 'prereq' is a HARD gate (real
    corpus shape: c10_civ_cbse_05_002 requires c10_eco_cbse_01_001):
    it suppresses the node, surfaces as repair once started, and opens
    only when the gate is mastered."""
    async def run():
        db = await _make_db()
        uid = await _seed_user(db, class_level=11)
        fresh = await nbl.next_best(db, uid, limit=6)
        # the student starts the physics node → its math gate surfaces
        await _seed_ledger(db, uid, {"c11_phy_cbse_01_001": (0.30, 1)})
        started = await nbl.next_best(db, uid, limit=6)
        # mastering the same-class math gate opens the physics node
        await _seed_ledger(db, uid, {"c11_math_cbse_01_003": (0.88, 4)})
        opened = await nbl.next_best(db, uid, limit=6)
        return fresh, started, opened

    fresh, started, opened = asyncio.run(run())
    ready_fresh = {e["node_id"] for e in fresh["ready_to_learn"]}
    assert "c11_phy_cbse_01_001" not in ready_fresh, (
        "cross-subject same-class gate must suppress the node")
    repair = {e["node_id"]: e for e in started["repair_first"]}
    assert "c11_phy_cbse_01_001" in repair
    assert repair["c11_phy_cbse_01_001"]["unmet_prereqs"] == ["c11_math_cbse_01_003"]
    assert "c11_phy_cbse_01_001" in {e["node_id"] for e in opened["ready_to_learn"]}


def test_stale_json_export_is_retired(nbl):
    """The engine must not READ NODE_GRAPH.json any more (D1): no file
    path constant, no file parsing — recommendations come from the corpus
    index.  (The module DOCSTRING still names the retired export on
    purpose: it documents the fix.)"""
    import inspect

    src = inspect.getsource(nbl)
    assert "GRAPH_PATH" not in src
    assert "json.loads" not in src
    assert "read_text" not in src


# ── 5. learnpath consumes the SAME classifier ─────────────────────────────

def test_learnpath_hard_prereqs_share_the_classifier():
    import backend.services.learnpath as learnpath

    idx = _fixture_index()
    gated = idx.nodes["c11_math_cbse_01_001"]
    phy = idx.nodes["c11_phy_cbse_01_001"]
    sibling_only = idx.nodes["c11_math_cbse_01_002"]
    assert learnpath._hard_prereqs(idx, gated) == ["c10_math_cbse_01_001"]
    # cross-subject same-class gates apply in learnpath too (D11 full rule)
    assert learnpath._hard_prereqs(idx, phy) == ["c11_math_cbse_01_003"]
    assert learnpath._hard_prereqs(idx, sibling_only) == []
    mastery = {"c10_math_cbse_01_001": 0.9, "c11_math_cbse_01_003": 0.9}
    assert learnpath._hard_unmet(idx, phy, mastery) == []


# ── 6. graph_service gating endpoints hard-filter only ────────────────────

def _bundle_stub(targets, rows_by_node):
    """Stub GraphService._prereq_bundle: per-node target briefs + rows,
    shaped exactly like the Neo4j/SQLite rows (transitive closure)."""
    from backend.services.graph_service import GraphService

    async def fake(_node_id, _max_depth=10):
        return targets.get(_node_id), rows_by_node.get(_node_id, [])

    return fake


_GATE_ROWS = {
    "c11_math_cbse_01_001": [
        {"node_id": "c11_math_cbse_01_002", "subject": "math", "class_level": "11"},
        {"node_id": "c10_math_cbse_01_001", "subject": "math", "class_level": "10"},
        {"node_id": "c9_math_cbse_01_001", "subject": "math", "class_level": "9"},
    ],
    "c10_math_cbse_01_001": [
        {"node_id": "c9_math_cbse_01_001", "subject": "math", "class_level": "9"},
    ],
    "c9_math_cbse_01_001": [],
}

_GATE_TARGETS = {
    "c11_math_cbse_01_001": {"node_id": "c11_math_cbse_01_001",
                             "subject": "math", "class_level": "11"},
    "c10_math_cbse_01_001": {"node_id": "c10_math_cbse_01_001",
                             "subject": "math", "class_level": "10"},
    "c9_math_cbse_01_001": {"node_id": "c9_math_cbse_01_001",
                            "subject": "math", "class_level": "9"},
}


def test_graph_service_find_gaps_hard_only(monkeypatch):
    from backend.services.graph_service import GraphService

    monkeypatch.setattr(GraphService, "_prereq_bundle",
                        _bundle_stub(_GATE_TARGETS, _GATE_ROWS))
    gaps = asyncio.run(GraphService.find_gaps("c11_math_cbse_01_001", set()))
    ids = [g["node_id"] for g in gaps]
    # both cross-class gates count; the same-class sibling NEVER does
    assert "c10_math_cbse_01_001" in ids
    assert "c9_math_cbse_01_001" in ids
    assert "c11_math_cbse_01_002" not in ids
    # mastered gates drop out of the gap list
    gaps2 = asyncio.run(GraphService.find_gaps(
        "c11_math_cbse_01_001", {"c9_math_cbse_01_001"}))
    assert [g["node_id"] for g in gaps2] == ["c10_math_cbse_01_001"]
    # root gaps: the c9 root's own hard chain is empty → the learnable root
    roots = asyncio.run(GraphService.find_root_gaps("c11_math_cbse_01_001", set()))
    assert [g["node_id"] for g in roots] == ["c9_math_cbse_01_001"]
    # c9 mastered → the c10 gate becomes the root gap
    roots2 = asyncio.run(GraphService.find_root_gaps(
        "c11_math_cbse_01_001", {"c9_math_cbse_01_001"}))
    assert [g["node_id"] for g in roots2] == ["c10_math_cbse_01_001"]


def test_graph_service_learning_path_hard_only(monkeypatch):
    from backend.services.graph_service import GraphService

    monkeypatch.setattr(GraphService, "_prereq_bundle",
                        _bundle_stub(_GATE_TARGETS, _GATE_ROWS))
    path = asyncio.run(GraphService.get_learning_path("c11_math_cbse_01_001", set()))
    ids = [p["node_id"] for p in path]
    assert ids == ["c9_math_cbse_01_001", "c10_math_cbse_01_001",
                   "c11_math_cbse_01_001"]
    assert "c11_math_cbse_01_002" not in ids
    # partially mastered chain → only the unmet hard part
    path2 = asyncio.run(GraphService.get_learning_path(
        "c11_math_cbse_01_001", {"c9_math_cbse_01_001"}))
    assert [p["node_id"] for p in path2] == ["c10_math_cbse_01_001",
                                             "c11_math_cbse_01_001"]


# ── 7. optional live-corpus pass (opt-in; keeps real-data honesty) ────────

def test_live_corpus_split_if_mounted():
    """Run the real classifier over the real CBSE corpus when it is
    mounted (opt-in via ATLAS_CBSE_MD_DIR to keep the default suite fast).
    Pins the measured D11 split: hard edges exist, and the sibling mesh is
    soft — never gated."""
    md_dir = os.environ.get("ATLAS_CBSE_MD_DIR",
                            str(_ROOT / "deploy" / "content" / "enhanced_nodes_md"))
    if not os.path.isdir(md_dir):
        pytest.skip("CBSE corpus not mounted")
    if not os.environ.get("ATLAS_CBSE_MD_DIR"):
        pytest.skip("opt-in: set ATLAS_CBSE_MD_DIR to run the 14k-file sweep")
    from backend.services.enhanced_nodes import build_index

    idx = build_index([md_dir])
    s = graph_edges.edge_stats(idx.nodes)
    assert s["hard"]["total"] > 20000, "real corpus must carry hard gates"
    assert s["soft"]["same_class_sibling"] > 30000, "sibling mesh dominates"
    ex = s["examples"]
    assert ex["hard.cross_class_down"] == ("c10_bio_cbse_01_001", "c9_bio_ch1_2")
    assert ex["soft.same_class_sibling"] == ("c10_bio_cbse_01_002", "c10_bio_cbse_01_001")
