"""Test question selector - READ ONLY."""
import asyncio, sys, os
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
    print(f"Registry loaded: {selector._registry is not None}")
    if selector._registry:
        try:
            qtypes = selector._registry.list_question_gen_types()
            print(f"Question gen types: {len(qtypes)}")
            for i, t in enumerate(qtypes[:15]):
                print(f"  {t}")
        except Exception as e:
            print(f"list_question_gen_types error: {e}")

    # Try selecting for different subjects
    for subject in ["maths", "physics", "chemistry", "biology"]:
        try:
            q = await selector.select_next(session_id="test", student_id="test", subject=subject)
            if q is None:
                print(f"\n{subject}: None returned")
            elif isinstance(q, dict):
                text = q.get("question", q.get("text", ""))
                ans = q.get("answer", "?")
                qtype = q.get("type", "?")
                print(f"\n{subject}: GOT QUESTION")
                print(f"  type={qtype}")
                print(f"  text: {str(text)[:150]}")
                print(f"  answer: {str(ans)[:60]}")
            else:
                print(f"\n{subject}: {type(q).__name__} = {str(q)[:100]}")
        except Exception as e:
            print(f"\n{subject}: ERROR {e}")

asyncio.run(test())
