"""
CISCE Mathematics Class 3 – Question Generator
Deterministic, seeded. Step-by-step solutions + verification.
Covers all major Class 3 syllabus topics.
"""

import math
import random
import dataclasses
from typing import Optional, Dict, Any, List, Tuple
from dataclasses import dataclass, field

# ═══════════════════════════════════════════════════════════════════════════
# ═══  DATA STRUCTURES  ════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

@dataclass
class Question:
    id: str
    topic: str
    subtopic: str
    question_type: str
    competency_type: str
    difficulty: str
    bloom_level: str
    question_text: str
    options: List[str] = field(default_factory=list)
    answer: str = ""
    correct_index: int = -1
    steps: List[str] = field(default_factory=list)
    explanation: str = ""
    verification: str = ""
    context_hint: str = ""

    def to_dict(self) -> Dict[str, Any]:
        d = dataclasses.asdict(self)
        return d


# ═══════════════════════════════════════════════════════════════════════════
# ═══  UTILITY FUNCTIONS  ═══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _rng(seed: int) -> random.Random:
    return random.Random(seed)


INDIAN_NAMES = [
    "Priya", "Arjun", "Riya", "Aditya", "Sneha", "Vikram", "Ananya",
    "Kabir", "Diya", "Rohan", "Isha", "Vivaan", "Aarav", "Zara",
    "Advik", "Meera", "Krishna", "Pooja", "Rahul", "Sunita"
]

INDIAN_PLACES = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Pune", "Jaipur", "Agra", "Mysore", "Kochi", "Ahmedabad",
    "Nagpur", "Indore", "Bhopal", "Surat", "Lucknow", "Chandigarh"
]

INDIAN_MARKETS = [
    "APMC market", "local vegetable market", "Sunday bazaar",
    "weekly haat", "street market", "farmer's market"
]

INDIAN_FOODS = [
    "idli", "dosa", "vada", "samosa", "chapatis", "mangoes",
    "bananas", "apples", "oranges", "chocolates", "cookies",
    "rice", "roti", "lassi", "juice packets", "chips"
]

INDIAN_ITEMS = [
    "notebook", "pencil box", "water bottle", "school bag",
    "eraser", "sharpener", "crayon box", "glue stick",
    "geometry box", "calculator", "story book", "colouring book",
    "football", "badminton racket", "skipping rope", "ball"
]

TRANSPORT = [
    "bus", "train", "auto-rickshaw", "metro", "cycle"
]


def _pick(rng: random.Random, items: List[str]) -> str:
    return rng.choice(items)


def _rand_int(rng: random.Random, lo: int, hi: int) -> int:
    return rng.randint(lo, hi)


def _make_options(rng: random.Random, correct: Any, pool: List[Any], count: int = 4) -> List[str]:
    wrong = [x for x in pool if x != correct]
    rng.shuffle(wrong)
    opts = [correct] + wrong[:count - 1]
    rng.shuffle(opts)
    return [str(o) for o in opts]


def _format_rupees(amount: float) -> str:
    return f"Rs {amount:.2f}"


def _rupees(paise: int) -> float:
    return paise / 100.0


def _paise(rupees: float) -> int:
    return int(round(rupees * 100))


def _num_to_words_indian(n: int) -> str:
    """Simple Indian number name for values up to 9999."""
    ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
            "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
            "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
            "Nineteen"]
    tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty",
            "Seventy", "Eighty", "Ninety"]
    if n < 20:
        return ones[n]
    if n < 100:
        return tens[n // 10] + (" " + ones[n % 10] if n % 10 else "")
    if n < 1000:
        return ones[n // 100] + " Hundred" + (" " + _num_to_words_indian(n % 100) if n % 100 else "")
    if n < 10000:
        return ones[n // 1000] + " Thousand" + (" " + _num_to_words_indian(n % 1000) if n % 1000 else "")
    return str(n)


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 1: NUMBERS AND NUMERATION  ════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_numbers(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["place_value", "expanded_form", "comparison", "ordering",
                  "successor_predecessor", "rounding"]
    diff_levels = ["easy", "easy", "medium", "medium", "hard"]
    bloom = ["Remember", "Understand", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"NUM_{seed:06d}_{i:04d}"

        if st == "place_value":
            digits = list(range(10))
            rng.shuffle(digits)
            num_str = "".join(str(d) for d in digits[:4])
            num = int(num_str)
            place_positions = [
                (0, "Thousands", 1000), (1, "Hundreds", 100),
                (2, "Tens", 10), (3, "Ones", 1)
            ]
            pos_idx = rng.randint(0, 3)
            pos_name, pos_label, pos_val = place_positions[pos_idx]
            digit_at_pos = int(num_str[pos_idx])
            correct = digit_at_pos * pos_val

            wrong_choices = []
            for w in [digit_at_pos, num // pos_val, digit_at_pos * (pos_val // 10)]:
                if w != correct and w > 0:
                    wrong_choices.append(w)
            while len(wrong_choices) < 3:
                wrong_choices.append(correct + rng.randint(1, 50))
            wrong_choices = list(set(wrong_choices))[:3]

            opts = _make_options(rng, correct, wrong_choices + [correct])
            corr_idx = opts.index(str(correct))

            if is_comp:
                qtext = (f"During a school trip to {place}, {name} saw a four-digit "
                         f"house number {num}. What is the place value of the digit "
                         f"in the {pos_label} place?")
                expl = (f"The digit in the {pos_label} place of {num} is {digit_at_pos}. "
                        f"Place value = digit x position value = {digit_at_pos} x {pos_val} = {correct}.")
                ctx = "Real-world application: place value in everyday numbers"
            else:
                qtext = (f"What is the place value of the digit in the {pos_label} "
                         f"place of the number {num}?")
                expl = (f"The digit in the {pos_label} place is {digit_at_pos}. "
                        f"Place value = {digit_at_pos} x {pos_val} = {correct}.")
                ctx = "Direct place value computation"

            q = Question(
                id=qid, topic="Numbers", subtopic="place_value",
                question_type="MCQ", competency_type=comp_type,
                difficulty=diff, bloom_level=bl,
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[
                    f"Given number: {num}",
                    f"Position of interest: {pos_label} place",
                    f"Digit at {pos_label} place: {digit_at_pos}",
                    f"Place value = {digit_at_pos} x {pos_val} = {correct}"
                ],
                explanation=expl, context_hint=ctx,
                verification=f"Check: The number is {num}. The {pos_label} digit is {digit_at_pos}, so place value is {digit_at_pos} x {pos_val} = {correct}."
            )
            questions.append(q)

        elif st == "expanded_form":
            num = _rand_int(rng, 1000, 9999)
            thousands = num // 1000
            hundreds = (num % 1000) // 100
            tens = (num % 100) // 10
            ones = num % 10
            correct_parts = []
            if thousands:
                correct_parts.append(f"{thousands} x 1000")
            if hundreds:
                correct_parts.append(f"{hundreds} x 100")
            if tens:
                correct_parts.append(f"{tens} x 10")
            if ones:
                correct_parts.append(f"{ones} x 1")
            correct_str = " + ".join(correct_parts)
            numeric_sum = (thousands * 1000 + hundreds * 100 +
                           tens * 10 + ones)

            if is_comp:
                qtext = (f"{name} from {place} bought a train ticket numbered {num}. "
                         f"Write this number in expanded form.")
                expl = (f"{num} = {correct_str} = {numeric_sum}")
                ctx = "Real-world: reading numbers on tickets"
            else:
                qtext = f"Write the number {num} in expanded form."
                expl = f"{num} = {correct_str}"
                ctx = "Direct expanded form"

            q = Question(
                id=qid, topic="Numbers", subtopic="expanded_form",
                question_type="short_answer", competency_type=comp_type,
                difficulty=diff, bloom_level=bl,
                question_text=qtext,
                answer=correct_str,
                steps=[
                    f"Number: {num}",
                    f"Thousands: {thousands}, Hundreds: {hundreds}, Tens: {tens}, Ones: {ones}",
                    f"Expanded form: {correct_str}"
                ],
                explanation=expl, context_hint=ctx,
                verification=f"Adding back: {' + '.join(str(p * int(p.split('x')[1].strip())) if 'x' in p else p for p in correct_parts)} = {numeric_sum}"
            )
            questions.append(q)

        elif st == "comparison":
            a = _rand_int(rng, 100, 9999)
            b = _rand_int(rng, 100, 9999)
            while b == a:
                b = _rand_int(rng, 100, 9999)
            if a > b:
                correct = f"{a} > {b}"
                correct_sym = ">"
            else:
                correct = f"{a} < {b}"
                correct_sym = "<"
            wrong_syms = ["=", "<" if correct_sym == ">" else ">",
                          "<" if correct_sym == ">" else ">"]
            opts = _make_options(rng, correct,
                                 [f"{a} = {b}", f"{a} < {b}" if a > b else f"{a} > {b}",
                                  f"{a} > {b}" if a < b else f"{a} < {b}"])
            corr_idx = opts.index(correct)

            if is_comp:
                qtext = (f"{name} collected {a} mangoes and {name}'s friend collected "
                         f"{b} mangoes. Who collected more mangoes? "
                         f"Fill in the blank: {a} ___ {b}")
                expl = f"Since {a} is {'greater' if a > b else 'smaller'} than {b}, we write {a} {correct_sym} {b}."
                ctx = "Comparing quantities in a real scenario"
            else:
                qtext = f"Compare: {a} ___ {b}. Choose the correct symbol."
                expl = f"{a} {correct_sym} {b} because {a} {'is greater' if a > b else 'is smaller'} than {b}."
                ctx = "Number comparison"

            q = Question(
                id=qid, topic="Numbers", subtopic="comparison",
                question_type="MCQ", competency_type=comp_type,
                difficulty=diff, bloom_level=bl,
                question_text=qtext, options=opts,
                answer=correct, correct_index=corr_idx,
                steps=[f"Number 1: {a}", f"Number 2: {b}",
                       f"Comparing: {a} {correct_sym} {b}"],
                explanation=expl, context_hint=ctx,
                verification=f"Verified: {a} {'>' if a > b else '<'} {b} is True"
            )
            questions.append(q)

        elif st == "ordering":
            nums = sorted(rng.sample(range(100, 9999), 4))
            rng.shuffle(nums)
            ascending = sorted(nums)
            descending = list(reversed(ascending))
            correct = str(ascending)
            wrong1 = str(descending)
            wrong2 = str(sorted(nums[:3]) + [nums[3]])
            wrong3 = str([nums[1]] + sorted([nums[0]] + nums[2:]))

            if is_comp:
                qtext = (f"The ages of four students in {name}'s class are: "
                         f"{nums[0]}, {nums[1]}, {nums[2]}, {nums[3]} years. "
                         f"Arrange their ages in ascending order (youngest to oldest).")
                expl = f"Arranging from smallest to largest: {correct}"
                ctx = "Ordering real data: ages of students"
            else:
                qtext = (f"Arrange the following numbers in ascending order: "
                         f"{', '.join(str(n) for n in nums)}")
                expl = f"Smallest to largest: {correct}"
                ctx = "Direct ordering of numbers"

            opts = _make_options(rng, correct, [wrong1, wrong2, wrong3])
            corr_idx = opts.index(correct)

            q = Question(
                id=qid, topic="Numbers", subtopic="ordering",
                question_type="MCQ", competency_type=comp_type,
                difficulty=diff, bloom_level=bl,
                question_text=qtext, options=opts,
                answer=correct, correct_index=corr_idx,
                steps=[f"Given: {', '.join(str(n) for n in nums)}",
                       f"Arranged ascending: {', '.join(str(n) for n in ascending)}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: Each element is <= the next: {all(ascending[j] <= ascending[j+1] for j in range(len(ascending)-1))}"
            )
            questions.append(q)

        elif st == "successor_predecessor":
            is_succ = rng.random() < 0.5
            num = _rand_int(rng, 100, 9998)
            if is_succ:
                correct = num + 1
                qtext = f"What is the successor of {num}?"
                steps_text = f"Successor of {num} = {num} + 1 = {correct}"
                expl = f"The successor of a number is the number that comes immediately after it. So, successor of {num} is {num} + 1 = {correct}."
            else:
                correct = num - 1
                qtext = f"What is the predecessor of {num}?"
                steps_text = f"Predecessor of {num} = {num} - 1 = {correct}"
                expl = f"The predecessor of a number is the number that comes immediately before it. So, predecessor of {num} is {num} - 1 = {correct}."

            wrong = [correct + 1, correct - 1, correct + 10]
            opts = _make_options(rng, correct, [w for w in wrong if w != correct])
            corr_idx = opts.index(str(correct))

            if is_comp:
                full_q = (f"{name} has a 4-digit PIN code ending in {num % 10000}. "
                          f"To unlock a treasure box, she needs the "
                          f"{'next' if is_succ else 'previous'} number.")
                ctx = "PIN code successor/predecessor puzzle"
            else:
                full_q = qtext
                ctx = "Successor/Predecessor"

            q = Question(
                id=qid, topic="Numbers", subtopic="successor_predecessor",
                question_type="MCQ", competency_type=comp_type,
                difficulty="easy", bloom_level=bl,
                question_text=full_q, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=["Given number: " + str(num), steps_text],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} {'comes after' if is_succ else 'comes before'} {num} correctly"
            )
            questions.append(q)

        elif st == "rounding":
            num = _rand_int(rng, 10, 999)
            to_nearest = rng.choice([10, 100])
            if to_nearest == 10:
                rounded = round(num / 10) * 10
                step_desc = f"Nearest ten: look at ones digit ({num % 10})"
            else:
                rounded = round(num / 100) * 100
                step_desc = f"Nearest hundred: look at tens digit ({(num % 100) // 10})"
            correct = int(rounded)

            if is_comp:
                qtext = (f"{name} bought items costing Rs {num} at {place} market. "
                         f"The shopkeeper rounds the bill to the nearest "
                         f"{'ten' if to_nearest == 10 else 'hundred'} rupees. "
                         f"What is the rounded amount?")
                expl = (f"Rounding {num} to the nearest "
                        f"{'ten' if to_nearest == 10 else 'hundred'}: {step_desc}. "
                        f"Rounded value = {correct}.")
                ctx = "Rounding a real bill amount"
            else:
                qtext = f"Round {num} to the nearest {to_nearest}."
                expl = f"{step_desc}. Rounded value = {correct}."
                ctx = "Direct rounding"

            wrong = [correct + to_nearest, correct - to_nearest,
                     num + to_nearest]
            opts = _make_options(rng, correct, [w for w in wrong if w != correct and w > 0])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Numbers", subtopic="rounding",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level=bl,
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=["Given number: " + str(num), step_desc,
                       f"Rounded value = {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} is within {to_nearest//2} of {num}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 2: ADDITION AND SUBTRACTION  ══════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_addition_subtraction(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["addition_no_regroup", "addition_regroup",
                  "subtraction_no_regroup", "subtraction_regroup",
                  "word_add_sub", "multi_step"]
    diff_levels = ["easy", "easy", "medium", "hard"]
    bloom = ["Remember", "Understand", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"ADDSUB_{seed:06d}_{i:04d}"

        if st == "addition_no_regroup":
            a = rng.randint(10, 99)
            b = rng.randint(10, 99 - a % 10)
            correct = a + b
            if is_comp:
                qtext = (f"{name} collected {a} shells on Monday and {b} shells "
                         f"on Tuesday at a beach near {place}. "
                         f"How many shells in total?")
                expl = f"Total shells = {a} + {b} = {correct}"
                ctx = "Collecting shells at the beach"
            else:
                qtext = f"Add: {a} + {b} = ?"
                expl = f"{a} + {b} = {correct}"
                ctx = "Direct addition"

            q = Question(
                id=qid, topic="Addition", subtopic="addition_no_regroup",
                question_type="numerical", competency_type=comp_type,
                difficulty="easy", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=[f"{a} + {b}"], explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} - {a} = {b} and {correct} - {b} = {a}"
            )
            questions.append(q)

        elif st == "addition_regroup":
            a = rng.randint(150, 999)
            b = rng.randint(100, 999 - a % 100 + 50)
            correct = a + b
            ones_a, ones_b = a % 10, b % 10
            carry_ones = (ones_a + ones_b) >= 10

            if is_comp:
                qtext = (f"At {place} railway station, there were {a} passengers "
                         f"in one train and {b} in another. "
                         f"How many passengers in total?")
                expl = f"Total passengers = {a} + {b} = {correct}"
                ctx = "Passenger count at railway station"
            else:
                qtext = f"Add: {a} + {b} = ?"
                expl = f"{a} + {b} = {correct}"
                ctx = "Addition with carrying"

            steps = [f"Adding ones: {ones_a} + {ones_b} = {ones_a + ones_b}"
                     f" (write {ones_a + ones_b - 10 if carry_ones else ones_a + ones_b}, "
                     f"carry {1 if carry_ones else 0})",
                     f"Adding tens: {a // 10 % 10} + {b // 10 % 10} + "
                     f"{1 if carry_ones else 0} = {(a // 10 % 10) + (b // 10 % 10) + (1 if carry_ones else 0)}",
                     f"Adding hundreds: {a // 100} + {b // 100} = "
                     f"{(a // 100) + (b // 100)}",
                     f"Total = {correct}"]

            q = Question(
                id=qid, topic="Addition", subtopic="addition_regroup",
                question_type="numerical", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=steps, explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} - {a} = {b}"
            )
            questions.append(q)

        elif st == "subtraction_no_regroup":
            a = rng.randint(100, 999)
            b = rng.randint(10, a % 100)
            correct = a - b
            if is_comp:
                qtext = (f"{name} had Rs {a}. She spent Rs {b} at a shop in {place}. "
                         f"How much money is left?")
                expl = f"Money left = {a} - {b} = Rs {correct}"
                ctx = "Money remaining after shopping"
            else:
                qtext = f"Subtract: {a} - {b} = ?"
                expl = f"{a} - {b} = {correct}"
                ctx = "Direct subtraction"

            q = Question(
                id=qid, topic="Subtraction", subtopic="subtraction_no_regroup",
                question_type="numerical", competency_type=comp_type,
                difficulty="easy", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=[f"{a} - {b}"], explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} + {b} = {a}"
            )
            questions.append(q)

        elif st == "subtraction_regroup":
            a = rng.randint(200, 999)
            b = rng.randint(100, a - 10)
            correct = a - b
            ones_a, ones_b = a % 10, b % 10
            borrow = ones_a < ones_b

            if is_comp:
                item = _pick(rng, INDIAN_ITEMS)
                qtext = (f"A school in {place} has {a} {item}s. "
                         f"{b} were given to students. "
                         f"How many {item}s remain?")
                expl = f"Remaining {item}s = {a} - {b} = {correct}"
                ctx = f"School inventory: counting remaining {item}s"
            else:
                qtext = f"Subtract: {a} - {b} = ?"
                expl = f"{a} - {b} = {correct}"
                ctx = "Subtraction with borrowing"

            steps = [f"Subtracting ones: {ones_a} - {ones_b}. "
                     f"{'Borrow 1 from tens.' if borrow else 'No borrow needed.'}",
                     f"Ones: {10 + ones_a} - {ones_b} = {10 + ones_a - ones_b}",
                     f"Tens: {(a // 10 % 10) - 1} - {(b // 10 % 10)} = {(a // 10 % 10) - 1 - (b // 10 % 10)}",
                     f"Hundreds: {a // 100} - {b // 100} = {(a // 100) - (b // 100)}",
                     f"Total = {correct}"]

            q = Question(
                id=qid, topic="Subtraction", subtopic="subtraction_regroup",
                question_type="numerical", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=steps, explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} + {b} = {a}"
            )
            questions.append(q)

        elif st == "word_add_sub":
            item1 = _pick(rng, INDIAN_ITEMS)
            item2 = _pick(rng, INDIAN_ITEMS)
            while item2 == item1:
                item2 = _pick(rng, INDIAN_ITEMS)
            cost1 = _rand_int(rng, 25, 200)
            cost2 = _rand_int(rng, 15, 150)
            total = cost1 + cost2
            budget = total + _rand_int(rng, 50, 300)
            change = budget - total

            if is_comp:
                qtext = (f"{name} went to a shop in {place} with Rs {budget}. "
                         f"She bought a {item1} for Rs {cost1} and a {item2} "
                         f"for Rs {cost2}. How much change will she get?")
                expl = (f"Total spent = Rs {cost1} + Rs {cost2} = Rs {total}. "
                        f"Change = Rs {budget} - Rs {total} = Rs {change}.")
                ctx = "Shopping with a budget"
            else:
                qtext = (f"Cost of a {item1} is Rs {cost1} and a {item2} is "
                         f"Rs {cost2}. Find the total cost.")
                expl = f"Total = Rs {cost1} + Rs {cost2} = Rs {total}."
                ctx = "Adding costs of two items"

            wrong_vals = [change + rng.randint(1, 20), budget, cost1]
            opts = _make_options(rng, change, [w for w in wrong_vals if w != change])
            corr_idx = opts.index(str(change))

            q = Question(
                id=qid, topic="Addition", subtopic="word_add_sub",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, options=opts,
                answer=str(change), correct_index=corr_idx,
                steps=[f"Cost of {item1}: Rs {cost1}",
                       f"Cost of {item2}: Rs {cost2}",
                       f"Total cost = Rs {cost1} + Rs {cost2} = Rs {total}",
                       f"Change = Rs {budget} - Rs {total} = Rs {change}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: Rs {total} + Rs {change} = Rs {budget}"
            )
            questions.append(q)

        elif st == "multi_step":
            item = _pick(rng, INDIAN_ITEMS)
            price1 = _rand_int(rng, 30, 100)
            qty1 = _rand_int(rng, 2, 5)
            price2 = _rand_int(rng, 20, 80)
            qty2 = _rand_int(rng, 1, 4)
            total = price1 * qty1 + price2 * qty2

            if is_comp:
                qtext = (f"{name} is preparing for a class picnic in {place}. "
                         f"She buys {qty1} {item}s at Rs {price1} each "
                         f"and {qty2} packets of snacks at Rs {price2} each. "
                         f"How much does she spend in total?")
                expl = (f"Cost of {item}s = {qty1} x Rs {price1} = Rs {price1 * qty1}. "
                        f"Cost of snacks = {qty2} x Rs {price2} = Rs {price2 * qty2}. "
                        f"Total = Rs {price1 * qty1} + Rs {price2 * qty2} = Rs {total}.")
                ctx = "Multi-step: picnic preparation shopping"
            else:
                qtext = (f"Find: {qty1} x {price1} + {qty2} x {price2}")
                expl = (f"Step 1: {qty1} x {price1} = {price1 * qty1}. "
                        f"Step 2: {qty2} x {price2} = {price2 * qty2}. "
                        f"Step 3: {price1 * qty1} + {price2 * qty2} = {total}.")
                ctx = "Multi-step computation"

            wrong = [total + rng.randint(1, 30), price1 * qty1, price2 * qty2]
            opts = _make_options(rng, total, [w for w in wrong if w != total])
            corr_idx = opts.index(str(total))

            q = Question(
                id=qid, topic="Addition", subtopic="multi_step",
                question_type="MCQ", competency_type=comp_type,
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext, options=opts,
                answer=str(total), correct_index=corr_idx,
                steps=[f"Cost of {qty1} {item}s = {qty1} x Rs {price1} = Rs {price1 * qty1}",
                       f"Cost of {qty2} snack packets = {qty2} x Rs {price2} = Rs {price2 * qty2}",
                       f"Total = Rs {price1 * qty1} + Rs {price2 * qty2} = Rs {total}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: Rs {total} - Rs {price1 * qty1} = Rs {price2 * qty2}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 3: MULTIPLICATION  ═════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_multiplication(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["tables", "two_digit_x_one", "three_digit_x_one", "word_mul"]
    diff_levels = ["easy", "medium", "medium", "hard"]
    bloom = ["Remember", "Remember", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"MUL_{seed:06d}_{i:04d}"

        if st == "tables":
            n = rng.randint(2, 10)
            k = rng.randint(1, 10)
            correct = n * k
            if is_comp:
                qtext = (f"{name} arranges {n} chairs in each of {k} rows "
                         f"for a function at {place}. How many chairs in total?")
                expl = f"{n} x {k} = {correct} chairs"
                ctx = "Arranging chairs in rows"
            else:
                qtext = f"What is {n} x {k}?"
                expl = f"{n} x {k} = {correct}"
                ctx = "Multiplication table"

            wrong = [correct + n, correct - n, correct + k]
            opts = _make_options(rng, correct, [w for w in wrong if w > 0 and w != correct])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Multiplication", subtopic="tables",
                question_type="MCQ", competency_type=comp_type,
                difficulty="easy", bloom_level="Remember",
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[f"{n} x {k} = {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} / {n} = {k}"
            )
            questions.append(q)

        elif st == "two_digit_x_one":
            a = rng.randint(11, 99)
            b = rng.randint(2, 9)
            correct = a * b
            tens = a // 10
            ones = a % 10

            if is_comp:
                food = _pick(rng, INDIAN_FOODS)
                qtext = (f"One packet contains {a} {food}. "
                         f"If {name} buys {b} packets, how many {food} in total?")
                expl = f"{a} x {b} = {correct} {food}"
                ctx = f"Packs of {food}"
            else:
                qtext = f"Multiply: {a} x {b} = ?"
                expl = f"{a} x {b} = {correct}"
                ctx = "2-digit x 1-digit multiplication"

            steps = [f"Break {a} into {tens}0 + {ones}",
                     f"{b} x {ones} = {b * ones}",
                     f"{b} x {tens}0 = {b * tens}0",
                     f"Total = {b * ones} + {b * tens}0 = {correct}"]

            q = Question(
                id=qid, topic="Multiplication", subtopic="two_digit_x_one",
                question_type="numerical", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=steps, explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} / {b} = {a}"
            )
            questions.append(q)

        elif st == "three_digit_x_one":
            a = rng.randint(100, 999)
            b = rng.randint(2, 9)
            correct = a * b

            if is_comp:
                qtext = (f"A train has {a} seats. If there are {b} such trains "
                         f"at {place} station, how many seats in total?")
                expl = f"{a} x {b} = {correct} seats"
                ctx = "Train seats calculation"
            else:
                qtext = f"Multiply: {a} x {b} = ?"
                expl = f"{a} x {b} = {correct}"
                ctx = "3-digit x 1-digit multiplication"

            steps = [f"Multiplying {a} by {b}",
                     f"{a} x {b} = {correct}"]

            q = Question(
                id=qid, topic="Multiplication", subtopic="three_digit_x_one",
                question_type="numerical", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=steps, explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} / {b} = {a}"
            )
            questions.append(q)

        elif st == "word_mul":
            num_packs = rng.randint(3, 10)
            per_pack = rng.randint(5, 20)
            correct = num_packs * per_pack

            if is_comp:
                item = _pick(rng, INDIAN_FOODS)
                qtext = (f"{name} bought {num_packs} packets of {item}. "
                         f"Each packet contains {per_pack} {item}. "
                         f"How many {item} did she buy?")
                expl = f"{num_packs} x {per_pack} = {correct}"
                ctx = f"Buying {item} in packets"
            else:
                qtext = f"There are {num_packs} groups of {per_pack} items each. Find the total."
                expl = f"{num_packs} x {per_pack} = {correct}"
                ctx = "Groups of items"

            wrong = [correct + per_pack, num_packs + per_pack, correct - num_packs]
            opts = _make_options(rng, correct, [w for w in wrong if w > 0 and w != correct])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Multiplication", subtopic="word_mul",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[f"Number of packets: {num_packs}",
                       f"Items per packet: {per_pack}",
                       f"Total items = {num_packs} x {per_pack} = {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} / {num_packs} = {per_pack}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 4: DIVISION  ═══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_division(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["basic_division", "division_remainder", "word_division", "word_remainder"]
    diff_levels = ["easy", "medium", "medium", "hard"]
    bloom = ["Remember", "Understand", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"DIV_{seed:06d}_{i:04d}"

        if st == "basic_division":
            divisor = rng.randint(2, 9)
            quotient = rng.randint(2, 20)
            dividend = divisor * quotient
            correct = quotient

            if is_comp:
                qtext = (f"{name} distributes {dividend} sweets equally among "
                         f"{divisor} friends. How many sweets does each friend get?")
                expl = f"{dividend} / {divisor} = {correct} sweets each"
                ctx = "Distributing sweets equally"
            else:
                qtext = f"Divide: {dividend} / {divisor} = ?"
                expl = f"{dividend} / {divisor} = {correct}"
                ctx = "Basic division"

            wrong = [correct + 1, correct - 1, divisor]
            opts = _make_options(rng, correct, [w for w in wrong if w > 0 and w != correct])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Division", subtopic="basic_division",
                question_type="MCQ", competency_type=comp_type,
                difficulty="easy", bloom_level="Apply",
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[f"{dividend} / {divisor}", f"= {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} x {divisor} = {dividend}"
            )
            questions.append(q)

        elif st == "division_remainder":
            divisor = rng.randint(2, 9)
            quotient = rng.randint(3, 15)
            remainder = rng.randint(1, divisor - 1)
            dividend = divisor * quotient + remainder
            correct_q = quotient
            correct_r = remainder

            if is_comp:
                qtext = (f"{name} has {dividend} beads. She makes necklaces "
                         f"with {divisor} beads each. How many complete necklaces "
                         f"can she make and how many beads are left?")
                expl = (f"{dividest} / {divisor}: Quotient = {quotient}, "
                        f"Remainder = {remainder}")
                ctx = "Making necklaces with beads"
            else:
                qtext = f"Divide {dividend} by {divisor}. Find quotient and remainder."
                expl = f"Quotient = {quotient}, Remainder = {remainder}"
                ctx = "Division with remainder"

            q = Question(
                id=qid, topic="Division", subtopic="division_remainder",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext,
                answer=f"Quotient = {quotient}, Remainder = {remainder}",
                steps=[f"{dividend} = {divisor} x {quotient} + {remainder}",
                       f"Quotient = {quotient}, Remainder = {remainder}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {divisor} x {quotient} + {remainder} = {dividend}"
            )
            questions.append(q)

        elif st == "word_division":
            divisor = rng.randint(2, 9)
            quotient = rng.randint(5, 30)
            dividend = divisor * quotient

            if is_comp:
                qtext = (f"{name} cycled {dividend} meters around a park in {place}. "
                         f"She covered the same distance each day for {divisor} days. "
                         f"How many meters did she cycle each day?")
                expl = f"Distance per day = {dividend} / {divisor} = {quotient} meters"
                ctx = "Cycling distance per day"
            else:
                qtext = f"A book has {dividend} pages read in {divisor} days. Pages per day?"
                expl = f"Pages per day = {dividend} / {divisor} = {quotient}"
                ctx = "Pages read per day"

            q = Question(
                id=qid, topic="Division", subtopic="word_division",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=str(quotient),
                steps=[f"Total: {dividend}", f"Days: {divisor}",
                       f"{dividend} / {divisor} = {quotient}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {quotient} x {divisor} = {dividend}"
            )
            questions.append(q)

        elif st == "word_remainder":
            divisor = rng.randint(3, 9)
            quotient = rng.randint(5, 20)
            remainder = rng.randint(1, divisor - 1)
            dividend = divisor * quotient + remainder
            food = _pick(rng, INDIAN_FOODS)

            qtext = (f"{name} packed {dividend} {food} for a picnic in {place}. "
                     f"They are distributed equally in {divisor} boxes. "
                     f"How many {food} in each box and how many are left over?")
            expl = (f"{dividend} / {divisor}: Each box gets {quotient} {food}, "
                    f"and {remainder} {food} remain left over.")
            ctx = f"Distributing {food} into boxes"

            q = Question(
                id=qid, topic="Division", subtopic="word_remainder",
                question_type="short_answer", competency_type="competency_based",
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext,
                answer=f"Each box: {quotient} {food}, Remaining: {remainder} {food}",
                steps=[f"Total {food}: {dividend}",
                       f"Number of boxes: {divisor}",
                       f"{dividend} / {divisor} = {quotient} remainder {remainder}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {divisor} x {quotient} + {remainder} = {dividend}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 5: FRACTIONS  ══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_fractions(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["half_quarter", "fraction_of_number", "compare_fractions"]
    diff_levels = ["easy", "medium", "medium"]
    bloom = ["Understand", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"FRA_{seed:06d}_{i:04d}"

        if st == "half_quarter":
            total = rng.choice([4, 6, 8, 10, 12, 16, 20])
            half = total // 2
            quarter = total // 4
            correct = quarter
            wrong = [half, total // 3, total - quarter]

            if is_comp:
                qtext = (f"{name} has {total} mangoes. She gives one-quarter "
                         f"of them to her neighbour. How many mangoes did she give?")
                expl = f"One quarter of {total} = {total} / 4 = {quarter} mangoes"
                ctx = "Sharing mangoes with neighbour"
            else:
                qtext = f"What is one-quarter of {total}?"
                expl = f"One-quarter of {total} = {total} / 4 = {quarter}"
                ctx = "Finding one quarter"

            opts = _make_options(rng, correct, [w for w in wrong if w != correct])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Fractions", subtopic="half_quarter",
                question_type="MCQ", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[f"Total: {total}",
                       f"One-quarter = {total} / 4 = {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} x 4 = {total}"
            )
            questions.append(q)

        elif st == "fraction_of_number":
            n = rng.choice([2, 3, 4, 5])
            total = rng.choice([10, 12, 15, 20, 24, 30])
            correct = total // n
            fraction_name = {2: "half", 3: "one-third", 4: "one-quarter",
                             5: "one-fifth"}[n]

            if is_comp:
                qtext = (f"A bakery in {place} made {total} cupcakes. "
                         f"{name} bought the {fraction_name} of them for a party. "
                         f"How many cupcakes did she buy?")
                expl = f"{fraction_name} of {total} = {total} / {n} = {correct} cupcakes"
                ctx = "Buying fraction of cupcakes"
            else:
                qtext = f"Find {fraction_name} of {total}."
                expl = f"{fraction_name} of {total} = {total} / {n} = {correct}"
                ctx = "Finding a fraction of a number"

            wrong = [correct + 1, total - correct, total // (n + 1)]
            opts = _make_options(rng, correct, [w for w in wrong if w != correct])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Fractions", subtopic="fraction_of_number",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[f"Fraction: {fraction_name} (1/{n})",
                       f"{fraction_name} of {total} = {total} / {n} = {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} x {n} = {total}"
            )
            questions.append(q)

        elif st == "compare_fractions":
            denom = rng.choice([2, 3, 4, 5, 8, 10])
            n1 = rng.randint(1, denom - 1)
            n2 = rng.randint(1, denom - 1)
            while n2 == n1:
                n2 = rng.randint(1, denom - 1)
            f1 = n1 / denom
            f2 = n2 / denom
            if f1 > f2:
                correct = f"{n1}/{denom} is greater than {n2}/{denom}"
                symbol = ">"
            else:
                correct = f"{n2}/{denom} is greater than {n1}/{denom}"
                symbol = "<"

            if is_comp:
                qtext = (f"{name} ate {n1}/{denom} of a chocolate bar and "
                         f"her brother ate {n2}/{denom} of the same bar. "
                         f"Who ate more chocolate?")
                expl = (f"Comparing {n1}/{denom} and {n2}/{denom}: "
                        f"Since denominators are the same, "
                        f"compare numerators: {max(n1, n2)} > {min(n1, n2)}, "
                        f"so {max(n1, n2)}/{denom} {'>' if f1 > f2 else '<'} "
                        f"{min(n1, n2)}/{denom}.")
                ctx = "Comparing chocolate portions"
            else:
                qtext = (f"Compare: {n1}/{denom} and {n2}/{denom}. "
                         f"Which is larger?")
                expl = (f"Same denominator: compare numerators. "
                        f"{max(n1, n2)} > {min(n1, n2)}, "
                        f"so {max(n1, n2)}/{denom} is larger.")
                ctx = "Comparing fractions with same denominator"

            wrong_answers = [
                f"{min(n1, n2)}/{denom} is greater than {max(n1, n2)}/{denom}",
                f"Both fractions are equal",
                f"{n1}/{denom} = {n2}/{denom}"
            ]
            opts = _make_options(rng, correct, wrong_answers)
            corr_idx = opts.index(correct)

            q = Question(
                id=qid, topic="Fractions", subtopic="compare_fractions",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Analyse",
                question_text=qtext, options=opts,
                answer=correct, correct_index=corr_idx,
                steps=[f"Fraction 1: {n1}/{denom}",
                       f"Fraction 2: {n2}/{denom}",
                       f"Same denominator, compare numerators: {n1} vs {n2}",
                       f"Result: {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {max(n1,n2)}/{denom} = {max(f1,f2):.3f}, {min(n1,n2)}/{denom} = {min(f1,f2):.3f}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 6: MONEY  ══════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_money(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["conversion", "add_money", "sub_money",
                  "word_money", "gst_basic"]
    diff_levels = ["easy", "medium", "medium", "hard", "hard"]
    bloom = ["Understand", "Apply", "Apply", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        market = _pick(rng, INDIAN_MARKETS)
        qid = f"MON_{seed:06d}_{i:04d}"

        if st == "conversion":
            rupees = rng.randint(1, 99)
            paise = rupees * 100
            correct = paise
            if is_comp:
                qtext = (f"{name} has Rs {rupees}. How many paise does she have? "
                         f"(1 Rupee = 100 paise)")
                expl = f"Rs {rupees} = {rupees} x 100 = {paise} paise"
                ctx = "Converting rupees to paise"
            else:
                qtext = f"Convert Rs {rupees} to paise."
                expl = f"Rs {rupees} = {rupees} x 100 = {paise} paise"
                ctx = "Rupees to paise conversion"

            wrong = [paise + 100, paise - 50, rupees * 10]
            opts = _make_options(rng, correct, [w for w in wrong if w != correct and w > 0])
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Money", subtopic="conversion",
                question_type="MCQ", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, options=opts,
                answer=str(correct), correct_index=corr_idx,
                steps=[f"Rs {rupees} = {rupees} x 100 paise = {paise} paise"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {paise} paise = {paise / 100} Rupees"
            )
            questions.append(q)

        elif st == "add_money":
            r1 = rng.randint(1, 50)
            p1 = rng.choice([0, 25, 50, 75])
            r2 = rng.randint(1, 50)
            p2 = rng.choice([0, 25, 50, 75])
            total_p = r1 * 100 + p1 + r2 * 100 + p2
            total_r = total_p // 100
            total_p_rem = total_p % 100
            correct = f"Rs {total_r}.{total_p_rem:02d}"

            if is_comp:
                qtext = (f"{name} has Rs {r1}.{p1:02d} in her piggy bank and "
                         f"Rs {r2}.{p2:02d} in her wallet. How much money does "
                         f"she have in total?")
                expl = (f"Rs {r1}.{p1:02d} + Rs {r2}.{p2:02d} = "
                        f"Rs {total_r}.{total_p_rem:02d}")
                ctx = "Total savings calculation"
            else:
                qtext = f"Add: Rs {r1}.{p1:02d} + Rs {r2}.{p2:02d}"
                expl = f"Rs {r1}.{p1:02d} + Rs {r2}.{p2:02d} = Rs {total_r}.{total_p_rem:02d}"
                ctx = "Adding money amounts"

            q = Question(
                id=qid, topic="Money", subtopic="add_money",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"Rs {r1}.{p1:02d} + Rs {r2}.{p2:02d}",
                       f"= Rs {total_r}.{total_p_rem:02d}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: Rs {total_r}.{total_p_rem:02d} - Rs {r1}.{p1:02d} = Rs {r2}.{p2:02d}"
            )
            questions.append(q)

        elif st == "sub_money":
            have_r = rng.randint(5, 100)
            have_p = rng.choice([0, 25, 50, 75])
            spend_r = rng.randint(1, have_r - 1)
            spend_p = rng.choice([0, 25, 50, 75])
            have_total = have_r * 100 + have_p
            spend_total = spend_r * 100 + spend_p
            rem_total = have_total - spend_total
            rem_r = rem_total // 100
            rem_p = rem_total % 100
            correct = f"Rs {rem_r}.{rem_p:02d}"

            if is_comp:
                item = _pick(rng, INDIAN_ITEMS)
                qtext = (f"{name} went to the {market} in {place} with "
                         f"Rs {have_r}.{have_p:02d}. She bought a {item} "
                         f"for Rs {spend_r}.{spend_p:02d}. How much money is left?")
                expl = (f"Rs {have_r}.{have_p:02d} - Rs {spend_r}.{spend_p:02d} "
                        f"= Rs {rem_r}.{rem_p:02d}")
                ctx = "Money remaining after purchase"
            else:
                qtext = (f"Subtract: Rs {have_r}.{have_p:02d} - "
                         f"Rs {spend_r}.{spend_p:02d}")
                expl = (f"Rs {have_r}.{have_p:02d} - Rs {spend_r}.{spend_p:02d} "
                        f"= Rs {rem_r}.{rem_p:02d}")
                ctx = "Subtracting money amounts"

            q = Question(
                id=qid, topic="Money", subtopic="sub_money",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"Rs {have_r}.{have_p:02d} - Rs {spend_r}.{spend_p:02d}",
                       f"= Rs {rem_r}.{rem_p:02d}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: Rs {rem_r}.{rem_p:02d} + Rs {spend_r}.{spend_p:02d} = Rs {have_r}.{have_p:02d}"
            )
            questions.append(q)

        elif st == "word_money":
            item1 = _pick(rng, INDIAN_ITEMS)
            item2 = _pick(rng, INDIAN_ITEMS)
            c1 = _rand_int(rng, 20, 150)
            c2 = _rand_int(rng, 15, 120)
            qty1 = rng.randint(1, 5)
            qty2 = rng.randint(1, 4)
            total = c1 * qty1 + c2 * qty2
            pay = ((total + 99) // 100) * 100

            qtext = (f"{name} buys {qty1} {item1}(s) at Rs {c1} each and "
                     f"{qty2} {item2}(s) at Rs {c2} each from a shop in {place}. "
                     f"She pays with a Rs {pay} note. How much change does she get?")
            steps_text = (
                f"Cost of {item1}s: {qty1} x Rs {c1} = Rs {c1 * qty1}\n"
                f"Cost of {item2}s: {qty2} x Rs {c2} = Rs {c2 * qty2}\n"
                f"Total cost: Rs {c1 * qty1} + Rs {c2 * qty2} = Rs {total}\n"
                f"Change: Rs {pay} - Rs {total} = Rs {pay - total}"
            )
            correct_change = pay - total
            expl = (f"Total cost = Rs {total}. "
                    f"Change = Rs {pay} - Rs {total} = Rs {correct_change}.")
            ctx = "Shopping with multiple items"

            wrong = [pay - total + 10, total, pay]
            opts = _make_options(rng, correct_change, [w for w in wrong if w != correct_change])
            corr_idx = opts.index(str(correct_change))

            q = Question(
                id=qid, topic="Money", subtopic="word_money",
                question_type="MCQ", competency_type="competency_based",
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext, options=opts,
                answer=str(correct_change), correct_index=corr_idx,
                steps=steps_text.split("\n"), explanation=expl,
                context_hint=ctx,
                verification=f"Check: Rs {total} + Rs {correct_change} = Rs {pay}"
            )
            questions.append(q)

        elif st == "gst_basic":
            price = rng.choice([100, 200, 500, 1000])
            gst_pct = rng.choice([5, 12, 18])
            gst_amt = price * gst_pct / 100
            total = price + gst_amt

            if is_comp:
                qtext = (f"{name} bought an item for Rs {price} at a shop in {place}. "
                         f"The shopkeeper charged {gst_pct}% GST on the price. "
                         f"How much GST was charged?")
                expl = f"GST = {gst_pct}% of Rs {price} = Rs {gst_amt:.2f}"
                ctx = "GST on a purchase"
                correct = f"Rs {gst_amt:.2f}"
                ans = correct
            else:
                qtext = (f"The price of an item is Rs {price}. "
                         f"GST at {gst_pct}% is added. What is the total amount?")
                expl = (f"GST = {gst_pct}% of Rs {price} = Rs {gst_amt:.2f}. "
                        f"Total = Rs {price} + Rs {gst_amt:.2f} = Rs {total:.2f}")
                ctx = "GST calculation"
                correct = f"Rs {total:.2f}"
                ans = correct

            wrong = [price + gst_pct, price - gst_amt, price * gst_pct]
            opts = _make_options(rng, correct, [f"Rs {w:.2f}" for w in wrong if w != float(correct.replace("Rs ", ""))])
            if str(correct) not in opts:
                opts = [str(correct), f"Rs {total + 50:.2f}", f"Rs {total - 30:.2f}", f"Rs {price:.2f}"]
            corr_idx = opts.index(str(correct))

            q = Question(
                id=qid, topic="Money", subtopic="gst_basic",
                question_type="MCQ", competency_type=comp_type,
                difficulty="hard", bloom_level="Apply",
                question_text=qtext, options=opts,
                answer=ans, correct_index=corr_idx,
                steps=[f"Price: Rs {price}",
                       f"GST rate: {gst_pct}%",
                       f"GST = {gst_pct}% of Rs {price} = Rs {gst_amt:.2f}",
                       f"{'Total = Rs {:.2f}'.format(total) if not is_comp or st == 'word_money' else ''}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: Rs {total:.2f} - Rs {price} = Rs {gst_amt:.2f}"
            )
            # Clean up steps for gst case
            if st == "gst_basic" and not is_comp:
                q.steps = [
                    f"Price: Rs {price}",
                    f"GST rate: {gst_pct}%",
                    f"GST = {gst_pct}% of Rs {price} = Rs {gst_amt:.2f}",
                    f"Total = Rs {price} + Rs {gst_amt:.2f} = Rs {total:.2f}"
                ]
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 7: TIME  ═══════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_time(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["read_clock", "time_duration", "am_pm", "word_time"]
    diff_levels = ["easy", "medium", "medium", "hard"]
    bloom = ["Remember", "Understand", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"TIM_{seed:06d}_{i:04d}"

        if st == "read_clock":
            hour = rng.randint(1, 12)
            minute = rng.choice([0, 5, 10, 15, 20, 30])
            correct = f"{hour}:{minute:02d}"
            period = rng.choice(["AM", "PM"])

            if is_comp:
                qtext = (f"{name}'s school bus arrives at {place} bus stop "
                         f"at {period} {hour}:{minute:02d}. "
                         f"What time does the bus arrive?")
                expl = f"The time shown is {hour}:{minute:02d} {period}"
                ctx = "Reading school bus arrival time"
            else:
                qtext = f"What time is shown on the clock? (Hour hand at {hour}, minute hand at {minute})"
                expl = f"Hour hand at {hour}, minute hand at {minute} minutes. Time = {hour}:{minute:02d}"
                ctx = "Reading clock position"

            q = Question(
                id=qid, topic="Time", subtopic="read_clock",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Remember",
                question_text=qtext, answer=correct,
                steps=[f"Hour hand points to: {hour}",
                       f"Minute hand points to: {minute} minutes",
                       f"Time = {hour}:{minute:02d} {period}"],
                explanation=expl, context_hint=ctx,
                verification=f"Clock shows {hour}:{minute:02d} which is valid"
            )
            questions.append(q)

        elif st == "time_duration":
            h1 = rng.randint(1, 11)
            m1 = rng.choice([0, 15, 30])
            h2 = rng.randint(h1, h1 + 2)
            if h2 == h1:
                m2 = m1 + rng.choice([15, 30, 45])
            else:
                m2 = rng.choice([0, 15, 30])
            total_min1 = h1 * 60 + m1
            total_min2 = h2 * 60 + m2
            dur_min = total_min2 - total_min1
            dur_h = dur_min // 60
            dur_m = dur_min % 60
            correct = f"{dur_h} hour(s) and {dur_m} minute(s)"
            if dur_m == 0:
                correct = f"{dur_h} hour(s)"

            if is_comp:
                qtext = (f"{name} started reading a book at {h1}:{m1:02d} "
                         f"and finished at {h2}:{m2:02d}. "
                         f"How long did she read?")
                expl = (f"From {h1}:{m1:02d} to {h2}:{m2:02d} = "
                        f"{dur_h} hour(s) and {dur_m} minute(s)")
                ctx = "Reading duration"
            else:
                qtext = (f"Find the duration between {h1}:{m1:02d} and "
                         f"{h2}:{m2:02d}.")
                expl = f"Duration = {dur_h} hour(s) and {dur_m} minute(s)"
                ctx = "Time duration calculation"

            q = Question(
                id=qid, topic="Time", subtopic="time_duration",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"Start: {h1}:{m1:02d}",
                       f"End: {h2}:{m2:02d}",
                       f"Duration = {dur_h} hour(s) and {dur_m} minute(s)"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {h1}:{m1:02d} + {dur_h}h{dur_m}m = {h2}:{m2:02d}"
            )
            questions.append(q)

        elif st == "am_pm":
            base_hour = rng.randint(1, 12)
            add_hours = rng.choice([1, 2, 3, 6, 12])
            total_hours = base_hour + add_hours
            periods = (total_hours - 1) // 12
            result_hour = ((total_hours - 1) % 12) + 1
            result_period = "AM" if periods % 2 == 0 else "PM"
            correct = f"{result_hour}:00 {result_period}"

            if is_comp:
                qtext = (f"{name} goes to sleep at {base_hour}:00 AM. "
                         f"She sleeps for {add_hours} hours. "
                         f"What time does she wake up?")
                expl = (f"{base_hour}:00 AM + {add_hours} hours = "
                        f"{result_hour}:00 {result_period}")
                ctx = "Sleep and wake-up time"
            else:
                qtext = (f"If it is {base_hour}:00 AM, what will be the time "
                         f"after {add_hours} hours?")
                expl = f"{base_hour}:00 AM + {add_hours} hours = {correct}"
                ctx = "Adding hours to a time"

            q = Question(
                id=qid, topic="Time", subtopic="am_pm",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"Start: {base_hour}:00 AM",
                       f"Add {add_hours} hours: {base_hour} + {add_hours} = {total_hours}",
                       f"Result: {result_hour}:00 {result_period}"],
                explanation=expl, context_hint=ctx,
                verification=f"Clock math: {base_hour} + {add_hours} = {result_hour} ({result_period})"
            )
            questions.append(q)

        elif st == "word_time":
            depart_h = rng.randint(8, 14)
            depart_m = rng.choice([0, 15, 30])
            journey_h = rng.choice([1, 2, 3])
            journey_m = rng.choice([0, 15, 30])
            arrive_total = depart_h * 60 + depart_m + journey_h * 60 + journey_m
            arrive_h = (arrive_total // 60) % 24
            arrive_m = arrive_total % 60
            correct = f"{arrive_h}:{arrive_m:02d}"
            transport = _pick(rng, TRANSPORT)

            if is_comp:
                qtext = (f"{name} boards a {transport} at {depart_h}:{depart_m:02d} "
                         f"from {place}. The journey takes {journey_h} hour(s) and "
                         f"{journey_m} minute(s). At what time does she arrive "
                         f"at her destination?")
                expl = (f"Departure: {depart_h}:{depart_m:02d}. "
                        f"Add {journey_h}h {journey_m}m = "
                        f"Arrival: {arrive_h}:{arrive_m:02d}")
                ctx = f"Journey time by {transport}"
            else:
                qtext = (f"A {transport} leaves at {depart_h}:{depart_m:02d} "
                         f"and takes {journey_h}h {journey_m}m. "
                         f"When does it arrive?")
                expl = (f"{depart_h}:{depart_m:02d} + {journey_h}h "
                        f"{journey_m}m = {arrive_h}:{arrive_m:02d}")
                ctx = f"Arrival time calculation"

            q = Question(
                id=qid, topic="Time", subtopic="word_time",
                question_type="short_answer", competency_type=comp_type,
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext, answer=correct,
                steps=[f"Departure: {depart_h}:{depart_m:02d}",
                       f"Journey: {journey_h}h {journey_m}m",
                       f"Arrival: {depart_h}:{depart_m:02d} + "
                       f"{journey_h}h {journey_m}m = {arrive_h}:{arrive_m:02d}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {arrive_h}:{arrive_m:02d} - {depart_h}:{depart_m:02d} = {journey_h}h {journey_m}m"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 8: CALENDAR  ═══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_calendar(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    days_in_month = {
        "January": 31, "February": 28, "March": 31, "April": 30,
        "May": 31, "June": 30, "July": 31, "August": 31,
        "September": 30, "October": 31, "November": 30, "December": 31
    }
    month_names = list(days_in_month.keys())
    sub_topics = ["days_in_month", "leap_year", "number_of_days", "word_calendar"]
    diff_levels = ["easy", "medium", "medium", "hard"]
    bloom = ["Remember", "Understand", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        qid = f"CAL_{seed:06d}_{i:04d}"

        if st == "days_in_month":
            month = rng.choice(month_names)
            correct = days_in_month[month]
            if is_comp:
                qtext = (f"{name} is making a calendar for the month of "
                         f"{month}. How many days does {name} need to show?")
                expl = f"{month} has {correct} days"
                ctx = "Making a monthly calendar"
            else:
                qtext = f"How many days are there in the month of {month}?"
                expl = f"{month} has {correct} days"
                ctx = "Days in a month"

            q = Question(
                id=qid, topic="Calendar", subtopic="days_in_month",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Remember",
                question_text=qtext, answer=str(correct),
                steps=[f"Month: {month}", f"Days in {month}: {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Standard calendar: {month} = {correct} days"
            )
            questions.append(q)

        elif st == "leap_year":
            year = rng.choice([2020, 2024, 2028, 2023, 2025, 2027, 2031])
            feb_days = 29 if year % 4 == 0 else 28
            is_leap = feb_days == 29
            correct = "Yes" if is_leap else "No"

            if is_comp:
                qtext = (f"{name} was born in {year}. "
                         f"Will {name} have a birthday on 29th February? "
                         f"(Leap year check)")
                expl = (f"{year} is {'a leap year' if is_leap else 'not a leap year'}. "
                        f"{'Yes, February has 29 days.' if is_leap else 'No, February has 28 days.'}")
                ctx = "Birthday on leap year"
            else:
                qtext = f"Is {year} a leap year?"
                expl = (f"{year} is {'a leap year' if is_leap else 'not a leap year'} "
                        f"(divisible by 4: {year % 4 == 0})")
                ctx = "Leap year identification"

            q = Question(
                id=qid, topic="Calendar", subtopic="leap_year",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="medium", bloom_level="Understand",
                question_text=qtext, answer=correct,
                steps=[f"Year: {year}",
                       f"Check: {year} / 4 = {year / 4}" if is_leap else f"Check: {year} % 4 = {year % 4}",
                       f"Result: {year} is {'a leap year' if is_leap else 'not a leap year'}"],
                explanation=expl, context_hint=ctx,
                verification=f"Confirmed: {year} is {'leap' if is_leap else 'not leap'}"
            )
            questions.append(q)

        elif st == "number_of_days":
            month1 = rng.choice(month_names)
            d1 = days_in_month[month1]
            month2 = rng.choice(month_names)
            while month2 == month1:
                month2 = rng.choice(month_names)
            d2 = days_in_month[month2]
            correct = d1 + d2

            if is_comp:
                qtext = (f"{name} visits {place} in {month1} and returns in "
                         f"{month2}. How many days are there in total "
                         f"in both months?")
                expl = f"{month1} ({d1} days) + {month2} ({d2} days) = {d1} + {d2} = {correct} days"
                ctx = "Total days across two months of travel"
            else:
                qtext = (f"Find total days in {month1} and {month2}.")
                expl = f"{d1} + {d2} = {correct}"
                ctx = "Adding days of two months"

            q = Question(
                id=qid, topic="Calendar", subtopic="number_of_days",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=str(correct),
                steps=[f"Days in {month1}: {d1}",
                       f"Days in {month2}: {d2}",
                       f"Total: {d1} + {d2} = {correct}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {correct} - {d1} = {d2}"
            )
            questions.append(q)

        elif st == "word_calendar":
            start_day = rng.randint(1, 28)
            duration = rng.randint(5, 25)
            end_day = start_day + duration
            month = rng.choice(["March", "April", "May", "June", "July",
                                "August", "September", "October",
                                "November", "December"])
            month_days = days_in_month[month]
            overflow = end_day - month_days if end_day > month_days else 0
            next_month = {
                "January": "February", "February": "March", "March": "April",
                "April": "May", "May": "June", "June": "July",
                "July": "August", "August": "September", "September": "October",
                "October": "November", "November": "December",
                "December": "January"
            }

            if is_comp:
                qtext = (f"{name}'s school tour to {place} starts on "
                         f"{month} {start_day}. The tour lasts for "
                         f"{duration} days. On what date does the tour end?")
                expl = (f"Start: {month} {start_day}. "
                        f"After {duration} days: {start_day} + {duration} = {end_day}."
                        f"{' Goes into next month.' if overflow > 0 else ''}")
                ctx = "School tour duration"
            else:
                qtext = (f"An event starts on the {start_day}th of {month} "
                         f"and lasts {duration} days. When does it end?")
                expl = (f"Start: {month} {start_day}. End: "
                        f"{start_day + duration}{'th of ' + next_month[month] if overflow > 0 else 'th of ' + month}")
                ctx = "Event end date calculation"

            correct_end = (f"{end_day}{'th' if 10 <= end_day <= 20 else {1: 'st', 2: 'nd', 3: 'rd'}.get(end_day % 10, 'th')} of "
                           f"{month if overflow == 0 else next_month[month]}")
            suffix = "th"
            if end_day % 10 == 1 and end_day != 11:
                suffix = "st"
            elif end_day % 10 == 2 and end_day != 12:
                suffix = "nd"
            elif end_day % 10 == 3 and end_day != 13:
                suffix = "rd"
            end_month_name = month if overflow == 0 else next_month[month]
            correct_end = f"{end_day}{suffix} of {end_month_name}"

            q = Question(
                id=qid, topic="Calendar", subtopic="word_calendar",
                question_type="short_answer", competency_type=comp_type,
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext, answer=correct_end,
                steps=[f"Start date: {month} {start_day}",
                       f"Duration: {duration} days",
                       f"End: {start_day} + {duration} = {end_day}",
                       f"Ends on: {correct_end}"],
                explanation=expl, context_hint=ctx,
                verification=f"Days from {month} {start_day} to {end_month_name} {end_day} = {duration}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 9: LENGTH  ═════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_length(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["conversion_m_cm", "conversion_km_m", "add_length", "word_length"]
    diff_levels = ["easy", "medium", "medium", "hard"]
    bloom = ["Understand", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"LEN_{seed:06d}_{i:04d}"

        if st == "conversion_m_cm":
            metres = rng.randint(1, 20)
            cm = metres * 100
            correct = cm
            if is_comp:
                qtext = (f"The height of a {place} gate is {metres} metre(s). "
                         f"Convert this to centimetres.")
                expl = f"{metres} m = {metres} x 100 = {cm} cm"
                ctx = "Height of a gate in cm"
            else:
                qtext = f"Convert {metres} metres to centimetres."
                expl = f"{metres} m = {metres} x 100 = {cm} cm"
                ctx = "Metres to centimetres conversion"

            q = Question(
                id=qid, topic="Length", subtopic="conversion_m_cm",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, answer=f"{cm} cm",
                steps=[f"1 m = 100 cm", f"{metres} m = {metres} x 100 = {cm} cm"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {cm} cm = {cm // 100} m"
            )
            questions.append(q)

        elif st == "conversion_km_m":
            km = rng.randint(1, 15)
            m = km * 1000
            correct = m
            if is_comp:
                qtext = (f"The distance between {place} and the next town is "
                         f"{km} kilometre(s). Convert this to metres.")
                expl = f"{km} km = {km} x 1000 = {m} m"
                ctx = "Distance between two places"
            else:
                qtext = f"Convert {km} kilometres to metres."
                expl = f"{km} km = {km} x 1000 = {m} m"
                ctx = "Kilometres to metres conversion"

            q = Question(
                id=qid, topic="Length", subtopic="conversion_km_m",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, answer=f"{m} m",
                steps=[f"1 km = 1000 m", f"{km} km = {km} x 1000 = {m} m"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {m} m = {m // 1000} km"
            )
            questions.append(q)

        elif st == "add_length":
            m1 = rng.randint(1, 50)
            cm1 = rng.randint(0, 99)
            m2 = rng.randint(1, 50)
            cm2 = rng.randint(0, 99)
            total_cm = m1 * 100 + cm1 + m2 * 100 + cm2
            total_m = total_cm // 100
            rem_cm = total_cm % 100
            correct = f"{total_m} m {rem_cm} cm"

            if is_comp:
                qtext = (f"{name} jumps {m1} m {cm1} cm in the first round "
                         f"and {m2} m {cm2} cm in the second round at a "
                         f"sports day in {place}. What is the total distance "
                         f"jumped?")
                expl = (f"Total = {m1}m {cm1}cm + {m2}m {cm2}cm "
                        f"= {total_m}m {rem_cm}cm")
                ctx = "Long jump total distance"
            else:
                qtext = (f"Add: {m1} m {cm1} cm + {m2} m {cm2} cm")
                expl = f"Total = {total_m} m {rem_cm} cm"
                ctx = "Adding lengths"

            q = Question(
                id=qid, topic="Length", subtopic="add_length",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"{m1} m {cm1} cm + {m2} m {cm2} cm",
                       f"= {total_m} m {rem_cm} cm"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {total_m}m {rem_cm}cm - {m1}m {cm1}cm = {m2}m {cm2}cm"
            )
            questions.append(q)

        elif st == "word_length":
            per_side = rng.randint(10, 50)
            sides = rng.choice([3, 4, 5, 6])
            perimeter = per_side * sides
            shape = {3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon"}[sides]

            if is_comp:
                qtext = (f"A {shape}-shaped garden in {place} has {sides} sides. "
                         f"Each side is {per_side} metres long. "
                         f"{name} runs around the garden once. "
                         f"How many metres does she run?")
                expl = f"Perimeter = {sides} x {per_side} = {perimeter} m"
                ctx = f"Perimeter of a {shape} garden"
            else:
                qtext = (f"Find the perimeter of a {shape} with each side "
                         f"{per_side} cm.")
                expl = f"Perimeter = {sides} x {per_side} = {perimeter} cm"
                ctx = f"Perimeter of {shape}"

            q = Question(
                id=qid, topic="Length", subtopic="word_length",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=f"{perimeter} {'metres' if is_comp else 'cm'}",
                steps=[f"Shape: {shape} with {sides} sides",
                       f"Each side: {per_side} {'m' if is_comp else 'cm'}",
                       f"Perimeter = {sides} x {per_side} = {perimeter}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {perimeter} / {sides} = {per_side}"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 10: WEIGHT  ════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_weight(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["conversion_g_kg", "add_weight", "word_weight"]
    diff_levels = ["easy", "medium", "hard"]
    bloom = ["Understand", "Apply", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"WGT_{seed:06d}_{i:04d}"

        if st == "conversion_g_kg":
            kg = rng.randint(1, 10)
            g = kg * 1000
            correct = f"{g} g"
            if is_comp:
                qtext = (f"A bag of rice at a shop in {place} weighs "
                         f"{kg} kg. What is the weight in grams?")
                expl = f"{kg} kg = {kg} x 1000 = {g} g"
                ctx = "Weight of rice bag"
            else:
                qtext = f"Convert {kg} kg to grams."
                expl = f"{kg} kg = {kg} x 1000 = {g} g"
                ctx = "Kilograms to grams conversion"

            q = Question(
                id=qid, topic="Weight", subtopic="conversion_g_kg",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, answer=correct,
                steps=[f"1 kg = 1000 g", f"{kg} kg = {kg} x 1000 = {g} g"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {g} g = {g // 1000} kg"
            )
            questions.append(q)

        elif st == "add_weight":
            kg1 = rng.randint(1, 10)
            g1 = rng.choice([0, 100, 200, 300, 400, 500])
            kg2 = rng.randint(1, 10)
            g2 = rng.choice([0, 100, 200, 300, 400, 500])
            total_g = kg1 * 1000 + g1 + kg2 * 1000 + g2
            total_kg = total_g // 1000
            rem_g = total_g % 1000
            correct = f"{total_kg} kg {rem_g} g"

            if is_comp:
                qtext = (f"{name} buys {kg1} kg {g1} g of rice and "
                         f"{kg2} kg {g2} g of dal at {place} market. "
                         f"What is the total weight?")
                expl = f"Total = {kg1}kg{g1}g + {kg2}kg{g2}g = {total_kg}kg {rem_g}g"
                ctx = "Total weight of groceries"
            else:
                qtext = f"Add: {kg1} kg {g1} g + {kg2} kg {g2} g"
                expl = f"Total = {total_kg} kg {rem_g} g"
                ctx = "Adding weights"

            q = Question(
                id=qid, topic="Weight", subtopic="add_weight",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"{kg1} kg {g1} g + {kg2} kg {g2} g",
                       f"= {total_kg} kg {rem_g} g"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {total_kg}kg {rem_g}g - {kg1}kg{g1}g = {kg2}kg{g2}g"
            )
            questions.append(q)

        elif st == "word_weight":
            item_weight = rng.choice([250, 500, 750])
            num_items = rng.randint(3, 12)
            total_g = item_weight * num_items
            total_kg = total_g // 1000
            rem_g = total_g % 1000

            if is_comp:
                qtext = (f"Each {_pick(rng, INDIAN_FOODS)} packet weighs "
                         f"{item_weight} g. {name} buys {num_items} packets. "
                         f"What is the total weight in kg and g?")
                expl = (f"{num_items} x {item_weight}g = {total_g}g "
                        f"= {total_kg} kg {rem_g} g")
                ctx = "Total weight of multiple packets"
            else:
                qtext = (f"{num_items} items each weighing {item_weight} g. "
                         f"Find total weight in kg and g.")
                expl = f"Total = {total_g} g = {total_kg} kg {rem_g} g"
                ctx = "Weight conversion and multiplication"

            q = Question(
                id=qid, topic="Weight", subtopic="word_weight",
                question_type="short_answer", competency_type=comp_type,
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext, answer=f"{total_kg} kg {rem_g} g",
                steps=[f"Each item: {item_weight} g",
                       f"Number of items: {num_items}",
                       f"Total = {num_items} x {item_weight} = {total_g} g",
                       f"= {total_kg} kg {rem_g} g"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {total_kg}kg {rem_g}g = {total_g}g"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 11: CAPACITY  ═══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_capacity(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["conversion_ml_l", "add_capacity", "word_capacity"]
    diff_levels = ["easy", "medium", "hard"]
    bloom = ["Understand", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"CAP_{seed:06d}_{i:04d}"

        if st == "conversion_ml_l":
            litres = rng.randint(1, 10)
            ml = litres * 1000
            correct = f"{ml} ml"
            if is_comp:
                qtext = (f"A water tank at a school in {place} holds "
                         f"{litres} litre(s) of water. How many millilitres "
                         f"is this?")
                expl = f"{litres} L = {litres} x 1000 = {ml} ml"
                ctx = "Water tank capacity"
            else:
                qtext = f"Convert {litres} litres to millilitres."
                expl = f"{litres} L = {litres} x 1000 = {ml} ml"
                ctx = "Litres to millilitres conversion"

            q = Question(
                id=qid, topic="Capacity", subtopic="conversion_ml_l",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, answer=correct,
                steps=[f"1 L = 1000 ml", f"{litres} L = {litres} x 1000 = {ml} ml"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {ml} ml = {ml // 1000} L"
            )
            questions.append(q)

        elif st == "add_capacity":
            l1 = rng.randint(1, 10)
            ml1 = rng.choice([0, 250, 500, 750])
            l2 = rng.randint(1, 10)
            ml2 = rng.choice([0, 250, 500, 750])
            total_ml = l1 * 1000 + ml1 + l2 * 1000 + ml2
            total_l = total_ml // 1000
            rem_ml = total_ml % 1000
            correct = f"{total_l} L {rem_ml} ml"

            if is_comp:
                qtext = (f"{name} has {l1} L {ml1} ml of orange juice and "
                         f"{l2} L {ml2} ml of lemonade at a party in {place}. "
                         f"How much drink does she have in total?")
                expl = f"Total = {l1}L{ml1}ml + {l2}L{ml2}ml = {total_l}L {rem_ml}ml"
                ctx = "Total drinks at a party"
            else:
                qtext = f"Add: {l1} L {ml1} ml + {l2} L {ml2} ml"
                expl = f"Total = {total_l} L {rem_ml} ml"
                ctx = "Adding capacities"

            q = Question(
                id=qid, topic="Capacity", subtopic="add_capacity",
                question_type="short_answer", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, answer=correct,
                steps=[f"{l1} L {ml1} ml + {l2} L {ml2} ml",
                       f"= {total_l} L {rem_ml} ml"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {total_l}L{rem_ml}ml - {l1}L{ml1}ml = {l2}L{ml2}ml"
            )
            questions.append(q)

        elif st == "word_capacity":
            bottle_size = rng.choice([250, 500, 750])
            total_ml = rng.randint(5, 20) * 1000
            num_bottles = total_ml // bottle_size

            if is_comp:
                qtext = (f"{name} has {total_ml} ml of water. She fills "
                         f"bottles of {bottle_size} ml each. "
                         f"How many bottles can she fill?")
                expl = f"{total_ml} / {bottle_size} = {num_bottles} bottles"
                ctx = "Filling water bottles"
            else:
                qtext = (f"How many {bottle_size} ml bottles can be filled "
                         f"with {total_ml} ml of water?")
                expl = f"{total_ml} / {bottle_size} = {num_bottles}"
                ctx = "Bottles from total water"

            wrong = [num_bottles + 1, num_bottles - 1, num_bottles + bottle_size // 100]
            opts = _make_options(rng, num_bottles, [w for w in wrong if w > 0 and w != num_bottles])
            corr_idx = opts.index(str(num_bottles))

            q = Question(
                id=qid, topic="Capacity", subtopic="word_capacity",
                question_type="MCQ", competency_type=comp_type,
                difficulty="hard", bloom_level="Analyse",
                question_text=qtext, options=opts,
                answer=str(num_bottles), correct_index=corr_idx,
                steps=[f"Total water: {total_ml} ml",
                       f"Bottle size: {bottle_size} ml",
                       f"Number of bottles = {total_ml} / {bottle_size} = {num_bottles}"],
                explanation=expl, context_hint=ctx,
                verification=f"Check: {num_bottles} x {bottle_size} = {num_bottles * bottle_size} ml"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 12: GEOMETRY  ═══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_geometry(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["shapes_2d", "shapes_3d", "lines", "angles"]
    diff_levels = ["easy", "medium", "medium"]
    bloom = ["Remember", "Understand", "Apply"]

    shape_2d = {
        "Triangle": 3, "Square": 4, "Rectangle": 4,
        "Pentagon": 5, "Hexagon": 6, "Circle": 0,
        "Oval": 0, "Diamond": 4
    }
    shape_3d = {
        "Cube": ("faces", 6, "Square"),
        "Cuboid": ("faces", 6, "Rectangle"),
        "Sphere": ("faces", 0, "Round"),
        "Cone": ("faces", 1, "Circular base"),
        "Cylinder": ("faces", 2, "Circular"),
        "Pyramid": ("faces", 5, "Triangular")
    }
    line_types = ["Straight line", "Curved line",
                  "Horizontal line", "Vertical line"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"GEO_{seed:06d}_{i:04d}"

        if st == "shapes_2d":
            shapes = list(shape_2d.items())
            shape_name, sides = rng.choice(shapes)
            if is_comp:
                qtext = (f"{name} sees a {shape_name} design on the floor of "
                         f"a temple in {place}. "
                         f"How many sides does a {shape_name} have?")
                side_word = "no sides (it is round)" if sides == 0 else f"{sides} sides"
                expl = f"A {shape_name} has {side_word}."
                ctx = "Shape in temple design"
            else:
                qtext = f"How many sides does a {shape_name} have?"
                side_word = "no straight sides" if sides == 0 else str(sides)
                expl = f"A {shape_name} has {side_word}."
                ctx = "Properties of 2D shapes"

            if sides == 0:
                correct = "0 (no sides, it is round)"
            else:
                correct = str(sides)

            wrong = [sides + 1, sides + 2, sides - 1] if sides > 1 else [1, 2, 3]
            opts = _make_options(rng, correct if sides != 0 else "0",
                                 [str(w) for w in wrong if w >= 0])
            if correct not in opts:
                opts = [correct, str(wrong[0]), str(wrong[1]), str(wrong[2])]
            corr_idx = opts.index(correct if sides != 0 else "0")

            q = Question(
                id=qid, topic="Geometry", subtopic="shapes_2d",
                question_type="MCQ", competency_type=comp_type,
                difficulty="easy", bloom_level="Remember",
                question_text=qtext, options=opts,
                answer=correct, correct_index=corr_idx,
                steps=[f"Shape: {shape_name}",
                       f"Number of sides: {side_word}"],
                explanation=expl, context_hint=ctx,
                verification=f"Standard: {shape_name} has {sides} sides"
            )
            questions.append(q)

        elif st == "shapes_3d":
            shapes = list(shape_3d.items())
            shape_name, (prop, value, desc) = rng.choice(shapes)
            correct = f"{value} {prop}"

            if is_comp:
                item_desc = {6: "cubical dice", 0: "a spherical ball",
                             1: "an ice-cream cone", 2: "a drum",
                             5: "a pyramid of fruits"}.get(value, f"a {shape_name}")
                qtext = (f"{name} plays with {item_desc} at {place}. "
                         f"How many faces does a {shape_name} have?")
                expl = f"A {shape_name} has {value} faces ({desc})."
                ctx = f"3D shapes in play"
            else:
                qtext = f"How many faces does a {shape_name} have?"
                expl = f"A {shape_name} has {value} faces ({desc})."
                ctx = "Properties of 3D shapes"

            wrong = [value + 1, value + 2, max(0, value - 1)]
            opts = _make_options(rng, str(value),
                                 [str(w) for w in wrong if w >= 0 and w != value])
            if str(value) not in opts:
                opts = [str(value)] + [str(w) for w in wrong[:3]]
            corr_idx = opts.index(str(value))

            q = Question(
                id=qid, topic="Geometry", subtopic="shapes_3d",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Remember",
                question_text=qtext, options=opts,
                answer=correct, correct_index=corr_idx,
                steps=[f"Shape: {shape_name}", f"Faces: {value}"],
                explanation=expl, context_hint=ctx,
                verification=f"Standard: {shape_name} has {value} faces"
            )
            questions.append(q)

        elif st == "lines":
            line = rng.choice(line_types)
            correct = line
            example = {
                "Straight line": "a tight string",
                "Curved line": "a bent wire",
                "Horizontal line": "the horizon",
                "Vertical line": "a standing pole"
            }.get(line, "an example")

            if is_comp:
                qtext = (f"{name} draws a {line} on the playground at {place}. "
                         f"Which type of line did she draw?")
                expl = f"A {line} is {'straight in one direction' if 'Straight' in line else 'bent' if 'Curved' in line else 'left-right' if 'Horizontal' in line else 'up-down'}."
                ctx = "Drawing lines on the playground"
            else:
                qtext = f"Which of the following is a {line}?"
                expl = f"A {line} goes {'straight' if 'Straight' in line else 'curved' if 'Curved' in line else 'horizontally' if 'Horizontal' in line else 'vertically'}."
                ctx = "Types of lines"

            q = Question(
                id=qid, topic="Geometry", subtopic="lines",
                question_type="fill_blank", competency_type=comp_type,
                difficulty="easy", bloom_level="Understand",
                question_text=qtext, answer=correct,
                steps=[f"Identify: {line}",
                       f"Example: {example}"],
                explanation=expl, context_hint=ctx,
                verification=f"Definition confirms: {line}"
            )
            questions.append(q)

        elif st == "angles":
            correct = "Right angle"
            wrong_angles = ["Acute angle", "Obtuse angle", "Straight angle"]

            if is_comp:
                qtext = (f"The corner of a notebook in {name}'s bag forms "
                         f"an angle. When two sides meet at exactly 90 degrees, "
                         f"what is this angle called?")
                expl = "An angle of exactly 90 degrees is called a right angle."
                ctx = "Angle in a notebook corner"
            else:
                qtext = "An angle of exactly 90 degrees is called a ___."
                expl = "A 90-degree angle is called a right angle."
                ctx = "Types of angles"

            opts = _make_options(rng, correct, wrong_angles)
            corr_idx = opts.index(correct)

            q = Question(
                id=qid, topic="Geometry", subtopic="angles",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Understand",
                question_text=qtext, options=opts,
                answer=correct, correct_index=corr_idx,
                steps=["An angle of 90 degrees is formed by perpendicular lines",
                       "This is called a Right angle"],
                explanation=expl, context_hint=ctx,
                verification="Right angle = 90 degrees, confirmed"
            )
            questions.append(q)

    return questions


# ═══════════════════════════════════════════════════════════════════════════
# ═══  TOPIC 13: SYMMETRY  ═══════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _gen_symmetry(seed: int, count: int) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []
    sub_topics = ["line_of_symmetry", "symmetric_shapes"]
    diff_levels = ["easy", "medium"]
    bloom = ["Understand", "Apply", "Analyse"]

    for i in range(count):
        st = rng.choice(sub_topics)
        is_comp = rng.random() < 0.5
        comp_type = "competency_based" if is_comp else "standard"
        diff = rng.choice(diff_levels)
        bl = rng.choice(bloom)
        name = _pick(rng, INDIAN_NAMES)
        place = _pick(rng, INDIAN_PLACES)
        qid = f"SYM_{seed:06d}_{i:04d}"

        if st == "line_of_symmetry":
            shape = rng.choice(["Circle", "Square", "Rectangle",
                                "Equilateral Triangle", "Isosceles Triangle",
                                "Scalene Triangle", "Star"])
            symmetry_count = {"Circle": "infinite", "Square": 4,
                              "Rectangle": 2, "Equilateral Triangle": 3,
                              "Isosceles Triangle": 1,
                              "Scalene Triangle": 0, "Star": 5}[shape]

            if is_comp:
                qtext = (f"{name} draws a {shape} on a Rangoli at {place} during "
                         f"Diwali. How many lines of symmetry does a {shape} have?")
                expl = (f"A {shape} has {symmetry_count} line(s) of symmetry.")
                ctx = "Rangoli symmetry during Diwali"
            else:
                qtext = f"How many lines of symmetry does a {shape} have?"
                expl = f"A {shape} has {symmetry_count} line(s) of symmetry."
                ctx = "Lines of symmetry"

            if symmetry_count == "infinite":
                correct = "Infinite lines"
                wrong_opts = ["1", "2", "4"]
            elif symmetry_count == 0:
                correct = "No line of symmetry"
                wrong_opts = ["1", "2", "3"]
            else:
                correct = f"{symmetry_count} lines"
                wrong_opts = [str(symmetry_count + 1), str(symmetry_count - 1) if symmetry_count > 1 else "0",
                              str(symmetry_count + 2)]

            opts = _make_options(rng, correct, wrong_opts)
            corr_idx = opts.index(correct)

            q = Question(
                id=qid, topic="Symmetry", subtopic="line_of_symmetry",
                question_type="MCQ", competency_type=comp_type,
                difficulty="medium", bloom_level="Apply",
                question_text=qtext, options=opts,
                answer=correct