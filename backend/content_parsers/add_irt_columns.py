"""Phase 3.1 + 3.3: Add IRT columns to board_questions and student ability columns to mastery_records.

IRT columns on board_questions:
  - difficulty_b: IRT difficulty parameter (default 0.0, range -3 to +3)
  - discrimination_a: IRT discrimination parameter (default 1.0, range 0 to 2)
  - guessing_c: IRT guessing parameter (default 0.0 for non-MCQ, 0.25 for MCQ)

Student ability columns on mastery_records:
  - student_theta: IRT ability estimate (default 0.0, range -3 to +3)
  - attempts_per_node: number of attempts on this specific node
  - learning_rate_afm: AFM learning rate (default 0.1, increases with success)

SAFETY: Uses ALTER TABLE ... ADD COLUMN IF NOT EXISTS (idempotent).
        Does NOT modify existing columns or data.
        Does NOT drop anything.
"""

import psycopg2

DB_URL = "postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app"


def main():
    print("Phase 3.1 + 3.3: Adding IRT and student ability columns")
    print("=" * 70)

    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    # Phase 3.1: IRT columns on board_questions
    print("\n3.1: Adding IRT columns to board_questions...")
    irt_columns = [
        ("difficulty_b", "FLOAT DEFAULT 0.0", "IRT difficulty parameter (-3 to +3)"),
        ("discrimination_a", "FLOAT DEFAULT 1.0", "IRT discrimination parameter (0 to 2)"),
        ("guessing_c", "FLOAT DEFAULT 0.0", "IRT guessing parameter (0 to 0.25 for MCQ)"),
        ("irt_initialized", "BOOLEAN DEFAULT FALSE", "Whether IRT params have been initialized from priors"),
    ]

    for col_name, col_def, description in irt_columns:
        try:
            cur.execute(f"ALTER TABLE board_questions ADD COLUMN IF NOT EXISTS {col_name} {col_def}")
            print(f"  + {col_name:25s} ({description})")
        except Exception as e:
            print(f"  ! {col_name:25s} ERROR: {e}")
            conn.rollback()
            cur = conn.cursor()

    # Phase 3.3: Student ability columns on mastery_records
    print("\n3.3: Adding student ability columns to mastery_records...")
    ability_columns = [
        ("student_theta", "FLOAT DEFAULT 0.0", "IRT ability estimate (-3 to +3)"),
        ("attempts_per_node", "INTEGER DEFAULT 0", "Attempts on this specific node"),
        ("learning_rate_afm", "FLOAT DEFAULT 0.1", "AFM learning rate (adaptive)"),
        ("success_count", "INTEGER DEFAULT 0", "Number of correct answers"),
        ("failure_count", "INTEGER DEFAULT 0", "Number of incorrect answers"),
        ("last_irt_update", "TIMESTAMPTZ", "Last time IRT params were updated"),
    ]

    for col_name, col_def, description in ability_columns:
        try:
            cur.execute(f"ALTER TABLE mastery_records ADD COLUMN IF NOT EXISTS {col_name} {col_def}")
            print(f"  + {col_name:25s} ({description})")
        except Exception as e:
            print(f"  ! {col_name:25s} ERROR: {e}")
            conn.rollback()
            cur = conn.cursor()

    conn.commit()

    # Verify columns were added
    print("\nVerifying board_questions columns:")
    cur.execute("""
        SELECT column_name FROM information_schema.columns
        WHERE table_name = 'board_questions' AND column_name IN
        ('difficulty_b', 'discrimination_a', 'guessing_c', 'irt_initialized')
        ORDER BY column_name
    """)
    for r in cur.fetchall():
        print(f"  ✓ {r[0]}")

    print("\nVerifying mastery_records columns:")
    cur.execute("""
        SELECT column_name FROM information_schema.columns
        WHERE table_name = 'mastery_records' AND column_name IN
        ('student_theta', 'attempts_per_node', 'learning_rate_afm',
         'success_count', 'failure_count', 'last_irt_update')
        ORDER BY column_name
    """)
    for r in cur.fetchall():
        print(f"  ✓ {r[0]}")

    cur.close()
    conn.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
