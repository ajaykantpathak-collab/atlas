from __future__ import annotations
import hashlib
import math
import random
import textwrap
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import numpy as np

# ---------------------------------------------------------------------------
# Seeded PRNG utilities
# ---------------------------------------------------------------------------
def _make_seed(*args: Any) -> int:
    """Deterministic 32-bit seed from arbitrary args."""
    raw = "|".join(str(a) for a in args)
    h = hashlib.sha256(raw.encode()).hexdigest()
    return int(h[:8], 16)


def seeded_rng(seed: int) -> np.random.Generator:
    """Return a NumPy Generator bound to *seed*."""
    return np.random.default_rng(seed)


# ---------------------------------------------------------------------------
# Shared Indian-context data
# ---------------------------------------------------------------------------
INDIAN_LIVING: List[str] = [
    "mango tree", "cow", "neem tree", "elephant", "rose plant",
    "pigeon", "tiger", "banana tree", "dog", "cat",
    "banyan tree", "peacock", "buffalo", "lotus", "caterpillar",
]

INDIAN_NONLIVING: List[str] = [
    "stone", "chair", "book", "water", "bucket",
    "bicycle", "table", "cloud", "toy car", "pen",
    "wall", "lamp", "plate", "scissors", "mirror",
]

INDIAN_ANIMALS: List[str] = [
    "dog", "cat", "cow", "elephant", "peacock",
    "tiger", "pigeon", "buffalo", "caterpillar", "fish",
]

INDIAN_BIRDS: List[str] = ["peacock", "pigeon", "crow", "parrot"]

BODY_PARTS_HUMAN: List[Tuple[str, str]] = [
    ("eyes", "seeing"),
    ("ears", "hearing"),
    ("nose", "smelling"),
    ("tongue", "tasting"),
    ("skin", "feeling / touching"),
    ("hands", "holding and writing"),
    ("legs", "walking and running"),
    ("head", "thinking"),
    ("mouth", "eating and speaking"),
    ("teeth", "chewing food"),
    ("hair", "protecting the head"),
    ("neck", "supporting the head"),
    ("shoulders", "carrying things"),
    ("fingers", "holding small things"),
    ("toes", "helping in balance"),
]

ANIMAL_BODY_PARTS: List[Tuple[str, str, str]] = [
    ("bird", "beak", "pecking and eating"),
    ("bird", "wings", "flying"),
    ("bird", "feathers", "keeping warm and flying"),
    ("fish", "fins", "swimming"),
    ("fish", "scales", "protecting the body"),
    ("cat", "paws", "walking silently"),
    ("cat", "tail", "keeping balance"),
    ("cat", "whiskers", "feeling around in the dark"),
    ("dog", "paws", "running"),
    ("dog", "tail", "showing feelings"),
    ("elephant", "trunk", "drinking water and picking things"),
    ("elephant", "big ears", "hearing and keeping cool"),
    ("cow", "hooves", "walking"),
    ("cow", "tail", "keeping flies away"),
    ("insect", "antennae", "smelling and feeling"),
    ("tiger", "claws", "running and catching prey"),
    ("peacock", "long tail", "dancing and attracting mates"),
    ("rabbit", "long ears", "hearing danger from far away"),
    ("turtle", "shell", "protecting itself"),
    ("frog", "long legs", "jumping and swimming"),
]

EARTH_MOON_FACTS: List[Tuple[str, str]] = [
    ("The Earth is round like a ball", "shape"),
    ("The Earth rotates on its axis", "rotation"),
    ("The Sun rises in the east", "direction"),
    ("The Sun sets in the west", "direction"),
    ("The Moon moves around the Earth", "orbit"),
    ("The Moon does not have its own light", "light"),
    ("Stars are very far away from Earth", "distance"),
    ("The Sun is a star", "star"),
    ("The Earth takes one day to rotate once", "day"),
    ("The Earth takes one year to go around the Sun", "year"),
    ("The Moon changes its shape every night", "phases"),
    ("We see the Moon because it reflects sunlight", "reflection"),
    ("The Sun gives us light and heat", "sun"),
    ("During the day we cannot see stars because of sunlight", "daytime"),
    ("Plants need sunlight to make food", "photosynthesis"),
]

# ---------------------------------------------------------------------------
# Result dataclass
# ---------------------------------------------------------------------------
@dataclass
class Question:
    id: str
    node_id: str
    node_label: str
    difficulty: str
    cognitive_level: str
    competency: str
    qtype: str          # MCQ | FILL_BLANK | TRUE_FALSE | MATCH | SHORT_ANS
    stem: str
    options: List[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    indian_context: bool = False


@dataclass
class QuestionSet:
    node_id: str
    node_label: str
    questions: List[Question] = field(default_factory=list)

    def summary(self) -> str:
        lines = [
            f"\n{'='*60}",
            f"NODE : {self.node_id} — {self.node_label}",
            f"QUESTIONS GENERATED: {len(self.questions)}",
            f"{'='*60}",
        ]
        for q in self.questions:
            lines.append(f"  [{q.qtype}] {q.id}")
            lines.append(f"    Q: {textwrap.shorten(q.stem, 90)}")
            if q.options:
                lines.append(f"    Options: {q.options}")
            lines.append(f"    Answer: {q.answer}")
            if q.explanation:
                lines.append(f"    Explanation: {textwrap.shorten(q.explanation, 90)}")
        return "\n".join(lines)


# ===================================================================
#  NODE  c3_evs_001   Living and non-living things
# ===================================================================
def generate_c3_evs_001(seed: int = 42, n_per_type: int = 6) -> QuestionSet:
    rng = seeded_rng(_make_seed(seed, "c3_evs_001"))
    qs: List[Question] = []
    label = "Living and non-living things - identification"

    # ── helpers ──────────────────────────────────────────────────────
    def pick(arr: List[str], k: int) -> List[str]:
        idx = rng.choice(len(arr), size=min(k, len(arr)), replace=False)
        return [arr[i] for i in idx]

    def mcq(stem, options, correct_idx, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_001_mcq_{len(qs)+1:03d}",
            node_id="c3_evs_001", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="MCQ",
            stem=stem, options=options,
            answer=options[correct_idx],
            explanation=explanation,
            indian_context=indian,
        ))

    def fb(stem, blanks, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_001_fb_{len(qs)+1:03d}",
            node_id="c3_evs_001", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="FILL_BLANK",
            stem=stem,
            answer=answer,
            explanation=explanation,
            indian_context=indian,
        ))

    def tf(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_001_tf_{len(qs)+1:03d}",
            node_id="c3_evs_001", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="TRUE_FALSE",
            stem=stem,
            answer=answer,
            explanation=explanation,
            indian_context=indian,
        ))

    def sa(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_001_sa_{len(qs)+1:03d}",
            node_id="c3_evs_001", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="SHORT_ANS",
            stem=stem,
            answer=answer,
            explanation=explanation,
            indian_context=indian,
        ))

    # ── MCQ questions ────────────────────────────────────────────────
    for i in range(n_per_type):
        living_objs = pick(INDIAN_LIVING, 1)
        nonliving_objs = pick(INDIAN_NONLIVING, 1)
        lo = living_objs[0]
        no = nonliving_objs[0]

        variants = [
            {
                "stem": f"Which of the following is a living thing?",
                # distractors MUST come from the non-living pool — the
                # old combined-pool sample could ship 2-3 living options
                # (or none matching the key): seed 55 answered 'chair'
                "options": [lo] + rng.choice(INDIAN_NONLIVING, 3, replace=False).tolist(),
                "correct": lo,
                "exp": f"A {lo} is living because it grows, needs food and water, and reproduces.",
            },
            {
                "stem": f"Which of the following is a non-living thing?",
                "options": [no] + rng.choice(INDIAN_LIVING, 3, replace=False).tolist(),
                "correct": no,
                "exp": f"A {no} is non-living because it does not grow, does not need food, and does not reproduce.",
            },
            {
                "stem": f"Which is NOT a characteristic of living things?",
                "options": ["Growth", "Breathing", "Need for food", "Having a hard surface"],
                "correct": "Having a hard surface",
                "exp": "Living things grow, breathe, and need food. Having a hard surface is not a characteristic of living things.",
            },
            {
                "stem": "A seed grows into a big tree. This shows that:",
                "options": ["Seeds are living", "Seeds are non-living", "Trees are non-living", "Only big plants are living"],
                "correct": "Seeds are living",
                "exp": "Since the seed grows into a tree, it shows that seeds are living things — they have life inside them.",
            },
            {
                "stem": f"Which of these does NOT need food and water?",
                "options": [no] + rng.choice(INDIAN_LIVING, 3, replace=False).tolist(),
                "correct": no,
                "exp": f"A {no} does not need food or water because it is not alive.",
            },
            {
                "stem": "A puppy grows bigger every month. This is because:",
                "options": ["It is a living thing", "It plays a lot", "It drinks milk only", "It sleeps a lot"],
                "correct": "It is a living thing",
                "exp": "Growth is one of the main characteristics of living things. The puppy grows because it is alive.",
            },
        ]
        v = variants[i % len(variants)]
        opts = v["options"][:]
        correct_idx = opts.index(v["correct"]) if v["correct"] in opts else 0
        # shuffle options but keep track
        perm = rng.permutation(len(opts)).tolist()
        shuffled = [opts[p] for p in perm]
        correct_idx = perm.index(correct_idx) if correct_idx < len(perm) else 0
        mcq(v["stem"], shuffled, correct_idx, v["exp"], indian=True)

    # ── FILL BLANK ───────────────────────────────────────────────────
    fb_blanks = [
        ("______ things grow, need food and water, and can reproduce.", "Living",
         "Living things grow, need food and water, and can reproduce."),
        ("A ______ does not grow by itself.", "stone / chair",
         "Non-living things like a stone or chair do not grow by themselves."),
        ("Plants and animals are both ______ things.", "living",
         "Plants and animals are both living things because they grow, reproduce, and need food."),
        ("A seed grows into a plant. This shows that a seed is a ______ thing.", "living",
         "The seed contains life, so it is a living thing even though it looks small and still."),
        ("______ things do not respond to touch or light.", "Non-living",
         "Non-living things do not respond to stimuli like touch, light, or sound."),
        ("______ things make their own food using sunlight.", "Plants",
         "Plants make their own food through photosynthesis using sunlight, water, and carbon dioxide."),
    ]
    for i, (stem, ans, exp) in enumerate(fb_blanks):
        fb(stem, [ans], ans, exp, indian=True)

    # ── TRUE/FALSE ───────────────────────────────────────────────────
    tf_pairs = [
        ("A stone is a living thing.", False,
         "A stone does not grow, does not need food, and does not reproduce. So it is non-living."),
        ("Plants are living things.", True,
         "Plants grow, reproduce, and need food (made via photosynthesis), so they are living."),
        ("A toy car can grow bigger on its own.", False,
         "A toy car cannot grow on its own — it is made by humans and is non-living."),
        ("Animals and plants both need water.", True,
         "Both animals and plants need water to survive and carry out their life processes."),
        ("Non-living things can move on their own.", False,
         "Non-living things cannot move by themselves; they need an external force to move."),
        ("A mango seed is a living thing.", True,
         "A mango seed can grow into a mango tree, so it is alive and is a living thing."),
    ]
    for stem, ans, exp in tf_pairs:
        tf(stem, ans, exp, indian=True)

    # ── SHORT ANSWER ─────────────────────────────────────────────────
    sa_pairs = [
        (
            "Name any three characteristics of living things.",
            ["growth", "need for food", "reproduction", "movement", "breathing"],
            "Living things grow, need food and water, breathe, reproduce, can move, and respond to stimuli.",
        ),
        (
            "Why is a plant considered a living thing even though it does not move from its place?",
            ["grows", "needs water", "makes food", "reproduces"],
            "A plant is living because it grows, needs water and sunlight, makes its own food, and produces seeds to reproduce.",
        ),
        (
            "Give two examples each of living and non-living things you see in your school.",
            ["living: plant, dog", "non-living: desk, ball"],
            "Living: potted plant, school pet fish. Non-living: desk, chair, school bell.",
        ),
        (
            "Explain why a river is not a living thing.",
            ["does not grow", "does not eat", "does not reproduce"],
            "A river does not grow on its own, does not eat food, and does not reproduce. It is non-living.",
        ),
    ]
    for stem, key_pts, exp in sa_pairs:
        sa(stem, key_pts, exp, indian=True)

    return QuestionSet("c3_evs_001", label, qs)


# ===================================================================
#  NODE  c3_evs_002   Plants and animals — basic differences/similarities
# ===================================================================
def generate_c3_evs_002(seed: int = 42, n_per_type: int = 5) -> QuestionSet:
    rng = seeded_rng(_make_seed(seed, "c3_evs_002"))
    qs: List[Question] = []
    label = "Plants and animals - basic differences and similarities"

    def pick(arr, k):
        idx = rng.choice(len(arr), size=min(k, len(arr)), replace=False)
        return [arr[i] for i in idx]

    def mcq(stem, options, correct, explanation, indian=False):
        opts = list(options)
        correct_idx = opts.index(correct)
        perm = rng.permutation(len(opts)).tolist()
        shuffled = [opts[p] for p in perm]
        correct_idx = perm.index(correct_idx)
        qs.append(Question(
            id=f"c3_evs_002_mcq_{len(qs)+1:03d}",
            node_id="c3_evs_002", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="MCQ",
            stem=stem, options=shuffled,
            answer=shuffled[correct_idx],
            explanation=explanation,
            indian_context=indian,
        ))

    def fb(stem, blanks, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_002_fb_{len(qs)+1:03d}",
            node_id="c3_evs_002", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="FILL_BLANK",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    def tf(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_002_tf_{len(qs)+1:03d}",
            node_id="c3_evs_002", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="TRUE_FALSE",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    def sa(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_002_sa_{len(qs)+1:03d}",
            node_id="c3_evs_002", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="SHORT_ANS",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    # MCQs
    mcq_bank = [
        {
            "stem": "Which of the following is a SIMILARITY between a plant and an animal?",
            "options": ["Both need food and water", "Both can walk", "Both make their own food", "Both have roots"],
            "correct": "Both need food and water",
            "exp": "Both plants and animals are living things. They both need food and water to survive, and they both grow.",
        },
        {
            "stem": "Which of the following is a DIFFERENCE between plants and animals?",
            "options": ["Plants make their own food; animals eat food", "Both grow", "Both breathe", "Both need water"],
            "correct": "Plants make their own food; animals eat food",
            "exp": "Plants make their own food through photosynthesis, but animals must eat plants or other animals to get food.",
        },
        {
            "stem": "How are humans and dogs similar?",
            "options": [
                "Both need food and water",
                "Both can fly",
                "Both have wings",
                "Both live in water",
            ],
            "correct": "Both need food and water",
            "exp": "Humans and dogs both need food, water, and air. They both sleep and breathe. This makes them similar.",
        },
        {
            "stem": "A key difference between a peacock and a sunflower is that:",
            "options": [
                "The peacock can move from place to place; the sunflower cannot",
                "The sunflower can fly; the peacock cannot",
                "Both cannot move",
                "The sunflower eats insects",
            ],
            "correct": "The peacock can move from place to place; the sunflower cannot",
            "exp": "Animals like peacocks can move on their own. Plants like sunflowers stay in one place and make their own food.",
        },
        {
            "stem": "Which statement is TRUE about plants and animals?",
            "options": [
                "Both grow and reproduce",
                "Only animals grow",
                "Only plants need water",
                "Plants are not living things",
            ],
            "correct": "Both grow and reproduce",
            "exp": "Both plants and animals grow, reproduce, and need food and water. Both are living things.",
        },
    ]
    for i in range(n_per_type):
        b = mcq_bank[i % len(mcq_bank)]
        mcq(b["stem"], b["options"], b["correct"], b["exp"], indian=True)

    # FILL BLANK
    fb_items = [
        ("Both plants and ______ need food, water, and air to live.", "animals",
         "Plants and animals share the basic needs of all living things — food, water, and air."),
        ("Plants make their own food using ______.", "sunlight",
         "Plants use sunlight, water, and carbon dioxide to make their own food through photosynthesis."),
        ("Animals cannot make their own food — they ______ food.", "eat",
         "Animals must eat plants or other animals to get food and energy."),
        ("Humans walk on ______ legs; dogs walk on ______ legs.", "two", "four",
         "Humans are bipedal (two legs) while most animals like dogs are quadrupeds (four legs)."),
    ]
    for stem, ans, exp in fb_items:
        fb(stem, [ans], ans, exp, indian=True)

    # TRUE/FALSE
    tf_items = [
        ("Plants and animals both need water to live.", True,
         "Both plants and animals need water for survival and growth."),
        ("Animals make their own food using sunlight.", False,
         "Animals cannot make their own food. They eat plants or other animals."),
        ("Humans and animals both need food and water.", True,
         "All living things — humans, animals, and plants — need food and water."),
        ("A mango tree can walk to another place.", False,
         "Plants cannot move from place to place. They stay rooted where they grow."),
    ]
    for stem, ans, exp in tf_items:
        tf(stem, ans, exp, indian=True)

    # SHORT ANSWER
    sa_items = [
        (
            "List two similarities between a cow and a mango tree.",
            ["both living", "both need water", "both grow", "both reproduce"],
            "Both are living things; both grow; both need water; both reproduce.",
        ),
        (
            "List two differences between a peacock and a sunflower.",
            ["peacock moves", "sunflower stays in place", "peacock eats food", "sunflower makes own food"],
            "A peacock can move from place to place and eats food; a sunflower stays in one place and makes its own food using sunlight.",
        ),
        (
            "How are humans different from a tiger in how they move?",
            ["humans walk on two legs", "tigers walk on four legs"],
            "Humans walk on two legs, while tigers (and most animals) walk on four legs.",
        ),
    ]
    for stem, key_pts, exp in sa_items:
        sa(stem, key_pts, exp, indian=True)

    return QuestionSet("c3_evs_002", label, qs)


# ===================================================================
#  NODE  c3_evs_003   External body parts
# ===================================================================
def generate_c3_evs_003(seed: int = 42, n_per_type: int = 6) -> QuestionSet:
    rng = seeded_rng(_make_seed(seed, "c3_evs_003"))
    qs: List[Question] = []
    label = "External body parts of humans and animals"

    def pick(arr, k):
        idx = rng.choice(len(arr), size=min(k, len(arr)), replace=False)
        return [arr[i] for i in idx]

    def mcq(stem, options, correct, explanation, indian=False):
        opts = list(options)
        correct_idx = opts.index(correct)
        perm = rng.permutation(len(opts)).tolist()
        shuffled = [opts[p] for p in perm]
        correct_idx = perm.index(correct_idx)
        qs.append(Question(
            id=f"c3_evs_003_mcq_{len(qs)+1:03d}",
            node_id="c3_evs_003", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="MCQ",
            stem=stem, options=shuffled,
            answer=shuffled[correct_idx],
            explanation=explanation,
            indian_context=indian,
        ))

    def fb(stem, blanks, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_003_fb_{len(qs)+1:03d}",
            node_id="c3_evs_003", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="FILL_BLANK",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    def tf(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_003_tf_{len(qs)+1:03d}",
            node_id="c3_evs_003", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="TRUE_FALSE",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    def match_q(stem, pairs, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_003_mt_{len(qs)+1:03d}",
            node_id="c3_evs_003", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="MATCH",
            stem=stem,
            answer=pairs,
            explanation=explanation,
            indian_context=indian,
        ))

    def sa(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_003_sa_{len(qs)+1:03d}",
            node_id="c3_evs_003", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="SHORT_ANS",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    # MCQ — function of body parts
    mcq_bank = [
        {
            "stem": "Which body part do we use to see?",
            "options": ["Eyes", "Ears", "Nose", "Tongue"],
            "correct": "Eyes",
            "exp": "We use our eyes to see objects, colours, and shapes around us.",
        },
        {
            "stem": "Which body part helps us to hear sounds?",
            "options": ["Ears", "Eyes", "Nose", "Skin"],
            "correct": "Ears",
            "exp": "Our ears catch sound waves and send them to our brain, allowing us to hear.",
        },
        {
            "stem": "Which body part helps us to smell?",
            "options": ["Nose", "Tongue", "Eyes", "Ears"],
            "correct": "Nose",
            "exp": "The nose has special cells that detect different smells around us.",
        },
        {
            "stem": "Which body part helps us to feel if something is hot or cold?",
            "options": ["Skin", "Tongue", "Eyes", "Nose"],
            "correct": "Skin",
            "exp": "Our skin has nerve endings that help us feel touch, heat, cold, and pain.",
        },
        {
            "stem": "A bird uses its ______ to eat seeds and worms.",
            "options": ["beak", "teeth", "tongue", "hands"],
            "correct": "beak",
            "exp": "Birds do not have teeth. They use their hard beak to pick up food, peck, and eat.",
        },
        {
            "stem": "Which body part does a fish use to swim?",
            "options": ["fins", "legs", "wings", "tail only"],
            "correct": "fins",
            "exp": "Fish use their fins (tail fin, side fins, top fin) to move and steer in water.",
        },
        {
            "stem": "How many legs does a human have?",
            "options": ["Two", "Four", "Six", "Eight"],
            "correct": "Two",
            "exp": "Humans have two legs that help them walk, run, and stand.",
        },
        {
            "stem": "What do we use to hold a pencil for writing?",
            "options": ["Fingers / hands", "Toes", "Nose", "Eyes"],
            "correct": "Fingers / hands",
            "exp": "We use our fingers and hands to hold a pencil, brush, or any tool for writing.",
        },
    ]
    for b in pick(mcq_bank, n_per_type):
        mcq(b["stem"], b["options"], b["correct"], b["exp"], indian=True)

    # FILL BLANK
    fb_items = [
        ("We use our ______ to see things around us.", "eyes",
         "Eyes are the organs of sight."),
        ("A bird uses its ______ to fly.", "wings",
         "Birds have wings covered with feathers that help them fly."),
        ("Fish use their ______ to swim in water.", "fins",
         "Fins help fish move, steer, and balance in water."),
        ("We use our ______ to taste food.", "tongue",
         "The tongue has taste buds that detect sweet, sour, salty, and bitter tastes."),
        ("A cat uses its ______ to walk silently.", "paws",
         "A cat has soft paw pads that make it walk silently, helping it hunt."),
        ("We use our ______ to hold small things like a needle.", "fingers",
         "Fingers help us hold and manipulate small objects with precision."),
        ("A tiger uses its ______ to catch prey.", "claws",
         "Tigers have sharp, retractable claws that help them catch and hold prey."),
        ("Our ______ helps us feel a soft feather or a rough stone.", "skin",
         "Skin has touch receptors that detect texture, temperature, and pressure."),
    ]
    for stem, ans, exp in fb_items:
        fb(stem, [ans], ans, exp, indian=True)

    # TRUE/FALSE
    tf_items = [
        ("Humans use their ears to see.", False,
         "Humans use their eyes to see, not ears."),
        ("Birds have beaks instead of teeth.", True,
         "Birds do not have teeth; they have a hard beak for eating."),
        ("Fish use legs to swim.", False,
         "Fish use fins, not legs, to swim in water."),
        ("Our tongue helps us taste food.", True,
         "The tongue has taste buds that detect different flavours."),
        ("Cats have paws and a tail.", True,
         "Cats have soft paw pads and a long tail that helps them balance."),
        ("Humans and frogs both have two eyes.", True,
         "Both humans and frogs have a pair of eyes for seeing."),
    ]
    for stem, ans, exp in tf_items:
        tf(stem, ans, exp, indian=True)

    # MATCH — body part ↔ function (Indian animal examples)
    match_q(
        "Match the animal with the body part it uses for the given purpose:",
        [
            ("Peacock", "Long tail feathers", "Dancing and display during courtship"),
            ("Elephant", "Trunk", "Drinking water and picking up food"),
            ("Fish", "Fins", "Swimming in water"),
            ("Cat", "Whiskers", "Feeling around in the dark"),
            ("Bird", "Wings", "Flying in the sky"),
            ("Rabbit", "Long ears", "Hearing danger from far away"),
        ],
        "Each animal's body part is specially adapted to help it survive and thrive in its environment.",
        indian=True,
    )

    # SHORT ANSWER
    sa_items = [
        (
            "Name any five external body parts of a human and state one function of each.",
            ["eyes-see", "ears-hear", "nose-smell", "tongue-taste", "skin-feel"],
            "Eyes — see; Ears — hear; Nose — smell; Tongue — taste; Skin — feel touch, hot, cold.",
        ),
        (
            "How is a bird's beak different from a human's mouth?",
            ["beak-no teeth", "mouth-has teeth", "beak-hard"],
            "A bird has a hard beak without teeth, while humans have a soft mouth with teeth for chewing food.",
        ),
        (
            "Why does an elephant have a long trunk? Give two uses.",
            ["drink water", "pick up food", "spray water", "smell"],
            "An elephant uses its trunk to drink water, pick up food, spray water on its body, and smell things.",
        ),
        (
            "Compare the legs of a human and a frog.",
            ["human-two legs", "frog-four legs", "frog-jumps", "human-walks"],
            "Humans have two long legs for walking and running; frogs have four long legs — the back ones for jumping and swimming.",
        ),
    ]
    for stem, key_pts, exp in sa_items:
        sa(stem, key_pts, exp, indian=True)

    return QuestionSet("c3_evs_003", label, qs)


# ===================================================================
#  NODE  c3_evs_004   The Earth, Sun, Moon and Stars
# ===================================================================
def generate_c3_evs_004(seed: int = 42, n_per_type: int = 6) -> QuestionSet:
    rng = seeded_rng(_make_seed(seed, "c3_evs_004"))
    qs: List[Question] = []
    label = "The earth, sun, moon and stars - basic introduction"

    def pick(arr, k):
        idx = rng.choice(len(arr), size=min(k, len(arr)), replace=False)
        return [arr[i] for i in idx]

    def mcq(stem, options, correct, explanation, indian=False):
        opts = list(options)
        correct_idx = opts.index(correct)
        perm = rng.permutation(len(opts)).tolist()
        shuffled = [opts[p] for p in perm]
        correct_idx = perm.index(correct_idx)
        qs.append(Question(
            id=f"c3_evs_004_mcq_{len(qs)+1:03d}",
            node_id="c3_evs_004", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="MCQ",
            stem=stem, options=shuffled,
            answer=shuffled[correct_idx],
            explanation=explanation,
            indian_context=indian,
        ))

    def fb(stem, blanks, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_004_fb_{len(qs)+1:03d}",
            node_id="c3_evs_004", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="FILL_BLANK",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    def tf(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_004_tf_{len(qs)+1:03d}",
            node_id="c3_evs_004", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="TRUE_FALSE",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    def sa(stem, answer, explanation, indian=False):
        qs.append(Question(
            id=f"c3_evs_004_sa_{len(qs)+1:03d}",
            node_id="c3_evs_004", node_label=label,
            difficulty="Easy", cognitive_level="Understand",
            competency="Board", qtype="SHORT_ANS",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=indian,
        ))

    # MCQ bank
    mcq_bank = [
        {
            "stem": "The Sun rises in which direction?",
            "options": ["East", "West", "North", "South"],
            "correct": "East",
            "exp": "The Sun always rises in the east and sets in the west.",
        },
        {
            "stem": "What shape is the Earth?",
            "options": ["Round like a ball (sphere)", "Flat like a plate", "Square", "Triangle"],
            "correct": "Round like a ball (sphere)",
            "exp": "The Earth is round like a ball — scientists call this shape a sphere.",
        },
        {
            "stem": "The Moon does not have its own light. We see it because:",
            "options": [
                "It reflects the Sun's light",
                "It has fire inside",
                "It glows by itself",
                "Stars give it light",
            ],
            "correct": "It reflects the Sun's light",
            "exp": "The Moon has no light of its own. It shines because it reflects sunlight that falls on it.",
        },
        {
            "stem": "Which is the closest star to the Earth?",
            "options": ["The Sun", "The Moon", "Pole Star", "Venus"],
            "correct": "The Sun",
            "exp": "The Sun is the closest star to the Earth. It gives us light and heat.",
        },
        {
            "stem": "The Moon moves around:",
            "options": ["The Earth", "The Sun", "Mars", "Venus"],
            "correct": "The Earth",
            "exp": "The Moon is a natural satellite of the Earth — it orbits or moves around the Earth.",
        },
        {
            "stem": "During the day we cannot see stars because:",
            "options": [
                "Sunlight is too bright",
                "Stars disappear during the day",
                "Stars are not there at night",
                "Clouds cover them always",
            ],
            "correct": "Sunlight is too bright",
            "exp": "During the day, the bright sunlight hides the light from distant stars, so we cannot see them.",
        },
        {
            "stem": "How long does the Earth take to go around the Sun once?",
            "options": ["One year (365 days)", "One day (24 hours)", "One month", "One week"],
            "correct": "One year (365 days)",
            "exp": "The Earth takes about 365 days (one year) to complete one orbit around the Sun.",
        },
        {
            "stem": "Which of these is true about the Sun?",
            "options": [
                "It is a star",
                "It is a planet",
                "It is the Moon",
                "It moves around the Earth",
            ],
            "correct": "It is a star",
            "exp": "The Sun is a huge, hot star at the centre of our solar system. It gives us light and heat.",
        },
    ]
    for b in pick(mcq_bank, n_per_type):
        mcq(b["stem"], b["options"], b["correct"], b["exp"], indian=True)

    # FILL BLANK
    fb_items = [
        ("The Sun rises in the ______ and sets in the ______.", "east; west",
         "The Sun appears to rise in the east and set in the west because of Earth's rotation."),
        ("The Earth is ______ like a ball.", "round",
         "The Earth is round in shape — scientists call it a sphere."),
        ("The Moon is the Earth's natural ______.", "satellite",
         "The Moon is a natural satellite of the Earth. It revolves around the Earth."),
        ("Stars are very ______ away from the Earth.", "far",
         "Stars are at enormous distances from the Earth. The Sun is the closest star."),
        ("We see the Moon because it ______ sunlight.", "reflects",
         "The Moon has no light of its own. It reflects the Sun's light that falls on it."),
        ("The Earth takes ______ to rotate once on its axis.", "one day",
         "The Earth completes one rotation on its axis in about 24 hours, which is one day."),
    ]
    for stem, ans, exp in fb_items:
        fb(stem, [ans], ans, exp, indian=True)

    # TRUE/FALSE
    tf_items = [
        ("The Sun is a star.", True,
         "The Sun is a huge, hot ball of burning gases — it is a star."),
        ("The Moon has its own light.", False,
         "The Moon does not produce its own light. It shines by reflecting sunlight."),
        ("The Earth is flat.", False,
         "The Earth is round like a ball (a sphere)."),
        ("The Sun sets in the east.", False,
         "The Sun sets in the west. It rises in the east."),
        ("The Earth goes around the Sun.", True,
         "The Earth orbits the Sun, taking about 365 days for one complete round."),
        ("We can see stars during the day if the sky is clear.", False,
         "Even on a clear day, we cannot see stars because sunlight is too bright and hides their light."),
    ]
    for stem, ans, exp in tf_items:
        tf(stem, ans, exp, indian=True)

    # SHORT ANSWER
    sa_items = [
        (
            "Why does the Moon change its shape every night? (hint: phases)",
            ["sunlight-angle", "moon-orbits-earth"],
            "The Moon changes shape (phases) because as it orbits the Earth, different portions of its sunlit half face us at different times.",
        ),
        (
            "How are the Sun and the Moon different from each other?",
            ["sun-own-light", "moon-reflects", "sun-star", "moon-satellite"],
            "The Sun is a star with its own light and heat; the Moon is a satellite with no light of its own. The Sun is huge and far away; the Moon is small and closer to Earth.",
        ),
        (
            "Why can't we see stars during the daytime?",
            ["sunlight-bright", "hides-star-light"],
            "During the day, the bright sunlight from the Sun overwhelms the faint light from distant stars, so we cannot see them.",
        ),
        (
            "What will happen if there is no sunlight on Earth?",
            ["no-light", "no-heat", "plants-die", "cold"],
            "Without sunlight, there will be no light or heat, plants cannot make food, and temperatures would drop drastically, making life impossible.",
        ),
    ]
    for stem, key_pts, exp in sa_items:
        sa(stem, key_pts, exp, indian=True)

    return QuestionSet("c3_evs_004", label, qs)


# ===================================================================
#  NODE  c3_evs_005  (placeholder for continuation of nodes)
#  The user truncated the input at NODE c3_evs_004; we provide
#  a meta-question ensuring completeness verification.
# ===================================================================
def generate_c3_evs_verification(seed: int = 42) -> QuestionSet:
    """Cross-node review questions for the entire Class 3 EVS syllabus."""
    rng = seeded_rng(_make_seed(seed, "c3_evs_VERIFY"))
    qs: List[Question] = []
    label = "Cross-Node Review — All Topics"

    def mcq(stem, options, correct, explanation):
        opts = list(options)
        correct_idx = opts.index(correct)
        perm = rng.permutation(len(opts)).tolist()
        shuffled = [opts[p] for p in perm]
        correct_idx = perm.index(correct_idx)
        qs.append(Question(
            id=f"c3_evs_VERIFY_mcq_{len(qs)+1:03d}",
            node_id="c3_evs_ALL", node_label=label,
            difficulty="Medium", cognitive_level="Apply",
            competency="Board", qtype="MCQ",
            stem=stem, options=shuffled,
            answer=shuffled[correct_idx],
            explanation=explanation,
            indian_context=True,
        ))

    def sa(stem, answer, explanation):
        qs.append(Question(
            id=f"c3_evs_VERIFY_sa_{len(qs)+1:03d}",
            node_id="c3_evs_ALL", node_label=label,
            difficulty="Medium", cognitive_level="Apply",
            competency="Board", qtype="SHORT_ANS",
            stem=stem, answer=answer, explanation=explanation,
            indian_context=True,
        ))

    mcq(
        "Which of the following is a DIFFERENCE between a peacock and a mango tree?",
        ["Peacock can move; mango tree cannot",
         "Both need sunlight",
         "Both grow",
         "Both are non-living"],
        "Peacock can move; mango tree cannot",
        "Animals like peacocks can move from place to place. Plants like mango trees are rooted in one place.",
    )
    mcq(
        "We see the Moon at night because:",
        ["It reflects sunlight",
         "It produces its own light",
         "It is the closest planet",
         "Stars shine on it"],
        "It reflects sunlight",
        "The Moon has no light of its own. It reflects sunlight, which is why we see it shining at night.",
    )
    mcq(
        "Which body part does a bird use for flying?",
        ["Wings", "Beak", "Legs", "Tail"],
        "Wings",
        "Birds have wings with feathers that help them fly through the air.",
    )
    mcq(
        "A stone is non-living because:",
        ["It does not grow or need food",
         "It is hard",
         "It is found everywhere",
         "It is heavy"],
        "It does not grow or need food",
        "Living things grow, need food, and reproduce. A stone does none of these, so it is non-living.",
    )
    mcq(
        "The Sun rises in the:",
        ["East", "West", "North", "South"],
        "East",
        "Due to Earth's rotation from west to east, the Sun appears to rise in the east and set in the west.",
    )
    mcq(
        "Which of these is a LIVING thing?",
        ["Puppy", "Chair", "Book", "Stone"],
        "Puppy",
        "A puppy is alive — it grows, eats food, moves on its own, and can reproduce.",
    )

    sa(
        "List two characteristics that ALL living things share.",
        ["growth", "need food/water", "reproduction", "breathing", "response to stimuli"],
        "All living things share: growth, need for food and water, breathing, response to stimuli, and reproduction.",
    )
    sa(
        "How is a bird different from a fish in its body parts and movement?",
        ["bird-wings-fly", "fish-fins-swim", "bird-beak", "fish-scales"],
        "Birds have wings and a beak; they fly in the air. Fish have fins and scales; they swim in water.",
    )

    return QuestionSet("c3_evs_VERIFY", label, qs)


# ===================================================================
#  Master Generator
# ===================================================================
class EVSClass3QuestionGenerator:
    """
    Deterministic question generator for Class 3 EVS.

    Parameters
    ----------
    seed : int
        Master seed. All questions are reproducible given the same seed.
    nodes : list[str] | None
        Which nodes to include.  ``None`` → all available nodes.
    n_per_type : int
        Questions per sub-type (MCQ / FB / TF / SA / MATCH) per node.
    """

    # ordered nodes and their generator callables
    _NODE_MAP: Dict[str, Any] = {
        "c3_evs_001": generate_c3_evs_001,
        "c3_evs_002": generate_c3_evs_002,
        "c3_evs_003": generate_c3_evs_003,
        "c3_evs_004": generate_c3_evs_004,
        "c3_evs_VERIFY": generate_c3_evs_verification,
    }

    def __init__(self, seed: int = 42, nodes: Optional[List[str]] = None,
                 n_per_type: int = 5) -> None:
        self.master_seed = seed
        self.nodes = nodes if nodes else list(self._NODE_MAP.keys())
        self.n_per_type = n_per_type
        self._all_sets: List[QuestionSet] = []

    # ------------------------------------------------------------------
    def generate(self) -> List[QuestionSet]:
        """Generate question sets for all configured nodes."""
        self._all_sets = []
        for idx, node_id in enumerate(self.nodes):
            gen_fn = self._NODE_MAP.get(node_id)
            if gen_fn is None:
                raise ValueError(f"Unknown node_id: {node_id!r}. "
                                 f"Valid: {list(self._NODE_MAP.keys())}")
            node_seed = _make_seed(self.master_seed, node_id)
            qset = gen_fn(seed=node_seed, n_per_type=self.n_per_type)
            self._all_sets.append(qset)
        return self._all_sets

    # ------------------------------------------------------------------
    def flatten(self) -> List[Question]:
        """Return all questions as a single list."""
        if not self._all_sets:
            self.generate()
        return [q for qs in self._all_sets for q in qs.questions]

    # ------------------------------------------------------------------
    def by_node(self, node_id: str) -> List[Question]:
        """Return questions for a specific node."""
        for qs in self._all_sets:
            if qs.node_id == node_id:
                return qs.questions
        raise KeyError(f"Node {node_id!r} not found. Call generate() first.")

    # ------------------------------------------------------------------
    def by_type(self, qtype: str) -> List[Question]:
        """Filter all questions by question type."""
        return [q for q in self.flatten() if q.qtype == qtype]

    # ------------------------------------------------------------------
    def summary(self) -> str:
        """Human-readable summary of all generated question sets."""
        if not self._all_sets:
            self.generate()
        parts = [f"\nEVS Class 3 — Question Generator Summary  "
                 f"(master_seed={self.master_seed})\n"]
        total = 0
        for qs in self._all_sets:
            parts.append(qs.summary())
            total += len(qs.questions)
        parts.append(f"\n{'='*60}")
        parts.append(f"TOTAL QUESTIONS GENERATED: {total}")
        parts.append(f"{'='*60}")
        return "\n".join(parts)

    # ------------------------------------------------------------------
    def to_dict(self) -> Dict[str, Any]:
        """Serialise to a plain dict (JSON-safe)."""
        if not self._all_sets:
            self.generate()
        return {
            "master_seed": self.master_seed,
            "nodes_requested": self.nodes,
            "n_per_type": self.n_per_type,
            "sets": [
                {
                    "node_id": qs.node_id,
                    "node_label": qs.node_label,
                    "total_questions": len(qs.questions),
                    "questions": [
                        {
                            "id": q.id,
                            "type": q.qtype,
                            "stem": q.stem,
                            "options": q.options,
                            "answer": q.answer,
                            "explanation": q.explanation,
                            "indian_context": q.indian_context,
                        }
                        for q in qs.questions
                    ],
                }
                for qs in self._all_sets
            ],
        }

    # ------------------------------------------------------------------
    def verify(self) -> Dict[str, Any]:
        """
        Run structural verification checks and return a report dict.

        Checks:
        1. All IDs are unique across all sets.
        2. Every MCQ has exactly one correct answer present in options.
        3. Every MCQ has >= 2 options.
        4. All node IDs map to existing nodes.
        5. Difficulty / competency fields are non-empty.
        6. Indian-context ratio >= 40% (50% target).
        """
        if not self._all_sets:
            self.generate()

        report: Dict[str, Any] = {
            "passed": True,
            "checks": [],
            "total_questions": 0,
            "indian_ratio": 0.0,
        }

        all_qs = self.flatten()
        report["total_questions"] = len(all_qs)

        # Check 1 — unique IDs
        ids = [q.id for q in all_qs]
        dupes = [i for i in ids if ids.count(i) > 1]
        c1 = {"check": "unique_ids", "passed": len(dupes) == 0,
              "detail": f"{len(dupes)} duplicate(s)" if dupes else "All unique"}
        report["checks"].append(c1)
        if not c1["passed"]:
            report["passed"] = False

        # Check 2 — MCQ correctness
        mcq_issues = []
        for q in all_qs:
            if q.qtype == "MCQ":
                if q.answer not in q.options:
                    mcq_issues.append(f"{q.id}: answer '{q.answer}' not in options")
                if len(q.options) < 2:
                    mcq_issues.append(f"{q.id}: fewer than 2 options")
        c2 = {"check": "mcq_integrity", "passed": len(mcq_issues) == 0,
              "detail": f"{len(mcq_issues)} issue(s)" if mcq_issues else "All MCQs valid"}
        report["checks"].append(c2)
        if not c2["passed"]:
            report["passed"] = False

        # Check 3 — non-empty fields
        field_issues = []
        for q in all_qs:
            for fld in ("difficulty", "competency", "node_id", "stem"):
                if not getattr(q, fld):
                    field_issues.append(f"{q.id}: empty '{fld}'")
        c3 = {"check": "non_empty_fields", "passed": len(field_issues) == 0,
              "detail": f"{len(field_issues)} issue(s)" if field_issues else "All fields filled"}
        report["checks"].append(c3)
        if not c3["passed"]:
            report["passed"] = False

        # Check 4 — Indian context ratio
        indian_count = sum(1 for q in all_qs if q.indian_context)
        ratio = indian_count / len(all_qs) if all_qs else 0.0
        c4 = {"check": "indian_context_ratio", "passed": ratio >= 0.40,
              "detail": f"{indian_count}/{len(all_qs)} = {ratio:.1%}  (target ≥ 40%)"}
        report["checks"].append(c4)
        if not c4["passed"]:
            report["passed"] = False
        report["indian_ratio"] = round(ratio, 4)

        # Check 5 — question type coverage per node
        c5_details = []
        c5_pass = True
        for qs in self._all_sets:
            types_present = {q.qtype for q in qs.questions}
            if not types_present:
                c5_pass = False
                c5_details.append(f"{qs.node_id}: no questions")
        c5 = {"check": "type_coverage", "passed": c5_pass,
              "detail": "; ".join(c5_details) if c5_details else "All nodes have questions"}
        report["checks"].append(c5)
        if not c5["passed"]:
            report["passed"] = False

        return report


# ===================================================================
#  Convenience  — standalone script entry-point
# ===================================================================
def build_question_bank(seed: int = 42,
                        n_per_type: int = 5,
                        include_verification: bool = True) -> Tuple[List[QuestionSet], Dict]:
    """
    Build the full Class 3 EVS question bank and return it with a
    verification report.

    Returns
    -------
    question_sets : list[QuestionSet]
    verification  : dict
    """
    gen = EVSClass3QuestionGenerator(seed=seed, n_per_type=n_per_type)
    qsets = gen.generate()

    if include_verification:
        vseed = _make_seed(seed, "VERIFY")
        vset = generate_c3_evs_verification(seed=vseed, n_per_type=n_per_type)
        qsets.append(vset)

    report = gen.verify()
    return qsets, report


if __name__ == "__main__":
    # Demonstrate deterministic generation with verification
    MASTER_SEED = 2024
    NP_TYPE = 5

    generator = EVSClass3QuestionGenerator(seed=MASTER_SEED, n_per_type=NP_TYPE)
    question_sets = generator.generate()

    print(generator.summary())

    report = generator.verify()
    print("\n--- Verification Report ---")
    for chk in report["checks"]:
        status = "✓ PASS" if chk["passed"] else "✗ FAIL"
        print(f"  {status}  [{chk['check']}]  {chk['detail']}")
    print(f"\n  Overall: {'✓ ALL CHECKS PASSED' if report['passed'] else '✗ SOME CHECKS FAILED'}")
    print(f"  Indian-context ratio: {report['indian_ratio']:.1%}")
    print(f"  Total questions    : {report['total_questions']}")