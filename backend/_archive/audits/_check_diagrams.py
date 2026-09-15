import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

# Collect all diagrams from results
all_diagrams = []
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for diag in chunk.get("diagrams", []):
            diag["_chapter"] = data["chapter"]
            diag["_subject"] = data["subject"]
            all_diagrams.append(diag)

print(f"Total diagrams found: {len(all_diagrams)}")
print()

# Show first 5 diagrams in detail
for i, diag in enumerate(all_diagrams[:5]):
    print(f"=== Diagram {i+1} ===")
    print(f"  Chapter: {diag['_chapter']} ({diag['_subject']})")
    print(f"  Node: {diag['node_id']}")
    print(f"  Title: {diag.get('title', '?')}")
    print(f"  Type: {diag.get('diagram_type', '?')}")
    print(f"  SVG desc: {diag.get('svg_description', '?')[:120]}")
    print(f"  Alt text: {diag.get('alt_text', '?')[:100]}")
    print(f"  Hotspots: {len(diag.get('hotspots', []))}")
    for hs in diag.get("hotspots", [])[:5]:
        print(f"    - {hs.get('label','?')} ({hs.get('x',0)},{hs.get('y',0)}): {hs.get('description','?')[:80]}")
    if len(diag.get("hotspots", [])) > 5:
        print(f"    ... +{len(diag['hotspots'])-5} more")
    print()

# Check for issues
print("=== Quality checks ===")
no_hotspots = sum(1 for d in all_diagrams if not d.get("hotspots"))
no_alt = sum(1 for d in all_diagrams if not d.get("alt_text"))
no_svg = sum(1 for d in all_diagrams if not d.get("svg_description"))
bad_coords = sum(1 for d in all_diagrams for h in d.get("hotspots",[]) if h.get("x",0) < 0 or h.get("x",0) > 500 or h.get("y",0) < 0 or h.get("y",0) > 500)
print(f"  Diagrams with no hotspots: {no_hotspots}")
print(f"  Diagrams with no alt_text: {no_alt}")
print(f"  Diagrams with no svg_description: {no_svg}")
print(f"  Hotspots with bad coordinates: {bad_coords}")

# Subject distribution
from collections import Counter
subj_dist = Counter(d["_subject"] for d in all_diagrams)
print(f"\n=== Diagrams by subject ===")
for subj, count in subj_dist.most_common():
    print(f"  {subj}: {count}")
