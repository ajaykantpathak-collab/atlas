"""Final solver — the complete pipeline.

Flow:
1. Check stored DeepSeek solutions (instant if we've solved this before)
2. MiniLM match to pre-built question bank
   - High confidence (>0.85): use bank's category + form, student fills values
   - Medium (0.5-0.85): use bank's category, student fills values
   - Low (<0.5): DeepSeek identifies category
3. Student fills in the form (expression, point, bounds, etc.)
4. SymPy computes with student's values
5. If SymPy can't compute (unsupported category):
   - Use model answer from matched question if available
   - Otherwise: DeepSeek generates worked solution
6. Store any DeepSeek-generated solution + embed it for future matching

The student ALWAYS fills in values. The LLM NEVER does math.
DeepSeek only: (a) identifies category for unseen questions, (b) generates
worked solutions for unsupported categories when no model answer exists.
"""
from __future__ import annotations

import logging
from typing import Optional
from dataclasses import dataclass, field

from backend.ai.question_matcher import get_matcher, QuestionMatcher
from backend.ai.question_loader import ParsedQuestion
from backend.ai.competency_solver import (
    ExtractedValues, StepResult, SolutionResult,
    _solve_tangent_normal, _solve_differentiation, _solve_integration,
    _solve_differential_equation, _solve_quadratic, _solve_matrix,
    _solve_linear_system, _solve_equivalence_relation, _solve_continuity,
    _solve_increasing_decreasing, _solve_kinematics, _solve_max_min,
    _solve_hcf_lcm, _solve_percentage, _solve_interest, _solve_ratio_proportion,
    _solve_set_theory, _solve_exponents, _solve_inequation,
    _solve_area_between_curves, _solve_homogeneous_ode, _solve_optimization,
)
from backend.ai.stem_solvers import (
    solve_phy_kinematics, solve_phy_newtons_laws, solve_phy_energy,
    solve_phy_electricity, solve_chem_moles, solve_chem_molarity,
    solve_chem_ph, solve_chem_gas, solve_chem_dilution,
)
from backend.ai.board_parser import _detect_category
from backend.ai.llm_extractor import (
    llm_extract_sync, llm_solve_question_sync, llm_generate_solver_sync,
)
from backend.ai.pattern_store import get_pattern_store
from backend.ai.generated_solvers import get_solver_store

logger = logging.getLogger(__name__)

# All SymPy solvers we have
SYMPY_SOLVERS = {
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
    # Physics solvers
    "phy_kinematics": solve_phy_kinematics,
    "phy_newtons_laws": solve_phy_newtons_laws,
    "phy_energy": solve_phy_energy,
    "phy_electricity": solve_phy_electricity,
    # Chemistry solvers
    "chem_moles": solve_chem_moles,
    "chem_molarity": solve_chem_molarity,
    "chem_ph": solve_chem_ph,
    "chem_gas": solve_chem_gas,
    "chem_dilution": solve_chem_dilution,
}

# Categories SymPy can't handle — need model answer or DeepSeek
UNSUPPORTED_CATEGORIES = {
    "proof", "case_study", "construction", "trig_identity",
    "general", "vector", "probability", "progression",
    "circle", "partial_fraction",
}


@dataclass
class SolveResult:
    """Complete result from the solver."""
    question: str
    # What path was taken
    path: str = ""              # "stored", "sympy", "model_answer", "deepseek"
    # Match info
    matched_question_text: str = ""
    matched_question_id: str = ""
    match_score: float = 0
    node_id: str = ""
    class_level: int = 0
    model_answer: str = ""
    # Category + form
    category: str = ""
    form_fields: list[dict] = field(default_factory=list)  # fields student fills
    # Solution
    steps: list[StepResult] = field(default_factory=list)
    worked_solution: str = ""    # for model_answer / deepseek paths
    # Status
    success: bool = False
    needs_student_input: bool = False  # if True, student must fill form first
    error: str = ""
    # Source
    source: str = ""             # "stored", "sympy", "model_answer", "deepseek"


def identify_question(question: str, class_level: Optional[int] = None) -> SolveResult:
    """Step 1: Identify the question — match, detect category, prepare form.

    This is called when the student types a question.
    Returns the category and form fields the student needs to fill.
    Does NOT compute anything yet.

    Matching priority:
    1. Pattern store (instant — same question type seen before)
    2. MiniLM match to question bank (category + model answer)
    3. DeepSeek identifies category (only for genuinely unseen question types)
    """
    result = SolveResult(question=question, needs_student_input=True)

    # ── 1. Check pattern store first (instant, no API) ──
    pattern_store = get_pattern_store()
    pattern_match = pattern_store.match(question)
    if pattern_match and pattern_match.get("category"):
        result.path = "pattern"
        result.source = "pattern"
        result.category = pattern_match.get("category", "")
        result.class_level = pattern_match.get("class_level", 0)
        result.form_fields = pattern_match.get("form_fields", [])
        result.success = True
        # Student still fills in values — pattern just tells us the category + form
        logger.info(f"Pattern match for: '{question[:50]}...'")
        return result

    # ── 2. Detect category from question text (fast, no model) ──
    category = _detect_category(question)

    # ── 3. If category detected, build form and return (no matcher needed) ──
    if category and category != "general":
        result.category = category
        result.form_fields = _build_form_fields(category)
        return result

    # ── 4. Category unknown — try MiniLM match for category + model answer ──
    matcher = get_matcher()
    matches = matcher.match(question, class_level=class_level, top_k=5)

    if matches:
        best = matches[0]
        result.matched_question_text = best["question_text"]
        result.matched_question_id = best["question_id"]
        result.match_score = best["score"]
        result.node_id = best.get("node_id", "")
        result.class_level = best.get("class_level", 0)

        # Get model answer from matched question
        matched_q = matcher.get_question(best["question_id"])
        if matched_q:
            result.model_answer = matched_q.answer_text

        # Try category from matched question
        if not category or category == "general":
            category = matches[0].get("category", "")
    if not category or category == "general":
        combined = question + " " + result.matched_question_text + " " + result.model_answer
        category = _detect_category(combined)
    if (not category or category == "general") and result.match_score < 0.5:
        # Last resort: DeepSeek identifies category
        llm_data = llm_extract_sync(question)
        if llm_data:
            category = llm_data.get("category", "")
            result.form_fields = _build_form_fields(category, llm_data)
            result.category = category

            # Store this new pattern for future use
            pattern_store.add(question, category, result.form_fields, class_level or 0)
            logger.info(f"Stored new pattern from DeepSeek: '{question[:50]}...'")
            return result

    result.category = category

    # ── Build form fields for student to fill ──
    result.form_fields = _build_form_fields(category)

    return result


def compute_solution(question: str, category: str, student_values: dict,
                     class_level: Optional[int] = None) -> SolveResult:
    """Step 2: Compute the solution using SymPy with student-provided values.

    Called after the student fills in the form.
    """
    result = SolveResult(question=question, category=category, path="sympy")

    # Check if we have a SymPy solver for this category
    solver_fn = SYMPY_SOLVERS.get(category)
    if solver_fn is None or category in UNSUPPORTED_CATEGORIES:
        # No SymPy solver — try cache, model answer, then DeepSeek
        return _fallback_solution(question, category, class_level, result, student_values)

    # Build ExtractedValues from student's input
    vals = _student_values_to_extracted(student_values, category)

    # Run SymPy with a timeout (some integrals hang forever)
    temp = SolutionResult(question=question)
    import threading
    error_box = {"error": None}

    def _run_sympy():
        try:
            solver_fn(vals, temp)
        except Exception as e:
            error_box["error"] = str(e)

    thread = threading.Thread(target=_run_sympy, daemon=True)
    thread.start()
    thread.join(timeout=10.0)  # 10 second timeout

    if thread.is_alive():
        # SymPy is still running — it hung. Fall back.
        logger.warning(f"SymPy timed out (10s) for: '{question[:50]}...'")
        result.error = "SymPy computation timed out"
        return _fallback_solution(question, category, class_level, result, student_values)

    if error_box["error"]:
        result.error = error_box["error"]
        return _fallback_solution(question, category, class_level, result, student_values)

    if temp.steps and all(s.success for s in temp.steps):
        result.steps = temp.steps
        result.success = True
        result.source = "sympy"
        return result

    # SymPy failed — try model answer, then DeepSeek
    result.error = temp.error
    return _fallback_solution(question, category, class_level, result, student_values)


def _fallback_solution(question: str, category: str,
                        class_level: Optional[int], result: SolveResult,
                        student_values: dict = None) -> SolveResult:
    """When SymPy can't compute: use generated solver, model answer, or DeepSeek.

    Priority:
    1. Generated solver store (DeepSeek wrote a SymPy solver for this pattern before)
    2. Model answer from matched question
    3. DeepSeek solves + generates a solver for future use
    """
    matcher = get_matcher()
    solver_store = get_solver_store()

    # 1. Check generated solver store — did DeepSeek already write a solver for this pattern?
    gen_solver = solver_store.match(question)
    if gen_solver and student_values:
        try:
            solver_fn = solver_store.get_solver_fn(gen_solver["pattern"])
            if solver_fn:
                output = solver_fn(student_values)
                if output and output.get("steps"):
                    result.path = "generated_solver"
                    result.source = "generated_solver"
                    result.steps = [
                        StepResult(
                            step_num=s["step"],
                            description=s["description"],
                            operation="compute",
                            success=s["success"],
                            result=s["result"],
                        )
                        for s in output["steps"]
                    ]
                    result.success = all(s.success for s in result.steps)
                    if not result.success:
                        result.error = output.get("error", "Generated solver failed")
                    logger.info(f"Used generated solver for: '{question[:50]}...'")
                    return result
        except Exception as e:
            logger.warning(f"Generated solver failed: {e}")

    # 2. Try model answer from matched question — ONLY if values match exactly
    matches = matcher.match(question, class_level=class_level, top_k=1)
    if matches:
        matched_q = matcher.get_question(matches[0]["question_id"])
        if matched_q and matched_q.answer_text:
            # Extract all numbers from both questions
            import re as _re
            student_nums = set(_re.findall(r'\d+\.?\d*', question))
            bank_nums = set(_re.findall(r'\d+\.?\d*', matched_q.question_text))
            # Only show model answer if the numbers match (same values)
            if student_nums == bank_nums:
                result.path = "model_answer"
                result.source = "model_answer"
                result.worked_solution = matched_q.answer_text
                result.matched_question_text = matched_q.question_text
                result.match_score = matches[0]["score"]
                result.success = True
                logger.info(f"Using model answer (exact values match) for: '{question[:50]}...'")
                return result
            else:
                logger.info(
                    f"Model answer skipped — values differ. "
                    f"Student: {student_nums}, Bank: {bank_nums}"
                )

    # 3. Last resort: DeepSeek solves the question AND generates a solver for future
    form_fields = _build_form_fields(category)
    
    # Always store the pattern so we know this question type exists
    pattern_store = get_pattern_store()
    pattern_store.add(question, category, form_fields, class_level or 0)
    
    worked_solution = llm_solve_question_sync(question)
    solver_code = llm_generate_solver_sync(question, form_fields)

    if worked_solution:
        result.path = "deepseek"
        result.source = "deepseek"
        result.worked_solution = worked_solution
        result.success = True

        # Always store the generated solver so this pattern never needs DeepSeek again
        if solver_code:
            try:
                solver_store.add(
                    question=question,
                    solver_code=solver_code,
                    category=category,
                    form_fields=form_fields,
                    example_solution=worked_solution[:500],
                )
                logger.info(f"Generated + stored solver for: '{question[:50]}...'")
            except Exception as e:
                logger.warning(f"Failed to store generated solver: {e}")

        return result

    # Total failure
    result.error = "No solution available — SymPy can't compute, no model answer, DeepSeek unavailable"
    return result


def _build_form_fields(category: str, llm_data: Optional[dict] = None) -> list[dict]:
    """Build the form fields the student needs to fill for a given category."""
    # Define what fields each category needs
    FIELD_DEFS = {
        "tangent_normal": [
            {"name": "expression", "label": "Curve equation (y = ...)", "type": "text", "placeholder": "x**3 - 3*x + 2"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
            {"name": "point", "label": "Point (x value)", "type": "text", "placeholder": "2"},
        ],
        "differentiation": [
            {"name": "expression", "label": "Expression to differentiate", "type": "text", "placeholder": "x**3 - 3*x**2"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
            {"name": "point", "label": "Evaluate at (optional)", "type": "text", "placeholder": "2"},
        ],
        "integration": [
            {"name": "expression", "label": "Expression to integrate", "type": "text", "placeholder": "x**2"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
            {"name": "lower", "label": "Lower bound (optional)", "type": "text", "placeholder": "0"},
            {"name": "upper", "label": "Upper bound (optional)", "type": "text", "placeholder": "2"},
        ],
        "area_between_curves": [
            {"name": "curve1", "label": "First curve (y = ...)", "type": "text", "placeholder": "x**2"},
            {"name": "curve2", "label": "Second curve (y = ...)", "type": "text", "placeholder": "x"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
            {"name": "lower", "label": "Lower bound (optional)", "type": "text"},
            {"name": "upper", "label": "Upper bound (optional)", "type": "text"},
        ],
        "differential_equation": [
            {"name": "ode_str", "label": "Differential equation (dy/dx + P*y = Q)", "type": "text", "placeholder": "dy/dx + 2*y = 3*x"},
            {"name": "initial_condition", "label": "Initial condition (optional)", "type": "text", "placeholder": "y(0) = 1"},
        ],
        "homogeneous_ode": [
            {"name": "ode_str", "label": "Differential equation", "type": "text", "placeholder": "dy/dx = (x**2 + y**2)/(x*y)"},
            {"name": "initial_condition", "label": "Initial condition (optional)", "type": "text"},
        ],
        "quadratic": [
            {"name": "expression", "label": "Quadratic expression", "type": "text", "placeholder": "2*x**2 - 7*x + 3"},
            {"name": "rhs", "label": "Right-hand side", "type": "text", "default": "0"},
        ],
        "matrix": [
            {"name": "matrix_a", "label": "Matrix A [[a,b],[c,d]]", "type": "text", "placeholder": "[[2,3],[1,4]]"},
            {"name": "matrix_b", "label": "Matrix B (optional)", "type": "text"},
        ],
        "linear_system": [
            {"name": "equations", "label": "Equations (one per line)", "type": "textarea", "placeholder": "x + 2*y = 3\n3*x - 2*y = -1"},
        ],
        "equivalence_relation": [
            {"name": "set_a", "label": "Set A elements", "type": "text", "placeholder": "1, 2, 3, 4"},
            {"name": "divisible_by", "label": "Divisible by", "type": "text", "placeholder": "2"},
            {"name": "eq_class", "label": "Equivalence class to find (optional)", "type": "text", "placeholder": "1"},
        ],
        "continuity": [
            {"name": "expression", "label": "Function f(x)", "type": "text"},
            {"name": "point", "label": "Point to check", "type": "text"},
        ],
        "increasing_decreasing": [
            {"name": "expression", "label": "Function f(x)", "type": "text", "placeholder": "x**3 - 3*x"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
        ],
        "kinematics": [
            {"name": "expression", "label": "Position s(t)", "type": "text", "placeholder": "t**3 - 6*t**2 + 9*t + 5"},
            {"name": "var", "label": "Variable", "type": "text", "default": "t"},
        ],
        "max_min": [
            {"name": "expression", "label": "Function to optimize", "type": "text"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
        ],
        "optimization": [
            {"name": "expression", "label": "Objective function", "type": "text"},
            {"name": "var", "label": "Variable", "type": "text", "default": "x"},
        ],
        "hcf_lcm": [
            {"name": "numbers", "label": "Numbers (comma-separated)", "type": "text", "placeholder": "12, 18, 24"},
        ],
        "percentage": [
            {"name": "numbers", "label": "Numbers", "type": "text", "placeholder": "25, 200"},
        ],
        "interest": [
            {"name": "principal", "label": "Principal", "type": "text"},
            {"name": "rate", "label": "Rate (%)", "type": "text"},
            {"name": "time", "label": "Time (years)", "type": "text"},
        ],
        "inequation": [
            {"name": "expression", "label": "Inequation", "type": "text", "placeholder": "3*x - 5 < x + 7"},
            {"name": "constraint", "label": "Domain (optional)", "type": "text", "placeholder": "x in W"},
        ],
        "set_theory": [
            {"name": "set_a", "label": "Set A elements", "type": "text", "placeholder": "1, 2, 3"},
            {"name": "set_b", "label": "Set B elements", "type": "text", "placeholder": "2, 3, 4"},
        ],
        "exponents": [
            {"name": "base", "label": "Base", "type": "text"},
            {"name": "power", "label": "Power", "type": "text"},
        ],
        # Physics categories
        "phy_kinematics": [
            {"name": "u", "label": "Initial velocity u (m/s)", "type": "text", "placeholder": "0"},
            {"name": "v", "label": "Final velocity v (m/s)", "type": "text", "placeholder": "10"},
            {"name": "a", "label": "Acceleration a (m/s²)", "type": "text", "placeholder": "2"},
            {"name": "s", "label": "Displacement s (m)", "type": "text"},
            {"name": "t", "label": "Time t (s)", "type": "text"},
            {"name": "find", "label": "What to find (u/v/a/s/t)", "type": "text", "placeholder": "v"},
        ],
        "phy_newtons_laws": [
            {"name": "F", "label": "Force F (N)", "type": "text"},
            {"name": "m", "label": "Mass m (kg)", "type": "text"},
            {"name": "a", "label": "Acceleration a (m/s²)", "type": "text"},
            {"name": "g", "label": "Gravity g (m/s², default 9.8)", "type": "text", "default": "9.8"},
            {"name": "find", "label": "What to find (F/m/a/w)", "type": "text", "placeholder": "F"},
        ],
        "phy_energy": [
            {"name": "m", "label": "Mass m (kg)", "type": "text"},
            {"name": "v", "label": "Velocity v (m/s)", "type": "text"},
            {"name": "h", "label": "Height h (m)", "type": "text"},
            {"name": "g", "label": "Gravity g (m/s², default 9.8)", "type": "text", "default": "9.8"},
            {"name": "F", "label": "Force F (N)", "type": "text"},
            {"name": "s", "label": "Displacement s (m)", "type": "text"},
            {"name": "theta", "label": "Angle θ (degrees, default 0)", "type": "text", "default": "0"},
            {"name": "find", "label": "What to find (ke/pe/w)", "type": "text", "placeholder": "ke"},
        ],
        "phy_electricity": [
            {"name": "V", "label": "Voltage V (V)", "type": "text"},
            {"name": "I", "label": "Current I (A)", "type": "text"},
            {"name": "R", "label": "Resistance R (Ω)", "type": "text"},
            {"name": "P", "label": "Power P (W)", "type": "text"},
            {"name": "t", "label": "Time t (s)", "type": "text"},
            {"name": "find", "label": "What to find (V/I/R/P/Q)", "type": "text", "placeholder": "V"},
        ],
        # Chemistry categories
        "chem_moles": [
            {"name": "m", "label": "Mass m (g)", "type": "text"},
            {"name": "M", "label": "Molar mass M (g/mol)", "type": "text"},
            {"name": "N", "label": "Number of particles N", "type": "text"},
            {"name": "find", "label": "What to find (n)", "type": "text", "default": "n"},
        ],
        "chem_molarity": [
            {"name": "n", "label": "Moles n (mol)", "type": "text"},
            {"name": "V", "label": "Volume V (L)", "type": "text"},
            {"name": "M", "label": "Molarity M (mol/L)", "type": "text"},
            {"name": "find", "label": "What to find (M/n/V)", "type": "text", "placeholder": "M"},
        ],
        "chem_ph": [
            {"name": "H", "label": "[H⁺] concentration (mol/L)", "type": "text"},
            {"name": "pH", "label": "pH value", "type": "text"},
            {"name": "find", "label": "What to find (pH/H)", "type": "text", "placeholder": "pH"},
        ],
        "chem_gas": [
            {"name": "P", "label": "Pressure P (atm)", "type": "text"},
            {"name": "V", "label": "Volume V (L)", "type": "text"},
            {"name": "n", "label": "Moles n (mol)", "type": "text"},
            {"name": "T", "label": "Temperature T (K)", "type": "text"},
            {"name": "R", "label": "Gas constant R (default 0.0821)", "type": "text", "default": "0.0821"},
            {"name": "find", "label": "What to find (P/V/n/T)", "type": "text", "placeholder": "P"},
        ],
        "chem_dilution": [
            {"name": "M1", "label": "Initial molarity M1 (mol/L)", "type": "text"},
            {"name": "V1", "label": "Initial volume V1 (L)", "type": "text"},
            {"name": "M2", "label": "Final molarity M2 (mol/L)", "type": "text"},
            {"name": "V2", "label": "Final volume V2 (L)", "type": "text"},
            {"name": "find", "label": "What to find (M1/V1/M2/V2)", "type": "text", "placeholder": "M2"},
        ],
    }

    fields = FIELD_DEFS.get(category, [])

    # If DeepSeek extracted values, prefill them
    if llm_data:
        for f in fields:
            if f["name"] in llm_data and llm_data[f["name"]]:
                f["prefilled"] = llm_data[f["name"]]

    return fields


def _student_values_to_extracted(student_values: dict, category: str) -> ExtractedValues:
    """Convert student-submitted form values to ExtractedValues."""
    vals = ExtractedValues()
    vals.expression = student_values.get("expression") or None
    vals.var = student_values.get("var") or "x"
    vals.point = student_values.get("point") or None
    vals.rhs = student_values.get("rhs") or None
    vals.lower = student_values.get("lower") or None
    vals.upper = student_values.get("upper") or None
    vals.matrix_a = student_values.get("matrix_a") or None
    vals.matrix_b = student_values.get("matrix_b") or None
    vals.set_a = student_values.get("set_a") or None
    vals.set_b = student_values.get("set_b") or None
    vals.numbers = student_values.get("numbers") or None

    # Raw fields
    for key in ["curve1", "curve2", "ode_str", "initial_condition", "constraint",
                "divisible_by", "eq_class", "lines", "circle_eq", "find",
                "matrix_power", "behavior", "extremum_type",
                # Physics fields
                "u", "v", "a", "s", "t", "g", "F", "m", "h", "theta",
                "V", "I", "R", "P", "Q",
                # Chemistry fields
                "M", "N", "n", "M1", "V1", "M2", "V2", "pH", "H"]:
        if student_values.get(key):
            vals.raw[key] = student_values[key]

    # Merge into raw
    for k, v in vals.__dict__.items():
        if v is not None and k != "raw":
            vals.raw[k] = v

    # Handle equations as raw
    if student_values.get("equations"):
        eqs = student_values["equations"].strip().split("\n")
        vals.raw["equations"] = [e.strip() for e in eqs if e.strip()]

    return vals
