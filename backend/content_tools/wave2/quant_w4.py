"""W4: quantifies R8 prose-hygiene causes per file; dumps slop hit contexts."""
import json, os, re, sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
ID_RE = re.compile(r"\bc\d{1,2}_[a-z]{2,}(?:_[a-z0-9]+)+\b", re.I)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")
BANNED = ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]

recs = [json.loads(l) for l in open(os.path.join(HERE, "w4_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]

cause = Counter()
latex_files = []
slop_ctx = []
by_subj = Counter()

for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    prose_keys = [k for k in secs
                  if k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                  or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))]
    prose = "\n".join(secs[k] for k in prose_keys)
    has_id = bool(ID_RE.search(prose))
    has_lx = bool(LATEX_RE.search(prose))
    hits = [b for b in BANNED if b.lower() in prose.lower()]
    if has_lx:
        cause["latex"] += 1
        latex_files.append(fn)
        by_subj[fn.split("_")[1]] += 1
    if has_id:
        cause["ids"] += 1
    if hits:
        cause["slop"] += 1
        for h in hits:
            i = prose.lower().find(h.lower())
            slop_ctx.append((fn, h, prose[max(0, i-90):i+110].replace("\n", " ")))

print("prose-hygiene file counts:", dict(cause))
print("latex files by subject:", dict(by_subj.most_common()))
print("total latex files:", len(latex_files))

# how many latex files are latex-ONLY (no ids, no slop)?
print("\n=== slop contexts (up to 40) ===")
for fn, h, ctx in slop_ctx[:40]:
    print(f"[{h}] {fn}: ...{ctx}...")
