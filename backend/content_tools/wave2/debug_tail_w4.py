import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from delatex_w4 import delatex_body, split_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c11_math_cbse_13_003.md"
text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
pre, parts = split_sections(text)
for h, name, body in parts:
    if name == "DIAGNOSTIC_QUESTION_3":
        new, n = delatex_body(body)
        print("RAW  tail:", repr(body[-40:]))
        print("NEW  tail:", repr(new[-40:]))
        print("RAW  head:", repr(body[:40]))
        print("NEW  head:", repr(new[:40]))
