"""Locate suspicious lost words in context."""
CORPUS = r"D:/platform/deploy/content/cisce_nodes_v2/"
CASES = [
    (r"c10_math_icse_15_003.md", "hex"),
    (r"c10_math_icse_16_004.md", "out"),
    (r"c10_math_icse_16_007.md", "div"),
    (r"c10_math_icse_07_005.md", "div"),
]
for fn, needle in CASES:
    text = open(CORPUS + fn, encoding="utf-8", newline="").read()
    for i, raw in enumerate(text.splitlines(), 1):
        p = raw.find(needle)
        if p != -1:
            lo, hi = max(0, p - 70), min(len(raw), p + 90)
            print(f"--- {fn}:{i} [{needle}]")
            print(f"  ...{raw[lo:hi]}...")
            break
