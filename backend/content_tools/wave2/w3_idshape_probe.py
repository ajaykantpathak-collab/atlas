"""W3 one-off (fast): classify ID-reference shapes in actionable prose."""
import json
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_[a-z0-9_]*", re.I)
PAREN_ID_RE = re.compile(r"\(([^()]*?\bc\d+_[a-z0-9]+_[^()]*?)\)")
PROSE = ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")

recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]

paren_with_words = Counter()
bare_shapes = Counter()
md_links = 0
for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    for k, body in secs.items():
        is_prose = k in PROSE or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))
        if not is_prose:
            continue
        for m in PAREN_ID_RE.finditer(body):
            inner = m.group(1)
            sig = re.sub(r"c\d+_[a-z0-9_]+", "<ID>", inner)
            paren_with_words[sig] += 1
        if re.search(r"\]\([^)]*c\d+_", body):
            md_links += 1
        # bare refs: an id NOT preceded by '(' within 40 chars and not inside a paren group
        n_paren = 0
        for m in PAREN_ID_RE.finditer(body):
            n_paren += 1
        n_all = len(ID_RE.findall(body))
        bare_shapes["prose_total"] += n_all

print("distinct paren-group signatures (top 30 of", len(paren_with_words), "total hits", sum(paren_with_words.values()), "):")
for sig, c in paren_with_words.most_common(30):
    print(f"  {c:>4}  {sig!r}")
print("md-link refs:", md_links)
