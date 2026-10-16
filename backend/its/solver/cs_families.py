"""cs_families.py -- deterministic Computer Science families, classes
11-12 (ELECTIVES-ALL batch, 2026-10-07).

CBSE c11/c12 CS (438 corpus files) + CISCE ISC CS.  The corpus asks
three deterministic things this module owns -- everything else stays an
honest refusal:

  PYTHON OUTPUT PREDICTION
    PY_TRACE   -- predict the printed output of a short self-contained
                  snippet (fenced code block or inline code) using a
                  strict AST-walking interpreter for the TAUGHT SUBSET:
                  int/float/str/bool/None/list/tuple/dict, arithmetic
                  (+ - * / // % ** with Python semantics), comparisons
                  and chaining, and/or/not, if/elif/else, for over
                  range/list/str/tuple/dict-keys, while, break/
                  continue, pass, simple function definitions with
                  positional + default args and return (recursion
                  included, budget-capped), subscripting/slicing,
                  augmented and tuple assignment, f-strings, the
                  taught builtins (print, len, range, int, float, str,
                  bool, list, tuple, dict, set, abs, round, min, max,
                  sum, sorted, type, ord, chr, pow, reversed,
                  enumerate) and the taught str/list/dict methods.
                  Anything outside the subset (import, input, file I/O,
                  classes, closures, try/except, comprehensions beyond
                  a simple one-for) is a GATE refusal -- never a guess.
    PY_EXPR    -- the output/value of a single bare expression
                  ("What is the output of print(7 // 2)?").
    PY_TYPE    -- "what data type is 3.14" / "type(3.0)" asks.
  SQL (deterministic only -- explicit data stated in the question)
    SQL_CLAUSE -- clause/keyword purpose facts (WHERE filters rows
                  before grouping, HAVING filters groups, ORDER BY
                  sorts, DISTINCT removes duplicates, ...).
    SQL_AGGR   -- COUNT/COUNT(col)/COUNT(DISTINCT col)/SUM/AVG/MIN/MAX
                  over an explicitly listed value column, with SQL
                  NULL semantics (aggregates skip NULLs).
    SQL_JOIN   -- CROSS JOIN row counts (m x n) and LEFT JOIN result
                  rows over explicitly listed row tuples.
  DATA STRUCTURES
    STACK_SIM  -- push/pop/peek sequences on an empty stack (optional
                  capacity -> overflow detection), LIFO semantics.
    QUEUE_SIM  -- enqueue/dequeue sequences (front/rear naming
                  variants), FIFO semantics, circular-queue wrap.
    POSTFIX_EVAL -- evaluate a postfix (Reverse Polish) expression
                  with the stack method.

Architecture mirrors commerce_families.py / compapp_families.py: a
_TABLE of (FID, compiled trigger, compute) rows scanned by
model_cs_families(); compute returns the 6-tuple
    (value, steps, answer, assumptions, governing_equation, extra)
with _GATE = (None, [], None, None, None, None) meaning "trigger hit
but the gate refuses -- keep scanning".  Recognition is trigger-regex +
parsing only; evaluation is a bounded AST interpreter.  No LLM, no
randomness, no exec inside the family (independent_verifier runs a
restricted-exec second path for the badge gate).

The interpreter never executes untrusted code: it walks a whitelisted
AST with a step budget (deterministic refusal on budget exhaustion).

No node ids in any student-visible string.
"""

from __future__ import annotations

import ast
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as the other family modules)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="",
                       final_answer=None, numeric_answer=None, steps=[],
                       note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


_GATE = (None, [], None, None, None, None)


def _five(method: str, given: str, comp: Optional[List[str]], check: str,
          interp: str) -> List[str]:
    """STEP CONTRACT builder: Method, Given, computation, Check,
    Interpretation, in order."""
    steps = [f"Method: {method}", f"Given: {given}"]
    steps.extend(comp or [])
    steps.append(f"Check: {check}")
    steps.append(f"Interpretation: {interp}")
    return steps


def _norm(text: str) -> str:
    t = (text or "").replace("\u2212", "-").replace("\u2019", "'")
    return re.sub(r"[ \t]+", " ", t)


# --------------------------------------------------------------------------- #
# Python mini-interpreter (strict taught subset)
# --------------------------------------------------------------------------- #

class PyRefuse(Exception):
    """Trigger-shaped like Python but outside the taught subset -> the
    family declines (honest refusal downstream)."""


class PyBudget(Exception):
    """Step/loop budget exhausted -> refuse rather than run forever."""


_MAX_STEPS = 120_000
_MAX_LOOP = 50_000
_MAX_OUT = 20_000          # printed characters
_MAX_DEPTH = 60            # call-recursion depth


class _TypeTag:
    """Marker so type(3) prints like Python: <class 'int'>."""

    def __init__(self, name: str):
        self.name = name

    def __eq__(self, other):
        return isinstance(other, _TypeTag) and other.name == self.name

    def __hash__(self):
        return hash(("tag", self.name))


def _type_name(v: Any) -> str:
    if isinstance(v, _TypeTag):
        return v.name
    if isinstance(v, bool):
        return "bool"
    if isinstance(v, int):
        return "int"
    if isinstance(v, float):
        return "float"
    if isinstance(v, str):
        return "str"
    if isinstance(v, list):
        return "list"
    if isinstance(v, tuple):
        return "tuple"
    if isinstance(v, dict):
        return "dict"
    if isinstance(v, set):
        return "set"
    if v is None:
        return "NoneType"
    return type(v).__name__


def py_repr(v: Any) -> str:
    """Python repr() semantics for containers of mixed types."""
    if isinstance(v, str):
        return repr(v)
    if isinstance(v, bool) or v is None or isinstance(v, (int, float)):
        return py_str(v)
    if isinstance(v, _TypeTag):
        return f"<class '{v.name}'>"
    if isinstance(v, list):
        return "[" + ", ".join(py_repr(x) for x in v) + "]"
    if isinstance(v, tuple):
        inner = ", ".join(py_repr(x) for x in v)
        if len(v) == 1:
            inner += ","
        return "(" + inner + ")"
    if isinstance(v, dict):
        return ("{" + ", ".join(f"{py_repr(k)}: {py_repr(x)}"
                                for k, x in v.items()) + "}")
    if isinstance(v, set):
        if not v:
            return "set()"
        return "{" + ", ".join(py_repr(x) for x in sorted(v)) + "}"
    return str(v)


def py_str(v: Any) -> str:
    """Python str() semantics (print uses this per argument)."""
    if isinstance(v, str):
        return v
    if isinstance(v, bool):
        return "True" if v else "False"
    if v is None:
        return "None"
    if isinstance(v, _TypeTag):
        return f"<class '{v.name}'>"
    if isinstance(v, (list, tuple, dict, set)):
        return py_repr(v)
    if isinstance(v, float):
        return repr(v)
    return str(v)


class _Func:
    """User-defined function (module-level model, no closures)."""

    def __init__(self, name: str, node: ast.FunctionDef):
        self.name = name
        self.node = node


class _Break(Exception):
    pass


class _Continue(Exception):
    pass


class _Return(Exception):
    def __init__(self, value):
        self.value = value


class _Interp:
    """Bounded AST-walking interpreter for the taught Python subset."""

    def __init__(self, src: str):
        self.src = src
        self.tree = ast.parse(src)          # SyntaxError -> PyRefuse caller
        self.env: Dict[str, Any] = {}
        self.buf: List[str] = []
        self.steps = 0
        self.depth = 0

    # -- budget ---------------------------------------------------------- #
    def tick(self):
        self.steps += 1
        if self.steps > _MAX_STEPS:
            raise PyBudget("step budget exhausted")

    # -- statements ------------------------------------------------------ #
    def run(self) -> str:
        self.exec_block(self.tree.body, self.env)
        return "".join(self.buf)

    def exec_block(self, stmts, env):
        for st in stmts:
            self.exec_stmt(st, env)

    def exec_stmt(self, st, env):
        self.tick()
        if isinstance(st, ast.Assign):
            value = self.eval(st.value, env)
            for tgt in st.targets:
                self.store(tgt, value, env)
        elif isinstance(st, ast.AugAssign):
            cur = self.eval(st.target, env) if not isinstance(
                st.target, ast.Name) else env.get(st.target.id)
            rhs = self.eval(st.value, env)
            self.store(st.target, self.binop(st.op, cur, rhs), env)
        elif isinstance(st, ast.AnnAssign):
            if st.value is not None:
                self.store(st.target, self.eval(st.value, env), env)
        elif isinstance(st, ast.Expr):
            self.eval(st.value, env)
        elif isinstance(st, ast.If):
            cond = self.truth(self.eval(st.test, env))
            if cond:
                self.exec_block(st.body, env)
            else:
                self.exec_block(st.orelse, env)
        elif isinstance(st, ast.While):
            guard = 0
            while self.truth(self.eval(st.test, env)):
                guard += 1
                if guard > _MAX_LOOP:
                    raise PyBudget("while-loop budget exhausted")
                self.tick()
                try:
                    self.exec_block(st.body, env)
                except _Break:
                    break
                except _Continue:
                    continue
            else:
                self.exec_block(st.orelse, env)
        elif isinstance(st, ast.For):
            it = self.iterate(self.eval(st.iter, env))
            guard = 0
            for item in it:
                guard += 1
                if guard > _MAX_LOOP:
                    raise PyBudget("for-loop budget exhausted")
                self.tick()
                self.store(st.target, item, env)
                try:
                    self.exec_block(st.body, env)
                except _Break:
                    break
                except _Continue:
                    continue
            else:
                self.exec_block(st.orelse, env)
        elif isinstance(st, ast.Break):
            raise _Break()
        elif isinstance(st, ast.Continue):
            raise _Continue()
        elif isinstance(st, ast.Pass):
            pass
        elif isinstance(st, ast.FunctionDef):
            env[st.name] = _Func(st.name, st)
        elif isinstance(st, ast.Return):
            raise _Return(self.eval(st.value, env)
                          if st.value is not None else None)
        else:
            raise PyRefuse(f"unsupported statement: "
                           f"{type(st).__name__}")

    def store(self, tgt, value, env):
        self.tick()
        if isinstance(tgt, ast.Name):
            env[tgt.id] = value
        elif isinstance(tgt, ast.Tuple) or isinstance(tgt, ast.List):
            items = list(value)
            if len(items) != len(tgt.elts):
                raise PyRefuse("unpacking size mismatch")
            for t, v in zip(tgt.elts, items):
                self.store(t, v, env)
        elif isinstance(tgt, ast.Subscript):
            container = self.eval(tgt.value, env)
            key = self.eval_index(tgt.slice, env)
            try:
                container[key] = value
            except Exception as e:
                raise PyRefuse(f"cannot store: {e}")
        elif isinstance(tgt, ast.Attribute):
            raise PyRefuse("attribute assignment is outside the taught "
                           "subset here")
        else:
            raise PyRefuse(f"unsupported assignment target: "
                           f"{type(tgt).__name__}")

    # -- iteration ------------------------------------------------------- #
    def iterate(self, v):
        if isinstance(v, (list, tuple, str)):
            return list(v)
        if isinstance(v, dict):
            return list(v.keys())
        if isinstance(v, set):
            return sorted(v)
        raise PyRefuse(f"cannot iterate a {type(v).__name__}")

    def eval_index(self, sl, env):
        if isinstance(sl, ast.Slice):
            lo = self.eval(sl.lower, env) if sl.lower else None
            hi = self.eval(sl.upper, env) if sl.upper else None
            step = self.eval(sl.step, env) if sl.step else None
            return slice(lo, hi, step)
        return self.eval(sl, env)

    def truth(self, v):
        if isinstance(v, _TypeTag):
            return True
        return bool(v)

    # -- expressions ----------------------------------------------------- #
    def eval(self, node, env):
        self.tick()
        if isinstance(node, ast.Constant):
            return node.value
        if isinstance(node, ast.Name):
            if node.id in env:
                return env[node.id]
            if node.id in self.env:
                return self.env[node.id]
            b = _BUILTINS.get(node.id)
            if b is not None:
                return b
            raise PyRefuse(f"name '{node.id}' is not defined")
        if isinstance(node, ast.BinOp):
            return self.binop(node.op, self.eval(node.left, env),
                              self.eval(node.right, env))
        if isinstance(node, ast.UnaryOp):
            v = self.eval(node.operand, env)
            if isinstance(node.op, ast.Not):
                return not self.truth(v)
            if isinstance(node.op, ast.USub):
                return -v
            if isinstance(node.op, ast.UAdd):
                return +v
            raise PyRefuse("unsupported unary operator")
        if isinstance(node, ast.BoolOp):
            if isinstance(node.op, ast.And):
                out = True
                for x in node.values:
                    out = self.eval(x, env)
                    if not self.truth(out):
                        return out
                return out
            out = False
            for x in node.values:
                out = self.eval(x, env)
                if self.truth(out):
                    return out
            return out
        if isinstance(node, ast.Compare):
            left = self.eval(node.left, env)
            for op, comp in zip(node.ops, node.comparators):
                right = self.eval(comp, env)
                if not self.compare(op, left, right):
                    return False
                left = right
            return True
        if isinstance(node, ast.IfExp):
            return (self.eval(node.body, env)
                    if self.truth(self.eval(node.test, env))
                    else self.eval(node.orelse, env))
        if isinstance(node, ast.List):
            return [self.eval(e, env) for e in node.elts]
        if isinstance(node, ast.Tuple):
            return tuple(self.eval(e, env) for e in node.elts)
        if isinstance(node, ast.Dict):
            out = {}
            for k, v in zip(node.keys, node.values):
                if k is None:
                    raise PyRefuse("dict unpacking is outside the "
                                   "taught subset")
                out[self.eval(k, env)] = self.eval(v, env)
            return out
        if isinstance(node, ast.Set):
            return set(self.eval(e, env) for e in node.elts)
        if isinstance(node, ast.Subscript):
            container = self.eval(node.value, env)
            key = self.eval_index(node.slice, env)
            try:
                return container[key]
            except PyRefuse:
                raise
            except Exception as e:
                raise PyRefuse(f"cannot index: {e}")
        if isinstance(node, ast.Slice):
            # bare slice object used as value (rare) -- refuse honestly
            raise PyRefuse("bare slice values are outside the taught "
                           "subset")
        if isinstance(node, ast.Attribute):
            raise PyRefuse("attributes/modules are outside the taught "
                           "subset here")
        if isinstance(node, ast.JoinedStr):
            parts = []
            for v in node.values:
                if isinstance(v, ast.Constant):
                    parts.append(str(v.value))
                elif isinstance(v, ast.FormattedValue):
                    val = self.eval(v.value, env)
                    conv = v.conversion
                    spec = self.eval(v.format_spec, env) \
                        if v.format_spec is not None else None
                    if conv == ord("r"):
                        parts.append(py_repr(val))
                    elif conv == ord("s"):
                        parts.append(py_str(val))
                    elif conv == ord("a"):
                        parts.append(py_repr(val))
                    else:
                        parts.append(self.format_spec(val, spec))
            return "".join(parts)
        if isinstance(node, ast.FormattedValue):
            return py_str(self.eval(node.value, env))
        if isinstance(node, ast.Call):
            return self.call(node, env)
        if isinstance(node, ast.ListComp):
            return self.listcomp(node, env)
        if isinstance(node, ast.Starred):
            raise PyRefuse("star-args are outside the taught subset")
        raise PyRefuse(f"unsupported expression: {type(node).__name__}")

    def format_spec(self, val, spec):
        if spec is None:
            return py_str(val)
        try:
            return format(val, spec)
        except Exception as e:
            raise PyRefuse(f"unsupported format spec: {e}")

    def listcomp(self, node, env):
        if len(node.generators) != 1:
            raise PyRefuse("nested comprehensions are outside the "
                           "taught subset")
        gen = node.generators[0]
        if gen.is_async or gen.ifs:
            raise PyRefuse("async/filtered comprehensions are outside "
                           "the taught subset")
        out = []
        for item in self.iterate(self.eval(gen.iter, env)):
            self.tick()
            local = dict(env)
            self.store(gen.target, item, local)
            out.append(self.eval(node.elt, local))
        return out

    def compare(self, op, a, b):
        if isinstance(op, ast.Eq):
            return a == b
        if isinstance(op, ast.NotEq):
            return a != b
        if isinstance(op, ast.Lt):
            return a < b
        if isinstance(op, ast.LtE):
            return a <= b
        if isinstance(op, ast.Gt):
            return a > b
        if isinstance(op, ast.GtE):
            return a >= b
        if isinstance(op, ast.In):
            try:
                return a in b
            except Exception as e:
                raise PyRefuse(f"cannot test membership: {e}")
        if isinstance(op, ast.NotIn):
            try:
                return a not in b
            except Exception as e:
                raise PyRefuse(f"cannot test membership: {e}")
        if isinstance(op, ast.Is):
            return a is b
        if isinstance(op, ast.IsNot):
            return a is not b
        raise PyRefuse("unsupported comparison")

    def binop(self, op, a, b):
        try:
            if isinstance(op, ast.Add):
                return a + b
            if isinstance(op, ast.Sub):
                return a - b
            if isinstance(op, ast.Mult):
                return a * b
            if isinstance(op, ast.Div):
                return a / b
            if isinstance(op, ast.FloorDiv):
                return a // b
            if isinstance(op, ast.Mod):
                if isinstance(a, str):
                    raise PyRefuse("%-formatting is outside the taught "
                                   "subset; use f-strings")
                return a % b
            if isinstance(op, ast.Pow):
                r = a ** b
                if isinstance(r, complex):
                    raise PyRefuse("complex results are outside the "
                                   "taught subset")
                return r
        except PyRefuse:
            raise
        except Exception as e:
            raise PyRefuse(f"cannot apply operator: {e}")
        raise PyRefuse("unsupported binary operator")

    # -- calls ----------------------------------------------------------- #
    def call(self, node, env):
        self.tick()
        if node.keywords:
            kw = {k.arg: k.value for k in node.keywords}
        else:
            kw = {}
        fn = node.func
        # user-defined function? (module env or a function's own name
        # for recursion -- local env first, then module env)
        f_def = None
        if isinstance(fn, ast.Name):
            cand = env.get(fn.id)
            if cand is None:
                cand = self.env.get(fn.id)
            if isinstance(cand, _Func):
                f_def = cand
        if f_def is not None:
            if node.keywords:
                raise PyRefuse("keyword arguments are outside the "
                               "taught subset here")
            if self.depth >= _MAX_DEPTH:
                raise PyBudget("recursion depth exhausted")
            self.depth += 1
            try:
                return self.call_user(f_def,
                                      [self.eval(a, env)
                                       for a in node.args])
            finally:
                self.depth -= 1
        if isinstance(fn, ast.Attribute):
            return self.method_call(fn, node, env)
        if not isinstance(fn, ast.Name):
            raise PyRefuse("only direct calls are in the taught subset")
        name = fn.id
        args = [self.eval(a, env) for a in node.args]
        kw: Dict[str, Any] = {}
        for k in node.keywords:
            if name == "print" and k.arg in ("sep", "end"):
                kw[k.arg] = self.eval(k.value, env)
            else:
                raise PyRefuse(f"keyword argument '{k.arg}' is outside "
                               f"the taught subset here")
        handler = _BUILTINS.get(name)
        if handler is None:
            raise PyRefuse(f"'{name}' is not in the taught builtins")
        return handler(self, args, kw)

    def call_user(self, f: _Func, args):
        a = f.node.args
        if a.vararg or a.kwarg or a.kwonlyargs or a.posonlyargs:
            raise PyRefuse("*args/**kwargs are outside the taught "
                           "subset here")
        n = len(a.args)
        if len(args) > n:
            raise PyRefuse("too many arguments")
        n_def = len(a.defaults)
        local: Dict[str, Any] = {}
        for i, p in enumerate(a.args):
            if i < len(args):
                local[p.arg] = args[i]
            else:
                di = i - (n - n_def)
                if di < 0:
                    raise PyRefuse(f"missing argument '{p.arg}'")
                local[p.arg] = self.eval(a.defaults[di],
                                         dict(self.env, **local))
        try:
            self.exec_block(f.node.body, local)
        except _Return as r:
            return r.value
        return None

    def method_call(self, fn: ast.Attribute, node, env):
        obj = self.eval(fn.value, env)
        meth = fn.attr
        args = [self.eval(a, env) for a in node.args]
        if node.keywords:
            raise PyRefuse("keyword arguments are outside the taught "
                           "subset here")
        table = None
        if isinstance(obj, str):
            table = _STR_METHODS
        elif isinstance(obj, list):
            table = _LIST_METHODS
        elif isinstance(obj, dict):
            table = _DICT_METHODS
        elif isinstance(obj, tuple):
            table = _TUPLE_METHODS
        if table is None or meth not in table:
            kind = _type_name(obj)
            raise PyRefuse(f"method '{meth}' on {kind} is outside the "
                           f"taught subset")
        try:
            return table[meth](self, obj, args)
        except PyRefuse:
            raise
        except Exception as e:
            raise PyRefuse(f".{meth}() failed: {e}")


# -- builtin implementations (each: (interp, args, kw) -> value) --------- #

def _b_print(ip, args, kw):
    sep = kw.get("sep", " ")
    end = kw.get("end", "\n")
    text = sep.join(py_str(a) for a in args) + end
    ip.buf.append(text)
    if sum(len(s) for s in ip.buf) > _MAX_OUT:
        raise PyBudget("output budget exhausted")
    return None


def _b_range(ip, args, kw):
    if kw or not 1 <= len(args) <= 3:
        raise PyRefuse("range() takes 1-3 positional arguments")
    try:
        return list(range(*[int(a) for a in args]))
    except Exception as e:
        raise PyRefuse(f"range() failed: {e}")


def _cast(kind):
    def h(ip, args, kw):
        if kw or len(args) != 1:
            raise PyRefuse(f"{kind}() takes exactly one argument")
        try:
            if kind == "int":
                return int(args[0])
            if kind == "float":
                return float(args[0])
            if kind == "str":
                return py_str(args[0])
            if kind == "bool":
                return ip.truth(args[0])
            if kind == "list":
                return list(ip.iterate(args[0]))
            if kind == "tuple":
                return tuple(ip.iterate(args[0]))
            if kind == "dict":
                if not isinstance(args[0], (dict, list)):
                    raise PyRefuse("dict() needs a mapping or pairs")
                return dict(args[0])
            if kind == "set":
                return set(ip.iterate(args[0]))
        except PyRefuse:
            raise
        except Exception as e:
            raise PyRefuse(f"{kind}() failed: {e}")
    return h


def _b_len(ip, args, kw):
    (v,) = args
    if isinstance(v, (_TypeTag, _Func)) or v is None:
        raise PyRefuse("object has no len()")
    try:
        return len(v)
    except Exception as e:
        raise PyRefuse(f"len() failed: {e}")


def _b_abs(ip, args, kw):
    (v,) = args
    if not isinstance(v, (int, float)) or isinstance(v, bool):
        raise PyRefuse("abs() needs a number")
    return abs(v)


def _b_round(ip, args, kw):
    if not 1 <= len(args) <= 2 or kw:
        raise PyRefuse("round() takes one or two arguments")
    if not isinstance(args[0], (int, float)) or isinstance(args[0], bool):
        raise PyRefuse("round() needs a number")
    return round(args[0], int(args[1])) if len(args) == 2 else round(args[0])


def _b_minmax(fn, name):
    def h(ip, args, kw):
        if kw or not args:
            raise PyRefuse(f"{name}() needs positional values")
        vals = list(args[0]) if len(args) == 1 and isinstance(
            args[0], (list, tuple, set, str)) else list(args)
        if not all(isinstance(x, (int, float)) and
                   not isinstance(x, bool) for x in vals):
            raise PyRefuse(f"{name}() compares numbers in the taught "
                           f"subset")
        return fn(vals)
    return h


def _b_sum(ip, args, kw):
    if len(args) != 1 or not isinstance(args[0], (list, tuple)):
        raise PyRefuse("sum() takes one list/tuple")
    vals = args[0]
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool)
               for x in vals):
        raise PyRefuse("sum() adds numbers in the taught subset")
    return sum(vals)


def _b_sorted(ip, args, kw):
    if len(args) != 1 or kw or not isinstance(args[0], (list, tuple)):
        raise PyRefuse("sorted() takes one list/tuple")
    vals = list(args[0])
    if all(isinstance(x, (int, float)) and not isinstance(x, bool)
           for x in vals):
        return sorted(vals)
    if all(isinstance(x, str) for x in vals):
        return sorted(vals)
    raise PyRefuse("sorted() needs one comparable kind")


def _b_type(ip, args, kw):
    (v,) = args
    return _TypeTag(_type_name(v))


def _b_ord(ip, args, kw):
    (v,) = args
    if not isinstance(v, str) or len(v) != 1:
        raise PyRefuse("ord() needs a single character")
    return ord(v)


def _b_chr(ip, args, kw):
    (v,) = args
    if not isinstance(v, int) or isinstance(v, bool):
        raise PyRefuse("chr() needs an integer code")
    try:
        return chr(v)
    except Exception as e:
        raise PyRefuse(f"chr() failed: {e}")


def _b_pow(ip, args, kw):
    if len(args) != 2 or kw:
        raise PyRefuse("pow() takes two arguments")
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool)
               for x in args):
        raise PyRefuse("pow() needs numbers")
    return args[0] ** args[1]


def _b_reversed(ip, args, kw):
    (v,) = args
    if isinstance(v, str):
        return v[::-1]
    if isinstance(v, (list, tuple)):
        return type(v)(reversed(v))
    raise PyRefuse("reversed() works on str/list/tuple here")


def _b_enumerate(ip, args, kw):
    if len(args) != 1:
        raise PyRefuse("enumerate() takes one iterable")
    return [(i, v) for i, v in enumerate(ip.iterate(args[0]))]


def _b_input(ip, args, kw):
    raise PyRefuse("input() needs data the question does not state")


def _b_abs_refuse(name):
    def h(ip, args, kw):
        raise PyRefuse(f"{name} is outside the taught subset")
    return h


_BUILTINS: Dict[str, Any] = {
    "print": _b_print, "range": _b_range,
    "int": _cast("int"), "float": _cast("float"), "str": _cast("str"),
    "bool": _cast("bool"), "list": _cast("list"), "tuple": _cast("tuple"),
    "dict": _cast("dict"), "set": _cast("set"),
    "len": _b_len, "abs": _b_abs, "round": _b_round,
    "min": _b_minmax(min, "min"), "max": _b_minmax(max, "max"),
    "sum": _b_sum, "sorted": _b_sorted, "type": _b_type,
    "ord": _b_ord, "chr": _b_chr, "pow": _b_pow,
    "reversed": _b_reversed, "enumerate": _b_enumerate,
    "input": _b_input,
}


# -- method tables -------------------------------------------------------- #

def _str_m(fn):
    def h(ip, obj, args):
        if any(isinstance(a, (list, dict, set)) for a in args):
            raise PyRefuse("that argument kind is outside the taught "
                           "subset")
        return fn(obj, *args)
    return h


_STR_METHODS = {
    "upper": _str_m(str.upper), "lower": _str_m(str.lower),
    "strip": _str_m(str.strip), "lstrip": _str_m(str.lstrip),
    "rstrip": _str_m(str.rstrip), "title": _str_m(str.title),
    "capitalize": _str_m(str.capitalize),
    "swapcase": _str_m(str.swapcase),
    "isdigit": _str_m(str.isdigit), "isalpha": _str_m(str.isalpha),
    "isalnum": _str_m(str.isalnum), "isspace": _str_m(str.isspace),
    "islower": _str_m(str.islower), "isupper": _str_m(str.isupper),
    "split": _str_m(str.split), "rsplit": _str_m(str.rsplit),
    "join": _str_m(str.join),
    "replace": _str_m(str.replace), "find": _str_m(str.find),
    "rfind": _str_m(str.rfind), "index": _str_m(str.index),
    "count": _str_m(str.count), "startswith": _str_m(str.startswith),
    "endswith": _str_m(str.endswith),
    "center": _str_m(str.center), "ljust": _str_m(str.ljust),
    "rjust": _str_m(str.rjust), "zfill": _str_m(str.zfill),
}


def _list_m(fn):
    def h(ip, obj, args):
        return fn(obj, *args)
    return h


def _l_sort(ip, obj, args):
    if args:
        raise PyRefuse("sort() takes no arguments in the taught subset")
    if all(isinstance(x, (int, float)) and not isinstance(x, bool)
           for x in obj):
        obj.sort()
        return None
    if all(isinstance(x, str) for x in obj):
        obj.sort()
        return None
    raise PyRefuse("sort() needs one comparable kind")


_LIST_METHODS = {
    "append": _list_m(lambda o, v: o.append(v)),
    "extend": _list_m(lambda o, v: o.extend(ip_iter(v))),
    "insert": _list_m(lambda o, i, v: o.insert(int(i), v)),
    "remove": _list_m(lambda o, v: o.remove(v)),
    "pop": _list_m(lambda o, i=None: o.pop() if i is None else o.pop(int(i))),
    "clear": _list_m(lambda o: o.clear()),
    "index": _list_m(lambda o, v: o.index(v)),
    "count": _list_m(lambda o, v: o.count(v)),
    "reverse": _list_m(lambda o: o.reverse()),
    "copy": _list_m(lambda o: o.copy()),
    "sort": _l_sort,
}


def ip_iter(v):
    if isinstance(v, (list, tuple, str)):
        return list(v)
    raise PyRefuse("extend() needs a list/tuple/str")


_DICT_METHODS = {
    "keys": _list_m(lambda o: list(o.keys())),
    "values": _list_m(lambda o: list(o.values())),
    "items": _list_m(lambda o: list(o.items())),
    "get": _list_m(lambda o, k, d=None: o.get(k, d)),
    "pop": _list_m(lambda o, k: o.pop(k)),
    "update": _list_m(lambda o, v: o.update(v)),
    "clear": _list_m(lambda o: o.clear()),
    "setdefault": _list_m(lambda o, k, d=None: o.setdefault(k, d)),
}

_TUPLE_METHODS = {
    "index": _list_m(lambda o, v: o.index(v)),
    "count": _list_m(lambda o, v: o.count(v)),
}


def py_output(src: str) -> Tuple[str, List[str]]:
    """Run a taught-subset snippet -> (printed output, steps).
    Raises PyRefuse (outside subset) or PyBudget (too long)."""
    # flattened source (newlines typed as literal backslash-n) is
    # re-widened before parsing -- deterministic, and only fires when
    # no real newline exists
    if "\n" not in src and "\\n" in src:
        src = src.replace("\\n", "\n")
    try:
        ip = _Interp(src)
    except SyntaxError as e:
        raise PyRefuse(f"snippet does not parse: {e.msg}")
    out = ip.run()
    steps = [
        "Method: execute the snippet statement by statement in the "
        "taught Python subset, tracking every variable's value and "
        "type as it changes.",
        "Given: the snippet source as printed in the question.",
    ]
    for ln in [ln for ln in src.strip().splitlines() if ln.strip()][:8]:
        steps.append("Run: " + ln.strip())
    steps.append("Check: the printed text is exactly what the print() "
                 "calls emit, in order, with Python's str() formatting "
                 "per value.")
    steps.append("Interpretation: the output above is the program's "
                 "complete printed result.")
    return out, steps


# --------------------------------------------------------------------------- #
# code extraction from a question
# --------------------------------------------------------------------------- #

_FENCE_RE = re.compile(r"```(?:python|py)?\s*\n(.*?)```", re.S)
_INLINE_RE = re.compile(r"`([^`\n]{2,160})`")
_OUT_OF_RE = re.compile(
    r"(?:output|value|result)\s+(?:of|for)\s*[:\-]?\s*(.+?)(?:\s+in\s+"
    r"[Pp]ython|\s+in\s+MySQL\s*$|$)")


def extract_code(question: str) -> Optional[str]:
    """Fenced block first, then inline backtick code, then 'output of: X'.
    Deterministic; returns the FIRST candidate that parses, else the
    first candidate."""
    m = _FENCE_RE.search(question or "")
    if m:
        return m.group(1).strip("\n")
    inl = _INLINE_RE.findall(question or "")
    for cand in inl:
        cand = cand.strip()
        if _looks_like_code(cand):
            return cand
    m = _OUT_OF_RE.search(question or "")
    if m:
        cand = m.group(1).strip().strip("`").strip()
        if cand and _looks_like_code(cand):
            return cand
    return (inl[0].strip() if inl else None)


def _looks_like_code(c: str) -> bool:
    if not c:
        return False
    if len(c.splitlines()) > 12:
        return False
    low = c.lower()
    if any(b in low for b in ("import ", "input(", "__", "open(", "exec(",
                              "eval(", "os.", "system(", "select ",
                              "insert into", "create table")):
        return False
    return bool(re.search(r"[(){}\[\]=+\-*/%]", c))


# --------------------------------------------------------------------------- #
# data-structure simulators (pure, testable)
# --------------------------------------------------------------------------- #

def parse_stack_ops(text: str) -> List[Tuple[str, Any]]:
    """push(x)/pop()/peek() sequence in written order (parenthesised
    operation lists only -- prose mentions of 'top' must not match)."""
    ops: List[Tuple[str, Any]] = []
    for m in re.finditer(
            r"\b(push|pop|peek|top)\s*\(\s*([^)]*?)\s*\)", text, re.I):
        op = m.group(1).lower()
        arg = m.group(2)
        if op == "push":
            if arg == "":
                return []
            v = _atom(arg)
            if v is None:
                return []
            ops.append(("push", v))
        else:
            ops.append((op, None))
    return ops


def _atom(s: str):
    s = s.strip().strip("'\"")
    if re.fullmatch(r"-?\d+", s):
        return int(s)
    if re.fullmatch(r"-?\d+\.\d*", s):
        return float(s)
    if re.fullmatch(r"[A-Za-z_]\w*", s):
        return s
    return None


def simulate_stack(ops: List[Tuple[str, Any]], capacity: Optional[int] = None
                   ) -> Dict[str, Any]:
    st: List[Any] = []
    errors: List[str] = []
    trace: List[str] = []
    for i, (op, v) in enumerate(ops, 1):
        if op == "push":
            if capacity is not None and len(st) >= capacity:
                errors.append(f"step {i}: push {v} -- OVERFLOW (stack "
                              f"full at capacity {capacity})")
                trace.append(f"push {v}: OVERFLOW, stack unchanged "
                             f"{_stack_str(st)}")
                continue
            st.append(v)
            trace.append(f"push {v}: {_stack_str(st)} (top = {st[-1]})")
        elif op == "pop":
            if not st:
                errors.append(f"step {i}: pop -- UNDERFLOW (stack empty)")
                trace.append("pop: UNDERFLOW, stack unchanged")
            else:
                got = st.pop()
                tail = f", now top = {st[-1]}" if st else \
                    ", stack now empty"
                trace.append(f"pop: removed {got}{tail}")
        else:  # peek/top
            if not st:
                errors.append(f"step {i}: {op} -- UNDERFLOW (stack empty)")
                trace.append(f"{op}: UNDERFLOW, stack empty")
            else:
                trace.append(f"{op}: reads top = {st[-1]} (unchanged)")
    return {"stack": st, "errors": errors, "trace": trace,
            "top": st[-1] if st else None}


def _stack_str(st: List[Any]) -> str:
    if not st:
        return "[] (empty)"
    return "[" + ", ".join(str(x) for x in st) + "]  (top = " \
        + str(st[-1]) + ")"


def parse_queue_ops(text: str) -> List[Tuple[str, Any]]:
    ops: List[Tuple[str, Any]] = []
    for m in re.finditer(
            r"\b(en ?queue|de ?queue|insert|delete|add|remove)"
            r"\s*\(\s*([^)]*?)\s*\)", text, re.I):
        op = m.group(1).lower().replace(" ", "")
        arg = m.group(2)
        if op in ("enqueue", "insert", "add"):
            if arg == "":
                return []
            v = _atom(arg)
            if v is None:
                return []
            ops.append(("enq", v))
        else:
            ops.append(("deq", None))
    return ops


def simulate_queue(ops: List[Tuple[str, Any]], capacity: Optional[int] = None,
                   circular: bool = False) -> Dict[str, Any]:
    q: List[Any] = []
    errors: List[str] = []
    trace: List[str] = []
    for i, (op, v) in enumerate(ops, 1):
        if op == "enq":
            if capacity is not None and len(q) >= capacity:
                errors.append(f"step {i}: insert {v} -- OVERFLOW (queue "
                              f"full at capacity {capacity})")
                trace.append(f"insert {v}: OVERFLOW, queue unchanged")
                continue
            q.append(v)
            trace.append(f"insert {v} at rear: {_queue_str(q)}")
        else:
            if not q:
                errors.append(f"step {i}: delete -- UNDERFLOW (queue "
                              f"empty)")
                trace.append("delete: UNDERFLOW, queue unchanged")
            else:
                got = q.pop(0)
                tail = f", now front = {q[0]}" if q else \
                    ", queue now empty"
                trace.append(f"delete from front: removed {got}{tail}")
    return {"queue": q, "errors": errors, "trace": trace,
            "front": q[0] if q else None,
            "rear": q[-1] if q else None}


def _queue_str(q: List[Any]) -> str:
    if not q:
        return "[] (empty)"
    return "[" + ", ".join(str(x) for x in q) + "]  (front = " \
        + str(q[0]) + ", rear = " + str(q[-1]) + ")"


def parse_value_list(text: str, col_hint: Optional[str] = None
                     ) -> List[Any]:
    """'The CITY column has values: 'Delhi', 'Mumbai', NULL' -> list
    with None for NULL.  Both word orders (column before or after the
    name) are accepted."""
    pat = (r"`?(\w+)`?\s+[Cc]olumn\s+has\s+(?:the\s+)?values?\s*[:\-]"
           r"\s*([^.?!;]+)")
    m = re.search(pat, text)
    if not m:
        pat2 = (r"[Cc]olumn\s+(?:of\s+)?`?(\w+)`?\s+has\s+(?:the\s+)?"
                r"values?\s*[:\-]\s*([^.?!;]+)")
        m = re.search(pat2, text)
    if not m:
        return []
    col, raw = m.group(1), m.group(2)
    out: List[Any] = []
    for tok in re.findall(r"'([^']*)'|\"([^\"]*)\"|(NULL|null|Null)|"
                          r"(-?\d+(?:\.\d+)?)", raw):
        if tok[0] or tok[1]:
            out.append(tok[0] or tok[1])
        elif tok[2]:
            out.append(None)
        else:
            out.append(float(tok[3]) if "." in tok[3] else int(tok[3]))
    return out


def sql_aggregate(values: List[Any], fn: str, distinct: bool
                  ) -> Dict[str, Any]:
    non_null = [v for v in values if v is not None]
    if distinct:
        seen, dd = set(), []
        for v in non_null:
            if v not in seen:
                seen.add(v)
                dd.append(v)
        non_null = dd
    f = fn.upper()
    if f == "COUNT":
        return {"value": len(non_null), "used": non_null}
    if not non_null:
        return {"value": None, "used": []}
    nums = [v for v in non_null if isinstance(v, (int, float))]
    if len(nums) != len(non_null):
        raise PyRefuse("non-numeric aggregate outside the taught subset")
    if f == "SUM":
        return {"value": sum(nums), "used": non_null}
    if f == "AVG":
        return {"value": sum(nums) / len(nums), "used": non_null}
    if f == "MIN":
        return {"value": min(nums), "used": non_null}
    if f == "MAX":
        return {"value": max(nums), "used": non_null}
    raise PyRefuse("aggregate function outside the taught subset")


def parse_join_rows(text: str, table_letter: str) -> List[List[Any]]:
    """'Table A has rows (1,'a'), (2,'b')' -> [[1,'a'],[2,'b']]."""
    m = re.search(r"[Tt]able[s]?\s+`?" + table_letter + r"`?\s*\([^)]*\)"
                  r"[^.]*?has\s+(?:the\s+following\s+)?rows?\s*[:\-]?\s*"
                  r"([^.]+?)(?:\.|$)", text)
    if not m:
        m = re.search(r"[Tt]able\s+`?" + table_letter +
                      r"`?\s+has\s+rows?\s*[:\-]?\s*([^.]+?)(?:\.|$)",
                      text)
    if not m:
        return []
    rows = []
    for tup in re.findall(r"\(([^()]*)\)", m.group(1)):
        vals = []
        for tok in re.findall(r"'([^']*)'|\"([^\"]*)\"|(-?\d+(?:\.\d+)?)"
                              r"|(NULL|null)", tup):
            if tok[0] or tok[1]:
                vals.append(tok[0] or tok[1])
            elif tok[3]:
                vals.append(None)
            else:
                vals.append(float(tok[2]) if "." in tok[2] else int(tok[2]))
        rows.append(vals)
    return rows


def sql_left_join(rows_a: List[List[Any]], rows_b: List[List[Any]],
                  key_a: int, key_b: int) -> List[List[Any]]:
    out = []
    b_by_key: Dict[Any, List[List[Any]]] = {}
    for rb in rows_b:
        if key_b < len(rb):
            b_by_key.setdefault(rb[key_b], []).append(rb)
    for ra in rows_a:
        ka = ra[key_a] if key_a < len(ra) else None
        matches = b_by_key.get(ka, [])
        if matches:
            for rb in matches:
                out.append(ra + rb)
        else:
            out.append(ra + [None] * len(rows_b[0] if rows_b else [0]))
    return out


# --------------------------------------------------------------------------- #
# SQL clause / keyword purpose facts (closed world, deterministic)
# --------------------------------------------------------------------------- #

_SQL_FACTS: List[Tuple[str, str, str]] = [
    # (FID-suffix, answer term, purpose phrases that uniquely ask it)
    ("WHERE", "WHERE",
     [r"filter\s+(?:the\s+)?rows\s+before\s+grouping",
      r"filter\s+(?:individual\s+)?rows?\s+(?:based\s+on|before)",
      r"restrict\s+(?:the\s+)?rows?\b",
      r"clause\s+filters?\s+rows\b",
      r"condition\s+on\s+(?:individual\s+)?rows"]),
    ("HAVING", "HAVING",
     [r"filter\s+(?:the\s+)?groups?", r"filter\s+(?:after|based\s+on"
      r"\s+(?:the\s+)?(?:result\s+of\s+)?(?:an?\s+)?aggregat\w+)",
      r"condition\s+on\s+(?:each\s+)?group",
      r"clause\s+(?:is\s+)?used\s+with\s+GROUP\s+BY\s+to"]),
    ("GROUP_BY", "GROUP BY",
     [r"group\s+(?:the\s+)?rows?\s+(?:by|for\s+aggregat\w+|before)",
      r"clause\s+groups?\s+rows?",
      r"aggregat\w+(?:\s+functions?)?\s+(?:per|for\s+each)\s+"
      r"(?:column|group|category)"]),
    ("ORDER_BY", "ORDER BY",
     [r"sort\s+(?:the\s+)?(?:result|rows|records|output|data)",
      r"arrange\s+(?:the\s+)?(?:result|rows|records)"]),
    ("DISTINCT", "DISTINCT",
     [r"(?:remove|eliminate|suppress)\s+duplicates?",
      r"duplicate\s+(?:values|rows)\s+(?:are\s+)?(?:not\s+)?(?:to\s+be"
      r"\s+)?(?:shown|displayed|removed|eliminated)",
      r"only\s+(?:the\s+)?unique\s+(?:values|rows)"]),
    ("COUNT", "COUNT()",
     [r"count\s+(?:the\s+)?(?:number\s+of\s+)?rows",
      r"function\s+counts?\s+(?:the\s+)?rows"]),
    ("SUM", "SUM()",
     [r"add(?:s)?\s+up\s+(?:the\s+)?(?:values|numeric)",
      r"total\s+of\s+(?:the\s+)?values"]),
    ("AVG", "AVG()",
     [r"average\s+(?:of\s+)?(?:the\s+)?(?:values|column)"]),
    ("MAX", "MAX()", [r"highest\s+(?:value|salary|marks|price)",
                      r"largest\s+value"]),
    ("MIN", "MIN()", [r"lowest\s+(?:value|salary|marks|price)",
                      r"smallest\s+value"]),
    ("LIKE", "LIKE", [r"pattern\s+match\w*", r"wildcard\s+(?:search|"
                      r"match\w*)"]),
    ("BETWEEN", "BETWEEN", [r"(?:values?\s+)?(?:within|in)\s+a\s+range"]),
    ("IN", "IN", [r"match(?:es)?\s+any\s+value\s+in\s+a\s+list"]),
    ("IS_NULL", "IS NULL", [r"(?:check|test|find)\w*\s+(?:for\s+)?"
                            r"missing\s+(?:values?|entries)"]),
    ("PRIMARY_KEY", "PRIMARY KEY",
     [r"uniquely\s+identif\w+\s+(?:each|a|every)\s+(?:row|record)"]),
    ("FOREIGN_KEY", "FOREIGN KEY",
     [r"(?:link|refer\w*)\w*\s+(?:two\s+)?tables?\b",
      r"enforce\w*\s+referential\s+integrity"]),
    ("JOIN", "JOIN",
     [r"combin\w+\s+(?:rows|data)\s+from\s+(?:two|multiple|related)"
      r"\s+tables?"]),
    ("DELETE", "DELETE", [r"remove\s+(?:existing\s+)?rows?\s+from\s+a"
                          r"\s+table"]),
    ("UPDATE", "UPDATE", [r"(?:modify|change)\s+(?:existing\s+)?"
                          r"(?:values|data|rows?)\s+in\s+a\s+table"]),
    ("INSERT", "INSERT", [r"add\s+(?:new\s+)?rows?\s+to\s+a\s+table"]),
    ("ALTER", "ALTER", [r"(?:modify|change)\s+the\s+(?:table\s+)?"
                        r"structure"]),
    ("DROP", "DROP", [r"(?:delete|remove)\s+(?:the\s+)?(?:entire\s+)?"
                      r"table\s+(?:itself|from\s+the\s+database)"]),
    ("TRUNCATE", "TRUNCATE",
     [r"remove\s+all\s+rows?\s+(?:but\s+keep|while\s+keeping)"]),
    ("ORDER_DESC", "ORDER BY ... DESC",
     [r"sort\w*\s+(?:in\s+)?descending"]),
    ("UNION", "UNION", [r"combin\w+\s+(?:the\s+)?results?\s+of\s+two"
                        r"\s+(?:or\s+more\s+)?SELECT"]),
    ("LIMIT", "LIMIT", [r"restrict\w*\s+(?:the\s+)?number\s+of\s+rows"
                        r"\s+(?:in|returned\s+by)\s+the\s+result"]),
    ("NOT_NULL", "NOT NULL", [r"ensure\w*\s+a\s+column\s+always\s+has"
                              r"\s+a\s+value"]),
    ("DEFAULT", "DEFAULT", [r"supply\w*\s+a\s+value\s+when\s+none\s+"
                            r"is\s+given"]),
    ("VIEW", "VIEW", [r"virtual\s+table\s+based\s+on\s+a\s+query"]),
    ("INDEX", "INDEX", [r"speed\s+up\s+(?:data\s+)?retrieval"]),
]


def sql_clause_answer(text: str) -> Optional[Tuple[str, str]]:
    """Exactly-one-purpose match -> (term, fid).  Zero or 2+ matches ->
    None (honest gate)."""
    hits = []
    for fid, term, pats in _SQL_FACTS:
        if any(re.search(p, text, re.I) for p in pats):
            hits.append((fid, term))
    if len(hits) == 1:
        return hits[0]
    return None


# --------------------------------------------------------------------------- #
# family computes
# --------------------------------------------------------------------------- #

_PY_ASK_RE = re.compile(
    r"(?:what(?:\s+will)?\s+(?:is|be)\s+(?:the\s+)?output|predict\s+the"
    r"\s+output|write\s+the\s+output|what\s+does\s+(?:this|the)\s+code"
    r"\s+(?:print|output)|trace\s+the\s+(?:code|output|execution))",
    re.I)


def _c_py_trace(g, m, t):
    low = t.lower()
    if "mysql" in low or "sql" in low.split("python")[0][:40]:
        return _GATE
    src = extract_code(t)
    if not src or not _PY_ASK_RE.search(t) and "print" not in src \
            and not re.search(r"\bfor\b|\bwhile\b", src):
        return _GATE
    # multi-statement code MUST carry an output ask; bare prints too
    try:
        out, steps = py_output(src)
    except PyRefuse:
        return _GATE
    except PyBudget:
        return _GATE
    except RecursionError:
        return _GATE
    shown = out.rstrip("\n")
    if not shown.strip():
        return _GATE
    lines = [ln for ln in shown.split("\n")]
    ans = "output:\n" + "\n".join(lines)
    return (None, steps, ans, None, "taught-subset Python execution",
            {})


def _c_py_expr(g, m, t):
    # single bare expression or print(expr) with an output/value ask
    if not re.search(r"output|value\s+of|evaluat|result\s+of|print\s*"
                     r"\(", t, re.I):
        return _GATE
    src = extract_code(t)
    if not src or "\n" in src.strip():
        return _GATE
    src = src.strip()
    if re.search(r"\b(import|input|while|for|if|def|class)\b", src):
        return _GATE
    if not _looks_like_code(src):
        return _GATE
    # normalise print(...) -> the printed text; plain expr -> repr
    try:
        if src.startswith("print(") and src.endswith(")"):
            out, steps = py_output(src)
            shown = out.rstrip("\n")
            eq = "print() renders each argument with str()"
        else:
            try:
                ip = _Interp(src)
                if len(ip.tree.body) != 1 or \
                        not isinstance(ip.tree.body[0], ast.Expr):
                    return _GATE
                v = ip.eval(ip.tree.body[0].value, ip.env)
            except (SyntaxError, PyRefuse, PyBudget, RecursionError):
                return _GATE
            shown = py_repr(v)
            steps = [
                "Method: evaluate the expression with Python's operator "
                "rules (// is floor division, % is remainder, ** is "
                "power, / always gives a float).",
                f"Given: the expression {src}.",
                f"Value: {shown}.",
                "Check: operator precedence and Python's numeric rules "
                "applied step by step give the same value.",
                "Interpretation: this is the exact value Python "
                "produces.",
            ]
            eq = "taught-subset expression evaluation"
    except (PyRefuse, PyBudget):
        return _GATE
    if not shown:
        return _GATE
    return (None, steps, shown, None, eq, {})


def _c_py_type(g, m, t):
    if not re.search(r"data\s*type|\btype\s*\(|which\s+type|what\s+type",
                     t, re.I):
        return _GATE
    # form 1: "type(3.0)" or code present -> run it, quote the result
    src = extract_code(t)
    if src and "type" in src:
        try:
            out, steps = py_output(src)
        except (PyRefuse, PyBudget):
            out, steps = None, None
        if out is not None and out.strip():
            return (None, steps, out.rstrip("\n"), None,
                    "type() reports the object's class", {})
    # form 2: "What data type is the value 3.14?"
    m2 = re.search(
        r"(?:data\s*type|type)\s+(?:is\s+)?(?:of\s+)?(?:the\s+)?"
        r"(?:value\s+)?(?:of\s+)?(?:`?)(-?\d+\.?\d*|True|False|None|"
        r"'[^']*'|\"[^\"]*\"|\[[^\]]*\]|\([^)]*\)|\{[^}]*\})", t, re.I)
    if not m2:
        return _GATE
    lit = m2.group(1)
    try:
        v = ast.literal_eval(lit)
    except Exception:
        return _GATE
    name = _type_name(v)
    pretty = {"bool": "Boolean (bool)", "int": "integer (int)",
              "float": "float (decimal, float)", "str": "string (str)",
              "list": "list", "tuple": "tuple", "dict": "dictionary"
              " (dict)", "NoneType": "NoneType"}.get(name, name)
    steps = [
        "Method: read the literal's written form -- quotes make a "
        "string, a decimal point makes a float, True/False are "
        "Booleans, a whole number without a decimal point is an int.",
        f"Given: the value {lit}.",
        f"Its Python type is {name}.",
        f"Check: type({lit}) in Python reports <class '{name}'>, the "
        f"same classification.",
        f"Interpretation: {lit} is a {pretty}.",
    ]
    return (None, steps, f"{lit} has type {name} ({pretty})", None,
            "literal classification", {})


def _c_sql_clause(g, m, t):
    low = t.lower()
    if not re.search(r"\bclause\b|\bkeyword\b|\bcommand\b|\bstatement\b"
                     r"|\bfunction\b|\bkey\b", low):
        return _GATE
    if not re.search(r"which|what|name\s+the|state\s+the|identify\s+the",
                     low):
        return _GATE
    hit = sql_clause_answer(t)
    if not hit:
        return _GATE
    fid, term = hit
    purpose = _purpose_phrase(t)
    steps = [
        "Method: match the asked purpose to the SQL clause/keyword "
        "that provides exactly it (closed world: the clauses taught in "
        "the lesson).",
        f"Given: the ask -- {purpose or t.strip()[:90]}.",
        f"The clause/keyword is {term}.",
        f"Check: {term}'s definition in the lesson matches the asked "
        f"purpose one-to-one; no other taught clause provides it.",
        f"Interpretation: use {term} for this purpose.",
    ]
    return (None, steps, term, None, f"SQL purpose fact: {term}", {})


def _purpose_phrase(t: str) -> str:
    m = re.search(r"(?:used\s+to|that)\s+([^?]{6,110})", t)
    return m.group(1).strip() if m else ""


def _c_sql_aggr(g, m, t):
    qm = re.search(
        r"SELECT\s+(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(DISTINCT\s+)?"
        r"(\w+|\*)\s*\)", t, re.I)
    if not qm:
        return _GATE
    fn, distinct, col = (qm.group(1).upper(),
                         bool(qm.group(2)), qm.group(3))
    values = parse_value_list(t, None if col == "*" else col)
    if not values:
        return _GATE
    if col != "*" and re.search(
            r"\b" + re.escape(col) + r"\b\s+column", t, re.I) is None \
            and re.search(r"`?" + re.escape(col) + r"`?\s+has", t,
                          re.I) is None:
        # the stated value column must be the aggregated column
        return _GATE
    try:
        r = sql_aggregate(values, fn, distinct)
    except Exception:
        return _GATE
    val = r["value"]
    if val is None:
        return _GATE
    nulls = values.count(None)
    comp = [f"Non-NULL values considered: "
            f"{[repr(v) if isinstance(v, str) else v for v in r['used']]}"
            f" ({len(r['used'])} of {len(values)})"]
    if fn == "COUNT":
        if distinct:
            comp.append("COUNT(DISTINCT col) ignores duplicates AND "
                        "NULLs; only distinct non-NULL values are "
                        "counted.")
            interp = ("The query returns " + str(int(val)) + ": NULLs "
                      "are never counted by COUNT(column), and "
                      "DISTINCT collapses repeated values.")
        else:
            comp.append("COUNT(col) ignores NULLs -- they are not "
                        "rows of data for the aggregate.")
            interp = ("The query returns " + str(int(val)) + ": the "
                      + str(nulls) + " NULL " + ("value" if nulls == 1
                                                 else "values") +
                      " are skipped.")
    else:
        comp.append(f"{fn} over the non-NULL values = {val:g}")
        interp = (f"{fn} ignores the {nulls} NULL "
                  f"{'value' if nulls == 1 else 'values'} and returns "
                  f"{val:g}.")
    steps = [
        "Method: apply SQL aggregate semantics -- every aggregate "
        "except COUNT(*) discards NULLs first; DISTINCT collapses "
        "duplicates before the aggregate runs.",
        f"Given: the column values stated in the question: "
        f"{[repr(v) if isinstance(v, str) else v for v in values]}.",
    ]
    steps.extend(comp)
    steps.append("Check: count the listed values by hand against the "
                 "rule (NULL dropped, duplicates merged when DISTINCT) "
                 "-- the same number results.")
    steps.append("Interpretation: " + interp)
    shown = int(val) if float(val).is_integer() else round(float(val), 6)
    return (float(shown), steps, f"result = {shown}", None,
            f"{fn}{'(DISTINCT)' if distinct else ''} SQL semantics",
            {"n_values": len(values), "nulls": nulls})


def _c_sql_join(g, m, t):
    low = t.lower()
    m_rows = re.findall(
        r"[Tt]able\s*`?(\w+)`?\s*(?:\([^)]*\))?\s*(?:has|contains|with)"
        r"\s*(?:the\s+following\s+|exactly\s+)?(\d+)\s*rows?", t)
    if re.search(r"cross\s+join", low):
        if len(m_rows) >= 2:
            a, n_a = m_rows[0][0], int(m_rows[0][1])
            b, n_b = m_rows[1][0], int(m_rows[1][1])
            total = n_a * n_b
            steps = [
                "Method: a CROSS JOIN pairs every row of the first "
                "table with every row of the second, so the result has "
                "rows(A) x rows(B) rows -- no join condition exists to "
                "filter pairs.",
                f"Given: {a} has {n_a} rows, {b} has {n_b} rows.",
                f"Result rows = {n_a} x {n_b} = {total}.",
                f"Check: each of the {n_a} left rows pairs with all "
                f"{n_b} right rows; {n_a} groups of {n_b} is {total}.",
                f"Interpretation: the expectation of fewer than "
                f"{total} rows misreads CROSS JOIN -- the exact result "
                f"size is {total} rows.",
            ]
            return (float(total), steps, f"result has {total} rows",
                    None, "CROSS JOIN size = m x n",
                    {"m": n_a, "n": n_b})
        return _GATE
    if re.search(r"left\s+(?:outer\s+)?join", low):
        rows_a = parse_join_rows(t, "A")
        rows_b = parse_join_rows(t, "B")
        if not rows_a or not rows_b:
            return _GATE
        onm = re.search(r"ON\s+`?(\w+)`?\.(\w+)\s*=\s*`?(\w+)`?\.(\w+)",
                        t, re.I)
        if not onm:
            return _GATE
        lt, lcol, rt, rcol = onm.group(1), onm.group(2), \
            onm.group(3), onm.group(4)
        # column index from the declared column lists, default 0
        ia = _col_index(t, lt, lcol)
        ib = _col_index(t, rt, rcol)
        joined = sql_left_join(rows_a, rows_b, ia, ib)
        def _fmt_row(r):
            return "(" + ", ".join("NULL" if v is None else
                                   (f"'{v}'" if isinstance(v, str)
                                    else str(v)) for v in r) + ")"
        matched = sum(1 for ra in rows_a
                      if any((ia < len(ra) and rb[ib] == ra[ia])
                             for rb in rows_b))
        unmatched = len(rows_a) - matched
        steps = [
            "Method: a LEFT JOIN keeps every left-table row; each is "
            "extended with its key matches from the right table, and a "
            "left row with no match is padded with NULLs -- no left "
            "row is ever dropped.",
            f"Given: table {onm.group(1)} rows = "
            f"{[_fmt_row(r) for r in rows_a]}, table {rt} rows = "
            f"{[_fmt_row(r) for r in rows_b]}; join on "
            f"{lt}.{lcol} = {rt}.{rcol}.",
        ]
        steps.extend("Result row: " + _fmt_row(r) for r in joined)
        steps.append(
            f"Check: {matched} of {len(rows_a)} left rows found a key "
            f"match; the {unmatched} without one reappear with NULLs "
            f"-- total {len(joined)} rows.")
        steps.append(
            "Interpretation: the unmatched left row still appears "
            "(padded with NULLs) -- that is exactly what LEFT (OUTER) "
            "JOIN guarantees.")
        return (float(len(joined)), steps,
                ("result rows: " + "; ".join(_fmt_row(r) for r in
                                             joined[:4])
                 + (f" ... ({len(joined)} rows total)"
                    if len(joined) > 4 else ""))[:240],
                None, "LEFT JOIN: keep all left rows, NULL-pad misses",
                {"rows_a": len(rows_a), "rows_b": len(rows_b),
                 "result_rows": len(joined)})
    return _GATE


def _col_index(text: str, table: str, col: str) -> int:
    m = re.search(r"[Tt]able\s*`?" + re.escape(table) +
                  r"`?\s*\(([^)]*)\)", text)
    if m:
        cols = [c.strip().strip("`\"' ") for c in m.group(1).split(",")]
        for i, c in enumerate(cols):
            if c.lower() == col.lower():
                return i
    return 0


def _c_stack(g, m, t):
    if not re.search(r"\bstack\b", t, re.I):
        return _GATE
    ops = parse_stack_ops(t)
    if len(ops) < 3 or sum(1 for o, _ in ops if o == "push") < 2:
        return _GATE
    cap = None
    cm = re.search(r"stack\s+(?:of\s+)?(?:maximum\s+)?(?:size|capacity)"
                   r"\s+(?:of\s+)?(\d+)", t, re.I)
    if cm:
        cap = int(cm.group(1))
    r = simulate_stack(ops, cap)
    if not r["trace"]:
        return _GATE
    comp = list(r["trace"][:12])
    final = _stack_str(r["stack"])
    err_note = (" Errors: " + "; ".join(r["errors"]) + "."
                if r["errors"] else " No overflow or underflow occurs.")
    steps = [
        "Method: apply LIFO -- push adds on top, pop removes the "
        "topmost element, peek/top reads without removing; simulate "
        "the operations in the given order.",
        "Given: an initially empty stack" +
        (f" of capacity {cap}" if cap else "") +
        f" and the operations: " +
        ", ".join(("push " + str(v)) if o == "push" else o
                  for o, v in ops) + ".",
    ]
    steps.extend(comp)
    steps.append("Check: the final contents follow by re-reading the "
                 "trace -- every push adds one entry, every pop removes "
                 "the last-added remaining entry.")
    steps.append("Interpretation: final stack (bottom to top): " +
                 final + "." + err_note)
    top = f"top = {r['top']}, " if r["top"] is not None else ""
    ans = (f"{top}contents (bottom to top): "
           f"{[x for x in r['stack']] or 'empty stack'}"
           + ("; " + "; ".join(r["errors"]) if r["errors"] else ""))
    return (float(len(r["stack"])), steps, ans, None,
            "LIFO stack simulation",
            {"final_size": len(r["stack"]),
             "errors": len(r["errors"])})


def _c_queue(g, m, t):
    if not re.search(r"\bqueue\b", t, re.I):
        return _GATE
    ops = parse_queue_ops(t)
    if len(ops) < 3 or sum(1 for o, _ in ops if o == "enq") < 2:
        return _GATE
    cap = None
    cm = re.search(r"queue\s+(?:of\s+)?(?:maximum\s+)?(?:size|capacity)"
                   r"\s+(?:of\s+)?(\d+)", t, re.I)
    if cm:
        cap = int(cm.group(1))
    r = simulate_queue(ops, cap)
    if not r["trace"]:
        return _GATE
    steps = [
        "Method: apply FIFO -- insert joins at the rear, delete leaves "
        "from the front; simulate the operations in order.",
        "Given: an initially empty queue" +
        (f" of capacity {cap}" if cap else "") + " and operations: " +
        ", ".join(("insert " + str(v)) if o == "enq" else "delete"
                  for o, v in ops) + ".",
    ]
    steps.extend(r["trace"][:12])
    steps.append("Check: every insert grows the queue at the rear and "
                 "every delete shrinks it from the front -- the final "
                 "front-to-rear listing follows directly.")
    steps.append("Interpretation: final queue (front to rear): " +
                 _queue_str(r["queue"]) + "." +
                 (" Errors: " + "; ".join(r["errors"]) + "."
                  if r["errors"] else " No overflow or underflow."))
    fr = f"front = {r['front']}, rear = {r['rear']}, " \
        if r["front"] is not None else ""
    ans = (f"{fr}contents (front to rear): "
           f"{list(r['queue']) or 'empty queue'}"
           + ("; " + "; ".join(r["errors"]) if r["errors"] else ""))
    return (float(len(r["queue"])), steps, ans, None,
            "FIFO queue simulation",
            {"final_size": len(r["queue"]),
             "errors": len(r["errors"])})


def _c_postfix(g, m, t):
    if not re.search(r"postfix|reverse\s+polish", t, re.I):
        return _GATE
    m2 = re.search(r"((?:\d+|[+\-*/^])(?:\s+(?:\d+|[+\-*/^])){2,})", t)
    if not m2:
        return _GATE
    toks = m2.group(1).replace("^", "**").split()
    if not all(re.fullmatch(r"\d+|\*\*|[+\-*/]", tok) for tok in toks):
        return _GATE
    st: List[float] = []
    trace: List[str] = []
    try:
        for tok in toks:
            if re.fullmatch(r"\d+", tok):
                st.append(float(tok))
                trace.append(f"{tok}: push -> {_stack_str(st)}")
            else:
                if len(st) < 2:
                    return _GATE
                b, a = st.pop(), st.pop()
                v = {"+": a + b, "-": a - b, "*": a * b,
                     "/": a / b, "**": a ** b}[tok]
                st.append(v)
                trace.append(f"{tok}: pop {b:g}, pop {a:g}, push "
                             f"{a:g} {tok} {b:g} = {v:g} -> "
                             f"{_stack_str(st)}")
    except Exception:
        return _GATE
    if len(st) != 1:
        return _GATE
    val = st[0]
    shown = int(val) if val.is_integer() else round(val, 6)
    steps = [
        "Method: evaluate postfix with a stack -- operands are pushed; "
        "each operator pops two operands (second-popped is the LEFT "
        "operand), applies, and pushes the result.",
        "Given: the postfix expression " + " ".join(toks) + ".",
    ]
    steps.extend(trace[:12])
    steps.append(f"Check: one value remains on the stack ({shown:g}) -- "
                 f"a well-formed postfix expression leaves exactly one.")
    steps.append(f"Interpretation: the postfix expression evaluates to "
                 f"{shown:g}.")
    return (float(shown), steps, f"result = {shown:g}", None,
            "stack evaluation of postfix expression", {})


# --------------------------------------------------------------------------- #
# family table (trigger -> compute)
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
    # data structures first (their triggers are narrow)
    ("STACK_SIM", r"stack", _c_stack),
    ("QUEUE_SIM", r"queue", _c_queue),
    ("POSTFIX_EVAL", r"postfix|reverse\s+polish", _c_postfix),
    # SQL
    ("SQL_AGGR", r"SELECT\s+", _c_sql_aggr),
    ("SQL_JOIN", r"join", _c_sql_join),
    ("SQL_CLAUSE", r"sql|clause|query|dbms|mysql", _c_sql_clause),
    # python
    ("PY_TYPE", r"data\s*type|\btype\s*\(|which\s+type|what\s+type",
     _c_py_type),
    ("PY_EXPR", r"output|value\s+of|evaluat|print\s*\(", _c_py_expr),
    ("PY_TRACE", r"output|predict|print|trace|code", _c_py_trace),
]

TABLE = [(fid, re.compile(pat, re.I), fn) for fid, pat, fn in _TABLE]


def model_cs_families(text: str) -> ModelResult:
    """Deterministic dispatcher over the CS table (first grounded hit
    wins; a gate refusal continues the scan).  Never calls an LLM and
    never executes untrusted code: the interpreter walks a whitelisted
    AST under a step budget.  No blanket try/except: a bug must crash
    loudly for the auditor."""
    norm = _norm(text or "")
    for fid, pattern, compute in TABLE:
        m = pattern.search(norm)
        if not m:
            continue
        out = compute(m.groupdict(), m, norm)
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue
        return _res(fid, m.groupdict(), value, eq or fid, steps or [],
                    answer=answer, assumptions=assumptions,
                    extra=extra or {})
    return _no("CS", "no CS family matched")
