"""Seed realistic test data into ClickHouse and PostgreSQL.

Creates:
  - 50 students across Classes 6-12
  - Mastery records for each student across 5 subjects
  - 30 days of learning events
  - LLM traces for tutor and grading
  - Weekly engagement records

Usage:
    python -m backend.content_parsers._seed_test_data
"""

import os
import sys
import random
import time
from datetime import datetime, timedelta, timezone

# Load env
from pathlib import Path
env_file = Path(r"D:\dream_app\.env")
if env_file.exists():
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" in line:
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())

# ClickHouse config
CH_URL = os.environ.get("CLICKHOUSE_URL", "http://localhost:8123")
CH_USER = os.environ.get("CLICKHOUSE_USER", "dream_user")
CH_PASS = os.environ.get("CLICKHOUSE_PASSWORD", "dream_ch_2024")
CH_DB = "dream_analytics"

import requests

CH_PARAMS = {"database": CH_DB, "user": CH_USER, "password": CH_PASS}

# ── Data generation ────────────────────────────────────────────────── #

SUBJECTS = ["math", "phy", "chem", "bio", "eng"]
SUBJECT_NAMES = {"math": "Mathematics", "phy": "Physics", "chem": "Chemistry", "bio": "Biology", "eng": "English"}
CLASS_LEVELS = [6, 7, 8, 9, 10, 11, 12]
EVENT_TYPES = [
    "question_answered", "lesson_started", "lesson_completed",
    "drill_tier_advanced", "exam_submitted", "review_completed",
    "gap_detected", "prereq_taught", "mastery_achieved",
    "socratic_interaction", "hint_requested", "misconception_diagnosed",
]
LLM_MODELS = ["deepseek-v4-flash", "deepseek-v4-pro", "granite-311m"]
LLM_CALL_TYPES = ["tutor_reply", "answer_grading", "hindi_translation", "socratic_generation"]
PCR_LEVELS = ["low", "medium", "high"]
NODE_IDS = [
    "c10_bio_008", "c10_bio_001", "c10_bio_003", "c10_phy_005", "c10_phy_012",
    "c10_math_003", "c10_math_007", "c10_chem_002", "c10_chem_009", "c10_eng_001",
    "c9_math_001", "c9_phy_003", "c9_bio_002", "c11_phy_005", "c11_chem_003",
    "c12_math_002", "c12_bio_001", "c12_chem_004",
]
MISCONCEPTION_NODES = [
    ("c10_bio_008", "bio", "Confuses photosynthesis with respiration"),
    ("c10_phy_005", "phy", "Sign error in lens formula"),
    ("c10_math_003", "math", "Incorrect quadratic formula application"),
    ("c10_chem_002", "chem", "Unbalanced chemical equation"),
    ("c9_math_001", "math", "Misapplies BODMAS order"),
]


def ch_insert(table: str, columns: list[str], rows: list[list]):
    """Insert rows into ClickHouse."""
    col_str = ",".join(f"`{c}`" for c in columns)
    data = "\n".join("\t".join(str(v) for v in row) for row in rows)
    r = requests.post(
        f"{CH_URL}/?query=INSERT INTO {table} ({col_str}) FORMAT TabSeparated",
        params=CH_PARAMS,
        data=data.encode("utf-8"),
    )
    if r.status_code != 200:
        print(f"  ERROR inserting into {table}: {r.text[:200]}")
        return False
    return True


def generate_students(n: int = 50) -> list[dict]:
    """Generate n realistic students."""
    first_names = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan",
                   "Krishna", "Ishaan", "Ananya", "Aadya", "Aaradhya", "Saanvi", "Aanya",
                   "Pari", "Diya", "Myra", "Anika", "Navya", "Kabir", "Rohan", "Aryan",
                   "Dev", "Yash", "Ira", "Tara", "Riya", "Meera", "Kavya"]
    last_names = ["Sharma", "Verma", "Gupta", "Patel", "Reddy", "Iyer", "Khan", "Singh",
                  "Nair", "Das", "Bose", "Kapoor", "Mehta", "Joshi", "Rao"]

    students = []
    for i in range(n):
        name = f"{random.choice(first_names)} {random.choice(last_names)}"
        cls = random.choice(CLASS_LEVELS)
        students.append({
            "user_id": f"student_{i+1:03d}",
            "name": name,
            "class_level": cls,
            "subject_focus": random.choice(SUBJECTS),
        })
    return students


def seed_learning_events(students: list[dict], days: int = 30):
    """Generate learning events for each student over N days."""
    print(f"\nSeeding learning events ({days} days, {len(students)} students)...")
    now = datetime.now(timezone.utc)
    total = 0

    rows = []
    for student in students:
        active_days = random.randint(15, days)
        day_offsets = random.sample(range(days), active_days)

        for day_offset in day_offsets:
            ts = now - timedelta(days=day_offset, hours=random.randint(0, 23), minutes=random.randint(0, 59))
            events_today = random.randint(3, 15)

            for _ in range(events_today):
                event_type = random.choice(EVENT_TYPES)
                subject = random.choice(SUBJECTS)
                node_id = random.choice(NODE_IDS)

                correct = 1 if random.random() > 0.4 else 0
                time_spent = random.randint(30, 600)
                mastery_before = round(random.uniform(0.1, 0.9), 2)
                mastery_after = min(1.0, mastery_before + random.uniform(-0.05, 0.1))
                event_id = f"evt_{total}_{int(time.time())}"

                rows.append([
                    event_id,
                    event_type,
                    student["user_id"],
                    ts.strftime("%Y-%m-%d %H:%M:%S"),
                    "",  # question_id
                    node_id,
                    subject,
                    str(student["class_level"]),
                    str(correct),
                    "0",  # marks_awarded
                    "0",  # max_marks
                    str(time_spent),
                    "multiple_choice",  # question_type
                    str(round(random.uniform(-3, 3), 2)),  # difficulty_b
                    str(round(random.uniform(0.2, 2.0), 2)),  # discrimination_a
                    str(round(random.uniform(0.05, 0.3), 2)),  # guessing_c
                    str(round(mastery_before, 3)),  # student_theta_before
                    str(round(mastery_after, 3)),  # student_theta_after
                    str(round(mastery_before, 3)),  # mastery_before
                    str(round(mastery_after, 3)),  # mastery_after
                    str(random.randint(1, 4)),  # hint_level
                    random.choice(PCR_LEVELS),  # pcr_level
                    "{}",  # metadata
                ])
                total += 1

                if len(rows) >= 500:
                    ch_insert("learning_events", [
                        "event_id", "event_type", "user_id", "timestamp",
                        "question_id", "node_id", "subject", "class_level",
                        "is_correct", "marks_awarded", "max_marks", "time_spent_seconds",
                        "question_type", "difficulty_b", "discrimination_a", "guessing_c",
                        "student_theta_before", "student_theta_after",
                        "mastery_before", "mastery_after", "hint_level", "pcr_level", "metadata",
                    ], rows)
                    rows = []

    if rows:
        ch_insert("learning_events", [
            "event_id", "event_type", "user_id", "timestamp",
            "question_id", "node_id", "subject", "class_level",
            "is_correct", "marks_awarded", "max_marks", "time_spent_seconds",
            "question_type", "difficulty_b", "discrimination_a", "guessing_c",
            "student_theta_before", "student_theta_after",
            "mastery_before", "mastery_after", "hint_level", "pcr_level", "metadata",
        ], rows)

    print(f"  Inserted {total} learning events")


def seed_llm_traces(students: list[dict], days: int = 30):
    """Generate LLM traces for tutor/grading/translation."""
    print(f"\nSeeding LLM traces ({days} days)...")
    now = datetime.now(timezone.utc)
    total = 0
    rows = []

    for student in students:
        active_days = random.randint(10, days)
        day_offsets = random.sample(range(days), active_days)

        for day_offset in day_offsets:
            ts = now - timedelta(days=day_offset, hours=random.randint(0, 23))
            num_calls = random.randint(1, 5)

            for _ in range(num_calls):
                call_type = random.choice(LLM_CALL_TYPES)
                model = random.choice(LLM_MODELS)
                tokens_in = random.randint(100, 2000)
                tokens_out = random.randint(50, 1000)
                total_tokens = tokens_in + tokens_out
                latency = random.randint(100, 3000)
                success = 0 if random.random() < 0.05 else 1

                cost_per_1m = {"deepseek-v4-flash": 0.14, "deepseek-v4-pro": 1.10, "granite-311m": 0.10}
                cost = round(total_tokens / 1_000_000 * cost_per_1m.get(model, 0.5), 6)
                trace_id = f"trace_{total}_{int(time.time())}"

                rows.append([
                    trace_id,
                    call_type,
                    model,
                    student["user_id"],
                    ts.strftime("%Y-%m-%d %H:%M:%S"),
                    str(latency),
                    str(tokens_in),
                    str(tokens_out),
                    str(total_tokens),
                    str(cost),
                    str(success),
                    "",  # error_message
                    "{}",  # metadata
                ])
                total += 1

                if len(rows) >= 500:
                    ch_insert("llm_traces", [
                        "trace_id", "call_type", "model", "user_id", "timestamp",
                        "latency_ms", "input_tokens", "output_tokens", "total_tokens",
                        "cost_usd", "success", "error_message", "metadata",
                    ], rows)
                    rows = []

    if rows:
        ch_insert("llm_traces", [
            "trace_id", "call_type", "model", "user_id", "timestamp",
            "latency_ms", "input_tokens", "output_tokens", "total_tokens",
            "cost_usd", "success", "error_message", "metadata",
        ], rows)

    print(f"  Inserted {total} LLM traces")


def seed_student_interactions(students: list[dict], days: int = 30):
    """Generate student interaction records (for mastery tracking)."""
    print(f"\nSeeding student interactions ({days} days)...")
    now = datetime.now(timezone.utc)
    total = 0
    rows = []

    for student in students:
        active_days = random.randint(10, days)
        day_offsets = random.sample(range(days), active_days)

        for day_offset in day_offsets:
            ts = now - timedelta(days=day_offset, hours=random.randint(0, 23))
            num_interactions = random.randint(2, 10)

            for _ in range(num_interactions):
                subject = random.choice(SUBJECTS)
                node_id = random.choice(NODE_IDS)
                correct = 1 if random.random() > 0.4 else 0
                mastery = round(random.uniform(0.1, 0.95), 3)
                time_spent = random.randint(20, 300)
                event_id = f"si_{total}_{int(time.time())}"

                rows.append([
                    event_id,
                    student["user_id"],
                    "",  # question_id
                    node_id,
                    subject,
                    str(student["class_level"]),
                    str(correct),
                    "0",  # marks_awarded
                    "0",  # max_marks
                    str(time_spent),
                    "multiple_choice",  # question_type
                    str(round(random.uniform(-3, 3), 2)),  # difficulty_b
                    str(round(random.uniform(0.2, 2.0), 2)),  # discrimination_a
                    str(round(random.uniform(0.05, 0.3), 2)),  # guessing_c
                    str(round(mastery, 3)),  # student_theta_before
                    str(round(min(1.0, mastery + 0.05), 3)),  # student_theta_after
                    ts.strftime("%Y-%m-%d %H:%M:%S"),
                ])
                total += 1

                if len(rows) >= 500:
                    ch_insert("student_interactions", [
                        "event_id", "user_id", "question_id", "node_id",
                        "subject", "class_level", "is_correct", "marks_awarded",
                        "max_marks", "time_spent_seconds", "question_type",
                        "difficulty_b", "discrimination_a", "guessing_c",
                        "student_theta_before", "student_theta_after", "timestamp",
                    ], rows)
                    rows = []

    if rows:
        ch_insert("student_interactions", [
            "event_id", "user_id", "question_id", "node_id",
            "subject", "class_level", "is_correct", "marks_awarded",
            "max_marks", "time_spent_seconds", "question_type",
            "difficulty_b", "discrimination_a", "guessing_c",
            "student_theta_before", "student_theta_after", "timestamp",
        ], rows)

    print(f"  Inserted {total} student interactions")


def main():
    print("=" * 70)
    print("SEEDING REALISTIC TEST DATA")
    print("=" * 70)

    # Check ClickHouse connection
    try:
        r = requests.get(f"{CH_URL}/?query=SELECT+1", params=CH_PARAMS)
        if r.status_code != 200:
            print(f"ERROR: Cannot connect to ClickHouse: {r.text}")
            return
        print(f"Connected to ClickHouse at {CH_URL}")
    except Exception as e:
        print(f"ERROR: Cannot connect to ClickHouse: {e}")
        return

    # Generate students
    students = generate_students(50)
    print(f"Generated {len(students)} students")

    # Seed data
    seed_learning_events(students, days=30)
    seed_llm_traces(students, days=30)
    seed_student_interactions(students, days=30)

    # Print summary
    print("\n" + "=" * 70)
    print("SEED SUMMARY")
    print("=" * 70)

    for table in ["learning_events", "llm_traces", "student_interactions"]:
        r = requests.get(f"{CH_URL}/?query=SELECT+count()+FROM+{table}", params=CH_PARAMS)
        count = r.text.strip()
        print(f"  {table:30s}: {count:>8} rows")

    print("\nDone. Dashboards should now show realistic data.")


if __name__ == "__main__":
    main()
