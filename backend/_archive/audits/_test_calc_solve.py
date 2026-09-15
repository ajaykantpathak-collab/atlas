import urllib.request, json

# Test: differentiate x^3 + 2x^2
req_data = json.dumps({
    "problem_type": "calculus_differentiate",
    "values": {"expr": "x**3 + 2*x**2", "variable": "x", "order": 1},
    "seed": 0
}).encode()

r = urllib.request.Request(
    "http://localhost:8000/api/solver/solve",
    data=req_data,
    headers={"Content-Type": "application/json"}
)

try:
    resp = urllib.request.urlopen(r, timeout=10)
    data = json.loads(resp.read().decode())
    print("SUCCESS!")
    print(f"Problem type: {data.get('problem_type')}")
    print(f"Final answer: {data.get('final_answer')}")
    print(f"Steps: {len(data.get('steps', []))}")
    for s in data.get('steps', [])[:3]:
        print(f"  Step {s['step_number']}: {s['title']}")
        print(f"    {s['explanation'][:100]}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}")
    body = e.read().decode()
    print(body[:500])
except Exception as e:
    print(f"Error: {e}")
