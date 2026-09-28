# test_commerce_families.py -- hand-verified textbook-style cases for
# the commerce solver families: commerce_families.py (business
# arithmetic: break-even, contribution, margin of safety, target
# profit, cost-plus, cash projection, working capital, market share,
# retained earnings, operating cycle) and commerce_families2.py (GST
# with inclusive/split modes, partnership shares, current/liquid
# ratio, interest on capital).
#
# Every expected value below was computed by hand from the governing
# formula as taught in the closed-world corpus (c12_comm_isc ch 2/3/8,
# c11_comm_isc ch 6/8, c10_comst_icse ch 2; ISC Commerce/Business
# Studies conventions).  Numeric tolerance 1 percent (or 0.05 abs).
#
# Four gates must ALL pass for exit code 0:
#   1. CASES      -- value + family + answer-substring correctness;
#                    shape rows (ratios) check the x-colon-1 answer text
#   2. IMPOSSIBLE -- impossible business states must gate out entirely
#                    on BOTH dispatchers (no number may ship)
#   3. NEGATIVE   -- other-subject probes (economics PED, accountancy
#                    depreciation, maths percentage, physics, chemistry,
#                    biology) must not match either dispatcher
#   4. CONTRACT   -- every matched result carries the 5-beat steps:
#                    Method, Given, computation, Check, Interpretation;
#                    at least 3 steps and 150 chars.  Violations FAIL.
import sys

sys.path.insert(0, 'D:/platform')
from backend.its.solver.commerce_families import model_commerce_families
from backend.its.solver.commerce_families2 import model_commerce2

# (question, dispatcher, expected_structure, expected_numeric_or_None,
#  expected_answer_substring); expected_numeric None = shape row, only
# the answer text is asserted
CASES = [
    # ---- business arithmetic: break-even (c12_comm_isc_08_009 worked style) ----
    ("A subscription app has fixed costs of Rs 600000 per month. It charges Rs 99 per subscriber and the variable cost is Rs 39 per subscriber. How many subscribers are needed to break even?",
     model_commerce_families, "BEP_UNITS", 10000.0, "10,000 subscribers"),
    ("A startup has fixed costs of Rs 60000. It sells its product at Rs 50 per unit and the variable cost is Rs 30 per unit. Find the break-even point in units.",
     model_commerce_families, "BEP_UNITS", 3000.0, "3,000 units"),
    ("Fixed costs are Rs 60000, the selling price is Rs 50 per unit and the variable cost is Rs 30 per unit. Find the break-even sales in rupees.",
     model_commerce_families, "BEP_SALES", 150000.0, "Rs 150,000"),
    ("Fixed costs are Rs 40000, selling price is Rs 20 per unit and variable cost is Rs 12 per unit. Actual sales are 8000 units. Find the margin of safety.",
     model_commerce_families, "MARGIN_OF_SAFETY", 3000.0, "37.5%"),
    ("A firm sells a product at Rs 80 per unit. The variable cost per unit is Rs 55. Find the contribution per unit and the total contribution on 4000 units.",
     model_commerce_families, "CONTRIBUTION", 25.0, "Rs 100,000"),
    ("Fixed costs are Rs 50000, selling price Rs 40 per unit, variable cost Rs 25 per unit. How many units must be sold to earn a target profit of Rs 30000?",
     model_commerce_families, "TARGET_PROFIT_UNITS", 5333.3333, "5,333"),
    ("A bakery has a variable cost per pack of Rs 30 and monthly fixed costs of Rs 60000 with expected sales of 5000 packs. It wants a 40% markup on total unit cost. Find the selling price per pack.",
     model_commerce_families, "COST_PLUS_PRICE", 58.8, "58.8"),

    # ---- projection / liquidity / market arithmetic ----
    ("A trader starts the month with an opening cash balance of Rs 25000. Cash receipts during the month are Rs 80000 and cash payments are Rs 62000. Find the closing cash balance.",
     model_commerce_families, "CASH_PROJECTION", 43000.0, "Rs 43,000"),
    ("A partnership firm has current assets of Rs 80 lakh and current liabilities of Rs 50 lakh. Compute the working capital.",
     model_commerce_families, "WORKING_CAPITAL", 3000000.0, "Rs 3,000,000"),
    ("From the balance sheet extract, current assets are Rs 26 crore and current liabilities are Rs 9 crore. Compute the working capital.",
     model_commerce_families, "WORKING_CAPITAL", 170000000.0, "Rs 170,000,000"),
    ("A firm sells 12000 units in a market of 60000 units. Find its market share.",
     model_commerce_families, "MARKET_SHARE", 20.0, "20%"),
    ("A company reports a net profit of Rs 40 lakh, opening retained earnings of Rs 1 crore, proposes a dividend of Rs 12 lakh, and transfers 10% of profit to general reserve. Calculate the closing retained earnings.",
     model_commerce_families, "RETAINED_EARNINGS", 12400000.0, "Rs 12,400,000"),
    ("A firm holds inventory for 60 days, collects receivables in 45 days and pays suppliers after 30 days. Find the cash conversion cycle.",
     model_commerce_families, "OPERATING_CYCLE", 75.0, "75 days"),
    ("Receivables are Rs 15 lakh and credit sales are Rs 120 lakh. Find the average collection period.",
     model_commerce_families, "OPERATING_CYCLE", 45.625, "45.62"),

    # ---- GST (c11_comm_isc_06_005 / 06_008 worked style) ----
    ("Goods worth Rs 5000 attract GST at 18%. Find the GST amount and the total invoice value.",
     model_commerce2, "GST", 900.0, "Rs 900"),
    ("A customer in Mumbai orders a laptop worth Rs 12000 as an intra-state sale. GST is 18%. Find CGST and SGST and the invoice total.",
     model_commerce2, "GST", 1080.0, "CGST = Rs 1,080"),
    ("Goods worth Rs 8000 are sold locally. GST at 12% applies. Find the CGST and SGST on the sale.",
     model_commerce2, "GST", 480.0, "Rs 480"),
    ("Goods worth Rs 20000 sold from Gujarat to Tamil Nadu attract GST at 18%. Find the IGST.",
     model_commerce2, "GST", 3600.0, "IGST = Rs 3,600"),
    ("The final price of a phone is Rs 23600 including 18% GST. Find the taxable value and the GST amount.",
     model_commerce2, "GST", 3600.0, "Rs 20,000"),

    # ---- partnership shares ----
    ("A and B are partners sharing profits in the ratio 3:2. The firm total profit is Rs 50000. Find each partner share.",
     model_commerce2, "PARTNERSHIP_SHARE", 30000.0, "Rs 30,000"),
    ("X and Y are partners in a firm. The firm earned a profit of Rs 40000. There is no partnership deed. Find each partner share.",
     model_commerce2, "PARTNERSHIP_SHARE", 20000.0, "Rs 20,000"),
    ("A and B are partners with capitals of Rs 60000 and Rs 40000 who agree to share profits in their capital ratio. The total profit is Rs 25000. Find each share.",
     model_commerce2, "PARTNERSHIP_SHARE", 15000.0, "Rs 15,000"),

    # ---- ratios (answer is an x-colon-1 shape, no bare number) ----
    ("Current assets are Rs 200000 and current liabilities are Rs 100000. Find the current ratio.",
     model_commerce2, "CURRENT_RATIO", None, "2 : 1"),
    ("Liquid assets are Rs 90000 and current liabilities are Rs 60000. Find the liquid ratio.",
     model_commerce2, "CURRENT_RATIO", None, "1.5 : 1"),

    # ---- interest on capital (period-aware) ----
    ("A partner has capital of Rs 100000 and interest on capital is allowed at 6% per annum for 6 months. Find the interest on capital.",
     model_commerce2, "INTEREST_ON_CAPITAL", 3000.0, "Rs 3,000"),
    ("A partner has capital of Rs 200000 and interest on capital is allowed at 9% per annum. Find the interest on capital for the year.",
     model_commerce2, "INTEREST_ON_CAPITAL", 18000.0, "Rs 18,000"),
]

# impossible business states: BOTH dispatchers must refuse to ship a number
IMPOSSIBLE = [
    # variable cost >= price: no contribution, break-even unreachable
    "Fixed costs are Rs 60000, selling price Rs 25 per unit and variable cost Rs 30 per unit. Find the break-even point in units.",
    # negative fixed cost
    "Fixed costs are Rs -5000, selling price Rs 50 per unit and variable cost Rs 30 per unit. Find the break-even point.",
    # market share above 100 percent
    "A firm sells 70000 units in a market of 60000 units. Find its market share.",
    # negative current assets
    "Current assets are Rs -200000 and current liabilities are Rs 100000. Find the current ratio.",
    # 45 percent is not a taught GST slab (slabs top out at 28 percent)
    "Goods worth Rs 5000 attract GST at 45%. Find the GST amount and the total invoice value.",
    # interest rate outside the taught range
    "A partner has capital of Rs 100000 and interest on capital is allowed at 40% per annum. Find the interest on capital.",
    # negative receipts in a cash projection
    "A trader starts the month with an opening cash balance of Rs 25000. Cash receipts during the month are Rs -8000 and cash payments are Rs 62000. Find the closing cash balance.",
    # inclusive-GST price without a taxable-value ask must not fall
    # through to the exclusive branch
    "The final price of a phone is Rs 23600 including 18% GST. Find the amount the customer paid.",
    # a net loss has no net-profit slot: retained-earnings chain refuses
    "A company has opening retained earnings of Rs 2 crore and a net loss of Rs 30 lakh. Calculate the closing retained earnings.",
    # negative markup
    "A bakery wants a markup of -20% on its unit cost of Rs 200. Find the selling price.",
]

# other-subject probes: commerce must stay completely silent on both dispatchers
NEGATIVE = [
    "When the price of a good rises from 10 to 12, the quantity demanded falls from 100 to 80. Find the price elasticity of demand by the percentage method.",
    "Machinery costing Rs 50000 with a salvage value of Rs 5000 is depreciated at 10% per annum on the straight line method. Find the annual depreciation.",
    "Find 15 percent of 240.",
    "Two forces of 5 N and 12 N act at right angles. Find the resultant force.",
    "Balance the chemical equation H2 + O2 -> H2O.",
    "Photosynthesis in the chloroplast produces glucose using light energy.",
    "GDP at market price is 1000, depreciation is 100, net indirect tax is 50 and net factor income from abroad is 20. Find the national income (NNPfc).",
    "Journalise the transaction: bought furniture for cash Rs 5000.",
    "Find the area of a triangle with base 10 cm and height 5 cm.",
    "The net profit of the firm is Rs 40000 and depreciation is Rs 10000. Find cash flow from operating activities.",
    "Total expenditure is 500 and total receipts are 350. Find the budget deficit.",
    "Goodwill is valued at two years purchase of the average profits of the firm.",
    "Differentiate x^2 sin x with respect to x.",
]


def contract_errors(r):
    """STEP CONTRACT: 5 ordered beats, >=3 steps, >=150 chars."""
    st = r.steps or []
    errs = []
    if len(st) < 3:
        errs.append("steps<3")
    if sum(len(s) for s in st) < 150:
        errs.append("chars<150")
    if not st or not st[0].lower().startswith("method"):
        errs.append("beat1-Method-missing")
    if len(st) < 2 or not st[1].lower().startswith("given"):
        errs.append("beat2-Given-missing")
    if not any(s.lower().startswith("check") for s in st):
        errs.append("beat4-Check-missing")
    if not st or not st[-1].lower().startswith("interpretation"):
        errs.append("beat5-Interpretation-missing")
    return errs


def _norm_ans(s):
    return (s or "").lower().replace(",", "")


passed = failed = unmatched = wrongfam = wrongmod = contract_fails = 0
details = []
for text, fn, fam, expected, sub in CASES:
    r = fn(text)
    if not r.matched:
        unmatched += 1
        details.append(("UNMATCHED", text[:70], r.note))
        continue
    if r.structure != fam:
        wrongfam += 1
        details.append(("WRONG-FAM", text[:70],
                        "expected " + fam + ", got " + r.structure))
        continue
    got = r.numeric_answer
    if expected is None:
        ok = True                     # shape row: answer text decides
    else:
        ok = got is not None and abs(got - expected) <= max(
            0.05, abs(expected) * 0.01)
    if not ok:
        failed += 1
        details.append(("WRONG", text[:70],
                        "expected " + str(expected) + ", got " + str(got)))
        continue
    if _norm_ans(sub) not in _norm_ans(r.final_answer):
        failed += 1
        details.append(("BAD-ANSWER", text[:70],
                        "missing " + repr(sub) + " in "
                        + repr(r.final_answer)))
        continue
    cerr = contract_errors(r)
    if cerr:
        contract_fails += 1
        details.append(("CONTRACT", r.structure, cerr, text[:60]))
        continue
    passed += 1

# impossible states AND cross-subject negatives must be silent on BOTH
both = (model_commerce_families, model_commerce2)
imp_ok = 0
imp_details = []
for text in IMPOSSIBLE:
    fired = [d(text).structure for d in both if d(text).matched]
    if not fired:
        imp_ok += 1
    else:
        imp_details.append(("SHIPPED-NUMBER", text[:70], fired))

neg_ok = 0
neg_details = []
for text in NEGATIVE:
    fired = [d(text).structure for d in both if d(text).matched]
    if not fired:
        neg_ok += 1
    else:
        neg_details.append(("FALSE-POSITIVE", text[:70], fired))

total = len(CASES)
print("PASS %d | FAIL %d | UNMATCHED %d | WRONG-FAM %d  (of %d)"
      % (passed, failed, unmatched, wrongfam, total))
for d in details:
    print("  ", d)
print("IMPOSSIBLE-STATE GATES: %d/%d refused on both dispatchers (correct)"
      % (imp_ok, len(IMPOSSIBLE)))
for d in imp_details:
    print("  ", d)
print("NEGATIVE (other-subject) PROBES: %d/%d silent on both dispatchers "
      "(correct)" % (neg_ok, len(NEGATIVE)))
for d in neg_details:
    print("  ", d)
print("STEP CONTRACT: %d/%d matched results carry the 5 beats "
      "(Method/Given/computation/Check/Interpretation, >=3 steps, "
      ">=150 chars)" % (total - contract_fails, total))
sys.exit(0 if (passed == total and imp_ok == len(IMPOSSIBLE)
               and neg_ok == len(NEGATIVE) and contract_fails == 0) else 1)
