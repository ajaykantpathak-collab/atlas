"""me_weekly.py — GET /api/me/weekly (Wave 9.8 L5, Contract B).

The weekly progress card payload::

    {gains: [{topic, from_pct, to_pct}],
     shaky: [{topic, pattern}],
     notebook_count: int}

Real data only — ``gains`` replays the mastery event log through BKT
(this week vs where the week started), ``shaky`` lists the open
struggle flags with their newest diagnosis, ``notebook_count`` counts
open mistake rows.  Empty arrays when there is nothing; nothing is
fabricated and copy never says "wrong"/"failed".
"""

from __future__ import annotations

import logging

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.services import struggle

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/me", tags=["me-weekly"])


@router.get("/weekly")
async def get_weekly(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    try:
        return await struggle.weekly_summary(db, str(user.id))
    except Exception as exc:
        logger.warning("weekly summary failed for %s: %s", user.id, exc)
        return {"gains": [], "shaky": [], "notebook_count": 0}
