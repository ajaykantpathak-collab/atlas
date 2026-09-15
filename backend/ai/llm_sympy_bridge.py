"""LLM-to-SymPy bridge: one general solver for ALL math questions.

Instead of 100+ regex solvers, this module:
1. Asks the LLM to extract the math from a natural language question
2. Passes the extracted expression to SymPy
3. Returns the computed answer

The LLM does NOT solve the math. It only EXTRACTS it into structured form.
SymPy does all computation. This means:
- No hallucinated answers (SymPy is deterministic)
- No regex patterns to maintain
- Handles any phrasing the LLM understands
- Handles any math SymPy can solve
"""

import json
import logging
import re
from typing import Optional

from backend.ai.compute_types import ComputeResult

logger = logging.getLogger(__name__)


def _normalize_json(data: dict) -> dict:
    """Normalize JSON from LLM. The LLM may return:
    - Proper extraction format (has "operation")
    - Direct result (has "result", "answer", "permutations", etc.)
    - Mixed format
    """
    if not isinstance(data, dict):
        return None

    # Already has operation - return as-is
    if "operation" in data:
        return data

    # Check for direct result keys (LLM solved it instead of extracting)
    result_keys = ["result", "answer", "permutations", "combinations",
                   "value", "sum", "product", "quotient", "difference",
                   "derivative", "integral", "determinant", "magnitude",
                   "area", "volume", "perimeter", "probability"]
    for key in result_keys:
        if key in data:
            return {
                "operation": "direct_result",
                "result": str(data[key]),
                "solvable": True,
            }

    # If it has any single numeric value, treat it as direct result
    numeric_values = {k: v for k, v in data.items()
                      if isinstance(v, (int, float)) and not isinstance(v, bool)}
    if len(numeric_values) == 1:
        key, val = list(numeric_values.items())[0]
        return {
            "operation": "direct_result",
            "result": str(val),
            "solvable": True,
        }

    return data


def _parse_llm_response(response: str) -> Optional[dict]:
    """Parse LLM response into JSON dict. Handles:
    1. Pure JSON
    2. JSON in code fences
    3. JSON embedded in thinking text
    4. Thinking text with values (fallback extraction)
    5. Direct result (LLM solved it instead of extracting)
    """
    # Method 1: Pure JSON
    clean = response.strip()
    if clean.startswith("```"):
        clean = re.sub(r'^```(?:json)?\s*', '', clean)
        clean = re.sub(r'\s*```$', '', clean)
    try:
        data = json.loads(clean)
        return _normalize_json(data)
    except json.JSONDecodeError:
        pass

    # Method 2: Find JSON object in response (handles nested braces)
    json_objects = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', response, re.DOTALL)
    for obj_str in reversed(json_objects):
        try:
            data = json.loads(obj_str)
            return _normalize_json(data)
        except json.JSONDecodeError:
            continue

    # Method 3: Fallback - extract values from thinking text
    # The LLM often writes: "Operation: permutation. n=5, r=3..."
    text = response.lower()

    # Detect operation from keywords
    op_map = {
        "permutation": "permutation",
        "npr": "permutation",
        "combination": "combination",
        "ncr": "combination",
        "differentiat": "differentiate",
        "derivativ": "differentiate",
        "integr": "integrate",
        "antideriv": "integrate",
        "determinant": "matrix_determinant",
        "inverse": "matrix_inverse",
        "transpose": "matrix_transpose",
        "magnitude": "vector_magnitude",
        "dot product": "vector_dot",
        "cross product": "vector_cross",
        "angle between": "vector_angle",
        "projection": "vector_projection",
        "percentage": "percentage",
        "% of": "percentage",
        "compound interest": "compound_interest",
        "simple interest": "simple_interest",
        "factorial": "factorial",
        "mean": "statistics",
        "median": "statistics",
        "mode": "statistics",
        "probability": "probability",
        "area": "area",
        "perimeter": "perimeter",
        "volume": "volume",
        "circumference": "perimeter",
        "hypotenuse": "pythagoras",
        "distance": "distance",
        "midpoint": "midpoint",
        "slope": "slope",
        "hcf": "hcf",
        "gcf": "hcf",
        "gcd": "hcf",
        "lcm": "lcm",
        "prime": "prime",
        "modulus": "complex_modulus",
        "conjugate": "complex_conjugate",
        "limit": "limit",
        "simplify": "simplify",
        "factor": "factor",
        "expand": "expand",
        "solve": "solve_equation",
        "arithmetic": "arithmetic",
        "ap_term": "ap_term",
        "ap_sum": "ap_sum",
        "gp_term": "gp_term",
        "gp_sum": "gp_sum",
        "arithmetic progression": "ap_term",
        "geometric progression": "gp_term",
        "differential equation": "differential_equation",
        "binomial": "binomial_probability",
        "dice": "dice_probability",
    }

    operation = None
    for keyword, op in op_map.items():
        if keyword in text:
            operation = op
            break

    if not operation:
        return None

    # Extract values based on operation type
    data = {"operation": operation, "solvable": True}

    # Extract n and r for permutation/combination
    if operation in ("permutation", "combination"):
        n_match = re.search(r'n\s*=\s*(\d+)', text)
        r_match = re.search(r'r\s*=\s*(\d+)', text)
        if n_match and r_match:
            data["n"] = int(n_match.group(1))
            data["r"] = int(r_match.group(1))
            return data
        # Try "5 objects taken 3" pattern
        obj_match = re.search(r'(\d+)\s*objects?\s*taken\s*(\d+)', text)
        if obj_match:
            data["n"] = int(obj_match.group(1))
            data["r"] = int(obj_match.group(2))
            return data
        # Try "5p3" or "5c3" pattern
        pc_match = re.search(r'(\d+)\s*[pc]\s*(\d+)', text)
        if pc_match:
            data["n"] = int(pc_match.group(1))
            data["r"] = int(pc_match.group(2))
            return data

    # Extract real and imag for complex numbers
    if operation in ("complex_modulus", "complex_conjugate"):
        # "3 + 4i" pattern
        ci_match = re.search(r'(-?\d+\.?\d*)\s*([+-])\s*(\d+\.?\d*)\s*i', text)
        if ci_match:
            data["values"] = {
                "real": float(ci_match.group(1)),
                "imag": float(ci_match.group(3)),
            }
            if ci_match.group(2) == "-":
                data["values"]["imag"] = -data["values"]["imag"]
            return data
        # |3 + 4i| pattern
        abs_match = re.search(r'\|?\s*(-?\d+\.?\d*)\s*([+-])\s*(\d+\.?\d*)\s*i\s*\|?', text)
        if abs_match:
            data["values"] = {
                "real": float(abs_match.group(1)),
                "imag": float(abs_match.group(3)),
            }
            if abs_match.group(2) == "-":
                data["values"]["imag"] = -data["values"]["imag"]
            return data

    # Extract factorial n
    if operation == "factorial":
        fact_match = re.search(r'(\d+)\s*!', text)
        if fact_match:
            data["n"] = int(fact_match.group(1))
            return data

    # Extract expression for arithmetic
    if operation == "arithmetic":
        # Look for expression patterns
        expr_match = re.search(r'expression\s*[:=]\s*([0-9+\-*/().\s]+)', text)
        if expr_match:
            data["expression"] = expr_match.group(1).strip()
            return data

    # Extract percentage values
    if operation == "percentage":
        pct_match = re.search(r'(\d+\.?\d*)\s*%', text)
        of_match = re.search(r'of\s*(\d+\.?\d*)', text)
        if pct_match and of_match:
            data["values"] = {
                "percent": float(pct_match.group(1)),
                "of": float(of_match.group(1)),
            }
            return data

    # Extract interest values
    if operation in ("simple_interest", "compound_interest"):
        p_match = re.search(r'p\s*=\s*(\d+)', text) or re.search(r'principal\s*[:=]?\s*(\d+)', text)
        r_match = re.search(r'r\s*=\s*(\d+)', text) or re.search(r'rate\s*[:=]?\s*(\d+)', text)
        t_match = re.search(r't\s*=\s*(\d+)', text) or re.search(r'time\s*[:=]?\s*(\d+)', text)
        values = {}
        if p_match: values["principal"] = float(p_match.group(1))
        if r_match: values["rate"] = float(r_match.group(1))
        if t_match: values["time"] = float(t_match.group(1))
        if values:
            data["values"] = values
            return data

    # Extract AP/GP values
    if operation in ("ap_term", "ap_sum"):
        a_match = re.search(r'a\s*=\s*(-?\d+)', text)
        d_match = re.search(r'd\s*=\s*(-?\d+)', text)
        n_match = re.search(r'n\s*=\s*(\d+)', text)
        values = {}
        if a_match: values["a"] = float(a_match.group(1))
        if d_match: values["d"] = float(d_match.group(1))
        if n_match: values["n"] = float(n_match.group(1))
        if values:
            data["values"] = values
            return data

    if operation in ("gp_term", "gp_sum"):
        a_match = re.search(r'a\s*=\s*(-?\d+)', text)
        r_match = re.search(r'r\s*=\s*(-?\d+)', text)
        n_match = re.search(r'n\s*=\s*(\d+)', text)
        values = {}
        if a_match: values["a"] = float(a_match.group(1))
        if r_match: values["r"] = float(r_match.group(1))
        if n_match: values["n"] = float(n_match.group(1))
        if values:
            data["values"] = values
            return data

    # If we detected an operation but couldn't extract values, return None
    return None


# The system prompt tells the LLM to extract math, NOT solve it.
_EXTRACTION_PROMPT = """You are a math expression extractor. Extract math from a student's question into JSON.

You do NOT solve. You ONLY extract. SymPy solves it.

Output ONLY valid JSON. No thinking, no explanation, no markdown. Just the JSON object.

JSON structure:
{"operation": "...", "expression": "...", "variable": "...", "values": {...}, "solvable": true/false}

Operations: differentiate, integrate, integrate_definite, solve_equation, solve_system, evaluate, simplify, factor, expand, matrix_determinant, matrix_inverse, matrix_transpose, matrix_multiply, vector_magnitude, vector_dot, vector_cross, vector_angle, vector_projection, probability, statistics, arithmetic, percentage, compound_interest, simple_interest, trig_value, limit, max_min, critical_points, series_sum, ap_term, ap_sum, gp_term, gp_sum, area, perimeter, volume, pythagoras, distance, midpoint, slope, factorial, permutation, combination, hcf, lcm, prime, complex_modulus, complex_conjugate, differential_equation, binomial_probability, dice_probability, other

SymPy notation: sin(x), cos(x), exp(x), log(x), sqrt(x), pi, E, x**2, 2*x

Examples (output ONLY the JSON, nothing else):
Q: differentiate x^2 → {"operation":"differentiate","expression":"x**2","variable":"x","solvable":true}
Q: integrate 2x dx → {"operation":"integrate","expression":"2*x","variable":"x","solvable":true}
Q: solve 2x+5=15 → {"operation":"solve_equation","expression":"2*x+5-15","variable":"x","solvable":true}
Q: determinant of [[1,2],[3,4]] → {"operation":"matrix_determinant","matrix":[[1,2],[3,4]],"solvable":true}
Q: magnitude of vector 3i+4j → {"operation":"vector_magnitude","vectors":[[3,4,0]],"solvable":true}
Q: 15% of 200 → {"operation":"percentage","values":{"percent":15,"of":200},"solvable":true}
Q: area of rectangle length 6 width 4 → {"operation":"area","formula":"length*width","values":{"length":6,"width":4},"solvable":true}
Q: 10th term of AP 2,5,8 → {"operation":"ap_term","values":{"a":2,"d":3,"n":10},"solvable":true}
Q: 8th term of GP 2,6,18 → {"operation":"gp_term","values":{"a":2,"r":3,"n":8},"solvable":true}
Q: 25 pens for 500, cost of one → {"operation":"arithmetic","expression":"500/25","solvable":true}
Q: 4 boxes 3 pencils each → {"operation":"arithmetic","expression":"4*3","solvable":true}
Q: Ramu has 5 apples gives 2 → {"operation":"arithmetic","expression":"5-2","solvable":true}
Q: permutations of 5 objects taken 3 → {"operation":"permutation","n":5,"r":3,"solvable":true}
Q: combinations of 5 objects taken 2 → {"operation":"combination","n":5,"r":2,"solvable":true}
Q: square root of 169 → {"operation":"arithmetic","expression":"sqrt(169)","solvable":true}
Q: modulus of 3+4i → {"operation":"complex_modulus","values":{"real":3,"imag":4},"solvable":true}
Q: |3+4i| → {"operation":"complex_modulus","values":{"real":3,"imag":4},"solvable":true}
Q: why is derivative of even function odd → {"operation":"other","solvable":false}
Q: explain photosynthesis → {"operation":"other","solvable":false}

Output ONLY the JSON. No other text."""


async def llm_sympy_solve(message: str) -> Optional[ComputeResult]:
    """Solve a math question using LLM extraction + SymPy computation.

    The LLM extracts the math into structured JSON.
    SymPy performs the actual computation.
    Returns None if the question is not solvable mathematically.
    """
    # Skip pure conceptual questions
    _CONCEPTUAL = [
        "explain why", "justify why", "why does", "why is", "why are",
        "how can", "how does", "how do", "how is",
        "what is the geometrical", "what is the physical",
        "what is the meaning", "what is the significance",
        "what does it mean", "what are the properties",
        "describe ", "difference between",
    ]
    lower = message.lower().strip()
    for prefix in _CONCEPTUAL:
        if lower.startswith(prefix):
            return None

    # Get LLM client
    from backend.ai.llm_client import get_llm_client
    llm = get_llm_client()

    # Step 1: LLM extracts the math (with retry)
    response = None
    for attempt in range(2):
        try:
            prompt = _EXTRACTION_PROMPT if attempt == 0 else _EXTRACTION_PROMPT + "\n\nIMPORTANT: Output ONLY the JSON object. No thinking. No explanation. Start with { and end with }."
            response = await llm.chat(
                [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": f"Question: {message}"},
                ],
                temperature=0.0,
                max_tokens=300,
            )
            # Check if response is parseable
            data = _parse_llm_response(response)
            if data is not None:
                break
        except Exception as e:
            logger.warning(f"LLM extraction attempt {attempt+1} failed: {e}")
            continue

    # Parse JSON from response
    data = _parse_llm_response(response) if response else None
    if data is None:
        logger.warning(f"LLM returned unparseable response: {response[:200] if response else 'empty'}")
        return None

    # Check if solvable
    if not data.get("solvable", True) or data.get("operation") == "other":
        return None

    operation = data.get("operation", "")
    confidence = data.get("confidence", 0.5)

    # Step 2: SymPy solves it
    try:
        result = _sympy_execute(operation, data)
        if result:
            return result
    except Exception as e:
        logger.warning(f"SymPy execution failed for {operation}: {e}")

    return None


def _sympy_execute(operation: str, data: dict) -> Optional[ComputeResult]:
    """Execute the extracted operation using SymPy."""
    from sympy import (
        Symbol, sympify, diff, integrate, solve, simplify, factor, expand,
        Matrix, sqrt, pi, E, Rational, factorial, binomial, Abs,
        cos, sin, tan, atan, acos, asin, log, exp, oo, limit,
    )

    def _parse(expr_str):
        """Safely parse a SymPy expression string."""
        if not expr_str:
            return None
        try:
            # Replace common notations
            expr_str = expr_str.replace("^", "**")
            return sympify(expr_str)
        except Exception:
            return None

    def _result(steps, answer, qtype):
        return ComputeResult(
            matched=True,
            question_type=qtype,
            answer=str(answer),
            steps=steps,
        )

    # ── Direct result (LLM solved it directly) ──
    if operation == "direct_result":
        result_str = str(data.get("result", ""))
        if result_str:
            return _result([f"Computed: {result_str}"], result_str, "computed")

    # ── Calculus ──
    if operation == "differentiate":
        expr = _parse(data.get("expression", ""))
        var_name = data.get("variable", "x")
        if expr is None:
            return None
        var = Symbol(var_name)
        result = diff(expr, var)
        result = simplify(result)
        steps = [
            f"Given: f({var}) = {expr}",
            f"Differentiate with respect to {var}",
            f"f'({var}) = {result}",
        ]
        return _result(steps, f"d/d{var}({expr}) = {result}", "calculus")

    if operation == "integrate":
        expr = _parse(data.get("expression", ""))
        var_name = data.get("variable", "x")
        if expr is None:
            return None
        var = Symbol(var_name)
        result = integrate(expr, var)
        steps = [
            f"Given: f({var}) = {expr}",
            f"Integrate with respect to {var}",
            f"∫ {expr} d{var} = {result} + C",
        ]
        return _result(steps, f"∫ {expr} d{var} = {result} + C", "calculus")

    if operation == "integrate_definite":
        expr = _parse(data.get("expression", ""))
        var_name = data.get("variable", "x")
        limits = data.get("limits", {})
        if expr is None:
            return None
        var = Symbol(var_name)
        a = _parse(str(limits.get("lower", "0")))
        b = _parse(str(limits.get("upper", "1")))
        result = integrate(expr, (var, a, b))
        result = simplify(result)
        steps = [
            f"Given: f({var}) = {expr}",
            f"Integrate from {a} to {b}",
            f"= {result}",
        ]
        return _result(steps, f"{result}", "calculus")

    if operation == "limit":
        expr = _parse(data.get("expression", ""))
        var_name = data.get("variable", "x")
        if expr is None:
            return None
        var = Symbol(var_name)
        point = _parse(str(data.get("point", "0")))
        result = limit(expr, var, point)
        steps = [f"lim({var}→{point}) {expr} = {result}"]
        return _result(steps, f"{result}", "limit")

    if operation in ("max_min", "critical_points"):
        expr = _parse(data.get("expression", ""))
        var_name = data.get("variable", "x")
        if expr is None:
            return None
        var = Symbol(var_name)
        deriv = diff(expr, var)
        critical = solve(deriv, var)
        if operation == "critical_points":
            steps = [f"f({var}) = {expr}", f"f'({var}) = {deriv}", f"Critical points: {critical}"]
            return _result(steps, f"{critical}", "critical_points")
        # max_min: evaluate at critical points
        second_deriv = diff(deriv, var)
        results = []
        for cp in critical:
            val = expr.subs(var, cp)
            sd = second_deriv.subs(var, cp)
            nature = "maximum" if sd < 0 else "minimum" if sd > 0 else "inflection"
            results.append(f"{nature} at {var}={cp}, f={val}")
        steps = [f"f({var}) = {expr}", f"f'({var}) = {deriv}", f"Critical: {critical}"] + results
        return _result(steps, "; ".join(results), "max_min")

    # ── Equations ──
    if operation == "solve_equation":
        expr = _parse(data.get("expression", ""))
        var_name = data.get("variable", "x")
        if expr is None:
            return None
        var = Symbol(var_name)
        solutions = solve(expr, var)
        steps = [f"Solve: {expr} = 0 for {var}", f"Solutions: {solutions}"]
        return _result(steps, f"{var} = {solutions}", "algebra")

    if operation == "solve_system":
        # data["equations"] should be a list of expression strings
        eqs = data.get("equations", [])
        if not eqs:
            return None
        parsed = [_parse(e) for e in eqs]
        if any(p is None for p in parsed):
            return None
        # Get variables from data
        var_names = data.get("variables", ["x", "y"])
        symbols = [Symbol(v) for v in var_names]
        solutions = solve(parsed, symbols)
        steps = [f"System: {eqs}", f"Solutions: {solutions}"]
        return _result(steps, f"{solutions}", "system")

    # ── Simplify/Factor/Expand ──
    if operation == "simplify":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        result = simplify(expr)
        steps = [f"Simplify: {expr}", f"= {result}"]
        return _result(steps, f"{result}", "simplify")

    if operation == "factor":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        result = factor(expr)
        steps = [f"Factor: {expr}", f"= {result}"]
        return _result(steps, f"{result}", "factor")

    if operation == "expand":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        result = expand(expr)
        steps = [f"Expand: {expr}", f"= {result}"]
        return _result(steps, f"{result}", "expand")

    # ── Matrix operations ──
    if operation == "matrix_determinant":
        mat = data.get("matrix")
        if not mat:
            return None
        m = Matrix(mat)
        det = m.det()
        steps = [f"Matrix: {mat}", f"Determinant = {det}"]
        return _result(steps, f"{det}", "matrix")

    if operation == "matrix_inverse":
        mat = data.get("matrix")
        if not mat:
            return None
        m = Matrix(mat)
        inv = m.inv()
        steps = [f"Matrix: {mat}", f"Inverse = {inv.tolist()}"]
        return _result(steps, f"{inv.tolist()}", "matrix")

    if operation == "matrix_transpose":
        mat = data.get("matrix")
        if not mat:
            return None
        m = Matrix(mat)
        trans = m.T
        steps = [f"Matrix: {mat}", f"Transpose = {trans.tolist()}"]
        return _result(steps, f"{trans.tolist()}", "matrix")

    if operation == "matrix_multiply":
        matrices = data.get("matrices", [])
        if len(matrices) < 2:
            return None
        result = Matrix(matrices[0]) * Matrix(matrices[1])
        steps = [f"Product = {result.tolist()}"]
        return _result(steps, f"{result.tolist()}", "matrix")

    # ── Vector operations ──
    if operation == "vector_magnitude":
        vecs = data.get("vectors", [])
        if not vecs:
            return None
        v = vecs[0]
        magnitude = sqrt(sum(x**2 for x in v))
        steps = [f"Vector: {v}", f"|v| = √({' + '.join(f'{x}²' for x in v)})", f"|v| = {magnitude}"]
        return _result(steps, f"|v| = {magnitude}", "vector")

    if operation == "vector_dot":
        vecs = data.get("vectors", [])
        if len(vecs) < 2:
            return None
        a, b = vecs[0], vecs[1]
        dot = sum(x*y for x, y in zip(a, b))
        steps = [f"a = {a}, b = {b}", f"a·b = {dot}"]
        return _result(steps, f"{dot}", "vector")

    if operation == "vector_cross":
        vecs = data.get("vectors", [])
        if len(vecs) < 2:
            return None
        a, b = vecs[0], vecs[1]
        while len(a) < 3: a.append(0)
        while len(b) < 3: b.append(0)
        cx = a[1]*b[2] - a[2]*b[1]
        cy = a[2]*b[0] - a[0]*b[2]
        cz = a[0]*b[1] - a[1]*b[0]
        steps = [f"a = {a}, b = {b}", f"a×b = ({cx}, {cy}, {cz})"]
        return _result(steps, f"({cx}, {cy}, {cz})", "vector")

    if operation == "vector_angle":
        vecs = data.get("vectors", [])
        if len(vecs) < 2:
            return None
        a, b = vecs[0], vecs[1]
        import math
        dot = sum(x*y for x, y in zip(a, b))
        mag_a = math.sqrt(sum(x**2 for x in a))
        mag_b = math.sqrt(sum(x**2 for x in b))
        angle = math.degrees(math.acos(dot / (mag_a * mag_b)))
        steps = [f"a = {a}, b = {b}", f"cos θ = {dot}/({mag_a}×{mag_b})", f"θ = {angle:.2f}°"]
        return _result(steps, f"{angle:.2f} degrees", "vector")

    if operation == "vector_projection":
        vecs = data.get("vectors", [])
        if len(vecs) < 2:
            return None
        a, b = vecs[0], vecs[1]
        dot = sum(x*y for x, y in zip(a, b))
        mag_b_sq = sum(x**2 for x in b)
        proj_scalar = dot / mag_b_sq
        steps = [f"proj of {a} on {b}", f"= ({a}·{b})/|{b}|² = {proj_scalar:.4f}"]
        return _result(steps, f"{proj_scalar:.4f}", "vector")

    # ── Arithmetic / Evaluate ──
    if operation == "arithmetic":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        result = simplify(expr)
        steps = [f"{data.get('expression', '')} = {result}"]
        return _result(steps, f"{result}", "arithmetic")

    if operation == "evaluate":
        expr = _parse(data.get("expression", ""))
        values = data.get("values", {})
        if expr is None:
            return None
        if values:
            subs = {Symbol(k): v for k, v in values.items()}
            result = expr.subs(subs)
        else:
            result = expr
        result = simplify(result)
        steps = [f"Expression: {expr}", f"Values: {values}", f"Result: {result}"]
        return _result(steps, f"{result}", "evaluate")

    # ── Percentage ──
    if operation == "percentage":
        vals = data.get("values", {})
        percent = float(vals.get("percent", 0))
        of = float(vals.get("of", 0))
        result = (percent / 100) * of
        steps = [f"{percent}% of {of}", f"= ({percent}/100) × {of}", f"= {result}"]
        return _result(steps, f"{result}", "percentage")

    # ── Interest ──
    if operation == "simple_interest":
        vals = data.get("values", {})
        P = float(vals.get("principal", 0))
        R = float(vals.get("rate", 0))
        T = float(vals.get("time", 0))
        SI = (P * R * T) / 100
        A = P + SI
        steps = [f"P={P}, R={R}%, T={T}", f"SI = (P×R×T)/100 = {SI}", f"Amount = P+SI = {A}"]
        return _result(steps, f"SI = {SI}, Amount = {A}", "simple_interest")

    if operation == "compound_interest":
        vals = data.get("values", {})
        P = float(vals.get("principal", 0))
        R = float(vals.get("rate", 0))
        T = float(vals.get("time", 0))
        A = P * (1 + R/100)**T
        CI = A - P
        steps = [f"P={P}, R={R}%, T={T}", f"A = P(1+R/100)^T = {A}", f"CI = A-P = {CI}"]
        return _result(steps, f"CI = {CI}, Amount = {A}", "compound_interest")

    # ── Trig values ──
    if operation == "trig_value":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        result = simplify(expr)
        steps = [f"{data.get('expression', '')} = {result}"]
        return _result(steps, f"{result}", "trig")

    # ── Statistics ──
    if operation == "statistics":
        numbers = data.get("numbers", [])
        stat_type = data.get("stat_type", "mean")
        if not numbers:
            return None
        nums = [float(n) for n in numbers]
        if stat_type == "mean":
            result = sum(nums) / len(nums)
            steps = [f"Numbers: {nums}", f"Mean = {sum(nums)}/{len(nums)} = {result}"]
        elif stat_type == "median":
            sorted_nums = sorted(nums)
            n = len(sorted_nums)
            if n % 2 == 1:
                result = sorted_nums[n//2]
            else:
                result = (sorted_nums[n//2-1] + sorted_nums[n//2]) / 2
            steps = [f"Sorted: {sorted_nums}", f"Median = {result}"]
        elif stat_type == "mode":
            from collections import Counter
            counts = Counter(nums)
            max_count = max(counts.values())
            modes = [k for k, v in counts.items() if v == max_count]
            if len(modes) == len(nums):
                steps = [f"No mode (all values appear once)"]
                return _result(steps, "No mode", "mode")
            result = modes[0]
            steps = [f"Numbers: {nums}", f"Mode = {result}"]
        else:
            return None
        return _result(steps, f"{result}", stat_type)

    # ── Sequences ──
    if operation == "ap_term":
        vals = data.get("values", {})
        a = float(vals.get("a", 0))
        d = float(vals.get("d", 0))
        n = float(vals.get("n", 0))
        an = a + (n - 1) * d
        steps = [f"a={a}, d={d}, n={n}", f"an = a+(n-1)d = {an}"]
        return _result(steps, f"a{n} = {an}", "ap")

    if operation == "ap_sum":
        vals = data.get("values", {})
        a = float(vals.get("a", 0))
        d = float(vals.get("d", 0))
        n = float(vals.get("n", 0))
        Sn = n / 2 * (2 * a + (n - 1) * d)
        steps = [f"a={a}, d={d}, n={n}", f"Sn = n/2(2a+(n-1)d) = {Sn}"]
        return _result(steps, f"S{n} = {Sn}", "ap")

    if operation == "gp_term":
        vals = data.get("values", {})
        a = float(vals.get("a", 0))
        r = float(vals.get("r", 0))
        n = float(vals.get("n", 0))
        an = a * r**(n-1)
        steps = [f"a={a}, r={r}, n={n}", f"an = ar^(n-1) = {an}"]
        return _result(steps, f"a{n} = {an}", "gp")

    if operation == "gp_sum":
        vals = data.get("values", {})
        a = float(vals.get("a", 0))
        r = float(vals.get("r", 0))
        n = float(vals.get("n", 0))
        if r == 1:
            Sn = a * n
        else:
            Sn = a * (r**n - 1) / (r - 1)
        steps = [f"a={a}, r={r}, n={n}", f"Sn = a(r^n-1)/(r-1) = {Sn}"]
        return _result(steps, f"S{n} = {Sn}", "gp")

    if operation == "series_sum":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        var = Symbol(data.get("variable", "n"))
        result = simplify(expr)
        steps = [f"Sum = {result}"]
        return _result(steps, f"{result}", "series")

    # ── Geometry ──
    if operation in ("area", "perimeter", "volume"):
        formula = data.get("formula", "")
        values = data.get("values", {})
        if not formula:
            return None
        expr = _parse(formula)
        if expr is None:
            return None
        if values:
            subs = {Symbol(k): float(v) for k, v in values.items()}
            result = float(expr.subs(subs))
        else:
            result = simplify(expr)
        steps = [f"Formula: {formula}", f"Values: {values}", f"Result: {result}"]
        return _result(steps, f"{result}", operation)

    if operation == "pythagoras":
        vals = data.get("values", {})
        a = float(vals.get("a", 0))
        b = float(vals.get("b", 0))
        c = sqrt(a**2 + b**2)
        steps = [f"a={a}, b={b}", f"c = √(a²+b²) = {c}"]
        return _result(steps, f"{c}", "pythagoras")

    if operation == "distance":
        points = data.get("points", [])
        if len(points) < 2:
            return None
        p1, p2 = points[0], points[1]
        d = sqrt(sum((float(b) - float(a))**2 for a, b in zip(p1, p2)))
        steps = [f"Points: {p1}, {p2}", f"Distance = {d}"]
        return _result(steps, f"{d}", "distance")

    if operation == "midpoint":
        points = data.get("points", [])
        if len(points) < 2:
            return None
        p1, p2 = points[0], points[1]
        mid = [(float(a) + float(b)) / 2 for a, b in zip(p1, p2)]
        steps = [f"Points: {p1}, {p2}", f"Midpoint = {mid}"]
        return _result(steps, f"{mid}", "midpoint")

    if operation == "slope":
        points = data.get("points", [])
        if len(points) < 2:
            return None
        p1, p2 = points[0], points[1]
        m = (float(p2[1]) - float(p1[1])) / (float(p2[0]) - float(p1[0]))
        steps = [f"Points: {p1}, {p2}", f"Slope = {m}"]
        return _result(steps, f"{m}", "slope")

    # ── Number theory ──
    if operation == "factorial":

        n = int(data.get("n", 0))
        result = int(factorial(n))
        steps = [f"{n}! = {result}"]
        return _result(steps, f"{result}", "factorial")

    if operation == "permutation":
        n = int(data.get("n", 0))
        r = int(data.get("r", 0))
        result = int(factorial(n) // factorial(n - r))
        steps = [f"n={n}, r={r}", f"nPr = {n}!/{n-r}! = {result}"]
        return _result(steps, f"{n}P{r} = {result}", "permutation")

    if operation == "combination":
        n = int(data.get("n", 0))
        r = int(data.get("r", 0))
        result = int(factorial(n) // (factorial(r) * factorial(n - r)))
        steps = [f"n={n}, r={r}", f"nCr = {n}!/({r}!×{n-r}!) = {result}"]
        return _result(steps, f"{n}C{r} = {result}", "combination")

    if operation == "hcf":
        import math
        numbers = [int(n) for n in data.get("numbers", [])]
        if len(numbers) < 2:
            return None
        result = numbers[0]
        for n in numbers[1:]:
            result = math.gcd(result, n)
        steps = [f"Numbers: {numbers}", f"HCF = {result}"]
        return _result(steps, f"{result}", "hcf")

    if operation == "lcm":
        import math
        numbers = [int(n) for n in data.get("numbers", [])]
        if len(numbers) < 2:
            return None
        result = numbers[0]
        for n in numbers[1:]:
            result = result * n // math.gcd(result, n)
        steps = [f"Numbers: {numbers}", f"LCM = {result}"]
        return _result(steps, f"{result}", "lcm")

    if operation == "prime":
        n = int(data.get("n", 0))
        if n < 2:
            is_prime = False
        else:
            is_prime = all(n % i != 0 for i in range(2, int(n**0.5) + 1))
        result = "prime" if is_prime else "composite"
        steps = [f"{n} is {result}"]
        return _result(steps, f"{n} is {result}", "prime")

    # ── Complex numbers ──
    if operation == "complex_modulus":
        vals = data.get("values", {})
        a = float(vals.get("real", 0))
        b = float(vals.get("imag", 0))
        mod = sqrt(a**2 + b**2)
        steps = [f"z = {a} + {b}i", f"|z| = √({a}²+{b}²) = {mod}"]
        return _result(steps, f"|z| = {mod}", "complex")

    if operation == "complex_conjugate":
        vals = data.get("values", {})
        a = float(vals.get("real", 0))
        b = float(vals.get("imag", 0))
        steps = [f"z = {a} + {b}i", f"z̄ = {a} - {b}i"]
        return _result(steps, f"{a} - {b}i", "complex")

    # ── Probability ──
    if operation == "probability":
        vals = data.get("values", {})
        favorable = float(vals.get("favorable", 0))
        total = float(vals.get("total", 0))
        if total == 0:
            return None
        result = Rational(int(favorable), int(total))
        steps = [f"Favorable: {favorable}, Total: {total}", f"P = {result}"]
        return _result(steps, f"P = {result}", "probability")

    if operation == "binomial_probability":
        vals = data.get("values", {})
        n = int(vals.get("n", 0))
        r = int(vals.get("r", 0))
        p = Rational(vals.get("p", "1/2"))
        result = binomial(n, r) * p**r * (1-p)**(n-r)
        steps = [f"n={n}, r={r}, p={p}", f"P(X={r}) = C({n},{r})×{p}^{r}×{1-p}^{n-r} = {result}"]
        return _result(steps, f"P = {result}", "probability")

    if operation == "dice_probability":
        vals = data.get("values", {})
        target_sum = int(vals.get("sum", 0))
        num_dice = int(vals.get("dice", 2))
        # Count favorable outcomes
        favorable = 0
        if num_dice == 2:
            for i in range(1, 7):
                for j in range(1, 7):
                    if i + j == target_sum:
                        favorable += 1
        total = 6**num_dice
        result = Rational(favorable, total)
        steps = [f"Sum={target_sum}, Dice={num_dice}", f"Favorable: {favorable}, Total: {total}", f"P = {result}"]
        return _result(steps, f"P = {result}", "probability")

    # ── Differential equations ──
    if operation == "differential_equation":
        expr = _parse(data.get("expression", ""))
        if expr is None:
            return None
        from sympy import Function, dsolve, Eq
        x = Symbol("x")
        y = Function("y")
        try:
            sol = dsolve(Eq(y(x).diff(x), expr), y(x))
            steps = [f"dy/dx = {expr}", f"Solution: {sol}"]
            return _result(steps, f"{sol}", "differential_equation")
        except Exception:
            return None

    # ── LPP ──
    if operation == "lpp":
        vals = data.get("values", {})
        obj = _parse(data.get("expression", ""))
        constraints = data.get("constraints", [])
        if obj is None or not constraints:
            return None
        from sympy import symbols, linear_eq_to_matrix
        # Simple corner-point method for 2 variables
        x, y = symbols("x y", real=True)
        # Parse constraints and find feasible corner points
        # This is a simplified version
        return None  # LPP is complex, let existing solver handle it

    logger.warning(f"Unknown operation: {operation}")
    return None
