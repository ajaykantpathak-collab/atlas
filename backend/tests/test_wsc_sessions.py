# -*- coding: utf-8 -*-
"""tests/test_wsc_sessions.py — WS-C experience bar: 10 multi-turn tutor sessions.

Asserts true Socratic behavior across diverse subjects and grade levels:
  1. No answer-dumping on first ask (INTRODUCE -> PROBE_Q1)
  2. Hint escalation ladder (NUDGE -> SCAFFOLD -> BRIDGE -> HINT_CAP)
  3. Session state survives across turns (state round-trip, interactions log)
  4. Follow-up targets student's actual misconception (REMEDIATE guidance)
  5. BKT mastery updates visible after each turn (increases on correct, drops on wrong)
"""

from __future__ import annotations

import os
import pytest

from backend.its.tutoring.unified_socratic_engine import (
    HintLevel,
    StudentState,
    TutoringState,
    UnifiedSocraticEngine,
)


@pytest.fixture(scope="module")
def engine() -> UnifiedSocraticEngine:
    bloom_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))),
        "cbse_data", "bloom_enrichment",
    )
    return UnifiedSocraticEngine(bloom_dir=bloom_dir)


TEST_NODES = [
    ("c10_sci_cbse_020", "Class 10 Science/Economics"),
    ("c10_sci_cbse_021", "Class 10 Science/Economics"),
    ("c10_sci_cbse_022", "Class 10 Science/Economics"),
    ("c11_phy_cbse_031", "Class 11 Physics"),
    ("c11_phy_cbse_032", "Class 11 Physics"),
    ("c11_pol_cbse_007_004", "Class 11 Political Science"),
    ("c11_pol_cbse_007_005", "Class 11 Political Science"),
    ("c12_bt_cbse_027", "Class 12 Biotechnology"),
    ("c12_bt_cbse_028", "Class 12 Biotechnology"),
    ("c10_hin_cbse_001", "Class 10 Hindi"),
]


class TestSocraticExperienceBar:
    """The 10-session acceptance suite asserting Socratic quality."""

    @pytest.mark.parametrize("node_id,label", TEST_NODES)
    def test_session_socratic_flow_and_bkt(self, engine: UnifiedSocraticEngine, node_id: str, label: str):
        """Multi-turn session asserting non-dumping, hint ladder, misconception and BKT."""
        # 1. Start session — must introduce, NEVER dump answers
        init_resp = engine.start_session("student_test_bar", node_id)
        assert init_resp.state == TutoringState.INTRODUCE, f"Must start at INTRODUCE, got {init_resp.state}"
        assert init_resp.content.get("type") == "introduce"
        assert "prompt" in init_resp.content
        assert "answer" not in init_resp.content or not init_resp.content["answer"], "Answer dumped on start!"

        state = StudentState(
            student_id="student_test_bar",
            current_node_id=node_id,
            current_state=TutoringState.INTRODUCE,
            mastery=0.5,
            per_node_mastery={node_id: 0.5},
        )

        # 2. Advance from INTRODUCE to PROBE_Q1
        step1 = engine.process_input(state, "ready")
        assert state.current_state == TutoringState.PROBE_Q1
        assert step1.content.get("type") == "question"
        assert step1.content.get("q_num") == 1
        assert step1.content.get("question"), "Question must not be empty"

        # 3. Hint Escalation Ladder test on Question 1
        # Hint 1 -> NUDGE
        hint1 = engine.process_input(state, "can I get a hint?")
        assert state.current_state == TutoringState.REMEDIATE
        assert hint1.content.get("type") == "hint"
        assert hint1.content.get("hint_level") == HintLevel.NUDGE.value
        assert state.hints_used == 1

        # Hint 2 -> SCAFFOLD
        hint2 = engine.process_input(state, "hint please")
        assert hint2.content.get("hint_level") == HintLevel.SCAFFOLD.value
        assert state.hints_used == 2

        # Hint 3 -> BRIDGE
        hint3 = engine.process_input(state, "hint")
        assert hint3.content.get("hint_level") == HintLevel.BRIDGE.value
        assert state.hints_used == 3

        # Hint 4 -> HINT_CAP reached
        hint4 = engine.process_input(state, "give me another hint")
        assert hint4.content.get("type") == "hint_cap_reached"

        # 4. Misconception & Remediation Targeting on deliberately wrong answer
        m_before = state.mastery
        wrong_step = engine.process_input(state, "definitely_wrong_answer_xyz_12345")
        assert state.current_state == TutoringState.REMEDIATE
        assert wrong_step.content.get("type") == "remediate"
        assert wrong_step.content.get("is_correct") is False
        assert "misconception" in wrong_step.content
        assert wrong_step.content.get("misconception"), "Misconception should be populated"

        # 5. BKT mastery updates: wrong answer drops mastery
        m_after_wrong = state.mastery
        assert m_after_wrong <= m_before, (
            f"Mastery must drop on wrong answer: before={m_before}, after={m_after_wrong}"
        )

        # 6. Correct answer progression & BKT gain
        node = engine.content_store[node_id]
        questions = node.get("diagnostic_questions", [])
        q1 = questions[0]
        correct_ans = str(q1.get("answer", ""))

        # Student recovers and gives correct answer
        correct_step = engine.process_input(state, correct_ans)
        m_after_correct = state.mastery
        assert m_after_correct > m_after_wrong, (
            f"Mastery must increase on correct answer: before={m_after_wrong}, after={m_after_correct}"
        )
        assert state.correct_count >= 1

        # 7. Session state survives across turns
        assert len(state.interactions) >= 6, "All interaction turns must be tracked"
        report = engine.get_session_report(state)
        assert report["student_id"] == "student_test_bar"
        assert report["node_id"] == node_id
        assert report["hints_used"] >= 3
        assert report["final_mastery"] == state.mastery
        assert "skill_diagnosis" in report
