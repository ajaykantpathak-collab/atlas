"""Tests for backend.its.solver.key_schema and misconception_catalog.

Covers the KeyGrid (load from node graph, key generation, concept and
prerequisite queries, misconceptions, persistence, coverage) and the
MisconceptionCatalog (20 built-in entries, queries, node links, remediation,
follow-ups, stats, persistence). All checks are deterministic.
"""

import json
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.key_schema import (  # noqa: E402
    COGNITIVE_MOVES,
    CONTEXT_FAMILIES,
    KEY_FIELDS,
    KEY_SCHEMA,
    KeyGrid,
    derive_outcome,
    make_key,
    validate_key,
)
from backend.its.solver.misconception_catalog import (  # noqa: E402
    DEFAULT_MISCONCEPTIONS,
    MisconceptionCatalog,
)

_REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
_REPAIRED_DIR = os.path.join(
    _REPO_ROOT, "cbse_data", "nodes", "by_class", "split", "final_repaired"
)


# --------------------------------------------------------------------------- #
# Fixture: a small synthetic node graph
# --------------------------------------------------------------------------- #

M10_NODE_1 = {
    "node_id": "m10_001",
    "topic": "Quadratic Equations",
    "content_snippet": "Solving quadratic equations by factorisation.",
    "subject": "maths",
    "class_level": 10,
    "chapter": "Quadratic Equations",
    "concept_tags": ["quadratic-equation", "factorisation", "roots"],
    "scope_constraints": [
        "Teach solving quadratic equations by factorisation",
        "Teach the relationship between roots and coefficients",
        "Skip deriving the quadratic formula",
    ],
    "prerequisite_node_ids": [],
    "forward_node_ids": ["m10_002"],
}

M10_NODE_2 = {
    "node_id": "m10_002",
    "topic": "Quadratic Word Problems",
    "content_snippet": "Modelling word problems with quadratics.",
    "subject": "Mathematics",  # alias -> maths, same chapter group
    "class_level": 10,
    "chapter": "Quadratic Equations",
    "concept_tags": ["quadratic-equation", "modelling"],
    "scope_constraints": [
        "Include modelling word problems with quadratic equations",
    ],
    "prerequisite_node_ids": ["m10_001"],
    "forward_node_ids": [],
}

P12_NODE_1 = {
    "node_id": "p12_001",
    "topic": "Electric Current",
    "content_snippet": "Definition of electric current.",
    "subject": "physics",
    "class_level": 12,
    "chapter": "Current Electricity",
    "concept_tags": ["electric-current"],
    "scope_constraints": ["Teach the definition of electric current"],
    "prerequisite_node_ids": [],
    "forward_node_ids": ["p12_002"],
}

P12_NODE_2 = {
    "node_id": "p12_002",
    "topic": "Drift Velocity",
    "content_snippet": "Relation between current and drift velocity.",
    "subject": "physics",
    "class_level": 12,
    "chapter": "Current Electricity",
    "concept_tags": ["drift-velocity"],
    "scope_constraints": ["Teach the relation between current and drift velocity"],
    "prerequisite_node_ids": ["p12_001"],
    "forward_node_ids": ["p12_003"],
}

P12_NODE_3 = {
    "node_id": "p12_003",
    "topic": "Ohm's Law",
    "content_snippet": "Ohm's law and its limitations.",
    "subject": "physics",
    "class_level": 12,
    "chapter": "Current Electricity",
    "concept_tags": ["ohms-law"],
    "scope_constraints": ["Teach Ohm's law and its limitations"],
    "prerequisite_node_ids": ["p12_002"],
    "forward_node_ids": [],
}

M8_NODE_1 = {
    "node_id": "m8_001",
    "topic": "Linear Equations in One Variable",
    "content_snippet": "Solving linear equations.",
    "subject": "math",
    "class_level": 8,
    "chapter": "Linear Equations",
    "concept_tags": ["linear-equation"],
    "scope_constraints": ["Teach solving linear equations in one variable"],
    "prerequisite_node_ids": [],
    "forward_node_ids": [],
}


@pytest.fixture()
def nodes_dir(tmp_path):
    directory = tmp_path / "nodes"
    directory.mkdir()
    (directory / "class_10_maths.json").write_text(
        json.dumps([M10_NODE_1, M10_NODE_2]), encoding="utf-8"
    )
    (directory / "class_12_physics.json").write_text(
        json.dumps([P12_NODE_1, P12_NODE_2, P12_NODE_3]), encoding="utf-8"
    )
    (directory / "class_8_maths.json").write_text(
        json.dumps([M8_NODE_1]), encoding="utf-8"
    )
    (directory / "bad.json").write_text("{ this is not json", encoding="utf-8")
    return str(directory)


@pytest.fixture()
def grid(nodes_dir):
    g = KeyGrid()
    g.load_from_graph(nodes_dir)
    g.generate_keys(min_per_chapter=3)
    return g


def _key_with_node(grid, node_id):
    matches = [k for k in grid.key_ids() if node_id in grid._keys[k]["node_ids"]]
    assert len(matches) == 1, node_id
    return matches[0]


# --------------------------------------------------------------------------- #
# Key schema template
# --------------------------------------------------------------------------- #

def test_key_schema_template_has_all_fields():
    expected = {
        "key_id", "subject", "class_level", "chapter", "topic",
        "learning_outcome", "cognitive_move", "reasoning_pattern",
        "marking_template", "node_ids", "prerequisite_keys",
        "misconceptions", "context_families", "difficulty_range",
    }
    assert expected <= set(KEY_SCHEMA)
    assert set(KEY_SCHEMA) == KEY_FIELDS


def test_make_key_defaults_are_fresh_and_validated():
    a = make_key()
    b = make_key()
    a["reasoning_pattern"].append("mutated")
    assert a["reasoning_pattern"] != b["reasoning_pattern"]  # no shared lists
    assert b["difficulty_range"] == [1, 3]
    with pytest.raises(ValueError):
        make_key(cognitive_move="meditate")
    with pytest.raises(ValueError):
        make_key(not_a_field=1)
    key = make_key(cognitive_move="apply")
    assert validate_key(key)  # defaults alone are structurally incomplete


def test_derive_outcome_positive_and_skip_constraints():
    outcome = derive_outcome("Teach solving quadratic equations by factorisation")
    assert outcome == "Students can explain solving quadratic equations by factorisation"
    assert derive_outcome("Skip deriving the quadratic formula") is None
    assert derive_outcome("Avoid the formal proof") is None
    assert derive_outcome("") is None
    fallback = derive_outcome("The Nernst equation relates voltage to concentration")
    assert fallback.startswith("Students can ")


# --------------------------------------------------------------------------- #
# KeyGrid: loading and generation
# --------------------------------------------------------------------------- #

def test_load_from_graph_reads_nodes_and_skips_bad_files(nodes_dir):
    g = KeyGrid()
    count = g.load_from_graph(nodes_dir)
    assert count == 6  # m10 x2, p12 x3, m8 x1
    assert any(f.endswith("bad.json") for f in g.skipped_files)
    assert g.chapter_count() == 3  # maths c10, physics c12, maths c8


def test_subject_alias_merges_into_same_chapter_group(nodes_dir):
    g = KeyGrid()
    g.load_from_graph(nodes_dir)
    groups = [k for k in g._chapter_outcomes if k[0] == "maths" and k[1] == 10]
    assert len(groups) == 1  # "maths" and "Mathematics" merged
    outcomes = [o["outcome"] for o in g._chapter_outcomes[groups[0]]]
    assert any("modelling word problems" in o for o in outcomes)


def test_generate_keys_meets_min_per_chapter(nodes_dir):
    g = KeyGrid()
    g.load_from_graph(nodes_dir)
    total = g.generate_keys(min_per_chapter=3)
    assert total == len(g)
    report = g.coverage_report()
    for cid, rec in report["chapters"].items():
        assert rec["total_keys"] >= 3, cid
    # chapter with a single outcome still gets min_per_chapter keys
    g5 = KeyGrid()
    g5.load_from_graph(nodes_dir)
    g5.generate_keys(min_per_chapter=5)
    lin = [
        k for k in g5.key_ids() if k.startswith("maths_c8_linear_equations_")
    ]
    assert len(lin) == 5


def test_generated_keys_are_unique_and_structurally_valid(grid):
    ids = grid.key_ids()
    assert len(ids) == len(set(ids))
    for kid in ids:
        key = grid.get_key(kid)
        assert validate_key(key) == [], (kid, validate_key(key))
        assert 3 <= len(key["reasoning_pattern"]) <= 5
        assert len(key["marking_template"]) == len(key["reasoning_pattern"])
        assert key["cognitive_move"] in COGNITIVE_MOVES
        assert all(f in CONTEXT_FAMILIES for f in key["context_families"])
        assert 1 <= key["difficulty_range"][0] <= key["difficulty_range"][1] <= 5
        assert key["node_ids"], "every key must link at least one node"


def test_learning_outcomes_exclude_skip_constraints(grid):
    assert "quadratic formula" not in json.dumps(grid.export()).lower()
    quad = [k for k in grid.key_ids() if k.startswith("maths_c10_quadratic_equations_")]
    assert len(quad) == 3  # 3 outcomes (2 + 1), min_per_chapter 3
    outcomes = {grid.get_key(k)["learning_outcome"] for k in quad}
    assert all(o.startswith("Students can ") for o in outcomes)
    assert any("factorisation" in o for o in outcomes)


def test_keys_cross_cognitive_moves_deterministically(grid):
    quad = [k for k in grid.key_ids()
            if k.startswith("maths_c10_quadratic_equations_")]
    assert {grid.get_key(k)["cognitive_move"] for k in quad} == \
        {"apply", "analyse", "evaluate"}
    # the move is embedded in the key id and matches the key's move field
    for move in ("apply", "analyse", "evaluate"):
        kid = "maths_c10_quadratic_equations_%s" % move
        assert kid in grid
        assert grid.get_key(kid)["cognitive_move"] == move
    # regeneration is identical (deterministic)
    snapshot = grid.export()
    grid.generate_keys(min_per_chapter=3)
    assert grid.export() == snapshot


# --------------------------------------------------------------------------- #
# KeyGrid: queries
# --------------------------------------------------------------------------- #

def test_get_keys_for_concept(grid):
    keys = grid.get_keys_for_concept("factorisation")
    assert keys
    assert all("m10_001" in k["node_ids"] for k in keys)
    assert grid.get_keys_for_concept("ohms-law")
    assert grid.get_keys_for_concept("no-such-tag") == []
    # alias casing is normalised
    assert grid.get_keys_for_concept("Factorisation") == keys


def test_get_prerequisite_chain(grid):
    k_current = _key_with_node(grid, "p12_001")
    k_drift = _key_with_node(grid, "p12_002")
    k_ohm = _key_with_node(grid, "p12_003")
    assert grid.get_key(k_drift)["node_ids"] == ["p12_002"]
    assert grid.get_key(k_drift)["prerequisite_keys"] == [k_current]
    assert grid.get_key(k_ohm)["prerequisite_keys"] == [k_drift]
    assert grid.get_prerequisite_chain(k_ohm) == [k_drift, k_current]
    assert grid.get_prerequisite_chain(k_current) == []
    with pytest.raises(KeyError):
        grid.get_prerequisite_chain("nope")
    # cycle-safe: self-referencing prerequisite cannot loop forever
    grid._keys[k_current]["prerequisite_keys"] = [k_current]
    assert grid.get_prerequisite_chain(k_current) == []


def test_add_misconception(grid):
    kid = "maths_c10_quadratic_equations_apply"
    grid.add_misconception(kid, {
        "id": "sign_flip",
        "description": "Student flips a sign during algebraic manipulation",
        "node_id": "m10_001",
    })
    misconceptions = grid.get_key(kid)["misconceptions"]
    assert misconceptions == [{
        "id": "sign_flip",
        "description": "Student flips a sign during algebraic manipulation",
        "node_id": "m10_001",
    }]
    grid.add_misconception(kid, {"id": "sign_flip", "description": "dup",
                                 "node_id": "x"})
    assert len(grid.get_key(kid)["misconceptions"]) == 1  # idempotent
    with pytest.raises(KeyError):
        grid.add_misconception("nope", {"id": "x"})
    with pytest.raises(ValueError):
        grid.add_misconception(kid, {"description": "no id"})


# --------------------------------------------------------------------------- #
# KeyGrid: persistence and coverage
# --------------------------------------------------------------------------- #

def test_export_save_load_roundtrip(grid, tmp_path):
    path = str(tmp_path / "key_grid.json")
    grid.save(path)
    restored = KeyGrid().load(path)
    assert restored.export() == grid.export()
    assert restored.get_prerequisite_chain(
        "physics_c12_current_electricity_evaluate"
    ) == grid.get_prerequisite_chain(
        "physics_c12_current_electricity_evaluate"
    )
    assert restored.get_keys_for_concept("factorisation") == \
        grid.get_keys_for_concept("factorisation")
    assert restored.coverage_report() == grid.coverage_report()
    # a payload with the wrong format marker is rejected
    bad = tmp_path / "bad_format.json"
    bad.write_text(json.dumps({"format": "nope", "keys": []}), encoding="utf-8")
    with pytest.raises(ValueError):
        KeyGrid().load(str(bad))


def test_coverage_report(grid):
    report = grid.coverage_report()
    summary = report["summary"]
    assert summary["total_keys"] == len(grid)
    assert summary["total_chapters"] == 3
    assert summary["total_gaps"] == sum(
        len(r["coverage_gaps"]) for r in report["chapters"].values()
    )
    maths = report["chapters"]["maths|10|Quadratic Equations"]
    assert maths["total_keys"] == 3
    assert maths["keys_per_cognitive_move"] == {
        "apply": 1, "analyse": 1, "evaluate": 1,
        "compare": 0, "interpret_data": 0,
    }
    assert maths["coverage_gaps"] == ["compare", "interpret_data"]
    assert maths["learning_outcomes"] == 3


def test_generate_keys_attaches_catalog_misconceptions(nodes_dir):
    from backend.its.solver.key_schema import KeyGrid as KG

    g = KG()
    g.load_from_graph(nodes_dir)
    g.generate_keys(min_per_chapter=3, catalog=MisconceptionCatalog())
    physics = [
        g.get_key(k) for k in g.key_ids()
        if k.startswith("physics_c12_current_electricity_")
    ]
    attached = {m["id"] for k in physics for m in k["misconceptions"]}
    assert attached == {
        "direction_bias", "energy_conservation_gap", "formula_selection",
    }
    assert all(
        set(m) == {"id", "description", "node_id"}
        for k in physics for m in k["misconceptions"]
    )


# --------------------------------------------------------------------------- #
# MisconceptionCatalog
# --------------------------------------------------------------------------- #

def test_default_catalog_has_20_misconceptions():
    assert len(DEFAULT_MISCONCEPTIONS) == 20
    catalog = MisconceptionCatalog()
    assert len(catalog) == 20
    assert catalog.ids()[0] == "cause_effect_swap"
    assert catalog.ids()[-1] == "unit_confusion"
    for entry in catalog.entries():
        assert entry["detector_pattern"]  # raw regex present
        assert entry["remediation"]
        assert entry["isolating_questions"] >= 1
        assert entry["subjects"] and entry["classes"]


def test_get_by_error_type():
    catalog = MisconceptionCatalog()
    entry = catalog.get_by_error_type("sign_flip")
    assert entry["description"] == "Student flips a sign during algebraic manipulation"
    assert entry["subjects"] == ["maths", "physics"]
    assert entry["classes"] == [8, 9, 10, 11, 12]
    assert catalog.get_by_error_type("Sign Flip")["id"] == "sign_flip"
    assert catalog.get_by_error_type("no_such_error") is None


def test_get_by_subject():
    catalog = MisconceptionCatalog()
    maths = catalog.get_by_subject("maths")
    ids = {e["id"] for e in maths}
    assert "sign_flip" in ids
    assert "order_of_operations" in ids
    assert "supply_demand_curve" not in ids
    # alias normalisation
    assert {e["id"] for e in catalog.get_by_subject("Mathematics")} == ids
    assert {e["id"] for e in catalog.get_by_subject("economics")} == {
        "supply_demand_curve", "formula_selection"
    }
    assert catalog.get_by_subject("underwater_basket_weaving") == []


def test_get_by_class():
    catalog = MisconceptionCatalog()
    class5 = {e["id"] for e in catalog.get_by_class(5)}
    assert class5 == {"order_of_operations"}
    class6_ids = {e["id"] for e in catalog.get_by_class(6)}
    assert "fraction_inversion" in class6_ids
    assert "climate_weather_confusion" in class6_ids
    assert "supply_demand_curve" not in class6_ids
    assert catalog.get_by_class(3) == []
    assert len(catalog.get_by_class(11)) >= 5


def test_link_to_node_is_idempotent_and_validated(tmp_path):
    catalog = MisconceptionCatalog()
    catalog.link_to_node("sign_flip", "jemh101_c10_math_cbse_001")
    catalog.link_to_node("sign_flip", "jemh101_c10_math_cbse_001")  # no dup
    entry = catalog.get_by_error_type("sign_flip")
    assert entry["linked_nodes"] == ["jemh101_c10_math_cbse_001"]
    with pytest.raises(KeyError):
        catalog.link_to_node("nope", "some_node")
    # links survive a save/load round-trip
    path = str(tmp_path / "catalog.json")
    catalog.save(path)
    restored = MisconceptionCatalog().load(path)
    assert restored.get_by_error_type("sign_flip")["linked_nodes"] == [
        "jemh101_c10_math_cbse_001"
    ]


def test_get_remediation():
    catalog = MisconceptionCatalog()
    text = catalog.get_remediation("percent_base_error")
    assert isinstance(text, str) and text
    assert text == catalog.get_by_error_type("percent_base_error")["remediation"]
    with pytest.raises(KeyError):
        catalog.get_remediation("nope")


def test_suggest_followup_deterministic():
    catalog = MisconceptionCatalog()
    a = catalog.suggest_followup("unit_confusion")
    b = catalog.suggest_followup("unit_confusion")
    assert a == b  # deterministic
    assert len(a) == 3
    assert [q["question_no"] for q in a] == [1, 2, 3]
    assert all(q["misconception_id"] == "unit_confusion" for q in a)
    assert all(q["detector_pattern"] == catalog.get_by_error_type(
        "unit_confusion")["detector_pattern"] for q in a)
    assert len(catalog.suggest_followup("unit_confusion", count=2)) == 2
    # capped by the entry's isolating_questions
    assert len(catalog.suggest_followup("unit_confusion", count=99)) == 3
    with pytest.raises(KeyError):
        catalog.suggest_followup("nope")


def test_stats_counts_per_subject_and_class():
    catalog = MisconceptionCatalog()
    stats = catalog.stats()
    assert stats["total"] == 20
    entries = catalog.entries()
    expected_maths = sum(1 for e in entries if "maths" in e["subjects"])
    assert stats["per_subject"]["maths"] == expected_maths
    assert stats["per_subject"]["economics"] == 2  # formula_selection + supply_demand_curve
    expected_c10 = sum(1 for e in entries if 10 in e["classes"])
    assert stats["per_class"][10] == expected_c10
    assert list(stats["per_class"]) == sorted(stats["per_class"])
    assert sum(1 for e in entries if "physics" in e["subjects"]) == \
        stats["per_subject"]["physics"]


def test_catalog_save_load_roundtrip(tmp_path):
    catalog = MisconceptionCatalog()
    catalog.link_to_node("mole_concept_error", "chem_node_1")
    path = str(tmp_path / "catalog.json")
    catalog.save(path)
    restored = MisconceptionCatalog().load(path)
    assert restored.entries() == catalog.entries()
    assert len(restored) == 20
    # load() with no path resets to the built-in defaults (drops the link)
    fresh = MisconceptionCatalog()
    fresh.link_to_node("mole_concept_error", "chem_node_1")
    fresh.load()
    assert fresh.get_by_error_type("mole_concept_error")["linked_nodes"] == []
    assert len(fresh) == 20
    bad = tmp_path / "bad_catalog.json"
    bad.write_text(json.dumps({"format": "wrong", "entries": []}), encoding="utf-8")
    with pytest.raises(ValueError):
        MisconceptionCatalog().load(str(bad))


def test_detector_patterns_are_raw_regex_strings():
    for entry in DEFAULT_MISCONCEPTIONS:
        pattern = entry["detector_pattern"]
        assert isinstance(pattern, str) and pattern
        assert "\\" not in pattern or not pattern.startswith(('"', "'"))


# --------------------------------------------------------------------------- #
# Smoke test against the real repaired graph (skipped if absent)
# --------------------------------------------------------------------------- #

@pytest.mark.skipif(
    not os.path.isdir(_REPAIRED_DIR), reason="repaired node graph not present"
)
def test_real_repaired_graph_smoke():
    grid = KeyGrid()
    loaded = grid.load_from_graph(_REPAIRED_DIR)
    assert loaded >= 1000
    total = grid.generate_keys(min_per_chapter=3, catalog=MisconceptionCatalog())
    report = grid.coverage_report()
    assert report["summary"]["total_keys"] == total
    assert report["summary"]["total_chapters"] == grid.chapter_count()
    assert total >= grid.chapter_count() * 3
    # concept and prerequisite queries work at scale
    assert isinstance(grid.get_keys_for_concept("quadratic-equation"), list)
    some_key = grid.key_ids()[0]
    assert isinstance(grid.get_prerequisite_chain(some_key), list)
