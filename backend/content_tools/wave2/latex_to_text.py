r"""Deterministic LaTeX -> plain-text/Unicode converter for corpus display sections.

The learn page renders DEFINITION/ELI5/WALKTHROUGH/diagnostics/examples/
misconception/competency text VERBATIM (components/learn/AuthoredText.tsx) —
any \frac{..} / \times / $x$ in those sections shows raw to students.
THIS_FORMULA is the exception: it renders through KaTeX MathText, so LaTeX
there is by design and must NOT be converted.

Scope: the simple display dialect this corpus actually uses —
  \times \div \cdot \pm \leq \le \geq \ge \neq \ne \approx \Rightarrow
  \rightarrow \to \leftarrow \angle \triangle \cong \parallel \perp
  \Delta \sum \alpha.. \omega \Omega \pi \theta \circ ^\circ
  \frac \dfrac \tfrac \sqrt \text \mathrm \mathbf \mathit \bar \overline
  \hat \left \right \% \$ \& \quad \, \; \: \ldots \dots \cdots \in \infty
  $...$ inline math, ^{d} / _{d} scripts for digits and common letters.
Anything outside the dialect (e.g. \begin{matrix}) leaves residue that the
caller MUST detect (residue check) and reject the conversion for that
section — the original text ships unchanged and the node lands on the
hand-authoring list.

verify_invariants() enforces:
  1. digit multiset preserved (no number changed)
  2. no raw-LaTeX residue left
"""

import re
from collections import Counter

# ---- simple symbol commands (no arguments) ----
_SYMBOLS = {
    "times": "×", "div": "÷", "cdot": "·", "pm": "±", "mp": "∓",
    "leq": "≤", "le": "≤", "leqslant": "≤", "geq": "≥", "ge": "≥",
    "geqslant": "≥", "neq": "≠", "ne": "≠", "approx": "≈", "equiv": "≡",
    "propto": "∝", "Rightarrow": "⇒", "rightarrow": "→", "to": "→",
    "leftarrow": "←", "leftrightarrow": "↔", "Leftrightarrow": "⇔",
    "angle": "∠", "triangle": "△", "cong": "≅", "sim": "∼",
    "parallel": "∥", "perp": "⊥", "infty": "∞", "in": "∈",
    "Delta": "Δ", "sum": "Σ", "prod": "∏",
    "alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ", "epsilon": "ε",
    "theta": "θ", "lambda": "λ", "mu": "μ", "pi": "π", "rho": "ρ",
    "sigma": "σ", "phi": "φ", "omega": "ω", "Omega": "Ω", "pi": "π",
    "degree": "°", "circ": "°", "ldots": "…", "dots": "…", "cdots": "…",
    "prime": "′", "implies": "⟹", "uparrow": "↑", "downarrow": "↓",
    "square": "□", "therefore": "∴", "because": "∵", "star": "⋆",
    "bullet": "•", "llcorner": "∟", "textdegree": "°", "bigodot": "⊙",
    "bigtriangleup": "△", "bigcirc": "○", "blacksquare": "■",
}

# functions rendered as the word itself (drop the backslash)
_WORDFUNCS = {"ln", "log", "sin", "cos", "tan", "max", "min", "gcd", "lcm",
              "sec", "csc", "cot", "mod", "deg"}

_BB = {"Z": "ℤ", "R": "ℝ", "N": "ℕ", "Q": "ℚ", "C": "ℂ", "E": "𝔼"}

_SUPER = {"0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵",
          "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "-": "⁻",
          "n": "ⁿ", "i": "ⁱ", "k": "ᵏ", "o": "°", "(": "⁽", ")": "⁾"}
_SUB = {"0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅",
        "6": "₆", "7": "₇", "8": "₈", "9": "₉", "+": "₊", "-": "₋",
        "n": "ₙ", "k": "ₖ", "m": "ₘ", "(": "₍", ")": "₎"}

_GROUP_CMD_RE = re.compile(
    r"\\(?P<cmd>frac|dfrac|tfrac|sqrt|text|textrm|mathrm|mathbf|mathit|"
    r"mathsf|mbox|textbf|underline|overline|bar|hat|vec|dot|xrightarrow|"
    r"stackrel|mathbb|underbrace|overbrace)\b")

_RESIDUE_RE = re.compile(r"\\[a-zA-Z]+|\\\(|\\\[|\$.+|\$\$")


def _find_group(s: str, i: int):
    """s[i] must be '{'. Return (content, index_after_closing_brace) or None."""
    if i >= len(s) or s[i] != "{":
        return None
    depth = 0
    for j in range(i, len(s)):
        if s[j] == "{":
            depth += 1
        elif s[j] == "}":
            depth -= 1
            if depth == 0:
                return s[i + 1: j], j + 1
    return None


def _simple(tok: str) -> bool:
    """Single alphanumeric run (a/b style, no internal spaces or ops)."""
    return bool(re.fullmatch(r"[A-Za-z0-9]+", tok.strip()))


def convert_once(s: str):
    """One normalisation pass. Returns (new_string, n_changes)."""
    n = 0
    out = []
    i = 0
    while i < len(s):
        ch = s[i]
        if ch == "\\":  # a command or escape
            # inline/display math DELIMITERS \( \) \[ \] — pure typography, drop
            if s[i:i+2] in (r"\(", r"\)", r"\[", r"\]"):
                out.append(""); n += 1
                i += 2
                continue
            m = _GROUP_CMD_RE.match(s, i)
            if m:
                cmd = m.group("cmd")
                j = m.end()
                g1 = _find_group(s, j) if j < len(s) and s[j] == "{" else None
                if cmd == "sqrt" and g1 is None and j < len(s) and s[j] == "[":
                    k = s.find("]", j)
                    if k != -1:
                        g2 = _find_group(s, k + 1)
                        if g2:
                            deg, body = s[j + 1: k], g2[0]
                            out.append(f"{deg}√({convert_once(body)[0]})")
                            n += 1
                            i = g2[1]
                            continue
                if g1:
                    a, after = g1
                    if cmd == "mathbb":
                        out.append(_BB.get(a.strip(), a))
                        n += 1
                        i = after
                        continue
                    if cmd in ("underbrace", "overbrace"):
                        out.append(convert_once(a)[0])  # decoration dropped
                        n += 1
                        i = after
                        continue
                    if cmd == "xrightarrow":
                        # \xrightarrow{heat} A  ->  "—heat→" (reaction arrow label)
                        out.append(f"—{a}→" if a.strip() else "→")
                        n += 1
                        i = after
                        continue
                    if cmd == "stackrel":
                        # \stackrel{X}{=} -> "X=" style; emit label then next group
                        g2 = _find_group(s, after) if after < len(s) and s[after] == "{" else None
                        if g2:
                            b, after2 = g2
                            out.append(f"{a}{convert_once(b)[0]}")
                            n += 1
                            i = after2
                            continue
                        out.append(a); n += 1; i = after; continue
                    if cmd == "sqrt":
                        a_conv = convert_once(a)[0]
                        out.append(f"√{a_conv}" if _simple(a) else f"√({a_conv})")
                        n += 1
                        i = after
                        continue
                    if cmd in ("text", "textrm", "mathrm", "mathbf", "mathit",
                               "mathsf", "mbox", "textbf"):
                        out.append(a)
                        n += 1
                        i = after
                        continue
                    if cmd in ("underline", "overline", "bar", "hat", "vec", "dot"):
                        out.append(a)  # decoration not representable — drop it
                        n += 1
                        i = after
                        continue
                    # frac family: need a second group
                    g2 = _find_group(s, after) if after < len(s) and s[after] == "{" else None
                    if g2:
                        b, after2 = g2
                        a_c, b_c = convert_once(a)[0], convert_once(b)[0]
                        if _simple(a) and _simple(b):
                            out.append(f"{a_c}/{b_c}")
                        else:
                            out.append(f"({a_c})/({b_c})")
                        n += 1
                        i = after2
                        continue
                out.append(m.group(0))  # leave for residue detection
                i = m.end()
                continue
            m = re.match(r"\\([a-zA-Z]+)", s[i:])
            if m:
                name = m.group(1)
                if name in _SYMBOLS:
                    out.append(_SYMBOLS[name]); n += 1
                    i += m.end()
                    continue
                if name in _WORDFUNCS:
                    out.append(name); n += 1
                    i += m.end()
                    continue
                if name == "left" or name == "right":
                    # keep the delimiter itself
                    k = i + m.end()
                    if k < len(s) and s[k] in "([{|)].":
                        out.append(s[k]); n += 1
                        i = k + 1
                    elif k < len(s) and s[k] == "\\":
                        out.append(""); n += 1
                        i = k
                    else:
                        out.append(""); n += 1
                        i = k
                    continue
                if name == "quad" or name == "qquad":
                    out.append(" "); n += 1
                    i += m.end()
                    continue
                if name == "%":
                    out.append("%"); n += 1
                    i += m.end()
                    continue
                if name == "$":
                    out.append("$"); n += 1
                    i += m.end()
                    continue
                if name == "&":
                    out.append("&"); n += 1
                    i += m.end()
                    continue
                if name == "{":
                    out.append("{"); n += 1; i += 2; continue
                if name == "}":
                    out.append("}"); n += 1; i += 2; continue
                if name == "," or name == ";" or name == ":":
                    out.append(" "); n += 1
                    i += m.end()
                    continue
                if name == "\\":  # row separator
                    out.append("; "); n += 1
                    i += 2
                    continue
                # unknown command — leave; residue check will catch it
                out.append(m.group(0))
                i += m.end()
                continue
            # escaped single non-letter (e.g. \! )
            out.append(s[i + 1] if i + 1 < len(s) else "")
            n += 1
            i += 2
            continue
        if ch == "$":
            # inline math: convert the inside, drop the delimiters.
            # $$ first.
            if s.startswith("$$", i):
                k = s.find("$$", i + 2)
                if k != -1:
                    inner = convert_once(s[i + 2: k])[0]
                    out.append(inner); n += 1
                    i = k + 2
                    continue
            k = s.find("$", i + 1)
            if k != -1:
                inner = convert_once(s[i + 1: k])[0]
                out.append(inner); n += 1
                i = k + 1
                continue
            out.append(""); n += 1  # stray opening $ — drop
            i += 1
            continue
        out.append(ch)
        i += 1
    new = "".join(out)

    # ^{...} and _{...} scripts (single pass; bodies already converted)
    def _script(mo):
        nonlocal n
        kind, body = mo.group(1), mo.group(2)
        table = _SUPER if kind == "^" else _SUB
        if body and all(c in table for c in body):
            n += 1
            return "".join(table[c] for c in body)
        n += 1
        return f"{kind}({body})"
    new = re.sub(r"(\^|_)\{([^{}]*)\}", _script, new)

    # bare ^2 / _2 single-char scripts directly after a char
    def _script1(mo):
        nonlocal n
        kind, body = mo.group(1), mo.group(2)
        table = _SUPER if kind == "^" else _SUB
        if body in table:
            n += 1
            return table[body]
        n += 1
        return f"{kind}{body}"
    new = re.sub(r"(\^|_)([0-9nkmio])(?![0-9])", _script1, new)

    new = re.sub(r"  +", " ", new)
    new = re.sub(r" ,", ",", new)
    # _(label) / ^(label) left by stripped underbrace-style markup:
    # "x_(n times)" -> "x(n times)"
    new = re.sub(r"[_^]\(([^()]*)\)", r"(\1)", new)
    # cosmetic: "( x + y )" -> "(x + y)" (whitespace directly inside parens)
    new = re.sub(r"\( +", "(", new)
    new = re.sub(r" +\)", ")", new)
    return new, n


def convert(text: str):
    """Convert to fixpoint. Returns (text, total_changes)."""
    # ^{\circ} or ^\circ -> °  (never touch a brace that closes an outer group)
    text, pre_n = re.subn(r"\^(?:\{\\circ\}|\\circ)", "°", text)
    total = pre_n
    for _ in range(6):  # nesting depth bound
        new, n = convert_once(text)
        total += n
        if new == text:
            break
        text = new
    return text, total


_UNMAP = str.maketrans(
    "⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉", "01234567890123456789")


def digits_of(s: str) -> Counter:
    """Single-digit multiset, super/subscript digits first mapped back to
    ASCII. Single digits (not runs) on purpose: r^2 -> r2 legitimately
    merges the run when unmapped; what must never change is digit VALUES."""
    return Counter(c for c in s.translate(_UNMAP) if c.isdigit())


def verify_invariants(original: str, converted: str):
    """Return list of violation strings ([] = safe)."""
    bad = []
    if digits_of(original) != digits_of(converted):
        bad.append("digit-multiset changed")
    m = _RESIDUE_RE.search(converted)
    if m:
        bad.append(f"latex residue: {m.group(0)[:40]!r}")
    return bad
