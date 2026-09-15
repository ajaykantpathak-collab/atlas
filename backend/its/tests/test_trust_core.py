"""test_trust_core.py -- the Leak Suite.

Every leak from the threat model (ARCHITECTURE.md 17 + 2026-09 session)
as a permanent adversarial test.  If any of these fail, answers are
not trustworthy -- do not ship.
"""

from __future__ import annotations

import io
import contextlib

import pytest


def _solve(text: str):
    from backend.its.solver.answer_pipeline import answer
    buf = io.StringIO()
    with contextlib.redirect_stderr(buf):
        return answer(text)


# --------------------------------------------------------------------------- #
# L1: kernel regex misfires (the y=0 family)
# --------------------------------------------------------------------------- #

def test_l1_where_idiom_linear_system():
    r = _solve("x+y = 30 where y is -6 wats the value of x")
    assert r.label == "VERIFIED" and r.numeric == pytest.approx(36)


def test_l1_given_never_solved_as_unknown():
    r = _solve("Find the area of a circle of radius 7 cm. Use pi = 22/7.")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(154, abs=0.1)   # not 3.1429!


# --------------------------------------------------------------------------- #
# L2: wrong-model polarity (shrinking band)
# --------------------------------------------------------------------------- #

def test_l2_shrinking_band_never_gets_growing_answer():
    r = _solve("An ant crawls at 1 cm/s along a rubber band which is "
               "initially 1 km long and is being uniformly SHRUNK by a "
               "farmer at 1 km/s. Does the ant ever reach the other end?")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None


def test_l2_growing_band_still_verified():
    r = _solve("An ant starts crawling from one end of a rubber band at "
               "1 cm/s. The rubber band is initially 1 km long and is "
               "being stretched uniformly at 1 km/s. Will the ant ever "
               "reach the other end?")
    assert r.label == "VERIFIED"


# --------------------------------------------------------------------------- #
# L3: the label invariant -- unverified tiers never carry answers
# --------------------------------------------------------------------------- #

CASES_NO_ANSWER = [
    "The zorblaxian flux gate problem with no canonical structure",
    "Explain the causes of the French Revolution",
    "What is the meaning of life, the universe and everything else here?",
]


@pytest.mark.parametrize("text", CASES_NO_ANSWER)
def test_l3_guided_never_carries_answer(text):
    r = _solve(text)
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None and r.numeric is None
    assert r.audit.lane in ("A", "B", "C")


# --------------------------------------------------------------------------- #
# Classifier sanity: lanes route deterministically
# --------------------------------------------------------------------------- #

def test_classifier_routes_formal_to_a():
    from backend.its.solver.answer_pipeline import classify
    assert classify("Solve for x: 2x + 6 = 20") == "A"
    assert classify("Evaluate 2^5.") == "A"


def test_classifier_routes_narrative_to_b():
    from backend.its.solver.answer_pipeline import classify
    assert classify("Ramesh buys 120 mangoes at 5 rupees each. He sells "
                    "them at 8 rupees each. Find his profit.") == "B"


# --------------------------------------------------------------------------- #
# Audit trail present and populated on every result
# --------------------------------------------------------------------------- #

def test_audit_trail_always_present():
    for text in ("Solve for x: 2x + 6 = 20",
                 "Ramesh buys 120 mangoes at 5 rupees each. He sells them "
                 "at 8 rupees each. Find his profit.",
                 "The zorblaxian problem again"):
        r = _solve(text)
        d = r.audit.to_dict()
        assert d["lane"] in ("A", "B", "C", "B>A")
        assert "gates_passed" in d and "elapsed_ms" in d


# --------------------------------------------------------------------------- #
# Speed contract: warm formal solves stay fast
# --------------------------------------------------------------------------- #

def test_warm_formal_solve_under_3s():
    import time
    _solve("Solve for x: 2x + 2 = 6")          # warm
    t0 = time.time()
    r = _solve("Solve for x: 5x + 3 = 28")
    assert time.time() - t0 < 3.0
    assert r.numeric == pytest.approx(5)


# --------------------------------------------------------------------------- #
# Lane B: competency event-chain reader (trading narratives)
# --------------------------------------------------------------------------- #

def test_lane_b_trading_chain_with_spoilage():
    r = _solve("Ramesh buys 120 mangoes at 5 rupees each. 15 of them "
               "rot. He sells the rest at 8 rupees each. How much "
               "profit does he make?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(240)      # 840 revenue - 600 cost
    assert any("rot" in s or "damaged" in s or "remain" in s
               for s in r.steps)


def test_lane_b_zero_profit_edge():
    r = _solve("A shopkeeper buys 50 pens at 12 rupees each. 10 of them "
               "are damaged. He sells the rest at 15 rupees each. Find "
               "his profit.")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(0)


def test_lane_b_sold_all_variant():
    r = _solve("Sita bought 30 books at 40 rupees each. She sold all "
               "of them at 55 rupees each. What is her profit?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(450)


# --------------------------------------------------------------------------- #
# L4/H1: figure-carried data must not be reconstructed (anchor leak find)
# --------------------------------------------------------------------------- #

def test_h1_figure_reference_downgrades_to_guided():
    r = _solve("If the voltmeter in the given circuit reads 8 V, what "
               "is the resistance of the voltmeter?")
    assert r.label == "GUIDED_PRACTICE"
    assert r.answer is None
    assert "figure" in " ".join(r.audit.assumptions)


# --------------------------------------------------------------------------- #
# Lane B chemistry: dilution chain on the REAL bank question (OCR damage)
# --------------------------------------------------------------------------- #

def test_lane_b_chemistry_dilution_real_bank_item():
    r = _solve("In a chemistry laboratory, a student has 0.01 L of 10-2 "
               "mol dm-3 sulphuric acid solution. The lab assistant "
               "asked the student to reduce its concentration to "
               "2 x 10- 4 mol dm-3 by adding water into it. What should "
               "be the volume of the water added?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(0.49, abs=0.001)
    assert "490" in r.answer


def test_classifier_chemistry_routes_to_b():
    from backend.its.solver.answer_pipeline import classify
    t = ("0.01 L of 10-2 mol dm-3 acid solution, reduce concentration "
         "to 2 x 10- 4 mol dm-3 by adding water")
    assert classify(t) == "B"


def test_no_backspace_corruption_in_solver_sources():
    """The invisible-corruption guard: heredoc patches once wrote chr(8)
    into regex \b sequences, silently zeroing whole families."""
    import glob
    for path in glob.glob(r"D:\platform\backend\its\solver\*.py"):
        raw = open(path, encoding="utf-8").read()
        assert chr(8) not in raw, f"backspace corruption in {path}"


# --------------------------------------------------------------------------- #
# Lane B batch: work-rate and mixture chains
# --------------------------------------------------------------------------- #

def test_lane_b_work_together():
    r = _solve("A can do a work in 6 days and B can do the same work in "
               "8 days. Working together, how long will they take to "
               "finish the work?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(3.43, abs=0.02)


def test_lane_b_mixture_blend():
    r = _solve("Mix 3 litres of a 20% salt solution with 5 litres of a "
               "40% salt solution. What is the concentration of the "
               "resulting mixture?")
    assert r.label == "VERIFIED"
    assert r.numeric == pytest.approx(32.5)


def test_lane_b_reader_chain_falls_through():
    """A work question without the together-ask must fall through to
    the next reader, not die in the first reader's refusal gate."""
    r = _solve("Mix 3 litres of a 20% salt solution with 5 litres of a "
               "40% salt solution. What is the concentration of the "
               "resulting mixture?")
    assert r.label == "VERIFIED"   # mixture reader reached, not work's


# --------------------------------------------------------------------------- #
# Adoption engine: external-ground-truth validation tiers + drift
# --------------------------------------------------------------------------- #

def test_adoption_tier_official_key_wins():
    from backend.its.solver.adoption import adopt
    # a real keyed item's text from the bank -> canonical tier
    import sqlite3
    conn = sqlite3.connect(r"D:\platform\cbse_data\question_bank.db")
    row = conn.execute(
        """SELECT q.text, o.answer_text FROM official_answers o
           JOIN questions q ON q.doc_id=o.doc_id AND q.qno=o.qno
           WHERE q.text LIKE '%capacitor%' LIMIT 1""").fetchone()
    conn.close()
    if row is None:
        pytest.skip("no keyed capacitor item")
    out = adopt({"kind": "test", "question_text": row[0],
                 "proposed_answer": None,
                 "claim_terms": ["capacitor"]})
    assert out["tier"] in ("CANONICAL", "PROVISIONAL")
    assert any("official key" in e for e in out["evidence"])


def test_adoption_unverifiable_goes_to_queue():
    from backend.its.solver.adoption import adopt
    out = adopt({"kind": "test", "question_text":
                 "The zorblaxian gate has no external anchor anywhere",
                 "claim_terms": ["zorblaxian"]})
    assert out["tier"] == "QUEUE"


def test_drift_monitor_tracks_and_tightens():
    import time
    from pathlib import Path as _P
    from backend.its.solver.adoption import DriftMonitor
    tmp = _P(r"D:\platform\cbse_data") / "_test_drift.json"
    mon = DriftMonitor(tmp)
    mon.state["n_sampled"] = 100
    mon.state["n_errors"] = 5          # 5% > 2% threshold
    entry = mon.record(pytest_stub_verdict())
    assert entry.get("tightened") is True
    assert mon.state["threshold"] > 0.62
    tmp.unlink(missing_ok=True)


def pytest_stub_verdict():
    from backend.its.solver.adoption import AdoptionVerdict
    return AdoptionVerdict(artifact={}, tier="QUEUE")


# --------------------------------------------------------------------------- #
# L3: Lane A registry sweep (formal-looking questions that belong to a
# family the kernel does not cover) + its polarity mirror
# --------------------------------------------------------------------------- #

def test_l3_lane_a_sweep_reaches_family():
    r = _solve("Solve 5x - 3 > 3x - 5")
    assert r.label == "VERIFIED"
    assert "x >" in (r.answer or "")


def test_l3_lane_a_sweep_bracket_form():
    r = _solve("Solve: 3(x - 1) <= 2(x - 3)")
    assert r.label == "VERIFIED"
    assert "x <=" in (r.answer or "")


def test_l3_lane_a_sweep_polarity_still_guarded():
    # growing-domain answer must not leak through the new Lane A sweep
    r = _solve("The rope length reduces by 10 percent every minute. "
               "The ant walks 1 cm per minute. Find the time to fall off.")
    assert r.label == "GUIDED_PRACTICE"
    assert r.numeric is None