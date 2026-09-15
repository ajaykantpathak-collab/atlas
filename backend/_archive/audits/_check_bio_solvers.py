"""Check the 11 not-loaded solvers in detail."""
import urllib.request, json

resp = urllib.request.urlopen('http://localhost:8000/api/solver/health', timeout=15)
data = json.loads(resp.read())
solvers = data.get('loaded_solvers', [])
not_loaded = [s for s in solvers if not s.get('loaded')]

print(f"Total not loaded: {len(not_loaded)}")
for s in not_loaded:
    pt = s.get("problem_type", "")
    err = s.get("error", "")
    print(f"  {pt}: {err}")

# Now check the registry directly
print("\n--- Direct registry check ---")
import sys
sys.path.insert(0, "D:\\platform\\backend")
from solvers.registry import get_registry
reg = get_registry()
for pt in ['biotechnology', 'reproduction', 'health', 'molecular_biology', 'ecology', 'genetics', 'evolution']:
    solver = reg.get_solver(pt)
    if solver is not None:
        print(f"  {pt}: type={type(solver).__name__}, callable={callable(solver)}, has_solve={hasattr(solver, 'solve')}")
    else:
        print(f"  {pt}: None (not in registry)")
