"""Inspect question generator output with seed - READ ONLY."""
import sys, os, random
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'maths'))
import class10_maths_questions as m

gens = [a for a in dir(m) if a.startswith('gen_')]
print(f"Class 10 Maths generators: {len(gens)}")
for g in gens[:5]:
    fn = getattr(m, g)
    try:
        result = fn(seed=42)
        if isinstance(result, list):
            print(f"  {g}: {len(result)} questions")
            if result:
                q = result[0]
                if isinstance(q, dict):
                    text = q.get("question", q.get("text", ""))
                    qtype = q.get("type", "?")
                    opts = q.get("options", [])
                    ans = q.get("answer", "?")
                    print(f"    text: {str(text)[:150]}")
                    print(f"    type={qtype} options={len(opts) if isinstance(opts,list) else '?'} answer={str(ans)[:60]}")
        elif isinstance(result, dict):
            print(f"  {g}: single question")
            text = result.get("question", result.get("text", ""))
            print(f"    text: {str(text)[:150]}")
    except Exception as e:
        print(f"  {g}: ERROR {e}")

# Check physics
print()
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'physics'))
import class12_physics_questions as pm
pgens = [a for a in dir(pm) if a.startswith('gen_')]
print(f"Class 12 Physics generators: {len(pgens)}")
for g in pgens[:5]:
    fn = getattr(pm, g)
    try:
        result = fn(seed=42)
        if isinstance(result, list) and result:
            q = result[0]
            if isinstance(q, dict):
                text = q.get("question", q.get("text", ""))
                print(f"  {g}: {len(result)} q | {str(text)[:120]}")
        elif isinstance(result, dict):
            text = result.get("question", result.get("text", ""))
            print(f"  {g}: single | {str(text)[:120]}")
    except Exception as e:
        print(f"  {g}: ERROR {e}")

# Check how practice endpoint calls these
print("\n=== Practice endpoint ===")
sys.path.insert(0, os.path.dirname(__file__))
try:
    from api.practice import router
    print("Practice router loaded")
    # Find the function that selects questions
    import inspect
    for name, obj in inspect.getmembers(__import__('api.practice', fromlist=['*'])):
        if inspect.isfunction(obj) and 'question' in name.lower():
            print(f"  Found: {name}")
except Exception as e:
    print(f"Practice import error: {e}")
