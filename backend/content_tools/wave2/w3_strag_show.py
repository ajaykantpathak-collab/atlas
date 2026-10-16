"""W3 one-off: show straggler raw lines."""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections
from w3_apply import deslatex_text, LATEX_LEFT_RE

HERE = os.path.dirname(os.path.abspath(__file__))
recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]
shown = 0
for fn in files:
    secs = parse_sections(open(os.path.join(r"D:\platform\deploy\content\enhanced_nodes_md", fn),
                               encoding="utf-8", errors="replace").read())
    for k, body in secs.items():
        is_prose = k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION") or \
            k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))
        if not is_prose or not LATEX_LEFT_RE.search(body):
            continue
        out, cx = deslatex_text(body)
        if cx or LATEX_LEFT_RE.search(out):
            if shown < 7:
                shown += 1
                print("===", fn, k, "complex_env" if cx else "")
                for line in body.split("\n"):
                    if "\\" in line:
                        print("   RAW:", line[:200])
                print()
