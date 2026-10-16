"""Categorize leftover constructs: matrices, code-adjacent, misc commands."""
import os
import re
from collections import Counter

CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
LANE_RE = re.compile(r"^c(\d+)_([a-z]+)_icse_\d+_\d+\.md$", re.I)
PARKED = {"hin", "eng"}
CODE_SPAN_RE = re.compile(r"`[^`]*`")

mat_files, code_files, misc = [], [], Counter()
for fn in sorted(os.listdir(CORPUS)):
    if not LANE_RE.match(fn) or fn.split("_")[1] in PARKED:
        continue
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", newline="").read()
    in_fence = False
    for raw in text.splitlines():
        line = raw.rstrip("\r\n")
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        stripped = CODE_SPAN_RE.sub("", line)
        if "\\begin{" in stripped:
            mat_files.append(fn)
        if re.search(r"\\[A-Za-z]|\$[^$\n]+\$", stripped):
            # java-looking line?
            if re.search(r"\b(String|int|double|float|char|boolean|void|System|public|static)\b", stripped) or raw.startswith("    "):
                code_files.append((fn, line[:90]))
            else:
                for m in re.finditer(r"\\([A-Za-z]+)", stripped):
                    misc[m.group(1)] += 1
mat_files = sorted(set(mat_files))
print(f"files with \\begin{{...}} matrices: {len(mat_files)}")
print(" ", mat_files)
print(f"\nsuspected code lines: {len(code_files)}")
for fn, l in code_files[:10]:
    print(f"  {fn}: {l}")
print("\nmisc leftover commands:", dict(misc.most_common(40)))
