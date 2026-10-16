import sys, os, re
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from delatex_w4 import split_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
text = open(os.path.join(corpus, "c11_math_cbse_13_003.md"), encoding="utf-8").read()
pre, parts = split_sections(text)
OPEN_P = re.compile(re.escape("\\") + "\(")   # backslash + (
CLOSE_P = re.compile(re.escape("\\") + "\)")
OPEN_B = re.compile(re.escape("\\") + "\[")
CLOSE_B = re.compile(re.escape("\\") + "\]")

for h, name, body in parts:
    o = len(OPEN_P.findall(body)); c = len(CLOSE_P.findall(body))
    bo = len(OPEN_B.findall(body)); bc = len(CLOSE_B.findall(body))
    if o != c or bo != bc:
        print(f"{name}: paren {o}/{c} bracket {bo}/{bc}")
        if bo != bc:
            for m in OPEN_B.finditer(body):
                print("   OPEN ctx:", repr(body[max(0, m.start() - 70):m.start() + 70])[:170])
            for m in CLOSE_B.finditer(body):
                print("   CLOSE ctx:", repr(body[max(0, m.start() - 70):m.start() + 70])[:170])
