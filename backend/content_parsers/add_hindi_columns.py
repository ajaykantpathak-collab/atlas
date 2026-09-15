"""Phase 7.1: Add Hindi columns to enrichment_content table.

Adds the following columns:
  - definition_hi           TEXT
  - text_walkthrough_hi     TEXT
  - eli5_hi                 TEXT
  - common_misconception_hi TEXT
  - mastery_criteria_hi     TEXT
  - translation_status      VARCHAR(20) DEFAULT 'pending'
  - translation_reviewed    BOOLEAN DEFAULT FALSE

This is additive — no existing columns are modified or removed.
"""
import os
import psycopg2
from pathlib import Path

# Load env
env_file = Path(r"D:\dream_app\.env")
if env_file.exists():
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="dream_app",
    user="dream_user",
    password=os.environ.get("POSTGRES_PASSWORD", "dream_secure_2024"),
)

cur = conn.cursor()

# Columns to add
new_columns = [
    ("definition_hi", "TEXT"),
    ("text_walkthrough_hi", "TEXT"),
    ("eli5_hi", "TEXT"),
    ("common_misconception_hi", "TEXT"),
    ("mastery_criteria_hi", "TEXT"),
    ("translation_status", "VARCHAR(20) DEFAULT 'pending'"),
    ("translation_reviewed", "BOOLEAN DEFAULT FALSE"),
]

# Check which columns already exist
cur.execute("""
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'enrichment_content' AND table_schema = 'public'
""")
existing = {row[0] for row in cur.fetchall()}

added = 0
skipped = 0
for col_name, col_type in new_columns:
    if col_name in existing:
        print(f"  SKIP (already exists): {col_name}")
        skipped += 1
    else:
        sql = f"ALTER TABLE enrichment_content ADD COLUMN {col_name} {col_type}"
        cur.execute(sql)
        print(f"  ADD: {col_name} ({col_type})")
        added += 1

conn.commit()

# Verify
cur.execute("""
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = 'enrichment_content' AND table_schema = 'public'
    AND column_name LIKE '%_hi' OR column_name LIKE 'translation%'
    ORDER BY ordinal_position
""")
print(f"\nHindi columns after migration:")
for row in cur.fetchall():
    print(f"  {row[0]:30s} {row[1]:20s} nullable={row[2]} default={row[3]}")

# Count rows by translation status
cur.execute("""
    SELECT translation_status, count(*) as cnt
    FROM enrichment_content
    GROUP BY translation_status
""")
print(f"\nTranslation status:")
for row in cur.fetchall():
    print(f"  {row[0]}: {row[1]} rows")

cur.close()
conn.close()

print(f"\nDone: {added} columns added, {skipped} skipped")
