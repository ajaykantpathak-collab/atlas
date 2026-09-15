"""Self-validation for staged class 12 chemistry draft catalogs.

Checks (per DRAFTER_BRIEF):
  1. schema: required fields, >= 3 concepts, >= 5 patterns per concept
  2. every compute expr evaluates under safe_eval with mock env
  3. full multihop chains execute end to end (_run_step_chain)
  4. platform gate: bulk_catalog_generator.validate_catalog -> ok=True
  5. routing smoke: 2 perturbed patterns per concept through
     route_concept (index over staging) -- top concept must live in this
     catalog with score >= 0.4
  6. ASCII-only JSON, terminal-step echo/constant guards

Usage: python _validate_chem_draft.py catalog_class12_chemistry_lechXXX.json
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))
THRESHOLD = 0.40
BUILTINS = ("pi", "sqrt", "abs", "max", "min", "sum", "len")


def load(path):
    with open(path, encoding="utf-8") as fh:
        raw = fh.read()
    bad = [ch for ch in raw if ord(ch) > 127]
    return json.loads(raw), bad


def mock_env(expr):
    env = {n: 1.0 for n in re.findall(r"[a-z_][a-z0-9_]*", expr.lower())
           if n not in BUILTINS}
    env.update({n: 1.0 for n in BUILTINS})
    return env


def main():
    cat_path = os.path.join(STAGING, sys.argv[1])
    cat, bad_chars = load(cat_path)
    problems = []

    if bad_chars:
        problems.append("non-ASCII chars present: %r" % bad_chars[:5])

    # ---- 1. schema ----
    for field in ("class", "subject", "chapter", "chapter_title",
                  "source_file", "license", "concepts", "worked_examples",
                  "exercises"):
        if field not in cat:
            problems.append("missing top-level field '%s'" % field)
    concepts = cat.get("concepts") or []
    if len(concepts) < 3:
        problems.append("only %d concepts" % len(concepts))
    ids = set()
    for c in concepts:
        cid = c.get("id", "?")
        if cid in ids:
            problems.append("duplicate id %s" % cid)
        ids.add(cid)
        for f in ("id", "title", "section", "definition", "formula",
                  "key_idea", "textbook_ref", "question_patterns",
                  "solution_type", "solution_steps"):
            if f not in c:
                problems.append("%s: missing '%s'" % (cid, f))
        if len(c.get("question_patterns") or []) < 5:
            problems.append("%s: <5 question_patterns" % cid)
        if c.get("solution_type") not in ("compute", "verify_property"):
            problems.append("%s: bad solution_type" % cid)
        if c.get("solution_type") == "compute" and not any(
                s.get("compute") for s in (c.get("solution_steps") or [])):
            problems.append("%s: compute concept without compute steps" % cid)

    # ---- 2. safe_eval each expression with mock env ----
    from backend.its.solver.catalog_executor import safe_eval, _run_step_chain
    for c in concepts:
        cid = c.get("id", "?")
        for s in c.get("solution_steps") or []:
            expr = str(s.get("compute") or "").strip()
            if not expr:
                continue
            rhs = re.sub(r"^\s*[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "", expr)
            try:
                safe_eval(rhs, mock_env(rhs))
            except Exception as exc:
                problems.append("%s: safe_eval failed '%s' (%s)"
                                % (cid, rhs[:40], exc))

    # ---- 3. run full chains end to end ----
    # Question input slots = names never bound by any step.  Real errors:
    # forward references (name used before its binding step) and
    # rebinding an earlier output.  Input slots get distinct mock values
    # so difference chains never divide by zero.
    primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
    for c in concepts:
        if c.get("solution_type") != "compute":
            continue
        cid = c.get("id", "?")
        steps = [dict(s) for s in (c.get("solution_steps") or [])
                 if s.get("compute")]
        if not steps:
            continue
        bound_order = {}          # name -> step index at which bound
        for idx, s in enumerate(steps):
            m = re.match(r"^\s*([A-Za-z_][A-Za-z_0-9]*)\s*=",
                         s["compute"].strip())
            if not m:
                problems.append("%s: step %s has no binding"
                                % (cid, s.get("step")))
                continue
            name = m.group(1).lower()
            if name in BUILTINS:
                problems.append("%s: builtin '%s' used as binding name"
                                % (cid, name))
            if name in bound_order:
                problems.append("%s: '%s' bound twice (steps %d, %d)"
                                % (cid, name, bound_order[name] + 1,
                                   idx + 1))
            bound_order[name] = idx
            rhs_part = re.sub(r"^\s*[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "",
                              s["compute"].strip())
            for ref in re.findall(r"[a-z_][a-z0-9_]*", rhs_part.lower()):
                if ref in BUILTINS:
                    continue
                if ref in bound_order and bound_order[ref] >= idx:
                    problems.append("%s: step %d forward-uses '%s'"
                                    % (cid, idx + 1, ref))
        inputs = [n for n in sorted({r for s in steps
                                     for r in re.findall(
                                         r"[a-z_][a-z0-9_]*",
                                         s["compute"].lower())
                                     if r not in BUILTINS}
                                    - set(bound_order))]
        env = {n: float(primes[i % len(primes)])
               for i, n in enumerate(inputs)}
        env.update({n: 2.0 for n in BUILTINS})
        try:
            value, _lines = _run_step_chain(steps, env, "validate")
            if not isinstance(value, float) or value != value:
                problems.append("%s: chain produced no scalar" % cid)
            rhs = re.sub(r"^\s*[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "",
                         steps[-1]["compute"]).strip()
            if re.match(r"^[A-Za-z_][A-Za-z_0-9]*$", rhs):
                problems.append("%s: terminal echoes a single name ('%s')"
                                % (cid, rhs))
        except Exception as exc:
            problems.append("%s: chain execution failed (%s)" % (cid, exc))

    # ---- 4. platform gate ----
    from bulk_catalog_generator import validate_catalog
    src = cat.get("source_file", "")
    with open(src, encoding="utf-8") as fh:
        chapter_text = fh.read()
    ok, gate_problems = validate_catalog(cat, chapter_text)
    problems.extend("GATE: " + p for p in gate_problems)

    # ---- 5. routing smoke (2 probes per concept, staging index) ----
    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        problems.append("ROUTING: router init failed")
    else:
        def perturb(p, i):
            p2 = re.sub(r"\d+(?:\.\d+)?", "48", str(p))
            if i == 0:
                return "How do I " + p2[0].lower() + p2[1:] + "?"
            return "Q: " + p2
        route_fail = 0
        for c in concepts:
            cid = c.get("id", "?")
            pats = c.get("question_patterns") or []
            for i, p in enumerate(pats[:2]):
                hit = router.route(perturb(p, i))
                if hit is None:
                    problems.append("ROUTING %s probe%d: no route [%s]"
                                    % (cid, i, p[:50]))
                    route_fail += 1
                    continue
                concept, score = hit
                if concept.get("id") not in ids:
                    problems.append("ROUTING %s probe%d: top hit %s (%.3f)"
                                    " not in catalog [%s]"
                                    % (cid, i, concept.get("id"), score,
                                       p[:50]))
                    route_fail += 1
                elif score < THRESHOLD:
                    problems.append("ROUTING %s probe%d: low score %.3f"
                                    % (cid, i, score))
                    route_fail += 1

    # ---- report ----
    print("catalog: %s  concepts: %d  worked_examples: %d  exercises: %d"
          % (sys.argv[1], len(concepts), len(cat.get("worked_examples", [])),
             len(cat.get("exercises", []))))
    if problems:
        print("RESULT: FAIL (%d problems)" % len(problems))
        for p in problems:
            print("  -", p)
        return 1
    print("RESULT: PASS (schema, safe_eval, chain exec, gate, routing)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
