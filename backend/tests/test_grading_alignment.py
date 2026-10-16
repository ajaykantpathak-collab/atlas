# -*- coding: utf-8 -*-
"""Grading-alignment integration tests (GRADING-FIX, 2026-10-04).

The #1 trust-killer: a student answers the DISPLAYED question but the
grading feedback describes a DIFFERENT question (walkthrough evidence: a
dice/probability answer got the feedback "Riya is correct, XY = 7cm" — a
triangle question; a correct sector-area 77 was marked wrong in the
checkup).

Root causes under test:
  R1  services/question_adapter.py minted the SAME fallback question_id
      (`{source}_{idx}`, idx always 0 for count=1) for every seeded
      generator question → id collisions.
  R2  api/practice.py's session question store was last-write-wins: a
      colliding selector pick OVERWROTE the content stored under an
      already-issued id, so /submit graded the answer against content the
      student never saw.  Now the store is append-only and colliding
      picks are re-keyed (`<id>#v2`, …).
  R3  services/diagnostic_service.py `_answers_match` had no
      unit-tolerant numeric fold: "77" vs bank key "77 cm²" graded wrong.

Contract asserted here (the mission test):
  start a session → answer EVERY question → for every submission
      feedback["question_id"] == the displayed question_id
  AND the verdict matches the DISPLAYED question's answer key
      (correct key → correct; wrong key → wrong).

Runs in-process against the real endpoint functions in demo mode
(db=None → in-memory session store) — no Docker, no Postgres, no network.

Run:  cd D:\\platform\\deploy\\backend
      python -m pytest tests/test_grading_alignment.py -q
"""

import os
import sys
import asyncio
from typing import Any, Optional

# Demo-mode env BEFORE backend imports: practice/db demo path never opens
# the DB, but `database.py` builds an engine at import time.
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

import backend.api.practice as practice  # noqa: E402
from backend.api.practice import (  # noqa: E402
    StartSessionRequest,
    SubmitAnswerRequest,
    start_session,
    submit_answer,
    _MEM_SESSIONS,
)
from services.question_adapter import (  # noqa: E402
    FunctionAdapter,
    normalize_question,
)


# ══════════════════════════════════════════════════════════════════════
# Stub selector — deterministic per-subject pools served through the REAL
# endpoint functions (start_session / submit_answer / grading / store).
# ══════════════════════════════════════════════════════════════════════

def _q(qid: str, text: str, answer: str, topic: str = "demo",
       options: Optional[list] = None) -> dict:
    return {
        "question_id": qid,
        "text": text,
        "options": options if options is not None else
                   [answer, "not this", "neither", "nope"],
        "correct_answer": answer,
        "difficulty": 0.5,
        "topic": topic,
        "subtopic": None,
        "question_type": "mcq",
        "marks": 1,
        "explanation": f"Worked solution for: {text}",
        "tolerance": 0.001,
        "node_id": "",
    }


POOLS: dict[str, list[dict]] = {
    "mathematics": [
        _q("gen_dice_prob_1", "A fair die is rolled once. What is the "
           "probability of getting a 6?", "1/6", "probability"),
        _q("gen_linear_eq_2", "Solve for x: 3x + 7 = 22", "5", "algebra"),
        _q("gen_sector_area_3", "Area of a sector of radius 10.5 cm and "
           "angle 80 degrees (use pi = 22/7)", "77", "mensuration"),
        _q("genTriangle_4", "In triangle ABC, XY = 7 cm. Find the perimeter "
           "if the other sides are 5 cm and 6 cm.", "18", "geometry"),
        # deep tail: the live adaptive lane keeps serving BEYOND the
        # pre-generated plan (production pools are large) — the walk below
        # asserts alignment on whatever chain the session actually serves.
        _q("gen_maths_5", "Compute 12 x 3.", "36", "arithmetic"),
        _q("gen_maths_6", "Compute 45 + 37.", "82", "arithmetic"),
        _q("gen_maths_7", "Compute 100 / 4.", "25", "arithmetic"),
        _q("gen_maths_8", "Compute 9 squared.", "81", "arithmetic"),
        _q("gen_maths_9", "Compute 15% of 200.", "30", "arithmetic"),
        _q("gen_maths_10", "Compute 7 x 8.", "56", "arithmetic"),
        _q("gen_maths_11", "Compute 144 / 12.", "12", "arithmetic"),
        _q("gen_maths_12", "Compute 2 to the power 5.", "32", "arithmetic"),
    ],
    "physics": [
        _q("gen_newton_1", "Force on 2 kg at 3 m/s^2 (Newtons)?", "6",
           "mechanics"),
        _q("gen_ohm_2", "Current through 10 ohm resistor at 20 V (A)?",
           "2", "electricity"),
        _q("gen_wave_3", "Speed of light in vacuum (10^8 m/s)?", "3",
           "optics"),
        _q("gen_heat_4", "Boiling point of water at 1 atm (Celsius)?",
           "100", "heat"),
        _q("gen_physics_5", "Value of g on Earth (m/s^2)?", "9.8",
           "mechanics"),
        _q("gen_physics_6", "Work done by 10 N over 4 m (J)?", "40",
           "mechanics"),
        _q("gen_physics_7", "Power when 60 J is used in 2 s (W)?", "30",
           "mechanics"),
        _q("gen_physics_8", "Frequency of a 2 s period wave (Hz)?", "0.5",
           "sound"),
        _q("gen_physics_9", "Charge on an electron in coulombs (magnitude, "
           "10^-19)?", "1.6", "modern_physics"),
        _q("gen_physics_10", "Number of laws of motion given by Newton?",
           "3", "mechanics"),
        _q("gen_physics_11", "Unit of resistance?", "ohm", "electricity"),
        _q("gen_physics_12", "Speed of sound in air (m/s)?", "330", "sound"),
    ],
    "biology": [
        _q("gen_cell_1", "Which organelle is the powerhouse of the cell?",
           "Mitochondria", "cell_biology"),
        _q("gen_photo_2", "Green pigment that absorbs light in plants?",
           "Chlorophyll", "ecology"),
        _q("gen_human_3", "Number of chromosomes in a human body cell?",
           "46", "genetics"),
        _q("gen_plant_4", "Which tissue transports water in plants?",
           "Xylem", "human_physiology"),
        _q("gen_bio_5", "Which blood cells fight infection?", "White blood "
           "cells", "human_physiology"),
        _q("gen_bio_6", "Site of photosynthesis in a leaf cell?", "Chloroplast",
           "ecology"),
        _q("gen_bio_7", "Which vitamin do citrus fruits provide?", "Vitamin C",
           "human_physiology"),
        _q("gen_bio_8", "Largest organ of the human body?", "Skin",
           "human_physiology"),
        _q("gen_bio_9", "Gas absorbed by plants during photosynthesis?",
           "Carbon dioxide", "ecology"),
        _q("gen_bio_10", "Basic unit of heredity?", "Gene", "genetics"),
        _q("gen_bio_11", "Which organelle controls the cell?", "Nucleus",
           "cell_biology"),
        _q("gen_bio_12", "Pigment that carries oxygen in blood?", "Haemoglobin",
           "human_physiology"),
    ],
}


class StubSelector:
    """Serves its subject pool in order, honouring exclude_question_ids
    exactly like the real selector's contract (None when exhausted)."""

    def __init__(self, db: Any = None):
        self.db = db

    async def select_next(self, session_id: str = "", student_id: str = "",
                          subject: str = "general",
                          previous_correct: Optional[bool] = None,
                          previous_difficulty: Optional[float] = None,
                          class_level: Optional[int] = None,
                          topic_ids: Optional[list] = None,
                          exclude_question_ids: Optional[set] = None,
                          ) -> Optional[dict]:
        for q in POOLS.get(subject, []):
            if q["question_id"] not in (exclude_question_ids or set()):
                return dict(q)  # copy — the API may re-key its id
        return None


class CollidingSelector(StubSelector):
    """Reproduces the FIELD DEFECT: the first pick has id `gen_prob_0`
    (the dice question); EVERY later pick carries the SAME id with
    triangle content (the adapter's seed-blind fallback id).  Pre-fix,
    the second pick overwrote the store entry so the dice answer was
    graded against the triangle."""

    async def select_next(self, session_id: str = "", student_id: str = "",
                          subject: str = "general",
                          previous_correct: Optional[bool] = None,
                          previous_difficulty: Optional[float] = None,
                          class_level: Optional[int] = None,
                          topic_ids: Optional[list] = None,
                          exclude_question_ids: Optional[set] = None,
                          ) -> Optional[dict]:
        exclude = exclude_question_ids or set()
        if "gen_prob_0" not in exclude:
            return _q("gen_prob_0", "A die is rolled once. P(six)?", "1/6",
                      "probability")
        # always colliding: same id, DIFFERENT question (triangle)
        return _q("gen_prob_0", "In triangle PQR, XY = 7cm. If YZ = 5cm and "
                  "ZX = 6cm, find PZ.", "7", "geometry")


def _install_selector(cls):
    practice.QuestionSelector = cls


def _wipe():
    _MEM_SESSIONS.clear()


async def _run_session_alignment(subject: str) -> list[str]:
    """Start a session, answer EVERY question the session serves (the
    live chain: the planned opener plus the adaptive tail) with the
    DISPLAYED question's own key; assert per-submission alignment and
    that the verdict tracks the displayed question's key."""
    res = await start_session(
        StartSessionRequest(student_id="align-test", subject=subject,
                            num_questions=4, class_level=10),
        db=None, caller_sub=None,
    )
    sid = res["session_id"]
    pool_by_id = {q["question_id"]: q for q in POOLS[subject]}
    graded: list[str] = []
    current = res["current_question"].model_dump()

    for _step in range(len(POOLS[subject]) + 1):
        qid = current["question_id"]
        seen_text = current["text"]
        # the question the student SEES must be the pool question
        pool_q = pool_by_id[qid]
        assert pool_q["text"] == seen_text

        # 1) correct key of the DISPLAYED question → must grade CORRECT
        resp = await submit_answer(
            sid,
            SubmitAnswerRequest(question_id=qid,
                                answer=str(pool_q["correct_answer"]),
                                time_ms=1000),
            db=None, caller_sub=None,
        )
        fb = resp.feedback or {}
        assert fb.get("question_id") == qid, (
            f"{subject}: feedback for {fb.get('question_id')!r} but student "
            f"answered {qid!r}")
        assert resp.is_correct is True, (
            f"{subject}: correct answer {pool_q['correct_answer']!r} for the "
            f"DISPLAYED question {qid!r} graded wrong — feedback described: "
            f"{resp.correct_answer!r} / {resp.explanation[:60]!r}")
        graded.append(qid)

        if resp.is_complete or resp.next_question is None:
            break
        current = resp.next_question.model_dump()
        assert current["question_id"] not in graded, (
            f"{subject}: selector re-issued {current['question_id']!r}")

    # the session ran its full planned length on the served chain
    assert len(graded) == 4, (
        f"{subject}: session served {len(graded)} question(s), expected 4")
    return graded


# ── the mission test: 3 subjects, full-session alignment ──────────────

def test_alignment_mathematics_full_session():
    _install_selector(StubSelector)
    _wipe()
    asyncio.run(_run_session_alignment("mathematics"))


def test_alignment_physics_full_session():
    _install_selector(StubSelector)
    _wipe()
    asyncio.run(_run_session_alignment("physics"))


def test_alignment_biology_full_session():
    _install_selector(StubSelector)
    _wipe()
    asyncio.run(_run_session_alignment("biology"))


# ── R2 regression: colliding ids must never cross-grade ───────────────

def test_colliding_ids_rekeyed_and_aligned():
    """The exact walkthrough defect: answer the dice question → the
    feedback must describe the DICE question, and the colliding triangle
    pick must arrive under a FRESH id."""
    _install_selector(CollidingSelector)
    _wipe()
    res = asyncio.run(start_session(
        StartSessionRequest(student_id="align-test", subject="mathematics",
                            num_questions=3, class_level=10),
        db=None, caller_sub=None,
    ))
    sid = res["session_id"]
    first_q = res["current_question"]
    dice_id = first_q.question_id
    assert dice_id == "gen_prob_0"
    assert "die" in first_q.text.lower()

    meta = _MEM_SESSIONS[sid]["session_meta"]
    assert meta["questions"][dice_id]["correct_answer"] == "1/6"

    # answer the DISPLAYED dice question
    resp = asyncio.run(submit_answer(
        sid,
        SubmitAnswerRequest(question_id=dice_id, answer="1/6", time_ms=500),
        db=None, caller_sub=None,
    ))
    assert (resp.feedback or {}).get("question_id") == dice_id
    assert resp.is_correct is True
    assert "die" in (resp.explanation or "").lower(), (
        "feedback describes a different question (triangle) than the "
        "displayed dice question")

    # the colliding triangle pick was RE-KEYED, not overwritten
    nq = resp.next_question
    assert nq is not None
    assert nq.question_id != dice_id, (
        "colliding pick reuses the issued id — store would be overwritten")
    assert nq.question_id.startswith(dice_id + "#v")
    assert "triangle" in nq.text.lower()

    meta = _MEM_SESSIONS[sid]["session_meta"]
    # store immutability: the issued id still holds the DICE content
    assert meta["questions"][dice_id]["correct_answer"] == "1/6"
    assert "die" in meta["questions"][dice_id]["text"].lower()

    # answer the triangle question the student now SEES (#v2 id)
    resp2 = asyncio.run(submit_answer(
        sid,
        SubmitAnswerRequest(question_id=nq.question_id, answer="7",
                            time_ms=500),
        db=None, caller_sub=None,
    ))
    assert (resp2.feedback or {}).get("question_id") == nq.question_id
    assert resp2.is_correct is True
    assert "triangle" in (resp2.explanation or "").lower()

    # grading by the CURRENT question also stays aligned (client omits
    # question_id → server grades current_question_id)
    resp3 = asyncio.run(submit_answer(
        sid,
        SubmitAnswerRequest(answer="!!wrong!!", time_ms=500),
        db=None, caller_sub=None,
    ))
    assert resp3.is_correct is False


# ── R1 regression: seeded generators get unique fallback ids ──────────

def test_adapter_fallback_id_unique_per_seed():
    def raw(seed_val: int) -> dict:
        return {"question_text": f"Dice roll variant {seed_val}?",
                "correct_answer": str(seed_val)}

    q1 = normalize_question(raw(1), "generator:demo_prob", 0, 0.5, seed=1)
    q2 = normalize_question(raw(2), "generator:demo_prob", 0, 0.5, seed=2)
    assert q1["question_id"] != q2["question_id"], (
        "two different generated questions share one id — the collision "
        "root cause is back")
    # deterministic: same seed → same id
    assert q1["question_id"] == normalize_question(
        raw(1), "generator:demo_prob", 0, 0.5, seed=1)["question_id"]
    # unseeded (static adapters) keep the stable id
    assert normalize_question(raw(1), "generator:demo_static", 0, 0.5)[
        "question_id"] == normalize_question(
        raw(1), "generator:demo_static", 0, 0.5)["question_id"]


def test_function_adapter_seeded_ids_unique():
    def gen(seed: int):
        return [{"question_text": f"Variant {seed}: 2+{seed}?",
                 "correct_answer": str(2 + seed)}]

    adapter = FunctionAdapter.wrap(gen, "demo:gen")
    assert adapter is not None
    a1 = adapter.generate(seed=1, count=1, difficulty=0.5)
    a2 = adapter.generate(seed=2, count=1, difficulty=0.5)
    assert a1 and a2
    assert a1[0]["question_id"] != a2[0]["question_id"]
    assert a1[0]["question_id"] == adapter.generate(
        seed=1, count=1, difficulty=0.5)[0]["question_id"]


# ── R3 regression: checkup numeric fold (sector-area 77) ──────────────

def _answers_match(student: str, correct: str) -> bool:
    from backend.services.diagnostic_service import DiagnosticService
    return DiagnosticService._answers_match(student, correct, "mensuration")


def test_checkup_unit_tolerant_numeric_answers():
    # the reported defect: correct sector-area answer marked wrong
    assert _answers_match("77", "77") is True
    assert _answers_match("77", "77 cm²") is True
    assert _answers_match("77", "77 cm^2") is True
    assert _answers_match("77", "77 sq cm") is True
    assert _answers_match("77", "77 square cm") is True
    assert _answers_match("77.0", "77") is True
    assert _answers_match("Rs. 1,35,000", "135000") is True
    assert _answers_match("50%", "50") is True
    assert _answers_match(" 77 ", "77.0") is True
    # genuinely different numbers stay wrong
    assert _answers_match("77", "78") is False
    assert _answers_match("7", "77") is False
    # conflicting units are never folded
    assert _answers_match("77 cm", "77 m") is False
    # prose / multi-number text never folds
    assert _answers_match("about 77 total", "77") is False


if __name__ == "__main__":
    import pytest
    raise SystemExit(pytest.main([__file__, "-q"]))
