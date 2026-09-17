r"""Persistence layer for the intelligence loop.

THE BUG THIS FIXES: IntelligenceState was per-process. Run 4 uvicorn
workers → 4 separate states → student remediation data split across
workers, inconsistent queries, all lost on restart.

THE FIX: Events now write to the real DB tables (wired in Phase 2 but
never written to). On startup, state rebuilds from the DB. One source
of truth, shared across workers, survives restarts.

TABLES USED (already exist via services/intelligence_schema.py):
  - InteractionOutcome  → every student_answer / solve event
  - Misconception       → misconception counts (upserted)
  - ContentGapFlag      → concepts flagged as gaps

DESIGN:
  - DB writes are BEST-EFFORT and ASYNC (never block or break a solve)
  - In-memory state stays as the hot cache; DB is the durable layer
  - If DB is down, events still flow in-memory (degraded, not dead)
  - Replay on startup: read last N days of InteractionOutcome to
    rebuild ConceptStats and StudentState
"""

from __future__ import annotations

import time
from typing import Optional

from backend.contracts import SolutionResult


# ═══════════════════════════════════════════════════════════════════
# Event persistence — writes to the intelligence tables
# ═══════════════════════════════════════════════════════════════════

def persist_student_answer(problem_type_id: str, correct: bool,
                           student_id: str, elapsed_ms: int = 0) -> None:
    """Write one student_answer event to InteractionOutcome. Best-effort."""
    try:
        import uuid
        from backend.database import get_sync_engine as _get_engine
        from backend.services.intelligence_schema import InteractionOutcome
        from sqlalchemy.orm import Session

        with Session(_get_engine()) as session:
            outcome = InteractionOutcome(
                student_id=student_id or "anonymous",
                session_id=uuid.uuid4(),
                subject="",
                concept=problem_type_id,
                grade_level=0,
                interaction_type="question_attempt",
                is_correct=correct,
                partial_score=1.0 if correct else 0.0,
                time_to_respond_ms=elapsed_ms,
                hints_used=0,
                hint_sequence=[],
                strategy_sequence=[],
                misconceptions_detected=[],
                frustration_signals=False,
                mastery_achieved=correct,
                engagement_score=1.0 if correct else 0.3,
                language="en",
            )
            session.add(outcome)
            session.commit()
        try:
            from backend.services.metrics import INTEL_EVENTS_PERSISTED
            INTEL_EVENTS_PERSISTED.labels(event_type="student_answer").inc()
        except Exception:
            pass
    except Exception:
        try:
            from backend.services.metrics import INTEL_PERSIST_ERRORS
            INTEL_PERSIST_ERRORS.inc()
        except Exception:
            pass


def persist_misconception(misconception_key: str, problem_type_id: str,
                          count_delta: int = 1) -> None:
    """Upsert a misconception occurrence count. Best-effort."""
    try:
        from backend.database import get_sync_engine as _get_engine
        from backend.services.intelligence_schema import Misconception
        from sqlalchemy import select
        from sqlalchemy.orm import Session

        with Session(_get_engine()) as session:
            stmt = select(Misconception).where(
                Misconception.misconception_key == misconception_key
            )
            existing = session.execute(stmt).scalar_one_or_none()
            if existing:
                existing.occurrence_count += count_delta
                existing.last_seen = func_now()
            else:
                session.add(Misconception(
                    misconception_key=misconception_key,
                    subject="",
                    concept=problem_type_id,
                    grade_level=0,
                    name_en=misconception_key.replace("_", " ").title(),
                    description_en=f"Auto-detected pattern: {misconception_key}",
                    remediation_approach_en="See hint ladder rung 1 nudge text.",
                    occurrence_count=count_delta,
                    student_count=1,
                    confidence_score=0.5,
                    source="discovered",
                ))
            session.commit()
    except Exception:
        pass


def persist_hint_event(problem_type_id: str, rung: int,
                       student_id: str = "") -> None:
    """Write a hint_request event. Best-effort."""
    try:
        from backend.database import get_sync_engine as _get_engine
        from backend.services.intelligence_schema import InteractionOutcome
        from sqlalchemy.orm import Session

        with Session(_get_engine()) as session:
            outcome = InteractionOutcome(
                student_id=student_id or "anonymous",
                subject="",
                concept=problem_type_id,
                grade_level=0,
                interaction_type="hint_request",
                hints_used=rung,
                engagement_score=max(0.1, 1.0 - rung * 0.2),
            )
            session.add(outcome)
            session.commit()
    except Exception:
        pass


def func_now():
    from datetime import datetime, timezone
    return datetime.now(timezone.utc)


# ═══════════════════════════════════════════════════════════════════
# Replay — rebuild in-memory state from the DB on startup
# ═══════════════════════════════════════════════════════════════════

def replay_into_state(days: int = 30) -> dict:
    """Rebuild IntelligenceState from InteractionOutcome rows.

    Called once at startup so every worker starts with the SAME state
    (fixes the multi-worker split). Returns replay stats.
    """
    from backend.services.intelligence_bus import get_intelligence
    _, state = get_intelligence()

    replayed = 0
    errors = 0
    try:
        from backend.database import get_sync_engine as _get_engine
        from backend.services.intelligence_schema import InteractionOutcome
        from sqlalchemy import select
        from datetime import datetime, timezone, timedelta
        from sqlalchemy.orm import Session

        cutoff = datetime.now(timezone.utc) - timedelta(days=days)
        with Session(_get_engine()) as session:
            stmt = select(InteractionOutcome).where(
                InteractionOutcome.created_at >= cutoff
            ).order_by(InteractionOutcome.created_at).limit(50000)
            rows = session.execute(stmt).scalars().all()

            for row in rows:
                try:
                    # Handlers expect a full event dict: {"payload": {...}}
                    if row.interaction_type == "question_attempt":
                        state.on_student_answer({"payload": {
                            "problem_type_id": row.concept,
                            "student_id": row.student_id,
                            "correct": bool(row.is_correct),
                        }})
                    elif row.interaction_type == "hint_request":
                        state.on_hint({"payload": {
                            "problem_type_id": row.concept,
                            "student_id": row.student_id,
                            "rung": row.hints_used or 1,
                            "misconception": "",
                        }})
                    replayed += 1
                except Exception:
                    errors += 1
    except Exception:
        pass  # DB down → start with empty state (same as before this fix)

    return {"replayed_events": replayed, "errors": errors,
            "concepts": len(state.concepts), "students": len(state.students)}


# ═══════════════════════════════════════════════════════════════════
# Wire persistence into the bus (idempotent — call once at startup)
# ═══════════════════════════════════════════════════════════════════

_wired_persistence = False

def wire_persistence() -> bool:
    """Subscribe DB writers to the bus + replay existing state.

    Call at app startup (main.py lifespan). Idempotent.
    Returns True if the DB layer is available.
    """
    global _wired_persistence
    if _wired_persistence:
        return True

    try:
        from backend.database import get_sync_engine as _get_engine
        _get_engine().connect().close()  # probe: is the DB up?
    except Exception:
        return False  # DB down → pure in-memory mode (still works)

    from backend.services.intelligence_bus import get_intelligence
    bus, _ = get_intelligence()

    def on_student_answer_persist(event):
        p = event["payload"]
        persist_student_answer(
            p.get("problem_type_id", ""), bool(p.get("correct")),
            p.get("student_id", ""),
        )

    def on_hint_persist(event):
        p = event["payload"]
        persist_hint_event(
            p.get("problem_type_id", ""), p.get("rung", 1),
            p.get("student_id", ""),
        )
        if p.get("misconception"):
            persist_misconception(
                p["misconception"], p.get("problem_type_id", "")
            )

    bus.subscribe("student_answer", on_student_answer_persist)
    bus.subscribe("hint_request", on_hint_persist)

    stats = replay_into_state()
    print(f"[intelligence] persistence wired | replay: {stats}")

    _wired_persistence = True
    return True
