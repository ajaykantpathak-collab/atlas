"""Self-validation + routing smoke for staged BIOLOGY draft catalogs.

Per catalog file:
  1. Platform gate: bulk_catalog_generator.validate_catalog(cat, chapter_text)
  2. Mock-env safe_eval of every compute expression (gate step 2 of the
     drafter brief) + a worked-example chain run with real variables
  3. Routing smoke: 2 probes per concept through
     backend.its.solver.competency_engine route (router built over the
     STAGING dir, since staged files are not live); top hit must be a
     concept of THIS catalog with score >= 0.4

Usage: python _validate_bio_draft.py lebo104 [lebo105 ...]
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))
SCORE_MIN = 0.40


def gate_and_dsl(path):
    with open(path, encoding="utf-8") as fh:
        cat = json.load(fh)
    src = open(cat["source_file"], encoding="utf-8").read()
    from bulk_catalog_generator import validate_catalog
    ok, problems = validate_catalog(cat, src)
    print("GATE %s: %s" % (os.path.basename(path),
                           "ok=True" if ok else "ok=False"))
    for p in problems:
        print("   -", p)

    # brief step 2: every compute expression evaluates under mock env
    # (unbound names = question inputs -> seeded 1.0, per the brief)
    from backend.its.solver.catalog_executor import safe_eval
    dsl_ok = True
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
                val = safe_eval(m.group(2), env)
                env[m.group(1)] = val
                last = val
            except Exception as e:
                dsl_ok = False
                print("   DSL %s: %r -> %s" % (c["id"], expr[:50], e))
    for w in cat.get("worked_examples", []):
        env = {}
        for k, v in (w.get("extracted_variables") or {}).items():
            try:
                env[k] = float(v)
            except (TypeError, ValueError):
                pass  # string placeholder, no DSL use
        try:
            last = None
            for s in w["solution_template"]:
                expr = str(s.get("compute") or "").strip()
                if not expr:
                    continue
                m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                             expr, re.DOTALL)
                last = safe_eval(m.group(2), env)
                env[m.group(1)] = last
            print("   WE %-14s -> %s" % (w["id"], last))
        except Exception as e:
            dsl_ok = False
            print("   WE %s FAILED: %s" % (w["id"], e))
    print("DSL mock-env eval:", "ok" if dsl_ok else "FAILED")
    return ok and dsl_ok, cat


def routing_smoke(cat):
    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        print("ROUTING: router init failed")
        return False
    cat_ids = {c["id"] for c in cat["concepts"]}

    def perturb(p, i):
        p = re.sub(r"\d+(?:\.\d+)?", "25", p)
        if i == 1:
            return "Explain how to " + p[0].lower() + p[1:]
        return "A student asks: " + p

    all_ok = True
    for c in cat["concepts"]:
        hits = []
        for i, probe in enumerate(c["question_patterns"][:2]):
            hit = router.route(perturb(probe, i))
            concept = hit[0] if hit else None
            score = hit[1] if hit else 0.0
            good = concept is not None and concept["id"] in cat_ids \
                and score >= SCORE_MIN
            hits.append((probe[:52], concept["id"] if concept else None,
                         score, good))
            if not good:
                all_ok = False
        status = "PASS" if all(g[3] for g in hits) else "FAIL"
        print("  %-24s %s" % (c["id"], status))
        for probe, cid, score, good in hits:
            if not good:
                print("      probe %.3f -> %s [%s]"
                      % (score, cid, probe))
    return all_ok


def main():
    stems = sys.argv[1:]
    files = [f for f in sorted(os.listdir(STAGING))
             if f.startswith("catalog_") and f.endswith(".json")
             and all(s in f for s in stems)]
    if not files:
        print("no catalogs matched", stems)
        return 1
    total_pass = 0
    for f in files:
        ok, cat = gate_and_dsl(os.path.join(STAGING, f))
        r_ok = routing_smoke(cat)
        total_pass += 1 if (ok and r_ok) else 0
        print("SUMMARY %s: gate=%s routing=%s\n"
              % (f, "PASS" if ok else "FAIL",
                 "PASS" if r_ok else "FAIL"))
    print("%d/%d catalogs fully pass" % (total_pass, len(files)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
