"""Test ONLY the active solvers/ directory (not solvers_regen/)."""
import importlib.util
from pathlib import Path
from collections import defaultdict

solvers_dir = Path("D:/platform/backend/solvers")

# Only files directly in solvers/ subdirectories (not solvers_regen)
all_files = []
for subdir in solvers_dir.iterdir():
    if subdir.is_dir() and subdir.name != "__pycache__" and subdir.name != "yaml":
        all_files.extend(subdir.glob("class*_solver.py"))
        all_files.extend(subdir.glob("class*_questions.py"))

# Also check root solvers/ for solver_*.py files
all_files.extend(solvers_dir.glob("solver_*.py"))

ok = 0
fail = 0
fail_details = []

for f in all_files:
    mod_name = f.stem
    try:
        spec = importlib.util.spec_from_file_location(mod_name, str(f))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        ok += 1
    except Exception as e:
        fail += 1
        fail_details.append((f.parent.name, f.name, type(e).__name__, str(e)[:120]))

print(f"ACTIVE solvers/ directory:")
print(f"  OK: {ok} / FAIL: {fail} / Total: {ok + fail}")
print()

by_type = defaultdict(list)
for parent, name, etype, msg in fail_details:
    by_type[etype].append(f"  {parent}/{name}: {msg}")

for etype in sorted(by_type.keys()):
    print(f"=== {etype} ({len(by_type[etype])}) ===")
    for line in by_type[etype]:
        print(line)
    print()
