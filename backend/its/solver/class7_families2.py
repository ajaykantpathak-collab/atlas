"""class7_families2.py -- class-7 batch: fraction arithmetic,
triangle/parallelogram areas, expression evaluation with givens.
Split from class7_families.py to keep every regex authored in a raw
string (heredoc patches once shipped literal backspace characters).
"""

from __future__ import annotations

import re

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"
_FRAC = r"(-?\d+)\s*/\s*(\d+)"


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _n(tok: str) -> float:
    return float(tok.replace(",", ""))


# --------------------------------------------------------------------------- #
# FRACTION_ARITHMETIC
# --------------------------------------------------------------------------- #


def model_fraction_arithmetic(text: str) -> ModelResult:
    from fractions import Fraction

    low = text.lower()
    if not re.search(r"\d\s*/\s*\d", low):
        return _no("FRACTION_ARITHMETIC", "no fractions present")
    m = re.search(r"(?:add|sum\s+of)\s+(" + _FRAC + r")\s+(?:and|to)\s+(" +
                  _FRAC + r")", low)
    if m:
        f1 = Fraction(int(m.group(2)), int(m.group(3)))
        f2 = Fraction(int(m.group(5)), int(m.group(6)))
        val = f1 + f2
        return ModelResult(
            structure="FRACTION_ARITHMETIC", matched=True, confidence=0.97,
            quantities={"f1": float(f1), "f2": float(f2)},
            governing_equation=f"{f1} + {f2}",
            final_answer=f"{val} = {float(val):.6g}",
            numeric_answer=float(val),
            steps=[f"{f1} + {f2} = {val} = {float(val):.6g}"],
            note="fraction addition")
    m = re.search(r"subtract\s+(" + _FRAC + r")\s+from\s+(" + _FRAC + r")",
                  low)
    if m:
        f_sub = Fraction(int(m.group(2)), int(m.group(3)))
        f_base = Fraction(int(m.group(5)), int(m.group(6)))
        val = f_base - f_sub
        return ModelResult(
            structure="FRACTION_ARITHMETIC", matched=True, confidence=0.97,
            quantities={"f1": float(f_base), "f2": float(f_sub)},
            governing_equation=f"{f_base} - {f_sub}",
            final_answer=f"{val} = {float(val):.6g}",
            numeric_answer=float(val),
            steps=[f"{f_base} - {f_sub} = {val} = {float(val):.6g}"],
            note="fraction subtraction")
    return _no("FRACTION_ARITHMETIC", "no fraction add/subtract form")


# --------------------------------------------------------------------------- #
# TRIANGLE_PARALLELOGRAM_AREA
# --------------------------------------------------------------------------- #


def model_triangle_parallelogram_area(text: str) -> ModelResult:
    low = text.lower()
    if not re.search(r"triangle|parallelogram", low):
        return _no("TRIANGLE_PARALLELOGRAM_AREA", "no such shape")
    if not re.search(r"area", low):
        return _no("TRIANGLE_PARALLELOGRAM_AREA", "no area ask")
    bm = re.search(r"base\s*(?:of\s*)?(?:is\s*)?(" + _NUM + r")", low)
    hm = re.search(r"height\s*(?:of\s*)?(?:is\s*)?(" + _NUM + r")", low)
    if not bm or not hm:
        return _no("TRIANGLE_PARALLELOGRAM_AREA", "need base + height")
    b, h = _n(bm.group(1)), _n(hm.group(1))
    if b <= 0 or h <= 0:
        return _no("TRIANGLE_PARALLELOGRAM_AREA", "non-positive dimension")
    if re.search(r"triangle", low):
        val, eq = 0.5 * b * h, "A = 1/2 x base x height"
        steps = [f"A = 1/2 x {b:g} x {h:g} = {val:.6g}"]
    else:
        val, eq = b * h, "A = base x height"
        steps = [f"A = {b:g} x {h:g} = {val:.6g}"]
    return ModelResult(
        structure="TRIANGLE_PARALLELOGRAM_AREA", matched=True,
        confidence=0.96, quantities={"base": b, "height": h},
        governing_equation=eq, final_answer=f"{val:.6g}",
        numeric_answer=val, steps=steps, note="base-height area")


# --------------------------------------------------------------------------- #
# EVAL_EXPR_WITH_GIVENS
# --------------------------------------------------------------------------- #


def model_eval_expr_with_givens(text: str) -> ModelResult:
    import sympy

    low = text.lower()
    if not re.search(r"evaluate|compute|find\s+the\s+value", low):
        return _no("EVAL_EXPR_WITH_GIVENS", "no evaluate ask")
    where_parts = re.split(r"\bwhere\b", text, flags=re.I)
    if len(where_parts) < 2:
        return _no("EVAL_EXPR_WITH_GIVENS", "no where-givens")
    em = re.search(r"(?:evaluate|compute)\s*[:\-]?\s*(.+)",
                   where_parts[0], re.I)
    if not em:
        return _no("EVAL_EXPR_WITH_GIVENS", "no expression after evaluate")
    raw = em.group(1).strip().rstrip("?").strip()
    raw = re.sub(r"\s+", " ", raw)
    if not re.fullmatch(r"[0-9a-z+\-*/^(). ]+", raw):
        return _no("EVAL_EXPR_WITH_GIVENS", "expression not clean math")
    py = raw.replace("^", "**")
    py = re.sub(r"(\d)([a-z])", r"\1*\2", py)         # 3a -> 3*a
    py = re.sub(r"(\d)\s+([a-z])", r"\1*\2", py)      # 3 a -> 3*a
    env = {}
    for m in re.finditer(r"\b([a-z])\s+(?:is|=)\s*(-?\d+(?:\.\d+)?)\b",
                         where_parts[1], re.I):
        env[m.group(1)] = float(m.group(2))
    if not env:
        return _no("EVAL_EXPR_WITH_GIVENS", "no variable givens")
    try:
        expr = sympy.sympify(py, locals={v: sympy.Symbol(v)
                                         for v in env})
    except Exception:
        return _no("EVAL_EXPR_WITH_GIVENS", "sympify failed")
    subs = {sympy.Symbol(k): v for k, v in env.items()}
    result = expr.subs(subs)
    if not result.is_number:
        return _no("EVAL_EXPR_WITH_GIVENS",
                   f"unresolved symbols: {result.free_symbols}")
    val = float(result)
    return ModelResult(
        structure="EVAL_EXPR_WITH_GIVENS", matched=True, confidence=0.96,
        quantities=env, governing_equation=f"{raw} with {env}",
        final_answer=f"{val:.6g}", numeric_answer=val,
        steps=[f"{raw} with " +
               ", ".join(f"{k}={v:g}" for k, v in env.items()) +
               f" = {val:.6g}"],
        note="expression evaluation with givens")
