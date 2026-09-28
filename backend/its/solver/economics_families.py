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

Coverage (24 families):
  micro    DEMAND_SUPPLY_LINEAR_ANY (any-solve), MARKET_EQUILIBRIUM,
           EXCESS_DEMAND_SUPPLY, DEMAND_Q_AT_P, DEMAND_P_FOR_Q,
           PED_PERCENTAGE (pairs + any-missing), PED_TOTAL_OUTLAY,
           PED_POINT_LINEAR
  macro    GDP_EXPENDITURE_ANY_MISSING, NNPFC_CONVERSION, VALUE_ADDED_CHAIN
           (+ stage-chain), INCOME_METHOD_NI, GDP_DEFLATOR (real/nominal
           any-missing), CPI_INFLATION_RATE, FISHER_REAL_RATE,
           MONEY_MULTIPLIER, DEPOSIT_CREATION_CHAIN,
           CONSUMPTION_FUNCTION_ANY, INVESTMENT_MULTIPLIER,
           APC_APS_IDENTITIES, BUDGET_DEFICITS_ANY, EXCHANGE_RATE_CHANGE,
           UNEMPLOYMENT_RATES, HEADCOUNT_RATIO
  stats    INDEX_AGGREGATIVE, INDEX_LASPEYRES, INDEX_PAASCHES

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
        m = re.search(label + r"\s*(?:is|=|:|of|was|were|at|stood)?\s*" +
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
        f"Demand: Qd = {_fmt(a)} - {_fmt(abs(b))}P;  Supply: Qs = "
        f"{_fmt(c)} + {_fmt(abs(d))}P.",
        "At equilibrium Qd = Qs, so "
        f"{_fmt(a)} - {_fmt(abs(b))}P = {_fmt(c)} + {_fmt(abs(d))}P.",
        f"P* = ({_fmt(a)} - {_fmt(c)}) / ({_fmt(abs(b))} + {_fmt(abs(d))}) "
        f"= {_fmt(p_star)}.",
        f"Q* = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(p_star)} = "
        f"{_fmt(q_star)}  (check: Qs at P* = {_fmt(c + d * p_star)}).",
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
        f"At P = {_fmt(pp)}: Qd = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(pp)} "
        f"= {_fmt(qd)};  Qs = {_fmt(c)} + {_fmt(abs(d))} x {_fmt(pp)} "
        f"= {_fmt(qs)}.",
        f"Gap = Qd - Qs = {_fmt(qd)} - {_fmt(qs)} = {_fmt(gap)} "
        f"(positive = shortage, negative = surplus).",
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
        f"Substitute P = {_fmt(pp)} into Qd = {_fmt(a)} - "
        f"{_fmt(abs(b))}P:  Qd = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(pp)} "
        f"= {_fmt(qd)} units.",
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
        f"Set Qd = {_fmt(qq)}:  {_fmt(qq)} = {_fmt(a)} - {_fmt(abs(b))}P.",
        f"P = ({_fmt(a)} - {_fmt(qq)}) / {_fmt(abs(b))} = {_fmt(p)}.",
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
        f"% change in price = ({_fmt(p2)} - {_fmt(p1)})/{_fmt(p1)} x 100 = "
        f"{_fmt(dp)}%.",
        f"% change in quantity = ({_fmt(q2)} - {_fmt(q1)})/{_fmt(q1)} x 100 "
        f"= {_fmt(dq)}%.",
        f"Ed = %dQ / %dP = {_fmt(dq)} / {_fmt(dp)} = {_fmt(ed)} "
        f"(magnitude {_fmt(abs(ed))}).",
        f"|Ed| {'>' if abs(ed) > 1 else '<' if abs(ed) < 1 else '='} 1, so "
        f"demand is {cls}.",
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
        steps = [f"Ed = %dQ / %dP = {_fmt(qdp)} / {_fmt(pdp)} = {_fmt(ed)}.",
                 f"|Ed| = {_fmt(abs(ed))}: demand is {cls}."]
        ans = f"Ed = {_fmt(ed)} ({cls} demand)"
        val = ed
    elif pdp is None:
        if ed == 0:
            return _GATE
        pdp = qdp / ed
        steps = [f"%dP = %dQ / Ed = {_fmt(qdp)} / {_fmt(ed)} = "
                 f"{_fmt(pdp)}%."]
        ans = (f"% change in price = {_fmt(pdp)}% (price moves opposite "
               f"to quantity)")
        val = pdp
    else:
        qdp = ed * pdp
        steps = [f"%dQ = Ed x %dP = {_fmt(ed)} x {_fmt(pdp)} = "
                 f"{_fmt(qdp)}%; quantity moves the OPPOSITE way to price."]
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
        f"TE1 = P1 x Q1 = {_fmt(p1)} x "
        f"{_fmt(q1 if q1 is not None else te1 / p1)} = Rs {_fmt(te1)};  "
        f"TE2 = P2 x Q2 = {_fmt(p2)} x "
        f"{_fmt(q2 if q2 is not None else te2 / p2)} = Rs {_fmt(te2)}.",
        f"Price {'rises' if price_up else 'falls'} and {why}.",
        "Total-outlay test: outlay same direction as price -> inelastic; "
        "opposite direction -> elastic; unchanged -> unitary.",
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
    steps = [
        f"At P = {_fmt(pp)}: Qd = {_fmt(a)} - {_fmt(abs(b))} x {_fmt(pp)} "
        f"= {_fmt(q)}.",
        f"Point elasticity = |dQ/dP| x (P/Q) = {_fmt(abs(b))} x "
        f"{_fmt(pp)}/{_fmt(q)} = {_fmt(ed)}.",
        f"|Ed| {'>' if ed > 1 else '<' if ed < 1 else '='} 1: demand is "
        f"{cls} at this point (on a linear demand curve elasticity falls "
        f"as P falls; slope is constant but elasticity is not).",
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
        expr = (f"{_fmt(c)} + {_fmt(i)} + {_fmt(gv)} + "
                f"({_fmt(x)} - {_fmt(mv)})")
        steps = [
            "GDP by the expenditure method: GDP = C + I + G + (X - M).",
            f"= {expr} = {_fmt(gdp)}.",
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
    steps = [
        "GDP = " + " + ".join(terms) + f" = {_fmt(gdp)}  "
        "(GDP = C + I + G + (X - M)).",
        f"Solve for {_GDP_NAME[tgt]}: {_GDP_NAME[tgt]} = {_fmt(gdp)} - "
        f"({_fmt(signed_known)})"
        + (" divided by -1 (imports enter with a minus sign)" if
           _GDP_SIGN[tgt] < 0 else "") +
        f" = {_fmt(val)}.",
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
        "Chain: GDPmp -> GNPmp (add NFIA) -> NNPmp (less depreciation) -> "
        "NNPfc (less net indirect tax).",
        f"GNPmp = GDP + NFIA = {_fmt(gdp)} + {_fmt(nfia)} = {_fmt(gn)}.",
        f"NNPmp = GNPmp - depreciation = {_fmt(gn)} - {_fmt(dep)} = "
        f"{_fmt(nnp_mp)}.",
        nit_steps,
        f"NNPfc = NNPmp - NIT = {_fmt(nnp_mp)} - {_fmt(nit)} = "
        f"{_fmt(nnp_fc)}.",
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
            f"Value added = value of output - intermediate consumption = "
            f"{_fmt(out)} - {_fmt(inter)} = {_fmt(gva)}.",
            "Summing value added across firms avoids double counting "
            "intermediate goods: the total equals the value of the final "
            "good.",
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
            f"Stage values of output: {', '.join(_fmt(v) for v in sells)}.",
            f"Each stage's value added = its sale value - what it paid for "
            f"inputs: {chain}.",
            f"Total value added = {_fmt(total)} = value of the FINAL good; "
            f"summing the sale values ({_fmt(sum(sells))}) would double "
            f"count.",
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
        "Income method: national income (NNPfc) = compensation of employees "
        "+ rent + interest + profit" + (" + mixed income" if mixed else "")
        + ".",
        f"= {sum_s} = {_fmt(total)}.",
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
        steps = [f"Nominal GDP = Real GDP x (deflator / 100) = {_fmt(real)} "
                 f"x {_fmt(defl)}/100 = {_fmt(nom)}."]
        val, ans = nom, f"Nominal GDP = Rs {_fmt(nom)}"
    elif real is None:
        if defl <= 0:
            return _GATE    # impossible state: non-positive deflator
        real = nom / defl * 100.0
        steps = [f"Real GDP = (Nominal GDP / deflator) x 100 = "
                 f"({_fmt(nom)} / {_fmt(defl)}) x 100 = {_fmt(real)}."]
        val, ans = real, f"Real GDP = Rs {_fmt(real)}"
    else:
        if real <= 0:
            return _GATE
        defl = nom / real * 100.0
        steps = [f"GDP deflator = (Nominal / Real) x 100 = "
                 f"({_fmt(nom)} / {_fmt(real)}) x 100 = {_fmt(defl)}."]
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
        f"Price index{span}: {_fmt(i1)}  ->  price index{span2}: "
        f"{_fmt(i2)}.",
        f"Inflation = (index2 - index1)/index1 x 100 = ({_fmt(i2)} - "
        f"{_fmt(i1)})/{_fmt(i1)} x 100 = {_fmt(infl)}%.",
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
        f"CPI = (cost of the basket in the current year / cost in the base "
        f"year) x 100 = ({_fmt(c1)} / {_fmt(c0)}) x 100 = {_fmt(cpi)}.",
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
        steps = [f"Fisher: nominal rate = real rate + inflation = "
                 f"{_fmt(real)} + {_fmt(infl)} = {_fmt(nom)}%."]
        val, ans = nom, f"Nominal interest rate = {_fmt(nom)}%"
    elif real is None:
        real = nom - infl
        steps = [f"Fisher (approximate): real rate = nominal rate - "
                 f"inflation = {_fmt(nom)} - {_fmt(infl)} = {_fmt(real)}%.",
                 "(Exact form: (1 + n)/(1 + i) - 1.)"]
        val, ans = real, f"Real interest rate = {_fmt(real)}%"
    else:
        infl = nom - real
        steps = [f"Inflation = nominal - real = {_fmt(nom)} - "
                 f"{_fmt(real)} = {_fmt(infl)}%."]
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
        f"Reserve ratio = {_fmt(rr * 100)}% (={_fmt(rr)}).",
        f"Money multiplier = 1 / reserve ratio = 1/{_fmt(rr)} = {_fmt(mm)}.",
    ]
    ans = f"Money multiplier = {_fmt(mm)}"
    extra = {"multiplier": mm}
    if dep is not None and dep > 0:
        total = dep * mm
        credit = total - dep
        steps.append(f"Total deposits = initial deposit x multiplier = "
                     f"{_fmt(dep)} x {_fmt(mm)} = {_fmt(total)}.")
        steps.append(f"Credit created = total - initial = {_fmt(total)} - "
                     f"{_fmt(dep)} = {_fmt(credit)}.")
        ans = (f"Money multiplier = {_fmt(mm)}; total deposits = "
               f"Rs {_fmt(total)}; credit created = Rs {_fmt(credit)}")
        extra.update({"initial_deposit": dep, "total_deposits": total,
                      "credit_created": credit})
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
        f"Round 1: the bank receives Rs {_fmt(dep)}, keeps "
        f"{_fmt(rr * 100)}% (Rs {_fmt(dep * rr)}) as reserves and lends "
        f"Rs {_fmt(loan1)}.",
        f"Round 2: the Rs {_fmt(dep2)} lent is redeposited; reserves "
        f"Rs {_fmt(dep2 * rr)}, fresh loan Rs {_fmt(loan2)}.",
        "... every round re-lends (1 - reserve ratio) of the previous "
        "round's deposit: a geometric series.",
        f"Total deposits = initial / reserve ratio = {_fmt(dep)} x "
        f"{_fmt(mm)} = Rs {_fmt(total)}.",
        f"Credit created = total - initial = {_fmt(total)} - {_fmt(dep)} "
        f"= Rs {_fmt(credit)}.",
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
    known = [v for v in (a, b, y, c_v) if v is not None]
    if len(known) < 3:
        return _GATE        # need at least 3 of {a, b, Y, C}
    if y is None:
        y = (c_v - a) / b
        if y <= 0:
            return _GATE
        steps = [f"C = a + bY  ->  Y = (C - a)/b = ({_fmt(c_v)} - "
                 f"{_fmt(a)})/{_fmt(b)} = {_fmt(y)}."]
        val, ans = y, f"Income Y = Rs {_fmt(y)}"
    elif c_v is None:
        c_v = a + b * y
        steps = [f"Substitute Y = {_fmt(y)}:  C = {_fmt(a)} + {_fmt(b)} x "
                 f"{_fmt(y)} = {_fmt(c_v)}."]
        val, ans = c_v, f"Consumption C = Rs {_fmt(c_v)}"
    else:
        if y <= 0 or c_v < 0:
            return _GATE
        apc = c_v / y
        steps = [
            f"Verify: C = a + bY = {_fmt(a)} + {_fmt(b)} x {_fmt(y)} "
            f"(given as {_fmt(c_v)}).",
            f"APC = C/Y = {_fmt(c_v)}/{_fmt(y)} = {_fmt(apc)};  MPC = "
            f"{_fmt(b)};  MPS = 1 - MPC = {_fmt(1 - b)}.",
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
    mpc = _pf(g.get("mpc"))
    mps = _pf(g.get("mps"))
    di = _pf(g.get("di"))
    dy = _pf(g.get("dy"))
    if mpc is None and mps is not None:
        mpc = 1 - mps
    if mpc is None:
        return _GATE
    if not (0 < mpc < 1):
        return _GATE        # impossible state: MPC <= 0 or MPC >= 1
    k = 1.0 / (1.0 - mpc)
    steps = [
        f"MPC = {_fmt(mpc)}  (MPS = {_fmt(1 - mpc)}).",
        f"Investment multiplier k = 1/(1 - MPC) = 1/{_fmt(1 - mpc)} = "
        f"{_fmt(k)}.",
    ]
    if dy is None and di is not None:
        dy = k * di
        steps.append(f"Change in income dY = k x dI = {_fmt(k)} x "
                     f"{_fmt(di)} = {_fmt(dy)}.")
        ans = f"Multiplier = {_fmt(k)}; income changes by Rs {_fmt(dy)}"
        val = dy
    elif di is None and dy is not None:
        di = dy / k
        steps.append(f"dI = dY / k = {_fmt(dy)} / {_fmt(k)} = {_fmt(di)}.")
        ans = (f"Multiplier = {_fmt(k)}; investment changes by "
               f"Rs {_fmt(di)}")
        val = di
    else:
        ans = f"Investment multiplier k = {_fmt(k)}"
        val = k
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
        src,
        f"APC = C/Y = {_fmt(c_v)}/{_fmt(y)} = {_fmt(apc)}.",
        f"APS = 1 - APC = {_fmt(aps)}  (equivalently S/Y with S = "
        f"{_fmt(y - c_v)}).",
        "Identities: APC + APS = 1;  MPC + MPS = 1.",
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
        "Identities: revenue deficit = revenue expenditure - revenue "
        "receipts;  fiscal deficit = total expenditure - total receipts "
        "EXCLUDING borrowings (= the borrowing requirement);  primary "
        "deficit = fiscal deficit - interest payments.",
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
    return next(iter(out.values())), steps, ans, assumptions or None, \
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
        f"Exchange rate moves from {_fmt(r1)} to {_fmt(r2)}.",
        f"% change = ({_fmt(r2)} - {_fmt(r1)})/{_fmt(r1)} x 100 = "
        f"{_fmt(pct)}%.",
        verdict[0].upper() + verdict[1:] + ".",
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
    steps = [
        (f"Labour force = employed + unemployed = {_fmt(e)} + {_fmt(u)} = "
         f"{_fmt(lf)}." if e is not None
         else f"Labour force = {_fmt(lf)}."),
        f"Unemployment rate = (unemployed / labour force) x 100 = "
        f"{_fmt(u)}/{_fmt(lf)} x 100 = {_fmt(ur)}%.  (Anyone without a job "
        f"but not seeking work is OUT of the labour force, not unemployed.)",
    ]
    ans = f"Unemployment rate = {_fmt(ur)}%"
    wap = _labv(text, r"(?:working[-\s]?age(?:\s+population)?|"
                      r"adult\s+population|total\s+(?:adult\s+)?population|"
                      r"population)")
    if wap is not None and wap > 0:
        pr = lf / wap * 100.0
        if pr > 100:
            return _GATE    # impossible: labour force above the population
        steps.append(f"Participation rate = (labour force / working-age "
                     f"population) x 100 = {_fmt(lf)}/{_fmt(wap)} x 100 = "
                     f"{_fmt(pr)}%.")
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
        f"Headcount ratio = (persons below the poverty line / total "
        f"population) x 100 = {_fmt(poor)}/{_fmt(tot)} x 100 = "
        f"{_fmt(hcr)}%.",
        "The headcount ratio is the share of the population whose "
        "consumption falls below the poverty line.",
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
            "Simple aggregative index = (sum P1 / sum P0) x 100 -- no "
            "weights.",
            f"sum P0 = {_fmt(s0)},  sum P1 = {_fmt(s1)}.",
            f"= ({_fmt(s1)} / {_fmt(s0)}) x 100 = {_fmt(idx)}.",
            (f"An index of {_fmt(idx)} means the price level is "
             f"{_fmt(idx - 100)}% higher than the base year."
             if idx >= 100 else
             f"An index of {_fmt(idx)} means the price level is "
             f"{_fmt(100 - idx)}% below the base year."),
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
            "Laspeyres index = (sum P1Q0 / sum P0Q0) x 100 -- base-year "
            "quantities are the weights.",
            f"sum P1Q0 = {_fmt(num)},  sum P0Q0 = {_fmt(den)}.",
            f"= ({_fmt(num)} / {_fmt(den)}) x 100 = {_fmt(idx)}.",
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
        "Paasche index = (sum P1Q1 / sum P0Q1) x 100 -- current-year "
        "quantities are the weights.",
        f"sum P1Q1 = {_fmt(num)},  sum P0Q1 = {_fmt(den)}.",
        f"= ({_fmt(num)} / {_fmt(den)}) x 100 = {_fmt(idx)}.",
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
     r"\b(?:investment\s+)?multiplier\b",
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

TABLE = _TABLE


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
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("ECONOMICS", "no economics family matched")
