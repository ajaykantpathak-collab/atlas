import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Check what English generators exist
grade_str = "5"
grade_patterns = [f"class{grade_str}_", f"c{grade_str}_", f"class_{grade_str}_"]
aliases = ["english", "eng"]

qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

print("=== English generators (any grade) ===")
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    if any(a in qt_lower or a in module_name for a in aliases):
        matches_grade = any(p in module_name for p in grade_patterns)
        print(f"  {qt} (module: {qgen_modules.get(qt, '')}) grade_match={matches_grade}")
