"""Small, closed-world exact calculation kernels.

This module deliberately does not try to be a general mathematical parser.  Its
input languages are bounded, and every accepted result is checked independently
before it is returned.
"""

from __future__ import annotations

import ast
from decimal import Decimal, localcontext
from fractions import Fraction
import re
from typing import Any

import sympy as sp


_NUMBER = r"[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?"
_NUMBER_RE = re.compile(rf"^{_NUMBER}$")
_MAX_TEXT = 256
_MAX_NODES = 80
_MAX_BITS = 4096


class _BoundError(ValueError):
    """An accepted language construct exceeded a deliberately small bound."""


def _guard_fraction(value: Fraction) -> Fraction:
    if value.numerator.bit_length() > _MAX_BITS or value.denominator.bit_length() > _MAX_BITS:
        raise _BoundError("exact result exceeds the resource bound")
    return value


def _fraction_token(token: str) -> Fraction:
    if not _NUMBER_RE.fullmatch(token):
        raise ValueError("invalid numeric literal")
    sign = -1 if token.startswith("-") else 1
    unsigned = token[1:] if token[:1] in "+-" else token
    mantissa, _, exponent_text = re.split(r"([eE])", unsigned, maxsplit=1) if re.search(r"[eE]", unsigned) else (unsigned, "", "0")
    exponent = int(exponent_text or "0")
    if abs(exponent) > 5000:
        raise _BoundError("numeric literal exceeds the resource bound")
    whole, _, fraction = mantissa.partition(".")
    digits = (whole + fraction).lstrip("0") or "0"
    numerator = int(digits) * sign
    scale = len(fraction) - exponent
    if scale >= 0:
        value = Fraction(numerator, 10**scale)
    else:
        value = Fraction(numerator * 10 ** (-scale), 1)
    return _guard_fraction(value)


def _number_source(source: str, node: ast.Constant) -> str:
    token = ast.get_source_segment(source, node)
    if token is None:
        raise ValueError("missing numeric literal")
    return token


class _FractionExpression:
    def __init__(self, source: str):
        self.source = source
        self.nodes = 0

    def evaluate(self, node: ast.AST) -> Fraction:
        self.nodes += 1
        if self.nodes > _MAX_NODES:
            raise _BoundError("expression is too large")
        if isinstance(node, ast.Expression):
            return self.evaluate(node.body)
        if isinstance(node, ast.Constant):
            if isinstance(node.value, bool) or not isinstance(node.value, (int, float)):
                raise ValueError("only finite numeric literals are supported")
            return _fraction_token(_number_source(self.source, node))
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
            value = self.evaluate(node.operand)
            return _guard_fraction(value if isinstance(node.op, ast.UAdd) else -value)
        if not isinstance(node, ast.BinOp) or not isinstance(node.op, (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow)):
            raise ValueError("unsupported arithmetic syntax")
        left = self.evaluate(node.left)
        right = self.evaluate(node.right)
        if isinstance(node.op, ast.Add):
            return _guard_fraction(left + right)
        if isinstance(node.op, ast.Sub):
            return _guard_fraction(left - right)
        if isinstance(node.op, ast.Mult):
            return _guard_fraction(left * right)
        if isinstance(node.op, ast.Div):
            if right == 0:
                raise ValueError("division by zero")
            return _guard_fraction(left / right)
        if right.denominator != 1 or not -10 <= right.numerator <= 10:
            raise ValueError("power must be an integer from -10 through 10")
        return _guard_fraction(left**right.numerator)


class _DecimalExpression:
    """A separate decimal walk, used only as a finite-decimal cross-check."""

    def __init__(self, source: str):
        self.source = source

    def evaluate(self, node: ast.AST) -> Decimal:
        if isinstance(node, ast.Expression):
            return self.evaluate(node.body)
        if isinstance(node, ast.Constant):
            return Decimal(_number_source(self.source, node))
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
            value = self.evaluate(node.operand)
            return value if isinstance(node.op, ast.UAdd) else -value
        if not isinstance(node, ast.BinOp) or not isinstance(node.op, (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow)):
            raise ValueError("unsupported arithmetic syntax")
        left = self.evaluate(node.left)
        right = self.evaluate(node.right)
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            return left / right
        return left ** int(right)


def _finite_decimal(value: Fraction) -> Decimal | None:
    denominator = value.denominator
    twos = fives = 0
    while denominator % 2 == 0:
        denominator //= 2
        twos += 1
    while denominator % 5 == 0:
        denominator //= 5
        fives += 1
    if denominator != 1:
        return None
    scale = max(twos, fives)
    integer = value.numerator * (2 ** (scale - twos)) * (5 ** (scale - fives))
    sign = "-" if integer < 0 else ""
    digits = str(abs(integer)).rjust(scale + 1, "0")
    if scale:
        return Decimal(f"{sign}{digits[:-scale]}.{digits[-scale:]}")
    return Decimal(f"{sign}{digits}")


def _fmt_fraction(value: Fraction) -> str:
    return str(value.numerator) if value.denominator == 1 else f"{value.numerator}/{value.denominator}"


def _result(answer: str, steps: list[str], route: str, checks: list[str], operation: str, givens: dict[str, Any], target: str, scope: str) -> dict[str, Any]:
    return {
        "answer": answer,
        "steps": steps,
        "route": route,
        "checks": checks,
        "problem": {"operation": operation, "givens": givens, "target": target},
        "verification_scope": scope,
    }


def _arithmetic(question: str) -> dict[str, Any]:
    expression = question[len("Evaluate "):]
    if not expression or len(expression) > _MAX_TEXT:
        raise ValueError("Evaluate requires a bounded expression")
    try:
        tree = ast.parse(expression, mode="eval")
    except (SyntaxError, ValueError, RecursionError) as exc:
        raise ValueError("invalid arithmetic expression") from exc
    evaluator = _FractionExpression(expression)
    value = evaluator.evaluate(tree)
    decimal_check = _finite_decimal(value)
    checks = ["fraction AST interpretation passed"]
    if decimal_check is not None:
        with localcontext() as context:
            context.prec = 5000
            context.Emax = 1000000
            context.Emin = -1000000
            decimal_value = _DecimalExpression(expression).evaluate(tree)
            if decimal_value != decimal_check:
                raise ValueError("independent decimal check failed")
        checks.append("independent Decimal arithmetic checker passed")
    else:
        checks.append("Decimal checker not applicable to a repeating rational")
    return _result(
        _fmt_fraction(value),
        [f"Evaluate {expression}", f"exact result = {_fmt_fraction(value)}"],
        "exact_arithmetic",
        checks,
        "evaluate",
        {"expression": expression},
        "value",
        "bounded Fraction evaluation with an independent Decimal check when finite",
    )


class _PolynomialExpression:
    """Build SymPy objects from a whitelisted AST; never parse SymPy text."""

    def __init__(self, source: str, symbol: sp.Symbol):
        self.source = source
        self.symbol = symbol
        self.nodes = 0

    def build(self, node: ast.AST) -> sp.Expr:
        self.nodes += 1
        if self.nodes > _MAX_NODES:
            raise _BoundError("equation is too large")
        if isinstance(node, ast.Expression):
            return self.build(node.body)
        if isinstance(node, ast.Name):
            if node.id != "x":
                raise ValueError("the only allowed variable is x")
            return self.symbol
        if isinstance(node, ast.Constant):
            if isinstance(node.value, bool) or not isinstance(node.value, (int, float)):
                raise ValueError("only finite numeric literals are supported")
            return sp.Rational(_fraction_token(_number_source(self.source, node)).numerator, _fraction_token(_number_source(self.source, node)).denominator)
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
            value = self.build(node.operand)
            return value if isinstance(node.op, ast.UAdd) else -value
        if not isinstance(node, ast.BinOp) or not isinstance(node.op, (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow)):
            raise ValueError("unsupported polynomial syntax")
        left = self.build(node.left)
        right = self.build(node.right)
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            if right.has(self.symbol):
                raise ValueError("polynomial division must have a constant denominator")
            if right == 0:
                raise ValueError("division by zero")
            return left / right
        if not right.is_Integer or not -10 <= int(right) <= 10:
            raise ValueError("polynomial powers must be small integers")
        if int(right) < 0:
            raise ValueError("negative powers are not polynomials")
        return left**int(right)


def _equation_side(source: str) -> sp.Expr:
    # ^ is accepted as the familiar polynomial power spelling, but only after
    # the rest of the source has passed a deliberately narrow character check.
    if "^" in source:
        if "^^" in source:
            raise ValueError("invalid power syntax")
        source = source.replace("^", "**")
    if len(source) > _MAX_TEXT:
        raise _BoundError("equation is too long")
    try:
        tree = ast.parse(source, mode="eval")
    except (SyntaxError, ValueError, RecursionError) as exc:
        raise ValueError("invalid polynomial expression") from exc
    symbol = sp.Symbol("x")
    return _PolynomialExpression(source, symbol).build(tree)


def _fmt_root(root: sp.Expr) -> str:
    return sp.sstr(sp.radsimp(root))


def _equation(question: str) -> dict[str, Any]:
    match = re.fullmatch(r"Solve\s+for\s+x\s*:\s*(.*?)\s*=\s*(.*?)", question)
    if not match:
        raise ValueError("Solve for x requires one complete equation")
    left_text, right_text = match.groups()
    if not left_text.strip() or not right_text.strip():
        raise ValueError("both equation sides are required")
    left = _equation_side(left_text.strip())
    right = _equation_side(right_text.strip())
    x = sp.Symbol("x")
    polynomial = sp.Poly(sp.expand(left - right), x, domain=sp.QQ)
    degree = polynomial.degree()
    if degree == -sp.oo:
        return _result(
            "all real numbers",
            [f"{left_text.strip()} = {right_text.strip()}", "both sides are identical"],
            "exact_polynomial",
            ["degree check: zero polynomial", "all-solution status verified"],
            "solve",
            {"equation": f"{left_text.strip()} = {right_text.strip()}"},
            "x",
            "complete solution set for a degree-zero identity",
        )
    if degree == 0:
        return _result(
            "no solution",
            [f"{left_text.strip()} = {right_text.strip()}", "the resulting constant is nonzero"],
            "exact_polynomial",
            ["degree check: nonzero constant", "no-solution status verified"],
            "solve",
            {"equation": f"{left_text.strip()} = {right_text.strip()}"},
            "x",
            "complete solution set for a degree-zero contradiction",
        )
    if degree > 2:
        raise ValueError("only linear and quadratic polynomials are supported")

    roots: list[sp.Expr]
    if degree == 1:
        a, b = polynomial.all_coeffs()
        roots = [-b / a]
        multiplicities = [1]
    else:
        a, b, c = polynomial.all_coeffs()
        discriminant = sp.factor(b * b - 4 * a * c)
        root_base = -b / (2 * a)
        if discriminant == 0:
            roots = [root_base]
            multiplicities = [2]
        else:
            radical = sp.sqrt(discriminant)
            roots = [root_base + radical / (2 * a), root_base - radical / (2 * a)]
            multiplicities = [1, 1]
    for root in roots:
        if sp.simplify(polynomial.as_expr().subs(x, root)) != 0:
            raise ValueError("root substitution check failed")
    formatted = [_fmt_root(root) for root in roots]
    answer = f"x = {formatted[0]}" if len(formatted) == 1 else "x = " + ", ".join(formatted)
    return _result(
        answer,
        [f"{left_text.strip()} = {right_text.strip()}", f"degree = {degree}", f"roots = {', '.join(formatted)}"],
        "exact_polynomial",
        [f"degree check: {degree} (at most 2)", f"root multiplicities: {multiplicities}", "substitution check passed for every root"],
        "solve",
        {"equation": f"{left_text.strip()} = {right_text.strip()}"},
        "x",
        "complete degree-one or degree-two root set with exact substitution",
    )


_UNIT_NUMBER = re.compile(rf"^{_NUMBER}$")
_ASSIGNMENT = re.compile(rf"^(?P<key>[A-Za-z_]+)\s*=\s*(?P<value>{_NUMBER})\s+(?P<unit>[A-Za-z]+(?:/[A-Za-z]+(?:\^2)?)?)$")
_CALCULATE_QUESTION = re.compile(r"^Calculate\s+(?P<kind>speed|force|moles):(?P<body>.*)$", re.DOTALL)


def _quantity(piece: str) -> tuple[str, Fraction, str]:
    match = _ASSIGNMENT.fullmatch(piece.strip())
    if not match:
        raise ValueError("each given must be one named quantity")
    return match.group("key"), _fraction_token(match.group("value")), match.group("unit")


def _unit_calculation(question: str, kind: str) -> dict[str, Any]:
    prefix = f"Calculate {kind}:"
    body = question[len(prefix):].strip()
    if body.endswith("."):
        body = body[:-1].rstrip()
    pieces = body.split(",")
    expected = {"speed": {"distance", "time"}, "force": {"mass", "acceleration"}, "moles": {"mass", "molar_mass"}}[kind]
    if len(pieces) != 2:
        raise ValueError("exactly two givens are required")
    parsed = [_quantity(piece) for piece in pieces]
    if len({key for key, _, _ in parsed}) != 2 or {key for key, _, _ in parsed} != expected:
        raise ValueError("ambiguous or unsupported given names")
    data = {key: (value, unit) for key, value, unit in parsed}

    if kind == "speed":
        length_factor = {"m": Fraction(1), "km": Fraction(1000), "cm": Fraction(1, 100)}
        time_factor = {"s": Fraction(1), "min": Fraction(60), "h": Fraction(3600)}
        distance, distance_unit = data["distance"]
        duration, duration_unit = data["time"]
        if distance_unit not in length_factor or duration_unit not in time_factor:
            raise ValueError("unsupported speed unit")
        if distance < 0 or duration <= 0:
            raise ValueError("speed requires nonnegative distance and positive time")
        metres = distance * length_factor[distance_unit]
        seconds = duration * time_factor[duration_unit]
        value = _guard_fraction(metres / seconds)
        if value * seconds != metres:
            raise ValueError("speed inverse check failed")
        target_unit = "m/s"
        steps = [f"distance = {_fmt_fraction(distance)} {distance_unit} = {_fmt_fraction(metres)} m", f"time = {_fmt_fraction(duration)} {duration_unit} = {_fmt_fraction(seconds)} s", f"speed = distance / time = {_fmt_fraction(value)} {target_unit}"]
        check = "inverse speed check: speed × time reproduces the converted distance"
    elif kind == "force":
        mass_factor = {"kg": Fraction(1), "g": Fraction(1, 1000)}
        acceleration_factor = {"m/s^2": Fraction(1), "cm/s^2": Fraction(1, 100)}
        mass, mass_unit = data["mass"]
        acceleration, acceleration_unit = data["acceleration"]
        if mass_unit not in mass_factor or acceleration_unit not in acceleration_factor:
            raise ValueError("unsupported force unit")
        if mass <= 0:
            raise ValueError("force requires positive mass")
        kilograms = mass * mass_factor[mass_unit]
        metres_per_second_sq = acceleration * acceleration_factor[acceleration_unit]
        value = _guard_fraction(kilograms * metres_per_second_sq)
        if value / kilograms != metres_per_second_sq:
            raise ValueError("force inverse check failed")
        target_unit = "N"
        steps = [f"mass = {_fmt_fraction(mass)} {mass_unit} = {_fmt_fraction(kilograms)} kg", f"acceleration = {_fmt_fraction(acceleration)} {acceleration_unit} = {_fmt_fraction(metres_per_second_sq)} m/s^2", f"force = mass × acceleration = {_fmt_fraction(value)} {target_unit}"]
        check = "inverse force check: force / mass reproduces the converted acceleration"
    else:
        mass_factor = {"g": Fraction(1, 1000), "kg": Fraction(1)}
        molar_factor = {"g/mol": Fraction(1, 1000), "kg/mol": Fraction(1)}
        mass, mass_unit = data["mass"]
        molar_mass, molar_unit = data["molar_mass"]
        if mass_unit not in mass_factor or molar_unit not in molar_factor:
            raise ValueError("unsupported mole unit")
        if mass < 0 or molar_mass <= 0:
            raise ValueError("moles requires nonnegative mass and positive molar mass")
        kilograms = mass * mass_factor[mass_unit]
        kilograms_per_mole = molar_mass * molar_factor[molar_unit]
        value = _guard_fraction(kilograms / kilograms_per_mole)
        if value * kilograms_per_mole != kilograms:
            raise ValueError("moles inverse check failed")
        target_unit = "mol"
        steps = [f"mass = {_fmt_fraction(mass)} {mass_unit} = {_fmt_fraction(kilograms)} kg", f"molar mass = {_fmt_fraction(molar_mass)} {molar_unit} = {_fmt_fraction(kilograms_per_mole)} kg/mol", f"moles = mass / molar mass = {_fmt_fraction(value)} {target_unit}"]
        check = "inverse moles check: moles × molar mass reproduces the converted mass"

    givens = {key: {"value": _fmt_fraction(value), "unit": unit} for key, (value, unit) in data.items()}
    return _result(f"{_fmt_fraction(value)} {target_unit}", steps, "exact_units", ["unit conversion passed", check], kind, givens, kind, "exact unit conversion, domain checks, and inverse relation")


def compute_exact(question: str, subject: str = "") -> dict[str, Any] | None:
    """Compute one of the explicitly supported closed-world question forms."""
    if not isinstance(question, str):
        raise ValueError("question must be text")
    question = question.strip()
    if question.startswith("Evaluate"):
        if not re.match(r"^Evaluate\s+", question):
            raise ValueError("Evaluate requires a space before the expression")
        return _arithmetic(question)
    if question.startswith("Solve"):
        return _equation(question)
    unit_match = _CALCULATE_QUESTION.fullmatch(question)
    if unit_match:
        return _unit_calculation(question, unit_match.group("kind"))
    for kind in ("speed", "force", "moles"):
        if question.startswith(f"Calculate {kind}"):
            raise ValueError("supported unit question is not a complete string")
    return None
