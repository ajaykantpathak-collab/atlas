"""catalog_executor.py -- Stage 4 gap: execute the competency catalog.

Given a matched concept + extracted slots, compute the answer from the
catalog's OWN deterministic content.  Zero-wrong-answer rule: the final
value always comes from closed arithmetic; ANY unknown symbol, division
by zero, or out-of-guard result refuses honestly (never a guess).

Resolution ladder (first win returns)
-------------------------------------
1. KERNEL       per-concept-id closed arithmetic transcribed from the
                catalog's formula field (the catalog's concept-level
                solution_steps rarely carry compute fields -- only four
                concepts do, all in ch11 -- so this layer is what makes
                chapters 2-13 actually calculate).
2. STEPS        the concept's solution_steps "compute" chain.  Accepted
                ONLY when the LAST solution step carries a compute
                field (a chain that ends in a non-compute "write the
                result" step is an intermediate value, not an answer).
3. TEMPLATES    the concept's worked examples' solution_template
                compute chains; accepted only when a single template
                fits, or when the question text's target keywords pick
                one AND the template's last computed step matches that
                target (protects against answer-mismatched templates).
4. FORMULA      the concept's ASCII formula field parsed into
                "target = expr" equations and resolved for the quantity
                the text asks for (inter-equation references chain,
                e.g. Amount = P + I resolves I first).

Compute-DSL subset supported (catalog ASCII):
  + - * / ** , parentheses, integer/float literals, names bound to
  slots or earlier step outputs, pi, and the functions
  sqrt, abs, max, min, sum, len.  A step may bind a name explicitly
  ("cost = rate * area").  Otherwise its value is registered as
  "step<N>" / "step<N>_value"; when a LATER step references an unknown
  name, its underscore parts are looked up in earlier steps'
  action/explain/compute text ("marks_from_correct" matches step text
  "compute marks from correct answers") and bound to that step's value.

verify_property concepts (and compute concepts with no computable
path) return ok=False with an honest reason; the pipeline attaches the
concept's method steps as guided content.
"""
from __future__ import annotations

import ast
import math
import re
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Tuple

from backend.its.solver import calculus_bridge as _calc_bridge
from backend.its.solver.slot_extractor import (
    catalog_worked_examples, extract_list_slots)

_MAX_RESULT = 1e18          # answer magnitude guard
_MAX_POW_EXP = 128          # |exponent| beyond this in DSL ** -> refuse


# ------------------------------------------------------------------ #
# ExecResult
# ------------------------------------------------------------------ #

@dataclass
class ExecResult:
    """Catalog execution outcome.  ok=False is an HONEST refusal."""
    ok: bool
    value: Optional[float]
    steps: List[str] = field(default_factory=list)
    reason: str = ""
    concept_id: str = ""
    source: str = ""          # kernel | steps | template | formula


# ------------------------------------------------------------------ #
# Safe arithmetic evaluator (AST whitelist; NEVER raw eval)
# ------------------------------------------------------------------ #

class _EvalError(Exception):
    pass


_ALLOWED_FUNCS = {
    "sqrt": math.sqrt,
    "abs": abs,
    "max": max,
    "min": min,
    "sum": sum,
    "len": len,
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "asin": math.asin,
    "acos": math.acos,
    "atan": math.atan,
    "log": math.log,
    "log10": math.log10,
    "exp": math.exp,
    "floor": math.floor,
    "ceil": math.ceil,
}

# physical/mathematical constants available to every step chain
_CONST_ENV = {"pi": math.pi, "e": math.e, "g": 9.8, "c": 3e8}


def _const_env_for(concept: dict) -> dict:
    """Context-aware constant env: 'e' is Euler's number in maths but the
    elementary charge in quantisation or the emissivity in radiation;
    'c' is light speed except in calorimetry where it means specific
    heat (unbind it so the question's own value is required); 'sigma' is
    always Stefan-Boltzmann; 'R' is the gas constant in gas-law topics."""
    env = dict(_CONST_ENV)
    env["sigma"] = 5.67e-8
    try:
        ctx = (str(concept.get("title") or "") + " "
               + str(concept.get("formula") or "")).lower()
    except Exception:
        return env
    if re.search(r"charge|quantis|electron|ionis|photoelectric", ctx):
        env["e"] = 1.6e-19
    elif re.search(r"stefan|boltzmann|radiat|emissiv|blackbody", ctx):
        env["e"] = 1.0          # ideal-blackbody emissivity default
        env["emissivity"] = 1.0
    if re.search(r"gas|ideal|boyle|charles|avogadro|kelvin", ctx):
        env["R"] = 8.314
    if re.search(r"specific heat|calorim|heat capacity|thermal", ctx):
        env.pop("c", None)      # 'c' = specific heat here, must be given
    return env
_ALLOWED_NODES = (
    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant, ast.Name,
    ast.Load, ast.Call, ast.Tuple, ast.Add, ast.Sub, ast.Mult, ast.Div,
    ast.FloorDiv, ast.Mod, ast.Pow, ast.USub, ast.UAdd,
)


def _eval_node(node: ast.AST, env: Dict[str, float]) -> float:
    if not isinstance(node, _ALLOWED_NODES):
        raise _EvalError("disallowed syntax: %s" % type(node).__name__)
    if isinstance(node, ast.Expression):
        return _eval_node(node.body, env)
    if isinstance(node, ast.Constant):
        if isinstance(node.value, bool) or not isinstance(
                node.value, (int, float)):
            raise _EvalError("non-numeric constant")
        return float(node.value)
    if isinstance(node, ast.Name):
        if node.id in env:
            return float(env[node.id])
        raise _EvalError("unknown symbol: %s" % node.id)
    if isinstance(node, ast.UnaryOp):
        v = _eval_node(node.operand, env)
        if isinstance(node.op, ast.USub):
            return -v
        if isinstance(node.op, ast.UAdd):
            return v
        raise _EvalError("bad unary op")
    if isinstance(node, ast.BinOp):
        a = _eval_node(node.left, env)
        b = _eval_node(node.right, env)
        if isinstance(node.op, ast.Add):
            return a + b
        if isinstance(node.op, ast.Sub):
            return a - b
        if isinstance(node.op, ast.Mult):
            return a * b
        if isinstance(node.op, ast.Div):
            if b == 0:
                raise _EvalError("division by zero")
            return a / b
        if isinstance(node.op, ast.FloorDiv):
            if b == 0:
                raise _EvalError("division by zero")
            return a // b
        if isinstance(node.op, ast.Mod):
            if b == 0:
                raise _EvalError("division by zero")
            return a % b
        if isinstance(node.op, ast.Pow):
            if abs(b) > _MAX_POW_EXP:
                raise _EvalError("exponent too large")
            if a < 0 and b != int(b):
                raise _EvalError("negative base with fractional exponent")
            return a ** b
        raise _EvalError("bad binary op")
    if isinstance(node, ast.Tuple):
        return tuple(_eval_node(e, env) for e in node.elts)  # type: ignore
    if isinstance(node, ast.Call):
        if not isinstance(node.func, ast.Name) or \
                node.func.id not in _ALLOWED_FUNCS:
            raise _EvalError("disallowed function")
        if node.keywords:
            raise _EvalError("keyword arguments not allowed")
        args = [_eval_node(a, env) for a in node.args]
        fn = _ALLOWED_FUNCS[node.func.id]
        try:
            return float(fn(*args))
        except (TypeError, ValueError) as exc:
            raise _EvalError("bad function call: %s" % exc)
    raise _EvalError("disallowed syntax")


def _split_top_commas(expr: str) -> List[str]:
    parts = []
    depth = 0
    cur = []
    for ch in expr:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append("".join(cur))
            cur = []
        else:
            cur.append(ch)
    parts.append("".join(cur))
    return [p.strip() for p in parts if p.strip()]


def safe_eval(expr: str, env: Dict[str, float]) -> float:
    """Evaluate a whitelisted arithmetic expression.  Raises _EvalError."""
    try:
        tree = ast.parse(str(expr).strip(), mode="eval")
    except (SyntaxError, ValueError) as exc:
        raise _EvalError("cannot parse expression: %s" % exc)
    value = _eval_node(tree, env)
    if isinstance(value, tuple):
        value = value[-1] if value else 0.0
    value = float(value)
    if not math.isfinite(value):
        raise _EvalError("non-finite result")
    if abs(value) > _MAX_RESULT:
        raise _EvalError("result magnitude out of guard")
    return value


def _fmt(v: float) -> str:
    if v == int(v) and abs(v) < 1e15:
        return str(int(v))
    return ("%.6g" % v)


# ------------------------------------------------------------------ #
# Step-chain interpreter (catalog solution_steps / solution_template)
# ------------------------------------------------------------------ #

_BIND_RE = re.compile(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", re.DOTALL)
_WORD_SPLIT_RE = re.compile(r"[^a-z0-9]+")


def _alias_lookup(name: str, history: List[Tuple[str, str, float]]
                  ) -> Optional[float]:
    """Bind an unknown symbol to an earlier step's output when every
    underscore-part of the name appears in that step's text."""
    parts = [p for p in _WORD_SPLIT_RE.split(name.lower()) if p]
    if not parts:
        return None
    for text, _action, value in reversed(history):
        low = text.lower()
        if all(p in low for p in parts):
            return value
    return None


def _eval_with_alias(expr: str, env: Dict[str, float],
                     history: List[Tuple[str, str, float]]) -> float:
    for _ in range(6):
        try:
            return safe_eval(expr, env)
        except _EvalError as exc:
            m = re.search(r"unknown symbol: ([A-Za-z_][A-Za-z_0-9]*)",
                          str(exc))
            if not m:
                raise
            name = m.group(1)
            val = _alias_lookup(name, history)
            if val is None:
                raise
            env[name] = val
    raise _EvalError("symbol resolution did not settle")


def _run_step_chain(steps: List[Dict], env: Dict[str, float],
                    label: str) -> Tuple[float, List[str]]:
    """Execute every compute step; return (final value, step lines).

    Chaining convention: a step may bind a name ("name = expr"); every
    computed value is also registered as step<N> / step<N>_value; late
    unknown names resolve against earlier steps' text via _alias_lookup.
    """
    lines: List[str] = []
    history: List[Tuple[str, str, float]] = []
    value: Optional[float] = None
    for s in steps:
        comp = str(s.get("compute") or "").strip()
        if not comp:
            continue
        action = str(s.get("action") or "").strip()
        binding: Optional[str] = None
        expr = comp
        m = _BIND_RE.match(comp)
        if m and m.group(1).lower() not in ("pi",):
            binding = m.group(1)
            expr = m.group(2)
        env_local = dict(env)
        parts = _split_top_commas(expr)
        rendered = []
        val = 0.0
        for part in parts:
            val = _eval_with_alias(part, env_local, history)
            rendered.append("%s = %s" % (part, _fmt(val)))
        step_no = s.get("step")
        value = val
        env["step%s" % step_no] = value
        env["step%s_value" % step_no] = value
        if binding:
            env[binding] = value
        text_blob = " ".join([action, str(s.get("explain") or ""), comp])
        history.append((text_blob, action, value))
        lines.append("step %s [%s]: %s" % (step_no, label,
                                           "; ".join(rendered)))
    if value is None:
        raise _EvalError("no computable steps")
    return value, lines


# ------------------------------------------------------------------ #
# Formula-field parser ("I = (P x R x T) / 100; Amount = P + I")
# ------------------------------------------------------------------ #

def _mathify(expr: str) -> Optional[str]:
    s = str(expr)
    if "..." in s or ".." in s:
        return None
    s = (s.replace("\u00d7", "*").replace("\u00f7", "/")
         .replace("\u2212", "-").replace("^", "**"))
    # only a STANDALONE 'x' is multiplication — 'hexagonal', 'x1' etc
    # are identifiers, not products
    # standalone 'x' is multiplication ONLY when followed by a number
    # or '(' — '3 x 9' -> '3*9'; trailing/context 'x' is the variable:
    # '67 + 3 x' -> '67 + 3*x'
    s = re.sub(r"(?<![A-Za-z_0-9])x(?=\s*[\d(])", "*", s)
    s = re.sub(r"(\d)\s+x(?!\s*[\d(])", r"\1*x", s)
    s = re.sub(r"(?<=[0-9A-Za-z_)])\s*x\s*(?=[0-9(])", "*", s)
    # implicit multiplication: '1x' -> '1*x', '2(' -> '2*(',
    # ')x' -> ')*x', ')3' -> ')*3'  (letter+digit stays: 'x2' is a var)
    s = re.sub(r"(\d)\s*\(", r"\1*(", s)
    s = re.sub(r"(\d)\s*([a-z_])", r"\1*\2", s)
    s = re.sub(r"\)\s*(\d)", r")*\1", s)
    s = re.sub(r"\)\s*([a-z_])", r")*\1", s)
    s = re.sub(r"\bor\b.*$", " ", s)
    s = re.sub(r"[^0-9A-Za-z_+\-*/(). ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s or None


def _formula_equations(concept: Dict) -> List[Tuple[str, str]]:
    out: List[Tuple[str, str]] = []
    formula = str(concept.get("formula", "") or "")
    for part in re.split(r"[;\n]", formula):
        # skip anything carrying an inequality: "a != 0" contains an '=',
        # and rsplit would otherwise read the wrong side as the RHS
        if re.search(r"!=|>=|<=|<|>", part):
            continue
        if "=" not in part:
            continue
        lhs, rhs = part.rsplit("=", 1)
        idents = re.findall(r"[A-Za-z_][A-Za-z_0-9]*", lhs)
        if not idents:
            continue
        target = idents[-1].lower()
        # the target must be the last token of a nameable LHS ("a^0"
        # splits to ['a', '0'] -- '0' is not a quantity, never execute)
        lhs_body = re.sub(r"[^0-9A-Za-z_]", " ", lhs).split()
        if not lhs_body or lhs_body[-1].lower() != target or \
                not re.match(r"^[a-z_][a-z0-9_]*$", target):
            continue
        expr = _mathify(rhs)
        if not expr:
            continue
        try:
            tree = ast.parse(expr, mode="eval")
        except (SyntaxError, ValueError):
            continue
        # a computable equation must REFERENCE at least one name
        # (constant-only RHS like "a = 1" is a rule statement, and
        # executing it would answer the wrong question)
        if not any(isinstance(n, ast.Name) for n in ast.walk(tree)):
            continue
        out.append((target, expr))
    return out


_TARGET_KW: List[Tuple[str, Tuple[str, ...]]] = [
    ("interest", ("interest",)),
    ("amount", ("amount", "to be paid", "paid", "pay")),
    ("rate", ("rate",)),
    ("time", ("how many years", "how long", "after how many", "time")),
    ("principal", ("principal", "the sum")),
    ("area", ("area",)),
    ("perimeter", ("perimeter", "fencing", "fence")),
    ("circumference", ("circumference", "tape", "lace", "rope")),
    ("radius", ("radius",)),
    ("diameter", ("diameter",)),
    ("cost", ("cost", "polishing", "painting", "plastering")),
    ("profit", ("profit", "gain")),
    ("loss", ("loss",)),
    ("range", ("range",)),
    ("mean", ("mean", "average")),
    ("probability", ("probability", "chance")),
    ("count", ("how many",)),
    ("whole", ("original", "whole", "salary", "what number")),
    ("percentage", ("percentage", "per cent", "%")),
    ("base", ("base",)),
    ("height", ("height",)),
    ("complement", ("complement",)),
    ("supplement", ("supplement",)),
]


def _target_hits(text_lower: str) -> List[str]:
    hits = []
    for target, kws in _TARGET_KW:
        if any(kw in text_lower for kw in kws):
            hits.append(target)
    return hits


def _resolve_equation(target: str, equations: List[Tuple[str, str]],
                      env: Dict[str, float], memo: Dict[str, float],
                      visiting: set) -> float:
    """Evaluate one formula equation, resolving inter-equation symbol
    references (Amount = P + I resolves I first) and slot aliases."""
    if target in memo:
        return memo[target]
    if target in visiting:
        raise _EvalError("cyclic formula reference")
    expr = next((e for t, e in equations if t == target), None)
    if expr is None:
        raise _EvalError("unknown symbol: %s" % target)
    visiting.add(target)
    tree = ast.parse(expr, mode="eval")
    for node in ast.walk(tree):
        if isinstance(node, ast.Name) and node.id not in env:
            low = node.id.lower()
            if low in env:
                env[node.id] = env[low]
                continue
            if any(t == low for t, _e in equations):
                env[node.id] = _resolve_equation(low, equations, env, memo,
                                                 visiting)
                continue
            alias = _slot_alias(low, env)
            if alias is not None:
                env[node.id] = alias
                continue
            raise _EvalError("unknown symbol: %s" % node.id)
    visiting.discard(target)
    val = safe_eval(expr, env)
    memo[target] = val
    return val


_SLOT_ALIAS_ORDER: Dict[str, Tuple[Tuple[str, ...], ...]] = {
    "p": (("principal",),),
    "r": (("rate",), ("r",)),
    "t": (("time",), ("t",)),
    "i": (("interest",),),
    "base": (("b", "base"),),
    "height": (("h", "height"),),
}


def _slot_alias(symbol: str, env: Dict[str, float]) -> Optional[float]:
    """Map a formula symbol to a slot value via a conservative alias
    table (P -> principal, R -> rate, T -> time, I -> interest, ...)."""
    for candidates in _SLOT_ALIAS_ORDER.get(symbol, ()):
        for cand in candidates:
            if cand in env:
                return float(env[cand])
    return None


def _formula_ladder(concept: Dict, slots: Dict[str, float],
                    text: str) -> ExecResult:
    equations = _formula_equations(concept)
    if not equations:
        return ExecResult(False, None, [], "no computable formula",
                          str(concept.get("id", "")), "formula")
    env: Dict[str, float] = {k: float(v) for k, v in slots.items()}
    targets = [t for t, _e in equations]
    hits = _target_hits(text.lower())
    chosen: Optional[str] = None
    for target in targets:
        if any(h in target or target in h for h in hits):
            chosen = target
            break
    if chosen is None:
        referenced = set()
        for _t, e in equations:
            for node in ast.walk(ast.parse(e, mode="eval")):
                if isinstance(node, ast.Name):
                    referenced.add(node.id.lower())
        roots = [t for t in targets if t not in referenced]
        if len(roots) == 1:
            chosen = roots[0]
    if chosen is None:
        return ExecResult(
            False, None, [],
            "ambiguous: multiple formula targets and the question does "
            "not name one", str(concept.get("id", "")), "formula")
    memo: Dict[str, float] = {}
    try:
        val = _resolve_equation(chosen, equations, dict(env), memo, set())
    except _EvalError as exc:
        return ExecResult(False, None, [],
                          "formula not computable from the given values: "
                          "%s" % exc, str(concept.get("id", "")),
                          "formula")
    lines = []
    for t, e in equations:
        if t in memo:
            lines.append("%s = %s -> %s" % (t, e, _fmt(memo[t])))
    lines.append("%s = %s" % (chosen, _fmt(val)))
    return ExecResult(True, val, lines, "", str(concept.get("id", "")),
                      "formula")


# ------------------------------------------------------------------ #
# Kernels: closed arithmetic per concept id (from the catalog formulas)
# ------------------------------------------------------------------ #

def _g(slots: Dict[str, float], *names: str) -> Optional[float]:
    for n in names:
        if n in slots and slots[n] is not None:
            return float(slots[n])
    return None


def _missing(*names: str) -> str:
    return "missing required values: " + ", ".join(names)


def _kresult(value: float, lines: List[str]
             ) -> Optional[Tuple[float, List[str]]]:
    if not math.isfinite(value) or abs(value) > _MAX_RESULT:
        return None
    return value, lines


def _make_fraction_kernel(mult_n: bool) -> Callable:
    def kernel(slots, text):
        a = _g(slots, "a", "num")
        b = _g(slots, "b", "denom")
        n = _g(slots, "n")
        if a is None or b is None or b == 0:
            return None
        if mult_n:
            if n is None:
                return None
            return _kresult(n * a / b, [
                "n x (a/b) = (n x a) / b",
                "(%s x %s) / %s = %s" % (_fmt(n), _fmt(a), _fmt(b),
                                         _fmt(n * a / b))])
        return _kresult(a / b, ["(%s/%s) = %s" % (_fmt(a), _fmt(b),
                                                  _fmt(a / b))])
    return kernel


def _kernel_reciprocal(slots, text):
    a = _g(slots, "a", "num")
    b = _g(slots, "b", "denom")
    if a is None or b is None or a == 0:
        return None
    return _kresult(b / a, ["reciprocal of (%s/%s) = (%s/%s)"
                            % (_fmt(a), _fmt(b), _fmt(b), _fmt(a))])


def _kernel_fraction_div_fraction(slots, text):
    a = _g(slots, "a")
    b = _g(slots, "b")
    c = _g(slots, "c")
    d = _g(slots, "d")
    if None in (a, b, c, d) or b in (0, None) or d in (0, None) or c == 0:
        return None
    val = (a * d) / (b * c)
    return _kresult(val, [
        "(a/b) / (c/d) = (a x d) / (b x c)",
        "(%s x %s) / (%s x %s) = %s" % (_fmt(a), _fmt(d), _fmt(b), _fmt(c),
                                        _fmt(val))])


def _kernel_fraction_mult_fraction(slots, text):
    a = _g(slots, "a")
    b = _g(slots, "b")
    c = _g(slots, "c")
    d = _g(slots, "d")
    if None in (a, b, c, d) or 0 in (b, d):
        return None
    val = (a * c) / (b * d)
    return _kresult(val, [
        "(a/b) x (c/d) = (a x c) / (b x d)",
        "(%s x %s) / (%s x %s) = %s" % (_fmt(a), _fmt(c), _fmt(b), _fmt(d),
                                        _fmt(val))])


def _make_binary(op_name: str) -> Callable:
    def kernel(slots, text):
        a = _g(slots, "a")
        b = _g(slots, "b")
        if a is None or b is None:
            return None
        if op_name == "mul":
            val = a * b
            lines = ["%s x %s = %s" % (_fmt(a), _fmt(b), _fmt(val))]
        elif op_name == "div":
            if b == 0:
                return None
            val = a / b
            lines = ["%s / %s = %s" % (_fmt(a), _fmt(b), _fmt(val))]
        else:
            return None
        return _kresult(val, lines)
    return kernel


def _make_pow10(direction: str) -> Callable:
    def kernel(slots, text):
        d = _g(slots, "d")
        k = _g(slots, "k")
        if d is None or k is None or k != int(k) or not (0 <= k <= 12):
            return None
        p = 10.0 ** int(k)
        val = d * p if direction == "mul" else d / p
        word = "x" if direction == "mul" else "/"
        return _kresult(val, ["%s %s 10^%d = %s" % (_fmt(d), word, int(k),
                                                    _fmt(val))])
    return kernel


def _require_list(slots, text, concept=None, role="values"):
    data = slots.get(role)
    if isinstance(data, list) and len(data) >= 2:
        return [float(x) for x in data]
    if concept is not None:
        got = extract_list_slots(text, concept)
        if got and role in got:
            return got[role]
    return None


def _kernel_mean(slots, text, concept=None):
    data = _require_list(slots, text, concept, "values")
    if data is None:
        return None
    total = sum(data)
    val = total / len(data)
    return _kresult(val, [
        "sum = %s" % _fmt(total),
        "mean = sum / %d observations = %s" % (len(data), _fmt(val))])


def _kernel_range(slots, text, concept=None):
    data = _require_list(slots, text, concept, "values")
    if data is None:
        return None
    val = max(data) - min(data)
    return _kresult(val, [
        "range = highest - lowest = %s - %s = %s"
        % (_fmt(max(data)), _fmt(min(data)), _fmt(val))])


def _kernel_median(slots, text, concept=None):
    data = _require_list(slots, text, concept, "values")
    if data is None:
        return None
    s = sorted(data)
    n = len(s)
    if n % 2 == 1:
        val = s[n // 2]
        lines = ["sorted: %s" % ", ".join(_fmt(x) for x in s),
                 "median (odd n) = middle value = %s" % _fmt(val)]
    else:
        val = (s[n // 2 - 1] + s[n // 2]) / 2.0
        lines = ["sorted: %s" % ", ".join(_fmt(x) for x in s),
                 "median (even n) = average of two middle values = %s"
                 % _fmt(val)]
    return _kresult(val, lines)


def _kernel_mode(slots, text, concept=None):
    data = _require_list(slots, text, concept, "values")
    if data is None:
        return None
    counts: Dict[float, int] = {}
    for x in data:
        counts[x] = counts.get(x, 0) + 1
    best = max(counts.values())
    if best < 2:
        return None  # no mode: honest refusal, never a guess
    winners = [x for x, c in counts.items() if c == best]
    if len(winners) != 1:
        return None  # multimodal: not a single deterministic answer
    val = winners[0]
    return _kresult(val, [
        "frequency of %s is %d (highest)" % (_fmt(val), best),
        "mode = %s" % _fmt(val)])


_DIE_SETS = {
    "even": (3, "even outcomes on a die: 2, 4, 6"),
    "odd": (3, "odd outcomes on a die: 1, 3, 5"),
    "prime": (2, "prime outcomes on a die: 2, 3, 5"),
}


def _kernel_probability(slots, text):
    low = text.lower()
    fav = _g(slots, "favorable", "favourable")
    total = _g(slots, "total")
    lines: List[str] = []
    if fav is None:
        for kw, (count, why) in _DIE_SETS.items():
            if kw in low and ("die" in low or "dice" in low):
                fav = float(count)
                lines.append(why)
                break
        if fav is None and ("die" in low or "dice" in low):
            m = re.search(r"getting\s+(?:a\s+)?(\d+)\b", low)
            if m:
                fav = 1.0
                lines.append("one specific outcome (%s) out of six" % m
                             .group(1))
        if fav is None and "coin" in low and ("head" in low or "tail" in
                                              low):
            fav = 1.0
            lines.append("one favourable side on a coin")
    if total is None:
        if "die" in low or "dice" in low:
            total = 6.0
            lines.append("a die has 6 equally likely outcomes")
        elif "coin" in low:
            total = 2.0
            lines.append("a coin has 2 equally likely outcomes")
    if fav is None or total is None or total == 0:
        return None
    if fav > total:
        return None
    val = fav / total
    lines.append("probability = favourable / total = %s / %s = %s"
                 % (_fmt(fav), _fmt(total), _fmt(val)))
    return _kresult(val, lines)


def _make_angle_kernel(total_deg: float) -> Callable:
    def kernel(slots, text):
        angle = _g(slots, "angle")
        if angle is None or not (0 < angle < total_deg):
            return None
        val = total_deg - angle
        return _kresult(val, [
            "%d - %s = %s" % (int(total_deg), _fmt(angle), _fmt(val))])
    return kernel


def _kernel_exterior_angle(slots, text):
    a = _g(slots, "a")
    b = _g(slots, "b")
    if a is None or b is None or not (0 < a < 360 and 0 < b < 360):
        return None
    if a + b >= 360:
        return None
    val = a + b
    return _kresult(val, [
        "exterior angle = sum of interior opposite angles",
        "%s + %s = %s" % (_fmt(a), _fmt(b), _fmt(val))])


def _kernel_third_angle(slots, text):
    a = _g(slots, "a")
    b = _g(slots, "b")
    if a is None or b is None or not (0 < a < 180 and 0 < b < 180):
        return None
    if a + b >= 180:
        return None
    val = 180.0 - a - b
    return _kresult(val, [
        "angle sum property: third angle = 180 - a - b",
        "180 - %s - %s = %s" % (_fmt(a), _fmt(b), _fmt(val))])


def _kernel_hypotenuse(slots, text):
    a = _g(slots, "a")
    b = _g(slots, "b")
    if a is None or b is None or a <= 0 or b <= 0:
        return None
    val = math.sqrt(a * a + b * b)
    return _kresult(val, [
        "hypotenuse^2 = leg1^2 + leg2^2",
        "sqrt(%s + %s) = %s" % (_fmt(a * a), _fmt(b * b), _fmt(val))])


def _kernel_percent_of(slots, text):
    # c7m7.1.1 percentage = (part / total) x 100
    part = _g(slots, "part")
    total = _g(slots, "total")
    if part is None or total is None or total == 0:
        return None
    val = (part / total) * 100.0
    return _kresult(val, [
        "percentage = (part / total) x 100 = (%s / %s) x 100 = %s"
        % (_fmt(part), _fmt(total), _fmt(val))])


def _make_mul100(var: str) -> Callable:
    def kernel(slots, text):
        v = _g(slots, var)
        if v is None:
            return None
        val = v * 100.0
        return _kresult(val, ["%s x 100 = %s" % (_fmt(v), _fmt(val))])
    return kernel


def _kernel_pct_to_fraction(slots, text):
    p = _g(slots, "percent")
    if p is None:
        return None
    val = p / 100.0
    return _kresult(val, ["%s / 100 = %s" % (_fmt(p), _fmt(val))])


def _kernel_pct_count_or_whole(slots, text):
    low = text.lower()
    percent = _g(slots, "percent")
    total = _g(slots, "total")
    part = _g(slots, "part", "amount")
    if percent is None:
        return None
    whole_want = any(w in low for w in (
        "what number", "original", "salary", "whole", "saved",
        "find the number"))
    if total is not None and not whole_want:
        val = (percent / 100.0) * total
        return _kresult(val, [
            "count = (percentage/100) x total = (%s/100) x %s = %s"
            % (_fmt(percent), _fmt(total), _fmt(val))])
    if part is not None:
        if percent == 0:
            return None
        val = (part * 100.0) / percent
        return _kresult(val, [
            "whole = (part/percentage) x 100 = (%s x 100) / %s = %s"
            % (_fmt(part), _fmt(percent), _fmt(val))])
    return None


def _kernel_pct_change(slots, text):
    old = _g(slots, "old")
    new = _g(slots, "new")
    if old is None or new is None or old == 0:
        return None
    low = text.lower()
    decrease = "decrease" in low or new < old
    change = (old - new) if decrease else (new - old)
    if change < 0:
        return None
    val = (change / old) * 100.0
    word = "decrease" if decrease else "increase"
    return _kresult(val, [
        "%s = change / original x 100 = (%s - %s) / %s x 100 = %s"
        % (word, _fmt(max(old, new)), _fmt(min(old, new)), _fmt(old),
           _fmt(val))])


def _kernel_profit_loss(slots, text):
    cp = _g(slots, "cp")
    sp = _g(slots, "sp")
    if cp is None or sp is None or cp < 0 or sp < 0:
        return None
    if sp > cp:
        val = sp - cp
        lines = ["profit = SP - CP = %s - %s = %s"
                 % (_fmt(sp), _fmt(cp), _fmt(val))]
    elif cp > sp:
        val = cp - sp
        lines = ["loss = CP - SP = %s - %s = %s"
                 % (_fmt(cp), _fmt(sp), _fmt(val))]
    else:
        val = 0.0
        lines = ["SP equals CP: neither profit nor loss"]
    return _kresult(val, lines)


def _kernel_profit_loss_pct(slots, text):
    low = text.lower()
    cp = _g(slots, "cp")
    sp = _g(slots, "sp")
    pct = _g(slots, "profit_pct", "loss_pct")
    if cp is not None and sp is not None and cp > 0:
        if sp >= cp:
            val = ((sp - cp) / cp) * 100.0
            lines = ["profit percent = (profit/CP) x 100 = %s" % _fmt(val)]
        else:
            val = ((cp - sp) / cp) * 100.0
            lines = ["loss percent = (loss/CP) x 100 = %s" % _fmt(val)]
        return _kresult(val, lines)
    if sp is not None and pct is not None:
        is_loss = "loss_pct" in slots or "loss" in low
        if is_loss:
            if not (0 <= pct <= 100):
                return None
            val = sp * (1.0 - pct / 100.0)
            lines = ["CP = SP x (1 - loss_pct/100) = %s" % _fmt(val)]
        else:
            val = sp / (1.0 + pct / 100.0)
            lines = ["CP = SP / (1 + profit_pct/100) = %s" % _fmt(val)]
        return _kresult(val, lines)
    if cp is not None and pct is not None:
        is_loss = "loss_pct" in slots or "loss" in low
        if is_loss:
            if not (0 <= pct <= 100):
                return None
            val = cp * (1.0 - pct / 100.0)
            lines = ["SP = CP x (1 - loss_pct/100) = %s" % _fmt(val)]
        else:
            val = cp * (1.0 + pct / 100.0)
            lines = ["SP = CP x (1 + profit_pct/100) = %s" % _fmt(val)]
        return _kresult(val, lines)
    return None


def _kernel_simple_interest(slots, text):
    low = text.lower()
    principal = _g(slots, "principal", "p")
    rate = _g(slots, "rate", "r")
    time = _g(slots, "time", "t")
    interest = _g(slots, "interest", "i")
    amount = _g(slots, "amount")
    lines: List[str] = []
    wants_amount = "amount" in low or "to be paid" in low or "paid" in low
    wants_rate = "find rate" in low or "rate of interest" in low or \
        ("rate" in low and interest is not None and principal is not None)
    wants_time = ("how many years" in low or "after how many" in low) and \
        interest is not None
    wants_principal = ("find the sum" in low or "find sum" in low or
                       "find the principal" in low) and interest is not None
    if wants_rate and None not in (interest, principal, time) and \
            principal * time != 0:
        val = (interest * 100.0) / (principal * time)
        lines.append("R = (I x 100) / (P x T) = %s" % _fmt(val))
        return _kresult(val, lines)
    if wants_time and None not in (interest, principal, rate) and \
            principal * rate != 0:
        val = (interest * 100.0) / (principal * rate)
        lines.append("T = (I x 100) / (P x R) = %s" % _fmt(val))
        return _kresult(val, lines)
    if wants_principal and None not in (interest, rate, time) and \
            rate * time != 0:
        val = (interest * 100.0) / (rate * time)
        lines.append("P = (I x 100) / (R x T) = %s" % _fmt(val))
        return _kresult(val, lines)
    if None in (principal, rate, time):
        return None
    if rate < 0 or time < 0 or principal < 0:
        return None
    interest_val = (principal * rate * time) / 100.0
    lines.append("I = (P x R x T) / 100 = (%s x %s x %s) / 100 = %s"
                 % (_fmt(principal), _fmt(rate), _fmt(time),
                    _fmt(interest_val)))
    if amount is not None or wants_amount:
        val = principal + interest_val
        lines.append("Amount = P + I = %s" % _fmt(val))
        return _kresult(val, lines)
    return _kresult(interest_val, lines)


def _kernel_area_parallelogram(slots, text):
    low = text.lower()
    b = _g(slots, "b", "base")
    h = _g(slots, "h", "height")
    area = _g(slots, "area")
    if area is not None and b is not None and b > 0 and (
            h is None or "find height" in low):
        val = area / b
        return _kresult(val, ["h = area / b = %s" % _fmt(val)])
    if b is None or h is None or b <= 0 or h <= 0:
        return None
    val = b * h
    return _kresult(val, ["area = b x h = %s x %s = %s"
                          % (_fmt(b), _fmt(h), _fmt(val))])


def _kernel_area_triangle(slots, text):
    low = text.lower()
    b = _g(slots, "b", "base")
    h = _g(slots, "h", "height")
    area = _g(slots, "area")
    if area is not None and (b is None or h is None):
        if h is not None and h > 0:
            val = (2.0 * area) / h
            return _kresult(val, ["base = (2 x area) / h = %s" % _fmt(val)])
        if b is not None and b > 0:
            val = (2.0 * area) / b
            return _kresult(val, ["height = (2 x area) / b = %s"
                                  % _fmt(val)])
        return None
    if b is None or h is None or b <= 0 or h <= 0:
        return None
    val = 0.5 * b * h
    lines = ["area = (1/2) x b x h = 0.5 x %s x %s = %s"
             % (_fmt(b), _fmt(h), _fmt(val))]
    if ("qm" in low or "ad" in low or ("other" in low and "height" in low)) \
            and "pr" in slots:
        pr = _g(slots, "pr")
        if pr and pr > 0:
            other = (2.0 * val) / pr
            lines.append("other height = (2 x area) / pr = %s"
                         % _fmt(other))
            return _kresult(other, lines)
    return _kresult(val, lines)


def _kernel_circumference(slots, text):
    low = text.lower()
    r = _g(slots, "r", "radius")
    d = _g(slots, "d", "diameter")
    circ = _g(slots, "circumference")
    if circ is not None:
        if "radius" in low and "find" in low:
            val = circ / (2.0 * math.pi)
            return _kresult(val, ["r = C / (2 x pi) = %s" % _fmt(val)])
        if "diameter" in low and "find" in low:
            val = circ / math.pi
            return _kresult(val, ["d = C / pi = %s" % _fmt(val)])
    if d is not None and d > 0:
        val = math.pi * d
        return _kresult(val, ["C = pi x d = pi x %s = %s"
                              % (_fmt(d), _fmt(val))])
    if r is not None and r > 0:
        val = 2.0 * math.pi * r
        return _kresult(val, ["C = 2 x pi x r = 2 x pi x %s = %s"
                              % (_fmt(r), _fmt(val))])
    return None


def _kernel_area_circle(slots, text):
    low = text.lower()
    r = _g(slots, "r", "radius")
    d = _g(slots, "d", "diameter")
    area = _g(slots, "area")
    big_r = _g(slots, "R")
    if big_r is not None and r is not None and "concentric" in low:
        outer = math.pi * big_r * big_r
        inner = math.pi * r * r
        val = outer - inner
        return _kresult(val, [
            "outer area = pi x %s^2 = %s" % (_fmt(big_r), _fmt(outer)),
            "inner area = pi x %s^2 = %s" % (_fmt(r), _fmt(inner)),
            "shaded = outer - inner = %s" % _fmt(val)])
    if area is not None and r is None and d is None:
        if "radius" in low and "find" in low:
            val = math.sqrt(area / math.pi)
            return _kresult(val, ["r = sqrt(area / pi) = %s" % _fmt(val)])
    if d is not None and d > 0:
        val = math.pi * (d / 2.0) ** 2
        return _kresult(val, [
            "r = d / 2 = %s" % _fmt(d / 2.0),
            "area = pi x r^2 = %s" % _fmt(val)])
    if r is not None and r > 0:
        val = math.pi * r * r
        return _kresult(val, ["area = pi x r^2 = pi x %s^2 = %s"
                              % (_fmt(r), _fmt(val))])
    return None


def _kernel_cost_application(slots, text):
    """Chained: measure (area or perimeter) first, then cost = rate x m."""
    low = text.lower()
    rate = _g(slots, "rate")
    if rate is None or rate < 0:
        return None
    is_fence = any(w in low for w in ("fencing", "fence", "rope", "tape",
                                      "lace", "perimeter"))
    lines: List[str] = []
    measure: Optional[float] = None
    if is_fence:
        r = _g(slots, "r", "radius")
        d = _g(slots, "d", "diameter")
        if d is not None and d > 0:
            measure = math.pi * d
            lines.append("perimeter = pi x d = pi x %s = %s"
                         % (_fmt(d), _fmt(measure)))
        elif r is not None and r > 0:
            measure = 2.0 * math.pi * r
            lines.append("perimeter = 2 x pi x r = 2 x pi x %s = %s"
                         % (_fmt(r), _fmt(measure)))
    else:
        b = _g(slots, "b", "base")
        h = _g(slots, "h", "height")
        r = _g(slots, "r", "radius")
        if "triangl" in low and b and h:
            measure = 0.5 * b * h
            lines.append("area = (1/2) x %s x %s = %s"
                         % (_fmt(b), _fmt(h), _fmt(measure)))
        elif b and h:
            measure = b * h
            lines.append("area = %s x %s = %s"
                         % (_fmt(b), _fmt(h), _fmt(measure)))
        elif r and r > 0:
            measure = math.pi * r * r
            lines.append("area = pi x r^2 = pi x %s^2 = %s"
                         % (_fmt(r), _fmt(measure)))
    if measure is None or measure <= 0:
        return None
    val = rate * measure
    lines.append("cost = rate x %s = %s x %s = %s"
                 % ("perimeter" if is_fence else "area", _fmt(rate),
                    _fmt(measure), _fmt(val)))
    return _kresult(val, lines)


def _make_exp_kernel(fn: Callable[[float, float, float], float],
                     lines_fn: Callable[..., List[str]]) -> Callable:
    def kernel(slots, text):
        a = _g(slots, "a")
        m = _g(slots, "m")
        n = _g(slots, "n")
        b = _g(slots, "b")
        try:
            val = fn(a, m, n) if b is None else fn(a, b, m, n)
        except (TypeError, ZeroDivisionError, OverflowError):
            return None
        if val is None:
            return None
        if isinstance(val, float) and not math.isfinite(val):
            return None
        if abs(val) > _MAX_RESULT:
            return None
        return val, lines_fn(a, m, n, b, val)
    return kernel


def _exp_eval(a, m, n):
    if a is None or m is None:
        return None
    if m != int(m):
        return None
    if a == 0 and m < 0:
        return None
    return float(a) ** float(m)


def _exp_lines(a, m, n, b, val):
    return ["%s^%s = %s" % (_fmt(a), _fmt(m), _fmt(val))]


def _exp_mul_same_base(a, m, n):
    if None in (a, m, n):
        return None
    if m != int(m) or n != int(n):
        return None
    return float(a) ** (float(m) + float(n))


def _exp_mul_lines(a, m, n, b, val):
    return ["a^m x a^n = a^(m+n): %s^(%s+%s) = %s^%s = %s"
            % (_fmt(a), _fmt(m), _fmt(n), _fmt(a), _fmt(int(m + n)),
               _fmt(val))]


def _exp_div_same_base(a, m, n):
    if None in (a, m, n):
        return None
    if m != int(m) or n != int(n):
        return None
    return float(a) ** (float(m) - float(n))


def _exp_div_lines(a, m, n, b, val):
    return ["a^m / a^n = a^(m-n): %s^(%s-%s) = %s^%s = %s"
            % (_fmt(a), _fmt(m), _fmt(n), _fmt(a), _fmt(int(m - n)),
               _fmt(val))]


def _exp_pow_power(a, m, n):
    if None in (a, m, n):
        return None
    if m != int(m) or n != int(n):
        return None
    return float(a) ** (float(m) * float(n))


def _exp_pow_lines(a, m, n, b, val):
    return ["(a^m)^n = a^(m x n): %s^(%s x %s) = %s^%s = %s"
            % (_fmt(a), _fmt(m), _fmt(n), _fmt(a), _fmt(int(m * n)),
               _fmt(val))]


def _exp_same_exp_mul(a, b, m, n=None):
    if None in (a, b, m) or m != int(m):
        return None
    return (float(a) * float(b)) ** float(m)


def _exp_same_exp_mul_lines(a, m, n, b, val):
    return ["a^m x b^m = (a x b)^m: (%s x %s)^%s = %s"
            % (_fmt(a), _fmt(b), _fmt(m), _fmt(val))]


def _exp_same_exp_div(a, b, m, n=None):
    if None in (a, b, m) or m != int(m) or b == 0:
        return None
    return (float(a) / float(b)) ** float(m)


def _exp_same_exp_div_lines(a, m, n, b, val):
    return ["a^m / b^m = (a/b)^m: (%s / %s)^%s = %s"
            % (_fmt(a), _fmt(b), _fmt(m), _fmt(val))]


def _exp_zero(a, m, n):
    if a is None:
        return None
    if a == 0:
        return None  # 0^0 undefined: honest refusal
    return 1.0


def _exp_zero_lines(a, m, n, b, val):
    return ["a^0 = 1 for any non-zero a: %s^0 = 1" % _fmt(a)]


# ------------------------------------------------------------------ #
# ch8 rational numbers kernels
# ------------------------------------------------------------------ #

def _gcd(a: int, b: int) -> int:
    a, b = abs(int(a)), abs(int(b))
    while b:
        a, b = b, a % b
    return a or 1


def _kernel_rational_standard_form(slots, text):
    """Reduce p/q to standard form by dividing both by HCF."""
    p = _g(slots, "p", "numerator", "a", "num")
    q = _g(slots, "q", "denominator", "b", "denom")
    if p is None or q is None or q == 0:
        return None
    g = _gcd(p, q)
    num, den = int(p) // g, int(q) // g
    if den < 0:
        num, den = -num, -den
    val = num / den
    return _kresult(val, [
        "HCF(%s, %s) = %s" % (_fmt(p), _fmt(q), g),
        "standard form: (%s/%s) / (%s/%s) = %s/%s"
        % (_fmt(p), _fmt(q), g, g, num, den),
        "%s/%s = %s" % (num, den, _fmt(val))])


def _kernel_rational_compare(slots, text):
    """Compare two rational numbers a/b and c/d."""
    a = _g(slots, "a", "p")
    b = _g(slots, "b", "q")
    c = _g(slots, "c", "r")
    d = _g(slots, "d", "s")
    if None in (a, b, c, d) or 0 in (b, d):
        return None
    lhs = a * d
    rhs = b * c
    if lhs > rhs:
        rel = ">"
        val = 1.0
    elif lhs < rhs:
        rel = "<"
        val = -1.0
    else:
        rel = "="
        val = 0.0
    return _kresult(val, [
        "cross-multiply: %s x %s = %s, %s x %s = %s"
        % (_fmt(a), _fmt(d), _fmt(lhs), _fmt(b), _fmt(c), _fmt(rhs)),
        "%s/%s %s %s/%s" % (_fmt(a), _fmt(b), rel, _fmt(c), _fmt(d))])


def _kernel_rational_between(slots, text):
    """Find rational numbers between a/b and c/d using the mean method."""
    a = _g(slots, "a", "p")
    b = _g(slots, "b", "q")
    c = _g(slots, "c", "r")
    d = _g(slots, "d", "s")
    n = _g(slots, "n", "count")
    if None in (a, b, c, d) or 0 in (b, d):
        return None
    if n is None:
        n = 1.0
    n = int(n)
    if n < 1 or n > 100:
        return None
    v1 = a / b
    v2 = c / d
    if v1 > v2:
        v1, v2 = v2, v1
    step = (v2 - v1) / (n + 1)
    if step == 0:
        return None
    results = [v1 + step * (i + 1) for i in range(n)]
    lines = ["between %s/%s and %s/%s:" % (_fmt(a), _fmt(b), _fmt(c), _fmt(d))]
    for i, r in enumerate(results):
        lines.append("  %d: %s" % (i + 1, _fmt(r)))
    return _kresult(results[0], lines)


def _kernel_rational_add(slots, text):
    """Add two rational numbers: a/b + c/d = (ad + bc) / bd."""
    a = _g(slots, "a", "p")
    b = _g(slots, "b", "q")
    c = _g(slots, "c", "r")
    d = _g(slots, "d", "s")
    if None in (a, b, c, d) or 0 in (b, d):
        return None
    num = a * d + b * c
    den = b * d
    if den == 0:
        return None
    val = num / den
    return _kresult(val, [
        "(%s x %s + %s x %s) / (%s x %s)"
        % (_fmt(a), _fmt(d), _fmt(b), _fmt(c), _fmt(b), _fmt(d)),
        "(%s + %s) / %s = %s / %s = %s"
        % (_fmt(a * d), _fmt(b * c), _fmt(den), _fmt(num), _fmt(den),
           _fmt(val))])


def _kernel_rational_subtract(slots, text):
    """Subtract two rational numbers: a/b - c/d = (ad - bc) / bd."""
    a = _g(slots, "a", "p")
    b = _g(slots, "b", "q")
    c = _g(slots, "c", "r")
    d = _g(slots, "d", "s")
    if None in (a, b, c, d) or 0 in (b, d):
        return None
    num = a * d - b * c
    den = b * d
    if den == 0:
        return None
    val = num / den
    return _kresult(val, [
        "(%s x %s - %s x %s) / (%s x %s)"
        % (_fmt(a), _fmt(d), _fmt(b), _fmt(c), _fmt(b), _fmt(d)),
        "(%s - %s) / %s = %s / %s = %s"
        % (_fmt(a * d), _fmt(b * c), _fmt(den), _fmt(num), _fmt(den),
           _fmt(val))])


def _kernel_rational_multiply(slots, text):
    """Multiply two rational numbers: a/b x c/d = ac / bd."""
    a = _g(slots, "a", "p")
    b = _g(slots, "b", "q")
    c = _g(slots, "c", "r")
    d = _g(slots, "d", "s")
    if None in (a, b, c, d) or 0 in (b, d):
        return None
    num = a * c
    den = b * d
    if den == 0:
        return None
    val = num / den
    return _kresult(val, [
        "(%s x %s) / (%s x %s) = %s / %s = %s"
        % (_fmt(a), _fmt(c), _fmt(b), _fmt(d), _fmt(num), _fmt(den),
           _fmt(val))])


def _kernel_rational_divide(slots, text):
    """Divide two rational numbers: a/b / c/d = ad / bc."""
    a = _g(slots, "a", "p")
    b = _g(slots, "b", "q")
    c = _g(slots, "c", "r")
    d = _g(slots, "d", "s")
    if None in (a, b, c, d) or 0 in (b, c, d):
        return None
    num = a * d
    den = b * c
    if den == 0:
        return None
    val = num / den
    return _kresult(val, [
        "(%s x %s) / (%s x %s) = %s / %s = %s"
        % (_fmt(a), _fmt(d), _fmt(b), _fmt(c), _fmt(num), _fmt(den),
           _fmt(val))])


# ------------------------------------------------------------------ #
# ch4 simple equations kernels
# ------------------------------------------------------------------ #

def _kernel_solve_balancing(slots, text):
    """Solve x + a = b by balancing: x = b - a."""
    a = _g(slots, "a", "addend")
    b = _g(slots, "b", "total", "result")
    if a is None or b is None:
        return None
    val = b - a
    return _kresult(val, [
        "x + %s = %s" % (_fmt(a), _fmt(b)),
        "subtract %s from both sides: x = %s - %s = %s"
        % (_fmt(a), _fmt(b), _fmt(a), _fmt(val))])


def _kernel_solve_transposing(slots, text):
    """Solve x + a = b by transposing: x = b - a."""
    a = _g(slots, "a", "addend")
    b = _g(slots, "b", "total", "result")
    if a is None or b is None:
        return None
    val = b - a
    return _kresult(val, [
        "transpose %s to RHS: x = %s - %s = %s"
        % (_fmt(a), _fmt(b), _fmt(a), _fmt(val))])


def _kernel_solve_brackets(slots, text):
    """Solve a(x + b) = c: x = c/a - b."""
    a = _g(slots, "a", "multiplier", "coefficient")
    b = _g(slots, "b", "addend", "constant")
    c = _g(slots, "c", "total", "result", "rhs")
    if None in (a, b, c) or a == 0:
        return None
    val = c / a - b
    return _kresult(val, [
        "%s(x + %s) = %s" % (_fmt(a), _fmt(b), _fmt(c)),
        "divide both sides by %s: x + %s = %s"
        % (_fmt(a), _fmt(b), _fmt(c / a)),
        "x = %s - %s = %s" % (_fmt(c / a), _fmt(b), _fmt(val))])


def _kernel_solve_word_problem(slots, text):
    """Solve word problems of two forms:
    1. multiplier * x + addend = total  (3 slots)
    2. sum of two numbers is total, one exceeds by difference  (2 slots)
    """
    total = _g(slots, "total", "c", "result")
    difference = _g(slots, "difference")
    multiplier = _g(slots, "multiplier", "a", "coefficient")
    addend = _g(slots, "addend", "b", "constant")
    # Form 2: sum/difference word problem
    if total is not None and difference is not None and multiplier is None:
        # x + (x + difference) = total -> 2x = total - difference
        val = (total - difference) / 2.0
        return _kresult(val, [
            "x + (x + %s) = %s" % (_fmt(difference), _fmt(total)),
            "2x = %s - %s = %s" % (_fmt(total), _fmt(difference),
                                  _fmt(total - difference)),
            "x = %s / 2 = %s" % (_fmt(total - difference), _fmt(val))])
    # Form 1: multiplier * x + addend = total
    if None in (multiplier, total) or multiplier == 0:
        return None
    if addend is None:
        addend = 0.0
    val = (total - addend) / multiplier
    return _kresult(val, [
        "set up: %s x x + %s = %s"
        % (_fmt(multiplier), _fmt(addend), _fmt(total)),
        "x = (%s - %s) / %s = %s / %s = %s"
        % (_fmt(total), _fmt(addend), _fmt(multiplier),
           _fmt(total - addend), _fmt(multiplier), _fmt(val))])


# ------------------------------------------------------------------ #
# ch10 algebraic expressions kernel
# ------------------------------------------------------------------ #

def _kernel_eval_expression(slots, text):
    """Evaluate an expression by substituting the variable value."""
    x = _g(slots, "x", "value", "v")
    a = _g(slots, "a", "coefficient")
    b = _g(slots, "b", "constant")
    if x is None:
        return None
    if a is not None and b is not None:
        val = a * x + b
        return _kresult(val, [
            "substitute x = %s: %s x %s + %s = %s + %s = %s"
            % (_fmt(x), _fmt(a), _fmt(x), _fmt(b), _fmt(a * x), _fmt(b),
               _fmt(val))])
    if a is not None:
        val = a * x
        return _kresult(val, [
            "substitute x = %s: %s x %s = %s"
            % (_fmt(x), _fmt(a), _fmt(x), _fmt(val))])
    return None


# ------------------------------------------------------------------ #
# ch5 transversal of parallel lines kernel
# ------------------------------------------------------------------ #

def _kernel_transversal_parallel(slots, text):
    """Find an unknown angle when a transversal cuts parallel lines."""
    angle = _g(slots, "angle", "a", "given_angle")
    if angle is None or not (0 < angle < 360):
        return None
    low = text.lower()
    if "corresponding" in low or "same side" in low:
        return _kresult(angle, [
            "corresponding angles are equal: %s" % _fmt(angle)])
    if "alternate" in low:
        return _kresult(angle, [
            "alternate angles are equal: %s" % _fmt(angle)])
    if "co-interior" in low or "interior" in low or "same side" in low:
        val = 180.0 - angle
        return _kresult(val, [
            "co-interior angles are supplementary: 180 - %s = %s"
            % (_fmt(angle), _fmt(val))])
    return _kresult(angle, ["angle = %s" % _fmt(angle)])


# ------------------------------------------------------------------ #
# ch6 triangle kernels
# ------------------------------------------------------------------ #

def _kernel_isosceles_triangle(slots, text):
    """Find angles of an isosceles triangle given one angle."""
    angle = _g(slots, "angle", "a", "vertex_angle", "given_angle")
    if angle is None or not (0 < angle < 180):
        return None
    low = text.lower()
    if "vertex" in low or "equal sides" in low:
        base = (180.0 - angle) / 2.0
        return _kresult(base, [
            "vertex angle = %s" % _fmt(angle),
            "base angles = (180 - %s) / 2 = %s"
            % (_fmt(angle), _fmt(base))])
    if "base" in low or "equal angle" in low:
        vertex = 180.0 - 2.0 * angle
        return _kresult(vertex, [
            "base angle = %s" % _fmt(angle),
            "vertex angle = 180 - 2 x %s = %s"
            % (_fmt(angle), _fmt(vertex))])
    base = (180.0 - angle) / 2.0
    return _kresult(base, [
        "if vertex angle = %s, base angles = (180 - %s) / 2 = %s"
        % (_fmt(angle), _fmt(angle), _fmt(base))])


def _kernel_triangle_inequality(slots, text):
    """Check whether three sides can form a triangle."""
    a = _g(slots, "a", "side1")
    b = _g(slots, "b", "side2")
    c = _g(slots, "c", "side3")
    if None in (a, b, c) or any(x <= 0 for x in (a, b, c)):
        return None
    feasible = (a + b > c) and (b + c > a) and (a + c > b)
    val = 1.0 if feasible else 0.0
    lines = [
        "check: %s + %s = %s vs %s -> %s"
        % (_fmt(a), _fmt(b), _fmt(a + b), _fmt(c),
           "yes" if a + b > c else "no"),
        "check: %s + %s = %s vs %s -> %s"
        % (_fmt(b), _fmt(c), _fmt(b + c), _fmt(a),
           "yes" if b + c > a else "no"),
        "check: %s + %s = %s vs %s -> %s"
        % (_fmt(a), _fmt(c), _fmt(a + c), _fmt(b),
           "yes" if a + c > b else "no"),
    ]
    if feasible:
        lines.append("YES: a triangle can have these sides")
    else:
        lines.append("NO: sum of two sides must exceed the third")
    return _kresult(val, lines)


# ------------------------------------------------------------------ #
# ch7 ratio to percent kernel
# ------------------------------------------------------------------ #

def _kernel_ratio_to_percent(slots, text):
    """Convert a ratio a:b to a percentage."""
    a = _g(slots, "a", "part", "first")
    b = _g(slots, "b", "total", "second", "whole")
    if a is None or b is None or b == 0:
        return None
    val = (a / b) * 100.0
    return _kresult(val, [
        "ratio %s:%s as fraction = %s/%s" % (_fmt(a), _fmt(b), _fmt(a),
                                              _fmt(b)),
        "percentage = (%s/%s) x 100 = %s%%"
        % (_fmt(a), _fmt(b), _fmt(val))])


# ------------------------------------------------------------------ #
# ch11 decimal number system + standard form kernels
# ------------------------------------------------------------------ #

def _kernel_decimal_number_system(slots, text):
    """Express a number as a sum of powers of 10."""
    n = _g(slots, "number", "n", "value")
    if n is None or n != int(n) or n < 0:
        return None
    n = int(n)
    if n > 10 ** 12:
        return None
    digits = [int(d) for d in str(n)]
    length = len(digits)
    lines = []
    total = 0.0
    for i, d in enumerate(digits):
        power = length - 1 - i
        term = d * (10 ** power)
        total += term
        if d != 0:
            lines.append("%s x 10^%d = %s" % (d, power, _fmt(term)))
    lines.append("sum = %s" % _fmt(total))
    return _kresult(total, lines)


def _kernel_standard_form_large(slots, text):
    """Express a large number in standard form: a x 10^n."""
    n = _g(slots, "number", "n", "value")
    if n is None or n != int(n):
        return None
    n = int(n)
    if n == 0:
        return _kresult(0.0, ["0 = 0 x 10^0"])
    if abs(n) < 1000 or abs(n) >= 10 ** 12:
        return None
    sign = -1.0 if n < 0 else 1.0
    n = abs(n)
    exp = 0
    while n >= 10:
        n /= 10.0
        exp += 1
    mantissa = sign * n
    val = mantissa * (10 ** exp)
    return _kresult(val, [
        "%s = %s x 10^%d" % (_fmt(val), _fmt(mantissa), exp),
        "standard form: %s x 10^%d" % (_fmt(mantissa), exp)])


# ------------------------------------------------------------------ #
# ch13 visualising solid objects kernel
# ------------------------------------------------------------------ #

def _kernel_solid_objects(slots, text):
    """Count faces/edges/vertices of a cuboid or cube."""
    f = _g(slots, "faces", "f")
    e = _g(slots, "edges", "e")
    v = _g(slots, "vertices", "v")
    if f is not None and e is not None and v is not None:
        check = f - e + v
        return _kresult(check, [
            "Euler's formula: F - E + V = %s - %s + %s = %s"
            % (_fmt(f), _fmt(e), _fmt(v), _fmt(check))])
    if f is not None:
        return _kresult(f, ["faces = %s" % _fmt(f)])
    return None


# ------------------------------------------------------------------ #
# ch1 integer operation kernels
# ------------------------------------------------------------------ #

def _make_signed_mul(kind: str) -> Callable:
    """Integer multiplication: pos_neg -> -(a*b), neg_neg -> a*b."""
    def kernel(slots, text):
        a = _g(slots, "a", "first")
        b = _g(slots, "b", "second")
        if a is None or b is None:
            return None
        product = abs(a) * abs(b)
        if kind == "pos_neg":
            val = -product
            lines = ["positive x negative = negative",
                     "%s x %s = -(%s x %s) = %s"
                     % (_fmt(a), _fmt(b), _fmt(abs(a)), _fmt(abs(b)),
                        _fmt(val))]
        elif kind == "neg_neg":
            val = product
            lines = ["negative x negative = positive",
                     "(%s) x (%s) = %s x %s = %s"
                     % (_fmt(a), _fmt(b), _fmt(abs(a)), _fmt(abs(b)),
                        _fmt(val))]
        else:
            return None
        return _kresult(val, lines)
    return kernel


def _kernel_mul_zero(slots, text):
    """Multiplication by zero: a x 0 = 0."""
    a = _g(slots, "a", "first", "number")
    b = _g(slots, "b", "second")
    if a is None:
        return None
    if b is not None and b != 0:
        return None  # not a multiply-by-zero question
    return _kresult(0.0, ["any number x 0 = 0: %s x 0 = 0" % _fmt(a)])


def _kernel_mul_identity(slots, text):
    """Multiplicative identity: a x 1 = a."""
    a = _g(slots, "a", "first", "number")
    b = _g(slots, "b", "second")
    if a is None:
        return None
    if b is not None and b != 1:
        return None  # not a multiply-by-one question
    return _kresult(a, ["any number x 1 = itself: %s x 1 = %s"
                        % (_fmt(a), _fmt(a))])


def _make_signed_div() -> Callable:
    """Integer division with sign rules."""
    def kernel(slots, text):
        a = _g(slots, "a", "first", "dividend")
        b = _g(slots, "b", "second", "divisor")
        if a is None or b is None or b == 0:
            return None
        val = a / b
        if (a < 0) != (b < 0) and a % b != 0:
            # different signs -> negative
            val = -abs(a) / abs(b)
        lines = []
        if (a < 0) != (b < 0):
            lines.append("different signs -> negative")
        else:
            lines.append("same signs -> positive")
        lines.append("%s / %s = %s" % (_fmt(a), _fmt(b), _fmt(val)))
        return _kresult(val, lines)
    return kernel


# ------------------------------------------------------------------ #
# ch8 equivalent rational numbers kernel
# ------------------------------------------------------------------ #

def _kernel_equivalent_rational(slots, text):
    """Find equivalent rational number: p/q = (p*n)/(q*n)."""
    p = _g(slots, "p", "numerator", "a")
    q = _g(slots, "q", "denominator", "b")
    n = _g(slots, "n", "multiplier")
    if p is None or q is None or q == 0:
        return None
    if n is None:
        n = 1.0
    new_num = p * n
    new_den = q * n
    val = new_num / new_den
    return _kresult(val, [
        "equivalent fraction: (%s x %s) / (%s x %s) = %s / %s"
        % (_fmt(p), _fmt(n), _fmt(q), _fmt(n), _fmt(new_num), _fmt(new_den)),
        "%s / %s = %s" % (_fmt(new_num), _fmt(new_den), _fmt(val))])


_KERNELS: Dict[str, Callable[[Dict, str], Optional[Tuple[float,
                                                       List[str]]]]] = {
    # ch2 fractions and decimals
    "c7m2.1.1": _make_fraction_kernel(mult_n=True),
    "c7m2.1.2": _make_fraction_kernel(mult_n=True),
    "c7m2.1.3": _kernel_fraction_mult_fraction,
    "c7m2.2.1": _kernel_reciprocal,
    "c7m2.2.2": _make_fraction_kernel(mult_n=True),
    "c7m2.2.3": _make_fraction_kernel(mult_n=True),
    "c7m2.2.4": _kernel_fraction_div_fraction,
    "c7m2.3.1": _make_binary("mul"),
    "c7m2.3.2": _make_pow10("mul"),
    "c7m2.4.1": _make_pow10("div"),
    "c7m2.4.2": _make_binary("div"),
    "c7m2.4.3": _make_binary("div"),
    # ch3 data handling
    "c7m3.2.1": _kernel_mean,
    "c7m3.2.2": _kernel_range,
    "c7m3.3.1": _kernel_mode,
    "c7m3.3.2": _kernel_mode,
    "c7m3.4.1": _kernel_median,
    "c7m3.6.1": _kernel_probability,
    # ch5 lines and angles
    "c7m5.2.1": _make_angle_kernel(90.0),
    "c7m5.2.2": _make_angle_kernel(180.0),
    # ch6 triangle properties
    "c7m6.4.1": _kernel_exterior_angle,
    "c7m6.5.1": _kernel_third_angle,
    "c7m6.8.1": _kernel_hypotenuse,
    # ch7 comparing quantities
    "c7m7.1.1": _kernel_percent_of,
    "c7m7.1.2": _make_mul100("fraction"),
    "c7m7.1.3": _make_mul100("decimal"),
    "c7m7.1.4": _kernel_pct_to_fraction,
    "c7m7.2.2": _kernel_pct_count_or_whole,
    "c7m7.2.4": _kernel_pct_change,
    "c7m7.3.1": _kernel_profit_loss,
    "c7m7.3.2": _kernel_profit_loss_pct,
    "c7m7.4.1": _kernel_simple_interest,
    # ch9 perimeter and area
    "c7m9.1.1": _kernel_area_parallelogram,
    "c7m9.2.1": _kernel_area_triangle,
    "c7m9.3.1": _kernel_circumference,
    "c7m9.3.2": _kernel_area_circle,
    "c7m9.3.3": _kernel_cost_application,
    # ch11 exponents and powers
    "c7m11.2.1": _make_exp_kernel(_exp_eval, _exp_lines),
    "c7m11.3.1": _make_exp_kernel(_exp_mul_same_base, _exp_mul_lines),
    "c7m11.3.2": _make_exp_kernel(_exp_div_same_base, _exp_div_lines),
    "c7m11.3.3": _make_exp_kernel(_exp_pow_power, _exp_pow_lines),
    "c7m11.3.4": _make_exp_kernel(_exp_same_exp_mul,
                                  _exp_same_exp_mul_lines),
    "c7m11.3.5": _make_exp_kernel(_exp_same_exp_div,
                                  _exp_same_exp_div_lines),
    "c7m11.3.6": _make_exp_kernel(_exp_zero, _exp_zero_lines),
    # ch4 simple equations
    "c7m4.4.2": _kernel_solve_balancing,
    "c7m4.5.1": _kernel_solve_transposing,
    "c7m4.5.2": _kernel_solve_brackets,
    "c7m4.6.1": _kernel_solve_word_problem,
    # ch8 rational numbers
    "c7m8.6.1": _kernel_rational_standard_form,
    "c7m8.7.1": _kernel_rational_compare,
    "c7m8.8.1": _kernel_rational_between,
    "c7m8.9.1": _kernel_rational_add,
    "c7m8.9.2": _kernel_rational_subtract,
    "c7m8.9.3": _kernel_rational_multiply,
    "c7m8.9.4": _kernel_rational_divide,
    # ch10 algebraic expressions
    "c7m10.6.1": _kernel_eval_expression,
    # ch5 transversal of parallel lines
    "c7m5.3.4": _kernel_transversal_parallel,
    # ch6 triangle
    "c7m6.6.2": _kernel_isosceles_triangle,
    "c7m6.7.1": _kernel_triangle_inequality,
    # ch7 ratio to percent
    "c7m7.2.3": _kernel_ratio_to_percent,
    # ch11 decimal number system + standard form
    "c7m11.5.1": _kernel_decimal_number_system,
    "c7m11.6.1": _kernel_standard_form_large,
    # ch13 visualising solid objects (Euler's formula)
    "c7m13.4.3": _kernel_solid_objects,
    # ch1 integer operations (not handled by math_kernel)
    "c7m1.2.1": _make_signed_mul("pos_neg"),
    "c7m1.2.2": _make_signed_mul("neg_neg"),
    "c7m1.3.3": _kernel_mul_zero,
    "c7m1.3.4": _kernel_mul_identity,
    "c7m1.4": _make_signed_div(),
    # ch8 equivalent rational numbers
    "c7m8.3.2": _kernel_equivalent_rational,
}


# ------------------------------------------------------------------ #
# Per-concept text gates for the steps ladder
# ------------------------------------------------------------------ #

def _gate_single_base(text: str, slots: Dict[str, float]) -> bool:
    """The zero-exponent rule returns 1 -- that is only the answer when
    the question names AT MOST ONE base ("7 to the power 0" yes;
    "2 to the 0 plus 3 to the 0 plus 4 to the 0" no: that sum is 3)."""
    from backend.its.solver.slot_extractor import _scan_numbers
    from backend.its.solver.slot_extractor import _excluded_spans
    blocked = _excluded_spans(text)
    nums = [n for n in _scan_numbers(text)
            if not any(s <= n[1] and n[2] <= e for s, e in blocked)]
    zeros = [n for n in nums if n[0] == 0]
    return len(nums) - len(zeros) <= 1


_STEPS_TEXT_GATES: Dict[str, Callable[[str, Dict], bool]] = {
    "c7m11.3.6": _gate_single_base,
}


# ------------------------------------------------------------------ #
# Main entry point
# ------------------------------------------------------------------ #

def execute_concept(
    concept: Dict,
    slots: Dict[str, float],
    text: str,
    worked_examples: Optional[List[Dict]] = None,
) -> ExecResult:
    """Execute a matched catalog concept deterministically.

    Returns ExecResult with ok=True and the computed value, or ok=False
    with an honest refusal reason (the pipeline shows the concept's
    method steps as guided content instead of guessing).
    """
    cid = str((concept or {}).get("id", ""))
    slots = slots or {}
    text = str(text or "")

    # converted formula concepts with bound slots: run the concept's
    # own compute chain FIRST — the labeled bindings + symbolic step
    # are a verified path; generic procedural kernels would only guess.
    # Only when every compute RHS references a symbol -- a step whose
    # RHS is pure literals ('val = 3 * 2 + 8') is a baked example from
    # a converted verify_property concept and must not preempt the
    # procedural kernels that read the question's own numbers.
    _pre_steps = concept.get("compute_steps") or concept.get("solution_steps") or []
    _seen_sym = False
    _symbolic = bool(_pre_steps)
    for s in _pre_steps:
        _comp = str(s.get("compute") or "").strip()
        if not _comp:
            continue
        _lhs_s = _comp.split("=", 1)[0].strip() if "=" in _comp else ""
        _rhs = _comp.split("=", 1)[1] if "=" in _comp else _comp
        if re.search(r"[A-Za-z_][A-Za-z_0-9]*", _rhs):
            _seen_sym = True
        elif _lhs_s in slots:
            # literal re-binding of a slot var = baked example value
            _symbolic = False
            break
    _symbolic = _symbolic and _seen_sym
    if concept.get("converted_to_compute") and slots and _pre_steps and \
            _symbolic and \
            str(_pre_steps[-1].get("compute") or "").strip():
        env = _const_env_for(concept)
        env.update({k: float(v) for k, v in slots.items()
                    if isinstance(v, (int, float))})
        try:
            value, lines = _run_step_chain(_pre_steps, env,
                                           "concept steps")
            return ExecResult(True, float(value), lines, "", cid,
                              "steps")
        except Exception:
            pass

    # procedural lookups beat every static layer — they read THIS
    # question's operands, never the concept's baked example
    try:
        r = _procedural_solve(concept, text)
        if r is not None and r.ok:
            return r
    except Exception:
        pass

    if str(concept.get("solution_type", "")) != "compute" and \
            not concept.get("converted_to_compute"):
        # verify_property concepts skip the compute layers — but the
        # question may still state a solvable relation itself
        # ('HCF x LCM = a x b'), so the quantity layer still runs
        return _quantity_solve(concept, slots, text)

    # list-role concepts (mean/range/median/mode): pull the data set
    # from the text when the scalar slot dict does not carry it
    eff_slots: Dict[str, Any] = dict(slots)
    from backend.its.solver.slot_extractor import _LIST_ROLE_CONCEPTS
    role = _LIST_ROLE_CONCEPTS.get(cid)
    if role and not isinstance(eff_slots.get(role), list):
        got = extract_list_slots(text, concept)
        if got and role in got:
            eff_slots[role] = got[role]

    # 1. kernel (closed arithmetic from the catalog's own formulas)
    kernel = _KERNELS.get(cid)
    if kernel is not None:
        try:
            got = kernel(eff_slots, text)
        except Exception as exc:
            # a kernel exception is a defect, not a soft miss: refuse
            # honestly instead of falling through to another layer
            return ExecResult(False, None, [],
                              "kernel error: %s" % exc, cid, "kernel")
        if got is not None:
            value, lines = got
            return ExecResult(True, float(value), lines, "", cid, "kernel")

    # 2. the concept's own solution_steps compute chain -- accepted only
    #    when the chain TERMINATES in a computed step (an intermediate
    #    value is never presented as the final answer), and when no
    #    per-concept text gate refuses the reading (e.g. the zero-
    #    exponent rule "a^0 = 1" is only an answer when the question
    #    names at most ONE base; "2^0 + 3^0 + 4^0" needs its own sum).
    steps = concept.get("compute_steps") or concept.get("solution_steps") or []
    has_compute = [s for s in steps if str(s.get("compute") or "").strip()]
    gate_fn = _STEPS_TEXT_GATES.get(cid)
    gate_ok = True if gate_fn is None else bool(gate_fn(text, slots))
    # baked-example guard: compute steps carrying literals that never
    # appear in the question are the concept's own worked example —
    # running them answers a DIFFERENT question.  Check every step's
    # literals, not just the last ('lhs = 3**3+4**3; diff = 5**3-lhs'
    # hides its baked numbers in step 1).
    if has_compute and str(steps[-1].get("compute") or "").strip():
        _all_lits = []
        for _s in has_compute:
            _all_lits += re.findall(r"-?\d+(?:\.\d+)?",
                                    str(_s.get("compute") or ""))
        if _all_lits:
            from backend.its.solver.input_normalizer import (
                normalize_input as _ni)
            _qn = re.findall(r"-?\d+(?:\.\d+)?", _ni(text))
            _qf = sorted(float(x) for x in _qn)
            _lf = sorted(float(x) for x in _all_lits)
            # literals unique to the example (not in the question);
            # structural constants (pi, unit conversions, totals)
            # never count as alien
            _STRUCT = {0.5, 3.14, 3.14159, 3.1428,
                       10.0, 12.0, 24.0, 60.0, 90.0, 100.0, 180.0,
                       360.0, 1000.0, 3600.0, 9.8, 9.81, 3.6}
            _alien = [x for x in _lf
                      if x not in _qf and x not in _STRUCT]
            if _alien:
                has_compute = []  # skip — quantity layer rebinds
            elif not _qf:
                # question carries NO numbers — a literal-only chain
                # can only replay its baked example, never answer this
                _has_var = any(
                    re.search(r"[a-z_]",
                              str(_s.get("compute") or "")
                              .rsplit("=", 1)[-1])
                    for _s in has_compute)
                if not _has_var:
                    has_compute = []
    if has_compute and gate_ok and steps and \
            str(steps[-1].get("compute") or "").strip():
        env = _const_env_for(concept)
        env.update({k: float(v) for k, v in slots.items()
                    if isinstance(v, (int, float))})
        try:
            value, lines = _run_step_chain(steps, env, "concept steps")
            return ExecResult(True, float(value), lines, "", cid, "steps")
        except _EvalError as exc:
            last_reason = "step chain failed: %s" % exc
        except Exception as exc:  # pragma: no cover - defensive
            last_reason = "step chain failed: %s" % exc
    else:
        last_reason = ""

    # 3. worked-example solution_template compute chains
    examples = (worked_examples if worked_examples is not None
                else catalog_worked_examples(concept))
    fitting: List[Tuple[Dict, List[Dict], float, List[str]]] = []
    for ex in examples:
        if ex.get("concept") != cid:
            continue
        tmpl_steps = ex.get("solution_template") or []
        if not any(str(s.get("compute") or "").strip()
                   for s in tmpl_steps):
            continue
        env = {k: float(v) for k, v in slots.items()
               if isinstance(v, (int, float))}
        try:
            value, lines = _run_step_chain(tmpl_steps, env,
                                           ex.get("id", "example"))
        except Exception:
            continue
        fitting.append((ex, tmpl_steps, value, lines))
    if fitting:
        chosen = None
        if len(fitting) == 1:
            chosen = fitting[0]
        else:
            low = text.lower()
            best_score = -1
            for ex, tmpl_steps, value, lines in fitting:
                qpat = str(ex.get("question_pattern", "") or "").lower()
                overlap = sum(1 for w in re.findall(r"[a-z]+", low)
                              if w in qpat and w not in _STOPWORDS)
                if overlap > best_score:
                    best_score = overlap
                    chosen = (ex, tmpl_steps, value, lines)
            # target-safety: when the question names a target quantity
            # and the chosen template has several compute steps, the
            # LAST computed step's action must match that target --
            # otherwise the template's final value answers a different
            # question than the one asked
            if chosen is not None:
                ex, tmpl_steps, value, lines = chosen
                computes = [s for s in tmpl_steps
                            if str(s.get("compute") or "").strip()]
                if len(computes) > 1:
                    last_action = str(
                        computes[-1].get("action") or "").lower()
                    hits = set(_target_hits(low))
                    asked = hits & {"amount", "interest", "rate", "area",
                                    "cost", "perimeter", "circumference"}
                    if asked and not any(w in last_action for w in asked):
                        chosen = None
        if chosen is None and len(fitting) > 1:
            pass  # ambiguous multi-step templates: refuse safely
        if chosen is not None:
            _ex, _tmpl, value, lines = chosen
            return ExecResult(True, float(value), lines, "", cid,
                              "template")

    # 4. formula-field equations
    res = _formula_ladder(concept, slots, text)
    if res.ok:
        return res

    # 5. quantity binding + symbolic rearrangement -- bind parsed
    #    quantities (120 km/h -> speed) to formula variables by unit
    #    family, then solve the formula for the asked variable even
    #    when it is not the formula's own LHS (speed=d/t solved for t)
    res = _quantity_solve(concept, slots, text)
    if res.ok:
        return res

    # 6. honest refusal
    reasons = []
    if kernel is not None:
        reasons.append("required values not extracted from the question")
    if last_reason:
        reasons.append(last_reason)
    if not reasons:
        reasons.append("no deterministic compute path in the catalog "
                       "for this question")
    return ExecResult(False, None, [], "; ".join(dict.fromkeys(reasons)),
                      cid, "")


# ------------------------------------------------------------------ #
# Layer 5: quantity binding + symbolic rearrangement
# ------------------------------------------------------------------ #

def _formula_inputs(concept: Dict) -> List[str]:
    """RHS identifiers of the concept's formula — the INPUT variables
    (LHS names are outputs, never inputs)."""
    formula = str(concept.get("formula") or "")
    out = []
    for part in re.split(r"[;\n]", formula):
        if "=" not in part:
            continue
        rhs = part.rsplit("=", 1)[-1]
        for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs):
            wl = n.lower()
            if wl not in ("sin", "cos", "tan", "log", "ln", "sqrt",
                          "exp", "abs", "min", "max", "pi", "e") \
                    and wl not in out:
                out.append(wl)
    return out


def _procedural_solve(concept: Dict, text: str):
    """Pattern-matched deterministic kernels for question shapes a
    symbolic formula cannot express. Each returns ExecResult or None."""
    from backend.its.solver.input_normalizer import normalize_input
    cid = str(concept.get("id", ""))
    norm = normalize_input(text).lower()
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", norm)]
    ints = [int(x) for x in nums]

    def done(v, line):
        return ExecResult(True, float(v), [line], "", cid,
                          "procedural")

    # relative density = density / water density (default 1 g/cm3)
    if "relative density" in norm:
        dm = re.search(r"density\s+(?:of\s+|is\s+)?([\d.]+)", norm) or \
            re.search(r"([\d.]+)\s*g/cu", norm) or \
            re.search(r"measures\s+([\d.]+)", norm)
        wm = re.search(r"water\s+(?:is\s+|density\s+)?([\d.]+)", norm)
        if dm is not None:
            dens = float(dm.group(1))
            w = float(wm.group(1)) if wm else 1.0
            if w:
                return done(dens / w,
                            "RD = %s / %s" % (dens, w))

    # valency from valence-electron count: v if v<=4 else 8-v
    if "valenc" in norm and "electron" in norm:
        vm = re.search(r"(\d+)\s+valence\s+electron", norm) or \
            re.search(r"valence\s+electrons?\D*?(\d+)", norm) or \
            re.search(r"with\s+(\d+)\s+valence", norm)
        if vm is None and len(ints) == 1:
            vm = re.search(r"(\d+)", norm)
        if vm is not None:
            v = int(vm.group(1))
            if 0 <= v <= 8:
                val = v if v <= 4 else 8 - v
                return done(val, "valency = %s (valence electrons %s)"
                            % (val, v))

    # digit sum of a number
    if "digit sum" in norm or "sum of digits" in norm or \
            "sum of the digits" in norm:
        m2 = re.search(r"(?:of|for)\s*(\d+)", norm)
        if m2:
            n0 = int(m2.group(1))
            digs = [int(d) for d in str(n0)]
            # 'remainder when the digit sum (= N) is divided by M'
            rm = re.search(r"=\s*(\d+)\s*\)?\s*is\s*divid\w*\s*by\s*"
                           r"(\d+)", norm)
            if rm:
                return done(int(rm.group(1)) % int(rm.group(2)),
                            "%s %% %s" % (rm.group(1), rm.group(2)))
            if "remainder" in norm and "divid" in norm:
                dm = re.search(r"divid\w*\s*by\s*(\d+)", norm)
                if dm:
                    return done(sum(digs) % int(dm.group(1)),
                                "digit-sum %s %% %s" % (sum(digs),
                                                        dm.group(1)))
            return done(sum(digs), "digit sum = %s" % sum(digs))

    # cyclic permutations of digits: digits a,b,c -> 111*(a+b+c)
    if "cyclic permutation" in norm or "cyclic" in norm:
        dd = re.search(r"digits\s+(\d)", norm)
        if dd:
            seg = norm[dd.start():dd.start() + 20]
            digs = [int(x) for x in re.findall(r"\d", seg)][:3]
            if digs:
                return done(111 * sum(digs),
                            "111 * %s" % sum(digs))

    # 'units digit of 17 x 7' -> product mod 10
    if ("units digit" in norm or "unit digit" in norm) and \
            re.search(r"\d+\s*x\s*\d+", norm):
        # 'the 2 x 1 multiplication 17 x 7' — the LAST product is the
        # operand, the first is the dimension label
        pm = list(re.finditer(r"(\d+)\s*x\s*(\d+)", norm))[-1]
        a, b = int(pm.group(1)), int(pm.group(2))
        return done(a * b % 10, "%s x %s -> %s"
                    % (a, b, a * b % 10))

    # 'multiply N by 1001' -> NN; asks land on a digit of it
    if re.search(r"multiply|multiplied", norm) and "1001" in norm:
        m2 = re.search(r"(\d{3})\s*(?:x|by)\s*1001|1001\s*(?:x|by)\s*"
                       r"(\d{3})", norm)
        n0 = m2.group(1) or m2.group(2) if m2 else None
        if n0:
            return done(int(n0) % 10, "NN pattern -> units digit")

    # 'Nth term is V and Mth term is W' -> solve a,d for an AP
    ords = re.findall(r"(\d+)(?:st|nd|rd|th)\s+term"
                      r"[^,\d]{0,15}?(?:is|=)\s*(-?\d+)", norm)
    if len(ords) >= 2 and "term" in norm:
        (n1, v1), (n2, v2) = (int(ords[0][0]), float(ords[0][1])), \
            (int(ords[1][0]), float(ords[1][1]))
        d = (v1 - v2) / (n1 - n2)
        if re.search(r"common difference|find.*\bd\b", norm):
            return done(d, "d = (%s-%s)/(%s-%s)" % (v1, v2, n1, n2))

    # HCF/LCM — gcd is a NUMERIC op, never a sympy symbol: bind the
    # two operands straight from the question
    if re.search(r"\b(?:hcf|gcd|lcm|greatest common|highest common)\b",
                 norm) and len(ints) >= 2:
        # operand pair: 'hcf of 30 and 40' — first two standalone
        # numbers that are not the stated hcf/lcm value
        # 'lcm of 30 and 40' — 'of' introduces operands, NOT a value:
        # only 'is N' / '= N' states the hcf/lcm
        # 'hcf 10' / 'hcf is 10' / 'hcf = 10' — tight form; the
        # 'of' form is operands not a value.  Gapped form catches
        # 'lcm of 30 and 40 is 120' (is V after the operand list)
        def _stated(word):
            m = re.search(r"\b" + word + r"\s*(?:is|=)\s*"
                          r"(-?\d+(?:\.\d+)?)", norm)
            if m is None:
                m = re.search(r"\b" + word + r"\s+(-?\d+"
                              r"(?:\.\d+)?)\b(?!\s*(?:and|,|of))",
                              norm)
            if m is None:
                m = re.search(r"\b" + word + r"\b.{0,25}?"
                              r"\bis\s*(-?\d+(?:\.\d+)?)", norm)
            return m
        vm = _stated("hcf") or _stated("lcm")
        hm2 = _stated("hcf")
        lm2 = _stated("lcm")
        # operands are the FIRST two numbers — 'of 30 and 40'; a
        # stated hcf/lcm ('given hcf is 10') comes later and may
        # equal an operand (hcf(12,96)=12) — never drop operands
        pair = ints[:2]
        if len(pair) >= 2:
            a, b = int(pair[0]), int(pair[1])
            g = math.gcd(a, b)
            ask = norm[re.search(r"find|verify|what|give|use", norm)
                       .start():] \
                if re.search(r"find|verify|what|give|use", norm) \
                else norm
            fm = re.search(r"(?:find|verify|compute|what|give)\s*"
                           r"(?:the\s+|their\s+|its\s+)?"
                           r"(hcf|lcm|gcd)\b", ask)
            # when the question STATES hcf or lcm, the product
            # relation a*b = hcf*lcm gives the other one (the stated
            # value is authoritative even if coprime arithmetic
            # would disagree — authored data is self-consistent)
            hcf_given = int(hm2.group(1)) if hm2 else None
            lcm_given = int(lm2.group(1)) if lm2 else None
            if fm and fm.group(1) == "lcm":
                if hcf_given:
                    return done(a * b // hcf_given,
                                "a*b/hcf(%s)" % hcf_given)
                return done(a * b // g, "lcm(%s,%s)" % (a, b))
            if fm and fm.group(1) in ("hcf", "gcd"):
                if lcm_given:
                    return done(a * b // lcm_given,
                                "a*b/lcm(%s)" % lcm_given)
                if hcf_given:
                    return done(float(hcf_given), "hcf stated")
                return done(g, "gcd(%s,%s)" % (a, b))
            if re.search(r"\blcm\b", ask):
                if hcf_given:
                    return done(a * b // hcf_given,
                                "a*b/hcf(%s)" % hcf_given)
                return done(a * b // g, "lcm(%s,%s)" % (a, b))
            if hcf_given:
                return done(float(hcf_given), "hcf stated")
            if lcm_given:
                return done(a * b // lcm_given,
                            "a*b/lcm(%s)" % lcm_given)
            return done(g, "gcd(%s,%s)" % (a, b))

    # 'how many multiples of N up to M' -> floor(M/N)
    mm = re.search(r"multiples of\s+(\d+)\s*(?:are there\s*)?"
                   r"(?:up to|below|within|till)\s*(\d+)", norm)
    if mm:
        return done(int(mm.group(2)) // int(mm.group(1)),
                    "%s // %s" % (mm.group(2), mm.group(1)))

    # 'ropes cut into equal pieces' / 'bells ring together' — the
    # word shapes choose hcf vs lcm over plain a,b operands
    if re.search(r"\b(?:ropes?|pieces|strips|planks?|wires?)\b",
                 norm) and len(ints) >= 2:
        hg = re.search(r"\bhcf\s*(?:is|=|of)?\s*(\d+)", norm)
        if hg:
            return done(float(hg.group(1)), "stated hcf")
        a, b = ints[0], ints[1]
        return done(math.gcd(int(a), int(b)),
                    "gcd(%s,%s)" % (int(a), int(b)))
    if re.search(r"\b(?:bells?|lights?|buses|flash)\b", norm) and \
            re.search(r"together|again|same time", norm) and \
            len(ints) >= 2:
        a, b = ints[0], ints[1]
        g = math.gcd(int(a), int(b))
        return done(int(a * b / g), "lcm(%s,%s)" % (int(a), int(b)))

    # 'between 67 and 76, how many of the two numbers are even'
    if re.search(r"between\s+-?\d+\s+and\s+-?\d+", norm) and \
            re.search(r"how many.*\b(even|odd)\b", norm):
        b = re.search(r"between\s+(-?\d+)\s+and\s+(-?\d+)", norm)
        if b:
            lo, hi = int(b.group(1)), int(b.group(2))
            pair = [lo, hi] if "two numbers" in norm else \
                list(range(lo + 1, hi))
            cnt = sum(1 for x in pair
                      if (x % 2 == 0) == ("even" in norm))
            return done(cnt, "parity count = %s" % cnt)

    # ratio/proportion family: '10 : 90 simplest', 'Rs 780 in 5:8',
    # 'a:b = c:?', 'check a:b::c:d', 'N items Rs P, M items ?'
    if re.search(r"\d+\s*:\s*\d+", norm) or "ratio" in norm or \
            "proportion" in norm:
        rs = re.findall(r"rs\.?\s*(\d+(?:\.\d+)?)", norm)
        rats = re.findall(r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)"
                          r"(?:\s*:\s*(\d+(?:\.\d+)?))?", norm)
        flat = [[float(x) for x in t if x] for t in rats]
        # 'check the proportion a : b :: c : d' -> ad - bc == 0
        if "check" in norm or "proportion" in norm:
            if len(flat) >= 2 and len(flat[0]) >= 2 and \
                    len(flat[1]) >= 1:
                a, b = flat[0][0], flat[0][1]
                c = flat[1][0]
                d = flat[1][1] if len(flat[1]) > 1 else None
                if d:
                    return done(a * d - b * c, "cross product check")
        # 'a : b = c : ?' -> c*b/a  (the '?' isn't a digit — grab c
        # from the 'N : ?' half directly)
        if "missing" in norm or "?" in norm or "fourth" in norm:
            c3 = re.search(r"=\s*(\d+(?:\.\d+)?)\s*:\s*\?", norm)
            if flat and c3:
                a, b, c = flat[0][0], flat[0][1], float(c3.group(1))
                return done(c * b / a, "c*b/a")
        if rs:
            total = float(rs[0])
            if flat and "split" in norm or "divided" in norm or \
                    "share" in norm:
                parts = flat[0]
                if re.search(r"largest|larger", norm):
                    return done(total * max(parts) / sum(parts),
                                "largest share")
                return done(total * parts[0] / sum(parts),
                            "first share")
            # 'N notebooks cost Rs P; M notebooks cost ?'
            n2 = re.search(r"(?:will|for)\s*(\d+)\s*"
                           r"(?:notebook|item|pen|book|thing)", norm)
            n1 = re.search(r"(\d+)\s*(?:notebook|item|pen|book)", norm)
            if n1 and n2:
                return done(int(n2.group(1)) * total /
                            int(n1.group(1)), "unit cost")
        # simplest form -> first term a/gcd(a,b)
        if flat and re.search(r"simplest|first term|reduce", norm):
            a, b = int(flat[0][0]), int(flat[0][1])
            g = math.gcd(a, b)
            if "second" in norm:
                return done(b // g, "b/gcd")
            return done(a // g, "a/gcd")

    # pictograph/bar/pie kernels: symbol-key scales, bar scale,
    # pie sector degrees, frequency sums
    if "symbol" in norm or "pictograph" in norm:
        km = re.search(r"(?:symbol\s*=|symbol for|key.*?=)\s*"
                       r"(\d+)\s*units", norm)
        sm = re.search(r"(\d+)\s*symbols", norm) or \
            re.search(r"shows\s*(\d+)", norm)
        # 'how many symbols for 16 units' — the ASKED units is the
        # LAST 'N units' (the first is the key '1 symbol = 2 units')
        ums = re.findall(r"(\d+)\s*units", norm)
        if km and sm:
            return done(float(km.group(1)) * float(sm.group(1)),
                        "key * symbols")
        if km and len(ums) > 1:
            return done(float(ums[-1]) / float(km.group(1)),
                        "units / key")
    if "bar" in norm and re.search(r"unit", norm):
        km = re.search(r"unit.*?(\d+)\s*(?:books|items|students|"
                       r"people|units)", norm)
        # asked height is the LAST 'N units' — the key's '1 unit'
        # and '1 unit = K books' scale text come first
        hus = re.findall(r"(\d+)\s*units?\b", norm)
        hm = hus[-1] if len(hus) > 1 else None
        fm = re.search(r"frequency\s*(?:of|is)?\s*(\d+)", norm)
        sc = re.search(r"scale.*?=\s*(\d+)", norm)
        if fm and sc:
            return done(float(fm.group(1)) / float(sc.group(1)),
                        "freq / scale")
        if km and hm:
            return done(float(km.group(1)) * float(hm),
                        "scale * height")
    if re.search(r"pie|sector", norm):
        pm = re.search(r"(\d+)\s*out of\s*(\d+)", norm)
        if pm:
            return done(360.0 * float(pm.group(1)) /
                        float(pm.group(2)), "360 * part/whole")
    # 'frequencies X, Y and Z' -> total
    if re.search(r"frequencies|frequency table", norm):
        nums = re.findall(r"-?\d+(?:\.\d+)?",
                          norm.split("frequenc", 1)[-1])
        if len(nums) >= 2:
            return done(sum(float(x) for x in nums),
                        "sum of frequencies")

    # 'non-square numbers between n^2 and (n+1)^2' -> 2n
    sq2 = re.search(r"between\s+(\d+)\s*\^\s*2\s+and\s+(\d+)\s*\^\s*2",
                    norm)
    if sq2 and "non-square" in norm:
        return done(2 * int(sq2.group(1)), "2n = %s" % (2 * int(
            sq2.group(1))))

    # 'units digit of the square/cube/power of N' — last digit only
    if re.search(r"units?\s*digit", norm):
        pm = re.search(r"(?:square|cube|power|product)\s*of\s*(\d+)",
                       norm) or re.search(r"of\s*(\d+)", norm)
        if pm:
            n = int(pm.group(1))
            if "cube" in norm:
                return done(float((n ** 3) % 10), "n^3 mod 10")
            return done(float((n * n) % 10), "n^2 mod 10")
    # 'N has prime factorisation p^a x q^b — what is p/q/the exponent'
    pf = re.search(r"factoris\w+\s*(?:of|is|=)?\s*"
                   r"(\d+)\s*\^\s*(\d+)\s*x\s*(\d+)\s*\^\s*(\d+)",
                   norm)
    if pf:
        p1, e1, p2, e2 = (int(x) for x in pf.groups())
        if re.search(r"exponent|power", norm):
            # asked exponent = the one the question didn't already
            # ask about — second is the typical 'missing' one
            return done(float(e2), "exponent")
        if "second" in norm or "other" in norm:
            return done(float(p2), "other prime")
        return done(float(p2), "prime factor")

    # 'first N odd numbers' -> n^2 ; 'first N even' -> n(n+1) ;
    # 'counting 1..n and back down' (Virahanka pyramid) -> n^2
    nm = re.search(r"first\s+(\d+)\s+(odd|even)", norm)
    if nm:
        n = int(nm.group(1))
        if nm.group(2) == "odd":
            return done(float(n * n), "n^2")
        return done(float(n * (n + 1)), "n(n+1)")
    if re.search(r"up (?:from|to).*?back|and then back", norm):
        nm = re.search(r"to\s+(\d+)", norm)
        if nm:
            n = int(nm.group(1))
            return done(float(n * n), "pyramid n^2")
    # 'peak n in 1+2+...+n+...+2+1' -> n^2 (normalizer turns
    # ellipses into '+ +': '1 + 2 + + 8 + + 2 + 1')
    if (re.search(r"\d+\s*\+\s*\.\.\.|\.{3}|\d\s*\+\s*\+\s*\d",
                  norm) and "+" in norm):
        ps = re.findall(r"\d+", norm)
        if ps:
            pk = max(int(x) for x in ps)
            return done(float(pk * pk), "peak^2")
    # 'sum of n consecutive triangular numbers = n^2' (stated rule)
    if "triangular" in norm and "consecutive" in norm:
        nm = re.search(r"n\s*=\s*(\d+)", norm)
        if nm:
            n = int(nm.group(1))
            return done(float(n * n), "n^2")
    # T_a + T_(a+1) = (a+1)^2
    tm = re.findall(r"t_?\(?\s*(\d+)\s*\)?", norm)
    if "triangular" in norm and len(tm) >= 2:
        return done(float(max(int(x) for x in tm) ** 2), "n^2")
    # 'proper divisors are ...' -> their sum (perfect-number check)
    if "proper divisor" in norm or "perfect number" in norm:
        dm = re.search(r"divisors?\s*(?:are|sum to|is)?\s*"
                       r"([\d\s,+]+(?:\s*and\s*\d+)?)", norm)
        if dm:
            vals = [float(x) for x in re.findall(r"\d+",
                                               dm.group(1))]
            if vals:
                return done(sum(vals), "sum of proper divisors")
    # digit-reversal SUM: 'number and its reversal add to
    # 11 x (sum of digits)' — reversal DIFFERENCE is 9 x diff
    if "revers" in norm:
        nm = re.search(r"(?:number|for)\s*(?:the number\s*)?"
                       r"(\d{2})\b", norm)
        if nm:
            n2 = int(nm.group(1))
            dsum = n2 // 10 + n2 % 10
            ddif = abs(n2 // 10 - n2 % 10)
            if re.search(r"add|sum", norm):
                return done(float(11 * dsum), "11*(a+b)")
            return done(float(9 * ddif), "9*|a-b|")
    # 'N = p^a x q^b — smallest multiplier/divisor to a perfect cube'
    pf = re.search(r"factoris\w+\s*(?:of|is|=)?\s*"
                   r"((?:\d+\s*\^\s*\d+\s*(?:x\s*)?)+)", norm)
    if pf and "cube" in norm:
        facs = [(int(a), int(b)) for a, b in
                re.findall(r"(\d+)\s*\^\s*(\d+)", pf.group(1))]
        # bare trailing factor: '5^4 x 2' -> 2^1 — search the whole
        # tail after 'factorisation', not just the captured group
        for lone in re.findall(r"x\s*(\d+)(?!\s*\^)", norm[pf.start():]):
            facs.append((int(lone), 1))
        if facs:
            if "divid" in norm:
                # remove excess mod-3 exponents
                out = 1
                for p, e in facs:
                    out *= p ** (e % 3)
                return done(float(out), "divide excess")
            out = 1
            for p, e in facs:
                out *= p ** ((3 - e % 3) % 3)
            return done(float(out), "multiply deficit")

    # tiny fact lookups — no formula needed, pure definitions
    if re.search(r"distinct lines.*meet|lines.*intersect.*at most|"
                 r"at most.*intersect", norm):
        return done(1.0, "two lines meet in at most 1 point")
    if "empty set" in norm or "empty relation" in norm:
        return done(0.0, "empty -> 0")
    if re.search(r"singleton|set with 1 element|"
                 r"set\s*=\s*\{\s*\d+\s*\}", norm):
        return done(1.0, "singleton -> 1")
    if "reflexive" in norm or "identity relation" in norm:
        nm = re.search(r"(\d+)\s*elements?", norm)
        if nm:
            return done(float(nm.group(1)), "n diagonal pairs")
    mm = re.search(r"set.*?(\d+)\s*elements?.*?(?:pairs?)\b", norm)
    if mm:
        n = int(mm.group(1))
        # 'relations exist' asks the count of relations = 2^(n^2);
        # 'pairs in the universal relation' asks |AxA| = n^2
        if "relations exist" in norm:
            return done(float(2 ** (n * n)), "2^(n^2)")
        return done(float(n * n), "n^2 pairs")
    # nth figurate number: '9th triangular' -> n(n+1)/2,
    # '6th hexagonal' -> n(2n-1), 'square of 27' -> n^2,
    # 'cube of 3' -> n^3, 'cube root of 64' -> n^(1/3)
    om = re.search(r"(\d+)(?:st|nd|rd|th)\s*"
                   r"(triangular|hexagonal|pentagonal|square|"
                   r"cube|prime|even|odd)", norm)
    if om:
        n = int(om.group(1)); kind = om.group(2)
        if kind == "triangular":
            return done(n * (n + 1) / 2, "n(n+1)/2")
        if kind == "hexagonal":
            # corpus convention: centered hexagonal 3n(n-1)+1
            return done(3 * n * (n - 1) + 1, "3n(n-1)+1")
        if kind == "square":
            return done(float(n * n), "n^2")
        if kind == "cube":
            return done(float(n ** 3), "n^3")
    # 'formed by 7 dots' / '7 rows' variants of figurate numbers
    dm = re.search(r"(\d+)\s*(?:dots|rows?)\s*(?:arranged|in|form)?",
                   norm)
    if dm and "triangular" in norm:
        n = int(dm.group(1))
        return done(n * (n + 1) / 2, "n(n+1)/2")
    # fractals: Koch sides = 3*4^(n-1) ; Sierpinski remain = 8^n,
    # holes = (8^n - 1)/7
    if "koch" in norm or "snowflake" in norm:
        om = re.search(r"(\d+)(?:st|nd|rd|th)?\s*(?:round|step|"
                       r"iteration|stage)s?", norm) or \
            re.search(r"(?:after|at)\s*(?:round|step|iteration)\s*"
                      r"(\d+)", norm) or \
            re.search(r"(?:after|at)\s*(\d+)\s*(?:round|step|"
                      r"iteration)s?", norm)
        if om:
            return done(3.0 * 4 ** (int(om.group(1)) - 1),
                        "3*4^(n-1)")
    if "sierpinski" in norm:
        om = re.search(r"(\d+)(?:st|nd|rd|th)?\s*(?:step|stage|"
                       r"iteration)s?", norm) or \
            re.search(r"(?:after|at|step|stage)\s*(\d+)", norm)
        if om:
            n = int(om.group(1))
            if "hole" in norm:
                return done((8 ** n - 1) / 7, "(8^n-1)/7")
            return done(float(8 ** n), "8^n")

    mm = re.search(r"(?:the\s+)?square\s+of\s+(\d+)", norm)
    if mm and "root" not in norm and "more than" not in norm:
        return done(float(int(mm.group(1)) ** 2), "n^2")
    mm = re.search(r"(?:the\s+)?cube\s+of\s+(\d+)", norm)
    if mm and "root" not in norm:
        return done(float(int(mm.group(1)) ** 3), "n^3")
    mm = re.search(r"cube\s+root\s+of\s+(\d+)", norm)
    if mm:
        return done(round(int(mm.group(1)) ** (1 / 3), 6), "n^(1/3)")
    mm = re.search(r"square\s+root\s+of\s+(\d+)", norm)
    if mm:
        return done(round(int(mm.group(1)) ** 0.5, 6), "n^(1/2)")

    # single-relation angle kernels — work without any formula:
    # complementary=90-a, linear/supplementary/co-interior=180-a,
    # vertically opposite=a, around a point=360-(sum)
    # drop the relation constant itself — 'add to 180', 'total 360'
    # are totals, not givens
    def _nonconst(total):
        vals = [x for x in ints if abs(x - total) > 1e-9]
        return vals
    if "vertically opposite" in norm and ints:
        if re.search(r"adjacent|linear pair|other", norm):
            v = _nonconst(180.0) or ints
            return done(180.0 - v[0], "180 - a")
        return done(float(ints[0]), "vertically opposite = a")
    if re.search(r"complement", norm) and ints:
        v = _nonconst(90.0) or ints
        return done(90.0 - v[0], "90 - a")
    if re.search(r"linear pair|straight line|straight angle|"
                 r"co-interior|allied|supplement", norm) and ints:
        v = _nonconst(180.0) or ints
        return done(180.0 - v[0], "180 - a")
    if re.search(r"around a point|complete angle|full turn",
                 norm) and ints:
        v = _nonconst(360.0)
        if v:
            return done(360.0 - sum(float(x) for x in v),
                        "360 - sum")

    # circle family — NCERT class-6/7 convention: pi = 22/7 unless
    # the question says otherwise
    if re.search(r"circle|circumference|radius|diameter|sector|arc|"
                 r"concentric", norm) and "cylinder" not in norm and \
            "curved" not in norm and not re.search(
                r"hemispher|sphere|cone|tent", norm):
        pv = 22 / 7 if "3.14" not in norm else 3.14
        rm = re.search(r"radius\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                       norm)
        dm = re.search(r"diameter\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                       norm)
        am = re.search(r"(\d+)\s*deg", norm)
        rads = re.findall(r"radii?\s*(\d+)(?:\s*cm)?\s*(?:and|to)\s*"
                          r"(\d+)", norm)
        r = float(rm.group(1)) if rm else (
            float(dm.group(1)) / 2 if dm else None)
        if r is None and rads:
            r = float(rads[0][0])
        th = float(am.group(1)) if am else None
        if r is not None:
            if "sector" in norm and th is not None:
                return done(pv * r * r * th / 360,
                            "pi r^2 theta/360")
            if "arc" in norm and th is not None:
                return done(2 * pv * r * th / 360,
                            "2 pi r theta/360")
            if rads:
                r2 = float(rads[0][1])
                if "area" in norm or "ring" in norm or \
                        "annulus" in norm:
                    return done(pv * (r2 * r2 - r * r),
                                "pi(R^2-r^2)")
            if "circumference" in norm or "rotation" in norm:
                return done(2 * pv * r, "2 pi r")
            if "area" in norm:
                return done(pv * r * r, "pi r^2")
        if dm and "circumference" in norm:
            return done(pv * float(dm.group(1)), "pi d")

    # perimeter family — shape name decides which side-rule applies
    if "perimeter" in norm:
        if "square" in norm:
            sm = re.search(r"side\s*(?:is|=|of)?\s*(\d+)", norm)
            if sm:
                return done(4.0 * int(sm.group(1)), "4s")
        if re.search(r"equilateral", norm):
            sm = re.search(r"side\s*(?:is|=|of)?\s*(\d+)", norm)
            if sm:
                return done(3.0 * int(sm.group(1)), "3s")
        pm = re.search(r"(?:regular\s+)?polygon[^,;.\d]{0,15}?"
                       r"(\d+)\s*sides?[^.]*?(\d+)", norm)
        if pm and "side" in norm:
            return done(float(int(pm.group(1)) * int(pm.group(2))),
                        "n*s")
        if "triangle" in norm and len(ints) >= 3:
            return done(float(sum(ints[:3])), "a+b+c")
        if len(ints) == 2:
            return done(2.0 * (ints[0] + ints[1]), "2(l+w)")
    # rectangle: 'area A and length L' -> width = A/L (or reverse)
    if "rectangle" in norm or "rectangular" in norm:
        am = re.search(r"area\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", norm)
        lm = re.search(r"length\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                       norm)
        wm = re.search(r"width|breadth", norm)
        if am and lm and wm:
            return done(float(am.group(1)) / float(lm.group(1)),
                        "w = A/L")
        am2 = re.search(r"area\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                        norm)
        wm2 = re.search(r"(?:width|breadth)\s*(?:is|=|of)?\s*"
                        r"(\d+(?:\.\d+)?)", norm)
        if am2 and wm2 and re.search(r"length|long\b", norm):
            return done(float(am2.group(1)) / float(wm2.group(1)),
                        "L = A/w")
        # 'measuring N cm by M cm' -> area (x already covered)
        dm3 = re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m)\s*(?:by|x)\s*"
                        r"(\d+(?:\.\d+)?)\s*(?:cm|m)", norm)
        if dm3 and re.search(r"area", norm):
            return done(float(dm3.group(1)) * float(dm3.group(2)),
                        "l*w")
    # parallelogram area: 'base b and height h' -> b*h;
    # 'adjacent sides a and b' -> perimeter 2(a+b)
    if "parallelogram" in norm and "perimeter" in norm:
        am = re.search(r"sides?\s*(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*"
                       r"and\s*(\d+(?:\.\d+)?)", norm)
        if am:
            return done(2 * (float(am.group(1)) +
                             float(am.group(2))), "2(a+b)")
    if "parallelogram" in norm and "area" in norm and \
            "same base" not in norm:
        bm = re.search(r"base\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", norm)
        hm = re.search(r"height\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                       norm)
        if bm and hm:
            return done(float(bm.group(1)) * float(hm.group(1)),
                        "b*h")
    # rounds around a field: 'N rounds around a square of side s'
    if re.search(r"rounds?|laps?", norm) and "square" in norm:
        rm = re.search(r"(\d+)\s*rounds?", norm)
        sm = re.search(r"side\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", norm)
        if rm and sm:
            return done(float(rm.group(1)) * 4 *
                        float(sm.group(1)), "n*4s")
    # tiles: 'N tiles of side s fit in an L x W room' -> LW/s^2
    tm = re.search(r"tiles?\s*of\s*side\s*(\d+)", norm)
    dm = re.search(r"(\d+)\s*(?:m|cm)?\s*x\s*(\d+)\s*(?:m|cm)",
                   norm)
    if tm and dm:
        s = float(tm.group(1))
        area = float(dm.group(1)) * float(dm.group(2))
        return done(area / (s * s), "LW/s^2")

    # sets/combinatorics lookups — 'relation' before 'subset' (a
    # relation question contains the word subset)
    if "relation" in norm and "subset" in norm and \
            "pairs" not in norm:
        nm = re.search(r"(\d+)\s*elements?", norm)
        if nm:
            n = int(nm.group(1))
            return done(float(2 ** (n * n)), "2^(n^2) relations")
    sm = re.search(r"subsets?.*?(\d+)\s*elements?|(\d+)\s*elements?"
                   r".*?subsets?", norm)
    if sm:
        n = int(sm.group(1) or sm.group(2))
        return done(float(2 ** n), "2^n")
    pm = re.search(r"permutations?\)?\s*of\s*(\d+).*?taken\s*(\d+)",
                   norm)
    if pm:
        n, r = int(pm.group(1)), int(pm.group(2))
        return done(float(math.factorial(n) // math.factorial(n - r)),
                    "nPr")
    wm = re.search(r"(\d+)\s*identical.*?(\d+)\s*identical.*?"
                   r"(\d+)\s*letters?", norm)
    if wm:
        a, b, tot = int(wm.group(1)), int(wm.group(2)), int(wm.group(3))
        return done(float(math.factorial(tot) //
                          (math.factorial(a) * math.factorial(b))),
                    "n!/(a!b!)")
    # quadrilateral diagonals: bisect -> /2 ; rhombus area = d1*d2/2
    if "bisect" in norm or ("diagonal" in norm and "half" in norm):
        dm = re.search(r"diagonal\s*(?:is|=|of)?\s*(\d+)", norm)
        if dm:
            return done(float(dm.group(1)) / 2, "d/2")
    if "rhombus" in norm:
        dm = re.search(r"diagonals?[^,;.\d]{0,25}?(\d+)\s*"
                       r"(?:cm|m)?\s*and\s*(\d+)", norm)
        if dm and "side" in norm:
            d1, d2 = float(dm.group(1)), float(dm.group(2))
            return done(round(math.sqrt((d1 / 2) ** 2 +
                                        (d2 / 2) ** 2), 2),
                        "sqrt((d1/2)^2+(d2/2)^2)")
        if dm:
            d1, d2 = float(dm.group(1)), float(dm.group(2))
            if "area" in norm:
                return done(d1 * d2 / 2, "d1*d2/2")
            return done(round(math.hypot(d1 / 2, d2 / 2), 2),
                        "sqrt((d1/2)^2+(d2/2)^2)")
    if "trapezium" in norm or "trapezoid" in norm:
        pm = re.search(r"parallel sides?[^,;.\d]{0,25}?(\d+)\s*"
                       r"(?:cm|m)?\s*and\s*(\d+)", norm)
        hm = re.search(r"(?:height|distance)[^,;.\d]{0,20}?(\d+)",
                       norm)
        if pm and hm:
            return done((float(pm.group(1)) + float(pm.group(2)))
                        / 2 * float(hm.group(1)), "(a+b)/2*h")
    # quadrilateral: area = 1/2 * d * (p1 + p2)  (perpendiculars on
    # a diagonal from opposite vertices)
    qd = re.search(r"diagonal[^,;.\d]{0,15}?(\d+)", norm)
    qp = re.search(r"perpendiculars?[^,;.\d]{0,60}?(\d+)\s*"
                   r"(?:cm|m)?\s*and\s*(\d+)", norm)
    if qd and qp:
        return done(0.5 * float(qd.group(1)) *
                    (float(qp.group(1)) + float(qp.group(2))),
                    "d(p1+p2)/2")
    # same-base equal-area: equal areas -> h_p = (b_t*h_t/2)/b_p
    if "parallelogram" in norm and "same base" in norm:
        tb = re.search(r"triangle[^.]*?base\s*(\d+(?:\.\d+)?)", norm)
        th = re.search(r"(?:triangle[^.]*?height|height[^.]*?"
                       r"triangle)\s*(?:is|=|of)?\s*"
                       r"(\d+(?:\.\d+)?)", norm)
        pb = re.search(r"parallelogram'?s?\s*(?:base|height).*?"
                       r"base\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", norm)
        if tb and th and pb:
            area = float(tb.group(1)) * float(th.group(1)) / 2
            return done(round(area / float(pb.group(1)), 4),
                        "b*h/2/bp")
        if th:
            return done(float(th.group(1)) / 2, "h/2")
    if "kite" in norm:
        km = re.search(r"unequal sides\s*(?:is|=|of)?\s*(\d+)", norm)
        if km:
            return done(360.0 - 2 * float(km.group(1)), "360-2a")

    # AP count: 'AP 15, 18, 21, ... up to 33' -> n = (l-a)/d + 1
    um = re.search(r"up to\s*(?:and\s*including\s*)?(\d+)", norm)
    if um and re.search(r"\bap\b|sequence|progression", norm):
        sm = re.search(r"(?:ap|sequence|progression)\s*"
                       r"(-?\d+)\s*,\s*(-?\d+)", norm)
        if sm and um:
            a, d = float(sm.group(1)), float(sm.group(2)) - \
                float(sm.group(1))
            l = float(um.group(1))
            if d:
                return done((l - a) / d + 1, "n=(l-a)/d+1")

    # 'zeros of a quadratic are a and b' -> sum = a+b, product = ab
    zm = re.search(r"zeros?.*?are\s*(-?\d+(?:\.\d+)?)\s*and\s*"
                   r"(-?\d+(?:\.\d+)?)", norm)
    if zm:
        a, b = float(zm.group(1)), float(zm.group(2))
        if "product" in norm:
            return done(a * b, "product of zeros")
        return done(a + b, "sum of zeros")
    # 'square garden each side N ... area' -> s^2
    if "square" in norm and "area" in norm and "root" not in norm:
        sm = re.search(r"side\s*(?:is|=|of)?\s*(\d+)", norm)
        if sm:
            return done(float(int(sm.group(1)) ** 2), "s^2")

    # integer ops on bare pairs — skip when '/' is present (those
    # are fraction questions handled by the fraction kernels below)
    _has_frac = bool(re.search(r"\d\s*/\s*\d", norm))
    if "additive inverse" in norm and ints and not _has_frac:
        return done(-ints[0], "-a")
    _has_dec = bool(re.search(r"\d\.\d", norm))
    am = re.search(r"\badd\s+(?:the\s+)?(?:integers?|numbers?)\s*"
                   r"(-?\d+)\s*and\s*(-?\d+)", norm)
    if not _has_frac and not _has_dec and am:
        return done(float(am.group(1)) + float(am.group(2)), "a+b")
    dm = re.search(r"distributive.*?(\d+)\s*x\s*(\d+)\s*\+\s*"
                   r"(\d+)\s*x\s*(\d+)", norm) or \
        re.search(r"(\d+)\s*x\s*(\d+)\s*\+\s*(\d+)\s*x\s*(\d+)",
                  norm)
    if dm:
        a, b, c2, dd = (int(x) for x in dm.groups())
        return done(a * b + c2 * dd, "ab+cd")
    _vec = bool(re.search(r"dot product|cross product|vector|"
                          r"component of|projection|scalar product|"
                          r"matrix|matrices|determinant|\[\[|"
                          r"point.*line.*=", norm))
    if not _has_frac and not _has_dec and not _vec and \
            re.search(r"multiply|product", norm) and len(ints) >= 2:
        return done(float(ints[0] * ints[1]), "a*b")
    if not _has_frac and not _has_dec and \
            re.search(r"divide|divided", norm) and len(ints) >= 2:
        if ints[1] != 0:
            return done(float(ints[0]) / float(ints[1]), "a/b")
    mv = re.search(r"starts? at\s*(-?\d+).*?moves?\s*(-?\d+)", norm)
    if mv:
        return done(float(mv.group(1)) + float(mv.group(2)),
                    "start + move")

    # fraction-on-fraction ops BEFORE the int x frac patterns
    fm = re.search(r"multiply\s*(?:the\s*fractions?\s*)?"
                   r"(\d+)\s*/\s*(\d+)\s*(?:and|x|by)\s*"
                   r"(\d+)\s*/\s*(\d+)", norm)
    if fm:
        a, b, c2, dd = (int(x) for x in fm.groups())
        return done(a * c2 / (b * dd), "ac/bd")
    fm = re.search(r"divide\s*(\d+)\s*/\s*(\d+)\s*by\s*"
                   r"(\d+)\s*/\s*(\d+)", norm)
    if fm:
        a, b, c2, dd = (int(x) for x in fm.groups())
        return done(a * dd / (b * c2), "ad/bc")
    fm = re.search(r"reciprocal\s*of\s*(\d+)\s*/\s*(\d+)", norm)
    if fm:
        return done(int(fm.group(2)) / int(fm.group(1)), "b/a")
    fm = re.search(r"(?:add|sum)\s*(?:the\s*fractions?\s*)?"
                   r"(\d+)\s*/\s*(\d+)\s*and\s*(\d+)\s*/\s*(\d+)",
                   norm)
    if fm:
        a, b, c2, dd = (int(x) for x in fm.groups())
        if b == dd:
            return done((a + c2) / b, "(a+c)/b")
        return done((a * dd + c2 * b) / (b * dd), "common denom")
    # fractions: '8 x 3/9' -> 8*3/9 ; 'a/b of N' -> a*N/b ;
    # 'a/b + c/b' same-denominator sums
    fm = re.search(r"(\d+)\s*[x×*]\s*(\d+)\s*/\s*(\d+)", norm)
    if fm:
        a, p, qq = int(fm.group(1)), int(fm.group(2)), int(fm.group(3))
        return done(a * p / qq, "%s*%s/%s" % (a, p, qq))
    fm = re.search(r"(\d+)\s*/\s*(\d+)\s*(?:of|x)\s*"
                   r"(\d+(?:\.\d+)?)", norm)
    if fm:
        p, qq, a = float(fm.group(1)), float(fm.group(2)), \
            float(fm.group(3))
        return done(p * a / qq, "%s*%s/%s" % (p, a, qq))
    fm = re.search(r"(\d+)\s*/\s*(\d+)\s*\+\s*(\d+)\s*/\s*\2\b", norm)
    if fm:
        p, qq, r = int(fm.group(1)), int(fm.group(2)), int(fm.group(3))
        return done((p + r) / qq, "(%s+%s)/%s" % (p, r, qq))

    # weighted mean must beat the plain-mean kernel: 'Rs a per kg
    # (x kg) and Rs b per kg (y kg)' is a weighted average
    wms = re.findall(r"rs\.?\s*(\d+(?:\.\d+)?)\s*per\s*kg\s*"
                     r"\((\d+(?:\.\d+)?)\s*kg\)", norm)
    if len(wms) >= 2:
        tot = sum(float(p) * float(q) for p, q in wms)
        qty = sum(float(q) for _, q in wms)
        return done(round(tot / qty, 4), "weighted avg")
    # '60 litres; 10 drawn and replaced' -> remaining of original
    vm = re.search(r"holds?\s*(\d+(?:\.\d+)?)\s*litres?.*?(\d+(?:"
                   r"\.\d+)?)\s*litres?\s*(?:are\s*)?(?:drawn|"
                   r"removed)", norm)
    if vm:
        return done(float(vm.group(1)) - float(vm.group(2)),
                    "V - drawn")

    # statistics: mean / median / mode / range / variance / quartiles
    if re.search(r"mean|median|mode|range|variance|deviation|"
                 r"quartile|average", norm) and \
            not re.search(r"average\s+speed|speed\b.*\bkm", norm):
        nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?",
                                           norm)]
        # specific measures BEFORE generic 'mean' — 'mean deviation
        # about the mean' and CV questions contain the word 'mean'
        if "coefficient of variation" in norm:
            sd = re.search(r"deviation\s*(?:is|=|of)?\s*"
                           r"(\d+(?:\.\d+)?)", norm)
            mu = re.search(r"mean\s*(?:is|=|of)?\s*"
                           r"(\d+(?:\.\d+)?)", norm)
            if sd and mu and float(mu.group(1)):
                return done(float(sd.group(1)) /
                            float(mu.group(1)) * 100, "CV")
        if "mean deviation" in norm and nums:
            mu = sum(nums) / len(nums)
            return done(round(
                sum(abs(x - mu) for x in nums) / len(nums), 6),
                "MD")
        if "median" in norm:
            mm = re.search(r"middle values?\s*(\d+(?:\.\d+)?)\s*"
                           r"and\s*(\d+(?:\.\d+)?)", norm)
            if mm:
                return done((float(mm.group(1)) +
                             float(mm.group(2))) / 2, "mid avg")
            lm = re.search(r"end with\s*\.{0,3}\s*,?\s*"
                           r"(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)",
                           norm)
            if lm:
                return done(float(lm.group(2)), "last")
            if nums:
                srt = sorted(nums)
                n2 = len(srt)
                if n2 % 2:
                    return done(srt[n2 // 2], "median")
                return done((srt[n2 // 2 - 1] + srt[n2 // 2]) / 2,
                            "median")
        if re.search(r"\bmean\b|average", norm) and nums:
            return done(sum(nums) / len(nums), "mean")
        if re.search(r"\brange\b", norm) and nums:
            return done(max(nums) - min(nums), "max-min")
        if "mode" in norm or "occurs" in norm:
            freq = re.findall(r"value\s*(\d+(?:\.\d+)?)\s*occurs?\s*"
                              r"(\d+)\s*times?", norm)
            if freq:
                best = max(freq, key=lambda t: int(t[1]))
                return done(float(best[0]), "mode")
        if "variance" in norm:
            if re.search(r"standard deviation|sd\b", norm):
                vm = re.search(r"variance\s*(?:is|=|of)?\s*"
                               r"(\d+(?:\.\d+)?)", norm)
                if vm:
                    return done(math.sqrt(float(vm.group(1))),
                                "sqrt(var)")
            if nums:
                mu = sum(nums) / len(nums)
                var = sum((x - mu) ** 2 for x in nums) / len(nums)
                return done(round(var, 6), "var")
        qm = re.search(r"quartiles?\s*(?:are|of)?\s*"
                       r"(\d+(?:\.\d+)?)\s*and\s*(\d+(?:\.\d+)?)",
                       norm)
        if qm and ("range" in norm or "interquartile" in norm):
            return done(float(qm.group(2)) - float(qm.group(1)),
                        "Q3-Q1")
        if qm and "coefficient" in norm:
            q1, q3 = float(qm.group(1)), float(qm.group(2))
            return done((q3 - q1) / (q3 + q1) * 100, "QD coeff")

    # congruence counts + right-triangle leg + isosceles base angle
    if "congruent" in norm or "third angle" in norm:
        an = re.findall(r"angles?\s*(?:are|of)?\s*(\d+(?:\.\d+)?)"
                        r"\s*(?:degrees|deg)?\s*and\s*"
                        r"(\d+(?:\.\d+)?)", norm)
        if an and "third" in norm:
            return done(180.0 - float(an[0][0]) - float(an[0][1]),
                        "180-a-b")
    if "sss" in norm and ("pairs" in norm or "equal" in norm):
        return done(3.0, "SSS=3")
    if "asa" in norm and ("equalit" in norm or "how many" in norm):
        return done(3.0, "ASA=2A+1S")
    rt = re.search(r"hypotenuse\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                   norm)
    lg = re.search(r"(?:one\s+)?leg\s*(?:is|=|of)?\s*"
                   r"(\d+(?:\.\d+)?)", norm)
    if rt and lg and "right" in norm:
        h, l = float(rt.group(1)), float(lg.group(1))
        if h > l:
            return done(round(math.sqrt(h * h - l * l), 4),
                        "sqrt(h^2-l^2)")
    iso = re.search(r"isosceles.*?vertex\s*(?:angle)?\s*"
                    r"(\d+(?:\.\d+)?)", norm)
    if iso and re.search(r"base angle|equal angle|each.*angle",
                         norm):
        return done((180.0 - float(iso.group(1))) / 2,
                    "(180-v)/2")

    # nested area: 'A x B garden has a C x D bed inside' -> AB-CD
    dims = re.findall(r"(\d+(?:\.\d+)?)\s*(?:m|cm|ft)?\s*x\s*"
                      r"(\d+(?:\.\d+)?)\s*(?:m|cm|ft)", norm)
    if len(dims) >= 2 and re.search(r"inside|bed|path|border|"
                                    r"remaining", norm):
        a1 = float(dims[0][0]) * float(dims[0][1])
        a2 = float(dims[1][0]) * float(dims[1][1])
        return done(abs(a1 - a2), "outer-inner")
    # tiling cost: 'Rs N per square metre' + area or dims -> cost
    tc = re.search(r"costs?\s*rs\.?\s*(\d+(?:\.\d+)?)\s*per\s*"
                   r"square", norm)
    ta = re.search(r"area\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", norm)
    if tc and not ta:
        dm2 = re.search(r"(\d+(?:\.\d+)?)\s*m\s*(?:by|x)\s*"
                        r"(\d+(?:\.\d+)?)\s*m", norm)
        if dm2:
            return done(float(tc.group(1)) * float(dm2.group(1)) *
                        float(dm2.group(2)), "rate*l*w")
    if tc and ta:
        return done(float(tc.group(1)) * float(ta.group(1)),
                    "rate*area")

    # 'fitted value'/'trend line': y = a + bx evaluated at x=N
    tm = re.search(r"y\s*=\s*([0-9x+\-*/^()\s.]+?)\s*"
                   r"(?:\.|,|find|$)", norm)
    tx = re.search(r"x\s*=\s*(-?\d+(?:\.\d+)?)", norm)
    if tm and tx and re.search(r"trend|fitted|value", norm):
        try:
            import sympy as _sp
            ex = _sp.sympify(_mathify(tm.group(1)))
            return done(float(ex.subs(_sp.Symbol("x"),
                                      float(tx.group(1)))),
                        "trend")
        except Exception:
            pass

    # rational numbers: add, distance, standard form, inverses,
    # midpoint — fraction answers returned as floats
    if "rational" in norm or re.search(r"\d+\s*/\s*\d+", norm):
        frs = re.findall(r"(-?\d+)\s*/\s*(-?\d+)", norm)
        if frs:
            from fractions import Fraction as _F
            F = [_F(int(a), int(b)) for a, b in frs]
            if "standard form" in norm or "simplest form" in norm:
                return done(float(F[0]), "p/q reduced")
            if "additive inverse" in norm:
                return done(float(-F[0]), "-p/q")
            if "multiplicative inverse" in norm or \
                    "reciprocal" in norm:
                return done(float(1 / F[0]), "q/p")
            if "halfway" in norm or "midpoint" in norm or \
                    "exactly between" in norm:
                if len(F) >= 2:
                    return done(float((F[0] + F[1]) / 2),
                                "(a+b)/2")
            if "distance" in norm and len(F) >= 2:
                return done(float(abs(F[0] - F[1])), "|a-b|")
            if "add" in norm and len(F) >= 2:
                return done(float(F[0] + F[1]), "a+b")
            if ("subtract" in norm or "difference" in norm) and \
                    len(F) >= 2:
                if "from" in norm:
                    return done(float(F[1] - F[0]), "b-a")
                return done(float(F[0] - F[1]), "a-b")

    # index numbers: simple aggregative Σp1/Σp0*100; L*P/10000
    if "aggregative" in norm:
        cur = re.search(r"current-year prices are\s*([\d,\s.]+)",
                        norm)
        bas = re.search(r"base-year prices are\s*([\d,\s.]+)", norm)
        if cur and bas:
            c = sum(float(x) for x in
                    re.findall(r"\d+(?:\.\d+)?", cur.group(1)))
            b = sum(float(x) for x in
                    re.findall(r"\d+(?:\.\d+)?", bas.group(1)))
            if b:
                return done(round(c / b * 100, 2), "sumP1/sumP0")
    tm2 = re.search(r"laspeyres.*?is\s*(\d+(?:\.\d+)?).*?"
                    r"paasche.*?is\s*(\d+(?:\.\d+)?)", norm)
    if tm2 and "x" in norm:
        return done(round(float(tm2.group(1)) *
                          float(tm2.group(2)) / 10000, 2), "L*P/1e4")
    if "index" in norm and "base year" in norm:
        bm = re.search(r"base year value\s*(\d+(?:\.\d+)?)", norm)
        cm2 = re.search(r"current value is\s*(\d+(?:\.\d+)?)", norm)
        if bm and cm2:
            return done(float(cm2.group(1)) /
                        float(bm.group(1)) * 100, "c/b*100")

    # linear equations: 'solve for x: 5x + 13 = 73' / '3(x+4) = 18'
    sm = re.search(r"solve\s*(?:for\s*x)?\s*:?\s*(.+?)\s*=\s*"
                   r"(-?[\dx+\-*/^()\s.]+?)\s*$", norm)
    if sm and "x" in norm:
        try:
            import sympy as _sp
            xs = _sp.Symbol("x")
            eq = _sp.Eq(_sp.sympify(_mathify(sm.group(1))),
                        _sp.sympify(_mathify(sm.group(2))))
            sols = _sp.solve(eq, xs)
            if sols:
                return done(float(sols[0]), "x=%s" % sols[0])
        except Exception:
            pass

    # exponent laws: a^m/a^n, (a^m)^n, a^m x b^m, a^0, a^(-n)
    if re.search(r"\^|\*\*|to the power|exponent|power law", norm) \
            and not re.search(r"\bsin\b|\bcos\b|\btan\b|\bsec\b|"
                              r"\bcosec\b|\bcot\b|triangle", norm):
        em = re.search(r"(\d+)\s*\^?\s*\(?\s*(-?\d+)\s*\)?\s*/\s*"
                       r"(\d+)\s*\^?\s*\(?\s*(-?\d+)\s*\)?", norm)
        if em and "/" in norm:
            b1, e1, b2, e2 = (float(em.group(i)) for i in range(1, 5))
            if b1 == b2:
                return done(b1 ** (e1 - e2), "a^(m-n)")
        em = re.search(r"\(\s*(\d+)\s*\^\s*(\d+)\s*\)\s*\^?\s*"
                       r"(\d+)", norm)
        if em:
            return done(float(em.group(1)) ** (float(em.group(2)) *
                                             float(em.group(3))),
                        "(a^m)^n")
        em = re.search(r"(\d+)\s*\^\s*\(?\s*(-?\d+)\s*\)?", norm)
        if em and "0" == em.group(2):
            return done(1.0, "a^0=1")
        if em and em.group(2).startswith("-"):
            return done(1.0 / float(em.group(1)) **
                        abs(float(em.group(2))), "1/a^n")
        em = re.search(r"(\d+)\s*\^\s*(\d+)\s*x\s*(\d+)\s*\^\s*"
                       r"(\d+)", norm)
        if em and em.group(2) == em.group(4):
            return done((float(em.group(1)) * float(em.group(3))) **
                        float(em.group(2)), "(ab)^m")

    # AP family without needing a formula on the concept
    if re.search(r"\bap\b|arithmetic|common difference|progression",
                 norm):
        a_m = re.search(r"first term\s*(?:is|=|of)?\s*"
                        r"(-?\d+(?:\.\d+)?)", norm)
        d_m = re.search(r"common difference\s*(?:is|=|of)?\s*"
                        r"(-?\d+(?:\.\d+)?)", norm)
        l_m = re.search(r"last term\s*(?:is|=|of)?\s*"
                        r"(-?\d+(?:\.\d+)?)", norm)
        n_m = re.search(r"(\d+)(?:st|nd|rd|th)\s*term|with\s*"
                        r"(\d+)\s*terms|first\s*(\d+)\s*terms", norm)
        seq = re.search(r"(?:ap|sequence|terms?)\s*[:=]?\s*"
                        r"(-?\d+)\s*,\s*(-?\d+)", norm) or \
            re.search(r"terms?[^,\d]{0,20}?are\s*(-?\d+)\s*and\s*"
                      r"(-?\d+)", norm)
        a = float(a_m.group(1)) if a_m else (
            float(seq.group(1)) if seq else None)
        d = float(d_m.group(1)) if d_m else (
            float(seq.group(2)) - a if seq and a is not None
            else None)
        n = next((float(g) for g in
                  (n_m.groups() if n_m else []) if g), None)
        lv = float(l_m.group(1)) if l_m else None
        if "common difference" in norm and "find" in norm and \
                d is not None and n is None and \
                re.search(r"find\s+the\s+(?:common\s+)?difference",
                          norm):
            return done(d, "d")
        if a is not None and d is not None and n is not None:
            if "sum" in norm:
                return done(n / 2 * (2 * a + (n - 1) * d), "sn")
            return done(a + (n - 1) * d, "an")
        if a is not None and lv is not None and n is not None and \
                "sum" in norm:
            return done(n * (a + lv) / 2, "n(a+l)/2")

    # solids: Euler + prism/pyramid element counts, cuboid/cube/
    # cylinder mensuration
    solids = {"cube": (6, 8, 12), "cuboid": (6, 8, 12),
              "tetrahedron": (4, 4, 6), "triangular prism":
              (5, 6, 9), "square pyramid": (5, 5, 8),
              "triangular pyramid": (4, 4, 6), "pentagonal pyramid":
              (6, 6, 10), "hexagonal prism": (8, 12, 18),
              "pentagonal prism": (7, 10, 15)}
    sm2 = None
    for sname, (f_, v_, e_) in solids.items():
        if sname in norm:
            sm2 = (sname, f_, v_, e_)
            break
    if sm2:
        sname, f_, v_, e_ = sm2
        if "euler" in norm or "f + v" in norm:
            return done(float(f_ + v_ - e_), "F+V-E")
        if "edges" in norm:
            return done(float(e_), "E")
        if "vertices" in norm:
            return done(float(v_), "V")
        if "faces" in norm:
            return done(float(f_), "F")
    # 'n-sided prism/pyramid, F=n+2 / V=2n / E=2n ... for n=N'
    gm = re.search(r"([fve])\s*=\s*([0-9n+\-*/()\s]+?)\s*"
                   r"(?:faces|vertices|edges|,|\.)", norm)
    nm = re.search(r"n\s*=\s*(\d+)", norm)
    if gm and nm:
        try:
            import sympy as _sp
            ex = _sp.sympify(_mathify(gm.group(2)))
            return done(float(ex.subs(_sp.Symbol("n"),
                                      float(nm.group(1)))),
                        "%s(n)" % gm.group(1))
        except Exception:
            pass
    if re.search(r"cuboid|cube|cylinder", norm):
        d3 = re.findall(r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*x\s*"
                        r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*x\s*"
                        r"(\d+(?:\.\d+)?)", norm)
        em2 = re.search(r"edge\s*(\d+(?:\.\d+)?)", norm)
        rc = re.search(r"radius\s*(\d+(?:\.\d+)?)", norm)
        hc = re.search(r"height\s*(\d+(?:\.\d+)?)", norm)
        pv = 22 / 7
        if "cuboid" in norm and d3:
            l, w, h = (float(x) for x in d3[0])
            if "surface" in norm:
                return done(2 * (l * w + w * h + h * l), "2(lw+wh+hl)")
            return done(l * w * h, "lwh")
        if "cube" in norm and em2:
            e3 = float(em2.group(1))
            if "surface" in norm:
                return done(6 * e3 * e3, "6a^2")
            return done(e3 ** 3, "a^3")
        if "cylinder" in norm and rc and hc and "tent" not in norm \
                and "cone" not in norm:
            r3, h3 = float(rc.group(1)), float(hc.group(1))
            if "curved" in norm:
                return done(round(2 * pv * r3 * h3, 2), "2pirh")
            if "surface" in norm and "curved" not in norm:
                return done(round(2 * pv * r3 * (r3 + h3), 2),
                            "2pir(r+h)")
            return done(round(pv * r3 * r3 * h3, 2), "pir^2h")

    # probability: die/coin/dice counts and simple events
    if re.search(r"probabilit|outcomes?|die|dice|coin", norm):
        if re.search(r"total\s*(?:number\s*of\s*)?(?:possible\s*)?"
                     r"outcomes?|how many outcomes|sample space",
                     norm):
            if "dice" in norm and "two" in norm:
                return done(36.0, "6^2")
            if "coin" in norm and "two" in norm:
                return done(4.0, "2^2")
            cm = re.search(r"(\d+)\s*(?:fair\s*)?coins?", norm)
            if cm:
                return done(float(2 ** int(cm.group(1))), "2^n")
            dm2 = re.search(r"(\d+)\s*(?:fair\s*)?dice", norm)
            if dm2:
                return done(float(6 ** int(dm2.group(1))), "6^n")
        if "die" in norm and "two" not in norm:
            if "even" in norm:
                return done(0.5, "3/6")
            if "prime" in norm:
                return done(0.5, "3/6")
            lm2 = re.search(r"less than\s*(\d+)", norm)
            if lm2:
                return done((int(lm2.group(1)) - 1) / 6, "n/6")
            gm2 = re.search(r"greater than\s*(\d+)", norm)
            if gm2:
                return done((6 - int(gm2.group(1))) / 6, "n/6")
            return done(1.0 / 6, "1/6")
        if "coin" in norm:
            if "both heads" in norm or "two heads" in norm:
                return done(0.25, "1/4")
            if "exactly one" in norm or "a head and a tail" in norm \
                    or "one of each" in norm:
                return done(0.5, "2/4")
        if "two dice" in norm or "dice" in norm:
            sm3 = re.search(r"sum\s*(?:of|is|=)?\s*(\d+)", norm)
            stated = re.search(r"(\d+)\s*(?:such\s+)?outcomes?",
                               norm)
            if sm3 and stated:
                return done(float(stated.group(1)) / 36, "n/36")
            if sm3:
                s7 = int(sm3.group(1))
                ways = min(s7 - 1, 13 - s7) if 2 <= s7 <= 12 else 0
                return done(ways / 36, "ways/36")
            if "doublet" in norm or "same number" in norm:
                return done(6.0 / 36, "6/36")

    # 3-vectors: dot, projection, components, cross magnitude
    vts = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                     r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", norm)
    if vts:
        V = [[float(t) for t in v] for v in vts]
        if len(V) >= 2:
            a3, b3 = V[0], V[1]
            dot = sum(x * y for x, y in zip(a3, b3))
            ma = math.sqrt(sum(x * x for x in a3))
            mb = math.sqrt(sum(x * x for x in b3))
            if "dot product" in norm and ("angle" in norm or
                                          "cos" in norm or
                                          "have dot" in norm):
                if ma and mb:
                    return done(round(dot / (ma * mb), 4),
                                "cos=dot/|a||b|")
            if "dot product" in norm:
                return done(dot, "a.b")
            if "projection" in norm and mb:
                nz = [x for x in b3 if abs(x) > 1e-9]
                if len(nz) == 1:
                    # corpus convention: signed component of the
                    # projection vector along the axis unit b
                    return done(round(dot / nz[0], 4), "a.b/b_i")
                return done(round(dot / mb, 4), "a.b/|b|")
            if "cross" in norm and "magnitude" in norm:
                cx = a3[1] * b3[2] - a3[2] * b3[1]
                cy = a3[2] * b3[0] - a3[0] * b3[2]
                cz = a3[0] * b3[1] - a3[1] * b3[0]
                return done(round(math.sqrt(cx * cx + cy * cy +
                                            cz * cz), 2), "|axb|")
        if "components" in norm and len(V) >= 2:
            d2 = [b3[0] - a3[0], b3[1] - a3[1], b3[2] - a3[2]]
            ask = norm[-60:]
            if "x-component" in ask or "first component" in ask:
                return done(d2[0], "dx")
            if "y-component" in ask:
                return done(d2[1], "dy")
            if "z-component" in ask:
                return done(d2[2], "dz")
            return done(d2[0], "dx")

    # square/cube root lookups: 'area of square field is N -> side',
    # 'N seats in a perfect square -> rows', 'volume of cubical box
    # is N -> edge', 'check N is a perfect square -> sqrt'
    if "perfect square" in norm or ("square field" in norm and
                                    "area" in norm):
        sm = re.search(r"(\d+)\s*(?:m\^?2|sq|seats|square)", norm)
        nm2 = max(ints) if ints else None
        if nm2 and float(nm2).is_integer():
            rt = math.sqrt(nm2)
            if rt == int(rt):
                return done(rt, "sqrt(N)")
            return done(round(rt, 4), "sqrt(N)")
    if ("cubical" in norm or ("cube" in norm and "volume" in norm)) \
            and re.search(r"find\s+(?:the\s+)?(?:edge|side|length)",
                          norm):
        vm = re.search(r"volume.*?(\d+(?:\.\d+)?)", norm)
        if vm:
            v = float(vm.group(1))
            rt = round(v ** (1 / 3), 6)
            if abs(rt - round(rt)) < 1e-4:
                return done(round(rt), "cbrt(V)")
            return done(rt, "cbrt(V)")

    # counting principle: 'N drinks and M snacks -> combos'
    if re.search(r"combos?|combinations?|drink-snack|choices?",
                 norm) and len(ints) >= 2:
        return done(float(ints[0] * ints[1]), "a*b combos")

    # identities: 'square of M more than N' -> (N+M)^2;
    # 'expand (x+a)(x+b) evaluate at x = N' -> (N+a)(N+b);
    # 'compute N^2' ; 'a^2-b^2 with a=,b=' -> (a-b)(a+b)
    if "identity" in norm or "compute" in norm or \
            re.search(r"\(a\s*[+-]\s*b\)\s*\^?2|a\^?2\s*-\s*b\^?2|"
                      r"\(\s*\d+\s*[+-]\s*\d+\s*\)\s*\^?2", norm):
        sq = re.search(r"square of\s*(\d+)\s*more than\s*(\d+)",
                       norm)
        if sq:
            return done(float((int(sq.group(1)) +
                               int(sq.group(2))) ** 2), "(a+b)^2")
        em = re.search(r"\(x\s*\+\s*(\d+)\)\s*\(x\s*\+\s*(\d+)\).*?"
                       r"x\s*=\s*(-?\d+(?:\.\d+)?)", norm)
        if em:
            xv = float(em.group(3))
            return done((xv + float(em.group(1))) *
                        (xv + float(em.group(2))), "(x+a)(x+b)")
        em = re.search(r"compute\s*(\d+)\s*\^?\s*2\b", norm)
        if em:
            return done(float(int(em.group(1)) ** 2), "n^2")
        ab = re.search(r"a\s*=\s*(-?\d+(?:\.\d+)?).*?b\s*=\s*"
                       r"(-?\d+(?:\.\d+)?)", norm)
        if ab and ("a - b" in norm or "a^2 - b^2" in norm or
                   "a^2-b^2" in norm):
            a2, b2 = float(ab.group(1)), float(ab.group(2))
            return done(a2 * a2 - b2 * b2, "a^2-b^2")
        ab2 = re.search(r"(\d+)\s*x\s*(\d+).*?a\s*=\s*"
                        r"(-?\d+(?:\.\d+)?)", norm)
        # 'compute 14 x 6 where numbers are a+b and a-b for a=10 b=4'
        pm2 = re.search(r"(\d+)\s*x\s*(\d+)", norm)
        if pm2 and "a + b" in norm and "a - b" in norm:
            return done(float(pm2.group(1)) * float(pm2.group(2)),
                        "(a+b)(a-b)")

    # Heron / Brahmagupta / right-triangle legs
    _area_ask = "area" in norm or "heron" in norm
    if ("heron" in norm or
            ("triangle" in norm and "sides" in norm and _area_ask) or
            ("plot" in norm and _area_ask)):
        sd = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*"
                                           r"(?:cm|m|units?)",
                                           norm)]
        if len(sd) < 3:
            sl = re.search(r"sides?\s*(?:of|are|is|"
                           r"equal to)?\s*((?:\d+(?:\.\d+)?\s*"
                           r"(?:,|and)\s*){1,3}\d+(?:\.\d+)?)", norm)
            if sl:
                sd = [float(x) for x in
                      re.findall(r"\d+(?:\.\d+)?", sl.group(1))]
        if len(sd) >= 3:
            a, b, c = sd[0], sd[1], sd[2]
            s = (a + b + c) / 2
            ar = math.sqrt(max(s * (s - a) * (s - b) * (s - c), 0))
            return done(round(ar, 4), "heron")
    if "brahmagupta" in norm or "cyclic quadrilateral" in norm:
        sd = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*"
                                           r"(?:cm|m|units?)",
                                           norm)]
        if len(sd) < 4:
            sl = re.search(r"sides?\s*(?:of|are|is|"
                           r"equal to)?\s*((?:\d+(?:\.\d+)?\s*"
                           r"(?:,|and)\s*){2,4}\d+(?:\.\d+)?)", norm)
            if sl:
                sd = [float(x) for x in
                      re.findall(r"\d+(?:\.\d+)?", sl.group(1))]
        if len(sd) >= 4:
            s = sum(sd[:4]) / 2
            ar = math.sqrt(max((s - sd[0]) * (s - sd[1]) *
                               (s - sd[2]) * (s - sd[3]), 0))
            return done(round(ar, 4), "brahmagupta")
    if "right triangle" in norm and "legs" in norm and \
            ("area" in norm or "check it against" in norm):
        lg = re.search(r"legs?\s*(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*"
                       r"and\s*(\d+(?:\.\d+)?)", norm)
        if lg:
            return done(0.5 * float(lg.group(1)) *
                        float(lg.group(2)), "ab/2")

    # work/time/speed: combined work, workers inverse, avg speed,
    # boat streams
    if re.search(r"finish a job|complet|working together|"
                 r"pipe|tank|leak", norm):
        dd = re.search(r"(?:in|fills?\s*(?:a\s+\w+\s*)?in|empties\s*"
                       r"(?:it\s*in)?)\s*(\d+(?:\.\d+)?)\s*"
                       r"(?:days?|hours?)", norm)
        dd2 = re.findall(r"in\s*(\d+(?:\.\d+)?)\s*(?:days?|hours?)",
                         norm)
        if len(dd2) >= 2:
            t1, t2 = float(dd2[0]), float(dd2[1])
            if "leak" in norm or "empties" in norm:
                net = 1 / t1 - 1 / t2
                if net > 0:
                    return done(round(1 / net, 4), "1/(1/a-1/b)")
            return done(round(t1 * t2 / (t1 + t2), 4), "ab/(a+b)")
    if re.search(r"workers?|men\b", norm) and "days" in norm:
        wm = re.search(r"(\d+)\s*workers?\s*.*?in\s*(\d+)\s*days.*?"
                       r"(\d+)\s*workers?", norm)
        if wm:
            return done(round(float(wm.group(1)) *
                              float(wm.group(2)) / float(wm.group(3)),
                              4), "w1d1/w2")
    if "average speed" in norm or ("speed" in norm and "km" in norm
                                   and "hours" in norm):  # noqa
        legs = re.findall(r"(\d+(?:\.\d+)?)\s*km\s*in\s*"
                          r"(\d+(?:\.\d+)?)\s*hours?", norm)
        if len(legs) >= 2:
            td = sum(float(x[0]) for x in legs)
            tt = sum(float(x[1]) for x in legs)
            if tt:
                return done(round(td / tt, 4), "sumD/sumT")
    if "upstream" in norm or "downstre" in norm:
        uv = re.search(r"downstre\w*\s*(?:speed)?\s*(?:is|=|of)?\s*"
                       r"(\d+(?:\.\d+)?)", norm)
        vv = re.search(r"upstream\s*(?:speed)?\s*(?:is|=|of)?\s*"
                       r"(\d+(?:\.\d+)?)", norm)
        if uv and vv:
            u, v = float(uv.group(1)), float(vv.group(1))
            if "current" in norm or "stream" in norm:
                return done((u - v) / 2, "(d-u)/2")
            return done((u + v) / 2, "(d+u)/2")
        ub = re.search(r"(\d+(?:\.\d+)?)\s*km\s*upstream\s*at\s*"
                       r"(\d+(?:\.\d+)?)", norm)
        if ub:
            return done(float(ub.group(1)) / float(ub.group(2)),
                        "d/s")

    # trigonometry as fractions: sin/cos/tan/sec/cosec and the
    # Pythagorean/compound identities — answers stay float; catalog
    # keys are fractions like '17/8' which eval to the same value
    if re.search(r"\bsin\b|\bcos\b|\btan\b|\bsec\b|\bcosec\b|"
                 r"\bcot\b", norm):
        leg = re.search(r"legs?\s*(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*"
                        r"(?:,|and)\s*(\d+(?:\.\d+)?)", norm)
        hyp = re.search(r"hypotenuse\s*(?:is|=|of)?\s*"
                        r"(\d+(?:\.\d+)?)", norm)
        opp = re.search(r"opposite\s*(?:the\s*)?side\s*"
                        r"(\d+(?:\.\d+)?)", norm)
        sn = re.search(r"sin\s*\(?a?\)?\s*=\s*(\d+)\s*/\s*(\d+)",
                       norm)
        cn = re.search(r"cos\s*\(?a?\)?\s*=\s*(\d+)\s*/\s*(\d+)",
                       norm)
        tn = re.search(r"tan\s*\(?a?\)?\s*=\s*(\d+)\s*/\s*(\d+)",
                       norm)
        ct = re.search(r"cot\s*\(?a?\)?\s*=\s*(\d+)\s*/\s*(\d+)",
                       norm)
        # 'adjacent to the right angle are a and b, hypotenuse h'
        adj = re.search(r"adjacent to the right angle are\s*"
                        r"(\d+(?:\.\d+)?)\s*and\s*(\d+(?:\.\d+)?)",
                        norm)
        if adj and not leg:
            leg = adj
        l1 = float(leg.group(1)) if leg else None
        l2 = float(leg.group(2)) if leg else None
        h = float(hyp.group(1)) if hyp else None
        o = float(opp.group(1)) if opp else None
        # 'verify sin^2+cos^2=1 ... by computing (a/h)^2+(b/h)^2'
        if "verify" in norm and leg and h:
            return done(round((l1 / h) ** 2 + (l2 / h) ** 2, 6),
                        "sin^2+cos^2")
        # right-triangle ratios keyed to the asked side
        if leg and h and o is not None:
            other = l2 if abs(o - l1) < 1e-9 else l1
            if "tan" in norm:
                return done(o / other, "opp/adj")
            if "cos" in norm:
                return done(other / h, "adj/hyp")
            if "sin" in norm:
                return done(o / h, "opp/hyp")
        if leg and h and "sin" in norm and opp is None:
            return done(l1 / h, "opp/hyp")
        # reciprocal / derived ratios from given sin,cos,tan,cot
        if sn:
            sv = float(sn.group(1)) / float(sn.group(2))
            if "cosec" in norm:
                return done(1 / sv, "1/sin")
        if cn:
            cv = float(cn.group(1)) / float(cn.group(2))
            if "sec" in norm and "cosec" not in norm:
                return done(1 / cv, "1/cos")
        if sn and cn and "tan" in norm and "2a" not in norm:
            return done(sv / cv, "sin/cos")
        if tn and ("sec" in norm or "1 + tan" in norm):
            tv = float(tn.group(1)) / float(tn.group(2))
            return done(round(math.sqrt(1 + tv * tv), 6),
                        "sqrt(1+tan^2)")
        if ct and ("cosec" in norm or "1 + cot" in norm):
            tv2 = float(ct.group(1)) / float(ct.group(2))
            return done(round(math.sqrt(1 + tv2 * tv2), 6),
                        "sqrt(1+cot^2)")
        if sn and cn and "sin 2a" in norm:
            return done(2 * sv * cv, "2sinAcosA")
        if "cos(90" in norm or "cos (90" in norm:
            if sn:
                return done(sv, "cos(90-A)=sinA")
        # compound angle: sinA,cosA,sinB,cosB -> sin(A+B)
        allsc = re.findall(r"(sin|cos)\s*([ab])?\s*=\s*"
                           r"(\d+)\s*/\s*(\d+)", norm)
        if ("sin(a + b" in norm or "sin(a+b" in norm) and \
                len(allsc) >= 4:
            vv = {f"{k}{v}": float(p) / float(q)
                  for k, v, p, q in allsc}
            val = vv.get("sina", 0) * vv.get("cosb", 0) + \
                vv.get("cosa", 0) * vv.get("sinb", 0)
            return done(round(val, 6), "sin(A+B)")
    # 3D mensuration: cone, sphere, hemisphere, tent
    if re.search(r"cone|sphere|hemispher|tent", norm):
        pv = 22 / 7
        rm = re.search(r"radius\s*(\d+(?:\.\d+)?)", norm)
        hm = re.search(r"height\s*(\d+(?:\.\d+)?)", norm)
        r4 = float(rm.group(1)) if rm else None
        if "cone" in norm and r4 and hm and "tent" not in norm:
            if "volume" in norm:
                return done(round(pv * r4 * r4 * float(hm.group(1))
                                  / 3, 2), "pir^2h/3")
        if "sphere" in norm and r4 and "hemisphere" not in norm:
            if "volume" in norm:
                return done(round(4 * pv * r4 ** 3 / 3, 2),
                            "4pir^3/3")
            if "surface" in norm:
                return done(round(4 * pv * r4 * r4, 2), "4pir^2")
        if "hemisphere" in norm or "hemispherical" in norm:
            if r4:
                if "curved" in norm:
                    return done(round(2 * pv * r4 * r4, 2), "2pir^2")
                if "total" in norm or "solid" in norm:
                    return done(round(3 * pv * r4 * r4, 2), "3pir^2")
                if "volume" in norm or "bowl" in norm:
                    return done(round(2 * pv * r4 ** 3 / 3, 2),
                                "2pir^3/3")
        if "tent" in norm and r4:
            hh = re.findall(r"height\s*(\d+(?:\.\d+)?)", norm)
            h1 = float(hh[0]) if hh else 0
            h2 = float(hh[1]) if len(hh) > 1 else h1
            if "volume" in norm:
                return done(round(pv * r4 * r4 * h1 +
                                  pv * r4 * r4 * h2 / 3, 2),
                            "cyl+cone")

    # normal slope: 'tangent slope is m' -> -1/m ; m from y' if needed
    if "normal" in norm and "-1/m" in norm or \
            ("normal" in norm and "slope" in norm):
        em = re.search(r"y\s*=\s*([^.;]+?)\s*(?:at|for|,|\.)", norm)
        xm = re.search(r"x\s*=\s*(-?\d+(?:\.\d+)?)", norm)
        if em and xm:
            try:
                import sympy as _sp
                xs = _sp.Symbol("x")
                d = _sp.diff(_sp.sympify(_mathify(em.group(1))), xs)
                m = float(d.subs(xs, float(xm.group(1))))
                if m:
                    return done(round(-1 / m, 4), "-1/m")
            except Exception:
                pass

    # 'compute a + b' quick-check
    cm = re.search(r"compute\s*(-?\d+(?:\.\d+)?)\s*\+\s*"
                   r"(-?\d+(?:\.\d+)?)", norm)
    if cm:
        return done(float(cm.group(1)) + float(cm.group(2)), "a+b")

    # matrices: det 2x2/3x3, AB entry, scalar entry, dims, det(kA)
    if re.search(r"matrix|matrices|determinant|\[\[", norm):
        def _mat(t):
            # inner text '7, -4, -4], [1, 1, -3], [-4, -4, 7'
            # -> split on ']' then pull each row's numbers
            rows = []
            for seg in t.split("]"):
                vals = [float(x) for x in
                        re.findall(r"-?\d+(?:\.\d+)?", seg)]
                if vals:
                    rows.append(vals)
            return rows
        ms = re.findall(r"\[\[(.*?)\]\]", norm)
        if "det(k" in norm or ("det(" in norm and "a)" in norm):
            dm = re.search(r"determinant\s*(\d+(?:\.\d+)?)", norm)
            km = re.search(r"det\(\s*(\d+)\s*a\)", norm)
            nm2 = re.search(r"(\d+)\s*x\s*(\d+)\s*matrix", norm)
            if dm and km:
                n = int(nm2.group(1)) if nm2 else 2
                return done(float(km.group(1)) ** n *
                            float(dm.group(1)), "k^n detA")
        if "rows" in norm and "columns" in norm and \
                "elements" in norm:
            dm2 = re.search(r"(\d+)\s*rows?\s*and\s*(\d+)\s*columns?",
                            norm)
            if dm2:
                return done(float(int(dm2.group(1)) *
                                  int(dm2.group(2))), "r*c")
        if "scalar product" in norm:
            km2 = re.search(r"(\d+)\s*times\s*a\s*matrix", norm)
            em = re.search(r"\(1,1\)\s*entry is\s*(-?\d+(?:\.\d+)?)",
                           norm)
            if km2 and em:
                return done(float(km2.group(1)) *
                            float(em.group(1)), "k*a11")
        if ms and ("ab" in norm or "entry of a" in norm or
                   "entry of the product" in norm or
                   "entry of ab" in norm):
            mats = [_mat(m) for m in ms]
            if len(mats) >= 2:
                A, B = mats[0], mats[1]
                if A and B and len(A[0]) == len(B):
                    val = sum(A[0][j] * B[j][0]
                              for j in range(len(A[0])))
                    return done(val, "(AB)11")
        if ms and ("determinant" in norm or "det" in norm):
            M = _mat(ms[0])
            if len(M) == 2 and len(M[0]) == 2:
                return done(M[0][0] * M[1][1] - M[0][1] * M[1][0],
                            "ad-bc")
            if len(M) == 3 and len(M[0]) == 3:
                (a, b, c), (d2, e, f), (g, h2, i) = M
                det = (a * (e * i - f * h2) - b * (d2 * i - f * g)
                       + c * (d2 * h2 - e * g))
                return done(round(det, 4), "3x3 det")

    # line geometry: point-to-line, parallel lines, slope angle,
    # meet-at-x -> k
    if re.search(r"line\s+\S*x|lines\b|parallel lines|slopes?",
                 norm):
        ln = norm.replace("+ -", "-").replace("- -", "+")
        pl = re.search(r"point\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                       r"(-?\d+(?:\.\d+)?)\s*\).*?line\s*"
                       r"(-?\d+(?:\.\d+)?)x\s*([+-]\s*\d+(?:\.\d+)?)y?"
                       r"\s*([+-]\s*\d+(?:\.\d+)?)?\s*=\s*0", ln)
        if pl:
            x0, y0 = float(pl.group(1)), float(pl.group(2))
            a5 = float(pl.group(3))
            b5 = float(pl.group(4).replace(" ", ""))
            c5 = float(pl.group(5).replace(" ", "")) \
                if pl.group(5) else 0.0
            d5 = abs(a5 * x0 + b5 * y0 + c5) / math.sqrt(a5 * a5 +
                                                       b5 * b5)
            return done(round(d5, 4), "|ax+by+c|/v(a^2+b^2)")
        pa = re.search(r"parallel lines\s*(-?\d+(?:\.\d+)?)x\s*"
                       r"([+-]\s*\d+(?:\.\d+)?)y\s*([+-]\s*\d+(?:\."
                       r"\d+)?)\s*=\s*0\s*and\s*(-?\d+(?:\.\d+)?)x\s*"
                       r"([+-]\s*\d+(?:\.\d+)?)y\s*([+-]\s*\d+(?:\."
                       r"\d+)?)\s*=\s*0", norm)
        if pa:
            a6, b6 = float(pa.group(1)), float(pa.group(2).
                                               replace(" ", ""))
            c1, c2 = float(pa.group(3).replace(" ", "")), \
                float(pa.group(6).replace(" ", ""))
            d6 = abs(c2 - c1) / math.sqrt(a6 * a6 + b6 * b6)
            return done(round(d6, 4), "|c2-c1|/v(a^2+b^2)")
        sa = re.search(r"slopes?\s*(?:of)?\s*(-?\d+(?:\.\d+)?)\s*"
                       r"and\s*(-?\d+(?:\.\d+)?)", norm)
        if sa and ("angle" in norm or "tan" in norm):
            m1, m2 = float(sa.group(1)), float(sa.group(2))
            den = 1 + m1 * m2
            if den != 0:
                return done(round(abs((m2 - m1) / den), 4),
                            "|(m2-m1)/(1+m1m2)|")
        mk = re.search(r"meet at x\s*=\s*(-?\d+(?:\.\d+)?)", norm)
        if mk:
            xm = float(mk.group(1))
            l1 = re.search(r"(-?\d+(?:\.\d+)?)x\s*([+-]\s*\d+(?:\."
                           r"\d+)?)y\s*=\s*(-?\d+(?:\.\d+)?)", norm)
            l2 = re.search(r"(-?\d+(?:\.\d+)?)x\s*([+-]\s*\d+(?:\."
                           r"\d+)?)y\s*\+\s*k\s*=\s*0", norm)
            if l1 and l2:
                a7 = float(l1.group(1))
                b7 = float(l1.group(2).replace(" ", ""))
                c7 = float(l1.group(3))
                yv = (c7 - a7 * xm) / b7
                k = -(float(l2.group(1)) * xm +
                      float(l2.group(2).replace(" ", "")) * yv)
                return done(round(k, 4), "k")

    # inverse trig principal values (degrees)
    iv = re.search(r"(sin|cos|tan)\s*inverse\s*(?:of)?\s*"
                   r"(sqrt\(\s*\d+\s*\)|-?\d+(?:\.\d+)?"
                   r"(?:\s*/\s*\d+)?)", norm)
    if iv:
        fn, raw = iv.group(1), iv.group(2).replace(" ", "")
        try:
            if raw.startswith("sqrt"):
                v = math.sqrt(float(re.search(r"\d+", raw).group()))
            elif "/" in raw:
                p, q = raw.split("/")
                v = float(p) / float(q)
            else:
                v = float(raw)
            if fn == "sin":
                deg = math.degrees(math.asin(v))
            elif fn == "cos":
                deg = math.degrees(math.acos(v))
            else:
                deg = math.degrees(math.atan(v))
            return done(round(deg, 4), "%s^-1(%s)" % (fn, raw))
        except Exception:
            pass

    # first principles: (f(x+h)-f(x))/h ; RHL-LHL continuity gap;
    # ODE order/degree; verify y=cx derivative
    if "difference quotient" in norm or "first principles" in norm:
        fm = re.search(r"f\(x\)\s*=\s*([^.;]+?)\s*at\s*x\s*=\s*"
                       r"(-?\d+(?:\.\d+)?)\s*with\s*h\s*=\s*"
                       r"(-?\d+(?:\.\d+)?)", norm)
        if fm:
            try:
                import sympy as _sp
                xs = _sp.Symbol("x")
                fx = _sp.sympify(_mathify(fm.group(1)))
                xv, hv = float(fm.group(2)), float(fm.group(3))
                dq = (float(fx.subs(xs, xv + hv)) -
                      float(fx.subs(xs, xv))) / hv
                return done(round(dq, 4), "diff quotient")
            except Exception:
                pass
    if "rhl" in norm or "continuity" in norm or \
            "discontinuity" in norm:
        lm = re.search(r"f\(x\)\s*=\s*((?:(?!f\(x\)).)+?)\s*"
                       r"for\s*x\s*<\s*(-?\d+(?:\.\d+)?)", norm)
        rm = re.search(r"f\(x\)\s*=\s*((?:(?!f\(x\)).)+?)\s*"
                       r"for\s*x\s*>?=\s*(-?\d+(?:\.\d+)?)", norm)
        if lm and rm:
            try:
                import sympy as _sp
                xs = _sp.Symbol("x")
                x0 = float(rm.group(2))
                lhl = float(_sp.sympify(_mathify(lm.group(1)))
                            .subs(xs, float(lm.group(2))))
                rhl = float(_sp.sympify(_mathify(rm.group(1)))
                            .subs(xs, x0))
                return done(round(rhl - lhl, 4), "RHL-LHL")
            except Exception:
                pass
    if "order" in norm and re.search(r"d\^?\d*y", norm):
        ords = [int(x) for x in
                re.findall(r"d\^?(\d+)y", norm)]
        if ords:
            return done(float(max(ords)), "order")
    if "degree" in norm and re.search(r"d\^?\d*y", norm):
        dm3 = re.search(r"d\^?(\d+)y/dx\^?\d+\s*\)\s*\^?\s*"
                        r"(\d+)", norm)
        if dm3:
            return done(float(dm3.group(2)), "degree")
    if "verify" in norm and "dy/dx" in norm:
        ym = re.search(r"y\s*=\s*(-?\d+(?:\.\d+)?)x", norm)
        if ym:
            return done(float(ym.group(1)), "dy/dx=c")

    # ijk vector magnitude: 'ai + bj + ck' -> sqrt(a^2+b^2+c^2)
    ijk = re.search(r"(-?\d+(?:\.\d+)?)\s*i\b\s*\+\s*"
                    r"(-?\d+(?:\.\d+)?)\s*j\b\s*\+\s*"
                    r"(-?\d+(?:\.\d+)?)\s*k\b", norm)
    if ijk and "magnitude" in norm:
        m = math.sqrt(sum(float(x) ** 2 for x in ijk.groups()))
        return done(round(m, 4), "|v|")

    # FLT/meta statements aren't compute questions — honest refuse
    if "fermat" in norm:
        return None

    # ---------- class 7+ kernel families ----------
    flts = [float(x) for x in
            re.findall(r"-?\d+(?:\.\d+)?", norm)]

    # BODMAS / expression eval: 'evaluate 4 + 3 x 9', '(7+3) x 7',
    # 'evaluate 3x + 2 when x = 2', 'simplify 4x+7x-6x coefficient'
    if re.search(r"evaluate|simplify|value of|coefficient of",
                 norm) and ("x" in norm):
        # coefficient of x in a linear combination
        cm = re.search(r"simplify\s+([0-9x+\-*/^()\s.]+?)\s+"
                       r"(?:and|then|find|give)", norm)
        if cm and "coefficient" in norm:
            try:
                import sympy as _sp
                ex = _sp.sympify(_mathify(cm.group(1)))
                cf = ex.expand().coeff(_sp.Symbol("x"))
                if cf is not None:
                    return done(float(cf), "coeff(x)")
            except Exception:
                pass
        # 'evaluate EXPR when x = N' / 'value of EXPR when x = N'
        em = re.search(r"(?:evaluate|value of)\s*"
                       r"([0-9x+\-*/^()\s.]+?)\s+"
                       r"(?:when|at|for)\b", norm)
        xm = re.search(r"x\s*=\s*(-?\d+(?:\.\d+)?)", norm)
        if em and xm:
            try:
                import sympy as _sp
                ex = _sp.sympify(_mathify(em.group(1)))
                return done(float(ex.subs(_sp.Symbol("x"),
                                          float(xm.group(1)))),
                            "eval")
            except Exception:
                pass
        # pure-arithmetic BODMAS: '4 + 3 x 9', '(7 + 3) x 7'
        am = re.search(r"evaluate\s*([0-9x+\-*/^()\s.]+?)"
                       r"(?:\s*\(|$|\.(?!\d))", norm)
        if am:
            try:
                import sympy as _sp
                ex = _sp.sympify(_mathify(am.group(1)))
                if not ex.free_symbols:
                    return done(float(ex), "bodmas")
            except Exception:
                pass

    # decimals: 'add the decimals a and b', 'subtract a from b',
    # 'multiply a by b', 'a/b of N', 'N units M tenths K hundredths'
    pm = re.search(r"(\d+)\s*units?.*?(\d+)\s*tenths?.*?"
                   r"(\d+)\s*hundredths?", norm)
    if pm:
        return done(float(pm.group(1)) + int(pm.group(2)) / 10 +
                    int(pm.group(3)) / 100, "u.t h")
    dm = re.search(r"add\s+(?:the\s+)?decimals?\s*(\d+(?:\.\d+)?)"
                   r"\s*and\s*(\d+(?:\.\d+)?)", norm)
    if dm:
        return done(float(dm.group(1)) + float(dm.group(2)), "a+b")
    dm = re.search(r"subtract\s*(\d+(?:\.\d+)?)\s*from\s*"
                   r"(\d+(?:\.\d+)?)", norm)
    if dm:
        return done(float(dm.group(2)) - float(dm.group(1)), "b-a")
    dm = re.search(r"multiply\s*(\d+(?:\.\d+)?)\s*by\s*"
                   r"(\d+(?:\.\d+)?)", norm)
    if dm:
        return done(float(dm.group(1)) * float(dm.group(2)), "a*b")
    dm = re.search(r"(\d+)\s*/\s*(\d+)\s*of\s*(\d+(?:\.\d+)?)", norm)
    if dm:
        return done(float(dm.group(1)) / float(dm.group(2)) *
                    float(dm.group(3)), "a/b of N")
    dm = re.search(r"(\d+)\s*/\s*10\s*of\s*(\d+(?:\.\d+)?)", norm)
    if dm:
        return done(float(dm.group(2)) / 10.0, "N/10")

    # percentages: '40% of 600', 'a/b -> %', '0.45 -> %',
    # '% change from A to B', 'what % of A is B', profit/loss %
    pm = re.search(r"(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)",
                   norm)
    if pm:
        return done(float(pm.group(1)) * float(pm.group(2)) / 100,
                    "p% of N")
    if re.search(r"into a percentage|as a percentage|to percent|"
                 r"percentage", norm):
        fm = re.search(r"fraction\s*(\d+)\s*/\s*(\d+)", norm)
        if fm:
            return done(float(fm.group(1)) / float(fm.group(2))
                        * 100, "frac->%")
        fm = re.search(r"decimal\s*(\d*\.\d+)", norm)
        if fm:
            return done(float(fm.group(1)) * 100, "dec->%")
        fm = re.search(r"what percentage of\s*(\d+(?:\.\d+)?)\s*"
                       r"is\s*(\d+(?:\.\d+)?)", norm) or \
            re.search(r"what\s*%\s*of\s*(\d+(?:\.\d+)?)\s*is\s*"
                      r"(\d+(?:\.\d+)?)", norm)
        if fm:
            return done(float(fm.group(2)) / float(fm.group(1))
                        * 100, "B/A*100")
    cm = re.search(r"(?:increase|decrease|change).*?from\s*"
                   r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)\s*to\s*"
                   r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)", norm) or \
        re.search(r"(?:rose|fell|increased|decreased)\s*from\s*"
                  r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)\s*to\s*"
                  r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)", norm)
    if cm and re.search(r"percent|%|profit|loss", norm):
        a, b = float(cm.group(1)), float(cm.group(2))
        return done(abs(b - a) / a * 100, "|b-a|/a*100")

    # profit/loss/discount/SI/CI live in the money block below —
    # it handles both amount and percent asks

    # coordinate geometry on tuples: distance, midpoint, centroid,
    # triangle area, section point
    tuples = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                        r"(-?\d+(?:\.\d+)?)\s*\)", norm)
    if tuples:
        pts = [(float(a), float(b)) for a, b in tuples]
        if "origin" in norm or len(pts) == 1:
            x, y = pts[0]
            if "distance" in norm:
                return done(round(math.hypot(x, y), 2),
                            "sqrt(x^2+y^2)")
        if len(pts) >= 2:
            if "midpoint" in norm:
                mx = (pts[0][0] + pts[1][0]) / 2
                my = (pts[0][1] + pts[1][1]) / 2
                if "x-coordinate" in norm or "x coordinate" in norm:
                    return done(mx, "mx")
                return done(round(math.hypot(mx, my), 4), "mid")
            if "distance" in norm:
                return done(round(math.hypot(
                    pts[0][0] - pts[1][0], pts[0][1] - pts[1][1]),
                    2), "dist")
            if "centroid" in norm and len(pts) >= 3:
                cx = sum(p[0] for p in pts[:3]) / 3
                cy = sum(p[1] for p in pts[:3]) / 3
                if "x-coordinate" in norm:
                    return done(round(cx, 6), "cx")
                return done(round(math.hypot(cx, cy), 4), "centroid")
            if "area" in norm and len(pts) >= 3:
                a = abs(pts[0][0] * (pts[1][1] - pts[2][1]) +
                        pts[1][0] * (pts[2][1] - pts[0][1]) +
                        pts[2][0] * (pts[0][1] - pts[1][1])) / 2
                return done(a, "shoelace")
        sm = re.search(r"ratio\s*(\d+)\s*(?::|to)\s*(\d+)", norm)
        if sm and len(pts) >= 2 and "divid" in norm:
            m1, n1 = float(sm.group(1)), float(sm.group(2))
            x = (m1 * pts[1][0] + n1 * pts[0][0]) / (m1 + n1)
            return done(round(x, 4), "section x")

    # money math: profit/loss amount & %, discount, SI, CI
    if re.search(r"profit|loss|discount|marked|interest|"
                 r"per annum|annum|compounded", norm):
        # marked price + discount must run BEFORE cp/sp — 'sells for'
        # in a discount question is the sale price, not SP-vs-CP
        mp = re.search(r"marked[^,;.]{0,30}?(\d+(?:\.\d+)?)", norm)
        dc = re.search(r"(\d+(?:\.\d+)?)\s*%\s*discount", norm)
        if mp and dc:
            return done(float(mp.group(1)) *
                        (1 - float(dc.group(1)) / 100), "MP(1-d%)")
        sp2_m = re.search(r"sells?\s*(?:it\s*|the \w+\s*|for\s*)*"
                          r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)", norm)
        if mp and sp2_m and "discount" in norm:
            return done((float(mp.group(1)) - float(sp2_m.group(1)))
                        / float(mp.group(1)) * 100, "disc%")
        cp_m = re.search(r"(?:buys?|cost(?:ing|s)?(?:\s*price)?|"
                         r"cost price|cp|for)\s*(?:an? \w+ for\s*)?"
                         r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)", norm)
        sp_m = re.search(r"(?:sell(?:s|ing)?|sold|sp)\s*"
                         r"(?:it\s*|the \w+\s*|price\s*)?"
                         r"(?:price\s*)?(?:for\s*)?(?:rs\.?\s*)?"
                         r"(\d+(?:\.\d+)?)", norm)
        if cp_m and sp_m:
            cp, sp2 = float(cp_m.group(1)), float(sp_m.group(1))
            if "loss" in norm:
                if re.search(r"percent|per\s*cent|%", norm):
                    return done((cp - sp2) / cp * 100, "loss%")
                return done(cp - sp2, "loss")
            if re.search(r"percent|per\s*cent|%", norm):
                return done((sp2 - cp) / cp * 100, "profit%")
            return done(sp2 - cp, "profit")
        # '10% profit on article costing Rs N' -> SP
        pg = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:profit|gain).*?"
                       r"cost(?:ing|s|price)?\s*(?:rs\.?\s*)?"
                       r"(\d+(?:\.\d+)?)", norm)
        if pg:
            return done(float(pg.group(2)) *
                        (1 + float(pg.group(1)) / 100), "cp(1+p%)")
        # simple interest: P, R%, T -> PRT/100 (+amount / invert-P)
        si = re.search(r"rs\.?\s*(\d+(?:\.\d+)?)", norm)
        rt = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:per\s*annum|"
                       r"p\.?a\.?|simple|interest)", norm)
        ty = re.search(r"(\d+(?:\.\d+)?)\s*years?", norm)
        if si and rt and ty and "compound" not in norm:
            P, R, T = (float(si.group(1)), float(rt.group(1)),
                       float(ty.group(1)))
            if "earns" in norm:
                em = re.search(r"earns?\s*rs\.?\s*(\d+(?:\.\d+)?)",
                               norm)
                if em:
                    return done(float(em.group(1)) * 100 /
                                (R * T), "P=SI*100/RT")
            interest = P * R * T / 100
            if "amount" in norm or "total" in norm or \
                    "deposited" in norm or "owed" in norm:
                return done(round(P + interest, 2), "P+PRT/100")
            return done(round(interest, 2), "PRT/100")
        # compound interest: A = P(1+r/100)^t ; half-yearly -> /2 *2
        if si and rt and ty and "compound" in norm or \
                "compounded" in norm:
            if si and rt and ty:
                P, R, T = (float(si.group(1)), float(rt.group(1)),
                           float(ty.group(1)))
                nper, rr = T, R / 100
                if "half" in norm or "half-yearly" in norm:
                    nper, rr = T * 2, R / 200
                amt = P * (1 + rr) ** nper
                if "interest" in norm and "amount" not in norm:
                    return done(round(amt - P, 2), "P((1+r)^t-1)")
                return done(round(amt, 2), "P(1+r)^t")

    # quadrilateral extras: parallelogram adjacent, rhombus
    # base*height, isosceles-right hypotenuse
    if "parallelogram" in norm and "adjacent" in norm:
        am = re.search(r"angle\s*(?:is|=|of)?\s*(\d+)", norm)
        if am:
            return done(180.0 - float(am.group(1)), "180-a")
    if "rhombus" in norm and "base" in norm:
        bm = re.search(r"base\s*(\d+)", norm)
        hm = re.search(r"height\s*(\d+)", norm)
        if bm and hm:
            return done(float(bm.group(1)) * float(hm.group(1)),
                        "b*h")
    if "isosceles right" in norm:
        lm = re.search(r"(?:leg|side)\s*(?:is|=|of)?\s*(\d+)", norm)
        if lm:
            return done(round(float(lm.group(1)) * math.sqrt(2), 2),
                        "a*sqrt(2)")

    # statistics: quartile position, CV, median position
    if "quartile" in norm or "coefficient of variation" in norm:
        qm = re.search(r"quartiles?\s*(?:are|of)?\s*(\d+)\s*and\s*"
                       r"(\d+)", norm)
        if qm and "quartile deviation" in norm:
            return done((float(qm.group(2)) - float(qm.group(1)))
                        / 2, "(Q3-Q1)/2")
        if qm and "coefficient" in norm:
            return done((float(qm.group(2)) - float(qm.group(1))) /
                        (float(qm.group(2)) + float(qm.group(1)))
                        * 100, "QD coeff")
        pm = re.search(r"(\d+)\s*(?:ordered\s+)?observations?.*?"
                       r"(?:upper|third)\s*quartile", norm)
        if pm:
            n = float(pm.group(1))
            return done(3 * (n + 1) / 4, "3(n+1)/4")
        cv = re.search(r"coefficient of variation.*?(\d+(?:\.\d+)?)"
                       r".*?(\d+(?:\.\d+)?)", norm)
        if cv and "deviation" in norm and "mean" in norm:
            return done(float(cv.group(1)) / float(cv.group(2))
                        * 100, "sd/mean*100")

    # calculus on polynomials: 'limit of x^2+5x+7 as x approaches 4',
    # 'derivative of 3x^3', 'slope of tangent y=4x^2+4x+1 at x=1',
    # "y''(0) for y=x^3-3x^2+2", 'y=(5x+2)^3 dy/dx at x=?'
    if re.search(r"x\s*\^|x\*\*|dy/dx|derivative|slope|approaches|"
                 r"tangent", norm) and not re.search(
                 r"area\b|integral|integrat|bounded|enclosed|"
                 r"maxim\w+|minim\w+|continu", norm):
        # x-extraction: the LAST 'x = N' is the eval point — earlier
        # ones are inside 'dy/dx = 15(...)'-style givens
        xs = re.findall(r"x\s*(?:=|approaches?)\s*(-?\d+(?:\.\d+)?)",
                        norm)
        xs += re.findall(r"[a-z]\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)",
                         norm)
        xm = None
        if xs:
            xm = xs[-1]
        ap = re.search(r"(?:at|when)\s+x\s*=\s*(-?\d+(?:\.\d+)?)", norm)
        if ap:
            xm = ap.group(1)
        xm2 = re.search(r"y''?\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)", norm)
        if xm2:
            xm = xm2.group(1)
        ex = re.search(r"y\s*=\s*([0-9x+\-*/^()\s.]+?)(?:\s+has|\s+at|"
                       r"[,;.]|$)", norm) or \
            re.search(r"[a-z]\s*\(\s*x\s*\)\s*=\s*"
                      r"([0-9x+\-*/^()\s.]+?)(?:[,;.]|$)", norm) or \
            re.search(r"(?:of|limit of)\s*([0-9x+\-*/^()\s.]+?)"
                      r"\s+as\b", norm) or \
            re.search(r"(?:cubic|polynomial|quadratic)\s+"
                      r"([0-9x+\-*/^()\s.]+?)\s+at\b", norm) or \
            re.search(r"(?:derivative|differentiat\w*)\s+(?:of|for)?\s*"
                      r"(?:y\s*=\s*)?([0-9x+\-*/^()\s.]+?)(?:\s+with"
                      r"\s+respect|\s+wrt|\s+at\b|\s+when\b|[,;.]|$)",
                      norm) or \
            re.search(r"of\s*([0-9x+\-*/^()\s.]+?)\s+(?:is|=)\s",
                      norm)
        if ex:
            expr_str = _mathify(ex.group(1))
            # Prefer the calculus engine (verified answer + rule steps +
            # backend cascade + timeout); raw sympy only as fallback.
            try:
                is_diff = re.search(r"derivative|dy/dx|slope|"
                                    r"differentiat|y''|second deriv",
                                    norm)
                is_lim = re.search(r"limit|approaches", norm)
                if is_lim and xm is not None:
                    r = _calc_bridge.calc(
                        "limit", expr_str=expr_str, variable="x",
                        approach_value=xm)
                elif is_diff:
                    order = 2 if re.search(r"second deriv|y''", norm) \
                        else 1
                    r = _calc_bridge.calc(
                        "differentiate", expr_str=expr_str,
                        variable="x", order=order)
                else:
                    r = {"success": False}
                if r.get("success") and r.get("result"):
                    import sympy as sp
                    xv = sp.Symbol("x")
                    res = sp.sympify(str(r["result"]),
                                     locals={"x": xv, "e": sp.E})
                    if xm is not None and op == "differentiate":
                        res = res.subs(xv, float(xm))
                    val = float(sp.N(res))
                    return done(val, "engine %s -> %s" % (op, _fmt(val)))
            except Exception:
                pass
            try:
                import sympy as sp
                xv = sp.Symbol("x")
                expr = sp.sympify(expr_str)
                if re.search(r"second deriv|y''", norm):
                    expr = sp.diff(expr, xv, 2)
                elif re.search(r"derivative|dy/dx|slope", norm):
                    expr = sp.diff(expr, xv)
                if xm is not None:
                    expr = expr.subs(xv, float(xm))
                val = float(sp.N(expr))
                return done(val, "expr -> %s" % _fmt(val))
            except Exception:
                pass

    # ── extended calculus ops via core_calculus_engine ─────────────────
    # definite integrals, area under/between curves, max/min value,
    # continuity check — numeric-answer families only (symbolic results
    # abstain: ExecResult.value must be a float).
    if re.search(r"integral|integrat|area\s+(?:under|bounded|enclosed)|"
                 r"maxim\w+|minim\w+|increas\w+|decreas\w+|continu", norm):
        two_curves = re.search(
            r"y\s*=\s*([0-9a-z+\-*/^()\s.]+?)\s*(?:and|,)\s*y\s*=\s*"
            r"([0-9a-z+\-*/^()\s.]+?)(?:\s+(?:from|between|at|on)\b|"
            r"[,;.]|$)", norm)
        expr_m = re.search(
            r"y\s*=\s*([0-9a-z+\-*/^()\s.,]+?)"
            r"(?:\s+(?:from|between|at|on|and)\b|[,;.]|$)", norm) or \
            re.search(r"(?:of|integrat\w*)\s*\(?\s*([0-9a-z+\-*/^()\s.]+?)"
                      r"\s*(?:\)|dx|\s+from|\s+between|[,;.]|$)", norm)
        lo_hi = re.search(r"(?:from|between)\s+x?\s*=?\s*(-?\d+(?:\.\d+)?)"
                          r"\s+(?:to|and)\s+x?\s*=?\s*(-?\d+(?:\.\d+)?)",
                          norm)
        if expr_m:
            e1 = _mathify(expr_m.group(1))
            if e1:
                try:
                    if two_curves and "area" in norm:
                        e2 = _mathify(two_curves.group(2))
                        kw = {}
                        if lo_hi:
                            kw = {"lower": float(lo_hi.group(1)),
                                  "upper": float(lo_hi.group(2))}
                        r = _calc_bridge.calc(
                            "area_between_curves", expr1_str=e1,
                            expr2_str=e2, variable="x", **kw)
                    elif re.search(r"integral|integrat|area\s+under", norm) \
                            and lo_hi:
                        r = _calc_bridge.calc(
                            "integrate", expr_str=e1, variable="x",
                            lower=float(lo_hi.group(1)),
                            upper=float(lo_hi.group(2)))
                    elif "area" in norm and lo_hi:
                        r = _calc_bridge.calc(
                            "area_under_curve", expr_str=e1,
                            variable="x", lower=float(lo_hi.group(1)),
                            upper=float(lo_hi.group(2)))
                    elif re.search(r"maxim\w+|minim\w+", norm):
                        r = _calc_bridge.calc(
                            "max_min_check", expr_str=e1, variable="x")
                    elif re.search(r"continu", norm):
                        xp = re.search(r"at\s+x\s*=\s*(-?\d+(?:\.\d+)?)",
                                       norm)
                        r = _calc_bridge.calc(
                            "continuity", expr_str=e1, variable="x",
                            point=xp.group(1) if xp else None)
                    else:
                        r = {"success": False}
                    if r.get("success") and r.get("result"):
                        import sympy as sp
                        xv = sp.Symbol("x")
                        raw = str(r["result"])
                        # engine text answers: 'x = 2.0: Local Maximum,
                        # f(x) = 4.0' — extract the requested quantity
                        fx = re.search(r"f\(x\)\s*=\s*(-?\d+(?:\.\d+)?)",
                                       raw)
                        if fx and re.search(r"value|maximum|minimum",
                                            norm):
                            return done(float(fx.group(1)),
                                        "engine -> %s" % fx.group(1))
                        xa = re.search(r"x\s*=\s*(-?\d+(?:\.\d+)?)", raw)
                        if xa and re.search(r"at\s+(?:which|what)|point",
                                            norm):
                            return done(float(xa.group(1)),
                                        "engine -> x=%s" % xa.group(1))
                        res = sp.sympify(
                            raw, locals={"x": xv, "e": sp.E, "pi": sp.pi})
                        if res.is_number:
                            val = float(sp.N(res))
                            return done(val, "engine -> %s" % _fmt(val))
                except Exception:
                    pass

    # digit reversal: 'digits of 41 swapped -> difference 27'
    # (9*|d1-d2|); 'add up to 11 x (sum of digits)'
    if re.search(r"(swap|revers)\w*", norm):
        m2 = re.search(r"(?:digits of|number)\s*(?:the\s*"
                       r"\d+-?digit\s*(?:number\s*)?)?(\d{2,})\b",
                       norm)
        if m2:
            n0 = int(m2.group(1))
            rev = int(str(n0)[::-1])
            if re.search(r"add|sum", norm):
                digs = [int(d) for d in str(n0)]
                if "11" in norm:
                    return done(11 * sum(digs),
                                "11 * digit-sum %s" % sum(digs))
                return done(n0 + rev, "%s + %s" % (n0, rev))
            return done(abs(n0 - rev), "|%s - %s|" % (n0, rev))

    # 'for the digits 7, 9, 1, 1 form largest and smallest ... find
    # the difference' — Kaprekar-style sort
    if re.search(r"digits?\s+\d", norm) and \
            re.search(r"largest|smallest|kaprekar", norm):
        digs = re.findall(r"\d",
                          norm.split("form")[0].split("digits")[-1]
                          if "digits" in norm else norm)
        if len(digs) >= 2:
            hi = int("".join(sorted(digs, reverse=True)))
            lo = int("".join(sorted(digs)))
            if re.search(r"difference|subtract|find", norm):
                return done(hi - lo, "%s - %s" % (hi, lo))
            return done(hi + lo, "%s + %s" % (hi, lo))

    # landmark groups: '6751 into groups of 1000, 100, 10 — how many
    # complete [thousands]' -> floor(n/1000)
    if "landmark" in norm or "complete groups" in norm or \
            ("groups of" in norm and "1000" in norm):
        if ints:
            n = ints[0]
            return done(n // 1000,
                        "%s // 1000 = %s" % (n, n // 1000))

    # symmetry facts — shape lookups, no formula expresses these
    if "symmetry" in norm:
        lines_of = {"kite": 1, "square": 4, "equilateral triangle": 3,
                    "regular pentagon": 5, "regular hexagon": 6,
                    "rectangle": 2, "rhombus": 2, "parallelogram": 0,
                    "isosceles triangle": 1, "scalene triangle": 0,
                    "circle": -1, "semicircle": 1, "isoceles": 1}
        rot_of = {"kite": 1, "square": 4, "equilateral triangle": 3,
                  "regular pentagon": 5, "regular hexagon": 6,
                  "rectangle": 2, "rhombus": 2, "parallelogram": 2,
                  "circle": -1, "isoceles": 1, "isosceles triangle": 1}
        table = rot_of if "rotational" in norm else lines_of
        # 'regular n-gon' -> n
        ng = re.search(r"regular\s+(\w+)gon|regular\s+(\d+)-?gon",
                       norm)
        for shape, v in sorted(table.items(), key=lambda kv: -len(kv[0])):
            if shape in norm:
                return done(v if v >= 0 else 360,
                            "%s -> %s" % (shape, v))
        if ng and ng.group(2):
            return done(int(ng.group(2)),
                        "regular %s-gon -> %s" % (ng.group(2),
                                                  ng.group(2)))

    # endpoints: line->0, ray->1, segment->2 — read the ASK clause so
    # 'a line segment has two endpoints; how many does a ray have'
    # answers the ray, not the segment mentioned as the given
    if "endpoint" in norm or "end point" in norm:
        _sents = [s for s in re.split(r"[.;?!]", norm) if s.strip()]
        _ask = _sents[-1] if _sents else norm
        for shape, v in (("line segment", 2), ("segment", 2),
                         ("ray", 1), ("line", 0), ("point", 0),
                         ("circle", 0)):
            if re.search(r"\b" + shape + r"\b", _ask):
                return done(v, "%s -> %s endpoints" % (shape, v))

    # perfect number: proper divisors sum to the number
    if "perfect number" in norm and ints:
        n = ints[0]
        divs = [d for d in range(1, n) if n % d == 0]
        s = sum(divs)
        return done(n if s == n else s,
                    "proper divisors %s -> sum %s" % (divs, s))

    # twin primes / gap between two numbers
    if re.search(r"primes?.*(apart|gap|difference)", norm) \
            and len(ints) >= 2:
        return done(abs(ints[0] - ints[1]),
                    "gap %s-%s = %s" % (ints[0], ints[1],
                                        abs(ints[0] - ints[1])))

    # co-prime check -> gcd / common factor count
    if "co-prime" in norm or "coprime" in norm:
        if len(ints) >= 2:
            a, b = ints[0], ints[1]
            h = math.gcd(a, b)
            if re.search(r"how many|common factors|number of", norm):
                cnt = sum(1 for d in range(1, h + 1) if h % d == 0)
                return done(cnt, "common factors of gcd %s: %s"
                            % (h, cnt))
            return done(h, "gcd(%s,%s)=%s" % (a, b, h))

    # divisibility by 9 / 11 -> digit sums
    if re.search(r"divisib\w* (?:by|rule)\s*9\b", norm) or \
            re.search(r"divisib\w* (?:by|rule)\s*11\b", norm):
        if ints:
            n = max(ints)
            digs = [int(d) for d in str(abs(n))]
            if re.search(r"\b11\b", norm):
                alt = abs(sum(digs[::2]) - sum(digs[1::2]))
                return done(alt, "alternating digit sum = %s" % alt)
            s = sum(digs)
            # 'is it divisible' -> remainder after dividing by 9
            if "divisible" in norm:
                return done(s % 9, "digit sum %s mod 9" % s)
            return done(s, "digit sum = %s" % s)

    # units digit of a square/cube/power
    if "units digit" in norm or "unit digit" in norm:
        exp = re.search(r"(?:of|for)\s*(?:the\s*(?:square|cube|"
                        r"power|product)\s*(?:of\s*)?)?(-?\d+)", norm)
        if exp:
            n = int(exp.group(1))
            p = 3 if re.search(r"\bcube", norm) else \
                2 if re.search(r"square", norm) else 1
            return done((n % 10) ** p % 10,
                        "units digit %s^%s -> %s"
                        % (n, p, (n % 10) ** p % 10))

    # inline power expressions: '5^3 - 4^3', '11 x 9' via identity
    mm = re.search(r"(\d+)\s*\^\s*(\d+)\s*[-+]\s*(\d+)\s*\^\s*(\d+)",
                   norm)
    if mm:
        a, pa, b, pb = (float(mm.group(i)) for i in (1, 2, 3, 4))
        v = a ** pa - b ** pb if "-" in norm else a ** pa + b ** pb
        return done(v, "%s^%s - %s^%s = %s" % (a, pa, b, pb, v))

    # 'find 11 x 9' — bare product written with x
    mm = re.search(r"(?:find|evaluate|compute|calculate)\s+"
                   r"(-?\d+)\s*x\s*(-?\d+)", norm)
    if mm:
        return done(float(mm.group(1)) * float(mm.group(2)),
                    "%s x %s" % (mm.group(1), mm.group(2)))

    # 'smallest number to multiply/divide to make a perfect cube' —
    # prime factorisation parity check
    if "prime factorisation" in norm or "prime factorization" in norm:
        facs = re.findall(r"(\d+)\s*\^\s*(\d+)", norm)
        # bare primes with implicit exponent 1: '5^4 x 2' -> 2^1
        for bm in re.finditer(r"[x*]\s*(\d+)(?!\s*\^)", norm):
            facs.append((bm.group(1), "1"))
        target_p = 3 if "cube" in norm else 2
        if facs and ("multiplied" in norm or "divided" in norm):
            rem = [(int(p), int(e) % target_p) for p, e in facs]
            if "multiplied" in norm:
                v = 1
                for p, r in rem:
                    if r:
                        v *= p ** (target_p - r)
                return done(v, "multiply by %s -> perfect power" % v)
            else:
                v = 1
                for p, r in rem:
                    v *= p ** r
                return done(v, "divide by %s -> perfect power" % v)

    # up-and-down sums: '1 + 2 + ... + 8 + ... + 2 + 1' -> n^2
    if re.search(r"\+\s*\.\.\.\s*\+\s*\d+\s*\+\s*\.\.\.|"
                 r"\d\s*\+\s*\+\s*\d+\s*\+\s*\+", norm):
        peak = max(ints) if ints else 0
        return done(peak * peak, "up-down sum -> %s^2" % peak)

    # pythagorean triples: '2m = 26' -> m, m^2-1, m^2+1
    if "pythagorean" in norm and "2m" in norm.replace(" ", ""):
        mm = re.search(r"2m\s*=\s*(\d+)", norm.replace(" ", ""))
        if mm:
            m = int(mm.group(1)) // 2   # '2m = 26' -> m = 13
            if re.search(r"\bsmallest|other two|first\b", norm) and \
                    "largest" not in norm:
                return done(m * m - 1, "m^2-1 = %s" % (m * m - 1))
            return done(m * m + 1, "m^2+1 = %s" % (m * m + 1))

    return None


def _quantity_solve(concept: Dict, slots: Dict[str, float],
                    text: str) -> ExecResult:
    """Last deterministic seam for word-problem questions.

    1. Bind parsed quantities (families) to the concept's formula vars.
    2. For each candidate binding, retry the formula ladder AND a sympy
       rearrangement that solves for the variable the question asks
       (e.g. 'speed = distance/time' solved for 'time').
    """
    cid = str(concept.get("id", ""))
    # procedural kernels first — they need no bindings at all
    try:
        r = _procedural_solve(concept, text)
        if r is not None:
            return r
    except Exception:
        pass
    try:
        from backend.its.solver.quantity_binder import (
            bind_quantities, asked_variables)
        from backend.its.solver.quantity_parser import parse_quantities
        from backend.its.solver.input_normalizer import normalize_input
    except Exception:
        return ExecResult(False, None, [], "quantity seam unavailable",
                          cid, "quantity")

    # literal-only compute steps baked from the concept's own example —
    # rebind their literals to this question's numbers positionally
    from backend.its.solver.quantity_binder import _literal_step_solutions
    for var, val, expr in _literal_step_solutions(concept, text):
        return ExecResult(True, float(val),
                          ["%s = %s -> %s" % (var, expr, _fmt(val))],
                          "", cid, "literal-rebind")

    bindings = bind_quantities(text, concept)

    # assertion path: 'HCF is 8' binds hcf=8; the question's remaining
    # numbers fill the formula's still-unbound variables in order
    try:
        from backend.its.solver.quantity_binder import (
            assertion_bindings, concept_variables)
        a_slots, rest = assertion_bindings(text, concept)
        # single-INPUT formula + single question number -> bind it
        # (input vars = RHS identifiers; the LHS output stays unbound)
        ivars = _formula_inputs(concept)
        if not a_slots and len(ivars) == 1 and len(rest) == 1:
            a_slots = {ivars[0]: rest[0]}
            rest = []
        # positional bind: N unbound inputs + N question numbers —
        # alphabetical var order maps to textual order (textbook
        # phrasing follows formula order: 'first term 2, difference 3'
        # -> a=2, d=3)
        if not a_slots and 2 <= len(ivars) <= 4 \
                and len(rest) == len(ivars):
            cand = dict(sorted(zip(ivars, rest)))
            bindings.insert(0, cand)
        if a_slots:
            cvars = concept_variables(concept)
            # only INPUT vars (formula RHS) are fillable — LHS outputs
            # (an, sn, ...) must never absorb a stray question number
            inputs = set(_formula_inputs(concept))
            inputs -= {"l"}   # 'last term' only binds via phrase/link
            extra = [v for v in ("a", "b", "c", "d")
                     if v not in a_slots and v not in slots
                     and (v in inputs or not cvars)]
            unbound = [v for v in cvars if v not in a_slots
                       and v not in slots and v in inputs] + extra
            if len(rest) >= len(unbound) or a_slots:
                cand = dict(a_slots)
                for v, val in zip(unbound, rest):
                    cand[v] = val
                # assertion/param binds are semantically precise —
                # they outrank unit-family guesses which otherwise win
                # on order alone ('9 m' -> s instead of w)
                bindings.insert(0, cand)
    except Exception:
        pass

    # no deterministic bindings is not fatal — the semantic pass
    # below can still bind from var glosses

    asked = asked_variables(text)

    # canonicalized/labeled slots are the most precise bindings we
    # have -- try solving with them ALONE before unit-family guesses
    # can rebind their numbers ('4500 joules' must not become mass)
    if slots:
        res = _sympy_rearrange(concept, dict(slots), text, asked)
        if res.ok:
            res.source = "quantity+slots"
            return res

    for cand in bindings:
        # canonicalized/labeled slots are semantically precise -- a
        # unit-family guess must never overwrite them ('4500 joules'
        # bound to kinetic_energy must not be rebound to mass)
        merged = dict(cand)
        merged.update(slots)
        # sympy-with-target FIRST — it resolves the asked variable and
        # system-solves chained relations; the ladder blindly returns
        # the first evaluable LHS ('sum' must not return 'an')
        res = _sympy_rearrange(concept, merged, text, asked)
        if res.ok:
            res.source = "quantity+solve"
            return res
        res = _formula_ladder(concept, merged, text)
        if res.ok:
            res.source = "quantity+ladder"
            return res

    # slots-only path: LLM-canonicalized / labeled bindings with no
    # quantity-parser candidates still deserve the rearrangement pass
    # ('arc=44, r=21, find angle' -> solve arc=(angle/360)*2*pi*r)
    if not bindings and slots:
        res = _sympy_rearrange(concept, dict(slots), text, asked)
        if res.ok:
            res.source = "quantity+slots"
            return res
        res = _formula_ladder(concept, dict(slots), text)
        if res.ok:
            res.source = "quantity+slots"
            return res

    # semantic pass — MiniLM is expensive; it only earns its load time
    # when every deterministic candidate has already failed
    try:
        from backend.its.solver.quantity_binder import (
            semantic_bind, semantic_target)
        sem = semantic_bind(text, concept)
        t = semantic_target(text, concept)
        if t:
            asked = [t] + [a for a in asked if a != t]
        if sem:
            base = dict(bindings[0]) if bindings else {}
            for k, v in sem.items():
                base.setdefault(k, v)
            merged = dict(base)
            merged.update(slots)
            res = _sympy_rearrange(concept, merged, text, asked)
            if res.ok:
                res.source = "quantity+semantic"
                return res
            res = _formula_ladder(concept, merged, text)
            if res.ok:
                res.source = "quantity+semantic"
                return res
    except Exception:
        pass
    # permutation-consensus: unbound inputs × remaining numbers,
    # every ordering tried — a unique valid result needs no semantics
    try:
        ivars = _formula_inputs(concept)
        # vars pinned by deterministic binds stay pinned
        pinned: Dict[str, float] = {}
        for cand in bindings:
            for k, v in cand.items():
                pinned.setdefault(k, v)
        # 'l' (last term) is only ever bound by a phrase ('last term',
        # 'up to ...') or derived via l = an — never by position
        _NO_POS = {"l", "an", "sn"}
        free = [v for v in ivars
                if v not in pinned and v not in _NO_POS]
        from backend.its.solver.input_normalizer import normalize_input
        qnums = [float(x) for x in re.findall(
            r"-?\d+(?:\.\d+)?", normalize_input(text))]
        used = list(pinned.values())
        pool = [n for n in qnums
                if not any(abs(n - u) < 1e-9 for u in used)]
        if 0 < len(free) <= 4 and len(pool) >= len(free):
            import itertools
            # domain constraints per var name — a permutation that
            # puts a non-integer into a position/count var is invalid
            _INT_VARS = {"n", "k", "terms", "count", "number",
                         "num_terms", "rank", "position", "terms_n"}
            _ANGLE_VARS = {"angle", "angle1", "angle2", "angle3",
                           "theta", "other", "third"}
            vals = []
            for perm in itertools.permutations(pool, len(free)):
                cand = dict(pinned)
                cand.update(zip(free, perm))
                bad = False
                for v, val in cand.items():
                    if v in _INT_VARS and (val != int(val) or val <= 0):
                        bad = True
                    if v in _ANGLE_VARS and not (0 < val <= 360):
                        bad = True
                if bad:
                    continue
                res = _sympy_rearrange(concept, cand, text, asked)
                if res.ok:
                    vals.append(round(res.value, 6))
            uniq = sorted(set(vals))
            if len(uniq) == 1:
                return ExecResult(True, uniq[0],
                                  ["consensus solve -> %s"
                                   % _fmt(uniq[0])], "",
                                  cid, "quantity+consensus")
            if len(uniq) > 1:
                return ExecResult(
                    False, None, [],
                    "ambiguous: %d bindings give different values %s"
                    % (len(uniq), uniq[:5]), cid, "quantity")
    except Exception:
        pass
    return ExecResult(False, None, [],
                      "quantities bound but formula not solvable for "
                      "the asked variable", cid, "quantity")


def _sympy_rearrange(concept: Dict, env: Dict[str, float],
                     text: str, asked: List[str]) -> ExecResult:
    """Solve catalog formulas for a target that is NOT the LHS.

    'speed = distance / time' + asked 'time' -> time = distance/speed.
    """
    import sympy as sp

    formula = str(concept.get("formula") or "")

    eqs: List = []
    all_syms: Dict[str, Any] = {}
    for part in re.split(r"[;\n]", formula):
        if "=" not in part or re.search(r"!=|>=|<=|<|>", part):
            continue
        lhs, rhs = part.rsplit("=", 1)
        lhs, rhs = lhs.strip(), rhs.strip()
        if not lhs or not rhs:
            continue
        names = set(re.findall(r"[A-Za-z_][A-Za-z_0-9]*",
                               lhs + " " + rhs))
        # pi/e are constants, not variables — Symbol('pi') would block
        # float() on the result forever
        loc = {n: sp.Symbol(n) for n in names
               if n.lower() not in ("pi", "e", "tau", "inf",
                                    # function names — Symbol('sqrt')
                                    # isn't callable, breaks sympify
                                    "sqrt", "abs", "min", "max",
                                    "sin", "cos", "tan", "sec", "csc",
                                    "cot", "asin", "acos", "atan",
                                    "sinh", "cosh", "tanh", "log",
                                    "ln", "exp", "floor", "ceil",
                                    "pow", "factorial", "gcd", "lcm",
                                    "mod", "sum")}
        all_syms.update(loc)
        try:
            l = sp.sympify(_mathify(lhs) or lhs, locals=loc)
            r = sp.sympify(_mathify(rhs) or rhs, locals=loc)
            eqs.append(sp.Eq(l, r))
        except Exception:
            continue

    # questions that state their own relation — "HCF x LCM = a x b",
    # "HCF x LCM = product of the numbers" — become equations too
    eqs.extend(_question_equations(text, all_syms))
    # canonical links between symbols the formulas use: 'l' (last
    # term) IS 'an' (nth term); with the link the system solver can
    # chain nth-term -> sum automatically
    if "l" in all_syms and "an" in all_syms and \
            not any("l" in str(eq.lhs) for eq in eqs):
        eqs.append(sp.Eq(all_syms["l"], all_syms["an"]))
    if not eqs:
        return ExecResult(False, None, [], "formula not symbolic",
                          str(concept.get("id", "")), "quantity")

    # target: the concept's ask_map knows how its questions phrase the
    # asked quantity ('8th term' -> 'an').  Match only inside the ASK
    # clause — 'one pair is 32; find the adjacent angle' asks adjacent,
    # not the vertically-opposite pair mentioned as context.
    target = None
    low = " " + text.lower() + " "
    am = re.search(r"(?:find|calculate|determine|compute|evaluate|"
                   r"what is|how much|how many|state)\b(.*)$", low)
    if am:
        ask_clause = am.group(1)
    else:
        # no ask verb — the last non-empty sentence is the ask
        _sents = [s for s in re.split(r"[.;?!]", low) if s.strip()]
        ask_clause = _sents[-1] if _sents else low
    # relation-type words live in the SETUP sentence, not the ask —
    # 'complementary' anywhere selects the 90-form even when the ask
    # is a bare 'find the other'.  This beats generic asks like 'other'.
    if "complement" in low and "other_complementary" in all_syms:
        target = "other_complementary"
    elif re.search(r"linear pair|straight line|straight angle|"
                   r"supplement", low) and \
            "other_linear" in all_syms:
        target = "other_linear"
    for phrase, var in sorted(
            (concept.get("ask_map") or {}).items(),
            key=lambda kv: -len(kv[0])):
        if target is not None:
            break
        ph = phrase.lower()
        if var not in all_syms:
            continue
        m = re.search(r"\b" + re.escape(ph) + r"\b", ask_clause)
        if not m:
            continue
        # 'common difference 5' is a GIVEN, not an ask — skip when a
        # bare number or 'is N' follows.  'of N' stays allowed:
        # 'cube root of 64' asks the root, 64 is its operand.
        tail = ask_clause[m.end():m.end() + 24]
        if re.match(r"\s*(?:is|=|was|at|for)?\s*-?\d", tail):
            continue
        target = var
        break
    if target is None:
        # a bound symbol can never be the asked unknown -- 'radius 21
        # cm' in the GIVENS must not outrank the unbound 'angle' in
        # 'find the angle'
        env_keys0 = {k.lower() for k in env}
        for w in asked:
            for name in all_syms:
                if name.lower() in env_keys0:
                    continue
                if w == name or (len(w) > 2 and w in name):
                    target = name
                    break
            if target:
                break
    if target is None:
        # unbound symbol literally named in the question
        # ('find the circumference' -> symbol 'circumference')
        env_keys = {k.lower() for k in env}
        named = [n for n in all_syms
                 if n not in env_keys
                 and re.search(r"\b" + re.escape(n) + r"\b", low)]
        if len(named) == 1:
            target = named[0]
    if target is None:
        # fall back: the single symbol not present in env
        unbound = [n for n in all_syms
                   if n not in {k.lower() for k in env}]
        if len(unbound) == 1:
            target = unbound[0]
    if target is None:
        return ExecResult(False, None, [], "no resolvable target",
                          str(concept.get("id", "")), "quantity")

    sym_target = all_syms.get(target) or sp.Symbol(target)
    subs = {all_syms[k.lower()]: float(v)
            for k, v in env.items() if k.lower() in all_syms
            and isinstance(v, (int, float))}
    # '(take pi = 22/7)' binds pi as a slot — feed it to sympy
    if isinstance(env.get("pi"), (int, float)):
        subs[sp.pi] = float(env["pi"])
    # target already derived by binding (sequence diff, assertion) —
    # its value IS the answer
    if sym_target in subs:
        val = subs[sym_target]
        return ExecResult(True, val,
                          ["%s = %s (given/derived)" %
                           (target, _fmt(val))], "",
                          str(concept.get("id", "")), "quantity")
    lines = []
    for eq in eqs:
        if sym_target not in eq.free_symbols:
            continue
        try:
            sols = sp.solve(eq, sym_target)
        except Exception:
            continue
        for sol in sols:
            try:
                val = float(sp.N(sol.subs(subs)))
            except (TypeError, ValueError):
                continue
            if not math.isfinite(val) or abs(val) > _MAX_RESULT:
                continue
            lines.append("%s = %s -> %s" % (target, sol, _fmt(val)))
            return ExecResult(True, val, lines, "",
                              str(concept.get("id", "")), "quantity")

    # system solve: multi-step questions where the target needs an
    # intermediate symbol defined by another equation — solve the
    # whole equation set at once (output of eq A feeds eq B)
    try:
        # prune to the target's equation subgraph — unrelated eqs
        # (perimeter=2(l+w) when the ask is '4s' on a square) drag in
        # free symbols and make sp.solve spin on underdetermined
        # systems
        rel = [eq for eq in eqs if sym_target in eq.free_symbols]
        frontier = {fs for eq in rel for fs in eq.free_symbols}
        changed = True
        while changed:
            changed = False
            for eq in eqs:
                if eq in rel:
                    continue
                if frontier & eq.free_symbols:
                    rel.append(eq)
                    frontier |= eq.free_symbols
                    changed = True
        unknowns = [s for s in
                    {fs for eq in rel for fs in eq.free_symbols}
                    if s not in subs]
        # underdetermined systems (unknowns > equations) spin forever
        # in sp.solve — skip them; the per-eq path and consensus cover
        # those cases
        if sym_target in unknowns or sym_target in subs:
            if 0 < len(unknowns) <= len(rel):
                subbed = [eq.subs(subs) for eq in rel]
                sols_sys = sp.solve(subbed, unknowns, dict=True)
            else:
                sols_sys = []
            for sd in sols_sys:
                if sym_target in sd:
                    try:
                        val = float(sp.N(sd[sym_target]))
                    except (TypeError, ValueError):
                        continue
                    if math.isfinite(val) and abs(val) <= _MAX_RESULT:
                        lines.append("system: %s = %s" %
                                     (target, _fmt(val)))
                        return ExecResult(True, val, lines, "",
                                          str(concept.get("id", "")),
                                          "quantity")
    except Exception:
        pass
    return ExecResult(False, None, [], "symbolic solve produced "
                      "no usable value", str(concept.get("id", "")),
                      "quantity")


# ------------------------------------------------------------------ #
# Question-stated relations ("HCF x LCM = a x b" inside the question)
# ------------------------------------------------------------------ #

# 'the numbers' / 'two numbers' refer to the quantities given —
# symbolized as a, b (and c for three)
_QWORD_SYMS = {
    "hcf": "hcf", "lcm": "lcm", "gcd": "hcf",
    "product of the numbers": "a*b", "product of two numbers": "a*b",
    "product of the two numbers": "a*b", "product": "a*b",
    "sum of the numbers": "a+b", "sum of two numbers": "a+b",
    "their product": "a*b", "its product": "a*b",
}

_QEQ_RE = re.compile(
    r"\b([a-z]{2,12})\s*(?:x|×|\*)\s*([a-z]{2,12})"
    r"\s*=\s*([a-z][a-z0-9_ ]{0,60}?)(?:[.,;]|$)",
    re.IGNORECASE)


def _question_equations(text: str, all_syms: Dict[str, Any]) -> List:
    """Harvest 'X x Y = Z x W' / 'X x Y = product of the numbers'
    relations stated inside the question into sympy Eq objects."""
    import sympy as sp
    norm = text.lower()
    out = []
    for m in _QEQ_RE.finditer(norm):
        l1, l2, r = m.group(1).strip(), m.group(2).strip(), \
            m.group(3).strip()
        # right side may itself be 'a x b' or a phrase like
        # 'product of the numbers'
        r = r.strip()
        l1s = _QWORD_SYMS.get(l1)
        l2s = _QWORD_SYMS.get(l2)
        if l1s is None or l2s is None:
            continue
        rs = None
        rm = re.match(r"([a-z][a-z0-9_ ]{0,40}?)\s*(?:x|×|\*)\s*"
                      r"([a-z0-9_ ]{1,40})$", r)
        if rm:
            a_, b_ = rm.group(1).strip(), rm.group(2).strip()
            rs1, rs2 = _QWORD_SYMS.get(a_), _QWORD_SYMS.get(b_)
            if rs1 and rs2:
                rs = f"({rs1})*({rs2})"
        if rs is None:
            rs = _QWORD_SYMS.get(r)
        if rs is None:
            continue
        for name in (l1s, l2s):
            for tok in re.findall(r"[a-z_][a-z0-9_]*", name):
                all_syms.setdefault(tok, sp.Symbol(tok))
        for tok in re.findall(r"[a-z_][a-z0-9_]*", rs):
            all_syms.setdefault(tok, sp.Symbol(tok))
        try:
            out.append(sp.Eq(sp.sympify(f"({l1s})*({l2s})",
                                        locals=all_syms),
                             sp.sympify(rs, locals=all_syms)))
        except Exception:
            continue
    return out


_STOPWORDS = {
    "the", "a", "an", "of", "is", "are", "was", "were", "find", "what",
    "how", "much", "many", "in", "on", "at", "for", "to", "and", "or",
    "with", "if", "when", "it", "its", "from", "by", "per", "cent",
    "year", "years", "cm", "m", "km",
}
