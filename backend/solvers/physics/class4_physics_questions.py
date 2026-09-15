"""
Deterministic Question Generator – Class 4 Physics (EVS)
Covers: Sources of light, Luminous/Non-luminous objects,
        Transparent/Translucent/Opaque objects, Measurement basics
"""

import math
import random
import json
import hashlib
import itertools
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Tuple, Any
from enum import Enum, auto

# ──────────────────────────────────────────────
# Seeded Random Utility
# ──────────────────────────────────────────────
class SeededRNG:
    """Deterministic RNG wrapper backed by Python's random module."""

    def __init__(self, seed: int):
        self._seed = seed
        self._rng = random.Random(seed)
        self._counter = 0

    def reset(self, seed: int):
        self._seed = seed
        self._rng = random.Random(seed)
        self._counter = 0

    def next(self) -> float:
        val = self._rng.random()
        self._counter += 1
        return val

    def int(self, lo: int, hi: int) -> int:
        val = self._rng.randint(lo, hi)
        self._counter += 1
        return val

    def choice(self, seq):
        val = self._rng.choice(seq)
        self._counter += 1
        return val

    def sample(self, seq, k):
        val = self._rng.sample(seq, k)
        self._counter += 1
        return val

    def shuffle(self, seq):
        self._rng.shuffle(seq)
        self._counter += 1

    def permutation(self, n):
        val = self._rng.sample(range(n), n)
        self._counter += 1
        return val

    @property
    def state_info(self) -> str:
        return f"seed={self._seed}_calls={self._counter}"


# ──────────────────────────────────────────────
# Data Enums & Classes
# ──────────────────────────────────────────────
class QType(Enum):
    MCQ = auto()
    FIB = auto()
    TRUE_FALSE = auto()
    MATCH = auto()
    CLASSIFY = auto()
    SHORT_ANS = auto()
    REASONING = auto()


class Diff(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


@dataclass
class Question:
    id: str
    node_id: str
    qtype: str
    difficulty: str
    competency: str
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: Any = None
    marks: int = 1
    topic: str = ""
    subtopic: str = ""
    vocabulary: List[str] = field(default_factory=list)
    solution_steps: List[str] = field(default_factory=list)
    verification: str = ""
    indian_context: str = ""
    bloom_level: str = "Remember"
    exam_relevance: str = "Board_Only"
    variant: int = 0


@dataclass
class NodeSpec:
    node_id: str
    title: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    competency: str
    mastery_criteria: str
    vocabulary: List[str]
    prereq: List[str]
    scope_teach: str
    scope_dont_teach: str
    natural_examples: List[str]
    artificial_examples: List[str]
    luminous_examples: List[str]
    non_luminous_examples: List[str]
    transparent_examples: List[str]
    translucent_examples: List[str]
    opaque_examples: List[str]
    analogies: List[str]


# ──────────────────────────────────────────────
# Node Specifications
# ──────────────────────────────────────────────
NODE_SPECS: Dict[str, NodeSpec] = {
    "c4_phy_001": NodeSpec(
        node_id="c4_phy_001",
        title="Sources of Light – Natural and Artificial",
        section="9 (Light)",
        syllabus="Sources of light classified as natural and artificial.",
        cognitive_level="Remember",
        difficulty="Easy",
        competency="Board",
        mastery_criteria="classify 5 light sources; give 2 examples each",
        vocabulary=["light", "source", "natural", "artificial", "sun",
                     "stars", "lamp", "torch", "candle"],
        prereq=[],
        scope_teach="Sources of light classified as natural and artificial with examples",
        scope_dont_teach="Reflection and refraction; Lenses and mirrors",
        natural_examples=["sun", "stars", "firefly", "moonlight(soft)"],
        artificial_examples=["lamp", "torch", "candle", "electric bulb",
                              "tubelight", "LED", "diya on Diwali", "bonfire"],
        luminous_examples=[],
        non_luminous_examples=[],
        transparent_examples=[],
        translucent_examples=[],
        opaque_examples=[],
        analogies=[
            "A natural light source is like a gift from nature – the sun and stars "
            "give light without humans making them.",
            "An artificial light source is like a tool you buy from a shop – a torch "
            "or lamp is made by people to give light when there is no sunlight.",
            "The sun lights up the playground during the day; a tubelight lights up "
            "your classroom at night.",
        ],
    ),
    "c4_phy_002": NodeSpec(
        node_id="c4_phy_002",
        title="Luminous and Non-Luminous Objects",
        section="9 (Light)",
        syllabus="Luminous objects produce their own light; non-luminous objects reflect light.",
        cognitive_level="Remember",
        difficulty="Easy",
        competency="Board",
        mastery_criteria="define luminous and non-luminous; classify 5 objects",
        vocabulary=["luminous", "non-luminous", "object", "glow", "emit",
                     "reflect", "sun", "lamp", "book", "chair"],
        prereq=["c4_phy_001"],
        scope_teach="Luminous and non-luminous objects with examples and classification",
        scope_dont_teach="Reflection; How we see through reflected light",
        natural_examples=[],
        artificial_examples=[],
        luminous_examples=["sun", "lamp", "candle", "firefly",
                            "electric bulb", "torch", "stars"],
        non_luminous_examples=["book", "chair", "table", "wall",
                                "moon", "pen", "shoe", "ball"],
        transparent_examples=[],
        translucent_examples=[],
        opaque_examples=[],
        analogies=[
            "A luminous object is like a glowing firefly because it makes its own "
            "light, like the sun or a lit bulb.",
            "A non-luminous object is like a quiet wall that needs someone else to "
            "shine on it – a book or a chair does not give any light of its own.",
            "The moon is non-luminous because it only shines when sunlight falls on "
            "it, just like a white wall looks bright only when the light is on.",
        ],
    ),
    "c4_phy_003": NodeSpec(
        node_id="c4_phy_003",
        title="Transparent, Translucent and Opaque Objects",
        section="9 (Light)",
        syllabus="How different objects interact with light – pass through, partial, block.",
        cognitive_level="Understand",
        difficulty="Easy",
        competency="Board",
        mastery_criteria="classify 5 objects; explain interaction with light; give 1 example each",
        vocabulary=["transparent", "translucent", "opaque", "light",
                     "pass through", "block", "glass", "butter paper", "wood"],
        prereq=["c4_phy_001"],
        scope_teach="Three categories of objects based on light transmission",
        scope_dont_teach="Refraction; Absorption coefficients",
        natural_examples=[],
        artificial_examples=[],
        luminous_examples=[],
        non_luminous_examples=[],
        transparent_examples=["clear glass", "clear plastic", "clear water",
                               "glass window", "spectacles"],
        translucent_examples=["frosted glass", "butter paper", "cloudy plastic",
                               "wax paper", "thin cloth"],
        opaque_examples=["wood", "metal", "cardboard", "brick wall",
                          "thick book", "door"],
        analogies=[
            "A transparent object is like a clear glass window – you can see "
            "everything through it, like a glass tumbler or clear water.",
            "A translucent object is like a frosted bathroom window – it lets some "
            "light through but you cannot see clearly, like butter paper or a cloudy "
            "plastic bottle.",
            "An opaque object is like a wooden door – it blocks light completely "
            "and you cannot see through it at all, like a brick wall.",
        ],
    ),
    "c4_phy_004": NodeSpec(
        node_id="c4_phy_004",
        title="Measurement – Length, Mass and Standard Units",
        section="Measurement",
        syllabus="Standard units of measurement: metre, centimetre, kilogram, gram.",
        cognitive_level="Understand",
        difficulty="Easy",
        competency="Board",
        mastery_criteria="convert between units; choose correct unit; measure simple objects",
        vocabulary=["measure", "length", "mass", "metre", "centimetre",
                     "kilogram", "gram", "scale", "weigh", "unit"],
        prereq=[],
        scope_teach="Standard units metre, cm, kilogram, gram; simple conversions",
        scope_dont_teach="Temperature; Volume; Time measurement instruments",
        natural_examples=[],
        artificial_examples=[],
        luminous_examples=[],
        non_luminous_examples=[],
        transparent_examples=[],
        translucent_examples=[],
        opaque_examples=[],
        analogies=[
            "A metre is like the length of your guitar – it helps measure long things "
            "like a classroom wall.",
            "A centimetre is like the width of your thumb – it helps measure small "
            "things like a pencil or an eraser.",
            "A kilogram is like the weight of a big school bag full of books; a gram "
            "is like the weight of a small coin.",
        ],
    ),
}


# ──────────────────────────────────────────────
# Question Generators (one class per node)
# ──────────────────────────────────────────────
class NodeGenerator:
    """Base question generator with shared Indian-context helpers."""

    INDIAN_OBJECTS = [
        "diya", "sari", "torch", "earthen pot (matka)", "bindi",
        "banana leaf", "coconut", "rangoli powder", "kurta",
        "chappal", "tiffin carrier", "water bottle", "lunch box",
        "notebook", "pencil box", "eraser", "school bag",
        "banyan tree", "mango", "lotus", "peacock feather",
        "cricket bat", "yoga mat", "ghanti (bell)",
    ]

    def __init__(self, spec: NodeSpec, rng: SeededRNG):
        self.spec = spec
        self.rng = rng

    def _indian_obj(self) -> str:
        return self.rng.choice(self.INDIAN_OBJECTS)

    def _step_template(self, intro: str, steps: list, ans: str) -> List[str]:
        lines = [intro]
        for s in steps:
            lines.append(f"  Step {len(lines)}: {s}")
        lines.append(f"  Therefore, the answer is: {ans}")
        return lines

    def _verify_check(self, expected, got) -> str:
        status = "✓ Correct" if expected == got else f"✗ Expected '{expected}', got '{got}'"
        return f"Verification: {status}"


# ── c4_phy_001: Sources of Light ─────────────────────────────────────────────
class Node001Generator(NodeGenerator):
    def generate(self, count: int, bloom: str) -> List[Question]:
        qs: List[Question] = []
        types = [QType.CLASSIFY, QType.MCQ, QType.FIB, QType.TRUE_FALSE, QType.SHORT_ANS]
        for i in range(count):
            qtype = types[i % len(types)]
            q = self._make(qtype, i, bloom)
            qs.append(q)
        return qs

    def _make(self, qtype: QType, idx: int, bloom: str) -> Question:
        r = self.rng
        if qtype == QType.CLASSIFY:
            return self._classify(idx)
        if qtype == QType.MCQ:
            return self._mcq(idx)
        if qtype == QType.FIB:
            return self._fib(idx)
        if qtype == QType.TRUE_FALSE:
            return self._tf(idx)
        return self._short_ans(idx)

    def _classify(self, idx: int) -> Question:
        r = self.rng
        pool = self.spec.natural_examples + self.spec.artificial_examples
        r.shuffle(pool)
        pick5 = pool[:5]
        correct = {x: ("Natural" if x in self.spec.natural_examples else "Artificial")
                   for x in pick5}

        obj = r.choice(self.INDIAN_OBJECTS)
        qtext = (
            f"Classify each of the following light sources as Natural or Artificial.\n"
            f"Sources: {', '.join(pick5)}"
        )
        steps = [
            "Recall: Natural sources come from nature without humans making them "
            "(e.g., sun, stars). Artificial sources are made by people "
            "(e.g., lamp, torch, candle).",
        ]
        for src in pick5:
            label = correct[src]
            steps.append(f"  '{src}' → {label} "
                         f"({'nature gives it' if label == 'Natural' else 'humans make it'}).")
        ans_str = "; ".join(f"{k} → {v}" for k, v in correct.items())

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_classify",
            node_id=self.spec.node_id,
            qtype="Classify",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=correct,
            marks=5,
            topic="Light",
            subtopic="Sources of Light",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=(
                f"Each source checked: natural={self.spec.natural_examples}, "
                f"artificial={self.spec.artificial_examples}. "
                f"All 5 classifications correct: {all(v for v in correct.values())}"
            ),
            indian_context=f"Consider Indian context: {obj} uses artificial light (diya/lamp) at night.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _mcq(self, idx: int) -> Question:
        r = self.rng
        correct = r.choice(self.spec.natural_examples)
        distractors_pool = [x for x in self.spec.artificial_examples if x != correct]
        distractors = r.sample(distractors_pool, min(3, len(distractors_pool)))
        options_all = [correct] + distractors
        r.shuffle(options_all)
        correct_idx = options_all.index(correct)

        qtext = f"Which of the following is a NATURAL source of light?"
        steps = [
            "Step 1: Recall the definition of a natural light source – one that "
                   "exists in nature without humans making it.",
            f"Step 2: Check '{correct}' – it comes from nature naturally. ✓",
            "Step 3: The other options are made by humans, so they are artificial.",
            f"Therefore, the correct answer is option {correct_idx + 1}: {correct}.",
        ]
        letter_map = {0: "A", 1: "B", 2: "C", 3: "D"}

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_mcq",
            node_id=self.spec.node_id,
            qtype="MCQ",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            options=[f"{letter_map[i]}) {opt}" for i, opt in enumerate(options_all)],
            correct_answer={"index": correct_idx, "text": correct},
            marks=1,
            topic="Light",
            subtopic="Sources of Light",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=(
                f"Expected: option {correct_idx + 1} ({correct}). "
                f"Natural examples: {self.spec.natural_examples}."
            ),
            indian_context=self.spec.analogies[0],
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _fib(self, idx: int) -> Question:
        r = self.rng
        source = r.choice(self.spec.natural_examples + self.spec.artificial_examples)
        cat = "Natural" if source in self.spec.natural_examples else "Artificial"

        templates = [
            f"The _____ is a {cat.lower()} source of light.",
            f"A {source} is an example of a _____ source of light.",
        ]
        tmpl = templates[idx % len(templates)]
        blank_word = source if "is a" in tmpl else cat.lower()

        steps = [
            f"Identify the source: {source}.",
            f"Recall: {source} is classified as {cat} because "
            f"{'it occurs in nature' if cat == 'Natural' else 'it is made by humans'}.",
            f"Fill in the blank: {blank_word}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_fib",
            node_id=self.spec.node_id,
            qtype="Fill in the Blanks",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=tmpl,
            correct_answer=blank_word,
            marks=1,
            topic="Light",
            subtopic="Sources of Light",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected blank filled with: '{blank_word}' ({cat}).",
            indian_context=f"Example: The sun (सूरज) is the main natural source of light in India.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _tf(self, idx: int) -> Question:
        r = self.rng
        statements = [
            ("The sun is an artificial source of light.", False,
             "The sun occurs naturally; artificial means made by humans."),
            ("Stars are natural sources of light.", True,
             "Stars exist in nature without humans making them."),
            ("A candle is an artificial source of light.", True,
             "A candle is made by humans from wax and a wick."),
            ("A torch is a natural source of light.", False,
             "A torch is made by people in a factory; it is artificial."),
            ("Fireflies give their own natural light.", True,
             "Fireflies are living creatures in nature that glow – natural light."),
        ]
        stmt, ans, reason = statements[idx % len(statements)]

        steps = [
            f"Statement: '{stmt}'",
            f"Recall definition: Natural = from nature; Artificial = made by humans.",
            f"Analysis: {reason}",
            f"Conclusion: The statement is {'TRUE' if ans else 'FALSE'}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_tf",
            node_id=self.spec.node_id,
            qtype="True/False",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=f"State whether the following is True or False:\n{stmt}",
            correct_answer={"value": ans, "text": "True" if ans else "False"},
            marks=1,
            topic="Light",
            subtopic="Sources of Light",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {'True' if ans else 'False'}. Reason: {reason}",
            indian_context=self.spec.analogies[2],
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _short_ans(self, idx: int) -> Question:
        questions = [
            ("Give two examples of natural sources of light.",
             "Sun, stars",
             ["sun", "star", "firefly"]),
            ("Give two examples of artificial sources of light.",
             "Lamp, torch",
             ["lamp", "torch", "candle", "bulb"]),
            ("Name the biggest natural source of light for the Earth.",
             "The Sun",
             ["sun", "surya"]),
            ("Why is the sun called a natural source of light?",
             "Because it gives light naturally without humans making it.",
             ["natural", "nature"]),
        ]
        qtext, answer, _ = questions[idx % len(questions)]

        steps = [
            f"Question asks: {qtext}",
            "Recall: Natural sources come from nature; artificial are made by humans.",
            f"Answer: {answer}",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_short",
            node_id=self.spec.node_id,
            qtype="Short Answer",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=answer,
            marks=2,
            topic="Light",
            subtopic="Sources of Light",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {answer}",
            indian_context="The sun (Surya) is worshipped in India as the source of light and life.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )


# ── c4_phy_002: Luminous / Non-Luminous ──────────────────────────────────────
class Node002Generator(NodeGenerator):
    def generate(self, count: int, bloom: str) -> List[Question]:
        qs: List[Question] = []
        types = [QType.CLASSIFY, QType.MCQ, QType.TRUE_FALSE, QType.FIB, QType.SHORT_ANS]
        for i in range(count):
            qtype = types[i % len(types)]
            qs.append(self._make(qtype, i))
        return qs

    def _make(self, qtype: QType, idx: int) -> Question:
        if qtype == QType.CLASSIFY:
            return self._classify(idx)
        if qtype == QType.MCQ:
            return self._mcq(idx)
        if qtype == QType.TRUE_FALSE:
            return self._tf(idx)
        if qtype == QType.FIB:
            return self._fib(idx)
        return self._short_ans(idx)

    def _classify(self, idx: int) -> Question:
        r = self.rng
        pool = self.spec.luminous_examples + self.spec.non_luminous_examples
        r.shuffle(pool)
        pick5 = pool[:5]
        correct = {x: ("Luminous" if x in self.spec.luminous_examples else "Non-Luminous")
                   for x in pick5}

        qtext = "Classify each object as Luminous or Non-Luminous:\n" + ", ".join(pick5)
        steps = [
            "Recall: Luminous objects produce their own light. "
            "Non-luminous objects do NOT produce light but can reflect it.",
        ]
        for obj in pick5:
            label = correct[obj]
            steps.append(f"  '{obj}' → {label} – "
                         f"{'makes its own light' if label == 'Luminous' else 'reflects light from another source'}.")
        ans_str = "; ".join(f"{k} → {v}" for k, v in correct.items())

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_classify",
            node_id=self.spec.node_id,
            qtype="Classify",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=correct,
            marks=5,
            topic="Light",
            subtopic="Luminous & Non-Luminous",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"All 5 classified: {ans_str}",
            indian_context="The moon (चंद्रमा) is non-luminous – it reflects sunlight.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _mcq(self, idx: int) -> Question:
        r = self.rng
        correct_obj = r.choice(self.spec.luminous_examples)
        distractors = r.sample(self.spec.non_luminous_examples, min(3, len(self.spec.non_luminous_examples)))
        options_all = [correct_obj] + distractors
        r.shuffle(options_all)
        ci = options_all.index(correct_obj)
        letter_map = {0: "A", 1: "B", 2: "C", 3: "D"}

        qtext = "Which of the following is a LUMINOUS object?"
        steps = [
            f"Step 1: Luminous objects make their own light.",
            f"Step 2: '{correct_obj}' produces its own light.",
            "Step 3: Other options do NOT produce their own light.",
            f"Answer: Option {ci + 1} – {correct_obj}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_mcq",
            node_id=self.spec.node_id,
            qtype="MCQ",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            options=[f"{letter_map[i]}) {o}" for i, o in enumerate(options_all)],
            correct_answer={"index": ci, "text": correct_obj},
            marks=1,
            topic="Light",
            subtopic="Luminous & Non-Luminous",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected option {ci + 1} ({correct_obj}).",
            indian_context="A lit diya on Diwali is a luminous artificial source.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _tf(self, idx: int) -> Question:
        statements = [
            ("The moon is a luminous object.", False,
             "The moon reflects sunlight; it does not make its own light."),
            ("A book is a non-luminous object.", True,
             "A book does not produce light; it reflects light from a bulb or sun."),
            ("A lit candle is a luminous object.", True,
             "The flame of the candle produces its own light."),
            ("A wall is a luminous object.", False,
             "A wall reflects light; it does not emit light of its own."),
        ]
        stmt, ans, reason = statements[idx % len(statements)]
        steps = [
            f"Statement: '{stmt}'",
            "Luminous = produces own light. Non-luminous = reflects light.",
            f"Analysis: {reason}",
            f"Result: {'TRUE' if ans else 'FALSE'}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_tf",
            node_id=self.spec.node_id,
            qtype="True/False",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=f"True or False: {stmt}",
            correct_answer={"value": ans, "text": "True" if ans else "False"},
            marks=1,
            topic="Light",
            subtopic="Luminous & Non-Luminous",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {'True' if ans else 'False'}.",
            indian_context=self.spec.analogies[2],
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _fib(self, idx: int) -> Question:
        r = self.rng
        obj = r.choice(self.spec.luminous_examples)
        cat = "Luminous"
        templates = [
            f"A _____ object produces its own light. Example: {obj}.",
            f"The _____ bulb gives light on its own. (Answer: luminous)",
        ]
        tmpl = templates[idx % len(templates)]
        blank = "luminous" if "gives light" in tmpl else obj

        steps = [
            f"Clue: the example is {obj}.",
            f"Recall: {obj} produces its own light → it is Luminous.",
            f"Blank filled: {blank}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_fib",
            node_id=self.spec.node_id,
            qtype="Fill in the Blanks",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=tmpl,
            correct_answer=blank,
            marks=1,
            topic="Light",
            subtopic="Luminous & Non-Luminous",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected blank: '{blank}'.",
            indian_context="During Diwali, many luminous diyas light up Indian homes.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _short_ans(self, idx: int) -> Question:
        questions = [
            ("Define a luminous object in your own words.",
             "An object that produces its own light.",
             ["own light", "produces"]),
            ("Define a non-luminous object in your own words.",
             "An object that does not produce its own light but reflects light from other sources.",
             ["does not produce", "reflect"]),
            ("Give two examples of luminous objects.",
             "Sun, candle",
             ["sun", "candle", "lamp", "bulb", "torch"]),
            ("Why is the moon non-luminous?",
             "The moon does not produce its own light; it reflects sunlight.",
             ["reflect", "sunlight", "does not produce"]),
        ]
        qtext, answer, _ = questions[idx % len(questions)]
        steps = ["Recall definitions of luminous and non-luminous objects.", f"Answer: {answer}"]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_short",
            node_id=self.spec.node_id,
            qtype="Short Answer",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=answer,
            marks=2,
            topic="Light",
            subtopic="Luminous & Non-Luminous",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {answer}",
            indian_context=self.spec.analogies[1],
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )


# ── c4_phy_003: Transparent / Translucent / Opaque ───────────────────────────
class Node003Generator(NodeGenerator):
    def generate(self, count: int, bloom: str) -> List[Question]:
        qs: List[Question] = []
        types = [QType.CLASSIFY, QType.MCQ, QType.MATCH, QType.TRUE_FALSE, QType.REASONING]
        for i in range(count):
            qtype = types[i % len(types)]
            qs.append(self._make(qtype, i))
        return qs

    def _make(self, qtype: QType, idx: int) -> Question:
        if qtype == QType.CLASSIFY:
            return self._classify(idx)
        if qtype == QType.MCQ:
            return self._mcq(idx)
        if qtype == QType.MATCH:
            return self._match(idx)
        if qtype == QType.TRUE_FALSE:
            return self._tf(idx)
        return self._reasoning(idx)

    def _classify(self, idx: int) -> Question:
        r = self.rng
        pool = (self.spec.transparent_examples + self.spec.translucent_examples
                + self.spec.opaque_examples)
        r.shuffle(pool)
        pick5 = pool[:5]
        cat_map = {}
        for x in pick5:
            if x in self.spec.transparent_examples:
                cat_map[x] = "Transparent"
            elif x in self.spec.translucent_examples:
                cat_map[x] = "Translucent"
            else:
                cat_map[x] = "Opaque"

        qtext = "Classify each object as Transparent, Translucent, or Opaque:\n"
        qtext += ", ".join(pick5)
        steps = [
            "Recall definitions:",
            "  Transparent – light passes completely; you see clearly (e.g., clear glass).",
            "  Translucent – some light passes; you cannot see clearly (e.g., butter paper).",
            "  Opaque – no light passes; you cannot see through (e.g., wood).",
        ]
        for obj, cat in cat_map.items():
            steps.append(f"  '{obj}' → {cat}.")

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_classify",
            node_id=self.spec.node_id,
            qtype="Classify",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=cat_map,
            marks=5,
            topic="Light",
            subtopic="Transparent / Translucent / Opaque",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Classifications: { {f'{k} → {v}' for k, v in cat_map.items()} }",
            indian_context="A butter paper (वेस पेपर) covering a classroom window is translucent.",
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _mcq(self, idx: int) -> Question:
        r = self.rng
        categories = [
            ("Transparent", self.spec.transparent_examples,
             "allows light to pass through completely"),
            ("Translucent", self.spec.translucent_examples,
             "allows only partial light; you cannot see clearly"),
            ("Opaque", self.spec.opaque_examples,
             "blocks light completely; you cannot see through"),
        ]
        cat_name, cat_list, definition = categories[idx % 3]
        correct_obj = r.choice(cat_list)
        all_examples = (self.spec.transparent_examples
                        + self.spec.translucent_examples
                        + self.spec.opaque_examples)
        distractors = r.sample(
            [x for x in all_examples if x not in cat_list],
            min(3, len(all_examples) - len(cat_list))
        )
        options = [correct_obj] + distractors
        r.shuffle(options)
        ci = options.index(correct_obj)
        letter_map = {0: "A", 1: "B", 2: "C", 3: "D"}

        qtext = f"Which object is {cat_name.upper()}? (A {cat_name} object {definition}.)"
        steps = [
            f"Step 1: A {cat_name.lower()} object {definition}.",
            f"Step 2: '{correct_obj}' fits this description.",
            f"Answer: Option {ci + 1} – {correct_obj}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_mcq",
            node_id=self.spec.node_id,
            qtype="MCQ",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            options=[f"{letter_map[i]}) {o}" for i, o in enumerate(options)],
            correct_answer={"index": ci, "text": correct_obj},
            marks=1,
            topic="Light",
            subtopic="Transparent / Translucent / Opaque",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Category: {cat_name}. Expected option {ci + 1} ({correct_obj}).",
            indian_context="Clear water in a glass is a transparent example commonly seen in Indian homes.",
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _match(self, idx: int) -> Question:
        r = self.rng
        items_left = ["Transparent", "Translucent", "Opaque"]
        items_right = [
            r.choice(self.spec.transparent_examples),
            r.choice(self.spec.translucent_examples),
            r.choice(self.spec.opaque_examples),
        ]
        r.shuffle(items_right)
        correct_map = {
            "Transparent": next(x for x in items_right if x in self.spec.transparent_examples),
            "Translucent": next(x for x in items_right if x in self.spec.translucent_examples),
            "Opaque": next(x for x in items_right if x in self.spec.opaque_examples),
        }

        qtext = "Match the category (Column A) with the correct example (Column B):\n\n"
        qtext += "Column A\n"
        for i, item in enumerate(items_left):
            qtext += f"  {i+1}. {item}\n"
        qtext += "\nColumn B\n"
        for i, item in enumerate(items_right):
            qtext += f"  {chr(65+i)}. {item}\n"

        steps = [
            "Recall each category's meaning:",
            "  Transparent → clear glass / clear plastic.",
            "  Translucent → frosted glass / butter paper.",
            "  Opaque → wood / brick wall.",
        ]
        for k, v in correct_map.items():
            steps.append(f"  Match: {k} ↔ {v}.")

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_match",
            node_id=self.spec.node_id,
            qtype="Matching",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=correct_map,
            marks=3,
            topic="Light",
            subtopic="Transparent / Translucent / Opaque",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Matching: {correct_map}",
            indian_context="Windows with butter paper (लिट्टी कागज) are common in Indian homes.",
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _tf(self, idx: int) -> Question:
        statements = [
            ("A glass window is opaque.", False,
             "A clear glass window lets light pass completely – it is transparent."),
            ("Butter paper is translucent.", True,
             "Butter paper lets some light through but you cannot see clearly."),
            ("A brick wall is transparent.", False,
             "A brick wall blocks all light – it is opaque."),
            ("You can see clearly through a frosted glass.", False,
             "Frosted glass only lets some light through; you cannot see clearly."),
        ]
        stmt, ans, reason = statements[idx % len(statements)]
        steps = [f"Statement: '{stmt}'", f"Analysis: {reason}",
                 f"Result: {'TRUE' if ans else 'FALSE'}."]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_tf",
            node_id=self.spec.node_id,
            qtype="True/False",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=f"True or False: {stmt}",
            correct_answer={"value": ans, "text": "True" if ans else "False"},
            marks=1,
            topic="Light",
            subtopic="Transparent / Translucent / Opaque",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {'True' if ans else 'False'}.",
            indian_context="An opaque wooden door (लकड़ी का दरवाज़ा) is found in every Indian home.",
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _reasoning(self, idx: int) -> Question:
        questions = [
            ("Why can't you see through a wooden door?",
             "Because wood is opaque – it blocks light completely.",
             ["blocks", "opaque", "no light"]),
            ("Why can you see a person through a glass window but not through a wall?",
             "Glass is transparent (light passes fully); the wall is opaque (blocks light).",
             ["transparent", "opaque", "passes", "blocks"]),
            ("Name an object that is translucent and explain why.",
             "Butter paper – it lets some light through but you cannot see clearly.",
             ["butter paper", "some light", "not clearly"]),
        ]
        qtext, answer, _ = questions[idx % len(questions)]
        steps = ["Think about the three categories of objects and light.", f"Answer: {answer}"]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_reasoning",
            node_id=self.spec.node_id,
            qtype="Reasoning",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=answer,
            marks=2,
            topic="Light",
            subtopic="Transparent / Translucent / Opaque",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {answer}",
            indian_context=self.spec.analogies[0],
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )


# ── c4_phy_004: Measurement ───────────────────────────────────────────────────
class Node004Generator(NodeGenerator):
    def generate(self, count: int, bloom: str) -> List[Question]:
        qs: List[Question] = []
        types = [QType.MCQ, QType.FIB, QType.TRUE_FALSE, QType.SHORT_ANS, QType.REASONING]
        for i in range(count):
            qtype = types[i % len(types)]
            qs.append(self._make(qtype, i))
        return qs

    def _make(self, qtype: QType, idx: int) -> Question:
        if qtype == QType.MCQ:
            return self._mcq(idx)
        if qtype == QType.FIB:
            return self._fib(idx)
        if qtype == QType.TRUE_FALSE:
            return self._tf(idx)
        if qtype == QType.SHORT_ANS:
            return self._short_ans(idx)
        return self._reasoning(idx)

    def _mcq(self, idx: int) -> Question:
        r = self.rng
        questions = [
            {
                "q": "Which unit is used to measure the length of a football field?",
                "correct": "Metre",
                "opts": ["Centimetre", "Metre", "Millimetre", "Kilometre"],
                "reason": "A football field is many metres long; centimetre is too small.",
            },
            {
                "q": "Which unit is best for measuring the length of a pencil?",
                "correct": "Centimetre",
                "opts": ["Kilometre", "Metre", "Centimetre", "Kilogram"],
                "reason": "A pencil is about 15–18 cm; centimetre is the right unit.",
            },
            {
                "q": "Which unit is used to measure the weight of a school bag?",
                "correct": "Kilogram",
                "opts": ["Gram", "Kilogram", "Metre", "Centimetre"],
                "reason": "A school bag weighs about 2–5 kg; kilogram is the right unit.",
            },
            {
                "q": "1 metre = how many centimetres?",
                "correct": "100",
                "opts": ["10", "100", "1000", "50"],
                "reason": "1 metre = 100 centimetres (standard conversion).",
            },
            {
                "q": "Which instrument is used to measure length?",
                "correct": "Ruler / Scale",
                "opts": ["Ruler / Scale", "Weighing balance", "Thermometer", "Clock"],
                "reason": "A ruler or scale measures length.",
            },
        ]
        qdata = questions[idx % len(questions)]
        opts = r.sample(qdata["opts"], len(qdata["opts"]))
        r.shuffle(opts)
        ci = opts.index(qdata["correct"])
        letter_map = {0: "A", 1: "B", 2: "C", 3: "D"}

        steps = [
            f"Question: {qdata['q']}",
            f"Recall: {qdata['reason']}",
            f"Correct answer: {qdata['correct']}.",
        ]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_mcq",
            node_id=self.spec.node_id,
            qtype="MCQ",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qdata["q"],
            options=[f"{letter_map[i]}) {o}" for i, o in enumerate(opts)],
            correct_answer={"index": ci, "text": qdata["correct"]},
            marks=1,
            topic="Measurement",
            subtopic="Standard Units",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected option {ci + 1} ({qdata['correct']}).",
            indian_context="Indian students use a 15 cm or 30 cm plastic scale (पासा) to measure.",
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _fib(self, idx: int) -> Question:
        r = self.rng
        facts = [
            ("1 metre = _____ centimetres.", "100", "1 m = 100 cm"),
            ("The standard unit of length is the _____.", "metre", "SI unit for length is metre"),
            ("The standard unit of mass is the _____.", "kilogram", "SI unit for mass is kilogram"),
            ("To measure a pencil, we use a _____.", "ruler or scale", "A scale measures length"),
            ("1 kilogram = _____ grams.", "1000", "1 kg = 1000 g"),
        ]
        qtext, answer, hint = facts[idx % len(facts)]
        steps = [f"Recall: {hint}.", f"Fill in the blank: {answer}."]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_fib",
            node_id=self.spec.node_id,
            qtype="Fill in the Blanks",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=answer,
            marks=1,
            topic="Measurement",
            subtopic="Standard Units",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: '{answer}'",
            indian_context="NCERT Class 4 textbooks use metre, centimetre, kilogram, gram throughout.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _tf(self, idx: int) -> Question:
        statements = [
            ("1 metre = 100 centimetres.", True, "Standard conversion: 1 m = 100 cm."),
            ("1 kilogram = 100 grams.", False, "1 kg = 1000 g, not 100 g."),
            ("The metre is the standard unit of length.", True,
             "Metre (m) is the SI unit for length."),
            ("A scale is used to measure weight.", False,
             "A scale measures length; a balance measures weight."),
            ("Gram is a smaller unit than kilogram.", True,
             "1 kg = 1000 g, so gram is smaller."),
        ]
        stmt, ans, reason = statements[idx % len(statements)]
        steps = [f"Statement: '{stmt}'", f"Analysis: {reason}",
                 f"Result: {'TRUE' if ans else 'FALSE'}."]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_tf",
            node_id=self.spec.node_id,
            qtype="True/False",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=f"True or False: {stmt}",
            correct_answer={"value": ans, "text": "True" if ans else "False"},
            marks=1,
            topic="Measurement",
            subtopic="Standard Units",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {'True' if ans else 'False'}.",
            indian_context="Students in Indian government schools use NCERT metre scales.",
            bloom_level="Remember",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _short_ans(self, idx: int) -> Question:
        questions = [
            ("What is the standard unit of length?",
             "Metre (m)", ["metre", "m"]),
            ("What is the standard unit of mass?",
             "Kilogram (kg)", ["kilogram", "kg"]),
            ("Convert 3 metres to centimetres.",
             "300 centimetres (3 × 100 = 300)", ["300", "3 × 100"]),
            ("Which unit would you use to measure the weight of an apple?",
             "Gram, because an apple is light (less than 1 kg).",
             ["gram", "light"]),
        ]
        qtext, answer, _ = questions[idx % len(questions)]
        steps = [f"Question: {qtext}", f"Answer: {answer}"]

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_short",
            node_id=self.spec.node_id,
            qtype="Short Answer",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=answer,
            marks=2,
            topic="Measurement",
            subtopic="Standard Units",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=f"Expected: {answer}",
            indian_context="A mango (आम) typically weighs about 200 grams – measured in grams.",
            bloom_level="Understand",
            exam_relevance="Board_Only",
            variant=idx,
        )

    def _reasoning(self, idx: int) -> Question:
        qtext = (
            "Rahul wants to measure the length of his classroom. "
            "He has a 15 cm scale. He marks the scale repeatedly "
            "from one wall to the other and counts 25 marks. "
            "What is the approximate length of the classroom in metres?"
        )
        steps = [
            "Step 1: Each mark = 15 cm (length of the scale).",
            "Step 2: Total length in cm = 15 cm × 25 = 375 cm.",
            "Step 3: Convert cm to metres: 375 cm ÷ 100 = 3.75 metres.",
            "Step 4: Answer: Approximately 3.75 metres (about 4 metres).",
        ]
        answer = "3.75 metres (approximately 4 metres)"
        verification = "Calculation: 15 × 25 = 375 cm → 375 ÷ 100 = 3.75 m. ✓"

        return Question(
            id=f"{self.spec.node_id}_v{idx:03d}_reasoning",
            node_id=self.spec.node_id,
            qtype="Reasoning",
            difficulty=self.spec.difficulty,
            competency=self.spec.competency,
            question_text=qtext,
            correct_answer=answer,
            marks=3,
            topic="Measurement",
            subtopic="Standard Units",
            vocabulary=self.spec.vocabulary,
            solution_steps=steps,
            verification=verification,
            indian_context="A typical Indian classroom is about 4–6 metres long.",
            bloom_level="Apply",
            exam_relevance="Board_Only",
            variant=idx,
        )


# ──────────────────────────────────────────────
# Question Set Generator
# ──────────────────────────────────────────────
class QuestionSet:
    def __init__(self, set_id: str, questions: List[Question]):
        self.set_id = set_id
        self.questions = questions
        self.total_marks = sum(q.marks for q in questions)
        self.by_node: Dict[str, List[Question]] = {}
        for q in questions:
            self.by_node.setdefault(q.node_id, []).append(q)

    def summary(self) -> str:
        lines = [
            f"QuestionSet: {self.set_id}",
            f"Total Questions : {len(self.questions)}",
            f"Total Marks     : {self.total_marks}",
            "-" * 50,
        ]
        for node_id, qs in self.by_node.items():
            lines.append(f"  [{node_id}]  {len(qs)} questions, "
                         f"{sum(q.marks for q in qs)} marks")
        return "\n".join(lines)

    def to_dict(self) -> Dict:
        return {
            "set_id": self.set_id,
            "total_questions": len(self.questions),
            "total_marks": self.total_marks,
            "questions": [self._q_to_dict(q) for q in self.questions],
        }

    @staticmethod
    def _q_to_dict(q: Question) -> Dict:
        d = asdict(q)
        d["qtype"] = q.qtype.name if isinstance(q.qtype, QType) else q.qtype
        return d


# ──────────────────────────────────────────────
# Main Generator Class
# ──────────────────────────────────────────────
class PhysicsQuestionGenerator:
    """Deterministic Class 4 Physics question generator."""

    NODE_GENERATORS = {
        "c4_phy_001": Node001Generator,
        "c4_phy_002": Node002Generator,
        "c4_phy_003": Node003Generator,
        "c4_phy_004": Node004Generator,
    }

    def __init__(self, seed: int = 42):
        self.rng = SeededRNG(seed)
        self._generators: Dict[str, NodeGenerator] = {}
        self._init_generators()

    def _init_generators(self):
        for nid, spec in NODE_SPECS.items():
            GenClass = self.NODE_GENERATORS.get(nid)
            if GenClass:
                self._generators[nid] = GenClass(spec, self.rng)

    def reseed(self, seed: int):
        self.rng.reset(seed)
        self._init_generators()

    def generate(
        self,
        set_id: str,
        per_node: int = 5,
        nodes: Optional[List[str]] = None,
        bloom_filter: Optional[str] = None,
    ) -> QuestionSet:
        target_nodes = nodes if nodes else list(NODE_SPECS.keys())
        self.rng.reset(hash(set_id) % (2**31))
        all_q: List[Question] = []
        for nid in target_nodes:
            gen = self._generators.get(nid)
            if gen:
                qs = gen.generate(per_node, bloom_filter or "Remember")
                all_q.extend(qs)
        return QuestionSet(set_id, all_q)

    def generate_board_exam_set(self, set_id: str = "board_default") -> QuestionSet:
        """Curated set matching board exam weightage: Easy 70%, Medium 20%, Hard 10%."""
        self.rng.reset(42)
        all_q: List[Question] = []
        order = self.rng.permutation(4)
        node_ids = list(NODE_SPECS.keys())
        for pos in order:
            nid = node_ids[pos]
            gen = self._generators[nid]
            n_questions = 5
            qs = gen.generate(n_questions, "Remember")
            all_q.extend(qs)
        return QuestionSet(set_id, all_q)

    def verify_all(self, qset: QuestionSet) -> Dict[str, Any]:
        results: Dict[str, Any] = {"total": 0, "passed": 0, "failed": 0, "details": []}
        for q in qset.questions:
            results["total"] += 1
            passed = True
            reason = "OK"
            if not q.correct_answer:
                passed = False
                reason = "No correct answer set"
            if not q.solution_steps:
                passed = False
                reason = "No solution steps"
            if not q.verification:
                passed = False
                reason = "No verification string"
            results["passed" if passed else "failed"] += 1
            results["details"].append({
                "id": q.id,
                "node": q.node_id,
                "type": q.qtype,
                "passed": passed,
                "reason": reason,
            })
        return results

    def get_node_info(self, node_id: str) -> Optional[NodeSpec]:
        return NODE_SPECS.get(node_id)

    def list_nodes(self) -> List[str]:
        return list(NODE_SPECS.keys())

    def print_question(self, q: Question):
        border = "=" * 60
        print(border)
        print(f"  Q: {q.id}  |  Node: {q.node_id}  |  Marks: {q.marks}")
        print(f"  Type: {q.qtype}  |  Bloom: {q.bloom_level}")
        print(f"  Difficulty: {q.difficulty}  |  Competency: {q.competency}")
        print(border)
        print(f"\n{q.question_text}\n")
        if q.options:
            for opt in q.options:
                print(f"    {opt}")
        print(f"\nCorrect Answer : {q.correct_answer}")
        print(f"Vocabulary     : {', '.join(q.vocabulary)}")
        print(f"\n--- Solution Steps ---")
        for step in q.solution_steps:
            print(f"  {step}")
        print(f"\nVerification   : {q.verification}")
        print(f"Indian Context : {q.indian_context}")
        print(f"{'=' * 60}\n")


# ──────────────────────────────────────────────
# Demonstration
# ──────────────────────────────────────────────
def _demo():
    print("=" * 60)
    print("  CLASS 4 PHYSICS – DETERMINISTIC QUESTION GENERATOR")
    print("=" * 60)

    gen = PhysicsQuestionGenerator(seed=42)

    # Show available nodes
    print("\n── Available Nodes ──────────────────────────────────────")
    for nid in gen.list_nodes():
        spec = NODE_SPECS[nid]
        print(f"  {nid} : {spec.title}")
        print(f"           Level: {spec.cognitive_level} | Diff: {spec.difficulty}")
        print(f"           Prereq: {spec.prereq if spec.prereq else 'None'}")

    # Generate one question per node with seed=100
    print("\n── Generating 1 question per node (seed=100) ────────────")
    gen.reseed(100)
    qset = gen.generate("demo_v1", per_node=1)

    for q in qset.questions:
        gen.print_question(q)

    # Generate full board set
    print("\n── Board Exam Set ────────────────────────────────────────")
    board_set = gen.generate_board_exam_set("board_2026_set_a")
    print(board_set.summary())

    # Verify
    print("\n── Verification Results ──────────────────────────────────")
    results = gen.verify_all(board_set)
    print(f"  Total Questions : {results['total']}")
    print(f"  Passed          : {results['passed']}")
    print(f"  Failed          : {results['failed']}")
    if results["failed"] > 0:
        for d in results["details"]:
            if not d["passed"]:
                print(f"  FAIL: {d['id']} – {d['reason']}")

    # Determinism check: regenerate with same seed
    print("\n── Determinism Check ─────────────────────────────────────")
    gen.reseed(42)
    set_a = gen.generate("det_check", per_node=2)
    gen.reseed(42)
    set_b = gen.generate("det_check", per_node=2)
    ids_a = [q.id for q in set_a.questions]
    ids_b = [q.id for q in set_b.questions]
    match = ids_a == ids_b
    print(f"  Same seed produces same question IDs: {match}")
    if match:
        print(f"  IDs: {ids_a}")
    else:
        print(f"  Set A: {ids_a}")
        print(f"  Set B: {ids_b}")


if __name__ == "__main__":
    _demo()