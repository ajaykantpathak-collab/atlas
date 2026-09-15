"""
Class 2 Chemistry — Solver
Nodes: c2_chem_001, c2_chem_002, c2_chem_003
Difficulty: Easy | Cognitive Level: Remember
"""

import random
import math

# ── Seed control ──────────────────────────────────────────────────────────────
_MASTER_SEED = 42

def set_seed(seed: int = _MASTER_SEED) -> None:
    random.seed(seed)

# ── Node registry ─────────────────────────────────────────────────────────────
NODES = {
    "c2_chem_001": {
        "title": "Storage of water",
        "section": "Matter",
        "difficulty": "Easy",
        "cognitive": "Remember",
    },
    "c2_chem_002": {
        "title": "Simple properties of water (colour, taste, smell)",
        "section": "Materials around us",
        "difficulty": "Easy",
        "cognitive": "Remember",
    },
    "c2_chem_003": {
        "title": "Water conservation in daily life",
        "section": "Air",
        "difficulty": "Easy",
        "cognitive": "Remember",
    },
}

# ── Answer key ─────────────────────────────────────────────────────────────────

ANSWER_KEY = {
    # ── Node 1: Storage of water ──────────────────────────────────────────────
    "c2_chem_001_mc_01": "drum with lid",
    "c2_chem_001_mc_02": "lid",
    "c2_chem_001_fb_01": ["pot with lid", "bucket with lid", "drum with lid"],
    "c2_chem_001_fb_02": "lid",
    "c2_chem_001_tf_01": True,

    # ── Node 2: Properties of water ───────────────────────────────────────────
    "c2_chem_002_mc_01": "colourless",
    "c2_chem_002_mc_02": "odourless",
    "c2_chem_002_fb_01": ["colourless", "tasteless", "odourless"],
    "c2_chem_002_fb_02": "colourless",
    "c2_chem_002_tf_01": False,

    # ── Node 3: Water conservation ────────────────────────────────────────────
    "c2_chem_003_mc_01": "Turn off the tap after use",
    "c2_chem_003_mc_02": "Use a bucket instead of a running hose",
    "c2_chem_003_fb_01": "turn off",
    "c2_chem_003_fb_02": "plants",
    "c2_chem_003_tf_01": True,
}

# ── Question metadata (for solver awareness) ───────────────────────────────────
QUESTION_META = {
    "c2_chem_001_mc_01": {"node": "c2_chem_001", "type": "mc",  "difficulty": "Easy"},
    "c2_chem_001_mc_02": {"node": "c2_chem_001", "type": "mc",  "difficulty": "Easy"},
    "c2_chem_001_fb_01": {"node": "c2_chem_001", "type": "fb",  "difficulty": "Easy"},
    "c2_chem_001_fb_02": {"node": "c2_chem_001", "type": "fb",  "difficulty": "Easy"},
    "c2_chem_001_tf_01": {"node": "c2_chem_001", "type": "tf",  "difficulty": "Easy"},

    "c2_chem_002_mc_01": {"node": "c2_chem_002", "type": "mc",  "difficulty": "Easy"},
    "c2_chem_002_mc_02": {"node": "c2_chem_002", "type": "mc",  "difficulty": "Easy"},
    "c2_chem_002_fb_01": {"node": "c2_chem_002", "type": "fb",  "difficulty": "Easy"},
    "c2_chem_002_fb_02": {"node": "c2_chem_002", "type": "fb",  "difficulty": "Easy"},
    "c2_chem_002_tf_01": {"node": "c2_chem_002", "type": "tf",  "difficulty": "Easy"},

    "c2_chem_003_mc_01": {"node": "c2_chem_003", "type": "mc",  "difficulty": "Easy"},
    "c2_chem_003_mc_02": {"node": "c2_chem_003", "type": "mc",  "difficulty": "Easy"},
    "c2_chem_003_fb_01": {"node": "c2_chem_003", "type": "fb",  "difficulty": "Easy"},
    "c2_chem_003_fb_02": {"node": "c2_chem_003", "type": "fb",  "difficulty": "Easy"},
    "c2_chem_003_tf_01": {"node": "c2_chem_003", "type": "tf",  "difficulty": "Easy"},
}

# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

def _normalise(text: str) -> str:
    """Lower-case and strip surrounding whitespace."""
    return text.strip().lower()

def _is_close(student: str, correct_list) -> bool:
    """
    True if *student* matches any entry in *correct_list* after normalisation.
    correct_list may be a single string or a list of strings.
    """
    if isinstance(correct_list, str):
        correct_list = [correct_list]
    s = _normalise(student)
    return any(_normalise(c) == s for c in correct_list)

# ═══════════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════════

def check_answer(question_id: str, student_answer) -> dict:
    """
    Verify a single answer and return a detailed result dict.

    Parameters
    ----------
    question_id : str   e.g. "c2_chem_001_mc_01"
    student_answer      raw answer from the learner (str, bool, or int)

    Returns
    -------
    dict with keys: correct, expected, question_id, node_id, question_type
    """
    if question_id not in ANSWER_KEY:
        return {
            "correct": False,
            "error": f"Unknown question_id '{question_id}'",
            "question_id": question_id,
        }

    expected = ANSWER_KEY[question_id]
    meta     = QUESTION_META.get(question_id, {})
    q_type   = meta.get("type", "unknown")
    node_id  = meta.get("node",  "unknown")

    # ── True / False ──────────────────────────────────────────────────────────
    if q_type == "tf":
        student_bool = bool(student_answer)
        is_correct   = student_bool == bool(expected)
        return {
            "correct":      is_correct,
            "expected":     "True" if expected else "False",
            "student_gave": "True" if student_bool else "False",
            "question_id":  question_id,
            "node_id":      node_id,
            "question_type": q_type,
        }

    # ── Multiple Choice ───────────────────────────────────────────────────────
    if q_type == "mc":
        is_correct = _is_close(str(student_answer), expected)
        return {
            "correct":      is_correct,
            "expected":     expected,
            "student_gave": str(student_answer).strip(),
            "question_id":  question_id,
            "node_id":      node_id,
            "question_type": q_type,
        }

    # ── Fill in the Blank ─────────────────────────────────────────────────────
    if q_type == "fb":
        is_correct = _is_close(str(student_answer), expected)
        return {
            "correct":      is_correct,
            "expected":     expected if isinstance(expected, str) else expected[0],
            "student_gave": str(student_answer).strip(),
            "all_accepted": expected if isinstance(expected, list) else [expected],
            "question_id":  question_id,
            "node_id":      node_id,
            "question_type": q_type,
        }

    # ── Fallback ──────────────────────────────────────────────────────────────
    return {"correct": False, "error": "Unsupported question type", "question_id": question_id}


def evaluate_quiz(answers: dict) -> dict:
    """
    Evaluate a full quiz submission.

    Parameters
    ----------
    answers : dict   mapping question_id -> student_answer
                     e.g. {"c2_chem_001_mc_01": "drum with lid", ...}

    Returns
    -------
    dict with per-question results, total score, and per-node breakdown.
    """
    set_seed()                          # reset for any downstream use
    results  = {}
    node_hits = {}                      # node_id -> {correct, total}
    total_correct = 0
    total_questions = 0

    for qid, ans in answers.items():
        r = check_answer(qid, ans)
        results[qid] = r

        nid   = r.get("node_id", "unknown")
        total_questions += 1
        if r.get("correct"):
            total_correct += 1

        if nid not in node_hits:
            node_hits[nid] = {"correct": 0, "total": 0}
        node_hits[nid]["total"] += 1
        if r.get("correct"):
            node_hits[nid]["correct"] += 1

    pct = round((total_correct / total_questions) * 100, 1) if total_questions else 0.0

    return {
        "total_correct":  total_correct,
        "total_questions": total_questions,
        "percentage":     pct,
        "per_question":   results,
        "per_node":       node_hits,
    }


def print_result(eval_result: dict, show_details: bool = True) -> None:
    """Pretty-print evaluation results to stdout."""
    print("=" * 55)
    print("  CLASS 2 CHEMISTRY — QUIZ RESULTS")
    print("=" * 55)
    print(f"  Score : {eval_result['total_correct']}/{eval_result['total_questions']}")
    print(f"  Pct   : {eval_result['percentage']}%")
    print("-" * 55)

    if show_details:
        print("  Per-question breakdown:")
        for qid, r in eval_result["per_question"].items():
            mark = "✓" if r.get("correct") else "✗"
            print(f"    {mark} {qid}")
            if not r.get("correct"):
                print(f"       Expected : {r.get('expected')}")
                print(f"       You wrote: {r.get('student_gave')}")

    print("-" * 55)
    print("  Per-node breakdown:")
    for nid, nh in eval_result["per_node"].items():
        pct_n = round((nh["correct"] / nh["total"]) * 100, 1) if nh["total"] else 0
        title = NODES.get(nid, {}).get("title", nid)
        print(f"    {nid} ({title}): {nh['correct']}/{nh['total']} ({pct_n}%)")
    print("=" * 55)


# ── Verification harness (deterministic) ───────────────────────────────────────
def run_builtin_verification(seed: int = _MASTER_SEED) -> None:
    """
    Runs a fixed set of correct answers through the solver and prints the result.
    Used as a self-check during development / CI.
    """
    set_seed(seed)
    correct_answers = {
        "c2_chem_001_mc_01": "drum with lid",
        "c2_chem_001_mc_02": "lid",
        "c2_chem_001_fb_01": "pot with lid",
        "c2_chem_001_fb_02": "lid",
        "c2_chem_001_tf_01": True,

        "c2_chem_002_mc_01": "colourless",
        "c2_chem_002_mc_02": "odourless",
        "c2_chem_002_fb_01": "colourless",   # one of three accepted
        "c2_chem_002_fb_02": "colourless",
        "c2_chem_002_tf_01": False,

        "c2_chem_003_mc_01": "Turn off the tap after use",
        "c2_chem_003_mc_02": "Use a bucket instead of a running hose",
        "c2_chem_003_fb_01": "turn off",
        "c2_chem_003_fb_02": "plants",
        "c2_chem_003_tf_01": True,
    }
    result = evaluate_quiz(correct_answers)
    print_result(result, show_details=True)
    assert result["total_correct"] == 15, \
        f"Expected 15/15, got {result['total_correct']}/15"
    print("  ✓ All 15 answers verified correctly.")


if __name__ == "__main__":
    run_builtin_verification()