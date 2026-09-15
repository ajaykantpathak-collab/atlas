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
        for rule in _RULE_PIPELINE:
            t = rule(t)
        if "\x08" in t:          # transport-corruption self-check
            return text
        return t
    except Exception:
        return text
