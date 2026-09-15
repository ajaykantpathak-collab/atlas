"""Phase 3.2: Initialize IRT parameters from question metadata.

Uses Bloom level (via question_type) and marks as priors for IRT parameters:

IRT Model (3-Parameter Logistic, 3PL):
  P(correct | theta) = c + (1 - c) * 1 / (1 + exp(-a * (theta - b)))

Where:
  - theta: student ability (latent trait, -3 to +3)
  - b: item difficulty (-3 easy to +3 hard)
  - a: item discrimination (0 to 2, higher = better at distinguishing)
  - c: guessing parameter (0 for non-MCQ, 0.25 for 4-option MCQ)

Prior mapping:
  Marks → difficulty:
    1 mark  → b = -1.0 (easy, recall)
    2 marks → b = -0.5
    3 marks → b = 0.0  (medium)
    4 marks → b = 0.5
    5 marks → b = 1.0  (hard, analysis)
    6+ marks → b = 1.5 (very hard, synthesis)

  Question type → discrimination:
    mcq → a = 0.8 (moderate, limited by guessing)
    short_answer → a = 1.0 (standard)
    long_answer → a = 1.2 (better at distinguishing)
    numerical → a = 1.1 (clear right/wrong)
    diagram → a = 0.9 (some subjectivity)
    true_false → a = 0.5 (limited, high guessing)
    multi_part → a = 1.3 (best, multiple data points)

  Question type → guessing:
    mcq → c = 0.25 (4 options, 1/4 chance)
    true_false → c = 0.50 (2 options, 1/2 chance)
    everything else → c = 0.0 (no guessing advantage)

SAFETY: Only updates rows where irt_initialized = FALSE.
        Does NOT overwrite manually-set IRT parameters.
        Idempotent — running twice is safe.
"""

import psycopg2
from psycopg2.extras import execute_batch

DB_URL = "postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app"


# ---------------------------------------------------------------------------
# IRT prior mappings
# ---------------------------------------------------------------------------

def marks_to_difficulty(marks: int) -> float:
    """Map marks to IRT difficulty parameter b."""
    if marks is None or marks <= 0:
        return 0.0
    mapping = {
        1: -1.0,
        2: -0.5,
        3: 0.0,
        4: 0.5,
        5: 1.0,
    }
    if marks in mapping:
        return mapping[marks]
    if marks <= 7:
        return 1.25
    if marks <= 10:
        return 1.5
    if marks <= 15:
        return 1.75
    return 2.0  # Very hard


def question_type_to_discrimination(qtype: str) -> float:
    """Map question type to IRT discrimination parameter a."""
    mapping = {
        "mcq": 0.8,
        "short_answer": 1.0,
        "short": 1.0,
        "long_answer": 1.2,
        "long": 1.2,
        "medium_answer": 1.1,
        "medium": 1.1,
        "numerical": 1.1,
        "diagram": 0.9,
        "true_false": 0.5,
        "multi_part": 1.3,
        "application": 1.1,
    }
    return mapping.get(qtype, 1.0)


def question_type_to_guessing(qtype: str) -> float:
    """Map question type to IRT guessing parameter c."""
    mapping = {
        "mcq": 0.25,       # 4 options, 1/4 chance
        "true_false": 0.50, # 2 options, 1/2 chance
    }
    return mapping.get(qtype, 0.0)


# ---------------------------------------------------------------------------
# Main initialization
# ---------------------------------------------------------------------------

def main():
    print("Phase 3.2: Initialize IRT parameters from question metadata")
    print("=" * 70)

    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    # Count questions needing initialization
    cur.execute("SELECT count(*) FROM board_questions WHERE irt_initialized = FALSE OR irt_initialized IS NULL")
    total = cur.fetchone()[0]
    print(f"\nQuestions needing IRT initialization: {total}")

    if total == 0:
        print("All questions already initialized. Done.")
        cur.close()
        conn.close()
        return

    # Fetch all questions needing initialization
    cur.execute("""
        SELECT id, question_type, marks
        FROM board_questions
        WHERE irt_initialized = FALSE OR irt_initialized IS NULL
    """)
    rows = cur.fetchall()
    print(f"Fetched {len(rows)} questions")

    # Compute IRT parameters for each
    updates = []
    for row in rows:
        qid, qtype, marks = row
        b = marks_to_difficulty(marks)
        a = question_type_to_discrimination(qtype)
        c = question_type_to_guessing(qtype)
        updates.append((b, a, c, True, qid))

    # Batch update
    print(f"Updating {len(updates)} questions with IRT parameters...")
    execute_batch(cur, """
        UPDATE board_questions
        SET difficulty_b = %s,
            discrimination_a = %s,
            guessing_c = %s,
            irt_initialized = %s
        WHERE id = %s
    """, updates, page_size=1000)

    conn.commit()

    # Verify
    cur.execute("SELECT count(*) FROM board_questions WHERE irt_initialized = TRUE")
    initialized = cur.fetchone()[0]
    print(f"\nInitialized: {initialized} questions")

    # Show distribution
    cur.execute("""
        SELECT
            ROUND(AVG(difficulty_b)::numeric, 3) as avg_b,
            ROUND(AVG(discrimination_a)::numeric, 3) as avg_a,
            ROUND(AVG(guessing_c)::numeric, 3) as avg_c,
            MIN(difficulty_b) as min_b,
            MAX(difficulty_b) as max_b
        FROM board_questions WHERE irt_initialized = TRUE
    """)
    stats = cur.fetchone()
    print(f"\nIRT parameter statistics:")
    print(f"  Difficulty (b):    avg={stats[0]}, range=[{stats[3]}, {stats[4]}]")
    print(f"  Discrimination (a): avg={stats[1]}")
    print(f"  Guessing (c):      avg={stats[2]}")

    # Show by question type
    cur.execute("""
        SELECT question_type,
               count(*),
               ROUND(AVG(difficulty_b)::numeric, 3),
               ROUND(AVG(discrimination_a)::numeric, 3),
               ROUND(AVG(guessing_c)::numeric, 3)
        FROM board_questions WHERE irt_initialized = TRUE
        GROUP BY question_type ORDER BY count(*) DESC
    """)
    print(f"\nBy question type:")
    print(f"  {'Type':20s} {'Count':>6s} {'Avg b':>8s} {'Avg a':>8s} {'Avg c':>8s}")
    for r in cur.fetchall():
        print(f"  {str(r[0]):20s} {r[1]:>6} {str(r[2]):>8s} {str(r[3]):>8s} {str(r[4]):>8s}")

    cur.close()
    conn.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
