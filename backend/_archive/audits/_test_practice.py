import urllib.request, json

req_data = json.dumps({
    "student_id": "82fb3ab2-9f30-4888-8964-237e26a72d9e",
    "subject": "mathematics",
    "num_questions": 3
}).encode()

r = urllib.request.Request(
    "http://localhost:8000/api/practice/start",
    data=req_data,
    headers={"Content-Type": "application/json"}
)

try:
    resp = urllib.request.urlopen(r, timeout=15)
    print(f"HTTP {resp.status}")
    print(resp.read().decode())
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}")
    print(e.read().decode())
