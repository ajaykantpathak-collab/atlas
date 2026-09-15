"""surface_renderer.py -- Author-first surface generation from IR.

Everything the student READS for corpus-derived practice is rendered
here, deterministically, from IR structure -- never copied from source
text (ARCHITECTURE.md 18: restricted-rendition content is structure
only; this module is the sole voice of that structure).

Capabilities (v2):
    render_question(ir, mode)  -- natural question text (topic templates,
                                  3-4 deterministic variants) + guided
                                  scaffold (final answer withheld in
                                  'guided')
    vary(ir, seed)             -- deterministic number perturbation,
                                  chain re-executed, anchor recomputed;
                                  literals that appear more than once in
                                  the chain are never varied (geometry
                                  like r*r stays consistent), and known
                                  formula constants (22/7, 100, 360...)
                                  are untouchable.  Returns None when a
                                  variant cannot re-execute cleanly.

Determinism rule: no RNG without a seed; same inputs -> same output.
"""

from __future__ import annotations

import hashlib
import random
import re
from typing import Dict, List, Optional

from backend.its.solver.ir import IR, Quantity, Step
from backend.its.solver.validator import eval_expression

# formula constants that must survive variation untouched
_PROTECTED = {22, 7, 100, 1000, 360, 180, 90, 2, 3, 3.14, 3.142, 3.1416,
              0.5, 1.5, 2.5, 12, 60, 24, 10}
_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?")


def humanize(slug: str) -> str:
    """'area_of_shaded_region' -> 'area of shaded region'."""
    words = slug.replace("_", " ").strip().split()
    return " ".join(w for w in words if w)


def _pretty(v: Optional[float]) -> str:
    if v is None:
        return "?"
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.4g}"


# --------------------------------------------------------------------------- #
# Renderer v2: natural question surfaces
#
# The question sentence is built from topic templates (3-4 variants per
# topic).  Variant + narrator are chosen by sha1 of the IR uid + seed,
# so the SAME ir always renders the SAME question (determinism rule)
# while different questions read naturally instead of mechanically.
# Money quantities are shown in rupees with Indian-style digit grouping.
# Answer computation is untouched -- only the question text changed.
# --------------------------------------------------------------------------- #

_INDIAN_NAMES = ("Aarav", "Priya", "Meera", "Rohan", "Ishita", "Kabir",
                 "Ananya", "Vihaan")


def _fmt_money(v: float) -> str:
    """8000 -> rupee-grouped 'Rs 8,000' style surface; 12.5 -> 'Rs 12.5'."""
    if abs(v - round(v)) < 1e-9:
        n = int(round(v))
        sign = "-" if n < 0 else ""
        s = str(abs(n))
        if len(s) > 3:                       # Indian grouping: 1,50,000
            head, tail = s[:-3], s[-3:]
            parts: List[str] = []
            while len(head) > 2:
                parts.insert(0, head[-2:])
                head = head[:-2]
            if head:
                parts.insert(0, head)
            s = ",".join(parts + [tail])
        return sign + "\u20b9" + s
    return "\u20b9" + f"{v:.4g}"


def _topic_of(ir: IR) -> str:
    """Classify the chain's topic from step/target slugs (never rendered)."""
    hay = " ".join([ir.target or ""] + [s.name for s in ir.steps]).lower()

    def has(*words: str) -> bool:
        return any(w in hay for w in words)

    def has_word(*words: str) -> bool:
        return any(re.search(r"\b" + re.escape(w) + r"\b", hay)
                   for w in words)

    if has("compound_interest", "compound interest"):
        return "compound_interest"
    if has("simple_interest", "simple interest") or has_word("si"):
        return "simple_interest"
    if has("interest"):
        return "interest"
    if has("profit") or has_word("gain"):
        return "profit"
    if has_word("loss"):
        return "loss"
    if has("discount"):
        return "discount"
    if has_word("average", "mean"):
        return "average"
    if has("probability"):
        return "probability"
    if has("area", "perimeter", "circumference", "volume"):
        return "geometry"
    if has("speed", "velocity", "acceleration", "distance", "force",
           "current", "resistance", "voltage", "power", "energy",
           "momentum", "pressure", "density", "wavelength"):
        return "physics"
    if has("percent"):
        return "percent"
    return "generic"


def _is_money(ir: IR, topic: str) -> bool:
    if topic in ("profit", "loss", "discount", "simple_interest",
                 "compound_interest", "interest"):
        return True
    return any(q.unit == "inr" or q.family == "money" for q in ir.quantities)


def _story_numbers(ir: IR, chain: List[Step]) -> List[float]:
    """The numbers the narrative may quote, in a stable order.

    Preference: the IR's grounded quantities (source order, distractors
    dropped).  Fallback: chain literals minus protected formula constants
    (the '*100' in profit percent must not become a story number).
    """
    vals: List[float] = []
    seen: set = set()
    for q in ir.quantities:
        if q.provenance == "distractor" or q.value in seen:
            continue
        seen.add(q.value)
        vals.append(q.value)
    if vals:
        return vals
    for step in chain:
        for lit in _NUM_RE.findall(step.expression):
            v = float(lit)
            if v in _PROTECTED or v in seen:
                continue
            seen.add(v)
            vals.append(v)
    return vals


def _profit_pair(chain: List[Step]) -> Optional[tuple]:
    """(profit, cost) recovered from the canonical 'profit/cost*100'
    shape of the final expression; None when the shape differs."""
    expr = (chain[-1].expression or "").replace(" ", "")
    m = re.match(r"^\(?(-?[\d.]+)\)?/\(?([\d.]+)\)?\*100$", expr)
    if not m:
        m = re.match(r"^\(?(-?[\d.]+)\)?\*100/\(?([\d.]+)\)?$", expr)
    if m:
        return float(m.group(1)), float(m.group(2))
    return None


def _topic_variants(topic: str, target_name: str, nums: List[float],
                    listed: str, narrator: str, chain: List[Step],
                    money: bool) -> List[str]:
    """3-4 natural question variants for a recognised topic."""
    if topic in ("profit", "loss") and len(nums) >= 2:
        pair = _profit_pair(chain)
        if pair is not None:
            gain, cost = pair
        else:
            cost, gain = nums[0], nums[1]
        word = "loss" if topic == "loss" else "profit"
        return [
            f"A shopkeeper buys an article for {_fmt_money(cost)} and "
            f"sells it at a {word} of {_fmt_money(gain)}. "
            f"Find the {target_name}.",
            f"{narrator} purchased a bicycle for {_fmt_money(cost)} and "
            f"sold it at a {word} of {_fmt_money(gain)}. What is the "
            f"{target_name}?",
            f"An item costing {_fmt_money(cost)} was sold at a {word} of "
            f"{_fmt_money(gain)}. Calculate the {target_name}.",
            f"A trader bought goods worth {_fmt_money(cost)} and earned "
            f"a {word} of {_fmt_money(gain)} on the sale. Find the "
            f"{target_name}.",
        ]
    if topic in ("simple_interest", "compound_interest", "interest") \
            and len(nums) >= 3:
        p, r, t = nums[0], nums[1], nums[2]
        iw = ("compound interest" if topic == "compound_interest"
              else "simple interest" if topic == "simple_interest"
              else "interest")
        comp = ("Compounded annually, " if topic == "compound_interest"
                else "")
        return [
            f"Find the {iw} on {_fmt_money(p)} at {_pretty(r)}% per annum "
            f"for {_pretty(t)} years.",
            f"{narrator} deposits {_fmt_money(p)} in a bank at "
            f"{_pretty(r)}% per annum for {_pretty(t)} years. {comp}"
            f"Find the {target_name}.",
            f"A sum of {_fmt_money(p)} is lent at {_pretty(r)}% per annum "
            f"for {_pretty(t)} years. What is the {target_name}?",
        ]
    if topic == "discount" and len(nums) >= 2:
        mp, sp = nums[0], nums[1]
        return [
            f"The marked price of an article is {_fmt_money(mp)} and it is "
            f"sold for {_fmt_money(sp)}. Find the {target_name}.",
            f"A shopkeeper marks an article at {_fmt_money(mp)} and sells "
            f"it for {_fmt_money(sp)}. Calculate the {target_name}.",
            f"An item marked at {_fmt_money(mp)} was bought for "
            f"{_fmt_money(sp)}. What is the {target_name}?",
        ]
    if topic == "average" and len(nums) >= 2:
        return [
            f"Find the {target_name} of the observations {listed}.",
            f"The runs scored by {narrator} in a tournament are {listed}. "
            f"Find the {target_name}.",
            f"The daily readings recorded were {listed}. Work out the "
            f"{target_name}.",
        ]
    if topic == "probability" and len(nums) == 2:
        fav, tot = nums[0], nums[1]
        return [
            f"A bag contains {_pretty(tot)} identical balls, of which "
            f"{_pretty(fav)} are red. One ball is drawn at random. Find "
            f"the {target_name} of drawing a red ball.",
            f"In a class of {_pretty(tot)} students, {_pretty(fav)} play "
            f"chess. One student is chosen at random. What is the "
            f"{target_name} that the student plays chess?",
            f"Out of {_pretty(tot)} equally likely outcomes, "
            f"{_pretty(fav)} are favourable. Find the {target_name}.",
        ]
    if topic == "geometry" and nums:
        return [
            f"A figure has the following measurements: {listed}. Find the "
            f"{target_name} of the figure.",
            f"{narrator} sketches a shape with the measurements {listed} "
            f"in her notebook. Find its {target_name}.",
            f"The measurements of a figure are {listed}. Calculate its "
            f"{target_name}.",
        ]
    if topic == "physics" and nums:
        return [
            f"In a physics problem the given measurements are {listed}. "
            f"Find the {target_name}.",
            f"A student records {listed} during a science practical. "
            f"Calculate the {target_name}.",
            f"Using the values {listed} noted in a lab experiment, work "
            f"out the {target_name}.",
        ]
    if topic == "percent" and nums:
        return [
            f"The known values are {listed}. Find the {target_name}.",
            f"Find the {target_name} corresponding to the values {listed}.",
            f"{narrator} is asked to find the {target_name} from these "
            f"values: {listed}.",
        ]
    if money and nums:
        return [
            f"A shopkeeper records the following amounts in the account "
            f"book: {listed}. Find the {target_name}.",
            f"The amounts involved in the transaction are {listed}. Work "
            f"out the {target_name}.",
            f"{narrator} is working on a money problem with the amounts "
            f"{listed}. What is the {target_name}?",
        ]
    return []


def _natural_question(ir: IR, chain: List[Step], target_name: str,
                      seed: int) -> str:
    """Deterministic natural question text: topic templates, 3-4
    variants each, picked by sha1(uid|seed)."""
    nums = _story_numbers(ir, chain)
    topic = _topic_of(ir)
    money = _is_money(ir, topic)
    listed = ", ".join(_fmt_money(v) if money else _pretty(v)
                       for v in nums)
    h = int(hashlib.sha1(f"{ir.uid()}|{seed}".encode()).hexdigest(), 16)
    narrator = _INDIAN_NAMES[(h >> 4) % len(_INDIAN_NAMES)]

    variants = _topic_variants(topic, target_name, nums, listed, narrator,
                               chain, money)
    if not variants:
        if nums:
            variants = [
                f"Find the {target_name} given the following values: "
                f"{listed}.",
                f"Using the values {listed}, work out the {target_name}.",
                f"The following values are known: {listed}. Find the "
                f"{target_name}.",
                f"{narrator} must find the {target_name} from these "
                f"values: {listed}.",
            ]
        else:
            return f"Find the {target_name}."
    return variants[h % len(variants)]


def render_question(ir: IR, mode: str = "guided", seed: int = 0) -> Dict:
    """Deterministic surface for one IR chain.

    mode 'guided': student computes; the final step's value is withheld.
    mode 'verified': full worked chain including the answer.

    The question sentence comes from v2 topic templates; variant and
    narrator are fixed by sha1(uid|seed) so rendering stays
    deterministic while the text reads naturally.
    """
    chain = ir.executable_chain()
    if not chain:
        return {"ok": False, "reason": "no executable chain"}
    target = chain[-1]
    target_name = humanize(target.name)

    # givens: numeric literals feeding the chain, deduplicated, ordered
    givens: List[str] = []
    seen_vals: set = set()
    for step in chain:
        for lit in _NUM_RE.findall(step.expression):
            v = float(lit)
            if v in seen_vals:
                continue
            seen_vals.add(v)
            givens.append(_pretty(v))
    question = _natural_question(ir, chain, target_name, seed)

    steps_out: List[Dict] = []
    for i, step in enumerate(chain):
        is_final = i == len(chain) - 1
        show_value = (not is_final) or mode == "verified"
        entry = {
            "n": i + 1,
            "name": humanize(step.name),
            "expression": step.expression,
            "value": _pretty(step.value) if show_value else None,
        }
        steps_out.append(entry)
    return {
        "ok": True,
        "question": question,
        "target": target_name,
        "givens": givens,
        "steps": steps_out,
        "answer_withheld": mode != "verified",
        "anchor": ir.anchor_value,
        "provenance": ir.provenance,
    }


def vary(ir: IR, seed: int) -> Optional[IR]:
    """Deterministic fresh-numbers variant of an executable chain.

    Safety rules:
      - only literals occurring EXACTLY ONCE across the chain vary
        (a repeated literal is one quantity seen twice, e.g. r in r*r)
      - protected formula constants never vary
      - the rebuilt chain must re-execute and stay finite
    """
    chain = ir.executable_chain()
    if not chain:
        return None

    counts: Dict[float, int] = {}
    for step in chain:
        for lit in _NUM_RE.findall(step.expression):
            counts[float(lit)] = counts.get(float(lit), 0) + 1

    varyable = [v for v, c in counts.items()
                if c == 1 and v not in _PROTECTED and abs(v) >= 1]
    if not varyable:
        return None                      # nothing safe to change

    rng = random.Random(seed)
    # multipliers that keep arithmetic clean (halves, thirds, doubles)
    factors = [2, 3, 4, 0.5, 1.5, 0.25]
    new_vals = {}
    for v in varyable:
        f = rng.choice(factors)
        nv = v * f
        # keep the class of number: ints stay ints, decimals stay 2dp
        if float(v).is_integer():
            nv = round(nv) if abs(nv - round(nv)) < 1e-9 else round(
                nv * 2) / 2
        new_vals[v] = nv

    def _sub(match: "re.Match") -> str:
        val = float(match.group(0))
        if val in new_vals:
            return _pretty(new_vals[val])
        return match.group(0)

    new_steps: List[Step] = []
    env: Dict[str, float] = {}
    for step in chain:
        expr = _NUM_RE.sub(_sub, step.expression)
        try:
            value = eval_expression(expr, env)
        except Exception:
            return None                  # variant does not execute
        if value != value or abs(value) == float("inf"):
            return None
        name = step.name
        new_steps.append(Step(name=name, expression=expr,
                              operands=list(step.operands),
                              value=value, executable=True,
                              repairs=list(step.repairs) + ["varied"]))
        env[name] = value

    new_ir = IR(
        source_text=ir.source_text, provenance=ir.provenance,
        quantities=[Quantity(value=new_vals.get(q.value, q.value),
                             span=q.span, unit=q.unit, role=q.role,
                             provenance="varied" if q.value in new_vals
                             else q.provenance)
                    for q in ir.quantities],
        steps=new_steps, target=new_steps[-1].name,
        anchor_value=new_steps[-1].value,
        question_id=ir.question_id,
        meta={**ir.meta, "varied_from": ir.uid(), "seed": seed})
    return new_ir
