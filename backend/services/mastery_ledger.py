"""
mastery_ledger.py — THE single entry point for mastery writes.

ONE RECORD RULE (owner plan, 2026-09)
-------------------------------------
"Lessons, simulations, practice, and junior games all contribute to the SAME
server-backed mastery record, with offline recovery and cross-device
continuity."

Every surface that ASSESSES a student must route its verdict through
:func:`record_assessment` — never write a mastery store directly:

    practice grading      (source="practice")
    offline practice sync (source="practice_offline")   — replay-safe
    diagnostics           (source="diagnostic")
    chapter tests         (source="chapter_test")
    assignments           (source="assignment")
    quizzes / exams       (source="quiz" / "exam")
    review answers        (source="review")
    junior /play games    (source="junior_game")
    junior tutor lessons  (source="junior_lesson")

SIMULATIONS STAY OUT (owner decision, 2026-09)
----------------------------------------------
Sims are exploration, not assessment. A sim completion must NOT move the
mastery record. ``/api/progress/sim-result`` used to write BKT per covered
node (and the client masteryStore fed every sim there) — that write was
deliberately removed. Do not re-add mastery writes on sim paths. If sims ever
gain a real assessment mode, it comes through here with its own ``source``
and a product decision behind it.

SEMANTICS (identical for every surface)
---------------------------------------
* node keying: the corpus ``node_id`` (junior surfaces namespace theirs as
  ``junior::<skill>`` / ``junior::<game_file>`` — same row semantics, no
  collision with corpus ids, which never collide with the ``junior::`` prefix).
* scale: a 0-1 BKT probability (``mastery_records.mastery_probability`` and
  ``mastery_state.bkt_p_know``), updated by the same BKT posterior+transit
  step for a correct/incorrect observation.
* stores: the ledger dual-writes the two server-backed stores so every
  reader agrees —
    - ``mastery_records`` (ORM)  → galaxy sky, dashboard, passport, reviews fallback
    - ``mastery_state``  (asyncpg) → practice selector, review scheduler, analytics
* idempotency: when ``client_token`` is given (practice replays, offline queue
  flushes, retried submits), the observation is applied EXACTLY ONCE. The
  token is persisted in ``mastery_event_log`` — dedup survives process
  restarts and works across backend replicas. Without a token the observation
  is treated as fresh (one call = one observation).

The module is deliberately import-light (stdlib only at module scope) so
tests can load it by file path without dragging the solver stack — see
pytest.ini for why that matters on this box.
"""

from __future__ import annotations

import hashlib
import logging
import uuid
from datetime import datetime, timezone
from typing import Any, Optional

logger = logging.getLogger(__name__)

# Sources that are allowed to move mastery. Simulations are deliberately
# absent — see the module docstring.
VALID_SOURCES = frozenset({
    "practice", "practice_offline", "diagnostic", "chapter_test",
    "assignment", "quiz", "exam", "review", "junior_game", "junior_lesson",
})

_JUNIOR_PREFIX = "junior::"

_EVENT_TABLE_DDL = """
CREATE TABLE IF NOT EXISTS mastery_event_log (
    dedup_key VARCHAR(160) PRIMARY KEY,
    student_id VARCHAR(64),
    node_id VARCHAR(190),
    source VARCHAR(40),
    is_correct BOOLEAN,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""

_table_ready = False


def junior_node_key(skill_or_game: str) -> str:
    """Namespaced node key for junior (Classes 1-5) surfaces.

    Junior content has no corpus node ids; the same 0-1 BKT semantics apply,
    keyed under ``junior::`` so rows never collide with corpus keys.
    """
    return f"{_JUNIOR_PREFIX}{skill_or_game}"


def event_token(*parts: Any) -> str:
    """Deterministic dedup token from the identifying parts of an event.

    Pure function — the offline answer applier derives its token from
    (user, session, question, answer, client timestamp); a retried flush
    produces the same token, so the ledger applies it exactly once.
    """
    raw = ":".join(str(p) for p in parts)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:64]


def _short(*parts: Any) -> str:
    return event_token(*parts)


async def record_assessment(
    db: Optional[Any],
    user_id: str,
    node_id: str,
    is_correct: bool,
    *,
    source: str,
    time_ms: float = 0.0,
    subject: str = "general",
    difficulty: float = 0.5,
    client_token: Optional[str] = None,
) -> dict:
    """Apply one assessment observation to the shared mastery record.

    Dual-writes both server-backed stores with identical BKT semantics and
    applies at most once per ``client_token``. Never raises: mastery must
    not break an answer flow. The returned dict reports honestly what was
    applied::

        {"duplicate": False, "mastery": 0.42, "orm_error": None, "live": {...}}
        {"duplicate": True,  "mastery": None}
    """
    global _table_ready
    result: dict[str, Any] = {"duplicate": False, "mastery": None}

    if source not in VALID_SOURCES:
        result["orm_error"] = f"unknown source '{source}' — refused"
        return result
    if not user_id or not node_id:
        result["orm_error"] = "missing user_id/node_id — refused"
        return result

    # ── exactly-once gate (persistent) ────────────────────────────────────
    if client_token:
        token = event_token(source, client_token)
        applied = False
        if db is not None:
            try:
                from sqlalchemy import text
                from sqlalchemy.exc import DBAPIError, SQLAlchemyError

                if not _table_ready:
                    await db.execute(text(_EVENT_TABLE_DDL))
                    _table_ready = True
                try:
                    async with db.begin_nested():
                        await db.execute(
                            text(
                                "INSERT INTO mastery_event_log "
                                "(dedup_key, student_id, node_id, source, is_correct) "
                                "VALUES (:k, :s, :n, :src, :c)"
                            ),
                            {"k": token, "s": str(user_id)[:64],
                             "n": str(node_id)[:190], "src": source[:40],
                             "c": bool(is_correct)},
                        )
                    applied = True
                except (DBAPIError, SQLAlchemyError) as exc:
                    # Duplicate primary key = replay of an already-applied
                    # event. Any other DB error must not silently swallow the
                    # observation — re-raise only for real failures.
                    if "UNIQUE" not in str(exc).upper() and "DUPLICATE" not in str(exc).upper() \
                            and "ON CONFLICT" not in str(exc).upper():
                        raise
                    result["duplicate"] = True
                    result["mastery"] = None
                    return result
            except (DBAPIError, SQLAlchemyError):
                # The dedup table itself is unavailable — fall through and
                # apply the observation (availability over exactly-once when
                # the gate table is missing), but say so.
                result["dedup_unavailable"] = True
        else:
            # No DB session: no persistent gate possible. Callers without a
            # session only get here for best-effort telemetry paths.
            result["dedup_unavailable"] = True

    # ── store 1: mastery_records (ORM — galaxy / dashboard / passport) ───
    try:
        from backend.services.progress_service import ProgressService

        result["mastery"] = await ProgressService.update_mastery_bkt(
            db, user_id=str(user_id), node_id=str(node_id), is_correct=bool(is_correct)
        )
    except Exception as exc:  # pragma: no cover - depends on store health
        result["orm_error"] = str(exc)
        logger.warning("mastery_ledger ORM mirror failed for %s/%s: %s",
                       user_id, node_id, exc)

    # ── store 2: mastery_state (asyncpg — practice selector / reviews) ───
    try:
        from services.mastery_sync import get_shared_service

        svc = await get_shared_service()
        # Capture the pre-update probability so callers can show an honest
        # before/after delta (practice's feedback card uses these).
        before: Optional[float] = None
        try:
            pre = await svc.get_mastery(str(user_id), str(node_id))
            if isinstance(pre, dict) and pre.get("attempts"):
                before = float(pre.get("bkt_p_know") or 0.0)
        except Exception:
            before = None
        live = await svc.update_on_attempt(
            student_id=str(user_id),
            topic_id=str(node_id),
            correct=bool(is_correct),
            time_ms=float(time_ms or 0.0),
            subject=str(subject or "general"),
            difficulty=float(difficulty if difficulty is not None else 0.5),
        )
        if isinstance(live, dict):
            result["live"] = live
            result["live_before"] = before if before is not None else 0.0
            result["live_after"] = float(live.get("bkt_p_know") or 0.0)
    except Exception as exc:  # pragma: no cover - depends on store health
        result["live_error"] = str(exc)
        logger.warning("mastery_ledger live-store write failed for %s/%s: %s",
                       user_id, node_id, exc)

    return result


async def read_unified_mastery(db: Optional[Any], user_id: str, node_id: str) -> dict:
    """Read the record back from BOTH stores (diagnostics/QA helper).

    Cross-device continuity is a property of server state: any session for
    the same user sees the same rows. This helper exists so tests (and the
    curious) can assert both stores agree.
    """
    out: dict[str, Any] = {"orm": None, "live": None}
    if db is not None:
        try:
            from backend.services.progress_service import ProgressService

            rec = await ProgressService.get_mastery_record(
                db, user_id=str(user_id), node_id=str(node_id)
            )
            if rec is not None:
                out["orm"] = {
                    "node_id": rec.node_id,
                    "mastery_probability": float(rec.mastery_probability),
                    "attempts": int(rec.attempts),
                }
        except Exception as exc:
            out["orm_error"] = str(exc)
    try:
        from services.mastery_sync import get_shared_service

        svc = await get_shared_service()
        out["live"] = await svc.get_mastery(str(user_id), str(node_id))
    except Exception as exc:
        out["live_error"] = str(exc)
    return out


def reset_for_tests() -> None:
    """Reset process-local state (dedup-table flag + shared live service).

    Tests only — production dedup relies on the persisted table, not this.
    """
    global _table_ready
    _table_ready = False
    try:
        import services.mastery_sync as _ms

        _ms._default_service = None
    except Exception:
        pass
