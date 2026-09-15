"""
Class 7 Chemistry Question Generator
Nodes: c7_chem_001, c7_chem_002, c7_chem_003
Generates deterministic, seeded questions with solutions.
"""

import random
import math
import textwrap
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple

from class7_chem_solver import (
    classify_matter, analyze_change, identify_change_of_state,
    kinetic_energy_ratio, particle_arrangement, compare_states,
    heating_effect_on_particles, diffusion_comparison,
    get_physical_state, verify_classification, verify_change_classification,
    celsius_to_kelvin, temperature_difference,
    MatterResult, PhysicalChangeResult, ChangeOfStateResult,
    KineticEnergyResult, StateResult
)


# ─── Data Models ──────────────────────────────────────────────────────────────

@dataclass
class Question:
    id: str
    node: str
    topic: str
    difficulty: str
    competency: str
    question_text: str
    options: List[str]
    correct_index: int
    solution: str
    explanation: str
    misconception_addressed: str
    tags: List[str] = field(default_factory=list)


@dataclass
class NumericQuestion:
    id: str
    node: str
    topic: str
    question_text: str
    correct_answer: float
    unit: str
    solution_steps: List[str]
    tolerance: float = 0.5


@dataclass
class QuestionSet:
    node: str
    questions: List[Question]
    numeric_questions: List[NumericQuestion]


# ─── Reusable Data Pools ──────────────────────────────────────────────────────

# --- Node 001: Matter Classification ---
_ELEMENTS_POOL = [
    ("Iron", "element"), ("Gold", "element"), ("Copper", "element"),
    ("Oxygen", "element"), ("Hydrogen", "element"), ("Carbon", "element"),
    ("Aluminium", "element"), ("Helium", "element"), ("Sodium", "element"),
    ("Nitrogen", "element"), ("Sulphur", "element"), ("Zinc", "element"),
]

_COMPOUNDS_POOL = [
    ("Water", "compound", "H₂O — hydrogen and oxygen combined"),
    ("Carbon dioxide", "compound", "CO₂ — carbon and oxygen combined"),
    ("Salt (sodium chloride)", "compound", "NaCl — sodium and chlorine combined"),
    ("Sugar", "compound", "C₁₂H₂₂O₁₁ — carbon, hydrogen, oxygen combined"),
    ("Ammonia", "compound", "NH₃ — nitrogen and hydrogen combined"),
    ("Rust", "compound", "Fe₂O₃ — iron and oxygen combined"),
]

_MIXTURES_POOL = [
    ("Air", "mixture", "Nitrogen, oxygen, CO₂, argon — not chemically combined"),
    ("Sea water", "mixture", "Water + dissolved salts"),
    ("Brass", "mixture", "Copper + zinc alloy"),
    ("Sugar water", "mixture", "Sugar dissolved in water"),
    ("Soil", "mixture", "Sand, clay, organic matter"),
    ("Milk", "mixture", "Water, fat, proteins"),
]

_STATES_POOL = [
    ("Stone", "solid"), ("Wood", "solid"), ("Paper", "solid"),
    ("Chalk", "solid"), ("Diamond", "solid"), ("Iron nail", "solid"),
    ("Water", "liquid"), ("Milk", "liquid"), ("Petrol", "liquid"),
    ("Mercury", "liquid"), ("Kerosene", "liquid"), ("Blood", "liquid"),
    ("Air", "gas"), ("Oxygen", "gas"), ("Carbon dioxide", "gas"),
    ("Hydrogen", "gas"), ("Steam", "gas"), ("Nitrogen", "gas"),
]

# --- Node 002: Kinetic Theory ---
_STATES_ORDERED = ["solid", "liquid", "gas"]
_PARTICLE_MOTION_DESC = {
    "solid": "vibrate in fixed positions",
    "liquid": "slide and flow past each other",
    "gas": "move rapidly in all directions"
}
_SPACING_DESC = {
    "solid": "very close and tightly packed",
    "liquid": "close but free to move",
    "gas": "far apart with lots of empty space"
}
_CHANGE_OF_STATE_PAIRS = [
    ("solid", "liquid", "Melting"),
    ("liquid", "solid", "Freezing"),
    ("liquid", "gas", "Boiling"),
    ("gas", "liquid", "Condensation"),
    ("solid", "gas", "Sublimation"),
    ("gas", "solid", "Deposition"),
]
_HEAT_DIR = {
    "Melting": "absorbed", "Freezing": "released",
    "Boiling": "absorbed", "Condensation": "released",
    "Sublimation": "absorbed", "Deposition": "released"
}

# --- Node 003: Physical Changes ---
_REVERSIBLE_PHYSICAL = [
    ("Melting of ice to water", "freezing"),
    ("Freezing of water to ice", "melting"),
    ("Evaporation of water", "condensation"),
    ("Dissolving sugar in water", "evaporation of water"),
    ("Boiling of water to steam", "condensation"),
    ("Stretching a spring", "releasing the spring"),
    ("Magnetising an iron nail", "heating/demagnetising"),
    ("Inflating a balloon", "releasing the air"),
]
_IRREVERSIBLE_PHYSICAL = [
    ("Cutting a piece of paper", "Paper fibres are torn and cannot be rejoined perfectly"),
    ("Breaking a glass tumbler", "The glass lattice is permanently disrupted"),
    ("Tearing a cotton cloth", "Fibres cannot be reattached"),
    ("Crushing a soda can", "The original shape cannot be restored"),
    ("Grinding grain into flour", "Grain structure is permanently destroyed"),
]
_CHEMICAL_CHANGES_LIST = [
    ("Burning a piece of paper", "Ash, CO₂, water vapour are formed"),
    ("Rusting of an iron gate", "Hydrated iron oxide (rust) is formed"),
    ("Souring of milk", "Lactic acid and curd are formed"),
    ("Cooking a raw egg", "Proteins are denatured — new substance formed"),
    ("Digestion of food", "Complex molecules broken into simpler ones"),
    ("Growth of a plant", "New tissue is formed via photosynthesis"),
    ("Explosion of a firecracker", "New gases and ash are produced"),
]


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def _gen_001_classify_matter(seed: int, q_num: int) -> Question:
    """Generate matter classification MCQ."""
    rng = random.Random(seed * 1000 + q_num)
    pool = _ELEMENTS_POOL + _COMPOUNDS_POOL + _MIXTURES_POOL
    sub, cat, hint = rng.choice(pool)

    cats_list = ["element", "compound", "mixture", "pure substance"]
    distractors = [c for c in cats_list if c != cat]
    rng.shuffle(distractors)
    options = [cat] + distractors[:3]
    rng.shuffle(options)
    correct_idx = options.index(cat)

    return Question(
        id=f"c7_001_mc_{q_num:02d}",
        node="c7_chem_001",
        topic="Matter Classification",
        difficulty="Medium",
        competency="School",
        question_text=f"Classify the following substance:\n\n    {sub}",
        options=[o.capitalize() for o in options],
        correct_index=correct_idx,
        solution=f"{sub} is a {cat.upper()}.\n{hint}.",
        explanation=(
            f"An element consists of only one type of atom (e.g., Iron, Oxygen).\n"
            f"A compound is formed when two or more elements combine chemically "
            f"in fixed ratios (e.g., Water = H₂O).\n"
            f"A mixture contains two or more substances physically combined "
            f"without fixed ratios (e.g., Air = N₂ + O₂ + others)."
        ),
        misconception_addressed="Many students confuse compounds and mixtures. "
            "In a compound, elements are chemically bonded in fixed proportions; "
            "in a mixture, they are simply physically mixed in any proportion.",
        tags=["classification", "element", "compound", "mixture"]
    )


def _gen_001_element_or_mixture(seed: int, q_num: int) -> Question:
    """Generate 'Is this an element or a mixture?' MCQ."""
    rng = random.Random(seed * 1000 + q_num + 50)
    pool = _ELEMENTS_POOL[:6] + _MIXTURES_POOL[:4]
    sub, cat = rng.choice(pool)[:2]
    correct = "Element" if cat == "element" else "Mixture"
    wrong = "Mixture" if cat == "element" else "Element"
    options = [correct, wrong, "Compound", "Pure substance (other)"]
    rng.shuffle(options)
    ci = options.index(correct)

    return Question(
        id=f"c7_001_em_{q_num:02d}",
        node="c7_chem_001",
        topic="Element vs Mixture",
        difficulty="Medium",
        competency="School",
        question_text=f"Is the following substance an element or a mixture?\n\n    {sub}",
        options=options,
        correct_index=ci,
        solution=f"{sub} is a {correct.lower()}.",
        explanation=(
            f"A substance made of only one type of atom is an ELEMENT.\n"
            f"A substance made of two or more substances physically mixed "
            f"is a MIXTURE."
        ),
        misconception_addressed="Students sometimes think all substances made of "
            "more than one thing are compounds. A mixture is not chemically combined.",
        tags=["element", "mixture"]
    )


def _gen_001_solid_liquid_gas(seed: int, q_num: int) -> Question:
    """Generate state-of-matter identification MCQ."""
    rng = random.Random(seed * 1000 + q_num + 100)
    sub, expected_state = rng.choice(_STATES_POOL)
    options = ["Solid", "Liquid", "Gas", "None of these"]
    ci = rng.randint(0, 3)
    options[ci] = expected_state.capitalize()
    others = [o for i, o in enumerate(options) if i != ci]
    rng.shuffle(others)
    for i, o in enumerate(others):
        if i >= ci:
            options[i + 1] = o
        else:
            options[i] = o
    ci = options.index(expected_state.capitalize())

    return Question(
        id=f"c7_001_slg_{q_num:02d}",
        node="c7_chem_001",
        topic="States of Matter",
        difficulty="Easy",
        competency="School",
        question_text=f"In which state of matter does '{sub}' exist at room temperature?",
        options=options,
        correct_index=ci,
        solution=f"{sub} is a {expected_state} at room temperature.",
        explanation=(
            f"Solids have fixed shape and volume (e.g., stone, wood).\n"
            f"Liquids have fixed volume but no fixed shape (e.g., water, milk).\n"
            f"Gases have neither fixed shape nor volume (e.g., air, oxygen)."
        ),
        misconception_addressed="Students may think steam is a liquid. Steam is "
            "water in the gaseous state.",
        tags=["states", "solid", "liquid", "gas"]
    )


def _gen_001_true_false_classification(seed: int, q_num: int) -> Question:
    """Generate True/False classification question."""
    rng = random.Random(seed * 1000 + q_num + 150)
    pool = _ELEMENTS_POOL[:4] + _COMPOUNDS_POOL[:4]
    sub, cat, hint = rng.choice(pool)

    is_compound = cat == "compound"
    statement = f"'{sub}' is a compound." if is_compound else f"'{sub}' is NOT a compound."
    correct_answer = "True" if is_compound else "False"

    return Question(
        id=f"c7_001_tf_{q_num:02d}",
        node="c7_chem_001",
        topic="True/False Classification",
        difficulty="Easy",
        competency="School",
        question_text=f"State whether the following statement is True or False:\n\n    {statement}",
        options=["True", "False"],
        correct_index=0 if correct_answer == "True" else 1,
        solution=f"Answer: {correct_answer}",
        explanation=(
            f"A compound is formed when two or more elements combine chemically "
            f"in fixed proportions (e.g., H₂O, CO₂). "
            f"An element consists of only one type of atom."
        ),
        misconception_addressed="Remember: compounds need chemical bonding in fixed ratios.",
        tags=["true-false", "compound", "element"]
    )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def _gen_002_particle_arrangement(seed: int, q_num: int) -> Question:
    """Generate MCQ on particle arrangement in states of matter."""
    rng = random.Random(seed * 2000 + q_num)
    state = rng.choice(_STATES_ORDERED)

    motion = _PARTICLE_MOTION_DESC[state]
    spacing = _SPACING_DESC[state]

    options_motion = [
        _PARTICLE_MOTION_DESC["solid"],
        _PARTICLE_MOTION_DESC["liquid"],
        _PARTICLE_MOTION_DESC["gas"],
    ]
    rng.shuffle(options_motion)
    ci_motion = options_motion.index(motion)

    q_types = ["motion", "spacing"]
    q_type = rng.choice(q_types)

    if q_type == "motion":
        q_text = f"How do the particles in a {state} move?"
        correct_text = motion
    else:
        q_text = f"How are the particles arranged in a {state}?"
        correct_text = spacing
        options_motion = [
            _SPACING_DESC["solid"],
            _SPACING_DESC["liquid"],
            _SPACING_DESC["gas"],
        ]
        rng.shuffle(options_motion)
        ci_motion = options_motion.index(correct_text)

    return Question(
        id=f"c7_002_pa_{q_num:02d}",
        node="c7_chem_002",
        topic="Kinetic Theory - Particle Arrangement",
        difficulty="Medium",
        competency="School",
        question_text=q_text,
        options=options_motion,
        correct_index=ci_motion,
        solution=f"In a {state}, particles {correct_text}.",
        explanation=(
            f"According to the Kinetic Theory of Matter:\n"
            f"• Solids: particles vibrate in fixed positions.\n"
            f"• Liquids: particles slide and flow past each other.\n"
            f"• Gases: particles move freely in all directions."
        ),
        misconception_addressed="Students often think particles in a solid are completely still. "
            "They actually vibrate constantly.",
        tags=["kinetic", "particles", "arrangement", state]
    )


def _gen_002_ke_ratio_numeric(seed: int, q_num: int) -> NumericQuestion:
    """Generate numeric question on kinetic energy ratio."""
    rng = random.Random(seed * 2000 + q_num + 50)

    t1 = rng.randint(10, 50)
    t2 = t1 + rng.randint(10, 100)

    t1_k = t1 + 273.15
    t2_k = t2 + 273.15
    ratio = t2_k / t1_k

    return NumericQuestion(
        id=f"c7_002_ke_{q_num:02d}",
        node="c7_chem_002",
        topic="Kinetic Energy & Temperature",
        question_text=(
            f"The average kinetic energy (KE) of gas particles is directly "
            f"proportional to absolute temperature (T in Kelvin).\n\n"
            f"If the temperature increases from {t1}°C to {t2}°C, "
            f"what is the ratio of the new KE to the original KE?\n\n"
            f"[Give your answer correct to 2 decimal places]"
        ),
        correct_answer=round(ratio, 2),
        unit="(times the original)",
        solution_steps=[
            f"Convert to Kelvin: T₁ = {t1} + 273.15 = {t1_k:.2f} K",
            f"                         T₂ = {t2} + 273.15 = {t2_k:.2f} K",
            f"KE ratio = T₂ / T₁ = {t2_k:.2f} / {t1_k:.2f} = {ratio:.4f}",
            f"Rounded: {round(ratio, 2)}"
        ],
        tolerance=0.05
    )


def _gen_002_state_change(seed: int, q_num: int) -> Question:
    """Generate MCQ on identifying changes of state."""
    rng = random.Random(seed * 2000 + q_num + 100)
    pair = rng.choice(_CHANGE_OF_STATE_PAIRS)
    initial, final, process = pair

    other_processes = [p for _, _, p in _CHANGE_OF_STATE_PAIRS if p != process]
    rng.shuffle(other_processes)
    options = [process] + other_processes[:3]
    rng.shuffle(options)
    ci = options.index(process)

    return Question(
        id=f"c7_002_sc_{q_num:02d}",
        node="c7_chem_002",
        topic="Changes of State",
        difficulty="Easy",
        competency="School",
        question_text=f"A substance changes from the {initial} state to the {final} state. "
                       f"What is this process called?",
        options=options,
        correct_index=ci,
        solution=f"The change from {initial} → {final} is called {process}.",
        explanation=(
            f"Solid → Liquid : Melting (heat absorbed)\n"
            f"Liquid → Solid : Freezing (heat released)\n"
            f"Liquid → Gas   : Boiling (heat absorbed)\n"
            f"Gas → Liquid   : Condensation (heat released)\n"
            f"Solid → Gas    : Sublimation (heat absorbed)\n"
            f"Gas → Solid    : Deposition (heat released)"
        ),
        misconception_addressed="Students confuse melting with boiling. "
            "Melting is solid→liquid; boiling is liquid→gas.",
        tags=["state_change", "melting", "freezing", "boiling", "condensation"]
    )


def _gen_002_heat_direction(seed: int, q_num: int) -> Question:
    """Generate MCQ on heat absorbed/released during state change."""
    rng = random.Random(seed * 2000 + q_num + 150)
    pair = rng.choice(_CHANGE_OF_STATE_PAIRS)
    initial, final, process = pair
    heat = _HEAT_DIR[process]

    options = ["Heat is absorbed", "Heat is released",
               "No heat change", "Depends on the substance"]
    ci = 0 if heat == "absorbed" else 1
    rng.shuffle(options)
    ci = options.index("Heat is absorbed" if heat == "absorbed" else "Heat is released")

    return Question(
        id=f"c7_002_hd_{q_num:02d}",
        node="c7_chem_002",
        topic="Heat in Changes of State",
        difficulty="Medium",
        competency="School",
        question_text=f"During {process} ({initial} → {final}), what happens to heat?",
        options=options,
        correct_index=ci,
        solution=f"During {process}, heat is {heat}.",
        explanation=(
            "Changes that go from ordered → disordered (melting, boiling, sublimation) "
            "ABSORB heat because energy is needed to break particle bonds.\n"
            "Changes that go from disordered → ordered (freezing, condensation, "
            "deposition) RELEASE heat because energy is given out when bonds form."
        ),
        misconception_addressed="Students think all state changes absorb heat. "
            "Freezing and condensation actually release heat.",
        tags=["heat", "energy", "endothermic", "exothermic"]
    )


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def _gen_003_reversible_classify(seed: int, q_num: int) -> Question:
    """Generate MCQ: classify change as reversible physical or irreversible."""
    rng = random.Random(seed * 3000 + q_num)
    pool = _REVERSIBLE_PHYSICAL + _IRREVERSIBLE_PHYSICAL + _CHEMICAL_CHANGES_LIST
    change, info = rng.choice(pool)

    if change in dict(_REVERSIBLE_PHYSICAL).keys():
        cat = "Reversible physical change"
    elif change in dict(_IRREVERSIBLE_PHYSICAL).keys():
        cat = "Irreversible physical change"
    else:
        cat = "Chemical change"

    options = ["Reversible physical change", "Irreversible physical change",
               "Chemical change", "Both physical and chemical"]
    ci = {"Reversible physical change": 0, "Irreversible physical change": 1,
          "Chemical change": 2}[cat]
    rng.shuffle(options)
    ci = options.index(cat)

    return Question(
        id=f"c7_003_rc_{q_num:02d}",
        node="c7_chem_003",
        topic="Classification of Changes",
        difficulty="Medium",
        competency="School",
        question_text=f"Classify the following change:\n\n    {change}",
        options=options,
        correct_index=ci,
        solution=f"'{change}' is a {cat}.",
        explanation=(
            f"Physical changes do not form new substances (same particles before and after).\n"
            f"Chemical changes DO form new substances with different properties.\n"
            f"Reversible physical changes can be undone by reversing conditions "
            f"(e.g., freeze melted ice back).\n"
            f"Irreversible physical changes cannot be easily undone "
            f"(e.g., cut paper cannot be perfectly rejoined)."
        ),
        misconception_addressed="Common error: thinking mixture and compound are the same. "
            "In a compound, atoms are chemically bonded in fixed proportions. "
            "In a mixture, they are just physically combined.",
        tags=["physical_change", "reversible", "irreversible", "chemical"]
    )


def _gen_003_reverse_process(seed: int, q_num: int) -> Question:
    """Generate MCQ: what reverses this physical change?"""
    rng = random.Random(seed * 3000 + q_num + 50)
    change, reverse = rng.choice(_REVERSIBLE_PHYSICAL)

    all_reverses = [r for _, r in _REVERSIBLE_PHYSICAL]
    wrong_reverses = [r for r in all_reverses if r != reverse]
    rng.shuffle(wrong_reverses)
    options = [reverse] + wrong_reverses[:3]
    rng.shuffle(options)
    ci = options.index(reverse)

    return Question(
        id=f"c7_003_rp_{q_num:02d}",
        node="c7_chem_003",
        topic="Reversible Physical Changes",
        difficulty="Easy",
        competency="School",
        question_text=(
            f"'{change}' is a reversible physical change.\n"
            f"What is its reverse process?"
        ),
        options=options,
        correct_index=ci,
        solution=f"The reverse of '{change}' is '{reverse}'.",
        explanation=(
))