"""Batch-1 staging catalog validator: platform gate + DSL mock-eval.

Usage: python _b1_validate.py <stem-substring> [<stem-substring> ...]
Validates staging/catalog_*.json matching any substring against its
source_file via bulk_catalog_generator.validate_catalog, plus a mock-env
safe_eval pass over every compute expression and worked-example chain.
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))


def check_file(path):
    with open(path, encoding="utf-8") as fh:
        cat = json.load(fh)
    src = open(cat["source_file"], encoding="utf-8").read()
    from bulk_catalog_generator import validate_catalog
    ok, problems = validate_catalog(cat, src)
    dsl_bad = []
    from backend.its.solver.catalog_executor import safe_eval
    for c in cat["concepts"]:
        env = {}
        for s in c.get("solution_steps") or []:
            expr = str(s.get("compute") or "").strip()
            if not expr:
                continue
            try:
                m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                             expr, re.DOTALL)
                for name in re.findall(r"[a-z_][a-z0-9_]*", m.group(2)):
                    if name not in env and name not in (
                            "pi", "sqrt", "abs", "max", "min", "sum", "len"):
                        env[name] = 1.0
                env[m.group(1)] = safe_eval(m.group(2), env)
            except Exception as e:
                dsl_bad.append("%s: %r (%s)" % (c.get("id"), expr[:48], e))
    for w in cat.get("worked_examples", []):
        env = {}
        for k, v in (w.get("extracted_variables") or {}).items():
            try:
                env[k] = float(v)
            except (TypeError, ValueError):
                pass
        for s in w.get("solution_template") or []:
            expr = str(s.get("compute") or "").strip()
            if not expr:
                continue
            try:
                m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                             expr, re.DOTALL)
                for name in re.findall(r"[a-z_][a-z0-9_]*", m.group(2)):
                    if name not in env and name not in (
                            "pi", "sqrt", "abs", "max", "min", "sum", "len"):
                        env[name] = 1.0
                env[m.group(1)] = safe_eval(m.group(2), env)
            except Exception as e:
                dsl_bad.append("%s: %r (%s)" % (w.get("id"), expr[:48], e))
    name = os.path.basename(path)
    status = "ok=True" if ok else "ok=False"
    print("GATE %s: %s concepts=%d we=%d" %
          (name, status, len(cat.get("concepts") or []),
           len(cat.get("worked_examples") or [])))
    for p in problems:
        print("   -", p)
    for d in dsl_bad:
        print("   DSL -", d)
    return ok and not dsl_bad


def main():
    pats = sys.argv[1:]
    files = [f for f in sorted(os.listdir(STAGING))
             if f.startswith("catalog_") and f.endswith(".json")
             and any(p in f for p in pats)]
    if not files:
        print("no catalogs matched", pats)
        return 1
    npass = 0
    failed = []
    for f in files:
        try:
            if check_file(os.path.join(STAGING, f)):
                npass += 1
            else:
                failed.append(f)
        except Exception as e:
            print("GATE %s: EXCEPTION %s" % (f, e))
            failed.append(f)
    print("PASS %d/%d" % (npass, len(files)))
    if failed:
        print("FAILED:", " ".join(failed))
    return 0 if not failed else 1


if __name__ == "__main__":
    sys.exit(main())
