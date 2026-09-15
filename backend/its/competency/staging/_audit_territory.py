"""Territory audit for commerce + social-science staged catalogs.

Checks per catalog:
  1. schema (top-level + concept fields, counts, solution_type enum)
  2. copyright: 12+ char normalized runs shared with the chapter source
  3. DSL: every solution_steps compute expr parses via
     backend.its.solver.catalog_executor.safe_eval (mock env names -> 1.0
     + pi/sqrt/abs/max/min/sum/len)
  4. wrong-answer scan report: compute concepts listed with formula for
     manual definitional/diagram triage
  5. grounding: alpha words (len>=5, non-stoplist) from title+formula
     must appear in the chapter source
  6. enrichment: question_patterns < 5 flagged; compute-concept example
     coverage reported

Read-only diagnostics; fixes happen in separate scripts.
"""
import json
import math
import os
import re
import sys

STAGING = os.path.dirname(os.path.abspath(__file__))
TEXT_CACHE = "D:/node_generator/ncert-mcp/data/processed/text_cache"

TERRITORY_EXCLUDE = ("maths", "science", "physics", "chemistry", "biology")


def is_territory(fname):
    if not (fname.startswith("catalog_") and fname.endswith(".json")):
        return False
    stem = fname[len("catalog_"):-len(".json")]
    if any(x in stem for x in TERRITORY_EXCLUDE):
        return False
    if re.search(r"class1[12]_accountancy_", stem):
        return True
    if re.search(r"class1[12]_business_studies_", stem):
        return True
    if re.search(r"class1[12]_economics_", stem):
        return True
    if re.search(r"class(6|7|8|9|10|11|12)_social_science_", stem):
        return True
    # class11/class12 leftovers not maths/science (geography, history,
    # political science, ...)
    if re.search(r"class1[12]_", stem):
        return True
    return False


TOP_FIELDS = {"class": int, "subject": str, "chapter": int,
              "chapter_title": str, "source_file": str, "concepts": list,
              "worked_examples": list, "exercises": list}
CONCEPT_FIELDS = {"id": str, "title": str, "definition": str,
                  "formula": str, "key_idea": str, "question_patterns": list,
                  "solution_type": str, "solution_steps": list}
SOLUTION_TYPES = {"compute", "verify_property", "solution_steps"}

# NCERT book prefixes allowed per (class, subject).  A file whose
# concepts carry a foreign book's prefix (e.g. English Kaleidoscope
# 'lekl' drafted into an economics slot) is mislabeled and must not be
# promoted.
BOOK_ALLOW = {
    (11, "accountancy"): {"keac"},
    (12, "accountancy"): {"leac"},
    (11, "business_studies"): {"kebs"},
    (12, "business_studies"): {"lebs"},
    (11, "economics"): {"keec", "keks"},
    (12, "economics"): {"leec"},
    (6, "social_science"): {"fess"},
    (7, "social_science"): {"gess"},
    (8, "social_science"): {"hess"},
    (9, "social_science"): {"iess"},
    (10, "social_science"): {"jess"},
}


def book_prefix(cid):
    p = str(cid).split(".")[0]
    return re.sub(r"[0-9]+$", "", p)

STOP = set("""about above after again against along among around because
before below between during their there these those where which while
whose would should could shall other another being been have has had does
done with without within into from that this than then them they when
what using used uses given gives each some more most many much very also
both every either neither only same such take takes taken through under
until upon when it's its don't won't can't chapter concept concepts
formula answer answers question questions number numbers value values
total amount amounts class subject solve find calculate determine
""".split())


def norm_text(s, squeeze=False):
    s = str(s or "").lower()
    s = re.sub(r"[^a-z0-9]+", " " if not squeeze else "", s)
    return re.sub(r"\s+", " ", s).strip()


def ngram_set(norm, n=12):
    out = set()
    for i in range(max(0, len(norm) - n + 1)):
        out.add(norm[i:i + n])
    return out


def shared_runs(field_norm, source_grams, n=12, max_show=4):
    """Maximal normalized runs of length >= n shared with source."""
    hits = []
    i = 0
    while i <= len(field_norm) - n:
        if field_norm[i:i + n] in source_grams:
            j = i + n
            while j <= len(field_norm) and \
                    field_norm[i:j] in source_grams:
                j += 1
            hits.append(field_norm[i:j - 1])
            i = j
        else:
            i += 1
    return hits[:max_show]


def mock_env_for(expr):
    env = {}
    for name in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", expr):
        if name in ("pi",):
            continue
        env[name] = 1.0
    return env


def safe_env():
    import builtins
    return {"pi": math.pi, "sqrt": math.sqrt, "abs": abs, "max": max,
            "min": min, "sum": sum, "len": len, "__builtins__": {}}


def check_dsl(concepts, examples=None):
    from backend.its.solver.catalog_executor import safe_eval
    problems = []
    chains = []
    for c in concepts:
        for s in c.get("solution_steps") or []:
            comp = str(s.get("compute") or "").strip()
            if comp:
                chains.append((c["id"], comp))
    for e in examples or []:
        for s in e.get("solution_template") or []:
            comp = str(s.get("compute") or "").strip()
            if comp:
                chains.append((e.get("id", "?"), comp))
    for cid, comp in chains:
        m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", comp,
                     re.DOTALL)
        expr = m.group(2) if m else comp
        if "..." in expr or ".." in expr:
            problems.append((cid, comp, "ellipsis range"))
            continue
        env = safe_env()
        env.update(mock_env_for(expr))
        try:
            safe_eval(expr, env)
        except Exception as exc:
            problems.append((cid, comp, str(exc)[:120]))
    return problems


def check_grounding(concepts, source_norm):
    report = []
    for c in concepts:
        words = re.findall(r"[a-zA-Z]{5,}",
                           (str(c.get("title") or "") + " " +
                            str(c.get("formula") or "")).lower())
        terms = [w for w in words if w not in STOP]
        if not terms:
            report.append((c["id"], "NO-CHECKABLE-TERMS", ""))
            continue
        grounded = [t for t in terms if t in source_norm]
        if not grounded:
            report.append((c["id"], "UNGROUNDED", ",".join(terms[:6])))
    return report


def audit(path):
    name = os.path.basename(path)
    issues = []
    info = {}
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except Exception as exc:
        return [(name, "FATAL", "parse: %s" % exc)], {}

    for field, typ in TOP_FIELDS.items():
        if field not in data:
            issues.append((name, "MISSING_TOP", field))
        elif not isinstance(data[field], typ):
            issues.append((name, "TYPE_TOP",
                           "%s want %s" % (field, typ.__name__)))
    concepts = data.get("concepts") or []
    examples = data.get("worked_examples") or []
    # subject must match the subject token encoded in the filename
    expected_subj = None
    for tok in ("social_science", "accountancy", "business_studies",
                "economics"):
        if re.search(r"class1[12]_%s_|class[6-9]_%s_" % (tok, tok),
                     os.path.basename(path)):
            expected_subj = tok
            break
    if expected_subj and data.get("subject") != expected_subj:
        issues.append((name, "SUBJECT_MISMATCH",
                       "file says %s, catalog says %r (%s)" % (
                           expected_subj, data.get("subject"),
                           str(data.get("chapter_title"))[:40])))
    # foreign-book check: most concepts must carry an allowed book prefix
    allow = BOOK_ALLOW.get((data.get("class"), data.get("subject")))
    if allow:
        prefixes = {}
        for c in concepts:
            p = book_prefix(c.get("id", ""))
            prefixes[p] = prefixes.get(p, 0) + 1
        main_prefix = max(prefixes, key=prefixes.get) if prefixes else ""
        if main_prefix and main_prefix not in allow:
            issues.append((name, "FOREIGN_BOOK",
                           "prefix=%s allowed=%s" % (main_prefix,
                                                     sorted(allow))))
        elif main_prefix and prefixes[main_prefix] < len(concepts) * 0.5:
            issues.append((name, "FOREIGN_BOOK",
                           "mixed prefixes %r" % prefixes))
    if len(concepts) < 3:
        issues.append((name, "COUNT", "concepts=%d < 3" % len(concepts)))

    # source text
    src = data.get("source_file") or ""
    source_norm = ""
    if src:
        src_path = os.path.join(TEXT_CACHE, os.path.basename(src))
        if os.path.exists(src_path):
            with open(src_path, encoding="utf-8", errors="ignore") as f:
                raw = f.read()
            source_norm = norm_text(raw)
            source_grams = ngram_set(norm_text(raw, squeeze=True))

    seen_ids = set()
    for i, c in enumerate(concepts):
        cid = c.get("id", "?%d" % i)
        if cid in seen_ids:
            issues.append((name, "DUP_ID", cid))
        seen_ids.add(cid)
        for field, typ in CONCEPT_FIELDS.items():
            if field not in c:
                issues.append((name, "MISSING_CONCEPT", "%s:%s" % (cid, field)))
            elif not isinstance(c[field], typ):
                issues.append((name, "TYPE_CONCEPT",
                               "%s:%s want %s" % (cid, field, typ.__name__)))
        st = c.get("solution_type")
        if st not in SOLUTION_TYPES:
            issues.append((name, "BAD_SOLUTION_TYPE", "%s:%r" % (cid, st)))
        qp = c.get("question_patterns") or []
        if len(qp) < 3:
            issues.append((name, "FEW_PATTERNS", "%s:%d" % (cid, len(qp))))

        # copyright scan: phrase runs (multi-word, 12+ chars) are ERR;
        # single-token runs are common English words (INFO only)
        if source_grams:
            for field in ("definition", "key_idea"):
                norm = norm_text(c.get(field, ""))
                runs = shared_runs(norm, source_grams)
                for r in runs:
                    if " " in r:
                        issues.append((name, "COPYRIGHT",
                                       "%s.%s run[%d]: %s" % (cid, field,
                                                              len(r), r)))

        # student-facing question text: phrase runs only
        qtexts = list(c.get("question_patterns") or [])
        if source_grams:
            for qi, qt in enumerate(qtexts):
                for r in shared_runs(norm_text(qt), source_grams):
                    if " " in r:
                        issues.append((name, "COPYRIGHT_Q",
                                       "%s.pattern[%d] run[%d]: %s"
                                       % (cid, qi, len(r), r)))

        for j, s in enumerate(c.get("solution_steps") or []):
            if not isinstance(s, dict) or not {"step", "action",
                                               "explain"} <= set(s):
                issues.append((name, "BAD_STEP", "%s:%d" % (cid, j)))

    # DSL (solution_steps + worked-example solution_template)
    for cid, comp, err in check_dsl(concepts, examples):
        issues.append((name, "DSL", "%s [%s]: %s" % (cid, comp, err)))

    # grounding
    if source_norm:
        for cid, kind, terms in check_grounding(concepts, source_norm):
            issues.append((name, kind, "%s %s" % (cid, terms)))

    # enrichment
    n_compute = 0
    for c in concepts:
        if len(c.get("question_patterns") or []) < 5:
            issues.append((name, "ENRICH_PATTERNS",
                           "%s:%d<5" % (c.get("id"),
                                        len(c.get("question_patterns") or []))))
        if c.get("solution_type") == "compute":
            n_compute += 1

    examples = data.get("worked_examples") or []
    compute_ids = {c["id"] for c in concepts
                   if c.get("solution_type") == "compute"}
    ex_for_compute = [e for e in examples if e.get("concept") in compute_ids]
    if compute_ids and len(ex_for_compute) < 2:
        issues.append((name, "ENRICH_EXAMPLES",
                       "compute examples=%d<2" % len(ex_for_compute)))
    for i, e in enumerate(examples):
        if not {"id", "source_ref", "concept", "question_type",
                "question_pattern", "solution_template"} <= set(e):
            issues.append((name, "BAD_EXAMPLE",
                           e.get("id", "ex%d" % i)))
        elif e.get("concept") not in seen_ids:
            issues.append((name, "DANGLING_REF",
                           "%s->%s" % (e.get("id"), e.get("concept"))))

    # exercises + worked example question text: phrase runs only
    if source_grams:
        for e in examples:
            for r in shared_runs(norm_text(e.get("question_pattern")),
                                 source_grams):
                if " " in r:
                    issues.append((name, "COPYRIGHT_Q",
                                   "%s.qpattern run[%d]: %s"
                                   % (e.get("id"), len(r), r)))
        for e in data.get("exercises") or []:
            for qi, q in enumerate(e.get("questions") or []):
                for r in shared_runs(norm_text(q), source_grams):
                    if " " in r:
                        issues.append((name, "COPYRIGHT_Q",
                                       "%s.q[%d] run[%d]: %s"
                                       % (e.get("id"), qi, len(r), r)))

    info = {"n_concepts": len(concepts), "n_compute": n_compute,
            "n_examples": len(examples),
            "n_exercises": len(data.get("exercises") or []),
            "compute_list": [
                (c["id"], c.get("title", ""),
                 str(c.get("formula", ""))[:90])
                for c in concepts if c.get("solution_type") == "compute"],
            "concept_titles": [(c.get("id"), c.get("title", ""),
                                c.get("solution_type")) for c in concepts]}
    return issues, info


def main():
    sys.path.insert(0, "D:/platform")
    files = sorted(f for f in os.listdir(STAGING)
                   if is_territory(f))
    if not files:
        print("NO TERRITORY FILES staged yet.")
        return 1
    print("Territory files (%d):" % len(files))
    total_issues = 0
    for f in files:
        path = os.path.join(STAGING, f)
        issues, info = audit(path)
        total_issues += len(issues)
        print("\n=== %s  (concepts=%d compute=%d examples=%d exer=%d)" % (
            f, info["n_concepts"], info["n_compute"], info["n_examples"],
            info["n_exercises"]))
        if info.get("compute_list"):
            for cid, title, formula in info["compute_list"]:
                print("  COMPUTE %s | %s | %s" % (cid, title[:60], formula))
        others = [(cid, t, st) for cid, t, st in info["concept_titles"]
                  if st != "compute"]
        for cid, t, st in others:
            print("  %-14s | %s" % (st or "?", str(t)[:68]))
        grouped = {}
        for _, sev, det in issues:
            grouped.setdefault(sev, []).append(det)
        for sev in sorted(grouped):
            dets = grouped[sev]
            print("  [%s] x%d" % (sev, len(dets)))
            for d in dets[:12]:
                print("    - %s" % d)
            if len(dets) > 12:
                print("    ... +%d more" % (len(dets) - 12))
        if not issues:
            print("  CLEAN")
    print("\nTOTAL ISSUES: %d" % total_issues)
    return 0


if __name__ == "__main__":
    sys.exit(main())
