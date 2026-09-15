"""
Class 7 Chemistry Solver
Nodes: c7_chem_001, c7_chem_002, c7_chem_003
Topics: Matter Classification, Kinetic Theory, Physical Changes
"""

import math
import random
from dataclasses import dataclass, field
from typing import Optional, Tuple, List, Dict


# ─── Data Models ──────────────────────────────────────────────────────────────

@dataclass
class MatterResult:
    category: str
    sub_category: str
    explanation: str
    confidence: float


@dataclass
class StateResult:
    state: str
    particle_arrangement: str
    particle_motion: str
    compressibility: str
    fixed_shape: bool
    fixed_volume: bool


@dataclass
class KineticEnergyResult:
    ke_ratio: float
    explanation: str
    implied_state_change: str


@dataclass
class PhysicalChangeResult:
    is_physical: bool
    is_reversible: Optional[bool]
    change_type: str
    explanation: str
    examples: List[str]
    new_substance_formed: bool


@dataclass
class ChangeOfStateResult:
    initial_state: str
    final_state: str
    process_name: str
    heat_direction: str
    particle_behavior: str


@dataclass
class VerificationResult:
    is_correct: bool
    expected: str
    given: str
    feedback: str


# ─────────────────────────────────────────────────────────────────────────────
# NODE c7_chem_001 : Matter – Classification Revisited
# ─────────────────────────────────────────────────────────────────────────────

# Static knowledge base for classification
_ELEMENTS = {
    "hydrogen", "oxygen", "nitrogen", "carbon", "iron", "copper", "gold",
    "silver", "aluminium", "sodium", "potassium", "calcium", "zinc",
    "helium", "neon", "argon", "chlorine", "sulphur", "phosphorus",
    "magnesium", "lead", "tin", "mercury"
}

_COMPOUNDS = {
    "water": ("hydrogen", "oxygen"),
    "carbon dioxide": ("carbon", "oxygen"),
    "salt": ("sodium", "chlorine"),
    "sugar": ("carbon", "hydrogen", "oxygen"),
    "methane": ("carbon", "hydrogen"),
    "ammonia": ("nitrogen", "hydrogen"),
    "hydrochloric acid": ("hydrogen", "chlorine"),
    "calcium carbonate": ("calcium", "carbon", "oxygen"),
    "rust": ("iron", "oxygen"),
    "marble": ("calcium", "carbon", "oxygen"),
}

_MIXTURES = {
    "air": ("nitrogen", "oxygen", "carbon dioxide", "argon"),
    "sea water": ("water", "salt"),
    "brass": ("copper", "zinc"),
    "bronze": ("copper", "tin"),
    "milk": ("water", "fat", "proteins"),
    "soil": ("sand", "clay", "humus"),
    "salt water": ("salt", "water"),
    "sugar water": ("sugar", "water"),
    "sand and iron filings": ("sand", "iron"),
    "ink": ("water", "dye"),
}

# Physical states lookup by substance name
_STATES = {
    "water": "liquid",
    "ice": "solid",
    "steam": "gas",
    "water vapour": "gas",
    "oxygen": "gas",
    "carbon dioxide": "gas",
    "iron": "solid",
    "gold": "solid",
    "copper": "solid",
    "mercury": "liquid",
    "aluminium": "solid",
    "salt": "solid",
    "sugar": "solid",
    "diamond": "solid",
    "wood": "solid",
    "air": "gas",
    "hydrogen": "gas",
    "nitrogen": "gas",
    "petrol": "liquid",
    "milk": "liquid",
    "blood": "liquid",
    "kerosene": "liquid",
    "stone": "solid",
    "chalk": "solid",
    "paper": "solid",
}


def classify_matter(substance: str) -> MatterResult:
    """
    Classify a given substance into: element / compound / mixture / pure substance.
    Determines category based on known knowledge base.
    """
    s = substance.strip().lower()

    # Check elements
    if s in _ELEMENTS:
        return MatterResult(
            category="Pure Substance",
            sub_category="Element",
            explanation=(
                f"'{substance}' is an ELEMENT. "
                "It consists of only one type of atom and cannot be broken down "
                "into simpler substances by chemical means. "
                "Elements are the building blocks of all matter."
            ),
            confidence=1.0
        )

    # Check compounds
    if s in _COMPOUNDS:
        components = _COMPOUNDS[s]
        return MatterResult(
            category="Pure Substance",
            sub_category="Compound",
            explanation=(
                f"'{substance}' is a COMPOUND. "
                f"It is made of two or more elements chemically combined in a "
                f"fixed ratio ({', '.join(components)}). "
                "A compound has properties different from its constituent elements "
                "and can only be separated by chemical reactions."
            ),
            confidence=1.0
        )

    # Check mixtures
    if s in _MIXTURES:
        components = _MIXTURES[s]
        return MatterResult(
            category="Mixture",
            sub_category="Heterogeneous" if len(components) > 2 else "Homogeneous",
            explanation=(
                f"'{substance}' is a MIXTURE. "
                f"It contains {' and '.join(components)} physically combined "
                "in varying proportions. "
                "The components retain their individual properties and can be "
                "separated by physical methods (filtration, evaporation, etc.)."
            ),
            confidence=1.0
        )

    # Fallback heuristic classification
    return _heuristic_classify(s, substance)


def _heuristic_classify(s: str, original: str) -> MatterResult:
    """Heuristic classification for unknown substances."""
    # Gases are likely elements or compounds
    gas_suffixes = ["-gen", "gas", "oxide"]
    mixture_indicators = ["solution", "mixture", "alloy", "blend", "mix"]

    for ind in mixture_indicators:
        if ind in s:
            return MatterResult(
                category="Mixture",
                sub_category="Unknown type",
                explanation=(
                    f"'{original}' appears to be a MIXTURE based on its name. "
                    "Mixtures contain two or more substances physically combined. "
                    "Components can be separated by physical methods."
                ),
                confidence=0.6
            )

    # Single word, short name → likely element
    words = s.split()
    if len(words) == 1 and len(s) <= 10:
        return MatterResult(
            category="Pure Substance",
            sub_category="Likely Element",
            explanation=(
                f"'{original}' is likely an ELEMENT. "
                "Elements consist of only one type of atom and cannot be "
                "chemically broken down. Examples: Iron (Fe), Oxygen (O₂)."
            ),
            confidence=0.5
        )

    return MatterResult(
        category="Unknown",
        sub_category="Needs verification",
        explanation=(
            f"'{original}' could not be automatically classified. "
            "Please check: Does it contain only one type of atom (element)? "
            "Are different atoms chemically combined in fixed ratios (compound)? "
            "Or are substances just physically mixed (mixture)?"
        ),
        confidence=0.0
    )


def get_physical_state(substance: str, temperature_c: float) -> Tuple[str, str]:
    """
    Return (state, explanation) for a substance at a given temperature.
    Uses known melting/boiling points as reference.
    """
    s = substance.strip().lower()
    t = temperature_c

    # Reference data: (melting_point_C, boiling_point_C)
    melting_boiling = {
        "water": (0, 100),
        "ice": (-1, 100),
        "oxygen": (-218, -183),
        "carbon dioxide": (-78, -57),
        "iron": (1538, 2862),
        "gold": (1064, 2856),
        "copper": (1085, 2562),
        "mercury": (-39, 357),
        "aluminium": (660, 2519),
        "salt": (801, 1413),
        "sugar": (186, None),
        "hydrogen": (-259, -253),
        "nitrogen": (-210, -196),
    }

    if s in melting_boiling:
        mp, bp = melting_boiling[s]
        if t < mp:
            state = "Solid"
            expl = f"Temperature ({t}°C) is below melting point ({mp}°C). Particles are tightly packed."
        elif bp is not None and t >= bp:
            state = "Gas"
            expl = f"Temperature ({t}°C) is at or above boiling point ({bp}°C). Particles move freely."
        else:
            state = "Liquid"
            expl = f"Temperature ({t}°C) is between melting point ({mp}°C) and boiling point ({bp if bp else 'very high'}°C)."
        return state, expl

    return "Unknown", "No reference data available for this substance."


def compare_states(state_a: str, state_b: str) -> Dict[str, any]:
    """
    Compare two states of matter across properties:
    particle spacing, particle motion, compressibility, fixed shape, fixed volume.
    """
    properties = {
        "solid": {
            "spacing": "Very close — tightly packed in fixed positions",
            "motion": "Vibrate in fixed positions only",
            "compressibility": "Almost incompressible",
            "fixed_shape": True,
            "fixed_volume": True,
            "flow": "Does not flow"
        },
        "liquid": {
            "spacing": "Close but not fixed — can slide past each other",
            "motion": "Move freely, slide and flow over each other",
            "compressibility": "Slightly compressible",
            "fixed_shape": False,
            "fixed_volume": True,
            "flow": "Flows to take shape of container"
        },
        "gas": {
            "spacing": "Far apart — fill the entire container",
            "motion": "Move rapidly in all directions",
            "compressibility": "Highly compressible",
            "fixed_shape": False,
            "fixed_volume": False,
            "flow": "Expands to fill container completely"
        }
    }

    a = state_a.strip().lower()
    b = state_b.strip().lower()

    if a not in properties or b not in properties:
        return {"error": "Invalid state. Use: solid, liquid, or gas."}

    result = {
        state_a: properties[a],
        state_b: properties[b],
        "key_differences": []
    }

    if properties[a]["spacing"] != properties[b]["spacing"]:
        result["key_differences"].append("Particle spacing")
    if properties[a]["motion"] != properties[b]["motion"]:
        result["key_differences"].append("Particle motion type")
    if properties[a]["fixed_shape"] != properties[b]["fixed_shape"]:
        result["key_differences"].append("Fixed shape")
    if properties[a]["fixed_volume"] != properties[b]["fixed_volume"]:
        result["key_differences"].append("Fixed volume")

    return result


# ─────────────────────────────────────────────────────────────────────────────
# NODE c7_chem_002 : Kinetic Theory of Matter
# ─────────────────────────────────────────────────────────────────────────────

def particle_arrangement(state: str) -> StateResult:
    """Return detailed particle arrangement for a given state of matter."""
    s = state.strip().lower()

    if s == "solid":
        return StateResult(
            state="Solid",
            particle_arrangement=(
                "Particles are packed very close together in a regular, "
                "ordered pattern (lattice structure). They vibrate about "
                "fixed positions but cannot change places."
            ),
            particle_motion=(
                "Particles vibrate rapidly around fixed positions. "
                "Vibration amplitude increases with temperature."
            ),
            compressibility="Very low — particles are already in contact",
            fixed_shape=True,
            fixed_volume=True
        )
    elif s == "liquid":
        return StateResult(
            state="Liquid",
            particle_arrangement=(
                "Particles are close together but not in fixed positions. "
                "They can slide and flow past one another. "
                "Short-range order exists but no long-range pattern."
            ),
            particle_motion=(
                "Particles move freely, sliding and flowing over each other. "
                "They have more kinetic energy than in a solid."
            ),
            compressibility="Low but slightly higher than solids",
            fixed_shape=False,
            fixed_volume=True
        )
    elif s == "gas":
        return StateResult(
            state="Gas",
            particle_arrangement=(
                "Particles are far apart with almost no forces between them. "
                "They move independently and fill the entire container."
            ),
            particle_motion=(
                "Particles move very rapidly in all directions, "
                "colliding with each other and container walls. "
                "Speed increases greatly with temperature."
            ),
            compressibility="Very high — particles have large empty spaces",
            fixed_shape=False,
            fixed_volume=False
        )
    else:
        raise ValueError(f"Invalid state '{state}'. Use: solid, liquid, or gas.")


def kinetic_energy_ratio(temp1_c: float, temp2_c: float) -> KineticEnergyResult:
    """
    Calculate the ratio of average kinetic energy at two temperatures.
    Uses absolute (Kelvin) temperatures. KE_avg ∝ T(K).
    """
    t1_k = temp1_c + 273.15
    t2_k = temp2_c + 273.15

    if t1_k <= 0:
        raise ValueError(f"Temperature {temp1_c}°C is below absolute zero (invalid).")
    if t2_k <= 0:
        raise ValueError(f"Temperature {temp2_c}°C is below absolute zero (invalid).")

    ratio = t2_k / t1_k

    # Determine implied state change
    if temp2_c > temp1_c:
        direction = "heating"
        if temp1_c < 0 and temp2_c >= 0:
            change = "Melting (solid → liquid)"
        elif temp1_c < 100 and temp2_c >= 100:
            change = "Boiling/Evaporation (liquid → gas)"
        else:
            change = "Particles gain kinetic energy (temperature rises within same state)"
    elif temp2_c < temp1_c:
        direction = "cooling"
        if temp1_c >= 100 and temp2_c < 100:
            change = "Condensation (gas → liquid)"
        elif temp1_c >= 0 and temp2_c < 0:
            change = "Freezing (liquid → solid)"
        else:
            change = "Particles lose kinetic energy (temperature falls within same state)"
    else:
        direction = "no change"
        change = "Temperature is the same — average KE is unchanged"

    return KineticEnergyResult(
        ke_ratio=round(ratio, 4),
        explanation=(
            f"Average kinetic energy is proportional to absolute temperature (T in Kelvin).\n"
            f"  T₁ = {temp1_c}°C = {t1_k:.2f} K\n"
            f"  T₂ = {temp2_c}°C = {t2_k:.2f} K\n"
            f"  KE₂ / KE₁ = T₂ / T₁ = {t2_k:.2f} / {t1_k:.2f} = {ratio:.4f}\n"
            f"  → At {temp2_c}°C, average KE is {ratio:.2f}× the value at {temp1_c}°C.\n"
            f"  Direction: {direction}. {change}."
        ),
        implied_state_change=change
    )


def diffusion_comparison(state_a: str, state_b: str) -> Dict:
    """
    Compare diffusion rates between two states.
    Diffusion is fastest in gases, slower in liquids, slowest in solids.
    """
    rates = {"solid": 1, "liquid": 10, "gas": 1000}
    s_a = state_a.strip().lower()
    s_b = state_b.strip().lower()

    if s_a not in rates or s_b not in rates:
        return {"error": "Use solid, liquid, or gas."}

    rel = rates[s_b] - rates[s_a]

    return {
        "state_a": state_a,
        "state_b": state_b,
        "relative_rate_a": rates[s_a],
        "relative_rate_b": rates[s_b],
        "diffusion_faster_in": state_b if rel > 0 else (state_a if rel < 0 else "both equally"),
        "explanation": (
            f"Diffusion in {state_b}s is much faster than in {state_a}s "
            f"because particles in {state_b}s are farther apart and move more freely. "
            f"In solids, particles are locked in place and diffusion is extremely slow."
        )
    }


def heating_effect_on_particles(temp_celsius: float) -> Dict:
    """
    Describe the effect of heating on particle behavior at a given temperature.
    """
    t = temp_celsius

    if t < -273.15:
        return {"error": "Temperature below absolute zero is physically impossible."}

    if t <= 0:
        motion_desc = "Particles vibrate with low energy. Solid state."
        energy_desc = "Low kinetic energy — particles are nearly stationary except for vibration."
    elif t <= 25:
        motion_desc = "Particles vibrate more vigorously; if solid, approaching melting."
        energy_desc = "Moderate kinetic energy — increasing particle movement."
    elif t <= 100:
        motion_desc = "Particles move freely (if liquid) or vibrate intensely (if solid)."
        energy_desc = "High kinetic energy — particles move rapidly."
    else:
        motion_desc = "Particles move extremely rapidly, may escape as gas if liquid."
        energy_desc = "Very high kinetic energy — particles are highly energetic."

    return {
        "temperature_c": t,
        "temperature_k": round(t + 273.15, 2),
        "particle_motion": motion_desc,
        "kinetic_energy": energy_desc,
        "note": "Higher temperature → greater average kinetic energy of particles."
    }


# ─────────────────────────────────────────────────────────────────────────────
# NODE c7_chem_003 : Physical Changes – Reversible & Irreversible
# ─────────────────────────────────────────────────────────────────────────────

# Known physical changes database
_REVERSIBLE_PHYSICAL = {
    "melting of ice": {
        "reverse": "freezing of water",
        "condition": "lower temperature (below 0°C)",
        "new_substance": False,
        "particle_change": "Particles gain energy and move farther apart; no chemical change"
    },
    "freezing of water": {
        "reverse": "melting of ice",
        "condition": "higher temperature (above 0°C)",
        "new_substance": False,
        "particle_change": "Particles lose energy and come closer in fixed positions"
    },
    "evaporation of water": {
        "reverse": "condensation of water vapour",
        "condition": "cooling / higher pressure",
        "new_substance": False,
        "particle_change": "Particles gain enough energy to escape the liquid surface"
    },
    "condensation of water vapour": {
        "reverse": "evaporation of water",
        "condition": "cooling / loss of heat energy",
        "new_substance": False,
        "particle_change": "Particles lose energy and come together to form liquid"
    },
    "dissolving sugar in water": {
        "reverse": "evaporating the water",
        "condition": "heating / evaporation",
        "new_substance": False,
        "particle_change": "Sugar particles separate and spread between water molecules"
    },
    "magnetising iron": {
        "reverse": "heating / hammering",
        "condition": "demagnetisation",
        "new_substance": False,
        "particle_change": "Alignment of magnetic domains is changed"
    },
    "stretching a spring": {
        "reverse": "releasing the spring",
        "condition": "removing the applied force",
        "new_substance": False,
        "particle_change": "Interatomic distances are temporarily increased"
    },
    "inflating a balloon": {
        "reverse": "releasing air",
        "condition": "releasing the opening",
        "new_substance": False,
        "particle_change": "Gas particles are compressed inside the balloon"
    },
    "boiling of water": {
        "reverse": "condensation",
        "condition": "cooling below 100°C",
        "new_substance": False,
        "particle_change": "Particles gain enough energy to break free from liquid"
    },
}

_IRREVERSIBLE_PHYSICAL = {
    "cutting of paper": {
        "reason": "The paper cannot be perfectly rejoined; bonds are permanently broken",
        "new_substance": False,
        "particle_change": "Fibres are torn apart; chemical bonds within cellulose are broken"
    },
    "breaking of glass": {
        "reason": "The pieces cannot be rejoined into the original shape",
        "new_substance": False,
        "particle_change": "The regular lattice structure is permanently disrupted"
    },
    "tearing of cloth": {
        "reason": "The fabric fibres are permanently separated",
        "new_substance": False,
        "particle_change": "Physical fibre bonds are broken, cannot be restored"
    },
    "crushing a can": {
        "reason": "The original shape cannot be restored",
        "new_substance": False,
        "particle_change": "Metal structure is deformed permanently"
    },
    "baking a clay pot": {
        "reason": "The hardened clay cannot be returned to soft clay",
        "new_substance": False,
        "particle_change": "Water is driven out and clay particles fuse permanently"
    },
    "grinding grain into flour": {
        "reason": "Cannot recombine flour into whole grains",
        "new_substance": False,
        "particle_change": "Grain structure is mechanically destroyed"
    },
}

_CHEMICAL_CHANGES = {
    "burning of paper": {
        "new_substance": True,
        "products": "ash, carbon dioxide, water vapour",
        "reversible": False,
        "reason": "Chemical bonds are broken; new substances are formed"
    },
    "rusting of iron": {
        "new_substance": True,
        "products": "hydrated iron(III) oxide (rust)",
        "reversible": False,
        "reason": "Iron chemically combines with oxygen and water"
    },
    "cooking food": {
        "new_substance": True,
        "products": "cooked food (different chemical composition)",
        "reversible": False,
        "reason": "Heat causes chemical reactions changing molecular structure"
    },
    "digestion of food": {
        "new_substance": True,
        "products": "simpler molecules (amino acids, glucose, etc.)",
        "reversible": False,
        "reason": "Enzymes break complex molecules into simpler ones chemically"
    },
    "souring of milk": {
        "new_substance": True,
        "products": "lactic acid, curd",
        "reversible": False,
        "reason": "Bacteria convert lactose into lactic acid"
    },
    "explosion of firecracker": {
        "new_substance": True,
        "products": "smoke, gases, ash",
        "reversible": False,
        "reason": "Rapid chemical reaction produces entirely new substances"
    },
    "growth of a tree": {
        "new_substance": True,
        "products": "new plant tissue",
        "reversible": False,
        "reason": "Photosynthesis and cell division create new matter"
    },
}


def analyze_change(change_name: str) -> PhysicalChangeResult:
    """
    Analyze a given change: is it physical? Is it reversible?
    Is it chemical? Returns full classification with explanation.
    """
    s = change_name.strip().lower()

    # Check reversible physical
    for key, data in _REVERSIBLE_PHYSICAL.items():
        if s in key or key in s:
            return PhysicalChangeResult(
                is_physical=True,
                is_reversible=True,
                change_type="Reversible Physical Change",
                explanation=(
                    f"'{change_name}' is a REVERSIBLE PHYSICAL CHANGE.\n"
                    f"  • No new substance is formed.\n"
                    f"  • Original substance can be recovered by: {data['reverse']} "
                    f"(condition: {data['condition']}).\n"
                    f"  • Particle change: {data['particle_change']}\n"
                    f"  • Only physical arrangement/packing of particles changes."
                ),
                examples=[key, data["reverse"]],
                new_substance_formed=False
            )

    # Check irreversible physical
    for key, data in _IRREVERSIBLE_PHYSICAL.items():
        if s in key or key in s:
            return PhysicalChangeResult(
                is_physical=True,
                is_reversible=False,
                change_type="Irreversible Physical Change",
                explanation=(
                    f"'{change_name}' is an IRREVERSIBLE PHYSICAL CHANGE.\n"
                    f"  • No new chemical substance is formed (same material remains).\n"
                    f"  • Cannot be reversed because: {data['reason']}\n"
                    f"  • Particle change: {data['particle_change']}"
                ),
                examples=[key],
                new_substance_formed=False
            )

    # Check chemical changes
    for key, data in _CHEMICAL_CHANGES.items():
        if s in key or key in s:
            return PhysicalChangeResult(
                is_physical=False,
                is_reversible=False,
                change_type="Chemical Change",
                explanation=(
                    f"'{change_name}' is a CHEMICAL CHANGE (NOT physical).\n"
                    f"  • A new substance IS formed: {data['products']}.\n"
                    f"  • Cannot be reversed because: {data['reason']}\n"
                    f"  • Chemical bonds are broken and new ones are formed.\n"
                    f"  • This is fundamentally different from a physical change."
                ),
                examples=[key],
                new_substance_formed=True
            )

    # Fallback heuristic
    return _heuristic_change_analysis(s, change_name)


def _heuristic_change_analysis(s: str, original: str) -> PhysicalChangeResult:
    """Heuristic analysis for unlisted changes."""
    # Physical indicators
    physical_keywords = ["melt", "freeze", "evaporat", "condens", "dissolv",
                         "magnet", "stretch", "compress", "inflate", "deflat",
                         "sublim", "deposit", "cut", "break", "tear", "crush",
                         "grind", "fold", "bend", "boil", "sublime"]
    # Chemical indicators
    chemical_keywords = ["burn", "rot", "rust", "cook", "digest", "sour",
                         "explode", "react", "decompose", "ferment", "decay",
                         "photosynthes"]

    is_physical = any(kw in s for kw in physical_keywords)
    is_chemical = any(kw in s for kw in chemical_keywords)

    if is_chemical and not is_physical:
        return PhysicalChangeResult(
            is_physical=False,
            is_reversible=False,
            change_type="Likely Chemical Change",
            explanation=(
                f"'{original}' is likely a CHEMICAL CHANGE.\n"
                "  • Chemical keywords detected in the description.\n"
                "  • Chemical changes produce new substances that cannot be "
                "easily separated back into the original materials."
            ),
            examples=["burning", "rusting", "cooking"],
            new_substance_formed=True
        )

    if is_physical:
        # Determine reversibility heuristically
        irreversible_hints = ["cut", "break", "tear", "crush", "grind", "bake"]
        is_rev = not any(h in s for h in irreversible_hints)
        ctype = "Reversible" if is_rev else "Irreversible"

        return PhysicalChangeResult(
            is_physical=True,
            is_reversible=is_rev,
            change_type=f"{ctype} Physical Change",
            explanation=(
                f"'{original}' appears to be a PHYSICAL CHANGE.\n"
                f"  • Physical keywords detected.\n"
                f"  • Type: {ctype} physical change.\n"
                f"  • No new substance is formed — only arrangement or state changes."
            ),
            examples=["melting", "freezing", "dissolving"],
            new_substance_formed=False
        )

    return PhysicalChangeResult(
        is_physical=None,
        is_reversible=None,
        change_type="Unknown",
        explanation=(
            f"Unable to classify '{original}' automatically. "
            "Consider: Does it produce a new substance? "
            "Can it be reversed by physical means?"
        ),
        examples=[],
        new_substance_formed=None
    )


def identify_change_of_state(initial: str, final: str) -> ChangeOfStateResult:
    """
    Identify the process name and direction of heat flow for a state change.
    """
    transitions = {
        ("solid", "liquid"): ("Melting", "absorbed", "Heat is absorbed to break the ordered structure"),
        ("liquid", "solid"): ("Freezing / Solidification", "released", "Heat is released as particles form a fixed structure"),
        ("liquid", "gas"): ("Boiling / Vaporisation", "absorbed", "Heat is absorbed to overcome all intermolecular forces"),
        ("gas", "liquid"): ("Condensation", "released", "Heat is released as particles come closer together"),
        ("solid", "gas"): ("Sublimation", "absorbed", "Particles go directly from fixed to free state"),
        ("gas", "solid"): ("Deposition / Desublimation", "released", "Particles go directly from free to fixed state"),
    }

    a = initial.strip().lower()
    b = final.strip().lower()

    key = (a, b)
    if key in transitions:
        name, heat_dir, particle_desc = transitions[key]
        return ChangeOfStateResult(
            initial_state=initial,
            final_state=final,
            process_name=name,
            heat_direction=heat_dir,
            particle_behavior=particle_desc
        )

    raise ValueError(
        f"Invalid or unsupported transition: '{initial}' → '{final}'. "
        "Valid: solid↔liquid, liquid↔gas, solid↔gas"
    )


def verify_change_classification(change_name: str,
                                  expected_type: str,
                                  expected_reversible: Optional[bool] = None) -> VerificationResult:
    """
    Verify whether a classification answer is correct.
    expected_type: "physical_reversible", "physical_irreversible", "chemical"
    """
    result = analyze_change(change_name)

    type_map = {
        "physical_reversible": "Reversible Physical Change",
        "physical_irreversible": "Irreversible Physical Change",
        "chemical": "Chemical Change"
    }
    expected_label = type_map.get(expected_type, expected_type)
    given_label = result.change_type

    is_type_correct = (expected_label.lower() in given_label.lower() or
                       given_label.lower() in expected_label.lower())
    is_rev_correct = True
    if expected_reversible is not None and result.is_reversible is not None:
        is_rev_correct = (result.is_reversible == expected_reversible)

    is_correct = is_type_correct and is_rev_correct

    feedback_parts = []
    if is_correct:
        feedback_parts.append(f"✓ Correct! '{change_name}' is indeed a {result.change_type}.")
    else:
        feedback_parts.append(f"✗ Incorrect classification for '{change_name}'.")
        feedback_parts.append(f"  Expected: {expected_label}")
        feedback_parts.append(f"  Actual:   {result.change_type}")
        if not is_type_correct:
            feedback_parts.append("  Tip: Check whether a new substance is formed.")
        if not is_rev_correct:
            feedback_parts.append("  Tip: Think about whether the original substance can be fully recovered.")

    return VerificationResult(
        is_correct=is_correct,
        expected=expected_label,
        given=given_label,
        feedback="\n".join(feedback_parts)
    )


# ─────────────────────────────────────────────────────────────────────────────
# Integrated / Combined Solvers
# ─────────────────────────────────────────────────────────────────────────────

def solve_state_change_question(initial_state: str,
                                 change_process: str,
                                 final_state: str = None) -> Dict:
    """
    Solve a complete state-change problem:
    - Identify the change of state
    - Determine heat absorbed/released
    - Describe particle behavior change
    """
    try:
        result = identify_change_of_state(initial_state, change_process if final_state is None else final_state)
    except ValueError as e:
        # Try the other parameter ordering
        try:
            result = identify_change_of_state(change_process, final_state) if final_state else None
        except:
            return {"error": str(e)}

    arr_initial = particle_arrangement(initial_state)
    arr_final = particle_arrangement(result.final_state)

    return {
        "process": result.process_name,
        "from_state": initial_state,
        "to_state": result.final_state,
        "heat_flow": result.heat_direction,
        "particle_behavior": result.particle_behavior,
        "initial_particles": arr_initial.particle_arrangement,
        "final_particles": arr_final.particle_arrangement,
        "initial_motion": arr_initial.particle_motion,
        "final_motion": arr_final.particle_motion,
    }


def comprehensive_change_analysis(change_description: str) -> Dict:
    """
    Full analysis combining physical/chemical, reversible/irreversible,
    and particle-level explanation.
    """
    pc_result = analyze_change(change_description)

    output = {
        "change": change_description,
        "classification": pc_result.change_type,
        "is_physical": pc_result.is_physical,
        "is_reversible": pc_result.is_reversible,
        "new_substance": pc_result.new_substance_formed,
        "explanation": pc_result.explanation,
        "examples": pc_result.examples,
    }

    # Add particle-level detail if physical
    if pc_result.is_physical:
        output["particle_note"] = (
            "In a physical change, only the physical arrangement, state, "
            "or size of particles changes. Chemical composition remains identical. "
            "The same type and number of atoms are present before and after."
        )
    else:
        output["particle_note"] = (
            "In a chemical change, atoms are rearranged into new combinations. "
            "Old chemical bonds break and new ones form, creating different substances."
        )

    return output


# ─────────────────────────────────────────────────────────────────────────────
# Temperature & Energy Calculations
# ─────────────────────────────────────────────────────────────────────────────

def celsius_to_kelvin(celsius: float) -> float:
    """Convert Celsius to Kelvin. 0 K = -273.15°C (absolute zero)."""
    return round(celsius + 273.15, 2)


def kelvin_to_celsius(kelvin: float) -> float:
    """Convert Kelvin to Celsius."""
    if kelvin < 0:
        raise ValueError("Kelvin temperature cannot be negative.")
    return round(kelvin - 273.15, 2)


def temperature_difference(c1: float, c2: float) -> Dict:
    """Compute temperature difference in both Celsius and Kelvin."""
    diff_c = round(abs(c2 - c1), 2)
    diff_k = round(diff_c, 2)  # same magnitude in K
    return {
        "diff_celsius": diff_c,
        "diff_kelvin": diff_k,
        "hotter_temp_c": max(c1, c2),
        "colder_temp_c": min(c1, c2),
        "hotter_temp_k": celsius_to_kelvin(max(c1, c2)),
        "colder_temp_k": celsius_to_kelvin(min(c1, c2)),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Verification Helpers
# ─────────────────────────────────────────────────────────────────────────────

def verify_classification(substance: str, expected_category: str) -> VerificationResult:
    """
    Verify a classification answer.
    expected_category: 'element', 'compound', 'mixture', 'pure_substance'
    """
    result = classify_matter(substance)
    cat_lower = result.category.lower()
    sub_lower = result.sub_category.lower()
    exp_lower = expected_category.lower()

    correct = (exp_lower in cat_lower or exp_lower in sub_lower or
               cat_lower in exp_lower or sub_lower in exp_lower)

    feedback = (
        f"'{substance}' → {result.category} ({result.sub_category})\n"
        f"{result.explanation}"
    )
    if not correct:
        feedback = f"✗ Expected '{expected_category}' but got '{result.sub_category}'.\n" + feedback

    return VerificationResult(
        is_correct=correct,
        expected=expected_category,
        given=result.sub_category,
        feedback=feedback
    )


def verify_state(substance: str, temp_c: float, expected_state: str) -> VerificationResult:
    """Verify the state of matter at a given temperature."""
    actual_state, expl = get_physical_state(substance, temp_c)
    correct = actual_state.strip().lower() == expected_state.strip().lower()

    feedback = (
        f"'{substance}' at {temp_c}°C → {actual_state}\n"
        f"{expl}"
    )
    if not correct:
        feedback = f"✗ Expected '{expected_state}' but got '{actual_state}'.\n" + feedback

    return VerificationResult(
        is_correct=correct,
        expected=expected_state,
        given=actual_state,
        feedback=feedback
    )


# ─────────────────────────────────────────────────────────────────────────────
# Batch / Utility Functions
# ─────────────────────────────────────────────────────────────────────────────

def classify_list(substances: list) -> List[MatterResult]:
    """Classify a list of substances."""
    return [classify_matter(s) for s in substances]


def batch_verify_changes(change_list: list) -> List[VerificationResult]:
    """Verify a list of (change_name, expected_type) tuples."""
    return [verify_change_classification(name, ctype)
            for name, ctype in change_list]


def get_matter_summary() -> Dict[str, List[str]]:
    """Return a summary dictionary of known substances by category."""
    return {
        "elements": sorted(_ELEMENTS),
        "compounds": sorted(_COMPOUNDS.keys()),
        "mixtures": sorted(_MIXTURES.keys()),
        "reversible_physical": sorted(_REVERSIBLE_PHYSICAL.keys()),
        "irreversible_physical": sorted(_IRREVERSIBLE_PHYSICAL.keys()),
        "chemical_changes": sorted(_CHEMICAL_CHANGES.keys()),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Self-Test
# ─────────────────────────────────────────────────────────────────────────────

def run_self_tests() -> None:
    """Run built-in verification tests."""
    tests_passed = 0
    tests_total = 0

    print("=" * 60)
    print("CLASS 7 CHEMISTRY SOLVER — SELF TEST")
    print("=" * 60)

    # ── Node 001 Tests ──────────────────────────────────────────────────
    print("\n── Node c7_chem_001: Matter Classification ──")

    tests = [
        ("iron", "element", classify_matter),
        ("water", "compound", classify_matter),
        ("air", "mixture", classify_matter),
        ("gold", "element", classify_matter),
        ("salt water", "mixture", classify_matter),
    ]

    for substance, expected_cat, fn in tests:
        tests_total += 1
        result = fn(substance)
        passed = expected_cat.lower() in result.sub_category.lower()
        status = "✓" if passed else "✗"
        print(f"  {status} {substance:20s} → {result.sub_category:15s} (expected: {expected_cat})")
        if passed:
            tests_passed += 1

    # ── Node 002 Tests ──────────────────────────────────────────────────
    print("\n── Node c7_chem_002: Kinetic Theory ──")

    ke_tests = [
        (27, 127, 400 / 300),
        (0, 100, 373.15 / 273.15),
        (20, 40, 313.15 / 293.15),
    ]
    for t1, t2, expected_ratio in ke_tests:
        tests_total += 1
        result = kinetic_energy_ratio(t1, t2)
        passed = abs(result.ke_ratio - expected_ratio) < 0.001
        status = "✓" if passed else "✗"
        print(f"  {status} KE ratio at {t1}°C vs {t2}°C = {result.ke_ratio:.4f} "
              f"(expected ~{expected_ratio:.4f})")
        if passed:
            tests_passed += 1

    # State comparison
    tests_total += 1
    comp = compare_states("solid", "gas")
    passed = len(comp.get("key_differences", [])) >= 3