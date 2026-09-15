import urllib.request, json

# Test diagnostic start
req_data = json.dumps({
    "student_id": "82fb3ab2-9f30-4888-8964-237e26a72d9e",
    "subject": "mathematics",
    "grade": 10,
    "num_questions": 5
}).encode()

r = urllib.request.Request(
    "http://localhost:8000/api/diagnostic/start",
    data=req_data,
    headers={"Content-Type": "application/json"}
)

try:
    resp = urllib.request.urlopen(r, timeout=30)
    data = json.loads(resp.read().decode())
    print("DIAGNOSTIC START SUCCESS!")
    print(f"Session ID: {data['session_id']}")
    print(f"Total questions: {data['total_questions']}")
    print(f"Topics: {data['topics_covered']}")
    print(f"First question: {data['question']['question_text'][:80]}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}")
    print(e.read().decode()[:500])
except Exception as e:
    print(f"Error: {e}")
