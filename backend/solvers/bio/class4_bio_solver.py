import random
import numpy as np
from sympy import Rational, symbols, Eq, simplify, Integer, lcm, factorint
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional, Union, Any
import hashlib
import json

# ════════════════════════════════════════════════════════════════════════════════════
# SECTION 1: DETERMINISTIC CONFIGURATION
# ════════════════════════════════════════════════════════════════════════════════════

GLOBAL_SEED: int = 2024
random.seed(GLOBAL_SEED)
_rng = np.random.RandomState(GLOBAL_SEED)

# ════════════════════════════════════════════════════════════════════════════════════
# SECTION 2: DATA STRUCTURES
# ════════════════════════════════════════════════════════════════════════════════════

@dataclass
class KnowledgeFact:
    concept: str
    definition: str
    examples: List[str]
    indian_examples: List[str]
    analogy: str = ""
    function: str = ""

@dataclass
class Question:
    qid: str
    node_id: str
    qtype: str
    difficulty: str
    cognitive_level: str
    text: str
    options: List[str] = field(default_factory=list)
    correct_index: int = -1
    correct_text: str = ""
    explanation_steps: List[str] = field(default_factory=list)
    competency: str = "Board"
    indian_context: bool = False
    marks: int = 1
    vocabulary: List[str] = field(default_factory=list)

@dataclass
class SolveResult:
    qid: str
    node_id: str
    steps: List[str]
    answer: str
    verification: str
    is_correct: bool = True
    indian_note: str = ""

@dataclass
class CheckResult:
    qid: str
    is_correct: bool
    feedback: str
    correct_answer: str
    step_summary: List[str] = field(default_factory=list)

# ════════════════════════════════════════════════════════════════════════════════════
# SECTION 3: KNOWLEDGE BASE (Indian Curriculum - Class 4 Biology)
# ════════════════════════════════════════════════════════════════════════════════════

class KnowledgeBase:
    FOOD_COMPONENTS: Dict[str, KnowledgeFact] = {
        "carbohydrates": KnowledgeFact(
            concept="Carbohydrates",
            definition="Food components that give energy to the body for running, playing and working",
            examples=["Rice", "Bread", "Sugar", "Potato", "Pasta"],
            indian_examples=["Roti", "Rice", "Paratha", "Muri (puffed rice)", "Poha"],
            analogy="Like petrol in a car",
            function="Gives energy to the body"
        ),
        "proteins": KnowledgeFact(
            concept="Proteins",
            definition="Food components that help the body grow and repair muscles",
            examples=["Milk", "Eggs", "Fish", "Chicken", "Beans"],
            indian_examples=["Dal (lentils)", "Milk", "Paneer", "Eggs", "Soya chunks"],
            analogy="Like bricks used to build a house",
            function="Body building and growth"
        ),
        "fats": KnowledgeFact(
            concept="Fats",
            definition="Food components that store energy and keep the body warm",
            examples=["Butter", "Oil", "Ghee", "Nuts", "Cheese"],
            indian_examples=["Ghee", "Mustard oil (sarson ka tel)", "Groundnut oil", "Butter", "Coconut"],
            analogy="Like a thick winter blanket",
            function="Store energy and keep body warm"
        ),
        "vitamins": KnowledgeFact(
            concept="Vitamins",
            definition="Food components that protect the body from diseases",
            examples=["Orange", "Spinach", "Carrot", "Apple", "Banana"],
            indian_examples=["Amla (gooseberry)", "Spinach (palak)", "Carrot (gajar)", "Mango", "Guava"],
            analogy="Like tiny helpers",
            function="Protection from diseases (immunity)"
        ),
        "minerals": KnowledgeFact(
            concept="Minerals",
            definition="Food components needed for strong bones and proper body functions",
            examples=["Milk", "Salt", "Banana", "Spinach", "Nuts"],
            indian_examples=["Milk", "Salt (namak)", "Ragi (finger millet)", "Green leafy veg", "Jaggery (gud)"],
            analogy="Like builders for bones",
            function="Strong bones and body functions"
        ),
        "water": KnowledgeFact(
            concept="Water",
            definition="Essential liquid needed for all body functions",
            examples=["Drinking water", "Coconut water", "Soup"],
            indian_examples=["Water", "Coconut water (nariyal pani)", "Chaas (buttermilk)", "Soup"],
            analogy="Like oil in a machine",
            function="Essential for life; helps digestion"
        ),
        "roughage": KnowledgeFact(
            concept="Roughage",
            definition="Fibrous food that helps digestion and removes waste from the body",
            examples=["Vegetables", "Fruits", "Whole grains", "Salad"],
            indian_examples=["Salad", "Vegetables (sabzi)", "Fruits", "Whole wheat roti", "Jaggery (gud)"],
            analogy="Like a broom sweeping the intestines",
            function="Helps digestion and removes waste"
        )
    }

    BALANCED_DIET: Dict[str, Any] = {
        "definition": "A diet that contains all food components in the right amounts for healthy growth",
        "components_needed": [
            "Carbohydrates - for energy",
            "Proteins - for body building",
            "Fats - for energy storage",
            "Vitamins - for immunity",
            "Minerals - for strong bones",
            "Roughage - for digestion",
            "Water - for hydration"
        ],
        "indian_thali_example": {
            "roti": "carbohydrates",
            "rice": "carbohydrates",
            "dal": "proteins",
            "sabzi (vegetables)": "vitamins and minerals",
            "curd": "proteins and minerals",
            "salad": "roughage",
            "papad": "roughage"
        },
        "unbalanced_examples": [
            ("Only rice", "Missing proteins, vitamins, roughage"),
            ("Only roti and potato", "Missing proteins, vitamins, roughage"),
            ("Only fruits", "Missing proteins, fats, carbohydrates"),
        ],
        "proportions": {
            "carbohydrates": Rational(4, 10),
            "proteins": Rational(2, 10),
            "fats": Rational(1, 10),
            "vitamins_minerals": Rational(2, 10),
            "roughage": Rational(1, 10)
        }
    }

    TEETH: Dict[str, Dict] = {
        "incisors": {
            "count": 8,
            "location": "Front of the mouth (4 upper, 4 lower)",
            "shape": "Flat and sharp",
            "function": "Cutting and biting food",
            "analogy": "Like a pair of scissors",
            "example": "Cutting an apple into pieces"
        },
        "canines": {
            "count": 4,
            "location": "Next to incisors (2 upper, 2 lower)",
            "shape": "Pointed and sharp",
            "function": "Tearing tough food like meat",
            "analogy": "Like a fork",
            "example": "Tearing meat into pieces"
        },
        "premolars": {
            "count": 8,
            "location": "Behind canines (4 upper, 4 lower)",
            "shape": "Broad and slightly pointed",
            "function": "Crushing food",
            "analogy": "Like a mini grinder",
            "example": "Crushing nuts and seeds"
        },
        "molars": {
            "count": 12,
            "location": "Back of the mouth (6 upper, 6 lower, including wisdom teeth)",
            "shape": "Large and flat",
            "function": "Grinding and chewing food into paste",
            "analogy": "Like a grinding stone (chakki)",
            "example": "Grinding food like a chakki"
        }
    }

    VOCABULARY: Dict[str, List[str]] = {
        "c4_bio_001": [
            "carbohydrates", "proteins", "fats", "vitamins", "minerals",
            "roughage", "water", "energy", "body building", "immunity",
            "nutrients", "food components"
        ],
        "c4_bio_002": [
            "balanced diet", "proportion", "variety", "nutrition",
            "food wastage", "food components", "energy", "growth",
            "immunity", "healthy meal", "nutrients", "diet"
        ],
        "c4_bio_003": [
            "incisors", "canines", "premolars", "molars",
            "cutting", "tearing", "grinding", "teeth", "mouth",
            "chewing", "function", "location"
        ]
    }

    @classmethod
    def get_all_food_components(cls) -> List[str]:
        return list(cls.FOOD_COMPONENTS.keys())

    @classmethod
    def get_all_teeth_types(cls) -> List[str]:
        return list(cls.TEETH.keys())

# ════════════════════════════════════════════════════════════════════════════════════
# SECTION 4: DETERMINISTIC QUESTION GENERATOR
# ════════════════════════════════════════════════════════════════════════════════════

class DeterministicQuestionGenerator:
    """Generates reproducible questions using seeded random state."""

    def __init__(self, seed: int = GLOBAL_SEED):
        self._rng = np.random.RandomState(seed)
        random.seed(seed)

    def _hash_qid(self, node_id: str, qtype: str, idx: int) -> str:
        raw = f"{node_id}:{qtype}:{idx}:{GLOBAL_SEED}"
        h = hashlib.md5(raw.encode()).hexdigest()[:8]
        return f"{node_id}_{qtype}_{idx:02d}_{h}"

    def _shuffle_det(self, items: list) -> list:
        items_copy = items[:]
        self._rng.shuffle(items_copy)
        return items_copy

    def generate_food_component_questions(self, count: int = 6) -> List[Question]:
        questions: List[Question] = []
        kb = KnowledgeBase.FOOD_COMPONENTS
        components = KnowledgeBase.get_all_food_components()
        vocab = KnowledgeBase.VOCABULARY["c4_bio_001"]

        # Q1-2: Identify main component of Indian food
        for i in range(min(2, count)):
            comp = components[i]
            fact = kb[comp]
            food = fact.indian_examples[0]
            opts = self._shuffle_det(components[:])
            correct_idx = opts.index(comp)
            questions.append(Question(
                qid=self._hash_qid("c4_bio_001", "identify", i),
                node_id="c4_bio_001",
                qtype="identify",
                difficulty="Easy",
                cognitive_level="Remember",
                text=f"What is the main food component in {food}?",
                options=opts,
                correct_index=correct_idx,
                correct_text=comp,
                explanation_steps=[
                    f"Step 1: Think about what {food} is rich in.",
                    f"Step 2: {food} is a common Indian source of {comp}.",
                    f"Step 3: Therefore, the main component in {food} is {comp}.",
                    f"Verification: {fact.definition.lower()}"
                ],
                indian_context=True,
                vocabulary=vocab
            ))

        # Q3-4: Match function to component
        func_map = {
            "gives energy for running, playing and working": "carbohydrates",
            "helps the body grow and repair muscles": "proteins",
            "stores energy and keeps the body warm": "fats",
            "protects the body from diseases": "vitamins",
            "helps in digestion": "roughage",
            "keeps the body hydrated": "water"
        }
        func_items = list(func_map.items())
        self._rng.shuffle(func_items)
        for i, (func, comp) in enumerate(func_items[:min(2, count - 2)]):
            opts = self._shuffle_det(components[:])
            correct_idx = opts

# -- solver contract --------------------------------------------
# NOTE: DeterministicQuestionGenerator is truncated mid-method upstream;
# serve questions directly from KnowledgeBase.FOOD_COMPONENTS instead.
def solve(node_id: str = "", params: dict | None = None, **kw):
    """Answer c4 bio food-component questions from KnowledgeBase."""
    params = params or {}
    comps = KnowledgeBase.get_all_food_components()
    comp = params.get("component")
    if comp and comp in KnowledgeBase.FOOD_COMPONENTS:
        f = KnowledgeBase.FOOD_COMPONENTS[comp]
        return {"component": comp, "definition": f.definition,
                "examples": f.examples, "indian_examples": f.indian_examples}
    out = [{"component": c, "definition": KnowledgeBase.FOOD_COMPONENTS[c].definition,
            "examples": KnowledgeBase.FOOD_COMPONENTS[c].indian_examples}
           for c in comps]
    return {"node_id": node_id or "c4_bio_001", "components": out}

def check_answer(component: str = "", user_answer: str = "", **kw):
    comps = KnowledgeBase.get_all_food_components()
    return {"correct": (component or "").strip().lower() in comps and
            (user_answer or "").strip().lower() in
            [component.strip().lower()]}

SOLVER_REGISTRY = {"c4_bio_food": solve, "c4_bio_check": check_answer}
NODE_MAP = {"c4_bio_001": "c4_bio_food", "c4_bio_002": "c4_bio_food", "c4_bio_003": "c4_bio_food"}
