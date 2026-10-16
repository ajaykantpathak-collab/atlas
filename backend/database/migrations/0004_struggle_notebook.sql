-- Migration 0004: struggle detector + mistake notebook (Wave 9.8 L5).
-- psql -v ON_ERROR_STOP=1 -f   — idempotent; safe to re-apply.
--
-- student_mistakes: append-only mistake notebook — one row per graded miss.
-- struggle_flags:   per (user,node) consecutive-miss counter driving Contract
--                   B modes: probe (<3) -> contrast (>=3) -> prereq (>=5).
CREATE TABLE IF NOT EXISTS student_mistakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  node_id text, board text, class_level int, subject text,
  question_text text NOT NULL, student_answer text,
  diagnosis text,                      -- from tutor error-pattern catalog when available, else tier label
  correct_path jsonb,                  -- {formula?, steps[], answer?} — from the solved/verdict payload when it exists; may be {}
  source text NOT NULL DEFAULT 'practice',  -- practice|tutor|exam
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz              -- set when the same node produces a verified success
);
CREATE TABLE IF NOT EXISTS struggle_flags (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  node_id text NOT NULL,
  consecutive_misses int NOT NULL DEFAULT 0,
  mode text NOT NULL DEFAULT 'probe',  -- probe|contrast|prereq per Contract B
  last_miss_at timestamptz, updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, node_id)
);
CREATE INDEX IF NOT EXISTS idx_mistakes_user_created ON student_mistakes(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_struggle_user_mode ON struggle_flags(user_id, mode);

-- Record the migration in the Alembic version table (same convention as
-- ship_db_0003.sql): idempotent — re-applying lands on the same marker.
DELETE FROM alembic_version;
INSERT INTO alembic_version (version_num) VALUES ('0004_struggle_notebook');
