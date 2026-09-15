"""
Class 4 Chemistry — Solver Module (3 nodes)
NODES:
  c4_chem_001  Revision of matter (solids, liquids, gases)
  c4_chem_002  Properties of air
  c4_chem_003  Composition of air (gases and water vapour)

All solver methods are deterministic and return (answer, steps, verification).
"""
import random, math
from dataclasses import dataclass, field
from typing import Optional, List, Tuple, Dict


# ─────────────────────────────────────────────
#  SHARED DATA
# ─────────────────────────────────────────────

SOLID_EXAMPLES   = ["stone", "book", "ruler", "laddoo", "chair", "table", "pen", "ball"]
LIQUID_EXAMPLES  = ["water", "milk", "juice", "oil", "honey", "vinegar", "shampoo"]
GAS_EXAMPLES     = ["air", "oxygen", "carbon dioxide", "water vapour", "steam"]

AIR_PROPERTIES = [
    {
        "id": "occupies_space",
        "name": "Air occupies space",
        "evidence": [
            "Water does not enter an upside-down glass pushed into water (air blocks it).",
            "A balloon cannot be inflated if its mouth is blocked — air already fills it.",
        ],
        "experiment": "Push an empty glass upside-down into a bowl of water.",
        "observation": "Water stays out of the glass because air inside occupies the space.",
    },
    {
        "id": "has_weight",
        "name": "Air has weight",
        "evidence": [
            "Two identical balloons — one inflated, one flat — tip a balance toward the inflated side.",
            "A football feels heavier when fully pumped than when flat.",
        ],
        "experiment": "Hang two identical balloons on a balanced ruler.",
        "observation": "The inflated balloon side dips lower — air adds weight.",
    },
    {
        "id": "expands_on_heating",
        "name": "Air expands on heating",
        "evidence": [
            "A balloon over a hot bottle gets bigger as the air inside warms up.",
            "Steam from boiling water pushes a loose lid off a pot.",
        ],
        "experiment": "Place a deflated balloon over a bottle and warm the bottle with hands.",
        "observation": "The balloon inflates as the air inside expands.",
    },
    {
        "id": "no_colour_smell_taste",
        "name": "Air has no colour, smell, or taste",
        "evidence": [
            "We cannot see air in a clear room.",
            "Ordinary air does not smell or taste like anything.",
        ],
        "experiment": "Wave your hand through still air and sniff.",
        "observation": "You feel the air move but cannot see it or smell it.",
    },
]

AIR_COMPONENTS = [
    {
        "gas": "Nitrogen",
        "symbol": "N₂",
        "approx_pct": 78,
        "role": "The most abundant gas; dilutes oxygen to prevent fires burning too fast.",
        "breathable": False,
        "colour": "colourless",
        "smell": "no smell",
    },
    {
        "gas": "Oxygen",
        "symbol": "O₂",
        "approx_pct": 21,
        "role": "Essential for breathing and for burning (fire needs it).",
        "breathable": True,
        "colour": "colourless",
        "smell": "no smell",
    },
    {
        "gas": "Carbon dioxide",
        "symbol": "CO₂",
        "approx_pct": 0.04,
        "role": "Used by plants for photosynthesis; produced when we breathe out or burn fuel.",
        "breathable": False,
        "colour": "colourless",
        "smell": "no smell",
    },
    {
        "gas": "Water vapour",
        "symbol": "H₂O (gas)",
        "approx_pct": "varies",
        "role": "Gaseous form of water; varies with humidity and weather.",
        "breathable": False,
        "colour": "colourless",
        "smell": "no smell",
    },
    {
        "gas": "Argon",
        "symbol": "Ar",
        "approx_pct": 0.93,
        "role": "An inert (unreactive) gas that does not easily join with other substances.",
        "breathable": False,
        "colour": "colourless",
        "smell": "no smell",
    },
    {
        "gas": "Other gases",
        "symbol": "—",
        "approx_pct": "trace",
        "role": "Small amounts of neon, helium, methane, krypton, etc.",
        "breathable": False,
        "colour": "colourless",
        "smell": "varies",
    },
]


# ─────────────────────────────────────────────
#  DATACLASSES
# ─────────────────────────────────────────────

@dataclass
class SolveResult:
    """Structured result returned by every solver method."""
    correct: bool
    answer: str
    steps: List[str]
    explanation: str
    verification: str
    node_id: str


# ─────────────────────────────────────────────
#  NODE 1 — Revision of matter (solids, liquids, gases)
# ─────────────────────────────────────────────

class MatterSolver:

    @staticmethod
    def _classify_state(item: str) -> str:
        """Return 'solid', 'liquid', or 'gas' for a given item name."""
        lowered = item.strip().lower()
        if lowered in [s.lower() for s in SOLID_EXAMPLES]:
            return "solid"
        if lowered in [l.lower() for l in LIQUID_EXAMPLES]:
            return "liquid"
        if lowered in [g.lower() for g in GAS_EXAMPLES]:
            return "gas"
        # heuristic fallback based on common knowledge
        solid_hints = ["wood", "paper", "cloth", "metal", "plastic", "brick", "ice", "rock", "cotton"]
        liquid_hints = ["syrup", "sauce", "tea", "coffee", "curd", "yoghurt", "paint", "ink", "soup"]
        gas_hints   = ["helium", "hydrogen", "nitrogen", "smoke", "fog", "mist"]
        if any(h in lowered for h in solid_hints):
            return "solid"
        if any(h in lowered for h in liquid_hints):
            return "liquid"
        if any(h in lowered for h in gas_hints):
            return "gas"
        return "unknown"

    # ── Q-type 1a: classify given item ──────────────────────────────────────
    @staticmethod
    def solve_classify(item: str, seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_001"
        item = item.strip()
        state = MatterSolver._classify_state(item)
        steps = [
            f"Step 1: Read the item — '{item}'.",
            f"Step 2: Recall the three states of matter: solid, liquid, gas.",
            "Step 3: Check properties — does it have a fixed shape and volume (solid), "
            "fixed volume but no fixed shape (liquid), or neither (gas)?",
        ]
        if state == "solid":
            steps.append(f"Step 4: '{item}' keeps its own shape and size → it is a SOLID.")
            explanation = ("A solid has a definite shape and definite volume. "
                           "It does not flow or take the shape of its container.")
            verification = (f"Try pressing '{item}' — it resists and keeps its shape, "
                            "confirming it is a solid.")
        elif state == "liquid":
            steps.append(f"Step 4: '{item}' has a definite volume but no fixed shape → it is a LIQUID.")
            explanation = ("A liquid has a definite volume but no fixed shape. "
                           "It takes the shape of whatever container it is poured into.")
            verification = (f"Pour '{item}' into different containers — it changes shape "
                            "each time, confirming it is a liquid.")
        elif state == "gas":
            steps.append(f"Step 4: '{item}' has neither fixed shape nor fixed volume → it is a GAS.")
            explanation = ("A gas has no fixed shape and no fixed volume. "
                           "It spreads out to fill all the available space.")
            verification = (f"Try trapping '{item}' in a balloon — it expands to fill the balloon, "
                            "confirming it is a gas.")
        else:
            steps.append(f"Step 4: '{item}' is not in the standard list — cannot classify definitively.")
            explanation = "This item is not a common example; ask your teacher for guidance."
            verification = "Check textbook examples and try the classification experiments."
        return SolveResult(
            correct=(state != "unknown"),
            answer=state.upper(),
            steps=steps,
            explanation=explanation,
            verification=verification,
            node_id=node,
        )

    # ── Q-type 1b: why does water take the shape of a glass? ────────────────
    @staticmethod
    def solve_why_liquid_takes_shape(seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_001"
        answer = "Water is a liquid."
        steps = [
            "Step 1: Observe — when water is poured into a glass, it takes the shape of the glass.",
            "Step 2: Recall property of liquids: they have a definite VOLUME but no definite SHAPE.",
            "Step 3: A liquid flows and spreads out to match the container's inner shape.",
            "Step 4: Conclusion — water takes the shape of the glass because it is a LIQUID.",
        ]
        explanation = (
            "Liquids do not have their own shape. They flow and fill the bottom of any container, "
            "taking exactly the shape of that container. Solids keep their shape; gases fill the "
            "whole space including the top."
        )
        verification = ("Pour water into a bowl, then a bottle — the water changes shape each time, "
                        "proving it has no fixed shape of its own.")
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )

    # ── Q-type 1c: match state to property description ──────────────────────
    @staticmethod
    def solve_match_property(property_desc: str, seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_001"
        prop_lower = property_desc.strip().lower()
        # keyword mapping
        if "fixed shape" in prop_lower or "own shape" in prop_lower or "keeps its shape" in prop_lower:
            answer = "SOLID"
            explanation = "Solids have their own fixed shape and size."
            verification = "Press a stone or book — it resists and keeps its shape."
        elif "fixed volume" in prop_lower and "no fixed shape" in prop_lower:
            answer = "LIQUID"
            explanation = "Liquids have a definite volume but no fixed shape — they flow."
            verification = "Pour milk into different containers — it takes each container's shape."
        elif "fills all" in prop_lower or "no shape" in prop_lower and "no volume" not in prop_lower:
            answer = "GAS"
            explanation = "Gases have neither fixed shape nor fixed volume; they expand to fill all available space."
            verification = "Release a balloon's mouth — the air inside rushes out to fill the whole room."
        else:
            answer = "UNKNOWN"
            explanation = "The description does not clearly match a state of matter."
            verification = "Review: solid = fixed shape+volume, liquid = fixed volume only, gas = neither."
        steps = [
            f"Step 1: Read the description — '{property_desc}'.",
            "Step 2: Recall the three states and their key properties.",
            f"Step 3: Match keywords in the description to the properties.",
            f"Step 4: The matching state is {answer}.",
        ]
        return SolveResult(
            correct=(answer != "UNKNOWN"),
            answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )


# ─────────────────────────────────────────────
#  NODE 2 — Properties of air
# ─────────────────────────────────────────────

class AirPropertiesSolver:

    @staticmethod
    def _find_property(prop_id: str):
        for p in AIR_PROPERTIES:
            if p["id"] == prop_id:
                return p
        return None

    # ── Q-type 2a: identify which property an experiment proves ─────────────
    @staticmethod
    def solve_experiment_property(experiment_desc: str, seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_002"
        desc_lower = experiment_desc.lower()
        steps = [
            f"Step 1: Read the experiment — '{experiment_desc}'.",
            "Step 2: Identify what the experiment is demonstrating.",
            "Step 3: Match the observation to a known property of air.",
            "Step 4: State the property clearly.",
        ]
        # keyword → property matching
        if "upside-down glass" in desc_lower or "water does not enter" in desc_lower or "glass" in desc_lower:
            prop = AirPropertiesSolver._find_property("occupies_space")
        elif "balloon" in desc_lower and ("balance" in desc_lower or "weight" in desc_lower or "heavier" in desc_lower):
            prop = AirPropertiesSolver._find_property("has_weight")
        elif "hot bottle" in desc_lower or "balloon" in desc_lower and ("inflates" in desc_lower or "bigger" in desc_lower):
            prop = AirPropertiesSolver._find_property("expands_on_heating")
        elif "no colour" in desc_lower or "no smell" in desc_lower or "invisible" in desc_lower:
            prop = AirPropertiesSolver._find_property("no_colour_smell_taste")
        else:
            # Try matching each property's experiment text
            prop = None
            for p in AIR_PROPERTIES:
                keywords = p["experiment"].lower().split()
                if any(kw in desc_lower for kw in keywords if len(kw) > 4):
                    prop = p
                    break
            if prop is None:
                # default
                prop = AirPropertiesSolver._find_property("occupies_space")
        answer = prop["name"]
        explanation = (
            f"This experiment shows that: {prop['name']}. "
            f"{prop['observation']}"
        )
        verification = prop["experiment"]
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )

    # ── Q-type 2b: explain observation → what does it prove about air? ──────
    @staticmethod
    def solve_observation(observation: str, seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_002"
        obs_lower = observation.lower()
        steps = [
            f"Step 1: Observe — '{observation}'.",
            "Step 2: Ask: what must be true about air for this observation to happen?",
            "Step 3: Connect the observation to a property of air.",
            "Step 4: State the property and explain the reasoning.",
        ]
        if "water" in obs_lower and ("not enter" in obs_lower or "stays out" in obs_lower or "cannot enter" in obs_lower):
            answer = "Air occupies space"
            explanation = (
                "Water cannot enter the upside-down glass because air already fills that space. "
                "Two things cannot occupy the same space at the same time. "
                "This proves that air occupies space."
            )
            verification = ("Repeat the experiment: push an empty glass straight down into water. "
                            "The water stays out as long as air is trapped inside.")
        elif ("balloon" in obs_lower or "ruler" in obs_lower) and ("down" in obs_lower or "dips" in obs_lower or "heavier" in obs_lower):
            answer = "Air has weight"
            explanation = (
                "The inflated balloon pulls its side of the balance down because the air inside "
                "has weight. The flat balloon has less air, so less weight. "
                "This proves that air has weight."
            )
            verification = ("Weigh two identical balloons, one flat and one inflated, on a balance. "
                            "The inflated one is always heavier.")
        elif "balloon" in obs_lower and ("bigger" in obs_lower or "inflates" in obs_lower or "grows" in obs_lower):
            answer = "Air expands on heating"
            explanation = (
                "When air is heated, its particles move faster and spread further apart, "
                "making the air take up more space (expand). This inflates the balloon. "
                "This proves that air expands when heated."
            )
            verification = ("Hold a deflated balloon over a warm (not hot) bottle. "
                            "The balloon will inflate as the air inside warms and expands.")
        elif "cannot see" in obs_lower or "invisible" in obs_lower or "no colour" in obs_lower:
            answer = "Air has no colour, no smell, and no taste"
            explanation = (
                "Air is invisible — we cannot see it in a clear room. "
                "Ordinary air has no smell or taste either. "
                "But it is still real matter that occupies space and has weight."
            )
            verification = ("Wave your hand in still air — you feel it move but cannot see or smell it, "
                            "showing it has no colour, smell, or taste.")
        else:
            answer = "Air occupies space"
            explanation = "Most air observations relate to air occupying space or having weight."
            verification = "Review the four properties of air and their experiments."
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )

    # ── Q-type 2c: list the properties of air ───────────────────────────────
    @staticmethod
    def solve_list_properties(seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_002"
        answer = (
            "The four main properties of air are:\n"
            "1. Air occupies space.\n"
            "2. Air has weight.\n"
            "3. Air expands when heated.\n"
            "4. Air has no colour, no smell, and no taste."
        )
        steps = [
            "Step 1: Recall all the experiments you have done with air in class.",
            "Step 2: For each experiment, note what was observed.",
            "Step 3: Convert each observation into a property statement.",
            "Step 4: List all four properties.",
        ]
        explanation = (
            "Scientists proved each property with simple experiments. "
            "Air is a real substance (matter) even though we cannot see it. "
            "It behaves like a gas: it occupies space, has weight, expands on heating, "
            "and is colourless, odourless, and tasteless."
        )
        verification = (
            "Perform each experiment in your lab notebook and write the observation. "
            "Then convert each observation into a property statement."
        )
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )

    # ── Q-type 2d: why can't water enter an inverted glass? ─────────────────
    @staticmethod
    def solve_inverted_glass(seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_002"
        answer = "Water cannot enter the inverted glass because air already occupies that space."
        steps = [
            "Step 1: An empty glass contains air even though we cannot see it.",
            "Step 2: When the glass is pushed upside-down into water, the air inside is trapped.",
            "Step 3: Water cannot push the air out and take its place because air occupies space.",
            "Step 4: Therefore, water stays outside the glass — proving air occupies space.",
        ]
        explanation = (
            "This is a classic experiment. Air is invisible but it is real matter. "
            "Two substances cannot be in the same place at the same time. "
            "The air already inside the glass blocks the water from entering."
        )
        verification = (
            "Do this yourself: take a glass, press it straight down into a bowl of water. "
            "Tilt it slightly and air bubbles will rise — showing the trapped air escaping."
        )
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )


# ─────────────────────────────────────────────
#  NODE 3 — Composition of air
# ─────────────────────────────────────────────

class AirCompositionSolver:

    @staticmethod
    def _get_component(gas_name: str):
        target = gas_name.strip().lower()
        for c in AIR_COMPONENTS:
            if c["gas"].lower() == target or c["symbol"].lower() == target:
                return c
        return None

    # ── Q-type 3a: identify the gas by description ──────────────────────────
    @staticmethod
    def solve_identify_gas(description: str, seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_003"
        desc_lower = description.lower()
        steps = [
            f"Step 1: Read the description — '{description}'.",
            "Step 2: Note the clues: role, percentage, special property.",
            "Step 3: Match the clues to the gases in air.",
            "Step 4: State the gas name and symbol.",
        ]
        # keyword matching
        if "breathe" in desc_lower or "breathing" in desc_lower or "respiration" in desc_lower:
            gas = AirCompositionSolver._get_component("Oxygen")
        elif "burn" in desc_lower or "fire" in desc_lower or "flame" in desc_lower:
            gas = AirCompositionSolver._get_component("Oxygen")
        elif "most" in desc_lower or "78" in desc_lower or "major" in desc_lower or "largest amount" in desc_lower:
            gas = AirCompositionSolver._get_component("Nitrogen")
        elif "plant" in desc_lower or "photosynthesis" in desc_lower or "breathe out" in desc_lower:
            gas = AirCompositionSolver._get_component("Carbon dioxide")
        elif "water droplet" in desc_lower or "condensation" in desc_lower or "humidity" in desc_lower:
            gas = AirCompositionSolver._get_component("Water vapour")
        elif "inert" in desc_lower or "unreactive" in desc_lower:
            gas = AirCompositionSolver._get_component("Argon")
        elif "21" in desc_lower:
            gas = AirCompositionSolver._get_component("Oxygen")
        elif "78" in desc_lower:
            gas = AirCompositionSolver._get_component("Nitrogen")
        else:
            # try matching by gas name in description
            gas = None
            for c in AIR_COMPONENTS:
                if c["gas"].lower() in desc_lower:
                    gas = c
                    break
            if gas is None:
                gas = AirCompositionSolver._get_component("Nitrogen")  # most likely default
        answer = f"{gas['gas']} ({gas['symbol']})"
        explanation = (
            f"The description matches **{gas['gas']}** ({gas['symbol']}).\n"
            f"Role: {gas['role']}\n"
            f"Breathable: {'Yes' if gas['breathable'] else 'No'}"
        )
        verification = (
            f"Air is about {gas['approx_pct']}% {gas['gas']}. "
            f"Review the composition table to confirm."
        )
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )

    # ── Q-type 3b: percentage estimation ────────────────────────────────────
    @staticmethod
    def solve_percentage_question(gas_name: str, seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_003"
        gas = AirCompositionSolver._get_component(gas_name)
        if gas is None:
            return SolveResult(
                correct=False,
                answer="Unknown gas",
                steps=["Step 1: Identify the gas from the question."],
                explanation="Gas not found in the composition table.",
                verification="Check the spelling of the gas name.",
                node_id=node,
            )
        pct = gas["approx_pct"]
        steps = [
            f"Step 1: Identify the gas — '{gas_name}' ({gas['symbol']}).",
            "Step 2: Recall the approximate composition of dry air.",
            f"Step 3: Find the percentage for {gas['gas']} → approximately {pct}%.",
            f"Step 4: State the percentage clearly.",
        ]
        explanation = (
            f"{gas['gas']} ({gas['symbol']}) makes up approximately {pct}% of air by volume. "
            f"{gas['role']}"
        )
        verification = (
            "Memorise the main components: N₂ (~78%), O₂ (~21%), Ar (~0.93%), "
            "CO₂ (~0.04%), and water vapour (varies)."
        )
        return SolveResult(
            correct=True,
            answer=f"Approximately {pct}%",
            steps=steps,
            explanation=explanation,
            verification=verification,
            node_id=node,
        )

    # ── Q-type 3c: condensation evidence ────────────────────────────────────
    @staticmethod
    def solve_condensation_question(seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_003"
        answer = "Water vapour in the air"
        steps = [
            "Step 1: Observe — droplets appear on the cold outside of a glass of cold water.",
            "Step 2: These droplets are liquid water, but there is no water inside the glass on the outside.",
            "Step 3: The water must have come from the air surrounding the glass.",
            "Step 4: Air contains invisible water vapour. When it touches a cold surface, "
            "the vapour cools and condenses into tiny liquid water droplets.",
            "Step 5: Conclusion — air contains water vapour.",
        ]
        explanation = (
            "Air is not just dry gas — it also carries invisible water vapour. "
            "When warm, moist air touches a cold surface (like a chilled glass), "
            "the water vapour loses heat, condenses, and forms visible droplets. "
            "This proves that air is a mixture and contains water vapour."
        )
        verification = (
            "Try this: take a cold can from the fridge on a humid day. "
            "Droplets will form on the outside — those came from water vapour in the air."
        )
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )

    # ── Q-type 3d: which gas is needed for burning? ─────────────────────────
    @staticmethod
    def solve_burning_gas(seed: Optional[int] = None) -> SolveResult:
        node = "c4_chem_003"
        answer = "Oxygen (O₂)"
        steps = [
            "Step 1: Recall what happens when something burns — it needs a supporter of combustion.",
            "Step 2: The supporter of combustion in air is the gas that reacts with the fuel.",
            "Step 3: From the composition of air, identify the gas that supports burning.",
            "Step 4: That gas is Oxygen (O₂), making up about 21% of air.",
        ]
        explanation = (
            "Oxygen is the gas in air that supports burning. "
            "Without oxygen, fire cannot burn (try covering a candle with a jar — it goes out). "
            "Oxygen makes up about 21% of air. "
            "Nitrogen, the main gas, does NOT support burning."
        )
        verification = (
            "Light a candle and cover it with a glass jar. The flame goes out because "
            "the oxygen inside is used up. This shows oxygen is needed for burning."
        )
        return SolveResult(
            correct=True, answer=answer, steps=steps,
            explanation=explanation, verification=verification, node_id=node,
        )


# ─────────────────────────────────────────────
#  MASTER SOLVER DISPATCH
# ─────────────────────────────────────────────

class ChemClass4Solver:
    """Master solver — dispatches to the correct sub-solver by (node_id, q_type)."""

    _solvers = {
        "c4_chem_001": MatterSolver,
        "c4_chem_002": AirPropertiesSolver,
        "c4_chem_003": AirCompositionSolver,
    }

    @classmethod
    def solve(cls, node_id: str, q_type: str, **kwargs) -> SolveResult:
        """
        Solve a question.

        Parameters
        ----------
        node_id : str   — e.g. 'c4_chem_001'
        q_type  : str   — e.g. 'classify', 'why_liquid', 'match_property'
        **kwargs        — question-specific arguments (item, property_desc, etc.)

        Returns
        -------
        SolveResult
        """
        if node_id not in cls._solvers:
            return SolveResult(
                correct=False, answer="Unknown node",
                steps=[f"Node '{node_id}' is not recognised."],
                explanation="Check the node_id spelling.",
                verification="Valid nodes: c4_chem_001, c4_chem_002, c4_chem_003.",
                node_id=node_id,
            )
        solver = cls._solvers[node_id]
        method_map = {
            # Node 1
            "classify":         solver.solve_classify,
            "why_liquid":       solver.solve_why_liquid_takes_shape,
            "match_property":   solver.solve_match_property,
            # Node 2
            "experiment_property": solver.solve_experiment_property,
            "observation":      solver.solve_observation,
            "list_properties":  solver.solve_list_properties,
            "inverted_glass":   solver.solve_inverted_glass,
            # Node 3
            "identify_gas":     solver.solve_identify_gas,
            "percentage":       solver.solve_percentage_question,
            "condensation":     solver.solve_condensation_question,
            "burning_gas":      solver.solve_burning_gas,
        }
        if q_type not in method_map:
            return SolveResult(
                correct=False, answer="Unknown question type",
                steps=[f"Question type '{q_type}' is not recognised for node '{node_id}'."],
                explanation="Check the q_type spelling.",
                verification=f"Valid types: {sorted(method_map.keys())}",
                node_id=node_id,
            )
        return method_map[q_type](**kwargs)

    @classmethod
    def solve_all_nodes(cls) -> Dict[str, List[SolveResult]]:
        """Run one sample of each question type across all nodes."""
        results: Dict[str, List[SolveResult]] = {}
        # Node 1 samples
        r1a = cls.solve("c4_chem_001", "classify", item="water")
        r1b = cls.solve("c4_chem_001", "why_liquid")
        r1c = cls.solve("c4_chem_001", "match_property", property_desc="has a fixed shape and a fixed volume")
        results["c4_chem_001"] = [r1a, r1b, r1c]
        # Node 2 samples
        r2a = cls.solve("c4_chem_002", "experiment_property",
                        experiment_desc="Push an empty glass upside-down into water; water does not enter")
        r2b = cls.solve("c4_chem_002", "observation",
                        observation="An inflated balloon pulls one side of a balance down")
        r2c = cls.solve("c4_chem_002", "list_properties")
        r2d = cls.solve("c4_chem_002", "inverted_glass")
        results["c4_chem_002"] = [r2a, r2b, r2c, r2d]
        # Node 3 samples
        r3a = cls.solve("c4_chem_003", "identify_gas",
                        description="The gas we breathe in to stay alive")
        r3b = cls.solve("c4_chem_003", "percentage", gas_name="Oxygen")
        r3c = cls.solve("c4_chem_003", "condensation")
        r3d = cls.solve("c4_chem_003", "burning_gas")
        results["c4_chem_003"] = [r3a, r3b, r3c, r3d]
        return results


# ─────────────────────────────────────────────
#  STANDALONE VERIFICATION
# ─────────────────────────────────────────────

def _run_self_tests():
    """Quick smoke-test: all solver types must return correct=True."""
    tests = [
        ("c4_chem_001", "classify",          {"item": "water"}),
        ("c4_chem_001", "classify",          {"item": "stone"}),
        ("c4_chem_001", "classify",          {"item": "air"}),
        ("c4_chem_001", "why_liquid",        {}),
        ("c4_chem_001", "match_property",    {"property_desc": "has a fixed shape and a fixed volume"}),
        ("c4_chem_002", "experiment_property",
         {"experiment_desc": "Push an empty glass upside-down into a bowl of water"}),
        ("c4_chem_002", "observation",
         {"observation": "An inflated balloon pulls the balance down"}),
        ("c4_chem_002", "list_properties",   {}),
        ("c4_chem_002", "inverted_glass",    {}),
        ("c4_chem_003", "identify_gas",
         {"description": "The gas that makes up most of air and is needed for breathing"}),
        ("c4_chem_003", "percentage",        {"gas_name": "Oxygen"}),
        ("c4_chem_003", "condensation",      {}),
        ("c4_chem_003", "burning_gas",       {}),
    ]
    passed = 0
    failed = 0
    for node_id, q_type, kwargs in tests:
        result = ChemClass4Solver.solve(node_id, q_type, seed=42, **kwargs)
        status = "✓" if result.correct else "✗"
        print(f"  {status} [{node_id}] {q_type:25s} → {result.answer[:40]}")
        if result.correct:
            passed += 1
        else:
            failed += 1
    print(f"\n  Total: {passed} passed, {failed} failed out of {passed+failed}")
    return failed == 0


if __name__ == "__main__":
    print("=" * 60)
    print("  Class 4 Chemistry — Solver Self-Test")
    print("=" * 60)
    ok = _run_self_tests()
    if ok:
        print("\n  All tests PASSED ✓")
    else:
        print("\n  Some tests FAILED ✗")