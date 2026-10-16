"""W3 hygiene probe: exact shapes of node-ID refs and LaTeX in prose sections."""
import os
import re
import sys
import json
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_", re.I)
# same regex as the scanner (file-based, no shell mangling)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")
PROSE = ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")

recs = [json.loads(l) for l in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "w3_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]

ctx = Counter()
latex_hits = []
for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    for k, body in secs.items():
        is_prose = k in PROSE or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))
        if not is_prose:
            continue
        for m in ID_RE.finditer(body):
            s = max(0, m.start() - 30)
            e = min(len(body), m.end() + 30)
            around = body[s:e].replace("\n", " ")
            # classify shape
            if re.search(r"\(" + re.escape(m.group(0)), body):
                ctx["(paren ref)"] += 1
            elif re.search(r"(see|See|in|of|from|node)\s+" + re.escape(m.group(0)), body):
                ctx["see/in/of/from phrase"] += 1
            else:
                ctx["bare"] += 1
            if len(ctx) < 40 and ctx.total_count() if hasattr(ctx, 'total_count') else True:
                pass
        for m in LATEX_RE.finditer(body):
            latex_hits.append((fn, k, m.group(0), body[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")))

print("ID context shapes:", dict(ctx))
print("\nLaTeX prose hits:", len(latex_hits))
seen = set()
for fn, k, tok, around in latex_hits:
    key = tok
    if key in seen:
        continue
    seen.add(key)
    print(f"  {tok!r}  @ {fn}:{k}")
    print(f"     ...{around}...")
