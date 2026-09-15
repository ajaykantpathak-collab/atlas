"""Check solver loading status from the API."""
import urllib.request, json

resp = urllib.request.urlopen('http://localhost:8000/api/solver/health', timeout=15)
data = json.loads(resp.read())
total = data.get('total_problem_types', 0)
solvers = data.get('loaded_solvers', [])
loaded = sum(1 for s in solvers if s.get('loaded'))
not_loaded = sum(1 for s in solvers if not s.get('loaded'))
print(f"Total: {total}")
print(f"Loaded: {loaded}")
print(f"Not loaded: {not_loaded}")

# Show not loaded
not_loaded_list = [s for s in solvers if not s.get('loaded')]
print(f"\nSample NOT loaded (first 20):")
for s in not_loaded_list[:20]:
    pt = s.get("problem_type", "?")
    err = s.get("error", "")[:80]
    print(f"  {pt}: {err}")

# Show loaded sample
print(f"\nSample LOADED (first 10):")
for s in [x for x in solvers if x.get('loaded')][:10]:
    print(f"  {s.get('problem_type', '?')}")
