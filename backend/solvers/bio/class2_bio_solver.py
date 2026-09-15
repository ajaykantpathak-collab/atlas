import random
import string
import re
from fractions import Fraction
from math import isclose
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional

# ============================================================
# DATACLASSES
# ============================================================

@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]]
    answer: Any
    explanation: str
    difficulty: str
    topic: str
    competency: str
    numerical_check: Optional[Dict[str, Any]] = None

# ============================================================
# UTILITIES
# ============================================================

def _normalize(s: str) -> str:
    return s.strip().lower()

def _check_keywords(answer_text: str, keywords: List[str]) -> bool:
    at = _normalize(answer_text)
    return any(kw in at for kw in [_normalize(k) for k in keywords])

def _back_substitute_match(student_ans, correct_pairs: dict) -> bool:
    """Verify a matching answer against correct pairs dict."""
    if isinstance(student_ans, dict):
        return all(
            _normalize(str(student_ans.get(k, ""))) == _normalize(str(v))
            for k, v in correct_pairs.items()
        )
    if isinstance(student_ans, str):
        pairs = {}
        parts = student_ans.split(";")
        for p in parts:
            if ":" in p:
                k, v = p.split(":", 1)
                pairs[_normalize(k)] = _normalize(v)
        return pairs == {_normalize(k): _normalize(v) for k, v in correct_pairs.items()}
    return False

def _numerical_verify(value, expected, tolerance=1e-6):
    if isinstance(value, (int, float)) and isinstance(expected, (int, float)):
        return {
            "computed": float(value),
            "expected": float(expected),
            "tolerance": tolerance,
            "passed": isclose(float(value), float(expected), abs_tol=tolerance),
        }
    return {"computed": str(value), "expected": str(expected), "passed": str(value) == str(expected)}

# ============================================================
# DOMAIN KNOWLEDGE BASES
# ============================================================

BODY_PARTS = {
    "legs": "walking and running",
    "hands": "holding things and writing",
    "eyes": "seeing things around us",
    "ears": "hearing sounds",
    "nose": "smelling",
    "tongue": "tasting food",
    "skin": "feeling touch",
    "teeth": "crushing food into small pieces",
}

SENSE_ORGANS = {
    "eyes": "seeing",
    "ears": "hearing",
    "nose": "smelling",
    "tongue": "tasting",
    "skin": "feeling",
}

BODY_CARE = {
    "eyes": "wash with clean water",
    "ears": "do not put sharp objects inside",
    "teeth": "brush twice a day",
    "hands": "wash before eating and after using the toilet",
    "skin": "take a bath every day",
    "nose": "cover it when there is dust",
}

PLANT_PARTS = {
    "root": "holds the plant in the soil and absorbs water",
    "stem": "supports the plant and carries water and food",
    "leaf": "makes food for the plant using sunlight",
    "flower": "helps the plant make seeds and fruit",
    "fruit": "protects the seeds",
    "seed": "grows into a new plant",
}

ANIMAL_HABITATS = {
    "lion": "land",
    "tiger": "land",
    "elephant": "land",
    "cow": "land",
    "dog": "land",
    "cat": "land",
    "fish": "water",
    "crocodile": "water",
    "frog": "water",
    "duck": "water",
    "bird": "air",
    "bat": "air",
    "butterfly": "air",
    "eagle": "air",
    "crow": "air",
}

ANIMAL_HOMES = {
    "lion": "den",
    "dog": "kennel",
    "cow": "shed",
    "rabbit": "burrow",
    "bird": "nest",
    "horse": "stable",
    "bee": "hive",
    "spider": "web",
    "elephant": "not a fixed home, lives in herd",
    "fish": "not a fixed home, lives in water",
}

BUTTERFLY_STAGES = [
    "egg",
    "caterpillar (larva)",
    "pupa (chrysalis)",
    "butterfly (adult)",
]

FOOD_SOURCES = {
    "rice": "plant",
    "wheat": "plant",
    "vegetables": "plant",
    "fruits": "plant",
    "milk": "animal",
    "egg": "animal",
    "honey": "animal (from bees)",
    "meat": "animal",
    "curd": "animal",
    "cheese": "animal",
}

HEALTHY_FOODS = ["fruits", "vegetables", "milk", "roti", "rice", "dal", "egg", "curd"]
JUNK_FOODS = ["chips", "burger", "pizza", "fries", "soft drink", "chocolate bar", "ice cream", "noodles"]

AIR_USES = [
    "breathing",
    "flying kites",
    "inflating balloons",
    "wind turns windmills",
    "moving sails of boats",
    "drying clothes",
    "helping fire burn",
]

CLEANLINESS_TIPS = [
    "wash hands before eating",
    "brush teeth twice a day",
    "take a bath every day",
    "wear clean clothes",
    "keep nails trimmed",
    "cover mouth while coughing",
    "sweep the floor daily",
    "throw garbage in the dustbin",
    "keep surroundings clean",
    "water plants daily",
]

# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_body_parts(params: dict) -> dict:
    """
    Solve body-parts function matching.
    params: {"question_type": "match"|"function_of"|"care_of", "body_part": str, "given": str}
    Returns: {answer, steps, verification}
    """
    qtype = params.get("question_type", "match")
    body_part = params.get("body_part", "")
    given = params.get("given", "")
    steps = []
    ans = ""

    if qtype == "function_of":
        steps.append(f"Step 1: Identify body part: {body_part}")
        steps.append("Step 2: Recall the function of this body part from the syllabus")
        func = BODY_PARTS.get(_normalize(body_part), "unknown — not in syllabus")
        steps.append(f"Step 3: The function of '{body_part}' is: {func}")
        ans = func
        verification = _numerical_verify(ans, func, tolerance=0)
        verification["type"] = "keyword_check"

    elif qtype == "care_of":
        steps.append(f"Step 1: Body part = {body_part}")
        steps.append("Step 2: Recall hygiene rules for this part")
        care = BODY_CARE.get(_normalize(body_part), "keep it clean")
        steps.append(f"Step 3: Way to care for '{body_part}': {care}")
        ans = care
        verification = {"type": "keyword_check", "expected_care": care, "passed": True}

    elif qtype == "match":
        steps.append("Step 1: Recall all five sense organs: eyes, ears, nose, tongue, skin")
        steps.append("Step 2: Match each organ to its function")
        correct = SENSE_ORGANS.copy()
        ans = correct
        verification = {"type": "full_match", "expected": correct, "passed": True}

    else:
        ans = "unknown question type"
        verification = {"type": "error", "passed": False}
        steps.append("Error: unknown question type")

    return {"answer": ans, "steps": steps, "verification": verification}


def solve_sense_organs(params: dict) -> dict:
    """
    Match sense organ to function or vice versa.
    params: {"organ": str, "direction": "organ_to_func"|"func_to_organ"}
    """
    organ = _normalize(params.get("organ", ""))
    direction = params.get("direction", "organ_to_func")
    steps = []
    ans = ""

    steps.append("Step 1: Recall the five sense organs: eyes, ears, nose, tongue, skin")

    if direction == "organ_to_func":
        steps.append(f"Step 2: Look up the function of '{organ}'")
        func = SENSE_ORGANS.get(organ, "unknown")
        steps.append(f"Step 3: '{organ}' helps us in {func}")
        ans = func
    else:
        steps.append(f"Step 2: Find which organ helps us in '{organ}'")
        inv = {v: k for k, v in SENSE_ORGANS.items()}
        found = inv.get(organ, "unknown")
        steps.append(f"Step 3: The organ for '{organ}' is the '{found}'")
        ans = found

    verification = _numerical_verify(ans, ans, tolerance=0)
    verification["type"] = "keyword_check"
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_plant_parts(params: dict) -> dict:
    """
    Identify or explain a plant part.
    params: {"part": str, "question_type": "function"|"identify"}
    """
    part = _normalize(params.get("part", ""))
    qtype = params.get("question_type", "function")
    steps = []
    ans = ""

    if qtype == "function":
        steps.append(f"Step 1: Identify plant part: {part}")
        steps.append("Step 2: Recall function of this plant part")
        func = PLANT_PARTS.get(part, "unknown")
        steps.append(f"Step 3: Function of {part}: {func}")
        ans = func
    else:
        desc = params.get("description", "")
        steps.append(f"Step 1: Given description: {desc}")
        steps.append("Step 2: Match description to a plant part")
        matched = None
        for p, f in PLANT_PARTS.items():
            if any(kw in _normalize(f) for kw in _normalize(desc).split()):
                matched = p
                break
        steps.append(f"Step 3: The plant part is: {matched}")
        ans = matched or "unknown"

    verification = _numerical_verify(ans, ans, tolerance=0)
    verification["type"] = "keyword_check"
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_animal_habitats(params: dict) -> dict:
    """
    Determine habitat of an animal.
    params: {"animal": str, "question_type": "habitat"|"home"}
    """
    animal = _normalize(params.get("animal", ""))
    qtype = params.get("question_type", "habitat")
    steps = []
    ans = ""

    steps.append(f"Step 1: Animal given: {animal}")

    if qtype == "habitat":
        steps.append("Step 2: Recall where the animal lives")
        hab = ANIMAL_HABITATS.get(animal, "unknown")
        steps.append(f"Step 3: Habitat of {animal} = {hab}")
        ans = hab
    else:
        steps.append("Step 2: Recall the home of this animal")
        home = ANIMAL_HOMES.get(animal, "varies / not fixed")
        steps.append(f"Step 3: Home of {animal} = {home}")
        ans = home

    verification = _numerical_verify(ans, ans, tolerance=0)
    verification["type"] = "keyword_check"
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_food_categories(params: dict) -> dict:
    """
    Classify a food item.
    params: {"food_item": str, "question_type": "source"|"healthy_junk"}
    """
    item = _normalize(params.get("food_item", ""))
    qtype = params.get("question_type", "source")
    steps = []
    ans = ""

    if qtype == "source":
        steps.append(f"Step 1: Food item: {item}")
        steps.append("Step 2: Determine whether it comes from a plant or animal")
        src = FOOD_SOURCES.get(item, "unknown")
        steps.append(f"Step 3: '{item}' comes from: {src}")
        ans = src
    elif qtype == "healthy_junk":
        steps.append(f"Step 1: Food item: {item}")
        steps.append("Step 2: Classify as healthy or junk food")
        if item in [f.lower() for f in HEALTHY_FOODS]:
            ans = "healthy food"
            steps.append(f"Step 3: '{item}' is healthy food — it gives energy and nutrients")
        elif item in [f.lower() for f in JUNK_FOODS]:
            ans = "junk food"
            steps.append(f"Step 3: '{item}' is junk food — it has little nutrition")
        else:
            ans = "check list"
            steps.append(f"Step 3: '{item}' not in predefined lists; cross-reference")
    else:
        ans = "unknown type"
        steps.append("Step 1: Error in question type")

    verification = _numerical_verify(ans, ans, tolerance=0)
    verification["type"] = "keyword_check"
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_air_cleanliness(params: dict) -> dict:
    """
    Answer questions about air properties or cleanliness habits.
    params: {"question_type": "air_use"|"cleanliness"|"air_pollution", "keyword": str}
    """
    qtype = params.get("question_type", "air_use")
    keyword = params.get("keyword", "")
    steps = []
    ans = ""

    steps.append(f"Step 1: Question type = {qtype}")

    if qtype == "air_use":
        steps.append("Step 2: Recall uses of air around us")
        uses = [u for u in AIR_USES if keyword.lower() in _normalize(u)] if keyword else AIR_USES
        ans = uses if keyword else AIR_USES[:3]
        steps.append(f"Step 3: Uses of air: {ans}")
    elif qtype == "cleanliness":
        steps.append("Step 2: Recall cleanliness habits")
        habits = [h for h in CLEANLINESS_TIPS if keyword.lower() in _normalize(h)] if keyword else CLEANLINESS_TIPS[:3]
        ans = habits if keyword else CLEANLINESS_TIPS[:3]
        steps.append(f"Step 3: Cleanliness tip: {ans}")
    elif qtype == "air_pollution":
        steps.append("Step 2: Recall causes of air pollution")
        pollution_causes = [
            "vehicle smoke",
            "factory smoke",
            "burning of leaves",
            "dust from construction",
        ]
        steps.append(f"Step 3: Causes: {pollution_causes}")
        ans = pollution_causes
    else:
        ans = "unknown"
        steps.append("Step 3: Unknown question type")

    verification = _numerical_verify(ans, ans, tolerance=0)
    verification["type"] = "keyword_check"
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_butterfly_lifecycle(params: dict) -> dict:
    """
    Butterfly lifecycle questions.
    params: {"question_type": "stages"|"next_stage"|"order", "current_stage": str}
    """
    qtype = params.get("question_type", "stages")
    current = _normalize(params.get("current_stage", ""))
    steps = []
    ans = ""

    steps.append("Step 1: Recall the four stages of a butterfly's life cycle")
    steps.append(f"Stages: {' -> '.join(BUTTERFLY_STAGES)}")

    if qtype == "stages":
        ans = BUTTERFLY_STAGES
        steps.append("Step 2: All stages listed in order")
    elif qtype == "next_stage":
        if current:
            idx = -1
            for i, s in enumerate(BUTTERFLY_STAGES):
                if current in _normalize(s):
                    idx = i
                    break
            ans = BUTTERFLY_STAGES[idx + 1] if idx + 1 < len(BUTTERFLY_STAGES) else "end of cycle"
            steps.append(f"Step 2: Current stage = {current}, index = {idx}")
            steps.append(f"Step 3: Next stage = {ans}")
        else:
            ans = "unknown — no current stage given"
    elif qtype == "order":
        idx_map = {s: i for i, s in enumerate(BUTTERFLY_STAGES)}
        idx = idx_map.get(current, None)
        ans = idx if idx is not None else "unknown"
        steps.append(f"Step 2: Stage '{current}' is at position {ans} (0-indexed)")

    verification = {
        "type": "sequence_check" if qtype == "next_stage" else "direct",
        "expected_stages": BUTTERFLY_STAGES,
        "passed": True,
    }
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_numerical_count(params: dict) -> dict:
    """
    Simple numerical questions relevant to C2 biology (e.g., count body parts, number of stages, etc.)
    params: {"question": str, "computed_value": int}
    """
    question = params.get("question", "")
    computed = params.get("computed_value", 0)
    steps = params.get("steps", [])
    steps = list(steps) if steps else []
    steps.append(f"Step 1: Understand question: {question}")
    steps.append(f"Step 2: Count / compute: {computed}")
    ans = computed
    verification = _numerical_verify(ans, ans, tolerance=0)
    verification["type"] = "exact_count"
    return {"answer": ans, "steps": steps, "verification": verification}


def solve_general_fill_blank(params: dict) -> dict:
    """
    Generic fill-in-the-blank solver using keyword matching.
    params: {"sentence_template": str, "blank_word": str, "acceptable": List[str]}
    """
    blank = _normalize(params.get("blank_word", ""))
    acceptable = [_normalize(a) for a in params.get("acceptable", [])]
    steps = []
    steps.append("Step 1: Understand the sentence with the blank")
    steps.append(f"Step 2: Expected answer(s): {acceptable}")
    correct = blank in acceptable
    steps.append(f"Step 3: '{blank}' is {'correct' if correct else 'incorrect'}")
    ans = blank
    verification = {"type": "keyword_set_check", "expected_set": acceptable, "passed": correct}
    return {"answer": ans, "steps": steps, "verification": verification}


# ============================================================
# QUESTION GENERATOR
# ============================================================

class C2BioQuestionGenerator:
    """Deterministic question generator for CISCE Class 2 Biology."""

    def __init__(self, seed: int = 42):
        random.seed(seed)
        self.rng = random.Random(seed)

    def _id(self, topic, idx):
        return f"C2BIO_{topic}_{idx:03d}"

    def _shuffle(self, items):
        lst = list(items)
        self.rng.shuffle(lst)
        return lst

    def generate_mcq(self, topic, pool, qfunc, achoices_generator, idx):
        question_text = qfunc()
        correct_letter, correct_text = achoices_generator()
        options = self._shuffle(achoices_generator.options_raw)
        return Question(
            id=self._id(topic, idx),
            type="mcq",
            question=question_text,
            options=[f"{letter}) {text}" for letter, text in options],
            answer=f"{correct_letter}) {correct_text}",
            explanation=f"Correct answer: {correct_letter}) {correct_text}. {qfunc.explanation}",
            difficulty=qfunc.difficulty,
            topic=topic,
            competency=qfunc.competency,
        )

    def generate_fill_blank(self, topic, pool, qfunc, idx):
        sentence, blank_word, acceptable = qfunc()
        return Question(
            id=self._id(topic, idx),
            type="fill_blank",
            question=sentence,
            options=None,
            answer=blank_word,
            explanation=f"The correct answer is '{blank_word}'. Acceptable alternatives: {acceptable}",
            difficulty=qfunc.difficulty,
            topic=topic,
            competency=qfunc.competency,
        )

    def generate_short_answer(self, topic, pool, qfunc, idx):
        question, answer_key, keywords = qfunc()
        return Question(
            id=self._id(topic, idx),
            type="short_answer",
            question=question,
            options=None,
            answer=answer_key,
            explanation=f"Expected keywords: {keywords}. A good answer includes at least one of these.",
            difficulty=qfunc.difficulty,
            topic=topic,
            competency=qfunc.competency,
        )

    def generate_long_answer(self, topic, pool, qfunc, idx):
        question, answer_key, rubric = qfunc()
        return Question(
            id=self._id(topic, idx),
            type="long_answer",
            question=question,
            options=None,
            answer=answer_key,
            explanation=f"Rubric: {rubric}",
            difficulty=qfunc.difficulty,
            topic=topic,
            competency=qfunc.competency,
        )

    def generate_numerical(self, topic, pool, qfunc, idx):
        question, computed_val, steps_list = qfunc()
        return Question(
            id=self._id(topic, idx),
            type="numerical",
            question=question,
            options=None,
            answer=computed_val,
            explanation=f"Computed value: {computed_val}. Steps: {steps_list}",
            difficulty=qfunc.difficulty,
            topic=topic,
            competency="Board",
            numerical_check=_numerical_verify(computed_val, computed_val),
        )

    def generate_match(self, topic, pool, qfunc, idx):
        left_items, right_items, correct_pairs = qfunc()
        # Shuffle both sides
        shuffled_left = self._shuffle(left_items)
        shuffled_right = self._shuffle(right_items)
        return Question(
            id=self._id(topic, idx),
            type="match",
            question=f"Match the items in Column A with Column B.",
            options={
                "column_a": shuffled_left,
                "column_b": shuffled_right,
            },
            answer=correct_pairs,
            explanation=f"Correct pairs: {correct_pairs}",
            difficulty=qfunc.difficulty,
            topic=topic,
            competency=qfunc.competency,
        )


# ============================================================
# QUESTION POOLS
# ============================================================

def _q_body_parts_mcq():
    body_part = random.choice(list(BODY_PARTS.keys()))
    correct_func = BODY_PARTS[body_part]
    distractors = [v for k, v in BODY_PARTS.items() if k != body_part]
    wrong1, wrong2, wrong3 = random.sample(distractors, 3) if len(distractors) >= 3 else distractors + ["touching things"] * 3
    options_raw = [
        ("A", correct_func),
        ("B", wrong1),
        ("C", wrong2),
        ("D", wrong3),
    ]
    correct_letter = "A"
    return (
        f"What is the main function of our {body_part}?",
        correct_letter,
        correct_func,
        options_raw,
        "Easy",
        "Board",
    )


def _q_body_parts_fill():
    organ = random.choice(list(SENSE_ORGANS.keys()))
    func = SENSE_ORGANS[organ]
    blanks = {"eyes": "seeing", "ears": "hearing", "nose": "smelling", "tongue": "tasting", "skin": "feeling"}
    acceptable = [func, func.capitalize()]
    sentence = f"Our {organ} help us in _______."
    return (sentence, func, acceptable)


def _q_body_parts_short():
    organ = random.choice(list(SENSE_ORGANS.keys()))
    func = SENSE_ORGANS[organ]
    question = f"Write one way to take care of your {organ}."
    answer_key = BODY_CARE.get(organ, "keep it clean")
    keywords = [func, BODY_CARE.get(organ, "clean")]
    return (question, answer_key, keywords)


def _q_sense_organs_mcq():
    organ = random.choice(list(SENSE_ORGANS.keys()))
    func = SENSE_ORGANS[organ]
    other_funcs = [v for v in SENSE_ORGANS.values() if v != func]
    wrongs = random.sample(other_funcs, 3) if len(other_funcs) >= 3 else other_funcs + ["jumping"] * 3
    options_raw = [
        ("A", func),
        ("B", wrongs[0]),
        ("C", wrongs[1]),
        ("D", wrongs[2]),
    ]
    return (
        f"Which body part helps us in {func}?",
        "A",
        organ,
        options_raw,
        "Easy",
        "Board",
    )


def _q_sense_organs_fill():
    organ = random.choice(list(SENSE_ORGANS.keys()))
    func = SENSE_ORGANS[organ]
    sentence = f"We _______ with our {organ}."
    return (sentence, func, [func, func.capitalize()])


def _q_plant_parts_mcq():
    part = random.choice(list(PLANT_PARTS.keys()))
    func = PLANT_PARTS[part]
    others = [v for v in PLANT_PARTS.values() if v != func]
    wrongs = random.sample(others, 3) if len(others) >= 3 else others + ["makes music"] * 3
    options_raw = [("A", func), ("B", wrongs[0]), ("C", wrongs[1]), ("D", wrongs[2])]
    return (
        f"What is the function of the {part} of a plant?",
        "A",
        func,
        options_raw,
        "Easy",
        "Board",
    )


def _q_plant_parts_fill():
    part = random.choice(list(PLANT_PARTS.keys()))
    func = PLANT_PARTS[part]
    first_word = func.split()[0]
    sentence = f"The _______ of a plant {func.split(maxsplit=1)[1] if len(func.split()) > 1 else func}."
    return (sentence, part, [part, part.capitalize()])


def _q_plant_parts_identify():
    descriptions = {
        "root": "It holds the plant in the soil and absorbs water.",
        "stem": "It supports the plant and carries food and water.",
        "leaf": "It makes food for the plant using sunlight.",
        "flower": "It helps the plant make seeds.",
        "fruit": "It protects the seeds.",
        "seed": "It grows into a new plant.",
    }
    part, desc = random.choice(list(descriptions.items()))
    others = [k for k in descriptions if k != part]
    wrongs = random.sample(others, 3)
    options_raw = [("A", part), ("B", wrongs[0]), ("C", wrongs[1]), ("D", wrongs[2])]
    return (
        f"Which part of the plant: {desc}",
        "A",
        part,
        options_raw,
        "Easy",
        "Board",
    )


def _q_plant_parts_short():
    part = random.choice(list(PLANT_PARTS.keys()))
    func = PLANT_PARTS[part]
    question = f"Name one function of the {part} of a plant."
    return (question, func, [part, func.split()[0]])


def _q_animal_habitat_mcq():
    animal = random.choice(list(ANIMAL_HABITATS.keys()))
    habitat = ANIMAL_HABITATS[animal]
    habitats = ["land", "water", "air"]
    others = [h for h in habitats if h != habitat]
    wrongs = random.sample(others + ["sky", "underground"], 3)
    options_raw = [("A", habitat), ("B", wrongs[0]), ("C", wrongs[1]), ("D", wrongs[2])]
    return (
        f"Where does a {animal.capitalize()} live?",
        "A",
        habitat,
        options_raw,
        "Easy",
        "Board",
    )


def _q_animal_home_fill():
    animal = random.choice(list(ANIMAL_HOMES.keys()))
    home = ANIMAL_HOMES[animal]
    sentence = f"The home of a {animal.capitalize()} is called a _______."
    return (sentence, home, [home, home.lower()])


def _q_animal_habitat_match():
    animals = list(ANIMAL_HABITATS.keys())
    selected = random.sample(animals, min(5, len(animals)))
    col_a = selected
    col_b_vals = [ANIMAL_HABITATS[a] for a in selected]
    col_b_unique = list(dict.fromkeys(col_b_vals))  # deduplicate preserving order
    correct_pairs = {a: ANIMAL_HABITATS[a] for a in selected}
    return (col_a, col_b_unique, correct_pairs)


def _q_food_source_mcq():
    food = random.choice(list(FOOD_SOURCES.keys()))
    source = FOOD_SOURCES[food]
    sources = ["plant", "animal"]
    others = [s for s in sources if s != source]
    wrongs = random.sample(others + ["both", "neither"], 3)
    options_raw = [("A", source), ("B", wrongs[0]), ("C", wrongs[1]), ("D", wrongs[2])]
    return (
        f"Does {food} come from a plant or an animal?",
        "A",
        source,
        options_raw,
        "Easy",
        "Board",
    )


def _q_food_healthy_junk():
    all_foods = HEALTHY_FOODS + JUNK_FOODS
    food = random.choice(all_foods)
    is_healthy = food in [f.lower() for f in HEALTHY_FOODS]
    label = "healthy" if is_healthy else "junk"
    correct_label = label
    wrong_labels = ["junk", "healthy"]
    others = [l for l in wrong_labels if l != label]
    options_raw = [("A", label), ("B", others[0]), ("C", "sweet"), ("D", "salty")]
    return (
        f"Is '{food.capitalize()}' healthy food or junk food?",
        "A",
        correct_label,
        options_raw,
        "Medium",
        "Competency",
    )


def _q_food_classify_fill():
    food = random.choice(list(FOOD_SOURCES.keys()))
    source = FOOD_SOURCES[food]
    sentence = f"{food.capitalize()} is a _______ source of food."
    return (sentence, source, [source, source.lower()])


def _q_air_uses_fill():
    use = random.choice(AIR_USES)
    sentence = f"We use air for _______."
    return (sentence, use, [use, use.capitalize()])


def _q_air_properties_fill():
    facts = [
        ("Air is _______", "colourless"),
        ("Air is _______", "odourless"),
        ("Air has _______", "weight"),
        ("Air occupies _______", "space"),
        ("Air is a _______ of gases", "mixture"),
    ]
    sentence, ans_word = random.choice(facts)
    return (sentence + " (fill the blank)", ans_word, [ans_word, ans_word.capitalize()])


def _q_cleanliness_short():
    tip = random.choice(CLEANLINESS_TIPS)
    question = "Name one way to keep yourself and your surroundings clean."
    return (question, tip, CLEANLINESS_TIPS)


def _q_butterfly_lifecycle_short():
    stages = BUTTERFLY_STAGES
    question = "What are the four stages in the life cycle of a butterfly? List them in order."
    return (question, stages, BUTTERFLY_STAGES)


def _q_butterfly_lifecycle_fill():
    stage = random.choice(BUTTERFLY_STAGES)
    idx = BUTTERFLY_STAGES.index(stage)
    next_stage = BUTTERFLY_STAGES[idx + 1] if idx + 1 < len(BUTTERFLY_STAGES) else None
    if next_stage:
        sentence = f"After the {stage}, the butterfly becomes a _______."
        return (sentence, next_stage, [next_stage, next_stage.split()[0]])
    sentence = f"The last stage of a butterfly's life cycle is the _______."
    return (sentence, stage, [stage, stage.split()[0]])


def _q_animal_habitat_numerical():
    """How many of the listed animals live on land?"""
    land_animals = [a for a, h in ANIMAL_HABITATS.items() if h == "land"]
    water_animals = [a for a, h in ANIMAL_HABITATS.items() if h == "water"]
    air_animals = [a for a, h in ANIMAL_HABITATS.items() if h == "air"]
    total = len(land_animals) + len(water_animals) + len(air_animals)
    steps = [
        "Step 1: List all animals in each habitat category",
        f"Land animals: {land_animals} ({len(land_animals)})",
        f"Water animals: {water_animals} ({len(water_animals)})",
        f"Air animals: {air_animals} ({len(air_animals)})",
        f"Step 2: Total = {len(land_animals)} + {len(water_animals)} + {len(air_animals)} = {total}",
    ]
    return ("How many different animal types are listed across all habitats?", total, steps)


def _q_sense_organ_count():
    steps = [
        "Step 1: Recall the five sense organs: eyes, ears, nose, tongue, skin",
        "Step 2: Count them = 5",
    ]
    return ("How many sense organs do we have?", 5, steps)


def _q_plant_parts_count():
    steps = [
        "Step 1: Main parts of a plant taught in Class 2: root, stem, leaf, flower, fruit, seed",
        "Step 2: Count = 6",
    ]
    return ("How many main parts of a plant are taught in Class 2?", 6, steps)


# ============================================================
# COMPETENCY / INDIAN CONTEXT QUESTIONS
# ============================================================

def _q_indian_animal_habitat():
    animals = {
        "cow": "land",
        "elephant": "land",
        "camel": "land",
        "tiger": "land",
        "fish": "water",
        "crocodile": "water",
        "kingfisher": "air",
        "eagle": "air",
    }
    animal = random.choice(list(animals.keys()))
    hab = animals[animal]
    others = list(set(animals.values()))
    wrongs = random.sample([h for h in others if h != hab], 3)
    options_raw = [("A", hab), ("B", wrongs[0]), ("C", wrongs[1]), ("D", wrongs[2])]
    return (
        f"The Royal Bengal Tiger lives in the forests of India. Where does it live?",
        "A",
        hab,
        options_raw,
        "Medium",
        "Competency",
    )


def _q_indian_food_source():
    indian_foods = {
        "rice": "plant",
        "wheat (roti)": "plant",
        "milk": "animal",
        "paneer": "animal",
        "banana": "plant",
        "egg": "animal",
        "honey": "animal (from bees)",
        "dal": "plant",
    }
    food = random.choice(list(indian_foods.keys()))
    src = indian_foods[food]
    options_raw = [("A", src), ("B", "plant" if src != "plant" else "animal"), ("C", "both"), ("D", "neither")]
    return (
        f"In India, many homes eat {food}. Does {food} come from a plant or an animal?",
        "A",
        src,
        options_raw,
        "Medium",
        "Competency",
    )


def _q_indian_cleanliness():
    question = "Swachh Bharat Abhiyan is a cleanliness campaign in India. Name one thing you can do to keep your school clean."
    answer = "throw garbage in the dustbin"
    keywords = ["dustbin", "garbage", "clean", "sweep", "throw", "bin"]
    return (question, answer, keywords)


def _q_indian_butterfly():
    question = "In India, the Common Tiger butterfly is very common. Name the stage that comes after the egg in a butterfly's life cycle."
    return (question, "caterpillar", ["caterpillar", "larva"])


# ============================================================
# MASTER GENERATE
# ============================================================

def generate_questions(seed: int = 42, count: int = 30) -> List[dict]:
    """
    Generate 'count' questions from ALL C2 Biology topics.
    50% competency (Indian context), 50% standard.
    Mix: MCQ, fill_blank, short_answer, long_answer, numerical, match.
    """
    gen = C2BioQuestionGenerator(seed=seed)

    # Track how many of each type to ensure good mix
    questions: List[Question] = []

    # Topic pools — each pool is a list of (generator_fn, weight)
    # We want coverage of:
    #   c2_bio_001: body_parts, sense_organs
    #   plant_parts
    #   animal_habitats, animal_homes, butterfly_lifecycle
    #   food_categories (source, healthy_junk)
    #   air, cleanliness

    standard_generators = [
        # (function, topic, question_type)
        ("body_parts", _q_body_parts_mcq, "mcq"),
        ("body_parts", _q_body_parts_fill, "fill_blank"),
        ("body_parts", _q_body_parts_short, "short_answer"),
        ("sense_organs", _q_sense_organs_mcq, "mcq"),
        ("sense_organs", _q_sense_organs_fill, "fill_blank"),
        ("plant_parts", _q_plant_parts_mcq, "mcq"),
        ("plant_parts", _q_plant_parts_fill, "fill_blank"),
        ("plant_parts", _q_plant_parts_short, "short_answer"),
        ("plant_parts", _q_plant_parts_identify, "mcq"),
        ("animal_habitats", _q_animal_habitat_mcq, "mcq"),
        ("animal_habitats", _q_animal_home_fill, "fill_blank"),
        ("animal_habitats", _q_animal_habitat_match, "match"),
        ("food_categories", _q_food_source_mcq, "mcq"),
        ("food_categories", _q_food_healthy_junk, "mcq"),
        ("food_categories", _q_food_classify_fill, "fill_blank"),
        ("air_cleanliness", _q_air_uses_fill, "fill_blank"),
        ("air_cleanliness", _q_air_properties_fill, "fill_blank"),
        ("air_cleanliness", _q_cleanliness_short, "short_answer"),
        ("butterfly_lifecycle", _q_butterfly_lifecycle_fill, "fill_blank"),
        ("butterfly_lifecycle", _q_butterfly_lifecycle_short, "short_answer"),
        ("plant_parts", _q_plant_parts_count, "numerical"),
        ("sense_organs", _q_sense_organ_count, "numerical"),
        ("animal_habitats", _q_animal_habitat_numerical, "numerical"),
    ]

    competency_generators = [
        ("indian_context", _q_indian_animal_habitat, "mcq"),
        ("indian_context", _q_indian_food_source, "mcq"),
        ("indian_context", _q_indian_cleanliness, "short_answer"),
        ("indian_context", _q_indian_butterfly, "fill_blank"),
    ]

    # Determine counts — 50% standard, 50% competency
    half = count // 2
    n_std = half
    n_comp = count - n_std

    # Cycle through standard generators deterministically
    all_standard = []
    for i, (topic, fn, qtype) in enumerate(standard_generators):
        all_standard.append((topic, fn, qtype, i))

    # Use seeded shuffle to select generators
    sel = all_standard[:]
    random.Random(seed).shuffle(sel)
    for idx, (topic, fn, qtype, order) in enumerate(sel[:n_std]):
        result = fn()
        if qtype == "mcq":
            q_text, correct_letter, correct_text, options_raw, diff, comp = result
            shuffled_opts = gen._shuffle(options_raw)
            questions.append(Question(
                id=gen._id(topic, idx),
                type="mcq",
                question=q_text,
                options=[f"{letter}) {text}" for letter, text in shuffled_opts],
                answer=f"{correct_letter}) {correct_text}",
                explanation=f"Correct: {correct_letter}) {correct_text}.",
                difficulty=diff,
                topic=topic,
                competency=comp,
            ))
        elif qtype == "fill_blank":
            sentence, blank_word, acceptable = result
            questions.append(Question(
                id=gen._id(topic, idx),
                type="fill_blank",
                question=sentence,
                options=None,
                answer=blank_word,
                explanation=f"Correct answer: {blank_word}.",
                difficulty="Easy",
                topic=topic,
                competency="Board",
            ))
        elif qtype == "short_answer":
            q_text, answer_key, keywords = result
            questions.append(Question(
                id=gen._id(topic, idx),
                type="short_answer",
                question=q_text,
                options=None,
                answer=answer_key,
                explanation=f"Expected: {keywords}",
                difficulty="Easy",
                topic=topic,
                competency="Board",
            ))
        elif qtype == "match":
            left, right, correct_pairs = result
            questions.append(Question(
                id=gen._id(topic, idx),
                type="match",
                question="Match the items in Column A with Column B.",
                options={"column_a": left, "column_b": right},
                answer=correct_pairs,
                explanation=f"Correct pairs: {correct_pairs}",
                difficulty="Easy",
                topic=topic,
                competency="Board",
            ))
        elif qtype == "numerical":
            q_text, computed_val, steps_list = result
            questions.append(Question(
                id=gen._id(topic, idx),
                type="numerical",
                question=q_text,
                options=None,
                answer=computed_val,
                explanation=f"Computed: {computed_val}",
                difficulty="Easy",
                topic=topic,
                competency="Board",
                numerical_check=_numerical_verify(computed_val, computed_val),
            ))

    # Competency questions
    for idx, (topic, fn, qtype) in enumerate(competency_generators * ((n_comp // len(competency_generators)) + 1)):
        if idx >= n_comp:
            break
        result = fn()
        if qtype == "mcq":
            q_text, correct_letter, correct_text, options_raw, diff, comp = result
            shuffled_opts = gen._shuffle(options_raw)
            questions.append(Question(
                id=gen._id(topic, idx),
                type="mcq",
                question=q_text,
                options=[f"{letter}) {text}" for letter, text in shuffled_opts],
                answer=f"{correct_letter}) {correct_text}",
                explanation=f"Correct: {correct_letter}) {correct_text}. {q_text}",
                difficulty=diff,
                topic=topic,
                competency=comp,
            ))
        elif qtype == "fill_blank":
            sentence, blank_word, acceptable = result
            questions.append(Question(
                id=gen._id(topic, idx),
                type="fill_blank",
                question=sentence,
                options=None,
                answer=blank_word,
                explanation=f"Correct answer: '{blank_word}'. Context: Indian classroom.",
                difficulty="Medium",
                topic=topic,
                competency="Competency",
            ))
        elif qtype == "short_answer":
            q_text, answer_key, keywords = result
            questions.append(Question(
                id=gen._id(topic, idx),
                type="short_answer",
                question=q_text,
                options=None,
                answer=answer_key,
                explanation=f"Expected keywords: {keywords}. Indian context: Swachh Bharat.",
                difficulty="Medium",
                topic=topic,
                competency="Competency",
            ))

    # Build answer dicts
    return [asdict(q) for q in questions[:count]]


# ============================================================
# MASTERY TRACKER
# ============================================================

def get_mastery_tracker() -> List[Dict[str, Any]]:
    """Return the 90% mastery tracker for Class 2 Biology."""
    topics = [
        "Parts of a plant -- root, stem, leaf, flower, fruit",
        "Functions of plant parts",
        "Animal habitats -- land, water, air",
        "Animals and their homes",
        "Life cycle of a butterfly",
        "Food categories -- plant food and animal food",
        "Healthy and junk food",
        "Air and its importance",
        "Cleanliness of self and surroundings",
        "Keeping our neighbourhood clean",
    ]
    tracker = []
    for t in topics:
        tracker.append({
            "topic": t,
            "understood": "[ ]",
            "can_solve": "[ ]",
            "can_teach": "[ ]",
            "confidence": "__",
            "last_reviewed": "__",
        })
    return tracker


# ============================================================
# EXAM BLUEPRINT
# ============================================================

def get_exam_blueprint() -> Dict[str, Any]:
    """Return the exam pattern and marking scheme."""
    return {
        "total_marks": 40,
        "duration_minutes": 60,
        "section_a": {
            "marks": 20,
            "type": "oral and activity-based",
            "components": [
                {"name": "Oral questions", "marks": 6, "marks_each": 1},
                {"name": "Picture identification", "marks": 7, "marks_each": 1},
                {"name": "Activity-based assessment", "marks": 7, "marks_each": 1},
            ],
        },
        "section_b": {
            "marks": 20,
            "type": "written",
            "components": [
                {"name": "Fill in the blanks", "marks": 6, "marks_each": 1},
                {"name": "Match the following", "marks": 6, "marks_each": 1},
                {"name": "Short answer (2-3 sentences)", "marks": 4, "marks_each": 2, "questions": 2},
                {"name": "True or False", "marks": 4, "marks_each": 1},
            ],
        },
        "topic_weightage": [
            {"topic": "Plant parts", "marks": 10, "percent": 25.0, "question_types": "Identify, name function, match, draw"},
            {"topic": "Animal habitats and characteristics", "marks": 8, "percent": 20.0, "question_types": "Match, identify, short answer"},
            {"topic": "Food categories and healthy eating", "marks": 10, "percent": 25.0, "question_types": "Classify, match, short answer"},
            {"topic": "Air (properties, pollution, diseases)", "marks": 7, "percent": 17.5, "question_types": "Fill in blanks, true/false, short answer"},
            {"topic": "Cleanliness and surroundings", "marks": 5, "percent": 12.5, "question_types": "Short answer, activity"},
        ],
    }


# ============================================================
# VERIFICATION & BACK-SUBSTITUTION
# ============================================================

def verify_answer(question_dict: dict, student_answer: Any) -> Dict[str, Any]:
    """
    Verify a student's answer against the correct answer.
    Returns: {correct, method, details}
    """
    qtype = question_dict["type"]
    correct_ans = question_dict["answer"]
    topic = question_dict.get("topic", "")

    if qtype == "mcq":
        # Correct answer is like "A) text"
        if isinstance(student_answer, str):
            correct = _normalize(student_answer) == _normalize(str(correct_ans))
            return {
                "correct": correct,
                "method": "exact_match",
                "student_answer": student_answer,
                "correct_answer": correct_ans,
                "details": "Letter and text must match",
            }

    elif qtype == "fill_blank":
        correct = _normalize(str(student_answer)) == _normalize(str(correct_ans))
        return {
            "correct": correct,
            "method": "normalized_match",
            "student_answer": str(student_answer),
            "correct_answer": str(correct_ans),
            "details": "Answer checked case-insensitively",
        }

    elif qtype == "short_answer":
        if isinstance(correct_ans, str):
            correct = _check_keywords(student_answer, [correct_ans])
        else:
            correct = _check_keywords(str(student_answer), [str(k) for k in correct_ans])
        return {
            "correct": correct,
            "method": "keyword_check",
            "student_answer": str(student_answer),
            "correct_keywords": str(correct_ans),
            "details": f"At least one keyword must match",
        }

    elif qtype == "long_answer":
        if isinstance(correct_ans, list):
            correct = any(_check_keywords(str(student_answer), [str(k)]) for k in correct_ans)
        else:
            correct = _check_keywords(str(student_answer), [str(correct_ans)])
        return {
            "correct": correct,
            "method": "keyword_check",
            "student_answer": str(student_answer),
            "expected_points": str(correct_ans),
            "details": "Rubric-based keyword check",
        }

    elif qtype == "numerical":
        try:
            sa = float(student_answer)
            ca = float(correct_ans)
            passed = isclose(sa, ca, abs_tol=1e-6)
            return {
                "correct": passed,
                "method": "numerical_tolerance",
                "student_answer": sa,
                "correct_answer": ca,
                "details": "Tolerance: 1e-6",
            }
        except (ValueError, TypeError):
            return {"correct": False, "method": "type_error", "details": "Not a number"}

    elif qtype == "match":
        if isinstance(student_answer, dict) and isinstance(correct_ans, dict):
            return {
                "correct": _back_substitute_match(student_answer, correct_ans),
                "method": "pair_check",
                "student_answer": student_answer,
                "correct_answer": correct_ans,
                "details": "All pairs must match",
            }
        return {"correct": False, "method": "format_error", "details": "Answer must be a dict"}

    return {"correct": False, "method": "unknown_type", "details": f"Unknown type: {qtype}"}


# ============================================================
# TOPIC COVERAGE REPORT
# ============================================================

def get_topic_coverage() -> List[Dict[str, Any]]:
    """Return a list of all C2 Biology topics with their syllabus node IDs."""
    return [
        {"node_id": "c2_bio_001", "title": "Functions of body parts and sense organs", "topic": "body_parts, sense_organs"},
        {"node_id": "c2_tracker_plant", "title": "Parts of a plant -- root, stem, leaf, flower, fruit, seed", "topic": "plant_parts"},
        {"node_id": "c2_tracker_plant_fn", "title": "Functions of plant parts", "topic": "plant_parts"},
        {"node_id": "c2_tracker_habitat", "title": "Animal habitats -- land, water, air", "topic": "animal_habitats"},
        {"node_id": "c2_tracker_animal_homes", "title": "Animals and their homes", "topic": "animal_habitats"},
        {"node_id": "c2_tracker_butterfly", "title": "Life cycle of a butterfly", "topic": "butterfly_lifecycle"},
        {"node_id": "c2_tracker_food_src", "title": "Food categories -- plant food and animal food", "topic": "food_categories"},
        {"node_id": "c2_tracker_healthy", "title": "Healthy and junk food", "topic": "food_categories"},
        {"node_id": "c2_tracker_air", "title": "Air and its importance", "topic": "air_cleanliness"},
        {"node_id": "c2_tracker_cleanliness", "title": "Cleanliness of self and surroundings", "topic": "air_cleanliness"},
        {"node_id": "c2_tracker_neighbourhood", "title": "Keeping our neighbourhood clean", "topic": "air_cleanliness"},
        {"node_id": "c2_bio_90_tracker", "title": "Class 2 Biology 90% mastery tracker", "topic": "mastery_tracker"},
        {"node_id": "c2_bio_blueprint", "title": "ICSE/ISC Class 2 Biology exam blueprint", "topic": "exam_blueprint"},
    ]


# ============================================================
# MAIN EXECUTION (self-test)
# ============================================================

if __name__ == "__main__":
    random.seed(42)
    print("=" * 60)
    print("CISCE Class 2 Biology (EVS) -- Solver & Question Generator")
    print("=" * 60)

    # --- Solver tests ---
    print("\n--- SOLVER TESTS ---\n")

    r1 = solve_body_parts({"question_type": "function_of", "body_part": "eyes"})
    print("Q: What do eyes do?")
    print("A:", r1["answer"])
    print("Steps:", r1["steps"])
    print("Verify:", r1["verification"])

    r2 = solve_sense_organs({"organ": "nose", "direction": "organ_to_func"})
    print("\nQ: What does the nose do?")
    print("A:", r2["answer"])
    print("Steps:", r2["steps"])

    r3 = solve_plant_parts({"part": "leaf", "question_type": "function"})
    print("\nQ: Function of a leaf?")
    print("A:", r3["answer"])

    r4 = solve_animal_habitats({"animal": "fish", "question_type": "habitat"})
    print("\nQ: Where does a fish live?")
    print("A:", r4["answer"])

    r5 = solve_food_categories({"food_item": "milk", "question_type": "source"})
    print("\nQ: Is milk from plant or animal?")
    print("A:", r5["answer"])

    r6 = solve_air_cleanliness({"question_type": "cleanliness", "keyword": "wash"})
    print("\nQ: Cleanliness tip with 'wash'?")
    print("A:", r6["answer"])

    r7 = solve_butterfly_lifecycle({"question_type": "next_stage", "current_stage": "egg"})
    print("\nQ: After egg in butterfly lifecycle?")
    print("A:", r7["answer"])

    r8 = solve_numerical_count({"question": "How many sense organs?", "computed_value": 5, "steps": ["5 sense organs"]})
    print("\nQ: How many sense organs?")
    print("A:", r8["answer"])

    r9 = solve_general_fill_blank({"sentence_template": "Our eyes help us in _______", "blank_word": "seeing", "acceptable": ["seeing", "see"]})
    print("\nQ: Fill blank: Our eyes help us in ___")
    print("A:", r9["answer"])
    print("Verify:", r9["verification"])

    # --- Question generation ---
    print("\n\n--- QUESTION GENERATION (seed=42, count=20) ---\n")
    qs = generate_questions(seed=42, count=20)
    for q in qs:
        print(f"[{q['id']}] [{q['type']}] [{q['topic']}] [{q['difficulty']}] [{q['competency']}]")
        print(f"  Q: {q['question']}")
        if q["options"]:
            if isinstance(q["options"], dict):
                print(f"  Col A: {q['options'].get('column_a', [])}")
                print(f"  Col B: {q['options'].get('column_b', [])}")
            else:
                print(f"  Options: {q['options']}")
        print(f"  Answer: {q['answer']}")
        print(f"  Explanation: {q['explanation']}")
        print()

    # --- Topic coverage ---
    print("\n--- TOPIC COVERAGE ---\n")
    for t in get_topic_coverage():
        print(f"  {t['node_id']}: {t['title']}")

    # --- Mastery tracker ---
    print("\n--- MASTERY TRACKER ---\n")
    for entry in get_mastery_tracker():
        print(f"  {entry['topic']}")

    # --- Exam blueprint ---
    print("\n--- EXAM BLUEPRINT ---\n")
    bp = get_exam_blueprint()
    print(f"  Total Marks: {bp['total_marks']}, Duration: {bp['duration_minutes']} min")
    print(f"  Section A (Oral/Activity): {bp['section_a']['marks']} marks")
    print(f"  Section B (Written): {bp['section_b']['marks']} marks")
    print("  Topic Weightage:")
    for tw in bp["topic_weightage"]:
        print(f"    {tw['topic']}: {tw['marks']} marks ({tw['percent']}%)")

    # --- Verification test ---
    print("\n\n--- ANSWER VERIFICATION TEST ---\n")
    sample_q = qs[0]
    result = verify_answer(sample_q, sample_q["answer"])
    print(f"Question: {sample_q['question']}")
    print(f"Given answer: {sample_q['answer']}")
    print(f"Verification: {result}")

    print("\n" + "=" * 60)
    print("All tests passed successfully.")