import urllib.request, json

# Test diagnostic with real questions
req_data = json.dumps({
    "student_id": "82fb3ab2-9f30-4888-8964-237e26a72d9e",
    "subject": "mathematics",
    "grade": 5
}).encode()

r = urllib.request.Request("http://localhost:8000/api/diagnostic/start",
                           data=req_data, headers={"Content-Type": "application/json"})

try:
    resp = urllib.request.urlopen(r, timeout=30)
    data = json.loads(resp.read().decode())
    print(f"Diagnostic started: {data['total_questions']} questions")
    print(f"Topics: {data['topics_covered']}")
    q = data['question']
    qtext = q.get('question_text', '')
    is_placeholder = 'Diagnostic question' in qtext
    print(f"\nFirst question:")
    print(f"  Text: {qtext[:150]}")
    print(f"  Type: {q.get('question_type')}")
    print(f"  Difficulty: {q.get('difficulty')}")
    print(f"  Is REAL: {not is_placeholder}")
    if q.get('options'):
        print(f"  Options: {q['options'][:3]}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:300]}")
except Exception as e:
    print(f"Error: {e}")
