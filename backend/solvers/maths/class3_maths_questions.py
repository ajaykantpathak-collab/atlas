import random
import math
import hashlib
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Tuple
from enum import Enum

random.seed(42)


class Difficulty(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3


class Topic(Enum):
    FOUR_DIGIT_NUMBERS = "c3_math_001"
    PLACE_VALUE_EXPANDED = "c3_math_002"
    COUNT_NUMBERS = "c3_math_003"
    COMPARISON_ORDERING = "c3_math_004"
    GREATEST_SMALLEST_NUMBERS = "c3_math_005"
    ADDITION = "c3_math_006"
    SUBTRACTION = "c3_math_007"
    MULTIPLICATION = "c3_math_008"
    DIVISION = "c3_math_009"
    MENTAL_MATH = "c3_math_010"


@dataclass
class Question:
    text: str
    answer: str
    explanation: str
    topic: Topic
    difficulty: str
    competency: str
    options: Optional[List[str]] = None
    sub_topic: str = ""
    marks: int = 1
    indian_context: bool = True


@dataclass
class QuestionSet:
    topic: Topic
    difficulty: str
    competency: str
    questions: List[Question]
    seed_used: int


def _derive_seed(topic_id: str, difficulty: str, competency: str, index: int, master_seed: int = 42) -> int:
    combined = f"{topic_id}|{difficulty}|{competency}|{index}|{master_seed}"
    h = hashlib.sha256(combined.encode()).hexdigest()
    return int(h[:12], 16)


def _reset_rng(seed: int):
    random.seed(seed)


def _shuffle_options(options: List[str], seed: int) -> List[str]:
    _reset_rng(seed)
    opts = options[:]
    random.shuffle(opts)
    return opts


# =============================================================================
# TOPIC 1: c3_math_001 - 4 Digit Numbers (up to 9999)
# =============================================================================

def generate_four_digit_numbers(competency: str = "Board", num_questions: int = 10,
                                 difficulty: str = "Easy", seed_offset: int = 0) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_001", difficulty, competency, i + seed_offset)
        _reset_rng(seed)

        r = random.random()
        if r < 0.25:
            q = _q4d_read_write(seed, difficulty)
        elif r < 0.50:
            q = _q4d_place_identify(seed, difficulty)
        elif r < 0.70:
            q = _q4d_arrow_card(seed, difficulty)
        elif r < 0.85:
            q = _q4d_real_life(seed, difficulty)
        else:
            q = _q4d_digit_count(seed, difficulty)

        q.topic = Topic.FOUR_DIGIT_NUMBERS
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.FOUR_DIGIT_NUMBERS, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _q4d_read_write(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    th = num // 1000
    rem = num % 1000
    hu = rem // 100
    rem2 = rem % 100
    te = rem2 // 10
    on = rem2 % 10

    def _num_word(n):
        words = {0:"",1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",
                 7:"seven",8:"eight",9:"nine",10:"ten",11:"eleven",12:"twelve",
                 13:"thirteen",14:"fourteen",15:"fifteen",16:"sixteen",
                 17:"seventeen",18:"eighteen",19:"nineteen",
                 20:"twenty",30:"thirty",40:"forty",50:"fifty",
                 60:"sixty",70:"seventy",80:"eighty",90:"ninety"}
        if n == 0: return ""
        if n in words: return words[n]
        tens = (n // 10) * 10
        ones = n % 10
        return words[tens] + (" " + words[ones] if ones else "")

    word = ""
    if th > 0: word += _num_word(th) + " thousand "
    if hu > 0: word += _num_word(hu) + " hundred "
    if rem2 > 0: word += _num_word(rem2) + " "
    word = word.strip()

    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"Write the number: {word.title()}"
        answer = str(num)
        explanation = (f"'{word.title()}' means {th} thousand + {hu} hundred + {te} tens + {on} ones "
                       f"= {num}. Read thousands first, then hundreds, tens and ones.")
    else:
        text = f"Read the number {num} in words."
        answer = word
        explanation = (f"{num} = {th} thousand {hu} hundred {te} ten{'s' if te != 1 else ''} "
                       f"and {on} one{'s' if on != 1 else ''}. "
                       f"In words: '{word.title()}'.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.FOUR_DIGIT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Read and write 4-digit numbers")


def _q4d_place_identify(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    places = ["thousands", "hundreds", "tens", "ones"]
    place_idx = random.randint(0, 3)
    divs = [1000, 100, 10, 1]
    digit = (num // divs[place_idx]) % 10
    place_name = places[place_idx]

    text = f"In the number {num}, what digit is in the {place_name} place?"
    answer = str(digit)
    explanation = (f"To find the {place_name} place digit of {num}: "
                   f"divide by {divs[place_idx]} and take the remainder's digit. "
                   f"{num} // {divs[place_idx]} = {num // divs[place_idx]}, "
                   f"last digit = {digit}. So the {place_name} digit is {digit}.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.FOUR_DIGIT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Place identification")


def _q4d_arrow_card(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    th = num // 1000
    hu = (num % 1000) // 100
    te = (num % 100) // 10
    on = num % 10

    parts = []
    if th: parts.append(f"{th * 1000}")
    if hu: parts.append(f"{hu * 100}")
    if te: parts.append(f"{te * 10}")
    if on: parts.append(f"{on}")

    text = (f"Using place value cards (arrow cards): {th * 1000} + {hu * 100} + "
            f"{te * 10} + {on}. What number is formed?")
    answer = str(num)
    explanation = (f"Place value cards: {th} thousand(s) + {hu} hundred(s) + "
                   f"{te} ten(s) + {on} one(s) = {th * 1000} + {hu * 100} + "
                   f"{te * 10} + {on} = {num}.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.FOUR_DIGIT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Arrow cards / Place value cards")


def _q4d_real_life(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    contexts = [
        ("A cinema hall has {n} seats.", "seats in the cinema hall"),
        ("A school has {n} students.", "students in the school"),
        ("A library has {n} books.", "books in the library"),
        ("A stadium holds {n} spectators.", "spectators the stadium can hold"),
        ("{n} people attended the festival.", "people who attended the festival"),
        ("A book has {n} pages.", "pages in the book"),
        ("A town has {n} residents.", "residents in the town"),
        ("{n} votes were cast in the election.", "votes cast in the election"),
    ]
    num = random.randint(1000, 9999)
    ctx = random.choice(contexts)
    text = ctx[0].format(n=num) + f" Read and write this number in words."
    th = num // 1000
    hu = (num % 1000) // 100
    te = (num % 100) // 10
    on = num % 10

    def _w(n):
        d = {0:"",1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",
             7:"seven",8:"eight",9:"nine",10:"ten",11:"eleven",12:"twelve",
             13:"thirteen",14:"fourteen",15:"fifteen",16:"sixteen",
             17:"seventeen",18:"eighteen",19:"nineteen",
             20:"twenty",30:"thirty",40:"forty",50:"fifty",
             60:"sixty",70:"seventy",80:"eighty",90:"ninety"}
        if n == 0: return ""
        if n in d: return d[n]
        return d[(n // 10) * 10] + (" " + d[n % 10] if n % 10 else "")

    word = f"{_w(th)} thousand {_w(hu)} hundred {_w(te * 10 + on)}".replace("  ", " ").strip().title()
    answer = word
    explanation = (f"The number is {num}. It is read as '{word}'. "
                   f"This shows a real-life example of a number in thousands.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.FOUR_DIGIT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Real-life 4-digit numbers")


def _q4d_digit_count(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    text = f"How many digits does the number {num} have?"
    answer = "4 (four)"
    explanation = (f"{num} is between 1000 and 9999, which are both 4-digit numbers. "
                   f"1000 is the smallest 4-digit number and 9999 is the largest. "
                   f"So {num} has 4 digits.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.FOUR_DIGIT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Number of digits")


# =============================================================================
# TOPIC 2: c3_math_002 - Place Value and Expanded Form
# =============================================================================

def generate_place_value_expanded(competency: str = "Board", num_questions: int = 10,
                                   difficulty: str = "Easy", seed_offset: int = 100) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_002", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.30:
            q = _qpv_place_value(seed, difficulty)
        elif r < 0.55:
            q = _qpv_face_value(seed, difficulty)
        elif r < 0.80:
            q = _qpv_expanded_form(seed, difficulty)
        else:
            q = _qpv_distinguish(seed, difficulty)

        q.topic = Topic.PLACE_VALUE_EXPANDED
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.PLACE_VALUE_EXPANDED, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qpv_place_value(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    places = [("thousands", 1000), ("hundreds", 100), ("tens", 10), ("ones", 1)]
    place_name, mult = random.choice(places)
    place_idx = [p[0] for p in places].index(place_name)
    divs = [1000, 100, 10, 1]
    digit = (num // divs[place_idx]) % 10
    place_value = digit * mult

    text = f"What is the place value of the digit in the {place_name} place of {num}?"
    answer = str(place_value)
    explanation = (f"In {num}, the {place_name} digit is {digit}. "
                   f"Place value = digit x place multiplier = {digit} x {mult} = {place_value}.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.PLACE_VALUE_EXPANDED, difficulty=difficulty,
                    competency="Board", sub_topic="Place value of a digit")


def _qpv_face_value(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    places = ["thousands", "hundreds", "tens", "ones"]
    place_idx = random.randint(0, 3)
    divs = [1000, 100, 10, 1]
    digit = (num // divs[place_idx]) % 10
    place_name = places[place_idx]

    text = f"What is the face value of the digit in the {place_name} place of {num}?"
    answer = str(digit)
    explanation = (f"Face value of a digit is the digit itself, regardless of its position. "
                   f"In {num}, the {place_name} digit is {digit}. "
                   f"Face value = {digit} (always the digit itself).")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.PLACE_VALUE_EXPANDED, difficulty=difficulty,
                    competency="Board", sub_topic="Face value of a digit")


def _qpv_expanded_form(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    th = num // 1000
    hu = (num % 1000) // 100
    te = (num % 100) // 10
    on = num % 10

    parts = []
    if th: parts.append(f"{th * 1000}")
    if hu: parts.append(f"{hu * 100}")
    if te: parts.append(f"{te * 10}")
    if on: parts.append(f"{on}")

    expanded = " + ".join(parts)
    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"Write the expanded form of {num}."
        answer = expanded + f" = {num}"
        explanation = (f"Expanded form breaks {num} into the sum of each digit's place value: "
                       f"{th}x1000 + {hu}x100 + {te}x10 + {on}x1 = {th * 1000} + {hu * 100} + "
                       f"{te * 10} + {on} = {expanded}.")
    else:
        text = f"What number is represented by: {expanded}?"
        answer = str(num)
        explanation = (f"Adding the place values: {expanded} = {num}.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.PLACE_VALUE_EXPANDED, difficulty=difficulty,
                    competency="Board", sub_topic="Expanded form")


def _qpv_distinguish(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(1000, 9999)
    places = [("thousands", 1000), ("hundreds", 100), ("tens", 10), ("ones", 1)]
    place_name, mult = random.choice(places)
    place_idx = [p[0] for p in places].index(place_name)
    divs = [1000, 100, 10, 1]
    digit = (num // divs[place_idx]) % 10
    pv = digit * mult

    text = (f"In the number {num}, what is the difference between the place value "
            f"and face value of the digit in the {place_name} place?")
    answer = str(pv - digit)
    explanation = (f"In {num}, the {place_name} digit is {digit}. "
                   f"Face value = {digit}. Place value = {digit} x {mult} = {pv}. "
                   f"Difference = {pv} - {digit} = {pv - digit}.")

    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.PLACE_VALUE_EXPANDED, difficulty=difficulty,
                    competency="Board", sub_topic="Difference between place value and face value")


# =============================================================================
# TOPIC 3: c3_math_003 - Count Numbers
# =============================================================================

def generate_count_numbers(competency: str = "Board", num_questions: int = 10,
                            difficulty: str = "Easy", seed_offset: int = 200) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_003", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.25:
            q = _qcn_forward(seed, difficulty)
        elif r < 0.50:
            q = _qcn_backward(seed, difficulty)
        elif r < 0.70:
            q = _qcn_skip_forward(seed, difficulty)
        elif r < 0.85:
            q = _qcn_skip_backward(seed, difficulty)
        else:
            q = _qcn_fill_missing(seed, difficulty)

        q.topic = Topic.COUNT_NUMBERS
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.COUNT_NUMBERS, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qcn_forward(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    start = random.randint(1, 9990)
    count = random.randint(5, 10)
    step = 1
    seq = [str(start + j * step) for j in range(count + 1)]
    missing_idx = random.randint(1, count - 1)
    correct = seq[missing_idx]
    seq[missing_idx] = "?"
    display = " , ".join(seq)
    text = f"Count forward and fill in the missing number:\n{display}"
    explanation = f"Counting forward by 1 from {seq[0]}: {', '.join(str(start + j) for j in range(count + 1))}. The missing number is {correct}."
    return Question(text=text, answer=correct, explanation=explanation,
                    topic=Topic.COUNT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Count forward by 1")


def _qcn_backward(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    start = random.randint(15, 9999)
    count = random.randint(5, 10)
    seq = [str(start - j) for j in range(count + 1)]
    missing_idx = random.randint(1, count - 1)
    correct = seq[missing_idx]
    seq[missing_idx] = "?"
    display = " , ".join(seq)
    text = f"Count backward and fill in the missing number:\n{display}"
    explanation = f"Counting backward by 1 from {seq[0]}: {', '.join(str(start - j) for j in range(count + 1))}. The missing number is {correct}."
    return Question(text=text, answer=correct, explanation=explanation,
                    topic=Topic.COUNT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Count backward by 1")


def _qcn_skip_forward(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    skip = random.choice([2, 3, 4, 5, 10])
    start = random.randint(1, 100)
    start = (start // skip) * skip
    if start == 0:
        start = skip
    count = random.randint(5, 8)
    seq = [str(start + j * skip) for j in range(count + 1)]
    missing_idx = random.randint(1, count - 1)
    correct = seq[missing_idx]
    seq[missing_idx] = "?"
    display = " , ".join(seq)
    skip_word = {2: "2s", 3: "3s", 4: "4s", 5: "5s", 10: "10s"}[skip]
    text = f"Count by {skip_word} and fill the missing number:\n{display}"
    explanation = (f"Counting by {skip}s starting from {start}: "
                   f"{', '.join(str(start + j * skip) for j in range(count + 1))}. "
                   f"The missing number is {correct}.")
    return Question(text=text, answer=correct, explanation=explanation,
                    topic=Topic.COUNT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic=f"Count forward by {skip}s")


def _qcn_skip_backward(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    skip = random.choice([2, 3, 5, 10])
    start = random.randint(skip * 10, 999)
    start = (start // skip) * skip
    count = random.randint(5, 8)
    seq = [str(start - j * skip) for j in range(count + 1)]
    missing_idx = random.randint(1, count - 1)
    correct = seq[missing_idx]
    seq[missing_idx] = "?"
    display = " , ".join(seq)
    skip_word = {2: "2s", 3: "3s", 5: "5s", 10: "10s"}[skip]
    text = f"Count backward by {skip_word} and fill the missing number:\n{display}"
    explanation = (f"Counting backward by {skip}s starting from {start}: "
                   f"{', '.join(str(start - j * skip) for j in range(count + 1))}. "
                   f"The missing number is {correct}.")
    return Question(text=text, answer=correct, explanation=explanation,
                    topic=Topic.COUNT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic=f"Count backward by {skip}s")


def _qcn_fill_missing(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    start = random.randint(1, 95)
    step = random.choice([1, 2, 3, 5, 10])
    n_items = random.randint(6, 10)
    seq = [str(start + j * step) for j in range(n_items)]
    missing_count = random.randint(1, 2)
    indices = random.sample(range(1, n_items - 1), min(missing_count, n_items - 2))
    corrects = []
    for idx in sorted(indices, reverse=True):
        corrects.append(int(seq[idx]))
        seq[idx] = "?"
    display = " , ".join(seq)
    answer_str = ", ".join(str(c) for c in sorted(corrects))
    text = f"Fill in the missing numbers in the pattern:\n{display}"
    explanation = (f"The pattern is counting by {step}s from {start}. "
                   f"The missing numbers are {answer_str}.")
    return Question(text=text, answer=answer_str, explanation=explanation,
                    topic=Topic.COUNT_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Fill missing numbers in patterns")


# =============================================================================
# TOPIC 4: c3_math_004 - Comparison and Ordering of Numbers
# =============================================================================

def generate_comparison_ordering(competency: str = "Board", num_questions: int = 10,
                                  difficulty: str = "Easy", seed_offset: int = 300) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_004", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.30:
            q = _qco_compare_digits(seed, difficulty)
        elif r < 0.55:
            q = _qco_compare_symbol(seed, difficulty)
        elif r < 0.75:
            q = _qco_order_ascending(seed, difficulty)
        else:
            q = _qco_order_descending(seed, difficulty)

        q.topic = Topic.COMPARISON_ORDERING
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.COMPARISON_ORDERING, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qco_compare_digits(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(1000, 9999)
    b = random.randint(1000, 9999)
    while b == a:
        b = random.randint(1000, 9999)
    greater = max(a, b)
    text = f"Which number is greater: {a} or {b}?"
    answer = str(greater)
    explanation = (f"Compare {a} and {b}: Start from the leftmost (thousands) digit. "
                   f"{a // 1000} vs {b // 1000}. "
                   f"{'Since ' + str(a // 1000) + ' > ' + str(b // 1000) + ', ' + str(a) + ' is greater.' if a > b else 'Since ' + str(b // 1000) + ' > ' + str(a // 1000) + ', ' + str(b) + ' is greater.'}")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.COMPARISON_ORDERING, difficulty=difficulty,
                    competency="Board", sub_topic="Compare two numbers")


def _qco_compare_symbol(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(100, 9999)
    b = random.randint(100, 9999)
    while b == a:
        b = random.randint(100, 9999)
    symbol = ">" if a > b else ("<" if a < b else "=")
    text = f"Fill in the correct symbol (<, >, or =):  {a}  _  {b}"
    answer = symbol
    sym_word = {" > ": "is greater than", " < ": "is less than", " = ": "is equal to"}
    explanation = (f"Comparing {a} and {b}: {a} {sym_word[symbol]} {b}. "
                   f"So the correct symbol is '{symbol}'.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.COMPARISON_ORDERING, difficulty=difficulty,
                    competency="Board", sub_topic="Comparison symbols (<, >, =)")


def _qco_order_ascending(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    nums = sorted(random.sample(range(100, 9999), 4))
    random.shuffle(nums)
    correct = sorted(nums)
    text = f"Arrange the following numbers in ascending order (smallest to greatest):\n{' , '.join(map(str, nums))}"
    answer = " , ".join(map(str, correct))
    explanation = (f"Ascending order means from smallest to greatest. "
                   f"Comparing: {', '.join(map(str, correct))}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.COMPARISON_ORDERING, difficulty=difficulty,
                    competency="Board", sub_topic="Ascending order")


def _qco_order_descending(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    nums = sorted(random.sample(range(100, 9999), 4))
    random.shuffle(nums)
    correct = sorted(nums, reverse=True)
    text = f"Arrange the following numbers in descending order (greatest to smallest):\n{' , '.join(map(str, nums))}"
    answer = " , ".join(map(str, correct))
    explanation = (f"Descending order means from greatest to smallest. "
                   f"Comparing: {', '.join(map(str, correct))}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.COMPARISON_ORDERING, difficulty=difficulty,
                    competency="Board", sub_topic="Descending order")


# =============================================================================
# TOPIC 5: c3_math_005 - Forming Greatest and Smallest Numbers
# =============================================================================

def generate_greatest_smallest(competency: str = "Board", num_questions: int = 10,
                                difficulty: str = "Easy", seed_offset: int = 400) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_005", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.35:
            q = _qgs_greatest(seed, difficulty)
        elif r < 0.70:
            q = _qgs_smallest(seed, difficulty)
        else:
            q = _qgs_both(seed, difficulty)

        q.topic = Topic.GREATEST_SMALLEST_NUMBERS
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.GREATEST_SMALLEST_NUMBERS, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qgs_greatest(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num_digits = random.choice([3, 4])
    digits = random.sample(range(1, 10), num_digits)
    greatest = int("".join(str(d) for d in sorted(digits, reverse=True)))
    text = (f"Using the digits {', '.join(map(str, digits))}, "
            f"form the {num_digits}-digit greatest number possible.")
    answer = str(greatest)
    explanation = (f"To form the greatest number, arrange the digits in descending order: "
                   f"{', '.join(str(d) for d in sorted(digits, reverse=True))} = {greatest}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.GREATEST_SMALLEST_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Form greatest number")


def _qgs_smallest(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num_digits = random.choice([3, 4])
    digits = random.sample(range(1, 10), num_digits)
    smallest = int("".join(str(d) for d in sorted(digits)))
    text = (f"Using the digits {', '.join(map(str, digits))}, "
            f"form the {num_digits}-digit smallest number possible.")
    answer = str(smallest)
    explanation = (f"To form the smallest number, arrange the digits in ascending order: "
                   f"{', '.join(str(d) for d in sorted(digits))} = {smallest}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.GREATEST_SMALLEST_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Form smallest number")


def _qgs_both(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num_digits = random.choice([3, 4])
    digits = random.sample(range(0, 9), num_digits)
    if 0 in digits:
        first_nonzero = next(d for d in sorted(digits) if d != 0)
        rest = sorted(d for d in digits if d != 0)[1:]
        smallest = int(str(first_nonzero) + "".join(str(d) for d in rest) + "0" * digits.count(0))
    else:
        smallest = int("".join(str(d) for d in sorted(digits)))
    greatest = int("".join(str(d) for d in sorted(digits, reverse=True)))
    text = (f"Using the digits {', '.join(map(str, digits))}, form the greatest and "
            f"the smallest {num_digits}-digit numbers possible.")
    answer = f"Greatest: {greatest}, Smallest: {smallest}"
    explanation = (f"Greatest: arrange in descending order → {greatest}. "
                   f"Smallest: arrange in ascending order (putting 0 after the first digit) → {smallest}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.GREATEST_SMALLEST_NUMBERS, difficulty=difficulty,
                    competency="Board", sub_topic="Greatest and smallest both")


# =============================================================================
# TOPIC 6: c3_math_006 - Addition
# =============================================================================

def generate_addition(competency: str = "Board", num_questions: int = 10,
                       difficulty: str = "Easy", seed_offset: int = 500) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_006", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.40:
            q = _qa_2digit(seed, difficulty)
        elif r < 0.70:
            q = _qa_3digit(seed, difficulty)
        elif r < 0.90:
            q = _qa_4digit(seed, difficulty)
        else:
            q = _qa_word(seed, difficulty)

        q.topic = Topic.ADDITION
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.ADDITION, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qa_2digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(10, 99)
    b = random.randint(10, 99)
    ans = a + b
    text = f"Add: {a} + {b} = ?"
    carry = (a % 10 + b % 10) >= 10
    explanation = (f"{a} + {b}: Add ones place: {a % 10} + {b % 10} = {a % 10 + b % 10}. "
                   f"{'Carry over ' + str((a % 10 + b % 10) // 10) + ' to tens.' if carry else 'No carry.'} "
                   f"Add tens place: {a // 10} + {b // 10} + {(a % 10 + b % 10) // 10} = {ans // 10}. "
                   f"Result = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.ADDITION, difficulty=difficulty,
                    competency="Board", sub_topic="2-digit addition")


def _qa_3digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(100, 999)
    b = random.randint(100, 999)
    ans = a + b
    text = f"Add: {a} + {b} = ?"
    o = a % 10 + b % 10
    t = (a // 10) % 10 + (b // 10) % 10 + (o // 10)
    h = a // 100 + b // 100 + (t // 10)
    explanation = (f"Add ones: {a % 10} + {b % 10} = {o} ({'carry ' + str(o // 10) if o >= 10 else 'no carry'}). "
                   f"Add tens: {(a // 10) % 10} + {(b // 10) % 10} + {o // 10} = {t} ({'carry ' + str(t // 10) if t >= 10 else 'no carry'}). "
                   f"Add hundreds: {a // 100} + {b // 100} + {t // 10} = {h}. "
                   f"Result = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.ADDITION, difficulty=difficulty,
                    competency="Board", sub_topic="3-digit addition")


def _qa_4digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(1000, 9999)
    b = random.randint(100, 5000)
    while a + b > 9999:
        b = random.randint(100, 5000)
    ans = a + b
    text = f"Add: {a} + {b} = ?"
    explanation = (f"Add ones: {a % 10} + {b % 10} = {a % 10 + b % 10}. "
                   f"Add tens: {(a // 10) % 10} + {(b // 10) % 10} + {(a % 10 + b % 10) // 10}. "
                   f"Add hundreds: {(a // 100) % 10} + {(b // 100) % 10} + carry. "
                   f"Add thousands: {a // 1000} + {b // 1000} + carry. "
                   f"Result = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.ADDITION, difficulty=difficulty,
                    competency="Board", sub_topic="4-digit addition")


def _qa_word(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    contexts = [
        ("Rahul has {a} marbles. His friend gave him {b} more marbles. How many marbles does Rahul have now?", "marbles"),
        ("A fruit shop sold {a} apples in the morning and {b} apples in the evening. How many apples were sold in total?", "apples"),
        ("A bus has {a} passengers. {b} more passengers get on at the next stop. How many passengers are on the bus now?", "passengers"),
        ("Priya read {a} pages of a book on Monday and {b} pages on Tuesday. How many pages did she read in total?", "pages"),
        ("A garden has {a} red roses and {b} yellow roses. How many roses are there in the garden?", "roses"),
        ("The school library has {a} story books and {b} science books. How many books are there in total?", "books"),
        ("Rita collected {a} shells at the beach on Saturday and {b} shells on Sunday. How many shells in total?", "shells"),
        ("A train has {a} seats in first class and {b} seats in second class. How many seats in total?", "seats"),
    ]
    a = random.randint(100, 9000)
    b = random.randint(50, 5000)
    while a + b > 9999:
        b = random.randint(50, 2000)
    ctx, obj = random.choice(contexts)
    text = ctx.format(a=a, b=b) + "\nFind the total."
    answer = str(a + b)
    explanation = (f"To find the total, add: {a} + {b} = {a + b}. "
                   f"So there are {a + b} {obj} in total.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.ADDITION, difficulty=difficulty,
                    competency="Board", sub_topic="Addition word problems")


# =============================================================================
# TOPIC 7: c3_math_007 - Subtraction
# =============================================================================

def generate_subtraction(competency: str = "Board", num_questions: int = 10,
                          difficulty: str = "Easy", seed_offset: int = 600) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_007", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.40:
            q = _qs_2digit(seed, difficulty)
        elif r < 0.70:
            q = _qs_3digit(seed, difficulty)
        elif r < 0.90:
            q = _qs_4digit(seed, difficulty)
        else:
            q = _qs_word(seed, difficulty)

        q.topic = Topic.SUBTRACTION
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.SUBTRACTION, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qs_2digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    b = random.randint(10, 99)
    ans = random.randint(10, 99)
    a = b + ans
    text = f"Subtract: {a} - {b} = ?"
    borrow = (a % 10) < (b % 10)
    explanation = (f"{a} - {b}: Subtract ones: {a % 10} - {b % 10}. "
                   f"{'Borrow 1 from tens.' if borrow else 'No borrowing needed.'} "
                   f"Subtract tens: {a // 10} - {b // 10} - {1 if borrow else 0} = {ans // 10}. "
                   f"Result = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.SUBTRACTION, difficulty=difficulty,
                    competency="Board", sub_topic="2-digit subtraction")


def _qs_3digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    b = random.randint(100, 999)
    ans = random.randint(10, 999)
    a = b + ans
    while a > 9999:
        b = random.randint(10, 500)
        a = b + ans
    text = f"Subtract: {a} - {b} = ?"
    explanation = (f"{a} - {b}: Subtract ones, tens and hundreds. "
                   f"Check each place. Result = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.SUBTRACTION, difficulty=difficulty,
                    competency="Board", sub_topic="3-digit subtraction")


def _qs_4digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    b = random.randint(1000, 9000)
    ans = random.randint(100, b)
    a = b + ans
    while a > 9999:
        b = random.randint(100, 5000)
        a = b + ans
    text = f"Subtract: {a} - {b} = ?"
    explanation = (f"{a} - {b}: Subtract each place value carefully. "
                   f"Result = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.SUBTRACTION, difficulty=difficulty,
                    competency="Board", sub_topic="4-digit subtraction")


def _qs_word(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    contexts = [
        ("A shop had {a} toffees. {b} toffees were sold. How many toffees are left?", "toffees"),
        ("A farmer has {a} mango trees. He planted {b} more. How many trees does he have now? (addition word)", "mango trees"),
        ("A school had {a} students. {b} students went on a picnic. How many students remain in school?", "students remain"),
        ("A toy shop had {a} teddy bears. {b} were sold. How many teddy bears are left?", "teddy bears"),
        ("Seema had {a} rupees. She spent {b} rupees. How much money does she have left?", "rupees left"),
        ("A bus can carry {a} passengers. {b} passengers got off. How many are still on the bus?", "passengers remain"),
        ("There were {a} balloons at a party. {b} balloons burst. How many balloons are left?", "balloons left"),
        ("A garden had {a} trees. {b} new trees were planted. How many trees are there now?", "trees"),
    ]
    a = random.randint(200, 9000)
    b = random.randint(50, min(a - 1, 5000))
    ctx, obj = random.choice(contexts)
    if "sold" in ctx or "spent" in ctx or "burst" in ctx or "got off" in ctx:
        result = a - b
        op_text = f" (subtract)"
    else:
        result = a + b
        op_text = f" (add)"

    if "How many trees does he have now" in ctx or "How many trees are there now" in ctx or "How much money does she have left" in ctx or "How many passengers are still" in ctx:
        result = a + b if "now" in ctx and "sold" not in ctx else (a - b if "left" in ctx or "remain" in ctx else a + b)

    if result > 9999:
        a = random.randint(200, 5000)
        b = random.randint(10, min(a - 1, 2000))
        result = a - b

    text = ctx.format(a=a, b=b) + "\nSolve."
    answer = str(result)
    explanation = (f"The problem involves {op_text.strip(' ()')}. "
                   f"{a} {'-' if result < a else '+'} {b} = {result}. "
                   f"Answer: {result} {obj}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.SUBTRACTION, difficulty=difficulty,
                    competency="Board", sub_topic="Subtraction word problems")


# =============================================================================
# TOPIC 8: c3_math_008 - Understanding Multiplication
# =============================================================================

def generate_multiplication(competency: str = "Board", num_questions: int = 10,
                             difficulty: str = "Easy", seed_offset: int = 700) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_008", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.30:
            q = _qm_tables(seed, difficulty)
        elif r < 0.55:
            q = _qm_2digit_1digit(seed, difficulty)
        elif r < 0.80:
            q = _qm_3digit_1digit(seed, difficulty)
        else:
            q = _qm_word(seed, difficulty)

        q.topic = Topic.MULTIPLICATION
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.MULTIPLICATION, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qm_tables(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(2, 10)
    multiplier = random.randint(1, 10)
    ans = num * multiplier
    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"What is {num} x {multiplier}?"
        answer = str(ans)
        explanation = f"{num} x {multiplier} means adding {num} exactly {multiplier} times. {num} x {multiplier} = {ans}."
    else:
        text = f"{ans} / {num} = ?  (Use the multiplication table of {num})"
        answer = str(multiplier)
        explanation = (f"We need to find the missing multiplier: {num} x ? = {ans}. "
                       f"From the table of {num}: {num} x {multiplier} = {ans}. "
                       f"So {ans} / {num} = {multiplier}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.MULTIPLICATION, difficulty=difficulty,
                    competency="Board", sub_topic="Multiplication tables (2-10)")


def _qm_2digit_1digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(10, 99)
    b = random.randint(2, 9)
    ans = a * b
    text = f"Multiply: {a} x {b} = ?"
    explanation = (f"{a} x {b}: Multiply {b} by ones digit ({a % 10}) and tens digit ({a // 10}). "
                   f"{a} x {b} = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.MULTIPLICATION, difficulty=difficulty,
                    competency="Board", sub_topic="2-digit x 1-digit multiplication")


def _qm_3digit_1digit(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(100, 999)
    b = random.randint(2, 9)
    ans = a * b
    text = f"Multiply: {a} x {b} = ?"
    explanation = (f"{a} x {b}: Multiply each digit of {a} by {b} and add the place values. "
                   f"{a} x {b} = {ans}.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.MULTIPLICATION, difficulty=difficulty,
                    competency="Board", sub_topic="3-digit x 1-digit multiplication")


def _qm_word(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    contexts = [
        ("A packet contains {a} biscuits. How many biscuits are in {b} such packets?", "biscuits"),
        ("A garden has {a} rows of plants. Each row has {b} plants. How many plants are there?", "plants"),
        ("A school has {a} classes. Each class has {b} students. How many students are there in total?", "students"),
        ("A book costs {a} rupees. What is the cost of {b} such books?", "rupees"),
        ("A car travels {a} km in one hour. How far will it travel in {b} hours?", "km"),
        ("There are {a} shelves in a library. Each shelf has {b} books. How many books in total?", "books"),
        ("A baker bakes {a} loaves of bread each day. How many loaves in {b} days?", "loaves of bread"),
        ("A box has {a} chocolates. How many chocolates in {b} boxes?", "chocolates"),
    ]
    a = random.randint(2, 99)
    b = random.randint(2, 12)
    ctx, obj = random.choice(contexts)
    ans = a * b
    text = ctx.format(a=a, b=b)
    explanation = (f"{a} x {b} = {ans}. "
                   f"There are {ans} {obj} in total.")
    return Question(text=text, answer=str(ans), explanation=explanation,
                    topic=Topic.MULTIPLICATION, difficulty=difficulty,
                    competency="Board", sub_topic="Multiplication word problems")


# =============================================================================
# TOPIC 9: c3_math_009 - Understanding Division
# =============================================================================

def generate_division(competency: str = "Board", num_questions: int = 10,
                       difficulty: str = "Easy", seed_offset: int = 800) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_009", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.30:
            q = _qd_jumping(seed, difficulty)
        elif r < 0.55:
            q = _qd_division_as_subtraction(seed, difficulty)
        elif r < 0.80:
            q = _qd_divide_with_remainder(seed, difficulty)
        else:
            q = _qd_word(seed, difficulty)

        q.topic = Topic.DIVISION
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.DIVISION, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qd_jumping(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    step = random.randint(2, 10)
    jumps = random.randint(3, 8)
    total = step * jumps
    text = f"A frog jumps {step} steps at a time. How many jumps does it take to reach {total}?"
    answer = str(jumps)
    explanation = (f"The frog jumps {step} steps each time. "
                   f"Number of jumps = {total} / {step} = {jumps}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.DIVISION, difficulty=difficulty,
                    competency="Board", sub_topic="Division as repeated subtraction / jumping")


def _qd_division_as_subtraction(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    divisor = random.randint(2, 9)
    quotient = random.randint(2, 10)
    dividend = divisor * quotient
    text = f"{dividend} / {divisor} = ?  (Show by repeated subtraction)"
    answer = str(quotient)
    sub_steps = []
    current = dividend
    count = 0
    while current >= divisor:
        current -= divisor
        count += 1
        sub_steps.append(str(current))
    explanation = (f"Repeatedly subtract {divisor} from {dividend}: "
                   f"{dividend} → {' → '.join(sub_steps)}. "
                   f"Subtracted {count} times. So {dividend} / {divisor} = {quotient} with remainder 0.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.DIVISION, difficulty=difficulty,
                    competency="Board", sub_topic="Division by repeated subtraction")


def _qd_divide_with_remainder(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    divisor = random.randint(2, 9)
    quotient = random.randint(3, 10)
    remainder = random.randint(1, divisor - 1)
    dividend = divisor * quotient + remainder
    text = f"Divide: {dividend} / {divisor} = ?  (Write quotient and remainder)"
    answer = f"Quotient = {quotient}, Remainder = {remainder}"
    explanation = (f"{dividend} / {divisor}: {divisor} x {quotient} = {divisor * quotient}. "
                   f"{dividend} - {divisor * quotient} = {remainder}. "
                   f"So quotient = {quotient}, remainder = {remainder}. "
                   f"Check: {divisor} x {quotient} + {remainder} = {dividend}.")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.DIVISION, difficulty=difficulty,
                    competency="Board", sub_topic="Division with remainder")


def _qd_word(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    contexts = [
        ("{a} chocolates are to be shared equally among {b} children. How many chocolates does each child get?", "chocolates"),
        ("A teacher has {a} pencils. She distributes them equally among {b} students. How many pencils does each student get?", "pencils"),
        ("{a} students are divided into groups of {b}. How many groups are formed?", "groups"),
        ("A baker has {a} cupcakes. He packs them in boxes of {b}. How many boxes are needed?", "boxes"),
        ("{a} rupees are divided equally among {b} friends. How much does each friend get?", "rupees"),
        ("A rope of {a} metres is cut into pieces of {b} metres each. How many pieces are obtained?", "pieces"),
        ("There are {a} seats in a hall. {b} students sit in each row. How many rows are needed?", "rows"),
        ("{a} beads are to be strung into necklaces of {b} beads each. How many necklaces can be made?", "necklaces"),
    ]
    a = random.randint(12, 99)
    b = random.randint(2, 9)
    ctx, obj = random.choice(contexts)
    quotient = a // b
    remainder = a % b
    has_remainder = remainder != 0
    text = ctx.format(a=a, b=b)
    if has_remainder:
        answer = f"Each gets {quotient} {obj.rstrip('s')}, with {remainder} left over"
    else:
        answer = f"{quotient}"
    explanation = (f"{a} / {b}: {divmod(a, b)}. "
                   f"Quotient = {quotient}, Remainder = {remainder}. "
                   f"{'Each gets ' + str(quotient) + ' ' + obj + ' and ' + str(remainder) + ' ' + obj + ' are left over.' if has_remainder else obj.title() + ' per group = ' + str(quotient) + '.'}")
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.DIVISION, difficulty=difficulty,
                    competency="Board", sub_topic="Division word problems")


# =============================================================================
# TOPIC 10: c3_math_010 - Mental Math
# =============================================================================

def generate_mental_math(competency: str = "Board", num_questions: int = 10,
                          difficulty: str = "Easy", seed_offset: int = 900) -> QuestionSet:
    questions = []
    for i in range(num_questions):
        seed = _derive_seed("c3_math_010", difficulty, competency, i + seed_offset)
        _reset_rng(seed)
        r = random.random()
        if r < 0.25:
            q = _qmm_double_half(seed, difficulty)
        elif r < 0.50:
            q = _qmm_number_bond(seed, difficulty)
        elif r < 0.70:
            q = _qmm_ten_more_less(seed, difficulty)
        elif r < 0.85:
            q = _qmm_quick_add_sub(seed, difficulty)
        else:
            q = _qmm_fill_blank_fast(seed, difficulty)

        q.topic = Topic.MENTAL_MATH
        q.competency = competency
        q.difficulty = difficulty
        questions.append(q)

    return QuestionSet(topic=Topic.MENTAL_MATH, difficulty=difficulty,
                        competency=competency, questions=questions, seed_used=seed_offset)


def _qmm_double_half(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(5, 50)
    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"What is the double of {num}?"
        answer = str(num * 2)
        explanation = f"Double of {num} = {num} + {num} = {num * 2}."
    else:
        if num % 2 == 1:
            num += 1
        text = f"What is half of {num}?"
        answer = str(num // 2)
        explanation = f"Half of {num} = {num} / 2 = {num // 2}."
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.MENTAL_MATH, difficulty=difficulty,
                    competency="Board", sub_topic="Double and half")


def _qmm_number_bond(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    total = random.randint(10, 50)
    part = random.randint(1, total - 1)
    other = total - part
    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"{part} + ? = {total}"
        answer = str(other)
        explanation = f"If {part} + ? = {total}, then ? = {total} - {part} = {other}."
    else:
        text = f"? + {part} = {total}"
        answer = str(other)
        explanation = f"If ? + {part} = {total}, then ? = {total} - {part} = {other}."
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.MENTAL_MATH, difficulty=difficulty,
                    competency="Board", sub_topic="Number bonds")


def _qmm_ten_more_less(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    num = random.randint(15, 990)
    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"What is {num} + 10?"
        answer = str(num + 10)
        explanation = f"Adding 10 increases the tens digit by 1: {num} + 10 = {num + 10}."
    else:
        text = f"What is {num} - 10?"
        answer = str(num - 10)
        explanation = f"Subtracting 10 decreases the tens digit by 1: {num} - 10 = {num - 10}."
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.MENTAL_MATH, difficulty=difficulty,
                    competency="Board", sub_topic="10 more / 10 less")


def _qmm_quick_add_sub(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    a = random.randint(10, 500)
    b = random.randint(1, 50)
    qtype = random.randint(0, 1)
    if qtype == 0:
        text = f"Calculate mentally: {a} + {b}"
        answer = str(a + b)
        explanation = f"Mental addition: {a} + {b} = {a + b}. "
    else:
        text = f"Calculate mentally: {a} - {b}"
        answer = str(a - b)
        explanation = f"Mental subtraction: {a} - {b} = {a - b}. "
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.MENTAL_MATH, difficulty=difficulty,
                    competency="Board", sub_topic="Quick mental addition/subtraction")


def _qmm_fill_blank_fast(seed: int, difficulty: str) -> Question:
    _reset_rng(seed)
    ops = ["+", "-", "x"]
    op = random.choice(ops)
    if op == "+":
        b = random.randint(1, 50)
        ans = random.randint(10, 500)
        a = ans - b
        text = f"Fill in the blank: {a} + {b} = ?"
        explanation = f"{a} + {b} = {ans}."
    elif op == "-":
        a = random.randint(10, 500)
        b = random.randint(1, a - 1)
        ans = a - b
        text = f"Fill in the blank: {a} - {b} = ?"
        explanation = f"{a} - {b} = {ans}."
    else:
        a = random.randint(2, 12)
        b = random.randint(2, 12)
        ans = a * b
        text = f"Fill in the blank: {a} x {b} = ?"
        explanation = f"{a} x {b} = {ans}."
    answer = str(ans)
    return Question(text=text, answer=answer, explanation=explanation,
                    topic=Topic.MENTAL_MATH, difficulty=difficulty,
                    competency="Board", sub_topic="Fill in the blanks (mental math)")


# =============================================================================
# MASTER GENERATOR
# =============================================================================

class Class3MathQuestionGenerator:
    TOPIC_GENERATORS = {
        "c3_math_001": generate_four_digit_numbers,
        "c3_math_002": generate_place_value_expanded,
        "c3_math_003": generate_count_numbers,
        "c3_math_004": generate_comparison_ordering,
        "c3_math_005": generate_greatest_smallest,
        "c3_math_006": generate_addition,
        "c3_math_007": generate_subtraction,
        "c3_math_008": generate_multiplication,
        "c3_math_009": generate_division,
        "c3_math_010": generate_mental_math,
    }


# return {"status": "ok", "note": "truncated"}
