"""guidance router — the two actionable daily digests.

  GET /api/guidance/parent/tonight     Parent "Tonight" digest (one 10-minute
                                       plan per linked child).
  GET /api/guidance/teacher/tomorrow   Teacher "Tomorrow" focus for one owned
                                       class (?class_id= required).

Scoping contract (mirrors the platform's established guards):

* parent: the parent id comes from the TOKEN, never from the URL — a parent
  token can only ever see children linked through ``parent_student_links``.
  A parent with no links gets an honest "not linked yet" payload, and a
  non-parent role gets 403 (admins may preview).
* teacher: ``class_id`` must resolve to a ``teacher_classes`` row OWNED by
  the caller (``teacher_classes.teacher_id == user.id``); anything else is
  403. Admins may read any class. Rosters come from ``class_enrollments``
  so the trap queries only ever touch enrolled students.
"""
from __future__ import annotations

import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select as sa_select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User as UserModel
from backend.services import guidance_service as gs

router = APIRouter(prefix="/api/guidance", tags=["guidance"])


def _require_parent(user: UserModel) -> None:
    """Parent-token guard: parent passes, admin may preview, others 403."""
    role = str(getattr(user, "role", "") or "").strip().lower()
    if role not in ("parent", "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Parent role required",
        )


def _require_teacher(user: UserModel) -> None:
    """Teacher-token guard (same staff set as the misconception endpoints)."""
    role = str(getattr(user, "role", "") or "").strip().lower()
    if role not in ("teacher", "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teacher or admin role required",
        )


@router.get("/parent/tonight")
async def parent_tonight(
    db: AsyncSession = Depends(get_db),
    user: UserModel = Depends(get_current_user),
) -> Any:
    """What to help with tonight — one 10-minute plan per linked child."""
    _require_parent(user)
    return await gs.parent_tonight(db, user)


@router.get("/teacher/tomorrow")
async def teacher_tomorrow(
    class_id: str = Query(..., description="teacher_classes.id of an OWNED class"),
    db: AsyncSession = Depends(get_db),
    user: UserModel = Depends(get_current_user),
) -> Any:
    """Which misconception to address tomorrow — for one owned class."""
    _require_teacher(user)

    from backend.services.auth_service import TeacherClassModel
    # (boundary: no backend.api.teacher import here — ClassEnrollmentModel
    # was unused; router cross-imports are a lint violation class)

    try:
        cid = uuid.UUID(str(class_id))
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="class_id must be a valid UUID",
        )

    class_row = (
        await db.execute(sa_select(TeacherClassModel).where(TeacherClassModel.id == cid))
    ).scalar_one_or_none()
    if class_row is None:
        # 404 (unknown class) — mirrors api/teacher.py's _get_class_or_404.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")

    # Ownership: the class must be the CALLER's.  A teacher cannot read
    # another teacher's class even though the row exists.
    if (str(getattr(user, "role", "") or "").strip().lower() != "admin"
            and str(class_row.teacher_id) != str(user.id)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized for this class",
        )

    roster = await gs._class_roster(db, str(class_row.id))
    return await gs.teacher_tomorrow(db, class_row, roster)
