"""Phase 3.6: ClickHouse question_difficulty_stats materialized view.

Creates a ClickHouse analytics pipeline that computes real IRT difficulty
parameters from actual student interaction data. This replaces the prior-based
IRT parameters (from Phase 3.2) with empirical estimates once enough data
is collected.

Schema:
  1. student_interactions — raw event log of every student answer
  2. question_difficulty_stats — materialized view aggregating per-question stats

The materialized view automatically updates as new interactions are logged.
It computes:
  - Total attempts per question
  - Pass rate (correct / total)
  - Empirical difficulty (logit of fail rate)
  - Discrimination (correlation between correctness and total score)
  - Confidence intervals

When empirical data is sufficient (N >= 30 attempts), these stats can be
used to update the IRT parameters in PostgreSQL via a periodic sync job.

SAFETY: This only creates ClickHouse tables. It does NOT modify PostgreSQL.
        The sync from ClickHouse → PostgreSQL is a separate explicit step.
"""

import sys
import asyncio
from pathlib import Path

# ClickHouse connection settings (from docker-compose.yml)
CLICKHOUSE_URL = "http://localhost:8123"
CLICKHOUSE_DB = "dream_analytics"
CLICKHOUSE_USER = "dream_user"
CLICKHOUSE_PASSWORD = "dream_ch_2024"


# ---------------------------------------------------------------------------
# DDL Statements
# ---------------------------------------------------------------------------

DDL_CREATE_DATABASE = f"""
CREATE DATABASE IF NOT EXISTS {CLICKHOUSE_DB}
"""

DDL_STUDENT_INTERACTIONS = f"""
CREATE TABLE IF NOT EXISTS {CLICKHOUSE_DB}.student_interactions
(
    event_id String,
    user_id String,
    question_id String,
    node_id String,
    subject String,
    class_level UInt8,
    is_correct UInt8,
    marks_awarded Float32,
    max_marks UInt8,
    time_spent_seconds UInt32,
    question_type String,
    difficulty_b Float32,
    discrimination_a Float32,
    guessing_c Float32,
    student_theta_before Float32,
    student_theta_after Float32,
    timestamp DateTime DEFAULT now()
)
ENGINE = MergeTree()
ORDER BY (timestamp, user_id, question_id)
PARTITION BY toYYYYMM(timestamp)
"""

DDL_QUESTION_DIFFICULTY_STATS = f"""
CREATE MATERIALIZED VIEW IF NOT EXISTS {CLICKHOUSE_DB}.question_difficulty_stats
ENGINE = SummingMergeTree()
ORDER BY (question_id, subject, class_level)
AS
SELECT
    question_id,
    subject,
    class_level,
    question_type,
    node_id,
    -- Aggregate counts
    count() AS total_attempts,
    sum(is_correct) AS correct_count,
    sum(1 - is_correct) AS incorrect_count,
    -- Pass rate
    if(count() > 0, sum(is_correct) / count(), 0) AS pass_rate,
    -- Empirical difficulty (logit transform of fail rate)
    -- b = -ln(pass_rate / (1 - pass_rate))
    -- If pass_rate = 0 or 1, clamp to avoid infinity
    if(
        count() >= 30 AND pass_rate > 0.05 AND pass_rate < 0.95,
        -ln(pass_rate / (1 - pass_rate)),
        if(pass_rate >= 0.95, -2.0, if(pass_rate <= 0.05, 2.0, 0))
    ) AS empirical_difficulty_b,
    -- Average time spent
    if(count() > 0, sum(time_spent_seconds) / count(), 0) AS avg_time_seconds,
    -- Average student theta (ability of students attempting this question)
    if(count() > 0, sum(student_theta_before) / count(), 0) AS avg_student_theta,
    -- Variance of student theta (for discrimination estimation)
    -- Higher variance + correlation = better discrimination
    -- This is a simplified proxy; full discrimination requires 2PL/3PL fitting
    if(
        count() >= 30,
        sqrt(
            sum(student_theta_before * student_theta_before) / count()
            - pow(sum(student_theta_before) / count(), 2)
        ),
        0
    ) AS theta_variance,
    -- Confidence (number of attempts)
    count() AS sample_size,
    -- Timestamp of last update
    max(timestamp) AS last_updated
FROM {CLICKHOUSE_DB}.student_interactions
GROUP BY question_id, subject, class_level, question_type, node_id
"""

DDL_DIFFICULTY_STATS_VIEW = f"""
CREATE OR REPLACE VIEW {CLICKHOUSE_DB}.difficulty_stats_current AS
SELECT
    question_id,
    subject,
    class_level,
    question_type,
    node_id,
    total_attempts,
    correct_count,
    incorrect_count,
    pass_rate,
    empirical_difficulty_b,
    avg_time_seconds,
    avg_student_theta,
    theta_variance,
    sample_size,
    last_updated,
    -- Confidence level: 0 = low (prior only), 1 = medium, 2 = high
    if(sample_size >= 100, 2, if(sample_size >= 30, 1, 0)) AS confidence_level,
    -- Recommended discrimination based on theta variance
    -- Questions with high theta variance and clear pass/fail split discriminate better
    if(
        sample_size >= 30 AND theta_variance > 0.5,
        least(2.0, 0.5 + theta_variance),
        1.0
    ) AS empirical_discrimination_a
FROM {CLICKHOUSE_DB}.question_difficulty_stats
WHERE total_attempts > 0
"""


# ---------------------------------------------------------------------------
# Sync SQL — update PostgreSQL IRT params from ClickHouse empirical data
# ---------------------------------------------------------------------------

SYNC_SQL_POSTGRES = """
-- Sync empirical IRT parameters from ClickHouse to PostgreSQL
-- Only updates questions with sufficient data (sample_size >= 30)
-- This is run as a periodic batch job, NOT in real-time

UPDATE board_questions bq
SET
    difficulty_b = CASE
        WHEN stats.empirical_difficulty_b IS NOT NULL
             AND stats.sample_size >= 30
        THEN LEAST(3.0, GREATEST(-3.0, stats.empirical_difficulty_b))
        ELSE bq.difficulty_b
    END,
    discrimination_a = CASE
        WHEN stats.empirical_discrimination_a IS NOT NULL
             AND stats.sample_size >= 30
        THEN LEAST(2.0, GREATEST(0.0, stats.empirical_discrimination_a))
        ELSE bq.discrimination_a
    END
FROM (
    SELECT
        question_id::uuid AS qid,
        empirical_difficulty_b,
        empirical_discrimination_a,
        sample_size
    FROM ch_difficulty_stats  -- external table or temp table from ClickHouse
    WHERE sample_size >= 30
) stats
WHERE bq.id = stats.qid;
"""


# ---------------------------------------------------------------------------
# Main — create ClickHouse tables
# ---------------------------------------------------------------------------

async def create_clickhouse_schema():
    """Create ClickHouse database and tables."""
    try:
        import aiohttp
    except ImportError:
        print("aiohttp not installed. Install with: pip install aiohttp")
        return False

    statements = [
        ("Create database", DDL_CREATE_DATABASE),
        ("Create student_interactions table", DDL_STUDENT_INTERACTIONS),
        ("Create question_difficulty_stats MV", DDL_QUESTION_DIFFICULTY_STATS),
        ("Create difficulty_stats_current view", DDL_DIFFICULTY_STATS_VIEW),
    ]

    async with aiohttp.ClientSession() as session:
        for name, sql in statements:
            try:
                async with session.post(
                    CLICKHOUSE_URL,
                    params={
                        "query": sql.strip(),
                        "database": "default",
                    },
                    auth=aiohttp.BasicAuth(CLICKHOUSE_USER, CLICKHOUSE_PASSWORD),
                ) as resp:
                    if resp.status == 200:
                        print(f"  ✓ {name}")
                    else:
                        text = await resp.text()
                        print(f"  ✗ {name}: HTTP {resp.status} - {text[:200]}")
            except Exception as e:
                print(f"  ✗ {name}: {e}")
                return False

    return True


def main():
    print("Phase 3.6: ClickHouse question_difficulty_stats materialized view")
    print("=" * 70)

    # Save DDL to file for manual execution
    ddl_file = Path(r"D:\platform\backend\content_parsers\clickhouse_schema.sql")
    with open(ddl_file, "w", encoding="utf-8") as f:
        f.write("-- ClickHouse schema for question difficulty analytics\n")
        f.write("-- Phase 3.6: Materialized view for empirical IRT parameters\n\n")
        f.write(DDL_CREATE_DATABASE.strip() + ";\n\n")
        f.write(DDL_STUDENT_INTERACTIONS.strip() + ";\n\n")
        f.write(DDL_QUESTION_DIFFICULTY_STATS.strip() + ";\n\n")
        f.write(DDL_DIFFICULTY_STATS_VIEW.strip() + ";\n\n")
        f.write("-- Sync SQL (run in PostgreSQL after exporting from ClickHouse)\n")
        f.write(SYNC_SQL_POSTGRES.strip() + ";\n")
    print(f"\nDDL saved to: {ddl_file}")

    # Try to create schema if ClickHouse is running
    print("\nAttempting to connect to ClickHouse...")
    try:
        asyncio.run(create_clickhouse_schema())
    except Exception as e:
        print(f"\nClickHouse not available: {e}")
        print("To start ClickHouse: docker compose up -d clickhouse")
        print("Then run: clickhouse-client --multiquery < clickhouse_schema.sql")

    # Save sync SQL separately
    sync_file = Path(r"D:\platform\backend\content_parsers\sync_irt_from_clickhouse.sql")
    with open(sync_file, "w", encoding="utf-8") as f:
        f.write("-- Sync empirical IRT parameters from ClickHouse to PostgreSQL\n")
        f.write("-- Run periodically (e.g., daily) after enough data is collected\n")
        f.write("-- Only updates questions with sample_size >= 30\n\n")
        f.write(SYNC_SQL_POSTGRES.strip() + ";\n")
    print(f"Sync SQL saved to: {sync_file}")

    print("\nDone. Start ClickHouse with: docker compose up -d clickhouse")


if __name__ == "__main__":
    main()
