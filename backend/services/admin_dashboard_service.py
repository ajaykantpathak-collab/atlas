"""Phase 8.5: Admin dashboard API with analytics views.

Provides aggregated analytics for the admin dashboard:
  - Real-time mastery distribution
  - Question difficulty stats
  - LLM cost breakdown
  - Common misconceptions
  - Socratic interaction stats
  - Weekly engagement metrics

Usage:
    from backend.services.admin_dashboard_service import AdminDashboardService

    dashboard = AdminDashboardService()
    mastery = dashboard.get_mastery_distribution()
    costs = dashboard.get_llm_costs(days=7)
"""

import os
import base64
import urllib.request
import logging
from typing import Optional

logger = logging.getLogger(__name__)


class AdminDashboardService:
    """Provides aggregated analytics for the admin dashboard.

    Reads from ClickHouse materialized views and returns structured
    data for the admin dashboard frontend.
    """

    def __init__(self):
        self.ch_url = os.environ.get("CLICKHOUSE_URL", "http://localhost:8123")
        self.ch_user = os.environ.get("CLICKHOUSE_USER", "dream_user")
        self.ch_password = os.environ.get("CLICKHOUSE_PASSWORD", "dream_ch_2024")

    def _query_clickhouse(self, sql: str) -> list:
        """Execute a SELECT query and return parsed results."""
        creds = base64.b64encode(f"{self.ch_user}:{self.ch_password}".encode()).decode()
        req = urllib.request.Request(self.ch_url, data=sql.encode("utf-8"), method="POST")
        req.add_header("Authorization", f"Basic {creds}")

        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                data = response.read().decode("utf-8")
                lines = data.strip().split("\n")
                if not lines or lines[0] == "":
                    return []
                return [line.split("\t") for line in lines]
        except Exception as e:
            logger.warning(f"ClickHouse query failed: {e}")
            return []

    def get_mastery_distribution(self) -> list:
        """Get mastery distribution by subject and class.

        Returns:
            List of dicts with subject, class_level, mastery bucket counts.
        """
        sql = """
            SELECT
                subject,
                class_level,
                low_mastery_count,
                medium_mastery_count,
                high_mastery_count,
                total_students,
                avg_mastery
            FROM dream_analytics.mastery_distribution
            ORDER BY subject, class_level
        """
        results = self._query_clickhouse(sql)

        return [
            {
                "subject": r[0],
                "class_level": int(r[1]),
                "low_mastery": int(r[2]),
                "medium_mastery": int(r[3]),
                "high_mastery": int(r[4]),
                "total_students": int(r[5]),
                "avg_mastery": float(r[6]) if len(r) > 6 else 0.0,
            }
            for r in results
        ]

    def get_difficulty_summary(self) -> list:
        """Get question difficulty summary by subject and class.

        Returns:
            List of dicts with difficulty stats.
        """
        sql = """
            SELECT
                subject,
                class_level,
                total_questions,
                questions_with_data,
                avg_difficulty,
                avg_pass_rate,
                avg_time_per_question
            FROM dream_analytics.difficulty_summary
            ORDER BY subject, class_level
        """
        results = self._query_clickhouse(sql)

        return [
            {
                "subject": r[0],
                "class_level": int(r[1]),
                "total_questions": int(r[2]),
                "questions_with_data": int(r[3]),
                "avg_difficulty": float(r[4]) if len(r) > 4 else 0.0,
                "avg_pass_rate": float(r[5]) if len(r) > 5 else 0.0,
                "avg_time_per_question": float(r[6]) if len(r) > 6 else 0.0,
            }
            for r in results
        ]

    def get_llm_costs(self, days: int = 7) -> list:
        """Get LLM cost breakdown for the last N days.

        Returns:
            List of dicts with cost stats per call_type and model.
        """
        sql = f"""
            SELECT
                call_type,
                model,
                total_calls,
                total_tokens,
                total_cost,
                avg_latency,
                total_errors
            FROM dream_analytics.llm_cost_summary
            ORDER BY total_cost DESC
        """
        results = self._query_clickhouse(sql)

        return [
            {
                "call_type": r[0],
                "model": r[1],
                "total_calls": int(r[2]),
                "total_tokens": int(r[3]),
                "total_cost": float(r[4]) if len(r) > 4 else 0.0,
                "avg_latency": float(r[5]) if len(r) > 5 else 0.0,
                "total_errors": int(r[6]) if len(r) > 6 else 0,
            }
            for r in results
        ]

    def get_event_counts(self, hours: int = 24) -> dict:
        """Get event counts by type in the last N hours.

        Returns:
            Dict mapping event_type to count.
        """
        sql = f"""
            SELECT event_type, count() as cnt
            FROM dream_analytics.learning_events
            WHERE timestamp > now() - INTERVAL {hours} HOUR
            GROUP BY event_type
            ORDER BY cnt DESC
        """
        results = self._query_clickhouse(sql)

        return {r[0]: int(r[1]) for r in results}

    def get_weekly_engagement(self) -> list:
        """Get weekly engagement metrics per student.

        Returns:
            List of dicts with engagement stats.
        """
        sql = """
            SELECT
                week_start,
                user_id,
                total_time_seconds,
                questions_answered,
                lessons_completed,
                reviews_completed,
                exams_submitted,
                hints_requested,
                socratic_interactions,
                mastery_achievements,
                correct_answers
            FROM dream_analytics.weekly_engagement
            WHERE week_start >= today() - 28
            ORDER BY week_start DESC, total_time_seconds DESC
            LIMIT 100
        """
        results = self._query_clickhouse(sql)

        return [
            {
                "week_start": r[0],
                "user_id": r[1],
                "total_time_seconds": int(r[2]),
                "questions_answered": int(r[3]),
                "lessons_completed": int(r[4]),
                "reviews_completed": int(r[5]),
                "exams_submitted": int(r[6]),
                "hints_requested": int(r[7]),
                "socratic_interactions": int(r[8]),
                "mastery_achievements": int(r[9]),
                "correct_answers": int(r[10]),
            }
            for r in results
        ]

    def get_common_misconceptions(self, days: int = 7) -> list:
        """Get most common misconceptions in the last N days.

        Returns:
            List of dicts with misconception stats.
        """
        sql = f"""
            SELECT
                subject,
                node_id,
                sum(misconception_count) as total_count,
                max(unique_students) as unique_students
            FROM dream_analytics.misconception_stats
            WHERE date >= today() - {days}
            GROUP BY subject, node_id
            ORDER BY total_count DESC
            LIMIT 20
        """
        results = self._query_clickhouse(sql)

        return [
            {
                "subject": r[0],
                "node_id": r[1],
                "total_count": int(r[2]),
                "unique_students": int(r[3]) if len(r) > 3 else 0,
            }
            for r in results
        ]

    def get_socratic_stats(self, days: int = 7) -> list:
        """Get Socratic interaction stats for the last N days.

        Returns:
            List of dicts with Socratic stats by PCR level.
        """
        sql = f"""
            SELECT
                pcr_level,
                sum(interaction_count) as total_interactions,
                avg(avg_mastery_before) as avg_mastery_before,
                avg(avg_mastery_after) as avg_mastery_after,
                sum(hint_level_1_count) as hint_1,
                sum(hint_level_2_count) as hint_2,
                sum(hint_level_3_count) as hint_3,
                sum(hint_level_4_count) as hint_4
            FROM dream_analytics.socratic_stats
            WHERE date >= today() - {days}
            GROUP BY pcr_level
            ORDER BY pcr_level
        """
        results = self._query_clickhouse(sql)

        return [
            {
                "pcr_level": r[0],
                "total_interactions": int(r[1]),
                "avg_mastery_before": float(r[2]) if len(r) > 2 else 0.0,
                "avg_mastery_after": float(r[3]) if len(r) > 3 else 0.0,
                "hint_1_count": int(r[4]) if len(r) > 4 else 0,
                "hint_2_count": int(r[5]) if len(r) > 5 else 0,
                "hint_3_count": int(r[6]) if len(r) > 6 else 0,
                "hint_4_count": int(r[7]) if len(r) > 7 else 0,
            }
            for r in results
        ]

    def get_overview(self) -> dict:
        """Get a complete dashboard overview.

        Returns:
            Dict with all dashboard data.
        """
        return {
            "event_counts_24h": self.get_event_counts(hours=24),
            "mastery_distribution": self.get_mastery_distribution(),
            "difficulty_summary": self.get_difficulty_summary(),
            "llm_costs_7d": self.get_llm_costs(days=7),
            "common_misconceptions_7d": self.get_common_misconceptions(days=7),
            "socratic_stats_7d": self.get_socratic_stats(days=7),
        }
