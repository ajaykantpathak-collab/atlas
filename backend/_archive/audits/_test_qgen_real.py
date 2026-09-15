"""Test actual question generation — find the right method to call."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

qgen_types = reg.list_question_gen_types()

# Pick a few diverse generators and figure out their API
test_types = ["Class3MathQuestionGenerator", "C7PhysicsQuestionGenerator", "CISCEHistCivGenerator",
              "Class9ChemistryQuestionGenerator", "C5Math001Generator"]

for qt in test_types:
    fn = reg.get_question_gen(qt)
    if fn is None:
        print(f"{qt}: NOT FOUND")
        continue

    print(f"\n=== {qt} ===")
    print(f"  Type: {type(fn).__name__}")

    # Check if it's a class instance with methods
    methods = [m for m in dir(fn) if not m.startswith('_') and callable(getattr(fn, m, None))]
    print(f"  Public methods: {methods[:10]}")

    # Try common question generation methods
    for method_name in ['generate', 'generate_question', 'generate_questions',
                        'get_question', 'get_questions', 'create_question',
                        'next_question', 'sample', 'generate_set']:
        if hasattr(fn, method_name):
            method = getattr(fn, method_name)
            try:
                sig = inspect.signature(method)
                print(f"  Method '{method_name}' signature: {sig}")
                # Try calling it
                try:
                    if 'difficulty' in sig.parameters or 'bloom' in sig.parameters:
                        result = method(difficulty=0.5)
                    elif 'seed' in sig.parameters:
                        result = method(seed=42)
                    elif 'count' in sig.parameters:
                        result = method(count=1)
                    else:
                        result = method()

                    if isinstance(result, dict):
                        print(f"  RESULT (dict): keys={list(result.keys())}")
                        qtext = result.get('question_text', result.get('text', result.get('question', '')))
                        print(f"  Question: {str(qtext)[:120]}")
                        print(f"  Answer: {result.get('correct_answer', result.get('answer', 'N/A'))}")
                        print(f"  Type: {result.get('question_type', 'N/A')}")
                        print(f"  Difficulty: {result.get('difficulty', 'N/A')}")
                    elif isinstance(result, list) and result:
                        print(f"  RESULT (list of {len(result)})")
                        if isinstance(result[0], dict):
                            print(f"  First question: {str(result[0].get('question_text', result[0].get('text', '')))[:120]}")
                    else:
                        print(f"  RESULT: {str(result)[:200]}")
                except Exception as e:
                    print(f"  Call failed: {str(e)[:100]}")
            except (ValueError, TypeError):
                print(f"  Method '{method_name}' - can't inspect signature")

    # Also check if it's directly callable
    if callable(fn) and not isinstance(fn, type):
        try:
            result = fn()
            print(f"  Direct call: {str(result)[:200]}")
        except Exception as e:
            print(f"  Direct call failed: {str(e)[:100]}")
