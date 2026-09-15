"""Check matching for biology grade 7 and geography grade 8."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Biology grade 7
subject = "biology"
grade = 7
aliases = ["bio", "biology"]
grade_str = str(grade)

qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

matches = []
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    matches_subject = any(a in qt_lower or a in module_name for a in aliases)
    matches_grade = grade_str in qt_lower or grade_str in module_name
    if matches_subject and matches_grade:
        matches.append((qt, qgen_modules.get(qt, "")))

print(f"=== Biology grade 7 ===")
print(f"Matches: {len(matches)}")
for qt, mod in matches:
    print(f"  {qt} (module: {mod})")

# Geography grade 8
subject = "geography"
grade = 8
aliases = ["geo", "geography"]
grade_str = str(grade)

matches = []
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    matches_subject = any(a in qt_lower or a in module_name for a in aliases)
    matches_grade = grade_str in qt_lower or grade_str in module_name
    if matches_subject and matches_grade:
        matches.append((qt, qgen_modules.get(qt, "")))

print(f"\n=== Geography grade 8 ===")
print(f"Matches: {len(matches)}")
for qt, mod in matches:
    print(f"  {qt} (module: {mod})")

# Also check subject-only matches
print(f"\n=== Biology (any grade) ===")
bio_matches = []
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    if any(a in qt_lower or a in module_name for a in ["bio"]):
        bio_matches.append((qt, qgen_modules.get(qt, "")))
print(f"Matches: {len(bio_matches)}")
for qt, mod in bio_matches[:15]:
    print(f"  {qt} (module: {mod})")

print(f"\n=== Geography (any grade) ===")
geo_matches = []
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    if any(a in qt_lower or a in module_name for a in ["geo"]):
        geo_matches.append((qt, qgen_modules.get(qt, "")))
print(f"Matches: {len(geo_matches)}")
for qt, mod in geo_matches[:15]:
    print(f"  {qt} (module: {mod})")
