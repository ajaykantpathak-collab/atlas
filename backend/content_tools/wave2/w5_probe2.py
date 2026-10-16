"""Byte-level probe of specific leftover lines."""
CORPUS = r"D:/platform/deploy/content/cisce_nodes_v2/"

CASES = [
    (r"c10_math_icse_01_002.md", "CGST ="),
    (r"c10_math_icse_05_003.md", "inR"),
    (r"c10_math_icse_07_006.md", "inR"),
    (r"c10_math_icse_07_008.md", "synthetic"),
    (r"c10_math_icse_09_007.md", "0."),
    (r"c10_math_icse_10_003.md", "A'(2,5)"),
    (r"c10_math_icse_19_002.md", "x\u0305"),
    (r"c10_math_icse_20_005.md", "A\u0305"),
    (r"c10_phy_icse_01_002.md", "moment"),
    (r"c8_compst_icse_01_003.md", "C:"),
    (r"c9_math_icse_16_002.md", "cases"),
]
for fn, needle in CASES:
    text = open(CORPUS + fn, encoding="utf-8", newline="").read()
    for i, raw in enumerate(text.splitlines(), 1):
        if needle in raw:
            # show a window around the needle
            p = raw.find(needle)
            lo, hi = max(0, p - 60), min(len(raw), p + 160)
            print(f"--- {fn}:{i}")
            print(f"  ...{raw[lo:hi]}...")
            break
