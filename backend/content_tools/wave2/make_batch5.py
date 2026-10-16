"""Build the batch-5 hygiene payload: de-LaTeX every whitelisted prose section
in the W2 lane's hygiene-flagged files. Clean conversions go to the payload;
sections with residuals go to residuals.txt for hand authoring.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from apply_w2 import editable  # noqa: E402
from de_latex import to_plain, residual_report  # noqa: E402

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)


def get_sections(text):
    ms = list(SECTION_RE.finditer(text))
    return {m.group(1): text[m.end(): ms[i + 1].start() if i + 1 < len(ms) else len(text)].strip()
            for i, m in enumerate(ms)}


recs = [json.loads(l) for l in open(os.path.join(HERE, "w2_scores.jsonl"), encoding="utf-8")]
files = sorted({r["file"] for r in recs if not r["parked"] and not r["hyg_ok"]})

payload_edits = []
residuals = []
stats = {"files": 0, "sections": 0, "clean": 0, "residual": 0}
for fn in files:
    path = os.path.join(CORPUS, fn)
    text = open(path, encoding="utf-8").read()
    secs = get_sections(text)
    new_bodies = {}
    for name, body in secs.items():
        if not editable(name):
            continue
        if "\\" not in body and "$" not in body:
            continue
        stats["sections"] += 1
        converted = to_plain(body)
        issues = residual_report(converted)
        if converted.strip() == body.strip():
            continue
        if issues:
            stats["residual"] += 1
            residuals.append(f"### {fn} :: {name}\nBEFORE: {body[:400]}\nAFTER:  {converted[:400]}\nISSUES: {issues}\n")
            continue
        stats["clean"] += 1
        new_bodies[name] = converted
    if new_bodies:
        stats["files"] += 1
        payload_edits.append({"file": fn, "sections": new_bodies})

with open(os.path.join(HERE, "authoring", "batch5_delatex.json"), "w", encoding="utf-8") as f:
    json.dump({"edits": payload_edits}, f, ensure_ascii=False, indent=1)
with open(os.path.join(HERE, "residuals.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(residuals))

print("stats:", stats)
print("payload: authoring/batch5_delatex.json")
print("residuals:", len(residuals), "sections -> residuals.txt")
