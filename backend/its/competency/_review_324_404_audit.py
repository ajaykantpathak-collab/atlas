"""Quality review audit for catalog files at positions 324-404 (0-indexed).

First pass is read-only: schema, copyright, DSL, grounding, enrichment,
gate validation, and chapter_title/chapter-number edition alignment.
Source texts resolve against BOTH text_cache and text_cache_new (the
2026-27 NCERT files live only in text_cache_new).
"""
import json
import os
import re
import sys
import glob

COMP_DIR = r"D:\platform\backend\its\competency"
sys.path.insert(0, r"D:\platform")
sys.path.insert(0, r"D:\platform\backend")

from backend.tools.bulk_catalog_generator import validate_catalog  # noqa: E402
from backend.its.solver.catalog_executor import safe_eval  # noqa: E402

TEXT_CACHES = [
    r"C:\Users\Alesha4285\AppData\Local\Temp\rev324_src",
    r"D:\node_generator\ncert-mcp\data\processed\text_cache",
    r"D:\node_generator\ncert-mcp\data\processed\text_cache_new",
]

# territory pinned BY NAME (original sorted positions 324-404): the
# corpus is mutated concurrently, so positional windows are unstable
TERRITORY = [
    "catalog_class6_science_ch115.json", "catalog_class6_science_ch116.json",
] + ["catalog_class6_social_ch%d.json" % i for i in
     (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)] \
  + ["catalog_class6_social_science_ch2%02d.json" % i for i in range(1, 9)] \
  + ["catalog_class6_social_science_ch3%02d.json" % i for i in range(1, 10)] \
  + ["catalog_class7_curiosity_ch%d.json" % i for i in range(1, 13)] \
  + ["catalog_class7_maths_ch%d.json" % i for i in (102, 103, 104, 105,
                                                    106, 108)] \
  + ["catalog_class7_maths_ch10_algebraic_expressions.json",
     "catalog_class7_maths_ch11_exponents_powers.json",
     "catalog_class7_maths_ch12_symmetry.json",
     "catalog_class7_maths_ch13_visualising_solid_shapes.json",
     "catalog_class7_maths_ch1_integers.json"] \
  + ["catalog_class7_maths_ch2%02d.json" % i for i in range(1, 8)] \
  + ["catalog_class7_maths_ch2_fractions_decimals.json",
     "catalog_class7_maths_ch3_data_handling.json",
     "catalog_class7_maths_ch4_simple_equations.json",
     "catalog_class7_maths_ch5_lines_angles.json",
     "catalog_class7_maths_ch6_triangle_properties.json",
     "catalog_class7_maths_ch7_comparing_quantities.json",
     "catalog_class7_maths_ch8_rational_numbers.json",
     "catalog_class7_maths_ch9_perimeter_area.json"] \
  + ["catalog_class7_science_ch1%02d.json" % i for i in range(1, 11)]

# corrected source per file: the 2026-27 class 6 social science book
# ("Exploring Society: India and Beyond", fees101-114, text_cache_new)
# and the Curiosity class 7 files whose source_file was missing or
# pointed at the wrong book.
SRC_FIX = {
    "catalog_class6_social_ch1.json": "fees101.txt",
    "catalog_class6_social_ch2.json": "fees102.txt",
    "catalog_class6_social_ch3.json": "fees103.txt",
    "catalog_class6_social_ch4.json": "fees104.txt",
    "catalog_class6_social_ch5.json": "fees105.txt",
    "catalog_class6_social_ch6.json": "fees106.txt",
    "catalog_class6_social_ch7.json": "fees107.txt",
    "catalog_class6_social_ch8.json": "fees108.txt",
    "catalog_class6_social_ch9.json": "fees109.txt",
    "catalog_class6_social_ch10.json": "fees110.txt",
    "catalog_class6_social_ch11.json": "fees111.txt",
    "catalog_class6_social_ch12.json": "fees112.txt",
    "catalog_class6_social_ch13.json": "fees113.txt",
    "catalog_class6_social_ch14.json": "fees114.txt",
    "catalog_class7_curiosity_ch2.json": "gecu102.txt",
    "catalog_class7_curiosity_ch4.json": "gecu104.txt",
    "catalog_class7_curiosity_ch7.json": "gecu107.txt",
    "catalog_class7_curiosity_ch8.json": "gecu108.txt",
    "catalog_class7_curiosity_ch11.json": "gecu111.txt",
    "catalog_class7_curiosity_ch12.json": "gecu112.txt",
}

BUILTINS = {"pi", "sqrt", "abs", "max", "min", "sum", "len"}


def resolve_src(cat, name):
    """Return (path, text) for the catalog's chapter text, or (None, None)."""
    wanted = SRC_FIX.get(name)
    cands = []
    if wanted:
        for base in TEXT_CACHES:
            cands.append(os.path.join(base, wanted))
    sf = str(cat.get("source_file", ""))
    if sf:
        cands.append(sf)
        cands.append(sf.replace("/", "\\"))
        for base in TEXT_CACHES:
            cands.append(os.path.join(base, os.path.basename(sf)))
    for c in cands:
        if c and os.path.exists(c):
            with open(c, "r", encoding="utf-8", errors="ignore") as fh:
                return c, fh.read()
    return None, None


def check_expr(cid, tag, raw, issues):
    """DSL validity: lowercase identifiers, whitelisted builtins only,
    must pass safe_eval."""
    raw = str(raw).strip()
    body = re.sub(r"^\s*[A-Za-z_]\w*\s*=\s*", "", raw)
    idents = re.findall(r"\b[A-Za-z_]\w*\b", body)
    ups = sorted({u for u in idents if u != u.lower()})
    if ups:
        issues.append("dsl: %s %s uppercase identifiers %s"
                      % (cid, tag, ups[:4]))
    for nm in sorted(set(idents)):
        if nm in BUILTINS:
            continue
        if not re.match(r"^[a-z_][a-z0-9_]*$", nm):
            issues.append("dsl: %s %s bad identifier %r" % (cid, tag, nm))
    try:
        env = {n: 1.0 for n in re.findall(r"[a-z_][a-z0-9_]*", body.lower())
               if n not in BUILTINS}
        env.update({n: 1.0 for n in BUILTINS})
        safe_eval(body, env)
    except Exception as e:
        issues.append("dsl: %s %s bad compute %r (%s)"
                      % (cid, tag, body[:50], e))


def audit():
    files = sorted(glob.glob(os.path.join(COMP_DIR, "catalog_*.json")))
    by_name = {os.path.basename(f): f for f in files}
    mine = [by_name[n] for n in TERRITORY if n in by_name]
    missing = [n for n in TERRITORY if n not in by_name]
    if missing:
        print("MISSING territory files:", missing)
    print("files in range: %d" % len(mine))
    report = {}
    for f in mine:
        name = os.path.basename(f)
        issues = []
        try:
            with open(f, "r", encoding="utf-8") as fh:
                cat = json.load(fh)
        except Exception as e:
            report[name] = ["FATAL parse: %s" % e]
            continue

        # -- 1. schema completeness
        for field in ("class", "subject", "chapter", "chapter_title",
                      "source_file", "concepts", "worked_examples",
                      "exercises"):
            if field not in cat:
                issues.append("schema: missing top-level '%s'" % field)
        n_concepts = len(cat.get("concepts") or [])
        if n_concepts < 3:
            issues.append("schema: only %d concepts" % n_concepts)
        if not isinstance(cat.get("worked_examples"), list):
            issues.append("schema: worked_examples not a list")
        if not isinstance(cat.get("exercises"), list):
            issues.append("schema: exercises not a list")

        # -- 5. enrichment (catalog level): worked_examples >= 2
        n_we = len(cat.get("worked_examples") or [])
        if n_we < 2:
            issues.append("enrich: catalog has %d worked_examples (<2)" % n_we)

        srcpath, src = resolve_src(cat, name)
        if src is None:
            issues.append("source: unresolvable (%r)"
                          % str(cat.get("source_file"))[:60])
        elif name in SRC_FIX and \
                os.path.basename(str(cat.get("source_file", ""))) != \
                os.path.basename(srcpath):
            issues.append("meta: source_file should be %s (now %s)"
                          % (os.path.basename(srcpath),
                             os.path.basename(str(cat.get("source_file", "")))[:50]))

        # -- 6. validator gate
        if src is not None:
            ok, probs = validate_catalog(cat, src)
            if not ok:
                issues.extend("validator: " + p for p in probs)

        chapter_lower = (src or "").lower()
        src_alnum = re.sub(r"[^a-z0-9]+", " ", chapter_lower)

        for c in (cat.get("concepts") or []):
            cid = c.get("id", "?")
            for fld in ("id", "title", "definition", "formula", "key_idea",
                        "question_patterns", "solution_type",
                        "solution_steps"):
                if fld not in c:
                    issues.append("schema: %s missing '%s'" % (cid, fld))
            if c.get("solution_type") not in ("compute", "verify_property"):
                issues.append("schema: %s bad solution_type %r"
                              % (cid, c.get("solution_type")))

            # -- 2. copyright: 30+ char verbatim runs vs source
            if src is not None:
                for fld in ("definition", "key_idea"):
                    fa = re.sub(r"[^a-z0-9]+", " ",
                                str(c.get(fld, "")).lower())
                    for run in re.findall(r"[a-z0-9][a-z0-9 ]{29,}", fa):
                        run = run.strip()
                        if len(run) >= 30 and run in src_alnum:
                            issues.append(
                                "copyright: %s %s 30+ run: %r"
                                % (cid, fld, run[:60]))
                            break

            # -- 3. DSL: formula field
            fml = str(c.get("formula", "") or "")
            if fml and "=" in fml:
                for part in re.split(r"[;\n]", fml):
                    if part.strip():
                        check_expr(cid, "formula", part.strip(), issues)

            # -- 3. DSL: compute steps
            for i, s in enumerate(c.get("solution_steps") or []):
                if s.get("compute"):
                    check_expr(cid, "step%d" % (i + 1), s["compute"], issues)

            # -- 4. grounding: topical terms from title+formula
            terms = [w for w in re.findall(
                r"[a-z]{5,}",
                (str(c.get("title", "")) + " " + fml).lower())
                if w not in ("number", "numbers", "value", "values",
                             "using", "given", "find", "equation",
                             "chapter")]
            if terms and src is not None and \
                    not any(t in chapter_lower for t in terms):
                issues.append("grounding: %s (%s) terms not in source: %s"
                              % (cid, str(c.get("title", "?"))[:40],
                                 terms[:5]))

            # -- 5. enrichment: question_patterns >= 5
            qps = c.get("question_patterns") or []
            if len(qps) < 5:
                issues.append("enrich: %s has %d question_patterns (<5)"
                              % (cid, len(qps)))

        # worked example templates: DSL too
        for w in (cat.get("worked_examples") or []):
            for i, s in enumerate(w.get("solution_template") or []):
                if s.get("compute"):
                    check_expr("%s/%s" % (w.get("id", "?"),
                                          w.get("concept", "?")),
                               "tmpl%d" % (i + 1), s["compute"], issues)

        # -- coordinator add-on: title must be found in the source text
        # (actual chapter heading); chapter number must be an int
        if src is not None:
            title = str(cat.get("chapter_title", ""))
            tw = re.findall(r"[a-z]{4,}", title.lower())
            if tw and not any(w in chapter_lower for w in tw):
                issues.append("title: chapter_title %r not found in source"
                              % title)
            if not isinstance(cat.get("chapter"), int):
                issues.append("title: chapter field not int: %r"
                              % (cat.get("chapter"),))

        if issues:
            report[name] = issues

    n_clean = len(mine) - len(report)
    print("clean files: %d / %d" % (n_clean, len(mine)))
    for name in sorted(report):
        print("\n=== %s" % name)
        for msg in report[name]:
            print("  - %s" % msg)


if __name__ == "__main__":
    audit()
