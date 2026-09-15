"""Self-validation harness for leac2xx / lebs2xx draft catalogs.

Usage: python -B _validate_leac_lebs_draft.py <catalog_path> [more.json ...]

Checks (per DRAFTER_BRIEF.md):
1. Schema: all fields present, concepts >= 3, question_patterns >= 5.
2. Compute DSL: all-lowercase names, safe_eval with mock env
   (every unknown name -> 1.0 plus pi/sqrt/abs/max/min/sum/len),
   builtins never used as variables.
3. Platform gate: bulk_catalog_generator.validate_catalog(cat,
   chapter_text) with chapter_text read from the catalog's source_file.
4. Routing smoke: MiniLM index over the STAGING dir; 3 probes per
   catalog (perturbed own patterns) must land on a concept of the same
   catalog at score >= 0.4.
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
    # NOTE: 30+ char verbatim scanning of definition/key_idea is done by
    # the platform gate itself (validate_catalog).  Titles and standard
    # accounting terminology are facts and are exempt.
    return problems


def check_compute(cat, problems):
    from backend.its.solver.catalog_executor import safe_eval
    for c in cat.get("concepts", []):
        cid = c.get("id", "?")
        for s in c.get("solution_steps") or []:
            expr = s.get("compute")
            if not expr:
                continue
            text = str(expr)
            if text != text.lower():
                problems.append("%s: uppercase in compute '%s'"
                                % (cid, text[:40]))
            for b in BUILTINS:
                if re.search(r"\b%s\s*=" % b, text):
                    problems.append("%s: builtin '%s' used as variable"
                                    % (cid, b))
            core = re.sub(r"^\s*\w+\s*=\s*", "", text.strip())
            try:
                env = {n: 1.0 for n in
                       re.findall(r"[a-z_][a-z0-9_]*", core.lower())
                       if n not in BUILTINS}
                env.update({n: 1.0 for n in BUILTINS})
                safe_eval(core, env)
            except Exception as e:
                problems.append("%s: bad compute '%s' (%s)"
                                % (cid, core[:40], e))
    # worked examples: replay the chain with the given inputs
    for w in cat.get("worked_examples") or []:
        wid = w.get("id", "?")
        vals = dict(w.get("extracted_variables") or {})
        steps = [st for st in (w.get("solution_template") or [])
                 if st.get("compute")]
        if not steps:
            continue
        try:
            from backend.its.solver.catalog_executor import safe_eval
            for st in steps:
                text = str(st["compute"])
                m = re.match(r"^\s*(\w+)\s*=\s*(.+)$", text, re.S)
                if not m:
                    raise ValueError("no binding: %s" % text[:40])
                name, core = m.group(1), m.group(2)
                env = dict(vals)
                env.update({n: 1.0 for n in BUILTINS})
                vals[name] = safe_eval(core, env)
            print("  worked example %s -> final value %s"
                  % (wid, round(vals[name], 4)))
        except Exception as e:
            problems.append("worked example %s failed chain: %s"
                            % (wid, e))
    return problems


def check_gate(cat, problems):
    from bulk_catalog_generator import validate_catalog
    src = cat.get("source_file", "")
    if not src or not os.path.exists(src):
        problems.append("source_file missing on disk: %s" % src)
        return problems
    chapter_text = open(src, encoding="utf-8").read()
    ok, probs = validate_catalog(cat, chapter_text)
    if not ok:
        problems.extend("gate: %s" % p for p in probs)
    return problems


def check_routing(cat, problems):
    from backend.its.solver import competency_engine as ce
    ce._COMPETENCY_DIR = STAGING
    ce._INDEX = None
    router = ce._get_router()
    if router is None:
        problems.append("router init failed (sentence_transformers?)")
        return problems
    cat_ids = {c.get("id") for c in cat.get("concepts", [])}
    by_id = {c["id"]: c for c in router.concepts}
    pats = []
    for c in cat.get("concepts", []):
        for p in (c.get("question_patterns") or [])[:1]:
            pats.append((c["id"], p))
    picks = []
    for i in range(PROBES):
        picks.append(pats[(i * 7 + 3) % len(pats)])
    for i, (cid, pat) in enumerate(picks):
        probe = pat
        if i == 0:
            probe = "Explain how to " + pat[0].lower() + pat[1:]
        elif i == 1:
            probe = "A student asks: " + pat
        hit = router.route(probe)
        if hit is None:
            problems.append("routing: probe %r -> no match" % probe[:60])
            continue
        concept, score = hit
        if score < THRESHOLD:
            problems.append("routing: probe %r score %.3f < %.2f"
                            % (probe[:60], score, THRESHOLD))
        if concept.get("id") not in cat_ids:
            other = by_id.get(concept.get("id"), {})
            problems.append("routing: probe %r -> %s (%s, %.3f) outside "
                            "this catalog"
                            % (probe[:60], concept.get("id"),
                               other.get("title", "?"), score))
        else:
            print("  route ok: %s -> %s (%.3f)"
                  % (probe[:52], concept.get("id"), score))
    return problems


def main():
    if len(sys.argv) < 2:
        print("usage: python -B _validate_leac_lebs_draft.py <catalog.json>")
        return 2
    overall = 0
    for path in sys.argv[1:]:
        with open(path, encoding="utf-8") as fh:
            cat = json.load(fh)
        print("== %s ==" % os.path.basename(path))
        print("  %d concepts, %d worked examples, %d exercise blocks"
              % (len(cat.get("concepts", [])),
                 len(cat.get("worked_examples", [])),
                 len(cat.get("exercises", []))))
        problems = []
        check_schema(cat, problems)
        check_compute(cat, problems)
        check_gate(cat, problems)
        check_routing(cat, problems)
        if problems:
            overall = 1
            print("  FAIL (%d):" % len(problems))
            for p in problems:
                print("   - %s" % p)
        else:
            print("  PASS (schema + compute + gate + routing)")
    return overall


if __name__ == "__main__":
    sys.exit(main())
