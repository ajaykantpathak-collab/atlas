"""struggle.py — the visible-noticing layer (Wave 9.8 L5, Contract B).

The platform already updates BKT mastery invisibly; this module makes the
noticing VISIBLE.  Two tables (migration 0004
``database/migrations/0004_struggle_notebook.sql``):

* ``student_mistakes`` — append-only mistake notebook.  One row per graded
  miss: question stem, the student's answer, the diagnosis (tutor
  error-pattern catalog when the attempt ran through one, else the verdict
  tier label), and ``correct_path`` (the worked solution when the serving
  payload carried one — may be ``{}``).
* ``struggle_flags`` — per (user, node) consecutive-miss counter:

      misses 1-2   -> mode "probe"    (watch only)
      misses 3-4   -> mode "contrast" (FE serves the worked-contrast card)
      misses >= 5  -> mode "prereq"   (interleave a prerequisite node)

  A verified success on the same (user, node) sets ``resolved_at`` on the
  open mistake rows and resets the flag — the notebook shows the streak
  closing, the mode drops back to "probe".

CALL-SIDE LAW: every caller treats ``record_attempt`` as append-only
fire-and-forget.  The function itself never raises (swallow + log), and
callers still wrap the call so a struggle-row failure can never break a
submit/attempt response.  Guests (non-UUID ids, anonymous sessions) skip
cleanly — the notebook is an authenticated-user surface only.

Data-source honesty (``weekly_summary``): ``gains`` are computed by
replaying ``mastery_event_log`` through the standard BKT posterior (the
ledger already persists every dedup'd practice observation there), NOT
from a stored history table — per-node mastery history is not otherwise
tracked.  Nodes whose only this-week evidence is a resolved mistake row
emit ``from_pct=None`` with ``kind="resolved"`` and the CURRENT
``mastery_records`` probability as ``to_pct`` — documented proxy, real
row, never fabricated.
"""

from __future__ import annotations

import asyncio
import logging
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from sqlalchemy import Column, DateTime, Integer, Text, func, select
from sqlalchemy.orm import DeclarativeBase

from backend.database import Base
from backend.db_types import GUID, JSONVariant

logger = logging.getLogger(__name__)

# Contract B thresholds.
_CONTRAST_AT = 3   # 3 consecutive misses -> worked-contrast treatment
_PREREQ_AT = 5     # 5 consecutive misses -> interleave a prerequisite node

_MODES = ("probe", "contrast", "prereq")
_VALID_SOURCES = frozenset({"practice", "practice_offline", "tutor", "exam"})

# Standard 4-parameter BKT constants — the same defaults the live stores
# use (models/progress.MasteryRecord + mastery_state + the ITS engine's
# SimpleBKT), so the replayed weekly curve tracks the served one.
_BKT_PRIOR = 0.1
_BKT_TRANSIT = 0.1
_BKT_SLIP = 0.1
_BKT_GUESS = 0.2

_WEEK = timedelta(days=7)


# ---------------------------------------------------------------------------
# Models (declared in the service module — same pattern as whatsapp_digest's
# DigestSentLog: the tables are this feature's private store)
# ---------------------------------------------------------------------------

class StudentMistake(Base):
    __tablename__ = "student_mistakes"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID(), nullable=False, index=True)
    node_id = Column(Text, nullable=True)
    board = Column(Text, nullable=True)
    class_level = Column(Integer, nullable=True)
    subject = Column(Text, nullable=True)
    question_text = Column(Text, nullable=False)
    student_answer = Column(Text, nullable=True)
    diagnosis = Column(Text, nullable=True)
    correct_path = Column(JSONVariant, nullable=True)
    source = Column(Text, nullable=False, default="practice")
    created_at = Column(DateTime(timezone=True), nullable=False)
    resolved_at = Column(DateTime(timezone=True), nullable=True)


class StruggleFlag(Base):
    __tablename__ = "struggle_flags"

    user_id = Column(GUID(), primary_key=True)
    node_id = Column(Text, primary_key=True)
    consecutive_misses = Column(Integer, nullable=False, default=0)
    mode = Column(Text, nullable=False, default="probe")
    last_miss_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), nullable=False)


# Light read-only projections of the roster tables, on a PRIVATE metadata
# registry.  They MUST NOT sit on backend.database's shared Base — the
# canonical teacher_classes/class_enrollments models (auth_service /
# api/teacher) declare the same names without extend_existing, so sharing
# the registry makes whichever imports second crash at class-declaration
# time.  A private registry compiles identical SQL for plain selects.
class _RosterBase(DeclarativeBase):
    pass


class _TeacherClass(_RosterBase):
    __tablename__ = "teacher_classes"

    id = Column(GUID(), primary_key=True)
    teacher_id = Column(GUID(), nullable=False)


class _ClassEnrollment(_RosterBase):
    __tablename__ = "class_enrollments"

    id = Column(GUID(), primary_key=True)
    class_id = Column(GUID(), nullable=False)
    student_id = Column(GUID(), nullable=False)


# ---------------------------------------------------------------------------
# Internals
# ---------------------------------------------------------------------------

def _as_uuid(value: Any) -> Optional[str]:
    """Canonical UUID string or None — guests/demo ids skip cleanly."""
    try:
        return str(uuid.UUID(str(value)))
    except (ValueError, AttributeError, TypeError):
        return None


def mode_for_misses(misses: int) -> str:
    if misses >= _PREREQ_AT:
        return "prereq"
    if misses >= _CONTRAST_AT:
        return "contrast"
    return "probe"


def node_title(node_id: Optional[str]) -> str:
    """Chapter/topic title for a corpus node id — display-safe.

    Node ids never appear in student-facing strings (owner law); when the
    index has no entry the label degrades to a generic honest phrase."""
    nid = str(node_id or "").strip()
    if not nid:
        return "this topic"
    try:
        # _derive_title derives the concept name from the definition's
        # first clause (the corpus stores no "title" field); is_weak_title
        # rejects meta fragments so a degenerate entry degrades honestly.
        from backend.services.enhanced_nodes import (
            _derive_title, is_weak_title, load_index)

        node = load_index().get(nid)
        if node:
            title = str(_derive_title(node) or "").strip()
            # sentence fragments are not topic names either ("Always
            # irrational. If r…", "If p" leak from degenerate definitions)
            if (title and not is_weak_title(title)
                    and ". " not in title and len(title) <= 80
                    and len(title) >= 8
                    # opener-words still fragment ("If x is…"), but
                    # "The French Revolution" is a real topic — keep "the "
                    and not title.lower().startswith(
                        ("if ", "a ", "an ", "is ", "let "))):
                return title
    except Exception:
        pass
    return "this topic"


async def _open_session(db: Any = None):
    """Return ``(session, owns_session)``.

    ``record_attempt`` may be called with the request's AsyncSession, but
    the fire-and-forget path creates its own — the caller's transaction
    (mid-submit) is never poisoned by a notebook-row failure.
    """
    if db is not None:
        return db, False
    from backend.database import AsyncSessionLocal

    return AsyncSessionLocal(), True


async def _get_flag(db: Any, user_id: str, node_id: str) -> Optional[StruggleFlag]:
    row = (
        await db.execute(
            select(StruggleFlag).where(
                StruggleFlag.user_id == user_id,
                StruggleFlag.node_id == node_id,
            )
        )
    ).scalar_one_or_none()
    return row


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

async def record_attempt(
    user_id: Any,
    node_id: Any,
    question_text: Optional[str] = None,
    student_answer: Optional[str] = None,
    verdict_ok: bool = False,
    diagnosis: Optional[str] = None,
    correct_path: Optional[dict] = None,
    source: str = "practice",
    *,
    board: Optional[str] = None,
    class_level: Optional[int] = None,
    subject: Optional[str] = None,
    db: Any = None,
) -> dict:
    """Append one graded attempt to the notebook + update the flag.

    NEVER raises — a struggle-row failure must not break a submit.  Returns::

        {"recorded": bool, "skipped": reason-or-None,
         "mode_before": "probe"|"contrast"|"prereq"|None,
         "mode_after":  same, "consecutive_misses": int}

    ``mode_before``/``mode_after`` let the caller attach ``struggle`` to the
    CURRENT response when the flag was already raised (the "next response
    for that node" contract) or when this very attempt raised it.
    """
    out: dict[str, Any] = {
        "recorded": False, "skipped": None,
        "mode_before": None, "mode_after": "probe",
        "consecutive_misses": 0, "misses_before": 0,
    }
    uid = _as_uuid(user_id)
    if uid is None:
        out["skipped"] = "guest-or-non-uuid"
        return out
    nid = str(node_id or "").strip()[:190]
    if not nid:
        out["skipped"] = "no-node"
        return out
    if source not in _VALID_SOURCES:
        source = "practice"

    owns = False
    try:
        db, owns = await _open_session(db)
        now = datetime.now(timezone.utc)
        # Caller-owned sessions get a SAVEPOINT (begin_nested): a flush
        # failure rolls back only our writes, and the caller's own commit
        # decides persistence.  Our own session commits outright.
        async def _mutate() -> None:
            flag = await _get_flag(db, uid, nid)
            out["mode_before"] = flag.mode if flag is not None else None
            out["misses_before"] = int(flag.consecutive_misses or 0) \
                if flag is not None else 0

            if verdict_ok:
                # Verified success on this node: close the open mistake rows
                # and reset the streak — the notebook shows the loop closing.
                rows = (
                    await db.execute(
                        select(StudentMistake).where(
                            StudentMistake.user_id == uid,
                            StudentMistake.node_id == nid,
                            StudentMistake.resolved_at.is_(None),
                        )
                    )
                ).scalars().all()
                for row in rows:
                    row.resolved_at = now
                if flag is not None:
                    flag.consecutive_misses = 0
                    flag.mode = "probe"
                    flag.updated_at = now
                out["consecutive_misses"] = 0
                out["mode_after"] = "probe"
            else:
                db.add(StudentMistake(
                    user_id=uid,
                    node_id=nid,
                    board=(str(board)[:120] if board else None),
                    class_level=int(class_level)
                    if class_level is not None else None,
                    subject=(str(subject)[:120] if subject else None),
                    question_text=str(question_text or "")[:4000]
                    or "(unrecorded)",
                    student_answer=(str(student_answer)[:1000]
                                    if student_answer is not None else None),
                    diagnosis=(str(diagnosis)[:600] if diagnosis else None),
                    correct_path=correct_path
                    if isinstance(correct_path, dict) else None,
                    source=source,
                    created_at=now,
                ))
                if flag is None:
                    flag = StruggleFlag(
                        user_id=uid, node_id=nid,
                        consecutive_misses=0, mode="probe",
                        updated_at=now,
                    )
                    db.add(flag)
                flag.consecutive_misses = int(flag.consecutive_misses or 0) + 1
                flag.mode = mode_for_misses(flag.consecutive_misses)
                flag.last_miss_at = now
                flag.updated_at = now
                out["consecutive_misses"] = flag.consecutive_misses
                out["mode_after"] = flag.mode

        if owns:
            await _mutate()
            await db.commit()
            out["recorded"] = True
        else:
            # Caller-owned session: savepoint so OUR failure can never roll
            # back the submit's own writes; the caller commits the unit.
            async with db.begin_nested():
                await _mutate()
            out["recorded"] = True
    except Exception as exc:  # swallow + log — never break a submit
        logger.warning("struggle.record_attempt failed user=%s node=%s: %s",
                       uid, nid, exc)
        out["error"] = str(exc)[:200]
        if owns:
            try:
                await db.rollback()
            except Exception:
                pass
        # caller-owned sessions already rolled back to the savepoint —
        # rolling back here would eat the SUBMIT's own writes too
    finally:
        if owns:
            try:
                await db.close()
            except Exception:
                pass
    return out


_BG_TASKS: set = set()


def record_attempt_bg(*args: Any, **kwargs: Any) -> None:
    """True fire-and-forget wrapper for SYNC call sites (the tutor engine).

    Schedules ``record_attempt`` on the running loop and holds the task so
    the GC can't reap it mid-write.  No running loop (tests, scripts,
    threads) -> silent no-op.
    """
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        return
    task = loop.create_task(record_attempt(*args, **kwargs))
    _BG_TASKS.add(task)
    task.add_done_callback(_BG_TASKS.discard)


async def current_flag(db: Any, user_id: Any, node_id: Any) -> Optional[dict]:
    """Read the current struggle flag for a (user, node) — response decor."""
    uid = _as_uuid(user_id)
    nid = str(node_id or "").strip()[:190]
    if uid is None or not nid or db is None:
        return None
    try:
        flag = await _get_flag(db, uid, nid)
        if flag is None or flag.mode not in ("contrast", "prereq"):
            return None
        return {
            "mode": flag.mode,
            "misses": int(flag.consecutive_misses or 0),
            "topic": node_title(nid),
        }
    except Exception as exc:
        logger.debug("struggle.current_flag failed: %s", exc)
        return None


async def struggle_payload(db: Any, user_id: Any, node_id: Any,
                           diagnosis: Optional[str] = None) -> Optional[dict]:
    """The ``struggle`` field a response carries when the flag is raised.

    ``{mode, diagnosis, misses, topic}`` — additive; None when probe/absent
    or when anything fails (decor must never break a serving path)."""
    flag = await current_flag(db, user_id, node_id)
    if flag is None:
        return None
    return {
        "mode": flag["mode"],
        "diagnosis": diagnosis or None,
        "misses": flag["misses"],
        "topic": flag["topic"],
    }


async def flag_for_response(user_id: Any, node_id: Any,
                            diagnosis: Optional[str] = None) -> Optional[dict]:
    """Own-session variant of ``struggle_payload`` — for response decorating
    where no request session is handy (or a replayed submit skipped the
    write but should still report a raised flag)."""
    uid = _as_uuid(user_id)
    nid = str(node_id or "").strip()[:190]
    if uid is None or not nid:
        return None
    try:
        from backend.database import AsyncSessionLocal

        async with AsyncSessionLocal() as s:
            return await struggle_payload(s, uid, nid, diagnosis)
    except Exception as exc:
        logger.debug("struggle.flag_for_response failed: %s", exc)
        return None


# ---------------------------------------------------------------------------
# Reads — notebook + weekly card + teacher stuck list
# ---------------------------------------------------------------------------

async def notebook_items(db: Any, user_id: Any, limit: int = 100) -> dict:
    """The student's mistake notebook, newest-first, grouped by node.

    Node titles are resolved through the content index — node ids never
    leave this function inside display fields.
    """
    uid = _as_uuid(user_id)
    if uid is None or db is None:
        return {"count": 0, "groups": []}
    rows = (
        await db.execute(
            select(StudentMistake)
            .where(StudentMistake.user_id == uid)
            .order_by(StudentMistake.created_at.desc())
            .limit(max(1, min(int(limit), 500)))
        )
    ).scalars().all()

    groups: dict[str, dict] = {}
    order: list[str] = []
    total = 0
    for row in rows:
        total += 1
        title = node_title(row.node_id)
        grp = groups.get(title)
        if grp is None:
            grp = {"topic": title, "open": 0, "resolved": 0, "items": []}
            groups[title] = grp
            order.append(title)
        item = {
            "id": str(row.id),
            "question": row.question_text or "",
            "your_answer": row.student_answer,
            "diagnosis": row.diagnosis,
            "correct_path": row.correct_path if isinstance(row.correct_path, dict) else {},
            "resolved": row.resolved_at is not None,
            "source": row.source,
            "created_at": row.created_at.isoformat() if row.created_at else None,
        }
        grp["items"].append(item)
        if item["resolved"]:
            grp["resolved"] += 1
        else:
            grp["open"] += 1
    return {"count": total, "groups": [groups[t] for t in order]}


async def delete_mistake(db: Any, user_id: Any, mistake_id: Any) -> str:
    """Delete one notebook row the caller owns.

    Returns "deleted" | "not_found" | "forbidden" — the router maps
    forbidden -> 403 (not 404: a differential 404 confirms the row exists)."""
    uid = _as_uuid(user_id)
    mid = _as_uuid(mistake_id)
    if uid is None or mid is None or db is None:
        return "not_found"
    row = (
        await db.execute(
            select(StudentMistake).where(StudentMistake.id == mid)
        )
    ).scalar_one_or_none()
    if row is None:
        return "not_found"
    if str(row.user_id) != uid:
        return "forbidden"
    await db.delete(row)
    await db.commit()
    return "deleted"


def _as_dt(value: Any) -> Optional[datetime]:
    """Coerce a DB timestamp to aware UTC — sqlite hands back strings."""
    if value is None:
        return None
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=timezone.utc)
    try:
        ts = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        return ts if ts.tzinfo else ts.replace(tzinfo=timezone.utc)
    except (ValueError, TypeError):
        return None


def _bkt_step(p: float, correct: bool) -> float:
    """One BKT posterior+transit step (the ledger's semantics)."""
    if correct:
        num = p * (1.0 - _BKT_SLIP)
        den = p * (1.0 - _BKT_SLIP) + (1.0 - p) * _BKT_GUESS
    else:
        num = p * _BKT_SLIP
        den = p * _BKT_SLIP + (1.0 - p) * (1.0 - _BKT_GUESS)
    post = num / max(den, 1e-10)
    return post + (1.0 - post) * _BKT_TRANSIT


async def _weekly_gains(db: Any, uid: str) -> list[dict]:
    """Per-node mastery delta: this week vs where the week started.

    Real data only — replayed from ``mastery_event_log`` (the ledger's
    persistent dedup record of every applied observation).  Nodes with a
    mistake RESOLVED this week but no logged observations get the honest
    proxy documented in the module docstring.
    """
    gains: list[dict] = []
    week_start = datetime.now(timezone.utc) - _WEEK
    covered_nodes: set[str] = set()
    try:
        from sqlalchemy import text as _text

        rows = (
            await db.execute(
                _text(
                    "SELECT node_id, is_correct, applied_at FROM mastery_event_log "
                    "WHERE student_id = :sid AND node_id IS NOT NULL "
                    "ORDER BY applied_at ASC LIMIT 20000"
                ),
                {"sid": uid},
            )
        ).all()
    except Exception as exc:
        logger.debug("weekly gains event-log read failed: %s", exc)
        rows = []

    per_node: dict[str, list[tuple[Any, bool]]] = {}
    for r in rows:
        nid = str(r[0] or "").strip()
        if not nid:
            continue
        per_node.setdefault(nid, []).append((r[2], bool(r[1])))

    for nid, events in per_node.items():
        p = _BKT_PRIOR
        p_week_start: Optional[float] = None
        touched = False
        for applied_at, ok in events:
            ts = _as_dt(applied_at)
            if p_week_start is None and ts is not None and ts >= week_start:
                p_week_start = p
                touched = True
            p = _bkt_step(p, ok)
        if not touched:
            # every event predates the window
            continue
        if p_week_start is None:
            p_week_start = _BKT_PRIOR
            touched = True
        to_pct = round(p * 100)
        from_pct = round((p_week_start if p_week_start is not None else _BKT_PRIOR) * 100)
        if touched and to_pct > from_pct:
            covered_nodes.add(nid)
            gains.append({
                "topic": node_title(nid),
                "from_pct": from_pct,
                "to_pct": to_pct,
            })

    # Proxy path (documented): a mistake RESOLVED this week is a verified
    # success on a node that was open — a real gain even when the raw
    # observation never reached the event log (e.g. tutor sources).
    try:
        resolved_rows = (
            await db.execute(
                select(StudentMistake.node_id)
                .where(
                    StudentMistake.user_id == uid,
                    StudentMistake.resolved_at.is_not(None),
                    StudentMistake.resolved_at >= week_start,
                )
            )
        ).scalars().all()
    except Exception:
        resolved_rows = []

    proxy_nodes = {str(n) for n in resolved_rows if n} - covered_nodes
    if proxy_nodes:
        try:
            from backend.models.progress import MasteryRecord

            cur = (
                await db.execute(
                    select(MasteryRecord.node_id, MasteryRecord.mastery_probability)
                    .where(
                        MasteryRecord.user_id == uid,
                        MasteryRecord.node_id.in_(sorted(proxy_nodes)),
                    )
                )
            ).all()
            cur_map = {str(n): float(p or 0.0) for n, p in cur}
        except Exception:
            cur_map = {}
        for nid in sorted(proxy_nodes):
            entry: dict[str, Any] = {"topic": node_title(nid), "kind": "resolved"}
            if nid in cur_map:
                entry["from_pct"] = None
                entry["to_pct"] = round(cur_map[nid] * 100)
            else:
                entry["from_pct"] = None
                entry["to_pct"] = None
            gains.append(entry)

    gains.sort(key=lambda g: -(
        (g.get("to_pct") or 0) - (g.get("from_pct") or 0)))
    return gains[:6]


async def weekly_summary(db: Any, user_id: Any) -> dict:
    """Contract B payload for ``GET /api/me/weekly``.

    ``{gains:[{topic, from_pct, to_pct}], shaky:[{topic, pattern}],
    notebook_count}`` — empty arrays when there is no data; nothing is
    fabricated.
    """
    uid = _as_uuid(user_id)
    empty = {"gains": [], "shaky": [], "notebook_count": 0}
    if uid is None or db is None:
        return empty

    gains = await _weekly_gains(db, uid)

    shaky: list[dict] = []
    try:
        flags = (
            await db.execute(
                select(StruggleFlag)
                .where(
                    StruggleFlag.user_id == uid,
                    StruggleFlag.consecutive_misses > 0,
                )
                .order_by(StruggleFlag.consecutive_misses.desc())
                .limit(5)
            )
        ).scalars().all()
        for flag in flags:
            # the newest open mistake on this node names the pattern
            diag = None
            try:
                diag = (
                    await db.execute(
                        select(StudentMistake.diagnosis)
                        .where(
                            StudentMistake.user_id == uid,
                            StudentMistake.node_id == flag.node_id,
                            StudentMistake.diagnosis.is_not(None),
                        )
                        .order_by(StudentMistake.created_at.desc())
                        .limit(1)
                    )
                ).scalar_one_or_none()
            except Exception:
                diag = None
            shaky.append({
                "topic": node_title(flag.node_id),
                # the card shows one line — cap the diagnosis to a headline
                "pattern": (diag[:140] + "…")
                           if diag and len(diag) > 140 else (diag or None),
                "misses": int(flag.consecutive_misses or 0),
                "mode": flag.mode,
            })
    except Exception as exc:
        logger.debug("weekly shaky read failed: %s", exc)

    try:
        notebook_count = int(
            (await db.execute(
                select(func.count(StudentMistake.id)).where(
                    StudentMistake.user_id == uid,
                    StudentMistake.resolved_at.is_(None),
                )
            )).scalar_one_or_none() or 0
        )
    except Exception:
        notebook_count = 0

    return {"gains": gains, "shaky": shaky, "notebook_count": notebook_count}


async def stuck_students(db: Any, teacher_id: Any) -> dict:
    """Roster-scoped struggle list for ``GET /api/teacher/students/stuck``.

    Teacher -> teacher_classes -> class_enrollments -> struggle_flags join
    users.  Returns top-20 by consecutive misses.  ``teacher_scope`` says
    whether the roster join actually applied (a teacher with no classes is
    still scoped — they honestly teach nobody yet — but the flag is false
    so the UI can show the honest empty state rather than an error).
    """
    uid = _as_uuid(teacher_id)
    if uid is None or db is None:
        return {"students": [], "teacher_scope": False}
    try:
        from backend.models.user import User as UserModel
    except Exception as exc:
        logger.warning("stuck_students: user model unavailable: %s", exc)
        return {"students": [], "teacher_scope": False}

    try:
        student_ids = (
            await db.execute(
                select(_ClassEnrollment.student_id)
                .join(
                    _TeacherClass,
                    _ClassEnrollment.class_id == _TeacherClass.id,
                )
                .where(_TeacherClass.teacher_id == uid)
            )
        ).scalars().all()
    except Exception as exc:
        logger.warning("stuck_students roster query failed: %s", exc)
        return {"students": [], "teacher_scope": False}

    roster = [str(s) for s in student_ids if s]
    if not roster:
        return {"students": [], "teacher_scope": True}

    try:
        rows = (
            await db.execute(
                select(
                    UserModel.name,
                    StruggleFlag.node_id,
                    StruggleFlag.consecutive_misses,
                    StruggleFlag.mode,
                )
                .join(StruggleFlag, StruggleFlag.user_id == UserModel.id)
                .where(
                    StruggleFlag.user_id.in_(roster),
                    StruggleFlag.consecutive_misses > 0,
                )
                .order_by(StruggleFlag.consecutive_misses.desc())
                .limit(20)
            )
        ).all()
    except Exception as exc:
        logger.warning("stuck_students flags query failed: %s", exc)
        return {"students": [], "teacher_scope": True}

    return {
        "teacher_scope": True,
        "students": [
            {
                "name": name or "Student",
                "node_title": node_title(nid),
                "misses": int(misses or 0),
                "mode": mode or "probe",
            }
            for name, nid, misses, mode in rows
        ],
    }


def weekly_digest_lines(summary: dict) -> list[str]:
    """Plain-language parent-digest lines from a ``weekly_summary`` payload.

    "got stronger on X (20% → 65%)" / "still working on Y" — no jargon, no
    node ids, nothing when the arrays are empty.
    """
    lines: list[str] = []
    try:
        underlined = False
        for g in (summary.get("gains") or [])[:3]:
            topic = str(g.get("topic") or "").strip()
            if not topic:
                continue
            if not underlined:
                lines.append("Is hafte ki taraqqi:")
                underlined = True
            fp, tp = g.get("from_pct"), g.get("to_pct")
            if isinstance(fp, int) and isinstance(tp, int):
                lines.append(f"  • {topic} pe strong ho gayi/gaya ({fp}% → {tp}%)")
            else:
                lines.append(f"  • {topic} ka ek mushkil sawaal solve ho gaya")
        for s in (summary.get("shaky") or [])[:2]:
            topic = str(s.get("topic") or "").strip()
            if topic:
                lines.append(f"  • {topic} pe abhi practice chal rahi hai — thoda saath dena madad karega")
    except Exception:
        return []
    return lines
