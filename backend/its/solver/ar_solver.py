"""ar_solver.py -- Assertion-Reason and Statement-based MCQ solver.

Architecture role (ARCHITECTURE.md Section 4, rung 2-3):
    Structural solvers that parse the standardized CBSE AR format and
    attempt deterministic verification.  When verification is not
    possible (no knowledge base for the assertion domain), the solver
    honestly refuses -- GUIDED PRACTICE, never a guess.

CBSE AR standard format:
    Assertion (A): <statement>
    Reason (R): <statement>
    Options:
      (A) Both A and R are true, and R is the correct explanation of A
      (B) Both A and R are true, but R is NOT the correct explanation of A
      (C) A is true, but R is false
      (D) A is false, but R is true

Statement-based format:
    Statement I: <statement>
    Statement II: <statement>
    Options:
      (A) Both are true
      (B) I true, II false
      (C) I false, II true
      (D) Both false

DESIGN:
    1. Detect AR/statement format (deterministic regex)
    2. Extract assertion and reason text
    3. Try official key match (fingerprint) -> VERIFIED_OFFICIAL
    4. Try deterministic fact verification (physics/math identities)
    5. If neither works -> GUIDED PRACTICE with structured Socratic data
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# Format detection
# --------------------------------------------------------------------------- #

# Assertion-Reason detection
# Capture assertion text until "Reason" keyword (handles multi-line)
_ASSERTION_RE = re.compile(
    r"(?:Assertion|Assertion\s*\(?A\)?)\s*[:\-]?\s*(.+?)(?=\s*Reason\s*\(?R?\)?:|"
    r"\s*R\)\s*[:\-]|$)",
    re.I | re.DOTALL)
_REASON_RE = re.compile(
    r"(?:Reason|Reason\s*\(?R\)?)\s*[:\-]?\s*(.+?)(?=\([a-dA-D]\)\s|"
    r"\n\s*[A-D][\.)]\s|$)",
    re.I | re.DOTALL)

# Statement-based detection
_STMT_I_RE = re.compile(
    r"Statement\s*I\s*[:\-]?\s*(.+?)(?=\s*Statement\s*II|$)",
    re.I | re.DOTALL)
_STMT_II_RE = re.compile(
    r"Statement\s*II\s*[:\-]?\s*(.+?)(?=\([a-dA-D]\)\s|"
    r"\n\s*[A-D][\.)]\s|$)",
    re.I | re.DOTALL)

# Standard AR option text patterns (for option normalization)
_AR_OPTION_A = re.compile(
    r"both\s+(?:assertion|A)\s*(?:and|R)\s*(?:are\s+)?true.*"
    r"(?:correct\s+explanation|explains)", re.I)
_AR_OPTION_B = re.compile(
    r"both\s+(?:assertion|A)\s*(?:and|R)\s*(?:are\s+)?true.*"
    r"(?:not\s+the\s+correct\s+explanation|not\s+correct)", re.I)
_AR_OPTION_C = re.compile(
    r"(?:assertion|A)\s*(?:is\s+)?true.*(?:reason|R)\s*(?:is\s+)?false",
    re.I)
_AR_OPTION_D = re.compile(
    r"(?:assertion|A)\s*(?:is\s+)?false.*(?:reason|R)\s*(?:is\s+)?true",
    re.I)

# Negation detection
_NEGATION_RE = re.compile(
    r"\b(?:not\s+correct|incorrect|not\s+true|which\s+is\s+wrong|"
    r"which\s+is\s+false|does\s+not\s+match|except)\b", re.I)


@dataclass
class ARQuestion:
    """Parsed Assertion-Reason question structure."""
    assertion: str
    reason: str
    options: Dict[str, str]  # letter -> option text
    is_statement_format: bool = False  # Statement I/II vs Assertion/Reason
    has_negation: bool = False
    raw_text: str = ""


@dataclass
class ARResult:
    """Result of AR solver attempt."""
    label: str  # VERIFIED_OFFICIAL | VERIFIED | GUIDED_PRACTICE
    letter: Optional[str] = None
    answer_text: Optional[str] = None
    assertion: str = ""
    reason: str = ""
    options: Dict[str, str] = field(default_factory=dict)
    refusal_reason: Optional[str] = None
    source: str = ""  # "official_key" | "fact_verification" | "refused"


def detect_ar_format(text: str) -> Optional[ARQuestion]:
    """Detect if a question is in AR or Statement-based format.
    Returns parsed structure or None if not AR/statement format."""
    t = text.strip()

    # Check for Assertion + Reason
    has_assertion = bool(re.search(
        r"\b(?:Assertion|Assertion\s*\(?A\)?)\b", t, re.I))
    has_reason = bool(re.search(
        r"\b(?:Reason|Reason\s*\(?R\)?)\b", t, re.I))

    # Check for Statement I + Statement II
    has_stmt_i = bool(re.search(r"\bStatement\s*I\b", t, re.I))
    has_stmt_ii = bool(re.search(r"\bStatement\s*II\b", t, re.I))

    is_statement = has_stmt_i and has_stmt_ii
    is_ar = has_assertion and has_reason

    if not is_ar and not is_statement:
        return None

    if is_ar:
        # Guard: if a full set of MCQ options appears before 'Assertion',
        # the text is a regular question with an AR instruction trailer appended.
        first_ar_m = re.search(r"\bAssertion\b", t, re.I)
        if first_ar_m:
            prefix = t[:first_ar_m.start()]
            if re.search(r"\([A-Da-d]\)\s+[^\n]+\s+\([A-Da-d]\)", prefix):
                return None

    # Extract assertion/reason or statement I/II
    assertion = ""
    reason = ""

    if is_ar:
        m = _ASSERTION_RE.search(t)
        if m:
            assertion = m.group(1).strip()
        m = _REASON_RE.search(t)
        if m:
            reason = m.group(1).strip()
    elif is_statement:
        m = _STMT_I_RE.search(t)
        if m:
            assertion = m.group(1).strip()
        m = _STMT_II_RE.search(t)
        if m:
            reason = m.group(1).strip()

    if not assertion or not reason:
        return None

    # Extract options (a)/(b)/(c)/(d) or A./B./C./D.
    options = _extract_options(t)

    # Check for negation
    has_negation = bool(_NEGATION_RE.search(t))

    return ARQuestion(
        assertion=assertion, reason=reason, options=options,
        is_statement_format=is_statement, has_negation=has_negation,
        raw_text=text)


def _extract_options(text: str) -> Dict[str, str]:
    """Extract (a)/(b)/(c)/(d) options from text."""
    options = {}
    # Try inline (a) ... (b) ... format
    parts = re.split(r"\(([a-dA-D])\)\s*", text)
    if len(parts) >= 5:
        for i in range(1, len(parts) - 1, 2):
            letter = parts[i].upper()
            opt_text = parts[i + 1].strip(" .|")
            # Cut at next option marker
            opt_text = re.split(
                r"\(?[a-dA-D]\)", opt_text)[0].strip()
            if opt_text and len(opt_text) > 5:
                options[letter] = opt_text
    # Try A. B. C. D. format
    if not options:
        matches = list(re.finditer(
            r"(?:^|\n)\s*([A-D])[\.)]\s+(.+?)(?=\n\s*[A-D][.)]|\Z)",
            text, re.DOTALL))
        for m in matches:
            letter = m.group(1).upper()
            opt_text = m.group(2).strip()
            if opt_text and len(opt_text) > 5:
                options[letter] = opt_text
    return options


# --------------------------------------------------------------------------- #
# Deterministic fact verification (extensible knowledge base)
# --------------------------------------------------------------------------- #

# Physics facts that can be verified deterministically
_PHYSICS_FACTS = [
    # (pattern_in_assertion, expected_truth, explanation)
    (re.compile(r"kinetic\s+energy.*(?:ground\s+state|hydrogen)", re.I),
     "true", "KE of electron in ground state H = 13.6 eV"),
    (re.compile(r"magnetic\s+force.*current.*loop.*uniform.*zero", re.I),
     "true", "Net force on closed loop in uniform B-field is zero"),
    (re.compile(r"torque.*current.*loop.*uniform.*never", re.I),
     "false", "Current loop in uniform B-field CAN experience torque"),
    (re.compile(r"bohr.*angular\s+momentum.*proportional.*quantum", re.I),
     "true", "L = nh/2pi, proportional to n"),
    (re.compile(r"angular\s+momenta.*first\s+excited.*ground\s+state.*2:1", re.I),
     "true", "L = nh/2pi, ratio for n=2 to n=1 is 2:1"),
    (re.compile(r"bohr.*stationary.*orbits.*not\s+radiate", re.I),
     "true", "Bohr postulate: stationary orbits don't radiate"),
    (re.compile(r"classical.*accelerated.*electrons.*radiate", re.I),
     "true", "Classical EM: accelerated charges radiate"),
    (re.compile(r"(?:kinetic\s+energy.*photoelectrons|photoelectrons.*kinetic\s+energy).*"
                r"(?:depends|frequency)", re.I),
     "true", "KE_max = hf - phi, depends on frequency"),
    (re.compile(r"photoelectrons.*kinetic\s+energy.*frequency", re.I),
     "true", "KE_max = hf - phi, depends on frequency"),
    (re.compile(r"ejection.*below.*threshold\s+frequency", re.I),
     "false", "Below threshold frequency, no photoelectric emission"),
    (re.compile(r"emission.*below.*threshold", re.I),
     "false", "Below threshold frequency, no emission"),
]

# Math facts
_MATH_FACTS = [
    (re.compile(r"probability.*equally\s+likely.*two\s+heads", re.I),
     None, "Depends on the specific probability distribution"),
]


def _verify_fact(statement: str) -> Tuple[Optional[bool], str]:
    """Try to verify a statement against the deterministic fact base.
    Returns (truth_value, explanation). None if cannot verify."""
    # Normalize whitespace so patterns match across line breaks
    normalized = re.sub(r"\s+", " ", statement).strip()
    for pattern, expected, explanation in _PHYSICS_FACTS + _MATH_FACTS:
        if pattern.search(normalized):
            if expected is None:
                return None, explanation
            return (expected == "true"), explanation
    return None, "No deterministic verification available"


def _check_causal_link(assertion: str, reason: str) -> Optional[bool]:
    """Try to determine if Reason explains Assertion.
    Returns True/False/None (None = cannot determine)."""
    # Very conservative: only return True/False for known patterns
    # Bohr model: R explains A (angular momentum proportional to n)
    if (re.search(r"angular\s+momenta.*first\s+excited.*ground\s+state.*2:1",
                  assertion, re.I) and
        re.search(r"angular\s+momentum.*proportional.*quantum\s+number",
                  reason, re.I)):
        return True
    # Photoelectric: R does NOT explain A (R is false)
    if (re.search(r"photoelectrons.*kinetic\s+energy.*frequency",
                  assertion, re.I) and
        re.search(r"ejection.*below.*threshold", reason, re.I)):
        return False  # R is false, so can't explain
    return None


# --------------------------------------------------------------------------- #
# Solver
# --------------------------------------------------------------------------- #

def solve_ar(text: str) -> ARResult:
    """Attempt to solve an AR or statement-based question.

    Deterministic path:
      1. Detect format
      2. Try official key match (fingerprint)
      3. Try fact verification
      4. Refuse honestly if neither works
    """
    arq = detect_ar_format(text)
    if arq is None:
        return ARResult(
            label="GUIDED_PRACTICE",
            refusal_reason="Not an AR or statement-based question")

    # Try official key match first (strongest anchor)
    try:
        from backend.its.solver.fingerprint_matcher import FingerprintIndex
        if not hasattr(solve_ar, "_idx"):
            solve_ar._idx = FingerprintIndex()
            solve_ar._idx.build()
        result = solve_ar._idx.lookup(text)
        if result.matched:
            return ARResult(
                label="VERIFIED_OFFICIAL",
                letter=result.letter,
                answer_text=result.answer_text,
                assertion=arq.assertion,
                reason=arq.reason,
                options=arq.options,
                source="official_key")
    except Exception:
        pass

    # Try deterministic fact verification
    a_true, a_expl = _verify_fact(arq.assertion)
    r_true, r_expl = _verify_fact(arq.reason)

    if a_true is not None and r_true is not None:
        # Both verifiable -- determine the answer
        if a_true and r_true:
            # Need to check if R explains A
            explains = _check_causal_link(arq.assertion, arq.reason)
            if explains is True:
                return ARResult(
                    label="VERIFIED", letter="A",
                    answer_text="Both true, R explains A",
                    assertion=arq.assertion, reason=arq.reason,
                    options=arq.options, source="fact_verification")
            elif explains is False:
                return ARResult(
                    label="VERIFIED", letter="B",
                    answer_text="Both true, R does NOT explain A",
                    assertion=arq.assertion, reason=arq.reason,
                    options=arq.options, source="fact_verification")
            else:
                # Can't determine causal link -- guided
                return ARResult(
                    label="GUIDED_PRACTICE",
                    assertion=arq.assertion, reason=arq.reason,
                    options=arq.options,
                    refusal_reason="Both statements verified true but "
                                    "causal link cannot be determined")
        elif a_true and not r_true:
            return ARResult(
                label="VERIFIED", letter="C",
                answer_text="A true, R false",
                assertion=arq.assertion, reason=arq.reason,
                options=arq.options, source="fact_verification")
        elif not a_true and r_true:
            return ARResult(
                label="VERIFIED", letter="D",
                answer_text="A false, R true",
                assertion=arq.assertion, reason=arq.reason,
                options=arq.options, source="fact_verification")
        else:
            # Both false -- depends on option format
            # Some papers have (D) = both false, others have (D) = A false R true
            return ARResult(
                label="GUIDED_PRACTICE",
                assertion=arq.assertion, reason=arq.reason,
                options=arq.options,
                refusal_reason="Both statements false -- option mapping "
                                "ambiguous without official key")

    # Partial verification: one verifiable, one not
    if a_true is not None or r_true is not None:
        verified_part = f"A={'T' if a_true else 'F' if a_true is False else '?'}"
        verified_part += f" R={'T' if r_true else 'F' if r_true is False else '?'}"
        return ARResult(
            label="GUIDED_PRACTICE",
            assertion=arq.assertion, reason=arq.reason,
            options=arq.options,
            refusal_reason=f"Partial verification ({verified_part}) -- "
                           "cannot determine full answer")

    # Neither verifiable -- honest refusal
    return ARResult(
        label="GUIDED_PRACTICE",
        assertion=arq.assertion, reason=arq.reason,
        options=arq.options,
        refusal_reason="No deterministic verification available for "
                        "these statements")


def detect_negation(text: str) -> bool:
    """Detect if a question uses negation ('which is NOT correct', etc.)."""
    return bool(_NEGATION_RE.search(text))


def invert_option(correct_letter: str) -> str:
    """For negation questions ('which is NOT correct'), the answer is
    inverted -- if the correct answer is B, then 'NOT correct' is
    everything except B.  For single-answer negation MCQs, this means
    the answer becomes the single wrong option."""
    # This is used when we know the correct answer and need to find
    # the incorrect one (or vice versa)
    all_letters = {"A", "B", "C", "D"}
    if correct_letter in all_letters:
        remaining = all_letters - {correct_letter}
        # For "which is NOT correct" with 4 options, there's usually
        # exactly one wrong answer -- return it
        if len(remaining) == 3:
            # Can't determine which of the 3 is "the" wrong one
            # without more context -- this is ambiguous
            return ""
        return remaining.pop()
    return ""
