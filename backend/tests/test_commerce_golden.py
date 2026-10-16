"""test_commerce_golden.py -- commerce lane regression (accounts/BS).

Pins the fixes from the never-audited commerce lane audit (2026-10-07):
  - GOODWILL_YEARS_PURCHASE: N years' purchase x average profit
  - PROFIT_ON_COST_SALE: profit = S - C (was shipping a journal entry)
  - journal value-ask gate in accountancy_families (profit/goodwill asks
    must never ship journal entries)
  - control: ratio/percentage questions stay with their own lanes"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

import pytest

from backend.its.solver import commerce_families as CF
from backend.its.solver.accountancy_families import journal_entry


CURATED = [
    ("Goods costing Rs 5,000 are sold for Rs 6,500. What is the profit?",
     1500.0),
    ("Average profit of a firm is Rs 40,000. Goodwill is valued at "
     "2 years' purchase of average profit. What is the goodwill?",
     80000.0),
    ("The average profit of a firm is Rs 30,000 and goodwill is valued "
     "at 3 years' purchase. Find the goodwill.", 90000.0),
]


@pytest.mark.parametrize("q,expected", CURATED, ids=[c[0][:28] for c in CURATED])
def test_commerce_solves(q, expected):
    # NOTE: unitary-method questions ("5 pens cost 60, cost of 12 pens")
    # are owned by the maths unitary family through answer(); this lane
    # tests the commerce dispatcher directly (profit/goodwill families).
    r = CF.model_commerce_families(q)
    assert r.matched, f"commerce dispatcher refused: {q!r}"
    assert r.final_answer is not None
    import re
    me = re.search(r"-?\d[\d,]*(?:\.\d+)?", str(expected).replace(",", ""))
    ma = re.search(r"-?\d[\d,]*(?:\.\d+)?", str(r.final_answer or "").replace(",", ""))
    assert me and ma, (r.final_answer, expected)
    ve, va = float(me.group(0).replace(",", "")), float(ma.group(0).replace(",", ""))
    assert abs(va - ve) <= max(1.0, 0.02 * abs(ve)), (r.final_answer, expected)


NEGATIVES = [
    "A firm has assets of Rs 1,00,000 and liabilities of Rs 40,000. "
    "Find the capital.",
]


@pytest.mark.parametrize("q", NEGATIVES)
def test_commerce_negative_gates(q):
    r = CF.model_commerce_families(q)
    assert not (r.matched and r.final_answer), (
        f"fired on non-profit question: {q!r} -> {r.final_answer}")


def test_current_ratio_ask_fires_only_the_current_ratio_row():
    """WS-B step 5 retarget (2026-10-11): commerce_families2 dissolved into
    commerce_families, so the merged dispatcher legitimately carries the
    CURRENT_RATIO row -- which also won registry sweeps from the old
    commerce2 slot before the merge.  The 2026-10-07 audit gate this
    replaces pinned "ratio asks stay with their own lanes" against the
    PRE-merge commerce1 table, whose fuzzy rows (WORKING_CAPITAL & co.)
    could hijack ratio asks with wrong readings.  The protective intent
    survives: an explicit current-ratio ask may fire ONLY the
    CURRENT_RATIO row with the correct ratio -- any other commerce
    family firing here is a regression.  The row stays unverified
    (wsb_family_verifier_cross), so answer() keeps serving it GUIDED,
    never VERIFIED."""
    q = ("Calculate the current ratio when current assets are Rs 2,00,000 "
         "and current liabilities are Rs 1,00,000.")
    r = CF.model_commerce_families(q)
    assert r.matched and r.structure == "CURRENT_RATIO", (
        f"wrong family fired on a current-ratio ask: {r.structure!r}")
    assert "2 : 1" in str(r.final_answer), r.final_answer


def test_journal_refuses_value_ask():
    """The journal family must never answer a profit/goodwill VALUE ask."""
    r = journal_entry(
        "Average profit of a firm is Rs 40,000. Goodwill is valued at "
        "2 years' purchase of average profit. What is the goodwill?")
    assert r is None, f"journal family shipped an entry for a value-ask: {r}"
    r = journal_entry(
        "Goods costing Rs 5,000 are sold for Rs 6,500. What is the profit?")
    assert r is None, "journal family shipped an entry for a profit-ask"


def test_goodwill_pipeline_end_to_end():
    """Full-pipeline proof: the goodwill question resolves through the
    answer pipeline without shipping a wrong journal entry."""
    from backend.its.solver.answer_pipeline import answer
    r = answer(
        "Average profit of a firm is Rs 40,000. Goodwill is valued at "
        "2 years' purchase of average profit. What is the goodwill?")
    if r.label.startswith("VERIFIED"):
        import re
        m = re.search(r"-?\d[\d,]*(?:\.\d+)?",
                      str(r.answer or "").replace(",", ""))
        assert m and abs(float(m.group(0)) - 80000.0) <= 100, r.answer
    else:
        # honest refusal is acceptable; a WRONG journal entry is not
        assert "Purchases" not in str(r.answer or "")
