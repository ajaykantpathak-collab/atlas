"""telemetry.py — AttemptEvent persistence for the ITS learning loop.

The Meta-Brain (its/agents/meta_brain.py) mines outcomes to recalibrate
agents and discover misconceptions. This module is the write-side of that
feedback loop: it persists every ``AttemptEvent`` (its/contracts.py) into
Postgres so nightly jobs have research-grade data.

Design:
- ``row_from_event``  — pure function, event -> row dict (unit-testable
  with no database at all).
- ``TelemetryWriter`` — thin async writer over the SQLAlchemy session the
  caller already has. No session creation, no commits: commit policy
  belongs to the request boundary.
- Bulk path: ``write_many`` for batch imports/backfills.
"""

from __future__ import annotations

import logging
from typing import Iterable, List

from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession

from backend.its.contracts import AttemptEvent

logger = logging.getLogger(__name__)


def row_from_event(event: AttemptEvent) -> dict:
    """Pure mapping: AttemptEvent -> AttemptLog row dict."""
    d = event.to_dict()
    return {
        "student_id": d["student_id"],
        "node_id": d["node_id"],
        "question_id": d.get("question_id"),
        "is_correct": bool(d["is_correct"]),
        "modality": d.get("modality"),
        "step_index": d.get("step_index"),
        "hint_level": d.get("hint_level"),
        "response_ms": d.get("response_ms"),
        "misconception_id": d.get("misconception_id"),
        "session_id": d.get("session_id"),
        # CL-06: route chain capped at ROUTE_CAP (same 32-entry cap the
        # JSONL plane uses) + the winning stage.
        "route": (d.get("route") or [])[:32],
        "stage": d.get("stage"),
        "created_at": d.get("created_at"),
    }


class TelemetryWriter:
    """Persists AttemptEvents into the attempt_log table."""

    def __init__(self, table) -> None:
        """``table``: the SQLAlchemy ``AttemptLog`` table/model
        (backend.models.telemetry.AttemptLog)."""
        self.table = table

    async def write(self, session: AsyncSession, event: AttemptEvent) -> None:
        row = row_from_event(event)
        await session.execute(insert(self.table).values(**row))

    async def write_many(
        self, session: AsyncSession, events: Iterable[AttemptEvent]
    ) -> int:
        rows: List[dict] = [row_from_event(e) for e in events]
        if not rows:
            return 0
        await session.execute(insert(self.table), rows)
        return len(rows)
