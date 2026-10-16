"""Spaced-review queue — the distributed-practice engine.

Every answered question schedules its topic's next retrieval: correct answers
double the interval (1 -> 2 -> 4 -> 8 -> 16 days), wrong answers reset it to 1
day. The mission warm-up serves the two most-due topics as quick retrievals —
distributed practice + retrieval, the two highest-utility techniques in the
learning literature (Dunlosky et al. 2013).

Board-agnostic by design: node ids from either corpus (CBSE `*_cbse_*`,
CISCE `*_icse_*` / `_isc_`) flow through identically; question text comes
from the dual-corpus content loader.

Tables are created idempotently; no migration framework dependency.
"""

from __future__ import annotations

import logging
import os
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from sqlalchemy import text

from backend.database import get_sync_engine

log = logging.getLogger(__name__)

_SCHEMA = """
CREATE TABLE IF NOT EXISTS review_schedule (
    student_id    VARCHAR(64)  NOT NULL,
    node_id       VARCHAR(96)  NOT NULL,
    subject       VARCHAR(48),
    class_level   INT,
    interval_days INT          NOT NULL DEFAULT 1,
    due_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),
    streak        INT          NOT NULL DEFAULT 0,
    lapses        INT          NOT NULL DEFAULT 0,
    last_result   BOOLEAN,
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    PRIMARY KEY (student_id, node_id)
);
CREATE INDEX IF NOT EXISTS review_due_idx ON review_schedule (student_id, due_at);
"""

_MAX_INTERVAL = 16


def _ensure_tables() -> None:
    with get_sync_engine().begin() as cx:
        cx.execute(text(_SCHEMA))


def schedule_after_answer(student_id: str, node_id: str, correct: bool,
                          subject: str = "", class_level: int = 0) -> None:
    """Upsert the topic's next retrieval after one answered question.

    Correct -> interval doubles (capped), streak++. Wrong -> 1-day reset,
    lapse recorded. Never raises: review scheduling must not break a submit.
    """
    try:
        now = datetime.now(timezone.utc)
        with get_sync_engine().begin() as cx:
            row = cx.execute(text(
                "SELECT interval_days, streak FROM review_schedule "
                "WHERE student_id=:s AND node_id=:n"),
                {"s": student_id, "n": node_id}).first()
            if row is None:
                interval, streak = (1, 1) if correct else (1, 0)
                lapses = 0 if correct else 1
            else:
                interval, streak = int(row[0]), int(row[1])
                if correct:
                    interval = min(_MAX_INTERVAL, max(1, interval * 2))
                    streak += 1
                else:
                    interval, streak, lapses = 1, 0, (
                        0)  # lapses updated below via SQL for existing rows
                lapses = 0 if correct else 1
            cx.execute(text(
                "INSERT INTO review_schedule (student_id, node_id, subject, "
                "class_level, interval_days, due_at, streak, lapses, "
                "last_result, updated_at) VALUES (:s, :n, :sub, :cl, :iv, "
                ":due, :st, :la, :res, :now) "
                "ON CONFLICT (student_id, node_id) DO UPDATE SET "
                "interval_days=:iv, due_at=:due, streak=:st, lapses="
                "review_schedule.lapses+:la, last_result=:res, "
                "subject=COALESCE(NULLIF(:sub,''),review_schedule.subject), "
                "class_level=COALESCE(NULLIF(:cl,0),review_schedule.class_level), "
                "updated_at=:now"),
                {"s": student_id, "n": node_id, "sub": subject or "",
                 "cl": class_level or 0, "iv": interval,
                 "due": now + timedelta(days=interval), "st": streak,
                 "la": lapses, "res": correct, "now": now})
    except Exception:
        log.exception("review schedule upsert failed for %s/%s",
                      student_id, node_id)


def _questions_for_nodes(nodes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Pull one diagnostic Q/A per node via the dual-corpus index.

    Uses the same loader the content router uses, so CBSE and CISCE nodes
    both resolve. Falls back to no-question rows (node_id only) if the
    index is unavailable — the FE renders those as plain recall prompts.
    """
    out: List[Dict[str, Any]] = []
    try:
        from backend.services.enhanced_nodes import load_index
        idx = load_index()
        for item in nodes:
            node_id = item["node_id"]
            q = a = None
            try:
                node = idx.get(node_id) or {}
                diags = node.get("diagnostics") or []
                if diags:
                    q = diags[0].get("q") or diags[0].get("question") or None
                    a = diags[0].get("a") or diags[0].get("answer") or None
            except Exception:
                pass
            out.append({**item, "question": q, "answer": a,
                        "title": (idx.get(node_id) or {}).get("title") or ""})
    except Exception:
        log.exception("review question fetch failed; returning bare nodes")
        return [dict(x, question=None, answer=None) for x in nodes]
    return out


def due_warmup(student_id: str, count: int = 2,
               class_level: int = 0) -> List[Dict[str, Any]]:
    """The mission warm-up: the `count` most-due retrievals.

    Due items first (oldest due_at wins); if the queue is thin, the most
    recently answered topics fill the slot so the warm-up never sits empty
    for an active student. New students with no history get [] — the FE
    skips the warm-up beat entirely (nothing to retrieve yet).
    """
    try:
        _ensure_tables()
    except Exception:
        log.exception("review tables unavailable")
        return []
    now = datetime.now(timezone.utc)
    try:
        with get_sync_engine().begin() as cx:
            rows = cx.execute(text(
                "SELECT node_id, subject, class_level, streak, due_at "
                "FROM review_schedule WHERE student_id=:s "
                "AND (:cl=0 OR class_level=:cl) "
                "ORDER BY due_at ASC LIMIT :lim"),
                {"s": student_id, "cl": class_level or 0,
                 "lim": max(1, int(count))}).mappings().all()
        if not rows:
            return []
        nodes = [{"node_id": r["node_id"], "subject": r["subject"],
                  "class_level": r["class_level"], "streak": r["streak"],
                  "overdue_days": max(0, (now - r["due_at"]).days)}
                 for r in rows]
        return _questions_for_nodes(nodes)
    except Exception:
        log.exception("review warmup query failed")
        return []


def review_stats(student_id: str) -> Dict[str, Any]:
    """Small health snapshot for the FE (due today, queue depth)."""
    try:
        _ensure_tables()
        now = datetime.now(timezone.utc)
        with get_sync_engine().begin() as cx:
            row = cx.execute(text(
                "SELECT count(*) FROM review_schedule WHERE student_id=:s"),
                {"s": student_id}).scalar()
            due = cx.execute(text(
                "SELECT count(*) FROM review_schedule WHERE student_id=:s "
                "AND due_at <= :now"),
                {"s": student_id, "now": now}).scalar()
        return {"tracked": int(row or 0), "due": int(due or 0)}
    except Exception:
        return {"tracked": 0, "due": 0}
