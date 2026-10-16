"""Spaced-review API — mission warm-up + scheduling hook.

GET  /api/review/warmup   -> the 2 most-due retrievals for the student
GET  /api/review/stats    -> {tracked, due} snapshot
POST /api/review/answer   -> schedule after a warm-up answer (FE calls this
                             for warm-up beats; practice/journey submits
                             schedule internally)
"""

from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from backend.modules.review import engine
from backend.deps import get_current_user
from backend.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/api/review", tags=["spaced-review"])


class ReviewAnswer(BaseModel):
    node_id: str = Field(min_length=4, max_length=96)
    correct: bool
    subject: str = Field(default="", max_length=48)
    class_level: int = Field(default=0, ge=0, le=14)


def _student_id(user) -> str:
    return str(user.id)


@router.get("/warmup")
async def warmup(count: int = 2, class_level: int = 0,
                 user=Depends(get_current_user)):
    items = engine.due_warmup(_student_id(user), count=count,
                              class_level=class_level)
    # student-facing scrub: node ids travel as keys only, never in display text
    for it in items:
        it.pop("node", None)
    return {"items": items, "count": len(items)}


@router.get("/stats")
async def stats(user=Depends(get_current_user)):
    return engine.review_stats(_student_id(user))


@router.post("/answer")
async def answer(body: ReviewAnswer,
                 user=Depends(get_current_user)):
    engine.schedule_after_answer(_student_id(user), body.node_id,
                                 body.correct, body.subject, body.class_level)
    return {"ok": True}
