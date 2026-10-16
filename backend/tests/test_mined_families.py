"""test_mined_families.py -- the two mined miss families (BUILD_ORDER
Phase 6 synthesis picks #1 and #3, 2026-10-05):

  1. CIRCLE_LOCUS_CLASS  -- "Determine whether <general-form circle
     equation> represents a real circle, a point circle, or an
     imaginary circle / no real locus."  Deterministic rule: divide
     through by A, complete the square, classify on
     r^2 = g^2 + f^2 - c  (r^2 > 0 real / = 0 point / < 0 imaginary).

  2. FORMULA_PLUGIN  -- "Using the formula <F> from this topic,
     calculate <T> when <V1> = <n1>, ...  Give your answer up to 2
     decimal places if needed."  Deterministic rule: parse F as
     LHS = RHS over the stated assignments (AST-whitelist evaluator),
     plus the P = V x I inversion special case (given any two of
     P, V, I compute the third).

GROUND TRUTH: real bank rows, pulled from
  - the nightly-dump bank cache
    (tests/recompute_lomo_baseline_bank.jsonl, 212,987 rows) -- qids
    cited per case, and
  - runtime_data/ops/sweep2_findings.jsonl rows 819 (02822fc9, app-11
    SOFT_HIT) and 934 (02c99d62, app-11 GUIDED) and 918 (045f1595,
    phy-10 GUIDED, stored key "130") -- the live-bank rows that
    motivated the mining picks.
Stored keys are compared with the SAME contract the sweep uses
(mining_sweep_findings.classify / sweep_full_runner.norm + the
recompute_lomo_harness num_equiv 2% tolerance), so a test pass here
means EXACT_HIT on the sweep, not just "a number came out".

NEGATIVE CASES pin the honest refusals:
  - the cross-subject bank template junk row ("What must you be able
    to do to master this topic?") must NEVER fire either family;
  - claim-evaluation circle asks (key-alignment territory) refuse;
  - an unknown symbol / division by zero / unsupported inversion in
    the formula template refuses instead of guessing.

No docker, no network, no LLM calls.
"""
import os
import re
import sys

sys.path.insert(0, r"D:\platform\deploy")

import pytest  # noqa: E402

from backend.its.solver.modeling_layer import model_problem  # noqa: E402

# --------------------------------------------------------------------------- #
# sweep-parity comparison helpers (mining_sweep_findings.norm /
# sweep_full_runner.norm + recompute_lomo_harness.num_equiv)
# --------------------------------------------------------------------------- #

_FIRST_NUM_RX = re.compile(r"-?\d+(?:\.\d+)?(?:e[+-]?\d+)?", re.I)


def norm(s: str) -> str:
    s = re.sub(r"\s+", " ", (s or "")).strip().lower()
    s = re.sub(r"[\u20b9,]", "", s)
    return s


def first_number(text: str):
    m = _FIRST_NUM_RX.search((text or "").replace(",", ""))
    return float(m.group(0)) if m else None


def num_equiv(a: float, s: float) -> bool:
    """recompute_lomo_harness.num_equiv: 2% or 0.01 absolute."""
    return abs(a - s) <= max(0.01, 0.02 * max(abs(a), abs(s)))


def key_match(served: str, stored_key: str) -> bool:
    """sweep classify() containment + numeric equivalence, exactly."""
    a, s = norm(served), norm(stored_key)
    if not s:
        return False
    if a == s or a in s or s in a:
        return True
    fa, fs = first_number(a), first_number(s)
    return fa is not None and fs is not None and num_equiv(fa, fs)


def _solve(text: str):
    import contextlib
    import io
    from backend.its.solver.answer_pipeline import answer
    buf = io.StringIO()
    with contextlib.redirect_stderr(buf):
        return answer(text)


# --------------------------------------------------------------------------- #
# 1. CIRCLE_LOCUS_CLASS -- ground-truth bank rows
# --------------------------------------------------------------------------- #
# (question, bank key text, centre, r^2 sign, radius, strict_key)
# strict_key=True  -> the stored key is plain text; the served answer must
#                     key_match() it (sweep EXACT_HIT parity).
# strict_key=False -> the stored key embeds LaTeX delimiters/$...$ (the
#                     served answer must never ship raw LaTeX -- slop
#                     gate), so containment is impossible BY DESIGN; the
#                     assertion pins the verdict words + coordinates and
#                     the sweep grades such rows SOFT_HIT (still a
#                     truthful verified answer, never a wrong one).

CIRCLE_ROWS = [
    # sweep2_findings row 934 -- qid 02c99d62 (app 11, GUIDED miss; the
    # stored key verbatim from the findings row, unicode superscripts).
    ("Determine whether the equation 2x\u00b2 + 2y\u00b2 - 8x + 12y + 26 = 0 "
     "represents a real circle, a point circle, or no real locus. "
     "Justify your answer.",
     "Divide by 2: x\u00b2 + y\u00b2 - 4x + 6y + 13 = 0. Here g = -2, "
     "f = 3, c = 13. g\u00b2 + f\u00b2 - c = 4 + 9 - 13 = 0. Since "
     "g\u00b2 + f\u00b2 - c = 0, it represents a point circle (a single "
     "point at (2, -3)).",
     (2, -3), 0, None, True),
    # qid 02822fc9 (app 11, SOFT_HIT) -- same equation, key written with
    # $...$ LaTeX (verbatim prefix from the findings row).
    ("Determine whether the equation x\u00b2 + y\u00b2 - 4x + 6y + 13 = 0 "
     "represents a real circle, a point circle, or no real locus. "
     "Justify your answer.",
     "For $x^2 + y^2 - 4x + 6y + 13 = 0$, we have $g=-2, f=3, c=13$. "
     "Discriminant $g^2+f^2-c = 4+9-13 = 0$. Since radius "
     "$r = \\sqrt{0} = 0$, the circle degenerates to a single point "
     "(2, -3) -- it represents a point circle.",
     (2, -3), 0, None, False),
    # bank cache qid 6034924f (math 11) -- point circle, LaTeX input.
    ("The equation \\(x^2 + y^2 - 4x + 6y + 13 = 0\\) represents a circle. "
     "Determine whether it is a real circle, a point circle, or an "
     "imaginary circle.",
     "Here g = -2, f = 3, c = 13. Compute g^2 + f^2 - c = (-2)^2 + 3^2 "
     "- 13 = 4 + 9 - 13 = 0. Since the value is zero, the radius is "
     "zero, so it is a point circle (a single point at \\((2, -3)\\)).",
     (2, -3), 0, None, False),
    # bank cache qid a67b57cc (math 11) -- the imaginary verdict that the
    # claim row turns on (classification phrasing, not the claim form).
    ("Determine whether the equation x\u00b2 + y\u00b2 + 4x - 6y + 14 = 0 "
     "represents a real circle, a point circle, or an imaginary circle.",
     "radius = sqrt(g^2 + f^2 - c) = sqrt(4 + 9 - 14) = sqrt(-1), which "
     "is imaginary. The equation actually represents an imaginary "
     "circle (no real points satisfy it).",
     (-2, 3), -1, None, True),
    # bank cache qid 9de5e015 (math 11) -- real circle, centre + radius.
    ("Determine whether the equation x\u00b2 + y\u00b2 - 6x + 4y - 12 = 0 "
     "represents a real circle, a point circle, or an imaginary circle. "
     "If it is a real circle, state its centre and radius.",
     "This is a circle with centre (3, -2) and radius 5.",
     (3, -2), 1, 5, True),
    # bank cache qid 075cbaf7 (math 11) -- real circle from the
    # three-point family (the row's own expanded equation).
    ("Determine whether the equation x\u00b2 + y\u00b2 - 22x - 4y + 25 = 0 "
     "represents a real circle, a point circle, or an imaginary circle.",
     "Real circle, centre (11, 2), radius 10.",
     (11, 2), 1, 10, True),
]


@pytest.mark.parametrize("q,key,centre,r2sign,radius,strict", CIRCLE_ROWS)
@pytest.mark.parametrize("via", ["model", "answer"])
def test_circle_locus_ground_truth(q, key, centre, r2sign, radius, strict,
                                   via):
    if via == "model":
        r = model_problem(q)
        assert r.matched, (q, r.note)
        assert r.structure == "CIRCLE_LOCUS_CLASS"
        low = (r.final_answer or "").lower()
        if r2sign > 0:
            assert "real circle" in low and "centre" in low
            assert f"({centre[0]}, {centre[1]})" in r.final_answer
            assert f"radius {radius}" in r.final_answer
        elif r2sign == 0:
            assert "point circle" in low
            assert f"({centre[0]}, {centre[1]})" in r.final_answer
        else:
            assert "imaginary" in low or "no real" in low
        assert r.quantities.get("h") == centre[0]
        assert r.quantities.get("k") == centre[1]
        if strict:
            # sweep-parity: served text must classify as EXACT_HIT
            assert key_match(r.final_answer, key), (r.final_answer, key)
    else:
        res = _solve(q)
        assert res.label.startswith("VERIFIED"), (q, res.label,
                                                  res.refusal_reason)
        if strict:
            assert key_match(res.answer or "", key), (res.answer, key)
        else:
            served = norm(res.answer or "")
            assert "circle" in served and "(2, -3)" in served


def test_circle_locus_point_circle_app_row_exact():
    """The exact mined app-11 GUIDED row must now serve the point-circle
    verdict with the bank's own phrasing (containment in the key)."""
    res = _solve(CIRCLE_ROWS[0][0])
    assert res.label.startswith("VERIFIED")
    served = norm(res.answer or "")
    assert "point circle" in served
    assert "(2, -3)" in served


# --------------------------------------------------------------------------- #
# 2. FORMULA_PLUGIN -- ground-truth bank rows
# --------------------------------------------------------------------------- #
# (question, stored key) -- every row here is a real bank row
# (recompute_lomo_baseline_bank.jsonl; qid cited in the comment).

FORMULA_ROWS = [
    # qid 590ea553 / sweep2 row 918 -- qid 045f1595 (phy 10, GUIDED,
    # stored key "130"): the mining pick #3 example row.
    ("Using the formula P = V\u00d7I from this topic, calculate P when "
     "I = 10, V = 13. Give your answer up to 2 decimal places if needed.",
     "130"),
    # qid 2840495f (phy 10).
    ("Using the formula P = V\u00d7I from this topic, calculate P when "
     "I = 8, V = 25. Give your answer up to 2 decimal places if needed.",
     "200"),
    # qid 4fc6c6a8 (phy 10).
    ("Using the formula I = Q / t from this topic, calculate I when "
     "Q = 7, t = 20. Give your answer up to 2 decimal places if needed.",
     "0.35"),
    # qid d587ae7c (phy 10).
    ("Using the formula V = W/Q from this topic, calculate V when "
     "Q = 8, W = 16. Give your answer up to 2 decimal places if needed.",
     "2"),
    # qid a4eab119 (phy 10).
    ("Using the formula R = V/I from this topic, calculate R when "
     "I = 20, V = 6. Give your answer up to 2 decimal places if needed.",
     "0.3"),
    # qid 97009895 (phy 10).
    ("Using the formula f = R/2 from this topic, calculate f when "
     "R = 15. Give your answer up to 2 decimal places if needed.",
     "7.5"),
    # qid be62cfdc (phy 10).
    ("Using the formula n = c / v from this topic, calculate n when "
     "c = 16, v = 25. Give your answer up to 2 decimal places if needed.",
     "0.64"),
    # qid 01097e5f (phy 10).
    ("Using the formula P = 1/f from this topic, calculate P when "
     "f = 25. Give your answer up to 2 decimal places if needed.",
     "0.04"),
    # math 8 / math 10 sibling rows (same template, other subjects).
    ("Using the formula Mode = 3 \u00d7 Median - 2 \u00d7 Mean from this "
     "topic, calculate Mode when Mean = 18, Median = 2. Give your answer "
     "up to 2 decimal places if needed.",
     "-30"),
    # qid from the phy 11 block (g = GM_E / R_E^2).
    ("Using the formula g = GM_E / R_E^2 from this topic, calculate g "
     "when GM_E = 18, R_E = 10. Give your answer up to 2 decimal places "
     "if needed.",
     "0.18"),
    # physics 8 heating row (H = I^2 x R x t).
    ("Using the formula H = I^2\u00d7R\u00d7t from this topic, calculate H "
     "when I = 20, R = 3, t = 16. Give your answer up to 2 decimal "
     "places if needed.",
     "19200"),
    # physics 8 weight row (W = m x g).
    ("Using the formula W = m \u00d7 g from this topic, calculate W when "
     "g = 2, m = 18. Give your answer up to 2 decimal places if needed.",
     "36"),
    # physics 6 speed row (Speed = Distance / Time).
    ("Using the formula Speed = Distance / Time from this topic, "
     "calculate Speed when Distance = 22, Time = 2. Give your answer up "
     "to 2 decimal places if needed.",
     "11"),
]


@pytest.mark.parametrize("q,key", FORMULA_ROWS)
@pytest.mark.parametrize("via", ["model", "answer"])
def test_formula_plugin_ground_truth(q, key, via):
    if via == "model":
        r = model_problem(q)
        assert r.matched, (q, r.note)
        assert r.structure == "FORMULA_PLUGIN"
        assert r.final_answer == key, (r.final_answer, key)
        assert r.numeric_answer is not None
        assert abs(r.numeric_answer - float(key)) < 1e-9
    else:
        res = _solve(q)
        assert res.label.startswith("VERIFIED"), (q, res.label,
                                                  res.refusal_reason)
        assert key_match(res.answer or "", key), (res.answer, key)
        assert res.numeric is not None
        assert abs(res.numeric - float(key)) < 1e-9


# P = V x I inversion (the brief's "given any two compute the third").
# No bank row uses the inverted ask yet -- these pin the sanctioned rule
# so the direct rows above cannot be the only coverage.

FORMULA_INVERSION_ROWS = [
    ("Using the formula P = V\u00d7I from this topic, calculate I when "
     "P = 60, V = 12. Give your answer up to 2 decimal places if needed.",
     "5"),
    ("Using the formula P = V\u00d7I from this topic, calculate V when "
     "P = 60, I = 10. Give your answer up to 2 decimal places if needed.",
     "6"),
    # inversion with a non-integer quotient keeps the 2-dp convention.
    ("Using the formula P = V\u00d7I from this topic, calculate I when "
     "P = 100, V = 30. Give your answer up to 2 decimal places if needed.",
     "3.33"),
]


@pytest.mark.parametrize("q,key", FORMULA_INVERSION_ROWS)
def test_formula_plugin_pvi_inversion(q, key):
    r = model_problem(q)
    assert r.matched, (q, r.note)
    assert r.structure == "FORMULA_PLUGIN"
    assert r.final_answer == key, (r.final_answer, key)


# --------------------------------------------------------------------------- #
# 3. NEGATIVE tests -- honest refusals, no junk-fire
# --------------------------------------------------------------------------- #

JUNK_ROWS = [
    # the 8042-row cross-subject bank template (mining rank 1 miss) --
    # neither family may fire on it, and the pipeline must stay honest.
    "What must you be able to do to master this topic?",
    # mastery-criteria variants that mention the family keywords.
    "The student can use the formula P = VI in mastery checks; what must "
    "you be able to do to master this topic?",
]


@pytest.mark.parametrize("q", JUNK_ROWS)
@pytest.mark.parametrize("family", ["circle", "formula"])
def test_junk_template_never_fires(q, family):
    fn = (model_problem,)
    r = model_problem(q)
    if family == "circle":
        assert r.structure != "CIRCLE_LOCUS_CLASS" or not r.matched, \
            (q, r.structure, r.note)
    else:
        assert r.structure != "FORMULA_PLUGIN" or not r.matched, \
            (q, r.structure, r.note)


def test_junk_template_pipeline_honest():
    res = _solve("What must you be able to do to master this topic?")
    assert not res.label.startswith("VERIFIED"), (res.label, res.answer)
    assert res.answer is None


def test_circle_claim_shape_refuses():
    """Claim-evaluation asks are key-alignment territory -- the family
    must refuse rather than serve a verdict-shaped answer at a rubric
    key."""
    q = ("A student claims that the equation x\u00b2 + y\u00b2 + 4x - 6y "
         "+ 14 = 0 represents a circle with centre (-2, 3) and radius "
         "14. Evaluate this claim and correct any errors.")
    r = model_problem(q)
    if r.structure == "CIRCLE_LOCUS_CLASS":
        assert not r.matched, (r.final_answer, r.note)


def test_circle_two_equations_refuses():
    q = ("Determine whether the equation x\u00b2 + y\u00b2 - 4x + 6y + 13 "
         "= 0 represents a real circle, a point circle, or no real locus. "
         "The equation x\u00b2 + y\u00b2 + 2x - 2y + 1 = 0 is given too.")
    r = model_problem(q)
    if r.structure == "CIRCLE_LOCUS_CLASS":
        assert not r.matched, (r.final_answer, r.note)


def test_circle_non_circle_equation_refuses():
    """A = B is required for a circle; an ellipse-shaped general form
    must not be classified as one."""
    q = ("Determine whether the equation 2x\u00b2 + 3y\u00b2 - 8x + 12y "
         "+ 26 = 0 represents a real circle, a point circle, or no real "
         "locus.")
    r = model_problem(q)
    if r.structure == "CIRCLE_LOCUS_CLASS":
        assert not r.matched, (r.final_answer, r.note)


def test_formula_unknown_symbol_refuses():
    """A stated value that never appears in the formula (or a formula
    symbol with no stated value) must refuse, not guess."""
    q = ("Using the formula P = V\u00d7I from this topic, calculate P "
         "when I = 10, V = 13, R = 4. Give your answer up to 2 decimal "
         "places if needed.")
    r = model_problem(q)
    if r.structure == "FORMULA_PLUGIN":
        assert not r.matched, (r.final_answer, r.note)


def test_formula_division_by_zero_refuses():
    q = ("Using the formula R = V/I from this topic, calculate R when "
         "I = 0, V = 6. Give your answer up to 2 decimal places if "
         "needed.")
    r = model_problem(q)
    if r.structure == "FORMULA_PLUGIN":
        assert not r.matched, (r.final_answer, r.note)


def test_formula_unsupported_inversion_refuses():
    """Only the P = V x I law carries the sanctioned inversion; inverting
    anything else must refuse honestly."""
    q = ("Using the formula R = V/I from this topic, calculate V when "
         "R = 3, I = 4. Give your answer up to 2 decimal places if "
         "needed.")
    r = model_problem(q)
    if r.structure == "FORMULA_PLUGIN":
        assert not r.matched, (r.final_answer, r.note)


# --------------------------------------------------------------------------- #
# 4. step contract + slop hygiene on the served strings
# --------------------------------------------------------------------------- #

def test_served_strings_slop_clean():
    from backend.its.solver.slop_gate import gate_text
    for q, _key, *_ in CIRCLE_ROWS:
        r = model_problem(q)
        if r.matched:
            clean, _flags = gate_text(r.final_answer or "", "student")
            assert "\\(" not in clean and "\\[" not in clean
            assert "NaN" not in clean
            assert not re.search(r"\d{15}", clean)
    for q, _key in FORMULA_ROWS:
        r = model_problem(q)
        if r.matched:
            clean, _flags = gate_text(r.final_answer or "", "student")
            assert "NaN" not in clean
            assert not re.search(r"\d{15}", clean)


def test_formula_steps_mention_method_and_givens():
    r = model_problem(FORMULA_ROWS[0][0])
    assert r.matched
    joined = " ".join(r.steps).lower()
    assert "p = v" in joined.replace("*", " ").replace("  ", " ") or \
        "formula" in joined
    assert "i = 10" in joined and "v = 13" in joined
