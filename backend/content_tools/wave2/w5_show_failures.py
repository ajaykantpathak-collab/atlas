"""Show sample failures per gap category."""
import json

fails = json.load(open(r"D:/platform/deploy/backend/content_tools/wave2/w5_gaps.json", encoding="utf-8"))

seen = {}
for r in fails:
    for g in r["gaps"]:
        key = g.split(":")[0]
        if key == "R8":
            continue
        seen.setdefault(key, []).append(r)

for key, rows in seen.items():
    print(f"===== {key} ({len(rows)} files) =====")
    for r in rows[:8]:
        print(f"  {r['file']}  def={r['def_words']} walk={r['walk_words']} eli5={r['eli5_words']} worked_n={r['worked_n']} worked_min={r['worked_min_words']} scope={r['scope_words']}")
    print()

print("===== overlap bare vs delimited latex =====")
import re
bare_set, delim_set = set(), set()
import os
corpus = r"D:/platform/deploy/content/cisce_nodes_v2"
delim_rx = re.compile(r"\$[^$\n]+\$")
CMDS = ("frac|sqrt|times|div|left|right|triangle|approx|rightarrow|nu|bar|"
        "text|pi|alpha|beta|theta|Delta|mu|lambda|cdot|leq|geq|neq|pm|infty")
bare_rx = re.compile(r"\\(" + CMDS + r")\b")
for fn in os.listdir(corpus):
    if not re.match(r"^c(\d+)_([a-z]+)_icse_\d+_\d+\.md$", fn, re.I):
        continue
    text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    if bare_rx.search(delim_rx.sub("", text)):
        bare_set.add(fn)
    if delim_rx.search(text):
        delim_set.add(fn)
print(f"bare: {len(bare_set)}, delimited: {len(delim_set)}, bare-only: {len(bare_set - delim_set)}, delim-only: {len(delim_set - bare_set)}, both: {len(bare_set & delim_set)}")
print("delim-only:", sorted(delim_set - bare_set))
