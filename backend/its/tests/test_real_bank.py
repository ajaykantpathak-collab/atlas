"""test_real_bank.py — Evaluate the solver on REAL mined board questions.

Pulls numeric questions from question_bank.db (official CBSE SQPs,
previous questions, marking schemes; classes 9-12, physics/maths/
chemistry) and runs each through the deterministic solver stack
(router.solve_text). Reports the verified-answer rate with examples.

This is the honest K-12 gauge: real exam phrasing, no hand-crafting.
"""

from __future__ import annotations

import os
import re
import sqlite3
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..", "..")))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..")))

DB = r"D:\platform\cbse_data\question_bank.db"


def clean_question(text: str) -> str:
    """Strip section noise, options markers, trailing marks tags."""
    t = re.sub(r"\n+", " ", text)
    t = re.sub(r"\[\s*SECTION\s*[-–:]?\s*[A-E]\s*\]", " ", t, flags=re.I)
    t = re.sub(r"[\(\[]\s*(?:\d+\s*[x×]\s*)?\d\s*(?:marks?|m)\s*[\)\]]",
               " ", t, flags=re.I)
    t = re.sub(r"\[\d\]\s*$", " ", t)
    t = re.sub(r"\s{2,}", " ", t).strip()
    return t


def is_numeric_problem(text: str) -> bool:
    """At least two numbers and a computational verb - a solvable problem."""
    nums = re.findall(r"\d+(?:\.\d+)?", text)
    if len(nums) < 2:
        return False
    verbs = re.search(
        r"\b(find|calculate|compute|determine|how\s+(?:much|many|long|far)"
        r"|what\s+(?:is|are|will)|derive|evaluate)\b", text, re.I)
    return bool(verbs)


def main(limit: int = 120) -> int:
    import logging

    logging.disable(logging.WARNING)
    from backend.its.solver.router import solve_text

    conn = sqlite3.connect(DB)
    rows = conn.execute(
        """
        SELECT q.text, q.q_type, d.subject, d.class_label
        FROM questions q JOIN documents d ON q.doc_id = d.id
        WHERE d.subject IN ('physics','maths','chemistry')
          AND q.q_type IN ('SHORT','LONG','MCQ')
          AND length(q.text) BETWEEN 60 AND 1200
        ORDER BY RANDOM() LIMIT ?
        """, (limit * 3,)).fetchall()

    tested = solved = mcq_solved = 0
    verified_count = 0
    mcq_total = 0
    solved_examples, unsolved_examples, gp_examples = [], [], []

    for text, q_type, subject, cls in rows:
        if tested >= limit:
            break
        t = clean_question(text)
        if not is_numeric_problem(t):
            continue
        tested += 1
        try:
            r = solve_text(t)
        except Exception:
            r = None
        ok = bool(r and r.solved and r.numeric is not None)
        verified = bool(r and ok and r.verified)
        if q_type == "MCQ":
            mcq_total += 1
            mcq_solved += int(ok)
        solved += int(ok)
        verified_count += int(verified)
        line = f"[{subject}/{cls}/{q_type}] {t[:110]}"
        if ok and verified:
            if len(solved_examples) < 8:
                solved_examples.append(
                    f"{line}\n   -> ANSWER {r.answer[:100]} ({r.stage}, "
                    f"{r.elapsed_ms:.0f}ms)")
        elif ok:
            if len(gp_examples) < 4:
                gp_examples.append(
                    f"{line}\n   -> GUIDED PRACTICE (unverified "
                    f"{r.stage}: {r.answer[:70]})")
        else:
            if len(unsolved_examples) < 4:
                reason = (r.summary()[:80] if r else "exception")
                unsolved_examples.append(f"{line}\n   -> {reason}")

    rate = 100.0 * solved / max(1, tested)
    print("=" * 74)
    print(f"REAL BOARD QUESTIONS (K-12): coverage {solved}/{tested} = "
          f"{rate:.0f}%")
    print(f"  VERIFIED ANSWERS (app shows final answer): "
          f"{verified_count}/{tested} = "
          f"{100 * verified_count / max(1, tested):.0f}%")
    print(f"  GUIDED PRACTICE (method shown, student computes): "
          f"{solved - verified_count}/{tested}")
    if mcq_total:
        print(f"  MCQ subset: {mcq_solved}/{mcq_total}")
    print("-" * 74)
    print("VERIFIED EXAMPLES:")
    for s_ in solved_examples:
        print(" +", s_)
    print("GUIDED PRACTICE SAMPLES:")
    for s_ in gp_examples:
        print(" ~", s_)
    print("REFUSED SAMPLES:")
    for s_ in unsolved_examples:
        print(" -", s_)
    return 0


if __name__ == "__main__":
    sys.exit(main(int(sys.argv[1]) if len(sys.argv) > 1 else 120))
