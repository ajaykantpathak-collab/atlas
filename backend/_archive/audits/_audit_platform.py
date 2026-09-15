"""End-to-end platform readiness audit — can a student actually use this?"""
import urllib.request, json, psycopg2, os

results = {}

# 1. Database content check
conn = psycopg2.connect(host="localhost", port="5432", database="dream_app", user="dream_user", password="dream_secure_2024")
cur = conn.cursor()

tables_to_check = [
    "students", "topics", "practice_sessions", "attempts", "mastery",
    "board_questions", "nodes", "learning_nodes", "content_nodes",
    "questions", "question_bank", "exams", "curriculum_nodes"
]
print("=== DATABASE CONTENT ===")
for t in tables_to_check:
    try:
        cur.execute(f"SELECT count(*) FROM {t}")
        count = cur.fetchone()[0]
        status = "OK" if count > 0 else "EMPTY"
        print(f"  {t}: {count} rows [{status}]")
    except Exception:
        pass
cur.close()
conn.close()

# 2. API health checks
print("\n=== API HEALTH ===")
apis = [
    ("Solver", "http://localhost:8000/api/solver/health"),
    ("Practice", "http://localhost:8000/api/practice/health"),
    ("Diagnostic", "http://localhost:8000/api/diagnostic/start"),  # POST only
    ("Tutor", "http://localhost:8000/api/tutor/health"),
    ("Analytics", "http://localhost:8000/api/analytics/health"),
    ("Sim", "http://localhost:8000/api/sim/health"),
    ("Content", "http://localhost:8000/api/content/health"),
    ("Mastery", "http://localhost:8000/api/mastery/health"),
    ("Auth", "http://localhost:8000/api/auth/health"),
]
for name, url in apis:
    try:
        resp = urllib.request.urlopen(url, timeout=5)
        data = json.loads(resp.read().decode())
        print(f"  {name}: OK - {str(data)[:100]}")
    except urllib.error.HTTPError as e:
        print(f"  {name}: HTTP {e.code}")
    except Exception as e:
        print(f"  {name}: FAIL - {str(e)[:80]}")

# 3. Critical path test: Can a student start practice?
print("\n=== CRITICAL PATH: Practice ===")
try:
    req_data = json.dumps({
        "student_id": "82fb3ab2-9f30-4888-8964-237e26a72d9e",
        "subject": "mathematics",
        "topic": "algebra",
        "num_questions": 5
    }).encode()
    r = urllib.request.Request("http://localhost:8000/api/practice/start",
                               data=req_data, headers={"Content-Type": "application/json"})
    resp = urllib.request.urlopen(r, timeout=10)
    data = json.loads(resp.read().decode())
    print(f"  Start practice: OK - session={data.get('session_id', 'N/A')[:20]}")
    q = data.get("question", data.get("current_question", {}))
    if q:
        print(f"  Question provided: YES")
    else:
        print(f"  Question provided: NO (503 expected if no questions)")
except urllib.error.HTTPError as e:
    body = e.read().decode()[:200]
    print(f"  Start practice: HTTP {e.code} - {body}")
except Exception as e:
    print(f"  Start practice: FAIL - {str(e)[:100]}")

# 4. Critical path: Solver
print("\n=== CRITICAL PATH: Solver ===")
try:
    req_data = json.dumps({
        "problem_type": "calculus_differentiate",
        "values": {"expr": "x**3", "variable": "x", "order": 1},
        "seed": 0
    }).encode()
    r = urllib.request.Request("http://localhost:8000/api/solver/solve",
                               data=req_data, headers={"Content-Type": "application/json"})
    resp = urllib.request.urlopen(r, timeout=15)
    data = json.loads(resp.read().decode())
    print(f"  Solve calculus: OK - answer={data.get('final_answer', 'N/A')}")
except Exception as e:
    print(f"  Solve calculus: FAIL - {str(e)[:100]}")

# 5. Critical path: Diagnostic
print("\n=== CRITICAL PATH: Diagnostic ===")
try:
    req_data = json.dumps({
        "student_id": "82fb3ab2-9f30-4888-8964-237e26a72d9e",
        "subject": "mathematics",
        "grade": 10
    }).encode()
    r = urllib.request.Request("http://localhost:8000/api/diagnostic/start",
                               data=req_data, headers={"Content-Type": "application/json"})
    resp = urllib.request.urlopen(r, timeout=15)
    data = json.loads(resp.read().decode())
    q = data.get("question", {})
    qtext = q.get("question_text", "") if isinstance(q, dict) else ""
    is_placeholder = "Diagnostic question" in qtext
    print(f"  Start diagnostic: OK - {data.get('total_questions')} questions")
    print(f"  First question is real: {'NO (placeholder)' if is_placeholder else 'YES'}")
    print(f"  Question text: {qtext[:80]}")
except Exception as e:
    print(f"  Start diagnostic: FAIL - {str(e)[:100]}")

# 6. CBSE pipeline status
print("\n=== CBSE CONTENT PIPELINE ===")
output_dir = r"D:\platform\cbse_coverage_output"
if os.path.exists(output_dir):
    files = [f for f in os.listdir(output_dir) if f.endswith("_result.json")]
    success = sum(1 for f in files if os.path.getsize(os.path.join(output_dir, f)) >= 1024)
    failed = len(files) - success
    print(f"  Result files: {len(files)}")
    print(f"  Successful: {success}")
    print(f"  Failed/stub: {failed}")
else:
    print(f"  Output directory not found")

# 7. Solver registry
print("\n=== SOLVER REGISTRY ===")
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/solver/health", timeout=10)
    data = json.loads(resp.read().decode())
    print(f"  Total types: {data.get('total_types', 'N/A')}")
    print(f"  Loaded: {data.get('loaded_types', 'N/A')}")
    print(f"  Not loaded: {data.get('not_loaded', data.get('total_types', 0) - data.get('loaded_types', 0))}")
except Exception as e:
    print(f"  FAIL: {e}")

# 8. Sim registry
print("\n=== SIM REGISTRY ===")
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/sim/health", timeout=10)
    data = json.loads(resp.read().decode())
    print(f"  Total sims: {data.get('sim_count', 'N/A')}")
except Exception as e:
    print(f"  FAIL: {e}")

# 9. LLM service
print("\n=== LLM SERVICE ===")
try:
    resp = urllib.request.urlopen("http://localhost:3001/v1/models", timeout=5)
    data = json.loads(resp.read().decode())
    models = data.get("data", [])
    print(f"  LLM available: YES - {len(models)} models")
    if models:
        print(f"  First model: {models[0].get('id', 'N/A')}")
except urllib.error.HTTPError as e:
    print(f"  LLM available: AUTH ISSUE (HTTP {e.code})")
except Exception as e:
    print(f"  LLM available: NO - {str(e)[:80]}")

# 10. ClickHouse
print("\n=== CLICKHOUSE ===")
try:
    resp = urllib.request.urlopen("http://localhost:8123/ping", timeout=5)
    print(f"  ClickHouse: {resp.read().decode().strip()}")
except Exception as e:
    print(f"  ClickHouse: FAIL - {str(e)[:80]}")

# 11. Redis
print("\n=== REDIS ===")
try:
    import redis
    r = redis.Redis(host="localhost", port=6379)
    print(f"  Redis: {r.ping()}")
except Exception as e:
    print(f"  Redis: FAIL - {str(e)[:80]}")
