"""commerce_matrix_probe.py -- accounts/BS/CS classes 11-12 board battery.

Hand-curated NCERT/board questions through the live pipeline (LLM off,
in-process). Examiner classification: CORRECT / WRONG / HONEST-REFUSE /
ERROR. This is the never-audited lane's first probe."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

CASES = [
    # accounts c11 — accounting equation & journal basics
    ("accounts11", "Assets of a firm are Rs 1,00,000 and liabilities are Rs 40,000. What is the capital?", "60000"),
    ("accounts11", "A transaction increases both assets and liabilities by Rs 10,000. What happens to capital?", None),
    ("accounts11", "Goods costing Rs 5,000 are sold for Rs 6,500. What is the profit?", "1500"),
    ("accounts11", "Calculate total purchases returns when returns outward account shows Rs 2,000.", None),
    # accounts c12 — partnership/salary/commission basics
    ("accounts12", "A and B share profits in the ratio 3:2. What is A's share as a fraction?", None),
    ("accounts12", "Interest on a partner's loan of Rs 50,000 at 6% per annum for one year.", "3000"),
    ("accounts12", "Average profit of a firm is Rs 40,000. Goodwill is valued at 2 years' purchase of average profit. What is the goodwill?", "80000"),
    # BS c12 — management function definitions
    ("bs12", "Which function of management is considered the base of all other functions?", None),
    ("bs12", "What does KT stand for in business studies?", None),
    # CS c11-12 — python basics
    ("cs11", "What is the output of: print(7 // 2) in Python?", "3"),
    ("cs11", "What data type is the value 3.14 in Python?", None),
    ("cs12", "Which SQL clause is used to filter rows before grouping?", None),
]


def classify(label, answer, expected):
    lab = str(label or "")
    ans = str(answer or "").strip().lower()
    if not lab.startswith("VERIFIED"):
        return "REFUSE"
    if expected:
        exp = str(expected).lower()
        if exp in ans:
            return "CORRECT"
        import re
        me = re.search(r"-?\d[\d,]*(?:\.\d+)?", expected.replace(",", ""))
        ma = re.search(r"-?\d[\d,]*(?:\.\d+)?", ans.replace(",", ""))
        if me and ma:
            ve, va = float(me.group(0).replace(",", "")), float(ma.group(0).replace(",", ""))
            if abs(va - ve) <= max(0.01, 0.02 * abs(ve)):
                return "CORRECT"
        return "WRONG"
    return "ANSWERED"   # answered without a strict key — manual read


def main():
    from backend.its.solver.answer_pipeline import answer
    out = []
    for lane, q, exp in CASES:
        try:
            r = answer(q)
            v = classify(r.label, r.answer, exp)
            rec = {"lane": lane, "q": q[:70], "label": str(r.label)[:14],
                   "answer": str(r.answer)[:70], "verdict": v}
        except Exception as e:
            rec = {"lane": lane, "q": q[:70], "verdict": "CRASH",
                   "err": f"{type(e).__name__}: {e}"[:70]}
        out.append(rec)
        print(json.dumps(rec, ensure_ascii=False), flush=True)
    from collections import Counter
    c = Counter(r["verdict"] for r in out)
    print("TOTALS:", dict(c), flush=True)
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                           "_commerce_probe.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
