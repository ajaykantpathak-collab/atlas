"""learnpath router — the ONE composing API for the unified journey.

  GET /api/learnpath/next?subject=&limit=   → ordered actions with reasons
  GET /api/learnpath/status/{subject}       → one-glance state + milestone

Composes the existing machinery (mastery ledger, SM-2 review queue,
attempt-log remediation, corpus prereq graph, per-subject pedagogy
profiles) into a single ordering — see _cisce_build/learnpath_v2/DESIGN.md.
ADDITIVE: nothing existing changes behaviour.  Both routes authenticate via
the same ``get_current_user`` dependency as /api/feed/today — a student only
ever reads their own path.
"""

from __future__ import annotations

import logging
import re
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.services import learnpath

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/learnpath", tags=["learnpath"])


@router.get("/next")
async def learnpath_next(
    subject: Optional[str] = Query(
        None, description="Corpus subject code or friendly name (math, bio, Hindi…). "
                          "Omit for the cross-subject path."),
    limit: int = Query(6, ge=1, le=12, description="Max actions returned"),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """The ordered adaptive path: revise → remediate → learn → practice → unlock.

    Every action carries ``reason`` + ``evidence`` derived from the student's
    ledger rows, the SM-2 queue, the attempt log and the corpus prerequisite
    graph — no opaque "recommended for you"."""
    try:
        return await learnpath.next_actions(db, str(user.id), subject=subject, limit=limit)
    except Exception as exc:
        logger.warning("learnpath next failed for %s/%s: %s", user.id, subject, exc)
        raise HTTPException(status_code=503, detail="learnpath temporarily unavailable")


@router.get("/status/{subject}")
async def learnpath_status(
    subject: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """One-glance subject state: counts, phase, next milestone (+its why)."""
    try:
        return await learnpath.subject_status(db, str(user.id), subject=subject)
    except Exception as exc:
        logger.warning("learnpath status failed for %s/%s: %s", user.id, subject, exc)
        raise HTTPException(status_code=503, detail="learnpath temporarily unavailable")


# --------------------------------------------------------------------------- #
# In-chapter lesson sequences (learnpath_builder, 2026-10-05): the ordered
# prereq-respecting lesson spine for ONE chapter — generated from the
# corpus .md files into backend/_cache/learnpaths/.  Read-only, no DB.
# --------------------------------------------------------------------------- #
from backend.services.learnpath_builder import get_path as _lp_get_path
from backend.services.learnpath_builder import next_lesson as _lp_next_lesson


class ChapterNextRequest(BaseModel):
    done_node_ids: List[str] = Field(default_factory=list)


def _chapter_int(chapter: str) -> int:
    """Accept "04", "ch04", "CH4" — node ids/corpus files use the chNN
    form while the builder keys paths by int; a raw int() 500'd on chNN
    (FE-LOOP-FINISH finding, 2026-10-06)."""
    m = re.fullmatch(r"(?:ch)?(\d{1,3})", (chapter or "").strip(), re.I)
    if not m:
        raise HTTPException(status_code=422,
                            detail=f"bad chapter id: {chapter!r}")
    return int(m.group(1))


@router.get("/chapter/{cls}/{subject}/{chapter}")
async def chapter_path(cls: int, subject: str, chapter: str):
    """The ordered lesson spine for one chapter (titles only on display)."""
    path = _lp_get_path(cls, subject, _chapter_int(chapter))
    if path is None:
        raise HTTPException(
            status_code=404,
            detail="No learning path generated for this chapter")
    return path


@router.post("/chapter/{cls}/{subject}/{chapter}/next")
async def chapter_next(cls: int, subject: str, chapter: str,
                       req: ChapterNextRequest):
    """First not-done lesson whose in-chapter prereqs are done."""
    path = _lp_get_path(cls, subject, _chapter_int(chapter))
    if path is None:
        raise HTTPException(
            status_code=404,
            detail="No learning path generated for this chapter")
    lesson = _lp_next_lesson(path, set(req.done_node_ids))
    if lesson is None:
        return {"finished": True, "lesson": None}
    return {"finished": False, "lesson": lesson}
