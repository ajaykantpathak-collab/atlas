"""Test import all fixed solver/question files."""
import importlib.util
import sys
from pathlib import Path

files = [
    r"D:\platform\backend\solvers\cs\class10_cs_solver.py",
    r"D:\platform\backend\solvers\evs\class8_evs_solver.py",
    r"D:\platform\backend\solvers\soc\class11_soc_solver.py",
    r"D:\platform\backend\solvers\bio\class8_bio_questions.py",
    r"D:\platform\backend\solvers\biotech\class11_biotech_questions.py",
    r"D:\platform\backend\solvers\cs\class11_cs_questions.py",
    r"D:\platform\backend\solvers\econapp\class9_econapp_questions.py",
    r"D:\platform\backend\solvers\home\class12_home_questions.py",
    # Regenerated files
    r"D:\platform\backend\solvers\english\class10_english_solver.py",
    r"D:\platform\backend\solvers\evs\class10_evs_solver.py",
    r"D:\platform\backend\solvers\geo\class12_geo_solver.py",
    r"D:\platform\backend\solvers\histciv\class12_histciv_solver.py",
    r"D:\platform\backend\solvers\histciv\class8_histciv_solver.py",
    r"D:\platform\backend\solvers\maths\class11_maths_solver.py",
    r"D:\platform\backend\solvers\bs\class11_bs_solver.py",
    r"D:\platform\backend\solvers\geo\class8_geo_questions.py",
    r"D:\platform\backend\solvers\home\class11_home_questions.py",
    r"D:\platform\backend\solvers\home\class12_home_questions.py",
    r"D:\platform\backend\solvers\maths\class11_maths_questions.py",
    r"D:\platform\backend\solvers\physics\class11_physics_questions.py",
    r"D:\platform\backend\solvers\pol\class12_pol_questions.py",
    r"D:\platform\backend\solvers\psy\class12_psy_questions.py",
    r"D:\platform\backend\solvers\soc\class11_soc_questions.py",
]

ok = 0
fail = 0
for path in files:
    name = Path(path).stem
    try:
        spec = importlib.util.spec_from_file_location(name, path)
        mod = importlib.util.module_from_spec(spec)
        sys.modules[name] = mod
        spec.loader.exec_module(mod)
        # Check for registry or entry functions
        has_reg = hasattr(mod, "SOLVER_REGISTRY") or hasattr(mod, "QUESTION_REGISTRY")
        has_solve = any(a.startswith("solve_") for a in dir(mod) if not a.startswith("_"))
        has_gen = any(a.startswith("generate_") for a in dir(mod) if not a.startswith("_"))
        entry = has_reg or has_solve or has_gen
        status = "OK" if entry else "NO_ENTRY"
        if entry:
            ok += 1
        else:
            fail += 1
        print(f"  {status:8} {name}")
    except Exception as e:
        fail += 1
        print(f"  IMPORT_ERR {name}: {str(e)[:80]}")

print(f"\nSUMMARY: {ok} OK, {fail} FAIL out of {len(files)}")
