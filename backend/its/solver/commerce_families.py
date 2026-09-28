"""commerce_families.py -- Lane B business-arithmetic pack (commerce).

Business Studies / Entrepreneurship numeric families, classes 10-12
(ICSE Commercial Studies ch 2/5, ISC Commerce ch 2/3/8, ISC Business
Studies ch 7/17/18; NCERT BST 11/11-12 books are the qualitative
grounding).  Every formula below is grounded in the authored corpus:
  - break-even / contribution / margin of safety / target profit:
    c12_comm_isc_08_009 (worked subscription-app example: contribution
    per subscriber, break-even subscribers, profit check), ch 8 pricing
    nodes; concept + KPI mentions across c11_bst_isc_05, c12_bst_isc_18.
  - cost-plus pricing with fixed-cost allocation: c10_comst_icse_02_005
    (bakery example: Rs 60,000 / 5,000 packs = Rs 12 fixed per pack,
    unit cost Rs 42, 40% markup), with its authored misconception
    ("markup applied only on variable cost").
  - cash projection identity: opening + receipts - payments = closing
    (cash-book identity; running-balance pattern worked in
    c12_comm_isc_04_007 month chain).
  - working capital = CA - CL: c12_comm_isc_02_001/02_006 worked
    ("26 - 9 = Rs 17 crore"), with the authored misconception that a
    high balance is always healthy.
  - cash conversion cycle = inventory days + receivable days - payable
    days and average collection period = receivables / credit sales x
    365: taught with numbers in c12_comm_isc_02_001 (45.6 days).
  - closing retained earnings = opening + profit - dividend - reserve
    transfer: c12_comm_isc_03_008 worked (Rs 1 crore + Rs 40 lakh -
    Rs 12 lakh - 10% transfer = Rs 1.24 crore), misconception: "the
    statutory reserve transfer is optional".
  - market share % = firm sales / total market sales x 100: plain
    percentage arithmetic the corpus uses with share figures
    (c11_bst_isc_03_005 "capturing 15% market share").

House conventions mirror accountancy_families.py: one _TABLE of rows
(FID, compiled trigger regex, compute function), each compute returning
the 6-tuple
    (value, steps, answer, assumptions, governing_equation, extra)
with _GATE = (None, [], None, None, None, None) meaning "trigger hit but
plausibility gate refused -- keep scanning".  The single dispatcher
model_commerce_families scans the table in order; first grounded hit
wins.  Recognition is by trigger regex only -- no LLM, no randomness.
The dispatcher deliberately has NO blanket try/except: a crash must
surface to the auditor, not silently drop a family.

STEP CONTRACT (enforced by test_commerce_families.py and re-measured by
audit_families_contract.py): every family's steps carry, in order, 1) a
Method: line naming the formula/rule and why it applies, 2) a Given:
line restating the figures with units, 3) computation lines, 4) a
Check: verification (substitute back / tally), 5) an
Interpretation: line -- at least 3 steps and 150 chars total (helper
_five builds all of them).

OWNERSHIP NOTE (this rewrite): the older version of this module also
carried accountancy chains (closing capital, SLM depreciation, ROI) and
macroeconomics chains (NNPfc, budget deficit).  Those topics are owned
-- and more completely solved -- by accountancy_families.py
(DEP_SLM, ...) and economics_families.py (NNPFC_CONVERSION,
BUDGET_DEFICITS_ANY); keeping the cruder duplicates here made commerce
fire on other subjects' canonical probes.  They were removed; commerce
now covers exactly the business-arithmetic set above, and the Lane B
wrapper read_commerce only promotes VERIFIED hits (refusals return None
so dispatch continues -- the old dispatcher short-circuited on a
refusal, blocking later families).
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as accountancy_families.py)
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


_NUM = r"-?\d{1,9}(?:,\d{2,3})*(?:\.\d+)?|-?\d+(?:\.\d+)?"
_U_NUM = r"\d{1,9}(?:,\d{2,3})*(?:\.\d+)?|\d+(?:\.\d+)?"
_RS = r"(?:rs\.?|inr|\u20b9)?\s*"          # optional currency prefix

# Indian short-scale words used throughout the commerce corpus
# (c12_comm_isc_02_001 works in lakh/crore).
_UNIT_MULT = {"lakh": 1e5, "lac": 1e5, "crore": 1e7, "crores": 1e7,
              "thousand": 1e3}


def _scaled(m: "re.Match") -> float:
    """Number token + optional lakh/crore/thousand suffix -> value."""
    v = float(str(m.group("v")).replace(",", ""))
    u = (m.groupdict().get("u") or "").lower()
    return v * _UNIT_MULT[u] if u in _UNIT_MULT else v


def _fmt(v: float) -> str:
    """Compact deterministic money formatting (Rs prefix)."""
    if abs(v - round(v)) < 1e-9:
        return f"Rs {int(round(v)):,}"
    return f"Rs {v:,.4g}"


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
    """STEP CONTRACT builder: 1 method/rule line, 2 given figures restated
    with units, 3 computation shown, 4 verification, 5 interpretation --
    in order (economics-style beat prefixes, asserted by
    test_commerce_families.py)."""
    steps = [f"Method: {method}", f"Given: {given}"]
    steps.extend(comp or [])
    steps.append(f"Check: {check}")
    steps.append(f"Interpretation: {interp}")
    return steps


def _grab(lbl: str, t: str, window: int = 40) -> Optional[float]:
    """Find 'label ... [Rs] N [lakh|crore|thousand]' for a label regex
    fragment (deterministic, first hit wins)."""
    pat = (r"(?:" + lbl + r")[^0-9-]{0," + str(window) + r"}?" + _RS +
           r"(?P<v>" + _NUM + r")\s*(?P<u>lakh|lac|crores?|thousand)?")
    m = re.search(pat, t, re.I)
    return _scaled(m) if m else None


def _pct(lbl: str, t: str) -> Optional[float]:
    m = re.search(r"(?:" + lbl + r")[^0-9-]{0,30}?(?P<v>" + _U_NUM +
                  r")\s*%", t, re.I)
    if not m:
        m = re.search(r"(?P<v>" + _U_NUM + r")\s*%\s*(?:" + lbl + r")",
                      t, re.I)
    return float(m.group("v")) if m else None


def _amount_any(t: str) -> Optional[float]:
    """First money amount in the text (worth/valued/cost/sell phrasings)."""
    m = re.search(r"(?:worth|valued\s+at|amounts?\s+to|costs?(?:ing)?|"
                  r"price[d]?\s+(?:at|of)|sold\s+for|buy|bought(?:\s+for)?)"
                  r"[^0-9-]{0,30}?" + _RS + r"(?P<v>" + _NUM + r")"
                  r"\s*(?P<u>lakh|lac|crores?|thousand)?", t, re.I)
    return _scaled(m) if m else None


def _qty(t: str) -> Optional[float]:
    """Output/sales quantity in units/packs/pieces/packets/subscribers."""
    m = re.search(r"(?:expected\s+(?:monthly\s+)?sales|sales\s+(?:volume|"
                  r"of)|produces?|production|output|sells?|sold|orders?|"
                  r"subscribers)\s*(?:of|are|is|=|:)?\s*(?P<v>" + _U_NUM +
                  r")\s*(?:units?|packs?|packets?|pieces?|pcs?|items?|"
                  r"subscribers?|kgs?)\b", t, re.I)
    if m:
        return _n(m.group("v"))
    m = re.search(r"(?P<v>" + _U_NUM + r")\s*(?:units?|packs?|packets?|"
                  r"pieces?|pcs?|items?|subscribers?)\b", t, re.I)
    return _n(m.group("v")) if m else None


def _unit_word(t: str) -> str:
    m = re.search(r"\b(units?|packs?|packets?|pieces?|pcs?|items?|"
                  r"subscribers?|kgs?)\b", t, re.I)
    w = (m.group(1).lower() if m else "unit")
    return w if w.endswith("s") else w + "s"


# --------------------------------------------------------------------------- #
# 1. BREAK-EVEN POINT (units)  BEP = FC / (P - VC)
# --------------------------------------------------------------------------- #

def _slots_fc_p_vc(t: str) -> Tuple[Optional[float], Optional[float],
                                    Optional[float]]:
    fc = _grab(r"fixed\s+costs?(?!\s+(?:per|allocated)\s+(?:unit|pack|"
               r"packet|piece))", t)
    price = _grab(r"(?:selling\s+price|sale\s+price|selling\s+rate|"
                  r"price\s+(?:of|is|per\s+unit)|sold\s+(?:at|for)|"
                  r"sells?\s+(?:\w+\s+){0,3}?(?:at|for)|charges\s+"
                  r"(?:at|of)?\s*(?:Rs)?)", t)
    if price is None:
        m = re.search(r"(?:selling\s+price|price)\s*(?:is|=|of|:)?\s*"
                      + _RS + r"(?P<v>" + _NUM + r")\s*(?:per\s*\w+|each)",
                      t, re.I)
        if m:
            price = _n(m.group("v"))
    vc = _grab(r"variable\s+costs?", t)
    return fc, price, vc


def _c_bep_units(g, m, t):
    low = t.lower()
    fc, price, vc = _slots_fc_p_vc(t)
    if fc is None or price is None or vc is None:
        return _GATE
    if fc <= 0 or price <= 0:
        return _GATE
    if vc < 0:
        return _GATE
    if "total variable cost" in low or "total sales" in low \
            or "sales revenue" in low:
        return _GATE          # per-unit slots required, not aggregates
    if vc >= price:
        # no contribution: every sale loses the (P - VC) difference --
        # break-even is unreachable (mission gate: VC >= P declines)
        return _GATE
    bep = fc / (price - vc)
    unit = _unit_word(t)
    steps = _five(
        "Break-even formula: BEP (units) = fixed costs / contribution per "
        "unit, where contribution per unit = selling price per unit - "
        "variable cost per unit; it applies because break-even is exactly "
        "the volume at which total contribution just covers the fixed "
        "costs.",
        f"fixed costs = {fc:g}, selling price = Rs {price:g} per {unit}, "
        f"variable cost = Rs {vc:g} per {unit}",
        [f"Contribution per unit = {price:g} - {vc:g} = Rs {price - vc:g}",
         f"BEP = {fc:g} / {price - vc:g} = {bep:.6g} {unit}"],
        f"Check: at {bep:.4g} {unit}, contribution = {bep:.4g} x "
        f"{price - vc:g} = {bep * (price - vc):.6g}, which exactly "
        f"covers the fixed costs of {fc:g} (profit = 0).",
        f"The venture must sell about {bep:,.0f} {unit} before any profit "
        f"begins; every unit beyond that adds Rs {price - vc:g} of profit.")
    return (bep, steps,
            f"break-even point = {bep:,.0f} {unit}", None,
            "BEP units = FC / (P - VC)",
            {"fc": fc, "price": price, "vc": vc, "contribution": price - vc})


# --------------------------------------------------------------------------- #
# 2. BREAK-EVEN SALES (rupees)  BEP(Rs) = FC x P / (P - VC)
# --------------------------------------------------------------------------- #

def _c_bep_sales(g, m, t):
    low = t.lower()
    fc, price, vc = _slots_fc_p_vc(t)
    if fc is None or price is None or vc is None:
        return _GATE
    if fc <= 0 or price <= 0 or vc < 0 or vc >= price:
        return _GATE
    if "total variable cost" in low or "total sales" in low:
        return _GATE
    bep_u = fc / (price - vc)
    bep_rs = bep_u * price
    steps = _five(
        "Break-even sales (rupees) rule: BEP(Rs) = fixed costs x selling "
        "price / contribution per unit -- the unit break-even valued at "
        "the selling price, because sales value = units x price per unit.",
        f"fixed costs = {fc:g}, selling price = Rs {price:g} per unit, "
        f"variable cost = Rs {vc:g} per unit",
        [f"Contribution per unit = {price:g} - {vc:g} = Rs {price - vc:g}",
         f"BEP (units) = {fc:g} / {price - vc:g} = {bep_u:.6g} units",
         f"BEP (Rs) = {bep_u:.6g} x {price:g} = Rs {bep_rs:,.0f}"],
        f"Check: contribution margin ratio = (P - VC)/P = "
        f"{(price - vc) / price:.4g}; {fc:g} / {(price - vc) / price:.6g} "
        f"= Rs {bep_rs:,.0f} -- both routes agree.",
        f"Sales of about Rs {bep_rs:,.0f} recover exactly the fixed "
        f"costs; below this revenue level the venture operates at a loss.")
    return (bep_rs, steps, f"break-even sales = Rs {bep_rs:,.0f}", None,
            "BEP(Rs) = FC x P / (P - VC)",
            {"fc": fc, "price": price, "vc": vc, "bep_units": bep_u})


# --------------------------------------------------------------------------- #
# 3. MARGIN OF SAFETY  MoS = actual sales - break-even sales
# --------------------------------------------------------------------------- #

def _c_margin_safety(g, m, t):
    low = t.lower()
    fc, price, vc = _slots_fc_p_vc(t)
    if fc is None or price is None or vc is None or fc <= 0 or price <= 0 \
            or vc < 0 or vc >= price:
        return _GATE
    actual = _qty(t)
    if actual is None or actual <= 0:
        return _GATE
    bep = fc / (price - vc)
    mos = actual - bep
    if mos < 0:
        # below break-even: "margin of safety" is negative -- an
        # impossible state for the ratio ask; report the loss state via
        # gate so no misleading percentage ships
        return _GATE
    mos_pct = mos / actual * 100.0
    unit = _unit_word(t)
    steps = _five(
        "Margin of safety rule: MoS = actual sales - break-even sales, and "
        "MoS% = MoS / actual sales x 100 -- it measures how far sales can "
        "fall before the venture dips into the loss area.",
        f"fixed costs = {fc:g}, selling price = Rs {price:g} per {unit}, "
        f"variable cost = Rs {vc:g} per {unit}, actual sales = "
        f"{actual:g} {unit}",
        [f"BEP = {fc:g} / ({price:g} - {vc:g}) = {fc:g} / "
         f"{price - vc:g} = {bep:.6g} {unit}",
         f"MoS = {actual:g} - {bep:.6g} = {mos:.6g} {unit}",
         f"MoS% = {mos:.6g} / {actual:g} x 100 = {mos_pct:.4g}%"],
        f"Check: break-even sales value = {bep:.6g} x {price:g} = "
        f"Rs {bep * price:,.0f}; actual sales value = {actual:g} x "
        f"{price:g} = Rs {actual * price:,.0f}; the difference "
        f"Rs {(actual - bep) * price:,.0f} / {actual * price:,.0f} gives "
        f"the same {mos_pct:.4g}%.",
        f"Sales can drop {mos:,.0f} {unit} ({mos_pct:.4g}% of current "
        f"sales) before the venture starts making a loss.")
    return (mos, steps,
            f"margin of safety = {mos:,.0f} {unit} ({mos_pct:.4g}% of "
            f"sales)", None, "MoS = actual sales - break-even sales",
            {"fc": fc, "price": price, "vc": vc, "bep": bep,
             "mos_pct": mos_pct})


# --------------------------------------------------------------------------- #
# 4. CONTRIBUTION  c = P - VC (per unit), total = c x Q
# --------------------------------------------------------------------------- #

def _c_contribution(g, m, t):
    low = t.lower()
    price, vc = _slots_fc_p_vc(t)[1:]
    if price is None or vc is None or price <= 0 or vc < 0:
        return _GATE
    if "total variable cost" in low or "total sales" in low:
        return _GATE
    if vc >= price:
        return _GATE          # no contribution possible
    q = _qty(t) if re.search(r"\btotal\b|how\s+much\s+on|for\s+\d", low) \
        else None
    per_unit = price - vc
    comp = [f"Contribution per unit = selling price - variable cost = "
            f"{price:g} - {vc:g} = Rs {per_unit:g}"]
    if q:
        total = per_unit * q
        comp.append(f"Total contribution on {q:g} units = {per_unit:g} x "
                    f"{q:g} = Rs {total:,.0f}")
        check = (f"Check: reverse route -- total sales value {q:g} x "
                 f"{price:g} = Rs {q * price:,.0f} minus total variable "
                 f"cost {q:g} x {vc:g} = Rs {q * vc:,.0f} gives "
                 f"Rs {q * price - q * vc:,.0f}, the same total.")
        ans = (f"contribution = Rs {per_unit:g} per unit; total "
               f"contribution on {q:g} units = Rs {total:,.0f}")
        value = per_unit if "per unit" in low else total
        interp = (f"Each unit sold contributes Rs {per_unit:g} towards "
                  f"fixed costs and profit; {q:g} units contribute "
                  f"Rs {total:,.0f} in total.")
    else:
        check = (f"Check: variable cost + contribution = {vc:g} + "
                 f"{per_unit:g} = Rs {vc + per_unit:g}, which recovers the "
                 f"selling price exactly.")
        ans = f"contribution = Rs {per_unit:g} per unit"
        value = per_unit
        interp = (f"Each unit sold contributes Rs {per_unit:g} towards "
                  f"covering fixed costs and then profit.")
    steps = _five(
        "Contribution rule: contribution per unit = selling price per unit "
        "- variable cost per unit (total contribution = contribution per "
        "unit x units sold); it is the amount each sale adds towards "
        "fixed costs and profit.",
        f"selling price = Rs {price:g} per unit, variable cost = "
        f"Rs {vc:g} per unit" + (f", quantity = {q:g} units" if q else ""),
        comp, check, interp)
    return (value, steps, ans, None, "contribution = P - VC (x Q for total)",
            {"price": price, "vc": vc, "per_unit": per_unit})


# --------------------------------------------------------------------------- #
# 5. TARGET-PROFIT UNITS  Q = (FC + target profit) / (P - VC)
# --------------------------------------------------------------------------- #

def _c_target_profit(g, m, t):
    low = t.lower()
    fc, price, vc = _slots_fc_p_vc(t)
    tp = _grab(r"(?:target|desired|planned)\s+profit", t)
    if fc is None or price is None or vc is None or tp is None:
        return _GATE
    if fc <= 0 or price <= 0 or vc < 0 or vc >= price or tp <= 0:
        return _GATE
    q = (fc + tp) / (price - vc)
    unit = _unit_word(t)
    steps = _five(
        "Target-profit formula: required units = (fixed costs + target "
        "profit) / contribution per unit -- the break-even equation with "
        "the target profit added to the amount contribution must cover.",
        f"fixed costs = {fc:g}, target profit = {tp:g}, selling price = "
        f"Rs {price:g} per {unit}, variable cost = Rs {vc:g} per {unit}",
        [f"Contribution per unit = {price:g} - {vc:g} = Rs {price - vc:g}",
         f"Required units = ({fc:g} + {tp:g}) / {price - vc:g} = "
         f"{fc + tp:g} / {price - vc:g} = {q:.6g} {unit}"],
        f"Check: contribution at {q:.4g} {unit} = {q:.4g} x "
        f"{price - vc:g} = Rs {q * (price - vc):,.0f}; minus fixed costs "
        f"{fc:g} leaves Rs {q * (price - vc) - fc:,.0f} = target profit.",
        f"The venture must sell about {q:,.0f} {unit} to earn the target "
        f"profit of Rs {tp:,.0f} after covering all fixed costs.")
    return (q, steps, f"required sales = {q:,.0f} {unit}", None,
            "Q = (FC + target profit) / (P - VC)",
            {"fc": fc, "tp": tp, "price": price, "vc": vc})


# --------------------------------------------------------------------------- #
# 6. COST-PLUS PRICE  SP = unit cost x (1 + markup%)
#    (fixed-cost allocation = total FC / expected output)
# --------------------------------------------------------------------------- #

def _c_cost_plus(g, m, t):
    low = t.lower()
    markup = _pct(r"markup|mark[-\s]?up", t)
    if markup is None:
        markup = _pct(r"(?:wants?|desires?|adds?)\s+(?:a\s+)?(?:profit\s+"
                      r"margin|margin)", t)
    if markup is None or markup < 0:
        return _GATE
    vc = _grab(r"variable\s+costs?", t)
    # "unit cost" slot must NOT swallow "variable/fixed cost per pack"
    unit_cost = _grab(r"(?:total\s+)?unit\s+cost|"
                      r"(?<!variable\s)(?<!fixed\s)cost\s+per\s+"
                      r"(?:unit|pack(?:et)?|piece)", t)
    fc_alloc = _grab(r"fixed\s+costs?\s+(?:allocat\w+\s+)?(?:per\s+"
                     r"(?:unit|pack(?:et)?|piece)|cost\s+per\s+unit)", t)
    fc_total = None
    q = None
    if unit_cost is None:
        fc_total = _grab(r"(?:monthly\s+|annual\s+)?fixed\s+costs?", t)
        q = _qty(t) if fc_total is not None else None
        if fc_total is not None and (q is None or q <= 0):
            return _GATE
    if vc is not None and vc < 0:
        return _GATE
    # assemble unit cost
    parts: List[str] = []
    if unit_cost is None:
        if fc_alloc is not None:
            if vc is None:
                return _GATE
            unit_cost = vc + fc_alloc
            parts.append(f"Unit cost = variable cost + fixed cost per unit "
                         f"= {vc:g} + {fc_alloc:g} = Rs {unit_cost:g}")
        else:
            if vc is None or fc_total is None:
                return _GATE
            fc_alloc = fc_total / q
            unit_cost = vc + fc_alloc
            parts.append(f"Fixed cost per unit = {fc_total:g} / {q:g} = "
                         f"Rs {fc_alloc:g}")
            parts.append(f"Unit cost = variable cost + fixed cost per unit "
                         f"= {vc:g} + {fc_alloc:g} = Rs {unit_cost:g}")
    if unit_cost is None or unit_cost <= 0:
        return _GATE
    sp = unit_cost * (1 + markup / 100.0)
    given = (f"variable cost = Rs {vc:g} per unit, " if vc is not None
             else "")
    given += (f"fixed costs = {fc_total:g} over {q:g} units, "
              if fc_total is not None else
              (f"fixed cost per unit = Rs {fc_alloc:g}, "
               if fc_alloc is not None else ""))
    given += f"markup = {markup:g}% on total unit cost"
    steps = _five(
        "Cost-plus pricing rule (taught in the corpus with the fixed-cost "
        "allocation): selling price = total unit cost x (1 + markup%), "
        "where unit cost = variable cost per unit + fixed cost allocated "
        "per unit -- the markup must sit on the FULL cost, not only the "
        "variable part.",
        given,
        parts + [f"Selling price = {unit_cost:g} x (1 + {markup:g}/100) = "
                 f"{unit_cost:g} x {1 + markup / 100:g} = Rs {sp:,.4g}"],
        f"Check: markup amount = {unit_cost:g} x {markup:g}/100 = "
        f"Rs {unit_cost * markup / 100:,.4g}; cost + markup = "
        f"{unit_cost:g} + {unit_cost * markup / 100:,.4g} = "
        f"Rs {sp:,.4g} -- identical.",
        f"The price must be at least Rs {sp:,.4g} per unit: below it the "
        f"firm does not earn its {markup:g}% margin on the full unit "
        f"cost.  A common trap (authored in the corpus) is marking up "
        f"variable cost only.")
    return (sp, steps, f"selling price = Rs {sp:,.4g} per unit", None,
            "SP = unit cost x (1 + markup%)",
            {"vc": vc, "unit_cost": unit_cost, "markup": markup})


# --------------------------------------------------------------------------- #
# 7. CASH PROJECTION  closing = opening + receipts - payments
# --------------------------------------------------------------------------- #

def _c_cash_projection(g, m, t):
    low = t.lower()
    opening = _grab(r"opening\s+(?:cash\s+|bank\s+)?balance|"
                    r"(?:begins?|started?|starts?)\s+(?:the\s+)?(?:month|"
                    r"year|quarter)\s+with", t)
    receipts = [ _scaled(x) for x in re.finditer(
        r"(?:total\s+)?(?:cash\s+)?(?:receipts?|inflows?|collections?|"
        r"cash\s+sales?)[^.0-9-]{0,40}?" + _RS + r"(?P<v>" + _NUM + r")"
        r"\s*(?P<u>lakh|lac|crores?|thousand)?", t, re.I)]
    payments = [ _scaled(x) for x in re.finditer(
        r"(?:total\s+)?(?:cash\s+)?(?:payments?|outflows?|disbursements?|"
        r"expenses?\s+(?:are|of|=))[^.0-9-]{0,40}?" + _RS + r"(?P<v>" +
        _NUM + r")\s*(?P<u>lakh|lac|crores?|thousand)?", t, re.I)]
    R = sum(receipts) if receipts else None
    P = sum(payments) if payments else None
    asks_closing = bool(re.search(r"closing\s+(?:cash|bank)?\s*balance|"
                                  r"cash\s+(?:in\s+hand|balance)\s+at\s+"
                                  r"the\s+end|closing\s+cash", low))
    asks_net = bool(re.search(r"net\s+cash\s+flow|net\s+(?:monthly\s+)?"
                              r"flow", low))
    if not (asks_closing or asks_net):
        return _GATE                      # ask must name the projection
    if R is None and P is None:
        return _GATE
    if (R is not None and R < 0) or (P is not None and P < 0):
        return _GATE                      # receipts/payments cannot be negative
    if asks_closing:
        if opening is None or R is None or P is None:
            return _GATE
        net = R - P
        closing = opening + net
        steps = _five(
            "Cash-flow projection identity: closing balance = opening "
            "balance + total receipts - total payments -- the cash-book "
            "running balance used to project month-end liquidity.",
            f"opening balance = {_fmt(opening)}, total receipts = "
            f"{_fmt(R)}, total payments = {_fmt(P)}",
            [f"Net cash flow = {R:g} - {P:g} = {_fmt(net)}",
             f"Closing balance = {opening:g} + {R:g} - {P:g} = "
             f"{closing:g}"],
            f"Check: recompute from the net flow -- opening {opening:g} + "
            f"net {_fmt(net)} = {closing:g}; the projection tallies.",
            (f"The month ends with {_fmt(closing)} in hand"
             if closing >= 0 else
             f"The month ends overdrawn by {_fmt(abs(closing))} -- the "
             f"plan needs extra financing before month-end") + ".")
        return (closing, steps, f"closing cash balance = {_fmt(closing)}",
                None, "closing = opening + receipts - payments",
                {"opening": opening, "receipts": R, "payments": P})
    # net-flow ask
    if R is None or P is None:
        return _GATE
    net = R - P
    steps = _five(
        "Net cash flow rule: net cash flow = total cash receipts - total "
        "cash payments for the period -- the surplus (or deficit) the "
        "period's operations generate before any opening balance.",
        f"total receipts = {_fmt(R)}, total payments = {_fmt(P)}",
        [f"Net cash flow = {R:g} - {P:g} = {_fmt(net)}"],
        f"Check: sign test -- receipts exceed payments, so the flow must "
        f"be {'positive' if net >= 0 else 'negative'}; {_fmt(net)} "
        f"is {'positive' if net >= 0 else 'negative'} -- consistent.",
        (f"The period generates a cash surplus of {_fmt(net)}"
         if net >= 0 else
         f"The period runs a cash deficit of {_fmt(abs(net))}") +
        ", which is what the projection adds to the opening balance.")
    return (net, steps, f"net cash flow = {_fmt(net)}", None,
            "net cash flow = receipts - payments",
            {"receipts": R, "payments": P})


# --------------------------------------------------------------------------- #
# 8. WORKING CAPITAL  WC = CA - CL
# --------------------------------------------------------------------------- #

def _c_working_capital(g, m, t):
    ca = _grab(r"current\s+assets?", t)
    cl = _grab(r"current\s+liabilit\w+", t)
    if ca is None or cl is None:
        return _GATE
    if ca < 0 or cl < 0:
        return _GATE
    wc = ca - cl
    if wc >= 0:
        interp = (f"Working capital of {_fmt(wc)} is a positive gap -- "
                  f"current assets exceed current liabilities "
                  f"{ca:g} : {cl:g}, so short-term obligations are "
                  f"covered (though a very high balance can mean idle "
                  f"funds, per the corpus misconception note).")
        label = "positive gap"
    else:
        interp = (f"Working capital is negative ({_fmt(wc)}): current "
                  f"liabilities exceed current assets, a funding risk -- "
                  f"the firm may struggle to pay suppliers and payroll. "
                  f"Negative working capital does NOT mean the firm is "
                  f"unprofitable (corpus misconception).")
        label = "negative (deficit)"
    steps = _five(
        "Working capital rule: working capital = current assets - current "
        "liabilities -- the short-term liquidity gap the firm must finance "
        "(inventory + receivables + cash side vs. payables side of the "
        "operating cycle).",
        f"current assets = {_fmt(ca)}, current liabilities = {_fmt(cl)}",
        [f"Working capital = {ca:g} - {cl:g} = {_fmt(wc)}"],
        f"Check: components -- CA includes inventory, receivables and "
        f"cash; CL includes payables and short-term debt.  Adding CL back "
        f"({wc:g} + {cl:g} = {ca:g}) recovers current assets exactly.",
        interp)
    return (wc, steps,
            f"working capital = {_fmt(wc)} ({label})", None,
            "working capital = CA - CL", {"ca": ca, "cl": cl})


# --------------------------------------------------------------------------- #
# 9. MARKET SHARE  share% = firm sales / total market sales x 100
# --------------------------------------------------------------------------- #

def _c_market_share(g, m, t):
    low = t.lower()
    firm = _grab(r"(?:firm(?:'s)?|company(?:'s)?|our|brand(?:'s)?|"
                 r"business(?:'s)?)\s+(?:sales|revenue|share\s+of\s+"
                 r"sales)|its\s+sales", t)
    if firm is None:
        m2 = re.search(r"(?:sells?|sold)\s+(?P<v>" + _U_NUM + r")\s*"
                       r"(?:units?|packs?|packets?|pieces?|pcs?|items?)",
                       t, re.I)
        firm = _n(m2.group("v")) if m2 else None
    total = _grab(r"(?:total\s+)?(?:market|industry)\s+(?:sales|size|"
                  r"demand|revenue)", t)
    if total is None:
        m3 = re.search(r"market\s+of\s+(?P<v>" + _U_NUM + r")\s*"
                       r"(?:units?|packs?|packets?|pieces?|pcs?|items?)",
                       t, re.I)
        total = _n(m3.group("v")) if m3 else None
    if firm is None or total is None or total <= 0 or firm < 0:
        return _GATE
    share = firm / total * 100.0
    if share > 100.0:
        return _GATE          # a share above 100% is an impossible state
    steps = _five(
        "Market share formula: market share % = firm sales / total market "
        "sales x 100 -- the firm's slice of the whole market, the standard "
        "percentage-of-total arithmetic behind the share figures the "
        "corpus quotes.",
        f"firm sales = {firm:g}, total market sales = {total:g}",
        [f"Market share = {firm:g} / {total:g} x 100 = {share:.4g}%"],
        f"Check: the firm plus its rivals must account for the whole "
        f"market -- {firm:g} is {share:.4g}% of {total:g}, and "
        f"{share:.4g}% <= 100%, so the split is consistent.",
        f"The firm holds about {share:.4g}% of its market"
        + (", a dominant position." if share >= 40 else
           "; rivals together hold the remaining " +
           f"{100 - share:.4g}%") + ".")
    return (share, steps, f"market share = {share:.4g}%", None,
            "market share % = firm sales / market sales x 100",
            {"firm": firm, "total": total})


# --------------------------------------------------------------------------- #
# 10. RETAINED EARNINGS CHAIN
#     closing = opening + profit - dividend - reserve transfer
# --------------------------------------------------------------------------- #

def _c_retained_earnings(g, m, t):
    low = t.lower()
    opening = _grab(r"opening\s+(?:retained\s+earnings|balance(?:\s+of\s+"
                    r"retained\s+earnings)?)", t)
    profit = _grab(r"net\s+profit|profit\s+(?:for\s+the\s+year|earned)", t)
    if opening is None or profit is None:
        return _GATE
    if opening < 0 or profit < 0:
        return _GATE
    dividend = _grab(r"(?:proposed\s+)?dividend", t)
    if dividend is not None and dividend < 0:
        return _GATE
    transfer = None
    tm = re.search(r"transfer[s]?\s+(?:a\s+)?(?P<p>" + _U_NUM + r")\s*%"
                   r"\s*(?:of\s+(?:the\s+)?profit)?\s*(?:to\s+(?:the\s+)?"
                   r"general\s+reserve|to\s+reserve)", t, re.I)
    if tm:
        transfer = profit * float(tm.group("p")) / 100.0
        transfer_note = f"{tm.group('p')}% of profit = {transfer:g}"
    else:
        transfer = _grab(r"(?:transfer|transferred|transfers)\s+(?:of\s+)?"
                         r"(?:to\s+(?:the\s+)?(?:general\s+)?reserve)", t)
        transfer_note = f"{transfer:g}" if transfer is not None else None
    if transfer is not None and transfer < 0:
        return _GATE
    closing = opening + profit - (dividend or 0.0) - (transfer or 0.0)
    comp = [f"Add profit: {opening:g} + {profit:g} = "
            f"{opening + profit:g}"]
    if dividend:
        comp.append(f"Less dividend: {opening + profit:g} - {dividend:g} = "
                    f"{opening + profit - dividend:g}")
    if transfer is not None:
        comp.append(f"Less reserve transfer ({transfer_note}): "
                    f"{opening + profit - (dividend or 0.0):g} - "
                    f"{transfer:g} = {closing:g}")
    steps = _five(
        "Retained-earnings chain rule (worked in the corpus): closing "
        "retained earnings = opening + net profit - dividend - transfer "
        "to general reserve; the appropriation steps execute in order "
        "against one running balance.",
        f"opening retained earnings = {_fmt(opening)}, net profit = "
        f"{_fmt(profit)}"
        + (f", dividend = {_fmt(dividend)}" if dividend else "")
        + (f", reserve transfer = {transfer_note}" if transfer else ""),
        comp,
        f"Check: recompute in one line -- {opening:g} + {profit:g} - "
        f"{dividend or 0.0:g} - {transfer or 0.0:g} = {closing:g}; the "
        f"stepwise and one-line tallies agree.  (The reserve transfer is "
        f"NOT optional once stated -- the corpus flags forgetting it as "
        f"the classic error.)",
        f"Retained earnings close the year at {_fmt(closing)}, the "
        f"internal surplus available for expansion or future dividends.")
    return (closing, steps, f"closing retained earnings = {_fmt(closing)}",
            None,
            "closing = opening + profit - dividend - reserve transfer",
            {"opening": opening, "profit": profit,
             "dividend": dividend or 0.0, "transfer": transfer or 0.0})


# --------------------------------------------------------------------------- #
# 11. OPERATING CYCLE / CASH CONVERSION CYCLE
#     CCC days = inventory days + receivable days - payable days
#     collection period = receivables / credit sales x 365
# --------------------------------------------------------------------------- #

def _c_operating_cycle(g, m, t):
    low = t.lower()
    # (b) average collection period (taught with numbers in the corpus)
    if re.search(r"collection\s+period", low):
        rec = _grab(r"receivables?|debtors?", t)
        sales = _grab(r"credit\s+sales", t)
        if rec is None or sales is None or sales <= 0 or rec < 0:
            return _GATE
        days = rec / sales * 365.0
        steps = _five(
            "Average collection period rule: days = receivables / credit "
            "sales x 365 -- the number of days of sales currently locked "
            "in receivables (365-day convention as taught in the corpus "
            "worked example).",
            f"receivables = {_fmt(rec)}, credit sales = {_fmt(sales)}",
            [f"Collection period = {rec:g} / {sales:g} x 365 = "
             f"{days:.2f} days"],
            f"Check: at {days:.4g} days a year of credit sales turns over "
            f"365 / {days:.4g} = {365 / days:.4g} times a year, matching "
            f"the turnover view of the same data.",
            f"Customers take about {days:.4g} days to pay; the longer "
            f"this period, the more working capital is locked in "
            f"receivables.")
        return (days, steps, f"average collection period = {days:.2f} days",
                None, "days = receivables / credit sales x 365",
                {"receivables": rec, "credit_sales": sales})
    # (a) cash conversion cycle
    inv = _grab(r"(?:inventory|stock)\s+(?:holding|days|period)|holds?\s+"
                r"(?:inventory|stock)\s+for", t)
    if inv is None:
        m5 = re.search(r"inventory[^.]{0,20}?(?P<v>" + _U_NUM + r")\s*days",
                       t, re.I)
        inv = _n(m5.group("v")) if m5 else None
    # NOTE: no in-label windows here -- _grab's own lazy window cannot
    # jump over digits, whereas a greedy in-label window leapt past the
    # intended day count (collected "30" instead of "45" in the corpus
    # probe).  Deterministic single-window grabs only.
    rec = _grab(r"collects?\s+(?:its?\s+)?receivables?\s+(?:in|after)|"
                r"collection\s+(?:period|of\s+receivables)\s+(?:of|is)|"
                r"receivables?\s+(?:in|period|days)", t)
    pay = _grab(r"pays?\s+(?:its?\s+)?(?:suppliers?\s+)?(?:after|in)|"
                r"payable\s+days|creditors?\s+(?:in|after|days)", t)
    if inv is None or rec is None or pay is None:
        return _GATE
    if min(inv, rec, pay) < 0:
        return _GATE
    ccc = inv + rec - pay
    steps = _five(
        "Cash conversion cycle rule (taught in the corpus): CCC days = "
        "inventory days + receivable days - payable days -- the number of "
        "days one rupee stays locked in the operating cycle between "
        "buying inputs and collecting cash.",
        f"inventory days = {inv:g}, receivable days = {rec:g}, payable "
        f"days = {pay:g}",
        [f"CCC = {inv:g} + {rec:g} - {pay:g} = {ccc:g} days"],
        f"Check: the payable days only offset after the firm has already "
        f"held stock and collected -- {inv:g} + {rec:g} = {inv + rec:g} "
        f"gross days, minus {pay:g} financed by suppliers = {ccc:g} days.",
        (f"Each operating cycle locks funds for about {ccc:g} days; "
         if ccc >= 0 else
         f"Suppliers finance the whole cycle and more ({ccc:g} days), ")
        + (f"the shorter the cycle, the lower the working-capital need."
           if ccc >= 0 else
           f"a negative cycle means collection precedes payment."))
    return (ccc, steps, f"cash conversion cycle = {ccc:g} days", None,
            "CCC = inventory days + receivable days - payable days",
            {"inventory_days": inv, "receivable_days": rec,
             "payable_days": pay})


# --------------------------------------------------------------------------- #
# family table (trigger -> compute)
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- break-even / contribution arithmetic ----
    # BEP_SALES must sit BEFORE the wide BEP_UNITS trigger ("break-even
    # sales in rupees" would otherwise compute units).  BEP_UNITS is
    # deliberately wide (any break-even mention) because the ask can be
    # "how many subscribers are needed to break even" with no
    # point/units keyword; the compute gates hard on missing slots.
    ("BEP_SALES",
     r"break[\s-]?even[^.]{0,40}(?:rupees|sales\s+value|revenue)|"
     r"break[\s-]?even\s+sales",
     _c_bep_sales),
    ("BEP_UNITS",
     r"break[\s-]?even|\bBEP\b",
     _c_bep_units),
    ("MARGIN_OF_SAFETY",
     r"margin\s+of\s+safety",
     _c_margin_safety),
    ("CONTRIBUTION",
     r"contribution",
     _c_contribution),
    ("TARGET_PROFIT_UNITS",
     r"(?:target|desired|planned)\s+profit",
     _c_target_profit),
    ("COST_PLUS_PRICE",
     r"markup|mark[\s-]?up|cost[\s-]?plus",
     _c_cost_plus),

    # ---- liquidity / projection / market arithmetic ----
    ("CASH_PROJECTION",
     r"opening\s+(?:cash\s+|bank\s+)?balance|closing\s+(?:cash|bank)?\s*"
     r"balance|net\s+cash\s+flow|cash\s+(?:receipts|payments)|"
     r"cash\s+flow\s+projection",
     _c_cash_projection),
    ("WORKING_CAPITAL",
     r"working\s+capital",
     _c_working_capital),
    ("MARKET_SHARE",
     r"market\s+share",
     _c_market_share),
    ("RETAINED_EARNINGS",
     r"retained\s+earnings",
     _c_retained_earnings),
    ("OPERATING_CYCLE",
     r"operating\s+cycle|cash\s+conversion|conversion\s+cycle|"
     r"collection\s+period",
     _c_operating_cycle),
]

# precompile triggers once at import (regex errors surface immediately)
TABLE = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE]


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #

def model_commerce_families(text: str) -> ModelResult:
    """Deterministic dispatcher: scan the commerce table, first grounded
    hit wins (gates inside compute reject a trigger hit and the scan
    continues).  Never calls an LLM.  No blanket try/except: a bug must
    crash loudly for the auditor, not silently drop a family."""
    norm = _norm(text)
    for fid, pattern, compute in TABLE:
        m = pattern.search(norm)
        if not m:
            continue
        out = compute(m.groupdict(), m, norm)
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, m.groupdict(), value, eq or fid, steps or [],
                    answer=answer, assumptions=assumptions,
                    extra=extra or {})
    return _no("COMMERCE", "no commerce family matched")


def read_commerce(text: str, audit: Any) -> Optional[object]:
    """Lane B wrapper for answer_pipeline: only a VERIFIED result is
    promoted; any refusal returns None so the existing reader chain and
    honest refusals downstream stay untouched (fixes the old
    short-circuit-on-refusal dispatch bug)."""
    r = model_commerce_families(text)
    if not (r is not None and r.matched):
        return None
    from backend.its.solver.answer_pipeline import VERIFIED, PipelineResult
    audit.route.append("event_chain:" + r.structure.lower())
    audit.gates_passed.append("commerce_grounding")
    return PipelineResult(label=VERIFIED, answer=r.final_answer,
                          numeric=r.numeric_answer, steps=r.steps,
                          audit=audit)
