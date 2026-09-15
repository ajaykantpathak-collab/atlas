"""Check only core science + language gaps for grades 6-12."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

core_subjects = {
    "physics": ["physics", "phy"],
    "chemistry": ["chem", "chemistry"],
    "biology": ["bio", "biology"],
    "mathematics": ["math", "maths"],
    "english": ["english", "eng"],
    "hindi": ["hindi"],
}

print("=== CORE SUBJECT GAPS (Grades 6-12) ===\n")
for grade in range(6, 13):
    grade_str = str(grade)
    grade_patterns = [f"class{grade_str}_", f"c{grade_str}_", f"class_{grade_str}_"]
    for subject, aliases in core_subjects.items():
        count = 0
        modules = set()
        for qt in qgen_types:
            qt_lower = qt.lower()
            module_name = qgen_modules.get(qt, "").lower()
            matches_subject = any(a in qt_lower or a in module_name for a in aliases)
            matches_grade = any(p in module_name for p in grade_patterns)
            if matches_subject and matches_grade:
                count += 1
                modules.add(qgen_modules.get(qt, ""))
        status = "OK" if count > 0 else "MISSING"
        if count == 0:
            print(f"  Grade {grade:>2} {subject:<15} {status}  (need to create class{grade}_{subject[:3]}_questions.py)")
        else:
            print(f"  Grade {grade:>2} {subject:<15} {status}  ({count} gens, {','.join(sorted(modules)[:2])})")
