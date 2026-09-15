-- Phase 8.2: Extended ClickHouse materialized views for analytics.
--
-- Creates views for:
--   1. Daily mastery per student per subject
--   2. Weekly engagement (time spent, questions answered)
--   3. Subject performance distribution
--   4. Question difficulty stats (feeds IRT) — extended from Phase 3
--   5. Common misconceptions per subject
--   6. Socratic interaction stats
--   7. LLM cost breakdown

-- ── 1. Daily mastery per student per subject ────────────────────── #
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.daily_mastery
ENGINE = SummingMergeTree()
ORDER BY (date, user_id, subject, class_level)
AS
SELECT
    toDate(timestamp) AS date,
    user_id,
    subject,
    class_level,
    -- Latest mastery values (take the last event's mastery_after)
    argMax(mastery_after, timestamp) AS mastery_latest,
    -- Average mastery for the day
    avg(mastery_after) AS mastery_avg,
    -- Number of interactions
    count() AS interaction_count,
    -- Number of correct answers
    sum(is_correct) AS correct_count
FROM dream_analytics.learning_events
WHERE event_type = 'question_answered'
GROUP BY date, user_id, subject, class_level;

-- ── 2. Weekly engagement ────────────────────────────────────────── #
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.weekly_engagement
ENGINE = SummingMergeTree()
ORDER BY (week_start, user_id)
AS
SELECT
    toMonday(timestamp) AS week_start,
    user_id,
    -- Total time spent (seconds)
    sum(time_spent_seconds) AS total_time_seconds,
    -- Questions answered
    countIf(event_type = 'question_answered') AS questions_answered,
    -- Lessons completed
    countIf(event_type = 'lesson_completed') AS lessons_completed,
    -- Reviews completed
    countIf(event_type = 'review_completed') AS reviews_completed,
    -- Exams submitted
    countIf(event_type = 'exam_submitted') AS exams_submitted,
    -- Hints requested
    countIf(event_type = 'hint_requested') AS hints_requested,
    -- Socratic interactions
    countIf(event_type = 'socratic_interaction') AS socratic_interactions,
    -- Mastery achievements
    countIf(event_type = 'mastery_achieved') AS mastery_achievements,
    -- Correct answers
    sumIf(is_correct, event_type = 'question_answered') AS correct_answers
FROM dream_analytics.learning_events
GROUP BY week_start, user_id;

-- ── 3. Subject performance distribution ─────────────────────────── #
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.subject_performance
ENGINE = SummingMergeTree()
ORDER BY (date, subject, class_level)
AS
SELECT
    toDate(timestamp) AS date,
    subject,
    class_level,
    -- Total attempts
    countIf(event_type = 'question_answered') AS total_attempts,
    -- Correct answers
    sumIf(is_correct, event_type = 'question_answered') AS correct_count,
    -- Total time
    sumIf(time_spent_seconds, event_type = 'question_answered') AS total_time_seconds,
    -- Average marks
    avgIf(marks_awarded, event_type = 'question_answered') AS avg_marks,
    -- Unique students (approximate — uses groupUniqArray)
    length(groupUniqArrayIf(user_id, event_type = 'question_answered')) AS unique_students
FROM dream_analytics.learning_events
GROUP BY date, subject, class_level;

-- ── 4. Question difficulty stats (extended from Phase 3) ────────── #
-- This extends the existing question_difficulty_stats with more fields
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.question_difficulty_ext
ENGINE = SummingMergeTree()
ORDER BY (question_id, subject, class_level)
AS
SELECT
    question_id,
    subject,
    class_level,
    question_type,
    node_id,
    count() AS total_attempts,
    sum(is_correct) AS correct_count,
    sum(1 - is_correct) AS incorrect_count,
    if(count() > 0, sum(is_correct) / count(), 0) AS pass_rate,
    if(
        count() >= 30 AND pass_rate > 0.05 AND pass_rate < 0.95,
        -ln(pass_rate / (1 - pass_rate)),
        if(pass_rate >= 0.95, -2.0, if(pass_rate <= 0.05, 2.0, 0))
    ) AS empirical_difficulty_b,
    if(count() > 0, sum(time_spent_seconds) / count(), 0) AS avg_time_seconds,
    if(count() > 0, sum(student_theta_before) / count(), 0) AS avg_student_theta,
    if(
        count() >= 30,
        sqrt(
            sum(student_theta_before * student_theta_before) / count()
            - pow(sum(student_theta_before) / count(), 2)
        ),
        0
    ) AS theta_variance,
    count() AS sample_size,
    max(timestamp) AS last_updated
FROM dream_analytics.learning_events
WHERE event_type = 'question_answered'
GROUP BY question_id, subject, class_level, question_type, node_id;

-- ── 5. Common misconceptions per subject ────────────────────────── #
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.misconception_stats
ENGINE = SummingMergeTree()
ORDER BY (date, subject, node_id)
AS
SELECT
    toDate(timestamp) AS date,
    subject,
    node_id,
    count() AS misconception_count,
    -- Unique students affected
    length(groupUniqArray(user_id)) AS unique_students
FROM dream_analytics.learning_events
WHERE event_type = 'misconception_diagnosed'
GROUP BY date, subject, node_id;

-- ── 6. Socratic interaction stats ───────────────────────────────── #
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.socratic_stats
ENGINE = SummingMergeTree()
ORDER BY (date, user_id, pcr_level)
AS
SELECT
    toDate(timestamp) AS date,
    user_id,
    pcr_level,
    hint_level,
    count() AS interaction_count,
    avg(mastery_before) AS avg_mastery_before,
    avg(mastery_after) AS avg_mastery_after,
    -- Hint usage by level
    sumIf(1, hint_level = 1) AS hint_level_1_count,
    sumIf(1, hint_level = 2) AS hint_level_2_count,
    sumIf(1, hint_level = 3) AS hint_level_3_count,
    sumIf(1, hint_level = 4) AS hint_level_4_count
FROM dream_analytics.learning_events
WHERE event_type = 'socratic_interaction'
GROUP BY date, user_id, pcr_level, hint_level;

-- ── 7. LLM cost breakdown ───────────────────────────────────────── #
CREATE MATERIALIZED VIEW IF NOT EXISTS dream_analytics.llm_cost_daily
ENGINE = SummingMergeTree()
ORDER BY (date, call_type, model)
AS
SELECT
    toDate(timestamp) AS date,
    call_type,
    model,
    count() AS call_count,
    sum(input_tokens) AS input_tokens,
    sum(output_tokens) AS output_tokens,
    sum(total_tokens) AS total_tokens,
    sum(cost_usd) AS total_cost,
    avg(latency_ms) AS avg_latency_ms,
    sum(1 - success) AS error_count
FROM dream_analytics.llm_traces
GROUP BY date, call_type, model;

-- ── Convenience views ───────────────────────────────────────────── #

-- Current mastery distribution (for admin dashboard)
CREATE OR REPLACE VIEW dream_analytics.mastery_distribution AS
SELECT
    subject,
    class_level,
    -- Mastery buckets
    countIf(mastery_latest < 0.4) AS low_mastery_count,
    countIf(mastery_latest >= 0.4 AND mastery_latest < 0.7) AS medium_mastery_count,
    countIf(mastery_latest >= 0.7) AS high_mastery_count,
    count() AS total_students,
    avg(mastery_latest) AS avg_mastery
FROM dream_analytics.daily_mastery
WHERE date = today()
GROUP BY subject, class_level;

-- Question difficulty summary (for admin dashboard)
CREATE OR REPLACE VIEW dream_analytics.difficulty_summary AS
SELECT
    subject,
    class_level,
    count() AS total_questions,
    countIf(sample_size >= 30) AS questions_with_data,
    avg(empirical_difficulty_b) AS avg_difficulty,
    avg(pass_rate) AS avg_pass_rate,
    avg(avg_time_seconds) AS avg_time_per_question
FROM dream_analytics.question_difficulty_ext
WHERE total_attempts > 0
GROUP BY subject, class_level;

-- LLM cost summary (for admin dashboard)
CREATE OR REPLACE VIEW dream_analytics.llm_cost_summary AS
SELECT
    call_type,
    model,
    sum(call_count) AS total_calls,
    sum(total_tokens) AS total_tokens,
    sum(total_cost) AS total_cost,
    avg(avg_latency_ms) AS avg_latency,
    sum(error_count) AS total_errors
FROM dream_analytics.llm_cost_daily
WHERE date >= today() - 7  -- Last 7 days
GROUP BY call_type, model
ORDER BY total_cost DESC;
