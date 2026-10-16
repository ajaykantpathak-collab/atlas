import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from scan_depth_v2 import parse_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")

for fn in ["c11_acc_cbse_02_003.md", "c11_app_cbse_08_002.md", "c11_biotech_cbse_01_007.md", "c11_bs_cbse_03_003.md"]:
    text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    print("=" * 16, fn)
    shown = 0
    for k, body in secs.items():
        if not (k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))):
            continue
        for m in LATEX_RE.finditer(body):
            stripped = re.sub(r"\$[^$]{0,60}\$", "", body)
            if not LATEX_RE.search(stripped):
                kind = "dollar_only"
            else:
                kind = "REAL:" + m.group(0)[:14]
            if kind.startswith("REAL") and shown < 3:
                s = max(0, m.start() - 60)
                print(f"  [{k}] {kind} ::", repr(body[s:m.end() + 70])[:190])
                shown += 1
    if shown == 0:
        print("  (only dollar_only flags)")
