"""Verbal-science MCQ synthesis: deterministic 3-option questions for
number-free science worked answers, so mastery DISCRIMINATES instead of
paying flat participation credit.

Covers:
  1. build_mcq determinism (seeded by question hash, never random)
  2. option quality guards (correct = authored answer, distinct wrongs)
  3. the honest fallback: too-thin answers stay self_check
  4. serve payload carries the options, never the correct index
  5. submit grades by option index/text through the normal
     correct/wrong path (BKT mastery moves up AND down)
  6. backward compatibility: numeric items and template self_check
     items behave exactly as before
"""
import json
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.tutor import (
    MASTERY_START,
    TutorEngine,
    build_mcq,
    grade_mcq,
)

# ---------------------------------------------------------------- #
# fixtures
# ---------------------------------------------------------------- #

# a chapter whose concepts carry authored definitions/key ideas and
# verbal worked answers -- the Curiosity-catalog shape
CAT_SCIENCE = {
    "class": 6, "subject": "science", "chapter": 1,
    "chapter_title": "Wonderful World of Science",
    "concepts": [
        {"id": "c6cu.1.1", "title": "What is Science?",
         "definition": "Science is a way of understanding the world "
                       "through careful observation and asking questions.",
         "key_idea": "Science begins with curiosity and careful "
                     "observation of the world around us.",
         "worked_examples": [
             {"question": "What is science in one sentence?",
              "solution": "Science is a way of understanding the world "
                          "through observation, questioning, and "
                          "exploration.",
              "answer": "Science is a way of understanding the world "
                        "through observation, questioning, and "
                        "exploration."},
             {"question": "Why do scientists ask questions?",
              "solution": "Scientists ask questions because curiosity "
                          "drives them to find out how things work.",
              "answer": "Scientists ask questions because curiosity "
                        "drives them to find out how things work."},
         ]},
        {"id": "c6cu.1.2", "title": "Scientific Method",
         "definition": "The scientific method is a step-by-step process "
                       "scientists use to answer questions.",
         "key_idea": "Observation, hypothesis, experiment, conclusion.",
         "worked_examples": [
             {"question": "What comes after the hypothesis in the "
                          "scientific method?",
              "solution": "The experiment tests the hypothesis.",
              "answer": "The experiment tests the hypothesis."},
         ]},
    ],
}

# numeric sibling catalog: must stay exactly as before (no mcq)
CAT_NUMERIC = {
    "class": 6, "subject": "science", "chapter": 2,
    "chapter_title": "Numbers",
    "concepts": [{"id": "c6cu.2.1", "title": "Arithmetic", "formula": "-"}],
    "worked_examples": [
        {"q": "Add 3 and 4.", "a": "7"},
        {"question_pattern": "Add {x} and {y} yourself.",
         "extracted_variables": {"x": 3, "y": 4},
         "solution_template": [{"explain": "Add 3 and 4 to get 11"}]},
    ],
}


def _make_engine(tmp_path, catalogs=(CAT_SCIENCE, CAT_NUMERIC)):
    d = tmp_path / "cats"
    d.mkdir(parents=True)
    for i, cat in enumerate(catalogs):
        json.dump(cat, open(d / f"catalog_{i}.json", "w",
                            encoding="utf-8"))
    return TutorEngine(str(d))


@pytest.fixture()
def engine(tmp_path):
    return _make_engine(tmp_path)


# ---------------------------------------------------------------- #
# 1. determinism
# ---------------------------------------------------------------- #

def test_build_mcq_is_deterministic():
    sibs = CAT_SCIENCE["concepts"]
    a = build_mcq("c6cu.1.1", "What is science in one sentence?",
                  "Science is a way of understanding the world through "
                  "observation, questioning, and exploration.", sibs)
    b = build_mcq("c6cu.1.1", "What is science in one sentence?",
                  "Science is a way of understanding the world through "
                  "observation, questioning, and exploration.", sibs)
    assert a is not None and b is not None
    assert a == b                      # same options, same correct_index
    # a different question hashes to a different (valid) layout
    c = build_mcq("c6cu.1.1", "Why do scientists ask questions?",
                  "Scientists ask questions because curiosity drives "
                  "them to find out how things work.", sibs)
    assert c is not None
    assert len(c["options"]) == 3
    assert 0 <= c["correct_index"] <= 2


def test_engine_pool_mcq_is_stable_across_instances(tmp_path):
    e1 = _make_engine(tmp_path / "a")
    e2 = _make_engine(tmp_path / "b")
    for cid, c in e1.concepts.items():
        for it1, it2 in zip(c.pool, e2.concepts[cid].pool):
            assert it1.get("mcq") == it2.get("mcq")


# ---------------------------------------------------------------- #
# 2. option quality
# ---------------------------------------------------------------- #

def test_mcq_shape_and_correct_option_is_authored_answer():
    sibs = CAT_SCIENCE["concepts"]
    answer = ("Science is a way of understanding the world through "
              "observation, questioning, and exploration.")
    m = build_mcq("c6cu.1.1", "What is science in one sentence?",
                  answer, sibs)
    assert m is not None
    opts, idx = m["options"], m["correct_index"]
    assert len(opts) == 3 and len(set(opts)) == 3
    assert opts[idx].rstrip(".").lower() == answer.rstrip(".").lower()
    # the two distractors are wrong: neither matches the answer
    distractors = [o for i, o in enumerate(opts) if i != idx]
    for d in distractors:
        assert d.rstrip(".").lower() != answer.rstrip(".").lower()
        assert len(d.strip()) >= 15


def test_distractors_come_from_sibling_concepts():
    # with a sibling catalog present, the sibling material must be
    # preferred over the negation fallbacks (no "It is not true that")
    sibs = CAT_SCIENCE["concepts"]
    answer = ("Science is a way of understanding the world through "
              "observation, questioning, and exploration.")
    m = build_mcq("c6cu.1.1", "What is science in one sentence?",
                  answer, sibs)
    assert m is not None
    joined = " ".join(m["options"]).lower()
    assert "it is not true that" not in joined
    assert "the opposite is the case" not in joined


def test_negation_fallback_for_thin_catalogs():
    # no siblings at all: guaranteed-wrong negations fill the options
    m = build_mcq("solo.1", "Why do metals conduct?",
                  "Free electrons carry the energy.", [])
    assert m is not None
    opts, idx = m["options"], m["correct_index"]
    assert len(set(opts)) == 3
    assert opts[idx].lower().startswith("free electrons")
    distractors = [o for i, o in enumerate(opts) if i != idx]
    assert all(("not true" in d.lower() or "not " in d.lower()
                or "opposite" in d.lower()) for d in distractors)


def test_too_thin_answer_stays_none_honest_self_check():
    # one-word answers cannot make a fair 3-option question
    assert build_mcq("c6cu.12.3", "Which is the largest planet?",
                     "Jupiter.", []) is None
    assert build_mcq("c6cu.1.6",
                     "Which branch of science studies living things?",
                     "Biology.", []) is None
    # numeric answers never enter the MCQ path (graded numerically)
    assert build_mcq("c6cu.2.1", "Add 3 and 4.", "7",
                     CAT_SCIENCE["concepts"]) is None


# ---------------------------------------------------------------- #
# 3. grade_mcq: index and text forms
# ---------------------------------------------------------------- #

MCQ = {"options": ["A wrong one.", "The right answer.", "Another wrong."],
       "correct_index": 1}


def test_grade_mcq_accepts_text_authoring_and_index_forms():
    assert grade_mcq("The right answer.", MCQ) is True
    assert grade_mcq("  the right answer ", MCQ) is True     # tolerant text
    assert grade_mcq("The right answer", MCQ) is True
    for tok in ("2", "option 2", "(2)", "2.", "b", "B", "option b"):
        assert grade_mcq(tok, MCQ) is True, tok
    assert grade_mcq("The right answer.",
                     MCQ, authored="The right answer.") is True


def test_grade_mcq_rejects_wrong_options_and_junk():
    assert grade_mcq("A wrong one.", MCQ) is False
    assert grade_mcq("Another wrong.", MCQ) is False
    assert grade_mcq("some free text", MCQ) is False
    assert grade_mcq("", MCQ) is False
    assert grade_mcq("4", MCQ) is False           # out of range
    assert grade_mcq("d", MCQ) is False
    assert grade_mcq("The right answer.",
                     {"options": MCQ["options"],
                      "correct_index": 9}) is False   # corrupt index


# ---------------------------------------------------------------- #
# 4. engine wiring: pool flags, serve payload
# ---------------------------------------------------------------- #

def test_verbal_items_become_graded_mcq_in_pool(engine):
    c = engine.concepts["c6cu.1.1"]
    mcq_items = [it for it in c.pool if it.get("mcq")]
    assert mcq_items, "verbal science worked answers must become MCQ"
    for it in mcq_items:
        assert it["self_check"] is False     # machine-gradable now
        assert len(it["mcq"]["options"]) == 3
        assert 0 <= it["mcq"]["correct_index"] <= 2


def test_numeric_and_template_items_are_untouched(engine):
    c = engine.concepts["c6cu.2.1"]
    assert all(not it.get("mcq") for it in c.pool)
    graded = [it for it in c.pool if it["q"] == "Add 3 and 4."]
    assert graded and graded[0]["self_check"] is False
    template = [it for it in c.pool if "yourself" in it["q"]]
    assert template and template[0]["self_check"] is True


def test_serve_payload_carries_options_never_the_index(engine):
    s = engine.serve("stu")                  # first concept, graded-first
    assert s["concept_id"] == "c6cu.1.1"
    assert s.get("answer_mode") == "mcq"
    opts = s.get("options")
    assert isinstance(opts, list) and len(opts) == 3
    assert "correct_index" not in s          # never leaks the answer
    c = engine.concepts["c6cu.1.1"]
    item = c.pool[int(s["question_id"].split("::")[1]) - 1]
    assert opts == item["mcq"]["options"]    # served order == pool order


def test_two_fresh_students_get_identical_option_order(engine):
    s1 = engine.serve("studentA")
    s2 = engine.serve("studentB")
    assert s1["question_id"] == s2["question_id"]
    assert s1["options"] == s2["options"]    # deterministic serve


# ---------------------------------------------------------------- #
# 5. the mastery discrimination gate
# ---------------------------------------------------------------- #

def _served_mcq(engine, stu):
    s = engine.serve(stu)
    assert s.get("answer_mode") == "mcq", s
    return s


def test_correct_option_moves_mastery_above_start(engine):
    s = _served_mcq(engine, "up")
    item = engine.concepts[s["concept_id"]].pool[
        int(s["question_id"].split("::")[1]) - 1]
    correct_text = item["mcq"]["options"][item["mcq"]["correct_index"]]
    r = engine.submit("up", s["question_id"], correct_text)
    assert r["outcome"] == "correct"
    assert r["mastery"] > MASTERY_START
    assert r["worked_solution"] == item["a"]


def test_wrong_option_moves_mastery_below_start_and_books_mistake(engine):
    s = _served_mcq(engine, "down")
    item = engine.concepts[s["concept_id"]].pool[
        int(s["question_id"].split("::")[1]) - 1]
    idx = item["mcq"]["correct_index"]
    wrong_text = item["mcq"]["options"][(idx + 1) % 3]
    r = engine.submit("down", s["question_id"], wrong_text)
    assert r["outcome"] == "wrong"
    assert r["mastery"] < MASTERY_START
    assert engine.progress("down")["open_mistakes"] == 1


def test_submit_by_index_grades_the_picked_option(engine):
    s = _served_mcq(engine, "byindex")
    item = engine.concepts[s["concept_id"]].pool[
        int(s["question_id"].split("::")[1]) - 1]
    ci = item["mcq"]["correct_index"]
    r = engine.submit("byindex", s["question_id"], str(ci + 1))
    assert r["outcome"] == "correct"
    # letter form of the correct index must also count
    s2 = engine.serve("byindex2")
    item2 = engine.concepts[s2["concept_id"]].pool[
        int(s2["question_id"].split("::")[1]) - 1]
    r2 = engine.submit("byindex2", s2["question_id"],
                       "option " + "abc"[item2["mcq"]["correct_index"]])
    assert r2["outcome"] == "correct"


def test_mcq_submission_never_enters_self_check_branch(engine):
    s = _served_mcq(engine, "pathcheck")
    item = engine.concepts[s["concept_id"]].pool[
        int(s["question_id"].split("::")[1]) - 1]
    idx = item["mcq"]["correct_index"]
    wrong = item["mcq"]["options"][(idx + 2) % 3]
    r = engine.submit("pathcheck", s["question_id"], wrong)
    assert r["outcome"] == "wrong"           # not "self_check"
    assert r["mastery"] != MASTERY_START     # the update really applied
    assert "expected" in r and "worked_solution" in r


def test_mcq_correct_and_wrong_move_mastery_in_opposite_directions(
        engine, tmp_path):
    # two fresh engines over identical catalogs: the MCQ itself is
    # byte-identical, then a correct pick vs a wrong pick must move
    # mastery in opposite directions from the same start
    e1 = _make_engine(tmp_path / "t1")
    e2 = _make_engine(tmp_path / "t2")
    s1 = e1.serve("twin1")
    s2 = e2.serve("twin2")
    item1 = e1.concepts[s1["concept_id"]].pool[
        int(s1["question_id"].split("::")[1]) - 1]
    item2 = e2.concepts[s2["concept_id"]].pool[
        int(s2["question_id"].split("::")[1]) - 1]
    assert item1["mcq"] == item2["mcq"]      # same deterministic MCQ
    mc = item1["mcq"]
    r_good = e1.submit("twin1", s1["question_id"],
                       mc["options"][mc["correct_index"]])
    r_bad = e2.submit("twin2", s2["question_id"],
                      mc["options"][(mc["correct_index"] + 1) % 3])
    assert r_good["outcome"] == "correct" and r_bad["outcome"] == "wrong"
    assert r_good["mastery"] > MASTERY_START > r_bad["mastery"]
