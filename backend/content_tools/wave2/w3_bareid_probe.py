"""W3 one-off: enumerate bare (non-parenthesised) ID refs in actionable prose."""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_[a-z0-9_]*", re.I)
PAREN_SPANS = re.compile(r"\([^()]*\)")
PROSE = ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")

recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]

out = []
for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    for k, body in secs.items():
        is_prose = k in PROSE or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))
        if not is_prose:
            continue
        # mask paren spans
        masked = list(body)
        for m in PAREN_SPANS.finditer(body):
            for i in range(m.start(), m.end()):
                masked[i] = "\x00"
        masked = "".join(masked)
        for m in ID_RE.finditer(masked):
            s = max(0, m.start() - 55)
            e = min(len(body), m.end() + 35)
            out.append((fn, k, body[s:e].replace("\n", " ").replace("\x00", "")))

print("bare id refs:", len(out))
for fn, k, ctx in out:
    print(f"  {fn}:{k}\n     ...{ctx}...")
