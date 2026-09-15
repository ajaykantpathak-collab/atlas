import urllib.request, json

resp = urllib.request.urlopen("http://localhost:8000/api/solver/health", timeout=15)
data = json.loads(resp.read().decode())

# Check for calculus types
calc_types = [e for e in data['loaded_solvers'] if 'calculus' in e['problem_type']]
print(f"Calculus types: {len(calc_types)}")
for e in calc_types:
    print(f"  {e['problem_type']}: loaded={e['loaded']}")

# Check for solver_v2 types
v2_types = [e for e in data['loaded_solvers'] if e['problem_type'].startswith(('phy_', 'chem_', 'acc_', 'appmath_'))]
print(f"\nSolverV2 types: {len(v2_types)}")
for e in v2_types:
    print(f"  {e['problem_type']}: loaded={e['loaded']}")

print(f"\nTotal: {data['total_problem_types']}, Loaded: {sum(1 for e in data['loaded_solvers'] if e['loaded'])}")
