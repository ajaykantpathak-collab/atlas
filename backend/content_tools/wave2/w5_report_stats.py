"""Parked-family measurement + 10/10 quality summary from w5_scores.jsonl."""
import json
from collections import Counter, defaultdict

rows = [json.loads(l) for l in open(
    r"D:\platform\deploy\backend\content_tools\wave2\w5_scores.jsonl", encoding="utf-8")]

parked = [r for r in rows if r["parked"]]
action = [r for r in rows if not r["parked"]]

print("=== PARKED (measured, untouched) ===")
by_fam = defaultdict(lambda: {"n": 0, "fail": 0, "gaps": Counter(), "walk_min": 9999, "def_min": 9999})
for r in parked:
    fam = "hin" if "_hin_icse_" in r["file"] else "eng"
    k = (r["grade"], fam)
    b = by_fam[k]
    b["n"] += 1
    g = r["gaps"]
    if g:
        b["fail"] += 1
        for x in g:
            b["gaps"][x.split(":")[0]] += 1
    b["walk_min"] = min(b["walk_min"], r["walk_words"])
    b["def_min"] = min(b["def_min"], r["def_words"])
for k in sorted(by_fam):
    b = by_fam[k]
    print(f"  c{k[0]}_{k[1]}: n={b['n']} below-min={b['fail']} gaps={dict(b['gaps'])} "
          f"min_def={b['def_min']}w min_walk={b['walk_min']}w")

print("\n=== ACTIONABLE 10/10 quality ===")
n = len(action)
print(f"nodes: {n}")
print(f"walk >= 150w: {sum(1 for r in action if r['walk_words'] >= 150)} ({100*sum(1 for r in action if r['walk_words'] >= 150)//n}%)")
print(f"walk >= 300w: {sum(1 for r in action if r['walk_words'] >= 300)}")
print(f"def >= 40w: {sum(1 for r in action if r['def_words'] >= 40)}")
print(f"diag >= 3: {sum(1 for r in action if r['diag_q'] >= 3)}")
print(f"worked >= 2: {sum(1 for r in action if r['worked_n'] >= 2)}")
print(f"walk exam-signal: {sum(1 for r in action if r['walk_exam_signal'])}")
avg = lambda k: sum(r[k] for r in action) / n
print(f"avg def={avg('def_words'):.0f}w walk={avg('walk_words'):.0f}w eli5={avg('eli5_words'):.0f}w diag_q={avg('diag_q'):.1f}")
# parked exam-signal + averages for honesty
pw = [r for r in parked]
print(f"\nparked avg walk={sum(r['walk_words'] for r in pw)/len(pw):.0f}w, below-150: {sum(1 for r in pw if r['walk_words'] < 150)}")
