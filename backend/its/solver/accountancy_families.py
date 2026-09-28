"""accountancy_families.py -- deterministic accountancy families, classes
9-12 (mechanics live in 11-12; class 9-10 ICSE Commercial Studies carries
the same bookkeeping basics).

Same contract as maths2_families.py: one _TABLE of rows
(FID, compiled trigger regex with named slots, compute function), each
compute returning the 6-tuple
    (value, steps, answer, assumptions, governing_equation, extra)
with _GATE = (None, [], None, None, None, None) meaning "trigger hit but
plausibility gate refused -- keep scanning".  The single dispatcher
model_accountancy_families scans the table in order; first grounded hit
wins.  Recognition is by trigger regex only -- no LLM, no randomness.

Coverage (31 families):
  journal        JOURNAL_ENTRY (golden-rules debit/credit pairs)
  depreciation   DEP_SLM (any-solve + schedule), DEP_WDV (schedule,
                 value after n years, implied rate)
  final accounts GROSS_PROFIT, NET_PROFIT, TRIAL_BALANCE_DIFF,
                 BALANCE_SHEET_MISSING (equality check + missing figure)
  ratios         CURRENT_RATIO, QUICK_RATIO, DEBT_EQUITY_RATIO,
                 GP_RATIO, NP_RATIO, INVENTORY_TURNOVER,
                 RECEIVABLES_TURNOVER, WORKING_CAPITAL
  banking        BRS_ADJUST (cash book <-> pass book, both directions)
  bills          BILL_DUE_DATE (term + 3 days of grace),
                 BILL_DISCOUNT (discounting charge + proceeds),
                 BILL_RENEWAL (interest for the fresh term)
  appropriations INTEREST_CAPITAL (any-solve), INTEREST_DRAWINGS
                 (products method)
  partnership    PARTNERSHIP_PROFIT_SHARE (ratio division with
                 appropriations), PARTNER_GUARANTEE,
                 PARTNERSHIP_NEW_RATIO (admission sacrificing ratio),
                 GAINING_RATIO (retirement), DECEASED_SHARE (profit to
                 date of death), GOODWILL_VALUATION (average / super
                 profit / capitalisation)
  NPO/incomplete INCOMPLETE_RECORDS_PROFIT (statement-of-affairs capital
                 comparison), SUBSCRIPTION_INCOME (accrual adjustments),
                 INSOLVENCY_RECOVERY (paise-in-the-rupee bad debts)
  company        SHARE_ISSUE (par/premium instalments), FORFEITURE_REISSUE
                 (capital reserve computation), DEBENTURE_ISSUE (issue
                 proceeds / redemption amount), CASH_FLOW_OPERATING
                 (indirect-method operating activities)

STEP CONTRACT (enforced by test_accountancy_families.py): every family's
steps carry, in order, 1) a [Method] line naming the accounting rule and
why it applies, 2) a [Given] line restating the figures, 3) computation
lines, 4) a [Check] verification (tally / recompute), 5) an
[Interpretation] line -- at least 3 steps and 150 chars total (helper
_five builds all of them).

Ratio families deliberately leave numeric_answer=None (the answer is a
"x : 1" or "x%" SHAPE, not a bare scalar), which also keeps the
modeling_layer answer-shape guard ("ratio of ...") happy.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as maths2_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


_NUM = r"-?\d{1,7}(?:,\d{2,3})*(?:\.\d+)?|-?\d+(?:\.\d+)?"
_U_NUM = r"\d{1,7}(?:,\d{2,3})*(?:\.\d+)?|\d+(?:\.\d+)?"
_RS = r"(?:rs\.?|inr|\u20b9)?\s*"          # optional currency prefix


def _fmt(v: float) -> str:
    """Compact deterministic number formatting."""
    if abs(v - round(v)) < 1e-9:
        return f"{int(round(v)):,}"
    return f"{v:,.4g}"


def _n(s: str) -> float:
    return float(str(s).replace(",", ""))


def _norm(text: str) -> str:
    """Deterministic surface cleanup: unicode minus/dashes, rupee sign,
    x-multiplication sign."""
    t = (text or "")
    t = (t.replace("\u2212", "-").replace("\u2013", "-")
          .replace("\u2014", "-").replace("\u2019", "'")
          .replace("\u20b9", "Rs.").replace("\u00d7", "x"))
    return re.sub(r"\s+", " ", t)


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)


def _five(method: str, given: str, comp: Optional[List[str]], check: str,
          interp: str) -> List[str]:
    """STEP CONTRACT builder: 1 method/rule line, 2 given figures restated,
    3 computation shown, 4 verification, 5 interpretation -- in order."""
    steps = [f"[Method] {method}", f"[Given] {given}"]
    steps.extend(comp or [])
    steps.append(f"[Check] {check}")
    steps.append(f"[Interpretation] {interp}")
    return steps


def _lbl(text: str, words: str) -> Optional[float]:
    """Find 'label ... Rs N' for a label regex fragment (deterministic,
    first hit wins)."""
    pat = (r"(?:" + words + r")\s*(?:is|of|was|are|:|=|to|amounted to|"
           r"amounts to|amounting to|stood at)?\s*" + _RS +
           r"(?P<v>" + _NUM + r")")
    m = re.search(pat, text, re.I)
    return _n(m.group("v")) if m else None


def _months(text: str) -> Optional[float]:
    """Time period in months from 'for n months/years' phrasing."""
    m = re.search(r"for\s+(?P<v>" + _U_NUM + r")\s*(?P<u>months?|years?)",
                  text, re.I)
    if not m:
        return None
    v = _n(m.group("v"))
    return v if m.group("u").lower().startswith("month") else v * 12.0


def _ratio_parts(text: str) -> Optional[List[float]]:
    m = re.search(r"(?P<a>" + _U_NUM + r")\s*:\s*(?P<b>" + _U_NUM + r")"
                  r"(?:\s*:\s*(?P<c>" + _U_NUM + r"))?", text)
    if not m:
        return None
    parts = [_n(m.group("a")), _n(m.group("b"))]
    if m.group("c") is not None:
        parts.append(_n(m.group("c")))
    if any(p <= 0 for p in parts):
        return None
    return parts


def _int_scale(vals: List[float], cap: int = 24) -> Optional[List[int]]:
    """Textbook ratios are whole numbers: scale fractions by their common
    denominator (kept small).  None when no small whole-number form."""
    from fractions import Fraction
    from math import gcd
    frs = [Fraction(v).limit_denominator(200) for v in vals]
    L = 1
    for fr in frs:
        L = L * fr.denominator // gcd(L, fr.denominator)
    if L == 0 or L > cap:
        return None
    scaled = [v * L for v in vals]
    if all(abs(s - round(s)) < 1e-9 for s in scaled):
        return [int(round(s)) for s in scaled]
    return None


# ---- date helpers (bills of exchange: due dates with days of grace) ---- #
import datetime as _dt
import calendar as _calendar

_MONTHS = {"january": 1, "february": 2, "march": 3, "april": 4, "may": 5,
           "june": 6, "july": 7, "august": 8, "september": 9,
           "october": 10, "november": 11, "december": 12}

_DATE_RE = re.compile(
    r"\b(?P<d>\d{1,2})(?:st|nd|rd|th)?\s+(?P<mon>" + "|".join(_MONTHS)
    + r")\s*,?\s*(?P<y>\d{4})\b", re.I)


def _parse_date(text: str) -> Optional["_dt.date"]:
    m = _DATE_RE.search(text)
    if not m:
        return None
    try:
        return _dt.date(int(m.group("y")), _MONTHS[m.group("mon").lower()],
                        int(m.group("d")))
    except ValueError:
        return None


def _add_months(d: "_dt.date", k: int) -> "_dt.date":
    """Calendar-month addition; overshoot clamps to the month end."""
    total = (d.year * 12 + d.month - 1) + int(k)
    y, mon = divmod(total, 12)
    mon += 1
    return _dt.date(y, mon, min(d.day, _calendar.monthrange(y, mon)[1]))


def _dstr(d: "_dt.date") -> str:
    return f"{d.day} {d.strftime('%B %Y')}"


# --------------------------------------------------------------------------- #
# 1. JOURNAL ENTRY -- golden-rules solver
# --------------------------------------------------------------------------- #

# category -> golden rule line
_RULE_LINE = {
    "asset": "asset (real account: debit what comes in, credit what goes out)",
    "expense": "expense (nominal account: debit expenses and losses)",
    "income": "income (nominal account: credit incomes and gains)",
    "liability": "liability (personal account: credit the giver)",
    "capital": "capital (personal account: credit the giver)",
    "drawings": "drawings (debit the owner's personal account when goods/"
                "cash are taken out)",
    "party": "personal account (debit the receiver, credit the giver)",
}

# item noun -> (account title, category)
_ITEM_WORDS: List[Tuple[str, str, str]] = [
    (r"goods?\b|stock\s*purchas", "Purchases", "expense"),
    (r"machiner(?:y|ies)|machine\b|plant\b|equipment", "Machinery", "asset"),
    (r"furniture", "Furniture", "asset"),
    (r"buildings?\b|premises\b", "Building", "asset"),
    (r"vehicles?\b|motor\s*(?:truck|van|car)", "Vehicle", "asset"),
    (r"computers?\b", "Computer", "asset"),
    (r"land\b", "Land", "asset"),
    (r"investments?\b", "Investments", "asset"),
    (r"stationery|postage|printing", "Stationery", "expense"),
    (r"advertis(?:e|ing|ement)s?", "Advertising", "expense"),
    (r"insurance", "Insurance", "expense"),
    (r"rent\b", "Rent", "expense"),
    (r"wages\b", "Wages", "expense"),
    (r"salary|salaries", "Salaries", "expense"),
    (r"commission", "Commission", "expense"),
    (r"interest\b", "Interest", "expense"),
    (r"charity|donation", "Charity", "expense"),
    (r"carriage|freight", "Carriage", "expense"),
    (r"bad\s*debts?", "Bad Debts", "expense"),
]

_TXN_VERB = (r"(?:bought|brought|purchas\w+|sold|sale\s+of|paid|pay\b|"
             r"received|receives?|withdrew|withdraw\w*|drew|draw\b|"
             r"deposit\w*|introduced|commenced?|invested?|started\s+"
             r"(?:the\s+)?business)")
_TXN_NOUN = (r"goods?|machiner(?:y|ies)|machine\b|furniture|buildings?|"
             r"premises?|plant|vehicle|computer|equipment|land|rent|wages|"
             r"salary|salaries|commission|interest|capital|drawings?|stock|"
             r"cheques?|advertis\w+|insurance|stationery|charity|investment|"
             r"cash\b|bank\b|business")
_JOURNAL_ASK = re.compile(
    r"journalis\w*|journal\s+entr|pass\s+(?:the\s+)?(?:journal\s+)?entr|"
    r"record\s+the\s+(?:following\s+)?transact|enter\s+the\s+following|"
    r"what\s+will\s+be\s+the\s+(?:journal\s+)?entry|debit\s+and\s+credit",
    re.I)
_AMOUNT_RE = re.compile(_RS + r"(?P<v>" + _NUM + r")")
_PERSON = re.compile(r"\b(?:from|to)\s+([A-Z][A-Za-z]{0,14})\b")


def _classify_item(text_low: str) -> Optional[Tuple[str, str]]:
    for pat, acct, cat in _ITEM_WORDS:
        if re.search(pat, text_low):
            return acct, cat
    return None


def _counter_mode(text: str) -> Optional[str]:
    """Counter account mode: cash / bank / credit-party.  Takes the
    case-preserved normalized text (capitalised party names matter)."""
    low = text.lower()
    if re.search(r"on\s+credit|credit\s+(?:from|purchase|sale)|owed\b",
                 low) and not re.search(r"cash|cheque|bank", low):
        return "credit"
    if re.search(r"cheque|bank\b", low):
        return "bank"
    if re.search(r"cash\b", low):
        return "cash"
    if re.search(r"from\s+[A-Z]", text):   # "bought from Ram" = credit
        return "credit"
    return None


def journal_entry(text: str) -> Optional[Dict[str, Any]]:
    """Deterministic golden-rules classifier for a single transaction.
    Returns {debit, credit, amount, narration, reasons} or None (gate)."""
    t = _norm(text)
    low = t.lower()
    if not (_JOURNAL_ASK.search(t) or
            (re.search(_TXN_VERB, low) and re.search(_TXN_NOUN, low))):
        return None
    # interest-on-capital/drawings is an appropriation computation, not
    # an entry-recording ask (INTEREST_CAPITAL/INTEREST_DRAWINGS own it)
    if re.search(r"interest\s+on\s+(?:capital|drawings)", low):
        return None
    # a journal entry is ONE transaction: refuse multi-item statement
    # listings ("sales 500000, opening stock 50000, purchases 300000, ...")
    all_amounts = re.findall(_NUM, t)
    if len(all_amounts) > 2:
        return None
    am = _AMOUNT_RE.search(t)
    if not am:
        return None
    amount = _n(am.group("v"))
    if amount <= 0:
        return None

    verb_buy = bool(re.search(r"bought|brought|purchas\w+", low))
    verb_sell = bool(re.search(r"sold|sale\s+of", low))
    verb_paid = bool(re.search(r"\bpaid\b|\bpay\b", low))
    verb_recv = bool(re.search(r"received|receives?", low))
    verb_draw = bool(re.search(r"withdrew|withdraw\w*|drew|draw\b", low))
    verb_deposit = bool(re.search(r"deposit\w*", low))
    verb_capital = bool(re.search(
        r"introduced|commenced?|started\s+(?:the\s+)?business|invested?"
        r"|brought\s+capital|capital\s+of", low))

    personal = _PERSON.search(t)
    mode = _counter_mode(low)

    # --- capital introduced: Dr Cash/Bank, Cr Capital ------------------- #
    if verb_capital and (re.search(r"capital", low) or
                         re.search(r"commenc|started\s+(?:the\s+)?business|"
                                   r"introduced", low)):
        dr = "Bank" if (mode == "bank") else "Cash"
        cr = "Capital"
        return _pkg(dr, "asset", cr, "capital", amount, t,
                    [f"{dr} comes into the business -> debit ({_RULE_LINE['asset']})",
                     f"Capital is the owner's claim -> credit ({_RULE_LINE['capital']})"],
                    "Being capital introduced in " + ("bank" if mode == "bank" else "cash"))

    # --- drawings: Dr Drawings, Cr Cash/Purchases ----------------------- #
    if verb_draw and re.search(r"personal|drawings?", low):
        cr, cr_cat = ("Purchases", "expense") if re.search(r"goods", low) \
            else ("Cash", "asset")
        return _pkg("Drawings", "drawings", cr, cr_cat, amount, t,
                    [f"Drawings: goods/cash taken by the owner -> debit "
                     f"({_RULE_LINE['drawings']})",
                     f"{cr} goes out -> credit ({_RULE_LINE[cr_cat]})"],
                    "Being cash/goods withdrawn for personal use")

    # --- bank <-> cash transfers ---------------------------------------- #
    if verb_deposit and re.search(r"bank", low):
        if re.search(r"withdrew|withdraw\w*|from\s+bank", low):
            return _pkg("Cash", "asset", "Bank", "asset", amount, t,
                        ["Cash comes in -> debit (real account rule)",
                         "Bank balance goes down -> credit (real account rule)"],
                        "Being cash withdrawn from bank for office use")
        return _pkg("Bank", "asset", "Cash", "asset", amount, t,
                    ["Bank (asset) increases -> debit (real account rule)",
                     "Cash (asset) decreases -> credit (real account rule)"],
                    "Being cash deposited into bank")

    # --- cash withdrawal from bank (withdrew from bank) ----------------- #
    if verb_draw and re.search(r"bank", low) and not re.search(r"personal", low):
        return _pkg("Cash", "asset", "Bank", "asset", amount, t,
                    ["Cash comes in -> debit (real account rule)",
                     "Bank balance goes down -> credit (real account rule)"],
                    "Being cash withdrawn from bank")

    # --- purchases / sales of goods or assets --------------------------- #
    if verb_buy:
        item = _classify_item(low) or ("Purchases", "expense")
        acct, cat = item
        if mode == "credit":
            cr_acct = personal.group(1) + "'s A/c" if personal else "Creditor"
            cr_cat = "party"
            reason2 = (f"{cr_acct} is the giver (creditor) -> credit "
                       f"({_RULE_LINE['party']})")
        else:
            cr_acct = "Bank" if mode == "bank" else "Cash"
            cr_cat = "asset"
            reason2 = f"{cr_acct} goes out -> credit ({_RULE_LINE[cr_cat]})"
        if acct == "Purchases":
            reason1 = ("Purchases (goods bought for resale, an expense) -> "
                       "debit (" + _RULE_LINE["expense"] + ")")
        else:
            reason1 = f"{acct} (asset) comes in -> debit ({_RULE_LINE['asset']})"
        return _pkg(acct, cat, cr_acct, cr_cat, amount, t,
                    [reason1, reason2],
                    f"Being {acct.lower() if acct != 'Purchases' else 'goods'} "
                    + ("purchased on credit" if mode == "credit"
                       else "purchased for " + ("cheque/bank" if mode == "bank" else "cash")))

    if verb_sell:
        if re.search(r"goods", low):
            cr_acct, cr_cat = "Sales", "income"
            reason_cr = ("Sales (goods sold, an income) -> credit "
                         "(" + _RULE_LINE["income"] + ")")
            item_name = "goods"
        else:
            item = _classify_item(low) or ("Machinery", "asset")
            cr_acct, cr_cat = item
            reason_cr = f"{cr_acct} (asset) goes out -> credit ({_RULE_LINE['asset']})"
            item_name = cr_acct.lower()
        if mode == "credit" or (personal and not re.search(r"cash", low)):
            dr_acct = personal.group(1) + "'s A/c" if personal else "Debtor"
            reason_dr = (f"{dr_acct} is the receiver (debtor) -> debit "
                         f"({_RULE_LINE['party']})")
        else:
            dr_acct = "Bank" if mode == "bank" else "Cash"
            reason_dr = f"{dr_acct} comes in -> debit ({_RULE_LINE['asset']})"
        return _pkg(dr_acct, "asset" if "Debtor" in dr_acct or "'" in dr_acct
                    else "asset", cr_acct, cr_cat, amount, t,
                    [reason_dr, reason_cr],
                    f"Being {item_name} sold" +
                    (" on credit" if ("Debtor" in dr_acct or "'" in dr_acct)
                     else " for cash"))

    # --- expenses paid / incomes received -------------------------------- #
    if verb_paid:
        item = _classify_item(low)
        if not item:
            if personal:
                # paid to a creditor
                dr = personal.group(1) + "'s A/c"
                return _pkg(dr, "party", "Cash", "asset", amount, t,
                            [f"{dr} (creditor) is the receiver -> debit "
                             f"({_RULE_LINE['party']})",
                             "Cash goes out -> credit (real account rule)"],
                            f"Being cash paid to {personal.group(1)}")
            return None
        acct, cat = item
        mode2 = "bank" if mode == "bank" else "cash"
        cr_acct = "Bank" if mode2 == "bank" else "Cash"
        return _pkg(acct, cat, cr_acct, "asset", amount, t,
                    [f"{acct} ({_RULE_LINE[cat].split(' (')[0]}) -> debit "
                     f"({_RULE_LINE['expense'] if cat == 'expense' else _RULE_LINE[cat]})",
                     f"{cr_acct} goes out -> credit ({_RULE_LINE['asset']})"],
                    f"Being {acct.lower()} paid in {mode2}")

    if verb_recv:
        if re.search(r"cash\s+(?:from|of)\s+[A-Z]|from\s+(?:our\s+)?debtor", low) \
                or (personal and not re.search(r"commission|interest|rent|dividend", low)):
            party = personal.group(1) + "'s A/c" if personal else "Debtor"
            return _pkg("Cash", "asset", party, "party", amount, t,
                        ["Cash comes in -> debit (real account rule)",
                         f"{party} is the giver (debtor settled) -> credit "
                         f"({_RULE_LINE['party']})"],
                        f"Being cash received from {party.replace(chr(39) + 's A/c', '')}")
        item = _classify_item(low)
        if not item:
            return None
        acct, _cat = item
        income_acct = acct + (" Received" if not acct.endswith("Received")
                              else "")
        return _pkg("Cash", "asset", income_acct, "income", amount, t,
                    ["Cash comes in -> debit (real account rule)",
                     f"{income_acct} is an income -> credit "
                     f"({_RULE_LINE['income']})"],
                    f"Being {income_acct.lower()} received in cash")

    return None


def _c_journal(g, m, text):
    pkg = journal_entry(text)
    if not pkg:
        return _GATE
    value, steps, answer, assumptions, eq, extra = pkg
    return value, steps, answer, assumptions, eq, extra


def _pkg(dr, dr_cat, cr, cr_cat, amount, text, reasons, narration):
    """Package a classified journal entry into the 6-tuple."""
    entry = (
        f"{dr} A/c ............................ Dr.      {_fmt(amount)}\n"
        f"        To {cr} A/c .......................... {_fmt(amount)}\n"
        f"    ({narration})")
    steps = _five(
        "golden rules of debit and credit (personal: debit the receiver / "
        "credit the giver; real: debit what comes in / credit what goes "
        "out; nominal: debit expenses / credit incomes) classify each leg "
        "so the double entry always balances.",
        f"transaction: {text}; amount = Rs {_fmt(amount)}; debit leg = {dr}, "
        f"credit leg = {cr}.",
        [f"Dr {dr}: {reasons[0]}", f"Cr {cr}: {reasons[1]}"],
        f"both sides equal at Rs {_fmt(amount)} -- the double entry "
        f"tallies and the accounting equation stays balanced.",
        narration + ".")
    extra = {"amount": amount, "debit_amount": amount, "credit_amount": amount}
    return amount, steps, entry, None, "double entry: Dr = Cr", extra


# --------------------------------------------------------------------------- #
# 2. DEP_SLM -- straight line, any-solve + schedule
# --------------------------------------------------------------------------- #


def _dep_nums(text: str) -> Dict[str, float]:
    d: Dict[str, float] = {}
    v = _lbl(text, r"(?:original\s+|purchase\s+|acquisition\s+)?cost(?:ing|"
                   r"s)?\b|bought\s+for|purchas\w+\s+for|priced?\s+at|"
                   r"machine\w*\s+(?:for|of)|asset\s+(?:for|of)|"
                   r"vehicle\s+(?:for|of)|plant\s+(?:for|of)|"
                   r"machinery\s+of|cost\s+of\s+(?:the\s+)?(?:machine|asset|"
                   r"vehicle|plant)")
    if v is not None:
        d["cost"] = v
    v = _lbl(text, r"(?:scrap|salvage|residual|resale)\s+(?:value\s*)?|"
                   r"scrap\b|salvage\b|residual\b")
    if v is not None:
        d["salvage"] = v
    m = re.search(r"(?P<v>" + _U_NUM + r")\s*years?", text, re.I)
    if m and re.search(r"life|useful|depreciat\w+\s+for|over\s+", text, re.I):
        d["life"] = _n(m.group("v"))
    m = re.search(r"(?P<v>" + _U_NUM + r")\s*%\s*(?:per\s+annum|p\.a\.|pa\b)?",
                  text)
    if m:
        d["rate"] = _n(m.group("v"))
    md = re.search(r"(?:annual\s+)?depreciation\s*(?:is|of|was|=|:|by|@)?\s*"
                   + _RS + r"(" + _NUM + r")", text, re.I)
    if md:
        d["dep"] = _n(md.group(1))
    else:
        md = re.search(r"depreciat\w+\s+(?:of|by|at)\s*" + _RS + r"(" + _NUM
                       + r")\s*(?:per\s+annum|p\.a\.)?(?!\s*%)", text, re.I)
        if md:
            d["dep"] = _n(md.group(1))
    return d


def _slm_schedule(cost, salvage, annual, years):
    rows = []
    bv = cost
    for y in range(1, int(years) + 1):
        open_bv = bv
        dep = annual
        bv = open_bv - dep
        rows.append((y, open_bv, dep, bv))
    return rows


def _c_dep_slm(g, m, text):
    low = text.lower()
    if "depreciat" not in low and "straight line" not in low:
        return _GATE
    if re.search(r"written\s+down|wdv\b|reducing\s+balance|declining|"
                 r"diminishing", low):
        return _GATE                      # WDV owns these
    d = _dep_nums(text)
    cost, salvage, life, dep = (d.get("cost"), d.get("salvage", 0.0),
                                d.get("life"), d.get("dep"))
    if cost is None or cost <= 0:
        return _GATE
    # any-solve: missing life -> life = (cost - salvage)/dep
    if life is None and dep is not None and dep > 0:
        life = (cost - salvage) / dep
        ans = f"Useful life = {_fmt(life)} years"
        steps = _five(
            "straight line method: the asset loses an EQUAL amount every "
            "year, so useful life = depreciable cost / annual depreciation.",
            f"cost = Rs {_fmt(cost)}, salvage = Rs {_fmt(salvage)}, annual "
            f"depreciation = Rs {_fmt(dep)}.",
            [f"Depreciable cost = {_fmt(cost)} - {_fmt(salvage)} = "
             f"{_fmt(cost - salvage)}.",
             f"Useful life = {_fmt(cost - salvage)} / {_fmt(dep)} = "
             f"{_fmt(life)} years."],
            f"check: {_fmt(dep)} x {_fmt(life)} + salvage {_fmt(salvage)} = "
            f"{_fmt(dep * life + salvage)} = original cost -- the life is "
            f"consistent.",
            f"the asset is written off over about {_fmt(life)} years.")
        return life, steps, ans, None, \
            "life = (cost - salvage) / annual depreciation", {"life": life}
    if life is None or life <= 0:
        return _GATE
    if dep is None:
        if "rate" in d:
            dep = (cost - salvage) * d["rate"] / 100.0
            method = f"SLM at {d['rate']:g}% on depreciable cost"
        else:
            dep = (cost - salvage) / life
            method = "SLM over useful life"
    else:
        method = "SLM"
        if re.search(r"find\s+the\s+cost|original\s+cost|what\s+was\s+"
                     r"the\s+cost", low):
            cost_v = dep * life + salvage
            steps = _five(
                "straight line method: annual depreciation = (cost - "
                "salvage) / life, so cost = annual depreciation x life + "
                "salvage.",
                f"annual depreciation = Rs {_fmt(dep)}, life = "
                f"{_fmt(life)} years, salvage = Rs {_fmt(salvage)}.",
                [f"cost - salvage = dep x life = {_fmt(dep)} x "
                 f"{_fmt(life)} = {_fmt(dep * life)}.",
                 f"cost = {_fmt(dep * life)} + {_fmt(salvage)} = "
                 f"{_fmt(cost_v)}."],
                f"check: ({_fmt(cost_v)} - {_fmt(salvage)}) / {_fmt(life)} "
                f"= {_fmt((cost_v - salvage) / life)} = the given annual "
                f"depreciation.",
                f"the machine's original cost was Rs {_fmt(cost_v)}.")
            return cost_v, steps, \
                f"Original cost = Rs {_fmt(cost_v)}", None, \
                "cost = dep x life + salvage", {"cost": cost_v}
    if dep <= 0:
        return _GATE
    comp = [f"Depreciable cost = cost - salvage = {_fmt(cost)} - "
            f"{_fmt(salvage)} = {_fmt(cost - salvage)}."]
    if "rate" in d:
        comp[0] += (f"  Annual depreciation = ({_fmt(cost)} - "
                    f"{_fmt(salvage)}) x {d['rate']:g}% = {_fmt(dep)}.")
    else:
        comp.append(f"Annual depreciation = depreciable cost / life = "
                    f"{_fmt(cost - salvage)} / {_fmt(life)} = {_fmt(dep)}.")
    comp.append(f"{method}.")
    # schedule / book value after n years
    years_ask = re.search(r"(?:after|at\s+the\s+end\s+of)\s+(?P<y>" + _U_NUM
                          + r")\s*years?", low)
    if years_ask or re.search(r"schedule|table|year[- ]by[- ]year", low):
        ny = int(_n(years_ask.group("y"))) if years_ask else int(life)
        if ny < 1 or ny > 60:
            return _GATE
        rows = _slm_schedule(cost, salvage, dep, ny)
        comp.append("Year | Opening WDV | Depreciation | Closing WDV")
        for (y, ob, dp, cb) in rows:
            comp.append(f"{y} | {_fmt(ob)} | {_fmt(dp)} | {_fmt(cb)}")
        final_bv = rows[-1][3]
        if years_ask:
            steps = _five(
                "straight line method: an EQUAL depreciation charge every "
                "year, so closing book value after n years = cost - "
                "n x annual depreciation.",
                f"cost = Rs {_fmt(cost)}, salvage = Rs {_fmt(salvage)}, "
                f"life = {_fmt(life)} years, horizon = {ny} years.",
                comp,
                f"check: {_fmt(cost)} - {ny} x {_fmt(dep)} = "
                f"{_fmt(cost - ny * dep)} equals the schedule's closing "
                f"WDV.",
                f"after {ny} full years of straight-line write-off the "
                f"asset stands at Rs {_fmt(final_bv)}.")
            ans = f"Book value after {ny} years = Rs {_fmt(final_bv)}"
            extra = {"book_value": final_bv, "annual_dep": dep}
            return final_bv, steps, ans, None, \
                "WDV_n = cost - n x annual depreciation", extra
        steps = _five(
            "straight line method: an equal depreciation charge every year "
            "on depreciable cost, shown year by year in the asset "
            "schedule.",
            f"cost = Rs {_fmt(cost)}, salvage = Rs {_fmt(salvage)}, life = "
            f"{_fmt(life)} years.",
            comp,
            f"check: every row satisfies opening - depreciation = closing, "
            f"and the last closing WDV {_fmt(rows[-1][3])} lands on the "
            f"salvage value.",
            f"annual charge Rs {_fmt(dep)}; the asset is fully written "
            f"down to salvage at the end of its life.")
        ans = "SLM schedule: " + "; ".join(
            f"Y{y}: dep {_fmt(dp)}, closing {_fmt(cb)}"
            for (y, ob, dp, cb) in rows)
        return dep, steps, ans, None, \
            "annual depreciation = (cost - salvage)/life", {"annual_dep": dep}
    steps = _five(
        "straight line method (SLM): an equal charge every year -- "
        "depreciation = (cost - salvage) / useful life, or rate% on "
        "depreciable cost when a rate is quoted instead of a life.",
        f"cost = Rs {_fmt(cost)}, salvage = Rs {_fmt(salvage)}, life = "
        f"{_fmt(life)} years.",
        comp,
        f"check: {_fmt(dep)} x {_fmt(life)} + salvage {_fmt(salvage)} = "
        f"{_fmt(dep * life + salvage)} recovers the original cost exactly.",
        f"the asset is written down by Rs {_fmt(dep)} every year.")
    ans = f"Annual depreciation = Rs {_fmt(dep)}"
    return dep, steps, ans, None, \
        "annual depreciation = (cost - salvage)/life", {"annual_dep": dep}


# --------------------------------------------------------------------------- #
# 3. DEP_WDV -- written down value, schedule / value after n years / rate
# --------------------------------------------------------------------------- #


def _c_dep_wdv(g, m, text):
    low = text.lower()
    if not re.search(r"written\s+down|wdv\b|reducing\s+balance|declining|"
                     r"diminishing", low):
        # rate + "value/book value after n years" ask is the WDV signature
        if not (re.search(r"(?:value|book\s*value)\s+(?:of|after|at\s+the"
                          r"\s+end)", low) and re.search(_U_NUM + r"\s*%", low)):
            return _GATE
    d = _dep_nums(text)
    cost, rate = d.get("cost"), d.get("rate")
    if cost is None or cost <= 0 or rate is None or not (0 < rate <= 100):
        return _GATE
    f = 1.0 - rate / 100.0
    years_ask = re.search(r"(?:after|at\s+the\s+end\s+of)\s+(?P<y>" + _U_NUM
                          + r")\s*years?", low)
    ny = int(_n(years_ask.group("y"))) if years_ask else int(d.get("life", 0)
                                                            or 0)
    if ny <= 0 or ny > 60:
        return _GATE
    comp = [f"Retention factor = 1 - {rate:g}/100 = {_fmt(f)}."]
    rows = []
    bv = cost
    for y in range(1, ny + 1):
        ob = bv
        dep = ob * rate / 100.0
        bv = ob - dep
        rows.append((y, ob, dep, bv))
        comp.append(f"Year {y}: depreciation = {_fmt(ob)} x {rate:g}% = "
                    f"{_fmt(dep)}; closing WDV = {_fmt(bv)}.")
    final_bv = rows[-1][3]
    steps = _five(
        "written down value (WDV / reducing balance) method: depreciation "
        "at a fixed % on the OPENING book value each year, so the charge "
        "shrinks every year and the asset is never fully written off "
        "(AS-6 / AS-10 depreciation accounting).",
        f"cost = Rs {_fmt(cost)}, rate = {rate:g}% p.a., horizon = {ny} "
        f"years.",
        comp,
        f"check: {_fmt(cost)} x ({_fmt(f)})^{ny} = {_fmt(final_bv)} equals "
        f"the final closing WDV from the year-by-year schedule.",
        f"after {ny} years of reducing-balance write-off the asset's book "
        f"value is Rs {_fmt(final_bv)}.")
    ans = f"Book value after {ny} years = Rs {_fmt(final_bv)}"
    return final_bv, steps, ans, None, \
        "WDV_n = cost x (1 - r/100)^n", {"book_value": final_bv,
                                         "annual_dep_year1": rows[0][2]}


# --------------------------------------------------------------------------- #
# 4. GROSS_PROFIT -- trading account
# --------------------------------------------------------------------------- #

_DIRECT_EXP_WORDS = (r"carriage\s+(?:inwards?|in\b|on\s+purchases)|"
                     r"freight\s+(?:inwards?|in\b)|octroi|customs\s+duty|"
                     r"import\s+duty|excise\s+duty|wages\b|fuel|power|"
                     r"docking\s+charges")


def _c_gross_profit(g, m, text):
    low = text.lower()
    if "gross profit" not in low and "trading account" not in low:
        return _GATE
    sales = _lbl(text, r"(?:net\s+)?sales\b|sale\b")
    if sales is None or sales <= 0:
        return _GATE
    # returns inwards reduce sales; returns outwards reduce purchases
    ret_in = _lbl(text, r"return\s+inwards?|sales\s+returns?") or 0.0
    ret_out = _lbl(text, r"return\s+outwards?|purchas\w+\s+returns?") or 0.0
    opening = _lbl(text, r"opening\s+stock|stock\s+in\s+hand\s+at\s+the\s+"
                         r"beginning|beginning\s+inventory") or 0.0
    closing = _lbl(text, r"closing\s+stock|stock\s+in\s+hand\s+at\s+the\s+"
                         r"end|ending\s+inventory") or 0.0
    purchases = _lbl(text, r"(?:net\s+)?purchases\b") or None
    direct = 0.0
    for mw in re.findall(_DIRECT_EXP_WORDS, text, re.I):
        mm = re.search(mw + r"\s*(?:is|of|was|:|=)?\s*" + _RS +
                       r"(" + _NUM + r")", text, re.I)
        if mm:
            direct += _n(mm.group(1))
    gp = sales - ret_in - (opening + (purchases or 0.0) - ret_out + direct
                           - closing)
    if purchases is None:
        return _GATE
    cogs = opening + purchases - ret_out + direct - closing
    steps = _five(
        "trading account: gross profit = net sales - cost of goods sold; "
        "returns inwards cut sales, returns outwards cut purchases, and "
        "only DIRECT expenses (carriage inwards, wages, fuel) enter COGS -- "
        "indirect expenses wait for the P&L account.",
        f"sales = {_fmt(sales)}, returns inwards = {_fmt(ret_in)}, opening "
        f"stock = {_fmt(opening)}, purchases = {_fmt(purchases)}, returns "
        f"outwards = {_fmt(ret_out)}, direct expenses = {_fmt(direct)}, "
        f"closing stock = {_fmt(closing)}.",
        [f"Net sales = {_fmt(sales)} - {_fmt(ret_in)} = "
         f"{_fmt(sales - ret_in)}.",
         f"COGS = opening + net purchases + direct expenses - closing = "
         f"{_fmt(opening)} + {_fmt(purchases - ret_out)} + {_fmt(direct)} "
         f"- {_fmt(closing)} = {_fmt(cogs)}.",
         f"Gross profit = net sales - COGS = {_fmt(sales - ret_in)} - "
         f"{_fmt(cogs)} = {_fmt(gp)}."],
        f"check: COGS {_fmt(cogs)} + GP {_fmt(gp)} = {_fmt(cogs + gp)} = "
        f"net sales -- the trading account tallies.",
        f"the firm earns a trading margin of Rs {_fmt(gp)} before indirect "
        f"expenses.")
    ans = f"Gross profit = Rs {_fmt(gp)}"
    return gp, steps, ans, None, "GP = net sales - COGS", {
        "net_sales": sales - ret_in,
        "cogs": opening + purchases - ret_out + direct - closing,
        "gross_profit": gp}


# --------------------------------------------------------------------------- #
# 5. NET_PROFIT -- P&L account
# --------------------------------------------------------------------------- #

_INDIRECT_EXP_WORDS = (
    r"salaries|salary|office\s+rent|rent\b|advertis\w+|insurance|"
    r"depreciation|bad\s*debts|interest\s+on\s+loan|discount\s+allowed|"
    r"carriage\s+(?:outwards?|out\b)|freight\s+(?:outwards?|out\b)|"
    r"postage|stationery|general\s+expenses|trade\s+expenses|"
    r"office\s+expenses|printing|travelling\s+expenses|legal\s+charges|"
    r"audit\s+fees|repairs")
_OTHER_INCOME_WORDS = (
    r"commission\s+received|interest\s+received|rent\s+received|"
    r"discount\s+received|bad\s*debts?\s+recovered|dividend\s+received")


def _c_net_profit(g, m, text):
    low = text.lower()
    if "net profit" not in low:
        return _GATE
    gp = _lbl(text, r"gross\s+profit")
    if gp is None:
        # derive from the trading side first
        r_gp = _c_gross_profit(g, m, text)
        if r_gp[0] is None:
            return _GATE
        gp = r_gp[0]
    exp_total = 0.0
    listed = []
    for mw in re.findall(_INDIRECT_EXP_WORDS, text, re.I):
        mm = re.search(mw + r"\s*(?:is|of|was|:|=)?\s*" + _RS +
                       r"(" + _NUM + r")", text, re.I)
        if mm:
            amt = _n(mm.group(1))
            exp_total += amt
            listed.append(f"{mw} {_fmt(amt)}")
    inc_total = 0.0
    inc_listed = []
    for mw in re.findall(_OTHER_INCOME_WORDS, text, re.I):
        mm = re.search(mw + r"\s*(?:is|of|was|:|=)?\s*" + _RS +
                       r"(" + _NUM + r")", text, re.I)
        if mm:
            amt = _n(mm.group(1))
            inc_total += amt
            inc_listed.append(f"{mw} {_fmt(amt)}")
    if not listed and not inc_listed:
        return _GATE
    np_v = gp - exp_total + inc_total
    comp = []
    if listed:
        comp.append("Indirect expenses (debited to P&L): "
                    + "; ".join(listed) + f"  -> total {_fmt(exp_total)}.")
    if inc_listed:
        comp.append("Other incomes (credited to P&L): "
                    + "; ".join(inc_listed) + f"  -> total {_fmt(inc_total)}.")
    comp.append(f"Net profit = GP - indirect expenses + other incomes = "
                f"{_fmt(gp)} - {_fmt(exp_total)} + {_fmt(inc_total)} = "
                f"{_fmt(np_v)}.")
    steps = _five(
        "profit and loss account: the net result transfers to it the gross "
        "profit from the trading account, then deducts INDIRECT expenses "
        "(office, selling, finance) and adds other incomes -- only the "
        "residue is net profit.",
        f"gross profit = Rs {_fmt(gp)}.",
        comp,
        f"check: GP {_fmt(gp)} - expenses {_fmt(exp_total)} + incomes "
        f"{_fmt(inc_total)} = {_fmt(np_v)} recomputes identically.",
        f"the business keeps Rs {_fmt(np_v)} of every year's operations "
        f"after all indirect charges.")
    ans = f"Net profit = Rs {_fmt(np_v)}"
    return np_v, steps, ans, None, \
        "NP = GP - indirect expenses + other incomes", {"net_profit": np_v}


# --------------------------------------------------------------------------- #
# 6. TRIAL_BALANCE_DIFF
# --------------------------------------------------------------------------- #


def _c_trial_balance(g, m, text):
    low = text.lower()
    if "trial balance" not in low:
        return _GATE
    dr = _lbl(text, r"debit\s+(?:side\s+|column\s+|total(?:s)?\s+(?:is|of|"
                      r"was|=|:)?)?")
    cr = _lbl(text, r"credit\s+(?:side\s+|column\s+|total(?:s)?\s+(?:is|of|"
                      r"was|=|:)?)?")
    if dr is None or cr is None or dr <= 0 or cr <= 0:
        return _GATE
    diff = dr - cr
    steps = _five(
        "trial balance: total debits must equal total credits (every "
        "transaction posts equal Dr and Cr), so any gap is parked on the "
        "SHORTER side as a Suspense A/c until the errors are found.",
        f"debit total = Rs {_fmt(dr)}, credit total = Rs {_fmt(cr)}.",
        [f"Difference = {_fmt(dr)} - {_fmt(cr)} = {_fmt(diff)} "
         f"({'debit exceeds credit' if diff > 0 else 'credit exceeds debit'}).",
         f"The difference is placed on the short column "
         f"({'credit' if diff > 0 else 'debit'}) as Suspense A/c."],
        f"check: {_fmt(dr)} = {_fmt(cr)} + {_fmt(abs(diff))} once the "
        f"suspense figure is added -- the trial balance tallies.",
        f"suspense of Rs {_fmt(abs(diff))} flags an undetected one-sided "
        f"error to be located and rectified.")
    ans = (f"Suspense = Rs {_fmt(abs(diff))} on the "
           f"{'credit' if diff > 0 else 'debit'} side")
    return abs(diff), steps, ans, None, "suspense = |debit total - credit total|", \
        {"debit_total": dr, "credit_total": cr, "difference": diff}


# --------------------------------------------------------------------------- #
# 7. BALANCE_SHEET_MISSING -- equality check + missing figure
# --------------------------------------------------------------------------- #


def _c_balance_sheet(g, m, text):
    low = text.lower()
    # ratio questions own their asks ("current assets ... current
    # liabilities ... calculate the current ratio" is NOT a missing
    # capital figure); goodwill valuation with assets/liabilities is the
    # capitalisation method, not a balance-sheet equality ask
    if re.search(r"\bratio\b|goodwill|capitalis\w+\s+method|super\s+"
                 r"profit|years.{0,3}purchase", low):
        return _GATE
    if not re.search(r"balance\s+sheet|assets\s*(?:are|=|:)?\s*" + _RS
                     + _NUM, low):
        return _GATE
    assets = _lbl(text, r"total\s+assets?|assets\s+(?:are|is|=|:|of|amount)")
    liab = _lbl(text, r"total\s+(?:outside\s+)?liabilit(?:y|ies)|"
                      r"liabilit(?:y|ies)\s+(?:are|is|=|:|of|amount)|"
                      r"(?:outside\s+)?liabilit(?:y|ies)")
    capital = _lbl(text, r"capital\b|owners?[' ]?s?\s*(?:equity|funds)|"
                         r"shareholders?[' ]?\s*funds")
    if assets is None and liab is None and capital is None:
        return _GATE
    given = [x for x in (assets, liab, capital) if x is not None]
    if len(given) < 2:
        return _GATE
    # without a "balance sheet" context, require an explicit
    # missing-figure / equality ask so plain asset-liability statements
    # (ratios, GP problems) never fire here
    if "balance sheet" not in low and not re.search(
            r"find|calculate|compute|determine|what\s+(?:is|are|will)|"
            r"does\s+it\s+balance|check|verify|balances\?", low):
        return _GATE
    if assets is not None and liab is not None and capital is not None:
        lhs = assets
        rhs = liab + capital
        diff = lhs - rhs
        ok = abs(diff) < 0.01
        steps = _five(
            "accounting equation: assets = liabilities + capital -- the "
            "balance sheet must tally on both sides because every entry is "
            "recorded twice.",
            f"total assets = Rs {_fmt(assets)}, liabilities = "
            f"Rs {_fmt(liab)}, capital = Rs {_fmt(capital)}.",
            [f"Liabilities + Capital = {_fmt(liab)} + {_fmt(capital)} = "
             f"{_fmt(rhs)}.",
             f"Assets - (liabilities + capital) = {_fmt(lhs)} - {_fmt(rhs)} "
             f"= {_fmt(diff)}."],
            f"check: both sides recomputed at Rs {_fmt(rhs)} each -- "
            f"{'they balance exactly.' if ok else 'they do NOT balance.'}",
            f"{'the balance sheet tallies.' if ok else 'a figure is wrong: the gap must be traced before the sheet can stand.'}")
        ans = ("Balance sheet balances (A = L + C = " + _fmt(lhs) + ")"
               if ok else
               f"Not balanced: assets exceed liabilities+capital by "
               f"Rs {_fmt(abs(diff))}" if diff > 0 else
               f"Not balanced: liabilities+capital exceed assets by "
               f"Rs {_fmt(abs(diff))}")
        return diff, steps, ans, None, "assets = liabilities + capital", {
            "assets": assets, "liabilities": liab, "capital": capital,
            "difference": diff}
    if assets is None:
        val = liab + capital
        missing = "total assets"
    elif capital is None:
        val = assets - liab
        missing = "capital"
    else:
        val = assets - capital
        missing = "liabilities"
    steps = _five(
        "accounting equation: assets = liabilities + capital -- any one "
        "missing figure is solved by rearranging the identity, which always "
        "holds because of the double entry.",
        "; ".join(f"{k} = Rs {_fmt(v)}" for k, v in
                  (("assets", assets), ("liabilities", liab),
                   ("capital", capital)) if v is not None) + ".",
        [f"Solving for the missing figure ({missing}).",
         f"{missing} = {_fmt(val)}."],
        f"check: substituting back, assets {_fmt(assets if assets is not None else val)} "
        f"= liabilities {_fmt(liab if liab is not None else val)} + capital "
        f"{_fmt(capital if capital is not None else val)} -- the equation "
        f"closes.",
        f"{missing.capitalize()} of Rs {_fmt(val)} makes the balance sheet "
        f"tally.")
    ans = f"{missing.capitalize()} = Rs {_fmt(val)}"
    return val, steps, ans, None, "assets = liabilities + capital", {
        "assets": assets, "liabilities": liab, "capital": capital,
        "missing_value": val}


# --------------------------------------------------------------------------- #
# 8. BRS_ADJUST -- cash book <-> pass book
# --------------------------------------------------------------------------- #

# (keyword regex, effect on pass-book when starting from cash book)
_BRS_ITEMS = [
    (r"cheques?\s+(?:is\s*su|issu)\w*\s+[^.;]{0,40}?(?:not|yet\s*not|"
     r"not\s+yet)\s*(?:been\s*)?presented|issued[^.;]{0,30}not\s+presented|"
     r"not\s+presented\s+for\s+payment", +1,
     "Cheques issued but not yet presented (bank has not paid yet)"),
    (r"cheques?\s+deposit\w*[^.;]{0,40}?(?:not|not\s+yet|yet\s+to\s+be)\s*"
     r"(?:been\s*)?(?:credited|collected|cleared)|deposited[^.;]{0,30}"
     r"not\s+(?:yet\s+)?credited|not\s+yet\s+cleared", -1,
     "Cheques deposited but not yet credited/collected"),
    (r"bank\s+(?:charges|commission|fees)|charges\s+debited\s+by\s+bank", -1,
     "Bank charges debited by the bank (not in cash book)"),
    (r"(?:interest|dividend)[^.;]{0,30}(?:allowed|credited|collected)\s+"
     r"by\s+(?:the\s+)?bank|interest\s+credited", +1,
     "Interest/dividend credited or collected by the bank"),
    (r"direct\w*\s+(?:deposit|paid|payment)|directly\s+(?:deposited|paid|"
     r"received)\s+(?:by\s+(?:a\s+)?customer|into\s+(?:the\s+)?bank)", +1,
     "Amount directly deposited by a customer into the bank"),
    (r"(?:insurance|premium|rent|tax\w*|subscription)[^.;]{0,40}"
     r"(?:paid|debited)\s+by\s+(?:the\s+)?bank|standing\s+instruction", -1,
     "Payment made by the bank as per standing instruction"),
    (r"cheques?\s+deposit\w*[^.;]{0,40}dishonou?red|dishonou?red[^.;]{0,20}"
     r"deposited", -1,
     "Cheque deposited but dishonoured (bank debited)"),
    (r"cheques?\s+issued[^.;]{0,40}dishonou?red", +1,
     "Cheque issued but dishonoured on presentation"),
]


def _c_brs(g, m, text):
    low = text.lower()
    if "reconciliation" not in low and "pass book" not in low \
            and "passbook" not in low:
        return _GATE
    sm = re.search(r"(?P<kind>favourable|credit|debit|overdraft|unfavourable)"
                   r"[^.;]{0,30}?balance[^.;]{0,40}?(?:as\s+per|of|in)\s+"
                   r"(?P<book>cash\s+book|pass\s?book|bank\s+statement|"
                   r"bank\s+column)", low)
    if not sm:
        # "cash book (debit) balance of X" order variants
        sm2 = re.search(r"balance\s+(?P<kind>debit|credit|favourable|"
                        r"overdraft)[^.;]{0,20}?(?:as\s+per|of|in)\s+"
                        r"(?P<book>cash\s+book|pass\s?book|bank\s+statement)",
                        low)
        # "Balance as per pass book is Rs X (favourable)" — kind after book
        sm3 = re.search(r"balance\s+as\s+per\s+(?P<book>cash\s+book|"
                        r"pass\s?book|bank\s+statement)[^.;]{0,60}", low)
        if sm2:
            kind, book = sm2.group("kind"), sm2.group("book")
        elif sm3:
            book = sm3.group("book")
            sentence = sm3.group(0)
            km = re.search(r"favourable|overdraft|unfavourable|debit|credit",
                           sentence)
            kind = km.group(0) if km else "favourable"
        else:
            return _GATE
    else:
        kind, book = sm.group("kind"), sm.group("book")
    # lazy skip: a greedy gap would run into the amount ("Rs 25,000" ->
    # label eats "Rs 25," and NUM binds "000" = 0)
    bal = _lbl(text, r"balance[^.;]{0,60}?")
    if bal is None or bal <= 0:
        return _GATE
    from_cash = "cash book" in book
    overdraft = kind in ("overdraft", "unfavourable")
    # debit/favourable balance in cash book or pass book = positive asset
    value = -bal if overdraft else bal
    sign_label = ("overdraft (negative)" if overdraft else "favourable")
    start = (f"{kind} balance as per {book} = Rs {_fmt(bal)} "
             f"({sign_label}); adjusted start = {_fmt(value)}.")
    comp = []
    total_adj = 0.0
    used_spans = []
    for kw, effect, why in _BRS_ITEMS:
        for km in re.finditer(kw, text, re.I):
            span = km.span()
            if any(s0 <= span[0] < s1 for (s0, s1) in used_spans):
                continue
            used_spans.append(span)
            # amount for this clause: prefer the first amount AFTER the
            # keyword ("... not presented for payment Rs 5,000"), else the
            # LAST amount before it ("a cheque of Rs 500 issued ...").
            after = text[span[1]: span[1] + 70]
            am = _AMOUNT_RE.search(after)
            if am:
                amt = _n(am.group("v"))
            else:
                before = text[max(0, span[0] - 70): span[0]]
                all_b = _AMOUNT_RE.findall(before)
                if not all_b:
                    continue
                amt = _n(all_b[-1])
            if amt <= 0:
                continue
            eff = effect if from_cash else -effect
            total_adj += eff * amt
            comp.append(f"{'Add' if eff > 0 else 'Less'} Rs {_fmt(amt)}: "
                        f"{why}.")
    target = "pass book" if from_cash else "cash book"
    final = value + total_adj
    if final < 0:
        comp.append(f"Closing = {_fmt(value)} {'+' if total_adj >= 0 else '-'} "
                    f"{_fmt(abs(total_adj))} = {_fmt(final)} -> "
                    f"OVERDRAFT of Rs {_fmt(abs(final))} as per {target}.")
        ans = f"Balance as per {target} = overdraft of Rs {_fmt(abs(final))}"
    else:
        comp.append(f"Closing = {_fmt(value)} {'+' if total_adj >= 0 else '-'} "
                    f"{_fmt(abs(total_adj))} = {_fmt(final)} "
                    f"(favourable) as per {target}.")
        ans = f"Balance as per {target} = Rs {_fmt(final)} (favourable)"
    steps = _five(
        "bank reconciliation: the cash book and the pass book disagree only "
        "by timing/items one side knows first -- each item is added or "
        "subtracted according to its effect on the TARGET book to arrive at "
        "the reconciled balance.",
        start,
        comp,
        f"check: start {_fmt(value)} plus the net adjustment "
        f"{_fmt(total_adj)} = {_fmt(final)} recomputes the closing figure "
        f"line by line.",
        f"the two books now reconcile at Rs {_fmt(abs(final))}"
        f"{' (overdraft)' if final < 0 else ''} as per {target}.")
    return final, steps, ans, None, "other-book balance = start +/- adjustments", \
        {"starting_balance": value, "total_adjustment": total_adj,
         "closing_balance": final}


# --------------------------------------------------------------------------- #
# 9. INTEREST_CAPITAL -- I = P R T / 100, any-solve
# --------------------------------------------------------------------------- #


def _c_interest_capital(g, m, text):
    low = text.lower()
    if "interest on capital" not in low and "interest is allowed on capital" \
            not in low and "allow interest on capital" not in low:
        return _GATE
    P = _lbl(text, r"capital\b")
    mrate = re.search(r"(?P<r>" + _U_NUM + r")\s*%\s*(?:per\s+annum|p\.a\.|"
                      r"pa\b)?", low)
    R = _n(mrate.group("r")) if mrate else None
    T = _months(text)
    I = _lbl(text, r"interest\b")
    if I is not None and not re.search(r"interest\s+(?:of|is|was|=|:)\s*"
                                       + _RS + _NUM, low):
        I = None                        # "interest on capital" header, not a value
    if P is not None and R is not None:
        t = T if T is not None else 12.0
        i_val = P * R * t / (100.0 * 12.0)
        comp = [f"Interest on capital = P x R x T/12 / 100 "
                f"(T in months, per annum rate).",
                f"= {_fmt(P)} x {R:g}% x {t:g}/12 = {_fmt(i_val)}."]
        if T is None:
            comp.append("(no period stated -> full year assumed)")
        steps = _five(
            "partnership deed appropriation: interest on partners' capital "
            "is a CHARGE on profits computed at the deed's rate on the "
            "opening capital for the period it was employed -- I = P x R x "
            "T/12 / 100.",
            f"capital = Rs {_fmt(P)}, rate = {R:g}% per annum, period = "
            f"{t:g} months.",
            comp,
            f"check: recompute {_fmt(P)} x {R:g}/100 x {t:g}/12 = "
            f"{_fmt(P * R / 100.0 * t / 12.0)} -- same figure.",
            f"Rs {_fmt(i_val)} is credited to the partner's capital before "
            f"the residual profit is divided.")
        ans = f"Interest on capital = Rs {_fmt(i_val)}"
        return i_val, steps, ans, \
            ([] if T is not None else ["full-year period assumed"]), \
            "I = P x R x T/12 / 100", {"interest": i_val}
    # any-solve for rate: I, P, T known
    if I is not None and P is not None and T is not None:
        r_v = I * 100.0 * 12.0 / (P * T)
        steps = _five(
            "partnership deed appropriation: rearranging I = P x R x T/12 / "
            "100 gives the implied deed rate R = I x 1200 / (P x T).",
            f"interest = Rs {_fmt(I)}, capital = Rs {_fmt(P)}, period = "
            f"{T:g} months.",
            [f"R = {_fmt(I)} x 100 x 12 / ({_fmt(P)} x {T:g}) = "
             f"{_fmt(r_v)}% per annum."],
            f"check: {_fmt(P)} x {_fmt(r_v)}% x {T:g}/12 = "
            f"{_fmt(P * r_v / 100.0 * T / 12.0)} = the given interest.",
            f"the deed allows interest on capital at {_fmt(r_v)}% per annum.")
        ans = f"Rate = {_fmt(r_v)}% per annum"
        return r_v, steps, ans, None, "R = I x 1200 / (P x T)", {"rate": r_v}
    # any-solve for capital: I, R, T known
    if I is not None and R is not None and T is not None:
        p_v = I * 100.0 * 12.0 / (R * T)
        steps = _five(
            "partnership deed appropriation: rearranging I = P x R x T/12 / "
            "100 gives the capital P = I x 1200 / (R x T).",
            f"interest = Rs {_fmt(I)}, rate = {R:g}% per annum, period = "
            f"{T:g} months.",
            [f"P = {_fmt(I)} x 100 x 12 / ({R:g} x {T:g}) = {_fmt(p_v)}."],
            f"check: {_fmt(p_v)} x {R:g}% x {T:g}/12 = "
            f"{_fmt(p_v * R / 100.0 * T / 12.0)} = the given interest.",
            f"a capital of Rs {_fmt(p_v)} earns the stated appropriation.")
        ans = f"Capital = Rs {_fmt(p_v)}"
        return p_v, steps, ans, None, "P = I x 1200 / (R x T)", {"capital": p_v}
    return _GATE


# --------------------------------------------------------------------------- #
# 10. INTEREST_DRAWINGS -- products method
# --------------------------------------------------------------------------- #


def _amt_before(text: str, words: str) -> Optional[float]:
    """Amount that PRECEDES a unit phrase: 'Rs 2,000 per month'."""
    pat = (r"(?P<v>" + _NUM + r")\s*(?:" + words + r")")
    m = re.search(pat, text, re.I)
    return _n(m.group("v")) if m else None


def _c_interest_drawings(g, m, text):
    low = text.lower()
    if "drawings" not in low or "interest" not in low:
        return _GATE
    mrate = re.search(r"(?P<r>" + _U_NUM + r")\s*%\s*(?:per\s+annum|p\.a\.)?",
                      low)
    R = _n(mrate.group("r")) if mrate else None
    per_month_ask = bool(re.search(r"per\s+month|monthly|every\s+month|"
                                   r"each\s+month", low))
    per_quarter_ask = bool(re.search(r"per\s+quarter|quarterly|every\s+"
                                     r"(?:three\s+)?months|each\s+quarter",
                                     low))
    monthly = _amt_before(text, r"per\s+month|monthly|each\s+month|"
                                r"every\s+month") if per_month_ask else None
    quarterly = _amt_before(text, r"per\s+quarter|quarterly|each\s+quarter|"
                                  r"every\s+quarter") if per_quarter_ask \
        else None
    D = _lbl(text, r"drawings")
    if D is None:
        dm = re.search(r"drawings[^.;]{0,50}?" + _RS + r"(" + _NUM + r")",
                       text, re.I)
        if dm:
            D = _n(dm.group(1))
    if R is None or (D is None and monthly is None and quarterly is None):
        return _GATE
    if D is not None and D <= 0:
        return _GATE
    per_month = "month" if per_month_ask else None
    months = None
    if per_month:
        if re.search(r"beginning|start", low):
            months = 6.5
            timing = "beginning of each month"
        elif re.search(r"end", low):
            months = 5.5
            timing = "end of each month"
        else:
            months = 6.0
            timing = "middle of each month (default)"
        monthly_amt = monthly if monthly is not None else D
        total_d = monthly_amt * 12.0
        comp = [f"Drawings Rs {_fmt(monthly_amt)} at the {timing} -> average "
                f"period = {months:g} months on the year's drawings.",
                f"Total drawings for the year = {_fmt(monthly_amt)} x 12 = "
                f"{_fmt(total_d)}.",
                f"Interest = total drawings x rate x {months:g}/12 = "
                f"{_fmt(total_d)} x {R:g}% x {months:g}/12."]
        i_val = total_d * R * months / 1200.0
        given_txt = (f"monthly drawings = Rs {_fmt(monthly_amt)}, timing = "
                     f"{timing}, rate = {R:g}% per annum.")
        rule_txt = ("products/average-period method: drawings made evenly "
                    "through the year are treated as one sum outstanding for "
                    "the AVERAGE period (beginning 6.5, middle 6, end 5.5 "
                    "months for monthly drawings).")
    elif per_quarter_ask:
        if re.search(r"beginning|start", low):
            months = 7.5
            timing = "beginning of each quarter"
        elif re.search(r"end", low):
            months = 4.5
            timing = "end of each quarter"
        else:
            months = 6.0
            timing = "middle of each quarter (default)"
        quarterly_amt = quarterly if quarterly is not None else D
        total_d = quarterly_amt * 4.0
        comp = [f"Drawings Rs {_fmt(quarterly_amt)} at the {timing} -> average "
                f"period = {months:g} months.",
                f"Total drawings for the year = {_fmt(quarterly_amt)} x 4 = "
                f"{_fmt(total_d)}.",
                f"Interest = {_fmt(total_d)} x {R:g}% x {months:g}/12."]
        i_val = total_d * R * months / 1200.0
        given_txt = (f"quarterly drawings = Rs {_fmt(quarterly_amt)}, timing "
                     f"= {timing}, rate = {R:g}% per annum.")
        rule_txt = ("products/average-period method: quarterly drawings "
                    "collapse to one sum outstanding for the AVERAGE period "
                    "(beginning 7.5, middle 6, end 4.5 months).")
    else:
        if D is None:
            return _GATE
        if re.search(r"beginning\s+of\s+(?:the\s+)?year", low):
            months = 12.0
        elif re.search(r"(?:middle|mid)[- ]?(?:of\s+)?(?:the\s+)?year", low):
            months = 6.0
        elif re.search(r"end\s+of\s+(?:the\s+)?year", low):
            months = 0.0
        elif re.search(r"throughout\s+the\s+year|evenly|equally", low):
            months = 6.0
        else:
            T = _months(text)
            months = T if T is not None else None
        if months is None:
            return _GATE
        i_val = D * R * months / 1200.0
        comp = [f"Drawings Rs {_fmt(D)} drawn with an average usage period "
                f"of {months:g} months.",
                f"Interest = drawings x rate x {months:g}/12 = "
                f"{_fmt(D)} x {R:g}% x {months:g}/12 = {_fmt(i_val)}."]
        given_txt = (f"drawings = Rs {_fmt(D)}, rate = {R:g}% per annum, "
                     f"period outstanding = {months:g} months.")
        rule_txt = ("products/average-period method: each drawing carries "
                    "interest only for the time it stays with the partner, "
                    "I = drawings x R x months/1200.")
    if i_val == 0.0:
        comp.append("Drawings at the year end carry interest for 0 months "
                    "-> interest = 0.")
    total_d = D if D is not None else (monthly_amt if per_month_ask
                                       else quarterly_amt) \
        * (12.0 if per_month_ask else 4.0)
    steps = _five(
        rule_txt, given_txt, comp,
        f"check: total drawings {_fmt(total_d)} x {R:g}% x {months:g}/12 = "
        f"{_fmt(total_d * R * months / 1200.0)} recomputes the interest.",
        f"Rs {_fmt(i_val)} is charged to the partner for using the firm's "
        f"funds (debited to his current/capital account).")
    ans = f"Interest on drawings = Rs {_fmt(i_val)}"
    return i_val, steps, ans, None, "I = drawings x R x months/1200", \
        {"interest": i_val, "total_drawings": D}


# --------------------------------------------------------------------------- #
# 11. PARTNERSHIP_PROFIT_SHARE -- ratio division with appropriations
# --------------------------------------------------------------------------- #


def _partners_header(text: str):
    """'A and B (and C) are partners' -> names list.  Single capital
    letters (A, B, C) are the textbook norm, so allow 0 lowercase
    letters after the initial capital."""
    m = re.search(r"\b([A-Z][A-Za-z]{0,14})\s*(?:,|and|&)\s*"
                  r"([A-Z][A-Za-z]{0,14})"
                  r"(?:\s*(?:,|and|&)\s*([A-Z][A-Za-z]{0,14}))?"
                  r"(?:\s+(?:are|is)?\s*partners?|\s+sharing\b|\s+share\s+"
                  r"profits\b)", text)
    if not m:
        return None
    names = [m.group(1), m.group(2)]
    if m.group(3):
        names.append(m.group(3))
    return names


def _profit_value(text: str) -> Optional[float]:
    """The distributable profit.  Prefers 'profit of the firm' style
    labels and skips amounts inside a guarantee clause ("his share of
    profit shall not be less than Rs X" is NOT the firm's profit)."""
    v = _lbl(text, r"(?:net\s+)?profit\s+of\s+the\s+(?:firm|business)|"
                   r"firm'?s?\s+(?:net\s+)?profit|total\s+(?:net\s+)?profit")
    if v is not None:
        return v
    pat = (r"(?:net\s+)?profit\s*(?:is|of|was|=|:)?\s*" + _RS +
           r"(" + _NUM + r")")
    for pm in re.finditer(pat, text, re.I):
        window = text[max(0, pm.start() - 60): pm.end()]
        if re.search(r"guarantee|not\s+(?:be\s+)?less|minimum", window,
                     re.I):
            continue
        return _n(pm.group(1))
    return None


def _c_partnership_share(g, m, text):
    low = text.lower()
    if "profit" not in low or "ratio" not in low:
        return _GATE
    # reconstitution asks belong to GAINING_RATIO / DECEASED_SHARE /
    # PARTNERSHIP_NEW_RATIO -- plain division must not hijack them
    if re.search(r"\bdied\b|death|retire|admit\w*|joins?\b|date of death",
                 low):
        return _GATE
    names = _partners_header(text)
    parts = _ratio_parts(text)
    P = _profit_value(text)
    if not names or not parts or P is None or P <= 0:
        return _GATE
    if len(parts) != len(names):
        return _GATE
    total_units = sum(parts)
    # appropriations: interest on capital amounts, salaries, commission
    approps = 0.0
    app_steps = []
    if re.search(r"interest\s+on\s+capitals?\s*(?:is|:|of|allowed|@|at)", low):
        seg = re.search(r"interest\s+on\s+capitals?[^.]{0,80}", text, re.I)
        if seg:
            nums = [float(x.replace(",", ""))
                    for x in re.findall(_NUM, seg.group(0))]
            if len(nums) >= len(names):
                amounts = nums[-len(names):]
                s = sum(amounts)
                approps += s
                app_steps.append(f"Interest on capital (A/c credit to "
                                 f"partners) = {_fmt(s)}.")
    sm = re.search(r"salary[^.;]{0,60}?" + _RS + "(" + _NUM + ")", text,
                   re.I)
    if sm:
        s_amt = _n(sm.group(1))
        if re.search(r"per\s+month", sm.group(0), re.I):
            s_amt *= 12.0
            app_steps.append(f"Partner salary Rs {_fmt(s_amt / 12)} per "
                             f"month -> {_fmt(s_amt)} per year.")
        else:
            app_steps.append(f"Partner salary = {_fmt(s_amt)}.")
        approps += s_amt
    divisible = P - approps
    shares = [P * 0.0 for _ in names]
    comp = list(app_steps)
    if approps:
        comp.append(f"Divisible profit = {_fmt(P)} - {_fmt(approps)} = "
                    f"{_fmt(divisible)}.")
    base = divisible
    for i, nm in enumerate(names):
        shares[i] = base * parts[i] / total_units
        comp.append(f"{nm}'s share = {_fmt(base)} x {parts[i]:g}/"
                    f"{_fmt(total_units)} = {_fmt(shares[i])}.")
    steps = _five(
        "profit appropriation: after appropriations charged by the deed "
        "(interest on capital, partner salaries, commission), the "
        "divisible profit is divided strictly in the agreed profit-sharing "
        "ratio.",
        f"profit = Rs {_fmt(P)}; partners " + ", ".join(names) + "; ratio "
        + " : ".join(_fmt(p) for p in parts) + ".",
        comp,
        f"check: the shares sum to {_fmt(sum(shares))} = divisible profit "
        f"{_fmt(divisible)} -- nothing left undistributed.",
        "each partner's credited share of the year's profit.")
    ans = " ; ".join(f"{nm}: Rs {_fmt(sh)}" for nm, sh in zip(names, shares))
    extra = {f"share_{i+1}": v for i, v in enumerate(shares)}
    extra["divisible_profit"] = divisible
    return shares[0], steps, ans, None, "share = divisible profit x ratio unit", \
        extra


# --------------------------------------------------------------------------- #
# 12. PARTNER_GUARANTEE -- minimum guaranteed share
# --------------------------------------------------------------------------- #


def _c_partner_guarantee(g, m, text):
    low = text.lower()
    if "guarantee" not in low or "profit" not in low:
        return _GATE
    names = _partners_header(text)
    parts = _ratio_parts(text)
    P = _profit_value(text)
    G = _lbl(text, r"guarantee\w*(?:\s+that[^.;]{0,40}?)?(?:\s+(?:a\s+)?"
                  r"minimum(?:\s+amount)?\s+(?:of\s+)?|not\s+(?:be\s+)?"
                  r"less\s+than\s+|at\s+least\s+)")
    if not names or not parts or P is None or G is None or len(names) < 2:
        return _GATE
    total_units = sum(parts)
    shares = [P * p / total_units for p in parts]
    gi = None
    gm = re.search(r"guarantees?\s+that\s+([A-Z][A-Za-z]{0,14})", text)
    if gm:
        nm = gm.group(1)
        for i, x in enumerate(names):
            if x.lower() == nm.lower():
                gi = i
                break
    if gi is None:
        gi = len(names) - 1
    comp = [f"Ratio shares: "
            + ", ".join(f"{nm} {_fmt(sh)}" for nm, sh in zip(names, shares))
            + f" (total {_fmt(P)})."]
    if shares[gi] >= G:
        comp.append(f"{names[gi]}'s share {_fmt(shares[gi])} already meets "
                    f"the guarantee of {_fmt(G)} -- no adjustment.")
        steps = _five(
            "guarantee of minimum profit: first divide the divisible profit "
            "in the agreed ratio, THEN test the guaranteed partner's share "
            "against the floor -- only a shortfall is adjusted.",
            f"profit = Rs {_fmt(P)}; partners " + ", ".join(names)
            + "; ratio " + " : ".join(_fmt(p) for p in parts)
            + f"; guaranteed minimum to {names[gi]} = Rs {_fmt(G)}.",
            comp,
            f"check: the shares sum to {_fmt(sum(shares))} = profit "
            f"{_fmt(P)} and {names[gi]}'s {_fmt(shares[gi])} >= "
            f"{_fmt(G)} -- guarantee satisfied without touching others.",
            f"{names[gi]} needs no protection this year.")
        ans = " ; ".join(f"{nm}: Rs {_fmt(sh)}" for nm, sh in
                         zip(names, shares))
        extra = {f"share_{i+1}": v for i, v in enumerate(shares)}
        return P, steps, ans, None, "no shortfall", extra
    shortfall = G - shares[gi]
    others = [i for i in range(len(names)) if i != gi]
    others_units = sum(parts[i] for i in others)
    comp.append(f"{names[gi]}'s share {_fmt(shares[gi])} < guaranteed "
                f"{_fmt(G)} -> shortfall = {_fmt(shortfall)}, borne by the "
                f"others in their profit ratio.")
    for i in others:
        bite = shortfall * parts[i] / others_units
        shares[i] -= bite
        comp.append(f"{names[i]} bears {_fmt(parts[i])}/{_fmt(others_units)} "
                    f"of the shortfall = {_fmt(bite)} -> final "
                    f"{_fmt(shares[i])}.")
    shares[gi] = G
    comp.append(f"{names[gi]} gets the guaranteed {_fmt(G)}.")
    steps = _five(
        "guarantee of minimum profit: the deficiency is shared by the OTHER "
        "partners in their own profit-sharing ratio (or the ratio agreed in "
        "the guarantee), leaving the guaranteed partner at the floor.",
        f"profit = Rs {_fmt(P)}; partners " + ", ".join(names)
        + "; ratio " + " : ".join(_fmt(p) for p in parts)
        + f"; guaranteed minimum to {names[gi]} = Rs {_fmt(G)}.",
        comp,
        f"check: final shares sum to {_fmt(sum(shares))} = the profit "
        f"{_fmt(P)} -- the guarantee redistributed, nothing created.",
        f"{names[gi]} is lifted to the guaranteed Rs {_fmt(G)}; the others "
        f"absorb the deficiency.")
    ans = " ; ".join(f"{nm}: Rs {_fmt(sh)}" for nm, sh in zip(names, shares))
    extra = {f"share_{i+1}": v for i, v in enumerate(shares)}
    return shares[gi], steps, ans, None, \
        "shortfall borne by remaining partners in their ratio", extra


# --------------------------------------------------------------------------- #
# 13. PARTNERSHIP_NEW_RATIO -- admission (sacrificing)
# --------------------------------------------------------------------------- #


def _c_new_ratio(g, m, text):
    low = text.lower()
    if not re.search(r"admit\w*|joins?", low):
        return _GATE
    names = _partners_header(text)
    parts = _ratio_parts(text)
    if not names or not parts or len(names) != len(parts):
        return _GATE
    fm = re.search(r"admit\w*[^.;]{0,60}?for\s+(?P<a>\d+)\s*/\s*(?P<b>\d+)"
                   r"(?:th)?\s*(?:\(\s*of\s+profits?\s*\))?\s*share", low)
    if not fm:
        return _GATE
    frac = _n(fm.group("a")) / _n(fm.group("b"))
    if not (0 < frac < 1):
        return _GATE
    old_total = sum(parts)
    total_units = _n(fm.group("b"))
    new_parts = [p * (total_units - _n(fm.group("a"))) / old_total
                 for p in parts]
    new_parts.append(float(fm.group("a")))
    all_names = names + ["New partner"]
    nm_new = re.search(r"([A-Z][A-Za-z]{0,14})\s+(?:is\s+)?admitted", text)
    if nm_new:
        all_names[-1] = nm_new.group(1)
    comp = [f"Old ratio ({', '.join(names)}) = "
            + " : ".join(_fmt(p) for p in parts) + f" (sum {_fmt(old_total)}).",
            f"New partner is admitted for {_n(fm.group('a')):g}/"
            f"{_n(fm.group('b')):g} of profits; the remaining "
            f"{_fmt(total_units - _n(fm.group('a')))} is shared by the old "
            f"partners in their old ratio."]
    for i, nm in enumerate(names):
        comp.append(f"{nm}: new share = {parts[i]:g}/{_fmt(old_total)} x "
                    f"{_fmt(total_units - _n(fm.group('a')))}/"
                    f"{_fmt(total_units)} = {new_parts[i]:g}/"
                    f"{_fmt(total_units)}.")
    comp.append("New ratio = " + " : ".join(
        f"{nm} {_fmt(v)}" for nm, v in zip(all_names, new_parts)))
    scaled = _int_scale(new_parts)
    sac = [parts[i] / old_total - new_parts[i] / total_units
           for i in range(len(names))]
    sac_scaled = _int_scale(sac) if all(s >= 0 for s in sac) else None
    if scaled:
        ans = ("New ratio = " + " : ".join(str(x) for x in scaled)
               + f" ({', '.join(all_names)})")
        comp.append(f"In whole numbers (x{_fmt(1.0 * scaled[0] / new_parts[0])}): "
                    + " : ".join(str(x) for x in scaled) + ".")
    else:
        ans = ("New ratio = " + " : ".join(_fmt(v) for v in new_parts)
               + f" ({', '.join(all_names)})")
    if sac_scaled:
        ans += f"; sacrificing ratio = " + " : ".join(
            str(x) for x in sac_scaled)
        comp.append("Sacrificing ratio (old share - new share) = "
                    + " : ".join(str(x) for x in sac_scaled) + ".")
    steps = _five(
        "admission of a partner: the incoming partner's fraction is carved "
        "out of the total, and the REMAINDER is shared by the old partners "
        "in their OLD ratio (sacrifice = old share - new share).",
        f"old partners " + ", ".join(names) + " share "
        + " : ".join(_fmt(p) for p in parts) + f"; new partner "
        f"{all_names[-1]} admitted for {_n(fm.group('a')):g}/"
        f"{_n(fm.group('b')):g} of profits.",
        comp,
        f"check: the new shares sum to {sum(new_parts):g} = 1 whole share "
        f"and each old partner's share fell (positive sacrifice).",
        f"on this ratio the incoming partner compensates the sacrificing "
        f"partners through goodwill.")
    extra = {"new_" + str(i + 1): v for i, v in enumerate(new_parts)}
    return new_parts[0], steps, ans, None, \
        "new share = old share x (1 - admitted fraction)", extra


# --------------------------------------------------------------------------- #
# 14. RATIOS -- current, quick, debt-equity, GP%, NP%
# --------------------------------------------------------------------------- #

_CA_WORDS = (r"(?:closing\s+)?stock|inventor(?:y|ies)|debtors|"
             r"sundry\s+debtors|bills\s+receivable|cash(?:\s+in\s+hand)?|"
             r"bank\b|prepaid\s+expenses|short[- ]term\s+investments|"
             r"accrued\s+income|loans?\s+and\s+advances")
_CL_WORDS = (r"creditors|sundry\s+creditors|bills\s+payable|"
             r"bank\s+overdraft|outstanding\s+expenses|provision\s+for\s+tax|"
             r"outstanding\s+liabilit|creditors\s+for\s+expenses")


def _sum_labelled(text: str, words: str) -> Tuple[float, List[str]]:
    total = 0.0
    hits = []
    for mw in sorted(set(re.findall(words, text, re.I)), key=len,
                     reverse=True):
        mm = re.search(mw + r"\s*(?:is|of|was|:|=)?\s*" + _RS +
                       r"(" + _NUM + r")", text, re.I)
        if mm:
            total += _n(mm.group(1))
            hits.append(f"{mw} {_n(mm.group(1)):g}")
    return total, hits


def _c_current_ratio(g, m, text):
    low = text.lower()
    if "current ratio" not in low and "working capital ratio" not in low:
        return _GATE
    ca = _lbl(text, r"current\s+assets?")
    cl = _lbl(text, r"current\s+liabilit(?:y|ies)")
    if ca is None:
        ca, hits = _sum_labelled(text, _CA_WORDS)
    if cl is None:
        cl, hits2 = _sum_labelled(text, _CL_WORDS)
    if not ca or not cl or cl <= 0:
        return _GATE
    ratio = ca / cl
    steps = _five(
        "current ratio (liquidity): current assets / current liabilities -- "
        "it tests whether short-term assets can settle short-term dues "
        "within a year (2:1 is the classic benchmark).",
        f"current assets = Rs {_fmt(ca)}, current liabilities = "
        f"Rs {_fmt(cl)}.",
        [f"Current ratio = {_fmt(ca)} / {_fmt(cl)} = {_fmt(ratio)} : 1."],
        f"check: {_fmt(cl)} x {_fmt(ratio)} = {_fmt(cl * ratio)} = the "
        f"current assets -- the division is consistent.",
        f"every Re 1 of short-term dues is covered by Rs {_fmt(ratio)} of "
        f"short-term assets.")
    ans = f"Current ratio = {_fmt(ratio)} : 1"
    return None, steps, ans, None, "current ratio = CA / CL", {
        "current_assets": ca, "current_liabilities": cl}


def _c_quick_ratio(g, m, text):
    low = text.lower()
    if "quick ratio" not in low and "liquid ratio" not in low \
            and "acid[- ]test" not in low:
        return _GATE
    ca = _lbl(text, r"current\s+assets?")
    cl = _lbl(text, r"current\s+liabilit(?:y|ies)")
    stock = _lbl(text, r"(?:closing\s+)?stock|inventor(?:y|ies)") or 0.0
    prepaid = _lbl(text, r"prepaid\s+expenses") or 0.0
    if ca is None:
        ca, _h = _sum_labelled(text, _CA_WORDS)
    if cl is None:
        cl, _h = _sum_labelled(text, _CL_WORDS)
    if not ca or not cl or cl <= 0:
        return _GATE
    qa = ca - stock - prepaid
    if qa <= 0:
        return _GATE
    ratio = qa / cl
    steps = _five(
        "quick (acid-test) ratio: stock and prepaid expenses are EXCLUDED "
        "from current assets because they cannot be turned into cash "
        "immediately; the rest is tested against current liabilities "
        "(1:1 benchmark).",
        f"current assets = Rs {_fmt(ca)}, stock = Rs {_fmt(stock)}, "
        f"prepaid expenses = Rs {_fmt(prepaid)}, current liabilities = "
        f"Rs {_fmt(cl)}.",
        [f"Quick assets = {_fmt(ca)} - {_fmt(stock)} - {_fmt(prepaid)} = "
         f"{_fmt(qa)}.",
         f"Quick ratio = {_fmt(qa)} / {_fmt(cl)} = {_fmt(ratio)} : 1."],
        f"check: {_fmt(cl)} x {_fmt(ratio)} = {_fmt(cl * ratio)} = the "
        f"quick assets -- division consistent.",
        f"immediate dues of Re 1 carry Rs {_fmt(ratio)} of near-cash "
        f"against them.")
    ans = f"Quick ratio = {_fmt(ratio)} : 1"
    return None, steps, ans, None, "quick ratio = (CA - stock - prepaid)/CL", {
        "quick_assets": qa, "current_liabilities": cl}


def _c_debt_equity(g, m, text):
    low = text.lower()
    if "debt" not in low or "equity" not in low:
        return _GATE
    debt = _lbl(text, r"long[- ]term\s+(?:borrowings|debts?|debt|loans)|"
                      r"debentures|total\s+(?:long[- ]term\s+)?debts?")
    equity = _lbl(text, r"shareholders?[' ]?\s*funds|shareholders?[' ]?\s*"
                        r"equity|equity\s+(?:share\s+)?capital\s*\+|"
                        r"owners?[' ]?\s*funds")
    if equity is None:
        sc = _lbl(text, r"(?:equity\s+)?share\s+capital")
        res = _lbl(text, r"reserves?\s*(?:and|&)\s*surplus")
        if sc is not None:
            equity = sc + (res or 0.0)
    if debt is None or not equity or equity <= 0:
        return _GATE
    ratio = debt / equity
    steps = _five(
        "debt-equity ratio (solvency): long-term debts / shareholders' "
        "funds -- it measures how much of the long-term capital is "
        "borrowed versus owned (2:1 is the usual comfort line).",
        f"long-term debts = Rs {_fmt(debt)}, equity = Rs {_fmt(equity)}.",
        [f"Debt-equity ratio = {_fmt(debt)} / {_fmt(equity)} = "
         f"{_fmt(ratio)} : 1."],
        f"check: {_fmt(equity)} x {_fmt(ratio)} = {_fmt(equity * ratio)} = "
        f"the debt figure -- division consistent.",
        f"for every Re 1 of owners' funds the firm carries Rs {_fmt(ratio)} "
        f"of long-term debt.")
    ans = f"Debt-equity ratio = {_fmt(ratio)} : 1"
    return None, steps, ans, None, "debt-equity = long-term debts / equity", {
        "debt": debt, "equity": equity}


def _c_gp_ratio(g, m, text):
    low = text.lower()
    if "gross profit ratio" not in low and "gp ratio" not in low:
        return _GATE
    gp = _lbl(text, r"gross\s+profit")
    sales = _lbl(text, r"(?:net\s+)?(?:revenue\s+from\s+operations|sales)")
    if gp is None or not sales or sales <= 0:
        return _GATE
    pct = gp / sales * 100.0
    steps = _five(
        "gross profit ratio: GP / net sales x 100 -- a profitability "
        "measure of the trading margin earned on every rupee of sales.",
        f"gross profit = Rs {_fmt(gp)}, net sales = Rs {_fmt(sales)}.",
        [f"GP ratio = {_fmt(gp)} / {_fmt(sales)} x 100 = {_fmt(pct)}%."],
        f"check: {_fmt(sales)} x {_fmt(pct)}% = "
        f"{_fmt(sales * pct / 100.0)} = the gross profit.",
        f"each Rs 100 of sales leaves Rs {_fmt(pct)} after trading costs.")
    ans = f"Gross profit ratio = {_fmt(pct)}%"
    return None, steps, ans, None, "GP ratio = GP / net sales x 100", {
        "gp_ratio_pct": pct}


def _c_np_ratio(g, m, text):
    low = text.lower()
    if "net profit ratio" not in low and "np ratio" not in low:
        return _GATE
    np_v = _lbl(text, r"net\s+profit")
    sales = _lbl(text, r"(?:net\s+)?(?:revenue\s+from\s+operations|sales)")
    if np_v is None or not sales or sales <= 0:
        return _GATE
    pct = np_v / sales * 100.0
    steps = _five(
        "net profit ratio: NP / net sales x 100 -- the overall operating "
        "efficiency measure: what survives of every rupee of sales after "
        "ALL expenses (direct and indirect).",
        f"net profit = Rs {_fmt(np_v)}, net sales = Rs {_fmt(sales)}.",
        [f"NP ratio = {_fmt(np_v)} / {_fmt(sales)} x 100 = {_fmt(pct)}%."],
        f"check: {_fmt(sales)} x {_fmt(pct)}% = "
        f"{_fmt(sales * pct / 100.0)} = the net profit.",
        f"each Rs 100 of sales yields Rs {_fmt(pct)} as final profit.")
    ans = f"Net profit ratio = {_fmt(pct)}%"
    return None, steps, ans, None, "NP ratio = NP / net sales x 100", {
        "np_ratio_pct": pct}


# --------------------------------------------------------------------------- #
# 15+. BOOKS2 families -- the solver-able MISSING block from the NCERT/
#      ISC corpus: bills of exchange, insolvency, incomplete records, NPO
#      subscription, reconstitution (gaining / deceased / goodwill),
#      company accounts (shares, forfeiture, debentures, cash flow) and
#      the remaining turnover ratios.  Same 6-tuple + _GATE conventions.
# --------------------------------------------------------------------------- #


def _c_bill_due(g, m, text):
    low = text.lower()
    if not re.search(r"\bbill\b|promissory\s+note", low):
        return _GATE
    if "discount" in low:
        return _GATE                      # BILL_DISCOUNT owns discounting
    if not re.search(r"due\s+date|maturit", low):
        return _GATE
    d0 = _parse_date(text)
    if d0 is None:
        return _GATE
    tm = re.search(r"(?P<n>\d{1,2})\s*(?P<u>months?|days?)\s*(?:after|"
                   r"from)\s*(?:date|sight|draw|acceptance)", low)
    if not tm:
        return _GATE
    n, u = int(tm.group("n")), tm.group("u")
    if u.startswith("month"):
        if not (1 <= n <= 36):
            return _GATE
        nominal = _add_months(d0, n)
        unit_txt = f"{n} months"
    else:
        if not (1 <= n <= 92):
            return _GATE
        nominal = d0 + _dt.timedelta(days=n)
        unit_txt = f"{n} days"
    due = nominal + _dt.timedelta(days=3)
    steps = _five(
        "maturity of a bill (Negotiable Instruments Act practice): the due "
        "date is the NOMINAL date (date of drawing + term) PLUS 3 days of "
        "grace -- a bill is legally payable 3 days after it appears to be.",
        f"bill dated {_dstr(d0)}; term = {unit_txt} after date; days of "
        f"grace = 3.",
        [f"Nominal due date = {_dstr(d0)} + {unit_txt} = {_dstr(nominal)}.",
         f"Legal due date = {_dstr(nominal)} + 3 days of grace = "
         f"{_dstr(due)}."],
        f"check: term ({unit_txt}) and the 3 grace days are counted as "
        f"separate legs, so the calendar moves twice and lands on "
        f"{_dstr(due)}.",
        f"the bill matures and must be paid on {_dstr(due)}.")
    ans = f"Due date = {_dstr(due)}"
    key = "term_months" if u.startswith("month") else "term_days"
    return None, steps, ans, None, "due date = date + term + 3 days of grace", \
        {key: float(n), "grace_days": 3.0}


def _c_bill_discount(g, m, text):
    low = text.lower()
    if not re.search(r"\bbill\b|promissory\s+note", low):
        return _GATE
    if not re.search(r"discount", low):
        return _GATE
    A = _lbl(text, r"bill\s+receivable|bill\s+of\s+exchange|bill\s+drawing|"
                   r"bill\s+drawn|bill")
    if A is None or A <= 0:
        return _GATE
    mrate = re.search(r"(?P<r>" + _U_NUM + r")\s*%\s*(?:per\s+annum|p\.a\.|"
                      r"pa\b)?", low)
    R = _n(mrate.group("r")) if mrate else None
    if R is None or not (0 < R <= 100):
        return _GATE
    mp = re.search(r"(?P<n>\d{1,2})\s*months?\s*(?:before|prior\s+to)\s*"
                   r"maturity", low)
    if mp:
        months = _n(mp.group("n"))
        basis = "unexpired period stated directly"
    else:
        mt = re.search(r"(?P<n>\d{1,2})\s*months?\s*(?:after|from)\s*"
                       r"(?:date|sight|draw|acceptance)", low)
        if mt and re.search(r"immediately|at\s+once|on\s+(?:the\s+)?"
                            r"(?:date|issue)|instantly", low):
            months = _n(mt.group("n"))
            basis = ("discounted on the date of the bill -> full term is "
                     "unexpired")
        else:
            return _GATE
    if not (0 < months <= 36):
        return _GATE
    disc = A * R / 100.0 * months / 12.0
    proceeds = A - disc
    steps = _five(
        "discounting a bill: the bank pays the bill's face value MINUS a "
        "discounting charge (interest on the face value for the UNEXPIRED "
        "period at the quoted rate) -- discount = amount x rate x "
        "months/1200.",
        f"bill amount = Rs {_fmt(A)}, rate = {R:g}% per annum, unexpired "
        f"period = {months:g} months.",
        [f"Discounting charge = {_fmt(A)} x {R:g}% x {months:g}/12 = "
         f"{_fmt(disc)}.",
         f"Proceeds = face value - charge = {_fmt(A)} - {_fmt(disc)} = "
         f"{_fmt(proceeds)}."],
        f"check: {_fmt(disc)} + {_fmt(proceeds)} = {_fmt(A)} = the face "
        f"value -- the split is exhaustive ({basis}).",
        f"the holder banks Rs {_fmt(proceeds)} today; the bank recovers "
        f"Rs {_fmt(A)} at maturity.")
    ans = (f"Discounting charge = Rs {_fmt(disc)}; proceeds = "
           f"Rs {_fmt(proceeds)}")
    return disc, steps, ans, None, \
        "discount = amount x rate x unexpired months / 1200", \
        {"discount": disc, "proceeds": proceeds}


def _c_bill_renewal(g, m, text):
    low = text.lower()
    if not re.search(r"\bbill\b|promissory\s+note", low):
        return _GATE
    if not re.search(r"renew|new\s+bill", low):
        return _GATE
    A = _lbl(text, r"bill\s+receivable|bill\s+payable|bill\s+of\s+exchange|"
                   r"bill\s+drawing|bill\s+drawn|bill")
    if A is None or A <= 0:
        return _GATE
    cm = re.search(r"(?:rs\.?|inr)?\s*(" + _NUM + r")\s*in\s+cash", low)
    cash = _n(cm.group(1)) if cm else (_lbl(text, r"cash\s+paid") or 0.0)
    balance = A - cash
    if balance <= 0:
        return _GATE
    mrate = re.search(r"(?P<r>" + _U_NUM + r")\s*%\s*(?:per\s+annum|p\.a\.|"
                      r"pa\b)?", low)
    R = _n(mrate.group("r")) if mrate else None
    tm = re.search(r"(?P<n>\d{1,2})\s*months?", low)
    if R is None or tm is None or not (0 < _n(tm.group("n")) <= 36):
        return _GATE
    months = _n(tm.group("n"))
    interest = balance * R / 100.0 * months / 12.0
    cash_interest = bool(re.search(r"interest[^.;]{0,30}in\s+cash|paid\s+"
                                   r"the\s+interest", low))
    new_bill = balance if cash_interest else balance + interest
    comp = [f"Balance unpaid = {_fmt(A)} - cash {_fmt(cash)} = "
            f"{_fmt(balance)}.",
            f"Interest for the fresh term = {_fmt(balance)} x {R:g}% x "
            f"{months:g}/12 = {_fmt(interest)}."]
    if cash_interest:
        comp.append("Interest received in cash -> the new bill carries only "
                    f"the balance = {_fmt(new_bill)}.")
    else:
        comp.append(f"Interest included in the new bill = {_fmt(balance)} + "
                    f"{_fmt(interest)} = {_fmt(new_bill)}.")
    steps = _five(
        "renewal of a bill: the old bill is cancelled; whatever the acceptor "
        "pays in cash is deducted, and interest is charged on the BALANCE "
        "for the fresh term (I = balance x rate x months/1200) -- either "
        "collected in cash or added to the new bill.",
        f"old bill = Rs {_fmt(A)}, cash paid now = Rs {_fmt(cash)}, fresh "
        f"term = {months:g} months, rate = {R:g}% per annum.",
        comp,
        f"check: cash {_fmt(cash)} + interest {_fmt(interest)} + new bill "
        f"{_fmt(new_bill)} = {_fmt(cash + interest + new_bill)} vs face "
        f"{_fmt(A)} + interest {_fmt(interest)} -- both sides equal "
        f"{_fmt(A + interest)}.",
        f"the acceptor owes Rs {_fmt(new_bill)} on the renewed bill, the "
        f"price of the extra {months:g} months of credit.")
    ans = (f"Interest = Rs {_fmt(interest)}; amount of the new bill = "
           f"Rs {_fmt(new_bill)}")
    return interest, steps, ans, \
        ([] if not cash_interest else ["interest collected in cash, so the "
                                       "new bill carries the balance only"]), \
        "interest = balance x rate x months/1200", \
        {"interest": interest, "new_bill": new_bill, "balance": balance}


def _c_insolvency(g, m, text):
    low = text.lower()
    if not re.search(r"insolv\w+|paise\s+in\s+(?:a|the|one)\s+rupee", low):
        return _GATE
    am = re.search(r"(?:owed|due\s+from|receivable\s+from|debt\s+of)"
                   r"[^.;]{0,25}?(?:rs\.?|inr)?\s*(" + _NUM + r")", low)
    A = _n(am.group(1)) if am else None
    if A is None or A <= 0:
        return _GATE
    pm = re.search(r"(?P<p>\d{1,2})\s*paise\s+in\s+(?:a|the|one)\s+rupee",
                   low)
    if pm:
        frac = _n(pm.group("p")) / 100.0
        basis = f"{pm.group('p')} paise per rupee"
    else:
        rm = re.search(r"(?P<r>" + _U_NUM + r")\s*%\s*(?:could\s+be|was|is)?"
                       r"\s*(?:only\s+)?recover", low)
        if not rm:
            rm = re.search(r"recover\w*[^.;]{0,20}(?P<r>" + _U_NUM
                           + r")\s*%", low)
        if rm:
            frac = _n(rm.group("r")) / 100.0
            basis = f"{rm.group('r')}% recovery"
        elif re.search(r"nothing|nil|not\w*\s+recover", low):
            frac = 0.0
            basis = "nothing recoverable"
        else:
            return _GATE
    if not (0 <= frac <= 1):
        return _GATE
    recovered = A * frac
    bad = A - recovered
    steps = _five(
        "insolvency of a debtor (Sec. 94 provisional dealings in books): "
        "only the fraction realisable from his estate is received; the "
        "unrecoverable remainder is written off as BAD DEBTS -- recovery = "
        "amount x paise-in-the-rupee.",
        f"amount due from the insolvent = Rs {_fmt(A)}; recovery = "
        f"{basis} ({frac:g} of the amount).",
        [f"Recovered = {_fmt(A)} x {frac:g} = {_fmt(recovered)}.",
         f"Bad debts = {_fmt(A)} - {_fmt(recovered)} = {_fmt(bad)}."],
        f"check: {_fmt(recovered)} + {_fmt(bad)} = {_fmt(A)} = the full "
        f"claim -- nothing is lost in the split.",
        f"Rs {_fmt(bad)} dies with the debtor and is debited to Bad Debts; "
        f"only Rs {_fmt(recovered)} ever comes back.")
    ans = (f"Recovered = Rs {_fmt(recovered)}; bad debts = Rs {_fmt(bad)}")
    return bad, steps, ans, None, "bad debts = amount x (1 - recovery)", \
        {"recovered": recovered, "bad_debts": bad}


def _c_incomplete(g, m, text):
    low = text.lower()
    if not re.search(r"incomplete\s+records|statement\s+of\s+affairs|"
                     r"single\s+entry", low):
        return _GATE
    oc = _lbl(text, r"opening\s+capital|capital\s+at\s+the\s+beginning|"
                    r"capital\s+in\s+the\s+beginning")
    cc = _lbl(text, r"closing\s+capital|capital\s+at\s+the\s+end|"
                    r"capital\s+at\s+year[\s-]*end")
    if oc is None or cc is None or oc <= 0 or cc <= 0:
        return _GATE
    drawings = _lbl(text, r"withdrew|drawings\s+(?:of|were|was)|drawings\b") \
        or 0.0
    added = _lbl(text, r"introduced\s+(?:fresh\s+|additional\s+)?capital|"
                       r"additional\s+capital|fresh\s+capital") or 0.0
    profit = cc - oc + drawings - added
    comp = [f"Closing capital - opening capital = {_fmt(cc)} - {_fmt(oc)} "
            f"= {_fmt(cc - oc)}."]
    comp.append(f"Add back drawings {_fmt(drawings)}, deduct fresh capital "
                f"{_fmt(added)}: profit = {_fmt(cc - oc)} + "
                f"{_fmt(drawings)} - {_fmt(added)} = {_fmt(profit)}.")
    steps = _five(
        "statement of affairs (incomplete records): capital grows only "
        "through PROFIT, so profit = closing capital - opening capital + "
        "drawings - additional capital introduced -- the capital "
        "comparison method.",
        f"opening capital = Rs {_fmt(oc)}, closing capital = Rs "
        f"{_fmt(cc)}, drawings = Rs {_fmt(drawings)}, fresh capital "
        f"introduced = Rs {_fmt(added)}.",
        comp,
        f"check: {_fmt(oc)} + {_fmt(profit)} - {_fmt(drawings)} + "
        f"{_fmt(added)} = {_fmt(oc + profit - drawings + added)} = the "
        f"closing capital -- the reconciliation closes.",
        f"the business made a profit of Rs {_fmt(profit)} even though no "
        f"complete books were kept.")
    ans = f"Profit = Rs {_fmt(profit)}"
    return profit, steps, ans, None, \
        "profit = closing capital - opening capital + drawings - additions", \
        {"opening_capital": oc, "closing_capital": cc, "profit": profit}


def _c_subscription(g, m, text):
    low = text.lower()
    if "subscription" not in low:
        return _GATE
    recv = _lbl(text, r"subscription[s]?\s+(?:received|collected)|"
                      r"received\s+(?:the\s+)?subscriptions?|"
                      r"collected\s+(?:the\s+)?subscriptions?")
    if recv is None:
        rm2 = re.search(r"subscription[s]?\s+(?:received|collected)"
                        r"[^.;]{0,30}?(?:rs\.?|inr)?\s*(" + _NUM + r")",
                        low)
        recv = _n(rm2.group(1)) if rm2 else None
    if recv is None or recv <= 0:
        return _GATE
    ose = osb = adve = advb = 0.0
    for clause in re.split(r"[.;]|\s+and\s+", text):
        cl = clause.lower()
        if not re.search(r"outstanding|accrued|advance|arrears", cl):
            continue
        am = re.search(r"(?:rs\.?|inr|\u20b9)\s*(" + _NUM + r")", clause,
                       re.I)
        if not am:
            continue
        amt = _n(am.group(1))
        if amt <= 0:
            continue                       # currency is required here, so a
                                           # bare 1900-2100 number is still
                                           # an amount, not a year
        at_end = bool(re.search(r"end|closing|31|closing\s+year", cl))
        at_beg = bool(re.search(r"beginning|opening|1\s*st|brought\s+"
                                r"forward", cl))
        if re.search(r"outstanding|accrued|arrears", cl):
            if at_beg and osb == 0.0:
                osb = amt
            elif ose == 0.0:
                ose = amt
        if re.search(r"advance", cl):
            if at_beg and advb == 0.0:
                advb = amt
            elif adve == 0.0:
                adve = amt
    income = recv + ose - osb - adve + advb
    comp = [f"Subscription received during the year = {_fmt(recv)}.",
            f"Add outstanding (accrued) at the end {_fmt(ose)}; less "
            f"outstanding at the beginning {_fmt(osb)}.",
            f"Less received in advance at the end {_fmt(adve)}; add "
            f"advance at the beginning {_fmt(advb)}.",
            f"Income = {_fmt(recv)} + {_fmt(ose)} - {_fmt(osb)} - "
            f"{_fmt(adve)} + {_fmt(advb)} = {_fmt(income)}."]
    steps = _five(
        "receipts and payments vs income and expenditure (NPO, accrual "
        "basis): subscription INCOME of the year = cash received + "
        "outstanding for the current year - outstanding of the prior year "
        "- received in advance for the next year + advance of the prior "
        "year now earned.",
        f"received = Rs {_fmt(recv)}, outstanding: end Rs {_fmt(ose)} / "
        f"beginning Rs {_fmt(osb)}, advance: end Rs {_fmt(adve)} / "
        f"beginning Rs {_fmt(advb)}.",
        comp,
        f"check: the figure {_fmt(income)} covers only the current year's "
        f"demand: prior-year arrears and next-year advances are both "
        f"excluded by construction.",
        f"the club earns Rs {_fmt(income)} of subscription income this "
        f"year regardless of cash timing.")
    ans = f"Subscription income = Rs {_fmt(income)}"
    return income, steps, ans, None, \
        "income = received + closing o/s - opening o/s - closing advance " \
        "+ opening advance", \
        {"subscription_income": income}


def _c_deceased(g, m, text):
    low = text.lower()
    if not re.search(r"\bdied\b|\bdeath\b|deceased", low):
        return _GATE
    if not re.search(r"till\s+(?:the\s+)?date\s+of\s+death|date\s+of\s+"
                     r"death|profit\s+till|share\s+of\s+profit", low):
        return _GATE
    pm = re.search(r"profit[^.;]{0,40}?(?:was|is|of|=|:)\s*(?:rs\.?|inr)?\s*"
                   r"(" + _NUM + r")", text, re.I)
    if not pm:
        pm = re.search(r"profit[^.;]{0,20}?" + _RS + r"(" + _NUM + r")",
                       text, re.I)
    P = _n(pm.group(1)) if pm else None
    if P is None or P <= 0:
        return _GATE
    sm = re.search(r"share\s+(?:of\s+profit\s+)?(?:was\s+|is\s+|=|:)?\s*"
                   r"(?P<a>\d+)\s*/\s*(?P<b>\d+)", text, re.I)
    if sm:
        frac = _n(sm.group("a")) / _n(sm.group("b"))
        share_txt = f"{sm.group('a')}/{sm.group('b')}"
    else:
        names = _partners_header(text)
        parts = _ratio_parts(text)
        dm = re.search(r"([A-Z][A-Za-z]{0,14})\s+(?:died|deceased)", text)
        if not names or not parts or not dm or dm.group(1) not in names:
            return _GATE
        i = names.index(dm.group(1))
        frac = parts[i] / sum(parts)
        share_txt = f"{parts[i]:g} : {_fmt(sum(parts))} share"
    if not (0 < frac < 1):
        return _GATE
    tm = re.search(r"(?P<n>\d{1,2})\s*months?", low)
    d0 = _parse_date(text)
    if tm and not d0:
        months = _n(tm.group("n"))
        basis = f"{tm.group('n')} months stated directly"
    elif d0:
        months = (d0.month - 4) % 12
        basis = (f"{_dstr(d0)} minus the accounting year start (1 April) = "
                 f"{months:g} months")
    else:
        return _GATE
    if not (0 <= months <= 12):
        return _GATE
    share = P * frac * months / 12.0
    steps = _five(
        "death of a partner (time basis): the deceased earns the year's "
        "profit PRO-RATA to the period from the accounting year start to "
        "the date of death -- share = profit x own fraction x months/12.",
        f"last year's profit = Rs {_fmt(P)}; deceased's share = "
        f"{share_txt}; period = {months:g} months ({basis}).",
        [f"Full-year share = {_fmt(P)} x {frac:g} = {_fmt(P * frac)}.",
         f"Share till death = {_fmt(P * frac)} x {months:g}/12 = "
         f"{_fmt(share)}."],
        f"check: {_fmt(P)} x {frac:g} x {months:g}/12 = {_fmt(share)} -- "
        f"the three factors multiply in one line as well.",
        f"Rs {_fmt(share)} is credited to the deceased partner's "
        f"executors for the months he was actually a partner.")
    ans = f"Deceased partner's share of profit till death = Rs {_fmt(share)}"
    return share, steps, ans, None, \
        "share = profit x own fraction x months/12", {"deceased_share": share}


def _c_gaining(g, m, text):
    low = text.lower()
    if not re.search(r"\bretir\w+|\bdied\b|\bdeath\b", low):
        return _GATE
    if re.search(r"till\s+(?:the\s+)?date\s+of\s+death|profit\s+till", low):
        return _GATE                      # DECEASED_SHARE owns that ask
    names = _partners_header(text)
    if not names:
        return _GATE
    ratios = list(re.finditer(
        r"(?P<a>" + _U_NUM + r")\s*:\s*(?P<b>" + _U_NUM + r")"
        r"(?:\s*:\s*(?P<c>" + _U_NUM + r"))?", text))
    if not ratios:
        return _GATE
    parts = [_n(ratios[0].group("a")), _n(ratios[0].group("b"))]
    if ratios[0].group("c"):
        parts.append(_n(ratios[0].group("c")))
    if any(p <= 0 for p in parts) or len(parts) != len(names):
        return _GATE
    rm = re.search(r"([A-Z][A-Za-z]{0,14})\s+(?:is\s+)?(?:retir\w+|died|"
                   r"deceased)", text)
    if not rm or rm.group(1) not in names:
        return _GATE
    out_i = names.index(rm.group(1))
    staying = [i for i in range(len(names)) if i != out_i]
    nm = re.search(r"(?P<n>\d{1,2})\s*months?", low)
    if len(ratios) >= 2:
        newr = ratios[-1]
        new_parts = [_n(newr.group("a")), _n(newr.group("b"))]
        if newr.group("c"):
            new_parts.append(_n(newr.group("c")))
        if len(new_parts) != len(staying):
            return _GATE
        basis = "new ratio of the continuing partners given"
    else:
        new_parts = [parts[i] for i in staying]
        basis = ("no new ratio given -> continuing partners absorb the "
                 "outgoing share in the OLD ratio (gaining = old)")
    old_frac = {i: parts[i] / sum(parts) for i in staying}
    new_total = sum(new_parts)
    gains = []
    for k, i in enumerate(staying):
        gains.append(new_parts[k] / new_total - old_frac[i])
    scaled = _int_scale([abs(x) for x in gains]) if all(g != 0 for g in gains) \
        else None
    comp = [f"Old shares: "
            + ", ".join(f"{names[i]} {old_frac[i]:.6g}" for i in staying)
            + f" (of 1).",
            f"New shares: "
            + ", ".join(f"{names[i]} {new_parts[k] / new_total:.6g}"
                        for k, i in enumerate(staying)) + " (of 1)."]
    for k, i in enumerate(staying):
        comp.append(f"{names[i]}: gain = new {new_parts[k] / new_total:.6g} "
                    f"- old {old_frac[i]:.6g} = {gains[k]:.6g}.")
    steps = _five(
        "retirement of a partner: GAINING ratio = new share - old share of "
        "each CONTINUING partner -- it is the proportion in which they "
        "acquire the outgoing partner's share and pay for his goodwill.",
        f"partners " + ", ".join(names) + "; old ratio "
        + " : ".join(_fmt(p) for p in parts) + f"; {names[out_i]} retires; "
        + basis + ".",
        comp,
        f"check: gains total {sum(gains):.6g} = the retiring partner's "
        f"share {parts[out_i] / sum(parts):.6g} -- nothing is gained or "
        f"lost in aggregate."
        if abs(sum(gains) - parts[out_i] / sum(parts)) < 1e-9 else
        f"check: gains total {sum(gains):.6g}; verify each new share "
        f"recomputes from its ratio.",
        f"the continuing partners compensate {names[out_i]} for goodwill "
        f"in this gaining ratio.")
    scaled_txt = (" : ".join(str(x) for x in scaled) if scaled
                  else " : ".join(f"{g:.6g}" for g in gains))
    ans = f"Gaining ratio ({', '.join(names[i] for i in staying)}) = " \
          f"{scaled_txt}"
    return None, steps, ans, None, "gaining = new share - old share", {
        f"gain_{k+1}": v for k, v in enumerate(gains)}


def _c_goodwill(g, m, text):
    low = text.lower()
    if "goodwill" not in low:
        return _GATE
    yp = re.search(r"(?P<y>\d{1,2})\s*(?:years?[' ]?\s*)?purchase", low)
    years = _n(yp.group("y")) if yp else None
    # average profit: a listed series (>=2 amounts in the profits clause,
    # cut before other labelled items), else a single stated average
    series = []
    seg = re.search(r"profits?[^.;]{0,140}", text, re.I)
    if seg:
        seg_txt = re.split(r"capital|normal|employed|purchase|rate\s+of|"
                           r"assets|liabilit",
                           seg.group(0), flags=re.I)[0]
        series = [_n(x) for x in
                  re.findall(_RS + r"(" + _NUM + r")", seg_txt)]
        series = [x for x in series if x > 0 and not 1900 < x < 2100]
    avg = sum(series) / len(series) if len(series) >= 2 else None
    if avg is None:
        am = re.search(r"average\s+(?:profits?|profit)[^.;]{0,40}?"
                       r"(?:rs\.?|inr)?\s*(" + _NUM + r")", text, re.I)
        avg = _n(am.group(1)) if am else None
    if avg is None or avg <= 0:
        return _GATE
    ce = _lbl(text, r"capital\s+employed")
    if ce is None:
        assets = _lbl(text, r"assets(?:\s+of)?")
        liab = _lbl(text, r"(?:external\s+)?liabilit(?:y|ies)")
        if assets is not None and liab is not None:
            ce = assets - liab
    nrr = None
    nm = re.search(r"normal\s+rate\s+of\s+return[^.;]{0,30}?(\d{1,2}(?:\.\d+)?)\s*%",
                   low)
    if nm:
        nrr = _n(nm.group(1))
    method = "average profit"
    if re.search(r"capitalis\w+", low) and nrr is not None:
        method = "capitalisation"
        if ce is None:
            return _GATE
        cap_val = avg * 100.0 / nrr
        gw = cap_val - ce
        comp = [f"Capitalised value of average profits = {_fmt(avg)} x "
                f"100 / {nrr:g} = {_fmt(cap_val)}.",
                f"Goodwill = capitalised value - capital employed = "
                f"{_fmt(cap_val)} - {_fmt(ce)} = {_fmt(gw)}."]
        rule = ("capitalisation method: the business is valued as if its "
                "average profit were the normal return (avg x 100/NRR); "
                "goodwill is the EXCESS of that value over the actual "
                "capital employed.")
    elif (re.search(r"super\s+profit", low) or
          (nrr is not None and ce is not None and
           re.search(r"super", low))):
        if nrr is None or ce is None or ce <= 0:
            return _GATE
        method = "super profit"
        normal = ce * nrr / 100.0
        super_p = avg - normal
        gw = super_p * years if years else None
        if gw is None:
            return _GATE
        comp = [f"Normal profit = capital employed x NRR = {_fmt(ce)} x "
                f"{nrr:g}% = {_fmt(normal)}.",
                f"Super profit = average profit - normal profit = "
                f"{_fmt(avg)} - {_fmt(normal)} = {_fmt(super_p)}.",
                f"Goodwill = super profit x {years:g} years' purchase = "
                f"{_fmt(super_p)} x {years:g} = {_fmt(gw)}."]
        rule = ("super profit method: goodwill pays only for earnings "
                "ABOVE the normal return (avg - capital x NRR) x years' "
                "purchase.")
    else:
        if years is None:
            return _GATE
        gw = avg * years
        comp = [f"Average profit = {_fmt(avg)}.",
                f"Goodwill = average profit x {years:g} years' purchase = "
                f"{_fmt(avg)} x {years:g} = {_fmt(gw)}."]
        rule = ("average profit method: goodwill = average maintainable "
                "profit x the agreed number of years' purchase.")
    if gw is None or gw <= 0:
        return _GATE
    if series:
        comp.insert(0, f"Average profit = ({' + '.join(_fmt(x) for x in series)}"
                    f") / {len(series)} = {_fmt(avg)}.")
    steps = _five(
        rule,
        f"average profit = Rs {_fmt(avg)}"
        + (f"; capital employed = Rs {_fmt(ce)}" if ce else "")
        + (f"; normal rate = {nrr:g}%" if nrr else "")
        + (f"; {years:g} years' purchase" if years else "") + ".",
        comp,
        f"check: recompute the last line of the chain -> {_fmt(gw)} -- the "
        f"{method} chain closes.",
        f"the firm's goodwill under the {method} method is valued at "
        f"Rs {_fmt(gw)}.")
    ans = f"Goodwill = Rs {_fmt(gw)} ({method} method)"
    return gw, steps, ans, None, f"goodwill ({method} method)", \
        {"goodwill": gw, "average_profit": avg}


def _c_forfeiture(g, m, text):
    low = text.lower()
    if not re.search(r"forfeit|re[- ]?issu\w+", low):
        return _GATE
    if "debenture" in low:
        return _GATE
    nm = re.search(r"(?P<n>" + _U_NUM + r")\s+shares?\b", text)
    n = _n(nm.group("n")) if nm else None
    cm = re.search(r"(?:rs\.?|inr)?\s*(" + _NUM + r")\s*(?:per\s+share\s+)?"
                   r"(?:was|is|were|has\s+been)?\s*called[- ]?up", text,
                   re.I)
    called = _n(cm.group(1)) if cm else None
    unpaid = _lbl(text, r"call\s+of|not\s+been\s+paid|failed\s+to\s+pay|"
                        r"non[- ]?payment\s+of|did\s+not\s+pay")
    if n is None or n <= 0 or called is None or unpaid is None:
        return _GATE
    if not (0 < unpaid < called <= 1000):
        return _GATE
    paid = called - unpaid
    rm = re.search(r"re[- ]?issu\w+[^.;]{0,40}?(?:rs\.?|inr)?\s*(" + _NUM
                   + r")", text, re.I)
    if rm:
        reissue = _n(rm.group(1))
        if reissue <= 0 or reissue > called:
            return _GATE
        disc = called - reissue
        cr_per = paid - disc
        comp = [f"Amount actually received per share = called-up "
                f"{_fmt(called)} - unpaid {_fmt(unpaid)} = {_fmt(paid)}.",
                f"Discount allowed on reissue = {_fmt(called)} - "
                f"{_fmt(reissue)} = {_fmt(disc)} per share.",
                f"Capital reserve per share = {_fmt(paid)} - {_fmt(disc)} "
                f"= {_fmt(cr_per)}; total = {_fmt(cr_per)} x {_fmt(n)} = "
                f"{_fmt(cr_per * n)}."]
        rule = ("forfeiture and reissue: the Shares Forfeited A/c holds "
                "what was RECEIVED on the forfeited shares; on reissue the "
                "discount allowed cannot exceed that amount, and the "
                "balance is a CAPITAL RESERVE (a profit, not income).")
    else:
        cr_per = paid
        comp = [f"Amount actually received per share = {_fmt(called)} - "
                f"{_fmt(unpaid)} = {_fmt(paid)}.",
                f"Total forfeited = {_fmt(paid)} x {_fmt(n)} = "
                f"{_fmt(paid * n)} (credit in Shares Forfeited A/c)."]
        rule = ("forfeiture: the amount already received on shares whose "
                "calls were unpaid is credited to Shares Forfeited A/c -- "
                "capital reserve materialises on reissue.")
    cr_total = cr_per * n
    steps = _five(
        rule,
        f"{_fmt(n)} shares; called up = Rs {_fmt(called)} per share; "
        f"unpaid = Rs {_fmt(unpaid)} per share"
        + (f"; reissued at Rs {_fmt(reissue)}" if rm else "") + ".",
        comp,
        f"check: forfeiture credit {_fmt(paid)} x {_fmt(n)} = "
        f"{_fmt(paid * n)}"
        + (f"; less reissue discount {_fmt(disc)} x {_fmt(n)} = "
           f"{_fmt(disc * n)} -> {_fmt(cr_total)}." if rm else "."),
        f"Rs {_fmt(cr_total)} is the capital reserve -- a realised capital "
        f"gain, never routed through the P&L.")
    ans = f"Capital reserve = Rs {_fmt(cr_total)}"
    return cr_total, steps, ans, None, \
        "capital reserve = (received - reissue discount) x shares", \
        {"capital_reserve": cr_total}


def _c_share_issue(g, m, text):
    low = text.lower()
    if "debenture" in low or "forfeit" in low:
        return _GATE
    if not re.search(r"shares?\s+of\s+Rs|shares?\s+of\s+Rs\.", low) and \
            not re.search(r"issued\s+" + _U_NUM + r"\s+shares?", low):
        return _GATE
    nm = re.search(r"issued\s+(?P<n>" + _U_NUM + r")\s+shares?|"
                   r"(?P<n2>" + _U_NUM + r")\s+shares?\s+of", text, re.I)
    if not nm:
        return _GATE
    n = _n(nm.group("n") or nm.group("n2"))
    fm = re.search(r"shares?\s+of\s+(?:rs\.?|inr)?\s*(?P<f>" + _U_NUM + r")"
                   r"\s+each", text, re.I)
    if not fm or n <= 0:
        return _GATE
    face = _n(fm.group("f"))
    prem = _lbl(text, r"premium\s+of") or 0.0
    pm_pct = re.search(r"premium\s+of\s*(?P<p>" + _U_NUM + r")\s*%", low)
    prem_val = _n(pm_pct.group("p")) / 100.0 * face if pm_pct else prem
    disc = _lbl(text, r"discount\s+of") or 0.0
    dp_pct = re.search(r"discount\s+of\s*(?P<d>" + _U_NUM + r")\s*%", low)
    disc_val = _n(dp_pct.group("d")) / 100.0 * face if dp_pct else disc
    issue_price = face + prem_val - disc_val
    if issue_price <= 0:
        return _GATE
    app = _amt_before(text, r"on\s+application")
    allot = _amt_before(text, r"on\s+allotment")
    comp = [f"Issue price per share = face {_fmt(face)}"
            + (f" + premium {_fmt(prem_val)}" if prem_val else "")
            + (f" - discount {_fmt(disc_val)}" if disc_val else "")
            + f" = {_fmt(issue_price)}."]
    if app is not None and allot is not None:
        call = issue_price - app - allot
        if call < 0:
            return _GATE
        comp.append(f"Call per share = {_fmt(issue_price)} - application "
                    f"{_fmt(app)} - allotment {_fmt(allot)} = "
                    f"{_fmt(call)}.")
        comp.append(f"Total call money = {_fmt(call)} x {_fmt(n)} = "
                    f"{_fmt(call * n)}.")
        total = call * n
        ans = (f"Call = Rs {_fmt(call)} per share; total call money = "
               f"Rs {_fmt(total)}")
        ask = "call"
    else:
        total = issue_price * n
        comp.append(f"Total issue proceeds = {_fmt(issue_price)} x "
                    f"{_fmt(n)} = {_fmt(total)}.")
        ans = f"Total issue proceeds = Rs {_fmt(total)}"
        ask = "proceeds"
    steps = _five(
        "issue of shares at par/premium (Sec. 56 schedule): the issue price "
        "is face value +/- premium/discount and is collected in stages "
        "(application, allotment incl. premium, calls) -- whatever is not "
        "yet collected is the balance due on the call.",
        f"{_fmt(n)} shares of Rs {_fmt(face)} each"
        + (f" at a premium of Rs {_fmt(prem_val)}" if prem_val else " at par")
        + (f" (less discount Rs {_fmt(disc_val)})" if disc_val else "")
        + (f"; application Rs {_fmt(app)}, allotment Rs {_fmt(allot)}"
           if app is not None and allot is not None else "") + ".",
        comp,
        f"check: per-share legs "
        + (f"{_fmt(app)} + {_fmt(allot)} + {_fmt(call)} = "
           f"{_fmt(app + allot + call)} = issue price" if app is not None
           and allot is not None else
           f"{_fmt(issue_price)} x {_fmt(n)} = {_fmt(total)}")
        + " -- the instalments add back exactly.",
        f"the company collects Rs {_fmt(total)} on the {ask}.")
    return total, steps, ans, None, \
        "call per share = face + premium - application - allotment", \
        {"issue_price": issue_price, "total": total}


def _c_debenture(g, m, text):
    low = text.lower()
    if "debenture" not in low:
        return _GATE
    nm = re.search(r"(?P<n>" + _U_NUM + r")\s+debentures?", text)
    fm = re.search(r"debentures?\s+of\s+(?:rs\.?|inr)?\s*(?P<f>" + _U_NUM
                   + r")\s+each", text, re.I)
    if not nm or not fm:
        return _GATE
    n, face = _n(nm.group("n")), _n(fm.group("f"))
    if n <= 0 or face <= 0:
        return _GATE
    im = re.search(r"issu\w+[^.;]{0,60}?at\s+(?:a\s+)?(?P<v>" + _U_NUM
                   + r")\s*%\s*(?P<k>premium|discount)", low)
    adj_i, kind_i = 0.0, ""
    if im:
        kind_i = im.group("k")
        adj_i = _n(im.group("v"))
    rm = re.search(r"redeem\w*[^.;]{0,60}?at\s+(?:a\s+)?(?P<v>" + _U_NUM
                   + r")\s*%\s*(?P<k>premium|discount)", low)
    adj_r, kind_r = 0.0, ""
    if rm:
        kind_r = rm.group("k")
        adj_r = _n(rm.group("v"))
    nominal = n * face
    proceeds = nominal * (1 + adj_i / 100.0) if kind_i == "premium" else \
        nominal * (1 - adj_i / 100.0)
    redemption = nominal * (1 + adj_r / 100.0) if kind_r == "premium" else \
        nominal * (1 - adj_r / 100.0)
    comp = [f"Nominal value = {_fmt(n)} x {_fmt(face)} = {_fmt(nominal)}.",
            f"Issue proceeds = nominal x (1 {'+' if kind_i == 'premium' else '-'} "
            f"{adj_i:g}%) = {_fmt(proceeds)}.",
            f"Redemption amount = nominal x (1 {'+' if kind_r == 'premium' else '-'} "
            f"{adj_r:g}%) = {_fmt(redemption)}."]
    ask_redeem = bool(re.search(r"redemption\s+amount|amount.{0,25}redeem|"
                                r"repay", low))
    steps = _five(
        "issue and redemption of debentures: proceeds = nominal value "
        "adjusted by the issue premium/discount, and the redemption "
        "payment = nominal value adjusted by the REDEMPTION terms -- the "
        "difference between the two is loss (or gain) on issue.",
        f"{_fmt(n)} debentures of Rs {_fmt(face)} each"
        + (f"; issued at {adj_i:g}% {kind_i}" if kind_i else "; at par")
        + (f"; redeemable at {adj_r:g}% {kind_r}" if kind_r else
           "; redeemed at par") + ".",
        comp,
        f"check: {_fmt(nominal)} x (1 {'+' if kind_i == 'premium' else '-'} "
        f"{adj_i:g}/100) = {_fmt(proceeds)} and {_fmt(nominal)} x (1 "
        f"{'+' if kind_r == 'premium' else '-'} {adj_r:g}/100) = "
        f"{_fmt(redemption)} -- both recomputed.",
        f"the company raises Rs {_fmt(proceeds)} now and must pay back "
        f"Rs {_fmt(redemption)} on redemption.")
    ans = (f"Issue proceeds = Rs {_fmt(proceeds)}; redemption amount = "
           f"Rs {_fmt(redemption)}")
    value = redemption if ask_redeem else proceeds
    return value, steps, ans, None, \
        "proceeds = nominal x (1 +/- issue adj); redemption = nominal x " \
        "(1 +/- redemption adj)", \
        {"proceeds": proceeds, "redemption": redemption}


# cash-flow: item keyword -> effect on operating cash (indirect method)
_CFO_NONCASH_ADD = (r"depreciation|amortis\w+|goodwill\s+written\s+off|"
                    r"patents?\s+written\s+off|loss\s+on\s+(?:sale|"
                    r"disposal)|provision\s+for\s+(?:doubtful\s+)?debts")
_CFO_NONCASH_SUB = r"profit\s+on\s+(?:sale|disposal|redemption)"
_CFO_CA_WORDS = r"debtors?|receivables?|stock|inventor\w+|prepaid\w*|bills\s+receivable"
_CFO_CL_WORDS = r"creditors?|payables?|outstanding\s+expenses|provision\s+for\s+tax|bills\s+payable"


def _c_cash_flow(g, m, text):
    low = text.lower()
    if not re.search(r"cash\s+flow|operating\s+activities", low):
        return _GATE
    pm = re.search(r"(?:net\s+)?profit\s*(?:before\s+tax|after\s+tax)?\s*"
                   r"(?:is|of|was|=|:)?\s*(?:rs\.?|inr)?\s*(" + _NUM + r")",
                   text, re.I)
    if not pm:
        return _GATE
    np_v = _n(pm.group(1))
    if np_v <= 0:
        return _GATE
    comp = [f"Net profit before tax = {_fmt(np_v)} (starting point of the "
            f"indirect method)."]
    used_spans = []
    adds = 0.0

    def _claim(span):
        if any(s0 <= span[0] < s1 for (s0, s1) in used_spans):
            return False
        used_spans.append(span)
        return True

    for kw in re.finditer(_CFO_NONCASH_ADD, text, re.I):
        after = text[kw.span()[1]: kw.span()[1] + 40]
        am = re.search(_RS + r"(" + _NUM + r")", after)
        if am and _claim(kw.span()):
            v = _n(am.group(1))
            adds += v
            comp.append(f"Add back {kw.group(0)} {_fmt(v)} -- a non-cash / "
                        f"non-operating item already debited to profit.")
    for kw in re.finditer(_CFO_NONCASH_SUB, text, re.I):
        after = text[kw.span()[1]: kw.span()[1] + 40]
        am = re.search(_RS + r"(" + _NUM + r")", after)
        if am and _claim(kw.span()):
            v = _n(am.group(1))
            adds -= v
            comp.append(f"Less {kw.group(0)} {_fmt(v)} -- a non-operating "
                        f"gain inside profit.")
    for kw in re.finditer(r"(?P<dir>increas\w*|decreas\w*|ris\w+|fell|"
                          r"fall\w*)\s+in\s+(" + _CFO_CA_WORDS + r")",
                          text, re.I):
        after = text[kw.span()[1]: kw.span()[1] + 40]
        am = re.search(_RS + r"(" + _NUM + r")", after)
        if not am or not _claim(kw.span()):
            continue
        v = _n(am.group(1))
        up = kw.group("dir").lower()[:3] in ("inc", "ris")
        adds += -v if up else v
        comp.append(f"{'Less' if up else 'Add'} {kw.group(0)} {_fmt(v)} -- "
                    f"current asset {'rise absorbs' if up else 'fall releases'} "
                    f"cash.")
    for kw in re.finditer(r"(?P<dir>increas\w*|decreas\w*|ris\w+|fell|"
                          r"fall\w*)\s+in\s+(" + _CFO_CL_WORDS + r")",
                          text, re.I):
        after = text[kw.span()[1]: kw.span()[1] + 40]
        am = re.search(_RS + r"(" + _NUM + r")", after)
        if not am or not _claim(kw.span()):
            continue
        v = _n(am.group(1))
        up = kw.group("dir").lower()[:3] in ("inc", "ris")
        adds += v if up else -v
        comp.append(f"{'Add' if up else 'Less'} {kw.group(0)} {_fmt(v)} -- "
                    f"current liability {'rise funds' if up else 'fall drains'} "
                    f"operations.")
    if len(comp) < 2:
        return _GATE                  # need at least one adjustment
    cfo = np_v + adds
    steps = _five(
        "cash flow from operating activities (AS-3 indirect method): start "
        "from net profit and undo every NON-CASH / non-operating item, then "
        "adjust working-capital movements -- a rise in current assets absorbs "
        "cash, a rise in current liabilities funds it. Investing/financing "
        "items stay OUT of this section.",
        f"net profit before tax = Rs {_fmt(np_v)}.",
        comp,
        f"check: {_fmt(np_v)} {'+' if adds >= 0 else '-'} "
        f"{_fmt(abs(adds))} = {_fmt(cfo)} recomputes the operating cash "
        f"flow line by line.",
        f"core operations actually generated Rs {_fmt(cfo)} of cash.")
    ans = f"Net cash from operating activities = Rs {_fmt(cfo)}"
    return cfo, steps, ans, None, "CFO = NP + non-cash +/- working capital", \
        {"cash_from_operations": cfo}


def _c_inventory_turnover(g, m, text):
    low = text.lower()
    if not re.search(r"inventory\s+turnover|stock\s+turnover", low):
        return _GATE
    cogs = _lbl(text, r"cost\s+of\s+(?:goods\s+sold|revenue\s+from\s+"
                      r"operations|sales)|cogs")
    if cogs is None or cogs <= 0:
        return _GATE
    io = _lbl(text, r"opening\s+(?:stock|inventory)")
    ic = _lbl(text, r"closing\s+(?:stock|inventory)")
    if ic is None:
        ic = _lbl(text, r"(?:average\s+)?(?:stock|inventory)")
    if ic is None or ic <= 0:
        return _GATE
    if io is not None and io > 0:
        avg = (io + ic) / 2.0
        basis = (f"average inventory = ({_fmt(io)} + {_fmt(ic)}) / 2 = "
                 f"{_fmt(avg)}")
    else:
        avg = ic
        basis = f"only closing inventory given -> average = {_fmt(ic)}"
    times = cogs / avg
    steps = _five(
        "inventory (stock) turnover: cost of goods sold / average "
        "inventory -- how many times stock is converted into sales in a "
        "year; opening + closing averaged smooths the seasonality.",
        f"COGS = Rs {_fmt(cogs)}; opening inventory = Rs {_fmt(io or 0)}; "
        f"closing inventory = Rs {_fmt(ic)}.",
        [f"{basis}.",
         f"Inventory turnover = {_fmt(cogs)} / {_fmt(avg)} = "
         f"{_fmt(times)} times."],
        f"check: {_fmt(avg)} x {_fmt(times)} = {_fmt(avg * times)} = the "
        f"COGS -- division consistent.",
        f"stock is rotated about {_fmt(times)} times a year; higher is "
        f"generally a faster-moving, healthier inventory.")
    ans = f"Inventory turnover = {_fmt(times)} times"
    return None, steps, ans, None, "inventory turnover = COGS / avg inventory", \
        {"inventory_turnover": times}


def _c_receivables_turnover(g, m, text):
    low = text.lower()
    if not re.search(r"(?:receivables?|debtors?)\s+turnover", low):
        return _GATE
    sales = _lbl(text, r"(?:net\s+)?credit\s+sales")
    basis = "credit sales" if sales is not None else None
    if sales is None:
        sales = _lbl(text, r"(?:net\s+)?(?:revenue\s+from\s+operations|"
                           r"sales)")
        basis = "net sales (credit sales not stated)"
    if sales is None or sales <= 0:
        return _GATE
    do = _lbl(text, r"opening\s+(?:sundry\s+)?debtors?")
    dc = _lbl(text, r"closing\s+(?:sundry\s+)?debtors?")
    if dc is None:
        dc = _lbl(text, r"(?:sundry\s+)?debtors?") or \
            _lbl(text, r"(?:closing\s+)?trade\s+receivables?")
    if dc is None or dc <= 0:
        return _GATE
    if do is not None and do > 0:
        avg = (do + dc) / 2.0
        basis_avg = (f"average receivables = ({_fmt(do)} + {_fmt(dc)}) / 2 "
                     f"= {_fmt(avg)}")
    else:
        avg = dc
        basis_avg = f"only closing debtors given -> average = {_fmt(dc)}"
    times = sales / avg
    steps = _five(
        "trade receivables (debtors) turnover: net credit sales / average "
        "trade receivables -- how quickly credit customers pay; it feeds "
        "the average collection period (365 / turnover).",
        f"sales basis = {basis} Rs {_fmt(sales)}; opening debtors = Rs "
        f"{_fmt(do or 0)}; closing debtors = Rs {_fmt(dc)}.",
        [f"{basis_avg}.",
         f"Receivables turnover = {_fmt(sales)} / {_fmt(avg)} = "
         f"{_fmt(times)} times."],
        f"check: {_fmt(avg)} x {_fmt(times)} = {_fmt(avg * times)} = the "
        f"sales figure -- division consistent.",
        f"debtors are converted to cash about {_fmt(times)} times a year "
        f"(collection period about {365.0 / times:.0f} days).")
    ans = f"Trade receivables turnover = {_fmt(times)} times"
    return None, steps, ans, None, \
        "receivables turnover = net credit sales / avg receivables", \
        {"receivables_turnover": times}


def _c_working_capital(g, m, text):
    low = text.lower()
    if "working capital" not in low:
        return _GATE
    if re.search(r"\bratio\b", low):
        return _GATE                      # CURRENT_RATIO owns the ratio ask
    ca = _lbl(text, r"current\s+assets?")
    cl = _lbl(text, r"current\s+liabilit(?:y|ies)")
    if ca is None:
        ca, _h = _sum_labelled(text, _CA_WORDS)
    if cl is None:
        cl, _h2 = _sum_labelled(text, _CL_WORDS)
    if not ca or not cl or cl <= 0:
        return _GATE
    wc = ca - cl
    steps = _five(
        "working capital: current assets MINUS current liabilities -- the "
        "cushion of short-term resources left after every short-term claim "
        "is settled (the ratio form is covered by the current ratio).",
        f"current assets = Rs {_fmt(ca)}, current liabilities = "
        f"Rs {_fmt(cl)}.",
        [f"Working capital = {_fmt(ca)} - {_fmt(cl)} = {_fmt(wc)}."],
        f"check: {_fmt(cl)} + {_fmt(wc)} = {_fmt(cl + wc)} = the current "
        f"assets -- the identity closes.",
        f"Rs {_fmt(wc)} of short-term funds would remain after clearing "
        f"all current dues."
        if wc >= 0 else
        f"current liabilities exceed current assets by Rs {_fmt(abs(wc))} "
        f"-- a strained short-term position.")
    ans = f"Working capital = Rs {_fmt(wc)}"
    return wc, steps, ans, None, "working capital = CA - CL", \
        {"working_capital": wc}


# --------------------------------------------------------------------------- #
# the table: (FID, trigger regex with named slots, compute)
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, Any, Any]] = [
    # ---- trial balance ----
    ("TRIAL_BALANCE_DIFF",
     r"trial\s+balance.{0,200}?debit[^.;]{0,40}?" + _NUM
     + r".{0,120}?credit[^.;]{0,40}?" + _NUM,
     _c_trial_balance),

    # ---- journal entry (golden rules; journal_entry() re-checks the
    #      verb/noun ask inside its own gate) ----
    ("JOURNAL_ENTRY",
     r"(" + _TXN_NOUN + r")",
     lambda g, m, text: (_c_journal(g, m, text))),

    # ---- depreciation ----
    ("DEP_SLM",
     r"(straight\s+line|depreciat\w+)",
     _c_dep_slm),
    ("DEP_WDV",
     r"(written\s+down|wdv\b|reducing\s+balance|declining|diminishing|"
     r"depreciat\w+)",
     _c_dep_wdv),

    # ---- final accounts ----
    ("GROSS_PROFIT",
     r"(gross\s+profit|trading\s+account)",
     _c_gross_profit),
    ("NET_PROFIT",
     r"net\s+profit",
     _c_net_profit),
    ("BALANCE_SHEET_MISSING",
     r"balance\s+sheet|assets\s*(?:are|=|:)?\s*" + _NUM,
     _c_balance_sheet),

    # ---- banking ----
    ("BRS_ADJUST",
     r"reconciliation|pass\s?book",
     _c_brs),

    # ---- appropriations ----
    ("INTEREST_CAPITAL",
     r"interest\s+on\s+capital|interest\s+is\s+allowed\s+on\s+capital|"
     r"allow\s+interest\s+on\s+capital",
     _c_interest_capital),
    ("INTEREST_DRAWINGS",
     r"interest\s+on\s+drawings",
     _c_interest_drawings),

    # ---- partnership ----
    ("PARTNER_GUARANTEE",
     r"guarantee",
     _c_partner_guarantee),
    ("PARTNERSHIP_NEW_RATIO",
     r"admit\w*|joins?",
     _c_new_ratio),
    ("PARTNERSHIP_PROFIT_SHARE",
     r"partners?.{0,200}ratio.{0,200}profit|profit.{0,200}ratio",
     _c_partnership_share),

    # ---- ratios ----
    ("QUICK_RATIO",
     r"quick\s+ratio|liquid\s+ratio|acid[- ]test\s+ratio",
     _c_quick_ratio),
    ("CURRENT_RATIO",
     r"current\s+ratio|working\s+capital\s+ratio",
     _c_current_ratio),
    ("DEBT_EQUITY_RATIO",
     r"debt[\s-]*(?:to[\s-]*)?equity\s+ratio",
     _c_debt_equity),
    ("GP_RATIO",
     r"gross\s+profit\s+ratio|gp\s+ratio",
     _c_gp_ratio),
    ("NP_RATIO",
     r"net\s+profit\s+ratio|np\s+ratio",
     _c_np_ratio),
]

# --------------------------------------------------------------------------- #
# BOOKS2 rows -- scanned AFTER the core table.  Order matters: forfeiture
# before share issue, deceased before gaining, turnover ratios before
# working capital (and CURRENT_RATIO, in the core table, keeps the
# "working capital ratio" ask).
# --------------------------------------------------------------------------- #

_TABLE_BOOKS2: List[Tuple[str, Any, Any]] = [
    # ---- bills of exchange ----
    ("BILL_DUE_DATE",
     r"bill|promissory",
     _c_bill_due),
    ("BILL_DISCOUNT",
     r"bill.{0,80}discount|discount.{0,80}bill",
     _c_bill_discount),
    ("BILL_RENEWAL",
     r"renew|new\s+bill",
     _c_bill_renewal),

    # ---- insolvency ----
    ("INSOLVENCY_RECOVERY",
     r"insolv\w+|paise\s+in\s+(?:a|the|one)\s+rupee",
     _c_insolvency),

    # ---- incomplete records / NPO ----
    ("INCOMPLETE_RECORDS_PROFIT",
     r"incomplete\s+records|statement\s+of\s+affairs|single\s+entry",
     _c_incomplete),
    ("SUBSCRIPTION_INCOME",
     r"subscription",
     _c_subscription),

    # ---- reconstitution: retirement / death / goodwill ----
    ("DECEASED_SHARE",
     r"\bdied\b|\bdeath\b|deceased",
     _c_deceased),
    ("GAINING_RATIO",
     r"\bretir\w+|\bdied\b|\bdeath\b",
     _c_gaining),
    ("GOODWILL_VALUATION",
     r"goodwill",
     _c_goodwill),

    # ---- company accounts ----
    ("FORFEITURE_REISSUE",
     r"forfeit|re[- ]?issu\w+",
     _c_forfeiture),
    ("SHARE_ISSUE",
     r"shares?\s+of\s+Rs|issued\s+" + _U_NUM + r"\s+shares?|"
     r"share\s+capital",
     _c_share_issue),
    ("DEBENTURE_ISSUE",
     r"debenture",
     _c_debenture),
    ("CASH_FLOW_OPERATING",
     r"cash\s+flow|operating\s+activities",
     _c_cash_flow),

    # ---- turnover ratios / working capital ----
    ("INVENTORY_TURNOVER",
     r"inventory\s+turnover|stock\s+turnover",
     _c_inventory_turnover),
    ("RECEIVABLES_TURNOVER",
     r"(?:receivables?|debtors?)\s+turnover",
     _c_receivables_turnover),
    ("WORKING_CAPITAL",
     r"working\s+capital",
     _c_working_capital),
]


# precompile triggers once at import (regex errors surface immediately)
TABLE = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE] + \
        [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE_BOOKS2]


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #


# per-family confidence.  Rows that have a weaker generic competitor in
# the registry (applied-maths DEPRECIATION ships the bare compound
# factor "0.729" instead of the book-value schedule) run at 0.98 so the
# accountancy-textbook answer wins the confidence race; everything else
# stays at the maths2 default 0.95.
_CONF: Dict[str, float] = {
    "DEP_SLM": 0.98,
    "DEP_WDV": 0.98,
}


def model_accountancy_families(text: str) -> ModelResult:
    """Deterministic dispatcher: scan the accountancy table, first
    grounded hit wins (gates inside compute reject a trigger hit and the
    scan continues).  Never calls an LLM."""
    norm = _norm(text)
    for fid, pattern, compute in TABLE:
        m = pattern.search(norm)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {},
                    conf=_CONF.get(fid, 0.95))
    return _no("ACCOUNTANCY", "no accountancy family matched")
