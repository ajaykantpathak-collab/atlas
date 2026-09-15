import numpy as np
import random
import math
import dataclasses
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Any
from enum import Enum, auto
import sympy as sp


# ============================================================
# ENUMS & DATACLASSES
# ============================================================

class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

class CompetencyLevel(Enum):
    BOARD = "Board"
    COMPETENCY = "Competency"

class Section(Enum):
    PERIODIC_PROPERTIES = 1
    CHEMICAL_BONDING = 2
    ACIDS_BASES_SALTS = 3
    ANALYTICAL_CHEMISTRY = 4
    METALLURGY = 5
    HYDROGEN = 6
    CARBON_COMPOUNDS = 7
    PRACTICAL_CHEMISTRY = 8

class QuestionType(Enum):
    MCQ_SINGLE = "MCQ_Single"
    MCQ_MULTI = "MCQ_Multi"
    FILL_BLANK = "Fill_Blank"
    TRUE_FALSE = "True_False"
    SHORT_ANSWER = "Short_Answer"
    NUMERICAL = "Numerical"
    MATCHING = "Matching"
    ASSERTION_REASON = "Assertion_Reason"
    LONG_ANSWER = "Long_Answer"
    DIAGRAM = "Diagram"

@dataclass
class MCQOption:
    label: str
    text: str
    is_correct: bool

@dataclass
class Question:
    question_id: str
    node_id: str
    section: int
    topic: str
    question_type: str
    difficulty: str
    competency: str
    question_text: str
    options: List[MCQOption] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    step_by_step: List[str] = field(default_factory=list)
    verification: str = ""
    marks: int = 1
    vocabulary_words: List[str] = field(default_factory=list)
    board_relevance: str = "Board_Only"
    indian_context: bool = False
    common_misconception: str = ""
    seed_used: int = 0


# ============================================================
# SEEDED RANDOM WRAPPER
# ============================================================

class SeededRandom:
    """Deterministic PRNG wrapper using numpy with module-level seed."""

    def __init__(self, seed: int = 42):
        self._seed = seed
        self._rng = np.random.RandomState(seed)
        self._counter = 0

    def advance(self):
        self._counter += 1
        return self._rng.randint(0, 2**31 - 1)

    def randint(self, a: int, b: int) -> int:
        return self._rng.randint(a, b + 1)

    def choice(self, seq: list):
        idx = self._rng.randint(0, len(seq) - 1)
        return seq[idx]

    def shuffle(self, seq: list):
        self._rng.shuffle(seq)
        return seq

    def uniform(self, a: float, b: float) -> float:
        return self._rng.uniform(a, b)

    def sample(self, seq: list, k: int) -> list:
        idxs = self._rng.choice(len(seq), size=min(k, len(seq)), replace=False)
        return [seq[i] for i in sorted(idxs)]

    def bool(self, p: float = 0.5) -> bool:
        return self._rng.random() < p


# ============================================================
# PERIODIC TABLE DATA
# ============================================================

PERIODIC_TABLE = {
    1: ("H", "Hydrogen", 1, 1, 1.008),
    2: ("He", "Helium", 18, 1, 4.003),
    3: ("Li", "Lithium", 1, 2, 6.941),
    4: ("Be", "Beryllium", 2, 2, 9.012),
    5: ("B", "Boron", 13, 2, 10.81),
    6: ("C", "Carbon", 14, 2, 12.01),
    7: ("N", "Nitrogen", 15, 2, 14.01),
    8: ("O", "Oxygen", 16, 2, 16.00),
    9: ("F", "Fluorine", 17, 2, 18.998),
    10: ("Ne", "Neon", 18, 2, 20.18),
    11: ("Na", "Sodium", 1, 3, 22.99),
    12: ("Mg", "Magnesium", 2, 3, 24.305),
    13: ("Al", "Aluminium", 13, 3, 26.982),
    14: ("Si", "Silicon", 14, 3, 28.085),
    15: ("P", "Phosphorus", 15, 3, 30.974),
    16: ("S", "Sulphur", 16, 3, 32.065),
    17: ("Cl", "Chlorine", 17, 3, 35.453),
    18: ("Ar", "Argon", 18, 3, 39.948),
    19: ("K", "Potassium", 1, 4, 39.098),
    20: ("Ca", "Calcium", 2, 4, 40.078),
    21: ("Sc", "Scandium", 3, 4, 44.956),
    22: ("Ti", "Titanium", 4, 4, 47.867),
    23: ("V", "Vanadium", 5, 4, 50.942),
    24: ("Cr", "Chromium", 6, 4, 51.996),
    25: ("Mn", "Manganese", 7, 4, 54.938),
    26: ("Fe", "Iron", 8, 4, 55.845),
    27: ("Co", "Cobalt", 9, 4, 58.933),
    28: ("Ni", "Nickel", 10, 4, 58.693),
    29: ("Cu", "Copper", 11, 4, 63.546),
    30: ("Zn", "Zinc", 12, 4, 65.38),
    31: ("Ga", "Gallium", 13, 4, 69.723),
    32: ("Ge", "Germanium", 14, 4, 72.63),
    33: ("As", "Arsenic", 15, 4, 74.922),
    34: ("Se", "Selenium", 16, 4, 78.971),
    35: ("Br", "Bromine", 17, 4, 79.904),
    36: ("Kr", "Krypton", 18, 4, 83.798),
}

ELECTRONEGATIVITY = {
    1: 2.20, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55,
    7: 3.04, 8: 3.44, 9: 3.98, 11: 0.93, 12: 1.31,
    13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16,
    19: 0.82, 20: 1.00, 26: 1.83, 29: 1.90, 30: 1.65,
    35: 2.96, 53: 2.66
}

IONISATION_ENERGIES = {
    1: 1312, 2: 2372, 3: 520, 4: 900, 5: 801,
    6: 1086, 7: 1402, 8: 1314, 9: 1681, 10: 2081,
    11: 496, 12: 738, 13: 578, 14: 787, 15: 1012,
    16: 999, 17: 1251, 18: 1521, 19: 419, 20: 590,
    26: 762, 29: 745, 30: 906, 35: 1140
}

ATOMIC_RADII = {
    1: 53, 3: 167, 4: 112, 5: 87, 6: 67,
    7: 56, 8: 48, 9: 42, 11: 190, 12: 145,
    13: 118, 14: 111, 15: 98, 16: 88, 17: 79,
    19: 243, 20: 194, 26: 156, 29: 138, 30: 134,
    35: 94
}

# Common anions for ICSE
ANIONS = {
    "chloride": ("Cl", -1),
    "sulphate": ("SO4", -2),
    "nitrate": ("NO3", -1),
    "carbonate": ("CO3", -2),
    "hydroxide": ("OH", -1),
    "sulphite": ("SO3", -2),
    "phosphate": ("PO4", -3),
    "acetate": ("CH3COO", -1),
    "bicarbonate": ("HCO3", -1),
    "nitrite": ("NO2", -1),
}

CATIONS = {
    "sodium": ("Na", 1),
    "potassium": ("K", 1),
    "calcium": ("Ca", 2),
    "magnesium": ("Mg", 2),
    "ammonium": ("NH4", 1),
    "zinc": ("Zn", 2),
    "iron(II)": ("Fe", 2),
    "iron(III)": ("Fe", 3),
    "copper(II)": ("Cu", 2),
    "aluminium": ("Al", 3),
}

ACIDS = [
    {"name": "Hydrochloric acid", "formula": "HCl", "type": "mineral", "basicity": 1},
    {"name": "Sulphuric acid", "formula": "H2SO4", "type": "mineral", "basicity": 2},
    {"name": "Nitric acid", "formula": "HNO3", "type": "mineral", "basicity": 1},
    {"name": "Carbonic acid", "formula": "H2CO3", "type": "mineral", "basicity": 2},
    {"name": "Acetic acid", "formula": "CH3COOH", "type": "organic", "basicity": 1},
    {"name": "Phosphoric acid", "formula": "H3PO4", "type": "mineral", "basicity": 3},
]

BASES = [
    {"name": "Sodium hydroxide", "formula": "NaOH", "type": "strong"},
    {"name": "Potassium hydroxide", "formula": "KOH", "type": "strong"},
    {"name": "Calcium hydroxide", "formula": "Ca(OH)2", "type": "strong"},
    {"name": "Ammonium hydroxide", "formula": "NH4OH", "type": "weak"},
    {"name": "Magnesium hydroxide", "formula": "Mg(OH)2", "type": "weak"},
    {"name": "Zinc hydroxide", "formula": "Zn(OH)2", "type": "amphoteric"},
]

INDICATORS = [
    {"name": "Litmus", "color_acid": "Red", "color_base": "Blue"},
    {"name": "Phenolphthalein", "color_acid": "Colourless", "color_base": "Pink"},
    {"name": "Methyl orange", "color_acid": "Red", "color_base": "Yellow"},
    {"name": "Universal indicator", "color_acid": "Red", "color_base": "Blue"},
]

REAGENTS = {
    "dilute_HCl": {
        "tests": [
            ("carbonate", "CO2 gas with effervescence → lime water turns milky"),
            ("sulphite", "SO2 gas → smell of burning sulphur"),
            ("nitrate", "NO gas with FeSO4 + H2SO4 → brown ring"),
        ]
    },
    "dilute_HNO3": {
        "tests": [
            ("carbonate", "CO2 gas with effervescence"),
            ("sulphite", "SO2 gas with smell"),
            ("chloride", "white ppt with AgNO3, soluble in NH4OH"),
        ]
    },
    "BaCl2": {
        "tests": [
            ("sulphate", "white ppt insoluble in dilute acids"),
            ("sulphite", "white ppt soluble in dilute HCl"),
            ("carbonate", "white ppt soluble in dilute HCl"),
        ]
    },
    "AgNO3": {
        "tests": [
            ("chloride", "white ppt, soluble in NH4OH"),
            ("bromide", "pale yellow ppt, partially soluble in NH4OH"),
            ("iodide", "yellow ppt, insoluble in NH4OH"),
        ]
    },
    "NaOH_warm": {
        "tests": [
            ("ammonium", "NH3 gas with pungent smell → turns red litmus blue"),
            ("copper(II)", "blue ppt"),
            ("iron(II)", "greenish brown ppt"),
            ("iron(III)", "reddish brown ppt"),
            ("zinc", "white ppt soluble in excess NaOH"),
            ("lead(II)", "white ppt soluble in excess NaOH"),
            ("calcium", "white ppt, insoluble in excess"),
        ]
    },
    "NH4OH": {
        "tests": [
            ("copper(II)", "deep blue soluble complex"),
            ("iron(III)", "reddish brown ppt"),
            ("zinc", "white ppt soluble in excess"),
        ]
    },
    "flame_test": {
        "tests": [
            ("sodium", "golden yellow flame"),
            ("potassium", "lilac flame"),
            ("calcium", "brick red flame"),
            ("barium", "apple green flame"),
            ("copper", "bluish green flame"),
        ]
    },
    "Pb(NO3)2": {
        "tests": [
            ("iodide", "bright yellow ppt"),
            ("chromate", "yellow ppt"),
            ("sulphate", "white ppt"),
        ]
    },
}
