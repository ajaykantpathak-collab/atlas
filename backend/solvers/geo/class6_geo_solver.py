"""
Class 6 Geography — Solver Engine
Covers nodes: c6_geo_001, c6_geo_002, c6_geo_003
Indian curriculum (CISCE Upper Primary / CBSE aligned)

Provides answer verification, step-by-step feedback, scoring, and
mastery tracking for all question types used in the generator.
"""

from __future__ import annotations
import re
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Any
from enum import Enum


# ─── Enums ──────────────────────────────────────────────────────────────────

class NodeID(Enum):
    MAPS_INTRO      = "c6_geo_001"
    MAP_VS_SKETCH   = "c6_geo_002"
    IMPORTANCE_MAPS = "c6_geo_003"

NODE_LABELS = {
    "c6_geo_001": "Maps — Introduction",
    "c6_geo_002": "Map vs Sketch vs Plan vs Globe",
    "c6_geo_003": "Importance of Maps",
}

class Difficulty(Enum):
    EASY   = "Easy"
    MEDIUM = "Medium"
    HARD   = "Hard"

class QType(Enum):
    MCQ         = "Multiple Choice"
    FIB         = "Fill in the Blanks"
    TRUE_FALSE  = "True / False"
    MATCH       = "Match the Following"
    SHORT_ANS   = "Short Answer"
    VSHORT_ANS  = "Very Short Answer"


# ─── Data Models ─────────────────────────────────────────────────────────────

@dataclass
class Question:
    """A single geography question."""
    qid: str                         # unique id  e.g. "001_MCQ_01"
    node: str                        # "c6_geo_001" etc.
    difficulty: str                  # Easy / Medium / Hard
    qtype: str                       # MCQ / Fill in the Blanks / …
    question: str                    # question text
    options: Optional[List[str]] = None          # MCQ options  [A, B, C, D]
    correct: Any = None              # correct answer (str for MCQ/FIB, bool for T/F,
                                     # list[(int,int)] for Match, list[str] keywords)
    marks: int = 1
    explanation: str = ""            # step-by-step solution
    keywords: List[str] = field(default_factory=list)  # for short-answer checking
    left_items: Optional[List[str]] = None    # Match column A
    right_items: Optional[List[str]] = None   # Match column B
    correct_pairs: Optional[List[Tuple[int, int]]] = None  # (A-index, B-index)


@dataclass
class AnswerResult:
    """Result of checking a student's answer."""
    is_correct: bool
    score: float                     # 0.0 to marks
    feedback: str                    # human-readable feedback
    correct_answer: Any
    explanation: str
    partial: bool = False            # True if partially correct (short answer)


# ─── Solver ──────────────────────────────────────────────────────────────────

class GeoSolver:
    """
    Checks student answers against the correct answer and produces
    step-by-step feedback.  Works for all question types in the
    Class 6 Geography question bank.
    """

    # ── public entry point ───────────────────────────────────────────────

    def check(self, q: Question, answer: Any) -> AnswerResult:
        """Route to the correct checker based on question type."""
        dispatch = {
            "MCQ":              self._check_mcq,
            "Fill in the Blanks": self._check_fib,
            "True / False":     self._check_tf,
            "Match the Following": self._check_match,
            "Very Short Answer": self._check_vshort,
            "Short Answer":     self._check_short,
        }
        checker = dispatch.get(q.qtype, self._check_generic)
        return checker(q, answer)

    # ── individual checkers ──────────────────────────────────────────────

    def _check_mcq(self, q: Question, answer: str) -> AnswerResult:
        correct = str(q.correct).strip().upper()
        given   = str(answer).strip().upper()
        # allow A or a, 1, "A", etc.
        if given and given[0] in "1234ABCD":
            given = given[0]
        ok = (given == correct)
        feedback = (
            "Correct! Well done."
            if ok
            else f"Incorrect. The right answer is {q.correct}. {q.explanation}"
        )
        return AnswerResult(
            is_correct=ok,
            score=q.marks if ok else 0.0,
            feedback=feedback,
            correct_answer=q.correct,
            explanation=q.explanation,
        )

    def _check_fib(self, q: Question, answer: str) -> AnswerResult:
        correct = str(q.correct).strip().lower()
        given   = str(answer).strip().lower()
        # normalise whitespace & articles
        for word in ["a ", "an ", "the "]:
            correct = correct.replace(word, "")
            given   = given.replace(word,  "")
        ok = (given == correct) or correct in given
        feedback = (
            "Correct!"
            if ok
            else f"Not quite. The correct answer is '{q.correct}'. {q.explanation}"
        )
        return AnswerResult(
            is_correct=ok,
            score=q.marks if ok else 0.0,
            feedback=feedback,
            correct_answer=q.correct,
            explanation=q.explanation,
        )

    def _check_tf(self, q: Question, answer: Any) -> AnswerResult:
        correct = bool(q.correct)
        given   = str(answer).strip().lower()
        if given in ("true", "t", "yes", "1"):
            given_bool = True
        elif given in ("false", "f", "no", "0"):
            given_bool = False
        else:
            given_bool = None
        ok = (given_bool == correct)
        label = "True" if correct else "False"
        feedback = (
            "Correct!"
            if ok
            else f"Incorrect. The statement is {label}. {q.explanation}"
        )
        return AnswerResult(
            is_correct=ok,
            score=q.marks if ok else 0.0,
            feedback=feedback,
            correct_answer=label,
            explanation=q.explanation,
        )

    def _check_match(self, q: Question, answer: Any) -> AnswerResult:
        """answer is a list of (A-index, B-index) tuples."""
        correct_pairs = set(q.correct_pairs or [])
        try:
            given_pairs = set(tuple(p) for p in answer)
        except TypeError:
            given_pairs = set()
        correct_count = len(correct_pairs & given_pairs)
        total          = len(correct_pairs)
        ok             = (correct_count == total)
        score          = (correct_count / total) * q.marks if total else 0
        right_list = ", ".join(
            f"{q.left_items[a]} → {q.right_items[b]}"
            for a, b in sorted(correct_pairs)
        )
        feedback = (
            f"All {total} pairs matched correctly!"
            if ok
            else f"{correct_count}/{total} pairs correct. Correct matching:\n  {right_list}"
        )
        return AnswerResult(
            is_correct=ok,
            score=score,
            feedback=feedback,
            correct_answer=q.correct_pairs,
            explanation=q.explanation,
            partial=(not ok and correct_count > 0),
        )

    def _check_vshort(self, q: Question, answer: str) -> AnswerResult:
        return self._check_keywords(q, answer, require_all=True)

    def _check_short(self, q: Question, answer: str) -> AnswerResult:
        return self._check_keywords(q, answer, require_all=False)

    def _check_keywords(
        self, q: Question, answer: str, require_all: bool
    ) -> AnswerResult:
        if not q.keywords:
            return AnswerResult(
                is_correct=True, score=q.marks,
                feedback="(no automatic keywords — teacher review needed)",
                correct_answer=q.correct, explanation=q.explanation,
            )
        ans_lower = answer.lower()
        found = [kw for kw in q.keywords if kw.lower() in ans_lower]
        ratio = len(found) / len(q.keywords)
        ok = ratio >= (1.0 if require_all else 0.5)
        score = ratio * q.marks
        missing = [kw for kw in q.keywords if kw not in found]
        feedback_parts = []
        if ok:
            feedback_parts.append("Good answer! Key points covered.")
        else:
            feedback_parts.append(
                "Partially correct."
                if missing
                else "Not quite right."
            )
        if missing:
            feedback_parts.append(
                f"Missing/weak: {', '.join(missing)}."
            )
        feedback_parts.append(q.explanation)
        return AnswerResult(
            is_correct=ok, score=score,
            feedback=" ".join(feedback_parts),
            correct_answer=q.keywords,
            explanation=q.explanation,
            partial=(not ok and len(found) > 0),
        )

    def _check_generic(self, q: Question, answer: Any) -> AnswerResult:
        ok = (str(answer).strip().lower() == str(q.correct).strip().lower())
        return AnswerResult(
            is_correct=ok,
            score=q.marks if ok else 0.0,
            feedback="Correct!" if ok else f"Expected: {q.correct}",
            correct_answer=q.correct,
            explanation=q.explanation,
        )

    # ── batch grading ────────────────────────────────────────────────────

    def grade_paper(
        self, questions: List[Question], answers: Dict[str, Any]
    ) -> Tuple[float, float, List[AnswerResult]]:
        """
        Grade a whole paper.
        Returns (obtained_marks, total_marks, list_of_results).
        """
        results: List[AnswerResult] = []
        total = sum(q.marks for q in questions)
        obtained = 0.0
        for q in questions:
            ans = answers.get(q.qid)
            res = self.check(q, ans)
            results.append(res)
            obtained += res.score
        return round(obtained, 2), total, results

    # ── step-by-step explanation ─────────────────────────────────────────

    def explain(self, q: Question) -> str:
        """Return a formatted step-by-step solution."""
        lines = [f"Q{q.qid}: {q.question}", f"\nCorrect Answer: {q.correct}"]
        if q.options:
            lines.append("\nOptions:")
            for i, opt in enumerate(q.options):
                marker = "✓" if opt.startswith(str(q.correct)) else " "
                lines.append(f"  {marker} {opt}")
        if q.explanation:
            lines.append(f"\nReasoning:\n{q.explanation}")
        return "\n".join(lines)


# ─── Mastery Tracker ─────────────────────────────────────────────────────────

class MasteryTracker:
    """Track per-node mastery based on recent answers."""

    def __init__(self):
        self._records: Dict[str, List[bool]] = {}  # qid → list of correctness

    def record(self, qid: str, is_correct: bool):
        self._records.setdefault(qid, []).append(is_correct)

    def node_mastery(self, node: str) -> float:
        hits = [
            c for qid, rec in self._records.items()
            for c in rec
            if qid.startswith(node)
        ]
        if not hits:
            return 0.0
        return round(sum(hits) / len(hits), 2)

    def overall_mastery(self) -> float:
        all_hits = [c for rec in self._records.values() for c in rec]
        if not all_hits:
            return 0.0
        return round(sum(all_hits) / len(all_hits), 2)

# -- solver contract --------------------------------------------
def solve(node_id: str = "", params: dict | None = None, **kw):
    """Check/explain c6 geo questions via GeoSolver."""
    params = params or {}
    s = GeoSolver()
    q = params.get("question") or params.get("q") or {}
    if params.get("explain"):
        return {"explanation": s.explain(q)}
    if "answer" in params or "user_answer" in params:
        r = s.check(q, params.get("answer", params.get("user_answer")))
        return r if isinstance(r, dict) else getattr(r, "__dict__", {"result": str(r)})
    return {"node_id": node_id, "hint": "pass question + answer to check, or explain=1"}

def check_answer(question=None, user_answer: str = "", **kw):
    return GeoSolver().check(question, user_answer)

SOLVER_REGISTRY = {"c6_geo_solve": solve, "c6_geo_check": check_answer}
NODE_MAP = {"c6_geo_001": "c6_geo_solve", "c6_geo_002": "c6_geo_solve", "c6_geo_003": "c6_geo_solve"}
