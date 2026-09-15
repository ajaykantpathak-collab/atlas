import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

grade_str = "1"
grade_patterns = [
    f"class{grade_str}_",
    f"class{grade_str}.",
    f"class_{grade_str}_",
    f"class_{grade_str}.",
    f"c{grade_str}_",
    f"c{grade_str}.",
    f"_c{grade_str}_",
    f"_c{grade_str}.",
]

# Check which modules match
for name in sorted(reg._question_gens.keys()):
    name_lower = name.lower()
    matches = any(p in name_lower for p in grade_patterns)
    exact = name_lower == f"class{grade_str}_questions"
    if matches or exact or "class1" in name_lower:
        print(f"  {name}: pattern_match={matches}, exact={exact}")
