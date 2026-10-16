"""Debug one survivor body."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from delatex_w4 import delatex_body, SURVIVOR_RE, DOLLAR_RE, _dollar_ok
from scan_depth_v2 import parse_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
text = open(os.path.join(corpus, "c11_app_cbse_01_008.md"), encoding="utf-8").read()
secs = parse_sections(text)
body = secs["WORKED_EXAMPLE_1"]
new, n = delatex_body(body)
masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else "  ", new)
print("groups:", n)
for m in SURVIVOR_RE.finditer(masked):
    s = max(0, m.start() - 80)
    e = min(len(masked), m.end() + 80)
    print("SURV:", repr(masked[s:e])[:260])
    break
