"""Sample nodes from corrected subjects to verify they're now correct."""
import json
from pathlib import Path
from collections import defaultdict

# Load corrections
corrections = json.loads(Path(r"D:\platform\cbse_data\cross_board\mappings\subject_corrections.json").read_text(encoding="utf-8"))

# Load all nodes from by_subject files
subj_dir = Path(r"D:\platform\cbse_data\nodes\by_subject")
all_nodes = []
for f in sorted(subj_dir.glob("*.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for n in data:
        nid = n.get("node_id", "")
        orig = n.get("subject", "").strip()
        # Normalize
        if orig == "math": orig = "maths"
        if orig == "phy": orig = "physics"
        if orig == "sci": orig = "science"
        if orig == "histciv": orig = "history_civics"
        if orig in ("his", "history"): orig = "hist"
        if orig == "geo": orig = "geography"
        if orig == "acc": orig = "accounts"
        if orig == "legal": orig = "legal_studies"
        if orig == "pe": orig = "health_and_physical_education"
        if orig == "amath": orig = "applied_maths"
        if orig == "applied_ath": orig = "applied_maths"
        if orig == "Political Science": orig = "political_science"
        if orig in ("", "English", "English Language"): orig = "English Literature"
        if orig == "history_civivs": orig = "history_civics"
        if orig == "bt": orig = "biotech"

        corrected = corrections.get(nid, {}).get("corrected_subject", orig)

        all_nodes.append({
            "node_id": nid,
            "original_subject": orig,
            "corrected_subject": corrected,
            "class": n.get("class_level", 0),
            "topic": n.get("topic", ""),
            "chapter": n.get("chapter", ""),
            "content_snippet": n.get("content_snippet", "")[:120],
            "concept_tags": n.get("concept_tags", [])[:5],
            "was_corrected": nid in corrections,
        })

# Group by corrected subject and class (6-10 only)
by_subj_cls = defaultdict(lambda: defaultdict(list))
for n in all_nodes:
    cls = n["class"]
    if isinstance(cls, str):
        try: cls = int(cls)
        except: cls = 0
    if isinstance(cls, int) and 6 <= cls <= 10:
        by_subj_cls[n["corrected_subject"]][cls].append(n)

# Sample 5 nodes from each subject+class that had corrections
CORRECTED_SUBJECTS = ["biology", "chemistry", "physics", "hist", "geography",
                      "history_civics", "economics", "computer_science",
                      "health_and_physical_education", "home_science",
                      "political_science", "science"]

for subj in CORRECTED_SUBJECTS:
    print(f"\n{'='*100}")
    print(f"  {subj.upper()}")
    print(f"{'='*100}")
    for cls in range(6, 11):
        nodes = by_subj_cls.get(subj, {}).get(cls, [])
        if not nodes:
            continue
        # Show 5 sample nodes, prefer corrected ones
        corrected_nodes = [n for n in nodes if n["was_corrected"]]
        sample = corrected_nodes[:5] if corrected_nodes else nodes[:5]
        print(f"\n  Class {cls} ({len(nodes)} nodes, {len(corrected_nodes)} were corrected):")
        for n in sample:
            tag = "FIXED" if n["was_corrected"] else "ok"
            orig = n["original_subject"]
            print(f"    [{tag}] {n['node_id']:25s} was:{orig:15s} now:{subj:15s}")
            print(f"          topic: {n['topic'][:70]}")
            print(f"          chapter: {n['chapter'][:50]}")
            print(f"          tags: {n['concept_tags']}")
            print(f"          snippet: {n['content_snippet'][:90]}")
            print()
