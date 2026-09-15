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
}
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
    s = re.sub(r"(?<=[0-9A-Za-z_)])\s*[x]\s*(?=[0-9A-Za-z_(])", "*", s)
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

    if str(concept.get("solution_type", "")) != "compute":
        return ExecResult(False, None, [],
                          "verify_property concept: method only", cid, "")

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
    steps = concept.get("solution_steps") or []
    has_compute = [s for s in steps if str(s.get("compute") or "").strip()]
    gate_fn = _STEPS_TEXT_GATES.get(cid)
    gate_ok = True if gate_fn is None else bool(gate_fn(text, slots))
    if has_compute and gate_ok and steps and \
            str(steps[-1].get("compute") or "").strip():
        env = {k: float(v) for k, v in slots.items()
               if isinstance(v, (int, float))}
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

    # 5. honest refusal
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


_STOPWORDS = {
    "the", "a", "an", "of", "is", "are", "was", "were", "find", "what",
    "how", "much", "many", "in", "on", "at", "for", "to", "and", "or",
    "with", "if", "when", "it", "its", "from", "by", "per", "cent",
    "year", "years", "cm", "m", "km",
}
