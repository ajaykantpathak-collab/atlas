"""Tutor loop tests: mastery updates, selection policy, grading,
hint ladder, mistake book.  All deterministic; a temp catalog fixture
keeps the tests independent of live corpus state."""
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.tutor import (TutorEngine, grade_numeric,
                                      _extract_number)


@pytest.fixture()
def engine(tmp_path):
    cat = {
        "class": 7, "subject": "science", "chapter": 4,
        "chapter_title": "Heat",
        "worked_examples": [
            {"q": "Convert 0 C to kelvin.", "a": "273 K"},
            {"q": "A body at 350 K is how many C?", "a": "77 C"},
        ],
        "concepts": [
            {"id": "x.4.1", "title": "Temperature scales",
             "formula": "K = C + 273", "question_patterns": ["p"]},
            {"id": "x.4.2", "title": "Conduction",
             "formula": "-", "question_patterns": ["p"]},
        ],
    }
    cat2 = dict(cat)
    cat2.update({"class": 7, "chapter": 5,
                 "chapter_title": "Acids",
                 "concepts": [
                     {"id": "y.5.1", "title": "Acids taste",
                      "formula": "-", "question_patterns": ["p"]}]})
    cat2["worked_examples"] = [
        {"q": "Which ion makes a solution acidic?", "a": "H+ ion"}]
    d = tmp_path / "cats"
    d.mkdir()
    import json
    json.dump(cat, open(d / "catalog_1.json", "w", encoding="utf-8"))
    json.dump(cat2, open(d / "catalog_2.json", "w", encoding="utf-8"))
    eng = TutorEngine(str(d))
    eng._last_catalog_dir = str(d)
    return eng


# ---------------------------------------------------------------- #
# grading
# ---------------------------------------------------------------- #

def _answer_correctly(engine, stu, served):
    """Look up the served question's expected answer in the pool."""
    c = engine.concepts[served["concept_id"]]
    for item in c.pool:
        if item["q"] == served["question"]:
            return engine.submit(stu, served["question_id"], item["a"])
    return engine.submit(stu, served["question_id"], "no idea")


def test_grade_numeric_tolerant_formats():
    assert grade_numeric("600 m", "600 m") is True
    assert grade_numeric("Rs 1,20,000", "120000 rupees") is True
    assert grade_numeric("about 273 kelvin", "273 K") is True
    assert grade_numeric("599 m", "600 m") is False
    assert grade_numeric("I do not know", "600 m") is None


def test_extract_number_indian_commas():
    assert _extract_number("Rs 1,20,000 total") == 120000.0
    assert _extract_number("none") is None


# ---------------------------------------------------------------- #
# serve / submit loop
# ---------------------------------------------------------------- #

def test_first_serve_is_curriculum_first_concept(engine):
    out = engine.serve("stu1")
    assert out["concept_id"] == "x.4.1"
    assert "273" not in str(out)          # expected answer withheld
    assert out["hints_available"] == 3


def test_correct_answer_raises_mastery_toward_one(engine):
    s = engine.serve("stu1")
    r1 = engine.submit("stu1", s["question_id"], "273 K")
    assert r1["outcome"] == "correct"
    r2 = engine.submit("stu1", s["question_id"], "273")
    assert r2["outcome"] == "correct"
    assert 0.30 < r1["mastery"] < r2["mastery"] < 1.0


def test_wrong_answer_drops_mastery_and_books_mistake(engine):
    s = engine.serve("stu1")
    r = engine.submit("stu1", s["question_id"], "100 K")
    assert r["outcome"] == "wrong"
    assert r["mastery"] < 0.30
    assert engine.progress("stu1")["open_mistakes"] == 1
    assert "worked_solution" in r


def test_ungraded_ambiguous_answer_keeps_mastery_flat(engine):
    s = engine.serve("stu1")
    r = engine.submit("stu1", s["question_id"], "hmm maybe")
    assert r["outcome"] == "ungraded"
    assert r["mastery"] == 0.30


# ---------------------------------------------------------------- #
# selection policy
# ---------------------------------------------------------------- #

def test_mistake_review_comes_after_gap(engine):
    # wrong on x.4.1, then simulate it mastered; the mistake book must
    # bring x.4.1 back after REVIEW_GAP serves of other concepts
    s1 = engine.serve("stu1")
    engine.submit("stu1", s1["question_id"], "999 K")     # wrong
    st = engine.students["stu1"]
    st["mastery"]["x.4.1"] = 0.95                          # simulate
    picks = []
    for _ in range(3):
        s = engine.serve("stu1")
        picks.append(s["concept_id"])
        _answer_correctly(engine, "stu1", s)
    assert picks[0] != "x.4.1"          # not due immediately
    assert "x.4.1" in picks[1:]         # but due within the window


def test_new_concept_after_mastery(engine):
    s = engine.serve("stu1")
    seen = set()
    for _ in range(12):
        seen.add(s["concept_id"])
        _answer_correctly(engine, "stu1", s)
        s = engine.serve("stu1")
    assert len(seen) >= 2               # curriculum advanced past x.4.1


def test_subject_filter_confines_serving(engine):
    for _ in range(10):
        s = engine.serve("stu1", subject="science")
        assert s["concept_id"].startswith("x.")


# ---------------------------------------------------------------- #
# hint ladder
# ---------------------------------------------------------------- #

def test_hint_ladder_levels(engine):
    s = engine.serve("stu1")
    qid = s["question_id"]
    h1 = engine.hint("stu1", qid, 1)
    h3 = engine.hint("stu1", qid, 3)
    assert "Temperature scales" in h1["hint"]
    assert "273" in h1["hint"]          # the formula K = C + 273
    assert "273 K" in h3["hint"]        # full worked solution
    assert h3["level"] == 3


# ---------------------------------------------------------------- #
# persistence + progress
# ---------------------------------------------------------------- #

def test_save_load_roundtrip(engine, tmp_path):
    s = engine.serve("stu1")
    engine.submit("stu1", s["question_id"], "273 K")
    p = str(tmp_path / "stu.json")
    engine.save(p)
    e2 = TutorEngine(engine._last_catalog_dir)
    e2.load(p)
    assert e2.progress("stu1")["total_attempts"] == 1
    assert e2.progress("stu1")["open_mistakes"] == 0


def test_progress_shape(engine):
    s = engine.serve("stu1")
    engine.submit("stu1", s["question_id"], "273 K")
    p = engine.progress("stu1")
    assert "science" in p["per_subject"]
    assert p["per_subject"]["science"]["concepts"] >= 1
    assert p["total_attempts"] == 1
