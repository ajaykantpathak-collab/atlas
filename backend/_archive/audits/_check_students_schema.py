"""Check students table schema."""
import psycopg2

conn = psycopg2.connect("postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app")
cur = conn.cursor()
cur.execute("""
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name='students'
    ORDER BY ordinal_position
""")
for r in cur.fetchall():
    print(f"{r[0]:30} {r[1]:30} nullable={r[2]:3} default={r[3]}")
conn.close()
