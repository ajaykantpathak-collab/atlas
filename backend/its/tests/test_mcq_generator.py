"""test_mcq_generator.py -- MCQ generation suite.

Covers distractor generation (determinism, plausibility, error-type
labels), the validator rule stack, batch generation with the vary()
number pattern, and error-type diversity across items.
"""

from __future__ import annotations

import pytest

from backend.its.solver.mcq_generator import (
    ERROR_TYPES, _get_relation, _pattern_candidates, _plausible,
    generate_distractors, generate_mcq, generate_mcq_batch, validate_mcq)

CLOSE = {"opening": 50000.0, "profit": 20000.0, "drawings": 10000.0}
CLOSE_ANSWER = 60000.0
ROI_VALUES = {"ebit": 20000.0, "cap": 100000.0}
ROI_ANSWER = 20.0


def _option_values(mcq: dict) -> dict:
    return {k: float(v.replace(",", ""))
            for k, v in mcq["options"].items()}


# --------------------------------------------------------------------------- #
# Distractor generation
# --------------------------------------------------------------------------- #

def test_distractors_three_distinct_not_correct():
    ds = generate_distractors(CLOSE_ANSWER, CLOSE, "closing_capital")
    assert len(ds) == 3
    vals = [v for v, _ in ds]
    assert all(v != CLOSE_ANSWER for v in vals)
    assert len(set(vals)) == 3
    for _, et in ds:
        assert et in ERROR_TYPES


def test_distractors_plausible_spread():
    ds = generate_distractors(CLOSE_ANSWER, CLOSE, "closing_capital")
    for v, _ in ds:
        assert v > 0.0                                # money stays positive
        assert abs(v - CLOSE_ANSWER) <= 120000.0      # inside the spread band
        assert abs(v) <= CLOSE_ANSWER * 20            # never a wild outlier


def test_distractors_deterministic():
    a = generate_distractors(CLOSE_ANSWER, CLOSE, "closing_capital")
    b = generate_distractors(CLOSE_ANSWER, CLOSE, "closing_capital")
    assert a == b


def test_distractors_error_types_diverse_within_item():
    ds = generate_distractors(ROI_ANSWER, ROI_VALUES, "roi")
    assert len(ds) == 3
    types = {et for _, et in ds}
    assert len(types) == 3                            # one per misconception


def test_distractors_for_roi_percent_relation():
    ds = generate_distractors(ROI_ANSWER, ROI_VALUES, "roi")
    vals = [v for v, _ in ds]
    assert all(abs(v - ROI_ANSWER) > 1e-6 for v in vals)
    # percent relation: fraction / scaled / inverted replay errors appear
    assert any(abs(v) < 1.0 or v > ROI_ANSWER for v in vals)


def test_distractors_unknown_relation_still_three():
    ds = generate_distractors(CLOSE_ANSWER, CLOSE, "no_such_relation")
    assert len(ds) == 3
    assert all(v != CLOSE_ANSWER for v, _ in ds)
    assert len({v for v, _ in ds}) == 3


def test_every_error_pattern_produces_plausible_candidates():
    for rid, vals, ans in (("closing_capital", CLOSE, CLOSE_ANSWER),
                           ("roi", ROI_VALUES, ROI_ANSWER)):
        relation = _get_relation(rid)
        for et in ERROR_TYPES:
            cands = _pattern_candidates(et, ans, vals, relation)
            assert cands, f"{et} produced nothing for {rid}"
            assert any(_plausible(ans, c, vals) for c in cands), \
                f"{et} has no plausible candidate for {rid}"


# --------------------------------------------------------------------------- #
# Single MCQ assembly
# --------------------------------------------------------------------------- #

def test_generate_mcq_shape():
    m = generate_mcq("closing_capital", CLOSE, CLOSE_ANSWER, 8,
                     "accountancy")
    assert set(m) >= {"question", "options", "correct", "error_types",
                      "explanation"}
    assert sorted(m["options"]) == ["a", "b", "c", "d"]
    assert m["correct"] in m["options"]
    assert len(m["error_types"]) == 3
    distractors = sorted(set(m["options"]) - {m["correct"]})
    assert sorted(m["error_types"]) == distractors
    for info in m["error_types"].values():
        assert info["error_type"] in ERROR_TYPES
        assert info["misconception"]
    assert m["correct"] not in m["error_types"]
    assert m["question"] and m["explanation"]


def test_generate_mcq_options_distinct_and_correct_value():
    m = generate_mcq("closing_capital", CLOSE, CLOSE_ANSWER, 8,
                     "accountancy")
    vals = _option_values(m)
    assert len(set(vals.values())) == 4
    assert vals[m["correct"]] == pytest.approx(CLOSE_ANSWER)


def test_correct_position_rotates():
    letters = set()
    for k in range(1, 13):
        vals = {"opening": 40000.0 + 5000 * k,
                "profit": 15000.0 + 1000 * k,
                "drawings": 8000.0 + 500 * k}
        ans = vals["opening"] + vals["profit"] - vals["drawings"]
        m = generate_mcq("closing_capital", vals, ans, 8, "accountancy")
        letters.add(m["correct"])
    assert len(letters) >= 2


def test_class_level_changes_question_register():
    easy = generate_mcq("closing_capital", CLOSE, CLOSE_ANSWER, 6,
                        "accountancy")
    board = generate_mcq("closing_capital", CLOSE, CLOSE_ANSWER, 10,
                         "accountancy")
    assert "Find the closing capital." in easy["question"]
    assert "Calculate the closing capital." in board["question"]
    assert "Rs. 50,000" in easy["question"]


def test_explanation_carries_formula_and_answer():
    m = generate_mcq("roi", ROI_VALUES, ROI_ANSWER, 10, "commerce")
    assert "EBIT / capital employed x 100" in m["explanation"]
    assert "= 20" in m["explanation"]


# --------------------------------------------------------------------------- #
# Validation rules
# --------------------------------------------------------------------------- #

def test_validate_accepts_generated_mcqs():
    for rid, vals, ans in (("closing_capital", CLOSE, CLOSE_ANSWER),
                           ("roi", ROI_VALUES, ROI_ANSWER)):
        m = generate_mcq(rid, vals, ans, 9, "commerce")
        ok, issues = validate_mcq(m)
        assert ok, issues


def test_validate_rejects_all_and_none_of_the_above():
    m = {"options": {"a": "1", "b": "2", "c": "All of the above",
                     "d": "4"},
         "correct": "a"}
    ok, issues = validate_mcq(m)
    assert not ok
    assert any("all of the above" in i for i in issues)
    m = {"options": {"a": "1", "b": "2", "c": "None of the above",
                     "d": "4"},
         "correct": "a"}
    ok, issues = validate_mcq(m)
    assert not ok
    assert any("none of the above" in i for i in issues)


def test_validate_rejects_structural_breaks():
    base = {"options": {"a": "1", "b": "2", "c": "3", "d": "4"},
            "correct": "a"}
    m = dict(base, options={"a": "1", "b": "2", "c": "3"})
    ok, issues = validate_mcq(m)
    assert not ok and any("4 options" in i for i in issues)
    m = dict(base, correct="e")
    ok, issues = validate_mcq(m)
    assert not ok and any("exactly one correct" in i for i in issues)
    m = dict(base, correct=["a", "b"])
    ok, issues = validate_mcq(m)
    assert not ok
    m = dict(base, options={"a": "5", "b": "5", "c": "3", "d": "4"})
    ok, issues = validate_mcq(m)
    assert not ok and any("duplicate" in i for i in issues)


def test_validate_rejects_length_outlier():
    m = {"options": {"a": "20", "b": "500", "c": "2,000",
                     "d": "200,000"},
         "correct": "a"}
    ok, issues = validate_mcq(m)
    assert not ok
    assert any("length variance" in i for i in issues)


def test_validate_position_history_guard():
    m = {"options": {"a": "1", "b": "2", "c": "3", "d": "4"},
         "correct": "a"}
    ok, issues = validate_mcq(m, position_history=["a", "a"])
    assert not ok
    assert any("same position" in i for i in issues)
    ok, _ = validate_mcq(m, position_history=["a", "b"])
    assert ok
    ok, _ = validate_mcq(m)
    assert ok


# --------------------------------------------------------------------------- #
# Batch generation
# --------------------------------------------------------------------------- #

def test_batch_closing_capital():
    out = generate_mcq_batch("closing_capital", [CLOSE], "accountancy",
                             count=8, class_level=8)
    assert len(out) == 8
    answers = {m["options"][m["correct"]] for m in out}
    assert len(answers) >= 2                # numbers actually varied
    letters = {m["correct"] for m in out}
    assert len(letters) >= 2                # key position rotates


def test_batch_roi():
    out = generate_mcq_batch("roi", [ROI_VALUES], "commerce",
                             count=6, class_level=10)
    assert len(out) == 6
    union = set()
    for m in out:
        ok, issues = validate_mcq(m)
        assert ok, issues
        union |= {i["error_type"] for i in m["error_types"].values()}
    assert len(union) >= 3                  # misconceptions vary by item


def test_batch_returns_only_valid_mcqs():
    out = generate_mcq_batch("closing_capital", [CLOSE], "accountancy",
                             count=5, class_level=7)
    assert out
    for m in out:
        ok, issues = validate_mcq(m)
        assert ok, issues
        assert sorted(m["options"]) == ["a", "b", "c", "d"]


def test_error_type_diversity():
    m_close = generate_mcq("closing_capital", CLOSE, CLOSE_ANSWER, 8,
                           "accountancy")
    m_roi = generate_mcq("roi", ROI_VALUES, ROI_ANSWER, 8, "commerce")
    t1 = {i["error_type"] for i in m_close["error_types"].values()}
    t2 = {i["error_type"] for i in m_roi["error_types"].values()}
    assert len(t1) == 3 and len(t2) == 3
    assert len(t1 | t2) >= 3
    # additive vs percent relations surface different misconception sets
    assert t1 != t2
    out = generate_mcq_batch("closing_capital", [CLOSE], "accountancy",
                             count=6, class_level=8)
    union = set()
    for m in out:
        union |= {i["error_type"] for i in m["error_types"].values()}
    assert len(union) >= 3
