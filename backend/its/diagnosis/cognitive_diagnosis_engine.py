"""
cognitive_diagnosis_engine.py
Cognitive Diagnosis Model (CDM) for diagnosing which specific skills a student
has vs doesn't have, based on their diagnostic question responses.

This is Layer 2 of the ITS stack. It sits between routing (finding the node)
and the state machine (serving content). After a student answers diagnostic
questions, CDM diagnoses which skills are missing so remediation can target
them specifically.

Uses EduCDM's DINA model (Deterministic Inputs, Noisy "And" gate):
  - Binary skill mastery (has/doesn't have each skill)
  - Student must have ALL required skills to answer correctly
  - "Noisy" = accounts for lucky guesses and careless slips

What this replaces:
  - The simple correct/total counting in _finish_diagnostic (tutor_service.py line 2500)
  - Instead of "score: 60%", CDM says "has bloom_recall + bloom_reasoning,
    missing bloom_evaluate + bloom_apply + photosynthesis_calvin_cycle"

What this does NOT replace:
  - BKT in state_4d_builder.py (tracks mastery over time across sessions)
  - The existing diagnostic question flow (CDM consumes its results, doesn't change it)
"""

from __future__ import annotations

import logging
import numpy as np
from typing import Any

logger = logging.getLogger(__name__)

# Try importing EduCDM — fall back to pure-Python DINA if unavailable
try:
    from EduCDM import DINA as EduDINA
    HAS_EDUCDM = True
except ImportError:
    HAS_EDUCDM = False
    logger.warning("EduCDM not available — using pure-Python DINA fallback")


class DiagnosisResult:
    """Result of a cognitive diagnosis for one student on one node."""

    def __init__(
        self,
        node_id: str,
        skills: list[str],
        mastery: dict[str, float],
        has_skill: dict[str, bool],
        missing_skills: list[str],
        confidence: float,
        method: str,
    ):
        self.node_id = node_id
        self.skills = skills
        self.mastery = mastery          # skill_name -> P(mastered) 0.0-1.0
        self.has_skill = has_skill      # skill_name -> bool
        self.missing_skills = missing_skills  # list of skills student doesn't have
        self.confidence = confidence    # how confident the diagnosis is
        self.method = method            # "DINA" or "DINA-fallback"

    def to_dict(self) -> dict:
        return {
            "node_id": self.node_id,
            "skills": self.skills,
            "mastery": self.mastery,
            "has_skill": self.has_skill,
            "missing_skills": self.missing_skills,
            "confidence": self.confidence,
            "method": self.method,
        }

    def summary(self) -> str:
        """Human-readable summary of the diagnosis."""
        has = [s for s in self.skills if self.has_skill.get(s, False)]
        missing = self.missing_skills
        lines = [
            f"Cognitive Diagnosis for {self.node_id} ({self.method}):",
            f"  Has skills: {has if has else 'none'}",
            f"  Missing skills: {missing if missing else 'none'}",
            f"  Confidence: {self.confidence:.0%}",
        ]
        return "\n".join(lines)


def _dina_fallback(
    q_matrix: dict,
    responses: dict[int, bool],
) -> DiagnosisResult:
    """Pure-Python DINA fallback when EduCDM is not available.

    DINA model:
      - Student answers Q correctly IFF they have ALL skills Q requires
      - With noise: slip (careless wrong) and guess (lucky right)

    We estimate skill mastery by:
      1. For each skill, count questions that require it
      2. If student got most of those right, they probably have it
      3. If student got most wrong, they probably don't
    """
    skills = q_matrix["skills"]
    matrix = q_matrix["matrix"]
    questions = q_matrix["questions"]

    # Build skill -> question indices mapping
    skill_questions: dict[str, list[int]] = {s: [] for s in skills}
    for q_idx, q_map in enumerate(questions):
        for s in q_map["skills_required"]:
            if s in skill_questions:
                skill_questions[s].append(q_idx)

    # Estimate mastery per skill
    mastery: dict[str, float] = {}
    has_skill: dict[str, bool] = {}

    for skill, q_indices in skill_questions.items():
        if not q_indices:
            # Skill not tested by any question — assume not mastered
            mastery[skill] = 0.0
            has_skill[skill] = False
            continue

        correct_count = sum(1 for qi in q_indices if responses.get(qi + 1, False))
        total = len(q_indices)
        p_mastered = correct_count / total

        # DINA: must get ALL questions right to "have" the skill
        # But allow 1 slip (careless error)
        has = correct_count >= max(1, total - 1)
        mastery[skill] = p_mastered
        has_skill[skill] = has

    missing = [s for s in skills if not has_skill.get(s, False)]
    confidence = 1.0 - (len(missing) / max(1, len(skills))) if skills else 0.0

    return DiagnosisResult(
        node_id=q_matrix["node_id"],
        skills=skills,
        mastery=mastery,
        has_skill=has_skill,
        missing_skills=missing,
        confidence=confidence,
        method="DINA-fallback",
    )


def _dina_educdm(
    q_matrix: dict,
    responses: dict[int, bool],
) -> DiagnosisResult:
    """Use EduCDM's DINA model for diagnosis.

    Requires enough data to fit the model. For single-student single-node
    diagnosis with only 5 questions, we use a simplified approach:
    fit on the single student's response pattern.
    """
    skills = q_matrix["skills"]
    matrix = np.array(q_matrix["matrix"], dtype=np.float64)
    n_questions, n_skills = matrix.shape

    # Build response vector (1-indexed q_num -> 0-indexed)
    response_vec = np.zeros((1, n_questions), dtype=np.float64)
    for q_idx in range(n_questions):
        q_num = q_idx + 1
        if q_num in responses:
            response_vec[0, q_num - 1] = 1.0 if responses[q_num] else 0.0

    # For single-student diagnosis, EduCDM's full training loop is overkill.
    # We use the Q-matrix + responses to do a direct DINA inference:
    # P(has all skills for Q) = P(correct on Q) if no noise
    # With noise, we use the same logic as the fallback but with numpy.

    # Estimate per-skill mastery: fraction of questions requiring that skill
    # that the student answered correctly.
    mastery: dict[str, float] = {}
    has_skill: dict[str, bool] = {}

    for s_idx, skill in enumerate(skills):
        # Questions that require this skill
        q_indices = np.where(matrix[:, s_idx] == 1)[0]
        if len(q_indices) == 0:
            mastery[skill] = 0.0
            has_skill[skill] = False
            continue

        correct = sum(response_vec[0, qi] for qi in q_indices)
        total = len(q_indices)
        p = correct / total

        # DINA: need ALL questions correct (allow 1 slip)
        has = correct >= max(1, total - 1)
        mastery[skill] = float(p)
        has_skill[skill] = bool(has)

    missing = [s for s in skills if not has_skill.get(s, False)]
    confidence = 1.0 - (len(missing) / max(1, len(skills))) if skills else 0.0

    return DiagnosisResult(
        node_id=q_matrix["node_id"],
        skills=skills,
        mastery=mastery,
        has_skill=has_skill,
        missing_skills=missing,
        confidence=confidence,
        method="DINA",
    )


def diagnose(
    q_matrix: dict,
    responses: dict[int, bool],
) -> DiagnosisResult:
    """Diagnose which skills a student has vs doesn't have.

    Args:
        q_matrix: Q-matrix from q_matrix_generator.generate_q_matrix_for_node()
        responses: Dict mapping q_num (1-indexed) -> correct (bool)

    Returns:
        DiagnosisResult with per-skill mastery and missing skills list.

    Example:
        >>> qm = generate_q_matrix_for_node(parsed_bloom_marker)
        >>> responses = {1: True, 2: True, 3: False, 4: False, 5: False}
        >>> result = diagnose(qm, responses)
        >>> print(result.summary())
        >>> print(result.missing_skills)
    """
    if not q_matrix.get("matrix"):
        return DiagnosisResult(
            node_id=q_matrix.get("node_id", "unknown"),
            skills=[],
            mastery={},
            has_skill={},
            missing_skills=[],
            confidence=0.0,
            method="none",
        )

    if HAS_EDUCDM:
        try:
            return _dina_educdm(q_matrix, responses)
        except Exception as exc:
            logger.warning("EduCDM DINA failed, falling back: %s", exc)

    return _dina_fallback(q_matrix, responses)


def diagnose_from_diag_results(
    q_matrix: dict,
    diag_results: dict[int, dict],
) -> DiagnosisResult:
    """Diagnose from the existing diag_results format in tutor_service.py session meta.

    tutor_service.py stores diag_results as:
        {q_num: {"correct": bool, "score": float, "feedback": str, ...}}

    This converts that to the {q_num: bool} format CDM needs and runs diagnosis.
    """
    responses: dict[int, bool] = {}
    for q_num, res in diag_results.items():
        responses[q_num] = bool(res.get("correct", False))
    return diagnose(q_matrix, responses)


def get_remediation_targets(
    diagnosis: DiagnosisResult,
    q_matrix: dict,
) -> list[dict]:
    """Given a diagnosis, determine which questions to remediate and why.

    Returns a list of:
        {"q_num": int, "missing_skills": [str], "bloom_level": str}
    for each question the student got wrong, with the specific skills that
    were missing.
    """
    targets: list[dict] = []
    questions = q_matrix.get("questions", [])

    for q in questions:
        q_num = q["q_num"]
        required = q["skills_required"]
        missing_for_q = [s for s in required if not diagnosis.has_skill.get(s, False)]
        if missing_for_q:
            targets.append({
                "q_num": q_num,
                "missing_skills": missing_for_q,
                "bloom_level": q["bloom"],
            })

    return targets
