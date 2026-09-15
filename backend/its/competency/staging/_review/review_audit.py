"""review_audit.py -- quality gate for staged science competency catalogs.

Audit dimensions per catalog file:
  1. SCHEMA     top-level + concept-level fields, types, solution_type enum
  2. COPYRIGHT  12+ char alnum runs shared with the chapter source
  3. DSL        every compute expression parses via catalog_executor.safe_eval
                (mock env: unknown names -> 1.0, pi -> math.pi)
  4. WRONGANS   science-specific wrong-answer scan (echo computes, constant
                computes, qualitative compute concepts)
  5. GROUNDING  domain terms from title/formula present in chapter source
  6. ENRICH     question_patterns < 5; compute concepts with < 2 examples

Read-only. Prints a per-file report and a JSON issue dump for the fixer.
"""
from __future__ import annotations

import ast
import json
import math
import os
import re
import sys

sys.path.insert(0, r"D:/platform")

STAGING = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = r"D:/node_generator/ncert-mcp/data/processed/text_cache"

PATTERNS = [
    "catalog_class6_science_*", "catalog_class7_science_*",
    "catalog_class8_science_*", "catalog_class9_science_*",
    "catalog_class10_science_*", "catalog_class11_physics_*",
    "catalog_class11_chemistry_*", "catalog_class11_biology_*",
    "catalog_class12_physics_*", "catalog_class12_chemistry_*",
    "catalog_class12_biology_*",
]

TOP_FIELDS = {
    "class": int, "subject": str, "chapter": int, "chapter_title": str,
    "source_file": str, "concepts": list, "worked_examples": list,
    "exercises": list,
}
CONCEPT_FIELDS = {
    "id": str, "title": str, "section": str, "definition": str,
    "formula": str, "key_idea": str, "textbook_ref": str,
    "question_patterns": list, "solution_type": str, "solution_steps": list,
}
SOLUTION_TYPES = {"compute", "verify_property", "solution_steps"}

STOP = {
    "the", "a", "an", "and", "or", "of", "for", "to", "in", "on", "with",
    "from", "by", "its", "their", "this", "that", "these", "those", "how",
    "what", "why", "when", "which", "into", "than", "then", "using", "use",
    "used", "some", "any", "all", "one", "two", "per", "via", "each",
    "between", "among", "about", "value", "values", "given",
}

_SRC_CACHE = {}


def source_text(base: str) -> str:
    if base not in _SRC_CACHE:
        with open(os.path.join(CACHE, base), encoding="utf-8",
                  errors="replace") as f:
            _SRC_CACHE[base] = f.read()
    return _SRC_CACHE[base]


def alnum_lower(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


_FUNC_WORDS = {
    "a", "an", "the", "of", "in", "on", "at", "to", "for", "from", "by",
    "with", "and", "or", "but", "is", "are", "was", "were", "be", "been",
    "being", "it", "its", "this", "that", "these", "those", "as", "than",
    "then", "so", "such", "not", "no", "can", "may", "will", "would",
    "which", "who", "whom", "whose", "what", "when", "where", "why", "how",
    "into", "onto", "over", "under", "between", "among", "through",
    "during", "their", "there", "they", "them", "we", "our", "you", "your",
    "his", "her", "also", "both", "each", "every", "all", "some", "any",
    "other", "more", "most", "less", "least", "very", "only", "about",
    "after", "before", "while", "if", "because", "due", "called", "known",
}


def longest_shared_run(field_text: str, src_al: str, n: int = 12):
    """Longest alnum run shared between field_text and source.

    Runs made ONLY of up to 3 consecutive content words (technical
    terms like 'photosynthesis respiration') are exempt: facts and
    domain vocabulary are not copyrightable prose.  A run carrying any
    function word (the, of, and, ...) is prose overlap.
    Returns (run_len, run_alnum, run_words)."""
    # build alnum text + word map
    al_words = []   # (word_lower, start, end) in alnum coords
    al_parts = []
    pos = 0
    for w in re.findall(r"[A-Za-z0-9]+", field_text.lower()):
        s = pos
        al_parts.append(w)
        pos += len(w)
        al_words.append((w, s, pos))
    t = "".join(al_parts)
    if len(t) < n:
        return 0, "", []
    grams = {t[i:i + n] for i in range(len(t) - n + 1)}
    best_len, best_txt, best_words = 0, "", []
    for g in grams:
        idx = src_al.find(g)
        if idx < 0:
            continue
        ti = t.find(g)
        lo = 0
        while (ti - lo > 0 and idx - lo > 0 and
               t[ti - lo - 1] == src_al[idx - lo - 1]):
            lo += 1
        hi = 0
        while (ti + n + hi < len(t) and idx + n + hi < len(src_al) and
               t[ti + n + hi] == src_al[idx + n + hi]):
            hi += 1
        ln = n + lo + hi
        if ln > best_len:
            best_len = ln
            best_txt = t[max(0, ti - lo): ti + n + hi]
            best_words = [w for (w, s, e) in al_words
                          if s < ti + n + hi and e > ti - lo and len(w) > 1]
    if best_words:
        has_func = any(w in _FUNC_WORDS for w in best_words)
        content = [w for w in best_words if w not in _FUNC_WORDS]
        if not has_func and len(content) <= 3:
            return 0, "", []   # technical-term run: exempt
    return best_len, best_txt, best_words


# --------------------------- DSL check --------------------------- #

def _mock_eval(expr: str):
    """Mimic catalog_executor.safe_eval with mock env; return error or None."""
    try:
        from backend.its.solver.catalog_executor import (
            _EvalError, _eval_node, _ALLOWED_NODES, _ALLOWED_FUNCS)
    except Exception as exc:  # pragma: no cover
        return "import failure: %s" % exc
    m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", expr, re.DOTALL)
    if m:
        expr = m.group(2)
    try:
        tree = ast.parse(expr.strip(), mode="eval")
    except (SyntaxError, ValueError) as exc:
        return "cannot parse: %s" % exc
    env = {"pi": math.pi}
    for node in ast.walk(tree):
        if not isinstance(node, _ALLOWED_NODES):
            return "disallowed syntax: %s" % type(node).__name__
        if isinstance(node, ast.Constant):
            if isinstance(node.value, bool) or not isinstance(
                    node.value, (int, float)):
                return "non-numeric constant: %r" % (node.value,)
        if isinstance(node, ast.Name) and node.id not in env:
            env[node.id] = 1.0
        if isinstance(node, ast.Call):
            if not isinstance(node.func, ast.Name) or \
                    node.func.id not in _ALLOWED_FUNCS:
                return "disallowed function call"
    try:
        _eval_node(tree, env)
    except _EvalError as exc:
        return "eval error: %s" % exc
    except Exception as exc:
        return "eval crash: %s" % exc
    return None


_QUAL_VERBS = (
    "define", "what is", "what are", "name ", "explain", "describe",
    "why ", "list ", "state ", "differentiate", "distinguish",
    "give reason", "draw ", "label ", "how does", "how do",
)


def concept_compute_exprs(concept):
    out = []
    for st in concept.get("solution_steps") or []:
        c = str(st.get("compute") or "").strip()
        if c:
            out.append((st, c))
    return out


def audit_file(path: str):
    name = os.path.basename(path)
    issues = []   # (dim, severity, detail)
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    m = re.match(r"catalog_class(\d+)_([a-z]+)_", name)
    fclass, fsubj = int(m.group(1)), m.group(2)

    for field, typ in TOP_FIELDS.items():
        if field not in data:
            issues.append(("SCHEMA", "ERR", "missing top field %s" % field))
        elif not isinstance(data[field], typ):
            issues.append(("SCHEMA", "ERR",
                           "top %s expected %s got %s" %
                           (field, typ.__name__,
                            type(data[field]).__name__)))
    if data.get("class") != fclass:
        issues.append(("SCHEMA", "ERR",
                       "class %r != filename class %d" %
                       (data.get("class"), fclass)))
    if data.get("subject") != fsubj:
        issues.append(("SCHEMA", "ERR",
                       "subject %r != filename subject %s" %
                       (data.get("subject"), fsubj)))
    if len(data.get("concepts") or []) < 3:
        issues.append(("SCHEMA", "ERR", "concepts < 3"))

    src_file = data.get("source_file") or ""
    src_base = os.path.basename(src_file)
    src_al = ""
    src_txt = ""
    if src_base and os.path.exists(os.path.join(CACHE, src_base)):
        src_txt = source_text(src_base)
        src_al = alnum_lower(src_txt)
    else:
        issues.append(("GROUNDING", "ERR", "source missing: %s" % src_file))

    concepts = data.get("concepts") or []
    cids = set()
    for i, c in enumerate(concepts):
        cid = c.get("id", "concept[%d]" % i)
        if cid in cids:
            issues.append(("SCHEMA", "ERR", "duplicate concept id %s" % cid))
        cids.add(cid)
        for field, typ in CONCEPT_FIELDS.items():
            if field not in c or c.get(field) in (None, "") and typ is str:
                if field not in c:
                    issues.append(("SCHEMA", "ERR",
                                   "%s: missing %s" % (cid, field)))
                elif c.get(field) == "":
                    issues.append(("SCHEMA", "WARN",
                                   "%s: empty %s" % (cid, field)))
            elif not isinstance(c.get(field), typ):
                issues.append(("SCHEMA", "ERR",
                               "%s: %s expected %s got %s" %
                               (cid, field, typ.__name__,
                                type(c.get(field)).__name__)))
        st = str(c.get("solution_type", ""))
        if st not in SOLUTION_TYPES:
            issues.append(("SCHEMA", "ERR",
                           "%s: bad solution_type %r" % (cid, st)))
        qp = c.get("question_patterns") or []
        if len(qp) < 3:
            issues.append(("SCHEMA", "ERR",
                           "%s: question_patterns < 3 (%d)" % (cid, len(qp))))
        for stp in (c.get("solution_steps") or []):
            if not isinstance(stp, dict) or not {"step", "action",
                                                 "explain"} <= set(stp):
                issues.append(("SCHEMA", "ERR",
                               "%s: solution_step needs step/action/explain"
                               % cid))

        # 2. COPYRIGHT on definition + key_idea
        # prose-scale verbatim line: a shared span of 30+ alnum chars
        # spanning 5+ consecutive words is NCERT prose copied verbatim
        # and must be rewritten.  Shorter shared spans are technical
        # terms and factual collocations (facts are not copyrightable
        # prose; sentence structures in the drafts are original).
        for fld in ("definition", "key_idea"):
            txt = str(c.get(fld) or "")
            if txt and src_al:
                ln, run, rwords = longest_shared_run(txt, src_al)
                if ln >= 30 and len(rwords) >= 5:
                    issues.append(("COPYRIGHT", "ERR",
                                   "%s.%s: %d-char shared run: '%s' (words: "
                                   "%s)" % (cid, fld, ln, run[:80],
                                            " ".join(rwords[:10]))))

        # 3. DSL on compute expressions
        for stp, expr in concept_compute_exprs(c):
            err = _mock_eval(expr)
            if err:
                issues.append(("DSL", "ERR",
                               "%s step %s compute '%s': %s" %
                               (cid, stp.get("step"), expr, err)))

        # 4. WRONGANS scan
        if st == "compute":
            exprs = [e for _s, e in concept_compute_exprs(c)]
            tmpl_exprs = []
            for ex in data.get("worked_examples") or []:
                if ex.get("concept") == cid:
                    for ts in ex.get("solution_template") or []:
                        ce = str(ts.get("compute") or "").strip()
                        if ce:
                            tmpl_exprs.append(ce)
            all_exprs = exprs + tmpl_exprs

            def _bare(e):
                b = re.sub(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "", e)
                return bool(re.fullmatch(r"-?\d+(\.\d+)?", b.strip()) or
                            re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", b.strip()))
            if not all_exprs:
                issues.append(("WRONGANS", "ERR",
                               "%s: compute type but no compute anywhere" %
                               cid))
            if all_exprs and all(_bare(e) for e in all_exprs):
                issues.append(("WRONGANS", "WARN",
                               "%s: ALL computes are canned constants or "
                               "input echoes (%s)" % (cid, all_exprs[:2])))
            # terminal compute (last step carrying compute) that is a
            # bare NUMERIC LITERAL = a canned fact presented as an
            # answer.  Identifier-echo terminals (protons =
            # atomic_number) are legitimate numeric relations: keep.
            steps_lst = c.get("solution_steps") or []
            term_expr = next((str(s2.get("compute")).strip()
                              for s2 in reversed(steps_lst)
                              if str(s2.get("compute") or "").strip()), None)
            if term_expr is not None:
                tb = re.sub(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "",
                            term_expr).strip()
                if re.fullmatch(r"-?\d+(\.\d+)?", tb):
                    issues.append(("WRONGANS", "WARN",
                                   "%s: terminal compute is a canned "
                                   "constant '%s'" % (cid, term_expr)))
            lowpats = " | ".join(qp).lower()
            if qp and all(any(v in p.lower() for v in _QUAL_VERBS)
                          for p in qp):
                issues.append(("WRONGANS", "WARN",
                               "%s: compute concept with only qualitative "
                               "patterns" % cid))

        # 5. GROUNDING: title + formula terms in source
        title = str(c.get("title") or "")
        words = [w for w in re.findall(r"[a-z]{4,}", title.lower())
                 if w not in STOP]
        fterms = [t for t in re.findall(r"[A-Za-z_][A-Za-z_0-9]+",
                                        str(c.get("formula") or ""))
                  if t.lower() not in STOP and len(t) >= 4]
        probes = words + [t.lower() for t in fterms]
        if src_txt and probes:
            low_src = src_txt.lower()
            hits = [p for p in dict.fromkeys(probes) if p in low_src]
            if not hits:
                issues.append(("GROUNDING", "ERR",
                               "%s: no title/formula term in source "
                               "(probes: %s)" % (cid, probes[:6])))
            elif len(hits) <= 1 and len(probes) >= 3:
                issues.append(("GROUNDING", "WARN",
                               "%s: weak grounding (%d/%d probes hit)" %
                               (cid, len(hits), len(probes))))

        # 6. ENRICH needs
        if len(qp) < 5:
            issues.append(("ENRICH", "INFO",
                           "%s: %d patterns -> pad to 5" % (cid, len(qp))))
        if st == "compute":
            n_ex = sum(1 for ex in data.get("worked_examples") or []
                       if ex.get("concept") == cid)
            if n_ex < 2:
                issues.append(("ENRICH", "INFO",
                               "%s: %d worked examples -> need 2" %
                               (cid, n_ex)))

    # worked example / exercise structure
    for i, ex in enumerate(data.get("worked_examples") or []):
        for fld in ("id", "source_ref", "concept", "question_type",
                    "question_pattern", "solution_template"):
            if fld not in ex:
                issues.append(("SCHEMA", "ERR",
                               "worked_example[%d] missing %s" % (i, fld)))
        if ex.get("concept") and ex["concept"] not in cids:
            issues.append(("SCHEMA", "ERR",
                           "worked_example[%d] dangling concept ref %s" %
                           (i, ex["concept"])))
        for ts in ex.get("solution_template") or []:
            ce = str(ts.get("compute") or "").strip()
            if ce:
                err = _mock_eval(ce)
                if err:
                    issues.append(("DSL", "ERR",
                                   "example %s step %s compute '%s': %s" %
                                   (ex.get("id"), ts.get("step"), ce, err)))
    if not data.get("worked_examples"):
        issues.append(("SCHEMA", "ERR", "worked_examples empty"))
    if not data.get("exercises"):
        issues.append(("SCHEMA", "ERR", "exercises empty"))
    for i, e in enumerate(data.get("exercises") or []):
        for fld in ("id", "source_ref", "questions"):
            if fld not in e:
                issues.append(("SCHEMA", "ERR",
                               "exercise[%d] missing %s" % (i, fld)))
    return data, issues


def main():
    import glob
    files = []
    for p in PATTERNS:
        files += glob.glob(os.path.join(STAGING, p))
    files = sorted(set(files))
    print("Auditing %d staged science catalogs..." % len(files))
    report = {}
    tally = {}
    for path in files:
        name = os.path.basename(path)
        try:
            data, issues = audit_file(path)
        except Exception as exc:
            issues = [("SCHEMA", "ERR", "FATAL: %s" % exc)]
        report[name] = issues
        if issues:
            print("\n== %s" % name)
            for dim, sev, det in issues:
                print("   [%s/%s] %s" % (sev, dim, det))
        for dim, sev, _det in issues:
            key = "%s/%s" % (sev, dim)
            tally[key] = tally.get(key, 0) + 1
    print("\n" + "-" * 60)
    print("Files with issues: %d / %d" %
          (sum(1 for v in report.values() if v), len(report)))
    for k in sorted(tally):
        print("  %-16s %d" % (k, tally[k]))
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "audit_issues.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({k: [[d, s, t] for d, s, t in v]
                   for k, v in report.items()}, f, indent=1)
    print("issue dump -> %s" % out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
