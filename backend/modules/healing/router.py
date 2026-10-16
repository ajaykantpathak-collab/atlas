#!/usr/bin/env python3
"""modules/healing/router.py — the self-healing pipeline API.

  POST /api/healing/ingest   — pull the solver miss queue into the pipeline
  GET  /api/healing/stats    — open/routed/healed counts by disposition
  GET  /api/healing/top      — the highest-occurrence open misses
  POST /api/healing/replay   — re-run one miss through the solver; a
                               VERIFIED label marks it healed
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from backend.modules.healing import pipeline
from backend.routers.auth import get_current_user

router = APIRouter(prefix="/api/healing", tags=["healing"])


class ReplayIn(BaseModel):
    qhash: str


@router.post("/ingest")
def ingest(limit: int = 500, user=Depends(get_current_user)):
    return pipeline.ingest(limit=limit)


@router.get("/stats")
def stats():
    return pipeline.stats()


@router.get("/top")
def top(limit: int = 25):
    return pipeline.top_open(limit=limit)


@router.post("/replay")
def replay(body: ReplayIn, user=Depends(get_current_user)):
    # Resolve the full record by hash — top_open() truncates question text
    # for display and replaying a truncated question is a guaranteed miss.
    item = pipeline.get_item(body.qhash)
    if item is None:
        raise HTTPException(status_code=404, detail="qhash not in queue")
    from backend.its.solver.answer_pipeline import answer
    r = answer(item["question"])
    if r.label.startswith("VERIFIED"):
        pipeline.mark_healed(body.qhash)
        return {"qhash": body.qhash, "healed": True,
                "label": r.label, "answer": r.answer}
    return {"qhash": body.qhash, "healed": False, "label": r.label,
            "refusal_reason": r.refusal_reason}

