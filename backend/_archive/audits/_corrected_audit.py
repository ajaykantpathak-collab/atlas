"""Corrected audit using node-level subject field, not file-level."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Collect nodes by node-level subject
nodes_by_subj_cls = defaultdict(lambda: defaultdict(int))
total = 0

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            subj = node.get("subject", "?").strip()
            cls = node.get("class_level", "?")
            # Normalize subject names
            subj = subj.replace("history_civivs", "history_civics")
            if subj == "applied_ath":
                subj = "applied_maths"
            if subj == "Political Science":
                subj = "political_science"
            if subj in ("", "English", "English Language"):
                subj = "English Literature"
            if subj == "math":
                subj = "maths"
            if subj == "phy":
                subj = "physics"
            if subj == "bt":
                subj = "biotech"
            if subj == "acc":
                subj = "accounts"
            if subj == "sci":
                subj = "science"
            if subj == "histciv":
                subj = "history_civics"
            if subj == "his" or subj == "history":
                subj = "hist"
            if subj == "geo":
                subj = "geography"
            if subj == "legal":
                subj = "legal_studies"
            if subj == "pe":
                subj = "health_and_physical_education"
            if subj == "amath":
                subj = "applied_maths"

            nodes_by_subj_cls[subj][cls] += 1
            total += 1

print(f"Total nodes: {total}")
print(f"\n{'='*90}")
print(f"  CORRECTED: NODES BY SUBJECT AND CLASS")
print(f"{'='*90}")
print(f"{'Subject':35s}", end="")
for cls in range(1, 13):
    print(f"{'c'+str(cls):>5s}", end="")
print(f"{'Total':>8s}")
print("-" * 100)

all_subjects = sorted(nodes_by_subj_cls.keys())
for subj in all_subjects:
    print(f"{subj:35s}", end="")
    row_total = 0
    for cls in range(1, 13):
        cnt = nodes_by_subj_cls[subj].get(cls, 0)
        print(f"{cnt:5d}" if cnt > 0 else f"{'-':>5s}", end="")
        row_total += cnt
    print(f"{row_total:8d}")

# Now check against NCERT textbooks
NCERT_PATH = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")
ncert_subjects = defaultdict(set)
for grade_dir in sorted(NCERT_PATH.iterdir()):
    if not grade_dir.is_dir() or not grade_dir.name.startswith("grade_"):
        continue
    grade = int(grade_dir.name.replace("grade_", ""))
    for subj_dir in grade_dir.iterdir():
        if subj_dir.is_dir():
            ncert_subjects[grade].add(subj_dir.name)

SUBJ_MAP = {
    "Mathematics": "maths", "Applied_Mathematics": "applied_maths",
    "Science": "science", "Physics": "physics", "Physics_1": "physics", "Physics_2": "physics",
    "Chemistry": "chemistry", "Chemistry_1": "chemistry", "Chemistry_2": "chemistry",
    "Biology": "biology", "Biotechnology": "biotech",
    "English": "English Literature", "Hindi": "Hindi",
    "History": "hist", "Civics": "history_civics", "Geography": "geography",
    "Social_Science": "social_science", "Economics": "economics",
    "Accountancy": "accounts", "Business_Studies": "business_studies",
    "Computer_Science": "computer_science", "Informatics_Practices": "computer_science",
    "Political_Science": "political_science", "Psychology": "psychology",
    "Sociology": "sociology", "Home_Science": "home_science",
    "Legal_Studies": "legal_studies", "Artificial_Intelligence": "ai",
    "Fine_Art": "fine_art", "Health_and_Physical_Education": "health_and_physical_education",
    "Physical_Education_and_Well_Being": "health_and_physical_education",
    "Arts": "arts", "The_World_Around_Us": "evs", "Environmental_Studies": "evs",
    "Knowledge_Traditions_Practices_of_India": "ktpi", "Skill_Education": "skill_education",
}

print(f"\n{'='*90}")
print(f"  NCERT vs GENERATED (CORRECTED)")
print(f"{'='*90}")
print(f"{'Grade':>5s} {'NCERT Subject':35s} {'→ Our Subject':30s} {'Nodes':>6s} {'Status':>10s}")
print("-" * 95)

ok = 0
missing = 0
partial = 0

for grade in range(1, 13):
    ncert_subjs = ncert_subjects.get(grade, set())
    gen_subjs = nodes_by_subj_cls.get(grade, {}) if False else None

    for ncert_subj in sorted(ncert_subjs):
        our_subj = SUBJ_MAP.get(ncert_subj, ncert_subj.lower())

        # Look up node count
        node_count = nodes_by_subj_cls.get(our_subj, {}).get(grade, 0)

        if node_count == 0:
            status = "MISSING"
            missing += 1
        elif node_count < 10:
            status = "PARTIAL"
            partial += 1
        else:
            status = "OK"
            ok += 1

        print(f"{grade:5d} {ncert_subj:35s} {our_subj:30s} {node_count:6d} {status:>10s}")

print(f"\n{'='*90}")
print(f"  CORRECTED SUMMARY")
print(f"{'='*90}")
print(f"  OK (generated):       {ok}")
print(f"  PARTIAL (<10 nodes):  {partial}")
print(f"  MISSING (0 nodes):    {missing}")
