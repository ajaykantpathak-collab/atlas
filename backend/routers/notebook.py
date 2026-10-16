"""notebook.py — GET/DELETE /api/me/notebook (Wave 9.8 L5, Contract B).

The student's mistake notebook: every graded miss recorded by
``services.struggle.record_attempt``, newest-first, grouped by chapter.
Node ids never leave this router — titles resolve through the content
index (``struggle.node_title``) before the payload ships.
"""

from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.services import struggle

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/me/notebook", tags=["me-notebook"])


@router.get("")
async def get_notebook(
    limit: int = Query(100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    """The caller's own mistakes, grouped by chapter title.

    Shape: ``{count, groups:[{topic, open, resolved, items:[{id, question,
    your_answer, diagnosis, correct_path, resolved, source,
    created_at}]}]}`` — empty groups for a clean notebook, never
    fabricated rows.
    """
    try:
        return await struggle.notebook_items(db, str(user.id), limit=limit)
    except Exception as exc:
        logger.warning("notebook read failed for %s: %s", user.id, exc)
        return {"count": 0, "groups": []}


@router.delete("/{mistake_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notebook_item(
    mistake_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Response:
    """Remove one row the caller owns.

    Another student's row is a 403 — not a 404: a differential 404 would
    confirm the row exists (same rule as require_self_or_staff)."""
    outcome = await struggle.delete_mistake(db, str(user.id), mistake_id)
    if outcome == "forbidden":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="That notebook entry is not yours.",
        )
    if outcome != "deleted":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notebook entry not found.",
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
