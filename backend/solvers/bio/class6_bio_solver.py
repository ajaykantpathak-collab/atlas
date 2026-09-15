import math
import random
import hashlib
import json
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import numpy as np

# ──────────────────────────────────────────────
# Deterministic seed controller
# ──────────────────────────────────────────────
_SEED_SOURCE = "class6_bio_solver_v1_nodes_001_002_003"
_SEED_INT = int(hashlib.sha256(_SEED_SOURCE.encode()).hexdigest()[:16], 16)
random.seed(_SEED_INT)
np.random.seed(_SEED_INT % (2**32))

# ──────────────────────────────────────────────
# Enums & Data Structures
# ──────────────────────────────────────────────
class NodeId(Enum):
    C6_BIO_001 = "c6_bio_001"
    C6_BIO_002 = "c6_bio_002"
    C6_BIO_003 = "c6_bio_003"

class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"

class BloomLevel(Enum):
    REMEMBER = "Remember"
    UNDERSTAND = "Understand"
    APPLY = "Apply"

@dataclass
class Question:
    node_id: str
    id: str
    question_text: str
    options: List[str]
    correct_index: int
    explanation: str
    step_by_step: List[str]
    competency: str
    bloom_level: str
    difficulty: str
    topic: str
    indian_context: bool

@dataclass
class SolverResult:
    node_id: str
    node_name: str
    total_questions: int
    correct_answers: int
    score_percentage: float
    mastery_achieved: bool
    questions: List[Question]
    user_answers: List[int]
    detailed_feedback: List[str]

# ──────────────────────────────────────────────
# Vocabulary banks – Indian context
# ──────────────────────────────────────────────
LEAF_PARTS = ["lamina", "petiole", "midrib", "leaf apex", "leaf base", "leaf margin", "veins"]

LEAF_TYPES_SIMPLE = {
    "mango": "Mangifera indica",
    "peepal": "Ficus religiosa",
    "banyan": "Ficus benghalensis",
    "neem": "Azadirachta indica",
    "tulsi": "Ocimum sanctum",
}

LEAF_TYPES_COMPOUND = {
    "rose": "Rosa indica",
    "neem": "Azadirachta indica",
    "bel": "Aegle marmelos",
    "margosa": "Azadirachta indica",
}

VENATION_RETICULATE = ["mango", "peepal", "banyan", "neem", "tulsi", "rose", "china rose", "hibiscus"]
VENATION_PARALLEL = ["grass", "banana", "wheat", "rice", "sugarcane", "maize", "turmeric"]

LEAF_FUNCTIONS = [
    ("photosynthesis", "prepares food using sunlight, carbon dioxide, water, and chlorophyll"),
    ("transpiration", "loss of water vapour through stomata that cools the plant"),
    ("gas exchange", "intake of carbon dioxide and release of oxygen through stomata"),
]

INDIAN_PLANTS = {
    "tulsi": "Ocimum tenuiflorum (holy basil)",
    "neem": "Azadirachta indica",
    "banyan": "Ficus benghalensis (national tree of India)",
    "peepal": "Ficus religiosa",
    "mango": "Mangifera indica (national fruit of India)",
    "banana": "Musa paradisiaca",
    "rice": "Oryza sativa (staple food of India)",
    "wheat": "Triticum aestivum",
    "sugarcane": "Saccharum officinarum",
    "pitcher plant": "Nepenthes khasiana (found in Assam, India)",
}

LEAF_MODIFICATIONS = {
    "tendril": {
        "plant": "pea plant (Pisum sativum)",
        "purpose": "climbing support",
        "analogy": "like a monkey's arm grabbing a branch",
    },
    "spine": {
        "plant": "cactus (Opuntia)",
        "purpose": "defence and to reduce water loss in dry conditions",
        "analogy": "like a security guard protecting a treasure",
    },
    "scale leaf": {
        "plant": "onion (Allium cepa)",
        "purpose": "protection of buds",
        "analogy": "like armour covering a warrior",
    },
}

INSECTIVOROUS = {
    "pitcher plant": "traps insects in a pitcher-shaped leaf with digestive fluids",
    "venus flytrap": "traps insects with hinged leaves that snap shut",
    "sundew": "traps insects with sticky glandular hairs",
    "bladderwort": "traps tiny aquatic organisms with suction bladders",
}

VEGETATIVE_PROPAGATION = {
    "bryophyllum": "produces small plantlets along leaf margins that fall off and grow into new plants",
}

# ──────────────────────────────────────────────
# Question generators
# ──────────────────────────────────────────────
def _rng(seed_offset: int = 0) -> random.Random:
    r = random.Random(_SEED_INT + seed_offset)
    return r

def _shuffle(rng: random.Random, items: list) -> list:
    result = items[:]
    rng.shuffle(result)
    return result

# ── c6_bio_001: Leaf structure and types ──────
def generate_001(rng: random.Random) -> List[Question]:
    questions = []

    # Q1: Label parts – identify petiole
    parts = _shuffle(rng, LEAF_PARTS[:])
    correct_part = "petiole"
    distractors = [p for p in parts if p != correct_part][:3]
    q_text = (
        "Rahul drew a leaf and labelled its parts. "
        "He called the 'stalk that connects the leaf blade to the stem' as the ______."
    )
    opts = _shuffle(rng, [correct_part] + distractors)
    correct_idx = opts.index(correct_part)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q1_label_petiole",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation=f"The petiole is the stalk that connects the leaf blade (lamina) to the stem.",
        step_by_step=[
            "Step 1: Read the question carefully – identify what the blank describes.",
            "Step 2: The description says 'stalk connecting leaf blade to the stem'.",
            "Step 3: From your knowledge of leaf parts, the petiole is the stalk that connects the leaf to the stem.",
            "Step 4: The lamina is the flat blade, midrib is the central vein, and veins branch out from the midrib.",
            "Step 5: Therefore, the correct answer is 'petiole'.",
        ],
        competency="Label parts of a leaf",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Leaf structure",
        indian_context=False,
    ))

    # Q2: Simple vs compound leaf
    correct = "simple leaf"
    q_text = (
        "A mango leaf has a single, undivided blade. "
        "It is classified as a ______."
    )
    opts = _shuffle(rng, [correct, "compound leaf", "tendril", "scale leaf"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q2_simple_leaf",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="A simple leaf has a single, undivided blade, like the mango leaf.",
        step_by_step=[
            "Step 1: A mango leaf has ONE single blade – it is NOT divided into smaller parts.",
            "Step 2: A simple leaf is defined as a leaf with a single undivided blade.",
            "Step 3: A compound leaf is divided into many smaller parts called leaflets (e.g., rose, neem).",
            "Step 4: Since mango has one undivided blade, it is a simple leaf.",
        ],
        competency="Classify leaf as simple or compound",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Leaf types",
        indian_context=True,
    ))

    # Q3: Compound leaf identification
    correct = "compound leaf"
    q_text = (
        "Priya observed a neem leaf. She noticed the leaf blade was divided into many small "
        "leaflets arranged along a central axis. This leaf is a ______."
    )
    opts = _shuffle(rng, [correct, "simple leaf", "parallel venation", "reticulate venation"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q3_compound_leaf",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="A neem leaf is compound because its blade is divided into many leaflets along a rachis.",
        step_by_step=[
            "Step 1: Read the description: the leaf blade is divided into many small leaflets.",
            "Step 2: Definition – a compound leaf has a blade divided into leaflets.",
            "Step 3: Neem is a classic example of a compound leaf (pinnate compound).",
            "Step 4: Therefore, this is a compound leaf.",
        ],
        competency="Classify leaf as simple or compound",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Leaf types",
        indian_context=True,
    ))

    # Q4: Venation type – reticulate
    correct = "reticulate venation"
    q_text = (
        "Arun looked at the veins on a peepal leaf. He saw a net-like pattern where veins "
        "branched out and connected with each other. This type of venation is called ______."
    )
    opts = _shuffle(rng, [correct, "parallel venation", "pinnate venation", "parallel branching"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q4_reticulate",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Reticulate venation has a net-like arrangement of veins, seen in dicots like peepal and mango.",
        step_by_step=[
            "Step 1: Observe the description: 'net-like pattern where veins branched out and connected'.",
            "Step 2: Reticulate venation = net-like venation (like a spider web).",
            "Step 3: Parallel venation = veins run side by side like railway tracks (seen in grass, banana).",
            "Step 4: Peepal is a dicot with reticulate venation.",
            "Step 5: Answer: reticulate venation.",
        ],
        competency="Identify venation type",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Venation",
        indian_context=True,
    ))

    # Q5: Venation type – parallel
    correct = "parallel venation"
    q_text = (
        "Sita studied a banana leaf and saw that the veins ran parallel to each other from "
        "base to tip without forming a net. This is called ______."
    )
    opts = _shuffle(rng, [correct, "reticulate venation", "pinnate venation", "radial venation"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q5_parallel",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Parallel venation: veins run parallel, like railway tracks. Seen in monocots like banana and grass.",
        step_by_step=[
            "Step 1: The veins run parallel from base to tip.",
            "Step 2: Parallel venation definition – veins run side by side.",
            "Step 3: Banana is a monocot and shows parallel venation.",
            "Step 4: Answer: parallel venation.",
        ],
        competency="Identify venation type",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Venation",
        indian_context=True,
    ))

    # Q6: Multiple parts identification
    correct = "midrib"
    q_text = (
        "In a leaf, the ______ is the thick central vein that runs down the middle, "
        "from which smaller veins branch out."
    )
    opts = _shuffle(rng, [correct, "petiole", "lamina", "leaf apex"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q6_midrib",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="The midrib is the thick central vein; smaller veins branch out from it.",
        step_by_step=[
            "Step 1: Identify the description: thick central vein from which smaller veins branch.",
            "Step 2: Midrib = central, thick vein running down the middle.",
            "Step 3: Petiole is the stalk, lamina is the blade, apex is the tip.",
            "Step 4: Answer: midrib.",
        ],
        competency="Label parts of a leaf",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Leaf structure",
        indian_context=False,
    ))

    # Q7: Simple vs compound – rose
    correct = "compound leaf"
    q_text = (
        "A rose leaf is divided into several leaflets attached along a central stalk. "
        "This makes it a ______."
    )
    distractors = ["simple leaf", "parallel leaf", "scale leaf"]
    opts = _shuffle(rng, [correct] + distractors)
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_001.value,
        id="001_q7_rose",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Rose has a compound (pinnate) leaf with leaflets arranged along a central stalk (rachis).",
        step_by_step=[
            "Step 1: Rose leaf has several leaflets – not a single blade.",
            "Step 2: Definition of compound leaf: blade divided into leaflets.",
            "Step 3: Rose = compound pinnate leaf.",
            "Step 4: Answer: compound leaf.",
        ],
        competency="Classify leaf as simple or compound",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Leaf types",
        indian_context=False,
    ))

    return questions

# ── c6_bio_002: Functions of leaf ─────────────
def generate_002(rng: random.Random) -> List[Question]:
    questions = []

    # Q1: Photosynthesis function
    correct = "to prepare food using sunlight, carbon dioxide and water"
    q_text = (
        "The main function of photosynthesis in a leaf is ______."
    )
    opts = _shuffle(rng, [
        correct,
        "to lose water as vapour to cool the plant",
        "to absorb oxygen from the air",
        "to support the plant on a trellis",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_002.value,
        id="002_q1_photosynthesis",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Photosynthesis is the process by which leaves prepare food (glucose) using sunlight, CO₂, and water.",
        step_by_step=[
            "Step 1: Recall the three main functions of a leaf: photosynthesis, transpiration, gas exchange.",
            "Step 2: Photosynthesis definition – leaves prepare food using sunlight, CO₂, water, and chlorophyll.",
            "Step 3: Transpiration = water loss. Gas exchange = CO₂ in / O₂ out.",
            "Step 4: The option matching 'prepare food using sunlight, CO₂ and water' is correct.",
        ],
        competency="State main functions of a leaf",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Leaf functions",
        indian_context=False,
    ))

    # Q2: Transpiration
    correct = "loss of water vapour through stomata"
    q_text = (
        "When a plant loses water vapour through tiny pores on its leaves, this process "
        "is called ______."
    )
    opts = _shuffle(rng, [
        correct,
        "photosynthesis",
        "respiration",
        "germination",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_002.value,
        id="002_q2_transpiration",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Transpiration is the loss of water vapour through stomata; it cools the plant and pulls water upward.",
        step_by_step=[
            "Step 1: The question describes 'loss of water vapour through tiny pores'.",
            "Step 2: The pores on leaves are stomata.",
            "Step 3: Loss of water vapour through stomata = transpiration.",
            "Step 4: Photosynthesis makes food; respiration releases energy; germination is seed sprouting.",
            "Step 5: Answer: loss of water vapour through stomata.",
        ],
        competency="State main functions of a leaf",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Transpiration",
        indian_context=False,
    ))

    # Q3: Stomata role in gas exchange
    correct = "stomata"
    q_text = (
        "Riya wants to know which part of the leaf controls the intake of carbon dioxide "
        "and the release of oxygen. The answer is the ______."
    )
    opts = _shuffle(rng, [correct, "midrib", "petiole", "lamina"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_002.value,
        id="002_q3_stomata",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Stomata are tiny pores that regulate gas exchange – CO₂ enters and O₂ exits.",
        step_by_step=[
            "Step 1: The question asks which part controls gas exchange (CO₂ in, O₂ out).",
            "Step 2: Stomata are tiny pores on the leaf surface surrounded by guard cells.",
            "Step 3: Guard cells open and close stomata to regulate gas exchange.",
            "Step 4: Midrib, petiole, and lamina do not control gas exchange directly.",
            "Step 5: Answer: stomata.",
        ],
        competency="Describe gas exchange through stomata",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Gas exchange",
        indian_context=False,
    ))

    # Q4: Structure-function link – lamina
    correct = "The broad, flat lamina captures maximum sunlight for photosynthesis."
    q_text = (
        "Why is the leaf blade (lamina) broad and flat? Choose the best reason."
    )
    opts = _shuffle(rng, [
        correct,
        "It helps roots to absorb water from the soil.",
        "It makes the leaf stronger so animals cannot eat it.",
        "It stores excess food made by the plant.",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_002.value,
        id="002_q4_lamina_function",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="A broad, flat lamina maximises surface area to capture sunlight for photosynthesis.",
        step_by_step=[
            "Step 1: Think about the function of the lamina in photosynthesis.",
            "Step 2: Photosynthesis requires sunlight. More surface area = more sunlight captured.",
            "Step 3: A broad, flat shape maximises the surface area exposed to the sun.",
            "Step 4: This is like a solar panel – the bigger and flatter it is, the more sunlight it collects.",
            "Step 5: Answer: The broad, flat lamina captures maximum sunlight for photosynthesis.",
        ],
        competency="Explain how leaf structure supports photosynthesis",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Structure-function link",
        indian_context=False,
    ))

    # Q5: Chlorophyll and sunlight (Indian context)
    correct = "chlorophyll"
    q_text = (
        "The green colour of leaves is due to a pigment called ______, "
        "which absorbs sunlight for photosynthesis."
    )
    opts = _shuffle(rng, [correct, "xylem", "phloem", "guard cell"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_002.value,
        id="002_q5_chlorophyll",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Chlorophyll is the green pigment that absorbs sunlight for photosynthesis.",
        step_by_step=[
            "Step 1: Leaves are green due to a pigment.",
            "Step 2: This pigment absorbs sunlight for photosynthesis.",
            "Step 3: The pigment is called chlorophyll.",
            "Step 4: Xylem and phloem are transport tissues; guard cells control stomata.",
            "Step 5: Answer: chlorophyll.",
        ],
        competency="State main functions of a leaf",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.EASY.value,
        topic="Photosynthesis",
        indian_context=False,
    ))

    # Q6: Transpiration cools the plant (Indian context)
    correct = "It cools the plant down."
    q_text = (
        "During a hot summer afternoon in Rajasthan, a kikar (Acacia nilotica) tree releases "
        "water vapour through its leaves. This helps the tree to ______."
    )
    opts = _shuffle(rng, [
        correct,
        "make more chlorophyll",
        "grow taller",
        "produce more flowers",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_002.value,
        id="002_q6_transpiration_cooling",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Transpiration cools the plant, much like sweating cools our body on a hot day.",
        step_by_step=[
            "Step 1: The scenario describes water vapour release during a hot afternoon.",
            "Step 2: This is transpiration.",
            "Step 3: Transpiration has two benefits: (a) pulls water upward, (b) cools the plant.",
            "Step 4: In hot conditions, the cooling effect is important.",
            "Step 5: Answer: It cools the plant down.",
        ],
        competency="Explain how leaf structure supports transpiration",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Transpiration",
        indian_context=True,
    ))

    return questions

# ── c6_bio_003: Leaf modifications ────────────
def generate_003(rng: random.Random) -> List[Question]:
    questions = []

    # Q1: Tendril modification
    correct = "climbing support"
    q_text = (
        "In a pea plant, the leaf is modified into a thin, coiled structure called a tendril. "
        "This modification helps the plant in ______."
    )
    opts = _shuffle(rng, [
        correct,
        "defence against herbivores",
        "reducing water loss",
        "trapping insects",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_003.value,
        id="003_q1_tendril",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="In pea plants, leaves are modified into tendrils that coil around supports to help the plant climb.",
        step_by_step=[
            "Step 1: The question describes a leaf modified into a thin, coiled tendril in a pea plant.",
            "Step 2: Tendrils are for climbing – they wrap around nearby structures.",
            "Step 3: This is not for defence (spines do that) or insect trapping (insectivorous plants).",
            "Step 4: Answer: climbing support.",
        ],
        competency="Identify leaf modification type and its purpose",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Leaf modifications",
        indian_context=True,
    ))

    # Q2: Spine modification
    correct = "defence and to reduce water loss"
    q_text = (
        "In a cactus, the leaves are reduced to sharp spines. These spines help the plant by ______."
    )
    opts = _shuffle(rng, [
        correct,
        "absorbing more sunlight",
        "reproducing new plants",
        "trapping insects for food",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_003.value,
        id="003_q2_spine",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="In cacti, leaves become spines for defence and to minimise water loss in dry conditions.",
        step_by_step=[
            "Step 1: Cacti live in deserts with very little water.",
            "Step 2: Large leaves would lose water quickly through transpiration.",
            "Step 3: Spines have very little surface area, reducing water loss.",
            "Step 4: Spines also protect the plant from herbivores.",
            "Step 5: Answer: defence and to reduce water loss.",
        ],
        competency="Identify leaf modification type and its purpose",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Leaf modifications",
        indian_context=True,
    ))

    # Q3: Insectivorous plants
    correct = "to obtain nitrogen from trapped insects"
    q_text = (
        "The pitcher plant grows in nitrogen-deficient soil. It has modified leaves "
        "that trap and digest insects. This adaptation helps the plant ______."
    )
    opts = _shuffle(rng, [
        correct,
        "to climb up other plants",
        "to reduce water loss",
        "to protect its buds",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_003.value,
        id="003_q3_pitcher",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Pitcher plants are insectivorous – they trap insects to obtain nitrogen in nutrient-poor soils.",
        step_by_step=[
            "Step 1: Pitcher plants live in soil lacking nitrogen.",
            "Step 2: Their leaves are modified into pitchers that trap insects.",
            "Step 3: They digest insects to obtain nitrogen (needed for proteins).",
            "Step 4: This is not for climbing, water loss, or bud protection.",
            "Step 5: Answer: to obtain nitrogen from trapped insects.",
        ],
        competency="Describe insectivorous plant adaptations",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Insectivorous plants",
        indian_context=True,
    ))

    # Q4: Bryophyllum vegetative propagation
    correct = "Bryophyllum"
    q_text = (
        "Amar observed a plant where tiny plantlets were growing along the edges of the leaf. "
        "When these plantlets fell off, they grew into new plants. This plant is called ______."
    )
    opts = _shuffle(rng, [correct, "cactus", "banana", "neem"])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_003.value,
        id="003_q4_bryophyllum",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Bryophyllum reproduces vegetatively – plantlets grow along leaf margins and fall off to grow independently.",
        step_by_step=[
            "Step 1: The key feature: plantlets growing along leaf margins.",
            "Step 2: This is a unique feature of Bryophyllum (Kalanchoe).",
            "Step 3: This is an example of vegetative propagation through leaves.",
            "Step 4: Cactus has spines, banana has leaves but not plantlets, neem has compound leaves.",
            "Step 5: Answer: Bryophyllum.",
        ],
        competency="Describe vegetative propagation in leaves",
        bloom_level=BloomLevel.REMEMBER.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Vegetative propagation",
        indian_context=True,
    ))

    # Q5: Scale leaves
    correct = "to protect the buds"
    q_text = (
        "The fleshy, overlapping leaves of an onion bulb are called scale leaves. "
        "Their main purpose is ______."
    )
    opts = _shuffle(rng, [
        correct,
        "to trap insects",
        "to help the plant climb",
        "to absorb sunlight for photosynthesis",
    ])
    correct_idx = opts.index(correct)
    questions.append(Question(
        node_id=NodeId.C6_BIO_003.value,
        id="003_q5_scale_leaf",
        question_text=q_text,
        options=opts,
        correct_index=correct_idx,
        explanation="Scale leaves are modified to protect buds in underground storage organs like onion bulbs.",
        step_by_step=[
            "Step 1: Scale leaves are fleshy, overlapping leaves.",
            "Step 2: In onions, they surround and protect the central bud.",
            "Step 3: They also store food, but the primary modification purpose is protection.",
            "Step 4: They are not for insect trapping, climbing, or photosynthesis.",
            "Step 5: Answer: to protect the buds.",
        ],
        competency="Identify leaf modification type and its purpose",
        bloom_level=BloomLevel.UNDERSTAND.value,
        difficulty=Difficulty.MEDIUM.value,
        topic="Leaf modifications",
        indian_context=True,
    ))

    return questions

# ──────────────────────────────────────────────
# Solver core
# ──────────────────────────────────────────────
def _run_quiz(questions: List[Question], rng: random.Random) -> Tuple[List[int], List[str]]:
    user_answers = []
    feedbacks = []
    for q in questions:
        # Deterministic 'user' answers based on a derived seed per question
        ans_seed = int(hashlib.sha256(f"{_SEED_SOURCE}_{q.id}".encode()).hexdigest()[:8], 16)
        q_rng = random.Random(ans_seed)
        simulated_answer = q_rng.randint(0, 3)
        user_answers.append(simulated_answer)
        is_correct = simulated_answer == q.correct_index
        fb = (
            f"✓ CORRECT — {q.explanation}"
            if is_correct
            else f"✗ INCORRECT — Correct answer: {q.options[q.correct_index]}. {q.explanation}"
        )
        feedbacks.append(fb)
    return user_answers, feedbacks

def solve_node(node_id: NodeId) -> SolverResult:
    rng = _rng(hash(node_id.value))

    generators = {
        NodeId.C6_BIO_001: generate_001,
        NodeId.C6_BIO_002: generate_002,
        NodeId.C6_BIO_003: generate_003,
    }
    node_names = {
        NodeId.C6_BIO_001: "Leaf structure and types",
        NodeId.C6_BIO_002: "Functions of leaf",
        NodeId.C6_BIO_003: "Leaf modifications",
    }

    questions = generators[node_id](rng)
    user_answers, feedbacks = _run_quiz(questions, rng)
    correct_count = sum(1 for i, q in enumerate(questions) if user_answers[i] == q.correct_index)
    score_pct = (correct_count / len(questions)) * 100 if questions else 0.0
    mastery_threshold = 70.0

    return SolverResult(
        node_id=node_id.value,
        node_name=node_names[node_id],
        total_questions=len(questions),
        correct_answers=correct_count,
        score_percentage=round(score_pct, 2),
        mastery_achieved=score_pct >= mastery_threshold,
        questions=questions,
        user_answers=user_answers,
        detailed_feedback=feedbacks,
    )

def solve_all() -> Dict[str, SolverResult]:
    results = {}
    for node in NodeId:
        results[node.value] = solve_node(node)
    return results

# ──────────────────────────────────────────────
# Verification
# ──────────────────────────────────────────────
def verify_solver(results: Dict[str, SolverResult]) -> bool:
    all_ok = True
    for node_id, result in results.items():
        if result.total_questions == 0:
            print(f"[FAIL] {node_id}: No questions generated.")
            all_ok = False
        for q in result.questions:
            if not (0 <= q.correct_index < len(q.options)):
                print(f"[FAIL] {q.id}: correct_index {q.correct_index} out of range.")
                all_ok = False
            if len(q.step_by_step) == 0:
                print(f"[FAIL] {q.id}: No step-by-step reasoning.")
                all_ok = False
        if result.correct_answers > result.total_questions:
            print(f"[FAIL] {node_id}: correct_answers > total_questions.")
            all_ok = False
    if all_ok:
        print("[PASS] All nodes verified successfully.")
    return all_ok

# ──────────────────────────────────────────────
# Report printer
# ──────────────────────────────────────────────
def print_report(results: Dict[str, SolverResult]) -> None:
    total_q = 0
    total_correct = 0

    for node_id, r in results.items():
        print("=" * 70)
        print(f"NODE: {r.node_id.upper()}  |  {r.node_name}")
        print("=" * 70)
        print(f"Questions: {r.total_questions}  |  Correct: {r.correct_answers}  |  "
              f"Score: {r.score_percentage:.1f}%  |  Mastery: {'YES' if r.mastery_achieved else 'NO'}")
        print("-" * 70)

        for i, q in enumerate(r.questions):
            user_ans = r.user_answers[i]
            status = "✓" if user_ans == q.correct_index else "✗"
            print(f"\n  Q{i+1} [{q.id}]  ({q.difficulty}, {q.bloom_level}, {'🇮🇳 Indian Context' if q.indian_context else '🌍 General'})")
            print(f"  {q.question_text}")
            for j, opt in enumerate(q.options):
                marker = ""
                if j == q.correct_index:
                    marker += " ✔"
                if j == user_ans and j != q.correct_index:
                    marker += " ✗(your choice)"
                print(f"    ({chr(65+j)}) {opt}{marker}")
            print(f"  Feedback: {r.detailed_feedback[i]}")
            print(f"  Step-by-step:")
            for step in q.step_by_step:
                print(f"    {step}")

        total_q += r.total_questions
        total_correct += r.correct_answers

    print("\n" + "=" * 70)
    print("OVERALL SUMMARY")
    print("=" * 70)
    overall_score = (total_correct / total_q) * 100 if total_q else 0
    print(f"Total questions across all nodes : {total_q}")
    print(f"Total correct                    : {total_correct}")
    print(f"Overall score                    : {overall_score:.1f}%")
    print(f"Deterministic seed hash          : {_SEED_INT}")
    print("=" * 70)

# ──────────────────────────────────────────────
# Math verification via numpy (symbolic check)
# ──────────────────────────────────────────────
def verify_counts(results: Dict[str, SolverResult]) -> None:
    print("\n[Numpy Verification]")
    for node_id, r in results.items():
        arr = np.array(r.user_answers)
        correct_arr = np.array([q.correct_index for q in r.questions])
        computed_correct = int(np.sum(arr == correct_arr))
        computed_score = computed_correct / r.total_questions * 100
        match = (computed_correct == r.correct_answers and
                 abs(computed_score - r.score_percentage) < 0.01)
        symbol = "✓" if match else "✗"
        print(f"  {symbol} {node_id}: computed={computed_correct}/{r.total_questions} "
              f"({computed_score:.1f}%), stored={r.correct_answers}/{r.total_questions} "
              f"({r.score_percentage:.1f}%)")

# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────
def main():
    print("=" * 70)
    print("  CLASS 6 BIOLOGY – DETERMINISTIC SOLVER")
    print(f"  Seed source : {_SEED_SOURCE}")
    print(f"  Seed value  : {_SEED_INT}")
    print("=" * 70)
    print()

    results = solve_all()
    is_valid = verify_solver(results)
    print_report(results)
    verify_counts(results)

    print(f"\nSolver {'PASSED' if is_valid else 'FAILED'} all verification checks.")

if __name__ == "__main__":
    main()