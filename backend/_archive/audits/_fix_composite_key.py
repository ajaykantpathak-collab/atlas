"""Build corrections using (node_id, chapter_code) as unique key.
Each result file = one chapter. All nodes in it get that chapter's subject."""
import json
from pathlib import Path
from collections import defaultdict

CHAPTER_CORRECTIONS = {
    "fesc101": "biology", "fesc102": "biology", "fesc103": "chemistry",
    "fesc104": "chemistry", "fesc105": "chemistry", "fesc106": "chemistry",
    "fesc107": "biology", "fesc108": "biology", "fesc109": "biology",
    "fesc110": "physics", "fesc111": "physics", "fesc112": "physics",
    "fesc113": "physics", "fesc114": "chemistry", "fesc115": "chemistry",
    "fesc116": "biology",
    "gecu101": "science", "gecu102": "chemistry", "gecu103": "physics",
    "gecu104": "chemistry", "gecu105": "chemistry", "gecu106": "biology",
    "gecu107": "physics", "gecu108": "physics", "gecu109": "biology",
    "gecu110": "biology", "gecu111": "physics", "gecu112": "physics",
    "gesc101": "biology", "gesc102": "biology", "gesc103": "physics",
    "gesc104": "chemistry", "gesc105": "chemistry", "gesc106": "biology",
    "gesc107": "biology", "gesc108": "biology", "gesc109": "physics",
    "gesc110": "physics", "gesc111": "physics", "gesc112": "biology",
    "gesc113": "chemistry",
    "hecu104": "physics", "hecu108": "chemistry", "hecu111": "physics",
    "hesc105": "biology", "hesc110": "physics", "hesc112": "physics",
    "hesc113": "physics",
    "iesc106": "physics", "iesc107": "physics", "iesc108": "chemistry",
    "iesc110": "physics", "iesc111": "biology",
    "jesc101": "chemistry", "jesc105": "biology", "jesc110": "physics",
    "jesc111": "physics", "jesc112": "physics", "jesc113": "biology",
    "hess401": "geography", "hess402": "geography", "hess403": "geography",
    "hess404": "geography", "hess405": "geography",
    "iess401": "history_civics", "iess402": "history_civics", "iess405": "history_civics",
    "jess301": "hist", "jess302": "hist", "jess303": "hist",
    "jess304": "hist", "jess305": "hist",
    "gess101": "hist", "gess102": "hist", "gess103": "hist", "gess104": "hist",
    "gess105": "hist", "gess106": "hist", "gess107": "hist", "gess108": "hist",
    "hess201": "hist", "hess202": "hist", "hess203": "hist", "hess204": "hist",
    "hess205": "hist", "hess206": "hist", "hess207": "hist", "hess208": "hist",
    "kehp101": "health_and_physical_education", "kehp102": "health_and_physical_education",
    "kehp103": "health_and_physical_education", "kehp104": "health_and_physical_education",
    "kehp105": "health_and_physical_education", "kehp106": "health_and_physical_education",
    "kehp107": "health_and_physical_education", "kehp108": "health_and_physical_education",
    "kehp109": "health_and_physical_education", "kehp110": "health_and_physical_education",
    "kehp111": "health_and_physical_education",
    "gess201": "geography", "gess202": "geography", "gess203": "geography",
    "gess204": "geography", "gess205": "geography", "gess206": "geography",
    "gess207": "geography",
    "hess301": "history_civics", "hess302": "history_civics", "hess303": "history_civics",
    "hess304": "history_civics", "hess306": "history_civics",
    "jess201": "economics", "jess202": "economics", "jess203": "economics",
    "jess204": "economics", "jess205": "economics",
    "fess101": "hist", "fess102": "hist", "fess103": "hist", "fess104": "hist",
    "fess105": "hist", "fess106": "hist", "fess107": "hist", "fess108": "hist",
    "fess109": "hist", "fess110": "hist", "fess111": "hist",
    "gees101": "geography", "gees102": "geography", "gees103": "geography",
    "gees104": "hist", "gees105": "hist", "gees106": "hist", "gees107": "hist",
    "gees108": "geography", "gees109": "history_civics", "gees110": "history_civics",
    "gees111": "economics", "gees112": "economics",
    "gees201": "geography", "gees202": "geography", "gees203": "hist",
    "gees204": "hist", "gees205": "geography", "gees206": "history_civics",
    "gees207": "economics", "gees208": "economics",
    "hees101": "geography", "hees102": "hist", "hees103": "hist",
    "hees106": "history_civics",
    "jess101": "geography", "jess102": "geography", "jess103": "geography",
    "jess104": "geography", "jess105": "geography", "jess106": "geography",
    "jess107": "geography", "jess1a1": "geography",
    "jess401": "history_civics", "jess402": "history_civics",
    "jess403": "history_civics", "jess404": "history_civics",
    "jess405": "history_civics",
    "kecs101": "computer_science", "kecs102": "computer_science",
    "kecs103": "computer_science", "kecs104": "computer_science",
    "kecs105": "computer_science", "kecs106": "computer_science",
    "kecs107": "computer_science", "kecs108": "computer_science",
    "kecs109": "computer_science", "kecs110": "computer_science",
    "kecs111": "computer_science",
    "lecs101": "computer_science", "lecs102": "computer_science",
    "lecs103": "computer_science", "lecs104": "computer_science",
    "lecs105": "computer_science", "lecs106": "computer_science",
    "lecs107": "computer_science", "lecs108": "computer_science",
    "lecs109": "computer_science", "lecs110": "computer_science",
    "lecs111": "computer_science", "lecs112": "computer_science",
    "lecs113": "computer_science",
    "lehe101": "home_science", "lehe102": "home_science", "lehe103": "home_science",
    "lehe104": "home_science", "lehe105": "home_science", "lehe106": "home_science",
    "lehe107": "home_science",
    "keww122": "political_science",
}

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Key corrections by "node_id::chapter_code" to handle duplicates
corrections = {}
before = defaultdict(lambda: defaultdict(int))
after = defaultdict(lambda: defaultdict(int))
total_entries = 0

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    ch_code = f.stem.replace("_result", "")
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            nid = node.get("node_id", "")
            if not nid:
                continue
            total_entries += 1
            composite_key = f"{nid}::{ch_code}"

            cls = node.get("class_level", 0)
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0

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
            if subj == "applied_ath": subj = "applied_maths"
            if subj == "Political Science": subj = "political_science"
            if subj in ("", "English", "English Language"): subj = "English Literature"
            if subj == "history_civivs": subj = "history_civics"
            if subj == "bt": subj = "biotech"

            before[subj][cls] += 1

            if ch_code in CHAPTER_CORRECTIONS:
                correct = CHAPTER_CORRECTIONS[ch_code]
                if correct != subj:
                    corrections[composite_key] = {
                        "node_id": nid,
                        "chapter_code": ch_code,
                        "original_subject": subj,
                        "corrected_subject": correct,
                        "class": cls,
                        "chapter_name": node.get("chapter_name", "")[:60],
                        "topic": node.get("topic", "")[:60],
                    }
                    after[correct][cls] += 1
                else:
                    after[subj][cls] += 1
            else:
                after[subj][cls] += 1

print(f"Total node entries: {total_entries}")
print(f"Total corrections: {len(corrections)}")

print(f"\n{'='*100}")
print(f"  BEFORE (all 21,320 entries)")
print(f"{'='*100}")
print(f"{'Subject':30s}", end="")
for cls in range(1, 13):
    print(f"{'c'+str(cls):>5s}", end="")
print(f"{'Total':>8s}")
print("-" * 100)
for subj in sorted(before.keys()):
    print(f"{subj:30s}", end="")
    total = 0
    for cls in range(1, 13):
        cnt = before[subj].get(cls, 0)
        print(f"{cnt:5d}" if cnt > 0 else f"{'-':>5s}", end="")
        total += cnt
    print(f"{total:8d}")

print(f"\n{'='*100}")
print(f"  AFTER (all 21,320 entries)")
print(f"{'='*100}")
print(f"{'Subject':30s}", end="")
for cls in range(1, 13):
    print(f"{'c'+str(cls):>5s}", end="")
print(f"{'Total':>8s}")
print("-" * 100)
for subj in sorted(after.keys()):
    print(f"{subj:30s}", end="")
    total = 0
    for cls in range(1, 13):
        cnt = after[subj].get(cls, 0)
        print(f"{cnt:5d}" if cnt > 0 else f"{'-':>5s}", end="")
        total += cnt
    print(f"{total:8d}")

# Save
out = Path(r"D:\platform\cbse_data\cross_board\mappings\subject_corrections_v2.json")
out.write_text(json.dumps(corrections, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\nSaved {len(corrections)} corrections to {out}")

# Sample corrections to verify
print(f"\n{'='*100}")
print(f"  SAMPLE CORRECTIONS (verify correctness)")
print(f"{'='*100}")
shown_chapters = set()
for key, info in sorted(corrections.items()):
    ch = info["chapter_code"]
    if ch not in shown_chapters:
        shown_chapters.add(ch)
        print(f"  {ch:10s} c{info['class']:>2} | {info['chapter_name'][:40]:40s} | {info['original_subject']:15s} -> {info['corrected_subject']:15s} | {info['topic'][:35]}")
    if len(shown_chapters) >= 50:
        break
