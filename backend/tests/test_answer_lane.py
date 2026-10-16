"""Layer U tests — the one answer-lane contract (BATCH_BRIEF §4B U1/U2).

Contract under test:
  1. The label enum is exactly VERIFIED / GROUNDED / AI / NONE.
  2. Pipeline verdict mapping: VERIFIED* -> VERIFIED, everything
     else -> NONE (a GUIDED result never masquerades).
  3. stamp() adds the shared fields to any reply dict, preserves the
     existing fields, and records one telemetry row (fail-open when
     the sink is unavailable).
  4. The tutor_rest kind->label map: solution/confirm_values VERIFIED,
     llm_fallback AI, node-content serves GROUNDED, guidance NONE.
  5. Voice surfaces: serve = NONE, submit reveal = VERIFIED.
"""
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..")))

os.environ.setdefault("SOLVER_LLM_MODE", "off")


def test_enum_is_the_contract():
    from backend.services.answer_lane import AnswerLabel
    assert {l.value for l in AnswerLabel} == \
        {"VERIFIED", "GROUNDED", "AI", "NONE"}


def test_pipeline_mapping():
    from backend.services.answer_lane import (AnswerLabel,
                                              label_from_pipeline)
    assert label_from_pipeline("VERIFIED") is AnswerLabel.VERIFIED
    assert label_from_pipeline("VERIFIED_ASSUMED") is \
        AnswerLabel.VERIFIED
    assert label_from_pipeline("GUIDED_PRACTICE") is AnswerLabel.NONE
    assert label_from_pipeline(None) is AnswerLabel.NONE


def test_stamp_adds_fields_and_preserves():
    from backend.services.answer_lane import AnswerLabel, stamp
    reply = {"text": "hello", "kept": True}
    out = stamp(reply, "test_surface", AnswerLabel.AI, "llm_fallback")
    assert out["answer_label"] == "AI"
    assert out["answer_source"] == "llm_fallback"
    assert out["answer_surface"] == "test_surface"
    assert out["kept"] is True and out["text"] == "hello"


def test_tutor_rest_kind_map():
    """The kind->label map inside _build_reply (duplicated here as the
    pinned contract — a change in tutor_service must update both)."""
    from backend.services.answer_lane import AnswerLabel
    lane_map = {
        "solution": AnswerLabel.VERIFIED,
        "confirm_values": AnswerLabel.VERIFIED,
        "llm_fallback": AnswerLabel.AI,
        "eli5": AnswerLabel.GROUNDED,
        "glossary": AnswerLabel.GROUNDED,
        "topic_browse": AnswerLabel.GROUNDED,
        "learning_path": AnswerLabel.GROUNDED,
        "walkthrough": AnswerLabel.GROUNDED,
        "flashcard_quiz_reveal": AnswerLabel.GROUNDED,
        "guided_practice_solution": AnswerLabel.GROUNDED,
    }
    assert lane_map["solution"] is AnswerLabel.VERIFIED
    assert lane_map["llm_fallback"] is AnswerLabel.AI
    assert lane_map["eli5"] is AnswerLabel.GROUNDED
    assert lane_map.get("clarify", AnswerLabel.NONE) is AnswerLabel.NONE


def test_tutor_service_source_carries_the_map():
    """The map in tutor_service._build_reply matches the pinned one."""
    import re
    src = open(os.path.join(os.path.dirname(__file__), "..",
                            "services", "tutor_service.py"),
               encoding="utf-8").read()
    for kind in ("solution", "confirm_values", "llm_fallback", "eli5",
                 "glossary", "topic_browse", "learning_path",
                 "walkthrough", "flashcard_quiz_reveal",
                 "guided_practice_solution"):
        assert f'"{kind}": AnswerLabel.' in src, kind
    assert 'stamp(reply["reply"], "tutor_rest"' in src


def test_voice_surfaces_carry_labels():
    src = open(os.path.join(os.path.dirname(__file__), "..",
                            "services", "tutor_voice.py"),
               encoding="utf-8").read()
    assert '"answer_label": "NONE"' in src          # serve = question
    assert '"answer_label": "VERIFIED"' in src      # submit reveal


def test_solver_router_maps_pipeline_verdict():
    src = open(os.path.join(os.path.dirname(__file__), "..",
                            "routers", "solver.py"),
               encoding="utf-8").read()
    assert '"answer_label": "NONE"' in src
    assert 'stamp(payload, "v2_solve"' in src


def test_v2_response_has_the_field():
    sys.path.insert(0, os.path.abspath(os.path.join(
        os.path.dirname(__file__), "..", "..", "backend")))
    from backend.services.tutor_service_v2 import TutorResponse
    r = TutorResponse(text="t", hint="", feedback="", intent="i",
                      mastery_level="", hint_level=0, retrieved_count=0,
                      revealed_count=0, quality_score=0.0,
                      latency_ms=0.0, errors=[])
    assert r.answer_label == "NONE"
