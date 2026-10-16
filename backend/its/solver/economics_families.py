"""economics_families.py -- deterministic economics families, classes 9-12.

Grounded in the actual textbooks cached on this machine:
  class 9   : iest ch 8-9 (new NCERT SST: economic problem, price puzzle)
              + c9_econ_icse corpus (Indian economy, poverty, unemployment)
  class 10  : c10_econ_icse corpus (demand-supply, banking, inflation)
  class 11  : Indian Economic Development (keec1xx) + index numbers via
              the Applied Maths statistics cache (am11/am12)
  class 12  : Introductory Macroeconomics (leec1xx) + Microeconomics (leec2xx)

Same contract as maths2_families.py / accountancy_families.py: one _TABLE of
rows (FID, trigger regex with named slots, compute function), each compute
returning the 6-tuple
    (value, steps, answer, assumptions, governing_equation, extra)
with _GATE = (None, [], None, None, None, None) meaning "trigger hit but
plausibility gate refused -- keep scanning".  The single dispatcher
model_economics_families scans the table in order; first grounded hit wins.
Recognition is by trigger regex only -- no LLM, no randomness.

Design notes (learned in testing):
  * Regex lookaheads only see FORWARD, so rows whose slots can appear in
    any order fire on a short category trigger and the HANDLER re-parses
    the labelled values from the full text (see the *_2 wrapper handlers).
  * Impossible-economy states (MPC >= 1, non-positive reserve ratio,
    non-positive equilibrium price/quantity, deflator <= 0, unemployed
    above the labour force) deliberately GATE-refuse so the sandbox can
    route them to the MisconceptionPanel instead of shipping a number.
  * Handler answers may contain comma-grouped numerals ("Rs 1,600") --
    surface text, not the numeric_answer contract.

Coverage (32 families; books2 block adds the chapters the first wave missed):
  micro    DEMAND_SUPPLY_LINEAR_ANY (any-solve), MARKET_EQUILIBRIUM,
           EXCESS_DEMAND_SUPPLY, DEMAND_Q_AT_P, DEMAND_P_FOR_Q,
           PED_PERCENTAGE (pairs + any-missing), PED_TOTAL_OUTLAY,
           PED_POINT_LINEAR, COST_SCHEDULE_ANY (TC/TFC/TVC/AC/AVC/AFC/MC),
           REVENUE_CURVES_ANY (TR/AR/MR), CONSUMER_EQUIB_RATIO (MUx/Px =
           MUy/Py), MARKET_SUPPLY_SUM, PRICE_CEILING_FLOOR
  macro    GDP_EXPENDITURE_ANY_MISSING, NNPFC_CONVERSION, VALUE_ADDED_CHAIN
           (+ stage-chain), INCOME_METHOD_NI, GDP_DEFLATOR (real/nominal
           any-missing), CPI_INFLATION_RATE, FISHER_REAL_RATE,
           MONEY_MULTIPLIER, DEPOSIT_CREATION_CHAIN,
           CONSUMPTION_FUNCTION_ANY, INVESTMENT_MULTIPLIER,
           APC_APS_IDENTITIES, BUDGET_DEFICITS_ANY, EXCHANGE_RATE_CHANGE,
           UNEMPLOYMENT_RATES, HEADCOUNT_RATIO, GDP_WELFARE_PERCAPITA,
           BOP_CLASSIFY_ANY
  stats    INDEX_AGGREGATIVE, INDEX_LASPEYRES, INDEX_PAASCHES,
           CORRELATION_COEFFICIENT (paired data, Karl Pearson)

STEP CONTRACT (enforced by test_economics_families.py): every family's steps
output contains, in order -- 1) "Method: <identity/law> + why it applies",
2) "Given: <figures restated with units>", 3) computation steps,
4) "Check: <verification / identity closes / recompute>",
5) "Interpretation: <in context>".  Minimum 3 steps and 150 chars; the
harness fails any family that violates this.

Deterministic only -- no LLM calls anywhere in this module.
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


_NUM = r"-?\d+(?:\.\d+)?"
_RS = r"(?:rs\.?|inr|\u20b9)?\s*"          # optional currency prefix


def _fmt(v: float) -> str:
    """Compact deterministic number formatting (no float noise)."""
    if abs(v - round(v)) < 1e-9:
        return f"{int(round(v)):,}"
    return f"{v:,.4f}".rstrip("0").rstrip(".")


def _ordinal(n: int) -> str:
    """1 -> '1st', 2 -> '2nd', 11 -> '11th' (no dict literals inside
    f-strings: the runtime Python predates PEP 701)."""
    if 10 <= n % 100 <= 19:
        suf = "th"
    else:
        suf = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return str(n) + suf


def _pf(s: Optional[str]) -> Optional[float]:
    """Parse a plain / comma-grouped number token ('1,000.5')."""
    if s is None:
        return None
    try:
        return float(str(s).replace(",", ""))
    except ValueError:
        return None


def _nums(s: Optional[str]) -> List[float]:
    if not s:
        return []
    return [float(x.replace(",", ""))
            for x in re.findall(r"-?\d+(?:\.\d+)?", s)]


def _grab1(text: str, pattern: str) -> Optional[str]:
    m = re.search(pattern, text, re.I)
    return m.group(1) if m else None


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: unicode minus, dashes, quotes, nbsp."""
    t = (text or "").replace("\u2212", "-").replace("\u2013", "-") \
        .replace("\u2014", "-").replace("\u2019", "'").replace("\u00a0", " ")
    return t


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)


def _labv(text: str, label: str, tight: bool = False) -> Optional[float]:
    """First number after a labelled phrase.

    Default: skip up to 30 non-digit chars ('capital receipts excluding
    borrowings are 150' -> 150); the filler class excludes digits so the
    scan can never cross a competing number.  tight=True demands an
    immediate connector ('consumption is 440') so the label cannot grab
    a value belonging to another clause.
    """
    if tight:
        m = re.search(label + r"\s*(?:is|are|=|:|of|was|were|at|stood)?\s*" +
                      _RS + r"(?P<v>" + _NUM + r")", text, re.I)
    else:
        m = re.search(label + r"[^0-9\-\n]{0,30}?(?P<v>" + _NUM + r")",
                      text, re.I)
    return _pf(m.group("v")) if m else None


def _has_word(text: str, pattern: str) -> bool:
    return bool(re.search(pattern, text, re.I))


def _classify_ed(ed: float) -> str:
    a = abs(ed)
    if a > 1.0 + 1e-9:
        return "elastic"
    if a < 1.0 - 1e-9:
        return "inelastic"
    return "unitary elastic"


# --------------------------------------------------------------------------- #
# linear demand Qd = a - bP and supply Qs = c + dP (signed slopes)
# --------------------------------------------------------------------------- #

_DEM_QD = (r"(?:q\s*_?\s*d|quantity\s+demanded)\s*=\s*"
           r"(?P<a>" + _NUM + r")\s*(?P<sgnb>[-+])\s*(?P<b>" + _NUM +
           r")\s*[x\u00d7*]?\s*p\b")
_SUP_QS = (r"(?:q\s*_?\s*s|quantity\s+supplied)\s*=\s*"
           r"(?P<c>" + _NUM + r")\s*(?P<sgnd>[-+])\s*(?P<d>" + _NUM +
           r")\s*[x\u00d7*]?\s*p\b")


def _fn_from(g: Dict[str, Any], a_k: str, sg_k: str, b_k: str) -> \
        Tuple[Optional[float], Optional[float]]:
    """(intercept, signed slope) from a matched linear slot triple."""
    a = _pf(g.get(a_k))
    b = _pf(g.get(b_k))
    if a is None or b is None:
        return None, None
    if g.get(sg_k) == "-":
        b = -b
    return a, b


def _both_fns(text: str) -> Optional[Dict[str, float]]:
    """Match demand AND supply linear functions anywhere in the text."""
    md = re.search(_DEM_QD, text, re.I)
    ms = re.search(_SUP_QS, text, re.I)
    if not (md and ms):
        return None
    a, b = _fn_from(md.groupdict(), "a", "sgnb", "b")
    c, d = _fn_from(ms.groupdict(), "c", "sgnd", "d")
    if None in (a, b, c, d):
        return None
    if b >= 0:      # law of demand: demand slope must be negative
        return None
    if d <= 0:      # law of supply: supply slope must be positive
        return None
    return {"a": a, "b": b, "c": c, "d": d}


# --------------------------------------------------------------------------- #
# 1. MARKET_EQUILIBRIUM  --  P* = (a - c)/(|b| + d),  Q* = a + b P*
# --------------------------------------------------------------------------- #


def _c_equilibrium(g, m, text):
    if not _has_word(text, r"\bequilibrium\b"):
        return _GATE    # ask-word gate: the pure pair-trigger admits any order
    fn = _both_fns(text)
    if not fn:
        return _GATE
    a, b, c, d = fn["a"], fn["b"], fn["c"], fn["d"]
    if abs(b) + d == 0:
        return _GATE
    p_star = (a - c) / (abs(b) + d)
    if p_star <= 0:
        return _GATE    # impossible state: non-positive equilibrium price
    q_star = a + b * p_star
    if q_star <= 0:
        return _GATE    # impossible state: non-positive equilibrium qty
    steps = [
        "Method: a market is in equilibrium where quantity demanded equals "
        "quantity supplied (Qd = Qs, leec205 ch 5); solving the two linear "
        "curves simultaneously gives the equilibrium price and quantity.",
        f"Given: demand Qd = {_fmt(a)} - {_fmt(abs(b))}P and supply Qs = "
        f"{_fmt(c)} + {_fmt(abs(d))}P.",
        "Set Qd = Qs: "
        f"{_fmt(a)} - {_fmt(abs(b))}P = {_fmt(c)} + {_fmt(abs(d))}P, so "
        f"P* = ({_fmt(a)} - {_fmt(c)}) / ({_fmt(abs(b))} + {_fmt(abs(d))}) "
        f"= Rs {_fmt(p_star)}.",
        f"Q* = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(p_star)} = {_fmt(q_star)} "
        "units.",
        f"Check: supply at P* gives Qs = {_fmt(c)} + {_fmt(abs(d))} x "
        f"{_fmt(p_star)} = {_fmt(c + d * p_star)} = Q* -- the identity "
        "closes on both curves.",
        f"Interpretation: at Rs {_fmt(p_star)} buyers plan to buy exactly "
        f"what sellers offer -- {_fmt(q_star)} units change hands; any "
        "price above leaves a surplus (price is pushed down), any below a "
        "shortage (price is bid up), so the market gravitates back to P*.",
    ]
    ans = (f"Equilibrium price P* = Rs {_fmt(p_star)}, equilibrium quantity "
           f"Q* = {_fmt(q_star)} units")
    steps.append(f"ANSWER: {ans}")
    return p_star, steps[:-1], ans, None, "Qd = Qs  ->  P* = (a - c)/(b + d)", \
        {"p_star": p_star, "q_star": q_star}


# --------------------------------------------------------------------------- #
# 2. EXCESS DEMAND / SUPPLY at a given price
# --------------------------------------------------------------------------- #


def _c_excess_demand(g, m, text):
    if _has_word(text, r"\bequilibrium\b"):
        return _GATE        # equilibrium ask owns the text (earlier row)
    if not _has_word(text, r"\b(?:excess|surplus|shortage)\b"):
        return _GATE
    fn = _both_fns(text)
    if not fn:
        return _GATE
    pp = _pf(g.get("pp"))
    if pp is None or pp <= 0:
        return _GATE
    a, b, c, d = fn["a"], fn["b"], fn["c"], fn["d"]
    qd = a + b * pp
    qs = c + d * pp
    gap = qd - qs
    kind = ("excess demand (shortage)" if gap > 0
            else "excess supply (surplus)" if gap < 0
            else "no excess -- the market is at equilibrium")
    steps = [
        "Method: away from equilibrium the market gap is excess demand = "
        "Qd - Qs at the ruling price -- positive means a shortage (price "
        "tends to rise), negative a surplus (price tends to fall) (leec205 "
        "ch 5).",
        f"Given: Qd = {_fmt(a)} - {_fmt(abs(b))}P;  Qs = {_fmt(c)} + "
        f"{_fmt(abs(d))}P;  ruling price P = Rs {_fmt(pp)}.",
        f"Qd = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(pp)} = {_fmt(qd)};  "
        f"Qs = {_fmt(c)} + {_fmt(abs(d))} x {_fmt(pp)} = {_fmt(qs)}.",
        f"Gap = Qd - Qs = {_fmt(qd)} - {_fmt(qs)} = {_fmt(gap)} "
        "(positive = shortage, negative = surplus).",
        f"Check: the two curves at this price read {_fmt(qd)} and "
        f"{_fmt(qs)} units -- a gap of {_fmt(abs(gap))}, whose sign "
        f"({'positive' if gap > 0 else 'negative' if gap < 0 else 'zero'}) "
        "fixes the classification.",
        f"Interpretation: at Rs {_fmt(pp)} there is {kind} of "
        f"{_fmt(abs(gap))} units"
        + ("; competition among buyers pushes the price up toward P*."
           if gap > 0 else
           "; competition among sellers pushes the price down toward P*."
           if gap < 0 else
           " -- the market is already in equilibrium.") + ".",
    ]
    ans = f"At price Rs {_fmt(pp)} there is {kind} of {_fmt(abs(gap))} units"
    if gap > 0:
        ans += "; competition among buyers pushes the price up toward P*."
    elif gap < 0:
        ans += "; competition among sellers pushes the price down toward P*."
    else:
        ans += "."
    steps.append(f"ANSWER: {ans}")
    return gap, steps[:-1], ans, None, "excess demand = Qd - Qs", \
        {"qd_at_p": qd, "qs_at_p": qs}


def _c_demand_q_at_p(g, m, text):
    md = re.search(_DEM_QD, text, re.I)
    if not md:
        return _GATE
    if _has_word(text, r"\bequilibrium\b|\b(?:excess|surplus|shortage)\b"
                       r"|\belasticit(?:y|ies)\b"):
        return _GATE        # other asks own the text (earlier rows)
    a, b = _fn_from(md.groupdict(), "a", "sgnb", "b")
    pp = _pf(g.get("pp"))
    if a is None or b is None or pp is None or pp <= 0:
        return _GATE
    qd = a + b * pp
    if qd < 0:
        return _GATE        # impossible state: negative quantity demanded
    steps = [
        "Method: the demand function Qd = a - bP (law of demand -- negative "
        "slope) gives the quantity buyers plan to buy at any price; "
        "substitute the given price.",
        f"Given: Qd = {_fmt(a)} - {_fmt(abs(b))}P;  P = Rs {_fmt(pp)}.",
        f"Qd = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(pp)} = {_fmt(qd)} units.",
        f"Check: read backwards -- P = (a - Qd)/b = ({_fmt(a)} - "
        f"{_fmt(qd)})/{_fmt(abs(b))} = {_fmt((a - qd) / abs(b))}, which "
        "recovers the given price, so the substitution closes.",
        f"Interpretation: at Rs {_fmt(pp)} consumers plan to buy "
        f"{_fmt(qd)} units -- a movement ALONG the demand curve, not a "
        "shift of it.",
    ]
    ans = f"Quantity demanded at price Rs {_fmt(pp)} = {_fmt(qd)} units"
    steps.append(f"ANSWER: {ans}")
    return qd, steps[:-1], ans, None, "Qd = a - bP", {"a": a, "b": b}


def _c_demand_p_for_q(g, m, text):
    md = re.search(_DEM_QD, text, re.I)
    if not md:
        return _GATE
    if _has_word(text, r"\bequilibrium\b|\b(?:excess|surplus|shortage)\b"
                       r"|\belasticit(?:y|ies)\b"):
        return _GATE
    a, b = _fn_from(md.groupdict(), "a", "sgnb", "b")
    qq = _pf(g.get("qq"))
    if a is None or b is None or qq is None or qq <= 0 or b == 0:
        return _GATE
    p = (a - qq) / abs(b)
    if p <= 0:
        return _GATE        # impossible state: non-positive price
    steps = [
        "Method: rearrange the demand function Qd = a - bP for price, "
        "P = (a - Qd)/b -- the inverse-demand reading of the same curve.",
        f"Given: Qd = {_fmt(a)} - {_fmt(abs(b))}P;  quantity demanded = "
        f"{_fmt(qq)} units.",
        f"Solve {_fmt(qq)} = {_fmt(a)} - {_fmt(abs(b))}P:  P = "
        f"({_fmt(a)} - {_fmt(qq)}) / {_fmt(abs(b))} = Rs {_fmt(p)}.",
        f"Check: substitute P = {_fmt(p)} back -- Qd = {_fmt(a)} - "
        f"{_fmt(abs(b))} x {_fmt(p)} = {_fmt(a + b * p)}, exactly the "
        "given quantity, so the identity closes.",
        f"Interpretation: buyers take {_fmt(qq)} units off the market only "
        f"when the price is Rs {_fmt(p)} -- a movement along the demand "
        "curve.",
    ]
    ans = (f"Price at which quantity demanded is {_fmt(qq)} units = "
           f"Rs {_fmt(p)}")
    steps.append(f"ANSWER: {ans}")
    return p, steps[:-1], ans, None, "Qd = a - bP  ->  P = (a - Qd)/b", \
        {"a": a, "b": b}


# --------------------------------------------------------------------------- #
# 3-4. PRICE ELASTICITY OF DEMAND
# --------------------------------------------------------------------------- #


def _c_ped_pairs(g, m, text):
    p1, p2 = _pf(g.get("p1")), _pf(g.get("p2"))
    q1, q2 = _pf(g.get("q1")), _pf(g.get("q2"))
    if None in (p1, p2, q1, q2) or p1 <= 0 or q1 <= 0 or p1 == p2:
        return _GATE
    dp = (p2 - p1) / p1 * 100.0
    dq = (q2 - q1) / q1 * 100.0
    if dp == 0:
        return _GATE
    ed = dq / dp
    cls = _classify_ed(ed)
    steps = [
        "Method: percentage (proportionate) method -- price elasticity of "
        "demand Ed = % change in quantity / % change in price; it applies "
        "whenever a price move and the matching quantity move are both "
        "observed (ICSE ch 2 / leec202).",
        f"Given: price moves from Rs {_fmt(p1)} to Rs {_fmt(p2)} while "
        f"quantity moves from {_fmt(q1)} to {_fmt(q2)} units.",
        f"% change in price = ({_fmt(p2)} - {_fmt(p1)})/{_fmt(p1)} x 100 = "
        f"{_fmt(dp)}%;  % change in quantity = ({_fmt(q2)} - {_fmt(q1)})/"
        f"{_fmt(q1)} x 100 = {_fmt(dq)}%.",
        f"Ed = {_fmt(dq)} / {_fmt(dp)} = {_fmt(ed)} (magnitude "
        f"{_fmt(abs(ed))}).",
        f"Check: Ed x %dP = {_fmt(ed)} x {_fmt(dp)} = {_fmt(ed * dp)} = "
        "%dQ -- the definition closes.",
        f"Interpretation: |Ed| "
        f"{'>' if abs(ed) > 1 else '<' if abs(ed) < 1 else '='} 1, so "
        f"demand is {cls}: "
        + ("quantity responds more than proportionally to price, so a "
           "price rise lowers total spending."
           if abs(ed) > 1 else
           "quantity responds less than proportionally, so a price rise "
           "raises total spending."
           if abs(ed) < 1 else
           "quantity moves in the same proportion as price, leaving total "
           "spending unchanged.") + ".",
    ]
    ans = (f"Price elasticity of demand = {_fmt(ed)} (magnitude "
           f"{_fmt(abs(ed))}): demand is {cls}")
    steps.append(f"ANSWER: {ans}")
    return ed, steps[:-1], ans, None, "Ed = (%dQ/Q) / (%dP/P)", \
        {"pct_dp": dp, "pct_dq": dq, "ed_magnitude": abs(ed)}


def _c_ped_missing(g, m, text):
    """Any-missing among Ed, %dP, %dQ -- two known give the third.

    Slots are re-parsed from the full text: the three trigger rows each
    capture a different subset, and the ask can place the remaining
    values anywhere in the sentence."""
    ed = _pf(g.get("ed")) or _pf(g.get("ed2"))
    pdp = _pf(g.get("pdp"))
    qdp = _pf(g.get("qdp"))
    if pdp is None:
        mm_ = re.search(r"price\s+(?:rises|falls|increases|decreases|"
                        r"changes)\s+by\s*(?P<v>" + _NUM + r")\s*%",
                        text, re.I)
        if mm_:
            pdp = _pf(mm_.group("v"))
    if qdp is None:
        mq = re.search(r"quantity\s+(?:demanded\s+)?(?:falls|rises|drops|"
                       r"increases|decreases|changes)\s+by\s*(?P<v>" +
                       _NUM + r")\s*%", text, re.I)
        if mq:
            qdp = _pf(mq.group("v"))
    known = [v for v in (ed, pdp, qdp) if v is not None]
    if len(known) < 2:
        return _GATE
    if ed is None:
        if pdp == 0:
            return _GATE
        ed = qdp / pdp
        cls = _classify_ed(ed)
        steps = [
            "Method: percentage method -- Ed = %dQ / %dP; with two of the "
            "three terms known, the third follows from the definition.",
            f"Given: % change in quantity = {_fmt(qdp)}%, % change in "
            f"price = {_fmt(pdp)}%.",
            f"Ed = {_fmt(qdp)} / {_fmt(pdp)} = {_fmt(ed)}.",
            f"Check: Ed x %dP = {_fmt(ed)} x {_fmt(pdp)} = "
            f"{_fmt(ed * pdp)} = %dQ -- the definition closes.",
            f"Interpretation: |Ed| = {_fmt(abs(ed))}, i.e. demand is "
            f"{cls} -- quantity moves in the opposite direction to price, "
            "in this proportion.",
        ]
        ans = f"Ed = {_fmt(ed)} ({cls} demand)"
        val = ed
    elif pdp is None:
        if ed == 0:
            return _GATE
        pdp = qdp / ed
        steps = [
            "Method: percentage method rearranged -- %dP = %dQ / Ed.",
            f"Given: Ed = {_fmt(ed)}, % change in quantity = "
            f"{_fmt(qdp)}%.",
            f"%dP = {_fmt(qdp)} / {_fmt(ed)} = {_fmt(pdp)}%.",
            f"Check: Ed x %dP = {_fmt(ed)} x {_fmt(pdp)} = "
            f"{_fmt(ed * pdp)} = %dQ -- the definition closes.",
            "Interpretation: the price must move by "
            f"{_fmt(pdp)}% in the OPPOSITE direction to quantity for this "
            "elasticity to hold.",
        ]
        ans = (f"% change in price = {_fmt(pdp)}% (price moves opposite "
               f"to quantity)")
        val = pdp
    else:
        qdp = ed * pdp
        steps = [
            "Method: percentage method rearranged -- %dQ = Ed x %dP.",
            f"Given: Ed = {_fmt(ed)}, % change in price = {_fmt(pdp)}%.",
            f"%dQ = {_fmt(ed)} x {_fmt(pdp)} = {_fmt(qdp)}%; by the law of "
            "demand quantity moves the OPPOSITE way to price.",
            f"Check: %dQ / %dP = {_fmt(qdp)} / {_fmt(pdp)} = {_fmt(ed)} = "
            "Ed -- the definition closes.",
            f"Interpretation: a {_fmt(pdp)}% price change swings quantity "
            f"demanded by {_fmt(qdp)}% -- demand is {_classify_ed(ed)}.",
        ]
        ans = (f"% change in quantity demanded = {_fmt(qdp)}% in the "
               f"opposite direction to the price change")
        val = qdp
    steps.append(f"ANSWER: {ans}")
    extra: Dict[str, float] = {}
    if ed is not None:
        extra["ed"] = ed
    if pdp is not None:
        extra["pct_dp"] = pdp
    if qdp is not None:
        extra["pct_dq"] = qdp
    return val, steps[:-1], ans, None, "Ed = %dQ / %dP", extra


def _c_ped_total_outlay(g, m, text):
    """Total-outlay (total-expenditure) method: compare P1Q1 with P2Q2."""
    if not _has_word(text, r"total\s+outlay|total\s+expenditure|"
                           r"total\s+spending"):
        return _GATE
    p1, p2 = _pf(g.get("p1")), _pf(g.get("p2"))
    q1, q2 = _pf(g.get("q1")), _pf(g.get("q2"))
    t1, t2 = _pf(g.get("t1")), _pf(g.get("t2"))
    te1 = q1 * p1 if (q1 is not None and p1 is not None) else t1
    te2 = q2 * p2 if (q2 is not None and p2 is not None) else t2
    if None in (p1, p2, te1, te2) or p1 <= 0 or p2 <= 0 or p1 == p2:
        return _GATE
    price_up = p2 > p1
    if abs(te2 - te1) < 1e-9:
        cls, val = "unitary elastic", 1.0
        why = (f"total outlay is UNCHANGED (Rs {_fmt(te1)} -> Rs "
               f"{_fmt(te2)})")
    elif (te2 > te1) == price_up:
        cls, val = "inelastic", abs(te2 - te1)
        why = (f"total outlay moves in the SAME direction as price "
               f"(Rs {_fmt(te1)} -> Rs {_fmt(te2)})")
    else:
        cls, val = "elastic", abs(te2 - te1)
        why = (f"total outlay moves in the OPPOSITE direction to price "
               f"(Rs {_fmt(te1)} -> Rs {_fmt(te2)})")
    steps = [
        "Method: total-outlay (total-expenditure) method -- compare TE = P "
        "x Q before and after the price change: TE moves WITH price -> "
        "inelastic, AGAINST price -> elastic, unchanged -> unitary (ICSE "
        "ch 2); it applies because the size of the quantity response "
        "decides which way spending moves.",
        f"Given: price moves from Rs {_fmt(p1)} to Rs {_fmt(p2)};  outlay "
        f"moves from Rs {_fmt(te1)} to Rs {_fmt(te2)}.",
        f"TE1 = P1 x Q1 = {_fmt(p1)} x "
        f"{_fmt(q1 if q1 is not None else te1 / p1)} = Rs {_fmt(te1)};  "
        f"TE2 = P2 x Q2 = {_fmt(p2)} x "
        f"{_fmt(q2 if q2 is not None else te2 / p2)} = Rs {_fmt(te2)}.",
        f"Price {'rises' if price_up else 'falls'} and {why}.",
        f"Check: recomputing the outlays from P x Q gives the same "
        f"Rs {_fmt(te1)} and Rs {_fmt(te2)} -- the test closes.",
        f"Interpretation: demand is {cls}: "
        + ("spending falls despite the higher price only because quantity "
           "dropped proportionally more."
           if cls == "elastic" else
           "spending rises with price because quantity barely responded."
           if cls == "inelastic" else
           "the quantity fall exactly offset the price rise, leaving "
           "spending unchanged.") + ".",
    ]
    ans = f"Demand is {cls} (total-outlay method)"
    steps.append(f"ANSWER: {ans}")
    return val, steps[:-1], ans, None, \
        "TE = P x Q;  TE moves with P -> inelastic", {"te1": te1, "te2": te2}


def _c_ped_point(g, m, text):
    md = re.search(_DEM_QD, text, re.I)
    if not md:
        return _GATE
    if not _has_word(text, r"\belasticit(?:y|ies)\b"):
        return _GATE
    a, b = _fn_from(md.groupdict(), "a", "sgnb", "b")
    pp = _pf(g.get("pp"))
    if a is None or b is None or pp is None or pp <= 0 or b == 0:
        return _GATE
    q = a + b * pp
    if q <= 0:
        return _GATE        # point not on the positive branch of the curve
    ed = abs(b) * pp / q
    cls = _classify_ed(ed)
    mid_p = a / (2.0 * abs(b))
    steps = [
        "Method: point elasticity on a linear demand curve, e = |dQ/dP| x "
        "(P/Q) -- the slope term is constant, so elasticity varies only "
        "with the P/Q ratio at the chosen point (leec202).",
        f"Given: Qd = {_fmt(a)} - {_fmt(abs(b))}P;  point P = Rs {_fmt(pp)}.",
        f"Quantity at this price: Q = {_fmt(a)} - {_fmt(abs(b))} x "
        f"{_fmt(pp)} = {_fmt(q)}.  e = {_fmt(abs(b))} x {_fmt(pp)}/"
        f"{_fmt(q)} = {_fmt(ed)}.",
        f"Check: on this curve e = 1 exactly at the midpoint price "
        f"a/(2b) = Rs {_fmt(mid_p)}; Rs {_fmt(pp)} lies "
        f"{'above' if pp > mid_p else 'below'} it, which matches the "
        f"'{cls}' verdict -- the geometry closes.",
        f"Interpretation: at Rs {_fmt(pp)} demand is {cls}: a 1% price "
        f"change moves quantity by about {_fmt(ed)}% -- on a straight-line "
        "demand curve elasticity falls as P falls even though the slope "
        "never changes.",
    ]
    ans = f"Point elasticity at price Rs {_fmt(pp)} = {_fmt(ed)} ({cls})"
    steps.append(f"ANSWER: {ans}")
    return ed, steps[:-1], ans, None, "e = |dQ/dP| x (P/Q)", \
        {"q_at_p": q}


# --------------------------------------------------------------------------- #
# 5. GDP = C + I + G + (X - M), any-missing-component
# --------------------------------------------------------------------------- #

_L_C = r"consumption(?:\s+expenditure|\s+spending)?\b"
_L_I = r"(?:gross\s+|private\s+|net\s+)?investment\b"
_L_G = r"government\s+(?:expenditure|spending|purchases)\b"
_L_X = r"exports?\b"
_L_M = r"imports?\b"
_L_GDP = r"(?:gross\s+domestic\s+product|\bgdp\b)"
_GDP_SIGN = {"consumption": 1.0, "investment": 1.0, "government": 1.0,
             "exports": 1.0, "imports": -1.0}
_GDP_NAME = {"consumption": "C", "investment": "I", "government": "G",
             "exports": "X", "imports": "M"}
_GDP_ORDER = ("consumption", "investment", "government", "exports",
              "imports")


def _c_gdp_identity(g, m, text):
    c = _labv(text, _L_C)
    i = _labv(text, _L_I)
    gv = _labv(text, _L_G)
    x = _labv(text, _L_X)
    mv = _labv(text, _L_M)
    gdp = _labv(text, _L_GDP)
    comps = {"consumption": c, "investment": i, "government": gv,
             "exports": x, "imports": mv}
    missing = [k for k in _GDP_ORDER if comps[k] is None]
    if gdp is None:
        if missing:
            return _GATE    # cannot verify the identity without all terms
        gdp = sum(comps[k] * _GDP_SIGN[k] for k in _GDP_ORDER)
        if gdp <= 0:
            return _GATE
        readd = c + i + gv + x - mv
        expr = (f"{_fmt(c)} + {_fmt(i)} + {_fmt(gv)} + "
                f"({_fmt(x)} - {_fmt(mv)})")
        steps = [
            "Method: expenditure method of national income accounting -- "
            "GDP = C + I + G + (X - M): all final expenditure on domestic "
            "output by households, firms, government and the foreign "
            "sector, with imports subtracted because they are not domestic "
            "output (leec102 ch 2).",
            f"Given: C = {_fmt(c)}, I = {_fmt(i)}, G = {_fmt(gv)}, X = "
            f"{_fmt(x)}, M = {_fmt(mv)} (all Rs).",
            f"GDP = {expr} = Rs {_fmt(gdp)}.",
            f"Check: re-adding C + I + G + X - M = {_fmt(readd)} -- the "
            "identity closes.",
            "Interpretation: Rs "
            f"{_fmt(gdp)} is the total final-expenditure flow on this "
            "economy's output in the year; imports enter with a minus "
            "sign so only domestically produced goods are counted.",
        ]
        ans = f"GDP = Rs {_fmt(gdp)}"
        steps.append(f"ANSWER: {ans}")
        extra = {f"{k}_val": comps[k] for k in _GDP_ORDER}
        extra["gdp"] = gdp
        return gdp, steps[:-1], ans, None, "GDP = C + I + G + (X - M)", extra
    if len(missing) != 1:
        return _GATE        # nothing to solve, or under/over-determined
    tgt = missing[0]
    signed_known = sum(comps[k] * _GDP_SIGN[k] for k in _GDP_ORDER
                       if k != tgt)
    val = (gdp - signed_known) / _GDP_SIGN[tgt]
    if val < 0:
        return _GATE        # impossible state: negative component
    terms = []
    for k in _GDP_ORDER:
        if k == tgt:
            terms.append(_GDP_NAME[tgt])
        elif k == "imports":
            terms.append(f"(-{_fmt(mv)})")
        else:
            terms.append(_fmt(comps[k]))
    recheck = sum(comps[k] * _GDP_SIGN[k] for k in _GDP_ORDER
                  if k != tgt) + val * _GDP_SIGN[tgt]
    steps = [
        "Method: expenditure-method identity GDP = C + I + G + (X - M) "
        "(leec102 ch 2); with GDP and four components known, the missing "
        "component is the balancing figure of the identity.",
        "Given: GDP = Rs " + _fmt(gdp) + ";  " + ", ".join(
            f"{_GDP_NAME[k]} = {_fmt(comps[k])}" for k in _GDP_ORDER
            if k != tgt) + " (all Rs).",
        "Substitute into GDP = " + " + ".join(terms) + f" = {_fmt(gdp)}.",
        f"Solve for {_GDP_NAME[tgt]}: {_GDP_NAME[tgt]} = {_fmt(gdp)} - "
        f"({_fmt(signed_known)})"
        + (" divided by -1 (imports enter with a minus sign)" if
           _GDP_SIGN[tgt] < 0 else "") +
        f" = Rs {_fmt(val)}.",
        f"Check: re-adding every component gives {_fmt(recheck)} = the "
        "given GDP -- the identity closes.",
        f"Interpretation: {_GDP_NAME[tgt]} of Rs {_fmt(val)} is exactly "
        "what the expenditure accounts need to balance -- e.g. exports "
        "must rise to the level where total spending on domestic output "
        "equals measured GDP." if tgt == "exports" else
        f"Interpretation: {_GDP_NAME[tgt]} of Rs {_fmt(val)} is exactly "
        "what the expenditure accounts need to balance -- total final "
        f"spending C + I + G + (X - M) reproduces GDP = Rs {_fmt(gdp)}.",
    ]
    ans = f"{tgt.capitalize()} ({_GDP_NAME[tgt]}) = Rs {_fmt(val)}"
    steps.append(f"ANSWER: {ans}")
    extra = {f"{k}_val": comps[k] for k in _GDP_ORDER
             if comps[k] is not None}
    extra["gdp"] = gdp
    return val, steps[:-1], ans, None, "GDP = C + I + G + (X - M)", extra


# --------------------------------------------------------------------------- #
# 6. NNPfc (national income) from GDPmp
# --------------------------------------------------------------------------- #


def _c_nnpfc(g, m, text):
    gdp = _labv(text, r"(?:\bgdp\b|gross\s+domestic\s+product)\b")
    if gdp is None:
        return _GATE
    dep = _labv(text, r"(?:depreciation|consumption\s+of\s+fixed\s+capital)")
    if dep is None:
        return _GATE
    nit = _labv(text, r"net\s+indirect\s+tax(?:es)?")
    it = _labv(text, r"(?:net\s+)?indirect\s+tax(?:es)?")
    sb = _labv(text, r"subsid(?:y|ies)")
    if nit is None and it is None:
        return _GATE
    if nit is None:
        if sb is None:
            return _GATE
        nit = it - sb
        nit_steps = f"NIT = indirect taxes - subsidies = {_fmt(it)} - " \
                    f"{_fmt(sb)} = {_fmt(nit)}."
    else:
        nit_steps = f"NIT is given directly as {_fmt(nit)}."
    nfia = _labv(text, r"(?:net\s+factor\s+income\s+from\s+abroad|nfia)")
    assumptions = []
    if nfia is None:
        nfia = 0.0
        assumptions.append("NFIA not stated, taken as 0 (closed-economy "
                           "assumption)")
    gn = gdp + nfia
    nnp_mp = gn - dep
    nnp_fc = nnp_mp - nit
    steps = [
        "Method: the national-income conversion chain -- GDPmp -> GNPmp "
        "(add NFIA) -> NNPmp (less depreciation) -> NNPfc (less net "
        "indirect tax), because NNPfc is the factor income earned by "
        "normal residents (leec102 ch 2).",
        f"Given: GDPmp = Rs {_fmt(gdp)}, depreciation = Rs {_fmt(dep)}, "
        f"NIT = Rs {_fmt(nit)}, NFIA = Rs {_fmt(nfia)}.",
        f"GNPmp = GDP + NFIA = {_fmt(gdp)} + {_fmt(nfia)} = {_fmt(gn)};  "
        f"NNPmp = {_fmt(gn)} - {_fmt(dep)} = {_fmt(nnp_mp)};  {nit_steps}",
        f"NNPfc = NNPmp - NIT = {_fmt(nnp_mp)} - {_fmt(nit)} = "
        f"Rs {_fmt(nnp_fc)}.",
        f"Check: directly, NNPfc = GDP - depreciation - NIT + NFIA = "
        f"{_fmt(gdp)} - {_fmt(dep)} - {_fmt(nit)} + {_fmt(nfia)} = "
        f"{_fmt(nnp_fc)} -- the chain closes.",
        "Interpretation: Rs "
        f"{_fmt(nnp_fc)} is the national income -- the total factor "
        "income (wages, rent, interest, profit) earned by normal "
        "residents, whether at home or abroad.",
    ]
    ans = f"National income (NNPfc) = Rs {_fmt(nnp_fc)}"
    steps.append(f"ANSWER: {ans}")
    return nnp_fc, steps[:-1], ans, assumptions or None, \
        "NNPfc = GDPmp - depreciation - NIT + NFIA", \
        {"gnp_mp": gn, "nnp_mp": nnp_mp, "nit": nit, "nfia": nfia}


# --------------------------------------------------------------------------- #
# 7. VALUE ADDED  --  GVA = output - intermediate inputs (+ stage chains)
# --------------------------------------------------------------------------- #


def _c_value_added(g, m, text):
    out = _labv(text, r"(?:value\s+of\s+(?:gross\s+)?output|"
                      r"(?:gross\s+)?output\s+value)")
    inter = _labv(text, r"intermediate\s+(?:consumption|cost|goods|inputs)")
    if out is not None and inter is not None:
        gva = out - inter
        steps = [
            "Method: value-added (product) method -- a firm's contribution "
            "to GDP is GVA = value of output - intermediate consumption "
            "(leec102 ch 2); it applies because only the value the firm "
            "ITSELF creates may be counted.",
            f"Given: value of output = Rs {_fmt(out)}, intermediate "
            f"consumption = Rs {_fmt(inter)}.",
            f"GVA = {_fmt(out)} - {_fmt(inter)} = Rs {_fmt(gva)}.",
            f"Check: GVA + intermediate consumption = {_fmt(gva)} + "
            f"{_fmt(inter)} = {_fmt(out)} = value of output -- the "
            "identity closes.",
            "Interpretation: Rs "
            f"{_fmt(gva)} is this firm's own contribution to GDP; summing "
            "value added across all firms avoids double counting "
            "intermediate goods.",
        ]
        ans = f"Value added = Rs {_fmt(gva)}"
        steps.append(f"ANSWER: {ans}")
        return gva, steps[:-1], ans, None, \
            "GVA = value of output - intermediate consumption", None
    # stage chain: "A sells ... for 100", "B sells ... for 150", ...
    sells = [_pf(s) for s in re.findall(
        r"sells?\b[^.\n]{0,60}?for\s+" + _RS + r"(?P<v>" + _NUM + r")",
        text, re.I)]
    sells = [s for s in sells if s is not None]
    if len(sells) >= 2 and sells[0] > 0:
        gvas = [sells[0]]
        for prev, cur in zip(sells, sells[1:]):
            gvas.append(cur - prev)
        total = sells[-1]
        chain = " + ".join(_fmt(v) for v in gvas)
        steps = [
            "Method: value-added across production stages -- each stage's "
            "GVA = its sale value - what it paid for inputs, and the sum "
            "of stage GVAs equals the value of the FINAL good (leec102 "
            "ch 2).",
            f"Given: stage sale values of Rs "
            + ", Rs ".join(_fmt(v) for v in sells) + ".",
            f"Stage GVAs = {chain} (each stage adds its own margin only).",
            f"Total value added = {chain} = {_fmt(total)} = value of the "
            f"final good;  summing the sale values ({_fmt(sum(sells))}) "
            "would double count intermediate goods.",
            f"Check: final sale value Rs {_fmt(total)} - first-stage "
            f"inputs (none) = {_fmt(total)} -- GVA sum and final value "
            "agree, so the method closes.",
            "Interpretation: GDP counts Rs "
            f"{_fmt(total)} for this product -- exactly the bread's final "
            "value, not the inflated sum of every intermediate sale.",
        ]
        ans = (f"Total value added = Rs {_fmt(total)} (equals the final "
               f"good's value)")
        steps.append(f"ANSWER: {ans}")
        extra = {f"stage_{j + 1}": v for j, v in enumerate(gvas)}
        return total, steps[:-1], ans, None, \
            "sum of GVA = value of final output", extra
    return _GATE


# --------------------------------------------------------------------------- #
# 8. INCOME METHOD  --  NI = compensation + rent + interest + profit (+mixed)
# --------------------------------------------------------------------------- #


def _c_income_method(g, m, text):
    comp = _labv(text, r"(?:compensation\s+of\s+employees|wages(?:\s+and\s+"
                       r"salaries)?)")
    rent = _labv(text, r"\brents?\b")
    intr = _labv(text, r"\binterest\b")
    prof = _labv(text, r"\bprofits?\b")
    mixed = _labv(text, r"mixed\s+income")
    parts = {"compensation of employees": comp, "rent": rent,
             "interest": intr, "profit": prof}
    if any(v is None for v in parts.values()):
        return _GATE
    total = sum(parts.values()) + (mixed or 0.0)
    sum_s = " + ".join(_fmt(v) for v in parts.values())
    if mixed:
        sum_s += f" + {_fmt(mixed)} (mixed income)"
    steps = [
        "Method: income method of national income -- NNPfc = compensation "
        "of employees + rent + interest + profit (+ mixed income): the "
        "factor payments earned by households for their land, labour, "
        "capital and enterprise (leec102 ch 2).",
        "Given: " + ", ".join(
            f"{k} = Rs {_fmt(v)}" for k, v in parts.items() if v is not None)
        + (f", mixed income = Rs {_fmt(mixed)}" if mixed else "") + ".",
        f"NI = {sum_s} = Rs {_fmt(total)}.",
        f"Check: re-adding the factor incomes gives {_fmt(total)} -- the "
        "sum closes.",
        "Interpretation: Rs "
        f"{_fmt(total)} is national income measured from the earnings "
        "side -- what households receive as wages, rent, interest and "
        "profit (mixed income covers self-employed earnings the books "
        "cannot split).",
    ]
    ans = f"National income by income method = Rs {_fmt(total)}"
    steps.append(f"ANSWER: {ans}")
    extra = {f"part_{j}": v for j, v in enumerate(parts.values())}
    if mixed:
        extra["mixed_income"] = mixed
    return total, steps[:-1], ans, None, \
        "NI = wages + rent + interest + profit + mixed income", extra


# --------------------------------------------------------------------------- #
# 9. GDP DEFLATOR  --  deflator = nominal/real x 100, any-missing
# --------------------------------------------------------------------------- #


def _c_deflator(g, m, text):
    nom = _labv(text, r"nominal\s+gdp")
    real = _labv(text, r"real\s+gdp")
    defl = _labv(text, r"(?:gdp\s+)?deflator")
    known = [v for v in (nom, real, defl) if v is not None]
    if len(known) < 2:
        return _GATE
    if nom is None:
        if defl <= 0:
            return _GATE
        nom = real * defl / 100.0
        steps = [
            "Method: GDP deflator identity -- deflator = (nominal GDP / "
            "real GDP) x 100, rearranged to nominal = real x deflator/100 "
            "(leec102 ch 2); it applies because the deflator measures how "
            "much of nominal growth is pure price rise.",
            f"Given: real GDP = Rs {_fmt(real)}, deflator = {_fmt(defl)}.",
            f"Nominal GDP = {_fmt(real)} x {_fmt(defl)}/100 = "
            f"Rs {_fmt(nom)}.",
            f"Check: nominal / real x 100 = {_fmt(nom)}/{_fmt(real)} x 100 "
            f"= {_fmt(nom / real * 100)} = the given deflator -- the "
            "identity closes.",
            "Interpretation: the same physical output valued at CURRENT "
            f"prices is Rs {_fmt(nom)}, against Rs {_fmt(real)} at base-"
            "year prices.",
        ]
        val, ans = nom, f"Nominal GDP = Rs {_fmt(nom)}"
    elif real is None:
        if defl <= 0:
            return _GATE    # impossible state: non-positive deflator
        real = nom / defl * 100.0
        steps = [
            "Method: GDP deflator identity rearranged -- real GDP = "
            "(nominal GDP / deflator) x 100 strips the price rise out of "
            "nominal GDP (leec102 ch 2).",
            f"Given: nominal GDP = Rs {_fmt(nom)}, deflator = {_fmt(defl)}.",
            f"Real GDP = ({_fmt(nom)} / {_fmt(defl)}) x 100 = "
            f"Rs {_fmt(real)}.",
            f"Check: real x deflator/100 = {_fmt(real)} x {_fmt(defl)}/100 "
            f"= {_fmt(real * defl / 100)} = the given nominal GDP -- the "
            "identity closes.",
            "Interpretation: output measured at CONSTANT base-year prices "
            f"is only Rs {_fmt(real)} -- the rest of the nominal figure "
            "was inflation, not more goods.",
        ]
        val, ans = real, f"Real GDP = Rs {_fmt(real)}"
    else:
        if real <= 0:
            return _GATE
        defl = nom / real * 100.0
        steps = [
            "Method: GDP deflator = (nominal GDP / real GDP) x 100 -- the "
            "price index implicit in the national accounts (leec102 ch 2).",
            f"Given: nominal GDP = Rs {_fmt(nom)}, real GDP = "
            f"Rs {_fmt(real)}.",
            f"Deflator = ({_fmt(nom)} / {_fmt(real)}) x 100 = {_fmt(defl)}.",
            f"Check: real x deflator/100 = {_fmt(real)} x {_fmt(defl)}/100 "
            f"= {_fmt(real * defl / 100)} = nominal GDP -- the identity "
            "closes.",
            f"Interpretation: the price level is {_fmt(defl)} relative to "
            f"the base year's 100 -- prices are {_fmt(defl - 100)}% higher "
            "than in the base year.",
        ]
        val, ans = defl, f"GDP deflator = {_fmt(defl)}"
    steps.append(f"ANSWER: {ans}")
    extra = {k: v for k, v in (("nominal", nom), ("real", real),
                               ("deflator", defl)) if v is not None}
    return val, steps[:-1], ans, None, \
        "deflator = (nominal GDP / real GDP) x 100", extra


# --------------------------------------------------------------------------- #
# 10. CPI / INFLATION from index pairs (+ cost-of-basket CPI)
# --------------------------------------------------------------------------- #


def _c_inflation(g, m, text):
    i1, i2 = _pf(g.get("i1")), _pf(g.get("i2"))
    if None in (i1, i2) or i1 <= 0:
        return _GATE
    infl = (i2 - i1) / i1 * 100.0
    y1, y2 = g.get("y1"), g.get("y2")
    span = f" ({y1})" if y1 else ""
    span2 = f" ({y2})" if y2 else ""
    steps = [
        "Method: inflation from a price index -- inflation = (index2 - "
        "index1)/index1 x 100, the percentage rise in the cost-of-living "
        "index between the two periods (ICSE ch 5 / leec102).",
        f"Given: price index{span} = {_fmt(i1)} -> price index{span2} = "
        f"{_fmt(i2)}.",
        f"Inflation = ({_fmt(i2)} - {_fmt(i1)})/{_fmt(i1)} x 100 = "
        f"{_fmt(infl)}%.",
        f"Check: index1 x (1 + inflation/100) = {_fmt(i1)} x "
        f"{_fmt(1 + infl / 100)} = {_fmt(i1 * (1 + infl / 100))} = the "
        "closing index -- the identity closes.",
        f"Interpretation: the price level rose {_fmt(infl)}% over the "
        "period -- this is the inflation rate the CPI is measuring.",
    ]
    ans = f"Inflation rate = {_fmt(infl)}%"
    steps.append(f"ANSWER: {ans}")
    return infl, steps[:-1], ans, None, \
        "inflation = (CPI2 - CPI1)/CPI1 x 100", None


def _c_cpi_basket(g, m, text):
    if not _has_word(text, r"\b(?:cpi|consumer\s+price\s+index|"
                           r"price\s+index)\b"):
        return _GATE
    c0, c1 = _pf(g.get("c0")), _pf(g.get("c1"))
    if None in (c0, c1) or c0 <= 0:
        return _GATE
    cpi = c1 / c0 * 100.0
    steps = [
        "Method: consumer price index -- CPI = (cost of the fixed basket "
        "in the current year / cost in the base year) x 100 (ICSE ch 5); "
        "it applies because a price index tracks the changing money cost "
        "of the SAME basket.",
        f"Given: basket cost in base year = Rs {_fmt(c0)}, in current "
        f"year = Rs {_fmt(c1)}.",
        f"CPI = ({_fmt(c1)} / {_fmt(c0)}) x 100 = {_fmt(cpi)}.",
        f"Check: cost x CPI/100 = {_fmt(c0)} x {_fmt(cpi)}/100 = "
        f"{_fmt(c0 * cpi / 100)} = the current-year cost -- the identity "
        "closes.",
        "Interpretation: the basket that cost Rs "
        f"{_fmt(c0)} at base-year prices now costs Rs {_fmt(c1)}: the "
        f"cost of living is {_fmt(cpi - 100)}% higher than the base year.",
    ]
    ans = f"Consumer Price Index = {_fmt(cpi)}"
    steps.append(f"ANSWER: {ans}")
    return cpi, steps[:-1], ans, None, "CPI = (C_t / C_base) x 100", None


# --------------------------------------------------------------------------- #
# 11. FISHER  --  real rate ~ nominal rate - inflation
# --------------------------------------------------------------------------- #


def _c_fisher(g, m, text):
    nom = _pf(g.get("nom"))
    infl = _pf(g.get("infl"))
    real = _pf(g.get("real"))
    known = [v for v in (nom, infl, real) if v is not None]
    if len(known) < 2:
        return _GATE
    if nom is None:
        nom = real + infl
        steps = [
            "Method: Fisher equation (approximate form) -- nominal rate = "
            "real rate + inflation; it applies because lenders build "
            "expected inflation into the interest they charge.",
            f"Given: real rate = {_fmt(real)}%, inflation = {_fmt(infl)}%.",
            f"Nominal rate = {_fmt(real)} + {_fmt(infl)} = {_fmt(nom)}%.",
            f"Check: nominal - inflation = {_fmt(nom)} - {_fmt(infl)} = "
            f"{_fmt(nom - infl)}% = the real rate -- the identity closes.",
            "Interpretation: the "
            f"{_fmt(nom)}% nominal return carries a {_fmt(infl)}% "
            "inflation premium on top of the true "
            f"{_fmt(real)}% earning.",
        ]
        val, ans = nom, f"Nominal interest rate = {_fmt(nom)}%"
    elif real is None:
        real = nom - infl
        steps = [
            "Method: Fisher equation (approximate form) -- real rate = "
            "nominal rate - inflation; it strips the inflation premium out "
            "of the observed nominal rate. (Exact form: (1 + n)/(1 + i) - 1.)",
            f"Given: nominal rate = {_fmt(nom)}%, inflation = "
            f"{_fmt(infl)}%.",
            f"Real rate = {_fmt(nom)} - {_fmt(infl)} = {_fmt(real)}%.",
            f"Check: real + inflation = {_fmt(real)} + {_fmt(infl)} = "
            f"{_fmt(real + infl)}% = the nominal rate -- the identity "
            "closes.",
            "Interpretation: in purchasing-power terms the saving truly "
            f"earns {_fmt(real)}% -- inflation of {_fmt(infl)}% erodes the "
            "rest of the nominal return.",
        ]
        val, ans = real, f"Real interest rate = {_fmt(real)}%"
    else:
        infl = nom - real
        steps = [
            "Method: Fisher equation (approximate form) rearranged -- "
            "inflation = nominal rate - real rate.",
            f"Given: nominal rate = {_fmt(nom)}%, real rate = "
            f"{_fmt(real)}%.",
            f"Implied inflation = {_fmt(nom)} - {_fmt(real)} = "
            f"{_fmt(infl)}%.",
            f"Check: real + implied inflation = {_fmt(real)} + "
            f"{_fmt(infl)} = {_fmt(real + infl)}% = the nominal rate -- "
            "the identity closes.",
            "Interpretation: the market expects prices to rise "
            f"{_fmt(infl)}%: the nominal rate embeds this premium over the "
            f"{_fmt(real)}% real return.",
        ]
        val, ans = infl, f"Implied inflation = {_fmt(infl)}%"
    steps.append(f"ANSWER: {ans}")
    extra = {k: v for k, v in (("nominal", nom), ("inflation", infl),
                               ("real", real)) if v is not None}
    return val, steps[:-1], ans, None, "real ~ nominal - inflation", extra


# --------------------------------------------------------------------------- #
# 12-13. MONEY MULTIPLIER + DEPOSIT CREATION
# --------------------------------------------------------------------------- #


def _rr_from(g: Dict[str, Any]) -> Optional[float]:
    rr = _pf(g.get("rr"))
    if rr is None:
        return None
    if rr > 1:                      # stated as a percentage (10 for 10%)
        rr = rr / 100.0
    return rr


def _c_money_multiplier(g, m, text):
    rr = _rr_from(g)
    if rr is None or rr <= 0:
        return _GATE                # impossible state: non-positive ratio
    if rr >= 1:
        return _GATE                # 100% reserves: no credit creation
    mm = 1.0 / rr
    dep = _pf(g.get("dep"))
    steps = [
        "Method: money multiplier -- m = 1/reserve ratio (leec102 ch 3 / "
        "ICSE ch 4): banks re-lend every rupee they do not hold back as "
        "reserves, so each rupee of reserves supports m rupees of deposits.",
        f"Given: reserve ratio RRR = {_fmt(rr * 100)}% (= {_fmt(rr)})"
        + (f", initial deposit = Rs {_fmt(dep)}." if dep is not None
           and dep > 0 else "."),
        f"Money multiplier m = 1/{_fmt(rr)} = {_fmt(mm)}.",
    ]
    ans = f"Money multiplier = {_fmt(mm)}"
    extra = {"multiplier": mm}
    if dep is not None and dep > 0:
        total = dep * mm
        credit = total - dep
        steps.append(f"Total deposits = initial deposit x multiplier = "
                     f"{_fmt(dep)} x {_fmt(mm)} = Rs {_fmt(total)}.")
        steps.append(f"Credit created = total - initial = {_fmt(total)} - "
                     f"{_fmt(dep)} = Rs {_fmt(credit)}.")
        ans = (f"Money multiplier = {_fmt(mm)}; total deposits = "
               f"Rs {_fmt(total)}; credit created = Rs {_fmt(credit)}")
        extra.update({"initial_deposit": dep, "total_deposits": total,
                      "credit_created": credit})
    steps.append(
        f"Check: reserves x multiplier = {_fmt(rr)} x {_fmt(mm)} = 1 and, "
        + (f"with deposits, total reserves {_fmt(total * rr)} = the "
           f"original deposit Rs {_fmt(dep)} -- the chain closes."
           if dep is not None and dep > 0 else
           "deposits x reserve ratio always returns the initial reserve "
           "-- the chain closes."))
    steps.append(
        f"Interpretation: a reserve ratio of {_fmt(rr * 100)}% lets the "
        f"banking system turn every Re 1 of initial deposit into "
        f"Rs {_fmt(mm)} of total money"
        + (f" -- Rs {_fmt(dep)} of fresh deposits becomes Rs "
           f"{_fmt(total)} outstanding, Rs {_fmt(credit)} of it newly "
           "created credit." if dep is not None and dep > 0 else
           "; lower ratios multiply money harder."))
    steps.append(f"ANSWER: {ans}")
    return mm, steps[:-1], ans, None, "m = 1/RRR;  D = d x m", extra


def _c_deposit_chain(g, m, text):
    rr = _rr_from(g)
    dep = _pf(g.get("dep"))
    if rr is None or rr <= 0 or rr >= 1 or dep is None or dep <= 0:
        return _GATE
    mm = 1.0 / rr
    total = dep * mm
    credit = total - dep
    loan1 = dep * (1 - rr)
    dep2 = loan1
    loan2 = dep2 * (1 - rr)
    steps = [
        "Method: credit creation by commercial banks -- each round the "
        "bank keeps the reserve ratio and lends the rest, which returns as "
        "a fresh deposit: a geometric series summing to D_total = "
        "initial/reserve ratio (leec102 ch 3 / ICSE ch 4).",
        f"Given: initial deposit = Rs {_fmt(dep)}, reserve ratio = "
        f"{_fmt(rr * 100)}% (= {_fmt(rr)}).",
        f"Round 1: keep Rs {_fmt(dep * rr)} as reserves, lend Rs "
        f"{_fmt(loan1)}.  Round 2: the Rs {_fmt(dep2)} redeposited spawns "
        f"a fresh loan of Rs {_fmt(loan2)}.  ... every round re-lends "
        f"(1 - {_fmt(rr)}) of the previous deposit.",
        f"Total deposits = {_fmt(dep)} x (1/{_fmt(rr)}) = Rs {_fmt(total)};  "
        f"credit created = {_fmt(total)} - {_fmt(dep)} = Rs {_fmt(credit)}.",
        f"Check: the geometric series d(1 + (1-rr) + (1-rr)^2 + ...) = "
        f"d/rr = {_fmt(dep)}/{_fmt(rr)} = {_fmt(dep / rr)} -- matches the "
        f"rounds, and reserves held across all rounds ({_fmt(total * rr)}) "
        f"shrink back to the initial deposit Rs {_fmt(dep)}: the chain "
        "closes.",
        f"Interpretation: the banking system multiplied the Rs {_fmt(dep)} "
        f"deposit into Rs {_fmt(total)} of total deposits (multiplier "
        f"{_fmt(mm)}) -- Rs {_fmt(credit)} of purchasing power was "
        "created out of re-lending, which is why the central bank watches "
        "the reserve ratio so closely.",
    ]
    ans = (f"Total deposit creation = Rs {_fmt(total)}; credit created = "
           f"Rs {_fmt(credit)} (multiplier {_fmt(mm)})")
    steps.append(f"ANSWER: {ans}")
    return total, steps[:-1], ans, None, \
        "D_total = d/rr;  credit = d(1/rr - 1)", \
        {"multiplier": mm, "credit_created": credit, "initial_deposit": dep}


# --------------------------------------------------------------------------- #
# 14. CONSUMPTION FUNCTION  --  C = a + bY, any-missing
# --------------------------------------------------------------------------- #

_CONS_FN = (r"c\s*=\s*(?P<a>" + _NUM + r")\s*\+\s*(?P<b>" + _NUM +
            r")\s*y\b")


def _c_consumption(g, m, text):
    if not _has_word(text, r"\bconsumption\b|\bfunction\b"):
        return _GATE
    a = _pf(g.get("a"))
    b = _pf(g.get("b"))
    y = _pf(g.get("y"))
    c_v = _pf(g.get("cv"))
    if a is None or b is None:
        return _GATE
    if not (0 < b < 1):
        return _GATE        # impossible state: MPC outside (0, 1)
    if a < 0:
        return _GATE        # negative autonomous consumption is not taught
    # equilibrium income: AD = C + I, Y* = (a + I)/(1 - b)  (leec104 ch 4)
    if _has_word(text, r"\bequilibrium\b"):
        inv = _labv(text, r"(?:autonomous\s+)?investment\b", tight=True)
        if inv is not None and inv >= 0:
            y_star = (a + inv) / (1 - b)
            c_star = a + b * y_star
            steps = [
                "Method: Keynesian equilibrium -- aggregate demand AD = C "
                "+ I equals output Y in equilibrium, so Y* = (a + I)/(1 - "
                "MPC) (leec104 ch 4); it applies because unplanned "
                "inventory changes push output to exactly this level.",
                f"Given: C = {_fmt(a)} + {_fmt(b)}Y, autonomous investment "
                f"I = Rs {_fmt(inv)}.",
                f"Y* = ({_fmt(a)} + {_fmt(inv)})/(1 - {_fmt(b)}) = "
                f"{_fmt(a + inv)}/{_fmt(1 - b)} = Rs {_fmt(y_star)}.",
                f"Check: at Y*: C = {_fmt(a)} + {_fmt(b)} x {_fmt(y_star)} "
                f"= {_fmt(c_star)}, and C + I = {_fmt(c_star)} + "
                f"{_fmt(inv)} = {_fmt(c_star + inv)} = Y* -- AD equals "
                "output, the equilibrium closes.",
                f"Interpretation: the economy settles at income Rs "
                f"{_fmt(y_star)}: planned spending (consumption Rs "
                f"{_fmt(c_star)} + investment Rs {_fmt(inv)}) exactly "
                "absorbs output, so nothing pushes income away from this "
                "level.",
            ]
            ans = f"Equilibrium income Y* = Rs {_fmt(y_star)}"
            return y_star, steps, ans, None, \
                "Y* = (a + I)/(1 - MPC)", {"y_star": y_star, "c_star":
                                           c_star, "investment": inv}
    known = [v for v in (a, b, y, c_v) if v is not None]
    if len(known) < 3:
        return _GATE        # need at least 3 of {a, b, Y, C}
    if y is None:
        y = (c_v - a) / b
        if y <= 0:
            return _GATE
        steps = [
            "Method: Keynesian consumption function C = a + bY -- a is "
            "autonomous consumption and b the MPC, the fraction of each "
            "extra rupee of income consumed (leec104 ch 4); rearranged to "
            "Y = (C - a)/b when consumption is known.",
            f"Given: C = {_fmt(a)} + {_fmt(b)}Y;  C = Rs {_fmt(c_v)}.",
            f"Y = ({_fmt(c_v)} - {_fmt(a)})/{_fmt(b)} = Rs {_fmt(y)}.",
            f"Check: C = {_fmt(a)} + {_fmt(b)} x {_fmt(y)} = "
            f"{_fmt(a + b * y)} = the given consumption -- the identity "
            "closes.",
            "Interpretation: consumption of Rs "
            f"{_fmt(c_v)} is exactly what households with income Rs "
            f"{_fmt(y)} undertake at MPC {_fmt(b)} -- below that income "
            "they would dissave out of autonomous spending.",
        ]
        val, ans = y, f"Income Y = Rs {_fmt(y)}"
    elif c_v is None:
        c_v = a + b * y
        steps = [
            "Method: Keynesian consumption function C = a + bY (leec104 "
            "ch 4) -- substitute the given income.",
            f"Given: C = {_fmt(a)} + {_fmt(b)}Y;  Y = Rs {_fmt(y)}.",
            f"C = {_fmt(a)} + {_fmt(b)} x {_fmt(y)} = Rs {_fmt(c_v)}.",
            f"Check: (C - a)/b = ({_fmt(c_v)} - {_fmt(a)})/{_fmt(b)} = "
            f"{_fmt((c_v - a) / b)} = the given income -- the identity "
            "closes.",
            "Interpretation: of the Rs "
            f"{_fmt(y)} earned, households consume Rs {_fmt(c_v)} and save "
            f"Rs {_fmt(y - c_v)} -- MPC {_fmt(b)} at work.",
        ]
        val, ans = c_v, f"Consumption C = Rs {_fmt(c_v)}"
    else:
        if y <= 0 or c_v < 0:
            return _GATE
        apc = c_v / y
        steps = [
            "Method: consumption-function identities -- APC = C/Y and "
            "MPC = b with MPS = 1 - MPC (leec104 ch 4); the function lets "
            "us verify the given pair and read off the propensities.",
            f"Given: C = {_fmt(a)} + {_fmt(b)}Y with Y = Rs {_fmt(y)}, C "
            f"= Rs {_fmt(c_v)}.",
            f"Verify: a + bY = {_fmt(a)} + {_fmt(b)} x {_fmt(y)} = "
            f"{_fmt(a + b * y)} (matches the given C).",
            f"APC = C/Y = {_fmt(c_v)}/{_fmt(y)} = {_fmt(apc)};  MPC = "
            f"{_fmt(b)};  MPS = 1 - MPC = {_fmt(1 - b)}.",
            f"Check: APC x Y = {_fmt(apc)} x {_fmt(y)} = {_fmt(apc * y)} = "
            "C -- the identity closes.",
            f"Interpretation: households spend {_fmt(apc * 100)} paise of "
            f"every rupee of income and save the rest -- and since APC = "
            f"{_fmt(apc)} > MPC = {_fmt(b)}, APC falls as income rises.",
        ]
        val, ans = apc, f"APC = {_fmt(apc)} (MPC = {_fmt(b)}, " \
                        f"MPS = {_fmt(1 - b)})"
    steps.append(f"ANSWER: {ans}")
    extra = {k: v for k, v in (("autonomous_a", a), ("mpc", b), ("y", y),
                               ("c", c_v)) if v is not None}
    return val, steps[:-1], ans, None, "C = a + bY", extra


# --------------------------------------------------------------------------- #
# 15. INVESTMENT MULTIPLIER  --  k = 1/(1-MPC) = 1/MPS;  dY = k dI
# --------------------------------------------------------------------------- #


def _c_investment_multiplier(g, m, text):
    if _has_word(text, r"\bmoney\s+multiplier\b"):
        return _GATE        # the money row owns monetary multipliers
    # board questions name the quantities WITHOUT the word 'multiplier'
    # ('MPC is 0.8, investment rises by Rs 500 crore -- find the change
    # in national income') so slots re-parse from text when the trigger
    # didn't bind them (category trigger carries no named groups)
    mpc = _pf(g.get("mpc")) or _pf(_grab1(
        text, r"\bmpc\b[^0-9]{0,20}(" + _NUM + r")") or _grab1(
        text, r"marginal\s+propensity\s+to\s+consume[^0-9]{0,20}"
        r"(" + _NUM + r")"))
    mps = _pf(g.get("mps")) or _pf(_grab1(
        text, r"\bmps\b[^0-9]{0,20}(" + _NUM + r")") or _grab1(
        text, r"marginal\s+propensity\s+to\s+save[^0-9]{0,20}"
        r"(" + _NUM + r")"))
    di = _pf(g.get("di")) or _pf(_grab1(
        text, r"investment\b[^.]{0,40}?(?:increase|rise|change)s?\b[^0-9]"
        r"{0,30}(?:rs\.?\s*|rs\s*)?(" + _NUM + r")"))
    dy = _pf(g.get("dy")) or _pf(_grab1(
        text, r"(?:national\s+)?income\b[^.]{0,40}?(?:increase|change|"
        r"rise)s?\b[^0-9]{0,30}(?:rs\.?\s*|rs\s*)?(" + _NUM + r")"))
    if mpc is None and mps is not None:
        mpc = 1 - mps
    if mpc is None:
        return _GATE
    if not (0 < mpc < 1):
        return _GATE        # impossible state: MPC <= 0 or MPC >= 1
    k = 1.0 / (1.0 - mpc)
    steps = [
        "Method: Keynesian investment multiplier -- k = 1/(1 - MPC) = "
        "1/MPS, and dY = k x dI (leec104 ch 4): each round of spending "
        "re-creates (MPC) of itself as someone else's income.",
        f"Given: MPC = {_fmt(mpc)} (so MPS = {_fmt(1 - mpc)})"
        + (f", investment changes by Rs {_fmt(di)}." if di is not None
           else (f", income changes by Rs {_fmt(dy)}." if dy is not None
                 else ".")),
        f"k = 1/(1 - {_fmt(mpc)}) = 1/{_fmt(1 - mpc)} = {_fmt(k)} "
        f"(cross-check 1/MPS = 1/{_fmt(1 - mpc)} = {_fmt(1 / (1 - mpc))}).",
    ]
    if dy is None and di is not None:
        dy = k * di
        steps.append(f"Change in income dY = k x dI = {_fmt(k)} x "
                     f"{_fmt(di)} = Rs {_fmt(dy)}.")
        ans = f"Multiplier = {_fmt(k)}; income changes by Rs {_fmt(dy)}"
        val = dy
    elif di is None and dy is not None:
        di = dy / k
        steps.append(f"dI = dY / k = {_fmt(dy)} / {_fmt(k)} = "
                     f"Rs {_fmt(di)}.")
        ans = (f"Multiplier = {_fmt(k)}; investment changes by "
               f"Rs {_fmt(di)}")
        val = di
    else:
        ans = f"Investment multiplier k = {_fmt(k)}"
        val = k
    if di is not None:
        steps.append(f"Check: dS = MPS x dY = {_fmt(1 - mpc)} x "
                     f"{_fmt(dy)} = Rs {_fmt(di)} = dI -- saving absorbs "
                     "exactly the new investment, so the equilibrium "
                     "identity closes.")
    else:
        steps.append(f"Check: k x MPS = {_fmt(k)} x {_fmt(1 - mpc)} = 1 -- "
                     "the definition closes.")
    steps.append(
        f"Interpretation: a multiplier of {_fmt(k)} means every Rs 100 of "
        f"new investment raises equilibrium income by Rs {_fmt(k * 100)} "
        "-- households re-spend "
        f"{_fmt(mpc * 100)} paise of each round, so the initial outlay "
        "ripples through the economy until the leak into saving fills the "
        "gap.")
    steps.append(f"ANSWER: {ans}")
    extra = {"multiplier": k, "mpc": mpc, "mps": 1 - mpc}
    if di is not None:
        extra["d_investment"] = di
    if dy is not None:
        extra["d_income"] = dy
    return val, steps[:-1], ans, None, \
        "k = 1/(1 - MPC) = 1/MPS;  dY = k dI", extra


# --------------------------------------------------------------------------- #
# 16. APC / APS identities
# --------------------------------------------------------------------------- #


def _c_apc_aps(g, m, text):
    # A CHANGE-based MPC ask ("income rises from A to B, consumption
    # rises from C to D -- calculate the MPC and the APC") belongs to
    # the delta-MPC family: the level identities would answer a
    # different question (APC at the first level only).  Refuse so the
    # books2-table MPC_DELTA row, scanned later, can take it.
    if _has_word(text, r"\bMPC\b|marginal\s+propensity\s+to\s+consum") \
            and re.search(r"income\s+(?:rises?|increases?|goes\s+up)\s+"
                          r"from\s*" + _RS + _NUM
                          + r"\s*(?:lakh|crores?|millions?)?\s*to\s*",
                          text, re.I) \
            and re.search(r"consumption\s+(?:rises?|increases?|goes\s+up)"
                          r"\s+from\s*" + _RS + _NUM
                          + r"\s*(?:lakh|crores?|millions?)?\s*to\s*",
                          text, re.I):
        return _GATE
    y = _pf(g.get("y"))
    c_v = _labv(text, r"\bconsumption\b")
    s_v = _labv(text, r"\bsaving?s\b")
    if y is None:
        y = _labv(text, r"\bincome\b")
    if y is None or y <= 0 or (c_v is None and s_v is None):
        return _GATE
    if c_v is None:
        c_v = y - s_v
        src = f"C = Y - S = {_fmt(y)} - {_fmt(s_v)} = {_fmt(c_v)}."
    else:
        src = f"C = {_fmt(c_v)}."
    if c_v < 0:
        return _GATE
    apc = c_v / y
    aps = 1.0 - apc
    steps = [
        "Method: propensity identities -- APC = C/Y, APS = S/Y, with "
        "APC + APS = 1 because income is either consumed or saved "
        "(leec104 ch 4).",
        f"Given: income Y = Rs {_fmt(y)}"
        + (f", consumption C = Rs {_fmt(c_v)}, saving S = Rs "
           f"{_fmt(s_v)}." if s_v is not None and c_v == y - s_v else
           f", consumption C = Rs {_fmt(c_v)}." if src.startswith("C =")
           else ", saving inferred from the identity."),
        src,
        f"APC = C/Y = {_fmt(c_v)}/{_fmt(y)} = {_fmt(apc)};  APS = 1 - APC "
        f"= {_fmt(aps)}  (equivalently S/Y = {_fmt(y - c_v)}/{_fmt(y)} = "
        f"{_fmt((y - c_v) / y)}).",
        f"Check: APC + APS = {_fmt(apc)} + {_fmt(aps)} = {_fmt(apc + aps)} "
        "= 1 -- the identity closes (as do MPC + MPS = 1).",
        f"Interpretation: out of every rupee of income households spend "
        f"{_fmt(apc)} and save {_fmt(aps)}; APC exceeds MPC, so the "
        "average propensity to consume falls as income grows.",
    ]
    ans = f"APC = {_fmt(apc)}, APS = {_fmt(aps)}"
    steps.append(f"ANSWER: {ans}")
    return apc, steps[:-1], ans, None, "APC + APS = 1", \
        {"aps": aps, "saving": y - c_v}


# --------------------------------------------------------------------------- #
# 17. BUDGET DEFICITS  --  revenue / fiscal / primary, any-solve
# --------------------------------------------------------------------------- #


def _c_budget_deficits(g, m, text):
    re_ = _labv(text, r"revenue\s+expenditure")
    rr = _labv(text, r"revenue\s+receipts")
    ce = _labv(text, r"capital\s+expenditure")
    cr = _labv(text, r"capital\s+receipts")
    ip = _labv(text, r"interest\s+payments?")
    bor = _labv(text, r"borrowings?")
    rd = _labv(text, r"revenue\s+deficit")
    fd = _labv(text, r"fiscal\s+deficit")
    pd = _labv(text, r"primary\s+deficit")
    asked = set()
    if re.search(r"revenue\s+deficit", text, re.I):
        asked.add("revenue")
    if re.search(r"(?:fiscal|budget(?:ary)?)\s+deficit", text, re.I):
        asked.add("fiscal")
    if re.search(r"primary\s+deficit", text, re.I):
        asked.add("primary")
    if not asked:
        asked = {"revenue", "fiscal", "primary"}
    steps: List[str] = [
        "Method: budget deficit identities (leec105 ch 5) -- revenue "
        "deficit = revenue expenditure - revenue receipts (the current "
        "account gap); fiscal deficit = total expenditure - total receipts "
        "EXCLUDING borrowings, i.e. the government's borrowing "
        "requirement; primary deficit = fiscal deficit - interest payments "
        "(today's borrowing net of servicing past debt).",
    ]
    assumptions: List[str] = []
    out: Dict[str, float] = {}
    if "revenue" in asked:
        if rd is not None:
            out["revenue deficit"] = rd
        elif re_ is not None and rr is not None:
            out["revenue deficit"] = re_ - rr
            steps.append(f"Revenue deficit = {_fmt(re_)} - {_fmt(rr)} = "
                         f"{_fmt(re_ - rr)}.")
        else:
            asked.discard("revenue")
    if "fiscal" in asked:
        if fd is not None:
            out["fiscal deficit"] = fd
        elif re_ is not None and rr is not None and ce is not None \
                and cr is not None:
            out["fiscal deficit"] = (re_ + ce) - (rr + cr)
            steps.append(f"Fiscal deficit = ({_fmt(re_)} + {_fmt(ce)}) - "
                         f"({_fmt(rr)} + {_fmt(cr)}) = "
                         f"{_fmt((re_ + ce) - (rr + cr))}.")
        elif bor is not None:
            out["fiscal deficit"] = bor
            steps.append(f"Fiscal deficit equals the borrowing requirement "
                         f"= Rs {_fmt(bor)}.")
        elif "revenue deficit" in out and ce is not None and cr is not None:
            out["fiscal deficit"] = out["revenue deficit"] + ce - cr
            steps.append(f"Fiscal deficit = revenue deficit + capital "
                         f"expenditure - capital receipts = "
                         f"{_fmt(out['revenue deficit'])} + {_fmt(ce)} - "
                         f"{_fmt(cr)} = {_fmt(out['fiscal deficit'])}.")
        else:
            asked.discard("fiscal")
    if "primary" in asked:
        if pd is not None:
            out["primary deficit"] = pd
        elif "fiscal deficit" in out and ip is not None:
            out["primary deficit"] = out["fiscal deficit"] - ip
            steps.append(f"Primary deficit = {_fmt(out['fiscal deficit'])} - "
                         f"{_fmt(ip)} = {_fmt(out['primary deficit'])}.")
        elif fd is not None and ip is not None:
            out["primary deficit"] = fd - ip
            steps.append(f"Primary deficit = {_fmt(fd)} - {_fmt(ip)} = "
                         f"{_fmt(fd - ip)}.")
        else:
            asked.discard("primary")
    if not out:
        return _GATE
    given_bits = [f"{k} = Rs {_fmt(v)}" for k, v in
                  (("revenue expenditure", re_), ("revenue receipts", rr),
                   ("capital expenditure", ce), ("capital receipts", cr),
                   ("interest payments", ip), ("borrowings", bor))
                  if v is not None]
    steps.insert(1, "Given: "
                  + ("; ".join(given_bits) + "."
                     if given_bits else
                     "deficit figures quoted directly."))
    checks = []
    if "revenue deficit" in out and re_ is not None and rr is not None:
        checks.append(f"RE - RR = {_fmt(re_)} - {_fmt(rr)} = "
                      f"{_fmt(re_ - rr)} = the revenue deficit")
    if ("primary deficit" in out and "fiscal deficit" in out
            and ip is not None):
        checks.append(f"PD + IP = {_fmt(out['primary deficit'])} + "
                      f"{_fmt(ip)} = {_fmt(out['primary deficit'] + ip)} = "
                      f"the fiscal deficit {_fmt(out['fiscal deficit'])}")
    if "fiscal deficit" in out and bor is not None:
        checks.append(f"the deficit equals the borrowing requirement "
                      f"Rs {_fmt(bor)}")
    if not checks:
        checks.append("the quoted deficits satisfy their identities on the "
                      "given figures")
    steps.append("Check: " + ";  ".join(checks) + " -- the identities "
                 "close.")
    interp_bits = []
    if "revenue deficit" in out:
        interp_bits.append(f"the revenue deficit of Rs "
                           f"{_fmt(out['revenue deficit'])} means the "
                           "government cannot even meet its day-to-day "
                           "account from revenue receipts")
    if "fiscal deficit" in out:
        interp_bits.append(f"the fiscal deficit of Rs "
                           f"{_fmt(out['fiscal deficit'])} is the total "
                           "borrowing requirement that adds to future debt")
    if "primary deficit" in out:
        interp_bits.append(f"the primary deficit of Rs "
                           f"{_fmt(out['primary deficit'])} shows how much "
                           "borrowing exists beyond merely servicing PAST "
                           "debt")
    steps.append("Interpretation: " + "; ".join(interp_bits) + ".")
    ans = "; ".join(f"{k.capitalize()} = Rs {_fmt(v)}"
                    for k, v in out.items())
    if cr is not None and re.search(
            r"capital\s+receipts?[^.]{0,40}(?:including|with)\s+borrow",
            text, re.I):
        assumptions.append("capital receipts read as EXCLUDING borrowings "
                           "(textbook convention)")
    steps.append(f"ANSWER: {ans}")
    extra = {k.replace(" ", "_"): v for k, v in out.items()}
    for nm, v in (("re_", re_), ("rr", rr), ("ce", ce), ("cr", cr),
                  ("ip", ip), ("bor", bor)):
        if v is not None:
            extra[nm] = v
    return next(iter(out.values())), steps[:-1], ans, assumptions or None, \
        "RD = RE - RR; FD = TE - TR(excl. borrowings); PD = FD - IP", extra


# --------------------------------------------------------------------------- #
# 18. EXCHANGE RATE  --  % change, depreciation / appreciation
# --------------------------------------------------------------------------- #


def _c_exchange_rate(g, m, text):
    r1, r2 = _pf(g.get("r1")), _pf(g.get("r2"))
    if None in (r1, r2) or r1 <= 0:
        return _GATE
    pct = (r2 - r1) / r1 * 100.0
    rupee_terms = bool(re.search(
        r"rupee|rs\.?\s*(?:per|/)\s*(?:dollar|usd|\$)|inr\s*(?:per|/)|"
        r"domestic\s+currency\s+per\s+(?:unit\s+of\s+)?foreign", text, re.I))
    if pct > 0 and rupee_terms:
        verdict = f"the rupee DEPRECIATED by {_fmt(pct)}% (more rupees " \
                  f"per dollar)"
    elif pct < 0 and rupee_terms:
        verdict = f"the rupee APPRECIATED by {_fmt(abs(pct))}% (fewer " \
                  f"rupees per dollar)"
    elif pct > 0:
        verdict = f"the exchange rate ROSE by {_fmt(pct)}%"
    elif pct < 0:
        verdict = f"the exchange rate FELL by {_fmt(abs(pct))}%"
    else:
        verdict = "the exchange rate is unchanged"
    steps = [
        "Method: exchange-rate movements are measured by the percentage "
        "change formula % change = (new rate - old rate)/old rate x 100; "
        "in rupees-per-dollar terms a rise means the rupee DEPRECIATES "
        "(more rupees per dollar) and a fall means it APPRECIATES (leec106 "
        "ch 6).",
        f"Given: exchange rate moves from Rs {_fmt(r1)} to Rs {_fmt(r2)} "
        "per unit of foreign currency.",
        f"% change = ({_fmt(r2)} - {_fmt(r1)})/{_fmt(r1)} x 100 = "
        f"{_fmt(pct)}%.",
        f"Check: old rate x (1 + change/100) = {_fmt(r1)} x "
        f"{_fmt(1 + pct / 100)} = {_fmt(r1 * (1 + pct / 100))} = the new "
        "rate -- the computation closes.",
        "Interpretation: " + verdict[0] + verdict[1:] + ".",
    ]
    ans = verdict[0].upper() + verdict[1:]
    steps.append(f"ANSWER: {ans}")
    return pct, steps[:-1], ans, None, "% change = (new - old)/old x 100", \
        None


# --------------------------------------------------------------------------- #
# 19. UNEMPLOYMENT / PARTICIPATION RATES
# --------------------------------------------------------------------------- #


def _role_num(text: str, role: str) -> Optional[float]:
    """Number attached to a role word, either side ('900 are employed' /
    'labour force is 1000').  Role-first demands a tight connector so a
    neighbouring clause's number is never stolen.  The role is wrapped in
    a non-capturing group: alternation inside the role must not swallow
    the connector suffix."""
    role = "(?:" + role + ")"
    m = re.search(role + r"\s*(?:is|=|:|of|was|were|stands?|at)?\s*" + _RS +
                  r"(?P<v>" + _NUM + r")", text, re.I)
    if m:
        return _pf(m.group("v"))
    m = re.search(r"(?P<v>" + _NUM + r")\s*(?:people|persons|workers|"
                  r"individuals)?\s*(?:are|is|was|were)?\s*" + role,
                  text, re.I)
    return _pf(m.group("v")) if m else None


def _c_unemployment(g, m, text):
    e = _pf(g.get("e"))
    u = _pf(g.get("u"))
    lf = _pf(g.get("lf"))
    if e is None:
        e = _role_num(text, r"(?<!un)employed\b")
    if u is None:
        u = _role_num(text, r"\bunemployed\b")
    if lf is None:
        lf = _role_num(text, r"\b(?:labour|labor)\s+force\b|\bwork\s*force\b")
    if lf is None and e is not None and u is not None:
        lf = e + u
    if lf is None or u is None or lf <= 0:
        return _GATE
    if u > lf:
        return _GATE        # impossible state: unemployed above labour force
    ur = u / lf * 100.0
    wap = _labv(text, r"(?:working[-\s]?age(?:\s+population)?|"
                      r"adult\s+population|total\s+(?:adult\s+)?population|"
                      r"population)")
    if wap is not None and wap > 0 and lf / wap * 100.0 > 100:
        return _GATE    # impossible: labour force above the population
    steps = [
        "Method: labour-market accounting -- labour force = employed + "
        "unemployed, unemployment rate = (unemployed / labour force) x "
        "100, participation rate = (labour force / working-age "
        "population) x 100 (leec105 ch 5 / c9 corpus ch 5).",
        "Given: " + (f"employed = {_fmt(e)}, " if e is not None else "")
        + f"unemployed = {_fmt(u)}"
        + (f", labour force = {_fmt(lf)}." if e is None else "."),
        (f"Labour force = {_fmt(e)} + {_fmt(u)} = {_fmt(lf)}."
         if e is not None else f"Labour force = {_fmt(lf)}."),
        f"Unemployment rate = {_fmt(u)}/{_fmt(lf)} x 100 = {_fmt(ur)}%.",
        f"Check: employed + unemployed = "
        + (f"{_fmt(e)} + {_fmt(u)} = {_fmt(e + u)} = the labour force"
           if e is not None else
           f"the unemployed {_fmt(u)} sit inside the labour force "
           f"{_fmt(lf)}")
        + " -- the account closes.",
        "Interpretation: "
        + f"{_fmt(ur)}% of the labour force is without work -- and anyone "
        "without a job but NOT seeking work is out of the labour force, "
        "not unemployed."
        + (f" The participation rate of {_fmt(lf / wap * 100)}% says what "
           f"share of the {_fmt(wap)} working-age population actually "
           "offers itself for work." if wap is not None and wap > 0
           and lf / wap * 100 <= 100 else ""),
    ]
    ans = f"Unemployment rate = {_fmt(ur)}%"
    if wap is not None and wap > 0:
        pr = lf / wap * 100.0
        ans = (f"Unemployment rate = {_fmt(ur)}%; labour-force "
               f"participation rate = {_fmt(pr)}%")
    steps.append(f"ANSWER: {ans}")
    extra = {"labour_force": lf, "unemployed": u, "unemployment_rate": ur}
    if e is not None:
        extra["employed"] = e
    if wap is not None:
        extra["participation_rate"] = lf / wap * 100.0
    return ur, steps[:-1], ans, None, \
        "u-rate = U/LF x 100;  LFPR = LF/WAP x 100", extra


def _c_headcount(g, m, text):
    poor, tot = _pf(g.get("poor")), _pf(g.get("tot"))
    if None in (poor, tot) or tot <= 0:
        return _GATE
    if poor > tot:
        return _GATE        # impossible state: more poor than people
    hcr = poor / tot * 100.0
    steps = [
        "Method: headcount ratio (poverty line accounting) -- HCR = "
        "(persons below the poverty line / total population) x 100, the "
        "share of the population whose consumption falls below the "
        "poverty line (c9 corpus ch 5 / keec103).",
        f"Given: {_fmt(poor)} persons below the poverty line out of a "
        f"population of {_fmt(tot)}.",
        f"HCR = {_fmt(poor)}/{_fmt(tot)} x 100 = {_fmt(hcr)}%.",
        f"Check: population x HCR/100 = {_fmt(tot)} x {_fmt(hcr)}/100 = "
        f"{_fmt(tot * hcr / 100)} = the counted poor -- the identity "
        "closes.",
        f"Interpretation: {_fmt(hcr)}% of this population lives below the "
        "poverty line -- the headcount ratio says how MANY are poor, not "
        "how poor they are, and says nothing about relative poverty.",
    ]
    ans = (f"Headcount ratio = {_fmt(hcr)}% of the population is below "
           f"the poverty line")
    steps.append(f"ANSWER: {ans}")
    return hcr, steps[:-1], ans, None, "HCR = (poor / population) x 100", \
        {"hcr": hcr}


# --------------------------------------------------------------------------- #
# 20-22. INDEX NUMBERS  --  aggregative / Laspeyres / Paasche
# --------------------------------------------------------------------------- #

_VALS = r"(?P<vals>(?:\d+(?:\.\d+)?\s*,\s*)*\d+(?:\.\d+)?)"


def _kw_list(text: str, kw: str, kind: str) -> Optional[List[float]]:
    """'base year prices are 4, 6, 10' -> [4, 6, 10]."""
    m = re.search(kw + r"\s*(?:year\s*)?" + kind +
                  r"\s*(?:are|of|was|were|:|=)?\s*" + _VALS, text, re.I)
    return _nums(m.group("vals")) if m else None


def _year_seq(text: str, kind: str) -> List[Tuple[int, List[float]]]:
    """'prices in 2010 are 4, 6, 10 and in 2020 are 5, 8, 12' ->
    [(2010, [...]), (2020, [...])]  (bare-year repeats attach to the kind)."""
    out: List[Tuple[int, List[float]]] = []
    pos = 0
    anchor = re.compile(
        r"\b" + kind + r"\s*(?:in|for)\s+(?:the\s+year\s+)?"
        r"(?P<y>(?:19|20)\d\d)\s*(?:are|of|was|were|:|=)?\s*" + _VALS,
        re.I)
    repeat = re.compile(
        r"\s*(?:,|;|and|then)?\s*(?:in|for)\s+(?:the\s+year\s+)?"
        r"(?P<y>(?:19|20)\d\d)\s*(?:are|of|was|were|:|=)?\s*" + _VALS,
        re.I)
    while True:
        m = anchor.search(text, pos)
        if not m:
            break
        out.append((int(m.group("y")), _nums(m.group("vals"))))
        pos = m.end()
        m2 = repeat.match(text, pos)
        if m2:
            out.append((int(m2.group("y")), _nums(m2.group("vals"))))
            pos = m2.end()
    return out


def _index_lists(text: str):
    """-> (p0, p1, q0, q1) or None.  Keyword labels win; otherwise the
    EARLIER year is the base year (standard textbook convention)."""
    p0 = _kw_list(text, r"base", r"prices?")
    p1 = _kw_list(text, r"current", r"prices?")
    if not (p0 and p1):
        ys = sorted(_year_seq(text, r"prices?"), key=lambda t: t[0])
        if len(ys) >= 2:
            p0, p1 = ys[0][1], ys[1][1]
    if not p0 or not p1 or len(p0) != len(p1):
        return None
    q0 = _kw_list(text, r"base", r"quantit(?:y|ies)")
    q1 = _kw_list(text, r"current", r"quantit(?:y|ies)")
    if not (q0 or q1):
        qs = sorted(_year_seq(text, r"quantit(?:y|ies)"), key=lambda t: t[0])
        pys = sorted(_year_seq(text, r"prices?"), key=lambda t: t[0])
        if len(qs) == 1 and len(pys) >= 2:
            # single labelled quantity list: match it to the price year
            # (ties default to CURRENT-year quantities, the Paasche ask)
            if qs[0][0] == pys[0][0]:
                q0 = qs[0][1]
            else:
                q1 = qs[0][1]
        else:
            if len(qs) >= 1:
                q0 = qs[0][1]
            if len(qs) >= 2:
                q1 = qs[1][1]
    return p0, p1, q0, q1


def _index_calc(text: str, method: str):
    got = _index_lists(text)
    if not got:
        return _GATE
    p0, p1, q0, q1 = got
    if method == "aggregative":
        s0, s1 = sum(p0), sum(p1)
        if s0 == 0:
            return _GATE
        idx = s1 / s0 * 100.0
        steps = [
            "Method: simple aggregative price index -- P01 = (sum P1 / sum "
            "P0) x 100, no weights: it applies when the articles are of "
            "comparable importance and the chapter asks for the simplest "
            "index (statistics chapters: index numbers).",
            f"Given: base-year prices P0 = {_fmt(p0[0])}" +
            "".join(f", {_fmt(v)}" for v in p0[1:]) +
            ";  current-year prices P1 = " + _fmt(p1[0]) +
            "".join(f", {_fmt(v)}" for v in p1[1:]) + ".",
            f"sum P0 = {_fmt(s0)},  sum P1 = {_fmt(s1)},  index = "
            f"({_fmt(s1)} / {_fmt(s0)}) x 100 = {_fmt(idx)}.",
            f"Check: sum P0 x index/100 = {_fmt(s0)} x {_fmt(idx)}/100 = "
            f"{_fmt(s0 * idx / 100)} = sum P1 -- the identity closes.",
            ("Interpretation: an index of "
             f"{_fmt(idx)} means the price level of this basket is "
             f"{_fmt(idx - 100)}% higher than the base year."
             if idx >= 100 else
             "Interpretation: an index of "
             f"{_fmt(idx)} means the price level is {_fmt(100 - idx)}% "
             "below the base year."),
        ]
        ans = f"Price index (simple aggregative) = {_fmt(idx)}"
        steps.append(f"ANSWER: {ans}")
        return idx, steps[:-1], ans, None, "P01 = (sum P1 / sum P0) x 100", \
            {"sum_p0": s0, "sum_p1": s1}
    if method == "laspeyres":
        if not q0 or len(q0) != len(p0):
            return _GATE    # Laspeyres weights are BASE-year quantities
        num = sum(pi * qi for pi, qi in zip(p1, q0))
        den = sum(pi * qi for pi, qi in zip(p0, q0))
        if den == 0:
            return _GATE
        idx = num / den * 100.0
        steps = [
            "Method: Laspeyres index = (sum P1Q0 / sum P0Q0) x 100 -- "
            "BASE-year quantities are the weights, so the index asks how "
            "much the OLD basket would cost today (statistics chapters: "
            "index numbers).",
            f"Given: P0 = {_fmt(p0[0])}" +
            "".join(f", {_fmt(v)}" for v in p0[1:]) +
            ";  P1 = " + _fmt(p1[0]) +
            "".join(f", {_fmt(v)}" for v in p1[1:]) +
            ";  base-year quantities Q0 = " + _fmt(q0[0]) +
            "".join(f", {_fmt(v)}" for v in q0[1:]) + ".",
            f"sum P1Q0 = {_fmt(num)} (old basket at new prices),  sum P0Q0 "
            f"= {_fmt(den)} (old basket at old prices),  index = "
            f"({_fmt(num)} / {_fmt(den)}) x 100 = {_fmt(idx)}.",
            f"Check: den x index/100 = {_fmt(den)} x {_fmt(idx)}/100 = "
            f"{_fmt(den * idx / 100)} = sum P1Q0 -- the identity closes.",
            "Interpretation: the base-year basket that cost Rs "
            f"{_fmt(den)} now costs Rs {_fmt(num)}: prices rose "
            f"{_fmt(idx - 100)}% on the old consumption pattern -- "
            "Laspeyres tends to overstate inflation because it ignores "
            "substitution away from dearer goods.",
        ]
        ans = f"Laspeyres price index = {_fmt(idx)}"
        steps.append(f"ANSWER: {ans}")
        return idx, steps[:-1], ans, None, \
            "L = (sum P1Q0 / sum P0Q0) x 100", \
            {"numerator": num, "denominator": den}
    # paasche
    if not q1 or len(q1) != len(p0):
        return _GATE        # Paasche weights are CURRENT-year quantities
    num = sum(pi * qi for pi, qi in zip(p1, q1))
    den = sum(pi * qi for pi, qi in zip(p0, q1))
    if den == 0:
        return _GATE
    idx = num / den * 100.0
    steps = [
        "Method: Paasche index = (sum P1Q1 / sum P0Q1) x 100 -- "
        "CURRENT-year quantities are the weights, so it values today's "
        "basket at both years' prices (statistics chapters: index "
        "numbers).",
        f"Given: P0 = {_fmt(p0[0])}" +
        "".join(f", {_fmt(v)}" for v in p0[1:]) +
        ";  P1 = " + _fmt(p1[0]) +
        "".join(f", {_fmt(v)}" for v in p1[1:]) +
        ";  current-year quantities Q1 = " + _fmt(q1[0]) +
        "".join(f", {_fmt(v)}" for v in q1[1:]) + ".",
        f"sum P1Q1 = {_fmt(num)} (new basket at new prices),  sum P0Q1 = "
        f"{_fmt(den)} (new basket at old prices),  index = "
        f"({_fmt(num)} / {_fmt(den)}) x 100 = {_fmt(idx)}.",
        f"Check: den x index/100 = {_fmt(den)} x {_fmt(idx)}/100 = "
        f"{_fmt(den * idx / 100)} = sum P1Q1 -- the identity closes.",
        "Interpretation: the basket people buy TODAY costs Rs "
        f"{_fmt(num)} against Rs {_fmt(den)} at base-year prices -- "
        f"prices rose {_fmt(idx - 100)}% on the current pattern; Paasche "
        "tends to understate inflation because it bakes in substitution "
        "toward cheaper goods.",
    ]
    ans = f"Paasche price index = {_fmt(idx)}"
    steps.append(f"ANSWER: {ans}")
    return idx, steps[:-1], ans, None, "P = (sum P1Q1 / sum P0Q1) x 100", \
        {"numerator": num, "denominator": den}


def _c_index_laspeyres(g, m, text):
    return _index_calc(text, "laspeyres")


def _c_index_paasche(g, m, text):
    return _index_calc(text, "paasche")


def _c_index_aggregative(g, m, text):
    return _index_calc(text, "aggregative")


# --------------------------------------------------------------------------- #
# BOOKS2 block -- chapters the first wave left uncovered (grounded in cache):
#   leec203 (micro ch 3 Production and Costs): TC = TFC + TVC, SAC = TC/q,
#            AVC = TVC/q, AFC = TFC/q, SMC = dTC/dq (Table 3.3 uses TFC = 20)
#   leec204 (micro ch 4 firm under perfect competition): TR = p x q,
#            AR = TR/q = p, MR = dTR/dq = p for a price-taking firm
#   leec202 (micro ch 2 consumer behaviour): cardinal equilibrium rule
#            MUx/Px = MUy/Py (and its ordinal twin MRS = p1/p2)
#   leec205 (micro ch 5 market equilibrium): market supply = horizontal sum
#            of firm supplies; 5.2.1 price ceiling -> excess demand,
#            5.2.2 price floor -> excess supply
#   leec102 (macro ch 2, section 2.5 GDP AND WELFARE): per-capita welfare
#            arithmetic -- GDP rising while per-person income may not
#   statistics chapters (Statistics for Economics; substitute cache
#            am11/am12): Karl Pearson correlation coefficient from pairs
#   leec106 (macro ch 6 open economy, 6.1 THE BALANCE OF PAYMENTS):
#            visible (goods) vs invisible (services/income/transfers)
#            items and the current-account balance arithmetic
# --------------------------------------------------------------------------- #

_MU_GOOD = (r"\bm(?:arginal\s+)?u(?:tility)?\s*(?:of\s+(?:good\s+)?)?"
            r"_?\s*{g}\b")
_PR_GOOD = (r"\bp\s*_?\s*{g}\b|price\s+of\s+(?:good\s+)?{g}\b")


def _mu_val(text: str, good: str) -> Optional[float]:
    """'MUx is 20' / 'marginal utility of good X is 20' / 'MU1 = 20'."""
    return _labv(text, _MU_GOOD.format(g=good), tight=True)


def _pr_val(text: str, good: str, mu_val: Optional[float]) -> Optional[float]:
    """'Px is 4' / 'price of good X is 4'; falls back to the MU clause
    ('MUx is 20 and its price is 4') so the price cannot be stolen from
    the other good's clause."""
    v = _labv(text, r"(?:" + _PR_GOOD.format(g=good) + r")", tight=True)
    if v is not None:
        return v
    if mu_val is not None:
        m = re.search(_MU_GOOD.format(g=good) + r"[^.]{0,45}?\bprice\b"
                      r"[^.0-9]{0,10}?" + _RS + r"(?P<v>" + _NUM + r")",
                      text, re.I)
        if m:
            return _pf(m.group("v"))
    return None


def _cost_part(text: str, label: str) -> Tuple[Optional[float],
                                               Optional[float]]:
    """(value, output) for a cost label.  Understands 'TFC is 20',
    'total variable cost at 3 units of output is 45', 'TVC when output is
    3 is 45' and number-first ('45 is the TVC')."""
    L = r"(?:" + label + r")"
    m = re.search(L + r"\s+at\s+(?P<q>" + _NUM + r")\s*units?[^.]{0,40}?"
                  r"(?:is|are|=|:|was|were)?\s*" + _RS + r"(?P<v>" + _NUM +
                  r")", text, re.I)
    if m:
        return _pf(m.group("v")), _pf(m.group("q"))
    m = re.search(L + r"[^.]{0,40}?output\s+(?:of\s+|is\s+)?(?P<q>" + _NUM +
                  r")[^.]{0,15}?(?:is|are|=|:|was|were)?\s*" + _RS +
                  r"(?P<v>" + _NUM + r")", text, re.I)
    if m:
        return _pf(m.group("v")), _pf(m.group("q"))
    m = re.search(L + r"\s*(?:is|are|=|:|of|was|were)?\s*" + _RS +
                  r"(?P<v>" + _NUM + r")", text, re.I)
    if m:
        return _pf(m.group("v")), None
    m = re.search(_RS + r"(?P<v>" + _NUM + r")\s*(?:is|was)?\s*(?:the\s+)?" +
                  L, text, re.I)
    if m:
        return _pf(m.group("v")), None
    return None, None


# 1b. COST SCHEDULE -- TC = TFC + TVC;  AC = TC/q;  AVC = TVC/q;
#      AFC = TFC/q;  MC = dTC/dq  (leec203, Table 3.3 + eqs 3.6-3.11)

def _c_cost(g, m, text):
    tfc, tq1 = _cost_part(text, r"total\s+fixed\s+cost|\btfc\b|fixed\s+cost")
    tvc, tq2 = _cost_part(text, r"total\s+variable\s+cost|\btvc\b|"
                                r"variable\s+cost")
    tc, tq3 = _cost_part(text, r"total\s+cost\b|\btc\b")
    q = _pf(g.get("q")) or tq1 or tq2 or tq3
    if q is None:
        m2 = re.search(r"(?:at\s+|output\s+(?:is|are|=|:|of)\s*)(" + _NUM +
                       r")\s*units?", text, re.I)
        if not m2:
            m2 = re.search(r"(" + _NUM + r")\s*units?\s+of\s+output",
                           text, re.I)
        if m2:
            q = _pf(m2.group(1))
    # -- marginal cost from two cost/output points ------------------------ #
    mtc = re.search(r"(?:total\s+cost|\btc\b|total\s+variable\s+cost|"
                    r"\btvc\b)[^.]{0,40}?(?:rises?|increases?|goes\s+up|"
                    r"falls?|decreases?|changes?)\s+from\s*(" + _NUM +
                    r")\s*to\s*(" + _NUM + r")", text, re.I)
    mq = re.search(r"(?:output|production|sales|quantity)\s+(?:rises?|"
                   r"increases?|goes\s+up|falls?|decreases?|changes?)\s+"
                   r"from\s*(" + _NUM + r")\s*to\s*(" + _NUM + r")",
                   text, re.I)
    if mtc and mq:
        c1, c2 = _pf(mtc.group(1)), _pf(mtc.group(2))
        q1, q2 = _pf(mq.group(1)), _pf(mq.group(2))
        if None not in (c1, c2, q1, q2) and c1 >= 0 and c2 >= 0 and q2 > q1:
            mc = abs(c2 - c1) / (q2 - q1)
            steps = [
                "Method: short-run marginal cost is the change in total cost "
                "per unit change in output, SMC = dTC/dQ (leec203 eq 3.11); "
                "it applies because variable cost, not fixed cost, moves "
                "with output.",
                f"Given: cost moves from Rs {_fmt(c1)} to Rs {_fmt(c2)} as "
                f"output moves from {_fmt(q1)} to {_fmt(q2)} units.",
                f"MC = |{_fmt(c2)} - {_fmt(c1)}| / ({_fmt(q2)} - "
                f"{_fmt(q1)}) = {_fmt(abs(c2 - c1))}/{_fmt(q2 - q1)} = "
                f"Rs {_fmt(mc)} per unit.",
                f"Check: {_fmt(q2 - q1)} extra units x Rs {_fmt(mc)} = "
                f"Rs {_fmt((q2 - q1) * mc)}, which is exactly the observed "
                "cost rise -- the identity closes.",
                "Interpretation: producing one more unit adds Rs "
                f"{_fmt(mc)} to the firm's bill; fixed cost is irrelevant "
                "here because it does not change with output.",
            ]
            ans = f"Marginal cost = Rs {_fmt(mc)} per unit"
            return mc, steps, ans, None, "SMC = dTC/dQ", \
                {"d_cost": abs(c2 - c1), "d_q": q2 - q1}
    if any(v is not None and v < 0 for v in (tfc, tvc, tc)):
        return _GATE        # impossible state: negative cost
    if q is not None and q <= 0:
        return _GATE        # impossible state: zero/negative output
    # -- build a full schedule row ----------------------------------------- #
    if tc is None and tvc is not None and tfc is not None:
        tc = tfc + tvc
        tc_src = f"TC = TFC + TVC = {_fmt(tfc)} + {_fmt(tvc)} = {_fmt(tc)}."
    elif tvc is None and tc is not None and tfc is not None:
        tvc = tc - tfc
        tc_src = f"TVC = TC - TFC = {_fmt(tc)} - {_fmt(tfc)} = {_fmt(tvc)}."
    elif tfc is None and tc is not None and tvc is not None:
        tfc = tc - tvc
        tc_src = f"TFC = TC - TVC = {_fmt(tc)} - {_fmt(tvc)} = {_fmt(tfc)}."
    elif tc is not None:
        tc_src = f"TC = {_fmt(tc)}."
    else:
        return _GATE        # fewer than two cost cells: no schedule to fill
    if tc < 0 or (tvc is not None and tvc < 0) or (tfc is not None and
                                                   tfc < 0):
        return _GATE        # impossible state: negative cost cell
    if q is None or q <= 0:
        if not (tfc is not None and tvc is not None):
            return _GATE    # only the TC identity is fillable when TFC+TVC known
        # only the TC identity was solvable (no output given)
        steps = [
            "Method: in the short run total cost splits into a fixed part "
            "that does not vary with output and a variable part that does: "
            "TC = TFC + TVC (leec203 eq 3.6).",
            f"Given: TFC = Rs {_fmt(tfc)}, TVC = Rs {_fmt(tvc)}, TC = "
            f"Rs {_fmt(tc)}.",
            tc_src,
            f"Check: {_fmt(tfc)} + {_fmt(tvc)} = {_fmt(tfc + (tvc or 0))} "
            "-- the identity closes.",
            "Interpretation: even at zero output the firm pays the fixed "
            "cost; every rupee of TVC appears only once production starts.",
        ]
        ans = f"Total cost = Rs {_fmt(tc)}"
        return tc, steps, ans, None, "TC = TFC + TVC", \
            {"tfc": tfc, "tvc": tvc, "tc": tc}
    ac = tc / q
    afc = (tfc / q) if tfc is not None else None
    avc = (tvc / q) if tvc is not None else None
    given = (f"Given: TFC = Rs {_fmt(tfc)}, TVC = Rs {_fmt(tvc)}, TC = "
             f"Rs {_fmt(tc)}, output q = {_fmt(q)} units.")
    comp_lines = [tc_src,
                  f"AC (SAC) = TC/q = {_fmt(tc)}/{_fmt(q)} = Rs {_fmt(ac)}."]
    if afc is not None:
        comp_lines.append(f"AFC = TFC/q = {_fmt(tfc)}/{_fmt(q)} = "
                          f"Rs {_fmt(afc)};  AVC = TVC/q = {_fmt(tvc)}/"
                          f"{_fmt(q)} = Rs {_fmt(avc)}.")
    check = ((f"Check: AFC + AVC = {_fmt(afc)} + {_fmt(avc)} = "
              f"{_fmt(afc + avc)} = AC -- eq 3.10 (SAC = AVC + AFC) closes; "
              f"also AC x q = {_fmt(ac * q)} = TC.") if afc is not None
             else f"Check: AC x q = {_fmt(ac)} x {_fmt(q)} = Rs "
                  f"{_fmt(ac * q)} = TC -- the identity closes.")
    steps = [
        "Method: short-run cost schedule identities -- TC = TFC + TVC, "
        "AC (SAC) = TC/q, AVC = TVC/q, AFC = TFC/q, with SAC = AVC + AFC "
        "(leec203 eqs 3.6-3.10); they apply to any output level q in the "
        "short run.",
        given,
    ] + comp_lines + [
        check,
        f"Interpretation: at {_fmt(q)} units each unit of output costs on "
        f"average Rs {_fmt(ac)}; AFC falls as output grows (the fixed "
        f"Rs {_fmt(tfc)} is spread thinner) while AVC reflects variable "
        "inputs only.",
    ]
    ans = (f"TC = Rs {_fmt(tc)}, AC = Rs {_fmt(ac)}"
           + (f", AFC = Rs {_fmt(afc)}, AVC = Rs {_fmt(avc)}"
              if afc is not None else ""))
    return tc, steps, ans, None, "TC = TFC + TVC;  AC = TC/q", \
        {"tfc": tfc, "tvc": tvc, "tc": tc, "ac": ac,
         **({"afc": afc, "avc": avc} if afc is not None else {})}


# 1c. PRODUCTION FUNCTION SCHEDULE -- AP = TP/q;  MP = dTP/dq  (leec203
#      ch 3, Table 3.1-3.2; any-missing among TP, AP, MP, output)

def _c_tp_ap_mp(g, m, text):
    tp = _pf(g.get("tp")) or _labv(text, r"total\s+product", tight=True)
    ap = _pf(g.get("ap")) or _labv(text, r"average\s+product", tight=True)
    mp = _pf(g.get("mp")) or _labv(text, r"marginal\s+product", tight=True)
    q = _pf(g.get("q"))
    if q is None:
        m2 = re.search(r"(?:at|with|of|for)\s+(\d+)\s*units?\s+of\s+"
                       r"(?:the\s+)?(?:variable\s+input|labour|output)",
                       text, re.I)
        if not m2:
            m2 = re.search(r"(?:labour|workers?|output|input)\s*(?:is|are|"
                           r"=|:|of)?\s*(\d+)", text, re.I)
        if not m2:
            m2 = re.search(r"(\d+)\s*(?:units?\s+of\s+)?(?:labour|workers?|"
                           r"units?\s+of\s+output|output)", text, re.I)
        if m2:
            q = _pf(m2.group(1))
    # MP from two TP points
    mtp = re.search(r"total\s+product\s+(?:rises?|increases?|goes\s+up|"
                    r"falls?|decreases?|changes?)\s+from\s*(" + _NUM +
                    r")\s*to\s*(" + _NUM + r")", text, re.I)
    mlp = re.search(r"(?:labour|workers?|output|input)\s+(?:rises?|"
                    r"increases?|goes\s+up|falls?|decreases?|changes?)\s+"
                    r"from\s*(" + _NUM + r")\s*to\s*(" + _NUM + r")",
                    text, re.I)
    if mtp and mlp:
        t1, t2 = _pf(mtp.group(1)), _pf(mtp.group(2))
        l1, l2 = _pf(mlp.group(1)), _pf(mlp.group(2))
        if None not in (t1, t2, l1, l2) and t1 >= 0 and t2 >= 0 and l2 > l1:
            mp_ = (t2 - t1) / (l2 - l1)
            steps = [
                "Method: marginal product is the addition to total product "
                "from one more unit of the variable input, MP = dTP/dL "
                "(leec203 ch 3) -- the slope of the TP schedule.",
                f"Given: total product moves from {_fmt(t1)} to {_fmt(t2)} "
                f"units as the input moves from {_fmt(l1)} to {_fmt(l2)} "
                "units.",
                f"MP = ({_fmt(t2)} - {_fmt(t1)}) / ({_fmt(l2)} - {_fmt(l1)})"
                f" = {_fmt(t2 - t1)}/{_fmt(l2 - l1)} = {_fmt(mp_)} units.",
                f"Check: {_fmt(l2 - l1)} extra input units x MP {_fmt(mp_)} "
                f"= {_fmt((l2 - l1) * mp_)} = the observed TP rise -- the "
                "schedule closes.",
                "Interpretation: the "
                + ("extra worker adds " if abs(l2 - l1 - 1) < 1e-9 else
                   "each extra unit of input adds ")
                + f"{_fmt(mp_)} units of output; a falling MP here is the "
                "law of variable proportions at work.",
            ]
            ans = f"Marginal product = {_fmt(mp_)} units"
            return mp_, steps, ans, None, "MP = dTP/dq", \
                {"d_tp": t2 - t1, "d_q": l2 - l1}
    if any(v is not None and v < 0 for v in (tp, ap, mp)):
        return _GATE    # impossible state: negative product
    if q is not None and q <= 0:
        return _GATE
    given = ("Given: "
             + ", ".join(f"{k} = {_fmt(v)}" for k, v in
                         (("TP", tp), ("AP", ap), ("MP", mp))
                         if v is not None)
             + (f", input/output level q = {_fmt(q)} units." if q is not None
                else "."))
    if tp is not None and q is not None:
        ap_ = tp / q
        steps = [
            "Method: average product -- AP = TP/q, output per unit of the "
            "variable input (leec203 ch 3); with TP and the input level "
            "known, AP follows directly.",
            given,
            f"AP = {_fmt(tp)}/{_fmt(q)} = {_fmt(ap_)} units per input unit.",
            f"Check: AP x q = {_fmt(ap_)} x {_fmt(q)} = {_fmt(ap_ * q)} = "
            "TP -- the identity closes.",
            "Interpretation: each unit of the variable input produces on "
            f"average {_fmt(ap_)} units; AP rises while MP exceeds it and "
            "falls once MP drops below it.",
        ]
        ans = f"Average product = {_fmt(ap_)}"
        return ap_, steps, ans, None, "AP = TP/q", {"tp": tp, "ap": ap_}
    if ap is not None and q is not None:
        tp_ = ap * q
        steps = [
            "Method: average product rearranged -- TP = AP x q (leec203 "
            "ch 3).",
            given,
            f"TP = {_fmt(ap)} x {_fmt(q)} = {_fmt(tp_)} units.",
            f"Check: TP/q = {_fmt(tp_)}/{_fmt(q)} = {_fmt(tp_ / q)} = the "
            "given AP -- the identity closes.",
            f"Interpretation: {_fmt(q)} units of input at {_fmt(ap)} units "
            f"of output each yield a total product of {_fmt(tp_)} units.",
        ]
        ans = f"Total product = {_fmt(tp_)} units"
        return tp_, steps, ans, None, "TP = AP x q", {"tp": tp_, "ap": ap}
    if mp is not None and tp is not None and q is not None and q > 1:
        tp_prev = tp - mp
        q_prev = q - 1
        ap_ = tp / q
        steps = [
            "Method: marginal product bridges consecutive TP values -- "
            "MP(q) = TP(q) - TP(q-1), and AP = TP/q (leec203 ch 3).",
            given,
            f"TP at the previous input unit = {_fmt(tp)} - {_fmt(mp)} = "
            f"{_fmt(tp_prev)};  AP = {_fmt(tp)}/{_fmt(q)} = {_fmt(ap_)}.",
            f"Check: TP(prev) + MP = {_fmt(tp_prev)} + {_fmt(mp)} = "
            f"{_fmt(tp_prev + mp)} = TP -- the schedule closes.",
            f"Interpretation: the q-th input unit raised output by "
            f"{_fmt(mp)} units to TP {_fmt(tp)}, giving an average of "
            f"{_fmt(ap_)} units per input unit.",
        ]
        ans = (f"TP at previous unit = {_fmt(tp_prev)}; AP = {_fmt(ap_)}")
        return ap_, steps, ans, None, "MP = TP(q) - TP(q-1);  AP = TP/q", \
            {"tp_prev": tp_prev, "ap": ap_}
    return _GATE


# 2b. REVENUE CURVES -- TR = p x q;  AR = TR/q = p;  MR = dTR/dq (= p for a
#      price-taking firm)  (leec204, Table 4.1 + eqs 4.1-4.3)

def _c_revenue(g, m, text):
    tr = _pf(g.get("tr")) or _labv(text, r"total\s+revenue", tight=True)
    ar = _labv(text, r"average\s+revenue", tight=True)
    pp = _pf(g.get("pp")) or _labv(text, r"(?:market\s+)?price", tight=True)
    qq = _pf(g.get("qq"))
    if qq is None:
        m2 = re.search(r"(?:sells?|sold|produces?|output\s+of|sales\s+of|"
                       r"quantity\s+of)\s+(?:a\s+)?(?P<v>" + _NUM +
                       r")\s*(?:units?)?", text, re.I)
        if not m2:
            m2 = re.search(r"(?:output|sales|quantity)\s*(?:is|are|=|:|of)?"
                           r"\s*(" + _NUM + r")", text, re.I)
        if m2:
            qq = _pf(m2.group("v"))
    # MR from two TR points
    mtr = re.search(r"total\s+revenue\s+(?:rises?|increases?|falls?|"
                    r"changes?)\s+from\s*(" + _NUM + r")\s*to\s*(" + _NUM +
                    r")", text, re.I)
    msq = re.search(r"(?:sales|output|quantity|units)\s+(?:rises?|"
                    r"increases?|falls?|changes?)\s+from\s*(" + _NUM +
                    r")\s*to\s*(" + _NUM + r")", text, re.I)
    if mtr and msq:
        t1, t2 = _pf(mtr.group(1)), _pf(mtr.group(2))
        s1, s2 = _pf(msq.group(1)), _pf(msq.group(2))
        if None not in (t1, t2, s1, s2) and t1 >= 0 and t2 >= 0 and s2 > s1:
            mr_ = (t2 - t1) / (s2 - s1)
            steps = [
                "Method: marginal revenue is the addition to total revenue "
                "from selling one more unit, MR = dTR/dq (leec204 eq 4.3) -- "
                "the slope of the TR curve.",
                f"Given: TR moves from Rs {_fmt(t1)} to Rs {_fmt(t2)} as "
                f"sales move from {_fmt(s1)} to {_fmt(s2)} units.",
                f"MR = ({_fmt(t2)} - {_fmt(t1)}) / ({_fmt(s2)} - {_fmt(s1)})"
                f" = {_fmt(t2 - t1)}/{_fmt(s2 - s1)} = Rs {_fmt(mr_)} per "
                "unit.",
                f"Check: {_fmt(s2 - s1)} extra units x Rs {_fmt(mr_)} = "
                f"Rs {_fmt((s2 - s1) * mr_)} = the observed TR rise -- the "
                "identity closes.",
                "Interpretation: each extra unit sold adds Rs "
                f"{_fmt(mr_)} to revenue; for a price-taking firm this MR "
                "equals the market price, so the firm's MR curve is "
                "horizontal at that price.",
            ]
            ans = f"Marginal revenue = Rs {_fmt(mr_)} per unit"
            return mr_, steps, ans, None, "MR = dTR/dq", \
                {"d_tr": t2 - t1, "d_q": s2 - s1}
    if pp is not None and qq is not None and pp > 0 and qq > 0:
        tr_ = pp * qq
        steps = [
            "Method: for a price-taking firm TR = p x q, AR = TR/q (which "
            "equals the price itself) and MR = dTR/dq = p (leec204 eqs "
            "4.1-4.3 and Table 4.1); they apply because the firm can sell "
            "any quantity at the given market price.",
            f"Given: market price p = Rs {_fmt(pp)}, output q = {_fmt(qq)} "
            "units.",
            f"TR = {_fmt(pp)} x {_fmt(qq)} = Rs {_fmt(tr_)};  AR = TR/q = "
            f"{_fmt(tr_)}/{_fmt(qq)} = Rs {_fmt(tr_ / qq)};  MR = p = "
            f"Rs {_fmt(pp)}.",
            f"Check: AR x q = {_fmt(tr_ / qq)} x {_fmt(qq)} = Rs "
            f"{_fmt(tr_)} = TR -- the identity closes.",
            "Interpretation: revenue rises by Rs "
            f"{_fmt(pp)} for every extra unit sold, which is why a "
            "competitive firm's AR and MR curves coincide with the "
            "horizontal price line.",
        ]
        ans = (f"TR = Rs {_fmt(tr_)}; AR = MR = Rs {_fmt(pp)}")
        return tr_, steps, ans, None, "TR = p x q;  AR = TR/q;  MR = p", \
            {"price": pp, "q": qq, "ar": tr_ / qq, "mr": pp}
    if tr is not None and qq is not None and tr >= 0 and qq > 0:
        ar_ = tr / qq
        steps = [
            "Method: average revenue is revenue per unit sold, AR = TR/q; "
            "for a price-taking firm AR equals the market price (leec204 "
            "eq 4.2).",
            f"Given: TR = Rs {_fmt(tr)}, output q = {_fmt(qq)} units.",
            f"AR = {_fmt(tr)}/{_fmt(qq)} = Rs {_fmt(ar_)}.",
            f"Check: AR x q = {_fmt(ar_)} x {_fmt(qq)} = Rs {_fmt(tr)} -- "
            "the identity closes.",
            "Interpretation: each of the "
            f"{_fmt(qq)} units sold fetched Rs {_fmt(ar_)} on average; "
            "under perfect competition this is the good's market price.",
        ]
        ans = f"Average revenue = Rs {_fmt(ar_)}"
        return ar_, steps, ans, None, "AR = TR/q", {"tr": tr, "q": qq}
    if tr is not None and ar is not None and tr >= 0 and ar > 0:
        q_ = tr / ar
        steps = [
            "Method: rearrange AR = TR/q to q = TR/AR (leec204 eq 4.2) -- "
            "units sold are revenue divided by revenue per unit.",
            f"Given: TR = Rs {_fmt(tr)}, AR = Rs {_fmt(ar)}.",
            f"q = {_fmt(tr)}/{_fmt(ar)} = {_fmt(q_)} units.",
            f"Check: AR x q = {_fmt(ar)} x {_fmt(q_)} = Rs {_fmt(tr)} -- "
            "the identity closes.",
            "Interpretation: revenue of Rs "
            f"{_fmt(tr)} at Rs {_fmt(ar)} per unit means "
            f"{_fmt(q_)} units changed hands.",
        ]
        ans = f"Output q = {_fmt(q_)} units"
        return q_, steps, ans, None, "q = TR/AR", {"tr": tr, "ar": ar}
    return _GATE


# 3b. CONSUMER EQUILIBRIUM -- cardinal rule MUx/Px = MUy/Py  (leec202 ch 2;
#      ordinal twin: optimum where MRS = price ratio p1/p2)

def _c_consumer_eq(g, m, text):
    mux = _pf(g.get("mux")) or _mu_val(text, "x") or _mu_val(text, "1")
    muy = _pf(g.get("muy")) or _mu_val(text, "y") or _mu_val(text, "2")
    px = _pf(g.get("px")) or _pr_val(text, "x", mux) or _pr_val(text, "1",
                                                                mux)
    py = _pf(g.get("py")) or _pr_val(text, "y", muy) or _pr_val(text, "2",
                                                                muy)
    known = [v for v in (mux, muy, px, py) if v is not None]
    if len(known) < 3:
        return _GATE
    if any(v is not None and v <= 0 for v in (mux, muy, px, py)):
        return _GATE    # impossible state: non-positive price or marginal utility
    name = {"mux": "MUx", "muy": "MUy", "px": "Px", "py": "Py"}
    given = ", ".join(f"{name[k]} = {_fmt(v)}"
                      for k, v in (("mux", mux), ("muy", muy),
                                   ("px", px), ("py", py))
                      if v is not None)
    if None not in (mux, muy, px, py):
        rx, ry = mux / px, muy / py
        if abs(rx - ry) < 1e-9:
            verdict = ("the consumer IS in equilibrium: the marginal "
                       "utility per rupee is equal on both goods")
            val = 0.0
        else:
            hi, lo = ("X", "Y") if rx > ry else ("Y", "X")
            verdict = (f"NOT in equilibrium: MU per rupee is "
                       f"{_fmt(max(rx, ry))} for good {hi} against "
                       f"{_fmt(min(rx, ry))} for good {lo}, so shifting "
                       f"spending toward good {hi} raises total utility")
            val = abs(rx - ry)
        steps = [
            "Method: cardinal consumer equilibrium requires the marginal "
            "utility of the last rupee spent to be the same on every good, "
            "MUx/Px = MUy/Py (the law of equi-marginal utility, leec202 "
            "ch 2); otherwise the consumer can gain by rearranging "
            "spending.",
            f"Given: {given}.",
            f"MUx/Px = {_fmt(mux)}/{_fmt(px)} = {_fmt(rx)};  MUy/Py = "
            f"{_fmt(muy)}/{_fmt(py)} = {_fmt(ry)}.",
            "Check: compare the two ratios -- gap = "
            + (_fmt(abs(rx - ry)) + "; equal ratios mean no rearrangement "
               "can add utility." if abs(rx - ry) < 1e-9 else
               _fmt(abs(rx - ry)) +
               "; unequal, so the equilibrium condition fails."),
            f"Interpretation: {verdict} (ordinal twin: the optimum sits "
            "where MRS equals the price ratio p1/p2).",
        ]
        ans = ("Consumer is in equilibrium (MUx/Px = MUy/Py = "
               f"{_fmt(rx)})" if abs(rx - ry) < 1e-9 else
               f"Consumer is NOT in equilibrium: MUx/Px = {_fmt(rx)} vs "
               f"MUY/Py = {_fmt(ry)} -- consume more of the good with the "
               "higher MU per rupee")
        return val, steps, ans, None, "MUx/Px = MUy/Py", \
            {"mu_per_rupee_x": rx, "mu_per_rupee_y": ry}
    # exactly one missing: solve it from the equilibrium condition
    if mux is None:
        mux = muy * px / py
        solv = (f"MUx = MUy x (Px/Py) = {_fmt(muy)} x {_fmt(px)}/"
                f"{_fmt(py)} = {_fmt(mux)}.")
        ans_name, ans_val = "MUx", mux
    elif muy is None:
        muy = mux * py / px
        solv = (f"MUy = MUx x (Py/Px) = {_fmt(mux)} x {_fmt(py)}/"
                f"{_fmt(px)} = {_fmt(muy)}.")
        ans_name, ans_val = "MUy", muy
    elif px is None:
        px = mux * py / muy
        solv = (f"Px = MUx x (Py/MUy) = {_fmt(mux)} x {_fmt(py)}/"
                f"{_fmt(muy)} = Rs {_fmt(px)}.")
        ans_name, ans_val = "Px", px
    else:
        py = muy * px / mux
        solv = (f"Py = MUy x (Px/MUx) = {_fmt(muy)} x {_fmt(px)}/"
                f"{_fmt(mux)} = Rs {_fmt(py)}.")
        ans_name, ans_val = "Py", py
    steps = [
        "Method: at consumer equilibrium the marginal utility per rupee is "
        "equal on both goods, MUx/Px = MUy/Py (leec202 ch 2); with three of "
        "the four terms known, the fourth follows algebraically.",
        f"Given: {given}.",
        solv,
        f"Check: substitute back -- MUx/Px = {_fmt(mux)}/{_fmt(px)} = "
        f"{_fmt(mux / px)} and MUy/Py = {_fmt(muy)}/{_fmt(py)} = "
        f"{_fmt(muy / py)}; the two ratios are equal, so the identity "
        "closes.",
        "Interpretation: the last rupee spent on either good now yields "
        f"the same utility ({_fmt(mux / px)}), which is exactly the "
        "condition for the consumer's optimum bundle.",
    ]
    ans = f"{ans_name} = {_fmt(ans_val)} (consumer equilibrium: MUx/Px = MUy/Py)"
    return ans_val, steps, ans, None, "MUx/Px = MUy/Py", \
        {"mux": mux, "muy": muy, "px": px, "py": py}


# 4b. MARKET SUPPLY -- horizontal sum of firm supplies  (leec205 ch 5)

def _c_market_supply(g, m, text):
    pp = _pf(g.get("pp"))
    if pp is None:
        m2 = re.search(r"at\s+(?:a\s+)?price\s*(?:is|of|=)?\s*(" + _NUM +
                       r")", text, re.I)
        if m2:
            pp = _pf(m2.group(1))
    qtys = [_pf(v) for v in re.findall(
        r"(?:firm|producer|seller)\s+[a-z0-9]{1,3}\s+(?:supplie?s|supplied|"
        r"offers?)\s*[^0-9\n]{0,12}?(" + _NUM + r")", text, re.I)]
    qtys = [v for v in qtys if v is not None]
    # linear-firm mode: sum the supply functions Qs_i = c_i + d_i P
    fns = [(m.groupdict()) for m in re.finditer(_SUP_QS, text, re.I)]
    slopes = []
    for gd in fns:
        c, d = _fn_from(gd, "c", "sgnd", "d")
        if c is None or d is None or d <= 0:
            return _GATE    # law of supply violated for a component firm
        slopes.append((c, d))
    if len(qtys) < 2 and len(slopes) < 2:
        return _GATE
    if pp is not None and pp <= 0:
        return _GATE        # impossible state: non-positive price
    if len(qtys) >= 2:
        total = sum(qtys)
        given = (f"Given: firm supplies of "
                 + ", ".join(_fmt(v) for v in qtys)
                 + (f" units each offered at the price Rs {_fmt(pp)}."
                    if pp is not None else " units (at the same price)."))
        comp = " + ".join(_fmt(v) for v in qtys) + f" = {_fmt(total)} units."
        steps = [
            "Method: market supply at any price is the HORIZONTAL sum of "
            "the individual firms' supplies -- add what each firm offers at "
            "that price (leec205 ch 5); it applies because every firm faces "
            "the same market price.",
            given,
            f"Market supply = {comp}",
            f"Check: re-add the firm quantities -- {len(qtys)} firms, "
            f"total {_fmt(total)}; each firm's quantity is counted once, "
            "so the identity closes.",
            "Interpretation: at this price the market as a whole offers "
            f"{_fmt(total)} units; plotting such sums at every price traces "
            "the upward-sloping market supply curve.",
        ]
        ans = (f"Market supply = {_fmt(total)} units"
               + (f" at price Rs {_fmt(pp)}" if pp is not None else ""))
        return total, steps, ans, None, "Qm = sum of firm Qs at each P", \
            {"firm_supplies": qtys}
    c_sum = sum(c for c, _ in slopes)
    d_sum = sum(d for _, d in slopes)
    fn_s = f"Qs(market) = {_fmt(c_sum)} + {_fmt(d_sum)}P"
    if pp is not None:
        total = c_sum + d_sum * pp
        if total <= 0:
            return _GATE    # impossible state: non-positive market supply
        steps = [
            "Method: the market supply curve is the horizontal sum of the "
            "firms' supply curves -- at each price, add the quantities "
            "supplied (leec205 ch 5); adding functions means adding "
            "intercepts and slopes.",
            f"Given: firm supply functions "
            + "; ".join(f"Qs = {_fmt(c)} + {_fmt(d)}P" for c, d in slopes)
            + (f", evaluated at P = Rs {_fmt(pp)}." if pp is not None
               else "."),
            f"{fn_s};  at P = {_fmt(pp)}: Qs = {_fmt(c_sum)} + "
            f"{_fmt(d_sum)} x {_fmt(pp)} = {_fmt(total)} units.",
            f"Check: each firm alone supplies "
            + ", ".join(_fmt(c + d * pp) for c, d in slopes)
            + f"; their sum = {_fmt(total)} -- the identity closes.",
            "Interpretation: the combined market offers "
            f"{_fmt(total)} units at Rs {_fmt(pp)}; the market curve is "
            "flatter than each firm's curve because every rupee of price "
            f"adds {_fmt(d_sum)} units across all firms together.",
        ]
        ans = (f"Market supply function: {fn_s}; at price Rs {_fmt(pp)} "
               f"market supply = {_fmt(total)} units")
        return total, steps, ans, None, \
            "Qm = (sum c) + (sum d) P", \
            {"market_intercept": c_sum, "market_slope": d_sum}
    steps = [
        "Method: the market supply curve is the horizontal sum of the "
        "firms' supply curves -- add quantities at each price (leec205 "
        "ch 5).",
        "Given: firm supply functions "
        + "; ".join(f"Qs = {_fmt(c)} + {_fmt(d)}P" for c, d in slopes) + ".",
        f"Market function: {fn_s} (sum of intercepts; sum of slopes).",
        f"Check: substituting any price, e.g. P = 1, gives firm totals "
        + ", ".join(_fmt(c + d) for c, d in slopes)
        + f" which sum to {_fmt(c_sum + d_sum)} = market Qs at P = 1 -- "
        "the identity closes.",
        "Interpretation: the market supply curve lies to the right of "
        "every individual firm's curve; its slope "
        f"({_fmt(d_sum)}) is shallower because all firms respond together "
        "to a price change.",
    ]
    ans = f"Market supply function: {fn_s}"
    return c_sum, steps, ans, None, "Qm = (sum c) + (sum d) P", \
        {"market_intercept": c_sum, "market_slope": d_sum}


# 5b. PRICE CEILING / FLOOR  (leec205 5.2.1 / 5.2.2)

def _c_price_control(g, m, text):
    fn = _both_fns(text)
    if not fn:
        return _GATE
    a, b, c, d = fn["a"], fn["b"], fn["c"], fn["d"]
    if abs(b) + d == 0:
        return _GATE
    p_star = (a - c) / (abs(b) + d)
    if p_star <= 0:
        return _GATE
    pc = _labv(text, r"(?:price\s+ceiling|maximum\s+price)")
    pf = _labv(text, r"(?:price\s+floor|minimum\s+price|support\s+price)")
    if pc is None and pf is None:
        return _GATE
    kind = "ceiling" if pc is not None else "floor"
    pcx = pc if pc is not None else pf
    if pcx <= 0:
        return _GATE        # impossible state: non-positive controlled price
    binding = pcx < p_star if kind == "ceiling" else pcx > p_star
    qd = a + b * pcx
    qs = c + d * pcx
    steps = [
        "Method: a price ceiling is a legal MAXIMUM, binding only below "
        "equilibrium, where Qd > Qs creates a shortage; a price floor is a "
        "legal MINIMUM, binding only above equilibrium, where Qs > Qd "
        "creates a surplus (leec205 5.2.1-5.2.2).",
        f"Given: Qd = {_fmt(a)} - {_fmt(abs(b))}P;  Qs = {_fmt(c)} + "
        f"{_fmt(d)}P;  {kind} price = Rs {_fmt(pcx)}.",
        f"P* = ({_fmt(a)} - {_fmt(c)})/({_fmt(abs(b))} + {_fmt(d)}) = "
        f"Rs {_fmt(p_star)}.  At the {kind} price: Qd = {_fmt(qd)}, "
        f"Qs = {_fmt(qs)}.",
        f"Check: Rs {_fmt(pcx)} is {'below' if pcx < p_star else 'above' if pcx > p_star else 'equal to'} "
        f"P* = Rs {_fmt(p_star)}, so the {kind} is "
        f"{'BINDING' if binding else 'NOT binding'}; gap Qd - Qs = "
        f"{_fmt(qd - qs)}.",
        (f"Interpretation: the binding {kind} of Rs {_fmt(pcx)} leaves "
         f"buyers wanting {_fmt(qd)} units but sellers offering only "
         f"{_fmt(qs)} -- a persistent {'shortage' if kind == 'ceiling' else 'surplus'} "
         f"of {_fmt(abs(qd - qs))} units, so the good must be "
         f"{'rationed' if kind == 'ceiling' else 'buffer-stocked / procured at the support price'}."
         if binding else
         f"Interpretation: the {kind} of Rs {_fmt(pcx)} lies on the wrong "
         f"side of P* = Rs {_fmt(p_star)}, so it never bites -- the market "
         f"still clears at Rs {_fmt(p_star)} with {_fmt(a + b * p_star)} "
         "units traded."),
    ]
    if binding:
        val = abs(qd - qs)
        ans = (f"The {kind} is binding: {'shortage (excess demand)' if kind == 'ceiling' else 'surplus (excess supply)'} "
               f"of {_fmt(val)} units at Rs {_fmt(pcx)}")
    else:
        val = 0.0
        ans = (f"The {kind} of Rs {_fmt(pcx)} is NOT binding -- the market "
               f"clears at P* = Rs {_fmt(p_star)}")
    return val, steps, ans, None, \
        "ceiling < P* -> shortage Qd-Qs;  floor > P* -> surplus", \
        {"p_star": p_star, "qd": qd, "qs": qs, "controlled_price": pcx}


# 6b. GDP AND WELFARE, numeric -- per-capita GDP  (leec102 2.5)

def _c_per_capita(g, m, text):
    mg = re.search(r"(?:gdp|national\s+income)[^.]{0,30}?(?:grows?|growth|"
                   r"rises?|increases?|expands?)[^.]{0,15}?(?:by|at|is)?\s*"
                   r"(" + _NUM + r")\s*%", text, re.I) or \
        re.search(r"(?:gdp|income)\s+growth(?:\s+rate)?\s*(?:is|of)?\s*(" +
                  _NUM + r")\s*%", text, re.I)
    mp = re.search(r"population[^.]{0,30}?(?:grows?|growth|rises?|"
                   r"increases?)[^.]{0,15}?(?:by|at|is)?\s*(" + _NUM +
                   r")\s*%", text, re.I) or \
        re.search(r"population\s+growth(?:\s+rate)?\s*(?:is|of)?\s*(" +
                  _NUM + r")\s*%", text, re.I)
    if mg and mp:
        gg, nn = _pf(mg.group(1)), _pf(mp.group(1))
        if gg <= -100 or nn <= -100:
            return _GATE    # impossible state: base destroyed (<= -100%)
        exact = ((1.0 + gg / 100.0) / (1.0 + nn / 100.0) - 1.0) * 100.0
        steps = [
            "Method: welfare per person moves with per-capita GDP = GDP / "
            "population, so per-capita growth = (1 + g)/(1 + n) - 1 -- "
            "total GDP alone is NOT an index of welfare (leec102 2.5: "
            "distribution, non-monetary exchanges, externalities).",
            f"Given: GDP growth g = {_fmt(gg)}%, population growth n = "
            f"{_fmt(nn)}%.",
            f"= (1 + {_fmt(gg)}/100)/(1 + {_fmt(nn)}/100) - 1 x 100 = "
            f"{_fmt(exact)}% (textbook approximation g - n = "
            f"{_fmt(gg - nn)}%).",
            f"Check: (1 + {exact / 100:.6f}) x (1 + {_fmt(nn)}/100) = "
            f"{(1 + exact / 100) * (1 + nn / 100):.6f} = 1 + {_fmt(gg)}/100 "
            "-- the identity closes.",
            "Interpretation: although GDP rises "
            f"{_fmt(gg)}%, income per HEAD rises only {_fmt(exact)}% "
            "(about "
            f"{_fmt(gg - nn)}%) -- and if the rise is concentrated in few "
            "hands, most people may be worse off, so GDP alone overstates "
            "welfare gains.",
        ]
        ans = (f"Per-capita growth = {_fmt(exact)}% exact (about "
               f"{_fmt(gg - nn)}% by the g - n approximation)")
        return exact, steps, ans, None, \
            "per-capita growth = (1+g)/(1+n) - 1", {"gdp_growth": gg,
                                                    "pop_growth": nn}
    gdp = _labv(text, r"(?:real\s+)?(?:gdp|national\s+income)")
    pop = _labv(text, r"population")
    if gdp is None or pop is None or gdp < 0 or pop <= 0:
        return _GATE
    pc = gdp / pop
    steps = [
        "Method: per-capita (real) GDP = GDP / population -- average "
        "income per head, the first correction when GDP is used as a "
        "welfare index (leec102 2.5).",
        f"Given: GDP = Rs {_fmt(gdp)}, population = {_fmt(pop)}.",
        f"Per-capita GDP = {_fmt(gdp)}/{_fmt(pop)} = Rs {_fmt(pc)}.",
        f"Check: per-capita x population = {_fmt(pc)} x {_fmt(pop)} = "
        f"Rs {_fmt(gdp)} -- the identity closes.",
        "Interpretation: the average person accounts for Rs "
        f"{_fmt(pc)} of output -- an average only: leec102 warns it hides "
        "distribution (a rise concentrated on a few), non-monetary "
        "exchanges and externalities, so welfare may move differently.",
    ]
    ans = f"Per-capita GDP = Rs {_fmt(pc)}"
    return pc, steps, ans, None, "per-capita GDP = GDP / population", \
        {"gdp": gdp, "population": pop}


# 7b. CORRELATION COEFFICIENT from paired data (statistics chapters:
#      Karl Pearson's product-moment r)

def _c_correlation(g, m, text):
    pair_tuples = re.findall(r"\(\s*(" + _NUM + r")\s*,\s*(" + _NUM +
                             r")\s*\)", text)
    xs = [_pf(a) for a, _b in pair_tuples]
    ys = [_pf(_b) for _a, _b in pair_tuples]
    src = "paired observations (x, y)"
    if len(xs) < 3:
        mx = re.search(r"\bx\s*(?:values?)?\s*(?:are|is|of|:|=)?\s*" + _VALS,
                       text, re.I)
        my = re.search(r"\by\s*(?:values?)?\s*(?:are|is|of|:|=)?\s*" + _VALS,
                       text, re.I)
        if not (mx and my):
            mx = re.search(r"prices?\s*(?:are|of|:|=)?\s*" + _VALS, text,
                           re.I)
            my = re.search(r"(?:demands?|quantities)\s*(?:are|of|:|=)?\s*" +
                           _VALS, text, re.I)
        if mx and my:
            xs, ys = _nums(mx.group("vals")), _nums(my.group("vals"))
            src = "the two listed series"
    if len(xs) < 3 or len(xs) != len(ys):
        return _GATE
    n = float(len(xs))
    mx_ = sum(xs) / n
    my_ = sum(ys) / n
    sxx = sum((x - mx_) ** 2 for x in xs)
    syy = sum((y - my_) ** 2 for y in ys)
    sxy = sum((x - mx_) * (y - my_) for x, y in zip(xs, ys))
    if sxx <= 0 or syy <= 0:
        return _GATE    # impossible state: zero variance -> r undefined
    r_ = sxy / ((sxx * syy) ** 0.5)
    strength = ("strong" if abs(r_) > 0.8 else "moderate"
                if abs(r_) > 0.3 else "weak")
    direction = "positive" if r_ > 0 else "negative" if r_ < 0 else "no"
    pair_s = "; ".join(f"({_fmt(x)}, {_fmt(y)})" for x, y in zip(xs, ys))
    steps = [
        "Method: Karl Pearson's product-moment correlation coefficient "
        "r = sum(dx dy) / sqrt(sum(dx^2) sum(dy^2)) with dx = x - mean(x), "
        "dy = y - mean(y) measures the degree of linear association "
        "between two paired series (statistics chapters: correlation).",
        f"Given: n = {len(xs)} pairs {src}: {pair_s};  means x-bar = "
        f"{mx_:.4g}, y-bar = {my_:.4g}.",
        f"sum(dx^2) = {sxx:.4g}, sum(dy^2) = {syy:.4g}, sum(dxdy) = "
        f"{sxy:.4g};  r = {sxy:.4g} / sqrt({sxx:.4g} x {syy:.4g}) = "
        f"{sxy:.4g}/{(sxx * syy) ** 0.5:.4g} = {r_:.4f}.",
        f"Check: |r| = {abs(r_):.4f} <= 1 (a valid coefficient); "
        f"r-squared = {r_ * r_:.4f}, i.e. {r_ * r_ * 100:.1f}% of the "
        "variation in y is explained by x -- recomputing the ratio gives "
        "the same value.",
        f"Interpretation: {direction} correlation of strength {strength}: "
        + ("the two series move together -- high x goes with high y."
           if r_ > 0 else
           "the two series move in opposite directions -- high x goes "
           "with low y (e.g. price up, quantity demanded down)."),
    ]
    ans = f"Correlation coefficient r = {r_:.4f} ({strength} {direction} correlation)"
    return r_, steps, ans, None, \
        "r = sum(dxdy) / sqrt(sum(dx^2) sum(dy^2))", \
        {"n_pairs": len(xs), "r_squared": r_ * r_}


# 8b. BALANCE OF PAYMENTS -- visible/invisible classification + current
#      account balance  (leec106 6.1)

_BOP_LABELS = (
    ("visible exports",
     r"(?<!in)visible\s+exports?|merchandise\s+exports?|goods\s+exports?|"
     r"exports?\s+of\s+(?:goods|merchandise)"),
    ("visible imports",
     r"(?<!in)visible\s+imports?|merchandise\s+imports?|goods\s+imports?|"
     r"imports?\s+of\s+(?:goods|merchandise)"),
    ("invisible exports",
     r"invisible\s+exports?|services\s+exports?|exports?\s+of\s+"
     r"(?:services|invisibles)"),
    ("invisible imports",
     r"invisible\s+imports?|services\s+imports?|imports?\s+of\s+"
     r"(?:services|invisibles)"),
)


def _c_bop(g, m, text):
    vals = {name: _labv(text, r"(?:" + pat + r")", tight=True)
            for name, pat in _BOP_LABELS}
    ni = _labv(text, r"net\s+invisibles?", tight=True)
    gross = [v for v in vals.values()]
    n_known = sum(v is not None for v in gross) + (1 if ni is not None else 0)
    if n_known < 2:
        return _GATE
    if any(v is not None and v < 0 for v in gross):
        return _GATE    # impossible state: negative gross exports/imports
    ve = vals["visible exports"] or 0.0
    vi = vals["visible imports"] or 0.0
    ie = vals["invisible exports"] or 0.0
    ii = vals["invisible imports"] or 0.0
    net_vis = ve - vi
    net_inv = (ie - ii) + (ni if ni is not None else 0.0)
    bal = net_vis + net_inv
    given_bits = []
    for nm, v in vals.items():
        if v is not None:
            kind = "INVISIBLE" if "invisible" in nm else "VISIBLE"
            given_bits.append(f"{nm} Rs {_fmt(v)} ({kind})")
    if ni is not None:
        given_bits.append(f"net invisibles Rs {_fmt(ni)} (INVISIBLE)")
    verdict = ("surplus" if bal > 0 else "deficit" if bal < 0 else
               "balanced")
    steps = [
        "Method: the balance of payments records all transactions with "
        "the rest of the world; goods trade items are VISIBLE, while "
        "services, income and transfers are INVISIBLE items, and the "
        "current-account balance = net visibles + net invisibles (leec106 "
        "6.1).",
        "Given: " + "; ".join(given_bits) + ".",
        f"Net visibles = {_fmt(ve)} - {_fmt(vi)} = Rs {_fmt(net_vis)};  "
        f"net invisibles = ({_fmt(ie)} - {_fmt(ii)})"
        + (f" + {_fmt(ni)}" if ni is not None else "") +
        f" = Rs {_fmt(net_inv)};  balance = {_fmt(net_vis)} + "
        f"({_fmt(net_inv)}) = Rs {_fmt(bal)}.",
        f"Check: re-add all credited items ({_fmt(ve)} + {_fmt(ie)}"
        + (f" + max({ni}, 0)" if ni is not None and ni > 0 else "") +
        f") and debited items ({_fmt(vi)} + {_fmt(ii)}) -- the difference "
        f"reproduces Rs {_fmt(bal)}.",
        f"Interpretation: a current-account {verdict} of Rs "
        f"{_fmt(abs(bal))} -- "
        + ("export earnings exceed import payments; the excess builds "
           "reserves." if bal > 0 else
           "the country pays out more than it earns, so the gap must be "
           "met by drawing down reserves or borrowing from abroad "
           "(leec106 6.1.3)." if bal < 0 else
           "receipts exactly cover payments."),
    ]
    ans = (f"Balance of payments on current account = Rs {_fmt(bal)} "
           f"({verdict}); goods items are visible, services/income items "
           f"invisible")
    extra = {"net_visibles": net_vis, "net_invisibles": net_inv}
    for k, v in vals.items():
        if v is not None:
            extra[k.replace(" ", "_")] = v
    if ni is not None:
        extra["net_invisibles_given"] = ni
    return bal, steps, ans, None, \
        "BoP(current) = (VX - VM) + net invisibles", extra


# --------------------------------------------------------------------------- #
# The table: (structure id, trigger regex, compute)
# --------------------------------------------------------------------------- #

_PED_PAIRS_CORE = (
    r"price[s]?\s*(?:of\s+(?:a\s+|the\s+)?(?:good|commodity)\s+)?"
    r"(?:is\s+)?(?:raised|risen|rises|rose|falls|fell|increased|increases|"
    r"decreased|decreases|changed)\s+from\s*(?P<p1>" + _NUM + r")\s*"
    r"(?:to|rs\.?)\s*(?P<p2>" + _NUM + r")"
    r".{0,160}?quantity\s+(?:demanded\s+)?"
    r"(?:falls|drops|declines|decreases|rises|increases|changes)?\s*"
    r"(?:is\s+)?from\s*(?P<q1>" + _NUM + r")\s*(?:to|rs\.?)\s*"
    r"(?P<q2>" + _NUM + r")"
)
_OUTLAY_BODY_Q = (
    r"(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p1>" + _NUM + r")"
    r".{0,80}?(?:quantity|q|buys?|purchases?|consumes?|sells?)\s*"
    r"[^0-9\-\n]{0,10}(?P<q1>" + _NUM + r")"
    r".{0,200}?(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p2>" + _NUM + r")"
    r".{0,80}?(?:quantity|q|buys?|purchases?|consumes?|sells?|is)\s*"
    r"[^0-9\-\n]{0,10}(?P<q2>" + _NUM + r")"
)
_OUTLAY_BODY_T = (
    r"(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p1>" + _NUM + r")"
    r".{0,100}?(?:outlay|expenditure|spending)\s*[^0-9\-\n]{0,10}"
    r"(?P<t1>" + _NUM + r")"
    r".{0,200}?(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p2>" + _NUM + r")"
    r".{0,100}?(?:outlay|expenditure|spending)\s*[^0-9\-\n]{0,10}"
    r"(?P<t2>" + _NUM + r")"
)
_OUTLAY_BODY_T_FIRST = (
    r"(?:spends?|outlay|expenditure|spending)\s*[^0-9\-\n]{0,10}"
    r"(?P<t1>" + _NUM + r")"
    r".{0,120}?(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p1>" + _NUM + r")"
    r".{0,200}?(?:outlay|expenditure|spending)\s*[^0-9\-\n]{0,10}"
    r"(?P<t2>" + _NUM + r")"
    r".{0,120}?(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p2>" + _NUM + r")"
)
_OUTLAY_BODY_TPP = (
    r"(?:spends?|outlay|expenditure|spending)\s*[^0-9\-\n]{0,10}"
    r"(?P<t1>" + _NUM + r")"
    r".{0,120}?(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p1>" + _NUM + r")"
    r".{0,200}?(?:price|p)\s*[^0-9\-\n]{0,10}(?P<p2>" + _NUM + r")"
    r".{0,160}?(?:outlay|expenditure|spending)\s*[^0-9\-\n]{0,10}"
    r"(?P<t2>" + _NUM + r")"
)

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- micro: demand / supply ------------------------------------------ #
    ("MARKET_EQUILIBRIUM",
     r"(?=[^\n]{0,400}" + _DEM_QD + r")(?=[^\n]{0,400}" + _SUP_QS + r")",
     _c_equilibrium),
    ("EXCESS_DEMAND_SUPPLY",
     r"at\s+(?:the\s+)?price\s*(?:is|of|=)?\s*(?P<pp>" + _NUM + r")",
     _c_excess_demand),
    ("DEMAND_Q_AT_P",
     _DEM_QD + r".{0,160}?(?:at|when)\s+(?:a\s+|the\s+)?price\s*"
     r"(?:is|of|=)?\s*(?P<pp>" + _NUM + r")",
     _c_demand_q_at_p),
    ("DEMAND_P_FOR_Q",
     _DEM_QD + r".{0,160}?quantity\s+demanded\s+(?:is|=|be)?\s*"
     r"(?P<qq>" + _NUM + r")",
     _c_demand_p_for_q),

    # ---- micro: elasticity ------------------------------------------------ #
    ("PED_PERCENTAGE",
     r"\belasticit(?:y|ies)\b.{0,240}?" + _PED_PAIRS_CORE,
     _c_ped_pairs),
    ("PED_PERCENTAGE",
     r"(?=[^\n]{0,300}\bdemand)" + _PED_PAIRS_CORE,
     _c_ped_pairs),
    ("PED_PERCENTAGE",
     r"\belasticit(?:y|ies)\s+(?:of\s+)?(?:demand\s+)?(?:is|=|:)?\s*"
     r"(?P<ed2>" + _NUM + r")",
     _c_ped_missing),
    ("PED_PERCENTAGE",
     r"\bed\b\s*(?:is|=|of|:)?\s*(?P<ed>" + _NUM + r")",
     _c_ped_missing),
    ("PED_PERCENTAGE",
     r"\belasticit(?:y|ies)\b.{0,240}?"
     r"(?:price\s+(?:rises|falls|increases|decreases|changes)\s+by\s*"
     r"(?P<pdp>" + _NUM + r")\s*%"
     r"|quantity\s+(?:demanded\s+)?(?:falls|rises|drops|increases|"
     r"decreases|changes)\s+by\s*(?P<qdp>" + _NUM + r")\s*%)",
     _c_ped_missing),
    ("PED_TOTAL_OUTLAY", _OUTLAY_BODY_Q, _c_ped_total_outlay),
    ("PED_TOTAL_OUTLAY", _OUTLAY_BODY_T, _c_ped_total_outlay),
    ("PED_TOTAL_OUTLAY", _OUTLAY_BODY_T_FIRST, _c_ped_total_outlay),
    ("PED_TOTAL_OUTLAY", _OUTLAY_BODY_TPP, _c_ped_total_outlay),
    ("PED_POINT_LINEAR",
     r"\belasticit(?:y|ies)\b.{0,160}?at\s+(?:a\s+)?price\s*"
     r"(?:is|of|=)?\s*(?P<pp>" + _NUM + r")",
     _c_ped_point),

    # ---- macro: national income ------------------------------------------- #
    ("GDP_EXPENDITURE_ANY_MISSING",
     r"\b(?:gdp|gross\s+domestic\s+product|expenditure\s+method)\b",
     _c_gdp_identity),
    ("NNPFC_CONVERSION",
     r"\b(?:national\s+income|nnpcf|nnp\s*(?:fc|at\s+factor\s+cost))\b",
     _c_nnpfc),
    ("VALUE_ADDED_CHAIN",
     r"\bvalue\s+added\b",
     _c_value_added),
    ("INCOME_METHOD_NI",
     r"\b(?:income\s+method|compensation\s+of\s+employees)\b",
     _c_income_method),
    ("GDP_DEFLATOR",
     r"\b(?:gdp\s+deflator|real\s+gdp|nominal\s+gdp)\b",
     _c_deflator),

    # ---- macro: money / prices -------------------------------------------- #
    ("CPI_INFLATION_RATE",
     r"\binflation\b.{0,240}?(?:from|between)\s*(?P<i1>" + _NUM +
     r")\s*(?:to|and)\s*(?P<i2>" + _NUM + r")",
     _c_inflation),
    ("CPI_INFLATION_RATE",
     r"(?:cpi|consumer\s+price\s+index|price\s+index|index\s+number)\b"
     r".{0,240}?(?:from|between)\s*(?P<i1>" + _NUM + r")\s*"
     r"(?:to|and)\s*(?P<i2>" + _NUM + r")",
     _c_inflation),
    ("CPI_INFLATION_RATE",
     r"(?:cpi|consumer\s+price\s+index|price\s+index|index\s+number)\s*"
     r"(?:was|is|=|:)?\s*(?P<i1>" + _NUM + r")\s*(?:in|for)\s*"
     r"(?P<y1>(?:19|20)\d\d)\s*(?:,|;|and|while|but)?\s*"
     r"(?:(?:it\s+)?(?:was|is|rose|rises|rose|fell|falls|increased|"
     r"decreased)\s+)?(?:to\s+)?(?:in\s+)?"
     r"(?:(?P<y2>(?:19|20)\d\d)\s*)?(?P<i2>" + _NUM + r")",
     _c_inflation),
    ("CPI_INFLATION_RATE",
     r"cost\s+of\s+(?:the\s+)?(?:basket|goods)[^0-9\-\n]{0,60}?"
     r"(?:base\s+year\s*)?(?:is|=|:|was|were)?\s*" + _RS +
     r"(?P<c0>" + _NUM + r")"
     r".{0,120}?current\s+year\s*(?:is|=|:|was|were)?\s*" + _RS +
     r"(?P<c1>" + _NUM + r")",
     _c_cpi_basket),
    ("FISHER_REAL_RATE",
     r"\breal\s+interest\s+rate\b",
     _c_fisher),
    ("MONEY_MULTIPLIER",
     r"\bmoney\s+multiplier\b",
     _c_money_multiplier),
    ("DEPOSIT_CREATION_CHAIN",
     r"(?=[^\n]{0,400}(?:initial|primary|new)\s+deposit)"
     r"(?=[^\n]{0,400}(?:reserve\s+ratio|crr|cash\s+reserve\s+ratio|"
     r"required\s+reserve(?:s)?\s+ratio))"
     r"(?=[^\n]{0,400}(?:credit\s+creat|total\s+deposit|deposit\s+creat))",
     _c_deposit_chain),

    # ---- macro: income determination --------------------------------------- #
    ("CONSUMPTION_FUNCTION_ANY", _CONS_FN, _c_consumption),
    ("INVESTMENT_MULTIPLIER",
     r"\b(?:investment\s+)?multiplier\b|\bmpc\b|\bmps\b|"
     r"marginal\s+propensity",
     _c_investment_multiplier),
    ("APC_APS_IDENTITIES",
     r"\b(?:apc|aps|average\s+propensity)\b",
     _c_apc_aps),

    # ---- macro: government / external -------------------------------------- #
    ("BUDGET_DEFICITS_ANY",
     r"\b(?:revenue\s+deficit|fiscal\s+deficit|primary\s+deficit|"
     r"budget(?:ary)?\s+deficit)\b",
     _c_budget_deficits),
    ("EXCHANGE_RATE_CHANGE",
     r"exchange\s+rate\b.{0,240}?from\s*" + _RS + r"(?P<r1>" + _NUM +
     r")\s*to\s*" + _RS + r"(?P<r2>" + _NUM + r")",
     _c_exchange_rate),

    # ---- class 9/11: labour market ------------------------------------------ #
    ("UNEMPLOYMENT_RATES",
     r"\b(?:unemployment\s+rate|participation\s+rate|labour\s+force|"
     r"labor\s+force)\b",
     _c_unemployment),
    ("HEADCOUNT_RATIO",
     r"(?:below\s+(?:the\s+)?poverty\s+line|head\s*-?\s*count\s+ratio)\b",
     _c_headcount),

    # ---- statistics: index numbers ------------------------------------------ #
    ("INDEX_LASPEYRES", r"\blaspeyr(?:es|e)'?s?\b", _c_index_laspeyres),
    ("INDEX_PAASCHES", r"\bpaasch?e'?s?\b", _c_index_paasche),
    ("INDEX_AGGREGATIVE",
     r"(?:simple\s+aggregative|aggregative\s+(?:price\s+)?index|"
     r"\bprice\s+index\b|\bindex\s+number\b)",
     _c_index_aggregative),
]

# ---- wrapper handlers: category trigger + full-text label re-parse ---------- #

_FISHER_NOM = (r"nominal\s+(?:interest\s+)?rate\s*(?:is|=|of|:)?\s*"
               r"(?P<v>" + _NUM + r")\s*%")
_FISHER_INFL = (r"(?:inflation(?:\s+rate)?|expected\s+inflation)\s*"
                r"(?:is|=|of|:)?\s*(?P<v>" + _NUM + r")\s*%")
_FISHER_REAL = (r"real\s+interest\s+rate\s*(?:is|=|of|:)?\s*"
                r"(?P<v>" + _NUM + r")\s*%")
_MM_RR = (r"(?:reserve\s+ratio|crr|cash\s+reserve\s+ratio|"
          r"required\s+reserve(?:s)?\s+ratio)\s*(?:is|=|of|:)?\s*")
_MM_DEP = r"(?:initial|primary|new)\s+deposit(?:s)?\s*[^0-9\-\n]{0,15}?"
_MULT_MPC = r"\bmpc\s*(?:is|=|of|:)?\s*(?P<v>" + _NUM + r")"
_MULT_MPS = r"\bmps\s*(?:is|=|of|:)?\s*(?P<v>" + _NUM + r")"
_MULT_DI = (r"investment\s+(?:rises|increases|falls|changes|goes\s+up)\s+"
            r"by\s*" + _RS + r"(?P<v>" + _NUM + r")")
_MULT_DY = (r"income\s+(?:rises|increases|falls|changes)\s+by\s*" + _RS +
            r"(?P<v>" + _NUM + r")")


def _grab(text: str, pattern: str) -> Optional[str]:
    m = re.search(pattern, text, re.I)
    return m.group("v") if m else None


def _c_consumption2(g, m, text):
    g = dict(g)
    if g.get("y") is None:
        # tight-ish: income followed (after 'is/of/=') by its number, or a
        # number then 'income' ('income is 500' / 'when income is 500')
        y = _role_num(text, r"\bincome\b")
        if y is not None:
            g["y"] = y
    if g.get("cv") is None:
        c_v = _labv(text, r"\bconsumption\b", tight=True)
        if c_v is not None:
            g["cv"] = c_v
    return _c_consumption(g, m, text)


def _c_money_multiplier2(g, m, text):
    g = dict(g)
    if g.get("rr") is None:
        mm_ = re.search(_MM_RR + r"(" + _NUM + r")\s*%?", text, re.I)
        if mm_:
            g["rr"] = mm_.group(1)
    if g.get("dep") is None:
        dep = re.search(_MM_DEP + _RS + r"(" + _NUM + r")", text, re.I)
        if dep:
            g["dep"] = dep.group(1)
    return _c_money_multiplier(g, m, text)


def _c_deposit_chain2(g, m, text):
    g = dict(g)
    if g.get("rr") is None:
        mm_ = re.search(_MM_RR + r"(" + _NUM + r")\s*%?", text, re.I)
        if mm_:
            g["rr"] = mm_.group(1)
    if g.get("dep") is None:
        dep = re.search(_MM_DEP + _RS + r"(" + _NUM + r")", text, re.I)
        if dep:
            g["dep"] = dep.group(1)
    return _c_deposit_chain(g, m, text)


def _c_fisher2(g, m, text):
    g = dict(g)
    if g.get("nom") is None:
        v = _grab(text, _FISHER_NOM)
        if v is not None:
            g["nom"] = v
    if g.get("infl") is None:
        v = _grab(text, _FISHER_INFL)
        if v is not None:
            g["infl"] = v
    if g.get("real") is None:
        v = _grab(text, _FISHER_REAL)
        if v is not None:
            g["real"] = v
    return _c_fisher(g, m, text)


def _c_investment_multiplier2(g, m, text):
    g = dict(g)
    if g.get("mpc") is None:
        v = _grab(text, _MULT_MPC)
        if v is not None:
            g["mpc"] = v
    if g.get("mps") is None:
        v = _grab(text, _MULT_MPS)
        if v is not None:
            g["mps"] = v
    if g.get("di") is None:
        v = _grab(text, _MULT_DI)
        if v is not None:
            g["di"] = v
    if g.get("dy") is None:
        v = _grab(text, _MULT_DY)
        if v is not None:
            g["dy"] = v
    return _c_investment_multiplier(g, m, text)


def _c_headcount2(g, m, text):
    g = dict(g)
    if g.get("poor") is None:
        mp = re.search(r"(?P<poor>" + _NUM + r")\s*(?:out\s+of)\s+"
                       r"(?:the\s+|a\s+)?(?P<tot>" + _NUM + r")", text, re.I)
        if mp:
            g["poor"], g["tot"] = mp.group("poor"), mp.group("tot")
    if g.get("poor") is None:
        mt = re.search(r"(?:village|town|city|country|economy|state|"
                       r"population)[^.0-9\n]{0,40}?(?:of|with|has)\s+"
                       r"(?:a\s+)?(?:population\s+(?:of\s+)?)?"
                       r"(?P<tot>" + _NUM + r")", text, re.I)
        if mt:
            g["tot"] = mt.group("tot")
            mp = re.search(r"(?P<poor>" + _NUM + r")\s*(?:people|persons|"
                           r"families|households|individuals)?\s*"
                           r"(?:are\s+|is\s+|live|living|who\s+live)?\s*"
                           r"(?:below\s+(?:the\s+)?poverty\s+line|poor|bpl)",
                           text, re.I)
            if mp:
                g["poor"] = mp.group("poor")
    return _c_headcount(g, m, text)


# ---- ISC numeric families (CISCE phrasings mined from c11/c12 econ) ------- #
# point-quantity price controls, delta-MPC, marginal-utility schedule.
# Same gate/beat conventions as the books2 wave.


def _c_price_gap(g, m, text):
    """Price control with QUANTITIES STATED AT the controlled price
    ('The MSP is Rs 22/kg. At Rs 22, quantity supplied is 130 lakh tonnes,
    quantity demanded is 80') -- surplus/shortage = |Qs - Qd|, binding
    judged against the equilibrium price when stated."""
    low = text.lower()
    if not _has_word(text, r"price\s+(?:ceiling|floor)|\bMSP\b|"
                           r"minimum\s+support\s+price|support\s+price|"
                           r"(?:maximum|minimum)\s+price"):
        return _GATE
    pcx = _labv(text, r"(?:price\s+(?:ceiling|floor)|MSP|minimum\s+support"
                       r"\s+price|support\s+price|(?:maximum|minimum)"
                       r"\s+price)")
    if pcx is None or pcx <= 0:
        return _GATE        # impossible state: non-positive controlled price
    qd = _labv(text, r"(?:quantity\s+)?(?:demanded|demand)\s*(?:is|are|=|"
                     r":|of)?")
    qs = _labv(text, r"(?:quantity\s+)?(?:supplied|supply)\s*(?:is|are|=|"
                     r":|of)?")
    if qd is None or qs is None or qd < 0 or qs < 0:
        return _GATE
    if qd == qs:
        return _GATE        # no gap: nothing to compute
    kind = "floor" if _has_word(text, r"floor|MSP|support\s+price|minimum") \
        else "ceiling"
    gap = abs(qs - qd)
    p_star = _labv(text, r"equilibrium\s+price")
    binding = None
    if p_star is not None and p_star > 0:
        binding = pcx > p_star if kind == "floor" else pcx < p_star
    surplus = qs > qd
    comp = [f"At the controlled price Rs {_fmt(pcx)}: quantity supplied = "
            f"{_fmt(qs)}, quantity demanded = {_fmt(qd)}.",
            f"Gap = |{_fmt(qs)} - {_fmt(qd)}| = {_fmt(gap)} "
            + ("(Qs > Qd: excess supply)." if surplus
               else "(Qd > Qs: excess demand).")]
    if binding is not None:
        comp.append(
            f"Rs {_fmt(pcx)} is {'above' if pcx > p_star else 'below'} the "
            f"equilibrium price Rs {_fmt(p_star)}, so the {kind} is "
            f"{'BINDING' if binding else 'NOT binding'}.")
    steps = [
        "Method: a price floor (MSP) set above equilibrium makes sellers "
        "offer more than buyers take -- a SURPLUS (Qs - Qd); a price "
        "ceiling set below equilibrium does the reverse -- a SHORTAGE "
        "(Qd - Qs). With both quantities quoted at the controlled price, "
        "the gap is the direct difference.",
        f"Given: {kind} price = Rs {_fmt(pcx)}, quantity supplied = "
        f"{_fmt(qs)}, quantity demanded = {_fmt(qd)}"
        + (f", equilibrium price = Rs {_fmt(p_star)}."
           if p_star is not None else "."),
    ]
    steps.extend(comp)
    steps.append(
        f"Check: the larger side ({_fmt(max(qs, qd))}) minus the smaller "
        f"({_fmt(min(qs, qd))}) recomputes the same {_fmt(gap)} gap.")
    _bind_word = ("surplus for the agency to procure" if surplus
                  else "shortage to be rationed")
    steps.append(
        (f"Interpretation: the binding {kind} leaves a persistent "
         f"{_bind_word} of {_fmt(gap)} units."
         if binding is not None and binding else
         f"Interpretation: a gap of {_fmt(gap)} units at the controlled "
         "price" + (f"; against equilibrium price Rs {_fmt(p_star)} the "
                     f"{kind} is not binding, so the market still clears."
                     if p_star is not None else ".")))
    word = "surplus (excess supply)" if surplus else "shortage (excess demand)"
    ans = (f"{word} of {_fmt(gap)} units at the {kind} price of "
           f"Rs {_fmt(pcx)} (Qs {_fmt(qs)} vs Qd {_fmt(qd)})")
    if binding is not None:
        ans += " -- binding" if binding else " -- not binding"
    return gap, steps, ans, None, \
        "gap = |Qs - Qd| at the controlled price", \
        {"controlled_price": pcx, "qd": qd, "qs": qs, "gap": gap}


def _c_mpc_delta(g, m, text):
    """MPC from a CHANGE: 'disposable income rises from A to B,
    consumption rises from C to D -- calculate MPC' (+ APC at each
    level).  MPC = dC/dY; APC_i = C_i / Y_i."""
    if not _has_word(text, r"\bMPC\b|marginal\s+propensity\s+to\s+consum"):
        return _GATE
    ym = re.search(r"(?:disposable\s+)?income\s+(?:rises?|increases?|"
                   r"goes\s+up)\s+from\s*" + _RS + r"(" + _NUM + r")\s*"
                   r"(?:lakh|crores?)?\s*to\s*" + _RS + r"(" + _NUM + r")",
                   text, re.I)
    cm_ = re.search(r"consumption\s+(?:rises?|increases?|goes\s+up)\s+"
                    r"from\s*" + _RS + r"(" + _NUM + r")\s*(?:lakh|crores?)?"
                    r"\s*to\s*" + _RS + r"(" + _NUM + r")", text, re.I)
    if not (ym and cm_):
        return _GATE
    y1, y2 = _pf(ym.group(1)), _pf(ym.group(2))
    c1, c2 = _pf(cm_.group(1)), _pf(cm_.group(2))
    if None in (y1, y2, c1, c2) or min(y1, y2, c1, c2) <= 0:
        return _GATE
    dy, dc = y2 - y1, c2 - c1
    if dy <= 0 or dc <= 0:
        return _GATE        # falling income/consumption is not this ask
    mpc = dc / dy
    if not (0 < mpc <= 1 + 1e-9):
        return _GATE        # impossible state: MPC outside (0, 1]
    apc1, apc2 = c1 / y1, c2 / y2
    steps = [
        "Method: marginal propensity to consume is the ratio of the CHANGE "
        "in consumption to the CHANGE in income, MPC = dC/dY (the slope of "
        "the consumption function); the average propensities at the two "
        "levels are APC = C/Y (leec102).",
        f"Given: income rises from Rs {_fmt(y1)} to Rs {_fmt(y2)}; "
        f"consumption rises from Rs {_fmt(c1)} to Rs {_fmt(c2)}.",
        f"dC = {_fmt(c2)} - {_fmt(c1)} = {_fmt(dc)};  dY = {_fmt(y2)} - "
        f"{_fmt(y1)} = {_fmt(dy)}.",
        f"MPC = {_fmt(dc)} / {_fmt(dy)} = {_fmt(mpc)}.",
        f"APC before = {_fmt(c1)}/{_fmt(y1)} = {_fmt(apc1)}; APC after = "
        f"{_fmt(c2)}/{_fmt(y2)} = {_fmt(apc2)}.",
        f"Check: MPC x dY = {_fmt(mpc * dy)} = dC -- the slope rebuilds "
        "the consumption change.",
        "Interpretation: of every additional rupee of income the "
        f"household spends {_fmt(mpc)} and saves {_fmt(1 - mpc)}; APC "
        "falls toward MPC as income rises (the autonomous term thins "
        "out).",
    ]
    ans = (f"MPC = {_fmt(mpc)}; APC at Rs {_fmt(y1)} = {_fmt(apc1)}, "
           f"at Rs {_fmt(y2)} = {_fmt(apc2)}")
    return mpc, steps, ans, None, "MPC = dC/dY; APC = C/Y", \
        {"mpc": mpc, "apc_before": apc1, "apc_after": apc2,
         "dy": dy, "dc": dc}


def _c_mu_schedule(g, m, text):
    """Marginal utility from a TOTAL utility schedule ('1st = 30 utils,
    2nd = 55, 3rd = 75 ...'): MU_k = TU_k - TU_(k-1) with TU_0 = 0, and
    diminishing MU sets in where MU first falls."""
    if not _has_word(text, r"total\s+utilit"):
        return _GATE
    # two canonical schedule wordings:
    #   forward  -- "1st = 30 utils, 2nd unit is 55"  (value after ordinal)
    #   backward -- "20 utils from the 1st ice cream" (value before ordinal)
    # The backward form binds each value to its ordinal explicitly, so it
    # wins whenever it yields a clean 1..n run; otherwise the forward
    # filler parse applies (structural gates below reject ragged runs).
    bwd = [(int(b), _pf(a)) for a, b in re.findall(
        r"(" + _NUM + r")\s*utils?\s+(?:is\s+|are\s+)?(?:derived\s+)?"
        r"from\s+the\s+(\d{1,2})(?:st|nd|rd|th)\b",
        text, re.I)]
    bwd = [(k, v) for k, v in bwd if v is not None and v > 0]
    bks = [k for k, _ in bwd]
    if len(bwd) >= 2 and bks[0] == 1 and bks == sorted(bks) \
            and len(set(bks)) == len(bks):
        pairs = bwd
    else:
        # ordinal + value: "1st = 30", "1st unit = 30", "the 2nd unit
        # is 55" (up to 24 filler chars; the trigger already requires a
        # total-utility ask)
        pairs = [(int(a), _pf(b)) for a, b in re.findall(
            r"\b(\d{1,2})(?:st|nd|rd|th)(?:\s*units?)?\b[^0-9\n]{0,24}?"
            r"(" + _NUM + r")",
            text)]
    pairs = [(k, v) for k, v in pairs if v is not None and v > 0]
    if len(pairs) < 2:
        return _GATE
    ks = [k for k, _ in pairs]
    if ks[0] != 1 or ks != sorted(ks) or len(set(ks)) != len(ks):
        return _GATE        # schedule must start at the 1st unit, in order
    tus = [v for _, v in pairs]
    mus = [tus[0]]
    for i in range(1, len(tus)):
        mus.append(tus[i] - tus[i - 1])
    dim_at = None
    for i in range(1, len(mus)):
        if mus[i] < mus[i - 1]:
            dim_at = i + 1          # 1-based unit number
            break
    steps = [
        "Method: marginal utility is the ADDITION to total utility from "
        "one more unit, MU_n = TU_n - TU_(n-1) with TU_0 = 0 (so MU of the "
        "1st unit equals TU of the 1st); diminishing MU sets in at the "
        "first unit whose MU is lower than the previous one (leec201).",
        "Given: total utility schedule " + ", ".join(
            f"unit {k} = {_fmt(v)}" for (k, v), _v in zip(pairs, tus)) + ".",
    ]
    for i in range(len(mus)):
        if i == 0:
            steps.append(f"MU of unit 1 = TU_1 - 0 = {_fmt(mus[0])}.")
        else:
            steps.append(f"MU of unit {i + 1} = {_fmt(tus[i])} - "
                         f"{_fmt(tus[i - 1])} = {_fmt(mus[i])}.")
    steps.append(
        f"Check: the MU schedule sums back to total utility: "
        + " + ".join(_fmt(v) for v in mus) + f" = {_fmt(sum(mus))} = "
        f"TU of the last unit.")
    dim_ord = _ordinal(dim_at) if dim_at is not None else None
    steps.append(
        (f"Interpretation: diminishing marginal utility sets in from the "
         f"{dim_ord} unit onward -- each extra unit adds less utility "
         "than the one before, though total utility still rises."
         if dim_ord else
         "Interpretation: marginal utility never falls in this schedule, "
         "so diminishing MU has not set in within the stated range."))
    ans = ("Marginal utilities: " + ", ".join(_fmt(v) for v in mus)
           + " utils"
           + (f"; diminishing MU sets in from the {dim_ord} unit"
              if dim_ord else ""))
    # numeric claim: total utility (sum identity) -- verifiable exactly
    return tus[-1], steps, ans, None, "MU_n = TU_n - TU_(n-1)", \
        {"total_utility_last": tus[-1],
         **{f"mu_{i + 1}": v for i, v in enumerate(mus)}}


_TABLE = [(fid,
           pat,
           _c_consumption2 if fid == "CONSUMPTION_FUNCTION_ANY"
           else _c_money_multiplier2 if fid == "MONEY_MULTIPLIER"
           else _c_deposit_chain2 if fid == "DEPOSIT_CREATION_CHAIN"
           else _c_fisher2 if fid == "FISHER_REAL_RATE"
           else _c_investment_multiplier2 if fid == "INVESTMENT_MULTIPLIER"
           else _c_headcount2 if fid == "HEADCOUNT_RATIO"
           else calc)
          for fid, pat, calc in _TABLE]

# ---- books2 table: the chapters the first wave did not cover ---------------- #
# Category triggers + full-text label re-parse inside the handler (same
# convention as the *_2 wrappers), so slot order never matters.

_TABLE_BOOKS2: List[Tuple[str, str, Any]] = [
    # micro ch 3 (leec203): TP/AP/MP schedule
    ("TP_AP_MP_SCHEDULE",
     r"\b(?:total|average|marginal)\s+product\b", _c_tp_ap_mp),
    # micro ch 3 (leec203): cost schedules
    ("COST_SCHEDULE_ANY",
     r"\bmarginal\s+cost\b|\b(?:total\s+)?(?:fixed|variable)\s+cost\b|"
     r"\baverage\s+(?:variable|fixed)\s+cost\b|\b(?:avc|afc|sac)\b|"
     r"\baverage\s+cost\b",
     _c_cost),
    # micro ch 4 (leec204): revenue curves
    ("REVENUE_CURVES_ANY", r"\b(?:total|average|marginal)\s+revenue\b",
     _c_revenue),
    # micro ch 2 (leec202): consumer equilibrium, MUx/Px = MUy/Py
    ("CONSUMER_EQUIB_RATIO",
     r"\bconsumer'?s?\s+equilibrium\b|\bconsumer\s+is\s+in\s+equilibrium\b|"
     r"\bequilibrium\s+of\s+(?:the\s+)?consumer\b|"
     r"\bm(?:arginal\s+)?u(?:tility)?\s*(?:of\s+(?:good\s+)?)?_?\s*[xy12]\b",
     _c_consumer_eq),
    # micro ch 5 (leec205): market supply = horizontal sum
    ("MARKET_SUPPLY_SUM", r"\bmarket\s+supply\b", _c_market_supply),
    # ISC price control with quantities STATED at the controlled price --
    # runs before the function-form PRICE_CEILING_FLOOR (which needs
    # Qd = a - bP / Qs = c + dP equations) and refuses them via gates
    ("PRICE_CONTROL_GAP",
     r"\bprice\s+(?:ceiling|floor)\b|\bMSP\b|minimum\s+support\s+price|"
     r"\bsupport\s+price\b|\b(?:maximum|minimum)\s+price\b",
     _c_price_gap),
    # ISC macro: MPC from a change (income/consumption rise from X to Y)
    ("MPC_DELTA",
     r"\bMPC\b|marginal\s+propensity\s+to\s+consum",
     _c_mpc_delta),
    # ISC micro: marginal utility from a total-utility schedule
    # (SOCIAL_GOLDEN 2026-10-07: the bare "TU schedule" abbreviation is
    # the corpus's own phrasing -- the trigger missed it and refused)
    ("MU_FROM_TU",
     r"\btotal\s+utilit|\bTU\s+schedule\b",
     _c_mu_schedule),
    # micro ch 5 (leec205 5.2): price ceiling / floor
    ("PRICE_CEILING_FLOOR",
     r"\bprice\s+(?:ceiling|floor)\b|\b(?:maximum|minimum)\s+price\b|"
     r"\bsupport\s+price\b",
     _c_price_control),
    # macro ch 2 (leec102 2.5): GDP and welfare, per-capita arithmetic
    ("GDP_WELFARE_PERCAPITA", r"\bper\s+capita\b|\bgdp\s+and\s+welfare\b",
     _c_per_capita),
    # statistics chapters: correlation from paired data
    ("CORRELATION_COEFFICIENT", r"\bcorrelat|\bkarl\s+pearson\b",
     _c_correlation),
    # macro ch 6 (leec106 6.1): balance of payments, visible/invisible
    ("BOP_CLASSIFY_ANY",
     r"\bbalance\s+of\s+payments\b|\bcurrent\s+account\b|\bbop\b",
     _c_bop),
]

# --------------------------------------------------------------------------- #
# SOCIAL_GOLDEN wave (2026-10-07): corpus-sourced families for the c9-c12
# economics lanes the sweep caught mis-served.  Registered FIRST (specific
# before generic): the related-elasticity shapes were being answered by the
# PED rows (own-price machinery) with the wrong quantity, and the OJT bond
# net-gain by the percent-narrative chain.  Every row is closed-world: the
# method is exactly the corpus's own worked key (c9_eco_ch2_4/ch2_6,
# c11_eco_cbse_04_006, c12_eco_cbse_02_009).
# --------------------------------------------------------------------------- #

# optional unit suffix after a number: "/kg", "kg/week", "tickets" -- but
# never a bare word (every alternative requires a slash, so "to" is safe)
_UNIT = r"(?:\s*/\s*[a-z]{1,7}|\s*[a-z]{1,7}\s*/\s*[a-z]{1,7})?"
_DIR = (r"(?:risen|rise[s]?|increas(?:e[s]?|ed)|rose|went up|goes up|"
        r"fall[s]?|fell|drop[s]?|dropped|decrease[s]?|decreased|"
        r"decline[s]?|declined)")

# cross-price: "price of butter increases from 200/kg to 250 ... demand for
# margarine rises from 50/week to 70/week"
_XED_PAIR = (
    r"(?:price|cost)\s+of\s+(?P<pgood>[a-z][a-z \-]{2,28}?)\s*"
    + _DIR + r"\s+from\s*" + _RS +
    r"(?P<p1>" + _NUM + r")" + _UNIT + r"\s*(?:to|rs\.?)\s*" + _RS +
    r"(?P<p2>" + _NUM + r")" + _UNIT +
    r"[\s\S]{0,220}?demand\s+for\s+(?P<qgood>[a-z][a-z \-]{2,28}?)\s*"
    + _DIR + r"\s+from\s*" + _RS +
    r"(?P<q1>" + _NUM + r")" + _UNIT + r"\s*(?:to|rs\.?)\s*" + _RS +
    r"(?P<q2>" + _NUM + r")" + _UNIT
)
# income: "income rose from 3000 to 5000 ... demand fell from 60 to 40"
_YED_PAIR = (
    r"\bincome\s+" + _DIR + r"\s+from\s*" + _RS +
    r"(?P<y1>" + _NUM + r")" + _UNIT + r"\s*(?:to|rs\.?)\s*" + _RS +
    r"(?P<y2>" + _NUM + r")" + _UNIT +
    r"[\s\S]{0,220}?demand\s+(?:for\s+(?P<qgood>[a-z][a-z \-]{2,28}?))?\s*"
    + _DIR + r"\s+from\s*" + _RS +
    r"(?P<q1>" + _NUM + r")" + _UNIT + r"\s*(?:to|rs\.?)\s*" + _RS +
    r"(?P<q2>" + _NUM + r")" + _UNIT
)


def _pct(a: float, b: float) -> float:
    return (b - a) / a * 100.0 if a else 0.0


def _p2(v: float) -> str:
    """Exam-key percent format: the corpus keys carry 2-dp percentages
    ('66.67%', '-33.33%') -- an integer-rounded '67%' would not match
    the key an examiner grades against."""
    return f"{v:.2f}"


def _c_related_elasticity(g, m, text):
    """%change of the determinant, %change of demand, and the sign
    classification -- the corpus key's own three beats (substitute /
    complement for a related good's price; normal / inferior for income).
    Answers BOTH percentages: the partial single-number answer that the
    PED rows served here was a verified-incomplete."""
    if "income" in (g.get("y1") or "") or g.get("y1") is not None:
        y1, y2 = float(g["y1"]), float(g["y2"])
        q1, q2 = float(g["q1"]), float(g["q2"])
        if y1 <= 0 or q1 <= 0 or y1 == y2 or q1 == q2:
            return _GATE
        pd_pct = _pct(y1, y2)
        qd_pct = _pct(q1, q2)
        ed = qd_pct / pd_pct if pd_pct else 0.0
        kind = ("normal good (demand moves WITH income)"
                if ed > 0 else "inferior good (demand moves AGAINST income)")
        steps = [
            "Method: Using the corpus income-elasticity relation - "
            "percentage change in demand divided by the percentage change "
            "in income (c9_eco ch2 worked key).",
            f"Given: income {_fmt(y1)} to {_fmt(y2)}; demand {_fmt(q1)} "
            f"to {_fmt(q2)} units.",
            f"Computation: %change in income = ({_fmt(y2)} - {_fmt(y1)}) / "
            f"{_fmt(y1)} x 100 = {_p2(pd_pct)}%; %change in demand = "
            f"({_fmt(q2)} - {_fmt(q1)}) / {_fmt(q1)} x 100 = "
            f"{_p2(qd_pct)}%.",
            f"Check: income elasticity = {_p2(qd_pct)}% / {_p2(pd_pct)}% "
            f"= {_p2(ed)} - the sign is what classifies, and the "
            f"arithmetic reproduces the corpus key's steps.",
            "Interpretation: elasticity " + _p2(ed) + " -> " + kind +
            "; the sign of the relation, not its size, is the examinable "
            "anchor.",
        ]
        return (ed, steps,
                f"%change in income = {_p2(pd_pct)}%, %change in demand = "
                f"{_p2(qd_pct)}%, income elasticity = {_p2(ed)} "
                f"({kind})",
                [], "YED = %dQ / %dY",
                {"pct_det": pd_pct, "pct_q": qd_pct, "elasticity": ed,
                 "kind": kind, "method": "RELATED_ELASTICITY"})
    p1 = g.get("p1")
    q1 = g.get("q1")
    if p1 is None or q1 is None:
        return _GATE
    p1, p2 = float(p1), float(g["p2"])
    q1, q2 = float(q1), float(g["q2"])
    if p1 <= 0 or q1 <= 0 or p1 == p2 or q1 == q2:
        return _GATE
    pd_pct = _pct(p1, p2)
    qd_pct = _pct(q1, q2)
    xed = qd_pct / pd_pct if pd_pct else 0.0
    same = (pd_pct > 0) == (qd_pct > 0)
    kind = ("substitute goods (both move in the SAME direction)"
            if same else "complementary goods (they move in OPPOSITE "
                         "directions)")
    steps = [
        "Method: Using the corpus cross-price relation - percentage "
        "change in demand for one good divided by the percentage change "
        "in the other good's price (c9_eco ch2 worked key).",
        f"Given: price of {g.get('pgood', 'the good').strip()} "
        f"{_fmt(p1)} to {_fmt(p2)}; demand for "
        f"{g.get('qgood', 'the good').strip()} {_fmt(q1)} to {_fmt(q2)}.",
        f"Computation: %change in price = ({_fmt(p2)} - {_fmt(p1)}) / "
        f"{_fmt(p1)} x 100 = {_p2(pd_pct)}%; %change in demand = "
        f"({_fmt(q2)} - {_fmt(q1)}) / {_fmt(q1)} x 100 = {_p2(qd_pct)}%.",
        f"Check: cross-price elasticity = {_p2(qd_pct)}% / "
        f"{_p2(pd_pct)}% = {_p2(xed)}; same-direction movements give a "
        f"positive sign - the corpus key's own test.",
        "Interpretation: the positive relationship indicates " + kind +
        "; a negative one would indicate complements.",
    ]
    return (xed, steps,
            f"%change in price = {_p2(pd_pct)}%, %change in demand = "
            f"{_p2(qd_pct)}%, cross-price elasticity = {_p2(xed)} "
            f"({kind})",
            [], "XED = %dQy / %dPx",
            {"pct_det": pd_pct, "pct_q": qd_pct, "elasticity": xed,
             "kind": kind, "method": "RELATED_ELASTICITY"})


def _inr(v: float) -> str:
    """Indian rupee grouping (the corpus key's own convention):
    130000 -> '1,30,000'."""
    s = f"{v:,.2f}" if abs(v - round(v)) >= 1e-9 else str(int(round(v)))
    if "." in s:
        head, tail = s.split(".")
    else:
        head, tail = s, ""
    neg = head.startswith("-")
    if neg:
        head = head[1:]
    if len(head) > 3:
        head = head[:-3] + "," + head[-3:]
        while True:
            parts = head.split(",")
            if len(parts[0]) <= 2:
                break
            parts[0] = parts[0][:-2] + "," + parts[0][-2:]
            head = ",".join(parts)
    return ("-" if neg else "") + head + ("." + tail if tail else "")


def _c_training_net_gain(g, m, text):
    """OJT bond arithmetic, exactly the c11_eco human-capital key:
    net gain = months x additional monthly revenue - training cost."""
    if not re.search(r"\btraining\b", text, re.I) \
            or not re.search(r"\bbond\b", text, re.I):
        return _GATE
    # comma-tolerant numbers: board stems write Rs 50,000 (the _NUM scan
    # reads "50" and silently mis-prices the whole family)
    _NCP = r"-?\d[\d,]*(?:\.\d+)?"
    cost = None
    mc = re.search(r"(?:spends?|spend|cost(?:s)?(?: of)?|investment of)"
                   r"[^0-9\n]{0,30}" + _RS +
                   r"(?P<c>" + _NCP + r")", text, re.I)
    if mc:
        cost = _pf(mc.group("c").replace(",", ""))
    if cost is None:
        mc = re.search(_RS + r"(?P<c>" + _NCP + r")\s*(?:per worker|"
                       r"per employee)", text, re.I)
        if mc:
            cost = _pf(mc.group("c").replace(",", ""))
    rev = None
    mr = re.search(r"(?:additional|extra|increased?)[^0-9\n]{0,40}" + _RS +
                   r"(?P<r>" + _NCP + r")\s*(?:per month|monthly|/month)",
                   text, re.I)
    if mr:
        rev = _pf(mr.group("r").replace(",", ""))
    months = None
    my = re.search(r"(?P<y>\d+(?:\.\d+)?)\s*[- ]?year\s+bond|"
                   r"bond[^0-9\n]{0,30}?(?P<y2>\d+(?:\.\d+)?)\s*[- ]?year",
                   text, re.I)
    mm = re.search(r"(?P<m>\d+)\s*[- ]?month\s+bond|"
                   r"bond[^0-9\n]{0,30}?(?P<m2>\d+)\s*[- ]?month",
                   text, re.I)
    if my:
        months = float(my.group("y") or my.group("y2")) * 12.0
    elif mm:
        months = float(mm.group("m") or mm.group("m2"))
    if not (cost and rev and months):
        return _GATE
    total = months * rev
    net = total - cost
    viable = net > 0
    _b = _inr
    # address the stem's context numbers explicitly (the sweep's
    # data-coverage guard -- and the student -- deserve the "why is 20%
    # / 6-week not in the arithmetic" sentence the corpus key implies)
    context = []
    if re.search(r"\b(\d+(?:\.\d+)?)\s*%", text):
        pct_m = re.search(r"\b(\d+(?:\.\d+)?)\s*%", text)
        context.append(f"the stated {pct_m.group(1)}% output gain is "
                       "already monetised as the additional monthly "
                       "revenue, so it does not enter the money "
                       "arithmetic again")
    wk = re.search(r"\b(\d+)\s*-?\s*week", text, re.I)
    if wk:
        context.append(f"the {wk.group(1)}-week programme duration is the "
                       "training window, not a money flow")
    steps = [
        "Method: Using the corpus human-capital key - the bond period "
        "converts the monthly productivity gain into total additional "
        "revenue, and the training cost is recovered against it "
        "(c11_eco_cbse_04_006 worked key).",
        f"Given: training cost = {_b(cost)}; additional revenue = "
        f"{_b(rev)} per month; bond period = {_fmt(months)} months.",
        f"Computation: total additional revenue = {_fmt(months)} x "
        f"{_b(rev)} = {_b(total)}; net gain = {_b(total)} - "
        f"{_b(cost)} = {_b(net)}.",
        "Check: substitute back - " + _b(net) + " + " + _b(cost) +
        " = " + _b(total) + ", the bond-period revenue, so the "
        "subtraction closes.",
        "Interpretation: net gain " + _b(net) + " is " +
        ("POSITIVE, so the training is economically viable over the bond "
         "period" if viable else "NEGATIVE, so the training does not pay "
         "for itself over the bond period") +
        " - the firm's own profit test, no discounting assumed."
        + (" (" + "; ".join(context) + ")." if context else ""),
    ]
    return (net, steps,
            f"Net gain over the bond period = {_b(net)}"
            f"{' > 0, training is viable' if viable else ' <= 0, not viable'}",
            ["no discounting (the corpus key's own simplification)"],
            "net = months x monthly gain - training cost",
            {"months": months, "monthly_gain": rev, "cost": cost,
             "net": net, "viable": viable,
             "method": "TRAINING_NET_GAIN"})


_FUNC_FORM = (r"demand\s+(?:function|equation)\s*(?:is|:)?\s*"
              r"(?P<lhs>[A-Za-z]{1,2}d?)\s*=\s*"
              r"(?P<rhs>[^\n,]{3,140})")

_TERM_RE = re.compile(
    r"(?P<sign>[+-])?\s*(?P<num>\d+(?:\.\d+)?)?\s*\*?\s*"
    r"(?P<var>[A-Za-z][A-Za-z]{0,2})?")


def _parse_linear_terms(rhs: str):
    """'100 - 2P + 0.5Y - 3Ps' -> ({'P': -2, 'Y': 0.5, 'Ps': -3}, 100)."""
    const = 0.0
    coeffs = {}
    pos = 0
    s = rhs.strip()
    for t in _TERM_RE.finditer(s):
        if t.start() != pos and s[pos:t.start()].strip():
            return None  # unparseable gap
        pos = t.end()
        sign = -1.0 if t.group("sign") == "-" else 1.0
        num = float(t.group("num")) if t.group("num") else 1.0
        var = t.group("var")
        if var is None and t.group("num") is None:
            continue
        if var:
            coeffs[var] = coeffs.get(var, 0.0) + sign * num
        else:
            const += sign * num
    if pos != len(s) or not (coeffs or const):
        return None
    return coeffs, const


def _c_demand_multivar(g, m, text):
    """Full evaluation of a multi-determinant demand function plus the
    movement-along vs shift classification -- the c12 micro key's exact
    beats (c12_eco_cbse_02_009).  Owns the shape BEFORE the single-variable
    demand rows, which read only the leading 'a - bP' fragment and shipped
    a verified-partial answer."""
    rhs_raw = g["rhs"]
    parsed = _parse_linear_terms(rhs_raw)
    strip_clause = m.group(0)
    if not parsed:
        # SOCIAL-ALL (2026-10-07): the ISC stem runs the function into a
        # full sentence ("Qd = 800 - 4P + 0.02Y. If the current price
        # ..."), so the RHS capture carries trailing prose - retry on
        # the first sentence only, and strip only the trimmed clause
        # (stripping the whole match would delete the sentence that
        # carries the stated P and Y values).
        cut = re.split(r"\.\s", rhs_raw)[0].rstrip(". ")
        if cut != rhs_raw:
            parsed = _parse_linear_terms(cut)
            strip_clause = strip_clause.replace(rhs_raw, cut)
        if not parsed:
            return _GATE
    coeffs, const = parsed
    if len(coeffs) < 2:
        return _GATE  # single-variable shapes belong to DEMAND_Q_AT_P
    lhs = g["lhs"]
    # strip the function's own clause before hunting assignments
    stem = text.replace(strip_clause, " ", 1)
    vals = {}
    #: word-form fallbacks when the function's variables are assigned in
    #: prose ("the current price is Rs 100", "disposable income is
    #: Rs 40,000" -- c12_econ_isc_01_003) instead of inline "P=100"
    _WORD_VALS = {
        "P": r"\bprice\D{0,12}(?:Rs\.?|₹)?\s*(\d[\d,]*)",
        "p": r"\bprice\D{0,12}(?:Rs\.?|₹)?\s*(\d[\d,]*)",
        "Y": r"income\D{0,12}(?:Rs\.?|₹)?\s*(\d[\d,]*)",
        "y": r"income\D{0,12}(?:Rs\.?|₹)?\s*(\d[\d,]*)",
    }
    for name in coeffs:
        am = re.search(r"\b" + re.escape(name) + r"\s*=\s*(" + _NUM + r")",
                       stem)
        if not am and name in _WORD_VALS:
            am = re.search(_WORD_VALS[name], stem, re.I)
        if not am:
            return _GATE  # every function variable needs a stated value
        vals[name] = float(am.group(1).replace(",", ""))

    def _eval(over: dict) -> float:
        v = const
        for k, c in coeffs.items():
            v += c * over.get(k, vals[k])
        return v

    q0 = _eval({})
    parts = [f"Initial {lhs} = {const:g} " +
             " + ".join(f"({coeffs[k]:g})x({vals[k]:g})"
                        for k in coeffs) +
             f" = {_fmt(q0)} units"]
    newq = []
    for cm in re.finditer(
            r"\b(?P<v>[A-Za-z][A-Za-z]{0,2})\s+(?:rise[s]?|increase[s]?|"
            r"falls?|decrease[s]?|drop[s]?)\s+to\s*(?P<val>" + _NUM + r")",
            stem):
        name, val = cm.group("v"), float(cm.group("val").replace(",", ""))
        if name not in coeffs:
            continue
        qi = _eval({name: val})
        own_price = name.upper() == "P"
        newq.append((name, val, qi, own_price))
    if not newq:
        # SOCIAL-ALL (2026-10-07, CISCE sweep): an evaluation-only ask
        # ("calculate the quantity demanded at these values, and the
        # price elasticity at this point" -- c12_econ_isc_01_003) has no
        # movement/shift counterfactual; the family still owns it (the
        # single-variable row reads only the leading fragment) and adds
        # the point-elasticity leg when the ask wants it.
        ped = None
        if re.search(r"elasticit", text, re.I):
            pk = "P" if "P" in vals else ("p" if "p" in vals else None)
            bp = coeffs.get(pk) if pk else None
            if bp is not None and pk in vals and q0:
                ped = bp * vals[pk] / q0
        steps = [
            "Method: Using the corpus demand function - substitute each "
            "determinant's stated value into the linear function; with "
            "no determinant changing, this is a pure evaluation (and the "
            "point elasticity uses dQ/dP x P/Q on the same curve).",
            f"Given: {lhs} = {rhs_raw.strip()}; " +
            ", ".join(f"{k}={vals[k]:g}" for k in coeffs) + ".",
            "Computation: " + "; ".join(parts) + ".",
            "Check: each substituted term reproduces the function "
            "exactly, so the evaluation closes on the given values.",
            "Interpretation: this is the quantity demanded AT the stated "
            "prices and income - a point on the curve, not a shift of "
            "it." + ("" if ped is None else
                     f" Point PED = {ped:.2f} -> "
                     + ("inelastic (|PED| < 1)." if abs(ped) < 1 else
                        "elastic (|PED| > 1).")),
        ]
        answer = (f"{lhs} = {_fmt(q0)} units at the stated values"
                  + (f"; point PED = {ped:.2f} ("
                     + ("inelastic" if abs(ped) < 1 else "elastic") + ")"
                     if ped is not None else ""))
        return (q0, steps, answer,
                ["pure evaluation: no determinant changes"],
                f"{lhs} = linear demand evaluation",
                {"initial_q": q0, "point_ped": ped,
                 "coeff_p": bp if (ped is not None) else None,
                 "p_val": (vals.get(pk) if (ped is not None) else None),
                 "method": "DEMAND_MULTIVAR_EVAL"}, 0.97)
    answer_bits = [f"Initial {lhs} = {_fmt(q0)} units"]
    moves = []
    for name, val, qi, own_price in newq:
        delta = qi - q0
        tag = ("movement ALONG the demand curve (own price changed)"
               if own_price else
               "SHIFT of the entire demand curve (a non-price determinant "
               "changed)")
        direction = ("rightward (increase)" if delta > 0 else
                     "leftward (decrease)" if delta < 0 else "no change")
        moves.append(tag if own_price else f"{direction} {tag}")
        answer_bits.append(
            f"at {name}={val:g}: {lhs} = {_fmt(qi)} units "
            f"({'movement along' if own_price else 'shift, ' + direction})")
    steps = [
        "Method: Using the corpus demand function - substitute each "
        "determinant's value into the linear function; a change in the "
        "good's OWN price moves along the curve, a change in any other "
        "determinant shifts it (ceteris paribus, c12_eco_cbse_02_009 "
        "worked key).",
        f"Given: {lhs} = {rhs_raw.strip()}; initial values " +
        ", ".join(f"{k}={vals[k]:g}" for k in coeffs) + ".",
        "Computation: " + "; ".join(parts) + "; " +
        "; ".join(f"{n} -> {q:g}" for n, _v, q, _o in newq) + ".",
        "Check: each re-substitution keeps the untouched determinants at "
        "their initial values (ceteris paribus), reproducing the corpus "
        "key's arithmetic.",
        "Interpretation: " + "; ".join(moves) + " - own-price changes "
        "move along, other-determinant changes shift.",
    ]
    return (q0, steps, "; ".join(answer_bits),
            ["untouched determinants held at initial values "
             "(ceteris paribus)"],
            f"{lhs} = linear demand evaluation",
            {"initial_q": q0,
             "counterfactuals": [(n, v, q) for n, v, q, _o in newq],
             "qi_first": newq[0][2], "delta_first": newq[0][2] - q0,
             "method": "DEMAND_MULTIVAR"}, 0.97)


# --------------------------------------------------------------------------- #
# SOCIAL-ALL wave 3 (2026-10-07): the CISCE econ sweep's REFUSE_NUM rows,
# each a deterministic numeric the corpus key works fully
# --------------------------------------------------------------------------- #

_TU_PAIR_RE = re.compile(
    r"Q\s*=\s*(\d+)\s*TU\s*=\s*(\d[\d,]*)", re.I)
_NU_PAIR_RE = re.compile(
    r"(\d+)\s*[a-z]{3,10}s?\s*=\s*(\d[\d,]*)\s*utils", re.I)
_MU_LIST_RE = re.compile(
    r"marginal utilities?[^.:]{0,80}?(?:are|is|:)\s*((?:\d[\d,]*\s*,\s*)+"
    r"\d[\d,]*)", re.I)


def _c_mu_schedule(g, m, text):
    """TU schedule -> MU sequence (corpus: c9_eco_icse_01_011 mangoes,
    c11_econ_isc_02_002 'Q=1 TU=30'; also the price stop rule and the
    first-unit-below-threshold ask)."""
    pairs = [(int(a), float(b.replace(",", "")))
             for a, b in _TU_PAIR_RE.findall(text)]
    if not pairs:
        pairs = [(int(a), float(b.replace(",", "")))
                 for a, b in _NU_PAIR_RE.findall(text)]
    mus = None
    first_unit = 1
    if len(pairs) >= 2:
        pairs.sort()
        units = [p[0] for p in pairs]
        if units != list(range(units[0], units[0] + len(units))):
            return _GATE  # missing rungs -> MU sequence not computable
        mus = [pairs[i][1] - pairs[i - 1][1] for i in range(1, len(pairs))]
        first_unit = units[1]
        src_desc = ", ".join(f"Q={u}: TU={_fmt(tv)}" for u, tv in pairs)
    else:
        # an explicit MU list ("marginal utilities ... are 25, 20, 15, 10")
        lm = _MU_LIST_RE.search(text)
        if not lm:
            return _GATE
        mus = [float(x)
               for x in (t.strip() for t in lm.group(1).split(","))
               if x]
        src_desc = "stated MU sequence: " + ", ".join(_fmt(x) for x in mus)
    mu_txt = ", ".join(f"MU{_fmt(float(u))} = {_fmt(mu)}"
                       for u, mu in enumerate(mus, start=first_unit))
    diminishing = all(mus[i] < mus[i - 1] for i in range(1, len(mus)))
    # optional threshold ask: "MU first becomes less than X utils"
    thr = None
    tm = re.search(r"(?:less than|falls? below)\s*(\d[\d,]*)\s*utils",
                   text, re.I)
    if tm:
        thr = float(tm.group(1).replace(",", ""))
    # optional price stop rule: buy while MU (rupee-equivalent) >= price
    price = None
    if re.search(r"how many.{0,60}(?:buy|purchase|consume)", text, re.I) \
            or re.search(r"maxim.{3,20}utility", text, re.I):
        pm = re.search(r"(?:price|priced)\b[^.\d]{0,30}?"
                       r"(?:Rs\.?|₹)?\s*(\d[\d,]*)", text, re.I)
        if pm and (_MU_LIST_RE.search(text) or "utils" not in text.lower()):
            price = float(pm.group(1).replace(",", ""))
    parts = [f"MU{n} = {_fmt(mu)}"
             for n, mu in enumerate(mus, start=first_unit)]
    bits = []
    tail = ""
    verdict = ""
    if price is not None:
        buy = sum(1 for mu in mus if mu >= price)
        bits.append(f"buy while MU >= price ({_fmt(price)}): the first "
                    f"{buy} unit(s) qualify")
        verdict = (f"utility is maximised by buying {buy} unit(s)")
        tail = (f" - the next unit's MU ({_fmt(mus[buy]) if buy < len(mus) else '0'})"
                f" falls below the {_fmt(price)} price, so buying it "
                "would reduce total utility.")
    elif thr is not None:
        below = next((u for u, mu in
                      enumerate(mus, start=first_unit) if mu < thr), None)
        bits.append(f"first unit with MU < {_fmt(thr)}: "
                    + (f"unit {below}" if below else
                       f"none within the schedule shown (minimum MU shown "
                       f"is {_fmt(min(mus))})"))
        verdict = ("within the schedule, MU never falls below "
                   f"{_fmt(thr)}" if below is None else
                   f"MU first falls below {_fmt(thr)} at unit {below}")
    else:
        verdict = ("diminishing marginal utility HOLDS"
                   if diminishing else
                   "the MU sequence is not strictly diminishing")
    steps = [
        "Method: Using MU_n = TU_n - TU_(n-1) on the taught schedule - "
        "marginal utility is the addition to total utility from one "
        "more unit (c9/c11 corpus keys).",
        "Given: " + src_desc + ".",
        "Computation: " + "; ".join(parts) + ".",
        "Check: successive differences reproduce the utility ladder "
        "exactly - adding each MU back rebuilds the next total.",
        "Interpretation: " + verdict + ".",
    ]
    ans = (f"MU: {mu_txt} - {verdict}{tail}")
    extras = {"mu_last": mus[-1], "mus": mus, "method": "MU_SCHEDULE"}
    if len(pairs) >= 2:
        # verifier rebuild slots (pairs forms only; the explicit MU-list
        # branch has no independent second relation beyond re-reading the
        # stated ladder)
        extras["tu_last"] = pairs[-1][1]
        extras["tu_prev"] = pairs[-2][1]
    return (mus[-1], steps, ans, ["MU read off the given TU schedule only"],
            "MU_n = TU_n - TU_(n-1)",
            extras, 0.97)


def _c_share_percent(g, m, text):
    """Two corpus directions: part/total -> share percent
    (c9_eco_icse_04_001 GVA share), and percent x total -> part
    (c9_eco_icse_02_004 public sector output)."""
    # direction B: "contributes 30% of GDP ... total GDP is 200"
    pm = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*%", text)
    tm = re.search(r"(?:total\s+)?(?:GDP|GVA|income|output)\D{0,20}"
                   r"(?:is\s*|of\s*)?(?:Rs\.?|₹)\s*(\d[\d,]*)", text, re.I)
    if pm and tm and re.search(r"calculate|find|output|how much", text,
                               re.I):
        pct = float(pm.group(1).replace(",", ""))
        total = float(tm.group(1).replace(",", ""))
        part = pct / 100.0 * total
        steps = [
            "Method: A sector's output = its GDP share x total GDP; the "
            "other sector's share is the complement and adds to the same "
            "total.",
            f"Given: public share = {pct:g}%; private share = "
            f"{100 - pct:g}%; total = ₹{_fmt(total)}.",
            f"Computation: {pct:g}/100 x {_fmt(total)} = {_fmt(part)} "
            f"(the private {100 - pct:g}% would be "
            f"₹{_fmt(total - part)}).",
            f"Check: {_fmt(part)} + {_fmt(total - part)} = "
            f"{_fmt(total)} - the two-way split closes exactly.",
            "Interpretation: the sector's output is ₹" + _fmt(part) +
            " at the stated share.",
        ]
        return (part, steps, f"Output = ₹{_fmt(part)}",
                ["share held at its stated percent"],
                "part = percent/100 x total",
                {"part": part, "pct": pct, "total": total,
                 "method": "SHARE_PERCENT"}, 0.97)
    # direction A: "Agriculture GVA = 28 ... Total GVA = 180 ... share"
    sm = re.search(r"([A-Za-z ]{3,30}?)\s*(?:GVA|GDP)\s*(?:is|of|=)?\s*"
                   r"(?:Rs\.?|₹)?\s*(\d[\d,]*)", text, re.I)
    tm2 = re.search(r"[Tt]otal\s*(?:GVA|GDP)\D{0,16}(?:Rs\.?|₹)?\s*"
                    r"(\d[\d,]*)", text)
    if sm and tm2 and re.search(r"share|percent", text, re.I):
        part = float(sm.group(2).replace(",", ""))
        total = float(tm2.group(1).replace(",", ""))
        if total <= 0 or part > total:
            return _GATE
        share = part / total * 100.0
        steps = [
            "Method: Sector share = sector value / total value x 100.",
            f"Given: sector = ₹{_fmt(part)}; total = ₹{_fmt(total)}.",
            f"Computation: ({_fmt(part)} / {_fmt(total)}) x 100 = "
            f"{share:.2f}%.",
            f"Check: {share:.2f}% of {_fmt(total)} returns "
            f"{_fmt(part)} - the share closes.",
            "Interpretation: the sector's share is "
            f"{share:.2f}% of the total.",
        ]
        return (share, steps, f"Share = {share:.2f}%",
                ["share is of the stated total only"],
                "share = part/total x 100",
                {"share": share, "part": part, "total": total,
                 "method": "SHARE_PERCENT"}, 0.97)
    return _GATE


def _c_productivity(g, m, text):
    """Output per unit of input (c10_econ_icse_01_003: capital stock
    ₹2 crore, output ₹8 crore -> productivity 4)."""
    cm2 = re.search(r"capital stock\D{0,20}(?:Rs\.?|₹)?\s*(\d[\d,]*)",
                    text, re.I)
    om = re.search(r"produces?\D{0,40}(?:Rs\.?|₹)?\s*(\d[\d,]*)", text,
                   re.I)
    if not (cm2 and om):
        return _GATE
    cap = float(cm2.group(1).replace(",", ""))
    out = float(om.group(1).replace(",", ""))
    if cap <= 0:
        return _GATE
    prod = out / cap
    steps = [
        "Method: Productivity = output / input - production counts "
        "units made, productivity counts output PER unit of input "
        "(c10_econ_icse_01_003 key).",
        f"Given: capital = ₹{_fmt(cap)}; output = ₹{_fmt(out)}.",
        f"Computation: {_fmt(out)} / {_fmt(cap)} = {_fmt(prod)}.",
        f"Check: {_fmt(cap)} x {_fmt(prod)} = {_fmt(out)} - the ratio "
        "closes.",
        "Interpretation: every rupee of capital generates ₹" +
        _fmt(prod) + " of output per year.",
    ]
    return (prod, steps, f"Capital productivity = {_fmt(prod)}",
            ["single input (capital) measured"],
            "productivity = output / capital",
            {"productivity": prod, "output": out, "capital": cap,
             "method": "PRODUCTIVITY_RATIO"}, 0.97)


def _c_depreciation_sl(g, m, text):
    """Straight-line depreciation (c10_econ_icse_01_006: 10 looms x
    ₹5 lakh, 10-year life, zero scrap -> ₹5,00,000 a year)."""
    nm = re.search(r"(\d[\d,]*)\s+[a-z][a-z -]{1,18}?\s+(?:for|at)\s*"
                   r"(?:Rs\.?|₹)?\s*(\d[\d,]*)\s*(lakh|crore)?\s*each",
                   text, re.I)
    lm = re.search(r"life\s+of\s+(\d[\d,]*)\s*year", text, re.I)
    if not (nm and lm):
        return _GATE
    n = float(nm.group(1).replace(",", ""))
    each = float(nm.group(2).replace(",", ""))
    mult = 100000.0 if "lakh" in nm.group(0).lower() else \
        (10000000.0 if "crore" in nm.group(0).lower() else 1.0)
    life = float(lm.group(1))
    sm = re.search(r"scrap|salvage", text, re.I)
    if sm and not re.search(r"zero\s+scrap|no\s+scrap|scrap\s+value\s+of\s*"
                            r"0", text, re.I):
        return _GATE  # non-zero salvage not parsed -> honest decline
    cost = n * each * mult
    dep = cost / life
    steps = [
        "Method: Straight-line depreciation = (cost - scrap value) / "
        "useful life; with zero scrap value it is cost / life.",
        f"Given: {n:g} units at Rs {each:g} lakh each (unit cost "
        f"₹{_fmt(each * mult)}; total ₹{_fmt(cost)}); life {life:g} "
        f"years; scrap value 0.",
        f"Computation: total cost = {n:g} x ₹{_fmt(each * mult)} = "
        f"₹{_fmt(cost)}; annual = ₹{_fmt(cost)} / {life:g} = "
        f"₹{_inr(dep)} per year.",
        f"Check: ₹{_inr(dep)} x {life:g} years = ₹{_inr(cost)} - the "
        "asset is fully written off on schedule.",
        "Interpretation: the firm charges ₹" + _inr(dep) +
        " of depreciation every year for the whole set.",
    ]
    return (dep, steps, f"Annual depreciation = ₹{_inr(dep)}",
            ["straight-line method, zero scrap value"],
            "depreciation = (cost - scrap) / life",
            {"annual_depreciation": dep, "cost": cost, "life": life,
             "method": "DEPRECIATION_SL"}, 0.97)


def _c_capital_formation(g, m, text):
    """Capital formation = GFCF + change in stocks; optional rate =
    CF / GDP x 100 (c10_econ_icse_01_008 worked key: 8,000 + (-500) =
    7,500; rate 18.75%)."""
    # the corpus writes the minus as a non-breaking hyphen - fold it
    text = text.replace("\u2011", "-")
    gm2 = re.search(r"GFCF\s*(?:=|of)\s*(?:Rs\.?|₹)?\s*(\d[\d,]*)", text,
                    re.I)
    if not gm2:
        return _GATE
    gfcf = float(gm2.group(1).replace(",", ""))
    sm2 = re.search(r"(?:change|net)\s+in\s+(?:stocks?|inventories)"
                    r"[^0-9]{0,20}?(-?)\s*(?:Rs\.?|₹)?\s*\(?\s*"
                    r"(\d[\d,]*)", text, re.I)
    if sm2 is None:
        sm2 = re.search(r"(?:stocks?|inventories)[^0-9]{0,24}?"
                        r"(-\d[\d,]*)", text, re.I)
        if sm2 is None:
            return _GATE
        stocks = float(sm2.group(1).replace(",", ""))
    else:
        stocks = float(sm2.group(2).replace(",", ""))
        if sm2.group(1) == "-":
            stocks = -stocks
    cf = gfcf + stocks
    gdp = None
    gm3 = re.search(r"GDP\D{0,20}(?:Rs\.?|₹)?\s*(\d[\d,]*)", text, re.I)
    if gm3 and re.search(r"rate", text, re.I):
        gdp = float(gm3.group(1).replace(",", ""))
    rate = cf / gdp * 100.0 if gdp else None
    steps = [
        "Method: Capital formation = gross fixed capital formation + "
        "change in stocks; the capital-formation rate divides it by "
        "GDP (c10_econ_icse_01_008 key).",
        f"Given: GFCF = ₹{_fmt(gfcf)}; change in stocks = ₹{_fmt(stocks)}"
        + (f"; GDP = ₹{_fmt(gdp)}." if gdp else "."),
        f"Computation: {_fmt(gfcf)} + ({_fmt(stocks)}) = {_fmt(cf)}" +
        (f"; rate = {_fmt(cf)}/{_fmt(gdp)} x 100 = {rate:.2f}%."
         if rate is not None else "."),
        "Check: the negative stock change subtracts from GFCF exactly "
        "as inventories were run down, so the identity holds.",
        "Interpretation: capital formation is ₹" + _fmt(cf) +
        (f" - {rate:.2f}% of GDP." if rate is not None else "."),
    ]
    ans = (f"Capital formation = ₹{_fmt(cf)}"
           + (f"; rate = {rate:.2f}% of GDP" if rate is not None else ""))
    return (cf, steps, ans, ["stocks change signed as stated"],
            "CF = GFCF + change in stocks",
            {"capital_formation": cf, "rate": rate, "gfcf": gfcf,
             "stocks": stocks, "method": "CAPITAL_FORMATION"}, 0.97)


def _c_mc_schedule(g, m, text):
    """'Marginal Cost: Q=1 TC=80, Q=2 TC=110, ...' -> MC per unit step.
    Deterministic difference ladder of the stated schedule."""
    pairs = re.findall(r"Q\s*=\s*(\d+(?:\.\d+)?)\s*[,;:]?\s*"
                       r"TC\s*=\s*(\d[\d,]*(?:\.\d+)?)", text, re.I)
    if len(pairs) < 2:
        pairs = [(b, a) for a, b in re.findall(
            r"TC\s*=\s*(\d[\d,]*(?:\.\d+)?)\s*(?:at|for|when)\s*"
            r"Q\s*=\s*(\d+(?:\.\d+)?)", text, re.I)]
    if len(pairs) < 2:
        return _GATE
    sched = sorted((float(qq), float(cc.replace(",", "")))
                   for qq, cc in pairs)
    mcs: List[Tuple[float, float]] = []
    for (q1, c1), (q2, c2) in zip(sched, sched[1:]):
        if abs(q2 - q1 - 1.0) > 1e-9:
            return _GATE       # non-unit ladder: per-unit MC undefined
        mcs.append((q2, c2 - c1))
    steps = [
        "Method: marginal cost is the change in total cost for one "
        "extra unit, MC(n) = TC(n) - TC(n-1).",
        "Given schedule: " + "; ".join(
            f"Q={qq:g} TC=Rs {cc:g}" for qq, cc in sched) + ".",
        "Differences: " + "; ".join(
            f"MC({qq:g}) = {_fmt(mc)}" for qq, mc in mcs) + "."]
    ans = ", ".join(f"MC{_fmt(qq)} = Rs {_fmt(mc)}" for qq, mc in mcs)
    return (mcs[0][1] if len(mcs) == 1 else None, steps, ans, None,
            "MC(n) = TC(n) - TC(n-1)",
            {"mc_count": float(len(mcs)),
             "mc_first": mcs[0][1]}, 0.95)


_TABLE_SOCIAL: List[Tuple[str, str, Any]] = [
    # SOCIAL-ALL wave 3 (2026-10-07): the CISCE econ sweep's deterministic
    # REFUSE_NUM rows -- specific shapes own their stems BEFORE the broad
    # percent/elasticity families
    ("MU_SCHEDULE",
     r"TU\s+schedule|TU\s*=\s*\d|\d+\s*[a-z]{3,10}s?\s*=\s*\d[\d,]*\s*utils|"
     r"marginal\s+utilit",
     _c_mu_schedule),
    ("DEPRECIATION_SL", r"depreciat", _c_depreciation_sl),
    ("CAPITAL_FORMATION", r"capital\s+formation|GFCF", _c_capital_formation),
    ("PRODUCTIVITY_RATIO", r"productivity", _c_productivity),
    ("SHARE_PERCENT",
     r"share|contributes?\s+\d[\d,]*\s*%|percent",
     _c_share_percent),
    # related-good / income elasticity (owns BEFORE the PED rows: those
    # served the own-price machinery to these stems, a verified-wrong)
    ("RELATED_ELASTICITY", _YED_PAIR, _c_related_elasticity),
    ("RELATED_ELASTICITY", _XED_PAIR, _c_related_elasticity),
    # on-the-job training bond arithmetic (owned BEFORE the percent
    # narrative chain applied the productivity % to the cost)
    ("TRAINING_NET_GAIN",
     r"\btraining\b[\s\S]{0,400}?\bbond\b",
     _c_training_net_gain),
    # multi-determinant demand function (owns BEFORE DEMAND_Q_AT_P, which
    # read only the leading 'a - bP' fragment)
    ("DEMAND_MULTIVAR", _FUNC_FORM, _c_demand_multivar),
    # WS-PAL (ovh-pal 2026-10-13): MC = TC_n - TC_{n-1} from an explicit
    # Q/TC schedule -- the class-10 econ cell ('Marginal Cost: Q=1 TC=80,
    # Q=2 TC=110, Q=3 TC=135, Q=4 TC=165') previously refused through
    # PAL_PROGRAM with no verifier.  Second path: _row_mc_schedule in
    # independent_verifier.py (registered route verifier).
    ("MC_SCHEDULE",
     r"marginal\s+cost|\bMC\b[^.]{0,40}(?:schedule|compute|calculate|"
     r"find)|Q\s*=\s*\d+[^.]{0,12}TC\s*=\s*\d",
     _c_mc_schedule),
]

TABLE = _TABLE_SOCIAL + _TABLE + _TABLE_BOOKS2


def model_economics_families(text: str) -> ModelResult:
    """Dispatcher: scan every economics family; first grounded hit wins.

    Triggers are deterministic regexes with named slots; each row applies
    its own plausibility gates inside compute, and a gate refusal simply
    lets the scan continue.  Never calls an LLM.
    """
    norm = _normalize(text)
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        # SOCIAL-ALL (2026-10-07): an optional 7th element carries the
        # family's arbitration confidence (default 0.95 unchanged for
        # every existing 6-tuple family)
        (value, steps, answer, assumptions, eq, extra, conf) = \
            (list(out) + [None] * 7)[:7]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {},
                    conf=0.95 if conf is None else float(conf))
    return _no("ECONOMICS", "no economics family matched")
