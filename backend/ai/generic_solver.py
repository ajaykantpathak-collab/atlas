"""
Generic deterministic solver — three lanes, no LLM, no per-concept templates.

WHY THIS EXISTS
---------------
`pattern_solver.py` (240KB) handles a few hundred hand-written patterns and
answers the rest by falling through. Measured against the real corpus
(scripts/smoke_subject_coverage.py) it matched 12% of sampled questions.

Hand-writing more patterns is not tractable: 2,481 compute-tagged concepts
carry 2,391 DISTINCT titles (scripts/formula_evaluability.py). But 68% of those
concepts store their formula as a machine-evaluable assignment
(`theta = arc_length / radius`), and many more only need a trailing prose clause
stripped (`A = pi * r^2, where r is the radius` -> `A = pi * r^2`).

So: ONE engine, three lanes.

  Lane 1  FORMULA     question "given k = v, find T" + concept formula
                      -> SymPy solves for T. No template needed.
  Lane 2  RETRIEVAL   prose subjects (history/social/geography/political) have
                      no formula and never will — the answer is already written
                      in the corpus, so return the stored explanation. Never
                      generate one.
  Lane 3  EXPRESSION  the question carries its own maths
                      ("find the value of 2x^2 + 2x + 6 at x = 3",
                       "solve for x: 2x + 8 = 16"). Pure SymPy, no concept.

HONESTY RULES (these are the whole point)
-----------------------------------------
1. Never return an answer that has not been cross-checked where the maths
   allows it (back-substitution, dimensional sanity, second method).
2. Never invent a number. If a given is missing, return MISS — a fall-through
   to the rest of the funnel is always better than a confident wrong answer.
3. `verification` is returned with every result so the caller can refuse to
   show an unverified answer.
"""

from __future__ import annotations

import json
import math
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

import sympy as sp
from sympy.parsing.sympy_parser import (
    implicit_multiplication_application,
    parse_expr,
    standard_transformations,
)

# `sp.sympify` cannot read "2x + 8" (implicit multiplication) or "x = 4" (an
# equation) from a string. Corpus questions are written for humans, so both are
# routine. These transformations are what make the expression lane work at all —
# without them every question silently missed.
_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)

# SymPy CLAIMS a set of ordinary-looking names as constants. In school physics
# `I` is current, not the imaginary unit, and `E`/`e` is usually a variable, not
# Euler's number. Letting SymPy auto-claim them produced confident nonsense:
#   formula `P = I**2 * R`,  given I=42, R=29  ->  P = -R = -29   (I**2 == -1)
#   formula `V = emf - I*r`, given emf=238...   ->  never solved, left as
#                                                 "238.0 - 84.0*I"
# Every identifier in a stored formula is therefore bound to a plain Symbol
# before parsing. Only `pi` keeps its meaning.
_PRESERVED = {"pi": sp.pi}
_SYMBOL_RE = re.compile(r"[A-Za-z_][A-Za-z_0-9]*")


def _local_dict(*texts: str) -> dict:
    """Bind every identifier as a plain Symbol so SymPy cannot claim it."""
    names: set = set()
    for text in texts:
        names.update(_SYMBOL_RE.findall(text or ""))
    local = dict(_PRESERVED)
    for name in names:
        if name not in local:
            local[name] = sp.Symbol(name)
    return local


def _parse_expr(text: str, *extra: str):
    """Sympify human-written algebra with NO reserved-name capture.

    Raises on anything unparseable.
    """
    cleaned = (text or "").strip().rstrip("?. ").replace("^", "**")
    cleaned = cleaned.replace("×", "*").replace("÷", "/")
    return parse_expr(
        cleaned,
        local_dict=_local_dict(cleaned, *extra),
        transformations=_TRANSFORMS,
        evaluate=True,
    )


def _parse_equation(text: str):
    """Parse 'lhs = rhs' into a sympy Eq, or None."""
    cleaned = (text or "").strip().rstrip("?. ")
    if "=" not in cleaned:
        return None
    lhs, _, rhs = cleaned.partition("=")
    if not lhs.strip() or not rhs.strip():
        return None
    try:
        left = _parse_expr(lhs)
        right = _parse_expr(rhs)
    except Exception:
        return None
    if not isinstance(left, sp.Expr) or not isinstance(right, sp.Expr):
        return None
    return sp.Eq(left, right)

# ---------------------------------------------------------------------------
# Question parsing
# ---------------------------------------------------------------------------
# "For Plane Angle: given arc_length = 443, radius = 25, find theta."
_GIVEN_RE = re.compile(
    r"\b(?:given|with|where)\s+(.+?)(?=\.\s|\?|\s*,\s*find\b|\s+find\b|\s+calculate\b|$)",
    re.IGNORECASE | re.DOTALL,
)
_PAIR_RE = re.compile(r"([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(-?\d+(?:\.\d+)?)")
_TARGET_RE = re.compile(
    r"\b(?:find|compute|calculate|determine|evaluate|solve for)\s+"
    r"(?:the\s+)?([A-Za-z_][A-Za-z_0-9]*)",
    re.IGNORECASE,
)


def parse_givens(text: str) -> dict[str, float]:
    """Pull `name = number` pairs out of a question.

    Deliberately conservative: only reads the clause introduced by
    given/with/where, so numbers that belong to the prose ("Class 10") are not
    mistaken for inputs.
    """
    out: dict[str, float] = {}
    m = _GIVEN_RE.search(text or "")
    haystack = m.group(1) if m else (text or "")
    for name, raw in _PAIR_RE.findall(haystack):
        try:
            out[name] = float(raw)
        except ValueError:
            continue
    return out


def parse_target(text: str) -> Optional[str]:
    """The symbol the question asks for ("find theta" -> "theta")."""
    m = _TARGET_RE.search(text or "")
    return m.group(1) if m else None


# Prose tails that make an otherwise-fine formula unparseable.
_PROSE_TAIL_RE = re.compile(
    r"(?:,\s*where\b.*$)|(?:;.*$)|(\s+where\b.*$)|(\s+after\b.*$)|(\s+if\b.*$)",
    re.IGNORECASE | re.DOTALL,
)
_BAD_TOKENS = re.compile(r"\b(if|where|then|implies|only|after|before|"
                         r"maximum|minimum|simplif\w*|terminating)\b", re.IGNORECASE)


def clean_formula(formula: str) -> Optional[str]:
    """Turn a stored formula into a SymPy-parsable assignment, or give up.

    `A = pi * r^2, where r is the radius of the circle`  ->  `A = pi*r**2`
    `theta = arc_length / radius`                          ->  unchanged
    `Terminating if denominator = 2^a * 5^b after ...`     ->  None (prose)
    """
    if not formula:
        return None
    text = _PROSE_TAIL_RE.sub("", formula.strip()).strip()
    if not text or _BAD_TOKENS.search(text):
        return None
    if "=" not in text:
        return None
    lhs, _, rhs = text.partition("=")
    lhs, rhs = lhs.strip(), rhs.strip()
    if not lhs or not rhs:
        return None
    # A second '=' means alternatives ("x = 1 or x = 2"), not one equation.
    if "=" in rhs:
        return None
    if not re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", lhs):
        return None
    return f"{lhs} = {rhs}"


# SYMBOL_ALIASES maps everyday words to the symbols used in stored formulas.
SYMBOL_ALIASES = {
    "theta": "theta", "area": "A", "perimeter": "P", "volume": "V",
    "radius": "r", "diameter": "d", "length": "l", "width": "w",
    "height": "h", "side": "s", "base": "b", "mass": "m", "force": "F",
    "speed": "v", "distance": "d", "time": "t", "current": "I",
    "voltage": "V", "power": "P", "energy": "E", "temperature": "T",
    "arc_length": "s", "circumference": "C", "diagonal": "d",
    "cost": "C", "profit": "P", "revenue": "R", "interest": "I",
}


def _symbol_for(name: str, universe: set[str]) -> Optional[sp.Symbol]:
    """Resolve a question's word to a symbol the formula actually uses."""
    if name in universe:
        return sp.Symbol(name)
    alias = SYMBOL_ALIASES.get(name.lower())
    if alias and alias in universe:
        return sp.Symbol(alias)
    lowered = {s.lower(): s for s in universe}
    if name.lower() in lowered:
        return sp.Symbol(lowered[name.lower()])
    if alias and alias.lower() in lowered:
        return sp.Symbol(lowered[alias.lower()])
    return None


@dataclass
class SolveOutcome:
    """One lane's answer, plus enough evidence for the caller to trust it."""

    lane: str                      # "formula" | "retrieval" | "expression"
    matched: bool = False
    answer: Optional[str] = None
    steps: list[str] = field(default_factory=list)
    verification: str = "none"     # none | substitution | retrieved
    confidence: float = 0.0
    concept_id: Optional[str] = None
    question_type: Optional[str] = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "lane": self.lane,
            "matched": self.matched,
            "answer": self.answer,
            "steps": self.steps,
            "verification": self.verification,
            "confidence": self.confidence,
            "concept_id": self.concept_id,
            "question_type": self.question_type,
        }


def _fmt(value: Any) -> str:
    """Render a number the way a student should see it.

    Two defects fixed here:
      * `%.6g` produced scientific notation — a student must never be shown
        "2.02207e+06" for a heat value of 2022066.7, and it silently broke
        numeric comparison downstream.
      * 6 significant figures truncated a 7-digit answer. 10 decimal places is
        ample for school arithmetic and keeps full precision.
    """
    try:
        f = float(sp.N(value, 15))
    except (TypeError, ValueError):
        return str(value)
    if f != f or f in (float("inf"), float("-inf")):      # NaN / inf
        return str(value)
    if f == int(f) and abs(f) < 1e15:
        return str(int(f))
    text = f"{f:.10f}".rstrip("0").rstrip(".")
    return text or "0"


# ---------------------------------------------------------------------------
# Lane 1 — formula engine
# ---------------------------------------------------------------------------
def solve_with_formula(question: str, formula: str) -> SolveOutcome:
    """Solve `given ... find T` using the concept's stored formula.

    No template, no LLM. SymPy solves the assignment for the requested target,
    and the result is back-substituted into the ORIGINAL equation, so a value
    that does not satisfy it can never be reported as solved.
    """
    out = SolveOutcome(lane="formula")
    cleaned = clean_formula(formula)
    if not cleaned:
        return out

    lhs_s, _, rhs_s = cleaned.partition("=")
    try:
        # Both sides are parsed with a shared local_dict, so an identifier like
        # `I` is the SAME plain Symbol on each side and SymPy never swaps in its
        # imaginary unit.
        lhs = _parse_expr(lhs_s, rhs_s)
        rhs = _parse_expr(rhs_s, lhs_s)
    except Exception:
        return out
    if not isinstance(lhs, sp.Expr) or not isinstance(rhs, sp.Expr):
        return out

    equation = sp.Eq(lhs, rhs)
    universe = {s.name for s in equation.free_symbols}

    givens = parse_givens(question)
    if not givens:
        return out
    target_name = parse_target(question)
    if not target_name:
        return out
    target = _symbol_for(target_name, universe)
    if target is None or target.name not in universe:
        return out

    # Substitute the givens, mapping the question's words onto formula symbols.
    substitutions: dict[sp.Symbol, Any] = {}
    for name, val in givens.items():
        sym = _symbol_for(name, universe)
        if sym is not None and sym != target:
            substitutions[sym] = sp.Float(val)
    if not substitutions:
        return out

    try:
        reduced = equation.subs(substitutions)
    except Exception:
        return out
    # Only the target may remain unknown.
    if target in reduced.free_symbols and any(s != target for s in reduced.free_symbols):
        return out

    try:
        solutions = sp.solve(reduced, target)
    except Exception:
        return out
    if not solutions:
        return out

    numeric = [s for s in solutions if s.is_number]
    if not numeric:
        # A symbolic result is not an answer a student can use, and returning
        # one is how "238.0 - 84.0*I" got served as an answer. Honest miss.
        return out
    chosen = numeric[0]

    # Cross-check: original equation, fully substituted, must hold.
    try:
        residual = sp.simplify(
            (lhs - rhs).subs(substitutions).subs(target, chosen)
        )
        verified = bool(residual == 0 or abs(float(sp.N(residual))) < 1e-9)
    except Exception:
        verified = False
    if not verified:
        return out

    out.matched = True
    out.answer = _fmt(chosen)
    out.question_type = "formula"
    out.verification = "substitution"
    out.confidence = 1.0
    out.steps = [
        f"Using {cleaned}",
        ", ".join(f"{k} = {_fmt(v)}" for k, v in givens.items()),
        f"Solved for {target_name}: {out.answer}",
    ]
    return out


# ---------------------------------------------------------------------------
# Lane 3 — expression solver (the question carries its own maths)
# ---------------------------------------------------------------------------
_EVAL_AT_RE = re.compile(
    r"(?:value of|evaluate)\s+(?:the\s+)?(?:polynomial\s+)?(.+?)\s+"
    r"(?:at|when|for)\s+([A-Za-z])\s*=\s*(-?\d+(?:\.\d+)?)",
    re.IGNORECASE,
)
_SOLVE_FOR_RE = re.compile(r"solve\s+for\s+([A-Za-z])\s*:?\s*(.+)", re.IGNORECASE)


_RATIO_RE = re.compile(
    r"ratio\s+(\d+)\s*:\s*(\d+)", re.IGNORECASE
)


def _simplify_ratio(a: int, b: int) -> tuple[int, int]:
    g = math.gcd(a, b) or 1
    return a // g, b // g


def solve_expression_question(question: str) -> SolveOutcome:
    """Handle questions that are self-contained maths, no concept required."""
    out = SolveOutcome(lane="expression")

    # "Solve for x: 2x + 8 = 16."
    m = _SOLVE_FOR_RE.search(question or "")
    if m:
        equation = _parse_equation(m.group(2))   # a single Eq, not a tuple
        if equation is not None:
            x = sp.Symbol(m.group(1))
            try:
                solutions = sp.solve(equation, x)
            except Exception:
                solutions = []
            numeric = [s for s in solutions if s.is_number]
            if numeric:
                chosen = numeric[0]
                try:
                    residual = sp.simplify(equation.lhs.subs(x, chosen) - equation.rhs)
                    if residual == 0 or abs(float(sp.N(residual))) < 1e-9:
                        out.matched = True
                        out.answer = _fmt(chosen)
                        out.question_type = "solve_for"
                        out.verification = "substitution"
                        out.confidence = 1.0
                        out.steps = [f"Solved {m.group(2).strip()} for {m.group(1)}"]
                except Exception:
                    pass
        if out.matched:
            return out

    # "Find the value of the polynomial 2x^2 + 2x + 6 at x = 3."
    # "Evaluate 3x + 9 when x = 3."
    m = _EVAL_AT_RE.search(question or "")
    if m:
        try:
            expr = _parse_expr(m.group(1))
        except Exception:
            expr = None
        if isinstance(expr, sp.Expr):
            x = sp.Symbol(m.group(2))
            try:
                value = sp.simplify(expr.subs(x, sp.Float(m.group(3))))
            except Exception:
                value = None
            if value is not None and not value.free_symbols:
                out.matched = True
                out.answer = _fmt(value)
                out.question_type = "evaluate"
                out.verification = "substitution"
                out.confidence = 1.0
                out.steps = [
                    f"Substituted {m.group(2)} = {m.group(3)} into {m.group(1).strip()}"
                ]
                return out

    # "Write the ratio 8 : 48 in its simplest form and give the first term..."
    #
    # Only when the ratio IS the question. "Rs 180 is split in the ratio
    # 1 : 2 : 3. Find the largest share" mentions a ratio but asks for a
    # money split; answering "1 : 2" there is confidently wrong, so this lane
    # requires the question to actually ask for the ratio itself.
    m = _RATIO_RE.search(question or "")
    asks_about_ratio = bool(m) and re.search(
        r"simplest\s+form|simplif\w+|write\s+the\s+ratio|"
        r"express\s+.*\s+as\s+a\s+ratio|ratio\s+in\s+its\s+simplest",
        question or "", re.IGNORECASE)
    if m and asks_about_ratio:
        a, b = int(m.group(1)), int(m.group(2))
        num, den = _simplify_ratio(a, b)
        if "first term" in (question or "").lower():
            out.matched = True
            out.answer = str(num)
            out.question_type = "ratio_first_term"
            out.verification = "exact"
            out.confidence = 1.0
            out.steps = [f"{a} : {b} = {num} : {den}"]
        else:
            out.matched = True
            out.answer = f"{num} : {den}"
            out.question_type = "ratio"
            out.verification = "exact"
            out.confidence = 1.0
            out.steps = [f"{a} : {b} reduces to {num} : {den}"]
        return out

    return out


# ---------------------------------------------------------------------------
# Lane 4 — YAML formula bank (backend/formulas/**.yaml, 5,520 formulas)
# ---------------------------------------------------------------------------
# The question corpus carries 1,771 evaluable formulas; `backend/formulas/` holds
# 5,520 more with a `name` ("population_growth_rate") and a `domain`, which is
# a far better match key than anything inferable from question prose.
#
# SAFETY: this lane never returns an answer on its own. It only PROPOSES a
# formula; the answer must still come out of `solve_with_formula`, which
# back-substitutes into the original equation. A bad proposal is therefore a
# miss, never a wrong answer. That is the whole reason the bank is safe to add
# on top of a lane measured at zero wrong answers.
_LATEX_WORDS = (
    (r"\left", ""), (r"\right", ""), (r"\!", ""), (r"\,", " "), (r"\;", " "),
    (r"\cdot", "*"), (r"\times", "*"), (r"\div", "/"), (r"\pm", "+-"),
    (r"\approx", "="), (r"\displaystyle", " "), (r"\mathrm", " "),
)


_PROSE_TAIL = re.compile(
    r"(?:,\s*where\b.*$)|(?:;.*$)|(\s+where\b.*$)|(\s+if\b.*$)|"
    r"(\s*for\b.*$)|(\s*when\b.*$)",
    re.IGNORECASE | re.DOTALL,
)


def _balanced_group(text: str, start: int):
    """Return (contents, end_index) for the {...} beginning at `start`.

    A regex like `\\[^{}]*` cannot handle nesting — and \\sqrt inside \\frac
    is exactly that case: \\frac{-b + \\sqrt{b^2-4ac}}{2a}. Returns (None, -1)
    when the braces are unbalanced.
    """
    if start >= len(text) or text[start] != "{":
        return None, -1
    depth = 0
    for i in range(start, len(text)):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[start + 1:i], i + 1
    return None, -1


def _expand_braced(text: str, macro: str, wrap) -> str:
    """Replace every \\macro{...} using balanced-brace matching, repeatedly."""
    for _ in range(6):
        idx = text.find(macro + "{")
        if idx < 0:
            break
        contents, end = _balanced_group(text, idx + len(macro))
        if contents is None:
            return ""            # unbalanced -> refuse the whole expression
        text = text[:idx] + wrap(contents) + text[end:]
    return text


def _expand_frac(text: str) -> str:
    """Replace every \\frac{num}{den} using balanced-brace matching.

    Needs TWO groups. A single-argument substitution would put the numerator
    into the denominator too, turning \\frac{a}{b} into a/a — which is exactly
    the kind of bug that returns a confidently wrong answer.
    """
    for _ in range(6):
        idx = text.find(r"\frac{")
        if idx < 0:
            break
        num, after_num = _balanced_group(text, idx + len(r"\frac"))
        if num is None:
            return ""
        rest = text[after_num:]
        if not rest.startswith("{"):
            return ""
        den, after_den = _balanced_group(rest, 0)
        if den is None:
            return ""
        text = text[:idx] + f"(({num})/({den}))" + rest[after_den:]
    return text


# Macros this converter understands. Anything else in a formula is REFUSED
# rather than guessed at: `\mathcal{E}` must not silently become the variable
# `mathcal`, and silently-wrong variables are how you produce wrong answers.
_KNOWN_MACROS = (r"\frac", r"\sqrt", r"\pi", r"\cdot", r"\times", r"\div",
                 r"\pm", r"\approx", r"\left", r"\right", r"\displaystyle",
                 r"\mathrm", r"\text", r"\,", r"\;", r"\!", r"\ ")
_ANY_MACRO = re.compile(r"\\([A-Za-z]+)")


def _refuse_unknown_macros(text: str) -> bool:
    for macro in _ANY_MACRO.findall(text):
        if macro not in {m.lstrip("\\") for m in _KNOWN_MACROS}:
            return True
    return False


def latex_to_sympy(text: str) -> Optional[str]:
    """Convert the LaTeX subset used by the formula banks into sympifiable text.

    Returns None for anything that is not a plain algebraic assignment —
    inequalities (`Li < Na < K`), bare constants (`Rational(1,4)`), prose. Those
    are in the bank but are not solvable equations, and forcing them would
    invent answers.
    """
    if not text:
        return None
    raw = str(text)
    # Refuse unknown macros BEFORE mangling them into fake variable names.
    if _refuse_unknown_macros(raw):
        return None
    s = _PROSE_TAIL.sub("", raw).strip()
    if not s:
        return None
    for pat, rep in _LATEX_WORDS:
        s = s.replace(pat, rep)
    s = re.sub(r"\\text\{[^{}]*\}", " ", s)
    s = re.sub(r"\\mathrm\{([^{}]*)\}", r"\1", s)
    s = s.replace("\\pi", "pi")

    # Innermost-first: sqrt before frac, because \sqrt can nest inside \frac.
    s = _expand_braced(s, r"\sqrt", lambda c: f"sqrt({c})")
    s = _expand_frac(s)

    # Exponents BEFORE braces become parens, so `^{2}` is seen as `^{`.
    s = re.sub(r"\^\{([^{}]*)\}", r"**(\1)", s)
    s = re.sub(r"\^(\w)", r"**\1", s)
    s = s.replace("{", "(").replace("}", ")")
    s = re.sub(r"\*\*\((\w+)\)", r"**\1", s)
    s = re.sub(r"(\*\*\([^)]*\))\s*(\w)", r"\1*\2", s)   # 2**3 a -> 2**3*a
    s = re.sub(r"_(\w+)", r"\1", s)                       # N_final -> Nfinal
    s = re.sub(r"\s+", " ", s).strip()
    if not s or any(ch in s for ch in "<>!"):
        return None
    if "=" not in s:
        return None
    lhs, _, rhs = s.partition("=")
    lhs, rhs = lhs.strip(), rhs.strip()
    if not re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", lhs) or not rhs:
        return None
    return f"{lhs} = {rhs}"


class FormulaBank:
    """Lazy, process-wide view of backend/formulas/**.yaml."""

    def __init__(self, entries: Optional[list] = None):
        self._entries: list = list(entries or [])

    @classmethod
    def load(cls) -> "FormulaBank":
        try:
            from backend.its.formula_graph.builder import load_formulas
        except Exception:
            return cls([])
        try:
            root = Path(__file__).resolve().parents[1] / "formulas"
            formulas, _failed = load_formulas(root)
        except Exception:
            return cls([])
        entries = []
        for f in formulas:
            name = str(getattr(f, "name", "") or "")
            entries.append({
                "id": str(getattr(f, "formula_id", "") or ""),
                "name": name,
                "domain": str(getattr(f, "domain", "") or ""),
                "expr": latex_to_sympy(str(getattr(f, "latex", "") or "")),
                "tokens": _tokens(name.replace("_", " ")),
            })
        # Keep only the entries that are actually solvable.
        return cls([e for e in entries if e["expr"]])

    def __len__(self) -> int:
        return len(self._entries)

    def candidates(self, question: str, limit: int = 5) -> list:
        """Rank formulas by name-token overlap with the question."""
        want = _tokens(question)
        if not want:
            return []
        scored = []
        for entry in self._entries:
            have = entry["tokens"]
            if not have:
                continue
            overlap = len(want & have)
            if not overlap:
                continue
            # Require a strong signal: most of the formula's own words must
            # appear in the question, or every question word must appear in it.
            precision = overlap / len(have)
            recall = overlap / len(want)
            score = 2 * precision + recall
            scored.append((score, entry))
        scored.sort(key=lambda t: -t[0])
        return [entry for _score, entry in scored[:limit]]


_BANK: Optional[FormulaBank] = None


def get_formula_bank(build: bool = True) -> FormulaBank:
    global _BANK
    if _BANK is None and build:
        _BANK = FormulaBank.load()
    return _BANK if _BANK is not None else FormulaBank([])


def warm_formula_bank() -> FormulaBank:
    """Call from the app lifespan alongside warm_concept_index()."""
    return get_formula_bank(build=True)


def solve_from_bank(question: str, limit: int = 5) -> SolveOutcome:
    """Propose from the bank, but let the verified solver do the answering."""
    out = SolveOutcome(lane="bank_formula")
    bank = get_formula_bank(build=False)
    if len(bank) == 0:
        return out
    for entry in bank.candidates(question, limit=limit):
        tried = solve_with_formula(question, entry["expr"])
        if tried.matched:
            tried.lane = "bank_formula"
            tried.steps = [f"Using {entry['name']} ({entry['id']})"] + tried.steps
            return tried
    return out


# ---------------------------------------------------------------------------
# Lane 2 — retrieval (prose subjects never need a solver)
# ---------------------------------------------------------------------------
_WORD_RE = re.compile(r"[a-z0-9]+")
_STOP = frozenset(
    """the a an of and or to in on for with is are was were be been by at as
    from that this these those it its what which who whom whose explain state
    mention describe discuss give write short briefly own words single key
    point remember about following""".split()
)


def _tokens(text: str) -> set:
    return {
        w for w in _WORD_RE.findall((text or "").lower())
        if len(w) > 2 and w not in _STOP
    }


class ProseIndex:
    """Curated concept answers, for subjects that are not computable.

    Deliberately a lookup, never a generator. History/geography/political
    questions have no formula and never will; the explanation is already
    written and stored on the question, so retrieving it is free and exact.
    """

    def __init__(self, entries=None):
        self.entries: list = list(entries or [])

    @classmethod
    def from_corpus(cls, limit_files: int = 4000) -> "ProseIndex":
        root = Path(__file__).resolve().parents[1] / "its" / "questions" / "generated"
        entries: list = []
        for i, path in enumerate(root.glob("catalog_*.json")):
            if i >= limit_files:
                break
            try:
                data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
            except (json.JSONDecodeError, OSError):
                continue
            for concept in data.get("concepts") or []:
                title = str(concept.get("title") or "")
                if not title:
                    continue
                for q in concept.get("questions") or []:
                    text, ans = q.get("q"), q.get("a")
                    if not text or ans is None:
                        continue
                    entries.append({
                        "id": str(concept.get("id") or ""),
                        "text": str(text),
                        "answer": str(ans),
                        "tokens": _tokens(str(text)),
                    })
        return cls(entries)

    def lookup(self, question: str, min_overlap: float = 0.6):
        """Best (answer, concept_id, score, title) for a prose question."""
        want = _tokens(question)
        if not want:
            return None
        best = None
        for entry in self.entries:
            have = entry.get("tokens") or set()
            overlap = len(want & have)
            if not overlap:
                continue
            score = overlap / len(want)
            if best is None or score > best[2]:
                best = (entry["answer"], entry["id"], score)
        if best and best[2] >= min_overlap:
            return best
        return None


_NUMERIC_ANSWER_RE = re.compile(r"^\s*-?[\d,]*\.?\d+\s*$")
_COMPUTED_Q_RE = re.compile(
    r"\bgiven\b|\bfind\b|\bcompute\b|\bcalculate\b|\bevaluate\b|\bsolve\b|"
    r"\bwork out\b|\bdetermine\b",
    re.IGNORECASE,
)


def _is_prose_answer(answer: str) -> bool:
    """True when the stored answer is an explanation, not a computed number."""
    text = (answer or "").strip()
    if not text:
        return False
    if _NUMERIC_ANSWER_RE.match(text):
        return False
    # A bare number with a unit is still a computed value, not an explanation.
    if len(text) <= 24 and sum(ch.isdigit() for ch in text) >= 3:
        return False
    return True


class ConceptAnswerStore:
    """concept_id -> curated answer. No similarity scoring, by construction.

    This is lane 2 done safely. The previous bag-of-words index scored token
    overlap and produced 33 confident-wrong explanations in a 240-question lab
    (asked about the French Revolution, answered with the 1830-1848
    revolutions). The mistake was doing *concept selection* in this lane — but
    the tutor funnel already has a router that picks the concept. So the
    contract here is deliberately narrow:

        given a concept_id ALREADY chosen by the router,
        return the explanation stored for that concept.

    There is no scoring, no overlap, no nearest-neighbour. An unknown concept is
    a miss, never a guess, and a neighbouring concept can never be returned by
    accident.
    """

    def __init__(self, concepts=None):
        # concept_id -> [(question, answer), ...]
        self._by_id: dict = {}
        for concept in concepts or []:
            cid = str(concept.get("concept_id") or concept.get("id") or "")
            if not cid:
                continue
            pairs = []
            for item in concept.get("questions") or []:
                if isinstance(item, (tuple, list)) and len(item) == 2:
                    pairs.append((str(item[0]), str(item[1])))
                else:
                    pairs.append((str(item.get("q")), str(item.get("a"))))
            self._by_id[cid] = pairs

    @classmethod
    def from_corpus(cls, limit_files: int = 4000) -> "ConceptAnswerStore":
        root = Path(__file__).resolve().parents[1] / "its" / "questions" / "generated"
        concepts: list = []
        for i, path in enumerate(root.glob("catalog_*.json")):
            if i >= limit_files:
                break
            try:
                data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
            except (json.JSONDecodeError, OSError):
                continue
            for concept in data.get("concepts") or []:
                pairs = [
                    (str(q.get("q")), str(q.get("a")))
                    for q in (concept.get("questions") or [])
                    if q.get("q") and q.get("a") is not None
                ]
                if pairs:
                    concepts.append({
                        "concept_id": str(concept.get("id") or ""),
                        "questions": pairs,
                    })
        return cls(concepts)

    def __len__(self) -> int:
        return len(self._by_id)

    def answer_for(self, concept_id: str, question: Optional[str] = None) -> SolveOutcome:
        """The stored explanation for this concept.

        With a question, the exact stored question is preferred; otherwise the
        first curated answer for the concept is returned, because the router has
        already established the topic.
        """
        out = SolveOutcome(lane="retrieval")
        pairs = self._by_id.get(str(concept_id or ""))
        if not pairs:
            return out                      # unknown concept -> honest miss
        chosen = None
        if question:
            norm = " ".join((question or "").lower().split())
            for text, answer in pairs:
                if " ".join(text.lower().split()) == norm:
                    chosen = answer
                    break
        if chosen is None:
            chosen = pairs[0][1]
        if not chosen or _NUMERIC_ANSWER_RE.match(chosen.strip()):
            return out                      # a bare number is not an explanation
        out.matched = True
        out.answer = chosen
        out.concept_id = str(concept_id)
        out.question_type = "explanation"
        out.verification = "retrieved"
        out.confidence = 0.9
        out.steps = ["Answered from the curriculum explanation for this concept."]
        return out


class ConceptIndex:
    """concept_id -> stored formula + curated answers, built ONCE at startup.

    Serving the formula lane needs `concept_id -> formula`, which only exists
    after RoutingService picks a node. Building that map inside a request would
    parse 1,629 JSON files while a student waits, so it is built once
    (see `get_concept_index`, warmed from the app lifespan) and cached.
    """

    def __init__(self, concepts=None):
        self._formulas: dict = {}
        self._answers: dict = {}
        for concept in concepts or []:
            cid = str(concept.get("concept_id") or concept.get("id") or "")
            if not cid:
                continue
            formula = str(concept.get("formula") or "")
            if formula:
                self._formulas[cid] = formula
            pairs = concept.get("questions") or []
            if pairs:
                self._answers[cid] = pairs

    @classmethod
    def from_corpus(cls, limit_files: int = 4000) -> "ConceptIndex":
        root = Path(__file__).resolve().parents[1] / "its" / "questions" / "generated"
        concepts: list = []
        for i, path in enumerate(root.glob("catalog_*.json")):
            if i >= limit_files:
                break
            try:
                data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
            except (json.JSONDecodeError, OSError):
                continue
            for concept in data.get("concepts") or []:
                concepts.append({
                    "concept_id": str(concept.get("id") or ""),
                    "formula": str(concept.get("formula") or ""),
                    "questions": [
                        (str(q.get("q")), str(q.get("a")))
                        for q in (concept.get("questions") or [])
                        if q.get("q") and q.get("a") is not None
                    ],
                })
        return cls(concepts)

    def __len__(self) -> int:
        return len(self._formulas)

    def formula_for(self, concept_id: str) -> Optional[str]:
        return self._formulas.get(str(concept_id or ""))

    def answer_for(self, concept_id: str, question: Optional[str] = None) -> SolveOutcome:
        return ConceptAnswerStore(
            [{"concept_id": cid, "questions": pairs}
             for cid, pairs in self._answers.items()]
        ).answer_for(concept_id, question) if concept_id in self._answers else _miss()


def _miss() -> SolveOutcome:
    return SolveOutcome(lane="none")


_INDEX: Optional[ConceptIndex] = None


def get_concept_index(build: bool = True) -> Optional[ConceptIndex]:
    """Process-wide cached index. `warm_concept_index()` calls this at startup."""
    global _INDEX
    if _INDEX is None and build:
        try:
            _INDEX = ConceptIndex.from_corpus()
        except Exception:
            _INDEX = None
    return _INDEX


def warm_concept_index() -> Optional[ConceptIndex]:
    """Call from the app lifespan so no student pays the ~2s build cost."""
    return get_concept_index(build=True)


def solve_for_node(question: str, concept_id: str) -> SolveOutcome:
    """The post-routing lanes: formula engine, then curated explanation.

    Order matters. A numeric question must be COMPUTED, never answered with a
    stored explanation; a concept question must never be solved arithmetically.
    """
    index = get_concept_index(build=False)
    if index is None:
        return SolveOutcome(lane="none")
    formula = index.formula_for(concept_id)
    if formula:
        out = solve_with_formula(question, formula)
        if out.matched:
            out.concept_id = str(concept_id)
            return out
    out = index.answer_for(concept_id, question)
    if out.matched:
        out.concept_id = str(concept_id)
    return out


def retrieve_prose(index: "ProseIndex", question: str) -> SolveOutcome:
    """Retrieve a curated EXPLANATION.

    Safety rule, learned the hard way: this lane must never fire on a question
    that asks for a computed value. Token-overlap retrieval will happily match
    a *different* numeric question and return its answer, which looks perfect
    and is wrong. Measured: `"calculate the density of a substance of mass 32
    and volume 70"` returned 1.16484, the answer to a different instance
    (stored: 0.457143). 72 such errors in a 240-question lab.

    So: a question that reads like a computation is refused outright, and only
    a genuinely prose stored answer may be returned.
    """
    out = SolveOutcome(lane="retrieval")
    if _COMPUTED_Q_RE.search(question or ""):
        return out  # asked for a number; this lane cannot produce one safely
    hit = index.lookup(question)
    if not hit:
        return out
    answer, concept_id, _score = hit
    if not _is_prose_answer(answer):
        return out
    out.matched = True
    out.answer = answer
    out.concept_id = concept_id
    out.question_type = "explanation"
    out.verification = "retrieved"
    out.confidence = 0.9
    out.steps = ["Answered from the curriculum explanation for this concept."]
    return out


# ---------------------------------------------------------------------------
# Unified entry point
# ---------------------------------------------------------------------------
def solve_all(question: str, formula: Optional[str] = None,
              prose_index: Optional["ProseIndex"] = None,
              allow_retrieval: bool = False) -> SolveOutcome:
    """Try every lane, cheapest and most certain first.

    Order matters: an expression question needs no corpus lookup, a formula
    question needs no fuzzy match, and retrieval is last because it is the
    least certain about what was actually asked.

    `allow_retrieval` defaults to FALSE and that is deliberate, not an
    oversight. Measured on a 240-question lab, the retrieval lane produced 33
    confident-but-wrong explanations: bag-of-words token overlap cannot tell
    "the French Revolution" from "the revolutions of 1830-1848", so it returns a
    neighbouring concept's answer. Returning a plausible, well-written,
    WRONG explanation is the single most damaging failure this system can
    make — a student cannot detect it and a teacher cannot spot it.

    Enable it only when the index is semantic (embeddings) rather than lexical,
    and re-run scripts/coverage_lab.py --gate to prove wrong == 0 first.
    """
    outcome = solve_expression_question(question)
    if outcome.matched:
        return outcome
    if formula:
        outcome = solve_with_formula(question, formula)
        if outcome.matched:
            return outcome
    if allow_retrieval and prose_index is not None:
        outcome = retrieve_prose(prose_index, question)
        if outcome.matched:
            return outcome
    return SolveOutcome(lane="none")
