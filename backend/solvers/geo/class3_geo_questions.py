"""
Deterministic Question Generator — Class 3 Geography (CISCE Primary Curriculum)
Author: Claude-Fable-5 / Anthropic
"""

import hashlib
import math
import random
import string
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Dict, Optional, Tuple


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 1 : Deterministic seeded RNG
# ─────────────────────────────────────────────────────────────────────────────

class SeededRNG:
    """Drop-in replacement for random that is fully deterministic for a given seed."""

    def __init__(self, seed: int):
        self._seed = seed
        # Use a hash of the seed to create a large initial state
        h = hashlib.sha256(str(seed).encode()).hexdigest()
        state_val = int(h[:16], 16)
        self._rng = random.Random(state_val)

    def randint(self, lo: int, hi: int) -> int:
        return self._rng.randint(lo, hi)

    def choice(self, seq):
        return self._rng.choice(seq)

    def shuffle(self, seq):
        s = list(seq)
        self._rng.shuffle(s)
        return s

    def uniform(self, lo: float, hi: float) -> float:
        return self._rng.uniform(lo, hi)

    def sample(self, seq, k: int):
        return self._rng.sample(seq, k)


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 2 : Data classes
# ─────────────────────────────────────────────────────────────────────────────

class QType(Enum):
    MCQ         = "mcq"
    FILL_BLANK  = "fill_blank"
    TRUE_FALSE  = "true_false"
    MATCH_COL   = "match_col"
    SHORT_ANS   = "short_answer"
    ORDERING    = "ordering"


class Difficulty(Enum):
    EASY   = "easy"
    MEDIUM = "medium"


@dataclass
class Node:
    id: str
    title: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    mastery_criteria: str
    vocabulary: List[str]
    spiral_topic: str
    scope_level: str
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq: Optional[str] = None


@dataclass
class Question:
    node_id: str
    qtype: str          # QType value string
    difficulty: str     # Difficulty value string
    question_text: str
    options: Optional[List[str]] = None   # MCQ options  (index 0 = correct)
    answer: str = ""
    explanation: str = ""
    match_left: Optional[List[str]] = None
    match_right: Optional[List[str]] = None
    match_correct: Optional[List[int]] = None
    ordered_list: Optional[List[str]] = None
    ordered_correct: Optional[List[str]] = None
    blank_word: str = ""                 # word hidden in fill_blank


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 3 : Node registry
# ─────────────────────────────────────────────────────────────────────────────

NODES: Dict[str, Node] = {
    # --- c3_geo_001 ---
    "c3_geo_001": Node(
        id="c3_geo_001",
        title="Globe — model of Earth",
        section="The Earth",
        syllabus=(
            "The globe as a small spherical model of Earth showing continents, "
            "oceans, and countries. Why a globe is used — Earth is round and a "
            "globe shows its true shape. The axis: a tilted rod passing through "
            "the globe from top to bottom representing Earth's rotation. Northern "
            "and Southern hemispheres: the globe divided into two halves by the "
            "equator. Using a globe to locate places on Earth. Limitations of a "
            "globe: too small to show all details, cannot show roads or small towns."
        ),
        cognitive_level="Understand",
        difficulty="Easy",
        mastery_criteria=(
            "Can describe a globe as a model of Earth and explain why it is used "
            "(Earth is round). Can identify the axis and the two hemispheres "
            "(Northern and Southern). Can use a globe to point out continents and "
            "oceans. Can state at least one limitation of a globe."
        ),
        vocabulary=["globe", "model", "Earth", "axis", "hemisphere",
                    "Northern Hemisphere", "Southern Hemisphere", "equator",
                    "continent", "ocean"],
        spiral_topic="earth-model",
        scope_level="2-Foundational",
        exam_relevance="School_Only",
        exam_weightage="Medium",
        competency_level="School",
        prereq=None,
    ),
    # --- c3_geo_002 ---
    "c3_geo_002": Node(
        id="c3_geo_002",
        title="Earth — shape and size",
        section="The Earth",
        syllabus=(
            "Earth's shape — spherical (geoid): slightly flattened at the poles "
            "and bulging at the equator. Evidence of Earth's spherical shape: a "
            "ship disappearing hull first over the horizon, Earth's circular shadow "
            "on the Moon during a lunar eclipse, photographs of Earth from space. "
            "Size of Earth: circumference approximately 40,000 km, diameter "
            "approximately 12,742 km. Earth appears flat locally because it is "
            "very large. Simple comparison of Earth's size with other planets."
        ),
        cognitive_level="Understand",
        difficulty="Medium",
        mastery_criteria=(
            "Can describe Earth's shape as spherical (geoid) and explain that it "
            "is slightly flattened at the poles and bulging at the equator. Can "
            "give at least two pieces of evidence for Earth's spherical shape. Can "
            "state Earth's approximate circumference and diameter. Can explain why "
            "Earth appears flat to us even though it is round."
        ),
        vocabulary=["spherical", "geoid", "flattened", "poles", "equator",
                    "bulging", "circumference", "diameter", "horizon",
                    "lunar eclipse", "curvature"],
        spiral_topic="earth-shape",
        scope_level="2-Foundational",
        exam_relevance="School_Only",
        exam_weightage="Medium",
        competency_level="School",
        prereq="c3_geo_001",
    ),
    # --- c3_geo_003 ---
    "c3_geo_003": Node(
        id="c3_geo_003",
        title="Continents — introduction",
        section="The Earth",
        syllabus=(
            "Continents as seven large landmasses on Earth: Asia (largest), "
            "Africa, North America, South America, Antarctica (covered in ice), "
            "Europe, and Australia (smallest). Locating each continent on a globe "
            "and on a world map. The equator passes through Africa, South America, "
            "and Asia. India is located in the continent of Asia. Simple "
            "characteristics of each continent — size, position, and one "
            "distinguishing feature."
        ),
        cognitive_level="Remember",
        difficulty="Medium",
        mastery_criteria=(
            "Can name all seven continents and identify them on a globe or world "
            "map. Can state which is the largest (Asia) and the smallest "
            "(Australia). Can explain that Antarctica is covered in ice. Can "
            "identify India as part of Asia. Can state that the equator passes "
            "through Africa, South America, and Asia."
        ),
        vocabulary=["continent", "landmass", "Asia", "Africa", "North America",
                    "South America", "Antarctica", "Europe", "Australia",
                    "equator", "map", "globe"],
        spiral_topic="continents",
        scope_level="2-Foundational",
        exam_relevance="School_Only",
        exam_weightage="Medium",
        competency_level="School",
        prereq=None,
    ),
    # --- c3_geo_004 ---
    "c3_geo_004": Node(
        id="c3_geo_004",
        title="Oceans — introduction",
        section="The Earth",
        syllabus=(
            "Oceans as the vast bodies of salt water covering most of Earth's "
            "surface. The four major oceans: Pacific (largest and deepest), "
            "Atlantic, Indian, and Arctic (smallest). Oceans are connected and "
            "form one large body of water. Water in the oceans is salty and not "
            "fit for drinking. Locating the oceans on a globe and world map. "
            "India has a long coastline along the Indian Ocean. Simple comparison "
            "of the size of the four oceans."
        ),
        cognitive_level="Remember",
        difficulty="Easy",
        mastery_criteria=(
            "Can name the four major oceans. Can identify the Pacific Ocean as "
            "the largest and deepest, and the Arctic as the smallest. Can locate "
            "the Indian Ocean and explain that India has a coastline on it. Can "
            "state that ocean water is salty. Can explain that all oceans are "
            "connected."
        ),
        vocabulary=["ocean", "Pacific Ocean", "Atlantic Ocean", "Indian Ocean",
                    "Arctic Ocean", "coastline", "salty", "connected"],
        spiral_topic="oceans",
        scope_level="2-Foundational",
        exam_relevance="School_Only",
        exam_weightage="Medium",
        competency_level="School",
        prereq="c3_geo_003",
    ),
    # --- c3_geo_005 ---
    "c3_geo_005": Node(
        id="c3_geo_005",
        title="Map — an introduction",
        section="The Earth",
        syllabus=(
            "A map as a flat drawing of Earth's surface showing places, countries, "
            "rivers, and mountains. Difference between a globe and a map — a globe "
            "is round and shows the whole Earth; a map is flat and shows only a "
            "part of Earth. Types of maps: political (shows countries, cities), "
            "physical (shows landforms like mountains and rivers). Symbols used on "
            "maps — a legend or key explains what symbols mean. Directions on a "
            "map: North at the top, South at the bottom, East to the right, West "
            "to the left. Using a compass to find directions."
        ),
        cognitive_level="Understand",
        difficulty="Medium",
        mastery_criteria=(
            "Can explain what a map is and how it differs from a globe. Can name "
            "two types of maps (political and physical). Can read simple symbols "
            "using a map key/legend. Can state the four cardinal directions "
            "(North, South, East, West) and their positions on a map. Can explain "
            "the use of a compass."
        ),
        vocabulary=["map", "globe", "flat", "surface", "political map",
                    "physical map", "symbols", "legend", "key", "directions",
                    "North", "South", "East", "West", "compass", "cardinal"],
        spiral_topic="maps",
        scope_level="2-Foundational",
        exam_relevance="School_Only",
        exam_weightage="Medium",
        competency_level="School",
        prereq="c3_geo_001",
    ),
    # --- c3_geo_006 ---
    "c3_geo_006": Node(
        id="c3_geo_006",
        title="India — location and neighbours",
        section="The Earth",
        syllabus=(
            "India's location in the continent of Asia, in the northern and "
            "eastern hemispheres. India is a large country in the southern part "
            "of Asia. neighbouring countries: Pakistan (west), China and Nepal "
            "(north), Bhutan and Bangladesh (east/northeast), Myanmar (east), "
            "Sri Lanka (south, separated by the Palk Strait and the Gulf of "
            "Mannar). India is surrounded by the Indian Ocean on the south, the "
            "Arabian Sea on the southwest, and the Bay of Bengal on the southeast. "
            "India's neighbours — land and water boundaries."
        ),
        cognitive_level="Remember",
        difficulty="Easy",
        mastery_criteria=(
            "Can locate India in Asia on a map or globe. Can name at least four "
            "neighbouring countries of India. Can state that India is surrounded "
            "by the Indian Ocean to the south, the Arabian Sea to the southwest, "
            "and the Bay of Bengal to the southeast. Can describe India's position "
            "relative to the equator (largely in the Northern Hemisphere)."
        ),
        vocabulary=["India", "Asia", "neighbouring countries", "Pakistan",
                    "China", "Nepal", "Bangladesh", "Sri Lanka", "Myanmar",
                    "Indian Ocean", "Arabian Sea", "Bay of Bengal", "Palk Strait",
                    "Gulf of Mannar", "hemisphere"],
        spiral_topic="india-location",
        scope_level="2-Foundational",
        exam_relevance="School_Only",
        exam_weightage="High",
        competency_level="School",
        prereq="c3_geo_003",
    ),
}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 4 : Question templates per node
#             Each template is a function (rng, node_id) -> Question
#             that uses only the seeded rng — fully deterministic.
# ─────────────────────────────────────────────────────────────────────────────

# ── c3_geo_001 : Globe — model of Earth ─────────────────────────────────────

def _q001_mcq_what_globe(rng: SeededRNG, nid: str) -> Question:
    opts = ["A flat drawing of Earth",
            "A small spherical model of Earth",
            "A photograph of Earth from space",
            "A book about Earth"]
    idx = 1  # correct index
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "A globe is used in geography because Earth is round. "
            "What is a globe?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "A globe is a small spherical model of Earth. It shows the true "
            "shape of Earth with continents and oceans."
        ),
    )


def _q001_fb_axis(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "The _____ is a tilted rod passing through the globe from top to "
            "bottom. It represents the rotation of Earth."
        ),
        answer="axis",
        blank_word="axis",
        explanation=(
            "The axis is an imaginary rod passing through Earth (and the globe) "
            "from the North Pole to the South Pole. It is tilted at an angle."
        ),
    )


def _q001_fb_sphere(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "Earth is round in shape, so we use a _____, which is also round "
            "in shape, to represent it."
        ),
        answer="globe",
        blank_word="globe",
        explanation=(
            "Since Earth is round (spherical), we use a globe which is also "
            "round to show its true shape."
        ),
    )


def _q001_tf_limitation(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.TRUE_FALSE.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "A globe can show every small road and town just like a real map. "
            "True or False?"
        ),
        answer="False",
        explanation=(
            "A globe is too small to show all the small details such as roads "
            "and small towns. It only shows large features like continents and "
            "oceans."
        ),
    )


def _q001_short_hemisphere(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.SHORT_ANS.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "The globe is divided into two halves by the equator. What are "
            "these two halves called?"
        ),
        answer="Northern Hemisphere and Southern Hemisphere",
        explanation=(
            "The equator is an imaginary line that divides Earth (and the globe) "
            "into the Northern Hemisphere (above the equator) and the Southern "
            "Hemisphere (below the equator)."
        ),
    )


def _q001_match_globe_terms(rng: SeededRNG, nid: str) -> Question:
    left  = ["Globe", "Axis", "Equator", "Hemisphere"]
    right = ["Small model of Earth",
             "Tilted rod through the globe",
             "Imaginary line dividing Earth into two halves",
             "Each half of the globe"]
    correct = [0, 1, 2, 3]  # left[i] -> right[correct[i]]
    # shuffle right column with seed
    pairs = list(zip(right, correct))
    shuffled = rng.shuffle([(r, c) for r, c in pairs])
    shuffled_right = [p[0] for p in shuffled]
    remap = {orig_r: new_i for new_i, (orig_r, _) in enumerate(shuffled)}
    new_correct = [remap[right[c]] for c in correct]
    return Question(
        node_id=nid, qtype=QType.MATCH_COL.value, difficulty=Difficulty.EASY.value,
        question_text="Match the geography terms in Column A with their meanings in Column B.",
        match_left=left,
        match_right=shuffled_right,
        match_correct=new_correct,
        answer="Globe→Small model of Earth; Axis→Tilted rod; "
               "Equator→Imaginary line; Hemisphere→Each half",
        explanation=(
            "A globe is a small model of Earth. The axis is a tilted rod. "
            "The equator divides Earth into two hemispheres."
        ),
    )


# ── c3_geo_002 : Earth — shape and size ─────────────────────────────────────

def _q002_mcq_shape(rng: SeededRNG, nid: str) -> Question:
    opts = ["Flat like a plate",
            "A long cylinder",
            "Spherical (like a ball)",
            "Square like a box"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "What is the shape of our planet Earth?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "Earth is spherical in shape (also called a geoid). It is slightly "
            "flattened at the poles and bulges at the equator."
        ),
    )


def _q002_mcq_evidence(rng: SeededRNG, nid: str) -> Question:
    opts = ["The Sun rises in the east",
            "A ship disappears hull first over the horizon",
            "Grass is green",
            "Rivers flow downhill"]
    idx = 1
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Which of the following is evidence that Earth is round (spherical)?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "When a ship sails away, its hull disappears first and the mast last. "
            "This happens because Earth is curved — it is proof that Earth is "
            "spherical."
        ),
    )


def _q002_fb_circumference(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "The _____ of Earth is approximately 40,000 km. "
            "(Hint: It is the distance around the middle of Earth.)"
        ),
        answer="circumference",
        blank_word="circumference",
        explanation=(
            "The circumference of Earth is about 40,000 km — that is the distance "
            "around Earth if you go around it like a belt."
        ),
    )


def _q002_tf_flat(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.TRUE_FALSE.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Earth appears flat to us because it is very small. True or False?"
        ),
        answer="False",
        explanation=(
            "Earth appears flat to us not because it is small, but because it is "
            "very large and we see only a tiny part of it. Just like an ant on a "
            "big ball would feel the surface as flat."
        ),
    )


def _q002_fb_eclipse(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "During a lunar eclipse, Earth casts a round _____ on the Moon. "
            "This shows Earth is spherical."
        ),
        answer="shadow",
        blank_word="shadow",
        explanation=(
            "During a lunar eclipse, Earth comes between the Sun and the Moon and "
            "casts a shadow. The shadow is always round, which proves Earth is "
            "spherical."
        ),
    )


def _q002_short_geoid(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.SHORT_ANS.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Earth's shape is called a 'geoid'. What does this mean? "
            "Mention two special features."
        ),
        answer=(
            "Earth is spherical (geoid), slightly flattened at the poles and "
            "bulging at the equator."
        ),
        explanation=(
            "Geoid means Earth is not a perfect sphere. It is slightly flattened "
            "at the North and South Poles and slightly bulging (wider) around the "
            "middle at the equator."
        ),
    )


# ── c3_geo_003 : Continents — introduction ──────────────────────────────────

def _q003_mcq_seven(rng: SeededRNG, nid: str) -> Question:
    opts = ["Five", "Six", "Seven", "Eight"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "How many continents are there on Earth?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "There are seven continents on Earth: Asia, Africa, North America, "
            "South America, Antarctica, Europe, and Australia."
        ),
    )


def _q003_mcq_largest(rng: SeededRNG, nid: str) -> Question:
    opts = ["Africa", "Asia", "North America", "Australia"]
    idx = 1
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Which is the largest continent in the world?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "Asia is the largest continent. It covers about 30% of Earth's total "
            "land area. Australia is the smallest continent."
        ),
    )


def _q003_fb_antarctica(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "_____ is the continent at the South Pole. It is completely covered "
            "with thick ice."
        ),
        answer="Antarctica",
        blank_word="Antarctica",
        explanation=(
            "Antarctica is the southernmost continent. It is almost entirely "
            "covered by ice and is the coldest place on Earth."
        ),
    )


def _q003_tf_india_asia(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.TRUE_FALSE.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "India is a part of the continent of Australia. True or False?"
        ),
        answer="False",
        explanation=(
            "India is part of the continent of Asia. Asia is the largest continent "
            "and India is in the southern part of Asia."
        ),
    )


def _q003_mcq_equator(rng: SeededRNG, nid: str) -> Question:
    opts = ["Europe and Australia",
            "Asia, Africa, and South America",
            "Antarctica and North America",
            "All seven continents"]
    idx = 1
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "The equator passes through which of the following continents?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "The equator passes through three continents: Asia (through the "
            "islands of Indonesia), Africa (through Kenya, Uganda, Congo), and "
            "South America (through Brazil, Colombia, Ecuador)."
        ),
    )


def _q003_short_smallest(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.SHORT_ANS.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "Name the smallest continent in the world."
        ),
        answer="Australia",
        explanation=(
            "Australia is the smallest continent. It is also a country. "
            "It is located in the southern hemisphere, between the Indian and "
            "Pacific Oceans."
        ),
    )


def _q003_match_continents(rng: SeededRNG, nid: str) -> Question:
    left  = ["Asia", "Africa", "Antarctica", "Australia"]
    right = ["Largest continent",
             "Second largest continent, has the Sahara desert",
             "Ice-covered continent at the South Pole",
             "Smallest continent, also a country"]
    pairs = list(zip(right, range(4)))
    shuffled = rng.shuffle(pairs)
    shuffled_right = [p[0] for p in shuffled]
    remap = {orig_r: new_i for new_i, (orig_r, _) in enumerate(shuffled)}
    new_correct = [remap[right[i]] for i in range(4)]
    return Question(
        node_id=nid, qtype=QType.MATCH_COL.value, difficulty=Difficulty.MEDIUM.value,
        question_text="Match each continent with its special feature.",
        match_left=left,
        match_right=shuffled_right,
        match_correct=new_correct,
        answer="Asia→Largest; Africa→Second largest with Sahara; "
               "Antarctica→Ice-covered; Australia→Smallest",
        explanation=(
            "Asia is the largest, Africa is second largest and home to the Sahara "
            "desert, Antarctica is at the South Pole and ice-covered, and "
            "Australia is the smallest continent."
        ),
    )


# ── c3_geo_004 : Oceans — introduction ──────────────────────────────────────

def _q004_mcq_largest_ocean(rng: SeededRNG, nid: str) -> Question:
    opts = ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "Which is the largest and deepest ocean in the world?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "The Pacific Ocean is the largest and deepest ocean on Earth. It "
            "covers more area than all the land on Earth put together."
        ),
    )


def _q004_fb_salty(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "The water in the oceans is _____ (hint: it cannot be drunk directly)."
        ),
        answer="salty",
        blank_word="salty",
        explanation=(
            "Ocean water is salty because it contains dissolved salts, mainly "
            "sodium chloride (common salt). It is not fit for drinking."
        ),
    )


def _q004_mcq_indian_ocean(rng: SeededRNG, nid: str) -> Question:
    opts = ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"]
    idx = 0
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "India has a long coastline along which ocean?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "India is surrounded by the Indian Ocean to the south. The Arabian "
            "Sea is to the southwest and the Bay of Bengal to the southeast — "
            "both are parts of the Indian Ocean."
        ),
    )


def _q004_tf_connected(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.TRUE_FALSE.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "All the oceans of the world are separate and not connected to each "
            "other. True or False?"
        ),
        answer="False",
        explanation=(
            "All oceans are connected to each other and form one large continuous "
            "body of water covering most of Earth's surface."
        ),
    )


def _q004_mcq_arctic(rng: SeededRNG, nid: str) -> Question:
    opts = ["Largest ocean",
            "Deepest ocean",
            "Smallest ocean, near the North Pole",
            "Warmest ocean"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Which ocean is the smallest and is located around the North Pole?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "The Arctic Ocean is the smallest of the four major oceans. It is "
            "located around the North Pole and is mostly covered by ice."
        ),
    )


def _q004_short_count(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.SHORT_ANS.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "How many major oceans are there on Earth? Name any two."
        ),
        answer="Four — Pacific Ocean, Atlantic Ocean, Indian Ocean, Arctic Ocean.",
        explanation=(
            "There are four major oceans: the Pacific Ocean (largest), Atlantic "
            "Ocean, Indian Ocean, and Arctic Ocean (smallest)."
        ),
    )


# ── c3_geo_005 : Map — an introduction ──────────────────────────────────────

def _q005_mcq_globe_vs_map(rng: SeededRNG, nid: str) -> Question:
    opts = ["A globe is flat and a map is round",
            "A globe shows the whole Earth; a map shows only a part",
            "A globe cannot show continents; a map can",
            "A globe is a book; a map is a ball"]
    idx = 1
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "What is the main difference between a globe and a map?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "A globe is round and shows the entire Earth. A map is flat and "
            "usually shows only a part of Earth, such as a country or city."
        ),
    )


def _q005_fb_political(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "A _____ map shows countries, cities, and state boundaries."
        ),
        answer="political",
        blank_word="political",
        explanation=(
            "A political map shows human-made boundaries like countries, states, "
            "and cities. A physical map shows natural features like mountains "
            "and rivers."
        ),
    )


def _q005_tf_north_top(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.TRUE_FALSE.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "On most maps, North is shown at the top, South at the bottom, "
            "East to the right, and West to the left. True or False?"
        ),
        answer="True",
        explanation=(
            "This is the standard map orientation: North at the top, South at "
            "the bottom, East on the right, and West on the left."
        ),
    )


def _q005_mcq_key(rng: SeededRNG, nid: str) -> Question:
    opts = ["A set of directions",
            "A list of countries",
            "A box that explains map symbols",
            "A type of mountain"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "What is a map key (or map legend) used for?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "A map key (or legend) explains what the symbols on a map mean. "
            "For example, a blue line might mean a river, and a green area might "
            "mean a forest."
        ),
    )


def _q005_short_compass(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.SHORT_ANS.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "What tool is used to find directions, and what are the four "
            "cardinal directions?"
        ),
        answer=(
            "A compass is used to find directions. The four cardinal directions "
            "are North, South, East, and West."
        ),
        explanation=(
            "A compass has a magnetic needle that always points North. "
            "The four main directions are North, South, East, and West — "
            "called cardinal directions."
        ),
    )


def _q005_fb_physical(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "A _____ map shows natural features like mountains, rivers, and "
            "plateaus."
        ),
        answer="physical",
        blank_word="physical",
        explanation=(
            "A physical map shows natural landforms such as mountains, rivers, "
            "plains, and plateaus. Colours are used — brown for mountains, blue "
            "for water, green for plains."
        ),
    )


# ── c3_geo_006 : India — location and neighbours ────────────────────────────

def _q006_mcq_continent(rng: SeededRNG, nid: str) -> Question:
    opts = ["Africa", "Europe", "Asia", "Australia"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "India is a country in which continent?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "India is located in the continent of Asia. It is in the southern "
            "part of Asia. Asia is the largest continent on Earth."
        ),
    )


def _q006_mcq_neighbour(rng: SeededRNG, nid: str) -> Question:
    opts = ["Sri Lanka (north of India)",
            "China (west of India)",
            "Nepal (north of India)",
            "Myanmar (west of India)"]
    idx = 2
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Which of the following is a neighbouring country of India to the north?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "Nepal is a neighbouring country to the north of India. "
            "China is to the north-northeast. Pakistan is to the west. "
            "Sri Lanka is to the south."
        ),
    )


def _q006_fb_south(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "The _____ Ocean lies to the south of India."
        ),
        answer="Indian",
        blank_word="Indian",
        explanation=(
            "The Indian Ocean lies to the south of India. India has a long "
            "coastline along this ocean. The Arabian Sea is to the southwest "
            "and the Bay of Bengal to the southeast."
        ),
    )


def _q006_tf_coastline(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.TRUE_FALSE.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "India has no ocean on its southern side; it is only surrounded by "
            "land. True or False?"
        ),
        answer="False",
        explanation=(
            "India is surrounded by water on three sides. The Indian Ocean is "
            "to the south, the Arabian Sea to the southwest, and the Bay of "
            "Bengal to the southeast."
        ),
    )


def _q006_mcq_palk_strait(rng: SeededRNG, nid: str) -> Question:
    opts = ["A mountain range in north India",
            "A narrow strip of water between India and Sri Lanka",
            "A river in central India",
            "A desert in western India"]
    idx = 1
    return Question(
        node_id=nid, qtype=QType.MCQ.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "What is the Palk Strait?"
        ),
        options=opts, answer=opts[idx],
        explanation=(
            "The Palk Strait is a narrow strip of water between the southern tip "
            "of India (Tamil Nadu) and Sri Lanka. The Gulf of Mannar is also in "
            "this area."
        ),
    )


def _q006_short_neighbours(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.SHORT_ANS.value, difficulty=Difficulty.MEDIUM.value,
        question_text=(
            "Name any three neighbouring countries of India."
        ),
        answer=(
            "Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, or Sri Lanka "
            "(any three)."
        ),
        explanation=(
            "India shares land borders with Pakistan, China, Nepal, Bhutan, "
            "Bangladesh, and Myanmar. Sri Lanka is a neighbouring country across "
            "the sea."
        ),
    )


def _q006_fb_hemisphere(rng: SeededRNG, nid: str) -> Question:
    return Question(
        node_id=nid, qtype=QType.FILL_BLANK.value, difficulty=Difficulty.EASY.value,
        question_text=(
            "India lies mostly in the _____ Hemisphere. "
            "(Hint: It is the half of Earth above the equator.)"
        ),
        answer="Northern",
        blank_word="Northern",
        explanation=(
            "India is located mostly in the Northern Hemisphere. The equator "
            "does not pass through India. It lies between approximately 8°N and "
            "37°N latitude."
        ),
    )


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 5 : Master template registry
#             Maps node_id -> list of template functions
#             Functions are consumed round-robin with modulo so any count works.
# ─────────────────────────────────────────────────────────────────────────────

TEMPLATES: Dict[str, List] = {
    "c3_geo_001": [
        _q001_mcq_what_globe,
        _q001_fb_axis,
        _q001_fb_sphere,
        _q001_tf_limitation,
        _q001_short_hemisphere,
        _q001_match_globe_terms,
    ],
    "c3_geo_002": [
        _q002_mcq_shape,
        _q002_mcq_evidence,
        _q002_fb_circumference,
        _q002_tf_flat,
        _q002_fb_eclipse,
        _q002_short_geoid,
    ],
    "c3_geo_003": [
        _q003_mcq_seven,
        _q003_mcq_largest,
        _q003_fb_antarctica,
        _q003_tf_india_asia,
        _q003_mcq_equator,
        _q003_short_smallest,
        _q003_match_continents,
    ],
    "c3_geo_004": [
        _q004_mcq_largest_ocean,
        _q004_fb_salty,
        _q004_mcq_indian_ocean,
        _q004_tf_connected,
        _q004_mcq_arctic,
        _q004_short_count,
    ],
    "c3_geo_005": [
        _q005_mcq_globe_vs_map,
        _q005_fb_political,
        _q005_tf_north_top,
        _q005_mcq_key,
        _q005_short_compass,
        _q005_fb_physical,
    ],
    "c3_geo_006": [
        _q006_mcq_continent,
        _q006_mcq_neighbour,
        _q006_fb_south,
        _q006_tf_coastline,
        _q006_mcq_palk_strait,
        _q006_short_neighbours,
        _q006_fb_hemisphere,
    ],
}

# Desired counts per node (balanced across qtypes)
QUESTION_COUNTS: Dict[str, int] = {
    "c3_geo_001": 4,
    "c3_geo_002": 4,
    "c3_geo_003": 4,
    "c3_geo_004": 4,
    "c3_geo_005": 4,
    "c3_geo_006": 4,
}

# How many to try as Easy vs Medium (roughly)
DIFFICULTY_BUDGET: Dict[str, Dict[str, int]] = {
    "c3_geo_001": {"easy": 3, "medium": 1},
    "c3_geo_002": {"easy": 1, "medium": 3},
    "c3_geo_003": {"easy": 2, "medium": 2},
    "c3_geo_004": {"easy": 3, "medium": 1},
    "c3_geo_005": {"easy": 2, "medium": 2},
    "c3_geo_006": {"easy": 3, "medium": 1},
}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 6 : Generator class
# ─────────────────────────────────────────────────────────────────────────────

class Class3GeoQuestionGenerator:
    """
    Deterministic question generator for Class 3 Geography.

    Usage:
        gen = Class3GeoQuestionGenerator(seed=42)
        questions = gen.generate_all()
        paper = gen.build_paper(seed=42, questions_per_node=4)
    """

    def __init__(self, seed: int = 2025):
        self._seed = seed
        self._nodes: Dict[str, Node] = NODES
        self._templates: Dict[str, List] = TEMPLATES

    # ── public API ────────────────────────────────────────────────────────────

    def generate_for_node(self, node_id: str, count: int) -> List[Question]:
        """
        Generate `count` questions for a single node.

        Deterministic given the generator's seed + node_id.
        """
        if node_id not in self._nodes:
            raise KeyError(f"Unknown node: {node_id}")
        templates = self._templates.get(node_id, [])
        if not templates:
            return []

        # Per-node deterministic sub-seed
        sub_seed = self._subseed(node_id)
        rng = SeededRNG(sub_seed)

        # Determine difficulty split
        budget = DIFFICULTY_BUDGET.get(
            node_id, {"easy": count // 2, "medium": count - count // 2}
        )
        easy_needed  = min(budget.get("easy",  count // 2), count)
        medium_needed = count - easy_needed

        # Separate templates by their inherent difficulty
        easy_templates   = []
        medium_templates = []
        for t in templates:
            q = t(rng, node_id)  # probe once to check difficulty
            if q.difficulty == Difficulty.EASY.value:
                easy_templates.append(t)
            else:
                medium_templates.append(t)

        # Sample deterministically
        chosen: List = []
        rng2 = SeededRNG(sub_seed + 1)

        easy_pool   = list(easy_templates)
        medium_pool = list(medium_templates)

        for _ in range(easy_needed):
            if easy_pool:
                t = rng2.choice(easy_pool)
                chosen.append(t(rng2, node_id))
                # avoid immediate repeat
                easy_pool = [x for x in easy_pool if x is not t] or easy_pool

        for _ in range(medium_needed):
            if medium_pool:
                t = rng2.choice(medium_pool)
                chosen.append(t(rng2, node_id))
                medium_pool = [x for x in medium_pool if x is not t] or medium_pool

        # If we couldn't get enough from difficulty split, fill from any pool
        remaining = count - len(chosen)
        all_pool = list(templates)
        rng3 = SeededRNG(sub_seed + 2)
        for _ in range(remaining):
            t = rng3.choice(all_pool)
            q = t(rng3, node_id)
            if q not in chosen:
                chosen.append(q)

        # Final deterministic shuffle
        rng4 = SeededRNG(sub_seed + 3)
        return rng4.shuffle(chosen)

    def generate_all(self) -> List[Question]:
        """Generate QUESTION_COUNTS questions for every node in order."""
        all_q: List[Question] = []
        for nid in self._nodes:
            qs = self.generate_for_node(nid, QUESTION_COUNTS[nid])
            all_q.extend(qs)
        return all_q

    def build_paper(
        self,
        seed: Optional[int] = None,
        questions_per_node: Optional[Dict[str, int]] = None,
        node_order: Optional[List[str]] = None,
    ) -> Dict:
        """
        Build a complete exam-style question paper.

        Returns a dict with:
            - 'seed': seed used
            - 'total_questions': total count
            - 'nodes': list of per-node dicts with node info + questions
            - 'answer_key': flat list of {q_no, node_id, type, answer, marks}
        """
        if seed is not None:
            self._seed = seed
        if questions_per_node:
            for k, v in questions_per_node.items():
                QUESTION_COUNTS[k] = v
        if node_order is None:
            node_order = list(self._nodes.keys())

        paper_nodes = []
        answer_key = []
        q_counter = 1
        marks_map = {
            QType.MCQ.value: 1,
            QType.FILL_BLANK.value: 1,
            QType.TRUE_FALSE.value: 1,
            QType.MATCH_COL.value: 2,
            QType.SHORT_ANS.value: 2,
            QType.ORDERING.value: 2,
        }

        for nid in node_order:
            node = self._nodes[nid]
            qs = self.generate_for_node(nid, QUESTION_COUNTS.get(nid, 4))
            node_block = {
                "node_id": nid,
                "title": node.title,
                "section": node.section,
                "difficulty": node.difficulty,
                "competency_level": node.competency_level,
                "questions": [],
            }
            for q in qs:
                marks = marks_map.get(q.qtype, 1)
                node_block["questions"].append({
                    "q_no": q_counter,
                    "type": q.qtype,
                    "difficulty": q.difficulty,
                    "question": q.question_text,
                    "options": q.options,
                    "answer": q.answer,
                    "marks": marks,
                    "explanation": q.explanation,
                })
                answer_key.append({
                    "q_no": q_counter,
                    "node_id": nid,
                    "type": q.qtype,
                    "answer": q.answer,
                    "marks": marks,
                })
                q_counter += 1
            paper_nodes.append(node_block)

        return {
            "seed": self._seed,
            "total_questions": q_counter - 1,
            "nodes": paper_nodes,
            "answer_key": answer_key,
        }

    def verify_paper(self, paper: Dict) -> Tuple[bool, List[str]]:
        """
        Verify a paper dict for internal consistency.

        Returns (passed, list of error strings).
        """
        errors: List[str] = []
        expected_qno = 1
        for node_block in paper["nodes"]:
            for q in node_block["questions"]:
                if q["q_no"] != expected_qno:
                    errors.append(
                        f"Question number gap: expected {expected_qno}, "
                        f"got {q['q_no']} in node {node_block['node_id']}"
                    )
                if not q["answer"]:
                    errors.append(
                        f"Empty answer at Q{q['q_no']} ({node_block['node_id']})"
                    )
                if q["type"] == QType.MCQ.value:
                    if not q.get("options") or len(q["options"]) != 4:
                        errors.append(f"MCQ Q{q['q_no']} must have 4 options")
                    if q["answer"] not in (q.get("options") or []):
                        errors.append(
                            f"MCQ Q{q['q_no']}: answer not in options"
                        )
                expected_qno += 1
        actual_total = sum(
            len(nb["questions"]) for nb in paper["nodes"]
        )
        if actual_total != paper["total_questions"]:
            errors.append(
                f"total_questions mismatch: declared {paper['total_questions']}, "
                f"actual {actual_total}"
            )
        if len(paper["answer_key"]) != paper["total_questions"]:
            errors.append("answer_key length mismatch")
        return len(errors) == 0, errors

    # ── helpers ───────────────────────────────────────────────────────────────

    def _subseed(self, node_id: str) -> int:
        """
        Derive a per-node integer from (seed, node_id).
        Uses SHA-256 for a uniform spread.
        """
        raw = f"{self._seed}|{node_id}|class3-geo"
        h = hashlib.sha256(raw.encode()).hexdigest()
        return int(h[:12], 16)  # 48-bit integer


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 7 : Convenience function
# ─────────────────────────────────────────────────────────────────────────────

def generate_questions(
    seed: int = 2025,
    questions_per_node: Optional[Dict[str, int]] = None,
) -> Dict:
    """
    One-call entry point: build and verify a paper.

    Returns the paper dict. Raises AssertionError if verification fails.
    """
    gen = Class3GeoQuestionGenerator(seed=seed)
    paper = gen.build_paper(seed=seed,
                            questions_per_node=questions_per_node)
    ok, errors = gen.verify_paper(paper)
    if not ok:
        raise AssertionError(f"Paper verification failed: {errors}")
    return paper


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 8 : Pretty-print helpers (step-by-step output)
# ─────────────────────────────────────────────────────────────────────────────

def print_paper(paper: Dict) -> None:
    """Print a readable version of the paper."""
    print(f"{'='*70}")
    print(f"  CLASS 3 GEOGRAPHY — QUESTION PAPER")
    print(f"  Seed: {paper['seed']}   Total Questions: {paper['total_questions']}")
    print(f"{'='*70}\n")
    for node_block in paper["nodes"]:
        print(f"  ── {node_block['section']} │ {node_block['title']} "
              f"[{node_block['difficulty']}] ──")
        for q in node_block["questions"]:
            print(f"\n  Q{q['q_no']}. [{q['type'].upper()}] "
                  f"[{q['difficulty']}] [{q['marks']} mark(s)]")
            print(f"      {q['question']}")
            if q.get("options"):
                for i, opt in enumerate(q["options"]):
                    marker = "✓" if opt == q["answer"] else " "
                    print(f"        [{chr(65+i)}] {opt}  {marker}")
            else:
                print(f"      Answer: {q['answer']}")
            print(f"      Explanation: {q['explanation']}")
        print()


def print_answer_key(paper: Dict) -> None:
    """Print a compact answer key."""
    print(f"{'─'*50}")
    print(f"  ANSWER KEY  (seed={paper['seed']})")
    print(f"{'─'*50}")
    for entry in paper["answer_key"]:
        print(f"  Q{entry['q_no']:02d}  [{entry['type']:12s}]  "
              f"→ {entry['answer']}  ({entry['marks']}m)")
    print(f"{'─'*50}")


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 9 : Verification and demonstration (runs only when executed)
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    SEED = 2025
    print(f"\n{'#'*70}")
    print(f"  Class 3 Geography — Deterministic Question Generator")
    print(f"  Seed: {SEED}")
    print(f"{'#'*70}\n")

    # ── Step 1: Generate paper ────────────────────────────────────────────────
    print("Step 1 ▸ Generating question paper ...")
    paper = generate_questions(seed=SEED)
    print(f"  ✓ Generated {paper['total_questions']} questions across "
          f"{len(paper['nodes'])} nodes.\n")

    # ── Step 2: Verify paper ─────────────────────────────────────────────────
    print("Step 2 ▸ Running verification ...")
    gen = Class3GeoQuestionGenerator(seed=SEED)
    ok, errors = gen.verify_paper(paper)
    if ok:
        print("  ✓ Paper passed all consistency checks.\n")
    else:
        print("  ✗ Verification errors:")
        for e in errors:
            print(f"    • {e}")
        raise SystemExit(1)

    # ── Step 3: Cross-node diversity check ────────────────────────────────────
    print("Step 3 ▸ Checking question-type distribution across nodes ...")
    type_counts: Dict[str, int] = {}
    node_qcounts: Dict[str, int] = {}
    for nb in paper["nodes"]:
        nid = nb["node_id"]
        node_qcounts[nid] = node_qcounts.get(nid, 0) + len(nb["questions"])
        for q in nb["questions"]:
            qt = q["type"]
            key = f"{nid}|{qt}"
            type_counts[key] = type_counts.get(key, 0) + 1
    for nid, cnt in node_qcounts.items():
        print(f"  {nid}: {cnt} questions  "
              f"({NODES[nid].difficulty}, {NODES[nid].cognitive_level})")
    print()

    # ── Step 4: Determinism check — regenerate with same seed ─────────────────
    print("Step 4 ▸ Determinism check (regenerate with same seed) ...")
    paper2 = generate_questions(seed=SEED)
    # Compare answer texts
    match = all(
        e1["answer"] == e2["answer"]
        for e1, e2 in zip(paper["answer_key"], paper2["answer_key"])
    )
    print(f"  {'✓' if match else '✗'} Answers are "
          f"{'identical' if match else 'DIFFERENT'} — "
          f"generator is {'deterministic' if match else 'NOT deterministic'}.\n")

    # ── Step 5: Print paper ───────────────────────────────────────────────────
    print_paper(paper)
    print_answer_key(paper)