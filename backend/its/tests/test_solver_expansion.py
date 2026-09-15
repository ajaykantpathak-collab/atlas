"""test_solver_expansion.py -- expanded work-rate/mixture constructors +
theory rubric lane (2026-09 solver coverage batch).

    work-rate : "takes N days to complete", "finishes the work",
                "alone can do it", reverse partner chain, three workers
    mixture   : reverse dilution (water) and enrichment (pure alcohol)
    rubric    : theory-subject marking-point evaluation (MiniLM lane)
"""

from __future__ import annotations

import contextlib
import io

import pytest


def _solve(text: str):
    from backend.its.solver.answer_pipeline import answer
    buf = io.StringIO()
    with contextlib.redirect_stderr(buf):
        return answer(text)


# ------------------------------------------------------------------ #
# work-rate constructor phrasings
# ------------------------------------------------------------------ #

def test_work_takes_days_to_complete():
    r = _solve("A takes 6 days to complete a work. B takes 8 days to "
               "complete the same work. How long will they take "
               "working together?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(1.0 / (1 / 6 + 1 / 8))


def test_work_finishes_phrasing():
    r = _solve("A finishes the work in 6 days and B finishes the work "
               "in 8 days. Working together, how long will they take?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(1.0 / (1 / 6 + 1 / 8))


def test_work_alone_can_do_it_phrasing():
    r = _solve("A alone can do it in 6 days and B alone can do it in "
               "8 days. How long will they take working together?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(1.0 / (1 / 6 + 1 / 8))


def test_work_reverse_partner_alone():
    """Together 12 days, A alone 20 days -> B alone = 1/(1/12 - 1/20)."""
    r = _solve("A and B together can do it in 12 days. A alone can do "
               "it in 20 days. How long will B alone take?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(30.0)
    assert any("1/12" in s for s in r.steps)


def test_work_reverse_partner_without_together_word_in_data():
    r = _solve("A and B can do a work in 12 days. A alone can do it in "
               "20 days. In how many days can B alone do it?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(30.0)


def test_work_reverse_stated_time_read_back():
    """Asking for the worker whose solo time is already stated is
    verified as-is, never recomputed."""
    r = _solve("A and B together can do it in 12 days. A alone can do "
               "it in 20 days. In how many days can A alone do the "
               "work?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(20.0)


def test_work_reverse_underspecified_refuses_honestly():
    r = _solve("A and B together can do it in 12 days. How long will "
               "B alone take?")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None


def test_work_solo_ask_with_full_data_never_gets_combined_answer():
    """Both solo times stated, ask is B alone: the combined-time
    formula must not fire."""
    r = _solve("A can do a work in 12 days and B in 6 days. How long "
               "will B alone take?")
    assert r.label == "GUIDED_PRACTICE"
    assert r.numeric is None


def test_work_three_workers():
    r = _solve("A, B and C can do a work in 6, 8 and 10 days. Working "
               "together, how long will they take to finish it?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(1.0 / (1 / 6 + 1 / 8 + 1 / 10))


def test_work_single_worker_refuses_without_crash():
    """Regression: the refusal once put a string into the audit slot
    and crashed the pipeline at the elapsed_ms setter."""
    r = _solve("A can do a work in 6 days. Working together, how long "
               "will they take?")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None
    assert "two workers" in (r.refusal_reason or "")


# ------------------------------------------------------------------ #
# reverse mixture constructors
# ------------------------------------------------------------------ #

def test_mixture_reverse_water_dilution():
    r = _solve("How much water must be added to 40 litres of a 10% "
               "salt solution to dilute it to 5%?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(40 * (10 - 5) / 5)   # 40 litres
    assert "water" in r.answer


def test_mixture_reverse_pure_alcohol_enrichment():
    r = _solve("How much pure alcohol must be added to 200 litres of "
               "a 20% alcohol solution to make it a 30% solution?")
    assert r.label == "VERIFIED"
    # x = V(Q-P)/(100-Q) = 200*10/70
    assert r.numeric == pytest.approx(200 * (30 - 20) / (100 - 30))
    assert "alcohol" in r.answer


def test_mixture_reverse_impossible_direction_refuses():
    r = _solve("How much water must be added to 40 litres of a 5% "
               "salt solution to dilute it to 10%?")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None


def test_mixture_forward_blend_still_verified():
    r = _solve("Mix 3 litres of a 20% salt solution with 5 litres of "
               "a 40% salt solution. What is the concentration of the "
               "resulting mixture?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(32.5)


# ------------------------------------------------------------------ #
# theory rubric lane
# ------------------------------------------------------------------ #

_RUBRIC_Q = "Explain any three causes of the French Revolution. (3 marks)"
_RUBRIC_POINTS = [
    "The estate system was unequal and only the third estate paid "
    "taxes to the state.",
    "Philosophers like Rousseau spread the ideas of liberty, "
    "equality and fraternity.",
    "Harvest failures and rising bread prices caused food riots and "
    "anger against the king.",
]


def test_theory_rubric_single_point_credit():
    from backend.its.solver.theory_rubric import evaluate_theory_answer
    ans = ("The estate system was unequal; the third estate paid all "
           "the taxes.")
    out = evaluate_theory_answer(_RUBRIC_Q, ans, _RUBRIC_POINTS)
    assert out["tier"] == "RUBRIC_SCORED"
    assert out["covered_count"] == 1
    assert out["total_points"] == 3
    assert len(out["points_missed"]) == 2
    assert out["score"] == pytest.approx(1.0)   # 1/3 * 3 marks
    assert out["matcher"] == "minilm"


def test_theory_rubric_dense_answer_credits_multiple_points():
    from backend.its.solver.theory_rubric import evaluate_theory_answer
    ans = ("Only the third estate paid taxes in an unequal estate "
           "system. Rousseau spread ideas of liberty and equality. "
           "Harvest failures raised bread prices and caused riots "
           "against the king.")
    out = evaluate_theory_answer(_RUBRIC_Q, ans, _RUBRIC_POINTS)
    assert out["tier"] == "RUBRIC_SCORED"
    assert out["covered_count"] >= 2
    assert 0 < out["score"] <= 3.0
    assert out["marks"] == 3.0                  # parsed from question


def test_theory_rubric_marks_default_per_point():
    from backend.its.solver.theory_rubric import evaluate_theory_answer
    out = evaluate_theory_answer(
        "Why do monsoons fail?", "a good answer about nothing in "
        "particular", ["point one about rain", "point two about wind"])
    assert out["marks"] == 2.0                  # 1 per point, no marks tag
    assert out["score"] == 0.0                  # unrelated answer


def test_theory_rubric_empty_answer_zero():
    from backend.its.solver.theory_rubric import evaluate_theory_answer
    out = evaluate_theory_answer(_RUBRIC_Q, "   ", _RUBRIC_POINTS)
    assert out["score"] == 0.0
    assert out["covered_count"] == 0
    assert len(out["points_missed"]) == 3


def test_theory_rubric_offline_lexical_fallback(monkeypatch):
    from backend.its.solver import theory_rubric
    monkeypatch.setattr(theory_rubric, "embed_texts",
                        lambda texts: None)
    out = theory_rubric.evaluate_theory_answer(
        "Describe the role of the third estate. (1 mark)",
        "The third estate paid all the taxes in the unequal estate "
        "system.",
        ["The third estate paid taxes in the estate system."])
    assert out["matcher"] == "lexical"
    assert out["covered_count"] == 1
    assert out["tier"] == "RUBRIC_SCORED"


def test_theory_subject_packs_declared():
    from backend.its.solver.theory_rubric import THEORY_SUBJECTS
    for subject in ("history", "geography", "polity", "biology",
                    "psychology"):
        assert subject in THEORY_SUBJECTS
