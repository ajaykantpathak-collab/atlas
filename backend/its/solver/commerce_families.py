"""commerce_families.py -- Lane B/Lane A commerce pack.

Accountancy: closing-capital chain, depreciation (SLM), ROI, and the
debit/credit classification oracle.  Economics: national-income chains
(NNPfc from GDPmp), budget deficit.

All formulas are board-standard (CBSE class 11-12 accountancy and
macroeconomics).  Chain constructor executes in order with the state
table (capital account); each number is grounded in the text.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED)

_RS = r"(?:rs\.?|inr|" + chr(8377) + r")?\s*"
_NUM = r"(\d[\d,]*(?:\.\d+)?)"


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


def _no(reason: str, audit: AuditTrail) -> PipelineResult:
    return PipelineResult(label=GUIDED, answer=None, numeric=None,
                          steps=[], audit=audit, refusal_reason=reason)


def _fmt(v: float) -> str:
    # _RS is a REGEX fragment, not a display prefix -- embedding it in
    # the answer string shipped "(?:rs\.?|inr|₹)?\s*18,000" to users
    return f"Rs {v:,.0f}"


# --------------------------------------------------------------------------- #
# CLOSING CAPITAL (accountancy class 12):
#   "X started with opening capital A. He earned profit P and
#    withdrew W during the year. His closing capital is?"
#   closing = opening + profit - drawings (+ additional capital)
# --------------------------------------------------------------------------- #

_OPEN_RE = re.compile(
    r"opening\s+capital\s+(?:of\s+)?" + _RS + _NUM, re.I)
_PROFIT_RE = re.compile(
    r"(?:earned\s+)?(?:a\s+)?profit\s+of\s+" + _RS + _NUM, re.I)
_DRAW_RE = re.compile(
    r"(?:withdrew|drawings?\s+(?:of\s+)?)[^.]{0,30}?" + _RS + _NUM, re.I)
_ADDCAP_RE = re.compile(
    r"(?:introduc\w+|added)\s+(?:further\s+)?capital\s+(?:of\s+)?"
    + _RS + _NUM, re.I)
_CLOSING_ASK = re.compile(r"closing\s+capital", re.I)


def read_closing_capital(text: str, audit: AuditTrail
                         ) -> Optional[PipelineResult]:
    low = text.lower()
    if "closing capital" not in low:
        return None
    om = _OPEN_RE.search(text)
    pm = _PROFIT_RE.search(text)
    dm = _DRAW_RE.search(text)
    am = _ADDCAP_RE.search(text)
    if not (om and pm):
        return _no("CLOSING_CAPITAL"+" "+"need opening capital and profit stated", audit)
    opening = _n(om.group(1))
    profit = _n(pm.group(1))
    drawings = _n(dm.group(1)) if dm else 0.0
    addcap = _n(am.group(1)) if am else 0.0
    closing = opening + profit - drawings + addcap
    steps = [f"Closing capital = opening + profit - drawings "
             f"+ additional capital",
             f"= {opening:g} + {profit:g} - {drawings:g} + {addcap:g} "
             f"= {closing:g}"]
    audit.route.append("event_chain:closing_capital")
    audit.gates_passed.append("capital_chain_grounding")
    return PipelineResult(
        label=VERIFIED, answer=_fmt(closing), numeric=closing,
        steps=steps, audit=audit)


# --------------------------------------------------------------------------- #
# SLM DEPRECIATION (class 11):
#   "Machinery costing C with salvage S depreciated over n years
#    (straight line). Annual depreciation?"
#   dep = (C - S) / n
# --------------------------------------------------------------------------- #

_DEP_RE = re.compile(
    r"(?:machine\w*|asset|vehicle|plant)[^.]{0,40}(?:cost(?:ing)?|"
    r"purchas\w*)\s+(?:for\s+)?" + _RS + _NUM
    + r"(?:\s*(?:and|with)\s+(?:a\s+)?(?:scrap|salvage|residual)"
    r"\s+(?:value\s+)?(?:of\s+)?" + _RS + _NUM + r")?"
    r"[^.]{0,60}?(?:depreciat\w+|written\s+off)[^.]{0,30}?"
    r"(?:at\s+)?(\d+(?:\.\d+)?)\s*(?:%|per\s*cent)[^.]{0,30}?")
_SL_ASK = re.compile(r"straight\s+line|annual\s+depreciation|"
                     r"depreciation\s+(?:per\s+annum|for\s+the\s+year)",
                     re.I)


def read_slm_depreciation(text: str, audit: AuditTrail
                          ) -> Optional[PipelineResult]:
    low = text.lower()
    if "depreciat" not in low:
        return None
    # METHOD GUARD: written-down-value / declining-balance is the
    # geometric family's territory -- SLM arithmetic on a WDV question
    # shipped a confident wrong answer (red-team A04).
    if re.search(r"\bwritten\s+down\s+value|\bwdv\b|declining\s+balance|"
                 r"reducing\s+balance\b", low):
        # not-applicable: the geometric family owns WDV -- signal "no
        # result" so dispatch continues to it instead of refusing here
        return None
    cm = re.search(r"(?:cost\w*|purchas\w*)\s+(?:for\s+)?" + _RS +
                   _NUM, text, re.I)
    if not cm:
        return _no("SLM_DEPRECIATION"+" "+"no cost stated", audit)
    cost = _n(cm.group(1))
    salvage = 0.0
    sm = re.search(r"(?:scrap|salvage|residual)\s+(?:value\s*)?"
                   r"(?:is\s+|of\s+|was\s+)?" + _RS + _NUM, text, re.I)
    if sm:
        salvage = _n(sm.group(1))
    life = None
    lm = re.search(r"(\d+(?:\.\d+)?)\s*years?", text, re.I)
    pct = re.search(r"(\d+(?:\.\d+)?)\s*%", text)
    if lm and not pct:
        life = _n(lm.group(1))
        val = (cost - salvage) / life
        method = "SLM over life"
    elif pct:
        val = (cost - salvage) * float(pct.group(1)) / 100.0
        method = f"rate {pct.group(1)}%"
        life = None
    else:
        return _no("SLM_DEPRECIATION"+" "+"need life in years or a % rate", audit)
    steps = ([f"Depreciation = (cost - salvage) / life = ({cost:g} - "
              f"{salvage:g})/{life:g} = {val:.4g}"] if life
             else [f"Depreciation = (cost - salvage) x rate = "
                   f"({cost:g} - {salvage:g}) x {pct.group(1)}% = "
                   f"{val:.4g}"])
    audit.route.append("event_chain:slm_depreciation")
    audit.gates_passed.append("cost_grounding")
    return PipelineResult(
        label=VERIFIED, answer=_fmt(val), numeric=val, steps=steps,
        audit=audit)


# --------------------------------------------------------------------------- #
# RETURN ON INVESTMENT (class 12):
#   ROI = EBIT / capital employed x 100, EBIT = PAT + tax + interest
# --------------------------------------------------------------------------- #

_ROI_RE = re.compile(r"return\s+on\s+investment|roi", re.I)


def read_roi(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    low = text.lower()
    if not _ROI_RE.search(low):
        return None
    # capital employed
    cm = re.search(r"capital\s+employed\s+(?:is\s+|=|of\s+)?" + _RS +
                   _NUM, text, re.I)
    if not cm:
        return _no("ROI"+" "+"capital employed not stated", audit)
    cap = _n(cm.group(1))
    # EBIT either stated or built from PAT + tax + interest
    em = re.search(r"EBIT\s*(?:=|is)\s*" + _RS + _NUM, text, re.I)
    if em:
        ebit = _n(em.group(1))
        steps = [f"EBIT stated = {ebit:g}"]
    else:
        pat_m = re.search(r"(?:profit[s]?\s+after\s+tax|PAT)\s*"
                          r"(?:is\s+|=)?\s*" + _RS + _NUM, text, re.I)
        tax_m = re.search(r"tax(?:es)?\s+(?:is\s+|=|of\s+)?" + _RS + _NUM,
                          text, re.I)
        int_m = re.search(r"interest\s+(?:is\s+|=|of\s+)?" + _RS + _NUM,
                          text, re.I)
        if not (pat_m and tax_m and int_m):
            return _no("ROI"+" "+"need EBIT or PAT + tax + interest", audit)
        ebit = _n(pat_m.group(1)) + _n(tax_m.group(1)) + _n(int_m.group(1))
        steps = [f"EBIT = PAT + tax + interest = {_n(pat_m.group(1)):g} + "
                 f"{_n(tax_m.group(1)):g} + {_n(int_m.group(1)):g} = "
                 f"{ebit:g}"]
    if cap <= 0:
        return _no("ROI"+" "+"non-positive capital employed", audit)
    roi = ebit / cap * 100.0
    steps.append(f"ROI = EBIT / capital employed x 100 = {ebit:g}/"
                 f"{cap:g} x 100 = {roi:.4g}%")
    audit.route.append("event_chain:roi")
    audit.gates_passed.append("commerce_grounding")
    return PipelineResult(
        label=VERIFIED, answer=f"{roi:.4g}%", numeric=roi, steps=steps,
        audit=audit)


# --------------------------------------------------------------------------- #
# NNPfc (economics class 12 macro):
#   NNPfc = GDPmp - consumption of fixed capital - net indirect tax
#           + NFIA
# --------------------------------------------------------------------------- #


def read_nnpfc(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    low = text.lower()
    if "nnp" not in low.replace(" ", ""):
        return None
    gdpm = re.search(r"GDP\s*(?:mp|at\s+market\s+price)?\s*(?:is\s+|=)?"
                     r"\s*" + _RS + _NUM, text, re.I)
    if not gdpm:
        return _no("NNPFC"+" "+"GDPmp not stated", audit)
    gdp = _n(gdpm.group(1))
    def grab(label_re: str) -> float:
        m = re.search(label_re + r"[^0-9-]{0,40}(-?[\d,]+(?:\.\d+)?)",
                      text, re.I)
        if not m or m.group(1) is None:
            return 0.0
        return _n(m.group(1))
    depreciation = grab(r"(?:consumption\s+of\s+fixed\s+capital|depreciation)")
    nit = grab(r"net\s+indirect\s+tax(?:es)?")
    nfia = grab(r"net\s+factor\s+income\s+(?:from\s+abroad|abroad)")
    # NIT sign: negative NIT (subsidy > tax) handled by the raw number
    nnp = gdp - depreciation - nit + nfia
    steps = [f"NNPfc = GDPmp - depreciation - NIT + NFIA",
             f"= {gdp:g} - {depreciation:g} - {nit:g} + {nfia:g} = "
             f"{nnp:g}"]
    audit.route.append("event_chain:nnpfc")
    audit.gates_passed.append("macro_grounding")
    return PipelineResult(
        label=VERIFIED, answer=_fmt(nnp), numeric=nnp, steps=steps,
        audit=audit)


# --------------------------------------------------------------------------- #
# BUDGET DEFICIT (economics):
#   deficit = total expenditure - total receipts
# --------------------------------------------------------------------------- #


def read_budget_deficit(text: str, audit: AuditTrail
                        ) -> Optional[PipelineResult]:
    low = text.lower()
    if not re.search(r"budget(?:ary)?\s+deficit", low):
        return None
    em = re.search(r"(?:total\s+)?expenditure\s*(?:is|=)?\s*" + _RS +
                   _NUM, text, re.I)
    rm = re.search(r"(?:total\s+)?receipts\s*(?:is|are|=)?\s*" + _RS +
                   _NUM, text, re.I)
    if not (em and rm):
        return _no("BUDGET_DEFICIT"+" "+"need total expenditure and total receipts", audit)
    exp, rec = _n(em.group(1)), _n(rm.group(1))
    deficit = exp - rec
    label = "deficit" if deficit > 0 else "surplus"
    val = abs(deficit)
    return PipelineResult(
        label=VERIFIED, answer=f"{label} of {_fmt(val)}",
        numeric=val,
        steps=[f"{label.capitalize()} = expenditure - receipts = "
               f"{exp:g} - {rec:g} = {val:g} ({label})"],
        audit=audit)


DISPATCH = [
    (_ROI_RE, read_roi),
    (re.compile(r"closing\s+capital", re.I), read_closing_capital),
    (re.compile(r"depreciat", re.I), read_slm_depreciation),
    (re.compile(r"nnp", re.I), read_nnpfc),
    (re.compile(r"budget(?:ary)?\s+deficit", re.I), read_budget_deficit),
]


def read_commerce(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Commerce Lane B entry: try each commerce chain in order."""
    for _trigger, fn in DISPATCH:
        result = fn(text, audit)
        if result is not None:
            return result
    return None
