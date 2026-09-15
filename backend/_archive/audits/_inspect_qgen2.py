"""Inspect question generator output - READ ONLY."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'maths'))
import class10_maths_questions as m

gens = [a for a in dir(m) if a.startswith('gen_')]
print(f"Class 10 Maths generators: {len(gens)}")
for g in gens[:5]:
    fn = getattr(m, g)
    try:
        result = fn()
        if isinstance(result, list):
            print(f"  {g}: {len(result)} questions")
            if result:
                q = result[0]
                if isinstance(q, dict):
                    text = q.get("question", q.get("text", ""))
                    qtype = q.get("type", "?")
                    opts = q.get("options", [])
                    ans = q.get("answer", "?")
                    print(f"    text: {str(text)[:120]}")
                    print(f"    type={qtype} options={len(opts) if isinstance(opts,list) else '?'} answer={str(ans)[:50]}")
        elif isinstance(result, dict):
            print(f"  {g}: single question")
            text = result.get("question", result.get("text", ""))
            print(f"    text: {str(text)[:120]}")
        else:
            print(f"  {g}: {type(result).__name__}")
    except Exception as e:
        print(f"  {g}: ERROR {e}")

# Also check how the practice endpoint uses these
print("\n=== Checking practice endpoint ===")
sys.path.insert(0, os.path.dirname(__file__))
