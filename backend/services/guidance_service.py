"""guidance_service.py — the two actionable daily digests.

Owner plan: "Parents need 'what to help with tonight'; teachers need 'which
misconception to address tomorrow' — not just charts."

Both digests are computed SERVER-SIDE and DETERMINISTICALLY from data that
already exists:

  parent_tonight(db, parent)    → per linked child:
      (a) ONE topic to practice together tonight — the most-overdue SM-2
          review item (review_scheduler.due_queue), falling back to the
          weakest prereq-gated next-best topic (next_best_lesson.next_best);
      (b) ONE misconception to watch for — the child's most recent trap
          (AttemptLog) with the corpus's authored wrong-answer phrasing
          (COMMON_MISCONCEPTION) so the parent knows what to listen for;
      (c) ONE win to celebrate — a specific mastered topic (BKT mastery
          ≥ 0.85, most recently practised) or a streak milestone;
      (d) expected time — 10 minutes.

  teacher_tomorrow(db, user, class_id) → for ONE class the teacher owns:
      (a) the TOP misconception of the last 7 days (trap heatmap logic
          scoped to the class roster) with the authored question pattern
          that triggers it;
      (b) the 3 students who need it most (their specific wrong counts);
      (c) a ready 5-minute remediation opener — the corpus's authored
          ON_FAILURE steps for that node.

Honesty contract: a section with no real data is ABSENT or explicitly
flagged (has_data=False + reason). Nothing is ever fabricated; a fresh
parent/teacher gets "not enough recorded data yet", not zeros dressed up.

Display-text contract: parent-visible strings carry TITLES only — node ids
travel solely as opaque fetch-key fields (same as the /learn/<id> routes),
never inside a sentence.
"""
from __future__ import annotations

import logging
import uuid as uuid_mod
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from sqlalchemy import case as sa_case
from sqlalchemy import select as sa_select, func as sa_func, desc as sa_desc, asc as sa_asc
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.progress import MasteryRecord
from backend.models.telemetry import AttemptLog
from backend.models.user import User as UserModel

logger = logging.getLogger(__name__)

#: BKT mastery considered "mastered" (same floor as next_best_lesson).
MASTERED_FLOOR = 0.85

#: Fixed dose — the digest promises a 10-minute session, never a vague "some".
EXPECTED_MINUTES = 10

#: Streak long enough to be a specific, honest celebration.
STREAK_WIN_DAYS = 3

#: Teacher digest window (owner spec: "the last 7 days").
TEACHER_WINDOW_DAYS = 7


# --------------------------------------------------------------------------
# Corpus accessor (authored text) — injectable for deterministic tests.
# --------------------------------------------------------------------------

def _load_corpus_node(node_id: str) -> Optional[Dict[str, Any]]:
    """Best-effort authored text for a node from the in-memory corpus index.

    Returns {title, listen_for, remediation, question} or None.  Every
    failure mode (index cold, node unknown) is an honest None — never a
    placeholder sentence.  The title uses the platform's own definition-based
    derivation (_derive_title) and only when a definition actually exists —
    its node-id fallback branch would leak id-shaped text into parent-visible
    strings, so no definition means no title here.
    """
    if not node_id:
        return None
    try:
        from backend.services.enhanced_nodes import _derive_title, load_index

        node = (getattr(load_index(), "nodes", None) or {}).get(node_id)
        if not isinstance(node, dict):
            return None
        title = None
        if (node.get("definition") or "").strip():
            title = (_derive_title(node) or "").strip() or None
            if title and title.endswith("…"):
                # _derive_title hit the hard-truncate branch — re-cut at a
                # word boundary so the digest never shows a broken word.
                title = title[:-1].rstrip()
                if " " in title:
                    title = title[:title.rfind(" ")].rstrip(",;:")
        listen_for = (node.get("common_misconception") or "").strip() or None
        remediation = (node.get("on_failure") or "").strip() or None
        question = None
        diags = node.get("diagnostics") or []
        if diags and isinstance(diags[0], dict):
            question = (diags[0].get("q") or "").strip() or None
        return {
            "title": title,
            "listen_for": listen_for,
            "remediation": remediation,
            "question": question,
        }
    except Exception as exc:  # index not warm yet — honest absence
        logger.debug("guidance corpus lookup skipped for %s: %s", node_id, exc)
        return None


# --------------------------------------------------------------------------
# Parent "Tonight" digest
# --------------------------------------------------------------------------

async def _linked_children(db: AsyncSession, parent_id: str) -> List[Dict[str, Any]]:
    """Linked children (id, name, class_level, streak) in stable link order."""
    from backend.services.auth_service import ParentStudentLinkModel

    rows = (
        await db.execute(
            sa_select(
                UserModel.id,
                UserModel.name,
                UserModel.class_level,
                UserModel.streak_days,
                ParentStudentLinkModel.created_at,
            )
            .join(ParentStudentLinkModel, ParentStudentLinkModel.student_id == UserModel.id)
            .where(ParentStudentLinkModel.parent_id == parent_id)
            .where(UserModel.is_active.isnot(False))
            .order_by(sa_asc(ParentStudentLinkModel.created_at), sa_asc(UserModel.id))
        )
    ).all()
    return [
        {
            "student_id": str(r.id),
            "name": r.name,
            "class_level": r.class_level,
            "streak_days": int(r.streak_days or 0),
        }
        for r in rows
    ]


async def _pick_practice(db: AsyncSession, student_id: str) -> Optional[Dict[str, Any]]:
    """(a) ONE topic to practice tonight.

    Priority 1 — the most-overdue SM-2 review item (review due today or
    earlier; earliest due date wins, node_id breaks ties deterministically).
    Priority 2 — the weakest prereq-gated next-best topic (prerequisites
    mastered → ready; else repair-first), lowest mastery first.
    """
    from backend.services import review_scheduler as srs

    try:
        dq = await srs.due_queue(db, student_id, limit=20)
        items = dq.get("items") or []
        if items:
            best = min(items, key=lambda it: (str(it.get("due_date") or ""), str(it.get("node_id") or "")))
            overdue = int(best.get("overdue_days") or 0)
            due = str(best.get("due_date") or "")
            reason = (
                f"Review is {overdue} day{'s' if overdue != 1 else ''} overdue"
                if overdue > 0 else "Review is due today"
            )
            practice = {
                "kind": "review",
                "node_id": best.get("node_id"),
                "title": None,               # filled from the corpus below
                "reason": reason,
                "due_date": due,
                "overdue_days": overdue,
            }
            corpus = _load_corpus_node(practice["node_id"])
            if corpus:
                practice["title"] = corpus.get("title")
            if not practice["title"]:
                # honest fallback label — never a bare node id
                practice["title"] = best.get("concept_name") or "the review topic"
            return practice
    except Exception as exc:
        logger.warning("guidance review section skipped for %s: %s", student_id, exc)

    from backend.services import next_best_lesson as nbl

    try:
        # Honesty guard (D2 seam, 2026-09-30): next_best now answers for
        # EVERY student — a fresh child gets honest corpus starting points
        # (gate-free syllabus heads) instead of an empty feed.  The parent
        # digest's contract is stricter: "not enough recorded" until the
        # child has real ledger rows, so a dataless child never gets a
        # fabricated practice pick from corpus defaults.
        ledger_rows = (await db.execute(
            sa_select(sa_func.count(MasteryRecord.id))
            .where(MasteryRecord.user_id == student_id)
        )).scalar()
        if not ledger_rows:
            return None
        nb = await nbl.next_best(db, student_id, limit=10, mastery_floor=MASTERED_FLOOR)
        candidates: List[Dict[str, Any]] = []
        for kind in ("ready_to_learn", "repair_first"):
            for entry in nb.get(kind) or []:
                candidates.append((kind, entry))
        if not candidates:
            return None
        kind, entry = min(
            candidates,
            key=lambda ke: (round(float(ke[1].get("mastery") or 0.0), 3), str(ke[1].get("node_id") or "")),
        )
        practice = {
            "kind": kind,
            "node_id": entry.get("node_id"),
            "title": None,
            "reason": (
                "Weakest topic whose prerequisites are already mastered — ready to learn"
                if kind == "ready_to_learn"
                else "Prerequisites need repair before this topic clicks"
            ),
            "mastery": round(float(entry.get("mastery") or 0.0), 3),
        }
        corpus = _load_corpus_node(practice["node_id"])
        if corpus:
            practice["title"] = corpus.get("title")
        if not practice["title"]:
            practice["title"] = "the next topic"
        return practice
    except Exception as exc:
        logger.warning("guidance next-best section skipped for %s: %s", student_id, exc)
        return None


async def _pick_misconception(db: AsyncSession, student_id: str) -> Optional[Dict[str, Any]]:
    """(b) ONE misconception to watch for — the most recent tagged trap,
    with the corpus's authored wrong-answer phrasing to listen for."""
    row = (
        await db.execute(
            sa_select(
                AttemptLog.node_id,
                AttemptLog.misconception_id,
                AttemptLog.created_at,
            )
            .where(AttemptLog.student_id == student_id)
            .where(AttemptLog.misconception_id.isnot(None))
            .order_by(sa_desc(AttemptLog.created_at), sa_desc(AttemptLog.id))
            .limit(1)
        )
    ).first()
    if row is None:
        return None
    node_id, mid, seen_at = row
    corpus = _load_corpus_node(node_id) or {}
    return {
        "node_id": node_id,
        "misconception_id": mid,
        "title": corpus.get("title") or "their most recent mistake",
        "listen_for": corpus.get("listen_for"),
        "seen_at": seen_at.isoformat() if isinstance(seen_at, datetime) else str(seen_at),
    }


async def _pick_win(db: AsyncSession, student_id: str, streak_days: int) -> Optional[Dict[str, Any]]:
    """(c) ONE specific win — a mastered topic (most recently practised) or
    a streak milestone. Generic praise ("keep it up!") is never emitted."""
    from backend.models.progress import MasteryRecord

    rows = (
        await db.execute(
            sa_select(
                MasteryRecord.node_id,
                MasteryRecord.mastery_probability,
                MasteryRecord.last_attempt_at,
            )
            .where(MasteryRecord.user_id == student_id)
            .where(MasteryRecord.mastery_probability >= MASTERED_FLOOR)
            .order_by(sa_desc(MasteryRecord.last_attempt_at), sa_asc(MasteryRecord.node_id))
            .limit(5)
        )
    ).all()
    for node_id, mastery, last_at in rows:
        corpus = _load_corpus_node(node_id)
        title = (corpus or {}).get("title")
        if not title:
            continue  # a win must name the thing — an id is not a parent-facing title
        return {
            "kind": "mastered_topic",
            "node_id": node_id,
            "title": title,
            "detail": (
                f"{title} is mastered — {round(float(mastery) * 100)}% on recent practice. "
                "Ask them to teach it back to you tonight."
            ),
            "mastery": round(float(mastery), 3),
            "last_practised_at": last_at.isoformat() if isinstance(last_at, datetime) else str(last_at),
        }

    if int(streak_days or 0) >= STREAK_WIN_DAYS:
        return {
            "kind": "streak",
            "node_id": None,
            "title": f"{streak_days}-day practice streak",
            "detail": (
                f"{streak_days} days of practice in a row — celebrate the habit, "
                "then protect it with tonight's 10 minutes."
            ),
        }
    return None


async def parent_tonight(db: AsyncSession, parent: UserModel) -> Dict[str, Any]:
    """The parent "Tonight" digest for every linked child."""
    children = await _linked_children(db, str(parent.id))
    out: Dict[str, Any] = {
        "date": datetime.now(timezone.utc).date().isoformat(),
        "parent_id": str(parent.id),
        "expected_minutes": EXPECTED_MINUTES,
        "children": [],
    }
    if not children:
        out["has_data"] = False
        out["message"] = (
            "No child is linked to your account yet. Once your child's account "
            "is linked, tonight's 10-minute plan appears here."
        )
        return out

    for ch in children:
        practice = await _pick_practice(db, ch["student_id"])
        misconception = await _pick_misconception(db, ch["student_id"])
        win = await _pick_win(db, ch["student_id"], ch["streak_days"])
        has_data = practice is not None or misconception is not None or win is not None
        entry: Dict[str, Any] = {
            "student_id": ch["student_id"],
            "name": ch["name"] or "Your child",
            "class_level": ch["class_level"],
            "has_data": has_data,
            "practice": practice,
            "misconception": misconception,
            "win": win,
            "expected_minutes": EXPECTED_MINUTES,
        }
        if not has_data:
            entry["message"] = (
                "Not enough recorded learning data yet — the tonight plan appears "
                "after the first practice sessions."
            )
        out["children"].append(entry)
    out["has_data"] = any(c["has_data"] for c in out["children"])
    return out


# --------------------------------------------------------------------------
# Teacher "Tomorrow" focus
# --------------------------------------------------------------------------

async def _class_roster(db: AsyncSession, class_id: str) -> List[Dict[str, Any]]:
    """Students enrolled in the class: {student_id, name} in roll/name order.

    Two queries on purpose: ``users.id`` (GUID → CHAR(36)) and
    ``class_enrollments.student_id`` (PG_UUID) are different column types,
    so a SQL-level join only matches on PostgreSQL. Resolving ids first and
    users second keeps the digest correct on every dialect.
    """
    from backend.api.teacher import ClassEnrollmentModel

    try:
        cid = uuid_mod.UUID(str(class_id))
    except (ValueError, AttributeError, TypeError):
        return []
    rows = (
        await db.execute(
            sa_select(
                ClassEnrollmentModel.student_id,
                ClassEnrollmentModel.roll_number,
            )
            .where(ClassEnrollmentModel.class_id == cid)
        )
    ).all()
    student_ids = [r.student_id for r in rows]
    if not student_ids:
        return []
    users = (
        await db.execute(
            sa_select(UserModel.id, UserModel.name)
            .where(UserModel.id.in_(student_ids))
            .where(UserModel.is_active.isnot(False))
        )
    ).all()
    name_by_id = {r.id: (r.name or "Student") for r in users}
    roster = [
        {"student_id": str(sid), "name": name_by_id.get(sid, "Student")}
        for sid in student_ids
        if sid in name_by_id
    ]
    # stable roll/name order — re-pair with roll_number from the enrollment rows
    roll_by_id = {r.student_id: r.roll_number for r in rows}
    roster.sort(key=lambda s: (
        roll_by_id.get(uuid_mod.UUID(s["student_id"])) is None,
        roll_by_id.get(uuid_mod.UUID(s["student_id"])) or 0,
        s["name"],
        s["student_id"],
    ))
    return roster


async def _top_trap(
    db: AsyncSession, student_ids: List[str], since: datetime,
) -> Optional[Dict[str, Any]]:
    """The highest-frequency tagged trap in the window across these students.

    Ranked by WRONG answers (the burns), then total tagged hits, then the id
    pair — fully deterministic. Grouped per (misconception_id, node_id) so
    the remediation opener can be node-specific.
    """
    if not student_ids:
        return None
    is_wrong = AttemptLog.is_correct.isnot(True)
    row = (
        await db.execute(
            sa_select(
                AttemptLog.misconception_id,
                AttemptLog.node_id,
                sa_func.count(AttemptLog.id).label("hits"),
                sa_func.sum(sa_case((is_wrong, 1), else_=0)).label("wrong"),
                sa_func.count(sa_func.distinct(
                    sa_case((is_wrong, AttemptLog.student_id), else_=None),
                )).label("burned"),
            )
            .where(AttemptLog.student_id.in_(student_ids))
            .where(AttemptLog.misconception_id.isnot(None))
            .where(AttemptLog.created_at >= since)
            .group_by(AttemptLog.misconception_id, AttemptLog.node_id)
            .order_by(
                sa_desc("wrong"),
                sa_desc("hits"),
                sa_desc("burned"),
                sa_asc(AttemptLog.misconception_id),
                sa_asc(AttemptLog.node_id),
            )
            .limit(1)
        )
    ).first()
    if row is None:
        return None
    mid, node_id, hits, wrong, burned = row
    return {
        "misconception_id": mid,
        "node_id": node_id,
        "hits": int(hits or 0),
        "wrong": int(wrong or 0),
        "burned": int(burned or 0),
    }


async def teacher_tomorrow(
    db: AsyncSession, class_row: Any, roster: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """The teacher "Tomorrow" focus for ONE owned class.

    ``class_row`` is the TeacherClassModel; ``roster`` comes from the router
    (which also resolved ownership). All authored text comes from the corpus.
    """
    since = datetime.now(timezone.utc) - timedelta(days=TEACHER_WINDOW_DAYS)
    out: Dict[str, Any] = {
        "class_id": str(class_row.id),
        "class_name": class_row.class_name,
        "section": class_row.section,
        "subject": class_row.subject,
        "window_days": TEACHER_WINDOW_DAYS,
        "roster_size": len(roster),
    }

    trap = await _top_trap(db, [s["student_id"] for s in roster], since)
    if trap is None:
        out["has_data"] = False
        out["message"] = (
            "No misconception-tagged attempts from this class in the last "
            f"{TEACHER_WINDOW_DAYS} days — nothing to prioritise yet. This panel "
            "fills in as tagged diagnostic attempts are recorded."
        )
        out["focus"] = None
        return out

    corpus = _load_corpus_node(trap["node_id"]) or {}

    # names for the "needs it most" list (roster already carries them)
    name_by_id = {s["student_id"]: s["name"] for s in roster}
    wrong_rows = (
        await db.execute(
            sa_select(
                AttemptLog.student_id,
                sa_func.count(AttemptLog.id).label("wrong"),
                sa_func.max(AttemptLog.created_at).label("last_seen"),
            )
            .where(AttemptLog.student_id.in_([s["student_id"] for s in roster]))
            .where(AttemptLog.misconception_id == trap["misconception_id"])
            .where(AttemptLog.node_id == trap["node_id"])
            .where(AttemptLog.is_correct.isnot(True))
            .where(AttemptLog.created_at >= since)
            .group_by(AttemptLog.student_id)
            .order_by(sa_desc("wrong"), sa_asc(AttemptLog.student_id))
            .limit(3)
        )
    ).all()
    top_students = [
        {
            "student_id": str(r.student_id),
            "name": name_by_id.get(str(r.student_id), "Student"),
            "wrong_count": int(r.wrong or 0),
            "last_seen_at": r.last_seen.isoformat()
            if isinstance(r.last_seen, datetime) else str(r.last_seen),
        }
        for r in wrong_rows
    ]

    out["has_data"] = True
    out["focus"] = {
        "misconception_id": trap["misconception_id"],
        "node_id": trap["node_id"],
        "node_title": corpus.get("title"),
        "hits_7d": trap["hits"],
        "wrong_7d": trap["wrong"],
        "students_burned": trap["burned"],
        "question_pattern": corpus.get("question"),
        "wrong_pattern": corpus.get("listen_for"),
        "remediation_opener": corpus.get("remediation"),
        "top_students": top_students,
    }
    return out
