"""test_socratic_moves.py -- the deterministic Socratic dialogue engine."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

import pytest
from backend.its.solver.socratic_moves import (
    SocraticSequence, build_sequence, grade_move, _grade, _norm)

ORANGES = "The price of 2 kg of oranges is Rs 113. Find the price of 5 kg."


def _seq(mid="unit_confusion", ans="113", q=ORANGES, key="282.5"):
    return build_sequence(mid, ans, q, key)


# -- structure -------------------------------------------------------------- #
def test_sequence_shape_known_family():
    s = _seq()
    kinds = [m["kind"] for m in s.moves]
    assert kinds[0] == "elicit"
    assert "isolate" in kinds
    assert kinds[-2] == "retry" and kinds[-1] == "handoff"


def test_payload_has_no_answer_keys():
    import json
    s = _seq()
    blob = json.dumps(s.payload())
    # structural guarantee: no move carries an answer field
    for m in s.payload()["moves"]:
        assert "answer" not in m
        assert "keys" not in m
    # word-keys (length >= 5 normalized) must not appear anywhere
    for keylist in s.keys.values():
        for k in keylist:
            nk = _norm(k)
            if len(nk) >= 5:
                assert nk not in _norm(blob), f"key leaked: {k}"


def test_elicit_quotes_student_answer():
    s = _seq(ans="113")
    assert "113" in s.moves[0]["text"]


def test_unknown_family_fails_soft_generic():
    s = build_sequence("nonexistent_family", "42", ORANGES, "282.5")
    assert s.misconception_id == "general"
    assert s.moves[0]["kind"] == "elicit"
    assert "42" in s.moves[0]["text"]
    # still ends with handoff — never dead-ends
    assert s.moves[-1]["kind"] == "handoff"


# -- grading ---------------------------------------------------------------- #
def test_iso_correct_skips_second_isolate():
    s = _seq("unit_confusion", "113")
    ok, fb, nxt = grade_move(s, "iso1", "20")
    assert ok is True and nxt == "retry"


def test_iso_wrong_goes_to_next_isolate():
    s = _seq("unit_confusion", "113")
    ok, fb, nxt = grade_move(s, "iso1", "9")   # wrong on purpose
    assert ok is False and nxt == "iso2"


def test_iso2_wrong_falls_to_retry_then_handoff():
    s = _seq("sign_flip", "7", "Solve: 3x = x + 8", "x=4")
    ok, _, nxt = grade_move(s, "iso1", "11")
    assert ok is False and nxt == "iso2"
    ok, _, nxt = grade_move(s, "iso2", "5")
    assert ok is False and nxt == "retry"
    ok, _, nxt = grade_move(s, "retry", "x=4")
    assert ok is True and nxt == "handoff"


def test_elicit_is_reflection_not_graded():
    s = _seq()
    ok, _, nxt = grade_move(s, "elicit", "i dont know")
    assert ok is True and nxt == "iso1"


def test_unknown_move_fails_closed_to_handoff():
    s = _seq()
    ok, fb, nxt = grade_move(s, "nope", "anything")
    assert ok is False and nxt == "handoff"


# -- authored content coverage ---------------------------------------------- #
def test_all_20_families_have_elicit_and_2_isolating():
    from backend.its.solver.misconception_catalog import DEFAULT_MISCONCEPTIONS
    from backend.its.solver.socratic_moves import _E, _ISO
    for e in DEFAULT_MISCONCEPTIONS:
        mid = e["id"]
        assert mid in _E, f"{mid}: no elicitation prompt"
        assert mid in _ISO, f"{mid}: no isolating questions"
        qs = _ISO[mid]
        assert len(qs) >= 2, f"{mid}: needs >=2 isolating Q&As"
        for q, accept in qs:
            assert q and accept and accept[0], f"{mid}: empty QA"


# -- normalization grading --------------------------------------------------- #
def test_grade_accepts_variants():
    assert _grade(["positive to negative"], "Positive  to negative.")
    assert _grade(["282.5"], "Rs 282.50")
    assert _grade(["1/4", "0.25", "25", "25%"], "25%")
    assert _grade(["1/4", "0.25", "25", "25%"], "1/4")
    assert _grade(["6.022e23"], "6.022 x 10^23")


def test_grade_rejects_garbage():
    assert not _grade(["20"], "2000")
    assert not _grade(["false"], "true")
    assert not _grade(["180"], "")


# -- zero-LLM guarantee ------------------------------------------------------ #
def test_no_llm_imports_in_module():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src = open(os.path.join(root, "its", "solver", "socratic_moves.py"),
               encoding="utf-8").read()
    for banned in ("LLMClient", "gemma", "Gemma", "openai", "requests.",
                   "urllib", "httpx"):
        assert banned not in src, f"LLM/network dependency found: {banned}"
