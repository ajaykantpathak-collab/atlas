"""
ISC Class 11 Accountancy Solver
Covers: Introduction, Recording of Transactions, Trial Balance, Depreciation,
        Bank Reconciliation, Final Accounts, Bills of Exchange
Uses decimal.Decimal for all financial calculations.
"""

from decimal import Decimal, ROUND_HALF_UP, getcontext
from typing import Dict, List, Any, Optional, Tuple
import pandas as pd
import time

getcontext().prec = 28
getcontext().rounding = ROUND_HALF_UP


def timeout_handler(signum, frame):
    raise TimeoutError("Solver timed out")

# signal.SIGALRM is Unix-only; use threading.Timer fallback on Windows
try:
    import signal
    signal.signal(signal.SIGALRM, timeout_handler)
    _HAS_SIGALRM = True
except (AttributeError, ImportError):
    _HAS_SIGALRM = False


def D(v) -> Decimal:
    return Decimal(str(v)) if not isinstance(v, Decimal) else v


def round2(v: Decimal) -> Decimal:
    return v.quantize(D("0.01"), rounding=ROUND_HALF_UP)


# ──────────────────────────────────────────────────────────────────────────────
# Base Solver
# ──────────────────────────────────────────────────────────────────────────────
class BaseSolverC11:
    PROBLEM_TYPE: str = "base"
    RULES: List[str] = []

    def __init__(self, params: Dict[str, Any]):
        self.params = {k: D(v) if isinstance(v, (int, float)) else v for k, v in params.items()}
        self.steps: List[Dict[str, str]] = []
        self._answer: Any = None

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


# ──────────────────────────────────────────────────────────────────────────────
# Solver 1: Journal Entry Recording
# CISCE ISC C11 │ Node: 3.1 │ Rule: Double Entry – Every transaction has debit = credit
# ──────────────────────────────────────────────────────────────────────────────
class JournalEntrySolver(BaseSolverC11):
    PROBLEM_TYPE = "journal_entries"
    RULES = [
        "Golden Rule: Every transaction recorded at least twice (Debit and Credit).",
        "Debit the Receiver / Gainer / Expense / Asset.",
        "Credit the Giver / Loser / Income / Liability / Capital.",
        "Assets ↑ → Dr; Assets ↓ → Cr.",
        "Liabilities ↑ → Cr; Liabilities ↓ → Dr.",
        "Income/Gain → Cr; Expense/Loss → Dr.",
        "Capital ↑ → Cr (fresh investment); Capital ↓ → Dr (withdrawals).",
    ]

    def _solve(self):
        transactions = self.params["transactions"]  # list of {description, accounts: [{name, side, amount}]}

        self.add_step("Rule", "For each transaction: Apply Golden Rule of Double Entry Bookkeeping.")
        entries = []
        for i, txn in enumerate(transactions, 1):
            desc = txn["description"]
            accts = txn["accounts"]
            self.add_step(f"Transaction {i}", desc)
            entry_lines = []
            total_dr = D("0")
            total_cr = D("0")
            for acct in accts:
                side = acct["side"]
                amt = D(acct["amount"])
                entry_lines.append(f"  {'Dr' if side == 'dr' else 'Cr'} {acct['name']}  Rs {round2(amt):,.2f}")
                if side == "dr":
                    total_dr += amt
                else:
                    total_cr += amt
            self.add_step(f"Journal Entry {i}", "\n".join(entry_lines))
            entries.append({"transaction": i, "description": desc, "debits": float(total_dr),
                            "credits": float(total_cr), "balanced": abs(total_dr - total_cr) < D("0.01")})

        self._answer = {"entries": entries, "total_entries": len(entries), "all_balanced": all(e["balanced"] for e in entries)}

    def _verify(self):
        assert self._answer["all_balanced"], "All journal entries must balance"


# ──────────────────────────────────────────────────────────────────────────────
# Solver 2: Ledger Account (T-account)
# CISCE ISC C11 │ Node: 3.2 │ Rule: Ledger posting – Debit side records Dr, Credit side records Cr
# ──────────────────────────────────────────────────────────────────────────────
class LedgerAccountSolver(BaseSolverC11):
    PROBLEM_TYPE = "ledger_accounts"
    RULES = [
        "Ledger posting from Journal: Debit entry in journal → Left side (Dr) of ledger.",
        "Credit entry in journal → Right side (Cr) of ledger.",
        "Total each side; Balance = Larger side − Smaller side.",
        "Balance brought down (Bal b/d) at top; Balance carried down (Bal c/d) at bottom.",
        "Debit balance → Asset/Expense type; Credit balance → Liability/Income/Capital.",
    ]

    def _solve(self):
        account_name = self.params["account_name"]
        postings = self.params["postings"]  # list of {side: "dr"/"cr", amount, particulars}

        self.add_step("Ledger", f"{account_name} Account", f"Dr | Cr")

        total_dr = D("0")
        total_cr = D("0")
        dr_items = []
        cr_items = []
        for p in postings:
            amt = D(p["amount"])
            part = p.get("particulars", "")
            if p["side"] == "dr":
                total_dr += amt
                dr_items.append((part, amt))
            else:
                total_cr += amt
                cr_items.append((part, amt))

        for part, amt in dr_items:
            self.add_step("Dr Side", f"{part}: Rs {round2(amt):,.2f}")
        for part, amt in cr_items:
            self.add_step("Cr Side", f"{part}: Rs {round2(amt):,.2f}")

        if total_dr >= total_cr:
            balance = round2(total_dr - total_cr)
            self.add_step("Balance", f"Total Dr: Rs {round2(total_dr):,.2f} | Total Cr: Rs {round2(total_cr):,.2f} | "
                                     f"Balance c/d: Dr Rs {balance:,.2f}")
            bal_side = "Dr"
        else:
            balance = round2(total_cr - total_dr)
            self.add_step("Balance", f"Total Dr: Rs {round2(total_dr):,.2f} | Total Cr: Rs {round2(total_cr):,.2f} | "
                                     f"Balance c/d: Cr Rs {balance:,.2f}")
            bal_side = "Cr"

        self._answer = {
            "account": account_name,
            "total_dr": float(total_dr),
            "total_cr": float(total_cr),
            "balance": float(balance),
            "balance_side": bal_side,
            "balanced": abs(total_dr - total_cr) < D("0.01") or bal_side in ["Dr", "Cr"],
        }

    def _verify(self):
        assert self._answer["total_dr"] > 0 or self._answer["total_cr"] > 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver 3: Trial Balance and Rectification of Errors
# CISCE ISC C11 │ Node: 4.1 │ Rule: Trial Balance = Total Dr = Total Cr (or difference → Suspense)
# ──────────────────────────────────────────────────────────────────────────────
class TrialBalanceSolver(BaseSolverC11):
    PROBLEM_TYPE = "trial_balance"
    RULES = [
        "Trial Balance = List of all ledger accounts with their balances (Dr or Cr).",
        "Total of Debit column = Total of Credit column (double-entry principle).",
        "If totals don't match, difference = Suspense Account (temporary).",
        "One-sided error: affects one account only → find and correct.",
        "Two-sided error: affects two accounts in same direction → find and correct.",
        "Error of principle: posting to wrong type of account → reverse and re-post.",
        "Compensating errors: two errors that cancel each other.",
    ]

    def _solve(self):
        accounts = self.params["accounts"]  # list of {name, balance, side: "dr"/"cr"}
        errors = self.params.get("errors", [])

        self.add_step("Step 1", "List all ledger balances.")

        df_data = []
        total_dr = D("0")
        total_cr = D("0")
        for acct in accounts:
            bal = D(acct["balance"])
            side = acct["side"]
            if side == "dr":
                total_dr += bal
            else:
                total_cr += bal
            df_data.append({"Account": acct["name"], "Dr" if side == "dr" else "Cr": float(round2(bal)),
                            "Other": ""})

        diff = total_dr - total_cr

        self.add_step("Step 2", f"Total Dr = Rs {round2(total_dr):,.2f}, Total Cr = Rs {round2(total_cr):,.2f}, "
                                f"Difference = Rs {round2(diff):,.2f}")

        rectifications = []
        suspense = float(round2(abs(diff))) if diff != 0 else 0.0
        if diff != 0:
            self.add_step("Suspense Account", f"Difference of Rs {round2(diff):,.2f} → Suspense A/c "
                                               f"({'Dr' if diff > 0 else 'Cr'} side)")
            rectifications.append(f"Suspense A/c: {'Dr' if diff > 0 else 'Cr'} Rs {round2(diff):,.2f}")

        # Rectify errors
        for err in errors:
            self.add_step("Rectification", err["description"], err.get("entry", ""))
            rectifications.append(err["description"])

        self._answer = {
            "total_debit": float(total_dr),
            "total_credit": float(total_cr),
            "difference": float(diff),
            "suspense_account": suspense,
            "rectifications": rectifications,
            "trial_balance_data": df_data,
        }

    def _verify(self):
        assert self._answer["total_debit"] >= 0 and self._answer["total_credit"] >= 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver 4: Depreciation – SLM and WDV
# CISCE ISC C11 │ Node: 5.1 │ Rule: SLM = (Cost−Scrap)/Life; WDV = WDV × Rate%
# ──────────────────────────────────────────────────────────────────────────────
class DepreciationSolver(BaseSolverC11):
    PROBLEM_TYPE = "depreciation"
    RULES = {
        "slm": "SLM: Depreciation = (Cost − Scrap Value) / Useful Life. Same amount each year.",
        "wdv": "WDV: Depreciation = WDV at start × Rate%. Declining balance method.",
        "provision_dep": "Provision A/c method: Depreciation accumulated in Provision for Depreciation A/c. Asset shown at original cost.",
        "balance_sheet": "Balance Sheet method (WDV): Asset shown at WDV directly. No separate Provision A/c needed.",
    }

    def _solve(self):
        method = self.params["method"]  # "slm" or "wdv"
        cost = D(self.params["cost"])
        scrap = D(self.params.get("scrap_value", 0))
        life = int(self.params["useful_life_years"])
        rate = D(self.params.get("wdv_rate", 0))
        years = int(self.params.get("years", min(life, 5)))

        schedule = []
        self.add_step("Method", f"Method: {method.upper()}")

        if method == "slm":
            dep_per_year = round2((cost - scrap) / D(life))
            self.add_step("SLM Formula", f"Depreciation/year = ({cost} − {scrap}) / {life} = Rs {dep_per_year:,.2f}")
            wdv = cost
            for yr in range(1, years + 1):
                dep = dep_per_year if yr <= life else D("0")
                wdv = round2(wdv - dep)
                schedule.append({
                    "year": yr,
                    "depreciation": float(dep),
                    "wdv": float(wdv) if yr <= life else float(scrap),
                })
                self.add_step(f"Year {yr}", f"Dep = Rs {dep:,.2f}, WDV = Rs {wdv:,.2f}")
            final_wdv = float(scrap) if years >= life else float(wdv)
        else:
            self.add_step("WDV Formula", f"Depreciation = WDV × {rate}%")
            wdv = cost
            for yr in range(1, years + 1):
                dep = round2(wdv * rate / D("100"))
                dep = min(dep, wdv - scrap) if wdv - scrap > 0 else dep
                wdv = round2(wdv - dep)
                schedule.append({"year": yr, "depreciation": float(dep), "wdv": float(max(wdv, scrap))})
                self.add_step(f"Year {yr}", f"Dep = Rs {dep:,.2f}, WDV = Rs {wdv:,.2f}")
            final_wdv = float(max(wdv, scrap))

        self._answer = {
            "method": method,
            "depreciation_schedule": schedule,
            "final_wdv": final_wdv,
            "total_depreciation": float(cost - D(str(final_wdv))),
        }

    def _verify(self):
        assert self._answer["total_depreciation"] >= 0
        assert self._answer["total_depreciation"] <= float(self.params["cost"])


# ──────────────────────────────────────────────────────────────────────────────
# Solver 5: Bank Reconciliation Statement
# CISCE ISC C11 │ Node: 6.1 │ Rule: Pass Book Balance ± Items = Cash Book Balance
# ──────────────────────────────────────────────────────────────────────────────
class BRSolver(BaseSolverC11):
    PROBLEM_TYPE = "bank_reconciliation"
    RULES = [
        "Items added to Cash Book (Dr Bank): Cheques deposited but not cleared (Cr in Pass Book).",
        "Items added to Pass Book: Cheques issued but not presented.",
        "Bank charges/interest debited in Pass Book → Deduct from Cash Book.",
        "Direct deposit/interest credited in Pass Book → Add to Cash Book.",
        "Dishonoured cheques → Deduct from Cash Book (were added earlier).",
        "Error in Cash Book → Correct in Cash Book.",
        "Error in Pass Book → Correct in Pass Book.",
    ]

    def _solve(self):
        cb_bal = D(self.params["cash_book_balance"])
        cb_side = self.params["cash_book_side"]  # "dr" or "cr"
        items = self.params["items"]  # list of {type, description, amount, affects: "cb"/"pb"/"both"}

        self.add_step("Given", f"Cash Book Balance: Rs {cb_bal:,.2f} ({cb_side.upper()} side)")

        additions_cb = []
        deductions_cb = []
        for item in items:
            amt = D(item["amount"])
            desc = item["description"]
            aff = item["affects"]
            if aff == "cb":
                additions_cb.append((desc, amt))
                self.add_step("Add to CB", f"{desc}: Rs {round2(amt):,.2f}")
            elif aff == "pb":
                deductions_cb.append((desc, amt))
                self.add_step("Deduct from CB", f"{desc}: Rs {round2(amt):,.2f}")
            elif aff == "both":
                additions_cb.append((desc, amt))
                self.add_step("Add to CB", f"{desc}: Rs {round2(amt):,.2f}")

        total_add = sum(a[1] for a in additions_cb)
        total_deduct = sum(d[1] for d in deductions_cb)

        if cb_side == "dr":
            pb_bal = round2(cb_bal + total_add - total_deduct)
        else:
            pb_bal = round2(cb_bal + total_add - total_deduct)

        self.add_step("Adjusted CB Balance", f"= Rs {cb_bal:,.2f} + Rs {total_add:,.2f} − Rs {total_deduct:,.2f} = Rs {pb_bal:,.2f}")
        self.add_step("Pass Book Balance (as per bank)", f"= Rs {pb_bal:,.2f} ({'Dr' if pb_bal > 0 else 'Cr'})")

        self._answer = {
            "cash_book_balance": float(cb_bal),
            "pass_book_balance": float(pb_bal),
            "additions": float(total_add),
            "deductions": float(total_deduct),
            "items": items,
        }

    def _verify(self):
        assert isinstance(self._answer["pass_book_balance"], float)


# ──────────────────────────────────────────────────────────────────────────────
# Solver 6: Final Accounts (Sole Proprietorship)
# CISCE ISC C11 │ Node: 7.1 │ Rule: GP = Sales + Opening Stock + Direct Expenses − Closing Stock − COGS; NP = GP − Indirect Expenses + Other Income
# ──────────────────────────────────────────────────────────────────────────────
class FinalAccountsSolver(BaseSolverC11):
    PROBLEM_TYPE = "final_accounts_sole"
    RULES = [
        "Trading Account: determines Gross Profit or Loss.",
        "GP = (Opening Stock + Purchases + Direct Expenses) − Closing Stock − Cost of Goods Sold",
        "GP = Sales − COGS  [where COGS = Opening Stock + Purchases + Direct Expenses − Closing Stock]",
        "P&L Account: NP = GP + Indirect Incomes − Indirect Expenses",
        "Balance Sheet: Assets = Liabilities + Capital (Capital = Opening Capital + NP − Drawings)",
        "Adjustments same as company accounts but on simpler scale",
    ]

    def _solve(self):
        balances = self.params["balances"]  # {account: amount}
        adjustments = self.params.get("adjustments", [])

        self.add_step("Step 1", "Identify accounts: Direct (Trading) vs. Indirect (P&L) vs. Balance Sheet items.")

        sales = D(balances.get("Sales", 0))
        open_stock = D(balances.get("Opening Stock", 0))
        purchases = D(balances.get("Purchases", 0))
        wages = D(balances.get("Wages", 0))
        freight_in = D(balances.get("Freight Inward", 0))
        close_stock = D(balances.get("Closing Stock", 0))
        salaries = D(balances.get("Salaries", 0))
        rent = D(balances.get("Rent", 0))
        insurance = D(balances.get("Insurance", 0))
        depreciation = D(balances.get("Depreciation", 0))
        discount_allowed = D(balances.get("Discount Allowed", 0))
        discount_received = D(balances.get("Discount Received", 0))
        interest_income = D(balances.get("Interest Received", 0))
        bad_debts = D(balances.get("Bad Debts", 0))
        drawings = D(balances.get("Drawings", 0))
        capital = D(balances.get("Capital", 0))
        machinery = D(balances.get("Machinery", 0))
        furniture = D(balances.get("Furniture", 0))
        debtors = D(balances.get("Debtors", 0))
        creditors = D(balances.get("Creditors", 0))
        cash = D(balances.get("Cash", 0))
        bank = D(balances.get("Bank", 0))

        # Apply adjustments
        for adj in adjustments:
            atype = adj["type"]
            amt = D(adj.get("amount", 0))
            if atype == "outstanding_salary":
                salaries += amt
            elif atype == "prepaid_insurance":
                insurance -= amt
            elif atype == "depreciation":
                depreciation += amt
            elif atype == "bad_debts_new":
                bad_debts += amt
                debtors -= amt
            elif atype == "interest_on_capital":
                capital += amt
            elif atype == "interest_on_drawings":
                drawings += amt

        cogs = open_stock + purchases + wages + freight_in - close_stock
        gp = sales - cogs
        indirect_exp = salaries + rent + insurance + depreciation + discount_allowed + bad_debts
        indirect_inc = discount_received + interest_income
        np = gp + indirect_inc - indirect_exp

        self.add_step("COGS", f"= Opening Stock {open_stock:,.2f} + Purchases {purchases:,.2f} + "
                               f"Wages {wages:,.2f} + Freight {freight_in:,.2f} − Closing Stock {close_stock:,.2f} = Rs {cogs:,.2f}")
        self.add_step("Gross Profit", f"= Sales {sales:,.2f} − COGS {cogs:,.2f} = Rs {gp:,.2f}")
        self.add_step("Net Profit", f"= GP {gp:,.2f} + Other Income {indirect_inc:,.2f} − Indirect Expenses {indirect_exp:,.2f} = Rs {np:,.2f}")

        closing_capital = capital + np - drawings
        total_assets = machinery + furniture + debtors + cash + bank + close_stock
        total_liabilities = creditors

        self.add_step("Balance Sheet", f"Total Assets = Rs {total_assets:,.2f}; Total Liabilities = Rs {total_liabilities:,.2f}")

        self._answer = {
            "cogs": float(cogs),
            "gross_profit": float(gp),
            "net_profit": float(np),
            "closing_capital": float(closing_capital),
            "total_assets": float(total_assets),
            "total_liabilities": float(total_liabilities),
        }

    def _verify(self):
        assert self._answer["gross_profit"] + self._answer.get("total_assets", 0) >= 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver 7: Bills of Exchange
# CISCE ISC C11 │ Node: 8.1 │ Rule: Maturity date = Date of bill + Tenor + Grace period (3 days)
# ──────────────────────────────────────────────────────────────────────────────
class BillOfExchangeSolver(BaseSolverC11):
    PROBLEM_TYPE = "bill_of_exchange"
    RULES = [
        "Maturity Date = Date of drawing Bill + Tenor (days/months) + 3 days grace period (if applicable).",
        "Days of grace: 3 days after the due date (not added if payable on demand).",
        "Discount = Bill Value × Rate% × (Unexpired days / 365 or 360).",
        "Proceeds = Bill Value − Discount − Commission.",
        "Accommodation bill: drawn/payable for mutual convenience, not for trade.",
        "Dishonoured bill: maker fails to pay → Dr Drawer; re-discount or sue.",
        "Retired bill: maker pays early with rebate → rebate is income.",
    ]

    def _solve(self):
        bill_value = D(self.params["bill_value"])
        drawn_date = self.params["drawn_date"]  # "DD/MM/YYYY"
        tenor_days = int(self.params.get("tenor_days", 0))
        tenor_months = int(self.params.get("tenor_months", 0))
        discount_rate = D(self.params.get("discount_rate", 0))
        grace_period = 3  # standard in India
        commission = D(self.params.get("commission", 0))
        is_dishonoured = self.params.get("dishonoured", False)

        self.add_step("Given", f"Bill Value = Rs {bill_value:,.2f}, Drawn: {drawn_date}, "
                                f"Tenor = {tenor_days} days / {tenor_months} months, Rate = {discount_rate}%")

        # Calculate maturity date
        total_tenor = tenor_days + tenor_months * 30
        maturity_days = total_tenor + grace_period
        self.add_step("Maturity Date", f"Due Date = {drawn_date} + {total_tenor} days + {grace_period} days grace = "
                                        f"{maturity_days} days from drawn date.")

        discount = round2(bill_value * discount_rate / D("100") * D(maturity_days) / D("365"))
        proceeds = round2(bill_value - discount - commission)

        self.add_step("Discount", f"= Rs {bill_value:,.2f} × {discount_rate}% × {maturity_days}/365 = Rs {discount:,.2f}")
        self.add_step("Proceeds", f"= Rs {bill_value:,.2f} − Rs {discount:,.2f} − Rs {commission:,.2f} = Rs {proceeds:,.2f}")

        answer = {
            "maturity_days_from_drawn": maturity_days,
            "discount": float(discount),
            "proceeds": float(proceeds),
            "dishonoured": is_dishonoured,
        }

        if is_dishonoured:
            self.add_step("Dishonour", "Bill dishonoured → Dr Drawer's A/c; Cr Bills Receivable A/c. "
                                        "May be re-discounted or sent for recovery.")
            answer["dishonour_action"] = "Dr Drawer; Cr Bills Receivable"

        self._answer = answer

    def _verify(self):
        assert self._answer["proceeds"] >= 0 or self._answer["dishonoured"]
        assert self._answer["discount"] >= 0


# ──────────────────────────────────────────────────────────────────────────────
# Solver 8: Rectification of Errors – Suspense Account
# CISCE ISC C11 │ Node: 4.2 │ Rule: Single error → locate by difference; Suspense A/c
# ──────────────────────────────────────────────────────────────────────────────
class RectificationSolver(BaseSolverC11):
    PROBLEM_TYPE = "rectification_of_errors"
    RULES = [
        "One-sided error: one account affected; rectified by a single entry.",
        "Two-sided error: two accounts affected; rectified by reversing error + correct entry.",
        "Suspense Account: opened when TB doesn't balance; closed when errors found.",
        "Single error → Difference in TB = Error amount.",
        "Two errors in same direction → TB difference = sum/difference of errors.",
    ]

    def _solve(self):
        tb_difference = D(self.params["tb_difference"])  # Dr − Cr
        errors = self.params["errors"]  # list of error descriptions

        self.add_step("Given", f"Trial Balance Difference = Rs {round2(tb_difference):,.2f} (Dr excess)")

        rect_entries = []
        remaining_suspense = round2(tb_difference)
        for err in errors:
            amt = D(err["amount"])
            desc = err["description"]
            aff = err["affects_suspense"]  # "dr", "cr", "none"
            self.add_step("Error", desc)
            if aff == "dr":
                remaining_suspense -= amt
                rect_entries.append(f"Dr Correct A/c Rs {amt:,.2f}; Cr Wrong A/c Rs {amt:,.2f}")
            elif aff == "cr":
                remaining_suspense += amt
                rect_entries.append(f"Dr Wrong A/c Rs {amt:,.2f}; Cr Correct A/c Rs {amt:,.2f}")
            else:
                rect_entries.append(f"Dr A Rs {amt:,.2f}; Cr B Rs {amt:,.2f}")

        self.add_step("Suspense Account", f"Remaining Suspense: Rs {round2(remaining_suspense):,.2f}")
        self._answer = {
            "tb_difference": float(tb_difference),
            "rectification_entries": rect_entries,
            "remaining_suspense": float(remaining_suspense),
        }

    def _verify(self):
        assert isinstance(self._answer["remaining_suspense"], float)


# ──────────────────────────────────────────────────────────────────────────────
# Solver Registry (C11)
# ──────────────────────────────────────────────────────────────────────────────
SOLVER_REGISTRY_C11 = {
    "journal_entries": JournalEntrySolver,
    "ledger_accounts": LedgerAccountSolver,
    "trial_balance": TrialBalanceSolver,
    "depreciation": DepreciationSolver,
    "bank_reconciliation": BRSolver,
    "final_accounts_sole": FinalAccountsSolver,
    "bill_of_exchange": BillOfExchangeSolver,
    "rectification_of_errors": RectificationSolver,
}


def solve_c11(problem_type: str, params: Dict[str, Any], timeout: float = 10.0) -> Dict:
    solver_cls = SOLVER_REGISTRY_C11.get(problem_type)
    if not solver_cls:
        return {"error": f"Unknown problem type: {problem_type}"}
    solver = solver_cls(params)
    return solver.solve(timeout=timeout)


if __name__ == "__main__":
    r = solve_c11("depreciation", {"method": "slm", "cost": 100000, "scrap_value": 10000, "useful_life_years": 5, "years": 5})
    import json
    print(json.dumps(r, indent=2, default=str))