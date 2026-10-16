"""W3 one-off: exact deslatex straggler sections after map extension."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections
from w3_apply import deslatex_text, LATEX_LEFT_RE

HERE = os.path.dirname(os.path.abspath(__file__))
recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]
out = open(os.path.join(HERE, "w3_deslatex_stragglers.txt"), "w", encoding="utf-8")
n = 0
byfile = {}
for fn in files:
    secs = parse_sections(open(os.path.join(r"D:\platform\deploy\content\enhanced_nodes_md", fn),
                               encoding="utf-8", errors="replace").read())
    for k, body in secs.items():
        is_prose = k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION") or \
            k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))
        if not is_prose or not LATEX_LEFT_RE.search(body):
            continue
        conv, cx = deslatex_text(body)
        if cx or LATEX_LEFT_RE.search(conv):
            n += 1
            byfile.setdefault(fn, []).append(k)
            out.write(f"=== {fn}:{k} {'ENV' if cx else ''}\n{body[:2200]}\n\n")
out.close()
print("straggler sections:", n, "in", len(byfile), "files")
for f, ks in byfile.items():
    print(" ", f, len(ks), ks)
