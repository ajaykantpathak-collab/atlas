#!/usr/bin/env python3
"""SPRINT 1 - THE ADVERSARIAL NET.

Plant unanswerable questions, push them through every lane a student answer
can come from, and assert none produces a released answer.

Every later sprint is measured against this net. Every other test in this repo
measures "does the correct case work", which is what let a verifier be
believed before it was ever shown to fail.

A SURVIVAL is: VERIFIED with no independent verification, or a refusal that
still leaks a number, or a lane that raises.

Run: python scripts/planted_attack_suite.py
"""
from __future__ import annotations

import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from backend.its.solver.contract import SolverStatus

VERIFIED = SolverStatus.VERIFIED

PLANTED = {
    "maths": [
        ("Evaluate 3x + 4 when x = 5.", "substitution value echoed as result"),
        ("Evaluate 3x + 6 when x = 9.", "substitution value echoed as result"),
        ("Rs 660 is divided between two friends in the ratio 5 : 6. Find the share of the first friend.", "ratio returned not amount"),
        ("Find the x-coordinate of the midpoint of (0,0) and (3,6).", "point returned not scalar"),
        ("A car covers 120 km in 2 h. What is its average speed?", "no independent relation exists"),
        ("What is the value of 3x + 4?", "underdetermined"),
        ("Solve for x: x = x + 1.", "no solution exists"),
        ("Check the proportion 9 : 6 :: 36 : 24.", "no quantity requested"),
    ],
    "physics": [
        ("A body moves 100 m in 0 s. Find its speed.", "zero time"),
        ("A force acts on a mass of 0 kg. Find the acceleration.", "zero mass"),
        ("Two forces of 5 N and 3 N act. Find the net force.", "no direction given"),
        ("A resistor of 0 ohm carries current. Find the voltage.", "zero resistance"),
        ("What is the unit of power?", "no computation possible"),
        ("Find the speed when distance is missing.", "missing input"),
        ("A body travels 50 m north and 50 m south. Find total distance.", "distance vs displacement"),
    ],
    "chemistry": [
        ("How many moles in an unknown quantity of water?", "missing input"),
        ("What is the pH of a solution with no pH given?", "missing input"),
        ("Find the atomic mass of an element that does not exist.", "false premise"),
        ("What is the limiting reagent when none are given?", "missing input"),
        ("Calculate the pH of a 5 M hydrochloric acid solution.", "impossible concentration"),
    ],
    "biology": [
        ("Explain photosynthesis in one word.", "underspecified"),
        ("How many mitochondria are in a liver cell?", "variable answer"),
        ("Name the organelle absent from plant cells.", "false premise"),
        ("How many cells are in the human body?", "no fixed answer"),
    ],
}


def lanes():
    from backend.ai import pattern_solver
    out = [("pattern_solver.solve", pattern_solver.solve)]
    try:
        from backend.its.solver import verified_kinematics as vk
        out.append(("verified_kinematics.solve", vk.solve))
    except Exception:
        pass
    return out


def survived(out):
    status = getattr(out, "status", None)
    if status is None and getattr(out, "matched", None):
        status = VERIFIED
    if status is None:
        status = SolverStatus.UNSUPPORTED
    answer = getattr(out, "answer", None)
    numeric = getattr(out, "numeric", None)
    proof = getattr(out, "proof", {}) or {}
    if status == VERIFIED:
        if not proof.get("verification"):
            return "released VERIFIED with no independent verification (answer=%r)" % (answer,)
        return ""
    leaked = getattr(out, "released_answer", None)
    if callable(leaked) and leaked() not in (None, ""):
        return "refusal %s leaked answer %r" % (status.value, leaked())
    if numeric is not None:
        return "refusal %s still carried numeric=%r" % (status.value, numeric)
    if isinstance(answer, str) and answer.strip() and len(answer.strip()) <= 12 and any(c.isdigit() for c in answer):
        return "refusal %s carried answer=%r" % (status.value, answer.strip())
    return ""


def main():
    ls = lanes()
    print("=" * 74)
    print("SPRINT 1 -- PLANTED ATTACK SUITE")
    print("=" * 74)
    print("lanes:", ", ".join(n for n, _ in ls))
    total = failures = 0
    detail = []
    per = {}
    for subject, cases in PLANTED.items():
        st = sf = 0
        for question, why in cases:
            for name, fn in ls:
                try:
                    out = fn(question)
                except Exception as exc:
                    problem = "lane raised %s: %s" % (type(exc).__name__, exc)
                else:
                    problem = survived(out)
                st += 1
                total += 1
                if problem:
                    sf += 1
                    failures += 1
                    detail.append((subject, name, question, why, problem))
        per[subject] = (st, sf)
    print()
    for s, (t, f) in per.items():
        print("  %-10s %3d attacks  %3d survived  %s" % (s, t, f, "PASS" if f == 0 else "FAIL"))
    print()
    print("=" * 74)
    if failures:
        print("GATE: FAIL -- %d of %d planted answers reached a student" % (failures, total))
        print("=" * 74)
        for s, lane, q, why, pr in detail[:30]:
            print("  [%s | %s] %s" % (s, lane, why))
            print("      Q: %s" % q[:92])
            print("      -> %s" % pr[:110])
        return 1
    print("GATE: PASS -- zero of %d planted answers reached a student" % total)
    print("=" * 74)
    return 0


if __name__ == "__main__":
    sys.exit(main())
