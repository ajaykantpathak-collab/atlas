"""account_lifecycle.py — account deletion: soft-delete now, purge in 30d
(WS-LEGAL, DPDP erasure / app-store account-deletion requirement).

Two phases, two callers:

  soft_delete_account(db, user)
      Runs INSIDE POST /api/auth/delete-account after password re-entry.
      Immediately destroys every PII field (email -> deleted_<id>@
      deleted.local, name/phone/avatar/school/parent_email -> NULL,
      password_hash -> NULL, preferences -> NULL), sets is_active=False so
      get_current_user 403s every still-live access token, deletes all
      refresh-token rows, and stamps deleted_at + deletion_purge_at
      (now + PURGE_GRACE_DAYS).

      Retention choice (documented in the report + privacy page):
      attempt / mastery / session rows are KEPT at this point — they are
      keyed by an opaque UUID that no longer resolves to any identity, and
      keeping them preserves the integrity of aggregate stats during the
      recovery window.  They are HARD-DELETED by the purge below once the
      window closes.

  run_account_purge(session_factory, now)
      Called by the worker's daily `account_purge` job.  Hard-deletes the
      residual rows of every account whose deletion_purge_at has passed:
      learning records, parent/student links, homework, refresh tokens —
      then the mirrored students row and finally the users row.  Deletes
      are issued explicitly in dependency order (no reliance on dialect
      ON DELETE CASCADE, which sqlite ignores by default).

Tables beyond these (audit_events, consents, data_requests) live in the
SEPARATE compliance store and are anonymised by
modules/compliance/fulfilment.erase_user_data — out of scope here.
"""
from __future__ import annotations

import logging
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

log = logging.getLogger("atlas.account_lifecycle")

DELETED_EMAIL_DOMAIN = "deleted.local"
PURGE_GRACE_DAYS = 30


def anonymized_email(user_id: Any) -> str:
    return f"deleted_{user_id}@{DELETED_EMAIL_DOMAIN}"


async def soft_delete_account(db: AsyncSession, user, *,
                              now: datetime | None = None) -> dict:
    """Anonymise + deactivate the account in the caller's session.

    Caller commits.  Returns a summary dict (echoed in the API response /
    job result).  Idempotent: re-running over an already-deleted row is a
    no-op shaped like success.
    """
    from backend.services.auth_service import RefreshTokenModel

    now = now or datetime.now(timezone.utc)
    purge_at = now + timedelta(days=PURGE_GRACE_DAYS)

    # 1. Revoke every refresh token — new access tokens can never be minted.
    res = await db.execute(
        delete(RefreshTokenModel).where(RefreshTokenModel.user_id == user.id)
    )
    tokens_revoked = res.rowcount if res.rowcount is not None else 0

    # 2. Destroy PII on the users row.  Email keeps a unique, non-PII
    #    tombstone so the UNIQUE index stays satisfied and the address can
    #    be re-registered later.  password_hash -> NULL makes every future
    #    verify fail fast even beside the is_active gate.
    user.email = anonymized_email(user.id)
    user.name = None
    user.phone_number = None
    user.avatar_url = None
    user.school_name = None
    user.parent_email = None
    user.preferences = None
    user.password_hash = None
    user.is_active = False
    user.deleted_at = now
    user.deletion_purge_at = purge_at
    db.add(user)

    # 3. Mirror onto the dashboard-side students row (students.id mirrors
    #    users.id).  students.name is NOT NULL — tombstone it.
    student_anonymized = False
    try:
        from backend.database import Student
        student = await db.get(Student, user.id)
        if student is not None:
            student.name = f"Deleted student {str(user.id)[:8]}"
            student.is_active = False
            db.add(student)
            student_anonymized = True
    except Exception:
        log.warning("students row anonymize skipped for %s", user.id,
                    exc_info=True)

    await db.flush()
    return {
        "user_id": str(user.id),
        "deleted_at": now.isoformat(),
        "purge_after": purge_at.isoformat(),
        "refresh_tokens_revoked": tokens_revoked,
        "student_row_anonymized": student_anonymized,
    }


# ---------------------------------------------------------------------------
# Hard purge (worker path)
# ---------------------------------------------------------------------------

async def _purge_one(db: AsyncSession, uid) -> dict:
    """Delete every residual row for one purged account id."""
    from backend.database import (
        Attempt, Base, DiagnosticResult, Homework, HomeworkQuestion,
        HomeworkSubmission, Mastery, PracticeSession, SolverExecution,
        Student, TutorSession,
    )
    from backend.models.user import User
    from backend.services.auth_service import (
        GuestSessionModel, ParentStudentLinkModel, RefreshTokenModel,
        TeacherClassModel,
    )
    from sqlalchemy import or_, update

    # The association tables are Table objects on Base.metadata — the
    # backend.database package shim re-exports ORM classes only, so take
    # them off the metadata directly.
    practice_session_topics = Base.metadata.tables["practice_session_topics"]
    student_parents = Base.metadata.tables["student_parents"]

    counts: dict[str, int] = {}

    async def _del(stmt, label: str) -> None:
        res = await db.execute(stmt)
        counts[label] = res.rowcount or 0

    # M2M junctions first, then session-owned attempts land cleanly.
    await _del(
        delete(practice_session_topics).where(
            practice_session_topics.c.practice_session_id.in_(
                select(PracticeSession.id).where(
                    PracticeSession.student_id == uid))),
        "practice_session_topics")
    await _del(delete(student_parents).where(
        student_parents.c.student_id == uid), "student_parents")
    await _del(delete(Attempt).where(Attempt.student_id == uid), "attempts")
    await _del(delete(Mastery).where(Mastery.student_id == uid), "mastery")
    await _del(delete(PracticeSession).where(
        PracticeSession.student_id == uid), "practice_sessions")
    await _del(delete(TutorSession).where(
        TutorSession.student_id == uid), "tutor_sessions")
    await _del(delete(DiagnosticResult).where(
        DiagnosticResult.student_id == uid), "diagnostic_results")
    await _del(delete(SolverExecution).where(
        SolverExecution.student_id == uid), "solver_executions")
    await _del(delete(HomeworkSubmission).where(
        HomeworkSubmission.student_id == uid), "homework_submissions")
    # homework rows own their questions via ORM cascade — delete rows
    # explicitly so the junction stays dialect-safe.
    from backend.database import HomeworkQuestion
    await _del(
        delete(HomeworkQuestion).where(
            HomeworkQuestion.homework_id.in_(
                select(Homework.id).where(Homework.student_id == uid))),
        "homework_questions")
    await _del(delete(Homework).where(Homework.student_id == uid),
               "homework")
    await _del(delete(ParentStudentLinkModel).where(
        or_(ParentStudentLinkModel.student_id == uid,
            ParentStudentLinkModel.parent_id == uid)),
        "parent_student_links")
    await _del(delete(TeacherClassModel).where(
        TeacherClassModel.teacher_id == uid), "teacher_classes")
    await _del(delete(RefreshTokenModel).where(
        RefreshTokenModel.user_id == uid), "refresh_tokens")
    # Guest-session back-pointer is SET NULL, not a delete.
    res = await db.execute(
        update(GuestSessionModel)
        .where(GuestSessionModel.upgraded_to_user_id == uid)
        .values(upgraded_to_user_id=None))
    counts["guest_sessions_unlinked"] = res.rowcount or 0

    await _del(delete(Student).where(Student.id == uid), "students")
    await _del(delete(User).where(User.id == uid), "users")
    return counts


async def run_account_purge(*, session_factory=None, now: datetime | None = None,
                            batch_limit: int = 200) -> dict:
    """Hard-delete every account whose purge window has closed.

    Returns {"candidates": n, "purged": n, "rows": {table: total}}.
    """
    from backend.models.user import User

    if session_factory is None:
        from backend.database import AsyncSessionLocal
        session_factory = AsyncSessionLocal
    now = now or datetime.now(timezone.utc)
    totals: dict[str, int] = {}
    purged = 0

    async with session_factory() as db:
        rows = (await db.execute(
            select(User.id).where(
                User.deletion_purge_at.isnot(None),
                User.deletion_purge_at <= now,
            ).limit(batch_limit)
        )).scalars().all()

        for uid in rows:
            counts = await _purge_one(db, uid)
            purged += 1
            for k, v in counts.items():
                totals[k] = totals.get(k, 0) + (v or 0)
        await db.commit()

    log.info("account_purge: %d account(s) purged at %s — %s",
             purged, now.isoformat(), totals)
    return {
        "candidates": len(rows),
        "purged": purged,
        "rows": totals,
        "purged_ids": [str(u) for u in rows],
    }
