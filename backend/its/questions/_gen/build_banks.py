"""build_banks.py -- generate the question bank for every maths and
applied-maths competency catalog.

Usage:  python build_banks.py [report_only]
"""
from __future__ import annotations

import collections
import glob
import io
import json
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import qbank_lib as L  # noqa
import fam_basic, fam_comm, fam_meas, fam_alg, fam_stat, fam_adv  # noqa
import fam_primary, fam_small  # noqa
import fam_stem  # noqa
import router  # noqa

COMP_DIR = "D:/platform/backend/its/competency"
OUT_DIR = "D:/platform/backend/its/questions/generated"
AUDIT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audit")

# one-line method description per family, used as the first solution
# step action of a converted verify_property concept
STEPS_DESC = {
    "formula_eval": "substitute the given values into the formula",
    "num_patterns": "apply the pattern rule",
    "odd_sum_square": "add the first n odd numbers, whose total is n x n",
    "updown_sum": "add up to the peak and back; the total is peak x peak",
    "squares": "square the given number using the stated square rule",
    "square_roots": "take the square root of the given perfect square",
    "cubes": "cube or un-cube the given number with the cube rules",
    "int_ops": "apply the integer operation sign rules",
    "frac_ops": "combine the fractions with the fraction operation rules",
    "rational_ops": "apply the rational-number operation rules",
    "dec_ops": "line up and combine the decimal values",
    "exp_laws": "apply the exponent law to the given powers",
    "hcf_lcm": "use the prime-factor / HCF-LCM relation for the two numbers",
    "num_play": "apply the number-play rule digit by digit",
    "digit_reversal": "split the number into digits and apply the rule",
    "pct_core": "convert the percentage to a fraction and multiply",
    "profit_loss": "apply the profit, loss, discount or tax relation",
    "interest": "apply the simple or compound interest formula",
    "ratio_prop": "set up the proportion and solve for the unknown part",
    "work_rate": "combine the rates as reciprocals of the times",
    "perimeter": "add the sides with the perimeter formula",
    "area_rect": "apply the area formula base times height",
    "area_quad": "apply the quadrilateral area formula",
    "heron_area": "compute the semi-perimeter, then Heron's product",
    "circle_area": "apply the circle formula with pi = 22/7",
    "solid_rect": "apply the solid's surface area or volume formula",
    "solid_round": "apply the round solid's formula with pi = 22/7",
    "solid_counts": "count the features or use Euler's relation",
    "angle_pairs": "use the angle relation (sum to 90, 180, 360 or equal)",
    "quad_facts": "use the quadrilateral property to compute the value",
    "congruence_facts": "use the congruence condition and angle sums",
    "shape_facts": "recall the count for the shape",
    "expr_eval": "substitute the given values and simplify",
    "linear_eq": "transpose the terms and divide by the coefficient",
    "identities": "expand with the algebraic identity and evaluate",
    "poly_quad": "evaluate the polynomial or use the root relations",
    "ap_gp": "apply the AP/GP term or sum formula",
    "central_tendency": "apply the mean/median/mode definition",
    "dispersion": "apply the dispersion formula to the data",
    "data_read": "read the table or chart with its key",
    "probability": "divide favourable outcomes by total outcomes",
    "counting_sets": "apply the counting rule (product, factorial, 2^n)",
    "set_relation_facts": "count the pairs the relation must contain",
    "index_fin": "apply the financial or index-number formula",
    "coord_geom": "apply the coordinate-geometry formula",
    "distance_pl": "use the point-line distance formula",
    "trig_ratios": "take the ratio of the relevant sides",
    "trig_identities": "substitute into the identity and simplify",
    "matrices": "expand the determinant or matrix product entry",
    "vectors": "combine components with the vector formula",
    "calculus": "apply the calculus rule and evaluate at the point",
    "calculus_extra": "apply the stated calculus definition",
    "number_theory_facts": "verify the number-theory claim numerically",
    "principal_values": "recall the principal branch value",
    "authored": "follow the authored reasoning steps",
}


def catalog_list():
    paths = set(
        glob.glob(os.path.join(COMP_DIR, "catalog_class*_maths_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_applied_maths_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_physics_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_chemistry_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_science_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_biology_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_biotechnology_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_accountancy_*.json"))
        + glob.glob(os.path.join(COMP_DIR, "catalog_class*_economics_*.json")))
    # 'science' glob also catches social/political/computer/home
    # science -- descriptive subjects, not compute catalogs
    _NONSTEM = ("social_science", "political_science",
                "computer_science", "home_science")
    return sorted(p for p in paths
                  if not any(s in p for s in _NONSTEM))


def report_only():
    fam_count = collections.Counter()
    fallback_rows = []
    for path in catalog_list():
        stem = os.path.basename(path)[:-5]
        data = json.load(io.open(path, encoding="utf-8"))
        for c in data.get("concepts", []):
            fam, params = router.route(stem, c)
            fam_count[fam] += 1
            if fam == router.FALLBACK:
                fallback_rows.append((stem, c["id"], c["title"]))
    print("family distribution:")
    for fam, n in fam_count.most_common():
        print("  %-22s %d" % (fam, n))
    print("fallback concepts:", len(fallback_rows))
    for stem, cid, title in fallback_rows:
        print("  %s | %s | %s" % (stem, cid, title))


def make_steps(fam, chain):
    """Turn one raw question chain into solution_steps dicts."""
    desc = STEPS_DESC.get(fam, "apply the method")
    steps = []
    n = len(chain)
    for i, line in enumerate(chain):
        line = str(line).strip()
        val = L.run_chain(chain[:i + 1])[1]
        if "=" in line and "==" not in line and "<" not in line and ">" not in line:
            name, expr = line.split("=", 1)
            action = desc if i == 0 else "carry the chain forward"
            explain = "%s: %s = %s gives %s" % (desc, name.strip(),
                                                expr.strip(), L.fmt_num(val))
        else:
            action = desc if i == 0 else "carry the chain forward"
            explain = "evaluating %s gives %s" % (line, L.fmt_num(val))
        if i == n - 1 and n > 1:
            action = "read off the answer"
        steps.append({"step": i + 1, "action": action,
                      "explain": explain, "compute": line})
    return steps


def build():
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(AUDIT_DIR, exist_ok=True)
    totals = dict(catalogs=0, concepts=0, converted=0, questions=0)
    for path in catalog_list():
        fname = os.path.basename(path)
        stem = fname[:-5]
        data = json.load(io.open(path, encoding="utf-8"))
        entries = []
        audit_concepts = []
        for c in data.get("concepts", []):
            fam, params = router.route(stem, c)
            if fam == router.SKIP:
                continue
            if fam == router.FALLBACK:
                fam = router.EXPR_FAMILY
            fam_fn = L.FAMILIES.get(fam)
            if fam_fn is None:
                raise KeyError("unknown family %r for %s %s" % (fam, stem, c["id"]))
            seed = L.stable_seed(stem + "::" + c["id"])
            try:
                questions, raws = L.collect_questions(fam_fn, c["id"], seed,
                                                      concept=c)
            except AssertionError as exc:
                print("  skip %s (%s): %s" % (stem, c["id"], exc))
                continue
            converted = False
            steps = None
            convertible = fam not in router.NON_NUMERIC_FAMILIES or (
                fam == "authored" and params and params.get("convert"))
            if fam == "formula_eval" and raws:
                # STEM: publish SYMBOLIC steps ('lhs = rhs' -- no baked
                # literals, so the executor's alien-literal guard passes
                # and the step chain binds the question's own numbers
                # via slots).  Multi-equation formulas become sequential
                # compute steps -- real multi-step chains.
                eqs = raws[0].get("eqs") or []
                if not eqs:
                    eqs = [(raws[0].get("lhs") or "",
                            raws[0].get("rhs") or "")]
                steps = [{"step": i + 1,
                          "action": "substitute the given values into "
                                    "the formula",
                          "explain": "%s = %s" % (l.strip(), r.strip()),
                          "compute": "%s = %s" % (l.strip(), r.strip())}
                         for i, (l, r) in enumerate(eqs)]
                converted = True
            elif c.get("solution_type") == "verify_property" and \
                    convertible and raws:
                steps = make_steps(fam, raws[0]["chain"])
                L.run_chain(steps_chain(steps))  # raises if broken
                converted = True
            entry = {
                "id": c["id"],
                "title": c.get("title", ""),
                "converted_to_compute": converted,
            }
            if fam == "formula_eval" and raws:
                # publish the normalizer-safe renamed formula so formula,
                # steps and question labels all use the same varnames
                eqs = raws[0].get("eqs") or []
                if eqs:
                    entry["formula"] = "; ".join(
                        "%s = %s" % (l, r) for l, r in eqs)
                else:
                    entry["formula"] = str(c.get("formula") or "")
            elif c.get("formula"):
                entry["formula"] = c["formula"]
            if c.get("solution_type"):
                entry["solution_type"] = c["solution_type"]
            if fam == "formula_eval":
                entry["solution_type"] = "compute"
            if converted:
                entry["solution_steps"] = steps
            if fam == "formula_eval" and raws:
                # {var}-placeholder pattern -> strict template regex
                # binds natural-phrased questions to named roles
                tpl = next((it.get("tpl") for it in raws
                            if it.get("tpl")), None)
                if tpl:
                    entry["worked_examples"] = [{
                        "concept": c["id"],
                        "question_pattern": tpl}]
            entry["questions"] = questions
            entries.append(entry)
            audit_concepts.append({
                "id": c["id"],
                "family": fam,
                "questions": [{"i": i, "chain": raws[i]["chain"]}
                              for i in range(len(questions))],
                "steps_chain": steps_chain(steps) if steps else [],
            })
            totals["concepts"] += 1
            totals["converted"] += 1 if converted else 0
            totals["questions"] += len(questions)
        # merge with any existing generated file: authored/self-check
        # concepts and text questions from earlier generators are kept --
        # this builder only ADDS compute concepts, never deletes content
        out_path = os.path.join(OUT_DIR, fname)
        if os.path.exists(out_path):
            try:
                old = json.load(io.open(out_path, encoding="utf-8"))
                old_by_id = {c.get("id"): c for c in old.get("concepts", [])}
            except Exception:
                old_by_id = {}
            new_ids = {e["id"] for e in entries}
            for e in entries:
                # regenerated compute concepts replace wholly -- stale
                # question variants (old constants/phrasing) must not
                # survive into the bank
                if e.get("converted_to_compute") and e.get("formula"):
                    continue
                old_c = old_by_id.get(e["id"])
                if old_c:
                    seen_q = {q.get("q") for q in e.get("questions", [])}
                    for oq in (old_c.get("questions") or []):
                        if oq.get("q") not in seen_q:
                            e["questions"].append(oq)
                    if not e.get("questions") and old_c.get("questions"):
                        e["questions"] = old_c["questions"]
            for oid, oc in old_by_id.items():
                if oid not in new_ids:
                    entries.append(oc)
        bank = {"catalog": fname, "concepts": entries}
        with io.open(out_path, "w", encoding="utf-8") as fh:
            json.dump(bank, fh, indent=1, ensure_ascii=False)
        with io.open(os.path.join(AUDIT_DIR, fname), "w", encoding="utf-8") as fh:
            json.dump({"catalog": fname, "concepts": audit_concepts}, fh,
                      indent=1)
        totals["catalogs"] += 1
        print("built %s (%d concepts)" % (fname, len(entries)))
    print(json.dumps(totals))


def steps_chain(steps):
    return [s["compute"] for s in (steps or [])]


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "report_only":
        report_only()
    else:
        build()
