"""test_tutor_voice.py -- the natural-voice layer over the tutor brain.

Covers:
  - brain loading (all batch files, malformed lines tolerated)
  - classification hit-rate on 20 sample phrasings from the brain
  - deterministic, hash-driven variant rendering
  - Hinglish detection and mirroring
  - tone guarantees (encouraging, never punitive)
  - slip diagnosis heuristics
  - the wired "voice" field on /api/tutor-graph serve + submit

All local and deterministic: no LLM/API calls.
"""
from __future__ import annotations

import json
import os
import re
import sys

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.services import tutor_voice as tv
from backend.services.tutor_voice import (
    BRAIN_DIR,
    TutorVoice,
    detect_hinglish,
    diagnose_slip,
    get_voice,
    render_submit_voice,
)

HAS_BRAIN = os.path.isdir(BRAIN_DIR) and bool(
    [f for f in os.listdir(BRAIN_DIR) if f.startswith("batch_")])


# ---------------------------------------------------------------- #
# fixtures
# ---------------------------------------------------------------- #
@pytest.fixture(scope="module")
def voice():
    if not HAS_BRAIN:
        pytest.skip("tutor-brain corpus absent")
    return get_voice()


def _brain_samples(count: int = 20):
    """Deterministic spread of authored patterns across the corpus
    (every 237th node, first pattern of the node)."""
    samples = []
    step = 0
    for path in sorted(os.listdir(BRAIN_DIR)):
        if not (path.startswith("batch_") and path.endswith(".json")):
            continue
        with open(os.path.join(BRAIN_DIR, path), encoding="utf-8") as fh:
            data = json.load(fh)
        for node in data:
            if step % 237 == 0:
                cps = node.get("classification_patterns") or []
                if cps and isinstance(cps[0], dict) \
                        and str(cps[0].get("pattern") or "").strip():
                    samples.append((str(node.get("node_id")), cps[0]))
            step += 1
            if len(samples) >= count:
                return samples
    return samples


# ---------------------------------------------------------------- #
# corpus loading
# ---------------------------------------------------------------- #
@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_brain_corpus_fully_loaded(voice):
    assert voice.files_loaded >= 300          # the 316 batch files
    assert voice.nodes_loaded >= 4000         # ~4.7k learning nodes
    assert voice.patterns_loaded >= 70000     # ~80k authored phrasings
    # malformed lines are tolerated, never fatal
    assert voice.malformed_skipped < voice.patterns_loaded * 0.01


def test_brain_loader_tolerates_malformed(tmp_path):
    good = [{"node_id": "n1", "subject": "physics", "class_level": 10,
             "title": "t",
             "classification_patterns": [
                 {"pattern": "what is force", "intent": "question",
                  "template_id": "eli5_simple", "confidence": 0.9},
                 {"pattern": "", "intent": "question",
                  "template_id": "eli5_simple", "confidence": 0.9},
                 "not-a-dict",
             ]}]
    (tmp_path / "batch_0001.json").write_text(
        json.dumps(good), encoding="utf-8")
    (tmp_path / "batch_0002.json").write_text(
        "{not valid json", encoding="utf-8")
    (tmp_path / "batch_0003.json").write_text(
        json.dumps({"surprise": "not a list"}), encoding="utf-8")
    v = TutorVoice(str(tmp_path))
    assert v.files_loaded == 1
    assert v.files_skipped == 2               # bad json + non-list body
    assert v.nodes_loaded == 1
    assert v.patterns_loaded == 1             # empty + non-dict skipped
    assert v.malformed_skipped == 2
    assert v.classify("what is force")["intent"] == "question"


# ---------------------------------------------------------------- #
# classification
# ---------------------------------------------------------------- #
@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_classify_sample_hit_rate(voice):
    """20 sample phrasings straight from the brain files: the matcher
    must recover their authored intent + template (>= 90%)."""
    samples = _brain_samples(20)
    assert len(samples) == 20
    hits = 0
    for _nid, cp in samples:
        got = voice.classify(str(cp["pattern"]))
        if (got["intent"] == cp["intent"]
                and got["template_id"] == cp["template_id"]):
            hits += 1
    assert hits / 20 >= 0.9, f"hit-rate {hits}/20 below 90%"


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_classify_known_phrasings(voice):
    r = voice.classify("what is moment of a force")
    assert r["intent"] == "question"
    assert r["template_id"] == "eli5_simple"
    assert r["confidence"] > 0.5
    r = voice.classify("moment ka matlab samjhao")
    assert r["intent"] == "request_simplify"
    assert r["template_id"] == "eli5_simple"
    r = voice.classify("i use actual distance from pivot to point "
                       "of force")
    assert r["intent"] == "misconception"
    assert r["template_id"] == "misconception_correction"
    r = voice.classify("give me a hint please")
    assert r["intent"] == "request_hint"
    assert r["template_id"] == "hint_progressive"


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_classify_fallback_and_shape(voice):
    assert voice.classify("")["confidence"] == 0.0
    assert voice.classify("   ")["intent"] == "question"
    weird = voice.classify("zzzqqq xxxfff blorptastic")
    assert set(["intent", "template_id", "confidence"]) <= set(weird)
    assert weird["confidence"] == 0.0         # honest zero, no fake hit
    # matched results carry the full contract
    full = voice.classify("what is moment of a force")
    assert set(["intent", "template_id", "confidence", "node_id",
                "matched_pattern"]) <= set(full)


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_classify_deterministic(voice):
    a = voice.classify("how to calculate moment about a pivot")
    b = voice.classify("how to calculate moment about a pivot")
    assert a == b


# ---------------------------------------------------------------- #
# Hinglish
# ---------------------------------------------------------------- #
def test_hinglish_detection():
    assert detect_hinglish("moment ke formula batado") is True
    assert detect_hinglish("samajh nahi aa raha") is True
    assert detect_hinglish("ye kya hai bhai") is True
    assert detect_hinglish("केंद्रीय बल क्या है") is True     # Devanagari
    assert detect_hinglish("what is the moment of a force") is False
    assert detect_hinglish("how do I calculate torque") is False
    assert detect_hinglish("") is False


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_render_mirrors_hinglish(voice):
    base = {"student_id": "hin1", "turn": 3, "concept_title": "Moments",
            "expected": "600", "got": "300",
            "slip": diagnose_slip("600", "300"),
            "worked_solution": "Step 1: Find the perpendicular "
                               "distance from the pivot."}
    en = voice.render("misconception_correction",
                      {**base, "student_text": "is my answer wrong"})
    hi = voice.render("misconception_correction",
                      {**base, "student_text": "mera answer galat hai "
                                               "kya batao"})
    # the Hinglish student is answered from the Hinglish variant pool,
    # the English student from the English one
    hi_pool = [tv._fill(v, dict(base), True)
               for v in tv._TEMPLATES["misconception_correction"]["hi"]]
    en_pool = [tv._fill(v, dict(base), False)
               for v in tv._TEMPLATES["misconception_correction"]["en"]]
    assert hi in hi_pool and hi not in en_pool
    assert en in en_pool and en not in hi_pool
    assert hi != en


# ---------------------------------------------------------------- #
# rendering
# ---------------------------------------------------------------- #
@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_render_deterministic_and_varies(voice):
    ctx = {"student_id": "stu42", "turn": 5,
           "concept_title": "Principle of moments",
           "expected": "600 N cm", "got": "600 N cm",
           "student_text": "600"}
    a = voice.render("celebrate_and_advance", ctx)
    b = voice.render("celebrate_and_advance", dict(ctx))
    assert a == b                            # same inputs, same voice
    varied = {voice.render("celebrate_and_advance",
                           {**ctx, "turn": t})
              for t in range(12)}
    assert len(varied) >= 3                  # repeats genuinely vary


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_render_uses_student_name(voice):
    named = voice.render("celebrate_and_advance",
                         {"student_id": "s", "turn": 1,
                          "name": "Aisha Patel",
                          "concept_title": "Moments"})
    assert "Aisha" in named
    unnamed = voice.render("celebrate_and_advance",
                           {"student_id": "s", "turn": 1,
                            "concept_title": "Moments"})
    assert "Aisha" not in unnamed and unnamed


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_render_never_punitive(voice):
    """Tone guarantee: wrong / lets_learn / ungraded voices across all
    variants never shame the student."""
    punitive = re.compile(
        r"\b(stupid|dumb|idiot|careless|lazy|hopeless|useless|"
        r"failure|shame|garbage|pathetic|wake up)\b", re.I)
    ctx = {"expected": "600 N cm", "got": "1200 N cm",
           "concept_title": "Moments",
           "slip": diagnose_slip("600 N cm", "1200 N cm"),
           "worked_solution": "Step 1: Take the perpendicular "
                              "distance from the pivot."}
    for template in ("misconception_correction", "emotional_support",
                     "validate_and_reframe", "celebrate_and_advance"):
        for turn in range(4):                # every variant
            text = voice.render(template, {**ctx, "student_id": "s",
                                           "turn": turn})
            assert not punitive.search(text), \
                f"punitive wording in {template}: {text!r}"
            assert text.strip()


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_render_unknown_template_falls_back_warm(voice):
    text = voice.render("no_such_template",
                        {"student_id": "s", "turn": 0,
                         "first_step": "Add the two forces first."})
    # warm eli5 fallback, not a crash, not a bare stack trace
    assert text.strip() and "forces" in text


# ---------------------------------------------------------------- #
# slip diagnosis
# ---------------------------------------------------------------- #
def test_diagnose_slip_cases():
    assert "sign" in diagnose_slip("600", "-600").lower()
    assert "factor-of-two" in diagnose_slip("600", "1200").lower()
    assert "unit-conversion" in diagnose_slip("600", "600000").lower()
    assert "rounding" in diagnose_slip("600", "601").lower()
    assert "arithmetic" in diagnose_slip("600", "733").lower()
    assert "km/h" in diagnose_slip("20", "72").lower()
    assert "never landed" in diagnose_slip("600", "  ").lower()
    # deterministic
    assert diagnose_slip("600", "1200") == diagnose_slip("600", "1200")


# ---------------------------------------------------------------- #
# wired endpoints: /api/tutor-graph serve + submit carry "voice"
# ---------------------------------------------------------------- #
_TEMP_CATALOG = {
    "class": 7, "subject": "science", "chapter": 4,
    "chapter_title": "Heat",
    "worked_examples": [
        {"q": "Convert 0 C to kelvin.", "a": "273 K"},
        {"q": "A 600 g weight sits 40 cm from the pivot; find the "
              "balancing moment in N cm.", "a": "24000 N cm"},
    ],
    "concepts": [
        {"id": "x.4.1", "title": "Temperature scales",
         "formula": "K = C + 273", "question_patterns": ["p"]},
        {"id": "x.4.2", "title": "Principle of moments",
         "formula": "moment = force x perpendicular distance",
         "question_patterns": ["p"]},
    ],
}


@pytest.fixture()
def api(tmp_path):
    import backend.api.competency_tutor as ct
    d = tmp_path / "cats"
    d.mkdir()
    json.dump(_TEMP_CATALOG,
              open(d / "catalog_t.json", "w", encoding="utf-8"))
    eng = ct.TutorEngine(str(d))
    saved = getattr(ct, "_engine", None)
    ct._engine = eng
    app = FastAPI()
    app.include_router(ct.router)
    try:
        with TestClient(app) as c:
            yield c, eng
    finally:
        ct._engine = saved


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_api_serve_carries_voice(api):
    c, _eng = api
    body = c.get("/api/tutor-graph/serve",
                 params={"student_id": "voicetest"}).json()
    v = body["voice"]
    assert v["text"] and body["question"] in v["text"]
    assert "template_id" in v and "intent" in v
    assert isinstance(v["hinglish"], bool)


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_api_submit_wrong_names_the_slip(api):
    c, _eng = api
    served = c.get("/api/tutor-graph/serve",
                   params={"student_id": "voicetest",
                           "subject": "science"}).json()
    # find the graded worked item and answer it wrong by a clear margin
    con = _eng.concepts[served["concept_id"]]
    graded = [i for i in con.pool if not i.get("self_check")]
    assert graded, "fixture must contain a graded item"
    qid = f"{con.concept_id}::{con.pool.index(graded[0]) + 1}"
    out = c.post("/api/tutor-graph/submit",
                 json={"student_id": "voicetest", "question_id": qid,
                       "answer": "999999"}).json()
    assert out["outcome"] == "wrong"
    v = out["voice"]
    assert v["template_id"] == "misconception_correction"
    assert "verified value" in v["text"]      # the slip is named
    assert "999999" in v["text"]              # what they wrote, kindly
    # encourage: the worked method is pointed at
    assert "try" in v["text"].lower() or "steps" in v["text"].lower()


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_api_submit_correct_celebrates(api):
    c, eng = api
    served = c.get("/api/tutor-graph/serve",
                   params={"student_id": "voicetest2",
                           "subject": "science"}).json()
    con = eng.concepts[served["concept_id"]]
    graded = [i for i in con.pool if not i.get("self_check")]
    item = graded[0]
    qid = f"{con.concept_id}::{con.pool.index(item) + 1}"
    out = c.post("/api/tutor-graph/submit",
                 json={"student_id": "voicetest2", "question_id": qid,
                       "answer": str(item["a"])}).json()
    assert out["outcome"] == "correct"
    v = out["voice"]
    assert v["template_id"] == "celebrate_and_advance"
    assert not v["hinglish"]                  # English in, English out


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_api_submit_hinglish_lets_learn_mirrors(api):
    c, eng = api
    served = c.get("/api/tutor-graph/serve",
                   params={"student_id": "voicetest3",
                           "subject": "science"}).json()
    out = c.post("/api/tutor-graph/submit",
                 json={"student_id": "voicetest3",
                       "question_id": served["question_id"],
                       "answer": "pata nahi yaar, skip"}).json()
    assert out["outcome"] == "lets_learn"
    v = out["voice"]
    assert v["template_id"] == "emotional_support"
    assert v["hinglish"] is True              # Hinglish in, Hinglish out


@pytest.mark.skipif(not HAS_BRAIN, reason="tutor-brain corpus absent")
def test_api_voice_deterministic(api):
    """Same inputs -> identical voice (turn included)."""
    c, eng = api
    served = c.get("/api/tutor-graph/serve",
                   params={"student_id": "detvoice",
                           "subject": "science"}).json()
    out = c.post("/api/tutor-graph/submit",
                 json={"student_id": "detvoice",
                       "question_id": served["question_id"],
                       "answer": "999999"}).json()
    replay = render_submit_voice(
        get_voice(), "detvoice", int(out["attempts"]),
        str(out["outcome"]),
        concept_title=eng.concepts[served["concept_id"]].title,
        expected=str(out.get("expected") or ""),
        got="999999",
        worked_solution=str(out.get("worked_solution") or ""),
        student_text="999999")
    assert replay == out["voice"]
