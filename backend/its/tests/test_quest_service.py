"""Tests for backend.its.engagement.quest_service — the Session Composer."""

import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "..")))

from datetime import date  # noqa: E402

from backend.its.contracts import ActionType, DailyQuest  # noqa: E402
from backend.its.engagement.quest_service import ComposerDeps, QuestService  # noqa: E402

MASTERY = {  # zone-of-proximal nodes: c10_bio_003, c10_phy_005
    "c10_bio_001": 0.95,
    "c10_bio_003": 0.55,
    "c10_phy_002": 0.15,
    "c10_phy_005": 0.62,
    "c10_chem_004": 0.68,
}


def make_deps(predict_pass=None, with_sim=True, with_debate=True, boss_day=False):
    """Fake providers: no DB, no LLM — pure composition under test.

    boss_day=True  -> 2026-09-04 (Friday, ISO weekday 5)  -> boss fires
    boss_day=False -> 2026-09-05 (Saturday, ISO weekday 6) -> boss must NOT fire
    """
    day = date(2026, 9, 4) if boss_day else date(2026, 9, 5)

    def due_reviews(student_id):
        return [
            {"node_id": "c10_bio_001", "ref_id": "r1", "title": "Photosynthesis"},
            {"node_id": "c10_phy_002", "ref_id": "r2", "title": "Newton II"},
            {"node_id": "c10_chem_004", "ref_id": "r3", "title": "Acids"},
            {"node_id": "c10_bio_003", "ref_id": "r4", "title": "Respiration"},
        ]

    def node_meta(node_id):
        parts = node_id.split("_")  # e.g. c10_bio_003
        return {"subject": parts[1], "class_level": int(parts[0][1:]),
                "title": node_id}

    def generate_drill(subject, class_level, seed):
        # deterministic fake generator: seeded shape variety
        r = seed % 3
        if r == 0:
            return None  # simulates an unsupported subject gracefully
        return {
            "question": f"Drill {subject}-{class_level} seed={seed}?",
            "question_type": "mcq",
            "options": ["a", "b", "c", "d"],
            "answer": "a",
            "explanation": "because",
            "skills": [subject],
        }

    def predict_pass(question):
        # deterministic spread so the flow filter [0.70, 0.85] engages
        return 0.60 + (hash(question["question"]) % 40) / 100.0

    def sims_for_node(node_id):
        if node_id == "c10_phy_005":
            return [{"sim_id": "circuit_lab", "title": "Circuit Lab"}]
        if node_id == "c10_bio_003":
            return [{"sim_id": "cell_viewer", "title": "Cell Viewer"}]
        return []

    def debate_for_student(student_id):
        return {"debate_id": "d1", "node_id": "c10_bio_003",
                "topic": "Do plants respire at night?"} if with_debate else None

    return ComposerDeps(
        due_reviews=due_reviews,
        node_meta=node_meta,
        generate_drill=generate_drill,
        predict_pass=predict_pass,
        sims_for_node=sims_for_node if with_sim else None,
        debate_for_student=debate_for_student,
    ), day, boss_day


def svc(boss_day=False):
    deps, day, _ = make_deps(boss_day=boss_day)
    return QuestService(deps), day


def test_deterministic_same_student_same_day():
    s, day = svc()
    q1 = s.compose_daily("stu_1", MASTERY, today=day)
    q2 = s.compose_daily("stu_1", MASTERY, today=day)
    assert q1.to_dict() == q2.to_dict()


def test_varies_by_student():
    s, day = svc()
    q1 = s.compose_daily("stu_1", MASTERY, today=day)
    q2 = s.compose_daily("stu_2", MASTERY, today=day)
    assert q1.seed != q2.seed
    assert q1.to_dict() != q2.to_dict()


def test_modality_mix_at_least_three():
    s, day = svc()
    q = s.compose_daily("stu_1", MASTERY, today=day)
    kinds = {i.kind for i in q.items}
    assert len(kinds) >= 3, f"expected >=3 modalities, got {kinds}"
    assert ActionType.REVIEW in kinds
    assert ActionType.DRILL in kinds
    assert ActionType.SIM in kinds      # delight present
    assert ActionType.DEBATE in kinds   # novelty present


def test_reviews_capped_and_zpd_drills():
    s, day = svc()
    q = s.compose_daily("stu_1", MASTERY, today=day)
    reviews = [i for i in q.items if i.kind == ActionType.REVIEW]
    assert len(reviews) <= 3
    drills = [i for i in q.items if i.kind == ActionType.DRILL]
    assert drills, "expected at least one drill"
    # ZPD: drill nodes must come from the zone (0.4-0.7), not mastered/lost causes
    zone = {"c10_bio_003", "c10_phy_005", "c10_chem_004"}
    assert all(d.node_id in zone for d in drills)


def test_boss_battle_on_boss_day_only():
    s, day = svc(boss_day=True)
    q = s.compose_daily("stu_1", MASTERY, today=day)
    assert q.boss is not None
    assert q.boss.kind == ActionType.BOSS
    assert q.boss.payload["part_count"] > 0

    s2, day2 = svc(boss_day=False)  # Wednesday: not boss day
    assert day2.isoweekday() != 5
    q2 = s2.compose_daily("stu_1", MASTERY, today=day2)
    assert q2.boss is None


def test_xp_positive_and_degradation_graceful():
    deps, day, _ = make_deps(boss_day=False, with_sim=False, with_debate=False)
    deps.generate_drill = None  # even with no generators, quest composes
    q = QuestService(deps).compose_daily("stu_1", MASTERY, today=day)
    assert isinstance(q, DailyQuest)
    assert q.items, "reviews alone should still compose a quest"
    assert q.xp_total > 0


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for fn in fns:
        fn()
        print(f"PASS {fn.__name__}")
    print(f"\n{len(fns)}/{len(fns)} tests passed")
