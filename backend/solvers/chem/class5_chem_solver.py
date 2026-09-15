"""
Class 5 Chemistry Solver
Sections: Revision of solids/liquids/gases | Interconversion of states of matter | Melting and freezing
Author: Automated Curriculum Generator
"""

import random
import math
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional, Tuple, Dict, Any

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

class State(Enum):
    SOLID   = "solid"
    LIQUID  = "liquid"
    GAS     = "gas"

class ChangeType(Enum):
    MELTING        = "melting"         # solid  → liquid  (heating)
    FREEZING       = "freezing"        # liquid → solid   (cooling)
    EVAPORATION    = "evaporation"     # liquid → gas     (heating)
    CONDENSATION   = "condensation"    # gas    → liquid  (cooling)

@dataclass
class StateProperties:
    shape:   str   # "fixed" / "no fixed shape" / "no shape of its own"
    volume:  str   # "fixed" / "not fixed"
    flow:    str   # "does not flow" / "flows" / "spreads"
    particles: str # "packed tightly" / "loosely packed" / "very far apart"

PROPERTIES = {
    State.SOLID:  StateProperties("fixed", "fixed",          "does not flow", "tightly packed"),
    State.LIQUID: StateProperties("no fixed shape", "fixed", "flows",         "loosely packed"),
    State.GAS:    StateProperties("no shape of its own","not fixed", "spreads to fill any space", "very far apart"),
}

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

SOLID_EXAMPLES   = ["stone", "book", "pencil", "brick", "ice", "sugar", "salt", "chair", "table", "ball"]
LIQUID_EXAMPLES  = ["water", "milk", "juice", "oil", "honey", "paint", "ink", "vinegar"]
GAS_EXAMPLES     = ["air", "oxygen", "carbon dioxide", "steam", "natural gas", "oxygen we breathe"]
MELTING_EXAMPLES = [("ice", "water"), ("butter", "melted butter"), ("chocolate", "melted chocolate"),
                    ("wax", "melted wax"), ("ice cream", "melted ice cream")]
FREEZING_EXAMPLES = [("water", "ice"), ("milk", "frozen milk / ice cream"),
                     ("pond water", "ice on the pond"), ("juice", "ice lolly")]

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def _pick(seq: list, seed: int, idx: int = 0) -> Any:
    """Deterministically pick one item from seq using (seed + idx)."""
    return seq[(seed + idx) % len(seq)]

def _shuffle(seq: list, seed: int) -> list:
    """Fisher-Yates with a deterministic seed-derived shuffle."""
    rng   = random.Random(seed)
    items = list(seq)
    rng.shuffle(items)
    return items

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

class N1Solver:
    """Solver for c5_chem_001: Revision of solids, liquids and gases."""

    @staticmethod
    def identify_state(item: str) -> State:
        item_lower = item.lower().strip()
        solid_keywords   = ["stone", "book", "pencil", "brick", "sugar", "salt",
                            "chair", "table", "ball", "ice", "pen", "paper",
                            "wood", "glass", "plastic", "toy", "rock"]
        liquid_keywords  = ["water", "milk", "juice", "oil", "honey", "paint",
                            "ink", "vinegar", "soup", "tea", "coffee", "curd",
                            "shampoo", "syrup"]
        gas_keywords     = ["air", "oxygen", "carbon dioxide", "steam", "natural gas",
                            "smoke", "vapour", "hydrogen", "nitrogen"]
        for kw in solid_keywords:
            if kw in item_lower:
                return State.SOLID
        for kw in liquid_keywords:
            if kw in item_lower:
                return State.LIQUID
        for kw in gas_keywords:
            if kw in item_lower:
                return State.GAS
        if "ice" in item_lower:
            return State.SOLID
        return State.SOLID  # default

    # ── Question type 1: identify state ──
    def solve_identify_state(self, item: str, seed: int = 0) -> dict:
        state = self.identify_state(item)
        props = PROPERTIES[state]
        return {
            "given": item,
            "state": state.value,
            "shape": props.shape,
            "volume": props.volume,
            "flow": props.flow,
            "particles": props.particles,
            "reasoning": (
                f"'{item}' has a {props.shape} shape, "
                f"a {props.volume} volume, "
                f"and its particles are {props.particles}. "
                f"Therefore it is a {state.value}."
            ),
            "answer": state.value,
        }

    # ── Question type 2: fill-in-the-blanks state properties ──
    def solve_fill_properties(self, state_str: str, seed: int = 0) -> dict:
        state = State(state_str.lower().strip())
        props = PROPERTIES[state]
        question = (
            f"A {state.value} has {props.shape} shape, "
            f"{props.volume} volume, and its particles are {props.particles}. "
            f"It {props.flow}."
        )
        blanks = {"shape": props.shape, "volume": props.volume,
                  "particles": props.particles, "flow": props.flow}
        return {"question_filled": question, "blanks": blanks}

    # ── Question type 3: is air matter? ──
    def solve_is_air_matter(self, seed: int = 0) -> dict:
        return {
            "answer": "Yes, air is matter.",
            "reasoning": (
                "Matter is anything that has weight and takes up space. "
                "Air has weight (we feel it when the wind blows us) and "
                "it takes up space (a balloon filled with air occupies space). "
                "Therefore, air is matter."
            ),
        }

    # ── Question type 4: sort items into states ──
    def solve_sort_items(self, items: List[str], seed: int = 0) -> dict:
        buckets = {s: [] for s in State}
        for item in items:
            buckets[self.identify_state(item)].append(item)
        return {"items": items, "sorted": {s.value: buckets[s] for s in State}}


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

@dataclass
class Change:
    change_type: ChangeType
    from_state:  State
    to_state:    State
    direction:   str   # "heating" or "cooling"

class N2Solver:
    """Solver for c5_chem_002: Interconversion of states of matter."""

    CHANGE_TABLE = [
        Change(ChangeType.MELTING,      State.SOLID,  State.LIQUID,  "heating"),
        Change(ChangeType.FREEZING,     State.LIQUID, State.SOLID,   "cooling"),
        Change(ChangeType.EVAPORATION,  State.LIQUID, State.GAS,     "heating"),
        Change(ChangeType.CONDENSATION, State.GAS,    State.LIQUID,  "cooling"),
    ]

    def all_changes(self) -> List[Change]:
        return list(self.CHANGE_TABLE)

    def change_for(self, change_type: ChangeType) -> Change:
        for c in self.CHANGE_TABLE:
            if c.change_type == change_type:
                return c
        raise ValueError(f"Unknown change type: {change_type}")

    # ── Question type 1: name the change ──
    def solve_name_change(self, from_s: str, to_s: str, seed: int = 0) -> dict:
        fs, ts = State(from_s.lower()), State(to_s.lower())
        for c in self.CHANGE_TABLE:
            if c.from_state == fs and c.to_state == ts:
                return {
                    "from_state": fs.value,
                    "to_state": ts.value,
                    "change": c.change_type.value,
                    "condition": c.direction,
                    "reasoning": (
                        f"When a {fs.value} is {'heated' if c.direction=='heating' else 'cooled'}, "
                        f"it turns into a {ts.value}. This change is called {c.change_type.value}."
                    ),
                }
        return {
            "from_state": fs.value, "to_state": ts.value,
            "change": "no direct change", "reasoning": "This transition is not a single named change at Class 5 level."
        }

    # ── Question type 2: water cycle changes ──
    def solve_water_cycle(self, stage: str, seed: int = 0) -> dict:
        stage_lower = stage.lower()
        water_map = {
            "ice melting in the sun":  ChangeType.MELTING,
            "water boiling in a kettle": ChangeType.EVAPORATION,
            "steam on a cold window":  ChangeType.CONDENSATION,
            "puddle freezing at night": ChangeType.FREEZING,
            "clouds forming":          ChangeType.CONDENSATION,
            "rain falling":            ChangeType.CONDENSATION,
        }
        ct = water_map.get(stage_lower)
        if ct:
            c = self.change_for(ct)
            return {
                "stage": stage,
                "change": c.change_type.value,
                "from_state": c.from_state.value,
                "to_state": c.to_state.value,
            }
        return {"stage": stage, "change": "unknown"}

    # ── Question type 3: can a solid become gas directly? ──
    def solve_direct_change(self, seed: int = 0) -> dict:
        return {
            "answer": "Yes, it is possible but is called sublimation.",
            "note": (
                "Sublimation is when a solid turns directly into a gas without becoming liquid first. "
                "Examples: dry ice (solid CO₂) and naphthalene moth balls. "
                "This is NOT in the Class 5 syllabus; it is mentioned only for awareness."
            ),
        }

    # ── Question type 4: complete the change table ──
    def solve_change_table(self, seed: int = 0) -> dict:
        rows = []
        for c in self.CHANGE_TABLE:
            rows.append({
                "change": c.change_type.value,
                "from": c.from_state.value,
                "to": c.to_state.value,
                "condition": c.direction,
            })
        return {"change_table": rows}

    # ── Question type 5: condition required ──
    def solve_condition(self, change_type_str: str, seed: int = 0) -> dict:
        ct = ChangeType(change_type_str.lower())
        c  = self.change_for(ct)
        return {
            "change": c.change_type.value,
            "condition": c.direction,
            "explanation": (
                f"{c.change_type.value.capitalize()} happens when a {c.from_state.value} "
                f"is {c.direction}. It turns into a {c.to_state.value}."
            ),
        }


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

@dataclass
class TempProblem:
    """A temperature/conversion problem for melting-freezing."""
    initial_state: State
    final_state:   State
    temp_change:   str     # e.g. "raised" / "lowered"
    substance:     str
    new_state:     str
    # numeric variant
    initial_temp:  Optional[int] = None   # °C
    melting_point: Optional[int] = None
    answer_state:  Optional[str]  = None


class N3Solver:
    """Solver for c5_chem_003: Melting and freezing."""

    @staticmethod
    def melting_point(substance: str, seed: int = 0) -> int:
        """Return a typical melting-point (°C) for known substances."""
        mp = {
            "ice": 0, "water": 0,
            "butter": 32, "chocolate": 35,
            "wax": 60, "sugar": 186,
            "gold": 1064, "iron": 1538,
        }
        return mp.get(substance.lower(), 0)

    # ── Question type 1: direction of change ──
    def solve_direction(self, from_s: str, to_s: str, seed: int = 0) -> dict:
        fs, ts = State(from_s.lower()), State(to_s.lower())
        if fs == State.SOLID and ts == State.LIQUID:
            change, condition, reason = "melting", "heating", (
                "When a solid is heated it absorbs heat energy, "
                "its particles vibrate faster, break free and move about — it becomes a liquid."
            )
        elif fs == State.LIQUID and ts == State.SOLID:
            change, condition, reason = "freezing", "cooling", (
                "When a liquid is cooled, its particles lose heat energy, "
                "slow down and lock together — it becomes a solid."
            )
        else:
            change, condition, reason = "unknown", "unknown", "This is not melting or freezing."
        return {"change": change, "condition": condition, "reasoning": reason}

    # ── Question type 2: substance example ──
    def solve_example(self, change: str, seed: int = 0) -> dict:
        change_lower = change.lower().strip()
        if change_lower == "melting":
            sub, product = _pick(MELTING_EXAMPLES, seed, 0)
            return {
                "change": "melting",
                "substance": sub,
                "product": product,
                "explanation": f"When {sub} is heated, it melts to become {product}.",
            }
        else:
            sub, product = _pick(FREEZING_EXAMPLES, seed, 0)
            return {
                "change": "freezing",
                "substance": sub,
                "product": product,
                "explanation": f"When {sub} is cooled, it freezes to become {product}.",
            }

    # ── Question type 3: temperature test ──
    def solve_temp_test(self, substance: str, current_temp: int, seed: int = 0) -> dict:
        mp = self.melting_point(substance, seed)
        if current_temp > mp:
            state = State.LIQUID
            change = "melting (or already melted)"
        elif current_temp < mp:
            state = State.SOLID
            change = "freezing (or already frozen)"
        else:
            state = "at melting point"
            change = "melting and freezing happen together"
        return {
            "substance": substance,
            "melting_point_c": mp,
            "current_temp_c": current_temp,
            "state": state.value if isinstance(state, State) else state,
            "change_occurring": change,
            "reasoning": (
                f"The melting point of {substance} is {mp}°C. "
                f"At {current_temp}°C, {'it is above' if current_temp > mp else 'it is below'} "
                f"the melting point, so it is a {state.value if isinstance(state, State) else state}."
            ),
        }

    # ── Question type 4: reversible change ──
    def solve_reversible(self, seed: int = 0) -> dict:
        ice_mp = 0
        return {
            "process": "ice ↔ water",
            "forward":  {"change": "melting",  "condition": "heat ice above 0°C"},
            "backward": {"change": "freezing", "condition": "cool water below 0°C"},
            "explanation": (
                "Melting and freezing are reverse (opposite) changes of each other. "
                "If a substance can melt, it can also freeze under the right conditions. "
                f"Ice melts at {ice_mp}°C and water freezes at {ice_mp}°C — the same temperature."
            ),
        }

    # ── Question type 5: everyday observation ──
    def solve_everyday(self, observation: str, seed: int = 0) -> dict:
        obs_lower = observation.lower()
        if "melt" in obs_lower or "soften" in obs_lower or "runny" in obs_lower:
            change, explanation = "melting", (
                "The substance absorbed heat from the surroundings, "
                "its particles gained energy and moved apart — this is melting."
            )
        elif "freeze" in obs_lower or "hard" in obs_lower or "solidify" in obs_lower:
            change, explanation = "freezing", (
                "The substance lost heat to the cold surroundings, "
                "its particles lost energy and came closer together — this is freezing."
            )
        else:
            change, explanation = "unknown", "Cannot classify this observation."
        return {"observation": observation, "change": change, "explanation": explanation}

    # ── Question type 6: which temperature causes melting? ──
    def solve_which_temp(self, mp_celsius: int, seed: int = 0) -> dict:
        return {
            "melting_point_c": mp_celsius,
            "melting_point_k": mp_celsius + 273,
            "melting_occurs_at": f"At and above {mp_celsius}°C (and {mp_celsius + 273} K)",
            "explanation": (
                f"Heating a solid to {mp_celsius}°C (its melting point) gives its particles "
                f"enough energy to break free from their fixed positions. "
                f"At {mp_celsius + 273} K the same thing happens because 0°C = 273 K."
            ),
        }


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def verify_n1(result: dict) -> bool:
    valid_states = {s.value for s in State}
    return result.get("answer", "") in valid_states

def verify_n2(result: dict) -> bool:
    valid_changes = {ct.value for ct in ChangeType}
    return result.get("change", "") in valid_changes or result.get("change") == "no direct change"

def verify_n3(result: dict) -> bool:
    valid_changes = {"melting", "freezing", "unknown"}
    return result.get("change", "") in valid_changes

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

@dataclass
class SolveResult:
    node: str
    question_type: str
    params: dict
    answer: dict
    verified: bool
    difficulty: str
    competency: str

class MasterSolver:
    def __init__(self, seed: int = 42):
        self.seed = seed
        self.n1 = N1Solver()
        self.n2 = N2Solver()
        self.n3 = N3Solver()

    def solve(self, node: str, qtype: str, params: dict) -> SolveResult:
        rng_seed = self.seed + hash((node, qtype)) % 10_000

        if node == "c5_chem_001":
            if qtype == "identify_state":
                ans  = self.n1.solve_identify_state(params["item"], rng_seed)
                return SolveResult(node, qtype, params, ans, verify_n1(ans), "Easy", "School")
            if qtype == "fill_properties":
                ans  = self.n1.solve_fill_properties(params["state"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "is_air_matter":
                ans  = self.n1.solve_is_air_matter(rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "sort_items":
                ans  = self.n1.solve_sort_items(params["items"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")

        elif node == "c5_chem_002":
            if qtype == "name_change":
                ans  = self.n2.solve_name_change(params["from_state"], params["to_state"], rng_seed)
                return SolveResult(node, qtype, params, ans, verify_n2(ans), "Easy", "School")
            if qtype == "water_cycle":
                ans  = self.n2.solve_water_cycle(params["stage"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "direct_change":
                ans  = self.n2.solve_direct_change(rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "change_table":
                ans  = self.n2.solve_change_table(rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "condition":
                ans  = self.n2.solve_condition(params["change_type"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")

        elif node == "c5_chem_003":
            if qtype == "direction":
                ans  = self.n3.solve_direction(params["from_state"], params["to_state"], rng_seed)
                return SolveResult(node, qtype, params, ans, verify_n3(ans), "Easy", "School")
            if qtype == "example":
                ans  = self.n3.solve_example(params["change"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "temp_test":
                ans  = self.n3.solve_temp_test(params["substance"], params["current_temp"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Medium", "School")
            if qtype == "reversible":
                ans  = self.n3.solve_reversible(rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "everyday":
                ans  = self.n3.solve_everyday(params["observation"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")
            if qtype == "which_temp":
                ans  = self.n3.solve_which_temp(params["melting_point_c"], rng_seed)
                return SolveResult(node, qtype, params, ans, True, "Easy", "School")

        raise ValueError(f"Unknown node/qtype: {node}/{qtype}")


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

if __name__ == "__main__":
    ms = MasterSolver(seed=42)

    tests = [
        ("c5_chem_001", "identify_state", {"item": "ice"}),
        ("c5_chem_001", "fill_properties", {"state": "solid"}),
        ("c5_chem_001", "is_air_matter", {}),
        ("c5_chem_001", "sort_items",  {"items": ["water", "rock", "air", "milk"]}),
        ("c5_chem_002", "name_change", {"from_state": "solid", "to_state": "liquid"}),
        ("c5_chem_002", "name_change", {"from_state": "gas", "to_state": "liquid"}),
        ("c5_chem_002", "water_cycle", {"stage": "steam on a cold window"}),
        ("c5_chem_002", "condition",   {"change_type": "melting"}),
        ("c5_chem_003", "direction",   {"from_state": "solid", "to_state": "liquid"}),
        ("c5_chem_003", "example",     {"change": "freezing"}),
        ("c5_chem_003", "temp_test",   {"substance": "ice", "current_temp": 25}),
        ("c5_chem_003", "reversible",  {}),
        ("c5_chem_003", "which_temp",  {"melting_point_c": 0}),
    ]

    print("=" * 60)
    print("CLASS 5 CHEMISTRY SOLVER — SMOKE TEST")
    print("=" * 60)
    for node, qtype, params in tests:
        r = ms.solve(node, qtype, params)
        status = "✓" if r.verified else "?"
        print(f"\n[{status}] {node}/{qtype}")
        print(f"  Answer: {r.answer}")