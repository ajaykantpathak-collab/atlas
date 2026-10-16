"""test_economics_families.py -- hand-verified textbook-style cases for
economics_families.py (classes 9-12 economics solver families).

Every expected value below was computed by hand from the governing
equation (NCERT class 12 macro/micro conventions; ICSE c9/c10 corpus
conventions for class 9-10 topics).  Numeric tolerance 1% (or 0.05 abs).

Four gates must ALL pass for exit code 0:
  1. CASES        -- value + family + answer-substring correctness
  2. IMPOSSIBLE   -- impossible-economy states must gate out (no number)
  3. NEGATIVE     -- other-subject probes must not match any econ family
  4. STEP CONTRACT-- every matched result carries the 5-beat steps output:
       beat 1 "Method:" (identity/law + why it applies), beat 2 "Given:"
       (figures restated with units), beat 3 computation, beat 4 "Check:"
       (verification / identity closes), beat 5 "Interpretation:" in
       context; minimum 3 steps and 150 chars.  Any violation FAILS.
"""
import sys

sys.path.insert(0, 'D:/platform')
from backend.its.solver.economics_families import model_economics_families

# (question, expected_numeric_or_None, expect_structure, expected_answer_sub)
CASES = [
    # ---- micro: demand / supply (class 9 price puzzle; class 10 ch 2; class 12 micro ch 5) ----
    ("The demand function of a good is Qd = 100 - 5P and the supply function is Qs = 40 + 5P. Find the equilibrium price and quantity.",
     6.0, "MARKET_EQUILIBRIUM", "70"),
    ("Qd = 120 - 4P and Qs = 30 + 6P. Calculate the equilibrium price.",
     9.0, "MARKET_EQUILIBRIUM", "84"),
    ("The demand and supply functions are Qd = 100 - 5P and Qs = 40 + 5P. Find the excess demand at price 4.",
     20.0, "EXCESS_DEMAND_SUPPLY", "excess demand"),
    ("Given Qd = 100 - 5P, find the quantity demanded when the price is 6.",
     70.0, "DEMAND_Q_AT_P", "70"),
    ("The demand function is Qd = 100 - 5P. At what price will the quantity demanded be 60 units?",
     8.0, "DEMAND_P_FOR_Q", "8"),
    ("At a price of 10, firm A supplies 50 units and firm B supplies 70 units. Find the market supply at this price.",
     120.0, "MARKET_SUPPLY_SUM", "120"),
    ("Qd = 100 - 5P and Qs = 40 + 5P. The government imposes a price ceiling at 4. Find the shortage.",
     20.0, "PRICE_CEILING_FLOOR", "shortage"),
    ("Qd = 120 - 4P and Qs = 30 + 6P. The government fixes a price floor at 12. Find the surplus.",
     30.0, "PRICE_CEILING_FLOOR", "surplus"),

    # ---- micro: elasticity (class 10 ch 2; class 12 micro ch 2) ----
    ("When the price of a good rises from 10 to 12, the quantity demanded falls from 100 to 80. Find the price elasticity of demand by the percentage method.",
     -1.0, "PED_PERCENTAGE", "unitary"),
    ("The price elasticity of demand is 2. If the price falls by 5%, find the percentage change in quantity demanded.",
     10.0, "PED_PERCENTAGE", "10%"),
    ("The price elasticity of demand is 0.5. The quantity demanded falls by 4%. Find the percentage change in price.",
     8.0, "PED_PERCENTAGE", "8%"),
    ("When price is 10 the consumer buys 100 units and the total outlay is 1000. When the price rises to 12 the quantity is 90 units. Using the total outlay method find the elasticity of demand.",
     80.0, "PED_TOTAL_OUTLAY", "inelastic"),
    ("A consumer spends 1000 when price is 10. When price rises to 12 her total outlay is 1080. Use the total outlay method.",
     80.0, "PED_TOTAL_OUTLAY", "inelastic"),
    ("The demand function is Qd = 120 - 4P. Find the price elasticity of demand at price 20.",
     2.0, "PED_POINT_LINEAR", "elastic"),
    ("The marginal utility of good X is 20, the price of X is 4, the marginal utility of good Y is 30 and the price of Y is 5. Is the consumer in equilibrium?",
     1.0, "CONSUMER_EQUIB_RATIO", "NOT in equilibrium"),
    ("At consumers equilibrium the marginal utility of good X is 20, the price of X is 4 and the marginal utility of good Y is 30. Find the price of Y.",
     6.0, "CONSUMER_EQUIB_RATIO", "Py = 6"),

    # ---- micro: production, costs, revenue (class 12 micro ch 3-4, leec203/204) ----
    ("The total product rises from 100 to 118 units when labour rises from 5 to 6 units. Find the marginal product.",
     18.0, "TP_AP_MP_SCHEDULE", "18"),
    ("The total product is 500 units with 10 units of labour. Find the average product.",
     50.0, "TP_AP_MP_SCHEDULE", "50"),
    ("For a firm the total fixed cost is 20 and the total variable cost at 3 units of output is 45. Find TC, AC, AVC and AFC.",
     65.0, "COST_SCHEDULE_ANY", "21.6667"),
    ("The total cost rises from 100 to 118 when output rises from 10 to 12 units. Find the marginal cost.",
     9.0, "COST_SCHEDULE_ANY", "Marginal cost = Rs 9"),
    ("A firm sells 50 units at a price of 10. Find total revenue, average revenue and marginal revenue.",
     500.0, "REVENUE_CURVES_ANY", "AR = MR = Rs 10"),
    ("Total revenue is 900 at an output of 60 units. Find the average revenue.",
     15.0, "REVENUE_CURVES_ANY", "15"),
    ("Total revenue rises from 200 to 230 when sales rise from 40 to 46 units. Find marginal revenue.",
     5.0, "REVENUE_CURVES_ANY", "5"),

    # ---- macro: national income (class 12 macro ch 2) ----
    ("In an economy consumption expenditure is 500, investment is 200, government spending is 150, exports are 50 and imports are 80. Find GDP.",
     820.0, "GDP_EXPENDITURE_ANY_MISSING", "820"),
    ("GDP of an economy is 820. Consumption is 500, investment is 200, government expenditure is 150 and imports are 80. Find exports.",
     50.0, "GDP_EXPENDITURE_ANY_MISSING", "Exports"),
    ("GDP at market price is 1000, depreciation is 100, net indirect tax is 50 and net factor income from abroad is 20. Find the national income (NNPfc).",
     870.0, "NNPFC_CONVERSION", "870"),
    ("The value of output of a firm is 500 and its intermediate consumption is 300. Find the value added.",
     200.0, "VALUE_ADDED_CHAIN", "200"),
    ("A farmer sells wheat to the miller for 100, the miller sells flour to the baker for 150 and the baker sells bread to consumers for 250. Find the total value added.",
     250.0, "VALUE_ADDED_CHAIN", "250"),
    ("Using the income method find national income: compensation of employees 1000, rent 200, interest 150 and profit 250.",
     1600.0, "INCOME_METHOD_NI", "1600"),
    ("Nominal GDP is 2200 and real GDP is 2000. Find the GDP deflator.",
     110.0, "GDP_DEFLATOR", "110"),
    ("Nominal GDP is 2200 and the GDP deflator is 110. Find real GDP.",
     2000.0, "GDP_DEFLATOR", "2000"),
    ("Real GDP of a country is 2000 million and its population is 50 million. Find the per capita real GDP and use it to comment on welfare.",
     40.0, "GDP_WELFARE_PERCAPITA", "40"),
    ("GDP grows by 6% while population grows by 2%. Find the growth in per capita GDP.",
     3.9215686, "GDP_WELFARE_PERCAPITA", "3.9216"),

    # ---- macro: money and prices (class 10 ch 5; class 12 macro ch 3) ----
    ("The CPI was 120 in 2020 and rose to 132 in 2021. Find the inflation rate.",
     10.0, "CPI_INFLATION_RATE", "10%"),
    ("The cost of the basket in the base year is 1500 and in the current year 1800. Find the consumer price index.",
     120.0, "CPI_INFLATION_RATE", "120"),
    ("If the nominal interest rate is 10% and inflation is 4%, find the real interest rate (Fisher equation).",
     6.0, "FISHER_REAL_RATE", "6%"),
    ("The reserve ratio is 10%. Find the money multiplier.",
     10.0, "MONEY_MULTIPLIER", "10"),
    ("The reserve ratio is 10% and initial deposits are 1000. Find the money multiplier and total credit created.",
     10.0, "MONEY_MULTIPLIER", "9000"),
    ("Initial deposit is 1000 and the reserve ratio is 20%. Find the total deposit creation and credit created.",
     5000.0, "DEPOSIT_CREATION_CHAIN", "4000"),

    # ---- macro: income determination (class 12 macro ch 4) ----
    ("The consumption function is C = 40 + 0.8Y. Find consumption when income is 500.",
     440.0, "CONSUMPTION_FUNCTION_ANY", "440"),
    ("Given C = 40 + 0.8Y and consumption is 440, find the level of income.",
     500.0, "CONSUMPTION_FUNCTION_ANY", "500"),
    ("The consumption function is C = 40 + 0.8Y and investment is 50. Find the equilibrium income.",
     450.0, "CONSUMPTION_FUNCTION_ANY", "450"),
    ("If MPC is 0.8, find the investment multiplier and the change in income when investment rises by 100.",
     500.0, "INVESTMENT_MULTIPLIER", "500"),
    ("If MPS is 0.25, find the investment multiplier.",
     4.0, "INVESTMENT_MULTIPLIER", "4"),
    ("Income is 5000 and consumption is 4000. Find APC and APS.",
     0.8, "APC_APS_IDENTITIES", "0.8"),

    # ---- macro: government and external sector (class 12 macro ch 5-6) ----
    ("Revenue expenditure is 500, revenue receipts are 350, capital expenditure is 200, capital receipts are 150 and interest payments are 100. Find the revenue deficit, fiscal deficit and primary deficit.",
     150.0, "BUDGET_DEFICITS_ANY", "Primary deficit = Rs 100"),
    ("The exchange rate changed from Rs 70 to Rs 75 per dollar. Find the percentage change and state whether the rupee depreciated or appreciated.",
     7.142857, "EXCHANGE_RATE_CHANGE", "DEPRECIATED"),
    ("A country has visible exports of 500, visible imports of 400, invisible exports of 120 and invisible imports of 150. Find the balance of payments on current account and classify the items.",
     70.0, "BOP_CLASSIFY_ANY", "surplus"),
    ("Visible exports are 500 and visible imports are 620. Find the balance of payments on current account.",
     -120.0, "BOP_CLASSIFY_ANY", "deficit"),

    # ---- class 9/11: labour market and poverty ----
    ("In an economy 900 people are employed and 100 are unemployed. Find the unemployment rate.",
     10.0, "UNEMPLOYMENT_RATES", "10%"),
    ("Of a working-age population of 2000, the labour force is 1000 with 100 unemployed. Find the unemployment rate and participation rate.",
     10.0, "UNEMPLOYMENT_RATES", "50%"),
    ("In a village of 1000 people, 300 are below the poverty line. Find the headcount ratio.",
     30.0, "HEADCOUNT_RATIO", "30%"),

    # ---- statistics: index numbers + correlation (class 11 stats) ----
    ("Base year prices are 4, 6, 10 and current year prices are 5, 8, 12. Calculate the price index by the simple aggregative method.",
     125.0, "INDEX_AGGREGATIVE", "125"),
    ("Prices in 2010 are 4, 6, 10 and in 2020 are 5, 8, 12; quantities in 2010 are 10, 5, 8. Calculate the Laspeyres price index.",
     124.0, "INDEX_LASPEYRES", "124"),
    ("Prices in 2010 are 4, 6, 10 and in 2020 are 5, 8, 12; quantities in 2020 are 12, 6, 9. Calculate the Paasche price index.",
     124.137931, "INDEX_PAASCHES", "124.1379"),
    ("Find the Karl Pearson correlation coefficient for the pairs (1,2) (2,4) (3,5) (4,4) (5,5).",
     0.7745966, "CORRELATION_COEFFICIENT", "0.7746"),
    ("Compute the correlation coefficient: X: 10, 12, 14, 16, 18 and Y: 40, 42, 44, 42, 46.",
     0.8320502, "CORRELATION_COEFFICIENT", "0.8321"),

    # ---- ISC numeric (cisce-solver-commerce 2026-09-30) ----
    # PRICE_CONTROL_GAP: quantities STATED at the controlled price
    ("The government fixes the MSP of wheat at Rs 22 per kg. At this price the quantity supplied is 130 lakh tonnes and the quantity demanded is 80 lakh tonnes. Find the surplus or shortage. The equilibrium price is Rs 18.",
     50.0, "PRICE_CONTROL_GAP", "surplus (excess supply) of 50 units"),
    ("The government imposes a price ceiling of Rs 8 per unit. At Rs 8 the quantity demanded is 150 units and the quantity supplied is 100 units. The equilibrium price is Rs 10. Find the shortage and state whether the ceiling is binding.",
     50.0, "PRICE_CONTROL_GAP", "at the ceiling price of Rs 8 (Qs 100 vs Qd 150) -- binding"),
    ("A price floor of Rs 8 per kg is fixed for sugarcane. At Rs 8 the quantity supplied is 60 quintals and the quantity demanded is 90 quintals. The equilibrium price is Rs 10 per kg. Find the gap and state whether the floor is binding.",
     30.0, "PRICE_CONTROL_GAP", "not binding"),
    # MPC_DELTA: MPC from a change (+ APC at both levels)
    ("As disposable income rises from Rs 1000 crores to Rs 1200 crores, consumption rises from Rs 800 crores to Rs 950 crores. Calculate the MPC and the APC at both levels of income.",
     0.75, "MPC_DELTA", "MPC = 0.75"),
    ("When income rises from Rs 500 lakh to Rs 700 lakh, consumption rises from Rs 420 lakh to Rs 560 lakh. Find the marginal propensity to consume.",
     0.7, "MPC_DELTA", "0.7"),
    ("National income increases from Rs 2000 crores to Rs 2600 crores and consumption increases from Rs 1600 crores to Rs 2050 crores. Calculate MPC and APC at both levels.",
     0.75, "MPC_DELTA", "at Rs 2600 = 0.7885"),
    # MU_FROM_TU: marginal utility from a total-utility schedule
    ("A consumer derives the following total utilities from eating gulab jamuns: 1st = 30 utils, 2nd = 55 utils, 3rd = 75 utils, 4th = 90 utils, 5th = 100 utils. Calculate the marginal utility of each jamun.",
     100.0, "MU_FROM_TU", "diminishing MU sets in from the 2nd unit"),
    ("The total utility from successive units of a good is: 1st unit = 10 utils, 2nd unit = 18 utils, 3rd unit = 24 utils and 4th unit = 28 utils. Derive the marginal utility schedule.",
     28.0, "MU_FROM_TU", "10 8 6 4 utils"),
    ("The total utility of a consumer is 20 utils from the 1st ice cream, 45 utils from the 2nd and 75 utils from the 3rd. Find the marginal utilities.",
     75.0, "MU_FROM_TU", "Marginal utilities: 20 25 30 utils"),
]

# questions that must NOT ship a number (impossible-economy states gate out)
IMPOSSIBLE = [
    ("If MPC is 1.2, find the investment multiplier.", None),
    ("The reserve ratio is 0%. Find the money multiplier.", None),
    ("The demand function is Qd = 50 - 5P and supply is Qs = 80 + 5P. Find the equilibrium price and quantity.", None),
    ("The total fixed cost is 20 and the total variable cost is -5. Find the total cost.", None),
    ("Find the correlation coefficient for X: 5, 5, 5 and Y: 1, 2, 3.", None),
    ("A country has visible exports of -100 and visible imports of 50. Find the balance of payments.", None),
    ("At consumers equilibrium the marginal utility of good X is -10, the price of X is 2 and the marginal utility of good Y is 20. Find the price of Y.", None),
    # ISC numeric wave gates (cisce-solver-commerce 2026-09-30)
    ("Income rises from Rs 1000 to Rs 1100 and consumption rises from Rs 800 to Rs 1000. Calculate the MPC.", None),
    ("At the price ceiling of Rs 6 the quantity demanded is 100 and the quantity supplied is 100. Find the shortage.", None),
    ("The government sets a price ceiling of Rs 0. At this price quantity demanded is 200 and quantity supplied is 50. Find the shortage.", None),
    ("The total utility schedule of a consumer is: 2nd unit = 30 utils, 3rd unit = 55 utils. Find the marginal utility of each unit.", None),
]

# other-subject probes: economics families must stay silent (no match at all)
NEGATIVE = [
    "Balance the chemical equation H2 + O2 -> H2O.",
    "A bank current account pays 3% interest on deposits.",
    "Find the EMI for a loan of Rs 100000 at 9% per annum for 3 years.",
    "Find the area of a triangle with base 10 cm and height 5 cm.",
    "Two forces of 5 N and 12 N act at right angles. Find the resultant force.",
    "Journalise the transaction: bought furniture for cash Rs 5000.",
    "Find the mean of the data 2, 4, 6, 8.",
    "The equilibrium constant Kc for the reaction is 4. Find Kc at 300 K.",
    "Photosynthesis in the chloroplast produces glucose.",
    "Differentiate x^2 sin x with respect to x.",
    "The elasticity of supply of a good is 0.8. The price rises by 10%. Find the percentage change in quantity supplied.",
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


passed = failed = unmatched = wrongfam = contract_fails = 0
details = []
for text, expected, fam, sub in CASES:
    r = model_economics_families(text)
    if not r.matched:
        unmatched += 1
        details.append(("UNMATCHED", text[:70]))
        continue
    if r.structure != fam:
        wrongfam += 1
        details.append(("WRONG-FAM", text[:70],
                        f"expected {fam}, got {r.structure}"))
        continue
    got = r.numeric_answer
    if expected is None:
        ok = got is not None
    else:
        ok = got is not None and abs(got - expected) <= max(0.05, abs(expected) * 0.01)
    if not ok:
        failed += 1
        details.append(("WRONG", text[:70], f"expected {expected}, got {got}"))
        continue
    if sub.lower() not in (r.final_answer or "").lower().replace(",", ""):
        failed += 1
        details.append(("BAD-ANSWER", text[:70],
                        f"missing '{sub}' in '{r.final_answer}'"))
        continue
    cerr = contract_errors(r)
    if cerr:
        contract_fails += 1
        details.append(("CONTRACT", r.structure, cerr, text[:60]))
        continue
    passed += 1

imp_ok = 0
imp_details = []
for text, _ in IMPOSSIBLE:
    r = model_economics_families(text)
    if not r.matched:
        imp_ok += 1
    else:
        imp_details.append(("SHIPPED-NUMBER", text[:70],
                            f"{r.structure}: {r.numeric_answer}"))

neg_ok = 0
neg_details = []
for text in NEGATIVE:
    r = model_economics_families(text)
    if not r.matched:
        neg_ok += 1
    else:
        neg_details.append(("FALSE-POSITIVE", text[:70],
                            f"fired {r.structure}: {r.numeric_answer}"))

total = len(CASES)
print(f"PASS {passed} | FAIL {failed} | UNMATCHED {unmatched} | "
      f"WRONG-FAM {wrongfam}  (of {total})")
for d in details:
    print("  ", d)
print(f"IMPOSSIBLE-STATE GATES: {imp_ok}/{len(IMPOSSIBLE)} refused (correct)")
for d in imp_details:
    print("  ", d)
print(f"NEGATIVE (other-subject) PROBES: {neg_ok}/{len(NEGATIVE)} silent "
      "(correct)")
for d in neg_details:
    print("  ", d)
print(f"STEP CONTRACT: {total - contract_fails}/{total} matched results carry "
      "the 5 beats (Method/Given/computation/Check/Interpretation, >=3 "
      "steps, >=150 chars)")
sys.exit(0 if (passed == total and imp_ok == len(IMPOSSIBLE)
               and neg_ok == len(NEGATIVE) and contract_fails == 0) else 1)
