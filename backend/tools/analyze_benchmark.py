"""analyze_benchmark.py -- summarize competency90_benchmark.jsonl.

Works on partial files (the JSONL is a checkpoint; the env's ML stack can
segfault mid-run, and the resume loop restarts from it).

Usage:
    python backend/tools/analyze_benchmark.py [jsonl_path]
"""
import collections
import json
import sys
from pathlib import Path

path = Path(sys.argv[1]) if len(sys.argv) > 1 else \
    Path(r"D:\platform\cbse_data\competency90_benchmark.jsonl")

rows = []
for line in path.read_text(encoding="utf-8").splitlines():
    try:
        rows.append(json.loads(line))
    except json.JSONDecodeError:
        continue

if not rows:
    print("no rows")
    sys.exit(0)

VER = ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL")
n = len(rows)
ver = [r for r in rows if r["label"] in VER]
guided = [r for r in rows if r["label"] == "GUIDED_PRACTICE"]
print(f"n={n}  verified={len(ver)} ({len(ver)*100//n}%)  "
      f"guided={len(guided)}  ambiguous={n - len(ver) - len(guided)}")

print("\nby subject (verified/n):")
c = collections.Counter(r["subject"] for r in rows)
v = collections.Counter(r["subject"] for r in ver)
for subj, cnt in c.most_common():
    print(f"  {subj:18s} {v.get(subj, 0):3d}/{cnt:3d}")

print("\ntop refusal clusters (lane | first-route | reason-head):")
cl = collections.Counter()
ex = collections.defaultdict(list)
for r in rows:
    if r["label"] in VER:
        continue
    route = (r.get("routes") or ["none"])[0]
    sig = f"{r.get('lane') or '-'} | {route} | {(r.get('refusal_reason') or '')[:45]}"
    cl[sig] += 1
    if len(ex[sig]) < 2:
        ex[sig].append(r["text"][:150])
for sig, cnt in cl.most_common(20):
    print(f"  [{cnt:3d}] {sig}")
    for e in ex[sig]:
        print(f"        e.g. {e}")
