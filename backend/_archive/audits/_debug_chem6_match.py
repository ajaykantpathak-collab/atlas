import sys, asyncio
sys.path.insert(0, '.')
from services.question_selector import QuestionSelector

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

async def test():
    selector = QuestionSelector(MockDb())
    
    # Trace class 6 chemistry
    subject_grade_match, subject_match = selector._match_generators("chemistry", "matter", 6)
    print(f"Grade 6 Chemistry:")
    print(f"  subject_grade_match: {subject_grade_match}")
    print(f"  subject_match: {subject_match}")

    # Check which ones have adapters
    for qt in subject_grade_match + subject_match:
        adapter = selector._adapters.get_adapter(qt)
        status = "OK" if adapter else "FAIL"
        print(f"    {qt}: {status}")

    # Try generating
    questions = await selector.select_for_diagnostic(
        subject="chemistry", topic="matter", grade=6, count=3
    )
    for i, q in enumerate(questions):
        qtext = q.get("text", q.get("question_text", ""))
        print(f"  Q{i+1}: {str(qtext)[:80]}")

asyncio.run(test())
