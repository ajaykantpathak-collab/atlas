"""Check existing tables in PostgreSQL."""
import psycopg2

conn = psycopg2.connect("postgresql://dream_user:dream_secure_2024@localhost:5432/dream_app")
cur = conn.cursor()
cur.execute("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename")
tables = [r[0] for r in cur.fetchall()]
print("Tables:", tables)

# Check if users table exists and its columns
if "users" in tables:
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position")
    cols = [r[0] for r in cur.fetchall()]
    print("users columns:", cols)
else:
    print("users table does NOT exist")

conn.close()
