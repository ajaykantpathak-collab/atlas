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


# ---------------------------------------------------------------------------
# Dashboard aggregates — response shapes mirror
# frontend/services/analytics.service.ts (DashboardOverview et al).
# ClickHouse down ⇒ empty structures (real zeros, never invented data).
# ---------------------------------------------------------------------------

def _int(v: Any) -> int:
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return 0


def _float(v: Any) -> float:
    try:
        return round(float(v), 4)
    except (TypeError, ValueError):
        return 0.0


@router.get("/events", response_model=dict, summary="Event counts by type")
async def analytics_events(hours: int = Query(24, ge=1, le=24 * 30)) -> dict:
    rows = _ch_query_json(
        f"SELECT event_type, count() AS cnt FROM dream_analytics.learning_events "
        f"WHERE timestamp > now() - INTERVAL {int(hours)} HOUR "
        f"GROUP BY event_type ORDER BY cnt DESC"
    )
    return {r.get("event_type", "unknown"): _int(r.get("cnt")) for r in rows}


@router.get("/mastery-distribution", response_model=list,
            summary="Mastery buckets per subject and class")
async def analytics_mastery_distribution() -> list:
    rows = _ch_query_json(
        "SELECT subject, class_level,"
        " countIf(mastery_after < 0.4) AS low_mastery,"
        " countIf(mastery_after >= 0.4 AND mastery_after < 0.75) AS medium_mastery,"
        " countIf(mastery_after >= 0.75) AS high_mastery,"
        " uniqExact(user_id) AS total_students,"
        " avg(mastery_after) AS avg_mastery"
        " FROM dream_analytics.learning_events"
        " WHERE event_type IN ('question_answered','mastery_achieved')"
        " AND subject != ''"
        " GROUP BY subject, class_level ORDER BY subject, class_level"
    )
    return [{
        "subject": r.get("subject", ""),
        "class_level": _int(r.get("class_level")),
        "low_mastery": _int(r.get("low_mastery")),
        "medium_mastery": _int(r.get("medium_mastery")),
        "high_mastery": _int(r.get("high_mastery")),
        "total_students": _int(r.get("total_students")),
        "avg_mastery": _float(r.get("avg_mastery")),
    } for r in rows]


@router.get("/difficulty-summary", response_model=list,
            summary="Question difficulty and pass-rate per subject and class")
async def analytics_difficulty_summary() -> list:
    rows = _ch_query_json(
        "SELECT subject, class_level,"
        " uniqExact(question_id) AS total_questions,"
        " countIf(difficulty_b != 0) AS questions_with_data,"
        " avgIf(difficulty_b, difficulty_b != 0) AS avg_difficulty,"
        " avg(is_correct) AS avg_pass_rate,"
        " avg(time_spent_seconds) AS avg_time"
        " FROM dream_analytics.learning_events"
        " WHERE event_type = 'question_answered' AND subject != ''"
        " GROUP BY subject, class_level ORDER BY subject, class_level"
    )
    return [{
        "subject": r.get("subject", ""),
        "class_level": _int(r.get("class_level")),
        "total_questions": _int(r.get("total_questions")),
        "questions_with_data": _int(r.get("questions_with_data")),
        "avg_difficulty": _float(r.get("avg_difficulty")),
        "avg_pass_rate": _float(r.get("avg_pass_rate")),
        "avg_time_per_question": _float(r.get("avg_time")),
    } for r in rows]


@router.get("/llm-costs", response_model=list, summary="LLM cost rows (days window)")
async def analytics_llm_costs(days: int = Query(7, ge=1, le=365)) -> list:
    rows = _ch_query_json(
        f"SELECT call_type, model, count() AS total_calls,"
        f" sum(total_tokens) AS total_tokens, sum(cost_usd) AS total_cost,"
        f" avg(latency_ms) AS avg_latency, countIf(success = 0) AS total_errors"
        f" FROM dream_analytics.llm_traces"
        f" WHERE timestamp > now() - INTERVAL {int(days)} DAY"
        f" GROUP BY call_type, model ORDER BY total_cost DESC"
    )
    return [{
        "call_type": r.get("call_type", ""),
        "model": r.get("model", ""),
        "total_calls": _int(r.get("total_calls")),
        "total_tokens": _int(r.get("total_tokens")),
        "total_cost": _float(r.get("total_cost")),
        "avg_latency": _float(r.get("avg_latency")),
        "total_errors": _int(r.get("total_errors")),
    } for r in rows]


@router.get("/misconceptions", response_model=list,
            summary="Most-diagnosed misconceptions (days window)")
async def analytics_misconceptions(days: int = Query(7, ge=1, le=365)) -> list:
    rows = _ch_query_json(
        f"SELECT subject, node_id, count() AS total_count,"
        f" uniqExact(user_id) AS unique_students"
        f" FROM dream_analytics.learning_events"
        f" WHERE event_type = 'misconception_diagnosed'"
        f" AND timestamp > now() - INTERVAL {int(days)} DAY"
        f" GROUP BY subject, node_id ORDER BY total_count DESC LIMIT 50"
    )
    return [{
        "subject": r.get("subject", ""),
        "node_id": r.get("node_id", ""),
        "total_count": _int(r.get("total_count")),
        "unique_students": _int(r.get("unique_students")),
    } for r in rows]


@router.get("/socratic-stats", response_model=list,
            summary="Socratic interaction stats per PCR level (days window)")
async def analytics_socratic_stats(days: int = Query(7, ge=1, le=365)) -> list:
    rows = _ch_query_json(
        f"SELECT pcr_level, count() AS total_interactions,"
        f" avg(mastery_before) AS avg_before, avg(mastery_after) AS avg_after,"
        f" countIf(hint_level = 1) AS hint_1, countIf(hint_level = 2) AS hint_2,"
        f" countIf(hint_level = 3) AS hint_3, countIf(hint_level = 4) AS hint_4"
        f" FROM dream_analytics.learning_events"
        f" WHERE event_type = 'socratic_interaction'"
        f" AND timestamp > now() - INTERVAL {int(days)} DAY"
        f" GROUP BY pcr_level ORDER BY total_interactions DESC"
    )
    return [{
        "pcr_level": r.get("pcr_level", "") or "unknown",
        "total_interactions": _int(r.get("total_interactions")),
        "avg_mastery_before": _float(r.get("avg_before")),
        "avg_mastery_after": _float(r.get("avg_after")),
        "hint_1_count": _int(r.get("hint_1")),
        "hint_2_count": _int(r.get("hint_2")),
        "hint_3_count": _int(r.get("hint_3")),
        "hint_4_count": _int(r.get("hint_4")),
    } for r in rows]


@router.get("/weekly-engagement", response_model=list,
            summary="Per-user weekly engagement rollup")
async def analytics_weekly_engagement() -> list:
    rows = _ch_query_json(
        "SELECT toMonday(timestamp) AS week_start, user_id,"
        " sum(time_spent_seconds) AS total_time,"
        " countIf(event_type = 'question_answered') AS questions_answered,"
        " countIf(event_type = 'lesson_completed') AS lessons_completed,"
        " countIf(event_type = 'review_completed') AS reviews_completed,"
        " countIf(event_type = 'exam_submitted') AS exams_submitted,"
        " countIf(event_type = 'hint_requested') AS hints_requested,"
        " countIf(event_type = 'socratic_interaction') AS socratic_interactions,"
        " countIf(event_type = 'mastery_achieved') AS mastery_achievements,"
        " countIf(event_type = 'question_answered' AND is_correct = 1) AS correct_answers"
        " FROM dream_analytics.learning_events"
        " GROUP BY week_start, user_id ORDER BY week_start DESC LIMIT 500"
    )
    return [{
        "week_start": str(r.get("week_start", "")),
        "user_id": r.get("user_id", ""),
        "total_time_seconds": _int(r.get("total_time")),
        "questions_answered": _int(r.get("questions_answered")),
        "lessons_completed": _int(r.get("lessons_completed")),
        "reviews_completed": _int(r.get("reviews_completed")),
        "exams_submitted": _int(r.get("exams_submitted")),
        "hints_requested": _int(r.get("hints_requested")),
        "socratic_interactions": _int(r.get("socratic_interactions")),
        "mastery_achievements": _int(r.get("mastery_achievements")),
        "correct_answers": _int(r.get("correct_answers")),
    } for r in rows]


@router.get("/overview", response_model=dict,
            summary="Everything the analytics dashboard home needs, in one call")
async def analytics_overview() -> dict:
    return {
        "event_counts_24h": await analytics_events(hours=24),
        "mastery_distribution": await analytics_mastery_distribution(),
        "difficulty_summary": await analytics_difficulty_summary(),
        "llm_costs_7d": await analytics_llm_costs(days=7),
        "common_misconceptions_7d": await analytics_misconceptions(days=7),
        "socratic_stats_7d": await analytics_socratic_stats(days=7),
    }
