"""
Class 5 Physics — Solver Module
Covers: c5_phy_001, c5_phy_002, c5_phy_003
Author: Auto-generated | Deterministic | Seeded
"""

from __future__ import annotations

import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum

# ──────────────────────────────────────────────
#  DATA MODELS
# ──────────────────────────────────────────────

class NodeID(Enum):
    C5_PHY_001 = "c5_phy_001"
    C5_PHY_002 = "c5_phy_002"
    C5_PHY_003 = "c5_phy_003"


class QType(Enum):
    MATCH   = "match"
    CLASSIFY = "classify"
    WARNING = "warning"


class Diff(Enum):
    EASY = "easy"
    MEDIUM = "medium"


@dataclass
class Question:
    node: str
    qtype: str
    difficulty: str
    competency: str
    question_text: str
    options: List[str]
    correct_index: int
    explanation: str
    hint: str = ""


@dataclass
class VerificationResult:
    is_correct: bool
    selected_index: int
    correct_index: int
    user_choice: str
    correct_choice: str
    explanation: str


# ──────────────────────────────────────────────
#  SEEDED RANDOM WRAPPER
# ──────────────────────────────────────────────

def _make_seed(*parts) -> random.Random:
    """Deterministic RNG from arbitrary string parts."""
    raw = "|".join(str(p) for p in parts)
    digest = hashlib.sha256(raw.encode()).hexdigest()
    seed = int(digest[:12], 16)
    return random.Random(seed)


# ──────────────────────────────────────────────
#  STATIC KNOWLEDGE BASE
# ──────────────────────────────────────────────

OBJECT_SOUNDS: List[Tuple[str, str, str]] = [
    ("Clock",         "Tick-tock",          "A clock has a tiny heartbeat you can hear."),
    ("Whistle",       "Shrill, high-pitched", "A whistle is like a tiny alarm; one blow makes a loud sharp sound."),
    ("Tea kettle",    "Whistling when water boils", "A tea kettle sings when steam rushes through its spout."),
    ("Pressure cooker","Hissing steam sound", "A cooker hums and hisses like it is telling you food is cooking."),
    ("Piano",         "Musical notes",        "A piano is a box of voices; each key presses a string that sings its own note."),
    ("Call bell",     "Ring-ring",             "A call bell rings out clearly so everyone knows someone needs help."),
    ("Flute",         "Melodious, soft tones", "A flute sounds like a gentle songbird because it is smooth and soothing."),
]


PLEASANT_SOUNDS: List[Tuple[str, str]] = [
    ("Flute playing a tune",      "sounds smooth and soothing to the ears"),
    ("Piano melody",              "notes blend together beautifully"),
    ("Birds chirping at sunrise", "sounds like nature is saying good morning"),
    ("Gentle rain on a window",   "makes a soft, calming tap-tap sound"),
    ("Bells in a temple",         "ring with a calm, peaceful tone"),
]


UNPLEASANT_SOUNDS: List[Tuple[str, str]] = [
    ("Firecracker bursting",  "sounds like sudden thunder very close to you"),
    ("Loud bus horn",         "blares sharply and makes you wince"),
    ("Scratching on a board", "creates a harsh, grating noise that bothers the ears"),
    ("Blaring loudspeaker",   "is so loud it drowns out everything else"),
    ("Dog barking loudly",    "can hurt your ears if the dog is very near"),
]


WARNING_SIGNALS: List[Tuple[str, str, str]] = [
    ("Fire alarm",  "There is a fire in the building. It tells everyone to evacuate quickly and calmly.",
     "is like a shouting guard"),
    ("Ambulance siren", "A person needs urgent medical help. It tells vehicles on the road to move aside.",
     "is like an urgent voice asking everyone to make way"),
    ("School bell", "It is time for a new class period. It tells students to go to their classrooms.",
     "is like a timekeeper calling everyone to attention"),
]


# ──────────────────────────────────────────────
#  HELPERS
# ──────────────────────────────────────────────

def _shuffle_options(correct: str, distractors: List[str], rng: random.Random) -> List[str]:
    pool = [correct] + distractors
    rng.shuffle(pool)
    return pool


def _build_options_text(options: List[str]) -> str:
    labels = ["A", "B", "C", "D", "E"]
    return "\n".join(f"  ({labels[i]}) {opt}" for i, opt in enumerate(options))


# ──────────────────────────────────────────────
#  QUESTION GENERATORS
# ──────────────────────────────────────────────

def _gen_match_sound(seed: int) -> Question:
    """
    NODE c5_phy_001 | Match the sound to its object.
    Cognitive: Remember
    """
    rng = _make_seed("c5_phy_001", "match", seed)
    entry = rng.choice(OBJECT_SOUNDS)
    obj, sound_desc, _ = entry
    all_descs = [s for _, s, _ in OBJECT_SOUNDS]
    distractors = rng.sample([d for d in all_descs if d != sound_desc], min(3, len(all_descs)-1))
    while len(distractors) < 3:
        distractors.append("A soft humming sound")
    options = _shuffle_options(sound_desc, distractors, rng)
    correct_idx = options.index(sound_desc)
    question_text = (
        f"Q. A {obj} produces a sound.\n"
        f"Which description below matches the sound it makes?\n\n"
        f"{_build_options_text(options)}"
    )
    return Question(
        node="c5_phy_001", qtype=QType.MATCH.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The object is a {obj}.\n"
            f"  2. Think about what sound you hear when a {obj} works.\n"
            f"  3. A {obj} makes a '{sound_desc}'.\n"
            f"  4. Looking at the options, the matching description is:\n"
            f"     → {sound_desc}\n"
            f"  5. Therefore, the correct answer is option "
            f"{chr(65+correct_idx)}.\n\n"
            f"FUN FACT (Indian context):\n"
            f"  In many Indian homes, a wall clock in the living room ticks steadily,"
            f" helping everyone know the time without looking at it.\n"
            f"  The pressure cooker's hissing whistle is a familiar sound in every"
            f" Indian kitchen — it tells the cook that dinner is almost ready!"
        ),
        hint=f"Think about the sound a {obj} makes. Which option describes it best?"
    )


def _gen_identify_object(seed: int) -> Question:
    """
    NODE c5_phy_001 | Given a sound description, identify the object.
    Cognitive: Remember
    """
    rng = _make_seed("c5_phy_001", "identify", seed)
    entry = rng.choice(OBJECT_SOUNDS)
    obj, sound_desc, _ = entry
    all_objs = [o for o, _, _ in OBJECT_SOUNDS]
    distractors = rng.sample([o for o in all_objs if o != obj], min(3, len(all_objs)-1))
    while len(distractors) < 3:
        distractors += ["Speaker", "Radio"]
    distractors = distractors[:3]
    options = _shuffle_options(obj, distractors, rng)
    correct_idx = options.index(obj)
    question_text = (
        f"Q. You hear a sound that is described as:\n"
        f"   \"{sound_desc}\"\n"
        f"Which object is producing this sound?\n\n"
        f"{_build_options_text(options)}"
    )
    return Question(
        node="c5_phy_001", qtype=QType.MATCH.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The sound is described as: '{sound_desc}'.\n"
            f"  2. Recall the objects studied: clock, whistle, tea kettle, cooker, piano, call bell, flute.\n"
            f"  3. A {obj} is the object that produces this kind of sound.\n"
            f"  4. Therefore, the correct answer is option {chr(65+correct_idx)}.\n\n"
            f"VERIFICATION: A {obj} → '{sound_desc}' ✓\n"
            f"  The other options produce different sounds and can be ruled out."
        ),
        hint=f"Which object in your home or classroom makes a '{sound_desc}' sound?"
    )


def _gen_count_objects(seed: int) -> Question:
    """
    NODE c5_phy_001 | How many of these objects produce sound?
    Cognitive: Remember
    """
    rng = _make_seed("c5_phy_001", "count", seed)
    chosen = rng.sample(OBJECT_SOUNDS, 4)
    distractors_pool = ["Chair", "Table", "Wall", "Window", "Book", "Pen", "Bag", "Shoe"]
    extra = rng.sample(distractors_pool, 2)
    all_items = [obj for obj, _, _ in chosen] + extra
    rng.shuffle(all_items)
    count = 4  # all chosen objects produce sound
    question_text = (
        f"Q. Look at these objects:\n"
        f"   {', '.join(all_items)}\n"
        f"How many of these objects naturally produce sound?"
    )
    return Question(
        node="c5_phy_001", qtype=QType.MATCH.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=["2", "3", "4", "5"],
        correct_index=2,  # 4
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. Go through each object one by one:\n"
            f"     • {', '.join(obj for obj, _, _ in chosen)} → each produces sound ✓\n"
            f"     • {', '.join(extra)} → do NOT naturally produce sound ✗\n"
            f"  2. Total objects that produce sound = {count}.\n"
            f"  3. Therefore, the correct answer is 4.\n\n"
            f"REMEMBER: Almost every object can make SOME sound if hit hard enough,"
            f" but we talk about sounds they naturally produce in daily life."
        ),
        hint="Count carefully — which objects make sounds by themselves without being hit?"
    )


def _gen_classify_sound(seed: int) -> Question:
    """
    NODE c5_phy_002 | Classify a sound as pleasant or unpleasant.
    Cognitive: Understand
    """
    rng = _make_seed("c5_phy_002", "classify", seed)
    pleasant = rng.choice(PLEASANT_SOUNDS)
    unpleasant = rng.choice(UNPLEASANT_SOUNDS)
    is_pleasant = rng.choice([True, False])
    chosen = pleasant if is_pleasant else unpleasant
    label = "pleasant" if is_pleasant else "unpleasant"
    explanation_fn = (
        lambda: f"It sounds '{chosen[1]}', so it is a pleasant sound."
        if is_pleasant else
        lambda: f"It '{chosen[1]}', which makes it harsh on the ears, so it is unpleasant."
    )
    question_text = (
        f"Q. You hear the following sound:\n"
        f"   \"{chosen[0]}\"\n\n"
        f"Is this sound pleasant or unpleasant to your ears?\n\n"
        f"  (A) Pleasant\n"
        f"  (B) Unpleasant"
    )
    options = ["Pleasant", "Unpleasant"]
    correct_idx = 0 if is_pleasant else 1
    return Question(
        node="c5_phy_002", qtype=QType.CLASSIFY.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The sound is: '{chosen[0]}'.\n"
            f"  2. Think about how this sound feels to your ears.\n"
            f"  3. {explanation_fn().capitalize()}\n"
            f"  4. Therefore, the correct answer is option "
            f"{chr(65+correct_idx)} ({options[correct_idx]}).\n\n"
            f"INDIAN CONTEXT:\n"
            f"  The sound of a flute during a morning walk in a park is pleasant.\n"
            f"  The sound of loudspeakers during a festival can become unpleasant"
            f" if played at very high volume for many hours.\n\n"
            f"KEY IDEA:\n"
            f"  Pleasant sounds are soft, musical, and soothing (flute, piano, birds).\n"
            f"  Unpleasant sounds are loud, harsh, and jarring (horn, firecracker, scratch)."
        ),
        hint="Does the sound make you feel calm and happy, or does it bother your ears?"
    )


def _gen_give_example(seed: int) -> Question:
    """
    NODE c5_phy_002 | Give an example of pleasant / unpleasant sound.
    Cognitive: Understand
    """
    rng = _make_seed("c5_phy_002", "example", seed)
    want_pleasant = rng.choice([True, False])
    question_text = (
        f"Q. Name {'a pleasant' if want_pleasant else 'an unpleasant'} sound"
        f" and explain why you feel that way about it.\n\n"
        f"  (A) Flute music — because it is soft and soothing\n"
        f"  (B) Firecracker sound — because it is soft and soothing\n"
        f"  (C) Loud horn — because it is smooth and calming\n"
        f"  (D) Scratching noise — because it is musical and gentle"
    )
    options = [
        "Flute music — soft and soothing (pleasant)",
        "Firecracker — soft and soothing (incorrect reason)",
        "Loud horn — smooth and calming (incorrect reason)",
        "Scratching noise — musical and gentle (incorrect reason)",
    ]
    correct_idx = 0
    return Question(
        node="c5_phy_002", qtype=QType.CLASSIFY.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. We need {'a pleasant' if want_pleasant else 'an unpleasant'} sound example.\n"
            f"  2. Option A: Flute music — soft and soothing → this IS pleasant ✓\n"
            f"  3. Options B, C, D: all have wrong descriptions.\n"
            f"  4. Therefore, the correct answer is option A.\n\n"
            f"WHY THE OTHERS ARE WRONG:\n"
            f"  • Option B: Firecrackers are unpleasant (loud, harsh), not pleasant.\n"
            f"  • Option C: A loud horn is unpleasant, not smooth and calming.\n"
            f"  • Option D: Scratching noise is harsh and grating, not musical.\n\n"
            f"REMEMBER: Pleasant = soft, musical, soothing | Unpleasant = loud, harsh, jarring."
        ),
        hint="Pick the option where both the sound AND the reason match correctly."
    )


def _gen_why_pleasant(seed: int) -> Question:
    """
    NODE c5_phy_002 | Explain why a sound is pleasant or unpleasant.
    Cognitive: Understand
    """
    rng = _make_seed("c5_phy_002", "why", seed)
    pleasant = rng.choice(PLEASANT_SOUNDS)
    question_text = (
        f"Q. The sound of '{pleasant[0]}' is classified as pleasant.\n"
        f"Why is this sound pleasant?\n\n"
        f"  (A) Because it is loud and jarring\n"
        f"  (B) Because it {pleasant[1]}\n"
        f"  (C) Because it makes people want to cover their ears\n"
        f"  (D) Because it sounds like scratching on a rough surface"
    )
    return Question(
        node="c5_phy_002", qtype=QType.CLASSIFY.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=[
            "Because it is loud and jarring",
            f"Because it {pleasant[1]}",
            "Because it makes people want to cover their ears",
            "Because it sounds like scratching on a rough surface",
        ],
        correct_index=1,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The sound is '{pleasant[0]}'.\n"
            f"  2. Pleasant sounds are those that {pleasant[1]}.\n"
            f"  3. Option B states exactly this reason.\n"
            f"  4. Options A, C, D describe unpleasant sounds.\n"
            f"  5. Therefore, the correct answer is option B.\n\n"
            f"KEY CONCEPT:\n"
            f"  Pleasant sounds feel good to hear — they are soft, musical, rhythmic."
        ),
        hint=f"The correct reason is already in the question — look for the matching option!"
    )


def _gen_warning_signal(seed: int) -> Question:
    """
    NODE c5_phy_003 | Identify a sound and what it signals.
    Cognitive: Understand
    """
    rng = _make_seed("c5_phy_003", "signal", seed)
    entry = rng.choice(WARNING_SIGNALS)
    sound_name, action, _ = entry
    all_signals = [s for s, _, _ in WARNING_SIGNALS]
    distractors = rng.sample([s for s in all_signals if s != sound_name], min(3, len(all_signals)-1))
    while len(distractors) < 3:
        distractors += ["Telephone ring", "Doorbell"]
    options = _shuffle_options(sound_name, distractors, rng)
    correct_idx = options.index(sound_name)
    question_text = (
        f"Q. You hear a loud, attention-grabbing sound.\n"
        f"   It tells people: \"{action}\"\n\n"
        f"Which warning signal is making this sound?\n\n"
        f"{_build_options_text(options)}"
    )
    return Question(
        node="c5_phy_003", qtype=QType.WARNING.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The sound tells people to: \"{action}\"\n"
            f"  2. Match this action to the warning signal:\n"
            f"     → {sound_name}: {action}\n"
            f"  3. Therefore, the correct answer is option {chr(65+correct_idx)}.\n\n"
            f"SAFETY REMINDER (Indian context):\n"
            f"  In India, fire alarms are mandatory in malls, schools, and hospitals.\n"
            f"  Ambulance sirens have a higher priority on the road — always pull over.\n"
            f"  School bells help organise the day for thousands of students across India."
        ),
        hint=f"What sound tells people to '{action.lower()}'?"
    )


def _gen_action_match(seed: int) -> Question:
    """
    NODE c5_phy_003 | Match the warning signal to the correct action.
    Cognitive: Understand
    """
    rng = _make_seed("c5_phy_003", "action", seed)
    entry = rng.choice(WARNING_SIGNALS)
    signal, action, _ = entry
    all_actions = [(s, a) for s, a, _ in WARNING_SIGNALS]
    correct_action = action
    other_actions = [a for _, a, _ in WARNING_SIGNALS if a != action]
    wrong_actions = rng.sample(other_actions, min(2, len(other_actions)))
    # pad
    filler_actions = [
        "Tells people to start eating lunch immediately",
        "Tells people to sing a song together",
    ]
    while len(wrong_actions) < 3:
        wrong_actions.append(filler_actions[len(wrong_actions) - len(other_actions)])
    options = _shuffle_options(correct_action, wrong_actions[:3], rng)
    correct_idx = options.index(correct_action)
    question_text = (
        f"Q. The '{signal}' sounds.\n"
        f"What does this signal tell people to do?\n\n"
        f"{_build_options_text(options)}"
    )
    return Question(
        node="c5_phy_003", qtype=QType.WARNING.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The signal is the {signal}.\n"
            f"  2. Recall the meaning of the {signal}.\n"
            f"  3. The {signal} tells people to: {action}\n"
            f"  4. Therefore, the correct answer is option {chr(65+correct_idx)}.\n\n"
            f"VERIFICATION:\n"
            f"  ✓ {signal} → {action}\n"
            f"  ✗ Other signals have different meanings and can be ruled out."
        ),
        hint=f"What should you do when you hear the {signal}?"
    )


def _gen_warning_vs_ordinary(seed: int) -> Question:
    """
    NODE c5_phy_003 | Distinguish a warning signal from an ordinary sound.
    Cognitive: Understand
    """
    rng = _make_seed("c5_phy_003", "distinguish", seed)
    entry = rng.choice(WARNING_SIGNALS)
    signal, action, _ = entry
    options_pool = [
        "It is a warning signal — it tells people to do something for their safety",
        "It is just an ordinary sound — it has no special meaning",
        "It is a musical note played for enjoyment",
        "It is a sound from nature",
    ]
    correct_text = options_pool[0]
    rng.shuffle(options_pool)
    correct_idx = options_pool.index(correct_text)
    question_text = (
        f"Q. A '{signal}' sounds in your school.\n"
        f"It tells people: \"{action}\"\n\n"
        f"Is this a warning signal or an ordinary sound?\n\n"
        f"{_build_options_text(options_pool)}"
    )
    return Question(
        node="c5_phy_003", qtype=QType.WARNING.value,
        difficulty=Diff.EASY.value, competency="Board",
        question_text=question_text, options=options_pool,
        correct_index=correct_idx,
        explanation=(
            f"STEP-BY-STEP ANSWER:\n"
            f"  1. The '{signal}' is sounding.\n"
            f"  2. It gives an important message: '{action}'\n"
            f"  3. A warning signal is a special sound that tells people"
            f" to act quickly for safety.\n"
            f"  4. An ordinary sound (like a radio playing) does not give an urgent message.\n"
            f"  5. Therefore, this IS a warning signal → option {chr(65+correct_idx)}.\n\n"
            f"DIFFERENCE:\n"
            f"  Warning signal → loud, urgent, tells you what to DO.\n"
            f"  Ordinary sound → may be soft, does not demand immediate action."
        ),
        hint="Does this sound make people do something important and urgent?"
    )


# ──────────────────────────────────────────────
#  MAIN SOLVER ENTRY POINTS
# ──────────────────────────────────────────────

# Registry: node → (question_type → generator)
_GENERATORS = {
    NodeID.C5_PHY_001.value: {
        "match":        _gen_match_sound,
        "identify":     _gen_identify_object,
        "count":        _gen_count_objects,
    },
    NodeID.C5_PHY_002.value: {
        "classify":     _gen_classify_sound,
        "example":      _gen_give_example,
        "why_pleasant": _gen_why_pleasant,
    },
    NodeID.C5_PHY_003.value: {
        "signal":       _gen_warning_signal,
        "action":       _gen_action_match,
        "distinguish":  _gen_warning_vs_ordinary,
    },
}


def generate_question(
    node: str,
    qtype: Optional[str] = None,
    seed: int = 42,
) -> Question:
    """
    Generate a single practice question for the given node.

    Parameters
    ----------
    node    : one of 'c5_phy_001', 'c5_phy_002', 'c5_phy_003'
    qtype   : question subtype (optional; random if omitted)
    seed    : integer seed for reproducibility

    Returns
    -------
    Question dataclass with full explanation
    """
    node = node.lower().strip()
    if node not in _GENERATORS:
        raise ValueError(f"Unknown node '{node}'. Choose from: {list(_GENERATORS)}")

    registry = _GENERATORS[node]
    if qtype is None:
        qtype = random.Random(seed).choice(list(registry.keys()))
    qtype = qtype.lower().strip()
    if qtype not in registry:
        raise ValueError(
            f"Unknown qtype '{qtype}' for node '{node}'. "
            f"Choose from: {list(registry)}"
        )
    return registry[qtype](seed)


def generate_quiz(
    nodes: Optional[List[str]] = None,
    seed: int = 42,
    per_node: int = 1,
) -> List[Question]:
    """
    Generate a balanced quiz across requested nodes.

    Parameters
    ----------
    nodes   : list of node IDs (default: all three)
    seed    : master seed
    per_node: questions per node

    Returns
    -------
    List of Question objects
    """
    if nodes is None:
        nodes = list(_GENERATORS.keys())
    rng = _make_seed("quiz", seed)
    questions: List[Question] = []
    for node in nodes:
        for i in range(per_node):
            q = generate_question(node, seed=rng.randint(0, 9999))
            questions.append(q)
    return questions


def verify_answer(question: Question, selected_index: int) -> VerificationResult:
    """
    Verify a student's answer against the correct one.

    Parameters
    ----------
    question       : the Question object
    selected_index : zero-based index of the student's choice

    Returns
    -------
    VerificationResult
    """
    is_correct = (selected_index == question.correct_index)
    return VerificationResult(
        is_correct=is_correct,
        selected_index=selected_index,
        correct_index=question.correct_index,
        user_choice=question.options[selected_index],
        correct_choice=question.options[question.correct_index],
        explanation=(
            f"{'✅ CORRECT!' if is_correct else '❌ NOT QUITE RIGHT.'}\n\n"
            f"Your answer : ({chr(65+selected_index)}) {question.options[selected_index]}\n"
            f"Correct ans : ({chr(65+question.correct_index)}) {question.options[question.correct_index]}\n\n"
            + question.explanation
        ),
    )


def print_quiz(questions: List[Question]) -> None:
    """Pretty-print a list of questions."""
    for i, q in enumerate(questions, 1):
        print(f"{'='*60}")
        print(f"Q{i} [{q.node.upper()}] | Type: {q.qtype} | Level: {q.difficulty}")
        print(f"{'='*60}")
        print(q.question_text)
        print()


# ──────────────────────────────────────────────
#  STANDALONE DEMO
# ──────────────────────────────────────────────

if __name__ == "__main__":
    print("╔══════════════════════════════════════════════════════════╗")
    print("║     Class 5 Physics — Solver Demo (3 nodes)             ║")
    print("╚══════════════════════════════════════════════════════════╝\n")

    for node_id in ["c5_phy_001", "c5_phy_002", "c5_phy_003"]:
        print(f"\n{'─'*60}")
        print(f"  NODE: {node_id}")
        print(f"{'─'*60}")
        q = generate_question(node_id, seed=2024)
        print(q.question_text)
        print(f"\n[Correct answer: {chr(65+q.correct_index)}] {q.options[q.correct_index]}")
        # Simulate student picking wrong option (index 1) for c5_phy_002
        if node_id == "c5_phy_002":
            result = verify_answer(q, selected_index=1)
        else:
            result = verify_answer(q, selected_index=q.correct_index)
        print(f"\n{result.explanation[:300]}...")

    print("\n\n── Full Quiz (seed=42, 1 per node) ──")
    quiz = generate_quiz(seed=42, per_node=1)
    print_quiz(quiz)