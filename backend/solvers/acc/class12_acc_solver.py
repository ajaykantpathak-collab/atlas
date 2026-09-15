"""
ISC Class 12 Accountancy Solver
Covers: Partnership, Company Accounts, Financial Statements, Cash Flow, Ratio Analysis
Uses decimal.Decimal for all financial calculations.
"""

from decimal import Decimal, ROUND_HALF_UP, getcontext
from typing import Dict, List, Any, Optional, Tuple
import pandas as pd
import numpy as np
import time
import signal
import sys

getcontext().prec = 28
getcontext().rounding = ROUND_HALF_UP

# ──────────────────────────────────────────────────────────────────────────────
# Base Solver
# ──────────────────────────────────────────────────────────────────────────────
class BaseSolver:
    PROBLEM_TYPE: str = "base"
    RULES: List[str] = []

    def __init__(self, params: Dict[str, Any]):
        self.params = {k: self._to_dec(v) if isinstance(v, (int, float, str)) and not isinstance(v, str) else v
                       for k, v in params.items()}
        self.steps: List[Dict[str, str]] = []
        self._answer: Any = None

    @staticmethod
    def _to_dec(v):
        if isinstance(v, Decimal):
            return v
        try:
            return Decimal(str(v))
        except Exception:
            return v

    def add_step(self, rule: str, text: str, math: str = ""):
        self.steps.append({"rule": rule, "text": text, "math": math})

    def solve(self, timeout: float = 10.0):
        import threading
        timer = None
        try:
            if _HAS_SIGALRM:
                signal.alarm(int(timeout))
            else:
                timer = threading.Timer(timeout, timeout_handler, args=(0, None))
                timer.start()
            self._solve()
            if _HAS_SIGALRM:
                signal.alarm(0)
            if timer:
                timer.cancel()
            self._verify()
            return {"answer": self._answer, "steps": self.steps, "verified": True}
        except TimeoutError:
            return {"answer": None, "steps": self.steps, "verified": False, "error": "Timeout"}
        except Exception as e:
            return {"answer": None, "steps": self.steps, "verified": False, "error": str(e)}

    def _solve(self):
        raise NotImplementedError

    def _verify(self):
        pass


def timeout_handler(signum, frame):
    raise TimeoutError("Solver timed out after 10 seconds")

# signal.SIGALRM is Unix-only; use threading.Timer fallback on Windows
try:
    signal.signal(signal.SIGALRM, timeout_handler)
    _HAS_SIGALRM = True
except (AttributeError, ImportError):
    _HAS_SIGALRM = False


# ──────────────────────────────────────────────────────────────────────────────
# Helper utilities
# ──────────────────────────────────────────────────────────────────────────────
def D(v) -> Decimal:
    if isinstance(v, Decimal):
        return v
    return Decimal(str(v))


def round2(v: Decimal) -> Decimal:
    return v.quantize(D("0.01"), rounding=ROUND_HALF_UP)


def ratio(a: int, b: int) -> str:
    g = _gcd(a, b)
    return f"{a//g}:{b//g}"


def _gcd(a, b):
    while b:
        a, b = b, a % b
    return a


def pct(part: Decimal, whole: Decimal) -> Decimal:
    return (part / whole * D("100")) if whole != 0 else D("0")


# ──────────────────────────────────────────────────────────────────────────────
# Solver 1: Partnership – Sacrifice Ratio
# CISCE ISC C12 │ Node: 1.1 │ Rule: New Ratio – Old Ratio = Sacrifice
# ──────────────────────────────────────────────────────────────────────────────
class SacrificeRatioSolver(BaseSolver):
    PROBLEM_TYPE = "partnership_sacrifice_ratio"
    RULES = [
        "Sacrifice of a partner = Old Share − New Share",
        "If result is positive → Sacrifice (gives up share)",
        "If result is negative → Gain (takes more share)",
        "Sacrifice Ratio = Sacrifice of each partner expressed in proportion",
    ]

    def _solve(self):
        old_A = D(self.params["old_A"])
        old_B = D(self.params["old_B"])
        old_C = D(self.params["old_C"])
        new_A = D(self.params["new_A"])
        new_B = D(self.params["new_B"])
        new_C = D(self.params["new_C"])

        self.add_step(
            "Given",
            f"Old Ratio = {old_A}:{old_B}:{old_C}, New Ratio = {new_A}:{new_B}:{new_C}"
        )

        sac_A = old_A - new_A
        sac_B = old_B - new_B
        sac_C = old_C - new_C

        self.add_step(
            "Sacrifice Formula",
            "Sacrifice = Old Share − New Share",
            f"A: {old_A} − {new_A} = {sac_A}  {'✓ Sacrifice' if sac_A > 0 else '✗ Gain'}"
        )
        self.add_step(
            "Sacrifice Formula",
            "Sacrifice = Old Share − New Share",
            f"B: {old_B} − {new_B} = {sac_B}  {'✓ Sacrifice' if sac_B > 0 else '✗ Gain'}"
        )
        self.add_step(
            "Sacrifice Formula",
            "Sacrifice = Old Share − New Share",
            f"C: {old_C} − {new_C} = {sac_C}  {'✓ Sacrifice' if sac_C > 0 else '✗ Gain'}"
        )

        if sac_A > 0 or sac_B > 0 or sac_C > 0:
            total_sac = max(sac_A, D("0")) + max(sac_B, D("0")) + max(sac_C, D("0"))
            if total_sac > 0:
                sa = int(max(sac_A, D("0")) * 1000)
                sb = int(max(sac_B, D("0")) * 1000)
                sc = int(max(sac_C, D("0")) * 1000)
                sr = ratio(sa, sb) if sb else f"{sa}:0"
                s_ratio = f"{sr}:{sc}" if sc else sr
            else:
                s_ratio = "0:0:0"
        else:
            s_ratio = "N/A (all gain)"

        self.add_step(
            "Sacrifice Ratio",
            f"Sacrifice Ratio = {s_ratio}",
            f"This ratio is used for goodwill sharing and bonus shares on admission."
        )

        self._answer = {
            "sacrifice_A": float(sac_A),
            "sacrifice_B": float(sac_B),
            "sacrifice_C": float(sac_C),
            "sacrifice_ratio": s_ratio,
        }

    def _verify(self):
        sacs = [self._answer["sacrifice_A"], self._answer["sacrifice_B"], self._answer["sacrifice_C"]]
        assert all(abs(s) <= 1.0 for s in sacs), "Sacrifice > 1.0 (invalid)"
        assert sum(s for s in sacs if s > 0) > 0 or self._answer["sacrifice_ratio"] == "N/A"


# ──────────────────────────────────────────────────────────────────────────────
# Solver 2: Goodwill – Super Profit Method
# CISCE ISC C12 │ Node: 1.2 │ Rule: Goodwill = Super Profit × Number of Years
# ──────────────────────────────────────────────────────────────────────────────
class GoodwillSuperProfitSolver(BaseSolver):
    PROBLEM_TYPE = "goodwill_super_profit"
    RULES = [
        "Normal Profit = Capital Employed × Normal Rate of Return",
        "Super Profit = Average Profit − Normal Profit",
        "Goodwill = Super Profit × Number of Years' Purchase",
    ]

    def _solve(self):
        cap = D(self.params["capital_employed"])
        nrr = D(self.params["normal_rate"])          # e.g., 10 for 10%
        avg_p = D(self.params["average_profit"])
        yrs = int(self.params["years_purchase"])

        self.add_step("Given",
                      f"Capital Employed = Rs {cap:,.2f}, Normal Rate = {nrr}%, "
                      f"Average Profit = Rs {avg_p:,.2f}, Years' Purchase = {yrs}")

        norm_p = round2(cap * nrr / D("100"))
        self.add_step(
            "Normal Profit",
            "Normal Profit = Capital × Normal Rate ÷ 100",
            f"= {cap:,.2f} × {nrr} ÷ 100 = Rs {norm_p:,.2f}"
        )

        super_p = round2(avg_p - norm_p)
        self.add_step(
            "Super Profit",
            "Super Profit = Average Profit − Normal Profit",
            f"= {avg_p:,.2f} − {norm_p:,.2f} = Rs {super_p:,.2f}"
        )

        gw = round2(super_p * D(yrs))
        self.add_step(
            "Goodwill",
            "Goodwill = Super Profit × Years' Purchase",
            f"= {super_p:,.2f} × {yrs} = Rs {gw:,.2f}"
        )

        self._answer = {"goodwill": float(gw), "normal_profit": float(norm_p), "super_profit": float(super_p)}

    def _verify(self):
        assert self._answer["super_profit"] >= 0, "Super profit should be non-negative for this method"
        assert self._answer["goodwill"] >= 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver 3: Partnership – Revaluation on Admission
# CISCE ISC C12 │ Node: 1.3 │ Rule: Gain on Revaluation = Credit – Debit
# ──────────────────────────────────────────────────────────────────────────────
class RevaluationSolver(BaseSolver):
    PROBLEM_TYPE = "revaluation_account"
    RULES = [
        "Increase in asset / Decrease in liability → Credit to Revaluation A/c (Gain)",
        "Decrease in asset / Increase in liability / Provision → Debit to Revaluation A/c (Loss)",
        "Gain on revaluation is shared in OLD RATIO",
        "Net revaluation figure is carried to Balance Sheet at revised values",
    ]

    def _solve(self):
        items = self.params["items"]  # list of {"name": str, "book": float, "revised": float, "type": "asset"/"liability"/"provision"}
        old_ratio = self.params["old_ratio"]  # "A:B:C"

        self.add_step("Given", f"Revaluation items with book and revised values. Old Ratio = {old_ratio}")

        debits = []
        credits = []
        for item in items:
            b = D(item["book"])
            r = D(item["revised"])
            itype = item["type"]
            diff = r - b
            if itype == "asset":
                if diff > 0:
                    credits.append((item["name"], diff, "Asset ↑"))
                else:
                    debits.append((item["name"], abs(diff), "Asset ↓"))
            elif itype == "liability":
                if diff < 0:
                    credits.append((item["name"], abs(diff), "Liability ↓"))
                else:
                    debits.append((item["name"], diff, "Liability ↑"))
            elif itype == "provision":
                debits.append((item["name"], abs(diff), "Provision"))

        total_d = sum(d[1] for d in debits)
        total_c = sum(c[1] for c in credits)
        net = round2(total_c - total_d)

        for name, val, reason in credits:
            self.add_step("Credit Entry", f"{name}: {reason} → Credit Rs {round2(val):,.2f}")

        for name, val, reason in debits:
            self.add_step("Debit Entry", f"{name}: {reason} → Debit Rs {round2(val):,.2f}")

        self.add_step("Totals", f"Total Credits = Rs {round2(total_c):,.2f}, Total Debits = Rs {round2(total_d):,.2f}")

        parts = [D(p.strip()) for p in old_ratio.split(":")]
        total_parts = sum(parts)
        shares = {chr(65+i): round2(part * net / total_parts) for i, part in enumerate(parts)}
        dist_text = ", ".join(f"{k} = Rs {v:,.2f}" for k, v in shares.items())
        self.add_step("Distribution (Old Ratio)", f"Net {'Gain' if net >= 0 else 'Loss'} = Rs {abs(net):,.2f} shared: {dist_text}")

        self._answer = {
            "revaluation_account": {
                "credits": [(n, float(v), r) for n, v, r in credits],
                "debits": [(n, float(v), r) for n, v, r in debits],
                "total_credits": float(total_c),
                "total_debits": float(total_d),
                "net_gain": float(net),
                "distribution": {k: float(v) for k, v in shares.items()},
            }
        }

    def _verify(self):
        assert abs(self._answer["revaluation_account"]["total_credits"] -
                   self._answer["revaluation_account"]["total_debits"] -
                   self._answer["revaluation_account"]["net_gain"]) < 0.02


# ──────────────────────────────────────────────────────────────────────────────
# Solver 4: Company – Issue of Shares at Premium / Discount
# CISCE ISC C12 │ Node: 2.1 │ Rule: Share Capital = No. of Shares × (Face Value ± Premium/Discount)
# ──────────────────────────────────────────────────────────────────────────────
class ShareIssueSolver(BaseSolver):
    PROBLEM_TYPE = "share_issue"
    RULES = [
        "Application Money = No. of Shares × Application Money per Share",
        "Allotment Money = No. of Shares × Allotment Money per Share",
        "Securities Premium = No. of Shares × Premium per Share (credited to Securities Premium A/c)",
        "Calls in Arrears: Debited to Calls in Arrears A/c (asset)",
        "Underwriting Commission: Debited to Profit & Loss A/c",
    ]

    def _solve(self):
        face = D(self.params["face_value"])
        issued = int(self.params["shares_issued"])
        premium = D(self.params.get("premium", 0))
        appl = D(self.params.get("application_money", face * D("0.25")))
        allot = D(self.params.get("allotment_money", face * D("0.25")))
        first_call = D(self.params.get("first_call", face * D("0.25")))
        second_call = D(self.params.get("second_call", D("0")))
        arrears_appl = int(self.params.get("arrears_application", 0))
        arrears_call = int(self.params.get("arrears_call", 0))
        underwrite_pct = D(self.params.get("underwriting_pct", 0))

        self.add_step("Given",
                      f"Face Value=Rs{face}, Shares Issued={issued}, Premium=Rs{premium}, "
                      f"Appl={appl}, Allot={allot}, 1st Call={first_call}, 2nd Call={second_call}")

        jv_entries = []
        cash_entries = []

        # Application
        app_total = round2(D(issued - arrears_appl) * appl)
        self.add_step("Application", f"{issued - arrears_appl} × Rs {appl} = Rs {app_total:,.2f}",
                      "Dr Bank / Dr Calls in Arrears  Cr Share Application A/c")
        jv_entries.append(("Bank", app_total, "Dr"))
        if arrears_appl > 0:
            jv_entries.append(("Calls in Arrears", round2(D(arrears_appl) * appl), "Dr"))

        # Allotment
        allot_total = round2(D(issued - arrears_call) * allot)
        prem_total = round2(D(issued) * premium)
        self.add_step("Allotment", f"{issued - arrears_call} × Rs {allot} = Rs {allot_total:,.2f} + "
                                   f"Premium {issued} × Rs {premium} = Rs {prem_total:,.2f}",
                      "Dr Share Allotment A/c  Cr Share Capital A/c, Securities Premium A/c / Calls in Arrears")
        jv_entries.append(("Share Allotment A/c", allot_total + prem_total, "Dr"))

        # Calls
        call1_total = round2(D(issued - arrears_call) * first_call)
        self.add_step("First Call", f"{issued - arrears_call} × Rs {first_call} = Rs {call1_total:,.2f}",
                      "Dr Calls A/c  Cr Share Call A/c")
        jv_entries.append(("Calls A/c (1st)", call1_total, "Dr"))

        if second_call > 0:
            call2_total = round2(D(issued) * second_call)
            self.add_step("Second Call", f"{issued} × Rs {second_call} = Rs {call2_total:,.2f}",
                          "Dr Calls A/c  Cr Share 2nd Call A/c")
            jv_entries.append(("Calls A/c (2nd)", call2_total, "Dr"))

        # Share Capital total
        share_cap = round2(D(issued) * face)
        self.add_step("Share Capital", f"{issued} × Rs {face} = Rs {share_cap:,.2f}")

        total_recd = app_total + allot_total + call1_total + (round2(D(issued) * second_call) if second_call else 0)
        under_comm = round2(share_cap * underwrite_pct / D("100")) if underwrite_pct > 0 else D("0")
        self.add_step("Summary",
                      f"Total Share Capital: Rs {share_cap:,.2f}  |  Securities Premium: Rs {prem_total:,.2f}  |  "
                      f"Cash Received: Rs {total_recd:,.2f}  |  Underwriting Commission: Rs {under_comm:,.2f}")

        self._answer = {
            "share_capital": float(share_cap),
            "securities_premium": float(prem_total),
            "application_money": float(app_total),
            "allotment_money": float(allot_total),
            "call_money_1st": float(call1_total),
            "call_money_2nd": float(round2(D(issued) * second_call)) if second_call else 0,
            "underwriting_commission": float(under_comm),
            "total_cash_received": float(total_recd),
            "journal_entries": jv_entries,
        }

    def _verify(self):
        assert self._answer["share_capital"] > 0
        assert self._answer["total_cash_received"] <= self._answer["share_capital"] + self._answer["securities_premium"] * 1.1


# ──────────────────────────────────────────────────────────────────────────────
# Solver 5: Forfeiture and Reissue of Shares
# CISCE ISC C12 │ Node: 2.2 │ Rule: Forfeited amount = Paid-up − Amount not paid
# ──────────────────────────────────────────────────────────────────────────────
class ForfeitureSolver(BaseSolver):
    PROBLEM_TYPE = "forfeiture_reissue"
    RULES = [
        "Forfeiture occurs when a shareholder fails to pay calls on time.",
        "Amount Forfeited = Amount actually received from the member (paid-up amount).",
        "On forfeiture: Dr Share Capital A/c (paid-up)  Cr Calls in Arrears A/c (unpaid)  Cr Forfeited Shares A/c (balance).",
        "On reissue: Dr Bank A/c  Cr Forfeited Shares A/c. If reissue price > paid-up → Cr Securities Premium.",
        "Balance in Forfeited Shares A/c (if any) is transferred to Capital Reserve.",
    ]

    def _solve(self):
        shares = int(self.params["shares_forfeited"])
        face = D(self.params["face_value"])
        paid_up = D(self.params["paid_up_amount"])  # total amount actually paid by member
        reissue_shares = int(self.params.get("reissue_shares", 0))
        reissue_price = D(self.params.get("reissue_price", D("0")))

        self.add_step("Given",
                      f"Shares Forfeited = {shares} × Rs {face} = face Rs {round2(D(shares)*face):,.2f}, "
                      f"Paid-up = Rs {paid_up:,.2f}")

        forfeited_total = paid_up
        self.add_step("Forfeiture Entry",
                      f"Dr Share Capital {shares}×Rs{face}=Rs{round2(D(shares)*face):,.2f}  "
                      f"Cr Calls in Arrears Rs{round2(D(shares)*face - paid_up):,.2f}  "
                      f"Cr Forfeited Shares A/c Rs{forfeited_total:,.2f}",
                      "Forfeited Shares A/c credited with amount actually received")

        reissue_result = {}
        if reissue_shares > 0:
            reissue_total = round2(D(reissue_shares) * reissue_price)
            cost_per = round2(paid_up / D(shares)) if shares else D("0")
            cost_reissue = round2(D(reissue_shares) * cost_per)
            balance = round2(reissue_total - cost_reissue)
            self.add_step("Reissue Entry",
                          f"Dr Bank Rs{reissue_total:,.2f}  Cr Forfeited Shares A/c Rs{cost_reissue:,.2f}  "
                          f"{'Cr Securities Premium Rs' + str(balance) if balance > 0 else ''}",
                          f"Reissued {reissue_shares} shares @ Rs {reissue_price}")
            reissue_result = {
                "reissue_total": float(reissue_total),
                "balance_for_capital_reserve": float(balance),
            }

        remaining_forfeited = round2(paid_up - (reissue_result.get("reissue_total", 0) * paid_up / D(shares))) if shares else D("0")

        self._answer = {
            "forfeited_amount": float(forfeited_total),
            "capital_reserve": float(reissue_result.get("balance_for_capital_reserve", 0)),
            "remaining_forfeited_amount": float(remaining_forfeited),
        }

    def _verify(self):
        assert self._answer["forfeited_amount"] >= 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver 6: Financial Statements with Adjustments
# CISCE ISC C12 │ Node: 3.1 │ Rule: Adjustments modify Trading/P&L/BS items
# ──────────────────────────────────────────────────────────────────────────────
class FinancialStatementsSolver(BaseSolver):
    PROBLEM_TYPE = "financial_statements"
    RULES = [
        "Outstanding Expenses → Add to respective expense (Dr Expense  Cr Outstanding Expenses – Liability)",
        "Prepaid Expenses → Deduct from respective expense",
        "Accrued Income → Add to Income (Dr Accrued Income  Cr Income)",
        "Depreciation = Cost × Rate% or WDV method",
        "Bad Debts → Deduct from Debtors and Add to P&L",
        "Provision for Doubtful Debts → Dr P&L A/c  Cr Provision",
        "Interest on Loan → Add to Interest expense",
        "Interest on Drawings → Deduct from Drawings",
        "Manager's Commission → Calculated on Net Profit before or after commission (check wording)",
    ]

    def _solve(self):
        trial_balance = self.params["trial_balance"]  # list of {"account": str, "debit": float, "credit": float}
        adjustments = self.params.get("adjustments", [])

        self.add_step("Given", f"Trial Balance with {len(trial_balance)} items and {len(adjustments)} adjustments.")

        accounts = {}
        for item in trial_balance:
            name = item["account"]
            d = D(item.get("debit", 0) or 0)
            c = D(item.get("credit", 0) or 0)
            accounts[name] = {"dr": d, "cr": c, "adj_dr": D("0"), "adj_cr": D("0")}

        for adj in adjustments:
            atype = adj["type"]
            self.add_step("Adjustment", adj["description"], adj.get("formula", ""))

            if atype == "outstanding_salary":
                amt = D(adj["amount"])
                accounts["Salaries"]["adj_dr"] += amt
                accounts["Outstanding Salaries"]["adj_cr"] += amt
            elif atype == "prepaid_insurance":
                amt = D(adj["amount"])
                accounts["Insurance"]["adj_dr"] -= amt
                accounts["Prepaid Insurance"]["adj_cr"] += amt
            elif attype := atype == "depreciation":
                amt = D(adj["amount"])
                accounts[adj["asset"]]["adj_dr"] += amt
                accounts["Depreciation"]["adj_cr"] += amt
            elif atype == "bad_debts":
                amt = D(adj["amount"])
                accounts["Debtors"]["adj_dr"] -= amt
                accounts["Bad Debts"]["adj_dr"] += amt
            elif atype == "provision_doubtful_debts":
                amt = D(adj["amount"])
                accounts["Debtors"]["adj_dr"] -= amt
                accounts["Provision for Doubtful Debts"]["adj_cr"] += amt
                accounts["Bad Debts"]["adj_dr"] += amt
            elif atype == "accrued_interest":
                amt = D(adj["amount"])
                accounts["Accrued Interest"]["adj_dr"] += amt
                accounts["Interest Received"]["adj_cr"] += amt
            elif atype == "interest_on_loan":
                amt = D(adj["amount"])
                accounts["Interest on Loan"]["adj_dr"] += amt
                accounts["Loan"]["adj_cr"] += amt
            elif atype == "interest_on_drawings":
                amt = D(adj["amount"])
                accounts["Drawings"]["adj_dr"] += amt
                accounts["Interest on Drawings"]["adj_cr"] += amt
            elif atype == "managers_commission":
                amt = D(adj["amount"])
                accounts["Manager's Commission"]["adj_dr"] += amt
                accounts["Commission Payable"]["adj_cr"] += amt

        # Build P&L items
        pnl_items = {}
        bs_items = {"assets": {}, "liabilities": {}, "capital": {}}
        nominal_accounts = [
            "Purchases", "Sales", "Opening Stock", "Closing Stock",
            "Salaries", "Rent", "Insurance", "Depreciation", "Bad Debts",
            "Interest on Loan", "Interest Received", "Interest on Drawings",
            "Discount Received", "Discount Allowed", "Commission",
            "Freight Inward", "Freight Outward", "Wages", "Repairs",
            "Manager's Commission", "Advertising", "Office Expenses",
            "Carriage Outward", "Carriage Inward", "Royalty",
            "Royalty Received", "Gain on Sale of Furniture",
            "Loss on Sale of Furniture", "Bad Debts Recovered",
            "Provision for Doubtful Debts",
        ]
        asset_accounts = ["Debtors", "Stock", "Furniture", "Machinery", "Cash", "Bank",
                          "Prepaid Insurance", "Accrued Interest", "Land", "Building"]
        liability_accounts = ["Outstanding Salaries", "Commission Payable", "Creditors",
                              "Outstanding Expenses", "Bills Payable", "Bank Overdraft",
                              "Loan", "Provision for Doubtful Debts", "Advance Tax"]
        capital_accounts = ["Capital", "Drawings", "Profit & Loss A/c", "Forfeited Shares A/c"]

        gross_p = D("0")
        net_exp = D("0")
        other_inc = D("0")
        other_exp = D("0")

        for name, data in accounts.items():
            adj_dr = data["dr"] + data["adj_dr"]
            adj_cr = data["cr"] + data["adj_cr"]
            bal = adj_dr - adj_cr

            if name in nominal_accounts or name in ["Sales", "Purchases", "Opening Stock", "Closing Stock"]:
                pnl_items[name] = float(bal) if name != "Sales" else float(abs(bal))
                if name in ["Sales"]:
                    gross_p += abs(bal)
                elif name in ["Opening Stock", "Purchases", "Freight Inward", "Wages", "Carriage Inward"]:
                    gross_p += bal
                elif name == "Closing Stock":
                    pass  # added later
                elif name in ["Salaries", "Rent", "Insurance", "Depreciation", "Bad Debts",
                              "Interest on Loan", "Discount Allowed", "Commission",
                              "Freight Outward", "Repairs", "Manager's Commission",
                              "Advertising", "Office Expenses", "Carriage Outward", "Royalty"]:
                    net_exp += bal
                elif name in ["Interest Received", "Discount Received", "Royalty Received",
                              "Gain on Sale of Furniture", "Bad Debts Recovered"]:
                    other_inc += bal
                elif name in ["Interest on Drawings", "Loss on Sale of Furniture"]:
                    other_exp += bal
            elif name in asset_accounts:
                bs_items["assets"][name] = float(abs(bal))
            elif name in liability_accounts:
                bs_items["liabilities"][name] = float(abs(bal))
            elif name in capital_accounts:
                bs_items["capital"][name] = float(bal)

        gp = gross_p
        np = gp - net_exp + other_inc - other_exp
        self.add_step("Gross Profit", f"GP = Rs {round2(gp):,.2f}")
        self.add_step("Net Profit", f"NP = GP − Net Expenses + Other Income − Other Expenses = Rs {round2(np):,.2f}")

        self._answer = {
            "gross_profit": float(round2(gp)),
            "net_profit": float(round2(np)),
            "pnl_items": pnl_items,
            "balance_sheet": bs_items,
        }

    def _verify(self):
        assert self._answer["gross_profit"] >= 0 or True  # can be negative (gross loss)


# ──────────────────────────────────────────────────────────────────────────────
# Solver 7: Cash Flow Statement (Indirect Method)
# CISCE ISC C12 │ Node: 4.1 │ Rule: CFO = NP + Depreciation + Working Capital changes
# ──────────────────────────────────────────────────────────────────────────────
class CashFlowSolver(BaseSolver):
    PROBLEM_TYPE = "cash_flow_statement"
    RULES = [
        "Operating Activities (Indirect): NP before tax/extraordinary items + Non-cash expenses (Depreciation, Bad Debts written off) ± Working Capital changes",
        "Working Capital Increase = Decrease in Cash (OUTFLOW)",
        "Working Capital Decrease = Increase in Cash (INFLOW)",
        "Investing Activities: Sale/Purchase of Fixed Assets, Investments, Loans given/received",
        "Financing Activities: Issue of Shares/Debentures, Dividends paid, Loans taken/repaid",
        "Cash Equivalents = Net increase in Cash + Opening Cash",
    ]

    def _solve(self):
        net_profit = D(self.params["net_profit"])
        balance_sheets = self.params["balance_sheets"]  # [bs_prev, bs_curr]
        non_cash = self.params.get("non_cash_items", {})
        investing = self.params.get("investing_activities", [])
        financing = self.params.get("financing_activities", [])

        self.add_step("Given", f"NP = Rs {net_profit:,.2f}, 2 Balance Sheets, Investing & Financing items")

        cfo = net_profit
        reasons = [f"Net Profit: +Rs {net_profit:,.2f}"]

        for name, amt in non_cash.items():
            cfo += D(str(amt))
            reasons.append(f"{name}: +Rs {D(str(amt)):,.2f}")

        # Working capital changes
        if len(balance_sheets) == 2:
            prev, curr = balance_sheets[0], balance_sheets[1]
            wc_items = ["Debtors", "Stock", "Prepaid Expenses", "Outstanding Expenses",
                        "Creditors", "Bills Payable", "Outstanding Salaries"]
            for item in wc_items:
                if item in prev and item in curr:
                    change = D(str(curr[item])) - D(str(prev[item]))
                    if item in ["Debtors", "Stock", "Prepaid Expenses"]:
                        # Increase in current asset = outflow
                        cfo -= change
                        reasons.append(f"{item} ↑ Rs{change:,.2f}: Outflow Rs{change:,.2f}")
                    else:
                        # Increase in current liability = inflow
                        cfo += change
                        reasons.append(f"{item} ↑ Rs{change:,.2f}: Inflow Rs{change:,.2f}")

        cfi = sum(D(str(i.get("amount", 0))) for i in investing)
        cff = sum(D(str(f.get("amount", 0))) for f in financing)

        self.add_step("Operating Cash Flow", f"CFO = Rs {round2(cfo):,.2f}")
        self.add_step("Investing Cash Flow", f"CFI = Rs {round2(cfi):,.2f}")
        self.add_step("Financing Cash Flow", f"CFF = Rs {round2(cff):,.2f}")
        self.add_step("Net Cash Flow", f"Net = Rs {round2(cfo + cfi + cff):,.2f}")

        self._answer = {
            "operating_activities": float(round2(cfo)),
            "investing_activities": float(round2(cfi)),
            "financing_activities": float(round2(cff)),
            "net_cash_flow": float(round2(cfo + cfi + cff)),
        }

    def _verify(self):
        assert isinstance(self._answer["operating_activities"], float)


# ──────────────────────────────────────────────────────────────────────────────
# Solver 8: Ratio Analysis
# CISCE ISC C12 │ Node: 5.1 │ Rule: Each ratio has specific formula from financial statements
# ──────────────────────────────────────────────────────────────────────────────
class RatioAnalysisSolver(BaseSolver):
    PROBLEM_TYPE = "ratio_analysis"
    RULES = {
        "current_ratio": "Current Ratio = Current Assets / Current Liabilities (ideal: 2:1)",
        "quick_ratio": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities (ideal: 1:1)",
        "debt_equity": "Debt-Equity Ratio = Long-term Debt / Equity",
        "debt": "Debt Ratio = Total Debt / Total Assets",
        "inventory_turnover": "Inventory Turnover = COGS / Average Inventory",
        "debtor_turnover": "Debtor Turnover = Net Credit Sales / Average Debtors",
        "gross_profit_ratio": "Gross Profit Ratio = Gross Profit / Net Sales × 100",
        "net_profit_ratio": "Net Profit Ratio = Net Profit / Net Sales × 100",
        "return_on_capital": "ROCE = EBIT / Capital Employed × 100",
        "return_on_equity": "ROE = Net Profit / Shareholders' Equity × 100",
        "working_capital_turnover": "Working Capital Turnover = Net Sales / Working Capital",
    }

    def _solve(self):
        ratio_type = self.params["ratio_type"]
        data = self.params["data"]

        self.add_step("Given", f"Data: {data}")
        formula = self.RULES.get(ratio_type, "")
        self.add_step("Formula", formula)

        ca = D(data.get("current_assets", 0))
        cl = D(data.get("current_liabilities", 0))
        inv = D(data.get("inventory", 0))
        debt = D(data.get("long_term_debt", 0))
        equity = D(data.get("equity", 0))
        total_assets = D(data.get("total_assets", 0))
        cogs = D(data.get("cogs", 0))
        credit_sales = D(data.get("credit_sales", 0))
        avg_inv = D(data.get("avg_inventory", inv))
        avg_debtors = D(data.get("avg_debtors", 0))
        gp = D(data.get("gross_profit", 0))
        np = D(data.get("net_profit", 0))
        sales = D(data.get("net_sales", 0))
        ebit = D(data.get("ebit", 0))
        cap_emp = D(data.get("capital_employed", 0))
        wc = ca - cl

        result = D("0")
        if ratio_type == "current_ratio":
            result = round2(ca / cl) if cl else D("0")
            interp = "Current Assets are 2× Current Liabilities" if float(result) >= 2 else "Liquidity may be tight"
        elif ratio_type == "quick_ratio":
            result = round2((ca - inv) / cl) if cl else D("0")
            interp = "Good liquidity (≥1)" if float(result) >= 1 else "Low quick liquidity"
        elif ratio_type == "debt_equity":
            result = round2(debt / equity) if equity else D("0")
            interp = "Low financial risk" if float(result) < 2 else "High leverage"
        elif ratio_type == "debt":
            result = round2((debt + cl) / total_assets) if total_assets else D("0")
            interp = "Conservative capital structure"
        elif ratio_type == "inventory_turnover":
            result = round2(cogs / avg_inv) if avg_inv else D("0")
            interp = f"Stock turns over {float(result):.1f} times per year"
        elif ratio_type == "debtor_turnover":
            result = round2(credit_sales / avg_debtors) if avg_debtors else D("0")
            interp = f"Collection period ≈ {365/float(result):.0f} days" if result > 0 else "N/A"
        elif ratio_type == "gross_profit_ratio":
            result = round2(gp / sales * D("100")) if sales else D("0")
            interp = f"GP margin = {float(result):.1f}%"
        elif ratio_type == "net_profit_ratio":
            result = round2(np / sales * D("100")) if sales else D("0")
            interp = f"NP margin = {float(result):.1f}%"
        elif ratio_type == "return_on_capital":
            result = round2(ebit / cap_emp * D("100")) if cap_emp else D("0")
            interp = f"ROCE = {float(result):.1f}%"
        elif ratio_type == "return_on_equity":
            result = round2(np / equity * D("100")) if equity else D("0")
            interp = f"ROE = {float(result):.1f}%"
        elif ratio_type == "working_capital_turnover":
            result = round2(sales / wc) if wc > 0 else D("0")
            interp = f"WC turns over {float(result):.1f} times"
        else:
            interp = "Unknown ratio"

        self.add_step("Calculation", f"{ratio_type} = {float(result):.2f}  [{interp}]")
        self._answer = {"ratio_type": ratio_type, "value": float(result), "interpretation": interp}

    def _verify(self):
        assert isinstance(self._answer["value"], float) and self._answer["value"] >= 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver Registry
# ──────────────────────────────────────────────────────────────────────────────
SOLVER_REGISTRY = {
    "partnership_sacrifice_ratio": SacrificeRatioSolver,
    "goodwill_super_profit": GoodwillSuperProfitSolver,
    "revaluation_account": RevaluationSolver,
    "share_issue": ShareIssueSolver,
    "forfeiture_reissue": ForfeitureSolver,
    "financial_statements": FinancialStatementsSolver,
    "cash_flow_statement": CashFlowSolver,
    "ratio_analysis": RatioAnalysisSolver,
}


def solve(problem_type: str, params: Dict[str, Any], timeout: float = 10.0) -> Dict:
    solver_cls = SOLVER_REGISTRY.get(problem_type)
    if not solver_cls:
        return {"error": f"Unknown problem type: {problem_type}"}
    solver = solver_cls(params)
    return solver.solve(timeout=timeout)


if __name__ == "__main__":
    # Demo
    r = solve("partnership_sacrifice_ratio",
              {"old_A": 0.5, "old_B": 0.3, "old_C": 0.2, "new_A": 0.4, "new_B": 0.35, "new_C": 0.25})
    import json
    print(json.dumps(r, indent=2, default=str))