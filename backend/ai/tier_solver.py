"""3-tier competency solver.

Tier 1: MiniLM match + regex extraction + SymPy (fast, free, local)
Tier 2: If Tier 1 fails → MiniLM match + DeepSeek extraction + SymPy
Tier 3: If Tier 2 fails → DeepSeek extraction + SymPy (no MiniLM)

In ALL tiers, SymPy does the math. The LLM only extracts variables.
"""
from __future__ import annotations

import logging
from typing import Optional
from dataclasses import dataclass, field

from backend.ai.unified_solver import solve_question, MatchedSolution
from backend.ai.competency_solver import (
    extract_values, ExtractedValues, StepResult, SolutionResult,
    _solve_tangent_normal, _solve_differentiation, _solve_integration,
    _solve_differential_equation, _solve_quadratic, _solve_matrix,
    _solve_linear_system, _solve_equivalence_relation, _solve_continuity,
    _solve_increasing_decreasing, _solve_kinematics, _solve_max_min,
    _solve_hcf_lcm, _solve_percentage, _solve_interest, _solve_ratio_proportion,
    _solve_set_theory, _solve_exponents, _solve_inequation,
    _solve_area_between_curves, _solve_homogeneous_ode, _solve_optimization,
)
from backend.ai.llm_extractor import llm_extract_sync

logger = logging.getLogger(__name__)

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
    "area_between_curves": _solve_area_between_curves,
    "homogeneous_ode": _solve_homogeneous_ode,
    "optimization": _solve_optimization,
}


@dataclass
class TierResult:
    """Result from the 3-tier solver."""
    question: str
    tier_used: int = 0                # 1, 2, or 3
    tier1_success: bool = False
    tier2_success: bool = False
    tier3_success: bool = False
    # Match info
    matched_question_text: str = ""
    matched_question_id: str = ""
    match_score: float = 0
    node_id: str = ""
    class_level: int = 0
    # Solution
    category: str = ""
    values: dict = field(default_factory=dict)
    steps: list[StepResult] = field(default_factory=list)
    model_answer: str = ""
    success: bool = False
    error: str = ""
    # Which extraction method was used
    extraction_method: str = ""       # "regex", "deepseek"


def _run_sympy_solver(category: str, vals: ExtractedValues, matched_score: float, marks: float = 0) -> tuple[list[StepResult], str]:
    """Run the SymPy solver for a category. Returns (steps, error)."""
    solver_fn = CATEGORY_SOLVERS.get(category)
    if solver_fn is None:
        return [], f"Category '{category}' not supported by SymPy solver"

    temp = SolutionResult(question="")
    temp.total_marks = marks
    solver_fn(vals, temp)
    return temp.steps, temp.error


def _llm_values_to_extracted(llm_data: dict) -> ExtractedValues:
    """Convert LLM-extracted JSON to ExtractedValues."""
    vals = ExtractedValues()
    vals.expression = llm_data.get("expression") or None
    vals.var = llm_data.get("var") or "x"
    vals.point = llm_data.get("point") or None
    vals.rhs = llm_data.get("rhs") or None
    vals.lower = llm_data.get("lower") or None
    vals.upper = llm_data.get("upper") or None
    vals.matrix_a = llm_data.get("matrix_a") or None
    vals.matrix_b = llm_data.get("matrix_b") or None
    vals.set_a = llm_data.get("set_a") or None
    vals.set_b = llm_data.get("set_b") or None
    vals.numbers = llm_data.get("numbers") or None

    # Raw fields
    if llm_data.get("curve1"):
        vals.raw["curve1"] = llm_data["curve1"]
    if llm_data.get("curve2"):
        vals.raw["curve2"] = llm_data["curve2"]
    if llm_data.get("ode_str"):
        vals.raw["ode_str"] = llm_data["ode_str"]
    if llm_data.get("initial_condition"):
        vals.raw["initial_condition"] = llm_data["initial_condition"]
    if llm_data.get("constraint"):
        vals.raw["constraint"] = llm_data["constraint"]
    if llm_data.get("divisible_by"):
        vals.raw["divisible_by"] = llm_data["divisible_by"]
    if llm_data.get("eq_class"):
        vals.raw["eq_class"] = llm_data["eq_class"]
    if llm_data.get("lines"):
        vals.raw["lines"] = llm_data["lines"]
    if llm_data.get("circle_eq"):
        vals.raw["circle_eq"] = llm_data["circle_eq"]
    if llm_data.get("find"):
        vals.raw["find"] = llm_data["find"]
    if llm_data.get("matrix_power"):
        vals.raw["matrix_power"] = llm_data["matrix_power"]

    # Merge all non-None fields into raw
    for k, v in vals.__dict__.items():
        if v is not None and k != "raw":
            vals.raw[k] = v

    return vals


def solve_3tier(question: str, class_level: Optional[int] = None) -> TierResult:
    """Solve a question using the 3-tier approach.

    Tier 1: MiniLM + regex + SymPy
    Tier 2: MiniLM + DeepSeek extraction + SymPy (if Tier 1 fails)
    Tier 3: DeepSeek extraction + SymPy (if Tier 2 fails or no match)
    """
    result = TierResult(question=question)

    # ─── TIER 1: MiniLM + regex + SymPy ───
    t1 = solve_question(question, class_level=class_level)

    result.matched_question_text = t1.matched_question_text
    result.matched_question_id = t1.matched_question_id
    result.match_score = t1.match_score
    result.node_id = t1.node_id
    result.class_level = t1.class_level
    result.model_answer = t1.model_answer

    if t1.success and t1.steps:
        result.tier1_success = True
        result.tier_used = 1
        result.category = t1.category
        result.values = t1.values
        result.steps = t1.steps
        result.success = True
        result.extraction_method = "regex"
        return result

    # Tier 1 failed — record what went wrong
    t1_error = t1.error or "No steps generated"
    logger.info(f"Tier 1 failed: {t1_error}. Trying Tier 2...")

    # ─── TIER 2: MiniLM match + DeepSeek extraction + SymPy ───
    # We still use the MiniLM match for category hints and model answer,
    # but DeepSeek extracts the values
    llm_data = llm_extract_sync(question)

    if llm_data:
        category = llm_data.get("category", "")
        # Normalize category
        if not category:
            category = t1.category

        vals = _llm_values_to_extracted(llm_data)
        steps, error = _run_sympy_solver(category, vals, result.match_score, marks=0)

        if steps and all(s.success for s in steps):
            result.tier2_success = True
            result.tier_used = 2
            result.category = category
            result.values = vals.raw
            result.steps = steps
            result.success = True
            result.extraction_method = "deepseek"
            return result

        t2_error = error or "SymPy solver failed with LLM-extracted values"
        logger.info(f"Tier 2 failed: {t2_error}. Trying Tier 3...")
    else:
        t2_error = "DeepSeek extraction returned None"
        logger.info(f"Tier 2 failed: {t2_error}. Trying Tier 3...")

    # ─── TIER 3: DeepSeek extraction + SymPy (no MiniLM) ───
    # If Tier 2 already tried DeepSeek extraction and the SymPy solver failed,
    # Tier 3 won't help unless the category was wrong.
    # But if Tier 2 failed because DeepSeek returned None (API error),
    # retry with a simpler prompt or use the matched category.

    if llm_data and t1.matched_question_text:
        # Try using the matched question's category with LLM-extracted values
        matched_category = t1.category
        if matched_category and matched_category != category:
            steps, error = _run_sympy_solver(matched_category, vals, result.match_score, marks=0)
            if steps and all(s.success for s in steps):
                result.tier3_success = True
                result.tier_used = 3
                result.category = matched_category
                result.values = vals.raw
                result.steps = steps
                result.success = True
                result.extraction_method = "deepseek+minilm_category"
                return result

    # All tiers failed
    result.error = f"Tier 1: {t1_error} | Tier 2: {t2_error} | Tier 3: no recovery"
    result.category = t1.category or (llm_data.get("category") if llm_data else "")
    result.values = t1.values
    return result
