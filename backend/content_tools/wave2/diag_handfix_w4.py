"""Diagnose the 4 delatex hand-fix files."""
import sys, os, re
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from delatex_w4 import delatex_body, DOLLAR_RE, _dollar_ok, split_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"

print("=== 1. c11_math_cbse_13_003: delimiter balance per whole file ===")
text = open(os.path.join(corpus, "c11_math_cbse_13_003.md"), encoding="utf-8").read()
depth = 0
for m in re.finditer(r"\\(\(|\))", text):
    depth += 1 if m.group(1) == "(" else -1
    if depth > 1 or depth < 0:
        print("imbalance at", m.start(), ":", repr(text[max(0, m.start() - 90):m.start() + 90])[:220])
        break
else:
    print("balanced; depth ends at", depth)

print("\n=== 2/3. eco malformed frac ===")
for fn in ("c12_eco_cbse_14_003.md", "c12_eco_cbse_15_001.md"):
    t = open(os.path.join(corpus, fn), encoding="utf-8").read()
    pre, parts = split_sections(t)
    for h, name, body in parts:
        if name.startswith("WORKED_EXAMPLE"):
            new, n = delatex_body(body)
            if new != body:
                for i, line in enumerate(new.splitlines()):
                    if "\\text{" in line or "\\frac" in line or "\\times" in line:
                        print(f"[{fn}:{name}] line {i}: {line.strip()[:220]}")
