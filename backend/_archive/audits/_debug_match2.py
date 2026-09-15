"""Debug the full matching pipeline for physics grade 1."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

subject = "physics"
grade = 1
topic = "motion"

subject_aliases = {
    "physics": ["physics", "phy"],
}
aliases = subject_aliases.get(subject.lower(), [subject.lower()])
grade_str = str(grade)
topic_lower = topic.lower()

qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

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

subject_grade_match = []
subject_match = []
topic_match = []

for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    matches_subject = any(a in qt_lower or a in module_name for a in aliases)
    matches_grade = (
        any(p in module_name for p in grade_patterns) or
        any(p in qt_lower for p in grade_patterns) or
        module_name == f"class{grade_str}_questions" or
        module_name == f"class{grade_str}_{subject.lower()}_questions"
    )
    matches_topic = topic_lower in qt_lower or topic_lower in module_name

    if matches_subject and matches_grade:
        subject_grade_match.append((qt, qgen_modules.get(qt, "")))
    elif matches_subject:
        subject_match.append((qt, qgen_modules.get(qt, "")))
    elif matches_topic:
        topic_match.append((qt, qgen_modules.get(qt, "")))

print(f"Subject+grade matches: {len(subject_grade_match)}")
for qt, mod in subject_grade_match:
    print(f"  {qt} (module: {mod})")

print(f"\nSubject matches (first 10): {len(subject_match)}")
for qt, mod in subject_match[:10]:
    print(f"  {qt} (module: {mod})")

# Check if class1_physics_questions module matches
print(f"\n=== Checking class1_physics_questions module ===")
mod_name = "class1_physics_questions"
mod_lower = mod_name.lower()
print(f"  Module: {mod_name}")
print(f"  'class1_' in module: {'class1_' in mod_lower}")
print(f"  Grade patterns: {grade_patterns}")
print(f"  Any pattern in module: {any(p in mod_lower for p in grade_patterns)}")
print(f"  Exact match: {mod_lower == 'class1_questions'}")
print(f"  Subject match (physics in module): {any(a in mod_lower for a in aliases)}")
