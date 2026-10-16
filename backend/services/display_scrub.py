"""display_scrub.py — keep machine-language out of student-visible text.

Two layers, applied at every serving boundary:

1. NODE-ID SCRUB (original): ids travel in payloads as opaque fetch keys
   by design, but must never be RENDERED.  A parenthesised/bracketed id
   reference is removed entirely (the sentence already names the concept
   in words); a bare id is replaced by the referenced node's display
   title (quoted), or removed when no title exists.

2. TEXT NORMALIZER (render-fix wave, 2026-10-04): the corpus and the
   solver pipelines leak mechanical artifacts into student strings —
   raw LaTeX ("$XY = 7\\,\\text{cm}$"), markdown markers
   ("**reflection symmetry**"), unrounded compute floats
   ("11.232899999999999"), NaN/None rendered verbatim, pipeline
   internals ("Needs variable binding (Lane C) or is not
   computational") and third-person authoring voice ("A student who
   says X is failing to recognize...").  ``normalize_student_text``
   rewrites all of these in place.  Every rewrite is mechanical —
   honest content is never invented, only reformatted for a student.

Application is conservative: non-string inputs pass through untouched
and obvious join artifacts are tidied, so served prose stays
grammatical.

3. RESPONSE BOUNDARY (sweep wave, 2026-10-04): ``install_display_boundary``
   wraps the FastAPI app in a pure-ASGI middleware that runs the
   normalizer over EVERY student /api/* response body at the outermost
   serving boundary — JSON payloads are walked with
   ``clean_student_payload`` (display strings scrubbed; ids under
   fetch-key fields survive byte-exact per the 2026-09-29 owner law),
   text/plain bodies run through ``student_clean``.  Fail-open: any
   internal error serves the original bytes untouched.
"""

from __future__ import annotations

import json
import re
from typing import Any, Callable, Dict, Generator, Iterable, List, Optional, Tuple, Union

# --------------------------------------------------------------------------- #
# Layer 1 — node-id scrub
# --------------------------------------------------------------------------- #

_ID_TOKEN = re.compile(
    r"\bc\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{2}_\d{3}\b")
# legacy/short id forms (`c9_bio_ch1_2`) lack the `_\d{2}_\d{3}` tail
_ID_TOKEN_LOOSE = re.compile(r"\bc\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)+\b")
_PAREN_ID = re.compile(
    r"[\(（\[【]\s*" + _ID_TOKEN.pattern + r"\s*[\)）\]】]")

_TIDY = [
    (re.compile(r"\s{2,}"), " "),
    (re.compile(r"\s+([,.;:!?])"), r"\1"),
    (re.compile(r"\(\s*\)"), ""),
    (re.compile(r"\[\s*\]"), ""),
]


def make_title_resolver(index) -> Callable[[str], Optional[str]]:
    """Resolver over an already-loaded enhanced-nodes index (no extra I/O)."""

    def resolve(node_id: str) -> Optional[str]:
        try:
            node = (index.get(node_id) if hasattr(index, "get")
                    else index.nodes.get(node_id))
        except Exception:
            node = None
        if not node:
            return None
        title = node.get("title") or ""
        return title.strip() or None

    return resolve


# --------------------------------------------------------------------------- #
# Layer 2a — pipeline-phrase replacements (machine-language -> student voice)
# --------------------------------------------------------------------------- #

#: (compiled regex, replacement) — longest/most specific first so the
#: confirmed full sentences are recast whole before generic rules can
#: leave fragments behind.
_PHRASE_REWRITES: List[Tuple[re.Pattern, str]] = [
    # the confirmed Class-9 leak (council finding #6), whole-sentence recast
    (re.compile(r"needs variable binding \(lane c\) or is not "
                r"computational", re.I),
     "This question needs a different approach — let me help you work "
     "through it"),
    # figure short-circuit refusal (Lane C mention + machine voice)
    (re.compile(r"question references a figure[^.]*?(?:--|—)[^.]*", re.I),
     "This question refers to a figure, so here is the method to work "
     "through it step by step"),
    (re.compile(r"question references a figure[^.]*", re.I),
     "This question refers to a figure, so here is the method to work "
     "through it step by step"),
    # fallback-model coverage refusal
    (re.compile(r"the fallback model ignores stated [^.]*", re.I),
     "Some values for this question are missing, so here is the method "
     "instead of a guess"),
    # any leftover lane tag or variable-binding speak
    (re.compile(r"\(\s*Lane\s?[abc][^)]*\)", re.I), ""),
    (re.compile(r"\(?\blane\s?[abc]\)?[,;:]?", re.I), ""),
    (re.compile(r"\bvariable[- ]binding\b", re.I), "giving each value a role"),
    # background/saturation voice -> first-person student voice
    (re.compile(r"the solver exceeded its \d+s compute budget on this "
                r"question and was moved to background practice; the answer "
                r"stays withheld — here is the method instead", re.I),
     "our solver needed more time on this one — it is still working in the "
     "background; here is the method to start with"),
    (re.compile(r"the solver is at capacity right now; please retry in a "
                r"moment — here is the method to work through meanwhile",
                re.I),
     "our solver is busy right now — please try again in a moment; here is "
     "the method to work through meanwhile"),
]

# --------------------------------------------------------------------------- #
# Layer 2b — LaTeX -> Unicode
# --------------------------------------------------------------------------- #

_LATEX_SYMBOLS: Dict[str, str] = {
    # geometry / relations
    "triangle": "△", "angle": "∠", "cong": "≅", "equiv": "≡",
    "parallel": "∥", "perp": "⊥", "therefore": "∴", "because": "∵",
    "neq": "≠", "ne": "≠", "leq": "≤", "le": "≤", "geq": "≥", "ge": "≥",
    "approx": "≈", "sim": "∼", "simeq": "≃", "propto": "∝",
    "leftrightarrow": "↔", "rightarrow": "→", "to": "→",
    "leftarrow": "←", "Rightarrow": "⇒", "Leftarrow": "⇐",
    "Leftrightarrow": "⇔", "mapsto": "↦",
    # sets
    "in": "∈", "notin": "∉", "subset": "⊂", "subseteq": "⊆",
    "cup": "∪", "cap": "∩", "emptyset": "∅", "varnothing": "∅",
    "forall": "∀", "exists": "∃", "union": "∪", "intersection": "∩",
    # arithmetic
    "times": "×", "div": "÷", "pm": "±", "mp": "∓", "cdot": "·",
    "ast": "∗", "star": "⋆", "circ": "∘", "bullet": "•",
    "ldots": "…", "dots": "…", "cdots": "⋯", "deg": "°", "degree": "°",
    "infty": "∞", "partial": "∂", "nabla": "∇", "sum": "∑", "prod": "∏",
    "int": "∫", "sqrt": "√",
    # greek
    "alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ", "epsilon": "ε",
    "varepsilon": "ε", "zeta": "ζ", "eta": "η", "theta": "θ", "iota": "ι",
    "kappa": "κ", "lambda": "λ", "mu": "μ", "nu": "ν", "xi": "ξ",
    "pi": "π", "rho": "ρ", "sigma": "σ", "tau": "τ", "upsilon": "υ",
    "phi": "φ", "varphi": "φ", "chi": "χ", "psi": "ψ", "omega": "ω",
    "Gamma": "Γ", "Delta": "Δ", "Theta": "Θ", "Lambda": "Λ", "Xi": "Ξ",
    "Pi": "Π", "Sigma": "Σ", "Phi": "Φ", "Psi": "Ψ", "Omega": "Ω",
    # escaped literals
    "%": "%", "&": "&", "_": "_", "#": "#", "$": "$", "{": "{", "}": "}",
}

_LATEX_SYM_RX = re.compile(
    r"\\([a-zA-Z]+)(?![a-zA-Z])")
_LATEX_TEXT_RX = re.compile(
    r"\\(?:text|textrm|mathrm|mathit|mathbf|mathsf|mathtt|textbf|textit|"
    r"operatorname)\s*\{([^{}]*)\}")
_LATEX_FRAC_RX = re.compile(r"\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}")
_LATEX_SQRT_RX = re.compile(r"\\sqrt\s*(?:\[[^\]]*\])?\s*\{([^{}]*)\}")
_LATEX_DELIMS = [
    re.compile(r"\\\((.*?)\\\)", re.S),      # \( ... \)
    re.compile(r"\\\[(.*?)\\\]", re.S),      # \[ ... \]
    re.compile(r"\$\$(.*?)\$\$", re.S),      # $$ ... $$
]
# LONE delimiters (2026-10-05): paired-span stripping leaves remnants when
# authored titles truncate mid-span ("...area of a circle \\(") — the bare
# "\\("/"\\)"/"\\["/"\\]" then render as literal backslash-parens in student
# strings.  Strip any survivor after the paired pass.
_LATEX_LONE_DELIM_RX = re.compile(r"\\[()\[\]]")
_LATEX_SPACING = re.compile(r"\\[,;:! ]")
_LATEX_LEFT_RIGHT = re.compile(r"\\(?:left|right)\b")
_LATEX_LINEBREAK = re.compile(r"\\\\(?:\s*\[[^\]]*\])?")
_DOLLAR_RX = re.compile(r"\$")
_SUPERSCRIPTS = {"0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
                 "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
                 "+": "⁺", "-": "⁻", "n": "ⁿ", "i": "ⁱ"}
_SUBSCRIPTS = {"0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
               "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
               "+": "₊", "-": "₋", "n": "ₙ", "i": "ᵢ"}
_SUPER_RX = re.compile(r"\^\{([^{}]*)\}|\^(\S)")
_SUB_RX = re.compile(r"_\{([^{}]*)\}|_(?=[A-Za-z0-9])(\S)")
def _latex_to_unicode(text: str) -> str:
    """Convert the simple LaTeX the corpus actually contains to plain text.

    Delimiters are stripped ($...$, \\(...\\), \\[...\\]), \\text{} and
    friends unwrap, \\frac{a}{b} -> a/b, \\sqrt{x} -> √(x), symbol
    commands map to Unicode, spacing commands become spaces.  Unknown
    commands are dropped (the backslash-command token, not the prose
    around it), so no LaTeX ever survives as literal "\\word".
    """
    if "\\" not in text and "$" not in text:
        return text
    prev = None
    for _ in range(4):  # fixpoint; nested constructs unwrap one level/pass
        if prev == text:
            break
        prev = text
        for rx in _LATEX_DELIMS:
            text = rx.sub(r"\1", text)
        text = _LATEX_TEXT_RX.sub(r"\1", text)
        text = _LATEX_FRAC_RX.sub(lambda m: f"{m.group(1)}/{m.group(2)}", text)
        text = _LATEX_SQRT_RX.sub(lambda m: f"√({m.group(1)})", text)
        text = _SUPER_RX.sub(_script, text)
        text = _SUB_RX.sub(lambda m: _script(m, sub=True), text)
        text = _LATEX_LINEBREAK.sub(", ", text)
        text = _LATEX_LEFT_RIGHT.sub("", text)
        text = _LATEX_SPACING.sub(" ", text)
        text = _LATEX_SYM_RX.sub(_sym, text)
        text = _LATEX_LONE_DELIM_RX.sub("", text)
        text = text.replace("~", " ")
        text = _DOLLAR_RX.sub("", text)
    return text


def _script(match: re.Match, sub: bool = False) -> str:
    """^{...}/^x -> superscript chars when mappable, else the bare content."""
    body = match.group(1) if match.group(1) is not None else match.group(2)
    table = _SUBSCRIPTS if sub else _SUPERSCRIPTS
    if body is not None and body and all(ch in table for ch in body):
        return "".join(table[ch] for ch in body)
    return body or ""


def _sym(match: re.Match) -> str:
    name = match.group(1)
    return _LATEX_SYMBOLS.get(name, _LATEX_SYMBOLS.get(name.lower(), ""))


# --------------------------------------------------------------------------- #
# Layer 2c — markdown artifact strip
# --------------------------------------------------------------------------- #

_MD_HEADING = re.compile(r"(?m)^[ \t]{0,3}#{1,6}[ \t]+")
_MD_BOLD = re.compile(r"\*\*(.+?)\*\*|__(.+?)__", re.S)
# Italic requires unpadded content (*word*, not "3 * 4 * 5"): the inner
# text must start AND end with a non-space, and a letter must sit inside,
# so multiplication/exponent asterisks survive the strip.
_MD_ITALIC = re.compile(
    r"(?<![\w*])\*([^\s*][^*\n]*[^\s*]|[^\s*])\*(?![\w*])"
    r"|(?<![\w_])_([^_\n]+?)_(?![\w_])")
_MD_CODE = re.compile(r"`([^`\n]+)`")
_MD_LINK = re.compile(r"\[([^\]\n]+)\]\([^)\n]*\)")
_MD_BULLET = re.compile(r"(?m)^[ \t]{0,4}[-*][ \t]+")


def _strip_markdown(text: str) -> str:
    """Literal **bold**/*italic*/## headings/`code` -> the words only.

    Multiplication asterisks ("3 * 4") never match: the italic rule
    requires the asterisk not to sit against a word character.
    """
    text = _MD_HEADING.sub("", text)
    text = _MD_BOLD.sub(lambda m: m.group(1) or m.group(2) or "", text)
    text = _MD_ITALIC.sub(lambda m: m.group(1) or m.group(2) or "", text)
    text = _MD_CODE.sub(r"\1", text)
    text = _MD_LINK.sub(r"\1", text)
    text = _MD_BULLET.sub("", text)
    return text


# --------------------------------------------------------------------------- #
# Layer 2d — float rounding + NaN/None
# --------------------------------------------------------------------------- #

_FLOAT_JUNK = re.compile(r"(?<![\w.])(-?\d+)\.(\d{3,})(?![\w.])")
# >=3 decimal digits on a percent = unrounded compute junk -> snap to
# integer (owner law: 'Mastery: 11.232899999999999%' -> '11%').  A clean
# decimal percent like '10.5%' is a REAL answer (markup-discount gain)
# and must not be flattened to '10%' — that shipped wrong-verify text.
_PERCENT_FLOAT = re.compile(r"(?<![\w.])(-?\d+)\.(\d{3,})(?=\s*%)")
_NAN_TOKENS = re.compile(
    r"\bNaN\b"
    r"|\bnull\b"
    r"|\bundefined\b(?!\s+terms?\b)(?!\s+slope\b)"
    r"|\bNone\b(?!\s+(?:of|the|above|these|those|other)\b)")
_JUNK_SIG = ("999999", "000000")


def _fmt_percent_float(match: re.Match) -> str:
    """Compute-junk percent -> integer (owner law: 'Mastery:
    11.232899999999999%' -> 'Mastery: 11%').  Only fires on >=3 decimal
    digits; if the fraction collapses to a clean 1-2 decimal value after
    trailing-zero strip ('10.500%' -> '10.5%'), keep it."""
    try:
        frac = match.group(2).rstrip("0") or "0"
        whole, sign = match.group(1), "-" if match.group(1).startswith("-") else ""
        whole = whole.lstrip("-")
        if len(frac) <= 2:
            return f"{sign}{whole}.{frac}"
        return str(int(round(float(
            match.group(0).rstrip("%").strip()))))
    except (TypeError, ValueError):
        return match.group(0)


def _fmt_float(match: re.Match) -> str:
    """Compute junk -> student number.

    ``7.0000`` -> ``7`` (near-integer); ``11.232899999999999`` ->
    ``11.2329`` (float-repr junk snaps to 4 decimals); a genuine
    ``3.141592653589793`` keeps 4 decimals; 3-6 decimal human numbers
    pass through untouched.
    """
    try:
        val = float(match.group(0))
    except (TypeError, ValueError):
        return match.group(0)
    frac = match.group(2)
    if abs(val - round(val)) < 1e-9:
        return str(int(round(val)))
    if len(frac) >= 10 or any(sig in frac for sig in _JUNK_SIG):
        return f"{val:.4f}".rstrip("0").rstrip(".") or "0"
    return match.group(0)


def _fmt_nan(_match: re.Match) -> str:
    # NaN / None / null / undefined leaks render as an em-dash placeholder.
    return "—"


# --------------------------------------------------------------------------- #
# Layer 2e — third-person authoring voice -> second person
# --------------------------------------------------------------------------- #

# "A student who ..." authoring-voice templates.  SINGULAR ONLY: the
# corpus uses bare plural "students who ..." overwhelmingly for data/
# probability examples ("find the number of students who scored above
# 90"), which must never be rewritten.  Templates fire only on the
# misconception-voice constructions (is/are + -ing, gets, adverb +
# habit verb, loses-marks style), leaving every other sentence
# grammatical.
_VOICE_SUBJECT = r"\b([Aa])\s+student\s+who\s+"
_VOICE_RECAST_ING = re.compile(          # ...who X is/are <verb-ing>
    _VOICE_SUBJECT + r"(.{1,140}?)\s+(?:is|are)\s+([a-z]+ing)\b")
_VOICE_RECAST_GET = re.compile(          # ...who X gets <...>
    _VOICE_SUBJECT + r"(.{1,140}?)\s+gets\b")
_VOICE_RECAST_ADV = re.compile(          # ...who X often <verb3sg>
    _VOICE_SUBJECT + r"(.{1,140}?)\s+"
    r"(often|always|usually|never|sometimes|rarely|frequently|typically|"
    r"generally)\s+([a-zA-Z]+s)\b")
_VOICE_RECAST_MARKS = re.compile(        # ...who X loses (marks)?
    _VOICE_SUBJECT + r"(.{1,140}?)\s+"
    r"(loses|gains|earns|drops)(\s+marks)?\b")
_VOICE_FAILING_TO = re.compile(
    r"\bare failing to (?:recognize|recognise|realize|realise|see|notice|"
    r"understand|recall)\b")
_VOICE_STUDENT_WHO = re.compile(r"\b([Aa])\s+student\s+who\b")
# "the student(s) who ..." is data-example language ("list the students
# who play cricket") — never rewritten; only the generic authoring
# "the student should note..." converts.
_VOICE_THE_STUDENT = re.compile(r"\b(the) (students?)\b(?!\s+who\b)", re.I)

# "You is/You says" is never correct English — patch the agreement the
# singular recast can leave behind.
_YOU_AGREEMENT: Dict[str, str] = {
    "is": "are", "says": "say", "does": "do", "has": "have",
    "was": "were", "thinks": "think", "believes": "believe",
    "assumes": "assume", "forgets": "forget", "confuses": "confuse",
    "fails": "fail", "tends": "tend", "treats": "treat", "mixes": "mix",
    "misses": "miss", "adds": "add", "subtracts": "subtract",
    "multiplies": "multiply", "divides": "divide", "ignores": "ignore",
    "overlooks": "overlook", "notices": "notice", "realizes": "realize",
    "realises": "realise", "remembers": "remember", "applies": "apply",
    "uses": "use", "tries": "try", "needs": "need", "gets": "get",
    "makes": "make", "knows": "know", "sees": "see", "reads": "read",
    "writes": "write", "answers": "answer", "chooses": "choose",
    "picks": "pick", "swaps": "swap", "drops": "drop", "stops": "stop",
    "keeps": "keep", "skips": "skip", "repeats": "repeat",
    "copies": "copy", "changes": "change", "rounds": "round",
    "cancels": "cancel", "solves": "solve", "counts": "count",
    "checks": "check", "compares": "compare", "equates": "equate",
    "reduces": "reduce", "expands": "expand", "calculates": "calculate",
    "computes": "compute", "converts": "convert", "measures": "measure",
    "misreads": "misread", "mislabels": "mislabel", "doubles": "double",
    "halves": "halve", "simplifies": "simplify", "carries": "carry",
    "labels": "label", "plots": "plot", "draws": "draw", "gives": "give",
    "takes": "take", "leaves": "leave", "puts": "put", "goes": "go",
    "isn't": "aren't", "doesn't": "don't",
    "hasn't": "haven't", "wasn't": "weren't",
}
_YOU_AGREEMENT_RX = re.compile(
    r"\b([Yy])ou\s+(" + "|".join(sorted(_YOU_AGREEMENT, key=len,
                                        reverse=True)) + r")\b")


def _fix_voice(text: str) -> str:
    def _cap(match: re.Match, replacement: str) -> str:
        return (replacement[:1].upper() + replacement[1:]
                if match.group(0)[:1].isupper() else replacement)

    def _recast_ing(match: re.Match) -> str:
        # "A student who says X is failing to recognize Y"
        #   -> "If you say X, you are failing to recognize Y"
        return _cap(match, f"If you {match.group(2)}, you are "
                           f"{match.group(3)}")

    def _recast_get(match: re.Match) -> str:
        # "A student who forgets the rule gets ..." (gets = main verb of
        # the NEXT clause) -> "If you forget the rule, you get ..."
        return _cap(match, f"If you {match.group(2)}, you get")

    def _recast_adv(match: re.Match) -> str:
        # "A student who often forgets the sign" -> "If you often forget
        # the sign" — the third-person -s drops off the final verb.
        return _cap(match, f"If you {match.group(2)}, you "
                           f"{match.group(3)} {_base_verb(match.group(4))}")

    def _recast_marks(match: re.Match) -> str:
        # "A student who swaps the signs loses marks" ->
        #   "If you swap the signs, you lose marks"
        marks = match.group(4) or ""
        return _cap(match, f"If you {match.group(2)}, you "
                           f"{_base_verb(match.group(3))}{marks}")

    text = _VOICE_RECAST_ING.sub(_recast_ing, text)
    text = _VOICE_RECAST_GET.sub(_recast_get, text)
    text = _VOICE_RECAST_ADV.sub(_recast_adv, text)
    text = _VOICE_RECAST_MARKS.sub(_recast_marks, text)
    text = _VOICE_FAILING_TO.sub("are missing", text)
    # NOTE: there is deliberately NO blanket "A student who -> You" rule.
    # Templates above recast the misconception-voice constructions; a
    # blanket rule mangled grammatical sentences ("A student who answers
    # 0 should recheck" -> "You answer 0 should recheck") and the corpus
    # uses "students who ..." for data/probability examples that must
    # stay intact.
    text = _VOICE_THE_STUDENT.sub(
        lambda m: ("You" if m.group(1)[:1].isupper() else "you"), text)
    text = _YOU_AGREEMENT_RX.sub(_agree, text)
    return text


def _base_verb(verb: str) -> str:
    """Third-person-singular -> base form ("forgets"->"forget",
    "loses"->"lose", "carries"->"carry", "goes"->"go")."""
    if verb.endswith("ies") and len(verb) > 4:
        return verb[:-3] + "y"
    if verb.endswith(("oes", "ches", "shes", "xes", "zes", "sses")):
        return verb[:-2]
    if verb.endswith("s") and not verb.endswith("ss"):
        return verb[:-1]
    return verb


def _agree(match: re.Match) -> str:
    keep_cap = match.group(1).isupper()
    word = _YOU_AGREEMENT.get(match.group(2).lower(), match.group(2))
    pronoun = "You" if keep_cap else "you"
    return f"{pronoun} {word}"


# --------------------------------------------------------------------------- #
# Layer 2 assembly
# --------------------------------------------------------------------------- #

_PHRASE_TIDY = [
    (re.compile(r"\s+--\s+"), " — "),
    (re.compile(r"\s+([,.;:!?])"), r"\1"),
    (re.compile(r"\(\s*\)"), ""),
    (re.compile(r"\[\s*\]"), ""),
    (re.compile(r"[ \t]{2,}"), " "),
    (re.compile(r"^[,.;:]\s*"), ""),          # orphan punctuation lead-in
    (re.compile(r"\s+([,.;:!?])"), r"\1"),
    (re.compile(r"\s+\."), "."),              # lone period after a strip
    (re.compile(r"\.{2,}"), "."),
    (re.compile(r"\s+([,.;:!?])"), r"\1"),
]


def normalize_student_text(text: Any) -> Any:
    """One student-facing string -> clean student-facing string.

    Order matters: whole-sentence pipeline-phrase recasts run FIRST
    (before generic token rules can fragment them), then LaTeX ->
    Unicode, markdown strip, float/NaN repair, voice, and a final tidy.
    Node-id tokens are masked for the duration so LaTeX subscript /
    markdown-italic rules can never chew on ``c6_math_ch03_040`` when
    the scrub runs without a title resolver.  Non-strings pass through
    untouched.
    """
    if not isinstance(text, str) or not text:
        return text
    for rx, repl in _PHRASE_REWRITES:
        text = rx.sub(repl, text)
    # thread-safe masking: the id rides inside the placeholder (hex), so
    # concurrent requests never share state
    masked = _ID_TOKEN.sub(_mask, text)
    masked = _ID_TOKEN_LOOSE.sub(_mask, masked)
    masked = _latex_to_unicode(masked)
    masked = _strip_markdown(masked)
    masked = _PERCENT_FLOAT.sub(_fmt_percent_float, masked)
    masked = _FLOAT_JUNK.sub(_fmt_float, masked)
    masked = _NAN_TOKENS.sub(_fmt_nan, masked)
    masked = _fix_voice(masked)
    for rx, repl in _PHRASE_TIDY:
        masked = rx.sub(repl, masked)
    return _unmask(masked).strip()


def _mask(match: re.Match) -> str:
    return "\x00" + match.group(0).encode("utf-8").hex() + "\x00"


def _unmask(text: str) -> str:
    if "\x00" not in text:
        return text

    def _restore(match: re.Match) -> str:
        try:
            return bytes.fromhex(match.group(1)).decode("utf-8")
        except (ValueError, UnicodeDecodeError):
            return match.group(0)

    return re.sub(r"\x00([0-9a-f]+)\x00", _restore, text)


def scrub_display(text, resolver: Callable[[str], Optional[str]]):
    """Scrub one student-visible value (or structure) for rendering.

    Node ids first (existing contract, unchanged), then the full text
    normalizer.  Lists and dicts are walked recursively so structured
    fields (options, on_failure maps) get the same treatment.
    """
    if isinstance(text, list):
        return [scrub_display(item, resolver) for item in text]
    if isinstance(text, dict):
        return {key: scrub_display(item, resolver)
                for key, item in text.items()}
    if not isinstance(text, str) or not text:
        return text

    def _drop_paren(match: re.Match) -> str:
        return ""

    def _replace_bare(match: re.Match) -> str:
        title = resolver(match.group(0))
        return f'“{title}”' if title else ""

    text = _PAREN_ID.sub(_drop_paren, text)
    text = _ID_TOKEN.sub(_replace_bare, text)
    # LOOSE PASS: short/legacy id forms; resolver swaps known ids for
    # titles and drops unknown tokens
    text = _ID_TOKEN_LOOSE.sub(_replace_bare, text)
    for pattern, repl in _TIDY:
        text = pattern.sub(repl, text)
    return normalize_student_text(text).strip()


# --------------------------------------------------------------------------- #
# Layer 3 — student_clean + response-boundary payload walker (sweep wave)
# --------------------------------------------------------------------------- #

def student_clean(text: Any) -> Any:
    """One student-visible string -> fully clean student string.

    The public single-call entry point for the sweep wave: node ids are
    scrubbed WITHOUT a title resolver (parenthesised references drop,
    bare/legacy ids drop — callers that can resolve titles should prefer
    :func:`scrub_display`), then the full normalizer runs (pipeline
    phrases, LaTeX -> Unicode, markdown strip, float/NaN repair, voice).
    Non-strings pass through untouched.
    """
    if not isinstance(text, str) or not text:
        return text
    text = _PAREN_ID.sub("", text)
    text = _ID_TOKEN.sub("", text)
    text = _ID_TOKEN_LOOSE.sub("", text)
    for pattern, repl in _TIDY:
        text = pattern.sub(repl, text)
    return normalize_student_text(text).strip()


#: Payload keys whose string values are OPAQUE FETCH KEYS or byte-exact
#: transports — the 2026-09-29 owner law says ids DO travel in payloads
#: (e.g. ``"node_id": "c6_math_ch03_040"`` is a fetch key the client
#: resolves through /learn/<id>), so the boundary walker must never
#: rewrite these values.  Compared lower-cased with _/- stripped.
_FETCH_KEY_FIELDS_RAW = """
    id _id node_id nodeid next_node next_node_id nextnodeid unlocks
    unlocks_next unlock_id unlocked_by concept_id concept concept_node
    source target source_id target_id from to parent parent_id prereq
    prereq_id prereq_ids prereq_ids prerequisites prerequisite
    depth_prereq_ids forward_node_ids forward_nodes forward related
    related_ids related_nodes siblings upstream downstream
    children child_ids anchor_id ref ref_id reference_id exam_id
    session_id user_id student_id attempt_id question_id answer_id
    teacher_id class_id school_id uuid guid topic_id lesson_id
    url uri href link src image image_url imageurl thumbnail avatar
    avatar_url icon icon_url doodle doodle_url file filepath path audio
    audio_url video video_url token access_token refresh_token id_token
    api_key email phone slug locale timezone color hex sha hash checksum
    code code_content starter_code solution_code source_code snippet
    template_code story_url storyurl story_link storylink
"""
_FETCH_KEY_FIELDS = frozenset(
    w.replace("-", "").replace("_", "")
    for w in _FETCH_KEY_FIELDS_RAW.split() if w)


def _is_fetch_key(key: Any) -> bool:
    if not isinstance(key, str):
        return False
    return key.lower().replace("-", "").replace("_", "") in _FETCH_KEY_FIELDS


#: A value that is EXACTLY one id (or a comma-separated id list) is an
#: opaque fetch transport whatever its field is called ("next_chapter":
#: "c6_math_ch04_001" feeds a /learn/<id> fetch) — owner law 2026-09-29.
_PURE_ID = re.compile(
    r"c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{2}_\d{3}"
    r"|c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)+")


def _looks_like_id_list(value: str) -> bool:
    if not value or len(value) > 400:
        return False
    parts = [p.strip() for p in value.split(",")]
    return all(_PURE_ID.fullmatch(p) for p in parts)


def _clean_number(value: Any) -> Any:
    """Repair float-repr junk in NUMERIC payload fields.

    ``11.232899999999999`` -> ``11.2329``; ``0.30000000000000004`` ->
    ``0.3``; ``7.0`` -> ``7``.  Human-precision numbers pass through;
    ints, bools and non-finite floats are never touched.
    """
    if isinstance(value, bool) or not isinstance(value, float):
        return value
    if value != value or value in (float("inf"), float("-inf")):
        return value
    text = repr(value)
    if text.endswith(".0"):
        return int(value)
    if "e" in text or "E" in text:
        return value
    frac = text.split(".", 1)[1]
    if len(frac) >= 10 or any(sig in frac for sig in _JUNK_SIG):
        rounded = round(value, 4)
        return int(rounded) if rounded == int(rounded) else rounded
    return value


def clean_student_payload(obj: Any, key: Any = None) -> Any:
    """Walk a JSON-shaped payload and scrub every DISPLAY string.

    - values under fetch-key/transports keys (:data:`_FETCH_KEY_FIELDS`)
      survive byte-exact (owner law: ids are legitimate fetch keys);
    - values that are EXACTLY an id / comma-separated id list survive
      too (unknown field names still act as fetch transports);
    - every other string runs through :func:`student_clean`;
    - float-repr junk in numeric fields is repaired by
      :func:`_clean_number`;
    - dicts/lists recurse; the key context follows into lists so
      ``"unlocks": ["c6_math_ch03_040"]`` stays intact.
    """
    if isinstance(obj, dict):
        # wave98 leak fix: the fetch-key exemption protects SCALAR id
        # transports only — a dict/list under a fetch-key name
        # ("concept": {title, definition, eli5}) is display structure,
        # not an id transport, and must be walked.  teach_loop.concept.*
        # leaked node ids / "the student" / raw LaTeX past the boundary
        # for exactly this reason (29 visible-string hits).
        return {k: (v if (_is_fetch_key(k)
                          and not isinstance(v, (dict, list)))
                    else clean_student_payload(v, k))
                for k, v in obj.items()}
    if isinstance(obj, list):
        return [clean_student_payload(item, key) for item in obj]
    if isinstance(obj, str):
        if key is not None and _is_fetch_key(key):
            return obj
        if _looks_like_id_list(obj):
            return obj
        return student_clean(obj)
    if isinstance(obj, float):
        return _clean_number(obj)
    return obj


def iter_display_strings(obj: Any, key: Any = None) -> Generator[str, None, None]:
    """Yield every DISPLAY string of a payload (fetch-key values skipped).

    Audit-side twin of :func:`clean_student_payload`: what this yields is
    exactly what the boundary scrubs.
    """
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from iter_display_strings(v, k)
    elif isinstance(obj, list):
        for item in obj:
            yield from iter_display_strings(item, key)
    elif isinstance(obj, str):
        if (key is None or not _is_fetch_key(key)) and not _looks_like_id_list(obj):
            yield obj


# --------------------------------------------------------------------------- #
# Layer 3b — ASGI response boundary (single choke point for every endpoint)
# --------------------------------------------------------------------------- #

#: Non-student /api surfaces the boundary must never rewrite: probes,
#: auth (JWTs/base64url tokens can contain id-LIKE fragments — a text
#: rewrite there is a correctness hazard, not a style one), payments
#: (monetary values must survive byte-exact), teacher/intelligence
#: internal tooling.
_BOUNDARY_EXCLUDES = (
    "/api/health", "/api/ready", "/api/metrics", "/api/auth",
    "/api/payments", "/api/teacher", "/api/intelligence",
)

#: Pathological bodies are passed through unscrubbed (fail-open).
_MAX_BODY_BYTES = 12_000_000

_STATS: Dict[str, int] = {"responses_scrubbed": 0, "responses_passed": 0,
                          "scrub_errors": 0}


def display_boundary_stats() -> Dict[str, int]:
    """Lifetime counters for the boundary (observability, no log noise)."""
    return dict(_STATS)


def _boundary_applies(path: str) -> bool:
    if not path.startswith("/api/"):
        return False
    return not any(path.startswith(ex) for ex in _BOUNDARY_EXCLUDES)


def _header_value(headers: Iterable[Tuple[bytes, bytes]],
                  name: bytes) -> str:
    for k, v in headers:
        if k.lower() == name:
            try:
                return v.decode("latin-1")
            except Exception:  # noqa: BLE001
                return ""
    return ""


def _with_header(headers: List[Tuple[bytes, bytes]], name: bytes,
                 value: str) -> List[Tuple[bytes, bytes]]:
    lowered = name.lower()
    out = [(k, v) for k, v in headers if k.lower() != lowered]
    out.append((name, value.encode("latin-1")))
    return out


def _scrub_body(content_type: str, body: bytes) -> Optional[bytes]:
    """One response body -> scrubbed body (None = leave unchanged)."""
    if "application/json" in content_type:
        parsed = json.loads(body.decode("utf-8"))
        cleaned = clean_student_payload(parsed)
        raw = json.dumps(cleaned, ensure_ascii=False).encode("utf-8")
        return raw if raw != body else None
    if content_type.startswith("text/plain"):
        text = body.decode("utf-8")
        cleaned = student_clean(text)
        raw = cleaned.encode("utf-8")
        return raw if raw != body else None
    return None


class DisplayBoundaryMiddleware:
    """Pure-ASGI: scrub machine-language out of every student response.

    JSON and text/plain bodies on student /api/* paths (status < 500 —
    error ``detail`` strings are student-visible too) are parsed, walked
    through :func:`clean_student_payload` and re-serialized with a fixed
    content-length.  Everything else — streaming, compressed, binary,
    excluded paths, oversized bodies — passes through untouched, and any
    internal error fails OPEN (original bytes are served).
    """

    def __init__(self, app: Any):
        self.app = app

    async def __call__(self, scope: Dict[str, Any], receive: Any,
                       send: Any) -> None:
        if (scope.get("type") != "http"
                or not _boundary_applies(scope.get("path", ""))):
            await self.app(scope, receive, send)
            return

        chunks: List[bytes] = []
        state: Dict[str, Any] = {"status": 0, "headers": []}

        async def _send(message: Dict[str, Any]) -> None:
            mtype = message.get("type")
            if mtype == "http.response.start":
                state["status"] = message.get("status", 500)
                state["headers"] = list(message.get("headers") or [])
                return  # held: body may still change content-length
            if mtype != "http.response.body":
                await send(message)
                return
            if message.get("body"):
                chunks.append(message["body"])
            if message.get("more_body"):
                return
            body = b"".join(chunks)
            chunks.clear()
            await self._flush(send, state, body)

        await self.app(scope, receive, _send)

    async def _flush(self, send: Any, state: Dict[str, Any],
                     body: bytes) -> None:
        headers = state["headers"]
        status = state["status"]
        try:
            ctype = _header_value(headers, b"content-type")
            if (body and status < 500 and len(body) <= _MAX_BODY_BYTES
                    and not _header_value(headers, b"content-encoding")):
                new_body = _scrub_body(ctype, body)
                if new_body is not None:
                    _STATS["responses_scrubbed"] += 1
                    body = new_body
                    headers = _with_header(headers, b"content-length",
                                           str(len(body)))
                else:
                    _STATS["responses_passed"] += 1
            else:
                _STATS["responses_passed"] += 1
        except Exception:  # noqa: BLE001 -- fail-open, always
            _STATS["scrub_errors"] += 1
        await send({"type": "http.response.start", "status": status,
                    "headers": headers})
        await send({"type": "http.response.body", "body": body})


def install_display_boundary(app: Any) -> None:
    """Register the boundary as the OUTERMOST middleware (call after the
    CORS/limiter installs).  Responses still flow outward through CORS,
    so the 429 CORS-header contract in main.py is preserved."""
    app.add_middleware(DisplayBoundaryMiddleware)


__all__ = [
    "make_title_resolver",
    "scrub_display",
    "normalize_student_text",
    "student_clean",
    "clean_student_payload",
    "iter_display_strings",
    "install_display_boundary",
    "display_boundary_stats",
]
