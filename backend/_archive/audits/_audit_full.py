"""Deep audit: CBSE vs CISCE node coverage, generators, solvers - READ ONLY."""
import json, os, sys
from collections import Counter, defaultdict
from pathlib import Path

# ── 1. CBSE nodes by class and subject ──
print("=" * 70)
print("1. CBSE NODES (from cbse_data/nodes/by_class)")
print("=" * 70)
cbse_by_class = {}
cbse_by_subj = defaultdict(int)
cbse_dir = Path("D:/platform/cbse_data/nodes/by_class")
if cbse_dir.exists():
    for f in sorted(cbse_dir.glob("*.json")):
        with open(f) as fh:
            data = json.load(fh)
        nodes = data.get("nodes", data) if isinstance(data, dict) else data
        cls = f.stem.replace("class_", "C")
        cbse_by_class[cls] = len(nodes)
        for n in nodes:
            subj = n.get("subject", "?")
            cbse_by_subj[subj] += 1
    total_cbse = sum(cbse_by_class.values())
    print(f"Total CBSE nodes: {total_cbse}")
    print("By class:")
    for c, n in sorted(cbse_by_class.items()):
        print(f"  {c}: {n}")
    print("By subject:")
    for s, n in sorted(cbse_by_subj.items(), key=lambda x: -x[1]):
        print(f"  {s}: {n}")
else:
    print("  CBSE nodes dir not found")

# ── 2. CISCE content nodes ──
print()
print("=" * 70)
print("2. CISCE CONTENT NODES (from organized/)")
print("=" * 70)
cisce_by_subj = {}
org_dir = Path("D:/platform/organized")
if org_dir.exists():
    for subj_dir in sorted(org_dir.iterdir()):
        if not subj_dir.is_dir():
            continue
        total = 0
        classes_with_content = 0
        classes_with_q = 0
        classes_with_s = 0
        for cls_dir in sorted(subj_dir.iterdir()):
            if not cls_dir.is_dir() or not cls_dir.name.startswith("class"):
                continue
            cn = cls_dir / "content_nodes"
            if cn.exists():
                md = list(cn.glob("*.md"))
                total += len(md)
                classes_with_content += 1
            if (cls_dir / "questions.py").exists():
                classes_with_q += 1
            if (cls_dir / "solver.py").exists():
                classes_with_s += 1
        cisce_by_subj[subj_dir.name] = {
            "nodes": total,
            "classes_content": classes_with_content,
            "classes_questions": classes_with_q,
            "classes_solver": classes_with_s,
        }
    total_cisce = sum(v["nodes"] for v in cisce_by_subj.values())
    print(f"Total CISCE content nodes: {total_cisce}")
    print(f"{'Subject':<12} {'Nodes':>6} {'Content':>8} {'Q.py':>6} {'S.py':>6}")
    for s, v in sorted(cisce_by_subj.items(), key=lambda x: -x[1]["nodes"]):
        print(f"  {s:<12} {v['nodes']:>6} {v['classes_content']:>8} {v['classes_questions']:>6} {v['classes_solver']:>6}")

# ── 3. Platform solvers ──
print()
print("=" * 70)
print("3. PLATFORM SOLVERS (from backend/solvers/)")
print("=" * 70)
solver_dir = Path("D:/platform/backend/solvers")
plat_solvers = defaultdict(lambda: defaultdict(int))
if solver_dir.exists():
    for subj_dir in sorted(solver_dir.iterdir()):
        if not subj_dir.is_dir() or subj_dir.name.startswith("_") or subj_dir.name.startswith("core"):
            continue
        for f in subj_dir.glob("*_solver.py"):
            name = f.stem  # e.g. class10_chem_solver
            parts = name.split("_")
            if len(parts) >= 2 and parts[0].startswith("class"):
                cls = parts[0].replace("class", "C")
                plat_solvers[subj_dir.name][cls] += 1
    total_solvers = sum(sum(v.values()) for v in plat_solvers.values())
    print(f"Total platform solver files: {total_solvers}")
    print(f"{'Subject':<12} {'Files':>6} {'Classes':>8}")
    for s, v in sorted(plat_solvers.items()):
        classes = ", ".join(sorted(v.keys()))
        print(f"  {s:<12} {sum(v.values()):>6} {classes}")

# ── 4. Platform question generators ──
print()
print("=" * 70)
print("4. PLATFORM QUESTION GENERATORS (from backend/solvers/)")
print("=" * 70)
plat_qgens = defaultdict(lambda: defaultdict(int))
if solver_dir.exists():
    for subj_dir in sorted(solver_dir.iterdir()):
        if not subj_dir.is_dir() or subj_dir.name.startswith("_") or subj_dir.name.startswith("core"):
            continue
        for f in subj_dir.glob("*_questions.py"):
            name = f.stem
            parts = name.split("_")
            if len(parts) >= 2 and parts[0].startswith("class"):
                cls = parts[0].replace("class", "C")
                plat_qgens[subj_dir.name][cls] += 1
    total_qgens = sum(sum(v.values()) for v in plat_qgens.values())
    print(f"Total platform question files: {total_qgens}")
    print(f"{'Subject':<12} {'Files':>6} {'Classes':>8}")
    for s, v in sorted(plat_qgens.items()):
        classes = ", ".join(sorted(v.keys()))
        print(f"  {s:<12} {sum(v.values()):>6} {classes}")

# ── 5. Coverage matrix: what classes are missing per subject ──
print()
print("=" * 70)
print("5. COVERAGE MATRIX (CISCE content + platform generators)")
print("=" * 70)
all_subjects = sorted(set(list(cisce_by_subj.keys()) + list(plat_qgens.keys())))
print(f"{'Subject':<12} {'CISCE C':>8} {'QGen C':>8} {'Solver C':>9} {'Gap':>20}")
for s in all_subjects:
    cisce = cisce_by_subj.get(s, {})
    qgen = plat_qgens.get(s, {})
    solver = plat_solvers.get(s, {})
    c_classes = cisce.get("classes_content", 0)
    q_classes = len(qgen)
    s_classes = len(solver)
    # Determine which classes are missing generators
    expected = set(range(1, 13))
    have_q = set(int(k.replace("C", "")) for k in qgen.keys())
    missing_q = expected - have_q
    gap = f"Q missing: {sorted(missing_q)[:6]}" if missing_q else "OK"
    print(f"  {s:<12} {c_classes:>8} {q_classes:>8} {s_classes:>9} {gap:>20}")

print()
print("=" * 70)
print("6. SUMMARY")
print("=" * 70)
print(f"CBSE nodes total: {total_cbse if cbse_dir.exists() else 0}")
print(f"CISCE content nodes total: {total_cisce}")
print(f"Platform solver files: {total_solvers}")
print(f"Platform question files: {total_qgens}")
