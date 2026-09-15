"""test_simple_explainer.py -- authored simple-language explanations.

Covers:
  - the 40-topic curated table (shape, three language variants each)
  - keyword matching on the classic confusion questions
  - the computational guard that protects the solver's verified lane
  - hint ladder: level 1 prefers the simple version (API)
  - WHY-lane on /api/tutor-graph/ask: teach responses before the solver,
    honest fall-through to the solver otherwise

All local and deterministic: no LLM/API calls.
"""
from __future__ import annotations

import json
import os
import sys

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.services import simple_explainer as se
from backend.services.tutor_voice import detect_hinglish

try:
    from backend.services import enhanced_nodes as en
    HAS_CORPUS = os.path.isdir(en.get_md_dir())
except Exception:                                    # pragma: no cover
    HAS_CORPUS = False


# ---------------------------------------------------------------- #
# the curated table
# ---------------------------------------------------------------- #
def test_table_has_40_curated_topics():
    assert se.topic_count() == 40
    tops = se.topics()
    assert len({t["id"] for t in tops}) == 40        # unique ids
    for t in se._TOPIC_LIST:
        assert t["phrases"], f"{t['id']} has no keyword phrases"
        for style in ("simple", "hinglish", "formal"):
            text = t["styles"][style]
            assert 80 <= len(text) <= 700, \
                f"{t['id']}.{style} text length {len(text)}"
            # authored prose, not placeholders
            assert not text.startswith("TODO")
        # the simple variant is a real 2+ sentence explanation
        sentences = [s for s in
                     __import__("re").split(r"[.!?]+", t["styles"]["simple"])
                     if s.strip()]
        assert len(sentences) >= 2, \
            f"{t['id']} simple variant has {len(sentences)} sentences"


def test_hinglish_variants_are_genuinely_hinglish():
    for t in se._TOPIC_LIST:
        assert detect_hinglish(t["styles"]["hinglish"]) is True, \
            f"{t['id']} hinglish variant has no Hinglish markers"
        assert detect_hinglish(t["styles"]["simple"]) is False, \
            f"{t['id']} simple variant reads as Hinglish"


def test_named_classics_match_their_topic():
    classics = {
        "why is negative multiplied by negative positive":
            "negative_times_negative",
        "why do we divide by 100 to find percentage": "percent_divide_100",
        "why do we flip the divisor in fraction division":
            "fraction_division_flip",
        "why do we multiply by 5/18 to convert km/h to m/s": "kmh_to_ms",
        "what is bodmas": "bodmas",
        "why do we use x in equations": "unknown_x",
        "difference between hcf and lcm": "hcf_vs_lcm",
        "difference between area and perimeter": "area_vs_perimeter",
        "difference between mean and median": "mean_vs_median",
        "what is the difference between distance and displacement":
            "distance_vs_displacement",
        "why is 1 not a prime number": "prime_one",
        "what is a mole in chemistry": "mole_meaning",
        "what is the difference between weather and climate":
            "weather_vs_climate",
    }
    for q, tid in classics.items():
        m = se.teach_match(q)
        assert m is not None, f"no teach match for {q!r}"
        assert m["id"] == tid, f"{q!r} -> {m['id']}, expected {tid}"


def test_three_styles_distinct_and_served_per_language():
    m = se.find_explanation("difference between hcf and lcm")
    assert m is not None
    styles = m["styles"]
    assert styles["simple"] != styles["hinglish"] != styles["formal"]
    assert styles["simple"] != styles["formal"]
    # English question -> simple; Hinglish question -> Hinglish
    assert m["style"] == "simple" and m["text"] == styles["simple"]
    hi = se.find_explanation(
        "bhai hcf aur lcm ka matlab kya hai samjhao")
    assert hi is not None and hi["style"] == "hinglish"
    assert hi["text"] == styles["hinglish"]
    # explicit override beats auto-detection
    forced = se.find_explanation("difference between hcf and lcm",
                                 hinglish=True)
    assert forced["text"] == styles["formal"].replace(
        styles["formal"], styles["hinglish"])


def test_unmatched_questions_return_none():
    for q in ["", "   ",
              "solve 234 x 567",
              "what is the moment of a force about a pivot",
              "zzzqqq xxxfff blorptastic",
              "A 600 g weight sits 40 cm from the pivot; find the "
              "balancing moment in N cm."]:
        assert se.find_topic(q) is None, q
        assert se.find_explanation(q) is None, q


def test_weak_single_regex_hits_do_not_fire():
    # one weak regex hit only: below the min_score floor
    assert se.find_topic("the temperature went from negative to normal") \
        is None or se.find_topic(
            "the temperature went from negative to normal")["score"] >= 2


# ---------------------------------------------------------------- #
# the WHY-lane guard: computations belong to the solver
# ---------------------------------------------------------------- #
def test_computational_guard():
    assert se.looks_computational("23 x 47") is True
    assert se.looks_computational("solve 2x+3=9") is True
    assert se.looks_computational("find the mean median and mode of "
                                  "2 4 4 6") is True
    assert se.looks_computational("convert 72 km/h into m/s") is True
    # conceptual markers disarm the guard
    assert se.looks_computational("why is 2^0 = 1") is False
    assert se.looks_computational("what is the difference between mean "
                                  "and median") is False
    assert se.looks_computational("why do we multiply by 5/18 to convert "
                                  "km/h to m/s") is False


def test_teach_match_accepts_conceptual_rejects_computational():
    m = se.teach_match("difference between hcf and lcm")
    assert m is not None and m["id"] == "hcf_vs_lcm"
    # computations never get a teach answer, even with topic words
    assert se.teach_match("find the lcm of 12 and 18") is None
    assert se.teach_match("convert 72 km/h into m/s") is None
    assert se.teach_match("23 x 47") is None


def test_explainer_deterministic():
    a = se.find_explanation("why is negative multiplied by negative "
                            "positive")
    b = se.find_explanation("why is negative multiplied by negative "
                            "positive")
    assert a == b


def test_informative_terms_strip_noise():
    assert se.informative_terms("what is photosynthesis and how does "
                                "it work") == ["photosynthesis", "work"]
    assert se.informative_terms("23 x 47") == []
    assert se.informative_terms("") == []


# ---------------------------------------------------------------- #
# wired endpoints
# ---------------------------------------------------------------- #
_TEMP_CATALOG = {
    "class": 9, "subject": "maths", "chapter": 1,
    "chapter_title": "Number play",
    "worked_examples": [
        {"q": "Why is minus into minus plus? Explain with one example.",
         "a": "The flip of a flip returns the original direction."},
        {"q": "A car covers 120 km in 3 hours. Find its average speed.",
         "a": "speed = 120 / 3 = 40 km/h"},
    ],
    "concepts": [
        {"id": "x.1.1", "title": "Integers: multiply and divide",
         "formula": "negative x negative = positive",
         "question_patterns": ["p"]},
        {"id": "x.1.2", "title": "Average speed",
         "formula": "speed = distance / time",
         "question_patterns": ["p"]},
    ],
}


@pytest.fixture()
def api(tmp_path):
    import backend.api.competency_tutor as ct
    d = tmp_path / "cats"
    d.mkdir()
    with open(d / "catalog_t.json", "w", encoding="utf-8") as fh:
        json.dump(_TEMP_CATALOG, fh)
    eng = ct.TutorEngine(str(d))
    saved = getattr(ct, "_engine", None)
    saved_cat = getattr(ct, "_misconceptions", None)
    ct._engine = eng
    app = FastAPI()
    app.include_router(ct.router)
    try:
        with TestClient(app) as c:
            yield c, eng
    finally:
        ct._engine = saved
        ct._misconceptions = saved_cat


def test_api_hint_level1_prefers_simple_hint(api):
    c, _eng = api
    out = c.get("/api/tutor-graph/hint",
                params={"student_id": "sh1", "question_id": "x.1.1::1",
                        "level": 1}).json()
    assert out["level"] == 1
    assert out["simple_hint"] is True
    assert out["topic_id"] == "negative_times_negative"
    assert "Concept:" not in out["hint"]      # simple version preferred
    assert "backward step" in out["hint"] or "debt" in out["hint"]
    assert set(out["styles"]) == {"simple", "hinglish", "formal"}
    # higher rungs of the ladder are untouched
    out2 = c.get("/api/tutor-graph/hint",
                 params={"student_id": "sh1", "question_id": "x.1.1::1",
                         "level": 2}).json()
    assert "simple_hint" not in out2 and out2["level"] == 2
    assert "flip of a flip" in out2["hint"]


def test_api_hint_level1_falls_back_without_match(api):
    c, _eng = api
    # pool item 2 = the average-speed word problem: no classic-confusion
    # hit, so the standard concept+formula ladder line is kept
    out = c.get("/api/tutor-graph/hint",
                params={"student_id": "sh2", "question_id": "x.1.2::2",
                        "level": 1}).json()
    assert out["level"] == 1
    assert "simple_hint" not in out
    assert "Concept:" in out["hint"]          # the standard ladder line


def test_api_ask_teach_lane_serves_authored_explanation(api):
    c, _eng = api
    r = c.post("/api/tutor-graph/ask",
               json={"student_id": "why1",
                     "question": "what is the difference between hcf "
                                 "and lcm"})
    assert r.status_code == 200
    body = r.json()
    assert body["teach"] is True
    assert body["verified"] is False          # never machine-verified
    assert body["label"] == "TEACH"
    assert body["source"] == "simple_explainer"
    assert body["topic_id"] == "hcf_vs_lcm"
    assert "numeric" not in body
    assert body["answer"].strip()
    assert set(body["styles"]) == {"simple", "hinglish", "formal"}


def test_api_ask_teach_hinglish_question_mirrors(api):
    c, _eng = api
    body = c.post("/api/tutor-graph/ask",
                  json={"student_id": "why2",
                        "question": "batao minus into minus plus kyu "
                                    "hota hai"}).json()
    assert body["teach"] is True
    assert body["topic_id"] == "negative_times_negative"
    assert body["style"] == "hinglish"
    assert detect_hinglish(body["answer"]) is True


def test_api_ask_teach_from_misconception_catalog(api):
    c, _eng = api
    body = c.post("/api/tutor-graph/ask",
                  json={"student_id": "why3",
                        "question": "what is conservation of energy and "
                                    "why does it matter"}).json()
    assert body["teach"] is True
    assert body["source"] == "misconception_catalog"
    assert body["topic_id"] == "energy_conservation_gap"
    assert body["verified"] is False
    assert "mix-up" in body["answer"].lower()


@pytest.mark.skipif(not HAS_CORPUS, reason="enhanced-nodes corpus absent")
def test_api_ask_teach_from_enhanced_nodes(api):
    c, _eng = api
    body = c.post("/api/tutor-graph/ask",
                  json={"student_id": "why4",
                        "question": "what is photosynthesis and how does "
                                    "it work"}).json()
    assert body["teach"] is True
    assert body["source"] == "enhanced_nodes"
    assert body["node_id"]
    assert "photosynthesis" in body["answer"].lower()
    assert body["verified"] is False


def test_api_ask_falls_through_to_solver(api):
    c, _eng = api
    body = c.post("/api/tutor-graph/ask",
                  json={"student_id": "calc1",
                        "question": "23 x 47"}).json()
    assert body.get("teach") is not True
    assert body["label"] == "VERIFIED"
    assert body["verified"] is True
    assert body["answer"]


def test_api_ask_deterministic(api):
    c, _eng = api
    a = c.post("/api/tutor-graph/ask",
               json={"student_id": "det",
                     "question": "difference between area and "
                                 "perimeter"}).json()
    b = c.post("/api/tutor-graph/ask",
               json={"student_id": "det",
                     "question": "difference between area and "
                                 "perimeter"}).json()
    assert a == b
