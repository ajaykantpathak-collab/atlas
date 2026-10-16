# -*- coding: utf-8 -*-
"""Socratic seam tests (2026-10-05).

The practice submit endpoint must close the loop on a wrong answer: when
the wrong-answer detector (services/hint_ladder.detect_misconception)
NAMES a misconception family, the response carries a `socratic` payload —
{misconception_id, first_move: <payload of /socratic/start>, and the
stateless context (student_answer/question_text/correct_answer) the client
echoes back to /socratic/grade}. When nothing is detected, or anything in
the socratic path raises, the key stays None and the submit response is
completely unaffected.

Contract asserted here:
  S1  wrong + detected misconception  → socratic present, well-formed,
      elicit move quotes the student's answer, NO answer keys travel
  S2  correct answer                  → socratic absent (key is None)
  S3  wrong + undetectable answer     → socratic absent (no guessed dialogue)
  S4  socratic engine crash           → submit still returns normally,
      socratic None (fail-soft by construction)

Runs in-process against the real endpoint function in demo mode
(db=None → in-memory session store) — no Docker, no Postgres, no network,
no LLM.

Run:  cd D:\\platform\\deploy\\backend
      python -m pytest tests/test_socratic_seam.py -q
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


# ══════════════════════════════════════════════════════════════════════
# Stub selector — one deterministic algebra question whose wrong answers
# exercise the detector: "-5" is a sign flip of the key "5".
# ══════════════════════════════════════════════════════════════════════

QUESTION = {
    "question_id": "gen_linear_eq_1",
    "text": "Solve for x: 3x + 7 = 22",
    "options": ["5", "-5", "x=5", "not this"],
    "correct_answer": "5",
    "difficulty": 0.5,
    "topic": "algebra",
    "subtopic": None,
    "question_type": "numeric",
    "marks": 1,
    "explanation": "3x = 15, so x = 5.",
    "tolerance": 0.001,
    "node_id": "",
}


class StubSelector:
    """Serves the single stub question, honouring exclude ids."""

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
        if QUESTION["question_id"] not in (exclude_question_ids or set()):
            return dict(QUESTION)
        return None


async def _submit(answer: str):
    """One fresh one-question session, one submit — the isolated seam."""
    practice.QuestionSelector = StubSelector
    _MEM_SESSIONS.clear()
    res = await start_session(
        StartSessionRequest(student_id="socratic-seam-test", subject="mathematics",
                            num_questions=1, class_level=10),
        db=None, caller_sub=None,
    )
    sid = res["session_id"]
    return await submit_answer(
        sid,
        SubmitAnswerRequest(question_id=QUESTION["question_id"],
                            answer=answer, time_ms=1000),
        db=None, caller_sub=None,
    )


# ── S1: wrong + detected misconception carries the dialogue ──────────

def test_wrong_detected_misconception_carries_socratic():
    resp = asyncio.run(_submit("-5"))          # sign flip of "5"
    assert resp.is_correct is False
    assert resp.socratic is not None, (
        "a sign-flip wrong answer must carry the socratic payload")
    s = resp.socratic
    # bridged onto the authored family, not the raw detector key
    assert s["misconception_id"] == "sign_flip"
    fm = s["first_move"]
    assert fm["misconception_id"] == "sign_flip"
    assert fm["first_move_id"] == "elicit"
    moves = fm["moves"]
    assert moves, "the dialogue must never open empty"
    # elicit → isolate → retry → handoff: the full ladder is reachable
    assert [m["kind"] for m in moves][0] == "elicit"
    assert {m["kind"] for m in moves} >= {"elicit", "isolate", "retry", "handoff"}
    # the elicit quotes the student's OWN answer back
    assert "-5" in moves[0]["text"]
    # stateless grade context travels with the payload
    assert s["student_answer"] == "-5"
    assert s["question_text"] == QUESTION["text"]
    assert s["correct_answer"] == "5"
    # answer keys never leave the server (same contract as /socratic/start)
    for m in moves:
        assert "answer" not in m and "keys" not in m


# ── S2: a correct answer never carries the key ────────────────────────

def test_correct_answer_carries_no_socratic():
    resp = asyncio.run(_submit("5"))
    assert resp.is_correct is True
    assert resp.socratic is None


# ── S3: a wrong answer the detector cannot name gets NO dialogue ─────

def test_wrong_undetected_answer_omits_socratic():
    resp = asyncio.run(_submit("banana"))      # junk → deterministic wrong,
    assert resp.is_correct is False            # detector names nothing
    assert resp.socratic is None, (
        "an unnamed misconception must omit the key entirely — never a "
        "guessed dialogue")


# ── S4: a socratic crash must never break the submit ─────────────────

def test_socratic_crash_is_fail_soft(monkeypatch):
    async def _boom(*a, **k):
        raise RuntimeError("socratic engine exploded")
    monkeypatch.setattr(practice, "socratic_start", _boom)
    resp = asyncio.run(_submit("-5"))
    assert resp.is_correct is False, "the verdict itself must survive"
    assert resp.socratic is None, "a crashed seam omits the key, never raises"
    assert resp.correct_answer == "5"
    assert resp.explanation, "feedback text must still be intact"
