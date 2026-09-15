"""
EVS Class 4 — Solver Module
Nodes: c4_evs_001, c4_evs_002, c4_evs_003
All logic is deterministic (no LLM calls). Uses seeded random + dataclasses.
"""

from __future__ import annotations

import random
import re
import string
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional, Tuple

# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class NodeID(Enum):
    C4_EVS_001 = "c4_evs_001"
    C4_EVS_002 = "c4_evs_002"
    C4_EVS_003 = "c4_evs_003"


class Difficulty(Enum):
    EASY   = "Easy"
    MEDIUM = "Medium"
    HARD   = "Hard"


class QType(Enum):
    MCQ             = "mcq"
    FILL_BLANK      = "fill_blank"
    MATCH           = "match"
    TRUE_FALSE      = "true_false"
    SHORT_ANSWER    = "short_answer"
    MULTIPLE_CORRECT = "multiple_correct"


@dataclass
class Question:
    """One generated question."""
    node_id:    str
    qtype:      str          # QType.value
    difficulty: str
    question:   str
    options:    List[str] = field(default_factory=list)
    correct:    List[str] = field(default_factory=list)
    explanation: str = ""

    def mcq_correct_index(self) -> int:
        for i, opt in enumerate(self.options):
            if opt in self.correct:
                return i
        return -1


@dataclass
class SeedState:
    """Captures the random state for reproducibility."""
    seed: int
    node_id: str
    qtype: str


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

# ---------- Node c4_evs_001 ----------
LIVING_CHARACTERISTICS: List[Tuple[str, str]] = [
    ("Grow",           "Living things increase in size over time"),
    ("Need food & water", "Living things need food and water for energy"),
    ("Breathe",        "Living things take in air/oxygen to live"),
    ("Reproduce",      "Living things produce new ones of their kind"),
    ("Respond to stimuli", "Living things react to touch, light, sound, heat"),
    ("Die",            "All living things have a lifespan and eventually die"),
    ("Move on their own", "Many living things can move by themselves"),
]

LIVING_ITEMS: List[Tuple[str, bool, str]] = [
    ("Dog",             True,  "It grows, breathes, eats, and reproduces"),
    ("Rose plant",      True,  "It grows, makes food, and produces seeds"),
    ("Hen's egg (dormant)", True, "It contains a living chick that develops when warm"),
    ("Seed",            True,  "It will grow into a new plant under right conditions"),
    ("Mushroom",        True,  "It grows, reproduces via spores, and responds to moisture"),
    ("Butterfly",       True,  "It grows through stages, breathes, and reproduces"),
    ("Banyan tree",     True,  "It grows tall, has leaves, and produces seeds"),
    ("Stone",           False, "It does not grow, breathe, or reproduce on its own"),
    ("Toy car",         False, "It is made by humans and has no life processes"),
    ("Chair",           False, "It is made of wood/metal and does not grow or breathe"),
    ("Cloud",           False, "It is water vapour and does not have life processes"),
    ("Book",            False, "It is made of paper and does not grow or reproduce"),
    ("Laptop",          False, "It is an electronic device without life processes"),
    ("River water",     False, "It flows but does not grow, breathe, or reproduce"),
    ("Pen",             False, "It is a man-made object and does not show life"),
]

# stimuli examples
STIMULI_EXAMPLES: List[Tuple[str, str]] = [
    ("A sunflower turning its head towards the sun",
     "The plant shows phototropism — growing towards light (a stimulus)"),
    ("A mimosa plant folding its leaves when touched",
     "The plant responds to touch (a stimulus) by folding its leaves"),
    ("A cockroach running away when light is switched on",
     "The cockroach responds to the sudden light (stimulus) by moving away"),
    ("A dog salivating at the smell of food",
     "The dog's body responds to the smell of food (a stimulus)"),
    ("A plant growing its roots downwards into soil",
     "The roots grow downward in response to gravity (gravitropism — a stimulus)"),
]

# ---------- Node c4_evs_002 ----------
PLANT_PARTS: List[Tuple[str, str, str]] = [
    ("Roots",    "Anchor the plant in soil and absorb water and minerals",
     "Absorb water and minerals from soil and anchor the plant firmly"),
    ("Stem",     "Supports the plant and transports water, minerals, and food",
     "Holds the plant upright and carries water and food between roots and leaves"),
    ("Leaves",   "Make food for the plant using sunlight, water, and carbon dioxide",
     "Produce food for the plant through photosynthesis using sunlight"),
    ("Flower",   "Produces seeds after pollination",
     "Help the plant reproduce by producing seeds after pollination"),
    ("Seed",     "Contains a baby plant and grows into a new plant under right conditions",
     "Grow into new plants when soil, water, and warmth are available"),
]

# extra plant adaptations
PLANT_ADAPTATIONS: List[Tuple[str, str, str]] = [
    ("Carrot root",    "stores extra food underground",       "Roots — stores food"),
    ("Cactus stem",    "stores water in dry deserts",          "Stem — stores water"),
    ("Lotus leaf",     "floats on water and makes food using sunlight", "Leaves — photosynthesis"),
    ("Sunflower stem", "grows tall to support large flower head", "Stem — support"),
]

# ---------- Node c4_evs_003 ----------
ORGANS: List[Tuple[str, str, str]] = [
    ("Heart",    "Chest (slightly to the left)",   "Pumps blood to all parts of the body"),
    ("Lungs",    "Chest (on both sides of heart)", "Help us breathe — take in oxygen and remove carbon dioxide"),
    ("Brain",    "Head (inside the skull)",        "Controls the whole body and enables thinking"),
    ("Stomach",  "Abdomen (upper part)",           "Digests the food we eat using gastric juices"),
    ("Liver",    "Abdomen (upper right)",          "Cleans the blood and helps digest fats"),
    ("Kidneys",  "Abdomen (back, near the spine)", "Filter waste from blood and make urine"),
    ("Intestines","Abdomen (lower part)",           "Absorb nutrients from digested food"),
]

# external parts for contrast
EXTERNAL_PARTS: List[str] = [
    "Skin", "Eyes", "Ears", "Nose", "Hands", "Legs", "Hair", "Teeth", "Mouth"
]

# organ-by-location quiz facts
LOCATION_ORGANS: List[Tuple[str, str]] = [
    ("Chest", "Heart, Lungs"),
    ("Head (skull)", "Brain"),
    ("Abdomen", "Stomach, Liver, Kidneys, Intestines"),
]


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def _shuffle(seq: list, rng: random.Random) -> list:
    out = list(seq)
    rng.shuffle(out)
    return out


def _pick(seq: list, n: int, rng: random.Random) -> list:
    return _shuffle(seq, rng)[:min(n, len(seq))]


def _normalize(s: str) -> str:
    return s.strip().lower().translate(str.maketrans("", "", string.punctuation))


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class Solver001:
    """
    Solver for c4_evs_001 — Living vs non-living.
    Supports MCQ, fill_blank, multiple_correct, true_false, short_answer.
    """

    node_id = NodeID.C4_EVS_001.value

    @staticmethod
    def solve_mcq(question: str, options: List[str], rng: Optional[random.Random] = None) -> Tuple[int, str]:
        """Return (correct_index, explanation)."""
        if rng is None:
            rng = random.Random(42)

        ql = question.lower()

        living_in_q = [item for item, living, _ in LIVING_ITEMS
                       if _normalize(item) in ql]

        if living_in_q:
            correct_item = living_in_q[0]
            for i, opt in enumerate(options):
                if _normalize(correct_item) in _normalize(opt):
                    expl = next((reason for itm, liv, reason in LIVING_ITEMS
                                 if _normalize(itm) == _normalize(correct_item)),
                                "It is a living thing.")
                    return i, expl

        # "Which of the following is a NON-living thing?"
        nonliving_in_q = [item for item, living, _ in LIVING_ITEMS
                          if not living and _normalize(item) in ql]
        if nonliving_in_q:
            correct_item = nonliving_in_q[0]
            for i, opt in enumerate(options):
                if _normalize(correct_item) in _normalize(opt):
                    return i, "It does not grow, breathe, or reproduce on its own."

        for stimulus, expl in STIMULI_EXAMPLES:
            subj = stimulus.split()[0].lower()
            if subj in ql or stimulus.lower() in ql:
                for i, opt in enumerate(options):
                    if "response" in opt.lower() or "stimulus" in opt.lower() or "react" in opt.lower():
                        return i, expl

        not_keywords = ["not a characteristic", "not a feature", "not true",
                        "does not", "isn't a", "except"]
        if any(kw in ql for kw in not_keywords):
            non_char = ["make own colour", "produce light", "float in air",
                        "shine by itself"]
            for nc in non_char:
                for i, opt in enumerate(options):
                    if nc in _normalize(opt):
                        return i, f"'{opt}' is not a characteristic of living things."
            char_words = ["grow", "breathe", "reproduce", "food", "water",
                          "die", "respond"]
            for i, opt in enumerate(options):
                if not any(cw in _normalize(opt) for cw in char_words):
                    return i, "This is not a characteristic of living things."

        if "dormant" in ql or "egg" in ql or "seed" in ql:
            for i, opt in enumerate(options):
                if "living" in _normalize(opt):
                    return i, "Seeds and eggs are living but in a dormant (resting) stage."

        for item, living, _ in LIVING_ITEMS:
            if living:
                for i, opt in enumerate(options):
                    if _normalize(item) in _normalize(opt):
                        expl = next((reason for itm, liv, reason in LIVING_ITEMS
                                     if _normalize(itm) == _normalize(item)), "")
                        return i, expl

        return 0, "Select the option describing a living thing."

    @staticmethod
    def solve_fill_blank(question: str, blanks: int = 1) -> Tuple[List[str], str]:
        """Return (list_of_answers, explanation)."""
        ql = question.lower()
        answers: List[str] = []

        if "characteristic" in ql or "feature" in ql:
            answers = [char for char, _ in _pick(LIVING_CHARACTERISTICS, blanks + 1, random.Random(42))][:blanks]
            expl = "Living things have key characteristics: growth, need for food and water, breathing, reproduction, response to stimuli, and a lifespan."
        elif "dormant" in ql:
            answers = ["seed", "egg"]
            expl = "Seeds and eggs are living things but appear non-living when dormant — they are waiting for the right conditions."
        elif "grow" in ql:
            answers = ["grow", "increases in size"]
            expl = "All living things grow — they increase in size as they get older."
        elif "reproduce" in ql:
            answers = ["reproduce", "produce new ones"]
            expl = "Living things reproduce — they produce young ones of their own kind."
        elif "stimulus" in ql or "respond" in ql:
            answers = ["respond to stimuli", "reaction"]
            expl = "Living things respond to stimuli like light, touch, sound, and heat."
        else:
            answers = ["growth", "breathing"]
            expl = "Living things share key characteristics such as growth, breathing, and reproduction."

        return answers[:blanks], expl

    @staticmethod
    def solve_multiple_correct(question: str, options: List[str]) -> Tuple[List[int], str]:
        """Return (list_of_correct_indices, explanation)."""
        ql = question.lower()
        correct_indices: List[int] = []
        expl_parts: List[str] = []

        if "living" in ql and "characteristic" in ql:
            char_keywords = ["grow", "breathe", "reproduce", "food", "water",
                             "die", "respond", "stimulus", "need", "living",
                             "produce", "increase", "move"]
            for i, opt in enumerate(options):
                on = _normalize(opt)
                if any(ck in on for ck in char_keywords):
                    correct_indices.append(i)
            expl_parts = [f"'{options[i]}' is a characteristic of living things." for i in correct_indices]

        elif "non-living" in ql:
            for i, opt in enumerate(options):
                on = _normalize(opt)
                if any(nc in on for nc in ["does not grow", "no life", "man-made",
                                            "made by", "no breathing", "cannot reproduce"]):
                    correct_indices.append(i)
            expl_parts = [f"'{options[i]}' is true for non-living things." for i in correct_indices]

        elif "dormant" in ql or "seed" in ql:
            for i, opt in enumerate(options):
                if "living" in _normalize(opt):
                    correct_indices.append(i)
            expl_parts = ["Seeds and eggs are living things in a dormant stage."]

        if not correct_indices:
            correct_indices = [0]
            expl_parts = ["Review the characteristics of living things."]

        return correct_indices, " ".join(expl_parts)

    @staticmethod
    def solve_true_false(statement: str) -> Tuple[bool, str]:
        sl = statement.lower()
        facts = {
            "seed is a living thing": (True, "A seed contains a baby plant and grows into a new plant."),
            "egg is a living thing": (True,  "A hen's egg contains a living chick that develops under warmth."),
            "stones are living": (False, "Stones do not grow, breathe, or reproduce."),
            "plants respond to stimuli": (True, "Plants grow towards sunlight and react to touch."),
            "non-living things grow": (False, "Non-living things do not grow on their own."),
            "mushroom is a living thing": (True, "Mushrooms grow and reproduce via spores."),
            "cloud is a living thing": (False,  "Clouds are water vapour and have no life processes."),
            "living things need food": (True, "All living things need food for energy and growth."),
            "non-living things breathe": (False, "Only living things breathe."),
            "carrot is a non-living thing": (False, "A carrot is a root (plant part) — it is a non-living part but comes from a living plant."),
        }
        for key, (val, expl) in facts.items():
            if key in sl:
                return val, expl

        if "living" in sl and ("grow" in sl or "breathe" in sl or "reproduce" in sl):
            return True, "Living things grow, breathe, and reproduce."
        if "non-living" in sl and "grow" in sl:
            return False, "Non-living things do not grow on their own."
        return True, "Apply the characteristics of living things to evaluate."

    @staticmethod
    def solve_short_answer(question: str) -> Tuple[str, str]:
        ql = question.lower()
        if "difference" in ql:
            ans = ("Living things grow, need food and water, breathe, reproduce, "
                   "and respond to stimuli. Non-living things do not do these things on their own.")
            expl = ("The key differences: living things grow, need food/water, "
                    "breathe, reproduce, and respond to stimuli. Non-living things lack all these.")
        elif "dormant" in ql or "seed" in ql or "egg" in ql:
            ans = "Seeds and eggs appear non-living but are actually living — they are in a dormant (resting) stage waiting for the right conditions like warmth, water, and air."
            expl = ("Dormant stage: seeds and eggs pause life activities but can become active "
                    "when conditions are suitable, proving they are living.")
        elif "stimulus" in ql or "respond" in ql:
            ans = ("A plant growing towards sunlight is an example. The sunlight is the "
                   "stimulus and the plant's growth towards it is the response.")
            expl = ("Phototropism: plants show response to stimuli by growing towards light.")
        else:
            ans = ("Living things grow, need food and water, breathe, reproduce, respond "
                   "to stimuli, and eventually die. Non-living things lack all these.")
            expl = "Use the five key characteristics to compare living and non-living things."

        return ans, expl

    def solve(self, q: Question) -> Tuple:
        """Dispatch to the right sub-solver."""
        t = q.qtype
        if t == QType.MCQ.value:
            return self.solve_mcq(q.question, q.options)
        elif t == QType.FILL_BLANK.value:
            return self.solve_fill_blank(q.question)
        elif t == QType.MULTIPLE_CORRECT.value:
            return self.solve_multiple_correct(q.question, q.options)
        elif t == QType.TRUE_FALSE.value:
            return self.solve_true_false(q.question)
        elif t == QType.SHORT_ANSWER.value:
            return self.solve_short_answer(q.question)
        return [], "Unknown question type."


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class Solver002:
    """
    Solver for c4_evs_002 — Parts of a plant.
    """

    node_id = NodeID.C4_EVS_002.value

    @staticmethod
    def solve_mcq(question: str, options: List[str]) -> Tuple[int, str]:
        ql = question.lower()
        part_map = {name.lower(): (func, detail) for name, func, detail in PLANT_PARTS}

        for part, (func, detail) in part_map.items():
            if part in ql or part[:4] in ql:
                if "which part" in ql or "name" in ql or "function of" in ql:
                    for i, opt in enumerate(options):
                        if part in _normalize(opt):
                            return i, f"{part.capitalize()}: {func}"

                func_keywords = {
                    "absorb water": "roots",
                    "absorb": "roots",
                    "anchor": "roots",
                    "support": "stem",
                    "transport": "stem",
                    "carries water": "stem",
                    "make food": "leaves",
                    "photosynthesis": "leaves",
                    "produce seed": "flower",
                    "seed": "flower",
                    "pollination": "flower",
                    "baby plant": "seed",
                    "new plant": "seed",
                    "grow into": "seed",
                    "store water": "stem",
                    "store food": "roots",
                }
                for kw, p in func_keywords.items():
                    if kw in ql and p == part:
                        for i, opt in enumerate(options):
                            if part in _normalize(opt):
                                return i, detail

        for name, adapt, part_label in PLANT_ADAPTATIONS:
            if name.lower() in ql or adapt.split()[0] in ql:
                for i, opt in enumerate(options):
                    if part_label.split(" — ")[0].lower() in _normalize(opt):
                        return i, f"{name}: {adapt} — this is done by the {part_label}."

        return 0, "Identify the plant part based on its function."

    @staticmethod
    def solve_fill_blank(question: str, blanks: int = 1) -> Tuple[List[str], str]:
        ql = question.lower()
        answers: List[str] = []

        part_func = {
            "water and minerals": ["roots", "Roots"],
            "absorb": ["roots", "Roots"],
            "support": ["stem", "Stem"],
            "food": ["leaves", "Leaves"],
            "photosynthesis": ["leaves", "Leaves"],
            "sunlight": ["leaves", "Leaves"],
            "seed": ["flower", "Flower"],
            "reproduce": ["flower", "Flower"],
            "pollination": ["flower", "Flower"],
            "baby plant": ["seed", "Seed"],
            "new plant": ["seed", "Seed"],
            "five parts": ["roots, stem, leaves, flower, and seed",
                           "roots, stem, leaf, flower, and seed"],
        }

        for keyword, ans_list in part_func.items():
            if keyword in ql:
                answers = ans_list[:blanks]
                break

        if not answers:
            answers = ["roots"] * blanks

        part_name = answers[0].rstrip("s") if answers else "root"
        detail = next((d for n, f, d in PLANT_PARTS if part_name in n.lower()), "")
        expl = detail if detail else "Refer to the function of plant parts."

        return answers[:blanks], expl

    @staticmethod
    def solve_match(pairs_question: str, col_a: List[str], col_b: List[str]) -> Tuple[List[int], str]:
        """
        Given column A items, return correct indices into column B.
        """
        func_map = {
            "root": 0, "roots": 0,
            "stem": 1,
            "leaf": 2, "leaves": 2,
            "flower": 3,
            "seed": 4,
        }

        b_map = {_normalize(b): i for i, b in enumerate(col_b)}

        result: List[int] = []
        for item in col_a:
            in_l = _normalize(item)
            for key, idx in func_map.items():
                if key in in_l:
                    _, func, _ = PLANT_PARTS[idx]
                    for j, b_item in enumerate(col_b):
                        if any(kw in _normalize(b_item) for kw in func.lower().split()[:3]):
                            result.append(j)
                            break
                    break
            else:
                result.append(0)

        expl = "Match each plant part to its correct function based on the syllabus."
        return result, expl

    @staticmethod
    def solve_true_false(statement: str) -> Tuple[bool, str]:
        sl = statement.lower()
        true_facts = {
            "roots absorb water": (True, "Roots absorb water and minerals from the soil."),
            "stem supports the plant": (True, "The stem holds the plant upright and supports it."),
            "leaves make food": (True, "Leaves make food through photosynthesis using sunlight."),
            "flowers produce seeds": (True, "Flowers produce seeds after pollination."),
            "seeds grow into new plants": (True, "Seeds contain a baby plant and grow under the right conditions."),
            "stem transports water": (True, "The stem carries water from roots to leaves."),
            "cactus stem stores water": (True, "The cactus stem stores water for dry periods."),
            "carrot is a root": (True, "A carrot is a taproot that stores food underground."),
        }
        false_facts = {
            "roots make food": (False, "Roots do not make food — they absorb water and minerals."),
            "leaves absorb water": (False, "Leaves make food; roots absorb water."),
            "flowers absorb water": (False, "Flowers produce seeds; roots absorb water."),
            "seeds are non-living": (False, "Seeds are living — they contain a baby plant that grows."),
            "stem absorbs water": (False, "The stem transports water; roots absorb it."),
        }
        all_facts = {**true_facts, **false_facts}
        for key, (val, expl) in all_facts.items():
            if key in sl:
                return val, expl
        return True, "Apply knowledge of plant part functions."

    def solve(self, q: Question) -> Tuple:
        t = q.qtype
        if t == QType.MCQ.value:
            return self.solve_mcq(q.question, q.options)
        elif t == QType.FILL_BLANK.value:
            return self.solve_fill_blank(q.question)
        elif t == QType.MATCH.value:
            return self.solve_match(q.question, q.options[:5], q.options[5:])
        elif t == QType.TRUE_FALSE.value:
            return self.solve_true_false(q.question)
        return [], "Unknown type."


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class Solver003:
    """
    Solver for c4_evs_003 — Main internal organs.
    """

    node_id = NodeID.C4_EVS_003.value

    @staticmethod
    def solve_mcq(question: str, options: List[str]) -> Tuple[int, str]:
        ql = question.lower()
        organ_map = {name.lower(): (loc, func) for name, loc, func in ORGANS}

        for organ, (loc, func) in organ_map.items():
            if organ in ql or organ[:4] in ql:
                if "where" in ql or "location" in ql or "found" in ql or "situated" in ql:
                    for i, opt in enumerate(options):
                        if loc.lower().split()[0] in _normalize(opt):
                            return i, f"{organ.capitalize()} is located in the {loc}."
                if "function" in ql or "does" in ql or "job" in ql or "helps" in ql:
                    for i, opt in enumerate(options):
                        on = _normalize(opt)
                        for word in func.lower().split():
                            if len(word) > 3 and word in on:
                                return i, f"{organ.capitalize()}: {func}"
                if "which organ" in ql or "name" in ql or "called" in ql:
                    for i, opt in enumerate(options):
                        if organ in _normalize(opt):
                            return i, f"{organ.capitalize()}: {func}"

        for organ, (loc, func) in organ_map.items():
            chest_keywords = ["chest", "thorax"]
            if any(ck in ql for ck in chest_keywords):
                for i, opt in enumerate(options):
                    if organ in _normalize(opt) or organ[:4] in _normalize(opt):
                        return i, f"{organ.capitalize()} is found in the chest. {func}"

        abdomen_keywords = ["abdomen", "stomach area", "belly"]
        if any(ak in ql for ak in abdomen_keywords):
            for organ, (loc, func) in organ_map.items():
                if "abdomen" in loc.lower():
                    for i, opt in enumerate(options):
                        if organ in _normalize(opt):
                            return i, f"{organ.capitalize()} is found in the abdomen. {func}"

        if "head" in ql or "skull" in ql:
            for i, opt in enumerate(options):
                if "brain" in _normalize(opt):
                    return i, "The brain is located in the head inside the skull. It controls the body."

        return 0, "Identify the organ based on its name, location, or function."

    @staticmethod
    def solve_fill_blank(question: str, blanks: int = 1) -> Tuple[List[str], str]:
        ql = question.lower()
        answers: List[str] = []

        organ_info = {name.lower(): (loc, func) for name, loc, func in ORGANS}

        for organ, (loc, func) in organ_info.items():
            if organ in ql or organ[:4] in ql:
                if "location" in ql or "where" in ql or "found" in ql:
                    answers = [loc.split("(")[0].strip()]
                elif "function" in ql or "does" in ql:
                    key = func.split("—")[0].strip() if "—" in func else func.split(".")[0].strip()
                    answers = [key]
                else:
                    answers = [organ.capitalize()]
                break

        if not answers:
            if "pump" in ql or "blood" in ql:
                answers = ["Heart"]
            elif "breathe" in ql or "air" in ql:
                answers = ["Lungs"]
            elif "think" in ql or "control" in ql:
                answers = ["Brain"]
            elif "digest" in ql or "food" in ql:
                answers = ["Stomach"]
            else:
                answers = ["Heart"]

        expl = next((f"{n.capitalize()}: {f}" for n, l, f in ORGANS
                     if n.lower() == answers[0].lower()),
                    next((f"{n.capitalize()}: {f}" for n, l, f in ORGANS), ""))
        return answers[:blanks], expl

    @staticmethod
    def solve_true_false(statement: str) -> Tuple[bool, str]:
        sl = statement.lower()
        facts = {
            "heart pumps blood": (True,  "The heart pumps blood to all parts of the body."),
            "lungs help us breathe": (True, "The lungs help us breathe by taking in oxygen."),
            "brain controls the body": (True, "The brain controls the body and enables thinking."),
            "stomach digests food": (True, "The stomach digests the food we eat."),
            "liver cleans the blood": (True, "The liver cleans the blood and helps digest fats."),
            "kidneys filter blood": (True, "Kidneys filter waste from blood and make urine."),
            "intestines absorb nutrients": (True, "Intestines absorb nutrients from digested food."),
            "heart is in the abdomen": (False, "The heart is located in the chest, not the abdomen."),
            "brain is in the chest": (False, "The brain is located in the head inside the skull."),
            "lungs digest food": (False, "Lungs help us breathe — the stomach digests food."),
            "skin is an internal organ": (False, "Skin is an external body part, not an internal organ."),
            "eyes are internal organs": (False, "Eyes are external body parts."),
            "heart is an external organ": (False, "The heart is an internal organ inside the chest."),
            "stomach is in the head": (False, "The stomach is located in the abdomen."),
            "kidneys are in the chest": (False, "Kidneys are located in the abdomen."),
        }
        for key, (val, expl) in facts.items():
            if key in sl:
                return val, expl
        return True, "Apply knowledge of internal organs — their names, locations, and functions."

    @staticmethod
    def solve_short_answer(question: str) -> Tuple[str, str]:
        ql = question.lower()
        if "internal organ" in ql and ("difference" in ql or "external" in ql):
            ans = ("Internal organs are inside the body (e.g., heart, lungs, brain, stomach). "
                   "External body parts are on the outside (e.g., skin, eyes, ears, hands, legs).")
            expl = "Internal organs work inside the body; external body parts are on the body's surface."
        elif "work together" in ql or "keep" in ql:
            ans = ("All internal organs work together to keep the body healthy and working properly. "
                   "For example, the heart pumps blood carrying oxygen from the lungs to the brain "
                   "and nutrients from the stomach to all body cells.")
            expl = "Organs function as a team — each organ has a specific role that supports the others."
        elif "location" in ql or "where" in ql:
            ans = ("Heart — chest; Lungs — chest; Brain — head (skull); "
                   "Stomach, Liver, Kidneys, Intestines — abdomen.")
            expl = "Learn the approximate location of each organ in the body."
        elif "function" in ql or "work of" in ql or "job" in ql:
            ans = ("Heart: pumps blood; Lungs: help us breathe; Brain: controls the body; "
                   "Stomach: digests food; Liver: cleans blood; Kidneys: filter blood; "
                   "Intestines: absorb nutrients.")
            expl = "Each organ has a specific function essential for life."
        else:
            ans = ("The main internal organs are: Heart (chest), Lungs (chest), Brain (head), "
                   "Stomach (abdomen), Liver (abdomen), Kidneys (abdomen), and Intestines (abdomen).")
            expl = "Know the names, locations, and one function of each main internal organ."
        return ans, expl

    def solve(self, q: Question) -> Tuple:
        t = q.qtype
        if t == QType.MCQ.value:
            return self.solve_mcq(q.question, q.options)
        elif t == QType.FILL_BLANK.value:
            return self.solve_fill_blank(q.question)
        elif t == QType.TRUE_FALSE.value:
            return self.solve_true_false(q.question)
        elif t == QType.SHORT_ANSWER.value:
            return self.solve_short_answer(q.question)
        return [], "Unknown type."


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

_SOLVERS = {
    NodeID.C4_EVS_001.value: Solver001(),
    NodeID.C4_EVS_002.value: Solver002(),
    NodeID.C4_EVS_003.value: Solver003(),
}


def solve(node_id: str, q: Question) -> Tuple:
    """Dispatch to the correct solver for the given node."""
    solver = _SOLVERS.get(node_id)
    if solver is None:
        raise ValueError(f"No solver found for node: {node_id}")
    return solver.solve(q)


def verify_answer(node_id: str, q: Question, student_answer, answer_format: str = "auto") -> dict:
    """
    Verify a student's answer and return a dict with correctness + explanation.
    answer_format: 'index' | 'list' | 'bool' | 'text' | 'auto'
    """
    correct, expl = solve(node_id, q)
    result: dict = {"correct": False, "expected": correct, "explanation": expl}

    if answer_format == "auto":
        if q.qtype in (QType.MCQ.value,):
            answer_format = "index"
        elif q.qtype in (QType.MULTIPLE_CORRECT.value, QType.FILL_BLANK.value):
            answer_format = "list"
        elif q.qtype == QType.TRUE_FALSE.value:
            answer_format = "bool"
        else:
            answer_format = "text"

    if answer_format == "index":
        result["correct"] = (student_answer == correct)
    elif answer_format == "list":
        sa = [student_answer] if isinstance(student_answer, str) else list(student_answer)
        result["correct"] = (_normalize_list(sa) == _normalize_list(list(correct)))
    elif answer_format == "bool":
        result["correct"] = (bool(student_answer) == bool(correct))
    elif answer_format == "text":
        result["correct"] = _normalize(str(student_answer)) == _normalize(str(correct))

    return result


def _normalize_list(lst: list) -> list:
    return sorted([_normalize(str(x)) for x in lst])


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class QuestionGenerator:
    """
    Deterministic question generator for Class 4 EVS nodes.
    Uses a per-call seed for reproducibility.
    """

    def __init__(self, default_seed: int = 42):
        self.default_seed = default_seed
        self._node_weights = {
            NodeID.C4_EVS_001.value: 1,
            NodeID.C4_EVS_002.value: 1,
            NodeID.C4_EVS_003.value: 1,
        }

    # ── Node 001 ──────────────────────────────

    def _gen_001_mcq(self, rng: random.Random) -> Question:
        templates = [
            "Which of the following is a {adj} thing?",
            "Which of these {action} on its own?",
            "A {example} is which type of thing?",
            "Which one shows {stimulus_response}?",
        ]
        adj_templates = [
            ("living",   [itm for itm, liv, _ in LIVING_ITEMS if liv]),
            ("non-living", [itm for itm, liv, _ in LIVING_ITEMS if not liv]),
        ]
        adj, pool = adj_templates[rng.randint(0, 1)]
        correct_item = rng.choice(pool)
        distractors = _pick([itm for itm, liv, _ in LIVING_ITEMS
                             if itm != correct_item and (liv if adj == "living" else not liv)],
                            3, rng)
        opts = _shuffle([correct_item] + distractors, rng)

        q_text = f"Which of the following is a {adj} thing?"
        if rng.random() < 0.4:
            q_text = f"A {correct_item} is which type of thing?"
        if rng.random() < 0.3:
            stim_text, _ = rng.choice(STIMULI_EXAMPLES)
            q_text = f"Which of the following shows response to a stimulus?"
            opts = _shuffle([stim_text.split()[0].lower() + " showing phototropism",
                             "A stone sitting still",
                             "A cloud floating",
                             "A book lying on a table"], rng)
            correct_item_lower = stim_text.split()[0].lower()
            for i, o in enumerate(opts):
                if correct_item_lower in _normalize(o):
                    correct_idx = i
                    break
            else:
                correct_idx = 0
            expl = next((reason for itm, liv, reason in LIVING_ITEMS
                         if correct_item_lower in _normalize(itm)),
                        "Living things respond to stimuli.")
            return Question(NodeID.C4_EVS_001.value, QType.MCQ.value, Difficulty.EASY.value,
                            q_text, opts, [opts[correct_idx]], expl)

        correct_idx = next(i for i, o in enumerate(opts) if correct_item.lower() in _normalize(o))
        expl = next((reason for itm, liv, reason in LIVING_ITEMS
                     if _normalize(itm) == _normalize(correct_item)),
                    "Living things grow, breathe, and reproduce.")
        return Question(NodeID.C4_EVS_001.value, QType.MCQ.value, Difficulty.EASY.value,
                        q_text, opts, [opts[correct_idx]], expl)

    def _gen_001_fill_blank(self, rng: random.Random) -> Question:
        char, expl = rng.choice(LIVING_CHARACTERISTICS)
        templates = [
            f"One characteristic of living things is that they _______.",
            f"All living things _______ — {expl.lower()}.",
            f"Living things _______ over time.",
            f"Living things need _______ and water to survive.",
        ]
        if "grow" in char.lower():
            blanks_map = {"blank": ["grow"], "expl": expl}
        elif "food" in char.lower():
            blanks_map = {"blank": ["need food"], "expl": expl}
        elif "breathe" in char.lower():
            blanks_map = {"blank": ["breathe"], "expl": expl}
        elif "reproduce" in char.lower():
            blanks_map = {"blank": ["reproduce"], "expl": expl}
        elif "respond" in char.lower():
            blanks_map = {"blank": ["respond to stimuli"], "expl": expl}
        elif "die" in char.lower():
            blanks_map = {"blank": ["die"], "expl": expl}
        else:
            blanks_map = {"blank": [char.split()[0]], "expl": expl}

        q_text = rng.choice(templates).format(blank="_______")
        return Question(NodeID.C4_EVS_001.value, QType.FILL_BLANK.value, Difficulty.EASY.value,
                        q_text, correct=blanks_map["blank"], explanation=blanks_map["expl"])

    def _gen_001_tf(self, rng: random.Random) -> Question:
        facts = [
            ("A seed is a living thing.", True, "A seed contains a baby plant and grows when conditions are right."),
            ("A hen's egg is a non-living thing.", False, "A hen's egg contains a living chick; it's just dormant."),
            ("A stone grows over time.", False, "A stone is non-living and does not grow."),
            ("Plants do not respond to stimuli.", False, "Plants grow towards sunlight — a response to light."),
            ("All living things eventually die.", True, "All living things have a lifespan and die eventually."),
            ("A mushroom is a living thing.", True, "Mushrooms grow and reproduce, so they are living."),
            ("Non-living things breathe.", False, "Only living things breathe."),
            ("A toy car is a living thing.", False, "A toy car is man-made and has no life processes."),
            ("Living things do not need food.", False, "All living things need food for energy."),
            ("A butterfly reproduces.", True, "Butterflies lay eggs that hatch into new butterflies."),
        ]
        stmt, val, expl = rng.choice(facts)
        return Question(NodeID.C4_EVS_001.value, QType.TRUE_FALSE.value, Difficulty.EASY.value,
                        stmt, correct=[str(val)], explanation=expl)

    def _gen_001_multiple_correct(self, rng: random.Random) -> Question:
        all_chars = [c for c, _ in LIVING_CHARACTERISTICS]
        selected = _pick(all_chars, rng.randint(2, 4), rng)
        distractors = ["Makes its own light", "Floats in air", "Reflects images",
                       "Stays the same size always", "Never dies"]
        opts = _shuffle(selected + _pick(distractors, 3, rng), rng)
        correct_indices = [i for i, o in enumerate(opts) if o in selected]
        expl = "These are all characteristics of living things: " + ", ".join(selected) + "."
        return Question(NodeID.C4_EVS_001.value, QType.MULTIPLE_CORRECT.value,
                        Difficulty.MEDIUM.value,
                        "Which of the following are characteristics of living things? (Select all that apply)",
                        opts, [str(i) for i in correct_indices], expl)

    # ── Node 002 ──────────────────────────────

    def _gen_002_mcq(self, rng: random.Random) -> Question:
        templates = [
            "Which part of the plant _______?",
            "The _______ is responsible for _______.",
            "Which plant part _______?",
            "In a flowering plant, the _______ _______.",
        ]
        parts = PLANT_PARTS
        part = rng.choice(parts)
        name, func, detail = part

        q_types = rng.randint(0, 3)
        if q_types == 0:
            kw_func = {
                "absorb water": "absorbs water and minerals",
                "support": "supports the plant",
                "make food": "makes food for the plant",
                "produce seed": "produces seeds",
                "contains baby plant": "contains a baby plant",
                "transport water": "transports water and food",
            }
            func_q = rng.choice(list(kw_func.keys()))
            correct_ans = name
            q_text = f"Which part of the plant {func_q}?"
            distractors = [p[0] for p in PLANT_PARTS if p[0] != name]
            opts = _shuffle([correct_ans] + _pick(distractors, 3, rng), rng)
            correct_idx = next(i for i, o in enumerate(opts) if o == correct_ans)
        elif q_types == 1:
            q_text = f"What is the function of the {name.lower()}?"
            other_funcs = [p[1] for p in PLANT_PARTS if p[0] != name]
            opts = _shuffle([func] + _pick(other_funcs, 3, rng), rng)
            correct_idx = next(i for i, o in enumerate(opts) if func[:20] in o)
        elif q_types == 2:
            adapt = rng.choice(PLANT_ADAPTATIONS)
            aname, adesc, ap_label = adapt
            q_text = f"A {aname.lower()} _______ — which plant part is this?"
            opts = _shuffle([ap_label.split(" — ")[0]] +
                            [p[0] for p in PLANT_PARTS if p[0] != ap_label.split(" — ")[0]], rng)
            correct_idx = next(i for i, o in enumerate(opts)
                               if ap_label.split(" — ")[0].lower() in _normalize(o))
            func = f"{aname}: {adesc}"
        else:
            q_text = f"Which statement about the {name.lower()} is correct?"
            opts = _shuffle([detail] + [p[1] for p in PLANT_PARTS if p[0] != name][:3], rng)
            correct_idx = next(i for i, o in enumerate(opts) if detail[:20] in o)

        return Question(NodeID.C4_EVS_002.value, QType.MCQ.value, Difficulty.EASY.value,
                        q_text, opts, [opts[correct_idx]], detail)

    def _gen_002_fill_blank(self, rng: random.Random) -> Question:
        part = rng.choice(PLANT_PARTS)
        name, func, detail = part
        templates = [
            f"The _______ of a plant {func.lower()}.",
            f"_______ help the plant by {detail.lower()}.",
            f"Plant _______ are responsible for {func.lower().split(' and')[0]}.",
        ]
        q_text = rng.choice(templates)
        return Question(NodeID.C4_EVS_002.value, QType.FILL_BLANK.value, Difficulty.EASY.value,
                        q_text, correct=[name], explanation=detail)

    def _gen_002_tf(self, rng: random.Random) -> Question:
        facts = [
            ("Roots absorb water from the soil.", True, "Roots anchor the plant and absorb water and minerals."),
            ("The stem makes food for the plant.", False, "Leaves make food; the stem supports and transports."),
            ("Leaves make food through photosynthesis.", True, "Leaves use sunlight, water, and CO2 to make food."),
            ("Flowers help the plant grow taller.", False, "Flowers produce seeds for reproduction, not height growth."),
            ("Seeds grow into new plants.", True, "Seeds contain a baby plant and grow into new plants."),
            ("Stems transport food between roots and leaves.", True, "The stem acts as a pipeline for water and food."),
            ("Leaves absorb water from the soil.", False, "Roots absorb water; leaves make food using sunlight."),
            ("Cactus stem stores water.", True, "The thick cactus stem stores water for dry conditions."),
        ]
        stmt, val, expl = rng.choice(facts)
        return Question(NodeID.C4_EVS_002.value, QType.TRUE_FALSE.value, Difficulty.EASY.value,
                        stmt, correct=[str(val)], explanation=expl)

    def _gen_002_match(self, rng: random.Random) -> Question:
        selected = _pick(PLANT_PARTS, rng.randint(3, 5), rng)
        col_a = [name for name, _, _ in selected]
        col_b_details = [func for _, func, _ in selected]
        col_b_short = [d[:60] + ("..." if len(d) > 60 else "") for d in col_b_details]
        col_b_display = _shuffle(col_b_short, rng)

        q_text = "Match each plant part (Column A) with its function (Column B):\n"
        q_text += "Column A: " + " | ".join(f"{i+1}. {n}" for i, n in enumerate(col_a)) + "\n"
        q_text += "Column B: " + " | ".join(f"{chr(97+i)}. {b}" for i, b in enumerate(col_b_display))

        # correct indices into col_b_display
        correct_indices = [col_b_display.index(col_b_short[i]) for i in range(len(col_a))]

        all_options = col_a + col_b_display  # pass as options for solver
        return Question(NodeID.C4_EVS_002.value, QType.MATCH.value, Difficulty.MEDIUM.value,
                        q_text, all_options, [str(i) for i in correct_indices],
                        "Match roots → absorb water, stem → support/transport, "
                        "leaves → make food, flower → produce seeds, seed → grow into new plant.")

    # ── Node 003 ──────────────────────────────

    def _gen_003_mcq(self, rng: random.Random) -> Question:
        templates = [
            "Which organ is found in the _______?",
            "What is the function of the _______?",
            "Which organ _______?",
            "The _______ is located in the _______.",
        ]
        organ = rng.choice(ORGANS)
        name, loc, func = organ
        loc_simple = loc.split("(")[0].strip()

        q_type = rng.randint(0, 3)
        if q_type == 0:
            q_text = f"Which organ is located in the {loc_simple}?"
            same_loc_organs = [o[0] for o in ORGANS if loc_simple in o[1]]
            diff_loc = [o[0] for o in ORGANS if loc_simple not in o[1]]
            opts = _shuffle(_pick(same_loc_organs, 1, rng) + _pick(diff_loc, 3, rng), rng)
            correct_idx = next(i for i, o in enumerate(opts) if name.lower() in _normalize(o))
            expl = f"{name} is found in the {loc}. {func}."
        elif q_type == 1:
            key_verbs = {
                "pump blood": "pump blood",
                "help us breathe": "help us breathe",
                "control": "controls",
                "digest food": "digest",
                "clean blood": "cleans",
                "filter": "filter",
                "absorb": "absorb",
                "think": "control",
            }
            func_kw = rng.choice(list(key_verbs.keys()))
            q_text = f"Which organ {func_kw}?"
            opts = _shuffle([name] + _pick([o[0] for o in ORGANS if o[0] != name], 3, rng), rng)
            correct_idx = next(i for i, o in enumerate(opts) if name.lower() in _normalize(o))
            expl = f"{name}: {func}"
        elif q_type == 2:
            q_text = f"The organ that {func.lower().split('—')[0].strip()} is called the _______."
            opts = _shuffle([name] + _pick([o[0] for o in ORGANS if o[0] != name], 3, rng), rng)
            correct_idx = next(i for i, o in enumerate(opts) if name.lower() in _normalize(o))
            expl = f"{name}: {func}"
        else:
            q_text = f"Where is the {name.lower()} located?"
            all_locs = ["Chest", "Head (inside skull)", "Abdomen"]
            opts = _shuffle([loc_simple] + _pick([l for l in all_locs if l != loc_simple], 3, rng), rng)
            correct_idx = next(i for i, o in enumerate(opts) if loc_simple.lower() in _normalize(o))
            expl = f"{name} is located in the {loc}. {func}."

        return Question(NodeID.C4_EVS_003.value, QType.MCQ.value, Difficulty.EASY.value,
                        q_text, opts, [opts[correct_idx]], expl)

    def _gen_003_fill_blank(self, rng: random.Random) -> Question:
        organ = rng.choice(ORGANS)
        name, loc, func = org = organ
        loc_simple = loc.split("(")[0].strip()

        templates = [
            f"The _______ is located in the {loc_simple.lower()}.",
            f"The organ that {func.lower().split('—')[0].strip()} is the _______.",
            f"The _______ is found inside the chest." if "chest" in loc.lower() else
            f"The _______ helps us breathe." if "lung" in name.lower() else
            f"The _______ controls the whole body." if "brain" in name.lower() else
            f"Organ in the {loc_simple.lower()} that {func.lower().split('—')[0].strip()}: _______",
        ]
        q_text = rng.choice(templates)
        return Question(NodeID.C4_EVS_003.value, QType.FILL_BLANK.value, Difficulty.EASY.value,
                        q_text, correct=[name], explanation=f"{name}: {func}")

    def _gen_003_tf(self, rng: random.Random) -> Question:
        facts = [
            ("The heart pumps blood.", True, "The heart acts as a pump sending blood throughout the body."),
            ("The brain is located in the chest.", False, "The brain is located in the head inside the skull."),
            ("The lungs help us breathe.", True, "The lungs take in oxygen and remove carbon dioxide."),
            ("The stomach is in the head.", False, "The stomach is located in the abdomen."),
            ("Kidneys are internal organs.", True, "Kidneys are inside the body in the abdomen."),
            ("Skin is an internal organ.", False, "Skin is an external body part — it is on the surface."),
            ("The liver cleans the blood.", True, "The liver removes harmful substances from the blood."),
            ("Eyes are internal organs.", False, "Eyes are external body parts on the face."),
            ("The heart is found in the abdomen.", False, "The heart is located in the chest."),
            ("All organs work independently.", False, "All organs work together to keep the body healthy."),
        ]
        stmt, val, expl = rng.choice(facts)
        return Question(NodeID.C4_EVS_003.value, QType.TRUE_FALSE.value, Difficulty.EASY.value,
                        stmt, correct=[str(val)], explanation=expl)

    # ── PUBLIC GENERATE API ────────────────────

    def generate(self, node_id: str, qtype: Optional[str] = None,
                 difficulty: Optional[str] = None, seed: Optional[int] = None) -> Question:
        """
        Generate one question for the given node.

        Parameters
        ----------
        node_id : str   — one of the three NodeID values
        qtype   : str | None — 'mcq', 'fill_blank', 'match', 'true_false',
                               'multiple_correct', 'short_answer'; None = random
        difficulty : str | None — 'Easy', 'Medium', 'Hard'; None = random
        seed    : int | None — override RNG seed (None → self.default_seed)

        Returns
        -------
        Question  dataclass with all fields populated deterministically.
        """
        rng = random.Random(seed if seed is not None else self.default_seed)

        if qtype is None:
            qtype = rng.choice([QType.MCQ.value, QType.FILL_BLANK.value,
                                QType.TRUE_FALSE.value, QType.MATCH.value])

        if difficulty is None:
            diff_choices = [Difficulty.EASY.value, Difficulty.EASY.value,
                            Difficulty.MEDIUM.value]
            difficulty = rng.choice(diff_choices)

        node_map = {
            NodeID.C4_EVS_001.value: {
                QType.MCQ.value:            self._gen_001_mcq,
                QType.FILL_BLANK.value:     self._gen_001_fill_blank,
                QType.TRUE_FALSE.value:     self._gen_001_tf,
                QType.MULTIPLE_CORRECT.value: self._gen_001_multiple_correct,
            },
            NodeID.C4_EVS_002.value: {
                QType.MCQ.value:            self._gen_002_mcq,
                QType.FILL_BLANK.value:     self._gen_002_fill_blank,
                QType.TRUE_FALSE.value:     self._gen_002_tf,
                QType.MATCH.value:          self._gen_002_match,
            },
            NodeID.C4_EVS_003.value: {
                QType.MCQ.value:            self._gen_003_mcq,
                QType.FILL_BLANK.value:     self._gen_003_fill_blank,
                QType.TRUE_FALSE.value:     self._gen_003_tf,
            },
        }

        node_generators = node_map.get(node_id)
        if node_generators is None:
            raise ValueError(f"Unknown node_id: {node_id}")

        generator = node_generators.get(qtype)
        if generator is None:
            available = list(node_generators.keys())
            qtype = rng.choice(available)
            generator = node_generators[qtype]

        return generator(rng)

    def generate_set(self, node_ids: Optional[List[str]] = None,
                     questions_per_node: int = 3,
                     seed: Optional[int] = None) -> List[Question]:
        """
        Generate a batch of questions across nodes.

        Parameters
        ----------
        node_ids           : list of node IDs (None → all three)
        questions_per_node : int — questions per node
        seed               : int | None — master seed

        Returns
        -------
        List of Question objects, deterministically ordered.
        """
        if node_ids is None:
            node_ids = [NodeID.C4_EVS_001.value, NodeID.C4_EVS_002.value, NodeID.C4_EVS_003.value]

        rng = random.Random(seed if seed is not None else self.default_seed)
        questions: List[Question] = []

        for node_id in node_ids:
            node_seed = rng.randint(0, 2**31 - 1)
            node_rng = random.Random(node_seed)
            qtypes_pool = list({
                NodeID.C4_EVS_001.value: [QType.MCQ.value, QType.FILL_BLANK.value,
                                          QType.TRUE_FALSE.value, QType.MULTIPLE_CORRECT.value],
                NodeID.C4_EVS_002.value: [QType.MCQ.value, QType.FILL_BLANK.value,
                                          QType.TRUE_FALSE.value, QType.MATCH.value],
                NodeID.C4_EVS_003.value: [QType.MCQ.value, QType.FILL_BLANK.value,
                                          QType.TRUE_FALSE.value],
            }.get(node_id, [QType.MCQ.value]))

            for i in range(questions_per_node):
                qtype = qtypes_pool[i % len(qtypes_pool)]
                q_seed = node_seed + i + 1
                q = self.generate(node_id=node_id, qtype=qtype, seed=q_seed)
                questions.append(q)

        return questions

    def print_question(self, q: Question) -> None:
        """Pretty-print a single question."""
        print(f"\n{'='*60}")
        print(f"Node  : {q.node_id}")
        print(f"Type  : {q.qtype}")
        print(f"Level : {q.difficulty}")
        print(f"{'─'*60}")
        print(f"Q: {q.question}")
        if q.options:
            for i, opt in enumerate(q.options):
                marker = "✓" if opt in q.correct else " "
                print(f"  {marker} {chr(65+i)}. {opt}")
        print(f"{'─'*60}")
        print(f"Correct : {q.correct}")
        print(f"Reason  : {q.explanation}")
        print("=" * 60)


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

if __name__ == "__main__":
    gen = QuestionGenerator(default_seed=42)
    nodes = [NodeID.C4_EVS_001.value, NodeID.C4_EVS_002.value, NodeID.C4_EVS_003.value]

    print("=" * 70)
    print("  EVS CLASS 4 — SOLVER + GENERATOR DEMO")
    print("  Nodes: c4_evs_001 | c4_evs_002 | c4_evs_003")
    print("=" * 70)

    print("\n📝 GENERATED QUESTIONS\n")
    all_qs = gen.generate_set(node_ids=nodes, questions_per_node=2, seed=42)
    for q in all_qs:
        gen.print_question(q)

    print("\n🔍 SOLVER VERIFICATION\n")
    demo_q = gen.generate(node_id=NodeID.C4_EVS_001.value, qtype=QType.MCQ.value, seed=100)
    gen.print_question(demo_q)
    correct_idx, explanation = solve(demo_q.node_id, demo_q)
    print(f"\n  Solver correct index : {correct_idx}")
    print(f"  Solver explanation   : {explanation}")
    print(f"  Generator correct idx: {demo_q.mcq_correct_index()}")
    match = "✅ MATCH" if correct_idx == demo_q.mcq_correct_index() else "❌ MISMATCH"
    print(f"  Verification         : {match}")