"""_validate_lebs_draft.py -- self-validation harness for Class 12
Business Studies catalog drafts (DRAFTER_BRIEF compliance).

Usage (from D:\\platform):
  python -B backend/its/competency/_validate_lebs_draft.py <catalog.json> \
      [--smoke "question pattern" ...]

Default mode: schema checks + safe_eval mock check + platform gate
(validate_catalog from bulk_catalog_generator).
--smoke: routing smoke through competency_engine.route_concept with the
catalog injected PRE-WRITE (file need not exist in the competency dir);
each pattern must route to a concept id in this catalog with score >= 0.4.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("backend/tools"))

REQUIRED_TOP = ("class", "subject", "chapter", "chapter_title", "source_file",
                "concepts", "worked_examples", "exercises")
REQUIRED_CONCEPT = ("id", "title", "section", "definition", "formula",
                    "key_idea", "textbook_ref", "question_patterns",
                    "solution_type", "solution_steps")
MOCK_FUNCS = ("pi", "sqrt", "abs", "max", "min", "sum", "len")


def check_schema(cat, problems, warnings):
    for f in REQUIRED_TOP:
        if f not in cat:
            problems.append("missing top-level field '%s'" % f)
    concepts = cat.get("concepts") or []
    if len(concepts) < 3:
        problems.append("only %d concepts (< 3)" % len(concepts))
    ids = set()
    for c in concepts:
        cid = c.get("id", "?")
        ids.add(cid)
        for f in REQUIRED_CONCEPT:
            if f not in c:
                problems.append("%s: missing '%s'" % (cid, f))
        qp = c.get("question_patterns") or []
        if len(qp) < 5:
            problems.append("%s: %d question_patterns (< 5)" % (cid, len(qp)))
        if c.get("solution_type") not in ("compute", "verify_property"):
            problems.append("%s: bad solution_type" % cid)
        if not (c.get("solution_steps") or []):
            problems.append("%s: empty solution_steps" % cid)
        steps = sorted({s.get("step") for s in (c.get("solution_steps") or [])})
        if steps and steps != list(range(1, len(steps) + 1)):
            warnings.append("%s: step numbers not 1..n: %s" % (cid, steps))
    dup = len(concepts) - len(ids)
    if dup:
        problems.append("%d duplicate concept ids" % dup)
    return ids


def check_eval(cat, problems):
    from backend.its.solver.catalog_executor import safe_eval
    n = 0
    for c in cat.get("concepts") or []:
        for s in c.get("solution_steps") or []:
            expr = s.get("compute")
            if not expr:
                continue
            expr = re.sub(r"^\s*\w+\s*=\s*", "", str(expr).strip())
            names = [w for w in re.findall(r"[a-z_][a-z0-9_]*", expr.lower())
                     if w not in MOCK_FUNCS]
            env = {nm: 1.0 for nm in names}
            env.update({fn: 1.0 for fn in MOCK_FUNCS})
            try:
                safe_eval(expr, env)
                n += 1
            except Exception as e:
                problems.append("%s: bad compute '%s' (%s)"
                                % (c.get("id", "?"), expr[:40], e))
    return n


def check_verbatim(cat, chapter_text, warnings):
    src = re.sub(r"[^a-z0-9]+", " ", chapter_text.lower())
    for c in cat.get("concepts") or []:
        for fld in ("definition", "key_idea"):
            txt = re.sub(r"[^a-z0-9]+", " ",
                         str(c.get(fld, "")).lower()).strip()
            words = txt.split()
            for i in range(len(words) - 6):
                run = " ".join(words[i:i + 7])
                if len(run) >= 30 and run in src:
                    warnings.append("%s: %s has 7-word verbatim run: '%s'"
                                    % (c.get("id", "?"), fld, run))
                    break


def routing_smoke(cat, patterns, problems):
    import backend.its.solver.competency_engine as ce
    orig = ce._catalog_files
    excluded = os.path.abspath(cat["_path"])
    ce._catalog_files = lambda: [f for f in orig()
                                 if os.path.abspath(f) != excluded]
    try:
        router = ce._Router()
    finally:
        ce._catalog_files = orig
    for c in cat.get("concepts") or []:
        c2 = dict(c)
        c2["chapter_title"] = cat.get("chapter_title", "")
        router.concepts.append(c2)
    texts = [ce._normalize_question(ce._concept_text(c))
             for c in router.concepts]
    router.embeddings = router.model.encode(texts,
                                            normalize_embeddings=True)
    mine = {c["id"] for c in cat.get("concepts") or []}
    print("router loaded %d concepts (incl. %d injected from this catalog)"
          % (len(router.concepts), len(mine)))
    for pat in patterns:
        hit = router.route(pat)
        if hit is None:
            problems.append("SMOKE FAIL: no route at all for %r" % pat)
            print("  FAIL  %-60s -> no match" % pat[:60])
            continue
        concept, score = hit
        ok = concept.get("id") in mine and score >= 0.4
        tag = "ok  " if ok else "FAIL"
        print("  %s  %-55s -> %s (%s) score=%.3f"
              % (tag, pat[:55], concept.get("id"),
                 concept.get("title", "")[:40], score))
        if not ok:
            problems.append("SMOKE FAIL: %r routed to %s (%.3f), "
                            "not in this catalog or below 0.4"
                            % (pat, concept.get("id"), score))


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2
    path = os.path.abspath(args[0])
    patterns = []
    i = 1
    while i < len(args):
        if args[i] == "--smoke":
            patterns.append(args[i + 1])
            i += 2
        else:
            i += 1
    with open(path, encoding="utf-8") as f:
        cat = json.load(f)
    cat["_path"] = path
    with open(cat["source_file"], encoding="utf-8") as f:
        chapter_text = f.read()

    problems, warnings = [], []
    check_schema(cat, problems, warnings)
    n_eval = check_eval(cat, problems)
    check_verbatim(cat, chapter_text, warnings)

    from bulk_catalog_generator import validate_catalog
    ok, gate = validate_catalog(cat, chapter_text)
    if not ok:
        problems.extend("GATE: " + g for g in gate)

    print("== schema: %d concepts, %d eval-checked compute exprs"
          % (len(cat.get("concepts") or []), n_eval))
    for w in warnings:
        print("WARN: %s" % w)
    for p in problems:
        print("PROBLEM: %s" % p)
    if patterns:
        routing_smoke(cat, patterns, problems)

    verdict = "PASS" if (not problems) else "FAIL"
    print("== RESULT: %s (%d problems, %d warnings)"
          % (verdict, len(problems), len(warnings)))
    return 0 if not problems else 1


if __name__ == "__main__":
    sys.exit(main())
