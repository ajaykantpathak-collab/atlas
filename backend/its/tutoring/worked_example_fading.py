"""worked_example_fading.py — Tier 1: teach students who don't know how to start.

The platform's founding problem: students stare at a competency question and
can't begin. The research-proven fix is worked-example fading — show the
full solution first, then progressively hide steps until the student solves
unaided.

Our comp/concept files already ship 5-step guidelines per sub-part, which
map directly onto a fading ladder:

    Level 0 (full model):      all 5 steps shown, student just reads + answers "what comes next"
    Level 1 (tail blank):      steps 1-4 shown, student supplies step 5 (verify+answer)
    Level 2 (execution blank): steps 1-2 shown, student does 3-5
    Level 3 (setup only):      step 1 shown (identify+recall), student does 2-5
    Level 4 (independent):     question only — student does everything

Level selection is driven by:
  * BKT p_known for the node (from knowledge_tracing.py)
  * attempts on this node (more failed attempts -> lower level, not higher)
  * confidence quadrant (ConfidenceRemediation — high-confidence-wrong gets
    a misconception confrontation, not a fade)

Also in Tier 1 (folded in here since they share the level decision):
  * PREEMPTIVE_MISCONCEPTION: before the first attempt on a node, surface the
    catalog's #1 misconception for it ("most students think X — here's why not")
  * MASTERY GATE: can't start a node whose prerequisites are below p_gate —
    routes to the weakest prerequisite first
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any, Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Tunables
# ---------------------------------------------------------------------------

P_GATE = 0.90            # prerequisite mastery required to unlock a node
P_FULL_MODEL_MAX = 0.25  # below this p_known -> Level 0
P_TAIL_BLANK_MAX = 0.50  # -> Level 1
P_EXEC_BLANK_MAX = 0.70  # -> Level 2
P_SETUP_ONLY_MAX = 0.85  # -> Level 3
# above 0.85 -> Level 4 (independent)

FAIL_BACKLEVEL = 2       # consecutive failures that force a level drop
CONFIDENT_WRONG_P = 0.7  # self-rated confidence that counts as "high"


# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------

class Quadrant:
    CONFIDENT_WRONG = "confident_wrong"      # deep misconception — confront it
    CONFIDENT_RIGHT = "confident_right"      # solid — advance
    UNCERTAIN_WRONG = "uncertain_wrong"      # expected gap — scaffold normally
    UNCERTAIN_RIGHT = "uncertain_right"      # fragile — one more rep


@dataclass
class FadingState:
    """Per (student, node) fading progress."""
    student_id: str
    node_id: str
    level: int = 0
    consecutive_failures: int = 0
    total_attempts: int = 0
    history: list[dict] = field(default_factory=list)


@dataclass
class StepView:
    """What the student is allowed to see this level."""
    level: int
    visible_steps: list[str]        # guideline steps shown verbatim
    blanked_steps: list[int]        # step indices the student must produce
    prompt: str                     # instruction shown to the student


@dataclass
class GateDecision:
    node_id: str
    allowed: bool
    blocking_prereqs: list[str]      # node_ids below P_GATE
    route_to: Optional[str] = None   # weakest prereq to visit first
    reason: str = ""


# ---------------------------------------------------------------------------
# Engine
# ---------------------------------------------------------------------------

class WorkedExampleFading:
    """Decides how much of a worked example to show, and when to let go.

    Stateless w.r.t. persistence — callers store FadingState wherever the
    session layer keeps per-student progress (Redis/Postgres).
    """

    # -- level selection --------------------------------------------------

    def choose_level(self, p_known: float, state: FadingState) -> int:
        """Pick fading level from mastery + recent history."""
        if state.consecutive_failures >= FAIL_BACKLEVEL:
            return 0                      # back to full worked example
        if p_known < P_FULL_MODEL_MAX:
            base = 0
        elif p_known < P_TAIL_BLANK_MAX:
            base = 1
        elif p_known < P_EXEC_BLANK_MAX:
            base = 2
        elif p_known < P_SETUP_ONLY_MAX:
            base = 3
        else:
            base = 4
        # a student who just succeeded at level N shouldn't drop below N-1
        # unless they're failing — keeps momentum without stranding them
        return max(base, min(state.level, 4))

    def record_outcome(self, state: FadingState, correct: bool) -> None:
        """Update the fading state after a graded attempt."""
        state.total_attempts += 1
        state.history.append({"level": state.level, "correct": correct})
        if correct:
            state.consecutive_failures = 0
            state.level = min(state.level + 1, 4)      # fade one step on success
        else:
            state.consecutive_failures += 1
            if state.consecutive_failures >= FAIL_BACKLEVEL:
                state.level = max(state.level - 2, 0)  # drop two levels
                state.consecutive_failures = 0

    # -- rendering ----------------------------------------------------------

    def render(self, steps: list[str], state: FadingState) -> StepView:
        """Split a 5-step guideline into shown vs student-produced parts."""
        n = len(steps)
        shown = {0: n, 1: n - 1, 2: 2, 3: 1, 4: 0}[min(state.level, 4)]
        visible = steps[:shown]
        blanked = list(range(shown, n))
        prompts = {
            0: "Read the full solution. Then tell me: what was the key step, and why did it work?",
            1: "Steps 1-4 are done. You finish it — verify the result and state the answer.",
            2: "The setup is done. Execute the calculation and verify your answer.",
            3: "I've identified what this needs. Now set it up, solve it, and verify.",
            4: "Solve this completely on your own.",
        }
        return StepView(level=state.level, visible_steps=visible,
                        blanked_steps=blanked, prompt=prompts[min(state.level, 4)])

    # -- confidence quadrant -------------------------------------------------

    @staticmethod
    def quadrant(confidence: Optional[float], correct: bool) -> str:
        high = confidence is not None and confidence >= CONFIDENT_WRONG_P
        if correct:
            return Quadrant.CONFIDENT_RIGHT if high else Quadrant.UNCERTAIN_RIGHT
        return Quadrant.CONFIDENT_WRONG if high else Quadrant.UNCERTAIN_WRONG

    def remediation_for(self, quadrant: str, misconception: Optional[dict]) -> dict:
        """Map the confidence quadrant to the right intervention."""
        if quadrant == Quadrant.CONFIDENT_WRONG:
            # deep misconception — fading won't help; confront the belief
            return {
                "intervention": "misconception_confrontation",
                "misconception": misconception,
                "instruction": ("Ask the student to predict the answer, show the "
                                "conflict with reality, then rebuild. Do NOT show "
                                "a worked example yet — the wrong model is stronger "
                                "than the hint."),
            }
        if quadrant == Quadrant.UNCERTAIN_WRONG:
            return {"intervention": "faded_worked_example", "instruction":
                    "Normal scaffold — drop a fading level and show more steps."}
        if quadrant == Quadrant.UNCERTAIN_RIGHT:
            return {"intervention": "confirmation_rep", "instruction":
                    "One more rep at the same level to consolidate — their "
                    "knowledge is fragile, not fluent."}
        return {"intervention": "advance", "instruction":
                "Fade up one level or move to the next node."}

    # -- mastery gate ---------------------------------------------------------

    def gate(self, node_id: str, prereqs: list[str],
             mastery: dict[str, float]) -> GateDecision:
        """Block a node until its prerequisites are learned.

        mastery: node_id -> BKT p_known. Missing prereqs count as 0.
        """
        blocking = [p for p in prereqs if mastery.get(p, 0.0) < P_GATE]
        if not blocking:
            return GateDecision(node_id=node_id, allowed=True,
                                blocking_prereqs=[], reason="all prereqs mastered")
        weakest = min(blocking, key=lambda p: mastery.get(p, 0.0))
        return GateDecision(
            node_id=node_id, allowed=False, blocking_prereqs=blocking,
            route_to=weakest,
            reason=f"{len(blocking)} prereqs below {P_GATE:.0%} mastery — "
                   f"route to weakest ({weakest}) first",
        )

    # -- preemptive misconception ----------------------------------------------

    @staticmethod
    def preemptive_prompt(node_id: str, top_misconception: Optional[dict]) -> Optional[str]:
        """The 'most students think X' opener, shown before attempt 1."""
        if not top_misconception:
            return None
        return (f"Before you start — most students think "
                f"{top_misconception.get('description', 'something wrong here')}. "
                f"They're mistaken. Here's why: "
                f"{top_misconception.get('remediation', '')} "
                f"Keep that in mind as you work.")
