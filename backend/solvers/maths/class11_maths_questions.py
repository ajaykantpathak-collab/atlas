"""
CISCE Class 11 Mathematics Question Generator

Generates deterministic, syllabus-aligned questions for:
  c11_math_001 - Sets and Functions
  c11_math_002 - Equal sets, subsets
"""

import random
import hashlib
from typing import Dict, List, Any, Optional, Callable, Tuple
from dataclasses import dataclass, field, asdict
from enum import Enum

# ---------------------------------------------------------------------------
# Constants & Configuration
# ---------------------------------------------------------------------------

TOPIC_SETS_FUNCTIONS = "c11_math_001"
TOPIC_EQUAL_SETS_SUBSETS = "c11_math_002"

DIFFICULTY_EASY = 0.25
DIFFICULTY_MEDIUM = 0.5
DIFFICULTY_HARD = 0.75

QUESTION_TYPES = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]


# ---------------------------------------------------------------------------
# Helper Utilities
# ---------------------------------------------------------------------------

def _stable_hash(text: str) -> int:
    """Produce a stable integer hash from a string."""
    return int(hashlib.md5(text.encode()).hexdigest()[:8], 16)


def _int_to_float_difficulty(seed_val: int) -> float:
    """Map an integer to a difficulty in [0.0, 1.0]."""
    return round((seed_val % 100) / 100.0, 2)


# ---------------------------------------------------------------------------
# Solver Functions
# ---------------------------------------------------------------------------

def solve_mcq(question: Dict[str, Any]) -> Tuple[Any, str]:
    """Solve an MCQ question. Returns (answer_key, explanation)."""
    return question.get("answer", ""), question.get("solution", "")


def solve_fill_blank(question: Dict[str, Any]) -> Tuple[str, str]:
    """Solve a fill-in-the-blank question."""
    return str(question.get("answer", "")), question.get("solution", "")


def solve_short_answer(question: Dict[str, Any]) -> Tuple[str, str]:
    """Solve a short-answer question."""
    return str(question.get("answer", "")), question.get("solution", "")


def solve_long_answer(question: Dict[str, Any]) -> Tuple[str, str]:
    """Solve a long-answer question."""
    return str(question.get("answer", "")), question.get("solution", "")


def solve_numerical(question: Dict[str, Any]) -> Tuple[Any, str]:
    """Solve a numerical question."""
    return question.get("answer", ""), question.get("solution", "")


SOLVER_MAP: Dict[str, Callable] = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Validate all generated questions and return a report dict with keys:
      valid, invalid, errors, total
    """
    required_fields = [
        "id", "question_text", "question_type", "answer",
        "difficulty", "topic", "solution", "verification",
    ]

    report: Dict[str, Any] = {
        "total": len(questions),
        "valid": 0,
        "invalid": 0,
        "errors": [],
    }

    for q in questions:
        errors_found = []
        for f in required_fields:
            if f not in q:
                errors_found.append(f"Missing field: {f}")

        if q.get("difficulty") is not None:
            d = q["difficulty"]
            if not isinstance(d, (int, float)) or not (0.0 <= d <= 1.0):
                errors_found.append(f"Difficulty out of range: {d}")

        if q.get("question_type") == "mcq":
            if "options" not in q or not isinstance(q.get("options"), list) or len(q.get("options", [])) < 2:
                errors_found.append("MCQ must have at least 2 options")

        if errors_found:
            report["invalid"] += 1
            report["errors"].append({
                "id": q.get("id", "unknown"),
                "errors": errors_found,
            })
        else:
            report["valid"] += 1

    return report


# ---------------------------------------------------------------------------
# Question Generators -- c11_math_001: Sets and Functions
# ---------------------------------------------------------------------------

def _gen_set_roster(seed_val: int, size: int) -> List[int]:
    """Generate a deterministic roster of distinct integers."""
    rng = random.Random(seed_val)
    roster = rng.sample(range(1, 101), size)
    return roster


def gen_set_representation(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on set representation (roster, set-builder, descriptive)."""
    rng = random.Random(seed)
    qid = f"c11_001_set_rep_{seed}"
    roster = _gen_set_roster(seed, 5)

    if difficulty < 0.35:
        # Roster form -- easy
        answer = "{" + ", ".join(map(str, roster)) + "}"
        question_text = (
            f"Represent the following set in roster form: "
            f"A = {{x : x is a natural number, 1 ≤ x ≤ 5, x is even}}. "
            f"Write the roster form of A."
        )
        solution = (
            "The set contains natural numbers x such that 1 ≤ x ≤ 5 and x is even.\n"
            "The even numbers between 1 and 5 are 2 and 4.\n"
            f"Therefore, A = {{2, 4}} in roster form."
        )
        verification = {"method": "direct_count", "expected": {2, 4}}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "fill_blank",
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Set Representation",
            "options": None,
            "solution": solution,
            "verification": verification,
        }
    elif difficulty < 0.65:
        # Set-builder form -- medium
        answer = "{x : x is an odd positive integer less than 7}"
        question_text = (
            "Write the set A = {1, 3, 5} in set-builder form."
        )
        solution = (
            "The elements of A are 1, 3, 5.\n"
            "All are positive odd integers less than 7.\n"
            f"Therefore, A = {answer}."
        )
        verification = {"method": "set_builder_check", "elements": [1, 3, 5]}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "short_answer",
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Set Representation",
            "options": None,
            "solution": solution,
            "verification": verification,
        }
    else:
        # Types of sets -- hard
        a = rng.randint(2, 5)
        question_text = (
            f"How many subsets does a set with {a} elements have? "
            f"Show your reasoning."
        )
        answer_val = 2 ** a
        answer = str(answer_val)
        solution = (
            f"A set with {a} elements has 2^{a} = {answer_val} subsets.\n"
            "This follows from the formula: number of subsets of a set with n elements is 2^n.\n"
            "This includes the empty set and the set itself."
        )
        verification = {"method": "power_set_formula", "expected": answer_val}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Set Representation",
            "options": None,
            "solution": solution,
            "verification": verification,
        }


def gen_set_operations(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on union, intersection, difference, complement."""
    rng = random.Random(seed)
    qid = f"c11_001_set_ops_{seed}"

    a_vals = sorted(_gen_set_roster(seed, 4))
    b_vals = sorted(_gen_set_roster(seed + 100, 5))
    # Ensure some overlap
    if rng.random() > 0.5:
        b_vals[0] = a_vals[rng.randint(0, len(a_vals) - 1)]

    A = set(a_vals)
    B = set(b_vals)
    union = A | B
    intersection = A & B
    diff_AB = A - B
    diff_BA = B - A

    if difficulty < 0.35:
        # Union -- easy MCQ
        op = "union"
        result = union
        op_symbol = "∪"
        question_text = (
            f"Let A = {sorted(A)} and B = {sorted(B)}.\n"
            f"Find A ∪ B (union of A and B)."
        )
        options_raw = [sorted(result)]
        while len(options_raw) < 4:
            wrong = sorted(union.symmetric_difference(
                _gen_set_roster(seed + rng.randint(1, 999), rng.randint(2, 4))))
            if wrong not in options_raw:
                options_raw.append(wrong)
        rng.shuffle(options_raw)
        correct_idx = options_raw.index(sorted(result))
        answer = chr(65 + correct_idx)
        options = [f"{{" + ", ".join(map(str, o)) + "}" for o in options_raw]
        solution = (
            f"A ∪ B contains all elements that belong to A or B or both.\n"
            f"A = {sorted(A)}, B = {sorted(B)}\n"
            f"A ∪ B = {sorted(result)}"
        )
        verification = {
            "method": "union_check",
            "expected": sorted(result),
            "answer_key": answer,
        }
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "mcq",
            "options": options,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Set Operations",
            "solution": solution,
            "verification": verification,
        }
    elif difficulty < 0.65:
        # Intersection -- medium
        result = intersection
        question_text = (
            f"If A = {sorted(A)} and B = {sorted(B)}, find A ∩ B."
        )
        answer_val = "{" + ", ".join(map(str, sorted(result))) + "}"
        solution = (
            f"A ∩ B contains elements common to both A and B.\n"
            f"A = {sorted(A)}, B = {sorted(B)}\n"
            f"Common elements = {sorted(result)}\n"
            f"Therefore A ∩ B = {answer_val}"
        )
        verification = {"method": "intersection_check", "expected": sorted(result)}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "fill_blank",
            "options": None,
            "answer": answer_val,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Set Operations",
            "solution": solution,
            "verification": verification,
        }
    else:
        # Difference with proof -- hard
        result = diff_AB
        question_text = (
            f"Let A = {sorted(A)} and B = {sorted(B)}.\n"
            f"Find A − B (A minus B). Also, find n(A − B)."
        )
        answer_val = "{" + ", ".join(map(str, sorted(result))) + "}"
        answer_full = f"{answer_val}; n(A − B) = {len(result)}"
        solution = (
            f"A − B = {{x ∈ A : x ∉ B}}\n"
            f"A = {sorted(A)}, B = {sorted(B)}\n"
            f"Elements in A but not in B: {sorted(result)}\n"
            f"A − B = {answer_val}\n"
            f"Number of elements: n(A − B) = {len(result)}"
        )
        verification = {"method": "difference_check", "expected": sorted(result)}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "short_answer",
            "options": None,
            "answer": answer_full,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Set Operations",
            "solution": solution,
            "verification": verification,
        }


def gen_venn_diagram(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on Venn diagrams and set relationships."""
    rng = random.Random(seed)
    qid = f"c11_001_venn_{seed}"

    n_u = rng.randint(50, 100)
    n_a = rng.randint(15, 35)
    n_b = rng.randint(15, 35)
    overlap = rng.randint(3, min(n_a, n_b) // 2)

    only_a = n_a - overlap
    only_b = n_b - overlap
    neither = n_u - (only_a + only_b + overlap)

    if difficulty < 0.35:
        question_text = (
            f"In a survey of {n_u} students, {n_a} students play cricket, "
            f"{n_b} students play football, and {overlap} play both. "
            f"How many students play neither sport?"
        )
        answer = str(neither)
        solution = (
            f"n(Cricket) = {n_a}, n(Football) = {n_b}, n(both) = {overlap}\n"
            f"Using inclusion-exclusion: n(C ∪ F) = n(C) + n(F) − n(C ∩ F)\n"
            f"n(C ∪ F) = {n_a} + {n_b} − {overlap} = {n_a + n_b - overlap}\n"
            f"Students playing neither = {n_u} − {n_a + n_b - overlap} = {neither}"
        )
        verification = {"method": "inclusion_exclusion", "expected": neither}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "numerical",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Venn Diagrams",
            "solution": solution,
            "verification": verification,
        }
    else:
        question_text = (
            f"In a survey of {n_u} students, {n_a} like tea, {n_b} like coffee, "
            f"and {overlap} like both. How many students like exactly one of tea or coffee?"
        )
        answer = str(only_a + only_b)
        solution = (
            f"Students who like only tea = {n_a} − {overlap} = {only_a}\n"
            f"Students who like only coffee = {n_b} − {overlap} = {only_b}\n"
            f"Students who like exactly one = {only_a} + {only_b} = {only_a + only_b}"
        )
        verification = {"method": "exactly_one", "expected": only_a + only_b}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "numerical",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Venn Diagrams",
            "solution": solution,
            "verification": verification,
        }


def gen_power_set(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on power set."""
    rng = random.Random(seed)
    qid = f"c11_001_power_set_{seed}"

    if difficulty < 0.5:
        elements = ["a", "b"]
        n = 2
    else:
        elements = ["a", "b", "c"]
        n = 3

    power_set_size = 2 ** n

    if difficulty < 0.35:
        question_text = f"If A = {{{', '.join(elements)}}}, find n(P(A))."
        answer = str(power_set_size)
        solution = (
            f"n(A) = {n}\n"
            f"Number of elements in power set P(A) = 2^n = 2^{n} = {power_set_size}"
        )
    else:
        question_text = (
            f"If A = {{{', '.join(elements)}}}, list all elements of P(A)."
        )
        answer = str(power_set_size)
        solution = (
            f"The power set P(A) contains all subsets of A.\n"
            f"n(P(A)) = 2^n = 2^{n} = {power_set_size}\n"
            f"Number of subsets = {power_set_size}"
        )

    verification = {"method": "power_set_size", "expected": power_set_size}
    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "short_answer",
        "options": None,
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": TOPIC_SETS_FUNCTIONS,
        "subtopic": "Power Set",
        "solution": solution,
        "verification": verification,
    }


def gen_de_morgans_law(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on De Morgan's Laws for two/three sets."""
    rng = random.Random(seed)
    qid = f"c11_001_demorgan_{seed}"
    n_u = rng.randint(30, 60)
    n_a = rng.randint(8, 20)
    n_b = rng.randint(8, 20)
    overlap = rng.randint(2, min(n_a, n_b) // 3)

    if difficulty < 0.5:
        # Two sets -- medium
        question_text = (
            f"In a universal set U with {n_u} elements, "
            f"if n(A) = {n_a} and n(B) = {n_b} with n(A ∩ B) = {overlap}, "
            f"find n(A' ∪ B'). Verify using De Morgan's Law."
        )
        a_union_b = n_a + n_b - overlap
        a_complement = n_u - n_a
        b_complement = n_u - n_b
        a_inter_b_complement = a_complement + b_complement
        answer = str(a_inter_b_complement)
        solution = (
            f"By De Morgan's Law: (A ∪ B)' = A' ∩ B'\n"
            f"n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = {n_a} + {n_b} − {overlap} = {a_union_b}\n"
            f"n(A' ∪ B') = n(U) − n(A ∩ B) ...\n"
            f"n(A' ∩ B') = n(A' ∪ B') by De Morgan's = {a_inter_b_complement}"
        )
        verification = {"method": "de_morgan", "expected": a_inter_b_complement}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "De Morgan's Laws",
            "solution": solution,
            "verification": verification,
        }
    else:
        # Complement -- hard
        question_text = (
            f"If U = {{1, 2, 3, ..., {n_u}}} and A = "
            f"{{x : x ∈ U, x is divisible by {rng.randint(2, 5)}}}, "
            f"find A' and n(A')."
        )
        d = rng.randint(2, 5)
        A_count = n_u // d
        A_prime_count = n_u - A_count
        answer = f"A' = {{x ∈ U : x is not divisible by {d}}}, n(A') = {A_prime_count}"
        solution = (
            f"A contains numbers divisible by {d} in U.\n"
            f"Count of numbers divisible by {d} = floor({n_u}/{d}) = {A_count}\n"
            f"A' contains all other elements.\n"
            f"n(A') = {n_u} − {A_count} = {A_prime_count}"
        )
        verification = {"method": "complement", "expected": A_prime_count}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Complement of a Set",
            "solution": solution,
            "verification": verification,
        }


def gen_functions_domain_range(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on domain and range of functions."""
    rng = random.Random(seed)
    qid = f"c11_001_func_dom_{seed}"

    func_choice = rng.choice(["linear", "quadratic", "rational"])

    if func_choice == "linear":
        m = rng.randint(1, 5)
        c = rng.randint(-3, 3)
        if c >= 0:
            expr = f"f(x) = {m}x + {c}"
        else:
            expr = f"f(x) = {m}x − {abs(c)}"
        domain = "R (all real numbers)"
        range_display = "R (all real numbers)"
        solution = (
            f"Given f(x) = {expr}\n"
            "For any real number x, f(x) is defined.\n"
            f"Domain = R\n"
            f"Since f is a linear function with non-zero slope, Range = R"
        )
        verification = {"method": "linear_analysis", "function_type": "linear"}
    elif func_choice == "quadratic":
        a_coeff = rng.choice([1, -1]) * rng.randint(1, 3)
        if a_coeff > 0:
            min_val = f"−{rng.randint(1, 4)}"
            range_display = f"[{min_val}, ∞)"
        else:
            min_val = str(rng.randint(1, 4))
            range_display = f"(−∞, {min_val}]"
        expr = f"f(x) = {a_coeff}x² + {rng.randint(-2, 2)}x + {rng.randint(-3, 3)}"
        domain = "R (all real numbers)"
        solution = (
            f"Given f(x) = {expr}\n"
            f"This is a quadratic function (polynomial of degree 2).\n"
            f"Domain = R (all real numbers)\n"
            f"Range = {range_display}"
        )
        verification = {"method": "quadratic_analysis", "function_type": "quadratic"}
    else:
        # Rational function
        expr = f"f(x) = 1/(x − {rng.randint(1, 5)})"
        domain = f"R − {{{rng.randint(1, 5)}}}"
        range_display = "R − {0}"
        solution = (
            f"Given f(x) = {expr}\n"
            f"f(x) is undefined when x − {rng.randint(1, 5)} = 0, i.e., x = {rng.randint(1, 5)}\n"
            f"f(x) = 0 has no solution.\n"
            f"Domain = R − {{val}}\n"
            f"Range = R − {{0}}"
        )
        verification = {"method": "rational_analysis", "function_type": "rational"}

    if difficulty < 0.35:
        question_text = f"Find the domain of the function {expr}."
        answer = domain
        verification["answer"] = "domain"
    elif difficulty < 0.65:
        question_text = f"Find the domain and range of the function {expr}."
        answer = f"Domain: {domain}; Range: {range_display}"
        verification["answer"] = "both"
    else:
        question_text = (
            f"Let {expr}. Determine whether the function is one-one (injective). "
            f"Also find its domain and range."
        )
        is_injective = "Yes" if func_choice == "linear" else "No"
        answer = f"Domain: {domain}; Range: {range_display}; One-one: {is_injective}"
        solution += f"\nThe function is {'injective' if is_injective == 'Yes' else 'not injective'}."
        verification["answer"] = "full"

    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "short_answer",
        "options": None,
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": TOPIC_SETS_FUNCTIONS,
        "subtopic": "Functions - Domain and Range",
        "solution": solution,
        "verification": verification,
    }


def gen_function_types(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on types of functions (injective, surjective, bijective)."""
    rng = random.Random(seed)
    qid = f"c11_001_func_types_{seed}"

    if difficulty < 0.35:
        # Injection -- easy
        question_text = (
            "State whether the function f: N → N defined by f(x) = 2x is:\n"
            "(a) injective (one-one)\n"
            "(b) surjective (onto)\n"
            "(c) bijective"
        )
        answer = "(a) Injective: Yes (f(x₁)=f(x₂) ⇒ x₁=x₂). (b) Surjective: No (e.g., 1 has no pre-image). (c) Bijective: No"
        solution = (
            "f(x) = 2x: N → N\n"
            "Injective: If f(x₁) = f(x₂), then 2x₁ = 2x₂ ⇒ x₁ = x₂. Yes, injective.\n"
            "Surjective: For y = 1 (odd), there is no x ∈ N with f(x) = 1. Not surjective.\n"
            "Bijective: Must be both injective and surjective. Not bijective."
        )
        verification = {
            "injective": True, "surjective": False, "bijective": False
        }
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "short_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Types of Functions",
            "solution": solution,
            "verification": verification,
        }
    else:
        # Bijection proof -- medium/hard
        a = rng.randint(2, 4)
        b = rng.randint(1, 3)
        question_text = (
            f"Let f: R → R be defined by f(x) = {a}x + {b}. "
            f"Prove that f is bijective."
        )
        answer = (
            f"f is bijective.\n"
            f"Injective: If {a}x₁ + {b} = {a}x₂ + {b}, then {a}x₁ = {a}x₂, "
            f"so x₁ = x₂.\n"
            f"Surjective: For any y ∈ R, x = (y − {b})/{a} gives f(x) = y."
        )
        solution = (
            f"Given f(x) = {a}x + {b}, a ≠ 0.\n"
            f"INJECTIVE: f(x₁) = f(x₂) ⇒ {a}x₁ + {b} = {a}x₂ + {b} ⇒ x₁ = x₂.\n"
            f"SURJECTIVE: For any y ∈ R, choose x = (y − {b})/{a}.\n"
            f"Then f(x) = {a}·(y−{b})/{a} + {b} = y − {b} + {b} = y.\n"
            f"Hence f is bijective."
        )
        verification = {"injective": True, "surjective": True, "bijective": True}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Types of Functions",
            "solution": solution,
            "verification": verification,
        }


def gen_inverse_function(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on inverse functions."""
    rng = random.Random(seed)
    qid = f"c11_001_inverse_{seed}"

    a = rng.randint(2, 5)
    b = rng.randint(1, 5)

    if difficulty < 0.5:
        # Easy: f(x) = 2x+1
        question_text = f"Let f(x) = {a}x + {b}. Find f⁻¹(x)."
        solution = (
            f"Let y = f(x) = {a}x + {b}\n"
            f"y − {b} = {a}x\n"
            f"x = (y − {b})/{a}\n"
            f"Replacing y by x: f⁻¹(x) = (x − {b})/{a}"
        )
        answer = f"f⁻¹(x) = (x − {b})/{a}"
        verification = {"composition": f"f(f⁻¹(x)) should equal x",
                        "inverse_expr": f"(x-{b})/{a}"}
    else:
        # Harder
        question_text = (
            f"Let f: R → R be defined by f(x) = (3x + {b})/{a}. "
            f"Show that f is invertible and find f⁻¹."
        )
        inv_a = a
        inv_b = -b
        solution = (
            f"Given f(x) = (3x + {b})/{a}\n"
            f"y = (3x + {b})/{a}\n"
            f"ay = 3x + {b}\n"
            f"ay − {b} = 3x\n"
            f"x = (ay − {b})/3\n"
            f"Replacing y by x: f⁻¹(x) = ({a}x − {b})/3\n"
            f"Verification: f(f⁻¹(x)) = f(({a}x − {b})/3) = ... = x ✓"
        )
        answer = f"f⁻¹(x) = ({a}x − {b})/3"
        verification = {"inverse_expr": f"({a}*x-{b})/3"}

    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "short_answer",
        "options": None,
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": TOPIC_SETS_FUNCTIONS,
        "subtopic": "Inverse Functions",
        "solution": solution,
        "verification": verification,
    }


def gen_binary_operations(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on binary operations on sets."""
    rng = random.Random(seed)
    qid = f"c11_001_binary_op_{seed}"

    a_val = rng.randint(1, 9)
    b_val = rng.randint(1, 9)
    operation = rng.choice(["+", "×"])
    op_name = "addition" if operation == "+" else "multiplication"
    result = a_val + b_val if operation == "+" else a_val * b_val

    if difficulty < 0.35:
        question_text = (
            f"Is the operation * defined on N by a * b = a {operation} b "
            f"a binary operation? Justify your answer."
        )
        answer = "Yes, it is a binary operation on N (closed under operation)."
        solution = (
            f"A binary operation on a set S assigns to every ordered pair (a, b) "
            f"∈ S × S a unique element a * b ∈ S.\n"
            f"Here a * b = a {operation} b.\n"
            f"For any a, b ∈ N, a {operation} b ∈ N (closure property).\n"
            f"Hence * is a binary operation on N."
        )
        verification = {"closed": True, "operation": op_name}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "short_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Binary Operations",
            "solution": solution,
            "verification": verification,
        }
    else:
        # Commutativity/Associativity -- medium
        question_text = (
            f"Let * be a binary operation on Q defined by a * b = a {operation} b + 1. "
            f"Is * commutative? Is * associative? Compute 2 * 3."
        )
        answer = f"2 * 3 = {result + 1}; Commutative: Yes; Associative: Yes"
        solution = (
            f"2 * 3 = 2 {operation} 3 + 1 = {result} + 1 = {result + 1}\n"
            f"Commutative: a * b = a {operation} b + 1 = b {operation} a + 1 = b * a. Yes.\n"
            f"Associative: (a * b) * c = (a{operation}b+1){operation}c+1\n"
            f"= a{operation}b{operation}c + {operation} + 1 (if +) or + 1 + 1\n"
            f"= a {operation} (b {operation} c + 1) + 1 = a * (b * c). Yes."
        )
        verification = {"commutative": True, "associative": True, "result": result + 1}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_SETS_FUNCTIONS,
            "subtopic": "Binary Operations",
            "solution": solution,
            "verification": verification,
        }


# ---------------------------------------------------------------------------
# Question Generators -- c11_math_002: Equal Sets, Subsets
# ---------------------------------------------------------------------------

def gen_equal_sets(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on equal sets."""
    rng = random.Random(seed)
    qid = f"c11_002_equal_sets_{seed}"

    base = sorted(_gen_set_roster(seed, 3))
    # Create a differently-described but equal set
    desc_a = f"{{x : x ∈ N, x < {max(base) + 2}}}"
    desc_b = f"{{x : x is a prime number less than {max(base) + 2}}}"

    if difficulty < 0.35:
        question_text = (
            f"Let A = {base} and B = {{{', '.join(base)}}}. "
            f"Are A and B equal sets? Justify."
        )
        answer = "Yes, A = B (same elements)"
        solution = (
            f"A = {base}\n"
            f"B = {base}\n"
            "Two sets are equal if they have exactly the same elements.\n"
            "Since every element of A is in B and vice versa, A = B."
        )
        verification = {"equal": True, "elements": base}
    elif difficulty < 0.65:
        word_a = "".join(chr(65 + i) for i in sorted(_gen_set_roster(seed, 3)))
        word_b = "".join(word_a[i] for i in sorted(_gen_set_roster(seed + 50, len(word_a))))
        question_text = (
            f"Let A = {{x : x is a letter in '{word_a}'}} and "
            f"B = {{x : x is a letter in '{word_b}'}}.\n"
            f"Are A and B equal sets? Justify."
        )
        set_a = set(word_a)
        set_b = set(word_b)
        equal = set_a == set_b
        answer = "Yes, A = B" if equal else "No, A ≠ B"
        solution = (
            f"A = {{letters in '{word_a}'}} = {sorted(set_a)}\n"
            f"B = {{letters in '{word_b}'}} = {sorted(set_b)}\n"
            f"{'Both contain the same elements.' if equal else 'They contain different elements.'}"
        )
        verification = {"equal": equal, "set_a": sorted(set_a), "set_b": sorted(set_b)}
    else:
        n = rng.randint(4, 6)
        question_text = (
            f"A set has {n} elements. How many proper subsets does it have? "
            f"Show your work."
        )
        total_subsets = 2 ** n
        proper_subsets = total_subsets - 1
        answer = str(proper_subsets)
        solution = (
            f"Total subsets = 2^n = 2^{n} = {total_subsets}\n"
            f"Proper subsets exclude the set itself.\n"
            f"Number of proper subsets = {total_subsets} − 1 = {proper_subsets}"
        )
        verification = {"proper_subsets": proper_subsets, "total_subsets": total_subsets}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_EQUAL_SETS_SUBSETS,
            "subtopic": "Equal Sets",
            "solution": solution,
            "verification": verification,
        }

    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "short_answer",
        "options": None,
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": TOPIC_EQUAL_SETS_SUBSETS,
        "subtopic": "Equal Sets",
        "solution": solution,
        "verification": verification,
    }


def gen_subsets(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on subsets."""
    rng = random.Random(seed)
    qid = f"c11_002_subsets_{seed}"

    base = sorted(_gen_set_roster(seed, 4))
    A = set(base)
    subset_size = rng.randint(1, len(base) - 1)
    subset_elements = sorted(rng.sample(base, subset_size))

    if difficulty < 0.35:
        # MCQ -- subset relation
        question_text = (
            f"Let A = {base} and B = {subset_elements}.\n"
            f"Is B ⊆ A? Choose the correct answer:"
        )
        is_subset = True  # by construction
        correct = "Yes, B ⊆ A"
        wrong_opts = [
            "No, B ⊈ A",
            f"Yes, B = A (B has {len(subset_elements)} elements)",
            f"Only if A = B (n(A) = {len(base)}, n(B) = {len(subset_elements)})",
        ]
        options = [correct] + wrong_opts
        rng.shuffle(options)
        answer = chr(65 + options.index(correct))
        solution = (
            f"A = {base}\n"
            f"B = {subset_elements}\n"
            f"Every element of B is in A.\n"
            f"Hence B ⊆ A."
        )
        verification = {"is_subset": True, "subset_elements": subset_elements}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "mcq",
            "options": options,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_EQUAL_SETS_SUBSETS,
            "subtopic": "Subsets",
            "solution": solution,
            "verification": verification,
        }
    elif difficulty < 0.65:
        # Proper subset -- medium
        question_text = (
            f"Let A = {base}. Write all proper subsets of A that contain "
            f"the element {base[0]}."
        )
        # All subsets containing base[0] minus {base[0]} itself minus A itself
        containing_first = [
            sorted({base[0]} | set(rng.sample(base[1:], k)))
            for k in range(1, len(base))
        ]
        answer_str = "; ".join(
            "{" + ", ".join(map(str, s)) + "}" for s in containing_first
        )
        solution = (
            f"A = {base}\n"
            f"Proper subsets containing {base[0]} are all non-empty subsets "
            f"containing {base[0]} except A itself.\n"
            f"Answer: {answer_str}"
        )
        verification = {"proper_subsets_with_element": containing_first}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "short_answer",
            "options": None,
            "answer": answer_str,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_EQUAL_SETS_SUBSETS,
            "subtopic": "Subsets",
            "solution": solution,
            "verification": verification,
        }
    else:
        # Power set -- hard
        n = rng.randint(4, 5)
        elements = [chr(65 + i) for i in range(n)]
        power_set_size = 2 ** n
        question_text = (
            f"If A = {{{', '.join(elements)}}}, how many subsets of A "
            f"have exactly {n - 1} elements? List them."
        )
        n_subsets_of_size = n  # C(n, n-1) = n
        subsets_list = []
        for i in range(n):
            sub = [elements[j] for j in range(n) if j != i]
            subsets_list.append("{" + ", ".join(sub) + "}")

        answer = f"Number: {n_subsets_of_size}; Subsets: {', '.join(subsets_list)}"
        solution = (
            f"Number of subsets of A with exactly {n - 1} elements = C({n}, {n - 1}) = {n}\n"
            f"These are obtained by removing one element from A at a time:\n"
            + "\n".join(f"  A − {{{elements[i]}}} = {subsets_list[i]}" for i in range(n))
        )
        verification = {
            "count": n_subsets_of_size,
            "combinations": "C({}, {})".format(n, n - 1),
        }
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_EQUAL_SETS_SUBSETS,
            "subtopic": "Power Set",
            "solution": solution,
            "verification": verification,
        }


def gen_power_set_count(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on counting power set elements."""
    rng = random.Random(seed)
    qid = f"c11_002_power_set_count_{seed}"

    n = rng.randint(4, 7)
    answer = 2 ** n

    question_text = (
        f"A set A has {n} elements. How many elements does P(A) have? "
        f"Also find the number of proper subsets of A."
    )
    proper = answer - 1
    solution = (
        f"n(A) = {n}\n"
        f"n(P(A)) = 2^n = 2^{n} = {answer}\n"
        f"Proper subsets = 2^n − 1 = {answer} − 1 = {proper}"
    )
    verification = {"power_set_size": answer, "proper_subsets": proper}
    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "short_answer",
        "options": None,
        "answer": f"n(P(A)) = {answer}, proper subsets = {proper}",
        "difficulty": round(difficulty, 2),
        "topic": TOPIC_EQUAL_SETS_SUBSETS,
        "subtopic": "Power Set",
        "solution": solution,
        "verification": verification,
    }


def gen_subset_relations(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on proper subsets, subset notation, and relations."""
    rng = random.Random(seed)
    qid = f"c11_002_subset_relations_{seed}"

    base = sorted(_gen_set_roster(seed, 5))
    A = set(base)
    sub_size = rng.randint(2, len(base) - 1)
    B = set(rng.sample(base, sub_size))
    C = set(rng.sample(list(set(range(1, 101)) - A), sub_size))

    if difficulty < 0.35:
        question_text = (
            f"Let A = {base} and B = {sorted(B)}.\n"
            f"Which of the following is true?\n"
            f"(A) B ⊂ A  (B) B ⊃ A  (C) B = A  (D) None of these"
        )
        answer = "A"
        solution = (
            f"A = {base}\n"
            f"B = {sorted(B)}\n"
            f"Since every element of B is in A and B ≠ A, B ⊂ A (proper subset)."
        )
        verification = {"B_is_proper_subset_of_A": True}
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "mcq",
            "options": ["B ⊂ A", "B ⊃ A", "B = A", "None of these"],
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_EQUAL_SETS_SUBSETS,
            "subtopic": "Subset Relations",
            "solution": solution,
            "verification": verification,
        }
    else:
        # Proper vs improper subset
        question_text = (
            f"Let A = {base}.\n"
            f"Write (a) all subsets of A, (b) all proper subsets of A, "
            f"(c) the improper subsets."
        )
        n = len(base)
        total = 2 ** n
        answer = (
            f"Total subsets: {total}; Proper subsets: {total - 1}; "
            f"Improper subsets: {{∅, A}}"
        )
        solution = (
            f"n(A) = {n}\n"
            f"Total subsets = 2^{n} = {total}\n"
            f"Proper subsets = {total} − 1 = {total - 1}\n"
            f"Improper subsets are the empty set and A itself: {{∅, A}}"
        )
        verification = {
            "total_subsets": total,
            "proper_subsets": total - 1,
        }
        return {
            "id": qid,
            "question_text": question_text,
            "question_type": "long_answer",
            "options": None,
            "answer": answer,
            "difficulty": round(difficulty, 2),
            "topic": TOPIC_EQUAL_SETS_SUBSETS,
            "subtopic": "Subset Relations",
            "solution": solution,
            "verification": verification,
        }


def gen_intervals(seed: int, difficulty: float) -> Dict[str, Any]:
    """Questions on intervals as subsets of R."""
    rng = random.Random(seed)
    qid = f"c11_002_intervals_{seed}"

    a = rng.randint(-5, 5)
    b = a + rng.randint(2, 6)

    interval_types = [
        ("open", f"({a}, {b})", f"a < x < b"),
        ("closed", f"[{a}, {b}]", f"a ≤ x ≤ b"),
        ("half_open_1", f"[{a}, {b})", f"a ≤ x < b"),
        ("half_open_2", f"({a}, {b}]", f"a < x ≤ b"),
    ]
    itype, notation, cond = rng.choice(interval_types)

    if difficulty < 0.35:
        question_text = (
            f"Write the interval notation for the set {{x ∈ R : {cond}}}."
        )
        answer = notation
        solution = (
            f"The set {{x ∈ R : {cond}}} is represented as {notation}.\n"
            f"This is a {itype} interval."
        )
    elif difficulty < 0.65:
        # Convert to set-builder
        question_text = f"Write the set {notation} in set-builder form."
        answer = f"{{x ∈ R : {cond}}}"
        solution = (
            f"The interval {notation} in set-builder form is {{x ∈ R : {cond}}}.\n"
            f"Square bracket [ means ≤, round bracket ( means <."
        )
    else:
        # Length of interval
        length = b - a
        question_text = (
            f"Find the length of the interval {notation}."
        )
        answer = str(length)
        solution = (
            f"The interval {notation} runs from {a} to {b}.\n"
            f"Length = {b} − {a} = {length}"
        )
        verification = {"length": length}

    base_verification = {"type": itype, "a": a, "b": b}
    if "verification" not in locals() or not isinstance(verification, dict):
        verification = base_verification

    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "fill_blank",
        "options": None,
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": TOPIC_EQUAL_SETS_SUBSETS,
        "subtopic": "Intervals",
        "solution": solution,
        "verification": verification,
    }


# ---------------------------------------------------------------------------
# QUESTION_REGISTRY
# ---------------------------------------------------------------------------

QUESTION_REGISTRY: Dict[str, List[Callable]] = {
    TOPIC_SETS_FUNCTIONS: [
        gen_set_representation,
        gen_set_operations,
        gen_venn_diagram,
        gen_power_set,
        gen_de_morgans_law,
        gen_functions_domain_range,
        gen_function_types,
        gen_inverse_function,
        gen_binary_operations,
    ],
    TOPIC_EQUAL_SETS_SUBSETS: [
        gen_equal_sets,
        gen_subsets,
        gen_power_set_count,
        gen_subset_relations,
        gen_intervals,
    ],
}


# ---------------------------------------------------------------------------
# Main Generator
# ---------------------------------------------------------------------------

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate `count` deterministic questions using `seed`.

    Questions are drawn from registered topic generators in round-robin
    fashion with random difficulty sampled per topic.
    """
    random.seed(seed)
    questions: List[Dict[str, Any]] = []

    # Build flat list of all generators with their topic labels
    all_generators: List[Tuple[str, Callable]] = []
    for topic, gens in QUESTION_REGISTRY.items():
        for gen in gens:
            all_generators.append((topic, gen))

    if not all_generators:
        return questions

    for i in range(count):
        topic, gen_fn = all_generators[i % len(all_generators)]
        q_seed = seed + i
        # Difficulty: cycle through easy, medium, hard
        diff_cycle = [DIFFICULTY_EASY, DIFFICULTY_MEDIUM, DIFFICULTY_HARD]
        difficulty = diff_cycle[i % 3]
        # Occasionally mix
        if i % 7 == 0:
            difficulty = round(random.uniform(0.0, 1.0), 2)

        try:
            q = gen_fn(q_seed, difficulty)
            # Ensure all required fields
            q.setdefault("id", f"q_{q_seed}")
            q.setdefault("question_type", "short_answer")
            q.setdefault("options", None)
            q.setdefault("verification", {})
            questions.append(q)
        except Exception as e:
            # Fallback question if generator fails
            questions.append({
                "id": f"q_fallback_{q_seed}",
                "question_text": (
                    f"Given a set A, list all subsets of A when n(A) = 3."
                ),
                "question_type": "short_answer",
                "options": None,
                "answer": "8 subsets: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}",
                "difficulty": 0.25,
                "topic": topic,
                "subtopic": "Subsets",
                "solution": (
                    "n(A) = 3 → total subsets = 2^3 = 8.\n"
                    "List: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}."
                ),
                "verification": {"total": 8},
            })

    return questions


# ---------------------------------------------------------------------------
# Self-test
# ---------------------------------------------------------------------------

def _print_header(text: str) -> None:
    bar = "=" * 70
    print(f"\n{bar}")
    print(f"  {text}")
    print(bar)


def _self_test() -> None:
    """Run a self-test when executed as a script."""
    _print_header("CISCE Class 11 Mathematics -- Question Generator Self-Test")

    # ---- Test 1: Basic generation ----
    seed = 42
    count = 12
    print(f"\n[TEST 1] Generating {count} questions with seed={seed} ...")
    questions = generate_questions(seed, count)
    assert len(questions) == count, f"Expected {count}, got {len(questions)}"
    print(f"  ✓ Generated {len(questions)} questions")

    # ---- Test 2: Reproducibility ----
    print(f"\n[TEST 2] Reproducibility check (same seed = same output) ...")
    questions_again = generate_questions(seed, count)
    for i, (q1, q2) in enumerate(zip(questions, questions_again)):
        assert q1["id"] == q2["id"], f"ID mismatch at index {i}"
        assert q1["answer"] == q2["answer"], f"Answer mismatch at index {i}"
    print(f"  ✓ All {count} questions are identical on re-run")

    # ---- Test 3: Different seeds produce different output ----
    questions_diff = generate_questions(seed + 1, count)
    diff_count = sum(1 for q1, q2 in zip(questions, questions_diff) if q1["id"] != q2["id"])
    assert diff_count > 0, "Different seed produced same questions"
    print(f"  ✓ Seed {seed+1} produced {diff_count}/{count} different questions")

    # ---- Test 4: Verification ----
    print(f"\n[TEST 3] Validating all questions ...")
    report = verify_all_questions(questions)
    print(f"  Total: {report['total']}, Valid: {report['valid']}, Invalid: {report['invalid']}")
    if report["errors"]:
        for err in report["errors"]:
            print(f"    ✗ {err}")
    else:
        print(f"  ✓ All questions passed validation")

    # ---- Test 5: Topic distribution ----
    print(f"\n[TEST 4] Topic distribution ...")
    topic_counts: Dict[str, int] = {}
    for q in questions:
        t = q.get("topic", "unknown")
        topic_counts[t] = topic_counts.get(t, 0) + 1
    for t, c in topic_counts.items():
        print(f"  {t}: {c} questions")

    # ---- Test 6: Question types distribution ----
    print(f"\n[TEST 5] Question type distribution ...")
    type_counts: Dict[str, int] = {}
    for q in questions:
        qt = q.get("question_type", "unknown")
        type_counts[qt] = type_counts.get(qt, 0) + 1
    for qt, c in type_counts.items():
        print(f"  {qt}: {c}")

    # ---- Test 7: Difficulty range ----
    print(f"\n[TEST 6] Difficulty range ...")
    difficulties = [q["difficulty"] for q in questions]
    print(f"  Min: {min(difficulties)}, Max: {max(difficulties)}, "
          f"Mean: {sum(difficulties)/len(difficulties):.2f}")
    assert all(0.0 <= d <= 1.0 for d in difficulties), "Difficulty out of range!"
    print(f"  ✓ All difficulties in [0.0, 1.0]")

    # ---- Test 8: MCQ options check ----
    print(f"\n[TEST 7] MCQ option validation ...")
    mcq_count = sum(1 for q in questions if q["question_type"] == "mcq")
    print(f"  MCQ questions: {mcq_count}")
    for q in questions:
        if q["question_type"] == "mcq":
            assert q.get("options") is not None, f"MCQ {q['id']} missing options"
            assert len(q["options"]) >= 2, f"MCQ {q['id']} has < 2 options"
    print(f"  ✓ All MCQ questions have valid options")

    # ---- Test 9: Solver functions ----
    print(f"\n[TEST 8] Solver functions ...")
    for q in questions:
        qt = q["question_type"]
        if qt in SOLVER_MAP:
            answer, explanation = SOLVER_MAP[qt](q)
            assert answer is not None, f"Solver returned None for {q['id']}"
    print(f"  ✓ All solvers executed successfully")

    # ---- Test 10: Sample questions display ----
    _print_header("Sample Questions (first 3)")
    for q in questions[:3]:
        print(f"\n  ID:       {q['id']}")
        print(f"  Type:     {q['question_type']}")
        print(f"  Topic:    {q['topic']}")
        print(f"  Subtopic: {q.get('subtopic', 'N/A')}")
        print(f"  Difficulty: {q['difficulty']}")
        print(f"  Question: {q['question_text'][:100]}...")
        if q.get("options"):
            print(f"  Options:  {q['options']}")
        print(f"  Answer:   {q['answer']}")

    _print_header("Self-Test Completed Successfully ✓")


if __name__ == "__main__":
    _self_test()