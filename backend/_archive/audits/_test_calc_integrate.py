import urllib.request, json

# Test: integrate x^2 from 0 to 1
req_data = json.dumps({
    "problem_type": "calculus_integrate",
    "values": {"expr": "x**2", "variable": "x", "lower": 0, "upper": 1},
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
    print("INTEGRATION SUCCESS!")
    print(f"Final answer: {data.get('final_answer')}")
    print(f"Steps: {len(data.get('steps', []))}")
    for s in data.get('steps', []):
        print(f"  Step {s['step_number']}: {s['title']}")
        print(f"    {s['explanation'][:120]}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}")
    print(e.read().decode()[:500])
