"""Gate runner for batch_3 staged catalogs.

For each catalog file given on the command line:
  1. Platform gate: bulk_catalog_generator.validate_catalog(cat, chapter_text)
  2. Drafter quality rules:
       - >= 5 question_patterns per concept
       - >= 2 worked_examples per compute concept
       - >= 3 concepts
       - compute DSL: lowercase identifiers only, allowed funcs only,
         no division-by-zero under a mock env, multihop chains resolve
       - non-ASCII limited to Devanagari (educational content rule)
  3. Worked-example chains executed with real extracted_variables.

Usage: python _validate_b3.py catalog_class10_social_science_jess104.json ...
"""
import json
import os
import re
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

STAGING = os.path.dirname(os.path.abspath(__file__))
ALLOWED_FUNCS = ("pi", "sqrt", "abs", "max", "min", "sum")


def _devanagari_ok(text):
    for ch in text:
        if ord(ch) < 128:
            continue
        # Devanagari block + extensions + danda
        if 0x0900 <= ord(ch) <= 0x097F or ch in ("\u2013", "\u2014"):
            continue
        return False, ch
    return True, ""


def check(path):
    name = os.path.basename(path)
    with open(path, encoding="utf-8") as fh:
        raw = fh.read()
    cat = json.loads(raw)
    src = open(cat["source_file"], encoding="utf-8").read()
    from bulk_catalog_generator import validate_catalog
    ok, problems = validate_catalog(cat, src)
    if not ok:
        print("GATE %s: ok=False" % name)
        for p in problems:
            print("   -", p)
    else:
        print("GATE %s: ok=True" % name)

    concepts = cat.get("concepts") or []
    if len(concepts) < 3:
        print("   QUALITY: only %d concepts" % len(concepts))
    by_id = {c["id"]: c for c in concepts}
    for c in concepts:
        if len(c.get("question_patterns") or []) < 5:
            print("   QUALITY %s: <5 question_patterns" % c.get("id"))
    comp_ids = [c["id"] for c in concepts
                if c.get("solution_type") == "compute"]
    for cid in comp_ids:
        n = sum(1 for w in cat.get("worked_examples") or []
                if w.get("concept") == cid)
        if n < 2:
            print("   QUALITY %s: only %d worked_examples" % (cid, n))

    # non-ASCII scan (Devanagari allowed in educational content)
    bad, ch = _devanagari_ok(raw)
    if not bad:
        print("   QUALITY: non-ASCII non-Devanagari char %r" % ch)

    # DSL: lowercase identifiers, allowed funcs, chain eval, no div-zero
    from backend.its.solver.catalog_executor import safe_eval
    for c in concepts:
        env = {}
        for s in c.get("solution_steps") or []:
            expr = str(s.get("compute") or "").strip()
            if not expr:
                continue
            m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                         expr, re.DOTALL)
            if not m:
                print("   DSL %s: step has no 'name = expr' form: %r"
                      % (c["id"], expr[:50]))
                continue
            for tok in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", m.group(2)):
                if tok not in ALLOWED_FUNCS and not tok.islower():
                    print("   DSL %s: uppercase/odd name %r in %r"
                          % (c["id"], tok, expr[:50]))
            for tok in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", m.group(2)):
                if tok not in env and tok not in ALLOWED_FUNCS:
                    env[tok] = 1.0   # mock question input
            try:
                env[m.group(1)] = safe_eval(m.group(2), dict(env))
            except Exception as e:
                print("   DSL %s: %r -> %s"
                      % (c["id"], expr[:60], e))
            # variables seeded from the mock must not be echoed inputs
        for w in cat.get("worked_examples") or []:
            if w.get("concept") != c["id"]:
                continue
            wenv = {k: float(v) for k, v in
                    (w.get("extracted_variables") or {}).items()
                    if isinstance(v, (int, float))}
            last = None
            bad_w = False
            for s in w.get("solution_template") or []:
                expr = str(s.get("compute") or "").strip()
                if not expr:
                    continue
                m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                             expr, re.DOTALL)
                if not m:
                    bad_w = True
                    print("   WORKED %s/%s: bad step %r"
                          % (c["id"], w.get("id"), expr[:50]))
                    break
                for tok in re.findall(r"[A-Za-z_][A-Za-z_0-9]*",
                                      m.group(2)):
                    if tok not in wenv and tok not in ALLOWED_FUNCS:
                        bad_w = True
                        print("   WORKED %s/%s: unbound var %r in %r"
                              % (c["id"], w.get("id"), tok, expr[:60]))
                if bad_w:
                    break
                try:
                    wenv[m.group(1)] = safe_eval(m.group(2), dict(wenv))
                    last = wenv[m.group(1)]
                except Exception as e:
                    bad_w = True
                    print("   WORKED %s/%s: %r -> %s"
                          % (c["id"], w.get("id"), expr[:60], e))
                    break
            if not bad_w and last is None:
                print("   WORKED %s/%s: no compute steps"
                      % (c["id"], w.get("id")))
    return ok


if __name__ == "__main__":
    all_ok = True
    for p in sys.argv[1:]:
        if not os.path.isabs(p):
            p = os.path.join(STAGING, p)
        all_ok = check(p) and all_ok
    sys.exit(0 if all_ok else 1)
