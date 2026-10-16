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
from typing import Any, Optional

from backend.services.answer_evaluator import EvaluationResult, evaluate_answer
from backend.its.parsing.bloom_marker_parser import load_all_bloom_markers
from backend.its.solver.socratic_moves import (
    diagnose_wrong_answer,
    elicit_move,
    match_misconception_family,
)

try:  # natural-voice layer (stdlib-only module, cheap import)
    from backend.services.tutor_voice import detect_hinglish
except ImportError:  # pragma: no cover - flat import path
    from services.tutor_voice import detect_hinglish  # type: ignore

try:  # Wave 9.8 L4: session language setting — utterance table
    from backend.its.tutoring import utterances as _U
except ImportError:  # pragma: no cover - flat import path
    from its.tutoring import utterances as _U  # type: ignore

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
    question_attempts: int = 0     # attempts at the CURRENT question
    surrender_count: int = 0       # answer-pleas on the current question
    question_revealed: bool = False  # answer already shown for this question
    # Metacognitive
    current_node_id: str = ""
    current_state: TutoringState = TutoringState.INTRODUCE
    current_question_num: int = 0  # 1-5
    questions_correct: list[bool] = field(default_factory=list)
    # Session
    interactions: list[dict] = field(default_factory=list)
    llm_calls: int = 0             # count of LLM calls (for cost tracking)
    free_serves: int = 0           # count of free (deterministic) serves
    # WS-TUTOR: diagnosis of the latest graded attempt on the current
    # question (socratic_moves.diagnose_wrong_answer output) -- feeds the
    # attempt-aware hint ladder.  None until the first attempt.
    last_attempt: dict | None = None
    # WS-TUTOR: sticky once any student input shows Devanagari / romanised
    # Hindi cues -- responses then carry a Hinglish voice block rendered
    # through services.tutor_voice (the existing voice path).
    prefers_hinglish: bool = False
    # Wave 9.8 L4: session language setting — "en" | "hi" | "hinglish",
    # settable via the tutor endpoint (its/start + its/input).  Routes the
    # tutor's own utterance templates through its.tutoring.utterances;
    # student text and node content are never translated.  Default "en".
    language: str = "en"


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

    # ------------------------------------------------------------------ #
    #  Wave 9.8 L4: session-language helpers                              #
    # ------------------------------------------------------------------ #

    @staticmethod
    def _lang(state: StudentState) -> str:
        return _U.lang_of(state)

    def _say(self, state: StudentState, key: str, **params) -> str:
        return _U.say(self._lang(state), key, **params)

    def start_session(self, student_id: str, node_id: str,
                      language: Optional[str] = None) -> EngineResponse:
        """Start a new tutoring session for a specific node.

        ``language`` ("en"|"hi"|"hinglish") is the session's tutor-utterance
        language — only the tutor's own template strings switch; student
        text and node content are never translated."""
        if node_id not in self.content_store:
            return EngineResponse(
                state=TutoringState.OFF_SCRIPT,
                content={"error": _U.say(language or "en",
                                         "msg_node_not_found")},
                is_free=True,
                agent_used="system",
                metadata={"available_nodes": len(self.content_store)},
            )

        state = StudentState(
            student_id=student_id,
            current_node_id=node_id,
            current_state=TutoringState.INTRODUCE,
            per_node_mastery={node_id: 0.1},
            language=_U.normalize_language(language) or "en",
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
                    _U.say(self._lang(state), "msg_node_not_found")
                    + " "
                    + _U.say(self._lang(state), "msg_start_first")
                )},
                is_free=True,
                agent_used="system",
                metadata={"available_nodes": len(self.content_store)},
            )
        # WS-TUTOR: sanitize client-held state before it can corrupt the
        # turn (crafted/malformed snapshots: NaN mastery, string counts,
        # negative question numbers).  The engine must never emit NaN.
        self._sanitize_state(state)

        state.attempts += 1
        state.interactions.append({
            "role": "student",
            "content": student_input,
            "state": state.current_state.value,
            "turn": len(state.interactions),
        })

        # Hinglish detection — once a student writes Hindi/Hinglish the
        # whole session mirrors it through the existing voice path.
        try:
            if detect_hinglish(student_input):
                state.prefers_hinglish = True
        except Exception:
            pass

        # EthicsBot pre-filter (always runs)
        ethics_result = self._ethics_check(student_input, state)
        if ethics_result is not None:
            return self._finalize(state, ethics_result)

        # Dispatch based on current state
        if state.current_state == TutoringState.INTRODUCE:
            # Student acknowledged intro → move to first question
            state.current_state = TutoringState.PROBE_Q1
            state.current_question_num = 1
            resp = self._serve_question(state, 1)

        elif state.current_state.value.startswith("probe_q"):
            resp = self._handle_probe_response(state, student_input)

        elif state.current_state == TutoringState.REMEDIATE:
            resp = self._handle_remediate_response(state, student_input)

        elif state.current_state == TutoringState.SIMPLIFY:
            # After showing ELI5, go back to the question
            q_num = state.current_question_num
            state.current_state = TutoringState(f"probe_q{q_num}")
            resp = self._serve_question(state, q_num)

        elif state.current_state == TutoringState.MASTERY:
            resp = self._handle_mastery_response(state, student_input)

        elif state.current_state == TutoringState.NEXT_NODE:
            # Student chose to continue or review
            resp = self._handle_next_node_response(state, student_input)

        elif state.current_state == TutoringState.OFF_SCRIPT:
            resp = self._handle_off_script_response(state, student_input)

        elif state.current_state == TutoringState.COMPLETE:
            resp = EngineResponse(
                state=TutoringState.COMPLETE,
                content={"message": self._say(state, "msg_complete")},
                is_free=True,
                agent_used="system",
            )

        else:
            # Unknown state — reset to introduce
            state.current_state = TutoringState.INTRODUCE
            resp = self._serve_introduce(state)

        return self._finalize(state, resp)

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
                "prompt": self._say(state, "prompt_introduce"),
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
        self._reset_question_counters(state)
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
                "prompt": self._say(state, "prompt_question"),
            },
            is_free=True,
            agent_used="AssessmentBot",
        )

    def _handle_probe_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """Handle student's answer to a probe question."""
        node = self.content_store[state.current_node_id]
        questions = node.get("diagnostic_questions", [])
        q_num = state.current_question_num

        if not (1 <= q_num <= len(questions)):
            # Malformed/drifted question index (e.g. a crafted snapshot
            # with current_state=probe_q1 but current_question_num=0,
            # which used to index questions[-1]): recover the index from
            # the state name, else finish the question loop honestly.
            try:
                q_num = int(state.current_state.value.rsplit("_q", 1)[1])
            except (ValueError, IndexError):
                q_num = 0
            if not (1 <= q_num <= len(questions)):
                state.current_state = TutoringState.MASTERY
                return self._serve_mastery(state)
            state.current_question_num = q_num

        question = questions[q_num - 1]

        # Check if student is asking for a hint
        if self._is_hint_request(student_input):
            return self._serve_hint(state, question)

        # Evaluate the answer (deterministic, no LLM)
        eval_result = evaluate_answer(student_input, question)
        state.question_attempts += 1
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
            state.last_attempt = None
            # L5: a verified success resolves this node's open mistakes
            # and resets the consecutive-miss flag (fire-and-forget).
            self._track_attempt(state, question, student_input, eval_result)

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
                self._reset_question_counters(state)
                state.free_serves += 1
                resp = EngineResponse(
                    state=TutoringState(f"probe_q{next_q}"),
                    content={
                        "type": "feedback_correct",
                        "q_num": q_num,
                        "encouragement": self._get_encouragement(state),
                        "working": question.get("working", ""),
                        "prompt": self._say(state, "prompt_correct_next"),
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
                self._attach_voice(state, resp, "celebrate_and_advance")
                return resp
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

            # WS-TUTOR: diagnose BEFORE remediating — the follow-up must
            # name the specific error pattern, not a generic "try again".
            state.last_attempt = diagnose_wrong_answer(
                student_input, question, eval_result)
            # L5: notebook + consecutive-miss flag (fire-and-forget).
            self._track_attempt(state, question, student_input, eval_result,
                                state.last_attempt)

            # Transition to REMEDIATE
            state.current_state = TutoringState.REMEDIATE
            return self._serve_remediate(state, question, eval_result)

    def _serve_hint(self, state: StudentState, question: dict) -> EngineResponse:
        """REMEDIATE state — ScaffoldBot serves progressive hint."""
        state.current_state = TutoringState.REMEDIATE
        if state.hints_used >= self.HINT_CAP:
            # Hint cap reached → reveal answer (once per question —
            # the reveal flags the question so a later surrender plea
            # can never double-penalize it)
            state.question_revealed = True
            state.free_serves += 1
            state.current_state = TutoringState(f"probe_q{state.current_question_num}")
            return EngineResponse(
                state=TutoringState.REMEDIATE,
                content={
                    "type": "hint_cap_reached",
                    "working": question.get("working", ""),
                    "answer": question.get("answer", ""),
                    "prompt": self._say(state, "prompt_hint_cap"),
                },
                is_free=True,
                agent_used="ScaffoldBot",
                metadata={"hints_used": state.hints_used},
            )

        state.hints_used += 1
        state.total_hints += 1

        # WS-TUTOR: the rung ALSO depends on what the student already
        # showed.  A high-quality attempt (right magnitude, one slip)
        # gets a check-your-arithmetic nudge, not the "here is the
        # formula" scaffold; a lost attempt escalates normally.
        attempt = state.last_attempt if isinstance(state.last_attempt, dict) else {}
        quality = attempt.get("quality")
        rung = state.hints_used  # 1..3 by count
        if isinstance(quality, (int, float)) and math.isfinite(quality):
            if quality >= 0.6:
                rung = 1                     # stay at NUDGE — one targeted fix
            elif quality >= 0.35:
                rung = min(rung, 2)          # cap at SCAFFOLD
        hint_level = (HintLevel.NUDGE, HintLevel.SCAFFOLD,
                      HintLevel.BRIDGE)[min(max(rung, 1), 3) - 1]

        hint_text = question.get("hint", "")
        working = question.get("working", "")
        attempt_feedback = attempt.get("follow_up") or ""

        # Build hint content based on level
        if hint_level == HintLevel.NUDGE:
            # attempt-aware nudge names the shown pattern before the
            # authored directional hint
            if attempt_feedback and quality is not None and quality >= 0.35:
                hint_content = (f"{attempt_feedback}"
                                + (f"\n\nHint: {hint_text}" if hint_text else ""))
            else:
                hint_content = hint_text
        elif hint_level == HintLevel.SCAFFOLD:
            scaffold = self._first_sentence(working)
            hint_content = (f"{attempt_feedback}\n\n" if attempt_feedback else "") + \
                (f"{hint_text}\n\nHint: {scaffold}" if hint_text
                 else f"Hint: {scaffold}")
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

        resp = EngineResponse(
            state=TutoringState.REMEDIATE,
            content={
                "type": "hint",
                "hint_level": hint_level.value,
                "hint_text": hint_content,
                "hints_remaining": self.HINT_CAP - state.hints_used,
                "attempt_aware": isinstance(quality, (int, float)),
                "attempt_pattern": attempt.get("pattern"),
                "attempt_feedback": attempt_feedback or None,
                "prompt": self._say(state, "prompt_hint_retry"),
            },
            is_free=True,
            agent_used="ScaffoldBot",
            metadata={
                "hints_used": state.hints_used,
                "attempt_aware": isinstance(quality, (int, float)),
                "attempt_quality": quality,
                "attempt_pattern": attempt.get("pattern"),
            },
        )
        self._attach_voice(state, resp, "hint_progressive",
                           {"hint": hint_content})
        return resp

    def _serve_remediate(self, state: StudentState, question: dict,
                         eval_result: EvaluationResult) -> EngineResponse:
        """REMEDIATE state — FeedbackBot shows misconception + ScaffoldBot offers hint.

        WS-TUTOR (diagnose before hint): the follow-up question is built
        from the SPECIFIC error the student just made
        (socratic_moves.diagnose_wrong_answer) — sign flips, unit-factor
        slips, close arithmetic, wrong-quantity answers each get a named
        follow-up.  Where the node authors a misconception family
        (match_misconception_family), the catalog's authored elicit move
        speaks; otherwise the derived pattern speaks and the response is
        honestly marked misconception_source="derived".
        """
        node = self.content_store[state.current_node_id]
        authored_misconception = (node.get("common_misconception") or "").strip()
        remediation_paths = node.get("remediation_paths", {})
        q_num = state.current_question_num
        remediation_key = f"Q{q_num}_FAILS"
        remediation = remediation_paths.get(remediation_key, {})

        # Attempt diagnosis (already computed by the caller; recompute
        # defensively for any path that reached here without it).
        diag = state.last_attempt if isinstance(state.last_attempt, dict) else None
        if not diag or not diag.get("pattern"):
            diag = diagnose_wrong_answer(
                eval_result.student_answer, question, eval_result)
            state.last_attempt = diag

        # Choose the follow-up that NAMES the error pattern: prefer the
        # authored catalog elicit move when the node's misconception text
        # maps to a family, else the attempt-derived prompt.
        family = match_misconception_family(authored_misconception) \
            or diag.get("family")
        authored_elicit = elicit_move(family, eval_result.student_answer)
        follow_up = authored_elicit or diag["follow_up"]

        if authored_misconception:
            misconception_text = self._pick_misconception(
                authored_misconception, question, diag)
            misconception_source = "authored"
        else:
            misconception_text = (
                f"Detected error pattern: {diag['pattern']} — "
                f"{diag['detail']}")
            misconception_source = "derived"

        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "remediate",
            "state": "remediate",
            "agent": "FeedbackBot",
            "error_pattern": diag["pattern"],
            "free": True,
        })

        # If mastery is very low, suggest SIMPLIFY (show ELI5)
        suggest_simplify = state.mastery < self.REMEDIATE_THRESHOLD

        resp = EngineResponse(
            state=TutoringState.REMEDIATE,
            content={
                "type": "remediate",
                "is_correct": False,
                "student_answer": eval_result.student_answer,
                # never leak the expected answer before the cap/reveal —
                # the old payload shipped it verbatim, which IS dumping
                "expected_answer": "",
                "partial_credit": eval_result.partial_credit,
                "misconception": misconception_text,
                "misconception_source": misconception_source,
                "error_pattern": diag["pattern"],
                "follow_up": follow_up,
                "remediation_guidance": remediation.get("guidance", ""),
                "remediation_review": remediation.get("review", "none"),
                "hint_available": state.hints_used < self.HINT_CAP,
                "hints_used": state.hints_used,
                "suggest_simplify": suggest_simplify,
                "prompt": self._say(state, "prompt_remediate",
                                    follow_up=follow_up),
            },
            is_free=True,
            agent_used="FeedbackBot",
            metadata={
                "eval_method": eval_result.evaluation_method,
                "error_pattern": diag["pattern"],
                "misconception_source": misconception_source,
                "error_family": family,
                "attempt_quality": diag.get("quality"),
            },
        )
        # The existing voice path names the slip kindly (English pool
        # mirrors to the Hinglish pool when the student writes Hindi).
        # The slip text is the attempt follow-up — diagnose_slip() would
        # name the VERIFIED value, which is an answer leak pre-cap.
        slip = diag["follow_up"]
        self._attach_voice(state, resp, "misconception_correction",
                           {"slip": slip,
                            "expected": eval_result.expected_answer,
                            "got": eval_result.student_answer,
                            "first_step": self._first_sentence(
                                question.get("working") or "")})
        return resp

    @staticmethod
    def _first_sentence(text: str) -> str:
        """First sentence/step of a working block for voice render.

        Splits on newlines AND sentence ends (marker WORKING blocks are
        newline-separated steps with few '. ' boundaries — a '. '-only
        split dumps the WHOLE worked solution, answer included).  Never
        splits inside decimals ('0.8 s') and caps at 200 chars on a word
        boundary so the method's reveal can never smuggle the result.
        """
        import re as _re
        parts = _re.split(r"(?<=[.!?])\s+|\n+", (text or "").strip(),
                          maxsplit=1)
        first = parts[0].strip() if parts else ""
        if len(first) > 200:
            first = first[:200].rsplit(" ", 1)[0].rstrip(",;:") + "…"
        return first

    def _pick_misconception(self, authored: str, question: dict,
                            diag: dict) -> str:
        """Choose the most relevant item from a multi-item authored
        misconception block (nodes carry 'Misconception 1/2/3 ...').

        Scores each item by content-word overlap with the served
        question + working; falls back to the first item.  Never returns
        empty — callers only reach this when authored text exists."""
        import re as _re
        parts = _re.split(
            r"(?i)(?:^|\n)\s*(?:[-*•]\s*)?(?:misconception\s*\d*\s*:|\d+[.)]\s*भ्रम\s*:|भ्रम\s*:)",
            authored)
        parts = [p.strip() for p in parts if p and p.strip()]
        if len(parts) <= 1:
            return authored
        qtext = " ".join(str(question.get(k) or "") for k in
                         ("question", "working", "answer"))
        qwords = {w for w in _re.findall(r"[a-zA-Z]{4,}", qtext.lower())}
        best, best_score = parts[0], -1
        for p in parts:
            pwords = {w for w in _re.findall(r"[a-zA-Z]{4,}", p.lower())}
            score = len(qwords & pwords)
            if score > best_score:
                best, best_score = p, score
        return best if best_score >= 2 else parts[0]

    def _track_attempt(
        self,
        state: "StudentState",
        question: dict,
        student_input: str,
        eval_result,
        diag: Optional[dict] = None,
    ) -> None:
        """Wave 9.8 L5 (Contract B): append the graded attempt to the
        student's mistake notebook + advance the per-node struggle flag.

        Fire-and-forget: ``record_attempt_bg`` schedules the write on the
        running loop (the engine is sync but always runs under an async
        handler); no loop -> silent no-op.  Only UUID student ids reach
        the store — session labels/guests skip cleanly inside
        record_attempt (which itself never raises)."""
        try:
            from backend.services.struggle import record_attempt_bg
        except Exception:
            try:
                from services.struggle import record_attempt_bg  # type: ignore
            except Exception:
                return
        try:
            diagnosis = None
            if isinstance(diag, dict):
                diagnosis = str(
                    diag.get("follow_up") or diag.get("pattern") or ""
                ).strip() or None
            record_attempt_bg(
                user_id=getattr(state, "student_id", ""),
                node_id=getattr(state, "current_node_id", ""),
                question_text=str((question or {}).get("question") or "")[:4000],
                student_answer=str(student_input or "")[:1000],
                verdict_ok=bool(getattr(eval_result, "is_correct", False)),
                diagnosis=diagnosis,
                correct_path=(
                    {"steps": [str(s) for s in
                               ((question or {}).get("working") or "").split("\n")
                               if str(s).strip()][:12],
                     "answer": str((question or {}).get("answer") or "") or None}
                    if not getattr(eval_result, "is_correct", False) else None
                ),
                source="tutor",
            )
        except Exception:
            pass

    def _handle_remediate_response(self, state: StudentState, student_input: str) -> EngineResponse:
        """Handle student input during REMEDIATE state."""
        node = self.content_store[state.current_node_id]
        questions = node.get("diagnostic_questions", [])
        q_num = state.current_question_num
        # guard: q_num must be in range (was questions[-1] when q_num<=0)
        question = questions[q_num - 1] if 1 <= q_num <= len(questions) else {}

        if self._is_hint_request(student_input):
            return self._serve_hint(state, question)

        if student_input.strip().lower() in ("simplify", "eli5", "simple"):
            state.current_state = TutoringState.SIMPLIFY
            return self._serve_simplify(state)

        # Student is re-attempting the question
        eval_result = evaluate_answer(student_input, question)
        state.question_attempts += 1
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
            state.last_attempt = None
            # L5: verified success closes this node's open mistakes
            # (fire-and-forget).
            self._track_attempt(state, question, student_input, eval_result)

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
                resp = self._serve_question(state, next_q)
                self._attach_voice(state, resp, "celebrate_and_advance")
                return resp
            else:
                state.current_state = TutoringState.MASTERY
                return self._serve_mastery(state)
        else:
            # Still wrong — stay in REMEDIATE, diagnose the NEW attempt
            state.frustration = min(state.frustration + 0.1, 1.0)
            state.last_attempt = diagnose_wrong_answer(
                student_input, question, eval_result)
            # L5: notebook + consecutive-miss flag (fire-and-forget).
            self._track_attempt(state, question, student_input, eval_result,
                                state.last_attempt)
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

        resp = EngineResponse(
            state=TutoringState.SIMPLIFY,
            content={
                "type": "simplify",
                "eli5": eli5,
                "definition": definition,
                "prompt": self._say(state, "prompt_simplify"),
            },
            is_free=True,
            agent_used="TutorBot",
        )
        self._attach_voice(state, resp, "eli5_simple",
                         {"first_step": self._first_sentence(eli5)})
        return resp

    def _serve_mastery(self, state: StudentState) -> EngineResponse:
        """MASTERY state — check mastery criteria and report results."""
        node = self.content_store[state.current_node_id]
        mastery_criteria = node.get("mastery_criteria", "")
        total_q = len(state.questions_correct)
        correct_q = sum(state.questions_correct)
        accuracy = correct_q / max(total_q, 1)
        # never emit NaN: a crafted/legacy snapshot can smuggle a non-
        # finite mastery this far; clamp before it reaches the payload
        if not math.isfinite(state.mastery):
            state.mastery = 0.0
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

        resp = EngineResponse(
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
                "prompt": self._say(state, "prompt_mastery"),
            },
            is_free=True,
            agent_used="System",
            mastery_update={"node": state.current_node_id, "mastered": is_mastered},
            next_state=TutoringState.NEXT_NODE,
        )
        self._attach_voice(state, resp, "celebrate_and_advance")
        return resp

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
        if not self.node_ids:
            state.current_state = TutoringState.COMPLETE
            return EngineResponse(
                state=TutoringState.COMPLETE,
                content={"type": "complete",
                         "message": self._say(state, "msg_no_more_nodes")},
                is_free=True,
                agent_used="System",
            )
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
                "prompt": self._say(state, "prompt_next_node",
                                    node=next_node_id),
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
                    "prompt": self._say(state, "prompt_continue_lesson"),
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
                    "response": self._say(state, "msg_off_script"),
                    "prompt": self._say(state, "prompt_continue_lesson"),
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

        # Check for direct answer gaming / surrender.
        # WS-TUTOR honest surrender path: a student who flat-out asks for
        # the answer gets ONE redirect (teach, don't dump).  If they are
        # already engaged on this question (an attempt or a hint) or ask
        # a second time, the tutor surrenders the verified answer with
        # the full working — stonewalling forever is worse teaching than
        # an honest reveal.
        gaming_phrases = [
            "just give me the answer", "tell me the answer",
            "what is the answer", "give me answer",
            "just tell me", "skip to answer",
            "show me the answer", "i give up", "give up",
            "i surrender", "the answer please", "just show me",
            "what's the answer",
        ]
        for phrase in gaming_phrases:
            if phrase in input_lower:
                if self._in_question_state(state):
                    state.surrender_count += 1
                    # Wave 9.8 surrender-first: a student who asks for
                    # the answer while a question is live gets the best
                    # available (unverified-labelled) tier IMMEDIATELY —
                    # no hint-rung or prior-engagement precondition.
                    return self._serve_reveal(state)
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
                        "surrender_available": True,
                        "message": self._say(state, "msg_ethics_block"),
                        "prompt": self._say(state, "prompt_ethics_block"),
                    },
                    is_free=True,
                    agent_used="EthicsBot",
                )

        # Check for off-scope questions (simple heuristic)
        # If the input doesn't relate to the current node's topic at all
        # and is a question, route to OFF_SCRIPT
        if input_lower.endswith("?") and state.current_state.value.startswith("probe_q") and not self._is_hint_request(student_input):
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
            return self._say(state, "encourage_frustrated")
        elif state.correct_count >= 3:
            return self._say(state, "encourage_streak")
        elif state.confidence > 0.7:
            return self._say(state, "encourage_confident")
        else:
            return self._say(state, random.choice(
                ("encourage_pool_1", "encourage_pool_2",
                 "encourage_pool_3")))

    # ======================================================================== #
    #  Helpers                                                                  #
    # ======================================================================== #

    def _reset_question_counters(self, state: StudentState) -> None:
        """Reset per-question counters on EVERY transition to a new
        question — _serve_question, the correct-answer advance, and the
        reveal advance all land here (the correct path used to bypass
        the reset, leaking hint caps + attempt memory across questions).
        """
        state.hints_used = 0
        state.question_attempts = 0
        state.surrender_count = 0
        state.question_revealed = False
        state.last_attempt = None

    def _serve_reveal(self, state: StudentState) -> EngineResponse:
        """Honest surrender reveal (WS-TUTOR).

        The student explicitly asked for the answer after engaging (or
        asked twice).  Reveal the verified working + answer, count the
        question as NOT demonstrated (a reveal can never feed mastery),
        and move the session forward to the next question.
        """
        node = self.content_store[state.current_node_id]
        questions = node.get("diagnostic_questions", [])
        q_num = state.current_question_num
        question = questions[q_num - 1] if 1 <= q_num <= len(questions) else {}

        # A surrender is evidence against mastery — an honest BKT
        # negative observation, not a free pass.  Once per question:
        # a repeated plea (or a plea after the hint-cap reveal) must
        # never double-penalize.
        if not state.question_revealed:
            state.questions_correct.append(False)
            current_mastery = state.per_node_mastery.get(
                state.current_node_id, 0.1)
            new_mastery = self.bkt.update(current_mastery, is_correct=False)
        else:
            new_mastery = state.mastery
        state.question_revealed = True
        state.per_node_mastery[state.current_node_id] = new_mastery
        state.mastery = new_mastery

        state.free_serves += 1
        state.interactions.append({
            "role": "engine",
            "content": "reveal",
            "state": state.current_state.value,
            "agent": "TutorBot",
            "free": True,
        })

        # Wave 9.8: attach the best available Contract A tier for this
        # question (bank_similar / method_only / guided) — explicitly
        # labelled unverified.  Fail-open: a degraded lookup must never
        # block the reveal.
        tier_payload = None
        try:
            from backend.its.solver.tiered_response import (
                best_available_payload)
            from backend.its.solver.bank_answer import (
                context_from_node_id)
            tier_payload = best_available_payload(
                question.get("question", "") or "",
                context=context_from_node_id(state.current_node_id))
        except Exception:
            tier_payload = None

        content = {
            "type": "reveal",
            "surrendered": True,
            "verified": False,
            "q_num": q_num,
            "working": question.get("working", ""),
            "answer": question.get("answer", ""),
            "attempts_before_reveal": state.question_attempts,
            "hints_before_reveal": state.hints_used,
        }
        if tier_payload:
            content["tier_payload"] = tier_payload

        next_q = q_num + 1
        if next_q <= len(questions):
            nq = questions[next_q - 1]
            state.current_question_num = next_q
            state.current_state = TutoringState(f"probe_q{next_q}")
            self._reset_question_counters(state)
            content.update({
                "next_question": nq.get("question", ""),
                "next_options": nq.get("options", []),
                "next_answer_type": nq.get("answer_type", "text"),
                "next_bloom_level": nq.get("bloom_level", ""),
                "prompt": self._say(state, "prompt_reveal_next"),
            })
        else:
            state.current_state = TutoringState.MASTERY
            content["prompt"] = self._say(state, "prompt_reveal_mastery")

        resp = EngineResponse(
            state=TutoringState.REMEDIATE,
            content=content,
            is_free=True,
            agent_used="TutorBot",
            mastery_update={"node": state.current_node_id,
                            "new_mastery": new_mastery},
        )
        self._attach_voice(state, resp, "step_by_step_walk",
                         {"first_step": self._first_sentence(
                             question.get("working") or "")})
        return resp

    def _in_question_state(self, state: StudentState) -> bool:
        """True when a live diagnostic question is on the table."""
        if not (state.current_state == TutoringState.REMEDIATE
                or str(state.current_state.value).startswith("probe_q")):
            return False
        node = self.content_store.get(state.current_node_id) or {}
        questions = node.get("diagnostic_questions", [])
        return 1 <= state.current_question_num <= len(questions)

    def _sanitize_state(self, state: StudentState) -> None:
        """Coerce a client-held StudentState back into the legal domain.

        Crafted or stale snapshots can carry NaN/inf mastery, string
        counts, negative question numbers, or a non-list interactions
        log — every one of those used to flow straight into BKT and the
        response payload.  All scalar fields are clamped here, once per
        input, so the engine can never emit NaN.
        """
        for attr, default in (("mastery", 0.0), ("frustration", 0.0),
                              ("boredom", 0.0), ("confidence", 0.5)):
            v = getattr(state, attr, None)
            if not isinstance(v, (int, float)) or not math.isfinite(v):
                setattr(state, attr, default)
            else:
                setattr(state, attr, min(max(float(v), 0.0), 1.0))
        if not isinstance(state.per_node_mastery, dict):
            state.per_node_mastery = {}
        for k, v in list(state.per_node_mastery.items()):
            if not isinstance(v, (int, float)) or not math.isfinite(v):
                state.per_node_mastery[k] = 0.1
            else:
                state.per_node_mastery[k] = min(max(float(v), 0.0), 1.0)
        for attr in ("attempts", "correct_count", "hints_used",
                     "total_hints", "current_question_num",
                     "question_attempts", "surrender_count",
                     "llm_calls", "free_serves"):
            try:
                iv = int(getattr(state, attr, 0) or 0)
            except (TypeError, ValueError):
                iv = 0
            setattr(state, attr, max(iv, 0))
        # current_state may arrive as a raw string from direct callers
        if not isinstance(state.current_state, TutoringState):
            try:
                state.current_state = TutoringState(str(state.current_state))
            except ValueError:
                state.current_state = TutoringState.INTRODUCE
        if not isinstance(state.interactions, list):
            state.interactions = []
        elif len(state.interactions) > 400:
            del state.interactions[:-400]  # bound the round-trip payload

    def _last_student_text(self, state: StudentState) -> str:
        for it in reversed(state.interactions):
            if it.get("role") == "student":
                return str(it.get("content") or "")
        return ""

    def _attach_voice(self, state: StudentState, resp: EngineResponse,
                      template_id: str, extra_ctx: dict | None = None) -> None:
        """Attach the natural-voice block (services.tutor_voice — the
        existing voice path pinned by test_tutor_voice.py).

        English student -> English pool; Hinglish/Devanagari student ->
        the Hinglish pool (render() decides from student_text).  The
        voice field mirrors the /api/tutor-graph contract:
        {text, template_id, hinglish}."""
        try:
            from backend.services.tutor_voice import get_voice
        except Exception:
            return
        try:
            node = self.content_store.get(state.current_node_id) or {}
            student_text = self._last_student_text(state)
            ctx = {
                "student_id": state.student_id or "guest",
                "turn": state.attempts,
                "concept_title": node.get("title", ""),
                "student_text": student_text,
            }
            if extra_ctx:
                ctx.update(extra_ctx)
            lang = self._lang(state)
            # Wave 9.8 L4: an explicit session language renders the voice
            # line from the authored table (hi = Devanagari); the default
            # 'en' keeps the existing detect-driven voice path untouched.
            voice_text = ""
            if lang in ("hi", "hinglish"):
                voice_text = _U.say_voice(lang, template_id, ctx)
            if not voice_text:
                voice_text = get_voice().render(template_id, ctx)
            resp.content["voice"] = {
                "text": voice_text,
                "template_id": template_id,
                "hinglish": (lang == "hinglish"
                             or detect_hinglish(student_text)),
                "lang": lang,
            }
        except Exception:
            return  # voice is garnish — never break a serve over it

    def _finalize(self, state: StudentState, resp: EngineResponse) -> EngineResponse:
        """Post-filter for every response: Hinglish flag + NaN audit."""
        resp.content["lang"] = self._lang(state)
        if state.prefers_hinglish:
            resp.content["hinglish"] = True
            resp.metadata["hinglish"] = True
        # Last-line NaN audit on outbound numeric fields (crafted input
        # states are sanitized, but belt-and-braces is cheap here).
        mu = resp.mastery_update
        if isinstance(mu, dict):
            for k, v in list(mu.items()):
                if isinstance(v, float) and not math.isfinite(v):
                    mu[k] = 0.0
        return resp

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
    """JSON dict -> StudentState (inverse of state_to_dict).

    WS-TUTOR: ``interactions`` now round-trips (capped at the newest 200)
    — session memory must survive a reconnect; dropping it silently
    amputated the student's whole transcript on every resume.  Numeric
    fields are also coerced so a crafted snapshot can never smuggle NaN
    mastery into BKT.
    """
    d = dict(d or {})
    if "current_state" in d:
        try:
            d["current_state"] = TutoringState(d["current_state"])
        except ValueError:
            d["current_state"] = TutoringState.INTRODUCE
    if isinstance(d.get("interactions"), list):
        d["interactions"] = d["interactions"][-200:]
    else:
        d.pop("interactions", None)
    for attr, default in (("mastery", 0.0), ("frustration", 0.0),
                          ("boredom", 0.0), ("confidence", 0.5)):
        v = d.get(attr)
        if not isinstance(v, (int, float)) or not math.isfinite(v):
            d[attr] = default
        else:
            d[attr] = min(max(float(v), 0.0), 1.0)
    if isinstance(d.get("per_node_mastery"), dict):
        d["per_node_mastery"] = {
            k: (min(max(float(v), 0.0), 1.0)
                if isinstance(v, (int, float)) and math.isfinite(v)
                else 0.1)
            for k, v in d["per_node_mastery"].items()
        }
    if d.get("last_attempt") is not None and not isinstance(
            d["last_attempt"], dict):
        d.pop("last_attempt", None)
    # Wave 9.8 L4: language is a session setting — validate or fall back
    # to "en" so a crafted snapshot can never smuggle a bogus code in.
    d["language"] = _U.normalize_language(d.get("language")) or "en"
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
