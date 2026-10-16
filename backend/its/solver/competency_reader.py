"""competency_reader.py -- Lane B: read narratives into event chains.

Deterministic narrative reader (ARIS-style, Hosseini et al. EMNLP 2014
pattern): split the story into sentences, match each against EVENT
CONSTRUCTORS (verb-triggered slot grammars), and apply them to a STATE
TABLE (money in/out, entity counts).  The final state answers the ask.

v1 family: the profit/loss trading chain (the canonical CBSE competency
narrative):

    "Ramesh buys 120 mangoes at 5 rupees each. 15 of them rot.
     He sells the rest at 8 rupees each. How much profit?"

    BUY      -> money.spent += N*P ; inventory[X] = N
    SPOIL    -> inventory[X] -= K
    SELL_ALL -> money.received += rest*P
    ASK profit -> received - spent      ASK loss  -> spent - received

Each constructor emits an IR step; the chain executes in order; every
number is grounded in the text.  Unknown sentences are tolerated (they
may be flavor) but an unresolvable ASK refuses honestly -- never a
guessed chain.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED)

_RS = r"(?:rs\.?|inr|" + chr(8377) + r")?\s*"
_NUM = r"(?:\d+(?:\.\d+)?)"   # NON-capturing: wrap at usage sites


def _no(reason: str, audit: AuditTrail) -> PipelineResult:
    return PipelineResult(label=GUIDED, answer=None, numeric=None,
                          steps=[], audit=audit, refusal_reason=reason)


# --------------------------------------------------------------------------- #
# Event constructors: (pattern, handler).  Order matters: the most
# specific verb phrase wins.  Each returns state deltas + a step line.
# --------------------------------------------------------------------------- #

_BUY_RE = re.compile(
    r"(?:buys?|bought|purchas\w+)\s+(" + _NUM + r")\s+(?:pieces\s+of\s+)?"
    r"([a-z ]{3,30}?)\s+at\s+" + _RS + "(" + _NUM + r")\s*"
    r"(?:each|per\s+\w+)?",
    re.I)
_SPOIL_RE = re.compile(
    r"(" + _NUM + r")\s+(?:of\s+(?:them|these|those)\s+)?"
    r"(?:were\s+|got\s+|are\s+|is\s+)?"
    r"(rot\w*|damag\w*|broke?|spoiled?|spoilt|broken)", re.I)
_SELL_REST_RE = re.compile(
    r"(?:sells?|sold)\s+(?:all\s+of\s+(?:them|it)|the\s+rest"
    r"(?:\s+of\s+(?:them|it))?)\s+at\s+" + _RS +
    "(" + _NUM + r")\s*(?:each|per\s+\w+)?", re.I)
_SELL_NUM_RE = re.compile(
    r"sells?\s+(" + _NUM + r")\s+([a-z ]{3,30}?)\s+(?:for|at)\s+" + _RS +
    "(" + _NUM + r")\s*(?:each|per\s+\w+)?", re.I)
_ASK_PROFIT = re.compile(r"profit", re.I)
_ASK_LOSS = re.compile(r"\bloss\b", re.I)


def read_narrative(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Attempt an event-chain read.  Returns a PipelineResult (verified
    or guided) or None when no constructor matched at all (letting the
    caller try other lanes)."""
    low = text.lower()
    if not re.search(r"profit|loss|spent|earned|received", low):
        return None                      # not our family: caller continues

    sentences = [s.strip() for s in re.split(r"[.!?]\s+", text) if s.strip()]
    state: Dict[str, Any] = {
        "inventory": None,               # current count of the item
        "inventory_name": "",
        "spent": 0.0,
        "received": 0.0,
        "cost_known": False,
        "revenue_known": False,
    }
    steps: List[str] = []

    for sent in sentences:
        m = _BUY_RE.search(sent)
        if m:
            n, item, price = (float(m.group(1)), m.group(2).strip(),
                              float(m.group(3)))
            cost = n * price
            state["inventory"] = n
            state["inventory_name"] = item
            state["spent"] += cost
            state["cost_known"] = True
            steps.append(f"Bought {n:g} {item} at {price:g} each -> "
                         f"cost = {cost:g}")
            continue
        m = _SPOIL_RE.search(sent)
        if m and state["inventory"] is not None:
            k = float(m.group(1))
            state["inventory"] -= k
            steps.append(f"{k:g} damaged -> {state['inventory']:g} "
                         f"remain")
            continue
        m = _SELL_REST_RE.search(sent)
        if m and state["inventory"] is not None:
            price = float(m.group(1))
            rest = state["inventory"]
            revenue = rest * price
            state["received"] += revenue
            state["revenue_known"] = True
            steps.append(f"Sold {rest:g} at {price:g} each -> revenue = "
                         f"{revenue:g}")
            continue
        m = _SELL_NUM_RE.search(sent)
        if m:
            n, price = float(m.group(1)), float(m.group(3))
            if state["inventory"] is not None:
                state["inventory"] -= n
            revenue = n * price
            state["received"] += revenue
            state["revenue_known"] = True
            steps.append(f"Sold {n:g} at {price:g} each -> revenue = "
                         f"{revenue:g}")
            continue

    if not (state["cost_known"] or state["revenue_known"]):
        return None                      # no event recognized: not ours

    ask_profit = bool(_ASK_PROFIT.search(low))
    ask_loss = bool(_ASK_LOSS.search(low))
    if not (ask_profit or ask_loss):
        # a trading chain without profit/loss ask: report net gain
        ask_profit, ask_loss = True, False

    profit = state["received"] - state["spent"]
    if not (state["cost_known"] and state["revenue_known"]):
        return _no("trading chain incomplete: need both cost and "
                   "revenue events", audit)
    label_word = "Profit" if profit >= 0 else "Loss"
    val = abs(profit)
    steps.append(f"{label_word} = |{state['received']:g} - "
                 f"{state['spent']:g}| = {val:g}")

    audit.route.append("event_chain:trading")
    # WS-PAL (ovh-pal): the badge gate resolves verifiers only via a
    # 'structure:' route entry; 'event_chain:trading' never reached one
    # so every correct trading answer died as verifier_no_route.
    audit.route.append("structure:TRADING")
    audit.gates_passed.append("event_chain_grounding")
    audit.readings_considered = 1
    if ask_loss and profit >= 0:
        return _no("chain computes profit but the ask says loss",
                   audit)
    return PipelineResult(
        label=VERIFIED,
        answer=f"{label_word} of {val:g} rupees",
        numeric=val,
        steps=steps,
        audit=audit)


# --------------------------------------------------------------------------- #
# Family 2: SEQUENTIAL PERCENT CHANGE (class 8-10 competency chain)
#
#     "The price is 800 rupees. It increases by 20% and then decreases
#      by 10%. What is the final price / net change?"
#
#     Chain: base -> x(1 + a%) -> x(1 - b%) -> final ; net % vs base.
# --------------------------------------------------------------------------- #

_PCT_STEP_RE = re.compile(
    r"(?:(increas\w+|decreas\w+|rise[s]?|fall[s]?|drop[s]?)\s*(?:by\s*)?"
    r"|(?:and|then|,)\s+by\s+)"
    r"(\d+(?:\.\d+)?)\s*%", re.I)


def read_percent_chain(text: str, audit: AuditTrail
                       ) -> Optional[PipelineResult]:
    low = text.lower()
    steps_re = list(_PCT_STEP_RE.finditer(low))
    if not steps_re:
        return None
    # base: first number in the text that is not a percent-step value
    step_positions = [m.start(2) for m in steps_re]
    base = None
    for m in re.finditer(_NUM, low):
        if any(abs(m.start() - p) < 6 for p in step_positions):
            continue
        base = float(m.group(0))
        break
    if base is None or base <= 0:
        return _no('no positive base value found', audit)
    val = base
    steps = [f'start: {base:g}']
    # an elided verb ('increases by 10% and by 5%') inherits the
    # previous step's direction — the old single-verb regex dropped the
    # second step entirely and shipped 22000 'net +10%' for a
    # 10%-then-5% question (true: 23100, net +15.5%).
    prev_up = True
    for m in steps_re:
        pct = float(m.group(2))
        word = m.group(1).lower() if m.group(1) else ''
        if word.startswith('decreas') or word.startswith('fall') \
                or word.startswith('drop'):
            up = False
        elif word.startswith('increas') or word.startswith('rise'):
            up = True
        else:
            up = prev_up          # ', and by 5%' continues the direction
        prev_up = up
        if up:
            val = val * (1 + pct / 100.0)
            steps.append(f'increase {pct:g}% -> {val:.6g}')
        else:
            val = val * (1 - pct / 100.0)
            steps.append(f'decrease {pct:g}% -> {val:.6g}')
    net = (val / base - 1.0) * 100.0
    steps.append(f'net change vs base: {net:+.4g}%')
    audit.route.append('event_chain:percent_steps')
    # WS-PAL (ovh-pal): name the route so the badge gate can resolve
    # the registered PERCENT_STEPS verifier (event_chain:* is invisible
    # to it).
    audit.route.append('structure:PERCENT_STEPS')
    audit.gates_passed.append('percent_chain_grounding')
    audit.readings_considered = 1
    return PipelineResult(
        label=VERIFIED, answer=f'{val:.6g} (net {net:+.4g}%)',
        numeric=val, steps=steps, audit=audit,
        refusal_reason=None)
