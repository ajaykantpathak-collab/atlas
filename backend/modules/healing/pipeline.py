#!/usr/bin/env python3
"""modules/healing/pipeline.py — the SELF-HEALING PIPELINE.

Consumes the solver's unanswered-question queue (JSONL written by
answer_pipeline._queue_miss) and routes every miss to its fix path:

  bank-shaped     (prose question, label GUIDED, no quantities)
                    -> suggestion: node binding / bank curation
  numeric-shaped  (has quantities + an ask; the signature resolver
                   declined)                -> family-patch queue (the
                   coordinator extends the deterministic families)
  composer-shaped (needs authored teaching content)
                    -> composer backlog

Every entry is deduplicated by question hash, tracked with status
(open|routed|healed), and re-verifiable: replay runs the question back
through the pipeline — a VERIFIED label marks it healed.  This is the
loop: miss -> classify -> fix -> replay -> healed.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from datetime import datetime, timezone
from typing import Any, Dict, List

from sqlalchemy import JSON, DateTime, Integer, String, Text, select, func
from sqlalchemy.orm import Mapped, mapped_column

from backend.database import Base, get_sync_engine

QUEUE_PATH_RE = re.compile(r"answer_queue|unanswered")


def _queue_path() -> str:
    """Mirror of answer_pipeline._queue_path's location discovery."""
    from backend.its.solver import answer_pipeline as ap
    return ap._queue_path()


def _ensure_tables() -> None:
    """Provision the healing_queue table.  Nothing else in the app creates
    it, so every entrypoint guards here — a cold DB used to make
    /api/healing/* fail (UndefinedTable) instead of reporting an empty queue."""
    from backend.database import Base
    Base.metadata.create_all(get_sync_engine(),
                             tables=[HealingItem.__table__])


def _session():
    """ORM session for entity reads/writes.

    Entity selects MUST run on a Session: executed on a raw engine
    Connection, scalars() yields column values (ints) — the same trap
    that took down the journey map/reset endpoints."""
    from sqlalchemy.orm import Session
    return Session(get_sync_engine(), expire_on_commit=False)


# Watcher probe: entity reads/writes live in _session() above (Session),
# column-only aggregates may stay on the raw engine Connection.


class HealingItem(Base):
    __tablename__ = "healing_queue"
    qhash: Mapped[str] = mapped_column(String(32), primary_key=True)
    question: Mapped[str] = mapped_column(Text)
    label: Mapped[str] = mapped_column(String(32))
    refusal_reason: Mapped[str | None] = mapped_column(String(256),
                                                       nullable=True)
    lane: Mapped[str | None] = mapped_column(String(16), nullable=True)
    disposition: Mapped[str] = mapped_column(String(32), default="open")
    # open | node_bind | family_patch | composer | healed
    occurrences: Mapped[int] = mapped_column(Integer, default=1)
    last_seen: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc))
    meta: Mapped[dict | None] = mapped_column(JSON, nullable=True)


_HAS_QTY = re.compile(
    r"\b\d+(?:\.\d+)?\s*(?:km|kg|cm|m|s\b|h\b|N\b|Rs|₹|%|m/s)", re.I)
_PROSE = re.compile(
    r"\b(explain|describe|why|define|discuss|write|essay|meaning)\b", re.I)


def classify(entry: Dict[str, Any]) -> str:
    q = entry.get("question", "")
    label = entry.get("label", "")
    if _PROSE.search(q) or label == "GUIDED_PRACTICE" and not _HAS_QTY.search(q):
        return "composer" if _HAS_QTY.search(q) else "node_bind"
    if _HAS_QTY.search(q):
        return "family_patch"
    return "composer"


# touch: watcher probe
def ingest(limit: int = 500) -> Dict[str, Any]:
    """Read the miss queue file, upsert into the healing table."""
    _ensure_tables()
    p = _queue_path()
    if not os.path.exists(p):
        return {"ingested": 0, "reason": "no queue file yet"}
    seen_hashes = set()
    entries = []
    with open(p, encoding="utf-8", errors="ignore") as fh:
        for ln in fh:
            try:
                entries.append(json.loads(ln))
            except Exception:
                continue
    fresh = entries[-limit:]
    inserted = updated = 0
    with _session() as sx, sx.begin():
        for e in fresh:
            qh = hashlib.sha256(
                (e.get("question", "")).strip().lower().encode()).hexdigest()[:32]
            if qh in seen_hashes:
                continue
            seen_hashes.add(qh)
            row = sx.execute(select(HealingItem).where(
                HealingItem.qhash == qh)).scalars().first()
            disp = classify(e)
            if row is None:
                sx.add(HealingItem(
                    qhash=qh, question=e.get("question", "")[:500],
                    label=e.get("label", "")[:32],
                    refusal_reason=(e.get("refusal_reason") or "")[:256],
                    lane=e.get("lane", "")[:16], disposition=disp,
                    meta={"route": e.get("route")}))
                inserted += 1
            else:
                row.occurrences += 1
                row.last_seen = datetime.now(timezone.utc)
                updated += 1
    return {"ingested": inserted, "refreshed": updated}


def stats() -> Dict[str, Any]:
    _ensure_tables()
    with get_sync_engine().begin() as cx:
        by = cx.execute(
            select(HealingItem.disposition, func.count(HealingItem.qhash))
            .group_by(HealingItem.disposition)).all()
        total = cx.execute(select(func.count(HealingItem.qhash))).scalar()
        healed = cx.execute(select(func.count(HealingItem.qhash))
                            .where(HealingItem.disposition == "healed")
                            ).scalar()
    return {"total": total, "healed": healed,
            "by_disposition": {k: v for k, v in by}}


def top_open(limit: int = 25) -> List[Dict[str, Any]]:
    _ensure_tables()
    with _session() as sx, sx.begin():
        rows = sx.execute(
            select(HealingItem).where(HealingItem.disposition != "healed")
            .order_by(HealingItem.occurrences.desc(),
                      HealingItem.last_seen.desc()).limit(limit)).scalars().all()
        return [{"qhash": r.qhash, "question": r.question[:120],
                 "label": r.label, "disposition": r.disposition,
                 "occurrences": r.occurrences} for r in rows]


def get_item(qhash: str) -> Dict[str, Any] | None:
    """One queue record by hash — with the FULL question text.

    top_open() truncates questions for display; replay must re-run the
    complete question through the solver, so it resolves through here.
    """
    _ensure_tables()
    with _session() as sx, sx.begin():
        row = sx.execute(select(HealingItem).where(
            HealingItem.qhash == qhash)).scalars().first()
        if row is None:
            return None
        return {"qhash": row.qhash, "question": row.question,
                "label": row.label, "disposition": row.disposition,
                "occurrences": row.occurrences,
                "refusal_reason": row.refusal_reason}


def mark_healed(qhash: str) -> bool:
    _ensure_tables()
    with _session() as sx, sx.begin():
        row = sx.execute(select(HealingItem).where(
            HealingItem.qhash == qhash)).scalars().first()
        if row:
            row.disposition = "healed"
            return True
    return False

