"""
Class 5 Mathematics – Question Generator
Nodes: c5_math_001  (Indian/International numeration)
       c5_math_002  (Place value & Face value)
"""

import random
import json
from dataclasses import dataclass, field, asdict
from typing import List, Optional, Dict, Any

from class5_maths_solver import (
    number_to_indian_format,
    number_to_international_format,
    number_to_indian_words,
    number_to_international_words,
    indian_format_to_number,
    international_format_to_number,
    C5Math001Solver,
    C5Math002Solver,
    solve,
    PLACE_VALUE_POWERS,
    INTER_LABELS,
    INDIAN_LABELS,
)


# ══════════════════════════════════════════════
# ══════════════════════════════════════════════

@dataclass
class Question:
    node_id:      str
    question_id:  str
    difficulty:   str
    competency:   str
    question_text: str
    options:      Optional[List[str]]     = None
    correct_answer: Any                   = None
    solution:     List[str]               = field(default_factory=list)
    tags:         List[str]               = field(default_factory=list)

    def to_dict(self) -> dict:
        d = asdict(self)
        return d


@dataclass
class QuestionSet:
    node_id:      str
    seed:         int
    num_questions:int
    questions:    List[Question] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "node_id":   self.node_id,
            "seed":      self.seed,
            "count":     self.num_questions,
            "questions": [q.to_dict() for q in self.questions],
        }


# ══════════════════════════════════════════════
#  c5_math_001  QUESTION GENERATOR
# ══════════════════════════════════════════════

class C5Math001Generator:

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self._counter = 0

    def _next_id(self, prefix: str) -> str:
        self._counter += 1
        return f"{prefix}_{self._counter:03d}"

    # ── Q-type 1: Read 9-digit number in Indian system ─────────────
    def q_read_indian(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        fmt = number_to_indian_format(n)
        words = number_to_indian_words(n)
        sol = C5Math001Solver.read_indian(n)

        q_text = (
            f"Read the number {fmt} and write it in words "
            f"(Indian numeration system)."
        )
        blank = words.split()
        masked = []
        revealed = []
        for w in blank:
            if self.rng.random() < 0.35 and w not in ("Crore", "Lakh", "Thousand", "Hundred"):
                masked.append("________")
                revealed.append(w)
            else:
                masked.append(w)

        return Question(
            node_id      = "c5_math_001",
            question_id  = self._next_id("c5m1"),
            difficulty   = "Easy",
            competency   = "Board",
            question_text= f"Read the number {fmt} and write it in words.\n"
                           f"Answer: {' '.join(masked)}",
            correct_answer= words,
            solution     = sol["step_by_step"] + [f"Number in words: {words}"],
            tags         = ["read_indian", "words", "9_digit"],
        )

    # ── Q-type 2: Read 9-digit number in International system ──────
    def q_read_international(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        fmt = number_to_international_format(n)
        words = number_to_international_words(n)
        sol = C5Math001Solver.read_international(n)

        q_text = (
            f"Read the number {fmt} and write it in words "
            f"(International numeration system)."
        )
        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            correct_answer= words,
            solution      = sol["step_by_step"] + [f"Number in words: {words}"],
            tags          = ["read_international", "words", "9_digit"],
        )

    # ── Q-type 3: Write number in Indian format ────────────────────
    def q_write_indian_format(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        fmt = number_to_indian_format(n)
        raw = str(n)
        parts = [raw[0:3], raw[3:5], raw[5:7], raw[7:9]]
        masked = "___,___,___,___"
        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = (
                f"Write the number {n} in the Indian numeration system "
                f"(using commas)."
            ),
            correct_answer= fmt,
            solution      = [
                f"Step 1: Write the number with Indian grouping (3, 2, 2, 2): {fmt}",
                "Step 2: Periods are Crores | Lakhs | Thousands | Ones.",
            ],
            tags          = ["write_indian", "commas", "9_digit"],
        )

    # ── Q-type 4: Write number in International format ─────────────
    def q_write_international_format(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        fmt = number_to_international_format(n)
        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = (
                f"Write the number {n} in the International numeration system "
                f"(using commas)."
            ),
            correct_answer= fmt,
            solution      = [
                f"Step 1: Write the number with International grouping (3, 3, 3): {fmt}",
                "Step 2: Periods are Millions | Thousands | Ones.",
            ],
            tags          = ["write_international", "commas", "9_digit"],
        )

    # ── Q-type 5: Convert Indian → International ────────────────────
    def q_convert_indian_to_international(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        indian_fmt = number_to_indian_format(n)
        inter_fmt  = number_to_international_format(n)
        sol = C5Math001Solver.convert_indian_to_international(indian_fmt)

        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = (
                f"Convert the following number from the Indian system to the "
                f"International system: {indian_fmt}"
            ),
            correct_answer= inter_fmt,
            solution      = sol["step_by_step"] + [
                f"Answer (International format): {inter_fmt}"
            ],
            tags          = ["convert", "indian_to_international", "9_digit"],
        )

    # ── Q-type 6: Convert International → Indian ────────────────────
    def q_convert_international_to_indian(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        inter_fmt = number_to_international_format(n)
        indian_fmt = number_to_indian_format(n)
        sol = C5Math001Solver.convert_international_to_indian(inter_fmt)

        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = (
                f"Convert the following number from the International system to the "
                f"Indian system: {inter_fmt}"
            ),
            correct_answer= indian_fmt,
            solution      = sol["step_by_step"] + [
                f"Answer (Indian format): {indian_fmt}"
            ],
            tags          = ["convert", "international_to_indian", "9_digit"],
        )

    # ── Q-type 7: Name the period ───────────────────────────────────
    def q_name_period(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        indian_fmt = number_to_indian_format(n)
        periods = indian_fmt.split(",")   # [CCC, LL, TT, OOO]
        period_names = ["Crores", "Lakhs", "Thousands", "Ones"]
        idx = self.rng.randint(0, 3)
        correct_period = period_names[idx]
        correct_value  = periods[idx]

        q_text = (
            f"In the number {indian_fmt}, the period with value '{correct_value}' "
            f"is called the ________ period."
        )
        options = [correct_period]
        for name in period_names:
            if name != correct_period:
                options.append(name)
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= correct_period,
            solution      = [
                f"The number {indian_fmt} has periods: Crores ({periods[0]}), "
                f"Lakhs ({periods[1]}), Thousands ({periods[2]}), Ones ({periods[3]}).",
                f"The period with value {correct_value} is the {correct_period} period.",
            ],
            tags          = ["period_name", "indian_system", "9_digit"],
        )

    # ── Q-type 8: Which system has which grouping ──────────────────
    def q_grouping_comparison(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        ind_fmt = number_to_indian_format(n)
        int_fmt = number_to_international_format(n)

        correct = (
            f"The Indian system groups as {ind_fmt} "
            f"(3-2-2-2 pattern). "
            f"The International system groups as {int_fmt} (3-3-3 pattern)."
        )

        distractors = [
            f"The Indian system groups as {int_fmt} (3-3-3 pattern). "
            f"The International system groups as {ind_fmt} (3-2-2-2 pattern).",
            f"Both systems use the same grouping: {int_fmt} (3-3-3 pattern).",
            f"The Indian system groups as {ind_fmt} (3-3-3 pattern). "
            f"The International system groups as {int_fmt} (3-2-2-2 pattern).",
        ]

        options = [correct] + distractors
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = (
                f"For the 9-digit number {n}, "
                f"which statement correctly describes how the Indian and "
                f"International systems group the digits?"
            ),
            options       = options,
            correct_answer= correct,
            solution      = [
                f"Indian format: {ind_fmt}  (pattern: 3 digits, then 2, 2, 2)",
                f"International format: {int_fmt}  (pattern: 3, 3, 3)",
                "Therefore the first option is correct.",
            ],
            tags          = ["grouping", "compare_systems", "9_digit"],
        )

    # ── Q-type 9: Value of a specific period ────────────────────────
    def q_period_value(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        indian_fmt = number_to_indian_format(n)
        periods = indian_fmt.split(",")
        period_names = ["Crores", "Lakhs", "Thousands", "Ones"]
        idx = self.rng.randint(0, 3)
        target_name = period_names[idx]
        target_val  = periods[idx]

        q_text = (
            f"In the number {indian_fmt}, what is the value of the "
            f"{target_name} period?"
        )
        options = [target_val]
        for _ in range(3):
            wrong = str(self.rng.randint(0, 999)).zfill(len(target_val))
            while wrong in options:
                wrong = str(self.rng.randint(0, 999)).zfill(len(target_val))
            options.append(wrong)
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_001",
            question_id   = self._next_id("c5m1"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= target_val,
            solution      = [
                f"The {target_name} period in {indian_fmt} is '{target_val}'.",
                f"Place value = {target_val} × 10^({len(target_val)} digits from right).",
            ],
            tags          = ["period_value", "indian_system", "9_digit"],
        )

    # ── Master-generator ───────────────────────────────────────────
    def generate(self, num_questions: int = 10, mix: Optional[dict] = None) -> List[Question]:
        """
        Generate `num_questions` questions with a roughly even mix of the
        available question types.  Pass `mix` to override proportions, e.g.

            mix = {"q_convert_indian_to_international": 0.3,
                   "q_convert_international_to_indian": 0.3}
        """
        generators = [
            self.q_read_indian,
            self.q_read_international,
            self.q_write_indian_format,
            self.q_write_international_format,
            self.q_convert_indian_to_international,
            self.q_convert_international_to_indian,
            self.q_name_period,
            self.q_grouping_comparison,
            self.q_period_value,
        ]

        if mix:
            weighted = []
            for g in generators:
                name = g.__name__
                w = mix.get(name, 1.0 / len(generators))
                weighted.extend([g] * max(1, round(w * num_questions * 2)))
            selected = [self.rng.choice(weighted) for _ in range(num_questions)]
        else:
            selected = [self.rng.choice(generators) for _ in range(num_questions)]

        questions = []
        for fn in selected:
            try:
                questions.append(fn())
            except Exception as exc:
                questions.append(self._fallback_question(fn.__name__, exc))
        return questions

    def _fallback_question(self, fn_name: str, exc: Exception) -> Question:
        return Question(
            node_id      = "c5_math_001",
            question_id  = self._next_id("c5m1"),
            difficulty   = "Easy",
            competency   = "Board",
            question_text= f"[Auto-generated – fallback for {fn_name}] Error: {exc}",
            correct_answer= None,
            solution     = [f"Generator {fn_name} raised: {exc}"],
            tags         = ["fallback"],
        )


# ══════════════════════════════════════════════
#  c5_math_002  QUESTION GENERATOR
# ══════════════════════════════════════════════

class C5Math002Generator:

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self._counter = 0

    def _next_id(self, prefix: str) -> str:
        self._counter += 1
        return f"{prefix}_{self._counter:03d}"

    # ── Q-type 1: Face value of a digit ────────────────────────────
    def q_face_value(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        s = str(n)
        pos = self.rng.randint(0, 8)
        digit = int(s[pos])
        sol = C5Math002Solver.get_face_value(digit)

        q_text = (
            f"What is the face value of the digit {digit} "
            f"in the number {n}?"
        )
        options = [str(digit)]
        for _ in range(3):
            wrong = str(digit * self.rng.choice([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]))
            options.append(wrong)
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= str(digit),
            solution      = sol["explanation"].split(". ") + [
                f"The digit at position {pos+1} is {digit}; face value = {digit}."
            ],
            tags          = ["face_value", "9_digit"],
        )

    # ── Q-type 2: Place value of a digit ───────────────────────────
    def q_place_value(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        s = str(n)
        pos = self.rng.randint(0, 8)
        digit = int(s[pos])
        pv = digit * PLACE_VALUE_POWERS[pos]
        sol = C5Math002Solver.get_place_value(digit, pos + 1)

        q_text = (
            f"What is the place value of the digit {digit} "
            f"in the number {n}?"
        )
        options = [str(pv)]
        for _ in range(3):
            wrong = digit * self.rng.choice(
                [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000]
            )
            while str(wrong) in options:
                wrong = digit * self.rng.choice(
                    [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000]
                )
            options.append(str(wrong))
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= str(pv),
            solution      = sol["step_by_step"],
            tags          = ["place_value", "9_digit"],
        )

    # ── Q-type 3: Difference between face value and place value ─────
    def q_difference_face_place(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        s = str(n)
        pos = self.rng.randint(0, 8)
        digit = int(s[pos])
        pv = digit * PLACE_VALUE_POWERS[pos]
        diff = pv - digit
        label = INTER_LABELS[pos]
        sol = C5Math002Solver.compare_face_and_place(n)

        q_text = (
            f"In the number {n}, what is the difference between the place value "
            f"and the face value of the digit in the {label}?"
        )
        options = [str(diff)]
        for _ in range(3):
            wrong = diff + self.rng.randint(-50000000, 50000000)
            while wrong <= 0 or str(wrong) in options:
                wrong = diff + self.rng.randint(-50000000, 50000000)
            options.append(str(wrong))
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= str(diff),
            solution      = [
                f"Digit = {digit}",
                f"Place value = {digit} × {PLACE_VALUE_POWERS[pos]:,} = {pv:,}",
                f"Face value = {digit}",
                f"Difference = {pv:,} − {digit} = {diff:,}",
            ],
            tags          = ["difference", "place_value", "face_value", "9_digit"],
        )

    # ── Q-type 4: Identify digit given place value ─────────────────
    def q_digit_from_place_value(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        s = str(n).zfill(9)
        pos = self.rng.randint(0, 8)
        digit = int(s[pos])
        pv = digit * PLACE_VALUE_POWERS[pos]
        label = INTER_LABELS[pos]

        q_text = (
            f"In the number {n}, the place value of the digit in the "
            f"{label} is {pv:,}. What is the digit?"
        )
        options = [str(digit)]
        for _ in range(3):
            wrong = self.rng.randint(0, 9)
            while str(wrong) in options:
                wrong = self.rng.randint(0, 9)
            options.append(str(wrong))
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= str(digit),
            solution      = [
                f"Place value given: {pv:,}",
                f"Place value = digit × {PLACE_VALUE_POWERS[pos]:,}",
                f"digit = {pv:,} ÷ {PLACE_VALUE_POWERS[pos]:,} = {digit}",
            ],
            tags          = ["find_digit", "place_value", "9_digit"],
        )

    # ── Q-type 5: Expanded form from place values ───────────────────
    def q_expanded_form(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        s = str(n).zfill(9)
        parts = []
        total_str = []
        for i, ch in enumerate(s):
            d = int(ch)
            if d != 0:
                pv = d * PLACE_VALUE_POWERS[i]
                parts.append(str(pv))
                total_str.append(f"{d} × {PLACE_VALUE_POWERS[i]:,}")

        q_text = (
            f"Write the expanded form of the number {n} "
            f"using the Indian system place values."
        )
        correct = " + ".join(parts)
        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            correct_answer= correct,
            solution      = [
                f"Break each digit × its place value:",
                " + ".join(total_str),
                f"= {correct}",
            ],
            tags          = ["expanded_form", "place_value", "9_digit"],
        )

    # ── Q-type 6: Compare place values of same digit in different positions ──
    def q_same_digit_different_place(self) -> Question:
        n = self.rng.randint(100_000_000, 999_999_999)
        s = str(n).zfill(9)
        from collections import Counter
        cnt = Counter(s)
        candidates = [d for d, c in cnt.items() if c >= 2]
        if not candidates:
            # regenerate
            return self.q_same_digit_different_place()
        digit = int(self.rng.choice(candidates))
        positions = [i for i, ch in enumerate(s) if int(ch) == digit]
        pos1, pos2 = self.rng.sample(positions, 2)
        pv1 = digit * PLACE_VALUE_POWERS[pos1]
        pv2 = digit * PLACE_VALUE_POWERS[pos2]
        larger_pos  = pos1 if pv1 > pv2 else pos2
        larger_pv   = max(pv1, pv2)
        smaller_pv  = min(pv1, pv2)
        ratio       = larger_pv // smaller_pv

        label1 = INTER_LABELS[pos1]
        label2 = INTER_LABELS[pos2]

        q_text = (
            f"The digit {digit} appears in the number {n} at two different places. "
            f"The place value in the {label1} is how many times the place value "
            f"in the {label2}?"
        )
        options = [str(ratio)]
        for _ in range(3):
            wrong = ratio * self.rng.choice([2, 3, 5, 10])
            while str(wrong) in options:
                wrong = ratio * self.rng.choice([2, 3, 5, 10])
            options.append(str(wrong))
        self.rng.shuffle(options)

        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = q_text,
            options       = options,
            correct_answer= str(ratio),
            solution      = [
                f"Place value at {label1} = {digit} × {PLACE_VALUE_POWERS[pos1]:,} = {pv1:,}",
                f"Place value at {label2} = {digit} × {PLACE_VALUE_POWERS[pos2]:,} = {pv2:,}",
                f"Ratio = {pv1:,} ÷ {pv2:,} = {ratio}",
            ],
            tags          = ["same_digit", "different_place", "compare", "9_digit"],
        )

    # ── Q-type 7: True/False – face value vs place value ────────────
    def q_true_false_face_place(self) -> Question:
        statements = [
            ("The face value of 5 is always 5 regardless of position.", True),
            ("The place value of 5 depends on which position the digit is in.", True),
            ("The face value of 5 can be 500 if 5 is in the hundreds place.", False),
            ("The place value of 0 is always 0.", True),
            ("Face value and place value are the same for the digit 1 in the ones place.", True),
            ("The digit 3 has a face value of 300 in the hundreds place.", False),
        ]
        stmt, answer = self.rng.choice(statements)
        return Question(
            node_id       = "c5_math_002",
            question_id   = self._next_id("c5m2"),
            difficulty    = "Easy",
            competency    = "Board",
            question_text = f"State whether the following is True or False:\n{stmt}",
            options       = ["True", "False"],
            correct_answer= "True" if answer else "False",
            solution      = [
                stmt,
                f"Answer: {'True' if answer else 'False'}",
                ("Face value is always the digit itself. "
                 "Place value depends on position.") if not answer else
                "Face value = digit; place value = digit × positional value.",
            ],
            tags          = ["true_false", "face_value", "place_value", "concept"],
        )

    # ── Master-generator ───────────────────────────────────────────
    def generate(self, num_questions: int = 10, mix: Optional[dict] = None) -> List[Question]:
        generators = [
            self.q_face_value,
            self.q_place_value,
            self.q_difference_face_place,
            self.q_digit_from_place_value,
            self.q_expanded_form,
            self.q_same_digit_different_place,
            self.q_true_false_face_place,
        ]

        if mix:
            weighted = []
            for g in generators:
                name = g.__name__
                w = mix.get(name, 1.0 / len(generators))
                weighted.extend([g] * max(1, round(w * num_questions * 2)))
            selected = [self.rng.choice(weighted) for _ in range(num_questions)]
        else:
            selected = [self.rng.choice(generators) for _ in range(num_questions)]

        questions = []
        for fn in selected:
            try:
                questions.append(fn())
            except Exception as exc:
                questions.append(self._fallback(fn.__name__, exc))
        return questions

    def _fallback(self, fn_name, exc):
        return Question(
            node_id      = "c5_math_002",
            question_id  = self._next_id("c5m2"),
            difficulty   = "Easy",
            competency   = "Board",
            question_text= f"[Fallback – {fn_name}] {exc}",
            correct_answer= None,
            solution     = [f"Error: {exc}"],
            tags         = ["fallback"],
        )


# ══════════════════════════════════════════════
# ══════════════════════════════════════════════

class Class5MathQuestionBank:
    """
    One-stop interface for generating questions for either node.
    """

    def __init__(self, seed: int = 42):
        self._seed = seed
        self._gen_001 = C5Math001Generator(seed)
        self._gen_002 = C5Math002Generator(seed + 1)   # offset seed for variety

    def generate(
        self,
        node_id: str         = "c5_math_001",
        num_questions: int   = 10,
        seed: Optional[int]  = None,
        mix: Optional[dict]  = None,
    ) -> QuestionSet:
        """
        Generate a QuestionSet.

        Parameters
        ----------
        node_id       : "c5_math_001" or "c5_math_002"
        num_questions : how many questions to generate
        seed          : override the default seed (for reproducibility)
        mix           : optional dict of {generator_method_name: weight}

        Returns
        -------
        QuestionSet
        """
        if seed is not None:
            if node_id == "c5_math_001":
                gen = C5Math001Generator(seed)
            else:
                gen = C5Math002Generator(seed)
        else:
            gen = self._gen_001 if node_id == "c5_math_001" else self._gen_002

        questions = gen.generate(num_questions, mix=mix)
        return QuestionSet(
            node_id       = node_id,
            seed          = seed or self._seed,
            num_questions = num_questions,
            questions     = questions,
        )

    def generate_combined(
        self,
        num_001: int = 5,
        num_002: int = 5,
        seed: Optional[int] = None,
    ) -> QuestionSet:
        """Generate questions from both nodes and return a single QuestionSet."""
        if seed is not None:
            gen1 = C5Math001Generator(seed)
            gen2 = C5Math002Generator(seed + 1)
        else:
            gen1, gen2 = self._gen_001, self._gen_002

        qs  = gen1.generate(num_001)
        qs += gen2.generate(num_002)
        return QuestionSet(
            node_id       = "combined",
            seed          = seed or self._seed,
            num_questions = num_001 + num_002,
            questions     = qs,
        )


# ══════════════════════════════════════════════
# ══════════════════════════════════════════════

def demo():
    bank = Class5MathQuestionBank(seed=2025)

    print("=" * 60)
    print("NODE c5_math_001 – Indian/International Numeration")
    print("=" * 60)
    set1 = bank.generate("c5_math_001", num_questions=5, seed=2025)
    for q in set1.questions:
        print(f"\n[{q.question_id}]  ({q.difficulty})")
        print(f"  Q: {q.question_text}")
        if q.options:
            for opt in q.options:
                print(f"     • {opt}")
        print(f"  ✓ Answer: {q.correct_answer}")
        print(f"  Solution:")
        for step in q.solution:
            print(f"    → {step}")

    print("\n")
    print("=" * 60)
    print("NODE c5_math_002 – Place Value & Face Value")
    print("=" * 60)
    set2 = bank.generate("c5_math_002", num_questions=5, seed=2025)
    for q in set2.questions:
        print(f"\n[{q.question_id}]  ({q.difficulty})")
        print(f"  Q: {q.question_text}")
        if q.options:
            for opt in q.options:
                print(f"     • {opt}")
        print(f"  ✓ Answer: {q.correct_answer}")
        print(f"  Solution:")
        for step in q.solution:
            print(f"    → {step}")

    print("\n")
    print("=" * 60)
    print("COMBINED SET")
    print("=" * 60)
    combined = bank.generate_combined(num_001=3, num_002=4, seed=2025)
    print(json.dumps(combined.to_dict(), indent=2))


if __name__ == "__main__":
    demo()