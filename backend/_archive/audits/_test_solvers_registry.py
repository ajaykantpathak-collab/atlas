"""Test all active solvers replicating registry's import logic."""
import importlib.util
import sys
from pathlib import Path
from collections import defaultdict

solvers_dir = Path("D:/platform/backend/solvers")

all_files = []
for subdir in solvers_dir.iterdir():
    if subdir.is_dir() and subdir.name != "__pycache__" and subdir.name != "yaml":
        all_files.extend(subdir.glob("class*_solver.py"))
        all_files.extend(subdir.glob("class*_questions.py"))
all_files.extend(solvers_dir.glob("solver_*.py"))

ok = 0
fail = 0
fail_details = []

for f in all_files:
    mod_name = f"solvers._plugins.{f.stem}"

    # Replicate registry's path setup
    solvers_root = str(f.parents[1]) if len(f.parents) > 1 else str(f.parent)
    parent_dir = str(f.parent)
    for p in (solvers_root, parent_dir):
        if p not in sys.path:
            sys.path.insert(0, p)

    try:
        spec = importlib.util.spec_from_file_location(mod_name, str(f))
        if spec is None or spec.loader is None:
            raise ImportError(f"Could not create spec for {f}")
        module = importlib.util.module_from_spec(spec)
        sys.modules[mod_name] = module
        spec.loader.exec_module(module)
        ok += 1
    except Exception as e:
        fail += 1
        fail_details.append((f.parent.name, f.name, type(e).__name__, str(e)[:120]))

print(f"ACTIVE solvers/ (registry-style import):")
print(f"  OK: {ok} / FAIL: {fail} / Total: {ok + fail}")
print()

if fail_details:
    by_type = defaultdict(list)
    for parent, name, etype, msg in fail_details:
        by_type[etype].append(f"  {parent}/{name}: {msg}")

    for etype in sorted(by_type.keys()):
        print(f"=== {etype} ({len(by_type[etype])}) ===")
        for line in by_type[etype]:
            print(line)
        print()
else:
    print("ALL FILES IMPORT SUCCESSFULLY!")
