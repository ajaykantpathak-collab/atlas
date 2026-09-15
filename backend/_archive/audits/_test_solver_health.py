import urllib.request, json

resp = urllib.request.urlopen("http://localhost:8000/api/solver/health", timeout=15)
data = json.loads(resp.read().decode())
print(f"Status: {data['status']}")
print(f"Total: {data['total_problem_types']}")
loaded = sum(1 for e in data['loaded_solvers'] if e['loaded'])
not_loaded = sum(1 for e in data['loaded_solvers'] if not e['loaded'])
print(f"Loaded: {loaded}/{data['total_problem_types']}")
print(f"Not loaded: {not_loaded}")
print("Sample loaded:")
for e in data['loaded_solvers'][:5]:
    print(f"  {e['problem_type']}: loaded={e['loaded']} err={e.get('error')}")
print("Sample not loaded:")
not_loaded_list = [e for e in data['loaded_solvers'] if not e['loaded']]
for e in not_loaded_list[:5]:
    print(f"  {e['problem_type']}: loaded={e['loaded']} err={e.get('error')}")
