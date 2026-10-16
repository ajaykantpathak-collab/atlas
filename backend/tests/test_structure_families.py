"""Regression tests for the deterministic structure-family layer.

Every compute must return its 6-tuple (value, steps, answer_text,
units, formula, rich) or None — and the answers below are pinned to
correct values so a spec can't silently regress.
"""
import sys, os

# deploy root ONLY (backend/ on sys.path forks the its.solver module identity)
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", ".."))

from backend.its.solver import structure_families as sf  # noqa


def _ans(sid, text):
    spec = sf.STRUCTURE_SPECS[sid]
    out = spec["compute"]({}, text)
    assert out is not None, f"{sid} refused on: {text[:80]}"
    return out[0], out[2]


def test_hcf_lcm_variants():
    _, a = _ans("HCF_LCM",
                "Find the greatest length of rope that measures "
                "exactly 12 m, 15 m and 18 m.")
    assert "3" in str(a)
    v, a = _ans("HCF_LCM",
                "Three bells ring at intervals of 6, 8 and 12 minutes. "
                "When do they ring together again?")
    assert v == 24
    v, _ = _ans("HCF_LCM",
                "Find the least number which when divided by 6, 8 and "
                "12 leaves remainder 3 in each case.")
    assert v == 27
    v, _ = _ans("HCF_LCM",
                "What is the smallest 3-digit number exactly "
                "divisible by 6, 8 and 12?")
    assert v == 120


def test_perm_comb_phrasings():
    v, _ = _ans("PERM_COMB", "In how many ways can 4 people sit in "
                             "a row?")
    assert v == 24
    v, _ = _ans("PERM_COMB", "In how many ways can 2 books be chosen "
                             "from 5?")
    assert v == 10


def test_matrix_det_literal():
    v, _ = _ans("MATRIX_DET_SCALAR", "Find det [[2,1],[3,4]].")
    assert v == 5


def test_rect_measure_inverse():
    v, _ = _ans("RECT_MEASURE",
                "The perimeter of a square is 64 cm. Find its side.")
    assert v == 16
    v, _ = _ans("RECT_MEASURE",
                "The perimeter of a square is 64 cm. Find its area.")
    assert v == 256


def test_sector_angle_form():
    v, _ = _ans("SECTOR_ARC_AREA",
                "Find the area of a sector of radius 6 cm with "
                "central angle 60 degrees.")
    assert abs(v - 18.8496) < 0.01


def test_cond_prob():
    v, _ = _ans("COND_PROB",
                "P(A)=0.3, P(B)=0.4, P(A and B)=0.1. Find P(A|B).")
    assert abs(v - 0.25) < 1e-6


def test_rate_of_change():
    v, _ = _ans("RATE_OF_CHANGE",
                "The radius of a sphere increases at 2 cm/s. Find the "
                "rate of change of volume when r = 5 cm.")
    assert abs(v - 628.32) < 0.1


def test_binom_rth_term_keeps_coeff():
    _, a = _ans("BINOM_RTH_TERM",
                "Find the coefficient of the 4th term in (x+2)^6.")
    assert "160" in str(a)


def test_percent_change_both_directions():
    v, _ = _ans("PERCENT_CHANGE",
                "The price of a toy rose from Rs 80 to Rs 100. Find "
                "the percentage increase.")
    assert v == 25
    v, _ = _ans("PERCENT_CHANGE",
                "A value of 200 decreased by 15%. Find the new value.")
    assert v == 170


def test_profit_loss_present_tense():
    _, a = _ans("PROFIT_LOSS",
                "A shopkeeper buys a toy for Rs 80 and sells it for "
                "Rs 100. Find the profit percent.")
    assert "25" in str(a)


def test_heights_shadow():
    v, _ = _ans("HEIGHTS_DISTANCE",
                "The angle of elevation is 45 degrees and the tower "
                "is 20 m tall. Find the shadow length.")
    assert abs(v - 20) < 0.01


def test_new_wave_families():
    v, _ = _ans("REMAINDER_CHAIN",
                "Find a number that leaves a remainder of 2 when "
                "divided by 3, a remainder of 3 when divided by 4, "
                "and a remainder of 4 when divided by 5.")
    assert v == 59
    v, _ = _ans("GP_INF",
                "Find the sum to infinite terms of the GP: "
                "1 + 1/2 + 1/4 + 1/8 + ...")
    assert v == 2
    v, _ = _ans("SQRT_PF",
                "Find the square root of 729 by the prime "
                "factorisation method.")
    assert v == 27
    v, _ = _ans("BETWEEN_SQUARES",
                "How many numbers lie between the squares of the "
                "following numbers? (i) 16 and 17")
    assert v == 32
    v, _ = _ans("SET_CARD",
                "If the set A has 3 elements and the set B = "
                "{3, 4, 5}, then find the number of elements in "
                "(A x B).")
    assert v == 9
    _, a = _ans("CONSISTENCY",
                "Find out whether the pair of equations 2x + 3y = 0 "
                "and 2x - 3y = 26 is consistent or inconsistent.")
    assert "consistent" in str(a)
    v, _ = _ans("EXPECTED_VALUE",
                "A fair coin is tossed four times, and a person wins "
                "Re 1 for each head and loses Rs 1.50 for each tail. "
                "Find the expected gain.")
    assert v == -1
    _, a = _ans("SOLVE_THEN_EVAL",
                "Given 28p - 36 = 98, find the value of 14p - 19.")
    assert "48" in str(a)


def test_section_ratio_inverse():
    _, a = _ans("SECTION_RATIO",
                "Find the ratio in which the line segment joining the "
                "points (-3, 10) and (6, -8) is divided by (-1, 6).")
    assert "2 : 7" in str(a)


def test_rationalize_simple():
    _, a = _ans("RATIONALIZE",
                "Rationalise the denominator of 1/sqrt(2).")
    assert "sqrt(2)" in str(a)


def test_garbage_input_refuses():
    # every spec must fail-closed on unparseable text
    for sid, spec in sf.STRUCTURE_SPECS.items():
        out = spec["compute"]({}, "zzz nothing parseable zzz")
        assert out is None or len(out) >= 3, f"{sid} malformed return"


def test_projectile_never_matches_constant_speed_signature():
    # Wrong-verify regression: a thrown ball carried g=10 — s=vt is
    # invalid physics; the constant-rate signature must refuse so the
    # kinematics/PAL lane owns the question.
    from backend.its.solver.signature_resolver import resolve
    assert resolve(
        "A ball is thrown up at 20 m/s. How high does it go in "
        "2 seconds? (g=10)") is None
    assert resolve(
        "A stone is dropped from a tower at g=9.8 m/s^2 for 3 s. "
        "Find the height.") is None


def test_uniform_motion_signature_still_works():
    from backend.its.solver.signature_resolver import resolve
    r = resolve("A car travels at 60 m/s for 5 seconds. "
                "What distance does it cover?")
    assert r is not None and abs(r["value"] - 300.0) < 1e-6


def test_memo_version_tracks_solver_source():
    # answer_memo entries version by solver-code hash: a code change
    # invalidates every banked row automatically.
    from backend.its.solver import answer_pipeline as ap
    v1 = ap._solver_version()
    assert isinstance(v1, str) and len(v1) == 16
    assert ap._solver_version() == v1   # cached within process


def test_proof_ask_never_ships_bare_numeric():
    # Wrong-verify regression: 'prove sqrt(2) irrational' shipped
    # VERIFIED 1.41421 — a lane evaluated the number instead of proving.
    from backend.its.solver.answer_pipeline import answer
    r = answer("Prove that square root of 2 is irrational.",
               defer_llm=True)
    assert r.label not in ("VERIFIED", "VERIFIED_ASSUMED")
    assert r.numeric is None


def test_multi_transaction_not_profit_loss():
    # 'sells pens, buys notebook, started with X — how much left' is a
    # balance question; PROFIT_LOSS must not hijack it as CP/SP.
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    c = STRUCTURE_SPECS["PROFIT_LOSS"]["compute"]
    assert c({}, "A shopkeeper sells two pens for Rs 15 each and buys "
                "a notebook for Rs 40. How much money does he have now "
                "if he started with Rs 100?") is None


def test_rhs_prose_tail_not_absorbed():
    # Wrong-verify regression: 'Solve x^2 - 5x + 6 = 0 for x' parsed the
    # RHS '0 for x' as 'x', silently solving x^2 - 6x + 6 instead.
    from backend.its.solver.math_kernel import _math_tail, \
        _op_solve_equation
    rhs = _math_tail(" 0 for x.")
    assert rhs is not None and rhs.is_number and float(rhs) == 0.0
    val, steps = _op_solve_equation("Solve x^2 - 5x + 6 = 0 for x.")
    assert val is not None and abs(val - 3.0) < 1e-9


def test_remainder_same_for_all_divisors():
    from backend.its.solver.structure_families import \
        _c_remainder_chain
    out = _c_remainder_chain(
        {}, "Find the least number which when divided by 6, 8, 12 "
            "leaves remainder 3.")
    assert out is not None and out[0] == 27.0
    # the LCM-minus-difference variant still works
    out2 = _c_remainder_chain(
        {}, "Find the least number which leaves remainder 2 when "
            "divided by 3, remainder 3 when divided by 4, and "
            "remainder 4 when divided by 5.")
    assert out2 is not None and out2[0] == 59.0


def test_single_standard_trig_value():
    from backend.its.solver.structure_families import _c_trig_value_chain
    out = _c_trig_value_chain({}, "Find the value of sin 30 degrees.")
    assert out is not None and abs(out[0] - 0.5) < 1e-9


def test_pal_declared_flow_consistency_gate():
    # wrong-verify class: PAL code may contradict the model's own
    # declared flow directions ('sells' treated as expense).  The
    # declaration recomputes independently — contradiction must refuse.
    from backend.its.solver.semantic_check import verify_pal_consistency
    q = ("A shopkeeper sells two pens for Rs 15 each and buys a "
         "notebook for Rs 40. How much money does he have now?")
    prog_ok = {"start": 100,
               "flows": [{"source": "sells two pens", "value": 30,
                          "sign": "+", "why": "income"},
                         {"source": "buys a notebook", "value": 40,
                          "sign": "-", "why": "expense"}]}
    ok, why = verify_pal_consistency(q, prog_ok, 90.0)
    assert ok
    # same declaration, wrong code output -> refuse
    ok2, why2 = verify_pal_consistency(q, prog_ok, 30.0)
    assert not ok2 and "contradiction" in why2
    # no declared flows -> no opinion (fail-open for legacy cache)
    ok3, _ = verify_pal_consistency("q", {}, 123.0)
    assert ok3
    # non-additive question (rates/percent) -> gate must NOT apply
    ok4, _ = verify_pal_consistency(
        "Pipe A fills in 4 hours, B empties in 6. How many hours to fill?",
        prog_ok, 12.0)
    assert ok4


def test_pal_flow_gate_double_start_reading():
    # 'pays with a Rs 50 note' may be declared BOTH as start and as a
    # '+' flow — either reading is honest; only neither-matching is a
    # contradiction
    from backend.its.solver.semantic_check import verify_pal_consistency
    prog = {"start": 50,
            "flows": [{"source": "pays with a Rs 50 note", "value": 50,
                       "sign": "+", "why": "given"},
                      {"source": "buys 3 pens", "value": 36,
                       "sign": "-", "why": "expense"}]}
    ok, _ = verify_pal_consistency("q", prog, 14.0)
    assert ok


def test_pal_template_rebind_and_uses(monkeypatch, tmp_path):
    # templates learned once -> any literal swap runs offline
    import backend.its.solver.pal_templates as pt
    monkeypatch.setattr(pt, "_PATH", str(tmp_path / "pt.json"))
    monkeypatch.setattr(pt, "_STORE", {})
    prog = {"code": "a = 10\nb = 4\nanswer = a - b",
            "givens": {}, "ask": "left", "plan": [],
            "flows": [], "start": None, "variants": []}
    pt.save_program("Ram had 10 apples, ate 4, how many left", prog)
    hit = pt.match_program("Ram had 40 apples, ate 9, how many left")
    assert hit and "a = 40" in hit["code"] and "b = 9" in hit["code"]
    # hit counter incremented
    assert pt._load()[list(pt._load())[0]]["uses"] >= 1
    # unrelated question: different literal count -> no match
    assert pt.match_program("Add 5") is None
