"""
Class 1 Physics Solver
======================
Covers 4 nodes:
  c1_phy_001 – Air is all around us
  c1_phy_002 – Feeling air when wind blows
  c1_phy_003 – Uses of air in daily life
  c1_phy_004 – Modes of transport (land, water, air)

Design principles:
  • Deterministic: all randomness gated behind a fixed seed
  • Step-by-step with a verification block at the end of every solution
  • 50 % competency flavour (Indian classroom context) + 50 % standard
"""

from __future__ import annotations

import math
import random
import hashlib
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import List, Optional, Tuple, Dict

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

class NodeID(Enum):
    C1_PHY_001 = auto()
    C1_PHY_002 = auto()
    C1_PHY_003 = auto()
    C1_PHY_004 = auto()

@dataclass
class QuestionContext:
    """All metadata that travels with a single question instance."""
    node: NodeID
    competency_level: str
    difficulty: str
    seed: int
    language: str = "en"

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

def _rng(seed: int) -> random.Random:
    """Return a *new* Random instance bound to `seed`."""
    return random.Random(seed)

def _hash_seed(*parts: str) -> int:
    """Deterministic integer from a string (used when caller has no int seed)."""
    raw = "|".join(parts)
    return int(hashlib.sha256(raw.encode()).hexdigest()[:12], 16)

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

# --- c1_phy_001 ---
AIR_SIGNS = [
    ("blow into a balloon and it gets bigger", "balloon inflates"),
    ("wave your hand – you feel a soft push", "hand feels air"),
    ("wind moves leaves, flags, kites", "things move in wind"),
    ("you feel cool air from a fan", "fan breeze on skin"),
    ("dandelion seeds float away in the breeze", "seeds carried by air"),
    ("candles flicker when someone walks past", "air pushes flame"),
]

AIR_VOCAB = ["air", "wind", "blow", "balloon", "breathe", "around",
             "everywhere", "invisible", "feel", "push", "surroundings"]

# --- c1_phy_002 ---
WIND_EXAMPLES = [
    ("a kite flying in the sky", "wind pushes kite up"),
    ("leaves rustling on a tree", "wind moves leaves"),
    ("a flag waving on a pole", "wind pushes cloth"),
    ("your hair blowing sideways", "wind pushes hair"),
    ("a pinwheel spinning fast", "wind turns pinwheel"),
    ("clothes on a clothesline flapping", "wind moves clothes"),
]

WIND_VOCAB = ["wind", "moving air", "feel", "breeze", "fan", "kite",
              "flag", "leaves", "push", "blow", "skin"]

# --- c1_phy_003 ---
AIR_USES = [
    ("breathing – we breathe air to stay alive", 1),
    ("flying kites – air pushes the kite up", 2),
    ("drying clothes – moving air takes water away", 3),
    ("filling balloons – air goes inside and expands it", 4),
    ("turning windmills – wind pushes the blades", 5),
    ("sailing boats – wind pushes the boat forward", 6),
]

CLEAN_AIR_WAYS = [
    "planting more trees",
    "not burning waste or leaves",
    "using less vehicle smoke",
    "keeping our surroundings clean",
]

LIVING_NEEDS_AIR = [
    "humans breathe air through our nose",
    "animals breathe air through their nose or mouth",
    "fish breathe air that is dissolved in water",
    "plants also need air to make food",
]

# --- c1_phy_004 ---
LAND_VEHICLES = ["car", "bus", "bicycle", "train", "motorcycle", "auto-rickshaw"]
WATER_VEHICLES = ["ship", "boat", "ferry", "submarine", "canoe"]
AIR_VEHICLES = ["aeroplane", "helicopter", "hot air balloon", "glider"]

EMERGENCY_VEHICLES = [
    ("ambulance", "takes sick people to hospital", "siren"),
    ("fire engine", "puts out fires", "siren"),
    ("police car", "catches thieves and keeps order", "siren"),
]

TRAFFIC_SIGNALS = ["red light – stop", "yellow light – get ready", "green light – go"]

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

def verify_in_list(answer: str, options: List[str], *, label: str = "") -> bool:
    """Case-insensitive membership check with a printable reason."""
    a = answer.strip().lower()
    hits = [o for o in options if a == o.strip().lower()]
    if hits:
        return True
    return False

def verify_answer_matches(expected: str, given: str) -> Tuple[bool, str]:
    g = given.strip().lower()
    e = expected.strip().lower()
    if g == e:
        return True, f"✓ Correct – '{given}' matches the expected answer."
    return False, f"✗ Expected '{expected}', got '{given}'. Try again!"

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

# ── c1_phy_001 ───────────────────────────────────────────────────────────────

def solve_c1_phy_001_fill_blank(
    ctx: QuestionContext,
    blank_index: int = 0,
) -> Dict:
    """
    Fill-in-the-blank: "Air is ____ around us."
    Options drawn from a seeded shuffle of distractors + correct word.
    """
    rng = _rng(ctx.seed)

    correct = "everywhere"
    distractors = ["sometimes", "nowhere", "only in cities", "only outside"]

    pool = [correct] + rng.sample(distractors, k=min(3, len(distractors)))
    rng.shuffle(pool)

    # pick the lettered option that holds 'correct'
    correct_letter = chr(ord("A") + pool.index(correct))

    question = "Air is _______ around us. Choose the correct word."

    steps = [
        "Step 1 – Recall: The lesson says air is present everywhere.",
        f"Step 2 – Eliminate: '{distractors[0]}' is wrong because air is not limited to one place.",
        f"Step 3 – Eliminate: '{distractors[1]}' is wrong because then nothing could fly or blow.",
        f"Step 4 – Eliminate: '{distractors[2]}' is wrong – air is in villages too.",
        f"Step 5 – Choose: '{correct}' is the right word.",
    ]

    return {
        "node": "c1_phy_001",
        "question": question,
        "options": {chr(ord("A") + i): pool[i] for i in range(len(pool))},
        "answer": correct_letter,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_letter],
            label="fill-blank air everywhere",
        ),
    }


def solve_c1_phy_001_true_false(
    ctx: QuestionContext,
) -> Dict:
    """True / False: pick one true sign & two false statements."""
    rng = _rng(ctx.seed)
    all_signs = AIR_SIGNS.copy()
    rng.shuffle(all_signs)
    true_sign = all_signs[0]
    false_1 = ("air can be seen with our eyes", "air is visible")
    false_2 = ("air only exists in rooms", "air is only indoors")

    statements = [true_sign, false_1, false_2]
    rng.shuffle(statements)

    correct_indices = [i for i, s in enumerate(statements) if s == true_sign]
    correct_answer = chr(ord("A") + correct_indices[0])

    question = "Which of these shows that air is all around us?"

    steps = [
        "Step 1 – Air is INVISIBLE – we cannot see it with our eyes.",
        f"Step 2 – '{true_sign[0]}' is a real sign of air.",
        f"Step 3 – '{false_1[0]}' is FALSE because air cannot be seen.",
        f"Step 4 – '{false_2[0]}' is FALSE because air is everywhere, not just rooms.",
        "Step 5 – Mark the correct statement.",
    ]

    return {
        "node": "c1_phy_001",
        "question": question,
        "options": {chr(ord("A") + i): s[0] for i, s in enumerate(statements)},
        "answer": correct_answer,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_answer], label="true-false air sign",
        ),
    }


def solve_c1_phy_001(
    ctx: QuestionContext,
    variant: str = "fill_blank",
) -> Dict:
    """Dispatcher for c1_phy_001."""
    if variant == "fill_blank":
        return solve_c1_phy_001_fill_blank(ctx)
    return solve_c1_phy_001_true_false(ctx)


# ── c1_phy_002 ───────────────────────────────────────────────────────────────

def solve_c1_phy_002_match(
    ctx: QuestionContext,
) -> Dict:
    """
    Match column: things moved by wind  →  the push feeling.
    3 pairs shown; 1 distractor.
    """
    rng = _rng(ctx.seed)

    selected = rng.sample(WIND_EXAMPLES, k=3)
    distractor = ("a stone on the ground", "it does not move in wind")
    all_items = selected + [distractor]
    rng.shuffle(all_items)

    # lettered list of "things"
    things = {chr(ord("A") + i): item[0] for i, item in enumerate(all_items)}
    # numbered list of "effects"
    effects_raw = [item[1] for item in selected]
    rng.shuffle(effects_raw)
    effects = {str(i + 1): txt for i, txt in enumerate(effects_raw)}

    correct_pairs = {
        item[0]: str(i + 1)
        for i, item in enumerate(selected)
        for j, e in enumerate(effects_raw)
        if item[1] == e
    }

    question = "Match each thing with what happens when wind blows on it."

    steps = [
        "Step 1 – Wind is moving air.",
        "Step 2 – Air pushes things when it moves.",
        "Step 3 – Match: the kite is pushed UP, leaves RUSTLE, flags WAVE.",
        "Step 4 – The stone on the ground does NOT move – that is the odd one out.",
    ]

    return {
        "node": "c1_phy_002",
        "question": question,
        "column_a": things,
        "column_b": effects,
        "answer": correct_pairs,
        "steps": steps,
        "verify": lambda a: a == correct_pairs,
    }


def solve_c1_phy_002_fill(
    ctx: QuestionContext,
) -> Dict:
    """Fill in: "Wind is _______ air." """
    rng = _rng(ctx.seed)
    correct = "moving"
    distractors = ["sleeping", "eating", "heavy"]
    pool = [correct] + rng.sample(distractors, k=3)
    rng.shuffle(pool)
    correct_letter = chr(ord("A") + pool.index(correct))

    question = "Wind is _______ air."

    steps = [
        "Step 1 – Recall: Wind means air that is moving.",
        "Step 2 – 'Sleeping air' and 'eating air' are silly ideas.",
        "Step 3 – 'Heavy air' describes weight, not movement.",
        "Step 4 – 'Moving' is the right word.",
    ]

    return {
        "node": "c1_phy_002",
        "question": question,
        "options": {chr(ord("A") + i): pool[i] for i in range(len(pool))},
        "answer": correct_letter,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_letter], label="wind is moving air",
        ),
    }


def solve_c1_phy_002(
    ctx: QuestionContext,
    variant: str = "match",
) -> Dict:
    if variant == "match":
        return solve_c1_phy_002_match(ctx)
    return solve_c1_phy_002_fill(ctx)


# ── c1_phy_003 ───────────────────────────────────────────────────────────────

def solve_c1_phy_003_enumerate(
    ctx: QuestionContext,
    count: int = 3,
) -> Dict:
    """
    Enumerate: name `count` uses of air.
    Accepts any 3 distinct correct items (order-independent).
    """
    rng = _rng(ctx.seed)

    rng.shuffle(AIR_USES)
    selected_uses = AIR_USES[:count]

    question = f"Name {count} ways we use air in our daily life."

    steps = [
        "Step 1 – Think: What do we do every day that needs air?",
        "Step 2 – Breathing: we breathe air to stay alive.",
        "Step 3 – Flying kites: air pushes the kite upward.",
        "Step 4 – Drying clothes: moving air carries water away.",
        "Step 5 – List any 3 of these (order does not matter).",
    ]

    correct_set = {item[1].lower().strip() for item in selected_uses}

    def verify(answer_list: List[str]) -> Tuple[bool, str]:
        normed = {a.strip().lower() for a in answer_list}
        matches = normed & correct_set
        if len(matches) >= count:
            return True, f"✓ You listed {len(matches)} correct use(s) of air."
        return False, (
            f"✗ You listed {len(matches)} correct item(s). "
            f"Need at least {count}. Try: {selected_uses[0][0]}, "
            f"{selected_uses[1][0]}, {selected_uses[2][0]}."
        )

    return {
        "node": "c1_phy_003",
        "question": question,
        "correct_set": sorted(correct_set),
        "steps": steps,
        "verify": verify,
    }


def solve_c1_phy_003_mcq(
    ctx: QuestionContext,
) -> Dict:
    """MCQ: Why do living things need air?"""
    rng = _rng(ctx.seed)

    correct = "to stay alive"
    distractors = [
        "to make their clothes",
        "to build houses",
        "to write in books",
    ]
    pool = [correct] + rng.sample(distractors, k=min(3, len(distractors)))
    rng.shuffle(pool)
    correct_letter = chr(ord("A") + pool.index(correct))

    question = "Why do living things (humans, animals, plants) need air?"

    steps = [
        "Step 1 – Living things = humans, animals, plants.",
        "Step 2 – We breathe air into our lungs every moment.",
        "Step 3 – Without air we cannot survive.",
        "Step 4 – Air gives us oxygen – that keeps us alive.",
        "Step 5 – 'To stay alive' is the correct answer.",
    ]

    return {
        "node": "c1_phy_003",
        "question": question,
        "options": {chr(ord("A") + i): pool[i] for i in range(len(pool))},
        "answer": correct_letter,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_letter], label="why living things need air",
        ),
    }


def solve_c1_phy_003_clean_air(
    ctx: QuestionContext,
) -> Dict:
    """MCQ: How do we keep air clean?"""
    rng = _rng(ctx.seed)

    correct = "planting more trees"
    distractors = [
        "burning more waste",
        "using more cars",
        "cutting down more trees",
    ]
    pool = [correct] + rng.sample(distractors, k=min(3, len(distractors)))
    rng.shuffle(pool)
    correct_letter = chr(ord("A") + pool.index(correct))

    question = "Which of these helps keep our air clean and fresh?"

    steps = [
        "Step 1 – Trees give us oxygen and take in bad air (carbon dioxide).",
        "Step 2 – Burning waste puts smoke in the air – that is bad.",
        "Step 3 – More cars mean more smoke – that is bad.",
        "Step 4 – Cutting trees removes the air cleaners – that is bad.",
        "Step 5 – Planting trees is the correct way to keep air clean.",
    ]

    return {
        "node": "c1_phy_003",
        "question": question,
        "options": {chr(ord("A") + i): pool[i] for i in range(len(pool))},
        "answer": correct_letter,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_letter], label="keep air clean",
        ),
    }


def solve_c1_phy_003(
    ctx: QuestionContext,
    variant: str = "enumerate",
) -> Dict:
    variants = {
        "enumerate": solve_c1_phy_003_enumerate,
        "mcq": solve_c1_phy_003_mcq,
        "clean_air": solve_c1_phy_003_clean_air,
    }
    return variants.get(variant, solve_c1_phy_003_enumerate)(ctx)


# ── c1_phy_004 ───────────────────────────────────────────────────────────────

def solve_c1_phy_004_sort(
    ctx: QuestionContext,
    n_vehicles: int = 6,
) -> Dict:
    """
    Sort `n_vehicles` randomly chosen vehicles into land / water / air.
    """
    rng = _rng(ctx.seed)

    # pick vehicles
    chosen_land = rng.sample(LAND_VEHICLES, k=min(3, len(LAND_VEHICLES)))
    chosen_water = rng.sample(WATER_VEHICLES, k=min(2, len(WATER_VEHICLES)))
    chosen_air = rng.sample(AIR_VEHICLES, k=1)

    all_vehicles = chosen_land + chosen_water + chosen_air
    rng.shuffle(all_vehicles)

    ground_truth = {}
    for v in all_vehicles:
        if v in LAND_VEHICLES:
            ground_truth[v] = "land"
        elif v in WATER_VEHICLES:
            ground_truth[v] = "water"
        else:
            ground_truth[v] = "air"

    question = (
        f"Sort these vehicles into the correct mode of transport "
        f"(land / water / air): {', '.join(all_vehicles)}"
    )

    steps = [
        "Step 1 – There are THREE modes of transport: land, water, and air.",
        "Step 2 – Land vehicles run on roads or tracks (car, bus, train, bicycle).",
        "Step 3 – Water vehicles sail on rivers or seas (ship, boat, ferry).",
        "Step 4 – Air vehicles fly in the sky (aeroplane, helicopter).",
        "Step 5 – Match each vehicle to its correct mode.",
    ]

    return {
        "node": "c1_phy_004",
        "question": question,
        "vehicles": all_vehicles,
        "answer": ground_truth,
        "steps": steps,
        "verify": lambda a: a == ground_truth,
    }


def solve_c1_phy_004_emergency(
    ctx: QuestionContext,
) -> Dict:
    """
    MCQ: Which vehicle takes sick people to hospital?
    """
    rng = _rng(ctx.seed)

    chosen = rng.sample(EMERGENCY_VEHICLES, k=3)
    correct_vehicle, _, _ = chosen[0]
    correct_letter = "A"

    # shuffle option labels
    rng.shuffle(chosen)
    # re-find correct letter after shuffle
    for i, (name, _, _) in enumerate(chosen):
        if name == correct_vehicle:
            correct_letter = chr(ord("A") + i)
            break

    options = {chr(ord("A") + i): f"{name} – {desc}" for i, (name, desc, _) in enumerate(chosen)}

    question = "Which vehicle is used to take sick people to the hospital?"

    steps = [
        "Step 1 – An ambulance carries sick or injured people.",
        f"Step 2 – A fire engine ({chosen[1][0]}) puts out fires.",
        f"Step 3 – A police car ({chosen[2][0]}) catches thieves.",
        "Step 4 – So the ambulance is the right answer.",
    ]

    return {
        "node": "c1_phy_004",
        "question": question,
        "options": options,
        "answer": correct_letter,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_letter], label="emergency vehicle ambulance",
        ),
    }


def solve_c1_phy_004_traffic_signal(
    ctx: QuestionContext,
) -> Dict:
    """MCQ: What does the red traffic light mean?"""
    rng = _rng(ctx.seed)

    correct = "Stop"
    distractors = ["Go", "Get ready", "Run faster"]
    pool = [correct] + rng.sample(distractors, k=3)
    rng.shuffle(pool)
    correct_letter = chr(ord("A") + pool.index(correct))

    question = "At a traffic signal, what does the RED light mean?"

    steps = [
        "Step 1 – Red means danger – it tells vehicles to STOP.",
        "Step 2 – Green means GO.",
        "Step 3 – Yellow means GET READY (wait before going).",
        "Step 4 – So RED = STOP.",
    ]

    return {
        "node": "c1_phy_004",
        "question": question,
        "options": {chr(ord("A") + i): pool[i] for i in range(len(pool))},
        "answer": correct_letter,
        "steps": steps,
        "verify": lambda a: verify_in_list(
            a.upper(), [correct_letter], label="red traffic light",
        ),
    }


def solve_c1_phy_004(
    ctx: QuestionContext,
    variant: str = "sort",
) -> Dict:
    variants = {
        "sort": solve_c1_phy_004_sort,
        "emergency": solve_c1_phy_004_emergency,
        "traffic_signal": solve_c1_phy_004_traffic_signal,
    }
    return variants.get(variant, solve_c1_phy_004_sort)(ctx)


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

SOLVERS: Dict[NodeID, Dict[str, callable]] = {
    NodeID.C1_PHY_001: {
        "fill_blank": solve_c1_phy_001,
        "true_false": solve_c1_phy_001,
    },
    NodeID.C1_PHY_002: {
        "match": solve_c1_phy_002,
        "fill": solve_c1_phy_002,
    },
    NodeID.C1_PHY_003: {
        "enumerate": solve_c1_phy_003,
        "mcq": solve_c1_phy_003,
        "clean_air": solve_c1_phy_003,
    },
    NodeID.C1_PHY_004: {
        "sort": solve_c1_phy_004,
        "emergency": solve_c1_phy_004,
        "traffic_signal": solve_c1_phy_004,
    },
}


def solve(node: str | NodeID, *, variant: str = "fill_blank", seed: int = 42, **kwargs) -> Dict:
    """
    Top-level solver entry point.

    Parameters
    ----------
    node : str | NodeID
        e.g. "c1_phy_001" or NodeID.C1_PHY_001
    variant : str
        Question type variant for the node.
    seed : int
        Deterministic seed for randomisation.
    **kwargs
        Forwarded to the underlying solver (e.g. `blank_index`, `count`).

    Returns
    -------
    Dict with keys: node, question, answer, steps, verify
    """
    if isinstance(node, str):
        node = NodeID[node.upper()]
    ctx = QuestionContext(node=node, competency_level="Board",
                          difficulty="Easy", seed=seed)
    solver = SOLVERS[node].get(variant, list(SOLVERS[node].values())[0])
    return solver(ctx, variant=variant, **kwargs)