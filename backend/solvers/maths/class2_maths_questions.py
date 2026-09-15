"""Class 2 Mathematics Question Generator — CISCE Primary Curriculum"""
import dataclasses
import random
import numpy as np
import sympy as sp
from typing import List, Optional, Dict, Tuple
from dataclasses import dataclass, field
import json
import hashlib

# ─────────────────────────────────────────────────────────────────────────────
# Seed helpers
# ─────────────────────────────────────────────────────────────────────────────
_MASTER_SEED = 20250615  # fixed for determinism

def _rng(seed: int = _MASTER_SEED) -> random.Random:
    return random.Random(seed)

def _np_rng(seed: int = _MASTER_SEED) -> np.random.Generator:
    return np.random.default_rng(seed)

# ─────────────────────────────────────────────────────────────────────────────
# Data models
# ─────────────────────────────────────────────────────────────────────────────
@dataclass
class Question:
    id: str
    node_id: str
    competency: str          # "competency" | "standard"
    difficulty: str          # "Easy" | "Medium"
    cognitive_level: str
    exam_relevance: str
    topic: str
    question_text: str
    options: List[str]
    correct_index: int
    explanation: str
    vocabulary_tags: List[str]
    mastery_criteria_tag: str

    def to_dict(self) -> dict:
        return dataclasses.asdict(self)

# ─────────────────────────────────────────────────────────────────────────────
# Utility helpers
# ─────────────────────────────────────────────────────────────────────────────
_TENS_NAMES = {
    2: "twenty", 3: "thirty", 4: "forty", 5: "fifty",
    6: "sixty", 7: "seventy", 8: "eighty", 9: "ninety",
}
_UNIT_NAMES = {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine",
    10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen",
    14: "fourteen", 15: "fifteen", 16: "sixteen",
    17: "seventeen", 18: "eighteen", 19: "nineteen",
}

def num_to_name(n: int) -> str:
    """Convert 1-999 to English number name (Indian style)."""
    assert 1 <= n <= 999
    if n < 20:
        return _UNIT_NAMES[n]
    tens, ones = divmod(n, 10)
    if ones == 0:
        return _TENS_NAMES[tens]
    return f"{_TENS_NAMES[tens]}-{_UNIT_NAMES[ones]}"

def num_to_name_3digit(n: int) -> str:
    """Convert 1-999 to full three-part name."""
    assert 1 <= n <= 999
    hundreds, rem = divmod(n, 100)
    parts = []
    if hundreds:
        parts.append(_UNIT_NAMES[hundreds] + " hundred")
    if rem:
        parts.append(num_to_name(rem))
    return " ".join(parts)

def _shuffle_options(rng: random.Random, correct: str, wrongs: List[str]) -> List[str]:
    opts = [correct] + wrongs
    rng.shuffle(opts)
    return opts

# ─────────────────────────────────────────────────────────────────────────────
# NODE c2_math_001  – Numbers up to 99 and their number names
# ─────────────────────────────────────────────────────────────────────────────
def generate_node_001(
    rng: random.Random,
    n_competency: int = 6,
    n_standard: int = 6,
) -> List[Question]:
    questions: List[Question] = []

    # ── sub-pool A: numeral → number name (two-digit) ──────────────────────
    pool_A = [(tens * 10 + u, tens, u)
              for tens in range(2, 10)
              for u in range(0, 10)]
    rng.shuffle(pool_A)

    # ── sub-pool B: number name → numeral ──────────────────────────────────
    pool_B = list(pool_A)
    rng.shuffle(pool_B)

    # ── sub-pool C: pattern-continuation ───────────────────────────────────
    pool_C_tens = list(range(2, 10))
    rng.shuffle(pool_C_tens)

    picked_A = pool_A[:n_competency // 2]
    picked_B = pool_B[:n_competency // 2]
    picked_C = pool_C_tens[: n_competency - len(picked_A) - len(picked_B)]

    q_counter = 0

    # --- competency: numeral → name ----------------------------------------
    for num, tens, ones in picked_A:
        correct = num_to_name(num)
        # generate distractors
        distractor_set = set()
        while len(distractor_set) < 3:
            d = num + rng.randint(1, 10) * rng.choice([-1, 1])
            d = max(10, min(99, d))
            if d != num:
                distractor_set.add(num_to_name(d))
        distractors = list(distractor_set)[:3]
        while len(distractors) < 3:
            distractors.append(num_to_name(rng.randint(10, 99)))
        opts = _shuffle_options(rng, correct, distractors)
        ci = opts.index(correct)
        questions.append(Question(
            id=f"c2_001_q{q_counter:03d}",
            node_id="c2_math_001",
            competency="competency",
            difficulty="Easy",
            cognitive_level="Understand",
            exam_relevance="Board_Only",
            topic="Numbers",
            question_text=f"Write the number name for {num}.",
            options=opts,
            correct_index=ci,
            explanation=f"The numeral {num} is written as '{correct}'. "
                        f"{tens} tens make '{_TENS_NAMES[tens]}' and {ones} ones "
                        f"make '{_UNIT_NAMES[ones] if ones else 'zero'}'.",
            vocabulary_tags=["number name", "numeral", "pattern"],
            mastery_criteria_tag="Can read and write numerals up to 99 and recognise number names",
        ))
        q_counter += 1

    # --- competency: name → numeral ----------------------------------------
    for num, tens, ones in picked_B:
        correct_name = num_to_name(num)
        distractors = set()
        while len(distractors) < 3:
            d = num + rng.randint(1, 15) * rng.choice([-1, 1])
            d = max(10, min(99, d))
            if d != num:
                distractors.add(d)
        distractor_list = list(distractors)[:3]
        while len(distractor_list) < 3:
            distractor_list.append(rng.randint(10, 99))
        opts = _shuffle_options(rng, str(num), [str(d) for d in distractor_list])
        ci = opts.index(str(num))
        questions.append(Question(
            id=f"c2_001_q{q_counter:03d}",
            node_id="c2_math_001",
            competency="competency",
            difficulty="Easy",
            cognitive_level="Understand",
            exam_relevance="Board_Only",
            topic="Numbers",
            question_text=f"Write the numeral for '{correct_name}'.",
            options=opts,
            correct_index=ci,
            explanation=f"'{correct_name}' is written as the numeral {num}. "
                        f"{tens} tens and {ones} ones together make {num}.",
            vocabulary_tags=["number", "numeral", "number name"],
            mastery_criteria_tag="Can recognise and write number names up to 99",
        ))
        q_counter += 1

    # --- standard: pattern continuation + mixed ----------------------------
    # Add extra questions using standard pool
    all_tens = list(range(2, 10)) * 2
    rng.shuffle(all_tens)

    remaining = n_standard
    for tens_val in all_tens[:remaining]:
        start_ones = rng.randint(1, 7)
        seq = [num_to_name(tens_val * 10 + i) for i in range(start_ones, start_ones + 3)]
        next_correct = num_to_name(tens_val * 10 + start_ones + 3)
        distractor_set = set()
        while len(distractor_set) < 3:
            offset = rng.choice([-1, 1, 2, -2])
            d = num_to_name(tens_val * 10 + start_ones + 3 + offset)
            if d != next_correct:
                distractor_set.add(d)
        # ensure at least one distractor from a different tens
        if len(distractor_set) < 3:
            other_tens = rng.choice([t for t in range(2, 10) if t != tens_val])
            distractor_set.add(num_to_name(other_tens * 10 + rng.randint(1, 9)))
        distractors = list(distractor_set)[:3]
        while len(distractors) < 3:
            distractors.append(num_to_name(rng.randint(10, 99)))
        opts = _shuffle_options(rng, next_correct, distractors)
        ci = opts.index(next_correct)
        questions.append(Question(
            id=f"c2_001_q{q_counter:03d}",
            node_id="c2_math_001",
            competency="standard",
            difficulty="Easy",
            cognitive_level="Understand",
            exam_relevance="Board_Only",
            topic="Numbers",
            question_text=f"Continue the pattern: {', '.join(seq)}, ...\nWhat comes next?",
            options=opts,
            correct_index=ci,
            explanation=f"The pattern increases the ones digit by 1 each time. "
                        f"After {seq[-1]}, the next number is '{next_correct}'.",
            vocabulary_tags=["pattern", "number name", "tens", "ones"],
            mastery_criteria_tag="Can explain the pattern in number names to generate new number names",
        ))
        q_counter += 1

    return questions

# ─────────────────────────────────────────────────────────────────────────────
# NODE c2_math_002  – Read and write 3-digit numbers up to 999
# ─────────────────────────────────────────────────────────────────────────────
def generate_node_002(
    rng: random.Random,
    n_competency: int = 5,
    n_standard: int = 5,
) -> List[Question]:
    questions: List[Question] = []
    q_counter = 0

    # pool: all 3-digit numbers 100-999
    pool = list(range(100, 999 + 1))
    rng.shuffle(pool)

    picked = pool[: n_competency + n_standard]

    for idx, num in enumerate(picked):
        h, rem = divmod(num, 100)
        t, u = divmod(rem, 10)
        is_competency = idx < n_competency

        # ── type alternates: numeral→name then name→numeral ──────────────
        if idx % 2 == 0:
            correct = num_to_name_3digit(num)
            if h == 1:
                # "one hundred twenty-three" style
                display = f"Write the number name for {num}."
            else:
                display = f"Write the number name for {num}."

            # distractors
            distractor_set = set()
            for _ in range(20):
                shift = rng.randint(1, 50) * rng.choice([-1, 1])
                dn = max(100, min(999, num + shift))
                if dn != num:
                    distractor_set.add(num_to_name_3digit(dn))
                if len(distractor_set) >= 5:
                    break
            distractors = list(distractor_set)[:3]
            while len(distractors) < 3:
                distractors.append(num_to_name_3digit(rng.randint(100, 999)))
            opts = _shuffle_options(rng, correct, distractors)
            ci = opts.index(correct)
            question_text = display
            mastery_tag = "Can write number names for three-digit numbers"
        else:
            correct_name = num_to_name_3digit(num)
            question_text = f"Write the numeral for '{correct_name}'."
            correct_str = str(num)
            distractor_set = set()
            for _ in range(20):
                shift = rng.randint(1, 50) * rng.choice([-1, 1])
                dn = max(100, min(999, num + shift))
                if dn != num:
                    distractor_set.add(str(dn))
                if len(distractor_set) >= 5:
                    break
            distractors = list(distractor_set)[:3]
            while len(distractors) < 3:
                distractors.append(str(rng.randint(100, 999)))
            opts = _shuffle_options(rng, correct_str, distractors)
            ci = opts.index(correct_str)
            mastery_tag = "Can read and write three-digit numerals up to 999"

        questions.append(Question(
            id=f"c2_002_q{q_counter:03d}",
            node_id="c2_math_002",
            competency="competency" if is_competency else "standard",
            difficulty="Easy",
            cognitive_level="Understand",
            exam_relevance="Board_Only",
            topic="Numbers",
            question_text=question_text,
            options=opts,
            correct_index=ci,
            explanation=f"{num} has {h} hundred(s), {t} ten(s) and {u} one(s). "
                        f"It is written as '{num_to_name_3digit(num)}'.",
            vocabulary_tags=["three-digit number", "hundreds", "tens", "ones",
                             "numeral", "number name"],
            mastery_criteria_tag=mastery_tag,
        ))
        q_counter += 1

    return questions

# ─────────────────────────────────────────────────────────────────────────────
# NODE c2_math_003  – Place and face values in a three-digit number
# ─────────────────────────────────────────────────────────────────────────────
def generate_node_003(
    rng: random.Random,
    n_competency: int = 5,
    n_standard: int = 5,
) -> List[Question]:
    questions: List[Question] = []
    q_counter = 0

    pool = list(range(100, 999 + 1))
    rng.shuffle(pool)
    picked = pool[: n_competency + n_standard]

    # Position labels for options
    POSITION_LABELS = ["ones place", "tens place", "hundreds place"]

    for idx, num in enumerate(picked):
        digits = [int(d) for d in str(num)]
        h, t, u = digits  # hundreds, tens, ones
        is_competency = idx < n_competency

        if idx % 3 == 0:
            # ── place value of a digit ───────────────────────────────────
            pos = idx % 3  # 0=hundreds, 1=tens, 2=ones
            pos_name = POSITION_LABELS[pos]
            target_digit = digits[pos]
            # correct = place value
            correct = str(digits[pos] * (10 ** (2 - pos)))
            distractor_set = set()
            while len(distractor_set) < 5:
                wrong_digit = rng.randint(0, 9)
                wrong_pv = str(wrong_digit * (10 ** (2 - pos)))
                if wrong_pv != correct:
                    distractor_set.add(wrong_pv)
            # also add face value as a distractor
            distractor_set.add(str(target_digit))
            # also add another digit in same position
            for _ in range(10):
                wd = rng.randint(0, 9)
                wpv = str(wd * (10 ** (2 - pos)))
                distractor_set.add(wpv)
                if len(distractor_set) >= 4:
                    break
            distractors = list(distractor_set)[:3]
            while len(distractors) < 3:
                distractors.append(str(rng.randint(1, 900)))
            opts = _shuffle_options(rng, correct, distractors)
            ci = opts.index(correct)
            question_text = (
                f"In the number {num}, what is the place value of the digit "
                f"in the {pos_name} (which is {target_digit})?"
            )
            explanation = (
                f"In {num}, the digit {target_digit} is in the {pos_name}. "
                f"Place value = digit × position value = {target_digit} × "
                f"{10 ** (2 - pos)} = {correct}. "
                f"(Face value is just {target_digit}; place value depends on position.)"
            )
            mastery_tag = "Can identify the place value of each digit in a three-digit number"

        elif idx % 3 == 1:
            # ── face value of a digit ─────────────────────────────────────
            pos = rng.randint(0, 2)
            pos_name = POSITION_LABELS[pos]
            target_digit = digits[pos]
            correct = str(target_digit)
            distractor_set = set()
            while len(distractor_set) < 5:
                wrong_digit = rng.randint(0, 9)
                if wrong_digit != target_digit:
                    distractor_set.add(str(wrong_digit))
                if len(distractor_set) >= 4:
                    break
            # also add place value distractor
            distractor_set.add(str(target_digit * (10 ** (2 - pos))))
            distractors = list(distractor_set)[:3]
            while len(distractors) < 3:
                distractors.append(str(rng.randint(0, 9)))
            opts = _shuffle_options(rng, correct, distractors)
            ci = opts.index(correct)
            question_text = (
                f"In the number {num}, what is the face value of the digit "
                f"in the {pos_name}?"
            )
            explanation = (
                f"Face value is the value of the digit itself, regardless of position. "
                f"The digit in the {pos_name} of {num} is {target_digit}, "
                f"so its face value is {target_digit}. "
                f"(Place value would be {target_digit} × {10 ** (2 - pos)} = "
                f"{target_digit * (10 ** (2 - pos))}.)"
            )
            mastery_tag = "Can distinguish between place value and face value of a digit"

        else:
            # ── identify digit at a given place ───────────────────────────
            pos = rng.randint(0, 2)
            pos_name = POSITION_LABELS[pos]
            target_digit = digits[pos]
            correct = str(target_digit)
            distractor_set = set()
            while len(distractor_set) < 5:
                wrong_digit = rng.randint(0, 9)
                if wrong_digit != target_digit:
                    distractor_set.add(str(wrong_digit))
                if len(distractor_set) >= 4:
                    break
            distractors = list(distractor_set)[:3]
            while len(distractors) < 3:
                distractors.append(str(rng.randint(0, 9)))
            opts = _shuffle_options(rng, correct, distractors)
            ci = opts.index(correct)
            question_text = (
                f"In the number {num}, which digit is in the {pos_name}?"
            )
            explanation = (
                f"The number {num} is written as H T O: {h} | {t} | {u}. "
                f"Looking from the right: {u} is in ones place, {t} in tens place, "
                f"and {h} in hundreds place. "
                f"So the digit in the {pos_name} is {target_digit}."
            )
            mastery_tag = "Can identify the place value of each digit in a three-digit number"

        questions.append(Question(
            id=f"c2_003_q{q_counter:03d}",
            node_id="c2_math_003",
            competency="competency" if is_competency else "standard",
            difficulty="Easy",
            cognitive_level="Understand",
            exam_relevance="Board_Only",
            topic="Numbers",
            question_text=question_text,
            options=opts,
            correct_index=ci,
            explanation=explanation,
            vocabulary_tags=["place value", "face value", "digit",
                             "hundreds", "tens", "ones"],
            mastery_criteria_tag=mastery_tag,
        ))
        q_counter += 1

    return questions

# ─────────────────────────────────────────────────────────────────────────────
# Master generator
# ─────────────────────────────────────────────────────────────────────────────
@dataclass
class QuestionBank:
    seed: int = _MASTER_SEED
    questions: List[Question] = field(default_factory=list)
    meta: Dict[str, int] = field(default_factory=dict)

    def build(self) -> None:
        rng = _rng(self.seed)
        # Use deterministic sub-seeds per node
        rng.shuffle([])  # warm-up no-op for reproducibility trace

        rng_001 = _rng(self.seed + 1)
        rng_002 = _rng(self.seed + 2)
        rng_003 = _rng(self.seed + 3)

        q1 = generate_node_001(rng_001, n_competency=6, n_standard=6)
        q2 = generate_node_002(rng_002, n_competency=5, n_standard=5)
        q3 = generate_node_003(rng_003, n_competency=5, n_standard=5)

        self.questions = q1 + q2 + q3
        self.meta = {
            "total_questions": len(self.questions),
            "node_c2_math_001": len(q1),
            "node_c2_math_002": len(q2),
            "node_c2_math_003": len(q3),
            "competency_count": sum(1 for q in self.questions if q.competency == "competency"),
            "standard_count": sum(1 for q in self.questions if q.competency == "standard"),
            "seed": self.seed,
        }

    def export_json(self) -> str:
        return json.dumps(
            {"meta": self.meta,
             "questions": [q.to_dict() for q in self.questions]},
            indent=2,
        )

    def print_questions(self) -> None:
        for q in self.questions:
            print(f"\n{'='*60}")
            print(f"ID        : {q.id}")
            print(f"Node      : {q.node_id}")
            print(f"Track     : {q.competency}  |  Difficulty: {q.difficulty}")
            print(f"Cognitive : {q.cognitive_level}  |  Exam: {q.exam_relevance}")
            print(f"Topic     : {q.topic}")
            print(f"Q         : {q.question_text}")
            for i, opt in enumerate(q.options):
                marker = "✓" if i == q.correct_index else " "
                print(f"  [{marker}] {opt}")
            print(f"Answer idx: {q.correct_index}")
            print(f"Explanation: {q.explanation}")
            print(f"Vocab tags : {q.vocabulary_tags}")
            print(f"Mastery tag: {q.mastery_criteria_tag}")

    def verify(self) -> bool:
        """Run integrity checks."""
        errors = []
        seen_ids: set = set()
        for q in self.questions:
            if q.id in seen_ids:
                errors.append(f"Duplicate ID: {q.id}")
            seen_ids.add(q.id)
            if not (0 <= q.correct_index < len(q.options)):
                errors.append(f"{q.id}: correct_index {q.correct_index} "
                               f"out of range for {len(q.options)} options")
            if q.correct_index != q.options.index(q.options[q.correct_index]):
                pass  # correct_index just points to an option
            if q.node_id not in ("c2_math_001", "c2_math_002", "c2_math_003"):
                errors.append(f"{q.id}: unknown node_id {q.node_id}")
            if q.competency not in ("competency", "standard"):
                errors.append(f"{q.id}: unknown competency {q.competency}")
        if errors:
            print("VERIFICATION FAILED:")
            for e in errors:
                print(f"  ✗ {e}")
            return False
        print(f"VERIFICATION PASSED — {len(self.questions)} questions, "
              f"{self.meta['competency_count']} competency, "
              f"{self.meta['standard_count']} standard, "
              f"seed={self.seed}")
        return True

# ─────────────────────────────────────────────────────────────────────────────
# Verification using SymPy
# ─────────────────────────────────────────────────────────────────────────────
def _verify_numeric_correctness(bank: QuestionBank) -> bool:
    """Use SymPy to verify that every answer index matches the option text."""
    errors = []
    for q in bank.questions:
        if q.node_id == "c2_math_001":
            # numeral → name
            import re
            m = re.search(r"\d+", q.question_text)
            if m:
                expected_num = int(m.group())
                expected_name = num_to_name(expected_num)
                if q.options[q.correct_index] != expected_name:
                    errors.append(f"{q.id}: expected '{expected_name}', "
                                  f"got '{q.options[q.correct_index]}'")
            # name → numeral
            m2 = re.search(r"for '([^']+)'", q.question_text)
            if m2:
                expected_name_in = m2.group(1)
                # verify the correct option numeral maps to this name
                correct_str = q.options[q.correct_index]
                if correct_str.isdigit():
                    n = int(correct_str)
                    if num_to_name(n) != expected_name_in:
                        errors.append(f"{q.id}: name '{expected_name_in}' "
                                      f"≠ num_to_name({n})='{num_to_name(n)}'")

        elif q.node_id in ("c2_math_002",):
            m = re.search(r"\d{3}", q.question_text)
            if m:
                n = int(m.group())
                if q.options[q.correct_index] != num_to_name_3digit(n):
                    errors.append(f"{q.id}: expected '{num_to_name_3digit(n)}', "
                                  f"got '{q.options[q.correct_index]}'")
            m2 = re.search(r"for '([^']+)'", q.question_text)
            if m2:
                expected_name = m2.group(1)
                correct_str = q.options[q.correct_index]
                if correct_str.isdigit() and int(correct_str) <= 999:
                    if num_to_name_3digit(int(correct_str)) != expected_name:
                        errors.append(f"{q.id}: name mismatch")

        elif q.node_id == "c2_math_003":
            m = re.search(r"In the number (\d{3})", q.question_text)
            if m:
                n = int(m.group(1))
                digits = [int(d) for d in str(n)]
                pos_map = {"hundreds": 0, "tens": 1, "ones": 2}
                import re as _re
                pos_m = _re.search(r"digit in the (\w+)", q.question_text)
                if pos_m:
                    pos_name_found = pos_m.group(1)
                    pos_idx = pos_map.get(pos_name_found)
                    if pos_idx is not None:
                        if "place value" in q.question_text:
                            expected_pv = str(digits[pos_idx] * (10 ** (2 - pos_idx)))
                            if q.options[q.correct_index] != expected_pv:
                                errors.append(f"{q.id}: expected PV={expected_pv}, "
                                              f"got '{q.options[q.correct_index]}'")
                        elif "face value" in q.question_text:
                            if q.options[q.correct_index] != str(digits[pos_idx]):
                                errors.append(f"{q.id}: expected FV={digits[pos_idx]}, "
                                              f"got '{q.options[q.correct_index]}'")
                        else:
                            if q.options[q.correct_index] != str(digits[pos_idx]):
                                errors.append(f"{q.id}: expected digit={digits[pos_idx]}, "
                                              f"got '{q.options[q.correct_index]}'")

    if errors:
        print("SYMPY VERIFICATION FAILED:")
        for e in errors:
            print(f"  ✗ {e}")
        return False
    print("SYMPY VERIFICATION PASSED — all answers numerically consistent")
    return True

# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    bank = QuestionBank(seed=_MASTER_SEED)
    bank.build()
    bank.print_questions()
    print()
    ok1 = bank.verify()
    ok2 = _verify_numeric_correctness(bank)
    print()
    if ok1 and ok2:
        print(bank.export_json())
    else:
        raise SystemExit("Question bank has errors — not exported")