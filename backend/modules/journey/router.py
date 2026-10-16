#!/usr/bin/env python3
"""modules/journey/router.py — the journey API.

  GET  /api/journey/map   — every topic's journey state for a student+subject
  POST /api/journey/next  — the next action for a student+topic (creates state)
  POST /api/journey/answer — apply an answer, run the transition
  POST /api/journey/reset — reset one topic's journey

All DB access goes through engine.py's Session-based helpers: ORM entity
selects executed on a raw Connection (engine.begin()) return column
values, not entities — the map/reset endpoints used to 500 on exactly
that.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from backend.modules.journey import engine
from backend.routers.auth import get_current_user

router = APIRouter(prefix="/api/journey", tags=["journey"])


class NextIn(BaseModel):
    node_id: str = Field(..., max_length=96)
    student_id: str | None = Field(default=None, max_length=64)


class AnswerIn(BaseModel):
    node_id: str = Field(..., max_length=96)
    correct: bool
    misconception_id: str | None = Field(default=None, max_length=96)
    question_id: str | None = Field(default=None, max_length=96)
    # The served question's text — remembered so a later REMEDIATE visit
    # can build the misconception-correction payload for it.
    question_text: str | None = Field(default=None, max_length=500)
    student_id: str | None = Field(default=None, max_length=64)


def _student(user, student_id: str | None) -> str:
    return student_id or str(getattr(user, "id", ""))


@router.get("/map")
def journey_map(subject: str, user=Depends(get_current_user)):
    uid = str(getattr(user, "id", ""))
    rows = engine.list_states(uid, subject)
    return {"subject": subject, "topics": [
        {"node_id": r.node_id, "state": r.state,
         "bkt_p": round(r.bkt_p, 3),
         "streak_correct": r.streak_correct,
         "updated_at": r.updated_at.isoformat()} for r in rows]}


@router.post("/next")
def next_action(body: NextIn, user=Depends(get_current_user)):
    uid = _student(user, body.student_id)
    row = engine.get_or_create(uid, body.node_id)
    payload = None
    if row.state == "TEACH":
        payload = engine.teach_payload(body.node_id)
    elif row.state == "REMEDIATE":
        # the text of the question the student last missed (stored in the
        # journey history by /answer) drives the correction payload
        q_text = ""
        for h in reversed(row.history or []):
            if isinstance(h, dict) and h.get("q"):
                q_text = str(h["q"])
                break
        payload = engine.remediation_payload(body.node_id, q_text)
    return {"node_id": body.node_id, "state": row.state,
            "action": engine.ACTION[row.state], "bkt_p": round(row.bkt_p, 3),
            "payload": payload}


@router.post("/answer")
def answer(body: AnswerIn, user=Depends(get_current_user)):
    uid = _student(user, body.student_id)
    result = engine.record_answer(uid, body.node_id, body.correct,
                                  body.misconception_id, body.question_id,
                                  body.question_text)
    return {"node_id": body.node_id, **result}


@router.post("/reset")
def reset(body: NextIn, user=Depends(get_current_user)):
    uid = _student(user, body.student_id)
    engine.reset_topic(uid, body.node_id)
    return {"node_id": body.node_id, "state": "PROBE"}
