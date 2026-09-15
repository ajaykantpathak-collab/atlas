"""Phase 8.4: Feedback loop — ClickHouse difficulty stats → IRT updates.

Nightly job that syncs empirical IRT parameters from ClickHouse to
PostgreSQL. Only updates questions with sufficient data (sample_size >= 30).

Reads from: dream_analytics.question_difficulty_ext (ClickHouse)
Updates: board_questions.difficulty_b, discrimination_a (PostgreSQL)

Usage:
    from backend.services.irt_feedback_loop import IRTFeedbackLoop

    loop = IRTFeedbackLoop()
    updated = loop.sync_difficulty_params()
    print(f"Updated {updated} questions")
"""

import os
import logging
import urllib.request
import base64
import psycopg2
from typing import Optional

logger = logging.getLogger(__name__)


class IRTFeedbackLoop:
    """Syncs empirical IRT parameters from ClickHouse to PostgreSQL.

    This is a periodic batch job (run nightly) that:
      1. Reads aggregated difficulty stats from ClickHouse
      2. Updates IRT parameters in PostgreSQL for questions with
         sufficient data (sample_size >= 30)
      3. Logs how many questions were updated

    SAFETY: Only updates questions with sample_size >= 30.
            Clamps difficulty_b to [-3.0, 3.0] and discrimination_a to [0.0, 2.0].
            Does NOT delete or modify any other data.
    """

    MIN_SAMPLE_SIZE = 30
    DIFFICULTY_MIN = -3.0
    DIFFICULTY_MAX = 3.0
    DISCRIMINATION_MIN = 0.0
    DISCRIMINATION_MAX = 2.0

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
            with urllib.request.urlopen(req, timeout=30) as response:
                data = response.read().decode("utf-8")
                lines = data.strip().split("\n")
                if not lines or lines[0] == "":
                    return []
                # Parse tab-separated rows
                results = []
                for line in lines:
                    parts = line.split("\t")
                    results.append(parts)
                return results
        except Exception as e:
            logger.error(f"ClickHouse query failed: {e}")
            return []

    def get_difficulty_stats(self) -> list:
        """Get empirical difficulty stats from ClickHouse.

        Returns:
            List of dicts with question_id, empirical_difficulty_b,
            empirical_discrimination_a, sample_size.
        """
        sql = """
            SELECT
                question_id,
                empirical_difficulty_b,
                theta_variance,
                sample_size,
                pass_rate,
                avg_time_seconds
            FROM dream_analytics.question_difficulty_ext
            WHERE sample_size >= 30
            ORDER BY sample_size DESC
        """
        results = self._query_clickhouse(sql)

        stats = []
        for row in results:
            if len(row) >= 4:
                stats.append({
                    "question_id": row[0],
                    "empirical_difficulty_b": float(row[1]) if row[1] else 0.0,
                    "theta_variance": float(row[2]) if row[2] else 0.0,
                    "sample_size": int(row[3]) if row[3] else 0,
                    "pass_rate": float(row[4]) if len(row) > 4 and row[4] else 0.0,
                    "avg_time_seconds": float(row[5]) if len(row) > 5 and row[5] else 0.0,
                })
        return stats

    def sync_difficulty_params(self) -> int:
        """Sync empirical IRT parameters to PostgreSQL.

        Returns:
            Number of questions updated.
        """
        # 1. Get stats from ClickHouse
        stats = self.get_difficulty_stats()
        if not stats:
            logger.info("No questions with sufficient data for IRT update")
            return 0

        logger.info(f"Found {len(stats)} questions with sufficient data")

        # 2. Connect to PostgreSQL
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="dream_app",
            user="dream_user",
            password=os.environ.get("POSTGRES_PASSWORD", "dream_secure_2024"),
        )
        cur = conn.cursor()

        updated = 0
        skipped = 0

        for stat in stats:
            qid = stat["question_id"]
            emp_b = stat["empirical_difficulty_b"]
            theta_var = stat["theta_variance"]
            sample = stat["sample_size"]

            # Clamp difficulty
            clamped_b = max(self.DIFFICULTY_MIN, min(self.DIFFICULTY_MAX, emp_b))

            # Estimate discrimination from theta variance
            # Higher variance + clear pass/fail split = better discrimination
            if theta_var > 0.5 and sample >= 30:
                emp_a = min(self.DISCRIMINATION_MAX, 0.5 + theta_var)
            else:
                emp_a = 1.0  # Default discrimination

            clamped_a = max(self.DISCRIMINATION_MIN, min(self.DISCRIMINATION_MAX, emp_a))

            # Update PostgreSQL
            try:
                # Try by question_id (string)
                cur.execute("""
                    UPDATE board_questions
                    SET difficulty_b = %s,
                        discrimination_a = %s,
                        updated_at = NOW()
                    WHERE id::text = %s
                       OR question_id = %s
                """, (clamped_b, clamped_a, qid, qid))

                if cur.rowcount > 0:
                    updated += 1
                else:
                    skipped += 1
            except Exception as e:
                logger.warning(f"Failed to update {qid}: {e}")
                skipped += 1

        conn.commit()
        cur.close()
        conn.close()

        logger.info(f"IRT sync complete: {updated} updated, {skipped} skipped")
        return updated

    def get_sync_report(self) -> dict:
        """Get a report of what would be synced.

        Returns:
            Dict with stats about the sync.
        """
        stats = self.get_difficulty_stats()
        return {
            "total_questions_with_data": len(stats),
            "min_sample_size": self.MIN_SAMPLE_SIZE,
            "questions": [
                {
                    "question_id": s["question_id"],
                    "sample_size": s["sample_size"],
                    "empirical_difficulty_b": round(s["empirical_difficulty_b"], 3),
                    "pass_rate": round(s["pass_rate"], 3),
                    "avg_time_seconds": round(s["avg_time_seconds"], 1),
                }
                for s in stats[:10]  # Top 10 by sample size
            ],
        }
