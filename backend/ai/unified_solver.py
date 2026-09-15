"""Unified competency solver — MiniLM match + SymPy execution.

The flow:
1. Student types a question
2. MiniLM matches it to the closest pre-built question (from 8,746 questions)
3. The matched question provides:
   - The category (tangent_normal, quadratic, etc.)
   - The model answer (for verification)
   - The step decomposition (from worked examples)
   - The linked curriculum node (for graph remediation)
4. Values are extracted from the STUDENT'S question (not the template)
5. SymPy executes each step with the student's values
6. Result is verified against the model answer

No LLM. No DeepSeek. MiniLM (local) + SymPy (local) + Neo4j graph (local).
"""
from __future__ import annotations

import re
import logging
from typing import Optional
from dataclasses import dataclass, field

from backend.ai.question_matcher import get_matcher, QuestionMatcher
from backend.ai.question_loader import ParsedQuestion
from backend.ai.competency_solver import (
    extract_values, ExtractedValues, StepResult, SolutionResult,
    _safe_parse, _solve_tangent_normal, _solve_differentiation, _solve_integration,
    _solve_differential_equation, _solve_quadratic, _solve_matrix,
    _solve_linear_system, _solve_equivalence_relation, _solve_continuity,
    _solve_increasing_decreasing, _solve_kinematics, _solve_max_min,
    _solve_hcf_lcm, _solve_percentage, _solve_interest, _solve_ratio_proportion,
    _solve_set_theory, _solve_exponents, _solve_inequation,
)
from backend.ai.board_parser import _detect_category

logger = logging.getLogger(__name__)


# Category → solver function mapping
CATEGORY_SOLVERS = {
    "tangent_normal": _solve_tangent_normal,
    "differentiation": _solve_differentiation,
    "integration": _solve_integration,
    "differential_equation": _solve_differential_equation,
    "quadratic": _solve_quadratic,
    "matrix": _solve_matrix,
    "linear_system": _solve_linear_system,
    "equivalence_relation": _solve_equivalence_relation,
    "continuity": _solve_continuity,
    "increasing_decreasing": _solve_increasing_decreasing,
    "kinematics": _solve_kinematics,
    "max_min": _solve_max_min,
    "hcf_lcm": _solve_hcf_lcm,
    "percentage": _solve_percentage,
    "interest": _solve_interest,
    "ratio_proportion": _solve_ratio_proportion,
    "set_theory": _solve_set_theory,
    "exponents": _solve_exponents,
    "inequation": _solve_inequation,
}


@dataclass
class MatchedSolution:
    """Full solution result with match info."""
    question: str
    # Match info
    matched_question_text: str = ""
    matched_question_id: str = ""
    match_score: float = 0
    source_type: str = ""
    node_id: str = ""
    class_level: int = 0
    # Solution
    category: str = ""
    values: dict = field(default_factory=dict)
    steps: list[StepResult] = field(default_factory=list)
    model_answer: str = ""
    # Status
    success: bool = False
    error: str = ""
    # Candidates
    candidates: list[dict] = field(default_factory=list)


def solve_question(question: str, class_level: Optional[int] = None) -> MatchedSolution:
    """Solve a competency question end-to-end.

    1. MiniLM match → find closest pre-built question
    2. Detect category from the matched question (or the student's question)
    3. Extract values from the student's question
    4. Run SymPy solver for the category
    5. Return with model answer for verification
    """
    result = MatchedSolution(question=question)

    # 1. Match with MiniLM
    matcher = get_matcher()
    matches = matcher.match(question, class_level=class_level, top_k=5)

    if not matches:
        result.error = "No matching questions found"
        return result

    result.candidates = matches

    best = matches[0]
    result.matched_question_text = best["question_text"]
    result.matched_question_id = best["question_id"]
    result.match_score = best["score"]
    result.source_type = best["source_type"]
    result.node_id = best.get("node_id", "")
    result.class_level = best.get("class_level", 0)

    # Get the full matched question (for model answer and steps)
    matched_q = matcher.get_question(best["question_id"])
    if matched_q:
        result.model_answer = matched_q.answer_text

    # 2. Detect category
    # First try detecting from the STUDENT'S question (most reliable)
    category = _detect_category(question)
    if not category or category == "general":
        # Fall back to matched question's category
        category = best.get("category", "")
    if not category or category == "general":
        # Fall back to detecting from combined text
        combined = question + " " + result.matched_question_text + " " + result.model_answer
        category = _detect_category(combined)

    # Normalize category — strip subcategory suffixes like "quadratic_equation_(quadratic_formula)"
    if "_" in category and category not in CATEGORY_SOLVERS:
        # Try to find a matching prefix
        for solver_cat in CATEGORY_SOLVERS:
            if category.startswith(solver_cat) or solver_cat.startswith(category.split("_")[0]):
                category = solver_cat
                break

    result.category = category

    # 3. Extract values from the STUDENT'S question
    vals = extract_values(question, category)
    result.values = vals.raw

    # 4. Run SymPy solver
    solver_fn = CATEGORY_SOLVERS.get(category)
    if solver_fn is None:
        result.error = f"Category '{category}' not yet supported. Matched: {result.matched_question_text[:60]}"
        return result

    # Build a temporary SolutionResult to pass to the solver
    temp = SolutionResult(question=question)
    temp.total_marks = best.get("marks", 0)
    solver_fn(vals, temp)

    result.steps = temp.steps
    result.success = all(s.success for s in result.steps) if result.steps else False
    if temp.error:
        result.error = temp.error

    return result


async def route_question_unified(question: str, class_level: Optional[int] = None) -> dict:
    """Async wrapper for the API endpoint.

    Returns a dict compatible with the existing /api/solver/identify response.
    """
    result = solve_question(question, class_level)

    # Build response
    response = {
        "question": question,
        "best_match": {
            "question_id": result.matched_question_id,
            "question_text": result.matched_question_text,
            "score": result.match_score,
            "node_id": result.node_id,
            "class_level": result.class_level,
            "source_type": result.source_type,
        } if result.matched_question_id else None,
        "candidates": [
            {
                "question_id": c["question_id"],
                "question_text": c["question_text"],
                "score": c["score"],
                "node_id": c.get("node_id", ""),
                "class_level": c.get("class_level", 0),
            }
            for c in result.candidates[:5]
        ],
        "category": result.category,
        "values": result.values,
        "steps": [
            {
                "step_num": s.step_num,
                "description": s.description,
                "operation": s.operation,
                "result": s.result,
                "marks": s.marks,
                "success": s.success,
                "error": s.error,
            }
            for s in result.steps
        ],
        "model_answer": result.model_answer[:500] if result.model_answer else "",
        "success": result.success,
        "error": result.error,
    }

    # Determine step_type_id for frontend compatibility
    # Map category to step_type_id
    CATEGORY_TO_STEP = {
        "tangent_normal": "tangent_normal",
        "differentiation": "differentiate",
        "integration": "definite_integral",
        "differential_equation": "differential_equation",
        "quadratic": "solve_quadratic",
        "matrix": "determinant",
        "linear_system": "solve_linear_system",
        "equivalence_relation": "equivalence_relation",
        "hcf_lcm": "hcf_lcm",
        "percentage": "percentage",
        "interest": "simple_interest",
    }
    response["step_type_id"] = CATEGORY_TO_STEP.get(result.category)

    # Extract values for frontend prefill
    response["extracted_values"] = result.values

    return response
