import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry()
reg.initialize()
adapters = AdapterRegistry()
adapters.set_solver_registry(reg)

# Find what generator is producing Question objects for class 6 physics
# The matching for physics grade 6 would match class10_physics_questions (has "phy" and "c10" but not "c6")
# Actually let's check what matches
subject = "physics"
grade = 6
aliases = ["physics", "phy"]
grade_str = str(grade)
grade_patterns = [f"class{grade_str}_", f"c{grade_str}_", f"class_{grade_str}_"]

qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

subject_grade_match = []
subject_match = []
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    matches_subject = any(a in qt_lower or a in module_name for a in aliases)
    matches_grade = any(p in module_name for p in grade_patterns) or any(p in qt_lower for p in grade_patterns)
    if matches_subject and matches_grade:
        subject_grade_match.append((qt, qgen_modules.get(qt, "")))
    elif matches_subject:
        subject_match.append((qt, qgen_modules.get(qt, "")))

print("=== Class 6 Physics: subject+grade matches ===")
for qt, mod in subject_grade_match:
    print(f"  {qt} (module: {mod})")

print(f"\n=== Class 6 Physics: subject matches (first 10) ===")
for qt, mod in subject_match[:10]:
    print(f"  {qt} (module: {mod})")

# The Question object is coming from class10_physics_questions
# Check what C10P001-Q6781 looks like
print("\n=== Checking class10_physics_questions ===")
entry = reg._question_gens.get("class10_physics_questions")
if entry:
    print(f"Types: {list(entry.registry.keys())[:10]}")
    # Try the first one
    for qt in list(entry.registry.keys())[:3]:
        adapter = adapters.get_adapter(qt)
        if adapter:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                q = qs[0]
                print(f"\n  {qt}:")
                print(f"    question_text type: {type(q.get('question_text')).__name__}")
                print(f"    question_text: {str(q.get('question_text'))[:100]}")
                print(f"    keys: {list(q.keys())}")
