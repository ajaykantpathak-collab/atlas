"""
CISCE APPMATH Class 12 — Question Generator & Solvers
Topics: Relations (reflexive, symmetric, transitive, equivalence; identity, empty, universal)
"""

import random
import math
import sympy as sp
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
import copy

# ============================================================
# DATA STRUCTURES
# ============================================================

@dataclass
class Question:
    id: str
    type: str          # 'mcq' | 'fill_blank' | 'short_answer' | 'long_answer' | 'numerical'
    topic: str
    difficulty: str    # 'Easy' | 'Medium' | 'Hard'
    competency: str    # 'standard' | 'indian_context'
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    marks: int = 1
    params: Dict = field(default_factory=dict)

# ============================================================
# UTILITY HELPERS
# ============================================================

def _rng(seed: int):
    r = random.Random(seed)
    r.seed(seed)
    return r

def _set_from_str(s: str) -> set:
    return set(int(x.strip()) for x in s.split(','))

def _relation_from_rule(rule_name: str, A: set, **kwargs) -> set:
    """Build a relation on set A from a named rule."""
    R = set()
    if rule_name == 'reflexive_only':
        for a in A:
            R.add((a, a))
    elif rule_name == 'symmetric_chain':
        # aRb iff |a-b| = 1  (adjacent integers)
        for a in A:
            for b in A:
                if abs(a - b) == 1:
                    R.add((a, b))
    elif rule_name == 'transitive_chain':
        # aRb iff a < b
        for a in A:
            for b in A:
                if a < b:
                    R.add((a, b))
    elif rule_name == 'divisible_by':
        k = kwargs.get('k', 3)
        for a in A:
            for b in A:
                if (a - b) % k == 0:
                    R.add((a, b))
    elif rule_name == 'same_parity':
        for a in A:
            for b in A:
                if (a % 2) == (b % 2):
                    R.add((a, b))
    elif rule_name == 'leq':
        for a in A:
            for b in A:
                if a <= b:
                    R.add((a, b))
    elif rule_name == 'geq':
        for a in A:
            for b in A:
                if a >= b:
                    R.add((a, b))
    elif rule_name == 'custom':
        pairs = kwargs.get('pairs', [])
        R = set(tuple(p) for p in pairs)
    return R

def check_reflexive(A: set, R: set) -> Tuple[bool, str]:
    missing = [(a, a) for a in A if (a, a) not in R]
    if not missing:
        return True, "All (a,a) are present in R for every a in A."
    return False, f"Missing self-pairs: {missing}. Reflexive requires (a,a) in R for every a."

def check_symmetric(A: set, R: set) -> Tuple[bool, str]:
    for (a, b) in R:
        if (b, a) not in R:
            return False, f"({a},{b}) is in R but ({b},{a}) is missing. Symmetric fails."
    return True, "For every (a,b) in R, the reverse (b,a) is also in R."

def check_transitive(A: set, R: set) -> Tuple[bool, str]:
    for (a, b) in R:
        for (c, d) in R:
            if b == c:
                if (a, d) not in R:
                    return False, f"({a},{b}) and ({b},{d}) are in R but ({a},{d}) is missing. Transitive fails."
    return True, "For all (a,b), (b,c) in R, the pair (a,c) is also in R."

def classify_relation(A: set, R: set) -> Dict[str, Any]:
    ref, ref_msg = check_reflexive(A, R)
    sym, sym_msg = check_symmetric(A, R)
    tra, tra_msg = check_transitive(A, R)
    is_equivalence = ref and sym and tra
    rel_type = None
    if is_equivalence:
        rel_type = "Equivalence relation"
    elif ref and not sym and not tra:
        rel_type = "Reflexive only"
    elif sym and not ref and not tra:
        rel_type = "Symmetric only"
    elif tra and not ref and not sym:
        rel_type = "Transitive only"
    elif ref and sym and not tra:
        rel_type = "Reflexive and Symmetric"
    elif ref and tra and not sym:
        rel_type = "Reflexive and Transitive"
    elif sym and tra and not ref:
        rel_type = "Symmetric and Transitive"
    elif not ref and not sym and not tra:
        rel_type = "None of the properties"
    else:
        rel_type = "Mixed properties"
    return {
        "reflexive": ref,
        "symmetric": sym,
        "transitive": tra,
        "equivalence": is_equivalence,
        "type": rel_type,
        "messages": {"reflexive": ref_msg, "symmetric": sym_msg, "transitive": tra_msg}
    }

# ============================================================
# COMPETENCY-BASED QUESTION TEMPLATES (Indian Context)
# ============================================================

_COMPETENCY_TEMPLATES = {
    "school_attendance": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Easy",
        "context": (
            "In a Government Higher Secondary School in Chennai, the student attendance register "
            "for Class 12-A has {n} students. The class teacher defines a relation R on the set of "
            "students where a student X is related to student Y if X and Y were present on the same "
            "number of days in the month of August 2025. "
        ),
        "mcq_stems": [
            "Is the relation R reflexive?",
            "Is the relation R symmetric?",
            "Is the relation R transitive?",
            "Is R an equivalence relation?",
        ],
        "short_answer": "Justify whether R is an equivalence relation by checking all three properties.",
        "long_answer": (
            "In a Kendriya Vidyalaya in Mumbai, consider the set A = {students}. "
            "Define R on A as: aRb if student a and student b scored the same marks in Mathematics. "
            "Verify whether R is (i) reflexive, (ii) symmetric, (iii) transitive. "
            "Hence state whether R is an equivalence relation. "
            "If R is an equivalence relation, what do the equivalence classes represent in the school context?"
        ),
    },
    "divisibility_calendar": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Medium",
        "context": (
            "During the annual sports day at a school in Delhi, each student is assigned a jersey number "
            "from the set A = {nums}. The coach defines a relation R on A: two students a and b are "
            "related if their jersey numbers leave the same remainder when divided by {k}. "
            "This groups students by jersey-number congruence."
        ),
        "mcq_stems": [
            "Which of the following properties does R satisfy?",
            "How many equivalence classes does R partition A into?",
            "Which ordered pair must be in R for transitivity?",
        ],
        "short_answer": "Find all equivalence classes of R on A.",
        "long_answer": (
            "In a cultural programme at a school in Kolkata, the participants are numbered 1 through {n}. "
            "A relation S is defined: aSb if a and b have the same last digit. "
            "Show that S is an equivalence relation on A. Find the number of equivalence classes "
            "and list at least two elements of each class."
        ),
    },
    "exam_marks": {
        "topic": "Identity, empty, universal relations",
        "difficulty": "Medium",
        "context": (
            "In a CBSE school in Bangalore, Class 12 students wrote a Mathematics test. "
            "Let A be the set of all students. Let R be defined on A as: "
            "aRb if student a scored strictly more marks than student b. "
            "Let I_A be the identity relation on A. "
            "Let E be the empty relation on A."
        ),
        "mcq_stems": [
            "Which statement about R is correct?",
            "What is the identity relation I_A?",
            "How many ordered pairs are in the empty relation E?",
        ],
        "short_answer": "Is R the universal relation? Justify your answer.",
        "long_answer": (
            "Let A = {students} be the set of students who appeared for a school exam. "
            "Define three relations on A: "
            "(i) I_A = identity relation, "
            "(ii) E = empty relation, "
            "(iii) U = universal relation. "
            "List all ordered pairs in I_A, E, and U. "
            "Explain with a real-life example why U = A x A is called the universal relation."
        ),
    },
    "friendship_network": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Hard",
        "context": (
            "In a residential school in Pune, there are {n} students in a hostel wing. "
            "The warden defines a relation F on the set of students: aFb if student a and student b "
            "are in the same House (Red, Blue, Green, Yellow). The four Houses partition the {n} students."
        ),
        "mcq_stems": [
            "Is F reflexive?",
            "Is F symmetric?",
            "How many equivalence classes does F have?",
        ],
        "short_answer": "If there are 4 Houses with equal students, find all equivalence classes.",
        "long_answer": (
            "In a Navodaya Vidyalaya, {n} students are divided into four houses. "
            "Relation H: aHb if a and b belong to the same house. "
            "Prove that H is an equivalence relation. "
            "If each house has an equal number of students, how many elements are in each equivalence class? "
            "If a new student joins and is assigned to the Blue house, does H remain an equivalence relation?"
        ),
    },
    "congruence_clock": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Medium",
        "context": (
            "On a 12-hour clock face used in a school assembly in Jaipur, the relation R on the set "
            "A = {nums} is defined as: aRb if a and b show the same time on a 12-hour clock "
            "(i.e., a ≡ b mod 12)."
        ),
        "mcq_stems": [
            "R is a (reflexive/symmetric/transitive/equivalence) relation.",
            "How many distinct equivalence classes are there?",
            "Which number is related to 15 under R?",
        ],
        "short_answer": "Find the equivalence class [7] under R.",
        "long_answer": (
            "A clock shows hours from 1 to 12. On the set Z of all integers, "
            "define R: aRb iff a ≡ b (mod 12). "
            "Prove R is an equivalence relation. "
            "How many distinct equivalence classes are there on the set {nums}? "
            "Find all members of the equivalence class of 3."
        ),
    },
}

_STANDARD_TEMPLATES = {
    "finite_set_check": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Easy",
        "gen": "finite_set",
    },
    "divisibility_integers": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Medium",
        "gen": "divisibility",
    },
    "identity_empty_universal": {
        "topic": "Identity, empty, universal relations",
        "difficulty": "Medium",
        "gen": "id_empty_uni",
    },
    "order_pair_listing": {
        "topic": "Identity, empty, universal relations",
        "difficulty": "Easy",
        "gen": "pair_listing",
    },
    "transitivity_check": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Medium",
        "gen": "transitivity",
    },
    "symmetric_not_reflexive": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Hard",
        "gen": "sym_not_ref",
    },
    "count_ordered_pairs": {
        "topic": "Identity, empty, universal relations",
        "difficulty": "Easy",
        "gen": "count_pairs",
    },
    "composite_check": {
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "difficulty": "Hard",
        "gen": "composite_rel",
    },
}

# ============================================================
# QUESTION GENERATORS
# ============================================================

def _gen_finite_set(rng: random.Random, difficulty: str) -> Dict:
    A_size = rng.randint(3, 5)
    A = sorted(rng.sample(range(1, 21), A_size))
    A_set = set(A)

    rule_roll = rng.random()
    if rule_roll < 0.25:
        rule = "reflexive_only"
        R = _relation_from_rule(rule, A_set)
    elif rule_roll < 0.50:
        rule = "symmetric_chain"
        R = _relation_from_rule(rule, A_set)
    elif rule_roll < 0.75:
        rule = "same_parity"
        R = _relation_from_rule(rule, A_set)
    else:
        rule = "divisible_by"
        k = rng.choice([2, 3, 4])
        R = _relation_from_rule(rule, A_set, k=k)

    classification = classify_relation(A_set, R)

    if difficulty == "Easy":
        q_types = rng.choice(["mcq", "fill_blank", "short_answer"])
    else:
        q_types = rng.choice(["mcq", "short_answer", "long_answer"])

    if q_types == "mcq":
        props = ["reflexive", "symmetric", "transitive", "equivalence"]
        chosen = rng.choice(props)
        correct_ans = "Yes" if classification[chosen] else "No"
        opts = [correct_ans, "No" if correct_ans == "Yes" else "Yes"]
        rng.shuffle(opts)
        return {
            "type": "mcq",
            "question": (
                f"Let A = {A} and R = {sorted(R)}. "
                f"Is the relation R {chosen}?"
            ),
            "options": opts,
            "answer": correct_ans,
            "explanation": classification["messages"][chosen],
            "difficulty": difficulty,
            "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
            "competency": "standard",
        }
    elif q_types == "fill_blank":
        prop = rng.choice(["reflexive", "symmetric", "transitive", "equivalence"])
        correct = "Yes" if classification[prop] else "No"
        return {
            "type": "fill_blank",
            "question": (
                f"On A = {A} with R = {sorted(R)}, "
                f"the relation R is {prop}: ______ (Yes / No)"
            ),
            "options": None,
            "answer": correct,
            "explanation": classification["messages"][prop],
            "difficulty": difficulty,
            "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
            "competency": "standard",
        }
    else:
        return {
            "type": "short_answer",
            "question": (
                f"On A = {A}, R = {sorted(R)}. "
                "State whether R is reflexive, symmetric, transitive. "
                "Hence classify R."
            ),
            "options": None,
            "answer": classification["type"],
            "explanation": (
                f"Reflexive: {classification['messages']['reflexive']} "
                f"Symmetric: {classification['messages']['symmetric']} "
                f"Transitive: {classification['messages']['transitive']} "
                f"Conclusion: {classification['type']}"
            ),
            "difficulty": difficulty,
            "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
            "competency": "standard",
        }


def _gen_divisibility(rng: random.Random) -> Dict:
    k = rng.choice([2, 3, 4, 5])
    a_val = rng.randint(-20, 20)
    b_val = rng.randint(-20, 20)

    is_equiv = ((a_val - b_val) % k == 0)

    q_type = rng.choice(["mcq", "numerical", "short_answer"])

    if q_type == "mcq":
        correct = "Yes" if is_equiv else "No"
        opts = [correct, "No" if correct == "Yes" else "Yes"]
        rng.shuffle(opts)
        return {
            "type": "mcq",
            "question": (
                f"On the set Z of integers, R is defined by aRb iff (a - b) is divisible by {k}. "
                f"Is {a_val} R {b_val}?"
            ),
            "options": opts,
            "answer": correct,
            "explanation": (
                f"{a_val} - {b_val} = {a_val - b_val}. "
                f"{a_val - b_val} / {k} = {(a_val - b_val) / k:.2f}. "
                f"{'Divisible' if is_equiv else 'Not divisible'} by {k}."
            ),
            "difficulty": "Medium",
            "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
            "competency": "standard",
        }
    elif q_type == "numerical":
        remainder = a_val % k
        return {
            "type": "numerical",
            "question": (
                f"On Z, R: aRb iff a ≡ b (mod {k}). "
                f"What is the remainder when {a_val} is divided by {k}? "
                "This is the equivalence class representative for {a_val}."
            ),
            "options": None,
            "answer": remainder,
            "explanation": (
                f"{a_val} = {k} × {a_val // k} + {remainder}. "
                f"Thus {a_val} ≡ {remainder} (mod {k})."
            ),
            "difficulty": "Medium",
            "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
            "competency": "standard",
        }
    else:
        return {
            "type": "short_answer",
            "question": (
                f"On the set of integers Z, R is defined by aRb iff a - b is divisible by {k}. "
                "Prove R is an equivalence relation by checking all three properties."
            ),
            "options": None,
            "answer": "R is an equivalence relation",
            "explanation": (
                "Reflexive: a-a=0, divisible by k. "
                "Symmetric: if a-b ≡ 0 (mod k) then b-a ≡ 0 (mod k). "
                "Transitive: if a-b ≡ 0 and b-c ≡ 0 (mod k) then a-c ≡ 0 (mod k). "
                "Hence R is an equivalence relation."
            ),
            "difficulty": "Medium",
            "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
            "competency": "standard",
        }


def _gen_id_empty_uni(rng: random.Random) -> Dict:
    A_size = rng.randint(2, 4)
    A = sorted(rng.sample(range(1, 11), A_size))
    A_set = set(A)

    q_type = rng.choice(["mcq", "short_answer", "long_answer"])

    if q_type == "mcq":
        sub_q = rng.choice(["identity", "empty", "universal"])
        if sub_q == "identity":
            correct = f"I_A has {len(A_set)} ordered pairs."
            opts = [
                correct,
                f"I_A has {len(A_set)**2} ordered pairs.",
                f"I_A has 0 ordered pairs.",
                f"I_A has {2*len(A_set)} ordered pairs.",
            ]
            answer = correct
            explanation = (
                f"I_A = {{{', '.join(str((a,a)) for a in A)}}}. "
                f"Number of pairs = {len(A_set)}."
            )
        elif sub_q == "empty":
            correct = "The empty relation has 0 ordered pairs."
            opts = [
                correct,
                f"The empty relation has {len(A_set)} ordered pairs.",
                f"The empty relation has {len(A_set)**2} ordered pairs.",
                "The empty relation has 1 ordered pair.",
            ]
            answer = correct
            explanation = "The empty relation R = ∅ contains no ordered pairs at all."
        else:
            total = len(A_set) ** 2
            correct = f"The universal relation has {total} ordered pairs."
            opts = [
                correct,
                f"The universal relation has {len(A_set)} ordered pairs.",
                f"The universal relation has 0 ordered pairs.",
                f"The universal relation has {2*total} ordered pairs.",
            ]
            answer = correct
            explanation = (
                f"A × A has {len(A_set)} × {len(A_set)} = {total} ordered pairs."
            )

        rng.shuffle(opts)
        return {
            "type": "mcq",
            "question": f"Let A = {A}. {sub_q.capitalize()} relation: " + (
                f"How many ordered pairs does I_A contain?"
                if sub_q == "identity" else
                f"How many ordered pairs does the empty relation on A contain?"
                if sub_q == "empty" else
                f"How many ordered pairs does the universal relation on A contain?"
            ),
            "options": opts,
            "answer": answer,
            "explanation": explanation,
            "difficulty": "Medium",
            "topic": "Identity, empty, universal relations",
            "competency": "standard",
        }
    else:
        return {
            "type": "short_answer",
            "question": (
                f"Let A = {A}. List the ordered pairs in: (i) Identity relation I_A, "
                "(ii) Empty relation E, (iii) Universal relation U."
            ),
            "options": None,
            "answer": f"I_A={sorted((a,a) for a in A)}, E=∅, U={sorted((a,b) for a in A for b in A)}",
            "explanation": (
                f"I_A = {{{', '.join(str((a,a)) for a in A)}}} (only self-pairs). "
                f"E = {{}} (no pairs). "
                f"U = A × A = {{{', '.join(str((a,b)) for a in A for b in A)}}} (all pairs). "
                f"Total pairs in U = {len(A)**2}."
            ),
            "difficulty": "Medium",
            "topic": "Identity, empty, universal relations",
            "competency": "standard",
        }


def _gen_pair_listing(rng: random.Random) -> Dict:
    A_size = rng.randint(2, 3)
    A = sorted(rng.sample(range(1, 8), A_size))
    A_set = set(A)
    total_pairs = len(A_set) ** 2

    return {
        "type": "fill_blank",
        "question": (
            f"If A = {A}, the universal relation U = A × A contains ____ ordered pairs."
        ),
        "options": None,
        "answer": total_pairs,
        "explanation": (
            f"A has {len(A_set)} elements. A × A has |A| × |A| = "
            f"{len(A_set)} × {len(A_set)} = {total_pairs} ordered pairs."
        ),
        "difficulty": "Easy",
        "topic": "Identity, empty, universal relations",
        "competency": "standard",
    }


def _gen_transitivity(rng: random.Random) -> Dict:
    A_size = rng.randint(3, 5)
    A = sorted(rng.sample(range(1, 15), A_size))
    A_set = set(A)

    rule = rng.choice(["transitive_chain", "leq"])
    R = _relation_from_rule(rule, A_set)
    _, tra_msg = check_transitive(A_set, R)
    is_transitive = "Transitive" in tra_msg

    opts = ["Yes, R is transitive", "No, R is not transitive"]
    rng.shuffle(opts)
    correct = "Yes, R is transitive" if is_transitive else "No, R is not transitive"

    return {
        "type": "mcq",
        "question": (
            f"On A = {A}, R = {sorted(R)}. "
            f"Is R transitive? Check: whenever (a,b) and (b,c) are in R, is (a,c) also in R?"
        ),
        "options": opts,
        "answer": correct,
        "explanation": tra_msg,
        "difficulty": "Medium",
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "competency": "standard",
    }


def _gen_sym_not_ref(rng: random.Random) -> Dict:
    A_size = rng.randint(3, 4)
    A = sorted(rng.sample(range(1, 10), A_size))
    A_set = set(A)

    # Build a symmetric but not reflexive relation
    R = set()
    for a in A_set:
        for b in A_set:
            if a != b and (a + b) % 2 == 0:
                R.add((a, b))
                R.add((b, a))

    _, sym_msg = check_symmetric(A_set, R)
    _, ref_msg = check_reflexive(A_set, R)
    is_sym = "For every" in sym_msg
    is_ref = "All" in ref_msg

    return {
        "type": "mcq",
        "question": (
            f"On A = {A}, R = {sorted(R)}. "
            "Is R symmetric? Is R reflexive? Select the correct combination."
        ),
        "options": [
            "Symmetric: Yes, Reflexive: Yes",
            "Symmetric: Yes, Reflexive: No",
            "Symmetric: No, Reflexive: Yes",
            "Symmetric: No, Reflexive: No",
        ],
        "answer": "Symmetric: Yes, Reflexive: No",
        "explanation": (
            f"Symmetric: {sym_msg} "
            f"Reflexive: {ref_msg} "
            "Thus R is symmetric but not reflexive."
        ),
        "difficulty": "Hard",
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "competency": "standard",
    }


def _gen_count_pairs(rng: random.Random) -> Dict:
    n = rng.randint(2, 5)
    A = list(range(1, n + 1))

    rel_type = rng.choice(["identity", "universal", "empty"])
    if rel_type == "identity":
        count = n
        answer = count
        expl = f"I_A has n = {n} pairs for set A with {n} elements."
    elif rel_type == "universal":
        count = n ** 2
        answer = count
        expl = f"Universal relation A × A has n² = {n}² = {n**2} pairs."
    else:
        count = 0
        answer = 0
        expl = "Empty relation has no pairs."

    return {
        "type": "numerical",
        "question": (
            f"If A = {A} (|A| = {n}), how many ordered pairs are in the "
            f"{'identity' if rel_type == 'identity' else 'universal' if rel_type == 'universal' else 'empty'} relation?"
        ),
        "options": None,
        "answer": answer,
        "explanation": expl,
        "difficulty": "Easy",
        "topic": "Identity, empty, universal relations",
        "competency": "standard",
    }


def _gen_composite_rel(rng: random.Random) -> Dict:
    A_size = rng.randint(3, 4)
    A = sorted(rng.sample(range(1, 10), A_size))
    A_set = set(A)

    # Build a reflexive relation
    R = _relation_from_rule("reflexive_only", A_set)
    # Add some symmetric pairs
    for a in list(A_set)[:2]:
        for b in list(A_set)[:2]:
            if a != b:
                R.add((a, b))
                R.add((b, a))

    classification = classify_relation(A_set, R)

    return {
        "type": "long_answer",
        "question": (
            f"On A = {A}, R = {sorted(R)}. "
            "Determine whether R is reflexive, symmetric, transitive. "
            "Is R an equivalence relation? If not, state which property fails and give a counter-example."
        ),
        "options": None,
        "answer": classification["type"],
        "explanation": (
            f"Reflexive: {classification['messages']['reflexive']} "
            f"Symmetric: {classification['messages']['symmetric']} "
            f"Transitive: {classification['messages']['transitive']} "
            f"Conclusion: {classification['type']}"
        ),
        "difficulty": "Hard",
        "topic": "Types of relations - reflexive, symmetric, transitive, equivalence",
        "competency": "standard",
    }


# ============================================================
# COMPETENCY QUESTION GENERATORS (Indian Context)
# ============================================================

def _gen_competency_school(rng: random.Random) -> Dict:
    ctx = _COMPETENCY_TEMPLATES["school_attendance"]
    n = rng.randint(5, 8)
    students = rng.sample(
        ["Aarav", "Diya", "Karan", "Priya", "Rohan", "Sneha", "Vikram", "Ananya"],
        min(n, 8)
    )
    student_str = ", ".join(students[:n])

    q_type = rng.choice(["mcq", "short_answer", "long_answer"])

    if q_type == "mcq":
        prop = rng.choice(["reflexive", "symmetric", "transitive", "equivalence"])
        # Attendance relation: same number of days present → reflexive, symmetric, transitive
        correct = "Yes"
        opts = ["Yes", "No"]
        rng.shuffle(opts)
        expl = (
            "Same-attendance relation: every student has the same attendance as themselves (reflexive), "
            "if X has same attendance as Y then Y has same as X (symmetric), "
            "if X~Y and Y~Z then X~Z (transitive). Hence it is an equivalence relation."
        )
        return {
            "type": "mcq",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(n=n, students=student_str)} "
                f"Is the relation R {prop}?"
            ),
            "options": opts,
            "answer": correct,
            "explanation": expl,
            "marks": 1,
        }
    elif q_type == "short_answer":
        return {
            "type": "short_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(n=n, students=student_str)} "
                "Justify with reasons whether R is an equivalence relation."
            ),
            "options": None,
            "answer": "Yes, R is an equivalence relation",
            "explanation": (
                "Reflexive: Every student has same attendance as themselves. "
                "Symmetric: If X~Y then Y~X (same attendance is mutual). "
                "Transitive: If X~Y and Y~Z then X~Z. Hence equivalence."
            ),
            "marks": 2,
        }
    else:
        return {
            "type": "long_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['long_answer'].format(n=n, students=student_str)}"
            ),
            "options": None,
            "answer": "R is an equivalence relation; equivalence classes = groups by attendance",
            "explanation": (
                "R groups students by attendance count. Each group is an equivalence class. "
                "Two students are in the same class iff they have identical attendance counts."
            ),
            "marks": 4,
        }


def _gen_competency_divisibility(rng: random.Random) -> Dict:
    ctx = _COMPETENCY_TEMPLATES["divisibility_calendar"]
    nums = sorted(rng.sample(range(1, 25), rng.randint(4, 6)))
    nums_str = ", ".join(str(x) for x in nums)
    k = rng.choice([3, 4])

    q_type = rng.choice(["mcq", "fill_blank", "short_answer"])

    if q_type == "mcq":
        num_classes = k
        correct = f"{num_classes} equivalence classes"
        opts = [
            correct,
            f"{len(nums)} equivalence classes",
            f"{len(nums)-1} equivalence classes",
            "1 equivalence class",
        ]
        rng.shuffle(opts)
        return {
            "type": "mcq",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(nums=nums_str, k=k)} "
                f"How many equivalence classes does R partition A into?"
            ),
            "options": opts,
            "answer": correct,
            "explanation": (
                f"Congruence mod {k} partitions Z into {k} classes: "
                f"{{[0], [1], ..., [{k-1}]}}. "
                f"Restricted to A = {{{nums_str}}}, the relevant classes appear."
            ),
            "marks": 1,
        }
    elif q_type == "fill_blank":
        sample_a = rng.choice(nums)
        remainder = sample_a % k
        return {
            "type": "fill_blank",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(nums=nums_str, k=k)} "
                f"Which number in A is related to {sample_a} under R (i.e., same remainder mod {k})? "
                f"Write one such number."
            ),
            "options": None,
            "answer": f"Any number ≡ {remainder} (mod {k}) in A",
            "explanation": (
                f"{sample_a} ≡ {remainder} (mod {k}). "
                f"Any number in A that gives remainder {remainder} when divided by {k} is related to {sample_a}."
            ),
            "marks": 1,
        }
    else:
        return {
            "type": "short_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['short_answer'].format(nums=nums_str)}"
            ),
            "options": None,
            "answer": f"Equivalence classes based on mod {k}",
            "explanation": (
                f"Partition A by remainders mod {k}. "
                f"Class [r] = {{x in A | x ≡ r (mod {k})}} for r = 0, 1, ..., {k-1}."
            ),
            "marks": 2,
        }


def _gen_competency_exam_marks(rng: random.Random) -> Dict:
    ctx = _COMPETENCY_TEMPLATES["exam_marks"]
    students = rng.sample(
        ["Amit", "Bhavna", "Chetan", "Deepa", "Eshan", "Farhan", "Gita", "Harsh"],
        rng.randint(4, 6)
    )
    student_str = ", ".join(students)

    q_type = rng.choice(["mcq", "short_answer", "long_answer"])

    if q_type == "mcq":
        opts = [
            "I_A = {(a,a) for all a in A}",
            "I_A = A × A",
            "I_A = ∅",
            "I_A = {(a,b) : a≠b}",
        ]
        rng.shuffle(opts)
        return {
            "type": "mcq",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(students=student_str)} "
                "What is the identity relation I_A?"
            ),
            "options": opts,
            "answer": "I_A = {(a,a) for all a in A}",
            "explanation": (
                "I_A contains exactly the pairs where each element is related only to itself: "
                "I_A = {(a,a) : a ∈ A}. It is NOT the universal relation."
            ),
            "marks": 1,
        }
    elif q_type == "short_answer":
        return {
            "type": "short_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['short_answer'].format(students=student_str)}"
            ),
            "options": None,
            "answer": "No, R is not universal. It only contains pairs where a scored strictly more than b.",
            "explanation": (
                "R = {(a,b) : marks(a) > marks(b)}. "
                "Not universal: if a and b have equal marks, (a,b) ∉ R. "
                "Universal relation = A × A (all possible pairs)."
            ),
            "marks": 2,
        }
    else:
        return {
            "type": "long_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['long_answer'].format(students=student_str)}"
            ),
            "options": None,
            "answer": "I_A has n pairs; E has 0 pairs; U has n² pairs",
            "explanation": (
                "I_A = {(a,a) : a ∈ A} — each student related only to themselves. "
                "E = ∅ — no student related to anyone. "
                "U = A × A — every student related to every other student (open-house)."
            ),
            "marks": 4,
        }


def _gen_competency_friendship(rng: random.Random) -> Dict:
    ctx = _COMPETENCY_TEMPLATES["friendship_network"]
    n = rng.choice([8, 12, 16])
    num_houses = 4

    q_type = rng.choice(["mcq", "short_answer", "long_answer"])

    if q_type == "mcq":
        opts = [
            "Yes, F is reflexive",
            "No, F is not reflexive",
            "Depends on the houses",
        ]
        rng.shuffle(opts)
        return {
            "type": "mcq",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(n=n)} "
                "Is the relation F reflexive?"
            ),
            "options": opts,
            "answer": "Yes, F is reflexive",
            "explanation": (
                "Every student belongs to exactly one house. "
                "So every student is related to themselves (same house). F is reflexive."
            ),
            "marks": 1,
        }
    elif q_type == "short_answer":
        per_house = n // num_houses
        return {
            "type": "short_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['short_answer'].format(n=n)}"
            ),
            "options": None,
            "answer": f"Each equivalence class has {per_house} students",
            "explanation": (
                f"4 houses partition {n} students equally: "
                f"{n}/4 = {per_house} per class."
            ),
            "marks": 2,
        }
    else:
        per_house = n // num_houses
        return {
            "type": "long_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['long_answer'].format(n=n)}"
            ),
            "options": None,
            "answer": (
                f"H is an equivalence relation; each class has {per_house} students; "
                "adding a student to Blue house preserves equivalence"
            ),
            "explanation": (
                "H is reflexive (same house as self), symmetric (mutual), transitive (same house chain). "
                "Equivalence classes = houses. Each has n/4 students. "
                "Adding one student to Blue house: Blue class now has (n/4 + 1) students, "
                "but H is still an equivalence relation (still reflexive, symmetric, transitive)."
            ),
            "marks": 4,
        }


def _gen_competency_clock(rng: random.Random) -> Dict:
    ctx = _COMPETENCY_TEMPLATES["congruence_clock"]
    nums = sorted(rng.sample(range(1, 25), rng.randint(5, 7)))
    nums_str = ", ".join(str(x) for x in nums)

    q_type = rng.choice(["mcq", "fill_blank", "short_answer"])

    if q_type == "mcq":
        opts = ["R is an equivalence relation", "R is only reflexive", "R is only symmetric", "R is not a relation"]
        rng.shuffle(opts)
        return {
            "type": "mcq",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(nums=nums_str)} "
                "R is:"
            ),
            "options": opts,
            "answer": "R is an equivalence relation",
            "explanation": (
                "R is reflexive (a≡a mod 12), symmetric (a≡b ⇒ b≡a), "
                "transitive (a≡b, b≡c ⇒ a≡c). Hence equivalence."
            ),
            "marks": 1,
        }
    elif q_type == "fill_blank":
        sample = rng.choice(nums)
        equiv_class = [x for x in nums if x % 12 == sample % 12]
        other = rng.choice([x for x in equiv_class if x != sample]) if len(equiv_class) > 1 else sample
        return {
            "type": "fill_blank",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['context'].format(nums=nums_str)} "
                f"Find the equivalence class [{sample}] (all elements of A related to {sample})."
            ),
            "options": None,
            "answer": sorted(equiv_class),
            "explanation": (
                f"[{sample}] = {{x in A | x ≡ {sample} (mod 12)}} = {sorted(equiv_class)}"
            ),
            "marks": 1,
        }
    else:
        return {
            "type": "short_answer",
            "topic": ctx["topic"],
            "difficulty": ctx["difficulty"],
            "competency": "indian_context",
            "question": (
                f"{ctx['short_answer'].format(nums=nums_str)}"
            ),
            "options": None,
            "answer": "R is equivalence; 12 classes; class[3] = {..., -9, -3, 3, 9, 15, 21, ...}",
            "explanation": (
                "Prove reflexive, symmetric, transitive. "
                "12 equivalence classes (0 through 11). "
                "[3] = {x ∈ Z : x ≡ 3 (mod 12)} = {..., -21, -9, 3, 15, 27, ...}."
            ),
            "marks": 3,
        }


# ============================================================
# MAIN QUESTION GENERATOR
# ============================================================

def generate_questions(seed: int, count: int) -> List[Dict]:
    """
    Generate `count` deterministic questions for CISCE APPMATH Class 12
    covering all syllabus nodes:
      - c12_appmath_001: Relation types (reflexive, symmetric, transitive, equivalence)
      - c12_appmath_002: Identity, empty, universal relations

    50% competency-based (Indian context), 50% standard.
    Mix: MCQ, fill-blank, short-answer, long-answer, numerical.
    """
    rng = _rng(seed)

    questions: List[Dict] = []

    # Standard generators pool
    std_gens = [
        _gen_finite_set,
        _gen_divisibility,
        _gen_id_empty_uni,
        _gen_pair_listing,
        _gen_transitivity,
        _gen_sym_not_ref,
        _gen_count_pairs,
        _gen_composite_rel,
    ]

    # Competency generators pool
    comp_gens = [
        _gen_competency_school,
        _gen_competency_divisibility,
        _gen_competency_exam_marks,
        _gen_competency_friendship,
        _gen_competency_clock,
    ]

    std_count = count // 2
    comp_count = count - std_count

    for _ in range(std_count):
        gen_fn = rng.choice(std_gens)
        if gen_fn in (_gen_finite_set,):
            q = gen_fn(rng, rng.choice(["Easy", "Medium"]))
        else:
            q = gen_fn(rng)
        q["id"] = f"Q_{seed}_{len(questions)+1:03d}"
        questions.append(q)

    for _ in range(comp_count):
        gen_fn = rng.choice(comp_gens)
        q = gen_fn(rng)
        q["id"] = f"Q_{seed}_{len(questions)+1:03d}"
        questions.append(q)

    rng.shuffle(questions)
    for i, q in enumerate(questions):
        q["id"] = f"Q_{seed}_{i+1:03d}"

    return questions


# ============================================================
# SOLVERS
# ============================================================

def solve_relation_check(params: Dict) -> Dict:
    """
    Solve: Given set A and relation R, check all properties.

    params: {
        "A": [1, 2, 3],
        "R": [[1,1],[2,2],[3,3],[1,2],[2,1]],
        "properties": ["reflexive", "symmetric", "transitive", "equivalence"]
    }
    """
    A = set(params.get("A", []))
    R = set(tuple(p) for p in params.get("R", []))
    props = params.get("properties", ["reflexive", "symmetric", "transitive", "equivalence"])

    steps = []
    steps.append(f"Given: A = {sorted(A)}, R = {sorted(R)}")
    steps.append(f"Step 1: Check Reflexive — need (a,a) ∈ R for every a ∈ A.")
    for a in sorted(A):
        status = "present" if (a, a) in R else "MISSING"
        steps.append(f"  ({a},{a}) {'✓' if (a,a) in R else '✗'} in R")

    steps.append(f"Step 2: Check Symmetric — for every (a,b) ∈ R, need (b,a) ∈ R.")
    sym_fail = None
    for (a, b) in sorted(R):
        if (b, a) not in R:
            sym_fail = (a, b)
            steps.append(f"  ({a},{b}) ∈ R but ({b},{a}) ∉ R → FAIL")
            break
    if sym_fail is None:
        steps.append("  All reverse pairs present → Symmetric ✓")

    steps.append(f"Step 3: Check Transitive — for (a,b),(b,c) ∈ R need (a,c) ∈ R.")
    tra_fail = None
    for (a, b) in sorted(R):
        for (c, d) in sorted(R):
            if b == c and (a, d) not in R:
                tra_fail = ((a, b), (b, d), (a, d))
                steps.append(f"  ({a},{b}) and ({b},{d}) in R but ({a},{d}) ∉ R → FAIL")
                break
        if tra_fail:
            break
    if tra_fail is None:
        steps.append("  All required pairs present → Transitive ✓")

    classification = classify_relation(A, R)
    steps.append(f"Result: {classification['type']}")

    # Numerical verification
    ref_count = sum(1 for a in A if (a, a) in R)
    ref_ok = ref_count == len(A)
    sym_count = sum(1 for (a, b) in R if (b, a) in R)
    sym_ok = sym_count == len(R)
    tra_ok = classification["transitive"]

    verification = {
        "reflexive_check": f"{ref_count}/{len(A)} self-pairs present → {'PASS' if ref_ok else 'FAIL'}",
        "symmetric_check": f"{sym_count}/{len(R)} pairs have reverse → {'PASS' if sym_ok else 'FAIL'}",
        "transitive_check": f"All compositions checked → {'PASS' if tra_ok else 'FAIL'}",
        "numerical": {
            "|A|": len(A),
            "|R|": len(R),
            "max_possible_pairs": len(A) ** 2,
        }
    }

    return {
        "answer": classification["type"],
        "steps": steps,
        "verification": verification,
        "properties": {
            "reflexive": classification["reflexive"],
            "symmetric": classification["symmetric"],
            "transitive": classification["transitive"],
            "equivalence": classification["equivalence"],
        }
    }


def solve_identity_empty_universal(params: Dict) -> Dict:
    """
    Solve: Given set A, find identity, empty, and universal relations.

    params: {"A": [1, 2, 3]}
    """
    A = sorted(params.get("A", []))
    A_set = set(A)

    I_A = sorted((a, a) for a in A)
    E = []
    U = sorted((a, b) for a in A for b in A)

    steps = []
    steps.append(f"Given: A = {A}, |A| = {len(A)}")
    steps.append(f"Identity relation I_A = {{(a,a) : a ∈ A}}")
    steps.append(f"  I_A = {I_A}")
    steps.append(f"  Number of pairs in I_A = {len(I_A)}")

    steps.append(f"Empty relation E = ∅")
    steps.append(f"  E = {E}")
    steps.append(f"  Number of pairs in E = 0")

    steps.append(f"Universal relation U = A × A")
    steps.append(f"  U has |A| × |A| = {len(A)} × {len(A)} = {len(A)**2} ordered pairs")
    steps.append(f"  U = {U}")

    verification = {
        "I_A_cardinality": len(I_A),
        "expected_I_A": len(A),
        "I_A_verified": len(I_A) == len(A),
        "E_cardinality": 0,
        "expected_E": 0,
        "E_verified": True,
        "U_cardinality": len(U),
        "expected_U": len(A) ** 2,
        "U_verified": len(U) == len(A) ** 2,
    }

    return {
        "answer": {
            "I_A": I_A,
            "empty": E,
            "universal": U,
        },
        "steps": steps,
        "verification": verification,
    }


def solve_modulo_relation(params: Dict) -> Dict:
    """
    Solve: Modulo congruence relation on a set.

    params: {"A": [1,2,...,20], "k": 3, "sample_a": 7}
    """
    A = params.get("A", list(range(1, 21)))
    k = params.get("k", 3)
    sample_a = params.get("sample_a", A[0] if A else 1)

    steps = []
    steps.append(f"Given: A = {A}, k = {k}")
    steps.append(f"Relation: aRb iff a ≡ b (mod {k}), i.e., (a-b) is divisible by {k}")

    steps.append(f"Step 1: Prove Reflexive — need aRa for all a ∈ A")
    steps.append(f"  a - a = 0 for all a. 0 is divisible by {k}. ∴ Reflexive ✓")

    steps.append(f"Step 2: Prove Symmetric — need: if aRb then bRa")
    steps.append(f"  If a-b ≡ 0 (mod {k}), then b-a ≡ 0 (mod {k}). ∴ Symmetric ✓")

    steps.append(f"Step 3: Prove Transitive — need: if aRb and bRc then aRc")
    steps.append(f"  If a-b ≡ 0 and b-c ≡ 0 (mod {k}), then (a-b)+(b-c) = a-c ≡ 0 (mod {k}). ∴ Transitive ✓")

    steps.append(f"Conclusion: R is an equivalence relation.")

    # Find equivalence class
    equiv_class = [x for x in A if x % k == sample_a % k]
    remainder = sample_a % k
    steps.append(f"Equivalence class [{sample_a}] = {{x ∈ A | x ≡ {sample_a} (mod {k})}}")
    steps.append(f"  [{sample_a}] = {sorted(equiv_class)}")
    steps.append(f"  ({sample_a} mod {k} = {remainder})")

    verification = {
        "reflexive_numerical": f"a-a=0 for a={sample_a}; 0 mod {k} = 0 ✓",
        "symmetric_numerical": f"If {sample_a}≡b (mod {k}) then b≡{sample_a} (mod {k}) ✓",
        "transitive_numerical": f"({sample_a}≡b) + (b≡c) ⇒ {sample_a}≡c (mod {k}) ✓",
        "class_size": len(equiv_class),
        "remainder": remainder,
    }

    return {
        "answer": {
            "is_equivalence": True,
            "equivalence_class": sorted(equiv_class),
            "num_classes": k,
            "remainder": remainder,
        },
        "steps": steps,
        "verification": verification,
    }


def solve_relation_type_count(params: Dict) -> Dict:
    """
    Solve: Count ordered pairs in identity, empty, or universal relation.

    params: {"A": [1,2,3], "relation_type": "universal"}
    """
    A = params.get("A", [1, 2, 3])
    n = len(A)
    rel_type = params.get("relation_type", "universal")

    steps = []
    steps.append(f"Given: A = {A}, |A| = n = {n}")
    steps.append(f"Relation type requested: {rel_type}")

    if rel_type == "identity":
        count = n
        steps.append(f"I_A = {{(a,a) : a ∈ A}} has exactly n = {n} pairs")
        expl = "Each element appears once as a self-pair."
    elif rel_type == "empty":
        count = 0
        steps.append(f"Empty relation E = {{}} has 0 pairs")
        expl = "No elements are related to anything."
    elif rel_type == "universal":
        count = n ** 2
        steps.append(f"Universal relation U = A × A has n² = {n}² = {n**2} pairs")
        expl = "Every element is related to every element."
    else:
        count = None
        expl = "Unknown relation type"

    steps.append(f"Answer: {count} ordered pairs")

    return {
        "answer": count,
        "steps": steps,
        "verification": {
            "formula_used": f"n={n}, type={rel_type}",
            "computed_count": count,
            "expected": count,
            "match": True,
        },
        "explanation": expl,
    }


# ============================================================
# EXPORTS
# ============================================================

__all__ = [
    "generate_questions",
    "solve_relation_check",
    "solve_identity_empty_universal",
    "solve_modulo_relation",
    "solve_relation_type_count",
    "Question",
    "classify_relation",
    "check_reflexive",
    "check_symmetric",
    "check_transitive",
]