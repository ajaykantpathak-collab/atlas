"""
class7_physics_solver.py
Deterministic solver for Class 7 Physics (Nodes: c7_phy_001, c7_phy_002, c7_phy_003)
No LLM in computation. Pure Python + math + random (seeded).
"""

import math
import random
import dataclasses
from typing import Optional, List, Dict, Tuple
from enum import Enum

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class StateOfMatter(Enum):
    SOLID   = "solid"
    LIQUID  = "liquid"
    GAS     = "gas"

class MatterType(Enum):
    MATTER      = "matter"
    NON_MATTER  = "non_matter"

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
@dataclasses.dataclass
class ClassifyResult:
    is_matter: bool
    category: str          # "matter" or "non-matter"
    reason: str

@dataclasses.dataclass
class CompressibilityResult:
    solid_ratio:   float   # relative compression (≈0)
    liquid_ratio:  float   # relative compression (≈0)
    gas_ratio:     float   # relative compression (high)
    most_compressible: str
    least_compressible: str

@dataclasses.dataclass
class DiffusionResult:
    faster_medium: str
    slower_medium: str
    explanation: str

@dataclasses.dataclass
class ParticleArrangementResult:
    state:        str
    packing:      str    # "tightly packed", "loosely packed", "widely spaced"
    particle_movement: str
    has_definite_shape: bool
    has_definite_volume: bool

@dataclasses.dataclass
class ValidationResult:
    correct:       bool
    score:         float   # 0.0 – 1.0
    feedback:      str
    correct_answer: str
    user_answer:   str

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

MATTER_EXAMPLES: List[str] = [
    "stone", "water", "air", "book", "table", "chair", "milk",
    "oxygen", "sugar", "iron", "wood", "ice", "balloon", "flower",
    "pen", "paper", "soil", "sand", "gold", "copper", "moon rock"
]

NON_MATTER_EXAMPLES: List[str] = [
    "light", "heat", "sound", "shadow", "sunlight", "music",
    "cold", "darkness", "echo", "smell sensation", "thought"
]

MATTER_CATEGORY_MAP: Dict[str, str] = {
    # solids
    "stone":   "solid",  "iron":  "solid",  "wood":  "solid",
    "ice":     "solid",  "gold":  "solid",  "copper":"solid",
    "table":   "solid",  "chair": "solid",  "book":  "solid",
    "pen":     "solid",  "soil":  "solid",  "sand":  "solid",
    # liquids
    "water":   "liquid", "milk":  "liquid",
    # gases
    "air":     "gas",    "oxygen":"gas",
    # special / mixed
    "balloon": "gas (inside)",   "flower": "solid (mostly)",
    "moon rock":"solid", "paper": "solid",
}

# ── Q-type 1a:  Is-it-matter classification ──────────────────────
def classify_matter(item: str) -> ClassifyResult:
    """
    Returns whether *item* is matter and a human-readable category.
    Uses case-insensitive membership in the canonical lists.
    """
    key = item.strip().lower()
    if key in [e.lower() for e in MATTER_EXAMPLES]:
        cat = MATTER_CATEGORY_MAP.get(key, "matter")
        return ClassifyResult(
            is_matter=True,
            category=cat,
            reason=f"'{item}' occupies space and has mass → it is matter "
                   f"(state: {cat})."
        )
    if key in [e.lower() for e in NON_MATTER_EXAMPLES]:
        return ClassifyResult(
            is_matter=False,
            category="non-matter",
            reason=f"'{item}' does NOT occupy space or have mass → "
                   f"it is NOT matter."
        )
    energy_like = {"light", "heat", "sound", "shadow", "sunlight",
                   "music", "cold", "darkness", "echo", "smell",
                   "thought", "feeling", "sensation", "love", "hate"}
    if key in energy_like:
        return ClassifyResult(False, "non-matter", "Energy / sensation — no mass.")
    return ClassifyResult(True, "matter",
                          "Default classification: assumed matter "
                          "unless known otherwise.")

# ── Q-type 1b:  Two-property verification ─────────────────────────
def verify_two_properties(item: str) -> Dict[str, bool | str]:
    """
    Check whether an object satisfies BOTH defining properties of matter:
      (1) occupies space (volume)
      (2) has mass
    """
    key = item.strip().lower()
    is_matter = key in [e.lower() for e in MATTER_EXAMPLES]
    return {
        "is_matter":    is_matter,
        "occupies_space": is_matter,
        "has_mass":     is_matter,
        "conclusion":   ("Both properties hold — it IS matter."
                         if is_matter else
                         "At least one property fails — it is NOT matter.")
    }

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

DIFFUSION_COEFF: Dict[str, float] = {
    "gas_in_gas":   1.00,
    "gas_in_liquid":0.10,
    "liquid_in_liquid": 0.02,
    "solid_in_liquid":  0.001,
    "gas_in_solid": 0.0001,   # essentially negligible
}

COMPRESSIBILITY: Dict[str, float] = {
    "solid":  0.005,
    "liquid": 0.010,
    "gas":    0.500,
}

@dataclasses.dataclass
class DiffusionScenario:
    substance: str    # e.g. "ink"
    medium:    str    # e.g. "water"
    from_state: str   # e.g. "liquid"
    to_state:   str   # e.g. "liquid"

@dataclasses.dataclass
class CompressibilityScenario:
    state: str        # "solid" / "liquid" / "gas"

# ── Q-type 2a:  Diffusion comparison ──────────────────────────────
def compare_diffusion(s1: DiffusionScenario, s2: DiffusionScenario) -> DiffusionResult:
    """
    Compare two diffusion scenarios and report which is faster.
    Key = f"{from_state}_in_{to_state}"
    """
    k1 = f"{s1.from_state.lower()}_in_{s1.to_state.lower()}"
    k2 = f"{s2.from_state.lower()}_in_{s2.to_state.lower()}"
    d1 = DIFFUSION_COEFF.get(k1, 0.001)
    d2 = DIFFUSION_COEFF.get(k2, 0.001)

    if d1 > d2:
        faster, slower = s1, s2
        faster_key, slower_key = k1, k2
    else:
        faster, slower = s2, s1
        faster_key, slower_key = k2, k1

    explanation = (
        f"Diffusion of {faster.substance} ({faster_key}) has coefficient "
        f"{d1:.4f} vs {slower.substance} ({slower_key}) at {d2:.4f}. "
        f"Particles move more freely in gases than liquids/solids because "
        f"interparticle space is greatest in gases."
    )
    return DiffusionResult(
        faster_medium=f"{faster.substance} in {faster.medium}",
        slower_medium=f"{slower.substance} in {slower.medium}",
        explanation=explanation,
    )

# ── Q-type 2b:  Compressibility comparison ────────────────────────
def compare_compressibility(s1: CompressibilityScenario,
                            s2: CompressibilityScenario) -> CompressibilityResult:
    """
    Compare compressibility of two states of matter.
    Returns relative ratios and identifies most / least compressible.
    """
    c1 = COMPRESSIBILITY.get(s1.state.lower(), 0.001)
    c2 = COMPRESSIBILITY.get(s2.state.lower(), 0.001)

    total = c1 + c2 if (c1 + c2) > 0 else 1.0
    r1 = round(c1 / total, 4)
    r2 = round(c2 / total, 4)

    if c1 >= c2:
        most, least = s1.state, s2.state
    else:
        most, least = s2.state, s1.state

    return CompressibilityResult(
        solid_ratio  = round(COMPRESSIBILITY.get("solid",  0.001), 4),
        liquid_ratio = round(COMPRESSIBILITY.get("liquid", 0.001), 4),
        gas_ratio    = round(COMPRESSIBILITY.get("gas",    0.001), 4),
        most_compressible  = most,
        least_compressible = least,
    )

# ── Q-type 2c:  Particle spacing reasoning ───────────────────────
def particle_spacing(state: str) -> Dict[str, str]:
    """
    Return particle arrangement description for a given state.
    """
    arrangements = {
        "solid": {
            "packing":         "tightly packed in a regular arrangement",
            "particle_movement": "vibrate about fixed positions; cannot move freely",
            "has_definite_shape": True,
            "has_definite_volume": True,
        },
        "liquid": {
            "packing":         "loosely packed; particles can slide past each other",
            "particle_movement": "move freely within the liquid; no fixed positions",
            "has_definite_shape": False,
            "has_definite_volume": True,
        },
        "gas": {
            "packing":         "widely spaced with large gaps between particles",
            "particle_movement": "move freely in all directions at high speed",
            "has_definite_shape": False,
            "has_definite_volume": False,
        },
    }
    key = state.strip().lower()
    if key not in arrangements:
        return {"error": f"Unknown state '{state}'. Use solid/liquid/gas."}
    return arrangements[key]

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

SOLID_PROPERTIES: Dict[str, Dict] = {
    "definite_shape": {
        "value": True,
        "description": "A solid retains its own shape regardless of the container.",
        "particle_reason": "Particles are locked in fixed positions and cannot slide past each other.",
    },
    "definite_volume": {
        "value": True,
        "description": "A solid has its own fixed volume.",
        "particle_reason": "Particles are tightly packed with very little interparticle space.",
    },
    "incompressible": {
        "value": True,
        "description": "Solids cannot be significantly compressed.",
        "particle_reason": "Particles are already in contact; no free space to reduce.",
    },
    "rigid": {
        "value": True,
        "description": "Solids are rigid and do not flow.",
        "particle_reason": "Strong interparticle forces keep particles in fixed positions.",
    },
    "flow": {
        "value": False,
        "description": "Solids do NOT flow like liquids.",
        "particle_reason": "Particles cannot move past each other freely.",
    },
}

SOLID_EXAMPLES: List[str] = ["stone", "iron", "wood", "ice", "brick",
                               "steel", "diamond", "glass", "paper", "rock"]

# ── Q-type 3a:  Property of a solid ───────────────────────────────
def check_solid_property(property_name: str) -> Dict[str, bool | str]:
    """
    Return whether a solid possesses the named property.
    """
    key = property_name.strip().lower()
    if key not in SOLID_PROPERTIES:
        return {"error": f"Unknown property '{property_name}'."}
    info = SOLID_PROPERTIES[key]
    return {
        "property":           key,
        "value":              info["value"],
        "description":        info["description"],
        "particle_reasoning": info["particle_reason"],
    }

# ── Q-type 3b:  Identify a solid from a list ─────────────────────
def identify_solid(items: List[str]) -> Dict[str, List[str] | str]:
    """
    From a list of substance names, identify which are solids,
    and provide the particle-arrangement justification.
    """
    solids, non_solids = [], []
    state_map = {
        "water": "liquid", "milk": "liquid", "oil": "liquid",
        "air": "gas", "oxygen": "gas", "steam": "gas",
        "stone": "solid", "iron": "solid", "wood": "solid",
        "ice": "solid", "brick": "solid", "steel": "solid",
        "gold": "solid", "diamond": "solid", "rock": "solid",
        "paper": "solid", "glass": "solid",
    }
    for item in items:
        st = state_map.get(item.strip().lower(), "unknown")
        if st == "solid":
            solids.append(item)
        else:
            non_solids.append((item, st))

    return {
        "solids":      solids,
        "non_solids":  non_solids,
        "explanation": (
            "Solids have definite shape and volume because their particles "
            "are tightly packed and vibrate about fixed positions."
        ),
    }

# ── Q-type 3c:  State determination from properties ──────────────
def determine_state(has_definite_shape: bool,
                    has_definite_volume: bool,
                    flows: bool) -> str:
    """
    Given observed macroscopic properties, determine the state of matter.
    """
    if has_definite_shape and has_definite_volume and not flows:
        return "solid"
    if not has_definite_shape and has_definite_volume and flows:
        return "liquid"
    if not has_definite_shape and not has_definite_volume:
        return "gas"
    return "unknown / ambiguous"

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

FIB_ANSWERS: Dict[str, str] = {
    "fib_n1_q1":  "space",
    "fib_n1_q2":  "mass",
    "fib_n1_q3":  "mass",
    "fib_n1_q4":  "solid, liquid, gas",
    "fib_n2_q1":  "tiny",
    "fib_n2_q2":  "diffusion",
    "fib_n2_q3":  "compressibility",
    "fib_n2_q4":  "interparticle space",
    "fib_n3_q1":  "definite shape",
    "fib_n3_q2":  "definite volume",
    "fib_n3_q3":  "fixed positions",
    "fib_n3_q4":  "incompressible",
}

def check_fib(question_id: str, user_answer: str) -> ValidationResult:
    correct = FIB_ANSWERS.get(question_id, "").strip().lower()
    given  = user_answer.strip().lower()
    synonyms = {
        "space":       ["space", "volume"],
        "mass":        ["mass", "quantity of matter"],
        "tiny":        ["tiny", "small", "very small"],
        "diffusion":   ["diffusion", "spreading"],
        "compressibility": ["compressibility", "compression"],
        "interparticle space": ["interparticle space", "space between particles",
                                  "space b/w particles"],
        "definite shape":    ["definite shape", "fixed shape", "shape"],
        "definite volume":   ["definite volume", "fixed volume", "volume"],
        "fixed positions":   ["fixed positions", "fixed position", "fixed place"],
        "incompressible":    ["incompressible", "not compressible"],
        "solid, liquid, gas": ["solid, liquid, gas", "three states",
                                "solid liquid gas"],
    }
    accepted = [correct] + synonyms.get(correct, [])
    is_correct = given in accepted
    score = 1.0 if is_correct else 0.0
    return ValidationResult(
        correct      = is_correct,
        score         = score,
        feedback      = ("Correct!" if is_correct
                        else f"Not quite — the expected answer is "
                             f"'{FIB_ANSWERS.get(question_id, 'N/A')}'."),
        correct_answer = FIB_ANSWERS.get(question_id, "N/A"),
        user_answer   = user_answer,
    )

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

MCQ_BANK: List[Dict] = [
    # ── Node 1 ──
    {
        "id": "mcq_n1_001", "node": "c7_phy_001",
        "question": "Which of the following is NOT matter?",
        "options": ["A) Water", "B) Air", "C) Light", "D) Stone"],
        "answer": "C",
        "explanation": ("Light is a form of energy. It does not occupy space "
                        "and has no mass, so it is NOT matter.")
    },
    {
        "id": "mcq_n1_002", "node": "c7_phy_001",
        "question": "The quantity of matter in an object is called:",
        "options": ["A) Volume", "B) Mass", "C) Weight", "D) Density"],
        "answer": "B",
        "explanation": ("Mass is the measure of the quantity of matter "
                        "in an object, measured with a balance.")
    },
    {
        "id": "mcq_n1_003", "node": "c7_phy_001",
        "question": "Which property is NOT a fundamental property of matter?",
        "options": ["A) It occupies space", "B) It has mass",
                    "C) It has colour", "D) Both A and B"],
        "answer": "C",
        "explanation": ("The two fundamental properties of matter are "
                        "occupying space and having mass. Colour is a "
                        "physical property but not a defining one.")
    },
    # ── Node 2 ──
    {
        "id": "mcq_n2_001", "node": "c7_phy_002",
        "question": "The spreading of perfume smell throughout a room is an example of:",
        "options": ["A) Diffusion", "B) Compression", "C) Evaporation",
                    "D) Condensation"],
        "answer": "A",
        "explanation": ("Diffusion is the spontaneous spreading of particles "
                        "from a region of high concentration to low concentration.")
    },
    {
        "id": "mcq_n2_002", "node": "c7_phy_002",
        "question": "Which state of matter is most compressible?",
        "options": ["A) Solid", "B) Liquid", "C) Gas", "D) All equally"],
        "answer": "C",
        "explanation": ("Gases have large interparticle spaces, so particles "
                        "can be pushed closer together easily.")
    },
    {
        "id": "mcq_n2_003", "node": "c7_phy_002",
        "question": "In which state are particles most closely packed?",
        "options": ["A) Solid", "B) Liquid", "C) Gas", "D) Plasma"],
        "answer": "A",
        "explanation": ("In solids, particles are tightly packed in a regular "
                        "arrangement with the least interparticle space.")
    },
    {
        "id": "mcq_n2_004", "node": "c7_phy_002",
        "question": "When ink is added to water and the colour spreads, it shows:",
        "options": ["A) Matter is made of particles", "B) Water has colour",
                    "C) Ink is heavier", "D) Water heats up"],
        "answer": "A",
        "explanation": ("The spreading (diffusion) of ink in water proves "
                        "that both are made of tiny moving particles.")
    },
    # ── Node 3 ──
    {
        "id": "mcq_n3_001", "node": "c7_phy_003",
        "question": "Which of the following is a property of a solid?",
        "options": ["A) Flows freely", "B) Definite shape",
                    "C) No definite volume", "D) Highly compressible"],
        "answer": "B",
        "explanation": ("Solids have both a definite shape and a definite "
                        "volume. They do not flow and are not compressible.")
    },
    {
        "id": "mcq_n3_002", "node": "c7_phy_003",
        "question": "Why do solids not flow like liquids?",
        "options": ["A) They have no mass", "B) Particles are fixed in position",
                    "C) They have no volume", "D) They are transparent"],
        "answer": "B",
        "explanation": ("In solids, particles are tightly packed and vibrate "
                        "about fixed positions — they cannot slide past each "
                        "other to flow.")
    },
    {
        "id": "mcq_n3_003", "node": "c7_phy_003",
        "question": "Ice is a solid because:",
        "options": ["A) It is cold", "B) Particles are tightly packed in fixed positions",
                    "C) It is white", "D) It floats on water"],
        "answer": "B",
        "explanation": ("The solid nature of ice is due to its particle arrangement: "
                        "tightly packed, vibrating about fixed positions.")
    },
]

def check_mcq(question_id: str, user_choice: str) -> ValidationResult:
    for q in MCQ_BANK:
        if q["id"] == question_id:
            is_correct = user_choice.strip().upper() == q["answer"]
            return ValidationResult(
                correct       = is_correct,
                score          = 1.0 if is_correct else 0.0,
                feedback       = (f"Correct! {q['explanation']}"
                                  if is_correct
                                  else (f"Incorrect. The right answer is "
                                        f"{q['answer']}. {q['explanation']}")),
                correct_answer = q["answer"],
                user_answer   = user_choice,
            )
    return ValidationResult(False, 0.0, "Question ID not found.", "N/A", user_choice)

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

SHORT_ANSWER_RUBRIC: Dict[str, Dict] = {
    "sa_n1_001": {
        "prompt": "Define matter in your own words.",
        "keywords":   ["occupies space", "has mass", "takes up space",
                        "weighs something"],
        "max_score":  2.0,
        "model_answer": ("Matter is anything that occupies space and has mass. "
                         "Examples: stone, water, air.")
    },
    "sa_n1_002": {
        "prompt": "Give two examples each of matter and non-matter.",
        "keywords":   ["stone", "water", "air", "light", "heat", "sound",
                        "shadow"],
        "max_score":  2.0,
        "model_answer": ("Matter: stone, water. Non-matter: light, sound.")
    },
    "sa_n2_001": {
        "prompt": "Explain diffusion with one example.",
        "keywords":   ["spreading", "ink", "water", "perfume", "air",
                        "high concentration", "low concentration"],
        "max_score":  2.0,
        "model_answer": ("Diffusion is the spreading of particles from an area "
                         "of high concentration to low concentration. "
                         "Example: smell of perfume spreading in air.")
    },
    "sa_n2_002": {
        "prompt": "Why is a gas more compressible than a solid?",
        "keywords":   ["space", "particles", "interparticle", "gap",
                        "pushed together"],
        "max_score":  2.0,
        "model_answer": ("In a gas, particles are widely spaced with large gaps, "
                         "so they can be pushed closer together. In a solid, "
                         "particles are already tightly packed.")
    },
    "sa_n3_001": {
        "prompt": "List two properties of solids and explain them using particle theory.",
        "keywords":   ["definite shape", "definite volume", "tightly packed",
                        "fixed position", "vibrate"],
        "max_score":  2.0,
        "model_answer": ("(1) Definite shape — particles vibrate about fixed "
                         "positions and cannot move freely. (2) Incompressible — "
                         "particles are already in contact with no free space.")
    },
    "sa_n3_002": {
        "prompt": "Why does a solid not flow?",
        "keywords":   ["fixed", "cannot move", "slide", "tightly packed",
                        "vibrate"],
        "max_score":  2.0,
        "model_answer": ("Solids do not flow because their particles are tightly "
                         "packed and locked in fixed positions; they can only "
                         "vibrate and cannot slide past each other.")
    },
}

def check_short_answer(question_id: str, user_answer: str) -> ValidationResult:
    if question_id not in SHORT_ANSWER_RUBRIC:
        return ValidationResult(False, 0.0, "Question ID not found.", "N/A", user_answer)

    rubric  = SHORT_ANSWER_RUBRIC[question_id]
    answer_lower = user_answer.strip().lower()
    keywords_hit = sum(1 for kw in rubric["keywords"]
                        if kw.lower() in answer_lower)
    coverage = keywords_hit / len(rubric["keywords"])
    score    = round(coverage * rubric["max_score"], 2)

    is_correct = score >= rubric["max_score"] * 0.6   # 60 % threshold
    feedback_parts = []
    if is_correct:
        feedback_parts.append("Good answer! Key ideas covered.")
    else:
        feedback_parts.append(
            "Answer needs more detail. Ensure you mention: "
            + ", ".join(rubric["keywords"][:3]) + "."
        )
    feedback_parts.append(f"Model answer: {rubric['model_answer']}")

    return ValidationResult(
        correct       = is_correct,
        score          = score,
        feedback       = " | ".join(feedback_parts),
        correct_answer = rubric["model_answer"],
        user_answer   = user_answer,
    )

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

LONG_ANSWER_RUBRIC: Dict[str, Dict] = {
    "la_n1_001": {
        "prompt": ("Differentiate between matter and non-matter. Give at least "
                    "two examples of each and explain why they belong to that "
                    "category."),
        "keywords":   ["occupies space", "has mass", "light", "sound",
                        "stone", "water", "energy", "no mass"],
        "max_score":  3.0,
        "model_answer": (
            "Matter has two fundamental properties: it occupies space and has "
            "mass. Examples: stone (solid, occupies space, has mass), water "
            "(liquid). Non-matter lacks one or both properties — e.g., light "
            "and sound are forms of energy; they do not occupy space or have "
            "mass. A shadow is a region without light, not a substance."
        ),
    },
    "la_n2_001": {
        "prompt": ("Describe two pieces of evidence that matter is made up of "
                    "tiny particles. Include particle-theory reasoning for each."),
        "keywords":   ["diffusion", "spreading", "ink", "perfume",
                        "compressibility", "syringe", "gas", "space between"],
        "max_score":  3.0,
        "model_answer": (
            "Evidence 1 — Diffusion: When ink is added to water, colour spreads "
            "throughout. This happens because ink particles move between water "
            "particles, proving both are made of tiny particles. "
            "Evidence 2 — Compressibility: A gas in a syringe can be compressed, "
            "showing large spaces between gas particles that can be reduced. "
            "Solids and liquids show almost no compression, confirming their "
            "particles are closely packed."
        ),
    },
    "la_n2_002": {
        "prompt": ("Explain how particle spacing accounts for the three states "
                    "of matter (solid, liquid, gas)."),
        "keywords":   ["tightly packed", "loosely", "widely spaced",
                        "fixed", "vibrate", "flow", "fill container"],
        "max_score":  5.0,
        "model_answer": (
            "In solids, particles are tightly packed in a regular pattern and "
            "vibrate about fixed positions — giving definite shape and volume. "
            "In liquids, particles are loosely packed and can slide past each "
            "other — giving definite volume but no fixed shape. In gases, "
            "particles are widely spaced and move freely in all directions — "
            "giving neither definite shape nor volume; gases fill their container. "
            "The greater the interparticle space, the more compressible the state."
        ),
    },
    "la_n3_001": {
        "prompt": ("Describe the properties of solids and relate EACH property "
                    "to the arrangement and movement of their particles."),
        "keywords":   ["definite shape", "definite volume", "incompressible",
                        "rigid", "tightly packed", "fixed position",
                        "vibrate", "interparticle"],
        "max_score":  5.0,
        "model_answer": (
            "Solids have four key properties: (1) Definite shape — particles "
            "vibrate about fixed positions and cannot move past each other. "
            "(2) Definite volume — particles are tightly packed with negligible "
            "interparticle space. (3) Incompressible — no free space exists "
            "between particles to allow compression. (4) Rigid / do not flow — "
            "strong interparticle forces lock particles in place."
        ),
    },
}

def check_long_answer(question_id: str, user_answer: str) -> ValidationResult:
    if question_id not in LONG_ANSWER_RUBRIC:
        return ValidationResult(False, 0.0, "Question ID not found.", "N/A", user_answer)

    rubric  = LONG_ANSWER_RUBRIC[question_id]
    answer_lower = user_answer.strip().lower()
    keywords_hit = sum(1 for kw in rubric["keywords"]
                        if kw.lower() in answer_lower)
    coverage = keywords_hit / len(rubric["keywords"])
    score    = round(coverage * rubric["max_score"], 2)

    is_correct = score >= rubric["max_score"] * 0.5
    feedback = (
        f"Score: {score}/{rubric['max_score']} — "
        + ("Good depth." if is_correct
           else "Needs more detail and keyword coverage.")
        + f" | Model answer: {rubric['model_answer']}"
    )
    return ValidationResult(
        correct       = is_correct,
        score          = score,
        feedback       = feedback,
        correct_answer = rubric["model_answer"],
        user_answer   = user_answer,
    )

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

def solve(question_type: str, question_id: str,
          user_answer: str = "", **kwargs) -> ValidationResult | Dict:
    """
    Unified entry point for the solver.
    question_type ∈ {mcq, fib, short_answer, long_answer,
                     classify_matter, verify_properties,
                     compare_diffusion, compare_compressibility,
                     particle_spacing, check_solid_property,
                     identify_solid, determine_state}
    """
    qtype = question_type.strip().lower()

    if qtype == "mcq":
        return check_mcq(question_id, user_answer)
    if qtype == "fib":
        return check_fib(question_id, user_answer)
    if qtype == "short_answer":
        return check_short_answer(question_id, user_answer)
    if qtype == "long_answer":
        return check_long_answer(question_id, user_answer)

    if qtype == "classify_matter":
        item = kwargs.get("item", "")
        return classify_matter(item)
    if qtype == "verify_properties":
        item = kwargs.get("item", "")
        return verify_two_properties(item)
    if qtype == "particle_spacing":
        state = kwargs.get("state", "solid")
        return particle_spacing(state)
    if qtype == "check_solid_property":
        prop = kwargs.get("property", "")
        return check_solid_property(prop)
    if qtype == "identify_solid":
        items = kwargs.get("items", [])
        return identify_solid(items)
    if qtype == "determine_state":
        return {"state": determine_state(
            kwargs.get("has_definite_shape", True),
            kwargs.get("has_definite_volume", True),
            kwargs.get("flows", False))}
    if qtype == "compare_diffusion":
        return compare_diffusion(
            DiffusionScenario(**kwargs.get("s1", {})),
            DiffusionScenario(**kwargs.get("s2", {})))
    if qtype == "compare_compressibility":
        return compare_compressibility(
            CompressibilityScenario(**kwargs.get("s1", {})),
            CompressibilityScenario(**kwargs.get("s2", {})))

    return {"error": f"Unknown question_type '{question_type}'."}

# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=== c7_phy_001  Physical nature of matter ===")
    for obj in ["stone", "water", "air", "light", "sound"]:
        r = solve("classify_matter", "", item=obj)
        print(f"  {obj:10s} → matter={r.is_matter}  [{r.category}]")

    print("\n=== c7_phy_002  Particle nature ===")
    d = solve("compare_diffusion", "",
              s1={"substance":"ink","medium":"water","from_state":"liquid","to_state":"liquid"},
              s2={"substance":"perfume","medium":"air","from_state":"gas","to_state":"gas"})
    print(f"  Faster : {d.faster_medium}")
    print(f"  Slower : {d.slower_medium}")

    c = solve("compare_compressibility", "",
              s1={"state":"solid"}, s2={"state":"gas"})
    print(f"  Most compressible    : {c.most_compressible}")
    print(f"  Least compressible   : {c.least_compressible}")

    print("\n=== c7_phy_003  Solid state ===")
    for prop in ["definite_shape", "incompressible", "flow"]:
        r = solve("check_solid_property", "", property=prop)
        print(f"  {prop:20s} → {r['value']}")

    print("\n=== MCQ check ===")
    r = solve("mcq", "mcq_n2_002", user_choice="C")
    print(f"  mcq_n2_002 → correct={r.correct}  score={r.score}")

    print("\n=== FIB check ===")
    r = solve("fib", "fib_n2_q1", user_answer="tiny")
    print(f"  fib_n2_q1 → correct={r.correct}")

    print("\n=== Short-answer check ===")
    r = solve("short_answer", "sa_n2_001",
              user_answer="Diffusion is the spreading of perfume smell in air.")
    print(f"  sa_n2_001 → score={r.score}/2.0  correct={r.correct}")