"""W3 one-off: debug the 3 REFUSED deslatex files."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections
from w3_apply import deslatex_text, LATEX_LEFT_RE, is_prose_section, split_sections

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
for fn in ["c10_math_cbse_01_011.md", "c10_math_cbse_08_007.md", "c10_math_cbse_11_002.md"]:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
    preamble, parts = split_sections(text)
    print("===", fn, "preamble len:", len(preamble))
    for p in parts:
        body = p[2]
        if is_prose_section(p[1]) and LATEX_LEFT_RE.search(body):
            new, cx = deslatex_text(body)
            # check which OTHER prose sections got touched unintentionally? print changes
            if new != body and not cx and not LATEX_LEFT_RE.search(new):
                print(f"  would edit {p[1]} (len {len(body)} -> {len(new)})")
