"""test_tutor_struggling.py -- the struggling-student features.

Covers the three deterministic overlays on the tutor loop
(backend/its/solver/tutor.py, /api/tutor-graph):

  1. PREREQUISITE RETREAT: two straight wrongs on a concept arm a
     retreat -- the next serve is the concept's prerequisite (explicit
     override > SQLite knowledge-graph edge > same-subject earlier-
     chapter concept), carrying "retreated_from" and the
     "pehle wahi concept - 2 minute" voice line.
  2. DIFFICULTY LADDERS: pool items are tagged easy/grade/hard by step
     count and number size; after a wrong the easier tier is served,
     after two corrects grade level returns ("tier" on payloads).
  3. MICRO-WIN MODE: at mastery < 0.35 self_check serve items become
     tiny graded one-step checks built from the item's own worked
     answer's final number; correct = small mastery bump, a miss is
     never punitive.

Also: honest refusals ("I don't know", ungraded ambiguity) never
trigger the retreat -- they route to the worked solution exactly as
before.  All deterministic; a temp corpus keeps tests independent of
the live catalog state.
"""
import json
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.tutor import (
    RETREAT_VOICE,
    TutorEngine,
    classify_tier,
    count_steps,
    load_graph_prerequisites,
    micro_check,
)
from backend.services.tutor_voice import (
    TutorVoice,
    render_serve_voice,
    render_submit_voice,
)

# ---------------------------------------------------------------- #
# fixture corpus (live layout: cats/ + questions/generated/)
# ---------------------------------------------------------------- #
# chapter 1: the prerequisite concept.  Its pool carries one graded
# worked item and one self_check template item whose worked answer has
# a final number (11) -- the micro-win convertible.
CAT_NUM = {
    "class": 7, "subject": "science", "chapter": 1,
    "chapter_title": "Numbers",
    "worked_examples": [
        {"q": "Add 3 and 4.", "a": "7"},
        {"question_pattern": "Add {x} and {y} yourself.",
         "extracted_variables": {"x": 3, "y": 4},
         "solution_template": [{"explain": "Add 3 and 4 to get 11"}]},
    ],
    "concepts": [
        {"id": "x.1.1", "title": "Number basics", "formula": "-"},
    ],
}

# chapter 4: two concepts sharing a pool with one item per tier
# (grade / easy / hard) for the difficulty-ladder journey.
CAT_HEAT = {
    "class": 7, "subject": "science", "chapter": 4,
    "chapter_title": "Heat",
    "worked_examples": [
        {"q": "Convert 0 C to kelvin.", "a": "273 K"},          # grade
        {"q": "Add 3 and 4.", "a": "7"},                        # easy
        {"q": "A shop sells 25000 units in a week. At 12 rupees "
              "each, what is the weekly revenue in rupees?",
         "a": "300000 rupees"},                                 # hard
    ],
    "concepts": [
        {"id": "x.4.1", "title": "Temperature scales", "formula": "-"},
        {"id": "x.4.2", "title": "Conduction", "formula": "-"},
    ],
}


def _make_engine(tmp_path, catalogs=(CAT_NUM, CAT_HEAT),
                 enhanced=None):
    d = tmp_path / "cats"
    d.mkdir(parents=True)
    for i, cat in enumerate(catalogs):
        json.dump(cat, open(d / f"catalog_{i}.json", "w",
                            encoding="utf-8"))
    if enhanced:
        g = tmp_path / "questions" / "generated"
        g.mkdir(parents=True)
        for i, bank in enumerate(enhanced):
            json.dump(bank, open(g / f"enhanced_{i:03d}.json", "w",
                                 encoding="utf-8"))
    return TutorEngine(str(d))


def _skip(eng, stu, cid, mastery=0.9):
    """Simulate a concept already attempted (and comfortably strong),
    so the curriculum picker moves past it."""
    st = eng._student(stu)
    st["attempts"][cid] = 1
    st["mastery"][cid] = mastery


def _fail(eng, stu, served, answer="999"):
    return eng.submit(stu, served["question_id"], answer)


# ---------------------------------------------------------------- #
# tier heuristic + micro conversion (units)
# ---------------------------------------------------------------- #

def test_count_steps_and_classify_tier():
    assert count_steps("Add them.") == 1
    assert count_steps("First convert. Then multiply. Then add.") == 3
    assert count_steps("a\nb\nc") == 3
    # 1-step + small numbers = easy
    assert classify_tier("Add 3 and 4.", "7") == "easy"
    # bigger numbers or more steps read as grade level
    assert classify_tier("Convert 0 C to kelvin.", "273 K") == "grade"
    assert classify_tier("Twice a number minus 1.", "First x. Then "
                         "double it. Then subtract one.") == "hard"
    # any big number is hard regardless of steps
    assert classify_tier("Revenue for 25000 units?", "300000 rupees") \
        == "hard"
    # a number-free one-step recall item is easy, not grade
    assert classify_tier("Why do metals conduct?",
                         "Free electrons carry the energy.") == "easy"


def test_micro_check_uses_final_number_and_masks_it():
    out = micro_check("Add 3 and 4 to get 11")
    assert out is not None
    question, expected = out
    assert expected == "11"
    assert "what does this step equal" in question.lower()
    assert "11" not in question                  # never leaks the answer
    assert "____" in question                    # numbers masked
    # multi-step answer: the step shown is the one with the final number
    q2, e2 = micro_check("First convert. Then the total is 45 units")
    assert e2 == "45"
    assert "total" in q2 and "45" not in q2
    # no number in the worked answer -> conversion impossible
    assert micro_check("Free electrons carry the energy.") is None


# ---------------------------------------------------------------- #
# 1. prerequisite retreat
# ---------------------------------------------------------------- #

def test_retreat_triggers_after_two_wrongs(tmp_path):
    eng = _make_engine(tmp_path)
    eng.prereq_overrides["x.4.1"] = "x.1.1"
    _skip(eng, "stu", "x.1.1")
    s1 = eng.serve("stu")
    assert s1["concept_id"] == "x.4.1"
    r1 = _fail(eng, "stu", s1)
    assert r1["outcome"] == "wrong"
    assert "retreat_to" not in r1                # one wrong: not yet
    s2 = eng.serve("stu")
    assert s2["concept_id"] == "x.4.1"
    r2 = _fail(eng, "stu", s2)
    assert r2["outcome"] == "wrong"
    assert r2["retreat_to"] == "x.1.1"           # armed by this wrong
    s3 = eng.serve("stu")
    # the retreat serve: prerequisite concept, named origin, voice line
    assert s3["concept_id"] == "x.1.1"
    assert s3["retreated_from"] == "x.4.1"
    assert s3["retreat_voice"] == RETREAT_VOICE
    assert RETREAT_VOICE == "pehle wahi concept - 2 minute"
    assert "tier" in s3
    # the retreat is consumed: the following serve is normal again
    s4 = eng.serve("stu")
    assert "retreated_from" not in s4


def test_retreat_falls_back_to_earlier_chapter_concept(tmp_path):
    eng = _make_engine(tmp_path)                 # no overrides
    _skip(eng, "stu", "x.1.1")
    _skip(eng, "stu", "x.4.1")
    for _ in range(2):                           # fail x.4.2 twice
        s = eng.serve("stu")
        assert s["concept_id"] == "x.4.2"
        _fail(eng, "stu", s)
    s = eng.serve("stu")
    assert s["concept_id"] == "x.4.1"            # same-subject, earlier
    assert s["retreated_from"] == "x.4.2"
    assert s["retreat_voice"] == RETREAT_VOICE


def test_no_retreat_when_no_prerequisite_exists(tmp_path):
    # heat-only engine: x.4.1 is the earliest concept, nothing to
    # retreat to
    eng = _make_engine(tmp_path / "earliest", catalogs=[CAT_HEAT])
    s1 = eng.serve("stu")
    assert s1["concept_id"] == "x.4.1"
    _fail(eng, "stu", s1)
    s2 = eng.serve("stu")
    _fail(eng, "stu", s2)
    st = eng.students["stu"]
    assert st["retreat_to"] is None
    s3 = eng.serve("stu")
    assert "retreated_from" not in s3            # keeps serving normally


def test_honest_refusals_never_trigger_retreat(tmp_path):
    """'I don't know' and ungradable ambiguity route to the worked
    solution exactly as before -- they are not wrongs and never arm a
    retreat."""
    eng = _make_engine(tmp_path)
    _skip(eng, "stu", "x.1.1")
    s1 = eng.serve("stu")
    r = eng.submit("stu", s1["question_id"], "pata nahi, give up")
    assert r["outcome"] == "lets_learn"
    assert r["mastery"] == 0.30                  # flat, non-punitive
    s2 = eng.serve("stu")
    r2 = eng.submit("stu", s2["question_id"], "hmm maybe")
    assert r2["outcome"] == "ungraded"
    assert r2["mastery"] == 0.30
    st = eng.students["stu"]
    assert st["wrong_streak"].get("x.4.1", 0) == 0
    assert st["retreat_to"] is None
    s3 = eng.serve("stu")
    assert s3["concept_id"] == "x.4.1"
    assert "retreated_from" not in s3


def test_correct_on_retreated_from_disarms_retreat(tmp_path):
    eng = _make_engine(tmp_path)
    eng.prereq_overrides["x.4.1"] = "x.1.1"
    _skip(eng, "stu", "x.1.1")
    s1 = eng.serve("stu")
    _fail(eng, "stu", s1)
    s2 = eng.serve("stu")
    _fail(eng, "stu", s2)
    assert eng.students["stu"]["retreat_to"] == "x.1.1"
    # the student retries and gets it right before the retreat serves
    r = eng.submit("stu", s2["question_id"], "7")
    assert r["outcome"] == "correct"
    assert eng.students["stu"]["retreat_to"] is None
    s3 = eng.serve("stu")
    assert "retreated_from" not in s3


def test_graph_edge_prerequisite_for_enhanced_nodes(tmp_path):
    """enh:<node_id> concepts resolve prerequisites through the SQLite
    knowledge-graph REQUIRES edges (keyed by the bare node id, as the
    real enhanced_* banks carry ids like enh:c10_bio_cbse_01_001); the
    matched prerequisite must exist as an engine concept."""
    eng = _make_engine(
        tmp_path,
        enhanced=[
            {"concepts": [{"id": "enh:c7_sci_004_001",
                           "title": "Particle model",
                           "questions": [{"q": "How many states of "
                                          "matter in the model?",
                                          "a": "3"}]}]},
            {"concepts": [{"id": "enh:c7_sci_004_002",
                           "title": "Conduction advanced",
                           "questions": [{"q": "Energy passed along "
                                          "equals?", "a": "42"}]}]},
        ])
    assert "enh:c7_sci_004_001" in eng.concepts
    assert "enh:c7_sci_004_002" in eng.concepts
    eng._graph_prereqs = {"c7_sci_004_002": "c7_sci_004_001"}
    assert eng._prerequisite_for("enh:c7_sci_004_002") \
        == "enh:c7_sci_004_001"
    # explicit overrides outrank the graph
    eng.prereq_overrides["enh:c7_sci_004_002"] = "x.1.1"
    assert eng._prerequisite_for("enh:c7_sci_004_002") == "x.1.1"


def test_load_graph_prerequisites_smoke():
    """The SQLite knowledge_nodes reader: best-effort dict of
    node_id -> first prerequisite (empty when no db on this machine)."""
    m = load_graph_prerequisites()
    assert isinstance(m, dict)
    for k, v in list(m.items())[:10]:
        assert isinstance(k, str) and k
        assert isinstance(v, str) and v


# ---------------------------------------------------------------- #
# 2. difficulty ladders
# ---------------------------------------------------------------- #

def test_tier_on_payload_and_easier_after_wrong(tmp_path):
    eng = _make_engine(tmp_path)
    _skip(eng, "stu", "x.1.1")
    s1 = eng.serve("stu")
    assert s1["concept_id"] == "x.4.1"
    assert s1["tier"] == "grade"                 # pool[0]: 273 K
    assert "micro_win" in s1
    r1 = _fail(eng, "stu", s1)
    assert r1["outcome"] == "wrong"
    s2 = eng.serve("stu")
    # same concept, but the easier tier is served
    assert s2["concept_id"] == "x.4.1"
    assert s2["tier"] == "easy"
    assert s2["question"] == "Add 3 and 4."
    r2 = eng.submit("stu", s2["question_id"], "7")
    assert r2["outcome"] == "correct"            # ladder is winnable
    s3 = eng.serve("stu")
    assert s3["tier"] == "easy"                  # one correct: stay easy
    eng.submit("stu", s3["question_id"], "7")
    s4 = eng.serve("stu")
    # two straight corrects climb back to grade level
    assert s4["tier"] == "grade"


def test_hard_items_tagged_and_pool_keeps_tiers(tmp_path):
    eng = _make_engine(tmp_path)
    pool = eng.concepts["x.4.1"].pool
    assert [i["tier"] for i in pool] == ["grade", "easy", "hard"]
    num_pool = eng.concepts["x.1.1"].pool
    assert [i["tier"] for i in num_pool] == ["easy", "easy"]


# ---------------------------------------------------------------- #
# 3. micro-win mode
# ---------------------------------------------------------------- #

def test_micro_win_converts_self_check_and_bumps_mastery(tmp_path):
    eng = _make_engine(tmp_path)
    s1 = eng.serve("stu")                        # x.1.1, worked item
    assert s1["micro_win"] is False
    r1 = eng.submit("stu", s1["question_id"], "999")
    assert r1["outcome"] == "wrong"
    # unified BKT: posterior ~0.0508 + AFM transit ~0.0815 (was EMA 0.195)
    assert r1["mastery"] == pytest.approx(0.128, abs=1e-3)
    s2 = eng.serve("stu")                        # the self_check item
    assert s2["concept_id"] == "x.1.1"
    assert s2["micro_win"] is True
    assert "what does this step equal" in s2["question"].lower()
    assert "11" not in s2["question"]            # answer still withheld
    r2 = eng.submit("stu", s2["question_id"], "11")
    assert r2["outcome"] == "micro_win"
    assert r2["micro_win"] is True
    assert 0.128 < r2["mastery"] < 0.30          # small bump, still low
    assert r2["mastery"] == pytest.approx(0.215, abs=1e-3)
    assert r2["worked_solution"] == "Add 3 and 4 to get 11"


def test_micro_win_miss_is_never_punitive(tmp_path):
    eng = _make_engine(tmp_path)
    s1 = eng.serve("stu")
    eng.submit("stu", s1["question_id"], "999")  # mastery 0.128 (BKT)
    s2 = eng.serve("stu")
    assert s2["micro_win"] is True
    r2 = eng.submit("stu", s2["question_id"], "888")
    assert r2["outcome"] == "micro_win_miss"
    assert r2["mastery"] == pytest.approx(0.128, abs=1e-3)  # flat: no drop
    assert r2["worked_solution"]                # steps shown, kindly
    # exactly one open mistake: the first graded wrong booked it, the
    # micro miss books nothing extra
    assert eng.progress("stu")["open_mistakes"] == 1


def test_micro_win_off_above_threshold_and_without_numbers(tmp_path):
    eng = _make_engine(tmp_path)
    # above the micro threshold the self_check path is unchanged
    s1 = eng.serve("stu")
    eng.submit("stu", s1["question_id"], "7")    # mastery 0.699 (BKT)
    _skip(eng, "stu", "x.4.1")   # keep the picker on x.1.1: BKT's
    _skip(eng, "stu", "x.4.2")   # stronger correct-gain lifts it out of
                                 # the weak band after a single correct
    s2 = eng.serve("stu")
    assert s2["micro_win"] is False
    assert s2["question"] == "Add 3 and 4 yourself."
    r2 = eng.submit("stu", s2["question_id"], "I tried it myself")
    assert r2["outcome"] == "self_check"
    # a self_check item whose worked answer has no number is served
    # as-is even at low mastery (conversion impossible)
    eng2 = _make_engine(tmp_path / "cond", catalogs=[{
        "class": 7, "subject": "science", "chapter": 2,
        "chapter_title": "Conduction",
        "worked_examples": [
            {"q": "Roughly how many free electrons per metal atom?",
             "a": "1"},
            {"question_pattern": "Explain conduction yourself.",
             "extracted_variables": {},
             "solution_template": [
                 {"explain": "Free electrons carry the energy."}]},
        ],
        "concepts": [{"id": "x.2.1", "title": "Conduction",
                      "formula": "-"}],
    }])
    s1 = eng2.serve("stu2")
    eng2.submit("stu2", s1["question_id"], "999")  # mastery 0.128 (BKT)
    s2 = eng2.serve("stu2")
    assert s2["micro_win"] is False
    assert s2["question"] == "Explain conduction yourself."
    r = eng2.submit("stu2", s2["question_id"], "I tried it myself")
    assert r["outcome"] == "self_check"


# ---------------------------------------------------------------- #
# voice layer
# ---------------------------------------------------------------- #

def test_retreat_voice_carries_hinglish_line(tmp_path):
    v = TutorVoice(str(tmp_path))            # empty corpus: code-only
    r = render_serve_voice(v, "stu", 1, "Conduction",
                           "Why do metals conduct?",
                           retreated_from="x.4.1")
    assert r["template_id"] == "serve_retreat"
    assert r["retreated_from"] == "x.4.1"
    # the signature line survives rendering (sentence-case may
    # capitalise the leading word, so compare lowercased)
    assert "pehle wahi concept - 2 minute" in r["text"].lower()
    # Hinglish question -> Hinglish variant, same signature line
    rh = render_serve_voice(v, "stu", 2, "Conduction",
                            "ye wala concept samajh nahi aa raha",
                            retreated_from="x.4.1")
    assert rh["hinglish"] is True
    assert "pehle wahi concept - 2 minute" in rh["text"].lower()
    # every variant of the template keeps the line
    for turn in range(8):
        t = render_serve_voice(v, "stu", turn, "Conduction",
                               "Why do metals conduct?",
                               retreated_from="x.4.1")["text"]
        assert "pehle wahi concept - 2 minute" in t.lower()
    # a normal serve never uses the retreat framing
    rn = render_serve_voice(v, "stu", 3, "Conduction",
                            "Why do metals conduct?")
    assert rn["template_id"] != "serve_retreat"
    assert "pehle wahi concept" not in rn["text"].lower()
    assert "Why do metals conduct?" in rn["text"]


def test_micro_voice_outcomes_map_to_warm_templates(tmp_path):
    v = TutorVoice(str(tmp_path))
    win = render_submit_voice(v, "stu", 1, "micro_win",
                              concept_title="Number basics",
                              expected="11", got="11", student_text="11")
    assert win["template_id"] == "celebrate_and_advance"
    assert win["text"].strip()
    miss = render_submit_voice(v, "stu", 1, "micro_win_miss",
                               concept_title="Number basics",
                               expected="11", got="999",
                               student_text="999")
    assert miss["template_id"] == "emotional_support"
    assert miss["text"].strip()


# ---------------------------------------------------------------- #
# the wired API: /api/tutor-graph serves the retreat end to end
# ---------------------------------------------------------------- #

@pytest.fixture()
def api(tmp_path, monkeypatch):
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    import backend.api.competency_tutor as ct
    eng = _make_engine(tmp_path / "api")
    eng.prereq_overrides["x.4.1"] = "x.1.1"
    _skip(eng, "retreater", "x.1.1")
    saved = getattr(ct, "_engine", None)
    ct._engine = eng
    # hermetic voice: empty corpus, static templates only
    monkeypatch.setattr(ct, "get_voice",
                        lambda: TutorVoice(str(tmp_path / "api")))
    app = FastAPI()
    app.include_router(ct.router)
    try:
        with TestClient(app) as c:
            yield c, eng
    finally:
        ct._engine = saved


def test_api_retreat_journey(api):
    c, _eng = api
    s1 = c.get("/api/tutor-graph/serve",
               params={"student_id": "retreater"}).json()
    assert s1["concept_id"] == "x.4.1"
    assert s1["tier"] == "grade" and s1["micro_win"] is False
    r1 = c.post("/api/tutor-graph/submit",
                json={"student_id": "retreater",
                      "question_id": s1["question_id"],
                      "answer": "999"}).json()
    assert r1["outcome"] == "wrong"
    s2 = c.get("/api/tutor-graph/serve",
               params={"student_id": "retreater"}).json()
    assert s2["tier"] == "easy"                  # ladder dropped
    r2 = c.post("/api/tutor-graph/submit",
                json={"student_id": "retreater",
                      "question_id": s2["question_id"],
                      "answer": "999"}).json()
    assert r2["outcome"] == "wrong"
    assert r2["retreat_to"] == "x.1.1"
    s3 = c.get("/api/tutor-graph/serve",
               params={"student_id": "retreater"}).json()
    assert s3["concept_id"] == "x.1.1"
    assert s3["retreated_from"] == "x.4.1"
    assert s3["retreat_voice"] == "pehle wahi concept - 2 minute"
    assert ("pehle wahi concept - 2 minute"
            in s3["voice"]["text"].lower())
    assert s3["voice"]["template_id"] == "serve_retreat"


def test_api_micro_win_serve_journey(api):
    c, eng = api
    _skip(eng, "microstu", "x.4.1")
    _skip(eng, "microstu", "x.4.2")
    s1 = c.get("/api/tutor-graph/serve",
               params={"student_id": "microstu"}).json()
    assert s1["concept_id"] == "x.1.1"
    c.post("/api/tutor-graph/submit",
           json={"student_id": "microstu",
                 "question_id": s1["question_id"],
                 "answer": "999"})
    s2 = c.get("/api/tutor-graph/serve",
               params={"student_id": "microstu"}).json()
    assert s2["micro_win"] is True
    r = c.post("/api/tutor-graph/submit",
               json={"student_id": "microstu",
                     "question_id": s2["question_id"],
                     "answer": "11"}).json()
    assert r["outcome"] == "micro_win"
    assert r["voice"]["template_id"] == "celebrate_and_advance"
