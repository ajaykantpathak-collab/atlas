"""Sample corrected nodes by chapter_code to verify science split."""
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
}

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

by_subj = defaultdict(list)
for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    ch_code = f.stem.replace("_result", "")
    if ch_code not in CHAPTER_CORRECTIONS:
        continue
    correct_subj = CHAPTER_CORRECTIONS[ch_code]

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
            by_subj[correct_subj].append({
                "node_id": node.get("node_id", ""),
                "class": cls,
                "chapter_code": ch_code,
                "chapter": node.get("chapter_name", "")[:40],
                "topic": node.get("topic", "")[:55],
                "orig_subj": node.get("subject", ""),
            })

for subj in ["biology", "chemistry", "physics"]:
    nodes = by_subj.get(subj, [])
    print(f"\n{'='*90}")
    print(f"  {subj.upper()} ({len(nodes)} nodes from Science textbooks)")
    print(f"{'='*90}")
    # Group by chapter
    by_ch = defaultdict(list)
    for n in nodes:
        by_ch[n["chapter_code"]].append(n)
    for ch in sorted(by_ch.keys()):
        ch_nodes = by_ch[ch]
        ch_name = ch_nodes[0]["chapter"]
        cls = ch_nodes[0]["class"]
        print(f"\n  {ch} c{cls} {ch_name} ({len(ch_nodes)} nodes, was:{ch_nodes[0]['orig_subj']}):")
        for n in ch_nodes[:3]:
            print(f"    {n['node_id']:25s} | {n['topic']}")
        if len(ch_nodes) > 3:
            print(f"    ... +{len(ch_nodes)-3} more")
