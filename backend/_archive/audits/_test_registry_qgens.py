"""Test question generation through the registry - READ ONLY."""
import sys, os, asyncio
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
    if not selector._registry:
        print("No registry!")
        return

    qtypes = selector._registry.list_question_gen_types()
    print(f"Registry question gen types: {len(qtypes)}")

    # Group by subject
    from collections import Counter
    subj_count = Counter()
    for qt in qtypes:
        parts = qt.split(":")[0].replace("class", "").split("_")
        subj_count[parts[1] if len(parts) > 1 else parts[0]] += 1

    print("\nBy subject:")
    for s, c in subj_count.most_common():
        print(f"  {s}: {c}")

    # Test each subject
    print("\n=== Testing question generation by subject ===")
    subjects = ["maths", "physics", "chemistry", "biology", "english", "hindi",
                "geo", "evs", "cs", "histciv", "acc", "econ", "appmath",
                "bio", "chem", "phy", "comm", "bs", "pol", "psy", "soc",
                "home", "legal", "massmedia", "biotech", "commapp", "commstud",
                "econapp"]
    ok = 0
    fail = 0
    for subj in subjects:
        try:
            q = await selector.select_next(session_id="t", student_id="t", subject=subj)
            if q and isinstance(q, dict):
                text = q.get("text", q.get("question", ""))
                if text and len(str(text)) > 10:
                    print(f"  {subj:<12} OK   {str(text)[:70]}")
                    ok += 1
                else:
                    print(f"  {subj:<12} EMPTY (text empty)")
                    fail += 1
            else:
                print(f"  {subj:<12} NONE")
                fail += 1
        except Exception as e:
            print(f"  {subj:<12} ERROR {str(e)[:60]}")
            fail += 1

    print(f"\nRESULT: {ok} OK / {fail} FAIL out of {len(subjects)} subjects")

asyncio.run(test())
