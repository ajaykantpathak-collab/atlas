"""
Class 8 Physics Question Generator — 3 Nodes (c8_phy_001/002/003)
Seeded randomization, 50% Indian-context competency + 50% standard.
Generates question + multiple-choice options + correct answer + explanation.
"""

import random
import math
import dataclasses
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum

# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
STATES = ("solid", "liquid", "gas")

STATE_PROPERTIES = {
    "solid": {
        "arrangement": "tightly packed in fixed positions",
        "motion": "vibrate about fixed positions",
        "shape": "definite shape",
        "volume": "definite volume",
        "compressibility": "almost incompressible",
        "fluidity": "does not flow",
        "ke_level": "lowest",
    },
    "liquid": {
        "arrangement": "loosely packed",
        "motion": "slide past one another",
        "shape": "no fixed shape (takes container's shape)",
        "volume": "definite volume",
        "compressibility": "slightly compressible",
        "fluidity": "flows",
        "ke_level": "moderate",
    },
    "gas": {
        "arrangement": "far apart from each other",
        "motion": "move freely in all directions at high speed",
        "shape": "no fixed shape",
        "volume": "no fixed volume",
        "compressibility": "easily compressible",
        "fluidity": "flows freely",
        "ke_level": "highest",
    },
}

POSTULATES = [
    "All matter is made up of tiny particles (atoms/molecules).",
    "Particles are in constant random motion.",
    "Particles possess kinetic energy.",
    "There are attractive forces between particles.",
    "Kinetic energy of particles depends on temperature.",
]

INDIA_EXAMPLES = [
    ("Why does butter melt on a hot Indian summer day?", "solid → liquid: heat gives KE, overcomes forces"),
    ("Why does steam from a pressure cooker burn more than boiling water?", "gas has highest KE; steam particles carry more energy"),
    ("Why can you squeeze a sponge but not a stone?", "sponge has air gaps (compressible like a gas); stone is solid (incompressible)"),
    ("In summer, why does the mercury in a thermometer rise?", "temperature ↑ → particle KE ↑ → mercury expands"),
    ("Why does an earthen pot (matka) keep water cool?", "water seeps through pores, evaporates (liquid → gas); evaporation needs KE from water, cooling it"),
    ("Why does perfume spread across a room without wind?", "gas particles move freely in all directions (diffusion)"),
    ("When a ruler is struck on a desk, why does sound travel?", "vibration of particles transmits energy as sound waves"),
    ("Why does Ghee (clarified butter) flow when heated but solidify when cooled?",
     "Heat increases KE, overcoming inter-particle forces → liquid; cooling reverses it → solid"),
]


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
class NodeID(str, Enum):
    KINETIC_THEORY = "c8_phy_001"
    THREE_STATES   = "c8_phy_002"
    ENERGY_CONTENT = "c8_phy_003"


@dataclass
class MCQOption:
    label: str       # A, B, C, D
    text: str


@dataclass
class Question:
    node_id: str
    difficulty: str
    competency: str
    question_text: str
    options: List[MCQOption]
    correct_label: str
    explanation: str
    indian_context: str = ""       # optional India-specific note
    marks: int = 1


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
def _india_note(seed: int) -> str:
    rng = random.Random(seed)
    return rng.choice(INDIA_EXAMPLES)[0]


# ===================================================================
# ===================================================================
def gen_kinetic_theory(seed: int = 0) -> Question:
    rng = random.Random(seed)
    qtype = rng.randint(0, 4)
    diff = "Medium"
    comp = "Board"

    if qtype == 0:
        question = (
            "Which of the following is NOT a postulate of the kinetic theory of matter?"
        )
        opts = [
            MCQOption("A", "All matter is made up of tiny particles."),
            MCQOption("B", "Particles are in constant random motion."),
            MCQOption("C", "Particles are stationary at room temperature."),
            MCQOption("D", "Kinetic energy of particles depends on temperature."),
        ]
        correct = "C"
        explanation = (
            "Option C contradicts Postulate 2 — particles are NEVER stationary. "
            "They are always in motion, even in a solid (they vibrate)."
        )
    elif qtype == 1:
        question = "According to the kinetic theory of matter, what happens to the kinetic energy of particles when a substance is heated?"
        opts = [
            MCQOption("A", "It decreases."),
            MCQOption("B", "It remains unchanged."),
            MCQOption("C", "It increases."),
            MCQOption("D", "It first increases then decreases."),
        ]
        correct = "C"
        explanation = (
            "Heating a substance raises its temperature. Since KE ∝ Temperature, "
            "the kinetic energy of the particles increases."
        )
    elif qtype == 2:
        question = "Why are particles in a solid not completely at rest, even though the solid appears still?"
        opts = [
            MCQOption("A", "Solid particles have no kinetic energy."),
            MCQOption("B", "Solid particles vibrate about fixed positions — they possess kinetic energy."),
            MCQOption("C", "Gravity keeps the particles moving."),
            MCQOption("D", "External sound waves vibrate the particles."),
        ]
        correct = "B"
        explanation = (
            "According to the kinetic theory, all particles possess kinetic energy. "
            "In solids, particles vibrate about fixed positions. They are never truly at rest."
        )
    elif qtype == 3:
        question = (
            "Which postulate explains why a gas fills the entire container it is placed in?"
        )
        opts = [
            MCQOption("A", "Particles are made of atoms."),
            MCQOption("B", "There are attractive forces between particles."),
            MCQOption("C", "Particles are in constant random motion."),
            MCQOption("D", "Kinetic energy depends on temperature."),
        ]
        correct = "C"
        explanation = (
            "Postulate 2: particles are in constant random motion. "
            "Gas particles move freely in all directions and spread to fill the entire container."
        )
    else:
        india, _ = rng.choice(INDIA_EXAMPLES)
        question = (
            f"Consider: {india}\n"
            "Which postulate of the kinetic theory best explains this observation?"
        )
        opts = [
            MCQOption("A", "Particles possess kinetic energy."),
            MCQOption("B", "All matter is made up of particles."),
            MCQOption("C", "There are no attractive forces between particles."),
            MCQOption("D", "Particles are stationary at low temperatures."),
        ]
        correct = "A"
        explanation = (
            "The observation involves a change driven by particle motion/energy. "
            "Postulate 3 (particles possess kinetic energy) explains why heat causes motion and state changes."
        )

    ic = _india_note(seed + 99)
    return Question(
        node_id=NodeID.KINETIC_THEORY.value,
        difficulty=diff, competency=comp,
        question_text=question,
        options=opts,
        correct_label=correct,
        explanation=explanation,
        indian_context=ic,
        marks=1,
    )


# ===================================================================
# ===================================================================
def gen_three_states(seed: int = 0) -> Question:
    rng = random.Random(seed)
    qtype = rng.randint(0, 5)
    diff = "Medium"
    comp = "Board"

    if qtype == 0:
        state = rng.choice(STATES)
        question = f"In the **{state}** state, particles ______."
        correct_text = STATE_PROPERTIES[state]["motion"]
        wrong_pool = [STATE_PROPERTIES[s]["motion"] for s in STATES if s != state]
        rng.shuffle(wrong_pool)
        opts = [
            MCQOption("A", correct_text),
            MCQOption("B", wrong_pool[0] if len(wrong_pool) > 0 else "do not move at all"),
            MCQOption("C", "are attracted to each other very strongly and cannot move"),
            MCQOption("D", "are fixed in a regular lattice with no motion"),
        ]
        # shuffle but track correct
        rng.shuffle(opts)
        correct = next(o.label for o in opts if o.text == correct_text)
        explanation = (
            f"In the {state} state, particles {STATE_PROPERTIES[state]['motion']}. "
            f"This is a defining feature of the {state} state."
        )

    elif qtype == 1:
        s1, s2 = rng.sample(STATES, 2)
        question = (
            f"Which of the following correctly compares **{s1}** and **{s2}**?"
        )
        correct_text = (
            f"{s1.capitalize()}s: particles {STATE_PROPERTIES[s1]['motion']}; "
            f"{s2.capitalize()}s: particles {STATE_PROPERTIES[s2]['motion']}."
        )
        opts = [
            MCQOption("A", correct_text),
            MCQOption("B", f"Both {s1}s and {s2}s have particles that move freely in all directions."),
            MCQOption("C", f"Particles in both {s1}s and {s2}s are tightly packed and vibrate."),
            MCQOption("D", f"{s1.capitalize()}s have no definite volume, {s2.capitalize()}s have a definite volume."),
        ]
        rng.shuffle(opts)
        correct = next(o.label for o in opts if o.text == correct_text)
        explanation = (
            f"{s1.capitalize()} particles {STATE_PROPERTIES[s1]['motion']}; "
            f"{s2.capitalize()} particles {STATE_PROPERTIES[s2]['motion']}. "
            f"This difference arises from the strength of inter-particle forces."
        )

    elif qtype == 2:
        prop = rng.choice(["shape", "volume", "compressibility", "fluidity"])
        question = f"Which state of matter is **{STATE_PROPERTIES['gas'][prop]}**?"
        opts = [
            MCQOption("A", "Solid"),
            MCQOption("B", "Liquid"),
            MCQOption("C", "Gas"),
            MCQOption("D", "Both Solid and Liquid"),
        ]
        correct = "C"
        explanation = (
            f"Gases are {STATE_PROPERTIES['gas'][prop]}. "
            f"This is because gas particles are far apart and face negligible resistance to movement."
        )

    elif qtype == 3:
        state = rng.choice(STATES)
        question = (
            f"Which property is the SAME for both **{state}** and **liquid** states?"
        )
        shared = [p for p in STATE_PROPERTIES[state]
                  if p in STATE_PROPERTIES["liquid"
                  ] and STATE_PROPERTIES[state][p] == STATE_PROPERTIES["liquid"][p]]
        correct_text = shared[0].replace("_", " ").title() if shared else "Both have definite volume"
        if state == "solid":
            correct_text = "Both have a definite volume"
        elif state == "gas":
            correct_text = "Both can flow"  # gas flows, liquid flows
        else:
            correct_text = "Both have a definite volume"

        opts = [
            MCQOption("A", "Both have a definite shape"),
            MCQOption("B", correct_text),
            MCQOption("C", "Both are easily compressible"),
            MCQOption("D", "Both have no fixed volume"),
        ]
        rng.shuffle(opts)
        correct = next(o.label for o in opts if o.text == correct_text)
        explanation = (
            f"Solids and liquids have definite volume. "
            f"Only gases lack definite shape AND volume. Both liquids and gases can flow."
        )

    elif qtype == 4:
        question = (
            "Arrange the three states of matter in order of DECREASING closeness of particles:\n"
            "(a) Solid   (b) Liquid   (c) Gas"
        )
        opts = [
            MCQOption("A", "Solid > Liquid > Gas"),
            MCQOption("B", "Gas > Liquid > Solid"),
            MCQOption("C", "Liquid > Solid > Gas"),
            MCQOption("D", "Solid > Gas > Liquid"),
        ]
        correct = "A"
        explanation = (
            "Solid particles are tightly packed → closest.\n"
            "Liquid particles are loosely packed → intermediate.\n"
            "Gas particles are far apart → farthest apart."
        )

    else:
        question = (
            "When a drop of ink is placed in a glass of water, it slowly spreads throughout the water. "
            "This is because the particles of ink ______."
        )
        opts = [
            MCQOption("A", "are attracted to water molecules and stick to them"),
            MCQOption("B", "move and slide between water molecules (diffusion)"),
            MCQOption("C", "are heavier and sink to the bottom"),
            MCQOption("D", "react chemically with water"),
        ]
        correct = "B"
        explanation = (
            "Ink particles move and slide between water molecules — "
            "a process called diffusion. This is characteristic of liquid-state particle motion."
        )

    ic = _india_note(seed + 99)
    return Question(
        node_id=NodeID.THREE_STATES.value,
        difficulty=diff, competency=comp,
        question_text=question,
        options=opts,
        correct_label=correct,
        explanation=explanation,
        indian_context=ic,
        marks=1,
    )


# ===================================================================
# ===================================================================
def gen_energy_content(seed: int = 0) -> Question:
    rng = random.Random(seed)
    qtype = rng.randint(0, 4)
    diff = "Medium"
    comp = "Board"

    if qtype == 0:
        question = (
            "Arrange the three states of matter in order of INCREASING kinetic energy of particles."
        )
        opts = [
            MCQOption("A", "Solid → Liquid → Gas"),
            MCQOption("B", "Gas → Liquid → Solid"),
            MCQOption("C", "Liquid → Solid → Gas"),
            MCQOption("D", "Solid → Gas → Liquid"),
        ]
        correct = "A"
        explanation = (
            "Solid particles vibrate (lowest KE) → Liquid particles slide (moderate KE) "
            "→ Gas particles move freely at high speed (highest KE)."
        )

    elif qtype == 1:
        question = "Which state of matter has the highest kinetic energy and why?"
        opts = [
            MCQOption("A", "Solid — particles are tightly packed."),
            MCQOption("B", "Liquid — particles are in-between."),
            MCQOption("C", "Gas — particles move freely at high speed, overcoming inter-particle forces."),
            MCQOption("D", "All states have equal kinetic energy."),
        ]
        correct = "C"
        explanation = (
            "Gas particles have the highest kinetic energy because they move freely in all directions "
            "at high speeds, having overcome the inter-particle attractive forces."
        )

    elif qtype == 2:
        direction = rng.choice(["increased", "decreased"])
        state = rng.choice(STATES)
        question = (
            f"If the temperature of a sample of **{state}** is {direction}, "
            f"the kinetic energy of its particles will:"
        )
        effect = "increase" if direction == "increased" else "decrease"
        opts = [
            MCQOption("A", f"{effect.capitalize()}"),
            MCQOption("B", f"{'Decrease' if effect == 'increase' else 'Increase'}"),
            MCQOption("C", "Remain the same"),
            MCQOption("D", "First increase then decrease"),
        ]
        correct = "A"
        explanation = (
            f"KE ∝ Temperature. When temperature is {direction}, particle speed {effect}s, "
            f"so kinetic energy {effect}s."
        )

    elif qtype == 3:
        ic_question, ic_explain = rng.choice(INDIA_EXAMPLES)
        question = (
            f"Consider this everyday observation from India:\n"
            f"  \"{ic_question}\"\n"
            f"Which of the following best explains it using kinetic theory?"
        )
        opts = [
            MCQOption("A", "Particles lose kinetic energy during the process."),
            MCQOption("B", "Temperature change alters particle kinetic energy, changing the state."),
            MCQOption("C", "Particles change their chemical composition."),
            MCQOption("D", "Gravity is responsible for the change."),
        ]
        correct = "B"
        explanation = ic_explain + ". This is explained by kinetic theory: KE changes with temperature."

    else:
        t_vals = sorted(rng.sample(range(15, 120), 3))
        question = (
            "Three identical samples are at the following temperatures:\n"
            f"  X = {t_vals[0]} °C,  Y = {t_vals[1]} °C,  Z = {t_vals[2]} °C\n"
            "Rank them by kinetic energy of their particles (lowest to highest)."
        )
        opts = [
            MCQOption("A", f"X < Y < Z"),
            MCQOption("B", f"Z < Y < X"),
            MCQOption("C", f"Y < X < Z"),
            MCQOption("D", f"All have equal KE"),
        ]
        correct = "A"
        explanation = (
            f"KE ∝ Temperature. Since {t_vals[0]} < {t_vals[1]} < {t_vals[2]}, "
            f"KE follows the same order: X < Y < Z."
        )

    ic = _india_note(seed + 99)
    return Question(
        node_id=NodeID.ENERGY_CONTENT.value,
        difficulty=diff, competency=comp,
        question_text=question,
        options=opts,
        correct_label=correct,
        explanation=explanation,
        indian_context=ic,
        marks=1,
    )


# ===================================================================
# ===================================================================
GENERATORS = {
    NodeID.KINETIC_THEORY.value: gen_kinetic_theory,
    NodeID.THREE_STATES.value:   gen_three_states,
    NodeID.ENERGY_CONTENT.value: gen_energy_content,
}


def generate(node_id: str, seed: int = 0) -> Question:
    if node_id not in GENERATORS:
        raise ValueError(f"Unknown node_id '{node_id}'. Valid: {list(GENERATORS)}")
    return GENERATORS[node_id](seed)


def generate_all(seed: int = 42, n_per_node: int = 3) -> dict:
    """
    Generate `n_per_node` questions per node.
    Returns {node_id: [Question, ...]}.
    """
    result = {}
    for i, nid in enumerate(GENERATORS):
        result[nid] = [generate(nid, seed + i * 100 + j) for j in range(n_per_node)]
    return result


# ===================================================================
# ===================================================================
def print_question(q: Question) -> None:
    print(f"\n{'='*70}")
    print(f"Node   : {q.node_id}  |  Difficulty: {q.difficulty}  |  Competency: {q.competency}  |  Marks: {q.marks}")
    print(f"{'-'*70}")
    print(f"Q: {q.question_text}")
    print()
    for opt in q.options:
        marker = " ✓" if opt.label == q.correct_label else ""
        print(f"  ({opt.label}) {opt.text}{marker}")
    if q.indian_context:
        print(f"\n  🇮🇳 India Context: {q.indian_context}")
    print(f"\n  Explanation: {q.explanation}")
    print(f"{'='*70}")


# ===================================================================
# ===================================================================
import json

def to_json(q: Question) -> str:
    d = dataclasses.asdict(q)
    d["options"] = [{"label": o.label, "text": o.text} for o in q.options]
    return json.dumps(d, indent=2, ensure_ascii=False)


# ===================================================================
# ===================================================================
if __name__ == "__main__":
    print("=" * 70)
    print("  Class 8 Physics — Question Generator Demo (3 Nodes)")
    print("=" * 70)

    questions = generate_all(seed=2024, n_per_node=2)
    for node_id, qlist in questions.items():
        print(f"\n{'#'*70}")
        print(f"# NODE: {node_id}")
        print(f"{'#'*70}")
        for q in qlist:
            print_question(q)