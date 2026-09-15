import urllib.request, json

# Test IRT report (read-only)
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/analytics/irt/report", timeout=15)
    data = json.loads(resp.read().decode())
    print("IRT REPORT:")
    print(f"  Total questions with data: {data.get('total_questions_with_data')}")
    print(f"  Min sample size: {data.get('min_sample_size')}")
    questions = data.get('questions', [])
    print(f"  Sample questions: {len(questions)}")
    for q in questions[:3]:
        print(f"    {q}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:300]}")
except Exception as e:
    print(f"Error: {e}")
