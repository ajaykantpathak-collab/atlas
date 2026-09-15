"""Generated question bank merge tests.

The bank agents write backend/its/questions/generated/<catalog_stem>.json
incrementally; TutorEngine must merge them into the concept pools after
the verified worked examples, skip malformed files silently, keep the
serve rotation working, and route self_check items to the honest
self-check grading path.  Everything here runs against a synthetic
tmp_path corpus in the live directory layout (cats + questions/generated).
"""
import json
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.tutor import POOL_CAP, TutorEngine

WORKED_Q = "Worked: convert 0 C to kelvin."
GEN1 = {"q": "Generated: convert 25 C to kelvin.", "a": "298 K",
        "self_check": False}
GEN2 = {"q": "Generated: convert 100 C to kelvin.", "a": "373 K",
        "self_check": False}


def _bank(concepts, catalog="catalog_x"):
    return {"catalog": catalog, "concepts": concepts}


def _concept(cid, questions, title="T"):
    return {"id": cid, "title": title, "questions": questions}


def _make_engine(tmp_path, banks, concepts=None, worked=1):
    """Build cats/ + questions/generated/ in the live layout and return
    the engine.  `banks` maps file name -> raw text (or object to dump).
    """
    cats = tmp_path / "cats"
    gens = tmp_path / "questions" / "generated"
    cats.mkdir()
    gens.mkdir(parents=True)
    if concepts is None:
        concepts = [
            {"id": "g.1.1", "title": "Temperature scales",
             "formula": "K = C + 273"},
            {"id": "g.1.2", "title": "Conduction", "formula": "-"},
        ]
    cat = {"class": 7, "subject": "science", "chapter": 4,
           "worked_examples": [{"q": f"Worked #{i + 1}: {WORKED_Q}",
                                "a": "273 K"} for i in range(worked)],
           "concepts": concepts}
    json.dump(cat, open(cats / "catalog_x.json", "w", encoding="utf-8"))
    for name, content in banks.items():
        text = (content if isinstance(content, str)
                else json.dumps(content))
        open(gens / name, "w", encoding="utf-8").write(text)
    return TutorEngine(str(cats))


GOOD_BANK = _bank([
    _concept("g.1.1", [GEN1, GEN2]),
    _concept("g.1.2", [{"q": "Generated: why do metals conduct?",
                        "a": "free electrons", "self_check": True}]),
])
BROKEN_BANK = '{"catalog": "catalog_x", "concepts": ['   # truncated json
BAD_SHAPE_BANK = {"catalog": "catalog_x", "concepts": "not-a-list"}


# ---------------------------------------------------------------- #
# 1. merge works
# ---------------------------------------------------------------- #

def test_merge_appends_generated_after_worked_examples(tmp_path):
    eng = _make_engine(tmp_path, {"20_good.json": GOOD_BANK})
    c1 = eng.concepts["g.1.1"]
    assert [i["q"] for i in c1.pool] == \
        [f"Worked #1: {WORKED_Q}", GEN1["q"], GEN2["q"]]
    assert c1.pool[0]["self_check"] is False       # worked example first
    c2 = eng.concepts["g.1.2"]
    assert len(c2.pool) == 2                       # 1 worked + 1 generated
    assert c2.pool[1]["self_check"] is True
    # missing self_check key defaults to machine-graded
    assert eng.concepts["g.1.1"].pool[1]["self_check"] is False
    assert eng.generated_questions == 3
    assert eng.generated_files_skipped == 0


def test_missing_generated_dir_is_quietly_zero(tmp_path):
    cats = tmp_path / "cats"
    cats.mkdir()
    json.dump({"class": 7, "subject": "science", "chapter": 4,
               "worked_examples": [{"q": WORKED_Q, "a": "273 K"}],
               "concepts": [{"id": "g.1.1", "title": "T"}]},
              open(cats / "catalog_x.json", "w", encoding="utf-8"))
    eng = TutorEngine(str(cats))    # no questions/generated anywhere
    assert eng.generated_questions == 0
    assert len(eng.concepts["g.1.1"].pool) == 1


# ---------------------------------------------------------------- #
# 2. malformed files skipped silently, with a counter
# ---------------------------------------------------------------- #

def test_malformed_files_skipped_with_counter(tmp_path):
    eng = _make_engine(tmp_path, {
        "00_broken.json": BROKEN_BANK,       # invalid JSON
        "10_badshape.json": BAD_SHAPE_BANK,  # wrong shape
        "20_good.json": GOOD_BANK,           # only this one merges
    })
    assert eng.generated_questions == 3
    assert eng.generated_files_skipped == 2
    # the good file still merged
    assert len(eng.concepts["g.1.1"].pool) == 3


def test_bad_questions_inside_good_file_skipped(tmp_path):
    bank = _bank([
        {"id": "g.1.1", "questions": [
            "not-a-dict", {"a": "42"}, {"q": ""}, GEN1,
            {"id": "g.9.9", "questions": [GEN2]},   # unknown concept
        ]},
    ])
    eng = _make_engine(tmp_path, {"20_good.json": bank})
    assert eng.generated_questions == 1
    assert eng.concepts["g.1.1"].pool[-1]["q"] == GEN1["q"]


# ---------------------------------------------------------------- #
# 3. generated questions served in rotation
# ---------------------------------------------------------------- #

def test_generated_served_in_rotation(tmp_path):
    eng = _make_engine(
        tmp_path, {"20_good.json": _bank([_concept("g.1.1", [GEN1, GEN2])])},
        concepts=[{"id": "g.1.1", "title": "Temperature scales",
                   "formula": "K = C + 273"}])
    served = [eng.serve("stu")["question"] for _ in range(4)]
    # worked example first, then the generated items, then wrap around
    assert served == [f"Worked #1: {WORKED_Q}", GEN1["q"], GEN2["q"],
                      f"Worked #1: {WORKED_Q}"]
    # expected answers are never leaked by serve
    assert all("298" not in q and "373" not in q for q in served)


def test_pool_capped_at_twelve(tmp_path):
    many = [{"q": f"Generated Q{i}", "a": str(i + 1), "self_check": False}
            for i in range(15)]
    eng = _make_engine(
        tmp_path, {"20_good.json": _bank([_concept("g.1.1", many)])},
        concepts=[{"id": "g.1.1", "title": "T"}], worked=2)
    assert len(eng.concepts["g.1.1"].pool) == POOL_CAP == 12
    # 2 worked kept + 10 generated merged, generated stay after worked
    assert eng.generated_questions == 10
    assert eng.concepts["g.1.1"].pool[0]["q"].startswith("Worked")
    assert eng.concepts["g.1.1"].pool[-1]["q"] == "Generated Q9"


# ---------------------------------------------------------------- #
# 4. self_check grading path
# ---------------------------------------------------------------- #

def test_self_check_generated_item_returns_self_check_outcome(tmp_path):
    sc = {"q": "Generated: explain why 0 C is 273 K.", "a": "273 K",
          "self_check": True}
    eng = _make_engine(
        tmp_path, {"20_good.json": _bank([_concept("g.1.1", [sc])])},
        concepts=[{"id": "g.1.1", "title": "Temperature scales",
                   "formula": "K = C + 273"}])
    s1 = eng.serve("stu")                       # worked example
    r1 = eng.submit("stu", s1["question_id"], "273 K")
    assert r1["outcome"] == "correct"           # machine-graded item
    s2 = eng.serve("stu")
    assert s2["question"] == sc["q"]            # generated self_check item
    r2 = eng.submit("stu", s2["question_id"], "I tried it myself")
    assert r2["outcome"] == "self_check"
    assert r2["worked_solution"] == "273 K"
    assert r2["attempts"] == 2
    assert r2["mastery"] == r1["mastery"]       # flat: never machine-graded
