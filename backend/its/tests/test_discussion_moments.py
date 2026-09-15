"""Tests for the tutoring interaction-capture persistence and the
discussion-moment wiring (coach-vs-skeptic warm-up debate).

Covers:
  - SimpleInteractionCapture: JSONL persistence across instances
    (public capture() signature unchanged), thread-safe appends,
    atomic rewrite by NextItemCorrectnessTracker.
  - discussion_moments: prose / structured / Hindi misconception
    parsing, deterministic build_discussion_object, absence when no
    misconception data, DiscussionMomentsService guarded contract.
  - competency_tutor._attach_discussion: optional `discussion` key on
    the serve payload (absent for unknown concepts).
"""

from __future__ import annotations

import json
import os
import sys
import threading

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.tutoring.discussion_moments import (  # noqa: E402
    build_discussion_object,
    parse_misconception,
    should_trigger_discussion,
)
from backend.its.tutoring.interaction_capture import (  # noqa: E402
    NextItemCorrectnessTracker,
    SimpleInteractionCapture,
)

PROSE_MISC = (
    'Students often think "current gets used up" in a circuit — e.g., '
    '"current is less after passing through a bulb because the bulb '
    'consumes it." This is wrong: current is the same everywhere in a '
    "series circuit; what changes is energy (potential difference drops "
    "across the bulb). This misconception leads to errors in "
    "series/parallel analysis later."
)

HINDI_MISC = (
    "1. भ्रम: प्रकाश संश्लेषण में निकलने वाली ऑक्सीजन कार्बन डाइऑक्साइड से आती है।\n"
    "   सच्चाई: ऑक्सीजन पानी के प्रकाश-अपघटन से निकलती है, जैसा समस्थानिक "
    "प्रयोगों द्वारा सिद्ध है।"
)


# --------------------------------------------------------------------------- #
# interaction_capture
# --------------------------------------------------------------------------- #

def test_capture_persists_across_instances(tmp_path):
    path = str(tmp_path / "interactions.json")
    cap = SimpleInteractionCapture(filepath=path)
    iid = cap.capture(
        student_id="s1", session_id="sess1", subject="science",
        concept="jesc.101.1", grade_level=10, interaction_type="tutor_turn",
        agent_used="assessment_bot", is_correct=False,
    )
    assert iid
    # a fresh instance re-loads the JSONL log from disk
    cap2 = SimpleInteractionCapture(filepath=path)
    recs = cap2.get_interactions("s1", concept="jesc.101.1")
    assert len(recs) == 1
    assert recs[0].interaction_id == iid
    assert recs[0].agent_used == "assessment_bot"
    assert recs[0].is_correct is False


def test_capture_file_is_jsonl_and_concurrent_safe(tmp_path):
    path = str(tmp_path / "interactions.json")
    cap = SimpleInteractionCapture(filepath=path)
    threads = [
        threading.Thread(
            target=cap.capture, kwargs=dict(
                student_id=f"s{i}", session_id="x", subject="sci",
                concept="c1", grade_level=10,
                interaction_type="tutor_turn"))
        for i in range(8)
    ]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    lines = [ln for ln in open(path, encoding="utf-8").read().splitlines() if ln]
    assert len(lines) == 8
    assert all(isinstance(json.loads(ln), dict) for ln in lines)


def test_next_item_tracker_rewrites_atomically(tmp_path):
    path = str(tmp_path / "interactions.json")
    cap = SimpleInteractionCapture(filepath=path)
    cap.capture(student_id="s1", session_id="x", subject="sci",
                concept="c1", grade_level=10,
                interaction_type="socratic_turn")
    tracker = NextItemCorrectnessTracker(cap)
    assert tracker.track_next_item("s1", "c1", True) is True
    assert tracker.track_next_item("s1", "c1", True) is False  # already tracked
    assert not os.path.exists(path + ".tmp")                   # no tmp litter
    recs = SimpleInteractionCapture(filepath=path).get_interactions("s1")
    assert recs[0].next_item_correct is True


# --------------------------------------------------------------------------- #
# discussion_moments
# --------------------------------------------------------------------------- #

def test_parse_prose_misconception():
    parsed = parse_misconception(PROSE_MISC)
    assert parsed is not None
    assert "current gets used up" in parsed["misconception"]
    assert "current is the same everywhere" in parsed["truth"]
    # consequence/exam sentences never leak into the correction
    assert "board exams" not in parsed["truth"]


def test_parse_structured_hindi_misconception():
    parsed = parse_misconception(HINDI_MISC)
    assert parsed is not None
    assert "ऑक्सीजन कार्बन डाइऑक्साइड से आती है" in parsed["misconception"]
    assert "पानी के प्रकाश-अपघटन" in parsed["truth"]


def test_parse_rejects_junk_and_short_text():
    assert parse_misconception("") is None
    assert parse_misconception("too short") is None
    assert parse_misconception(
        "A definition of photosynthesis with no misconception turn at all "
        "and plenty of length over the forty character floor.") is None


def test_build_discussion_object_shape_and_determinism():
    marker = {"common_misconception": PROSE_MISC,
              "definition": "Current is charge flow per unit time.",
              "title": "Electric current"}
    d1 = build_discussion_object(marker, seed="jesc.101.1")
    d2 = build_discussion_object(marker, seed="jesc.101.1")
    assert d1 == d2                       # deterministic per concept
    assert set(d1) == {"claimA", "claimB", "correctIndex", "reveal"}
    assert d1["correctIndex"] in (0, 1)
    claims = [d1["claimA"], d1["claimB"]]
    assert d1["reveal"] == claims[d1["correctIndex"]]
    assert "current gets used up" in (claims[0] + claims[1])


def test_build_discussion_object_absent_without_misconception():
    assert build_discussion_object({"common_misconception": "short"},
                                   seed="x") is None
    assert build_discussion_object({}, seed="x") is None


def test_should_trigger_discussion_backcompat():
    # the legacy gate stays structured-only (unchanged contract)
    assert should_trigger_discussion(
        {"common_misconception": PROSE_MISC}) is False
    assert should_trigger_discussion(
        {"common_misconception": HINDI_MISC}) is True


def test_node_refs_stripped_from_claims():
    text = (
        "Students believe that weight and mass are the same thing and use "
        "them interchangeably in numericals. This is wrong: mass is the "
        "amount of matter (kg, constant) while weight is the force of "
        "gravity on it (N, varies by location) as taught in Class 9 "
        "(c9_phy_ch2_3)."
    )
    parsed = parse_misconception(text)
    assert parsed is not None
    assert "c9_phy_ch2_3" not in parsed["truth"]
    assert "c9_phy_ch2_3" not in parsed["misconception"]


# --------------------------------------------------------------------------- #
# competency_tutor wiring (offline: engine + real teaching corpus)
# --------------------------------------------------------------------------- #

def test_attach_discussion_optional_key(tmp_path):
    pytest.importorskip("backend.services.enhanced_nodes")
    try:
        from backend.services.enhanced_nodes import load_index
        load_index()
    except Exception:
        pytest.skip("enhanced-nodes corpus not deployed on this machine")
    from backend.api.competency_tutor import _attach_discussion, _get_engine
    eng = _get_engine()
    science = [c for c in eng.concepts.values()
               if c.order_key[0] == 10 and "sci" in c.order_key[1]]
    if not science:
        pytest.skip("no class-10 science concepts in catalog")
    concept = science[0]
    out = {"question_id": f"{concept.concept_id}::1",
           "concept_id": concept.concept_id,
           "concept_title": concept.title, "question": "q?"}
    out = _attach_discussion(out, eng)
    if "discussion" in out:
        d = out["discussion"]
        assert set(d) == {"claimA", "claimB", "correctIndex", "reveal"}
        assert isinstance(d["correctIndex"], int)
    # unknown concept -> key absent, no raise
    bare = _attach_discussion(
        {"concept_id": "nope.nope.1", "concept_title": "x"}, eng)
    assert "discussion" not in bare
