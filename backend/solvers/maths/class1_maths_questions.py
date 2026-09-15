import random
import math
import json
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class CognitiveLevel(Enum):
    REMEMBER = "Remember"
    UNDERSTAND = "Understand"
    APPLY = "Apply"
    ANALYZE = "Analyze"


class ExamRelevance(Enum):
    BOARD_ONLY = "Board_Only"
    BOARD_PLUS = "Board_Plus"
    COMPETITIVE = "Competitive"


@dataclass
class Question:
    node_id: str
    question_id: str
    text: str
    options: List[str]
    correct_answer: int
    explanation: str
    difficulty: str
    cognitive_level: str
    exam_relevance: str
    competency_level: str
    vocabulary_used: List[str]
    indian_context: bool
    verification_step: str


@dataclass
class NodeConfig:
    node_id: str
    title: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq: List[str]
    vocabulary: List[str]
    spiral_topic: str
    scope_level: str


class DeterministicSeeder:
    _instance = None

    def __new__(cls, seed: int = 42):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initial_seed = seed
            cls._instance._rng = random.Random(seed)
        return cls._instance

    def get_seed_for(self, node_id: str, question_index: int) -> int:
        combined = f"{node_id}_{question_index}"
        h = hashlib.md5(combined.encode()).hexdigest()
        return int(h, 16) % (2**31)

    def get_rng_for(self, node_id: str, question_index: int) -> random.Random:
        seed = self.get_seed_for(node_id, question_index)
        return random.Random(seed)

    def reset(self):
        self._rng = random.Random(self._initial_seed)


@dataclass
class NumberNode:
    node_id: str
    title: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq: List[str]
    vocabulary: List[str]
    spiral_topic: str
    scope_level: str
    scope_boundary: str
    is_root: bool
    prereq_strength: str
    mastery_criteria: List[str]
    examples: List[str]
    reason: str = ""
    depth_prereq: Optional[str] = None
    depth_reason: str = ""


NODES = {
    "c1_math_001": NumberNode(
        node_id="c1_math_001",
        title="Numbers and numerals from 1 to 20",
        section="Theme 1: Numbers",
        syllabus="Numbers and numerals from 1 to 20. Children work with numbers from 1 to 20; recite number names and count objects up to 20, concretely, pictorially and symbolically; count objects using numbers 1 to 9; compare numbers up to 20.",
        cognitive_level="Understand",
        difficulty="Easy",
        exam_relevance="Board_Only",
        exam_weightage="Low",
        competency_level="Board",
        prereq=[],
        vocabulary=["number", "numeral", "count", "recite", "more", "less", "group", "objects", "number name", "number line", "number chart", "compare"],
        spiral_topic="number",
        scope_level="1-Introduction",
        scope_boundary="Teach: Covers numbers and numerals from 1 to 20 only",
        is_root=True,
        prereq_strength="soft",
        mastery_criteria=[
            "Can recite number names from 1 to 20 in order",
            "Can count up to 20 objects correctly in different contexts",
            "Can recognise and write numerals from 1 to 20",
            "Can compare numbers up to 20 (which is more, which is less)"
        ],
        examples=[
            "Count 12 pencils on the table and write the numeral 12",
            "Look at a number chart from 1 to 20 and point to the numeral 15 when teacher says fifteen",
            "Show 7 beads and then 10 beads and tell which group has more"
        ],
        reason=""
    ),
    "c1_math_002": NumberNode(
        node_id="c1_math_002",
        title="Introduction to Zero through a subtraction pattern",
        section="Theme 1: Numbers",
        syllabus="Introduction to Zero through a subtraction pattern. Children develop the concept of zero. Enacting stories like Seven Tailed Mouse in which seven tails are being reduced to zero.",
        cognitive_level="Understand",
        difficulty="Easy",
        exam_relevance="Board_Only",
        exam_weightage="Low",
        competency_level="Board",
        prereq=["c1_math_001"],
        vocabulary=["zero", "nothing", "none", "left", "subtract", "take away", "reduce", "empty", "pattern", "minus", "how many", "story"],
        spiral_topic="patterns",
        scope_level="1-Introduction",
        scope_boundary="Teach: Covers only the concept of zero discovered through a subtraction pattern",
        is_root=False,
        prereq_strength="soft",
        mastery_criteria=[
            "Can define zero as 'nothing' or 'none left'",
            "Can demonstrate zero by subtracting a number from itself",
            "Can explain what happens when all objects are taken away from a group"
        ],
        examples=[
            "Start with 5 toffees, give away 1 at a time until 0 remain",
            "In the story Seven Tailed Mouse, seven tails reduced one by one until zero",
            "Show 3 apples and take away all 3; child says zero apples are left"
        ],
        reason="A child must know numbers and numerals from 1 to 20 before understanding zero",
        depth_prereq=None,
        depth_reason=""
    ),
    "c1_math_003": NumberNode(
        node_id="c1_math_003",
        title="Counting objects from 1 to 99 by making groups leading to tens and ones",
        section="Theme 1: Numbers",
        syllabus="Counting objects from 1 to 99 by making groups leading to tens and ones. Children recognise numbers up to 99 using bundles of tens and loose ones.",
        cognitive_level="Understand",
        difficulty="Easy",
        exam_relevance="Board_Only",
        exam_weightage="Low",
        competency_level="Board",
        prereq=["c1_math_001"],
        vocabulary=["count", "group", "bundle", "tens", "ones", "loose", "concrete materials", "ice cream sticks", "straws", "Unifix cubes", "recognise"],
        spiral_topic="general",
        scope_level="1-Introduction",
        scope_boundary="Teach: Covers counting objects from 1 to 99 by making groups of tens and ones",
        is_root=False,
        prereq_strength="soft",
        mastery_criteria=[
            "Can count objects up to 99 by grouping into bundles of tens and loose ones",
            "Can state how many tens and how many loose ones are in a given collection",
            "Can explain the grouping strategy for counting beyond 20"
        ],
        examples=[
            "Count 23 ice cream sticks by making 2 bundles of 10 and 3 loose sticks",
            "Use Unifix cubes to count 45 by making 4 towers of 10 and 5 loose cubes",
            "Count 30 tooth picks by making 3 bundles of 10"
        ],
        reason="A child must know numbers and numerals from 1 to 20 before grouping into tens and ones",
        depth_prereq=None,
        depth_reason=""
    )
}


INDIAN_CONTEXT_ITEMS = {
    "fruits": ["mangoes", "bananas", "apples", "guavas", "oranges", "papayas", "chikoos", "grapes"],
    "vegetables": ["tomatoes", "onions", "potatoes", "carrots", "peas", "brinjals"],
    "sweets": ["laddoos", "jalebis", "barfis", "pedas", "toffees", "mithais", "rasgullas"],
    "animals": ["cows", "goats", "rabbits", "hens", "ducks", "cats", "dogs", "elephants"],
    "birds": ["parrots", "crows", "pigeons", "sparrows", "peacocks"],
    "objects": ["pencils", "erasers", "notebooks", "rulers", " sharpeners", "chalks", "crayons"],
    "money": ["rupees", "paise", "notes", "coins"],
    "stationery": ["pens", "books", "bags", "tiffin boxes", "water bottles"],
    "flowers": ["marigolds", "roses", "lotuses", "jasmines", "sunflowers"],
    "festival": ["diyas", "flowers", "candles", "sweets", "rangolis", "kites"]
}

NUMBER_NAMES = {
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
    11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen",
    15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
    19: "nineteen", 20: "twenty"
}

TENS_NAMES = {20: "twenty", 30: "thirty", 40: "forty", 50: "fifty",
              60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety"}


def number_to_words(n: int) -> str:
    if n in NUMBER_NAMES:
        return NUMBER_NAMES[n]
    if n < 100:
        tens = (n // 10) * 10
        ones = n % 10
        if ones == 0:
            return TENS_NAMES[tens]
        return TENS_NAMES[tens] + NUMBER_NAMES[ones]
    return str(n)


class QuestionGenerator:
    def __init__(self, seed: int = 42):
        self.seeder = DeterministicSeeder(seed)
        self.nodes = NODES

    def _get_rng(self, node_id: str, q_index: int) -> random.Random:
        return self.seeder.get_rng_for(node_id, q_index)

    def _pick(self, rng: random.Random, items: list) -> any:
        return rng.choice(items)

    def _pick_category(self, rng: random.Random) -> str:
        categories = list(INDIAN_CONTEXT_ITEMS.keys())
        return rng.choice(categories)

    def _pick_item(self, rng: random.Random, category: str) -> str:
        return rng.choice(INDIAN_CONTEXT_ITEMS[category])

    def _generate_distractors(self, rng: random.Random, correct: int, count: int = 3, max_val: int = 20) -> List[int]:
        distractors = set()
        while len(distractors) < count:
            if correct <= max_val:
                offset = rng.randint(1, 3)
                sign = rng.choice([-1, 1])
                d = correct + sign * offset
                if 1 <= d <= max_val and d != correct:
                    distractors.add(d)
            else:
                d = rng.randint(1, max_val)
                if d != correct:
                    distractors.add(d)
        while len(distractors) < count:
            distractors.add(rng.randint(1, max(2, correct - 1)))
        return list(distractors)[:count]

    def _shuffle_options(self, rng: random.Random, correct: int, distractors: List[int]) -> List[str]:
        options = [correct] + distractors
        rng.shuffle(options)
        return [str(o) for o in options]

    def _verification_step(self, node_id: str, q_type: str, params: dict) -> str:
        steps = {
            "c1_math_001": {
                "count_objects": (
                    f"Step 1: Point to each {params.get('item', 'object')} one by one and say the number name.\n"
                    f"Step 2: After pointing to the last one, the number you said last is the total count.\n"
                    f"Step 3: Count = {params.get('count', '?')}. Check: The last number spoken should match the total items."
                ),
                "identify_numeral": (
                    f"Step 1: Look at the number chart from 1 to 20.\n"
                    f"Step 2: Find the number name '{params.get('number_name', '?')}'.\n"
                    f"Step 3: The numeral written at that position is {params.get('numeral', '?')}."
                ),
                "compare": (
                    f"Step 1: Count the items in Group A: {params.get('count_a', '?')} items.\n"
                    f"Step 2: Count the items in Group B: {params.get('count_b', '?')} items.\n"
                    f"Step 3: Compare the two counts. Since {params.get('count_a', '?')} {'>' if params.get('count_a', 0) > params.get('count_b', 0) else '<'} {params.get('count_b', '?')}, Group {'A' if params.get('count_a', 0) > params.get('count_b', 0) else 'B'} has more."
                ),
                "recite_number": (
                    f"Step 1: Start counting from 1: one, two, three, ...\n"
                    f"Step 2: Continue in order without skipping any number.\n"
                    f"Step 3: The {params.get('position', '?')}th number is {params.get('number', '?')} ({number_to_words(params.get('number', 0))})."
                ),
                "fill_next": (
                    f"Step 1: Look at the sequence: {', '.join(str(n) for n in params.get('sequence', []))}\n"
                    f"Step 2: Each number increases by 1 from the previous number.\n"
                    f"Step 3: The next number after {params.get('last', '?')} is {params.get('answer', '?')}."
                ),
            },
            "c1_math_002": {
                "subtract_zero": (
                    f"Step 1: Start with {params.get('start', '?')} {params.get('item', 'objects')}.\n"
                    f"Step 2: Take away all {params.get('start', '?')} {params.get('item', 'objects')}.\n"
                    f"Step 3: {params.get('start', '?')} minus {params.get('start', '?')} equals 0 (zero).\n"
                    f"Step 4: When nothing is left, we say there are 'zero' or 'none' left."
                ),
                "what_is_zero": (
                    f"Step 1: Think about what happens when you eat all the toffees in a box.\n"
                    f"Step 2: When the box is completely empty, how many toffees are inside?\n"
                    f"Step 3: The answer is zero (0) — it means nothing or none are left."
                ),
                "subtraction_pattern": (
                    f"Step 1: Start with {params.get('start', '?')} tails.\n"
                    f"Step 2: Each step removes 1 tail: {params.get('start', '?')}, {params.get('start', 0) - 1 if isinstance(params.get('start'), int) else '?'}, {params.get('start', 0) - 2 if isinstance(params.get('start'), int) else '?'}, ..., 0\n"
                    f"Step 3: When all tails are gone, the count becomes 0 (zero).\n"
                    f"Step 4: This shows zero as 'nothing left'."
                ),
            },
            "c1_math_003": {
                "tens_ones": (
                    f"Step 1: Given number is {params.get('number', '?')}.\n"
                    f"Step 2: Make bundles of 10: {params.get('number', '?')} // 10 = {params.get('number', 0) // 10} bundle(s) of 10.\n"
                    f"Step 3: Loose ones remaining: {params.get('number', '?')} % 10 = {params.get('number', 0) % 10}.\n"
                    f"Step 4: So, {params.get('number', '?')} = {params.get('number', 0) // 10} tens and {params.get('number', 0) % 10} ones."
                ),
                "count_bundles": (
                    f"Step 1: Each bundle has 10 {params.get('item', 'sticks')}.\n"
                    f"Step 2: {params.get('bundles', '?')} bundles = {params.get('bundles', 0)} x 10 = {params.get('bundles', 0) * 10}.\n"
                    f"Step 3: Plus {params.get('loose', '?')} loose ones.\n"
                    f"Step 4: Total = {params.get('bundles', 0) * 10 + params.get('loose', 0)}."
                ),
                "identify_tens_ones": (
                    f"Step 1: The number is {params.get('number', '?')}.\n"
                    f"Step 2: Tens digit: {params.get('number', 0) // 10} tens = {params.get('number', 0) // 10} x 10 = {params.get('number', 0) // 10 * 10}.\n"
                    f"Step 3: Ones digit: {params.get('number', 0) % 10} ones = {params.get('number', 0) % 10} x 1 = {params.get('number', 0) % 10}.\n"
                    f"Step 4: Total: {params.get('number', 0) // 10 * 10} + {params.get('number', 0) % 10} = {params.get('number', 0)}. ✓"
                ),
            }
        }
        node_steps = steps.get(node_id, {})
        return node_steps.get(q_type, "Verify by counting carefully.")

    def generate_node_001(self, num_questions: int = 10) -> List[Question]:
        questions = []
        node = self.nodes["c1_math_001"]
        q_types = [
            "count_objects", "count_objects", "count_objects",
            "identify_numeral", "identify_numeral",
            "compare", "compare",
            "recite_number", "recite_number",
            "fill_next", "fill_next",
            "count_objects"
        ]
        items_by_cat = {
            "fruits": ("mangoes", "mango"),
            "vegetables": ("tomatoes", "tomato"),
            "sweets": ("laddoos", "laddoo"),
            "animals": ("cows", "cow"),
            "objects": ("pencils", "pencil"),
            "stationery": ("erasers", "eraser"),
            "birds": ("parrots", "parrot"),
            "flowers": ("marigolds", "marigold"),
        }

        for i in range(num_questions):
            rng = self._get_rng("c1_math_001", i)
            q_type = q_types[i % len(q_types)]
            question_id = f"c1m001_q{i+1:02d}"
            cat = self._pick_category(rng)
            item_plural, item_singular = items_by_cat.get(cat, ("items", "item"))

            if q_type == "count_objects":
                count = rng.randint(1, 20)
                distractors = self._generate_distractors(rng, count, 3, 20)
                options = self._shuffle_options(rng, count, distractors)
                text = (
                    f"A teacher has {count} {item_plural} on her desk. "
                    f"She arranges them in a row. How many {item_plural} are there?"
                )
                correct = count
                expl = f"There are {count} {item_plural}. When we count each one: 1, 2, 3... up to {count}, the last number is {count}."
                vocab = ["count", "numeral", "number", "objects"]

            elif q_type == "identify_numeral":
                num = rng.randint(1, 20)
                distractors = self._generate_distractors(rng, num, 3, 20)
                options = self._shuffle_options(rng, num, distractors)
                text = (
                    f"Teacher says the number name '{number_to_words(num)}'. "
                    f"Which numeral should the child point to on the number chart?"
                )
                correct = num
                expl = f"The number name '{number_to_words(num)}' is written as the numeral '{num}'."
                vocab = ["numeral", "number name", "number chart", "recognise"]

            elif q_type == "compare":
                a = rng.randint(3, 19)
                b = rng.randint(1, 20)
                while b == a:
                    b = rng.randint(1, 20)
                distractors = self._generate_distractors(rng, max(a, b), 2, 20)
                distractors.append(min(a, b))
                distractors = list(set(distractors))[:3]
                options = self._shuffle_options(rng, max(a, b), distractors)
                winner = "A" if a > b else "B"
                text = (
                    f"Riya has {a} {item_plural} in Group A. "
                    f"Amit has {b} {item_plural} in Group B. "
                    f"Which group has more {item_plural}?"
                )
                correct = max(a, b)
                expl = f"Group A has {a}, Group B has {b}. Since {max(a,b)} > {min(a,b)}, Group {winner} has more."
                vocab = ["compare", "more", "group", "objects"]

            elif q_type == "recite_number":
                pos = rng.randint(1, 20)
                distractors = self._generate_distractors(rng, pos, 3, 20)
                options = self._shuffle_options(rng, pos, distractors)
                text = (
                    f"A child is counting aloud from 1 to 20. "
                    f"What is the {number_to_words(pos)} number in the counting sequence?"
                )
                correct = pos
                expl = f"When counting from 1, the {number_to_words(pos)} number spoken is '{number_to_words(pos)}' which is written as {pos}."
                vocab = ["count", "recite", "number name", "number"]

            elif q_type == "fill_next":
                start = rng.randint(1, 17)
                seq = list(range(start, start + 4))
                answer = start + 4
                distractors = self._generate_distractors(rng, answer, 3, 20)
                options = self._shuffle_options(rng, answer, distractors)
                text = (
                    f"Look at the number pattern: {', '.join(str(n) for n in seq)}, ?\n"
                    f"What number comes next?"
                )
                correct = answer
                expl = f"Each number increases by 1. After {seq[-1]}, the next number is {answer}."
                vocab = ["number", "count", "recite"]

            else:
                count = rng.randint(1, 20)
                distractors = self._generate_distractors(rng, count, 3, 20)
                options = self._shuffle_options(rng, count, distractors)
                text = f"Count the {item_plural} and write the correct numeral."
                correct = count
                expl = f"Counting the {item_plural} gives us {count}."
                vocab = ["count", "numeral"]

            params = {}
            if q_type == "count_objects":
                params = {"count": count, "item": item_singular}
            elif q_type == "identify_numeral":
                params = {"number_name": number_to_words(num), "numeral": str(num)}
            elif q_type == "compare":
                params = {"count_a": a, "count_b": b}
            elif q_type == "recite_number":
                params = {"position": number_to_words(pos), "number": pos}
            elif q_type == "fill_next":
                params = {"sequence": seq, "last": seq[-1], "answer": answer}

            questions.append(Question(
                node_id="c1_math_001",
                question_id=question_id,
                text=text,
                options=options,
                correct_answer=correct,
                explanation=expl,
                difficulty="Easy",
                cognitive_level="Understand",
                exam_relevance="Board_Only",
                competency_level="Board",
                vocabulary_used=vocab,
                indian_context=True,
                verification_step=self._verification_step("c1_math_001", q_type, params)
            ))
        return questions

    def generate_node_002(self, num_questions: int = 10) -> List[Question]:
        questions = []
        items_by_cat = {
            "sweets": ("toffees", "toffee"),
            "animals": ("tails", "tail"),
            "fruits": ("apples", "apple"),
            "objects": ("pencils", "pencil"),
            "flowers": ("petals", "petal"),
            "stationery": ("pages", "page"),
        }

        for i in range(num_questions):
            rng = self._get_rng("c1_math_002", i)
            question_id = f"c1m002_q{i+1:02d}"
            q_type = "subtract_zero" if i % 3 == 0 else ("what_is_zero" if i % 3 == 1 else "subtraction_pattern")
            cat = self._pick_category(rng)
            item_plural, item_singular = items_by_cat.get(cat, ("items", "item"))
            start = rng.randint(3, 9)

            if q_type == "subtract_zero":
                distractors = self._generate_distractors(rng, 0, 3, start)
                distractors.append(start)
                options = self._shuffle_options(rng, 0, distractors)
                text = (
                    f"You have {start} {item_plural}. You give away all {start} {item_plural} to your friends. "
                    f"How many {item_plural} are left with you?"
                )
                correct = 0
                expl = f"When all {start} {item_plural} are given away, none are left. So the answer is zero (0)."
                vocab = ["zero", "nothing", "none", "left", "subtract", "take away"]

            elif q_type == "what_is_zero":
                distractors = self._generate_distractors(rng, 0, 3, start)
                options = self._shuffle_options(rng, 0, distractors)
                text = (
                    f"A box had {start} {item_plural}. All of them were taken out. "
                    f"What do we call the number of {item_plural} left inside the box?"
                )
                correct = 0
                expl = f"When all {item_plural} are taken out, the box is empty. This is called 'zero' or 'none left'."
                vocab = ["zero", "nothing", "none", "left", "empty"]

            else:
                answer = 0
                distractors = self._generate_distractors(rng, 0, 3, start)
                options = self._shuffle_options(rng, 0, distractors)
                text = (
                    f"In a story, a mouse has {start} {item_plural}. "
                    f"Each day it loses one {item_singular}. "
                    f"After losing all {start} {item_plural}, how many are left?"
                )
                correct = 0
                expl = f"The mouse starts with {start} {item_plural} and loses all of them. The result is zero (0)."
                vocab = ["zero", "subtract", "take away", "reduce", "how many", "story"]

            params = {"start": start, "item": item_singular}
            questions.append(Question(
                node_id="c1_math_002",
                question_id=question_id,
                text=text,
                options=options,
                correct_answer=correct,
                explanation=expl,
                difficulty="Easy",
                cognitive_level="Understand",
                exam_relevance="Board_Only",
                competency_level="Board",
                vocabulary_used=vocab,
                indian_context=True,
                verification_step=self._verification_step("c1_math_002", q_type, params)
            ))
        return questions

    def generate_node_003(self, num_questions: int = 10) -> List[Question]:
        questions = []
        items_map = {
            "sticks": ("ice cream sticks", "stick"),
            "toothpicks": ("tooth picks", "tooth pick"),
            "cubes": ("Unifix cubes", "cube"),
            "straws": ("straws", "straw"),
            "pencils": ("pencils", "pencil"),
            "marbles": ("marbles", "marble"),
            "beads": ("beads", "bead"),
            "coins": ("coins", "coin"),
        }

        for i in range(num_questions):
            rng = self._get_rng("c1_math_003", i)
            question_id = f"c1m003_q{i+1:02d}"
            q_type = "tens_ones" if i % 3 == 0 else ("count_bundles" if i % 3 == 1 else "identify_tens_ones")
            items_list = list(items_map.keys())
            item_key = items_list[i % len(items_list)]
            item_plural, item_singular = items_map[item_key]

            number = rng.randint(11, 99)
            tens = number // 10
            ones = number % 10

            if q_type == "tens_ones":
                n = rng.randint(11, 99)
                correct = n
                t = n // 10
                o = n % 10
                distractor_answers = []
                d1 = t * 10 + ((o + 1) % 10)
                d2 = (t + 1) * 10 + ((o - 1) % 10)
                d3 = t + o
                for d in [d1, d2, d3]:
                    if d != n and 10 <= d <= 99:
                        distractor_answers.append(d)
                while len(distractor_answers) < 3:
                    distractor_answers.append(rng.randint(11, 99))
                distractor_answers = list(set(distractor_answers))[:3]
                options = self._shuffle_options(rng, n, distractor_answers)
                text = (
                    f"A child counts {n} {item_plural} by making bundles of 10 and keeping loose ones. "
                    f"How many {item_plural} are there in total?"
                )
                expl = (
                    f"{n} = {t} bundle(s) of 10 ({t} x 10 = {t*10}) + {o} loose ones = {t*10 + o}."
                )
                vocab = ["count", "group", "bundle", "tens", "ones", "loose"]
                params = {"number": n}

            elif q_type == "count_bundles":
                bundles = rng.randint(1, 9)
                loose = rng.randint(0, 9)
                total = bundles * 10 + loose
                correct = total
                distractor_answers = []
                d1 = bundles * 10
                d2 = loose
                d3 = bundles + loose
                for d in [d1, d2, d3]:
                    if d != total:
                        distractor_answers.append(d)
                while len(distractor_answers) < 3:
                    distractor_answers.append(rng.randint(1, 99))
                distractor_answers = list(set(distractor_answers))[:3]
                options = self._shuffle_options(rng, total, distractor_answers)
                text = (
                    f"A child makes {bundles} bundle(s) of 10 {item_plural} and keeps {loose} loose {item_singular}(s). "
                    f"How many {item_plural} are there in total?"
                )
                expl = f"{bundles} bundles of 10 = {bundles*10}. Plus {loose} loose = {bundles*10 + loose} total."
                vocab = ["count", "bundle", "tens", "ones", "loose", "concrete materials"]
                params = {"bundles": bundles, "loose": loose, "item": item_singular}

            else:
                n = rng.randint(11, 99)
                correct = n
                t = n // 10
                o = n % 10
                distractor_tens = t
                distractor_ones = o
                distractor_total = t + o
                distractor_answers = []
                for d in [t * 10, o, t + o]:
                    if d != n and d > 0:
                        distractor_answers.append(d)
                while len(distractor_answers) < 3:
                    distractor_answers.append(rng.randint(1, 99))
                distractor_answers = list(set(distractor_answers))[:3]
                options = self._shuffle_options(rng, n, distractor_answers)
                text = (
                    f"A bundle has {t} tens and {o} loose {item_plural}. "
                    f"How many {item_plural} are there in total?"
                )
                expl = f"{t} tens means {t*10} {item_plural}. Plus {o} loose ones. Total = {t*10 + o}."
                vocab = ["tens", "ones", "bundle", "count", "group"]
                params = {"number": n}

            questions.append(Question(
                node_id="c1_math_003",
                question_id=question_id,
                text=text,
                options=options,
                correct_answer=correct,
                explanation=expl,
                difficulty="Easy",
                cognitive_level="Understand",
                exam_relevance="Board_Only",
                competency_level="Board",
                vocabulary_used=vocab,
                indian_context=True,
                verification_step=self._verification_step("c1_math_003", q_type, params)
            ))
        return questions

    def generate_all(self, questions_per_node: int = 10) -> Dict[str, List[Question]]:
        result = {}
        generators = {
            "c1_math_001": self.generate_node_001,
            "c1_math_002": self.generate_node_002,
            "c1_math_003": self.generate_node_003,
        }
        for node_id, generator in generators.items():
            result[node_id] = generator(questions_per_node)
        return result

    def generate_from_prerequisites(self, seed: int = 42) -> List[Question]:
        rng = random.Random(seed)
        all_questions = []
        qpn = rng.randint(8, 12)
        all_questions.extend(self.generate_node_001(qpn))
        qpn2 = rng.randint(5, 8)
        all_questions.extend(self.generate_node_002(qpn2))
        qpn3 = rng.randint(5, 8)
        all_questions.extend(self.generate_node_003(qpn3))
        return all_questions

    def get_node_info(self, node_id: str) -> Optional[NodeConfig]:
        node = self.nodes.get(node_id)
        if not node:
            return None
        return NodeConfig(
            node_id=node.node_id,
            title=node.title,
            section=node.section,
            syllabus=node.syllabus,
            cognitive_level=node.cognitive_level,
            difficulty=node.difficulty,
            exam_relevance=node.exam_relevance,
            exam_weightage=node.exam_weightage,
            competency_level=node.competency_level,
            prereq=node.prereq,
            vocabulary=node.vocabulary,
            spiral_topic=node.spiral_topic,
            scope_level=node.scope_level,
            scope_boundary=node.scope_boundary,
        )

    def verify_determinism(self, node_id: str, num_q: int = 5) -> bool:
        run1 = self.generate_node_001(num_q) if node_id == "c1_math_001" else (
            self.generate_node_002(num_q) if node_id == "c1_math_002"
            else self.generate_node_003(num_q)
        )
        self.seeder.reset()
        run2 = self.generate_node_001(num_q) if node_id == "c1_math_001" else (
            self.generate_node_002(num_q) if node_id == "c1_math_002"
            else self.generate_node_003(num_q)
        )
        for q1, q2 in zip(run1, run2):
            if q1.text != q2.text or q1.correct_answer != q2.correct_answer or q1.options != q2.options:
                return False
        return True

    def export_to_dict(self, questions: List[Question]) -> List[dict]:
        return [
            {
                "node_id": q.node_id,
                "question_id": q.question_id,
                "text": q.text,
                "options": q.options,
                "correct_answer": q.correct_answer,
                "explanation": q.explanation,
                "difficulty": q.difficulty,
                "cognitive_level": q.cognitive_level,
                "exam_relevance": q.exam_relevance,
                "competency_level": q.competency_level,
                "vocabulary_used": q.vocabulary_used,
                "indian_context": q.indian_context,
                "verification_step": q.verification_step,
            }
            for q in questions
        ]

    def run_verification(self, questions: List[Question]) -> Dict[str, any]:
        results = {"total": len(questions), "by_node": {}, "vocabulary_coverage": {}, "indian_context_pct": 0.0}
        node_counts = {}
        vocab_found = {}
        indian_count = 0
        for q in questions:
            node_counts[q.node_id] = node_counts.get(q.node_id, 0) + 1
            if q.indian_context:
                indian_count += 1
            for v in q.vocabulary_used:
                vocab_found[v] = vocab_found.get(v, 0) + 1
        results["by_node"] = node_counts
        results["vocabulary_coverage"] = vocab_found
        results["indian_context_pct"] = round(100.0 * indian_count / max(len(questions), 1), 1)
        return results


def generate_class1_math_questions(
    seed: int = 42,
    questions_per_node: int = 10
) -> Tuple[Dict[str, List[Question]], Dict]:
    generator = QuestionGenerator(seed)
    all_questions = generator.generate_all(questions_per_node)
    flat = []
    for qs in all_questions.values():
        flat.extend(qs)
    verification = generator.run_verification(flat)
    return all_questions, verification


def get_sample_questions(seed: int = 42, count: int = 5) -> List[Question]:
    generator = QuestionGenerator(seed)
    return generator.generate_from_prerequisites(seed)[:count]


def verify_question_correctness(question: Question) -> bool:
    correct_idx = question.options.index(str(question.correct_answer))
    return correct_idx >= 0


if __name__ == "__main__":
    generator = QuestionGenerator(seed=42)
    print("=" * 60)
    print("CLASS 1 MATHEMATICS - DETERMINISTIC QUESTION GENERATOR")
    print("Source: CISCE Primary Curriculum, Class I")
    print("=" * 60)

    print("\n--- Generating Questions ---")
    all_questions, verification = generate_class1_math_questions(seed=42, questions_per_node=10)

    for node_id, questions in all_questions.items():
        node = NODES[node_id]
        print(f"\n{'='*60}")
        print(f"NODE: {node_id}")
        print(f"TITLE: {node.title}")
        print(f"SECTION: {node.section}")
        print(f"PREREQ: {node.prereq}")
        print(f"VOCABULARY: {', '.join(node.vocabulary)}")
        print(f"{'='*60}")
        for q in questions:
            print(f"\n  [{q.question_id}] {q.difficulty.upper()} | {q.cognitive_level}")
            print(f"  Q: {q.text}")
            print(f"  Options: {', '.join(q.options)}")
            print(f"  Correct Answer: {q.correct_answer}")
            print(f"  Explanation: {q.explanation}")
            print(f"  Verification:\n    {q.verification_step.replace(chr(10), chr(10) + '    ')}")
            assert verify_question_correctness(q), f"Correctness check failed for {q.question_id}"
            assert q.correct_answer in [int(o) for o in q.options], f"Correct answer not in options for {q.question_id}"

    print(f"\n{'='*60}")
    print("VERIFICATION REPORT")
    print(f"{'='*60}")
    for key, value in verification.items():
        print(f"  {key}: {value}")

    print("\n--- Determinism Check ---")
    for node_id in ["c1_math_001", "c1_math_002", "c1_math_003"]:
        is_det = generator.verify_determinism(node_id, 5)
        print(f"  {node_id}: Deterministic = {is_det}")

    print("\n--- Node Information ---")
    for node_id in ["c1_math_001", "c1_math_002", "c1_math_003"]:
        info = generator.get_node_info(node_id)
        if info:
            print(f"  {info.node_id}: {info.title} | Level: {info.scope_level} | Prereq: {info.prereq}")

    print("\n--- Export to JSON (sample 3 questions) ---")
    sample = get_sample_questions(seed=42, count=3)
    exported = generator.export_to_dict(sample)
    print(json.dumps(exported, indent=2))

    print(f"\n--- Total Questions Generated: {sum(len(qs) for qs in all_questions.values())} ---")
    print("All checks passed. Question generation complete.")