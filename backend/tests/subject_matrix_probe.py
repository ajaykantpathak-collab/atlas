"""subject_matrix_probe.py -- per-subject × class probe of the solve pipeline.

Runs 4 hand-written board-style questions per (subject, class) through
backend.its.solver.answer_pipeline.answer and records:
  VERIFIED+expected  -> SOLVE
  VERIFIED+wrong     -> WRONG (the app-killing class)
  GUIDED/REFUSED     -> REFUSE
  other/crash        -> ERROR

Output: tests/_subject_matrix.jsonl (one row per case) + a summary table.
This is the coverage instrument SOLVER-DIG fixes get measured with.
"""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

# (subject, class, question, expected_value_or_substring) — 4 per lane,
# board-style, curated to what the deterministic engine SHOULD own
MATRIX = [
    # maths c6-c12
    ("maths", 6, "Add: 4,568 + 2,432.", "7000"),
    ("maths", 7, "Solve: 3x = 21. Find x.", "7"),
    ("maths", 8, "Find the square root of 1,024.", "32"),
    ("maths", 9, "Factorise: x^2 - 5x + 6", None),  # (x-2)(x-3)
    ("maths", 10, "Solve: 2x^2 - 5x - 3 = 0", None),
    ("maths", 11, "Find the 10th term of the AP: 2, 5, 8, ...", "29"),
    ("maths", 12, "Find the derivative of x^3 with respect to x.", None),
    # physics c9-c12
    ("physics", 9, "A car travels 100 m in 20 s. Find its speed in m/s.", "5"),
    ("physics", 10, "A 12 V battery drives 2 A through a resistor. Find the resistance.", "6"),
    ("physics", 11, "A body is thrown up at 20 m/s. Find the maximum height (g = 10 m/s^2).", "20"),
    ("physics", 12, "Two resistors 4 ohm and 6 ohm in series. Find total resistance.", "10"),
    # chemistry c9-c12
    ("chemistry", 9, "What is the atomic number of carbon (6 protons)?", "6"),
    ("chemistry", 10, "How many moles are in 98 g of H2SO4 (molar mass 98 g/mol)?", "1"),
    ("chemistry", 11, "What is the pH of a neutral solution at 25 C?", "7"),
    ("chemistry", 12, "What is the oxidation state of S in H2SO4?", None),
    # biology c9-c12
    ("biology", 9, "Which cell organelle is called the powerhouse of the cell?", None),
    ("biology", 10, "Name the process by which plants lose water through leaves.", None),
    ("biology", 11, "Which pigment absorbs light in photosynthesis?", None),
    ("biology", 12, "In a cross Aa x Aa, what fraction shows the recessive trait?", None),
    # humanities — honest lane expectations differ
    ("history", 9, "In which year did the French Revolution begin?", None),
    ("history", 10, "Who wrote the book Hind Swaraj?", None),
    ("civics", 8, "How many fundamental rights does the Indian Constitution grant?", None),
    ("geo", 10, "Which is the longest river in India?", None),
    ("economics", 10, "What does GDP stand for?", None),
    # commerce/accounts c11-12
    ("accounts", 11, "What is the accounting equation? (assets = liabilities + ___)", None),
    ("bs", 12, "What does KT stand for in KT planning?", None),
]


def classify(label, answer, expected):
    lab = str(label or "")
    ans = str(answer or "").strip()
    if not lab.startswith("VERIFIED"):
        return "REFUSE" if ("GUIDED" in lab or "REFUS" in lab or "ambig" in lab.lower()) else "OTHER"
    if expected is None:
        return "SOLVE"           # verified, no strict key — spot-check by read
    exp = str(expected).lower()
    if exp in ans.lower():
        return "SOLVE"
    # numeric-tolerant compare
    import re
    m_e = re.search(r"-?\d[\d,]*(?:\.\d+)?", str(expected).replace(",", ""))
    m_a = re.search(r"-?\d[\d,]*(?:\.\d+)?", ans.replace(",", ""))
    if m_e and m_a:
        try:
            ve, va = float(m_e.group(0).replace(",", "")), float(m_a.group(0).replace(",", ""))
            if abs(va - ve) <= max(0.01, 0.02 * abs(ve)):
                return "SOLVE"
        except ValueError:
            pass
    return "WRONG"


def main():
    from backend.its.solver.answer_pipeline import answer
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "_subject_matrix.jsonl")
    summary: dict = {}
    with open(out_path, "w", encoding="utf-8") as fh:
        for subj, cls, q, expected in MATRIX:
            t0 = time.time()
            try:
                r = answer(q)
                verdict = classify(r.label, r.answer, expected)
                rec = {"subject": subj, "class": cls, "q": q[:60],
                       "label": str(r.label), "answer": str(r.answer)[:70],
                       "expected": str(expected) if expected else None,
                       "verdict": verdict, "secs": round(time.time() - t0, 1)}
            except Exception as e:
                rec = {"subject": subj, "class": cls, "q": q[:60],
                       "label": "CRASH",
                       "answer": f"{type(e).__name__}: {e}"[:80],
                       "verdict": "ERROR", "secs": round(time.time() - t0, 1)}
            key = f"{subj}/c{cls}"
            summary.setdefault(key, []).append(rec["verdict"])
            fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
            print(json.dumps(rec, ensure_ascii=False), flush=True)

    print("\n=== SUMMARY (per lane) ===", flush=True)
    totals = {"SOLVE": 0, "WRONG": 0, "REFUSE": 0, "OTHER": 0, "ERROR": 0}
    for lane, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in totals}
        for k in totals:
            totals[k] += c[k]
        print(f"  {lane:14s} " + " ".join(f"{k}={c[k]}" for k in totals
                                          if c[k]))
    print(f"TOTAL: {totals}")


if __name__ == "__main__":
    main()
