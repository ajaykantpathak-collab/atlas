"""Inspect what LaTeX survives the converter in survivor files."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from delatex_w4 import delatex_body, SURVIVOR_RE
from scan_depth_v2 import parse_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
hand = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "delatex_handfix.json"), encoding="utf-8"))
survivor_files = [h["file"] for h in hand if h["reason"].startswith("survivor")][:12]

for fn in survivor_files[:6]:
    text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    reasons = next(h["reason"] for h in hand if h["file"] == fn)
    first_sec = reasons.split(":")[1].split(",")[0]
    body = secs[first_sec]
    new, n = delatex_body(body)
    print(f"\n===== {fn} [{first_sec}] (groups {n}) =====")
    seen = 0
    for m in SURVIVOR_RE.finditer(new):
        s = max(0, m.start() - 70)
        e = min(len(new), m.end() + 70)
        print("  SURV:", new[s:e].replace("\n", " ")[:200])
        seen += 1
        if seen >= 3:
            break
