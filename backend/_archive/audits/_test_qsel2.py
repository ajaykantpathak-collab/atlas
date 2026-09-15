"""Test question selector - check full question dict - READ ONLY."""
import asyncio, sys, os, json
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
    q = await selector.select_next(session_id="test", student_id="test", subject="maths")
    if q is None:
        print("None returned")
        return
    print("Full question dict keys:", list(q.keys()))
    print()
    for k, v in q.items():
        val_str = str(v)
        if len(val_str) > 200:
            val_str = val_str[:200] + "..."
        print(f"  {k}: {val_str}")

asyncio.run(test())
