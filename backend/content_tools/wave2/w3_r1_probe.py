"""W3 one-off: precise R1 (definition) failure causes."""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{")
HERE = os.path.dirname(os.path.abspath(__file__))
recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]
r1 = [r for r in act if not r["R1_def40"]]
latex, short, other = [], [], []
for r in r1:
    d = parse_sections(open(os.path.join(r"D:\platform\deploy\content\enhanced_nodes_md", r["file"]),
                            encoding="utf-8", errors="replace").read()).get("DEFINITION", "")
    if LATEX_RE.search(d):
        latex.append((r["file"], r["subject"], r["def_words"]))
    elif r["def_words"] < 40:
        short.append((r["file"], r["subject"], r["def_words"]))
    else:
        other.append((r["file"], r["subject"], r["def_words"]))
print("LaTeX in definition:", len(latex))
for x in latex:
    print("  ", x)
print("genuinely short (<40w):", len(short))
for x in short:
    print("  ", x)
print("other:", other)
