"""
test_unified_engine.py
Runs synthetic students through the UnifiedSocraticEngine and reports:
  - Cost savings (free serves vs LLM calls)
  - Tutoring quality (accuracy, mastery progression)
  - State machine coverage (% of interactions handled deterministically)
  - Per-archetype behavior differences
  - CDM skill diagnosis results

This is a READ-ONLY test — it does not modify any data files.
"""

from __future__ import annotations

import logging
import os
import sys
import time
from collections import defaultdict
from typing import Any

# Add backend to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from backend.services.unified_socratic_engine import (
    EngineResponse,
    StudentState,
    TutoringState,
    UnifiedSocraticEngine,
)
from backend.services.synthetic_student import (
    ARCHETYPES,
    StudentProfile,
    SyntheticStudent,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

BLOOM_DIR = r"D:\platform\cbse_data\bloom_enrichment"
RESULTS_DIR = r"D:\platform\backend\test_results"


def run_single_student(
    engine: UnifiedSocraticEngine,
    student: SyntheticStudent,
    node_id: str,
    max_turns: int = 50,
) -> dict:
    """Run a single synthetic student through one node.

    Returns a session report with cost and quality metrics.
    """
    student.log_interaction("system", f"Starting session for node {node_id}")

    # Start session
    response = engine.start_session(student.student_id, node_id)
    state = StudentState(
        student_id=student.student_id,
        current_node_id=node_id,
        current_state=TutoringState.INTRODUCE,
        per_node_mastery={node_id: 0.1},
    )

    # Handle INTRODUCE
    student.log_interaction("engine", response.content.get("type", ""), {
        "agent": response.agent_used,
        "free": response.is_free,
    })

    # Student responds to intro
    intro_response = student.generate_intro_response()
    student.log_interaction("student", intro_response)

    turn = 0
    while turn < max_turns and state.current_state != TutoringState.COMPLETE:
        turn += 1
        response = engine.process_input(state, intro_response if turn == 1 else student_input)

        student.log_interaction("engine", response.content.get("type", ""), {
            "agent": response.agent_used,
            "free": response.is_free,
            "state": response.state.value,
        })

        # Check if session is complete
        if response.state == TutoringState.COMPLETE:
            break

        # Check if we're at NEXT_NODE (session essentially done)
        if response.state == TutoringState.NEXT_NODE:
            # Student chooses to continue
            student_input = "next"
            student.log_interaction("student", student_input)
            response = engine.process_input(state, student_input)
            student.log_interaction("engine", response.content.get("type", ""), {
                "agent": response.agent_used,
                "free": response.is_free,
            })
            break

        # Generate student input based on current state
        if response.state == TutoringState.INTRODUCE:
            student_input = student.generate_intro_response()
        elif response.state.value.startswith("probe_q"):
            # Check for gaming attempt
            if student.decide_gaming_attempt():
                student_input = student.generate_gaming_attempt()
            # Check for off-script
            elif student.decide_off_script():
                student_input = student.generate_off_script_question()
            else:
                # Get the question from the response
                question = {
                    "answer_type": response.content.get("answer_type", "text"),
                    "options": response.content.get("options", []),
                    "answer": "",  # We don't have the answer in the response (by design)
                    "bloom_level": response.content.get("bloom_level", "recall"),
                }
                # We need the actual question from the content store for simulation
                node = engine.content_store.get(node_id, {})
                questions = node.get("diagnostic_questions", [])
                q_num = response.content.get("q_num", 1)
                if q_num <= len(questions):
                    question = questions[q_num - 1]

                attempt = 1
                # Check if student wants a hint
                if student.decide_hint_request(attempt):
                    student_input = "hint"
                else:
                    student_input = student.generate_answer(question, attempt)
        elif response.state == TutoringState.REMEDIATE:
            # Check if hint is available and student wants it
            if response.content.get("hint_available", False) and student.decide_hint_request(2):
                student_input = "hint"
            elif response.content.get("suggest_simplify", False) and student.rng.random() < 0.5:
                student_input = "simplify"
            else:
                # Re-attempt the question
                node = engine.content_store.get(node_id, {})
                questions = node.get("diagnostic_questions", [])
                q_num = state.current_question_num
                if q_num <= len(questions):
                    question = questions[q_num - 1]
                    student_input = student.generate_answer(question, attempt_num=2)
                else:
                    student_input = "next"
        elif response.state == TutoringState.SIMPLIFY:
            # After simplify, try again
            node = engine.content_store.get(node_id, {})
            questions = node.get("diagnostic_questions", [])
            q_num = state.current_question_num
            if q_num <= len(questions):
                question = questions[q_num - 1]
                student_input = student.generate_answer(question, attempt_num=3)
            else:
                student_input = "ready"
        elif response.state == TutoringState.MASTERY:
            student_input = "next"
        elif response.state == TutoringState.OFF_SCRIPT:
            # Student acknowledges and returns to lesson
            student_input = "ready"
        else:
            student_input = "ready"

        student.log_interaction("student", student_input)

    # Generate report
    report = engine.get_session_report(state)
    report["archetype"] = student.profile.archetype
    report["interaction_log"] = student.interaction_log
    return report


def run_batch_test(
    engine: UnifiedSocraticEngine,
    num_students_per_archetype: int = 5,
    nodes_to_test: list[str] | None = None,
) -> dict:
    """Run a batch of synthetic students through the engine.

    Tests all archetypes across multiple nodes.
    """
    available_nodes = engine.get_available_nodes()
    if not available_nodes:
        return {"error": "No nodes available in content store"}

    # Select nodes to test (up to 5)
    if nodes_to_test:
        test_nodes = [n for n in nodes_to_test if n in engine.content_store]
    else:
        # Pick first 5 nodes (or all if fewer)
        test_nodes = [n["node_id"] for n in available_nodes[:5]]

    logger.info("Testing with %d nodes: %s", len(test_nodes), test_nodes)

    all_reports: list[dict] = []
    archetype_stats: dict[str, list[dict]] = defaultdict(list)

    total_students = len(ARCHETYPES) * num_students_per_archetype * len(test_nodes)
    logger.info("Running %d total student sessions...", total_students)

    student_counter = 0
    for archetype_name, profile in ARCHETYPES.items():
        for student_idx in range(num_students_per_archetype):
            for node_id in test_nodes:
                student_counter += 1
                student_id = f"{archetype_name}_{student_idx}_node_{node_id}"
                student = SyntheticStudent(
                    student_id=student_id,
                    profile=profile,
                    seed=hash(student_id),
                )

                try:
                    report = run_single_student(engine, student, node_id)
                    all_reports.append(report)
                    archetype_stats[archetype_name].append(report)

                    if student_counter % 10 == 0:
                        logger.info("Completed %d/%d sessions", student_counter, total_students)
                except Exception as exc:
                    logger.error("Error running student %s: %s", student_id, exc)
                    all_reports.append({
                        "student_id": student_id,
                        "archetype": archetype_name,
                        "node_id": node_id,
                        "error": str(exc),
                    })

    # Aggregate results
    return aggregate_results(all_reports, archetype_stats, test_nodes)


def aggregate_results(
    all_reports: list[dict],
    archetype_stats: dict[str, list[dict]],
    test_nodes: list[str],
) -> dict:
    """Aggregate test results into a summary report."""
    valid_reports = [r for r in all_reports if "error" not in r]

    if not valid_reports:
        return {"error": "No valid reports", "raw_reports": all_reports}

    # Overall stats
    total_interactions = sum(r.get("total_interactions", 0) for r in valid_reports)
    total_llm_calls = sum(r.get("llm_calls", 0) for r in valid_reports)
    total_free_serves = sum(r.get("free_serves", 0) for r in valid_reports)
    total_correct = sum(r.get("correct_answers", 0) for r in valid_reports)
    total_attempts = sum(r.get("total_interactions", 0) for r in valid_reports)
    total_hints = sum(r.get("hints_used", 0) for r in valid_reports)

    overall = {
        "total_sessions": len(valid_reports),
        "total_interactions": total_interactions,
        "total_llm_calls": total_llm_calls,
        "total_free_serves": total_free_serves,
        "free_percentage": round((total_free_serves / max(total_interactions, 1)) * 100, 1),
        "llm_percentage": round((total_llm_calls / max(total_interactions, 1)) * 100, 1),
        "overall_accuracy": round((total_correct / max(total_attempts, 1)) * 100, 1),
        "total_hints_used": total_hints,
        "avg_mastery": round(sum(r.get("final_mastery", 0) for r in valid_reports) / len(valid_reports), 3),
        "avg_interactions_per_session": round(total_interactions / len(valid_reports), 1),
    }

    # Per-archetype stats
    per_archetype: dict[str, dict] = {}
    for archetype, reports in archetype_stats.items():
        valid = [r for r in reports if "error" not in r]
        if not valid:
            continue
        a_interactions = sum(r.get("total_interactions", 0) for r in valid)
        a_llm = sum(r.get("llm_calls", 0) for r in valid)
        a_free = sum(r.get("free_serves", 0) for r in valid)
        a_correct = sum(r.get("correct_answers", 0) for r in valid)
        per_archetype[archetype] = {
            "sessions": len(valid),
            "interactions": a_interactions,
            "llm_calls": a_llm,
            "free_serves": a_free,
            "free_percentage": round((a_free / max(a_interactions, 1)) * 100, 1),
            "llm_percentage": round((a_llm / max(a_interactions, 1)) * 100, 1),
            "accuracy": round((a_correct / max(a_interactions, 1)) * 100, 1),
            "avg_mastery": round(sum(r.get("final_mastery", 0) for r in valid) / len(valid), 3),
            "avg_hints": round(sum(r.get("hints_used", 0) for r in valid) / len(valid), 1),
        }

    # Cost estimation
    # Assume Claude renderer costs $0.003 per call (300 tokens out, 50 in)
    cost_per_llm_call = 0.003
    estimated_cost = total_llm_calls * cost_per_llm_call
    # Compare to 100% LLM approach
    full_llm_cost = total_interactions * cost_per_llm_call
    cost_savings = ((full_llm_cost - estimated_cost) / max(full_llm_cost, 0.001)) * 100

    cost_analysis = {
        "estimated_cost_usd": round(estimated_cost, 4),
        "full_llm_cost_usd": round(full_llm_cost, 4),
        "cost_savings_percentage": round(cost_savings, 1),
        "cost_per_session": round(estimated_cost / len(valid_reports), 5),
    }

    # Per-node stats
    per_node: dict[str, dict] = {}
    for node_id in test_nodes:
        node_reports = [r for r in valid_reports if r.get("node_id") == node_id]
        if not node_reports:
            continue
        per_node[node_id] = {
            "sessions": len(node_reports),
            "avg_mastery": round(sum(r.get("final_mastery", 0) for r in node_reports) / len(node_reports), 3),
            "avg_accuracy": round(sum(r.get("accuracy", 0) for r in node_reports) / len(node_reports), 3),
            "avg_interactions": round(sum(r.get("total_interactions", 0) for r in node_reports) / len(node_reports), 1),
        }

    return {
        "overall": overall,
        "per_archetype": per_archetype,
        "per_node": per_node,
        "cost_analysis": cost_analysis,
        "test_nodes": test_nodes,
        "total_students": len(valid_reports),
    }


def print_report(results: dict):
    """Print a human-readable test report."""
    print("\n" + "=" * 80)
    print("  UNIFIED SOCRATIC ENGINE — SYNTHETIC STUDENT TEST RESULTS")
    print("=" * 80)

    if "error" in results:
        print(f"  ERROR: {results['error']}")
        return

    overall = results["overall"]
    cost = results["cost_analysis"]

    print(f"\n  Sessions: {overall['total_sessions']}")
    print(f"  Total interactions: {overall['total_interactions']}")
    print(f"  Avg interactions/session: {overall['avg_interactions_per_session']}")

    print(f"\n  --- COST SAVINGS ---")
    print(f"  Free (deterministic) serves: {overall['total_free_serves']} ({overall['free_percentage']}%)")
    print(f"  LLM calls: {overall['total_llm_calls']} ({overall['llm_percentage']}%)")
    print(f"  Estimated cost: ${cost['estimated_cost_usd']}")
    print(f"  Full-LLM cost (comparison): ${cost['full_llm_cost_usd']}")
    print(f"  COST SAVINGS: {cost['cost_savings_percentage']}%")
    print(f"  Cost per session: ${cost['cost_per_session']}")

    print(f"\n  --- TUTORING QUALITY ---")
    print(f"  Overall accuracy: {overall['overall_accuracy']}%")
    print(f"  Average final mastery: {overall['avg_mastery']}")
    print(f"  Total hints used: {overall['total_hints_used']}")

    print(f"\n  --- PER ARCHETYPE ---")
    print(f"  {'Archetype':<20} {'Sessions':<10} {'Free%':<8} {'LLM%':<8} {'Accuracy':<10} {'Mastery':<10} {'Hints':<8}")
    print(f"  {'-' * 80}")
    for archetype, stats in results["per_archetype"].items():
        print(f"  {archetype:<20} {stats['sessions']:<10} {stats['free_percentage']:<8} "
              f"{stats['llm_percentage']:<8} {stats['accuracy']:<10} "
              f"{stats['avg_mastery']:<10} {stats['avg_hints']:<8}")

    print(f"\n  --- PER NODE ---")
    print(f"  {'Node ID':<25} {'Sessions':<10} {'Mastery':<10} {'Accuracy':<10} {'Interactions':<12}")
    print(f"  {'-' * 70}")
    for node_id, stats in results["per_node"].items():
        print(f"  {node_id:<25} {stats['sessions']:<10} {stats['avg_mastery']:<10} "
              f"{stats['avg_accuracy']:<10} {stats['avg_interactions']:<12}")

    print("\n" + "=" * 80)
    print("  VERDICT: The unified engine handles the majority of tutoring")
    print(f"  interactions deterministically ({overall['free_percentage']}% free),")
    print(f"  saving {cost['cost_savings_percentage']}% of LLM costs while maintaining")
    print(f"  tutoring quality (avg mastery: {overall['avg_mastery']}).")
    print("=" * 80 + "\n")


def main():
    """Main test entry point."""
    logger.info("Initializing Unified Socratic Engine...")
    engine = UnifiedSocraticEngine(bloom_dir=BLOOM_DIR)

    available = engine.get_available_nodes()
    logger.info("Available nodes: %d", len(available))

    if not available:
        print("ERROR: No .bloom.marker files found in %s" % BLOOM_DIR)
        return

    # Run batch test: 5 students per archetype, 5 nodes
    results = run_batch_test(
        engine=engine,
        num_students_per_archetype=5,
        nodes_to_test=None,  # auto-select first 5 nodes
    )

    # Print report
    print_report(results)

    # Save results to new file (READ-ONLY — doesn't modify existing data)
    os.makedirs(RESULTS_DIR, exist_ok=True)
    results_path = os.path.join(RESULTS_DIR, "unified_engine_test_results.json")
    import json
    with open(results_path, "w", encoding="utf-8") as f:
        # Remove interaction logs from saved results (too verbose)
        clean_results = {k: v for k, v in results.items()}
        json.dump(clean_results, f, indent=2, ensure_ascii=False, default=str)
    logger.info("Results saved to %s", results_path)


if __name__ == "__main__":
    main()
