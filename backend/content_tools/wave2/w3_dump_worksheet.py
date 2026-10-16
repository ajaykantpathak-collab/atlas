"""W3 one-off: full authoring worksheet for R1/R2/slop targets."""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{")
recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

r1 = [r for r in act if not r["R1_def40"]]
r2 = [r for r in act if not r["R2_walk150"]]
slop_files = [r["file"] for r in act if "slop_strings" in r]

out = open(os.path.join(HERE, "w3_authoring_worksheet.txt"), "w", encoding="utf-8")
for r in r1:
    s = parse_sections(open(os.path.join(CORPUS, r["file"]), encoding="utf-8", errors="replace").read())
    d = s.get("DEFINITION", "")
    kind = "LATEX" if LATEX_RE.search(d) else ("SHORT" if r["def_words"] < 40 else "FILLER")
    out.write(f"=== {r['file']} [{kind}] def={r['def_words']}w\nDEF: {d}\n\n")
for r in r2:
    s = parse_sections(open(os.path.join(CORPUS, r["file"]), encoding="utf-8", errors="replace").read())
    out.write(f"=== {r['file']} [WALK-TAKEAWAY] walk={r['walk_words']}w\nWALK: ...{s.get('WALKTHROUGH','')[-450:]}\n\n")
for fn in slop_files:
    s = parse_sections(open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read())
    for k, body in s.items():
        if k.startswith(("SCOPE", "CHAIN", "PREREQ", "FORWARD", "CROSS", "ON_FAILURE", "MASTERY", "COGNITIVE")):
            continue
        if "This node covers" in body or "This node defines" in body or "TBD" in body or "placeholder" in body.lower():
            out.write(f"=== {fn} [SLOP:{k}]\n{body[:500]}\n\n")
out.close()
print("worksheet written")
