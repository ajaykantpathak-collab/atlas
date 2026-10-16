"""socratic_moves.py -- deterministic Socratic dialogue engine.

The moment a student answers WRONG is where teaching actually happens.
Until now the loop jumped straight from ✗ to remediation.  This module
turns the 23 authored misconception families into a dialogue script:

    1. ELICIT  — quote the student's own answer back and point at the
                 exact thing to re-examine (per-family authored prompt).
    2. ISOLATE — one or two authored mini-questions that isolate the
                 misconception on its own (with deterministic keys).
    3. RETRY   — send them back to the ORIGINAL question.
    4. HANDOFF — if the ladder is exhausted, hand to the remediation/
                 teach lane (the journey engine owns that).  Never
                 dead-ends.

Zero LLM dependency: every line is authored.  A free-form phrasing
model may decorate the surface elsewhere, but this script never needs
it -- the tutor cannot die with the model.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# Authored content: elicitation + isolating Q&A per misconception family.
# Accept lists are NORMALIZED forms (see _norm) -- authored generously so
# honest student phrasings grade correct; the key is first in each list.
# --------------------------------------------------------------------------- #

_E = {
    "sign_flip":
        "You answered {answer}. Check one thing: when a term moves across "
        "the equals sign, what happens to its sign?",
    "percent_base_error":
        "You answered {answer}. A percentage is always OF something — "
        "which amount did you take your percentage OF?",
    "unit_confusion":
        "You answered {answer}. Check your units — are they the same on "
        "both sides of your working?",
    "formula_selection":
        "You answered {answer}. Which quantity was actually asked for — "
        "and does your formula give THAT quantity?",
    "order_of_operations":
        "You answered {answer}. Re-check the order: brackets first, then "
        "× and ÷, then + and −. Which step did you do first?",
    "fraction_inversion":
        "You answered {answer}. When dividing by a fraction, WHICH "
        "fraction gets flipped — and what does the ÷ become?",
    "factorisation_incomplete":
        "You answered {answer}. Look at your factors — can any of them "
        "still be factored further?",
    "index_law_confusion":
        "You answered {answer}. When multiplying powers of the same base, "
        "do the indices ADD or MULTIPLY?",
    "trig_ratio_swap":
        "You answered {answer}. SOH CAH TOA — which sides pair with the "
        "ratio you used?",
    "geometry_theorem_misapply":
        "You answered {answer}. Which theorem did you use — and does the "
        "figure actually satisfy its conditions?",
    "direction_bias":
        "You answered {answer}. In a circuit, which direction do the "
        "electrons actually drift — and which way does conventional "
        "current point?",
    "energy_conservation_gap":
        "You answered {answer}. Energy cannot disappear — where did the "
        "missing energy go in your working?",
    "mole_concept_error":
        "You answered {answer}. A mole counts PARTICLES — did you use "
        "mass, volume, or count in that step?",
    "equilibrium_direction":
        "You answered {answer}. Le Chatelier: the system shifts to OPPOSE "
        "the change — which side felt your change?",
    "genetics_dominance":
        "You answered {answer}. Does a dominant allele being stronger "
        "mean it is automatically more COMMON? Think about the cross.",
    "evolution_ladder":
        "You answered {answer}. Is evolution a ladder with a 'top' — or a "
        "branching tree where every branch fits its own environment?",
    "cause_effect_swap":
        "You answered {answer}. Which event happened FIRST — and are you "
        "describing its cause or its consequence?",
    "map_scale_error":
        "You answered {answer}. A larger scale (1:10,000) shows MORE "
        "detail but LESS ground area — which one is your map?",
    "climate_weather_confusion":
        "You answered {answer}. Weather is what happens today; climate is "
        "the long-year average. Which one is your statement about?",
    "supply_demand_curve":
        "You answered {answer}. When price RISES: quantity demanded falls "
        "but quantity supplied rises. Which one were you drawing?",
    # LOOP-FIXER wave (2026-10-08): language grammar families, anchored
    # to the deterministic lanes in english_families / hindi_families
    # (LANG_ENG_TENSE / LANG_HI_SANDHI / LANG_HI_KARAK;
    # structure_families_lang.py dissolved 2026-10-10).
    "english_tense_shift":
        "You answered {answer}. Find the time marker in the sentence "
        "(yesterday, already, every day...) — which tense does THAT "
        "time ask for?",
    "hindi_sandhi_blend":
        "You answered {answer}. \u0938\u0902\u0927\u093f \u0905\u0915\u094d\u0937\u0930\u094b\u0902 \u0915\u0940 \u0928\u0939\u0940\u0902, \u0927\u094d\u0935\u0928\u093f\u092f\u094b\u0902 \u0915\u0940 \u092e\u093f\u0932\u0928 \u0939\u0948 \u2014 \u091c\u0902\u0915\u094d\u0936\u0928 \u092a\u0930 \u0938\u0941\u0928\u093e\u0908 \u0926\u0947\u0928\u0947 \u0935\u093e\u0932\u0940 \u0928\u0908 \u0927\u094d\u0935\u0928\u093f \u0915\u094d\u092f\u093e \u0939\u0948?",
    "hindi_karak_mislabel":
        "You answered {answer}. \u0915\u094d\u0930\u093f\u092f\u093e \u0938\u0947 \u0938\u0902\u092c\u0902\u0927 \u092c\u0924\u093e\u0928\u0947 \u0935\u093e\u0932\u093e \u092a\u0930\u0938\u0930\u094d\u0917 \u0939\u0940 \u0915\u093e\u0930\u0915 \u0924\u092f \u0915\u0930\u0924\u093e \u0939\u0948 \u2014 \u0935\u093e\u0915\u094d\u092f \u092e\u0947\u0902 \u0938\u0902\u092c\u0902\u0927\u093f\u092f\u093e \u0936\u092c\u094d\u0926 \u0915\u0947 \u0906\u0917\u0947 \u0915\u094c\u0928-\u0938\u093e \u092a\u0930\u0938\u0930\u094d\u0917 (\u0928\u0947/\u0915\u094b/\u0938\u0947/\u0915\u0940/\u092e\u0947\u0902) \u0932\u0917\u093e \u0939\u0948?",
}

_ISO = {
    "sign_flip": [
        ("Solve: x + 7 = 3", ["-4", "minus4", "x=-4"]),
        ("Simplify: 5 − (−3)", ["8"]),
    ],
    "percent_base_error": [
        ("A pen is bought for Rs 40 and sold for Rs 50. What is the "
         "profit percent?", ["25", "25%"]),
        ("Rs 800 is increased by 25%. What is the new amount (in Rs)?",
         ["1000", "rs1000", "rs.1000"]),
    ],
    "unit_confusion": [
        ("Convert 72 km/h into m/s.", ["20", "20m/s"]),
        ("How many centimetres are there in 2.5 metres?", ["250", "250cm"]),
    ],
    "formula_selection": [
        ("Which gives the AREA of a circle: 2πr or πr²? (answer "
         "'2pir' or 'pir2')", ["pir2", "πr2", "pir²"]),
        ("A car covers 150 km in 3 h. What is its speed in km/h?",
         ["50", "50km/h"]),
    ],
    "order_of_operations": [
        ("Evaluate: 2 + 3 × 4", ["14"]),
        ("Evaluate: (2 + 3) × 4", ["20"]),
    ],
    "fraction_inversion": [
        ("Evaluate: 1/2 ÷ 1/4", ["2"]),
        ("Evaluate: 3 ÷ 1/3", ["9"]),
    ],
    "factorisation_incomplete": [
        ("Factorise fully: x² − 9", ["(x+3)(x-3)", "(x-3)(x+3)"]),
        ("Factorise fully: 2x² + 4x", ["2x(x+2)"]),
    ],
    "index_law_confusion": [
        ("What is 2³ × 2⁴, as a number?", ["128"]),
        ("What is (5²)³, as a number?", ["15625"]),
    ],
    "trig_ratio_swap": [
        ("sin θ = opposite / ___ (one word)", ["hypotenuse"]),
        ("tan θ = opposite / ___ (one word)", ["adjacent"]),
    ],
    "geometry_theorem_misapply": [
        ("The angles of a triangle add up to ___ degrees.", ["180"]),
        ("A right triangle has legs 3 and 4. What is the hypotenuse?",
         ["5"]),
    ],
    "direction_bias": [
        ("Conventional current flows from the ___ terminal to the ___ "
         "terminal (answer like: positive to negative).",
         ["positive to negative", "positivetonegative"]),
        ("Electrons drift from the ___ terminal to the ___ terminal.",
         ["negative to positive", "negativetopositive"]),
    ],
    "energy_conservation_gap": [
        ("A 2 kg ball sits at 5 m height (g = 10 m/s²). What is its "
         "potential energy in joules?", ["100"]),
        ("It falls with no air resistance. Its kinetic energy just "
         "before landing is ___ J.", ["100"]),
    ],
    "mole_concept_error": [
        ("How many particles are in one mole of any substance? "
         "(answer like 6.022e23)", ["6.022e23", "6.022x10^23", "6.022*10^23",
                                    "avogadro"]),
        ("The molar mass of water (H₂O) is ___ g/mol.", ["18"]),
    ],
    "equilibrium_direction": [
        ("You ADD reactant to a system at equilibrium. It shifts to the "
         "___ side (right or left)?", ["right", "forward"]),
        ("Increasing pressure shifts equilibrium toward the side with "
         "___ moles of gas (more or fewer)?", ["fewer"]),
    ],
    "genetics_dominance": [
        ("Cross Tt × Tt: what FRACTION of offspring shows the recessive "
         "trait?", ["1/4", "0.25", "25", "25%"]),
        ("True or false: a dominant trait is always the most frequent in "
         "a population.", ["false"]),
    ],
    "evolution_ladder": [
        ("Evolution produces a branching ___ (tree or ladder)?", ["tree"]),
        ("True or false: bacteria are 'less evolved' than humans.",
         ["false"]),
    ],
    "cause_effect_swap": [
        ("'Rivers flood every year, so civilisations settled beside "
         "them.' Which is the CAUSE: rivers flooding, or civilisations "
         "settling?", ["rivers flooding", "riversflood",
                       "rivers flood"]),
        ("'Heavy rain fell, so the match was cancelled.' Which is the "
         "EFFECT?", ["match cancelled", "matchwascancelled",
                     "the match was cancelled", "cancelled"]),
    ],
    "map_scale_error": [
        ("Which map shows MORE detail: 1:10,000 or 1:1,000,000? "
         "(answer like 1:10,000)", ["1:10,000", "1:10000", "first"]),
        ("On a 1:100,000 map, 2 cm equals how many km on the ground?",
         ["2", "2km"]),
    ],
    "climate_weather_confusion": [
        ("'It rained in Mumbai yesterday' — weather or climate?",
         ["weather"]),
        ("'Chennai receives about 140 cm of rain in a year' — weather or "
         "climate?", ["climate"]),
    ],
    "supply_demand_curve": [
        ("As price RISES, quantity demanded rises or falls?", ["falls"]),
        ("As price RISES, quantity supplied rises or falls?", ["rises"]),
    ],
    # LOOP-FIXER wave (2026-10-08): language grammar isolations.
    "english_tense_shift": [
        ("Which helping verb does the present perfect need: have/has, "
         "or was/were?", ["have", "has"]),
        ("Change into the simple past: 'He writes a letter.'",
         ["he wrote a letter", "wrote"]),
    ],
    "hindi_sandhi_blend": [
        ("\u0938\u0902\u0927\u093f \u0927\u094d\u0935\u0928\u093f\u092f\u094b\u0902 \u0915\u0940 \u092e\u093f\u0932\u0928 \u0939\u0948 \u092f\u093e \u0905\u0915\u094d\u0937\u0930\u094b\u0902 \u0915\u0940? (\u0927\u094d\u0935\u0928\u093f/\u0905\u0915\u094d\u0937\u0930)",
         ["\u0927\u094d\u0935\u0928\u093f"]),
        ("'\u0939\u093f\u092e + \u0906\u0932\u092f' \u091c\u094b\u0921\u093c\u0928\u0947 \u092a\u0930 \u0915\u094d\u092f\u093e \u092c\u0928\u0924\u093e \u0939\u0948? (\u0938\u0939\u0940 \u0936\u092c\u094d\u0926)",
         ["\u0939\u093f\u092e\u093e\u0932\u092f"]),
    ],
    "hindi_karak_mislabel": [
        ("'\u0930\u093e\u092e \u0906\u092e \u0916\u093e\u0924\u093e \u0939\u0948' \u2014 '\u0930\u093e\u092e' \u0915\u093e \u0915\u093e\u0930\u0915-\u092d\u0947\u0926? (\u0915\u0930\u094d\u0924\u093e / \u0915\u0930\u094d\u092e / \u0915\u0930\u0923)",
         ["\u0915\u0930\u094d\u0924\u093e"]),
        ("'\u092e\u094b\u0939\u0928 \u0915\u094b \u092c\u0941\u0932\u093e\u0913' \u2014 '\u0915\u094b' \u0915\u094c\u0928-\u0938\u093e \u0915\u093e\u0930\u0915 \u091c\u094b\u0921\u093c\u0924\u093e \u0939\u0948? (\u0915\u0930\u094d\u0924\u093e / \u0915\u0930\u094d\u092e / \u0938\u0902\u092a\u094d\u0930\u0926\u093e\u0928)",
         ["\u0915\u0930\u094d\u092e"]),
    ],
}

# Generic fallbacks when the family is unknown to the catalog.
_GENERIC_ELICIT = (
    "You answered {answer}. Before we fix it: re-read the question and "
    "say in one line what it is actually asking for.")
_GENERIC_ISO = [
    ("What does the question ask you to find, in your own words?", None),
]

_RETRY_TEXT = ("Now try the original question again:\n{question}")
_HANDOFF_TEXT = (
    "That's okay — this one needs a proper re-teach. Let's walk the idea "
    "from the start instead of more guesses.")
_NUDGE_RIGHT = "Exactly — {praise} Now carry that back to the question."
_NUDGE_WRONG = "Not quite — {hint}"


# --------------------------------------------------------------------------- #
# normalization + grading
# --------------------------------------------------------------------------- #
def _norm(s: str) -> str:
    """Normalize a student response for deterministic comparison."""
    s = (s or "").strip().lower()
    s = s.replace("²", "2").replace("³", "3").replace("π", "pi")
    s = re.sub(r"[\s.,;:!?'\"()\-—]+", "", s)
    return s


def _grade(accept: List[str], given: str) -> bool:
    g = _norm(given)
    if not g:
        return False
    for a in accept:
        if _norm(a) == g:
            return True
    # numeric equivalence (2%) on the RAW strings — _norm strips decimal
    # points ("282.50" -> "28250"), which would corrupt the values
    def _num(x: str) -> Optional[float]:
        if not x:
            return None
        # "6.022 x 10^23" / "6.022*10²³" -> "6.022e23"
        sup = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")
        x = re.sub(r"[x*×]\s*10\s*\^?\s*([⁰¹²³⁴⁵⁶⁷⁸⁹\d]+)",
                   lambda m: "e" + m.group(1).translate(sup), x,
                   flags=re.I)
        x = re.sub(r"(\d)\s+e", r"\1e", x, flags=re.I)  # "6.022 e23"
        m = re.fullmatch(r"(-?\d+(?:\.\d+)?)\s*/\s*(-?\d+(?:\.\d+)?)",
                         x.strip())
        if m:  # explicit fraction form ("1/4" -> 0.25)
            try:
                d = float(m.group(2))
                return float(m.group(1)) / d if d else None
            except (ValueError, ZeroDivisionError):
                return None
        m = re.search(r"-?\d[\d,]*(?:\.\d+)?(?:e-?\d+)?", x)
        if not m:
            return None
        try:
            return float(m.group(0).replace(",", ""))
        except ValueError:
            return None
    gn = _num(given)
    an = _num(accept[0])
    if gn is not None and an is not None:
        return abs(gn - an) <= max(0.01, 0.02 * abs(an))
    # containment for word answers ("rivers flooding" in "rivers flood")
    g0 = _norm(accept[0])
    return bool(g0) and (g0 in g or g in g0) and len(g0) >= 4


# --------------------------------------------------------------------------- #
# sequence builder
# --------------------------------------------------------------------------- #
@dataclass
class SocraticSequence:
    """A full dialogue script for one wrong answer.  Moves carry NO keys
    in their text — the key map stays server-side."""

    misconception_id: str
    moves: List[Dict[str, Any]] = field(default_factory=list)
    keys: Dict[str, List[str]] = field(default_factory=dict)

    def payload(self) -> Dict[str, Any]:
        """Student-facing payload (no answer keys)."""
        return {"misconception_id": self.misconception_id,
                "moves": [{k: v for k, v in m.items() if k != "answer"}
                          for m in self.moves]}


def build_sequence(
    misconception_id: Optional[str],
    student_answer: str,
    question_text: str,
    correct_answer: str,
) -> SocraticSequence:
    """Assemble the Socratic script for one wrong answer.

    Fails soft: an unknown/None family still gets a generic but honest
    script — the tutor never dead-ends and never needs an LLM.
    """
    mid = (misconception_id or "").strip().lower()
    known = mid in _E or mid in _ISO
    elicit_tpl = _E.get(mid, _GENERIC_ELICIT)
    isolating = _ISO.get(mid)

    seq = SocraticSequence(misconception_id=mid if known else "general")
    seq.moves.append({
        "id": "elicit", "kind": "elicit",
        "text": elicit_tpl.format(
            answer=(student_answer or "…").strip()[:80]),
    })
    if isolating:
        for i, (q, accept) in enumerate(isolating, 1):
            mid_id = f"iso{i}"
            if accept is None:
                continue
            seq.moves.append({
                "id": mid_id, "kind": "isolate", "text": q,
                # skip the second isolating question when the first lands
                "skip_if": "iso1_ok" if i == 2 else None,
            })
            seq.keys[mid_id] = accept
    seq.moves.append({
        "id": "retry", "kind": "retry",
        "text": _RETRY_TEXT.format(
            question=(question_text or "").strip()[:400]),
    })
    seq.moves.append({
        "id": "handoff", "kind": "handoff",
        "text": _HANDOFF_TEXT,
    })
    return seq


def grade_move(
    sequence: SocraticSequence,
    move_id: str,
    student_response: str,
) -> Tuple[bool, str, Optional[str]]:
    """Grade one isolate move.  Returns (correct, feedback, next_move_id).

    Elicit moves are reflection — always 'correct' (no grading), the
    feedback nudges to the first isolating question.  Retry/handoff moves
    end the script (the caller hands back to its own grading / teach
    lane).  Unknown move ids fail closed to the handoff.
    """
    by_id = {m["id"]: m for m in sequence.moves}
    move = by_id.get(move_id)
    if move is None:
        return False, _HANDOFF_TEXT, "handoff"

    kind = move["kind"]
    if kind in ("elicit", "retry", "handoff"):
        nxt = _next_id(sequence, move_id)
        return True, "", nxt

    accept = sequence.keys.get(move_id) or []
    ok = _grade(accept, student_response)
    if ok:
        # find the first later move this one does not skip
        nxt = move_id
        if move_id == "iso1":
            nxt = "retry"          # iso2 carries skip_if=iso1_ok
        else:
            nxt = _next_id(sequence, move_id)
        return True, _NUDGE_RIGHT.format(praise="that's the idea."), nxt
    hint = ("look at the question once more — it is asking exactly what "
            "the last step checked.")
    nxt = _next_id(sequence, move_id)
    return False, _NUDGE_WRONG.format(hint=hint), nxt


def _next_id(sequence: SocraticSequence, move_id: str) -> Optional[str]:
    ids = [m["id"] for m in sequence.moves]
    try:
        i = ids.index(move_id)
    except ValueError:
        return "handoff"
    return ids[i + 1] if i + 1 < len(ids) else "handoff"


# --------------------------------------------------------------------------- #
# wrong-answer diagnosis (WS-TUTOR): parse the student's attempt against the
# expected answer -> a NAMED error pattern + a targeted follow-up question.
# Zero LLM: numeric closeness, sign, unit factors, token overlap.  Where the
# node has no authored misconception this is what the tutor says instead --
# callers mark it "derived".
# --------------------------------------------------------------------------- #

_NUM_RX = re.compile(r"-?\d[\d,]*(?:\.\d+)?")
_WORD_RX = re.compile(r"[a-zA-Z\u0900-\u097F]{3,}")


def _num(text) -> Optional[float]:
    m = _NUM_RX.search(str(text or ""))
    if not m:
        return None
    try:
        return float(m.group(0).replace(",", ""))
    except ValueError:
        return None


def _close(a: float, b: float, tol: float = 0.02) -> bool:
    return abs(a - b) <= tol * max(abs(a), abs(b), 1e-9)


# Unit-conversion factors worth naming aloud (checked before factor-two
# so "1200 vs 12" lands on the conversion slip, not a generic double).
_UNIT_FACTORS = (1000.0, 100.0, 60.0, 3.6)

# Error-pattern ids the engine reports in metadata["error_pattern"].
PATTERNS = (
    "empty",            # nothing written
    "sign_error",       # right magnitude, wrong sign
    "unit_factor",      # off by x1000/x100/x60/x3.6
    "power_of_ten",     # off by a factor of 10
    "factor_two",       # doubled/halved where it shouldn't be
    "arithmetic_slip",  # close number, small slip in the last steps
    "different_quantity",  # number so far off a different quantity was computed
    "no_number",        # expected a number, got words
    "wrong_option",     # mcq distractor picked
    "partial_close",    # text answer most of the way there
    "concept_mismatch", # text answer about the wrong idea
    "generic_wrong",    # wrong, no sharper signal available
)

# Follow-up prompts: each NAMES the pattern and hands the student one
# pointed re-check -- never a generic "try again".
_FOLLOW_UP = {
    "empty":
        "Before we solve it: in one line, what is the question asking "
        "you to find?",
    "sign_error":
        "Your magnitude is right -- only the sign flipped. Which side "
        "of zero should this answer land on, and why?",
    "unit_factor":
        "The digits look like a unit-conversion slip (a x100 / x3.6 / "
        "x60 type factor crept in). What are the units of the given "
        "values versus the answer?",
    "power_of_ten":
        "Off by a power of ten -- recount the decimal places: how many "
        "tens does each factor contribute?",
    "factor_two":
        "Off by a factor of two -- does a step need doubling or halving "
        "(an average, two symmetric parts, a 1/2 in the formula)?",
    "arithmetic_slip":
        "Very close -- the method is right but a small arithmetic slip "
        "landed in the last steps. Re-check each substitution slowly.",
    "different_quantity":
        "That value is far off -- check WHICH quantity the question "
        "asks for. Did you compute a different variable or an "
        "intermediate step instead?",
    "no_number":
        "The question wants a numeric value. What number does your "
        "working produce?",
    "wrong_option":
        "You picked '{answer}' -- what makes that choice different "
        "from the correct one? Re-check its claim line by line.",
    "partial_close":
        "Most of that is right -- part of your answer matches. Which "
        "piece is still missing?",
    "concept_mismatch":
        "Your answer is about a different idea -- re-read the question: "
        "which concept is it actually testing?",
    "generic_wrong":
        "Not quite -- re-read the question and say which quantity or "
        "idea it wants, then re-check your last step.",
}

# Attempt quality 0..1 -- feeds the adaptive hint ladder: a high-quality
# attempt should get a check-your-arithmetic nudge, not a full scaffold.
_PATTERN_QUALITY = {
    "empty": 0.0,
    "sign_error": 0.75,
    "unit_factor": 0.60,
    "power_of_ten": 0.55,
    "factor_two": 0.55,
    "arithmetic_slip": 0.70,
    "different_quantity": 0.15,
    "no_number": 0.20,
    "wrong_option": 0.30,
    "partial_close": 0.65,
    "concept_mismatch": 0.25,
    "generic_wrong": 0.20,
}

# derived pattern -> authored family (so the follow-up can use the
# catalog's authored elicit phrasing when it exists).
_PATTERN_FAMILY = {
    "sign_error": "sign_flip",
    "unit_factor": "unit_confusion",
    "wrong_option": "formula_selection",
}


def diagnose_wrong_answer(
    student_answer: str,
    question: Optional[dict] = None,
    eval_result: Any = None,
) -> Dict[str, Any]:
    """Classify one wrong attempt into a named error pattern.

    Returns::

        {"pattern":  one of PATTERNS,
         "family":   authored-catalog family id or None,
         "follow_up": student-facing question naming the pattern,
         "quality":  0..1 attempt quality (for the adaptive hint ladder),
         "detail":   short internal description of what was detected}

    ``question`` is the bloom-marker question dict (answer/answer_type/
    options); ``eval_result`` is an optional EvaluationResult whose
    partial_credit refines the quality score.
    """
    question = question or {}
    expected = str(question.get("answer") or "").strip()
    answer_type = str(question.get("answer_type") or "text").strip().lower()
    got = str(student_answer or "").strip()
    partial = getattr(eval_result, "partial_credit", None)

    def _out(pattern: str, detail: str, quality: Optional[float] = None):
        q = _PATTERN_QUALITY[pattern] if quality is None else quality
        if partial:
            # the grader's own closeness score refines the heuristic —
            # only when nonzero: a sign flip scores partial=0 yet IS a
            # high-quality attempt (right magnitude), so a zero partial
            # must never drag a pattern's quality down
            q = max(0.0, min(1.0, 0.6 * q + 0.4 * float(partial)))
        return {
            "pattern": pattern,
            "family": _PATTERN_FAMILY.get(pattern),
            "follow_up": _FOLLOW_UP[pattern].format(answer=got[:80] or "…"),
            "quality": round(q, 3),
            "detail": detail,
        }

    if not got:
        return _out("empty", "no answer written")

    e, g = _num(expected), _num(got)

    if answer_type == "mcq":
        if not (e is not None and g is not None):
            return _out(
                "wrong_option",
                f"chose a distractor: '{got[:60]}' vs expected "
                f"'{expected[:60]}'")
        # numeric-styled options fall through to the numeric checks
        # (a near-value pick like 1945 vs 1944 IS an arithmetic slip)

    if e is not None:
        if g is None:
            return _out("no_number",
                        "expected a number, the answer has none")
        if e != 0:
            if _close(g, -e):
                return _out("sign_error",
                            f"|{g}| == |{e}|: magnitude right, sign flipped")
            for f in _UNIT_FACTORS:
                if _close(g, e * f) or _close(g, e / f):
                    return _out("unit_factor",
                                f"{g} vs {e}: off by a factor of {f:g}")
            if _close(g, e * 10) or _close(g, e / 10):
                return _out("power_of_ten",
                            f"{g} vs {e}: off by a factor of 10")
            if _close(g, e * 2) or _close(g, e / 2):
                return _out("factor_two",
                            f"{g} vs {e}: off by a factor of 2")
            rel = abs(g - e) / max(abs(e), 1e-9)
            if rel <= 0.15:
                return _out("arithmetic_slip",
                            f"{g} vs {e}: within {rel:.1%}, small slip",
                            quality=max(0.55, 1.0 - rel))
            if rel <= 0.5:
                return _out("arithmetic_slip",
                            f"{g} vs {e}: off by {rel:.0%}",
                            quality=max(0.3, 1.0 - rel))
            return _out("different_quantity",
                        f"{g} vs {e}: too far for a slip, likely a "
                        f"different quantity")
        # expected == 0: sign/factor checks are meaningless
        rel = abs(g - e)
        if rel <= 0.1:
            return _out("arithmetic_slip", f"{g} vs {e}: near-zero drift")
        return _out("different_quantity", f"{g} vs {e}: far off")

    # ------- text answers: token overlap with the expected answer ------ #
    e_words = {w.lower() for w in _WORD_RX.findall(expected)}
    g_words = {w.lower() for w in _WORD_RX.findall(got)}
    overlap = (len(e_words & g_words) / len(e_words)) if e_words else 0.0
    if overlap >= 0.5:
        return _out("partial_close",
                    f"{overlap:.0%} of expected key terms present",
                    quality=min(0.85, 0.4 + overlap / 2))
    if overlap >= 0.2:
        return _out("concept_mismatch",
                    f"only {overlap:.0%} of expected key terms present")
    if g_words:
        return _out("different_quantity",
                    "answer shares almost nothing with the expected "
                    "idea -- probably answering a different question")
    return _out("generic_wrong", "no sharper signal available")


# --------------------------------------------------------------------------- #
# authored-misconception -> catalog family matching (WS-TUTOR).  The node
# files carry common_misconception as free text; keyword-scoring it back to
# one of the 23 authored families lets the engine speak the catalog's elicit
# move instead of a derived one.
# --------------------------------------------------------------------------- #

_FAMILY_KEYWORDS: Dict[str, Tuple[str, ...]] = {
    "sign_flip": ("sign", "negative", "minus sign", "opposite sign"),
    "percent_base_error": ("percent", "percentage", "base value",
                           "of the original"),
    "unit_confusion": ("unit", "conversion", "convert", "km/h", "m/s"),
    "formula_selection": ("formula", "equation", "misappl", "wrong formula"),
    "order_of_operations": ("order of operations", "bodmas", "pemdas",
                            "precedence", "brackets first"),
    "fraction_inversion": ("fraction", "reciprocal", "invert",
                           "dividing by a fraction"),
    "factorisation_incomplete": ("factorise", "factorize", "factors",
                                 "factor completely"),
    "index_law_confusion": ("indices", "exponent", "powers", "index law"),
    "trig_ratio_swap": ("trig", "sine", "cosine", "tangent", "soh cah toa",
                        "trigonometric"),
    "geometry_theorem_misapply": ("theorem", "pythagor", "angle sum",
                                  "cyclic", "tangent to"),
    "direction_bias": ("conventional current", "electron", "drift",
                       "current direction"),
    "energy_conservation_gap": ("energy", "conservation", "dissipat",
                                "lost as heat"),
    "mole_concept_error": ("mole", "avogadro", "molar", "particles"),
    "equilibrium_direction": ("equilibrium", "le chatelier",
                              "shifts", "reversible"),
    "genetics_dominance": ("dominant", "recessive", "allele", "trait",
                           "genotype"),
    "evolution_ladder": ("evolution", "natural selection", "ladder",
                       "more evolved"),
    "cause_effect_swap": ("cause", "effect", "consequence",
                          "correlation"),
    "map_scale_error": ("scale", "map", "representative fraction"),
    "climate_weather_confusion": ("climate", "weather"),
    "supply_demand_curve": ("supply", "demand", "price", "curve"),
    "english_tense_shift": ("tense", "verb", "past", "present perfect"),
    "hindi_sandhi_blend": ("sandhi", "संधि"),
    "hindi_karak_mislabel": ("karak", "कारक", "vibhakti", "विभक्ति"),
}


def match_misconception_family(text: str) -> Optional[str]:
    """Map a free-text authored misconception to a catalog family id.

    Deterministic keyword scoring; returns None when nothing scores --
    the caller then falls back to the attempt-derived pattern.
    """
    s = str(text or "").lower()
    if not s:
        return None
    best_id, best_score = None, 0
    for fid, kws in _FAMILY_KEYWORDS.items():
        score = sum(1 for k in kws if k in s)
        if score > best_score:
            best_id, best_score = fid, score
    return best_id if best_score >= 2 else None


def elicit_move(family_id: Optional[str], student_answer: str) -> str:
    """The catalog's authored elicit line for a family (or '' when the
    family isn't authored).  Same text build_sequence would emit."""
    tpl = _E.get(str(family_id or "").strip().lower())
    if not tpl:
        return ""
    return tpl.format(answer=(student_answer or "…").strip()[:80])
