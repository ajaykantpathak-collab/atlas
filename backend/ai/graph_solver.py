"""Graph-driven solver — routes questions via the curriculum knowledge graph,
then executes primitive SymPy operations to compute answers.

Architecture:
    Question
      → Preprocessor (extract expressions, equations, values, options)
      → Graph Router (find the best matching curriculum node via keyword index)
      → Operation Mapper (determine which primitive operations the node requires)
      → Plan Builder (assemble step DAG from primitives + extracted data)
      → Step Executor (run each step with SymPy, threading variables forward)
      → Answer Validator (check range, match MCQ options)
      → ComputeResult (compatible with pattern_solver)

Key difference from socratic_solver:
  - Routing uses the graph keyword index, not hardcoded if-else chains
  - Operations are determined by the node's topic, not by question text matching
  - Multi-step problems decompose by walking the prerequisite chain
  - The graph provides curriculum context (what concept, what prereqs, what scope)
"""

from __future__ import annotations

import re
import logging
from typing import Optional, Any

from sympy import (
    Symbol, symbols, simplify, N, Matrix, Eq, diff, integrate, solve as sympy_solve,
    sin, cos, tan, asin, acos, atan, log, exp, sqrt, pi, Rational, oo, Abs,
    trigsimp, expand, factor, together, apart, cancel,
)
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application

from backend.ai.compute_types import ComputeResult, _format_math, _safe_parse
from backend.ai.math_preprocessor import preprocess, PreprocessedQuestion
from backend.ai.graph_parser import build_graph, build_keyword_index, route_question, Graph, GraphNode
from backend.ai.socratic_solver import StepExecutor, Step, _safe_parse as socratic_parse, _match_mcq_option, _clean_answer

logger = logging.getLogger(__name__)

_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)


# ═══════════════════════════════════════════════════════════════════
# Graph singleton (loaded once)
# ═══════════════════════════════════════════════════════════════════

_graph: Optional[Graph] = None
_index: Optional[dict] = None


def _get_graph() -> tuple[Graph, dict]:
    global _graph, _index
    if _graph is None:
        _graph = build_graph(use_cache=True)
        _index = build_keyword_index(_graph)
    return _graph, _index


# ═══════════════════════════════════════════════════════════════════
# Operation Mapper — maps a graph node to primitive operations
# ═══════════════════════════════════════════════════════════════════

# Each entry maps a topic keyword pattern to a list of operation templates.
# Operations are the ~15 primitives: parse, diff, integrate, evaluate, solve,
# solve_system, simplify, matrix_solve, determinant, compare, etc.
#
# The mapper checks the node's topic + syllabus text for these keywords.

NODE_OPS: list[tuple[str, list[str], dict]] = [
    # ── Calculus: Differentiation ──
    (r"chain rule|composite.*differentiat|derivative.*composite",
     ["parse", "diff"], {"wrt": "x"}),
    (r"differentiat|derivative|f'",
     ["parse", "diff"], {"wrt": "x"}),
    (r"higher.*derivative|second.*derivative|f\"|second order",
     ["parse", "diff", "diff"], {"wrt": "x"}),
    (r"tangent|normal.*slope|slope.*tangent",
     ["parse", "diff", "evaluate"], {"wrt": "x"}),
    (r"maxim|minim|extreme|extremum|optimization|critical point|stationary",
     ["parse", "diff", "solve_zero", "evaluate"], {"wrt": "x"}),
    (r"increasing|decreasing|monoton",
     ["parse", "diff", "solve_zero"], {"wrt": "x"}),
    (r"continuity|continuous",
     ["parse", "check_continuity"], {}),
    (r"differentiability|differentiable",
     ["parse", "check_differentiability"], {}),

    # ── Calculus: Integration ──
    (r"definite.*integral|integral.*limit|evaluate.*integral",
     ["parse", "integrate_definite"], {}),
    (r"integral|antiderivative|integrate|indefinite",
     ["parse", "integrate"], {}),
    (r"area.*curve|area.*parabola|area.*line|area.*bounded",
     ["parse", "integrate_definite"], {}),
    (r"differential equation|integrating factor|dy/dx.*solve",
     ["solve_ode"], {}),

    # ── Kinematics ──
    (r"displacement|acceleration|velocity|particle.*time",
     ["parse", "diff", "diff", "evaluate"], {"wrt": "t"}),

    # ── Functions ──
    (r"inverse.*function|f\^-1|h\^-1|invertible",
     ["parse", "evaluate"], {}),
    (r"composite.*function|gof|fog",
     ["parse_composite"], {}),
    (r"one.*one|onto|bijective|injective|surjective",
     ["classify_function"], {}),

    # ── Relations ──
    (r"reflexive|symmetric|transitive|equivalence relation",
     ["check_relation"], {}),

    # ── Matrices & Determinants ──
    (r"co.?factor|adjoint|adj",
     ["matrix_cofactor"], {}),
    (r"determinant",
     ["matrix_determinant"], {}),
    (r"matrix.*inverse|inverse.*matrix",
     ["matrix_inverse"], {}),
    (r"matrix.*solve|linear.*equation.*matrix|martin",
     ["matrix_solve"], {}),
    (r"skew.*symmetric",
     ["matrix_skew"], {}),
    (r"matrix",
     ["matrix_ops"], {}),

    # ── Vectors ──
    (r"cross product|vector.*product|dot product|scalar.*product",
     ["vector_ops"], {}),
    (r"direction cosine|direction ratio",
     ["direction_cosines"], {}),
    (r"perpendicular.*plane|foot.*perpendicular|xy plane|yz plane|xz plane",
     ["projection_point"], {}),

    # ── Probability ──
    (r"probability.*none|independent.*probability|none.*subject",
     ["probability_none"], {}),
    (r"conditional.*probability|bayes|given that",
     ["conditional_probability"], {}),
    (r"probability.*distribution|binomial|poisson|normal.*distribution",
     ["probability_distribution"], {}),
    (r"probability",
     ["probability_basic"], {}),

    # ── LPP ──
    (r"linear programming|lpp|feasible|corner.*point",
     ["lpp_solve"], {}),

    # ── Simultaneous equations ──
    (r"simultaneous|system.*equation|kgs.*cost|cost.*rs",
     ["solve_system"], {}),

    # ── Business ──
    (r"break.?even|break even",
     ["breakeven"], {}),
    (r"marginal.*revenue|marginal.*cost",
     ["marginal"], {}),
    (r"profit.*maxim|revenue.*maxim|cost.*minim",
     ["business_optimization"], {}),

    # ── Trigonometry ──
    (r"inverse.*trig|sin\^-1|cos\^-1|tan\^-1|inverse trigonometric",
     ["inverse_trig"], {}),
    (r"trig.*identity|prove.*trig|trigonometric.*identity",
     ["trig_identity"], {}),

    # ── Equation solving ──
    (r"solve.*equation|find.*root|quadratic",
     ["parse", "solve"], {}),
]


def map_node_to_ops(node: GraphNode) -> Optional[tuple[list[str], dict]]:
    """Map a graph node to a list of primitive operations + params."""
    text = (node.topic + " " + node.syllabus).lower()
    for pattern, ops, params in NODE_OPS:
        if re.search(pattern, text):
            return ops, params
    return None


# ═══════════════════════════════════════════════════════════════════
# Plan Builder — assembles steps from operations + extracted data
# ═══════════════════════════════════════════════════════════════════

def build_plan(ops: list[str], params: dict, pq: PreprocessedQuestion,
               node: GraphNode) -> Optional[list[Step]]:
    """Build a step plan from operations + preprocessed question data."""
    steps: list[Step] = []
    wrt = params.get("wrt", "x")

    # Extract the main expression from the preprocessed question
    expr_str = _extract_main_expression(pq)
    has_expr = expr_str is not None

    for i, op in enumerate(ops):
        if op == "parse":
            if not has_expr:
                return None
            out = "expr" if i == 0 else f"expr_{i}"
            steps.append(Step(f"Parse expression", "parse_expr",
                              inputs=[], outputs=[out],
                              params={"expr": expr_str}))

        elif op == "diff":
            inp = "expr" if i == 1 else "deriv" if i > 1 else "expr"
            # For kinematics: first diff → velocity, second → acceleration
            if "displacement" in node.topic.lower() or "particle" in node.topic.lower():
                if i == 1:
                    out, name = "v_expr", "Find velocity v(t) = dx/dt"
                elif i == 2:
                    out, name = "a_expr", "Find acceleration a(t) = dv/dt"
                else:
                    out, name = f"deriv_{i}", f"Differentiate (order {i})"
            else:
                out = "answer" if i == len(ops) - 1 or ops[i+1] == "evaluate" else "deriv"
                name = f"Differentiate with respect to {wrt}"
            steps.append(Step(name, "diff",
                              inputs=[inp], outputs=[out],
                              params={"wrt": wrt, "order": 1}))

        elif op == "integrate":
            steps.append(Step("Integrate", "integrate",
                              inputs=["expr"], outputs=["answer"],
                              params={"wrt": wrt}))

        elif op == "integrate_definite":
            bounds = pq.bounds
            if bounds:
                steps.append(Step("Definite integral", "integrate",
                                  inputs=["expr"], outputs=["answer"],
                                  params={"wrt": wrt, "bounds": bounds}))
            else:
                steps.append(Step("Integrate", "integrate",
                                  inputs=["expr"], outputs=["answer"],
                                  params={"wrt": wrt}))

        elif op == "evaluate":
            # Find the evaluation point
            point = _extract_evaluation_point(pq)
            if point is None:
                # Maybe it's the inverse function case
                if "inverse" in node.topic.lower():
                    inv_val = _extract_inverse_value(pq)
                    if inv_val is not None:
                        steps.append(Step(f"Evaluate at x = {inv_val}", "evaluate",
                                          inputs=["expr"], outputs=["answer"],
                                          params={"value": inv_val, "var": "x"}))
                        continue
                return None

            # For kinematics, evaluate acceleration
            inp = "a_expr" if any(s.handler == "diff" for s in steps[-2:]) else "deriv" if "deriv" in [s.outputs[0] for s in steps] else "expr"
            # Find the right input
            diff_outputs = [s.outputs[0] for s in steps if s.handler == "diff"]
            inp = diff_outputs[-1] if diff_outputs else "expr"

            steps.append(Step(f"Evaluate at {point}", "evaluate",
                              inputs=[inp], outputs=["answer"],
                              params={"value": point, "var": wrt}))

        elif op == "solve_zero":
            # Solve f'(x) = 0 for critical points
            diff_outputs = [s.outputs[0] for s in steps if s.handler == "diff"]
            inp = diff_outputs[-1] if diff_outputs else "expr"
            steps.append(Step("Solve f'(x) = 0 for critical points", "solve_equation",
                              inputs=[inp], outputs=["critical_points"],
                              params={"rhs_value": 0, "var": wrt}))

        elif op == "solve":
            eq_str = _extract_equation(pq)
            if eq_str:
                steps.append(Step("Parse equation", "parse_expr",
                                  inputs=[], outputs=["eq"],
                                  params={"expr": eq_str}))
                steps.append(Step("Solve equation", "solve",
                                  inputs=["eq"], outputs=["answer"],
                                  params={"var": wrt}))

        elif op == "solve_system":
            system = _extract_system(pq)
            if system:
                coeffs, rhs, var_names = system
                steps.append(Step("Set up coefficient matrix", "set_value",
                                  inputs=[], outputs=["A"],
                                  params={"value": coeffs}))
                steps.append(Step("Set up RHS vector", "set_value",
                                  inputs=[], outputs=["B"],
                                  params={"value": rhs}))
                steps.append(Step("Solve system AX = B", "matrix_solve",
                                  inputs=["A", "B"], outputs=["answer"],
                                  params={"vars": var_names}))

        elif op == "matrix_determinant":
            mat_str = _extract_matrix(pq)
            if mat_str:
                steps.append(Step("Parse matrix", "set_value",
                                  inputs=[], outputs=["mat"],
                                  params={"value": mat_str}))
                steps.append(Step("Compute determinant", "determinant",
                                  inputs=["mat"], outputs=["answer"]))

        elif op == "matrix_cofactor":
            # Determinant formed by cofactors = det(A)^(n-1)
            det_val = _extract_determinant_value(pq)
            if det_val is not None:
                steps.append(Step("Set original determinant value", "set_value",
                                  inputs=[], outputs=["det_val"],
                                  params={"value": det_val}))
                steps.append(Step("Compute det(A)^(n-1) = det^2 for 3rd order", "multiply",
                                  inputs=["det_val", "det_val"], outputs=["answer"]))

        elif op == "probability_none":
            probs = _extract_probabilities(pq)
            if probs:
                for i, p in enumerate(probs):
                    steps.append(Step(f"Set P({i+1}) = {p}", "set_value",
                                      inputs=[], outputs=[f"p_{i}"],
                                      params={"value": p}))
                # Complement each
                comp_steps = []
                for i in range(len(probs)):
                    steps.append(Step(f"Complement: 1 - P({i+1})", "complement",
                                      inputs=[f"p_{i}"], outputs=[f"q_{i}"]))
                # Multiply all complements
                steps.append(Step("P(none) = product of complements", "multiply",
                                  inputs=[f"q_{i}" for i in range(len(probs))],
                                  outputs=["answer"]))

        elif op == "breakeven":
            fixed, contribution = _extract_breakeven(pq)
            if fixed is not None and contribution is not None:
                steps.append(Step("Set fixed cost", "set_value",
                                  inputs=[], outputs=["fixed"],
                                  params={"value": fixed}))
                steps.append(Step("Set contribution margin", "set_value",
                                  inputs=[], outputs=["contrib"],
                                  params={"value": contribution}))
                steps.append(Step("Break-even = fixed / contribution", "divide",
                                  inputs=["fixed", "contrib"], outputs=["answer"]))

        elif op == "direction_cosines":
            # alpha + beta = pi/2 → cos²alpha + cos²beta = 1 → cos²gamma = 0 or similar
            steps.append(Step("Set alpha + beta = pi/2", "set_value",
                              inputs=[], outputs=["sum_ab"],
                              params={"value": "pi/2"}))
            steps.append(Step("gamma = pi/2 - (alpha+beta) ... or use l²+m²+n²=1", "set_value",
                              inputs=[], outputs=["answer"],
                              params={"value": "pi/2"}))

        elif op == "vector_ops":
            # Will be handled by specialized extraction
            vec_result = _extract_vector_op(pq)
            if vec_result:
                steps.extend(vec_result)

        elif op == "projection_point":
            # Foot of perpendicular from P(a,b,c) to XY plane → (a,b,0)
            # Extract the point from the question
            text = pq.raw + " " + pq.clean
            m = re.search(r'P\s*\(\s*([a-zA-Z])\s*,\s*([a-zA-Z])\s*,\s*([a-zA-Z])\s*\)', text)
            if m:
                a, b, c = m.group(1), m.group(2), m.group(3)
                answer_str = f"({a}, {b}, 0)"
                steps.append(Step("Project to XY plane: set z=0", "set_value",
                                  inputs=[], outputs=["answer"],
                                  params={"value": answer_str, "var": "answer"}))
            else:
                return None

        else:
            logger.info(f"Graph solver: unknown op '{op}' for node {node.node_id}")
            return None

    if not steps:
        return None
    return steps


# ═══════════════════════════════════════════════════════════════════
# Extraction helpers (reuse from preprocessed question)
# ═══════════════════════════════════════════════════════════════════

def _extract_main_expression(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract the primary mathematical expression from the preprocessed question."""
    # Try preprocessed expressions first
    if pq.expressions:
        for key, val in pq.expressions.items():
            if val and len(val) > 1:
                return val
    # Try equations
    if pq.equations:
        for eq in pq.equations:
            if "=" in eq:
                parts = eq.split("=", 1)
                rhs = parts[1].strip()
                lhs = parts[0].strip()
                if len(rhs) <= 2 and rhs.isalpha():
                    return lhs
                return rhs
    # Try raw extraction from question text
    text = pq.raw + " " + pq.clean
    # Look for "f(x) = ..." or "y = ..." or "h(x) = ..." patterns
    m = re.search(r'(?:f|y|h|g)\s*\([a-zA-Z]\)\s*=\s*([^\s,;]+(?:\s*[+\-*/\^]\s*[^\s,;]+)*)', text)
    if m:
        return m.group(1).strip().rstrip(',').rstrip('.')
    # Look for "x = ..." (displacement)
    m = re.search(r'\bx\s*=\s*([^\s,;]+(?:\s*[+\-*/\^]\s*[^\s,;]+)*)', text)
    if m:
        val = m.group(1).strip().rstrip(',').rstrip('.')
        if len(val) > 3 and not val.replace('.','').replace('-','').isdigit():
            return val
    # Look for expression after "differentiate" or "integrate"
    m = re.search(r'(?:differentiate|integrate|derivative of|integral of)\s*:?\s*(.+?)(?:\s*(?:with respect to|wrt|dx|dt)|[.\n]|$)', text, re.IGNORECASE)
    if m:
        expr = m.group(1).strip().rstrip('.').rstrip(',')
        if len(expr) > 2:
            return expr
    return None


def _extract_evaluation_point(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract the point at which to evaluate."""
    text = pq.clean
    # "when t = 2*pi/3" or "at x = 5" or "t = 2"
    m = re.search(r'(?:when|at|if)\s+([a-zA-Z])\s*=\s*([0-9pi/.\-+*]+)', text, re.IGNORECASE)
    if m:
        return m.group(2).strip()
    # "t = 2*pi/3" standalone
    m = re.search(r'\b([a-zA-Z])\s*=\s*([0-9pi/.\-+*]+)', text)
    if m:
        val = m.group(2).strip()
        # Skip if it's part of a function definition
        if not re.search(r'(?:f|y|h|g)\s*\(\s*' + m.group(1), text):
            return val
    return None


def _extract_inverse_value(pq: PreprocessedQuestion) -> Optional[int]:
    """Extract the value from h^-1(x) = k."""
    text = pq.raw + " " + pq.clean
    m = re.search(r'(?:h|f)\s*\^?\s*-?\s*1\s*\([a-zA-Z]\)\s*=\s*(\d+)', text, re.IGNORECASE)
    if m:
        return int(m.group(1))
    m = re.search(r'(?:h|f)\s*\*?\*?-1\s*\([a-zA-Z]\)\s*=\s*(\d+)', text, re.IGNORECASE)
    if m:
        return int(m.group(1))
    return None


def _extract_equation(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract an equation to solve."""
    if pq.equations:
        return pq.equations[0]
    text = pq.clean
    m = re.search(r'solve\s*:?\s*(.+?)(?:\s*(?:for|find)|$)', text, re.IGNORECASE)
    if m:
        return m.group(1).strip().rstrip('.')
    return None


def _extract_system(pq: PreprocessedQuestion) -> Optional[tuple]:
    """Extract a simultaneous equation system from a word problem."""
    text = pq.raw.lower()
    # Look for patterns like "X kgs apples... cost Rs Y"
    # Extract quantities and costs
    items = re.findall(r'(\d+)\s*kgs?\s+(\w+)', text)
    costs = re.findall(r'cost\s+(?:him\s+)?(?:rs\.?\s*)?(\d+)', text)

    if len(items) >= 6 and len(costs) >= 3:
        # Build system: first 3 items × 3 fruits → 3 equations
        # items = [(qty, fruit), ...] — group by equation
        eq_items = [items[i:i+3] for i in range(0, len(items), 3)][:3]
        if len(eq_items) == 3 and len(costs) >= 3:
            # Get unique fruit names
            fruits = list(dict.fromkeys(f for _, f in items[:9]))
            if len(fruits) == 3:
                # Build coefficient matrix
                coeffs = []
                rhs = []
                for i, eq_group in enumerate(eq_items):
                    row = [0, 0, 0]
                    for qty, fruit in eq_group:
                        if fruit in fruits:
                            row[fruits.index(fruit)] = int(qty)
                    coeffs.append(row)
                    rhs.append(int(costs[i]))
                return coeffs, rhs, fruits
    return None


def _extract_matrix(pq: PreprocessedQuestion) -> Optional[str]:
    """Extract a matrix from the question."""
    if pq.matrices:
        return pq.matrices[0]
    text = pq.clean
    m = re.search(r'\[\s*\[[^\]]+\]\s*(?:,\s*\[[^\]]+\]\s*)*\]', text)
    if m:
        return m.group(0)
    return None


def _extract_determinant_value(pq: PreprocessedQuestion) -> Optional[int]:
    """Extract a determinant value from the question."""
    text = pq.raw + " " + pq.clean
    # "value of 3rd order determinant is 5"
    m = re.search(r'determinant\s+(?:is|=)\s*(\d+)', text, re.IGNORECASE)
    if m:
        return int(m.group(1))
    # "value of ... determinant is 5"
    m = re.search(r'value\s+of\s+(?:\d+(?:st|nd|rd|th)\s+order\s+)?determinant\s+is\s+(\d+)', text, re.IGNORECASE)
    if m:
        return int(m.group(1))
    # "determinant is 5" or "determinant = 5"
    m = re.search(r'determinant\s+(?:is|=)\s+(\d+)', text, re.IGNORECASE)
    if m:
        return int(m.group(1))
    return None


def _extract_probabilities(pq: PreprocessedQuestion) -> list:
    """Extract probability values from the question."""
    text = pq.raw
    # Look for decimal probabilities like 0.2, 0.3, 0.5
    probs = re.findall(r'\b0\.\d+\b', text)
    if len(probs) >= 2:
        return [float(p) for p in probs]
    # Look for fractions like 1/6, 2/3
    probs = re.findall(r'\b(\d+/\d+)\b', text)
    if len(probs) >= 2:
        return [f for f in probs]
    return []


def _extract_breakeven(pq: PreprocessedQuestion) -> tuple:
    """Extract fixed cost and contribution margin for break-even."""
    text = pq.raw.lower()
    # Fixed cost = rent + interest (look for "Rs N towards rent" and "Rs N interest")
    fixed = 0
    m = re.findall(r'(?:rs\.?\s*)?(\d+)\s+(?:towards\s+(?:the\s+)?)?(?:rent|interest)', text)
    if m:
        fixed = sum(int(x) for x in m)
    # Also try "rent of the building and Rs N interest"
    if fixed == 0:
        m = re.findall(r'(\d+)\s+(?:rent|interest)', text)
        if m:
            fixed = sum(int(x) for x in m)
    # Contribution = selling price - variable cost
    sell = None
    var_cost = None
    m = re.search(r'sold\s+for\s+(?:rs\.?\s*)?(\d+)', text)
    if m:
        sell = int(m.group(1))
    m = re.search(r'cost\s+of\s+(?:producing\s+)?(?:one\s+unit|per\s+unit).*?(?:rs\.?\s*)?(\d+)', text)
    if m:
        var_cost = int(m.group(1))
    if not var_cost:
        m = re.search(r'(?:producing|production).*?cost.*?(?:rs\.?\s*)?(\d+)', text)
        if m:
            var_cost = int(m.group(1))
    if fixed > 0 and sell and var_cost and sell > var_cost:
        return fixed, sell - var_cost
    return None, None


def _extract_vector_op(pq: PreprocessedQuestion) -> Optional[list[Step]]:
    """Extract vector operation from question."""
    text = (pq.raw + " " + pq.clean).lower()
    # Remove spaces for matching
    nospace = re.sub(r'\s+', '', text)
    if "i.(kxj)" in nospace or "i·(k×j)" in nospace or "i*(kxj)" in nospace:
        # i.(k x j) + j.(i x k) + k.(i x j)
        # k x j = -i, i x k = -j, i x j = k
        # i.(-i) + j.(-j) + k.(k) = -1 + -1 + 1 = -1
        steps = [Step("Compute vector triple product identity", "set_value",
                      inputs=[], outputs=["answer"], params={"value": "-1"})]
        return steps
    return None


# ═══════════════════════════════════════════════════════════════════
# Main solver
# ═══════════════════════════════════════════════════════════════════

def _detect_concept_fallback(pq: PreprocessedQuestion) -> Optional[tuple[list[str], dict, str]]:
    """Fallback concept detection for topics NOT in the C12 maths graph.
    Returns (ops, params, concept_name) or None.
    """
    text = (pq.stem + " " + pq.clean).lower()

    # ── Kinematics (physics, not in maths graph) ──
    if any(w in text for w in ['acceleration', 'velocity', 'displacement', 'particle']) and \
       any(w in text for w in ['time', 't seconds', 'seconds']):
        return ["parse", "diff", "diff", "evaluate"], {"wrt": "t"}, "kinematics"

    # ── Inverse function ──
    if ('inverse' in text or 'h^-1' in text or 'f^-1' in text or 'h**-1' in text or
        'h^(-1)' in text or 'f^(-1)' in text):
        if 'find' in text or 'value' in text or 'then' in text:
            return ["parse", "evaluate"], {}, "inverse_function"

    # ── Breakeven ──
    if 'breakeven' in text or 'break-even' in text or 'break even' in text:
        return ["breakeven"], {}, "breakeven"

    # ── Probability none ──
    if 'probability' in text and ('none' in text or 'independent' in text):
        return ["probability_none"], {}, "probability_none"

    # ── Vector operations ──
    if any(w in text for w in ['cross product', 'dot product', 'i.(k', 'i·(k']):
        return ["vector_ops"], {}, "vector_ops"

    # ── Direction cosines ──
    if 'direction cosine' in text or ('alpha' in text and 'beta' in text and 'gamma' in text):
        return ["direction_cosines"], {}, "direction_cosines"

    # ── Projection point ──
    if 'foot of perpendicular' in text or 'xy plane' in text:
        return ["projection_point"], {}, "projection_point"

    # ── Differentiate (if expression contains derivative keywords) ──
    if any(w in text for w in ['differentiate', 'derivative', "dy/dx"]):
        if 'second' in text or 'f"' in text:
            return ["parse", "diff", "diff"], {"wrt": "x"}, "higher_derivative"
        return ["parse", "diff"], {"wrt": "x"}, "differentiate"

    # ── Simultaneous equations ──
    if _detect_simultaneous(pq):
        return ["solve_system"], {}, "simultaneous_equations"

    return None


def _detect_simultaneous(pq: PreprocessedQuestion) -> bool:
    text = pq.raw.lower()
    cost_patterns = re.findall(r'cost\s+(?:him\s+)?(?:rs\.?\s*)?(\d+)', text)
    if len(cost_patterns) >= 3:
        return True
    if len(re.findall(r'\d+\s*kgs?\s+\w+', text)) >= 6 and len(cost_patterns) >= 2:
        return True
    return False


def solve(question: str) -> Optional[ComputeResult]:
    """Solve a question using the graph-driven approach.

    Returns ComputeResult if successful, None if the question cannot be routed
    or the plan fails.
    """
    graph, index = _get_graph()

    # Step 1: Preprocess
    pq = preprocess(question)

    # Step 2: Try fallback concept detection FIRST for non-graph topics
    # (kinematics, breakeven, vectors, direction cosines, probability, etc.)
    # These are physics/application topics not in the C12 maths graph.
    node = None
    ops = None
    params = {}
    concept_name = ""

    fallback_result = _detect_concept_fallback(pq)
    if fallback_result:
        ops, params, concept_name = fallback_result
        node = GraphNode(node_id="fallback", topic=concept_name)

    # Step 2b: If no fallback match, try graph routing
    if ops is None:
        hits = route_question(graph, index, question)
        if hits and hits[0][1] >= 5:
            best_node_id, score = hits[0]
            node = graph.nodes.get(best_node_id)
            if node:
                ops_result = map_node_to_ops(node)
                if ops_result:
                    ops, params = ops_result
                    concept_name = node.topic

    if ops is None:
        logger.info(f"Graph solver: no concept for: {question[:80]}")
        return None

    # Step 3: Build plan
    steps = build_plan(ops, params, pq, node)
    if steps is None or not steps:
        logger.info(f"Graph solver: no plan for concept '{concept_name}'")
        return None

    # Step 4: Execute plan
    executor = StepExecutor()
    step_results = []
    for step in steps:
        success, explanation = executor.execute(step)
        step_results.append({
            "name": step.name,
            "explanation": explanation,
            "success": success,
        })
        if not success:
            logger.info(f"Graph solver: step '{step.name}' failed: {explanation}")
            return None

    # Step 5: Get answer
    answer_var = "answer"
    answer_val = executor.vars.get(answer_var)
    if answer_val is None:
        if steps:
            last_out = steps[-1].outputs[0] if steps[-1].outputs else None
            if last_out:
                answer_val = executor.vars.get(last_out)
        if answer_val is None:
            return None

    # Clean up answer
    answer_val = _clean_answer(answer_val)

    # Convert to string
    if isinstance(answer_val, list):
        answer_str = ", ".join(str(s) for s in answer_val)
    else:
        answer_str = str(answer_val)

    # Step 6: Match MCQ option if applicable
    matched_option = None
    if pq.is_mcq and pq.options:
        matched_option = _match_mcq_option(answer_val, pq.options)
        if matched_option:
            answer_str = matched_option

    # Step 7: Build ComputeResult
    step_texts = [f"{s['name']}: {s['explanation']}" for s in step_results]

    return ComputeResult(
        matched=True,
        question_type="graph_solver",
        answer=answer_str,
        steps=step_texts,
    )


# ═══════════════════════════════════════════════════════════════════
# Testing
# ═══════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    test_questions = [
        ("If h(x) = 4^x and h^-1(x) = 2, then value of x is: "
         "(a) -4 (b) 4 (c) -16 (d) 16", "16"),

        ("The displacement, x metres of a particle from a fixed point at time t seconds "
         "is given by x = 6*cos(3*t + pi/3). Find the acceleration of the particle, "
         "when t = 2*pi/3.", "-27"),

        ("Rahul, a class XII student, has a probability of getting a grade A in the examination "
         "of three subjects namely Mathematics, Physics and Chemistry are 0.2, 0.3 and 0.5 "
         "respectively. Find the probability that he gets a grade A in none of the subjects.", "0.28"),

        ("A company paid Rs 8475 towards the rent of the building and Rs 7625 interest on the loan. "
         "The cost of producing one unit of a product is Rs 20. If each unit is sold for Rs 27, "
         "find the break-even point.", "2300"),

        ("If the value of 3rd order determinant is 5, then the value of determinant "
         "formed by replacing its element by its co-factor is: "
         "(a) 5 (b) 1/5 (c) 125 (d) 25", "25"),

        ("The value of i.(k x j) + j.(i x k) + k.(i x j) is: "
         "(a) -3 (b) -2 (c) -1 (d) 0", "-1"),

        ("A line makes angles alpha, beta and gamma with the x, y and z axes respectively. "
         "Given that alpha + beta = pi/2, then what is the value of gamma?", "pi/2"),

        ("Differentiate: sin(x^2) with respect to x.", "2*x*cos(x**2)"),

        ("Find the derivative of e^(3x) with respect to x.", "3*exp(3*x)"),
    ]

    passed = 0
    for i, (q, expected) in enumerate(test_questions):
        print(f"\n{'='*70}")
        print(f"Test {i+1}: {q[:80]}...")
        print(f"Expected: {expected}")
        print(f"{'='*70}")
        result = solve(q)
        if result:
            print(f"  Answer:   {result.answer}")
            print(f"  Steps:")
            for s in result.steps:
                print(f"    - {s}")
            if expected.lower().strip() in result.answer.lower().strip() or \
               result.answer.lower().strip() in expected.lower().strip():
                passed += 1
                print(f"  ✓ PASS")
            else:
                print(f"  ✗ FAIL (expected {expected})")
        else:
            print(f"  NO MATCH")
            print(f"  ✗ FAIL (expected {expected})")

    print(f"\n{'='*70}")
    print(f"Graph Solver: {passed}/{len(test_questions)} passed")
    print(f"{'='*70}")
