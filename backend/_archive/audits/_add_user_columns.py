"""Add missing columns to users table for auth_service compatibility.
ALTER TABLE ADD COLUMN is safe — doesn't modify or delete existing data."""
import psycopg2

conn = psycopg2.connect("postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app")
cur = conn.cursor()

# Columns needed by UserModel in auth_service.py
new_columns = [
    ("phone_number", "VARCHAR(15) UNIQUE"),
    ("is_verified", "BOOLEAN DEFAULT false"),
    ("is_guest", "BOOLEAN DEFAULT false"),
    ("school_name", "VARCHAR(200)"),
    ("failed_login_attempts", "INTEGER DEFAULT 0"),
    ("locked_until", "TIMESTAMPTZ"),
    ("last_login_at", "TIMESTAMPTZ"),
]

for col_name, col_type in new_columns:
    cur.execute(f"""
        SELECT column_name FROM information_schema.columns
        WHERE table_name='users' AND column_name='{col_name}'
    """)
    if cur.fetchone() is None:
        cur.execute(f"ALTER TABLE users ADD COLUMN {col_name} {col_type}")
        print(f"Added column: {col_name}")
    else:
        print(f"Column exists: {col_name}")

conn.commit()

# Verify
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position")
cols = [r[0] for r in cur.fetchall()]
print(f"\nFinal columns: {cols}")

conn.close()
