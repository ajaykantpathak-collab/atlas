"""
socratic_state_machine.py
Deterministic Socratic state machine for per-node tutoring.

This is Layer 3 of the ITS stack. It drives a structured tutoring loop through
the 5 Bloom-level diagnostic questions in .bloom.marker files:

  INTRODUCE → DISCUSSION → PROBE_Q1 → PROBE_Q2 → ... → PROBE_Q5 → MASTERY
                ↑                ↓
                ← ← ← REMEDIATE ←
                              ↓
                         SIMPLIFY

Each state serves a specific .bloom.marker field:
  INTRODUCE    → TEXT_WALKTHROUGH + DIAGRAM (mode-selected presentation)
  DISCUSSION   → Multi-agent debate from COMMON_MISCONCEPTION (Addition 3)
  PROBE_Q1-Q5  → Diagnostic questions at each Bloom level
  REMEDIATE    → Remediation path + misconception + hint for failed question
  SIMPLIFY     → ELI5 simplified explanation
  MASTERY      → Scorecard + CDM diagnosis + KST next node selection

What this replaces:
  - The single-question diagnostic flow in tutor_service.py _handle_diagnostic_answer
  - The phase string ("teach", "diagnostic", "remediate") with an explicit state enum
  - The simple correct/total scorecard with CDM-powered skill diagnosis

What this does NOT replace:
  - Intent routing in tutor_service.py (walkthrough, simplify, test me, drill)
  - The existing answer evaluators (hybrid_evaluator.py)
  - The existing drill service, flashcards, spiral review
  - The 6 ES-LLMs agents (Layer 4) — these are the fallback when state machine can't handle

The state machine is PURELY DETERMINISTIC:
  - Same state + same input = same output (replayable, auditable)
  - No LLM calls at any state transition
  - All content comes from pre-generated .bloom.marker files
"""

from __future__ import annotations

import logging
from enum import Enum
from typing import Any

from backend.its.parsing.bloom_marker_parser import parse_bloom_marker
from backend.its.diagnosis.q_matrix_generator import generate_q_matrix_for_node
from backend.its.diagnosis.cognitive_diagnosis_engine import (
    diagnose_from_diag_results,
    get_remediation_targets,
    DiagnosisResult,
)

logger = logging.getLogger(__name__)


class TutorState(str, Enum):
    """States in the Socratic tutoring state machine."""
    IDLE = "idle"                    # No node selected
    INTRODUCE = "introduce"          # Serving TEXT_WALKTHROUGH + DIAGRAM
    DISCUSSION = "discussion"        # Multi-agent debate moment
    PROBE_Q1 = "probe_q1"            # Recall question
    PROBE_Q2 = "probe_q2"            # Reasoning question
    PROBE_Q3 = "probe_q3"            # Evaluate question
    PROBE_Q4 = "probe_q4"            # Apply question
    PROBE_Q5 = "probe_q5"            # Create question
    REMEDIATE = "remediate"          # Serving remediation content for failed Q
    SIMPLIFY = "simplify"            # Serving ELI5 simplified explanation
    MASTERY = "mastery"              # Diagnostic complete, showing scorecard
    COMPLETE = "complete"            # Node mastered, ready for next node


# Map state to question number
STATE_TO_QNUM: dict[TutorState, int] = {
    TutorState.PROBE_Q1: 1,
    TutorState.PROBE_Q2: 2,
    TutorState.PROBE_Q3: 3,
    TutorState.PROBE_Q4: 4,
    TutorState.PROBE_Q5: 5,
}

# Map question number to next state
QNUM_TO_NEXT_STATE: dict[int, TutorState] = {
    1: TutorState.PROBE_Q2,
    2: TutorState.PROBE_Q3,
    3: TutorState.PROBE_Q4,
    4: TutorState.PROBE_Q5,
    5: TutorState.MASTERY,
}

BLOOM_LABELS = {
    1: "recall",
    2: "reasoning",
    3: "evaluate",
    4: "apply",
    5: "create",
}


class SessionState:
    """Per-student, per-node session state for the state machine."""

    def __init__(self, node_id: str, student_id: str = ""):
        self.node_id = node_id
        self.student_id = student_id
        self.state: TutorState = TutorState.IDLE
        self.current_q: int = 0
        self.answers: dict[int, str] = {}        # q_num -> student answer
        self.results: dict[int, dict] = {}       # q_num -> {correct, score, ...}
        self.failed: list[int] = []              # q_nums that were wrong
        self.hint_level: dict[int, int] = {}     # q_num -> hint level (0-3)
        self.attempts: dict[int, int] = {}       # q_num -> attempt count
        self.remediation_q: int = 0              # which question we're remediating
        self.diagnosis: DiagnosisResult | None = None
        self.xp_earned: int = 0
        self.mode: str = "default"               # presentation mode (from mode_selector)

    def to_dict(self) -> dict:
        return {
            "node_id": self.node_id,
            "student_id": self.student_id,
            "state": self.state.value,
            "current_q": self.current_q,
            "answers": self.answers,
            "results": self.results,
            "failed": self.failed,
            "hint_level": self.hint_level,
            "attempts": self.attempts,
            "remediation_q": self.remediation_q,
            "diagnosis": self.diagnosis.to_dict() if self.diagnosis else None,
            "xp_earned": self.xp_earned,
            "mode": self.mode,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "SessionState":
        s = cls(data.get("node_id", ""), data.get("student_id", ""))
        s.state = TutorState(data.get("state", "idle"))
        s.current_q = data.get("current_q", 0)
        s.answers = data.get("answers", {})
        s.results = data.get("results", {})
        s.failed = data.get("failed", [])
        s.hint_level = data.get("hint_level", {})
        s.attempts = data.get("attempts", {})
        s.remediation_q = data.get("remediation_q", 0)
        s.xp_earned = data.get("xp_earned", 0)
        s.mode = data.get("mode", "default")
        return s


class SocraticStateMachine:
    """Deterministic state machine for Socratic tutoring on a single node.

    Usage:
        sm = SocraticStateMachine(bloom_marker_path)
        sm.start()  # → INTRODUCE state
        response = sm.get_current_content()
        # student reads, types "ready"
        response = sm.handle_input("ready")  # → DISCUSSION or PROBE_Q1
        # student answers Q1
        response = sm.handle_input("photosynthesis is...")  # evaluates, transitions
    """

    def __init__(self, bloom_marker_path: str):
        self.bloom_marker_path = bloom_marker_path
        self.parsed = parse_bloom_marker(bloom_marker_path)
        if not self.parsed:
            raise ValueError(f"Failed to parse: {bloom_marker_path}")
        self.node_id = self.parsed["node_id"]
        self.q_matrix = generate_q_matrix_for_node(self.parsed)
        self.questions = self.parsed.get("diagnostic_questions", [])
        self.session = SessionState(self.node_id)

        # Sort questions by q_num
        self.questions.sort(key=lambda q: q.get("q_num", 0))

    def start(self, mode: str = "default") -> str:
        """Start the state machine — transition to INTRODUCE."""
        self.session.state = TutorState.INTRODUCE
        self.session.mode = mode
        return self._serve_introduce()

    def get_state(self) -> TutorState:
        return self.session.state

    def get_current_content(self) -> str:
        """Get content for the current state without transitioning."""
        if self.session.state == TutorState.INTRODUCE:
            return self._serve_introduce()
        elif self.session.state in STATE_TO_QNUM:
            return self._serve_question(STATE_TO_QNUM[self.session.state])
        elif self.session.state == TutorState.REMEDIATE:
            return self._serve_remediation()
        elif self.session.state == TutorState.SIMPLIFY:
            return self._serve_simplify()
        elif self.session.state == TutorState.MASTERY:
            return self._serve_mastery()
        return "Session not started."

    def handle_input(self, student_input: str, is_correct: bool | None = None) -> str:
        """Handle student input and transition to the next state.

        Args:
            student_input: The student's text input.
            is_correct: Pre-evaluated correctness (if None, uses simple matching).

        Returns:
            The content to show the student after the transition.
        """
        state = self.session.state

        # --- INTRODUCE: student says "ready" or "test me" → go to first question ---
        if state == TutorState.INTRODUCE:
            # Check if discussion moment should trigger
            if self._has_discussion_moment():
                self.session.state = TutorState.DISCUSSION
                return self._serve_discussion()
            return self._advance_to_q1()

        # --- DISCUSSION: student picks a side → go to first question ---
        if state == TutorState.DISCUSSION:
            return self._advance_to_q1()

        # --- PROBE_Qn: student answers a diagnostic question ---
        if state in STATE_TO_QNUM:
            q_num = STATE_TO_QNUM[state]
            return self._handle_answer(q_num, student_input, is_correct)

        # --- REMEDIATE: student is reviewing remediation content ---
        if state == TutorState.REMEDIATE:
            # After remediation, retry the question or move on
            return self._handle_remediation_response(student_input, is_correct)

        # --- SIMPLIFY: student read the simplified explanation ---
        if state == TutorState.SIMPLIFY:
            # Go back to the question they were struggling with
            q_num = self.session.remediation_q
            if q_num > 0:
                self.session.state = [s for s, n in STATE_TO_QNUM.items() if n == q_num][0]
                return self._serve_question(q_num)
            return self._advance_to_q1()

        # --- MASTERY: student says "next" → complete ---
        if state == TutorState.MASTERY:
            self.session.state = TutorState.COMPLETE
            return "Node complete! Ready for the next topic."

        return "I'm not sure what to do next. Type 'test me' to start."

    def _serve_introduce(self) -> str:
        """Serve the TEXT_WALKTHROUGH as the introduction."""
        walkthrough = self.parsed.get("text_walkthrough", "")
        title = self.parsed.get("title", self.node_id)
        definition = self.parsed.get("definition", "")

        content = f"**{title}**\n\n"
        if definition:
            content += f"{definition}\n\n"
        if walkthrough:
            content += f"{walkthrough}\n\n"
        content += "---\n\n"
        content += "Type **ready** to start the diagnostic questions, "
        content += "or **simplify** for a simpler explanation."
        return content

    def _has_discussion_moment(self) -> bool:
        """Check if this node should trigger a discussion moment.

        Triggers when COMMON_MISCONCEPTION field is rich enough to generate
        a meaningful debate.
        """
        misconception = self.parsed.get("common_misconception", "")
        # Need at least 100 chars of misconception content for a good debate
        return len(misconception) >= 100

    def _serve_discussion(self) -> str:
        """Serve a multi-agent discussion moment.

        Uses discussion_moments module if available, otherwise generates
        a simple debate from the misconception field.
        """
        try:
            from backend.its.tutoring.discussion_moments import generate_discussion
            discussion = generate_discussion(self.parsed)
            if discussion:
                return discussion
        except Exception as exc:
            logger.debug("Discussion module unavailable: %s", exc)

        # Fallback: simple misconception prompt
        misconception = self.parsed.get("common_misconception", "")
        content = "**Think about this:**\n\n"
        content += misconception[:500]
        content += "\n\n---\n\n"
        content += "Do you think this misconception is true or false? "
        content += "Type your thoughts, then we'll start the questions."
        return content

    def _advance_to_q1(self) -> str:
        """Advance to the first diagnostic question."""
        if not self.questions:
            self.session.state = TutorState.MASTERY
            return self._serve_mastery()

        self.session.state = TutorState.PROBE_Q1
        self.session.current_q = 1
        return self._serve_question(1)

    def _serve_question(self, q_num: int) -> str:
        """Serve a diagnostic question."""
        q = next((dq for dq in self.questions if dq.get("q_num") == q_num), None)
        if not q:
            return f"Question {q_num} not found."

        bloom = q.get("bloom_level", BLOOM_LABELS.get(q_num, "unknown"))
        question_text = q.get("question", "")
        answer_type = q.get("answer_type", "text")

        content = f"**Question {q_num}** ({bloom}):\n\n"
        content += f"{question_text}\n\n"

        if answer_type == "mcq" and q.get("options"):
            content += "**Options:**\n"
            for i, opt in enumerate(q["options"]):
                letter = chr(65 + i)  # A, B, C, D
                content += f"  {letter}. {opt}\n"
            content += "\nType the letter or the option text."

        content += "\nType 'hint' for a clue, or 'simplify' for a simpler explanation."
        return content

    def _handle_answer(
        self, q_num: int, student_input: str, is_correct: bool | None
    ) -> str:
        """Handle a student's answer to a diagnostic question."""
        q = next((dq for dq in self.questions if dq.get("q_num") == q_num), None)
        if not q:
            return f"Question {q_num} not found."

        # Track attempt
        self.session.attempts[q_num] = self.session.attempts.get(q_num, 0) + 1

        # Check for hint request
        if student_input.lower().strip() in ("hint", "clue", "help"):
            return self._serve_hint(q_num)

        # Check for simplify request
        if student_input.lower().strip() in ("simplify", "eli5", "simple"):
            self.session.state = TutorState.SIMPLIFY
            self.session.remediation_q = q_num
            return self._serve_simplify()

        # Evaluate the answer
        if is_correct is None:
            is_correct = self._evaluate_answer(q, student_input)

        # Record the answer
        self.session.answers[q_num] = student_input
        score = 1.0 if is_correct else 0.0
        self.session.results[q_num] = {
            "correct": is_correct,
            "score": score,
            "cognitive_type": q.get("bloom_level", ""),
            "attempts": self.session.attempts[q_num],
        }

        if is_correct:
            # Award XP
            xp = 10 + (q_num * 2)  # Higher Bloom = more XP
            self.session.xp_earned += xp
            feedback = f"✓ **Correct!** ({q.get('bloom_level', '')}) +{xp} XP\n\n"

            # Move to next question or mastery
            next_state = QNUM_TO_NEXT_STATE.get(q_num, TutorState.MASTERY)
            if next_state == TutorState.MASTERY:
                self.session.state = TutorState.MASTERY
                return feedback + self._serve_mastery()

            next_q_num = STATE_TO_QNUM[next_state]
            self.session.state = next_state
            self.session.current_q = next_q_num
            return feedback + self._serve_question(next_q_num)

        else:
            # Wrong answer — track failure
            if q_num not in self.session.failed:
                self.session.failed.append(q_num)

            # Show feedback + model answer
            model_answer = q.get("answer", "")
            hint = q.get("hint", "")
            feedback = f"✗ **Not quite.** ({q.get('bloom_level', '')})\n\n"

            # After 2 wrong attempts, go to remediation
            if self.session.attempts[q_num] >= 2:
                self.session.state = TutorState.REMEDIATE
                self.session.remediation_q = q_num
                feedback += f"**Model Answer:** {model_answer}\n\n"
                return feedback + self._serve_remediation()

            # First wrong attempt — offer hint
            feedback += f"**Hint:** {hint}\n\n" if hint else ""
            feedback += "Try again, or type 'hint' for another clue, 'simplify' for ELI5, "
            feedback += "or 'show answer' to see the answer."
            return feedback

    def _evaluate_answer(self, q: dict, student_input: str) -> bool:
        """Simple deterministic answer evaluation.

        For MCQ: check if student selected the correct option.
        For text: check if answer matches (case-insensitive substring).
        For number: check if numeric value matches.

        In production, this would use hybrid_evaluator.py.
        For the state machine test, we use simple matching.
        """
        answer_type = q.get("answer_type", "text")
        correct_answer = q.get("answer", "").strip()
        student = student_input.strip()

        if answer_type == "mcq":
            options = q.get("options", [])
            # Find which option the student selected
            selected = None
            # Check by letter (A, B, C, D)
            if len(student) == 1 and student.upper() in "ABCDEFGH":
                idx = ord(student.upper()) - 65
                if 0 <= idx < len(options):
                    selected = options[idx]
            # Check by text match
            if selected is None:
                for opt in options:
                    if student.lower() == opt.lower():
                        selected = opt
                        break
            if selected is None:
                return False
            # Correct if selected matches the answer
            return selected.lower() == correct_answer.lower()

        elif answer_type == "number":
            try:
                # Extract numbers from both
                import re
                student_nums = re.findall(r"-?\d+\.?\d*", student)
                answer_nums = re.findall(r"-?\d+\.?\d*", correct_answer)
                if student_nums and answer_nums:
                    return abs(float(student_nums[0]) - float(answer_nums[0])) < 0.01
            except (ValueError, IndexError):
                pass
            return False

        else:  # text
            # Simple case-insensitive substring match
            # In production, use embedding similarity
            student_lower = student.lower()
            answer_lower = correct_answer.lower()
            # Check if key words from the answer appear in the student's response
            answer_words = set(answer_lower.split()) - {"the", "a", "an", "is", "are",
                                                        "of", "and", "or", "in", "to"}
            if not answer_words:
                return student_lower == answer_lower
            matches = sum(1 for w in answer_words if w in student_lower)
            return matches >= len(answer_words) * 0.6  # 60% keyword overlap

    def _serve_hint(self, q_num: int) -> str:
        """Serve a progressive hint for the current question."""
        q = next((dq for dq in self.questions if dq.get("q_num") == q_num), None)
        if not q:
            return "No hint available."

        level = self.session.hint_level.get(q_num, 0)
        level = min(level + 1, 3)
        self.session.hint_level[q_num] = level

        hint = q.get("hint", "")
        working = q.get("working", "")
        answer = q.get("answer", "")

        if level == 1:
            # Nudge — just the hint
            return f"**Hint (Level 1 — Nudge):**\n{hint}\n\nTry again."
        elif level == 2:
            # Scaffold — hint + first step of working
            first_step = working.split(".")[0] if working else ""
            return f"**Hint (Level 2 — Scaffold):**\n{hint}\n\nFirst step: {first_step}\n\nTry again."
        else:
            # Bridge — near-complete answer
            # Show first few words of answer
            words = answer.split()
            partial = " ".join(words[:max(3, len(words) // 2)])
            return f"**Hint (Level 3 — Bridge):**\n{hint}\n\nThe answer starts with: {partial}...\n\nTry to complete it."

    def _serve_remediation(self) -> str:
        """Serve remediation content for the failed question."""
        q_num = self.session.remediation_q
        remediation_paths = self.parsed.get("remediation_paths", {})
        misconception = self.parsed.get("common_misconception", "")
        eli5 = self.parsed.get("eli5", "")

        # Find remediation path for this question
        path_key = f"Q{q_num}_FAILS"
        path = remediation_paths.get(path_key, {})
        review_node = path.get("review", "none")
        guidance = path.get("guidance", "")

        content = "**Remediation Time**\n\n"

        if misconception:
            content += f"**Common Misconception:**\n{misconception[:400]}\n\n"

        if eli5:
            content += f"**Simply Put (ELI5):**\n{eli5[:400]}\n\n"

        if guidance:
            content += f"**Guidance:**\n{guidance}\n\n"

        if review_node and review_node != "none":
            content += f"**Review prerequisite:** {review_node}\n\n"

        content += "---\n\n"
        content += "Type 'retry' to try the question again, "
        content += "or 'skip' to move to the next question."
        return content

    def _handle_remediation_response(
        self, student_input: str, is_correct: bool | None
    ) -> str:
        """Handle student response after remediation."""
        q_num = self.session.remediation_q
        student = student_input.lower().strip()

        if student in ("skip", "next", "move on"):
            # Move to next question
            next_q = q_num + 1
            next_state = QNUM_TO_NEXT_STATE.get(q_num, TutorState.MASTERY)
            if next_state == TutorState.MASTERY:
                self.session.state = TutorState.MASTERY
                return self._serve_mastery()
            self.session.state = next_state
            self.session.current_q = next_q
            return f"Moving on.\n\n" + self._serve_question(next_q)

        # Retry — evaluate the answer
        if is_correct is None:
            q = next((dq for dq in self.questions if dq.get("q_num") == q_num), None)
            if q:
                is_correct = self._evaluate_answer(q, student_input)

        if is_correct:
            # Correct after remediation — update result and move on
            self.session.results[q_num] = {
                "correct": True,
                "score": 0.7,  # Partial credit for getting it after remediation
                "cognitive_type": BLOOM_LABELS.get(q_num, ""),
                "remediated": True,
            }
            if q_num in self.session.failed:
                self.session.failed.remove(q_num)
            self.session.xp_earned += 5

            next_state = QNUM_TO_NEXT_STATE.get(q_num, TutorState.MASTERY)
            if next_state == TutorState.MASTERY:
                self.session.state = TutorState.MASTERY
                return f"✓ **Correct after remediation!** +5 XP\n\n" + self._serve_mastery()
            next_q = STATE_TO_QNUM[next_state]
            self.session.state = next_state
            self.session.current_q = next_q
            return f"✓ **Correct after remediation!** +5 XP\n\n" + self._serve_question(next_q)
        else:
            # Still wrong — show answer and move on
            q = next((dq for dq in self.questions if dq.get("q_num") == q_num), None)
            model_answer = q.get("answer", "") if q else ""
            self.session.results[q_num] = {
                "correct": False,
                "score": 0.0,
                "cognitive_type": BLOOM_LABELS.get(q_num, ""),
                "remediated": True,
                "still_failing": True,
            }
            next_state = QNUM_TO_NEXT_STATE.get(q_num, TutorState.MASTERY)
            if next_state == TutorState.MASTERY:
                self.session.state = TutorState.MASTERY
                return f"**Model Answer:** {model_answer}\n\n" + self._serve_mastery()
            next_q = STATE_TO_QNUM[next_state]
            self.session.state = next_state
            self.session.current_q = next_q
            return f"**Model Answer:** {model_answer}\n\nLet's move to the next question.\n\n" + self._serve_question(next_q)

    def _serve_simplify(self) -> str:
        """Serve the ELI5 simplified explanation."""
        eli5 = self.parsed.get("eli5", "")
        if not eli5:
            return "No simplified explanation available. Type 'ready' to continue."

        content = "**Simply Put (ELI5):**\n\n"
        content += eli5
        content += "\n\n---\n\n"
        content += "Type 'ready' to go back to the question."
        return content

    def _serve_mastery(self) -> str:
        """Serve the mastery scorecard with CDM diagnosis."""
        results = self.session.results
        failed = self.session.failed

        # Build Bloom scorecard
        bloom_scores: dict[str, dict] = {}
        for q_num, res in results.items():
            bloom = res.get("cognitive_type", "unknown")
            if bloom not in bloom_scores:
                bloom_scores[bloom] = {"correct": 0, "total": 0}
            bloom_scores[bloom]["total"] += 1
            if res.get("correct"):
                bloom_scores[bloom]["correct"] += 1

        scorecard_lines = []
        for bloom, data in sorted(bloom_scores.items()):
            icon = "✓" if data["correct"] == data["total"] else ("◐" if data["correct"] > 0 else "✗")
            scorecard_lines.append(f"  {icon} **{bloom.title()}**: {data['correct']}/{data['total']}")

        all_scores = [r.get("score", 0) for r in results.values()]
        overall = sum(all_scores) / len(all_scores) if all_scores else 0
        overall = max(0.0, min(1.0, overall))
        all_correct = len(failed) == 0

        # Run CDM diagnosis
        diagnosis_text = ""
        if self.q_matrix.get("matrix"):
            try:
                diagnosis = diagnose_from_diag_results(self.q_matrix, results)
                self.session.diagnosis = diagnosis
                diagnosis_text = f"\n\n**Cognitive Diagnosis:**\n"
                diagnosis_text += f"  Has skills: {diagnosis.missing_skills == [] and 'all' or 'partial'}\n"
                if diagnosis.missing_skills:
                    diagnosis_text += f"  Missing skills: {', '.join(diagnosis.missing_skills[:5])}\n"
                diagnosis_text += f"  Confidence: {diagnosis.confidence:.0%}\n"
            except Exception as exc:
                logger.debug("CDM diagnosis failed: %s", exc)

        content = (
            f"**Diagnostic Complete!**\n\n"
            f"**Overall Score: {overall:.0%}**\n\n"
            f"**Bloom Scorecard:**\n{'\n'.join(scorecard_lines)}\n"
            f"{diagnosis_text}\n"
            f"**XP Earned:** {self.session.xp_earned}\n\n"
        )

        if all_correct:
            content += "Excellent! You've demonstrated mastery across all cognitive levels.\n"
            content += "Type 'next' to move to the next topic."
        else:
            content += f"You missed {len(failed)} question(s). "
            content += "The cognitive diagnosis above shows which specific skills need work.\n"
            content += "Type 'next' to move on, or 'review' to revisit failed questions."

        self.session.state = TutorState.MASTERY
        return content

    def get_diagnosis(self) -> DiagnosisResult | None:
        """Get the CDM diagnosis result (available after MASTERY state)."""
        return self.session.diagnosis

    def get_session_summary(self) -> dict:
        """Get a summary of the session for logging/analytics."""
        return {
            "node_id": self.node_id,
            "state": self.session.state.value,
            "questions_answered": len(self.session.answers),
            "questions_correct": sum(1 for r in self.session.results.values() if r.get("correct")),
            "questions_failed": len(self.session.failed),
            "xp_earned": self.session.xp_earned,
            "diagnosis": self.session.diagnosis.to_dict() if self.session.diagnosis else None,
            "attempts_per_q": self.session.attempts,
        }
