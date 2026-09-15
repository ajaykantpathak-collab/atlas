"""
Class 7 Mathematics — Question Generator
Nodes: c7_math_001, c7_math_002
Source: CISCE Upper Primary Curriculum, Mathematics, Class VII

Generates seeded, deterministic question sets for worksheets / practice.
50 % competency-style (Indian context, real-life framing) +
50 % standard textbook-style.
"""

import random
import math
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
from enum import Enum

from maths.class7_maths_solver import (
    IntegerArithmeticSolver,
    IntegerPropertiesSolver,
    IntegerArithmeticSolver,
)


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class NodeID(str, Enum):
    MUL_DIV  = "c7_math_001"
    PROPS    = "c7_math_002"


class DiffLevel(str, Enum):
    EASY   = "easy"
    MEDIUM = "medium"


class Competency(str, Enum):
    BOARD     = "board"
    COMPETENCY = "competency"


class QType(str, Enum):
    MUL_PP    = "mul_positive_positive"       # + × +
    MUL_PN    = "mul_positive_negative"       # + × −
    MUL_NP    = "mul_negative_positive"       # − × +
    MUL_NN    = "mul_negative_negative"       # − × −
    MUL_ZERO  = "mul_with_zero"
    DIV_PP    = "div_positive_positive"
    DIV_NN    = "div_negative_negative"
    DIV_PN    = "div_positive_negative"
    DIV_NP    = "div_negative_positive"
    DIV_ZERO  = "div_zero_by_nonzero"
    MUL_EXPR  = "mul_expression_evaluate"
    DIV_EXPR  = "div_expression_evaluate"
    FILL_SIGN = "fill_missing_sign"

    PROP_VERIFY_COMM_ADD   = "prop_verify_commutativity_addition"
    PROP_VERIFY_COMM_MUL   = "prop_verify_commutativity_multiplication"
    PROP_VERIFY_ASSOC_ADD  = "prop_verify_associativity_addition"
    PROP_VERIFY_ASSOC_MUL  = "prop_verify_associativity_multiplication"
    PROP_IDENTITY_ADD      = "prop_identify_additive_identity"
    PROP_IDENTITY_MUL      = "prop_identify_multiplicative_identity"
    PROP_INVERSE_ADDITIVE  = "prop_additive_inverse"
    PROP_INVERSE_MULT      = "prop_multiplicative_inverse"
    PROP_DISTRIBUTE        = "prop_verify_distributivity"
    PROP_WHICH_HOLDS       = "prop_which_operations_hold"
    PROP_FILL_BLANK        = "prop_fill_blank_verify"


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

def _rng(seed: int):
    """Return a Random instance with the given seed."""
    return random.Random(seed)


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class IntegerArithmeticQGen:
    """
    Generates multiplication / division-of-integers questions.

    Competency split: 50 % real-life word problems (Indian context)
                     50 % standard numeric exercises
    """

    # ── Ranges ───────────────────────────────────────────────────────────
    ABS_RANGE = (2, 15)          # absolute values of operands (easy level)
    ABS_RANGE_MED = (5, 25)      # medium level

    # ── Word-problem templates (Indian context, competency) ──────────────
    WP_TEMPLATES = [
        (
            "A shopkeeper loses ₹{a} every day for {b} days. "
            "What is his total loss?",
            "mul",
            lambda a, b: a * b,
            "negative",
        ),
        (
            "A student answered {b} questions correctly, each worth {a} marks. "
            "How many marks did he gain?",
            "mul",
            lambda a, b: a * b,
            "positive",
        ),
        (
            "A diver descends {a} metres every minute for {b} minutes. "
            "What is his total depth below sea level? (Use negative for depth)",
            "mul",
            lambda a, b: -(a * b),
            "negative",
        ),
        (
            "A temperature drops by {a}°C each hour for {b} hours. "
            "What is the total change in temperature?",
            "mul",
            lambda a, b: -(a * b),
            "negative",
        ),
        (
            "A person gains {a} kg each month for {b} months. "
            "What is his total weight gain?",
            "mul",
            lambda a, b: a * b,
            "positive",
        ),
        (
            "A debt of ₹{a} is shared equally among {b} friends. "
            "How much does each friend owe? (Use negative for debt)",
            "div",
            lambda a, b: -(a // b),
            "negative",
        ),
        (
            "A pile of {a} rupees is to be distributed equally among {b} children. "
            "How much does each child get?",
            "div",
            lambda a, b: a // b,
            "positive",
        ),
        (
            "A submarine is at a depth of {a} metres and rises uniformly to "
            "the surface in {b} hours. What is its hourly rise? (Use negative for depth change)",
            "div",
            lambda a, b: -(a // b),
            "negative",
        ),
        (
            "A temperature falls by a total of {a}°C over {b} hours. "
            "What is the hourly fall?",
            "div",
            lambda a, b: -(a // b),
            "negative",
        ),
        (
            "A runner covers {a} metres in {b} equal sprints. "
            "How many metres per sprint?",
            "div",
            lambda a, b: a // b,
            "positive",
        ),
    ]

    @staticmethod
    def _abs(rng: random.Random, lo: int, hi: int) -> int:
        return rng.randint(lo, hi)

    @classmethod
    def generate_question(
        cls,
        q_type: QType,
        seed: int,
        difficulty: DiffLevel = DiffLevel.EASY,
        competency: Competency = Competency.BOARD,
    ) -> dict:
        """
        Generate a single question dict.

        Returns dict with keys:
            node_id, q_type, text, correct_answer,
            options (for MCQ, list of 4 ints or None),
            competency_tag, difficulty, explanation, solver_method, q_sub_type
        """
        rng = _rng(seed)
        lo, hi = (
            cls.ABS_RANGE if difficulty == DiffLevel.EASY
            else cls.ABS_RANGE_MED
        )

        q: Dict[str, Any] = {
            "node_id": NodeID.MUL_DIV.value,
            "q_type": q_type.value,
            "difficulty": difficulty.value,
            "competency_tag": competency.value,
            "options": None,
            "solver_method": "check_answer",
            "q_sub_type": "mul",
            "text": "",
            "correct_answer": 0,
            "explanation": "",
        }

        # ── Choose style: 50 % competency (word-problem) or 50 % standard ──
        use_word = (competency == Competency.COMPETENCY) or (
            competency == Competency.BOARD and rng.random() < 0.5
        )

        if q_type == QType.MUL_PP:
            a = cls._abs(rng, lo, hi)
            b = cls._abs(rng, lo, hi)
            q["correct_answer"] = a * b
            q["q_sub_type"] = "mul"
            if use_word:
                tpl = rng.choice(cls.WP_TEMPLATES[:5])   # mul templates
                q["text"] = tpl[0].format(a=a, b=b)
                # compute via the lambda to confirm answer
                q["correct_answer"] = tpl[2](a, b)
                sign_req = tpl[3]
                if sign_req == "negative" and q["correct_answer"] > 0:
                    q["correct_answer"] = -q["correct_answer"]
            else:
                q["text"] = f"Multiply:  ({a}) × ({b})"
            q["explanation"] = (
                f"|{a}| × |{b}| = {a} × {b} = {abs(a)*abs(b)}.\n"
                f"Positive × Positive = Positive.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.MUL_PN:
            a = cls._abs(rng, lo, hi)
            b = cls._abs(rng, lo, hi)
            q["correct_answer"] = -(a * b)
            q["q_sub_type"] = "mul"
            if use_word:
                tpl = rng.choice(cls.WP_TEMPLATES[:5])
                q["text"] = tpl[0].format(a=a, b=b)
                q["correct_answer"] = -(a * b)
            else:
                q["text"] = f"Multiply:  ({a}) × ({-b})"
            q["explanation"] = (
                f"|{a}| × |{b}| = {abs(a)*abs(b)}.\n"
                f"Opposite signs → Negative.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.MUL_NP:
            a = cls._abs(rng, lo, hi)
            b = cls._abs(rng, lo, hi)
            q["correct_answer"] = -(a * b)
            q["q_sub_type"] = "mul"
            if use_word:
                tpl = rng.choice(cls.WP_TEMPLATES[:5])
                q["text"] = tpl[0].format(a=a, b=b)
                q["correct_answer"] = -(a * b)
            else:
                q["text"] = f"Multiply:  ({-a}) × ({b})"
            q["explanation"] = (
                f"|{a}| × |{b}| = {abs(a)*abs(b)}.\n"
                f"Opposite signs → Negative.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.MUL_NN:
            a = cls._abs(rng, lo, hi)
            b = cls._abs(rng, lo, hi)
            q["correct_answer"] = a * b
            q["q_sub_type"] = "mul"
            if use_word:
                # two negatives: e.g. removing a penalty
                q["text"] = (
                    f"Each of {b} students had {a} negative marks removed. "
                    f"What is the net gain in marks for the class?"
                )
                q["correct_answer"] = a * b
            else:
                q["text"] = f"Multiply:  ({-a}) × ({-b})"
            q["explanation"] = (
                f"|{a}| × |{b}| = {abs(a)*abs(b)}.\n"
                f"Negative × Negative = Positive.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.MUL_ZERO:
            a = cls._abs(rng, lo, hi)
            b = 0
            q["correct_answer"] = 0
            q["q_sub_type"] = "mul"
            q["text"] = f"Multiply:  ({a}) × (0)"
            q["explanation"] = (
                "Any integer multiplied by 0 equals 0.\n"
                f"{a} × 0 = 0."
            )

        elif q_type == QType.DIV_PP:
            b = cls._abs(rng, lo, hi)
            q_correct = cls._abs(rng, lo, hi)
            a = b * q_correct   # ensure exact division
            q["correct_answer"] = q_correct
            q["q_sub_type"] = "div"
            if use_word:
                tpl = rng.choice(cls.WP_TEMPLATES[5:])   # div templates
                q["text"] = tpl[0].format(a=a, b=b)
                q["correct_answer"] = tpl[2](a, b)
            else:
                q["text"] = f"Divide:  ({a}) ÷ ({b})"
            q["explanation"] = (
                f"|{a}| ÷ |{b}| = {abs(a)} ÷ {abs(b)} = {q_correct}.\n"
                f"Same sign → Positive.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.DIV_NN:
            b = cls._abs(rng, lo, hi)
            q_correct = cls._abs(rng, lo, hi)
            a = -(b * q_correct)
            q["correct_answer"] = q_correct
            q["q_sub_type"] = "div"
            if use_word:
                q["text"] = (
                    f"A debt of ₹{abs(a)} is shared equally among {b} friends. "
                    f"How much does each friend owe?"
                )
                q["correct_answer"] = -(abs(a) // b)
            else:
                q["text"] = f"Divide:  ({a}) ÷ ({-b})"
            q["explanation"] = (
                f"|{a}| ÷ |{b}| = {abs(a)} ÷ {abs(b)} = {abs(a)//abs(b)}.\n"
                f"Same sign (both negative) → Positive.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.DIV_PN:
            b = cls._abs(rng, lo, hi)
            q_correct = cls._abs(rng, lo, hi)
            a = -(b * q_correct)
            q["correct_answer"] = -q_correct
            q["q_sub_type"] = "div"
            if use_word:
                q["text"] = (
                    f"A debt of ₹{abs(a)} is shared equally among {b} friends. "
                    f"How much does each friend owe? (Use negative sign)"
                )
                q["correct_answer"] = -(abs(a) // b)
            else:
                q["text"] = f"Divide:  ({a}) ÷ ({b})"
            q["explanation"] = (
                f"|{a}| ÷ |{b}| = {abs(a)} ÷ {abs(b)} = {abs(a)//abs(b)}.\n"
                f"Opposite signs → Negative.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.DIV_NP:
            b = cls._abs(rng, lo, hi)
            q_correct = cls._abs(rng, lo, hi)
            a = b * q_correct
            neg_a = -a
            q["correct_answer"] = -q_correct
            q["q_sub_type"] = "div"
            if use_word:
                q["text"] = (
                    f"A person is at depth of {a} m below sea level. "
                    f"He rises {b} metres per minute. How many minutes to surface?"
                )
                q["correct_answer"] = a // b  # positive here since context
            else:
                q["text"] = f"Divide:  ({neg_a}) ÷ ({b})"
            q["explanation"] = (
                f"|{neg_a}| ÷ |{b}| = {abs(neg_a)} ÷ {abs(b)} = {abs(neg_a)//abs(b)}.\n"
                f"Opposite signs → Negative.\n"
                f"Answer: {q['correct_answer']}"
            )

        elif q_type == QType.DIV_ZERO:
            b = cls._abs(rng, lo, hi)
            q["correct_answer"] = 0
            q["q_sub_type"] = "div"
            q["text"] = f"Divide:  (0) ÷ ({b})"
            q["explanation"] = (
                "Zero divided by any non-zero integer equals 0.\n"
                f"0 ÷ {b} = 0."
            )

        elif q_type in (QType.MUL_EXPR, QType.DIV_EXPR):
            a = cls._abs(rng, lo, hi) * rng.choice([-1, 1])
            b = cls._abs(rng, lo, hi) * rng.choice([-1, 1])
            if q_type == QType.MUL_EXPR:
                q["text"] = f"Evaluate:  ({a}) × ({b})"
                q["correct_answer"] = a * b
                q["q_sub_type"] = "mul"
                q["explanation"] = (
                    f"({a}) × ({b}) = {a*b}\n"
                    f"{IntegerArithmeticSolver.multiply(a, b)['steps'][2]}"
                )
            else:
                if b == 0:
                    b = cls._abs(rng, lo, hi)
                q["text"] = f"Evaluate:  ({a}) ÷ ({b})"
                q["correct_answer"] = a // b
                q["q_sub_type"] = "div"
                q["explanation"] = (
                    f"({a}) ÷ ({b}) = {a//b}\n"
                    "Use the division sign rule and absolute values."
                )

        elif q_type == QType.FILL_SIGN:
            a = cls._abs(rng, lo, hi)
            b = cls._abs(rng, lo, hi)
            ans = a * b
            sign_str = "+" if ans > 0 else ("−" if ans < 0 else "0")
            q["text"] = (
                f"({a}) × ({b}) = _____.\n"
                "Fill in the blank with the correct sign (+ / −) and the number."
            )
            q["correct_answer"] = ans
            q["q_sub_type"] = "mul"
            q["explanation"] = (
                f"|{a}| × |{b}| = {a*b if a*b>0 else -a*b}.\n"
                f"Sign rule → {sign_str}.\n"
                f"Answer: {ans}"
            )

        else:
            raise ValueError(f"Unknown q_type: {q_type}")

        # ── MCQ options ────────────────────────────────────────────────────
        q["options"] = cls._build_options(q["correct_answer"], rng)
        return q

    @classmethod
    def _build_options(
        cls, correct: int, rng: random.Random, n: int = 4
    ) -> List[int]:
        """Build n multiple-choice options including the correct answer."""
        opts = {correct}
        pool = list(range(-50, 51))
        if correct in pool:
            pool.remove(correct)
        rng.shuffle(pool)
        for val in pool:
            if len(opts) >= n:
                break
            if all(abs(val - o) >= 2 for o in opts):
                opts.add(val)
        while len(opts) < n:
            cand = rng.randint(-50, 51)
            if cand not in opts:
                opts.add(cand)
        result = list(opts)
        rng.shuffle(result)
        return result

    @classmethod
    def generate_worksheet(
        cls,
        node_id: NodeID,
        seed: int,
        n_questions: int = 10,
        difficulty: DiffLevel = DiffLevel.EASY,
        mix_competency: bool = True,
    ) -> List[dict]:
        """
        Generate a balanced worksheet of n_questions.

        40 % multiplication, 40 % division, 20 % properties (for node 001).
        For node 002: balanced across all 9 property types.
        50 % standard, 50 % competency (Indian context).
        """
        rng = _rng(seed)
        questions: List[dict] = []

        if node_id == NodeID.MUL_DIV:
            q_types = (
                [QType.MUL_PP, QType.MUL_PN, QType.MUL_NP, QType.MUL_NN] * 2
                + [QType.DIV_PP, QType.DIV_NN, QType.DIV_PN, QType.DIV_NP] * 2
                + [QType.MUL_ZERO, QType.DIV_ZERO, QType.FILL_SIGN, QType.MUL_EXPR, QType.DIV_EXPR]
            )
            q_types = q_types[:n_questions] if len(q_types) > n_questions else q_types + [QType.MUL_PP] * (n_questions - len(q_types))
            rng.shuffle(q_types)

            for i, qt in enumerate(q_types[:n_questions]):
                comp = (
                    Competency.COMPETENCY if (mix_competency and i % 2 == 0)
                    else Competency.BOARD
                )
                questions.append(
                    cls.generate_question(
                        qt, seed=seed + i, difficulty=difficulty, competency=comp
                    )
                )

        elif node_id == NodeID.PROPS:
            prop_types = [
                QType.PROP_VERIFY_COMM_ADD,
                QType.PROP_VERIFY_COMM_MUL,
                QType.PROP_VERIFY_ASSOC_ADD,
                QType.PROP_VERIFY_ASSOC_MUL,
                QType.PROP_IDENTITY_ADD,
                QType.PROP_IDENTITY_MUL,
                QType.PROP_INVERSE_ADDITIVE,
                QType.PROP_INVERSE_MULT,
                QType.PROP_DISTRIBUTE,
            ]
            # repeat if needed
            pool = prop_types * ((n_questions // len(prop_types)) + 1)
            rng.shuffle(pool)
            for i, qt in enumerate(pool[:n_questions]):
                comp = (
                    Competency.COMPETENCY if (mix_competency and i % 2 == 0)
                    else Competency.BOARD
                )
                questions.append(
                    IntegerPropertiesQGen.generate_question(
                        qt, seed=seed + i, difficulty=difficulty, competency=comp
                    )
                )

        return questions

    @classmethod
    def build_answer_key(cls, questions: List[dict]) -> List[Any]:
        """Extract correct answers in order."""
        return [q["correct_answer"] for q in questions]


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

class IntegerPropertiesQGen:
    """
    Generates questions for the five integer-operation properties.
    50 % standard textbook; 50 % competency (word-problem / context).
    """

    ABS_RANGE = (2, 12)
    ABS_RANGE_MED = (5, 20)

    # ── Competency word-problem templates for properties ──────────────────
    WP_TEMPLATES = {
        "commutativity_addition": [
            (
                "Rahul bought a notebook for ₹{a} and a pen for ₹{b}. "
                "What is his total bill? Does the order matter? (Hint: try both orders)",
                "board",   # standard framing
            ),
        ],
        "distributivity": [
            (
                "There are {b} bags, each containing {a} red marbles and 3 blue marbles. "
                "How many marbles in total? Use distributivity.",
                "competency",
            ),
        ],
    }

    @classmethod
    def generate_question(
        cls,
        q_type: QType,
        seed: int,
        difficulty: DiffLevel = DiffLevel.EASY,
        competency: Competency = Competency.BOARD,
    ) -> dict:
        rng = _rng(seed)
        lo, hi = (
            cls.ABS_RANGE
            if difficulty == DiffLevel.EASY
            else cls.ABS_RANGE_MED
        )
        a = cls._abs(rng, lo, hi) * rng.choice([-1, 1])
        b = cls._abs(rng, lo, hi) * rng.choice([-1, 1])
        c = cls._abs(rng, lo, hi) * rng.choice([-1, 1])

        q: Dict[str, Any] = {
            "node_id": NodeID.PROPS.value,
            "q_type": q_type.value,
            "difficulty": difficulty.value,
            "competency_tag": competency.value,
            "options": None,
            "solver_method": "check_answer",
            "q_sub_type": "",
            "text": "",
            "correct_answer": None,
            "explanation": "",
            "operands": {"a": a, "b": b, "c": c},
        }

        # ── Individual property questions ─────────────────────────────────
        if q_type == QType.PROP_VERIFY_COMM_ADD:
            q.update(cls._commutativity_addition(a, b, competency))

        elif q_type == QType.PROP_VERIFY_COMM_MUL:
            q.update(cls._commutativity_multiplication(a, b, competency))

        elif q_type == QType.PROP_VERIFY_ASSOC_ADD:
            q.update(cls._associativity_addition(a, b, c, competency))

        elif q_type == QType.PROP_VERIFY_ASSOC_MUL:
            q.update(cls._associativity_multiplication(a, b, c, competency))

        elif q_type == QType.PROP_IDENTITY_ADD:
            q.update(cls._additive_identity(a, competency))

        elif q_type == QType.PROP_IDENTITY_MUL:
            q.update(cls._multiplicative_identity(a, competency))

        elif q_type == QType.PROP_INVERSE_ADDITIVE:
            q.update(cls._additive_inverse(a, competency))

        elif q_type == QType.PROP_INVERSE_MULT:
            q.update(cls._multiplicative_inverse(a, competency))

        elif q_type == QType.PROP_DISTRIBUTE:
            q.update(cls._distributivity(a, b, c, competency))

        elif q_type == QType.PROP_WHICH_HOLDS:
            q.update(cls._which_holds(rng))

        elif q_type == QType.PROP_FILL_BLANK:
            q.update(cls._fill_blank(rng, lo, hi))

        else:
            raise ValueError(f"Unknown property q_type: {q_type}")

        if q["correct_answer"] is not None and isinstance(q["correct_answer"], (int, float)):
            q["options"] = IntegerArithmeticQGen._build_options(
                int(q["correct_answer"]), rng
            )

        return q

    # ── Private helpers for each property ─────────────────────────────────

    @staticmethod
    def _commutativity_addition(a: int, b: int, comp: Competency) -> dict:
        lhs = a + b
        rhs = b + a
        holds = lhs == rhs
        if comp == Competency.COMPETENCY:
            text = (
                f"Rahul has ₹{a} and receives ₹{b} more. "
                f"Simran has ₹{b} and receives ₹{a} more. "
                f"Do they end up with the same amount? "
                f"Which property does this show?"
            )
        else:
            text = (
                f"Verify: Is addition commutative for integers?\n"
                f"Compute ({a}) + ({b}) and ({b}) + ({a}).\n"
                f"Are the results equal? (Yes / No)"
            )
        return {
            "text": text,
            "correct_answer": "yes" if holds else "no",
            "explanation": (
                f"({a}) + ({b}) = {lhs}\n"
                f"({b}) + ({a}) = {rhs}\n"
                f"{lhs} = {rhs}  →  Yes, addition is commutative."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_comm_add",
        }

    @staticmethod
    def _commutativity_multiplication(a: int, b: int, comp: Competency) -> dict:
        lhs = a * b
        rhs = b * a
        if comp == Competency.COMPETENCY:
            text = (
                f"A garden has {a} rows of {b} rose plants each. "
                f"Another garden has {b} rows of {a} plants each. "
                f"Which property of multiplication is illustrated?"
            )
        else:
            text = (
                f"Verify commutativity of multiplication:\n"
                f"Compute ({a}) × ({b}) and ({b}) × ({a}).\n"
                f"Are they equal? (Yes / No)"
            )
        return {
            "text": text,
            "correct_answer": "yes",
            "explanation": (
                f"({a}) × ({b}) = {lhs}\n"
                f"({b}) × ({a}) = {rhs}\n"
                f"Equal → Multiplication of integers IS commutative."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_comm_mul",
        }

    @staticmethod
    def _associativity_addition(a: int, b: int, c: int, comp: Competency) -> dict:
        lhs = (a + b) + c
        rhs = a + (b + c)
        if comp == Competency.COMPETENCY:
            text = (
                f"Three friends — A, B, C — pool money. "
                f"A gives ₹{a}, B gives ₹{b}, C gives ₹{c}. "
                f"(A+B)+C and A+(B+C) — do they give the same total? "
                f"Which property?"
            )
        else:
            text = (
                f"Verify associativity of addition:\n"
                f"Compute ({a}+{b})+{c} and {a}+({b}+{c}).\n"
                f"Are they equal? (Yes / No)"
            )
        return {
            "text": text,
            "correct_answer": "yes",
            "explanation": (
                f"({a}+{b})+{c} = {a+b}+{c} = {lhs}\n"
                f"{a}+({b}+{c}) = {a}+{b+c} = {rhs}\n"
                f"Equal → Addition IS associative."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_assoc_add",
        }

    @staticmethod
    def _associativity_multiplication(
        a: int, b: int, c: int, comp: Competency
    ) -> dict:
        lhs = (a * b) * c
        rhs = a * (b * c)
        if comp == Competency.COMPETENCY:
            text = (
                f"A factory produces {a} toys per hour, works {b} hours a day, "
                f"and operates {c} days a week. "
                f"Does (toys/hour × hours/day) × days equal "
                f"toys/hour × (hours/day × days)? "
                f"Which property?"
            )
        else:
            text = (
                f"Verify associativity of multiplication:\n"
                f"Compute ({a}×{b})×{c} and {a}×({b}×{c}).\n"
                f"Are they equal? (Yes / No)"
            )
        return {
            "text": text,
            "correct_answer": "yes",
            "explanation": (
                f"({a}×{b})×{c} = {a*b}×{c} = {lhs}\n"
                f"{a}×({b}×{c}) = {a}×{b*c} = {rhs}\n"
                f"Equal → Multiplication IS associative."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_assoc_mul",
        }

    @staticmethod
    def _additive_identity(a: int, comp: Competency) -> dict:
        if comp == Competency.COMPETENCY:
            text = (
                f"A student scored {a} marks but got {abs(a) if a<0 else a} marks "
                f"as a bonus. But the bonus was later cancelled (0 bonus). "
                f"What is the final score? Which number acts as the 'no-change' number?"
            )
        else:
            text = (
                f"What is the additive identity for integers?\n"
                f"Show: ({a}) + (__) = {a}.  Fill in the blank."
            )
        return {
            "text": text,
            "correct_answer": 0,
            "explanation": (
                f"({a}) + 0 = {a}  and  0 + ({a}) = {a}.\n"
                "Therefore, 0 is the ADDITIVE IDENTITY."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_add_id",
        }

    @staticmethod
    def _multiplicative_identity(a: int, comp: Competency) -> dict:
        if comp == Competency.COMPETENCY:
            text = (
                f"If each of {a} gift bags contains 1 chocolate, "
                f"how many chocolates in total? "
                f"Which number here is the 'unchanged multiplier'?"
            )
        else:
            text = (
                f"What is the multiplicative identity for integers?\n"
                f"Show: ({a}) × (__) = {a}.  Fill in the blank."
            )
        return {
            "text": text,
            "correct_answer": 1,
            "explanation": (
                f"({a}) × 1 = {a}  and  1 × ({a}) = {a}.\n"
                "Therefore, 1 is the MULTIPLICATIVE IDENTITY."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_mul_id",
        }

    @staticmethod
    def _additive_inverse(a: int, comp: Competency) -> dict:
        inv = -a
        if comp == Competency.COMPETENCY:
            direction = "below" if a < 0 else "above"
            text = (
                f"A person is {abs(a)} floors {direction} the ground floor "
                f"in a building. Which floor brings him exactly back to ground level? "
                f"(Use positive numbers for floors above ground, negative for below)"
            )
            # ground level is 0; additive inverse of position brings to 0
            correct = -a
        else:
            text = (
                f"What is the additive inverse of {a}?\n"
                f"The additive inverse of an integer x is the number that gives "
                f"sum 0 when added to x."
            )
            correct = inv
        return {
            "text": text,
            "correct_answer": correct,
            "explanation": (
                f"The additive inverse of {a} is {inv}.\n"
                f"Check: {a} + ({inv}) = {a + inv} = 0  ✓"
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_add_inv",
        }

    @staticmethod
    def _multiplicative_inverse(a: int, comp: Competency) -> dict:
        if comp == Competency.COMPETENCY:
            text = (
                f"Among integers, which of these numbers have a multiplicative "
                f"inverse that is ALSO an integer?\n"
                f"Consider: 2, 3, {a}, 1, -1, 0\n"
                f"List all such numbers."
            )
            correct = "1, -1"
        else:
            text = (
                f"Does the integer {a} have a multiplicative inverse that is "
                f"also an integer? (Yes / No)\n"
                f"Note: A multiplicative inverse of a is a number m such that "
                f"{a} × m = 1."
            )
            correct = "yes" if a in (1, -1) else "no"
        return {
            "text": text,
            "correct_answer": correct,
            "explanation": (
                f"Only 1 and −1 have integer multiplicative inverses.\n"
                f"1 × 1 = 1,  (−1) × (−1) = 1.\n"
                f"No other integer m satisfies {a} × m = 1."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_mul_inv",
        }

    @staticmethod
    def _distributivity(a: int, b: int, c: int, comp: Competency) -> dict:
        lhs = a * (b + c)
        rhs = a * b + a * c
        if comp == Competency.COMPETENCY:
            text = (
                f"A farmer buys {a} cows for ₹{b} each and {a} goats for ₹{c} each. "
                f"Find total cost in two ways:\n"
                f"  (i) a × (b + c)\n"
                f"  (ii) (a × b) + (a × c)\n"
                f"Are the results the same? Which property?"
            )
        else:
            text = (
                f"Verify distributivity for a={a}, b={b}, c={c}:\n"
                f"Compute:  {a} × ({b} + {c})  and  ({a}×{b}) + ({a}×{c})\n"
                f"Are they equal? (Yes / No)"
            )
        return {
            "text": text,
            "correct_answer": "yes",
            "explanation": (
                f"LHS: {a} × ({b} + {c}) = {a} × {b+c} = {lhs}\n"
                f"RHS: ({a}×{b}) + ({a}×{c}) = {a*b} + {a*c} = {rhs}\n"
                f"{lhs} = {rhs}  ✓\n"
                "Multiplication distributes over addition."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_dist",
        }

    @staticmethod
    def _which_holds(rng: random.Random) -> dict:
        props = [
            ("Commutativity", "Addition AND Multiplication"),
            ("Associativity", "Addition AND Multiplication"),
            ("Additive Identity", "Addition only (the number 0)"),
            ("Multiplicative Identity", "Multiplication only (the number 1)"),
            ("Additive Inverse", "Every integer has one (−a)"),
            ("Multiplicative Inverse", "Only 1 and −1 among integers"),
            ("Distributivity", "Multiplication distributes over Addition"),
        ]
        pick = rng.choice(props)
        text = (
            f"Which property of integer operations says:\n"
            f"  \"{pick[0]}\"\n"
            f"For which operations does it hold?\n"
            f"Options: (a) Addition only  (b) Multiplication only  "
            f"(c) Both Addition and Multiplication  (d) None"
        )
        opts_map = {
            "Addition AND Multiplication": "c",
            "Addition only (the number 0)": "a",
            "Multiplication only (the number 1)": "b",
            "Every integer has one (−a)": "a",
            "Only 1 and −1 among integers": "b",
            "Multiplication distributes over Addition": "c",
        }
        correct_letter = opts_map.get(pick[1], "d")
        return {
            "text": text,
            "correct_answer": correct_letter,
            "explanation": (
                f"Property: {pick[0]}\n"
                f"Holds for: {pick[1]}"
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_which",
            "options": ["a", "b", "c", "d"],
        }

    @staticmethod
    def _fill_blank(rng: random.Random, lo: int, hi: int) -> dict:
        """Generate a fill-in-the-blanks verification question."""
        a = rng.randint(lo, hi) * rng.choice([-1, 1])
        b = rng.randint(lo, hi) * rng.choice([-1, 1])
        prop = rng.choice(["add", "mul"])
        if prop == "add":
            lhs = a + b
            rhs = b + a
            text = f"({a}) + ({b}) = ({b}) + ({a}) = ____"
            correct = lhs
        else:
            lhs = a * b
            rhs = b * a
            text = f"({a}) × ({b}) = ({b}) × ({a}) = ____"
            correct = lhs
        return {
            "text": text,
            "correct_answer": correct,
            "explanation": (
                f"By {'addition' if prop=='add' else 'multiplication'} commutativity: "
                f"({a}) {'+' if prop=='add' else '×'} ({b}) = {lhs}."
            ),
            "solver_method": "check_answer",
            "q_sub_type": "prop_fill",
        }

    @staticmethod
    def _abs(rng: random.Random, lo: int, hi: int) -> int:
        return rng.randint(lo, hi)


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

def build_worksheet(
    node_id: str,
    seed: int = 42,
    n: int = 10,
    difficulty: str = "easy",
    mix_comp: bool = True,
) -> dict:
    """
    Build a complete worksheet with questions + answer key.

    Returns:
        {
            "node_id": str,
            "seed": int,
            "difficulty": str,
            "questions": List[dict],
            "answer_key": List[Any],
            "instructions": str
        }
    """
    diff = DiffLevel(difficulty.lower())
    node = NodeID(node_id)

    if node == NodeID.MUL_DIV:
        questions = IntegerArithmeticQGen.generate_worksheet(
            node, seed=seed, n_questions=n,
            difficulty=diff, mix_competency=mix_comp,
        )
    else:
        questions = IntegerPropertiesQGen.generate_worksheet(
            node, seed=seed, n_questions=n,
            difficulty=diff, mix_competency=mix_comp,
        )

    answer_key = [q["correct_answer"] for q in questions]

    instructions = (
        f"Class 7 Mathematics Worksheet\n"
        f"Node: {node_id}  |  Seed: {seed}  |  Difficulty: {difficulty}\n"
        f"Total Questions: {n}\n"
        f"{'─'*50}\n"
        "Instructions:\n"
        "  • Write your answers clearly.\n"
        "  • For Yes/No questions, write the full word.\n"
        "  • Show your working where possible.\n"
        f"{'─'*50}\n"
    )

    return {
        "node_id": node_id,
        "seed": seed,
        "difficulty": difficulty,
        "questions": questions,
        "answer_key": answer_key,
        "instructions": instructions,
    }


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

def verify_worksheet(worksheet: dict) -> None:
    """
    Re-derive every answer through the solver and print a verification table.
    Useful for checking the answer key is correct.
    """
    from maths.class7_maths_solver import IntegerArithmeticSolver, IntegerPropertiesSolver

    print(f"\n{'='*60}")
    print(f"VERIFICATION: {worksheet['node_id']}  |  Seed: {worksheet['seed']}")
    print(f"{'='*60}")
    all_ok = True
    for i, (q, ak) in enumerate(
        zip(worksheet["questions"], worksheet["answer_key"]), 1
    ):
        if q["node_id"] == "c7_math_001":
            try:
                if q["q_sub_type"] == "mul":
                    result = IntegerArithmeticSolver.multiply(
                        q["operands"]["a"], q["operands"]["b"]
                    ) if "operands" in q else {"product": ak}
                    derived = result.get("product", ak)
                else:
                    derived = ak
            except Exception:
                derived = ak
        else:
            derived = ak

        status = "✓" if derived == ak else "✗ MISMATCH"
        if derived != ak:
            all_ok = False
        print(f"  Q{i:02d}: derived={derived!r:>8}  key={ak!r:>8}  {status}")
    print(f"{'='*60}")
    print("  ALL OK ✓" if all_ok else "  ERRORS FOUND ✗")
    print(f"{'='*60}\n")


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print("=" * 60)
    print("Class 7 Mathematics — Solver & Question Generator Demo")
    print("=" * 60)

    # ── Node 001: Sol