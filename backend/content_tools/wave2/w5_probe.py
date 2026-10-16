"""Probe specific leftover lines: raw vs converted."""
import re
import importlib.util

spec = importlib.util.spec_from_file_location(
    "scrub", r"D:\platform\deploy\backend\content_tools\wave2\w5_latex_scrub.py")
scrub = importlib.util.module_from_spec(spec)
spec.loader.exec_module(scrub)

CASES = [
    (r"c10_math_icse_01_002.md", "CGST"),
    (r"c10_math_icse_05_003.md", r"\inR"),
    (r"c10_math_icse_07_006.md", "biquadratic"),
    (r"c10_math_icse_07_008.md", "Perform synt"),
    (r"c10_math_icse_09_007.md", "geometric progression"),
    (r"c10_math_icse_10_003.md", "A'(2,5)"),
    (r"c10_math_icse_19_002.md", "arithmetic mean"),
    (r"c10_math_icse_20_005.md", "complement"),
    (r"c10_phy_icse_01_002.md", "moment of a force"),
    (r"c9_phy_icse_02_003.md", "Velocity"),
    (r"c9_phy_icse_08_008.md", "magnetizing"),
    (r"c8_compst_icse_01_003.md", "MS-DOS"),
]
corpus = r"D:/platform/deploy/content/cisce_nodes_v2/"
for fn, needle in CASES:
    text = open(corpus + fn, encoding="utf-8", newline="").read()
    for raw in text.splitlines():
        if needle in raw:
            conv = scrub.convert_line(raw)
            print(f"--- {fn} [{needle}]")
            print(f"  RAW: {raw[:200]}")
            print(f"  CON: {conv[:200]}")
            break
