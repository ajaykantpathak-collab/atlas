"""
test_its_stack.py
End-to-end test of the 4 ITS additions against real .bloom.marker files.

Tests:
  1. Q-matrix generation — verify all .bloom.marker files produce valid Q-matrices
  2. CDM diagnosis — verify skill diagnosis works with synthetic student responses
  3. KST path selection — verify next-node selection targets ~80% success
  4. State machine — verify full tutoring loop through 5 Bloom questions
  5. Discussion moments — verify debate generation from misconceptions
  6. Mode selector — verify subject-specific presentation modes
  7. End-to-end — synthetic students with different archetypes complete a full session
  8. Comparison — old system (simple scoring) vs new system (CDM + KST)

Run:
    cd D:\platform
    python -m backend.test_its_stack
"""

from __future__ import annotations

import os
import sys
import time
import random
import json
from pathlib import Path
from typing import Any

# Ensure we can import from backend
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.services.bloom_marker_parser import (
    parse_bloom_marker,
    load_all_bloom_markers,
)
from backend.services.q_matrix_generator import (
    generate_q_matrix_for_node,
    generate_q_matrices_for_directory,
    validate_q_matrix,
)
from backend.services.cognitive_diagnosis_engine import (
    diagnose,
    diagnose_from_diag_results,
    get_remediation_targets,
    DiagnosisResult,
)
from backend.services.kst_path_selector import (
    KnowledgeState,
    PrerequisiteGraph,
    select_next_node,
    build_prereq_graph_from_bloom_markers,
    estimate_success_probability,
)
from backend.services.socratic_state_machine import (
    SocraticStateMachine,
    TutorState,
    SessionState,
)
from backend.services.discussion_moments import (
    generate_discussion,
    generate_discussion_reveal,
    should_trigger_discussion,
)
from backend.services.mode_selector import (
    select_mode,
    render_introduce,
    PresentationMode,
)


# ─── Test helpers ───────────────────────────────────────────────────────────

BLOOM_DIR = r"D:\platform\cbse_data\bloom_enrichment"

PASS = 0
FAIL = 0
RESULTS: list[dict] = []


def report(name: str, passed: bool, detail: str = "") -> None:
    global PASS, FAIL
    status = "PASS" if passed else "FAIL"
    if passed:
        PASS += 1
    else:
        FAIL += 1
    line = f"  [{status}] {name}"
    if detail:
        line += f" — {detail}"
    print(line)
    RESULTS.append({"name": name, "passed": passed, "detail": detail})


def section(title: str) -> None:
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


# ─── Synthetic student archetypes ──────────────────────────────────────────

class SyntheticStudent:
    """A synthetic student with a specific learning archetype."""

    def __init__(self, name: str, archetype: str, accuracy: float):
        self.name = name
        self.archetype = archetype  # "strong", "average", "weak", "struggler"
        self.accuracy = accuracy    # 0.0-1.0 probability of correct answer
        self.knowledge_state = KnowledgeState()
        self.mastery_scores: dict[str, float] = {}
        self.nodes_completed: list[str] = []
        self.total_xp = 0
        self.total_questions = 0
        self.total_correct = 0
        self.diagnoses: list[DiagnosisResult] = []

    def answer_question(self, q: dict) -> tuple[str, bool]:
        """Simulate answering a diagnostic question."""
        self.total_questions += 1
        # Higher Bloom levels are harder — reduce accuracy for higher levels
        bloom = q.get("bloom_level", "recall").lower()
        difficulty_mod = {"recall": 0.0, "reasoning": -0.1, "evaluate": -0.15,
                         "apply": -0.2, "create": -0.25}
        effective_accuracy = max(0.05, self.accuracy + difficulty_mod.get(bloom, 0))

        is_correct = random.random() < effective_accuracy
        if is_correct:
            self.total_correct += 1
            # For MCQ, return the correct answer
            if q.get("answer_type") == "mcq" and q.get("options"):
                return q["answer"], True
            return q.get("answer", "correct answer"), True
        else:
            # Return a wrong answer
            if q.get("answer_type") == "mcq" and q.get("options"):
                wrong_opts = [o for o in q["options"] if o != q.get("answer", "")]
                if wrong_opts:
                    return random.choice(wrong_opts), False
            return "I'm not sure", False

    def summary(self) -> dict:
        accuracy = self.total_correct / max(1, self.total_questions)
        return {
            "name": self.name,
            "archetype": self.archetype,
            "accuracy": f"{accuracy:.0%}",
            "nodes_completed": len(self.nodes_completed),
            "total_xp": self.total_xp,
            "total_questions": self.total_questions,
            "total_correct": self.total_correct,
            "diagnoses_count": len(self.diagnoses),
            "missing_skills_found": sum(len(d.missing_skills) for d in self.diagnoses),
        }


# ─── Test 1: Q-matrix generation ───────────────────────────────────────────

def test_q_matrix_generation():
    section("TEST 1: Q-Matrix Generation")
    print("  Loading .bloom.marker files...")

    all_markers = load_all_bloom_markers(BLOOM_DIR)
    n_files = len(all_markers)
    report(f"Loaded {n_files} .bloom.marker files", n_files > 0, f"{n_files} files")

    if n_files == 0:
        print("  No files to test. Aborting.")
        return all_markers

    print("  Generating Q-matrices...")
    q_matrices = generate_q_matrices_for_directory(BLOOM_DIR)
    n_qm = len(q_matrices)
    report(f"Generated {n_qm} Q-matrices", n_qm == n_files, f"{n_qm}/{n_files}")

    # Validate all Q-matrices
    valid_count = 0
    total_skills = 0
    total_questions = 0
    for node_id, qm in q_matrices.items():
        issues = validate_q_matrix(qm)
        if not issues:
            valid_count += 1
        total_skills += qm.get("n_skills", 0)
        total_questions += qm.get("n_questions", 0)

    report(f"Valid Q-matrices: {valid_count}/{n_qm}",
           valid_count == n_qm,
           f"{valid_count}/{n_qm} valid")
    report(f"Average skills per node: {total_skills/max(1,n_qm):.1f}",
           total_skills > 0,
           f"{total_skills} total skills across {n_qm} nodes")
    report(f"Average questions per node: {total_questions/max(1,n_qm):.1f}",
           total_questions > 0,
           f"{total_questions} total questions")

    # Show a sample Q-matrix
    if q_matrices:
        sample_id = next(iter(q_matrices))
        sample_qm = q_matrices[sample_id]
        print(f"\n  Sample Q-matrix for {sample_id}:")
        print(f"    Skills: {sample_qm['skills']}")
        print(f"    Questions: {sample_qm['n_questions']}")
        print(f"    Matrix shape: {len(sample_qm['matrix'])}x{len(sample_qm['matrix'][0]) if sample_qm['matrix'] else 0}")

    return all_markers


# ─── Test 2: CDM diagnosis ─────────────────────────────────────────────────

def test_cdm_diagnosis(all_markers: dict):
    section("TEST 2: Cognitive Diagnosis (CDM)")

    if not all_markers:
        report("No markers to test", False)
        return

    # Test with each student archetype
    archetypes = [
        ("Strong student", 0.9),
        ("Average student", 0.6),
        ("Weak student", 0.3),
        ("Struggler", 0.1),
    ]

    for arch_name, accuracy in archetypes:
        # Pick a random node
        node_id = random.choice(list(all_markers.keys()))
        node_data = all_markers[node_id]

        # Generate Q-matrix
        qm = generate_q_matrix_for_node(node_data)
        if not qm.get("matrix"):
            continue

        # Simulate responses
        questions = node_data.get("diagnostic_questions", [])
        responses: dict[int, bool] = {}
        for q in questions:
            bloom = q.get("bloom_level", "recall").lower()
            diff_mod = {"recall": 0, "reasoning": -0.1, "evaluate": -0.15,
                       "apply": -0.2, "create": -0.25}
            eff_acc = max(0.05, accuracy + diff_mod.get(bloom, 0))
            q_num = q.get("q_num", 0)
            responses[q_num] = random.random() < eff_acc

        # Diagnose
        diagnosis = diagnose(qm, responses)

        report(f"{arch_name} ({node_id[:20]}...): {len(diagnosis.missing_skills)} missing skills",
               diagnosis.method in ("DINA", "DINA-fallback"),
               f"method={diagnosis.method}, missing={diagnosis.missing_skills[:3]}, conf={diagnosis.confidence:.0%}")

    # Test remediation targets
    print("\n  Testing remediation target identification...")
    node_id = random.choice(list(all_markers.keys()))
    node_data = all_markers[node_id]
    qm = generate_q_matrix_for_node(node_data)
    # Simulate all wrong
    responses = {q.get("q_num", 0): False for q in node_data.get("diagnostic_questions", [])}
    diagnosis = diagnose(qm, responses)
    targets = get_remediation_targets(diagnosis, qm)

    report(f"Remediation targets identified: {len(targets)}",
           len(targets) > 0,
           f"{len(targets)} questions need remediation, missing skills: {diagnosis.missing_skills[:5]}")


# ─── Test 3: KST path selection ────────────────────────────────────────────

def test_kst_path_selection(all_markers: dict):
    section("TEST 3: KST Path Selection")

    if not all_markers:
        report("No markers to test", False)
        return

    # Build prerequisite graph from remediation paths
    print("  Building prerequisite graph from .bloom.marker remediation paths...")
    prereq_graph = build_prereq_graph_from_bloom_markers(all_markers)
    n_nodes = len(prereq_graph.all_nodes())
    n_edges = sum(len(v) for v in prereq_graph.prereqs.values())
    report(f"Prerequisite graph: {n_nodes} nodes, {n_edges} edges",
           n_nodes > 0,
           f"{n_nodes} nodes, {n_edges} prerequisite edges")

    # Test with different knowledge states
    all_node_ids = list(all_markers.keys())

    # Student who has mastered nothing
    ks_empty = KnowledgeState()
    result_empty = select_next_node(all_node_ids, prereq_graph, ks_empty)
    report("Empty knowledge state → selects a node",
           result_empty is not None,
           f"selected: {result_empty['node_id'][:25] if result_empty else 'None'}, "
           f"P(success)={result_empty['success_prob']:.0%}" if result_empty else "")

    # Student who has mastered half the nodes
    half = len(all_node_ids) // 2
    ks_half = KnowledgeState(mastered=set(all_node_ids[:half]))
    result_half = select_next_node(all_node_ids, prereq_graph, ks_half)
    report("Half-mastered knowledge state → selects unmastered node",
           result_half is not None and not ks_half.has(result_half["node_id"]),
           f"selected: {result_half['node_id'][:25] if result_half else 'None'}, "
           f"P(success)={result_half['success_prob']:.0%}" if result_half else "")

    # Student who has mastered everything
    ks_full = KnowledgeState(mastered=set(all_node_ids))
    result_full = select_next_node(all_node_ids, prereq_graph, ks_full)
    report("Fully-mastered → no next node (all excluded)",
           result_full is None,
           "correctly returns None when all mastered")

    # Verify target probability
    print("\n  Verifying ~80% success probability targeting...")
    probs = []
    for _ in range(20):
        # Random knowledge state
        n_mastered = random.randint(0, len(all_node_ids) - 1)
        mastered = set(random.sample(all_node_ids, n_mastered))
        ks = KnowledgeState(mastered=mastered)
        result = select_next_node(all_node_ids, prereq_graph, ks)
        if result:
            probs.append(result["success_prob"])

    if probs:
        avg_prob = sum(probs) / len(probs)
        report(f"Average selected P(success): {avg_prob:.0%}",
               0.3 < avg_prob < 0.95,
               f"avg={avg_prob:.0%}, min={min(probs):.0%}, max={max(probs):.0%}")


# ─── Test 4: State machine ─────────────────────────────────────────────────

def test_state_machine(all_markers: dict):
    section("TEST 4: Socratic State Machine")

    if not all_markers:
        report("No markers to test", False)
        return

    # Pick a node with 5 questions
    test_node = None
    for node_id, data in all_markers.items():
        if len(data.get("diagnostic_questions", [])) >= 5:
            test_node = (node_id, data)
            break

    if not test_node:
        # Use any node
        node_id = next(iter(all_markers))
        test_node = (node_id, all_markers[node_id])

    node_id, node_data = test_node
    filepath = node_data.get("filepath", "")
    if not filepath or not os.path.exists(filepath):
        report(f"File not found for {node_id}", False)
        return

    print(f"  Testing with node: {node_id}")
    print(f"  Questions: {len(node_data.get('diagnostic_questions', []))}")

    # Create state machine
    try:
        sm = SocraticStateMachine(filepath)
    except Exception as exc:
        report(f"State machine creation", False, str(exc))
        return
    report("State machine creation", True, f"node={node_id}")

    # Test INTRODUCE state
    intro = sm.start()
    report("INTRODUCE state serves content",
           len(intro) > 50,
           f"{len(intro)} chars, state={sm.get_state().value}")

    # Test transition to first question
    response = sm.handle_input("ready")
    is_q1 = sm.get_state() in (TutorState.PROBE_Q1, TutorState.DISCUSSION)
    report("Transition from INTRODUCE to Q1/DISCUSSION",
           is_q1,
           f"state={sm.get_state().value}")

    # If discussion triggered, skip through it
    if sm.get_state() == TutorState.DISCUSSION:
        response = sm.handle_input("B")  # Agree with Coach
        report("DISCUSSION → Q1 transition",
               sm.get_state() == TutorState.PROBE_Q1,
               f"state={sm.get_state().value}")

    # Test answering all 5 questions correctly
    questions = node_data.get("diagnostic_questions", [])
    for q in questions:
        q_num = q.get("q_num", 0)
        if sm.get_state() == TutorState.MASTERY or sm.get_state() == TutorState.COMPLETE:
            break
        # Answer correctly
        answer = q.get("answer", "correct")
        response = sm.handle_input(answer, is_correct=True)

    report("Answered all questions correctly → MASTERY",
           sm.get_state() == TutorState.MASTERY,
           f"state={sm.get_state().value}, XP={sm.session.xp_earned}")

    # Test mastery scorecard
    mastery_content = sm.get_current_content()
    report("MASTERY scorecard has content",
           len(mastery_content) > 50,
           f"{len(mastery_content)} chars")

    # Test CDM diagnosis in mastery
    diagnosis = sm.get_diagnosis()
    report("CDM diagnosis available after mastery",
           diagnosis is not None,
           f"missing_skills={diagnosis.missing_skills[:3] if diagnosis else 'None'}")

    # Test wrong answer → remediation
    sm2 = SocraticStateMachine(filepath)
    sm2.start()
    sm2.handle_input("ready")
    if sm2.get_state() == TutorState.DISCUSSION:
        sm2.handle_input("B")
    # Answer wrong twice
    q1 = questions[0] if questions else None
    if q1:
        sm2.handle_input("wrong answer", is_correct=False)
        sm2.handle_input("still wrong", is_correct=False)
        report("2 wrong answers → REMEDIATE state",
               sm2.get_state() == TutorState.REMEDIATE,
               f"state={sm2.get_state().value}")

    # Test hint system
    sm3 = SocraticStateMachine(filepath)
    sm3.start()
    sm3.handle_input("ready")
    if sm3.get_state() == TutorState.DISCUSSION:
        sm3.handle_input("B")
    hint_response = sm3.handle_input("hint")
    report("Hint system works",
           "hint" in hint_response.lower() or "level" in hint_response.lower(),
           f"hint_level={sm3.session.hint_level.get(1, 0)}")


# ─── Test 5: Discussion moments ────────────────────────────────────────────

def test_discussion_moments(all_markers: dict):
    section("TEST 5: Discussion Moments")

    if not all_markers:
        report("No markers to test", False)
        return

    triggered = 0
    total = 0
    sample_discussion = None

    for node_id, data in all_markers.items():
        total += 1
        if should_trigger_discussion(data):
            triggered += 1
            if sample_discussion is None:
                sample_discussion = generate_discussion(data)

    report(f"Discussion triggers for {triggered}/{total} nodes",
           triggered > 0,
           f"{triggered}/{total} nodes have rich misconception content")

    if sample_discussion:
        report("Discussion content generated",
               "Skeptic" in sample_discussion and "Coach" in sample_discussion,
               f"{len(sample_discussion)} chars, has both personas")

        # Test reveal
        reveal = generate_discussion_reveal(
            next(iter(all_markers.values())),
            "B",  # Agree with Coach
        )
        report("Discussion reveal generated",
               "right" in reveal.lower() or "correct" in reveal.lower(),
               f"{len(reveal)} chars")
    else:
        report("No discussion content generated", False, "no misconceptions found")


# ─── Test 6: Mode selector ─────────────────────────────────────────────────

def test_mode_selector(all_markers: dict):
    section("TEST 6: Mode Selector")

    # Test mode selection by subject
    test_cases = [
        ("hindi", PresentationMode.STORY),
        ("english", PresentationMode.STORY),
        ("science", PresentationMode.LAB),
        ("physics", PresentationMode.LAB),
        ("biology", PresentationMode.LAB),
        ("mathematics", PresentationMode.PROOF),
        ("math", PresentationMode.PROOF),
        ("social_science", PresentationMode.CONTEXT),
        ("history", PresentationMode.CONTEXT),
        ("geography", PresentationMode.CONTEXT),
        ("unknown_subject", PresentationMode.DEFAULT),
    ]

    for subject, expected_mode in test_cases:
        mode = select_mode(subject)
        report(f"Subject '{subject}' → {mode.value}",
               mode == expected_mode,
               f"expected={expected_mode.value}, got={mode.value}")

    # Test rendering with a real node
    if all_markers:
        node_id = next(iter(all_markers))
        node_data = all_markers[node_id]

        for mode in PresentationMode:
            content = render_introduce(node_data, mode=mode)
            report(f"Render {mode.value} mode",
                   len(content) > 50,
                   f"{len(content)} chars")


# ─── Test 7: End-to-end with synthetic students ────────────────────────────

def test_end_to_end(all_markers: dict):
    section("TEST 7: End-to-End with Synthetic Students")

    if not all_markers:
        report("No markers to test", False)
        return

    # Create synthetic students
    students = [
        SyntheticStudent("Aarav (strong)", "strong", 0.9),
        SyntheticStudent("Priya (average)", "average", 0.6),
        SyntheticStudent("Rohan (weak)", "weak", 0.3),
        SyntheticStudent("Ananya (struggler)", "struggler", 0.1),
    ]

    # Build prereq graph for KST
    prereq_graph = build_prereq_graph_from_bloom_markers(all_markers)
    all_node_ids = list(all_markers.keys())

    # Each student goes through 5 nodes
    N_NODES = min(5, len(all_node_ids))

    for student in students:
        print(f"\n  Student: {student.name} (accuracy target: {student.accuracy:.0%})")

        for _ in range(N_NODES):
            # KST selects next node
            next_result = select_next_node(
                all_node_ids, prereq_graph, student.knowledge_state,
                student.mastery_scores,
            )
            if not next_result:
                break

            node_id = next_result["node_id"]
            node_data = all_markers[node_id]
            filepath = node_data.get("filepath", "")

            if not filepath or not os.path.exists(filepath):
                continue

            # Run state machine
            try:
                sm = SocraticStateMachine(filepath)
                # Determine mode from subject (infer from node_id)
                subject = _infer_subject_from_node_id(node_id)
                mode = select_mode(subject)
                sm.start(mode=mode.value)

                # Handle discussion if triggered
                if sm.get_state() == TutorState.DISCUSSION:
                    # Student picks randomly
                    choice = random.choice(["A", "B", "C"])
                    sm.handle_input(choice)

                # Answer all questions
                questions = node_data.get("diagnostic_questions", [])
                for q in questions:
                    if sm.get_state() in (TutorState.MASTERY, TutorState.COMPLETE):
                        break
                    answer, is_correct = student.answer_question(q)
                    sm.handle_input(answer, is_correct=is_correct)

                # Collect results
                summary = sm.get_session_summary()
                student.total_xp += summary.get("xp_earned", 0)

                # Update knowledge state
                if summary.get("questions_correct", 0) >= summary.get("questions_answered", 1) * 0.6:
                    student.knowledge_state.add(node_id)
                    student.mastery_scores[node_id] = summary.get("questions_correct", 0) / max(1, summary.get("questions_answered", 1))

                # Collect diagnosis
                diagnosis = sm.get_diagnosis()
                if diagnosis:
                    student.diagnoses.append(diagnosis)

                student.nodes_completed.append(node_id)

            except Exception as exc:
                report(f"{student.name} node {node_id[:15]}", False, str(exc)[:80])

    # Report results
    print("\n  Student Results:")
    print(f"  {'Student':<25} {'Accuracy':<10} {'Nodes':<7} {'XP':<6} {'Qs':<5} {'Missing Skills':<15}")
    print(f"  {'-'*25} {'-'*10} {'-'*7} {'-'*6} {'-'*5} {'-'*15}")

    for student in students:
        s = student.summary()
        report(f"{student.name} completed {s['nodes_completed']} nodes",
               s["nodes_completed"] > 0,
               f"acc={s['accuracy']}, XP={s['total_xp']}, missing_skills={s['missing_skills_found']}")
        print(f"  {student.name:<25} {s['accuracy']:<10} {s['nodes_completed']:<7} "
              f"{s['total_xp']:<6} {s['total_questions']:<5} {s['missing_skills_found']:<15}")


def _infer_subject_from_node_id(node_id: str) -> str:
    """Infer subject from node ID prefix."""
    node_id_lower = node_id.lower()
    if "_hin_" in node_id_lower or "_hindi_" in node_id_lower:
        return "hindi"
    if "_eng_" in node_id_lower or "_english_" in node_id_lower:
        return "english"
    if "_sci_" in node_id_lower or "_science_" in node_id_lower:
        return "science"
    if "_phy_" in node_id_lower or "_physics_" in node_id_lower:
        return "physics"
    if "_bio_" in node_id_lower or "_biology_" in node_id_lower:
        return "biology"
    if "_chem_" in node_id_lower or "_chemistry_" in node_id_lower:
        return "chemistry"
    if "_math_" in node_id_lower or "_maths_" in node_id_lower or "_mat_" in node_id_lower:
        return "mathematics"
    if "_hist_" in node_id_lower or "_history_" in node_id_lower:
        return "history"
    if "_geo_" in node_id_lower or "_geography_" in node_id_lower:
        return "geography"
    if "_soc_" in node_id_lower or "_social_" in node_id_lower:
        return "social_science"
    return "unknown"


# ─── Test 8: Old vs New comparison ─────────────────────────────────────────

def test_old_vs_new(all_markers: dict):
    section("TEST 8: Old System (Simple Scoring) vs New System (CDM + KST)")

    if not all_markers:
        report("No markers to test", False)
        return

    node_id = random.choice(list(all_markers.keys()))
    node_data = all_markers[node_id]
    questions = node_data.get("diagnostic_questions", [])

    if len(questions) < 3:
        report("Not enough questions for comparison", False)
        return

    # Simulate a student who gets Q1, Q2 right but Q3, Q4, Q5 wrong
    responses = {}
    for i, q in enumerate(questions):
        q_num = q.get("q_num", i + 1)
        responses[q_num] = i < 2  # First 2 correct, rest wrong

    # OLD SYSTEM: Simple scoring
    correct = sum(1 for c in responses.values() if c)
    total = len(responses)
    old_score = correct / total
    old_feedback = f"Score: {old_score:.0%} ({correct}/{total} correct)"

    # NEW SYSTEM: CDM diagnosis
    qm = generate_q_matrix_for_node(node_data)
    diagnosis = diagnose(qm, responses)
    targets = get_remediation_targets(diagnosis, qm)

    new_feedback = (
        f"Score: {old_score:.0%} | "
        f"Missing skills: {diagnosis.missing_skills[:5]} | "
        f"Remediation targets: {len(targets)} questions | "
        f"Confidence: {diagnosis.confidence:.0%}"
    )

    print(f"\n  Node: {node_id}")
    print(f"  Responses: {responses}")
    print(f"\n  OLD SYSTEM (simple scoring):")
    print(f"    {old_feedback}")
    print(f"    → Remediation: 'review the whole node'")
    print(f"\n  NEW SYSTEM (CDM + KST):")
    print(f"    {new_feedback}")
    print(f"    → Remediation: targets specific missing skills")
    if targets:
        for t in targets[:3]:
            print(f"      Q{t['q_num']} ({t['bloom_level']}): missing {t['missing_skills'][:3]}")

    report("Old system gives score only",
           old_score > 0,
           f"score={old_score:.0%}")
    report("New system gives skill-level diagnosis",
           len(diagnosis.missing_skills) > 0,
           f"{len(diagnosis.missing_skills)} missing skills identified")
    report("New system identifies specific remediation targets",
           len(targets) > 0,
           f"{len(targets)} targeted remediation questions")
    report("New system provides more info than old",
           len(diagnosis.missing_skills) + len(targets) > 1,
           f"old=1 metric (score), new={1 + len(diagnosis.missing_skills) + len(targets)} metrics")


# ─── Main ──────────────────────────────────────────────────────────────────

def main():
    print("\n" + "="*60)
    print("  ITS STACK END-TO-END TEST")
    print("  Testing 4 additions against real .bloom.marker files")
    print("="*60)

    random.seed(42)  # Reproducible results
    start_time = time.time()

    # Run all tests
    all_markers = test_q_matrix_generation()
    test_cdm_diagnosis(all_markers)
    test_kst_path_selection(all_markers)
    test_state_machine(all_markers)
    test_discussion_moments(all_markers)
    test_mode_selector(all_markers)
    test_end_to_end(all_markers)
    test_old_vs_new(all_markers)

    elapsed = time.time() - start_time

    # Summary
    print("\n" + "="*60)
    print("  TEST SUMMARY")
    print("="*60)
    print(f"  Passed: {PASS}")
    print(f"  Failed: {FAIL}")
    print(f"  Total:  {PASS + FAIL}")
    print(f"  Time:   {elapsed:.1f}s")
    if PASS + FAIL > 0:
        print(f"  Pass rate: {PASS/(PASS+FAIL):.0%}")
    print("="*60)

    # Save results
    results_path = Path(r"D:\platform\cbse_data\its_test_results.json")
    try:
        with open(results_path, "w", encoding="utf-8") as f:
            json.dump({
                "passed": PASS,
                "failed": FAIL,
                "total": PASS + FAIL,
                "pass_rate": f"{PASS/(PASS+FAIL):.0%}" if PASS + FAIL > 0 else "0%",
                "time_seconds": elapsed,
                "results": RESULTS,
            }, f, indent=2, ensure_ascii=False)
        print(f"\n  Results saved to: {results_path}")
    except Exception as exc:
        print(f"\n  Failed to save results: {exc}")

    return FAIL == 0


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
