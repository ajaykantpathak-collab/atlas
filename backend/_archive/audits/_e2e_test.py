"""End-to-end test of the student journey."""
import urllib.request, json, time

BASE = "http://localhost:8000"

def api(method, path, body=None, token=None):
    url = BASE + path
    data = json.dumps(body).encode() if body else None
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=60)
        return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return e.code, json.loads(body)
        except:
            return e.code, body
    except Exception as e:
        return 0, str(e)

print("=" * 60)
print("E2E TEST: Student Journey")
print("=" * 60)

# 1. Register
print("\n1. REGISTER")
ts = int(time.time())
status, data = api("POST", "/api/auth/register", {
    "email": f"test_e2e_{ts}@test.com",
    "password": "TestPass123!",
    "full_name": "E2E Test Student",
    "role": "student",
    "class_level": "12",
})
print(f"  Status: {status}")
if status in (201, 200):
    token = data.get("access_token") or data.get("token")
    user_id = data.get("user_id") or data.get("student_id") or data.get("id", "test")
    print(f"  User ID: {user_id}")
    if not token:
        # Login to get token
        status2, data2 = api("POST", "/api/auth/login", {
            "email": f"test_e2e_{ts}@test.com",
            "password": "TestPass123!",
        })
        if status2 == 200:
            token = data2.get("access_token")
            print(f"  Logged in, token: {token[:30]}...")
else:
    print(f"  Response: {str(data)[:200]}")

# 2. Browse content
print("\n2. BROWSE CONTENT")
status, data = api("GET", "/api/content/subjects")
print(f"  Subjects: {status} -> {str(data)[:200]}")

status, data = api("GET", "/api/content/subjects/physics/classes")
print(f"  Physics classes: {status} -> {str(data)[:200]}")

# 3. Get lesson content
print("\n3. GET LESSON")
status, data = api("GET", "/api/content/lesson/c12_phy_cbse_001")
print(f"  Lesson: {status} -> {str(data)[:300]}")

# 4. Start practice
print("\n4. START PRACTICE")
status, data = api("POST", "/api/practice/start", {
    "student_id": str(user_id),
    "subject": "physics",
    "num_questions": 3,
}, token=token)
print(f"  Practice start: {status} -> {str(data)[:300]}")

# 5. Ask tutor
print("\n5. ASK TUTOR")
status, data = api("POST", "/api/tutor/ask", {
    "user_query": "What is Ohm's law?",
    "user_id": str(user_id),
    "node_id": "c12_phy_cbse_041",
}, token=token)
print(f"  Tutor: {status} -> {str(data)[:300]}")

# 6. Get dashboard
print("\n6. DASHBOARD")
status, data = api("GET", f"/api/dashboard/student/{user_id}")
print(f"  Dashboard: {status} -> {str(data)[:300]}")

# 7. Sim list
print("\n7. SIMULATIONS")
status, data = api("GET", "/api/sim/list?subject=physics&limit=5")
print(f"  Sims: {status} -> {str(data)[:300]}")

print("\n" + "=" * 60)
print("E2E TEST COMPLETE")
print("=" * 60)
