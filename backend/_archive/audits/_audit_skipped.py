"""Audit all skipped solver/question files."""
import os
import re
from pathlib import Path

BACKEND = Path(r"D:\platform\backend\solvers")

skipped_solvers = [
    "class11_bs_solver", "class10_cs_solver", "class10_english_solver",
    "class10_evs_solver", "class8_evs_solver", "class12_geo_solver",
    "class12_histciv_solver", "class8_histciv_solver", "class11_maths_solver",
    "class11_pol_solver", "class11_soc_solver",
]

skipped_questions = [
    "class8_bio_questions", "class11_biotech_questions", "class12_biotech_questions",
    "class11_cs_questions", "class9_econapp_questions", "class8_geo_questions",
    "class11_home_questions", "class12_home_questions", "class11_maths_questions",
    "class11_physics_questions", "class12_pol_questions", "class12_psy_questions",
    "class11_soc_questions",
]

def find_file(name, is_solver):
    # Name already includes _solver or _questions suffix
    target = name + ".py"
    for root, dirs, files in os.walk(str(BACKEND)):
        if target in files:
            return Path(root) / target
    return None

def audit(name, is_solver):
    fpath = find_file(name, is_solver)
    if not fpath:
        return name, "NOT_FOUND", 0, False, False, ""
    
    content = fpath.read_text(encoding="utf-8", errors="replace")
    lines = content.splitlines()
    n = len(lines)
    last = lines[-1].strip() if lines else ""
    
    has_reg = bool(re.search(r'(SOLVER_REGISTRY|QUESTION_REGISTRY)\s*=', content))
    
    if is_solver:
        has_entry = bool(re.search(r'^def (solve|verify|compute|calculate|check_answer|evaluate|run)', content, re.M))
        has_cls = bool(re.search(r'^class \w*(Solver|Engine|Calculator|Evaluator)', content, re.M))
    else:
        has_entry = bool(re.search(r'^def (generate|create)', content, re.M))
        has_cls = bool(re.search(r'^class \w*(Generator|QuestionBank)', content, re.M))
    
    entry = has_entry or has_cls
    
    trunc_markers = ["truncated", "incomplete", "not implemented", "# return"]
    is_trunc = any(m in last.lower() for m in trunc_markers)
    
    empty_func = bool(re.search(r'def \w+\([^)]*\):\s*$', content, re.M))
    
    # Also check for functions with only "pass" or just a docstring
    has_only_pass = bool(re.search(r'def \w+\([^)]*\):\s*(pass|\.\.\.)\s*$', content, re.M))
    
    if is_trunc:
        status = "TRUNCATED"
    elif n < 50:
        status = "TOO_SHORT"
    elif empty_func or has_only_pass:
        status = "EMPTY_FUNCS"
    elif not has_reg and not entry:
        status = "NO_ENTRY"
    else:
        status = "OK"
    
    return name, status, n, has_reg, entry, last

print("=" * 110)
print("SKIPPED SOLVER FILES")
print("=" * 110)
counts = {}
for name in skipped_solvers:
    n, status, lines, has_reg, entry, last = audit(name, True)
    counts[status] = counts.get(status, 0) + 1
    print(f"  {status:12} {n:30} {lines:5}L  reg={has_reg}  entry={entry}  last: {last}")

print()
print("=" * 110)
print("SKIPPED QUESTION FILES")
print("=" * 110)
for name in skipped_questions:
    n, status, lines, has_reg, entry, last = audit(name, False)
    counts[status] = counts.get(status, 0) + 1
    print(f"  {status:12} {n:30} {lines:5}L  reg={has_reg}  entry={entry}  last: {last}")

print()
print("=" * 110)
total = len(skipped_solvers) + len(skipped_questions)
print(f"SUMMARY: {total} files")
for k, v in sorted(counts.items()):
    print(f"  {k}: {v}")
