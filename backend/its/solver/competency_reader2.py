"""competency_reader2.py -- Lane B batch: work-rate and mixture chains.

    WORK_TOGETHER   "A can do a work in 6 days, B in 8 days. Working
                     together, how long?"  -> 1/(1/6+1/8)
                    plus constructor phrasings:
                      "A takes 6 days to complete..."
                      "A finishes the work in 6 days"
                      "A alone can do it in 6 days"
                      "A, B and C can do it in 6, 8 and 10 days" (trio)
                    plus the inverse chain (_solve_reverse):
                      "A and B together can do it in 12 days. A alone
                       can do it in 20 days. How long for B alone?"
                       -> 1/B = 1/N - 1/M
    MIXTURE_BLEND   "V1 L of P1% solution mixed with V2 L of P2%"
                     -> concentration = (P1V1+P2V2)/(V1+V2)
                    plus the inverse constructors:
                      "How much water must be added to V L of P% to
                       dilute it to Q%?"  -> w = V(P-Q)/Q
                      "How much pure alcohol must be added to V L of
                       P% to make it Q%?" -> x = V(Q-P)/(100-Q)

All grounded in CBSE class 7-8 competency phrasings.  Deterministic
slot grammars; refuses honestly when slots are missing.
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Tuple

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED)

_NUM = r"(\d+(?:\.\d+)?)"

# ------------------------------------------------------------------ #
# work-rate: two surface grammars for "worker X needs D days"
#   1. "A (alone) can do/complete/finish (the|a) (same) (piece of)
#      work/job/task/it in D days"
#   2. "A takes D days to do/complete/finish ..."
# ------------------------------------------------------------------ #
_DAYS_RE = re.compile(
    r"(?P<who>[A-Za-z])\s+(?:(?:can|could)\s+)?(?:alone\s+)?"
    r"(?:do|complet\w+|finish\w*)(?:\s+(?:the|a|an|it))?(?:\s+same)?"
    r"(?:\s+piece\s+of)?\s*(?:work|job|task|it)?\s+in\s+"
    r"(?P<num>\d+(?:\.\d+)?)\s+days?"
    r"|(?P<who2>[A-Za-z])\s+takes?\s+(?P<num2>\d+(?:\.\d+)?)\s+days?\s+"
    r"to\s+(?:do|complet\w+|finish\w*)", re.I)
_TOGETHER_ASK = re.compile(
    r"together|both|combined|working\s+together|same\s+time", re.I)
_ASK_SENT_RE = re.compile(
    r"how\s+(?:long|much\s+time|many\s+days)|in\s+how\s+many\s+days", re.I)
# trio listing: "A, B and C can do it in 6, 8 and 10 days"
_TRIO_HEAD_RE = re.compile(
    r"\b([A-Za-z])\s*,\s*([A-Za-z])\s*,?\s+and\s+([A-Za-z])\s+"
    r"(?:(?:can|could)\s+)?(?:do|complet\w+|finish\w*|takes?)\b", re.I)

_MIX_RE = re.compile(
    _NUM + r"\s*(?:litres?|liters?|L|ml|millilit?res?)\s+of\s+"
    r"(?:a\s+)?(\d+(?:\.\d+)?)\s*%\s+(?:solution|salt\s+solution|acid|"
    r"alcohol|sugar\s+solution)", re.I)
_MIX_ASK = re.compile(
    r"mix\w*|combined|resulting\s+(?:solution|mixture)|concentration\s+"
    r"of\s+the\s+(?:resulting|mixture)", re.I)
# reverse mixture: solve for the ADDED quantity, not the result
_REV_MIX_ASK = re.compile(
    r"how\s+much\s+(?P<what>water|pure\s+alcohol|alcohol)\s+"
    r"(?:must|should|is\s+to)\s+be\s+added\b.{0,80}?"
    r"\b(?:dilut\w*|make\w*|strengthen\w*|weak\w*|reduc\w*)\b", re.I)
_REV_MIX_DATA = re.compile(
    r"(?P<vol>\d+(?:\.\d+)?)\s*"
    r"(?P<unit>l|litres?|liters?|ml|millilit?res?)\b\s+of\s+"
    r"(?:a\s+|an\s+)?(?P<pct>\d+(?:\.\d+)?)\s*%", re.I)
_REV_MIX_TARGET = re.compile(
    r"\bto\b[^.%]{0,40}?(?P<q>\d+(?:\.\d+)?)\s*%", re.I)
_UNIT_NAME = {"l": "litres", "litre": "litres", "liter": "liters"}


def _no(reason: str, audit: AuditTrail) -> PipelineResult:
    return PipelineResult(label=GUIDED, answer=None, numeric=None,
                          steps=[], audit=audit, refusal_reason=reason)


def _slots(m) -> Tuple[str, float]:
    """(worker letter, day-count) from either _DAYS_RE branch."""
    who = m.group("who") or m.group("who2")
    num = m.group("num") or m.group("num2")
    return who.upper(), float(num)


def _ask_says_alone(low: str) -> bool:
    """True when the question sentence itself asks for a solo time
    ("how long will B alone take")."""
    for sent in re.split(r"[.;\n?!]", low):
        if _ASK_SENT_RE.search(sent) and "alone" in sent:
            return True
    return False


def _parse_trio(text: str) -> Optional[List[Tuple[str, float]]]:
    """"A, B and C can do it in X, Y and Z days" -> [(A,X),(B,Y),(C,Z)]"""
    head = _TRIO_HEAD_RE.search(text)
    if head is None:
        return None
    names = [head.group(i).upper() for i in (1, 2, 3)]
    seg = text[head.end():].split(".")[0]
    im = re.search(r"\bin\s+", seg, re.I)
    if im is None or not re.search(r"days", seg, re.I):
        return None
    nums = [float(x) for x in re.findall(r"\d+(?:\.\d+)?", seg[im.end():])]
    if len(nums) < 3:
        return None
    return list(zip(names, nums[:3]))


def _solve_reverse(text: str, low: str,
                   audit: AuditTrail) -> Optional[PipelineResult]:
    """Inverse work-rate: together time N for a pair, one partner's solo
    time M given, the other partner's solo time asked.

        1/B = 1/N - 1/M          B = N*M / (M - N)
    """
    together = None                      # (letters, N)
    single: Dict[str, float] = {}        # letter -> solo days
    for sent in re.split(r"[.;\n?!]", text):
        letters = sorted(set(re.findall(
            r"(?<![A-Za-z])[A-Za-z](?![A-Za-z])", sent)))
        nums = [float(x) for x in re.findall(
            r"(\d+(?:\.\d+)?)\s*days?", sent, re.I)]
        if len(nums) != 1:
            continue
        if len(letters) >= 2 and together is None:
            together = (letters, nums[0])
        elif len(letters) == 1:
            single[letters[0]] = nums[0]
    if together is None:
        return None
    pair, n = together
    # asked worker: the letter tied to the last "alone" mention
    target = None
    for m in re.finditer(
            r"(?<![A-Za-z])([A-Za-z])(?![A-Za-z])[^.?!]*?\balone\b", low):
        target = m.group(1).upper()
    if target is None:
        return None
    if target in single:
        # the asked time is stated outright; no computation needed
        days = single[target]
        audit.route.append("structure:TIME_WORK_TOGETHER")
        return PipelineResult(
            label=VERIFIED, answer=f"{days:.4g} days", numeric=days,
            steps=[f"{target} alone takes {days:g} days (stated in the "
                   f"problem); nothing to derive"],
            audit=audit)
    others = [w for w in pair if w != target]
    if not others or others[0] not in single:
        return None
    m_days = single[others[0]]
    rate = 1.0 / n - 1.0 / m_days
    if rate <= 0:
        return None
    days = 1.0 / rate
    audit.route.append("structure:TIME_WORK_TOGETHER")
    return PipelineResult(
        label=VERIFIED, answer=f"{days:.4g} days", numeric=days,
        steps=[f"Together ({' and '.join(pair)}) rate = 1/{n:g} work/day",
               f"{others[0]} alone: rate = 1/{m_days:g} work/day",
               f"{target} rate = 1/{n:g} - 1/{m_days:g} = "
               f"{rate:.6g} work/day",
               f"{target} alone: 1/{rate:.6g} = {days:.4g} days"],
        audit=audit)


def read_work_together(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    low = text.lower()
    days_hit = _DAYS_RE.search(low)
    trio_hit = _TRIO_HEAD_RE.search(low)
    ask_alone = _ask_says_alone(low)
    if not ((_TOGETHER_ASK.search(low) and (days_hit or trio_hit))
            or (ask_alone and days_hit)):
        return None
    # inverse chain first: a solo ask must never be answered with the
    # combined-time formula
    if ask_alone:
        rev = _solve_reverse(text, low, audit)
        if rev is not None:
            return rev
        return _no("the asked alone-time is not derivable from the "
                   "day-counts given", audit)
    workers = [_slots(m) for m in _DAYS_RE.finditer(text)]
    if len(workers) < 2:
        trio = _parse_trio(text)
        if trio is not None:
            workers = trio
    if len(workers) < 2:
        return _no(f"need two workers' day-counts (got {len(workers)})",
                   audit)
    rate = sum(1.0 / d for _, d in workers)
    if rate <= 0:
        return _no("WORK_TOGETHER: non-positive combined rate", audit)
    days = 1.0 / rate
    parts = " + ".join(f"1/{d:g}" for _, d in workers)
    names = " and ".join(w for w, _ in workers)
    # WS-PAL (ovh-pal 2026-10-13): the badge gate resolves the verifier
    # by a 'structure:' route entry; this reader shipped VERIFIED with
    # no route and every correct work-together answer downgraded to
    # 'verifier_no_route' -> GUIDED (fail-closed).  Name it.
    audit.route.append("structure:TIME_WORK_TOGETHER")
    return PipelineResult(
        label=VERIFIED, answer=f"{days:.4g} days", numeric=days,
        steps=[f"{names}: 1-day rates = {parts}",
               f"Combined rate = {rate:.6g} work/day",
               f"Time together = 1/{rate:.6g} = {days:.4g} days"],
        audit=audit)


def _solve_reverse_mixture(low: str, ask, audit: AuditTrail
                           ) -> PipelineResult:
    """Inverse dilution/enrichment: solve for the added quantity."""
    data = _REV_MIX_DATA.search(low)
    if data is None:
        return _no("MIXTURE_REVERSE: need 'V litres of P% solution' "
                   "slots", audit)
    vol = float(data.group("vol"))
    unit = _UNIT_NAME.get(data.group("unit").lower(), data.group("unit"))
    p = float(data.group("pct"))
    qm = _REV_MIX_TARGET.search(low[data.end():])
    if qm is None:
        return _no("MIXTURE_REVERSE: missing target concentration Q%",
                   audit)
    q = float(qm.group("q"))
    what = ask.group("what").lower()
    solute0 = vol * p / 100.0
    if "water" in what:
        # dilution: solute fixed, w = V(P-Q)/Q
        if not p > q > 0:
            return _no("MIXTURE_REVERSE: dilution needs P% > Q% > 0",
                       audit)
        added = vol * (p - q) / q
        steps = [
            f"Solute stays fixed: {vol:g} x {p:g}% = {solute0:.6g}",
            f"After adding w water: (V + w) x {q:g}% = {solute0:.6g}",
            f"w = V({p:g}-{q:g})/{q:g} = {added:.6g}",
        ]
    else:
        # pure-alcohol enrichment: x = V(Q-P)/(100-Q)
        if not 100 > q > p:
            return _no("MIXTURE_REVERSE: enrichment needs 100 > Q% > P%",
                       audit)
        added = vol * (q - p) / (100.0 - q)
        steps = [
            f"Initial solute: {vol:g} x {p:g}% = {solute0:.6g}",
            f"Add x pure alcohol: solute = {solute0:.6g} + x, "
            f"volume = {vol:g} + x",
            f"({vol:g} + x) x {q:g}% = {solute0:.6g} + x",
            f"x = V({q:g}-{p:g})/(100-{q:g}) = {added:.6g}",
        ]
    audit.route.append("structure:MIXTURE_REVERSE")   # WS-PAL: name the route
    return PipelineResult(
        label=VERIFIED, answer=f"{added:.4g} {unit} of {what}",
        numeric=added, steps=steps, audit=audit)


def read_mixture_blend(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    low = text.lower()
    rev_ask = _REV_MIX_ASK.search(low)
    if rev_ask is not None:
        # the ask names the reverse constructor outright: refuse honestly
        # rather than let a slot gap fall through to the forward reader
        return _solve_reverse_mixture(low, rev_ask, audit)
    if not (_MIX_ASK.search(low) and _MIX_RE.search(low)):
        return None
    parts = [(float(m.group(1)), float(m.group(2)))
             for m in _MIX_RE.finditer(text)]
    if len(parts) < 2:
        # only one known concentration + an "add X%" ask is the
        # addition form (MIXTURE_ADDITION family), not blending:
        # decline (None) so the registry sweep gets its turn
        return None
    solute = sum(vol * pct / 100.0 for vol, pct in parts)
    total = sum(vol for vol, _ in parts)
    if total <= 0:
        return _no("MIXTURE_BLEND: zero total volume", audit)
    conc = solute / total * 100.0
    desc = " + ".join(f"{p:g}% of {v:g}L" for v, p in parts)
    audit.route.append("structure:MIXTURE_BLEND")   # WS-PAL: name the route
    return PipelineResult(
        label=VERIFIED, answer=f"{conc:.4g}%", numeric=conc,
        steps=[f"Solute: {desc} = {solute:.6g} L",
               f"Total volume = {total:g} L",
               f"Concentration = {solute:.6g}/{total:g} x 100 = "
               f"{conc:.4g}%"],
        audit=audit)
