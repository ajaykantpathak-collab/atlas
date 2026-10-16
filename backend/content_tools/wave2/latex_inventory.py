"""Inventory LaTeX constructs in the W2 lane's hygiene-flagged files."""
import json
import os
import re
from collections import Counter

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
HERE = os.path.dirname(os.path.abspath(__file__))

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)


def get_sections(text):
    ms = list(SECTION_RE.finditer(text))
    return {m.group(1): text[m.end(): ms[i + 1].start() if i + 1 < len(ms) else len(text)].strip()
            for i, m in enumerate(ms)}


act = [json.loads(l) for l in open(os.path.join(HERE, "w2_scores.jsonl"), encoding="utf-8")]
files = sorted({r["file"] for r in act if not r["parked"] and not r["hyg_ok"]})

constructs = Counter()
examples = {}
for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
    for name, body in get_sections(text).items():
        for cm in re.finditer(r"\\[a-zA-Z]+", body):
            key = cm.group(0)
            constructs[key] += 1
            if key not in examples:
                s = max(0, cm.start() - 50)
                examples[key] = (fn, name, body[s:cm.end() + 50].replace("\n", " "))
        # dollar spans without backslash commands are fine to keep? count them
        for dm in re.finditer(r"\$[^$\n]+\$", body):
            if "\\" not in dm.group(0):
                constructs["PLAIN-$..$ (no cmd)"] += 1

print("files with latex:", len(files))
for k, v in constructs.most_common(60):
    fn, sec, ex = examples.get(k, ("", "", ""))
    print(f"{k:<22} {v:>4}   {fn} [{sec}]: {ex!r}")
