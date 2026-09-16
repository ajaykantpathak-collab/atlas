"""
Deterministic Solver for Class 7 Biology (Plant Tissues)
Covers 3 nodes: Meristematic Tissue, Simple Permanent Tissues, Complex Permanent Tissues
"""
import random
import dataclasses
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional, Dict, Tuple
import json

# ─── Enums ────────────────────────────────────────────────────────────────────
class NodeID(Enum):
    C7_BIO_001 = "c7_bio_001"
    C7_BIO_002 = "c7_bio_002"
    C7_BIO_003 = "c7_bio_003"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    TRUE_FALSE = "true_false"
    MATCH = "match"
    SHORT_ANSWER = "short_answer"

class CompetencyLevel(Enum):
    BOARD = "Board"
    ABOVE_BOARD = "Above_Board"

# ─── Data Models ──────────────────────────────────────────────────────────────
@dataclass
class Question:
    qid: str
    node_id: str
    topic: str
    difficulty: str
    q_type: str
    question_text: str
    options: Optional[List[str]] = None          # for MCQ
    correct_answer: str = ""
    explanation: str = ""
    hint: str = ""
    competency: str = "Board"
    marks: int = 1
    tags: List[str] = field(default_factory=list)

@dataclass
class QuizResult:
    node_id: str
    total: int
    correct: int
    answers: Dict[str, str]
    question_list: List[Question]
    mastery_score: float = 0.0

# ─── Knowledge Base ────────────────────────────────────────────────────────────
KB = {
    # ── NODE 001: Tissue concept & Meristematic tissue ─────────────────────────
    "c7_bio_001": {
        "definitions": {
            "tissue": (
                "A tissue is a group of similar cells that work together to perform "
                "a specific function in the body of a plant or animal."
            ),
            "meristematic_tissue": (
                "Meristematic tissue consists of living, actively dividing cells "
                "with thin walls, dense cytoplasm, and large nuclei. It is responsible "
                "for the growth of the plant."
            ),
            "differentiation": (
                "The process by which meristematic cells lose their ability to divide "
                "and become specialized to perform a specific function is called "
                "differentiation."
            ),
            "permanent_tissue": (
                "Permanent tissue is made of cells that have stopped dividing and "
                "have become specialized to carry out a specific function."
            ),
        },
        "classification": {
            "plant_tissues": ["Meristematic tissue", "Permanent tissue"],
            "meristematic_types": {
                "apical": "Located at the tips of roots and shoots; responsible for increase in length.",
                "lateral": "Located along the sides (cambium); responsible for increase in girth (thickness).",
                "intercalary": "Located at the base of leaves or internodes (nodes); helps regrow damaged parts.",
            },
        },
        "meristematic_chars": [
            "Cells are living",
            "Cell walls are thin",
            "Cytoplasm is dense",
            "Nucleus is large",
            "Cells continuously divide",
            "Vacuoles are small or absent",
            "Cells are immature and unspecialized",
        ],
        "comparison_meristematic_vs_permanent": {
            "meristematic": {
                "division": "Cells keep dividing",
                "vacuole": "Small or absent",
                "wall": "Thin",
                "function": "Growth",
                "life": "Living",
            },
            "permanent": {
                "division": "Cells have stopped dividing",
                "vacuole": "Large",
                "wall": "May be thin or thick",
                "function": "Specific (storage, support, transport)",
                "life": "Living or dead",
            },
        },
        "key_facts": [
            "Meristematic tissue gives rise to permanent tissue through differentiation.",
            "Apical meristem is at root and shoot tips.",
            "Lateral meristem (cambium) increases girth.",
            "Intercalary meristem is found at nodes (base of leaves).",
            "All meristematic cells are living.",
        ],
    },

    # ── NODE 002: Simple permanent tissues ──────────────────────────────────────
    "c7_bio_002": {
        "parenchyma": {
            "full_name": "Parenchyma",
            "alive": True,
            "wall": "Thin",
            "shape": "Loosely packed, oval or spherical",
            "vacuole": "Large central vacuole",
            "intercellular_space": "Large",
            "location": "Leaves, stems, roots, fruits (soft parts)",
            "function": [
                "Storage of food (starch, oils)",
                "Photosynthesis (when containing chloroplasts = chlorenchyma)",
                "Provides support and buoyancy (aerenchyma in aquatic plants)",
            ],
            "examples": ["Pulp of fruits", "Soft stems", "Leaf mesophyll", "Potato tuber"],
            "variations": {
                "chlorenchyma": "Parenchyma with chloroplasts; performs photosynthesis.",
                "aerenchyma": "Parenchyma with large air spaces; found in aquatic plants for buoyancy.",
            },
        },
        "collenchyma": {
            "full_name": "Collenchyma",
            "alive": True,
            "wall": "Thickened at corners (cellulose and pectin)",
            "shape": "Elongated, unevenly thickened",
            "vacuole": "Present",
            "intercellular_space": "Small",
            "location": "Leaf stalks (petioles), young stems, around vascular bundles",
            "function": [
                "Provides flexible mechanical support",
                "Allows bending without breaking",
            ],
            "examples": ["Leaf stalks of plants", "Stems of climbers (e.g., cucumber)", "Strings of celery"],
            "key_feature": "Thickened corners make it strong yet flexible.",
        },
        "sclerenchyma": {
            "full_name": "Sclerenchyma",
            "alive": False,
            "wall": "Thick, lignified (hard and rigid)",
            "shape": "Long and narrow (fibers) or irregular (sclereids)",
            "vacuole": "Absent (cells are dead at maturity)",
            "intercellular_space": "None",
            "location": "Veins of leaves, seed coats, nut shells, vascular bundles, coconut husk",
            "function": [
                "Provides strength and rigidity",
                "Makes plant parts hard and tough",
            ],
            "examples": ["Coconut husk (fibers)", "Nut shells (sclereids)", "Jute fibers", "Grits in pear fruit"],
            "types": {
                "fibers": "Long, thick-walled cells; used for making ropes, textiles.",
                "sclereids": "Stone cells; variable shape; found in nutshells and fruit walls.",
            },
            "key_feature": "Lignin deposition makes walls impermeable and extremely strong.",
        },
        "comparison_chart": {
            "tissue": ["Parenchyma", "Collenchyma", "Sclerenchyma"],
            "alive_at_maturity": ["Yes", "Yes", "No"],
            "wall_thickness": ["Thin", "Thick at corners", "Very thick (lignified)"],
            "location": ["Soft parts", "Leaf stalks, young stems", "Nutshells, veins, husk"],
            "function": ["Storage, photosynthesis", "Flexible support", "Rigid strength"],
        },
        "key_facts": [
            "All three simple permanent tissues originate from meristematic tissue.",
            "Parenchyma is the most common and least specialized simple permanent tissue.",
            "Collenchyma provides support only in growing (young) parts.",
            "Sclerenchyma cells are dead at maturity.",
            "Lignin is a chemical that hardens cell walls.",
        ],
    },

    # ── NODE 003: Complex permanent tissues (xylem & phloem) ────────────────────
    "c7_bio_003": {
        "xylem": {
            "full_name": "Xylem",
            "direction": "Upward (roots → shoots → leaves)",
            "transports": "Water and dissolved minerals",
            "living_cells": "Only xylem parenchyma is living; others are dead at maturity.",
            "components": {
                "tracheids": {
                    "alive": False,
                    "description": "Long, tubular, dead cells with tapered ends; water moves through them.",
                },
                "vessels": {
                    "alive": False,
                    "description": "Long, wide, tube-like dead cells stacked end-to-end; form continuous pipes.",
                },
                "xylem_fibers": {
                    "alive": False,
                    "description": "Long, thick-walled dead cells; provide support.",
                },
                "xylem_parenchyma": {
                    "alive": True,
                    "description": "Living cells; store food and help in water storage.",
                },
            },
            "key_fact": "Xylem is like a water pipe system carrying water from roots upward.",
        },
        "phloem": {
            "full_name": "Phloem",
            "direction": "Bidirectional (can move up or down as needed)",
            "transports": "Food (sugars/organic nutrients) from leaves to all parts",
            "living_cells": "All phloem cells are living except phloem fibers.",
            "components": {
                "sieve_tubes": {
                    "alive": True,
                    "description": "Long tube-like cells with perforated end walls (sieve plates); transport food.",
                    "note": "Nucleus is absent at maturity but cells remain alive.",
                },
                "companion_cells": {
                    "alive": True,
                    "description": "Narrow cells closely associated with sieve tubes; help regulate food transport.",
                },
                "phloem_fibers": {
                    "alive": False,
                    "description": "Long, thick-walled dead cells; provide support to phloem.",
                },
                "phloem_parenchyma": {
                    "alive": True,
                    "description": "Living cells; store and help in food transport.",
                },
            },
            "key_fact": "Phloem is like a food delivery truck that can go in any direction.",
        },
        "xylem_vs_phloem": {
            "xylem": {
                "direction": "Upward only",
                "transports": "Water and minerals",
                "cells_alive": "Mostly dead",
                "components": "Tracheids, vessels, fibers, parenchyma",
            },
            "phloem": {
                "direction": "Both directions",
                "transports": "Food (sugars)",
                "cells_alive": "Mostly living",
                "components": "Sieve tubes, companion cells, fibers, parenchyma",
            },
        },
        "key_facts": [
            "Xylem and phloem together form vascular bundles.",
            "Xylem is located toward the center; phloem toward the outside in stems.",
            "Cambium is a lateral meristem between xylem and phloem that produces new cells.",
            "Sieve plates are the perforated end walls of sieve tube cells.",
            "Companion cells are unique to angiosperms (flowering plants).",
        ],
    },
}

# ─── Question Banks ────────────────────────────────────────────────────────────
QUESTION_BANK = {
    # ── NODE 001 ────────────────────────────────────────────────────────────────
    "c7_bio_001": {
        "mcq": [
            {
                "difficulty": "easy",
                "text": "A tissue is best defined as:",
                "options": [
                    "A group of different organs working together",
                    "A group of similar cells performing a specific function",
                    "A single cell that performs many functions",
                    "A collection of different types of cells",
                ],
                "answer": "B",
                "explanation": "A tissue is a group of similar cells that work together to perform one specific function.",
                "tags": ["definition", "tissue"],
            },
            {
                "difficulty": "easy",
                "text": "Plant tissues are classified into how many main types?",
                "options": ["Two", "Three", "Four", "Five"],
                "answer": "A",
                "explanation": "Plant tissues are classified into two main types: meristematic tissue and permanent tissue.",
                "tags": ["classification"],
            },
            {
                "difficulty": "medium",
                "text": "Which of the following is NOT a characteristic of meristematic tissue?",
                "options": [
                    "Cells are living",
                    "Cells have thick cell walls",
                    "Cells have large nuclei",
                    "Cells continuously divide",
                ],
                "answer": "B",
                "explanation": "Meristematic cells have thin cell walls, not thick walls. Thick walls are a feature of sclerenchyma.",
                "tags": ["meristematic", "characteristics"],
            },
            {
                "difficulty": "medium",
                "text": "Apical meristem is found at:",
                "options": [
                    "The base of leaves",
                    "The sides of stems",
                    "The tips of roots and shoots",
                    "Inside the seed",
                ],
                "answer": "C",
                "explanation": "Apical meristem is located at the tips of roots and shoots and is responsible for increase in length.",
                "tags": ["apical", "location"],
            },
            {
                "difficulty": "medium",
                "text": "Which meristem is responsible for increasing the girth (thickness) of a plant?",
                "options": ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Root meristem"],
                "answer": "B",
                "explanation": "Lateral meristem (cambium) runs along the sides of stems and roots and increases girth/thickness.",
                "tags": ["lateral", "girth"],
            },
            {
                "difficulty": "medium",
                "text": "Intercalary meristem is found at:",
                "options": [
                    "Root tips",
                    "Shoot tips",
                    "Nodes (base of leaves)",
                    "Inside the fruit",
                ],
                "answer": "C",
                "explanation": "Intercalary meristem is located at the base of leaves or internodes (nodes). It helps regrow damaged grass after grazing or cutting.",
                "tags": ["intercalary", "location"],
            },
            {
                "difficulty": "hard",
                "text": "The process by which meristematic cells become specialized permanent cells is called:",
                "options": [
                    "Photosynthesis",
                    "Respiration",
                    "Differentiation",
                    "Osmosis",
                ],
                "answer": "C",
                "explanation": "Differentiation is the process where meristematic cells stop dividing and develop into specialized permanent tissues.",
                "tags": ["differentiation"],
            },
            {
                "difficulty": "hard",
                "text": "Which statement best describes the relationship between meristematic and permanent tissues?",
                "options": [
                    "Permanent tissue divides to form meristematic tissue",
                    "Meristematic tissue gives rise to permanent tissue through differentiation",
                    "They are completely independent of each other",
                    "Meristematic tissue is always found inside permanent tissue",
                ],
                "answer": "B",
                "explanation": "Meristematic tissue is the source of all permanent tissue; when cells stop dividing and specialize, they become permanent tissue.",
                "tags": ["relationship", "differentiation"],
            },
            {
                "difficulty": "easy",
                "text": "All meristematic cells have:",
                "options": [
                    "Thick lignified walls",
                    "Large central vacuoles",
                    "Large nuclei",
                    "No cytoplasm",
                ],
                "answer": "C",
                "explanation": "Meristematic cells have large nuclei because they are actively dividing and need genetic material for replication.",
                "tags": ["characteristics"],
            },
            {
                "difficulty": "hard",
                "text": "Which meristem helps grass to grow back after being grazed by animals?",
                "options": ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Root meristem"],
                "answer": "C",
                "explanation": "Intercalary meristem at the base of grass leaves allows rapid regrowth after grazing or mowing.",
                "tags": ["intercalary", "function"],
            },
        ],
        "fill_blank": [
            {
                "difficulty": "easy",
                "text": "A tissue is a group of ______ cells that perform a ______ function.",
                "answer": "similar; specific",
                "explanation": "By definition, a tissue is a group of similar cells that perform a specific (one) function.",
                "tags": ["definition"],
            },
            {
                "difficulty": "easy",
                "text": "Plant tissues are broadly classified into ______ and ______ tissues.",
                "answer": "meristematic; permanent",
                "explanation": "The two main categories of plant tissues are meristematic (actively dividing) and permanent (specialized).",
                "tags": ["classification"],
            },
            {
                "difficulty": "medium",
                "text": "______ meristem is found at the tips of roots and shoots.",
                "answer": "Apical",
                "explanation": "Apical meristem is located at the tips of roots and shoots and increases the length of the plant.",
                "tags": ["apical"],
            },
            {
                "difficulty": "medium",
                "text": "______ meristem increases the girth (thickness) of stems and roots.",
                "answer": "Lateral",
                "explanation": "Lateral meristem (cambium) is responsible for secondary growth — increasing girth.",
                "tags": ["lateral"],
            },
            {
                "difficulty": "medium",
                "text": "The process by which meristematic cells become permanent is called ______.",
                "answer": "differentiation",
                "explanation": "Differentiation is the process of specialization where dividing cells become permanent tissues.",
                "tags": ["differentiation"],
            },
            {
                "difficulty": "hard",
                "text": "______ meristem is located at the base of leaves and helps in regrowth.",
                "answer": "Intercalary",
                "explanation": "Intercalary meristem is found at nodes — the base of leaves — enabling regrowth in grasses.",
                "tags": ["intercalary"],
            },
        ],
        "true_false": [
            {
                "difficulty": "easy",
                "text": "All meristematic cells are living.",
                "answer": "True",
                "explanation": "All meristematic cells are living because they must actively divide to produce new cells.",
                "tags": ["characteristics"],
            },
            {
                "difficulty": "easy",
                "text": "Permanent tissue cells are always dead.",
                "answer": "False",
                "explanation": "Permanent tissue cells may be living (e.g., parenchyma, collenchyma) or dead (e.g., sclerenchyma).",
                "tags": ["permanent"],
            },
            {
                "difficulty": "medium",
                "text": "Meristematic cells have large vacuoles.",
                "answer": "False",
                "explanation": "Meristematic cells have small or no vacuoles. Large vacuoles are found in mature permanent cells.",
                "tags": ["characteristics"],
            },
            {
                "difficulty": "medium",
                "text": "Apical meristem increases the height of a plant.",
                "answer": "True",
                "explanation": "Apical meristem at shoot tips causes the plant to grow taller (increase in length).",
                "tags": ["apical"],
            },
            {
                "difficulty": "hard",
                "text": "Meristematic tissue and permanent tissue are the same thing.",
                "answer": "False",
                "explanation": "They are distinct: meristematic tissue has dividing cells, while permanent tissue has specialized, non-dividing cells.",
                "tags": ["classification"],
            },
            {
                "difficulty": "hard",
                "text": "Intercalary meristem helps a plant grow taller.",
                "answer": "False",
                "explanation": "Intercalary meristem does NOT increase height; it helps regrow at the base of leaves or internodes.",
                "tags": ["intercalary"],
            },
        ],
        "match": [
            {
                "difficulty": "easy",
                "text": "Match the meristem type with its location:",
                "left": ["Apical meristem", "Lateral meristem", "Intercalary meristem"],
                "right": ["Base of leaves (nodes)", "Tips of roots and shoots", "Sides of stems (cambium)"],
                "answer_map": {"Apical meristem": "Tips of roots and shoots",
                               "Lateral meristem": "Sides of stems (cambium)",
                               "Intercalary meristem": "Base of leaves (nodes)"},
                "explanation": "Apical = tips (length), Lateral = sides (girth), Intercalary = nodes/base (regrowth).",
                "tags": ["location"],
            },
        ],
        "short_answer": [
            {
                "difficulty": "medium",
                "text": "Define 'tissue' in your own words.",
                "answer": "A tissue is a group of similar cells that work together to perform one specific function in the body of a plant or animal.",
                "explanation": "Key points: (1) group of cells, (2) similar/identical, (3) specific function.",
                "marks": 2,
                "tags": ["definition"],
            },
            {
                "difficulty": "medium",
                "text": "List THREE characteristics of meristematic tissue cells.",
                "answer": "Cells are living; cells have thin walls; cells have large nuclei; cells continuously divide; small or absent vacuoles; dense cytoplasm. (Any 3)",
                "explanation": "Meristematic cells are actively dividing, hence they are living with thin walls, large nuclei, dense cytoplasm, and no large vacuoles.",
                "marks": 2,
                "tags": ["characteristics"],
            },
            {
                "difficulty": "hard",
                "text": "Explain how meristematic tissue gives rise to permanent tissue.",
                "answer": "Meristematic cells actively divide to produce new cells. Over time, these cells stop dividing and become specialized to perform specific functions — this process is called differentiation. The specialized cells form permanent tissues like parenchyma, collenchyma, and sclerenchyma.",
                "explanation": "This describes the complete process: meristematic division → differentiation → permanent tissue.",
                "marks": 3,
                "tags": ["differentiation", "permanent"],
            },
        ],
    },

    # ── NODE 002 ────────────────────────────────────────────────────────────────
    "c7_bio_002": {
        "mcq": [
            {
                "difficulty": "easy",
                "text": "Which of the following is a simple permanent tissue?",
                "options": ["Xylem", "Phloem", "Parenchyma", "Cambium"],
                "answer": "C",
                "explanation": "Parenchyma is a simple permanent tissue. Xylem and phloem are complex permanent tissues. Cambium is meristematic.",
                "tags": ["parenchyma", "classification"],
            },
            {
                "difficulty": "easy",
                "text": "Which simple permanent tissue is responsible for storing food in plants?",
                "options": ["Collenchyma", "Sclerenchyma", "Parenchyma", "Xylem"],
                "answer": "C",
                "explanation": "Parenchyma cells store food (starch), water, and other substances in soft parts of the plant.",
                "tags": ["parenchyma", "function"],
            },
            {
                "difficulty": "medium",
                "text": "Parenchyma cells are characterized by:",
                "options": [
                    "Thick lignified walls",
                    "Thin walls and large intercellular spaces",
                    "Thickened corners",
                    "Dead cells",
                ],
                "answer": "B",
                "explanation": "Parenchyma has thin walls and large intercellular spaces that help in storage, photosynthesis, and gas exchange.",
                "tags": ["parenchyma", "structure"],
            },
            {
                "difficulty": "medium",
                "text": "Collenchyma tissue provides:",
                "options": [
                    "Rigid support",
                    "Flexible support",
                    "Only storage",
                    "Only photosynthesis",
                ],
                "answer": "B",
                "explanation": "Collenchyma provides flexible mechanical support, allowing young stems and leaf stalks to bend without breaking.",
                "tags": ["collenchyma", "function"],
            },
            {
                "difficulty": "medium",
                "text": "The cell walls of collenchyma are thickened at the:",
                "options": [
                    "Center of the wall",
                    "Corners of the cell",
                    "Entire cell surface",
                    "Nucleus only",
                ],
                "answer": "B",
                "explanation": "Collenchyma cells have thickened corners due to extra cellulose and pectin deposition, giving flexibility.",
                "tags": ["collenchyma", "structure"],
            },
            {
                "difficulty": "medium",
                "text": "Which tissue makes coconut husk hard and tough?",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Epidermis"],
                "answer": "C",
                "explanation": "Sclerenchyma fibers in coconut husk have thick lignified walls that give hardness and toughness.",
                "tags": ["sclerenchyma", "example"],
            },
            {
                "difficulty": "hard",
                "text": "Which of the following tissues is composed of DEAD cells at maturity?",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Aerenchyma"],
                "answer": "C",
                "explanation": "Sclerenchyma cells die at maturity after depositing thick lignified walls. Parenchyma and collenchyma remain living.",
                "tags": ["sclerenchyma", "alive"],
            },
            {
                "difficulty": "hard",
                "text": "Which tissue is found in the leaf stalks of plants and allows them to bend without breaking?",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Xylem"],
                "answer": "B",
                "explanation": "Collenchyma in leaf stalks (petioles) provides flexible support, letting the leaf bend in the wind.",
                "tags": ["collenchyma", "location"],
            },
            {
                "difficulty": "easy",
                "text": "Parenchyma cells with chloroplasts are called:",
                "options": ["Aerenchyma", "Chlorenchyma", "Sclerenchyma", "Collenchyma"],
                "answer": "B",
                "explanation": "When parenchyma cells contain chloroplasts, they are called chlorenchyma and are responsible for photosynthesis.",
                "tags": ["parenchyma", "variation"],
            },
            {
                "difficulty": "hard",
                "text": "Which of the following is NOT a function of parenchyma?",
                "options": [
                    "Storage of food",
                    "Photosynthesis",
                    "Providing rigid support",
                    "Providing buoyancy in water",
                ],
                "answer": "C",
                "explanation": "Parenchyma does not provide rigid support. Rigid support is the job of sclerenchyma. Parenchyma stores food, photosynthesizes, and provides buoyancy (aerenchyma).",
                "tags": ["parenchyma", "function"],
            },
        ],
        "fill_blank": [
            {
                "difficulty": "easy",
                "text": "______ is a simple permanent tissue that stores food in plants.",
                "answer": "Parenchyma",
                "explanation": "Parenchyma is the most common simple permanent tissue and acts as a storage tissue for food and water.",
                "tags": ["parenchyma"],
            },
            {
                "difficulty": "easy",
                "text": "Parenchyma cells with chloroplasts are called ______.",
                "answer": "chlorenchyma",
                "explanation": "Chlorenchyma is parenchyma containing chloroplasts, enabling photosynthesis.",
                "tags": ["parenchyma"],
            },
            {
                "difficulty": "medium",
                "text": "Collenchyma cells have thickened ______ due to cellulose and pectin.",
                "answer": "corners",
                "explanation": "Collenchyma is characterized by uneven thickening at the corners of the cell walls (cellulose + pectin).",
                "tags": ["collenchyma"],
            },
            {
                "difficulty": "medium",
                "text": "The tissue that gives hardness to coconut husk is called ______.",
                "answer": "sclerenchyma",
                "explanation": "Sclerenchyma fibers with thick lignified walls make coconut husk hard and tough.",
                "tags": ["sclerenchyma"],
            },
            {
                "difficulty": "hard",
                "text": "Sclerenchyma cells are ______ at maturity (living/dead).",
                "answer": "dead",
                "explanation": "Sclerenchyma cells lose their protoplasm and die at maturity, leaving only thick lignified walls.",
                "tags": ["sclerenchyma"],
            },
        ],
        "true_false": [
            {
                "difficulty": "easy",
                "text": "Parenchyma cells have thick cell walls.",
                "answer": "False",
                "explanation": "Parenchyma has thin cell walls. Thick walls are found in sclerenchyma.",
                "tags": ["parenchyma"],
            },
            {
                "difficulty": "easy",
                "text": "Collenchyma is a living tissue.",
                "answer": "True",
                "explanation": "Collenchyma cells remain alive at maturity, unlike sclerenchyma.",
                "tags": ["collenchyma"],
            },
            {
                "difficulty": "medium",
                "text": "Sclerenchyma provides flexible support to young stems.",
                "answer": "False",
                "explanation": "Sclerenchyma provides rigid support. Flexible support in young stems is provided by collenchyma.",
                "tags": ["sclerenchyma"],
            },
            {
                "difficulty": "medium",
                "text": "All three simple permanent tissues originate from meristematic tissue.",
                "answer": "True",
                "explanation": "All simple permanent tissues (parenchyma, collenchyma, sclerenchyma) arise from meristematic cells through differentiation.",
                "tags": ["origin"],
            },
            {
                "difficulty": "hard",
                "text": "Aerenchyma is a type of parenchyma found in aquatic plants.",
                "answer": "True",
                "explanation": "Aerenchyma is parenchyma with large air spaces, helping aquatic plants float.",
                "tags": ["parenchyma", "variation"],
            },
        ],
        "match": [
            {
                "difficulty": "medium",
                "text": "Match the tissue with its key feature:",
                "left": ["Parenchyma", "Collenchyma", "Sclerenchyma"],
                "right": [
                    "Thick lignified walls; dead at maturity",
                    "Thin walls; large intercellular spaces",
                    "Thickened corners; living and flexible",
                ],
                "answer_map": {
                    "Parenchyma": "Thin walls; large intercellular spaces",
                    "Collenchyma": "Thickened corners; living and flexible",
                    "Sclerenchyma": "Thick lignified walls; dead at maturity",
                },
                "explanation": "Each tissue has a distinct structural feature: parenchyma = thin walls, collenchyma = corner thickening, sclerenchyma = lignified dead walls.",
                "tags": ["comparison"],
            },
            {
                "difficulty": "medium",
                "text": "Match the tissue with its main function:",
                "left": ["Parenchyma", "Collenchyma", "Sclerenchyma"],
                "right": ["Flexible support", "Rigid strength", "Storage and photosynthesis"],
                "answer_map": {
                    "Parenchyma": "Storage and photosynthesis",
                    "Collenchyma": "Flexible support",
                    "Sclerenchyma": "Rigid strength",
                },
                "explanation": "Each tissue has a distinct primary function.",
                "tags": ["function"],
            },
        ],
        "short_answer": [
            {
                "difficulty": "medium",
                "text": "Name the three types of simple permanent tissues in plants.",
                "answer": "Parenchyma, Collenchyma, and Sclerenchyma.",
                "explanation": "All three are simple permanent tissues derived from meristematic tissue.",
                "marks": 2,
                "tags": ["classification"],
            },
            {
                "difficulty": "medium",
                "text": "How does collenchyma differ from sclerenchyma in terms of cell viability?",
                "answer": "Collenchyma cells are living at maturity, while sclerenchyma cells are dead at maturity.",
                "explanation": "Collenchyma retains living protoplasm; sclerenchyma cells die after depositing lignin in their walls.",
                "marks": 2,
                "tags": ["comparison"],
            },
            {
                "difficulty": "hard",
                "text": "Why is sclerenchyma called a 'supporting tissue'? Explain with an example.",
                "answer": "Sclerenchyma has thick, lignified (hardened) cell walls that make it extremely strong. It provides rigid support to plant parts. For example, the coconut husk is made of sclerenchyma fibers, making it hard and tough.",
                "explanation": "The lignified walls give mechanical strength, protecting seeds and supporting stems.",
                "marks": 3,
                "tags": ["sclerenchyma", "function"],
            },
            {
                "difficulty": "hard",
                "text": "Explain how parenchyma, collenchyma, and sclerenchyma differ in their cell wall structure.",
                "answer": "Parenchyma has thin cell walls; Collenchyma has thick walls at the corners (cellulose + pectin); Sclerenchyma has very thick, lignified (hardened) walls. They go from soft → flexible → rigid.",
                "explanation": "This progression (thin → corner-thick → fully lignified) corresponds to increasing rigidity.",
                "marks": 3,
                "tags": ["comparison", "structure"],
            },
        ],
    },

    # ── NODE 003 ────────────────────────────────────────────────────────────────
    "c7_bio_003": {
        "mcq": [
            {
                "difficulty": "easy",
                "text": "Which tissue is responsible for transporting water in plants?",
                "options": ["Phloem", "Xylem", "Parenchyma", "Collenchyma"],
                "answer": "B",
                "explanation": "Xylem is the complex permanent tissue that transports water and dissolved minerals from roots to other parts.",
                "tags": ["xylem", "function"],
            },
            {
                "difficulty": "easy",
                "text": "Which tissue transports food (sugars) in plants?",
                "options": ["Xylem", "Phloem", "Sclerenchyma", "Collenchyma"],
                "answer": "B",
                "explanation": "Phloem is the complex permanent tissue that transports food (sugars) from leaves to other parts.",
                "tags": ["phloem", "function"],
            },
            {
                "difficulty": "easy",
                "text": "Xylem and phloem together are called:",
                "options": [
                    "Simple tissues",
                    "Vascular bundles",
                    "Epidermis",
                    "Meristematic tissue",
                ],
                "answer": "B",
                "explanation": "Xylem and phloem together form vascular bundles — the 'plumbing system' of the plant.",
                "tags": ["vascular"],
            },
            {
                "difficulty": "medium",
                "text": "Which component of xylem is responsible for the actual transport of water?",
                "options": ["Xylem fibers", "Xylem parenchyma", "Vessels", "All of these equally"],
                "answer": "C",
                "explanation": "Vessels are the main water-conducting elements in xylem, forming long continuous tubes.",
                "tags": ["xylem", "vessels"],
            },
            {
                "difficulty": "medium",
                "text": "Sieve tubes are a component of:",
                "options": ["Xylem", "Phloem", "Parenchyma", "Sclerenchyma"],
                "answer": "B",
                "explanation": "Sieve tubes are the main food-conducting cells found only in phloem.",
                "tags": ["phloem", "sieve_tubes"],
            },
            {
                "difficulty": "medium",
                "text": "Which cells in phloem help regulate the flow of food?",
                "options": [
                    "Sieve tubes",
                    "Companion cells",
                    "Xylem parenchyma",
                    "Tracheids",
                ],
                "answer": "B",
                "explanation": "Companion cells are closely associated with sieve tube cells and help regulate the loading/unloading of food.",
                "tags": ["phloem", "companion_cells"],
            },
            {
                "difficulty": "hard",
                "text": "In xylem, which cells are alive at maturity?",
                "options": [
                    "Tracheids and vessels",
                    "Xylem fibers",
                    "Xylem parenchyma only",
                    "None of them",
                ],
                "answer": "C",
                "explanation": "Only xylem parenchyma is living. Tracheids, vessels, and xylem fibers are all dead at maturity.",
                "tags": ["xylem", "alive"],
            },
            {
                "difficulty": "hard",
                "text": "What is the main difference between xylem and phloem transport?",
                "options": [
                    "Xylem transports food, phloem transports water",
                    "Xylem moves unidirectionally upward; phloem moves bidirectionally",
                    "Phloem cells are always dead",
                    "Xylem has sieve plates",
                ],
                "answer": "B",
                "explanation": "Xylem moves water only upward (roots to leaves). Phloem can move food in any direction as needed by the plant.",
                "tags": ["comparison", "direction"],
            },
            {
                "difficulty": "hard",
                "text": "The 'sieve plates' are found in:",
                "options": ["Xylem vessels", "Phloem sieve tubes", "Collenchyma", "Sclerenchyma"],
                "answer": "B",
                "explanation": "Sieve plates are the perforated end walls of sieve tube cells in phloem, allowing food to flow between cells.",
                "tags": ["phloem", "sieve_tubes"],
            },
            {
                "difficulty": "hard",
                "text": "Lignin is deposited in the walls of:",
                "options": ["Parenchyma", "Collenchyma", "Xylem and sclerenchyma", "Phloem sieve tubes"],
                "answer": "C",
                "explanation": "Lignin is deposited in xylem (tracheids, vessels, fibers) and sclerenchyma walls, making them rigid and waterproof.",
                "tags": ["lignin"],
            },
        ],
        "fill_blank": [
            {
                "difficulty": "easy",
                "text": "______ transports water and minerals from roots to leaves.",
                "answer": "Xylem",
                "explanation": "Xylem is the water-conducting tissue, moving water and dissolved minerals upward.",
                "tags": ["xylem"],
            },
            {
                "difficulty": "easy",
                "text": "______ transports food from leaves to other parts of the plant.",
                "answer": "Phloem",
                "explanation": "Phloem is the food-conducting tissue (also called bast).",
                "tags": ["phloem"],
            },
            {
                "difficulty": "medium",
                "text": "Xylem moves in a ______ direction (upward), while phloem moves in ______ directions.",
                "answer": "one; both",
                "explanation": "Xylem moves only upward (unidirectional); phloem can move up or down (bidirectional).",
                "tags": ["direction"],
            },
            {
                "difficulty": "medium",
                "text": "Sieve tubes are found in the ______.",
                "answer": "phloem",
                "explanation": "Sieve tubes are the food-conducting cells of phloem.",
                "tags": ["phloem"],
            },
            {
                "difficulty": "hard",
                "text": "The ______ cells in phloem are closely associated with sieve tubes and help control food flow.",
                "answer": "companion",
                "explanation": "Companion cells flank each sieve tube and regulate loading/unloading of sugars.",
                "tags": ["phloem", "companion_cells"],
            },
        ],
        "true_false": [
            {
                "difficulty": "easy",
                "text": "Xylem and phloem are simple permanent tissues.",
                "answer": "False",
                "explanation": "Xylem and phloem are complex permanent tissues because each is made of more than one type of cell.",
                "tags": ["classification"],
            },
            {
                "difficulty": "easy",
                "text": "Phloem transports food from leaves to all parts of the plant.",
                "answer": "True",
                "explanation": "Phloem conducts food (sugars produced in photosynthesis) from leaves (source) to other parts (sinks).",
                "tags": ["phloem"],
            },
            {
                "difficulty": "medium",
                "text": "Xylem moves water in both upward and downward directions.",
                "answer": "False",
                "explanation": "Xylem moves water only in the upward direction (roots → shoots → leaves).",
                "tags": ["xylem", "direction"],
            },
            {
                "difficulty": "medium",
                "text": "Most cells in xylem are living.",
                "answer": "False",
                "explanation": "Most xylem cells (tracheids, vessels, fibers) are dead at maturity. Only xylem parenchyma is living.",
                "tags": ["xylem", "alive"],
            },
            {
                "difficulty": "hard",
                "text": "Companion cells are found in phloem and help sieve tubes.",
                "answer": "True",
                "explanation": "Companion cells are living cells adjacent to sieve tubes, helping regulate food transport.",
                "tags": ["phloem", "companion_cells"],
            },
            {
                "difficulty": "hard",
                "text": "Vessels in xylem are made of living cells.",
                "answer": "False",
                "explanation": "Vessel elements are dead at maturity; their end walls break down to form continuous tubes.",
                "tags": ["xylem", "vessels"],
            },
        ],
        "match": [
            {
                "difficulty": "medium",
                "text": "Match the tissue with what it transports:",
                "left": ["Xylem", "Phloem"],
                "right": ["Food (sugars) — bidirectional", "Water and minerals — upward only"],
                "answer_map": {
                    "Xylem": "Water and minerals — upward only",
                    "Phloem": "Food (sugars) — bidirectional",
                },
                "explanation": "Xylem = water upward; Phloem = food in any direction.",
                "tags": ["comparison"],
            },
            {
                "difficulty": "hard",
                "text": "Match xylem/phloem components with descriptions:",
                "left": ["Vessels", "Sieve tubes", "Companion cells", "Tracheids"],
                "right": [
                    "Dead, tube-like cells for water transport",
                    "Living cells with sieve plates for food transport",
                    "Living cells alongside sieve tubes that regulate food flow",
                    "Long dead cells with tapered ends; water conductors",
                ],
                "answer_map": {
                    "Vessels": "Dead, tube-like cells for water transport",
                    "Sieve tubes": "Living cells with sieve plates for food transport",
                    "Companion cells": "Living cells alongside sieve tubes that regulate food flow",
                    "Tracheids": "Long dead cells with tapered ends; water conductors",
                },
                "explanation": "Each component has a distinct structure and role.",
                "tags": ["components"],
            },
        ],
        "short_answer": [
            {
                "difficulty": "medium",
                "text": "Name the two types of complex permanent tissues in plants.",
                "answer": "Xylem and Phloem.",
                "explanation": "Xylem and phloem are the two complex permanent tissues — each made of multiple cell types.",
                "marks": 1,
                "tags": ["classification"],
            },
            {
                "difficulty": "medium",
                "text": "How does xylem differ from phloem in terms of direction of transport?",
                "answer": "Xylem moves water only upward (from roots to leaves). Phloem can move food in both directions — up and down — as needed by the plant.",
                "explanation": "This unidirectional vs bidirectional distinction is a key difference between the two vascular tissues.",
                "marks": 2,
                "tags": ["comparison", "direction"],
            },
            {
                "difficulty": "hard",
                "text": "List the components of xylem and state which are living and which are dead at maturity.",
                "answer": "Xylem components: (1) Tracheids – dead, (2) Vessels – dead, (3) Xylem fibers – dead, (4) Xylem parenchyma – LIVING.",
                "explanation": "Only xylem parenchyma remains living; all other xylem components die after depositing their walls.",
                "marks": 3,
                "tags": ["xylem", "components"],
            },
            {
                "difficulty": "hard",
                "text": "Why are companion cells necessary for sieve tubes?",
                "answer": "Sieve tube cells lose their nucleus at maturity and cannot synthesize proteins or control their own metabolism. Companion cells, which have nuclei, regulate the loading and unloading of food into sieve tubes and keep them functional.",
                "explanation": "Sieve tubes depend on companion cells for metabolic control — a classic example of cell interdependence.",
                "marks": 3,
                "tags": ["phloem", "companion_cells"],
            },
        ],
    },
}

# ─── Solver Class ──────────────────────────────────────────────────────────────
class BioSolver:
    """
    Deterministic solver for Class 7 Biology.
    Validates answers, explains concepts, tracks mastery.
    """

    def __init__(self):
        self.kb = KB
        self.bank = QUESTION_BANK

    # ── Node-level validation ──────────────────────────────────────────────────
    def validate(self, node_id: str, qid: str, user_answer: str) -> Dict:
        """Validate a user's answer for a specific question."""
        bank = self.bank.get(node_id, {})
        for qtype, questions in bank.items():
            for q in questions:
                if q["qid"] == qid:
                    correct = q["answer"].strip().upper()
                    user = user_answer.strip().upper()
                    is_correct = self._compare_answers(correct, user)
                    return {
                        "correct": is_correct,
                        "user_answer": user_answer,
                        "correct_answer": q["answer"],
                        "explanation": q["explanation"],
                        "qid": qid,
                        "qtype": qtype,
                    }
        return {"error": f"Question {qid} not found in node {node_id}"}

    def _compare_answers(self, correct: str, user: str) -> bool:
        """Fuzzy comparison for fill-in-the-blank answers."""
        # Normalize
        correct_norm = correct.lower().strip().replace(".", "").replace(",", "")
        user_norm = user.lower().strip().replace(".", "").replace(",", "")
        # Exact match or contains
        if correct_norm == user_norm:
            return True
        if correct_norm in user_norm or user_norm in correct_norm:
            return True
        # Multi-part answers
        correct_parts = [p.strip() for p in correct_norm.split(";")]
        user_parts = [p.strip() for p in user_norm.split(";")]
        if len(correct_parts) == len(user_parts):
            all_match = all(
                self._fuzzy_match(c, u) for c, u in zip(correct_parts, user_parts)
            )
            if all_match:
                return True
        return False

    def _fuzzy_match(self, a: str, b: str) -> bool:
        return a == b or a in b or b in a

    # ── Concept explanation ────────────────────────────────────────────────────
    def explain(self, node_id: str, topic_key: str) -> str:
        """Return a structured explanation for a concept."""
        node_data = self.kb.get(node_id, {})
        if topic_key in node_data:
            data = node_data[topic_key]
            if isinstance(data, dict):
                lines = [f"=== {topic_key.upper().replace('_', ' ')} ==="]
                for k, v in data.items():
                    if isinstance(v, list):
                        lines.append(f"\n{k}:")
                        for item in v:
                            lines.append(f"  • {item}")
                    elif isinstance(v, dict):
                        lines.append(f"\n{k}:")
                        for sk, sv in v.items():
                            lines.append(f"  • {sk}: {sv}")
                    else:
                        lines.append(f"{k}: {v}")
                return "\n".join(lines)
            return str(data)
        return f"Topic '{topic_key}' not found in node {node_id}."

    def explain_concept(self, node_id: str, concept: str) -> str:
        """Human-readable concept explanation."""
        node_data = self.kb.get(node_id, {})
        # definitions
        defs = node_data.get("definitions", {})
        if concept.lower() in defs:
            return defs[concept.lower()]
        # direct key
        if concept in node_data:
            data = node_data[concept]
            if isinstance(data, dict):
                return json.dumps(data, indent=2)
            return str(data)
        # Try fuzzy match
        concept_lower = concept.lower()
        for key, val in node_data.items():
            if concept_lower in key.lower() or key.lower() in concept_lower:
                if isinstance(val, dict):
                    return json.dumps(val, indent=2)
                return str(val)
        return f"Concept '{concept}' not found. Available: {list(node_data.keys())}"

    # ── Node overview ──────────────────────────────────────────────────────────
    def node_summary(self, node_id: str) -> str:
        """Return a summary of the node's key concepts."""
        node_data = self.kb.get(node_id, {})
        lines = [f"=== NODE: {node_id.upper()} ==="]
        if "definitions" in node_data:
            lines.append("\n📚 DEFINITIONS:")
            for term, defn in node_data["definitions"].items():
                lines.append(f"  • {term.title()}: {defn}")
        if "classification" in node_data:
            lines.append("\n📂 CLASSIFICATION:")
            lines.append(f"  {json.dumps(node_data['classification'], indent=4)}")
        if "comparison_chart" in node_data:
            lines.append("\n📊 COMPARISON:")
            lines.append(f"  {json.dumps(node_data['comparison_chart'], indent=4)}")
        if "comparison_meristematic_vs_permanent" in node_data:
            lines.append("\n📊 MERISTEMATIC vs PERMANENT:")
            lines.append(f"  {json.dumps(node_data['comparison_meristematic_vs_permanent'], indent=4)}")
        if "xylem_vs_phloem" in node_data:
            lines.append("\n📊 XYLEM vs PHLOEM:")
            lines.append(f"  {json.dumps(node_data['xylem_vs_phloem'], indent=4)}")
        if "key_facts" in node_data:
            lines.append("\n🔑 KEY FACTS:")
            for fact in node_data["key_facts"]:
                lines.append(f"  • {fact}")
        return "\n".join(lines)

    # ── All questions for a node ───────────────────────────────────────────────
    def get_all_questions(self, node_id: str) -> List[Question]:
        """Return all questions for a node as Question dataclass instances."""
        bank = self.bank.get(node_id, {})
        questions = []
        for qtype, qlist in bank.items():
            for i, q in enumerate(qlist):
                questions.append(Question(
                    qid=q["qid"],
                    node_id=node_id,
                    topic=q.get("tags", [""])[0],
                    difficulty=q["difficulty"],
                    q_type=qtype,
                    question_text=q["text"],
                    options=q.get("options"),
                    correct_answer=q["answer"],
                    explanation=q["explanation"],
                    tags=q.get("tags", []),
                    marks=q.get("marks", 1),
                ))
        return questions

    # ── Mastery evaluation ─────────────────────────────────────────────────────
    def evaluate_mastery(self, node_id: str, results: List[Dict]) -> Dict:
        """Evaluate mastery based on quiz results."""
        total = len(results)
        correct = sum(1 for r in results if r.get("correct", False))
        score = correct / total if total > 0 else 0.0
        by_diff = {"easy": {"total": 0, "correct": 0},
                   "medium": {"total": 0, "correct": 0},
                   "hard": {"total": 0, "correct": 0}}
        for r in results:
            # need difficulty info - derive from qid lookup
            diff = self._get_q_difficulty(node_id, r.get("qid", ""))
            if diff in by_diff:
                by_diff[diff]["total"] += 1
                if r.get("correct"):
                    by_diff[diff]["correct"] += 1
        return {
            "node_id": node_id,
            "total_questions": total,
            "correct": correct,
            "score": round(score, 2),
            "percentage": f"{score*100:.0f}%",
            "mastery": "Achieved" if score >= 0.7 else "Partial" if score >= 0.4 else "Needs Practice",
            "by_difficulty": by_diff,
        }

    def _get_q_difficulty(self, node_id: str, qid: str) -> str:
        bank = self.bank.get(node_id, {})
        for qtype, qlist in bank.items():
            for q in qlist:
                if q["qid"] == qid:
                    return q["difficulty"]
        return "easy"


# ─── Export ────────────────────────────────────────────────────────────────────
__all__ = [
    "BioSolver",
    "Question",
    "QuizResult",
    "NodeID",
    "Difficulty",
    "QType",
    "CompetencyLevel",
    "KB",
    "QUESTION_BANK",
]

# -- solver contract --------------------------------------------
# NOTE: BioSolver.get_all_questions() is broken upstream (bank lacks 'qid'
# keys) — read QUESTION_BANK directly.
def solve(node_id: str = "", params: dict | None = None, **kw):
    node = node_id or "c7_bio_001"
    bank = QUESTION_BANK.get(node, {})
    qi = int((params or {}).get("q", 0))
    for qtype, qlist in bank.items():
        if qlist:
            q = qlist[qi % len(qlist)]
            return {"node_id": node, "qtype": qtype, "question": q.get("text"),
                    "options": q.get("options"), "answer": q.get("answer"),
                    "explanation": q.get("explanation")}
    return {"node_id": node, "error": "no questions"}

def check_answer(node_id: str = "", qid: str = "", user_answer: str = "", **kw):
    s = BioSolver()
    if qid:
        return s.validate(node_id, qid, user_answer)
    # fuzzy check against node bank answers
    node = node_id or "c7_bio_001"
    for qlist in QUESTION_BANK.get(node, {}).values():
        for q in qlist:
            r = s._compare_answers(q.get("answer", ""), user_answer)
            if r.get("correct") or r.get("match"):
                return r
    return {"correct": False, "note": "no bank match"}

def explain_concept_q(node_id: str = "", topic_key: str = "", **kw):
    return BioSolver().explain(node_id or "c7_bio_001", topic_key)

SOLVER_REGISTRY = {"c7_bio_solve": solve, "c7_bio_check": check_answer, "c7_bio_explain": explain_concept_q}
NODE_MAP = {"c7_bio_001": "c7_bio_solve", "c7_bio_002": "c7_bio_solve", "c7_bio_003": "c7_bio_solve"}
