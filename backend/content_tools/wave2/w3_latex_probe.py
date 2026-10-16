"""W3 one-off: quantify LaTeX in non-definition prose sections (actionable lane)."""
import json
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\\sqrt|\\text|\\cdot|\\pm|\\deg")
PROSE = ("WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")

recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]

nodes_with = Counter()
sec_count = Counter()
samples = []
for fn in files:
    secs = parse_sections(open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read())
    hit_here = False
    for k, body in secs.items():
        is_prose = k in PROSE or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))
        if not is_prose or k == "DEFINITION":
            continue
        if LATEX_RE.search(body):
            hit_here = True
            sec_count[k.split("_")[0] if k[-1].isdigit() and "_" in k else k] += 1
            if len(samples) < 8 and len(samples) % 1 == 0:
                m = LATEX_RE.search(body)
                samples.append((fn, k, body[max(0, m.start() - 40): m.end() + 60].replace("\n", " ")))
    if hit_here:
        nodes_with[fn.split("_")[2]] += 1

print("nodes with LaTeX outside definitions, by subject:", dict(nodes_with))
print("total nodes:", sum(nodes_with.values()))
print("sections:", dict(sec_count.most_common(12)))
print("samples:")
for s in samples:
    print("  ", s[0], s[1])
    print("     ", s[2])
