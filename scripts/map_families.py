#!/usr/bin/env python3
"""
Map UNLABELLED maths concepts (question text, no `family`) onto the 53
semantic families that DO exist in the corpus.

WHY THIS EXISTS
---------------
In backend/its/questions/**.json the maths corpus splits into two disjoint halves:

  * 1,438 concepts HAVE a `family` and a symbolic `chain` but NO question text.
  * 2,427 concepts HAVE question text (q/a) but NO `family` and NO chain.

No shared key and no shared content, so a deterministic join is impossible.
This supplies the missing labels using ONLY a hand-authored keyword lexicon
plus a specificity precedence order -- no LLM, no network.

METHOD (deterministic: same input -> same output)
  1. Score every family by keyword hits over ALL of a concept's questions.
     Phrases score 2.0; single words score 1.0.
  2. Pick the highest scorer. On a TIE break by PRECEDENCE: the order of LEX
     below, which runs most-specific -> most-generic. That ordering is what
     resolves `expr_eval` vs `calculus` (limit beats evaluate) and
     `counting_sets` vs `identities` (subsets beat "identity").
  3. If nothing scores, fall back by rule instead of leaving a hole: bare
     arithmetic ("Compute 9 + 6") -> int_ops, else `other_arithmetic`.

HONESTY NOTE
------------
Coverage (every concept labelled) is NOT accuracy. A first pass reached 100%
coverage but only ~55% accuracy because a single `^` keyword outvoted
`calculus`. Use --sample to spot-check before trusting these labels.

Usage:
  python scripts/map_families.py --out scripts/family_map.json
  python scripts/map_families.py --sample 20
"""
from __future__ import annotations

import argparse
import collections
import json
import pathlib
import random
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

# Ordered MOST-SPECIFIC -> MOST-GENERIC. On a score tie, earlier wins.
LEX = {    "hcf_lcm": ["hcf", "lcm", "greatest common", "least common", "coprime",
                "co-prime", "cut into equal pieces", "next ring",
                "ring together", "multiples of"],
    "number_theory_facts": ["fermat", "perfect number", "twin prime",
                            "divisibility", "divisible by", "prime",
                            "digit sum", "alternate digits", "composite",
                            "factors of", "palindrom"],
    "work_rate": ["work together", "complete the work", "days to complete",
                  "tap", "pipe", "fill the tank", "empties",
                  "rate of working", "each day"],
    "solid_counts": ["number of edges", "number of faces", "number of vertices", "polyhedron",
                     "edges does", "faces does", "vertices does", "prism",
                     "pyramid", "how many cubes", "number of cubes", "cuboid",
                     "faces of", "edges of", "vertices of"],
    "solid_round": ["cylinder", "sphere", "cone", "hemisphere", "torus",
                    "curved surface", "conic"],
    "solid_rect": ["cuboid", "rectangular prism", "lateral surface",
                   "total surface area"],
    "probability": ["probability", "randomly", "possible outcomes", "likely"],
    "dispersion": ["variance", "standard deviation", "quartile",
                   "interquartile", "dispersion"],
    "central_tendency": ["mean", "median", "mode", "average"],
    "data_read": ["bar graph", "pie chart", "histogram", "table shows",
                  "graph shows", "frequency table", "frequency distribution"],
    "trig_identities": ["sin2", "cos2", "tan2", "sin^2", "cos^2", "tan^2",
                        "trigonometric identity"],
    "trig_ratios": ["sin", "cos", "tan", "sec", "cosec", "cot",
                    "trigonometric ratio"],
    "principal_values": ["principal value"],
    "angle_pairs": ["complementary", "supplementary",
                    "angles are in the ratio", "sum of angles"],
    "calculus": ["derivative", "integral", "dy/dx", "limit", "differential equation", "integrating factor",
                 "tangent to the curve", "evaluate the limit"],
    "calculus_extra": ["area under", "volume of revolution"],
    "matrices": ["matrix", "determinant", "transpose", "order of matrix"],
    "vectors": ["vector", "magnitude of", "dot product", "cross product"],
    "coord_geom": ["coordinate", "x-axis", "y-axis", "point (", "ordinate"],
    "distance_pl": ["distance formula", "distance between the points", "slope"],
    "quad_facts": ["discriminant", "nature of roots", "vertex of the parabola"],
    "poly_quad": ["polynomial", "quadratic", "roots of", "coefficient"],
    "linear_eq": ["linear equation", "solve for x", "two variables", "linear programming", "feasible region", "corner point", "objective function",
                  "substitution method", "simultaneous"],
    "heron_area": ["heron", "semi-perimeter", "semiperimeter"],
    "circle_area": ["radius", "diameter", "circumference", "circle", "chord",
                    "tangent", "arc", "conic section"],
    "area_quad": ["parallelogram", "trapezium", "quadrilateral", "rhombus"],
    "area_rect": ["rectangle", "length and breadth", "area of the rectangle"],
    "perimeter": ["perimeter", "boundary", "fencing", "outside edge"],
    "ap_gp": ["arithmetic progression", "geometric progression",
              "common difference", "common ratio", "nth term",
              "sum of the ap", "sum of first", "sum of the gp"],
    "updown_sum": ["infinite series", "geometric series", "sum of the series"],
    "interest": ["simple interest", "compound interest", "principal",
                 "interest rate"],
    "index_fin": ["index number", "cost of index"],
    "profit_loss": ["profit", "loss", "cost price", "selling price",
                    "marked price", "discount"],
    "ratio_prop": ["ratio", "proportion", "simplest form", "::"],
    "identities": ["algebraic identity", "a^2 - b^2", "(a+b)(a-b)"],
    "set_relation_facts": ["subset", "superset", "disjoint", "equal sets",
                           "identity relation"],
    "counting_sets": ["subsets", "cardinality", "union", "intersection",
                      "combos", "n(a"],
    "congruence_facts": ["congruent", "congruence", "corresponding", "criterion"],
    "shape_facts": ["polygon", "properties of", "faces and edges", "geometric shapes", "visual proof", "three squares", "architecture of your house",
                    "right-angled triangle", "hypotenuse"],
    "squares": ["square of", "perfect square", "sum of squares", "square root"],
    "cubes": ["cube of", "perfect cube", "sum of cubes", "cube root"],
    "square_roots": ["sqrt", "\u221a", "simplify the radical", "between which"],
    "odd_sum_square": ["sum of squares of", "first n odd"],
    "digit_reversal": ["reverse the digits", "reversed number",
                       "digit reversal"],
    "num_patterns": ["next number in the pattern", "observe the pattern",
                     "find the pattern"],
    "pct_core": ["percentage", "percent"],
    "frac_ops": ["fraction", "numerator", "denominator"],
    "rational_ops": ["rational"],
    "dec_ops": ["decimal", "decimal point"],
    "num_play": ["digits of", "puzzle", "number game"],
    "exp_laws": ["exponent", "power of a power", "product of powers",
                 "exponential", "law a^m"],
    "area_generic": ["area of", "find the area"],
    # --- generic last: these must never outrank anything specific ---
    "int_ops": ["integer", "rounding off", "place value", "add the integers",
                "quick check exercise", "compute "],
    "expr_eval": ["evaluate", "expression", "substitute"],
    "other_arithmetic": [],
}

STOP = {"is", "are", "the", "a", "an", "of", "in", "to", "and", "or", "for",
        "with", "that", "be", "what", "find", "how", "many", "this", "it",
        "at", "on", "by", "from", "as", "its"}
# only ever a LAST RESORT: evaluate appears in most maths questions, so
# expr_eval used to WIN ON SCORE vs exp_laws rather than merely tying it. These
# are excluded from the main contest and used only when NO specific family scored.
GENERIC = {"expr_eval", "int_ops", "area_generic", "other_arithmetic"}

# ── FIX 3: explicit rules that beat the keyword lexicon ────────────────
# These fire before scoring. Each one exists because a keyword-only
# classifier demonstrably got it wrong.
RULES = [
    # "Evaluate 3x + 6 when x = 6" is LINEAR expression evaluation, not a
    # polynomial -- it was landing in poly_quad twice in a 40-row sample.
    (re.compile(r"\bevaluate\b.*\bwhen\s+[a-z]\s*=\s*-?\d+", re.I), "expr_eval"),
    (re.compile(r"\bvalue of the\b.*\bwhen\s+[a-z]\s*=\s*-?\d+", re.I), "expr_eval"),
    (re.compile(r"\bfind the value of\b.*\bat\s+[a-z]\s*=\s*-?\d+", re.I), "expr_eval"),
    # FIX 2: declarative recall ("state the formula/definition/..") is a
    # retrieval question, not a computation. Route the ones that were being
    # dragged into the wrong topic by computational keywords.
    (re.compile(r"\bchain rule\b", re.I), "calculus"),
    (re.compile(r"\bclosure\b", re.I), "closure_props"),
    (re.compile(r"\b(perpendicular bisector|line of symmetry|lines of symmetry|"
                r"compass|geometric definition|geometric instrument)\b", re.I),
     "shape_facts"),
    (re.compile(r"\bstatistical question\b", re.I), "data_read"),
    (re.compile(r"\b(standard unit|unit of volume|cubic centimetre|cubic meter|"
                r"unit of (mass|length|area))\b", re.I), "units_measure"),
    (re.compile(r"\bdefinition of a square\b", re.I), "squares"),
    (re.compile(r"\binverse tangent\b|\btan\s*.\s*1\b", re.I), "principal_values"),
    (re.compile(r"\bsin\s*\(?\s*x\s*\+\s*y", re.I), "trig_identities"),
    (re.compile(r"name the (geometric )?figure|geometric figure represented", re.I), "shape_facts"),
    (re.compile(r"price index|base year value", re.I), "index_fin"),
    (re.compile(r"digits? (of the .* are )?swapped|swapped to make|reversed number", re.I), "digit_reversal"),
    (re.compile(r"ratio of consecutive terms|t_\{r\+1\}|t_\(r\+1\)", re.I), "ap_gp"),
    (re.compile(r"(adding|add) \(-\d+\)|on a number line", re.I), "int_ops"),
    (re.compile(r"lines? of symmetry", re.I), "shape_facts"),
    (re.compile(r"vertically opposite", re.I), "angle_pairs"),
]

# FIX 4: families that were missing entirely.
LEX["closure_props"] = ["closure", "commutative", "associative", "distributive",
                        "identity element", "inverse element"]
LEX["units_measure"] = ["unit", "cubic ", "cubic", "litre", "litre",
                        "gram", "metre", "meter", "kilogram", "standard unit",
                        "unit of", "square unit", "unit of mass"]

# ── FIX 4b: families authored from reading the 100 concepts that had been
# landing in other_arithmetic. Each was a real, coherent topic with no home
# in the 53 corpus families.
LEX["num_system_place"] = ["face value", "place value", "indian number system",
    "rounding a digit", "standard order of columns", "aligning numbers",
    "first comma", "which one is larger", "tally", "roman numeral",
    "hieroglyphic", "digits of a number", "expanded form of a number"]
LEX["integers_ops"] = ["additive inverse", "absolute value", "sign of the product",
    "sign of the quotient", "integer", "natural number", "rule for subtracting",
    "divisibility of integers", "greatest integer"]
LEX["algebra_basics"] = ["like terms", "constant", "variable", "both sides",
    "algebraic form for an even", "algebraic form for an odd",
    "bodmas", "which is an equation", "keep the equation balanced",
    "equivalent to", "terms are separated by"]
LEX["algebraic_identities"] = ["algebraic identities", "(a+b)^2", "(a-b)^2",
    "(a+b)(a-b)", "expanded form of", "difference of two squares"]
LEX["permutations_combinations"] = ["permutation", "combination", "npr", "ncr",
    "taken r at a time", "identical objects", "fundamental principle of counting",
    "multiplication principle", "factorial", "factorial notation"]
LEX["relations_functions"] = ["domain", "codomain", "range of a relation",
    "equivalence relation", "bijective", "injective", "surjective",
    "cartesian product", "composition", "is a function", "one-one"]
LEX["logic_statements"] = ["negation of the statement", "truth value",
    "compound statement", "symbolic form using quantifiers", "negation",
    "conjunction", "disjunction", "implication", "universal quantifier",
    "existential quantifier"]
LEX["number_theory_geometry_ax"] = ["euclid", "axiom", "angle sum property",
    "triangle inequality theorem", "exterior angle theorem", "angle sum theorem",
    "opposite side", "linear pair", "alternate interior", "equilateral triangle",
    "right angle in degrees"]
LEX["number_sequences"] = ["next number in the sequence", "number sequence",
    "consecutive numbers", "first four terms of the sequence", "tally system"]
LEX["inequalities"] = ["linear inequality", "transforming an inequality",
    "inequality sign", "graphical representation"]
LEX["exp_laws2"] = ["x^5", "same base", "dividing powers", "multiplying powers"]

PRECEDENCE = {fam: i for i, fam in enumerate(LEX)}
PRECEDENCE.update({f: 900 + i for i, f in enumerate([
    "num_system_place", "integers_ops", "algebra_basics",
    "algebraic_identities", "permutations_combinations",
    "relations_functions", "logic_statements",
    "number_theory_geometry_ax", "number_sequences", "inequalities"])})

ARITH = re.compile(r"^\s*compute\s+[-\d\s+*/x^().]+$", re.IGNORECASE)


_COMMAS = re.compile(r"(?<=\d),(?=\d\d\d\b)")


def norm(text):
    prev = None
    s = text or ""
    while prev != s:
        prev = s
        s = _COMMAS.sub("", s)
    return s


def toks(text):
    return {w for w in re.findall(r"[a-z0-9^]+", norm(text).lower())
            if w not in STOP and len(w) > 1}


def score(text):
    low = norm(text).lower()
    tk = toks(text)
    sc = collections.Counter()
    for fam, kws in LEX.items():
        for k in kws:
            if not k:
                continue
            if " " in k or k.endswith("("):
                if k in low:
                    sc[fam] += 2.0
            elif k in tk:
                sc[fam] += 1.0
    return sc


def classify(questions):
    for q in questions:
        for rx, fam in RULES:
            if rx.search(norm(q)):
                return fam
    sc = collections.Counter()
    for q in questions:
        sc.update(score(q))
    specific = {f: v for f, v in sc.items() if f not in GENERIC}
    if not specific:
        # Nothing specific matched. Contentless arithmetic -> int_ops,
        # else a labelled bucket so coverage stays 100% without guessing.
        if any(ARITH.match(q) for q in questions):
            return "int_ops"
        return "other_arithmetic"
    top = max(specific.values())
    tied = [f for f, v in specific.items() if v == top]
    return min(tied, key=lambda f: PRECEDENCE.get(f, 999))


def iter_concepts(subject_filter):
    root = ROOT / "backend" / "its" / "questions"
    for f in sorted(root.rglob("*.json")):
        if subject_filter and subject_filter not in f.name.lower():
            continue
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        for c in data.get("concepts", []):
            if c.get("family"):
                continue
            qs = [str(q["q"]) for q in (c.get("questions") or []) if q.get("q")]
            if qs:
                yield f, c, qs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--subject", default="math")
    ap.add_argument("--out", default=str(ROOT / "scripts" / "family_map.json"))
    ap.add_argument("--sample", type=int, default=0)
    args = ap.parse_args()

    rows = []
    for f, c, qs in iter_concepts(args.subject):
        rows.append({"id": str(c.get("id", "")), "file": f.name,
                     "family": classify(qs), "nq": len(qs), "q0": qs[0]})
    dist = collections.Counter(r["family"] for r in rows)
    total = len(rows)
    labelled = sum(1 for r in rows if r["family"])
    print("concepts mapped :", total)
    print("coverage        : %.1f%% (%d/%d labelled)" % (
        labelled / max(1, total) * 100, labelled, total))
    print("distinct families used:", len(dist))
    for k, v in dist.most_common(12):
        print("   %-24s%d" % (k, v))
    if args.out:
        pathlib.Path(args.out).write_text(
            json.dumps(rows, indent=1, ensure_ascii=False), encoding="utf-8")
        print("wrote", args.out)
    if args.sample:
        print("--- QUALITY SPOT-CHECK (random %d) ---" % args.sample)
        random.seed(int(__import__("os").environ.get("SEED","11")))
        for r in random.sample(rows, min(args.sample, len(rows))):
            print("  %-22s n=%d <- %s" % (r["family"], r.get("nq", 0), r["q0"][:74]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
