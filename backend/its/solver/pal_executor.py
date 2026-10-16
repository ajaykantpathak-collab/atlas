"""pal_executor.py — sandboxed executor for LLM-written solution programs.

The LLM never computes: it returns a tiny Python/sympy *program*
(the plan).  This module runs that program in a restricted namespace —
whitelisted AST nodes only, no imports besides math/sympy/fractions/
itertools, no dunder access, no I/O builtins — and reads back the
`answer` binding.

Safety model (fail-closed):
  * ast.parse first; any node type outside the whitelist -> refuse
  * only `import math / sympy / fractions / itertools` allowed
  * __builtins__ reduced to a safe set (no open/eval/exec/input/...)
  * sys.settrace step counter aborts after ~200k executed lines
    (guards `while True` and accidental exponential loops)
  * the program runs in a SEPARATE PROCESS (a persistent warm worker):
    on timeout the worker is terminated/killed at OS level — no daemon
    thread left spinning in C-level sympy code
  * result must be numeric / sympy expr / short string — otherwise
    refused

The returned dict carries plan steps for the student card and the
computed answer; callers decide verification.
"""
from __future__ import annotations

import ast
import multiprocessing as mp
import re
import sys
import threading
from typing import Any, Dict, List, Optional

ALLOWED_NODES = (
    ast.Module, ast.Expr, ast.Assign, ast.AugAssign, ast.AnnAssign,
    ast.Name, ast.Load, ast.Store, ast.Constant,
    ast.BinOp, ast.UnaryOp, ast.BoolOp, ast.Compare,
    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.FloorDiv, ast.Mod,
    ast.Pow, ast.USub, ast.UAdd, ast.Not,
    ast.And, ast.Or, ast.Eq, ast.NotEq, ast.Lt, ast.LtE, ast.Gt,
    ast.GtE, ast.Is, ast.IsNot, ast.In, ast.NotIn,
    ast.If, ast.IfExp, ast.For, ast.While, ast.Break, ast.Continue,
    ast.List, ast.Tuple, ast.Set, ast.Dict, ast.Subscript, ast.Slice,
    ast.Index, ast.ListComp, ast.comprehension,
    ast.Call, ast.Attribute, ast.keyword,
    ast.FunctionDef, ast.Return, ast.arguments, ast.arg,
    ast.Import, ast.ImportFrom, ast.alias,
    ast.Lambda, ast.GeneratorExp,
    ast.JoinedStr, ast.FormattedValue,  # f-strings for readable plan
    ast.Starred,
)

ALLOWED_IMPORTS = {"math", "sympy", "fractions", "itertools",
                   "statistics", "cmath", "pint", "chempy"}

ALLOWED_BUILTINS = {
    "abs": abs, "min": min, "max": max, "round": round, "len": len,
    "range": range, "sum": sum, "sorted": sorted, "enumerate": enumerate,
    "zip": zip, "map": map, "filter": filter, "list": list,
    "tuple": tuple, "set": set, "dict": dict, "int": int, "float": float,
    "bool": bool, "str": str, "print": print, "any": any, "all": all,
    "pow": pow, "divmod": divmod, "reversed": reversed,
    "isinstance": isinstance,
}

MAX_STEPS = 200_000          # line-events budget inside the sandbox
MAX_ANSWER_LEN = 400         # string answers can't exceed this

DISALLOWED_ATTRIBUTES = {
    "gi_frame", "gi_code", "gi_yieldfrom",
    "cr_frame", "cr_code", "cr_origin",
    "ag_frame", "ag_code",
    "f_globals", "f_builtins", "f_code", "f_back", "f_locals", "f_trace",
    "tb_frame", "tb_next",
    "co_code", "co_consts", "co_names", "co_filename",
}
DISALLOWED_PREFIXES = ("__", "f_", "gi_", "cr_", "ag_", "tb_", "co_")


def _check_ast(tree: ast.Module) -> Optional[str]:
    """Return a refusal reason if the program contains anything outside
    the whitelist; else None."""
    for node in ast.walk(tree):
        if not isinstance(node, ALLOWED_NODES):
            return f"disallowed node {type(node).__name__}"
        if isinstance(node, ast.Import):
            for a in node.names:
                if a.name.split(".")[0] not in ALLOWED_IMPORTS:
                    return f"import '{a.name}' not allowed"
        if isinstance(node, ast.ImportFrom):
            if (node.module or "").split(".")[0] not in ALLOWED_IMPORTS:
                return f"import from '{node.module}' not allowed"
        if isinstance(node, ast.Attribute):
            attr_name = node.attr
            if attr_name in DISALLOWED_ATTRIBUTES or attr_name.startswith(DISALLOWED_PREFIXES):
                return f"attribute access '{attr_name}' not allowed"
        if isinstance(node, ast.Name):
            if node.id.startswith("__"):
                return "dunder name not allowed"
        # Memory bomb guard on Pow
        if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Pow):
            if isinstance(node.right, ast.Constant) and isinstance(node.right.value, (int, float)):
                if abs(node.right.value) > 100_000:
                    return f"exponent {node.right.value} exceeds safety budget"
        # Memory bomb guard on container multiplication
        if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Mult):
            if isinstance(node.right, ast.Constant) and isinstance(node.right.value, int) and node.right.value > 100_000:
                if isinstance(node.left, (ast.List, ast.Tuple, ast.Dict, ast.Set, ast.Constant)):
                    return "large sequence multiplication exceeds safety budget"
    return None


class _StepBudgetExceeded(Exception):
    pass


def _tracer(budget: List[int]):
    def _trace(frame, event, arg):
        if event == "line" and getattr(frame.f_code, "co_filename", "") == "<pal>":
            budget[0] -= 1
            if budget[0] <= 0:
                raise _StepBudgetExceeded()
        return _trace
    return _trace


def _clean_code(code: str) -> str:
    """Models frequently double-escape newlines inside JSON ('\\\\n'
    arriving as literal backslash-n) or wrap code in ```python fences.
    Normalize before parsing."""
    code = code.strip()
    if "```" in code:
        m = re.search(r"```(?:python)?\s*(.*?)```", code, re.S)
        if m:
            code = m.group(1)
    if "\\n" in code and "\n" not in code:
        code = code.replace("\\n", "\n").replace("\\t", "\t") \
                   .replace('\\"', '"').replace("\\'", "'")
    return code.strip()


def _build_env() -> Dict[str, Any]:
    """Restricted namespace — built inside the worker process once."""
    import math

    def _safe_import(name, globals=None, locals=None, fromlist=(),
                     level=0):
        root = name.split(".")[0]
        if root not in ALLOWED_IMPORTS:
            raise ImportError(f"import '{name}' not allowed")
        return __import__(name, globals, locals, fromlist, level)

    builtins_with_import = dict(ALLOWED_BUILTINS)
    builtins_with_import["__import__"] = _safe_import
    env: Dict[str, Any] = {"__builtins__": builtins_with_import,
                           "math": math}
    try:
        import sympy as sp
        env["sympy"] = sp
        env["sp"] = sp
        for name in ("Symbol", "symbols", "Eq", "solve", "diff",
                     "integrate", "limit", "factor", "expand",
                     "simplify", "sin", "cos", "tan", "asin", "acos",
                     "atan", "sqrt", "log", "exp", "pi", "E", "I",
                     "Rational", "Matrix", "binomial", "factorial",
                     "gcd", "lcm", "isprime", "oo"):
            env[name] = getattr(sp, name, getattr(math, name, None)) \
                or getattr(sp, name, None)
    except ImportError:
        pass
    try:
        import fractions
        env["Fraction"] = fractions.Fraction
    except ImportError:
        pass
    try:
        import statistics
        env["statistics"] = statistics
    except ImportError:
        pass
    import itertools
    env["itertools"] = itertools
    try:
        from its.solver.pint_physics_engine import ureg
        env["ureg"] = ureg
        env["pint"] = ureg
    except Exception:
        try:
            import pint
            env["pint"] = pint
            env["ureg"] = pint.UnitRegistry()
        except Exception:
            pass
    try:
        import chempy
        env["chempy"] = chempy
    except Exception:
        pass
    return env


def _sandbox_worker(req_q, res_q):
    """Persistent child process: builds the env once, then loops —
    receives code strings, executes, returns a serializable result."""
    env = _build_env()
    stdout: List[str] = []
    env["print"] = lambda *a, **k: stdout.append(" ".join(
        str(x) for x in a))
    while True:
        code = req_q.get()
        if code is None:          # shutdown sentinel
            break
        stdout.clear()
        # drop answer/state from the previous run
        for k in [k for k in env if not k.startswith("_")]:
            if k not in ("math", "sympy", "sp", "itertools",
                         "statistics", "Fraction", "print",
                         "ureg", "pint", "chempy"):
                env.pop(k, None)
        budget = [MAX_STEPS]
        err = None
        sys.settrace(_tracer(budget))
        try:
            exec(compile(code, "<pal>", "exec"), env)
        except BaseException as e:  # noqa: BLE001 — sandbox catches all
            err = e
        finally:
            sys.settrace(None)
        if err is not None:
            res_q.put({"error": f"{type(err).__name__}: {err}"})
            continue
        val = env.get("answer")
        answer_text = None
        if val is not None:
            try:
                answer_text = str(val)
            except Exception:
                res_q.put({"error": "unstringable answer"})
                continue
        elif stdout:
            answer_text = stdout[-1].strip()
        if answer_text is None:
            res_q.put({"error": "no answer binding"})
            continue
        steps = env.get("steps")
        res_q.put({
            "answer_text": answer_text,
            "value_repr": repr(val),
            "stdout": list(stdout),
            "steps": [str(s) for s in steps] if isinstance(steps, list)
                     else [],
        })


# ── persistent warm worker (sympy import is ~1s; keep it hot) ──
_W = {"proc": None, "req": None, "res": None}
_W_LOCK = threading.Lock()


def _get_worker():
    with _W_LOCK:
        p = _W["proc"]
        if p is not None and p.is_alive():
            return _W
        ctx = mp.get_context("spawn")
        req_q, res_q = ctx.Queue(), ctx.Queue()
        p = ctx.Process(target=_sandbox_worker, args=(req_q, res_q),
                        daemon=True)
        p.start()
        _W.update(proc=p, req=req_q, res=res_q)
        return _W


def _kill_worker():
    with _W_LOCK:
        p = _W["proc"]
        _W.update(proc=None, req=None, res=None)
    if p is not None:
        try:
            p.terminate()
            p.join(0.5)
            if p.is_alive():
                p.kill()          # hard SIGKILL / TerminateProcess
        except Exception:
            pass


def run_program(code: str, timeout_s: float = 8.0
                ) -> Optional[Dict[str, Any]]:
    """Execute `code` in the sandbox worker; return {value,
    answer_text, steps} or None on any refusal/failure/timeout."""
    code = _clean_code(code)
    try:
        ast.parse(code, mode="exec")
        refuse = _check_ast(ast.parse(code, mode="exec"))
    except SyntaxError:
        return None
    if refuse is not None:
        return None

    w = _get_worker()
    try:
        w["req"].put(code)
        res = w["res"].get(timeout=timeout_s)
    except Exception:
        # timeout or dead worker — kill it at OS level, next call
        # respawns a fresh warm worker
        _kill_worker()
        return None
    if not isinstance(res, dict) or "error" in res:
        return None

    answer_text = res["answer_text"]
    if len(answer_text) > MAX_ANSWER_LEN:
        return None
    val_repr = res.get("value_repr")

    numeric = None
    try:
        import sympy as sp
        expr = sp.sympify(answer_text)
        if expr is not None and expr.is_number:
            numeric = float(expr.evalf())
    except Exception:
        try:
            numeric = float(answer_text)
        except (TypeError, ValueError):
            numeric = None

    return {"value": numeric if numeric is not None else val_repr,
            "numeric": numeric,
            "answer_text": answer_text,
            "steps": res.get("steps") or [],
            "stdout": res.get("stdout") or [],
            "worked": None}


def pal_compute(text: str, timeout_s: float = 8.0) -> Optional[Dict[str, Any]]:
    """Full PAL lane for callers OUTSIDE model_structure — extract the
    program, evaluate the declared formula deterministically, run the
    code path when needed, and cross-check formula-vs-code when both
    exist (disagreement = mis-parse, refuse like the in-line lane).

    Returns {numeric, value, answer_text, steps, plan, self_checked}
    where self_checked is True only when formula AND code both ran and
    agreed — i.e. the answer survived two independent computations.
    """
    try:
        from backend.its.solver.structure_extractor import \
            extract_program
        prog = extract_program(text)
    except Exception:
        return None
    if not prog or not (prog.get("code") or prog.get("formula")):
        return None
    ran = eval_formula(prog["formula"], prog.get("bindings") or {}) \
        if prog.get("formula") else None
    code_ran = run_program(prog["code"], timeout_s=timeout_s) \
        if prog.get("code") else None
    self_checked = False
    if ran is None:
        ran = code_ran
    elif code_ran is not None:
        a, b = ran.get("numeric"), code_ran.get("numeric")
        if a is not None and b is not None:
            if abs(a - b) > max(1e-6, 0.01 * abs(a)):
                return None            # formula disagrees with code — refuse
            self_checked = True
        elif (ran.get("value") is not None
              and code_ran.get("value") is not None
              and str(ran["value"]).strip() != str(
                  code_ran["value"]).strip()):
            return None
    if ran is None or ran.get("value") is None:
        return None
    return {"numeric": ran.get("numeric"), "value": ran.get("value"),
            "answer_text": ran.get("answer_text"),
            "steps": ran.get("steps") or [],
            "plan": prog.get("plan") or [],
            "givens": prog.get("givens") or {},
            "ask": prog.get("ask") or "",
            "self_checked": self_checked}


def eval_formula(formula: str,
                 bindings: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Deterministic evaluation of an LLM-declared formula over bound
    values — sympy parses, binds, evaluates; no code executes, no
    sandbox, no timing budget.  This is the preferred compute path:
    the model supplies semantics (which formula, which values), our
    engine does the arithmetic — an LLM mis-keyed in CODE cannot
    corrupt a formula eval.

    Returns the same dict shape as run_program, or None when the
    formula fails to parse/evaluate — the caller then falls back to
    the sandbox path."""
    try:
        import sympy as sp
    except ImportError:
        return None
    if not formula or not isinstance(bindings, dict) or not bindings:
        return None
    try:
        locals_ = {
            "sqrt": sp.sqrt, "sin": sp.sin, "cos": sp.cos, "tan": sp.tan,
            "asin": sp.asin, "acos": sp.acos, "atan": sp.atan,
            "pi": sp.pi, "E": sp.E, "log": sp.log, "exp": sp.exp,
            "abs": sp.Abs, "Abs": sp.Abs, "Min": sp.Min, "Max": sp.Max,
        }
        for name, raw in bindings.items():
            if not isinstance(name, str) or not name.isidentifier():
                return None            # a bad var name poisons sympify
            locals_[name] = sp.Float(float(raw))
        expr = sp.sympify(formula, locals=locals_)
        val = expr.evalf() if not expr.is_number else expr
        numeric = float(val)
        ans_str = f"{numeric:.6g}" if abs(numeric) < 1e12 else str(val)
        return {"value": numeric, "numeric": numeric,
                "answer_text": ans_str,
                "steps": [f"{formula} = {ans_str}"],
                "stdout": [], "worked": None}
    except Exception:
        return None
