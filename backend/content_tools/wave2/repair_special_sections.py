"""Hand-authored repairs for the 3 sections the mechanical sweep cannot clear
(two column-arithmetic \\begin{array} layouts, one source-truncated line).
Writes authoring_hand_special.json; apply with apply_wave2.py."""
import warnings
warnings.filterwarnings("ignore")
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from apply_wave2 import split_sections
from latex_to_text import convert

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
HERE = os.path.dirname(os.path.abspath(__file__))


def conv_section(fn, sec):
    text = open(os.path.join(corpus, fn), encoding="utf-8").read()
    _, parts = split_sections(text)
    for p in parts:
        if p[1] == sec:
            return convert(p[2])[0].strip("\n")
    raise KeyError(sec)


payload = {"edits": []}

# 1. ch01_001 WORKED_EXAMPLE_2 — inline the column subtraction
b = conv_section("c7_math_ch01_001.md", "WORKED_EXAMPLE_2")
pat = re.compile(r"^.*\\begin\{array\}.*$", re.M)
b2, nsub = pat.subn(
    " 3,00,000 - 1,25,000 = 1,75,000 (column subtraction, borrowing from the lakh place).", b)
assert nsub == 1 and "\\begin" not in b2 and "\\hline" not in b2, b2[:400]
payload["edits"].append({"file": "c7_math_ch01_001.md",
                         "set_sections": {"WORKED_EXAMPLE_2": b2}})

# 2. ch03_003 WORKED_EXAMPLE_3 — inline the column addition
b = conv_section("c7_math_ch03_003.md", "WORKED_EXAMPLE_3")
pat = re.compile(r"^.*\\begin\{array\}.*$", re.M)
b2, nsub = pat.subn(" 3.06 + 0.45 = 3.51.", b)
assert nsub == 1 and "\\begin" not in b2 and "\\hline" not in b2, b2[:400]
payload["edits"].append({"file": "c7_math_ch03_003.md",
                         "set_sections": {"WORKED_EXAMPLE_3": b2}})

# 3. c8_eco_ch3_4 WORKED_EXAMPLE_1 — the source line is truncated mid-\text;
#    complete it by hand (numbers verified against the node's ANSWER block:
#    30% urbanisation in 2011, 37.5% in 2021, +7.5 pp).
b = conv_section("c8_eco_ch3_4.md", "WORKED_EXAMPLE_1")
broken = re.compile(r"^ U₂₀₁₁ = .*$", re.M)
m = broken.search(b)
assert m, b[:600]
b2 = broken.sub(" U₂₀₁₁ = (300,000 urban / 1,000,000 total) × 100 = 30%.", b)
b2 = b2.replace("ANSWER: ANSWER:", "ANSWER:")
assert "\\frac" not in b2 and "\\text" not in b2, b2[:600]
payload["edits"].append({"file": "c8_eco_ch3_4.md",
                         "set_sections": {"WORKED_EXAMPLE_1": b2}})

out = os.path.join(HERE, "authoring_hand_special.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=1)
print("wrote", out, "edits:", len(payload["edits"]))
for e in payload["edits"]:
    print("  ", e["file"], list(e["set_sections"]))
