"""W3 one-off: diff body tails around the vanished header."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from w3_apply import deslatex_text, LATEX_LEFT_RE, is_prose_section, split_sections

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c10_math_cbse_01_011.md"
original = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
preamble, parts = split_sections(original)
for p in parts:
    if p[1] in ("DIAGNOSTIC_QUESTION_2", "DIAGNOSTIC_ANSWER_2"):
        print("===", p[1], "RAW BODY TAIL:", repr(p[2][-80:]))
        if is_prose_section(p[1]):
            new, _ = deslatex_text(p[2])
            print("    NEW BODY TAIL:", repr(new[-80:]))
