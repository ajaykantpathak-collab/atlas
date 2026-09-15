"""Improved CISCE vs CBSE comparison with fuzzy keyword matching.
For classes 6-10, also checks CBSE 'science' and 'social_science' subjects."""
import json
from pathlib import Path
from collections import defaultdict

# Load CISCE syllabus (same as before - abbreviated here)
import json as _json
_c = open(r"D:\platform\backend\_cisce_syllabus_data.py", encoding="utf-8").read()
_c = _c.replace("CISCE_SYLLABUS = ", "").strip()
CISCE_SYLLABUS = {int(k): v for k, v in _json.loads(_c).items()}

# Load CBSE chapters
CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
cbse_chapters = defaultdict(set)

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            cls = node.get("class_level", 0)
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0
            if not isinstance(cls, int) or cls < 6 or cls > 12:
                continue

            subj = node.get("subject", "").strip()
            if subj == "math": subj = "maths"
            if subj == "phy": subj = "physics"
            if subj == "sci": subj = "science"
            if subj == "histciv": subj = "history_civics"
            if subj in ("his", "history"): subj = "hist"
            if subj == "geo": subj = "geography"
            if subj == "acc": subj = "accounts"
            if subj == "legal": subj = "legal_studies"
            if subj == "pe": subj = "health_and_physical_education"
            if subj == "amath": subj = "applied_maths"
            if subj == "Political Science": subj = "political_science"
            if subj in ("", "English", "English Language"): subj = "english"
            if subj == "history_civivs": subj = "history_civics"
            if subj == "bt": subj = "biotech"

            ch_name = node.get("chapter_name", "").strip()
            if ch_name and len(ch_name) > 3:
                cbse_chapters[(cls, subj)].add(ch_name.lower())

# For classes 6-10, also merge science + physics/chemistry/biology
# and social_science + hist/geography/history_civics/economics
for cls in range(6, 11):
    merged_sci = set()
    for s in ["science", "physics", "chemistry", "biology"]:
        merged_sci.update(cbse_chapters.get((cls, s), set()))
    for s in ["science", "physics", "chemistry", "biology"]:
        cbse_chapters[(cls, s)] = merged_sci

    merged_ss = set()
    for s in ["social_science", "hist", "geography", "history_civics", "economics"]:
        merged_ss.update(cbse_chapters.get((cls, s), set()))
    for s in ["social_science", "hist", "geography", "history_civics", "economics"]:
        cbse_chapters[(cls, s)] = merged_ss

def get_keywords(text):
    stop = {"the","a","an","of","and","in","on","to","for","with","by","from","at","is","are","as","its","their","this","that","these","those","into","using","through","about","between","among","or","vs","versus","types","type","kind","kinds","definition","concept","introduction","basic","basics","advanced","study","detailed","general","specific","properties","revisited","overview","meaning","features","characteristics","importance","advantages","disadvantages","merits","demerits","our","ourself","part","parts","system","systems","structure","function","functions","life","world","india","human","chapter","unit","class","cbse","icse","isc","board"}
    words = set()
    for w in text.lower().split():
        w = w.strip(".,;:!?()[]{}\"'")
        if len(w) > 2 and w not in stop:
            words.add(w)
    return words

def fuzzy_match(cisce_ch, cbse_chapters_set):
    """Check if CISCE chapter matches any CBSE chapter by keyword overlap."""
    cisce_kw = get_keywords(cisce_ch)
    if not cisce_kw:
        return False

    for cbse_ch in cbse_chapters_set:
        cbse_kw = get_keywords(cbse_ch)
        if not cbse_kw:
            continue
        overlap = cisce_kw & cbse_kw
        if len(overlap) >= 1:  # At least 1 meaningful keyword match
            return True
    return False

# Compare
SUBJECT_MAP = {
    "physics": "physics", "chemistry": "chemistry", "biology": "biology",
    "maths": "maths", "history": "hist", "civics": "history_civics",
    "geography": "geography", "economics": "economics",
    "commercial_studies": "business_studies",
    "computer_science": "computer_science",
    "english": "english", "political_science": "political_science",
    "accounts": "accounts", "business_studies": "business_studies",
    "sociology": "sociology", "psychology": "psychology",
    "home_science": "home_science", "biotech": "biotech",
    "legal_studies": "legal_studies",
}

total_cisce = 0
total_missing = 0
total_found = 0
missing_by_class = defaultdict(int)
found_by_class = defaultdict(int)
missing_list = defaultdict(lambda: defaultdict(list))

for cls in range(6, 13):
    cisce_subjects = CISCE_SYLLABUS.get(cls, {})
    if not cisce_subjects:
        continue

    for cisce_subj, chapters in cisce_subjects.items():
        cbse_subj = SUBJECT_MAP.get(cisce_subj, cisce_subj)
        cbse_chs = cbse_chapters.get((cls, cbse_subj), set())

        for ch in chapters:
            matched = fuzzy_match(ch, cbse_chs)
            if matched:
                total_found += 1
                found_by_class[cls] += 1
            else:
                missing.append(ch) if False else None
                total_missing += 1
                missing_by_class[cls] += 1
                missing_list[cls][cisce_subj].append(ch)
            total_cisce += 1

# Report
print(f"{'='*100}")
print(f"  CISCE vs CBSE CHAPTER COMPARISON (fuzzy keyword matching)")
print(f"{'='*100}")

for cls in range(6, 13):
    if cls not in CISCE_SYLLABUS:
        continue
    cisce_subjects = CISCE_SYLLABUS[cls]
    total = sum(len(chs) for chs in cisce_subjects.values())
    found = found_by_class.get(cls, 0)
    missing = missing_by_class.get(cls, 0)
    cov = f"{100*found//total if total else 0}%"

    print(f"\n{'='*90}")
    print(f"  CLASS {cls} - {total} CISCE chapters, {found} found, {missing} missing ({cov})")
    print(f"{'='*90}")

    for cisce_subj, chapters in cisce_subjects.items():
        cbse_subj = SUBJECT_MAP.get(cisce_subj, cisce_subj)
        cbse_chs = cbse_chapters.get((cls, cbse_subj), set())
        subj_missing = missing_list[cls].get(cisce_subj, [])
        subj_found = len(chapters) - len(subj_missing)

        if subj_missing:
            print(f"\n  {cisce_subj:20s} ({len(chapters)} ch, {subj_found} found, {len(subj_missing)} MISSING):")
            for m in subj_missing:
                print(f"    X  {m}")
        else:
            print(f"\n  {cisce_subj:20s} ({len(chapters)} ch, ALL FOUND)")

print(f"\n{'='*100}")
print(f"  SUMMARY")
print(f"{'='*100}")
print(f"  Total CISCE chapters:   {total_cisce}")
print(f"  Found in CBSE:          {total_found}")
print(f"  Missing from CBSE:      {total_missing}")
print(f"  Coverage:               {100*total_found//total_cisce if total_cisce else 0}%")

print(f"\n  By class:")
print(f"  {'Class':>6s} {'Total':>8s} {'Found':>8s} {'Missing':>8s} {'Coverage':>10s}")
print(f"  {'-'*45}")
for cls in range(6, 13):
    if cls in CISCE_SYLLABUS:
        total = sum(len(chs) for chs in CISCE_SYLLABUS[cls].values())
        found = found_by_class.get(cls, 0)
        missing = missing_by_class.get(cls, 0)
        cov = f"{100*found//total if total else 0}%"
        print(f"  {cls:6d} {total:8d} {found:8d} {missing:8d} {cov:>10s}")

# Save missing chapters to file
out = Path(r"D:\platform\cbse_data\cross_board\mappings\cisce_missing_chapters.json")
out.parent.mkdir(parents=True, exist_ok=True)
output = {}
for cls in range(6, 13):
    if missing_list[cls]:
        output[str(cls)] = {}
        for subj, chs in missing_list[cls].items():
            output[str(cls)][subj] = chs
out.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\n  Missing chapters saved to {out}")
