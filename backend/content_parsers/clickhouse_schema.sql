-- ClickHouse schema for question difficulty analytics
-- Phase 3.6: Materialized view for empirical IRT parameters

CREATE DATABASE IF NOT EXISTS dream_analytics;

CREATE TABLE IF NOT EXISTS dream_analytics.student_interactions
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
PARTITION BY toYYYYMM(timestamp);

CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.question_difficulty_stats
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
FROM dream_analytics.student_interactions
GROUP BY question_id, subject, class_level, question_type, node_id;

CREATE OR REPLACE VIEW dream_analytics.difficulty_stats_current AS
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
FROM dream_analytics.question_difficulty_stats
WHERE total_attempts > 0;

-- Sync SQL (run in PostgreSQL after exporting from ClickHouse)
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
