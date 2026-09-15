"""Fixer pass for territory staged catalogs.

Current fixes (deterministic, logged):
  1. DSL: a compute field carrying MULTIPLE statements ("a = ..; b = ..")
     is split into successive steps (production safe_eval parses single
     expressions only).  Steps renumbered afterwards.  Parts that still
     fail safe_eval with a mock env have their compute field dropped
     (step remains as an explain-only step).
"""
import json
import math
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _audit_territory import is_territory, STAGING, safe_env, \
    mock_env_for  # noqa: E402

DROP_LOG = []
GEN_LOG = []


def _parses(expr):
    from backend.its.solver.catalog_executor import safe_eval
    env = safe_env()
    env.update(mock_env_for(expr))
    try:
        safe_eval(expr, env)
        return True
    except Exception:
        return False


def split_compute_steps(steps, cid):
    """Split ';'-joined compute statements into successive steps."""
    out = []
    dropped = 0
    for s in steps or []:
        comp = str(s.get("compute") or "").strip()
        if not comp or ";" not in comp:
            out.append(s)
            continue
        parts = [p.strip() for p in comp.split(";") if p.strip()]
        if all(_parses(p.split("=", 1)[1] if "=" in p and
                       not p.strip().startswith("(") else p)
               for p in parts):
            for p in parts:
                ns = dict(s)
                ns["compute"] = p
                out.append(ns)
        else:
            ns = dict(s)
            ns.pop("compute", None)
            out.append(ns)
            dropped += 1
            DROP_LOG.append((cid, comp))
    # renumber
    for i, s in enumerate(out, 1):
        s["step"] = i
    return out, dropped


# ------------------------------------------------------------------ #
# None-field repair: schema requires str fields
# ------------------------------------------------------------------ #

STR_FIELDS = ("title", "definition", "formula", "key_idea", "section",
              "textbook_ref")


def repair_none_fields(concepts):
    n = 0
    for c in concepts:
        for f in STR_FIELDS:
            if c.get(f) is None:
                c[f] = ""
                n += 1
        if c.get("question_patterns") is None:
            c["question_patterns"] = []
            n += 1
        if c.get("solution_steps") is None:
            c["solution_steps"] = []
            n += 1
    return n


# ------------------------------------------------------------------ #
# Deterministic worked-example generation for compute concepts
# ------------------------------------------------------------------ #

def _sample_value(name):
    n = name.lower()
    if "denominator" in n:
        return 4
    if "numerator" in n:
        return 3
    if "rate" in n:
        return 10
    if "month" in n:
        return 6
    if "year" in n or "period" in n:
        return 3
    if "ratio" in n or "fraction" in n or "share" in n:
        return 0.25
    if "price" in n:
        return 200
    if "profit" in n:
        return 5000
    if "capital" in n or "employed" in n or "assets" in n:
        return 50000
    if "liabilit" in n:
        return 20000
    if "sales" in n or "revenue" in n or "output" in n:
        return 8000
    if "cost" in n or "expense" in n or "purchase" in n:
        return 1000
    if "tax" in n or "gst" in n or "duty" in n:
        return 900
    if "interest" in n or "discount" in n or "commission" in n:
        return 750
    if "balance" in n or "amount" in n or "salary" in n or "wage" in n:
        return 25000
    if "quantity" in n or "unit" in n or "number" in n or "count" in n:
        return 120
    if "value" in n or "total" in n or "reserve" in n or "fund" in n:
        return 40000
    return 100


def _run_chain(stmts):
    """Execute binding chain with sample values; return final value or
    None."""
    from backend.its.solver.catalog_executor import safe_eval
    env = safe_env()
    for lhs, rhs in stmts:
        env_local = dict(env)
        env_local.update(mock_env_for(rhs))
        try:
            env[lhs] = safe_eval(rhs, env_local)
        except Exception:
            return None
    return env[stmts[-1][0]]


def generate_example(concept, source_base, seq):
    """Build a worked example from the concept's formula chain with
    sample numbers.  Returns example dict or None."""
    formula = str(concept.get("formula") or "")
    if ";" in formula:
        stmts = []
        for part in formula.split(";"):
            part = part.strip()
            m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", part)
            if not m:
                return None
            stmts.append((m.group(1), m.group(2)))
    else:
        m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                     formula.strip())
        if not m:
            return None
        stmts = [(m.group(1), m.group(2))]
    if not stmts or not _parses(stmts[-1][1]):
        return None

    bound = {lhs for lhs, _ in stmts}
    inputs = []          # (name, value) in first-use order
    seen = set()
    for _, rhs in stmts:
        for name in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs):
            if name in bound or name in seen:
                continue
            if name in ("pi",):
                return None
            seen.add(name)
            inputs.append((name, _sample_value(name)))
    final = _run_chain(stmts)
    if final is None or not math.isfinite(final):
        return None

    var_doc = ", ".join("%s = %s" % (n, v) for n, v in inputs) or \
        "the values stated in each step"
    q = ("Using %s, compute the %s and show the working step by step."
         % (var_doc, stmts[-1][0].replace("_", " ")))
    tmpl = []
    for i, (lhs, rhs) in enumerate(stmts, 1):
        tmpl.append({
            "step": i,
            "action": "compute %s" % lhs.replace("_", " "),
            "explain": "Apply the stated relation to the given figures.",
            "compute": "%s = %s" % (lhs, rhs),
        })
    return {
        "id": "exgen.%s.%d" % (concept.get("id"), seq),
        "source_ref": "worked sample aligned to %s (generated)" %
                      source_base,
        "concept": concept.get("id"),
        "question_type": "compute",
        "question_pattern": q,
        "extracted_variables": {n: str(v) for n, v in inputs},
        "solution_template": tmpl,
    }


def ensure_compute_examples(data, need=2):
    """Top up worked examples so >= `need` reference compute concepts."""
    concepts = data.get("concepts") or []
    compute = [c for c in concepts if c.get("solution_type") == "compute"]
    if not compute:
        return 0
    examples = data.get("worked_examples") or []
    covered = {e.get("concept") for e in examples}
    missing = [c for c in compute if c.get("id") not in covered]
    have = sum(1 for e in examples if e.get("concept") in
               {c["id"] for c in compute})
    source_base = os.path.basename(str(data.get("source_file") or ""))
    made = 0
    while have < need and missing:
        c = missing.pop(0)
        ex = generate_example(c, source_base, made + 1)
        if ex is None:
            GEN_LOG.append(("FAIL", c.get("id"),
                            str(c.get("formula"))[:80]))
            continue
        examples.append(ex)
        made += 1
        have += 1
        GEN_LOG.append(("GEN", c.get("id"), ex["id"]))
    data["worked_examples"] = examples
    return made


# ------------------------------------------------------------------ #
# Wrong-answer flips: definitional/data-fact concepts mis-staged as
# compute.  Compute would return a number for a definitional question
# (e.g. "describe the steps in online trading" -> 3) or teach a
# year-specific share as an invariant law.  Flip to verify_property,
# strip compute fields, restate the formula descriptively, and replace
# numeric-framed patterns.
# ------------------------------------------------------------------ #

FLIPS = {
    "kebs.5.5.1": {
        "formula": "registration -> order placement -> payment -> delivery",
        "patterns": [
            "Describe the steps in online trading in order.",
            "What comes first when a customer buys through the internet: "
            "payment or registration?",
            "Explain the role of registration before an online purchase.",
            "List the stages a buyer completes in an online transaction.",
            "How is payment completed and delivery confirmed in online "
            "trading?",
        ],
    },
    "kebs.110.2": {
        "formula": "producer -> wholesaler (bulk buying) -> retailer "
                   "(small lots)",
        "patterns": [
            "What is wholesale trade and why do wholesalers buy in bulk?",
            "Describe the role of a wholesaler between producer and "
            "retailer.",
            "How do wholesalers assist manufacturers with storage and "
            "risk?",
            "Which services of a wholesaler help small retailers the "
            "most?",
            "State two ways a wholesaler differs from a retailer.",
        ],
    },
    "kebs.110.3": {
        "formula": "producer -> retailer -> consumer (small quantities "
                   "for personal use)",
        "patterns": [
            "Define retailing and state where it sits in the supply "
            "chain.",
            "What services do retailers provide to consumers?",
            "How does a retailer help in distribution of goods?",
            "State two features that distinguish a retailer from a "
            "wholesaler.",
            "Explain why retailers sell in small quantities.",
        ],
    },
    "keec.105.9": {
        "formula": "inland share of India's total fish output is about "
                   "75 percent (chapter data)",
        "patterns": [
            "State the share of inland sources in India's total fish "
            "production.",
            "Which sector dominates fish production in India and by how "
            "much?",
            "Compare inland and marine sources of fish output in India.",
            "Why does inland fishing contribute more than marine "
            "fishing in India?",
            "Recall the percentage of fish output that comes from "
            "inland sources.",
        ],
    },
    "keec.105.12": {
        "formula": "poultry share of India's total livestock is about "
                   "61 percent (chapter data)",
        "patterns": [
            "State the share of poultry in India's total livestock "
            "population.",
            "Which segment is the largest in the livestock sector and "
            "how large?",
            "Compare the poultry share with the rest of the livestock "
            "sector.",
            "Why is poultry called the dominant livestock segment in "
            "India?",
            "Recall the percentage of livestock accounted for by "
            "poultry.",
        ],
    },
}


def apply_flips(concepts):
    n = 0
    for c in concepts:
        flip = FLIPS.get(str(c.get("id")))
        if not flip:
            continue
        c["solution_type"] = "verify_property"
        for s in c.get("solution_steps") or []:
            s.pop("compute", None)
        c["formula"] = flip["formula"]
        c["question_patterns"] = flip["patterns"]
        n += 1
        FLIP_LOG.append(c.get("id"))
    return n


FLIP_LOG = []


def main():
    from backend.its.solver.catalog_executor import safe_eval  # noqa: F401
    files = sorted(f for f in os.listdir(STAGING)
                   if f.endswith(".json") and is_territory(f))
    n_fixed = 0
    for f in files:
        path = os.path.join(STAGING, f)
        try:
            with open(path, encoding="utf-8") as fh:
                data = json.load(fh)
        except Exception as exc:
            print("%-55s SKIP (parse: %s)" % (f, str(exc)[:60]))
            continue
        n = 0
        n += apply_flips(data.get("concepts", []))
        n += repair_none_fields(data.get("concepts", []))
        for c in data.get("concepts", []):
            new_steps, dropped = split_compute_steps(
                c.get("solution_steps"), c.get("id"))
            if new_steps != c.get("solution_steps"):
                c["solution_steps"] = new_steps
                n += 1
        for e in data.get("worked_examples", []):
            tmpl = e.get("solution_template")
            if not isinstance(tmpl, list):
                continue
            new_steps, dropped = split_compute_steps(tmpl, e.get("id"))
            if new_steps != tmpl:
                e["solution_template"] = new_steps
                n += 1
        n += ensure_compute_examples(data)
        if n:
            with open(path, "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=2, ensure_ascii=False)
                fh.write("\n")
        n_fixed += n
        if n:
            print("%-55s fixed %d chains" % (f, n))
    print("TOTAL chains fixed: %d" % n_fixed)
    for kind, cid, detail in GEN_LOG:
        print("  %s [%s]: %s" % (kind, cid, detail[:80]))
    for cid, comp in DROP_LOG:
        print("  DROPPED compute [%s]: %s" % (cid, comp[:90]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
