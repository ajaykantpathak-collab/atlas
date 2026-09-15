"""Question generator for Class 4 Biology (3 nodes).

Uses the *random* module with a fixed seed so every seed produces the
same deterministic question set.

Supported question types
------------------------
* MCQ          — four-option multiple choice
* FillBlank    — sentence with a blank
* Match        — column-A ↔ column-B matching
* TrueFalse    — statement to judge

Public helpers
--------------
generate(node_id, qtype, seed, **kwargs)
    Return a dict representing one question.

generate_batch(node_id, qtype, n, seed, **kwargs)
    Return *n* unique-answer questions.
"""
from __future__ import annotations

import random
import textwrap
from dataclasses import dataclass, field
from typing import Any

# ── canonical data (mirrors solver — single source of truth per node) ─

# c4_bio_001
FOOD_COMPONENTS: list[str] = [
    "Carbohydrates", "Proteins", "Fats",
    "Vitamins", "Minerals", "Roughage", "Water",
]
COMPONENT_FUNCTION: dict[str, str] = {
    "Carbohydrates": "energy",
    "Proteins":    "body building",
    "Fats":        "energy storage",
    "Vitamins":    "immunity",
    "Minerals":    "immunity",
    "Roughage":    "digestion",
    "Water":       "hydration",
}
EXAMPLE_FOODS: dict[str, list[str]] = {
    "Carbohydrates": ["rice", "wheat", "bread", "potato", "roti", "sugar"],
    "Proteins":      ["milk", "egg", "fish", "meat", "dal", "pulses"],
    "Fats":          ["butter", "oil", "ghee", "cheese", "nuts"],
    "Vitamins":      ["orange", "mango", "carrot", "spinach", "lemon"],
    "Minerals":      ["milk", "spinach", "salt", "banana"],
    "Roughage":      ["vegetables", "fruits", "salad", "green leaves"],
    "Water":         ["water", "fruit juice"],
}
FOOD_TO_COMPONENT: dict[str, str] = {
    "rice":"Carbohydrates","wheat":"Carbohydrates","bread":"Carbohydrates",
    "potato":"Carbohydrates","roti":"Carbohydrates","sugar":"Carbohydrates",
    "milk":"Proteins","egg":"Proteins","fish":"Proteins",
    "meat":"Proteins","dal":"Proteins","pulses":"Proteins","soyabean":"Proteins",
    "butter":"Fats","oil":"Fats","ghee":"Fats","cheese":"Fats","nuts":"Fats",
    "orange":"Vitamins","mango":"Vitamins","carrot":"Vitamins",
    "spinach":"Vitamins","lemon":"Vitamins",
    "salt":"Minerals","banana":"Minerals",
    "salad":"Roughage","vegetables":"Roughage","fruits":"Roughage",
    "water":"Water",
}

# c4_bio_002
BALANCED_MIN_TYPES = 4
BALANCED_COMPONENTS = FOOD_COMPONENTS  # same list

# c4_bio_003
TEETH_TYPES: dict[str, dict] = {
    "Incisors": {
        "location": "front of the mouth",
        "function": "cutting and biting",
        "analogy":  "scissors",
    },
    "Canines": {
        "location": "next to incisors (pointed teeth)",
        "function": "tearing",
        "analogy":  "fork",
    },
    "Premolars": {
        "location": "behind canines",
        "function": "crushing",
        "analogy":  "mini grinder",
    },
    "Molars": {
        "location": "back of the mouth",
        "function": "grinding and chewing",
        "analogy":  "grinding stone (chakki)",
    },
}

# ── dataclass for structured output ───────────────────────────────────

@dataclass
class Question:
    """Serialisable question object."""
    node_id:   str
    qtype:     str           # "MCQ" | "FillBlank" | "Match" | "TrueFalse"
    prompt:    str           # question text shown to learner
    answer:    str           # canonical answer (revealed after attempt)
    options:   list[str] = field(default_factory=list)   # MCQ options (A–D)
    explanation: str = ""   # why the answer is correct
    metadata:  dict[str, Any] = field(default_factory=dict)


# ── internal helpers ──────────────────────────────────────────────────

def _mcq_options(correct: str, pool: list[str], rng: random.Random) -> list[str]:
    """Return 4 unique options with *correct* shuffled in."""
    distractors = [x for x in pool if x.lower() != correct.lower()]
    rng.shuffle(distractors)
    picks = [correct] + distractors[:3]
    rng.shuffle(picks)
    return picks


def _letter(n: int) -> str:
    return chr(ord("A") + n)


# ── Node 001 generators ───────────────────────────────────────────────

def _gen_001_component_of(rng: random.Random) -> Question:
    food = rng.choice(list(FOOD_TO_COMPONENT))
    correct = FOOD_TO_COMPONENT[food]
    pool   = FOOD_COMPONENTS
    opts   = _mcq_options(correct, pool, rng)
    return Question(
        node_id="c4_bio_001", qtype="MCQ",
        prompt=(
            f"Q: '{food.title()}' is mainly a source of "
            "which food component?"
        ),
        answer=correct,
        options=opts,
        explanation=textwrap.fill(
            f"{food.title()} contains mainly {correct.lower()}, "
            f"which {COMPONENT_FUNCTION[correct]} for the body.",
            width=60,
        ),
    )


def _gen_001_function_of(rng: random.Random) -> Question:
    comp = rng.choice(FOOD_COMPONENTS)
    correct = COMPONENT_FUNCTION[comp]
    # build function pool excluding the correct answer
    funcs = list({v for v in COMPONENT_FUNCTION.values() if v != correct})
    opts = _mcq_options(correct, funcs, rng)
    return Question(
        node_id="c4_bio_001", qtype="MCQ",
        prompt=(
            f"Q: What is the main function of {comp} "
            "in our body?"
        ),
        answer=correct,
        options=opts,
        explanation=textwrap.fill(
            f"{comp} primarily provide(s) {correct} — "
            "this is what keeps us active, helps us grow, or "
            "protects us from illness.",
            width=60,
        ),
    )


def _gen_001_fillblank_example(rng: random.Random) -> Question:
    comp = rng.choice(FOOD_COMPONENTS)
    examples = EXAMPLE_FOODS[comp]
    correct  = rng.choice(examples)
    return Question(
        node_id="c4_bio_001", qtype="FillBlank",
        prompt=(
            f"Q: Give one example of a food rich in {comp}.\n"
            f"Answer: __________"
        ),
        answer=correct.title(),
        explanation=textwrap.fill(
            f"{correct.title()} is rich in {comp}, "
            f"which helps with {COMPONENT_FUNCTION[comp]}.",
            width=60,
        ),
    )


# ── Node 002 generators ───────────────────────────────────────────────

def _gen_002_balanced_mcq(rng: random.Random) -> Question:
    correct = "Balanced"
    distractors = ["Not balanced", "Unhealthy", "Deficient"]
    opts = _mcq_options(correct, distractors, rng)
    meals = [
        ("rice + dal + vegetables + curd + salad",   "Balanced"),
        ("rice + rice + rice",                       "Not balanced"),
        ("bread + butter only",                      "Not balanced"),
        ("mango + banana + orange only",             "Not balanced"),
        ("roti + dal + egg + milk + spinach",        "Balanced"),
        ("pizza + coke only",                        "Not balanced"),
        ("rice + fish + vegetables + curd",          "Balanced"),
    ]
    meal_text, verdict = rng.choice(meals)
    return Question(
        node_id="c4_bio_002", qtype="MCQ",
        prompt=(
            f"Q: A plate has: {meal_text}.\n"
            "Is this meal balanced?"
        ),
        answer=verdict,
        options=opts,
        explanation=textwrap.fill(
            f"This meal is '{verdict}'. "
            "A balanced meal contains carbohydrates, proteins, fats, "
            "vitamins/minerals, roughage, and water in the right amounts.",
            width=60,
        ),
    )


def _gen_002_fillblank_components(rng: random.Random) -> Question:
    return Question(
        node_id="c4_bio_002", qtype="FillBlank",
        prompt=(
            "Q: Name any __________ food components that are "
            "needed in a balanced diet (answer: at least 4)."
        ),
        answer=", ".join(BALANCED_COMPONENTS[:4]),
        explanation=textwrap.fill(
            "A balanced diet needs ALL seven food components: "
            + ", ".join(BALANCED_COMPONENTS)
            + ". Each has a special job for the body.",
            width=60,
        ),
    )


def _gen_002_truefalse(rng: random.Random) -> Question:
    statements = [
        ("Eating only rice gives a balanced diet.",
         False, "Only rice gives carbohydrates; it lacks proteins, "
                "fats, vitamins, minerals, roughage, and water."),
        ("A balanced diet includes all food components in proper amounts.",
         True,  "Exactly right — variety and proportion matter."),
        ("Roughage is not needed in a balanced diet.",
         False, "Roughage helps digestion and must be included."),
        ("Water is one of the seven essential food components.",
         True,  "Water is essential for hydration and body functions."),
        ("A meal with dal, rice, and vegetables is balanced.",
         True,  "It includes carbohydrates (rice), proteins (dal), "
                "and vitamins/minerals (vegetables)."),
    ]
    stmt, correct, reason = rng.choice(statements)
    return Question(
        node_id="c4_bio_002", qtype="TrueFalse",
        prompt=f"Q: True or False?\n{stmt}",
        answer="True" if correct else "False",
        explanation=textwrap.fill(reason, width=60),
    )


# ── Node 003 generators ───────────────────────────────────────────────

def _gen_003_function_mcq(rng: random.Random) -> Question:
    teeth_type, data = rng.choice(list(TEETH_TYPES.items()))
    correct = data["function"]
    pool = [v["function"] for v in TEETH_TYPES.values() if v["function"] != correct]
    opts = _mcq_options(correct, pool, rng)
    return Question(
        node_id="c4_bio_003", qtype="MCQ",
        prompt=f"Q: What is the main function of {teeth_type}?",
        answer=correct,
        options=opts,
        explanation=textwrap.fill(
            f"{teeth_type} are used for {correct}. "
            f"They are like {data['analogy']}.",
            width=60,
        ),
    )


def _gen_003_location_fillblank(rng: random.Random) -> Question:
    teeth_type, data = rng.choice(list(TEETH_TYPES.items()))
    return Question(
        node_id="c4_bio_003", qtype="FillBlank",
        prompt=f"Q: Where are {teeth_type} located in the mouth?",
        answer=data["location"],
        explanation=textwrap.fill(
            f"{teeth_type} are located {data['location']}.",
            width=60,
        ),
    )


def _gen_003_analogy(rng: random.Random) -> Question:
    teeth_type, data = rng.choice(list(TEETH_TYPES.items()))
    correct = data["analogy"]
    pool = [v["analogy"] for v in TEETH_TYPES.values() if v["analogy"] != correct]
    extra_pool = ["hammer", "saw", "spoon", "needle"]
    opts = _mcq_options(correct, pool + extra_pool, rng)
    return Question(
        node_id="c4_bio_003", qtype="MCQ",
        prompt=(
            f"Q: {teeth_type} are compared to a __________ "
            "because of their shape and job."
        ),
        answer=correct,
        options=opts,
        explanation=textwrap.fill(
            f"{teeth_type} are like a {correct} — "
            f"they {data['function']} food.",
            width=60,
        ),
    )


def _gen_003_type_by_function(rng: random.Random) -> Question:
    mapping = [
        ("cutting or biting food",  "Incisors"),
        ("tearing food",            "Canines"),
        ("crushing food",           "Premolars"),
        ("grinding or chewing food","Molars"),
    ]
    hint, correct = rng.choice(mapping)
    pool = [v for _, v in mapping if v != correct]
    opts = _mcq_options(correct, pool, rng)
    return Question(
        node_id="c4_bio_003", qtype="MCQ",
        prompt=f"Q: Which teeth are used for {hint}?",
        answer=correct,
        options=opts,
        explanation=textwrap.fill(
            f"{correct} are responsible for {hint}. "
            f"They are located {TEETH_TYPES[correct]['location']}.",
            width=60,
        ),
    )


def _gen_003_match(rng: random.Random) -> Question:
    """Return a match-the-columns question for all four teeth types."""
    col_a  = list(TEETH_TYPES.keys())
    col_b  = [v["function"] for v in TEETH_TYPES.values()]
    rng.shuffle(col_b)
    # correct mapping (teeth_type → function)
    mapping = {k: v["function"] for k, v in TEETH_TYPES.items()}
    return Question(
        node_id="c4_bio_003", qtype="Match",
        prompt=("Q: Match the teeth type (Column A) with its function "
                "(Column B)."),
        answer=" | ".join(f"{k}→{v}" for k, v in sorted(mapping.items())),
        options=col_b,
        explanation=textwrap.fill(
            "Incisors→cutting, Canines→tearing, "
            "Premolars→crushing, Molars→grinding.",
            width=60,
        ),
        metadata={"column_a": col_a, "column_b": col_b},
    )


# ── node → generator dispatch table ──────────────────────────────────

_DISPATCH: dict[tuple[str, str], Any] = {
    # node 001
    ("c4_bio_001", "MCQ")       : _gen_001_component_of,
    ("c4_bio_001", "FillBlank") : _gen_001_fillblank_example,
    # node 002
    ("c4_bio_002", "MCQ")       : _gen_002_balanced_mcq,
    ("c4_bio_002", "FillBlank") : _gen_002_fillblank_components,
    ("c4_bio_002", "TrueFalse") : _gen_002_truefalse,
    # node 003
    ("c4_bio_003", "MCQ")       : _gen_003_function_mcq,
    ("c4_bio_003", "FillBlank") : _gen_003_location_fillblank,
    ("c4_bio_003", "Match")     : _gen_003_match,
    # aliases — "mcq" / "fill_blank" etc.
    ("c4_bio_001", "mcq")       : _gen_001_component_of,
    ("c4_bio_001", "fill_blank"): _gen_001_fillblank_example,
    ("c4_bio_002", "mcq")       : _gen_002_balanced_mcq,
    ("c4_bio_002", "fill_blank"): _gen_002_fillblank_components,
    ("c4_bio_002", "true_false"): _gen_002_truefalse,
    ("c4_bio_003", "mcq")       : _gen_003_function_mcq,
    ("c4_bio_003", "fill_blank"): _gen_003_location_fillblank,
    ("c4_bio_003", "match")     : _gen_003_match,
}


# ── public API ────────────────────────────────────────────────────────

def generate(
    node_id: str,
    qtype: str,
    seed: int = 42,
    **kwargs: Any,
) -> Question:
    """Generate a single question.

    Parameters
    ----------
    node_id : e.g. ``"c4_bio_001"``
    qtype   : ``"MCQ"`` | ``"FillBlank"`` | ``"Match"`` | ``"TrueFalse"``
              (case-insensitive, underscores accepted)
    seed    : integer seed for reproducibility.

    Returns
    -------
    Question dataclass.
    """
    key = (node_id, qtype.replace("_", "").title())
    if key not in _DISPATCH:
        # Try lowercase fallback
        key = (node_id, qtype.replace("_", "").lower())
    if key not in _DISPATCH:
        raise ValueError(
            f"No generator for node={node_id!r}, qtype={qtype!r}. "
            f"Valid: {sorted(set(k for k, _ in _DISPATCH))}"
        )
    rng = random.Random(seed)
    return _DISPATCH[key](rng)


def generate_batch(
    node_id: str,
    qtype: str,
    n: int = 5,
    seed: int = 42,
) -> list[Question]:
    """Return *n* unique questions for the same node/qtype.

    Uses incrementing seeds so each question is reproducible yet
    distinct from the others.
    """
    return [generate(node_id, qtype, seed + i) for i in range(n)]


# ── pretty-print helper ───────────────────────────────────────────────

def pretty(q: Question) -> str:
    """Return a human-readable string of the question."""
    lines: list[str] = [f"[{q.node_id} | {q.qtype}]", q.prompt]
    if q.options:
        for i, opt in enumerate(q.options):
            lines.append(f"  {_letter(i)}. {opt}")
    lines += ["", f"✔ Answer : {q.answer}",
               f"📖 Why   : {q.explanation}"]
    return "\n".join(lines)


# ══════════════════════════════════════════════════════════════════════
#  Quick self-test  (run: python bio/class4_bio_questions.py)
# ══════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    ALL_NODES = ("c4_bio_001", "c4_bio_002", "c4_bio_003")
    TYPES = {
        "c4_bio_001": ["MCQ", "FillBlank"],
        "c4_bio_002": ["MCQ", "FillBlank", "TrueFalse"],
        "c4_bio_003": ["MCQ", "FillBlank", "Match"],
    }
    print("=" * 62)
    for nid in ALL_NODES:
        for qt in TYPES[nid]:
            q = generate(nid, qt, seed=7)
            print(pretty(q))
            print("-" * 62)

    print("\nBatch of 3 MCQs for c4_bio_003:")
    for q in generate_batch("c4_bio_003", "MCQ", n=3, seed=100):
        print(pretty(q))
        print("·" * 30)