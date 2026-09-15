"""test_question_types.py -- Assertion-Reason / Statement / Match generators.

Checks the three special-format CBSE generators in
backend.its.solver.question_types:

    - structure and determinism of every generator
    - all four AR outcome variants with correct truth patterns
    - false statements are genuine perturbations of true ones
    - statement-question answer key consistency with true_statements
    - match questions keep a letter-to-number bijection after shuffle
    - validators reject seeded quality defects
    - batch generation over the REAL class-10 node bank
"""

from __future__ import annotations

import json
import os
import sys

import pytest

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..", "..")))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..")))

from backend.its.solver.question_types import (  # noqa: E402
    AR_OPTION_TEXTS,
    STMT_OPTION_TEXTS,
    generate_ar,
    generate_match_question,
    generate_question_type_batch,
    generate_statement_question,
    validate_ar,
    validate_match,
    validate_statement,
)

NODES_PATH = os.path.join(
    os.path.dirname(_HERE), "..", "..", "cbse_data", "nodes", "by_class",
    "split", "final_repaired", "class_10_math_fixed.json")
NODES_PATH = os.path.abspath(NODES_PATH)

_FAKE_NODE = {
    "node_id": "test_bio_001",
    "topic": "Photosynthesis Basics",
    "content_snippet": (
        "Green plants convert light energy into chemical energy during "
        "photosynthesis. Chlorophyll absorbs sunlight mainly in the blue "
        "and red regions of the visible spectrum. The oxygen released "
        "during photosynthesis comes from water molecules."),
    "concept_tags": ["photosynthesis", "chlorophyll", "light-reaction"],
    "chapter_name": "Life Processes",
    "class_level": 10,
    "subject": "biology",
}

# Snippet engineered so the antonym-swap perturbation is guaranteed
# ("always" -> "never" fires before any other op).
_IRRATIONAL_NODE = {
    "node_id": "test_math_002",
    "topic": "Irrationality of Sums of Rational and Irrational Numbers",
    "content_snippet": (
        "The sum or difference of a rational number and an irrational "
        "number is always irrational. The product of a non-zero rational "
        "number and an irrational number is also irrational."),
    "concept_tags": ["irrational-numbers", "proof-by-contradiction"],
    "chapter_name": "Real Numbers",
    "class_level": 10,
    "subject": "math",
}


def _real_nodes(limit: int = None) -> list:
    if not os.path.exists(NODES_PATH):
        pytest.skip("real class-10 node bank not present")
    with open(NODES_PATH, encoding="utf-8") as f:
        data = json.load(f)
    return data[:limit] if limit else data


# --------------------------------------------------------------------------- #
# Assertion-Reason
# --------------------------------------------------------------------------- #

def test_ar_structure():
    ar = generate_ar(_FAKE_NODE)
    assert ar["type"] == "assertion_reason"
    assert "Assertion (A):" in ar["question"]
    assert "Reason (R):" in ar["question"]
    assert set(ar["options"]) == {"a", "b", "c", "d"}
    assert ar["correct"] in "abcd"
    assert ar["explanation"]
    assert ar["assertion"] and ar["reason"]
    assert ar["assertion"] != ar["reason"]
    for text in ar["options"].values():
        assert "Assertion" not in text  # options are the 4 standard keys


def test_ar_all_four_variants():
    seen_letters = set()
    for v in ("a", "b", "c", "d"):
        ar = generate_ar(_FAKE_NODE, variant=v)
        assert ar["correct"] == v
        seen_letters.add(v)
        flags = (ar["assertion_is_true"], ar["reason_is_true"])
        expected = {"a": (True, True), "b": (True, True),
                    "c": (True, False), "d": (False, True)}[v]
        assert flags == expected, f"variant {v} truth pattern wrong"
    assert seen_letters == {"a", "b", "c", "d"}
    # the same node must give different keys across variants
    keys = {generate_ar(_FAKE_NODE, variant=v)["correct"]
            for v in "abcd"}
    assert len(keys) == 4


def test_ar_default_variant_varies_by_node():
    letters = {generate_ar(nd)["correct"]
               for nd in _real_nodes(40)}
    assert letters <= set("abcd")
    assert len(letters) >= 2, "default variant never varied"


def test_ar_false_components_are_perturbations():
    # variant d falsifies pool[0] (the "always irrational" sentence)
    ar_d = generate_ar(_IRRATIONAL_NODE, variant="d")
    assert "never" in ar_d["assertion"]   # antonym swap: always -> never
    assert "always irrational" in ar_d["explanation"]
    # variant c keeps A true and falsifies the second true statement
    ar_c = generate_ar(_IRRATIONAL_NODE, variant="c")
    assert "always" in ar_c["assertion"]
    assert ar_c["reason"] != ar_c["assertion"]
    assert ar_c["reason"] not in _IRRATIONAL_NODE["content_snippet"]
    assert "actually says" in ar_c["explanation"]


def test_ar_deterministic():
    a1 = generate_ar(_IRRATIONAL_NODE)
    a2 = generate_ar(_IRRATIONAL_NODE)
    assert json.dumps(a1, sort_keys=True) == json.dumps(a2, sort_keys=True)


def test_ar_requires_content():
    with pytest.raises(ValueError):
        generate_ar({})
    with pytest.raises(ValueError):
        generate_ar({"topic": "T", "content_snippet": "Too short."})
    with pytest.raises(ValueError):
        generate_ar(_FAKE_NODE, variant="z")


# --------------------------------------------------------------------------- #
# Validators
# --------------------------------------------------------------------------- #

def test_validate_ar_passes_generated():
    for nd in [_FAKE_NODE, _IRRATIONAL_NODE] + _real_nodes(8):
        ok, issues = validate_ar(generate_ar(nd))
        assert ok, f"generated AR rejected: {issues}"


def test_validate_ar_rejects_all_of_the_above():
    ar = generate_ar(_FAKE_NODE)
    ar["options"]["b"] = "All of the above"
    ok, issues = validate_ar(ar)
    assert not ok
    assert any("all/none of the above" in i for i in issues)


def test_validate_ar_rejects_definitions():
    ar = generate_ar(_FAKE_NODE)
    ar["assertion"] = ("Accommodation is the ability of the eye lens to "
                       "change focal length.")
    ok, issues = validate_ar(ar)
    assert not ok
    assert any("definition" in i for i in issues)


def test_validate_ar_rejects_thin_content():
    ar = generate_ar(_FAKE_NODE)
    ar["assertion"] = "Short."
    ok, issues = validate_ar(ar)
    assert not ok
    assert any("substantive" in i for i in issues)

    ar2 = generate_ar(_FAKE_NODE)
    del ar2["explanation"]
    ok, issues = validate_ar(ar2)
    assert not ok
    assert any("missing key" in i for i in issues)


# --------------------------------------------------------------------------- #
# Statement-based
# --------------------------------------------------------------------------- #

def test_statement_structure_and_options_text():
    sq = generate_statement_question(_FAKE_NODE)
    assert sq["type"] == "statement_based"
    assert len(sq["statements"]) == 3
    assert sq["options"] == STMT_OPTION_TEXTS[3] == {
        "a": "1 and 2 only", "b": "2 and 3 only",
        "c": "1 and 3 only", "d": "All of the above"}
    assert sq["correct"] in "abcd"
    assert "Which of the statements given above" in sq["question"]
    for s in sq["statements"]:
        assert len(s) > 15


def test_statement_answer_key_consistency():
    for nd in [_FAKE_NODE, _IRRATIONAL_NODE] + _real_nodes(12):
        sq = generate_statement_question(nd)
        true_set = {f"{i}" for i in sq["true_statements"]}
        claimed = set()
        for i in range(1, len(sq["statements"]) + 1):
            if sq["correct"] == "d":
                claimed.add(f"{i}")
            elif f"{i}" in sq["options"][sq["correct"]]:
                claimed.add(f"{i}")
        if sq["options"][sq["correct"]] == "All of the above":
            claimed = {f"{i}" for i in range(1, 4)}
        assert claimed == true_set, (
            f"answer key mismatch for {nd.get('node_id')}")
        ok, issues = validate_statement(sq)
        assert ok, issues


def test_statement_varying_true_counts():
    counts = set()
    for nd in _real_nodes(60):
        sq = generate_statement_question(nd)
        counts.add(len(sq["true_statements"]))
    assert len(counts) >= 2, "true-statement count never varied"
    assert max(counts) <= 3


def test_statement_two_and_four_statements():
    sq2 = generate_statement_question(_FAKE_NODE, num_statements=2)
    assert len(sq2["statements"]) == 2
    assert set(sq2["options"]) == {"a", "b", "c", "d"}
    assert validate_statement(sq2)[0]
    sq4 = generate_statement_question(_FAKE_NODE, num_statements=4)
    assert len(sq4["statements"]) == 4
    assert sq4["options"]["d"] == "All of the above"
    assert validate_statement(sq4)[0]
    with pytest.raises(ValueError):
        generate_statement_question(_FAKE_NODE, num_statements=5)


def test_statement_too_little_content_raises():
    poor = {"node_id": "poor", "topic": "Bare Topic"}
    with pytest.raises(ValueError):
        generate_statement_question(poor)


def test_validate_statement_rejects_short_and_duplicates():
    sq = generate_statement_question(_FAKE_NODE)
    sq["statements"][1] = "Too short."
    ok, issues = validate_statement(sq)
    assert not ok
    assert any("substantive" in i for i in issues)

    sq2 = generate_statement_question(_FAKE_NODE)
    sq2["statements"][2] = sq2["statements"][1]
    ok, issues = validate_statement(sq2)
    assert not ok
    assert any("duplicate" in i for i in issues)


def test_statement_falsified_sources_recorded():
    sq = generate_statement_question(_IRRATIONAL_NODE)
    if sq["falsified_sources"]:
        for idx, original in sq["falsified_sources"].items():
            shown = sq["statements"][int(idx) - 1]
            assert shown != original
            assert original in sq["explanation"]


# --------------------------------------------------------------------------- #
# Match-the-following
# --------------------------------------------------------------------------- #

def _chapter_group(min_size: int = 4) -> list:
    nodes = _real_nodes()
    groups = {}
    for nd in nodes:
        groups.setdefault(nd.get("chapter_name"), []).append(nd)
    best = max(groups.values(), key=len)
    assert len(best) >= min_size, "no big enough chapter group in bank"
    return best[:5]


def test_match_structure_and_bijection():
    group = _chapter_group()
    mq = generate_match_question(group)
    assert mq["type"] == "match_the_following"
    assert 4 <= len(mq["column_a"]) <= 5
    assert len(mq["column_a"]) == len(mq["column_b"])
    letters = [c.split(".", 1)[0] for c in mq["column_a"]]
    nums = [c.split(".", 1)[0] for c in mq["column_b"]]
    assert letters == list("abcdefgh"[:len(letters)])
    assert nums == [str(i) for i in range(1, len(nums) + 1)]
    values = sorted(mq["correct_matches"].values())
    assert values == [str(i) for i in range(1, len(nums) + 1)]
    assert set(mq["correct_matches"]) == set(letters)
    assert validate_match(mq)[0]
    assert mq["explanation"]


def test_match_unshuffle_recovers_pairings():
    markers = ["Zebra", "Mango", "Compass", "Glacier"]
    nodes = []
    for m in markers:
        nodes.append({
            "node_id": f"mk_{m}",
            "topic": f"{m} Method",
            "content_snippet": (
                f"The {m.lower()} method computes its result from the "
                f"base length and the measured angle. Every step of the "
                f"{m.lower()} method depends on this relation."),
            "concept_tags": [f"{m.lower()}-method"],
            "chapter_name": "Methods",
        })
    mq = generate_match_question(nodes)
    for entry in mq["column_a"]:
        letter, term = [p.strip() for p in entry.split(".", 1)]
        marker = term.split()[0].lower()
        pos = int(mq["correct_matches"][letter])
        desc = mq["column_b"][pos - 1]
        assert marker in desc.lower(), \
            f"{term} matched to the wrong Column B row"


def test_match_five_nodes_and_min_nodes_error():
    group = _chapter_group()
    mq5 = generate_match_question(group[:5])
    assert len(mq5["column_a"]) == 5
    assert set(mq5["correct_matches"]) == {"a", "b", "c", "d", "e"}
    with pytest.raises(ValueError):
        generate_match_question([_FAKE_NODE])
    with pytest.raises(ValueError):
        generate_match_question("not a list")


def test_match_dedupes_terms_and_deterministic():
    dup = [_FAKE_NODE, dict(_FAKE_NODE), _IRRATIONAL_NODE,
           _IRRATIONAL_NODE]
    mq = generate_match_question(dup + [_FAKE_NODE])
    terms = [c.split(".", 1)[1].strip().lower()
             for c in mq["column_a"]]
    assert len(terms) == len(set(terms))
    again = generate_match_question(dup + [_FAKE_NODE])
    assert json.dumps(again, sort_keys=True) == json.dumps(
        mq, sort_keys=True)


# --------------------------------------------------------------------------- #
# Batch generator
# --------------------------------------------------------------------------- #

def test_batch_ar_over_real_nodes():
    nodes = _real_nodes(30)
    batch = generate_question_type_batch(nodes, "assertion_reason")
    assert len(batch) >= 25, "batch lost too many nodes to validation"
    for item in batch:
        assert item["type"] == "assertion_reason"
        assert validate_ar(item)[0]


def test_batch_statement_over_real_nodes():
    nodes = _real_nodes(30)
    batch = generate_question_type_batch(nodes, "statement")
    assert len(batch) >= 25
    for item in batch:
        assert item["type"] == "statement_based"
        assert len(item["statements"]) == 3
        assert validate_statement(item)[0]


def test_batch_match_groups_by_chapter():
    nodes = _real_nodes()
    batch = generate_question_type_batch(nodes, "match_the_following")
    assert batch, "no match questions generated from the real bank"
    chapters = set()
    for item in batch:
        assert 4 <= len(item["column_a"]) <= 5
        assert validate_match(item)[0]
        chapters.add(item["chapter"])
    assert len(chapters) >= 3, "chapters were not grouped"
    # every chapter with >= 4 nodes should contribute at least one item
    groups = {}
    for nd in nodes:
        groups.setdefault(nd.get("chapter_name"), []).append(nd)
    big = {c for c, g in groups.items() if len(g) >= 4}
    assert big <= chapters


def test_batch_unknown_type_raises():
    with pytest.raises(ValueError):
        generate_question_type_batch([_FAKE_NODE], "crossword")
    with pytest.raises(ValueError):
        generate_question_type_batch([_FAKE_NODE], "")


def test_batch_deterministic():
    nodes = _real_nodes(15)
    b1 = generate_question_type_batch(nodes, "statement")
    b2 = generate_question_type_batch(nodes, "statement")
    assert json.dumps(b1, sort_keys=True) == json.dumps(
        b2, sort_keys=True)


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-q"]))
