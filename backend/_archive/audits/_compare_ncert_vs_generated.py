"""Compare NCERT textbooks available vs CBSE nodes actually generated."""
import json
from pathlib import Path
from collections import defaultdict

# What NCERT textbooks are available
NCERT_PATH = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")
ncert_subjects = defaultdict(set)
for grade_dir in sorted(NCERT_PATH.iterdir()):
    if not grade_dir.is_dir() or not grade_dir.name.startswith("grade_"):
        continue
    grade = int(grade_dir.name.replace("grade_", ""))
    for subj_dir in grade_dir.iterdir():
        if subj_dir.is_dir():
            ncert_subjects[grade].add(subj_dir.name)

# What was actually generated
CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
generated = defaultdict(lambda: defaultdict(int))
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                cls = node.get("class_level", "?")
                generated[cls][subject] += 1
    except:
        pass

# NCERT subject name → our subject name mapping
SUBJ_MAP = {
    "Mathematics": "maths",
    "Applied_Mathematics": "applied_maths",
    "Science": "science",
    "Physics": "physics",
    "Physics_1": "physics",
    "Physics_2": "physics",
    "Chemistry": "chemistry",
    "Chemistry_1": "chemistry",
    "Chemistry_2": "chemistry",
    "Biology": "biology",
    "Biotechnology": "biotech",
    "English": "English Literature",
    "Hindi": "Hindi",
    "History": "hist",
    "Civics": "history_civics",
    "Geography": "geography",
    "Social_Science": "history_civics",
    "Economics": "economics",
    "Accountancy": "accounts",
    "Business_Studies": "business_studies",
    "Computer_Science": "computer_science",
    "Informatics_Practices": "computer_science",
    "Political_Science": "political_science",
    "Psychology": "psychology",
    "Sociology": "sociology",
    "Home_Science": "home_science",
    "Legal_Studies": "legal_studies",
    "Artificial_Intelligence": "ai",
    "Fine_Art": "fine_art",
    "Health_and_Physical_Education": "hpe",
    "Physical_Education_and_Well_Being": "hpe",
    "Arts": "arts",
    "The_World_Around_Us": "evs",
    "Environmental_Studies": "evs",
    "Knowledge_Traditions_Practices_of_India": "ktpi",
    "Skill_Education": "skill_education",
}

print(f"{'='*90}")
print(f"  NCERT TEXTBOOKS vs GENERATED CBSE NODES")
print(f"{'='*90}")
print(f"{'Grade':>5s} {'NCERT Subject':30s} {'→ Our Subject':25s} {'Nodes':>6s} {'Status':>10s}")
print("-" * 90)

total_generated = 0
total_missing = 0
total_partial = 0

for grade in range(1, 13):
    ncert_subjs = ncert_subjects.get(grade, set())
    gen_subjs = generated.get(grade, {})

    for ncert_subj in sorted(ncert_subjs):
        our_subj = SUBJ_MAP.get(ncert_subj, ncert_subj.lower())
        node_count = gen_subjs.get(our_subj, 0)
        # Also check alternate names
        if node_count == 0 and our_subj == "physics":
            node_count = gen_subjs.get("physics", 0)
        if node_count == 0 and our_subj == "chemistry":
            node_count = gen_subjs.get("chemistry", 0)

        if node_count == 0:
            status = "MISSING"
            total_missing += 1
        elif node_count < 10:
            status = "PARTIAL"
            total_partial += 1
        else:
            status = "OK"
            total_generated += 1

        print(f"{grade:5d} {ncert_subj:30s} {our_subj:25s} {node_count:6d} {status:>10s}")

    # Also show generated subjects with no NCERT textbook
    for our_subj, cnt in sorted(gen_subjs.items()):
        if cnt > 0:
            # Check if any NCERT subject maps to this
            found = False
            for ns, os in SUBJ_MAP.items():
                if os == our_subj and ns in ncert_subjs:
                    found = True
                    break
            if not found:
                print(f"{grade:5d} {'(no NCERT textbook)':30s} {our_subj:25s} {cnt:6d} {'EXTRA':>10s}")

print(f"\n{'='*90}")
print(f"  SUMMARY")
print(f"{'='*90}")
print(f"  OK (generated):     {total_generated}")
print(f"  PARTIAL (<10 nodes): {total_partial}")
print(f"  MISSING (0 nodes):   {total_missing}")
