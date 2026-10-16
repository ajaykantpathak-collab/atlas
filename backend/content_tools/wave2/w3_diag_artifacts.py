"""W3 one-off: diagnose artifact flags in strip straggler sections."""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections
from w3_apply import strip_ids_from_text, ARTIFACT_RE, ID_RE, is_prose_section

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
FILES = ["c10_chem_cbse_02_006.md", "c10_chem_cbse_03_011.md", "c10_civ_cbse_05_006.md",
         "c10_eco_cbse_05_003.md", "c10_geo_cbse_01_009.md", "c10_geo_cbse_02_007.md",
         "c10_geo_cbse_03_002.md", "c10_geo_cbse_04_001.md", "c10_hist_cbse_05_002.md",
         "c10_hist_cbse_05_009.md", "c10_math_cbse_04_012.md", "c10_math_cbse_05_006.md",
         "c10_phy_cbse_01_002.md", "c10_phy_cbse_03_009.md"]
for fn in FILES:
    secs = parse_sections(open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read())
    for k, body in secs.items():
        if not is_prose_section(k) or not ID_RE.search(body):
            continue
        new = strip_ids_from_text(body)
        if new == body:
            continue
        m = ARTIFACT_RE.search(new)
        if m:
            ctx = new[max(0, m.start() - 60): m.end() + 60].replace("\n", " ")
            print(f"{fn}:{k}")
            print(f"   HIT[{m.group(0)[:20]!r}]: ...{ctx}...")
