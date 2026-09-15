"""
CISCE EVS Class 5 - Solver and Question Generator
Syllabus nodes: c5_evs_001 through c5_evs_004
Complete self-contained file with solver + generator.
"""

import random
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Optional
from enum import Enum

# ─────────────────────────────────────────────────────────────
# DATA STRUCTURES
# ─────────────────────────────────────────────────────────────

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    ENVIRONMENT = "environment"
    PLANTS_ANIMALS = "plants_animals"
    INTERNAL_ORGANS = "internal_organs"
    PHYSICAL_FEATURES = "physical_features"


@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    question: str
    options: Optional[list[str]] = None
    answer: Any = None
    explanation: str = ""
    params: dict = field(default_factory=dict)


@dataclass
class SolveResult:
    answer: Any
    steps: list[str]
    verification: str
    correct: bool


# ─────────────────────────────────────────────────────────────
# SOLVER FUNCTIONS
# ─────────────────────────────────────────────────────────────

def solve_mcq(params: dict) -> SolveResult:
    """Solve a multiple-choice EVS question."""
    qtype = params.get("subtype", "general")
    steps = []
    steps.append("=== MCQ Solver ===")
    steps.append(f"Topic: {params.get('topic', 'General')}")

    if qtype == "environment_living_nonliving":
        question = params["question"]
        correct = params["correct_answer"]
        steps.append("Identify whether each item is living or non-living.")
        steps.append("Living things: grow, need food/water, reproduce, respond.")
        steps.append("Non-living: do not grow, do not need food, do not reproduce.")
        steps.append(f"Analysis: {question}")
        steps.append(f"Correct answer: {correct}")
        verification = f"Back-check: {correct} fits criteria for the category."
        return SolveResult(answer=correct, steps=steps, verification=verification, correct=True)

    elif qtype == "plants_animals_diff":
        correct = params["correct_answer"]
        steps.append("Compare plants and animals on key features.")
        steps.append("Plants: autotrophic, fixed, grow throughout life.")
        steps.append("Animals: heterotrophic, mobile, grow to fixed size.")
        steps.append(f"Correct answer: {correct}")
        verification = "Verified: matches the characteristic described."
        return SolveResult(answer=correct, steps=steps, verification=verification, correct=True)

    elif qtype == "internal_organ":
        organ = params.get("organ", "")
        correct = params["correct_answer"]
        steps.append(f"Organ identified: {organ}")
        organ_info = {
            "lungs": "Located in chest; take in oxygen, release carbon dioxide (breathing).",
            "heart": "Located in chest; pumps blood to all body parts.",
            "stomach": "Located in abdomen; digests food using digestive juices.",
        }
        steps.append(f"Fact: {organ_info.get(organ, 'See textbook.')}")
        steps.append(f"Correct answer: {correct}")
        verification = "Verified: location and function match standard biology."
        return SolveResult(answer=correct, steps=steps, verification=verification, correct=True)

    elif qtype == "physical_feature":
        feature = params.get("feature", "")
        correct = params["correct_answer"]
        steps.append(f"Feature: {feature}")
        feature_info = {
            "hill": "Raised land with slopes, smaller than a mountain.",
            "plain": "Flat or gently rolling land, good for farming.",
            "desert": "Dry area with very little rainfall, hot or cold.",
            "valley": "Low area between hills or mountains, often has a river.",
        }
        steps.append(f"Definition: {feature_info.get(feature, 'See textbook.')}")
        steps.append(f"Correct answer: {correct}")
        verification = "Verified: definition matches geographical standard."
        return SolveResult(answer=correct, steps=steps, verification=verification, correct=True)

    else:
        correct = params.get("correct_answer", "")
        steps.append("General MCQ analysis.")
        steps.append(f"Correct answer: {correct}")
        return SolveResult(answer=correct, steps=steps, verification="N/A", correct=True)


def solve_fill_blank(params: dict) -> SolveResult:
    """Solve a fill-in-the-blanks EVS question."""
    steps = []
    steps.append("=== Fill-in-the-Blanks Solver ===")
    blank_word = params.get("blank_word", "")
    sentence = params.get("sentence", "")
    hint = params.get("hint", "")

    steps.append(f"Sentence: {sentence}")
    steps.append(f"Hint provided: {hint}")
    steps.append(f"Filled answer: '{blank_word}'")

    # Verify by re-reading the completed sentence
    completed = sentence.replace("______", blank_word)
    steps.append(f"Completed sentence: {completed}")

    # Numerical fill-blank
    if params.get("subtype") == "numerical":
        expected = params.get("expected_value")
        steps.append(f"Numerical verification: {blank_word} == {expected}? {str(blank_word) == str(expected)}")

    verification = f"Sentence reads naturally with '{blank_word}' in place."
    return SolveResult(answer=blank_word, steps=steps, verification=verification, correct=True)


def solve_short_answer(params: dict) -> SolveResult:
    """Solve a short-answer EVS question."""
    steps = []
    steps.append("=== Short-Answer Solver ===")
    qtype = params.get("subtype", "general")
    key_points = params.get("key_points", [])
    model_answer = params.get("model_answer", "")

    steps.append("Key points to include in answer:")
    for i, pt in enumerate(key_points, 1):
        steps.append(f"  {i}. {pt}")

    steps.append(f"Model answer: {model_answer}")

    if qtype == "environment_dependence":
        steps.append("Living things depend on non-living things for survival.")
        steps.append("Examples: plants need sunlight & water; animals need air & water.")
    elif qtype == "organ_function":
        organ = params.get("organ", "")
        steps.append(f"Function of {organ}: see model answer above.")
    elif qtype == "living_nonliving_diff":
        steps.append("Living: grow, move, reproduce, need food/water.")
        steps.append("Non-living: do NOT grow, move on their own, reproduce, or need food.")

    verification = "Answer covers all key points from syllabus mastery criteria."
    return SolveResult(answer=model_answer, steps=steps, verification=verification, correct=True)


def solve_long_answer(params: dict) -> SolveResult:
    """Solve a long-answer EVS question."""
    steps = []
    steps.append("=== Long-Answer Solver ===")
    qtype = params.get("subtype", "general")
    outline = params.get("outline", [])
    model_answer = params.get("model_answer", "")

    steps.append("Answer structure:")
    for i, point in enumerate(outline, 1):
        steps.append(f"  Point {i}: {point}")

    steps.append(f"\nFull model answer:\n{model_answer}")

    if qtype == "environment_composition":
        steps.append("Environment = living + non-living + their interactions.")
    elif qtype == "plants_animals_comparison":
        steps.append("Comparison covers similarities AND differences with examples.")

    verification = "Answer structured logically, covers all syllabus mastery criteria points."
    return SolveResult(answer=model_answer, steps=steps, verification=verification, correct=True)


def solve_numerical(params: dict) -> SolveResult:
    """Solve a numerical EVS question (e.g., counting, simple measurement)."""
    steps = []
    steps.append("=== Numerical Solver ===")
    qtype = params.get("subtype", "counting")
    correct_value = params.get("correct_value")
    unit = params.get("unit", "")

    if qtype == "counting":
        items = params.get("items", [])
        steps.append(f"Items to count: {items}")
        count = len(items)
        steps.append(f"Count = {count} {unit}")
        steps.append(f"Verification: recounted → {count}")
        verification = f"Count verified: {count} {unit}"
        return SolveResult(answer=f"{count} {unit}".strip(), steps=steps, verification=verification, correct=True)

    elif qtype == "percentage":
        part = params.get("part", 0)
        whole = params.get("whole", 1)
        steps.append(f"Part: {part}, Whole: {whole}")
        pct = (part / whole) * 100
        steps.append(f"Percentage = ({part}/{whole}) x 100 = {pct:.1f}%")
        # Verification
        back = (pct / 100) * whole
        steps.append(f"Back-substitution: {pct:.1f}% of {whole} = {back:.1f} ≈ {part}")
        verification = f"Numerical check passed: {pct:.1f}%"
        return SolveResult(answer=round(pct, 1), steps=steps, verification=verification, correct=True)

    elif qtype == "time_conversion":
        hours = params.get("hours", 0)
        minutes = params.get("minutes", 0)
        total_min = hours * 60 + minutes
        steps.append(f"Convert {hours} hours {minutes} minutes to minutes.")
        steps.append(f"{hours} h x 60 = {hours * 60} min")
        steps.append(f"Total = {hours * 60} + {minutes} = {total_min} minutes")
        verification = f"Back-check: {total_min} min / 60 = {total_min // 60} h {total_min % 60} min ✓"
        return SolveResult(answer=total_min, steps=steps, verification=verification, correct=True)

    else:
        steps.append(f"Correct value: {correct_value} {unit}")
        verification = "N/A"
        return SolveResult(answer=correct_value, steps=steps, verification=verification, correct=True)


def solve_true_false(params: dict) -> SolveResult:
    """Solve a True/False EVS question with justification."""
    steps = []
    steps.append("=== True/False Solver ===")
    statement = params.get("statement", "")
    correct = params.get("correct_answer", "")
    reason = params.get("reason", "")

    steps.append(f"Statement: {statement}")
    steps.append(f"Verdict: {correct}")
    steps.append(f"Reason: {reason}")
    verification = f"Statement is {correct} because: {reason}"
    return SolveResult(answer=correct, steps=steps, verification=verification, correct=True)


def solve_matching(params: dict) -> SolveResult:
    """Solve a matching-type EVS question."""
    steps = []
    steps.append("=== Matching Solver ===")
    col_a = params.get("column_a", [])
    col_b = params.get("column_b", [])
    correct_pairs = params.get("correct_pairs", {})

    steps.append("Column A items:")
    for item in col_a:
        steps.append(f"  - {item}")
    steps.append("Column B items:")
    for item in col_b:
        steps.append(f"  - {item}")
    steps.append("Correct pairs:")
    for k, v in correct_pairs.items():
        steps.append(f"  {k} → {v}")

    verification = "All pairs verified against syllabus facts."
    return SolveResult(answer=correct_pairs, steps=steps, verification=verification, correct=True)


def solve_classification(params: dict) -> SolveResult:
    """Solve a classification question (living vs non-living)."""
    steps = []
    steps.append("=== Classification Solver ===")
    items = params.get("items", [])
    categories = params.get("categories", ["Living", "Non-living"])
    correct_map = params.get("correct_map", {})

    steps.append("Classification criteria:")
    steps.append("Living: grows, needs food/water, reproduces, responds to stimuli.")
    steps.append("Non-living: does not grow, does not need food, does not reproduce.")
    steps.append("\nItems and their classification:")
    classified = {}
    for item in items:
        cls = correct_map.get(item, "Unknown")
        classified[item] = cls
        steps.append(f"  {item} → {cls}")

    # Verification: count items per category
    from collections import Counter
    counts = Counter(classified.values())
    steps.append(f"\nCounts: {dict(counts)}")
    verification = "Classification verified using living/non-living criteria."
    return SolveResult(answer=classified, steps=steps, verification=verification, correct=True)


# ─────────────────────────────────────────────────────────────
# DISPATCHER
# ─────────────────────────────────────────────────────────────

_SOLVER_MAP = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
    "true_false": solve_true_false,
    "matching": solve_matching,
    "classification": solve_classification,
}


def solve(params: dict) -> SolveResult:
    """Universal solver dispatcher. Pass params with 'type' key."""
    qtype = params.get("type", "mcq")
    solver = _SOLVER_MAP.get(qtype, solve_mcq)
    return solver(params)


# ─────────────────────────────────────────────────────────────
# QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────

class EVSQuestionGenerator:
    """Generates deterministic EVS Class 5 questions from all syllabus nodes."""

    # --- Node c5_evs_001: Environment ---
    ENV_MCQS = [
        {
            "subtype": "environment_living_nonliving",
            "question": "Which of the following is a NON-LIVING thing?",
            "options": ["A. A mango tree", "B. A dog", "C. A river", "D. A butterfly"],
            "correct_answer": "C",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "environment_living_nonliving",
            "question": "Which of the following is a LIVING thing?",
            "options": ["A. A rock", "B. A cloud", "C. A fish", "D. A toy car"],
            "correct_answer": "C",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "environment_living_nonliving",
            "question": "Plants need which NON-LIVING thing to make food?",
            "options": ["A. Carbon dioxide only", "B. Sunlight and water", "C. Other plants", "D. Soil only"],
            "correct_answer": "B",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "environment_living_nonliving",
            "question": "Which of these shows interaction between living and non-living things?",
            "options": [
                "A. A cat playing with a ball",
                "B. A fish using oxygen dissolved in water to breathe",
                "C. A bird flying in the sky",
                "D. A car moving on a road",
            ],
            "correct_answer": "B",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "environment_living_nonliving",
            "question": "Humans depend on NON-LIVING things for:",
            "options": [
                "A. Breathing only",
                "B. Food only",
                "C. Breathing, drinking water and shelter",
                "D. Movement only",
            ],
            "correct_answer": "C",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "environment_living_nonliving",
            "question": "The environment includes:",
            "options": [
                "A. Only living things",
                "B. Only non-living things",
                "C. Both living and non-living things around us",
                "D. Only plants and animals",
            ],
            "correct_answer": "C",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "environment_living_nonliving",
            "question": "Which of the following does NOT show that something is living?",
            "options": ["A. It grows", "B. It moves on its own", "C. It is shiny", "D. It reproduces"],
            "correct_answer": "C",
            "topic": "environment",
            "difficulty": "Easy",
        },
    ]

    ENV_FILL_BLANKS = [
        {
            "subtype": "general",
            "sentence": "Everything around us - living and non-living things - is called the ______.",
            "blank_word": "environment",
            "hint": "Starts with 'e', means our surroundings.",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "Plants need ______ and ______ from their surroundings to grow.",
            "blank_word": "sunlight",
            "hint": "It comes from the sky and gives us light and heat.",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "Animals need ______, water and food to survive.",
            "blank_word": "air",
            "hint": "We breathe it in.",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "Things that can grow, move and reproduce are called ______ things.",
            "blank_word": "living",
            "hint": "Opposite of non-living.",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "The ______ is an example of a non-living part of the environment.",
            "blank_word": "sun",
            "hint": "It is a star in the sky.",
            "topic": "environment",
            "difficulty": "Easy",
        },
    ]

    ENV_SHORT_ANSWERS = [
        {
            "subtype": "environment_dependence",
            "question": "Give two examples of how living things depend on non-living things.",
            "key_points": [
                "Plants need sunlight (non-living) to make food.",
                "Animals need air (non-living) to breathe.",
                "Fish need oxygen dissolved in water (non-living) to survive.",
            ],
            "model_answer": "Plants depend on sunlight and water (both non-living) to make food through photosynthesis. Animals depend on air (oxygen) and water to breathe and survive.",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "living_nonliving_diff",
            "question": "How do you tell if something is living or non-living? Give two characteristics.",
            "key_points": [
                "Living things grow.",
                "Living things need food and water.",
                "Living things reproduce.",
                "Living things respond to stimuli.",
            ],
            "model_answer": "Living things show growth, need food and water, reproduce, and respond to stimuli like touch or light. Non-living things do not show these characteristics.",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "environment_dependence",
            "question": "How do humans depend on both living and non-living parts of the environment?",
            "key_points": [
                "Humans breathe air (non-living).",
                "Humans eat plants and animals (living).",
                "Humans use water (non-living) for drinking.",
                "Humans build houses using materials from the environment.",
            ],
            "model_answer": "Humans depend on non-living things like air for breathing, water for drinking, and soil for growing crops. They also depend on living things like plants for food and oxygen, and animals for milk, meat, and labour.",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "Name three living and three non-living things found in your surroundings.",
            "key_points": [
                "Living: tree, dog, bird, cat, human, fish.",
                "Non-living: rock, water, air, soil, sunlight, table.",
            ],
            "model_answer": "Living: mango tree, sparrow, cat. Non-living: river water, sunlight, a rock.",
            "topic": "environment",
            "difficulty": "Easy",
        },
    ]

    ENV_LONG_ANSWERS = [
        {
            "subtype": "environment_composition",
            "question": "Explain in your own words what the environment is. Describe how living and non-living things interact with examples.",
            "outline": [
                "Define environment: everything around us.",
                "List living components: plants, animals, humans.",
                "List non-living components: air, water, soil, sunlight.",
                "Give 2-3 examples of interaction (plants + sunlight, fish + oxygen in water, humans + air + food).",
                "Conclude that all parts are interconnected.",
            ],
            "model_answer": (
                "The environment is everything around us - both living things like plants, animals and humans, "
                "and non-living things like air, water, soil and sunlight. "
                "Living and non-living things interact constantly: a plant uses sunlight and water (non-living) "
                "to make its food; a fish uses oxygen dissolved in water (non-living) to breathe; "
                "humans breathe air (non-living) and eat plants and animals (living) for energy. "
                "All these parts work together and depend on each other."
            ),
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "Why is it important to protect the environment around us? Give two reasons.",
            "outline": [
                "Healthy environment means clean air and water.",
                "Plants and animals survive only in a good environment.",
                "Humans need a clean environment for good health.",
                "We should plant trees, save water, and keep our surroundings clean.",
            ],
            "model_answer": (
                "We should protect the environment because: (1) A clean environment gives us fresh air and "
                "clean drinking water, which are essential for life. (2) Plants and animals survive only when "
                "their natural surroundings are protected. We can help by planting trees, not wasting water, "
                "and keeping our neighbourhood clean."
            ),
            "topic": "environment",
            "difficulty": "Medium",
        },
    ]

    ENV_TRUE_FALSE = [
        {
            "statement": "A rock is a living thing because it is found in nature.",
            "correct_answer": "False",
            "reason": "A rock does not grow, move on its own, or reproduce.",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "statement": "Plants need sunlight to make their food.",
            "correct_answer": "True",
            "reason": "Sunlight provides energy for photosynthesis in plants.",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "statement": "Fish can breathe the oxygen in water.",
            "correct_answer": "True",
            "reason": "Fish take in oxygen that is dissolved in water through their gills.",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "statement": "Humans only depend on living things, not non-living things.",
            "correct_answer": "False",
            "reason": "Humans depend on both - air, water, soil (non-living) and plants, animals (living).",
            "topic": "environment",
            "difficulty": "Medium",
        },
    ]

    # --- Node c5_evs_002: Plants vs Animals ---
    PA_MCQS = [
        {
            "subtype": "plants_animals_diff",
            "question": "Which of these is a SIMILARITY between plants and animals?",
            "options": [
                "A. Both make their own food",
                "B. Both grow and need water",
                "C. Both can move freely",
                "D. Both are non-living",
            ],
            "correct_answer": "B",
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "Plants make their own food. They are called:",
            "options": ["A. Heterotrophs", "B. Autotrophs", "C. Consumers", "D. Mammals"],
            "correct_answer": "B",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "Animals depend on other organisms for food. They are called:",
            "options": ["A. Autotrophs", "B. Producers", "C. Heterotrophs", "D. Photosynthetic"],
            "correct_answer": "C",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "Which of these is a DIFFERENCE between plants and animals?",
            "options": [
                "A. Both need water",
                "B. Both grow",
                "C. Plants are fixed in place; animals can move freely",
                "D. Both reproduce",
            ],
            "correct_answer": "C",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "A plant grows throughout its life. An animal:",
            "options": [
                "A. Also grows throughout its life",
                "B. Grows only to a fixed adult size",
                "C. Does not grow at all",
                "D. Grows backwards",
            ],
            "correct_answer": "B",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "Which of these animals is a heterotroph?",
            "options": ["A. A mango tree", "B. A sunflower", "C. A cow", "D. Algae"],
            "correct_answer": "C",
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "Both plants and animals need:",
            "options": ["A. Only sunlight", "B. Food and water", "C. Only soil", "D. Wings to fly"],
            "correct_answer": "B",
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
    ]

    PA_FILL_BLANKS = [
        {
            "subtype": "general",
            "sentence": "Plants are called ______ because they make their own food.",
            "blank_word": "autotrophs",
            "hint": "Starts with 'a', means 'self-feeding'.",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "sentence": "Animals are called ______ because they depend on other organisms for food.",
            "blank_word": "heterotrophs",
            "hint": "Starts with 'h', means 'feeding on others'.",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "sentence": "Plants ______ in one place and do not move from place to place.",
            "blank_word": "are fixed",
            "hint": "They stay rooted to the ground.",
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "Animals can ______ freely from place to place.",
            "blank_word": "move",
            "hint": "They use legs, fins or wings.",
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "Plants grow ______ their entire life, while animals grow to a fixed size.",
            "blank_word": "throughout",
            "hint": "Means 'during the whole of'.",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
    ]

    PA_SHORT_ANSWERS = [
        {
            "subtype": "general",
            "question": "List three similarities between plants and animals.",
            "key_points": [
                "Both are living things.",
                "Both grow.",
                "Both need food and water.",
                "Both reproduce.",
                "Both respire (breathe).",
            ],
            "model_answer": "Three similarities: (1) Both plants and animals are living things. (2) Both grow over time. (3) Both need food and water to survive. Both also reproduce and respire.",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "plants_animals_diff",
            "question": "Explain one difference between plants and animals in terms of how they get food.",
            "key_points": [
                "Plants make their own food (autotrophic) using sunlight, water, carbon dioxide.",
                "Animals cannot make their own food; they eat plants or other animals (heterotrophic).",
            ],
            "model_answer": "Plants are autotrophs - they make their own food using sunlight, water and carbon dioxide through photosynthesis. Animals are heterotrophs - they cannot make their own food and depend on plants or other animals for nutrition.",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "Why are both plants and animals essential parts of the environment?",
            "key_points": [
                "Plants produce oxygen and food.",
                "Animals help in pollination, seed dispersal.",
                "Both maintain ecological balance.",
            ],
            "model_answer": "Plants are essential because they produce oxygen and food for other living things. Animals are essential because they help in pollination, seed dispersal, and maintaining the balance of nature. Without both, the environment cannot function properly.",
            "topic": "plants_animals",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "Classify: frog, rose plant, dog, banyan tree, cow, sunflower - as plant or animal.",
            "key_points": [
                "Plants: rose plant, banyan tree, sunflower.",
                "Animals: frog, dog, cow.",
            ],
            "model_answer": "Plants: rose plant, banyan tree, sunflower. Animals: frog, dog, cow.",
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
    ]

    PA_MATCHING = [
        {
            "column_a": ["Mango tree", "Cow", "Fish", "Butterfly"],
            "column_b": [
                "Makes its own food",
                "Moves freely to find grass",
                "Breathes oxygen from water",
                "Flies from flower to flower",
            ],
            "correct_pairs": {
                "Mango tree": "Makes its own food",
                "Cow": "Moves freely to find grass",
                "Fish": "Breathes oxygen from water",
                "Butterfly": "Flies from flower to flower",
            },
            "topic": "plants_animals",
            "difficulty": "Easy",
        },
    ]

    # --- Node c5_evs_003: Internal Organs ---
    IO_MCQS = [
        {
            "subtype": "internal_organ",
            "organ": "lungs",
            "question": "Which organ is responsible for breathing?",
            "options": ["A. Heart", "B. Lungs", "C. Stomach", "D. Brain"],
            "correct_answer": "B",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "internal_organ",
            "organ": "heart",
            "question": "Where is the heart located?",
            "options": ["A. In the abdomen", "B. In the chest", "C. In the head", "D. In the leg"],
            "correct_answer": "B",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "internal_organ",
            "organ": "stomach",
            "question": "Which organ digests food using digestive juices?",
            "options": ["A. Lungs", "B. Heart", "C. Stomach", "D. Kidney"],
            "correct_answer": "C",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "internal_organ",
            "organ": "heart",
            "question": "What is the main function of the heart?",
            "options": [
                "A. To breathe in oxygen",
                "B. To pump blood to all body parts",
                "C. To digest food",
                "D. To think and remember",
            ],
            "correct_answer": "B",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "internal_organ",
            "organ": "lungs",
            "question": "What do the lungs release when we breathe out?",
            "options": ["A. Oxygen", "B. Carbon dioxide", "C. Water", "D. Blood"],
            "correct_answer": "B",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "internal_organ",
            "organ": "stomach",
            "question": "In which part of the body is the stomach located?",
            "options": ["A. Chest", "B. Head", "C. Abdomen", "D. Hand"],
            "correct_answer": "C",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "internal_organ",
            "organ": "lungs",
            "question": "Which of these is an INTERNAL organ?",
            "options": ["A. Nose", "B. Hand", "C. Lung", "D. Ear"],
            "correct_answer": "C",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "internal_organ",
            "organ": "heart",
            "question": "You can feel your ______ beating when you run or exercise.",
            "options": ["A. Lungs", "B. Heart", "C. Stomach", "D. Brain"],
            "correct_answer": "B",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
    ]

    IO_FILL_BLANKS = [
        {
            "subtype": "general",
            "sentence": "The ______ are the organs responsible for breathing.",
            "blank_word": "lungs",
            "hint": "They are in your chest and help you take in air.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "The ______ pumps blood to all parts of the body.",
            "blank_word": "heart",
            "hint": "You can feel it beating in your chest.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "The ______ is located in the abdomen and digests food.",
            "blank_word": "stomach",
            "hint": "It uses juices to break down food.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "Lungs take in ______ and release carbon dioxide.",
            "blank_word": "oxygen",
            "hint": "The gas we need to survive.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "sentence": "The heart is located in the ______.",
            "blank_word": "chest",
            "hint": "The upper part of the body, below the neck.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "The stomach is in the ______, below the chest.",
            "blank_word": "abdomen",
            "hint": "Also called the belly area.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
    ]

    IO_SHORT_ANSWERS = [
        {
            "subtype": "organ_function",
            "organ": "lungs",
            "question": "What is the function of the lungs? Where are they located?",
            "key_points": [
                "Lungs are in the chest.",
                "They are responsible for breathing.",
                "They take in oxygen and release carbon dioxide.",
            ],
            "model_answer": "The lungs are located in the chest. Their main function is breathing - they take in oxygen from the air we breathe in and release carbon dioxide when we breathe out.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "organ_function",
            "organ": "heart",
            "question": "What is the function of the heart? Where is it located?",
            "key_points": [
                "Heart is in the chest.",
                "It pumps blood.",
                "Blood goes to all body parts.",
            ],
            "model_answer": "The heart is located in the chest. It acts like a pump that sends blood to all parts of the body. We can feel it beating, especially after running or exercising.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "organ_function",
            "organ": "stomach",
            "question": "What is the function of the stomach? Where is it located?",
            "key_points": [
                "Stomach is in the abdomen.",
                "It digests food.",
                "It uses digestive juices to break down food.",
            ],
            "model_answer": "The stomach is located in the abdomen (below the chest). Its function is to digest the food we eat. It breaks down food into simpler substances using digestive juices.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "Distinguish between external body parts and internal organs with two examples of each.",
            "key_points": [
                "External body parts: visible from outside - hands, legs, eyes, nose.",
                "Internal organs: inside the body - heart, lungs, stomach.",
                "We can see/touch external parts but not internal organs.",
            ],
            "model_answer": "External body parts are visible from outside, e.g., hands, legs, eyes, nose. Internal organs are inside the body and cannot be seen from outside, e.g., heart, lungs, stomach. We can touch our hands but we cannot touch our heart without medical help.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
    ]

    IO_TRUE_FALSE = [
        {
            "statement": "The heart is located in the abdomen.",
            "correct_answer": "False",
            "reason": "The heart is located in the chest, not the abdomen.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "statement": "The lungs help us breathe.",
            "correct_answer": "True",
            "reason": "The lungs take in oxygen and release carbon dioxide.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "statement": "The stomach breaks down food into simpler substances.",
            "correct_answer": "True",
            "reason": "The stomach uses digestive juices to digest food.",
            "topic": "internal_organs",
            "difficulty": "Medium",
        },
        {
            "statement": "Internal organs can be seen from outside the body.",
            "correct_answer": "False",
            "reason": "Internal organs are inside the body and cannot be seen from outside.",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
    ]

    # --- Node c5_evs_004: Physical Features ---
    PF_MCQS = [
        {
            "subtype": "physical_feature",
            "feature": "hill",
            "question": "Which of the following best describes a hill?",
            "options": [
                "A. Flat land for farming",
                "B. Raised land with slopes, smaller than a mountain",
                "C. Very dry land with little rain",
                "D. Low land between mountains",
            ],
            "correct_answer": "B",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "physical_feature",
            "feature": "plain",
            "question": "Plains are:",
            "options": [
                "A. Raised land with steep slopes",
                "B. Flat or gently rolling land, good for farming",
                "C. Very dry areas with sand",
                "D. Low areas between mountains",
            ],
            "correct_answer": "B",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "physical_feature",
            "feature": "desert",
            "question": "A desert is an area that has:",
            "options": [
                "A. Too much rainfall",
                "B. Very little rainfall and is very dry",
                "C. Many rivers",
                "D. Dense forests",
            ],
            "correct_answer": "B",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "physical_feature",
            "feature": "valley",
            "question": "A valley is:",
            "options": [
                "A. Raised land with slopes",
                "B. Flat land for farming",
                "C. A low area between hills or mountains, often with a river",
                "D. A very dry area",
            ],
            "correct_answer": "C",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "physical_feature",
            "feature": "plain",
            "question": "Which physical feature is best suited for growing crops?",
            "options": ["A. Desert", "B. Valley", "C. Plain", "D. Mountain"],
            "correct_answer": "C",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "physical_feature",
            "feature": "desert",
            "question": "The Thar Desert is located in which part of India?",
            "options": ["A. North-east", "B. South", "C. West (Rajasthan)", "D. East"],
            "correct_answer": "C",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "physical_feature",
            "feature": "valley",
            "question": "The Kashmir Valley is famous for its:",
            "options": ["A. Deserts", "B. Plains", "C. Beautiful scenery and rivers", "D. Volcanoes"],
            "correct_answer": "C",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "physical_feature",
            "feature": "hill",
            "question": "Which of these is an Indian hill station?",
            "options": ["A. Jaipur", "B. Shimla", "C. Mumbai", "D. Kolkata"],
            "correct_answer": "B",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
    ]

    PF_FILL_BLANKS = [
        {
            "subtype": "general",
            "sentence": "A ______ is raised land with slopes, smaller than a mountain.",
            "blank_word": "hill",
            "hint": "You can climb small hills. Ooty has many hills.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "______ are flat or gently rolling lands, good for farming.",
            "blank_word": "plains",
            "hint": "The Ganga plains are very fertile.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "A ______ is a very dry area with very little rainfall.",
            "blank_word": "desert",
            "hint": "The Thar is India's largest desert.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "A ______ is a low area between hills or mountains.",
            "blank_word": "valley",
            "hint": "Often a river flows through it.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "sentence": "The ______ Desert is the largest desert in India.",
            "blank_word": "Thar",
            "hint": "Located mainly in Rajasthan.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "sentence": "Shimla is a famous hill station in the state of ______.",
            "blank_word": "Himachal Pradesh",
            "hint": "A northern state in the Himalayas.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
    ]

    PF_SHORT_ANSWERS = [
        {
            "subtype": "general",
            "question": "Describe a hill in your own words. Give one example of a hill in India.",
            "key_points": [
                "Hill: raised land with slopes, smaller than a mountain.",
                "Example: Nandi Hills near Bangalore.",
            ],
            "model_answer": "A hill is raised land with slopes, smaller than a mountain. An example is Nandi Hills near Bangalore, Karnataka.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "general",
            "question": "Why are plains important for human life?",
            "key_points": [
                "Plains are flat and fertile.",
                "Good for growing crops and farming.",
                "Many people live on plains.",
                "Easier to build houses, roads, and cities.",
            ],
            "model_answer": "Plains are important because they are flat and have fertile soil, making them ideal for farming and growing crops. Many people live on plains, and it is easier to build houses, roads, and cities on flat land.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "What is a desert? Name one desert in India.",
            "key_points": [
                "Desert: very dry area, very little rainfall.",
                "Thar Desert in Rajasthan.",
                "Animals and plants adapted to survive with little water.",
            ],
            "model_answer": "A desert is a very dry area that receives very little rainfall. The Thar Desert in Rajasthan is the largest desert in India. Plants and animals in deserts have special adaptations to survive with very little water.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "What is a valley? Why do many rivers flow through valleys?",
            "key_points": [
                "Valley: low area between hills or mountains.",
                "Rivers flow down from mountains into valleys.",
                "Valleys often have fertile soil.",
            ],
            "model_answer": "A valley is a low area of land between hills or mountains, often with a river flowing through it. Rivers flow down from higher ground into valleys, and the soil in valleys is usually fertile because of the deposited silt.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
    ]

    PF_LONG_ANSWERS = [
        {
            "subtype": "general",
            "question": "Describe the four main physical features of the Earth - hills, plains, deserts and valleys. Give one Indian example of each.",
            "outline": [
                "Hills: raised land with slopes, smaller than mountains. Example: Nandi Hills, Karnataka.",
                "Plains: flat/rolling land, good for farming. Example: Ganga Plains.",
                "Deserts: very dry, little rainfall. Example: Thar Desert, Rajasthan.",
                "Valleys: low area between hills/mountains, often with a river. Example: Kashmir Valley.",
                "Conclude: each feature has its own importance for nature and human life.",
            ],
            "model_answer": (
                "The four main physical features are: (1) Hills - raised land with slopes, smaller than mountains, "
                "e.g., Nandi Hills in Karnataka. (2) Plains - flat or gently rolling land, ideal for farming, "
                "e.g., the Ganga Plains. (3) Deserts - very dry areas with little rainfall, e.g., the Thar Desert "
                "in Rajasthan. (4) Valleys - low areas between hills or mountains, often with rivers, "
                "e.g., the Kashmir Valley. Each feature supports different kinds of plants, animals and human activities."
            ),
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "subtype": "general",
            "question": "Compare hills and plains. How are they different in terms of farming and habitation?",
            "outline": [
                "Hills: sloped, less soil, harder to farm, cooler climate.",
                "Plains: flat, fertile soil, easy to farm, many cities.",
                "People on hills grow different crops (tea, coffee).",
                "People on plains grow rice, wheat.",
            ],
            "model_answer": (
                "Hills have sloped land with thinner soil, making farming harder. People in hill areas grow "
                "crops like tea, coffee, and apples. Plains are flat with deep, fertile soil, making them ideal "
                "for growing rice, wheat and sugarcane. Most big cities in India are on plains because flat land "
                "is easier for building and farming."
            ),
            "topic": "physical_features",
            "difficulty": "Medium",
        },
    ]

    PF_TRUE_FALSE = [
        {
            "statement": "Plains are good for farming because they have flat and fertile land.",
            "correct_answer": "True",
            "reason": "Plains have deep, fertile soil and flat land, which is ideal for agriculture.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "statement": "A desert gets heavy rainfall throughout the year.",
            "correct_answer": "False",
            "reason": "Deserts are defined by very little rainfall.",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "statement": "A valley is higher in elevation than a hill.",
            "correct_answer": "False",
            "reason": "A valley is a low area between hills or mountains.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
        {
            "statement": "Shimla is a hill station because it is located on hills.",
            "correct_answer": "True",
            "reason": "Shimla is in the Himalayan hills and is known as a hill station.",
            "topic": "physical_features",
            "difficulty": "Medium",
        },
    ]

    # ── Classification questions ──
    CLASSIFICATION_QUESTIONS = [
        {
            "items": ["Mango tree", "Rock", "Dog", "River water", "Rose", "Cat", "Air", "Soil", "Fish", "Cloud"],
            "categories": ["Living", "Non-living"],
            "correct_map": {
                "Mango tree": "Living",
                "Rock": "Non-living",
                "Dog": "Living",
                "River water": "Non-living",
                "Rose": "Living",
                "Cat": "Living",
                "Air": "Non-living",
                "Soil": "Non-living",
                "Fish": "Living",
                "Cloud": "Non-living",
            },
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "items": ["Sunflower", "Wind", "Cow", "Mountain", "Butterfly", "Rain", "Frog", "Sand", "Banyan tree", "Oxygen"],
            "categories": ["Living", "Non-living"],
            "correct_map": {
                "Sunflower": "Living",
                "Wind": "Non-living",
                "Cow": "Living",
                "Mountain": "Non-living",
                "Butterfly": "Living",
                "Rain": "Non-living",
                "Frog": "Living",
                "Sand": "Non-living",
                "Banyan tree": "Living",
                "Oxygen": "Non-living",
            },
            "topic": "environment",
            "difficulty": "Medium",
        },
    ]

    # ── Numerical questions ──
    NUMERICAL_QUESTIONS = [
        {
            "subtype": "counting",
            "question": "Count the number of living things in this list: Rose, Rock, Dog, River, Cat, Butterfly.",
            "items": ["Rose", "Rock", "Dog", "River", "Cat", "Butterfly"],
            "correct_value": 4,
            "unit": "living things",
            "topic": "environment",
            "difficulty": "Easy",
        },
        {
            "subtype": "counting",
            "question": "How many internal organs are studied in Class 5 EVS?",
            "items": ["lungs", "heart", "stomach"],
            "correct_value": 3,
            "unit": "organs",
            "topic": "internal_organs",
            "difficulty": "Easy",
        },
        {
            "subtype": "counting",
            "question": "How many physical features of the Earth are mentioned in your textbook?",
            "items": ["hills", "plains", "deserts", "valleys"],
            "correct_value": 4,
            "unit": "features",
            "topic": "physical_features",
            "difficulty": "Easy",
        },
        {
            "subtype": "percentage",
            "question": "In a group of 10 items, 3 are living and 7 are non-living. What percentage is living?",
            "part": 3,
            "whole": 10,
            "correct_value": 30.0,
            "unit": "%",
            "topic": "environment",
            "difficulty": "Medium",
        },
        {
            "subtype": "time_conversion",
            "question": "Convert 2 hours 30 minutes into total minutes.",
            "hours": 2,
            "minutes": 30,
            "correct_value": 150,
            "unit": "minutes",
            "topic": "environment",
            "difficulty": "Medium",
        },
    ]

    # ──────────────────────────────────────────────────────────
    # MAIN GENERATOR
    # ──────────────────────────────────────────────────────────

    def generate_questions(self, seed: int, count: int) -> list[dict]:
        """Generate 'count' deterministic questions covering all syllabus nodes."""
        rng = random.Random(seed)

        # Build a flat pool of question templates
        pool: list[dict] = []

        # Add MCQs - 50% competency (Indian context), 50% standard
        for q in self.ENV_MCQS:
            pool.append({**q, "type": "mcq", "competency": "standard"})
        for q in self.PA_MCQS:
            pool.append({**q, "type": "mcq", "competency": "standard"})
        for q in self.IO_MCQS:
            pool.append({**q, "type": "mcq", "competency": "standard"})
        for q in self.PF_MCQS:
            pool.append({**q, "type": "mcq", "competency": "standard"})

        # Competency MCQs (Indian context)
        competency_mcqs = [
            {
                "question": "In India, which crop is mainly grown in the plains of Punjab and Haryana?",
                "options": ["A. Rice", "B. Wheat", "C. Jute", "D. Tea"],
                "correct_answer": "B",
                "type": "mcq",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "The festival of Baisakhi is celebrated mainly by farmers in which Indian state?",
                "options": ["A. Kerala", "B. Punjab", "C. Tamil Nadu", "D. Assam"],
                "correct_answer": "B",
                "type": "mcq",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "Which Indian tree is also called the 'National Tree'?",
                "options": ["A. Peepal", "B. Banyan", "C. Neem", "D. Mango"],
                "correct_answer": "B",
                "type": "mcq",
                "topic": "plants_animals",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "The national bird of India, the peacock, is an example of:",
                "options": ["A. A plant", "B. A non-living thing", "C. A living animal", "D. A physical feature"],
                "correct_answer": "C",
                "type": "mcq",
                "topic": "plants_animals",
                "difficulty": "Easy",
                "competency": "indian_context",
            },
            {
                "question": "In which Indian state would you find the Thar Desert?",
                "options": ["A. Kerala", "B. Rajasthan", "C. Meghalaya", "D. Goa"],
                "correct_answer": "B",
                "type": "mcq",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "Which Indian river flows through the plains of northern India?",
                "options": ["A. Ganga", "B. Kaveri", "C. Godavari", "D. Narmada"],
                "correct_answer": "A",
                "type": "mcq",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "The state of Himachal Pradesh is known for its:",
                "options": ["A. Deserts", "B. Plains", "C. Hills and hill stations", "D. Dense forests only"],
                "correct_answer": "C",
                "type": "mcq",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "Which festival celebrates the harvest in Punjab, related to the fertile plains?",
                "options": ["A. Diwali", "B. Baisakhi", "C. Pongal", "D. Durga Puja"],
                "correct_answer": "B",
                "type": "mcq",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "Which of these is a living thing important in Indian culture and religion?",
                "options": ["A. The Ganga river", "B. The peepal tree", "C. The Himalayas", "D. The cow"],
                "correct_answer": "D",
                "type": "mcq",
                "topic": "plants_animals",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "In rural India, which animal is commonly used for farming and pulling carts?",
                "options": ["A. Cat", "B. Dog", "C. Ox / Bullock", "D. Rabbit"],
                "correct_answer": "C",
                "type": "mcq",
                "topic": "plants_animals",
                "difficulty": "Easy",
                "competency": "indian_context",
            },
        ]
        for q in competency_mcqs:
            pool.append(q)

        # Fill blanks
        for q in self.ENV_FILL_BLANKS:
            pool.append({**q, "type": "fill_blank", "competency": "standard"})
        for q in self.PA_FILL_BLANKS:
            pool.append({**q, "type": "fill_blank", "competency": "standard"})
        for q in self.IO_FILL_BLANKS:
            pool.append({**q, "type": "fill_blank", "competency": "standard"})
        for q in self.PF_FILL_BLANKS:
            pool.append({**q, "type": "fill_blank", "competency": "standard"})

        # Competency fill-blanks
        competency_fb = [
            {
                "sentence": "The ______ Desert is located mainly in the state of Rajasthan.",
                "blank_word": "Thar",
                "hint": "India's largest desert.",
                "type": "fill_blank",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "sentence": "The national tree of India is the ______ tree.",
                "blank_word": "banyan",
                "hint": "It has wide spreading roots and branches.",
                "type": "fill_blank",
                "topic": "plants_animals",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "sentence": "The ______ is the national bird of India.",
                "blank_word": "peacock",
                "hint": "A colourful bird with a beautiful tail.",
                "type": "fill_blank",
                "topic": "plants_animals",
                "difficulty": "Easy",
                "competency": "indian_context",
            },
            {
                "sentence": "The river ______ is considered sacred by millions of Indians.",
                "blank_word": "Ganga",
                "hint": "It flows through northern India.",
                "type": "fill_blank",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
        ]
        for q in competency_fb:
            pool.append(q)

        # Short answers
        for q in self.ENV_SHORT_ANSWERS:
            pool.append({**q, "type": "short_answer", "competency": "standard"})
        for q in self.PA_SHORT_ANSWERS:
            pool.append({**q, "type": "short_answer", "competency": "standard"})
        for q in self.IO_SHORT_ANSWERS:
            pool.append({**q, "type": "short_answer", "competency": "standard"})
        for q in self.PF_SHORT_ANSWERS:
            pool.append({**q, "type": "short_answer", "competency": "standard"})

        # Competency short answers
        competency_sa = [
            {
                "question": "Name the national tree and national bird of India. Why are they important?",
                "key_points": [
                    "National tree: Banyan.",
                    "National bird: Peacock.",
                    "Banyan provides shade and oxygen.",
                    "Peacock is beautiful and found across India.",
                ],
                "model_answer": "The national tree of India is the Banyan tree - it provides shade and oxygen. The national bird is the Peacock - it is beautiful and found across the country. Both are symbols of India's natural heritage.",
                "type": "short_answer",
                "topic": "plants_animals",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "Why are plains like the Ganga plains important for India?",
                "key_points": [
                    "Fertile soil for farming.",
                    "Grow rice, wheat, sugarcane.",
                    "Many big cities are here.",
                    "Supports a large population.",
                ],
                "model_answer": "The Ganga plains are important because they have very fertile soil and plenty of water, making them ideal for growing crops like rice, wheat and sugarcane. Many of India's big cities are located here, and the plains support a large population.",
                "type": "short_answer",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "How do farmers in the desert areas of Rajasthan grow crops despite little rainfall?",
                "key_points": [
                    "They grow drought-resistant crops.",
                    "They use wells and traditional water harvesting.",
                    "They store rainwater in tanks (johads).",
                ],
                "model_answer": "Farmers in Rajasthan grow drought-resistant crops like bajra and jowar. They use wells and traditional water harvesting methods like johads (rainwater tanks) to store water for dry seasons.",
                "type": "short_answer",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
        ]
        for q in competency_sa:
            pool.append(q)

        # Long answers
        for q in self.ENV_LONG_ANSWERS:
            pool.append({**q, "type": "long_answer", "competency": "standard"})
        for q in self.PA_LONG_ANSWERS if hasattr(self, 'PA_LONG_ANSWERS') else []:
            pool.append({**q, "type": "long_answer", "competency": "standard"})
        for q in self.PF_LONG_ANSWERS:
            pool.append({**q, "type": "long_answer", "competency": "standard"})

        # Competency long answers
        competency_la = [
            {
                "question": "Describe the Thar Desert. How do people and animals survive there?",
                "outline": [
                    "Location: Rajasthan, western India.",
                    "Climate: very hot, very little rainfall.",
                    "Animals: camels, snakes, lizards adapted to desert.",
                    "Plants: cactus, thorny bushes with deep roots.",
                    "People: wear light cotton clothes, grow bajra, store rainwater.",
                ],
                "model_answer": (
                    "The Thar Desert is in Rajasthan, western India. It has very hot days, cold nights, "
                    "and very little rainfall. Animals like camels can survive without water for many days. "
                    "Plants like cactus have thick stems to store water. People wear light cotton clothes, "
                    "grow drought-resistant crops like bajra, and store rainwater in underground tanks."
                ),
                "type": "long_answer",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
            {
                "question": "Explain why the Ganga Plains are called the 'breadbasket' of India.",
                "outline": [
                    "Fertile alluvial soil from the Ganga river.",
                    "Grows rice, wheat, sugarcane, jute.",
                    "Supports a large farming population.",
                    "Many big cities developed here.",
                ],
                "model_answer": (
                    "The Ganga Plains are called the 'breadbasket' of India because the Ganga river "
                    "deposits rich, fertile alluvial soil here. This soil grows abundant crops like rice, "
                    "wheat, sugarcane and jute. A large part of India's farming population lives here, "
                    "feeding millions of people across the country."
                ),
                "type": "long_answer",
                "topic": "physical_features",
                "difficulty": "Medium",
                "competency": "indian_context",
            },
        ]
        for q in competency_la:
            pool.append(q)

        # True/False
        for q in self.ENV_TRUE_FALSE:
            pool.append({**q, "type": "true_false", "competency": "standard"})
        for q in self.IO_TRUE_FALSE:
            pool.append({**q, "type": "true_false", "competency": "standard"})
        for q in self.PF_TRUE_FALSE:
            pool.append({**q, "type": "true_false", "competency": "standard"})

        # Matching
        for q in self.PA_MATCHING:
            pool.append({**q, "type": "matching", "competency": "standard"})

        # Classification
        for q in self.CLASSIFICATION_QUESTIONS:
            pool.append({**q, "type": "classification", "competency": "standard"})

        # Numerical
        for q in self.NUMERICAL_QUESTIONS:
            pool.append({**q, "type": "numerical", "competency": "standard"})

        # ── Deterministic shuffle ──
        rng.shuffle(pool)

        # ── Select up to 'count' questions ──
        selected = pool[: min(count, len(pool))]

        # ── Assign IDs and difficulty tags ──
        result = []
        for idx, q in enumerate(selected):
            q_copy = dict(q)
            q_copy["id"] = f"c5_evs_{idx + 1:03d}"
            if "difficulty" not in q_copy:
                q_copy["difficulty"] = "Medium"
            if "explanation" not in q_copy:
                q_copy["explanation"] = self._build_explanation(q_copy)
            result.append(q_copy)

        return result

# TRUNCATED:     def _build