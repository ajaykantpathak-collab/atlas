"""One-off: diagnose the residual latex in the nodes the sweep could not clear."""
import warnings
warnings.filterwarnings("ignore")
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from apply_wave2 import split_sections
from latex_to_text import convert, verify_invariants

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
HERE = os.path.dirname(os.path.abspath(__file__))
recs = [json.loads(l) for l in open(os.path.join(HERE, "w1_scores.jsonl"), encoding="utf-8")]
res = [r for r in recs if not r["parked"] and not r["checks"]["HYGIENE"]]
LATEX = re.compile(r"\\[a-zA-Z]+|\\[$(){}\[\]]|\$")
for r in res:
    text = open(os.path.join(corpus, r["file"]), encoding="utf-8").read()
    _, parts = split_sections(text)
    for p in parts:
        body = p[2]
        if not LATEX.search(body):
            continue
        conv, n = convert(body)
        bad = verify_invariants(body, conv)
        if bad:
            m = LATEX.search(conv)
            ctx = conv[max(0, m.start() - 70): m.end() + 70] if m else ""
            print("%s [%s] :: %s :: ...%s..." % (r["file"], p[1], bad[0],
                  ctx.replace("\n", " | ")))
            break
