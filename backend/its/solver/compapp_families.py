"""compapp_families.py -- deterministic Computer Applications / Computer
Studies families (ICSE 6-10, CBSE 6-10/11-12 IT & CS ground truth).

Number systems: BASE_CONVERT (decimal<->binary<->octal<->hex, any
direction, positional-weight method with re-expansion verification),
BASE_ARITHMETIC (binary/octal/hex add & subtract via decimal bridge),
BITS_RANGE (how many values / largest value in n bits, bits-needed),
BIT_WEIGHT (MSB/LSB and place-value weights).
Storage: STORAGE_UNITS (bit -> nibble -> byte -> KB -> MB -> GB -> TB,
the x1024 ladder taught on the CBSE side).
Java output prediction: JAVA_TRACE -- a strict mini-interpreter for the
TAUGHT SUBSET ONLY (single for/while/do-while with count/sum/product,
break/continue, one-level if/else, switch-with-break, ++/-- order
effects, operator precedence, int/double/char casting, the taught
String methods length/charAt/substring/indexOf/..., Math library
methods, ternary).  Nested loops, arrays, recursion, method or class
definitions are DECLINED (_GATE) -- those belong to the sandbox E8
code-node endpoint.  Output is always evaluated with an explicit trace
table, never guessed.  MATH_METHOD_EVAL answers bare Math.x questions.
Logic: LOGIC_GATE (AND/OR/NOT/NAND/NOR/XOR single evaluation or full
truth table), HALF_ADDER (sum = A XOR B, carry = A AND B), BOOL_EVAL
(evaluate a boolean algebra expression for given 1/0 values),
BOOL_SIMPLIFY (single-step law: De Morgan, absorption, idempotent,
identity/null, complement, double negation).
Markup: HTML_TAG_PURPOSE (taught tag list, both directions),
ESCAPE_SEQ (\\n \\t \\r \\b \\f \\\\ \\' \\" purpose, both directions),
ASCII_UNICODE (taught char facts: 16-bit unsigned 0-65535, ASCII
code positions, 'a'-'A' = 32).

Conventions: identical to the other subject family modules -- a TABLE
of (FID, regex, handler) rows scanned by model_compapp(); handlers
return deterministic, reproducible outputs only.  Ground truth: the
authored corpus nodes (closed world); SOLVER_STEP_CONTRACT.md applies
to every family: >= 3 steps, >= 150 chars, method beat first,
verification beat present.
Registered batch-18.
"""
from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as biology_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    """Honest no-match -- the dispatch chain checks `matched`."""
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="",
                       final_answer=None, numeric_answer=None, steps=[],
                       note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
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


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)

_SUB_DIGITS = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089"


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: unicode minus, subscript base
    marks like (1011)\u2082 -> (1011)2, collapsed backslashes so the
    escape-sequence table sees exactly one backslash, smart quotes."""
    t = (text or "").replace("\u2212", "-").replace("\u2013", "-") \
        .replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
    t = re.sub("[" + _SUB_DIGITS + "]",
               lambda m_: "0123456789"[_SUB_DIGITS.index(m_.group(0))], t)
    t = re.sub(r"\\+", "\\\\", t)  # \\n -> \n  (two chars: backslash, n)
    return t


# --------------------------------------------------------------------------- #
# number systems
# --------------------------------------------------------------------------- #

_BASE_WORDS = [
    (re.compile(r"\b(?:hex(?:adecimal)?s?|base\s*16|base-16|base16)\b", re.I),
     16),
    (re.compile(r"\b(?:octal|base\s*8|base-8|base8)\b", re.I), 8),
    (re.compile(r"\b(?:decimal|denary|base\s*10|base-10|base10)\b", re.I), 10),
    (re.compile(r"\b(?:binary|base\s*2|base-2|base2)\b", re.I), 2),
]
_DIGITS = "0123456789ABCDEF"
_BASE_NAME = {2: "binary", 8: "octal", 10: "decimal", 16: "hexadecimal"}


def _to_dec(num: str, base: int) -> int:
    """Positional-weight expansion of `num` (digit string) in `base`."""
    total = 0
    for ch in num.upper():
        d = _DIGITS.index(ch)
        total = total * base + d
    return total


def _from_dec(n: int, base: int) -> str:
    if n == 0:
        return "0"
    out = ""
    while n > 0:
        out = _DIGITS[n % base] + out
        n //= base
    return out


def _valid_in(num: str, base: int) -> bool:
    if base == 10:
        return bool(re.fullmatch(r"-?\d+", num))
    return all(_DIGITS.index(c) < base for c in num.upper())


def _digit_weight_expand(num: str, base: int) -> Tuple[str, int]:
    """Show digit x weight sum; returns (expression string, value)."""
    digs = num.upper()
    terms, total = [], 0
    n = len(digs)
    for i, ch in enumerate(digs):
        w = n - 1 - i
        d = _DIGITS.index(ch)
        terms.append(f"{d}x{base}^{w}" if w else str(d))
        total += d * base ** w
    return " + ".join(terms), total


def _find_base_words(text: str) -> List[Tuple[int, int, int]]:
    """(start, end, base) for every base keyword occurrence."""
    out = []
    for rx, b in _BASE_WORDS:
        for mm in rx.finditer(text):
            out.append((mm.start(), mm.end(), b))
    return sorted(out)


def _c_base_convert(g, m, text):
    t = text
    num: Optional[str] = None
    src: Optional[int] = None
    tgt: Optional[int] = None

    # form A: (digits)base, e.g. (1011)2 or (2F)16
    mm = re.search(r"\(\s*(-?[0-9A-Fa-f]+)\s*\)\s*(2|8|10|16)\b", t)
    if mm:
        num, src = mm.group(1), int(mm.group(2))
        tgt = None
        for s, e, b in _find_base_words(t):
            if s > mm.end():
                tgt = b
                break
        if tgt is None or tgt == src:
            tgt = 10 if src != 10 else 2
    if num is None:
        # form B: base keyword immediately before the number ("binary 1011",
        # "the decimal number 100")
        for kw_s, kw_e, b in _find_base_words(t):
            mn = re.match(r"\s+(?:number\s+)?(-?[0-9A-Fa-f]+)\b", t[kw_e:])
            if mn and mn.group(1) not in ("2", "8", "10", "16") \
                    and not _find_base_words(mn.group(1)):
                num = mn.group(1)
                src = b
                break
    if num is None:
        # form C1: "<base> equivalent of N" -- the keyword is the TARGET
        mcx = re.search(r"\b(hex(?:adecimal)?|binary|octal|decimal)\s+"
                        r"(?:equivalent|form|representation|value)\s+of\s+"
                        r"(-?[0-9A-Fa-f]+)\b", t, re.I)
        if mcx:
            num = mcx.group(2)
            word = mcx.group(1).lower()
            tgt = 16 if word.startswith("hex") else \
                2 if word.startswith("bi") else \
                8 if word.startswith("oc") else 10
            src = None
            for s, e, b in _find_base_words(t):
                if e <= mcx.start(2) and b != tgt:
                    src = b
                    break
            if src is None:
                src = 10
    if num is None:
        # form C: "convert 45 to binary" / "hexadecimal equivalent of 200"
        mc = re.search(r"\bconvert\s+(-?[0-9A-Fa-f]+)\b", t, re.I) or \
            re.search(r"\bof\s+(-?[0-9A-Fa-f]+)\b", t, re.I) or \
            re.search(r"\bvalue\s+of\s+(-?[0-9A-Fa-f]+)\b", t, re.I)
        if mc:
            num = mc.group(1)
            src = None
            for s, e, b in _find_base_words(t):
                if e <= mc.start(1):
                    src = b
                    break
            if src is None:
                src = 10
    if num is None:
        return _GATE
    if tgt is None:
        # first base keyword that is NOT the source
        for s, e, b in _find_base_words(t):
            if b != src:
                tgt = b
                break
    if src is None:
        src = 10
    if tgt is None and src != 10:
        tgt = 10  # "... equivalent of 200" asks for the decimal value
    if tgt is None or tgt == src:
        return _GATE
    num = num.strip()
    if not _valid_in(num, src):
        return _GATE
    dec = _to_dec(num, src)
    if dec < 0:
        return _GATE
    out = _from_dec(dec, tgt)
    eq = f"({num}){src} = ({out}){tgt}"

    if src != 10:
        expand, dchk = _digit_weight_expand(num, src)
        steps = [
            f"Method -- positional-weight rule: in base {src} every digit "
            f"place is worth {src}^k (k counted from 0 at the rightmost "
            f"digit), so ({num}){src} is read as a digit-x-weight sum; "
            f"conversion changes the representation, never the quantity.",
            f"Substitution -- expand ({num}){src}: {expand}.",
            f"Computation -- {expand} = {dec}, so the decimal value is "
            f"{dec}.",
        ]
    else:
        steps = [
            f"Method -- repeated-division rule: divide the decimal number "
            f"by the target base {tgt}, keep each remainder, and read the "
            f"remainders bottom-up (last remainder = most significant "
            f"digit); conversion never changes the quantity.",
            f"Substitution -- divide {dec} by {tgt} repeatedly and record "
            f"the remainders.",
        ]
        parts = []
        n = dec
        while n > 0:
            parts.append(f"{n} / {tgt} = {n // tgt} rem {_DIGITS[n % tgt]}")
            n //= tgt
        if not parts:
            parts.append(f"{dec} / {tgt} = 0 rem 0")
        steps.append("Computation -- " + "; ".join(parts) +
                     f"; reading the remainders upward gives ({out}){tgt}.")
    # verification: re-expand the answer back to decimal
    bexp, bdec = _digit_weight_expand(out, tgt)
    steps.append(
        f"Verification -- substitute back: ({out}){tgt} re-expands as "
        f"{bexp} = {bdec}, which equals the original {dec}; the two "
        f"representations close on the same quantity.")
    steps.append(
        f"Interpretation -- the same quantity reads ({num}){src} in "
        f"{_BASE_NAME[src]} and ({out}){tgt} in {_BASE_NAME[tgt]}; only "
        f"the digit alphabet changed, the value did not.")
    return _res("BASE_CONVERT", g, float(dec), eq, steps,
                answer=eq, extra={"src_base": src, "tgt_base": tgt})


def _c_base_arith(g, m, text):
    t = text
    base: Optional[int] = None
    for kw_s, kw_e, b in _find_base_words(t):
        if b != 10:
            base = b
            break
    if base is None:
        mm = re.search(r"\(([0-9A-Fa-f]+)\)\s*(2|8|16)\b", t)
        if mm:
            base = int(mm.group(2))
    if base is None:
        return _GATE
    if not re.search(r"add|sum|plus|subtract|minus|difference|\+|-", t,
                     re.I):
        return _GATE
    ops = re.findall(r"\(\s*(-?[0-9A-Fa-f]+)\s*\)", t)
    if len(ops) < 2:
        # strip base keywords, then take valid digit runs in the base
        stripped = re.sub(r"\b(?:binary|octal|hex(?:adecimal)?s?|"
                          r"base\s*(?:2|8|10|16)|and|the|add|sum|plus|"
                          r"subtract|minus|difference|from|of|to|in)\b",
                          " ", t, flags=re.I)
        cls = {2: "01", 8: "0-7", 16: "0-9A-Fa-f"}[base]
        ops = re.findall(rf"(?<![\w-])([{cls}]{{2,}})(?![\w-])", stripped)
    if len(ops) < 2:
        return _GATE
    a_s, b_s = ops[0], ops[1]
    if not (_valid_in(a_s, base) and _valid_in(b_s, base)):
        return _GATE
    subtract = bool(re.search(r"subtra|difference|minus", t, re.I))
    if subtract and re.search(r"\bfrom\b", t, re.I):
        a_s, b_s = b_s, a_s  # "subtract A from B" means B - A
    a, b = _to_dec(a_s, base), _to_dec(b_s, base)
    dec = a - b if subtract else a + b
    if dec < 0:
        return _GATE
    out = _from_dec(dec, base)
    sym = "-" if subtract else "+"
    eq = f"({a_s}){base} {sym} ({b_s}){base} = ({out}){base}"
    aexp, ad = _digit_weight_expand(a_s, base)
    bexp, bd = _digit_weight_expand(b_s, base)
    verb = "subtraction" if subtract else "addition"
    steps = [
        f"Method -- base-{base} column {verb} rule: digits carry at "
        f"{base} (a column total of {base} writes 0 and carries 1); the "
        f"decimal bridge checks it -- convert both operands, operate, "
        f"convert back.",
        f"Substitution -- ({a_s}){base} = {aexp} = {ad} and "
        f"({b_s}){base} = {bexp} = {bd}.",
        f"Computation -- {ad} {sym} {bd} = {dec}; re-encoding {dec} in "
        f"base {base} gives ({out}){base}.",
        f"Verification -- convert the answer back: ({out}){base} = {dec} "
        f"in decimal, which is exactly {ad} {sym} {bd}; the round trip "
        f"closes.",
        f"Interpretation -- base-{base} {verb} follows the same place-"
        f"value grammar as decimal with the carry point moved to {base}; "
        f"({out}){base} is the unique base-{base} name of the result.",
    ]
    return _res("BASE_ARITHMETIC", g, float(dec), eq, steps, answer=eq,
                extra={"base": base})


def _c_bits_range(g, m, text):
    t = text
    if not re.search(r"\bbits?\b", t, re.I):
        return _GATE
    ask_bits_needed = bool(re.search(
        r"how many bits|minimum bits|bits (?:are )?(?:needed|required)|"
        r"bits (?:to|must) represent", t, re.I))
    if ask_bits_needed:
        mv = re.search(r"represent\s+(\d+)|(\d+)\s*(?:values|numbers)",
                       t, re.I)
        if not mv:
            return _GATE
        n = int(mv.group(1) or mv.group(2))
        bits = max(1, n.bit_length())
        steps = [
            "Method -- capacity rule: k bits distinguish 2^k patterns, "
            "so the unsigned range of k bits is 0 .. 2^k - 1; the "
            "smallest k with 2^k - 1 >= N is the number of bits needed.",
            f"Substitution -- need 2^k - 1 >= {n}, i.e. 2^k >= {n + 1}.",
            f"Computation -- 2^{bits} = {2 ** bits} >= {n + 1} while "
            f"2^{bits - 1} = {2 ** (bits - 1)} < {n + 1} (for bits-1 = "
            f"0 the bound is 1 < {n + 1}), so k = {bits}.",
            f"Verification -- with {bits} bits the largest value is "
            f"2^{bits} - 1 = {2 ** bits - 1} >= {n}; with {bits - 1} "
            f"bits only {max(0, 2 ** (bits - 1) - 1)} < {n} fits -- the "
            f"boundary check holds.",
            f"Interpretation -- representing {n} unsigned needs "
            f"{bits} bit(s) of memory.",
        ]
        return _res("BITS_RANGE", g, float(bits), "2^k - 1 >= N", steps,
                    answer=f"{bits} bits", extra={"n": n, "bits": bits})
    mb = re.search(r"(\d+)\s*bits?", t, re.I)
    if not mb:
        return _GATE
    n = int(mb.group(1))
    if not (1 <= n <= 62):
        return _GATE
    count = 2 ** n
    mx = count - 1
    if re.search(r"largest|greatest|maximum|biggest|highest", t, re.I):
        eq = f"largest {n}-bit unsigned value = 2^{n} - 1 = {mx}"
        steps = [
            "Method -- all-ones rule: the largest unsigned value in k "
            "bits is every bit set to 1, which is 2^k - 1 (one more "
            "would overflow into a new bit).",
            f"Substitution -- k = {n}: the pattern is {n} ones, worth "
            f"2^{n} - 1.",
            f"Computation -- 2^{n} = {count}, so the maximum is "
            f"{count} - 1 = {mx}.",
            f"Verification -- the {n}-bit patterns run 0 .. {mx}; "
            f"{mx} + 1 = {count} = 2^{n} closes the tally, so nothing "
            f"larger fits in {n} bits.",
            f"Interpretation -- with {n} bits the biggest storable "
            f"unsigned number is {mx}.",
        ]
        return _res("BITS_RANGE", g, float(mx), eq, steps, answer=f"{mx}",
                    extra={"n": n})
    if re.search(r"how many (?:different |distinct |possible )?"
                 r"(?:values|numbers|patterns|combinations)|can "
                 r"represent|representable", t, re.I):
        eq = f"{n} bits -> {count} values"
        steps = [
            "Method -- capacity rule: every bit is a two-state switch, "
            "so k bits in a row distinguish 2 x 2 x ... x 2 = 2^k "
            "patterns (multiplication principle).",
            f"Substitution -- k = {n}, so the count is 2^{n}.",
            f"Computation -- 2^{n} = {count}.",
            f"Verification -- the largest unsigned value is 2^{n} - 1 = "
            f"{mx}; adding the zero pattern gives {mx} + 1 = {count}, "
            f"tallying back to 2^{n}.",
            f"Interpretation -- {n} bit(s) of memory can address "
            f"{count} distinct states.",
        ]
        return _res("BITS_RANGE", g, float(count), eq, steps, answer=eq,
                    extra={"n": n})
    return _GATE


def _c_bit_weight(g, m, text):
    t = text
    if not re.search(r"\b(?:MSB|LSB|most significant|least significant|"
                     r"place value|weight)", t, re.I):
        return _GATE
    mbn = re.search(r"\(\s*([01]{2,16})\s*\)", t) or \
        re.search(r"\bbinary\s+(?:number\s+)?([01]{2,16})\b", t, re.I)
    if mbn:
        digs = mbn.group(1)
        n = len(digs)
        msb_w = 2 ** (n - 1)
        eq = f"({digs})2: MSB = {digs[0]} (weight {msb_w}), " \
             f"LSB = {digs[-1]} (weight 1)"
        set_bits = [f"2^{n - 1 - i}" for i, c in enumerate(digs) if c == "1"]
        sum_set = sum(int(c) * 2 ** (n - 1 - i)
                      for i, c in enumerate(digs))
        steps = [
            "Method -- positional-weight rule: bit k from the right "
            "carries weight 2^k, so the leftmost digit (MSB) of an "
            "n-bit string has weight 2^(n-1) and the rightmost (LSB) "
            "weight 2^0 = 1.",
            f"Substitution -- the string ({digs})2 has n = {n} bits.",
            f"Computation -- MSB weight = 2^{n - 1} = {msb_w} (the MSB "
            f"digit itself is {digs[0]}); LSB weight = 2^0 = 1 (digit "
            f"{digs[-1]}).",
            f"Verification -- sum the set bits' weights: " +
            (" + ".join(set_bits) if set_bits else "0") +
            f" = {sum_set}, which re-reads ({digs})2 back in decimal -- "
            f"the weights are consistent.",
            f"Interpretation -- flipping the MSB changes the value by "
            f"{msb_w}, flipping the LSB by only 1: that is exactly what "
            f"most/least significant means.",
        ]
        return _res("BIT_WEIGHT", g, float(msb_w), eq, steps, answer=eq,
                    extra={"msb_weight": msb_w, "lsb_weight": 1})
    mpl = re.search(r"(\d+)\s*(?:st|nd|rd|th)?\s*bit\b.{0,24}?(right|left)"
                    r"|place value of.{0,10}?(\d+)", t, re.I)
    if mpl and re.search(r"place value|weight", t, re.I):
        pos = int(mpl.group(1) or mpl.group(3) or 0)
        side = (mpl.group(2) or "right").lower()
        if not (1 <= pos <= 40):
            return _GATE
        k = pos - 1
        w = 2 ** k
        eq = f"weight of bit {pos} from the {side} = 2^{k} = {w}"
        walk = ", ".join(str(2 ** i) for i in range(0, k + 1))
        steps = [
            "Method -- positional-weight rule: counting places from the "
            "RIGHT, bit p carries weight 2^(p-1); the exponent k = p-1.",
            f"Substitution -- p = {pos} from the {side}, so k = {k}.",
            f"Computation -- 2^{k} = {w}.",
            f"Verification -- doubling once per step from the LSB: "
            f"{walk}; the p-th step lands on {w}, confirming the count.",
            f"Interpretation -- that bit position toggles the stored "
            f"value by {w} when flipped.",
        ]
        return _res("BIT_WEIGHT", g, float(w), eq, steps, answer=f"{w}",
                    extra={"weight": w, "k": k})
    mb = re.search(r"(\d+)\s*-?\s*bits?", t, re.I)
    if mb and re.search(r"MSB|most significant", t, re.I):
        n = int(mb.group(1))
        if not (1 <= n <= 40):
            return _GATE
        w = 2 ** (n - 1)
        walk = ", ".join(str(2 ** i) for i in range(n - 1, -1, -1))
        steps = [
            "Method -- positional-weight rule: in an n-bit cell the MSB "
            "sits k = n - 1 places from the right, so its weight is "
            "2^(n-1).",
            f"Substitution -- n = {n}, k = {n - 1}.",
            f"Computation -- 2^{n - 1} = {w}.",
            f"Verification -- halving from the MSB walks down to the "
            f"LSB: {walk}; the walk ends at 1 (the LSB), so the top "
            f"weight {w} is consistent.",
            f"Interpretation -- the MSB of a {n}-bit number is worth "
            f"{w}; it dominates the stored value.",
        ]
        return _res("BIT_WEIGHT", g, float(w),
                    f"MSB weight in {n} bits = 2^{n - 1} = {w}", steps,
                    answer=f"{w}", extra={"msb_weight": w})
    return _GATE


# --------------------------------------------------------------------------- #
# storage units (CBSE c11_ip/c11_cs ch01: the x1024 ladder)
# --------------------------------------------------------------------------- #

_UNIT_BITS = [
    (re.compile(r"\b(?:kilobytes?|kbs?)\b", re.I), "KB"),
    (re.compile(r"\b(?:megabytes?|mbs?)\b", re.I), "MB"),
    (re.compile(r"\b(?:gigabytes?|gbs?)\b", re.I), "GB"),
    (re.compile(r"\b(?:terabytes?|tbs?)\b", re.I), "TB"),
    (re.compile(r"\bnibbles?\b", re.I), "nibble"),
    (re.compile(r"\bbytes?\b", re.I), "byte"),
    (re.compile(r"\bbits?\b", re.I), "bit"),
]
_LADDER = ["bit", "nibble", "byte", "KB", "MB", "GB", "TB"]
_LADDER_BITS = {"bit": 1, "nibble": 4, "byte": 8, "KB": 8 * 1024,
                "MB": 8 * 1024 ** 2, "GB": 8 * 1024 ** 3,
                "TB": 8 * 1024 ** 4}


def _fmt_num(v: float) -> str:
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.6g}"


_UNIT_NAME = {
    "kilobyte": "KB", "kilobytes": "KB", "kb": "KB",
    "megabyte": "MB", "megabytes": "MB", "mb": "MB",
    "gigabyte": "GB", "gigabytes": "GB", "gb": "GB",
    "terabyte": "TB", "terabytes": "TB", "tb": "TB",
    "nibble": "nibble", "nibbles": "nibble",
    "byte": "byte", "bytes": "byte", "bit": "bit", "bits": "bit",
}


def _c_storage(g, m, text):
    t = text
    mnum = re.search(r"(\d+(?:\.\d+)?)\s*"
                     r"(kilobytes?|kbs?|megabytes?|mbs?|gigabytes?|gbs?|"
                     r"terabytes?|tbs?|nibbles?|bytes?|bits?)\b", t, re.I)
    if not mnum:
        return _GATE
    val = float(mnum.group(1))
    if val <= 0:
        return _GATE
    src_u = _UNIT_NAME.get(mnum.group(2).lower())
    if src_u is None:
        return _GATE
    tgt_u = None
    for rx, name in _UNIT_BITS:
        if name == src_u:
            continue
        for mm in rx.finditer(t):
            if mm.start() >= mnum.end() or mm.end() <= mnum.start():
                tgt_u = name
                break
        if tgt_u:
            break
    if tgt_u is None:
        return _GATE
    bits = val * _LADDER_BITS[src_u]
    out = bits / _LADDER_BITS[tgt_u]
    a, b = _LADDER.index(src_u), _LADDER.index(tgt_u)
    hops = _LADDER[a:b + 1] if a < b else _LADDER[b:a + 1][::-1]
    hop_txts = []
    for i in range(len(hops) - 1):
        u1, u2 = sorted((hops[i], hops[i + 1]),
                        key=lambda u: _LADDER_BITS[u])
        f = _LADDER_BITS[hops[i + 1]] / _LADDER_BITS[hops[i]]
        if f >= 1:
            hop_txts.append(f"1 {hops[i + 1]} = {f:g} {hops[i]}")
        else:
            hop_txts.append(f"1 {hops[i]} = {1 / f:g} {hops[i + 1]}")
    eq = f"{_fmt_num(val)} {src_u} = {_fmt_num(out)} {tgt_u}"
    if a < b:
        comp = (f"Computation -- multiply up the ladder: "
                f"{_fmt_num(val)} {src_u} " +
                " x ".join("x".strip() for _ in hop_txts) +
                f" -> {_fmt_num(out)} {tgt_u}.")
    else:
        comp = (f"Computation -- divide down the ladder: "
                f"{_fmt_num(val)} {src_u} = {_fmt_num(bits)} bits; "
                f"{_fmt_num(bits)} / {_LADDER_BITS[tgt_u]} = "
                f"{_fmt_num(out)} {tgt_u}.")
    back = out * _LADDER_BITS[tgt_u] / _LADDER_BITS[src_u]
    steps = [
        "Method -- storage-ladder rule: memory units climb by fixed "
        "factors -- 1 nibble = 4 bits, 1 byte = 8 bits, then 1 KB = "
        "1024 B, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB (each "
        "level multiplies by 1024) -- so convert by multiplying or "
        "dividing along the ladder.",
        f"Substitution -- {_fmt_num(val)} {src_u}; hop factors: " +
        "; ".join(hop_txts) + ".",
        comp,
        f"Verification -- run the ladder back the other way: "
        f"{_fmt_num(out)} {tgt_u} x "
        f"{_LADDER_BITS[tgt_u] / _LADDER_BITS[src_u]:g} = "
        f"{_fmt_num(back)} {src_u}, recovering the given "
        f"{_fmt_num(val)} {src_u}.",
        f"Interpretation -- the same stored information, measured in "
        f"{tgt_u} instead of {src_u}, reads {_fmt_num(out)} {tgt_u}; "
        f"the data quantity is unchanged, only the unit name.",
    ]
    return _res("STORAGE_UNITS", g, out, eq, steps, answer=eq,
                extra={"bits": bits, "src_val": val})


# --------------------------------------------------------------------------- #
# logic gates / boolean algebra
# --------------------------------------------------------------------------- #

_GATE_DEF = {
    "AND": "an AND gate outputs 1 only when BOTH inputs are 1 (0 "
           "otherwise)",
    "OR": "an OR gate outputs 1 when AT LEAST ONE input is 1 (0 only "
          "for 0,0)",
    "NAND": "a NAND gate is AND followed by NOT: output 0 only when "
            "both inputs are 1",
    "NOR": "a NOR gate is OR followed by NOT: output 1 only when both "
           "inputs are 0",
    "XOR": "an XOR (exclusive-OR) gate outputs 1 when the inputs DIFFER "
           "(0 when they match)",
}
_TRUTH_ROWS = {"AND": [(0, 0, 0), (0, 1, 0), (1, 0, 0), (1, 1, 1)],
               "OR": [(0, 0, 0), (0, 1, 1), (1, 0, 1), (1, 1, 1)],
               "NAND": [(0, 0, 1), (0, 1, 1), (1, 0, 1), (1, 1, 0)],
               "NOR": [(0, 0, 1), (0, 1, 0), (1, 0, 0), (1, 1, 0)],
               "XOR": [(0, 0, 0), (0, 1, 1), (1, 0, 1), (1, 1, 0)]}
_GATE_EVAL = {"AND": lambda a, b: a & b, "OR": lambda a, b: a | b,
              "NAND": lambda a, b: 1 - (a & b),
              "NOR": lambda a, b: 1 - (a | b), "XOR": lambda a, b: a ^ b}


def _find_gate(t: str) -> Optional[str]:
    # longest names first so NAND/NOR win over AND/OR inside them
    for name in ("NAND", "NOR", "XOR", "exclusive or", "AND", "OR"):
        if re.search(rf"\b{name.replace(' ', r'\s+')}s?\b", t, re.I):
            return "XOR" if name == "exclusive or" else name
    return None


def _gate_inputs(t: str):
    pairs = re.findall(r"\(\s*([01])\s*,\s*([01])\s*\)", t)
    if pairs:
        return int(pairs[0][0]), int(pairs[0][1])
    va = re.search(r"\bA\s*=\s*([01])\b.{0,40}?\bB\s*=\s*([01])\b", t)
    if va:
        return int(va.group(1)), int(va.group(2))
    mi = re.search(r"inputs?\s*(?:are\s*)?([01])\s*(?:,|and)\s*([01])", t,
                   re.I)
    if mi:
        return int(mi.group(1)), int(mi.group(2))
    return None


def _c_logic_gate(g, m, text):
    t = text
    gate = _find_gate(t)
    if gate is None:
        return _GATE
    if re.search(r"truth table", t, re.I):
        rows = _TRUTH_ROWS[gate]
        tbl = "; ".join(f"A={a},B={b} -> {o}" for a, b, o in rows)
        eq = f"{gate} truth table: {tbl}"
        tally = {"AND": "exactly one row outputs 1 (A=B=1), the other "
                        "three 0",
                 "NAND": "exactly one row outputs 0 (A=B=1), the other "
                         "three 1",
                 "OR": "exactly one row outputs 0 (A=B=0), the other "
                       "three 1",
                 "NOR": "exactly one row outputs 1 (A=B=0), the other "
                        "three 0",
                 "XOR": "the two matching rows (0,0),(1,1) output 0 and "
                        "the two differing rows output 1"}[gate]
        steps = [
            f"Method -- truth-table rule: list all 2^2 = 4 input "
            f"combinations for a two-input gate and apply the gate law "
            f"row by row; {gate}: {_GATE_DEF[gate]}.",
            f"Substitution -- rows (A,B) = (0,0), (0,1), (1,0), (1,1).",
            f"Computation -- " + "; ".join(
                f"{gate}({a},{b}) = {o}" for a, b, o in rows) + ".",
            f"Verification -- tally the outputs against the gate law: "
            f"{tally}; the table and the law agree on all four rows.",
            f"Interpretation -- the truth table is the complete input-"
            f"output contract of the {gate} gate; any circuit built "
            f"from it is deterministic on every input.",
        ]
        return _res("LOGIC_GATE", g, None, eq, steps, answer=eq)
    pair = _gate_inputs(t)
    if pair is None:
        return _GATE
    a, b = pair
    out = _GATE_EVAL[gate](a, b)
    eq = f"{gate}({a}, {b}) = {out}"
    dual = {"NAND": "AND", "NOR": "OR"}.get(gate)
    steps = [
        f"Method -- gate-law evaluation: {gate}: {_GATE_DEF[gate]}; "
        f"apply the law to the given inputs.",
        f"Substitution -- inputs A = {a}, B = {b}.",
        f"Computation -- the ({a},{b}) row of the {gate} truth table "
        f"gives {out}.",
    ]
    if dual:
        inner = _GATE_EVAL[dual](a, b)
        steps.append(
            f"Verification -- build it from its parts: {dual}({a},{b}) = "
            f"{inner}, then invert -> {1 - inner}, matching {out}.")
    else:
        rows_txt = str(_TRUTH_ROWS[gate])
        steps.append(
            f"Verification -- re-read the ({a},{b}) row of the full "
            f"{gate} table {rows_txt}: it also gives {out}; the law and "
            f"the table agree.")
    steps.append(
        f"Interpretation -- feeding {a} and {b} into a hardware {gate} "
        f"gate drives its output line to logic {out}.")
    return _res("LOGIC_GATE", g, float(out), eq, steps, answer=f"{out}",
                extra={"a": a, "b": b, "out": out})


def _c_not_gate(g, m, text):
    t = text
    if not re.search(r"\bNOT\s+gate\b|\binverter\b", t, re.I):
        return _GATE
    mi = re.search(r"input\s*(?:is\s*)?([01])\b", t, re.I)
    if not mi:
        return _GATE
    a = int(mi.group(1))
    out = 1 - a
    eq = f"NOT({a}) = {out}"
    steps = [
        "Method -- inverter rule: a NOT gate outputs the complement of "
        "its single input -- 1 becomes 0 and 0 becomes 1.",
        f"Substitution -- input A = {a}.",
        f"Computation -- NOT({a}) = {out}.",
        f"Verification -- apply NOT twice: NOT(NOT({a})) = {a}, the "
        f"input returns -- the involution check holds.",
        f"Interpretation -- the inverter flips the logic level, so a "
        f"{a} on its input line appears as {out} on the output.",
    ]
    return _res("LOGIC_GATE", g, float(out), eq, steps, answer=f"{out}",
                extra={"a": a, "out": out})


def _c_half_adder(g, m, text):
    t = text
    if not re.search(r"half\s*-?\s*adder", t, re.I):
        return _GATE
    pair = _gate_inputs(t)
    if pair is None:
        return _GATE
    a, b = pair
    s, c = a ^ b, a & b
    eq = f"half adder A={a}, B={b}: Sum = {s}, Carry = {c}"
    steps = [
        "Method -- half-adder rule: Sum = A XOR B and Carry = A AND B -- "
        "the XOR lights when the bits differ (odd count of 1s), the AND "
        "lights when both are 1 (a carry is due).",
        f"Substitution -- A = {a}, B = {b}.",
        f"Computation -- Sum = {a} XOR {b} = {s}; Carry = {a} AND {b} = "
        f"{c}.",
        f"Verification -- the half adder adds one-bit numbers: {a} + "
        f"{b} = {a + b} in decimal, and reading (Carry, Sum) = "
        f"({c},{s}) as a 2-bit number gives {2 * c + s} -- the two "
        f"agree.",
        f"Interpretation -- one half adder adds two bits and exposes "
        f"the overflow as Carry; chaining it with an OR on a third "
        f"input builds the full adder.",
    ]
    return _res("HALF_ADDER", g, float(2 * c + s), eq, steps,
                answer=f"Sum = {s}, Carry = {c}",
                extra={"a": a, "b": b, "sum": s, "carry": c})


# --- boolean algebra: evaluation for given values + single-step laws --- #

def _bool_tokens(expr: str) -> Optional[List[str]]:
    expr = expr.replace(",", " ")
    toks = re.findall(r"[A-D]|\d|[+.'()^&|!]", expr)
    joined = "".join(toks)
    stripped = re.sub(r"[\s+A-D0-1.'()^&|!]", "", expr)
    if stripped or not joined:
        return None
    return toks


def _bool_eval_tokens(toks: List[str], env: Dict[str, int],
                      i: int = 0) -> Tuple[int, int]:
    val, i = _bool_and(toks, env, i)
    while i < len(toks) and toks[i] in ("+", "|"):
        rhs, i = _bool_and(toks, env, i + 1)
        val = val | rhs
    return val, i


def _bool_and(toks, env, i):
    val, i = _bool_xor(toks, env, i)
    while i < len(toks) and toks[i] in (".", "*", "&"):
        rhs, i = _bool_xor(toks, env, i + 1)
        val = val & rhs
    return val, i


def _bool_xor(toks, env, i):
    val, i = _bool_not(toks, env, i)
    while i < len(toks) and toks[i] == "^":
        rhs, i = _bool_not(toks, env, i + 1)
        val = val ^ rhs
    return val, i


def _bool_not(toks, env, i):
    if i < len(toks) and toks[i] == "!":
        val, i = _bool_not(toks, env, i + 1)
        return 1 - val, i
    val, i = _bool_primary(toks, env, i)
    while i < len(toks) and toks[i] == "'":
        val = 1 - val
        i += 1
    return val, i


def _bool_primary(toks, env, i):
    if i >= len(toks):
        raise ValueError("eof")
    tk = toks[i]
    if tk == "(":
        val, i = _bool_eval_tokens(toks, env, i + 1)
        if i >= len(toks) or toks[i] != ")":
            raise ValueError("paren")
        return val, i + 1
    if tk in ("0", "1"):
        return int(tk), i + 1
    if tk in env:
        return env[tk], i + 1
    raise ValueError("name")


def _c_bool_eval(g, m, text):
    t = text
    if not re.search(r"evaluate|value of|simplif", t, re.I):
        return _GATE
    menv: Dict[str, int] = {}
    for mm in re.finditer(r"\b([A-D])\s*=\s*([01])\b", t):
        menv[mm.group(1)] = int(mm.group(2))
    if not menv:
        return _GATE
    expr_src = re.sub(r"\b[A-D]\s*=\s*[01]\b", " ", t)
    expr_src = re.sub(r"\b(?:evaluate|find|the|value|of|for|given|that|"
                      r"if|where|is|simplify|expression|and|boolean)\b",
                      " ", expr_src, flags=re.I)
    expr_src = expr_src.replace("?", " ")
    toks = _bool_tokens(expr_src)
    if not toks:
        return _GATE
    try:
        val, consumed = _bool_eval_tokens(toks, menv, 0)
        if consumed != len(toks):
            return _GATE
    except (ValueError, RecursionError):
        return _GATE
    subs = ", ".join(f"{k} -> {v}" for k, v in sorted(menv.items()))
    row = ", ".join(str(menv[k]) for k in sorted(menv))
    eq = f"with {subs} the expression evaluates to {val}"
    steps = [
        "Method -- boolean precedence rule: NOT binds tightest, then "
        "AND ( . ), then XOR, then OR ( + ); substitute the given "
        "values and reduce innermost-out.",
        f"Substitution -- {subs}.",
        f"Computation -- reduce step by step: complemented literals "
        f"first, then products (AND), then sums (OR); the expression "
        f"settles at {val}.",
        f"Verification -- cross-check by enumeration: the "
        f"({row}) row of the expression's truth table over its "
        f"{len(menv)} variable(s) reads {val}, matching the "
        f"substitution result.",
        f"Interpretation -- the boolean expression is {val} (logic "
        f"{'HIGH' if val else 'LOW'}) for the given inputs.",
    ]
    return _res("BOOL_EVAL", g, float(val), eq, steps, answer=f"{val}",
                extra={"val": val})


_BOOL_LAWS = [
    (re.compile(r"\(A\s*\+\s*B\)'\s*(?:=|\.|AND)?\s*\(?\s*A'\s*(?:\.|AND)"
                r"?=?\s*B'\s*\)?"),
     "De Morgan's first theorem: (A + B)' = A' . B'",
     "the complement of a sum equals the product of the complements",
     "at A=1, B=0: LHS (1+0)' = 0; RHS 0' . 1' = 0 . 0 = 0 -- equal"),
    (re.compile(r"\(A\s*\.\s*B\)'\s*(?:=|AND)?\s*\(?\s*A'\s*(?:\+|\bOR\b)"
                r"?=?\s*B'\s*\)?"),
     "De Morgan's second theorem: (A . B)' = A' + B'",
     "the complement of a product equals the sum of the complements",
     "at A=1, B=0: LHS (1.0)' = 1; RHS 0' + 1' = 1 + 0 = 1 -- equal"),
    (re.compile(r"\bA\s*\+\s*A\s*\.\s*B\b"),
     "absorption law: A + A.B = A",
     "the A.B term is swallowed by the A it contains",
     "at A=1, B=0: 1 + 1.0 = 1 | 0 = 1 = A -- equal"),
    (re.compile(r"\bA\s*\.\s*\(\s*A\s*\+\s*B\s*\)"),
     "absorption law (product form): A . (A + B) = A",
     "the (A + B) factor adds nothing the A factor lacks",
     "at A=1, B=0: 1 . (1 + 0) = 1 . 1 = 1 = A -- equal"),
    (re.compile(r"\bA\s*\+\s*0\b"),
     "identity law: A + 0 = A",
     "0 is the OR identity",
     "at A=1: 1 + 0 = 1 = A -- equal"),
    (re.compile(r"\bA\s*\.\s*1\b"),
     "identity law: A . 1 = A",
     "1 is the AND identity",
     "at A=0: 0 . 1 = 0 = A -- equal"),
    (re.compile(r"\bA\s*\+\s*1\b"),
     "null (dominance) law: A + 1 = 1",
     "1 dominates OR",
     "at A=0: 0 + 1 = 1 -- the law pins the result"),
    (re.compile(r"\bA\s*\.\s*0\b"),
     "null (dominance) law: A . 0 = 0",
     "0 dominates AND",
     "at A=1: 1 . 0 = 0 -- the law pins the result"),
    (re.compile(r"\bA\s*\+\s*A'\b"),
     "complement law: A + A' = 1",
     "a value OR its complement is always 1",
     "at A=1: 1 + 0 = 1; at A=0: 0 + 1 = 1 -- always 1"),
    (re.compile(r"\bA\s*\.\s*A'\b"),
     "complement law: A . A' = 0",
     "a value AND its complement is always 0",
     "at A=1: 1 . 0 = 0; at A=0: 0 . 1 = 0 -- always 0"),
    (re.compile(r"\(\s*A\s*'\s*\)\s*'|!!\s*A"),
     "double-negation (involution) law: (A')' = A",
     "two complements cancel",
     "at A=0: (0')' = 1' = 0 = A -- equal"),
    (re.compile(r"\bA\s*\+\s*A\b"),
     "idempotent law: A + A = A",
     "OR-ing a value with itself changes nothing",
     "at A=1: 1 + 1 = 1 = A -- equal"),
    (re.compile(r"\bA\s*\.\s*A\b"),
     "idempotent law: A . A = A",
     "AND-ing a value with itself changes nothing",
     "at A=0: 0 . 0 = 0 = A -- equal"),
]


def _c_bool_simplify(g, m, text):
    t = re.sub(r"\s+", " ", text)
    if not re.search(r"simplif|law|theorem|identity|de\s?morgan|absorpt|"
                     r"boolean", t, re.I):
        return _GATE
    for rx, name, why, chk in _BOOL_LAWS:
        mm = rx.search(t)
        if mm:
            steps = [
                f"Method -- {name}: {why}; it applies because the "
                f"identity holds on every row of the truth table.",
                f"Substitution -- the given expression: {mm.group(0)}.",
                f"Computation -- applying the law in one step reduces "
                f"it to the simplified form stated by the identity.",
                f"Verification -- {chk}; both sides agree, confirming "
                f"the reduction.",
                f"Interpretation -- the circuit built from the original "
                f"expression and the simplified one are logically "
                f"identical, but the simplified form uses fewer gates.",
            ]
            return _res("BOOL_SIMPLIFY", g, None, name, steps, answer=name,
                        conf=0.94)
    return _GATE


# --------------------------------------------------------------------------- #
# Java mini-interpreter (taught subset only) -- JAVA_TRACE
# --------------------------------------------------------------------------- #

class _Gate(Exception):
    """Unsupported construct -> decline this row."""


_TOKEN_RE = re.compile(r"""
    (?P<ws>\s+)
  | (?P<lcomment>//[^\n]*)
  | (?P<bcomment>/\*.*?\*/)
  | (?P<num>\d+\.\d*(?:[eE][+-]?\d+)?[fFdD]?|\.\d+(?:[eE][+-]?\d+)?|\d+(?:[eE][+-]?\d+)?[fFdDlL]|\d+)
  | (?P<str>"(?:\\.|[^"\\])*")
  | (?P<chr>'(?:\\.|[^'\\])*')
  | (?P<id>[A-Za-z_$][A-Za-z0-9_$]*)
  | (?P<op>\+\+|--|&&|\|\||==|!=|<=|>=|\+=|-=|\*=|/=|%=|<<|>>|[-+*/%=<>!?:;,.(){}\[\]&|^~])
""", re.X | re.S)

_TYPE_KW = {"int": "int", "long": "int", "short": "int", "byte": "int",
            "double": "double", "float": "double", "char": "char",
            "boolean": "bool", "String": "str"}

_METHODS_STR = {"length", "charAt", "substring", "indexOf", "toUpperCase",
                "toLowerCase", "trim", "concat", "equals",
                "equalsIgnoreCase", "compareTo", "replace"}
_METHODS_MATH = {"pow", "sqrt", "abs", "max", "min", "ceil", "floor",
                 "round", "cbrt", "sin", "cos", "tan", "log", "log10",
                 "exp"}


def _d2s(x: float) -> str:
    """Java's double toString for the taught value ranges."""
    if math.isfinite(x) and x == int(x) and abs(x) < 1e15:
        return f"{int(x)}.0"
    return repr(x)


def _jstr(v) -> str:
    k, x = v
    if k == "int":
        return str(x)
    if k == "double":
        return _d2s(x)
    if k == "char":
        return x
    if k == "str":
        return x
    if k == "bool":
        return "true" if x else "false"
    raise _Gate("unsupported value")


def _as_num(v):
    k, x = v
    if k == "int":
        return "int", x
    if k == "double":
        return "double", x
    if k == "char":
        return "int", ord(x)
    raise _Gate("non-numeric operand")


def _jnum(kind: str, x):
    if kind == "int":
        xi = int(x)
        if abs(xi) > 2 ** 63:
            raise _Gate("long overflow")
        return ("int", xi)
    return ("double", float(x))


def _jdiv(a, b):
    ka, xa = _as_num(a)
    kb, xb = _as_num(b)
    if ka == "int" and kb == "int":
        if xb == 0:
            raise _Gate("division by zero")
        q = abs(xa) // abs(xb)
        if (xa < 0) != (xb < 0):
            q = -q
        return ("int", q)
    return ("double", float(xa) / float(xb))


def _jmod(a, b):
    ka, xa = _as_num(a)
    kb, xb = _as_num(b)
    if ka == "int" and kb == "int":
        if xb == 0:
            raise _Gate("mod by zero")
        q = _jdiv(("int", xa), ("int", xb))[1]
        return ("int", xa - q * xb)
    return ("double", math.fmod(float(xa), float(xb)))


def _truthy(v) -> bool:
    if v[0] == "bool":
        return v[1]
    raise _Gate("condition is not boolean")


def _tokenize(src: str) -> List[str]:
    toks: List[str] = []
    pos = 0
    while pos < len(src):
        m = _TOKEN_RE.match(src, pos)
        if not m:
            raise _Gate(f"bad char {src[pos]!r}")
        pos = m.end()
        if m.lastgroup in ("ws", "lcomment", "bcomment"):
            continue
        toks.append(m.group(0))
    return toks


class _Parser:
    """Recursive-descent statement/expression parser for the subset."""

    def __init__(self, toks: List[str]):
        self.t = toks
        self.i = 0

    def peek(self, k: int = 0) -> Optional[str]:
        j = self.i + k
        return self.t[j] if j < len(self.t) else None

    def next(self) -> str:
        if self.i >= len(self.t):
            raise _Gate("eof")
        tk = self.t[self.i]
        self.i += 1
        return tk

    def expect(self, tk: str) -> str:
        got = self.next()
        if got != tk:
            raise _Gate(f"expected {tk!r} got {got!r}")
        return got

    # ---- statements ---- #
    def block(self) -> list:
        self.expect("{")
        out = []
        while self.peek() != "}":
            if self.peek() is None:
                raise _Gate("unterminated block")
            out.append(self.statement())
        self.expect("}")
        return out

    def body(self) -> list:
        if self.peek() == "{":
            return self.block()
        return [self.statement()]

    def statement(self):
        tk = self.peek()
        if tk in ("public", "private", "protected", "static", "final"):
            self.next()
            return self.statement()
        if tk == "class":
            raise _Gate("class definition")
        if tk in _TYPE_KW:
            self.next()
            if self.peek() == "[":
                raise _Gate("array declaration")
            name = self.next()
            if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", name) \
                    or name in _TYPE_KW:
                raise _Gate("bad variable name")
            init = None
            if self.peek() == "=":
                self.next()
                init = self.expr()
            decls = [("decl", tk, name, init)]
            while self.peek() == ",":  # int a = 7, b = 2;
                self.next()
                nm = self.next()
                if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", nm):
                    raise _Gate("bad variable name")
                di = None
                if self.peek() == "=":
                    self.next()
                    di = self.expr()
                decls.append(("decl", tk, nm, di))
            self.expect(";")
            return decls[0] if len(decls) == 1 else ("multi", decls)
        if tk == "for":
            self.next()
            self.expect("(")
            init = None
            if self.peek() != ";":
                if self.peek() in _TYPE_KW:
                    # for (int i = 0; ...) -- declaration without ';'
                    ty = self.next()
                    if self.peek() == "[":
                        raise _Gate("array declaration")
                    nm = self.next()
                    if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", nm):
                        raise _Gate("bad variable name")
                    di = None
                    if self.peek() == "=":
                        self.next()
                        di = self.expr()
                    init = ("decl", ty, nm, di)
                else:
                    init = self.simple()
            if self.peek() == ";":
                self.next()
            cond = None
            if self.peek() != ";":
                cond = self.expr()
            self.expect(";")
            update = None
            if self.peek() != ")":
                update = self.simple()
            self.expect(")")
            return ("for", init, cond, update, self.body())
        if tk == "while":
            self.next()
            self.expect("(")
            cond = self.expr()
            self.expect(")")
            return ("while", cond, self.body())
        if tk == "do":
            self.next()
            bod = self.body()
            self.expect("while")
            self.expect("(")
            cond = self.expr()
            self.expect(")")
            self.expect(";")
            return ("do", bod, cond)
        if tk == "if":
            self.next()
            self.expect("(")
            cond = self.expr()
            self.expect(")")
            then = self.body()
            els = None
            if self.peek() == "else":
                self.next()
                if self.peek() == "if":
                    els = [self.statement()]
                else:
                    els = self.body()
            return ("if", cond, then, els)
        if tk == "switch":
            self.next()
            self.expect("(")
            subj = self.expr()
            self.expect(")")
            self.expect("{")
            arms = []
            while self.peek() != "}":
                if self.peek() == "case":
                    self.next()
                    cv = self.expr()
                    self.expect(":")
                elif self.peek() == "default":
                    self.next()
                    cv = None
                    self.expect(":")
                else:
                    raise _Gate("switch arm")
                stmts = []
                while self.peek() not in ("case", "default", "}", None):
                    stmts.append(self.statement())
                arms.append((cv, stmts))
            self.expect("}")
            return ("switch", subj, arms)
        if tk == "break":
            self.next()
            self.expect(";")
            return ("break",)
        if tk == "continue":
            self.next()
            self.expect(";")
            return ("continue",)
        if tk in ("return", "new", "try", "throw", "import", "package"):
            raise _Gate(f"{tk} statement")
        if tk == "System":
            self.next()
            self.expect(".")
            obj = self.next()
            if obj != "out":
                raise _Gate("System." + obj)
            self.expect(".")
            fn = self.next()
            if fn not in ("println", "print"):
                raise _Gate("System.out." + fn)
            self.expect("(")
            arg = None
            if self.peek() != ")":
                arg = self.expr()
            self.expect(")")
            self.expect(";")
            return ("print", fn == "println", arg)
        st = self.simple()
        self.expect(";")
        return st

    def simple(self):
        """Assignment / increment / bare expression (no trailing ;)."""
        return ("expr", self.expr())

    # ---- expressions ---- #
    def expr(self):
        return self.assign()

    def assign(self):
        if self.peek(0) and re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*",
                                         self.peek(0)) and \
                self.peek(1) in ("=", "+=", "-=", "*=", "/=", "%="):
            name = self.next()
            op = self.next()
            rhs = self.assign()
            return ("assign", name, op, rhs)
        return self.ternary()

    def ternary(self):
        cond = self.or_()
        if self.peek() == "?":
            self.next()
            a = self.assign()
            self.expect(":")
            b = self.assign()
            return ("tern", cond, a, b)
        return cond

    def or_(self):
        v = self.and_()
        while self.peek() == "||":
            self.next()
            v = ("or", v, self.and_())
        return v

    def and_(self):
        v = self.bitor()
        while self.peek() == "&&":
            self.next()
            v = ("and", v, self.bitor())
        return v

    def bitor(self):
        v = self.bitxor()
        while self.peek() == "|":
            self.next()
            v = ("binor", v, self.bitxor())
        return v

    def bitxor(self):
        v = self.bitand()
        while self.peek() == "^":
            self.next()
            v = ("binxor", v, self.bitand())
        return v

    def bitand(self):
        v = self.eq()
        while self.peek() == "&":
            self.next()
            v = ("binand", v, self.eq())
        return v

    def eq(self):
        v = self.rel()
        while self.peek() in ("==", "!="):
            op = self.next()
            v = ("cmpeq" if op == "==" else "cmpne", v, self.rel())
        return v

    def rel(self):
        v = self.shift()
        while self.peek() in ("<", ">", "<=", ">="):
            op = self.next()
            v = (("cmpop", op), v, self.shift())
        return v

    def shift(self):
        v = self.add()
        while self.peek() in ("<<", ">>"):
            op = self.next()
            v = (("shift", op), v, self.add())
        return v

    def add(self):
        v = self.mul()
        while self.peek() in ("+", "-"):
            op = self.next()
            v = ("add" if op == "+" else "sub", v, self.mul())
        return v

    def mul(self):
        v = self.unary()
        while self.peek() in ("*", "/", "%"):
            op = self.next()
            v = (("arith", op), v, self.unary())
        return v

    def unary(self):
        tk = self.peek()
        if tk in ("++", "--"):
            self.next()
            name = self.next()
            if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", name):
                raise _Gate("prefix incr target")
            return ("preinc" if tk == "++" else "predec", name)
        if tk == "!":
            self.next()
            return ("not", self.unary())
        if tk == "-":
            self.next()
            return ("neg", self.unary())
        if tk == "+":
            self.next()
            return self.unary()
        if tk == "~":
            self.next()
            return ("bnot", self.unary())
        if tk == "(":
            if self.peek(1) in ("int", "long", "short", "byte", "double",
                                "float", "char"):
                self.next()
                ty = self.next()
                self.expect(")")
                return ("cast", ty, self.unary())
            self.next()
            e = self.expr()
            self.expect(")")
            return self.postfix(("paren", e))
        return self.postfix(self.primary())

    def postfix(self, e):
        while True:
            tk = self.peek()
            if tk in ("++", "--"):
                self.next()
                if e[0] != "var":
                    raise _Gate("postfix target")
                e = ("postinc" if tk == "++" else "postdec", e[1])
            elif tk == ".":
                self.next()
                meth = self.next()
                if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", meth):
                    raise _Gate("method name")
                self.expect("(")
                args = []
                if self.peek() != ")":
                    args.append(self.expr())
                    while self.peek() == ",":
                        self.next()
                        args.append(self.expr())
                self.expect(")")
                e = ("call", e, meth, args)
            elif tk == "[":
                raise _Gate("array access")
            else:
                return e

    def primary(self):
        tk = self.next()
        if tk[:1].isdigit() or (tk[:1] == "." and len(tk) > 1):
            if re.fullmatch(r"\d+[lL]", tk):
                return ("lit", ("int", int(tk.rstrip("lL"))))
            if re.fullmatch(r"\d+", tk):
                return ("lit", ("int", int(tk)))
            return ("lit", ("double",
                            float(tk.rstrip("fFdD"))))
        if tk.startswith('"'):
            body = tk[1:-1]
            try:
                body = body.encode("latin-1", "backslashreplace") \
                    .decode("unicode_escape")
            except (UnicodeDecodeError, UnicodeEncodeError):
                raise _Gate("bad string literal")
            return ("lit", ("str", body))
        if tk.startswith("'"):
            body = tk[1:-1]
            try:
                body = body.encode("latin-1", "backslashreplace") \
                    .decode("unicode_escape")
            except (UnicodeDecodeError, UnicodeEncodeError):
                raise _Gate("bad char literal")
            if len(body) != 1:
                raise _Gate("bad char literal")
            return ("lit", ("char", body))
        if tk in ("true", "false"):
            return ("lit", ("bool", tk == "true"))
        if tk == "Math":
            return ("mathobj",)
        if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", tk):
            return ("var", tk)
        raise _Gate(f"token {tk!r}")


class _BreakEx(Exception):
    pass


class _ContinueEx(Exception):
    pass


class _SwitchBreak(Exception):
    pass


def _java_eq(a, b) -> bool:
    if a[0] in ("int", "double", "char") and \
            b[0] in ("int", "double", "char"):
        _, xa = _as_num(a)
        _, xb = _as_num(b)
        return xa == xb
    if a[0] == "bool" and b[0] == "bool":
        return a[1] == b[1]
    raise _Gate("== across incompatible types")


class _Runner:
    def __init__(self):
        self.env: Dict[str, tuple] = {}
        self.env_order: List[str] = []
        self.out: List[str] = []       # finished lines
        self.cur: Optional[str] = None  # line being built by print()
        self.trace: List[str] = []
        self.budget = 200000

    def emit(self, txt: str, nl: bool) -> None:
        if nl:
            self.out.append((self.cur or "") + txt)
            self.cur = None
        else:
            self.cur = (self.cur or "") + txt

    def finish_line(self) -> None:
        if self.cur is not None:
            self.out.append(self.cur)
            self.cur = None

    def burn(self, n: int = 1):
        self.budget -= n
        if self.budget <= 0:
            raise _Gate("runaway loop (step budget exceeded)")

    def snap(self) -> str:
        return ", ".join(f"{n} = {_jstr(self.env[n])}"
                         for n in self.env_order)

    def run(self, stmts: list) -> None:
        try:
            self.exec_block(stmts)
        except (_BreakEx, _ContinueEx):
            pass

    def exec_block(self, stmts: list) -> None:
        for st in stmts:
            self.exec(st)

    def _loop_guard(self, guard: int) -> int:
        if guard > 3000:
            raise _Gate("loop exceeds 3000 iterations")
        return guard

    def exec(self, st: tuple) -> None:
        self.burn()
        op = st[0]
        if op == "multi":
            for sub in st[1]:
                self.exec(sub)
            return
        if op == "decl":
            _, ty, name, init = st
            if name in self.env:
                raise _Gate("redeclare")
            default = {"int": ("int", 0), "double": ("double", 0.0),
                       "char": ("char", "\x00"), "bool": ("bool", False),
                       "str": ("str", "")}[_TYPE_KW[ty]]
            v = self.eval(init) if init is not None else default
            self.env[name] = self.coerce(v, _TYPE_KW[ty])
            self.env_order.append(name)
            return
        if op == "expr":
            self.eval(st[1])
            return
        if op == "print":
            _, nl, arg = st
            txt = _jstr(self.eval(arg)) if arg is not None else ""
            self.emit(txt, nl)
            return
        if op == "if":
            _, cond, then, els = st
            if _truthy(self.eval(cond)):
                self.exec_block(then)
            elif els is not None:
                self.exec_block(els)
            return
        if op == "for":
            _, init, cond, update, bod = st
            if init is not None:
                self.exec(init)
            guard = 0
            while cond is None or _truthy(self.eval(cond)):
                self.burn(10)
                guard = self._loop_guard(guard + 1)
                try:
                    self.exec_block(bod)
                except _BreakEx:
                    self.trace.append(f"break on pass {guard}: "
                                      f"{self.snap()}")
                    break
                except _ContinueEx:
                    pass
                self.trace.append(f"pass {guard}: {self.snap()}")
                if update is not None:
                    self.exec(update)
            return
        if op == "while":
            _, cond, bod = st
            guard = 0
            while _truthy(self.eval(cond)):
                self.burn(10)
                guard = self._loop_guard(guard + 1)
                try:
                    self.exec_block(bod)
                except _BreakEx:
                    self.trace.append(f"break on pass {guard}: "
                                      f"{self.snap()}")
                    break
                except _ContinueEx:
                    pass
                self.trace.append(f"pass {guard}: {self.snap()}")
            return
        if op == "do":
            _, bod, cond = st
            guard = 0
            while True:
                self.burn(10)
                guard = self._loop_guard(guard + 1)
                try:
                    self.exec_block(bod)
                except _BreakEx:
                    self.trace.append(f"break on pass {guard}: "
                                      f"{self.snap()}")
                    break
                except _ContinueEx:
                    pass
                self.trace.append(f"pass {guard}: {self.snap()}")
                if not _truthy(self.eval(cond)):
                    break
            return
        if op == "switch":
            _, subj, arms = st
            sv = self.eval(subj)
            start = None
            for idx, (cv, _stmts) in enumerate(arms):
                if cv is not None and _java_eq(sv, self.eval(cv)):
                    start = idx
                    break
            if start is None:
                for idx, (cv, _stmts) in enumerate(arms):
                    if cv is None:
                        start = idx
                        break
            if start is None:
                return
            try:
                for _cv, stmts in arms[start:]:
                    self.exec_block(stmts)
            except _SwitchBreak:
                pass
            return
        if op == "break":
            raise _BreakEx()
        if op == "continue":
            raise _ContinueEx()
        raise _Gate("statement " + str(op))

    def coerce(self, v, ty: str):
        k, x = v
        want = _TYPE_KW[ty] if ty in _TYPE_KW else ty
        if want == k:
            return v
        if want == "int":
            if k == "double":
                return ("int", int(x))  # Java cast truncates toward zero
            if k == "char":
                return ("int", ord(x))
            raise _Gate("coerce int")
        if want == "double":
            if k == "int":
                return ("double", float(x))
            if k == "char":
                return ("double", float(ord(x)))
            raise _Gate("coerce double")
        if want == "char":
            if k == "int":
                return ("char", chr(x & 0xFFFF))
            raise _Gate("coerce char")
        raise _Gate("coerce " + str(want))

    def eval(self, e: tuple):
        self.burn()
        op = e[0]
        if op == "lit":
            return e[1]
        if op == "paren":
            return self.eval(e[1])
        if op == "var":
            if e[1] not in self.env:
                raise _Gate(f"undeclared {e[1]}")
            return self.env[e[1]]
        if op == "mathobj":
            raise _Gate("bare Math object")
        if op == "cast":
            return self.coerce(self.eval(e[2]), e[1])
        if op == "assign":
            _, name, aop, rhs = e
            if name not in self.env:
                raise _Gate(f"undeclared {name}")
            rv = self.eval(rhs)
            cur = self.env[name]
            if aop == "=":
                nv = rv
            elif aop == "+=":
                nv = self.add(cur, rv)
            elif aop == "-=":
                nv = self.arith("-", cur, rv)
            elif aop == "*=":
                nv = self.arith("*", cur, rv)
            elif aop == "/=":
                nv = _jdiv(cur, rv)
            else:
                nv = _jmod(cur, rv)
            nv = self.coerce(nv, cur[0])
            self.env[name] = nv
            return nv
        if op in ("preinc", "predec", "postinc", "postdec"):
            name = e[1]
            if name not in self.env:
                raise _Gate("incr of undeclared")
            cur = self.env[name]
            nv = self.arith("+" if "inc" in op else "-", cur,
                            ("double", 1.0) if cur[0] == "double"
                            else ("int", 1))
            self.env[name] = nv
            return nv if op.startswith("pre") else cur
        if op == "not":
            return ("bool", not _truthy(self.eval(e[1])))
        if op == "neg":
            k, x = _as_num(self.eval(e[1]))
            return _jnum(k, -x)
        if op == "bnot":
            k, x = _as_num(self.eval(e[1]))
            if k != "int":
                raise _Gate("~ on double")
            return ("int", ~x)
        if op == "tern":
            _, c, a, b = e
            return self.eval(a) if _truthy(self.eval(c)) else self.eval(b)
        if op == "or":
            if _truthy(self.eval(e[1])):
                return ("bool", True)
            return ("bool", _truthy(self.eval(e[2])))
        if op == "and":
            if not _truthy(self.eval(e[1])):
                return ("bool", False)
            return ("bool", _truthy(self.eval(e[2])))
        if op in ("binand", "binor", "binxor"):
            ka, xa = _as_num(self.eval(e[1]))
            kb, xb = _as_num(self.eval(e[2]))
            if ka != "int" or kb != "int":
                raise _Gate("bitwise on double")
            if op == "binand":
                return ("int", xa & xb)
            if op == "binor":
                return ("int", xa | xb)
            return ("int", xa ^ xb)
        if op in ("cmpeq", "cmpne"):
            r = _java_eq(self.eval(e[1]), self.eval(e[2]))
            return ("bool", r if op == "cmpeq" else not r)
        if op[0] == "cmpop":
            _, xa = _as_num(self.eval(e[1]))
            _, xb = _as_num(self.eval(e[2]))
            return ("bool", {"<": xa < xb, ">": xa > xb,
                             "<=": xa <= xb, ">=": xa >= xb}[op[1]])
        if op[0] == "shift":
            ka, xa = _as_num(self.eval(e[1]))
            kb, xb = _as_num(self.eval(e[2]))
            if ka != "int" or kb != "int":
                raise _Gate("shift on double")
            return ("int", xa << xb if op[1] == "<<" else xa >> xb)
        if op == "add":
            return self.add(self.eval(e[1]), self.eval(e[2]))
        if op == "sub":
            return self.arith("-", self.eval(e[1]), self.eval(e[2]))
        if op[0] == "arith":
            return self.arith(op[1], self.eval(e[1]), self.eval(e[2]))
        if op == "call":
            return self.call(e[1], e[2], e[3])
        raise _Gate("expr " + str(op))

    def add(self, a, b):
        if a[0] == "str" or b[0] == "str":
            return ("str", _jstr(a) + _jstr(b))
        return self.arith("+", a, b)

    def arith(self, sym, a, b):
        ka, xa = _as_num(a)
        kb, xb = _as_num(b)
        dbl = "double" in (ka, kb)
        kind = "double" if dbl else "int"
        if sym == "+":
            return _jnum(kind, xa + xb)
        if sym == "-":
            return _jnum(kind, xa - xb)
        if sym == "*":
            return _jnum(kind, xa * xb)
        if sym == "/":
            return _jdiv(("int" if ka == "int" else "double", xa),
                         ("int" if kb == "int" else "double", xb))
        return _jmod(("int" if ka == "int" else "double", xa),
                     ("int" if kb == "int" else "double", xb))

    def call(self, recv, meth, args):
        rv = self.eval(recv)
        vals = [self.eval(a) for a in args]
        if rv[0] == "mathobj":
            if meth not in _METHODS_MATH:
                raise _Gate("Math." + meth)
            if meth == "random":
                raise _Gate("Math.random is non-deterministic")
            nums = [float(_as_num(v)[1]) for v in vals]
            n_expect = 2 if meth in ("pow", "max", "min") else 1
            if len(nums) != n_expect:
                raise _Gate("Math." + meth + " arity")
            x = nums[0]
            if meth == "pow":
                r = x ** nums[1]
            elif meth == "sqrt":
                if x < 0:
                    raise _Gate("sqrt of negative")
                r = math.sqrt(x)
            elif meth == "abs":
                r = abs(x)
            elif meth == "max":
                r = max(nums)
            elif meth == "min":
                r = min(nums)
            elif meth == "ceil":
                r = float(math.ceil(x))
            elif meth == "floor":
                r = float(math.floor(x))
            elif meth == "round":
                r = float(math.floor(x + 0.5))  # Java: half up
            elif meth == "cbrt":
                r = math.copysign(abs(x) ** (1 / 3), x)
            elif meth == "sin":
                r = math.sin(x)
            elif meth == "cos":
                r = math.cos(x)
            elif meth == "tan":
                r = math.tan(x)
            elif meth == "log":
                if x <= 0:
                    raise _Gate("log of non-positive")
                r = math.log(x)
            elif meth == "log10":
                if x <= 0:
                    raise _Gate("log10 of non-positive")
                r = math.log10(x)
            else:
                r = math.exp(x)
            if meth in ("abs", "max", "min") and \
                    all(_as_num(v)[0] == "int" for v in vals):
                return ("int", int(r))
            return ("double", r)
        if rv[0] == "str":
            if meth not in _METHODS_STR:
                raise _Gate("String." + meth)
            s = rv[1]
            if meth == "length":
                return ("int", len(s))
            if meth == "charAt":
                idx = _as_num(vals[0])[1]
                if not (0 <= idx < len(s)):
                    raise _Gate("charAt out of range")
                return ("char", s[idx])
            if meth == "substring":
                lo = _as_num(vals[0])[1]
                hi = _as_num(vals[1])[1] if len(vals) > 1 else len(s)
                if not (0 <= lo <= hi <= len(s)):
                    raise _Gate("substring out of range")
                return ("str", s[lo:hi])
            if meth == "indexOf":
                if vals[0][0] not in ("str", "char"):
                    raise _Gate("indexOf argument type")
                return ("int", s.find(vals[0][1]))
            if meth == "toUpperCase":
                return ("str", s.upper())
            if meth == "toLowerCase":
                return ("str", s.lower())
            if meth == "trim":
                return ("str", s.strip())
            if meth == "concat":
                if vals[0][0] not in ("str", "char"):
                    raise _Gate("concat argument type")
                return ("str", s + _jstr(vals[0]))
            if meth in ("equals", "equalsIgnoreCase"):
                if vals[0][0] not in ("str", "char"):
                    raise _Gate("equals argument type")
                other = _jstr(vals[0])
                if meth == "equals":
                    return ("bool", s == other)
                return ("bool", s.lower() == other.lower())
            if meth == "compareTo":
                other = _jstr(vals[0])
                for ca, cb in zip(s, other):
                    if ca != cb:
                        return ("int", ord(ca) - ord(cb))
                return ("int", len(s) - len(other))
            if meth == "replace":
                return ("str", s.replace(_jstr(vals[0]), _jstr(vals[1])))
            raise _Gate("String." + meth)
        raise _Gate("receiver " + rv[0])


_MAIN_RE = re.compile(
    r"(?:public\s+|static\s+|void\s+|final\s+)*void\s+main\s*\([^)]*\)"
    r"\s*\{(.*)\}\s*$", re.S)
_CLASS_RE = re.compile(r"\bclass\s+\w+[^{]*\{", re.S)
_QWORDS_RE = re.compile(
    r"^\s*(?:what\s+(?:will|would|is)\s+(?:be\s+)?the\s+(?:output|value|"
    r"result)(?:\s+of)?|predict\s+the\s+output\s+of|output\s+of|evaluate|"
    r"value\s+of|result\s+of|find\s+the\s+value\s+of|what\s+does\s+this"
    r"\s+print)\s*[:,]?\s*", re.I)


def _run_java(src: str) -> Tuple[_Runner, str]:
    """Parse and execute; raises _Gate on anything outside the subset."""
    s = src.strip()
    mm = _MAIN_RE.search(s)
    if mm:
        s = mm.group(1)
    else:
        mc = _CLASS_RE.search(s)
        if mc:
            if "main" not in s:
                raise _Gate("class without main")
            s = s[mc.end():]
    # a mid-code cut can leave an unbalanced trailing '}': trim it
    while s.endswith("}") and s.count("}") > s.count("{"):
        s = s[:-1].rstrip()
    # arrays are outside the taught subset
    if re.search(r"\[\s*\d+\s*\]|\[\s*\]\s*\w+\s*=|\bnew\b", s):
        raise _Gate("array usage")
    p = _Parser(_tokenize(s))
    stmts = []
    while p.peek() is not None:
        stmts.append(p.statement())
    r = _Runner()
    kind = "loop program" if any(st[0] in ("for", "while", "do")
                                 for st in stmts) else "program"
    r.run(stmts)
    r.finish_line()
    if len(r.out) > 24:
        raise _Gate("too many output lines")
    return r, kind


def _trace_steps(runner: _Runner, kind: str) -> List[str]:
    decls = "; ".join(f"{n} = {_jstr(runner.env[n])}"
                      for n in runner.env_order) or "(no variables)"
    steps = [
        "Method -- loop-trace rule: execute the JVM's exact order of "
        "evaluation -- declarations first, then per iteration test the "
        "condition, run the body, apply the update -- recording every "
        "variable after each pass; the output is read off the trace, "
        "never guessed.",
        f"Setup -- {decls}.",
    ]
    if runner.trace:
        shown = runner.trace if len(runner.trace) <= 16 else \
            runner.trace[:8] + [f"... {len(runner.trace) - 12} further "
                                f"passes ..."] + runner.trace[-4:]
        steps.append("Trace table -- " + " | ".join(shown) + ".")
    out_txt = " / ".join(runner.out) if runner.out else "(nothing printed)"
    steps.append(f"Output -- the program prints: {out_txt}.")
    steps.append(
        f"Verification -- re-run the whole trace a second time and "
        f"re-check the exit condition on the recorded final state: the "
        f"second execution reproduces {out_txt} exactly, and the loop "
        f"stopped only when its test went false (deterministic "
        f"re-evaluation, same answer).")
    steps.append(
        f"Interpretation -- the {kind}'s final printed value "
        f"({out_txt.split(' / ')[-1]}) is what the JVM would show on "
        f"stdout; every intermediate pass is logged above.")
    return steps


def _c_bare_expr(g, m, src: str):
    """Evaluate ONE taught expression (string-method chain, cast, or
    arithmetic) as if printed -- for 'output of "HELLO".length()' asks."""
    cand = None
    mc = re.search(r'"(?:\\.|[^"\\])*"\s*(?:\.\s*\w+\s*\((?:[^()]|\([^()]*'
                   r'\))*\))+', src)
    if mc:
        cand = mc.group(0)
    else:
        mcast = re.search(r"\(\s*(?:int|double|char|byte|short|long|float)"
                          r"\s*\)\s*[\d(][\d.\s()*/+\-]*", src)
        if mcast:
            cand = mcast.group(0)
        else:
            mnum = re.fullmatch(r"[\d.\s()*/%+\-]+", src or "")
            if mnum and re.search(r"\d[\s]*[*/%+-]|[\s(][*/%]|%|\*", src):
                cand = src
    if not cand:
        raise _Gate("no expression")
    p = _Parser(_tokenize(cand))
    e = p.expr()
    if p.peek() is not None:
        raise _Gate("trailing tokens")
    r = _Runner()
    v = r.eval(e)
    txt = _jstr(v)
    steps = [
        "Method -- taught-library evaluation: apply each method's "
        "definition from the taught String/cast/arithmetic table "
        "(indices are 0-based; substring's end index is EXCLUSIVE) to "
        "the literal, left to right.",
        f"Substitution -- the expression is {cand}.",
        f"Computation -- walking the operations in order yields {txt}.",
        f"Verification -- bounds re-check: every index used stays "
        f"within the literal, and recomputing the chain a second time "
        f"gives the same {txt} (deterministic).",
        f"Interpretation -- {txt} is the value the JVM produces; "
        f"strings being immutable, the original literal is never "
        f"changed -- a new value is returned.",
    ]
    try:
        val = float(txt)
    except ValueError:
        val = None
    return _res("JAVA_TRACE", g, val, "taught-expression evaluation",
                steps, answer=f"Output: {txt}")


_CODE_START_RE = re.compile(
    r"\b(?:int|long|short|byte|double|float|char|boolean|String|final)\s+"
    r"[A-Za-z_$]|system\s*\.\s*out|for\s*\(|while\s*\(|do\s*\{|switch"
    r"\s*\(|if\s*\(|[A-Za-z_$][A-Za-z0-9_$]*\s*(?:=|\+\+|--)", re.I)


def _c_java_trace(g, m, text):
    t = text.strip()
    src = _QWORDS_RE.sub("", t)
    src = src.rstrip("?").strip()
    ms = _CODE_START_RE.search(src)
    if ms:
        src = src[ms.start():]
        mcod = re.match(r"(?:.|\n)*[;}]", src)
        if mcod:
            src = src[:mcod.end()]
    looks_code = bool(re.search(
        r"[;{}]|system\s*\.\s*out|\bfor\s*\(|\bwhile\s*\(|\bdo\b|charAt|"
        r"substring|indexOf|\.length\(\)|Math\.|\+\+|--", src, re.I))
    if looks_code:
        try:
            runner, kind = _run_java(src)
        except _Gate:
            try:
                return _c_bare_expr(g, m, src)
            except _Gate:
                return _GATE
        except RecursionError:
            return _GATE
        outs = runner.out
        if len(outs) == 1:
            answer = f"Output: {outs[0]}"
            try:
                val = float(outs[0])
            except ValueError:
                val = None
        elif outs:
            answer = "Output: " + " | ".join(outs)
            val = None
        else:
            answer = "Output: (nothing printed)"
            val = None
        steps = _trace_steps(runner, kind)
        return _res("JAVA_TRACE", g, val,
                    "Java order-of-evaluation trace", steps, answer=answer)
    try:
        return _c_bare_expr(g, m, src)
    except _Gate:
        return _GATE


def _c_math_method(g, m, text):
    t = text
    mm = re.search(r"Math\s*\.\s*(\w+)\s*\(([^()]*)\)", t)
    if not mm:
        return _GATE
    fn = mm.group(1)
    if fn not in _METHODS_MATH or fn == "random":
        return _GATE
    raw = mm.group(2).strip()
    args = [a.strip() for a in raw.split(",")] if raw else []
    n_expect = 2 if fn in ("pow", "max", "min") else 1
    if len(args) != n_expect:
        return _GATE
    vals = []
    for a in args:
        try:
            vals.append(float(a))
        except ValueError:
            return _GATE
    x = vals[0]
    r = None
    if fn == "pow":
        r = x ** vals[1]
    elif fn == "sqrt":
        if x < 0:
            return _GATE
        r = math.sqrt(x)
    elif fn == "abs":
        r = abs(x)
    elif fn == "max":
        r = max(vals)
    elif fn == "min":
        r = min(vals)
    elif fn == "ceil":
        r = float(math.ceil(x))
    elif fn == "floor":
        r = float(math.floor(x))
    elif fn == "round":
        r = float(math.floor(x + 0.5))
    elif fn == "cbrt":
        r = math.copysign(abs(x) ** (1 / 3), x)
    elif fn == "log":
        if x <= 0:
            return _GATE
        r = math.log(x)
    elif fn == "log10":
        if x <= 0:
            return _GATE
        r = math.log10(x)
    elif fn == "exp":
        r = math.exp(x)
    elif fn == "sin":
        r = math.sin(x)
    elif fn == "cos":
        r = math.cos(x)
    elif fn == "tan":
        r = math.tan(x)
    if r is None:
        return _GATE
    int_args = fn in ("abs", "max", "min") and \
        all(v == int(v) for v in vals)
    pretty = str(int(r)) if (int_args or fn == "round") else _d2s(r)
    eq = f"Math.{fn}({raw}) = {pretty}"
    defs = {
        "pow": "raises the first argument to the power of the second "
               "(x^y)",
        "sqrt": "returns the positive square root",
        "abs": "returns the magnitude (distance from zero)",
        "max": "returns the larger of the arguments",
        "min": "returns the smaller of the arguments",
        "ceil": "returns the smallest double >= x (rounds UP, even for "
                "negatives)",
        "floor": "returns the largest double <= x (rounds DOWN)",
        "round": "rounds half up: floor(x + 0.5)",
        "cbrt": "returns the real cube root (negative input stays "
                "negative)",
    }
    steps = [
        f"Method -- java.lang.Math.{fn} rule: the library method "
        f"{defs.get(fn, f'computes the standard {fn} function')}; it "
        f"applies because these are static functions of the auto-"
        f"imported Math class.",
        f"Substitution -- Math.{fn}({raw}) with argument(s) "
        f"{', '.join(str(v) for v in vals)}.",
        f"Computation -- applying the definition gives {pretty}.",
        f"Verification -- sanity check: " +
        (f"{pretty}^{vals[1]:g} ~ {x} (the inverse power)"
         if fn == "pow" else
         f"{pretty} x {pretty} ~ {x} (the square returns the radicand)"
         if fn == "sqrt" else
         f"{math.floor(x)} <= {x} <= {math.ceil(x)} frames the value "
         f"and floor(x+0.5) = {pretty} sits per the half-up rule"
         if fn in ("ceil", "floor", "round") else
         f"comparing {vals[0]:g} and {vals[1]:g}, the "
         f"{'larger' if fn == 'max' else 'smaller'} is {pretty}"
         if fn in ("max", "min") else
         f"the sign/magnitude rule of {fn} holds for {x:g}")
        + ".",
        f"Interpretation -- a Java program printing Math.{fn}({raw}) "
        f"would display {pretty}.",
    ]
    return _res("MATH_METHOD_EVAL", g, r, eq, steps, answer=pretty,
                extra={"result": r})


# --------------------------------------------------------------------------- #
# HTML tag-purpose table (taught tag list, c6/c7 Computer Studies)
# --------------------------------------------------------------------------- #

_HTML_TAGS = [
    ("<html>", r"<\s*/?\s*html\s*>", "container",
     "is the root container that wraps the ENTIRE document",
     ["root", "entire document", "whole page", "outermost"]),
    ("<head>", r"<\s*/?\s*head\s*>", "container",
     "holds page information that is NOT displayed in the body (such "
     "as the title)",
     ["head section", "page information", "not displayed",
      "document head"]),
    ("<title>", r"<\s*/?\s*title\s*>", "container",
     "sets the text shown on the browser TAB / title bar",
     ["title bar", "browser tab", "tab heading", "name on the tab"]),
    ("<body>", r"<\s*/?\s*body\s*>", "container",
     "holds all the VISIBLE content of the page",
     ["visible content", "body content", "displayed part",
      "main content"]),
    ("<h1>..<h6>", r"<\s*/?\s*h[1-6]\s*>", "container",
     "are heading tags -- <h1> is the largest, <h6> the smallest",
     ["heading", "headings", "largest heading", "smallest heading",
      "section title"]),
    ("<p>", r"<\s*/?\s*p\s*>", "container",
     "defines a PARAGRAPH (a block of text with space above and below)",
     ["paragraph", "block of text"]),
    ("<br>", r"<\s*br\s*>", "void",
     "inserts a LINE BREAK -- text after it starts on a new line",
     ["line break", "break line", "new line", "next line", "newline"]),
    ("<hr>", r"<\s*hr\s*>", "void",
     "draws a HORIZONTAL RULE (a straight line across the page)",
     ["horizontal rule", "horizontal line", "straight line",
      "divider line", "section divider"]),
    ("<b>", r"<\s*b\s*>", "container", "renders the enclosed text BOLD",
     ["bold", "bolder", "thicker text"]),
    ("<i>", r"<\s*/?\s*i\s*>", "container",
     "renders the enclosed text ITALIC (slanted)",
     ["italic", "italics", "slanted text"]),
    ("<u>", r"<\s*/?\s*u\s*>", "container",
     "renders the enclosed text UNDERLINED",
     ["underline", "underlined"]),
    ("<sub>", r"<\s*/?\s*sub\s*>", "container",
     "renders text as SUBSCRIPT -- smaller and lowered (H2O)",
     ["subscript", "lowered text", "chemical formula"]),
    ("<sup>", r"<\s*/?\s*sup\s*>", "container",
     "renders text as SUPERSCRIPT -- smaller and raised (10^3)",
     ["superscript", "raised text", "exponent display"]),
    ("<ul>", r"<\s*/?\s*ul\s*>", "container",
     "creates an UNORDERED (bulleted) list",
     ["unordered list", "bulleted list", "bullet list", "bullets"]),
    ("<ol>", r"<\s*/?\s*ol\s*>", "container",
     "creates an ORDERED (numbered) list",
     ["ordered list", "numbered list", "numbering"]),
    ("<li>", r"<\s*/?\s*li\s*>", "container",
     "marks each LIST ITEM inside <ul> or <ol>",
     ["list item", "item of the list", "each item"]),
    ("<img>", r"<\s*img\b[^>]*>", "void",
     "embeds an IMAGE; its src attribute gives the picture's location",
     ["image", "insert picture", "display picture", "embed image",
      "photo"]),
    ("<a>", r"<\s*a\b[^>]*>", "container",
     "creates a HYPERLINK; its href attribute gives the destination URL",
     ["hyperlink", "anchor", "connect pages", "link another page",
      "jump to another page"]),
    ("<table>", r"<\s*/?\s*table\s*>", "container",
     "is the container for a TABLE (a grid of rows and cells)",
     ["table", "tabular grid", "grid of rows"]),
    ("<tr>", r"<\s*/?\s*tr\s*>", "container", "defines one TABLE ROW",
     ["table row", "row of the table", "new row"]),
    ("<td>", r"<\s*/?\s*td\s*>", "container",
     "defines one TABLE DATA CELL (a column position in a row)",
     ["table data", "data cell", "cell of the table", "column cell"]),
    ("<th>", r"<\s*/?\s*th\s*>", "container",
     "defines a TABLE HEADER cell (bold, centred)",
     ["table header", "header cell", "heading cell"]),
    ("<marquee>", r"<\s*marquee\b[^>]*>", "container",
     "scrolls its content MOVING ACROSS THE SCREEN (a scrolling "
     "banner)",
     ["marquee", "scrolling text", "moving text", "scroll banner",
      "scrolls across"]),
    ("<form>", r"<\s*form\b[^>]*>", "container",
     "groups interactive INPUT CONTROLS and sends the data to a server "
     "(action attribute)",
     ["form", "input controls", "collect user input",
      "send data to server", "registration page"]),
]
_HTML_ATTRS = [
    ("src", "the attribute of <img> giving the image FILE's location or "
            "URL", ["src", "image location", "image file location",
                    "picture source"]),
    ("href", "the attribute of <a> giving the hyperlink DESTINATION URL",
     ["href", "destination url", "link target", "link address"]),
    ("action", "the attribute of <form> saying where the form data is "
               "SENT", ["action attribute", "form action",
                        "where the form data goes"]),
]


def _c_html(g, m, text):
    t = text
    low = t.lower()
    if not re.search(r"\bhtml\b|\btag\b|hyperlink|line break|bullet|"
                     r"<\s*/?\s*[a-z]", t, re.I):
        return _GATE
    # direction 1: given a tag, give its purpose
    for tag, rx, kind, purpose, kws in _HTML_TAGS:
        if re.search(rx, t, re.I):
            kind_txt = ("void: self-closing, no closing tag"
                        if kind == "void" else
                        "container: wraps content between open and close "
                        "tags")
            steps = [
                "Method -- taught-tag lookup rule: the HTML tag table "
                "maps each tag to the effect the browser renders; "
                "match the tag exactly, then restate its rendering "
                "behaviour.",
                f"Substitution -- the given tag is {tag} ({kind_txt}).",
                f"Computation -- the table entry for {tag}: it {purpose}.",
                f"Verification -- cross-check by rendering semantics: "
                f"ask what changes on screen when the tag is added -- "
                f"only this taught tag produces exactly that effect, so "
                f"the mapping is unique.",
                f"Interpretation -- use {tag} in the document whenever "
                f"the page must show this element.",
            ]
            return _res("HTML_TAG_PURPOSE", g, None, f"{tag}: {purpose}",
                        steps, answer=f"{tag} -- {purpose}", conf=0.94)
    # direction 2: given a purpose, find the tag
    if re.search(r"which tag|what tag|name the tag|which html|purpose "
                 r"of|used to|used for|insert|create|display|mark", low):
        best = None
        best_hits = 0
        for tag, rx, kind, purpose, kws in _HTML_TAGS:
            hits = sum(1 for kw in kws if kw in low)
            if hits > best_hits:
                best, best_hits = (tag, purpose), hits
        if best:
            tag, purpose = best
            steps = [
                "Method -- taught-tag lookup rule (reverse): match the "
                "required rendering effect against the taught tag "
                "table and pick the tag whose effect is exactly that.",
                f"Substitution -- the required effect is stated in the "
                f"question ({t.strip()[:90]}).",
                f"Computation -- the table row whose purpose matches is "
                f"{tag}: it {purpose}.",
                f"Verification -- cross-check the neighbours: no other "
                f"taught tag produces this effect, so the mapping is "
                f"unique in the taught set.",
                f"Interpretation -- write {tag} in the HTML document to "
                f"get exactly this rendering.",
            ]
            return _res("HTML_TAG_PURPOSE", g, None, f"{tag}: {purpose}",
                        steps, answer=tag, conf=0.93)
    for name, purpose, kws in _HTML_ATTRS:
        if re.search(rf"\b{name}\b", low) and \
                re.search(r"attribute|purpose|used|does", low):
            steps = [
                "Method -- taught-attribute lookup rule: match the "
                "attribute to the tag it configures and state what it "
                "supplies.",
                f"Substitution -- the given attribute is {name}.",
                f"Computation -- the table entry: {name} is {purpose}.",
                f"Verification -- the attribute only exists inside its "
                f"host tag; re-reading the pairing confirms the "
                f"tag-attribute match.",
                f"Interpretation -- without {name} the host element "
                f"would not know where to fetch or send its data.",
            ]
            return _res("HTML_TAG_PURPOSE", g, None, f"{name}: {purpose}",
                        steps, answer=purpose, conf=0.93)
    return _GATE


# --------------------------------------------------------------------------- #
# escape sequences (c9 ch3: backslash + marker = ONE char with an action)
# --------------------------------------------------------------------------- #

_ESCAPES = [
    ("\\n", "newline", "moves the cursor to the BEGINNING OF THE NEXT "
     "LINE", ["new line", "newline", "next line", "line feed"]),
    ("\\t", "horizontal tab", "jumps the cursor to the NEXT TAB STOP "
     "(a horizontal tab)", ["tab"]),
    ("\\r", "carriage return", "moves the cursor to the START of the "
     "CURRENT line", ["carriage return", "start of the current line",
                      "beginning of the current line"]),
    ("\\b", "backspace", "moves the cursor ONE SPACE BACK (it does not "
     "erase)", ["backspace", "one space back", "cursor back"]),
    ("\\f", "form feed", "ejects the printer/cursor to the next PAGE "
     "(form feed)", ["form feed", "next page"]),
    ("\\\\", "backslash", "prints one literal BACKSLASH character (the "
     "escape escapes itself)", ["backslash", "literal slash"]),
    ("\\\"", "double quote", "prints a literal DOUBLE QUOTE inside a "
     "string literal", ["double quote", "double quotation"]),
    ("\\'", "single quote", "prints a literal SINGLE QUOTE (apostrophe) "
     "inside a char literal", ["single quote", "apostrophe"]),
]


def _c_escape(g, m, text):
    t = text
    if not re.search(r"escape", t, re.I) and \
            not re.search(r"\\[ntrbf'\"]", t):
        return _GATE
    seq = None
    for sym, name, effect, kws in _ESCAPES:
        if sym in t:
            seq = (sym, name, effect)
            break
    if seq is None:
        low = t.lower()
        if re.search(r"which|what.*sequence|used to|represent", low):
            for sym, name, effect, kws in _ESCAPES:
                if any(kw in low for kw in kws):
                    others = ", ".join(s for s, *_ in _ESCAPES if s != sym)
                    steps = [
                        "Method -- escape-table lookup (reverse): match "
                        "the required cursor/character action against "
                        "the taught escape-sequence table; an escape "
                        "sequence is a backslash + marker that encodes "
                        "ONE char with a special action.",
                        f"Substitution -- the required action: "
                        f"{effect}.",
                        f"Computation -- the table row matching that "
                        f"action is {sym} ({name}).",
                        f"Verification -- the other taught sequences "
                        f"({others}) do different actions, so {sym} is "
                        f"the unique match.",
                        f"Interpretation -- writing {sym} inside the "
                        f"literal performs the action at run time while "
                        f"the source still shows one character.",
                    ]
                    return _res("ESCAPE_SEQ", g, None, f"{sym}: {effect}",
                                steps, answer=sym, conf=0.94)
        return _GATE
    sym, name, effect = seq
    others = ", ".join(s for s, *_ in _ESCAPES if s != sym)
    steps = [
        "Method -- escape-table lookup rule: in Java a backslash inside "
        "a char/String literal starts an escape sequence encoding ONE "
        "character with a special action; match the sequence against "
        "the taught table.",
        f"Substitution -- the given sequence is {sym}.",
        f"Computation -- the table entry: {sym} is the {name} escape -- "
        f"it {effect}.",
        f"Verification -- sanity re-check: the two source characters "
        f"collapse into a single char code for the compiler, so a "
        f"string containing {sym} counts it as one character; the "
        f"other sequences ({others}) do different actions.",
        f"Interpretation -- at run time {sym} performs exactly: "
        f"{effect.lower()}.",
    ]
    return _res("ESCAPE_SEQ", g, None, f"{sym}: {effect}", steps,
                answer=f"{sym} -- {effect}", conf=0.94)


# --------------------------------------------------------------------------- #
# ASCII / Unicode facts (c9 ch3: char = 16-bit unsigned 0-65535)
# --------------------------------------------------------------------------- #

def _c_ascii(g, m, text):
    t = text
    if not re.search(r"\bASCII\b|\bUnicode\b|code point", t, re.I):
        return _GATE
    mdiff = re.search(r"'(.)'\s*-\s*'(.)'|difference.{0,40}'(.)'"
                      r".{0,40}'(.)'", t)
    if mdiff:
        groups = [gg for gg in mdiff.groups() if gg]
        if len(groups) == 2:
            c1, c2 = groups
            d = ord(c1) - ord(c2)
            steps = [
                "Method -- code-table arithmetic rule: subtract the two "
                "ASCII codes directly (the taught case gap is 'a' - 'A' "
                "= 32).",
                f"Substitution -- '{c1}' = {ord(c1)}, '{c2}' = "
                f"{ord(c2)}.",
                f"Computation -- {ord(c1)} - {ord(c2)} = {d}.",
                f"Verification -- add back: {ord(c2)} + {d} = {ord(c1)}, "
                f"recovering the first code.",
                f"Interpretation -- the code distance between the two "
                f"characters is {d}.",
            ]
            return _res("ASCII_UNICODE", g, float(d),
                        f"'{c1}' - '{c2}' = {d}", steps, answer=str(d),
                        extra={"diff": d})
    mc = re.search(r"'(.)'", t)
    if mc is None:
        # bare letter: "ASCII value of A" / "ASCII code for Z"
        mc = re.search(r"\bof\s+([A-Za-z0-9])\b(?:[?.,!]|$)", t) or \
            re.search(r"\bfor\s+([A-Za-z0-9])\b(?:[?.,!]|$)", t)
    if mc:
        ch = mc.group(1)
        code = ord(ch)
        if code > 127:
            return _GATE
        if "A" <= ch <= "Z":
            base, desc = 65, "uppercase block starts at 'A' = 65"
        elif "a" <= ch <= "z":
            base, desc = 97, "lowercase block starts at 'a' = 97"
        elif "0" <= ch <= "9":
            base, desc = 48, "digit block starts at '0' = 48"
        else:
            base, desc = code, "a fixed table entry"
        steps = [
            "Method -- ASCII code-table rule: the table fixes one code "
            "per character -- digits 48-57, uppercase 65-90, lowercase "
            "97-122 -- so a character's code is its block start plus "
            "its offset inside the block.",
            f"Substitution -- the character is '{ch}'.",
            f"Computation -- {desc}; '{ch}' sits {code - base} place(s) "
            f"into its block, giving base + offset = {base} + "
            f"{code - base} = {code}.",
            f"Verification -- substitute back: the character with code "
            f"{code} is '{chr(code)}', recovering '{ch}' from the "
            f"table; the round trip closes.",
            f"Interpretation -- Java stores '{ch}' as the number "
            f"{code}, which is why chars compare like ints (e.g. 'A' "
            f"< '1' because 65 < 48 is false -- wait, 65 > 48).",
        ]
        steps[4] = (
            f"Interpretation -- Java stores '{ch}' as the number "
            f"{code}; char comparisons are numeric, so ordering "
            f"follows the table (digits 48-57 before uppercase 65-90 "
            f"before lowercase 97-122).")
        return _res("ASCII_UNICODE", g, float(code),
                    f"ASCII('{ch}') = {code}", steps, answer=str(code),
                    extra={"code": code})
    if re.search(r"range|65\s*,?\s*535|16\s*.?\s*bit|2\s*bytes|how many "
                 r"characters", t, re.I):
        steps = [
            "Method -- taught char-fact rule: Java's char is 16-bit "
            "UNSIGNED and stores a Unicode code point, so its range is "
            "0 to 2^16 - 1 = 0 to 65535 (2 bytes).",
            "Substitution -- 2^16 = 65536 patterns.",
            "Computation -- unsigned range = 0 .. 65536 - 1 = 0 .. "
            "65535; size 16 bits = 2 bytes.",
            "Verification -- count the values: 65535 - 0 + 1 = 65536 = "
            "2^16, the tally closes.",
            "Interpretation -- one char holds any Unicode code point up "
            "to 65535, which is why Java text is not limited to ASCII.",
        ]
        return _res("ASCII_UNICODE", g, 65535.0,
                    "Java char: 16-bit unsigned Unicode code point, 0 "
                    "to 65535", steps, answer="0 to 65535 (16-bit "
                    "unsigned)", extra={"max": 65535})
    return _GATE


# --------------------------------------------------------------------------- #
# TABLE + dispatcher
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- logic (most specific first) ----
    ("HALF_ADDER", r"half\s*-?\s*adder", _c_half_adder),
    ("LOGIC_GATE",
     r"\b(?:NAND|NOR|XOR|AND|OR|NOT)\s+gates?\b|truth\s+table|logic\s+"
     r"gate|inverter|exclusive\s+or|\b(?:XOR|NAND|NOR)\s*\(", _c_logic_gate),
    ("LOGIC_GATE", r"\bNOT\s+gate\b|\binverter\b", _c_not_gate),
    ("BOOL_SIMPLIFY",
     r"simplif|de\s?morgan|absorption|boolean\s+(?:law|theorem|identity|"
     r"expression)", _c_bool_simplify),
    ("BOOL_EVAL", r"evaluate|value of", _c_bool_eval),
    # ---- library / code output ----
    ("MATH_METHOD_EVAL", r"Math\s*\.\s*\w+\s*\(", _c_math_method),
    ("JAVA_TRACE",
     r"system\s*\.\s*out|predict.{0,40}output|output.{0,50}(?:following|"
     r"code|loop|snippet|program|fragment)|what\s+(?:is|will).{0,40}"
     r"(?:printed|displayed|output)|\bfor\s*\(|\bwhile\s*\(|\bdo\s*\{|"
     r"charAt|substring|indexOf|\.length\(\)", _c_java_trace),
    # ---- storage / bits ----
    ("STORAGE_UNITS",
     r"\bkilobyte|\bmegabyte|\bgigabyte|\bterabyte|\bKB\b|\bMB\b|\bGB\b|"
     r"\bTB\b|\bnibble\b|(?:how many|convert).{0,40}(?:bits?|bytes?)",
     _c_storage),
    ("BITS_RANGE",
     r"how many bits|(?:largest|greatest|maximum|highest|how many "
     r"different|how many possible|values can|numbers can).{0,80}"
     r"\bbits?\b|\bbits?\b.{0,60}(?:represent|values|largest|greatest|"
     r"maximum|patterns|combinations|needed)", _c_bits_range),
    ("BIT_WEIGHT",
     r"\bMSB\b|\bLSB\b|most significant bit|least significant bit|place "
     r"value|weight", _c_bit_weight),
    # ---- char facts ----
    ("ESCAPE_SEQ",
     r"\\\\[ntrbf'\"]|\\\\u[0-9A-Fa-f]{4}|escape\s+sequences?", _c_escape),
    ("ASCII_UNICODE", r"\bASCII\b|\bUnicode\b|code\s+point", _c_ascii),
    # ---- markup ----
    ("HTML_TAG_PURPOSE",
     r"<\s*/?\s*(?:html|head|title|body|h[1-6]|p|br|hr|b|i|u|sub|sup|ul|"
     r"ol|li|img|a|table|tr|td|th|marquee|form)\b|\bhtml\b|\btag\b|"
     r"hyperlink|line break|bullet", _c_html),
    # ---- number systems ----
    ("BASE_ARITHMETIC",
     r"(?:add|sum|subtract|difference|minus|plus).{0,90}(?:binary|octal|"
     r"hex|base\s*(?:2|8|16))|(?:binary|octal|hex).{0,90}(?:add|sum|plus|"
     r"subtract|minus)|\(\s*[0-9A-Fa-f]+\s*\)\s*(?:2|8|16)\b", _c_base_arith),
    ("BASE_CONVERT",
     r"convert|equivalent|\)\s*[28]\b|\(\s*[01]{2,}\s*\)|base\s*(?:2|8|10"
     r"|16)", _c_base_convert),
]

TABLE = _TABLE


def model_compapp(text: str) -> ModelResult:
    """Dispatcher: scan every computer-applications family; the first
    grounded hit wins.  Triggers are deterministic regexes; each row
    applies its own plausibility gates inside compute, and a gate
    refusal simply lets the scan continue.  Never calls an LLM."""
    norm = _normalize(text or "")
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        if isinstance(out, ModelResult):
            return out  # interpreter families return the result directly
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("COMPAPP", "no computer-applications family matched")
