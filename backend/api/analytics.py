"""
Analytics API Router — reads learning analytics from ClickHouse.

Endpoints:
  GET  /api/analytics/health              → ClickHouse connectivity check
  GET  /api/analytics/student/{id}/stats  → Student summary stats
  GET  /api/analytics/student/{id}/timeline → Recent events for a student
  GET  /api/analytics/subject/{subject}/summary → Subject-level aggregate
"""

from __future__ import annotations

import logging
from typing import Any

import urllib.request
import urllib.error
import base64
import json

from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/analytics", tags=["analytics"])

import os

CLICKHOUSE_URL = os.environ.get("CLICKHOUSE_URL", "http://localhost:8123")
CH_USER = os.environ.get("CLICKHOUSE_USER", "dream_user")
CH_PASSWORD = os.environ.get("CLICKHOUSE_PASSWORD", "dream_ch_2024")


def _ch_query(sql: str) -> list[dict[str, Any]]:
    """Execute a SELECT query against ClickHouse and return rows as dicts."""
    try:
        req = urllib.request.Request(
            f"{CLICKHOUSE_URL}/?query={urllib.parse.quote(sql)}",
            method="GET",
        )
        creds = base64.b64encode(f"{CH_USER}:{CH_PASSWORD}".encode()).decode()
        req.add_header("Authorization", f"Basic {creds}")
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read().decode("utf-8").strip()
        if not data:
            return []
        # ClickHouse JSONEachRow format
        return [json.loads(line) for line in data.split("\n") if line.strip()]
    except Exception as exc:
        logger.warning("ClickHouse query failed: %s", exc)
        return []


def _ch_query_json(sql: str) -> list[dict[str, Any]]:
    """Execute a SELECT query and return results using JSON format."""
    try:
        full_url = f"{CLICKHOUSE_URL}/?query={urllib.parse.quote(sql)}+FORMAT+JSON"
        req = urllib.request.Request(full_url, method="GET")
        creds = base64.b64encode(f"{CH_USER}:{CH_PASSWORD}".encode()).decode()
        req.add_header("Authorization", f"Basic {creds}")
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data.get("data", [])
    except Exception as exc:
        logger.warning("ClickHouse query failed: %s", exc)
        return []


import urllib.parse


@router.get("/health", response_model=dict, summary="Check ClickHouse connectivity")
async def analytics_health() -> dict:
    """Check if ClickHouse is reachable and tables exist."""
    try:
        req = urllib.request.Request(f"{CLICKHOUSE_URL}/ping", method="GET")
        with urllib.request.urlopen(req, timeout=5) as resp:
            ping = resp.read().decode().strip()
        tables = _ch_query_json(
            "SELECT name FROM system.tables WHERE database='dream_analytics'"
        )
        table_names = [t.get("name", "") for t in tables]
        return {
            "status": "ok" if ping == "Ok." else "degraded",
            "clickhouse": ping,
            "tables": table_names,
        }
    except Exception as exc:
        return {"status": "error", "error": str(exc)}


@router.get("/student/{student_id}/stats", response_model=dict,
            summary="Get student analytics summary")
async def student_stats(student_id: str) -> dict:
    """Get aggregate stats for a student from ClickHouse."""
    rows = _ch_query_json(f"""
        SELECT
            count() as total_events,
            countIf(event_type='question_answered') as questions_answered,
            countIf(event_type='question_answered' AND is_correct=1) as correct_answers,
            countIf(event_type='lesson_completed') as lessons_completed,
            countIf(event_type='mastery_achieved') as mastery_count,
            sumIf(marks_awarded, event_type='question_answered') as total_marks,
            sumIf(max_marks, event_type='question_answered') as max_marks_possible,
            avgIf(time_spent_seconds, event_type='question_answered' AND time_spent_seconds > 0) as avg_time_seconds
        FROM dream_analytics.learning_events
        WHERE user_id = '{student_id}'
    """)
    if rows:
        return {"student_id": student_id, "stats": rows[0]}
    return {"student_id": student_id, "stats": {}, "message": "No events found."}


@router.get("/student/{student_id}/timeline", response_model=list,
            summary="Get recent events for a student")
async def student_timeline(
    student_id: str,
    limit: int = Query(default=50, ge=1, le=500),
) -> list:
    """Get recent learning events for a student."""
    rows = _ch_query_json(f"""
        SELECT event_id, event_type, timestamp, subject, question_id,
               is_correct, marks_awarded, time_spent_seconds, mastery_after
        FROM dream_analytics.learning_events
        WHERE user_id = '{student_id}'
        ORDER BY timestamp DESC
        LIMIT {limit}
    """)
    return rows


@router.get("/subject/{subject}/summary", response_model=dict,
            summary="Get subject-level analytics")
async def subject_summary(subject: str) -> dict:
    """Get aggregate analytics for a subject."""
    rows = _ch_query_json(f"""
        SELECT
            count() as total_events,
            countIf(is_correct=1) as correct,
            countIf(is_correct=0) as incorrect,
            avg(marks_awarded) as avg_marks,
            avg(time_spent_seconds) as avg_time,
            avg(mastery_after) as avg_mastery
        FROM dream_analytics.learning_events
        WHERE subject = '{subject}' AND event_type = 'question_answered'
    """)
    if rows:
        return {"subject": subject, "summary": rows[0]}
    return {"subject": subject, "summary": {}, "message": "No data for this subject."}


@router.post("/irt/sync", response_model=dict,
             summary="Run IRT feedback loop — sync difficulty params from ClickHouse to PostgreSQL")
async def irt_sync() -> dict:
    """Trigger the IRT feedback loop to update question difficulty/discrimination
    parameters based on empirical student response data from ClickHouse.
    """
    try:
        from services.irt_feedback_loop import IRTFeedbackLoop
        loop = IRTFeedbackLoop()
        updated = loop.sync_difficulty_params()
        report = loop.get_sync_report()
        return {
            "status": "ok",
            "updated_count": updated,
            "total_with_data": report["total_questions_with_data"],
            "min_sample_size": report["min_sample_size"],
        }
    except Exception as exc:
        logger.error("IRT sync failed: %s", exc, exc_info=True)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))


@router.get("/irt/report", response_model=dict,
            summary="Get IRT feedback loop report (preview without applying)")
async def irt_report() -> dict:
    """Preview what the IRT feedback loop would sync — does NOT modify any data."""
    try:
        from services.irt_feedback_loop import IRTFeedbackLoop
        loop = IRTFeedbackLoop()
        return loop.get_sync_report()
    except Exception as exc:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))
