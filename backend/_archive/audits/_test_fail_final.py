import sys, asyncio
sys.path.insert(0, '.')
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

    selector = QuestionSelector(MockDb())

    # Test class 1 physics
    print("=== Class 1 Physics ===")
    questions = await selector.select_for_diagnostic(
        subject="physics", topic="motion", grade=1, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:100]}")
        if not is_placeholder:
            print(f"    Source: {q.get('source', 'N/A')}")

    # Test class 4 chemistry
    print("\n=== Class 4 Chemistry ===")
    questions = await selector.select_for_diagnostic(
        subject="chemistry", topic="matter", grade=4, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:100]}")
        if not is_placeholder:
            print(f"    Source: {q.get('source', 'N/A')}")

    # Test class 11 physics
    print("\n=== Class 11 Physics ===")
    questions = await selector.select_for_diagnostic(
        subject="physics", topic="mechanics", grade=11, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:100]}")
        if not is_placeholder:
            print(f"    Source: {q.get('source', 'N/A')}")

asyncio.run(test())
