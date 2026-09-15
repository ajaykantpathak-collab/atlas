"""commerce_readers.py -- narrative COMMERCE/ACCOUNTANCY readers (Lane B).

Six board-standard (CBSE class 9-12) narrative families that the old
Lane B chain refused outright; the narrative READER was the bottleneck,
not the arithmetic:

    PARTNERSHIP_SHARE      profit split by ratio, or by capital x time
                           (incl. late-join "after m months" entries)
    GST_CHAIN              CGST/SGST split, IGST, discount-then-GST order,
                           inverse taxable value
    INSTALMENT_HIRE        cash price vs instalment total (embedded
                           interest) and equal-instalment PV (embedded
                           compound interest)
    SUCCESSIVE_DISCOUNT    x% then y% chains: final price, equivalent
                           single discount, better-offer comparison
    INTEREST_NARRATIVE     simple/compound interest with rate and term
                           read from prose (years / months / days), and
                           the inverse "at what rate" form
    RATIO_DIVISION         "divide Rs 1200 between A and B in ratio 3:5"

Pattern: strict regex extraction of every quantity, deterministic
closed-form compute, honest refusal whenever any slot is missing or the
reading is ambiguous (never a guessed value).  Every chain step is a
named step; every division guards its denominator (a vanishing
denominator is a refusal, never ZeroDivisionError).  Rs / lakh / crore
surface forms are tolerated (the shared normaliser also rewrites lakh
and crore to full numbers before this module runs).

Dual registration:
  - model_commerce_narrative is registered into modeling_layer's
    _STRUCTURES (registry sweep coverage in Lanes A/C), and
  - read_commerce_narrative is wired into answer_pipeline._lane_b as a
    Lane B reader (wrapper that only promotes VERIFIED results; a
    refusal here returns None so the existing reader chain continues).
"""

from __future__ import annotations

import re
from typing import List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(\d[\d,]*(?:\.\d+)?)"
_CUR = r"(?:rs\.?|inr|\u20b9|rupees?)?"
# Tempered number: the whole number must not be followed by '%' (a rate).
# A plain lookahead would backtrack "18" down to "1" when the full-width
# match is rejected; the tempered (?![\d,]*...%) form rejects every
# prefix of the number as well (18% is never read as amount 1).
_NUMT = r"\d[\d,]*(?:\.\d+)?(?![\d,]*(?:\.\d+)?\s*%)"
_AMT = _CUR + r"\s*(" + _NUMT + r")(?:\s*(lakh|lac|crore))?"

_CONF = 0.95
_WORDS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
          "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11,
          "twelve": 12}


def _clean(text: str) -> str:
    t = text.replace("\xa0", " ")
    t = re.sub(r"[\u2013\u2014\u2212]", "-", t)
    t = re.sub(r"[\ue000-\uf8ff]", " ", t)
    return t


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


def _amt(m: "re.Match", i: int) -> float:
    """Amount from group i (number) and group i+1 (optional lakh/crore)."""
    v = _n(m.group(i))
    scale = (m.group(i + 1) or "").lower()
    if scale.startswith("l"):
        v *= 1e5
    elif scale.startswith("c"):
        v *= 1e7
    return v


def _first_amount(t: str) -> Optional[float]:
    """First money/quantity token that is NOT a percentage."""
    m = re.search(_AMT, t, re.I)
    return _amt(m, 1) if m else None


def _amt_after_kw(t: str, kw_re: str, window: int = 60) -> Optional[float]:
    """First amount after each keyword occurrence; skips percentages and
    whole ratio clauses ("in the ratio 3:2" -- every part of the clause,
    not just its first number)."""
    _ratio_tail = re.compile(r"\s*(?::|to)\s*\d[\d,]*(?:\.\d+)?")
    for m in re.finditer(kw_re, t, re.I):
        seg = t[m.end(): m.end() + window]
        pos = 0
        while True:
            am = re.search(_AMT, seg[pos:], re.I)
            if not am:
                break
            start = pos + am.start(1)
            end = pos + am.end()
            between = seg[pos:start]
            if re.search(r"\bratio\b", between, re.I):
                # skip the number and any following ":part" ratio parts
                while True:
                    mm = _ratio_tail.match(seg[end:])
                    if not mm:
                        break
                    end += mm.end()
                pos = end
                continue
            return _amt(am, 1)
    return None


def _pcts_in(text: str) -> List[float]:
    return [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*%", text)]


def _fmt(v: float) -> str:
    if abs(v - round(v)) < 0.005:
        return f"Rs {round(v):,.0f}"
    return f"Rs {v:,.2f}"


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, quantities: dict, equation: str, val: float,
         steps: List[str], answer: str, note: str = "") -> ModelResult:
    return ModelResult(
        structure=structure, matched=True, confidence=_CONF,
        quantities=quantities, governing_equation=equation,
        final_answer=answer, numeric_answer=float(val),
        steps=steps, note=note)


def _asked_name(t: str) -> Optional[str]:
    m = re.search(r"\b([A-Za-z]{1,15})'?s\s+share\b", t, re.I)
    return m.group(1).lower() if m else None


def _share_answer(name: str, val: float) -> str:
    return f"{name}'s share = {_fmt(val)}"


# --------------------------------------------------------------------------- #
# 1. PARTNERSHIP_SHARE
# --------------------------------------------------------------------------- #

_INV_RE = re.compile(
    r"\b([A-Za-z]{1,15})\s+(?:invests?|invested|puts?\s+in|contributed?|"
    r"starts?\s+(?:a\s+)?business\s+with|started\s+(?:a\s+)?business\s+"
    r"with|began\s+(?:a\s+)?business\s+with)\s+"
    r"(?:rs\.?|inr|\u20b9|rupees?)?\s*(\d[\d,]*(?:\.\d+)?)"
    r"(?:\s*(lakh|lac|crore))?"
    r"(?:\s+for\s+(\d+(?:\.\d+)?)\s*months?)?", re.I)
_CAPS_RE = re.compile(
    r"\b([A-Za-z]{1,15})\s+and\s+([A-Za-z]{1,15})\b[^.]{0,60}?"
    r"capitals?\s+(?:of\s+)?(?:rs\.?|inr|\u20b9|rupees?)?\s*"
    r"(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?\s+and\s+"
    r"(?:rs\.?|inr|\u20b9|rupees?)?\s*(\d[\d,]*(?:\.\d+)?)"
    r"(?:\s*(lakh|lac|crore))?", re.I)
_JOIN_RE = re.compile(
    r"after\s+(\d+(?:\.\d+)?)\s*months?[^.]{0,40}?\b([A-Za-z]{1,15})\s+"
    r"(?:joins?|joined|invests?|invested|entered|enters?)"
    r"[^.]{0,30}?with\s+(?:rs\.?|inr|\u20b9|rupees?)?\s*"
    r"(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?", re.I)
_FIRST_WITH_RE = re.compile(
    r"\b([A-Za-z]{1,15})\s+(?:starts?|started|begins?|began|opens?|"
    r"opened)\s+(?:a\s+)?(?:business\s+)?with\s+"
    r"(?:rs\.?|inr|\u20b9|rupees?)?\s*(\d[\d,]*(?:\.\d+)?)"
    r"(?:\s*(lakh|lac|crore))?", re.I)
_RATIO_RE = re.compile(
    r"ratio\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(?::|to)\s*(\d+(?:\.\d+)?)"
    r"(?:\s*(?::|to)\s*(\d+(?:\.\d+)?))?", re.I)
_NAMES2_RE = re.compile(r"\b([A-Za-z]{1,15})\s+(?:and|&)\s+([A-Za-z]{1,15})\b")
_YEAR_CTX_RE = re.compile(r"end\s+of\s+the\s+(?:first\s+)?year|in\s+one\s+"
                          r"year|for\s+(?:one|a)\s+year|first\s+year", re.I)


def _f_partnership(t: str) -> ModelResult:
    if not re.search(r"\bpartners?\b|\bpartnership\b|\bbusiness\b|"
                     r"share\s+profits?\b", t, re.I):
        return None
    profit = _amt_after_kw(t, r"\bprofits?\b")
    if profit is None or profit <= 0:
        return _no("PARTNERSHIP_SHARE", "profit amount not stated")
    rm = _RATIO_RE.search(t)
    entries: List[Tuple[str, float]] = []   # (label, effective share weight)

    if rm:
        parts = [_n(rm.group(i)) for i in (1, 2) if rm.group(i)]
        if rm.group(3):
            parts.append(_n(rm.group(3)))
        if any(p <= 0 for p in parts):
            return _no("PARTNERSHIP_SHARE", "ratio has a zero/negative part")
        # partner names (2-way "A and B" or 3-way "A, B and C")
        names = None
        tm = re.search(r"\b([A-Za-z]{1,15})\s*,\s*([A-Za-z]{1,15})\s*,?\s*"
                       r"and\s+([A-Za-z]{1,15})\b", t)
        nm = _NAMES2_RE.search(t)
        if tm and len(parts) == 3:
            names = [tm.group(1), tm.group(2), tm.group(3)]
        elif nm and len(parts) == 2:
            names = [nm.group(1), nm.group(2)]
        if names and len(names) != len(parts):
            return _no("PARTNERSHIP_SHARE",
                       "ratio parts do not match the partners named")
        total = sum(parts)
        shares = [profit * p / total for p in parts]   # total > 0 guarded
        labels = [n.capitalize() for n in names] if names \
            else [f"partner {i + 1}" for i in range(len(parts))]
        entries = list(zip(labels, shares))
    else:
        caps: List[Tuple[str, float, Optional[float]]] = []
        for m in _INV_RE.finditer(t):
            months = float(m.group(4)) if m.group(4) else None
            caps.append((m.group(1), _n(m.group(2)), months))
        jm = _JOIN_RE.search(t)
        fm = _FIRST_WITH_RE.search(t)
        cm = _CAPS_RE.search(t)
        if jm and fm:
            if jm.group(2).lower() == fm.group(1).lower():
                return _no("PARTNERSHIP_SHARE",
                           "late-join read the same partner twice")
            if not _YEAR_CTX_RE.search(t):
                return _no("PARTNERSHIP_SHARE",
                           "late-join needs a full-year horizon stated")
            span = 12.0
            late_t = float(jm.group(1))
            if not (0 < late_t < span):
                return _no("PARTNERSHIP_SHARE",
                           "join month out of the year")
            caps = [(fm.group(1), _n(fm.group(2)), span),
                    (jm.group(2), _n(jm.group(3)), span - late_t)]
        elif len(caps) >= 2:
            times = [c[2] for c in caps]
            if any(x is None for x in times) and any(x is not None
                                                     for x in times):
                return _no("PARTNERSHIP_SHARE",
                           "time stated for only some partners")
            if all(x is None for x in times):
                caps = [(n, c, 1.0) for n, c, _ in caps]
        elif cm:
            caps = [(cm.group(1), _n(cm.group(3)), 1.0),
                    (cm.group(2), _n(cm.group(5)), 1.0)]
        else:
            return _no("PARTNERSHIP_SHARE",
                       "need a profit-sharing ratio or the partners' "
                       "capitals/investments")
        weights = [c * tm_ for _, c, tm_ in caps]
        total_w = sum(weights)
        if total_w <= 0:
            return _no("PARTNERSHIP_SHARE",
                       "vanishing denominator: zero total capital x time")
        shares = [profit * w / total_w for w in weights]
        labels = [n.capitalize() for n, _, _ in caps]
        entries = list(zip(labels, shares))

    asked = _asked_name(t)
    if asked:
        hit = [(lb, v) for lb, v in entries if lb.lower() == asked]
        if not hit:
            return _no("PARTNERSHIP_SHARE",
                       f"asked partner '{asked}' is not one of the "
                       f"partners parsed")
        lb, val = hit[0]
        steps = [f"Shares are proportional to the partners' claims; "
                 f"profit = {_fmt(profit)}."]
        steps += [f"{lb_}: {_fmt(v)}" for lb_, v in entries]
        return _res("PARTNERSHIP_SHARE", {"profit": profit, "asked": val},
                    "share_i = profit x claim_i / total claims", val, steps,
                    _share_answer(lb, val))
    steps = [f"Profit {_fmt(profit)} split in the partners' claim ratio."]
    steps += [f"{lb}: {_fmt(v)}" for lb, v in entries]
    return _res("PARTNERSHIP_SHARE", {"profit": profit,
                                      "first_share": entries[0][1]},
                "share_i = profit x claim_i / total claims",
                entries[0][1], steps,
                "; ".join(_share_answer(lb, v) for lb, v in entries))


# --------------------------------------------------------------------------- #
# 2. GST_CHAIN
# --------------------------------------------------------------------------- #

_CGST_SGST_CTX = re.compile(
    r"CGST|SGST|same\s+state|own\s+state|intra-?state|within\s+the\s+state|"
    r"within\s+his\s+(?:own\s+)?state", re.I)
_IGST_CTX = re.compile(
    r"IGST|inter-?state|another\s+state|outside\s+(?:the\s+)?state|"
    r"other\s+state", re.I)
_GST_RATE_RE = re.compile(
    r"(?:GST|tax)[^.\d]{0,30}?(\d+(?:\.\d+)?)\s*%", re.I)
_PCT_GST_RE = re.compile(r"(\d+(?:\.\d+)?)\s*%\s*(?:GST|tax)", re.I)
_INCL_GST_RE = re.compile(
    r"(?:including|inclusive\s+of)[^.]{0,30}?(\d+(?:\.\d+)?)\s*%\s*GST",
    re.I)
_TAXABLE_ASK_RE = re.compile(
    r"taxable\s+value|before\s+GST|pre-?GST|original\s+price|"
    r"basic\s+price", re.I)
_DISC_ON_NET_RE = re.compile(
    r"on\s+the\s+discounted\s+price|after\s+(?:the\s+)?discount|"
    r"on\s+the\s+balance|on\s+the\s+reduced\s+price", re.I)
_DISC_ON_MARKED_RE = re.compile(r"on\s+the\s+marked\s+price", re.I)
_DISC_RE = re.compile(
    r"discount\s+of\s+(\d+(?:\.\d+)?)\s*%|(\d+(?:\.\d+)?)\s*%\s*discount",
    re.I)


def _f_gst(t: str) -> ModelResult:
    is_gst = bool(re.search(r"\bGST\b|goods\s+(?:and|&)\s+services\s+tax",
                            t, re.I))
    dm = _DISC_RE.search(t)
    is_disc_tax = bool(dm) and bool(re.search(r"\btax\b", t, re.I))
    if not (is_gst or is_disc_tax):
        return None
    rm = _GST_RATE_RE.search(t) or _PCT_GST_RE.search(t)
    if not rm:
        return _no("GST_CHAIN", "GST/tax rate not stated")
    rate = float(rm.group(1))
    if not (0 < rate <= 60):
        return _no("GST_CHAIN", "GST rate out of range")

    # (a) inverse: final price including GST -> taxable value
    im = _INCL_GST_RE.search(t)
    if im:
        final = _amt_after_kw(t, r"including|inclusive\s+of", window=60)
        if final is None or final <= 0:
            return _no("GST_CHAIN", "final price including GST not stated")
        if not _TAXABLE_ASK_RE.search(t):
            return _no("GST_CHAIN",
                       "inclusive-GST text without a taxable-value ask")
        den = 1.0 + rate / 100.0        # > 0 by rate guard
        taxable = final / den
        gst = final - taxable
        steps = [f"Final price = taxable x (1 + {rate:g}/100).",
                 f"taxable = {final:g} / {den:g} = {taxable:.6g}; "
                 f"GST = {final:g} - {taxable:.6g} = {gst:.6g}"]
        return _res("GST_CHAIN", {"taxable": taxable, "GST": gst},
                    "taxable = final / (1 + r/100)", taxable, steps,
                    f"taxable value = {_fmt(taxable)} (GST = {_fmt(gst)})")

    # (b) discount-then-GST order
    if dm:
        d = float(dm.group(1) or dm.group(2))
        if not (0 < d < 100):
            return _no("GST_CHAIN", "discount rate out of range")
        base = _first_amount(t)
        if base is None or base <= 0:
            return _no("GST_CHAIN", "marked/base price not stated")
        if _DISC_ON_NET_RE.search(t):
            net = base * (1.0 - d / 100.0)
            order = (f"GST applies to the discounted price: "
                     f"{base:g} x (1 - {d:g}/100) = {net:g}")
        elif _DISC_ON_MARKED_RE.search(t):
            net = base
            order = f"GST applies to the marked price {net:g}"
        else:
            return _no("GST_CHAIN",
                       "discount-then-GST order ambiguous: the text never "
                       "says whether GST is on the discounted or the "
                       "marked price")
        gst = net * rate / 100.0
        final = net + gst
        steps = [order,
                 f"GST = {net:g} x {rate:g}/100 = {gst:.6g}",
                 f"final price = {net:g} + {gst:.6g} = {final:.6g}"]
        ans = f"GST = {_fmt(gst)} (final price {_fmt(final)})"
        return _res("GST_CHAIN", {"base": base, "net": net, "GST": gst,
                                  "final": final},
                    "GST = base x (1 - d/100) x r/100", gst, steps, ans)

    # (c) forward GST on a base value
    base = _first_amount(t)
    if base is None or base <= 0:
        return _no("GST_CHAIN", "taxable value / price not stated")
    gst = base * rate / 100.0
    total = base + gst
    low = t.lower()
    if _CGST_SGST_CTX.search(t):
        half = gst / 2.0
        steps = [f"GST = {base:g} x {rate:g}/100 = {gst:g}; intra-state "
                 f"GST splits equally: CGST = SGST = GST/2.",
                 f"CGST = {half:g}; SGST = {half:g}; "
                 f"total invoice = {base:g} + {gst:g} = {total:g}"]
        return _res("GST_CHAIN", {"CGST": half, "SGST": half,
                                  "total": total},
                    "CGST = SGST = base x r/200", half, steps,
                    f"CGST = {_fmt(half)}; SGST = {_fmt(half)}; "
                    f"total invoice value = {_fmt(total)}")
    if _IGST_CTX.search(t):
        steps = [f"Inter-state supply: IGST = {base:g} x {rate:g}/100 = "
                 f"{gst:g}"]
        return _res("GST_CHAIN", {"IGST": gst},
                    "IGST = base x r/100", gst, steps,
                    f"IGST = {_fmt(gst)}")
    if re.search(r"total|invoice|bill|payable|final\s+price|amount\s+"
                 r"of\s+the\s+bill", low):
        steps = [f"GST = {base:g} x {rate:g}/100 = {gst:g}",
                 f"total = {base:g} + {gst:g} = {total:g}"]
        return _res("GST_CHAIN", {"GST": gst, "total": total},
                    "total = base x (1 + r/100)", total, steps,
                    f"total = {_fmt(total)} (GST = {_fmt(gst)})")
    steps = [f"GST = {base:g} x {rate:g}/100 = {gst:g}",
             f"total = {base:g} + {gst:g} = {total:g}"]
    return _res("GST_CHAIN", {"GST": gst, "total": total},
                "GST = base x r/100", gst, steps,
                f"GST = {_fmt(gst)} (total {_fmt(total)})")


# --------------------------------------------------------------------------- #
# 3. INSTALMENT_HIRE
# --------------------------------------------------------------------------- #

_HP_TRIGGER = re.compile(r"instal?ment|hire[\s-]*purchase", re.I)
_HP_PV_RE = re.compile(
    r"(\d+|one|two|three|four|five|six)\s+equal\s+(annual|yearly)\s+"
    r"instal?ments?", re.I)
_HP_P_RE = re.compile(r"(?:loan|sum|debt|amount)\s+of\s+"
                      r"(?:rs\.?|inr|\u20b9|rupees?)?\s*(\d[\d,]*(?:\.\d+)?)"
                      r"(?:\s*(lakh|lac|crore))?", re.I)
_HP_RATE_RE = re.compile(r"(\d+(?:\.\d+)?)\s*%\s*per\s*annum", re.I)
_HP_CASH_RE = re.compile(r"cash\s+price\b[^.\d]{0,40}?"
                         r"(?:rs\.?|inr|\u20b9|rupees?)?\s*"
                         r"(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?",
                         re.I)
_HP_DOWN_RE = re.compile(
    # "pays Rs 12,000 as down payment" (amount BEFORE the label) ...
    r"(?:rs\.?|inr|\u20b9|rupees?)?\s*(\d[\d,]*(?:\.\d+)?)"
    r"(?:\s*(lakh|lac|crore))?\s+as\s+(?:a\s+)?down\s*[-\s]?payment"
    # ... or "down payment of Rs 5,000" / "down payment is Rs 5,000"
    r"|down\s*[-\s]?payment\s+(?:of\s+|is\s+)(?:rs\.?|inr|\u20b9|"
    r"rupees?)?\s*(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?", re.I)
_HP_INST_RE = re.compile(
    r"(\d+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*"
    r"(?:equal\s+)?(?:monthly\s+|quarterly\s+|annual\s+|yearly\s+|weekly\s+)?"
    r"instal?ments?\s+(?:of\s+|@|is\s+|each\s+of\s+)?"
    r"(?:rs\.?|inr|\u20b9|rupees?)?\s*(\d[\d,]*(?:\.\d+)?)"
    r"(?:\s*(lakh|lac|crore))?", re.I)


def _f_instalment(t: str) -> ModelResult:
    if not _HP_TRIGGER.search(t):
        return None
    pm = _HP_PV_RE.search(t)
    rm = _HP_RATE_RE.search(t)
    lm = _HP_P_RE.search(t)
    if pm and rm and lm:
        n = int(pm.group(1)) if pm.group(1).isdigit() \
            else _WORDS[pm.group(1).lower()]
        i = float(rm.group(1)) / 100.0
        p = _amt(lm, 1)
        if not (1 <= n <= 6) or not (0 < i < 0.9) or p <= 0:
            return _no("INSTALMENT_HIRE", "instalment count/rate/principal "
                         "out of range")
        if not re.search(r"compound", t, re.I):
            return _no("INSTALMENT_HIRE",
                       "equal-instalment PV needs the compounding stated "
                       "(simple vs compound changes the answer)")
        r = 1.0 + i
        rn = r ** n
        den = rn - 1.0
        if den < 1e-12:
            return _no("INSTALMENT_HIRE",
                       "vanishing denominator: r^n - 1 = 0")
        x = p * i * rn / den
        total = n * x
        interest = total - p
        steps = [
            f"Present value of {n} annual instalments of x at "
            f"{rm.group(1)}% p.a. compounded: x/r + x/r^2 + ... + x/r^{n} "
            f"= {p:g}.",
            f"x = P x i x r^{n} / (r^{n} - 1) with r = 1 + i = {r:g}.",
            f"x = {p:g} x {i:g} x {rn:.6g} / {den:.6g} = {x:.6g}",
            f"total paid = {n} x {x:.6g} = {total:.6g}; embedded interest "
            f"= {total:.6g} - {p:g} = {interest:.6g}",
        ]
        return _res("INSTALMENT_HIRE", {"instalment": x, "interest":
                                        interest},
                    "x = P i r^n / (r^n - 1)", x, steps,
                    f"each instalment = {_fmt(x)} (total interest "
                    f"{_fmt(interest)})")

    cm = _HP_CASH_RE.search(t)
    im = _HP_INST_RE.search(t)
    dm = _HP_DOWN_RE.search(t)
    if im:
        if cm is None:
            return _no("INSTALMENT_HIRE",
                       "cash price not stated: the embedded interest "
                       "cannot be grounded")
        if dm is None and re.search(r"down\s*[-\s]?payment", t, re.I):
            return _no("INSTALMENT_HIRE", "down payment amount unparseable")
        cash = _amt(cm, 1)
        down = None
        if dm:
            num = dm.group(1) or dm.group(3)
            scale = dm.group(2) or dm.group(4)
            down = _n(num) if num else 0.0
            if scale and scale.lower().startswith("l"):
                down *= 1e5
            elif scale and scale.lower().startswith("c"):
                down *= 1e7
        else:
            down = 0.0
        k = int(im.group(1)) if im.group(1).isdigit() \
            else _WORDS[im.group(1).lower()]
        each = _amt(im, 2)
        if k < 1 or each <= 0 or cash <= 0:
            return _no("INSTALMENT_HIRE",
                       "instalment count/amount out of range")
        total = down + k * each
        extra = total - cash
        low = t.lower()
        steps = [f"Total paid = down payment + {k} instalments = "
                 f"{down:g} + {k} x {each:g} = {total:g}.",
                 f"Extra over the cash price = {total:g} - {cash:g} = "
                 f"{extra:g}"]
        if extra < 0:
            return _no("INSTALMENT_HIRE",
                       "instalment total is below the cash price: the "
                       "reading is inconsistent")
        if re.search(r"interest", low):
            ans = f"interest charged = {_fmt(extra)}"
            numeric = extra
        elif re.search(r"total\s+(?:amount\s+)?(?:paid|price|cost)", low):
            ans = f"total paid under the scheme = {_fmt(total)}"
            numeric = total
        else:
            ans = (f"total paid = {_fmt(total)}; extra over the cash "
                   f"price = {_fmt(extra)}")
            numeric = extra
        return _res("INSTALMENT_HIRE", {"cash": cash, "down": down,
                                        "total": total, "extra": extra},
                    "extra = (down + k x each) - cash", numeric, steps, ans)
    return _no("INSTALMENT_HIRE",
               "instalment reading needs either instalment amounts or "
               "equal annual instalments with a rate")


# --------------------------------------------------------------------------- #
# 4. SUCCESSIVE_DISCOUNT
# --------------------------------------------------------------------------- #

_SD_TRIGGER = re.compile(r"successive\s+discounts?|discounts?\s+of\s+"
                         r"[^.\n]{0,40}\d+(?:\.\d+)?\s*%\s*(?:,\s*)?and", re.I)
_SD_SUCC_RE = re.compile(
    r"(?:two\s+|three\s+)?successive\s+discounts?\s+of\s+([^.;?]{3,60})",
    re.I)
_SD_ANY_RE = re.compile(r"discounts?\s+of\s+([^.;?]{3,60})", re.I)
_SD_SINGLE_RE = re.compile(
    r"single\s+discount\s+(?:which\s+is\s+)?(?:equivalent\s+to\s+)?of\s+"
    r"(\d+(?:\.\d+)?)\s*%|single\s+discount\s+of\s+(\d+(?:\.\d+)?)\s*%",
    re.I)
_SD_EQUIV_ASK = re.compile(r"single\s+discount\s+equivalent|equivalent\s+"
                           r"single\s+discount|single\s+discount\s+which", re.I)
_SD_BETTER_ASK = re.compile(r"better|more\s+favourable|which\s+offer", re.I)


def _f_successive(t: str) -> ModelResult:
    if not _SD_TRIGGER.search(t):
        return None
    succ_m = _SD_SUCC_RE.search(t)
    single_m = _SD_SINGLE_RE.search(t)
    pcts: List[float] = []
    if succ_m:
        pcts = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*%",
                                             succ_m.group(1))]
    else:
        any_m = _SD_ANY_RE.search(t)
        if any_m:
            pcts = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*%",
                                                 any_m.group(1))]
    if len(pcts) < 2:
        return _no("SUCCESSIVE_DISCOUNT",
                   "successive-discount chain needs two or more rates")
    if any(p <= 0 or p >= 100 for p in pcts):
        return _no("SUCCESSIVE_DISCOUNT", "discount rates out of range")
    factor = 1.0
    for p in pcts:
        factor *= (1.0 - p / 100.0)
    chain = " x ".join(f"(1 - {p:g}/100)" for p in pcts)

    # (a) better-offer comparison: single d% vs successive chain
    if single_m and _SD_BETTER_ASK.search(t):
        d_single = float(single_m.group(1) or single_m.group(2))
        eff_succ = (1.0 - factor) * 100.0
        if abs(d_single - eff_succ) < 1e-9:
            ans = (f"both offers are identical ({d_single:g}% vs "
                   f"{eff_succ:.4g}%)")
            numeric = d_single
        elif d_single > eff_succ:
            ans = (f"the single discount of {d_single:g}% is the better "
                   f"offer ({d_single:g}% vs {eff_succ:.4g}% effective)")
            numeric = d_single
        else:
            ans = (f"the successive discounts are the better offer "
                   f"({eff_succ:.4g}% effective vs {d_single:g}% single)")
            numeric = eff_succ
        steps = [f"Successive discounts multiply: {chain} = "
                 f"{factor:.6g} -> effective discount "
                 f"{(1.0 - factor) * 100.0:.4g}%.",
                 f"Single discount = {d_single:g}%; compare and answer."]
        return _res("SUCCESSIVE_DISCOUNT",
                    {"single": d_single, "eff_succ": eff_succ},
                    "effective = (1 - prod(1 - p_i/100)) x 100", numeric,
                    steps, ans)

    # (b) equivalent single discount
    if _SD_EQUIV_ASK.search(t):
        d_eq = (1.0 - factor) * 100.0
        steps = [f"Successive discounts multiply (not add): {chain} = "
                 f"{factor:.6g} of the marked price.",
                 f"Equivalent single discount = (1 - {factor:.6g}) x 100 "
                 f"= {d_eq:.4g}%"]
        return _res("SUCCESSIVE_DISCOUNT", {"d_eq": d_eq},
                    "d_eq = (1 - prod(1 - p_i/100)) x 100", d_eq, steps,
                    f"single equivalent discount = {d_eq:.4g}%")

    # (c) final price after the chain
    mp = _first_amount(t)
    if mp is None or mp <= 0:
        return _no("SUCCESSIVE_DISCOUNT", "marked price not stated")
    final = mp * factor
    steps = [f"Successive discounts multiply: {chain} = {factor:.6g}.",
             f"final price = {mp:g} x {factor:.6g} = {final:.6g}"]
    return _res("SUCCESSIVE_DISCOUNT", {"marked": mp, "final": final},
                "final = marked x prod(1 - p_i/100)", final, steps,
                f"final price = {_fmt(final)}")


# --------------------------------------------------------------------------- #
# 5. INTEREST_NARRATIVE
# --------------------------------------------------------------------------- #

_TERM_RE = re.compile(r"for\s+(\d+(?:\.\d+)?)\s*(years?|months?|days?)",
                      re.I)
_PERANNUM = r"per\s*annum|p\.\s?a\.?"


def _rate_pct(t: str) -> Optional[float]:
    """Rate: a percent value tied to per-annum, else the only % in text."""
    for m in re.finditer(r"(\d+(?:\.\d+)?)\s*%", t):
        tail = t[m.end(): m.end() + 30]
        if re.search(_PERANNUM, tail, re.I):
            return float(m.group(1))
    pcts = _pcts_in(t)
    if len(pcts) == 1:
        return pcts[0]
    return None


def _term_years(t: str) -> Optional[float]:
    m = _TERM_RE.search(t) or re.search(
        r"in\s+(\d+(?:\.\d+)?)\s*(years?|months?|days?)", t, re.I)
    if not m:
        return None
    v = float(m.group(1))
    unit = m.group(2).lower()
    if unit.startswith("year"):
        return v
    if unit.startswith("month"):
        return v / 12.0
    return v / 365.0            # board convention: 365 days = 1 year


def _f_interest(t: str) -> ModelResult:
    low = t.lower()
    if "interest" not in low:
        return None
    is_compound = bool(re.search(r"compound", low))

    # (a) inverse rate: "at what rate ... amount to ... simple interest"
    if re.search(r"at\s+what\s+rate|what\s+rate\s+percent", low):
        if is_compound:
            return _no("INTEREST_NARRATIVE",
                       "inverse rate with compounding needs a log form "
                       "this family does not ship")
        pm = re.search(r"sum\s+of\s+(?:rs\.?|inr|\u20b9|rupees?)?\s*"
                       r"(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?",
                       t, re.I)
        am = re.search(r"amount\s+to\s+(?:rs\.?|inr|\u20b9|rupees?)?\s*"
                       r"(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?",
                       t, re.I)
        tm = re.search(r"in\s+(\d+(?:\.\d+)?)\s*years?", t, re.I)
        if not (pm and am and tm):
            return _no("INTEREST_NARRATIVE",
                       "inverse rate needs principal, amount and years")
        p = _amt(pm, 1)
        a = _amt(am, 1)
        n = float(tm.group(1))
        if p <= 0 or n <= 0:
            return _no("INTEREST_NARRATIVE", "principal or term non-positive")
        if a <= p:
            return _no("INTEREST_NARRATIVE",
                       "amount does not exceed the principal: no interest")
        rate = (a - p) / (p * n) * 100.0     # p*n > 0 guarded above
        steps = [f"SI = P x r x t/100 with SI = A - P = {a:g} - {p:g} = "
                 f"{a - p:g}.",
                 f"r = (SI x 100) / (P x t) = {(a - p) * 100:g} / "
                 f"({p:g} x {n:g}) = {rate:.6g}%"]
        return _res("INTEREST_NARRATIVE", {"rate": rate},
                    "r = (A - P) x 100 / (P x t)", rate, steps,
                    f"rate = {rate:.6g}% per annum")

    # (b) compound interest
    if is_compound:
        fm = re.search(r"half[-\s]?yearly|semi[-\s]?annually", low)
        qm = re.search(r"quarterly", low)
        if fm:
            f = 2
            fname = "half-yearly"
        elif qm:
            f = 4
            fname = "quarterly"
        elif re.search(r"annually|yearly", low):
            f = 1
            fname = "annually"
        else:
            return _no("INTEREST_NARRATIVE",
                       "compounding frequency not stated (annually / "
                       "half-yearly / quarterly)")
        p = _amt_after_kw(t, r"compound\w*\s+interest\s+on|principal\s+"
                             r"(?:of|is)|sum\s+of|deposits?\s+|borrows?",
                          window=40)
        n = _term_years(t)
        rate = _rate_pct(t)
        if p is None or p <= 0 or n is None or n <= 0 \
                or rate is None or rate <= 0:
            return _no("INTEREST_NARRATIVE",
                       "compound interest needs principal, rate and term")
        per = rate / (100.0 * f)
        periods = n * f
        amount = p * (1.0 + per) ** periods
        ci = amount - p
        steps = [f"Compounded {fname}: {f} period(s)/year, rate per "
                 f"period = {rate:g}/({100}x{f}) = {per * 100:.6g}%.",
                 f"amount = {p:g} x (1 + {per:.6g})^{periods:g} = "
                 f"{amount:.6g}",
                 f"CI = {amount:.6g} - {p:g} = {ci:.6g}"]
        ask_amount = bool(re.search(r"amount\s+(?:will|does|to)|find\s+"
                                    r"the\s+amount", low))
        val = amount if ask_amount else ci
        return _res("INTEREST_NARRATIVE", {"P": p, "CI": ci, "amount":
                                           amount},
                    "A = P (1 + r/(100f))^(nt); CI = A - P", val, steps,
                    f"compound interest = {_fmt(ci)} (amount "
                    f"{_fmt(amount)})")

    # (c) simple interest (direct and inverse-time)
    rate = _rate_pct(t)
    p = _amt_after_kw(t, r"simple\s+interest\s+on|interest\s+on|"
                         r"principal\s+(?:of|is)|sum\s+of|borrows?|"
                         r"deposits?", window=40)
    if p is None or p <= 0:
        return _no("INTEREST_NARRATIVE", "principal not stated")
    if rate is None or rate <= 0:
        return _no("INTEREST_NARRATIVE", "rate not stated")
    # inverse time: "in how many years will ... amount to ..."
    am = re.search(r"amount\s+to\s+(?:rs\.?|inr|\u20b9|rupees?)?\s*"
                   r"(\d[\d,]*(?:\.\d+)?)(?:\s*(lakh|lac|crore))?",
                   t, re.I)
    if am and re.search(r"how\s+many\s+years|how\s+(?:much\s+)?time|"
                        r"in\s+what\s+time", low):
        a = _amt(am, 1)
        if a <= p:
            return _no("INTEREST_NARRATIVE",
                       "amount does not exceed the principal")
        n = (a - p) * 100.0 / (p * rate)     # p x rate > 0 guarded
        steps = [f"SI = A - P = {a:g} - {p:g} = {a - p:g}.",
                 f"t = SI x 100 / (P x r) = {(a - p) * 100:g} / "
                 f"({p:g} x {rate:g}) = {n:.6g} years"]
        return _res("INTEREST_NARRATIVE", {"years": n},
                    "t = (A - P) x 100 / (P x r)", n, steps,
                    f"{n:.6g} years")
    n = _term_years(t)
    if n is None or n <= 0:
        return _no("INTEREST_NARRATIVE",
                   "term not stated (years / months / days)")
    si = p * rate * n / 100.0              # all factors guarded positive
    steps = [f"P = {p:g}, r = {rate:g}% per annum, t = {n:.6g} years.",
             f"SI = P x r x t / 100 = {p:g} x {rate:g} x {n:.6g} / 100 "
             f"= {si:.6g}"]
    amount = p + si
    ask_amount = bool(re.search(r"amount\s+(?:will|does|to|he|she)|"
                                r"total\s+amount", low))
    if ask_amount:
        steps.append(f"amount = P + SI = {p:g} + {si:.6g} = "
                     f"{amount:.6g}")
        ans = f"amount = {_fmt(amount)} (SI {_fmt(si)})"
        val = amount
    else:
        ans = f"simple interest = {_fmt(si)} (amount {_fmt(amount)})"
        val = si
    return _res("INTEREST_NARRATIVE", {"P": p, "SI": si, "amount": amount},
                "SI = P r t / 100", val, steps, ans)


# --------------------------------------------------------------------------- #
# 6. RATIO_DIVISION
# --------------------------------------------------------------------------- #

_RD_TRIGGER = re.compile(r"\bdivide\b|\bdivided\b|\bdivides\b", re.I)
_RD_BETWEEN = re.compile(r"between\s+(?:the\s+)?([A-Za-z]{1,15})\s+and\s+"
                         r"([A-Za-z]{1,15})", re.I)
_RD_AMONG = re.compile(r"among\s+(?:the\s+)?([A-Za-z]{1,15})\s*,\s*"
                       r"([A-Za-z]{1,15})(?:\s*,\s*and\s*|\s+and\s+)"
                       r"([A-Za-z]{1,15})", re.I)


def _f_ratio_division(t: str) -> ModelResult:
    if not _RD_TRIGGER.search(t):
        return None
    if re.search(r"divide[^.]{0,25}\bby\b", t, re.I):
        return None                      # pure arithmetic "divide x by y"
    amount = _first_amount(t)
    rm = _RATIO_RE.search(t)
    if amount is None or amount <= 0:
        return _no("RATIO_DIVISION", "amount to divide not stated")
    if rm is None:
        return _no("RATIO_DIVISION", "sharing ratio not stated")
    parts = [_n(rm.group(i)) for i in (1, 2)]
    if rm.group(3):
        parts.append(_n(rm.group(3)))
    if any(p <= 0 for p in parts):
        return _no("RATIO_DIVISION", "ratio has a zero/negative part")
    names = None
    tm = _RD_AMONG.search(t)
    nm = _RD_BETWEEN.search(t)
    if tm and len(parts) == 3:
        names = [tm.group(1), tm.group(2), tm.group(3)]
    elif nm and len(parts) == 2:
        names = [nm.group(1), nm.group(2)]
    if names and len(names) != len(parts):
        return _no("RATIO_DIVISION",
                   "ratio parts do not match the people named")
    total = sum(parts)                   # > 0: every part is positive
    shares = [amount * p / total for p in parts]
    labels = [n.capitalize() for n in names] \
        if names else [f"share {i + 1}" for i in range(len(parts))]
    asked = _asked_name(t)
    if asked:
        hit = [(lb, v) for lb, v in zip(labels, shares)
               if lb.lower() == asked]
        if hit:
            lb, val = hit[0]
            steps = [f"{_fmt(amount)} split in the ratio "
                     f"{':'.join(str(int(p)) if p == int(p) else str(p) for p in parts)}.",
                     f"{lb}: {amount:g} x {parts[labels.index(lb)]:g}/"
                     f"{total:g} = {val:.6g}"]
            return _res("RATIO_DIVISION", {"amount": amount, "asked": val},
                        "share_i = amount x part_i / sum(parts)", val,
                        steps, _share_answer(lb, val))
        # "the larger share" style asks have no name: fall through
    steps = [f"{_fmt(amount)} split in the ratio "
             f"{':'.join(str(int(p)) if p == int(p) else str(p) for p in parts)}.",
             f"sum of parts = {total:g}"]
    steps += [f"{lb}: {amount:g} x {p:g}/{total:g} = {v:.6g}"
              for lb, p, v in zip(labels, parts, shares)]
    ans = "; ".join(_share_answer(lb, v) for lb, v in zip(labels, shares))
    return _res("RATIO_DIVISION", {"amount": amount, "first": shares[0]},
                "share_i = amount x part_i / sum(parts)", shares[0], steps,
                ans)


# --------------------------------------------------------------------------- #
# Dispatcher + registration
# --------------------------------------------------------------------------- #

_FAMILIES = (_f_partnership, _f_gst, _f_instalment, _f_successive,
             _f_interest, _f_ratio_division)


def model_commerce_narrative(text: str) -> ModelResult:
    t = _clean(text)
    for fn in _FAMILIES:
        try:
            r = fn(t)
        except Exception:
            continue
        if r is not None and r.matched:
            return r
    return _no("COMMERCE_NARRATIVE", "no commerce narrative family matched")


def read_commerce_narrative(text: str, audit) -> Optional[object]:
    """Lane B wrapper: only a VERIFIED result is promoted; any refusal
    returns None so the existing reader chain and honest refusals
    downstream stay untouched."""
    r = model_commerce_narrative(text)
    if not (r is not None and r.matched):
        return None
    from backend.its.solver.answer_pipeline import VERIFIED, PipelineResult
    audit.route.append("event_chain:" + r.structure.lower())
    audit.gates_passed.append("commerce_narrative_grounding")
    return PipelineResult(label=VERIFIED, answer=r.final_answer,
                          numeric=r.numeric_answer, steps=r.steps,
                          audit=audit)


def _register_into_ml() -> bool:
    """Import-order-safe registration (same pattern as extra_families2):
    if THIS module is imported first, modeling_layer's batch import hits
    a partially-initialised module and silently skips."""
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not any(getattr(fn, "__name__", "") == "model_commerce_narrative"
               for fn in _ml._STRUCTURES):
        _ml._STRUCTURES.append(model_commerce_narrative)
    return True


if not _register_into_ml():
    pass  # modeling_layer not importable yet; its batch-14 registers us
