"""Hand-computed CBSE-style COMMERCE/ACCOUNTANCY narrative readers.

One test per question; each question was computed BY HAND before being
encoded, and asserts BOTH the VERIFIED label and the exact numerics
(every expected value must appear in the answer/numeric within 0.02).
The families live in backend/its/solver/commerce_readers.py:

    PARTNERSHIP_SHARE   ratio sharing, capital sharing, capital x time,
                        late-join (after m months)
    GST_CHAIN           CGST/SGST split, bill total, discount-then-GST
                        order, IGST, inverse taxable value
    INSTALMENT_HIRE     cash price vs instalment total (embedded
                        interest), equal-instalment PV
    SUCCESSIVE_DISCOUNT final price, equivalent single discount,
                        better-offer comparison
    INTEREST_NARRATIVE  SI (years/months/days), CI (annual/half-yearly),
                        inverse rate
    RATIO_DIVISION      divide an amount in a given ratio

Plus refusal guards: missing/ambiguous data must stay GUIDED (never a
guessed value).
"""
import os
import re
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))


def _nums(text):
    if text is None:
        return []
    return [float(x.replace(",", "")) for x in
            re.findall(r"\d[\d,]*(?:\.\d+)?", str(text))]


def _assert_verified(expected, question):
    from backend.its.solver.answer_pipeline import answer
    r = answer(question)
    assert r.label == "VERIFIED", (
        f"expected VERIFIED for: {question!r} got {r.label} "
        f"({r.refusal_reason})")
    got = ([r.numeric] if r.numeric is not None else []) + \
        _nums(r.answer)
    for e in expected:
        assert any(abs(g - e) <= 0.02 for g in got), (
            f"expected {e} in answer for: {question!r} got "
            f"{r.answer!r} numeric={r.numeric}")


# --------------------------------------------------------------------------- #
# PARTNERSHIP_SHARE (5)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question,expected", [
    ("A and B are partners sharing profits in the ratio 3:2. The firm "
     "earned a profit of Rs 40,000 during the year. Calculate B's share "
     "of profit.",
     [16000]),                              # B's share only is asked
    ("A and B are partners sharing profits in the ratio 5:3. The firm's "
     "annual profit is Rs 64,000. Find A's share of the profit.",
     [40000]),
    ("A and B are partners with capitals of Rs 60,000 and Rs 40,000. "
     "The firm earned a profit of Rs 25,000 during the year. Find B's "
     "share of profit.",
     [10000]),
    ("A invests Rs 60,000 for 12 months and B invests Rs 40,000 for 9 "
     "months in a business. The business earns a profit of Rs 33,000. "
     "Find A's share of the profit.",
     [22000]),
    ("A starts a business with Rs 72,000. After 4 months B joins with "
     "Rs 48,000. At the end of the year the profit is Rs 52,000. Find "
     "B's share of the profit.",
     [16000]),
    # word-form ratio ("3 to 2" instead of "3:2") -> 40000 x 2/5 = 16000
    ("Riya and Mita share profits in the ratio 3 to 2. The profit is "
     "Rs 40,000. What is Mita's share?",
     [16000]),
])
def test_partnership_share(question, expected):
    _assert_verified(expected, question)


# --------------------------------------------------------------------------- #
# GST_CHAIN (5)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question,expected", [
    # intra-state: GST 7200 splits 3600/3600; invoice 47200
    ("A trader sells goods worth Rs 40,000 within the same state. GST "
     "rate is 18%. Find the amount of CGST and the amount of SGST.",
     [3600, 47200]),
    ("A consultant provides services worth Rs 50,000 within his own "
     "state. GST is charged at 18%. What is the total amount of the "
     "bill?",
     [4500, 59000]),
    # discount first (5000 -> 4500), GST on the DISCOUNTED price: 540
    ("The marked price of an article is Rs 5,000. The shopkeeper allows "
     "a discount of 10% and then charges GST at 12% on the discounted "
     "price. Find the amount of GST to be paid.",
     [540, 5040]),
    # inter-state: IGST = 5400
    ("A trader in Delhi sells goods worth Rs 30,000 to a buyer in "
     "Jaipur. GST rate is 18%. Find the amount of IGST.",
     [5400]),
    # inverse: 11800 / 1.18 = 10000, GST = 1800
    ("The final price of a product including 18% GST is Rs 11,800. "
     "Find its taxable value.",
     [10000, 1800]),
])
def test_gst_chain(question, expected):
    _assert_verified(expected, question)


# --------------------------------------------------------------------------- #
# INSTALMENT_HIRE (5)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question,expected", [
    # total 3600 + 6*3000 = 21600; extra = 21600 - 18000 = 3600
    ("The cash price of a television is Rs 18,000. Under a hire "
     "purchase scheme a customer pays Rs 3,600 as down payment and 6 "
     "monthly instalments of Rs 3,000 each. How much more than the "
     "cash price does the customer pay in total?",
     [3600, 21600]),
    # x/1.1 + x/1.21 = 2100 -> x = 1210
    ("A loan of Rs 2,100 is to be repaid in two equal annual "
     "instalments, interest being compounded annually at 10% per "
     "annum. Find the amount of each instalment.",
     [1210, 320]),
    # total 12000 + 12*2500 = 42000; interest = 42000 - 36000 = 6000
    ("The cash price of a scooter is Rs 36,000. A buyer pays Rs 12,000 "
     "as down payment and 12 monthly instalments of Rs 2,500 each. "
     "Find the total interest charged under the hire purchase scheme.",
     [6000]),
    # total 5000 + 5*2200 = 16000; extra = 1000
    ("A washing machine has a cash price of Rs 15,000. Under an "
     "instalment plan the buyer pays a down payment of Rs 5,000 and 5 "
     "monthly instalments of Rs 2,200 each. How much extra does the "
     "buyer pay compared with the cash price?",
     [1000, 16000]),
    # x/1.1 + x/1.21 = 4200 -> x = 2420 (2200 + 2000)
    ("A loan of Rs 4,200 is to be repaid in two equal annual "
     "instalments, interest being compounded annually at 10% per "
     "annum. Find the amount of each instalment.",
     [2420, 640]),
])
def test_instalment_hire(question, expected):
    _assert_verified(expected, question)


# --------------------------------------------------------------------------- #
# SUCCESSIVE_DISCOUNT (5)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question,expected", [
    # 9000 x 0.8 x 0.9 = 6480
    ("The marked price of a cooler is Rs 9,000. The shopkeeper offers "
     "two successive discounts of 20% and 10%. Find the final price of "
     "the cooler.",
     [6480]),
    # (1 - 0.8 x 0.9) x 100 = 28%
    ("Find the single discount equivalent to two successive discounts "
     "of 20% and 10%.",
     [28]),
    # 2500 x 0.85 x 0.92 = 1955
    ("The list price of a dress is Rs 2,500. It is sold at successive "
     "discounts of 15% and 8%. Find the selling price.",
     [1955]),
    # single 30% beats 15%+15% (27.75% effective)
    ("Which is a better offer for a customer: a single discount of "
     "30%, or two successive discounts of 15% and 15%?",
     [30, 27.75]),
    # 4000 x 0.9 x 0.9 x 0.95 = 3078
    ("The marked price of a clock is Rs 4,000. Successive discounts of "
     "10%, 10% and 5% are allowed. Find the net selling price.",
     [3078]),
])
def test_successive_discount(question, expected):
    _assert_verified(expected, question)


# --------------------------------------------------------------------------- #
# INTEREST_NARRATIVE (5)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question,expected", [
    # days: 9000 x 6 x (146/365) / 100 = 216
    ("Find the simple interest on Rs 9,000 at 6% per annum for 146 "
     "days.",
     [216, 9216]),
    # CI: 8000 x 1.1^2 - 8000 = 1680
    ("Find the compound interest on Rs 8,000 for 2 years at 10% per "
     "annum compounded annually.",
     [1680, 9680]),
    # inverse rate: (6900-6000)/(6000 x 2) x 100 = 7.5%
    ("At what rate percent per annum will a sum of Rs 6,000 amount to "
     "Rs 6,900 in 2 years at simple interest?",
     [7.5]),
    # half-yearly: 10000 x 1.06^2 - 10000 = 1236
    ("Find the compound interest on Rs 10,000 for 1 year at 12% per "
     "annum compounded half-yearly.",
     [1236, 11236]),
    # months: 12000 x 5 x (9/12) / 100 = 450
    ("Find the simple interest on Rs 12,000 at 5% per annum for 9 "
     "months.",
     [450, 12450]),
])
def test_interest_narrative(question, expected):
    _assert_verified(expected, question)


# --------------------------------------------------------------------------- #
# RATIO_DIVISION (5)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question,expected", [
    # 1200 x 3/8 = 450, x 5/8 = 750
    ("Divide Rs 1,200 between A and B in the ratio 3:5.",
     [450, 750]),
    # 910 in 2:3:5 -> 182, 273, 455
    ("Divide Rs 910 among A, B and C in the ratio 2:3:5.",
     [182, 273, 455]),
    # 1540 x 7/11 = 980 (Ravi 560)
    ("A sum of Rs 1,540 is divided between Ravi and Meena in the ratio "
     "4:7. Find Meena's share.",
     [980]),
    # 8400 in 5:2 -> 6000, 2400
    ("Two partners divide a profit of Rs 8,400 in the ratio 5:2. Find "
     "the larger share.",
     [6000, 2400]),
    # 2400 in 7:5 -> 1400, 1000
    ("Divide Rs 2,400 between X and Y in the ratio 7:5. What is X's "
     "share?",
     [1400]),
])
def test_ratio_division(question, expected):
    _assert_verified(expected, question)


# --------------------------------------------------------------------------- #
# Refusal guards: missing or ambiguous data stays GUIDED (never guess)
# --------------------------------------------------------------------------- #

@pytest.mark.parametrize("question", [
    # GST named but no rate stated
    ("A trader sells goods worth Rs 40,000 within the same state. Find "
     "the amount of CGST."),
    # ratio division named but no ratio given
    ("Divide Rs 1,200 between A and B."),
    # instalments stated but cash price never given
    ("A customer pays Rs 3,600 as down payment and 6 monthly "
     "instalments of Rs 3,000 each. How much more than the cash price "
     "does the customer pay?"),
])
def test_missing_data_refuses(question):
    from backend.its.solver.answer_pipeline import GUIDED, answer
    r = answer(question)
    assert r.label == GUIDED
    assert r.answer is None
