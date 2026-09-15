"""Tests for backend.its.contracts — the canonical ITS data shapes."""

import json
import os
import sys
from datetime import date

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from backend.its.contracts import (  # noqa: E402
    ActionType,
    AgentProposal,
    AttemptEvent,
    DailyQuest,
    HintLevel,
    MasteryBand,
    MasteryUpdate,
    Modality,
    OrchestratorDecision,
    QuestItem,
    daily_seed,
    mastery_band,
    seeded_rng,
)


def test_seeded_rng_is_deterministic():
    a = seeded_rng("stu_1", "week_42")
    b = seeded_rng("stu_1", "week_42")
    c = seeded_rng("stu_1", "week_43")
    assert [a.randint(0, 10**6) for _ in range(5)] == [b.randint(0, 10**6) for _ in range(5)]
    assert [a.randint(0, 10**6) for _ in range(5)] != [c.randint(0, 10**6) for _ in range(5)]


def test_daily_seed_stable_within_day_and_varies_by_student():
    day = date(2026, 9, 5)
    assert daily_seed("stu_1", day) == daily_seed("stu_1", day)
    assert daily_seed("stu_1", day) != daily_seed("stu_2", day)


def test_agent_proposal_roundtrip():
    p = AgentProposal(
        agent_name="scaffold_bot",
        action_type=ActionType.SCAFFOLD,
        payload={"hint_level": 2, "node_id": "c10_bio_008"},
        priority=10,
        rationale="mastery in medium band",
        constraints_checked=["max_hints_per_session"],
        effectiveness=0.72,
    )
    d = p.to_dict()
    assert d["action_type"] == "scaffold"
    p2 = AgentProposal.from_dict(json.loads(json.dumps(d)))
    assert p2 == p


def test_agent_proposal_rejects_unknown_action_and_bad_effectiveness():
    for bad in (
        dict(agent_name="x", action_type="teleport"),
        dict(agent_name="x", action_type=ActionType.TUTOR, effectiveness=1.5),
    ):
        try:
            AgentProposal(**bad)
        except ValueError:
            pass
        else:
            raise AssertionError(f"expected ValueError for {bad}")


def test_mastery_band_pcr_gating():
    assert mastery_band(0.2) is MasteryBand.LOW
    assert mastery_band(0.55) is MasteryBand.MEDIUM
    assert mastery_band(0.9) is MasteryBand.HIGH


def test_mastery_update_validates_and_carries_band():
    m = MasteryUpdate(student_id="s", node_id="n", p_known=0.55, theta=0.3,
                      p_transit=0.12, irt_pass_probability=0.71)
    d = m.to_dict()
    assert d["band"] == "medium"
    try:
        MasteryUpdate(student_id="s", node_id="n", p_known=1.4)
    except ValueError:
        pass
    else:
        raise AssertionError("p_known > 1 must raise")


def test_attempt_event_roundtrip_and_validation():
    e = AttemptEvent(
        student_id="s", node_id="n", question_id="q1", is_correct=False,
        modality=Modality.SIMULATION, step_index=3, hint_level=HintLevel.L2,
        response_ms=4200, misconception_id="mc_photosynthesis_night",
    )
    e2 = AttemptEvent.from_dict(e.to_dict())
    assert e2 == e
    try:
        AttemptEvent(student_id="s", node_id="n", question_id="q", is_correct=True, response_ms=-1)
    except ValueError:
        pass
    else:
        raise AssertionError("negative response_ms must raise")


def test_daily_quest_composition_and_validation():
    q = DailyQuest(
        student_id="stu_1", quest_date="2026-09-05", seed=daily_seed("stu_1"),
        items=[
            QuestItem(kind=ActionType.REVIEW, node_id="n1", est_minutes=3),
            QuestItem(kind=ActionType.DRILL, node_id="n2", seed=101,
                      irt_pass_probability=0.78, est_minutes=6),
            QuestItem(kind=ActionType.SIM, node_id="n3", ref_id="C10_CirculatorySim",
                      est_minutes=8),
        ],
        boss=QuestItem(kind=ActionType.BOSS, node_id="n2", seed=777, est_minutes=15),
        xp_total=120,
    )
    d = q.to_dict()
    assert d["total_minutes"] == 3 + 6 + 8 + 15
    assert json.loads(q.to_json())["items"][1]["seed"] == 101
    try:
        DailyQuest(student_id="s", quest_date="2026-09-05", items=[])
    except ValueError:
        pass
    else:
        raise AssertionError("empty quest must raise")


def test_hint_level_enum_values():
    assert [h.value for h in HintLevel] == [1, 2, 3, 4]


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    passed = 0
    for fn in fns:
        fn()
        passed += 1
        print(f"PASS {fn.__name__}")
    print(f"\n{passed}/{len(fns)} tests passed")
    sys.exit(0)
