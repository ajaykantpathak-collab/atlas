"""input_normalizer.py -- STAGE 0: the shared input normalizer.

Wording variants ("percent" vs %, "SI" vs simple interest, "raised to
the power" vs ^, "1,50,000" vs 150000) used to be patched INSIDE
individual family regexes -- a treadmill.  This module is the ONE
shared pass that rewrites every wording equivalence into a canonical
form BEFORE any matching, so per-family variant branches stop being
needed.

Contract (see normalize_input):
    - IDEMPOTENT:      normalize_input(normalize_input(t))
                       == normalize_input(t)
    - VALUE-PRESERVING: never changes any numeric value, only its
                       surface form
    - NEVER RAISES:    on unknown input the text is returned unchanged

Zero-wrong bias: when a rule cannot be sure a phrase is the intended
quantity wording, it leaves the text unchanged.  A missed
normalization costs a refusal; a wrong one costs a WRONG ANSWER.
Every guard below that narrows a rule is backed by a probe against
the owning family (see tests/test_input_normalizer.py).

Rules (each one function, applied in pipeline order):

    1. unicode math          -- delegates to
                                math_kernel.normalize_unicode_math
                                (superscripts, math-alphanumeric
                                block, unicode operators, flattened
                                exponents in polynomial context).
    2. power phrases         -- "2 raised to the power (of) 6" /
                                "2 to the power (of) 6" -> "2 ^ 6"
                                (integer base and exponent only;
                                decimal exponents are left alone --
                                the caret form would re-parse wrong).
    3. Indian number groups  -- "1,50,000" -> "150000" (also US-style
                                "1,000" -> "1000"; a trailing group
                                must be exactly 3 digits, so lists
                                like "12,34" are never touched).
    4. lakh / crore          -- "2.5 lakh" -> "250000",
                                "1.5 crore" -> "15000000".
    5. dozen                 -- "half a dozen" -> "6",
                                "a dozen" -> "12", "N dozen(s)" ->
                                N*12 (multiplicative expansion, like
                                lakh; a bare "dozens of" is left).
    6. fraction words        -- "twice 8" -> "2 times 8",
                                "thrice 9" -> "3 times 9",
                                "half 30" -> "0.5 30",
                                "a quarter of 40" -> "0.25 x 40".
                                Guards: "twice/thrice a number"
                                (riddle family owns the word form),
                                "half of N" / "quarter of N"
                                (FRACTION_PERCENT_OF owns the word
                                form and misses the digit form),
                                "half-yearly", "half-life".
    7. percent words         -- "4 percent" / "4 percentage" /
                                "4 per cent" -> "4 %" (digit-adjacent
                                quantity frame only; "what percent
                                age of" and "profit percent" keep the
                                word form; "percentage points" is
                                never touched).
    8. interest abbrevs      -- standalone "SI" -> "simple interest",
                                "CI" -> "compound interest"
                                (uppercase only, so "SiO2"/"si" are
                                safe; "SI units"/"SI prefix" keep the
                                abbreviation).
    9. currency              -- rupee sign / "INR" / "Rs." -> "Rs"
                                (one canonical token).
    10. rate periods         -- "p.a." -> "per annum" (digit- or
                                %-adjacent only).  "per annum" IS the
                                canonical form and stays; "per year"
                                also stays (the annuity reader keys
                                off the literal word "year").
    11. speed units          -- "kmph" / "km/hr" / "kilometres per
                                hour" -> "km/h"; "mps" -> "m/s"
                                (lowercase only; "amps" is safe).
    12. whitespace last      -- unicode minus -> "-", collapse
                                spaces, strip trailing periods.

Rejected mappings (each would flip a VERIFIED answer into a refusal
or a wrong one -- probed against the owning family):
    - "per annum" -> "per year": INTEREST regex requires literal
      "per annum"; rejected, "per annum" is the canonical.
    - "half of N" -> "0.5 of N" and "quarter of N" -> "0.25 x N" when
      already in the family's word form: FRACTION_PERCENT_OF matches
      the words and misses the digits ("half of 18" verified 9 ->
      "0.5 of 18" guided).
    - "what percent(age) of" -> "%": math_kernel._model_percentage
      matches the word frame and the "%" frame fails its gate.
    - "twice/thrice a number" -> "2 times a number":
      RIDDLE_MULTIPLIER requires the word form.
    - decimal base/exponent in power phrases: "0.5 ^ 2" re-parses as
      "5 ^ 2" downstream -- left in words instead.
"""

from __future__ import annotations

import re

from backend.its.solver.math_kernel import normalize_unicode_math

__all__ = ["normalize_input"]

# --------------------------------------------------------------------------- #
# 1b. Spelled-out number words -> digits
# ("one hundred twenty kilometers per hour" -> "120 kilometers per hour",
#  "two lakh" -> "200000").  Indian scale words included; article/pronoun
#  uses of one/a/an are preserved ("one of the boys" stays worded).
# --------------------------------------------------------------------------- #

_NUM_UNITS = {
    "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
    "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
    "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50,
    "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90,
}
_NUM_SCALES = {
    "hundred": 100, "thousand": 1000, "lakh": 100000, "crore": 10000000,
    "million": 1000000, "billion": 1000000000,
}
_NUM_WORDS = set(_NUM_UNITS) | set(_NUM_SCALES)
_CONNECTORS = {"and"}

# Unit/context words that make a bare "one"/"a" numeric
# ("one kilometre" -> "1 kilometre", but "one of them" stays).
# nouns that signal a count, not an operand: 'two angles', 'three lines'
_COUNT_NOUNS = {
    "angles", "lines", "numbers", "pairs", "points", "sides", "terms",
    "boys", "girls", "students", "people", "friends", "children",
    "apples", "oranges", "books", "pens", "coins", "notes", "items",
    "digits", "factors", "multiples", "vertices", "edges", "faces",
    "circles", "triangles", "squares", "rectangles", "polygons",
    "steps", "iterations", "rounds", "times", "ways", "places",
    "ropes", "pieces", "strips", "planks", "wires", "bells",
    "symbols", "notebooks", "drinks", "snacks", "tiles", "rows",
    "columns", "bars", "lamps", "posts", "flags", "beads", "marbles",
    "questions", "answers", "problems", "numbers", "words",
}

_AFTER_NUM_UNITS = {
    "km", "kilometre", "kilometres", "kilometer", "kilometers", "kmph",
    "m", "metre", "metres", "meter", "meters", "cm", "mm", "kg", "g",
    "kilogram", "kilograms", "gram", "grams", "litre", "litres", "liter",
    "liters", "l", "ml", "s", "sec", "second", "seconds", "min", "mins",
    "minute", "minutes", "h", "hr", "hrs", "hour", "hours", "day", "days",
    "week", "weeks", "month", "months", "year", "years", "rupee", "rupees",
    "rs", "paisa", "paise", "percent", "percentage", "degree", "degrees",
    "mark", "marks", "dozen", "score", "pair", "times", "tonne", "tonnes",
    "ton", "tons", "km/h", "m/s", "km/hr",
}


def _words_to_number(words: list) -> float:
    """Greedy left-to-right: units accumulate, scales multiply the running
    total ('one hundred twenty' -> ((1*100)+20) = 120; 'two lakh' -> 200000)."""
    total = 0.0
    current = 0.0
    for w in words:
        wl = w.lower()
        if wl in _CONNECTORS:
            continue
        if wl in _NUM_UNITS:
            current += _NUM_UNITS[wl]
        elif wl in _NUM_SCALES:
            scale = _NUM_SCALES[wl]
            current = (current if current else 1.0) * scale
            if scale >= 1000:
                total += current
                current = 0.0
        else:
            break
    return total + current


def _fmt_num(v: float) -> str:
    return str(int(v)) if v == int(v) else str(v)


def _expand_number_words(t: str) -> str:
    tokens = t.split(" ")
    out = []
    i = 0
    n = len(tokens)
    while i < n:
        tok = tokens[i]
        tl = tok.lower().strip(".,;:!?")
        startable = tl in _NUM_WORDS or (
            tl in ("a", "an") and i + 1 < n and
            tokens[i + 1].lower().strip(".,;:!?") in _NUM_SCALES)
        if not startable:
            out.append(tok)
            i += 1
            continue
        # consume a maximal numeric phrase (number words + 'and')
        j = i
        phrase = []
        if tl in ("a", "an"):
            phrase.append("1")  # 'a hundred' -> 100
        while j < n:
            w = tokens[j].lower().strip(".,;:!?-")
            if w in _NUM_WORDS or w in _CONNECTORS:
                phrase.append(w)
                j += 1
            else:
                break
        # strip trailing connectors
        while phrase and phrase[-1] in _CONNECTORS:
            phrase.pop()
            j -= 1
        nxt = tokens[j].lower().strip(".,;:!?") if j < n else ""
        phrase_nums = [w for w in phrase if w not in _CONNECTORS]
        multi = len(phrase_nums) > 1
        has_scale = any(w in _NUM_SCALES for w in phrase_nums)
        ambiguous_single = (len(phrase_nums) == 1 and
                            phrase_nums[0] in ("one", "1"))
        # count-of-entities: 'two angles', 'two parallel lines' — the
        # word is a count, not an operand.  Look past one adjective.
        if len(phrase_nums) == 1 and (
                nxt in _COUNT_NOUNS or
                # 'two of them are 58 and 180' — 'two' counts the
                # referents; the operands are the numbers after
                (nxt == "of" and j + 1 < n and
                 tokens[j + 1].lower().strip(".,;:!?")
                 in ("them", "these", "those", "us")) or
                (j + 1 < n and tokens[j + 1].lower()
                 .strip(".,;:!?") in _COUNT_NOUNS) or
                (j + 2 < n and tokens[j + 2].lower()
                 .strip(".,;:!?") in _COUNT_NOUNS)):
            out.extend(tokens[i:j])
            i = j
            continue
        if ambiguous_single and nxt not in _AFTER_NUM_UNITS:
            out.extend(tokens[i:j])
            i = j
            continue
        if tl in ("a", "an") and not (multi or has_scale):
            out.append(tok)
            i += 1
            continue
        if not phrase_nums:
            out.append(tok)
            i += 1
            continue
        val = _words_to_number([w if w != "1" else "one" for w in phrase_nums])
        # trailing "and a half / and half" -> +0.5
        k = j
        while k < n and tokens[k].lower() in ("and", "a"):
            k += 1
        if k < n and tokens[k].lower().startswith("half"):
            val += 0.5
            j = k + 1
        out.append(_fmt_num(val))
        i = j
    return " ".join(out)


# --------------------------------------------------------------------------- #
# 2.  Power phrases -> caret (integer base and exponent only)
# --------------------------------------------------------------------------- #

# Lookarounds keep decimal neighbours out: "0.5 raised to the power 2"
# must stay worded (the caret form "0.5 ^ 2" re-parses as "5 ^ 2"
# downstream), and "2 raised to the power 0.5" must stay worded too.
_POWER_PHRASE_RE = re.compile(
    r"(?<![\d.])(\d+)(?!\.?\d)\s+"
    r"(?:raised\s+to\s+the\s+power\s+(?:of\s+)?"
    r"|to\s+the\s+power\s+(?:of\s+)?)"
    r"\s*(\d+)(?!\.?\d)",
    re.IGNORECASE)


def _expand_power_phrases(t: str) -> str:
    return _POWER_PHRASE_RE.sub(r"\1 ^ \2", t)


# --------------------------------------------------------------------------- #
# 3.  Indian (and US) comma number groups -> plain digits
# --------------------------------------------------------------------------- #

# A grouped number: 1-3 lead digits, then 2-3 digit groups, and the
# LAST group exactly 3 digits ("1,50,000", "1,234", "1,23,45,678").
# "12,34" (last group of 2) is a list, not a number -- untouched.
_INDIAN_GROUPED_RE = re.compile(
    r"(?<![\d.,])(\d{1,3}(?:,\d{2,3})*,\d{3})(?![\d,])")


def _expand_indian_numbers(t: str) -> str:
    return _INDIAN_GROUPED_RE.sub(
        lambda m: m.group(1).replace(",", ""), t)


# --------------------------------------------------------------------------- #
# 4.  lakh / crore -> absolute value
# --------------------------------------------------------------------------- #

_SCALE_RE = re.compile(
    r"(?<![\d.])(\d+(?:\.\d+)?)\s*(lakh|crore)s?(?![A-Za-z])",
    re.IGNORECASE)


def _expand_lakh_crore(t: str) -> str:
    def _repl(m):
        x = float(m.group(1))
        mult = 100000.0 if m.group(2).lower() == "lakh" else 10000000.0
        v = round(x * mult, 6)
        return str(int(v)) if v == int(v) else str(v)

    return _SCALE_RE.sub(_repl, t)


# --------------------------------------------------------------------------- #
# 5.  dozen -> count  (order matters: half-a-dozen before a-dozen)
# --------------------------------------------------------------------------- #

_HALF_DOZEN_RE = re.compile(r"\bhalf\s+a\s+dozen\b", re.IGNORECASE)
_N_DOZEN_RE = re.compile(
    r"(?<![\d.])(\d+(?:\.\d+)?)\s+dozens?\b(?![A-Za-z])", re.IGNORECASE)
_A_DOZEN_RE = re.compile(r"\ba\s+dozen\b", re.IGNORECASE)


def _expand_dozen(t: str) -> str:
    t = _HALF_DOZEN_RE.sub("6", t)

    def _repl(m):
        v = round(float(m.group(1)) * 12.0, 6)
        return str(int(v)) if v == int(v) else str(v)

    t = _N_DOZEN_RE.sub(_repl, t)
    return _A_DOZEN_RE.sub("12", t)


# --------------------------------------------------------------------------- #
# 6.  Spelled quantity words (closed lexicon, guarded frames only)
# --------------------------------------------------------------------------- #

# "twice/thrice a number" is the riddle family's word form -- never
# touched.  Only the digit frame converts.
_TWICE_NUM_RE = re.compile(r"\btwice(?=\s+\d)", re.IGNORECASE)
_THRICE_NUM_RE = re.compile(r"\bthrice(?=\s+\d)", re.IGNORECASE)
# "half of N" belongs to FRACTION_PERCENT_OF in words; only "half 30"
# (digit, no "of") canonicalizes.
_HALF_NUM_RE = re.compile(r"\bhalf(?=\s+\d)", re.IGNORECASE)
# "a quarter of 40" -> "0.25 x 40"; "a quarter of an hour" stays.
_QUARTER_OF_RE = re.compile(r"\ba\s+quarter\s+of\s+(?=\d)", re.IGNORECASE)


def _expand_fraction_words(t: str) -> str:
    t = _TWICE_NUM_RE.sub("2 times", t)
    t = _THRICE_NUM_RE.sub("3 times", t)
    t = _QUARTER_OF_RE.sub("0.25 x ", t)
    return _HALF_NUM_RE.sub("0.5", t)


# --------------------------------------------------------------------------- #
# 7.  percent words -> % (digit-adjacent quantity frame only)
# --------------------------------------------------------------------------- #

# "what percent(age) of" must keep the word (math_kernel matches the
# word frame), and "percentage points" is a different quantity.
_PERCENT_WORD_RE = re.compile(
    r"(?<=\d)\s+(?:percent(?:age)?|per\s+cent)(?!\s+points?\b)"
    r"(?![A-Za-z])",
    re.IGNORECASE)


def _canonicalize_percent_words(t: str) -> str:
    return _PERCENT_WORD_RE.sub(" %", t)


# --------------------------------------------------------------------------- #
# 8.  Interest abbreviations (UPPERCASE only, unit-frame guarded)
# --------------------------------------------------------------------------- #

_SI_RE = re.compile(
    r"(?<![A-Za-z])SI(?![A-Za-z])(?!\s*(?:units?|prefix)\b)")
_CI_RE = re.compile(r"(?<![A-Za-z])CI(?![A-Za-z])")


def _canonicalize_interest_abbreviations(t: str) -> str:
    t = _SI_RE.sub("simple interest", t)
    return _CI_RE.sub("compound interest", t)


# --------------------------------------------------------------------------- #
# 9.  Currency -> "Rs"
# --------------------------------------------------------------------------- #

_RUPEE_SIGN = "\u20b9"
_INR_RE = re.compile(r"(?<![A-Za-z])INR(?![A-Za-z])")
_RS_DOT_NUM_RE = re.compile(r"(?<![A-Za-z])Rs\.(?=\d)")
_RS_DOT_RE = re.compile(r"(?<![A-Za-z])Rs\.")


def _canonicalize_currency(t: str) -> str:
    t = t.replace(_RUPEE_SIGN, "Rs ")
    t = _INR_RE.sub("Rs", t)
    # mined PDFs degrade the rupee sign to a backtick/prime before the
    # amount: 'the rate of `\u20098' means 'Rs 8'
    t = re.sub(r"[`'`\u2018\u2019\u2032](?=\s*[\u2009\u200b\u00a0]?\d)",
               "Rs ", t)
    t = t.replace("\u2009", " ").replace("\u200b", "")
    t = _RS_DOT_NUM_RE.sub("Rs ", t)
    return _RS_DOT_RE.sub("Rs", t)


# --------------------------------------------------------------------------- #
# 10.  Rate periods -> "per annum" (the canonical form)
# --------------------------------------------------------------------------- #

_PA_RE = re.compile(r"(?<=[\d%])\s*p\.a\.?(?![A-Za-z])")


def _canonicalize_per_annum(t: str) -> str:
    return _PA_RE.sub(" per annum", t)


# --------------------------------------------------------------------------- #
# 11.  Speed unit spellings
# --------------------------------------------------------------------------- #

_KMPH_RE = re.compile(r"\bkmph\b", re.IGNORECASE)
_KM_PER_HR_RE = re.compile(r"\bkm\s*/\s*hr\b", re.IGNORECASE)
_KMPH_SPELLED_RE = re.compile(
    r"\bkilo(?:meters?|metres?)\s+per\s+hour\b", re.IGNORECASE)
# lowercase only: "MPS" may name an institution, "amps" must not move.
_MPS_RE = re.compile(r"(?<![A-Za-z])mps(?![A-Za-z])")


def _canonicalize_speed_units(t: str) -> str:
    t = _KMPH_RE.sub("km/h", t)
    t = _KMPH_SPELLED_RE.sub("km/h", t)
    t = _KM_PER_HR_RE.sub("km/h", t)
    return _MPS_RE.sub("m/s", t)


# --------------------------------------------------------------------------- #
# 12.  Whitespace / punctuation canonicalization (LAST)
# --------------------------------------------------------------------------- #

_UNICODE_MINUS = "\u2212"
_TRAILING_DOTS_RE = re.compile(r"\.+\Z")


def _canonicalize_whitespace(t: str) -> str:
    t = t.replace(_UNICODE_MINUS, "-")
    t = re.sub(r"\s+", " ", t).strip()
    return _TRAILING_DOTS_RE.sub("", t).rstrip()


# --------------------------------------------------------------------------- #
# Pipeline
# --------------------------------------------------------------------------- #

_RULE_PIPELINE = (
    _expand_number_words,
    _expand_power_phrases,
    _expand_indian_numbers,
    _expand_lakh_crore,
    _expand_dozen,
    _expand_fraction_words,
    _canonicalize_percent_words,
    _canonicalize_interest_abbreviations,
    _canonicalize_currency,
    _canonicalize_per_annum,
    _canonicalize_speed_units,
    _canonicalize_whitespace,
)


def normalize_input(text: str) -> str:
    """Canonical working form of a question -- one shared Stage 0 pass.

    Idempotent, value-preserving, English-reading; never raises (any
    input the rules cannot understand comes back unchanged).  Reuses
    math_kernel.normalize_unicode_math for the unicode math layer.
    """
    if not isinstance(text, str):
        return text
    try:
        t = normalize_unicode_math(text)
        # '(Rule: holes = (8^steps - 1)/7)'-style hints carry literals
        # that are NOT givens — strip them before any binding layer
        # '(take pi = 22/7)' is load-bearing — keep the assignment,
        # drop the wrapper so 'pi = 22/7' can bind
        t = re.sub(r"\((?:take|use|assume)\s+(pi\s*=\s*[\d./]+)\s*\)",
                   r" \1 ", t)
        t = re.sub(r"\((?:use|rule|hint|formula|take|given|using|"
                   r"where|assume)[^)]*\)", " ", t)
        # '4, 9, 14, ... up to 51' — an ellipsis is sequence padding,
        # not sentence punctuation; it would split 'sum the first 12
        # terms' from its object and break ask-clause detection
        t = re.sub(r"\.{2,}|…", " ", t)
        for rule in _RULE_PIPELINE:
            t = rule(t)
        if "\x08" in t:          # transport-corruption self-check
            return text
        return t
    except Exception:
        return text
