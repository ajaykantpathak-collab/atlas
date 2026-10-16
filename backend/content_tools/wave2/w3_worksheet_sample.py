"""W3 one-off: dump authoring worksheet for all R1/R2/slop targets."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
recs = [json.loads(l) for l in open(os.path.join(HERE, "w3_lane_scores.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

targets = ["c10_math_cbse_02_002.md", "c10_math_cbse_04_002.md", "c10_phy_cbse_01_003.md",
           "c10_bio_cbse_01_003.md", "c10_bio_cbse_02_008.md", "c10_civ_cbse_03_005.md",
           "c10_geo_cbse_03_007.md", "c10_geo_cbse_04_004.md", "c10_geo_cbse_06_007.md",
           "c10_phy_cbse_03_008.md", "c10_geo_cbse_04_006.md"]
for fn in targets:
    r = next(x for x in act if x["file"] == fn)
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    s = parse_sections(text)
    print("=" * 25, fn, f"(def={r['def_words']}w)")
    print("--- DEFINITION:")
    print(s.get("DEFINITION", "")[:700])
    print()
