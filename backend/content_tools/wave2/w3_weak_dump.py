"""W3 one-off: dump definitions of the weakest passing nodes."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
FILES = ["c10_eco_cbse_02_006.md", "c10_eco_cbse_04_003.md", "c10_eco_cbse_04_007.md",
         "c10_hist_cbse_01_005.md", "c10_eco_cbse_05_005.md", "c10_chem_cbse_05_004.md",
         "c10_bio_cbse_02_003.md", "c10_chem_cbse_04_003.md", "c10_math_cbse_03_006.md",
         "c10_geo_cbse_03_006.md"]
for fn in FILES:
    s = parse_sections(open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read())
    print("===", fn)
    print(s.get("DEFINITION", "").strip())
    print()
