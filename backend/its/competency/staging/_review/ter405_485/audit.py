"""audit.py -- quality audit for catalog files at sorted positions 405-485.

Checks per file:
  SCHEMA      top-level + concept-level fields/types, solution_type enum
  TITLE       chapter_title / chapter number vs source file opening
  COPYRIGHT   30+ char normalized verbatim runs vs chapter source
              (definition, key_idea -> gate criterion; also scanned:
              question_patterns, worked-example questions, exercises)
  DSL         compute exprs parse via catalog_executor.safe_eval;
              lowercase identifiers only; no builtins as variable names;
              echo (x = x) and constant-bind computes flagged
  GROUNDING   alpha terms (len>=5, non-stoplist) from title+formula must
              appear in chapter source (gate criterion)
  ENRICH      question_patterns >= 5 per concept; >= 2 worked examples
              per compute concept
  GATE        bulk_catalog_generator.validate_catalog result

Read-only; writes issues to issues.json for the fixer.
"""
from __future__ import annotations

import json
import math
import os
import re
import sys

sys.path.insert(0, r"D:/platform")

COMP = r"D:/platform/backend/its/competency"
CACHE = r"D:/node_generator/ncert-mcp/data/processed/text_cache"
CACHE_NEW = r"D:/node_generator/ncert-mcp/data/processed/text_cache_new"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "issues.json")

LO, HI = 405, 485   # inclusive, 0-indexed into sorted catalog list

TOP_FIELDS = {
    "class": int, "subject": str, "chapter": int, "chapter_title": str,
    "concepts": list, "worked_examples": list, "exercises": list,
}
CONCEPT_FIELDS = {
    "id": str, "title": str, "definition": str, "formula": str,
    "key_idea": str, "question_patterns": list, "solution_type": str,
    "solution_steps": list,
}
CONCEPT_SOFT_FIELDS = ("section", "textbook_ref")
SOLUTION_TYPES = {"compute", "verify_property"}
BUILTINS = {"sum", "len", "max", "min", "abs", "sqrt", "pi"}

STOP = set("""the a an and or of for to in on with from by its their this
that these those how what why when which into than then using use used
some any all one two per via each between among about value values given
find calculate determine chapter number numbers using given find equation
""".split())

_SRC = {}


def src_text(basename: str) -> str:
    if basename not in _SRC:
        txt = None
        for root in (CACHE_NEW, CACHE):
            p = os.path.join(root, basename)
            if os.path.exists(p):
                txt = open(p, encoding="utf-8",
                           errors="replace").read()
                break
        _SRC[basename] = txt
    return _SRC[basename]


def norm_space(s: str) -> str:
    s = str(s or "").lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def gate_runs(field_text: str, src_alnum: str):
    """Gate criterion: 30+ char alnum/space runs shared with source."""
    fld = norm_space(field_text)
    out = []
    for run in re.findall(r"[a-z0-9][a-z0-9 ]{29,}", fld):
        run = run.strip()
        if len(run) >= 30 and run in src_alnum:
            out.append(run)
    return out


def mock_env(expr: str) -> dict:
    env = {n: 1.0 for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", expr)}
    env.update({"pi": math.pi, "sqrt": math.sqrt, "abs": abs,
                "max": max, "min": min, "sum": sum, "len": len})
    return env


def check_dsl_chain(steps, cid, issues, tag):
    from backend.its.solver.catalog_executor import safe_eval
    computes = [i for i, s in enumerate(steps)
                if str((s or {}).get("compute") or "").strip()]
    last_compute_idx = computes[-1] if computes else -1
    for si, s in enumerate(steps):
        comp = str((s or {}).get("compute") or "").strip()
        if not comp:
            continue
        m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", comp,
                     re.DOTALL)
        lhs, expr = (m.group(1), m.group(2)) if m else (None, comp)
        if lhs:
            if lhs != lhs.lower():
                issues.append([tag, "DSL_UPPER", cid, si, comp])
            if lhs in BUILTINS:
                issues.append([tag, "DSL_BUILTIN", cid, si, comp])
            expr_body = expr
        else:
            expr_body = comp
        for name in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", expr_body):
            if name != name.lower() and name not in BUILTINS:
                issues.append([tag, "DSL_UPPER_NAME", cid, si, comp,
                               name])
        if m and re.sub(r"[^a-z0-9]+", "", expr_body.strip().lower()) \
                == re.sub(r"[^a-z0-9]+", "", lhs.lower()):
            issues.append([tag, "DSL_ECHO", cid, si, comp])
        if m and re.fullmatch(r"[0-9.]+", expr_body.strip()) \
                and si == last_compute_idx:
            issues.append([tag, "DSL_CONST_BIND", cid, si, comp])
        if "..." in expr_body or ".." in expr_body:
            issues.append([tag, "DSL_ELLIPSIS", cid, si, comp])
            continue
        try:
            safe_eval(expr_body, mock_env(expr_body))
        except Exception as exc:
            issues.append([tag, "DSL_PARSE", cid, si, comp,
                           str(exc)[:100]])


def audit(path: str):
    name = os.path.basename(path)
    issues = []
    info = {}
    try:
        data = json.load(open(path, encoding="utf-8"))
    except Exception as exc:
        return [[name, "FATAL", str(exc)[:120]]], info

    for field, typ in TOP_FIELDS.items():
        if field not in data:
            issues.append([name, "MISSING_TOP", field])
        elif not isinstance(data[field], typ) or (
                typ is int and isinstance(data[field], bool)):
            issues.append([name, "TYPE_TOP", field])
    if not isinstance(data.get("source_file"), str) or \
            not data.get("source_file"):
        issues.append([name, "MISSING_TOP", "source_file"])

    concepts = data.get("concepts") or []
    if not isinstance(concepts, list):
        return issues, info

    # ---- source text ----
    src_base = None
    src = data.get("source_file") or ""
    if src:
        src_base = os.path.basename(src)
    raw = src_text(src_base) if src_base else None
    if raw is None:
        issues.append([name, "SRC_MISSING", src_base or "?"])
        src_alnum = ""
        src_lower = ""
        opening = ""
    else:
        src_alnum = norm_space(raw)
        src_lower = raw.lower()
        opening = raw[:1500].lower()

    # ---- TITLE alignment vs source opening ----
    if raw is not None:
        ch_no = data.get("chapter")
        head_nums = re.findall(r"^\s*(?:chapter\s+)?(\d{1,3})\b",
                               raw[:400], re.I)
        num_in_head = str(ch_no) in re.findall(r"\d+", raw[:400])
        if not num_in_head and head_nums:
            issues.append([name, "TITLE_CHAPNUM",
                           "catalog chapter=%s; source head numbers=%s"
                           % (ch_no, head_nums[:4])])
        title = str(data.get("chapter_title") or "")
        words = [w for w in re.findall(r"[a-z]{4,}", title.lower())]
        hit = [w for w in words if w in opening]
        if words and not hit:
            issues.append([name, "TITLE_MISMATCH",
                           "%r absent from source opening" % title])
        elif words and len(hit) < max(1, len(words) // 2):
            issues.append([name, "TITLE_PARTIAL",
                           "%r only %d/%d words in opening"
                           % (title, len(hit), len(words))])

    # ---- concepts ----
    seen = set()
    compute_ids = []
    for i, c in enumerate(concepts):
        cid = str(c.get("id", "?%d" % i))
        if cid in seen:
            issues.append([name, "DUP_ID", cid])
        seen.add(cid)
        for field, typ in CONCEPT_FIELDS.items():
            if field not in c:
                issues.append([name, "MISSING_CONCEPT", "%s:%s"
                               % (cid, field)])
            elif not isinstance(c[field], typ):
                issues.append([name, "TYPE_CONCEPT",
                               "%s:%s want %s" % (cid, field,
                                                  typ.__name__)])
        for field in CONCEPT_SOFT_FIELDS:
            if field not in c:
                issues.append([name, "MISSING_SOFT", "%s:%s"
                               % (cid, field)])
        st = c.get("solution_type")
        if st not in SOLUTION_TYPES:
            issues.append([name, "BAD_SOLUTION_TYPE", "%s:%r" % (cid, st)])
        if st == "compute":
            compute_ids.append(cid)
            steps = c.get("solution_steps") or []
            if not any((s or {}).get("compute") for s in steps):
                issues.append([name, "COMPUTE_NO_COMPUTE", cid])
        qp = c.get("question_patterns") or []
        if len(qp) < 5:
            issues.append([name, "ENRICH_PATTERNS", "%s:%d"
                           % (cid, len(qp))])
        elif len(set(map(str.lower, qp))) < len(qp):
            issues.append([name, "DUP_PATTERN", cid])

        # grounding (gate criterion)
        if src_lower:
            terms = [w for w in re.findall(
                r"[a-z]{5,}",
                (str(c.get("title", "")) + " " +
                 str(c.get("formula", ""))).lower())
                if w not in ("number", "numbers", "value", "values",
                             "using", "given", "find", "equation",
                             "chapter")]
            if terms and not any(t in src_lower for t in terms):
                issues.append([name, "UNGROUNDED", cid,
                               ",".join(terms[:6])])

        # copyright
        if src_alnum:
            for fld in ("definition", "key_idea"):
                for run in gate_runs(c.get(fld, ""), src_alnum):
                    issues.append([name, "COPYRIGHT", "%s.%s" % (cid, fld),
                                   run[:70]])
            for qi, qt in enumerate(qp):
                for run in gate_runs(qt, src_alnum):
                    issues.append([name, "COPYRIGHT_Q", cid, qi,
                                   run[:70]])

        # steps sanity + DSL
        for si, s in enumerate(c.get("solution_steps") or []):
            if not isinstance(s, dict) or not {"step", "action",
                                               "explain"} <= set(s):
                issues.append([name, "BAD_STEP", "%s:%d" % (cid, si)])
        check_dsl_chain(c.get("solution_steps") or [], cid, issues,
                        "DSL")

    # ---- worked examples ----
    for e in data.get("worked_examples") or []:
        eid = str(e.get("id", "?"))
        need = {"id", "source_ref", "concept", "question_type",
                "question_pattern", "solution_template"}
        miss = need - set(e)
        if miss:
            issues.append([name, "BAD_EXAMPLE", eid,
                           ",".join(sorted(miss))])
        if e.get("concept") not in seen:
            issues.append([name, "DANGLING_REF",
                           "%s->%s" % (eid, e.get("concept"))])
        check_dsl_chain(e.get("solution_template") or [], eid, issues,
                        "DSL_EX")
        if src_alnum:
            for run in gate_runs(e.get("question_pattern", ""),
                                 src_alnum):
                issues.append([name, "COPYRIGHT_Q", eid,
                               run[:70]])
    ex_by_compute = [e for e in data.get("worked_examples") or []
                     if e.get("concept") in compute_ids]
    for cid in compute_ids:
        n = sum(1 for e in ex_by_compute if e.get("concept") == cid)
        if n < 2:
            issues.append([name, "ENRICH_EXAMPLES", "%s:%d" % (cid, n)])

    # ---- exercises ----
    for e in data.get("exercises") or []:
        for qi, q in enumerate(e.get("questions") or []):
            if src_alnum:
                for run in gate_runs(q, src_alnum):
                    issues.append([name, "COPYRIGHT_EX", e.get("id", "?"),
                                   qi, run[:70]])

    # ---- gate ----
    try:
        from backend.tools.bulk_catalog_generator import validate_catalog
        ok, problems = validate_catalog(data, raw or "")
        if not ok:
            for p in problems:
                issues.append([name, "GATE", p[:160]])
    except Exception as exc:
        issues.append([name, "GATE_ERR", str(exc)[:120]])

    info = {"n_concepts": len(concepts),
            "n_compute": len(compute_ids),
            "n_examples": len(data.get("worked_examples") or []),
            "n_exercises": len(data.get("exercises") or [])}
    return issues, info


def main():
    pin = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "pinned_range.txt")
    if os.path.exists(pin):
        my = [l for l in open(pin, encoding="utf-8").read().split() if l]
    else:
        files = sorted(f for f in os.listdir(COMP)
                       if f.startswith("catalog_") and f.endswith(".json"))
        my = files[LO:HI + 1]
    print("files in pinned range: %d" % len(my))
    all_issues = {}
    clean = 0
    for f in my:
        issues, info = audit(os.path.join(COMP, f))
        all_issues[f] = issues
        tag = "CLEAN" if not issues else "ISSUES=%d" % len(issues)
        if not issues:
            clean += 1
        print("%-60s c=%2d k=%2d ex=%2d exr=%2d  %s"
              % (f, info.get("n_concepts", -1), info.get("n_compute", -1),
                 info.get("n_examples", -1), info.get("n_exercises", -1),
                 tag))
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(all_issues, fh, indent=1)
    # severity summary
    sev = {}
    for f, iss in all_issues.items():
        for row in iss:
            sev[row[1]] = sev.get(row[1], 0) + 1
    print("\nTOTAL clean files: %d / %d" % (clean, len(my)))
    for k, v in sorted(sev.items(), key=lambda kv: -kv[1]):
        print("  %-18s %d" % (k, v))
    print("issues dump: %s" % OUT)
    return 0


if __name__ == "__main__":
    sys.exit(main())
