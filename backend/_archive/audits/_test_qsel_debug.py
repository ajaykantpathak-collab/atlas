"""Debug question selector float error - READ ONLY."""
import asyncio, sys, os, traceback
sys.path.insert(0, os.path.dirname(__file__))

async def test():
    from services.question_selector import QuestionSelector
    class MockDB:
        async def execute(self, *a, **k):
            class R:
                def scalar_one_or_none(self): return None
                def scalars(self): return self
                def all(self): return []
                def first(self): return None
            return R()
    selector = QuestionSelector(MockDB())
    try:
        q = await selector.select_next(session_id="t", student_id="t", subject="maths")
        if q and isinstance(q, dict):
            text = q.get("text", q.get("question", ""))
            print(f"OK: {str(text)[:80]}")
            print(f"  difficulty: {q.get('difficulty')}")
            print(f"  correct_answer type: {type(q.get('correct_answer'))}")
        else:
            print(f"None or wrong type: {q}")
    except Exception as e:
        print(f"ERROR: {e}")
        traceback.print_exc()

asyncio.run(test())
