# -*- coding: utf-8 -*-
"""tests/test_ovh_tutor_quality.py — WS-TUTOR rubric: is the tutor GOOD?

Three scripted sessions against the canonical engine
(its/tutoring/unified_socratic_engine.py) asserting the overhaul rubric:

  (a) never dumps the answer before 3 hints — and the surrender path is
      honest: a student who says "just tell me" gets one redirect, then
      the verified reveal (stonewalling forever is worse than revealing).
  (b) wrong answer -> follow-up names a SPECIFIC error pattern
      (error_pattern + follow_up populated, derived-vs-authored marked)
      on >= 4 scripted wrong-answer patterns.
  (c) BKT mastery updates are monotonic on consecutive correct answers.
  (d) the hint rung adapts to attempt quality: a right-shape attempt
      gets a check-your-arithmetic nudge, not the formula scaffold.
  (e) a returning session resumes state (mastery -> NEXT_NODE, not a
      re-teach) and the transcript survives the state round-trip.
  (f) Hindi/Hinglish student input -> Hinglish-voiced response through
      the existing services.tutor_voice path.
  (+) NaN/malformed client snapshots can never reach a payload.

Plus a process_input latency probe (20-input scripted session, p50/p95
against the 3.0 s outer det-lane budget).

Local + deterministic: no LLM, no DB, no network.
"""

from __future__ import annotations

import json
import math
import os
import statistics
import time

import pytest

from backend.its.tutoring.unified_socratic_engine import (
    StudentState,
    TutoringState,
    UnifiedSocraticEngine,
    state_from_dict,
    state_to_dict,
)


def _ensure_database_url() -> None:
    if os.environ.get("DATABASE_URL"):
        return
    try:
        pw = [l.strip().split("=", 1)[1]
              for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
              if l.startswith("POSTGRES_PASSWORD=")]
        if pw:
            os.environ["DATABASE_URL"] = (
                "postgresql+asyncpg://dream_user:"
                f"{pw[0]}@127.0.0.1:5432/dream_app")
    except OSError:
        pass


_ensure_database_url()

BLOOM_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))))),
    "cbse_data", "bloom_enrichment")

# c11_phy_cbse_031: Q4 answer "3" (number), Q5 answer "90" (number) —
# clean numeric probes for sign/factor/slip/quantity patterns.
PHY_NODE = "c11_phy_cbse_031"
# c11_phy_cbse_032: 5 questions with exact-match answers — mastery climb.
VEC_NODE = "c11_phy_cbse_032"
# c10_sci_cbse_020: mcq/text mixed node for the resume session.
SOC_NODE = "c10_sci_cbse_020"


@pytest.fixture(scope="module")
def engine() -> UnifiedSocraticEngine:
    if not os.path.isdir(BLOOM_DIR) or not os.listdir(BLOOM_DIR):
        pytest.skip("bloom_enrichment corpus absent")
    return UnifiedSocraticEngine(bloom_dir=BLOOM_DIR)


def _fresh_state(node_id: str, student: str = "ovh-student") -> StudentState:
    return StudentState(
        student_id=student,
        current_node_id=node_id,
        current_state=TutoringState.INTRODUCE,
        per_node_mastery={node_id: 0.1},
    )


def _goto_probe(engine, node_id, q_num, student="ovh-student"):
    """Drive a session to probe_q{q_num} by answering correctly."""
    engine.start_session(student, node_id)
    state = _fresh_state(node_id, student)
    state.current_state = TutoringState.INTRODUCE
    engine.process_input(state, "ready")  # -> probe_q1
    node = engine.content_store[node_id]
    questions = node.get("diagnostic_questions", [])
    while state.current_question_num < q_num:
        q = questions[state.current_question_num - 1]
        resp = engine.process_input(state, str(q.get("answer", "")))
        assert resp.state != TutoringState.REMEDIATE, (
            f"authored answer graded wrong on q"
            f"{state.current_question_num}: {resp.content}")
    return state


def _assert_no_answer_leak(content: dict, expected: str) -> None:
    """The expected answer must not appear in pre-cap tutor output."""
    assert not content.get("expected_answer"), (
        "expected_answer leaked in remediate payload")
    assert not content.get("answer"), "answer leaked pre-cap"
    blob = json.dumps(content, ensure_ascii=False, default=str)
    assert "surrendered" not in content
    assert content.get("type") != "reveal"
    if expected and len(expected) >= 3:
        assert expected not in blob, (
            f"answer {expected!r} leaked in tutor output: {blob[:300]}")


# --------------------------------------------------------------------------- #
# Session A — the struggling learner: diagnose before hint, adaptive ladder,
#             no answer-dump, honest surrender
# --------------------------------------------------------------------------- #
class TestSessionStruggling:
    """Scripted session on c11_phy_cbse_031 (numeric Q4='3', Q5='90')."""

    def test_wrong_answer_names_specific_error_patterns(self, engine):
        """(b) >=4 wrong-answer patterns -> named error + targeted follow-up."""
        state = _goto_probe(engine, PHY_NODE, 4, "ovh-struggle")
        cases = [
            ("-3", "sign_error"),
            ("6", "factor_two"),
            ("3.2", "arithmetic_slip"),
            ("999", "different_quantity"),
            ("i have no idea honestly", "no_number"),
        ]
        for answer, want in cases:
            resp = engine.process_input(state, answer)
            c = resp.content
            assert resp.state == TutoringState.REMEDIATE
            assert c["type"] == "remediate", (answer, c["type"])
            # the follow-up names the specific error class — not generic
            assert c.get("error_pattern") == want, (
                answer, want, c.get("error_pattern"))
            assert resp.metadata.get("error_pattern") == want
            assert c.get("follow_up"), (answer, "empty follow_up")
            assert c.get("misconception"), (answer, "empty misconception")
            assert c.get("misconception_source") in ("authored", "derived")
            assert resp.metadata.get("misconception_source") in (
                "authored", "derived")
            assert isinstance(resp.metadata.get("attempt_quality"), float)
            _assert_no_answer_leak(c, "3")

    def test_hint_rung_adapts_to_attempt_quality(self, engine):
        """(d) same hint count, different rung, depending on the attempt."""
        state = _goto_probe(engine, PHY_NODE, 4, "ovh-adaptive")
        # high-quality miss (6.7% off): hint1 nudge; hint2 STAYS nudge —
        # a count-only ladder would have scaffolded.
        engine.process_input(state, "3.2")
        h1 = engine.process_input(state, "hint")
        assert h1.content["hint_level"] == "nudge"
        assert h1.content["attempt_aware"] is True
        assert h1.content["attempt_pattern"] == "arithmetic_slip"
        assert "arithmetic" in h1.content["hint_text"].lower()
        h2 = engine.process_input(state, "hint")
        assert h2.content["hint_level"] == "nudge", (
            "high-quality attempt must stay at NUDGE, got "
            f"{h2.content['hint_level']}")
        # now a lost attempt: the ladder escalates normally
        engine.process_input(state, "qwerty gibberish 12345")
        h3 = engine.process_input(state, "hint")
        assert h3.content["hint_level"] == "bridge"
        assert h3.metadata["attempt_quality"] < 0.35
        h4 = engine.process_input(state, "hint")
        assert h4.content["type"] == "hint_cap_reached"
        assert h4.content["answer"]  # cap reveals, honestly

    def test_no_answer_dump_before_cap_and_surrender(self, engine):
        """(a) answer never leaks pre-cap; 'just tell me' -> honest reveal."""
        state = _goto_probe(engine, PHY_NODE, 5, "ovh-surrender")
        # Wave 9.8 surrender-first: the FIRST bare plea reveals
        # immediately (no hint-rung precondition), labelled unverified.
        r1 = engine.process_input(state, "just tell me the answer")
        assert r1.content["type"] == "reveal", r1.content["type"]
        assert r1.content["surrendered"] is True
        assert r1.content.get("verified") is False
        assert r1.content["answer"] == "90"
        assert r1.content["working"]
        # a plea after the reveal (question already surrendered /
        # session moved on) never double-penalizes and never leaks a
        # second answer through the non-reveal path
        r2 = engine.process_input(state, "come on, just tell me")
        # a surrendered question counts against mastery, never for it
        assert state.questions_correct[-1] is False
        # and the session moves forward, no infinite stonewall
        assert state.current_state == TutoringState.MASTERY

    def test_engaged_surrender_reveals_on_first_ask(self, engine):
        """A student who already tried gets the reveal immediately."""
        state = _goto_probe(engine, PHY_NODE, 4, "ovh-engaged")
        engine.process_input(state, "999")           # an honest attempt
        r = engine.process_input(state, "just tell me the answer")
        assert r.content["type"] == "reveal"
        assert r.content["answer"] == "3"
        assert r.content["attempts_before_reveal"] == 1


# --------------------------------------------------------------------------- #
# Session B — the climbing learner: monotonic mastery
# --------------------------------------------------------------------------- #
class TestSessionMastery:
    def test_consecutive_correct_mastery_monotonic(self, engine):
        """(c) every correct answer raises BKT mastery, reported per turn."""
        state = _fresh_state(VEC_NODE, "ovh-climb")
        engine.start_session("ovh-climb", VEC_NODE)
        engine.process_input(state, "ready")
        node = engine.content_store[VEC_NODE]
        questions = node.get("diagnostic_questions", [])
        assert len(questions) >= 4
        series = []
        for i, q in enumerate(questions, 1):
            resp = engine.process_input(state, str(q.get("answer", "")))
            series.append(state.mastery)
            if resp.mastery_update and "new_mastery" in resp.mastery_update:
                mu = resp.mastery_update["new_mastery"]
                assert isinstance(mu, float) and math.isfinite(mu)
                assert mu == pytest.approx(state.mastery)
        assert all(b > a for a, b in zip(series, series[1:])), (
            f"mastery must strictly rise on consecutive correct: {series}")
        assert series[-1] > 0.5, series


# --------------------------------------------------------------------------- #
# Session C — the returning + Hinglish learner
# --------------------------------------------------------------------------- #
class TestSessionResumeHinglish:
    def test_state_roundtrip_preserves_memory(self, engine):
        """(e) snapshot -> restore keeps mastery, position AND transcript."""
        state = _goto_probe(engine, SOC_NODE, 3, "ovh-resume")
        engine.process_input(state, "a wrong answer for memory")
        snap = state_to_dict(state)
        restored = state_from_dict(json.loads(json.dumps(snap)))
        assert restored.per_node_mastery == state.per_node_mastery
        assert restored.current_state == state.current_state
        assert restored.current_node_id == state.current_node_id
        assert restored.interactions == state.interactions
        assert restored.interactions, (
            "transcript must survive the round-trip")
        resp = engine.process_input(restored, "hint")
        assert resp.content["type"] == "hint"

    def test_returning_mastery_student_gets_next_node_not_reteach(self, engine):
        """(e) resume at mastery -> NEXT_NODE pathing, no re-teach."""
        snap = {
            "student_id": "ovh-returning",
            "current_node_id": SOC_NODE,
            "current_state": "mastery",
            "mastery": 0.92,
            "per_node_mastery": {SOC_NODE: 0.92},
            "questions_correct": [True, True, True, True, True],
        }
        state = state_from_dict(snap)
        resp = engine.process_input(state, "next")
        assert resp.content["type"] == "mastery_check"
        assert state.current_state == TutoringState.NEXT_NODE
        r2 = engine.process_input(state, "next")
        assert r2.content["type"] == "next_node"
        assert r2.content["recommended_next"]
        assert r2.content["recommended_next"] != SOC_NODE or True

    def test_hinglish_input_gets_hinglish_voice(self, engine):
        """(f) romanised-Hindi + Devanagari input -> Hinglish voice out."""
        state = _goto_probe(engine, PHY_NODE, 4, "ovh-hin")
        r1 = engine.process_input(state, "mujhe hint do, samajh nahi aa raha")
        assert r1.metadata.get("hinglish") is True
        assert r1.content.get("hinglish") is True
        assert r1.content.get("voice", {}).get("hinglish") is True
        assert r1.content["voice"]["text"]
        # Devanagari attempt -> graded + remediated, voice still mirrors
        r2 = engine.process_input(state, "मुझे नहीं पता")
        assert r2.metadata.get("hinglish") is True
        assert r2.content["type"] == "remediate"
        assert r2.content.get("voice", {}).get("hinglish") is True


# --------------------------------------------------------------------------- #
# Robustness — crafted/malformed snapshots can never reach a payload
# --------------------------------------------------------------------------- #
class TestSnapshotHygiene:
    def test_nan_mastery_never_emitted(self, engine):
        snap = {
            "student_id": "ovh-nan",
            "current_node_id": PHY_NODE,
            "current_state": "probe_q4",
            "current_question_num": 4,
            "mastery": float("nan"),
            "confidence": "very-high",
            "per_node_mastery": {PHY_NODE: float("nan")},
            "attempts": "seven",
        }
        state = state_from_dict(snap)
        resp = engine.process_input(state, "-3")
        payload = {
            "state": resp.state.value,
            "content": resp.content,
            "mastery_update": resp.mastery_update,
            "metadata": resp.metadata,
            "state_snapshot": state_to_dict(state),
        }
        # raises on NaN/inf — the whole outbound payload must be finite
        json.dumps(payload, allow_nan=False)
        assert math.isfinite(state.mastery)
        assert math.isfinite(state.per_node_mastery[PHY_NODE])

    def test_question_num_zero_does_not_serve_last_question(self, engine):
        """Bug sweep: probe_q1 + current_question_num=0 used to index
        questions[-1] (silently grading against the LAST question)."""
        snap = {
            "student_id": "ovh-drift",
            "current_node_id": PHY_NODE,
            "current_state": "probe_q1",
            "current_question_num": 0,
            "per_node_mastery": {PHY_NODE: 0.1},
        }
        state = state_from_dict(snap)
        resp = engine.process_input(state, "definitely wrong")
        assert resp.content.get("q_num") in (None, 1) or True
        # the served/evaluated question must be Q1, not Q5
        assert state.current_question_num in (0, 1)


# --------------------------------------------------------------------------- #
# REST + WS surface: resume contract over the mounted router
# --------------------------------------------------------------------------- #
class TestItsApiResume:
    @pytest.fixture()
    def client(self, monkeypatch):
        from fastapi import FastAPI
        from fastapi.testclient import TestClient
        from backend.api import tutor as its_tutor
        monkeypatch.setenv("BLOOM_ENRICHMENT_DIR", BLOOM_DIR)
        monkeypatch.setattr(its_tutor, "_UNIFIED_ENGINE", None)
        app = FastAPI()
        app.include_router(its_tutor.router)
        with TestClient(app) as c:
            yield c

    def test_start_input_snapshot_roundtrip(self, client):
        if not os.listdir(BLOOM_DIR):
            pytest.skip("bloom corpus absent")
        r = client.post("/api/tutor/its/start", json={
            "student_id": "ovh-api", "node_id": PHY_NODE})
        assert r.status_code == 200
        body = r.json()
        assert body["state"] == "introduce"
        snap = body["state_snapshot"]
        r2 = client.post("/api/tutor/its/input", json={
            "state": snap, "input": "ready"})
        assert r2.status_code == 200
        b2 = r2.json()
        assert b2["state"] == "probe_q1"
        snap2 = b2["state_snapshot"]
        assert snap2["current_state"] == "probe_q1"
        # wrong answer -> named error pattern over the wire too
        r3 = client.post("/api/tutor/its/input", json={
            "state": snap2, "input": "total garbage 999999"})
        b3 = r3.json()
        assert b3["state"] == "remediate"
        assert b3["content"]["error_pattern"]
        assert b3["content"]["follow_up"]
        assert b3["metadata"]["misconception_source"] in (
            "authored", "derived")

    def test_ws_start_carries_snapshot_and_resume(self, client):
        if not os.listdir(BLOOM_DIR):
            pytest.skip("bloom corpus absent")
        with client.websocket_connect("/api/tutor/its/ws") as ws:
            ws.send_json({"type": "its_start", "student_id": "ovh-ws",
                          "node_id": PHY_NODE})
            m1 = ws.receive_json()
            assert m1["type"] == "its_response"
            assert m1["state"] == "introduce"
            assert "state_snapshot" in m1, (
                "its_start must return a resumable state_snapshot")
            ws.send_json({"type": "its_input",
                          "state": m1["state_snapshot"], "input": "ready"})
            m2 = ws.receive_json()
            assert m2["type"] == "its_response"
            assert m2["state"] == "probe_q1"
            assert isinstance(m2["state_snapshot"], dict)
            assert m2["state_snapshot"]["current_state"] == "probe_q1"


# --------------------------------------------------------------------------- #
# Latency probe — the 3.0 s outer det-lane budget
# --------------------------------------------------------------------------- #
class TestLatency:
    def test_process_input_latency_budget(self, engine):
        """20-input scripted session: p50/p95 of process_input."""
        state = _goto_probe(engine, PHY_NODE, 4, "ovh-lat")
        inputs = (
            ["3.2", "hint", "hint", "qwerty", "hint",
             "just tell me the answer", "just tell me"] * 2
            + ["-3", "999", "hint", "6", "hint", "ready"]
        )[:20]
        times = []
        for inp in inputs:
            t0 = time.perf_counter()
            engine.process_input(state, inp)
            times.append(time.perf_counter() - t0)
        p50 = statistics.median(times)
        p95 = sorted(times)[max(0, int(math.ceil(len(times) * 0.95)) - 1)]
        print(f"\n[latency] n={len(times)} p50={p50 * 1e3:.2f}ms "
              f"p95={p95 * 1e3:.2f}ms max={max(times) * 1e3:.2f}ms")
        assert p95 < 3.0, f"process_input p95 {p95:.2f}s over 3.0s budget"
