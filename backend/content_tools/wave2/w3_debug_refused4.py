"""W3 one-off: find the missing header in the joined new text."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from w3_apply import deslatex_text, LATEX_LEFT_RE, is_prose_section, split_sections

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c10_math_cbse_01_011.md"
original = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
preamble, parts = split_sections(original)
new_parts = [list(p) for p in parts]
for p in new_parts:
    if is_prose_section(p[1]) and LATEX_LEFT_RE.search(p[2]):
        new_body, _cx = deslatex_text(p[2])
        p[2] = new_body
new_text = "".join([preamble] + [h + b for h, _n, b in new_parts for h in [new_parts[[q[1] for q in new_parts].index(_n)][0]]])
# simpler: rebuild exactly like join_sections
out = [preamble]
for header, name, body in new_parts:
    out.append(header)
    out.append(body)
new_text = "".join(out)
_, recheck = split_sections(new_text)
old_names = [p[1] for p in parts]
new_names = [p[1] for p in recheck]
print("old count", len(old_names), "new count", len(new_names))
missing = [n for n in old_names if n not in new_names]
print("missing after re-split:", missing)
# where does it go missing? find raw text around the missing header in new_text
if missing:
    target = "## " + missing[0]
    idx = new_text.find(target)
    print("raw find of", target, ":", idx)
    if idx == -1:
        # look for what preceded it in old text
        i = old_names.index(missing[0])
        prev = old_names[i - 1]
        j = [p[1] for p in recheck].index(prev)
        print("prev section new body tail:", repr(recheck[j][2][-120:]))
        # print original old body of missing section head
        print("missing section old body head:", repr(parts[i][2][:120]))
