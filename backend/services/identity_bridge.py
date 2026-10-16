"""Identity bridge — the users ↔ students seam.

The platform has two identity systems:

- ``users`` (backend.models.user) — canonical auth identity.  JWT sub,
  role (student/parent/teacher), class_level, login state.
- ``students`` (backend.database legacy models) — the learning-record
  table the older FKs point at (homework, attempts, mastery, solver
  executions).

The bridge rule, used everywhere: ``students.id == users.id``.  Any
endpoint holding a legacy ``students`` FK that receives an auth identity
calls :func:`ensure_student_row` — the students row is created on first
use, mirroring name/class_level, so the FK holds without a data
migration.  Do not add per-endpoint copies of this logic.
"""

from __future__ import annotations

from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def ensure_student_row(db: AsyncSession, user_id: str) -> "object":
    """Return the legacy ``students`` row for an auth ``users.id``,
    creating it on first use so legacy FKs hold."""
    from backend.database import Student
    from backend.models.user import User

    sid = str(user_id)
    row = (await db.execute(
        select(Student).where(Student.id == sid)
    )).scalar_one_or_none()
    if row is not None:
        return row

    user = (await db.execute(
        select(User).where(User.id == sid)
    )).scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student {sid} not found.",
        )

    row = Student(
        id=user.id,
        name=getattr(user, "name", None) or "Student",
        student_class=(
            str(user.class_level) if getattr(user, "class_level", None) else None
        ),
    )
    db.add(row)
    await db.flush()
    return row


async def student_id_for(db: AsyncSession, user_id: str) -> str:
    """Like :func:`ensure_student_row` but returns the id string only."""
    row = await ensure_student_row(db, user_id)
    return str(row.id)


async def ensure_teacher_row(db: AsyncSession, user_id: str) -> "object":
    """Return the legacy ``teachers`` row for an auth ``users.id``,
    creating it on first use so legacy FKs hold.

    Mirrors :func:`ensure_student_row` for the teacher side: ``homework
    .teacher_id`` FKs the legacy ``teachers`` table, but signup-created
    teacher accounts used to get a users row ONLY — the teachers row
    appeared lazily on first dashboard open, so a brand-new teacher's
    first homework create died on the FK.  Provisioning here (signup +
    homework create) makes the row exist at identity creation.
    """
    from backend.database import Teacher
    from backend.models.user import User

    tid = str(user_id)
    try:
        row = (await db.execute(
            select(Teacher).where(Teacher.id == tid)
        )).scalar_one_or_none()
    except Exception:
        # legacy teachers table unavailable — degrade honestly, caller
        # proceeds and the FK (if enforced) reports the real problem
        return None
    if row is not None:
        return row

    user = (await db.execute(
        select(User).where(User.id == tid)
    )).scalar_one_or_none()

    row = Teacher(
        id=user.id if user is not None else tid,
        name=getattr(user, "name", None) or "Teacher",
        is_active=True,
    )
    db.add(row)
    await db.flush()
    return row
