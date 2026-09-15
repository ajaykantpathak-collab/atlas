"""
Solver for ICSE Class 6 Computer Studies
Nodes: c6_cs_001 (Categories of Computers),
       c6_cs_002 (Computer Languages),
       c6_cs_003 (Translators)

Deterministic step-by-step solver with verification.
No LLM in computation.
"""

from __future__ import annotations

import re
import random
import hashlib
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Tuple, Any
from enum import Enum
import math

# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

class NodeID(Enum):
    CATEGORIES   = "c6_cs_001"
    LANGUAGES    = "c6_cs_002"
    TRANSLATORS  = "c6_cs_003"

class QuestionType(Enum):
    MCQ          = "mcq"
    FILL_BLANK   = "fill_blank"
    MATCH_COL    = "match_columns"
    TRUE_FALSE   = "true_false"
    SHORT_ANSWER = "short_answer"
    ARRANGE      = "arrange"

class Difficulty(Enum):
    EASY   = "easy"
    MEDIUM = "medium"
    HARD   = "hard"

@dataclass
class Question:
    node_id: str
    q_type: str
    text: str
    options: List[str] = field(default_factory=list)
    correct: str = ""
    alt_correct: List[str] = field(default_factory=list)
    explanation: str = ""
    marks: float = 1.0
    difficulty: str = "medium"
    keywords: List[str] = field(default_factory=list)
    steps: List[str] = field(default_factory=list)

@dataclass
class SolveResult:
    is_correct: bool
    partial_credit: float
    awarded: float
    total: float
    correct_answer: str
    student_answer: str
    explanation: str
    step_by_step: List[str]
    feedback: str
    matched_keywords: List[str]
    missed_keywords: List[str]


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

_KB: Dict[str, Dict[str, Any]] = {
    # ── Node c6_cs_001 ──────────────────────────────────────────────────
    "c6_cs_001": {
        "name": "Categories of Computers",
        "categories": {
            "microcomputer": {
                "alt": ["micro", "pc", "personal computer"],
                "size_order": 1,
                "users": "single person (1 user)",
                "speed": "slowest among the four",
                "examples": ["Desktop PC", "Laptop", "Tablet", "Smartwatch"],
                "use_case": "Personal use – browsing, documents, gaming",
                "analogy": "like a personal assistant — one person uses it",
            },
            "minicomputer": {
                "alt": ["mini", "mid-range server"],
                "size_order": 2,
                "users": "small group (tens of users)",
                "speed": "faster than microcomputer",
                "examples": ["Mid-range server", "Departmental server"],
                "use_case": "Small business or department use",
                "analogy": "like a team server — a small group uses it",
            },
            "mainframe": {
                "alt": ["main frame"],
                "size_order": 3,
                "users": "hundreds of users simultaneously",
                "speed": "very fast, high processing power",
                "examples": ["IBM z16", "Bank server", "Airline reservation system"],
                "use_case": "Large organisations – banks, airlines, government",
                "analogy": "like a company server — hundreds use it simultaneously",
            },
            "supercomputer": {
                "alt": ["super computer"],
                "size_order": 4,
                "users": "specialised tasks (research labs)",
                "speed": "fastest — billions of calculations per second",
                "examples": ["PARAM", "Fugaku", "Summit"],
                "use_case": "Weather forecasting, space research, scientific simulation",
                "analogy": "like a giant brain — does billions of calculations/sec",
            },
        },
        "key_facts": [
            "Computers are classified by SIZE, SPEED, and PROCESSING POWER",
            "Order from smallest to largest: Micro < Mini < Mainframe < Supercomputer",
            "Microcomputer is used by ONE person",
            "Minicomputer is used by a SMALL GROUP",
            "Mainframe is used by HUNDREDS simultaneously",
            "Supercomputer is used for WEATHER FORECASTING and SCIENTIFIC RESEARCH",
            "A laptop is a microcomputer",
            "A smartwatch chip is also a microcomputer",
            "Banks and airlines use MAINFRAMES",
        ],
    },

    # ── Node c6_cs_002 ──────────────────────────────────────────────────
    "c6_cs_002": {
        "name": "Computer Languages",
        "languages": {
            "machine language": {
                "alt": ["machine code", "binary language", "low-level language"],
                "representation": "Binary code (only 0s and 1s)",
                "human_readable": False,
                "translation_needed": "No — CPU executes directly",
                "examples": ["10101010", "11001100"],
                "difficulty_for_human": "Very difficult",
                "portable": False,
            },
            "assembly language": {
                "alt": ["assembler language", "low-level language"],
                "representation": "Short mnemonic codes (ADD, SUB, MOV, DIV, etc.)",
                "human_readable": True,
                "translation_needed": "Assembler",
                "examples": ["ADD AX, BX", "MOV CX, 10", "SUB DX, AX"],
                "difficulty_for_human": "Difficult but easier than binary",
                "portable": False,
            },
            "high-level language": {
                "alt": ["high level language", "hll"],
                "representation": "English-like statements",
                "human_readable": True,
                "translation_needed": "Compiler or Interpreter",
                "examples": ["Java", "C++", "Python", "Scratch blocks"],
                "difficulty_for_human": "Easy — close to English",
                "portable": True,
            },
        },
        "key_facts": [
            "Machine language uses ONLY 0s and 1s (binary)",
            "Assembly language uses MNEMONICS (ADD, SUB, MOV)",
            "High-level language uses ENGLISH-LIKE statements",
            "Machine language is the ONLY language CPU understands directly",
            "High-level languages are PORTABLE across different computers",
            "Assembly language needs an ASSEMBLER to translate",
            "High-level languages need a COMPILER or INTERPRETER to translate",
            "Evolution: Machine → Assembly → High-Level (becoming easier for humans)",
        ],
        "generations": [
            "1GL (First Generation Language) = Machine Language (binary)",
            "2GL (Second Generation Language) = Assembly Language (mnemonics)",
            "3GL (Third Generation Language) = High-Level Language (English-like)",
        ],
    },

    # ── Node c6_cs_003 ──────────────────────────────────────────────────
    "c6_cs_003": {
        "name": "Translators",
        "translators": {
            "compiler": {
                "alt": ["compilers"],
                "how_it_works": "Translates the ENTIRE program at once into machine code (object code) before execution",
                "speed_execution": "Fast — because entire program is already translated",
                "error_reporting": "Shows ALL errors after scanning the full program",
                "translation_unit": "Whole program",
                "languages": ["C", "C++", "Java"],
                "output": "Object code / executable file (.exe, .class)",
                "memory": "Needs more memory (stores entire translated code)",
                "debugging": "Harder — errors found only after full scan",
            },
            "interpreter": {
                "alt": ["interpreters"],
                "how_it_works": "Translates and executes the program LINE BY LINE",
                "speed_execution": "Slower — each line is translated before execution",
                "error_reporting": "Shows error IMMEDIATELY at the line where it occurs",
                "translation_unit": "One line at a time",
                "languages": ["Python", "BASIC", "JavaScript"],
                "output": "No object code — direct execution",
                "memory": "Less memory needed (no stored object code)",
                "debugging": "Easier — error found immediately",
            },
            "assembler": {
                "alt": ["assemblers"],
                "how_it_works": "Translates ASSEMBLY LANGUAGE (mnemonics) into MACHINE CODE (binary)",
                "speed_execution": "N/A (translates once, then runs)",
                "error_reporting": "Shows syntax errors during translation",
                "translation_unit": "One instruction at a time",
                "languages": ["Assembly (ADD, MOV, SUB, etc.)"],
                "output": "Machine code (binary / object code)",
                "memory": "Low memory",
                "debugging": "Moderate",
            },
        },
        "key_facts": [
            "Compiler translates the WHOLE program at once",
            "Interpreter translates LINE BY LINE",
            "Assembler translates ASSEMBLY language into MACHINE code",
            "Compiler produces an OBJECT/EXECUTABLE file",
            "Interpreter does NOT produce an object file",
            "Interpreter reports errors IMMEDIATELY (line by line)",
            "Compiler reports errors AFTER scanning the entire program",
            "Python uses an INTERPRETER",
            "C and C++ use a COMPILER",
            "Assembly language needs an ASSEMBLER",
            "All three are TRANSLATORS — they convert programs into machine code",
        ],
    },
}


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

def _norm(s: str) -> str:
    """Lower-case, strip, collapse whitespace, remove trailing punctuation."""
    s = s.strip().lower()
    s = re.sub(r"[\.\,\!\?\;]+$", "", s)          # trailing punctuation
    s = re.sub(r"\s+", " ", s)                    # collapse whitespace
    return s

def _token_set(s: str) -> set:
    return set(re.findall(r"[a-z0-9]+", _norm(s)))

def _fuzzy_match(student: str, correct: str, alts: List[str]) -> Tuple[bool, float]:
    """Return (exact_or_alt_match, keyword_overlap_ratio)."""
    sn, cn = _norm(student), _norm(correct)
    if sn == cn:
        return True, 1.0
    for alt in alts:
        if sn == _norm(alt):
            return True, 1.0
    # keyword overlap
    tk_s, tk_c = _token_set(student), _token_set(correct)
    if not tk_c:
        return False, 0.0
    overlap = len(tk_s & tk_c) / len(tk_c)
    return False, overlap


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

class Class6CSSolver:
    """
    Deterministic solver — no randomness.
    Given a question object and a student answer,
    returns SolveResult with step-by-step reasoning.
    """

    # ── public API ──────────────────────────────────────────────────────

    def solve(
        self,
        question: Question,
        student_answer: str,
    ) -> SolveResult:
        """Dispatch to the correct node/type handler."""
        node = question.node_id
        qtype = question.q_type

        dispatch = {
            ("c6_cs_001", QuestionType.MCQ.value):        self._mcq,
            ("c6_cs_001", QuestionType.FILL_BLANK.value):  self._fill_blank,
            ("c6_cs_001", QuestionType.MATCH_COL.value):   self._match_col,
            ("c6_cs_001", QuestionType.TRUE_FALSE.value):  self._true_false,
            ("c6_cs_001", QuestionType.SHORT_ANSWER.value):self._short_answer,
            ("c6_cs_001", QuestionType.ARRANGE.value):     self._arrange,
            ("c6_cs_002", QuestionType.MCQ.value):         self._mcq,
            ("c6_cs_002", QuestionType.FILL_BLANK.value):  self._fill_blank,
            ("c6_cs_002", QuestionType.MATCH_COL.value):   self._match_col,
            ("c6_cs_002", QuestionType.TRUE_FALSE.value):  self._true_false,
            ("c6_cs_002", QuestionType.SHORT_ANSWER.value):self._short_answer,
            ("c6_cs_003", QuestionType.MCQ.value):         self._mcq,
            ("c6_cs_003", QuestionType.FILL_BLANK.value):  self._fill_blank,
            ("c6_cs_003", QuestionType.MATCH_COL.value):   self._match_col,
            ("c6_cs_003", QuestionType.TRUE_FALSE.value):  self._true_false,
            ("c6_cs_003", QuestionType.SHORT_ANSWER.value):self._short_answer,
        }
        handler = dispatch.get((node, qtype), self._short_answer)
        return handler(question, student_answer)

    # ── generic helpers ─────────────────────────────────────────────────

    def _matched_kw(self, student: str, keywords: List[str]) -> Tuple[List[str], List[str]]:
        """Split keywords into matched / missed."""
        norm_student = _norm(student)
        matched, missed = [], []
        for kw in keywords:
            if kw.lower() in norm_student:
                matched.append(kw)
            else:
                missed.append(kw)
        return matched, missed

    def _make_steps(
        self,
        question: Question,
        correct: str,
        student: str,
        matched: List[str],
        missed: List[str],
        is_correct: bool,
    ) -> List[str]:
        steps = [
            f"STEP 1 – Read the question carefully.",
            f"Question: {question.text}",
            f"STEP 2 – Recall relevant facts from the syllabus for node '{question.node_id}'.",
        ]
        kb = _KB.get(question.node_id, {})
        facts = kb.get("key_facts", [])[:3]
        for f in facts:
            steps.append(f"  • {f}")
        steps.append(f"STEP 3 – Identify the correct answer.")
        steps.append(f"  Correct answer: {correct}")
        steps.append(f"STEP 4 – Compare with student's answer: '{student}'.")
        if is_correct:
            steps.append("  ✔ Answer matches perfectly or via accepted alternatives.")
        else:
            steps.append("  ✘ Answer does NOT match.")
            if matched:
                steps.append(f"  Keywords present: {', '.join(matched)}")
            if missed:
                steps.append(f"  Keywords missing: {', '.join(missed)}")
        steps += question.steps
        return steps

    # ── per-type handlers ───────────────────────────────────────────────

    def _mcq(self, q: Question, ans: str) -> SolveResult:
        correct = _norm(q.correct)
        student = _norm(ans)
        is_correct = student == correct
        matched, missed = self._matched_kw(ans, q.keywords)
        overlap = len(matched) / max(len(q.keywords), 1) if q.keywords else (1.0 if is_correct else 0.0)
        partial = overlap

        feedback = "Correct! Well done." if is_correct else (
            f"Incorrect. The right answer is '{q.correct}'. {q.explanation}"
        )
        steps = self._make_steps(q, q.correct, ans, matched, missed, is_correct)

        return SolveResult(
            is_correct=is_correct,
            partial_credit=partial,
            awarded=q.marks if is_correct else partial * q.marks,
            total=q.marks,
            correct_answer=q.correct,
            student_answer=ans,
            explanation=q.explanation,
            step_by_step=steps,
            feedback=feedback,
            matched_keywords=matched,
            missed_keywords=missed,
        )

    def _fill_blank(self, q: Question, ans: str) -> SolveResult:
        alts = q.alt_correct if q.alt_correct else []
        is_correct, overlap = _fuzzy_match(ans, q.correct, alts)
        threshold = 0.6
        partial = overlap
        is_correct = overlap >= 0.85

        matched, missed = self._matched_kw(ans, q.keywords)
        feedback = "Correct!" if is_correct else (
            f"Partially correct (overlap {overlap:.0%}). The correct answer is: '{q.correct}'."
        )
        if not is_correct and partial >= threshold:
            feedback = f"Partially correct ({overlap:.0%} match). Full answer: '{q.correct}'."

        steps = self._make_steps(q, q.correct, ans, matched, missed, is_correct)
        steps.insert(4, f"STEP 3a – Normalise: '{_norm(ans)}' vs '{_norm(q.correct)}'")
        steps.insert(5, f"  Keyword overlap: {overlap:.0%}")

        return SolveResult(
            is_correct=is_correct,
            partial_credit=partial,
            awarded=q.marks if is_correct else (partial * q.marks if partial >= threshold else 0),
            total=q.marks,
            correct_answer=q.correct,
            student_answer=ans,
            explanation=q.explanation,
            step_by_step=steps,
            feedback=feedback,
            matched_keywords=matched,
            missed_keywords=missed,
        )

    def _true_false(self, q: Question, ans: str) -> SolveResult:
        correct = _norm(q.correct)
        student = _norm(ans)
        is_correct = student == correct
        matched, missed = self._matched_kw(ans, q.keywords)
        partial = 1.0 if is_correct else 0.0

        feedback = "Correct!" if is_correct else (
            f"Incorrect. The statement is '{q.correct}'. {q.explanation}"
        )
        steps = self._make_steps(q, q.correct, ans, matched, missed, is_correct)

        return SolveResult(
            is_correct=is_correct,
            partial_credit=partial,
            awarded=q.marks if is_correct else 0,
            total=q.marks,
            correct_answer=q.correct,
            student_answer=ans,
            explanation=q.explanation,
            step_by_step=steps,
            feedback=feedback,
            matched_keywords=matched,
            missed_keywords=missed,
        )

    def _short_answer(self, q: Question, ans: str) -> SolveResult:
        alts = q.alt_correct if q.alt_correct else []
        _, overlap = _fuzzy_match(ans, q.correct, alts)
        matched, missed = self._matched_kw(ans, q.keywords)
        kw_ratio = len(matched) / max(len(q.keywords), 1) if q.keywords else 0.0
        combined = 0.5 * overlap + 0.5 * kw_ratio
        is_correct = combined >= 0.75

        if combined >= 0.9:
            award = q.marks
        elif combined >= 0.6:
            award = 0.5 * q.marks
        else:
            award = 0.0

        feedback = "Excellent answer!" if combined >= 0.9 else (
            "Partially correct." if combined >= 0.6 else
            f"Incorrect. Expected: {q.correct}"
        )

        steps = self._make_steps(q, q.correct, ans, matched, missed, is_correct)
        steps.append(f"  Semantic overlap: {overlap:.0%}")
        steps.append(f"  Keyword match: {kw_ratio:.0%}")
        steps.append(f"  Combined score: {combined:.0%}")

        return SolveResult(
            is_correct=is_correct,
            partial_credit=combined,
            awarded=award,
            total=q.marks,
            correct_answer=q.correct,
            student_answer=ans,
            explanation=q.explanation,
            step_by_step=steps,
            feedback=feedback,
            matched_keywords=matched,
            missed_keywords=missed,
        )

    def _match_col(self, q: Question, ans: str) -> SolveResult:
        correct = _norm(q.correct)
        student = _norm(ans)
        is_correct = student == correct

        def parse_pairs(s: str) -> Dict[str, str]:
            pairs = {}
            for part in re.split(r"[,;]", s):
                part = part.strip()
                m = re.match(r"([a-z])[.\-–—\s]+(\d+)", part)
                if m:
                    pairs[m.group(1)] = m.group(2)
            return pairs

        cp = parse_pairs(q.correct)
        sp = parse_pairs(ans)
        total = len(cp)
        correct_count = sum(1 for k, v in cp.items() if sp.get(k) == v)
        partial = correct_count / max(total, 1)
        is_correct = partial == 1.0

        matched, missed = self._matched_kw(ans, q.keywords)
        feedback = f"All {total}/{total} pairs correct!" if is_correct else (
            f"{correct_count}/{total} pairs correct. Full answer: {q.correct}"
        )

        steps = self._make_steps(q, q.correct, ans, matched, missed, is_correct)
        steps.append(f"  Correct pairs: {correct_count}/{total}")

        return SolveResult(
            is_correct=is_correct,
            partial_credit=partial,
            awarded=partial * q.marks,
            total=q.marks,
            correct_answer=q.correct,
            student_answer=ans,
            explanation=q.explanation,
            step_by_step=steps,
            feedback=feedback,
            matched_keywords=matched,
            missed_keywords=missed,
        )

    def _arrange(self, q: Question, ans: str) -> SolveResult:
        correct = _norm(q.correct)
        student = _norm(ans)
        is_correct = student == correct

        def parse_order(s: str) -> List[str]:
            items = re.findall(r"(?:\d+[.)]\s*|,\s*)([^,0-9]+)", s.lower())
            if not items:
                items = [x.strip() for x in re.split(r"[,;]", s)]
            return [x.strip() for x in items if x.strip()]

        correct_order = parse_order(q.correct)
        student_order = parse_order(ans)
        total = len(correct_order)
        if total == 0 or len(student_order) != total:
            correct_count = 0
        else:
            correct_count = sum(
                1 for i, _ in enumerate(correct_order)
                if i < len(student_order) and _norm(student_order[i]) == _norm(correct_order[i])
            )
        partial = correct_count / max(total, 1)
        is_correct = partial == 1.0

        matched, missed = self._matched_kw(ans, q.keywords)
        feedback = "Correct order!" if is_correct else (
            f"{correct_count}/{total} in correct position. Correct order: {q.correct}"
        )

        steps = self._make_steps(q, q.correct, ans, matched, missed, is_correct)
        steps.append(f"  Items in correct position: {correct_count}/{total}")

        return SolveResult(
            is_correct=is_correct,
            partial_credit=partial,
            awarded=partial * q.marks,
            total=q.marks,
            correct_answer=q.correct,
            student_answer=ans,
            explanation=q.explanation,
            step_by_step=steps,
            feedback=feedback,
            matched_keywords=matched,
            missed_keywords=missed,
        )

    # ── model-answer generator ──────────────────────────────────────────

    def generate_model_answer(self, question: Question) -> str:
        """Return a model answer with reasoning for a given question."""
        lines = [f"Q: {question.text}", f"A: {question.correct}", ""]
        lines.append("Step-by-step reasoning:")
        kb = _KB.get(question.node_id, {})
        facts = kb.get("key_facts", [])
        for f in facts:
            if any(kw.lower() in f.lower() for kw in question.keywords):
                lines.append(f"  • {f}")
        lines.append(f"Explanation: {question.explanation}")
        return "\n".join(lines)

    # ── batch verification ──────────────────────────────────────────────

    def verify_batch(
        self, questions: List[Tuple[Question, str]]
    ) -> List[SolveResult]:
        """Run solver on a list of (question, student_answer) tuples."""
        return [self.solve(q, a) for q, a in questions]

    def score_report(self, results: List[SolveResult]) -> Dict[str, Any]:
        total_marks = sum(r.total for r in results)
        awarded = sum(r.awarded for r in results)
        correct = sum(1 for r in results if r.is_correct)
        return {
            "total_marks": total_marks,
            "awarded": round(awarded, 2),
            "percentage": round((awarded / total_marks) * 100, 1) if total_marks else 0,
            "correct_count": correct,
            "total_questions": len(results),
            "grade": self._grade((awarded / total_marks) * 100) if total_marks else "N/A",
        }

    @staticmethod
    def _grade(pct: float) -> str:
        if pct >= 90: return "A+"
        if pct >= 75: return "A"
        if pct >= 60: return "B"
        if pct >= 40: return "C"
        if pct >= 33: return "D"
        return "F"


# ──────────────────────────────────────────────────────────────────────────────
# ──────────────────────────────────────────────────────────────────────────────

_solver = Class6CSSolver()

def solve(question: Question, student_answer: str) -> SolveResult:
    return _solver.solve(question, student_answer)

def generate_model_answer(question: Question) -> str:
    return _solver.generate_model_answer(question)