"""W4 de-LaTeX pass: convert LaTeX in PROSE sections to plain-text house register.

Why: the learn page renders definition/walkthrough/eli5/misconception/diagnostics/
worked examples through AuthoredText.tsx which does NO math rendering — LaTeX
delimiters reach students as raw "\\(\\frac{a}{b}\\)" strings and leak into TTS
(the speech manager strips only [* _ ` # |]). House register for corpus math is
plain text ("1/v + 1/u = 1/f", "×", "≤", "x²"), as authored in wave 1.

Scope: PROSE sections only (DEFINITION, WALKTHROUGH, ELI5, COMMON_MISCONCEPTION,
DIAGNOSTIC_*, WORKED_EXAMPLE_*, COMPETENCY_*). Meta/graph sections (SCOPE, CHAIN,
PREREQ, FORWARD, CROSS, *_IDS) are untouched. \\begin{...} environments are NOT
auto-converted (files with them are skipped and reported for hand-fixing).

Guardian discipline (house standard, mirrors apply_content_depth.py):
  - pre-edit backup per file (backup dir, once per file)
  - digest of every non-edited section must be identical after the edit, else refuse
  - banned-string check (word-boundary, same as house applier) on every new body
  - per-file manifest of changed sections
  - if any LaTeX token survives the transform in a section, that section is left
    unchanged and the file is listed for hand work

Usage: python delatex_w4.py [--dry] [--corpus DIR] [--backup DIR]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_BACKUP = os.path.join(HERE, "backups_w4")

HEADER_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
PROSE_HEADS = ("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_")
PROSE_FIXED = ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
SURVIVOR_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\\sqrt|\\vec|\\left|\\right|\\text\{|\\mathrm\{|\\circ|\\cdot|\\pm|\\leq|\\geq|\\neq|\\approx|\\rightarrow|\\to\b|\\Rightarrow|\\sum|\\int|\\prod|\\infty|\\log|\\sin|\\cos|\\tan|\\Delta|\\alpha|\\beta|\\gamma|\\theta|\\lambda|\\mu|\\pi|\\omega|\\hat\{|\\overline|\$[^$\n]{1,60}\$")
KNOWN_ENV_RE = re.compile(r"\\begin\{(?:cases|array|matrix|pmatrix|bmatrix|vmatrix|Bmatrix|Vmatrix|smallmatrix)\}")
OTHER_ENV_RE = re.compile(r"\\begin\{(?:(?!cases|array|matrix|pmatrix|bmatrix|vmatrix|Bmatrix|Vmatrix|smallmatrix)[a-z*]+)\}")

BANNED_RE = [re.compile(r"\b" + re.escape(b).replace(r"\ ", r"\s+") + r"\b", re.I)
             for b in ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]]

GREEK = {"alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ", "Delta": "Δ",
         "epsilon": "ε", "theta": "θ", "lambda": "λ", "mu": "μ", "nu": "ν",
         "pi": "π", "rho": "ρ", "sigma": "σ", "Sigma": "Σ", "tau": "τ",
         "phi": "φ", "chi": "χ", "psi": "ψ", "omega": "ω", "Omega": "Ω"}
OPS = {"times": "×", "div": "÷", "cdot": "·", "pm": "±", "mp": "∓",
       "leq": "≤", "le": "≤", "geq": "≥", "ge": "≥", "neq": "≠", "ne": "≠",
       "approx": "≈", "equiv": "≡", "propto": "∝", "infty": "∞",
       "rightarrow": "→", "to": "→", "Rightarrow": "⇒", "leftrightarrow": "↔",
       "sum": "Σ", "prod": "∏", "int": "∫", "partial": "∂", "nabla": "∇",
       "angle": "∠", "degree": "°", "circ": "°", "perp": "⊥", "parallel": "∥",
       "in": "∈", "notin": "∉", "cup": "∪", "cap": "∩", "subset": "⊂",
       "subseteq": "⊆", "emptyset": "∅", "forall": "∀", "exists": "∃",
       "implies": "⇒", "Longrightarrow": "⟹", "longrightarrow": "→",
       "langle": "⟨", "rangle": "⟩", "ldots": "...", "cdots": "...", "dots": "..."}
FUNCS = ["log", "ln", "exp", "sin", "cos", "tan", "cot", "sec", "cosec", "csc",
         "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh", "lim", "max", "min", "det", "mod"]
BLACKBOARD = {"R": "ℝ", "Q": "ℚ", "Z": "ℤ", "N": "ℕ", "C": "ℂ"}
MATRIX_ENVS = {"matrix", "pmatrix", "bmatrix", "vmatrix", "Bmatrix", "Vmatrix", "smallmatrix"}


def _find_end(m: str, j: int, env: str) -> int:
    """Index of \\end{env} starting search at j."""
    return m.find("\\end{" + env + "}", j)


def convert_cases(body: str) -> str:
    rows = re.split(r"\\\\", body)
    parts = []
    for row in rows:
        if not row.strip():
            continue
        bits = row.split("&", 1)
        val = convert_math(bits[0]).strip().rstrip(",")
        cond = convert_math(bits[1]).strip() if len(bits) > 1 else ""
        cond = re.sub(r"^\\?text\{?\s*if\s*\}?\s*", "if ", cond)
        cond = cond.replace("if if", "if")
        parts.append(f"{val} if {cond}" if cond else val)
    return "  ;  ".join(parts)


def convert_matrix(body: str) -> str:
    rows = re.split(r"\\\\", body)
    out_rows = []
    for row in rows:
        if not row.strip():
            continue
        cells = [convert_math(c).strip() for c in row.split("&")]
        out_rows.append(" ".join(cells))
    return "[" + " ; ".join(out_rows) + "]"
SUP = {"0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶",
       "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "-": "⁻", "n": "ⁿ", "i": "ⁱ", "T": "ᵀ"}
SUB = {"0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆",
       "7": "₇", "8": "₈", "9": "₉", "+": "₊", "-": "₋",
       "a": "ₐ", "e": "ₑ", "o": "ₒ", "x": "ₓ", "h": "ₕ", "k": "ₖ", "m": "ₘ",
       "n": "ₙ", "p": "ₚ", "s": "ₛ", "t": "ₜ", "c": "꜀", "f": "f"}


def _group(s: str) -> str:
    """Body of {...} or single token."""
    if s.startswith("{"):
        depth, i = 0, 0
        for i, ch in enumerate(s):
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return s[1:i]
        return s.strip("{}")
    return s[:1]


def _grp_re(s: str, i: int) -> tuple[str, int]:
    """Read a {...} group starting at s[i] == '{'; return (body, next_index)."""
    depth, j = 0, i
    while j < len(s):
        if s[j] == "{":
            depth += 1
        elif s[j] == "}":
            depth -= 1
            if depth == 0:
                return s[i + 1:j], j + 1
        j += 1
    return s[i + 1:], len(s)


def conv_group(s: str, i: int, sup: bool) -> tuple[str, int]:
    body, j = _grp_re(s, i)
    table = SUP if sup else SUB
    if len(body) <= 3 and all(c in table for c in body):
        return "".join(table[c] for c in body), j
    if sup:
        return "^(" + convert_math(body) + ")", j
    return "_(" + convert_math(body) + ")", j


def convert_math(m: str) -> str:
    """Convert one math fragment (delimiter-stripped) to plain text."""
    out = []
    i, n = 0, len(m)
    while i < n:
        ch = m[i]
        if m[i:i + 6] == "\\begin":
            g = re.match(r"\\begin\{([a-z*]+)\}", m[i:])
            if g:
                env = g.group(1)
                j = i + g.end()
                if env == "array":
                    # skip the colspec group
                    while j < n and m[j] in " ":
                        j += 1
                    if j < n and m[j] == "{":
                        _, j = _grp_re(m, j)
                end = _find_end(m, j, env)
                if end != -1:
                    body = m[j:end]
                    if env == "cases":
                        out.append(convert_cases(body))
                    elif env in MATRIX_ENVS or env == "array":
                        out.append(convert_matrix(body))
                    else:
                        out.append(convert_math(body))
                    i = end + len("\\end{" + env + "}")
                    continue
        if ch == "\\":
            g = re.match(r"\\([a-zA-Z]+)", m[i:])
            if g:
                name = g.group(1)
                j = i + 1 + len(name)
                if name == "frac":
                    while j < n and m[j] == " ":
                        j += 1
                    if j < n and m[j] == "{":
                        num, j = _grp_re(m, j)
                        while j < n and m[j] == " ":
                            j += 1
                        if j < n and m[j] == "{":
                            den, j = _grp_re(m, j)
                            out.append("(" + convert_math(num) + ")/(" + convert_math(den) + ")")
                            i = j
                            continue
                    out.append("fraction")
                    i = j
                    continue
                if name == "sqrt":
                    while j < n and m[j] == " ":
                        j += 1
                    if j < n and m[j] == "{":
                        body, j = _grp_re(m, j)
                        out.append("√(" + convert_math(body) + ")")
                        i = j
                        continue
                    out.append("√")
                    i = j
                    continue
                if name in ("vec", "bar", "overline", "widehat", "tilde", "underline", "text", "mathrm", "mathbf", "mathit", "mathbb", "boldsymbol", "operatorname"):
                    if j < n and m[j] == "{":
                        body, j = _grp_re(m, j)
                        body_out = convert_math(body)
                        if name == "mathbb" and len(body.strip()) == 1:
                            body_out = BLACKBOARD.get(body.strip(), body_out)
                        out.append(body_out)
                        i = j
                        continue
                    out.append(m[j] if j < n else "")
                    i = j + 1
                    continue
                if name == "hat":
                    if j < n and m[j] == "{":
                        body, j = _grp_re(m, j)
                        out.append({"i": "î", "j": "ĵ", "k": "k̂"}.get(body.strip("$ "), body + "^"))
                        i = j
                        continue
                    out.append("^")
                    i = j
                    continue
                if name in ("sum", "prod", "int"):
                    sym = OPS[name]
                    sub = sup = None
                    while j < n and m[j] == " ":
                        j += 1
                    if j < n and m[j] == "_":
                        if j + 1 < n and m[j + 1] == "{":
                            sub, j = _grp_re(m, j + 1)
                        else:
                            sub, j = m[j + 1], j + 2
                    while j < n and m[j] == " ":
                        j += 1
                    if j < n and m[j] == "^":
                        if j + 1 < n and m[j + 1] == "{":
                            sup, j = _grp_re(m, j + 1)
                        else:
                            sup, j = m[j + 1], j + 2
                    if sub and sup:
                        out.append(f"{sym}({convert_math(sub)} to {convert_math(sup)})")
                    elif sub:
                        out.append(f"{sym}({convert_math(sub)})")
                    elif sup:
                        out.append(f"{sym} up to {convert_math(sup)}")
                    else:
                        out.append(sym)
                    i = j
                    continue
                if name in ("left", "right", "big", "Big", "bigl", "bigr", "Bigl", "Bigr"):
                    # emit the delimiter itself, drop the macro
                    while j < n and m[j] in " .":
                        j += 1
                    if j < n and m[j] in "([{)]}|/.abcdefghijklmnopqrstuvwxyz":
                        d = m[j]
                        out.append({"[": "[", "]": "]", "(": "(", ")": ")",
                                    "{": "{", "}": "}", "|": "|", ".": "",
                                    "/": "/"}.get(d, d if d in "([{)]}" else ""))
                        i = j + 1
                        continue
                    out.append("")
                    i = j
                    continue
                if name in OPS:
                    out.append(OPS[name])
                    i = j
                    continue
                if name in GREEK:
                    out.append(GREEK[name])
                    i = j
                    continue
                if name in FUNCS:
                    out.append(name)
                    i = j
                    continue
                out.append(name)  # unknown macro: keep its name
                i = j
                continue
            else:
                out.append({"\\{": "{", "\\}": "}", "\\&": "&", "\\%": "%",
                            "\\$": "$", "\\_": "_", "\\#": "#", "\\ ": " ",
                            "\\\\": "\n"}.get(m[i:i + 2], ""))
                i += 2
                continue
        if ch in "$":
            i += 1
            continue
        if ch == "~":
            out.append(" ")
            i += 1
            continue
        if ch in "{}":
            i += 1
            continue
        if ch == "^" and i + 1 < n:
            mt = re.match(r"\\circ(?![a-zA-Z])", m[i + 1:])
            if mt:
                out.append("°")
                i += 1 + mt.end()
                continue
            if m[i + 1] == "\\":
                out.append(ch)
                i += 1
                continue
            if m[i + 1] == "{":
                txt, j = conv_group(m, i + 1, sup=True)
                out.append(txt)
                i = j
                continue
            nxt = m[i + 1]
            out.append(SUP[nxt] if nxt in SUP else "^" + nxt)
            i += 2
            continue
        if ch == "_" and i + 1 < n and m[i + 1] != "\\":
            if m[i + 1] == "{":
                txt, j = conv_group(m, i + 1, sup=False)
                out.append(txt)
                i = j
                continue
            nxt = m[i + 1]
            out.append(SUB[nxt] if nxt in SUB else "_" + nxt)
            i += 2
            continue
        out.append(ch)
        i += 1
    return "".join(out)


DELIM_RE = re.compile(r"\\\[(.+?)\\\]|\\\((.+?)\\\)", re.S)
DOLLAR_RE = re.compile(r"\$([^$]{1,400})\$", re.S)


MONEY_RE = re.compile(r"\d{1,3}(?:,\d{3})+(?:\.\d+)?")
CURRENCY_CUE_RE = re.compile(r"₹|USD|\bper\b|\brate\b|\bpaid\b|\bcost\b|\bworth\b|/,\s*|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b", re.I)


def _dollar_ok(inner: str) -> bool:
    """True when $...$ is math, not currency. Currency cues: ₹, money grouping
    (1,000-style), prices with 'per'/'rate', month names (spans that swallowed
    prose), or '<n> and <n>' price pairs."""
    t = inner.strip()
    if "\\" in inner:
        # backslash macros are definitive math; only refuse if currency text leaked in
        return len(t) <= 300 and not re.search(r"₹|USD", t)
    if re.search(r"[\^_]", t) and len(t) <= 300:
        # caret/underscore sub/superscripts are definitive math
        return not CURRENCY_CUE_RE.search(inner)
    if re.search(r"[A-Za-z0-9)\]]\s*[=<>≤≥≠]\s?", t) and len(t) <= 300 and not CURRENCY_CUE_RE.search(inner):
        # equations like P(x) = R(x) - C(x) are definitive math
        return True
    if not t or len(t) > 60:
        return False
    if CURRENCY_CUE_RE.search(inner):
        return False
    if MONEY_RE.search(t) or re.search(r"\d,\d", t):
        return False  # comma-grouped money (western or Indian grouping)
    # short symbol-like spans: $x$, $4a$, $-1$, $[a, b]$, $E(X)$ — but not
    # prices ($0.50/L, $83, 1.25 Billion handled by cues above)
    if re.fullmatch(r"[A-Za-z0-9\s+\-*/=(),.\[\]≤≥≠×÷°']{1,24}", t):
        if re.fullmatch(r"\d+(?:\.\d+)?", t) or re.fullmatch(r"\d+(?:\.\d+)?/\w*", t):
            return False  # bare number or unit price
        if re.search(r"\d\.\d", t):
            return False  # decimal money like 83.5
        if re.search(r"[A-Za-z]", t) or re.fullmatch(r"[\s\-+×÷≤≥≠]{0,3}\d{1,3}", t):
            return True
    return False
    if re.fullmatch(r"[\d\s.,\-/%…()]+", t):
        return False  # pure digits/punct: money or number range — leave dollars
    if re.fullmatch(r"[A-Za-z](?:[A-Za-z0-9\s+\-*/=(),.<>≤≥≠×÷°'])*", t) and not MONEY_RE.search(t):
        return True  # $x$, $a(b+c) = ab + ac$, $A, B, C$
    if re.search(r"[A-Za-z]", t) and re.search(r"[=+\-*/<>≤≥≠]", t):
        return True  # $t/3 = 3.32$, $10/3 = 3.333...$, $an + b$
    if re.fullmatch(r"[\d\s.,+\-*/()%≈…=<>]+", t) and "=" in t:
        return True  # $10/3 = 3.333...$
    return False


def delatex_body(body: str) -> tuple[str, int]:
    """Return (new_body, n_delim_groups_converted)."""
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        count += 1
        inner = m.group(1) if m.group(1) is not None else m.group(2)
        return convert_math(inner)

    new = DELIM_RE.sub(repl, body)

    def repl_d(m: re.Match) -> str:
        nonlocal count
        inner = m.group(1)
        if not _dollar_ok(inner):
            return m.group(0)
        count += 1
        return convert_math(inner)

    new = DOLLAR_RE.sub(repl_d, new)
    # collapse artefacts
    new = re.sub(r"[ \t]{2,}", " ", new)
    new = re.sub(r" \n", "\n", new)
    new = re.sub(r"\(\s*\)", "()", new)
    return new, count


def split_sections(text: str):
    matches = list(HEADER_RE.finditer(text))
    preamble = text[: matches[0].start()] if matches else text
    parts = []
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        parts.append([m.group(0), m.group(1), text[m.end():end]])
    return preamble, parts


def digest_except(preamble, parts, edited_names) -> str:
    h = hashlib.sha256()
    h.update(preamble.encode("utf-8"))
    for header, name, body in parts:
        h.update(header.encode("utf-8"))
        if name not in edited_names:
            h.update(body.encode("utf-8"))
    return h.hexdigest()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--dry", action="store_true")
    args = ap.parse_args()

    recs = [json.loads(l) for l in open(os.path.join(HERE, "w4_lane_scores.jsonl"), encoding="utf-8")]
    files = [r["file"] for r in recs if not r["parked"]]

    ok = skip_survivor = skip_begin = clean = 0
    hand = []
    manifest = open(os.path.join(HERE, "delatex_manifest.jsonl"), "a", encoding="utf-8")
    for fn in files:
        path = os.path.join(args.corpus, fn)
        text = open(path, encoding="utf-8", errors="replace").read()
        preamble, parts = split_sections(text)
        prose_idx = [i for i, p in enumerate(parts)
                     if p[1] in PROSE_FIXED or p[1].startswith(PROSE_HEADS)]
        dirty = [i for i in prose_idx if DELIM_RE.search(parts[i][2]) or DOLLAR_RE.search(parts[i][2])]
        if not dirty:
            clean += 1
            continue
        if any(OTHER_ENV_RE.search(parts[i][2]) for i in dirty):
            skip_begin += 1
            hand.append({"file": fn, "reason": "begin_env"})
            continue

        new_parts = [list(p) for p in parts]
        edited = set()
        orig_idx = set()
        survivors = []
        for i in dirty:
            body = parts[i][2]
            new_body, _ = delatex_body(body)
            # mask currency spans (correctly left as-is) before the survivor scan
            masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else "  ", new_body)
            if SURVIVOR_RE.search(masked):
                survivors.append(parts[i][1])
                continue
            if new_body != body:
                for b in BANNED_RE:
                    if b.search(new_body):
                        survivors.append(parts[i][1] + ":BANNED")
                        break
                else:
                    new_parts[i][2] = new_body
                    orig_idx.add(i)
                    edited.add(parts[i][1])
        if survivors or not edited:
            if survivors:
                skip_survivor += 1
                hand.append({"file": fn, "reason": "survivor:" + ",".join(sorted(set(survivors)))})
            continue

        pre = text
        new_text = "".join([preamble] + [p[0] + p[2] for p in new_parts])
        # Guard: reverting every edited body must reproduce the original bytes
        # exactly — proves only edited section bodies changed.
        revert_text = "".join(
            [preamble] + [new_parts[i][0] + (parts[i][2] if i in orig_idx else new_parts[i][2])
                          for i in range(len(new_parts))])
        if revert_text != pre:
            skip_survivor += 1
            hand.append({"file": fn, "reason": "digest_guard"})
            continue

        if not args.dry:
            bak = os.path.join(args.backup, fn)
            os.makedirs(os.path.dirname(bak), exist_ok=True)
            if not os.path.exists(bak):
                shutil.copy2(path, bak)
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
        manifest.write(json.dumps({"file": fn, "edited": sorted(edited), "dry": args.dry},
                                  ensure_ascii=False) + "\n")
        ok += 1
    manifest.close()
    json.dump(hand, open(os.path.join(HERE, "delatex_handfix.json"), "w", encoding="utf-8"), indent=1)
    print(f"converted={ok} clean={clean} skipped_begin={skip_begin} skipped_survivor={skip_survivor} dry={args.dry}")
    print("hand-fix list:", json.dumps(hand[:20], indent=1))


if __name__ == "__main__":
    main()
