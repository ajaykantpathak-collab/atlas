"""Sample corrected nodes from result files to verify science split."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Collect corrected nodes by subject+class
by_subj_cls = defaultdict(lambda: defaultdict(list))

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
            cls = node.get("class_level", 0)
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0
            if not isinstance(cls, int) or cls < 6 or cls > 10:
                continue

            subj = node.get("subject", "").strip()
            if subj == "phy": subj = "physics"
            if subj == "sci": subj = "science"
            if subj == "histciv": subj = "history_civics"
            if subj in ("his", "history"): subj = "hist"
            if subj == "geo": subj = "geography"

            # Only show nodes that were in Science/SocialScience textbooks
            # (these are the ones that needed splitting)
            cbse_subj = node.get("_cbse_subject", "")
            if cbse_subj not in ("Science", "Social_Science", "Civics", "Geography_1"):
                continue

            by_subj_cls[subj][cls].append({
                "node_id": nid,
                "chapter_code": ch_code,
                "chapter": node.get("chapter_name", "")[:40],
                "topic": node.get("topic", "")[:60],
                "cbse_subject": cbse_subj,
            })

# Show samples for the key subjects that were split
for subj in ["biology", "chemistry", "physics", "hist", "geography", "history_civics", "economics"]:
    print(f"\n{'='*90}")
    print(f"  {subj.upper()} (from Science/SocialScience textbooks)")
    print(f"{'='*90}")
    for cls in range(6, 11):
        nodes = by_subj_cls.get(subj, {}).get(cls, [])
        if not nodes:
            continue
        print(f"\n  Class {cls} ({len(nodes)} nodes):")
        for n in nodes[:4]:
            print(f"    {n['chapter_code']:10s} | {n['chapter']:40s} | {n['topic'][:45]}")
