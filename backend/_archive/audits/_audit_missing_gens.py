"""Audit which class+subject combinations have NO generators at all."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Build module → grade mapping
qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

# All subjects we expect
subjects = [
    "mathematics", "physics", "chemistry", "biology", "english",
    "hindi", "history", "geography", "civics", "economics",
    "computer_science", "evs", "commerce", "accountancy",
    "business_studies", "biotechnology", "applied_maths",
    "home_science", "legal_studies", "mass_media", "psychology",
    "sociology", "political_science",
]

subject_aliases = {
    "mathematics": ["math", "maths"],
    "physics": ["physics", "phy"],
    "chemistry": ["chem", "chemistry"],
    "biology": ["bio", "biology"],
    "geography": ["geo", "geography"],
    "history": ["hist", "history"],
    "civics": ["civ", "civics"],
    "history_civics": ["histciv", "historycivics"],
    "computer_science": ["cs", "computer"],
    "economics": ["econ", "economics"],
    "evs": ["evs"],
    "english": ["english", "eng"],
    "hindi": ["hindi"],
    "commerce": ["comm", "commerce"],
    "accountancy": ["acc", "accountancy"],
    "business_studies": ["bs", "business"],
    "biotechnology": ["biotech"],
    "applied_maths": ["appmath", "appliedmaths"],
    "home_science": ["home"],
    "legal_studies": ["legal"],
    "mass_media": ["massmedia"],
    "psychology": ["psy"],
    "sociology": ["soc"],
    "political_science": ["pol"],
}

print(f"{'Grade':>5} {'Subject':<22} {'Has Gen':<8} {'Count':<6} {'Modules'}")
print("-" * 80)

missing = []
for grade in range(6, 13):
    grade_str = str(grade)
    grade_patterns = [
        f"class{grade_str}_", f"c{grade_str}_",
        f"class_{grade_str}_",
    ]
    for subject in subjects:
        aliases = subject_aliases.get(subject, [subject])
        count = 0
        modules = set()
        for qt in qgen_types:
            qt_lower = qt.lower()
            module_name = qgen_modules.get(qt, "").lower()
            matches_subject = any(a in qt_lower or a in module_name for a in aliases)
            matches_grade = (
                any(p in module_name for p in grade_patterns) or
                module_name == f"class{grade_str}_questions"
            )
            if matches_subject and matches_grade:
                count += 1
                modules.add(qgen_modules.get(qt, ""))

        has = "YES" if count > 0 else "NO"
        if count == 0:
            missing.append((grade, subject))
        if count > 0 or subject in ["english", "hindi", "evs", "civics"]:
            mod_str = ",".join(sorted(modules)[:2])
            print(f"{grade:>5} {subject:<22} {has:<8} {count:<6} {mod_str}")

print(f"\n=== MISSING GENERATORS ({len(missing)}) ===")
for grade, subject in missing:
    print(f"  Grade {grade} {subject}")
