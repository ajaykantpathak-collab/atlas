"""test_accountancy_families.py -- hand-verified textbook cases for
accountancy_families.py (model_accountancy_families).

Every expected figure below is computed by hand from the standard
formulas (NCERT Financial Accounting I/II, Partnership Accounts,
Company Accounts) and each matched result is additionally asserted
against the SOLVER_STEP_CONTRACT 5-beat shape: method/rule line, given
figures, computation, verification, interpretation -- at least 3 steps
and 150 characters total.  A thin family is a RED test, not an opinion.

Run: python D:/platform/_cisce_build/test_accountancy_families.py
"""

import re
import sys
sys.path.insert(0, 'D:/platform')
from backend.its.solver.accountancy_families import model_accountancy_families


def close(a, b, tol=0.05):
    return a is not None and abs(a - b) <= max(tol, abs(b) * 0.005)


def entry_has(r, *frags):
    txt = (r.final_answer or "")
    return all(f.lower() in txt.lower() for f in frags)


# ---------------- STEP CONTRACT assertions (5 beats) ---------------- #
_METHOD_BEAT = re.compile(
    r"\b(method|rule|law|formula|identity|ratio|golden|equation|principle"
    r"|accounting)\b", re.I)
_VERIFY_BEAT = re.compile(
    r"\b(substitut\w*|check\w*|verif\w*|sanity|recomput\w*|tally\w*|"
    r"cross-?check|balance[sd]?|back\b)\b", re.I)
_BEAT_TAGS = ["[Method]", "[Given]", "[Check]", "[Interpretation]"]


def contract_errors(r):
    """Return a list of STEP-CONTRACT violations for a matched result
    (empty list = compliant)."""
    errs = []
    steps = [s for s in (r.steps or []) if s and s.strip()]
    joined = " ".join(steps)
    if len(steps) < 3:
        errs.append(f"steps={len(steps)} < 3")
    if len(joined) < 150:
        errs.append(f"chars={len(joined)} < 150")
    if steps and not _METHOD_BEAT.search(steps[0]):
        errs.append("no method beat in step 1")
    if not _VERIFY_BEAT.search(joined):
        errs.append("no verification beat")
    idx = [joined.find(t) for t in _BEAT_TAGS]
    if all(i >= 0 for i in idx) and idx != sorted(idx):
        errs.append(f"beats out of order: {idx}")
    return errs


# (case_id, question, checker) -- checker(result) -> (ok, detail)
CASES = [
    # ---------------- journal entries (golden rules) ----------------
    ("journal_cash_purchase",
     "Journalise the transaction: Bought goods for cash Rs 50,000",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Purchases", "Cash", "50,000"),
                f"ans={r.final_answer!r}")),
    ("journal_credit_purchase",
     "Pass journal entry: Bought machinery on credit from Ram for Rs 80,000",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Machinery") and entry_has(r, "Ram")
                and entry_has(r, "80,000"),
                f"ans={r.final_answer!r}")),
    ("journal_cash_sale",
     "Journal entry for: Sold goods for cash Rs 30,000",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Cash") and entry_has(r, "Sales")
                and "30,000" in (r.final_answer or ""),
                f"ans={r.final_answer!r}")),
    ("journal_wages_paid",
     "Record the transaction: Paid wages Rs 5,000 in cash",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Wages") and entry_has(r, "Cash"),
                f"ans={r.final_answer!r}")),
    ("journal_drawings",
     "Journal entry: Withdrew cash Rs 10,000 for personal use",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Drawings") and entry_has(r, "Cash"),
                f"ans={r.final_answer!r}")),
    ("journal_capital_intro",
     "Journalise: Commenced business with cash Rs 2,00,000",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Cash") and entry_has(r, "Capital"),
                f"ans={r.final_answer!r}")),
    ("journal_bank_deposit",
     "Pass journal entry: Deposited cash into bank Rs 40,000",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Bank") and entry_has(r, "Cash"),
                f"ans={r.final_answer!r}")),
    ("journal_rent_paid",
     "Journalise the transaction: Paid rent Rs 12,000 by cheque",
     lambda r: (r.matched and r.structure == "JOURNAL_ENTRY"
                and entry_has(r, "Rent") and entry_has(r, "Bank"),
                f"ans={r.final_answer!r}")),

    # ---------------- depreciation ----------------
    ("slm_annual",
     "A machine costing Rs 100,000 has a salvage value of Rs 10,000 and a "
     "useful life of 5 years. Find the annual depreciation (straight line).",
     lambda r: (r.matched and r.structure == "DEP_SLM" and close(
         r.numeric_answer, 18000.0),      # (100000-10000)/5
                f"got {r.numeric_answer}")),
    ("slm_book_value_after_3",
     "A plant costing Rs 200,000 with scrap value Rs 20,000 is depreciated "
     "by the straight line method over 6 years. Find its book value after "
     "3 years.",
     lambda r: (r.matched and r.structure == "DEP_SLM" and close(
         r.numeric_answer, 110000.0),     # 200000 - 3x30000
                f"got {r.numeric_answer}")),
    ("slm_find_life",
     "A machinery of cost Rs 90,000 and salvage Rs 10,000 is depreciated "
     "at Rs 16,000 per year under straight line. Find the useful life in "
     "years.",
     lambda r: (r.matched and r.structure == "DEP_SLM" and close(
         r.numeric_answer, 5.0),          # 80000/16000
                f"got {r.numeric_answer}")),
    ("slm_rate_variant",
     "A machine costing Rs 100,000 has salvage value of Rs 10,000 and a life of 5 years. Find the annual depreciation",
     lambda r: (r.matched and r.structure == "DEP_SLM" and close(
         r.numeric_answer, 18000.0), f"got {r.numeric_answer}")),
    ("wdv_value_after_3",
     "Machinery costing Rs 1,00,000 is depreciated at 10% per annum on "
     "written down value method. Find the book value after 3 years.",
     lambda r: (r.matched and r.structure == "DEP_WDV" and close(
         r.numeric_answer, 72900.0),      # 100000 x 0.9^3
                f"got {r.numeric_answer}")),
    ("wdv_schedule_steps",
     "A vehicle costing Rs 500,000 is depreciated at 20% reducing balance. "
     "Prepare the depreciation schedule and give the value after 2 years.",
     lambda r: (r.matched and r.structure == "DEP_WDV" and close(
         r.numeric_answer, 320000.0)      # 500000 x 0.8^2
                and any("Year 1" in s for s in r.steps),
                f"got {r.numeric_answer}")),

    # ---------------- final accounts ----------------
    ("gross_profit",
     "Sales Rs 500,000, sales returns Rs 20,000, opening stock Rs 50,000, "
     "purchases Rs 300,000, return outwards Rs 10,000, carriage inwards "
     "Rs 10,000, closing stock Rs 80,000. Find the gross profit.",
     lambda r: (r.matched and r.structure == "GROSS_PROFIT" and close(
         r.numeric_answer, 210000.0),     # 480000 - (50000+290000+10000-80000)
                f"got {r.numeric_answer}")),
    ("gross_profit_simple",
     "Sales Rs 500,000, opening stock Rs 50,000, purchases Rs 300,000, "
     "closing stock Rs 80,000, carriage inwards Rs 10,000. Find gross profit",
     lambda r: (r.matched and r.structure == "GROSS_PROFIT" and close(
         r.numeric_answer, 220000.0),     # 500000-280000
                f"got {r.numeric_answer}")),
    ("net_profit",
     "Gross profit Rs 220,000. Salaries Rs 40,000, rent Rs 24,000, "
     "advertising Rs 6,000, depreciation Rs 10,000; commission received "
     "Rs 8,000. Find the net profit.",
     lambda r: (r.matched and r.structure == "NET_PROFIT" and close(
         r.numeric_answer, 148000.0),     # 220000-80000+8000
                f"got {r.numeric_answer}")),
    ("trial_balance_diff",
     "The trial balance shows a debit total of Rs 85,400 and a credit "
     "total of Rs 85,000. By how much does it differ? Suspense?",
     lambda r: (r.matched and r.structure == "TRIAL_BALANCE_DIFF" and close(
         r.numeric_answer, 400.0) and "credit" in r.final_answer.lower(),
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("bs_missing_capital",
     "Total assets Rs 900,000 and total liabilities Rs 350,000. Find the "
     "capital for the balance sheet to balance.",
     lambda r: (r.matched and r.structure == "BALANCE_SHEET_MISSING" and
                close(r.numeric_answer, 550000.0),   # 900000-350000
                f"got {r.numeric_answer}")),
    ("bs_missing_assets",
     "A firm has capital Rs 600,000 and liabilities Rs 150,000. Find total "
     "assets in the balance sheet.",
     lambda r: (r.matched and r.structure == "BALANCE_SHEET_MISSING" and
                close(r.numeric_answer, 750000.0),   # 600000+150000
                f"got {r.numeric_answer}")),
    ("bs_check_balanced",
     "Balance sheet check: total assets Rs 900,000, total liabilities "
     "Rs 350,000, capital Rs 550,000. Does it balance?",
     lambda r: (r.matched and r.structure == "BALANCE_SHEET_MISSING" and
                close(r.numeric_answer, 0.0) and "balance" in
                r.final_answer.lower(), f"got {r.numeric_answer}, "
                f"{r.final_answer!r}")),

    # ---------------- BRS ----------------
    ("brs_cb_to_pb",
     "Debit balance as per cash book Rs 25,000. Cheques issued but not "
     "presented for payment Rs 5,000; bank charges Rs 200; interest "
     "credited by bank Rs 500. Prepare a bank reconciliation statement.",
     lambda r: (r.matched and r.structure == "BRS_ADJUST" and close(
         r.numeric_answer, 30300.0),      # 25000+5000-200+500
                f"got {r.numeric_answer}")),
    ("brs_pb_to_cb",
     "Balance as per pass book is Rs 18,000 (favourable). Cheques "
     "deposited but not yet credited Rs 6,000; cheques issued but not yet "
     "presented Rs 4,000; insurance premium paid by bank Rs 1,000. Prepare "
     "the bank reconciliation statement starting from the pass book.",
     lambda r: (r.matched and r.structure == "BRS_ADJUST" and close(
         r.numeric_answer, 21000.0),      # 18000 +6000 -4000 +1000
                f"got {r.numeric_answer}")),

    # ---------------- appropriations ----------------
    ("ioc_full_year",
     "Interest on capital is allowed at 6% per annum on a capital of "
     "Rs 50,000. Find the interest on capital.",
     lambda r: (r.matched and r.structure == "INTEREST_CAPITAL" and close(
         r.numeric_answer, 3000.0), f"got {r.numeric_answer}")),
    ("ioc_months",
     "Interest on capital at 9% per annum on capital of Rs 80,000 for 6 "
     "months. Find the interest.",
     lambda r: (r.matched and r.structure == "INTEREST_CAPITAL" and close(
         r.numeric_answer, 3600.0),       # 80000x9%x6/12
                f"got {r.numeric_answer}")),
    ("ioc_find_rate",
     "Interest of Rs 3,600 was allowed on a capital of Rs 80,000 for 6 "
     "months. Find the rate of interest on capital per annum.",
     lambda r: (r.matched and r.structure == "INTEREST_CAPITAL" and close(
         r.numeric_answer, 9.0),          # 3600x1200/(80000x6)
                f"got {r.numeric_answer}")),
    ("iod_monthly_mid",
     "Interest on drawings: A partner withdraws Rs 2,000 per month at the "
     "middle of each month. Interest is charged at 6% per annum. Find the "
     "interest on drawings.",
     lambda r: (r.matched and r.structure == "INTEREST_DRAWINGS" and close(
         r.numeric_answer, 720.0),        # 24000x6%x6/12
                f"got {r.numeric_answer}")),
    ("iod_quarter_end",
     "Interest on drawings: drawings of Rs 5,000 per quarter at the end of "
     "each quarter, interest at 8% per annum. Find the interest on drawings.",
     lambda r: (r.matched and r.structure == "INTEREST_DRAWINGS" and close(
         r.numeric_answer, 600.0),        # 20000x8%x4.5/12
                f"got {r.numeric_answer}")),

    # ---------------- partnership ----------------
    ("psr_division",
     "A and B are partners sharing profits in the ratio 3:2. The firm "
     "earned a profit of Rs 50,000. Divide the profit between the partners.",
     lambda r: (r.matched and r.structure == "PARTNERSHIP_PROFIT_SHARE" and
                close(r.numeric_answer, 30000.0)
                and "30,000" in r.final_answer and "20,000" in r.final_answer,
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("psr_three_way",
     "X, Y and Z are partners sharing profits in the ratio 2:2:1. Profit "
     "of Rs 100,000 is to be divided. Give each partner's share.",
     lambda r: (r.matched and r.structure == "PARTNERSHIP_PROFIT_SHARE" and
                close(r.numeric_answer, 40000.0)
                and "20,000" in r.final_answer,
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("guarantee_shortfall",
     "A and B are partners sharing profits in the ratio 3:2. B is given a "
     "guarantee that his share of profit shall not be less than Rs 25,000. "
     "The profit of the firm is Rs 60,000. Show the final shares.",
     lambda r: (r.matched and r.structure == "PARTNER_GUARANTEE" and
                close(r.numeric_answer, 25000.0)
                and "35,000" in r.final_answer,
                # A 36,000 -> bears 1,000 shortfall -> 35,000; B gets 25,000
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("admission_new_ratio",
     "A and B are partners sharing profits in the ratio 3:2. C is admitted "
     "for 1/5th share of profits. Calculate the new ratio.",
     lambda r: (r.matched and r.structure == "PARTNERSHIP_NEW_RATIO" and
                "12" in r.final_answer and "8" in r.final_answer
                and "5" in r.final_answer,   # 12:8:5
                f"got {r.final_answer!r}")),

    # ---------------- ratios ----------------
    ("current_ratio",
     "Current assets are Rs 400,000 and current liabilities are Rs 200,000. "
     "Calculate the current ratio.",
     lambda r: (r.matched and r.structure == "CURRENT_RATIO"
                and "2" in r.final_answer and ": 1" in r.final_answer,
                f"got {r.final_answer!r}")),
    ("quick_ratio",
     "Current assets Rs 500,000, stock Rs 150,000, prepaid expenses "
     "Rs 10,000, current liabilities Rs 170,000. Calculate the quick ratio.",
     lambda r: (r.matched and r.structure == "QUICK_RATIO" and
                "2" in r.final_answer,  # 340000/170000 = 2
                f"got {r.final_answer!r}")),
    ("debt_equity",
     "Long term borrowings Rs 600,000; share capital Rs 400,000 and "
     "reserves and surplus Rs 200,000. Calculate the debt equity ratio.",
     lambda r: (r.matched and r.structure == "DEBT_EQUITY_RATIO" and
                "1" in r.final_answer,  # 600000/600000 = 1:1
                f"got {r.final_answer!r}")),
    ("gp_ratio",
     "Gross profit is Rs 120,000 and net sales are Rs 480,000. Calculate "
     "the gross profit ratio.",
     lambda r: (r.matched and r.structure == "GP_RATIO" and
                "25" in r.final_answer, f"got {r.final_answer!r}")),
    ("np_ratio",
     "Net profit Rs 60,000, net sales Rs 480,000. Calculate the net profit "
     "ratio.",
     lambda r: (r.matched and r.structure == "NP_RATIO" and
                "12.5" in r.final_answer, f"got {r.final_answer!r}")),

    # ---------------- bills of exchange ----------------
    ("bill_due_date",
     "A bill of exchange drawn on 1st January 2026 payable 3 months after "
     "date. Find the due date of the bill.",
     lambda r: (r.matched and r.structure == "BILL_DUE_DATE" and
                "4 April 2026" in r.final_answer,
                f"got {r.final_answer!r}")),
    ("bill_discount",
     "A bill receivable of Rs 50,000 was discounted at the bank 3 months "
     "before maturity at 12% per annum. Find the discounting charge and "
     "the proceeds.",
     lambda r: (r.matched and r.structure == "BILL_DISCOUNT" and
                close(r.numeric_answer, 1500.0) and "48,500"
                in r.final_answer,          # 50000x12%x3/12; 48500
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("bill_renewal",
     "A accepted a bill of Rs 40,000 which he could not meet on maturity. "
     "He paid Rs 10,000 in cash and agreed to pay the balance with "
     "interest at 9% per annum by a new bill for 3 months. Find the "
     "interest and the amount of the new bill.",
     lambda r: (r.matched and r.structure == "BILL_RENEWAL" and
                close(r.numeric_answer, 675.0) and "30,675"
                in r.final_answer,          # 30000x9%x3/12; 30675
                f"got {r.numeric_answer}, {r.final_answer!r}")),

    # ---------------- insolvency / incomplete / NPO ----------------
    ("insolvency_bad_debts",
     "Ramesh who owed us Rs 20,000 became insolvent. Only 40 paise in a "
     "rupee could be recovered from his estate. Find the bad debts.",
     lambda r: (r.matched and r.structure == "INSOLVENCY_RECOVERY" and
                close(r.numeric_answer, 12000.0) and "8,000"
                in r.final_answer,          # recovered 8000, bad 12000
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("incomplete_records_profit",
     "A trader keeps incomplete records. His opening capital was "
     "Rs 100,000 and closing capital Rs 150,000. He withdrew Rs 20,000 "
     "during the year and introduced fresh capital of Rs 30,000. Find "
     "the profit made by him during the year.",
     lambda r: (r.matched and r.structure == "INCOMPLETE_RECORDS_PROFIT"
                and close(r.numeric_answer, 40000.0),  # 150k-100k+20k-30k
                f"got {r.numeric_answer}")),
    ("subscription_income",
     "A club received subscriptions of Rs 50,000 during the year. "
     "Subscriptions outstanding at the end of the year were Rs 5,000 and "
     "subscriptions received in advance at the end were Rs 2,000. Find "
     "the subscription income for the year.",
     lambda r: (r.matched and r.structure == "SUBSCRIPTION_INCOME" and
                close(r.numeric_answer, 53000.0),   # 50000+5000-2000
                f"got {r.numeric_answer}")),
    ("subscription_income_openings",
     "Subscription received during the year Rs 40,000. Subscriptions "
     "outstanding at the beginning were Rs 3,000 and outstanding at the "
     "end were Rs 4,000. Subscriptions received in advance at the "
     "beginning were Rs 1,000. Find subscription income.",
     lambda r: (r.matched and r.structure == "SUBSCRIPTION_INCOME" and
                close(r.numeric_answer, 42000.0),   # 40k+4k-3k-0+1k
                f"got {r.numeric_answer}")),

    # ---------------- reconstitution: retirement/death/goodwill ------
    ("gaining_ratio",
     "A, B and C are partners sharing profits in the ratio 3:2:1. B "
     "retires and A and C decide to share future profits in the ratio "
     "5:3. Find the gaining ratio.",
     lambda r: (r.matched and r.structure == "GAINING_RATIO" and
                "3 : 5" in r.final_answer,
                f"got {r.final_answer!r}")),
    ("deceased_share",
     "A partner C died on 1st June 2024. The profit for the year ended "
     "31st March 2024 was Rs 60,000 and C's share of profit was 1/4. "
     "Calculate C's share of profit till the date of death.",
     lambda r: (r.matched and r.structure == "DECEASED_SHARE" and
                close(r.numeric_answer, 2500.0),    # 60000x1/4x2/12
                f"got {r.numeric_answer}")),
    ("goodwill_average",
     "Goodwill of the firm is valued at 3 years purchase of the average "
     "profits of the last five years which were Rs 40,000, Rs 50,000, "
     "Rs 55,000, Rs 70,000 and Rs 85,000. Calculate the goodwill.",
     lambda r: (r.matched and r.structure == "GOODWILL_VALUATION" and
                close(r.numeric_answer, 180000.0),  # avg 60000 x 3
                f"got {r.numeric_answer}")),
    ("goodwill_super",
     "The average profits of a firm are Rs 90,000, capital employed is "
     "Rs 6,00,000 and the normal rate of return is 10%. Calculate "
     "goodwill at 3 years purchase of super profits.",
     lambda r: (r.matched and r.structure == "GOODWILL_VALUATION" and
                close(r.numeric_answer, 90000.0),   # (90000-60000)x3
                f"got {r.numeric_answer}")),
    ("goodwill_capitalisation",
     "A business has average profits of Rs 100,000, assets of Rs "
     "1,000,000 and external liabilities of Rs 180,000. Find the "
     "goodwill by the capitalisation method, normal rate of return 10%.",
     lambda r: (r.matched and r.structure == "GOODWILL_VALUATION" and
                close(r.numeric_answer, 180000.0),  # 1,000,000-820,000
                f"got {r.numeric_answer}")),

    # ---------------- company accounts ----------------
    ("share_issue_call",
     "A company issued 10,000 shares of Rs 10 each at a premium of Rs 2 "
     "per share payable Rs 4 on application, Rs 5 on allotment "
     "(including premium) and the balance on first and final call. Find "
     "the amount due on the call.",
     lambda r: (r.matched and r.structure == "SHARE_ISSUE" and
                close(r.numeric_answer, 30000.0) and "per share"
                in r.final_answer,          # 12-4-5 = 3 x 10000
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("forfeiture_reissue",
     "2,000 shares of Rs 10 each, Rs 8 called up, were forfeited for "
     "non-payment of the first call of Rs 3 per share. They were "
     "reissued at Rs 7 per share. Find the capital reserve.",
     lambda r: (r.matched and r.structure == "FORFEITURE_REISSUE" and
                close(r.numeric_answer, 8000.0),    # (5-1)x2000
                f"got {r.numeric_answer}")),
    ("debenture_issue",
     "A company issued 5,000 debentures of Rs 100 each at 5% discount, "
     "redeemable at 10% premium. Find the redemption amount and the "
     "issue proceeds.",
     lambda r: (r.matched and r.structure == "DEBENTURE_ISSUE" and
                close(r.numeric_answer, 550000.0) and "475,000"
                in r.final_answer,          # proceeds 475000, redeem 550000
                f"got {r.numeric_answer}, {r.final_answer!r}")),
    ("cash_flow_operating",
     "Net profit before tax is Rs 100,000. Depreciation Rs 20,000, "
     "increase in debtors Rs 10,000 and increase in creditors Rs 5,000. "
     "Find net cash from operating activities by the indirect method.",
     lambda r: (r.matched and r.structure == "CASH_FLOW_OPERATING" and
                close(r.numeric_answer, 115000.0),  # 100k+20k-10k+5k
                f"got {r.numeric_answer}")),

    # ---------------- turnover ratios / working capital ---------------
    ("inventory_turnover",
     "Cost of revenue from operations is Rs 300,000, opening inventory "
     "Rs 50,000 and closing inventory Rs 70,000. Calculate the inventory "
     "turnover ratio.",
     lambda r: (r.matched and r.structure == "INVENTORY_TURNOVER" and
                "5 times" in r.final_answer,        # 300000/60000
                f"got {r.final_answer!r}")),
    ("receivables_turnover",
     "Net credit sales Rs 400,000, opening debtors Rs 30,000 and closing "
     "debtors Rs 50,000. Calculate the trade receivables turnover ratio.",
     lambda r: (r.matched and r.structure == "RECEIVABLES_TURNOVER" and
                "10 times" in r.final_answer,       # 400000/40000
                f"got {r.final_answer!r}")),
    ("working_capital",
     "Current assets Rs 350,000 and current liabilities Rs 150,000. "
     "Calculate the working capital.",
     lambda r: (r.matched and r.structure == "WORKING_CAPITAL" and
                close(r.numeric_answer, 200000.0),  # 350000-150000
                f"got {r.numeric_answer}")),
]

# gate cases: must NOT match (or must decline) -- guards against
# cross-firing on other subjects (maths, physics, chemistry, biology,
# economics, computer science)
DECLINE_CASES = [
    "Find the area of a circle of radius 7",
    "Solve: 3x + 5 = 20",
    "Find the speed of a car that travels 240 km in 4 hours",
    "A ball is thrown upward with velocity 20 m/s",
    "What is 15% of 240",
    "Balance the chemical equation: H2 + O2 -> H2O",
    "Calculate the number of moles in 2 grams of CO2",
    "In a cross between Tt and Tt, give the phenotype ratio",
    "Given Qd = 100 - 5P, find the quantity demanded when the price is 6",
    "Nominal GDP is 2200 and real GDP is 2000. Find the GDP deflator",
    "A convex lens forms an image at 30 cm with focal length 10 cm",
]

passed = failed = declined_wrong = contract_bad = 0
details = []
for cid, q, check in CASES:
    r = model_accountancy_families(q)
    ok, detail = check(r)
    if ok:
        passed += 1
    else:
        failed += 1
        details.append((cid, detail, r.structure if r.matched else "NO MATCH"))
    if r.matched:
        cerrs = contract_errors(r)
        if cerrs:
            contract_bad += 1
            details.append((cid, "CONTRACT: " + "; ".join(cerrs),
                            r.structure))
    else:
        contract_bad += 1
        details.append((cid, "CONTRACT: unmatched case -- no steps to audit",
                        "NO MATCH"))
for q in DECLINE_CASES:
    r = model_accountancy_families(q)
    if r.matched:
        declined_wrong += 1
        details.append(("decline-guard", q[:50], "fired " + r.structure))

print(f"PASS {passed} | FAIL {failed} | CROSSFIRE {declined_wrong} | "
      f"CONTRACT-VIOLATIONS {contract_bad} "
      f"(of {len(CASES)} cases + {len(DECLINE_CASES)} guards)")
for d in details:
    print("  ", d)
if failed or declined_wrong or contract_bad:
    sys.exit(1)
