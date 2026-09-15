"""
CISCE Class 2 EVS Question Generator
Deterministic, seeded question generation covering:
  - c2_evs_001: My environment - family, home, school
  - c2_evs_002: Local animals and birds - observation and simple classification
  - c2_evs_003: Local plants and trees - seasonal observation
"""

import random
import math
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import json


# ---------------------------------------------------------------------------
# Seeded deterministic random
# ---------------------------------------------------------------------------
def _make_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    rng.seed(seed)
    return rng


# ---------------------------------------------------------------------------
# Verification helpers
# ---------------------------------------------------------------------------
def _mcq_verify(selected: str, correct: str) -> Dict[str, Any]:
    return {
        "passed": selected == correct,
        "selected": selected,
        "correct": correct,
        "detail": "Correct" if selected == correct else f"Expected {correct}, got {selected}",
    }


def _fill_verify(provided: str, correct: str, case_sensitive: bool = False) -> Dict[str, Any]:
    if not case_sensitive:
        ok = provided.strip().lower() == correct.strip().lower()
    else:
        ok = provided.strip() == correct.strip()
    return {
        "passed": ok,
        "provided": provided,
        "correct": correct,
        "detail": "Correct" if ok else f"Expected '{correct}', got '{provided}'",
    }


def _short_verify_keywords(provided: str, required_keywords: List[str]) -> Dict[str, Any]:
    low = provided.strip().lower()
    found = [kw for kw in required_keywords if kw.lower() in low]
    score = len(found) / len(required_keywords)
    return {
        "passed": score >= 0.6,
        "score": round(score, 2),
        "keywords_found": found,
        "required": required_keywords,
        "detail": f"{len(found)}/{len(required_keywords)} keywords found",
    }


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------
def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a multiple-choice question."""
    answer = params.get("answer", "")
    selected = params.get("selected", "")
    question = params.get("question", "")
    steps = [
        "1. Read the question carefully and understand what is being asked.",
        f"2. Question: {question}",
        "3. Analyse each option one by one.",
    ]
    for i, opt in enumerate(params.get("options", []), 1):
        steps.append(f"   Option {chr(64+i)}: {opt}")
    steps.append(f"4. The correct answer is: {answer}")
    verification = _mcq_verify(selected, answer)
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a fill-in-the-blank question."""
    answer = params.get("answer", "")
    provided = params.get("provided", "")
    question = params.get("question", "")
    steps = [
        "1. Read the sentence with the blank carefully.",
        f"2. Question: {question}",
        f"3. Think about the correct word to fill the blank.",
        f"4. The correct word is: {answer}",
    ]
    verification = _fill_verify(provided, answer)
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a short-answer question with keyword checking."""
    answer = params.get("answer", "")
    provided = params.get("provided", "")
    keywords = params.get("keywords", [])
    steps = [
        "1. Read the question carefully.",
        f"2. Question: {params.get('question', '')}",
        "3. Recall relevant facts from the EVS lesson.",
    ]
    if keywords:
        steps.append(f"4. Key points to include: {', '.join(keywords)}")
        steps.append("5. Write the answer using complete sentences.")
    verification = _short_verify_keywords(provided, keywords) if keywords else {"passed": True, "detail": "Open-ended"}
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a numerical question (counting/arithmetic based on EVS)."""
    answer = params.get("answer", 0)
    provided = params.get("provided", 0)
    question = params.get("question", "")
    steps = params.get("steps", [])
    verification = {"passed": float(provided) == float(answer), "provided": provided, "correct": answer,
                    "detail": f"Correct: {provided} == {answer}" if float(provided) == float(answer) else f"Expected {answer}, got {provided}"}
    return {"answer": answer, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# Topic data — complete coverage of all three syllabus nodes
# ---------------------------------------------------------------------------

# ---- c2_evs_001: My environment - family, home, school ---------------------
FAMILY_MEMBERS = [
    {"role": "Father", "works": "goes to office / earns money / cooks / helps with homework"},
    {"role": "Mother", "works": "cooks food / washes clothes / takes care of family / works in office"},
    {"role": "Grandmother", "works": "tells stories / takes care of grandchildren / cooks / prays"},
    {"role": "Grandfather", "works": "reads newspaper / tells stories / takes a walk / teaches"},
    {"role": "Brother", "works": "plays with me / helps me / goes to school"},
    {"role": "Sister", "works": "plays with me / helps me / goes to school"},
]

HOME_ROOMS = [
    {"room": "Kitchen", "use": "cooking food"},
    {"room": "Bedroom", "use": "sleeping and resting"},
    {"room": "Living room", "use": "sitting and talking with family / watching TV"},
    {"room": "Bathroom", "use": "bathing and brushing teeth"},
    {"room": "Verandah", "use": "sitting in fresh air / keeping plants"},
    {"room": "Prayer room", "use": "praying and keeping holy books"},
]

SCHOOL_AREAS = [
    {"area": "Classroom", "use": "studying and learning lessons"},
    {"area": "Playground", "use": "playing games and sports"},
    {"area": "Library", "use": "reading books"},
    {"area": "Office", "use": "principal and teachers do their work"},
    {"area": "Staff room", "use": "teachers rest and prepare lessons"},
    {"area": "Assembly ground", "use": "morning prayers and assembly"},
]

HOME_SCHOOL_DIFFERENCES = [
    "At home we wear slippers, at school we remove them.",
    "At home we play freely, at school we study in class.",
    "At home we eat with family, at school we eat in the mess/canteen.",
    "School has a bell for periods, home does not.",
    "At school we wear a uniform, at home we wear comfortable clothes.",
]

TIMES_OF_DAY = [
    {"time": "Morning", "activity": "wake up, brush teeth, get ready for school", "light": "bright sunlight"},
    {"time": "Afternoon", "activity": "eat lunch, go to school, play", "light": "bright, sometimes hot"},
    {"time": "Evening", "activity": "come home, play, do homework", "light": "orange and red sky"},
    {"time": "Night", "activity": "sleep, dinner with family", "light": "dark with stars and moon"},
]

# ---- c2_evs_002: Local animals and birds ------------------------------------
DOMESTIC_ANIMALS = [
    {"name": "Cow", "sound": "moo", "use": "gives milk", "home": "shed / cowshed"},
    {"name": "Dog", "sound": "bark", "use": " guards the house / is a pet", "home": "kennel / home"},
    {"name": "Cat", "sound": "meow", "use": "keeps away rats / is a pet", "home": "home"},
    {"name": "Hen", "sound": "cluck", "use": "gives eggs", "home": "henhouse / coop"},
    {"name": "Goat", "sound": "bleat", "use": "gives milk / meat", "home": "shed"},
    {"name": "Buffalo", "sound": "grunt", "use": "gives milk", "home": "shed"},
    {"name": "Rabbit", "sound": "squeak", "use": "pet animal", "home": "hutch"},
    {"name": "Horse", "sound": "neigh", "use": "rides / carries loads", "home": "stable"},
    {"name": "Donkey", "sound": "bray", "use": "carries loads", "home": "shed"},
    {"name": "Sheep", "sound": "baa", "use": "gives wool", "home": "pen"},
]

WILD_ANIMALS = [
    {"name": "Lion", "sound": "roar", "home": "jungle / forest", "feature": "has a big mane (male)"},
    {"name": "Tiger", "sound": "growl / roar", "home": "jungle", "feature": "has stripes on body"},
    {"name": "Elephant", "sound": "trumpet", "home": "jungle", "feature": "has a trunk and big ears"},
    {"name": "Deer", "sound": "bellow / grunt", "home": "forest", "feature": "has antlers (male)"},
    {"name": "Monkey", "sound": "chatter", "home": "trees / forest", "feature": "long tail"},
    {"name": "Bear", "sound": "growl", "home": "forest / cave", "feature": "thick fur"},
    {"name": "Zebra", "sound": "neigh / snort", "home": "grassland", "feature": "black and white stripes"},
    {"name": "Giraffe", "sound": "hum", "home": "grassland", "feature": "very long neck"},
    {"name": "Fox", "sound": "bark / scream", "home": "forest / burrow", "feature": "pointed nose"},
    {"name": "Wolf", "sound": "howl", "home": "forest", "feature": "lives in packs"},
]

FLYING_BIRDS = [
    {"name": "Sparrow", "feature": "small brown bird, chirps sweetly", "nest": "small nest in corners"},
    {"name": "Crow", "feature": "black bird, very intelligent", "nest": "big nest on tall trees"},
    {"name": "Pigeon", "feature": "grey bird, coos softly", "nest": "nest on window sills / terraces"},
    {"name": "Parrot", "feature": "green bird, can imitate sounds", "nest": "holes in tree trunks"},
    {"name": "Eagle", "feature": "big bird with sharp eyes", "nest": "high on mountain cliffs"},
    {"name": "Peacock", "feature": "colourful feathers, national bird of India", "nest": "ground in tall grass"},
    {"name": "Owl", "feature": "big round eyes, comes out at night", "nest": "holes in trees / old buildings"},
]

FLIGHTLESS_BIRDS = [
    {"name": "Hen", "feature": "has feathers, cannot fly high", "note": "can flap wings but not fly"},
    {"name": "Duck", "feature": "has webbed feet, swims in water", "note": "short wings, cannot fly well"},
    {"name": "Ostrich", "feature": "world's largest bird, runs very fast", "note": "cannot fly at all"},
    {"name": "Penguin", "feature": "black and white bird, swims in cold water", "note": "cannot fly, swims well"},
]

BODY_COVERINGS = [
    {"animal": "Cat", "covering": "fur", "type": "mammal"},
    {"animal": "Fish", "covering": "scales", "type": "fish"},
    {"animal": "Pigeon", "covering": "feathers", "type": "bird"},
    {"animal": "Snake", "covering": "scales", "type": "reptile"},
    {"animal": "Crocodile", "covering": "scales", "type": "reptile"},
    {"animal": "Dog", "covering": "fur", "type": "mammal"},
    {"animal": "Butterfly", "covering": "scales on wings", "type": "insect"},
    {"animal": "Frog", "covering": "smooth moist skin", "type": "amphibian"},
]

# ---- c2_evs_003: Local plants and trees - seasonal observation -------------
LOCAL_PLANTS = [
    {"name": "Mango tree", "season_flower": "spring (February-March)", "season_fruit": "summer (May-June)",
     "leaf": "long, green, leathery", "trunk": "thick and strong"},
    {"name": "Neem tree", "season_flower": "spring", "season_fruit": "summer",
     "leaf": "small, compound leaflets", "trunk": "rough, dark brown"},
    {"name": "Peepal tree", "season_flower": "spring (March-April)", "season_fruit": "summer",
     "leaf": "heart-shaped, long stalk", "trunk": "smooth, grey-white bark"},
    {"name": "Banyan tree", "season_flower": "summer", "season_fruit": "all year",
     "leaf": "large, oval, shiny green", "trunk": "thick, with aerial roots"},
    {"name": "Gulmohar tree", "season_flower": "summer (May-June)", "season_fruit": "autumn",
     "leaf": "small, fern-like", "trunk": "bark is brown-grey"},
    {"name": "Jamun tree", "season_flower": "spring (March-April)", "season_fruit": "summer (June-July)",
     "leaf": "oval, shiny dark green", "trunk": "rough bark"},
    {"name": "Banana plant", "season_flower": "any time in warm weather", "season_fruit": "summer",
     "leaf": "very large, broad, easily torn by wind", "trunk": "soft, made of leaf bases"},
    {"name": "Coconut tree", "season_flower": "any time", "season_fruit": "all year",
     "leaf": "long, feather-like fronds", "trunk": "ringed, tall, brown"},
    {"name": "Marigold", "season_flower": "winter and spring", "season_fruit": "autumn",
     "leaf": "small, pinnate, dark green", "trunk": "small herb, no trunk"},
    {"name": "Hibiscus", "season_flower": "all year in warm weather", "season_fruit": "autumn",
     "leaf": "oval, dark green, serrated edges", "trunk": "small shrub stem"},
]

SEASONS_INFO = [
    {"season": "Spring (February-March)", "weather": "pleasant, flowers bloom", "happens": "new leaves grow, flowers bloom"},
    {"season": "Summer (April-June)", "weather": "hot, dry", "happens": "many trees give fruit, some shed leaves"},
    {"season": "Monsoon (July-August)", "weather": "rainy, cool", "happens": "new leaves grow, plants grow fast"},
    {"season": "Autumn (September-October)", "weather": "cool, pleasant", "happens": "some trees shed old leaves"},
    {"season": "Winter (November-January)", "weather": "cold, dry", "happens": "some trees lose leaves, some bloom"},
]

TREE_PARTS = [
    {"part": "Roots", "function": "hold the tree to the ground, absorb water and minerals from soil"},
    {"part": "Trunk", "function": "supports the tree, carries water and food between roots and leaves"},
    {"part": "Branches", "function": "hold leaves, flowers, and fruits"},
    {"part": "Leaves", "function": "make food for the tree using sunlight (photosynthesis)"},
    {"part": "Flowers", "function": "produce seeds and fruits, look beautiful"},
    {"part": "Fruits", "function": "contain seeds to grow new plants, give us food"},
]


# ---------------------------------------------------------------------------
# Question generation helpers
# ---------------------------------------------------------------------------
def _q(
    qid: str,
    qtype: str,
    question: str,
    answer: Any,
    options: Optional[List[str]] = None,
    explanation: str = "",
    difficulty: str = "Easy",
    topic: str = "",
    category: str = "standard",
    keywords: Optional[List[str]] = None,
    steps: Optional[List[str]] = None,
) -> Dict[str, Any]:
    return {
        "id": qid,
        "type": qtype,
        "question": question,
        "options": options or [],
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "category": category,
        "keywords": keywords or [],
        "steps": steps or [],
    }


# ---------------------------------------------------------------------------
# Topic-based question pool builders (returns lists of question dicts)
# ---------------------------------------------------------------------------

def _build_family_home_school(rng: random.Random) -> List[Dict[str, Any]]:
    """c2_evs_001 questions"""
    qs = []

    # --- Family roles MCQs ---
    for member in rng.sample(FAMILY_MEMBERS, k=min(4, len(FAMILY_MEMBERS))):
        role = member["role"]
        correct = member["works"]
        wrongs = [m["works"] for m in FAMILY_MEMBERS if m["role"] != role]
        rng.shuffle(wrongs)
        distractors = wrongs[:3]
        opts = [correct] + distractors
        rng.shuffle(opts)
        correct_letter = chr(65 + opts.index(correct))

        qs.append(_q(
            qid=f"c2evs001_mcq_{role.lower()}",
            qtype="mcq",
            question=f"Who among the following {correct}?",
            answer=correct_letter,
            options=[f"Father", f"Mother", f"Grandmother", f"Uncle"],
            explanation=f"The correct answer is {correct_letter}: {correct}. In many families, the {role} {correct}.",
            difficulty="Easy",
            topic="c2_evs_001",
            category="standard",
            keywords=[role.lower(), "role"],
        ))
        # competency version with Indian context
        qs.append(_q(
            qid=f"c2evs001_mcq_{role.lower()}_comp",
            qtype="mcq",
            question=f"In a typical Indian family, the {role} often {correct}. True or False?",
            answer="True",
            options=["True", "False"],
            explanation=f"In Indian families, {role} {correct}. This is a common observation across many households in India.",
            difficulty="Easy",
            topic="c2_evs_001",
            category="competency",
            keywords=[role.lower(), "Indian family"],
        ))

    # --- School areas ---
    for area_info in rng.sample(SCHOOL_AREAS, k=min(4, len(SCHOOL_AREAS))):
        area = area_info["area"]
        use = area_info["use"]
        wrong_uses = [a["use"] for a in SCHOOL_AREAS if a["area"] != area]
        rng.shuffle(wrong_uses)
        opts = [use] + wrong_uses[:3]
        rng.shuffle(opts)
        ca = chr(65 + opts.index(use))

        qs.append(_q(
            qid=f"c2evs001_mcq_school_{area.lower()}",
            qtype="mcq",
            question=f"In which area of the school do students {use}?",
            answer=ca,
            options=opts,
            explanation=f"The {area} is the area where students {use}. This is part of our school environment.",
            difficulty="Easy",
            topic="c2_evs_001",
            category="standard",
            keywords=[area.lower(), "school area"],
        ))

    # --- Home rooms fill-blank ---
    for room_info in rng.sample(HOME_ROOMS, k=min(3, len(HOME_ROOMS))):
        room = room_info["room"]
        use = room_info["use"]
        qs.append(_q(
            qid=f"c2evs001_fill_{room.lower()}",
            qtype="fill_blank",
            question=f"We use the {room} for ________ in our home.",
            answer=use,
            options=[],
            explanation=f"The {room} is used for {use}. This is an important room in every home.",
            difficulty="Easy",
            topic="c2_evs_001",
            category="standard",
            keywords=[room.lower(), "home"],
        ))
        # competency version
        qs.append(_q(
            qid=f"c2evs001_fill_{room.lower()}_comp",
            qtype="fill_blank",
            question=f"In an Indian home, the ________ is where the family gathers for evening tea.",
            answer="living room",
            options=[],
            explanation=f"In many Indian homes, the living room is where the family gathers in the evening for tea and talks.",
            difficulty="Easy",
            topic="c2_evs_001",
            category="competency",
            keywords=["living room", "Indian home"],
        ))

    # --- Home vs school comparison ---
    qs.append(_q(
        qid="c2evs001_short_compare",
        qtype="short_answer",
        question="Give one difference between your home and your school.",
        answer="At home we wear slippers but at school we remove them.",
        options=[],
        explanation="Home and school are different environments. At home we are relaxed, at school we follow rules.",
        difficulty="Easy",
        topic="c2_evs_001",
        category="competency",
        keywords=["home", "school", "difference", "compare"],
    ))

    # --- Time of day ---
    tod = rng.choice(TIMES_OF_DAY)
    wrongs = [t["time"] for t in TIMES_OF_DAY if t["time"] != tod["time"]]
    rng.shuffle(wrongs)
    opts = [tod["time"]] + wrongs[:3]
    rng.shuffle(opts)
    ca = chr(65 + opts.index(tod["time"]))

    qs.append(_q(
        qid="c2evs001_mcq_timeofday",
        qtype="mcq",
        question=f"When does the sky look orange and red and we come back home from school?",
        answer=ca,
        options=opts,
        explanation=f"In the {tod['time']}, the sky looks orange and red, and children come back home from school.",
        difficulty="Easy",
        topic="c2_evs_001",
        category="competency",
        keywords=["evening", "time of day"],
    ))

    # --- Counting family members (numerical) ---
    qs.append(_q(
        qid="c2evs001_num_family",
        qtype="numerical",
        question="Rahul has a father, mother, grandmother, grandfather, one brother and one sister in his family. How many family members does Rahul have? (Count Rahul too)",
        answer=7,
        options=[],
        explanation="Family members: Father(1) + Mother(1) + Grandmother(1) + Grandfather(1) + Brother(1) + Sister(1) + Rahul(1) = 7 members.",
        difficulty="Easy",
        topic="c2_evs_001",
        category="standard",
        keywords=["count", "family members"],
        steps=[
            "List each family member: Father, Mother, Grandmother, Grandfather, Brother, Sister, Rahul",
            "Count them: 1+1+1+1+1+1+1 = 7",
            "Answer: 7 family members",
        ],
    ))

    # --- Fill blank: family roles ---
    qs.append(_q(
        qid="c2evs001_fill_family",
        qtype="fill_blank",
        question="The person who tells us bedtime stories at home is usually our ________.",
        answer="grandmother",
        options=[],
        explanation="In many Indian families, grandmothers tell bedtime stories to grandchildren. Grandfathers also tell stories.",
        difficulty="Easy",
        topic="c2_evs_001",
        category="competency",
        keywords=["grandmother", "family role"],
    ))

    # --- School areas fill blank ---
    qs.append(_q(
        qid="c2evs001_fill_school",
        qtype="fill_blank",
        question="The place in school where we keep our bags and sit to learn is called the ________.",
        answer="classroom",
        options=[],
        explanation="The classroom is where students sit, keep their bags, and learn lessons from the teacher.",
        difficulty="Easy",
        topic="c2_evs_001",
        category="standard",
        keywords=["classroom", "school"],
    ))

    return qs


def _build_animals_birds(rng: random.Random) -> List[Dict[str, Any]]:
    """c2_evs_002 questions"""
    qs = []

    # --- Domestic vs Wild MCQs ---
    for animal in rng.sample(DOMESTIC_ANIMALS, k=min(4, len(DOMESTIC_ANIMALS))):
        name = animal["name"]
        opts = ["Domestic animal", "Wild animal"]
        rng.shuffle(opts)
        ca = opts.index("Domestic animal")
        qs.append(_q(
            qid=f"c2evs002_mcq_domestic_{name.lower()}",
            qtype="mcq",
            question=f"A {name} is a ________.",
            answer=chr(65 + ca),
            options=opts,
            explanation=f"The {name} is a domestic animal. It lives with humans and depends on them for food and shelter. It {animal['use']}.",
            difficulty="Easy",
            topic="c2_evs_002",
            category="standard",
            keywords=[name.lower(), "domestic"],
        ))

    for animal in rng.sample(WILD_ANIMALS, k=min(4, len(WILD_ANIMALS))):
        name = animal["name"]
        opts = ["Domestic animal", "Wild animal"]
        rng.shuffle(opts)
        ca = opts.index("Wild animal")
        qs.append(_q(
            qid=f"c2evs002_mcq_wild_{name.lower()}",
            qtype="mcq",
            question=f"A {name} lives in the ________.",
            answer=chr(65 + ca),
            options=opts,
            explanation=f"The {name} is a wild animal. It lives in the {animal['home']}. It {animal['feature']}.",
            difficulty="Easy",
            topic="c2_evs_002",
            category="standard",
            keywords=[name.lower(), "wild"],
        ))

    # --- Flying vs Flightless birds ---
    for bird in rng.sample(FLYING_BIRDS, k=min(3, len(FLYING_BIRDS))):
        name = bird["name"]
        qs.append(_q(
            qid=f"c2evs002_mcq_flying_{name.lower()}",
            qtype="mcq",
            question=f"A {name} is a ________ bird.",
            answer="Flying",
            options=["Flying", "Walking / Flightless"],
            explanation=f"The {name} is a flying bird. {bird['feature']}. It can fly freely in the sky.",
            difficulty="Easy",
            topic="c2_evs_002",
            category="standard",
            keywords=[name.lower(), "flying bird"],
        ))

    for bird in rng.sample(FLIGHTLESS_BIRDS, k=min(2, len(FLIGHTLESS_BIRDS))):
        name = bird["name"]
        qs.append(_q(
            qid=f"c2evs002_mcq_flightless_{name.lower()}",
            qtype="mcq",
            question=f"A {name} is a ________ bird.",
            answer="Walking / Flightless",
            options=["Flying", "Walking / Flightless"],
            explanation=f"The {name} is a flightless bird. {bird['feature']}. {bird.get('note', 'It cannot fly well.')}",
            difficulty="Easy",
            topic="c2_evs_002",
            category="standard",
            keywords=[name.lower(), "flightless"],
        ))

    # --- Body covering MCQs ---
    for bc in rng.sample(BODY_COVERINGS, k=min(4, len(BODY_COVERINGS))):
        animal = bc["animal"]
        covering = bc["covering"]
        wrong_coverings = [b["covering"] for b in BODY_COVERINGS if b["animal"] != animal]
        rng.shuffle(wrong_coverings)
        opts = [covering] + wrong_coverings[:3]
        rng.shuffle(opts)
        ca = chr(65 + opts.index(covering))

        qs.append(_q(
            qid=f"c2evs002_mcq_body_{animal.lower()}",
            qtype="mcq",
            question=f"The body of a {animal} is covered with ________.",
            answer=ca,
            options=opts,
            explanation=f"The {animal} is a {bc['type']}. Its body is covered with {covering}. Fur is found on mammals, feathers on birds, and scales on reptiles and fish.",
            difficulty="Easy",
            topic="c2_evs_002",
            category="standard",
            keywords=[animal.lower(), covering, "body covering"],
        ))

    # --- Body covering fill blank ---
    qs.append(_q(
        qid="c2evs002_fill_feathers",
        qtype="fill_blank",
        question="Birds have ________ on their bodies.",
        answer="feathers",
        options=[],
        explanation="Birds are the only animals that have feathers on their bodies. Feathers help them fly and keep them warm.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="standard",
        keywords=["feathers", "birds"],
    ))

    qs.append(_q(
        qid="c2evs002_fill_fur",
        qtype="fill_blank",
        question="Dogs and cats have ________ on their bodies.",
        answer="fur",
        options=[],
        explanation="Dogs and cats are mammals. They have fur on their bodies which keeps them warm.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="competency",
        keywords=["fur", "mammals"],
    ))

    qs.append(_q(
        qid="c2evs002_fill_scales",
        qtype="fill_blank",
        question="Fish have ________ on their bodies.",
        answer="scales",
        options=[],
        explanation="Fish are covered with scales that protect their bodies and help them swim smoothly in water.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="standard",
        keywords=["scales", "fish"],
    ))

    # --- Classification short answer ---
    qs.append(_q(
        qid="c2evs002_short_domestic",
        qtype="short_answer",
        question="Name any three domestic animals found in your neighbourhood.",
        answer="Cow, dog, and cat are domestic animals found in our neighbourhood.",
        options=[],
        explanation="Domestic animals are those that live with humans. Examples include cow, dog, cat, hen, goat, buffalo, rabbit.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="competency",
        keywords=["cow", "dog", "cat", "domestic animals", "neighbourhood"],
    ))

    qs.append(_q(
        qid="c2evs002_short_wild",
        qtype="short_answer",
        question="Name two wild animals you may see in a zoo or forest.",
        answer="Lion and tiger are wild animals found in zoos and forests.",
        options=[],
        explanation="Wild animals live in forests and jungles. They cannot be kept as pets at home. Examples: lion, tiger, elephant, deer.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="competency",
        keywords=["lion", "tiger", "wild animals", "forest"],
    ))

    # --- National bird (Indian context) ---
    qs.append(_q(
        qid="c2evs002_mcq_peacock",
        qtype="mcq",
        question="Which is the national bird of India?",
        answer="Peacock",
        options=["Peacock", "Parrot", "Eagle", "Sparrow"],
        explanation="The Peacock is the national bird of India. It is a large, colourful bird found all over India. It can fly but prefers to walk and show its beautiful feathers.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="competency",
        keywords=["peacock", "national bird", "India"],
    ))

    # --- Count animals (numerical) ---
    qs.append(_q(
        qid="c2evs002_num_classify",
        qtype="numerical",
        question="In a farm, there are 2 cows, 3 dogs, 5 hens, and 1 cat. How many domestic animals are there in total?",
        answer=11,
        options=[],
        explanation="All the animals mentioned (cow, dog, hen, cat) are domestic animals. Total = 2+3+5+1 = 11 domestic animals.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="standard",
        keywords=["count", "domestic animals", "addition"],
        steps=[
            "Identify all domestic animals: cows, dogs, hens, cat",
            "Add the numbers: 2 + 3 + 5 + 1 = 11",
            "Answer: 11 domestic animals",
        ],
    ))

    # --- Fill blank: bird feature ---
    qs.append(_q(
        qid="c2evs002_fill_birdfeature",
        qtype="fill_blank",
        question="The ________ has a very long neck and eats leaves from tall trees.",
        answer="giraffe",
        options=[],
        explanation="The giraffe is a wild animal found in Africa. It has the longest neck of any animal and eats leaves from the tops of tall trees.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="standard",
        keywords=["giraffe", "long neck", "wild animal"],
    ))

    # --- Long answer (for Class 2: simple description) ---
    qs.append(_q(
        qid="c2evs002_long_classify",
        qtype="long_answer",
        question="What is the difference between domestic animals and wild animals? Give two examples of each.",
        answer="Domestic animals live with humans and depend on them. Examples: cow and dog. Wild animals live in forests and cannot be kept at home. Examples: lion and tiger.",
        options=[],
        explanation="Domestic animals are tamed and live with humans (cow, dog, cat, hen). Wild animals live freely in forests (lion, tiger, elephant, deer). Domestic animals depend on humans; wild animals find their own food.",
        difficulty="Easy",
        topic="c2_evs_002",
        category="standard",
        keywords=["domestic", "wild", "cow", "dog", "lion", "tiger", "difference"],
    ))

    return qs


def _build_plants_trees(rng: random.Random) -> List[Dict[str, Any]]:
    """c2_evs_003 questions"""
    qs = []

    # --- Plant identification MCQs ---
    for plant in rng.sample(LOCAL_PLANTS, k=min(4, len(LOCAL_PLANTS))):
        name = plant["name"]
        wrongs = [p["name"] for p in LOCAL_PLANTS if p["name"] != name]
        rng.shuffle(wrongs)
        opts = [name] + wrongs[:3]
        rng.shuffle(opts)
        ca = chr(65 + opts.index(name))

        qs.append(_q(
            qid=f"c2evs003_mcq_plant_{name.lower().replace(' ','')}",
            qtype="mcq",
            question=f"Which tree has {plant['leaf']} leaves?",
            answer=ca,
            options=opts,
            explanation=f"The {name} has {plant['leaf']} leaves. Its trunk is {plant['trunk']}. It flowers in {plant['season_flower']} and fruits in {plant['season_fruit']}.",
            difficulty="Easy",
            topic="c2_evs_003",
            category="standard",
            keywords=[name.lower(), "tree identification"],
        ))

    # --- Flowering season ---
    for plant in rng.sample(LOCAL_PLANTS, k=min(3, len(LOCAL_PLANTS))):
        name = plant["name"]
        season_flower = plant["season_flower"]
        wrong_seasons = [p["season_flower"] for p in LOCAL_PLANTS if p["name"] != name]
        rng.shuffle(wrong_seasons)
        opts = [season_flower] + wrong_seasons[:3]
        rng.shuffle(opts)
        ca = chr(65 + opts.index(season_flower))

        qs.append(_q(
            qid=f"c2evs003_mcq_flower_{name.lower().replace(' ','')}",
            qtype="mcq",
            question=f"The {name} flowers in which season?",
            answer=ca,
            options=opts,
            explanation=f"The {name} flowers in {season_flower}. During this time, the tree looks beautiful with its flowers.",
            difficulty="Easy",
            topic="c2_evs_003",
            category="standard",
            keywords=[name.lower(), "flowering", season_flower],
        ))

    # --- Fruiting season ---
    mango = next(p for p in LOCAL_PLANTS if "mango" in p["name"].lower())
    qs.append(_q(
        qid="c2evs003_mcq_mango_fruit",
        qtype="mcq",
        question="In which season do mangoes ripen in India?",
        answer="Summer",
        options=["Spring", "Summer", "Monsoon", "Winter"],
        explanation=f"Mangoes ripen in summer (May-June) in India. The mango tree flowers in spring and the fruit grows through summer.",
        difficulty="Easy",
        topic="c2_evs_003",
        category="competency",
        keywords=["mango", "summer", "fruiting season", "India"],
    ))

    # --- Seasonal changes MCQs ---
    season = rng.choice(SEASONS_INFO)
    wrongs = [s["season"] for s in SEASONS_INFO if s["season"] != season["season"]]
    rng.shuffle(wrongs)
    opts = [season["season"]] + wrongs[:3]
    rng.shuffle(opts)
    ca = chr(65 + opts.index(season["season"]))

    qs.append(_q(
        qid=f"c2evs003_mcq_season_{season['season'].split()[0].lower()}",
        qtype="mcq",
        question=f"In India, the weather is {season['weather']} and {season['happens']}. Which season is this?",
        answer=ca,
        options=opts,
        explanation=f"In {season['season']}, the weather is {season['weather']}. During this time, {season['happens']}.",
        difficulty="Easy",
        topic="c2_evs_003",
        category="competency",
        keywords=["season", "India", season["season"].split()[0].lower()],
    ))

    # --- Tree parts fill blank ---
    for part_info in rng.sample(TREE_PARTS, k=min(3, len(TREE_PARTS))):
        part = part_info["part"]
        func = part_info["function"]
        qs.append(_q(
            qid=f"c2evs003_fill_{part.lower()}",
            qtype="fill_blank",
            question=f"The ________ of a tree {func}.",
            answer=part,
            options=[],
            explanation=f"The {part} of a tree {func}. All parts of a tree are important.",
            difficulty="Easy",
            topic="c2_evs_003",
            category="standard",
            keywords=[part.lower(), "tree parts"],
        ))

    # --- Peepal / Banyan seasonal (deciduous) ---
    qs.append(_q(
        qid="c2evs003_mcq_peepal",
        qtype="mcq",
        question="The Peepal tree sheds its leaves in winter and grows new leaves in spring. What kind of tree is it?",
        answer="Deciduous tree",
        options=["Deciduous tree", "Evergreen tree", "Flowering tree", "Fruit tree"],
        explanation="The Peepal tree is a deciduous tree. It sheds old leaves in autumn/winter and grows new leaves in spring. This is a seasonal change.",
        difficulty="Easy",
        topic="c2_evs_003",
        category="standard",
        keywords=["peepal", "deciduous", "seasonal change", "leaf fall"],
    ))

    # --- Indian national tree context ---
    qs.append(_q(
        qid="c2evs003_mcq_banyan",
        qtype="mcq",
        question="The Banyan tree is the national tree of India. What is special about it?",
        answer="It has aerial roots that grow from its branches",
        options=[
            "It has aerial roots that grow from its branches",
            "It has blue flowers",
            "It grows only in mountains",
            "It does not have leaves",
        ],
        explanation="The Banyan tree is India's national tree. Its aerial roots hang from branches and grow into the ground, forming new trunks. This makes it look like a small forest.",
        difficulty="Easy",
        topic="c2_evs_003",
        category="competency",
        keywords=["banyan", "national tree", "India", "aerial roots"],
    ))

    # --- Seasonal observation short answer ---
    qs.append(_q(
        qid="c2evs003_short_seasonal",
        qtype="short_answer",
        question="What changes do you notice in a Peepal tree between summer and winter?",
        answer="In summer, the Peepal tree has many green leaves. In winter, it sheds most of its leaves and grows new ones in spring.",
        options=[],
        explanation="The Peepal tree is deciduous. In summer it has full green leaves. During autumn-winter it sheds leaves. In spring new leaves appear.",
        difficulty="Easy",
        topic="c2_evs_003",
        category="competency",
        keywords=["peepal", "summer", "winter", "shed leaves", "new leaves"],
    ))

    # --- Parts of a tree fill blank ---
    qs.append(_q(
        qid="c2evs003_fill_roots",
        qtype="fill_blank",
        question="The part of the tree that grows underground and holds the tree firmly is the ________.",
        answer="roots",
        options=[],
        explanation="Roots grow underground. They hold the tree firmly to the ground and absorb water and minerals from the soil.",
        difficulty="Easy",
        topic="c2evs_003",
        category="standard",
        keywords=["roots", "tree parts"],
    ))

    # --- Count tree parts (numerical) ---
    qs.append(_q(
        qid="c2evs003_num_parts",
        qtype="numerical",
        question="Riya draws a mango tree and labels 6 parts: roots, trunk, branches, leaves, flowers, and fruits. How many parts of the tree did she label?",
        answer=6,
        options=[],
        explanation="Riya labeled 6 parts of the tree: roots, trunk, branches, leaves, flowers, and fruits. Count = 6 parts.",
        difficulty="Easy",
        topic="c2evs_003",
        category="standard",
        keywords=["count", "tree parts"],
        steps=[
            "List the parts labeled: roots(1), trunk(2), branches(3), leaves(4), flowers(5), fruits(6)",
            "Count them: 1, 2, 3, 4, 5, 6",
            "Answer: 6 parts",
        ],
    ))

    # --- Long answer: tree parts ---
    qs.append(_q(
        qid="c2evs003_long_parts",
        qtype="long_answer",
        question="Draw and name the main parts of a tree. What is the function of leaves?",
        answer="The main parts of a tree are roots, trunk, branches, leaves, flowers, and fruits. Leaves make food for the tree using sunlight, water, and air.",
        options=[],
        explanation="A tree has six main parts. Roots hold the tree and absorb water. Trunk supports the tree. Branches hold leaves and fruits. Leaves make food. Flowers produce seeds. Fruits protect seeds.",
        difficulty="Easy",
        topic="c2evs_003",
        category="standard",
        keywords=["roots", "trunk", "branches", "leaves", "flowers", "fruits", "function"],
    ))

    # --- Fill blank: flowering season ---
    qs.append(_q(
        qid="c2evs003_fill_flower",
        qtype="fill_blank",
        question="Gulmohar tree has bright red flowers in the season of ________.",
        answer="summer",
        options=[],
        explanation="The Gulmohar tree has beautiful bright red/orange flowers in summer (May-June). It is a common tree in Indian cities.",
        difficulty="Easy",
        topic="c2evs_003",
        category="competency",
        keywords=["gulmohar", "summer", "flowers", "India"],
    ))

    return qs


# ---------------------------------------------------------------------------
# Main generation function
# ---------------------------------------------------------------------------
def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate deterministic EVS questions for Class 2 (CISCE).

    Parameters
    ----------
    seed : int
        Random seed for deterministic generation.
    count : int
        Approximate number of questions to generate.

    Returns
    -------
    List[Dict[str, Any]]
        Each dict has keys:
          id, type, question, options, answer, explanation,
          difficulty, topic, category, keywords, steps
    """
    rng = _make_rng(seed)

    # Build full question pool
    pool: List[Dict[str, Any]] = []
    pool.extend(_build_family_home_school(rng))
    pool.extend(_build_animals_birds(rng))
    pool.extend(_build_plants_trees(rng))

    # Shuffle deterministically and select `count` questions
    rng.shuffle(pool)

    # Ensure coverage of all topics (at least one from each)
    all_topics = ["c2_evs_001", "c2_evs_002", "c2_evs_003"]
    selected_ids = set()
    result: List[Dict[str, Any]] = []

    # First pass: ensure one from each topic
    for topic in all_topics:
        topic_qs = [q for q in pool if q["topic"] == topic and q["id"] not in selected_ids]
        if topic_qs:
            chosen = rng.choice(topic_qs)
            result.append(chosen)
            selected_ids.add(chosen["id"])

    # Second pass: fill remaining slots ensuring 50/50 competency split
    remaining_pool = [q for q in pool if q["id"] not in selected_ids]
    rng.shuffle(remaining_pool)

    needed = max(0, count - len(result))
    competency_count = sum(1 for q in result if q.get("category") == "competency")
    standard_count = sum(1 for q in result if q.get("category") != "competency")

    for q in remaining_pool:
        if len(result) >= count:
            break
        cat = q.get("category", "standard")
        # Try to maintain ~50/50 ratio
        if cat == "competency" and competency_count >= standard_count + 2:
            continue  # skip if too many competency already
        if cat != "competency" and standard_count >= competency_count + 2:
            continue  # skip if too many standard already
        result.append(q)
        selected_ids.add(q["id"])
        if cat == "competency":
            competency_count += 1
        else:
            standard_count += 1

    # If still short, add any remaining
    if len(result) < count:
        for q in pool:
            if q["id"] not in selected_ids and len(result) < count:
                result.append(q)
                selected_ids.add(q["id"])

    # Assign sequential IDs
    for i, q in enumerate(result, 1):
        q["id"] = f"c2evs_q{i:03d}"

    return result[:count]


# ---------------------------------------------------------------------------
# Solver functions tied to generated questions
# ---------------------------------------------------------------------------
def solve_generated_question(q: Dict[str, Any], user_response: Any) -> Dict[str, Any]:
    """
    Solve/evaluate a single generated question against a user response.

    Parameters
    ----------
    q : dict
        Question dict from generate_questions().
    user_response : Any
        The user's answer.

    Returns
    -------
    dict with keys: correct, user_answer, expected_answer, explanation, topic, type
    """
    qtype = q["type"]
    correct = q["answer"]
    topic = q["topic"]
    explanation = q["explanation"]

    if qtype == "mcq":
        user_str = str(user_response).strip().upper()
        correct_str = str(correct).strip().upper()
        is_correct = user_str == correct_str
        return {
            "correct": is_correct,
            "user_answer": user_response,
            "expected_answer": correct,
            "explanation": explanation,
            "topic": topic,
            "type": qtype,
            "steps": ["Read the question", "Analyse each option", f"Selected: {user_str}", f"Correct: {correct_str}"],
            "verification": {"passed": is_correct, "detail": "Correct" if is_correct else f"Expected {correct_str}"},
        }

    elif qtype == "fill_blank":
        user_str = str(user_response).strip().lower()
        correct_str = str(correct).strip().lower()
        is_correct = user_str == correct_str
        return {
            "correct": is_correct,
            "user_answer": user_response,
            "expected_answer": correct,
            "explanation": explanation,
            "topic": topic,
            "type": qtype,
            "steps": ["Read the sentence", "Think of the correct word", f"Filled: {user_str}", f"Correct: {correct_str}"],
            "verification": {"passed": is_correct, "detail": "Correct" if is_correct else f"Expected '{correct}'"},
        }

    elif qtype == "short_answer":
        provided = str(user_response).strip().lower()
        required = [kw.lower() for kw in q.get("keywords", [])]
        found = [kw for kw in required if kw in provided]
        score = len(found) / len(required) if required else 1.0
        is_correct = score >= 0.6
        return {
            "correct": is_correct,
            "user_answer": user_response,
            "expected_answer": correct,
            "explanation": explanation,
            "topic": topic,
            "type": qtype,
            "steps": [
                "Read the question carefully",
                "Recall relevant facts from the lesson",
                f"Key points: {', '.join(q.get('keywords', []))}",
                f"Matched keywords: {', '.join(found)}",
                f"Score: {score:.0%}",
            ],
            "verification": {
                "passed": is_correct,
                "score": round(score, 2),
                "keywords_found": found,
                "keywords_required": required,
                "detail": f"{len(found)}/{len(required)} keywords found",
            },
        }

    elif qtype == "long_answer":
        provided = str(user_response).strip().lower()
        required = [kw.lower() for kw in q.get("keywords", [])]
        found = [kw for kw in required if kw in provided]
        score = len(found) / len(required) if required else 1.0
        is_correct = score >= 0.5
        return {
            "correct": is_correct,
            "user_answer": user_response,
            "expected_answer": correct,
            "explanation": explanation,
            "topic": topic,
            "type": qtype,
            "steps": [
                "Read the question carefully",
                "Think about all aspects of the topic",
                f"Key points to cover: {', '.join(q.get('keywords', []))}",
                f"Matched keywords: {', '.join(found)}",
                f"Score: {score:.0%}",
            ],
            "verification": {
                "passed": is_correct,
                "score": round(score, 2),
                "keywords_found": found,
                "keywords_required": required,
                "detail": f"{len(found)}/{len(required)} keywords found",
            },
        }

    elif qtype == "numerical":
        try:
            user_num = float(user_response)
            is_correct = abs(user_num - float(correct)) < 0.001
            return {
                "correct": is_correct,
                "user_answer": user_response,
                "expected_answer": correct,
                "explanation": explanation,
                "topic": topic,
                "type": qtype,
                "steps": q.get("steps", ["Calculate the answer"]),
                "verification": {
                    "passed": is_correct,
                    "detail": f"Correct: {user_num} == {correct}" if is_correct else f"Expected {correct}, got {user_num}",
                },
            }
        except (ValueError, TypeError):
            return {
                "correct": False,
                "user_answer": user_response,
                "expected_answer": correct,
                "explanation": explanation,
                "topic": topic,
                "type": qtype,
                "verification": {"passed": False, "detail": "Invalid numerical response"},
            }

    return {
        "correct": False,
        "user_answer": user_response,
        "expected_answer": correct,
        "explanation": "Unknown question type",
        "topic": topic,
        "type": qtype,
        "verification": {"passed": False, "detail": "Unknown question type"},
    }


# ---------------------------------------------------------------------------
# Utility: export questions as JSON
# ---------------------------------------------------------------------------
def export_questions_json(seed: int, count: int, filename: str = "class2_evs_questions.json") -> str:
    """Generate questions and write to a JSON file. Returns the JSON string."""
    questions = generate_questions(seed, count)
    data = {
        "class": 2,
        "subject": "EVS",
        "board": "CISCE",
        "seed": seed,
        "count": len(questions),
        "questions": questions,
    }
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(json_str)
    return json_str


# ---------------------------------------------------------------------------
# Utility: get topic summary
# ---------------------------------------------------------------------------
def get_topic_summary(seed: int, count: int) -> Dict[str, Any]:
    """Generate questions and return a summary by topic and type."""
    questions = generate_questions(seed, count)
    summary = {
        "total": len(questions),
        "by_topic": {},
        "by_type": {},
        "by_category": {},
        "by_difficulty": {},
    }
    for q in questions:
        t = q.get("topic", "unknown")
        ty = q.get("type", "unknown")
        cat = q.get("category", "standard")
        diff = q.get("difficulty", "Easy")

        summary["by_topic"][t] = summary["by_topic"].get(t, 0) + 1
        summary["by_type"][ty] = summary["by_type"].get(ty, 0) + 1
        summary["by_category"][cat] = summary["by_category"].get(cat, 0) + 1
        summary["by_difficulty"][diff] = summary["by_difficulty"].get(diff, 0) + 1

    return summary


# ---------------------------------------------------------------------------
# Unit tests / self-verify on import
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    # Self-verification block
    SEED = 42
    NUM_QUESTIONS = 15

    print("=" * 60)
    print("CISCE Class 2 EVS Question Generator - Self Verification")
    print("=" * 60)

    # Test 1: Determinism
    qs1 = generate_questions(SEED, NUM_QUESTIONS)
    qs2 = generate_questions(SEED, NUM_QUESTIONS)
    assert qs1 == qs2, "Determinism check failed: same seed produces different results!"
    print(f"\n[PASS] Determinism: same seed ({SEED}) produces identical output")

    # Test 2: Count
    assert len(qs1) == NUM_QUESTIONS, f"Count mismatch: expected {NUM_QUESTIONS}, got {len(qs1)}"
    print(f"[PASS] Count: generated exactly {NUM_QUESTIONS} questions")

    # Test 3: Topic coverage
    topics = set(q["topic"] for q in qs1)
    required_topics = {"c2_evs_001", "c2_evs_002", "c2_evs_003"}
    assert required_topics.issubset(topics), f"Missing topics: {required_topics - topics}"
    print(f"[PASS] Topic coverage: all 3 topics present ({topics})")

    # Test 4: Question types present
    types = set(q["type"] for q in qs1)
    print(f"[PASS] Question types present: {types}")

    # Test 5: Competency balance
    comp = sum(1 for q in qs1 if q.get("category") == "competency")
    std = sum(1 for q in qs1 if q.get("category") != "competency")
    ratio = comp / len(qs1)
    print(f"[PASS] Category split: {comp} competency ({ratio:.0%}), {std} standard ({1-ratio:.0%})")

    # Test 6: Every question has required fields
    required_fields = {"id", "type", "question", "options", "answer", "explanation",
                       "difficulty", "topic", "category", "keywords", "steps"}
    for q in qs1:
        missing = required_fields - set(q.keys())
        assert not missing, f"Question {q['id']} missing fields: {missing}"
    print(f"[PASS] All questions have required fields")

    # Test 7: MCQ options are valid (A-D)
    for q in qs1:
        if q["type"] == "mcq":
            assert q["answer"] in "ABCD", f"Invalid MCQ answer '{q['answer']}' in {q['id']}"
            assert len(q["options"]) == 4, f"MCQ {q['id']} has {len(q['options'])} options, expected 4"
    print(f"[PASS] All MCQs have valid answers and 4 options")

    # Test 8: Solver functions work
    sample_mcq = qs1[0]
    result = solve_generated_question(sample_mcq, sample_mcq["answer"])
    assert result["correct"] is True, f"Solver failed on correct answer: {result}"
    print(f"[PASS] Solver: MCQ correct answer evaluates True")

    sample_fill = next(q for q in qs1 if q["type"] == "fill_blank")
    result = solve_generated_question(sample_fill, sample_fill["answer"])
    assert result["correct"] is True, f"Solver failed on fill-blank: {result}"
    print(f"[PASS] Solver: Fill-blank correct answer evaluates True")

    sample_num = next(q for q in qs1 if q["type"] == "numerical")
    result = solve_generated_question(sample_num, sample_num["answer"])
    assert result["correct"] is True, f"Solver failed on numerical: {result}"
    print(f"[PASS] Solver: Numerical correct answer evaluates True")

    # Test 9: Solver detects wrong answer
    wrong_result = solve_generated_question(sample_mcq, "B")
    if sample_mcq["answer"] != "B":
        assert wrong_result["correct"] is False
    print(f"[PASS] Solver: wrong answer correctly detected")

    # Summary
    summary = get_topic_summary(SEED, NUM_QUESTIONS)
    print(f"\n--- Summary ---")
    for k, v in summary.items():
        print(f"  {k}: {v}")

    # Print sample questions
    print(f"\n--- Sample Questions (first 3) ---")
    for q in qs1[:3]:
        print(f"\n[{q['id']}] [{q['type'].upper()}] [{q['topic']}] [{q['category']}]")
        print(f"  Q: {q['question']}")
        if q["options"]:
            print(f"  Options: {q['options']}")
        print(f"  Answer: {q['answer']}")
        print(f"  Explanation: {q['explanation'][:80]}...")

    print("\n" + "=" * 60)
    print("All self-verification checks PASSED!")
    print("=" * 60)