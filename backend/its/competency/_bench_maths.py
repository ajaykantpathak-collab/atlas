"""Benchmark harness: maths catalogs 6-12, numbered authored questions.

Usage: python backend/its/competency/_bench_maths.py [class] [--fails N]
Prints per-class solve rate and the top wrong-value examples.
"""
import glob
import json
import re
import sys
import collections

from backend.its.solver.catalog_executor import execute_concept
from backend.its.solver.input_normalizer import normalize_input


def _expval(s: str):
    s = s.strip()
    m = re.match(r"^(-?[\d.]+)\s*/\s*(-?[\d.]+)", s)
    if m and float(m.group(2)):
        return float(m.group(1)) / float(m.group(2))
    m = re.search(r"-?[\d.]+", s)
    return float(m.group(0)) if m else None


def run(classes=range(6, 13), fails_n=12, verbose_fails=False):
    res = collections.defaultdict(lambda: [0, 0])
    wrong = []
    refuse = collections.Counter()
    for cls in classes:
        for f in (glob.glob(
                f"backend/its/questions/generated/catalog_class{cls}_maths*.json")
                + glob.glob(
                f"backend/its/competency/catalog_class{cls}_maths*.json")):
            try:
                d = json.load(open(f, encoding="utf8"))
            except Exception:
                continue
            for c in d.get("concepts", []):
                if not (c.get("solution_type") == "compute"
                        or c.get("converted_to_compute")):
                    continue
                for qq in (c.get("questions") or [])[:4]:
                    q = str(qq.get("q", ""))
                    exp = _expval(str(qq.get("a", "")))
                    if not re.search(r"\d", q) or exp is None:
                        continue
                    res[cls][0] += 1
                    try:
                        r = execute_concept(c, {}, normalize_input(q))
                    except Exception:
                        continue
                    if r and r.ok and abs(r.value - exp) < 0.01:
                        res[cls][1] += 1
                    elif r and r.ok:
                        if len(wrong) < fails_n:
                            wrong.append((cls, q[:70], r.value, exp))
                    elif r:
                        refuse[r.reason[:50]] += 1
    tot = sum(v[0] for v in res.values())
    ok = sum(v[1] for v in res.values())
    print(f"TOTAL: {ok}/{tot} = {100*ok/max(tot,1):.0f}%")
    for cls in res:
        t, o = res[cls]
        print(f"  c{cls}: {o}/{t} = {100*o/max(t,1):.0f}%")
    for k, v in refuse.most_common(6):
        print(f"  REFUSE x{v}: {k}")
    for w in wrong:
        print("WRONG:", w)


if __name__ == "__main__":
    cls = None
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if args:
        cls = range(int(args[0]), int(args[0]) + 1)
    run(classes=cls or range(6, 13), fails_n=15)
