"""Mirror applier logic exactly for c12_math_cbse_02_007.md."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from delatex_w4 import (delatex_body, SURVIVOR_RE, DOLLAR_RE, _dollar_ok,
                        split_sections, DELIM_RE, PROSE_HEADS, PROSE_FIXED)

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c12_math_cbse_02_007.md"
text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
preamble, parts = split_sections(text)
prose_idx = [i for i, p in enumerate(parts)
             if p[1] in PROSE_FIXED or p[1].startswith(PROSE_HEADS)]
dirty = [i for i in prose_idx if DELIM_RE.search(parts[i][2]) or DOLLAR_RE.search(parts[i][2])]
print("dirty sections:", [parts[i][1] for i in dirty])
for i in dirty:
    body = parts[i][2]
    new_body, _ = delatex_body(body)
    masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else "  ", new_body)
    m = SURVIVOR_RE.search(masked)
    if m:
        s = max(0, m.start() - 80)
        e = min(len(masked), m.end() + 80)
        print(f"\n[{parts[i][1]}] SURV:", repr(masked[s:e])[:300])
