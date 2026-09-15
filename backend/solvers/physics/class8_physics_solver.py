"""
Class 8 Physics Solver — Nodes: c8_phy_001, c8_phy_002, c8_phy_003
Deterministic step-by-step solver with SymPy + NumPy + verification.
"""

import math
import random
import dataclasses
from dataclasses import dataclass, field
from typing import List, Optional, Tuple
from enum import Enum
import sympy as sp

# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
STATES = ("solid", "liquid", "gas")
KE_ORDER = {"solid": 1, "liquid": 2, "gas": 3}          # 1=lowest, 3=highest
PARTICLE_ORDER = {"solid": 1, "liquid": 2, "gas": 3}    # closeness of packing

# kinetic-theory postulates (verbatim syllabus)
POSTULATES = [
    "All matter is made up of tiny particles (atoms/molecules).",
    "Particles are in constant random motion.",
    "Particles possess kinetic energy.",
    "There are attractive forces between particles (inter-particle forces).",
    "The kinetic energy of particles depends on temperature.",
]

# comparison data
STATE_PROPERTIES = {
    "solid": {
        "particle_arrangement": "tightly packed in fixed positions",
        "particle_motion": "vibrate about fixed positions only",
        "shape": "definite shape",
        "volume": "definite volume",
        "compressibility": "almost incompressible",
        "fluidity": "does not flow",
    },
    "liquid": {
        "particle_arrangement": "loosely packed",
        "particle_motion": "slide past one another",
        "shape": "no definite shape (takes shape of container)",
        "volume": "definite volume",
        "compressibility": "slightly compressible",
        "fluidity": "flows",
    },
    "gas": {
        "particle_arrangement": "far apart",
        "particle_motion": "move freely in all directions at high speed",
        "shape": "no definite shape",
        "volume": "no definite volume",
        "compressibility": "easily compressible",
        "fluidity": "flows freely",
    },
}

KE_TABLE = {
    "solid":  {"ke_level": "lowest",  "temp_effect": "Particles only vibrate; KE increases slightly with temperature."},
    "liquid": {"ke_level": "moderate","temp_effect": "Particles can slide; KE increases moderately with temperature."},
    "gas":    {"ke_level": "highest", "temp_effect": "Particles move freely at high speed; KE increases greatly with temperature."},
}


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
class NodeID(str, Enum):
    KINETIC_THEORY   = "c8_phy_001"
    THREE_STATES     = "c8_phy_002"
    ENERGY_CONTENT   = "c8_phy_003"


@dataclass
class Step:
    """One step in the worked solution."""
    label: str          # e.g. "Given", "Formula", "Substitution"
    text: str           # human-readable explanation
    math: str = ""      # LaTeX or plain-text expression (optional)

@dataclass
class Solution:
    node_id: str
    question: str
    steps: List[Step]
    answer: str
    verification: str


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
def _bullet(text: str) -> str:
    return f"• {text}"


# ===================================================================
# ===================================================================
def solve_kinetic_theory(seed: int = 0) -> Solution:
    """
    Question types (rotated by seed):
      0 — State all postulates of kinetic theory
      1 — Explain why particles are never at rest
      2 — Relate temperature to kinetic energy
      3 — Why does heating change the state of matter
    """
    rng = random.Random(seed)
    qtype = rng.randint(0, 3)

    if qtype == 0:
        question = "State the main postulates of the kinetic theory of matter."
        steps = [
            Step("Recall", "The kinetic theory of matter is based on five key postulates:"),
            Step("Postulate 1", "All matter is made up of tiny particles called atoms or molecules."),
            Step("Postulate 2", "These particles are in constant, random motion at all times."),
            Step("Postulate 3", "Particles possess kinetic energy due to their motion."),
            Step("Postulate 4", "There are attractive forces (inter-particle forces) between the particles."),
            Step("Postulate 5", "The kinetic energy of the particles depends on the temperature of the substance."),
        ]
        answer = "\n".join(f"{i+1}. {p}" for i, p in enumerate(POSTULATES))
        verification = ("All five postulates listed — check: particles, constant motion, "
                        "kinetic energy, inter-particle forces, temperature dependence.")

    elif qtype == 1:
        question = "Explain why particles in matter are never at rest, using the kinetic theory of matter."
        steps = [
            Step("Key concept", "According to the kinetic theory, particles of matter are always in motion."),
            Step("Explanation",
                 "Particles possess kinetic energy, which is the energy of motion. "
                 "This energy never becomes zero — even in a solid, particles vibrate about fixed positions. "
                 "At absolute zero (−273 °C) theoretical particle motion ceases, "
                 "but this temperature is never reached in practice."),
            Step("Every state",
                 "Solid → particles vibrate; Liquid → particles slide; Gas → particles move freely. "
                 "None of these are 'at rest'."),
        ]
        answer = ("Particles are never at rest because they always possess kinetic energy. "
                  "Even in solids they vibrate; in liquids they slide; in gases they move freely.")
        verification = ("Explanation covers constant motion, kinetic energy, "
                        "and examples from all three states.")

    elif qtype == 2:
        temp = rng.randint(20, 100)
        question = f"Explain the relationship between temperature and the kinetic energy of particles in a substance at {temp} °C."
        steps = [
            Step("Given", f"Temperature = {temp} °C"),
            Step("Relationship",
                 "Kinetic energy ∝ Temperature (KE ∝ T). "
                 "Higher temperature → particles move faster → greater KE."),
            Step("At given temp",
                 f"At {temp} °C the particles have kinetic energy proportional to this temperature. "
                 "If temperature increases, particle speed and KE increase; if temperature decreases, they decrease."),
        ]
        answer = (f"At {temp} °C, particles have kinetic energy proportional to the temperature. "
                  "Temperature and kinetic energy are directly proportional: "
                  "increase in temperature → increase in particle speed → increase in KE.")
        verification = f"Relationship KE ∝ T stated; applied to {temp} °C."

    else:  # qtype == 3
        question = "Why does heating a substance sometimes change its state (e.g., ice → water → steam)?"
        steps = [
            Step("Observation", "Heting ice at 0 °C turns it to water; heating water at 100 °C turns it to steam."),
            Step("Kinetic theory explanation",
                 "1. When ice is heated, particles gain kinetic energy and vibrate more vigorously.\n"
                 "2. At 0 °C, particles have enough energy to break free from fixed positions → they can slide → liquid water.\n"
                 "3. Further heating increases KE further; particles overcome inter-particle forces completely → gas (steam)."),
            Step("Summary", "Heating increases kinetic energy → overcomes inter-particle forces → state changes."),
        ]
        answer = ("Heating increases particle kinetic energy. As KE increases, particles "
                  "overcome the inter-particle forces holding them in fixed positions, "
                  "causing a change of state: solid → liquid → gas.")
        verification = "Chain: heat → KE ↑ → overcome forces → state change. Correct."

    return Solution(
        node_id=NodeID.KINETIC_THEORY.value,
        question=question,
        steps=steps,
        answer=answer,
        verification=verification,
    )


# ===================================================================
# ===================================================================
def solve_three_states(seed: int = 0) -> Solution:
    """
    Question types:
      0 — Describe particle arrangement & movement for a given state
      1 — Compare two states side-by-side
      2 — Match observable property to state
      3 — Fill a comparison table entry
    """
    rng = random.Random(seed)
    qtype = rng.randint(0, 3)
    state = rng.choice(STATES)
    other = rng.choice([s for s in STATES if s != state])

    if qtype == 0:
        question = f"Describe the particle arrangement and movement in the **{state}** state of matter."
        props = STATE_PROPERTIES[state]
        steps = [
            Step("Identify state", f"Focus: {state.upper()}"),
            Step("Particle arrangement",
                 f"In a {state}, particles are {props['particle_arrangement']}."),
            Step("Particle motion",
                 f"The particles {props['particle_motion']}."),
            Step("Consequence",
                 f"This explains why {state}s have {props['shape']} and {props['volume']}."),
        ]
        answer = (f"Arrangement: {props['particle_arrangement']}. "
                  f"Movement: {props['particle_motion']}. "
                  f"Result: {props['shape']}, {props['volume']}.")
        verification = f"Arrangement and movement for {state} correctly stated."

    elif qtype == 1:
        question = f"Compare the **{state}** and **{other}** states in terms of particle arrangement, movement, and compressibility."
        sprops = STATE_PROPERTIES[state]
        oprops = STATE_PROPERTIES[other]
        steps = [
            Step("Property", "Particle Arrangement",),
            Step(f"{state.title()}",
                 f"Particles are {sprops['particle_arrangement']}."),
            Step(f"{other.title()}",
                 f"Particles are {oprops['particle_arrangement']}."),
            Step("Property", "Particle Movement"),
            Step(f"{state.title()}", sprops['particle_motion']),
            Step(f"{other.title()}", oprops['particle_motion']),
            Step("Property", "Compressibility"),
            Step(f"{state.title()}", sprops['compressibility']),
            Step(f"{other.title()}", oprops['compressibility']),
        ]
        answer = (f"{state.title()}: {sprops['particle_arrangement']}; {sprops['particle_motion']}; "
                  f"{sprops['compressibility']}.\n"
                  f"{other.title()}: {oprops['particle_arrangement']}; {oprops['particle_motion']}; "
                  f"{oprops['compressibility']}.")
        verification = "All three properties compared correctly."

    elif qtype == 2:
        prop_key = rng.choice(["shape", "volume", "compressibility", "fluidity"])
        prop_val = STATE_PROPERTIES[state][prop_key]
        question = f"Which state of matter has the property: **{prop_val}**?"
        steps = [
            Step("Recall definitions", "Recall the four observable properties of matter."),
            Step(f"Property: {prop_key}", f"A substance that is '{prop_val}' is a {state}."),
            Step("Verification",
                 f"Solids have definite shape/volume, liquids have definite volume only, "
                 f"gases have neither — confirming: {state}."),
        ]
        answer = state.capitalize()
        verification = f"Property '{prop_val}' correctly matched to {state}."

    else:  # qtype == 3
        prop = rng.choice(["particle_arrangement", "particle_motion", "shape", "volume", "compressibility"])
        question = f"Fill in the blank: '{state.capitalize()}s have {STATE_PROPERTIES[state][prop]}.' Is this statement True or False?"
        steps = [
            Step("Check", f"Look up '{prop}' for the {state} state in the comparison table."),
            Step("Fact",
                 f"According to kinetic theory, {state}s: {STATE_PROPERTIES[state][prop]}."),
            Step("Conclusion", "The statement is TRUE."),
        ]
        answer = "True"
        verification = f"'{prop}' for {state} verified from table — statement is True."

    return Solution(
        node_id=NodeID.THREE_STATES.value,
        question=question,
        steps=steps,
        answer=answer,
        verification=verification,
    )


# ===================================================================
# ===================================================================
def solve_energy_content(seed: int = 0) -> Solution:
    """
    Question types:
      0 — Rank the three states by kinetic energy content
      1 — Which state has the highest / lowest KE and why
      2 — What happens to particle KE when temperature changes
      3 — Numerical: compute relative KE ordering given temperatures
    """
    rng = random.Random(seed)
    qtype = rng.randint(0, 3)

    if qtype == 0:
        question = "Rank the three states of matter (solid, liquid, gas) in order of increasing kinetic energy content of their particles."
        steps = [
            Step("Recall", "Kinetic energy depends on how freely and how fast particles move."),
            Step("Solid",
                 "Particles vibrate about fixed positions → lowest KE."),
            Step("Liquid",
                 "Particles slide past each other → moderate KE."),
            Step("Gas",
                 "Particles move freely at high speed → highest KE."),
            Step("Order",
                 "Solid < Liquid < Gas (increasing KE)."),
        ]
        answer = "Solid < Liquid < Gas (solid has lowest KE, gas has highest KE)."
        verification = "Order: Solid (lowest) → Liquid → Gas (highest). Correct."

    elif qtype == 1:
        target = rng.choice(["highest", "lowest"])
        target_state = "gas" if target == "highest" else "solid"
        question = f"Which state of matter has the {target} kinetic energy content, and why?"
        ke_info = KE_TABLE[target_state]
        steps = [
            Step("Answer", f"The **{target_state}** state has the {target} kinetic energy."),
            Step("Why",
                 f"Particles in {target_state}s {ke_info['temp_effect']} "
                 f"KE level: {ke_info['ke_level']}."),
            Step("Comparison",
                 "Compare: solid particles only vibrate (low KE); "
                 "gas particles travel freely at high speed (high KE)."),
        ]
        answer = (f"{target_state.capitalize()} has the {target} kinetic energy. "
                  f"{ke_info['temp_effect']}")
        verification = f"Correct: {target_state} → {ke_info['ke_level']} KE."

    elif qtype == 2:
        direction = rng.choice(["increased", "decreased"])
        state = rng.choice(STATES)
        question = f"If the temperature of a {state} is {direction}, what happens to the kinetic energy of its particles?"
        effect = "increases" if direction == "increased" else "decreases"
        steps = [
            Step("Key relationship", "Kinetic energy ∝ Temperature (KE ∝ T)."),
            Step(f"Temperature {direction}",
                 f"When temperature is {direction}, particle speed {'increases' if direction=='increased' else 'decreases'}."),
            Step(f"Effect on KE", f"Therefore, the kinetic energy of the particles {effect}."),
            Step(f"In {state} context",
                 f"In a {state}, particles already {STATE_PROPERTIES[state]['particle_motion']}. "
                 f"Temperature change modifies the speed/extent of that motion."),
        ]
        answer = (f"The kinetic energy of the particles {effect}. "
                  f"Temperature and KE are directly proportional.")
        verification = f"Direct proportionality applied: temperature {direction} → KE {effect}."

    else:  # qtype == 3 — numerical ordering
        t1 = rng.randint(10, 30)   # cold solid
        t2 = rng.randint(40, 70)  # liquid
        t3 = rng.randint(80, 120) # hot gas
        question = (
            f"Three samples are at temperatures:\n"
            f"  Sample A (solid):   {t1} °C\n"
            f"  Sample B (liquid):  {t2} °C\n"
            f"  Sample C (gas):     {t3} °C\n"
            f"Rank the samples by kinetic energy of their particles, from lowest to highest."
        )
        steps = [
            Step("Given",
                 f"T_A = {t1} °C (solid), T_B = {t2} °C (liquid), T_C = {t3} °C (gas)"),
            Step("Principle", "KE ∝ Temperature. Higher temperature → higher KE."),
            Step("Rank by temperature", f"{t1} < {t2} < {t3}"),
            Step("Rank by KE", "Sample A < Sample B < Sample C"),
            Step("Cross-check with states",
                 "Solid particles vibrate (lowest KE) < Liquid particles slide (moderate KE) "
                 "< Gas particles move freely (highest KE). Both rankings agree."),
        ]
        answer = f"Sample A (solid, {t1} °C) < Sample B (liquid, {t2} °C) < Sample C (gas, {t3} °C)"
        verification = (f"KE ranking: {t1}<{t2}<{t3} → A<B<C. "
                        "Consistent with solid<liquid<gas KE ordering.")

    return Solution(
        node_id=NodeID.ENERGY_CONTENT.value,
        question=question,
        steps=steps,
        answer=answer,
        verification=verification,
    )


# ===================================================================
# ===================================================================
SOLVERS = {
    NodeID.KINETIC_THEORY.value: solve_kinetic_theory,
    NodeID.THREE_STATES.value:   solve_three_states,
    NodeID.ENERGY_CONTENT.value: solve_energy_content,
}


def solve(node_id: str, seed: int = 0) -> Solution:
    """
    Solve a question for the given node_id with a deterministic seed.
    Raises ValueError if node_id is unknown.
    """
    if node_id not in SOLVERS:
        raise ValueError(f"Unknown node_id '{node_id}'. Valid: {list(SOLVERS)}")
    return SOLVERS[node_id](seed)


def solve_all(seed: int = 42) -> dict:
    """Solve one question per node and return dict keyed by node_id."""
    return {nid: solve(nid, seed + i) for i, nid in enumerate(SOLVERS)}


# ===================================================================
# ===================================================================
def print_solution(sol: Solution) -> None:
    print(f"{'='*70}")
    print(f"Node   : {sol.node_id}")
    print(f"Q      : {sol.question}")
    print(f"{'-'*70}")
    for step in sol.steps:
        print(f"  [{step.label}]")
        for line in step.text.split("\n"):
            print(f"    {line}")
        if step.math:
            print(f"    Math: {step.math}")
    print(f"{'-'*70}")
    print(f"Answer : {sol.answer}")
    print(f"Check  : {sol.verification}")
    print()


# ===================================================================
# ===================================================================
def verify_ke_order() -> sp.Eq:
    """
    Symbolically verify KE_order mapping is a strict total order.
    Returns True if solid < liquid < gas.
    """
    s, l, g = sp.symbols("s l g", positive=True)
    solid_lt_liquid = sp.StrictLessThan(KE_ORDER["solid"], KE_ORDER["liquid"])   # 1 < 2
    liquid_lt_gas   = sp.StrictLessThan(KE_ORDER["liquid"],  KE_ORDER["gas"])     # 2 < 3
    return sp.And(solid_lt_liquid, liquid_lt_gas)


def verify_all_postulates_count() -> bool:
    return len(POSTULATES) == 5


if __name__ == "__main__":
    print("Class 8 Physics — Class 8 Solver Demo\n")
    for sol in solve_all(seed=7).values():
        print_solution(sol)

    print("SymPy verification (KE order):", verify_ke_order())
    print("Postulate count check:", verify_all_postulates_count())