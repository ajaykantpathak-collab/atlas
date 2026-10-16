"""W3 one-off: find the exact section that changes outside the edited set."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from w3_apply import (deslatex_text, LATEX_LEFT_RE, is_prose_section,
                      split_sections, join_sections)

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c10_math_cbse_01_011.md"
original = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
preamble, parts = split_sections(original)
new_parts = [list(p) for p in parts]
for p in new_parts:
    if is_prose_section(p[1]) and LATEX_LEFT_RE.search(p[2]):
        new_body, _cx = deslatex_text(p[2])
        if not LATEX_LEFT_RE.search(new_body):
            p[2] = new_body
new_text = join_sections(preamble, new_parts)
o_preamble, o_parts = split_sections(original)
n_preamble, n_parts = split_sections(new_text)
print("preamble same:", o_preamble == n_preamble)
print("part count:", len(o_parts), len(n_parts))
for (oh, on, ob), (nh, nn, nb) in zip(o_parts, n_parts):
    if oh != nh:
        print("HEADER DIFF:", repr(oh), "->", repr(nh))
    if on not in {"WALKTHROUGH", "DEFINITION", "ELI5", "COMMON_MISCONCEPTION"} and \
       not on.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_")):
        if ob != nb:
            print("NON-PROSE BODY DIFF:", on)
            for a, b in zip(ob.split("\n"), nb.split("\n")):
                if a != b:
                    print("   old:", repr(a[:120]))
                    print("   new:", repr(b[:120]))
