import re
import json
from pathlib import Path
from collections import defaultdict

# Load CISCE node index for titles
cisce_index = json.loads(Path(r"D:\platform\content\index\node_index.json").read_text(encoding="utf-8"))
cisce_lookup = {n["node_id"]: n for n in cisce_index}

# Load all CISCE_ONLY IDs from categorization files
out = Path(r"D:\platform\cisce_merge_output")

for f in sorted(out.glob("*_categorization.md")):
    if "full" in f.name:
        continue
    text = f.read_text(encoding="utf-8")
    if "Token limit" in text[:100]:
        continue
    if "## CISCE_ONLY" not in text:
        continue

    subj = f.stem.replace("_categorization", "")

    # Extract CISCE_ONLY section
    in_cisce = False
    cisce_ids = []
    for line in text.split("\n"):
        line = line.strip()
        if line == "## CISCE_ONLY":
            in_cisce = True
            continue
        elif line.startswith("## "):
            in_cisce = False
            continue
        if in_cisce and line and not line.startswith("```"):
            # Handle comma-separated IDs on one line
            for nid in line.split(","):
                nid = nid.strip()
                if re.match(r'c\d+_', nid):
                    cisce_ids.append(nid)

    if not cisce_ids:
        continue

    print(f"\n{'='*70}")
    print(f"  {subj.upper()} — {len(cisce_ids)} CISCE-only nodes")
    print(f"{'='*70}")

    for nid in cisce_ids:
        node = cisce_lookup.get(nid, {})
        title = node.get("title", "???")
        cls = node.get("class", "?")
        print(f"  {nid:25s} | c{cls} | {title}")
