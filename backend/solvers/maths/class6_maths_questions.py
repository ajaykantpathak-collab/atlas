import random
import math
import json
from dataclasses import dataclass, field, asdict
from typing import List, Optional, Dict, Any
from enum import Enum
import hashlib


# ---------------------------------------------------------------------------
# Deterministic seeded RNG wrapper
# ---------------------------------------------------------------------------
class SeededRNG:
    """Deterministic random number generator using a fixed seed."""
    
    _instance = None
    _global_seed = 4242
    
    def __init__(self, seed: int = None):
        if seed is None:
            seed = SeededRNG._global_seed
        self._rng = random.Random(seed)
    
    def randint(self, a: int, b: int) -> int:
        return self._rng.randint(a, b)
    
    def randrange(self, start: int, stop: int = None, step: int = 1) -> int:
        if stop is None:
            return self._rng.randrange(start)
        return self._rng.randrange(start, stop, step)
    
    def choice(self, seq: list):
        return self._rng.choice(seq)
    
    def shuffle(self, seq: list):
        self._rng.shuffle(seq)
        return seq
    
    def uniform(self, a: float, b: float) -> float:
        return self._rng.uniform(a, b)
    
    def sample(self, population: list, k: int) -> list:
        return self._rng.sample(population, k)
    
    def set_state(self, state):
        self._rng.setstate(state)
    
    def get_state(self):
        return self._rng.getstate()
    
    def reseed(self, seed: int = None):
        if seed is None:
            seed = SeededRNG._global_seed
        self._rng = random.Random(seed)


# Global RNG instance
_rng = SeededRNG(4242)


def seed_all(seed: int = 4242):
    """Reset all deterministic random state."""
    _rng.reseed(seed)
    SeededRNG._global_seed = seed


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------
class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class ExamRelevance(Enum):
    BOARD_ONLY = "Board_Only"
    BOARD_PLUS = "Board_Plus"
    COMPETITIVE = "Competitive"


class CompetencyLevel(Enum):
    BOARD = "Board"
    PRACTICAL = "Practical"
    APPLICATION = "Application"


@dataclass
class Question:
    node_id: str
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    hints: List[str] = field(default_factory=list)
    step_by_step: List[str] = field(default_factory=list)
    difficulty: str = "Easy"
    exam_relevance: str = "Board_Only"
    competency_level: str = "Board"
    indian_context: bool = False
    verification_steps: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> dict:
        d = asdict(self)
        d['difficulty'] = self.difficulty
        d['exam_relevance'] = self.exam_relevance
        d['competency_level'] = self.competency_level
        return d
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False, indent=2)


@dataclass
class QuestionSet:
    node_id: str
    node_name: str
    questions: List[Question] = field(default_factory=list)
    total_questions: int = 0
    seed_used: int = 4242
    
    def to_json(self) -> str:
        data = {
            "node_id": self.node_id,
            "node_name": self.node_name,
            "total_questions": len(self.questions),
            "seed_used": self.seed_used,
            "questions": [q.to_dict() for q in self.questions]
        }
        return json.dumps(data, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------------------
# Indian number system helpers
# ---------------------------------------------------------------------------
def indian_format(n: int) -> str:
    """Format number in Indian numbering system: 1,23,45,678"""
    s = str(abs(n))
    if len(s) <= 3:
        return s
    # Last 3 digits
    last3 = s[-3:]
    remaining = s[:-3]
    # Group remaining by 2 from right
    parts = []
    while len(remaining) > 2:
        parts.insert(0, remaining[-2:])
        remaining = remaining[:-2]
    if remaining:
        parts.insert(0, remaining)
    return ','.join(parts) + ',' + last3


def indian_words(n: int) -> str:
    """Convert number to Indian system words (up to 8 digits)."""
    if n == 0:
        return "Zero"
    
    ones_words = [
        "", "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
        "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ]
    tens_words = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety"
    ]
    
    def two_digit_words(num):
        if num < 20:
            return ones_words[num]
        tens = num // 10
        ones = num % 10
        if ones == 0:
            return tens_words[tens]
        return tens_words[tens] + " " + ones_words[ones]
    
    def three_digit_words(num):
        if num == 0:
            return ""
        hundreds = num // 100
        remainder = num % 100
        parts = []
        if hundreds > 0:
            parts.append(ones_words[hundreds] + " Hundred")
        if remainder > 0:
            parts.append(two_digit_words(remainder))
        return " and ".join(parts)
    
    # Indian system: crore, lakh, thousand, hundred
    s = str(abs(n))
    s = s.zfill(8)  # pad to 8 digits minimum
    
    crore = int(s[-8:-6]) if len(s) > 6 else 0
    lakh = int(s[-6:-4]) if len(s) > 4 else 0
    thousand = int(s[-4:-2]) if len(s) > 2 else 0
    hundred_part = int(s[-2:]) if len(s) > 0 else 0
    
    parts = []
    if crore > 0:
        parts.append(ones_words[crore] + " Crore")
    if lakh > 0:
        parts.append(ones_words[lakh] + " Lakh")
    if thousand > 0:
        parts.append(ones_words[thousand] + " Thousand")
    if hundred_part > 0:
        parts.append(three_digit_words(hundred_part))
    
    prefix = "Minus " if n < 0 else ""
    result = ", ".join(parts) if parts else "Zero"
    return prefix + result


def international_words(n: int) -> str:
    """Convert number to International system words (up to 8 digits)."""
    if n == 0:
        return "Zero"
    
    ones_words = [
        "", "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
        "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ]
    tens_words = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety"
    ]
    
    def two_digit_words(num):
        if num < 20:
            return ones_words[num]
        tens = num // 10
        ones = num % 10
        if ones == 0:
            return tens_words[tens]
        return tens_words[tens] + " " + ones_words[ones]
    
    def three_digit_words(num):
        if num == 0:
            return ""
        hundreds = num // 100
        remainder = num % 100
        parts = []
        if hundreds > 0:
            parts.append(ones_words[hundreds] + " Hundred")
        if remainder > 0:
            parts.append(two_digit_words(remainder))
        return " and ".join(parts)
    
    s = str(abs(n))
    
    million = int(s[-7:-6]) if len(s) > 6 else 0
    thousand_part = int(s[-6:-3]) if len(s) > 3 else 0
    hundred_part = int(s[-3:]) if len(s) > 0 else 0
    
    parts = []
    if million > 0:
        parts.append(ones_words[million] + " Million")
    if thousand_part > 0:
        parts.append(three_digit_words(thousand_part) + " Thousand")
    if hundred_part > 0:
        parts.append(three_digit_words(hundred_part))
    
    prefix = "Minus " if n < 0 else ""
    result = ", ".join(p for p in parts if p) if parts else "Zero"
    return prefix + result


# ---------------------------------------------------------------------------
# Verification helpers
# ---------------------------------------------------------------------------
def verify_compare(a: int, b: int, relation: str) -> bool:
    """Verify comparison relation: '<', '>', '=', 'ascending', 'descending'."""
    if relation == '<':
        return a < b
    elif relation == '>':
        return a > b
    elif relation == '=':
        return a == b
    elif relation == 'ascending':
        return a <= b
    elif relation == 'descending':
        return a >= b
    return False


def verify_rounding(n: int, target: int, nearest: int) -> bool:
    """Verify rounding: is 'n' rounded to 'nearest' equal to 'target'?"""
    if nearest == 1000:
        return round(n / 1000) * 1000 == target
    elif nearest == 10000:
        return round(n / 10000) * 10000 == target
    return False


def verify_place_value(number: int, digit_pos: int, expected_place_value: int) -> bool:
    """digit_pos: 0=ones, 1=tens, 2=hundreds, 3=thousands, 4=ten-thousands, 5=lakhs, etc."""
    actual_digit = (abs(number) // (10 ** digit_pos)) % 10
    return actual_digit * (10 ** digit_pos) == expected_place_value


def verify_face_value(number: int, digit_pos: int, expected_face_value: int) -> bool:
    actual_digit = (abs(number) // (10 ** digit_pos)) % 10
    return actual_digit == expected_face_value


def verify_expansion(number: int, expansion: List[int]) -> bool:
    return sum(expansion) == number


# ---------------------------------------------------------------------------
# Step-by-step builders
# ---------------------------------------------------------------------------
def build_comparison_steps(a: int, b: int) -> List[str]:
    """Generate step-by-step comparison explanation."""
    sa = indian_format(a)
    sb = indian_format(b)
    steps = [
        f"Step 1: Write both numbers clearly: {sa} and {sb}",
        f"Step 2: Compare digits from left to right (highest place value first)."
    ]
    
    digits_a = [int(d) for d in str(a).zfill(5)]
    digits_b = [int(d) for d in str(b).zfill(5)]
    place_names_indian = ["Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"]
    
    for i in range(5):
        # Map to Indian place names properly
        if i == 0:
            pname = "Ten Thousands"
        elif i == 1:
            pname = "Thousands"
        elif i == 2:
            pname = "Hundreds"
        elif i == 3:
            pname = "Tens"
        else:
            pname = "Ones"
        
        da = digits_a[i]
        db = digits_b[i]
        
        if da == db:
            steps.append(f"Step {i+3}: At the {pname} place, {da} = {db}. Move to next digit.")
        else:
            steps.append(f"Step {i+3}: At the {pname} place, {da} {'>' if da > db else '<'} {db}. "
                        f"Therefore {sa} {'>' if da > db else '<'} {sb}.")
            break
    
    return steps


def build_rounding_steps(n: int, nearest: int) -> List[str]:
    """Generate step-by-step rounding explanation."""
    place_name = "thousand" if nearest == 1000 else "ten thousand"
    divisor = nearest
    
    quotient = n / divisor
    remainder = n % divisor
    
    steps = [
        f"Step 1: The number is {indian_format(n)}. We need to round it to the nearest {place_name}.",
        f"Step 2: Divide by {nearest}: {indian_format(n)} / {nearest} = {quotient:.1f}",
        f"Step 3: Look at the remainder: {indian_format(n)} = {int(quotient)} x {nearest} + {remainder}",
    ]
    
    half = nearest // 2
    if remainder >= half:
        rounded = (int(quotient) + 1) * nearest
        steps.append(f"Step 4: Remainder ({remainder}) >= {half} (half of {nearest}), so we round UP.")
        steps.append(f"Step 5: Rounded value = ({int(quotient)} + 1) x {nearest} = {indian_format(rounded)}")
    else:
        rounded = int(quotient) * nearest
        steps.append(f"Step 4: Remainder ({remainder}) < {half} (half of {nearest}), so we round DOWN.")
        steps.append(f"Step 5: Rounded value = {int(quotient)} x {nearest} = {indian_format(rounded)}")
    
    return steps


def build_place_value_steps(number: int, digit_pos: int) -> List[str]:
    """Generate step-by-step place value explanation."""
    place_names_indian = ["Ones", "Tens", "Hundreds", "Thousands", "Ten Thousands", 
                           "Lakhs", "Ten Lakhs", "Crores"]
    place_name = place_names_indian[digit_pos]
    actual_digit = (abs(number) // (10 ** digit_pos)) % 10
    place_value = actual_digit * (10 ** digit_pos)
    
    steps = [
        f"Step 1: Write the number: {indian_format(number)}",
        f"Step 2: Identify the position of each digit from right (ones = position 0).",
    ]
    
    # Show digit positions
    s = str(abs(number)).zfill(8)
    for pos in range(min(digit_pos + 1, 8)):
        d = int(s[8 - pos - 1]) if 8 - pos - 1 < len(s) else 0
        if pos == digit_pos:
            steps.append(f"Step {pos+3}: Position {pos} ({place_names_indian[pos]}) has digit {d}.")
    
    steps.append(f"Step {digit_pos+4}: Place Value = Digit x Place = {actual_digit} x {10**digit_pos} = {indian_format(place_value)}")
    steps.append(f"Step {digit_pos+5}: Face Value = The digit itself = {actual_digit}")
    
    return steps


# ---------------------------------------------------------------------------
# Node: c6_math_001 -- Consolidating number sense up to 5 digits
# ---------------------------------------------------------------------------
class NumberSenseGenerator:
    """Generates questions for c6_math_001."""
    
    def __init__(self, rng: SeededRNG = None):
        self.rng = rng or _rng
    
    def gen_comparison(self) -> Question:
        """Generate comparison question between two 5-digit numbers."""
        a = self.rng.randint(10000, 99999)
        b = self.rng.randint(10000, 99999)
        
        while a == b:
            b = self.rng.randint(10000, 99999)
        
        # Ensure they differ at a specific position for better pedagogy
        position = self.rng.randint(0, 4)  # 0=ten-thousands, 4=ones
        place_multiplier = 10 ** (4 - position)
        
        # Make them equal at higher positions
        for pos in range(position):
            mult = 10 ** (4 - pos)
            val = (a // mult) % 10
            b = b - ((b // mult) % 10) * mult + val * mult
        
        # Make them differ at the target position
        da = self.rng.randint(1, 9)
        db = self.rng.randint(0, 9)
        while db == da:
            db = self.rng.randint(0, 9)
        
        a = a - ((a // place_multiplier) % 10) * place_multiplier + da * place_multiplier
        b = b - ((b // place_multiplier) % 10) * place_multiplier + db * place_multiplier
        
        # Ensure valid 5-digit
        a = max(10000, min(99999, a))
        b = max(10000, min(99999, b))
        
        relation = "greater than" if a > b else "smaller than"
        symbol = ">" if a > b else "<"
        
        place_names = ["ten-thousands", "thousands", "hundreds", "tens", "ones"]
        
        q_text = (
            f"Compare the two numbers and identify which is {relation}.\n"
            f"(a) {indian_format(a)}\n"
            f"(b) {indian_format(b)}\n"
            f"Which number is {relation}? Also state the place value where they first differ."
        )
        
        options = []
        if a > b:
            options = [
                f"(a) {indian_format(a)} is greater (differ at {place_names[position]} place)",
                f"(b) {indian_format(b)} is greater (differ at {place_names[position]} place)",
                f"Both are equal",
                f"Cannot be determined"
            ]
        else:
            options = [
                f"(a) {indian_format(a)} is greater (differ at {place_names[position]} place)",
                f"(b) {indian_format(b)} is greater (differ at {place_names[position]} place)",
                f"Both are equal",
                f"Cannot be determined"
            ]
        
        correct = options[0] if a > b else options[1]
        
        steps = build_comparison_steps(a, b)
        steps.append(f"Conclusion: {indian_format(a)} {symbol} {indian_format(b)}")
        
        return Question(
            node_id="c6_math_001",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=(
                f"To compare {indian_format(a)} and {indian_format(b)}, "
                f"start from the leftmost digit. They are equal at higher places, "
                f"but at the {place_names[position]} place, {da} {'>' if a>b else '<'} {db}. "
                f"Hence {indian_format(max(a,b))} > {indian_format(min(a,b))}."
            ),
            hints=[
                f"Write both numbers one below the other, aligning digits by place.",
                f"Start comparing from the leftmost (ten-thousands) digit.",
                f"At the {place_names[position]} place, {da} vs {db} -- this is where they first differ!"
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"verify_compare({a}, {b}, '>') = {a > b}",
                f"Digits equal up to position {position-1}" if position > 0 else "Differ at first position",
                f"Difference at position {position}: {da} vs {db}"
            ],
            metadata={
                "subtype": "comparison",
                "num_a": a,
                "num_b": b,
                "differ_position": position,
                "digit_a": da,
                "digit_b": db,
                "indian_format_a": indian_format(a),
                "indian_format_b": indian_format(b)
            }
        )
    
    def gen_ascending_order(self) -> Question:
        """Generate ascending order question with 3 five-digit numbers."""
        nums = []
        while len(nums) < 3:
            n = self.rng.randint(10000, 99995)
            # Ensure spread across different ranges
            if len(nums) == 0:
                nums.append(n)
            elif len(nums) == 1:
                # Ensure at least 1000 difference
                while abs(n - nums[0]) < 1000:
                    n = self.rng.randint(10000, 99995)
                nums.append(n)
            else:
                while n in nums or abs(n - nums[0]) < 500 or abs(n - nums[1]) < 500:
                    n = self.rng.randint(10000, 99995)
                nums.append(n)
        
        self.rng.shuffle(nums)
        a, b, c = nums[0], nums[1], nums[2]
        
        sorted_nums = sorted(nums)
        
        q_text = (
            f"Arrange the following numbers in ascending order (smallest to largest):\n"
            f"{indian_format(a)}, {indian_format(b)}, {indian_format(c)}\n"
            f"Use the symbol '<' between them."
        )
        
        display_nums = [indian_format(a), indian_format(b), indian_format(c)]
        sorted_display = [indian_format(n) for n in sorted_nums]
        correct_answer = " < ".join(sorted_display)
        
        options_set = set()
        options_set.add(correct_answer)
        
        # Generate plausible wrong answers
        wrong1 = " < ".join(sorted_display[::-1])
        options_set.add(wrong1)
        
        # Swap adjacent
        sw = sorted_nums[:]
        if len(sw) >= 2:
            sw[0], sw[1] = sw[1], sw[0]
            options_set.add(" < ".join(indian_format(n) for n in sw))
        
        options = list(options_set)
        while len(options) < 4:
            fake = sorted_nums[:]
            self.rng.shuffle(fake)
            opt = " < ".join(indian_format(n) for n in fake)
            if opt not in options_set:
                options_set.add(opt)
                options.append(opt)
        
        options = options[:4]
        
        steps = [
            f"Step 1: Write all numbers with equal digits: {', '.join(display_nums)}",
            f"Step 2: Compare digits from left to right.",
        ]
        
        # Detailed comparison
        digits_list = [[int(d) for d in str(n).zfill(5)] for n in sorted_nums]
        place_names = ["Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"]
        
        for pos in range(5):
            vals = [d[pos] for d in digits_list]
            if len(set(vals)) > 1:
                steps.append(f"Step {pos+3}: At {place_names[pos]} place: {vals} -- they differ, so sort by this.")
                break
            else:
                steps.append(f"Step {pos+3}: At {place_names[pos]} place: all have {vals[0]}. Move on.")
        
        steps.append(f"Step 4: Ascending order: {correct_answer}")
        
        return Question(
            node_id="c6_math_001",
            question_text=q_text,
            options=options,
            correct_answer=correct_answer,
            explanation=(
                f"To arrange in ascending order, compare from leftmost digit. "
                f"The smallest is {indian_format(sorted_nums[0])}, then "
                f"{indian_format(sorted_nums[1])}, then {indian_format(sorted_nums[2])}."
            ),
            hints=[
                "Start by comparing the leftmost digits of all numbers.",
                "The number with the smallest leftmost digit comes first.",
                "If leftmost digits are same, move to the next digit to the right."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"sorted([{a}, {b}, {c}]) = {sorted_nums}",
                f"ascending: {correct_answer}"
            ],
            metadata={
                "subtype": "ascending_order",
                "numbers": nums,
                "sorted_numbers": sorted_nums
            }
        )
    
    def gen_estimation_rounding(self) -> Question:
        """Generate estimation/rounding question."""
        nearest = self.rng.choice([1000, 10000])
        
        # Generate a number that rounds interestingly
        if nearest == 1000:
            base = self.rng.randint(10, 99) * 1000
            remainder = self.rng.randint(0, 999)
            # Ensure remainder is >= 500 or < 500 for meaningful rounding
            if remainder >= 500:
                remainder = self.rng.randint(500, 999)
            else:
                remainder = self.rng.randint(0, 499)
            n = base + remainder
        else:
            base = self.rng.randint(1, 9) * 10000
            remainder = self.rng.randint(0, 9999)
            if remainder >= 5000:
                remainder = self.rng.randint(5000, 9999)
            else:
                remainder = self.rng.randint(0, 4999)
            n = base + remainder
        
        # Ensure 5-digit
        n = max(10000, min(99999, n))
        
        rounded = round(n / nearest) * nearest
        place_name = "nearest thousand" if nearest == 1000 else "nearest ten thousand"
        
        # Real-life context (Indian)
        contexts = [
            ("spectators at a cricket match at Eden Gardens, Kolkata", "people"),
            ("seats in a cinema hall in Mumbai", "seats"),
            ("books in a school library in Delhi", "books"),
            ("students attending a school function in Chennai", "students"),
            ("visitors to a museum in Hyderabad", "visitors"),
            ("tickets sold for a music concert in Bangalore", "tickets"),
            ("people at a religious festival in Varanasi", "people"),
            ("units of sweets distributed during Diwali in a colony", "units"),
        ]
        context, unit = self.rng.choice(contexts)
        
        q_text = (
            f"A school principal estimates that there are about {indian_format(n)} {unit} "
            f"attending an event.\n"
            f"Estimate this number to the {place_name}.\n"
            f"What is the approximate number of {unit}?"
        )
        
        options = []
        correct_str = indian_format(rounded)
        options.append(correct_str)
        
        # Wrong: rounding to wrong direction
        if n % nearest >= nearest // 2:
            wrong_down = (n // nearest) * nearest
            options.append(indian_format(wrong_down) if wrong_down >= 10000 else indian_format(wrong_down + 10000))
        else:
            wrong_up = ((n // nearest) + 1) * nearest
            options.append(indian_format(wrong_up))
        
        # Wrong: rounding to other place
        other_nearest = 10000 if nearest == 1000 else 1000
        wrong_other = round(n / other_nearest) * other_nearest
        options.append(indian_format(wrong_other))
        
        # Wrong: just the remainder
        options.append(indian_format(n % nearest))
        
        options = list(dict.fromkeys(options))  # deduplicate preserving order
        while len(options) < 4:
            fake = n + self.rng.randint(-500, 500)
            fake = max(10000, min(99999, fake))
            if indian_format(fake) not in options:
                options.append(indian_format(fake))
        
        options = options[:4]
        
        steps = build_rounding_steps(n, nearest)
        
        return Question(
            node_id="c6_math_001",
            question_text=q_text,
            options=options,
            correct_answer=correct_str,
            explanation=(
                f"To estimate {indian_format(n)} to the {place_name}, "
                f"we look at the digit in the hundreds place (if rounding to thousands) "
                f"or thousands place (if rounding to ten thousands). "
                f"Since that digit is {'5 or more' if n % nearest >= nearest // 2 else 'less than 5'}, "
                f"we round {'up' if n % nearest >= nearest // 2 else 'down'} to {indian_format(rounded)}."
            ),
            hints=[
                f"Look at the digit in the hundreds place (for rounding to thousands).",
                f"If the digit is 5 or more, round up. If less than 5, round down.",
                f"The estimated value is {correct_str}."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"verify_rounding({n}, {rounded}, {nearest}) = {verify_rounding(n, rounded, nearest)}"
            ],
            metadata={
                "subtype": "estimation_rounding",
                "original_number": n,
                "rounded_number": rounded,
                "nearest": nearest,
                "place_name": place_name,
                "context": context,
                "unit": unit
            }
        )
    
    def gen_descending_order(self) -> Question:
        """Generate descending order question."""
        nums = []
        while len(nums) < 4:
            n = self.rng.randint(10000, 99990)
            if len(nums) >= 1:
                while n in nums:
                    n = self.rng.randint(10000, 99990)
            nums.append(n)
        
        self.rng.shuffle(nums)
        
        sorted_nums = sorted(nums, reverse=True)
        
        q_text = (
            f"Arrange the following numbers in descending order (largest to smallest):\n"
            f"{', '.join(indian_format(n) for n in nums)}\n"
            f"Use the symbol '>' between them."
        )
        
        correct_answer = " > ".join(indian_format(n) for n in sorted_nums)
        
        options_set = {correct_answer}
        wrong_desc = " > ".join(indian_format(n) for n in sorted_nums[::-1])
        options_set.add(wrong_desc)
        
        sw = sorted_nums[:]
        if len(sw) >= 2:
            sw[0], sw[1] = sw[1], sw[0]
            options_set.add(" > ".join(indian_format(n) for n in sw))
        
        options = list(options_set)
        while len(options) < 4:
            fake = sorted_nums[:]
            self.rng.shuffle(fake)
            opt = " > ".join(indian_format(n) for n in fake)
            if opt not in options_set:
                options_set.add(opt)
                options.append(opt)
        
        options = options[:4]
        
        steps = [
            f"Step 1: Write all numbers: {', '.join(indian_format(n) for n in nums)}",
            f"Step 2: Find the largest number by comparing leftmost digits: {indian_format(sorted_nums[0])}",
            f"Step 3: Find the next largest: {indian_format(sorted_nums[1])}",
            f"Step 4: Then: {indian_format(sorted_nums[2])}",
            f"Step 5: Smallest: {indian_format(sorted_nums[3])}",
            f"Descending order: {correct_answer}"
        ]
        
        return Question(
            node_id="c6_math_001",
            question_text=q_text,
            options=options,
            correct_answer=correct_answer,
            explanation=(
                f"Descending order means largest to smallest. "
                f"Comparing left to right: {', '.join(indian_format(n) for n in sorted_nums)}"
            ),
            hints=[
                "Find the largest number first.",
                "Then find the next largest from the remaining.",
                "Descending means going from big to small, like a staircase going down."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"sorted({nums}, reverse=True) = {sorted_nums}",
                f"descending: {correct_answer}"
            ],
            metadata={
                "subtype": "descending_order",
                "numbers": nums,
                "sorted_numbers": sorted_nums
            }
        )
    
    def gen_magnitude_context(self) -> Question:
        """Generate real-life magnitude estimation question (Indian context)."""
        scenarios = [
            {
                "scenario": "The cost of a house in Bandra, Mumbai is {a} rupees and another in Powai is {b} rupees. Which house is more expensive and by approximately how much?",
                "unit": "rupees",
                "context": "house prices"
            },
            {
                "scenario": "A cricket match in Mohali had {a} spectators and another in Pune had {b} spectators. Which match had more spectators?",
                "unit": "spectators",
                "context": "cricket match attendance"
            },
            {
                "scenario": "A bookshop in Kolkata sold {a} books in January and {b} books in February. Which month had higher sales?",
                "unit": "books",
                "context": "bookshop sales"
            },
            {
                "scenario": "The population of a small town is about {a} and a nearby village has about {b} people. Which is larger?",
                "unit": "people",
                "context": "population comparison"
            },
            {
                "scenario": "A bus carries {a} passengers from Jaipur and another carries {b} from Udaipur. Which bus has more passengers?",
                "unit": "passengers",
                "context": "bus passengers"
            }
        ]
        
        sc = self.rng.choice(scenarios)
        a = self.rng.randint(20000, 95000)
        
        # Make b close but different
        diff = self.rng.randint(500, 15000)
        if self.rng.random() > 0.5:
            b = a + diff
        else:
            b = a - diff
        
        b = max(10000, min(99999, b))
        
        larger = max(a, b)
        smaller = min(a, b)
        diff_actual = larger - smaller
        
        q_text = sc["scenario"].format(a=indian_format(a), b=indian_format(b))
        
        options = []
        if a > b:
            options = [
                f"The first ({indian_format(a)}) is larger by approximately {indian_format(diff_actual)} {sc['unit']}",
                f"The second ({indian_format(b)}) is larger by approximately {indian_format(diff_actual)} {sc['unit']}",
                f"Both are approximately equal",
                f"Cannot compare without exact count"
            ]
        else:
            options = [
                f"The first ({indian_format(a)}) is larger by approximately {indian_format(diff_actual)} {sc['unit']}",
                f"The second ({indian_format(b)}) is larger by approximately {indian_format(diff_actual)} {sc['unit']}",
                f"Both are approximately equal",
                f"Cannot compare without exact count"
            ]
        
        correct = options[0] if a > b else options[1]
        
        steps = [
            f"Step 1: First value: {indian_format(a)} {sc['unit']}",
            f"Step 2: Second value: {indian_format(b)} {sc['unit']}",
            f"Step 3: Compare: {indian_format(a)} vs {indian_format(b)}",
            f"Step 4: {indian_format(larger)} > {indian_format(smaller)}",
            f"Step 5: Difference: {indian_format(larger)} - {indian_format(smaller)} = {indian_format(diff_actual)}"
        ]
        
        return Question(
            node_id="c6_math_001",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=(
                f"{indian_format(larger)} > {indian_format(smaller)}, "
                f"so the larger one is {indian_format(larger)}. "
                f"Difference = {indian_format(diff_actual)}."
            ),
            hints=[
                f"Compare {indian_format(a)} and {indian_format(b)} digit by digit.",
                f"Look at the leftmost position where they differ.",
                f"Larger number minus smaller number gives the difference."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"max({a}, {b}) = {larger}",
                f"min({a}, {b}) = {smaller}",
                f"difference = {diff_actual}"
            ],
            metadata={
                "subtype": "magnitude_context",
                "num_a": a,
                "num_b": b,
                "larger": larger,
                "smaller": smaller,
                "difference": diff_actual,
                "scenario_context": sc["context"],
                "unit": sc["unit"]
            }
        )
    
    def generate(self, count: int = 10) -> List[Question]:
        """Generate a balanced set of questions for this node."""
        questions = []
        
        # Balanced mix: 3 comparison, 2 ascending, 2 descending, 2 estimation, 1 magnitude
        subtype_counts = {
            "comparison": max(1, count // 5),
            "ascending": max(1, count // 5),
            "descending": max(1, count // 5),
            "estimation": max(1, count // 5),
            "magnitude": max(1, count - 4 * (count // 5))
        }
        
        generators = {
            "comparison": self.gen_comparison,
            "ascending": self.gen_ascending_order,
            "descending": self.gen_descending_order,
            "estimation": self.gen_estimation_rounding,
            "magnitude": self.gen_magnitude_context
        }
        
        for subtype, n_q in subtype_counts.items():
            for _ in range(n_q):
                questions.append(generators[subtype]())
        
        self.rng.shuffle(questions)
        return questions[:count]


# ---------------------------------------------------------------------------
# Node: c6_math_002 -- Place value (recapitulation and extension)
# ---------------------------------------------------------------------------
class PlaceValueGenerator:
    """Generates questions for c6_math_002."""
    
    def __init__(self, rng: SeededRNG = None):
        self.rng = rng or _rng
    
    def gen_place_value_face_value(self) -> Question:
        """Identify place value and face value of a digit."""
        # Generate a number up to 8 digits
        num_digits = self.rng.randint(5, 8)
        n = self.rng.randint(10 ** (num_digits - 1), 10 ** num_digits - 1)
        n = max(10000, min(99999999, n))  # at least 5 digits
        
        # Choose a position (0=ones)
        max_pos = len(str(n)) - 1
        digit_pos = self.rng.randint(0, max(0, min(max_pos, 6)))  # up to 10^6
        
        place_names_indian = {
            0: "Ones", 1: "Tens", 2: "Hundreds", 3: "Thousands",
            4: "Ten Thousands", 5: "Lakhs", 6: "Ten Lakhs", 7: "Crores"
        }
        place_names_intl = {
            0: "Ones", 1: "Tens", 2: "Hundreds", 3: "Thousands",
            4: "Ten Thousands", 5: "Hundred Thousands", 6: "Millions", 7: "Ten Millions"
        }
        
        place_name_ind = place_names_indian.get(digit_pos, f"10^{digit_pos}")
        place_name_intl = place_names_intl.get(digit_pos, f"10^{digit_pos}")
        
        actual_digit = (n // (10 ** digit_pos)) % 10
        face_value = actual_digit
        place_value = actual_digit * (10 ** digit_pos)
        
        q_text = (
            f"In the number {indian_format(n)}, identify the place value and face value "
            f"of the digit at the {place_name_ind} position.\n\n"
            f"Number: {indian_format(n)}\n"
            f"Position: {place_name_ind} (Indian) / {place_name_intl} (International)"
        )
        
        options = [
            f"Face Value = {face_value}, Place Value = {indian_format(place_value)}",
            f"Face Value = {face_value}, Place Value = {indian_format(10 ** digit_pos)}",
            f"Face Value = {place_value}, Place Value = {face_value}",
            f"Face Value = {actual_digit * 10}, Place Value = {indian_format(place_value // 10)}"
        ]
        
        self.rng.shuffle(options)
        
        correct_idx = None
        for i, opt in enumerate(options):
            if f"Face Value = {face_value}, Place Value = {indian_format(place_value)}" == opt:
                correct_idx = i
                break
        
        correct_answer = options[correct_idx]
        
        steps = build_place_value_steps(n, digit_pos)
        
        return Question(
            node_id="c6_math_002",
            question_text=q_text,
            options=options,
            correct_answer=correct_answer,
            explanation=(
                f"In {indian_format(n)}, the digit at the {place_name_ind} place is {actual_digit}.\n"
                f"Face Value = The digit itself = {actual_digit}\n"
                f"Place Value = Face Value x Place = {actual_digit} x {10**digit_pos} = {indian_format(place_value)}"
            ),
            hints=[
                f"Count positions from right: Ones is position 0, Tens is position 1, etc.",
                f"Face value is the digit itself. Place value is digit x position value.",
                f"At position {digit_pos} ({place_name_ind}), digit is {actual_digit}."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"verify_face_value({n}, {digit_pos}, {face_value}) = {verify_face_value(n, digit_pos, face_value)}",
                f"verify_place_value({n}, {digit_pos}, {place_value}) = {verify_place_value(n, digit_pos, place_value)}"
            ],
            metadata={
                "subtype": "place_value_face_value",
                "number": n,
                "digit_position": digit_pos,
                "face_value": face_value,
                "place_value": place_value,
                "place_name_indian": place_name_ind,
                "place_name_international": place_name_intl,
                "actual_digit": actual_digit
            }
        )
    
    def gen_expansion(self) -> Question:
        """Generate number expansion question."""
        num_digits = self.rng.randint(5, 7)
        n = self.rng.randint(10 ** (num_digits - 1), 10 ** num_digits - 1)
        n = max(10000, min(9999999, n))
        
        # Generate expansion
        expansion = []
        temp = n
        power = 0
        while temp > 0:
            digit = temp % 10
            if digit > 0:
                expansion.append(digit * (10 ** power))
            temp //= 10
            power += 1
        expansion.reverse()
        
        q_text = (
            f"Expand the number {indian_format(n)} using place value notation.\n"
            f"Write it as a sum of each digit multiplied by its place value."
        )
        
        # Format expansion text
        expansion_str = " + ".join(indian_format(v) for v in expansion)
        
        # Also provide Indian place names
        indian_expansion_parts = []
        temp = n
        power = 0
        while temp > 0:
            digit = temp % 10
            if digit > 0:
                place_name_ind = {0:"Ones", 1:"Tens", 2:"Hundreds", 3:"Thousands",
                                  4:"Ten Thousands", 5:"Lakhs", 6:"Ten Lakhs", 7:"Crores"}.get(power, f"10^{power}")
                indian_expansion_parts.append(f"{digit} x {place_name_ind} ({indian_format(10**power)})")
            temp //= 10
            power += 1
        indian_expansion_str = " + ".join(reversed(indian_expansion_parts))
        
        options = [
            expansion_str,
        ]
        
        # Generate wrong expansions
        # Wrong: swap two terms
        if len(expansion) >= 2:
            wrong_exp = expansion[:]
            wrong_exp[0], wrong_exp[1] = wrong_exp[1], wrong_exp[0]
            options.append(" + ".join(indian_format(v) for v in wrong_exp))
        
        # Wrong: wrong digit values (change one digit)
        wrong_exp2 = expansion[:]
        if len(wrong_exp2) >= 1:
            idx = self.rng.randint(0, len(wrong_exp2) - 1)
            original_val = wrong_exp2[idx]
            power_here = int(math.log10(original_val)) if original_val > 0 else 0
            wrong_digit = self.rng.randint(1, 9)
            while wrong_digit == original_val // (10 ** power_here):
                wrong_digit = self.rng.randint(1, 9)
            wrong_exp2[idx] = wrong_digit * (10 ** power_here)
            options.append(" + ".join(indian_format(v) for v in wrong_exp2))
        
        # Wrong: missing a term
        if len(expansion) >= 2:
            wrong_exp3 = expansion[1:]  # skip first
            options.append(" + ".join(indian_format(v) for v in wrong_exp3))
        
        # Ensure unique options
        options = list(dict.fromkeys(options))
        while len(options) < 4:
            fake_exp = expansion[:]
            self.rng.shuffle(fake_exp)
            opt = " + ".join(indian_format(v) for v in fake_exp)
            if opt not in options and sum(fake_exp) == n:
                options.append(opt)
            else:
                fake_n = n + self.rng.randint(-1000, 1000)
                fake_n = max(10000, min(9999999, fake_n))
                fe = []
                t = fake_n
                p = 0
                while t > 0:
                    d = t % 10
                    if d > 0:
                        fe.append(d * (10 ** p))
                    t //= 10
                    p += 1
                fe.reverse()
                opt2 = " + ".join(indian_format(v) for v in fe)
                if opt2 not in options:
                    options.append(opt2)
        
        options = options[:4]
        
        steps = [
            f"Step 1: Write the number: {indian_format(n)}",
            f"Step 2: Break into each digit with its place value:",
            indian_expansion_str,
            f"Step 3: Write as sum: {expansion_str}",
        ]
        
        return Question(
            node_id="c6_math_002",
            question_text=q_text,
            options=options,
            correct_answer=expansion_str,
            explanation=(
                f"The number {indian_format(n)} expanded by place value:\n"
                f"{indian_expansion_str}\n"
                f"= {expansion_str}"
            ),
            hints=[
                f"Write the number and identify the value of each non-zero digit.",
                "Multiply each digit by its place value (1, 10, 100, 1000, etc.).",
                f"Add all the place values together."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"verify_expansion({n}, {expansion}) = {verify_expansion(n, expansion)}",
                f"sum = {sum(expansion)}"
            ],
            metadata={
                "subtype": "expansion",
                "number": n,
                "expansion": expansion,
                "expansion_string": expansion_str,
                "indian_expansion_string": indian_expansion_str
            }
        )
    
    def gen_digit_position(self) -> Question:
        """Identify which digit is in a specific place."""
        num_digits = self.rng.randint(6, 8)
        n = self.rng.randint(10 ** (num_digits - 1), 10 ** num_digits - 1)
        n = max(100000, min(99999999, n))
        
        max_pos = len(str(n)) - 1
        place_names_indian = {
            0: "ones", 1: "tens", 2: "hundreds", 3: "thousands",
            4: "ten thousands", 5: "lakhs", 6: "ten lakhs", 7: "crores"
        }
        
        digit_pos = self.rng.randint(0, min(max_pos, 6))
        place_name = place_names_indian[digit_pos]
        actual_digit = (n // (10 ** digit_pos)) % 10
        
        q_text = (
            f"What is the digit in the {place_name} place in the number {indian_format(n)}?\n"
            f"Also, what is its place value?"
        )
        
        options = [
            f"Digit = {actual_digit}, Place Value = {indian_format(actual_digit * 10**digit_pos)}",
        ]
        
        # Wrong digits
        for _ in range(3):
            wrong_d = self.rng.randint(0, 9)
            while wrong_d == actual_digit:
                wrong_d = self.rng.randint(0, 9)
            options.append(f"Digit = {wrong_d}, Place Value = {indian_format(wrong_d * 10**digit_pos)}")
        
        self.rng.shuffle(options)
        correct = options[0]
        
        # Count occurrences
        d = n
        pos = 0
        while d > 0:
            rem = d % 10
            if pos == digit_pos:
                break
            d //= 10
            pos += 1
        
        steps = [
            f"Step 1: Write the number: {indian_format(n)} = {indian_format(n)}",
            f"Step 2: Count positions from right: position 0 = ones, position 1 = tens, etc.",
            f"Step 3: Go to position {digit_pos} ({place_name} place).",
            f"Step 4: The digit at position {digit_pos} is {actual_digit}.",
            f"Step 5: Place Value = {actual_digit} x {10**digit_pos} = {indian_format(actual_digit * 10**digit_pos)}"
        ]
        
        return Question(
            node_id="c6_math_002",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=(
                f"Position {digit_pos} from the right is the {place_name} place. "
                f"Digit = {actual_digit}, Place Value = {actual_digit} x {10**digit_pos} = {indian_format(actual_digit * 10**digit_pos)}"
            ),
            hints=[
                f"Count from the right: Ones (1st), Tens (2nd), Hundreds (3rd), Thousands (4th), etc.",
                f"The {place_name} place is at position {digit_pos} from the right.",
                f"Multiply the digit by the place value (10^{digit_pos})."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"Digit at pos {digit_pos}: {(n // 10**digit_pos) % 10}",
                f"Place value: {(n // 10**digit_pos) % 10 * 10**digit_pos}"
            ],
            metadata={
                "subtype": "digit_position",
                "number": n,
                "digit_position": digit_pos,
                "place_name": place_name,
                "actual_digit": actual_digit,
                "place_value": actual_digit * 10**digit_pos
            }
        )
    
    def gen_largest_number(self) -> Question:
        """Form the largest/smallest number from given digits."""
        num_digits = self.rng.randint(4, 6)
        digits = [self.rng.randint(1, 9)]  # first digit non-zero
        for _ in range(num_digits - 1):
            digits.append(self.rng.randint(0, 9))
        
        self.rng.shuffle(digits)
        
        largest = int("".join(str(d) for d in sorted(digits, reverse=True)))
        smallest = int("".join(str(d) for d in sorted(digits)))
        
        place_names_indian = {
            0: "Ones", 1: "Tens", 2: "Hundreds", 3: "Thousands",
            4: "Ten Thousands", 5: "Lakhs", 6: "Ten Lakhs"
        }
        
        # Also ask for smallest
        q_type = self.rng.choice(["largest", "smallest", "both"])
        
        if q_type == "largest":
            q_text = (
                f"Using the digits {', '.join(str(d) for d in digits)}, "
                f"form the largest possible {len(digits)}-digit number. "
                f"(Each digit must be used exactly once, and the first digit cannot be zero.)"
            )
            correct = indian_format(largest)
            options = [indian_format(largest)]
            
            # Wrong: sorted ascending
            wrong1 = int("".join(str(d) for d in sorted(digits)))
            options.append(indian_format(wrong1))
            
            # Wrong: random permutation
            wrong2_digits = digits[:]
            self.rng.shuffle(wrong2_digits)
            wrong2 = int("".join(str(d) for d in wrong2_digits))
            options.append(indian_format(wrong2))
            
            # Wrong: reverse but with a swap
            wrong3_digits = sorted(digits, reverse=True)
            if len(wrong3_digits) >= 2:
                wrong3_digits[0], wrong3_digits[1] = wrong3_digits[1], wrong3_digits[0]
            wrong3 = int("".join(str(d) for d in wrong3_digits))
            options.append(indian_format(wrong3))
            
        elif q_type == "smallest":
            q_text = (
                f"Using the digits {', '.join(str(d) for d in digits)}, "
                f"form the smallest possible {len(digits)}-digit number. "
                f"(Each digit must be used exactly once, and the first digit cannot be zero.)"
            )
            correct = indian_format(smallest)
            options = [indian_format(smallest)]
            
            wrong1 = int("".join(str(d) for d in sorted(digits, reverse=True)))
            options.append(indian_format(wrong1))
            
            wrong2_digits = digits[:]
            self.rng.shuffle(wrong2_digits)
            wrong2 = int("".join(str(d) for d in wrong2_digits))
            options.append(indian_format(wrong2))
            
            wrong3_digits = sorted(digits)
            if len(wrong3_digits) >= 2:
                wrong3_digits[0], wrong3_digits[-1] = wrong3_digits[-1], wrong3_digits[0]
            wrong3 = int("".join(str(d) for d in wrong3_digits))
            options.append(indian_format(wrong3))
            
        else:  # both
            q_text = (
                f"Using the digits {', '.join(str(d) for d in digits)}, "
                f"form both the largest and smallest possible {len(digits)}-digit numbers."
            )
            correct = f"Largest: {indian_format(largest)}, Smallest: {indian_format(smallest)}"
            options = [correct]
            
            options.append(f"Largest: {indian_format(smallest)}, Smallest: {indian_format(largest)}")
            
            wrong2_digits = digits[:]
            self.rng.shuffle(wrong2_digits)
            wrong2 = int("".join(str(d) for d in wrong2_digits))
            options.append(f"Largest: {indian_format(max(largest, wrong2))}, Smallest: {indian_format(min(smallest, wrong2))}")
            
            wrong3_digits = sorted(digits, reverse=True)
            wrong3 = int("".join(str(d) for d in wrong3_digits))
            options.append(f"Largest: {indian_format(largest)}, Smallest: {indian_format(wrong3)}")
        
        self.rng.shuffle(options)
        
        steps = [
            f"Step 1: Digits available: {', '.join(str(d) for d in digits)}",
            f"Step 2: For the {'largest' if q_type != 'smallest' else 'smallest'} number, arrange digits in {'descending' if q_type != 'smallest' else 'ascending'} order.",
        ]
        
        if q_type in ["largest", "both"]:
            sorted_desc = sorted(digits, reverse=True)
            steps.append(f"Step 3: Largest = {''.join(str(d) for d in sorted_desc)} = {indian_format(largest)}")
        
        if q_type in ["smallest", "both"]:
            sorted_asc = sorted(digits)
            steps.append(f"Step 3: Smallest = {''.join(str(d) for d in sorted_asc)} = {indian_format(smallest)}")
        
        return Question(
            node_id="c6_math_002",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=(
                f"To form the largest number, arrange digits in descending order: {indian_format(largest)}. "
                f"To form the smallest, arrange in ascending order: {indian_format(smallest)}."
            ),
            hints=[
                "Arrange digits from highest to lowest for the largest number.",
                "Arrange digits from lowest to highest for the smallest number.",
                "Remember: the leftmost digit should be the largest (or smallest) possible."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"digits: {digits}",
                f"largest: {largest}",
                f"smallest: {smallest}"
            ],
            metadata={
                "subtype": f"form_{q_type}_number",
                "digits": digits,
                "largest": largest,
                "smallest": smallest,
                "q_type": q_type
            }
        )
    
    def gen_successor_predecessor(self) -> Question:
        """Find successor and predecessor of a number."""
        n = self.rng.randint(10000, 99998)
        successor = n + 1
        predecessor = n - 1
        
        q_type = self.rng.choice(["successor", "predecessor", "both"])
        
        if q_type == "successor":
            q_text = (
                f"What is the successor of {indian_format(n)}?\n"
                f"(The successor is the number that comes immediately after a given number.)"
            )
            correct = indian_format(successor)
            options = [indian_format(successor)]
            
            options.append(indian_format(n))
            options.append(indian_format(n + 2))
            options.append(indian_format(n + 10))
            
        elif q_type == "predecessor":
            q_text = (
                f"What is the predecessor of {indian_format(n)}?\n"
                f"(The predecessor is the number that comes immediately before a given number.)"
            )
            correct = indian_format(predecessor)
            options = [indian_format(predecessor)]
            
            options.append(indian_format(n))
            options.append(indian_format(n - 2))
            options.append(indian_format(n + 1))
            
        else:
            q_text = (
                f"Find the successor and predecessor of {indian_format(n)}."
            )
            correct = f"Successor: {indian_format(successor)}, Predecessor: {indian_format(predecessor)}"
            options = [correct]
            options.append(f"Successor: {indian_format(n + 2)}, Predecessor: {indian_format(n - 2)}")
            options.append(f"Successor: {indian_format(n)}, Predecessor: {indian_format(n)}")
            options.append(f"Successor: {indian_format(predecessor)}, Predecessor: {indian_format(successor)}")
        
        self.rng.shuffle(options)
        options = list(dict.fromkeys(options))[:4]
        
        steps = [
            f"Step 1: Given number: {indian_format(n)}",
        ]
        
        if q_type in ["successor", "both"]:
            steps.append(f"Step 2: Successor = {indian_format(n)} + 1 = {indian_format(successor)}")
        
        if q_type in ["predecessor", "both"]:
            steps.append(f"Step 2: Predecessor = {indian_format(n)} - 1 = {indian_format(predecessor)}")
        
        return Question(
            node_id="c6_math_002",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=(
                f"Successor of {indian_format(n)} = {indian_format(n)} + 1 = {indian_format(successor)}. "
                f"Predecessor of {indian_format(n)} = {indian_format(n)} - 1 = {indian_format(predecessor)}."
            ),
            hints=[
                "Successor means 'next number' -- add 1.",
                "Predecessor means 'previous number' -- subtract 1.",
                f"Successor of {indian_format(n)} is {indian_format(successor)}."
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"successor({n}) = {successor}",
                f"predecessor({n}) = {predecessor}"
            ],
            metadata={
                "subtype": f"{q_type}_question",
                "number": n,
                "successor": successor,
                "predecessor": predecessor,
                "q_type": q_type
            }
        )
    
    def gen_indian_international_conversion(self) -> Question:
        """Convert between Indian and International numbering systems."""
        # Indian system: crore, lakh
        # International: million, thousand
        
        # Generate a number in Indian format
        systems = ["indian_to_international", "international_to_indian"]
        sys = self.rng.choice(systems)
        
        if sys == "indian_to_international":
            # Build an Indian-format number
            crore = self.rng.randint(0, 9)
            lakh = self.rng.randint(0, 99)
            thousand = self.rng.randint(0, 99)
            remainder = self.rng.randint(0, 999)
            
            # Ensure it's at least 5 digits
            if crore == 0 and lakh == 0 and thousand < 10:
                thousand = self.rng.randint(10, 99)
            
            n = crore * 10000000 + lakh * 100000 + thousand * 1000 + remainder
            n = max(10000, min(99999999, n))
            
            q_text = (
                f"Write the number {indian_format(n)} in the International numbering system.\n"
                f"(Use commas every three digits from the right.)"
            )
            
            # International format
            intl_parts = []
            s = str(n)
            while len(s) > 3:
                intl_parts.insert(0, s[-3:])
                s = s[:-3]
            intl_parts.insert(0, s)
            correct = ",".join(intl_parts)
            
            options = [correct]
            
            # Wrong: Indian format with wrong grouping
            wrong_ind = indian_format(n + 1000)
            options.append(wrong_ind)
            
            # Wrong: reverse digits
            wrong_rev = int("".join(reversed(str(n))))
            options.append(indian_format(wrong_rev) if wrong_rev < 10**8 else str(wrong_rev))
            
            # Wrong: international format with wrong number
            wrong_n = n + self.rng.randint(1, 9999)
            s2 = str(wrong_n)
            parts2 = []
            while len(s2) > 3:
                parts2.insert(0, s2[-3:])
                s2 = s2[:-3]
            parts2.insert(0, s2)
            options.append(",".join(parts2))
            
        else:
            # International to Indian
            n = self.rng.randint(10000, 99999999)
            
            q_text = (
                f"Write the number {n:,} in the Indian numbering system.\n"
                f"(Use commas: first three digits from right, then every two digits.)"
            )
            correct = indian_format(n)
            options = [correct]
            
            options.append(f"{n:,}")
            
            wrong_n = n + self.rng.randint(100, 10000)
            options.append(indian_format(wrong_n))
            
            s = str(n + 1)
            parts = []
            while len(s) > 3:
                parts.insert(0, s[-2:])
                s = s[:-2]
            parts.insert(0, s)
            options.append(",".join(parts))
        
        self.rng.shuffle(options)
        options = list(dict.fromkeys(options))[:4]
        
        steps = [
            f"Step 1: Given number: {indian_format(n)}",
            f"Step 2: In Indian system: group from right as 3, then 2, then 2...",
            f"Step 3: In International system: group from right as 3, then 3, then 3...",
            f"Step 4: Result: {correct}"
        ]
        
        return Question(
            node_id="c6_math_002",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=(
                f"In the {'International' if sys == 'indian_to_international' else 'Indian'} system, "
                f"commas are placed every {'three' if sys == 'indian_to_international' else 'three then two'} digits "
                f"from the right. So {indian_format(n)} = {correct}."
            ),
            hints=[
                "In the Indian system: 3 digits, then 2 digits, then 2 digits... (e.g., 5,23,456)",
                "In the International system: always 3 digits (e.g., 523,456)",
                f"{indian_format(n)} in International format groups as: {correct if sys == 'international_to_indian' else str(n)}"
            ],
            step_by_step=steps,
            difficulty="Easy",
            exam_relevance="Board_Only",
            competency_level="Board",
            indian_context=True,
            verification_steps=[
                f"number: {n}",
                f"indian_format: {indian_format(n)}",
                f"international_format: {n:,}"
            ],
            metadata={
                "subtype": "system_conversion",
                "number": n,
                "system_from": "indian" if sys == "indian_to_international" else "international",
                "system_to": "international" if sys == "indian_to_international" else "indian",
                "correct_answer": correct
            }
        )
    
    def gen_comparison_place_value(self) -> Question:
        """Compare two numbers and identify place value differences."""
        a = self.rng.randint(10000, 95000)
        b = a + self.rng.randint(1000, 90000)
        b = min(99999999, b)
        
        # Find first differing position
        sa = str(a).zfill(8)
        sb = str(b).zfill(8)
# TRUNCATED:         diff_pos =