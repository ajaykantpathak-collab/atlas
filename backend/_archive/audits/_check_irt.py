import urllib.request, base64, json

CH_URL = "http://localhost:8123"
CH_USER = "dream_user"
CH_PASSWORD = "dream_ch_2024"

def ch_query(sql):
    creds = base64.b64encode(f"{CH_USER}:{CH_PASSWORD}".encode()).decode()
    req = urllib.request.Request(CH_URL, data=sql.encode("utf-8"), method="POST")
    req.add_header("Authorization", f"Basic {creds}")
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.read().decode("utf-8").strip()

# Check if question_difficulty_ext view exists
result = ch_query("SELECT name FROM system.tables WHERE database='dream_analytics' AND name='question_difficulty_ext'")
print(f"question_difficulty_ext exists: {bool(result)}")
print(f"Result: {result}")

# Check if board_questions table exists in PostgreSQL
import psycopg2
conn = psycopg2.connect(host="localhost", port="5432", database="dream_app", user="dream_user", password="dream_secure_2024")
cur = conn.cursor()
cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name='board_questions')")
exists = cur.fetchone()[0]
print(f"\nboard_questions table exists: {exists}")
if exists:
    cur.execute("SELECT count(*) FROM board_questions")
    count = cur.fetchone()[0]
    print(f"board_questions row count: {count}")
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name='board_questions' AND column_name IN ('difficulty_b','discrimination_a','question_id')")
    cols = [r[0] for r in cur.fetchall()]
    print(f"IRT columns present: {cols}")
cur.close()
conn.close()
