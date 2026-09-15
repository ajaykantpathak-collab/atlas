"""Self-validation harness for leph2xx physics draft catalogs.

Usage: python -B _validate_physics_draft.py <catalog_path> [more.json ...]

Checks (per DRAFTER_BRIEF.md and the writer assignment):
1. Schema: all fields, concepts >= 3, question_patterns >= 5 per concept,
   solution_type in {compute, verify_property}, steps numbered.
2. Compute DSL: expressions all-lowercase, safe_eval with mock env
   (every unknown name -> 1.0 + pi/sqrt/abs/max/min/sum/len), no builtin
   names used as variables, multi-hop names bound before use.
3. Platform gate: bulk_catalog_generator.validate_catalog(cat, chapter_text)
   plus an extra 30+ char verbatim scan over titles and question_patterns.
4. Routing smoke: MiniLM index built over the STAGING dir; 3 probes per
   catalog must land on a concept of the same catalog at score >= 0.4.
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform/backend/tools")
sys.path.insert(0, "D:/platform")

STAGING = os.path.dirname(os.path.abspath(__file__))
BUILTINS = ("pi", "sqrt", "abs", "max", "min", "sum", "len")
THRESHOLD = 0.40
PROBES = 3


def check_schema(cat, problems):
    for field in ("class", "subject", "chapter", "chapter_title",
                  "source_file", "license", "concepts",
                  "worked_examples", "exercises"):
        if field not in cat:
            problems.append("missing top-level field '%s'" % field)
    n = len(cat.get("concepts", []))
    if n < 3:
        problems.append("only %d concepts (<3)" % n)
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
        steps = c.get("solution_steps") or []
        for i, s in enumerate(steps, 1):
            if s.get("step") != i:
                problems.append("%s: step numbering broken at %d" % (cid, i))
    return problems


def check_compute(cat, problems):
    from backend.its.solver.catalog_executor import safe_eval
    for c in cat.get("concepts", []):
        cid = c.get("id", "?")
        bound = set()
        steps = c.get("solution_steps") or []
        for s in steps:
            expr = str(s.get("compute", "")).strip()
            if not expr:
                continue
            if expr != expr.lower():
                problems.append("%s: uppercase in compute '%s'" % (cid, expr))
            m = re.match(r"^([a-z_][a-z0-9_]*)\s*=\s*(.+)$", expr, re.S)
            if not m:
                problems.append("%s: compute not 'name = expr': %r"
                                % (cid, expr[:50]))
                continue
            name, bare = m.group(1), m.group(2)
            if name in BUILTINS:
                problems.append("%s: builtin '%s' as variable" % (cid, name))
            used = set(re.findall(r"[a-z_][a-z0-9_]*", bare))
            missing = {u for u in used - bound - set(BUILTINS)}
            env = {u: 1.0 for u in missing}
            env.update({"pi": 3.14159, "sqrt": lambda x: x ** 0.5,
                        "abs": abs, "max": max, "min": min,
                        "sum": sum, "len": len})
            env.update({u: 1.0 for u in bound})
            try:
                safe_eval(bare, env)
            except Exception as e:
                problems.append("%s: bad compute '%s' (%s)"
                                % (cid, bare[:50], e))
            bound.add(name)
        if c.get("solution_type") == "compute" and not steps:
            problems.append("%s: compute concept without steps" % cid)
    # worked examples too
    for we in cat.get("worked_examples", []):
        wid = we.get("id", "?")
        bound = set()
        for s in we.get("solution_template") or []:
            expr = str(s.get("compute", "")).strip()
            if not expr:
                continue
            if expr != expr.lower():
                problems.append("%s: uppercase in compute '%s'" % (wid, expr))
            m = re.match(r"^([a-z_][a-z0-9_]*)\s*=\s*(.+)$", expr, re.S)
            if not m:
                problems.append("%s: bad compute form %r" % (wid, expr[:50]))
                continue
            name, bare = m.group(1), m.group(2)
            if name in BUILTINS:
                problems.append("%s: builtin '%s' as variable" % (wid, name))
            used = set(re.findall(r"[a-z_][a-z0-9_]*", bare))
            env = {u: 1.0 for u in used - bound - set(BUILTINS)}
            env.update({"pi": 3.14159, "sqrt": lambda x: x ** 0.5,
                        "abs": abs, "max": max, "min": min,
                        "sum": sum, "len": len})
            env.update({u: 1.0 for u in bound})
            try:
                safe_eval(bare, env)
            except Exception as e:
                problems.append("%s: bad compute '%s' (%s)"
                                % (wid, bare[:50], e))
            bound.add(name)
    return problems


def check_gate(cat, problems):
    from backend.its.solver.catalog_executor import safe_eval  # noqa: F401
    from bulk_catalog_generator import validate_catalog
    src = cat.get("source_file", "")
    with open(src, encoding="utf-8") as f:
        text = f.read()
    ok, probs = validate_catalog(cat, text)
    for p in probs:
        problems.append("GATE: %s" % p)
    if not ok:
        problems.append("GATE: validate_catalog returned ok=False")
    # extra verbatim scan: titles + question_patterns vs source
    src_alnum = re.sub(r"[^a-z0-9]+", " ", text.lower())
    for c in cat.get("concepts", []):
        cid = c.get("id", "?")
        chunks = [str(c.get("title", ""))]
        chunks += [str(q) for q in (c.get("question_patterns") or [])]
        for ch in chunks:
            ch_alnum = re.sub(r"[^a-z0-9]+", " ", ch.lower()).strip()
            for run in re.findall(r"[a-z0-9][a-z0-9 ]{29,}", ch_alnum):
                run = run.strip()
                if len(run) >= 30 and run in src_alnum:
                    problems.append("%s: 30+ char verbatim run in title/"
                                    "pattern: %r" % (cid, run[:60]))
                    break
    return problems


def check_routing(cat, problems):
    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        problems.append("ROUTE: router init failed (transformers missing?)")
        return problems
    cat_ids = {c["id"] for c in cat.get("concepts", [])}
    pats = []
    for c in cat.get("concepts", []):
        pats.extend(c.get("question_patterns") or [])
    step = max(1, len(pats) // PROBES)
    probes = [pats[i * step] for i in range(PROBES)]
    for pi, probe in enumerate(probes):
        text = re.sub(r"\d+(?:\.\d+)?", "25", str(probe))
        if pi == 1:
            text = "Explain how to " + text[0].lower() + text[1:]
        elif pi == 2:
            text = "A student asks: " + text
        hit = router.route(text)
        if hit is None:
            problems.append("ROUTE: no hit for %r" % text[:70])
            continue
        concept, score = hit
        mine = concept.get("id") in cat_ids
        print("ROUTE [%s] score=%.3f id=%s q=%r"
              % ("OK" if (mine and score >= THRESHOLD) else "FAIL",
                 score, concept.get("id"), text[:55]))
        if not mine:
            problems.append("ROUTE: top concept %s not in catalog for %r"
                            % (concept.get("id"), text[:60]))
        elif score < THRESHOLD:
            problems.append("ROUTE: score %.3f < %.2f for %r"
                            % (score, THRESHOLD, text[:60]))
    return problems


def main():
    failures = 0
    for path in sys.argv[1:]:
        with open(path, encoding="utf-8") as f:
            cat = json.load(f)
        problems = []
        print("=== %s ===" % os.path.basename(path))
        print("-- schema")
        problems = check_schema(cat, problems)
        print("-- compute")
        problems = check_compute(cat, problems)
        print("-- gate")
        problems = check_gate(cat, problems)
        print("-- routing")
        problems = check_routing(cat, problems)
        if problems:
            failures += 1
            print("PROBLEMS (%d):" % len(problems))
            for p in problems:
                print(" -", p)
        else:
            print("ALL CHECKS PASSED (%d concepts)"
                  % len(cat.get("concepts", [])))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
