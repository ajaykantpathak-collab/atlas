"""
class5_bio_questions.py
Deterministic question generator for Class 5 Biology
Nodes: c5_bio_001, c5_bio_002, c5_bio_003
"""

import math
import hashlib
import json
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
import numpy as np

# ============================================================
#  Seed management — deterministic pseudo-randomness
# ============================================================

_MASTER_SEED = 20250618  # fixed for reproducibility


def _make_rng(seed: int) -> np.random.Generator:
    """Create a seeded numpy Generator."""
    return np.random.default_rng(seed)


def _hash_seed(*parts: str) -> int:
    """Derive a deterministic integer seed from string parts."""
    raw = "|".join(parts)
    h = hashlib.sha256(raw.encode()).hexdigest()
    return int(h[:12], 16) ^ _MASTER_SEED


# ============================================================
#  Data structures
# ============================================================

@dataclass
class Node:
    node_id: str
    title: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq_strength: str
    mastery_criteria: List[str]
    vocabulary: List[str]
    spiral_topic: str
    scope_level: str
    scope_boundary: str
    is_root: bool
    prereq: List[str]
    reason: str
    depth_prereq: List[str]
    depth_reason: str


@dataclass
class Question:
    qid: str
    node_id: str
    question_text: str
    options: List[str]
    correct_index: int
    difficulty: str
    competency: str  # 'standard' or 'competency' (Indian context)
    explanation: str
    bloom_level: str
    tags: List[str] = field(default_factory=list)


@dataclass
class QuestionBundle:
    node_id: str
    standard_questions: List[Question]
    competency_questions: List[Question]
    total: int


# ============================================================
#  Node definitions (embedded from NODES spec)
# ============================================================

_NODES: Dict[str, Node] = {}

_NODES["c5_bio_001"] = Node(
    node_id="c5_bio_001",
    title="Circulatory system organs (heart, arteries, veins)",
    section="1 (Circulatory System)",
    syllabus=(
        "Circulatory system and its three main organs - heart, arteries, and veins. "
        "Heart: a muscular organ in the chest that pumps blood to the whole body; "
        "it beats continuously. Arteries: blood vessels that carry blood away from "
        "the heart to body parts; they have thick walls. Veins: blood vessels that "
        "carry blood back to the heart; they have valves to prevent backflow. "
        "Activity: identify the three organs, describe the heart's pumping action, "
        "and tell apart arteries (thick walls, away from heart) from veins (valves, back to heart)."
    ),
    cognitive_level="Remember",
    difficulty="Easy",
    exam_relevance="Board_Only",
    exam_weightage="Low",
    competency_level="Board",
    prereq_strength="soft",
    mastery_criteria=[
        "Name the three main organs of the circulatory system",
        "Describe what the heart does",
        "Tell apart arteries and veins",
    ],
    vocabulary=[
        "heart", "arteries", "veins", "blood", "circulatory system",
        "pumps", "blood vessels", "capillaries", "oxygen", "organs",
        "chambers", "circulation",
    ],
    spiral_topic="human-body",
    scope_level="2-Reinforcement",
    scope_boundary=(
        "Teach: Circulatory system organs (heart, arteries, veins) | "
        "Do NOT teach (reserved for later): C6: Digestive system (detailed); "
        "C6: Respiratory system (detailed); C6: Respiration vs breathing; "
        "C6: Common respiratory diseases; C6: Circulatory system (detailed) | "
        "Already covered (revise only, don't re-teach): C3: Internal organs of "
        "the human body; C3: Respiratory system organs"
    ),
    is_root=False,
    prereq=[],
    reason="",
    depth_prereq=["c4_bio_006"],
    depth_reason=(
        "In C4, the child learned the digestive system (mouth -> stomach -> intestines). "
        "In C5, they learn the circulatory system that transports the nutrients absorbed "
        "by the digestive system."
    ),
)

_NODES["c5_bio_002"] = Node(
    node_id="c5_bio_002",
    title="Functions of blood",
    section="1 (Circulatory System)",
    syllabus=(
        "Functions of blood in the human body. Blood is the fluid that flows through "
        "blood vessels to every part of the body. Main functions: (1) carries oxygen "
        "from lungs to all body parts, (2) carries nutrients from digested food to "
        "body cells, (3) carries waste products away to be removed, (4) helps fight "
        "disease and heal wounds by clotting. Blood is important because without it, "
        "body cells would not get oxygen or food and would die. "
        "Activity: list two main functions of blood and explain how it transports "
        "oxygen and nutrients."
    ),
    cognitive_level="Understand",
    difficulty="Easy",
    exam_relevance="Board_Only",
    exam_weightage="Low",
    competency_level="Board",
    prereq_strength="soft",
    mastery_criteria=[
        "List two main functions of blood",
        "Explain how blood carries nutrients and oxygen",
        "Say why blood is important for the body",
    ],
    vocabulary=[
        "blood", "nutrients", "oxygen", "waste", "transport",
        "fight germs", "red blood cells", "white blood cells",
        "platelets", "plasma", "clotting", "immunity",
    ],
    spiral_topic="human-body",
    scope_level="2-Reinforcement",
    scope_boundary=(
        "Teach: Functions of blood | "
        "Do NOT teach (reserved for later): C6: Digestive system (detailed); "
        "C6: Respiratory system (detailed)"
    ),
    is_root=False,
    prereq=["c5_bio_001"],
    reason="Blood is the substance that flows through the circulatory organs. "
           "A child must know the organs of circulation before understanding "
           "what blood does.",
    depth_prereq=["c4_bio_007"],
    depth_reason=(
        "In C4, the child learned that the digestive system absorbs nutrients. "
        "In C5, they learn that blood transports those absorbed nutrients to "
        "the whole body."
    ),
)

_NODES["c5_bio_003"] = Node(
    node_id="c5_bio_003",
    title="Process of circulation",
    section="1 (Circulatory System)",
    syllabus=(
        "Process of circulation - how blood travels through the body. "
        "The heart pumps blood out through arteries to all body parts. "
        "In the body, blood delivers oxygen and nutrients to cells and collects waste. "
        "The blood then returns to the heart through veins. "
        "The heart pumps the blood again, sending it to the lungs to collect "
        "fresh oxygen, and the cycle repeats. This continuous flow keeps the body working. "
        "Activity: arrange the steps of circulation in correct order - heart pumps out, "
        "blood reaches body, blood returns to heart - using pictures and visuals."
    ),
    cognitive_level="Understand",
    difficulty="Medium",
    exam_relevance="Board_Only",
    exam_weightage="Low",
    competency_level="Board",
    prereq_strength="soft",
    mastery_criteria=[
        "Describe the path blood takes from the heart to the body and back",
        "Explain the role of the heart, arteries, and veins in circulation",
        "State why continuous blood flow is important",
    ],
    vocabulary=[
        "heart", "arteries", "veins", "pumps", "oxygen", "lungs",
        "waste", "cycle", "continuous", "blood vessels", "circulation",
    ],
    spiral_topic="human-body",
    scope_level="2-Reinforcement",
    scope_boundary=(
        "Teach: Process of circulation | "
        "Do NOT teach (reserved for later): C6: Detailed circulation pathway"
    ),
    is_root=False,
    prereq=["c5_bio_001", "c5_bio_002"],
    reason="Understanding circulation requires knowing the organs (c5_bio_001) "
           "and what blood does (c5_bio_002) first.",
    depth_prereq=["c5_bio_001", "c5_bio_002"],
    depth_reason=(
        "Circulation builds on both organ knowledge and blood function knowledge."
    ),
)


# ============================================================
#  Question templates — parametrised pools per node
#  Each template is a dict with keys:
#    'template': callable(params) -> Question
#    'param_ranges': dict of param_name -> list of possible values
# ============================================================


def _mcq(qid, node_id, stem, options, correct, difficulty, competency,
         explanation, bloom, tags=None):
    return Question(
        qid=qid, node_id=node_id, question_text=stem,
        options=options, correct_index=correct,
        difficulty=difficulty, competency=competency,
        explanation=explanation, bloom_level=bloom,
        tags=tags or [],
    )


# --- Node c5_bio_001 templates ---

def _tmpl_c5_bio_001_identify_organ(params):
    organ = params["organ"]
    distractors = params["distractors"]
    r = params["rng"]
    opts = [organ] + list(r.permutation(distractors)[:3])
    r.shuffle(opts)
    correct = opts.index(organ)
    explanations = {
        "heart": (
            "The heart is a muscular organ in the chest that pumps blood. "
            "It is not a blood vessel like arteries or veins."
        ),
        "arteries": (
            "Arteries are blood vessels that carry blood away from the heart. "
            "They have thick walls to handle the pressure of blood being pumped out."
        ),
        "veins": (
            "Veins are blood vessels that carry blood back to the heart. "
            "They have valves to prevent blood from flowing backwards."
        ),
    }
    return _mcq(
        qid=params["qid"], node_id="c5_bio_001",
        stem=f"Which of the following is a main organ of the circulatory system?",
        options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=explanations.get(organ, "The circulatory system has three main organs."),
        bloom="Remember",
        tags=["identification", organ, "organs"],
    )


def _tmpl_c5_bio_001_heart_function(params):
    opts = [
        "It pumps blood to all parts of the body",
        "It filters waste from the blood",
        "It produces oxygen for the blood",
        "It digests food",
    ]
    r = params["rng"]
    r.shuffle(opts)
    correct = opts.index("It pumps blood to all parts of the body")
    return _mcq(
        qid=params["qid"], node_id="c5_bio_001",
        stem="What is the main job of the heart in the circulatory system?",
        options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=(
            "The heart is like a water pump. It is a muscular organ in the chest "
            "that beats continuously to pump blood to every part of the body."
        ),
        bloom="Remember",
        tags=["heart", "function", "pumping"],
    )


def _tmpl_c5_bio_001_artery_vs_vein(params):
    direction = params["direction"]  # 'artery' or 'vein'
    r = params["rng"]
    if direction == "artery":
        stem = "Which statement correctly describes an artery?"
        correct_text = "It carries blood away from the heart and has thick walls"
        wrong_opts = [
            "It carries blood back to the heart",
            "It has valves to stop backflow",
            "It is the same as a vein",
        ]
    else:
        stem = "Which statement correctly describes a vein?"
        correct_text = "It carries blood back to the heart and has valves"
        wrong_opts = [
            "It carries blood away from the heart",
            "It has very thick walls like an artery",
            "It pumps blood to the body",
        ]
    opts = [correct_text] + wrong_opts
    r.shuffle(opts)
    correct = opts.index(correct_text)
    return _mcq(
        qid=params["qid"], node_id="c5_bio_001",
        stem=stem, options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=(
            "Arteries carry blood AWAY from the heart and have thick walls. "
            "Veins carry blood BACK to the heart and have valves to prevent backflow."
        ),
        bloom="Understand",
        tags=["arteries", "veins", "comparison", direction],
    )


def _tmpl_c5_bio_001_analogy_pump(params):
    organ = params["organ"]
    r = params["rng"]
    analogies = {
        "heart": {
            "correct": "A water pump that pushes water through pipes",
            "explanation": (
                "The heart is like a water pump because it pumps blood to every part "
                "of the body, just like a pump pushes water through pipes."
            ),
        },
        "arteries": {
            "correct": "One-way roads going out of a city",
            "explanation": (
                "Arteries are like one-way roads going out of the city because they "
                "carry blood away from the heart to body parts."
            ),
        },
        "veins": {
            "correct": "One-way roads coming back into a city",
            "explanation": (
                "Veins are like one-way roads coming back into the city because they "
                "carry blood back to the heart."
            ),
        },
    }
    correct_text = analogies[organ]["correct"]
    all_distractors = [
        "A wall that blocks everything",
        "A storage room that keeps things inside",
        "A factory that makes new blood",
        "A filter that cleans water",
        "A door that opens both ways",
        "A bridge that goes up and down",
    ]
    selected = list(r.permutation(all_distractors)[:3])
    opts = [correct_text] + selected
    r.shuffle(opts)
    correct = opts.index(correct_text)
    return _mcq(
        qid=params["qid"], node_id="c5_bio_001",
        stem=f"The {organ} of the circulatory system is best compared to which of the following?",
        options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=analogies[organ]["explanation"],
        bloom="Understand",
        tags=["analogy", organ, "comparison"],
    )


def _tmpl_c5_bio_001_count_organs(params):
    r = params["rng"]
    correct_val = 3
    opts = [correct_val, 2, 4, 5]
    r.shuffle(opts)
    correct = opts.index(correct_val)
    return _mcq(
        qid=params["qid"], node_id="c5_bio_001",
        stem="How many main organs does the circulatory system have?",
        options=[str(x) for x in opts], correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=(
            "The circulatory system has three main organs: the heart, arteries, and veins."
        ),
        bloom="Remember",
        tags=["counting", "organs", "recall"],
    )


# --- Node c5_bio_002 templates ---

def _tmpl_c5_bio_002_blood_functions(params):
    r = params["rng"]
    function = params["function"]
    opts_pool = {
        "carries oxygen": [
            "It carries oxygen from the lungs to all body parts",
            "It removes oxygen from the body",
            "It makes oxygen in the blood",
            "It stores oxygen in the bones",
        ],
        "carries nutrients": [
            "It carries nutrients from digested food to body cells",
            "It removes nutrients from the body",
            "It creates new food for the body",
            "It stores food in the liver",
        ],
        "carries waste": [
            "It carries waste products away to be removed from the body",
            "It keeps waste inside the body forever",
            "It turns waste into food",
            "It stores waste in the kidneys",
        ],
        "clotting": [
            "It helps blood to clot and heal wounds",
            "It makes wounds bigger",
            "It stops blood from reaching wounds",
            "It removes blood from wounds",
        ],
    }
    opts = opts_pool[function]
    correct_text = opts[0]
    # keep the correct at position 0, options already correct
    correct = 0
    return _mcq(
        qid=params["qid"], node_id="c5_bio_002",
        stem=f"What is one important function of blood? (related to: {function})",
        options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=(
            "Blood has four main functions: carrying oxygen, carrying nutrients, "
            "carrying waste away, and clotting to heal wounds. "
            f"Specifically: {opts[0].lower()}."
        ),
        bloom="Understand",
        tags=["blood", "function", function],
    )


def _tmpl_c5_bio_002_blood_importance(params):
    r = params["rng"]
    opts = [
        "Body cells would not get oxygen or food and would die",
        "The body would make extra blood",
        "The heart would beat faster",
        "The bones would grow stronger",
    ]
    r.shuffle(opts)
    correct = opts.index("Body cells would not get oxygen or food and would die")
    return _mcq(
        qid=params["qid"], node_id="c5_bio_002",
        stem="Why is blood important for the human body?",
        options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=(
            "Blood is the river that flows through the body. Without it, body cells "
            "would not get oxygen or food and would die."
        ),
        bloom="Understand",
        tags=["blood", "importance", "cells"],
    )


def _tmpl_c5_bio_002_component_function(params):
    component = params["component"]
    r = params["rng"]
    descriptions = {
        "Red blood cells": {
            "correct": "They carry oxygen from the lungs to the body",
            "explanation": (
                "Red blood cells are like small parcels — they carry oxygen "
                "from the lungs to every part of the body."
            ),
        },
        "White blood cells": {
            "correct": "They fight germs and protect the body",
            "explanation": (
                "White blood cells are like the body's police force — they "
                "fight germs and keep us safe from disease."
            ),
        },
        "Platelets": {
            "correct": "They help stop bleeding by forming clots",
            "explanation": (
                "Platelets are like tiny repair patches — they help stop bleeding "
                "by forming clots when there is a wound."
            ),
        },
    }
    correct_text = descriptions[component]["correct"]
    distractors = [
        "They pump blood through the heart",
        "They carry digested food to cells",
        "They produce new blood cells",
        "They store oxygen in the lungs",
    ]
    selected = list(r.permutation(distractors)[:3])
    opts = [correct_text] + selected
    r.shuffle(opts)
    correct = opts.index(correct_text)
    return _mcq(
        qid=params["qid"], node_id="c5_bio_002",
        stem=f"What is the main job of {component} in our blood?",
        options=opts, correct=correct,
        difficulty="Easy", competency=params["competency"],
        explanation=descriptions[component]["explanation"],
        bloom="Understand",
        tags=["blood", "components", component],
    )


# --- Node c5_bio_003 templates ---

def _tmpl_c5_bio_003_sequence(params):
    r = params["rng"]
    step = params["step"]  # 'heart_pumps', 'reaches_body', 'returns'
    all_steps = ["heart_pumps", "reaches_body", "returns", "lungs"]
    correct_texts = {
        "heart_pumps": "The heart pumps blood out through arteries",
        "reaches_body": "Blood delivers oxygen and nutrients to body cells",
        "returns": "Blood returns to the heart through veins",
        "lungs": "Blood goes to the lungs to collect fresh oxygen",
    }
    distractors_pool = [
        "The stomach digests the blood",
        "Blood is stored in the bones",
        "The brain pumps the blood",
        "Blood flows only in one direction without returning",
        "The heart stops beating for a while",
        "Arteries carry blood back to the heart",
        "Veins carry blood away from the heart",
    ]
    selected = list(r.permutation(distractors_pool)[:3])
    opts = [correct_texts[step]] + selected
    r.shuffle(opts)
    correct = opts.index(correct_texts[step])
    return _mcq(
        qid=params["qid"], node_id="c5_bio_003",
        stem=f"Which of the following correctly describes what happens when the heart pumps blood out?",
        options=opts, correct=correct,
        difficulty="Medium", competency=params["competency"],
        explanation=(
            "The circulatory cycle works as follows: The heart pumps blood out "
            "through arteries → blood reaches body parts and delivers oxygen/nutrients "
            "→ blood returns to the heart through veins → blood goes to lungs for "
            "fresh oxygen → the cycle repeats."
        ),
        bloom="Understand",
        tags=["circulation", "sequence", step],
    )


def _tmpl_c5_bio_003_vessel_type(params):
    r = params["rng"]
    vessel = params["vessel"]
    descriptions = {
        "artery": {
            "correct": "It carries blood away from the heart",
            "explanation": (
                "Arteries always carry blood away from the heart. "
                "They have thick, strong walls because blood is pumped out at high pressure."
            ),
        },
        "vein": {
            "correct": "It carries blood back to the heart",
            "explanation": (
                "Veins always carry blood back to the heart. "
                "They have valves inside to stop blood from flowing backwards."
            ),
        },
    }
    correct_text = descriptions[vessel]["correct"]
    distractors = [
        "It pumps blood by itself",
        "It carries only oxygen",
        "It has no walls",
        "It stores blood in the liver",
    ]
    selected = list(r.permutation(distractors)[:3])
    opts = [correct_text] + selected
    r.shuffle(opts)
    correct = opts.index(correct_text)
    return _mcq(
        qid=params["qid"], node_id="c5_bio_003",
        stem=f"What is the main job of an {vessel} in the circulation process?",
        options=opts, correct=correct,
        difficulty="Medium", competency=params["competency"],
        explanation=descriptions[vessel]["explanation"],
        bloom="Understand",
        tags=["circulation", "vessels", vessel],
    )


def _tmpl_c5_bio_003_continuous_flow(params):
    r = params["rng"]
    opts = [
        "It keeps oxygen and nutrients reaching every cell in the body",
        "It makes the heart beat faster",
        "It cools down the blood",
        "It stores extra blood in the lungs",
    ]
    r.shuffle(opts)
    correct = opts.index(
        "It keeps oxygen and nutrients reaching every cell in the body"
    )
    return _mcq(
        qid=params["qid"], node_id="c5_bio_003",
        stem="Why does the circulatory system work as a continuous cycle?",
        options=opts, correct=correct,
        difficulty="Medium", competency=params["competency"],
        explanation=(
            "The continuous flow of blood is important because it keeps delivering "
            "oxygen and nutrients to every cell and removing waste. If the cycle "
            "stops, cells would not get what they need."
        ),
        bloom="Understand",
        tags=["circulation", "continuous", "importance"],
    )


def _tmpl_c5_bio_003_flow_direction(params):
    r = params["rng"]
    correct_order = ["heart", "arteries", "body", "veins"]
    # We ask: which comes first in the cycle?
    first_vessel = params["first_vessel"]
    opts = ["heart", "lungs", "stomach", "brain"]
    r.shuffle(opts)
    correct = opts.index("heart")
    return _mcq(
        qid=params["qid"], node_id="c5_bio_003",
        stem="Where does blood start its journey in the circulatory cycle?",
        options=opts, correct=correct,
        difficulty="Medium", competency=params["competency"],
        explanation=(
            "The heart is the starting point. It pumps blood out, sending it "
            "through arteries to all parts of the body, and then veins bring "
            "it back — this cycle keeps going."
        ),
        bloom="Remember",
        tags=["circulation", "sequence", "heart"],
    )


def _tmpl_c5_bio_003_indian_context(params):
    """Indian-context question (50% competency flavour)."""
    r = params["rng"]
    context = params["context"]
    contexts = {
        "yoga": {
            "stem": "When you do yoga and take deep breaths, more oxygen enters your blood. "
                    "Which part of the circulatory system helps carry this oxygen?",
            "correct": "The heart pumps the oxygen-rich blood through arteries to the body",
            "wrongs": [
                "The veins filter out the oxygen",
                "The stomach stores the oxygen",
                "The brain removes the oxygen",
            ],
            "explanation": (
                "When you breathe deeply during yoga, oxygen enters your lungs. "
                "The heart then pumps this oxygen-rich blood through arteries to all body parts. "
                "This is how circulation supports physical activities like yoga."
            ),
        },
        "dal_rice": {
            "stem": "After eating dal and rice, the nutrients are absorbed. "
                    "Which part of the circulatory system carries these nutrients to your cells?",
            "correct": "Blood flowing through arteries and veins",
            "wrongs": [
                "The lungs alone",
                "The bones alone",
                "The skin alone",
            ],
            "explanation": (
                "After eating a meal like dal and rice, the digestive system absorbs nutrients. "
                "Blood in the circulatory system then carries these nutrients through "
                "arteries and veins to every cell in the body."
            ),
        },
        "running": {
            "stem": "When you run fast in a race, your heart beats faster. "
                    "Why does the heart beat faster during exercise?",
            "correct": "To pump more blood (and oxygen) to your muscles",
            "wrongs": [
                "To stop blood from flowing",
                "To store extra blood",
                "To make the body sleep",
            ],
            "explanation": (
                "During running or any exercise, muscles need more oxygen and nutrients. "
                "The heart beats faster to pump more blood through arteries to meet this demand. "
                "This shows how the circulatory system adapts to what the body needs."
            ),
        },
    }
    ctx = contexts[context]
    opts = [ctx["correct"]] + ctx["wrongs"]
    r.shuffle(opts)
    correct = opts.index(ctx["correct"])
    return _mcq(
        qid=params["qid"], node_id=params["node_id"],
        stem=ctx["stem"], options=opts, correct=correct,
        difficulty=params["difficulty"], competency=params["competency"],
        explanation=ctx["explanation"],
        bloom="Understand",
        tags=["indian_context", context, "application"],
    )


# ============================================================
#  Template registry
# ============================================================

_TEMPLATES: Dict[str, List] = {
    "c5_bio_001": [
        _tmpl_c5_bio_001_identify_organ,
        _tmpl_c5_bio_001_heart_function,
        _tmpl_c5_bio_001_artery_vs_vein,
        _tmpl_c5_bio_001_analogy_pump,
        _tmpl_c5_bio_001_count_organs,
    ],
    "c5_bio_002": [
        _tmpl_c5_bio_002_blood_functions,
        _tmpl_c5_bio_002_blood_importance,
        _tmpl_c5_bio_002_component_function,
    ],
    "c5_bio_003": [
        _tmpl_c5_bio_003_sequence,
        _tmpl_c5_bio_003_vessel_type,
        _tmpl_c5_bio_003_continuous_flow,
        _tmpl_c5_bio_003_flow_direction,
        _tmpl_c5_bio_003_indian_context,
    ],
}

# Param pools per template (indexed same order as _TEMPLATES)
_PARAM_POOLS: Dict[str, List[Dict[str, Any]]] = {
    "c5_bio_001": [
        # _tmpl_c5_bio_001_identify_organ
        [
            {"organ": "heart", "distractors": ["lungs", "kidney", "brain"]},
            {"organ": "arteries", "distractors": ["nerves", "muscles", "bones"]},
            {"organ": "veins", "distractors": ["tendons", "cartilage", "skin"]},
        ],
        # _tmpl_c5_bio_001_heart_function — no param variation
        [{}],
        # _tmpl_c5_bio_001_artery_vs_vein
        [
            {"direction": "artery"},
            {"direction": "vein"},
        ],
        # _tmpl_c5_bio_001_analogy_pump
        [
            {"organ": "heart"},
            {"organ": "arteries"},
            {"organ": "veins"},
        ],
        # _tmpl_c5_bio_001_count_organs
        [{}],
    ],
    "c5_bio_002": [
        # _tmpl_c5_bio_002_blood_functions
        [
            {"function": "carries oxygen"},
            {"function": "carries nutrients"},
            {"function": "carries waste"},
            {"function": "clotting"},
        ],
        # _tmpl_c5_bio_002_blood_importance
        [{}],
        # _tmpl_c5_bio_002_component_function
        [
            {"component": "Red blood cells"},
            {"component": "White blood cells"},
            {"component": "Platelets"},
        ],
    ],
    "c5_bio_003": [
        # _tmpl_c5_bio_003_sequence
        [
            {"step": "heart_pumps"},
            {"step": "reaches_body"},
            {"step": "returns"},
            {"step": "lungs"},
        ],
        # _tmpl_c5_bio_003_vessel_type
        [
            {"vessel": "artery"},
            {"vessel": "vein"},
        ],
        # _tmpl_c5_bio_003_continuous_flow
        [{}],
        # _tmpl_c5_bio_003_flow_direction
        [
            {"first_vessel": "heart"},
        ],
        # _tmpl_c5_bio_003_indian_context
        [
            {"context": "yoga", "difficulty": "Medium", "node_id": "c5_bio_003"},
            {"context": "dal_rice", "difficulty": "Medium", "node_id": "c5_bio_003"},
            {"context": "running", "difficulty": "Medium", "node_id": "c5_bio_003"},
        ],
    ],
}


# ============================================================
#  Question generation engine
# ============================================================

class BiologyQuestionGenerator:
    """
    Deterministic question generator.

    Usage:
        gen = BiologyQuestionGenerator(seed=2025)
        bundle = gen.generate(node_id="c5_bio_001", num_standard=2, num_competency=2)
    """

    def __init__(self, master_seed: int = _MASTER_SEED):
        self._master_seed = master_seed

    def _seeded_rng(self, node_id: str, competency: str, template_idx: int, param_idx: int):
        seed = _hash_seed(node_id, competency, str(template_idx), str(param_idx))
        return _make_rng(seed)

    def generate_for_node(
        self,
        node_id: str,
        num_standard: int = 2,
        num_competency: int = 2,
        difficulty_filter: Optional[str] = None,
    ) -> QuestionBundle:
        """
        Generate questions for a single node.

        Args:
            node_id: Node identifier (e.g. 'c5_bio_001')
            num_standard: Number of standard (regular) questions
            num_competency: Number of competency (Indian context) questions
            difficulty_filter: Optional filter ('Easy', 'Medium', 'Hard')

        Returns:
            QuestionBundle with standard and competency questions
        """
        if node_id not in _NODES:
            raise ValueError(f"Unknown node_id: {node_id}. Available: {list(_NODES.keys())}")

        node = _NODES[node_id]
        templates = _TEMPLATES.get(node_id, [])
        param_pools = _PARAM_POOLS.get(node_id, [])

        if not templates:
            return QuestionBundle(node_id=node_id, standard_questions=[], competency_questions=[], total=0)

        standard_qs: List[Question] = []
        competency_qs: List[Question] = []

        # --- Standard questions ---
        seen_indices: set = set()
        rng_standard = _make_rng(_hash_seed("standard", node_id, str(self._master_seed)))

        for i in range(num_standard):
            template_idx = int(rng_standard.integers(0, len(templates)))
            pool_idx = template_idx % len(param_pools)
            param_pool = param_pools[pool_idx]
            param_idx = int(rng_standard.integers(0, len(param_pool))) if param_pool else 0
            params = dict(param_pool[param_idx % len(param_pool)])
            params["competency"] = "standard"
            params["rng"] = self._seeded_rng(node_id, "standard", template_idx, param_idx)
            params["qid"] = f"{node_id}_std_{i+1:02d}"
            params["difficulty"] = node.difficulty
            q = templates[template_idx](params)
            if difficulty_filter and q.difficulty != difficulty_filter:
                # regenerate once with wrap-around
                alt_idx = (template_idx + 1) % len(templates)
                alt_pool_idx = alt_idx % len(param_pools)
                alt_params = dict(param_pools[alt_pool_idx][0])
                alt_params["competency"] = "standard"
                alt_params["rng"] = self._seeded_rng(node_id, "standard", alt_idx, 0)
                alt_params["qid"] = f"{node_id}_std_{i+1:02d}"
                alt_params["difficulty"] = node.difficulty
                q = templates[alt_idx](alt_params)
            standard_qs.append(q)

        # --- Competency questions (Indian context, 50% flavour) ---
        rng_comp = _make_rng(_hash_seed("competency", node_id, str(self._master_seed)))

        for i in range(num_competency):
            # Prefer Indian-context templates (last in list for each node)
            template_idx = len(templates) - 1  # use Indian context template
            param_pool = param_pools[-1] if param_pools else [{}]
            param_idx = int(rng_comp.integers(0, len(param_pool))) if param_pool else 0
            params = dict(param_pool[param_idx % len(param_pool)])
            params["competency"] = "competency"
            params["rng"] = self._seeded_rng(node_id, "competency", template_idx, param_idx)
            params["qid"] = f"{node_id}_comp_{i+1:02d}"
            competency_qs.append(templates[template_idx](params))

        return QuestionBundle(
            node_id=node_id,
            standard_questions=standard_qs,
            competency_questions=competency_qs,
            total=len(standard_qs) + len(competency_qs),
        )

    def generate_all(
        self,
        num_standard: int = 2,
        num_competency: int = 2,
    ) -> Dict[str, QuestionBundle]:
        """
        Generate questions for all available nodes.

        Returns:
            Dict mapping node_id -> QuestionBundle
        """
        bundles: Dict[str, QuestionBundle] = {}
        for node_id in sorted(_NODES.keys()):
            bundles[node_id] = self.generate_for_node(
                node_id,
                num_standard=num_standard,
                num_competency=num_competency,
            )
        return bundles

    def get_node(self, node_id: str) -> Node:
        """Return the Node definition."""
        if node_id not in _NODES:
            raise ValueError(f"Unknown node_id: {node_id}")
        return _NODES[node_id]

    def list_nodes(self) -> List[str]:
        """Return list of all node IDs."""
        return sorted(_NODES.keys())


# ============================================================
#  Validation / verification helpers
# ============================================================

class QuestionValidator:
    """Verify generated questions for correctness and coverage."""

    def __init__(self):
        self.errors: List[str] = []
        self.warnings: List[str] = []

    def validate_bundle(self, bundle: QuestionBundle) -> bool:
        self.errors.clear()
        self.warnings.clear()

        if not bundle.standard_questions and not bundle.competency_questions:
            self.errors.append(f"Node {bundle.node_id}: No questions generated.")
            return False

        for q in bundle.standard_questions + bundle.competency_questions:
            # Check options length
            if len(q.options) != 4:
                self.errors.append(f"{q.qid}: Expected 4 options, got {len(q.options)}")
            # Check correct_index in range
            if not (0 <= q.correct_index < len(q.options)):
                self.errors.append(f"{q.qid}: correct_index {q.correct_index} out of range")
            # Check correct answer appears in options
            correct_opt = q.options[q.correct_index] if q.options else ""
            if correct_opt == "":
                self.errors.append(f"{q.qid}: correct option is empty")
            # Check non-empty stem
            if not q.question_text.strip():
                self.errors.append(f"{q.qid}: empty question text")
            # Check explanation
            if not q.explanation.strip():
                self.warnings.append(f"{q.qid}: missing explanation")

        # Check duplicate qids
        all_qids = [q.qid for q in bundle.standard_questions + bundle.competency_questions]
        dupes = [qid for qid in set(all_qids) if all_qids.count(qid) > 1]
        if dupes:
            self.errors.append(f"Duplicate qids: {dupes}")

        return len(self.errors) == 0

    def validate_all(self, bundles: Dict[str, QuestionBundle]) -> Dict[str, bool]:
        results = {}
        for node_id, bundle in bundles.items():
            results[node_id] = self.validate_bundle(bundle)
        return results

    def report(self) -> str:
        lines = []
        if self.errors:
            lines.append("ERRORS:")
            lines.extend(f"  - {e}" for e in self.errors)
        if self.warnings:
            lines.append("WARNINGS:")
            lines.extend(f"  - {w}" for w in self.warnings)
        if not lines:
            lines.append("All questions passed validation.")
        return "\n".join(lines)


# ============================================================
#  Serialisation helpers
# ============================================================

def question_to_dict(q: Question) -> Dict:
    return {
        "qid": q.qid,
        "node_id": q.node_id,
        "question": q.question_text,
        "options": q.options,
        "correct_index": q.correct_index,
        "difficulty": q.difficulty,
        "competency": q.competency,
        "explanation": q.explanation,
        "bloom_level": q.bloom_level,
        "tags": q.tags,
    }


def bundle_to_dict(bundle: QuestionBundle) -> Dict:
    return {
        "node_id": bundle.node_id,
        "standard_questions": [question_to_dict(q) for q in bundle.standard_questions],
        "competency_questions": [question_to_dict(q) for q in bundle.competency_questions],
        "total": bundle.total,
    }


def save_bundles(bundles: Dict[str, QuestionBundle], filepath: str) -> None:
    data = {nid: bundle_to_dict(b) for nid, b in bundles.items()}
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ============================================================
#  Pretty-print
# ============================================================

def print_bundle(bundle: QuestionBundle, verbose: bool = False) -> None:
    node = _NODES.get(bundle.node_id)
    title = node.title if node else bundle.node_id
    print(f"\n{'='*70}")
    print(f"NODE: {bundle.node_id}")
    print(f"TITLE: {title}")
    print(f"TOTAL QUESTIONS: {bundle.total}")
    print(f"{'='*70}")

    for label, questions in [
        ("STANDARD QUESTIONS", bundle.standard_questions),
        ("COMPETENCY QUESTIONS (Indian Context)", bundle.competency_questions),
    ]:
        if not questions:
            continue
        print(f"\n--- {label} ---")
        for q in questions:
            print(f"\n  QID: {q.qid}")
            print(f"  Bloom Level: {q.bloom_level} | Difficulty: {q.difficulty}")
            print(f"  Q: {q.question_text}")
            for idx, opt in enumerate(q.options):
                marker = " ✓" if idx == q.correct_index else ""
                print(f"     {chr(65+idx)}. {opt}{marker}")
            if verbose:
                print(f"  Explanation: {q.explanation}")
                print(f"  Tags: {q.tags}")


# ============================================================
#  Main execution — demonstration
# ============================================================

def main():
    master_seed = _MASTER_SEED
    print(f"Biology Question Generator — Class 5")
    print(f"Master seed: {master_seed}")
    print(f"Nodes available: {_NODES.keys()}")
    print()

    generator = BiologyQuestionGenerator(master_seed=master_seed)
    validator = QuestionValidator()

    all_bundles = generator.generate_all(num_standard=2, num_competency=1)

    print_bundle(all_bundles["c5_bio_001"], verbose=True)
    print_bundle(all_bundles["c5_bio_002"], verbose=True)
    print_bundle(all_bundles["c5_bio_003"], verbose=True)

    print("\n" + "=" * 70)
    print("VALIDATION REPORT")
    print("=" * 70)
    results = validator.validate_all(all_bundles)
    for node_id, passed in results.items():
        status = "PASS" if passed else "FAIL"
        print(f"  {node_id}: {status}")
    print()
    print(validator.report())

    save_bundles(all_bundles, "class5_bio_questions.json")
    print("\nSaved to class5_bio_questions.json")

    return all_bundles


if __name__ == "__main__":
    main()