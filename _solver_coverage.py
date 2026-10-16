"""Class 6-12 solver coverage audit.

For every (class, subject) combo in board_questions: does a solver module +
question-gen module exist, how many problem types does each register, is every
registered entry callable, and what does the cold import cost. Emits
D:\platform\_solver_coverage.json and a printed table.
"""
import importlib
import inspect
import json
import os
import sys
import time
from collections import defaultdict
from pathlib import Path

import psycopg2

SOLVERS_DIR = Path(r"D:\platform\deploy\backend\solvers")
CLASSES = range(6, 13)

# bank subject code -> candidate solver dir names (first match wins per dir)
SUBJ_DIRS = {
    "math": ["maths"], "app": ["appmath"], "phy": ["physics"], "physics": ["physics"],
    "chem": ["chem"], "chemistry": ["chem"], "bio": ["bio"], "biology": ["bio"],
    "cs": ["cs"], "engl": ["english"], "english": ["english"],
    "eng_h": ["english"], "eng_s": ["english"], "eng_w": ["english"],
    "hin": ["hindi"], "hin_ga": ["hindi"], "hin_kr": ["hindi"], "hin_ks": ["hindi"],
    "hin_sp": ["hindi"], "hin_a": ["hindi"], "hin_al": ["hindi"], "hin_ar": ["hindi"],
    "hin_v": ["hindi"], "gram": ["english"],
    "civ": ["histciv", "soc", "pol"], "hist": ["histciv", "soc"], "geo": ["geo", "soc"],
    "eco": ["econ", "econapp"], "acc": ["acc"], "biotech": ["biotech"],
    "bs": ["bs"], "ip": ["cs"], "leg": ["legal"], "ps": ["psy"], "hs": ["home"],
    "soc": ["soc"], "comp": ["cs"],
}
GENERIC_DIRS = ["soc"]  # class 6-8 social science may live under soc


def bank_combos():
    pw = [l.strip().split("=", 1)[1] for l in open(r"D:\platform\deploy\.env")
          if l.startswith("POSTGRES_PASSWORD=")][0]
    conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                            user="dream_user", password=pw)
    cur = conn.cursor()
    cur.execute("""SELECT class_level, subject, count(*) FROM board_questions
                   WHERE class_level BETWEEN 6 AND 12 GROUP BY 1,2""")
    rows = cur.fetchall()
    conn.close()
    return rows


def module_entries(mod, kind):
    """Return (count, bad_entries) for a plugin module's registry."""
    if kind == "solver":
        reg = getattr(mod, "SOLVER_REGISTRY", None) or {}
    else:
        reg = (getattr(mod, "QUESTION_GEN_REGISTRY", None)
               or getattr(mod, "GENERATOR_REGISTRY", None)
               or getattr(mod, "GEN_REGISTRY", None) or {})
    bad = []
    n = 0
    for ptype, val in reg.items():
        fn = val.get("function") if isinstance(val, dict) else val
        if callable(fn) or (isinstance(fn, type) and hasattr(fn, "solve")):
            n += 1
        else:
            bad.append(ptype)
    return n, bad


def audit_module(path, kind):
    stem = path.stem
    t0 = time.perf_counter()
    mod_name = f"_audit_plugins.{stem}"
    spec = importlib.util.spec_from_file_location(mod_name, path)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[mod_name] = mod
    try:
        spec.loader.exec_module(mod)
    except Exception as exc:
        return {"file": str(path), "error": f"{type(exc).__name__}: {exc}",
                "import_s": round(time.perf_counter() - t0, 2)}
    n, bad = module_entries(mod, kind)
    return {"file": str(path), "entries": n, "bad_entries": bad,
            "import_s": round(time.perf_counter() - t0, 2)}


def main():
    combos = bank_combos()
    report = {"combos": [], "module_audit": [], "missing": []}
    by_subj = defaultdict(list)
    for cl, sub, n in combos:
        by_subj[sub].append((cl, n))

    audited = {}
    for cl in CLASSES:
        for sub in sorted(by_subj):
            cls_rows = [r for r in by_subj[sub] if r[0] == cl]
            if not cls_rows:
                continue
            qcount = cls_rows[0][1]
            dirs = SUBJ_DIRS.get(sub) or GENERIC_DIRS
            found_solver = found_gen = None
            for d in dirs:
                for f in sorted((SOLVERS_DIR / d).glob(f"class{cl}_*_solver.py")) if (SOLVERS_DIR / d).exists() else []:
                    found_solver = f
                for f in sorted((SOLVERS_DIR / d).glob(f"class{cl}_*_questions.py")) if (SOLVERS_DIR / d).exists() else []:
                    found_gen = f
                if found_solver and found_gen:
                    break
            entry = {"class": cl, "subject": sub, "bank_questions": qcount,
                     "solver_file": str(found_solver) if found_solver else None,
                     "gen_file": str(found_gen) if found_gen else None,
                     "solver_entries": None, "gen_entries": None}
            if found_solver:
                key = str(found_solver)
                if key not in audited:
                    audited[key] = audit_module(found_solver, "solver")
                a = audited[key]
                entry["solver_entries"] = a.get("entries")
                entry["solver_error"] = a.get("error")
            if found_gen:
                key = str(found_gen)
                if key not in audited:
                    audited[key] = audit_module(found_gen, "gen")
                a = audited[key]
                entry["gen_entries"] = a.get("entries")
                entry["gen_error"] = a.get("error")
            report["combos"].append(entry)
            if not found_solver:
                report["missing"].append(entry)

    report["module_audit"] = list(audited.values())
    out = Path(r"D:\platform\_solver_coverage.json")
    out.write_text(json.dumps(report, indent=1, default=str), encoding="utf-8")

    # ---- printed summary ----
    total_q = sum(c["bank_questions"] for c in report["combos"])
    covered_q = sum(c["bank_questions"] for c in report["combos"] if c["solver_file"])
    print(f"COMBOS 6-12: {len(report['combos'])}  bank questions: {total_q:,}")
    print(f"combos WITH a solver file: "
          f"{sum(1 for c in report['combos'] if c['solver_file'])} "
          f"({covered_q:,} questions, {covered_q / total_q * 100:.1f}%)")
    print(f"combos WITHOUT solver file: {len(report['missing'])}")
    for m in report["missing"]:
        print(f"  MISSING c{m['class']} {m['subject']} ({m['bank_questions']} q)")
    errs = [a for a in report["module_audit"] if "error" in a]
    print(f"\nIMPORT ERRORS: {len(errs)}")
    for a in errs[:20]:
        print(f"  {Path(a['file']).name}: {a['error'][:120]}")
    bad = [(a['file'], b) for a in report["module_audit"] for b in a.get("bad_entries", [])]
    print(f"\nNON-CALLABLE REGISTRY ENTRIES: {len(bad)}")
    for f, b in bad[:15]:
        print(f"  {Path(f).name}: {b}")
    no_entries = [a for a in report["module_audit"]
                  if "error" not in a and a.get("entries", 0) == 0]
    print(f"\nMODULES LOADED BUT 0 ENTRIES: {len(no_entries)}")
    for a in no_entries[:20]:
        print(f"  {Path(a['file']).name}")
    slow = sorted(report["module_audit"], key=lambda a: -a.get("import_s", 0))[:8]
    print("\nSLOWEST IMPORTS (s):")
    for a in slow:
        print(f"  {Path(a['file']).name}: {a.get('import_s')}")

    per_subj = defaultdict(lambda: [0, 0, 0, 0])
    for c in report["combos"]:
        p = per_subj[c["subject"]]
        p[0] += c["bank_questions"]
        if c["solver_file"]:
            p[1] += c["bank_questions"]
            p[2] += 1
        p[3] += 1
    print("\nPER-SUBJECT (q_total, q_with_solver, combos_covered/combos):")
    for s, (qt, qs, cc, ct) in sorted(per_subj.items(), key=lambda kv: -kv[1][0]):
        print(f"  {s:8s} {qt:7,}  {qs:7,}  {cc}/{ct}")


if __name__ == "__main__":
    main()
