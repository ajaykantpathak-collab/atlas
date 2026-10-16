"""W5 LaTeX-to-Unicode transcoder for the CISCE 6-10 lane.

The platform convention (CBSE enhanced_nodes_md, verified) carries math as
unicode text; the student-facing learn page renders corpus bodies verbatim
(AuthoredText, no KaTeX), so raw LaTeX commands and $..$/\\(..\\) delimiters
leak to the screen.  The slop gate likewise normalises LaTeX -> Unicode.

Safety design:
  - top-down recursive expansion (no innermost bookkeeping, always terminates)
  - superscript/subscript fallbacks never reproduce the input (no re-match)
  - inline code spans (`...`) and fenced blocks are left untouched
  - dry-run mode reports leftovers before any write

Usage:
  python w5_latex_scrub.py --dry-run
  python w5_latex_scrub.py --apply   (backups + digest guard inside apply)
"""

import argparse
import hashlib
import os
import re
import shutil
import sys

CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
BACKUP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backups", "W5_latex")
LANE_RE = re.compile(r"^c(\d+)_([a-z]+)_icse_\d+_\d+\.md$", re.I)
PARKED = {"hin", "eng"}

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)

GREEK = {
    "alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ", "Delta": "Δ",
    "epsilon": "ε", "varepsilon": "ε", "zeta": "ζ", "eta": "η", "theta": "θ",
    "Theta": "Θ", "iota": "ι", "kappa": "κ", "lambda": "λ", "Lambda": "Λ",
    "mu": "μ", "nu": "ν", "xi": "ξ", "pi": "π", "Pi": "Π", "rho": "ρ",
    "sigma": "σ", "Sigma": "Σ", "tau": "τ", "upsilon": "υ", "phi": "φ",
    "varphi": "φ", "Phi": "Φ", "chi": "χ", "psi": "ψ", "Psi": "Ψ",
    "omega": "ω", "Omega": "Ω", "Gamma": "Γ",
}
OPS = {
    "times": "×", "cdot": "·", "div": "÷", "pm": "±", "mp": "∓",
    "approx": "≈", "neq": "≠", "ne": "≠", "leq": "≤", "le": "≤",
    "geq": "≥", "ge": "≥", "equiv": "≡", "propto": "∝", "infty": "∞",
    "degree": "°", "circ": "∘", "rightarrow": "→", "to": "→",
    "leftarrow": "←", "Rightarrow": "⇒", "leftrightarrow": "↔",
    "Leftrightarrow": "⇔", "mapsto": "↦", "cdots": "⋯", "ldots": "…",
    "dots": "…", "vdots": "⋮", "angle": "∠", "triangle": "△", "perp": "⊥",
    "parallel": "∥", "in": "∈", "notin": "∉", "subset": "⊂", "subseteq": "⊆",
    "cup": "∪", "cap": "∩", "emptyset": "∅", "forall": "∀", "exists": "∃",
    "therefore": "∴", "because": "∵", "sum": "∑", "prod": "∏", "int": "∫",
    "partial": "∂", "nabla": "∇", "prime": "′", "mid": "|",
    "gg": "≫", "ll": "≪", "varnothing": "∅", "sim": "∼",
    "rightleftharpoons": "⇌", "leftrightharpoons": "⇋",
}
FUNCS = {"sin", "cos", "tan", "cot", "sec", "csc", "log", "ln", "exp",
         "max", "min", "gcd", "lcm", "arcsin", "arccos", "arctan", "det",
         "deg", "mod", "bmod", "lim"}
OPS.update({
    "int": "∫", "downarrow": "↓", "uparrow": "↑", "iff": "⇔",
    "implies": "⇒", "longrightarrow": "→", "longleftarrow": "←",
    "longleftrightarrow": "↔", "square": "□", "blacksquare": "■",
    "ast": "∗", "star": "∗", "circ": "∘", "bullet": "•", "top": "⊤",
    "lfloor": "⌊", "rfloor": "⌋", "lceil": "⌈", "rceil": "⌉",
})

SUPER = dict(zip("0123456789+-=()ni", "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱ"))
SUPER.update(dict(zip("abcdefghijhklmoprstuvwxyz",
                      "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻ")))
SUB = dict(zip("0123456789+-=()naehijklorstuvx",
               "₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₙₐₑₕᵢⱼₖₗₒᵣₛₜᵤᵥₓ"))
ACCENTS = {"bar": "\u0305", "vec": "\u20d7", "hat": "\u0302", "dot": "\u0307",
           "ddot": "\u0308", "tilde": "\u0303", "overline": "\u0305"}

ARG_CMDS = ("frac", "dfrac", "tfrac", "sqrt", "text", "mathrm", "mathit",
            "mathbf", "mathbb", "operatorname", "bar", "vec", "hat", "dot",
            "ddot", "tilde", "overline")
ARG_CMD_RE = re.compile(r"(?<!\\)\\" + "(" + "|".join(ARG_CMDS) + r")(?![a-zA-Z])")


def read_group(s: str, i: int):
    """s[i] must be '{'. Return (content, index after '}') or (None, i)."""
    depth = 0
    for j in range(i, len(s)):
        c = s[j]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return s[i + 1:j], j + 1
    return None, i


def expand(s: str, depth: int = 0) -> str:
    """Top-down: expand the first arg-command; recurse into its args."""
    if depth > 60 or "\\" not in s:
        return s
    m = ARG_CMD_RE.search(s)
    if not m:
        return s
    cmd = m.group(1)
    i = m.end()
    while i < len(s) and s[i] == " ":
        i += 1
    arg1, j = ("", i)
    if i < len(s) and s[i] == "{":
        arg1, j = read_group(s, i)
        if arg1 is None:  # unbalanced: drop the command name only
            return s[:m.start()] + s[m.end():]
        arg1 = expand(arg1, depth + 1)
    elif i < len(s) and s[i].isalnum():
        # brace-less single-token argument (\mathbb R, \frac12, \bar x)
        arg1, j = s[i], i + 1
    if cmd in ("frac", "dfrac", "tfrac"):
        k = j
        while k < len(s) and s[k] == " ":
            k += 1
        arg2 = ""
        if k < len(s) and s[k] == "{":
            arg2, j = read_group(s, k)
            if arg2 is None:
                return s[:m.start()] + s[m.end():]
            arg2 = expand(arg2, depth + 1)
        elif k < len(s) and (s[k].isalnum()):
            arg2, j = s[k], k + 1
        repl = f"{paren_if_needed(arg1)}/{paren_if_needed(arg2)}"
    elif cmd == "sqrt":
        idx = None
        k = j
        if k < len(s) and s[k] == "[":
            close = s.find("]", k)
            if close != -1:
                idx = s[k + 1:close]
                k = close + 1
        if k < len(s) and s[k] == "{":
            arg1b, jb = read_group(s, k)
            if arg1b is not None:
                arg1, j = expand(arg1b, depth + 1), jb
        body = paren_if_needed(arg1)
        if idx:
            sup = to_sup(idx.strip())
            repl = f"{sup}√({body})"
        else:
            repl = f"√({body})"
    elif cmd in ("text", "mathrm", "mathit", "mathbf", "mathbb", "operatorname"):
        repl = re.sub(r"\\[,;:!]", " ", arg1)
    else:  # accents / overline
        repl = arg1 + ACCENTS[cmd]
    return s[:m.start()] + repl + expand(s[j:], depth + 1)


def paren_if_needed(t: str) -> str:
    t = t.strip()
    if len(t) <= 1 or re.fullmatch(r"[0-9]+(\.[0-9]+)?", t) or re.fullmatch(r"\([^()]*\)", t):
        return t
    return f"({t})"


def to_sup(body: str):
    out = []
    for c in body:
        if c == " ":
            continue
        if c in SUPER:
            out.append(SUPER[c])
        else:
            return None
    return "".join(out)


def to_sub(body: str):
    out = []
    for c in body:
        if c == " ":
            continue
        if c in SUB:
            out.append(SUB[c])
        else:
            return None
    return "".join(out)


def convert_scripts(s: str) -> str:
    # ^{...} / ^x  — fallback wraps in ^( ) so the regex can never rematch
    def sup_group(m):
        body = m.group(1).strip()
        if body == "\\circ":
            return "°"
        r = to_sup(body)
        return r if r is not None else f"^({body})"

    def sub_group(m):
        r = to_sub(m.group(1).strip())
        return r if r is not None else f"_({m.group(1).strip()})"

    s = re.sub(r"\^\{([^{}]*)\}", sup_group, s)
    s = re.sub(r"_\{([^{}]*)\}", sub_group, s)
    s = re.sub(r"\^([0-9A-Za-z])", lambda m: to_sup(m.group(1)) or f"^({m.group(1)})", s)
    # prose guard: a bare _x is a LaTeX subscript ONLY when x is a digit or a
    # single lowercase letter followed by a non-letter.  MARKING_POINTS,
    # snake_case and file_name_like prose must pass through untouched.
    def sub_bare(m):
        x = m.group(1)
        r = to_sub(x)
        return r if r is not None else f"_({x})"

    s = re.sub(r"_([0-9])(?![0-9A-Za-z])", sub_bare, s)
    s = re.sub(r"_([a-z])(?![a-zA-Z0-9])", sub_bare, s)
    s = s.replace("^\\circ", "°").replace("^\\text{o}", "°")
    return s


def split_latex_word(w: str):
    """Consume known command prefixes (handles glued \\inR / \\timesV).
    A known prefix whose remainder starts with an uppercase letter or digit
    is emitted together with that literal remainder (LaTeX glues symbols to
    single-letter variables: \\times V -> ×V)."""
    out = []
    while w:
        for L in range(min(len(w), 20), 0, -1):
            p = w[:L]
            hit = None
            if p in GREEK:
                hit = GREEK[p]
            elif p in OPS:
                hit = OPS[p]
            elif p in FUNCS:
                hit = p
            if hit is None:
                continue
            rest = w[L:]
            if rest and len(rest) > 1 and not (rest[0].isupper() or rest[0].isdigit()):
                return None  # unknown command, keep raw
            out.append(hit + rest)
            w = ""
            break
        else:
            return None
    return "".join(out)


def convert_commands(s: str) -> str:
    s = re.sub(r"(?<!\\)\\(quad|qquad)", " ", s)
    s = re.sub(r"(?<!\\)\\[;,:!]", " ", s)
    s = re.sub(r"(?<!\\)\\ ", " ", s)
    s = re.sub(r"(?<!\\)\\left(?![a-zA-Z])\s*|(?<!\\)\\right(?![a-zA-Z])\s*", "", s)
    s = re.sub(r"(?<!\\)\\[Bb]igg?(?:g)?[lmr]?\s*", "", s)  # \big \Bigl ...
    s = re.sub(r"(?<!\\)\\(?:displaystyle|textstyle|nolimits|limits)\b", "", s)
    s = re.sub(r"(?<!\\)\\%", "%", s)

    def word_repl(m):
        r = split_latex_word(m.group(1))
        return r if r is not None else m.group(0)
    return re.sub(r"(?<!\\)\\([A-Za-z]+)", word_repl, s)


MATRIX_ENV_RE = re.compile(
    r"\\begin\{(bmatrix|pmatrix|vmatrix|matrix|array|smallmatrix|cases)\}"
    r"(.*?)\\end\{\1\}", re.S)
WRAP = {"bmatrix": ("[", "]"), "matrix": ("[", "]"), "array": ("[", "]"),
        "smallmatrix": ("[", "]"), "pmatrix": ("(", ")"),
        "vmatrix": ("|", "|"), "cases": ("{ ", " }")}


def convert_matrices(ln: str) -> str:
    """\\begin{bmatrix}a & b\\\\ c & d\\end{bmatrix} -> [a b ; c d]  (rows
    separated by semicolons - the standard plain-text matrix form)."""
    def repl(m):
        l, r = WRAP[m.group(1)]
        body = m.group(2)
        body = body.replace("\\hline", "")
        rows = [rw.strip() for rw in re.split(r"\\\\", body)]
        rows = [rw for rw in rows if rw]
        cells = [" ".join(c.strip() for c in rw.split("&")) for rw in rows]
        return l + " ; ".join(cells) + r
    return MATRIX_ENV_RE.sub(repl, ln)


def strip_delims(s: str) -> str:
    s = re.sub(r"\\\((.+?)\\\)", r"\1", s)
    s = re.sub(r"\\\[(.+?)\\\]", r"\1", s)
    s = re.sub(r"\$\$([^$]+?)\$\$", r"\1", s)
    s = re.sub(r"\$([^$\n]+?)\$", r"\1", s)
    return s


def is_code_line(body: str) -> bool:
    """Fenced / 4-space-indented markdown code lines pass through untouched."""
    return body.lstrip().startswith("```") or re.match(r"^(?:    |\t)\S", body)


ROWSEP = "\x01"  # internal marker used only while slicing matrix rows


def convert_line(ln: str) -> str:
    if "\\" not in ln and "$" not in ln:
        return ln
    ln = convert_matrices(ln)
    ln = expand(ln)
    ln = convert_scripts(ln)
    ln = convert_commands(ln)
    ln = strip_delims(ln)
    return ln


CODE_SPAN_RE = re.compile(r"`[^`]*`")


def transform_text(text: str) -> str:
    out = []
    in_fence = False
    for ln in text.splitlines(keepends=True):
        eol = "\r\n" if ln.endswith("\r\n") else ("\n" if ln.endswith("\n") else "")
        body = ln[: len(ln) - len(eol)]
        if body.lstrip().startswith("```"):
            in_fence = not in_fence
            out.append(ln)
            continue
        if in_fence or is_code_line(body):
            out.append(ln)
            continue
        parts = CODE_SPAN_RE.split(body)
        codes = CODE_SPAN_RE.findall(body)
        rebuilt = "".join(
            convert_line(p) + (codes[i] if i < len(codes) else "")
            for i, p in enumerate(parts))
        out.append(rebuilt + eol)
    joined = "".join(out)
    # matrices can span several lines: convert them file-level, outside code
    if "\\begin{" in joined:
        segs = CODE_SPAN_RE.split(joined)
        codes = CODE_SPAN_RE.findall(joined)
        joined = "".join(
            (convert_matrices(s) if "\\begin{" in s else s)
            + (codes[i] if i < len(codes) else "")
            for i, s in enumerate(segs))
    # any row separator that escaped a matrix environment becomes a space
    return joined.replace(ROWSEP, " ")


def latex_violations(text: str):
    """Lines still carrying latex outside code (fences tracked)."""
    bad = []
    in_fence = False
    for l in text.splitlines():
        if l.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence or is_code_line(l):
            continue
        s = CODE_SPAN_RE.sub("", l)
        s = re.sub(r"[A-Za-z]:\\[^\s\"']*", "", s)  # Windows paths (C:\DOS)
        if re.search(r"\\[A-Za-z]", s) or re.search(r"\$[^$\n]+\$", s):
            bad.append(l)
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--file", help="convert a single file (verification aid)")
    args = ap.parse_args()

    if args.file:
        orig = open(args.file, encoding="utf-8", newline="").read()
        sys.stdout.write(transform_text(orig))
        return 0

    os.makedirs(BACKUP_DIR, exist_ok=True)
    changed, skipped, clean = 0, 0, 0
    leftovers = []
    for fn in sorted(os.listdir(CORPUS)):
        if not LANE_RE.match(fn) or fn.split("_")[1] in PARKED:
            continue
        path = os.path.join(CORPUS, fn)
        orig = open(path, encoding="utf-8", newline="").read()
        new = transform_text(orig)
        if new == orig:
            clean += 1
            continue
        bad = latex_violations(new)
        if bad:
            leftovers.append((fn, bad))
            skipped += 1
            continue
        if not args.apply:
            changed += 1
            continue
        # ---- integrity guard: backup must read back byte-identical, and the
        # written file must read back identical to the intended new text ----
        bak = os.path.join(BACKUP_DIR, fn)
        if not os.path.exists(bak):
            shutil.copy2(path, bak)
        if open(bak, "rb").read() != orig.encode("utf-8"):
            print(f"BACKUP MISMATCH {fn} - aborting batch")
            return 1
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(new)
        if open(path, "rb").read() != new.encode("utf-8"):
            print(f"WRITEBACK MISMATCH {fn} - restoring backup")
            shutil.copy2(bak, path)
            return 1
        changed += 1
    mode = "APPLIED" if args.apply else "DRY-RUN"
    print(f"[{mode}] changed={changed} leftover={skipped} clean={clean}")
    if leftovers:
        print(f"{len(leftovers)} files with leftovers (exotic constructs):")
        for fn, bad in leftovers[:20]:
            for l in bad[:2]:
                m = re.search(r"(\\[A-Za-z]+| \$[^$]+\$|[^$]\$[^$]+\$)", l)
                ctx = l[max(0, (m.start() if m else 0) - 50): (m.end() if m else 60) + 50]
                print(f"  {fn}: ...{ctx}...")
    return 0


if __name__ == "__main__":
    sys.exit(main())
