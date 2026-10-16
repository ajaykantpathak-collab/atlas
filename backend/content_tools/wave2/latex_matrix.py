"""Matrix: which section types carry LaTeX in the 40 hygiene-flagged files."""
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


def section_class(name):
    for pre in ("DEFINITION", "ELI5", "WALKTHROUGH", "DIAGNOSTIC_QUESTION_",
                "DIAGNOSTIC_ANSWER_", "WORKED_EXAMPLE_", "COMMON_MISCONCEPTION",
                "COMPETENCY_QUESTION_", "COMPETENCY_ANSWER_", "MASTERY_CRITERIA",
                "THIS_FORMULA", "FORWARD_REASONS", "ON_FAILURE", "SCOPE_BOUNDARY",
                "COGNITIVE_LEVEL", "GRAPH", "PREREQ"):
        if name == pre or name.startswith(pre):
            return pre.rstrip("_")
    return name


act = [json.loads(l) for l in open(os.path.join(HERE, "w2_scores.jsonl"), encoding="utf-8")]
files = sorted({r["file"] for r in act if not r["parked"] and not r["hyg_ok"]})
matrix = Counter()
all_names = Counter()
for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
    for name, body in get_sections(text).items():
        cls = section_class(name)
        all_names[cls] += 1
        if "\\" in body or re.search(r"\$[^$]+\$", body):
            matrix[cls] += 1

print("sections carrying latex (of", len(files), "files):")
for k, v in matrix.most_common():
    print(f"  {k:<24} {v:>3} / {all_names[k]}")
print("all section classes present:")
for k, v in all_names.most_common():
    print(f"  {k:<24} {v}")

# CJK check
text = open(os.path.join(CORPUS, "c9_hist_ch2_11.md"), encoding="utf-8").read()
mc = get_sections(text)["COMMON_MISCONCEPTION"]
cjk = re.findall(r"[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]+", mc)
print("\nCJK sequences in c9_hist_ch2_11 COMMON_MISCONCEPTION:", cjk[:10])
print(mc[:400])
