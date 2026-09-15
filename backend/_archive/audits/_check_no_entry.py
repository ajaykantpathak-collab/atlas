"""Check what functions/classes NO_ENTRY files actually export."""
import re
import os

files = [
    (r"D:\platform\backend\solvers\cs\class10_cs_solver.py", "solver"),
    (r"D:\platform\backend\solvers\evs\class8_evs_solver.py", "solver"),
    (r"D:\platform\backend\solvers\soc\class11_soc_solver.py", "solver"),
    (r"D:\platform\backend\solvers\bio\class8_bio_questions.py", "questions"),
    (r"D:\platform\backend\solvers\biotech\class11_biotech_questions.py", "questions"),
    (r"D:\platform\backend\solvers\cs\class11_cs_questions.py", "questions"),
    (r"D:\platform\backend\solvers\econapp\class9_econapp_questions.py", "questions"),
    (r"D:\platform\backend\solvers\home\class12_home_questions.py", "questions"),
]

for path, ftype in files:
    name = os.path.basename(path)
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    # Find all function definitions
    funcs = re.findall(r'^def (\w+)', content, re.M)
    classes = re.findall(r'^class (\w+)', content, re.M)
    
    # Check for registry-like dicts
    registries = re.findall(r'^(\w+_REGISTRY\w*)\s*=', content, re.M)
    
    # Check for solve_ / generate_ / create_ functions
    solve_funcs = [f for f in funcs if f.startswith("solve_") or f.startswith("verify_") or f.startswith("compute_")]
    gen_funcs = [f for f in funcs if f.startswith("generate_") or f.startswith("create_")]
    
    print(f"\n{name} ({ftype}, {len(content.splitlines())}L):")
    print(f"  Functions: {funcs[:10]}{'...' if len(funcs) > 10 else ''}")
    print(f"  Classes: {classes[:5]}")
    print(f"  Registries: {registries}")
    print(f"  solve_* funcs: {solve_funcs}")
    print(f"  generate_* funcs: {gen_funcs}")
