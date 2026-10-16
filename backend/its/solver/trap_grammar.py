"""trap_grammar.py — L1 of the Autonomous Correctness Flywheel.

Per-family adversarial paraphrase synthesis.  Every operator produces
variants of a seed question together with the EXPECTED relation of the
solver's answer to the control answer:

    same       : the trap must not change the verdict/answer
    change     : the solver must track the mutated quantity
    refuse     : the only honest outcome is a refusal (no verified answer)

Operators are subject-generic: unit swaps bite physics/chemistry kernels,
polarity flips bite accountancy/economics, absurd-constant injections bite
physics plausibility gates, distractor clauses and reordering bite
everything.  Failures graded by flywheel_oracle (L2) become regression
tests (L3) — this module only generates.
"""

from __future__ import annotations

import re
from typing import Dict, List

# --------------------------------------------------------------------------- #
# Operator: distractor clause — an irrelevant, number-bearing sentence
# --------------------------------------------------------------------------- #

_DISTRACTORS = [
    "The company paid Rs 5,000 as insurance premium last year.",
    "A competitor sold a similar machine for Rs 75,000.",
    "The store remains closed on Sundays throughout the year.",
]


def _trap_distractor(question: str, _rng) -> List[str]:
    out = []
    sentences = re.split(r"(?<=[.!?])\s+", question.strip())
    for d in _DISTRACTORS[:2]:
        if len(sentences) >= 2:
            out.append(" ".join([sentences[0], d] + sentences[1:]))
        else:
            out.append(f"{question.strip()} {d}")
    return out


# --------------------------------------------------------------------------- #
# Operator: given reorder — swap the order of comma/period separated clauses
# --------------------------------------------------------------------------- #

def _trap_reorder(question: str, _rng) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", question.strip())
    if len(sentences) < 2:
        return []
    reordered = [sentences[0]] + list(reversed(sentences[1:]))
    return [" ".join(reordered)]


# --------------------------------------------------------------------------- #
# Operator: unit swap — physics/chem kernels must READ the unit
# --------------------------------------------------------------------------- #

_UNIT_SWAPS = [
    (r"\bkm\b", "m"),
    (r"\bh\b", "min"),
    (r"\bkg\b", "g"),
    (r"\bmin\b", "s"),
]


def _trap_unit_swap(question: str, _rng) -> List[str]:
    out = []
    for pat, repl in _UNIT_SWAPS:
        if re.search(pat, question):
            out.append(re.sub(pat, repl, question, count=1))
    return out


# --------------------------------------------------------------------------- #
# Operator: number mutation — the solver must track the given
# --------------------------------------------------------------------------- #

def _trap_number_mutation(question: str, rng) -> List[str]:
    out = []
    for match in list(re.finditer(r"Rs (\d{1,3}(?:,\d{2,3})+|\d+)", question))[:2]:
        original = match.group(1)
        digits = int(original.replace(",", ""))
        mutated = digits // 3 if digits > 300 else digits + 500
        mutated_text = f"Rs {mutated:,}" if "," in original else f"Rs {mutated}"
        out.append(question[:match.start()] + mutated_text + question[match.end():])
    for match in list(re.finditer(r"\b(\d+(?:\.\d+)?)\s*(kg|km|m/s\^?2|cm|years?)\b", question))[:2]:
        value = float(match.group(1))
        mutated = value * 2 if value < 100 else value / 2
        text = f"{mutated:g} {match.group(2)}"
        out.append(question[:match.start()] + text + question[match.end():])
    return out[:3]


# --------------------------------------------------------------------------- #
# Operator: absurd constant — plausibility gates must refuse
# --------------------------------------------------------------------------- #

_ABSURD = [
    (r"g(?:ravity)?(?:\s*(?:is|of|=))?\s*(?:is\s+)?1\.6", "g = 200"),
    (r"acceleration due to gravity on the moon is 1\.6", "acceleration due to gravity on the moon is 200"),
]


def _trap_absurd_constant(question: str, _rng) -> List[str]:
    out = []
    for pat, repl in _ABSURD:
        if re.search(pat, question, re.I):
            out.append(re.sub(pat, repl, question, count=1, flags=re.I))
    # numeric absurdity: any stated small acceleration scaled 100x
    m = re.search(r"acceleration\s*(?:is|of|=)\s*(\d+(?:\.\d+)?)", question, re.I)
    if m and float(m.group(1)) < 50:
        out.append(question[:m.start(1)] + f"{float(m.group(1)) * 120:g}" + question[m.end(1):])
    return out


# --------------------------------------------------------------------------- #
# Operator: polarity flip — accountancy/economics direction words
# --------------------------------------------------------------------------- #

_POLARITY = [
    (r"\bprofit\b", "loss"), (r"\bgain\b", "sacrifice"),
    (r"\bsacrifice\b", "gain"), (r"\bfaster\b", "slower"),
    (r"\bappreciation\b", "depreciation"),
]


def _trap_polarity_flip(question: str, _rng) -> List[str]:
    out = []
    for pat, repl in _POLARITY:
        if re.search(pat, question, re.I):
            out.append(re.sub(pat, repl, question, count=1, flags=re.I))
    return out


OPERATORS = {
    "distractor": (_trap_distractor, "same"),
    "reorder": (_trap_reorder, "same"),
    "unit_swap": (_trap_unit_swap, "change_or_refuse"),
    "number_mutation": (_trap_number_mutation, "change_or_refuse"),
    "absurd_constant": (_trap_absurd_constant, "refuse"),
    "polarity_flip": (_trap_polarity_flip, "change_or_refuse"),
}


def generate(question: str, operators: List[str] | None = None,
             rng=None) -> List[Dict]:
    """All variants for one seed: [{operator, variant, expect}]."""
    rng = rng or __import__("random").Random(20260930)
    variants: List[Dict] = []
    for name in (operators or list(OPERATORS)):
        fn, expect = OPERATORS[name]
        for v in fn(question, rng):
            variants.append({"operator": name, "variant": v, "expect": expect})
    return variants
