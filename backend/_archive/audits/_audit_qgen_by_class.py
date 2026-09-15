"""Audit question generators by class level."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Get all question gen modules with their types
modules = {}
for name, entry in reg._question_gens.items():
    modules[name] = list(entry.registry.keys())

# Classify by class level
class_1_5 = {}
class_6_12 = {}
other = {}

for name, types in modules.items():
    name_lower = name.lower()
    # Detect class from module name
    cls = None
    for i in range(1, 13):
        if f"class{i}" in name_lower or f"class_{i}" in name_lower:
            cls = i
            break
        if f"c{i}" in name_lower and not any(f"c{i}{j}" in name_lower for j in range(10)):
            cls = i
            break
    
    if cls and cls <= 5:
        class_1_5[name] = types
    elif cls and cls >= 6:
        class_6_12[name] = types
    else:
        other[name] = types

print(f"=== CLASS 1-5 GENERATORS ===")
print(f"Modules: {len(class_1_5)}")
total_1_5 = 0
for name, types in sorted(class_1_5.items()):
    print(f"  {name}: {len(types)} types")
    for t in types:
        print(f"    - {t}")
    total_1_5 += len(types)
print(f"Total class 1-5 types: {total_1_5}")

print(f"\n=== CLASS 6-12 GENERATORS ===")
print(f"Modules: {len(class_6_12)}")
total_6_12 = 0
for name, types in sorted(class_6_12.items()):
    total_6_12 += len(types)
print(f"Total class 6-12 types: {total_6_12}")

print(f"\n=== OTHER/UNCLASSIFIED ===")
print(f"Modules: {len(other)}")
for name, types in sorted(other.items()):
    print(f"  {name}: {types[:3]}{'...' if len(types) > 3 else ''}")

# Check which subjects are covered for class 1-5
print(f"\n=== CLASS 1-5 SUBJECT COVERAGE ===")
subjects_1_5 = set()
for name in class_1_5:
    for subj in ["math", "physics", "chem", "bio", "geo", "hist", "civ", "cs",
                 "evs", "english", "hindi", "comm", "econ"]:
        if subj in name.lower():
            subjects_1_5.add(subj)
print(f"Subjects covered: {sorted(subjects_1_5)}")

# What's missing
all_subjects = ["maths", "physics", "chemistry", "biology", "geography",
                "history", "civics", "computer_science", "evs", "english", "hindi"]
missing_1_5 = []
for s in all_subjects:
    aliases = {"maths": "math", "chemistry": "chem", "biology": "bio",
               "geography": "geo", "history": "hist", "civics": "civ",
               "computer_science": "cs", "english": "english", "hindi": "hindi",
               "physics": "physics", "evs": "evs"}
    alias = aliases.get(s, s)
    if alias not in subjects_1_5:
        missing_1_5.append(s)
print(f"Missing subjects for class 1-5: {missing_1_5}")
