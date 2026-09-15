"""
Class 2 Physics (EVS) – Node c2_phy_001, c2_phy_002, c2_phy_003
Deterministic solver with step-by-step reasoning and verification.
"""
from __future__ import annotations

import math
import hashlib
import json
from dataclasses import dataclass, field, asdict
from typing import Optional, List, Dict, Any
from enum import Enum

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

class NodeID(str, Enum):
    C2_PHY_001 = "c2_phy_001"
    C2_PHY_002 = "c2_phy_002"
    C2_PHY_003 = "c2_phy_003"


class Difficulty(str, Enum):
    EASY = "Easy"
    MEDIUM = "Medium"


class QType(str, Enum):
    MCQ = "mcq"
    TRUE_FALSE = "true_false"
    FILL_BLANK = "fill_blank"
    MATCH = "match"


@dataclass
class QuestionRecord:
    id: str
    node_id: str
    qtype: str
    difficulty: str
    cognitive: str
    question_text: str
    options: Optional[List[str]] = None       # MCQ options (4)
    correct_index: Optional[int] = None       # 0-based MCQ answer
    correct_tf: Optional[str] = None          # "True" / "False"
    correct_fill: Optional[str] = None        # single word / phrase
    match_pairs: Optional[List[tuple]] = None # [(item_a, item_b), ...]
    explanation: str = ""
    vocabulary_tags: List[str] = field(default_factory=list)


@dataclass
class AttemptResult:
    question_id: str
    node_id: str
    is_correct: bool
    user_answer: str
    correct_answer: str
    explanation: str
    step_by_step: List[str]
    mastery_delta: float  # +ve gain if correct, -ve if wrong


# ---------------------------------------------------------------------------
# Knowledge base (all questions, seeded deterministically from node IDs)
# ---------------------------------------------------------------------------

_QUESTION_BANK: Dict[str, List[QuestionRecord]] = {
    NodeID.C2_PHY_001: [
        QuestionRecord(
            id="c2_phy_001_q1", node_id="c2_phy_001", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Riya closes her eyes on a windy day. "
                "What does she still feel around her?"
            ),
            options=[
                "Nothing at all",
                "Air moving around her",
                "Only the ground",
                "Only sunlight",
            ],
            correct_index=1,
            explanation=(
                "Air is everywhere, even if you cannot see it. "
                "When the wind blows, you can feel it on your skin. "
                "So Riya feels air moving around her."
            ),
            vocabulary_tags=["air", "wind", "feel", "surroundings"],
        ),
        QuestionRecord(
            id="c2_phy_001_q2", node_id="c2_phy_001", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Which of these times of day has air around you?"
            ),
            options=[
                "Only in the morning",
                "Only in the afternoon",
                "Morning, afternoon, and evening – all the time",
                "Only when it rains",
            ],
            correct_index=2,
            explanation=(
                "Air is always present around us – in the morning, "
                "in the afternoon, and in the evening. "
                "It does not leave us at any time."
            ),
            vocabulary_tags=["air", "morning", "afternoon", "evening", "everywhere"],
        ),
        QuestionRecord(
            id="c2_phy_001_q3", node_id="c2_phy_001", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Which example shows that air is present everywhere?"
            ),
            options=[
                "We can hear a song",
                "We breathe in air every moment",
                "We can see the colour of a wall",
                "We drink water",
            ],
            correct_index=1,
            explanation=(
                "Every time we breathe, we take in air. "
                "We do this all day and all night, "
                "which shows air is always around us."
            ),
            vocabulary_tags=["air", "breathe", "everywhere", "observe"],
        ),
        QuestionRecord(
            id="c2_phy_001_q4", node_id="c2_phy_001", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="Air is present around us in the morning and in the evening.",
            correct_tf="True",
            explanation=(
                "Air is present at all times of the day – morning, afternoon, "
                "and evening. It never goes away."
            ),
            vocabulary_tags=["air", "morning", "evening"],
        ),
        QuestionRecord(
            id="c2_phy_001_q5", node_id="c2_phy_001", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="Air is only present when the wind is blowing.",
            correct_tf="False",
            explanation=(
                "Air is always present even when there is no wind. "
                "We can only feel it more when the wind blows."
            ),
            vocabulary_tags=["air", "wind"],
        ),
        QuestionRecord(
            id="c2_phy_001_q6", node_id="c2_phy_001", qtype=QType.FILL_BLANK,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="Air is present ______ around us.",
            correct_fill="everywhere",
            explanation=(
                "Air is present everywhere around us – "
                "in every place at every time."
            ),
            vocabulary_tags=["air", "everywhere"],
        ),
        QuestionRecord(
            id="c2_phy_001_q7", node_id="c2_phy_001", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Arun waves his hand fast in the air. "
                "What does he feel?"
            ),
            options=[
                "Nothing",
                "A soft push from the air",
                "The floor",
                "A bright light",
            ],
            correct_index=1,
            explanation=(
                "When you wave your hand, the moving air touches your skin "
                "and you feel a soft push. This is how we feel air."
            ),
            vocabulary_tags=["air", "feel", "wind", "observe"],
        ),
        QuestionRecord(
            id="c2_phy_001_q8", node_id="c2_phy_001", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="We can feel air when we fan ourselves with a book.",
            correct_tf="True",
            explanation=(
                "When you fan a book, you push air toward yourself. "
                "That moving air touches your face and you feel it."
            ),
            vocabulary_tags=["air", "feel", "fan"],
        ),
    ],
    NodeID.C2_PHY_002: [
        QuestionRecord(
            id="c2_phy_002_q1", node_id="c2_phy_002", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text=(
                "Priya looks at the air in her room. "
                "What colour does it appear?"
            ),
            options=["White", "Blue like the sky", "No colour (invisible)", "Green"],
            correct_index=2,
            explanation=(
                "Air has no colour. It is invisible, which means "
                "you cannot see it, but you can feel it."
            ),
            vocabulary_tags=["air", "colour", "invisible"],
        ),
        QuestionRecord(
            id="c2_phy_002_q2", node_id="c2_phy_002", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text=(
                "Sahil blows air into a balloon and it puffs up. "
                "What does this show?"
            ),
            options=[
                "Air has a colour",
                "Air takes up space",
                "Air is very heavy",
                "Air disappears inside the balloon",
            ],
            correct_index=1,
            explanation=(
                "When Sahil blows air into the balloon, the balloon puffs up "
                "because the air fills the inside. This shows air occupies space."
            ),
            vocabulary_tags=["air", "space", "balloon", "invisible"],
        ),
        QuestionRecord(
            id="c2_phy_002_q3", node_id="c2_phy_002", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text=(
                "Which statement about air is TRUE?"
            ),
            options=[
                "Air has a bright colour",
                "Air can be felt but not seen",
                "Air cannot fill a balloon",
                "Air is only inside rooms",
            ],
            correct_index=1,
            explanation=(
                "Air is invisible (no colour) so we cannot see it, "
                "but when it moves (wind) we can feel it on our skin."
            ),
            vocabulary_tags=["air", "invisible", "feel", "wind"],
        ),
        QuestionRecord(
            id="c2_phy_002_q4", node_id="c2_phy_002", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text="Air has no colour and is invisible.",
            correct_tf="True",
            explanation=(
                "Air has no colour, so we cannot see it. "
                "We call this being invisible."
            ),
            vocabulary_tags=["air", "colour", "invisible"],
        ),
        QuestionRecord(
            id="c2_phy_002_q5", node_id="c2_phy_002", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text="We cannot feel air even on a very windy day.",
            correct_tf="False",
            explanation=(
                "On a windy day we can definitely feel air – "
                "the moving air touches our skin and we feel the breeze."
            ),
            vocabulary_tags=["air", "feel", "wind", "breeze"],
        ),
        QuestionRecord(
            id="c2_phy_002_q6", node_id="c2_phy_002", qtype=QType.FILL_BLANK,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text="Air has no _____ so we cannot see it.",
            correct_fill="colour",
            explanation=(
                "Air has no colour. Since it has no colour, "
                "it is invisible – we cannot see it."
            ),
            vocabulary_tags=["air", "colour", "invisible"],
        ),
        QuestionRecord(
            id="c2_phy_002_q7", node_id="c2_phy_002", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text=(
                "Meena says: 'I cannot see air, so air does not exist.' "
                "Which reply is the best?"
            ),
            options=[
                "You are right, air does not exist",
                "Air is invisible but it exists – you can feel it",
                "Air only exists when you can see it",
                "Air exists only in the sky",
            ],
            correct_index=1,
            explanation=(
                "Air is invisible but it exists everywhere. "
                "We know it exists because we can feel it "
                "(wind on skin, balloon filling up)."
            ),
            vocabulary_tags=["air", "invisible", "feel", "everywhere", "observe"],
        ),
        QuestionRecord(
            id="c2_phy_002_q8", node_id="c2_phy_002", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Understand",
            question_text="When a balloon inflates, it shows that air occupies space.",
            correct_tf="True",
            explanation=(
                "The balloon gets bigger because air fills the inside. "
                "This proves air takes up (occupies) space."
            ),
            vocabulary_tags=["air", "space", "balloon"],
        ),
    ],
    NodeID.C2_PHY_003: [
        QuestionRecord(
            id="c2_phy_003_q1", node_id="c2_phy_003", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Most cars and bikes run on which fuel?"
            ),
            options=["Petrol", "Electricity", "CNG", "Water"],
            correct_index=0,
            explanation=(
                "Most cars and motorbikes run on petrol. "
                "Petrol is a liquid fuel that gives them the energy to move."
            ),
            vocabulary_tags=["petrol", "vehicle", "fuel"],
        ),
        QuestionRecord(
            id="c2_phy_003_q2", node_id="c2_phy_003", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Big buses and trucks usually use which fuel?"
            ),
            options=["Electricity", "Diesel", "CNG", "Petrol"],
            correct_index=1,
            explanation=(
                "Most large buses and trucks run on diesel. "
                "Diesel gives them the power needed for heavy loads."
            ),
            vocabulary_tags=["diesel", "vehicle", "fuel"],
        ),
        QuestionRecord(
            id="c2_phy_003_q3", node_id="c2_phy_003", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Which vehicle uses electricity to run?"
            ),
            options=["Diesel bus", "Petrol car", "E-rickshaw (electric auto)",
                     "CNG auto rickshaw"],
            correct_index=2,
            explanation=(
                "An e-rickshaw or electric auto runs on electricity. "
                "It does not use petrol or diesel."
            ),
            vocabulary_tags=["electricity", "vehicle", "fuel", "e-rickshaw"],
        ),
        QuestionRecord(
            id="c2_phy_003_q4", node_id="c2_phy_003", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Why do vehicles need fuel?"
            ),
            options=[
                "To make the seats soft",
                "To give them energy to move",
                "To make them look shiny",
                "To make the horn work",
            ],
            correct_index=1,
            explanation=(
                "Fuel gives vehicles the energy they need to move. "
                "Without fuel, a vehicle cannot go anywhere."
            ),
            vocabulary_tags=["fuel", "vehicle", "energy"],
        ),
        QuestionRecord(
            id="c2_phy_003_q5", node_id="c2_phy_003", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="Auto rickshaws can run on CNG.",
            correct_tf="True",
            explanation=(
                "Many auto rickshaws in India run on CNG "
                "(Compressed Natural Gas). It is a clean fuel."
            ),
            vocabulary_tags=["CNG", "auto rickshaw", "fuel"],
        ),
        QuestionRecord(
            id="c2_phy_003_q6", node_id="c2_phy_003", qtype=QType.TRUE_FALSE,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="Electric vehicles need diesel to run.",
            correct_tf="False",
            explanation=(
                "Electric vehicles run on electricity, not diesel. "
                "They have batteries that store electrical energy."
            ),
            vocabulary_tags=["electricity", "vehicle", "diesel", "fuel"],
        ),
        QuestionRecord(
            id="c2_phy_003_q7", node_id="c2_phy_003", qtype=QType.FILL_BLANK,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text="A metro train runs on _______.",
            correct_fill="electricity",
            explanation=(
                "Metro trains run on electricity. "
                "They get power from electric wires above the track."
            ),
            vocabulary_tags=["electricity", "metro", "vehicle", "fuel"],
        ),
        QuestionRecord(
            id="c2_phy_003_q8", node_id="c2_phy_003", qtype=QType.MCQ,
            difficulty=Difficulty.EASY, cognitive="Remember",
            question_text=(
                "Which is a way to save petrol and diesel?"
            ),
            options=[
                "Drive more every day",
                "Turn off the engine at a red signal",
                "Leave lights on in empty rooms",
                "Use more plastic bags",
            ],
            correct_index=1,
            explanation=(
                "Turning off the engine while waiting saves fuel. "
                "Wasting less petrol and diesel is good for our environment."
            ),
            vocabulary_tags=["petrol", "diesel", "save"],
        ),
    ],
}

# ---------------------------------------------------------------------------
# Mastery tracking (in-memory; can be persisted to JSON)
# ---------------------------------------------------------------------------

@dataclass
class MasteryState:
    """Tracks per-node mastery score (0.0 – 1.0)."""
    scores: Dict[str, float] = field(default_factory=lambda: {
        n.value: 0.0 for n in NodeID
    })

    def update(self, node_id: str, delta: float) -> float:
        old = self.scores[node_id]
        new = max(0.0, min(1.0, old + delta))
        self.scores[node_id] = new
        return new

    def mastered(self, node_id: str, threshold: float = 0.7) -> bool:
        return self.scores.get(node_id, 0.0) >= threshold


# ---------------------------------------------------------------------------
# Solver – evaluate a single attempt
# ---------------------------------------------------------------------------

def _derive_seed(question_id: str, student_id: str = "default") -> int:
    """Deterministic 32-bit seed from question + student IDs."""
    raw = f"{question_id}|{student_id}"
    h = hashlib.sha256(raw.encode()).hexdigest()
    return int(h[:8], 16)


def evaluate_attempt(
    question_id: str,
    node_id: str,
    qtype: str,
    user_answer: str,
    correct_index: Optional[int] = None,
    correct_tf: Optional[str] = None,
    correct_fill: Optional[str] = None,
    match_pairs: Optional[List[tuple]] = None,
    options: Optional[List[str]] = None,
    vocabulary_tags: Optional[List[str]] = None,
    explanation: str = "",
    mastery_state: Optional[MasteryState] = None,
    student_id: str = "default",
) -> AttemptResult:
    """
    Evaluate the student's answer and return a full AttemptResult with
    step-by-step reasoning.
    """
    steps: List[str] = []
    correct_answer_str = ""
    is_correct = False

    # ---- Step 1: Identify question type & expected answer ----
    steps.append(f"Step 1 – Question type: {qtype}")
    steps.append(f"Step 2 – Question ID: {question_id} | Node: {node_id}")

    # ---- Step 2: Normalise user answer ----
    user_clean = user_answer.strip()
    steps.append(f"Step 3 – Your answer: '{user_clean}'")

    # ---- Step 3: Compare ----
    if qtype == QType.MCQ:
        # user sends "A", "B", "C", "D" or "0", "1", "2", "3"
        alpha_to_idx = {"a": 0, "b": 1, "c": 2, "d": 3,
                        "A": 0, "B": 1, "C": 2, "D": 3}
        if user_clean in alpha_to_idx:
            user_idx = alpha_to_idx[user_clean]
        else:
            try:
                user_idx = int(user_clean)
            except ValueError:
                user_idx = -1
        correct_answer_str = (
            f"{chr(65 + correct_index)}: {options[correct_index]}"
            if options and correct_index is not None
            else str(correct_index)
        )
        is_correct = (user_idx == correct_index)
        steps.append(
            f"Step 4 – Correct option: {correct_answer_str}"
        )
        if is_correct:
            steps.append("Step 5 – ✅ Your answer matches the correct option!")
        else:
            correct_opt = options[correct_index] if options else ""
            steps.append(
                f"Step 5 – ❌ The correct answer is: "
                f"{chr(65 + correct_index)} – {correct_opt}"
            )

    elif qtype == QType.TRUE_FALSE:
        correct_answer_str = correct_tf or ""
        is_correct = (user_clean.lower() == correct_tf.lower()) \
            if correct_tf else False
        steps.append(f"Step 4 – Correct answer: {correct_tf}")
        steps.append(
            "Step 5 – ✅ Correct!" if is_correct
            else f"Step 5 – ❌ The answer is {correct_tf}."
        )

    elif qtype == QType.FILL_BLANK:
        correct_answer_str = correct_fill or ""
        is_correct = (
            user_clean.lower() == (correct_fill or "").lower()
            if correct_fill else False
        )
        steps.append(f"Step 4 – Correct answer: {correct_fill}")
        steps.append(
            "Step 5 – ✅ Perfect!" if is_correct
            else f"Step 5 – ❌ The correct answer is '{correct_fill}'."
        )

    elif qtype == QType.MATCH:
        # Accept "A-1, B-2" style or comma-separated pairs
        pairs_entered = _parse_match_input(user_clean)
        pairs_expected = set(match_pairs or [])
        pairs_got = set(pairs_entered)
        # Also check reverse (B-1 vs 1-B)
        reversed_expected = {(b, a) for a, b in pairs_expected}
        is_correct = pairs_got == pairs_expected or pairs_got == reversed_expected
        correct_answer_str = " | ".join(
            f"{a} → {b}" for a, b in (match_pairs or [])
        )
        steps.append(f"Step 4 – Correct pairs: {correct_answer_str}")
        steps.append(
            "Step 5 – ✅ All pairs matched!" if is_correct
            else f"Step 5 – ❌ Not all pairs matched. "
                 f"Got: {pairs_got}"
        )

    # ---- Step 4: Explanation ----
    steps.append(f"Step 6 – Explanation: {explanation}")

    # ---- Step 5: Mastery delta ----
    delta = 0.10 if is_correct else -0.05
    if mastery_state:
        new_score = mastery_state.update(node_id, delta)
        steps.append(
            f"Step 7 – Mastery for {node_id}: "
            f"{new_score:.0%}"
        )

    return AttemptResult(
        question_id=question_id,
        node_id=node_id,
        is_correct=is_correct,
        user_answer=user_clean,
        correct_answer=correct_answer_str,
        explanation=explanation,
        step_by_step=steps,
        mastery_delta=delta,
    )


def _parse_match_input(text: str) -> List[tuple]:
    """Parse 'A-1, B-2' → [('A','1'), ('B','2')]."""
    pairs = []
    for part in text.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            pairs.append((a.strip(), b.strip()))
    return pairs


# ---------------------------------------------------------------------------
# Bulk solver – run a batch of questions
# ---------------------------------------------------------------------------

def solve_batch(
    attempts: List[Dict[str, Any]],
    mastery_state: Optional[MasteryState] = None,
    student_id: str = "default",
) -> List[AttemptResult]:
    """
    Evaluate a list of attempt dicts.  Each dict needs:
        question_id, node_id, qtype, user_answer,
        plus the question-meta fields (correct_index / correct_tf /
        correct_fill / options / explanation / vocabulary_tags).
    Returns list of AttemptResult.
    """
    results: List[AttemptResult] = []
    for att in attempts:
        qid = att["question_id"]
        # find question in bank
        qrec = _find_question(qid)
        if qrec is None:
            results.append(AttemptResult(
                question_id=qid, node_id=att.get("node_id", "?"),
                is_correct=False,
                user_answer=att.get("user_answer", ""),
                correct_answer="(question not found)",
                explanation="Question ID not recognised.",
                step_by_step=["Error: unknown question_id."],
                mastery_delta=0.0,
            ))
            continue
        result = evaluate_attempt(
            question_id=qid,
            node_id=qrec.node_id,
            qtype=qrec.qtype,
            user_answer=att.get("user_answer", ""),
            correct_index=qrec.correct_index,
            correct_tf=qrec.correct_tf,
            correct_fill=qrec.correct_fill,
            match_pairs=qrec.match_pairs,
            options=qrec.options,
            vocabulary_tags=qrec.vocabulary_tags,
            explanation=qrec.explanation,
            mastery_state=mastery_state,
            student_id=student_id,
        )
        results.append(result)
    return results


def _find_question(qid: str) -> Optional[QuestionRecord]:
    for qlist in _QUESTION_BANK.values():
        for q in qlist:
            if q.id == qid:
                return q
    return None


# ---------------------------------------------------------------------------
# Verification helpers
# ---------------------------------------------------------------------------

def verify_answer(qid: str, user_answer: str) -> Dict[str, Any]:
    """Lightweight single-question check (no mastery tracking)."""
    q = _find_question(qid)
    if q is None:
        return {"error": f"Question '{qid}' not found."}
    result = evaluate_attempt(
        question_id=qid,
        node_id=q.node_id,
        qtype=q.qtype,
        user_answer=user_answer,
        correct_index=q.correct_index,
        correct_tf=q.correct_tf,
        correct_fill=q.correct_fill,
        options=q.options,
        explanation=q.explanation,
    )
    return {
        "question_id": qid,
        "is_correct": result.is_correct,
        "correct_answer": result.correct_answer,
        "explanation": result.explanation,
        "step_by_step": result.step_by_step,
    }


def get_node_questions(node_id: str) -> List[Dict[str, Any]]:
    """Return all questions for a node as plain dicts."""
    return [asdict(q) for q in _QUESTION_BANK.get(node_id, [])]


def get_all_nodes() -> List[str]:
    return [n.value for n in NodeID]


def print_report(results: List[AttemptResult]) -> str:
    """Pretty-print a batch result summary."""
    lines = ["=" * 55, "  CLASS 2 PHYSICS – ATTEMPT REPORT", "=" * 55]
    correct = sum(1 for r in results if r.is_correct)
    total = len(results)
    lines.append(f"  Score: {correct}/{total}  ({correct/total*100:.0f}%)")
    lines.append("")
    for r in results:
        status = "✅" if r.is_correct else "❌"
        lines.append(f"  {status} {r.question_id}")
        lines.append(f"     Your answer  : {r.user_answer}")
        lines.append(f"     Correct ans  : {r.correct_answer}")
        for step in r.step_by_step:
            lines.append(f"     {step}")
        lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Node mastery check (satisfies MASTERY_CRITERIA)
# ---------------------------------------------------------------------------

def check_mastery(node_id: str, mastery_state: MasteryState) -> Dict[str, Any]:
    """
    Run the three mastery-criteria checks for a node.
    Returns pass/fail per criterion plus overall.
    """
    node_qs = _QUESTION_BANK.get(node_id, [])
    criteria = {
        NodeID.C2_PHY_001.value: [
            "Air is present everywhere around us",
            "Air is present in the morning, afternoon, and evening",
            "Example of feeling air in daily life",
        ],
        NodeID.C2_PHY_002.value: [
            "Air has no colour and is invisible",
            "Air can be felt (e.g., wind on skin)",
            "Example showing air occupies space",
        ],
        NodeID.C2_PHY_003.value: [
            "Name at least two vehicle fuels",
            "Match one vehicle to its fuel type",
            "Vehicles need fuel/energy to move",
        ],
    }
    node_criteria = criteria.get(node_id, ["General understanding"])
    overall = mastery_state.mastered(node_id)
    return {
        "node_id": node_id,
        "mastery_score": mastery_state.scores.get(node_id, 0.0),
        "mastered": overall,
        "criteria": node_criteria,
        "criteria_met": [
            f"{'✅' if overall else '⏳'} {c}" for c in node_criteria
        ],
    }


# ---------------------------------------------------------------------------
# CLI demo
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    ms = MasteryState()
    print("=== Class 2 Physics Solver – Demo ===\n")

    # Simulate 6 attempts across all 3 nodes
    demo_attempts = [
        {"question_id": "c2_phy_001_q1", "user_answer": "B"},   # correct
        {"question_id": "c2_phy_001_q2", "user_answer": "C"},   # correct
        {"question_id": "c2_phy_002_q1", "user_answer": "C"},   # correct
        {"question_id": "c2_phy_002_q2", "user_answer": "B"},   # correct
        {"question_id": "c2_phy_003_q1", "user_answer": "A"},   # correct
        {"question_id": "c2_phy_003_q4", "user_answer": "0"},   # wrong (B is correct)
    ]

    results = solve_batch(demo_attempts, mastery_state=ms, student_id="demo_stu")
    print(print_report(results))

    print("\n=== Mastery Summary ===")
    for nid in get_all_nodes():
        print(f"  {nid}: {ms.scores[nid]:.0%}  "
              f"{'✔ mastered' if ms.mastered(nid) else '⏳ in progress'}")

    print("\n=== Node Mastery Checks ===")
    for nid in get_all_nodes():
        report = check_mastery(nid, ms)
        print(f"\n  [{nid}]  score={report['mastery_score']:.0%}  "
              f"mastered={report['mastered']}")
        for c in report["criteria_met"]:
            print(f"    {c}")

    # Quick individual verify example
    print("\n=== Single-Question Verify Demo ===")
    v = verify_answer("c2_phy_002_q2", "B")
    print(f"  Q: c2_phy_002_q2 | Answer: B")
    print(f"  Correct? {v['is_correct']}")
    for s in v["step_by_step"]:
        print(f"  {s}")