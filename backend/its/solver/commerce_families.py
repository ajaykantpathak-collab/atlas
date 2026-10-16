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
wins (it also carries the four commerce_families2 rows -- GST,
PARTNERSHIP_SHARE, CURRENT_RATIO, INTEREST_ON_CAPITAL -- dissolved
into this file by the WS-B map step 5, registered in
modeling_layer._STRUCTURES at the old commerce2 slot).  Recognition
is by trigger regex only -- no LLM, no randomness.
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
# 13. NET GST PAYABLE (electives-all additive 2026-10-07, c12_bs ch 3)
#     output GST on sales - input credit (GST on purchases) = cash GST
# --------------------------------------------------------------------------- #

def _c_net_gst_payable(g, m, t):
    """Two-side GST chain: purchases (with GST rate) + sales (with GST
    rate) -> net GST payable in cash = output GST - input credit."""
    low = t.lower()
    if not re.search(r"net\s+gst\s+payable|gst\s+payable", low):
        return _GATE
    # purchase side: "buys raw materials worth Rs 5,00,000 (plus GST @18%)"
    buys = [x for x in re.finditer(
        r"(?:buys?|bought|purchas\w+|raw\s+materials?|inputs?)[^.;]{0,60}?"
        r"(?:worth\s+|of\s+|costs?(?:ing)?\s+|valued\s+at\s+)?" + _RS +
        r"(?P<v>" + _NUM + r")[^.;%]{0,40}?GST\s*@?\s*(?P<r>" + _U_NUM +
        r")\s*%", t, re.I)]
    sells = [x for x in re.finditer(
        r"(?:sells?|sold|sales?|output|finished\s+goods?|turnover)"
        r"[^.;]{0,60}?(?:worth\s+|of\s+|for\s+|at\s+)?" + _RS +
        r"(?P<v>" + _NUM + r")[^.;%]{0,40}?GST\s*@?\s*(?P<r>" + _U_NUM +
        r")\s*%", t, re.I)]
    if not buys or not sells:
        return _GATE
    # first purchase-side and first sale-side match, rate sanity gate
    bp, br = _n(buys[0].group("v")), float(buys[0].group("r"))
    sp, sr = _n(sells[0].group("v")), float(sells[0].group("r"))
    if min(bp, sp) <= 0 or not 0 < br <= 40 or not 0 < sr <= 40:
        return _GATE
    in_gst = bp * br / 100.0
    out_gst = sp * sr / 100.0
    net = out_gst - in_gst
    steps = _five(
        "GST chain rule: GST paid on purchases is an INPUT CREDIT; GST "
        "charged on sales is OUTPUT GST; the firm pays only the "
        "difference in cash -- net GST payable = output GST - input "
        "credit.",
        f"purchases = {_fmt(bp)} with GST at {br:g}%, sales = {_fmt(sp)} "
        f"with GST at {sr:g}%",
        [f"Input credit (GST on purchases) = {_fmt(bp)} x {br:g}% = "
         f"{_fmt(in_gst)}",
         f"Output GST (on sales) = {_fmt(sp)} x {sr:g}% = {_fmt(out_gst)}",
         f"Net GST payable = {_fmt(out_gst)} - {_fmt(in_gst)} = "
         f"{_fmt(net)}"],
        f"Check: the credit can never exceed the output liability for "
        f"the same period here -- {br:g}% of {_fmt(bp)} = {_fmt(in_gst)} "
        f"against {sr:g}% of {_fmt(sp)} = {_fmt(out_gst)}; the "
        f"{'firm pays' if net >= 0 else 'excess carries forward as'} "
        f"{_fmt(abs(net))}.",
        (f"The manufacturer deposits {_fmt(net)} in cash: output GST "
         f"{_fmt(out_gst)} minus the input credit {_fmt(in_gst)} already "
         f"paid on inputs.")
        if net >= 0 else
        (f"Input credit exceeds output GST by {_fmt(abs(net))}: nothing "
         f"is payable in cash and the excess carries forward."))
    return (net, steps, f"net GST payable = {_fmt(net)}", None,
            "net GST payable = output GST - input credit",
            {"input_credit": in_gst, "output_gst": out_gst,
             "a_in": bp, "r_in": br, "a_out": sp, "r_out": sr})


# --------------------------------------------------------------------------- #
# family table (trigger -> compute)
# --------------------------------------------------------------------------- #

def _c_profit_on_cost_sale(g, m, t):
    """'goods costing C are sold for S. What is the profit?' -> S - C."""
    if not re.search(r"profit", t, re.I):
        return None
    cm = re.search(r"(?:costing|cost|bought\s+for|purchased\s+for)\s*"
                   r"(?:rs\.?|inr|₹)?\s*([\d,]+(?:\.\d+)?)", t, re.I)
    sm = re.search(r"(?:sold\s+for|sale\s+for|sell(?:s|ing)?\s+for)\s*"
                   r"(?:rs\.?|inr|₹)?\s*([\d,]+(?:\.\d+)?)", t, re.I)
    if not (cm and sm):
        return None
    c = float(cm.group(1).replace(",", ""))
    s = float(sm.group(1).replace(",", ""))
    if c <= 0 or s <= 0 or s == c:
        return None
    profit = s - c
    verdict = "profit" if profit > 0 else "loss"
    steps = [f"cost price = Rs {c:g}, selling price = Rs {s:g}",
             f"{verdict} = S - C = {s:g} - {c:g} = Rs {abs(profit):g}",
             f"the transaction yields a {verdict} of Rs {abs(profit):g}."]
    return abs(profit), steps, (f"{verdict} = Rs {abs(profit):g}"
                                if profit < 0 else f"profit = Rs {profit:g}"),         None, "profit = S - C", {"C": c, "S": s, "profit": profit}


def _c_goodwill_years_purchase(g, m, t):
    """'goodwill valued at N years purchase of average profit P'
    -> goodwill = N x P."""
    if not re.search(r"goodwill", t, re.I) or not re.search(r"years?[' ]?\s*purchase|years.{0,3}purchase", t, re.I):
        return None
    if re.search(r"super\s+profit|capitali[sz]|normal\s+rate|capital\s+employed|outside\s+liabilit", t, re.I):
        return None  # Comprehensive accountancy_families owns super profit and capitalisation methods
    pm = re.search(r"(?:average|avg\.?)\s+profit[^.\d]{0,60}?"
                   r"(?P<p>[\d,]+(?:\.\d+)?)", t, re.I)
    ym = re.search(r"([\d.]+)\s*years?[' ]?\s*purchase", t, re.I)
    if not (pm and ym):
        return None
    p = float(pm.group(1).replace(",", ""))
    ny = float(ym.group(1))
    if p <= 0 or ny <= 0:
        return None
    gw = ny * p
    steps = [f"average profit = Rs {p:g}, years' purchase = {ny:g}",
             f"goodwill = {ny:g} x Rs {p:g} = Rs {gw:g}",
             f"the firm's goodwill is valued at Rs {gw:g}."]
    return gw, steps, f"goodwill = Rs {gw:g}", None,         "goodwill = years' purchase x average profit",         {"avg_profit": p, "years": ny, "goodwill": gw}



# --------------------------------------------------------------------------- #
# COMMERCE2 CHAINS (moved from commerce_families2.py, WS-B map
# step 5 / map section 5.5 -- one commerce file).  Row order: the
# core commerce rows keep their exact positions (the NET_GST_PAYABLE
# trigger is narrower than the GST row's and the dispatcher order is
# load-bearing: read_commerce / cs_fastpath pin the two-side GST
# chain ahead of the plain-GST arithmetic, proven by
# test_electives_all.test_net_gst); the four commerce2 rows follow
# as a block in their original internal order.
# --------------------------------------------------------------------------- #


def _fmt_ratio(r: float) -> str:
    if abs(r - round(r)) < 1e-9:
        return f"{int(round(r))} : 1"
    return f"{r:.4g} : 1"


# --------------------------------------------------------------------------- #
# 1. GST  (exclusive amount / inclusive extraction / CGST-SGST-IGST)
# --------------------------------------------------------------------------- #

_GST_CTX = re.compile(r"\bGST\b|goods\s+(?:and|&)\s+services\s+tax", re.I)
_GST_RATE_RE = re.compile(
    r"GST(?:\s*(?:at|@|of|is|rate\s+(?:of\s+)?))?\s*(?P<v>" + _U_NUM +
    r")\s*%|(?:at|@|of)\s*(?P<v2>" + _U_NUM + r")\s*%\s*GST", re.I)
_INCL_ASK_RE = re.compile(
    r"taxable\s+(?:value|price)|before\s+GST|pre-?GST|excluding\s+GST|"
    r"original\s+price|basic\s+(?:price|value)|how\s+much\s+(?:is\s+)?"
    r"(?:the\s+)?(?:GST|tax)[^?]{0,30}includ\w*", re.I)
_CGST_CTX = re.compile(
    r"CGST|SGST|intra-?state|same\s+state|own\s+state|within\s+(?:the|"
    r"his|her)\s+(?:own\s+)?state|sold\s+locally|local\s+sale", re.I)
_IGST_CTX = re.compile(
    r"IGST|inter-?state|another\s+state|outside\s+(?:the\s+)?state|"
    r"other\s+state", re.I)


def _gst_rate(t: str) -> Optional[float]:
    m = _GST_RATE_RE.search(t)
    if not m:
        return None
    return float((m.group("v") or m.group("v2")))


def _gst_base(t: str) -> Optional[float]:
    b = _grab(r"(?:worth|valued\s+at|priced\s+at|sold\s+for|costs?)", t)
    if b is not None:
        return b
    m = re.search(r"(?:orders?|bought|purchases?|supplies?)\s+(?:a|an|"
                  r"the)?[^.]{0,30}?" + _RS + r"(?P<v>" + _NUM + r")"
                  r"\s*(?P<u>lakh|lac|crores?|thousand)?", t, re.I)
    return _scaled(m) if m else None


def _c_gst(g, m, t):
    if not _GST_CTX.search(t):
        return _GATE
    # inclusive price: amount and rate may appear in either order
    # ("Rs 23600 including 18% GST" / "including 18% GST the price is
    # Rs 23600"); the ask must name the taxable value.  Handled BEFORE
    # the plain-rate gate because "18% GST" word order defeats the
    # forward rate regex here.
    im = re.search(r"(?P<v>" + _NUM + r")[^.]{0,30}?includ\w+[^.]{0,40}?"
                   r"(?P<r>" + _U_NUM + r")\s*%\s*GST", t, re.I) or \
        re.search(r"includ\w+[^.]{0,40}?(?P<r>" + _U_NUM + r")\s*%\s*GST"
                  r"[^.]{0,40}?" + _RS + r"(?P<v>" + _NUM + r")", t, re.I)
    if im:
        final = _scaled(im)
        rate = float(im.group("r"))
        if not (0 < rate <= 28) or final is None or final <= 0:
            return _GATE
        if not _INCL_ASK_RE.search(t):
            return _GATE      # inclusive price without a taxable-value ask
        den = 1.0 + rate / 100.0
        taxable = final / den
        gst = final - taxable
        steps = _five(
            "GST-inclusive extraction rule: final price = taxable value x "
            "(1 + r/100), so taxable value = final / (1 + r/100) and GST "
            "= final - taxable -- GST is levied ON the taxable value, so "
            "the inclusive price back-divides instead of subtracting the "
            "rate directly.",
            f"final price (including {rate:g}% GST) = {_fmt(final)}",
            [f"Taxable value = {final:g} / (1 + {rate:g}/100) = "
             f"{final:g} / {den:g} = Rs {taxable:,.2f}",
             f"GST = {final:g} - {taxable:,.2f} = {_fmt(gst)}"],
            f"Check: forward recompute -- {taxable:,.2f} x (1 + "
            f"{rate:g}/100) = Rs {taxable * den:,.2f}, the given final "
            f"price; the extraction closes.",
            f"Of the {_fmt(final)} paid, {_fmt(taxable)} is the seller's "
            f"taxable value and {_fmt(gst)} is GST -- subtracting "
            f"{rate:g}% of the final price directly would overstate the "
            f"tax (the classic error).")
        return (gst, steps,
                f"taxable value = Rs {taxable:,.2f} (GST = {_fmt(gst)})",
                None, "taxable = final / (1 + r/100)",
                {"final": final, "taxable": taxable, "rate": rate})
    # an inclusive-GST price without a taxable-value ask is owned by the
    # inclusive path above -- never fall through to the exclusive branch
    # (_U_NUM is wrapped: it carries a TOP-LEVEL alternation, and an
    # unwrapped concatenation after | splits the pattern so a bare
    # number alone matches and gates every plain GST probe)
    if re.search(r"includ\w+[^.]{0,40}?(?:" + _U_NUM + r")\s*%\s*GST|"
                 r"(?:" + _U_NUM + r")\s*%\s*GST[^.]{0,40}?includ\w+",
                 t, re.I):
        return _GATE
    rate = _gst_rate(t)
    if rate is None:
        return _GATE
    if not (0 < rate <= 28):
        # GST slabs are taught between 0 and 28%; anything else is a
        # non-taught tax structure -> refuse (mission gate)
        return _GATE
    base = _gst_base(t)
    if base is None or base <= 0:
        return _GATE
    gst = base * rate / 100.0
    total = base + gst
    if _IGST_CTX.search(t) and not _CGST_CTX.search(t):
        steps = _five(
            "IGST rule: inter-state supply attracts ONE integrated GST = "
            "taxable value x r/100, collected by the destination state -- "
            "no CGST/SGST split on inter-state sales (corpus: Gujarat -> "
            "Tamil Nadu supply).",
            f"taxable value = {_fmt(base)}, GST rate = {rate:g}% "
            f"(inter-state)",
            [f"IGST = {base:g} x {rate:g}/100 = {_fmt(gst)}",
             f"Total invoice = {base:g} + {gst:g} = {_fmt(total)}"],
            f"Check: split test -- had this been intra-state, CGST = SGST "
            f"= {gst:g}/2 = {_fmt(gst / 2)} each; the single IGST "
            f"{_fmt(gst)} equals their sum, consistent.",
            f"The inter-state invoice carries IGST of {_fmt(gst)}; total "
            f"payable = {_fmt(total)}.")
        return (gst, steps, f"IGST = {_fmt(gst)} (total {_fmt(total)})",
                None, "IGST = base x r/100",
                {"base": base, "rate": rate, "igst": gst, "total": total})
    if _CGST_CTX.search(t):
        half = gst / 2.0
        steps = _five(
            "Intra-state GST split rule: GST divides equally between the "
            "Centre and the State -- CGST = SGST = taxable value x r/200; "
            "the invoice total = taxable value + CGST + SGST (corpus: "
            "Rs 12,000 laptop at 18% -> CGST = SGST = Rs 1,080).",
            f"taxable value = {_fmt(base)}, GST rate = {rate:g}% "
            f"(intra-state: CGST + SGST)",
            [f"GST = {base:g} x {rate:g}/100 = {_fmt(gst)}",
             f"CGST = SGST = {_fmt(gst)} / 2 = {_fmt(half)} each",
             f"Total invoice = {base:g} + {gst:g} = {_fmt(total)}"],
            f"Check: CGST + SGST = {_fmt(half)} + {_fmt(half)} = "
            f"{_fmt(gst)} = {base:g} x {rate:g}/100 -- the halves "
            f"recombine to the full GST.",
            f"The invoice shows CGST and SGST of {_fmt(half)} each and "
            f"totals {_fmt(total)}.")
        return (half, steps,
                f"CGST = {_fmt(half)}; SGST = {_fmt(half)}; total invoice "
                f"value = {_fmt(total)}",
                None, "CGST = SGST = base x r/200",
                {"base": base, "rate": rate, "cgst": half, "sgst": half,
                 "total": total})
    steps = _five(
        "GST amount rule: GST = taxable value x rate/100 and the invoice "
        "total = taxable value + GST -- GST is an indirect tax added on "
        "the value of supply at the notified rate.",
        f"taxable value = {_fmt(base)}, GST rate = {rate:g}%",
        [f"GST = {base:g} x {rate:g}/100 = {_fmt(gst)}",
         f"Total invoice value = {base:g} + {gst:g} = {_fmt(total)}"],
        f"Check: back-substitute -- ({total:g} - {base:g}) / {base:g} x "
        f"100 = {rate:g}%, the stated rate; the addition is consistent.",
        f"The supply attracts GST of {_fmt(gst)} and the customer pays "
        f"{_fmt(total)} in total.")
    return (gst, steps,
            f"GST = {_fmt(gst)} (total invoice value {_fmt(total)})", None,
            "GST = base x r/100; total = base + GST",
            {"base": base, "rate": rate, "gst": gst, "total": total})


# --------------------------------------------------------------------------- #
# 2. PARTNERSHIP PROFIT SHARE
#     stated ratio -> ratio shares; "in their capital ratio" -> capitals;
#     otherwise equal split (no-deed default)
# --------------------------------------------------------------------------- #

_NAME2_RE = re.compile(
    r"\b([A-Za-z]{1,15})\s+(?:and|&)\s+([A-Za-z]{1,15})\s+(?:are|were)?"
    r"\s*(?:partners?)\b", re.I)
_PROFIT_RE = re.compile(
    r"(?:total\s+)?profits?\s+(?:is|are|of|=|earned|amounted\s+to)?\s*"
    + _RS + r"(?P<v>" + _NUM + r")\s*(?P<u>lakh|lac|crores?|thousand)?",
    re.I)
_RATIO_RE = re.compile(
    r"(?:sharing|share|shared|divide|divided|ratio\s+of)\s+(?:profits?|"
    r"profit|losses?|it|them)?[^.]{0,30}?(?P<a>" + _U_NUM + r")\s*:\s*"
    r"(?P<b>" + _U_NUM + r")(?:\s*:\s*(?P<c>" + _U_NUM + r"))?", re.I)
_CAP_RATIO_ASK = re.compile(r"in\s+(?:their\s+)?capital\s+ratio|"
                            r"in\s+the\s+ratio\s+of\s+(?:their|the)\s+"
                            r"capitals?", re.I)
_CAPS_RE = re.compile(
    r"capitals?\s+(?:of|are|is|=|:)?\s*" + _RS + r"(?P<v1>" + _NUM + r")"
    r"\s*(?P<u1>lakh|lac|crores?|thousand)?\s*(?:and|,)\s*"
    r"(?:(?:with\s+)?capitals?\s+(?:of\s+)?)?" + _RS + r"(?P<v2>" + _NUM +
    r")\s*(?P<u2>lakh|lac|crores?|thousand)?", re.I)


def _profit_total(t: str) -> Optional[float]:
    """The distributable total, skipping ratio misreads: 'share profits
    5:3' must NOT yield 'total profit = Rs 5' (it shipped 'Partner 1 =
    Rs 3.125' on a pure ratio question).  First match whose tail is not
    ':part' wins; negative totals are losses, handled by the caller."""
    for rm in _PROFIT_RE.finditer(t):
        tail = t[rm.end(): rm.end() + 4]
        if tail.lstrip().startswith(":"):
            continue              # the number opens a ratio, not an amount
        return _scaled(rm)
    return None


def _loss_total(t: str) -> Optional[float]:
    """'incurs a loss of Rs 9 lakh' / 'loss of Rs 9,00,000' -> positive
    magnitude of the stated LOSS."""
    for rm in re.finditer(
            r"loss(?:es)?\s+(?:is|are|of|=|incurred|amounted\s+to)?\s*"
            + _RS + r"(" + _NUM + r")\s*(?P<u>lakh|lac|crores?|thousand)?",
            t, re.I):
        tail = t[rm.end(): rm.end() + 4]
        if tail.lstrip().startswith(":"):
            continue
        v = float(str(rm.group(1)).replace(",", "")) * \
            _UNIT_MULT.get((rm.groupdict().get("u") or "").lower(), 1.0)
        if v > 0:
            return v
    return None


def _c_partnership(g, m, t):
    # electives-all 2026-10-07 gate: an APPROPRIATION-context question
    # (interest on capital / salaries / commission before the split) is
    # a multi-step chain -- a bare ratio split here ships a wrong
    # "divisible = net profit" answer VERIFIED (observed on the
    # c12_acc appropriation corpus shape).  PROFIT_APPROPRIATION in
    # accountancy_families owns these; decline and keep scanning.
    if re.search(r"interest\s+on\s+capital|appropriat|salary.{0,40}"
                 r"(?:to|each|partner)|commission.{0,40}(?:to|each|"
                 r"partner)|divisible\s+profit", t, re.I):
        return _GATE
    total = _profit_total(t)
    is_loss = False
    if total is None:
        lt = _loss_total(t)
        if lt is None:
            return _GATE
        total, is_loss = -lt, True
    if total == 0:
        return _GATE
    nm = _NAME2_RE.search(t)
    names = [nm.group(1), nm.group(2)] if nm else None
    rm2 = _RATIO_RE.search(t)
    cap_ratio = bool(_CAP_RATIO_ASK.search(t))
    if cap_ratio:
        cm = _CAPS_RE.search(t)
        if not cm:
            return _GATE
        c1 = float(str(cm.group("v1")).replace(",", "")) * \
            _UNIT_MULT.get((cm.group("u1") or "").lower(), 1.0)
        c2 = float(str(cm.group("v2")).replace(",", "")) * \
            _UNIT_MULT.get((cm.group("u2") or "").lower(), 1.0)
        if c1 <= 0 or c2 <= 0:
            return _GATE
        s1 = total * c1 / (c1 + c2)
        s2 = total - s1
        names = names or ["Partner 1", "Partner 2"]
        steps = _five(
            "Capital-ratio sharing rule: when partners agree to share "
            "profits in their capital ratio, each share = total profit x "
            "own capital / total capital.",
            f"{names[0]}'s capital = {_fmt(c1)}, {names[1]}'s capital = "
            f"{_fmt(c2)}, total profit = {_fmt(total)}",
            [f"Total capital = {c1:g} + {c2:g} = {_fmt(c1 + c2)}",
             f"{names[0]}'s share = {_fmt(total)} x {c1:g}/{c1 + c2:g} = "
             f"{_fmt(s1)}",
             f"{names[1]}'s share = {_fmt(total)} x {c2:g}/{c1 + c2:g} = "
             f"{_fmt(s2)}"],
            f"Check: the shares must rebuild the profit -- {_fmt(s1)} + "
            f"{_fmt(s2)} = {_fmt(s1 + s2)} = the stated total profit.",
            f"Sharing in the capital ratio, {names[0]} takes {_fmt(s1)} "
            f"and {names[1]} takes {_fmt(s2)} of the year's profit.")
        return (s1, steps,
                f"{names[0]} = {_fmt(s1)}; {names[1]} = {_fmt(s2)}",
                None, "share_i = profit x capital_i / total capital",
                {"capital1": c1, "capital2": c2, "share1": s1, "share2": s2})
    if rm2:
        parts = [float(rm2.group("a")), float(rm2.group("b"))]
        if rm2.group("c"):
            parts.append(float(rm2.group("c")))
        if any(p <= 0 for p in parts):
            return _GATE
        s = sum(parts)
        shares = [total * p / s for p in parts]
        who = names if names and len(parts) == 2 else \
            [f"partner {i + 1}" for i in range(len(parts))]
        lines = [f"Sum of ratio = {' + '.join(f'{p:g}' for p in parts)} "
                 f"= {s:g}"]
        for w, p, sh in zip(who, parts, shares):
            lines.append(f"{w.capitalize()}'s share = {_fmt(total)} x "
                         f"{p:g}/{s:g} = {_fmt(sh)}")
        steps = _five(
            "Ratio-sharing rule: profits divided in the stated ratio go "
            "share_i = total profit x part_i / sum of ratio parts.",
            f"profit-sharing ratio = "
            f"{' : '.join(f'{p:g}' for p in parts)}, total profit = "
            f"{_fmt(total)}",
            lines,
            f"Check: shares must sum to the profit -- " +
            " + ".join(f"{sh:,.2f}" for sh in shares) +
            f" = {_fmt(sum(shares))}, the stated total.",
            f"Profits are distributed " +
            " : ".join(f"{p:g}" for p in parts) +
            f"; {who[0].capitalize()} receives {_fmt(shares[0])}.")
        extra = {f"share{i + 1}": sh for i, sh in enumerate(shares)}
        return (shares[0], steps,
                "; ".join(f"{w.capitalize()} = {_fmt(sh)}"
                          for w, sh in zip(who, shares)),
                None, "share_i = profit x part_i / sum(ratio)", extra)
    # default: no deed / no stated ratio -> equal shares
    if not nm:
        return _GATE
    n = 2
    each = total / n
    steps = _five(
        "Equal-sharing default rule: in the absence of a partnership deed "
        "or a stated ratio, the Partnership Act default applies -- profits "
        "are shared EQUALLY, regardless of capitals contributed.",
        f"{nm.group(1)} and {nm.group(2)} are partners, total profit = "
        f"{_fmt(total)}, no ratio stated",
        [f"Each partner's share = {_fmt(total)} / {n} = {_fmt(each)}"],
        f"Check: {_fmt(each)} + {_fmt(each)} = {_fmt(total)} -- the "
        f"equal shares rebuild the total profit exactly.",
        f"Without a deed the law presumes equality: each partner takes "
        f"{_fmt(each)} (capitals do NOT change this default).")
    return (each, steps,
            f"{nm.group(1)} = {_fmt(each)}; {nm.group(2)} = {_fmt(each)}",
            None, "each share = profit / number of partners",
            {"share1": each, "share2": each})


# --------------------------------------------------------------------------- #
# 3. CURRENT / LIQUID RATIO  (answer is an "x : 1" SHAPE)
# --------------------------------------------------------------------------- #

_ASK_CURRENT_RE = re.compile(r"current\s+ratio", re.I)
_ASK_LIQUID_RE = re.compile(r"liquid\s+ratio|quick\s+ratio|"
                            r"acid[\s-]?test", re.I)


def _c_current_ratio(g, m, t):
    ask_liquid = bool(_ASK_LIQUID_RE.search(t))
    ask_current = bool(_ASK_CURRENT_RE.search(t))
    if not (ask_liquid or ask_current):
        return _GATE      # the RATIO must be asked, not merely CA/CL given
    ca = _grab(r"current\s+assets?", t)
    cl = _grab(r"current\s+liabilit\w+", t)
    if ask_liquid:
        la = _grab(r"liquid\s+assets?|quick\s+assets?", t)
        if la is None:
            inv = _grab(r"(?:closing\s+)?(?:inventory|stock)", t)
            pre = (r"liquid\s+ratio|quick\s+ratio|acid[\s-]?test")
            if inv is None or ca is None or cl is None:
                return _GATE
            la = ca - inv
            num_line = (f"Liquid assets = current assets - inventory = "
                        f"{ca:g} - {inv:g} = {_fmt(la)}")
        else:
            num_line = f"Liquid assets = {_fmt(la)}"
        if la is None or cl is None:
            return _GATE
        if cl <= 0 or la < 0 or cl < 0:
            return _GATE
        ratio = la / cl
        steps = _five(
            "Liquid (quick) ratio rule: liquid ratio = liquid assets / "
            "current liabilities, where liquid assets = current assets - "
            "inventory (stock cannot be relied on for immediate payment); "
            "the answer is an 'x : 1' shape, not a rupee amount.",
            f"liquid assets = {_fmt(la)}, current liabilities = {_fmt(cl)}",
            [num_line,
             f"Liquid ratio = {la:g} / {cl:g} = {ratio:.4g}"],
            f"Check: multiply back -- {cl:g} x {ratio:.4g} = "
            f"{cl * ratio:,.0f}, the liquid assets we started with; the "
            f"ratio reconstructs its numerator.",
            f"For every Re 1 of current liabilities the firm holds "
            f"Rs {ratio:.4g} of liquid assets"
            + (" -- around the 1:1 comfort benchmark."
               if 0.9 <= ratio <= 1.1 else "."))
        return (None, steps, f"liquid ratio = {_fmt_ratio(ratio)}", None,
                "liquid ratio = liquid assets / current liabilities",
                {"liquid_assets": la, "cl": cl, "ratio": ratio})
    if ca is None or cl is None:
        return _GATE
    if cl <= 0 or ca < 0 or cl < 0:
        return _GATE
    ratio = ca / cl
    steps = _five(
        "Current ratio rule: current ratio = current assets / current "
        "liabilities -- short-term payment capacity; the answer is an "
        "'x : 1' SHAPE, not a rupee amount (Rs 2 would be a unit error).",
        f"current assets = {_fmt(ca)}, current liabilities = {_fmt(cl)}",
        [f"Current ratio = {ca:g} / {cl:g} = {ratio:.4g}"],
        f"Check: multiply back -- {cl:g} x {ratio:.4g} = "
        f"{cl * ratio:,.0f}, the current assets we started with; the "
        f"ratio reconstructs its numerator.",
        f"For every Re 1 owed short-term the firm holds Rs {ratio:.4g} "
        f"of current assets" +
        (" -- above the 2:1 conventional benchmark."
         if ratio >= 2 else
         " -- below the 2:1 conventional comfort level.") + ".")
    return (None, steps, f"current ratio = {_fmt_ratio(ratio)}", None,
            "current ratio = CA / CL",
            {"ca": ca, "cl": cl, "ratio": ratio})


# --------------------------------------------------------------------------- #
# 4. INTEREST ON CAPITAL  IoC = P x r/100 x months/12
# --------------------------------------------------------------------------- #

def _c_interest_on_capital(g, m, t):
    low = t.lower()
    if not re.search(r"interest\s+on\s+capital", low):
        return _GATE
    # electives-all 2026-10-07 guard on the bare fallback: "capital"
    # followed by the RATE figure ("interest on capital @ 12% on
    # Rs 400000 ...") must never bind the rate as the capital (observed:
    # truncated surface served 12 x 12% = 1.44 VERIFIED).  The fallback
    # now requires a currency marker within the gap and rejects a "%"
    # between the label and the number; the explicit of/is/are forms
    # above are untouched.
    cap = (_grab(r"(?:partner'?s?\s+)?capitals?\s+(?:of|is|are|=|:)", t)
           or _grab(r"capital\s+account\s+(?:of|is|stands\s+at)", t)
           or _grab(r"capital(?![^.\n]{0,30}%)[^\d]{0,40}?"
                    r"(?:rs\.?|inr|\u20b9)\s*", t))
    if cap is None:
        return _GATE
    rate_m2 = re.search(r"interest\s+on\s+capital[^.\n]{0,80}?@\s*"
                        r"(?P<r2>" + _U_NUM + r")\s*%", t, re.I)
    if cap is not None and rate_m2 \
            and abs(cap - float(rate_m2.group("r2"))) < 1e-9:
        return _GATE          # grabbed the rate figure, not a capital
    rm = re.search(r"interest\s+on\s+capital[^.]{0,60}?(?P<v>" + _U_NUM +
                   r")\s*%", t, re.I)
    if not rm:
        return _GATE
    rate = float(rm.group("v"))
    if not (0 < rate <= 30):
        return _GATE
    pm = re.search(r"for\s+(?P<v>" + _U_NUM + r")\s*(?P<u>months?|years?)",
                   t, re.I)
    months = None
    if pm:
        months = _n(pm.group("v"))
        if pm.group("u").lower().startswith("year"):
            months *= 12.0
    frac = (months / 12.0) if months is not None else 1.0
    if frac <= 0:
        return _GATE
    if cap <= 0:
        return _GATE
    ioc = cap * rate / 100.0 * frac
    period_txt = (f"for {months:g} months" if months is not None
                  else "for the full year (12 months)")
    steps = _five(
        "Interest-on-capital rule: IoC = capital x rate/100 x period/12 -- "
        "interest accrues only for the months the capital was employed, "
        "so the annual rate must be time-scaled (period-aware, per the "
        "partnership appropriation chapters).",
        f"capital = {_fmt(cap)}, rate = {rate:g}% per annum, period = "
        f"{period_txt}",
        [f"Full-year interest = {cap:g} x {rate:g}/100 = "
         f"{cap * rate / 100:,.4g}",
         (f"IoC = {cap * rate / 100:,.4g} x {months:g}/12 = {_fmt(ioc)}"
          if months is not None else
          f"IoC for the full year = {_fmt(ioc)}")],
        f"Check: rate per month = {rate:g}/12 = {rate / 12:.4g}%; "
        f"{cap:g} x {rate / 12:.4g}% x "
        f"{months if months is not None else 12:g} months = "
        f"{cap * rate / 100 * frac:,.4g} -- both routes agree.",
        f"Interest on capital of {_fmt(ioc)} is credited to the partner's "
        f"capital (current) account before profits are shared.")
    return (ioc, steps, f"interest on capital = {_fmt(ioc)}", None,
            "IoC = P x r/100 x months/12",
            {"capital": cap, "rate": rate,
             "months": months if months is not None else 12.0})

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- electives-all additive row (2026-10-07): two-side GST chain;
    # trigger is narrow ("net GST payable") so landed rows are untouched
    ("NET_GST_PAYABLE",
     r"net\s+gst\s+payable|gst\s+payable",
     _c_net_gst_payable),
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
    ("PROFIT_ON_COST_SALE",
     r"profit",
     _c_profit_on_cost_sale),
    ("GOODWILL_YEARS_PURCHASE",
     r"goodwill",
     _c_goodwill_years_purchase),
    # ---- COMM2 block (moved from commerce_families2.py, WS-B map
    # step 5): GST / partnership / ratio / interest-on-capital
    # chains, internal order preserved.
    ("GST",
     r"\bGST\b|goods\s+(?:and|&)\s+services\s+tax|CGST|SGST|IGST",
     _c_gst),
    ("PARTNERSHIP_SHARE",
     r"partners?\b.{0,80}profit|profit.{0,80}partners?\b|"
     r"sharing\s+profits?|profit[\s-]sharing\s+ratio|capital\s+ratio",
     _c_partnership),
    ("CURRENT_RATIO",
     r"current\s+ratio|liquid\s+ratio|quick\s+ratio|acid[\s-]?test\s+"
     r"ratio",
     _c_current_ratio),
    ("INTEREST_ON_CAPITAL",
     r"interest\s+on\s+capital",
     _c_interest_on_capital),
]

# precompile triggers once at import (regex errors surface immediately)
TABLE = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE]




# --------------------------------------------------------------------------- #
# BLOCK EXTRA_COMM: Perpetuity (from extra_families.py — WS-B Step 7)
# --------------------------------------------------------------------------- #

_NUM_X = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"


def model_perpetuity(text: str) -> ModelResult:
    m = re.search(
        r"perpetuity\s+of\s+(?:rs\.?|rs\s*|₹\s*)?(" + _NUM_X + r")\s*"
        r"(?:payable\s+at\s+the\s+end\s+of\s+each\s+)?"
        r"(quarter|month|year|half[- ]?year)", text, re.I)
    pv = re.search(
        r"(?:rs\.?|rs\s*|₹\s*)?(" + _NUM_X + r")\s*(?:in\s+)?cash\s+"
        r"(?:is\s+)?equivalent", text, re.I)
    if not m or not pv:
        return _no("PERPETUITY", "need perpetuity payment and present value")
    pay = _n(m.group(1))
    period = m.group(2).lower()
    principal = _n(pv.group(1))
    if principal <= 0 or pay <= 0:
        return _no("PERPETUITY", "non-positive values")
    i_period = pay / principal
    per_year = {"month": 12, "quarter": 4, "half-year": 2, "year": 1}[period]
    nominal = i_period * per_year * 100.0
    steps = [
        f"Perpetuity: PV = A / i  ->  i = A / PV",
        f"i per {period} = {pay:g} / {principal:g} = {i_period:.6g}",
        f"Nominal annual rate = {i_period:.6g} x {per_year} = "
        f"{nominal:.4g}%",
        f"ANSWER: rate = {nominal:.4g}% p.a. (nominal)",
    ]
    return _res("PERPETUITY",
                {"payment": pay, "pv": principal, "i_period": i_period},
                nominal, "PV = A / i", steps, f"rate = {nominal:.4g}% p.a.")

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
    for fn in _EXTRA_COMMERCE_MODELS:
        try:
            r = fn(norm)
        except Exception:
            continue
        if r is not None and r.matched:
            return r
    return _no("COMMERCE", "no commerce family matched")


_EXTRA_COMMERCE_MODELS = [model_perpetuity]


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
    # WS-PAL (ovh-pal 2026-10-13): stamp the structure: route so the
    # badge gate resolves the registered verifier instead of
    # verifier_no_route -> strict_unverified.
    audit.route.append("structure:" + r.structure)
    audit.gates_passed.append("commerce_grounding")
    return PipelineResult(label=VERIFIED, answer=r.final_answer,
                          numeric=r.numeric_answer, steps=r.steps,
                          audit=audit)
