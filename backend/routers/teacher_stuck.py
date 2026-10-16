"""teacher_stuck.py — GET /api/teacher/students/stuck (Wave 9.8 L5).

"Who's stuck" for the teacher dashboard: the roster's open
``struggle_flags``, top 20 by consecutive misses, joined to users for the
display name.  ``node_title`` is the resolved chapter title — raw node
ids never reach teacher UI either.

Scope: teacher -> teacher_classes -> class_enrollments -> struggle_flags.
The roster linkage exists in this schema, so ``teacher_scope`` is true
whenever the join applied (a teacher with no enrolled classes gets an
honest empty list, scope still true — they teach nobody yet, that's not
an error).  Role guard: ``require_role("teacher")`` — admin allowed by
convention, student/parent get 403.
"""

from __future__ import annotations

import logging

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import require_role
from backend.models.user import User
from backend.services import struggle

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/teacher/students", tags=["teacher-stuck"])


@router.get("/stuck")
async def students_stuck(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_role("teacher")),
) -> dict:
    """Top-20 roster students by consecutive misses.

    ``{teacher_scope: bool, students: [{name, node_title, misses, mode}]}``
    — empty list when nobody on the roster is struggling.
    """
    try:
        return await struggle.stuck_students(db, str(user.id))
    except Exception as exc:
        logger.warning("stuck students read failed for %s: %s", user.id, exc)
        return {"teacher_scope": False, "students": []}
