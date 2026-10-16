r"""LaTeX-to-plain-text converter for corpus display text.

Rationale: student-facing prose sections render through AuthoredText, which is
verbatim (it sanitises node ids only). Raw LaTeX in prose reaches the child's
screen as "\frac{70}{3}". The frontend's MathText/KaTeX pipeline exists for
formula-family sections (THIS_FORMULA, FORMULA_VARIABLES, FORMULA_UNITS),
which this tool therefore never touches.

Conversion follows the same intent as lib/display/mathText.ts cleanDisplayText,
but baked into the corpus so verbatim surfaces read cleanly too:
  \frac{70}{3} -> 70/3      \sqrt{x} -> √(x)     \overrightarrow{AB} -> AB⃗
  \triangle -> △            \angle -> ∠          ^{\circ} -> °
  $...$ / \(...\) / \[...\] delimiters are dropped (Unicode math remains).
Anything a rule cannot confidently convert is left untouched and REPORTED as
a residual for hand authoring.
"""

import re

# ---- brace-aware group extraction -------------------------------------------

def extract_group(s: str, open_idx: int):
    """s[open_idx] must be '{'. Return (content, index_after_close)."""
    depth = 0
    for i in range(open_idx, len(s)):
        if s[i] == "{":
            depth += 1
        elif s[i] == "}":
            depth -= 1
            if depth == 0:
                return s[open_idx + 1:i], i + 1
    return None, open_idx  # unbalanced — leave untouched


ONE_ARG_FUNCS = ("overrightarrow", "overline", "underline", "widehat", "hat",
                 "bar", "vec", "text", "mathrm", "mathbf", "mathit",
                 "mathbb", "textit", "textbf", "operatorname")
FUNC_RE = re.compile(r"\\(" + "|".join(ONE_ARG_FUNCS) + r")\s*\{")


def expand_one_arg_funcs(s: str) -> str:
    out = s
    while True:
        m = None
        for fm in FUNC_RE.finditer(out):
            m = fm  # expand leftmost-innermost via repeated passes
            break
        if not m:
            return out
        name = m.group(1)
        arg, end = extract_group(out, m.end() - 1)
        if arg is None:
            return out
        if name == "frac":  # not in ONE_ARG set; kept for safety
            rep = arg
        elif name in ("text", "mathrm", "mathbf", "mathit", "textit",
                      "textbf", "operatorname"):
            rep = arg
        elif name == "mathbb":
            dbl = {"R": "\u211d", "Q": "\u211a", "N": "\u2115", "Z": "\u2124",
                   "I": "\u2145", "C": "\u2102"}
            rep = dbl.get(arg.strip(), arg.strip())
        elif name in ("vec", "overrightarrow"):
            rep = (arg[:1] + "\u20d7" + arg[1:]) if arg else arg
        elif name == "hat" or name == "widehat":
            rep = (arg[:1] + "\u0302" + arg[1:]) if arg else arg
        elif name == "bar":
            rep = (arg[:1] + "\u0304" + arg[1:]) if arg else arg
        else:  # overline, underline
            rep = arg
        out = out[:m.start()] + rep + out[end:]


def expand_frac_sqrt(s: str) -> str:
    out = s
    while True:
        m = re.search(r"\\(frac|dfrac|tfrac|sqrt)\s*\{", out)
        if not m:
            return out
        name = m.group(1)
        a1, after1 = extract_group(out, m.end() - 1)
        if a1 is None:
            return out
        if name == "sqrt":
            rep = ("√" + a1) if re.fullmatch(r"[0-9A-Za-z]+", a1) else ("√(" + a1 + ")")
            out = out[:m.start()] + rep + out[after1:]
        else:
            # mixed number: "23\frac{1}{3}" must render "23 1/3", not "231/3"
            prefix_sp = " " if (m.start() > 0 and out[m.start() - 1].isdigit()) else ""
            # second argument may itself contain braces — scan from after1
            j = after1
            while j < len(out) and out[j] in " \t":
                j += 1
            if j >= len(out) or out[j] != "{":
                return out  # malformed — leave rest untouched
            a2, after2 = extract_group(out, j)
            if a2 is None:
                return out

            def wrap(x):
                return x if re.fullmatch(r"[0-9A-Za-z]+", x) else "(" + x + ")"

            rep = prefix_sp + wrap(a1) + "/" + wrap(a2)
            out = out[:m.start()] + rep + out[after2:]


# ---- symbol map (longest-first so \neq beats \ne, \int beats \in) -----------

SYMBOLS = {
    "Rightarrow": "\u21d2", "Leftarrow": "\u21d0", "Leftrightarrow": "\u21d4",
    "leftrightarrow": "\u2194", "rightarrow": "\u2192", "to": "\u2192",
    "leftarrow": "\u2190", "times": "\u00d7", "div": "\u00f7", "cdot": "\u00b7",
    "approx": "\u2248", "simeq": "\u2243", "cong": "\u2245", "equiv": "\u2261",
    "neq": "\u2260", "ne": "\u2260", "leq": "\u2264", "le": "\u2264",
    "geq": "\u2265", "ge": "\u2265", "infty": "\u221e", "pm": "\u00b1",
    "mp": "\u2213", "propto": "\u221d", "parallel": "\u2225", "perp": "\u22a5",
    "triangle": "\u25b3", "angle": "\u2220", "therefore": "\u2234",
    "because": "\u2235", "ldots": "\u2026", "dots": "\u2026", "cdots": "\u22ef",
    "sum": "\u03a3", "prod": "\u03a0", "int": "\u222b", "in": "\u2208",
    "notin": "\u2209", "subset": "\u2282", "cup": "\u222a", "cap": "\u2229",
    "alpha": "\u03b1", "beta": "\u03b2", "gamma": "\u03b3", "delta": "\u03b4",
    "Delta": "\u0394", "epsilon": "\u03b5", "theta": "\u03b8",
    "lambda": "\u03bb", "mu": "\u03bc", "pi": "\u03c0", "rho": "\u03c1",
    "sigma": "\u03c3", "phi": "\u03c6", "omega": "\u03c9", "Omega": "\u03a9",
    "sin": "sin", "cos": "cos", "tan": "tan", "log": "log", "max": "max",
    "min": "min", "circ": "\u00b0", "degree": "\u00b0",
}
_CMD_NAMES = sorted(SYMBOLS, key=len, reverse=True)
# longest-first alternation, no lookahead: a func expansion may glue a letter
# to a command (\circ\text{C} -> \circC), and °C must still convert
CMD_RE = re.compile(r"\\(" + "|".join(_CMD_NAMES) + r")")

SPACING_COMMA = re.compile(r"\\[,;:!]")
SPACING_QUAD = re.compile(r"\\(?:quad|qquad|left|right)(?![a-zA-Z])")

SUP_MAP = {"0": "\u2070", "1": "\u00b9", "2": "\u00b2", "3": "\u00b3",
           "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
           "8": "\u2078", "9": "\u2079", "+": "\u207a", "-": "\u207b",
           "\u2212": "\u207b", "=": "\u207c", "n": "\u207f", "i": "\u2071",
           "(": "\u207d", ")": "\u207e",
           "a": "\u1d43", "b": "\u1d47", "c": "\u1d9c", "d": "\u1d48",
           "e": "\u1d49", "f": "\u1da0", "g": "\u1d4d", "h": "\u02b0",
           "j": "\u02b2", "k": "\u1d4f", "l": "\u02e1", "m": "\u1d50",
           "o": "\u1d52", "p": "\u1d56", "r": "\u02b3", "s": "\u02e2",
           "t": "\u1d57", "u": "\u1d58", "v": "\u1d5b", "w": "\u02b7",
           "x": "\u02e3", "y": "\u02b8", "z": "\u1dbb"}

SUB_MAP = {"0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083",
           "4": "\u2084", "5": "\u2085", "6": "\u2086", "7": "\u2087",
           "8": "\u2088", "9": "\u2089", "+": "\u208a", "-": "\u208b",
           "\u2212": "\u208b", "=": "\u208c",
           "a": "\u2090", "e": "\u2091", "h": "\u2095", "i": "\u1d62",
           "j": "\u2c7c", "k": "\u2096", "l": "\u2097", "m": "\u2098",
           "n": "\u2099", "o": "\u2092", "p": "\u209a", "r": "\u1d63",
           "s": "\u209b", "t": "\u209c", "u": "\u1d64", "v": "\u1d65",
           "x": "\u2093"}

MULTI_SPACE = re.compile(r"[ \t]{2,}")


def convert_scripts(s: str) -> str:
    def map_script(kind, content):
        table = SUP_MAP if kind == "^" else SUB_MAP
        if content and all(ch in table for ch in content):
            return "".join(table[ch] for ch in content)
        # unmappable braced content: words read fine in parentheses
        if content and re.fullmatch(r"[A-Za-z]+", content):
            return kind + "(" + content + ")"
        return None  # residual

    # braced forms, innermost first
    prev = None
    while prev != s:
        prev = s
        s = re.sub(r"(\^|_)\{([^{}]*)\}",
                   lambda m: map_script(m.group(1), m.group(2)) or m.group(0), s)
    # bare single-char form: x^2, a_1 — only when the char ends there
    s = re.sub(r"(\^|_)([0-9A-Za-z])(?![0-9A-Za-z])",
               lambda m: map_script(m.group(1), m.group(2)) or m.group(0), s)
    return s


def expand_roots(s: str) -> str:
    """\\CUBERT{x} -> ∛(x); \\NTHROOT{n}{x} -> x^(1/n). Markers set by caller."""
    out = s
    while True:
        m = re.search(r"\\CUBERT\{", out)
        if m:
            arg, end = extract_group(out, m.end() - 1)
            if arg is None:
                return out
            inner = arg if re.fullmatch(r"[0-9A-Za-z]+", arg) else "(" + arg + ")"
            out = out[:m.start()] + "∛" + inner + out[end:]
            continue
        m = re.search(r"\\NTHROOT\{([^{}]*)\}\s*\{", out)
        if not m:
            return out
        arg, end = extract_group(out, m.end() - 1)
        if arg is None:
            return out
        n = m.group(1).strip()
        out = out[:m.start()] + arg + "^(1/" + n + ")" + out[end:]


NODEID_TOKEN_RE = re.compile(r"\bc\d+_[a-z0-9_]+\b", re.I)


def to_plain(latex: str) -> str:
    s = latex
    # escaped literals and spacing first
    s = s.replace("\\{", "{").replace("\\}", "}")
    s = s.replace("\\ ", " ")
    s = s.replace("\\%", "%").replace("\\&", "&").replace("\\#", "#")
    # protect node ids (c9_math_ch1_2) from the script converter
    tokens = {}

    def mask(m):
        key = "\x00%d\x00" % len(tokens)
        tokens[key] = m.group(0)
        return key

    s = NODEID_TOKEN_RE.sub(mask, s)
    # cube and general roots (before the fixpoint loop; braces handled here)
    s = re.sub(r"\\sqrt\[3\]\s*\{", lambda m: "\\CUBERT{", s)
    s = re.sub(r"\\sqrt\[([^\]\{]+)\]\s*\{",
               lambda m: "\\NTHROOT{" + m.group(1) + "}{", s)
    s = expand_roots(s)
    for _ in range(4):  # to fixpoint: \circ\text{C} -> °C needs a second pass
        prev = s
        s = expand_frac_sqrt(s)
        s = expand_one_arg_funcs(s)
        s = SPACING_COMMA.sub(" ", s)
        s = SPACING_QUAD.sub(" ", s)
        s = CMD_RE.sub(lambda m: SYMBOLS[m.group(1)], s)
        if s == prev:
            break
    s = re.sub(r"\^\s*\u00b0", "\u00b0", s)  # ^\circ -> ° (bare form)
    s = convert_scripts(s)
    # drop math delimiters
    s = s.replace("\\(", "").replace("\\)", "")
    s = s.replace("\\[", "").replace("\\]", "")
    s = s.replace("$", "")
    s = MULTI_SPACE.sub(" ", s)
    s = re.sub(r"[ \t]+\n", "\n", s)
    # restore node ids
    for key, val in tokens.items():
        s = s.replace(key, val)
    return s


def residual_report(plain: str):
    """Return list of residual problems (empty = clean)."""
    issues = []
    if "\\" in plain:
        for m in re.finditer(r"\\[a-zA-Z]+|\\", plain):
            issues.append(f"backslash: ...{plain[max(0,m.start()-30):m.end()+30]!r}")
            break
    if "$" in plain:
        issues.append("stray $ remains")
    if re.search(r"[\^_]\{", plain):
        issues.append("unconverted script braces")
    if plain.count("(") != plain.count(")"):
        issues.append("unbalanced parens")
    if re.search(r"[\u2070-\u209c]{6,}", plain):
        issues.append("very long script run (check readability)")
    return issues
