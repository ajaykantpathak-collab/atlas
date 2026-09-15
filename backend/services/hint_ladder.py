r"""Hint Ladder — progressive scaffolding instead of answer dumps.

THE PROBLEM: Wrong answer → full solution teaches nothing. Students
copy the answer, move on, learn nothing, fail the exam.

THE FIX: A 4-rung ladder. Each rung gives a little more help and
costs a little more XP. Students who can self-correct from a nudge
keep their XP and actually learn.

RUNGS:
  1. NUDGE      (free)     "Check your units — the answer is in m/s."
  2. FORMULA    (-5 XP)    "Use v = u + at. Which values do you have?"
  3. WORKED     (-10 XP)   First step worked: "v = 0 + 9.8*2 = 19.6 ..."
  4. SOLUTION   (-20 XP)   Full step-by-step solution.

The ladder is MISCONCEPTION-AWARE: if the student's wrong answer
matches a known error pattern (e.g. used d instead of 2d for the
focal length sign convention), the nudge targets THAT error:
"You wrote f = -10 — check the sign convention for a diverging lens."

WIRED TO INTELLIGENCE: every hint request is an InteractionOutcome
(hint_request) that feeds the self-evolving loop. Students who always
need rung 4 get flagged for remediation. Concepts where most students
need rung 4 get flagged as content gaps.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Optional

from backend.contracts import SolutionResult, SolutionStep


# ═══════════════════════════════════════════════════════════════════
# Hint Ladder Model
# ═══════════════════════════════════════════════════════════════════

@dataclass
class HintRung:
    """One rung of the hint ladder."""
    rung: int                     # 1-4
    name: str                     # nudge|formula|worked|solution
    cost_xp: int                  # XP deducted (0, 5, 10, 20)
    text: str = ""                # the hint content
    targets_misconception: str = ""  # misconception key if targeted
    reveal_fraction: float = 0.0  # how much of the solution is shown (0-1)


@dataclass
class HintLadder:
    """The full ladder for one problem, built from its solution."""
    problem_type_id: str = ""
    rungs: list[HintRung] = field(default_factory=list)

    def get_rung(self, rung: int) -> Optional[HintRung]:
        for r in self.rungs:
            if r.rung == rung:
                return r
        return self.rungs[-1] if self.rungs else None

    def next_rung(self, current: int) -> Optional[HintRung]:
        for r in self.rungs:
            if r.rung == current + 1:
                return r
        return None


# ═══════════════════════════════════════════════════════════════════
# Misconception Detection (wrong-answer analysis)
# ═══════════════════════════════════════════════════════════════════

# Common error patterns → targeted nudges.
# Key: regex on the student's answer (or answer shape).
# Value: misconception key + targeted nudge text.

MISCONCEPTION_PATTERNS = [
    # Sign errors
    (r"^-\s*[\d.]+$", "sign_error",
     "Your answer is negative — check whether the quantity CAN be negative "
     "in this context (distance? speed? area?). Reread what the question asks for."),

    # Unit magnitude errors (off by 10x, 100x)
    (r"^\d+0{2,}(?:\.\d+)?$", "magnitude_error",
     "Your answer looks like it might be off by a factor of 10 or 100 — "
     "check your unit conversions (cm→m is ÷100, not ÷10)."),

    # Missing units
    (r"^[\d.]+$", "missing_units",
     "You have the right idea, but the answer needs units. "
     "What is the quantity measured in? (m/s? mol? ₹?)"),
]

_KNOWN_MISCONCEPTIONS = {p[1]: p[2] for p in MISCONCEPTION_PATTERNS}


def _to_number(text: str) -> Optional[float]:
    """Parse a number from an answer string, handling SymPy fractions.

    Handles: "37.5", "75/2", "-10", "3*pi" (→ fails, returns None),
    "75/2 " etc. Evaluates a/b as division.
    """
    if not text:
        return None
    s = str(text).strip()
    # Simple fraction a/b
    m = re.fullmatch(r"(-?[\d.]+)\s*/\s*(-?[\d.]+)", s)
    if m:
        try:
            num, den = float(m.group(1)), float(m.group(2))
            return num / den if den else None
        except (ValueError, ZeroDivisionError):
            return None
    # Plain number (possibly with junk like % or units around it)
    m = re.search(r"(-?\d+(?:\.\d+)?)", s)
    if m:
        try:
            return float(m.group(1))
        except ValueError:
            return None
    return None


def detect_misconception(
    student_answer: str,
    correct_answer: str,
) -> tuple[str, str]:
    """Analyze a wrong answer for known error patterns.

    Returns (misconception_key, targeted_nudge) or ("", "").
    """
    if not student_answer:
        return "", ""

    ans = student_answer.strip()

    # Numeric comparison (handles SymPy fractions like 75/2)
    student_num = _to_number(ans)
    correct_num = _to_number(correct_answer)
    if student_num is not None and correct_num:
        ratio = abs(student_num / correct_num)

        # Off-by-10 / off-by-100 detection
        if 9.5 <= ratio <= 10.5 or 95 <= ratio <= 105:
            return "magnitude_error", _KNOWN_MISCONCEPTIONS["magnitude_error"]
        # Inverted answer (reciprocal error)
        if 0.09 <= ratio <= 0.11:
            return "reciprocal_error", (
                "Your answer looks like the reciprocal of the right one — "
                "did you divide where you should have multiplied? "
                "Check the formula arrangement."
            )
        # Sign flip
        if abs(ratio + 1) < 0.05:
            return "sign_error", _KNOWN_MISCONCEPTIONS["sign_error"]

    # Pattern-based checks
    for pattern, key, nudge in MISCONCEPTION_PATTERNS:
        if re.match(pattern, ans):
            return key, nudge

    return "", ""


# ═══════════════════════════════════════════════════════════════════
# Ladder Builder — from a SolutionResult
# ═══════════════════════════════════════════════════════════════════

def build_ladder(result: SolutionResult) -> HintLadder:
    """Build the 4-rung hint ladder from a solved problem.

    Rung 1 (nudge):   conceptual direction, misconception-aware if known
    Rung 2 (formula): the formula/strategy that applies
    Rung 3 (worked):  the FIRST step fully worked
    Rung 4 (solve):   the complete solution
    """
    ladder = HintLadder(problem_type_id=result.problem_type_id)

    steps = result.steps

    # ── Rung 1: Nudge ────────────────────────────────────────────
    nudge_text = "Reread the question. What is it asking you to find? " \
                 "Identify what's given and what's wanted before computing."
    if result.verification_method:
        nudge_text += f" Hint: think about the method — {result.strategy_used or 'the standard approach'}."
    ladder.rungs.append(HintRung(
        rung=1, name="nudge", cost_xp=0, text=nudge_text,
    ))

    # ── Rung 2: Formula / strategy ───────────────────────────────
    formula_text = ""
    if steps:
        first = steps[0]
        if first.formula:
            formula_text = f"Use: {first.formula}"
        elif first.description:
            formula_text = f"Strategy: {first.description}"
        else:
            formula_text = "Write down the formula that connects the given values to the target."
    else:
        formula_text = "Write down the formula that connects the given values to the target."
    ladder.rungs.append(HintRung(
        rung=2, name="formula", cost_xp=5, text=formula_text,
    ))

    # ── Rung 3: First worked step ────────────────────────────────
    if steps:
        first = steps[0]
        worked = first.description
        if first.computation:
            worked += f"\n{first.computation}"
        if first.answer:
            worked += f"\n→ {first.answer}"
        reveal = 1.0 / max(1, len(steps))
    else:
        worked = "Start by substituting the given values into the formula."
        reveal = 0.25
    ladder.rungs.append(HintRung(
        rung=3, name="worked", cost_xp=10, text=worked,
        reveal_fraction=reveal,
    ))

    # ── Rung 4: Full solution ────────────────────────────────────
    if steps:
        lines = []
        for s in steps:
            line = f"Step {s.step_index}: {s.description}"
            if s.computation:
                line += f"\n  {s.computation}"
            if s.answer:
                line += f"\n  → {s.answer}"
            lines.append(line)
        lines.append(f"\nFinal answer: {result.final_answer}")
        solution_text = "\n\n".join(lines)
    else:
        solution_text = f"Final answer: {result.final_answer}"
    ladder.rungs.append(HintRung(
        rung=4, name="solution", cost_xp=20, text=solution_text,
        reveal_fraction=1.0,
    ))

    return ladder


# ═══════════════════════════════════════════════════════════════════
# Wrong-Answer Handler — the student-facing entry point
# ═══════════════════════════════════════════════════════════════════

def handle_wrong_answer(
    student_answer: str,
    result: SolutionResult,
    hints_used: int = 0,
) -> dict:
    """Student got it wrong. Return the NEXT appropriate hint.

    This is the function the tutor/quiz flow calls. It:
    1. Detects the misconception from the wrong answer
    2. Builds (or reuses) the ladder
    3. Returns the next rung — misconception-aware at rung 1
    4. Emits an interaction event for the intelligence loop

    Returns a JSON-serializable dict.
    """
    # Detect misconception
    mkey, mtext = detect_misconception(student_answer, result.final_answer)

    # Build ladder
    ladder = build_ladder(result)

    # Which rung next?
    next_rung_num = min(hints_used + 1, 4)
    rung = ladder.get_rung(next_rung_num)

    # Misconception-aware nudge at rung 1
    if rung and rung.rung == 1 and mkey:
        rung.text = mtext
        rung.targets_misconception = mkey

    # Never fully block: rung 4 is always reachable
    response = {
        "correct": False,
        "student_answer": student_answer,
        "correct_answer": None if next_rung_num < 4 else result.final_answer,
        "hint": {
            "rung": rung.rung if rung else next_rung_num,
            "name": rung.name if rung else "solution",
            "text": rung.text if rung else "Ask your teacher.",
            "cost_xp": rung.cost_xp if rung else 20,
            "targets_misconception": rung.targets_misconception if rung else "",
        } if rung else None,
        "misconception_detected": mkey,
        "hints_used": hints_used + 1,
        "can_try_again": next_rung_num < 4,
        # Intelligence loop event (consumed by self_evolving_loop)
        "_event": {
            "event_type": "hint_request",
            "problem_type_id": result.problem_type_id,
            "rung": next_rung_num,
            "misconception": mkey,
            "student_answer": student_answer,
        },
    }
    return response


# ═══════════════════════════════════════════════════════════════════
# "Show me another" — parameter variation for infinite practice
# ═══════════════════════════════════════════════════════════════════

def vary_inputs(inputs: dict, seed: int = 0) -> dict:
    """Generate a new set of numbers for the same problem type.

    Keeps the STRUCTURE identical (same problem type, same method)
    but changes the VALUES. Rules:
      - Integers stay integers, small-ish (2-30)
      - Floats stay floats
      - Non-numeric fields (expressions, vars) are preserved
    Deterministic given seed (so teachers can regenerate the same variant).
    """
    import random
    rng = random.Random(seed)

    varied = {}
    for key, val in inputs.items():
        if not isinstance(val, str):
            varied[key] = val
            continue
        v = val.strip()
        # Pure integer → new small integer
        try:
            n = int(v)
            if abs(n) <= 1000:
                new_n = rng.randint(2, 30)
                if n < 0:
                    new_n = -new_n
                varied[key] = str(new_n)
                continue
        except ValueError:
            pass
        # Pure float → new float
        try:
            f = float(v)
            if abs(f) <= 1000:
                new_f = round(rng.uniform(1.5, 25.0), 1)
                if f < 0:
                    new_f = -new_f
                varied[key] = str(new_f)
                continue
        except ValueError:
            pass
        # Expression / variable / text → preserve
        varied[key] = val
    return varied
