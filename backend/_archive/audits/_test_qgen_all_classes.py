import sys, asyncio, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_selector import QuestionSelector

async def test():
    class MockDb:
        async def execute(self, *a, **kw):
            class R:
                def scalars(self):
                    class S:
                        def all(self): return []
                        def first(self): return None
                    return S()
                def scalar_one_or_none(self): return None
                def scalar(self): return 0
            return R()

    reg = SolverRegistry()
    reg.initialize()
    db = MockDb()
    selector = QuestionSelector(db)

    # Test class 5 maths
    print("=== Class 5 Mathematics ===")
    questions = await selector.select_for_diagnostic(
        subject="mathematics", topic="numbers", grade=5, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:120]}")
        if not is_placeholder:
            print(f"    Answer: {str(q.get('correct_answer', 'N/A'))[:80]}")
            print(f"    Source: {q.get('source', 'N/A')}")

    # Test class 3 EVS
    print("\n=== Class 3 EVS ===")
    questions = await selector.select_for_diagnostic(
        subject="evs", topic="environment", grade=3, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:120]}")
        if not is_placeholder:
            print(f"    Answer: {str(q.get('correct_answer', 'N/A'))[:80]}")

    # Test class 1 physics
    print("\n=== Class 1 Physics ===")
    questions = await selector.select_for_diagnostic(
        subject="physics", topic="motion", grade=1, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:120]}")
        if not is_placeholder:
            print(f"    Answer: {str(q.get('correct_answer', 'N/A'))[:80]}")

    # Test class 4 chemistry
    print("\n=== Class 4 Chemistry ===")
    questions = await selector.select_for_diagnostic(
        subject="chemistry", topic="matter", grade=4, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:120]}")
        if not is_placeholder:
            print(f"    Answer: {str(q.get('correct_answer', 'N/A'))[:80]}")

    # Test class 11 physics (6-12)
    print("\n=== Class 11 Physics ===")
    questions = await selector.select_for_diagnostic(
        subject="physics", topic="mechanics", grade=11, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:120]}")
        if not is_placeholder:
            print(f"    Answer: {str(q.get('correct_answer', 'N/A'))[:80]}")

asyncio.run(test())
