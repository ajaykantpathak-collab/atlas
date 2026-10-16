import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from scan_depth_v2 import parse_sections, wc
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
HERE = os.path.dirname(os.path.abspath(__file__))
recs = [json.loads(l) for l in open(os.path.join(HERE, "w4_lane_scores.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

dollar_only = real = 0
real_files = []
r1_latex = []
for r in act:
    text = open(os.path.join(corpus, r["file"]), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    prose_keys = [k for k in secs
                  if k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                  or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))]
    prose = "\n".join(secs[k] for k in prose_keys)
    stripped = re.sub(r"\$[^$]{0,60}\$", "", prose)
    if LATEX_RE.search(prose):
        if LATEX_RE.search(stripped):
            real += 1
            real_files.append(r["file"])
        else:
            dollar_only += 1
    if "R1_def40" in r["misses"] and LATEX_RE.search(secs.get("DEFINITION", "")):
        d = secs["DEFINITION"]
        ds = re.sub(r"\$[^$]{0,60}\$", "", d)
        r1_latex.append((r["file"], "dollar_only" if not LATEX_RE.search(ds) else "REAL", wc(d)))

print("latex-flagged prose: dollar_only =", dollar_only, "| real =", real)
print("real files:", real_files[:10])
print("R1 latex defs:", len(r1_latex))
for f, kind, w in r1_latex:
    print("  ", kind, f, w, "w")
