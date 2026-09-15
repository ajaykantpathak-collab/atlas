"""Test all solver and question files for import errors."""
import importlib.util
import sys
import os
from pathlib import Path

backend_dir = Path("D:/platform/backend")
solvers_dir = backend_dir / "solvers"

# Find all solver and question files
solver_files = list(backend_dir.rglob("class*_solver.py"))
question_files = list(backend_dir.rglob("class*_questions.py"))

all_files = solver_files + question_files

ok = 0
fail = 0
errors = {}

for f in all_files:
    mod_name = f.stem
    try:
        spec = importlib.util.spec_from_file_location(mod_name, str(f))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        ok += 1
    except Exception as e:
        fail += 1
        err_type = type(e).__name__
        errors.setdefault(err_type, []).append(f"{f.parent.name}/{f.name}: {str(e)[:80]}")

print(f"Import OK: {ok}")
print(f"Import FAIL: {fail}")
print(f"Total: {ok + fail}")
print()
print("=== Errors by type ===")
for etype, files in sorted(errors.items(), key=lambda x: -len(x[1])):
    print(f"\n{etype} ({len(files)} files):")
    for f in files[:5]:
        print(f"  {f}")
    if len(files) > 5:
        print(f"  ... and {len(files) - 5} more")
