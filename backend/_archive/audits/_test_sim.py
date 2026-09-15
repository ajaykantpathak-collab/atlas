import urllib.request, json

# Test sim health
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/sim/health", timeout=15)
    data = json.loads(resp.read().decode())
    print(f"SIM HEALTH:")
    print(f"  Status: {data.get('status')}")
    print(f"  Sim count: {data.get('sim_count')}")
    print(f"  Verified: {data.get('verified_count')}")
except Exception as e:
    print(f"Health error: {e}")

# Test sim list (first page)
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/sim/list?page=1&page_size=5", timeout=15)
    data = json.loads(resp.read().decode())
    print(f"\nSIM LIST:")
    print(f"  Total: {data.get('total')}")
    print(f"  Page: {data.get('page')}")
    print(f"  Items on page: {len(data.get('simulations', []))}")
    for s in data.get('simulations', [])[:3]:
        print(f"    {s['sim_id']}: {s['title'][:60]}")
except Exception as e:
    print(f"List error: {e}")

# Test filter by subject
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/sim/list?subject=physics&page=1&page_size=3", timeout=15)
    data = json.loads(resp.read().decode())
    print(f"\nPHYSICS SIMS:")
    print(f"  Total physics: {data.get('total')}")
    for s in data.get('simulations', []):
        print(f"    {s['sim_id']}: {s['title'][:60]}")
except Exception as e:
    print(f"Filter error: {e}")
