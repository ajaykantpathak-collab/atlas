import urllib.request, json

req_data = json.dumps({
    "user_query": "I don't understand how derivatives work",
    "user_id": "test_student",
    "mastery": 0.2,
    "subject": "mathematics",
    "class_level": 11
}).encode()

r = urllib.request.Request(
    "http://localhost:8000/api/tutor/ask",
    data=req_data,
    headers={"Content-Type": "application/json"}
)

try:
    resp = urllib.request.urlopen(r, timeout=30)
    data = json.loads(resp.read().decode())
    print("TUTOR ASK SUCCESS!")
    print(f"Text: {data.get('text', '')[:200]}")
    print(f"Hint: {data.get('hint', '')[:200]}")
    print(f"Intent: {data.get('intent')}")
    print(f"Mastery: {data.get('mastery_level')}")
    print(f"Hint level: {data.get('hint_level')}")
    print(f"Quality: {data.get('quality_score')}")
    print(f"Latency: {data.get('latency_ms'):.0f}ms")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}")
    print(e.read().decode()[:500])
except Exception as e:
    print(f"Error: {e}")
