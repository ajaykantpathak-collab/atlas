"""Tests for the solved-doubt repertoire attachment (its/solver/repertoire.py).

Contract under test:
  1. A node with every asset returns doodle card + diagram + sim URLs --
      all served files, built only from the generated index.
  2. A node with no assets (and no node link at all) attaches HONEST
      NULLS -- never a nearest-guess from another subject.
  3. The subject spread is universal: maths, physics, chemistry,
      biology, accountancy, economics, commerce-adjacent (CS), history,
      geography, Hindi plus the ISC (app-maths, biotech) ids all resolve
      through the SAME code path.
  4. The wrong-subject guard holds by construction: every attached sim
      belongs to the node's own subject, every CBSE diagram file is the
      node's own file.
  5. Attachment never raises -- a repertoire failure can never break a
      solve.

    python -m pytest backend/tests/test_repertoire.py

repertoire.py is loaded by file path (stdlib-only module) so collection
never pulls the heavy solver package chain (see pytest.ini).
"""

from __future__ import annotations

import importlib.util
import pathlib
import re
import sys

import pytest

_BACKEND = pathlib.Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location(
    "_repertoire_under_test", _BACKEND / "its" / "solver" / "repertoire.py")
assert _spec is not None and _spec.loader is not None
repertoire = importlib.util.module_from_spec(_spec)
sys.modules[_spec.name] = repertoire
_spec.loader.exec_module(repertoire)

# --------------------------------------------------------------------------- #
# Fixtures: one node per subject, every one verified against the generated
# index to carry doodle + diagram + sim (except Hindi: sim only -- its
# partial attachment is asserted AS a partial, which is the honesty proof).
# --------------------------------------------------------------------------- #

ALL_ASSET_NODES = {          # subject -> corpus node (doodle+diagram+sim)
    "biology": "c10_bio_cbse_02_009",
    "accountancy": "c11_acc_cbse_01_002",
    "physics": "c10_phy_cbse_01_006",
    "maths": "c10_math_cbse_02_001",
    "economics": "c10_eco_cbse_01_001",
    "computer_science": "c11_cs_cbse_01_003",
    "chemistry": "c10_chem_cbse_01_009",
    "geography": "c10_geo_cbse_01_007",
    "history": "c10_hist_cbse_01_001",
    "applied_maths_isc": "c11_appmath_isc_03_003",
    "biotech_isc": "c11_biotech_isc_05_001",
    "commercial_arts": "c12_ca_cbse_01_001",
    "informatics_practices": "c11_ip_cbse_01_006",
    "physical_education": "c11_ps_cbse_10_001",
}
SIM_ONLY_NODE = "c9_hin_ga_cbse_01_001"      # Hindi: sim yes, diagram none


def _node_subject(node_id: str) -> str:
    """Subject token(s) of a corpus node id: between the class and the
    chapter marker, with the trailing cbse/ncert/ch corpus marker
    dropped (the same rule lite.ts applies) -- 'c10_bio_cbse_02_009'
    -> 'bio'; 'c9_hin_ga_cbse_01_001' -> 'hin_ga'."""
    toks = node_id.split("_")
    for i, tk in enumerate(toks[1:], start=1):
        if re.fullmatch(r"ch\d{1,3}|\d{1,3}", tk):
            subj = toks[1:i]
            if len(subj) > 1 and subj[-1] in ("cbse", "ncert", "ch"):
                subj = subj[:-1]
            return "_".join(subj)
    return toks[1] if len(toks) > 1 else ""


def _sim_subject(sim_id: str) -> str | None:
    m = re.match(r"^[a-z0-9]+_c\d{1,2}_([a-z0-9]+(?:_[a-z0-9]+)*?)_ch\d", sim_id)
    return m.group(1) if m else None


# --------------------------------------------------------------------------- #
# 1. full repertoire
# --------------------------------------------------------------------------- #

def test_node_with_all_assets():
    r = repertoire.attach_repertoire(None, node_id="c10_bio_cbse_02_009")
    assert r["node_id"] == "c10_bio_cbse_02_009"
    assert r["doodle"] == "/doodle_cards/class10/c10_bio_cbse_02_009.webp"
    assert r["diagram"] == "/diagrams/class10/c10_bio_cbse_02_009.png"
    assert r["sim"] == "gen_c10_bio_ch02"
    assert r["sim_title"]


def test_repertoire_shape_is_stable():
    """The five keys every answer card renders -- present on EVERY
    attachment, full or null."""
    for r in (repertoire.attach_repertoire(None, node_id=None),
              repertoire.attach_repertoire(None, node_id="c10_bio_cbse_02_009")):
        assert set(r) == {"node_id", "doodle", "diagram", "sim", "sim_title"}


# --------------------------------------------------------------------------- #
# 2. honest nulls
# --------------------------------------------------------------------------- #

def test_no_node_link_returns_all_nulls():
    for solve_result in (None, {}, {"tier": "VERIFIED", "answer": "7"},
                         {"audit": {"lane": "A",
                                    "route": ["kernel:compose",
                                              "modeling:fallback_all"],
                                    "anchor": "official key (doc 12 q 3)",
                                    "gates_passed": ["chain_compose"]}}):
        r = repertoire.attach_repertoire(solve_result)
        assert r == {"node_id": None, "doodle": None, "diagram": None,
                     "sim": None, "sim_title": None}, solve_result


def test_node_with_no_assets_returns_null_assets():
    """A plausible corpus id that no asset index knows: the binding
    still echoes (this doubt IS about that node) but every asset is an
    honest null -- never a neighbouring node's card."""
    r = repertoire.attach_repertoire(None, node_id="c10_zzz_cbse_99_999")
    assert r == {"node_id": "c10_zzz_cbse_99_999", "doodle": None,
                 "diagram": None, "sim": None, "sim_title": None}


def test_partial_assets_never_invent_the_missing_one():
    """Hindi chapter: sim exists, diagram does not -- the diagram field
    stays null instead of borrowing another subject's diagram."""
    r = repertoire.attach_repertoire(None, node_id=SIM_ONLY_NODE)
    assert r["node_id"] == SIM_ONLY_NODE
    assert r["sim"] and r["sim"].startswith("v3_c9_hin_ga_ch")
    assert r["diagram"] is None
    assert r["doodle"]


# --------------------------------------------------------------------------- #
# 3. subject spread -- one code path, >= 6 subjects
# --------------------------------------------------------------------------- #

def test_subject_spread_all_assets():
    assert len(ALL_ASSET_NODES) >= 6
    for subject, node_id in ALL_ASSET_NODES.items():
        r = repertoire.attach_repertoire(None, node_id=node_id)
        assert r["node_id"] == node_id, subject
        assert r["doodle"], f"doodle missing for {subject}"
        assert r["doodle"].startswith("/doodle_cards/class"), subject
        assert r["diagram"] and r["diagram"].startswith("/diagrams/"), subject
        assert r["sim"], f"sim missing for {subject}"


def test_wrong_subject_guard_by_construction():
    """Every attached asset belongs to the node's own subject: exact
    index lookups only.  For CBSE nodes the diagram file IS the node's
    own file, and the sim's chapter code carries the node's own
    subject token.  (ISC ids route through the curated CISCE maps --
    their subject families are asserted in the resolution test.)"""
    for subject, node_id in ALL_ASSET_NODES.items():
        r = repertoire.attach_repertoire(None, node_id=node_id)
        if "_isc_" not in node_id:
            assert r["diagram"].rsplit("/", 1)[1].startswith(node_id), subject
            sim_subj = _sim_subject(r["sim"])
            if sim_subj is not None:
                assert sim_subj == _node_subject(node_id), \
                    f"wrong-subject sim for {subject}: {r['sim']}"


def test_isc_ids_resolve_through_the_same_path():
    """CISCE (ICSE/ISC) nodes resolve the same repertoire -- curated
    maps, never a CBSE-node guess for a CBSE-only asset."""
    for node_id in ("c11_appmath_isc_03_003", "c11_biotech_isc_05_001"):
        r = repertoire.attach_repertoire(None, node_id=node_id)
        assert r["node_id"] == node_id
        assert r["doodle"] and r["sim"]


# --------------------------------------------------------------------------- #
# 4. node resolution from the solve result
# --------------------------------------------------------------------------- #

def test_explicit_binding_wins():
    payload = {"node_id": "c10_chem_cbse_01_009",
               "audit": {"route": ["node:c10_phy_cbse_01_006"]}}
    r = repertoire.attach_repertoire(payload, node_id="c10_bio_cbse_02_009")
    assert r["node_id"] == "c10_bio_cbse_02_009"      # explicit argument first


def test_payload_node_key_resolves():
    payload = {"tier": "VERIFIED", "node_id": "c10_math_cbse_02_001"}
    r = repertoire.attach_repertoire(payload)
    assert r["node_id"] == "c10_math_cbse_02_001"
    assert r["sim"] == "v3_c10_math_ch02_p1"


def test_audit_route_scan_resolves_validated_node():
    payload = {"audit": {"lane": "A",
                         "route": ["kernel:compose",
                                   "node:c10_phy_cbse_01_006"],
                         "anchor": None, "gates_passed": []}}
    r = repertoire.attach_repertoire(payload)
    assert r["node_id"] == "c10_phy_cbse_01_006"
    assert r["sim"] == "v3_c10_phy_ch01_p1"           # Electricity


def test_audit_scan_rejects_non_corpus_tokens():
    """'kernel:c6_lesson' is not a node id; nothing resolves."""
    payload = {"audit": {"route": ["kernel:c6_lesson", "chain:3hops"]}}
    assert repertoire.attach_repertoire(payload)["node_id"] is None


def test_unknown_audit_token_does_not_resolve():
    """A well-shaped id that no index knows must not resolve either --
    the scan validates against the asset indexes."""
    payload = {"audit": {"route": ["node:c10_zzz_cbse_99_999"]}}
    assert repertoire.attach_repertoire(payload)["node_id"] is None


# --------------------------------------------------------------------------- #
# 5. never raises
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("bad", [
    "garbage", 42, [], {"audit": None}, {"audit": {"route": "not-a-list"}},
    {"audit": {"route": [1, 2, None]}}, {"node_id": 123},
    {"node_id": "../../../etc/passwd"},
])
def test_attachment_survives_garbage_payloads(bad):
    r = repertoire.attach_repertoire(bad, node_id="x" * 100)
    assert set(r) == {"node_id", "doodle", "diagram", "sim", "sim_title"}


def test_index_missing_degrades_to_nulls(tmp_path, monkeypatch):
    """A missing snapshot file must degrade to honest nulls, never 500:
    the assets all go null and an audit-scanned binding no longer
    resolves (nothing can be validated against an empty index)."""
    monkeypatch.setenv("REPERTOIRE_INDEX_PATH", str(tmp_path / "nope.json"))
    repertoire.reload_repertoire_index()
    try:
        r = repertoire.attach_repertoire(None, node_id="c10_bio_cbse_02_009")
        assert r == {"node_id": "c10_bio_cbse_02_009", "doodle": None,
                     "diagram": None, "sim": None, "sim_title": None}
        scanned = repertoire.attach_repertoire(
            {"audit": {"route": ["node:c10_phy_cbse_01_006"]}})
        assert scanned == {"node_id": None, "doodle": None, "diagram": None,
                           "sim": None, "sim_title": None}
    finally:
        monkeypatch.delenv("REPERTOIRE_INDEX_PATH")
        repertoire.reload_repertoire_index()


# --------------------------------------------------------------------------- #
# 6. endpoint wiring (skipped when the FastAPI chain is unimportable)
# --------------------------------------------------------------------------- #

def test_solve_endpoint_payload_carries_repertoire_key():
    """The /solve-family helpers attach a repertoire object on every
    payload -- with and without a node binding."""
    pytest.importorskip("fastapi")
    try:
        import sys as _sys
        _root = str(_BACKEND.parent)
        if _root not in _sys.path:
            _sys.path.insert(0, _root)
        from backend.api.verified_practice import (
            SolveTextRequest, _with_repertoire)
    except Exception as exc:      # heavy chain unavailable on this box
        pytest.skip(f"verified_practice import unavailable: {exc}")

    req = SolveTextRequest(text="Solve for x: 2x + 2 = 6")
    assert req.node_id is None    # additive field, backward compatible

    bound = _with_repertoire({"tier": "VERIFIED", "answer": "2",
                              "audit": {"route": ["kernel:ok"]}},
                             node_id="c10_bio_cbse_02_009")
    assert bound["repertoire"]["node_id"] == "c10_bio_cbse_02_009"
    assert bound["repertoire"]["doodle"]

    unbound = _with_repertoire({"tier": "GUIDED", "answer": None,
                                "audit": {"route": ["kernel:ok"]}})
    assert unbound["repertoire"] == {"node_id": None, "doodle": None,
                                     "diagram": None, "sim": None,
                                     "sim_title": None}
