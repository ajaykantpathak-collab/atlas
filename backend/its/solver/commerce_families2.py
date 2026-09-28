"""commerce_families2.py -- expanded commerce chains (batch-7, rewritten):
GST (exclusive / inclusive / CGST-SGST-IGST split), partnership profit
share (stated ratio, capital ratio, equal-split default), current and
liquid ratio (": 1" answer shape), interest on capital (period-aware).

Same house pattern as commerce_families.py / accountancy_families.py:
one _TABLE of rows (FID, compiled trigger regex, compute function), each
compute returning the 6-tuple
    (value, steps, answer, assumptions, governing_equation, extra)
with _GATE = (None, [], None, None, None, None) meaning "trigger hit but
plausibility gate refused -- keep scanning".  The single dispatcher
model_commerce2 (registered in modeling_layer._STRUCTURES) scans the
table in order; first grounded hit wins.  Recognition is by trigger
regex only -- no LLM, no randomness.  The dispatcher deliberately has
NO blanket try/except: a crash must surface to the auditor, not
silently drop a family.

Grounding (closed world):
  - GST exclusive/inclusive/split: c11_comm_isc_06_005 works the
    intra-state laptop invoice (9% CGST + 9% SGST on Rs 12,000 ->
    CGST = SGST = Rs 1,080); c11_comm_isc_06_008 fixes IGST for
    inter-state supply; GST slabs top out at 28% -- rates outside
    (0, 28] are refused as non-taught tax structures.  Discount-then-GST
    order chains belong to commerce_readers.GST_CHAIN (Lane A); this
    module owns the plain arithmetic.
  - partnership: profit shared in the STATED ratio; in the capital
    ratio only when the text says "in their capital ratio"; otherwise
    the default rule is equal shares (no-deed rule taught in the
    partnership chapters).
  - current / liquid ratio: the answer is an "x : 1" SHAPE, so
    numeric_answer is deliberately None (same convention as the
    accountancy ratio families, keeping the modeling-layer answer-shape
    guard happy).
  - interest on capital: P x r/100 x (months/12) -- the period matters;
    the earlier version ignored the period and declined valid probes
    ("allowed at 6% ... for 6 months").

STEP CONTRACT: every family emits the 5-beat steps (Method: /
Given: / computation / Check: / Interpretation:, >= 3 steps,
>= 150 chars) via _five -- asserted by test_commerce_families.py and
re-measured by audit_families_contract.py.

OWNERSHIP NOTE (this rewrite): the earlier version also carried a
crude "CFO = net profit + depreciation" cash-flow family; operating-
activities cash flow is owned (and fully solved, indirect method) by
accountancy_families.CASH_FLOW_OPERATING, so the duplicate was removed.
The old partnership handler divided profit by CAPITAL ratio silently
(wrong default: profits are shared equally absent an agreement) and
rendered steps in scientific notation ("1.5e+04"); both fixed.  The
old current-ratio family shipped the ratio wearing a rupee sign
("Rs 2"); ratios now ship as the "x : 1" shape.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as commerce_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
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
_RS = r"(?:rs\.?|inr|\u20b9)?\s*"

_UNIT_MULT = {"lakh": 1e5, "lac": 1e5, "crore": 1e7, "crores": 1e7,
              "thousand": 1e3}


def _scaled(m: "re.Match") -> float:
    v = float(str(m.group("v")).replace(",", ""))
    u = (m.groupdict().get("u") or "").lower()
    return v * _UNIT_MULT[u] if u in _UNIT_MULT else v


def _fmt(v: float) -> str:
    if abs(v - round(v)) < 1e-9:
        return f"Rs {int(round(v)):,}"
    return f"Rs {v:,.4g}"


def _n(s: str) -> float:
    return float(str(s).replace(",", ""))


def _norm(text: str) -> str:
    t = (text or "")
    t = (t.replace("\u2212", "-").replace("\u2013", "-")
          .replace("\u2014", "-").replace("\u2019", "'")
          .replace("\u20b9", "Rs.").replace("\u00d7", "x"))
    return re.sub(r"\s+", " ", t)


_GATE = (None, [], None, None, None, None)


def _five(method: str, given: str, comp: Optional[List[str]], check: str,
          interp: str) -> List[str]:
    """STEP CONTRACT builder (economics-style beat prefixes, asserted by
    test_commerce_families.py): 1 method/rule line, 2 given figures with
    units, 3 computation, 4 verification, 5 interpretation -- in order."""
    steps = [f"Method: {method}", f"Given: {given}"]
    steps.extend(comp or [])
    steps.append(f"Check: {check}")
    steps.append(f"Interpretation: {interp}")
    return steps


def _grab(lbl: str, t: str, window: int = 40) -> Optional[float]:
    pat = (r"(?:" + lbl + r")[^0-9-]{0," + str(window) + r"}?" + _RS +
           r"(?P<v>" + _NUM + r")\s*(?P<u>lakh|lac|crores?|thousand)?")
    m = re.search(pat, t, re.I)
    return _scaled(m) if m else None


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


def _c_partnership(g, m, t):
    rm = _PROFIT_RE.search(t)
    if not rm:
        return _GATE
    total = _scaled(rm)
    if total <= 0:
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
    cap = (_grab(r"(?:partner'?s?\s+)?capitals?\s+(?:of|is|are|=|:)", t)
           or _grab(r"capital\s+account\s+(?:of|is|stands\s+at)", t)
           or _grab(r"capital", t))
    if cap is None:
        return _GATE
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


# --------------------------------------------------------------------------- #
# family table (trigger -> compute)
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
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

TABLE = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE]


# --------------------------------------------------------------------------- #
# dispatcher
# --------------------------------------------------------------------------- #

def model_commerce2(text: str) -> ModelResult:
    """Deterministic dispatcher for the commerce2 table (registered in
    modeling_layer._STRUCTURES).  First grounded hit wins; gates keep
    scanning.  No blanket try/except: crashes must reach the auditor."""
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
    return _no("COMMERCE2", "no commerce2 family matched")
