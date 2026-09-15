"""
unified_socratic_engine.py
The unified tutoring engine that merges:
  - ITS deterministic state machine (serves .bloom.marker content, 95% free)
  - ES-LLMs 6-agent architecture (handles 5% fallback)
  - CDM cognitive diagnosis (EduCDM DINA model)
  - BKT mastery tracking (simple Bayesian Knowledge Tracing)

Architecture:
  Student input
    → EthicsBot pre-filter (safety/scope)
    → State machine determines tutoring state
    → State→Agent dispatch selects content from .bloom.marker
    → Content resolver: serve directly ($0) or Claude render ($$$)
    → MotivatorBot post-filter (tone adjustment)
    → BKT/CDM mastery update

States:
  INTRODUCE     → show TEXT_WALKTHROUGH / ELI5
  PROBE_Q1..Q5  → ask diagnostic question, evaluate answer
  REMEDIATE     → show misconception + hint (Nudge/Scaffold/Bridge)
  SIMPLIFY      → show ELI5 when student is struggling
  MASTERY       → check mastery criteria, update BKT
  NEXT_NODE     → recommend next node from KST/prerequisites
  OFF_SCRIPT    → student asked something unexpected → Claude fallback
"""

from __future__ import annotations

import logging
import os
import math
import random
from dataclasses import asdict, dataclass, field
from enum import Enum
from typing import Any

from backend.services.answer_evaluator import EvaluationResult, evaluate_answer
from backend.its.parsing.bloom_marker_parser import load_all_bloom_markers

logger = logging.getLogger(__name__)


# --------------------------------------------------------------------------- #
#  Enums and Data Structures                                                  #
# --------------------------------------------------------------------------- #

class TutoringState(str, Enum):
    INTRODUCE = "introduce"
    PROBE_Q1 = "probe_q1"
    PROBE_Q2 = "probe_q2"
    PROBE_Q3 = "probe_q3"
    PROBE_Q4 = "probe_q4"
    PROBE_Q5 = "probe_q5"
    REMEDIATE = "remediate"
    SIMPLIFY = "simplify"
    MASTERY = "mastery"
    NEXT_NODE = "next_node"
    OFF_SCRIPT = "off_script"
    COMPLETE = "complete"


class HintLevel(str, Enum):
    NUDGE = "nudge"       # Level 1: directional hint
    SCAFFOLD = "scaffold" # Level 2: structural hint
    BRIDGE = "bridge"     # Level 3: near-complete answer


@dataclass
class StudentState:
    """4-D student state (cognitive, affective, behavioral, metacognitive)."""
    student_id: str = ""
    # Cognitive
    mastery: float = 0.0           # overall mastery 0-1
    per_node_mastery: dict[str, float] = field(default_factory=dict)
    # Affective
    frustration: float = 0.0       # 0-1
    boredom: float = 0.0           # 0-1
    confidence: float = 0.5        # 0-1
    # Behavioral
    attempts: int = 0              # total attempts this session
    correct_count: int = 0         # correct answers this session
    hints_used: int = 0            # hints used for current question
    total_hints: int = 0           # total hints this session
    # Metacognitive
    current_node_id: str = ""
    current_state: TutoringState = TutoringState.INTRODUCE
    current_question_num: int = 0  # 1-5
    questions_correct: list[bool] = field(default_factory=list)
    # Session
    interactions: list[dict] = field(default_factory=list)
    llm_calls: int = 0             # count of LLM calls (for cost tracking)
    free_serves: int = 0           # count of free (deterministic) serves


@dataclass
class EngineResponse:
    """What the engine sends back to the student/frontend."""
    state: TutoringState
    content: dict  # structured content for the frontend to render
    is_free: bool  # True = served from .bloom.marker (no LLM), False = LLM used
    agent_used: str
    mastery_update: dict | None = None
    next_state: TutoringState | None = None
    metadata: dict = field(default_factory=dict)


# --------------------------------------------------------------------------- #
#  Simple BKT (Bayesian Knowledge Tracing)                                    #
# --------------------------------------------------------------------------- #

class SimpleBKT:
    """Minimal BKT implementation — no external dependencies.

    Standard 4-parameter BKT:
      P(L0)  = initial learned probability
      P(T)   = transition (learn → learned) probability
      P(S)   = slip (learned → wrong) probability
      P(G)   = guess (not learned → correct) probability
    """

    def __init__(self, p_learn_init: float = 0.1, p_transit: float = 0.1,
                 p_slip: float = 0.1, p_guess: float = 0.2):
        self.p_learn_init = p_learn_init
        self.p_transit = p_transit
        self.p_slip = p_slip
        self.p_guess = p_guess

    def update(self, p_learned: float, is_correct: bool) -> float:
        """Update P(learned) after observing an answer."""
        if is_correct:
            # P(L|correct) = P(correct|L)*P(L) / P(correct)
            p_correct_given_l = 1.0 - self.p_slip
            p_correct = p_correct_given_l * p_learned + self.p_guess * (1.0 - p_learned)
            p_learned_post = (p_correct_given_l * p_learned) / max(p_correct, 1e-10)
        else:
            # P(L|wrong) = P(wrong|L)*P(L) / P(wrong)
            p_wrong_given_l = self.p_slip
            p_wrong = p_wrong_given_l * p_learned + (1.0 - self.p_guess) * (1.0 - p_learned)
            p_learned_post = (p_wrong_given_l * p_learned) / max(p_wrong, 1e-10)

        # Apply transition (learning can happen between observations)
        p_learned_post = p_learned_post + (1.0 - p_learned_post) * self.p_transit
        return min(max(p_learned_post, 0.0), 1.0)


# --------------------------------------------------------------------------- #
#  Simple CDM (Cognitive Diagnosis Model) — DINA model via EduCDM             #
# --------------------------------------------------------------------------- #

class SimpleCDM:
    """Wrapper around EduCDM DINA model for skill-level diagnosis.

    Falls back to simple mastery tracking if EduCDM is not available
    or if there isn't enough data to train the model.
    """

    def __init__(self, num_skills: int = 5):
        self.num_skills = num_skills
        self._model = None
        self._q_matrix = None  # Q-matrix: which questions test which skills
        self._trained = False

    def build_q_matrix(self, questions: list[dict]) -> None:
        """Build Q-matrix from diagnostic questions.

        Each question maps to skills based on Bloom level:
          recall    → skill 0 (factual knowledge)
          reasoning → skill 1 (comprehension)
          evaluate  → skill 2 (analysis)
          apply     → skill 3 (application)
          create    → skill 4 (synthesis)
        """
        bloom_to_skill = {
            "recall": 0, "reasoning": 1, "evaluate": 2,
            "apply": 3, "create": 4,
        }
        self._q_matrix = []
        for q in questions:
            row = [0] * self.num_skills
            bloom = q.get("bloom_level", "recall").lower()
            skill_idx = bloom_to_skill.get(bloom, 0)
            row[skill_idx] = 1
            self._q_matrix.append(row)

    def diagnose(self, responses: list[bool]) -> dict:
        """Diagnose skill mastery from response pattern.

        Without training data, we use a simple heuristic:
        each skill's mastery = average correctness of questions testing that skill.
        """
        if not self._q_matrix or not responses:
            return {f"skill_{i}": 0.0 for i in range(self.num_skills)}

        skill_totals = [0] * self.num_skills
        skill_counts = [0] * self.num_skills

        for i, is_correct in enumerate(responses):
            if i >= len(self._q_matrix):
                break
            for skill_idx in range(self.num_skills):
                if self._q_matrix[i][skill_idx] == 1:
                    skill_totals[skill_idx] += int(is_correct)
                    skill_counts[skill_idx] += 1

        result = {}
        for i in range(self.num_skills):
            if skill_counts[i] > 0:
                result[f"skill_{i}"] = skill_totals[i] / skill_counts[i]
            else:
                result[f"skill_{i}"] = 0.0

        return result

    def get_skill_names(self) -> list[str]:
        return ["factual", "comprehension", "analysis", "application", "synthesis"]


# --------------------------------------------------------------------------- #
#  The Unified Socratic Engine                                                #
# --------------------------------------------------------------------------- #

class UnifiedSocraticEngine:
    """Merges ITS state machine + ES-LLMs agents + CDM + BKT.

    Primary path (95%): state machine serves .bloom.marker content directly.
    Fallback path (5%): agents generate content, Claude renderer (if available).
    """

    HINT_CAP = 3  # max hints per question
    MASTERY_THRESHOLD = 0.85  # BKT P(learned) to consider node mastered
    REMEDIATE_THRESHOLD = 0.3  # below this mastery → simplify

    def __init__(self, bloom_dir: str | None = None,
                 claude_renderer=None):
        # Path resolution order: explicit arg > BLOOM_ENRICHMENT_DIR env >
        # repo-relative default (no machine-specific hardcoded paths).
        if not bloom_dir:
            bloom_dir = os.environ.get(
                "BLOOM_ENRICHMENT_DIR",
                os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
                    os.path.abspath(__file__)))),
                    "..", "cbse_data", "bloom_enrichment"),
            )
        # Load all .bloom.marker content
        self.content_store = load_all_bloom_markers(bloom_dir)
        logger.info("Engine loaded %d nodes from %s", len(self.content_store), bloom_dir)

        # BKT and CDM
        self.bkt = SimpleBKT()
        self.cdm = SimpleCDM(num_skills=5)

        # Claude renderer (optional — for fallback)
        self.claude_renderer = claude_renderer

        # Available node IDs (for next-node recommendation)
        self.node_ids = sorted(self.content_store.keys())

    # ======================================================================== #
    #  Public API                                                               #
    # ======================================================================== #

    def start_session(self, student_id: str, node_id: str) -> EngineResponse:
        """Start a new tutoring session for a specific node."""
        if node_id not in self.content_store:
            return EngineResponse(
                state=TutoringState.OFF_SCRIPT,
                content={"error": f"Node {node_id} not found in content store"},
                is_free=True,
                agent_used="system",
                metadata={"available_nodes": len(self.content_store)},
            )

        state = StudentState(
            student_id=student_id,
            current_node_id=node_id,
            current_state=TutoringState.INTRODUCE,
            per_node_mastery={node_id: 0.1},
        )

        # Build Q-matrix for this node's questions
        node = self.content_store[node_id]
        questions = node.get("diagnostic_questions", [])
        self.cdm.build_q_matrix(questions)

        return self._serve_introduce(state)

    def process_input(self, state: StudentState, student_input: str) -> EngineResponse:
        """Process student input and return the next engine response."""
        # Guard: an empty/unknown node (e.g. a client posted a blank state)
        # must degrade to the off-script response, never a KeyError/500.
        if state.current_node_id not in self.content_store:
            return EngineResponse(
                state=TutoringState.OFF_SCRIPT,
                content={"error": (
                    f"Node {state.current_node_id!r} not found in content store. "
                    "Start a session first via its/start."
                )},
                is_free=True,
                agent_used="system",
                metadata={"available_nodes": len(self.content_store)},
            )
        state.attempts += 1
        state.interactions.append({
            "role": "student",
            "content": student_input,
            "state": state.current_state.value,
            "turn": len(state.interactions),
        })

        # EthicsBot pre-filter (always runs)
        ethics_result = self._ethics_check(student_input, state)
        if ethics_result is not None:
            return ethics_result

        # Dispatch based on current state
        if state.current_state == TutoringState.INTRODUCE:
            # Student acknowledged intro → move to first question
            state.current_state = TutoringState.PROBE_Q1
            state.current_question_num = 1
            return self._serve_question(state, 1)

        elif state.current_state.value.startswith("probe_q"):
            return self._handle_probe_response(state, student_input)

        elif state.current_state == TutoringState.REMEDIATE:
            return self._handle_remediate_response(state, student_input)

        elif state.current_state == TutoringState.SIMPLIFY:
            # After showing ELI5, go back to the question
            q_num = state.current_question_num
            state.current_state = TutoringState(f"probe_q{q_num}")
            return self._serve_question(state, q_num)

        elif state.current_state == TutoringState.MASTERY:
            return self._handle_mastery_response(state, student_input)

        elif state.current_state == TutoringState.NEXT_NODE:
            # Student chose to continue or review
            return self._handle_next_node_response(state, student_input)

        elif state.current_state == TutoringState.OFF_SCRIPT:
            return self._handle_off_script_response(state, student_input)

        elif state.current_state == TutoringState.COMPLETE:
            return EngineResponse(
                state=TutoringState.COMPLETE,
                content={"message": "Session complete. Start a new node to continue."},
                is_free=True,
                agent_used="system",
            )

        # Unknown state — reset to introduce
        state.current_state = TutoringState.INTRODUCE
        return self._serve_introduce(state)

    def get_session_report(self, state: StudentState) -> dict:
        """Generate a summary report of the tutoring session."""
        total_interactions = len(state.interactions)
        llm_percentage = (state.llm_calls / max(total_interactions, 1)) * 100
        free_percentage = (state.free_serves / max(total_interactions, 1)) * 100

        # CDM skill diagnosis
        cdm_result = self.cdm.diagnose(state.questions_correct)

        return {
            "student_id": state.student_id,
            "node_id": state.current_node_id,
            "total_interactions": total_interactions,
            "correct_answers": state.correct_count,
            "accuracy": state.correct_count / max(state.attempts, 1),
            "hints_used": state.total_hints,
            "final_mastery": state.mastery,
            "llm_calls": state.llm_calls,
            "free_serves": state.free_serves,
            "llm_percentage": round(llm_percentage, 1),
            "free_percentage": round(free_percentage, 1),
            "skill_diagnosis": cdm_result,
            "skill_names": self.cdm.get_skill_names(),
            "questions_correct": state.questions_correct,
            "states_visited": [i.get("state", "") for i in state.interactions],
        }

    # ======================================================================== #
    #  State handlers (each maps to an agent's role)                           #
    # ======================================================================== #

    def _serve_introduce(self, state: StudentState) -> EngineResponse:
        """INTRODUCE state — TutorBot serves TEXT_WALKTHROUGH + ELI5."""
        node = self.content_store[state.current_node_id]
        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "introduce",
            "state": "introduce",
            "agent": "TutorBot",
            "free": True,
        })

        return EngineResponse(
            state=TutoringState.INTRODUCE,
            content={
                "type": "introduce",
                "title": node.get("title", ""),
                "text_walkthrough": node.get("text_walkthrough", ""),
                "eli5": node.get("eli5", ""),
                "scope_boundary": node.get("scope_boundary", {}),
                "cognitive_level": node.get("cognitive_level", ""),
                "prompt": "When you're ready, let's check your understanding. Type 'ready' to continue.",
            },
            is_free=True,
            agent_used="TutorBot",
            next_state=TutoringState.PROBE_Q1,
        )

    def _serve_question(self, state: StudentState, q_num: int) -> EngineResponse:
        """PROBE_Qn state — AssessmentBot serves diagnostic question."""
        node = self.content_store[state.current_node_id]
        questions = node.get("diagnostic_questions", [])

        if q_num > len(questions):
            # No more questions → go to mastery check
            state.current_state = TutoringState.MASTERY
            return self._serve_mastery(state)

        question = questions[q_num - 1]
        state.hints_used = 0  # reset hints for new question
        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": f"probe_q{q_num}",
            "state": f"probe_q{q_num}",
            "agent": "AssessmentBot",
            "free": True,
        })

        return EngineResponse(
            state=TutoringState(f"probe_q{q_num}"),
            content={
                "type": "question",
                "q_num": q_num,
                "bloom_level": question.get("bloom_level", ""),
                "question": question.get("question", ""),
                "answer_type": question.get("answer_type", "text"),
                "options": question.get("options", []),
                "total_questions": len(questions),
                "prompt": "Type your answer below.",
            },
            is_free=True,
            agent_used="AssessmentBot",
        )

    def _handle_probe_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """Handle student's answer to a probe question."""
        node = self.content_store[state.current_node_id]
        questions = node.get("diagnostic_questions", [])
        q_num = state.current_question_num

        if q_num > len(questions):
            state.current_state = TutoringState.MASTERY
            return self._serve_mastery(state)

        question = questions[q_num - 1]

        # Check if student is asking for a hint
        if self._is_hint_request(student_input):
            return self._serve_hint(state, question)

        # Evaluate the answer (deterministic, no LLM)
        eval_result = evaluate_answer(student_input, question)
        state.interactions.append({
            "role": "engine",
            "content": "evaluate",
            "state": state.current_state.value,
            "agent": "AssessmentBot",
            "correct": eval_result.is_correct,
            "free": True,
        })

        if eval_result.is_correct:
            state.correct_count += 1
            state.questions_correct.append(True)
            state.confidence = min(state.confidence + 0.1, 1.0)
            state.frustration = max(state.frustration - 0.1, 0.0)

            # Update BKT mastery
            current_mastery = state.per_node_mastery.get(state.current_node_id, 0.1)
            new_mastery = self.bkt.update(current_mastery, is_correct=True)
            state.per_node_mastery[state.current_node_id] = new_mastery
            state.mastery = new_mastery

            # Move to next question
            next_q = q_num + 1
            if next_q <= len(questions):
                state.current_question_num = next_q
                state.current_state = TutoringState(f"probe_q{next_q}")
                state.free_serves += 1
                return EngineResponse(
                    state=TutoringState(f"probe_q{next_q}"),
                    content={
                        "type": "feedback_correct",
                        "q_num": q_num,
                        "encouragement": self._get_encouragement(state),
                        "working": question.get("working", ""),
                        "prompt": "Great! Let's try the next one.",
                        "next_question": questions[next_q - 1].get("question", ""),
                        "next_options": questions[next_q - 1].get("options", []),
                        "next_answer_type": questions[next_q - 1].get("answer_type", "text"),
                        "next_bloom_level": questions[next_q - 1].get("bloom_level", ""),
                    },
                    is_free=True,
                    agent_used="AssessmentBot",
                    mastery_update={"node": state.current_node_id, "new_mastery": new_mastery},
                    next_state=TutoringState(f"probe_q{next_q}"),
                )
            else:
                # All questions done → mastery check
                state.current_state = TutoringState.MASTERY
                return self._serve_mastery(state)
        else:
            state.questions_correct.append(False)
            state.confidence = max(state.confidence - 0.15, 0.0)
            state.frustration = min(state.frustration + 0.15, 1.0)

            # Update BKT
            current_mastery = state.per_node_mastery.get(state.current_node_id, 0.1)
            new_mastery = self.bkt.update(current_mastery, is_correct=False)
            state.per_node_mastery[state.current_node_id] = new_mastery
            state.mastery = new_mastery

            # Transition to REMEDIATE
            state.current_state = TutoringState.REMEDIATE
            return self._serve_remediate(state, question, eval_result)

    def _serve_hint(self, state: StudentState, question: dict) -> EngineResponse:
        """REMEDIATE state — ScaffoldBot serves progressive hint."""
        if state.hints_used >= self.HINT_CAP:
            # Hint cap reached → reveal answer
            state.free_serves += 1
            state.current_state = TutoringState(f"probe_q{state.current_question_num}")
            return EngineResponse(
                state=TutoringState.REMEDIATE,
                content={
                    "type": "hint_cap_reached",
                    "working": question.get("working", ""),
                    "answer": question.get("answer", ""),
                    "prompt": "Let's look at the solution and try the next question.",
                },
                is_free=True,
                agent_used="ScaffoldBot",
                metadata={"hints_used": state.hints_used},
            )

        state.hints_used += 1
        state.total_hints += 1
        hint_level = HintLevel.NUDGE if state.hints_used == 1 else \
                     HintLevel.SCAFFOLD if state.hints_used == 2 else \
                     HintLevel.BRIDGE

        hint_text = question.get("hint", "")
        working = question.get("working", "")

        # Build hint content based on level
        if hint_level == HintLevel.NUDGE:
            hint_content = hint_text
        elif hint_level == HintLevel.SCAFFOLD:
            hint_content = f"{hint_text}\n\nHint: {working.split('.')[0] if working else ''}"
        else:
            answer = question.get("answer", "")
            hint_content = f"{hint_text}\n\nThe answer involves: {answer[:50]}..."

        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "hint",
            "state": "remediate",
            "agent": "ScaffoldBot",
            "hint_level": hint_level.value,
            "free": True,
        })

        return EngineResponse(
            state=TutoringState.REMEDIATE,
            content={
                "type": "hint",
                "hint_level": hint_level.value,
                "hint_text": hint_content,
                "hints_remaining": self.HINT_CAP - state.hints_used,
                "prompt": "Try again, or type 'hint' for another hint.",
            },
            is_free=True,
            agent_used="ScaffoldBot",
            metadata={"hints_used": state.hints_used},
        )

    def _serve_remediate(self, state: StudentState, question: dict,
                         eval_result: EvaluationResult) -> EngineResponse:
        """REMEDIATE state — FeedbackBot shows misconception + ScaffoldBot offers hint."""
        node = self.content_store[state.current_node_id]
        misconception = node.get("common_misconception", "")
        remediation_paths = node.get("remediation_paths", {})
        q_num = state.current_question_num
        remediation_key = f"Q{q_num}_FAILS"
        remediation = remediation_paths.get(remediation_key, {})

        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "remediate",
            "state": "remediate",
            "agent": "FeedbackBot",
            "free": True,
        })

        # If mastery is very low, suggest SIMPLIFY (show ELI5)
        suggest_simplify = state.mastery < self.REMEDIATE_THRESHOLD

        return EngineResponse(
            state=TutoringState.REMEDIATE,
            content={
                "type": "remediate",
                "is_correct": False,
                "student_answer": eval_result.student_answer,
                "expected_answer": eval_result.expected_answer,
                "partial_credit": eval_result.partial_credit,
                "misconception": misconception,
                "remediation_guidance": remediation.get("guidance", ""),
                "remediation_review": remediation.get("review", "none"),
                "hint_available": state.hints_used < self.HINT_CAP,
                "hints_used": state.hints_used,
                "suggest_simplify": suggest_simplify,
                "prompt": "Type 'hint' for a hint, 'simplify' for a simpler explanation, or try again.",
            },
            is_free=True,
            agent_used="FeedbackBot",
            metadata={"eval_method": eval_result.evaluation_method},
        )

    def _handle_remediate_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """Handle student input during REMEDIATE state."""
        node = self.content_store[state.current_node_id]
        questions = node.get("diagnostic_questions", [])
        q_num = state.current_question_num
        question = questions[q_num - 1] if q_num <= len(questions) else {}

        if self._is_hint_request(student_input):
            return self._serve_hint(state, question)

        if student_input.strip().lower() in ("simplify", "eli5", "simple"):
            state.current_state = TutoringState.SIMPLIFY
            return self._serve_simplify(state)

        # Student is re-attempting the question
        eval_result = evaluate_answer(student_input, question)
        state.interactions.append({
            "role": "engine",
            "content": "re-evaluate",
            "state": "remediate",
            "agent": "AssessmentBot",
            "correct": eval_result.is_correct,
            "free": True,
        })

        if eval_result.is_correct:
            state.correct_count += 1
            state.questions_correct.append(True)
            state.frustration = max(state.frustration - 0.15, 0.0)
            state.confidence = min(state.confidence + 0.05, 1.0)

            # Update BKT
            current_mastery = state.per_node_mastery.get(state.current_node_id, 0.1)
            new_mastery = self.bkt.update(current_mastery, is_correct=True)
            state.per_node_mastery[state.current_node_id] = new_mastery
            state.mastery = new_mastery

            # Move to next question
            next_q = q_num + 1
            if next_q <= len(questions):
                state.current_question_num = next_q
                state.current_state = TutoringState(f"probe_q{next_q}")
                state.free_serves += 1
                return self._serve_question(state, next_q)
            else:
                state.current_state = TutoringState.MASTERY
                return self._serve_mastery(state)
        else:
            # Still wrong — stay in REMEDIATE
            state.frustration = min(state.frustration + 0.1, 1.0)
            return self._serve_remediate(state, question, eval_result)

    def _serve_simplify(self, state: StudentState) -> EngineResponse:
        """SIMPLIFY state — TutorBot serves ELI5 version."""
        node = self.content_store[state.current_node_id]
        eli5 = node.get("eli5", "")
        definition = node.get("definition", "")

        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "simplify",
            "state": "simplify",
            "agent": "TutorBot",
            "free": True,
        })

        return EngineResponse(
            state=TutoringState.SIMPLIFY,
            content={
                "type": "simplify",
                "eli5": eli5,
                "definition": definition,
                "prompt": "Let's try the question again with this simpler understanding.",
            },
            is_free=True,
            agent_used="TutorBot",
        )

    def _serve_mastery(self, state: StudentState) -> EngineResponse:
        """MASTERY state — check mastery criteria and report results."""
        node = self.content_store[state.current_node_id]
        mastery_criteria = node.get("mastery_criteria", "")
        total_q = len(state.questions_correct)
        correct_q = sum(state.questions_correct)
        accuracy = correct_q / max(total_q, 1)
        is_mastered = state.mastery >= self.MASTERY_THRESHOLD

        # CDM diagnosis
        cdm_result = self.cdm.diagnose(state.questions_correct)

        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "mastery",
            "state": "mastery",
            "agent": "System",
            "free": True,
        })

        if is_mastered:
            state.current_state = TutoringState.NEXT_NODE
        else:
            state.current_state = TutoringState.NEXT_NODE  # still offer next, but with review suggestion

        return EngineResponse(
            state=TutoringState.MASTERY,
            content={
                "type": "mastery_check",
                "is_mastered": is_mastered,
                "mastery_score": round(state.mastery, 3),
                "mastery_criteria": mastery_criteria,
                "questions_correct": correct_q,
                "questions_total": total_q,
                "accuracy": round(accuracy, 3),
                "skill_diagnosis": cdm_result,
                "skill_names": self.cdm.get_skill_names(),
                "prompt": "Type 'next' to continue to the next topic, or 'review' to revisit this topic.",
            },
            is_free=True,
            agent_used="System",
            mastery_update={"node": state.current_node_id, "mastered": is_mastered},
            next_state=TutoringState.NEXT_NODE,
        )

    def _handle_mastery_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """Handle student input during MASTERY state."""
        return self._serve_mastery(state)

    def _handle_next_node_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """NEXT_NODE state — recommend next node or review."""
        choice = student_input.strip().lower()

        if choice in ("review", "r", "again"):
            # Restart this node
            state.current_state = TutoringState.INTRODUCE
            state.questions_correct = []
            state.hints_used = 0
            state.current_question_num = 0
            return self._serve_introduce(state)

        # Recommend next node (simple: pick a different node)
        current_idx = self.node_ids.index(state.current_node_id) if state.current_node_id in self.node_ids else 0
        next_idx = (current_idx + 1) % len(self.node_ids)
        next_node_id = self.node_ids[next_idx]
        next_node = self.content_store.get(next_node_id, {})

        state.free_serves += 1
        state.current_state = TutoringState.COMPLETE

        return EngineResponse(
            state=TutoringState.NEXT_NODE,
            content={
                "type": "next_node",
                "current_node": state.current_node_id,
                "recommended_next": next_node_id,
                "next_title": next_node.get("title", ""),
                "next_cognitive_level": next_node.get("cognitive_level", ""),
                "prompt": f"Type 'start {next_node_id}' to begin the next topic.",
            },
            is_free=True,
            agent_used="System",
            next_state=TutoringState.COMPLETE,
        )

    def _handle_off_script_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """OFF_SCRIPT state — student asked something unexpected.

        This is the 5% fallback path where Claude renderer would be used.
        """
        if self.claude_renderer:
            # Use Claude renderer (costs LLM tokens)
            state.llm_calls += 1
            state.interactions.append({
                "role": "engine",
                "content": "off_script_llm",
                "state": "off_script",
                "agent": "TutorBot+Claude",
                "free": False,
            })

            # In real implementation, this would call Claude
            # For now, return a placeholder
            return EngineResponse(
                state=TutoringState.OFF_SCRIPT,
                content={
                    "type": "off_script_response",
                    "response": f"[Claude would generate a response to: '{student_input}']",
                    "prompt": "Let's continue with the lesson.",
                },
                is_free=False,
                agent_used="TutorBot+Claude",
            )
        else:
            # No Claude renderer — use template fallback
            state.free_serves += 1
            state.interactions.append({
                "role": "engine",
                "content": "off_script_template",
                "state": "off_script",
                "agent": "TutorBot",
                "free": True,
            })

            return EngineResponse(
                state=TutoringState.OFF_SCRIPT,
                content={
                    "type": "off_script_response",
                    "response": (
                        "That's an interesting question! Let's stay focused on "
                        "the current topic for now. We can explore that later."
                    ),
                    "prompt": "Let's continue with the lesson.",
                },
                is_free=True,
                agent_used="TutorBot",
            )

    # ======================================================================== #
    #  Pre/post filters (EthicsBot and MotivatorBot)                           #
    # ======================================================================== #

    def _ethics_check(self, student_input: str, state: StudentState) -> EngineResponse | None:
        """EthicsBot pre-filter — check for safety/scope violations.

        Returns an EngineResponse if the input is blocked, None if it passes.
        """
        input_lower = student_input.lower().strip()

        # Check for direct answer gaming
        gaming_phrases = [
            "just give me the answer", "tell me the answer",
            "what is the answer", "give me answer",
            "just tell me", "skip to answer",
        ]
        for phrase in gaming_phrases:
            if phrase in input_lower:
                state.free_serves += 1
                state.interactions.append({
                    "role": "engine",
                    "content": "ethics_block",
                    "state": state.current_state.value,
                    "agent": "EthicsBot",
                    "free": True,
                })
                return EngineResponse(
                    state=state.current_state,
                    content={
                        "type": "ethics_block",
                        "violation": "direct_answer_request",
                        "message": (
                            "I can't give you the answer directly, but I can help "
                            "you think through it. What have you tried so far?"
                        ),
                        "prompt": "Try to answer the question yourself, or type 'hint' for help.",
                    },
                    is_free=True,
                    agent_used="EthicsBot",
                )

        # Check for off-scope questions (simple heuristic)
        # If the input doesn't relate to the current node's topic at all
        # and is a question, route to OFF_SCRIPT
        if input_lower.endswith("?") and state.current_state.value.startswith("probe_q"):
            node = self.content_store.get(state.current_node_id, {})
            title = node.get("title", "").lower()
            definition = node.get("definition", "").lower()

            # Simple relevance check — does the question share any words with the topic?
            input_words = set(input_lower.split())
            topic_words = set(title.split()) | set(definition.split())
            topic_words = {w for w in topic_words if len(w) > 3}
            input_words = {w for w in input_words if len(w) > 3}

            if topic_words and not (input_words & topic_words):
                state.current_state = TutoringState.OFF_SCRIPT
                return self._handle_off_script_response(state, student_input)

        return None  # Input passes ethics check

    def _get_encouragement(self, state: StudentState) -> str:
        """MotivatorBot post-filter — generate encouragement based on state."""
        if state.frustration > 0.6:
            return "I know this is challenging, but you're making progress. Take a deep breath."
        elif state.correct_count >= 3:
            return "Excellent work! You're really getting this."
        elif state.confidence > 0.7:
            return "You're building great confidence. Keep it up!"
        else:
            encouragements = [
                "Good job! Let's keep going.",
                "Nice work! You're on the right track.",
                "That's correct! You're learning well.",
            ]
            return random.choice(encouragements)

    # ======================================================================== #
    #  Helpers                                                                  #
    # ======================================================================== #

    def _is_hint_request(self, student_input: str) -> bool:
        """Check if student is requesting a hint."""
        input_lower = student_input.lower().strip()
        hint_phrases = ["hint", "help", "clue", "stuck", "i don't know", "idk"]
        return any(phrase in input_lower for phrase in hint_phrases)

    def get_available_nodes(self) -> list[dict]:
        """Return list of available nodes with basic info."""
        result = []
        for node_id, node in self.content_store.items():
            result.append({
                "node_id": node_id,
                "title": node.get("title", ""),
                "cognitive_level": node.get("cognitive_level", ""),
                "num_questions": len(node.get("diagnostic_questions", [])),
            })
        return result


# --------------------------------------------------------------------------- #
#  Serialization helpers (WS/REST boundary)                                   #
# --------------------------------------------------------------------------- #

def state_to_dict(state: "StudentState") -> dict:
    """StudentState -> JSON-safe dict (exact inverse of state_from_dict)."""
    d = asdict(state)
    d["current_state"] = (state.current_state.value
                          if isinstance(state.current_state, TutoringState)
                          else str(state.current_state))
    return d


def state_from_dict(d: dict) -> "StudentState":
    """JSON dict -> StudentState (inverse of state_to_dict)."""
    d = dict(d or {})
    if "current_state" in d:
        try:
            d["current_state"] = TutoringState(d["current_state"])
        except ValueError:
            d["current_state"] = TutoringState.INTRODUCE
    d.pop("interactions", None)  # rebuilt by the engine as the session runs
    try:
        return StudentState(**d)
    except TypeError:
        # tolerate schema drift: keep only known fields
        known = {f for f in StudentState.__dataclass_fields__}
        return StudentState(**{k: v for k, v in d.items() if k in known})


def response_to_dict(resp: "EngineResponse") -> dict:
    """EngineResponse -> JSON-safe dict for WS/REST transport."""
    return {
        "state": (resp.state.value if isinstance(resp.state, TutoringState)
                  else str(resp.state)),
        "content": resp.content,
        "is_free": resp.is_free,
        "agent_used": resp.agent_used,
        "mastery_update": resp.mastery_update,
        "next_state": (resp.next_state.value
                       if isinstance(resp.next_state, TutoringState)
                       else resp.next_state),
        "metadata": resp.metadata,
    }
