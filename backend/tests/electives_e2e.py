"""electives_e2e.py -- the electives end-to-end acceptance battery
(ELECTIVES-ALL).  Corpus-shaped asks through answer(); every case must
ship VERIFIED with the examiner key.  HF offline: the semantic models
are cached; a hub round-trip must never hang a solve.

Run: python tests/electives_e2e.py [cs|acc|bs]
"""
import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _HERE)
sys.path.insert(0, os.path.dirname(os.path.dirname(_HERE)))
os.environ.setdefault("SOLVER_LLM_MODE", "off")
os.environ.setdefault("HF_HUB_OFFLINE", "1")
os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")

CS = [
    ("What is the output of: print(7 // 2) in Python?", "3"),
    ("Predict the output of the following code:\n```python\nx = 10\n"
     "y = 3.5\nz = x + y\nprint(z)\n```\nJustify your answer.", "13.5"),
    ("What data type is the value 3.14 in Python?", "float"),
    ("Which SQL clause is used to filter rows before grouping?", "WHERE"),
    ("A query uses SELECT COUNT(DISTINCT CITY) FROM CUSTOMERS. The CITY "
     "column has values: 'Delhi', 'Mumbai', 'Delhi', NULL, 'Chennai', "
     "'Mumbai', NULL. What is the result?", "3"),
    ("Consider tables `A(id, val)` and `B(id, val)`. Table A has rows "
     "(1,'a'), (2,'b'), (3,'c'). Table B has rows (1,'x'), (2,'y'). "
     "Write the result of `SELECT * FROM A LEFT JOIN B ON A.id = B.id`.",
     "(3, 'c', NULL"),
    ("A developer writes `SELECT * FROM Table1 CROSS JOIN Table2` where "
     "Table1 has 10 rows and Table2 has 5 rows. The developer expects 15 "
     "rows. Evaluate this expectation and explain the correct result "
     "size.", "50"),
    ("Trace the state of a stack after the following sequence of "
     "operations on an initially empty stack: push(10), push(20), "
     "push(30), pop(), push(40), pop(), pop(). Show the stack contents.",
     "top = 10"),
    ("Evaluate the postfix expression: 5 3 + 8 2 - *", "48"),
]

ACC = [
    ("A partnership without a deed has three partners: X, Y, Z. X "
     "advances a loan of Rs 5,00,000 to the firm. The firm earns "
     "Rs 3,00,000 profit. What interest is X entitled to on his loan "
     "for one year?", "30,000"),
    ("A and B are partners sharing profits 3:2. Their capitals on 1st "
     "April: A Rs 3,00,000, B Rs 2,00,000. Interest on capital @ 10% "
     "p.a. Calculate the interest on capital for A.", "30,000"),
    ("Partner X has a fixed capital of Rs 4,00,000 on 1st April. On "
     "1st October, X introduces additional capital of Rs 1,00,000. "
     "Interest on capital is allowed @ 9% p.a. Calculate the total "
     "interest on X's capital for the year.", "40,500"),
    ("Arun and Varun are partners with capitals Rs 4,00,000 and "
     "Rs 3,00,000 respectively. The partnership deed provides for "
     "interest on capital at 8% per annum. Calculate the interest on "
     "capital for Arun.", "32,000"),
    ("A and B are partners sharing profits 3:2. Net profit before "
     "appropriations is Rs 3,00,000. Interest on capital @ 12% on "
     "Rs 4,00,000 (A) and Rs 3,00,000 (B). Calculate the divisible "
     "profit and A's share.", "129,600"),
    ("A firm purchases machinery for Rs 12,00,000 on 1st April 2023. "
     "The machinery has an estimated useful life of 6 years and zero "
     "residual value. Calculate the annual depreciation under the "
     "Straight Line Method.", "200,000"),
]

BS = [
    # net GST payable = output GST - input credit (commerce additive)
    ("A manufacturer buys raw materials worth Rs 5,00,000 (plus GST "
     "@18%) and sells finished goods worth Rs 8,00,000 (plus GST "
     "@12%). Calculate the net GST payable in cash.", "6,000"),
]

BATTERIES = {"cs": CS, "acc": ACC, "bs": BS}


def main():
    names = sys.argv[1:] or list(BATTERIES)
    from backend.its.solver.answer_pipeline import answer
    total = passed = 0
    for name in names:
        for q, want in BATTERIES[name]:
            total += 1
            try:
                r = answer(q)
                got = str(r.answer or "")
                ok = want in got
                lab = str(r.label)[:16]
            except Exception as e:  # noqa: BLE001
                got, ok, lab = f"CRASH {e}", False, "CRASH"
            passed += ok
            print(f"{'OK ' if ok else 'MISS'} [{name}] {lab} | want "
                  f"{want} | got {got[:70].splitlines()[0] if got else ''}")
    print(f"TOTALS: {passed}/{total}")


if __name__ == "__main__":
    main()
