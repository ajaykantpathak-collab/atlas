"""W3 one-off: dry-run the strip_ids transform on a sample; print before/after."""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from scan_depth_v2 import parse_sections
from w3_apply import strip_ids_from_text, ID_RE, is_prose_section

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
SAMPLES = ["c10_bio_cbse_01_002.md", "c10_bio_cbse_02_003.md", "c10_bio_cbse_03_012.md",
           "c10_chem_cbse_01_003.md", "c10_civ_cbse_05_006.md", "c10_hist_cbse_02_004.md",
           "c10_geo_cbse_03_005.md", "c10_civ_cbse_03_002.md", "c10_math_cbse_03_001.md",
           "c10_chem_cbse_04_009.md", "c10_civ_cbse_05_003.md"]
for fn in SAMPLES:
    secs = parse_sections(open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read())
    for k, body in secs.items():
        if is_prose_section(k) and ID_RE.search(body):
            new = strip_ids_from_text(body)
            if new != body:
                print(f"### {fn}:{k}")
                # show changed lines only
                bl, nl = body.split("\n"), new.split("\n")
                for i in range(max(len(bl), len(nl))):
                    b = bl[i] if i < len(bl) else ""
                    n = nl[i] if i < len(nl) else ""
                    if b != n:
                        print(f"  BEFORE: {b}")
                        print(f"  AFTER : {n}")
    print()
