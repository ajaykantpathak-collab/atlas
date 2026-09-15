import urllib.request, json

# Test analytics health
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/analytics/health", timeout=10)
    data = json.loads(resp.read().decode())
    print("ANALYTICS HEALTH:")
    print(f"  Status: {data.get('status')}")
    print(f"  ClickHouse: {data.get('clickhouse')}")
    print(f"  Tables: {data.get('tables')}")
except Exception as e:
    print(f"Error: {e}")

# Test student stats
try:
    resp = urllib.request.urlopen("http://localhost:8000/api/analytics/student/82fb3ab2-9f30-4888-8964-237e26a72d9e/stats", timeout=10)
    data = json.loads(resp.read().decode())
    print(f"\nSTUDENT STATS: {json.dumps(data, indent=2)[:300]}")
except Exception as e:
    print(f"Stats error: {e}")
