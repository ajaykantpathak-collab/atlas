"""Test all solver and question files - output full error details."""
import importlib.util
import sys
import os
from pathlib import Path

backend_dir = Path("D:/platform/backend")

solver_files = list(backend_dir.rglob("class*_solver.py"))
question_files = list(backend_dir.rglob("class*_questions.py"))
all_files = solver_files + question_files

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

print(f"OK: {ok} / FAIL: {fail} / Total: {ok + fail}")
print()

# Group by error type
from collections import defaultdict
by_type = defaultdict(list)
for parent, name, etype, msg in fail_details:
    by_type[etype].append(f"  {parent}/{name}: {msg}")

for etype in sorted(by_type.keys()):
    print(f"=== {etype} ({len(by_type[etype])}) ===")
    for line in by_type[etype]:
        print(line)
    print()
