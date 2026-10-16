"""Quantify bare vs delimited LaTeX in the W5 CISCE lane."""
import os
import re
from collections import Counter

corpus = r"D:/platform/deploy/content/cisce_nodes_v2"
LANE_RE = re.compile(r"^c(\d+)_([a-z]+)_icse_\d+_\d+\.md$", re.I)
CMDS = ("frac|sqrt|times|div|left|right|triangle|approx|rightarrow|nu|bar|"
        "text|pi|alpha|beta|theta|Delta|mu|lambda|cdot|leq|geq|neq|pm|infty")
bare_rx = re.compile(r"\\(" + CMDS + r")\b")
delim_rx = re.compile(r"\$[^$\n]+\$")

stats = []
cmd_freq = Counter()
for fn in sorted(os.listdir(corpus)):
    if not LANE_RE.match(fn):
        continue
    text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    stripped = delim_rx.sub("", text)
    bare_hits = bare_rx.findall(stripped)
    bare = len(bare_hits)
    delim = len(delim_rx.findall(text))
    cmd_freq.update(bare_hits)
    if bare or delim:
        stats.append((fn, bare, delim))

bare_files = [s for s in stats if s[1] > 0]
print(f"files with BARE latex commands (outside $..$): {len(bare_files)}")
print(f"files with delimited $..$ math: {len([s for s in stats if s[2] > 0])}")
print("command frequency in bare context:", dict(cmd_freq.most_common(15)))
print("top bare offenders:")
for fn, b, d in sorted(bare_files, key=lambda x: -x[1])[:20]:
    print(f"  {b:4d} bare, {d:3d} delim  {fn}")
