"""Validation harness for maths drafter catalogs (staging).

Checks, in order:
1. SCHEMA: top-level fields, concepts >= 3, per-concept fields,
   solution_type valid, >= 5 question_patterns.
2. DSL: every compute expression (concepts + worked example templates)
   evaluates under the validator's mock env (all names -> 1.0, builtins).
3. NUMERIC: each worked example with a compute template is executed with
   its extracted_variables; the final value must equal the expected
   answer recorded below (zero-wrong rule).
4. GATE: bulk_catalog_generator.validate_catalog(cat, chapter_text)
   must return ok=True.
5. ROUTING SMOKE: 3 probes from the catalog's own patterns (perturbed)
   through the MiniLM router built over the STAGING dir; top concept
   must belong to this catalog with score >= 0.4.

Usage: python _validate_maths_draft.py <catalog-filename> [--no-route]
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))
PATTERN_FLOOR = 5
ROUTE_THRESHOLD = 0.40

# expected final values for worked examples with compute templates
EXPECTED = {
    "catalog_class12_maths_lemh104.json": {
        "ex1": 8, "ex2": 28, "ex3": -52, "ex4": 0, "ex5": -8,
        "ex6": 30.5, "ex7": 23.5, "ex8": 3, "ex9": 6,
        "ex10": 289, "ex11": 25,
    },
    "catalog_class12_maths_lemh105.json": {
        "ex5": 1.25, "ex6": 1, "ex7": 0.2, "ex8": 12, "ex9": -6,
    },
    "catalog_class12_maths_lemh106.json": {
        "ex1": 10 * 3.141592653589793, "ex2": 12 * 3.141592653589793,
        "ex3": 66, "ex4": 126, "ex5": 30.015, "ex6": 20.967,
    },
    "catalog_class12_maths_lemh206.json": {
        "ex1": 6250, "ex2": 120, "ex3": 2300,
    },
    "catalog_class12_maths_lemh207.json": {
        "ex1": 0.6666666666666666, "ex2": 0.64, "ex3": 0.2,
        "ex4": 0.58, "ex5": 0.8, "ex6": 0.488, "ex7": 0.26,
        "ex8": 0.9230769230769231, "ex9": 0.5147058823529411,
    },
}

BIND_RE = re.compile(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", re.DOTALL)
NAME_RE = re.compile(r"[a-z_][a-z0-9_]*")
BUILTINS = ("pi", "sqrt", "abs", "max", "min", "sum", "len")


def mock_env(expr):
    env = {n: 1.0 for n in NAME_RE.findall(expr.lower())
           if n not in BUILTINS}
    env.update({n: 1.0 for n in BUILTINS})
    return env


def run_chain(steps, slots):
    import math
    from backend.its.solver.catalog_executor import safe_eval
    env = dict(slots)
    env.update({"pi": math.pi, "sqrt": math.sqrt, "abs": abs,
                "max": max, "min": min, "sum": sum, "len": len})
    value = None
    for s in steps:
        expr = s.get("compute")
        if not expr:
            continue
        m = BIND_RE.match(str(expr).strip())
        if m:
            value = safe_eval(m.group(2), env)
            env[m.group(1)] = value
        else:
            value = safe_eval(str(expr), env)
    return value


def main():
    fname = sys.argv[1]
    do_route = "--no-route" not in sys.argv
    path = os.path.join(STAGING, fname)
    with open(path, encoding="utf-8") as fh:
        cat = json.load(fh)
    problems = []

    # ---- 1. schema ----
    for field in ("class", "subject", "chapter", "chapter_title",
                  "source_file", "license", "concepts",
                  "worked_examples", "exercises"):
        if field not in cat:
            problems.append("missing top-level field '%s'" % field)
    concepts = cat.get("concepts") or []
    if len(concepts) < 3:
        problems.append("only %d concepts" % len(concepts))
    ids = set()
    for c in concepts:
        cid = c.get("id", "?")
        if cid in ids:
            problems.append("duplicate concept id %s" % cid)
        ids.add(cid)
        for field in ("id", "title", "section", "definition", "formula",
                      "key_idea", "textbook_ref", "question_patterns",
                      "solution_type", "solution_steps"):
            if field not in c:
                problems.append("%s: missing '%s'" % (cid, field))
        if c.get("solution_type") not in ("compute", "verify_property"):
            problems.append("%s: bad solution_type" % cid)
        if len(c.get("question_patterns") or []) < PATTERN_FLOOR:
            problems.append("%s: <5 question_patterns" % cid)
        if c.get("solution_type") == "compute":
            if not any(s.get("compute") for s in c.get("solution_steps") or []):
                problems.append("%s: compute concept without compute step" % cid)
            last = (c.get("solution_steps") or [{}])[-1]
            if not last.get("compute"):
                problems.append("%s: last step not compute (terminal must answer)" % cid)
        # ascii-only check across authored strings
        for field in ("title", "definition", "formula", "key_idea"):
            txt = str(c.get(field, ""))
            if any(ord(ch) > 126 for ch in txt):
                problems.append("%s: non-ascii char in %s" % (cid, field))
        for p in c.get("question_patterns") or []:
            if any(ord(ch) > 126 for ch in p):
                problems.append("%s: non-ascii char in pattern" % cid)

    # ---- 2. DSL mock-env check (validator-style) ----
    from backend.its.solver.catalog_executor import safe_eval
    n_checked = 0
    for c in concepts:
        for s in c.get("solution_steps") or []:
            expr = s.get("compute")
            if not expr:
                continue
            stripped = re.sub(r"^\s*\w+\s*=\s*", "", str(expr).strip())
            try:
                safe_eval(stripped, mock_env(stripped))
                n_checked += 1
            except Exception as e:
                problems.append("%s: bad compute '%s' (%s)"
                                % (c.get("id"), str(expr)[:40], e))
    for we in cat.get("worked_examples") or []:
        for s in we.get("solution_template") or []:
            expr = s.get("compute")
            if not expr:
                continue
            stripped = re.sub(r"^\s*\w+\s*=\s*", "", str(expr).strip())
            try:
                safe_eval(stripped, mock_env(stripped))
                n_checked += 1
            except Exception as e:
                problems.append("%s: bad template compute '%s' (%s)"
                                % (we.get("id"), str(expr)[:40], e))

    # ---- 3. numeric execution of worked examples ----
    expected = EXPECTED.get(fname, {})
    n_numeric = 0
    for we in cat.get("worked_examples") or []:
        steps = we.get("solution_template") or []
        if not any(s.get("compute") for s in steps):
            continue
        slots = {k: float(v) for k, v in
                 (we.get("extracted_variables") or {}).items()}
        for v in (we.get("extracted_variables") or {}).values():
            if not isinstance(v, (int, float)):
                problems.append("%s: extracted_variables must be numbers"
                                % we.get("id"))
        try:
            value = run_chain(steps, slots)
        except Exception as e:
            problems.append("%s: template chain failed (%s)"
                            % (we.get("id"), e))
            continue
        n_numeric += 1
        if we.get("id") in expected:
            want = expected[we.get("id")]
            if value is None or abs(value - want) > 1e-6:
                problems.append("%s: template answer %r != expected %r"
                                % (we.get("id"), value, want))
        # concept linkage
        if we.get("concept") not in ids:
            problems.append("%s: concept link %s not in catalog"
                            % (we.get("id"), we.get("concept")))

    # ---- 4. platform gate ----
    from bulk_catalog_generator import validate_catalog
    src = cat.get("source_file", "")
    with open(src, encoding="utf-8", errors="ignore") as fh:
        chapter_text = fh.read()
    ok, gate_problems = validate_catalog(cat, chapter_text)
    if not ok:
        problems.extend("GATE: " + p for p in gate_problems)

    print("schema+DSL ok: %d compute exprs checked; %d templates executed"
          % (n_checked, n_numeric))
    if problems:
        print("RESULT: FAIL (%s)" % fname)
        for p in problems:
            print("  -", p)
        return 1
    print("RESULT: SCHEMA+DSL+NUMERIC+GATE PASS (%s)" % fname)

    # ---- 5. routing smoke ----
    if not do_route:
        return 0
    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        print("ROUTING: router init failed (sentence_transformers missing?)")
        return 1
    pats = []
    for c in concepts:
        pats.extend(c.get("question_patterns") or [])
    step = max(1, len(pats) // 3)
    probes = [pats[i * step] for i in range(3)]
    routed_ok = 0
    for pi, probe in enumerate(probes):
        text = re.sub(r"\d+(?:\.\d+)?", "25", probe)
        if pi == 0:
            text = "Explain how to " + text[0].lower() + text[1:]
        elif pi == 1:
            text = "A student asks: " + text
        hit = router.route(text)
        if hit is None:
            print("  probe%d NO-ROUTE [%s]" % (pi, text[:70]))
            continue
        concept, score = hit
        if concept["id"] in ids and score >= ROUTE_THRESHOLD:
            routed_ok += 1
            print("  probe%d %.3f -> %s (ok)" % (pi, score, concept["id"]))
        else:
            print("  probe%d %.3f -> %s (%s) MISS [%s]"
                  % (pi, score, concept["id"],
                     concept.get("chapter_title", "")[:30], text[:60]))
    print("ROUTING: %d/3 probes in-catalog >= %.2f (%s)"
          % (routed_ok, ROUTE_THRESHOLD, fname))
    return 0 if routed_ok == 3 else 2


if __name__ == "__main__":
    sys.exit(main())
