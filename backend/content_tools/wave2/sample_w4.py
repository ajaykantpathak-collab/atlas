"""W4 sample audit: what do the heuristic misses actually look like?"""
import json, re, os, sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
recs = [json.loads(l) for l in open(os.path.join(HERE, "lane_scores_w4.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

NODE_ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_", re.I)
BANNED = ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]

print("=== which banned string, which section (sampled over all actionable) ===")
ban_counter = Counter(); ban_sections = Counter()
id_sections = Counter()
for r in act:
    text = open(os.path.join(corpus, r["file"]), encoding="utf-8", errors="replace").read()
    sec = parse_sections(text)
    low = {k: v.lower() for k, v in sec.items()}
    for b in BANNED:
        for k, v in low.items():
            if b.lower() in v:
                ban_counter[b] += 1
                ban_sections[(b, k)] += 1
    for k, v in sec.items():
        if NODE_ID_RE.search(v):
            id_sections[k] += 1

print("by string:", dict(ban_counter))
print("by (string, section):")
for (b, k), c in ban_sections.most_common(12):
    print(f"   {b!r:24} in {k:<28} {c}")
print("node-id hits by section:", dict(id_sections.most_common(12)))

print()
print("=== 6 sampled >=150w walkthroughs that failed deriv/takeaway heuristics ===")
shown = 0
for r in act:
    if "R2_walk150" not in r["misses"]:
        continue
    text = open(os.path.join(corpus, r["file"]), encoding="utf-8", errors="replace").read()
    sec = parse_sections(text)
    ww = sec.get("WALKTHROUGH", "")
    n = len(ww.split())
    if n < 150:
        continue
    print(f"\n--- {r['file']} ({n}w) ---")
    print(ww[:700].replace("\n", " | "))
    shown += 1
    if shown >= 6:
        break
