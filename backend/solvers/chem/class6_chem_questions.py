"""
Class 6 Chemistry – Question Generator
Generates seeded-consistent practice problems for 3 nodes:
  c6_chem_001  Matter and its composition
  c6_chem_002  Particle nature of matter
  c6_chem_003  Physical changes

50 % Indian-context flavour (diwali-lamp, neem-leaf, chapati, etc.)
50 % standard / universal examples.
"""

from __future__ import annotations

import random
import string
from dataclasses import dataclass, field
from typing import List, Optional, Tuple

from class6_chem_solver import (
    StateOfMatter,
    ChangeType,
    ProblemResult,
    solve,
    _loose_match,
)

# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def _rng(seed: int) -> random.Random:
    return random.Random(seed)


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

INDIAN_MATTER_ITEMS: list[str] = [
    "roti", "chapati", "dal", "rice", "sambar", "idli", "dosa",
    "banana", "mango", "coconut water", "jaggery", "ghee",
    "clay pot", "earthen lamp", "diya", "rangoli powder",
    "sindoor", "kumkum", "turmeric", "henna", "mehndi",
    "neem leaf", "tulsi leaf", "curry leaf", "coriander",
    "incense stick", "agarbatti", "sandalwood", "camphor",
    "brass bell", "copper coin", "silver thali", "gold earring",
    "cotton cloth", "silk saree", "jute bag", "bamboo stick",
    "sugarcane", "betel leaf", "paan", "supari", "kulfi",
    "lassi", "chhath", "pongal", "holi colour", "kabir",
]

STANDARD_MATTER_ITEMS: list[str] = [
    "stone", "water", "air", "pencil", "book", "chair", "iron",
    "gold", "milk", "juice", "wood", "plastic", "rock", "sand",
    "sugar", "salt", "oil", "petrol", "cloud", "rain", "snow",
    "honey", "clay", "soil", "ice", "steam", "oxygen", "balloon",
    "mobile phone", "cup", "plate", "table", "wall", "paper",
    "glass", "copper wire", "aluminium foil", "rubber band",
    "candle", "ink", "paint", "cement", "brick", "steel",
]

NOT_MATTER_CONCEPTS: list[str] = [
    "shadow", "light", "sound", "heat", "darkness", "music",
    "thought", "dream", "love", "cold", "warmth", "electricity",
    "time", "sadness", "happiness", "fear", "memory",
]

PHYSICAL_CHANGES_STANDARD: list[str] = [
    "melting ice", "freezing water", "evaporation of water",
    "condensation of steam", "dissolving sugar in water",
    "dissolving salt in water", "crushing chalk",
    "cutting paper", "tearing paper", "bending an iron rod",
    "stretching a rubber band", "magnetising an iron nail",
    "breaking glass", "separating iron from sand using a magnet",
    "mixing sand and salt", "inflating a balloon",
    "folding paper", "drying wet clothes", "melting wax",
    "grinding grain into flour", "shaping clay on a potter's wheel",
    "cutting wood with a saw", "separating petrol and water",
]

CHEMICAL_CHANGES_STANDARD: list[str] = [
    "burning paper", "burning wood", "rusting of iron",
    "digestion of food", "cooking an egg", "baking a cake",
    "souring of milk", "exploding a firecracker",
    "curdling of milk", "ripening of fruit",
    "burning a candle", "burning magnesium ribbon",
    "reacting vinegar with baking soda",
    "photosynthesis in plants", "respiration in animals",
]

PHYSICAL_CHANGES_INDIAN: list[str] = [
    "melting ghee", "melting desi ghee", "freezing kulfi",
    "dissolving jaggery in water", "dissolving sugar in milk",
    "crushing neem leaves", "crushing turmeric",
    "cutting a banana", "separating rice from stones",
    "drying clothes in the sun", "inflating a football",
    "separating cream from milk", "churning curd to make butter",
    "mixing sindoor with water", "grinding spices",
    "folding a silk saree", "cutting a bamboo stick",
    "separating tea leaves from tea", "making raita",
    "shaping clay into a diya", "peeling a banana",
    "separating bran from wheat flour",
]

CHEMICAL_CHANGES_INDIAN: list[str] = [
    "burning an incense stick", "burning a diya with ghee",
    "burning camphor", "burning Holi colours",
    "rusting of an iron pan", "rusting of a brass bell",
    "digesting food", "cooking chapati",
    "souring of curd", "souring of milk",
    "fermentation of idli batter", "fermentation of dosa",
    "making jaggery from sugarcane juice",
    "burning a candle during puja", "burning a candle",
    "curdling milk to make paneer", "making pickle",
    "cooking rice", "boiling milk",
    "burning a firecracker on Diwali",
    "making papad from urad dal",
    "burning dried cow-dung cake",
]

PARTICLE_PROPERTY_QUESTIONS: list[dict] = [
    {
        "type": "state_property",
        "state": StateOfMatter.SOLID,
        "property": "spacing",
        "prompt": "How are particles arranged in a solid?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.LIQUID,
        "property": "spacing",
        "prompt": "How are particles arranged in a liquid?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.GAS,
        "property": "spacing",
        "prompt": "How are particles arranged in a gas?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.SOLID,
        "property": "motion",
        "prompt": "How do particles move in a solid?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.LIQUID,
        "property": "motion",
        "prompt": "How do particles move in a liquid?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.GAS,
        "property": "motion",
        "prompt": "How do particles move in a gas?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.SOLID,
        "property": "attraction",
        "prompt": "How strong is the force of attraction between particles in a solid?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.LIQUID,
        "property": "attraction",
        "prompt": "How strong is the force of attraction between particles in a liquid?",
    },
    {
        "type": "state_property",
        "state": StateOfMatter.GAS,
        "property": "attraction",
        "prompt": "How strong is the force of attraction between particles in a gas?",
    },
]


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

@dataclass
class Question:
    node_id:   str
    task_type: str
    prompt:    str
    expected:  str
    options:   List[str] = field(default_factory=list)
    hint:      str       = ""
    difficulty: str     = "Medium"
    context:   str      = ""   # "Indian" or "Standard"

    def as_dict(self) -> dict:
        return {
            "node_id":    self.node_id,
            "task_type":  self.task_type,
            "prompt":     self.prompt,
            "expected":   self.expected,
            "options":    self.options,
            "hint":       self.hint,
            "difficulty": self.difficulty,
            "context":    self.context,
        }


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def generate_node1_questions(
    seed: int = 42,
    count: int = 6,
    indian_ratio: float = 0.5,
) -> List[Question]:
    """
    Generate practice questions for c6_chem_001.
    Question types:
      A)  "Is X matter?"           (yes/no)
      B)  "How many of these are matter?"  (counting)
      C)  Fill-in-the-blank         (completing a definition)
    """
    rng = _rng(seed)
    questions: List[Question] = []
    pool_size = count

    indian_pool = INDIAN_MATTER_ITEMS
    standard_pool = STANDARD_MATTER_ITEMS
    all_pool = indian_pool + standard_pool

    for i in range(pool_size):
        qtype = rng.choice(["is_matter", "count_matter", "fill_blank"])

        if qtype == "is_matter":
            # --- Is X matter? ---
            use_indian = rng.random() < indian_ratio
            context_label = "Indian" if use_indian else "Standard"
            pool = indian_pool if use_indian else standard_pool
            item = rng.choice(pool)

            # 10 % chance to throw in a non-matter concept
            if rng.random() < 0.10:
                item = rng.choice(NOT_MATTER_CONCEPTS)

            prompt = f"Is '{item}' matter?  (Yes / No)"
            solver_res = solve("c6_chem_001", "is_matter", item=item)
            expected = "Yes" if solver_res.correct and "IS matter" in solver_res.explanation else "No"
            options = ["Yes", "No"]
            hint = (
                "Recall: Matter = anything with MASS and OCCUPIES SPACE. "
                "Can you weigh it? Does it take up room?"
            )
            questions.append(Question(
                node_id="c6_chem_001", task_type="is_matter",
                prompt=prompt, expected=expected, options=options,
                hint=hint, context=context_label,
            ))

        elif qtype == "count_matter":
            # --- Count matter in a list ---
            use_indian = rng.random() < indian_ratio
            context_label = "Indian" if use_indian else "Standard"
            pool = indian_pool if use_indian else standard_pool
            n = rng.randint(4, 7)
            items = rng.sample(pool, min(n, len(pool)))
            if rng.random() < 0.20:
                items.append(rng.choice(NOT_MATTER_CONCEPTS))
            prompt = (
                "Which of the following are matter? "
                "Count them:  " + ", ".join(f"'{x}'" for x in items)
            )
            solver_res = solve("c6_chem_001", "count_matter", items=items)
            expected = solver_res.expected_answer
            options = [str(k) for k in range(len(items) + 1)]
            hint = "Apply the definition: mass + occupies space."
            questions.append(Question(
                node_id="c6_chem_001", task_type="count_matter",
                prompt=prompt, expected=expected, options=options,
                hint=hint, context=context_label,
            ))

        else:
            # --- Fill in the blank ---
            blanks = [
                ("Matter is anything that has ______ and occupies space.", "mass"),
                ("Anything that has ______ and occupies space is called matter.", "mass"),
                ("Matter occupies ______.", "space"),
                ("The physical substance of which everything is made is called ______.", "matter"),
                ("Matter has ______.", "mass"),
                ("We can measure matter using a ______.", "balance"),
            ]
            sentence, word = rng.choice(blanks)
            use_indian = rng.random() < indian_ratio
            context_label = "Indian" if use_indian else "Standard"
            prompt = f"Fill in the blank:\n  {sentence}"
            solver_res = solve(
                "c6_chem_001", "complete_statement",
                sentence=sentence, blank_word=word, correct_word=word,
            )
            expected = word
            options = _shuffle_options([word, "volume", "weight", "density"], rng)
            hint = "Recall the two key properties of matter from your textbook."
            questions.append(Question(
                node_id="c6_chem_001", task_type="complete_statement",
                prompt=prompt, expected=expected, options=options,
                hint=hint, context=context_label,
            ))

    return questions


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

_PARTICLE_STATE_DESCRIPTIONS: list[tuple[str, StateOfMatter]] = [
    # (student-facing description hint, correct state)
    ("Particles are very close together and can only vibrate in fixed positions", StateOfMatter.SOLID),
    ("Particles are close but can slide past one another", StateOfMatter.LIQUID),
    ("Particles are far apart and move freely in all directions", StateOfMatter.GAS),
    ("Particles are packed tightly with strong attraction between them", StateOfMatter.SOLID),
    ("Particles have moderate spacing and moderate attraction", StateOfMatter.LIQUID),
    ("Particles are widely spaced with negligible attraction", StateOfMatter.GAS),
    ("Particles vibrate but do not move from their positions", StateOfMatter.SOLID),
    ("Particles fill the entire container they are in", StateOfMatter.GAS),
    ("Particles take the shape of their container but do not fill it completely", StateOfMatter.LIQUID),
    ("Particles have the least kinetic energy among the three states", StateOfMatter.SOLID),
    ("Particles have the highest kinetic energy among the three states", StateOfMatter.GAS),
]

_STATE_NAMES = [s.value for s in StateOfMatter]


def generate_node2_questions(
    seed: int = 42,
    count: int = 6,
    indian_ratio: float = 0.5,
) -> List[Question]:
    """
    Generate practice questions for c6_chem_002.
    Question types:
      A)  "In a solid, how are particles spaced / moving / attracted?"
      B)  "Which state has particles that ...?"  (given description → identify)
      C)  "Does cutting matter change the particle count?"
    """
    rng = _rng(seed)
    questions: List[Question] = []

    for i in range(count):
        qtype = rng.choice(["state_property", "identify_state", "particle_count"])

        if qtype == "state_property":
            entry = rng.choice(PARTICLE_PROPERTY_QUESTIONS)
            state   = entry["state"]
            prop    = entry["property"]
            prompt  = entry["prompt"] + "  (Choose one: very close / moderate / far apart)"
            solver_res = solve("c6_chem_002", "state_property",
                               state=state, property_=prop)

            options_map = {
                ("spacing",    StateOfMatter.SOLID):   "Very close together",
                ("spacing",    StateOfMatter.LIQUID):  "Moderate spacing",
                ("spacing",    StateOfMatter.GAS):     "Far apart",
                ("motion",     StateOfMatter.SOLID):   "Vibrate in fixed positions",
                ("motion",     StateOfMatter.LIQUID):  "Slide past each other",
                ("motion",     StateOfMatter.GAS):     "Move freely in all directions",
                ("attraction", StateOfMatter.SOLID):   "Strongest",
                ("attraction", StateOfMatter.LIQUID):  "Moderate",
                ("attraction", StateOfMatter.GAS):     "Weakest / negligible",
            }
            expected = options_map[(prop, state)]
            options = _shuffle_options(
                list(set(options_map.values())), rng
            )
            hint = (
                "Recall: In solids particles are closest and most attracted; "
                "liquids are moderate; gases are furthest apart and freest."
            )
            questions.append(Question(
                node_id="c6_chem_002", task_type="state_property",
                prompt=prompt, expected=expected, options=options,
                hint=hint, difficulty="Medium",
            ))

        elif qtype == "identify_state":
            desc, correct_state = rng.choice(_PARTICLE_STATE_DESCRIPTIONS)
            prompt = (
                "Particles in a sample are described as:\n"
                f"  \"{desc}\"\n"
                "Which state of matter does this sample belong to?"
            )
            options = _shuffle_options(_STATE_NAMES, rng)
            solver_res = solve(
                "c6_chem_002", "identify_state",
                property_="spacing", description=desc,
            )
            expected = correct_state.value
            hint = "Match the particle description to solid / liquid / gas."
            questions.append(Question(
                node_id="c6_chem_002", task_type="identify_state",
                prompt=prompt, expected=expected, options=options,
                hint=hint, difficulty="Medium",
            ))

        else:
            scenarios = [
                ("You cut a piece of chalk in half, then in half again, and so on. "
                 "Does the number of particles increase, decrease, or stay the same?",
                 "same"),
                ("You break a sugar crystal into smaller pieces. "
                 "What happens to the number of sugar particles?",
                 "same"),
                ("You dissolve sugar in water. "
                 "Does the number of sugar particles increase?",
                 "same"),
                ("You grind salt to a fine powder. "
                 "Has the number of salt particles changed?",
                 "same"),
            ]
            scenario, expected = rng.choice(scenarios)
            prompt = scenario + "\n  (Answer: increases / decreases / stays the same)"
            options = ["increases", "decreases", "stays the same"]
            solver_res = solve(
                "c6_chem_002", "particle_count",
                initial_mass_grams=1.0, description=scenario,
            )
            hint = (
                "Remember: matter is made of tiny particles. Cutting or grinding "
                "does not create or destroy particles — it just rearranges them."
            )
            questions.append(Question(
                node_id="c6_chem_002", task_type="particle_count",
                prompt=prompt, expected=expected, options=options,
                hint=hint, difficulty="Medium",
            ))

    return questions


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

_STATE_PAIR_QUESTIONS: list[tuple[StateOfMatter, StateOfMatter, str]] = [
    (StateOfMatter.SOLID, StateOfMatter.LIQUID,  "melting"),
    (StateOfMatter.LIQUID, StateOfMatter.SOLID,  "freezing"),
    (StateOfMatter.LIQUID, StateOfMatter.GAS,    "evaporation"),
    (StateOfMatter.GAS,    StateOfMatter.LIQUID, "condensation"),
    (StateOfMatter.SOLID, StateOfMatter.GAS,     "sublimation"),
]

_REVERSIBILITY_EXAMPLES: list[tuple[str, bool, str]] = [
    ("melting of ice",               True,  "You can freeze water back to ice."),
    ("freezing of water",            True,  "You can melt ice back to water."),
    ("dissolving sugar in water",    True,  "Evaporate the water to recover sugar crystals."),
    ("crushing a can",               True,  "It cannot be uncrushed easily — wait, it is irreversible. "
                                             "Crushing is PHYSICAL but in practice hard to reverse. "
                                             "Still no new substance → physical."),
    ("burning paper",                False, "Ash is produced — a new substance. Cannot un-burn."),
    ("rusting of iron",              False, "Rust is a new compound. Cannot remove rust easily."),
    ("cooking an egg",               False, "The egg proteins change permanently. Cannot uncook."),
    ("souring of milk",              False, "Lactic acid forms. Cannot revert to fresh milk."),
    ("frying a chapati",             False, "Chemical change in the starches."),
    ("magnetising an iron nail",     True,  "Demagnetise it by hammering or heating."),
]


def generate_node3_questions(
    seed: int = 42,
    count: int = 6,
    indian_ratio: float = 0.5,
) -> List[Question]:
    """
    Generate practice questions for c6_chem_003.
    Question types:
      A)  "Is X a physical or chemical change?"
      B)  "Melting is an example of ___ change."  (fill blank)
      C)  "When ice melts to water, what type of change is this?"
      D)  Reversibility: "Can you reverse ___?"
    """
    rng = _rng(seed)
    questions: List[Question] = []
    all_physical = PHYSICAL_CHANGES_STANDARD + PHYSICAL_CHANGES_INDIAN
    all_chemical = CHEMICAL_CHANGES_STANDARD + CHEMICAL_CHANGES_INDIAN

    for i in range(count):
        qtype = rng.choice([
            "classify_change",
            "fill_blank_type",
            "change_of_state",
            "reversibility",
        ])

        if qtype == "classify_change":
            use_indian = rng.random() < indian_ratio
            context_label = "Indian" if use_indian else "Standard"
            if rng.random() < 0.5:
                pool = PHYSICAL_CHANGES_INDIAN if use_indian else PHYSICAL_CHANGES_STANDARD
            else:
                pool = CHEMICAL_CHANGES_INDIAN if use_indian else CHEMICAL_CHANGES_STANDARD

            change = rng.choice(pool)
            prompt = f"'{change}' is an example of a ______ change.\n  (physical / chemical)"
            solver_res = solve(
                "c6_chem_003", "is_physical",
                change_description=change,
            )
            expected = solver_res.expected_answer
            options = ["physical", "chemical"]
            hint = (
                "Recall: Physical change = no new substance, often reversible. "
                "Chemical change = new substance formed, usually irreversible."
            )
            questions.append(Question(
                node_id="c6_chem_003", task_type="classify_change",
                prompt=prompt, expected=expected, options=options,
                hint=hint, context=context_label,
            ))

        elif qtype == "fill_blank_type":
            blanks = [
                ("Melting of ice is a ______ change.", "physical"),
                ("Freezing of water is a ______ change.", "physical"),
                ("Burning of paper is a ______ change.", "chemical"),
                ("Rusting of iron is a ______ change.", "chemical"),
                ("Dissolving sugar in water is a ______ change.", "physical"),
                ("Cooking an egg is a ______ change.", "chemical"),
                ("Melting of ghee is a ______ change.", "physical"),
                ("Souring of milk is a ______ change.", "chemical"),
                ("Cutting a vegetable is a ______ change.", "physical"),
                ("Burning a candle is a ______ change.", "chemical"),
            ]
            sentence, word = rng.choice(blanks)
            use_indian = rng.random() < indian_ratio
            context_label = "Indian" if use_indian else "Standard"
            prompt = f"Fill in the blank:\n  {sentence}"
            options = _shuffle_options(["physical", "chemical", "both", "neither"], rng)
            hint = "Physical: no new substance. Chemical: new substance formed."
            questions.append(Question(
                node_id="c6_chem_003", task_type="fill_blank_type",
                prompt=prompt, expected=word, options=options,
                hint=hint, context=context_label,
            ))

        elif qtype == "change_of_state":
            init, final, expected_process = rng.choice(_STATE_PAIR_QUESTIONS)
            if init == final:
                prompt = f"Keeping a substance as {init.value} — no state change."
                expected = "no change"
                options = ["no change", "melting", "freezing", "evaporation"]
            else:
                prompt = (
                    f"When a {init.value} changes to a {final.value}, "
                    "what is this process called?\n"
                    "  (melting / freezing / evaporation / condensation / sublimation)"
                )
                options = ["melting", "freezing", "evaporation",
                           "condensation", "sublimation"]
            solver_res = solve(
                "c6_chem_003", "change_of_state",
                initial_state=init, final_state=final,
            )
            expected = expected_process
            hint = (
                "Solid→Liquid = Melting  |  Liquid→Solid = Freezing\n"
                "Liquid→Gas   = Evaporation  |  Gas→Liquid = Condensation\n"
                "Solid→Gas    = Sublimation"
            )
            questions.append(Question(
                node_id="c6_chem_003", task_type="change_of_state",
                prompt=prompt, expected=expected, options=options,
                hint=hint, difficulty="Medium",
            ))

        else:
            example, is_rev, reason = rng.choice(_REVERSIBILITY_EXAMPLES)
            use_indian = rng.random() < indian_ratio
            context_label = "Indian" if use_indian else "Standard"
            prompt = (
                f"Is the change '{example}' reversible?\n"
                "  (Yes / No / Partially)"
            )
            expected = "Yes" if is_rev else "No"
            options = ["Yes", "No", "Partially"]
            hint = (
                "Physical changes are generally reversible by ordinary means "
                "(heating/cooling). Chemical changes are usually not."
            )
            questions.append(Question(
                node_id="c6_chem_003", task_type="reversibility",
                prompt=prompt, expected=expected, options=options,
                hint=hint, context=context_label,
            ))

    return questions


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def generate_all_questions(
    seed: int = 42,
    n_per_node: int = 6,
    indian_ratio: float = 0.5,
) -> dict[str, List[Question]]:
    """
    Generate questions for all 3 nodes and return keyed dict.

    Usage:
        qs = generate_all_questions(seed=2024, n_per_node=8)
        for node, qlist in qs.items():
            for q in qlist:
                print(q.prompt)
    """
    return {
        "c6_chem_001": generate_node1_questions(seed, n_per_node, indian_ratio),
        "c6_chem_002": generate_node2_questions(seed + 1, n_per_node, indian_ratio),
        "c6_chem_003": generate_node3_questions(seed + 2, n_per_node, indian_ratio),
    }


def verify_answer(question: Question, user_answer: str) -> ProblemResult:
    """
    Verify a user's answer against the expected answer using the solver.
    """
    node_id   = question.node_id
    task_type = question.task_type
    correct   = _loose_match(user_answer, question.expected)

    explanation_map = {
        "c6_chem_001": (
            f"Your answer: '{user_answer}'. "
            f"Expected: '{question.expected}'. "
            "Matter = anything with mass and occupies space."
        ),
        "c6_chem_002": (
            f"Your answer: '{user_answer}'. "
            f"Expected: '{question.expected}'. "
            "Particles in solids are closest, liquids moderate, gases furthest."
        ),
        "c6_chem_003": (
            f"Your answer: '{user_answer}'. "
            f"Expected: '{question.expected}'. "
            "Physical = no new substance, reversible. "
            "Chemical = new substance formed."
        ),
    }
    explanation = explanation_map.get(node_id, "Answer checked.")

    return ProblemResult(
        node_id=node_id,
        correct=correct,
        user_answer=user_answer,
        expected_answer=question.expected,
        explanation=explanation,
        step_by_step=[
            "Step 1: Read the question.",
            "Step 2: Apply the relevant concept.",
            f"Step 3: Compare answer → {'CORRECT ✓' if correct else 'INCORRECT ✗'}.",
            explanation,
        ],
    )


def grade_batch(
    questions: List[Question],
    user_answers: List[str],
) -> BatchResult:
    """
    Grade a list of questions against a list of user answers.
    Returns BatchResult with per-question details and overall accuracy.
    """
    if len(questions) != len(user_answers):
        raise ValueError(
            f"Mismatched lengths: {len(questions)} questions vs "
            f"{len(user_answers)} answers."
        )

    node_id = questions[0].node_id if questions else "unknown"
    results: List[ProblemResult] = []
    correct_count = 0

    for q, ua in zip(questions, user_answers):
        res = verify_answer(q, ua)
        results.append(res)
        if res.correct:
            correct_count += 1

    return BatchResult(
        node_id=node_id,
        total=len(questions),
        correct=correct_count,
        results=results,
    )


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def _shuffle_options(options: list[str], rng: random.Random) -> list[str]:
    """Fisher-Yates-style shuffle via Random.shuffle."""
    opts = list(options)
    rng.shuffle(opts)
    return opts


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

if __name__ == "__main__":
    import json

    print("=" * 60)
    print("CLASS 6 CHEMISTRY – Question Generator Demo")
    print("=" * 60)

    qs = generate_all_questions(seed=2026, n_per_node=4, indian_ratio=0.5)

    for node_id, qlist in qs.items():
        print(f"\n{'─'*60}")
        print(f"  NODE: {node_id}")
        print(f"{'─'*60}")
        for idx, q in enumerate(qlist, 1):
            print(f"\n  Q{idx} [{q.context}] [{q.task_type}]")
            print(f"  {q.prompt}")
            if q.options:
                print(f"  Options: {q.options}")
            print(f"  [Expected: {q.expected}]")
            if q.hint:
                print(f"  Hint: {q.hint}")

    # ── Demo: verify answers ──
    print(f"\n{'='*60}")
    print("ANSWER VERIFICATION DEMO")
    print(f"{'='*60}")

    sample_qs = qs["c6_chem_001"][:2] + qs["c6_chem_002"][:2] + qs["c6_chem_003"][:2]
    sample_answers = [
        "Yes, it is matter",   # Q1
        "3",                   # Q2  (count – will be checked loosely)
        "Very close together", # Q3
        "solid",               # Q4
        "physical",            # Q5
        "physical",            # Q6
    ]

    for q, ua in zip(sample_qs, sample_answers):
        res = verify_answer(q, ua)
        print(f"\n  Q: {q.prompt[:60]}...")
        print(f"  You answered: {ua}")
        print(f"  Expected:    {q.expected}")
        print(f"  {'✓ CORRECT' if res.correct else '✗ INCORRECT'}")
        for step in res.step_by_step:
            print(f"    → {step}")

    # ── Batch grade ──
    print(f"\n{'='*60}")
    print("BATCH GRADE (c6_chem_001)")
    print(f"{'='*60}")
    batch = grade_batch(qs["c6_chem_001"], ["Yes", "Yes", "Yes", "Yes"])
    print(f"  Accuracy: {batch.accuracy:.0%}  ({batch.correct}/{batch.total})")
    print(f"  Mastery (≥90%): {'ACHIEVED ✓' if batch.mastery_met() else 'NOT YET'}")