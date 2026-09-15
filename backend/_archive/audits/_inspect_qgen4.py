"""Inspect question generator output - READ ONLY. Try different call signatures."""
import sys, os, random, inspect
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'maths'))
import class10_maths_questions as m

gens = [a for a in dir(m) if a.startswith('gen_')]
print(f"Class 10 Maths generators: {len(gens)}")
for g in gens[:3]:
    fn = getattr(m, g)
    sig = inspect.signature(fn)
    print(f"  {g} signature: {sig}")
    # Try with no args
    try:
        result = fn()
        if isinstance(result, list) and result:
            q = result[0]
            if isinstance(q, dict):
                text = q.get("question", q.get("text", ""))
                print(f"    -> {len(result)} q | {str(text)[:150]}")
        elif isinstance(result, dict):
            text = result.get("question", result.get("text", ""))
            print(f"    -> single | {str(text)[:150]}")
    except Exception as e:
        print(f"    -> ERROR no args: {e}")

# Check physics
print()
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'physics'))
import class12_physics_questions as pm
pgens = [a for a in dir(pm) if a.startswith('gen_')]
print(f"Class 12 Physics generators: {len(pgens)}")
for g in pgens[:3]:
    fn = getattr(pm, g)
    sig = inspect.signature(fn)
    print(f"  {g} signature: {sig}")
    try:
        result = fn()
        if isinstance(result, list) and result:
            q = result[0]
            if isinstance(q, dict):
                text = q.get("question", q.get("text", ""))
                print(f"    -> {len(result)} q | {str(text)[:150]}")
        elif isinstance(result, dict):
            text = result.get("question", result.get("text", ""))
            print(f"    -> single | {str(text)[:150]}")
    except Exception as e:
        print(f"    -> ERROR: {e}")

# Check the practice endpoint _get_question
print("\n=== Practice _get_question ===")
sys.path.insert(0, os.path.dirname(__file__))
try:
    from api.practice import _get_question, _format_question
    print(f"_get_question sig: {inspect.signature(_get_question)}")
    print(f"_format_question sig: {inspect.signature(_format_question)}")
    # Read the source
    src = inspect.getsource(_get_question)
    print(f"\n_get_question source ({len(src)} chars):")
    print(src[:800])
except Exception as e:
    print(f"Error: {e}")
