import sys, asyncio
sys.path.insert(0, '.')
from services.question_selector import QuestionSelector

async def test():
    # Mock db
    class MockDb:
        async def execute(self, *a, **kw):
            class MockResult:
                def scalars(self):
                    class MockScalars:
                        def all(self): return []
                        def first(self): return None
                    return MockScalars()
                def scalar_one_or_none(self): return None
                def scalar(self): return 0
            return MockResult()

    db = MockDb()
    selector = QuestionSelector(db)

    # Test with grade 5 maths — should match C5Math001Generator
    print("=== Grade 5 Mathematics ===")
    questions = await selector.select_for_diagnostic(
        subject="mathematics", topic="algebra", grade=5, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:100]}")
        if not is_placeholder:
            print(f"    Answer: {q.get('correct_answer', 'N/A')}")
            print(f"    Source: {q.get('source', 'N/A')}")

    # Test with grade 7 physics
    print("\n=== Grade 7 Physics ===")
    questions = await selector.select_for_diagnostic(
        subject="physics", topic="motion", grade=7, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:100]}")
        if not is_placeholder:
            print(f"    Answer: {q.get('correct_answer', 'N/A')}")

    # Test with grade 11 history
    print("\n=== Grade 11 History/Civics ===")
    questions = await selector.select_for_diagnostic(
        subject="history", topic="modern_history", grade=11, count=3
    )
    for q in questions:
        qtext = q.get("text", q.get("question_text", ""))
        is_placeholder = "Diagnostic question" in qtext
        print(f"  {'PLACEHOLDER' if is_placeholder else 'REAL'}: {qtext[:100]}")
        if not is_placeholder:
            print(f"    Answer: {q.get('correct_answer', 'N/A')}")

asyncio.run(test())
