"""
Bidirectional LaTeX <-> SymPy conversion bridge.

Students type math naturally via MathLive (which outputs LaTeX strings).
The backend converts those LaTeX strings to SymPy expressions, runs
solvers, and converts SymPy results back to LaTeX for display.

Design:
    latex_to_sympy()   - LaTeX string  ->  SymPy expression
    sympy_to_latex()   - SymPy expr    ->  LaTeX string
    batch_convert()    - bulk operations
    round_trip()       - LaTeX -> SymPy -> LaTeX smoke test

Key tricks:
    • Preprocess LaTeX before handing to sympy.parsing.latex.parse_latex
      - Implicit multiplication: 2x -> 2\\times x  (AST-level)
      - Auto-fix missing braces, normalise operators
    • Postprocess LaTeX from sympy.latex
      - Convert \\frac{}{} to compact form, clean empty groups
    • Graceful fallback: on parse failure return the original string
      so the UI can display "best effort" rendering
"""

from __future__ import annotations

import logging
import re
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional, Union

import sympy as sp
from sympy import latex as _sympy_latex
from sympy.parsing.latex import parse_latex as _sympy_parse_latex

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Result wrapper – every converter returns one of these so callers never have
# to guess whether conversion succeeded or what the error was.
# ---------------------------------------------------------------------------
class ConversionStatus(str, Enum):
    OK = "ok"
    FALLBACK = "fallback"   # returned the original string because parsing failed
    ERROR = "error"


@dataclass
class ConversionResult:
    """Holds the outcome of a single LaTeX <-> SymPy conversion.

    Attributes:
        status:     OK if parsing succeeded, FALLBACK if we returned the
                    original string, ERROR on unrecoverable failure.
        sympy_expr: Parsed SymPy expression (None if status != OK).
        latex_str:  Resulting LaTeX string (always set).
        message:    Human-readable note for debugging (e.g. parse error text).
        elapsed_ms: Wall-clock time for the conversion in milliseconds.
        warnings:   List of non-fatal notices (e.g. 'implicit multiplication was applied').
    """
    status: ConversionStatus
    sympy_expr: Optional[Union[sp.Expr, sp.MatrixBase]] = None
    latex_str: str = ""
    message: str = ""
    elapsed_ms: float = 0.0
    warnings: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Private helpers – pre/post-processing
# ---------------------------------------------------------------------------

# LaTeX commands that *always* denote multiplication so we never strip them.
_MULT_CMDS = {
    "\\times", "\\cdot", "\\div", "\\star", "\\ast",
    "\\otimes", "\\oplus", "\\wedge", "\\cap",
}

# Greek letter commands (lowercase + uppercase variants commonly used).
_GREEK_RE = re.compile(
    r"\\[a-zA-Z]+"   # any \\command
)

# Tokeniser: splits a LaTeX string into meaningful chunks.
# We produce three token types: COMMAND, NUMBER, BRACE_GROUP, SINGLE_CHAR
_TOKEN_RE = re.compile(
    r"(\\\\[a-zA-Z]+\*?)"   # \\command or \\command*
    r"|({)"                      # open brace
    r"|(})"                      # close brace
    r"|([a-zA-Z]+)"              # identifier (letters, possibly multi-char like \"sin\")
    r"|(\\d+\\.?\\d*)"        # number  (integer or decimal)
    r"|([^\\s])"               # any other non-whitespace char
)

# --- Step 1: Implicit-multiplication insertion ---------------------------
#
# SymPy's LaTeX parser does NOT understand 2x or (a)(b).  We insert
# explicit \\times or \\cdot tokens where a number/variable/group boundary
# implies multiplication.
#
# Algorithm (token-level scan):
#   After any token that is "numeric-ish" (digit, ')', '}', ']')
#   followed by any token that is "atomic-ish" (letter, '{', '\\')
#   insert \\times between them.
#
# We deliberately do NOT insert multiplication between:
#   • two identifiers that are function names (sin, cos, …) – those will be
#     handled by SymPy's built-in function table.
#   • superscript / subscript operators (^, _).

_FUNCTIONS = {
    "sin", "cos", "tan", "csc", "sec", "cot",
    "sinh", "cosh", "tanh",
    "arcsin", "arccos", "arctan",
    "ln", "log", "exp",
    "sqrt", "sum", "prod", "lim", "int", "oint", "iint", "iiint",
    "max", "min", "det",
    "alpha", "beta", "gamma", "delta", "epsilon", "zeta",
    "eta", "theta", "iota", "kappa", "lambda", "mu",
    "nu", "xi", "pi", "rho", "sigma", "tau",
    "upsilon", "phi", "chi", "psi", "omega",
    "Gamma", "Delta", "Theta", "Lambda", "Xi", "Pi",
    "Sigma", "Upsilon", "Phi", "Psi", "Omega",
    "frac", "binom", "sqrt", "matrix", "pmatrix",
    "bmatrix", "vmatrix", "Vmatrix", "cases",
}

_NUMERIC_TAIL = {
    ")", "}", "]", "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9",
}

_ATOMIC_HEAD = {
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
    "{",
}


def _is_implicit_mul_boundary(prev: str, curr: str) -> bool:
    """Return True if we need to insert a \\times between prev and curr tokens."""
    if not prev or not curr:
        return False
    if curr in {"^", "_", "+", "-", "=", "<", ">", "\\le", "\\ge",
               "\\neq", "\\approx", ",", ";", "&"}:
        return False
    # Skip if prev is a mult command already
    if prev in _MULT_CMDS:
        return False
    # prev ends with something numeric-like
    if prev[-1] in _NUMERIC_TAIL:
        if curr[0] in _ATOMIC_HEAD:
            # Don't double-multiply: if prev already ends with an operator skip
            return True
    # prev is a closing delimiter and curr is atomic head
    if prev in {")", "}", "]"} and curr[0] in _ATOMIC_HEAD:
        return True
    return False


def _insert_implicit_multiplication(latex: str) -> str:
    """Scan the LaTeX string and insert \\times where implicit multiplication
    is intended (e.g. 2x -> 2\\times x, (a+b)(c+d) -> (a+b)\\times(c+d)).

    We operate on a flat string rather than a full AST because LaTeX is
    already a quasi-AST.  Brace groups are treated as atomic tokens.
    """
    tokens: list[str] = []
    i = 0
    while i < len(latex):
        ch = latex[i]
        if ch == "\\":
            # Read the full command
            j = i + 1
            while j < len(latex) and latex[j].isalpha():
                j += 1
            cmd = latex[i:j]
            tokens.append(cmd)
            i = j
        elif ch in {"{", "}"}:
            tokens.append(ch)
            i += 1
        elif ch == "^":
            tokens.append("^")
            i += 1
        elif ch == "_":
            tokens.append("_")  # type: ignore[list-item]
            i += 1
        elif ch.isalpha():
            # Read a run of letters (handles \"sin\" etc. written without backslash)
            j = i
            while j < len(latex) and latex[j].isalpha():
                j += 1
            word = latex[i:j]
            tokens.append(word)
            i = j
        elif ch.isdigit() or ch == ".":
            j = i
            while j < len(latex) and (latex[j].isdigit() or latex[j] == "."):
                j += 1
            tokens.append(latex[i:j])
            i = j
        elif ch.isspace():
            i += 1  # skip whitespace
        else:
            tokens.append(ch)
            i += 1

    result_tokens: list[str] = [tokens[0]] if tokens else []
    for idx in range(1, len(tokens)):
        prev = tokens[idx - 1]
        curr = tokens[idx]
        if _is_implicit_mul_boundary(prev, curr):
            result_tokens.append("\\times")
        result_tokens.append(curr)

    return "".join(result_tokens)


# --- Step 2: LaTeX normalisation -----------------------------------------
#
# Fix common MathLive / hand-authored LaTeX quirks before handing to the
# SymPy parser.

# Remove \\displaystyle – SymPy parser chokes on it.
_DISPLAY_STYLE_RE = re.compile(r"\\displaystyle")
# Remove \\! and other spacing commands that SymPy doesn't know.
_SPACING_RE = re.compile(r"\\[,!;:]+")
# Normalise \\dfrac -> \\frac (SymPy knows both but \\frac is faster)
_DFRAC_RE = re.compile(r"\\dfrac")
# \\tfrac -> \\frac
_TFRAC_RE = re.compile(r"\\tfrac")
# \\left( -> (   SymPy handles them but stripping avoids token overhead.
_LEFT_RE = re.compile(r"\\left[\\[({]")
_RIGHT_RE = re.compile(r"\\right[\]\)\}]")
# \\mathbb{R} -> R  (we already map Greek separately; this handles blackboard bold)
_BB_RE = re.compile(r"\\mathbb\\{([^}]*)\\}")
# \\text{...} -> ...  (keep the inner text for variable names)
_TEXT_RE = re.compile(r"\\text\\{([^}]*)\\}")
# \\mathrm{...} -> ...
_MATHRM_RE = re.compile(r"\\mathrm\\{([^}]*)\\}")
# \\textstyle -> nothing
_TEXTSTYLE_RE = re.compile(r"\\textstyle")


def _normalise_latex(latex: str) -> str:
    """Apply LaTeX normalisation passes."""
    s = latex
    s = _DISPLAY_STYLE_RE.sub("", s)
    s = _SPACING_RE.sub("", s)
    s = _DFRAC_RE.sub("\\frac", s)
    s = _TFRAC_RE.sub("\\frac", s)
    s = _LEFT_RE.sub(lambda m: m.group(0)[-1], s)  # strip \\left, keep delimiter
    s = _RIGHT_RE.sub(lambda m: m.group(0)[-1], s)  # strip \\right, keep delimiter
    s = _BB_RE.sub(r"\\mathbb{\\1}", s)  # keep as-is (SymPy may ignore)
    s = _TEXT_RE.sub(r"\\1", s)
    s = _MATHRM_RE.sub(r"\\1", s)
    s = _TEXTSTYLE_RE.sub("", s)
    # Collapse multiple spaces
    s = re.sub(r"\\s+", " ", s).strip()
    return s


# --- Step 3: LaTeX post-processing (SymPy -> LaTeX) -----------------------
#
# sympy.latex() produces correct but sometimes verbose output.  We tidy it
# up for student-friendly display.

# SymPy outputs \\frac{\\alpha}{2} which is fine, but we want to make sure
# single-char numerators/denominators don't get extra braces.
_OVERLY_BRACED_RE = re.compile(
    r"\\frac\\{([^{}\\s])\\}\\{([^{}\\s])\\}"
)

# SymPy may emit \\left( ... \\right) for simple parentheses – normalise
# to () when contents are simple.
# (This is already handled well by default in most SymPy versions; keep here
#  as a safety net.)


def _tidy_latex(latex: str) -> str:
    """Remove unnecessary braces around single-token frac arguments."""
    s = _OVERLY_BRACED_RE.sub(r"\\frac{\\1}{\\2}", latex)
    return s


# --- Step 4: Symbol / expression registration ---------------------------
#
# SymPy's LaTeX parser knows standard symbols.  We add a few that appear
# in CISCE textbooks but aren't in the default symbol table.

_EXTRA_LATEX_SYMBOLS: dict[str, sp.Symbol] = {}

def _register_symbols() -> None:
    """Register custom symbols that SymPy's parser might not recognise."""
    global _EXTRA_LATEX_SYMBOLS
    # Common Indian-curriculum symbols
    extra_names = [
        "alpha", "beta", "gamma", "delta", "epsilon", "zeta",
        "eta", "theta", "iota", "kappa", "lambda", "mu",
        "nu", "xi", "pi", "rho", "sigma", "tau",
        "upsilon", "phi", "chi", "psi", "omega",
        "Gamma", "Delta", "Theta", "Lambda", "Xi", "Pi",
        "Sigma", "Upsilon", "Phi", "Psi", "Omega",
        "infty", "partial", "nabla", "ell", "hbar",
        "mathbb"  # kept as symbol; parser handles \\mathbb{R} specially
    ]
    for name in extra_names:
        _EXTRA_LATEX_SYMBOLS[f"\\{name}"] = sp.Symbol(name)

_register_symbols()


# ---------------------------------------------------------------------------
# Core converters
# ---------------------------------------------------------------------------

def latex_to_sympy(
    latex: str,
    *,
    insert_implicit_mul: bool = True,
    normalise: bool = True,
    strict: bool = False,
) -> ConversionResult:
    """Convert a LaTeX math string to a SymPy expression.

    Args:
        latex:          Raw LaTeX string (e.g. \\"\\frac{x^2+1}{x-1}\\").
        insert_implicit_mul:  If True, auto-insert \\times for implicit
                              multiplication (2x, (a)(b), 2(x+1), …).
        normalise:      If True, strip \\displaystyle, \\left/\\right, etc.
        strict:         If True, raise on parse failure instead of returning
                        a FALLBACK result.

    Returns:
        ConversionResult with status OK and the parsed SymPy expression, or
        status FALLBACK with the original string in latex_str.

    Raises:
        ValueError: only when strict=True and parsing fails.
    """
    t0 = time.perf_counter()
    warnings: list[str] = []
    original_latex = latex

    if not latex or not latex.strip():
        elapsed = (time.perf_counter() - t0) * 1000
        return ConversionResult(
            status=ConversionStatus.ERROR,
            latex_str=latex,
            message="Empty LaTeX string",
            elapsed_ms=elapsed,
        )

    # --- Pass 1: normalise ------------------------------------------------
    if normalise:
        latex = _normalise_latex(latex)

    # --- Pass 2: implicit multiplication ----------------------------------
    if insert_implicit_mul:
        latex = _insert_implicit_multiplication(latex)
        warnings.append("implicit_multiplication_applied")

    # --- Pass 3: parse with SymPy -----------------------------------------
    try:
        expr = _sympy_parse_latex(latex)
    except Exception as exc:
        elapsed = (time.perf_counter() - t0) * 1000
        logger.debug("LaTeX parse failed for %r: %s", latex, exc)
        if strict:
            raise ValueError(f"Cannot parse LaTeX: {latex!r} -> {exc}")
        return ConversionResult(
            status=ConversionStatus.FALLBACK,
            latex_str=original_latex,
            message=f"Parse error: {exc}",
            elapsed_ms=elapsed,
            warnings=warnings,
        )

    # --- Pass 4: sanity-check ---------------------------------------------
    if expr is None:
        elapsed = (time.perf_counter() - t0) * 1000
        if strict:
            raise ValueError(f"SymPy returned None for LaTeX: {latex!r}")
        return ConversionResult(
            status=ConversionStatus.FALLBACK,
            latex_str=original_latex,
            message="SymPy returned None",
            elapsed_ms=elapsed,
            warnings=warnings,
        )

    elapsed = (time.perf_counter() - t0) * 1000
    return ConversionResult(
        status=ConversionStatus.OK,
        sympy_expr=expr,
        latex_str=_tidy_latex(_sympy_latex(expr)),
        message="",
        elapsed_ms=elapsed,
        warnings=warnings,
    )


def sympy_to_latex(
    expr: Union[sp.Expr, sp.MatrixBase, int, float, complex],
    *,
    tidy: bool = True,
    **latex_kwargs,
) -> str:
    """Convert a SymPy expression (or numeric / matrix) to a LaTeX string.

    Args:
        expr:          SymPy expression, Matrix, or plain Python number.
        tidy:          If True, run post-processing to remove unnecessary
                        braces and normalise output.
        **latex_kwargs: Extra keyword args forwarded to sympy.latex()
                        (e.g. mul_symbol='\\times', fold_short_frac=True).

    Returns:
        LaTeX string suitable for MathJax/MathLive rendering.
    """
    if expr is None:
        return ""

    # Handle plain Python numeric types
    if isinstance(expr, (int, float, complex)):
        sym_expr = sp.sympify(expr)
    else:
        sym_expr = expr

    default_kwargs = {
        "mul_symbol": "\\times",
        "fold_short_frac": True,
        "fold_frac_num": True,
    }
    default_kwargs.update(latex_kwargs)

    try:
        raw = _sympy_latex(sym_expr, **default_kwargs)
    except Exception as exc:
        logger.debug("SymPy -> LaTeX failed: %s", exc)
        return str(sym_expr)  # last-resort fallback

    if tidy:
        raw = _tidy_latex(raw)

    return raw


def round_trip(latex: str, **kw) -> ConversionResult:
    """Smoke-test: LaTeX -> SymPy -> LaTeX and report any drift.

    The returned ConversionResult contains:
        • The final LaTeX (latex_str)
        • The intermediate SymPy expression (sympy_expr)
        • A warning if the output differs from the input (after normalisation).
    """
    t0 = time.perf_counter()
    step1 = latex_to_sympy(latex, **kw)
    if step1.status != ConversionStatus.OK:
        step1.elapsed_ms = (time.perf_counter() - t0) * 1000
        return step1

    latex_out = sympy_to_latex(step1.sympy_expr)

    # Normalise both sides for comparison
    norm_in = _normalise_latex(latex)
    norm_out = _normalise_latex(latex_out)

    warnings = list(step1.warnings)
    if norm_in != norm_out:
        warnings.append(
            f"round_trip_drift: input={latex!r} output={latex_out!r}"
        )

    elapsed = (time.perf_counter() - t0) * 1000
    return ConversionResult(
        status=ConversionStatus.OK,
        sympy_expr=step1.sympy_expr,
        latex_str=latex_out,
        message=step1.message,
        elapsed_ms=elapsed,
        warnings=warnings,
    )


def batch_convert(
    latex_list: list[str],
    direction: str = "to_sympy",
    **kw,
) -> list[ConversionResult]:
    """Convert a list of LaTeX strings (or SymPy expressions) in bulk.

    Args:
        latex_list:  List of LaTeX strings (if direction='to_sympy') or
                     SymPy expressions (if direction='to_latex').
        direction:   'to_sympy' or 'to_latex'.
        **kw:        Forwarded to the individual converter.

    Returns:
        List of ConversionResult objects, one per input.
    """
    results: list[ConversionResult] = []
    for item in latex_list:
        if direction == "to_sympy":
            res = latex_to_sympy(item, **kw)  # type: ignore[arg-type]
        elif direction == "to_latex":
            t0 = time.perf_counter()
            latex_out = sympy_to_latex(item, **kw)  # type: ignore[arg-type]
            elapsed = (time.perf_counter() - t0) * 1000
            res = ConversionResult(
                status=ConversionStatus.OK,
                latex_str=latex_out,
                elapsed_ms=elapsed,
            )
        else:
            raise ValueError(f"Unknown direction: {direction!r}. Use 'to_sympy' or 'to_latex'.")
        results.append(res)
    return results


# ---------------------------------------------------------------------------
# Expression builders – helper factory functions for common CISCE patterns
# ---------------------------------------------------------------------------

class ExpressionBuilder:
    """Convenience factory for building SymPy expressions that the bridge
    can round-trip to LaTeX cleanly.

    All methods return a SymPy expression; use sympy_to_latex() to render.

    Example::

        eb = ExpressionBuilder()
        e = eb.fraction("x^2+1", "x-1")
        print(sympy_to_latex(e))   # -> \\frac{x^{2} + 1}{x - 1}
    """

    @staticmethod
    def fraction(numerator: str, denominator: str) -> sp.Expr:
        """Build sp.numerator / sp.denominator from LaTeX strings."""
        res_n = latex_to_sympy(numerator)
        res_d = latex_to_sympy(denominator)
        if res_n.status != ConversionStatus.OK:
            raise ValueError(f"Cannot parse numerator: {numerator!r}")
        if res_d.status != ConversionStatus.OK:
            raise ValueError(f"Cannot parse denominator: {denominator!r}")
        return res_n.sympy_expr / res_d.sympy_expr  # type: ignore[operator]

    @staticmethod
    def matrix_from_rows(rows: list[list[str]]) -> sp.Matrix:
        """Build a SymPy Matrix from a list of LaTeX row strings.

        Each row is a list of cell LaTeX strings.
        """
        data: list[list[sp.Expr]] = []
        for row in rows:
            sym_row = []
            for cell in row:
                res = latex_to_sympy(cell)
                if res.status != ConversionStatus.OK:
                    raise ValueError(f"Cannot parse matrix cell: {cell!r}")
                sym_row.append(res.sympy_expr)  # type: ignore[arg-type]
            data.append(sym_row)
        return sp.Matrix(data)

    @staticmethod
    def piecewise(*pairs: tuple[str, str]) -> sp.Piecewise:
        """Build a SymPy Piecewise from (expr_latex, cond_latex) pairs.

        Example::

            pw = ExpressionBuilder.piecewise(
                ("x^2", "x < 0"),
                ("x",    "x >= 0"),
            )
        """
        expr_cond_pairs: list[tuple[sp.Expr, sp.Expr]] = []
        for expr_latex, cond_latex in pairs:
            r_expr = latex_to_sympy(expr_latex)
            r_cond = latex_to_sympy(cond_latex)
            if r_expr.status != ConversionStatus.OK:
                raise ValueError(f"Cannot parse piecewise expr: {expr_latex!r}")
            if r_cond.status != ConversionStatus.OK:
                raise ValueError(f"Cannot parse piecewise cond: {cond_latex!r}")
            expr_cond_pairs.append((  # type: ignore[arg-type]
                r_expr.sympy_expr,  # type: ignore[list-item]
                r_cond.sympy_expr,  # type: ignore[list-item]
            ))
        return sp.Piecewise(*expr_cond_pairs)


# ---------------------------------------------------------------------------
# Module-level convenience aliases
# ---------------------------------------------------------------------------

convert = latex_to_sympy   # shorthand for service-layer code
render = sympy_to_latex   # shorthand for service-layer code


# ---------------------------------------------------------------------------
# Self-test / sanity check (runs on `python -m solvers.latex_sympy_bridge`)
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    test_cases: list[tuple[str, str]] = [
        # (input_latex, expected_substring_in_output_latex)
        (r"\\frac{x^2+1}{x-1}",                     "frac"),
        (r"x^{3}",                                    "x^{3}"),
        (r"\\sqrt{x}",                              "sqrt"),
        (r"\\int_{0}^{1} x^2 dx",                   "int"),
        (r"\\sum_{n=1}^{\\infty} \\frac{1}{n^2}", "sum"),
        (r"\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", "matrix"),
        (r"\\alpha + \\beta",                      "alpha"),
        (r"|x|",                                      "left|"),
        (r"\\sin(x) + \\cos(x)",                   "sin"),
        (r"\\ln(x)",                                "ln"),
        (r"\\log_{10}(x)",                          "log"),
        (r"\\lim_{x \\to 0} \\frac{\\sin x}{x}", "lim"),
        (r"\\begin{cases} x & x \\geq 0 \\\\ -x & x < 0 \\end{cases}", "cases"),
        (r"2x",                                       "2"),   # implicit mul
        (r"(a+b)(c+d)",                               "times"),  # implicit mul
    ]

    print("\n" + "=" * 70)
    print("  latex_sympy_bridge  –  self-test")
    print("=" * 70)

    all_ok = True
    for latex_in, expected_sub in test_cases:
        res = latex_to_sympy(latex_in)
        status_icon = "✓" if res.status == ConversionStatus.OK else "✗"
        found = expected_sub.lower() in res.latex_str.lower()
        ok = res.status == ConversionStatus.OK and found
        if not ok:
            all_ok = False
        print(
            f"  {status_icon}  {latex_in[:50]:<50}  "
            f"status={res.status.value:<10}  "
            f"time={res.elapsed_ms:6.2f}ms  "
            f"match={'yes' if found else 'NO'}"
        )
        if res.warnings:
            for w in res.warnings:
                print(f"       ⚠ {w}")
        if res.status == ConversionStatus.FALLBACK:
            print(f"       msg: {res.message}")

    print()
    # Round-trip spot checks
    round_trip_cases = [
        r"x^{3}",
        r"\\frac{x^2+1}{x-1}",
        r"\\sqrt{2}",
        r"\\sin(\\theta)",
    ]
    print("  Round-trip tests:")
    for rt_latex in round_trip_cases:
        rt = round_trip(rt_latex)
        icon = "✓" if rt.status == ConversionStatus.OK and not rt.warnings else "⚠"
        print(
            f"  {icon}  {rt_latex[:40]:<40}  ->  {rt.latex_str[:40]}"
        )

    print()
    print(f"  {'ALL PASSED' if all_ok else 'SOME FAILURES – see above'}")
    print("=" * 70)
