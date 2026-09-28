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

Coverage (16 families):
  journal        JOURNAL_ENTRY (golden-rules debit/credit pairs)
  depreciation   DEP_SLM (any-solve + schedule), DEP_WDV (schedule,
                 value after n years, implied rate)
  final accounts GROSS_PROFIT, NET_PROFIT, TRIAL_BALANCE_DIFF,
                 BALANCE_SHEET_MISSING (equality check + missing figure)
  ratios         CURRENT_RATIO, QUICK_RATIO, DEBT_EQUITY_RATIO,
                 GP_RATIO, NP_RATIO
  banking        BRS_ADJUST (cash book <-> pass book, both directions)
  appropriations INTEREST_CAPITAL (any-solve), INTEREST_DRAWINGS
                 (products method)
  partnership    PARTNERSHIP_PROFIT_SHARE (ratio division with
                 appropriations), PARTNER_GUARANTEE,
                 PARTNERSHIP_NEW_RATIO (admission sacrificing ratio)

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
    steps = (["Golden rules applied:"]
             + [f"  Dr {dr}: {r}" for r in reasons[:1]]
             + [f"  Cr {cr}: {r}" for r in reasons[1:]]
             + [f"Both sides equal at Rs {_fmt(amount)} -- the double entry "
                f"keeps the accounting equation balanced."])
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
        return life, [
            f"Under SLM the asset depreciates by Rs {_fmt(dep)} each year.",
            f"Depreciable cost = cost - salvage = {_fmt(cost)} - "
            f"{_fmt(salvage)} = {_fmt(cost - salvage)}.",
            f"Life = depreciable cost / annual depreciation = "
            f"{_fmt(cost - salvage)} / {_fmt(dep)} = {_fmt(life)} years.",
        ], ans, None, "life = (cost - salvage) / annual depreciation", \
            {"life": life}
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
            return cost_v, [
                f"Under SLM: annual depreciation = (cost - salvage)/life.",
                f"cost - salvage = dep x life = {_fmt(dep)} x {_fmt(life)} "
                f"= {_fmt(dep * life)}.",
                f"cost = {_fmt(dep * life)} + salvage {_fmt(salvage)} = "
                f"{_fmt(cost_v)}."], \
                f"Original cost = Rs {_fmt(cost_v)}", None, \
                "cost = dep x life + salvage", {"cost": cost_v}
    if dep <= 0:
        return _GATE
    steps = [
        f"Method: straight line (equal charge every year).",
        f"Depreciable cost = cost - salvage = {_fmt(cost)} - "
        f"{_fmt(salvage)} = {_fmt(cost - salvage)}.",
    ]
    if "rate" in d:
        steps[1] += f"  Annual depreciation = ({_fmt(cost)} - {_fmt(salvage)}) " \
                    f"x {d['rate']:g}% = {_fmt(dep)}."
    else:
        steps.append(f"Annual depreciation = depreciable cost / life = "
                     f"{_fmt(cost - salvage)} / {_fmt(life)} = {_fmt(dep)}.")
    steps.append(f"{method}.")
    # schedule / book value after n years
    years_ask = re.search(r"(?:after|at\s+the\s+end\s+of)\s+(?P<y>" + _U_NUM
                          + r")\s*years?", low)
    if years_ask or re.search(r"schedule|table|year[- ]by[- ]year", low):
        ny = int(_n(years_ask.group("y"))) if years_ask else int(life)
        if ny < 1 or ny > 60:
            return _GATE
        rows = _slm_schedule(cost, salvage, dep, ny)
        tbl = ["Year | Opening WDV | Depreciation | Closing WDV"]
        for (y, ob, dp, cb) in rows:
            tbl.append(f"{y} | {_fmt(ob)} | {_fmt(dp)} | {_fmt(cb)}")
        steps.extend(tbl)
        final_bv = rows[-1][3]
        if years_ask:
            ans = f"Book value after {ny} years = Rs {_fmt(final_bv)}"
            extra = {"book_value": final_bv, "annual_dep": dep}
            return final_bv, steps, ans, None, \
                "WDV_n = cost - n x annual depreciation", extra
        ans = "SLM schedule: " + "; ".join(
            f"Y{y}: dep {_fmt(dp)}, closing {_fmt(cb)}"
            for (y, ob, dp, cb) in rows)
        return dep, steps, ans, None, \
            "annual depreciation = (cost - salvage)/life", {"annual_dep": dep}
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
    steps = [f"Method: written down value (depreciation at {rate:g}% on the "
             f"opening book value each year).",
             f"Retention factor = 1 - {rate:g}/100 = {_fmt(f)}."]
    rows = []
    bv = cost
    for y in range(1, ny + 1):
        ob = bv
        dep = ob * rate / 100.0
        bv = ob - dep
        rows.append((y, ob, dep, bv))
        steps.append(f"Year {y}: depreciation = {_fmt(ob)} x {rate:g}% = "
                     f"{_fmt(dep)}; closing WDV = {_fmt(bv)}.")
    final_bv = rows[-1][3]
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
    steps = [
        f"Net sales = sales - return inwards = {_fmt(sales)} - "
        f"{_fmt(ret_in)} = {_fmt(sales - ret_in)}.",
        f"Cost of goods sold = opening stock + net purchases + direct "
        f"expenses - closing stock",
        f"= {_fmt(opening)} + ({_fmt(purchases)} - {_fmt(ret_out)}) + "
        f"{_fmt(direct)} - {_fmt(closing)} = "
        f"{_fmt(opening + purchases - ret_out + direct - closing)}.",
        f"Gross profit = net sales - COGS = {_fmt(sales - ret_in)} - "
        f"{_fmt(opening + purchases - ret_out + direct - closing)} = "
        f"{_fmt(gp)}.",
    ]
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
    steps = [f"Gross profit = {_fmt(gp)}."]
    if listed:
        steps.append("Indirect expenses (debited to P&L): "
                     + "; ".join(listed) + f"  -> total {_fmt(exp_total)}.")
    if inc_listed:
        steps.append("Other incomes (credited to P&L): "
                     + "; ".join(inc_listed) + f"  -> total {_fmt(inc_total)}.")
    steps.append(f"Net profit = GP - indirect expenses + other incomes = "
                 f"{_fmt(gp)} - {_fmt(exp_total)} + {_fmt(inc_total)} = "
                 f"{_fmt(np_v)}.")
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
    steps = [f"Debit total = {_fmt(dr)}, credit total = {_fmt(cr)}.",
             f"Difference = {_fmt(dr)} - {_fmt(cr)} = {_fmt(diff)} "
             f"({'debit exceeds credit' if diff > 0 else 'credit exceeds debit'}).",
             f"The difference is placed on the short column "
             f"({'credit' if diff > 0 else 'debit'}) as Suspense A/c to "
             f"make the trial balance tally."]
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
    # capital figure)
    if re.search(r"\bratio\b", low):
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
        steps = [f"Total assets = {_fmt(assets)}.",
                 f"Liabilities + Capital = {_fmt(liab)} + {_fmt(capital)} = "
                 f"{_fmt(rhs)}.",
                 f"{'Balanced.' if ok else 'NOT balanced.'} Difference = "
                 f"{_fmt(diff)}."]
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
    steps = [f"Accounting equation: assets = liabilities + capital.",
             f"Solving for the missing figure ({missing}).",
             f"{missing} = {_fmt(val)}."]
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
    steps = [f"Starting point: {' '.join((kind, 'balance as per', book)).strip()}"
             f" = Rs {_fmt(bal)} ({sign_label}).",
             f"Adjusted start value = {_fmt(value)}."]
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
            steps.append(f"{'Add' if eff > 0 else 'Less'} Rs {_fmt(amt)}: "
                         f"{why}.")
    target = "pass book" if from_cash else "cash book"
    final = value + total_adj
    if final < 0:
        steps.append(f"Closing = {_fmt(value)} {'+' if total_adj >= 0 else '-'} "
                     f"{_fmt(abs(total_adj))} = {_fmt(final)} -> "
                     f"OVERDRAFT of Rs {_fmt(abs(final))} as per {target}.")
        ans = f"Balance as per {target} = overdraft of Rs {_fmt(abs(final))}"
    else:
        steps.append(f"Closing = {_fmt(value)} {'+' if total_adj >= 0 else '-'} "
                     f"{_fmt(abs(total_adj))} = {_fmt(final)} "
                     f"(favourable) as per {target}.")
        ans = f"Balance as per {target} = Rs {_fmt(final)} (favourable)"
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
        steps = [f"Interest on capital = P x R x T/12 / 100 "
                 f"(T in months, per annum rate).",
                 f"= {_fmt(P)} x {R:g}% x {t:g}/12 = {_fmt(i_val)}."]
        if T is None:
            steps.append("(no period stated -> full year assumed)")
        ans = f"Interest on capital = Rs {_fmt(i_val)}"
        return i_val, steps, ans, \
            ([] if T is not None else ["full-year period assumed"]), \
            "I = P x R x T/12 / 100", {"interest": i_val}
    # any-solve for rate: I, P, T known
    if I is not None and P is not None and T is not None:
        r_v = I * 100.0 * 12.0 / (P * T)
        steps = [f"R = I x 100 x 12 / (P x T) = {_fmt(I)} x 100 x 12 / "
                 f"({_fmt(P)} x {T:g}) = {_fmt(r_v)}% per annum."]
        ans = f"Rate = {_fmt(r_v)}% per annum"
        return r_v, steps, ans, None, "R = I x 1200 / (P x T)", {"rate": r_v}
    # any-solve for capital: I, R, T known
    if I is not None and R is not None and T is not None:
        p_v = I * 100.0 * 12.0 / (R * T)
        steps = [f"P = I x 100 x 12 / (R x T) = {_fmt(I)} x 100 x 12 / "
                 f"({R:g} x {T:g}) = {_fmt(p_v)}."]
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
        steps = [f"Drawings Rs {_fmt(monthly_amt)} at the {timing} -> average "
                 f"period = {months:g} months on the year's drawings.",
                 f"Total drawings for the year = {_fmt(monthly_amt)} x 12 = "
                 f"{_fmt(total_d)}.",
                 f"Interest = total drawings x rate x {months:g}/12 = "
                 f"{_fmt(total_d)} x {R:g}% x {months:g}/12."]
        i_val = total_d * R * months / 1200.0
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
        steps = [f"Drawings Rs {_fmt(quarterly_amt)} at the {timing} -> average "
                 f"period = {months:g} months.",
                 f"Total drawings for the year = {_fmt(quarterly_amt)} x 4 = "
                 f"{_fmt(total_d)}.",
                 f"Interest = {_fmt(total_d)} x {R:g}% x {months:g}/12."]
        i_val = total_d * R * months / 1200.0
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
        steps = [f"Drawings Rs {_fmt(D)} drawn with an average usage period "
                 f"of {months:g} months.",
                 f"Interest = drawings x rate x {months:g}/12 = "
                 f"{_fmt(D)} x {R:g}% x {months:g}/12 = {_fmt(i_val)}."]
    if i_val == 0.0:
        steps.append("Drawings at the year end carry interest for 0 months "
                     "-> interest = 0.")
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
    steps = [f"Total profit = {_fmt(P)}."]
    steps.extend(app_steps)
    if approps:
        steps.append(f"Divisible profit = {_fmt(P)} - {_fmt(approps)} = "
                     f"{_fmt(divisible)}.")
    base = divisible
    for i, nm in enumerate(names):
        shares[i] = base * parts[i] / total_units
        steps.append(f"{nm}'s share = {_fmt(base)} x {parts[i]:g}/"
                     f"{_fmt(total_units)} = {_fmt(shares[i])}.")
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
    steps = [f"Ratio shares: "
             + ", ".join(f"{nm} {_fmt(sh)}" for nm, sh in zip(names, shares))
             + f" (total {_fmt(P)})."]
    if shares[gi] >= G:
        steps.append(f"{names[gi]}'s share {_fmt(shares[gi])} already meets "
                     f"the guarantee of {_fmt(G)} -- no adjustment.")
        ans = " ; ".join(f"{nm}: Rs {_fmt(sh)}" for nm, sh in
                         zip(names, shares))
        extra = {f"share_{i+1}": v for i, v in enumerate(shares)}
        return P, steps, ans, None, "no shortfall", extra
    shortfall = G - shares[gi]
    others = [i for i in range(len(names)) if i != gi]
    others_units = sum(parts[i] for i in others)
    steps.append(f"{names[gi]}'s share {_fmt(shares[gi])} < guaranteed "
                 f"{_fmt(G)} -> shortfall = {_fmt(shortfall)}, borne by the "
                 f"others in their profit ratio.")
    for i in others:
        bite = shortfall * parts[i] / others_units
        shares[i] -= bite
        steps.append(f"{names[i]} bears {_fmt(parts[i])}/{_fmt(others_units)} "
                     f"of the shortfall = {_fmt(bite)} -> final "
                     f"{_fmt(shares[i])}.")
    shares[gi] = G
    steps.append(f"{names[gi]} gets the guaranteed {_fmt(G)}.")
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
    steps = [f"Old ratio ({', '.join(names)}) = "
             + " : ".join(_fmt(p) for p in parts) + f" (sum {_fmt(old_total)}).",
             f"New partner is admitted for {_n(fm.group('a')):g}/"
             f"{_n(fm.group('b')):g} of profits; the remaining "
             f"{_fmt(total_units - _n(fm.group('a')))} is shared by the old "
             f"partners in their old ratio."]
    for i, nm in enumerate(names):
        steps.append(f"{nm}: new share = {parts[i]:g}/{_fmt(old_total)} x "
                     f"{_fmt(total_units - _n(fm.group('a')))}/"
                     f"{_fmt(total_units)} = {new_parts[i]:g}/"
                     f"{_fmt(total_units)}.")
    steps.append("New ratio = " + " : ".join(
        f"{nm} {_fmt(v)}" for nm, v in zip(all_names, new_parts)))
    # textbook ratios are whole numbers: scale by the common denominator
    def _int_scale(vals: List[float]) -> Optional[List[int]]:
        from fractions import Fraction
        from math import gcd
        frs = [Fraction(v).limit_denominator(200) for v in vals]
        L = 1
        for fr in frs:
            L = L * fr.denominator // gcd(L, fr.denominator)
        if L == 0 or L > 24:
            return None
        scaled = [v * L for v in vals]
        if all(abs(s - round(s)) < 1e-9 for s in scaled):
            return [int(round(s)) for s in scaled]
        return None

    scaled = _int_scale(new_parts)
    sac = [parts[i] / old_total - new_parts[i] / total_units
           for i in range(len(names))]
    sac_scaled = _int_scale(sac) if all(s >= 0 for s in sac) else None
    if scaled:
        ans = ("New ratio = " + " : ".join(str(x) for x in scaled)
               + f" ({', '.join(all_names)})")
        steps.append(f"In whole numbers (x{_fmt(1.0 * scaled[0] / new_parts[0])}): "
                     + " : ".join(str(x) for x in scaled) + ".")
    else:
        ans = ("New ratio = " + " : ".join(_fmt(v) for v in new_parts)
               + f" ({', '.join(all_names)})")
    if sac_scaled:
        ans += f"; sacrificing ratio = " + " : ".join(
            str(x) for x in sac_scaled)
        steps.append("Sacrificing ratio (old share - new share) = "
                     + " : ".join(str(x) for x in sac_scaled) + ".")
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
    steps = [f"Current assets = {_fmt(ca)}.",
             f"Current liabilities = {_fmt(cl)}.",
             f"Current ratio = {_fmt(ca)} / {_fmt(cl)} = "
             f"{_fmt(ratio)} : 1."]
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
    steps = [f"Quick assets = current assets - stock - prepaid = "
             f"{_fmt(ca)} - {_fmt(stock)} - {_fmt(prepaid)} = {_fmt(qa)}.",
             f"Current liabilities = {_fmt(cl)}.",
             f"Quick ratio = {_fmt(qa)} / {_fmt(cl)} = {_fmt(ratio)} : 1."]
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
    steps = [f"Long-term debts = {_fmt(debt)}.",
             f"Shareholders' funds (equity) = {_fmt(equity)}.",
             f"Debt-equity ratio = {_fmt(debt)} / {_fmt(equity)} = "
             f"{_fmt(ratio)} : 1."]
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
    steps = [f"Gross profit = {_fmt(gp)}, net sales = {_fmt(sales)}.",
             f"GP ratio = GP / net sales x 100 = {_fmt(gp)} / {_fmt(sales)} "
             f"x 100 = {_fmt(pct)}%."]
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
    steps = [f"Net profit = {_fmt(np_v)}, net sales = {_fmt(sales)}.",
             f"NP ratio = NP / net sales x 100 = {_fmt(np_v)} / "
             f"{_fmt(sales)} x 100 = {_fmt(pct)}%."]
    ans = f"Net profit ratio = {_fmt(pct)}%"
    return None, steps, ans, None, "NP ratio = NP / net sales x 100", {
        "np_ratio_pct": pct}


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

# precompile triggers once at import (regex errors surface immediately)
TABLE = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE]


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
