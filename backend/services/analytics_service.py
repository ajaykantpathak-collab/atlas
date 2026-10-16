"""Phase 8.1: Analytics service — event emission to ClickHouse.

Emits learning events to ClickHouse for full observability of student
learning and system performance.

Event types:
  - question_answered: Student answered a question
  - lesson_started: Student started a lesson
  - lesson_completed: Student completed a lesson
  - drill_tier_advanced: Student advanced to next drill tier
  - exam_submitted: Student submitted an exam
  - review_completed: Student completed a spaced review
  - gap_detected: System detected a knowledge gap
  - prereq_taught: System taught a prerequisite
  - mastery_achieved: Student achieved mastery on a node
  - socratic_interaction: Student interacted with Socratic tutor
  - hint_requested: Student requested a hint
  - misconception_diagnosed: System diagnosed a misconception

Usage:
    from backend.services.analytics_service import AnalyticsService

    analytics = AnalyticsService()
    analytics.emit_question_answered(
        user_id="student_123",
        question_id="q_001",
        node_id="c10_bio_008",
        subject="bio",
        class_level=10,
        is_correct=True,
        marks_awarded=3,
        max_marks=3,
        time_spent_seconds=45,
        question_type="mcq",
    )
"""

import os
import json
import time
import uuid
import logging
from typing import Optional
from dataclasses import dataclass, field
from datetime import datetime

logger = logging.getLogger(__name__)


@dataclass
class AnalyticsEvent:
    """A single analytics event."""
    event_id: str
    event_type: str
    user_id: str
    timestamp: datetime = field(default_factory=datetime.now)
    # Optional fields (depend on event_type)
    question_id: str = ""
    node_id: str = ""
    subject: str = ""
    class_level: int = 0
    is_correct: int = 0  # 0 or 1
    marks_awarded: float = 0.0
    max_marks: int = 0
    time_spent_seconds: int = 0
    question_type: str = ""
    # IRT fields
    difficulty_b: float = 0.0
    discrimination_a: float = 0.0
    guessing_c: float = 0.0
    student_theta_before: float = 0.0
    student_theta_after: float = 0.0
    # Socratic fields
    mastery_before: float = 0.0
    mastery_after: float = 0.0
    hint_level: int = 0
    pcr_level: str = ""  # low, medium, high
    # Metadata
    metadata: str = "{}"  # JSON string for extra fields


class AnalyticsService:
    """Emits learning analytics events to ClickHouse.

    Events are stored in the dream_analytics.student_interactions table
    (extended) and additional tables for non-question events.
    """

    def __init__(self, clickhouse_url: Optional[str] = None):
        self.clickhouse_url = clickhouse_url or os.environ.get(
            "CLICKHOUSE_URL", "http://localhost:8123"
        )
        self.ch_user = os.environ.get("CLICKHOUSE_USER", "dream_user")
        # no default password: a guessed credential fails silently forever;
        # the env must carry it (compose backend-env / dev launchers do)
        self.ch_password = os.environ.get("CLICKHOUSE_PASSWORD", "")
        self._ch_disabled = not self.ch_password
        if self._ch_disabled:
            logging.getLogger(__name__).warning(
                "CLICKHOUSE_PASSWORD not set - analytics emissions disabled "
                "(stats endpoints will show no events)")
        self._ensure_tables()

    def _http_insert(self, table: str, columns: list, values: list):
        """Insert a row into ClickHouse via HTTP interface."""
        import urllib.request
        import urllib.error
        import base64

        # Build INSERT statement
        cols = ", ".join(columns)
        vals = ", ".join([self._format_value(v) for v in values])
        sql = f"INSERT INTO {table} ({cols}) VALUES ({vals})"

        try:
            req = urllib.request.Request(self.clickhouse_url, data=sql.encode("utf-8"), method="POST")
            creds = base64.b64encode(f"{self.ch_user}:{self.ch_password}".encode()).decode()
            req.add_header("Authorization", f"Basic {creds}")
            with urllib.request.urlopen(req, timeout=5) as response:
                response.read()
        except urllib.error.URLError as e:
            logger.warning(f"ClickHouse insert failed: {e}")
        except Exception as e:
            logger.warning(f"ClickHouse error: {e}")

    @staticmethod
    def _format_value(v) -> str:
        """Format a Python value for ClickHouse SQL."""
        if v is None:
            return "NULL"
        if isinstance(v, bool):
            return "1" if v else "0"
        if isinstance(v, (int, float)):
            return str(v)
        if isinstance(v, datetime):
            return f"'{v.strftime('%Y-%m-%d %H:%M:%S')}'"
        # String — escape single quotes
        escaped = str(v).replace("'", "\\'")
        return f"'{escaped}'"

    def _ensure_tables(self):
        """Ensure analytics tables exist in ClickHouse."""
        import urllib.request
        import urllib.error
        import base64

        # Extended student_interactions table (additive — new columns)
        # We create a new table for general events alongside the existing one
        ddl_statements = [
            # General learning events table
            """
            CREATE TABLE IF NOT EXISTS dream_analytics.learning_events
            (
                event_id String,
                event_type String,
                user_id String,
                timestamp DateTime DEFAULT now(),
                question_id String DEFAULT '',
                node_id String DEFAULT '',
                subject String DEFAULT '',
                class_level UInt8 DEFAULT 0,
                is_correct UInt8 DEFAULT 0,
                marks_awarded Float32 DEFAULT 0,
                max_marks UInt8 DEFAULT 0,
                time_spent_seconds UInt32 DEFAULT 0,
                question_type String DEFAULT '',
                difficulty_b Float32 DEFAULT 0,
                discrimination_a Float32 DEFAULT 0,
                guessing_c Float32 DEFAULT 0,
                student_theta_before Float32 DEFAULT 0,
                student_theta_after Float32 DEFAULT 0,
                mastery_before Float32 DEFAULT 0,
                mastery_after Float32 DEFAULT 0,
                hint_level UInt8 DEFAULT 0,
                pcr_level String DEFAULT '',
                metadata String DEFAULT '{}'
            )
            ENGINE = MergeTree()
            ORDER BY (timestamp, user_id, event_type)
            PARTITION BY toYYYYMM(timestamp)
            """,
            # LLM call traces table
            """
            CREATE TABLE IF NOT EXISTS dream_analytics.llm_traces
            (
                trace_id String,
                call_type String,
                model String,
                user_id String DEFAULT '',
                timestamp DateTime DEFAULT now(),
                latency_ms Float32 DEFAULT 0,
                input_tokens UInt32 DEFAULT 0,
                output_tokens UInt32 DEFAULT 0,
                total_tokens UInt32 DEFAULT 0,
                cost_usd Float32 DEFAULT 0,
                success UInt8 DEFAULT 1,
                error_message String DEFAULT '',
                metadata String DEFAULT '{}'
            )
            ENGINE = MergeTree()
            ORDER BY (timestamp, call_type, model)
            PARTITION BY toYYYYMM(timestamp)
            """,
        ]

        for ddl in ddl_statements:
            try:
                req = urllib.request.Request(self.clickhouse_url, data=ddl.strip().encode("utf-8"), method="POST")
                creds = base64.b64encode(f"{self.ch_user}:{self.ch_password}".encode()).decode()
                req.add_header("Authorization", f"Basic {creds}")
                with urllib.request.urlopen(req, timeout=10) as response:
                    response.read()
            except Exception as e:
                logger.warning(f"ClickHouse DDL failed: {e}")

    # ── Event emission methods ────────────────────────────────────── #

    def _emit_event(self, event: AnalyticsEvent):
        """Emit a general learning event to ClickHouse."""
        columns = [
            "event_id", "event_type", "user_id", "timestamp",
            "question_id", "node_id", "subject", "class_level",
            "is_correct", "marks_awarded", "max_marks",
            "time_spent_seconds", "question_type",
            "difficulty_b", "discrimination_a", "guessing_c",
            "student_theta_before", "student_theta_after",
            "mastery_before", "mastery_after",
            "hint_level", "pcr_level", "metadata",
        ]
        values = [
            event.event_id, event.event_type, event.user_id, event.timestamp,
            event.question_id, event.node_id, event.subject, event.class_level,
            event.is_correct, event.marks_awarded, event.max_marks,
            event.time_spent_seconds, event.question_type,
            event.difficulty_b, event.discrimination_a, event.guessing_c,
            event.student_theta_before, event.student_theta_after,
            event.mastery_before, event.mastery_after,
            event.hint_level, event.pcr_level, event.metadata,
        ]
        self._http_insert("dream_analytics.learning_events", columns, values)

    def emit_question_answered(
        self,
        user_id: str,
        question_id: str,
        node_id: str,
        subject: str,
        class_level: int,
        is_correct: bool,
        marks_awarded: float = 0,
        max_marks: int = 0,
        time_spent_seconds: int = 0,
        question_type: str = "",
        difficulty_b: float = 0,
        discrimination_a: float = 0,
        guessing_c: float = 0,
        student_theta_before: float = 0,
        student_theta_after: float = 0,
        mastery_before: float = 0,
        mastery_after: float = 0,
    ):
        """Emit a question_answered event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="question_answered",
            user_id=user_id,
            question_id=question_id,
            node_id=node_id,
            subject=subject,
            class_level=class_level,
            is_correct=1 if is_correct else 0,
            marks_awarded=marks_awarded,
            max_marks=max_marks,
            time_spent_seconds=time_spent_seconds,
            question_type=question_type,
            difficulty_b=difficulty_b,
            discrimination_a=discrimination_a,
            guessing_c=guessing_c,
            student_theta_before=student_theta_before,
            student_theta_after=student_theta_after,
            mastery_before=mastery_before,
            mastery_after=mastery_after,
        )
        self._emit_event(event)

    def emit_lesson_started(self, user_id: str, node_id: str, subject: str, class_level: int):
        """Emit a lesson_started event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="lesson_started",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            class_level=class_level,
        )
        self._emit_event(event)

    def emit_lesson_completed(self, user_id: str, node_id: str, subject: str, class_level: int, time_spent_seconds: int = 0):
        """Emit a lesson_completed event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="lesson_completed",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            class_level=class_level,
            time_spent_seconds=time_spent_seconds,
        )
        self._emit_event(event)

    def emit_drill_tier_advanced(self, user_id: str, node_id: str, new_tier: int):
        """Emit a drill_tier_advanced event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="drill_tier_advanced",
            user_id=user_id,
            node_id=node_id,
            metadata=json.dumps({"new_tier": new_tier}),
        )
        self._emit_event(event)

    def emit_exam_submitted(self, user_id: str, subject: str, class_level: int, total_marks: float, max_marks: int, time_spent_seconds: int = 0):
        """Emit an exam_submitted event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="exam_submitted",
            user_id=user_id,
            subject=subject,
            class_level=class_level,
            marks_awarded=total_marks,
            max_marks=max_marks,
            time_spent_seconds=time_spent_seconds,
        )
        self._emit_event(event)

    def emit_review_completed(self, user_id: str, node_id: str, subject: str, is_correct: bool, time_spent_seconds: int = 0):
        """Emit a review_completed event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="review_completed",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            is_correct=1 if is_correct else 0,
            time_spent_seconds=time_spent_seconds,
        )
        self._emit_event(event)

    def emit_gap_detected(self, user_id: str, node_id: str, gap_node_id: str, subject: str):
        """Emit a gap_detected event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="gap_detected",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            metadata=json.dumps({"gap_node_id": gap_node_id}),
        )
        self._emit_event(event)

    def emit_prereq_taught(self, user_id: str, node_id: str, prereq_node_id: str, subject: str):
        """Emit a prereq_taught event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="prereq_taught",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            metadata=json.dumps({"prereq_node_id": prereq_node_id}),
        )
        self._emit_event(event)

    def emit_mastery_achieved(self, user_id: str, node_id: str, subject: str, mastery: float):
        """Emit a mastery_achieved event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="mastery_achieved",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            mastery_after=mastery,
        )
        self._emit_event(event)

    def emit_socratic_interaction(
        self,
        user_id: str,
        node_id: str,
        mastery_before: float,
        mastery_after: float,
        hint_level: int,
        pcr_level: str,
        quality_score: float = 0,
    ):
        """Emit a socratic_interaction event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="socratic_interaction",
            user_id=user_id,
            node_id=node_id,
            mastery_before=mastery_before,
            mastery_after=mastery_after,
            hint_level=hint_level,
            pcr_level=pcr_level,
            metadata=json.dumps({"quality_score": quality_score}),
        )
        self._emit_event(event)

    def emit_hint_requested(self, user_id: str, node_id: str, hint_level: int, mastery: float):
        """Emit a hint_requested event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="hint_requested",
            user_id=user_id,
            node_id=node_id,
            hint_level=hint_level,
            mastery_before=mastery,
        )
        self._emit_event(event)

    def emit_misconception_diagnosed(self, user_id: str, node_id: str, subject: str, misconception_id: str):
        """Emit a misconception_diagnosed event."""
        event = AnalyticsEvent(
            event_id=str(uuid.uuid4()),
            event_type="misconception_diagnosed",
            user_id=user_id,
            node_id=node_id,
            subject=subject,
            metadata=json.dumps({"misconception_id": misconception_id}),
        )
        self._emit_event(event)

    # ── LLM trace emission ────────────────────────────────────────── #

    def emit_llm_trace(
        self,
        call_type: str,
        model: str,
        latency_ms: float,
        input_tokens: int = 0,
        output_tokens: int = 0,
        total_tokens: int = 0,
        cost_usd: float = 0,
        success: bool = True,
        error_message: str = "",
        user_id: str = "",
        metadata: dict = None,
    ):
        """Emit an LLM call trace to ClickHouse.

        Args:
            call_type: Type of LLM call (tutor_reply, answer_grading,
                       routing_fallback, hindi_translation, etc.)
            model: Model name (e.g., deepseek-v4-flash)
            latency_ms: Latency in milliseconds
            input_tokens: Input token count
            output_tokens: Output token count
            total_tokens: Total token count
            cost_usd: Estimated cost in USD
            success: Whether the call succeeded
            error_message: Error message if failed
            user_id: Associated user ID
            metadata: Additional metadata dict
        """
        import urllib.request
        import urllib.parse as url_parse

        columns = [
            "trace_id", "call_type", "model", "user_id", "timestamp",
            "latency_ms", "input_tokens", "output_tokens", "total_tokens",
            "cost_usd", "success", "error_message", "metadata",
        ]
        values = [
            str(uuid.uuid4()), call_type, model, user_id, datetime.now(),
            latency_ms, input_tokens, output_tokens, total_tokens,
            cost_usd, 1 if success else 0, error_message,
            json.dumps(metadata or {}),
        ]
        self._http_insert("dream_analytics.llm_traces", columns, values)

    # ── Query methods ─────────────────────────────────────────────── #

    def _query_clickhouse(self, sql: str) -> list:
        """Execute a SELECT query and return results."""
        import urllib.request
        import urllib.parse as url_parse
        import base64

        try:
            req = urllib.request.Request(self.clickhouse_url, data=sql.encode("utf-8"), method="POST")
            creds = base64.b64encode(f"{self.ch_user}:{self.ch_password}".encode()).decode()
            req.add_header("Authorization", f"Basic {creds}")
            with urllib.request.urlopen(req, timeout=10) as response:
                data = response.read().decode("utf-8")
                # Parse tab-separated ClickHouse output
                lines = data.strip().split("\n")
                if not lines or lines[0] == "":
                    return []
                return lines
        except Exception as e:
            logger.warning(f"ClickHouse query failed: {e}")
            return []

    def get_event_counts(self, hours: int = 24) -> dict:
        """Get event counts by type in the last N hours."""
        sql = f"""
            SELECT event_type, count() as cnt
            FROM dream_analytics.learning_events
            WHERE timestamp > now() - INTERVAL {hours} HOUR
            GROUP BY event_type
            ORDER BY cnt DESC
        """
        results = self._query_clickhouse(sql)
        counts = {}
        for line in results:
            parts = line.split("\t")
            if len(parts) == 2:
                counts[parts[0]] = int(parts[1])
        return counts

    def get_llm_cost_summary(self, hours: int = 24) -> dict:
        """Get LLM cost summary for the last N hours."""
        sql = f"""
            SELECT
                call_type,
                model,
                count() as calls,
                sum(total_tokens) as tokens,
                sum(cost_usd) as cost,
                avg(latency_ms) as avg_latency
            FROM dream_analytics.llm_traces
            WHERE timestamp > now() - INTERVAL {hours} HOUR
            GROUP BY call_type, model
            ORDER BY cost DESC
        """
        results = self._query_clickhouse(sql)
        summary = []
        for line in results:
            parts = line.split("\t")
            if len(parts) == 6:
                summary.append({
                    "call_type": parts[0],
                    "model": parts[1],
                    "calls": int(parts[2]),
                    "tokens": int(parts[3]),
                    "cost": float(parts[4]),
                    "avg_latency": float(parts[5]),
                })
        return {"summary": summary}
