import os, re, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from delatex_w4 import DOLLAR_RE, _dollar_ok
from scan_depth_v2 import parse_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")

recs = [json.loads(l) for l in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "w4_lane_scores.jsonl"), encoding="utf-8")]
act = [r["file"] for r in recs if not r["parked"]]

AUTHORITATIVE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{")
truly = []
for fn in act:
    text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    pre, parts = split_sections_cache = None, None
    from delatex_w4 import split_sections
    pre, parts = split_sections(text)
    bad = False
    for h, name, body in parts:
        if not (name in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                or name.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))):
            continue
        masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else " ", body)
        if AUTHORITATIVE.search(masked):
            bad = True
            break
    if bad:
        truly.append(fn)
print("files with real LaTeX outside currency spans:", len(truly))
print(truly[:10])
