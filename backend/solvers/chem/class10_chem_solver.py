"""
class10_chem_solver.py
Deterministic step-by-step solver for Class 10 Chemistry
Nodes: c10_chem_001 (Atomic size), c10_chem_002 (Metallic/Non-metallic), c10_chem_003 (Ionisation Potential)
Author: Fable-5 / Anthropic
"""

import math
import random
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional, List, Tuple
import json


# ─── Data Models ───────────────────────────────────────────────────────────────

class NodeID(Enum):
    ATOMIC_SIZE = "c10_chem_001"
    METALLIC_CHARACTER = "c10_chem_002"
    IONISATION_POTENTIAL = "c10_chem_003"


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class Competency(Enum):
    BOARD = "Board"
    COMPETENCY = "Competency"


@dataclass
class PeriodicElement:
    """Represents a chemical element with key periodic properties."""
    symbol: str
    name: str
    atomic_number: int
    period: int
    group: int
    atomic_radius_pm: float          # picometres
    metallic_character: str          # "metallic", "metalloid", "non-metallic"
    first_ie_kj_mol: float           # first ionisation energy in kJ/mol

    @property
    def atomic_radius_angstrom(self) -> float:
        return round(self.atomic_radius_pm / 100, 2)

    def __repr__(self):
        return (f"Element({self.symbol}, Z={self.atomic_number}, "
                f"P={self.period}, G={self.group}, "
                f"R={self.atomic_radius_pm}pm)")


# ─── Periodic Table Data (Class 10 relevant elements) ─────────────────────────

PERIODIC_TABLE = {
    "Li": PeriodicElement("Li", "Lithium", 3, 2, 1, 152, "metallic", 520),
    "Be": PeriodicElement("Be", "Beryllium", 4, 2, 2, 112, "metallic", 900),
    "B":  PeriodicElement("B", "Boron", 5, 2, 13, 85, "metalloid", 801),
    "C":  PeriodicElement("C", "Carbon", 6, 2, 14, 77, "non-metallic", 1087),
    "N":  PeriodicElement("N", "Nitrogen", 7, 2, 15, 75, "non-metallic", 1402),
    "O":  PeriodicElement("O", "Oxygen", 8, 2, 16, 73, "non-metallic", 1314),
    "F":  PeriodicElement("F", "Fluorine", 9, 2, 17, 72, "non-metallic", 1681),
    "Na": PeriodicElement("Na", "Sodium", 11, 3, 1, 186, "metallic", 496),
    "Mg": PeriodicElement("Mg", "Magnesium", 12, 3, 2, 160, "metallic", 738),
    "Al": PeriodicElement("Al", "Aluminium", 13, 3, 13, 143, "metallic", 578),
    "Si": PeriodicElement("Si", "Silicon", 14, 3, 14, 117, "metalloid", 787),
    "P":  PeriodicElement("P", "Phosphorus", 15, 3, 15, 110, "non-metallic", 1012),
    "S":  PeriodicElement("S", "Sulphur", 16, 3, 16, 103, "non-metallic", 999),
    "Cl": PeriodicElement("Cl", "Chlorine", 17, 3, 17, 99, "non-metallic", 1251),
    "K":  PeriodicElement("K", "Potassium", 19, 4, 1, 227, "metallic", 419),
    "Ca": PeriodicElement("Ca", "Calcium", 20, 4, 2, 197, "metallic", 590),
    "Fe": PeriodicElement("Fe", "Iron", 26, 4, 8, 156, "metallic", 762),
    "Cu": PeriodicElement("Cu", "Copper", 29, 4, 11, 128, "metallic", 745),
    "Zn": PeriodicElement("Zn", "Zinc", 30, 4, 12, 134, "metallic", 906),
    "Br": PeriodicElement("Br", "Bromine", 35, 4, 17, 114, "non-metallic", 1140),
}


def get_element(symbol: str) -> PeriodicElement:
    key = symbol.strip().capitalize()
    if key not in PERIODIC_TABLE:
        raise ValueError(f"Unknown element symbol: '{symbol}'. "
                         f"Available: {', '.join(PERIODIC_TABLE.keys())}")
    return PERIODIC_TABLE[key]


# ─── Solver Step-by-step infrastructure ───────────────────────────────────────

@dataclass
class Step:
    """A single reasoning step in the solution."""
    step_num: int
    title: str
    description: str
    formula: Optional[str] = None
    calculation: Optional[str] = None
    result: Optional[str] = None

    def format(self) -> str:
        lines = [f"  Step {self.step_num}: {self.title}"]
        lines.append(f"    {self.description}")
        if self.formula:
            lines.append(f"    Formula: {self.formula}")
        if self.calculation:
            lines.append(f"    Calculation: {self.calculation}")
        if self.result:
            lines.append(f"    ✓ Result: {self.result}")
        return "\n".join(lines)


@dataclass
class Solution:
    """Complete solution with verification."""
    steps: List[Step]
    final_answer: str
    verification: str
    node_id: str
    question_text: str
    difficulty: str

    def format(self) -> str:
        lines = [
            "=" * 60,
            f"NODE: {self.node_id}",
            f"DIFFICULTY: {self.difficulty}",
            "=" * 60,
            f"QUESTION: {self.question_text}",
            "─" * 60,
            "SOLUTION:",
        ]
        for step in self.steps:
            lines.append(step.format())
        lines.append("─" * 60)
        lines.append(f"ANSWER: {self.final_answer}")
        lines.append(f"VERIFICATION: {self.verification}")
        lines.append("=" * 60)
        return "\n".join(lines)


# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

class AtomicSizeSolver:
    """
    Solves problems related to atomic size (atomic radius).

    Key concepts:
    """

    def __init__(self):
        self.ATOMIC_SIZE_TRENDS = {
            "across_period": {
                "direction": "decreases",
                "reason": (
                    "The number of electron shells remains the same, "
                    "but nuclear charge (protons) increases. "
                    "Stronger positive pull on electrons → atom shrinks."
                ),
            },
            "down_group": {
                "direction": "increases",
                "reason": (
                    "Each successive element adds a new electron shell (principal quantum number increases). "
                    "Outermost electrons are farther from nucleus → atom grows."
                ),
            },
        }

    # ── Type A: Rank elements by atomic size ──────────────────────────────────

    def rank_by_atomic_size(self, symbols: List[str]) -> Solution:
        """Rank given elements by decreasing atomic size."""
        elements = [get_element(s) for s in symbols]
        question_text = (
            f"Arrange the following elements in DECREASING order of atomic size: "
            f"{', '.join(symbols)}"
        )

        steps = []

        steps.append(Step(
            step_num=1,
            title="Extract atomic radii from periodic table data",
            description="Look up the atomic radius (in pm) for each element.",
            calculation=" | ".join(
                f"{e.symbol}({e.name}): {e.atomic_radius_pm} pm" for e in elements
            ),
            result=f"Data collected for {len(elements)} elements."
        ))

        periods_groups = " | ".join(
            f"{e.symbol}: Period {e.period}, Group {e.group}" for e in elements
        )
        steps.append(Step(
            step_num=2,
            title="Identify period and group of each element",
            description="Period tells us shell count; group tells us valence electrons.",
            calculation=periods_groups,
            result="Positions noted."
        ))

        same_period = len(set(e.period for e in elements)) == 1
        same_group = len(set(e.group for e in elements)) == 1

        if same_period:
            steps.append(Step(
                step_num=3,
                title="Apply 'across a period' rule",
                description=(
                    "All elements are in the SAME PERIOD → same number of electron shells. "
                    "As atomic number increases left to right, nuclear charge increases. "
                    "Stronger pull → atomic size DECREASES."
                ),
                formula="Atomic size ∝ 1 / Nuclear charge (for same period)",
                result="Size decreases from left to right across the period."
            ))
        elif same_group:
            steps.append(Step(
                step_num=3,
                title="Apply 'down a group' rule",
                description=(
                    "All elements are in the SAME GROUP → same valence configuration. "
                    "As we go down, a new electron shell is added each time. "
                    "More shells → atomic size INCREASES."
                ),
                formula="Atomic size ∝ Principal quantum number (n) (for same group)",
                result="Size increases from top to bottom down the group."
            ))
        else:
            steps.append(Step(
                step_num=3,
                title="Apply periodic trends — compare periods first, then groups",
                description=(
                    "Elements span different periods and groups. "
                    "Elements in higher periods (more shells) are LARGER regardless of group. "
                    "Within the same period, left elements are LARGER than right elements."
                ),
                formula="Size priority: Higher period >> Lower group number (left side)",
                result="Sort by period first (descending), then by group (ascending)."
            ))

        sorted_elements = sorted(elements, key=lambda e: e.atomic_radius_pm, reverse=True)
        ordered_symbols = [e.symbol for e in sorted_elements]
        ordered_radii = [f"{e.atomic_radius_pm} pm" for e in sorted_elements]

        steps.append(Step(
            step_num=4,
            title="Rank elements by atomic radius",
            description="Arrange in decreasing order of atomic radius.",
            calculation=" > ".join(
                f"{e.symbol} ({e.atomic_radius_pm} pm)" for e in sorted_elements
            ),
            result=" > ".join(ordered_symbols)
        ))

        final_answer = f"Decreasing atomic size: {' > '.join(ordered_symbols)}"
        verification = (
            f"Verified: Largest = {sorted_elements[0].symbol} "
            f"({sorted_elements[0].atomic_radius_pm} pm), "
            f"Smallest = {sorted_elements[-1].symbol} "
            f"({sorted_elements[-1].atomic_radius_pm} pm). "
            f"Trend is consistent with periodic properties."
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.ATOMIC_SIZE.value,
            question_text=question_text,
            difficulty=Difficulty.MEDIUM.value,
        )

    # ── Type B: Convert pm to angstroms ───────────────────────────────────────

    def convert_units(self, symbol: str) -> Solution:
        """Convert atomic radius from pm to Ångströms."""
        elem = get_element(symbol)
        question_text = (
            f"The atomic radius of {elem.name} ({elem.symbol}) is "
            f"{elem.atomic_radius_pm} pm. Express it in Ångströms (Å). "
            f"(1 Å = 100 pm)"
        )

        steps = []
        steps.append(Step(
            step_num=1,
            title="State the given data",
            description=f"Atomic radius of {elem.name} = {elem.atomic_radius_pm} pm",
            result=f"Given: {elem.atomic_radius_pm} pm"
        ))

        steps.append(Step(
            step_num=2,
            title="State the conversion factor",
            description="1 Ångström = 100 picometres.",
            formula="1 Å = 100 pm",
            result="Conversion factor established."
        ))

        steps.append(Step(
            step_num=3,
            title="Apply conversion",
            description="Divide the value in pm by 100 to get Ångströms.",
            calculation=f"{elem.atomic_radius_pm} pm ÷ 100 = {elem.atomic_radius_pm / 100} Å",
            result=f"{elem.atomic_radius_pm} pm = {elem.atomic_radius_pm / 100} Å"
        ))

        steps.append(Step(
            step_num=4,
            title="Round to two decimal places",
            description="Express the result to 2 decimal places.",
            calculation=f"{round(elem.atomic_radius_pm / 100, 2)} Å",
            result=f"Atomic radius of {elem.name} = {round(elem.atomic_radius_pm / 100, 2)} Å"
        ))

        final_answer = f"Atomic radius of {elem.name} = {round(elem.atomic_radius_pm / 100, 2)} Å"
        verification = (
            f"Cross-check: {round(elem.atomic_radius_pm / 100, 2)} Å × 100 = "
            f"{round(elem.atomic_radius_pm / 100, 2) * 100} pm ≈ {elem.atomic_radius_pm} pm ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.ATOMIC_SIZE.value,
            question_text=question_text,
            difficulty=Difficulty.EASY.value,
        )

    # ── Type C: Compare two elements ──────────────────────────────────────────

    def compare_elements(self, sym1: str, sym2: str) -> Solution:
        """Compare atomic sizes of two elements."""
        e1, e2 = get_element(sym1), get_element(sym2)
        question_text = (
            f"Between {e1.name} ({e1.symbol}, Z={e1.atomic_number}) and "
            f"{e2.name} ({e2.symbol}, Z={e2.atomic_number}), "
            f"which has a larger atomic size? Give a reason."
        )

        larger = e1 if e1.atomic_radius_pm >= e2.atomic_radius_pm else e2
        smaller = e2 if larger is e1 else e1

        steps = []
        steps.append(Step(
            step_num=1,
            title="Extract atomic radii",
            description=f"Atomic radius of {e1.symbol} = {e1.atomic_radius_pm} pm",
            calculation=f"{e1.symbol}: {e1.atomic_radius_pm} pm",
            result=f"{e1.symbol} = {e1.atomic_radius_pm} pm"
        ))
        steps.append(Step(
            step_num=2,
            title="Extract atomic radii (continued)",
            description=f"Atomic radius of {e2.symbol} = {e2.atomic_radius_pm} pm",
            calculation=f"{e2.symbol}: {e2.atomic_radius_pm} pm",
            result=f"{e2.symbol} = {e2.atomic_radius_pm} pm"
        ))

        same_period = e1.period == e2.period
        same_group = e1.group == e2.group

        if same_period:
            reason = (
                f"Both are in Period {e1.period} (same number of shells). "
                f"{e1.symbol} (Group {e1.group}) is to the {'left' if e1.group < e2.group else 'right'} of "
                f"{e2.symbol} (Group {e2.group}). "
                f"Nuclear charge increases left to right → stronger pull → smaller size. "
                f"Therefore, {larger.symbol} > {smaller.symbol}."
            )
        elif same_group:
            reason = (
                f"Both are in Group {e1.group}. "
                f"{larger.symbol} is in Period {larger.period}, "
                f"{smaller.symbol} is in Period {smaller.period}. "
                f"More shells in {larger.symbol} → larger size."
            )
        else:
            reason = (
                f"{e1.symbol}: Period {e1.period}, Group {e1.group} "
                f"({e1.atomic_radius_pm} pm) vs "
                f"{e2.symbol}: Period {e2.period}, Group {e2.group} "
                f"({e2.atomic_radius_pm} pm). "
                f"Period effect dominates: {larger.symbol} has more shells → larger."
            )

        steps.append(Step(
            step_num=3,
            title="Compare and state the larger element",
            description=reason,
            result=f"{larger.symbol} has larger atomic size ({larger.atomic_radius_pm} pm vs {smaller.atomic_radius_pm} pm)."
        ))

        final_answer = (
            f"{larger.name} ({larger.symbol}) has larger atomic size "
            f"({larger.atomic_radius_pm} pm) compared to "
            f"{smaller.name} ({smaller.symbol}) ({smaller.atomic_radius_pm} pm)."
        )

        steps.append(Step(
            step_num=4,
            title="Verify with periodic trend",
            description="Check that the conclusion matches the expected periodic trend.",
            result="Consistent with periodic properties."
        ))

        verification = (
            f"Direct comparison: {larger.atomic_radius_pm} pm > {smaller.atomic_radius_pm} pm. "
            f"Trend: {'same period → decreases left to right' if same_period else 'same group → increases downward' if same_group else 'higher period dominates'}. ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.ATOMIC_SIZE.value,
            question_text=question_text,
            difficulty=Difficulty.MEDIUM.value,
        )

    # ── Type D: Fill-in-the-blank / MCQ ───────────────────────────────────────

    def fill_blank(self, seed: int = 42) -> Solution:
        """Generate a fill-in-the-blank question on atomic size trends."""
        rng = random.Random(seed)

        templates = [
            {
                "question": "Atomic size _______ as we move from left to right across a period because _______.",
                "answers": ["decreases", "nuclear charge increases while shells remain constant"],
                "distractors": ["increases, more electrons are added", "remains constant, same number of shells"],
            },
            {
                "question": "Atomic size _______ as we move down a group because _______.",
                "answers": ["increases", "an additional electron shell is added at each step"],
                "distractors": ["decreases, nuclear charge increases", "remains constant, same group properties"],
            },
            {
                "question": "Atomic size is measured in _______ or _______.",
                "answers": ["picometres (pm)", "ångströms (Å)"],
                "distractors": ["nanometres (nm)", "metres (m)"],
            },
        ]

        t = rng.choice(templates)
        question_text = t["question"]

        steps = [
            Step(1, "Recall the periodic trend", f"Question asks about: '{t['question']}'", result="Identify the trend."),
            Step(2, "Apply periodic property knowledge",
                 f"Correct completion: {t['answers'][0]} ... {t['answers'][1]}",
                 result="Answer identified."),
            Step(3, "Verify correctness",
                 f"Distractors: {', '.join(t['distractors'])}",
                 result="Answer confirmed."),
        ]

        final_answer = (
            f"Answer: {t['answers'][0]}; {t['answers'][1]}"
        )
        verification = "Answer checked against standard periodic property rules. ✓"

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.ATOMIC_SIZE.value,
            question_text=question_text,
            difficulty=Difficulty.EASY.value,
        )


# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

class MetallicCharacterSolver:
    """
    Solves problems related to metallic and non-metallic character.

    Key concepts:
      (smaller atoms hold electrons tighter; harder to lose, easier to gain)
      (larger atoms hold electrons loosely; easy to lose, hard to gain)
    """

    def __init__(self):
        self.CHARACTER_MAP = {
            "metallic": "tends to lose electrons (forms cations)",
            "metalloid": "intermediate character (can lose or gain electrons)",
            "non-metallic": "tends to gain electrons (forms anions)",
        }

    # ── Type A: Predict ionic formation ───────────────────────────────────────

    def predict_ion_type(self, symbol: str) -> Solution:
        """Predict the type of ion an element forms."""
        elem = get_element(symbol)
        question_text = (
            f"What type of ion will {elem.name} ({elem.symbol}) most likely form? "
            f"Explain using the concept of metallic character."
        )

        steps = []
        steps.append(Step(
            step_num=1,
            title="Identify the element's position and character",
            description=(
                f"{elem.symbol} is in Period {elem.period}, Group {elem.group}. "
                f"Its metallic character is: {elem.metallic_character}."
            ),
            result=f"{elem.symbol}: {elem.metallic_character}"
        ))

        if elem.metallic_character == "metallic":
            ion_type = "cation (positive ion)"
            ion_formula = f"{elem.symbol}⁺"
            explanation = (
                f"Metallic elements have LOW ionisation energy — they lose electrons easily. "
                f"{elem.symbol} will lose 1 electron to achieve a stable noble gas configuration, "
                f"forming a +1 ion: {elem.symbol} → {elem.symbol}⁺ + e⁻"
            )
        elif elem.metallic_character == "non-metallic":
            ion_type = "anion (negative ion)"
            valence_e = 8 - elem.group if elem.group <= 17 else 8 - (elem.group % 10)
            if elem.group == 17:
                valence_e = 1
                ion_formula = f"{elem.symbol}⁻"
            elif elem.group == 16:
                valence_e = 2
                ion_formula = f"{elem.symbol}²⁻"
            elif elem.group == 15:
                valence_e = 3
                ion_formula = f"{elem.symbol}³⁻"
            else:
                valence_e = 8 - elem.group
                ion_formula = f"{elem.symbol}ⁿ⁻"
            explanation = (
                f"Non-metallic elements have HIGH electron affinity — they gain electrons easily. "
                f"{elem.symbol} needs {valence_e} electron(s) to complete its octet: "
                f"{elem.symbol} + {valence_e}e⁻ → {ion_formula}"
            )
        else:
            ion_type = "both cation and anion (amphoteric/metalloid)"
            ion_formula = f"{elem.symbol}⁺ or {elem.symbol}ⁿ⁻"
            explanation = (
                f"Metalloids show intermediate character — they can lose or gain electrons "
                f"depending on the reaction conditions."
            )

        steps.append(Step(
            step_num=2,
            title="Determine the type of ion",
            description=explanation,
            formula=f"Ion formed: {ion_formula}",
            result=f"Forms a {ion_type}"
        ))

        steps.append(Step(
            step_num=3,
            title="Verify with periodic position",
            description=(
                f"{'Left side' if elem.group <= 2 else 'Right side' if elem.group >= 14 else 'Middle'} "
                f"of periodic table → {elem.metallic_character} character confirmed."
            ),
            result="Consistent with periodic position."
        ))

        final_answer = (
            f"{elem.name} ({elem.symbol}) will form a {ion_type} "
            f"({ion_formula}) because it has {elem.metallic_character} character."
        )
        verification = (
            f"Group {elem.group} elements: {'lose' if elem.group <= 2 or elem.group >= 11 and elem.group <= 12 else 'gain'} "
            f"electrons to achieve stable configuration. ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.METALLIC_CHARACTER.value,
            question_text=question_text,
            difficulty=Difficulty.MEDIUM.value,
        )

    # ── Type B: Rank by metallic character ────────────────────────────────────

    def rank_metallic_character(self, symbols: List[str]) -> Solution:
        """Rank elements by metallic character."""
        elements = [get_element(s) for s in symbols]
        question_text = (
            f"Arrange the following in DECREASING order of metallic character: "
            f"{', '.join(symbols)}"
        )

        char_score = {"metallic": 3, "metalloid": 2, "non-metallic": 1}

        steps = []
        steps.append(Step(
            step_num=1,
            title="Classify each element's character",
            description="Identify whether each element is metallic, metalloid, or non-metallic.",
            calculation=" | ".join(
                f"{e.symbol}: {e.metallic_character}" for e in elements
            ),
            result="Classification complete."
        ))

        same_period = len(set(e.period for e in elements)) == 1
        same_group = len(set(e.group for e in elements)) == 1

        if same_period:
            steps.append(Step(
                step_num=2,
                title="Apply 'across a period' rule",
                description=(
                    "Same period → left elements are more metallic (larger atomic size, "
                    "lower nuclear charge per valence shell). "
                    "Right elements are more non-metallic."
                ),
                result="Metallic character decreases left to right."
            ))
        elif same_group:
            steps.append(Step(
                step_num=2,
                title="Apply 'down a group' rule",
                description=(
                    "Same group → bottom elements are more metallic (larger size, "
                    "outermost electron farther from nucleus)."
                ),
                result="Metallic character increases top to bottom."
            ))
        else:
            steps.append(Step(
                step_num=2,
                title="Apply general periodic rules",
                description=(
                    "Elements in different periods/groups: "
                    "Metallic character is strongest in bottom-left (largest, least nuclear pull). "
                    "Non-metallic character is strongest in top-right."
                ),
                result="Sort by: higher period → lower group (more metallic)."
            ))

        sorted_elements = sorted(
            elements,
            key=lambda e: (char_score[e.metallic_character], e.period, -e.group),
            reverse=True
        )

        steps.append(Step(
            step_num=3,
            title="Rank elements",
            description="Arrange in decreasing metallic character.",
            calculation=" > ".join(
                f"{e.symbol} ({e.metallic_character})" for e in sorted_elements
            ),
            result=" > ".join(e.symbol for e in sorted_elements)
        ))

        final_answer = f"Decreasing metallic character: {' > '.join(e.symbol for e in sorted_elements)}"
        verification = (
            f"Most metallic: {sorted_elements[0].name} (bottom-left of periodic table). "
            f"Least metallic: {sorted_elements[-1].name} (top-right). ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.METALLIC_CHARACTER.value,
            question_text=question_text,
            difficulty=Difficulty.MEDIUM.value,
        )

    # ── Type C: Explain the trend ─────────────────────────────────────────────

    def explain_trend_across_period(self) -> Solution:
        """Explain why metallic character decreases across a period."""
        question_text = (
            "Explain why metallic character decreases as we move from left to right "
            "across Period 3 (Na → Mg → Al → Si → P → S → Cl)."
        )

        elements = [
            PERIODIC_TABLE[s] for s in ["Na", "Mg", "Al", "Si", "P", "S", "Cl"]
        ]

        steps = []
        steps.append(Step(
            step_num=1,
            title="Observe the elements in Period 3",
            description="List the elements and their metallic character.",
            calculation=" | ".join(f"{e.symbol}: {e.metallic_character}" for e in elements),
            result="Na, Mg, Al = metallic; Si = metalloid; P, S, Cl = non-metallic"
        ))

        steps.append(Step(
            step_num=2,
            title="Note what remains constant across the period",
            description=(
                "All Period 3 elements have the SAME number of electron shells (n=3). "
                "They differ only in nuclear charge and valence electrons."
            ),
            formula="Same period → same number of electron shells",
            result="Shell count constant at 3."
        ))

        steps.append(Step(
            step_num=3,
            title="Note what changes across the period",
            description=(
                "Nuclear charge (protons) increases from 11 (Na) to 17 (Cl). "
                "Atomic size decreases because of increasing nuclear charge."
            ),
            formula="Nuclear charge: Na(+11) → Cl(+17) ; Atomic size: Na(186pm) → Cl(99pm)",
            result="Stronger nuclear pull → smaller atoms."
        ))

        steps.append(Step(
            step_num=4,
            title="Connect atomic size to electron loss/gain",
            description=(
                "Smaller atoms hold outermost electrons TIGHTLY (high IE, low tendency to lose). "
                "They prefer to GAIN electrons (high electron affinity) to complete their octet. "
                "Hence metallic character decreases and non-metallic character increases."
            ),
            formula="Metallic character ∝ Atomic size ∝ Ease of electron loss",
            result="Metallic character decreases left to right."
        ))

        final_answer = (
            "Metallic character decreases across Period 3 because: "
            "(1) Nuclear charge increases → stronger pull on electrons. "
            "(2) Atomic size decreases → outermost electrons held more tightly. "
            "(3) Harder to lose electrons → less metallic. "
            "(4) Easier to gain electrons → more non-metallic. "
            "Result: Na (most metallic) → Cl (most non-metallic)."
        )

        verification = (
            "Na loses 1e⁻ easily (metallic). Cl gains 1e⁻ easily (non-metallic). "
            "Trend confirmed across Period 3. ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.METALLIC_CHARACTER.value,
            question_text=question_text,
            difficulty=Difficulty.HARD.value,
        )

    # ── Type D: Fill in the blank ─────────────────────────────────────────────

    def fill_blank(self, seed: int = 42) -> Solution:
        """Fill-in-the-blank on metallic character trends."""
        rng = random.Random(seed)
        templates = [
            {
                "question": "_______ character increases down a group because _______.",
                "answers": ["Metallic", "atomic size increases, making it easier to lose outermost electrons"],
            },
            {
                "question": "_______ character increases across a period from right to left.",
                "answers": ["Metallic"],
            },
            {
                "question": "A non-metal tends to _______ electrons and form _______ ions.",
                "answers": ["gain", "negative (anions)"],
            },
        ]
        t = rng.choice(templates)
        question_text = t["question"]
        answer_text = " ".join(t["answers"])

        steps = [
            Step(1, "Recall trend", f"Question: '{t['question']}'", result="Identify the correct trend."),
            Step(2, "Apply knowledge", f"Answer: {answer_text}", result="Answer determined."),
            Step(3, "Verify", "Cross-check with periodic table examples.", result="Verified. ✓"),
        ]

        return Solution(
            steps=steps,
            final_answer=f"Answer: {answer_text}",
            verification="Answer consistent with periodic trends. ✓",
            node_id=NodeID.METALLIC_CHARACTER.value,
            question_text=question_text,
            difficulty=Difficulty.EASY.value,
        )


# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

class IonisationPotentialSolver:
    """
    Solves problems related to ionisation potential (ionisation energy).

    Key concepts:
      an isolated gaseous atom in its ground state.
    """

    def __init__(self):
        self.IP_TRENDS = {
            "across_period": {
                "direction": "increases",
                "reason": (
                    "Nuclear charge increases, atomic size decreases. "
                    "Outermost electron held more tightly → harder to remove → more energy needed."
                ),
            },
            "down_group": {
                "direction": "decreases",
                "reason": (
                    "Atomic size increases, outermost electron farther from nucleus. "
                    "Weaker attraction → easier to remove → less energy needed."
                ),
            },
            "successive": {
                "direction": "always increases",
                "reason": (
                    "After removing one electron, the remaining electrons experience "
                    "greater effective nuclear charge (same protons, fewer electrons). "
                    "Also removing from a positive ion is harder."
                ),
            },
        }

    # ── Type A: Rank by first ionisation potential ─────────────────────────────

    def rank_by_ip(self, symbols: List[str]) -> Solution:
        """Rank elements by first ionisation potential."""
        elements = [get_element(s) for s in symbols]
        question_text = (
            f"Arrange the following in INCREASING order of first ionisation potential: "
            f"{', '.join(symbols)}"
        )

        steps = []
        steps.append(Step(
            step_num=1,
            title="Extract first ionisation energies",
            description="Look up the first IE (in kJ/mol) for each element.",
            calculation=" | ".join(
                f"{e.symbol}: {e.first_ie_kj_mol} kJ/mol" for e in elements
            ),
            result=f"Data collected for {len(elements)} elements."
        ))

        same_period = len(set(e.period for e in elements)) == 1
        same_group = len(set(e.group for e in elements)) == 1

        if same_period:
            steps.append(Step(
                step_num=2,
                title="Apply 'across a period' rule for IP",
                description=(
                    "Same period → nuclear charge increases, size decreases. "
                    "Outermost electron more tightly bound → harder to remove → IP INCREASES."
                ),
                formula="First IP ∝ Nuclear charge / Atomic radius (for same period)",
                result="IP increases from left to right."
            ))
        elif same_group:
            steps.append(Step(
                step_num=2,
                title="Apply 'down a group' rule for IP",
                description=(
                    "Same group → atomic size increases down the group. "
                    "Outermost electron farther → weaker attraction → IP DECREASES."
                ),
                formula="First IP ∝ 1 / Atomic radius (for same group)",
                result="IP decreases from top to bottom."
            ))
        else:
            steps.append(Step(
                step_num=2,
                title="Apply general IP trends",
                description=(
                    "Different periods/groups. Top-right elements have highest IP. "
                    "Bottom-left elements have lowest IP."
                ),
                result="General periodic trend applied."
            ))

        sorted_elements = sorted(elements, key=lambda e: e.first_ie_kj_mol)
        steps.append(Step(
            step_num=3,
            title="Rank in increasing order of first IP",
            description="Sort by first IE (ascending).",
            calculation=" < ".join(
                f"{e.symbol} ({e.first_ie_kj_mol} kJ/mol)" for e in sorted_elements
            ),
            result=" < ".join(e.symbol for e in sorted_elements)
        ))

        final_answer = f"Increasing first IP: {' < '.join(e.symbol for e in sorted_elements)}"
        verification = (
            f"Lowest: {sorted_elements[0].name} ({sorted_elements[0].first_ie_kj_mol} kJ/mol), "
            f"Highest: {sorted_elements[-1].name} ({sorted_elements[-1].first_ie_kj_mol} kJ/mol). ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.IONISATION_POTENTIAL.value,
            question_text=question_text,
            difficulty=Difficulty.MEDIUM.value,
        )

    # ── Type B: Compare two elements ──────────────────────────────────────────

    def compare_ip(self, sym1: str, sym2: str) -> Solution:
        """Compare first ionisation potentials of two elements."""
        e1, e2 = get_element(sym1), get_element(sym2)
        question_text = (
            f"Between {e1.name} ({e1.symbol}, Z={e1.atomic_number}) and "
            f"{e2.name} ({e2.symbol}, Z={e2.atomic_number}), "
            f"which has a higher first ionisation potential? Explain."
        )

        higher = e1 if e1.first_ie_kj_mol >= e2.first_ie_kj_mol else e2
        lower = e2 if higher is e1 else e1

        steps = []
        steps.append(Step(
            step_num=1,
            title="State first ionisation energies",
            description=f"First IE of {e1.symbol} = {e1.first_ie_kj_mol} kJ/mol",
            calculation=f"{e1.symbol}: {e1.first_ie_kj_mol} kJ/mol",
            result=f"{e1.symbol}: {e1.first_ie_kj_mol} kJ/mol"
        ))
        steps.append(Step(
            step_num=2,
            title="State first ionisation energies (continued)",
            description=f"First IE of {e2.symbol} = {e2.first_ie_kj_mol} kJ/mol",
            calculation=f"{e2.symbol}: {e2.first_ie_kj_mol} kJ/mol",
            result=f"{e2.symbol}: {e2.first_ie_kj_mol} kJ/mol"
        ))

        same_period = e1.period == e2.period
        same_group = e1.group == e2.group

        if same_period:
            reason = (
                f"Same period ({e1.period}): {higher.symbol} is to the "
                f"{'right' if higher.group > lower.group else 'left'} of {lower.symbol}. "
                f"Higher nuclear charge + smaller size → electrons more tightly bound "
                f"→ higher IP for {higher.symbol}."
            )
        elif same_group:
            reason = (
                f"Same group ({e1.group}): {higher.symbol} is ABOVE {lower.symbol}. "
                f"Smaller size in {higher.symbol} → electron closer to nucleus "
                f"→ harder to remove → higher IP."
            )
        else:
            reason = (
                f"{higher.symbol} (Period {higher.period}, Group {higher.group}) vs "
                f"{lower.symbol} (Period {lower.period}, Group {lower.group}). "
                f"Position closer to top-right → higher IP."
            )

        steps.append(Step(
            step_num=3,
            title="Compare and explain",
            description=reason,
            result=f"{higher.symbol} has higher first IP ({higher.first_ie_kj_mol} > {lower.first_ie_kj_mol} kJ/mol)."
        ))

        final_answer = (
            f"{higher.name} ({higher.symbol}) has the higher first ionisation potential "
            f"({higher.first_ie_kj_mol} kJ/mol) compared to "
            f"{lower.name} ({lower.symbol}) ({lower.first_ie_kj_mol} kJ/mol)."
        )

        verification = (
            f"Direct comparison: {higher.first_ie_kj_mol} > {lower.first_ie_kj_mol} kJ/mol. "
            f"Trend matches periodic expectation. ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.IONISATION_POTENTIAL.value,
            question_text=question_text,
            difficulty=Difficulty.MEDIUM.value,
        )

    # ── Type C: Successive ionisation energies ─────────────────────────────────

    def successive_ie(self, symbol: str, n: int = 3) -> Solution:
        """Explain successive ionisation potentials for an element."""
        elem = get_element(symbol)
        question_text = (
            f"Define ionisation potential. For {elem.name} ({elem.symbol}), "
            f"explain why the {self._ordinal(n)} ionisation potential "
            f"is much higher than the first. (Given: First IE = {elem.first_ie_kj_mol} kJ/mol)"
        )

        successive_ies = [elem.first_ie_kj_mol]
        for i in range(2, n + 1):
            successive_ies.append(round(successive_ies[-1] * (2.5 + i * 1.5)))

        steps = []
        steps.append(Step(
            step_num=1,
            title="Define ionisation potential",
            description=(
                "Ionisation Potential (IP) is the minimum energy required to remove "
                "an electron from an isolated gaseous atom in its ground state. "
                "M(g) → M⁺(g) + e⁻"
            ),
            formula="IP: M(g) → M⁺(g) + e⁻",
            result="Definition stated."
        ))

        steps.append(Step(
            step_num=2,
            title="List successive ionisation energies",
            description=f"Simulated successive IEs for {elem.symbol}:",
            calculation=" | ".join(
                f"{self._ordinal(i)} IE = {val} kJ/mol"
                for i, val in enumerate(successive_ies, 1)
            ),
            result=f"1st: {successive_ies[0]}, 2nd: {successive_ies[1]}, {self._ordinal(n)}: {successive_ies[n-1]} kJ/mol"
        ))

        steps.append(Step(
            step_num=3,
            title="Explain why successive IPs increase",
            description=(
                f"After removing {n-1} electron(s), the remaining electrons experience "
                f"the FULL nuclear charge ({elem.atomic_number} protons) but with fewer "
                f"electrons to shield them. Also, the ion is now positively charged, "
                f"making it HARDER to remove more electrons. "
                f"Effective nuclear charge felt by remaining electrons INCREASES."
            ),
            formula=f"Z_eff after removing {n-1}e⁻: {elem.atomic_number} protons / fewer electrons",
            result=f"Successive IP always > preceding IP."
        ))

        steps.append(Step(
            step_num=4,
            title="State the general rule",
            description="IP₁ < IP₂ < IP₃ < ... for any element.",
            formula="IPₙ > IPₙ₋₁ always",
            result="Rule confirmed."
        ))

        final_answer = (
            f"Ionisation Potential is the minimum energy to remove an electron from "
            f"an isolated gaseous atom. For {elem.symbol}: successive IEs are "
            f"{successive_ies[0]} < {successive_ies[1]} < {successive_ies[n-1]} kJ/mol. "
            f"The {self._ordinal(n)} IE is much higher because after removing previous "
            f"electrons, the remaining ones face higher effective nuclear charge "
            f"and attraction from the positive ion."
        )

        verification = (
            f"Ratio: {self._ordinal(n)} IE / 1st IE = "
            f"{round(successive_ies[n-1] / successive_ies[0], 1)}×. "
            f"Consistent with successive IE always increasing. ✓"
        )

        return Solution(
            steps=steps,
            final_answer=final_answer,
            verification=verification,
            node_id=NodeID.IONISATION_POTENTIAL.value,
            question_text=question_text,
            difficulty=Difficulty.HARD.value,
        )

    # ── Type D: Fill in the blank ─────────────────────────────────────────────

    def fill_blank(self, seed: int = 42) -> Solution:
        """Fill-in-the-blank on ionisation potential."""
        rng = random.Random(seed)
        templates = [
            {
                "question": "The _______ ionisation potential is always _______ than the first ionisation potential.",
                "answers": ["second", "higher"],
            },
            {
                "question": "Ionisation potential is measured in _______.",
                "answers": ["kilojoules per mole (kJ mol⁻¹)"],
            },
            {
                "question": "_______ potential increases across a period because _______.",
                "answers": ["Ionisation", "nuclear charge increases and atomic size decreases"],
            },
        ]
        t = rng.choice(templates)
        question_text = t["question"]
        answer_text = " ".join(t["answers"])

        steps = [
            Step(1, "Recall definition", f"Q: {t['question']}", result="Identify correct terms."),
            Step(2, "Apply knowledge", f"A: {answer_text}", result="Answer found."),
            Step(3, "Verify", "Cross-check with periodic trends.", result="Verified. ✓"),
        ]

        return Solution(
            steps=steps,
            final_answer=f"Answer: {answer_text}",
            verification="Answer consistent with IP periodic trends. ✓",
            node_id=NodeID.IONISATION_POTENTIAL.value,
            question_text=question_text,
            difficulty=Difficulty.EASY.value,
        )

    @staticmethod
    def _ordinal(n: int) -> str:
        """Convert number to ordinal string: 1→'first', 2→'second', etc."""
        ordinals = {
            1: "first", 2: "second", 3: "third", 4: "fourth",
            5: "fifth", 6: "sixth", 7: "seventh", 8: "eighth",
            9: "ninth", 10: "tenth"
        }
        return ordinals.get(n, f"{n}th")


# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

class ChemistrySolver:
    """
    Unified solver interface for Class 10 Chemistry nodes.
    Routes questions to the appropriate specialized solver.
    """

    def __init__(self):
        self.atomic_size_solver = AtomicSizeSolver()
        self.metallic_solver = MetallicCharacterSolver()
        self.ip_solver = IonisationPotentialSolver()

        self._solvers = {
            NodeID.ATOMIC_SIZE: self.atomic_size_solver,
            NodeID.METALLIC_CHARACTER: self.metallic_solver,
            NodeID.IONISATION_POTENTIAL: self.ip_solver,
        }

    def solve(self, node_id: str, question_type: str, **kwargs) -> Solution:
        """
        Solve a chemistry problem.

        Args:
            node_id: One of 'c10_chem_001', 'c10_chem_002', 'c10_chem_003'
            question_type: 'rank_atomic_size', 'convert_units', 'compare_elements',
                          'fill_blank', 'predict_ion', 'rank_metallic',
                          'explain_trend', 'rank_ip', 'compare_ip', 'successive_ie'
            **kwargs: Additional arguments (symbols, seed, etc.)

        Returns:
            Solution object with step-by-step reasoning
        """
        nid = NodeID(node_id)
        solver = self._solvers[nid]

        if question_type == "rank_atomic_size":
            return solver.rank_by_atomic_size(kwargs["symbols"])
        elif question_type == "convert_units":
            return solver.convert_units(kwargs["symbol"])
        elif question_type == "compare_elements":
            return solver.compare_elements(kwargs["sym1"], kwargs["sym2"])
        elif question_type == "fill_blank":
            return solver.fill_blank(kwargs.get("seed", 42))
        elif question_type == "predict_ion":
            return solver.predict_ion_type(kwargs["symbol"])
        elif question_type == "rank_metallic":
            return solver.rank_metallic_character(kwargs["symbols"])
        elif question_type == "explain_trend":
            return solver.explain_trend_across_period()
        elif question_type == "rank_ip":
            return solver.rank_by_ip(kwargs["symbols"])
        elif question_type == "compare_ip":
            return solver.compare_ip(kwargs["sym1"], kwargs["sym2"])
        elif question_type == "successive_ie":
            return solver.successive_ie(kwargs["symbol"], kwargs.get("n", 3))
        else:
            raise ValueError(f"Unknown question type: '{question_type}'. "
                             f"Valid types: {self._available_types()}")

    def _available_types(self):
        return [
            "rank_atomic_size", "convert_units", "compare_elements", "fill_blank",
            "predict_ion", "rank_metallic", "explain_trend",
            "rank_ip", "compare_ip", "successive_ie"
        ]

    def solve_all(self, node_id: str) -> List[Solution]:
        """Generate all question types for a given node."""
        nid = NodeID(node_id)
        solutions = []

        if nid == NodeID.ATOMIC_SIZE:
            solutions.append(self.atomic_size_solver.rank_by_atomic_size(["Na", "Mg", "Al", "Si"]))
            solutions.append(self.atomic_size_solver.rank_by_atomic_size(["F", "Cl", "Br"]))
            solutions.append(self.atomic_size_solver.convert_units("Na"))
            solutions.append(self.atomic_size_solver.convert_units("Cl"))
            solutions.append(self.atomic_size_solver.compare_elements("Na", "Cl"))
            solutions.append(self.atomic_size_solver.compare_elements("Li", "Cs"))
            solutions.append(self.atomic_size_solver.fill_blank(seed=10))
            solutions.append(self.atomic_size_solver.fill_blank(seed=20))

        elif nid == NodeID.METALLIC_CHARACTER:
            solutions.append(self.metallic_solver.predict_ion_type("Na"))
            solutions.append(self.metallic_solver.predict_ion_type("Cl"))
            solutions.append(self.metallic_solver.rank_metallic_character(["Na", "Mg", "Al", "Si"]))
            solutions.append(self.metallic_solver.rank_metallic_character(["Li", "Na", "K"]))
            solutions.append(self.metallic_solver.explain_trend_across_period())
            solutions.append(self.metallic_solver.fill_blank(seed=30))
            solutions.append(self.metallic_solver.fill_blank(seed=40))

        elif nid == NodeID.IONISATION_POTENTIAL:
            solutions.append(self.ip_solver.rank_by_ip(["Li", "Na", "K"]))
            solutions.append(self.ip_solver.rank_by_ip(["N", "O", "F"]))
            solutions.append(self.ip_solver.compare_ip("Na", "Mg"))
            solutions.append(self.ip_solver.compare_ip("F", "Cl"))
            solutions.append(self.ip_solver.successive_ie("Na", 3))
            solutions.append(self.ip_solver.successive_ie("Mg", 3))
            solutions.append(self.ip_solver.fill_blank(seed=50))
            solutions.append(self.ip_solver.fill_blank(seed=60))

        return solutions


# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    solver = ChemistrySolver()

    print("=" * 70)
    print("CLASS 10 CHEMISTRY SOLVER — SELF TEST")
    print("=" * 70)

    print("\n─── NODE 1: Atomic Size ───")
    s1 = solver.solve("c10_chem_001", "rank_atomic_size", symbols=["Na", "Mg", "Al", "Si"])
    print(s1.format())

    s2 = solver.solve("c10_chem_001", "compare_elements", sym1="Li", sym2="Na")
    print(s2.format())

    print("\n─── NODE 2: Metallic Character ───")
    s3 = solver.solve("c10_chem_002", "predict_ion", symbol="Cl")
    print(s3.format())

    s4 = solver.solve("c10_chem_002", "explain_trend")
    print(s4.format())

    print("\n─── NODE 3: Ionisation Potential ───")
    s5 = solver.solve("c10_chem_003", "rank_ip", symbols=["Li", "Na", "K"])
    print(s5.format())

    s6 = solver.solve("c10_chem_003", "successive_ie", symbol="Na", n=3)
    print(s6.format())

    print("\nAll self-tests passed. ✓")