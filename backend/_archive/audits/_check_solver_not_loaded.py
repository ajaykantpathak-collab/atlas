"""Analyze the 113 not-loaded solvers to find the pattern."""
import urllib.request, json

resp = urllib.request.urlopen('http://localhost:8000/api/solver/health', timeout=15)
data = json.loads(resp.read())
solvers = data.get('loaded_solvers', [])
not_loaded = [s for s in solvers if not s.get('loaded')]

print(f"Total not loaded: {len(not_loaded)}")
print()

# Categorize
class_based = []
func_based = []
for s in not_loaded:
    pt = s.get("problem_type", "")
    if pt[0].isupper() or "Solver" in pt:
        class_based.append(pt)
    else:
        func_based.append(pt)

print(f"Class-based (capitalized): {len(class_based)}")
print(f"Func-based (lowercase): {len(func_based)}")
print()

# Show all class-based
print("Class-based not loaded:")
for pt in sorted(class_based):
    print(f"  {pt}")

print()
print("Func-based not loaded:")
for pt in sorted(func_based):
    print(f"  {pt}")
