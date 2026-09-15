"""Verify social science split corrections."""
import json
from pathlib import Path
from collections import defaultdict

SS_CORRECTIONS = {
    "hess401": "geography", "hess402": "geography", "hess403": "geography",
    "hess404": "geography", "hess405": "geography",
    "iess401": "history_civics", "iess402": "history_civics", "iess405": "history_civics",
    "jess301": "hist", "jess302": "hist", "jess303": "hist",
    "jess304": "hist", "jess305": "hist",
    "gess101": "hist", "gess102": "hist", "gess103": "hist", "gess104": "hist",
    "gess105": "hist", "gess106": "hist", "gess107": "hist", "gess108": "hist",
    "hess201": "hist", "hess202": "hist", "hess203": "hist", "hess204": "hist",
    "hess205": "hist", "hess206": "hist", "hess207": "hist", "hess208": "hist",
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
}

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

by_subj = defaultdict(list)
for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    ch_code = f.stem.replace("_result", "")
    if ch_code not in SS_CORRECTIONS:
        continue
    correct_subj = SS_CORRECTIONS[ch_code]
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
                "chapter": node.get("chapter_name", "")[:45],
                "topic": node.get("topic", "")[:55],
                "orig_subj": node.get("subject", ""),
            })

for subj in ["hist", "geography", "history_civics", "economics"]:
    nodes = by_subj.get(subj, [])
    print(f"\n{'='*90}")
    print(f"  {subj.upper()} ({len(nodes)} nodes from Social Science textbooks)")
    print(f"{'='*90}")
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
