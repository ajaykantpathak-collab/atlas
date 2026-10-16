"""whatsapp_digest.py — the weekly parent digest (COLD-START brief §D).

Re-engagement loop: one WhatsApp message per linked child with the child's
REAL week — name, sessions completed, questions answered, accuracy trend,
streak, and ONE dinner question taken from the node's own authored
diagnostics.  Transport is the existing WhatsAppService (Meta/Twilio
adapters in services/whatsapp_service.py); when the provider is not
configured (or WHATSAPP_MOCK=1) the digest is COMPOSED AND LOGGED, never
half-sent — the endpoint still returns the full message so the caller
(and verification) can assert on exactly what would have gone out.

Honesty law (same as every parent surface): every number comes from a
real recorded row.  A child who did nothing this week gets a kind
"no activity recorded" digest — never zeros dressed as data, never an
invented streak.

BUILD_ORDER 2.5.4 added two more limbs to this module, both reusing the
weekly digest's exact patterns (marker-table idempotency, mock posture,
per-child loop isolation, SimpleNamespace snapshots):

  * DAILY NUDGE    (run_daily_nudges)   — a SHORT ping when a child who
    was active in the last 7 days has not practised today; anti-spam
    stop after 3 consecutive silent-day nudges (nudge_sent_log).
  * RENEWAL NOTICE (run_renewal_notices) — ONE notice per (parent,
    entitlement) whose paid plan expires within 7 days
    (renewal_notice_log); honest no-op when payments are unconfigured.
"""

from __future__ import annotations

import logging
import os
import random
from datetime import datetime, timedelta, timezone
from types import SimpleNamespace
from typing import Any, Optional

from sqlalchemy import Column, DateTime, Integer, String, desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

# Base import at module level: the DigestSentLog marker below is a real
# platform model (declared here, not in models/, because the weekly
# worker job is this module's responsibility and the marker table is
# meaningless without it).  backend.database has no service imports, so
# there is no import cycle.
from backend.database import Base

logger = logging.getLogger(__name__)

DIGEST_WINDOW_DAYS = 7


# --------------------------------------------------------------------------- #
# Data gathering — mirrors api/dashboard.py's _get_practice_activity
# semantics so the digest and the parent dashboard NEVER disagree.
# --------------------------------------------------------------------------- #

async def _week_activity(db: AsyncSession, child_id: str) -> dict[str, Any]:
    """Quiz-row activity for the last 7 days vs the 7 before them."""
    out: dict[str, Any] = {
        "answered": 0, "correct": 0,
        "answered_prev": 0, "correct_prev": 0,
        "last_active_at": None, "subjects": set(),
    }
    try:
        from backend.models.progress import ActivityLog as _AL

        since = datetime.now(timezone.utc) - timedelta(days=DIGEST_WINDOW_DAYS * 2)
        rows = (await db.execute(
            select(_AL)
            .where(
                _AL.user_id == child_id,
                _AL.activity_type == "quiz",
                _AL.created_at >= since,
            )
            .order_by(desc(_AL.created_at))
            .limit(2000)
        )).scalars().all()

        now = datetime.now(timezone.utc)
        window_start = now - timedelta(days=DIGEST_WINDOW_DAYS)
        for row in rows:
            ts = row.created_at
            if ts is None:
                continue
            if ts.tzinfo is None:
                ts = ts.replace(tzinfo=timezone.utc)
            is_correct = str(row.score or "").strip().lower() == "correct"
            if ts >= window_start:
                out["answered"] += 1
                out["correct"] += int(is_correct)
                if row.subject:
                    out["subjects"].add(str(row.subject))
                if out["last_active_at"] is None:
                    out["last_active_at"] = ts
            else:
                out["answered_prev"] += 1
                out["correct_prev"] += int(is_correct)
    except Exception as exc:
        logger.warning("digest activity read failed for %s: %s", child_id, exc)
    return out


async def _sessions_completed(db: AsyncSession, child_id: str) -> int:
    """Practice sessions COMPLETED (ended) in the window — the closest
    honest backend signal for 'missions done this week'."""
    try:
        from database import PracticeSession as _PS

        since = datetime.now(timezone.utc) - timedelta(days=DIGEST_WINDOW_DAYS)
        rows = (await db.execute(
            select(_PS.id)
            .where(
                _PS.student_id == child_id,
                _PS.ended_at >= since,
            )
        )).scalars().all()
        return len(rows)
    except Exception as exc:
        logger.warning("digest sessions read failed for %s: %s", child_id, exc)
        return 0


async def _streak(db: AsyncSession, child_row: Any) -> dict[str, Any]:
    """Classified streak — same day math as the dashboard (zeroes a lapsed
    streak instead of showing a stale counter as current)."""
    try:
        from backend.services.streak_state import classify_streak

        state = classify_streak(
            getattr(child_row, "streak_days", 0) or 0,
            getattr(child_row, "last_activity_date", None))
        return state
    except Exception as exc:
        logger.warning("digest streak read failed: %s", exc)
        return {"current_streak": 0, "state": "unknown"}


async def _dinner_question(
    db: AsyncSession,
    child_row: Any,
    subjects: set[str],
) -> Optional[dict[str, str]]:
    """ONE dinner-table question from the node's OWN authored diagnostics.

    Preference order: a node from a subject the child actually practised
    this week (class-appropriate), then any diagnostics-carrying node of
    the child's class.  Returns {question, answer, topic} or None — a
    corpus miss ships NO question rather than an invented one."""
    try:
        from backend.services.enhanced_nodes import load_index

        index = load_index()
        cls = int(getattr(child_row, "class_level", 0) or 0)

        candidates: list[dict] = []
        if cls:
            # summaries=False: full node dicts (with the authored
            # diagnostics list), not the display summaries
            for subject in list(subjects)[:3]:
                try:
                    nodes = index.by_class_subject(
                        cls, subject, summaries=False) or []
                    candidates.extend(nodes[:8])
                except Exception:
                    continue
            if not candidates:
                # class-wide fallback across the child's subjects
                for subject in index.subjects(cls)[:6]:
                    try:
                        nodes = index.by_class_subject(
                            cls, subject, summaries=False) or []
                        candidates.extend(nodes[:4])
                    except Exception:
                        continue
                random.shuffle(candidates)
                candidates = candidates[:8]

        for node in candidates:
            diags = node.get("diagnostics") or []
            with_q = [d for d in diags if (d.get("q") or "").strip()]
            if with_q:
                d = random.choice(with_q)
                return {
                    "question": str(d.get("q") or "").strip(),
                    "answer": str(d.get("a") or "").strip(),
                    "topic": str(node.get("topic") or node.get("title") or ""),
                }
    except Exception as exc:
        logger.warning("digest dinner-question failed: %s", exc)
    return None


# --------------------------------------------------------------------------- #
# Message composition
# --------------------------------------------------------------------------- #

def _accuracy(correct: int, answered: int) -> Optional[int]:
    return round(correct * 100 / answered) if answered else None


def _trend_phrase(this_acc: Optional[int], prev_acc: Optional[int]) -> str:
    if this_acc is None:
        return "No answers recorded this week yet."
    if prev_acc is None or prev_acc == 0 and this_acc == 0:
        arrow = "…"
        return f"Accuracy: {this_acc}% {arrow} (first measured week)"
    delta = this_acc - prev_acc
    if delta >= 5:
        return f"Accuracy: {this_acc}% (up from {prev_acc}% last week) 📈"
    if delta <= -5:
        return f"Accuracy: {this_acc}% (down from {prev_acc}% last week) 📉"
    return f"Accuracy: {this_acc}% (steady vs {prev_acc}% last week)"


def compose_digest(
    child_name: str,
    class_level: Optional[int],
    sessions: int,
    answered: int,
    accuracy_line: str,
    streak_days: int,
    streak_state: str,
    dinner: Optional[dict[str, str]],
    weekly_lines: Optional[list[str]] = None,
) -> str:
    """The WhatsApp message itself.  Hinglish, matching the platform's
    existing parent templates.  A quiet week gets an honest nudge — the
    numbers section simply says nothing was recorded.

    ``weekly_lines`` (Wave 9.8 L5): the struggle-layer lines — "got
    stronger on X (20% → 65%)" / "still working on Y" — appended after
    the numbers section when real rows produced them."""
    name = child_name or "Aapka bachcha"
    cls = f" (Class {class_level})" if class_level else ""
    lines = [f"📊 *{name} ka weekly digest*{cls}", ""]

    if answered or sessions:
        if sessions:
            lines.append(f"🎯 Sessions completed: {sessions}")
        lines.append(f"❓ Questions answered: {answered}")
        lines.append(f"📊 {accuracy_line}")
        if streak_state == "active_today" and streak_days > 0:
            lines.append(f"🔥 Streak: {streak_days} din — chalu hai!")
        elif streak_state == "at_risk":
            lines.append(f"🔥 Streak: {streak_days} din — aaj ek chhota practice bacha lega")
        elif streak_state == "lapsed":
            lines.append("🔥 Streak abhi break hai — kal se phir shuru, koi baat nahi")
    else:
        lines.append(
            f"Is hafte koi practice record nahi hui. "
            f"Ek chhota session ({name.split(' ')[0] if name else 'bachcha'} ke liye "
            f"10 minute) streak phir se chalu kar deta hai.")

    # L5 weekly noticing lines — plain language, real rows only.
    if weekly_lines:
        lines.append("")
        lines.extend(str(l) for l in weekly_lines if str(l).strip())

    if dinner and dinner.get("question"):
        lines.append("")
        lines.append("🍽️ *Aaj ka dinner question* "
                     + (f"({dinner['topic']})" if dinner.get("topic") else ""))
        lines.append(str(dinner["question"])[:400])
        lines.append("_Jawab WhatsApp par bhej dein — sahi jawab agle digest mein!_")

    lines.append("")
    lines.append("— Atlas 📚")
    return "\n".join(lines)


# --------------------------------------------------------------------------- #
# Build + send
# --------------------------------------------------------------------------- #

def _mock_mode() -> tuple[bool, str]:
    """Mock when explicitly asked OR when the provider has no credentials —
    a mock digest logged locally beats a real send that 401s, and beats
    silently doing nothing."""
    if os.environ.get("WHATSAPP_MOCK", "0").strip().lower() in ("1", "true", "yes"):
        return True, "WHATSAPP_MOCK=1"
    try:
        from backend.services.whatsapp_service import config as _wa_config
        _wa_config.validate()
        return False, ""
    except Exception as exc:
        return True, f"provider not configured: {exc}"


async def build_child_digest(
    db: AsyncSession,
    child_row: Any,
) -> dict[str, Any]:
    """Gather the week's real numbers for one child and compose the
    message.  Returns {child_id, child_name, message, stats}."""
    child_id = str(child_row.id)
    activity = await _week_activity(db, child_id)
    sessions = await _sessions_completed(db, child_id)
    streak = await _streak(db, child_row)

    this_acc = _accuracy(activity["correct"], activity["answered"])
    prev_acc = _accuracy(activity["correct_prev"], activity["answered_prev"])
    accuracy_line = _trend_phrase(this_acc, prev_acc)

    dinner = await _dinner_question(db, child_row, activity["subjects"])

    # Wave 9.8 L5: the noticing layer's weekly lines — "got stronger on X
    # (20% → 65%)" / "still working on Y".  Real struggle/mistake rows
    # only; absent tables or an empty week contribute nothing.
    weekly_lines: list[str] = []
    try:
        from backend.services import struggle as _struggle_svc

        _summary = await _struggle_svc.weekly_summary(db, child_id)
        weekly_lines = _struggle_svc.weekly_digest_lines(_summary)
    except Exception as exc:
        logger.debug("digest weekly lines skipped for %s: %s", child_id, exc)

    message = compose_digest(
        child_name=getattr(child_row, "name", None) or "Aapka bachcha",
        class_level=getattr(child_row, "class_level", None),
        sessions=sessions,
        answered=activity["answered"],
        accuracy_line=accuracy_line,
        streak_days=int(streak.get("current_streak", 0) or 0),
        streak_state=str(streak.get("state", "unknown")),
        dinner=dinner,
        weekly_lines=weekly_lines,
    )

    return {
        "child_id": child_id,
        "child_name": getattr(child_row, "name", None) or "",
        "message": message,
        "stats": {
            "window_days": DIGEST_WINDOW_DAYS,
            "sessions_completed": sessions,
            "questions_answered": activity["answered"],
            "accuracy_this_week_pct": this_acc,
            "accuracy_prev_week_pct": prev_acc,
            "streak_days": int(streak.get("current_streak", 0) or 0),
            "streak_state": streak.get("state"),
            "dinner_question_topic": (dinner or {}).get("topic"),
            "last_active_at": (
                activity["last_active_at"].isoformat()
                if activity.get("last_active_at") else None),
        },
    }


async def send_child_digest(
    db: AsyncSession,
    parent_row: Any,
    child_row: Any,
) -> dict[str, Any]:
    """Compose + send one child's digest to the parent's phone.

    Never raises: transport/config problems become {sent: False, mock,
    reason} WITH the composed message attached."""
    built = await build_child_digest(db, child_row)
    mock, mock_reason = _mock_mode()
    built["mock"] = mock
    built["sent"] = False

    phone = (getattr(parent_row, "phone_number", None) or "").strip()
    if not phone:
        built["reason"] = "no phone_number on the parent account"
        logger.info(
            "[digest] mock (no phone) parent=%s child=%s message:\n%s",
            parent_row.id, child_row.id, built["message"])
        return built
    if mock:
        built["reason"] = mock_reason
        logger.info(
            "[digest] mock send to %s parent=%s child=%s message:\n%s",
            phone, parent_row.id, child_row.id, built["message"])
        return built

    try:
        from backend.services.whatsapp_service import WhatsAppService
        svc = WhatsAppService()
        result = await svc.send_message(phone, built["message"])
        built["sent"] = bool(result.get("success"))
        built["reason"] = None if built["sent"] else result.get("error")
    except Exception as exc:
        logger.warning("[digest] send failed: %s", exc)
        built["sent"] = False
        built["reason"] = str(exc)[:200]
    return built


# --------------------------------------------------------------------------- #
# Weekly worker delivery — the `weekly_digest` job handler's engine
# (workers/main.py).  Same compose+send path as the parent-triggered
# endpoint, plus per-ISO-week idempotency and per-child loop isolation.
# --------------------------------------------------------------------------- #

def iso_week_tag(now: Optional[datetime] = None) -> str:
    """'2026-W40' style tag for the ISO week containing ``now`` (UTC)."""
    d = now or datetime.now(timezone.utc)
    iso = d.isocalendar()
    return f"{iso[0]}-W{iso[1]:02d}"


class DigestSentLog(Base):
    """Dedup marker: ONE row per (child, ISO week) digest delivered.

    Deliberately a TABLE, not worker-state JSON (_write_state): the
    PRIMARY KEY (child_id, iso_week) makes the never-double-send law
    atomic at the storage layer (a racing duplicate insert is rejected,
    a JSON blob has no uniqueness guarantee), it survives loss of the
    worker-state volume, and it is queryable for audit ("who got the
    W40 digest").  ``status`` distinguishes real provider sends from
    mock-mode composes — the weekly job's default posture is mock
    (WHATSAPP_MOCK=1 / no provider configured), which still counts as
    delivered for the week: the artifact exists, only the transport
    differs.
    """

    __tablename__ = "digest_sent_log"

    child_id = Column(String(64), primary_key=True)   # users.id as text
    iso_week = Column(String(16), primary_key=True)   # '2026-W40'
    sent_at = Column(DateTime(timezone=True), nullable=False,
                     server_default=func.now())       # TIMESTAMPTZ on PG
    status = Column(String(16), nullable=False, server_default="sent")

    def __repr__(self) -> str:  # pragma: no cover
        return (f"<DigestSentLog child={self.child_id} week={self.iso_week} "
                f"status={self.status}>")


async def run_weekly_digest(
    session_factory: Optional[Any] = None,
    iso_week: Optional[str] = None,
    send_fn: Optional[Any] = None,
    now: Optional[datetime] = None,
) -> dict[str, Any]:
    """Deliver the weekly digest for EVERY linked (parent, child) pair.

    Worker entry (sync wrapper lives in workers/main.py).  Injectable
    ``session_factory`` / ``send_fn`` / ``now`` exist for tests; the
    production path uses the platform AsyncSessionLocal and the real
    ``send_child_digest`` — so mock posture, phone handling and the
    honesty law are IDENTICAL to the parent-triggered endpoint.

    Guarantees:
      * idempotent per ISO week per child — digest_sent_log is the
        source of truth; re-attempts in the same week skip silently
        (counted as "skipped");
      * the marker is written only after a successful compose+send or
        mock compose — FAILED sends leave no marker, so the scheduler's
        next daily attempt retries that child;
      * loop isolation — one child failing never aborts the run.

    Returns {"iso_week", "checked", "sent", "mock", "failed", "skipped",
    "details": [{child_id, status: sent|mock|failed|skipped, reason}, ...
    capped at 20], "details_truncated"}.
    """
    now = now or datetime.now(timezone.utc)
    week = iso_week or iso_week_tag(now)

    if session_factory is None:  # lazy: keep import cost off the loop tick
        from backend.database import AsyncSessionLocal as session_factory
    if send_fn is None:
        send_fn = send_child_digest

    from backend.models.user import User as UserModel
    from backend.services.auth_service import ParentStudentLinkModel

    counts: dict[str, int] = {"checked": 0, "sent": 0, "mock": 0,
                              "failed": 0, "skipped": 0}
    details: list[dict[str, Any]] = []

    async with session_factory() as db:
        # Ensure ONLY the marker table exists — never metadata-wide
        # create_all; the shared Base carries the whole platform schema.
        def _ensure_marker(sync_conn: Any) -> None:
            DigestSentLog.__table__.create(sync_conn, checkfirst=True)

        async with db.bind.begin() as conn:
            await conn.run_sync(_ensure_marker)

        links = (await db.execute(
            select(ParentStudentLinkModel.parent_id,
                   ParentStudentLinkModel.student_id)
        )).all()

        user_by_id: dict[str, Any] = {}
        uids = {str(pid) for pid, _sid in links} | \
               {str(sid) for _pid, sid in links}
        if uids:
            rows = (await db.execute(
                select(UserModel).where(UserModel.id.in_(sorted(uids)))
            )).scalars().all()
            # SNAPSHOT to plain objects, deliberately NOT the ORM instances:
            # a sibling child's failure path rolls the session back, and a
            # rollback EXPIRES every loaded instance — the next child's
            # attribute access would then trigger a lazy refresh (IO in an
            # async context -> MissingGreenlet) and poison the whole run.
            # Loop isolation needs failure-proof plain data.
            for u in rows:
                user_by_id[str(u.id)] = SimpleNamespace(
                    id=u.id, name=u.name, phone_number=u.phone_number,
                    class_level=u.class_level, streak_days=u.streak_days,
                    last_activity_date=u.last_activity_date)

        for parent_id, student_id in links:
            counts["checked"] += 1
            child_id = str(student_id)
            try:
                already = (await db.execute(
                    select(DigestSentLog.child_id)
                    .where(DigestSentLog.child_id == child_id,
                           DigestSentLog.iso_week == week)
                    .limit(1)
                )).scalar_one_or_none()
                if already is not None:
                    counts["skipped"] += 1
                    details.append({
                        "child_id": child_id, "status": "skipped",
                        "reason": f"digest already delivered for {week}",
                    })
                    continue

                child = user_by_id.get(child_id)
                parent = user_by_id.get(str(parent_id))
                if child is None or parent is None:
                    counts["failed"] += 1
                    details.append({
                        "child_id": child_id, "status": "failed",
                        "reason": "linked user row missing",
                    })
                    continue

                built = await send_fn(db, parent, child)
                mock = bool(built.get("mock"))
                sent = bool(built.get("sent"))
                if sent and not mock:
                    counts["sent"] += 1
                    status = "sent"
                elif mock:
                    counts["mock"] += 1
                    status = "mock"
                else:
                    counts["failed"] += 1
                    status = "failed"

                if status != "failed":
                    db.add(DigestSentLog(child_id=child_id, iso_week=week,
                                         sent_at=now, status=status))
                    await db.commit()

                details.append({
                    "child_id": child_id, "status": status,
                    "reason": built.get("reason"),
                })
            except Exception as exc:
                # Loop isolation: roll this child back, keep the run alive.
                counts["failed"] += 1
                try:
                    await db.rollback()
                except Exception:
                    logger.warning("[digest] rollback after child failure "
                                   "also failed", exc_info=True)
                details.append({
                    "child_id": child_id, "status": "failed",
                    "reason": f"{type(exc).__name__}: {exc}"[:200],
                })

    summary: dict[str, Any] = {"iso_week": week, **counts,
                               "details": details[:20]}
    if len(details) > 20:
        summary["details_truncated"] = len(details) - 20
    logger.info("[digest] weekly run %s: sent=%d mock=%d failed=%d "
                "skipped=%d checked=%d", week, counts["sent"],
                counts["mock"], counts["failed"], counts["skipped"],
                counts["checked"])
    return summary


# --------------------------------------------------------------------------- #
# DAILY NUDGE limb (BUILD_ORDER 2.5.4)
#
# A SHORT re-engagement ping when a child who was active in the last 7
# days has not practised TODAY.  Dormant accounts (>7 days without
# activity) are deliberately NOT nudged — the weekly digest covers them
# and a daily ping at a dormant account is spam.  The anti-spam law:
# after NUDGE_STOP_AFTER consecutive silent-day nudges with no activity
# in between, the child is left alone until they practise again.
#
# All timestamps are UTC and the nudge "day" is the UTC day, consistent
# with the weekly digest's ISO-week tagging; the worker's heavy-window
# gate (workers/main.py) decides the actual send hour, per owner law.
# --------------------------------------------------------------------------- #

NUDGE_STOP_AFTER = 3          # consecutive silent-day nudges, then stop
NUDGE_ACTIVE_WINDOW_DAYS = 7  # eligibility: quiz activity within this many days


def nudge_date_tag(now: Optional[datetime] = None) -> str:
    """'2026-10-04' style UTC day tag for the day containing ``now``."""
    d = now or datetime.now(timezone.utc)
    return f"{d:%Y-%m-%d}"


def _as_utc(ts: Optional[datetime]) -> Optional[datetime]:
    """Treat naive timestamps as UTC (sqlite returns naive datetimes;
    Postgres TIMESTAMPTZ returns aware ones)."""
    if ts is None:
        return None
    return ts if ts.tzinfo else ts.replace(tzinfo=timezone.utc)


class NudgeSentLog(Base):
    """Dedup + anti-spam state for the daily nudge.

    ONE row per (child, UTC day) nudge — the PRIMARY KEY makes
    never-double-send-per-day atomic at the storage layer, exactly like
    DigestSentLog does for the weekly digest.

    Approach chosen (the brief allowed a marker table OR a column):
      * a marker TABLE with the streak counter ON the row (this one).
        Why: (a) the nudge subsystem owns all of its state — no widening
        of the shared, hot ``users`` table and no migration coupling;
        (b) the row is written exactly once per send, so ``silent_streak``
        needs no upsert and can never drift from the send history;
        (c) it is queryable for audit ("how many days did we ping child
        X"), same as the weekly marker; (d) it survives loss of the
        worker-state volume, like DigestSentLog.

    ``silent_streak`` = consecutive silent-day nudges INCLUDING this one.
    It is NOT derived by counting past rows — a worker outage would then
    deflate the count and a long-dormant child would get re-nudged.
    Instead the last row's value is carried forward and reset to 0 the
    moment any quiz activity is observed after that row's ``sent_at``
    (see _silent_streak).
    """

    __tablename__ = "nudge_sent_log"

    child_id = Column(String(64), primary_key=True)    # users.id as text
    nudge_date = Column(String(10), primary_key=True)  # 'YYYY-MM-DD' (UTC)
    sent_at = Column(DateTime(timezone=True), nullable=False,
                     server_default=func.now())        # TIMESTAMPTZ on PG
    status = Column(String(16), nullable=False, server_default="sent")
    silent_streak = Column(Integer, nullable=False, server_default="1")

    def __repr__(self) -> str:  # pragma: no cover
        return (f"<NudgeSentLog child={self.child_id} day={self.nudge_date} "
                f"streak={self.silent_streak} status={self.status}>")


async def _nudge_activity(db: AsyncSession, child_id: str,
                          now: datetime) -> dict[str, Any]:
    """Attempts today + any-activity-in-7d for ONE child.

    The same ActivityLog quiz rows the weekly digest and the parent
    dashboard count as 'questions answered' — one honest read per child.
    On a read failure the child reads as INACTIVE (no nudge): a broken
    read must never manufacture a reason to message someone.
    """
    out: dict[str, Any] = {
        "attempts_today": 0, "active_last7d": False, "last_active_at": None,
    }
    try:
        from backend.models.progress import ActivityLog as _AL

        since = now - timedelta(days=NUDGE_ACTIVE_WINDOW_DAYS)
        rows = (await db.execute(
            select(_AL.created_at)
            .where(
                _AL.user_id == child_id,
                _AL.activity_type == "quiz",
                _AL.created_at >= since,
            )
            .order_by(desc(_AL.created_at))  # newest first: today always in
            .limit(2000)
        )).scalars().all()

        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        stamps = [_as_utc(ts) for ts in rows if ts is not None]
        out["attempts_today"] = sum(1 for ts in stamps if ts >= today_start)
        out["active_last7d"] = bool(stamps)
        if stamps:
            out["last_active_at"] = stamps[0].isoformat()
    except Exception as exc:
        logger.warning("nudge activity read failed for %s: %s",
                       child_id, exc)
    return out


async def _silent_streak(db: AsyncSession, child_id: str) -> int:
    """Consecutive silent-day nudges currently counted for this child.

    The last marker row carries the streak; it resets to 0 the moment
    any quiz activity happened AFTER that nudge was sent (activity
    resumed -> nudging may restart).  Returns 0 when the child was never
    nudged or the state is unreadable (fail-safe: a missing marker never
    blocks a legitimate first nudge)."""
    try:
        last = (await db.execute(
            select(NudgeSentLog)
            .where(NudgeSentLog.child_id == child_id)
            .order_by(desc(NudgeSentLog.nudge_date))  # 'YYYY-MM-DD' sorts
            .limit(1)
        )).scalar_one_or_none()
        if last is None:
            return 0
        sent_at = _as_utc(last.sent_at)
        if sent_at is None:
            return int(last.silent_streak or 0)
        from backend.models.progress import ActivityLog as _AL

        resumed = (await db.execute(
            select(_AL.id)
            .where(
                _AL.user_id == child_id,
                _AL.activity_type == "quiz",
                _AL.created_at > sent_at,
            )
            .limit(1)
        )).scalar_one_or_none()
        if resumed is not None:
            return 0  # activity resumed since the last nudge
        return int(last.silent_streak or 0)
    except Exception as exc:
        logger.warning("nudge streak read failed for %s: %s", child_id, exc)
        return 0


def compose_nudge(
    child_name: str,
    streak_days: int,
    streak_state: str,
) -> str:
    """The short daily nudge.  Hinglish, same voice as compose_digest.

    Only real numbers: the streak line appears ONLY when the classified
    streak says it is at risk today (``at_risk`` — practised yesterday,
    one session today keeps it alive).  A lapsed or unknown streak is
    never shown as alive."""
    name = (child_name or "Aapka bachcha").strip() or "Aapka bachcha"
    first = name.split(" ")[0] or "bachche"
    lines = [f"🌱 *{name}* — aaj koi practice record nahi hui", ""]
    if streak_state == "at_risk" and streak_days > 0:
        lines.append(f"🔥 Streak: {streak_days} din — aaj ka chhota session "
                     "bacha lega!")
        lines.append("")
    lines.append(f"Ek chhota session ({first} ke liye 10 minute) din ban "
                 "jata hai — shaam ko try karein.")
    lines.append("")
    lines.append("— Atlas 📚")
    return "\n".join(lines)


async def _deliver_message(
    tag: str,
    phone: str,
    who: str,
    message: str,
) -> dict[str, Any]:
    """Transport tail shared by the nudge/renewal senders — mock posture
    IDENTICAL to send_child_digest (WHATSAPP_MOCK=1 or an unconfigured
    provider composes + LOGS, sends nothing).  Returns {sent, mock,
    reason}; never raises."""
    mock, mock_reason = _mock_mode()
    if mock:
        logger.info("[%s] mock send to %s %s message:\n%s",
                    tag, phone, who, message)
        return {"sent": False, "mock": True, "reason": mock_reason}
    try:
        from backend.services.whatsapp_service import WhatsAppService
        svc = WhatsAppService()
        result = await svc.send_message(phone, message)
        sent = bool(result.get("success"))
        return {"sent": sent, "mock": False,
                "reason": None if sent else result.get("error")}
    except Exception as exc:
        logger.warning("[%s] send failed: %s", tag, exc)
        return {"sent": False, "mock": False, "reason": str(exc)[:200]}


async def send_child_nudge(
    db: AsyncSession,
    parent_row: Any,
    child_row: Any,
    activity: dict[str, Any],
) -> dict[str, Any]:
    """Compose + send one child's daily nudge to the parent's phone.

    ``activity`` is the eligibility snapshot the run loop already
    measured (attempts today, 7-day activity, silent streak) — the nudge
    NEVER re-queries what the loop knows, so one honest read per child
    per day.  Never raises: transport/config problems become {sent:
    False, mock, reason} WITH the composed message attached."""
    streak = await _streak(db, child_row)
    streak_days = int(streak.get("current_streak", 0) or 0)
    streak_state = str(streak.get("state", "unknown"))
    child_name = getattr(child_row, "name", None) or "Aapka bachcha"
    message = compose_nudge(
        child_name=child_name,
        streak_days=streak_days,
        streak_state=streak_state,
    )
    built: dict[str, Any] = {
        "child_id": str(child_row.id),
        "child_name": child_name,
        "message": message,
        "stats": {
            "attempts_today": int(activity.get("attempts_today", 0) or 0),
            "active_last7d": bool(activity.get("active_last7d")),
            "silent_streak": int(activity.get("silent_streak", 0) or 0),
            "last_active_at": activity.get("last_active_at"),
            "streak_days": streak_days,
            "streak_state": streak_state,
        },
        "mock": False,
        "sent": False,
    }

    phone = (getattr(parent_row, "phone_number", None) or "").strip()
    if not phone:
        built["reason"] = "no phone_number on the parent account"
        logger.info("[nudge] mock (no phone) parent=%s child=%s message:\n%s",
                    parent_row.id, child_row.id, built["message"])
        return built

    built.update(await _deliver_message(
        "nudge", phone, f"parent={parent_row.id} child={child_row.id}",
        built["message"]))
    return built


async def run_daily_nudges(
    session_factory: Optional[Any] = None,
    send_fn: Optional[Any] = None,
    now: Optional[datetime] = None,
) -> dict[str, Any]:
    """Deliver TODAY'S nudge for every linked (parent, child) pair.

    Worker entry (sync wrapper lives in workers/main.py).  Same shape as
    run_weekly_digest: injectable ``session_factory`` / ``send_fn`` /
    ``now`` exist for tests (the fake send_fn signature is ``(db,
    parent, child, activity)``); the production path uses the platform
    AsyncSessionLocal and the real send_child_nudge — so mock posture,
    phone handling and the honesty law are identical.

    Decision per child, in order:
      1. marker for today exists            -> skipped (idempotent per UTC day)
      2. quiz attempts today > 0            -> active_today (nothing to nudge)
      3. no quiz activity in the last 7d    -> not_eligible (dormant accounts
         are NOT nudged daily — that's spam; the weekly digest covers them)
      4. silent_streak >= NUDGE_STOP_AFTER  -> stopped (3 consecutive
         silent-day nudges already went out; stop until activity resumes)
      5. else compose + send (real or mock) -> marker written with
         silent_streak = streak + 1

    Guarantees: the marker is written only after a successful compose+send
    or mock compose (FAILED sends leave no marker, so the next day's
    attempt retries); per-child loop isolation (one child failing never
    aborts the run); every number in a nudge comes from a real DB row.

    Returns {"nudge_date", checked, sent, mock, failed, skipped,
    active_today, not_eligible, stopped, details [capped at 20],
    details_truncated?}.
    """
    now = now or datetime.now(timezone.utc)
    today = nudge_date_tag(now)

    if session_factory is None:  # lazy: keep import cost off the loop tick
        from backend.database import AsyncSessionLocal as session_factory
    if send_fn is None:
        send_fn = send_child_nudge

    from backend.models.user import User as UserModel
    from backend.services.auth_service import ParentStudentLinkModel

    counts: dict[str, int] = {"checked": 0, "sent": 0, "mock": 0,
                              "failed": 0, "skipped": 0,
                              "active_today": 0, "not_eligible": 0,
                              "stopped": 0}
    details: list[dict[str, Any]] = []

    async with session_factory() as db:
        # Ensure ONLY the marker table exists — never metadata-wide
        # create_all; the shared Base carries the whole platform schema.
        def _ensure_marker(sync_conn: Any) -> None:
            NudgeSentLog.__table__.create(sync_conn, checkfirst=True)

        async with db.bind.begin() as conn:
            await conn.run_sync(_ensure_marker)

        links = (await db.execute(
            select(ParentStudentLinkModel.parent_id,
                   ParentStudentLinkModel.student_id)
        )).all()

        user_by_id: dict[str, Any] = {}
        uids = {str(pid) for pid, _sid in links} | \
               {str(sid) for _pid, sid in links}
        if uids:
            rows = (await db.execute(
                select(UserModel).where(UserModel.id.in_(sorted(uids)))
            )).scalars().all()
            # SNAPSHOT to plain objects, deliberately NOT the ORM
            # instances — the weekly digest's rollback-poisoner note
            # applies verbatim (a rollback expires ORM instances; the
            # next child's attribute access would MissingGreenlet).
            for u in rows:
                user_by_id[str(u.id)] = SimpleNamespace(
                    id=u.id, name=u.name, phone_number=u.phone_number,
                    class_level=u.class_level, streak_days=u.streak_days,
                    last_activity_date=u.last_activity_date)

        for parent_id, student_id in links:
            counts["checked"] += 1
            child_id = str(student_id)
            try:
                already = (await db.execute(
                    select(NudgeSentLog.child_id)
                    .where(NudgeSentLog.child_id == child_id,
                           NudgeSentLog.nudge_date == today)
                    .limit(1)
                )).scalar_one_or_none()
                if already is not None:
                    counts["skipped"] += 1
                    details.append({
                        "child_id": child_id, "status": "skipped",
                        "reason": f"nudge already delivered for {today}",
                    })
                    continue

                child = user_by_id.get(child_id)
                parent = user_by_id.get(str(parent_id))
                if child is None or parent is None:
                    counts["failed"] += 1
                    details.append({
                        "child_id": child_id, "status": "failed",
                        "reason": "linked user row missing",
                    })
                    continue

                activity = await _nudge_activity(db, child_id, now)
                if activity["attempts_today"] > 0:
                    counts["active_today"] += 1
                    details.append({
                        "child_id": child_id, "status": "active_today",
                        "reason": "quiz activity recorded today",
                    })
                    continue
                if not activity["active_last7d"]:
                    counts["not_eligible"] += 1
                    details.append({
                        "child_id": child_id, "status": "not_eligible",
                        "reason": "no activity in the last 7 days",
                    })
                    continue

                streak = await _silent_streak(db, child_id)
                if streak >= NUDGE_STOP_AFTER:
                    counts["stopped"] += 1
                    details.append({
                        "child_id": child_id, "status": "stopped",
                        "reason": (f"{streak} consecutive silent-day "
                                   "nudges already sent; waiting for "
                                   "activity"),
                    })
                    continue
                activity["silent_streak"] = streak

                built = await send_fn(db, parent, child, activity)
                mock = bool(built.get("mock"))
                sent = bool(built.get("sent"))
                if sent and not mock:
                    counts["sent"] += 1
                    status = "sent"
                elif mock:
                    counts["mock"] += 1
                    status = "mock"
                else:
                    counts["failed"] += 1
                    status = "failed"

                if status != "failed":
                    db.add(NudgeSentLog(
                        child_id=child_id, nudge_date=today,
                        sent_at=now, status=status,
                        silent_streak=streak + 1))
                    await db.commit()

                details.append({
                    "child_id": child_id, "status": status,
                    "reason": built.get("reason"),
                })
            except Exception as exc:
                # Loop isolation: roll this child back, keep the run alive.
                counts["failed"] += 1
                try:
                    await db.rollback()
                except Exception:
                    logger.warning("[nudge] rollback after child failure "
                                   "also failed", exc_info=True)
                details.append({
                    "child_id": child_id, "status": "failed",
                    "reason": f"{type(exc).__name__}: {exc}"[:200],
                })

    summary: dict[str, Any] = {"nudge_date": today, **counts,
                               "details": details[:20]}
    if len(details) > 20:
        summary["details_truncated"] = len(details) - 20
    logger.info("[nudge] daily run %s: sent=%d mock=%d failed=%d "
                "skipped=%d active_today=%d not_eligible=%d stopped=%d "
                "checked=%d", today, counts["sent"], counts["mock"],
                counts["failed"], counts["skipped"],
                counts["active_today"], counts["not_eligible"],
                counts["stopped"], counts["checked"])
    return summary


# --------------------------------------------------------------------------- #
# RENEWAL NOTICE limb (BUILD_ORDER 2.5.4)
#
# ONE WhatsApp notice per (parent, entitlement) when a linked child's
# parent has a PAID entitlement expiring within RENEWAL_WINDOW_DAYS.
# Only parents with at least one linked child are considered — the
# notice exists to keep a CHILD's practice going, and the payments
# module alone cannot know that.  A parent who cancelled at period-end
# (pending_tier='free') still gets the notice, worded to respect the
# cancellation — "your access ends on X" is information, not a nag.
#
# Honest no-ops (never an error): payments unconfigured, zero
# entitlement rows, or an unreadable entitlement table.
# --------------------------------------------------------------------------- #

RENEWAL_WINDOW_DAYS = 7


class RenewalNoticeLog(Base):
    """Dedup marker: ONE row per (parent, entitlement) renewal notice.

    The PRIMARY KEY (parent_id, entitlement_id) makes 'never resend for
    the same entitlement' atomic at the storage layer (DigestSentLog
    pattern).

    Known scope limit, accepted by the brief: Entitlement rows are
    UPDATED IN PLACE across billing cycles (service.activate_purchase
    extends valid_until on the same row), so one entitlement row gets at
    most ONE renewal notice for its lifetime — a parent who renews keeps
    the same row id and is not re-noticed next month.  A per-cycle
    re-notice would key on (parent, entitlement, valid_until); that is a
    deliberate follow-up decision, not an accident here.
    """

    __tablename__ = "renewal_notice_log"

    parent_id = Column(String(64), primary_key=True)    # users.id as text
    entitlement_id = Column(Integer, primary_key=True)  # payment_entitlements.id
    sent_at = Column(DateTime(timezone=True), nullable=False,
                     server_default=func.now())         # TIMESTAMPTZ on PG
    status = Column(String(16), nullable=False, server_default="sent")
    window_days = Column(Integer, nullable=False, server_default="7")

    def __repr__(self) -> str:  # pragma: no cover
        return (f"<RenewalNoticeLog parent={self.parent_id} "
                f"entitlement={self.entitlement_id} status={self.status}>")


def _tier_display(tier: str) -> str:
    """The catalog's display name for a tier (plans.py is the single
    source of truth); unknown tiers degrade to title-case, never a raw
    enum surprise."""
    try:
        from backend.modules.payments.plans import PLANS
        return str(PLANS.get(tier, {}).get("name") or tier.title())
    except Exception:
        return tier.title()


def compose_renewal(
    parent_name: str,
    tier: str,
    valid_until: datetime,
    days_left: int,
    child_names: list[str],
    cancelled: bool = False,
) -> str:
    """The renewal WhatsApp notice.  Hinglish, same voice as the digest.

    Every number is real: tier from the entitlement row, expiry from
    valid_until, days_left computed from the run's ``now``, child names
    from actual parent_student_links rows (never invented)."""
    greet = (f"Namaste {parent_name.strip()} — "
             if (parent_name or "").strip() else "Namaste — ")
    tier_name = _tier_display(tier or "free")
    expires = f"{valid_until:%d %b %Y}"
    if days_left <= 1:
        when = f"aaj/kal ({expires})"
    else:
        when = f"{expires} ({days_left} din baad)"
    kids = ", ".join(n for n in (child_names or [])[:3] if n)

    lines = ["⏳ *Atlas plan reminder*", ""]
    lines.append(f"{greet}aapka *{tier_name}* plan {when} khatam ho raha hai.")
    if cancelled:
        lines.append("(Aapne cancel kiya hai — plan khatam hote hi access "
                     "ruk jayega.)")
    lines.append("")
    if kids:
        lines.append(f"{kids} ke practice sessions chalu rehne ke liye, "
                     "Atlas app ke *Pricing* section se renew kar lein.")
    else:
        lines.append("Atlas app ke *Pricing* section se renew kar lein.")
    lines.append("")
    lines.append("— Atlas 📚")
    return "\n".join(lines)


async def send_renewal_notice(
    db: AsyncSession,
    parent_row: Any,
    ent: Any,
    child_names: list[str],
    now: datetime,
) -> dict[str, Any]:
    """Compose + send one parent's renewal notice to their phone.

    ``ent`` is a snapshot of the expiring entitlement row (id, tier,
    valid_until, pending_tier).  Never raises: transport/config problems
    become {sent: False, mock, reason} WITH the composed message
    attached (same posture as send_child_digest)."""
    valid_until = _as_utc(getattr(ent, "valid_until", None))
    tier = str(getattr(ent, "tier", "") or "free")
    cancelled = getattr(ent, "pending_tier", None) == "free"
    message = compose_renewal(
        parent_name=getattr(parent_row, "name", None) or "",
        tier=tier,
        valid_until=valid_until,  # type: ignore[arg-type]
        days_left=max(0, (valid_until - now).days) if valid_until else 0,
        child_names=list(child_names or []),
        cancelled=cancelled,
    )
    built: dict[str, Any] = {
        "parent_id": str(getattr(parent_row, "id", "") or ""),
        "entitlement_id": int(getattr(ent, "id", 0) or 0),
        "message": message,
        "stats": {
            "tier": tier,
            "valid_until": valid_until.isoformat() if valid_until else None,
            "days_left": max(0, (valid_until - now).days) if valid_until else 0,
            "cancel_at_period_end": cancelled,
            "children": list((child_names or [])[:3]),
        },
        "mock": False,
        "sent": False,
    }

    phone = (getattr(parent_row, "phone_number", None) or "").strip()
    if not phone:
        built["reason"] = "no phone_number on the parent account"
        logger.info("[renewal] mock (no phone) parent=%s message:\n%s",
                    built["parent_id"], built["message"])
        return built

    built.update(await _deliver_message(
        "renewal", phone, f"parent={built['parent_id']}", built["message"]))
    return built


def _renewal_noop(reason: str, window: int) -> dict[str, Any]:
    """The honest no-op shape — same keys as a real run, zero counts."""
    return {"window_days": window, "checked": 0, "sent": 0, "mock": 0,
            "failed": 0, "skipped": 0, "reason": reason, "details": []}


async def run_renewal_notices(
    session_factory: Optional[Any] = None,
    send_fn: Optional[Any] = None,
    now: Optional[datetime] = None,
    window_days: Optional[int] = None,
) -> dict[str, Any]:
    """ONE renewal notice per (parent, entitlement) whose PAID plan ends
    within ``window_days`` (default 7, env RENEWAL_WINDOW_DAYS).

    Worker entry (sync wrapper lives in workers/main.py).  Injectable
    ``session_factory`` / ``send_fn`` / ``now`` exist for tests (the fake
    send_fn signature is ``(db, parent, ent, child_names, now)``).

    Honest no-ops — each returns {"checked": 0, "reason": ...} and never
    raises:
      * payments unconfigured (RAZORPAY_KEY_ID/SECRET absent) — a
        'renew!' ping with no working payment path would be a lie;
      * zero entitlement rows at all — payments never went live here;
      * the entitlement table missing/unreadable — the payments module's
        init_tables owns that table's existence; this job only READS it.

    Selection: PAID tiers (tier != 'free'), valid_until in
    [now, now + window), for parents who have at least one linked child.
    Idempotent per (parent, entitlement_id) via renewal_notice_log;
    failed sends leave no marker and are retried by the next daily
    attempt; per-parent loop isolation mirrors the weekly digest.

    Returns {"window_days", checked, sent, mock, failed, skipped,
    reason, details [capped at 20], details_truncated?}.
    """
    now = now or datetime.now(timezone.utc)
    try:
        window = int(window_days or os.environ.get("RENEWAL_WINDOW_DAYS",
                                                   RENEWAL_WINDOW_DAYS))
    except (TypeError, ValueError):
        window = RENEWAL_WINDOW_DAYS

    try:
        from backend.modules.payments.service import payments_configured
        configured = bool(payments_configured())
    except Exception:
        configured = False
    if not configured:
        return _renewal_noop("payments unconfigured", window)

    if session_factory is None:  # lazy: keep import cost off the loop tick
        from backend.database import AsyncSessionLocal as session_factory
    if send_fn is None:
        send_fn = send_renewal_notice

    from backend.models.user import User as UserModel
    from backend.modules.payments.models import Entitlement
    from backend.services.auth_service import ParentStudentLinkModel

    counts: dict[str, int] = {"checked": 0, "sent": 0, "mock": 0,
                              "failed": 0, "skipped": 0}
    details: list[dict[str, Any]] = []

    async with session_factory() as db:
        # Ensure ONLY the marker table exists — never metadata-wide
        # create_all; the shared Base carries the whole platform schema.
        def _ensure_marker(sync_conn: Any) -> None:
            RenewalNoticeLog.__table__.create(sync_conn, checkfirst=True)

        async with db.bind.begin() as conn:
            await conn.run_sync(_ensure_marker)

        # The payments tables belong to the payments module — READ here,
        # never created here.  A missing/unreadable table is an honest
        # no-op, not a crash.
        try:
            any_ent = (await db.execute(
                select(Entitlement.id).limit(1)
            )).scalar_one_or_none()
        except Exception as exc:
            logger.warning("[renewal] entitlement read failed: %s", exc)
            return _renewal_noop(f"entitlement read failed: "
                                 f"{type(exc).__name__}", window)
        if any_ent is None:
            return _renewal_noop("no entitlement rows", window)

        links = (await db.execute(
            select(ParentStudentLinkModel.parent_id,
                   ParentStudentLinkModel.student_id)
        )).all()

        parent_id_values = sorted({pid for pid, _sid in links}, key=str)
        if not parent_id_values:
            summary: dict[str, Any] = {"window_days": window, **counts,
                                       "reason": None, "details": []}
            return summary

        user_by_id: dict[str, Any] = {}
        uids = {str(pid) for pid in parent_id_values} | \
               {str(sid) for _pid, sid in links}
        rows = (await db.execute(
            select(UserModel).where(UserModel.id.in_(sorted(uids)))
        )).scalars().all()
        # SNAPSHOT to plain objects — the weekly digest's
        # rollback-poisoner note applies verbatim.
        for u in rows:
            user_by_id[str(u.id)] = SimpleNamespace(
                id=u.id, name=u.name, phone_number=u.phone_number)
        child_names_by_parent: dict[str, list[str]] = {}
        for pid, sid in links:
            cu = user_by_id.get(str(sid))
            if cu is not None and getattr(cu, "name", None):
                child_names_by_parent.setdefault(str(pid), []).append(
                    str(cu.name).split(" ")[0])

        horizon = now + timedelta(days=window)
        try:
            ents = (await db.execute(
                select(Entitlement)
                .where(
                    Entitlement.user_id.in_(parent_id_values),
                    Entitlement.tier != "free",
                    Entitlement.valid_until.is_not(None),
                    Entitlement.valid_until >= now,
                    Entitlement.valid_until < horizon,
                )
            )).scalars().all()
        except Exception as exc:
            logger.warning("[renewal] entitlement window read failed: %s",
                           exc)
            return _renewal_noop(f"entitlement read failed: "
                                 f"{type(exc).__name__}", window)
        # Snapshot the entitlement rows too: a sibling parent's failure
        # path rolls the session back and would expire these instances.
        ent_snapshots = [
            SimpleNamespace(
                id=e.id, user_id=e.user_id, tier=e.tier,
                valid_until=_as_utc(e.valid_until),
                pending_tier=e.pending_tier)
            for e in ents
        ]

        for ent in ent_snapshots:
            counts["checked"] += 1
            parent_id = str(ent.user_id)
            try:
                already = (await db.execute(
                    select(RenewalNoticeLog.parent_id)
                    .where(RenewalNoticeLog.parent_id == parent_id,
                           RenewalNoticeLog.entitlement_id == int(ent.id))
                    .limit(1)
                )).scalar_one_or_none()
                if already is not None:
                    counts["skipped"] += 1
                    details.append({
                        "parent_id": parent_id,
                        "entitlement_id": int(ent.id), "status": "skipped",
                        "reason": ("renewal notice already delivered for "
                                   "this entitlement"),
                    })
                    continue

                parent = user_by_id.get(parent_id)
                if parent is None:
                    counts["failed"] += 1
                    details.append({
                        "parent_id": parent_id,
                        "entitlement_id": int(ent.id), "status": "failed",
                        "reason": "parent user row missing",
                    })
                    continue

                built = await send_fn(
                    db, parent, ent,
                    child_names_by_parent.get(parent_id, [])[:3], now)
                mock = bool(built.get("mock"))
                sent = bool(built.get("sent"))
                if sent and not mock:
                    counts["sent"] += 1
                    status = "sent"
                elif mock:
                    counts["mock"] += 1
                    status = "mock"
                else:
                    counts["failed"] += 1
                    status = "failed"

                if status != "failed":
                    db.add(RenewalNoticeLog(
                        parent_id=parent_id,
                        entitlement_id=int(ent.id), sent_at=now,
                        status=status, window_days=window))
                    await db.commit()

                details.append({
                    "parent_id": parent_id,
                    "entitlement_id": int(ent.id), "status": status,
                    "reason": built.get("reason"),
                })
            except Exception as exc:
                # Loop isolation: roll this parent back, keep the run alive.
                counts["failed"] += 1
                try:
                    await db.rollback()
                except Exception:
                    logger.warning("[renewal] rollback after parent "
                                   "failure also failed", exc_info=True)
                details.append({
                    "parent_id": parent_id,
                    "entitlement_id": int(getattr(ent, "id", 0) or 0),
                    "status": "failed",
                    "reason": f"{type(exc).__name__}: {exc}"[:200],
                })

    summary = {"window_days": window, **counts, "reason": None,
               "details": details[:20]}
    if len(details) > 20:
        summary["details_truncated"] = len(details) - 20
    logger.info("[renewal] run window=%dd: sent=%d mock=%d failed=%d "
                "skipped=%d checked=%d", window, counts["sent"],
                counts["mock"], counts["failed"], counts["skipped"],
                counts["checked"])
    return summary
