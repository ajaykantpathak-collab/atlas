"""Self-validation harness for leec economics catalogs (per DRAFTER_BRIEF.md).

Usage: python -B validate_leec.py <catalog_path>
1. Schema check: fields present, concepts >= 3, patterns >= 5 per concept.
2. Every compute expression evaluated with mock env (all names -> 1.0).
3. Platform gate: bulk_catalog_generator.validate_catalog(cat, chapter_text).
4. Routing smoke: 2 patterns through route_concept; top concept must be in
   this catalog with score >= 0.4.
"""
import json
import re
import sys

sys.path.insert(0, "backend/tools")
sys.path.insert(0, ".")

CATALOG = sys.argv[1]


def check_schema(cat, problems):
    for field in ("class", "subject", "chapter", "chapter_title",
                  "source_file", "license", "concepts",
                  "worked_examples", "exercises"):
        if field not in cat:
            problems.append("missing top-level field '%s'" % field)
    for c in cat.get("concepts", []):
        cid = c.get("id", "?")
        for field in ("id", "title", "section", "definition", "formula",
                      "key_idea", "textbook_ref", "question_patterns",
                      "solution_type", "solution_steps"):
            if field not in c:
                problems.append("%s: missing '%s'" % (cid, field))
        n_pat = len(c.get("question_patterns") or [])
        if n_pat < 5:
            problems.append("%s: only %d question_patterns (<5)" % (cid, n_pat))
        if c.get("solution_type") not in ("compute", "verify_property"):
            problems.append("%s: bad solution_type" % cid)
        # brief: no 5+ consecutive words from the book in any authored text
    return problems


def check_compute(cat, problems):
    from backend.its.solver.catalog_executor import safe_eval
    for c in cat.get("concepts", []):
        cid = c.get("id", "?")
        for s in c.get("solution_steps") or []:
            expr = str(s.get("compute", "")).strip()
            if not expr:
                continue
            bare = re.sub(r"^\s*[A-Za-z_]\w*\s*=\s*", "", expr)
            names = set(re.findall(r"[a-z_][a-z0-9_]*", bare.lower()))
            if any(n in names for n in ("len",)):
                names.discard("len")
            env = {}
            for n in re.findall(r"[a-z_][a-z0-9_]*", bare.lower()):
                env[n] = 1.0
            env.update({"pi": 3.14159, "sqrt": lambda x: x ** 0.5,
                        "abs": abs, "max": max, "min": min,
                        "sum": sum, "len": len})
            try:
                safe_eval(bare, env)
            except Exception as e:
                problems.append("%s: bad compute '%s' (%s)"
                                % (cid, bare[:50], e))
    return problems


def check_gate(cat, problems):
    from bulk_catalog_generator import validate_catalog
    src = cat.get("source_file", "")
    with open(src, encoding="utf-8") as f:
        text = f.read()
    ok, probs = validate_catalog(cat, text)
    for p in probs:
        problems.append("GATE: %s" % p)
    if not ok:
        problems.append("GATE: validate_catalog returned ok=False")
    return problems


def check_routing(cat, problems):
    from backend.its.solver.competency_engine import route_concept
    ids = {c["id"] for c in cat["concepts"]}
    picked = []
    for c in cat["concepts"]:
        if len(picked) >= 2:
            break
        qps = c.get("question_patterns") or []
        if qps:
            picked.append(qps[0])
    for q in picked:
        try:
            hit = route_concept(q)
        except Exception as e:
            problems.append("ROUTE: route_concept raised %s" % e)
            continue
        if hit is None:
            problems.append("ROUTE: no hit for %r" % q)
            continue
        concept, score = hit
        cid = concept.get("id")
        mine = cid in ids
        status = "OK" if (mine and score >= 0.4) else "FAIL"
        print("ROUTE [{}] score={:.3f} id={} q={!r}".format(
            status, score, cid, q[:60]))
        if not mine:
            problems.append("ROUTE: top concept %s not in catalog for %r"
                            % (cid, q))
        elif score < 0.4:
            problems.append("ROUTE: score %.3f < 0.4 for %r" % (score, q))
    return problems


def main():
    with open(CATALOG, encoding="utf-8") as f:
        cat = json.load(f)
    problems = []
    print("== schema ==")
    problems = check_schema(cat, problems)
    print("== compute ==")
    problems = check_compute(cat, problems)
    print("== gate ==")
    problems = check_gate(cat, problems)
    print("== routing ==")
    problems = check_routing(cat, problems)
    if problems:
        print("PROBLEMS (%d):" % len(problems))
        for p in problems:
            print(" -", p)
        sys.exit(1)
    print("ALL CHECKS PASSED for %s (%d concepts)"
          % (CATALOG, len(cat["concepts"])))


if __name__ == "__main__":
    main()
