-- Sync empirical IRT parameters from ClickHouse to PostgreSQL
-- Run periodically (e.g., daily) after enough data is collected
-- Only updates questions with sample_size >= 30

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
WHERE bq.id = stats.qid;;
