"""commerce_families2.py -- expanded commerce chains: GST, cash-flow,
partnership profit share, ratio analysis, retirement capital, interest
on capital.

Same pattern as commerce_families.py: trigger regex + slots + compute
+ plausibility gates + ModelResult.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, Optional

from backend.its.solver.modeling_layer import ModelResult

_RS = r"(?:rs\.?|inr|₹)?\s*"
_NUM = r"(\d[\d,]*(?:\.\d+)?)"


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


def _res(structure: str, value: float, steps: List[str],
         conf: float = 0.93) -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities={}, governing_equation=structure,
        final_answer=f"₹{value:,.0f}", numeric_answer=value,
        steps=steps)


from typing import List


# ---- GST ----
_GST_RE = re.compile(
    r"(?:goods|services?|product)\s+(?:worth|of|valued\s+at)\s+"
    + _RS + _NUM + r"[^.]{0,30}GST\s+(?:at|@|of)\s+"
    + r"(\d+(?:\.\d+)?)\s*%", re.I)


def model_gst(text: str) -> ModelResult:
    m = _GST_RE.search(text)
    if not m:
        return _no("GST", "no GST pattern")
    amount = _n(m.group(1))
    rate = float(m.group(2))
    gst = amount * rate / 100
    total = amount + gst
    return _res("GST", gst, [
        f"GST = {amount:g} x {rate:g}% = {gst:g}",
        f"Total = {amount:g} + {gst:g} = {total:g}",
    ])


# ---- CASH FLOW FROM OPERATIONS ----
_CFO_RE = re.compile(
    r"net\s+profit[^.]{0,30}" + _RS + _NUM, re.I)


def model_cash_flow(text: str) -> ModelResult:
    low = text.lower()
    if "cash" not in low and "operating" not in low:
        return _no("CASH_FLOW", "no cash flow context")
    npm = re.search(r"net\s+profit[^0-9₹]*" + _NUM, text, re.I)
    if not npm:
        return _no("CASH_FLOW", "no net profit")
    np_ = _n(npm.group(1))
    dep = 0.0
    dm = re.search(r"depreciation[^0-9₹]*" + _NUM, text, re.I)
    if dm:
        dep = _n(dm.group(1))
    result = np_ + dep
    return _res("CASH_FLOW", result, [
        f"CFO = Net Profit + Depreciation = {np_:g} + {dep:g} = "
        f"{result:g}"])


# ---- PARTNERSHIP PROFIT SHARE ----
_PART_RE = re.compile(
    r"([A-Za-z])\s+and\s+([A-Za-z])\s+(?:are\s+)?partners?\s+with\s+"
    r"capitals?\s+(?:of\s+)?" + _RS + _NUM + r"\s+and\s+" + _RS + _NUM,
    re.I)
_RATIO_RE = re.compile(r"ratio\s+(?:of\s+)?(\d+)\s*:\s*(\d+)")


def model_partnership(text: str) -> ModelResult:
    pm = _PART_RE.search(text)
    rm = re.search(r"total\s+profit\s+(?:is\s+|of\s+)?" + _RS + _NUM,
                   text, re.I)
    if not pm or not rm:
        return _no("PARTNERSHIP", "need two partners' capitals + profit")
    c1, c2 = _n(pm.group(3)), _n(pm.group(4))
    total = _n(rm.group(1))
    share1 = total * c1 / (c1 + c2)
    share2 = total * c2 / (c1 + c2)
    return _res("PARTNERSHIP", share1, [
        f"{pm.group(1)}'s share = {total:g} x {c1:g}/({c1:g}+{c2:g}) = "
        f"{share1:.4g}",
        f"{pm.group(2)}'s share = {total:g} x {c2:g}/({c1:g}+{c2:g}) = "
        f"{share2:.4g}"])


# ---- CURRENT RATIO ----
_CR_RE = re.compile(
    r"current\s+assets\s+(?:are\s+|is\s+|of\s+)?" + _RS + _NUM +
    r"[^.]{0,40}current\s+liabilities\s+(?:are\s+|is\s+|of\s+)?" +
    _RS + _NUM, re.I)


def model_current_ratio(text: str) -> ModelResult:
    m = _CR_RE.search(text)
    if not m:
        return _no("CURRENT_RATIO", "need current assets + liabilities")
    ca, cl = _n(m.group(1)), _n(m.group(2))
    if cl == 0:
        return _no("CURRENT_RATIO", "zero liabilities")
    ratio = ca / cl
    return _res("CURRENT_RATIO", ratio, [
        f"Current Ratio = {ca:g}/{cl:g} = {ratio:.4g}"])


# ---- INTEREST ON CAPITAL ----
_IOC_RE = re.compile(
    r"capital\s+of\s+" + _RS + _NUM + r"[^.]{0,40}interest\s+on\s+"
    r"capital\s+(?:at|@|is\s+)?(\d+(?:\.\d+)?)\s*%", re.I)


def model_interest_on_capital(text: str) -> ModelResult:
    m = _IOC_RE.search(text)
    if not m:
        return _no("INTEREST_ON_CAPITAL", "no capital + rate pattern")
    cap = _n(m.group(1))
    rate = float(m.group(2))
    ioc = cap * rate / 100
    return _res("INTEREST_ON_CAPITAL", ioc, [
        f"IoC = {cap:g} x {rate:g}% = {ioc:g}"])


# ---- DISPATCH ----
def model_commerce2(text: str) -> ModelResult:
    for fn in [model_gst, model_cash_flow, model_partnership,
               model_current_ratio, model_interest_on_capital]:
        r = fn(text)
        if r.matched:
            return r
    return _no("COMMERCE2", "no commerce2 family matched")
