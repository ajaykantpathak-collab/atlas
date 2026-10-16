"""_reconcile_diag_masters.py — unify deploy and root diagram masters into
a superset written to BOTH trees (index + attributions)."""
import json
import os

ROOT = r"D:\platform"
PAIRS = [
    ("frontend", "public", "diagrams", "diagrams_index.json"),
    ("frontend", "public", "diagrams", "diagram_attributions.json"),
]

DEPLOY = os.path.join(ROOT, "deploy", "frontend", "public", "diagrams")
ROOTF = os.path.join(ROOT, "frontend", "public", "diagrams")

for name in ("diagrams_index.json", "diagram_attributions.json"):
    dep_p = os.path.join(DEPLOY, name)
    root_p = os.path.join(ROOTF, name)
    dep = json.load(open(dep_p, encoding="utf-8")) if os.path.exists(dep_p) else {}
    rto = json.load(open(root_p, encoding="utf-8")) if os.path.exists(root_p) else {}
    union = dict(rto)
    dep_added = sum(1 for k in dep if k not in union)
    union.update(dep)
    root_added = len(union) - len(rto)
    for p in (dep_p, root_p):
        with open(p, "w", encoding="utf-8", newline="") as f:
            json.dump(union, f, ensure_ascii=False, indent=1)
    print(f"{name}: union {len(union)} rows (deploy contributed {dep_added} "
          f"new to root; root contributed {root_added} new to deploy)")
