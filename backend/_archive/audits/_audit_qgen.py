"""Check what question generators are actually registered and if they work."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

qgen_types = reg.list_question_gen_types()
print(f"=== QUESTION GENERATORS ===")
print(f"Total question types: {len(qgen_types)}")
print()

# Show all types
for qt in sorted(qgen_types)[:50]:
    print(f"  {qt}")
if len(qgen_types) > 50:
    print(f"  ... and {len(qgen_types) - 50} more")

# Try to actually generate a question from a few types
print(f"\n=== TEST: Generate questions ===")
test_types = qgen_types[:10] if len(qgen_types) >= 10 else qgen_types
for qt in test_types:
    try:
        fn = reg.get_question_gen(qt)
        if fn is None:
            print(f"  {qt}: No generator function found")
            continue

        # Try calling it
        import inspect
        if callable(fn):
            try:
                # Try with seed
                result = fn(seed=42) if 'seed' in inspect.signature(fn).parameters else fn()
                if isinstance(result, dict):
                    qtext = result.get('question_text', result.get('text', result.get('question', '')))
                    print(f"  {qt}: OK - {str(qtext)[:80]}")
                elif isinstance(result, list) and result:
                    qtext = result[0].get('question_text', result[0].get('text', '')) if isinstance(result[0], dict) else str(result[0])
                    print(f"  {qt}: OK (list of {len(result)}) - {str(qtext)[:80]}")
                else:
                    print(f"  {qt}: OK - {str(result)[:80]}")
            except Exception as e:
                print(f"  {qt}: CALL FAILED - {str(e)[:80]}")
        else:
            print(f"  {qt}: Not callable - type={type(fn).__name__}")
    except Exception as e:
        print(f"  {qt}: ERROR - {str(e)[:80]}")

# Check question_gen modules
print(f"\n=== QUESTION GEN MODULES ===")
for name, entry in reg._question_gens.items():
    print(f"  {name}: {len(entry.registry)} types")
