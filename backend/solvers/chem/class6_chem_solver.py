"""
Class 6 Chemistry Solver
Covers 3 nodes:
  c6_chem_001 – Matter and its composition
  c6_chem_002 – Particle nature of matter
  c6_chem_003 – Physical changes

All functions are pure / deterministic.  No LLM in computation.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import List, Optional, Tuple

# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class StateOfMatter(Enum):
    SOLID   = "solid"
    LIQUID  = "liquid"
    GAS     = "gas"


class ChangeType(Enum):
    PHYSICAL = "physical"
    CHEMICAL = "chemical"


@dataclass
class ProblemResult:
    """Single answer returned by a solver node."""
    node_id: str
    correct: bool
    user_answer: str
    expected_answer: str
    explanation: str
    step_by_step: List[str] = field(default_factory=list)


@dataclass
class BatchResult:
    """Aggregated result across a batch of problems."""
    node_id: str
    total: int
    correct: int
    results: List[ProblemResult] = field(default_factory=list)

    @property
    def accuracy(self) -> float:
        return self.correct / self.total if self.total else 0.0

    def mastery_met(self, threshold: float = 0.90) -> bool:
        return self.accuracy >= threshold


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def _normalise(text: str) -> str:
    """Lower-case, strip whitespace/punctuation for loose matching."""
    import re
    return re.sub(r"[^a-z0-9]", "", text.lower())


def _loose_match(user: str, expected: str) -> bool:
    return _normalise(user) == _normalise(expected)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

_MATTER_SET = {
    "stone", "water", "air", "pencil", "book", "chair", "iron",
    "gold", "milk", "juice", "wood", "plastic", "rock", "sand",
    "sugar", "salt", "oil", "petrol", "cloud", "rain", "snow",
    "honey", "clay", "soil", "ice", "steam", "oxygen", "nitrogen",
    "balloon", "mobile phone", "cup", "plate", "table", "wall",
}

_NOT_MATTER_SET = {
    "shadow", "light", "sound", "heat", "sunlight", "darkness",
    "music", "thought", "dream", "love", "sadness", "happiness",
    "cold", "warmth", "electricity",
}


def solve_is_matter(item: str) -> ProblemResult:
    """
    Determine whether `item` is matter.
    Returns ProblemResult with correct flag, explanation, and steps.
    """
    steps: List[str] = []
    steps.append("Recall: Matter is anything that has MASS and OCCUPIES SPACE.")
    steps.append("Check: Does the item have mass (can it be weighed)?")
    steps.append("Check: Does it occupy space (take up room)?")

    normalised = _normalise(item)

    if normalised in _MATTER_SET or item.lower().strip() in [m.lower() for m in _MATTER_SET]:
        correct = True
        expected = "Yes, it is matter"
        explanation = (
            f"'{item}' IS matter. It has mass and occupies space. "
            "You can weigh it on a balance and it takes up room."
        )
    elif normalised in _NOT_MATTER_SET or item.lower().strip() in [m.lower() for m in _NOT_MATTER_SET]:
        correct = True
        expected = "No, it is not matter"
        explanation = (
            f"'{item}' is NOT matter. It does not have its own mass "
            "and does not occupy space independently."
        )
    else:
        abstract_keywords = {
            "shadow", "light", "sound", "heat", "dark", "music",
            "thought", "dream", "love", "sad", "happy", "cold",
            "warm", "electricity", "time", "shadow",
        }
        is_abstract = any(kw in normalised for kw in abstract_keywords)
        if is_abstract:
            correct = True
            expected = "No, it is not matter"
            explanation = (
                f"'{item}' is an abstract concept and NOT matter. "
                "It does not have mass or occupy space."
            )
        else:
            correct = True  # We accept as matter
            expected = "Yes, it is matter (assumed)"
            explanation = (
                f"'{item}' appears to be a physical material and IS matter. "
                "Matter is anything with mass that occupies space. "
                "When unsure, ask: Can I weigh it? Does it take up room?"
            )
        steps.append("Applied heuristic: concrete objects → matter; abstract ideas → not matter.")

    steps.append(f"Conclusion: {explanation}")
    return ProblemResult(
        node_id="c6_chem_001",
        correct=correct,
        user_answer=item,
        expected_answer=expected,
        explanation=explanation,
        step_by_step=steps,
    )


def solve_count_matter_in_list(items: List[str]) -> ProblemResult:
    """
    Given a list of items, count how many are matter.
    """
    steps: List[str] = []
    steps.append("Given a list of items. Count how many are matter.")
    steps.append("Definition: Matter = anything with mass that occupies space.")
    steps.append("Going through each item:")

    count = 0
    for item in items:
        res = solve_is_matter(item)
        if res.correct and "IS matter" in res.explanation:
            count += 1
            steps.append(f"  ✓ '{item}' → MATTER")
        else:
            steps.append(f"  ✗ '{item}' → NOT matter")

    steps.append(f"Total matter items = {count} out of {len(items)}")
    expected = str(count)
    return ProblemResult(
        node_id="c6_chem_001",
        correct=True,
        user_answer=expected,
        expected_answer=expected,
        explanation=f"Out of {len(items)} items, {count} are matter.",
        step_by_step=steps,
    )


def solve_complete_statement(
    sentence: str,
    blank_word: str,
    correct_word: str,
) -> ProblemResult:
    """
    Fill-in-the-blank style checker for c6_chem_001.
    """
    steps = [
        "Read the sentence carefully.",
        f"Correct answer for the blank: '{correct_word}'.",
        "Matter is defined by two key properties: MASS and OCCUPIES SPACE.",
    ]
    is_correct = _loose_match(blank_word, correct_word)
    explanation = (
        f"'{blank_word}' is {'CORRECT' if is_correct else 'INCORRECT'}. "
        f"The expected word is '{correct_word}'. "
        "Remember: Matter = anything with mass and volume."
    )
    return ProblemResult(
        node_id="c6_chem_001",
        correct=is_correct,
        user_answer=blank_word,
        expected_answer=correct_word,
        explanation=explanation,
        step_by_step=steps,
    )


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

_PARTICLE_SPACING: dict[StateOfMatter, float] = {
    StateOfMatter.SOLID:  1.0,
    StateOfMatter.LIQUID: 3.0,
    StateOfMatter.GAS:   10.0,
}

_PARTICLE_MOTION: dict[StateOfMatter, float] = {
    StateOfMatter.SOLID:  1.0,
    StateOfMatter.LIQUID: 5.0,
    StateOfMatter.GAS:   10.0,
}

_PARTICLE_ATTRACTION: dict[StateOfMatter, float] = {
    StateOfMatter.SOLID:  10.0,
    StateOfMatter.LIQUID: 5.0,
    StateOfMatter.GAS:    1.0,
}


def solve_state_property(state: StateOfMatter, property_: str) -> ProblemResult:
    """
    Answer property questions about particle arrangement/motion/attraction.
    property_ ∈ {"spacing", "motion", "attraction"}
    """
    steps = [
        "Identify the state of matter.",
        "Recall particle properties for that state.",
        "State the answer.",
    ]

    prop_map = {
        "spacing":    _PARTICLE_SPACING,
        "motion":     _PARTICLE_MOTION,
        "attraction": _PARTICLE_ATTRACTION,
    }

    normalised_prop = property_.lower().strip()
    if normalised_prop not in prop_map:
        return ProblemResult(
            node_id="c6_chem_002",
            correct=False,
            user_answer=property_,
            expected_answer="spacing / motion / attraction",
            explanation=f"Unknown property '{property_}'. Use: spacing, motion, or attraction.",
            step_by_step=steps,
        )

    value = prop_map[normalised_prop][state]

    order = sorted(prop_map[normalised_prop].items(), key=lambda x: -x[1])
    rank = [s.value for s, v in order]

    if normalised_prop == "spacing":
        desc = "most tightly packed" if state == StateOfMatter.SOLID else \
               "moderately spaced" if state == StateOfMatter.LIQUID else \
               "most spread out"
    elif normalised_prop == "motion":
        desc = "least mobile (only vibrate)" if state == StateOfMatter.SOLID else \
               "can slide past each other" if state == StateOfMatter.LIQUID else \
               "move freely in all directions"
    else:
        desc = "strongest (keeps shape)" if state == StateOfMatter.SOLID else \
               "moderate" if state == StateOfMatter.LIQUID else \
               "very weak (negligible)"

    expected = desc
    explanation = (
        f"In a {state.value}, particles {desc}. "
        f"Relative {normalised_prop} score: {value}. "
        f"Ordering across states (high → low): {', '.join(rank)}."
    )
    steps.append(f"State = {state.value}, Property = {normalised_prop}.")
    steps.append(f"Particles {desc}.")
    steps.append(f"Answer: {desc}")

    return ProblemResult(
        node_id="c6_chem_002",
        correct=True,
        user_answer=desc,
        expected_answer=expected,
        explanation=explanation,
        step_by_step=steps,
    )


def solve_identify_state_from_property(
    property_: str,
    description: str,
) -> ProblemResult:
    """
    Given a description of particle behaviour, identify the state.
    E.g. property_="spacing", description="particles very close together"
    """
    steps = [
        "Analyse the given description of particle behaviour.",
        "Match it to the known properties of solid, liquid, and gas.",
        "State the correct phase.",
    ]

    normalised_desc = description.lower().strip()

    solid_keys = {
        "close together", "tightly packed", "very close", "nearest",
        "closest", "vibrate only", "only vibrate", "hardly any space",
        "least space", "smallest gap", "strongly attracted",
        "strong attraction", "rigid", "fixed",
    }
    liquid_keys = {
        "slide past", "sliding", "moderate", "fairly close",
        "some space", "not too far", "moderate spacing",
        "looser than solid", "moderate attraction",
    }
    gas_keys = {
        "far apart", "very far", "widely spaced", "spread out",
        "move freely", "all directions", "most space",
        "greatest gap", "least attraction", "negligible attraction",
        "fill container", "no fixed shape",
    }

    best_match: Optional[StateOfMatter] = None
    best_score = 0
    for key in solid_keys:
        if key in normalised_desc:
            best_match = StateOfMatter.SOLID
            best_score += 1
    for key in liquid_keys:
        if key in normalised_desc:
            best_match = StateOfMatter.LIQUID
            best_score += 1
    for key in gas_keys:
        if key in normalised_desc:
            best_match = StateOfMatter.GAS
            best_score += 1

    if best_match is None:
        # fallback: default solid for ambiguous
        best_match = StateOfMatter.SOLID
        explanation = (
            f"Could not confidently identify the state from '{description}'. "
            "Defaulting to SOLID (particles closest together). "
            "Hint: solids = close, liquids = moderate, gases = far apart."
        )
        correct = False
    else:
        correct = True
        explanation = (
            f"The description '{description}' matches a "
            f"{best_match.value.upper()}. "
            f"In a {best_match.value}, particles are "
            f"{'very close together (spacing ~1×)' if best_match == StateOfMatter.SOLID else 'moderately spaced (spacing ~3×)' if best_match == StateOfMatter.LIQUID else 'far apart (spacing ~10×)'}."
        )

    expected = best_match.value
    steps.append(f"Matched description to: {best_match.value.upper()}")
    steps.append(explanation)
    return ProblemResult(
        node_id="c6_chem_002",
        correct=correct,
        user_answer=description,
        expected_answer=expected,
        explanation=explanation,
        step_by_step=steps,
    )


def solve_particle_count_question(
    initial_mass_grams: float,
    description: str,
) -> ProblemResult:
    """
    Conceptual: if you cut a piece of matter in half repeatedly,
    what happens to particle count?

    Returns the conceptual answer (not a numeric count — that's C8+).
    """
    steps = [
        f"Scenario: {description}",
        "Particles are the smallest units of matter retaining identity.",
        "Cutting matter does NOT change the number of particles (they just rearrange).",
        "However, the SURFACE AREA increases, and eventually you reach atomic/particle scale.",
    ]

    # but eventually you can't cut further (particles are indivisible by ordinary means)
    explanation = (
        "Cutting matter into pieces does NOT change the total number of particles. "
        "The particles simply rearrange. However, matter is made of particles "
        "that are too small to be cut by a knife — so cutting stops at the "
        "particle level. The NUMBER of particles in the original sample "
        "remains the same throughout."
    )

    keywords_increase = {"increase", "more", "grow", "rise"}
    keywords_decrease = {"decrease", "less", "reduce", "fewer"}
    keywords_same     = {"same", "unchanged", "constant", "equal"}

    normalised = description.lower()

    if any(k in normalised for k in keywords_same):
        correct = True
        expected = "same"
        explanation = (
            "CORRECT. Cutting matter doesn't change the number of particles. "
            "They just get separated — the count stays the same."
        )
    elif any(k in normalised for k in keywords_increase):
        correct = False
        expected = "same"
        explanation = (
            "INCORRECT. The number of particles does NOT increase. "
            "You are simply separating existing particles."
        )
    elif any(k in normalised for k in keywords_decrease):
        correct = False
        expected = "same"
        explanation = (
            "INCORRECT. The number of particles does NOT decrease. "
            "You are just rearranging existing particles."
        )
    else:
        correct = True
        expected = "same"
        explanation = explanation

    steps.append(f"Answer: The number of particles remains {expected}.")
    return ProblemResult(
        node_id="c6_chem_002",
        correct=correct,
        user_answer=description,
        expected_answer=expected,
        explanation=explanation,
        step_by_step=steps,
    )


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

_PHYSICAL_CHANGES = {
    "melting ice", "melting", "freezing water", "freezing", "evaporation",
    "boiling", "condensation", "sublimation", "deposition",
    "dissolving sugar in water", "dissolving salt in water", "dissolving",
    "crushing chalk", "crushing", "cutting paper", "tearing paper",
    "bending iron", "stretching rubber", "magnetising iron",
    "breaking glass", "grinding", "mixing sand and salt",
    "separating iron and sand", "separating",
    "melting wax", "freezing juice", "drying wet clothes",
    "inflating balloon", "inflating a balloon",
    "folding paper", "cutting cloth", "shaping clay",
    "melting butter", "freezing ice cream",
}

_CHEMICAL_CHANGES = {
    "burning paper", "burning wood", "burning", "rusting iron",
    "rusting", "digestion of food", "digestion", "cooking an egg",
    "frying an egg", "baking a cake", "baking", "fermentation",
    "souring milk", "milk souring", "exploding firecracker",
    "exploding", "reacting acid and base", "neutralisation",
    "photosynthesis", "respiration", "digesting",
    "burning magnesium", "burning candle",
    "curdling of milk", "ripening of fruit",
}


def solve_is_physical_change(
    change_description: str,
    clues_given: Optional[List[str]] = None,
) -> ProblemResult:
    """
    Determine if a described change is physical or chemical.

    clues_given (optional): list of observable hints the student provides
    e.g. ["new colour formed", "gas produced"] → chemical
    """
    steps = [
        "Step 1: Recall definition of physical change.",
        "  Physical change = form/shape/size/state changes; NO new substance.",
        "  Reversible by ordinary means (heating/cooling).",
        "Step 2: Recall definition of chemical change.",
        "  Chemical change = new substance formed; often irreversible.",
        "Step 3: Analyse the given change.",
    ]

    normalised = change_description.lower().strip()

    if normalised in _PHYSICAL_CHANGES:
        change_type = ChangeType.PHYSICAL
        correct = True
    elif normalised in _CHEMICAL_CHANGES:
        change_type = ChangeType.CHEMICAL
        correct = True
    else:
        chemical_indicators = {
            "burn", "rust", "cook", "fry", "bake", "ferment",
            "sour", "rot", "decay", "explod", "react", "curdl",
            "new colour", "gas given off", "bubble",
            "precipitate", "light", "heat given", "temperature rise",
            "smell", "odour", "irreversible", "permanent",
            "new substance", "different substance",
        }
        physical_indicators = {
            "melt", "freez", "evaporat", "condens", "dissolv",
            "crush", "cut", "tear", "bend", "break", "fold",
            "shape", "separat", "mix", "drying", "inflate",
            "reversible", "change of state", "state change",
            "solid to liquid", "liquid to gas",
        }

        chem_hits = sum(1 for ci in chemical_indicators if ci in normalised)
        phys_hits = sum(1 for pi in physical_indicators if pi in normalised)

        if chem_hits > phys_hits:
            change_type = ChangeType.CHEMICAL
            correct = True
        elif phys_hits > chem_hits:
            change_type = ChangeType.PHYSICAL
            correct = True
        else:
            change_type = ChangeType.PHYSICAL
            correct = False  # ambiguous

    expected = change_type.value

    if clues_given:
        steps.append(f"Additional clues provided: {', '.join(clues_given)}")
        chemical_clue_indicators = {
            "new colour", "gas", "bubbles", "heat without heating",
            "permanent", "new smell", "residue",
        }
        clue_chem = any(
            any(ci in c.lower() for ci in chemical_clue_indicators)
            for c in clues_given
        )
        if clue_chem:
            change_type = ChangeType.CHEMICAL
            expected = ChangeType.CHEMICAL.value
            steps.append("Clue analysis → chemical indicators present → CHEMICAL change.")

    explanation_map = {
        ChangeType.PHYSICAL: (
            f"'{change_description}' is a PHYSICAL change. "
            "The substance may change its form, shape, size, or state, "
            "but no new substance is formed. It can usually be reversed "
            "by ordinary means like heating or cooling. "
            "Example: Ice melting to water → can freeze back."
        ),
        ChangeType.CHEMICAL: (
            f"'{change_description}' is a CHEMICAL change. "
            "A new substance is formed with different properties. "
            "It is usually not reversible by simple physical means. "
            "Example: Burning paper → ash (new substance) cannot become paper again."
        ),
    }

    explanation = explanation_map[change_type]
    steps.append(f"Conclusion: {change_type.value.upper()} change.")
    steps.append(explanation)

    return ProblemResult(
        node_id="c6_chem_003",
        correct=correct,
        user_answer=change_description,
        expected_answer=expected,
        explanation=explanation,
        step_by_step=steps,
    )


def solve_change_of_state(
    initial_state: StateOfMatter,
    final_state: StateOfMatter,
    process_name: str = "",
) -> ProblemResult:
    """
    Identify the type of change when a substance moves from one state to another.
    All state changes are physical (no new substance formed).
    """
    steps = [
        f"Initial state: {initial_state.value}",
        f"Final state: {final_state.value}",
        "A change of state involves only rearrangement of particles.",
        "No new substance is formed during melting, freezing, evaporation, etc.",
        "Therefore, any change of state is a PHYSICAL change.",
    ]

    state_pair = (initial_state, final_state)
    process_names = {
        (StateOfMatter.SOLID, StateOfMatter.LIQUID):  "melting",
        (StateOfMatter.LIQUID, StateOfMatter.SOLID):  "freezing",
        (StateOfMatter.LIQUID, StateOfMatter.GAS):    "evaporation / boiling",
        (StateOfMatter.GAS, StateOfMatter.LIQUID):    "condensation",
        (StateOfMatter.SOLID, StateOfMatter.GAS):     "sublimation",
        (StateOfMatter.GAS, StateOfMatter.SOLID):     "deposition",
        (StateOfMatter.SOLID, StateOfMatter.SOLID):   "no change",
        (StateOfMatter.LIQUID, StateOfMatter.LIQUID): "no change",
        (StateOfMatter.GAS, StateOfMatter.GAS):       "no change",
    }

    process = process_names.get(state_pair, "unknown state change")
    if process_name:
        correct_process = _loose_match(process_name, process.split("/")[0].strip())
    else:
        correct_process = True

    expected_process = process
    explanation = (
        f"The change from {initial_state.value} → {final_state.value} "
        f"is called '{process}'. "
        "This is a PHYSICAL change because no new substance is produced. "
        "The particles remain the same; they just rearrange or change spacing."
    )
    steps.append(f"Process name: {process}")
    steps.append(explanation)

    return ProblemResult(
        node_id="c6_chem_003",
        correct=True,  # state changes are always physical
        user_answer=process_name or process,
        expected_answer=expected_process,
        explanation=explanation,
        step_by_step=steps,
    )


def solve_reversibility_check(change_name: str) -> ProblemResult:
    """
    Determine if a change is reversible (physical) or irreversible (chemical).
    """
    steps = [
        "Step 1: Identify the change.",
        f"Change: {change_name}",
        "Step 2: Check if a new substance is formed.",
        "Step 3: Can it be reversed by ordinary means?",
    ]

    normalised = change_name.lower().strip()

    if normalised in _PHYSICAL_CHANGES:
        is_reversible = True
        change_type = ChangeType.PHYSICAL
        explanation = (
            f"'{change_name}' is REVERSIBLE. "
            "You can get back the original substance by ordinary means "
            "(e.g., freeze water back to ice, dissolve sugar back by evaporation). "
            "This confirms it is a PHYSICAL change."
        )
    elif normalised in _CHEMICAL_CHANGES:
        is_reversible = False
        change_type = ChangeType.CHEMICAL
        explanation = (
            f"'{change_name}' is IRREVERSIBLE by ordinary means. "
            "A new substance has formed (e.g., ash from burnt paper, "
            "rust on iron). You cannot get the original substance back easily. "
            "This confirms it is a CHEMICAL change."
        )
    else:
        phys_hints = {"melt", "freez", "dissolv", "crush", "cut", "state change"}
        chem_hints  = {"burn", "rust", "cook", "ferment", "rot", "sour"}
        is_reversible = any(h in normalised for h in phys_hints)
        change_type = ChangeType.PHYSICAL if is_reversible else ChangeType.CHEMICAL
        explanation = (
            f"Based on description, '{change_name}' appears to be "
            f"{'REVERSIBLE (physical)' if is_reversible else 'IRREVERSIBLE (chemical)'}."
        )

    steps.append(
        f"Reversibility: {'YES → Physical change' if is_reversible else 'NO → Chemical change'}"
    )
    steps.append(explanation)

    return ProblemResult(
        node_id="c6_chem_003",
        correct=True,
        user_answer=change_name,
        expected_answer=change_type.value,
        explanation=explanation,
        step_by_step=steps,
    )


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SOLVER_MAP: dict[str, callable] = {
    "c6_chem_001": {
        "is_matter":        solve_is_matter,
        "count_matter":     solve_count_matter_in_list,
        "complete_statement": solve_complete_statement,
    },
    "c6_chem_002": {
        "state_property":   solve_state_property,
        "identify_state":   solve_identify_state_from_property,
        "particle_count":   solve_particle_count_question,
    },
    "c6_chem_003": {
        "is_physical":      solve_is_physical_change,
        "change_of_state":  solve_change_of_state,
        "reversibility":    solve_reversibility_check,
    },
}


def solve(node_id: str, task: str, **kwargs) -> ProblemResult:
    """
    Generic entry point:  solve(node_id, task, **kwargs)
    Dispatches to the correct solver function.
    """
    node_tasks = SOLVER_MAP.get(node_id)
    if node_tasks is None:
        return ProblemResult(
            node_id=node_id, correct=False,
            user_answer="", expected_answer="",
            explanation=f"Unknown node_id '{node_id}'.",
        )
    fn = node_tasks.get(task)
    if fn is None:
        return ProblemResult(
            node_id=node_id, correct=False,
            user_answer="", expected_answer="",
            explanation=f"Unknown task '{task}' for node {node_id}. "
                        f"Available: {list(node_tasks.keys())}",
        )
    return fn(**kwargs)