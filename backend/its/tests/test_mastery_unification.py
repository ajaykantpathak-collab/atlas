"""test_mastery_unification.py -- the unified mastery + spacing contract.

Covers the three audit fixes:

  1. MASTERY UNIFICATION: the live tutor engine's mastery updates
     delegate to the diagnosis module's BKT update (per-student,
     per-concept) -- the SAME textbook-correct model the practice path
     uses -- with the bounded EMA only as a documented fallback when
     the tracer module is unavailable.
  2. PERSISTENCE: with a persist_path, the whole student model
     (mastery, mistake book, streaks) survives engine restarts, so
     /api/tutor-graph/progress is stable across restarts.
  3. REAL SPACING: the spiral service's review queue persists under
     backend/_cache/, review weeks advance from the plan start date,
     and TutorEngine's mistake book feeds the queue through
     schedule_tutor_mistake (REVIEW_GAP logic).

All deterministic and hermetic (tmp paths, no live catalog state).
"""
import asyncio
import json
import os
import sys
from datetime import date, timedelta
from pathlib import Path

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.diagnosis.knowledge_tracing import (
    AFMModel,
    KnowledgeTracingEngine,
)
from backend.its.solver.tutor import REVIEW_GAP, TutorEngine


@pytest.fixture()
def engine(tmp_path):
    cat = {
        "class": 7, "subject": "science", "chapter": 4,
        "chapter_title": "Heat",
        "worked_examples": [
            {"q": "Convert 0 C to kelvin.", "a": "273 K"},
        ],
        "concepts": [
            {"id": "x.4.1", "title": "Temperature scales",
             "formula": "K = C + 273", "question_patterns": ["p"]},
        ],
    }
    d = tmp_path / "cats"
    d.mkdir()
    json.dump(cat, open(d / "catalog_1.json", "w", encoding="utf-8"))
    eng = TutorEngine(str(d))
    eng._last_catalog_dir = str(d)
    return eng


# ---------------------------------------------------------------- #
# 1. mastery unification: BKT delegation (EMA only as fallback)
# ---------------------------------------------------------------- #

def test_mastery_matches_diagnosis_bkt(engine):
    """A correct then a wrong answer reproduce the diagnosis module's
    BKT+AFM numbers exactly (per-student, per-concept delegation)."""
    s = engine.serve("stu1")
    r1 = engine.submit("stu1", s["question_id"], "273 K")
    assert r1["outcome"] == "correct"
    r2 = engine.submit("stu1", s["question_id"], "100 K")
    assert r2["outcome"] == "wrong"

    # independent recomputation through the diagnosis tracer
    p = 0.30
    pt = AFMModel.initial_p_transit()
    p, pt = KnowledgeTracingEngine.bkt_update_offline(p, pt, True, 1, 0)
    p, pt = KnowledgeTracingEngine.bkt_update_offline(p, pt, False, 1, 1)
    assert r2["mastery"] == pytest.approx(p, abs=1e-3)   # submit rounds to 3dp
    # per-concept BKT state is kept for the next AFM update
    bkt = engine.students["stu1"]["bkt"]["x.4.1"]
    assert bkt["successes"] == 1 and bkt["failures"] == 1
    assert 0.0 < bkt["p_transit"] <= 0.30


def test_ema_fallback_when_tracer_unavailable(engine, monkeypatch):
    """With the tracer import broken, the documented EMA fallback runs
    (0.30 - 0.35 * 0.30 = 0.195 on a wrong answer) instead of crashing."""
    import backend.its.solver.tutor as tutor_mod
    monkeypatch.setattr(tutor_mod, "_Tracer", None)
    s = engine.serve("stu1")
    r = engine.submit("stu1", s["question_id"], "100 K")
    assert r["mastery"] == pytest.approx(0.195)


# ---------------------------------------------------------------- #
# 2. persistence: progress survives an engine restart
# ---------------------------------------------------------------- #

def test_persist_path_survives_restart(engine, tmp_path):
    store = str(tmp_path / "cache" / "tutor_students.json")
    eng = TutorEngine(engine._last_catalog_dir, persist_path=store)
    s = eng.serve("stu1")
    eng.submit("stu1", s["question_id"], "273 K")
    before = eng.progress("stu1")
    assert before["total_attempts"] == 1

    # "restart": a fresh engine over the same store
    eng2 = TutorEngine(engine._last_catalog_dir, persist_path=store)
    after = eng2.progress("stu1")
    assert after["total_attempts"] == before["total_attempts"]
    assert after["per_subject"] == before["per_subject"]
    assert eng2.students["stu1"]["mastery"] == \
        eng.students["stu1"]["mastery"]
    assert os.path.isfile(store)      # the JSON store really exists


def test_persisted_mastery_values_are_stable(engine, tmp_path):
    """The exact mastery floats survive the restart byte-for-byte."""
    store = str(tmp_path / "tutor_students.json")
    eng = TutorEngine(engine._last_catalog_dir, persist_path=store)
    s = eng.serve("stu1")
    eng.submit("stu1", s["question_id"], "273 K")
    m_before = eng.students["stu1"]["mastery"]["x.4.1"]
    eng2 = TutorEngine(engine._last_catalog_dir, persist_path=store)
    assert eng2.students["stu1"]["mastery"]["x.4.1"] == m_before


def test_corrupt_store_never_blocks_startup(engine, tmp_path):
    store = tmp_path / "tutor_students.json"
    store.write_text("{not json", encoding="utf-8")
    eng2 = TutorEngine(engine._last_catalog_dir, persist_path=str(store))
    assert eng2.students == {}


# ---------------------------------------------------------------- #
# 3. real spacing: persistent queue, weeks, mistake-book feed
# ---------------------------------------------------------------- #

@pytest.fixture()
def spiral_store(tmp_path, monkeypatch):
    """Point the spiral review store at a tmp file, hermetically."""
    import backend.its.tutoring.spiral_service as sp
    path = tmp_path / "spiral_review.json"
    monkeypatch.setattr(sp, "_REVIEW_STORE_PATH", str(path))
    sp._SM2_QUEUE.clear()
    sp._PLAN_STARTS.clear()
    yield sp, path
    sp._SM2_QUEUE.clear()
    sp._PLAN_STARTS.clear()


def test_schedule_tutor_mistake_uses_review_gap(spiral_store):
    sp, path = spiral_store
    sp.schedule_tutor_mistake("stu1", "x.4.1", "Convert 0 C to kelvin.",
                              "273 K")
    key = f"stu1:mistake:x.4.1"
    assert key in sp._SM2_QUEUE
    entry = sp._SM2_QUEUE[key]
    assert entry["item_type"] == "mistake_review"
    assert entry["interval_days"] == REVIEW_GAP
    due = date.fromisoformat(entry["next_review_date"])
    assert due == date.today() + timedelta(days=REVIEW_GAP)
    # the entry is on disk too (persistence, not just memory)
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    assert key in data["sm2_queue"]


def test_review_queue_persists_across_reload(spiral_store):
    sp, path = spiral_store
    sp.schedule_tutor_mistake("stu1", "x.4.1", "q?", "a?")
    sp._SM2_QUEUE.clear()                       # simulate a restart
    sp._load_review_store()
    assert "stu1:mistake:x.4.1" in sp._SM2_QUEUE


def test_tutor_mistake_book_feeds_review_queue(engine, tmp_path,
                                               spiral_store):
    """End to end: a graded wrong answer in the tutor books BOTH the
    in-engine mistake book and the spiral review queue."""
    sp, path = spiral_store
    engine.review_hook = sp.schedule_tutor_mistake
    s = engine.serve("stu1")
    engine.submit("stu1", s["question_id"], "100 K")
    assert engine.progress("stu1")["open_mistakes"] == 1
    assert "stu1:mistake:x.4.1" in sp._SM2_QUEUE
    assert os.path.isfile(path)


def test_plan_week_advances_from_start_date(spiral_store, monkeypatch):
    """Weeks advance from the persisted plan start (15 days back ->
    week 3), clamped to the plan's last written week."""
    sp, path = spiral_store
    from backend.its.tutoring.spiral_service import (
        SpiralService, SpiralQuestion)

    async def fake_load(db, subject, class_level):
        return [SpiralQuestion(week=w, day=d, topic="t",
                               question=f"q{w}_{d}?", answer="a",
                               difficulty="easy")
                for w in range(1, 9) for d in range(1, 6)]

    class _FakeProgress:
        @staticmethod
        async def get_review_queue(db, user_id):
            return []

    monkeypatch.setattr(sp, "_load_spiral_questions", fake_load)
    monkeypatch.setattr(sp, "ProgressService", _FakeProgress)

    start = date.today() - timedelta(days=15)
    sp._PLAN_STARTS["wkstu:science:7"] = start.isoformat()
    res = asyncio.run(SpiralService.get_daily_review(
        None, "wkstu", subject="science", class_level=7))
    assert res["week"] == 3                     # (15 // 7) + 1

    # clamped to the plan's last week no matter how old the start is
    sp._PLAN_STARTS["wkstu:science:7"] = (
        date.today() - timedelta(days=400)).isoformat()
    res2 = asyncio.run(SpiralService.get_daily_review(
        None, "wkstu", subject="science", class_level=7))
    assert res2["week"] == 8
