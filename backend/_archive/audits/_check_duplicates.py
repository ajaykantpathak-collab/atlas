"""Check for duplicate node_ids across by_subject files."""
import json
from pathlib import Path
from collections import defaultdict

subj_dir = Path(r"D:\platform\cbse_data\nodes\by_subject")

# Track which files each node_id appears in
node_locations = defaultdict(list)

for f in sorted(subj_dir.glob("*.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for n in data:
        nid = n.get("node_id", "")
        ch_code = n.get("_chapter_code", "")
        subj = n.get("subject", "")
        cls = n.get("class_level", "")
        node_locations[nid].append({
            "file": f.stem,
            "chapter_code": ch_code,
            "subject": subj,
            "class": cls,
            "topic": n.get("topic", "")[:50],
        })

# Find duplicates
dups = {nid: locs for nid, locs in node_locations.items() if len(locs) > 1}
print(f"Total unique node_ids: {len(node_locations)}")
print(f"Duplicate node_ids: {len(dups)}")

if dups:
    print(f"\n{'='*100}")
    print(f"  DUPLICATE NODE_IDS (showing first 30)")
    print(f"{'='*100}")
    for nid in sorted(dups.keys())[:30]:
        locs = dups[nid]
        print(f"\n  {nid} ({len(locs)} copies):")
        for loc in locs:
            print(f"    file={loc['file']:25s} ch={loc['chapter_code']:10s} subj={loc['subject']:15s} c{loc['class']} | {loc['topic']}")

    # Count duplicates by class
    dup_by_class = defaultdict(int)
    for nid, locs in dups.items():
        for loc in locs:
            dup_by_class[loc["class"]] += 1
    print(f"\n  Duplicate entries by class:")
    for cls in sorted(dup_by_class.keys()):
        print(f"    c{cls}: {dup_by_class[cls]}")
