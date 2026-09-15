"""Test question generation with proper instantiation."""
import sys, inspect, json
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Test generators that we know exist
tests = [
    ("C7PhysicsQuestionGenerator", "class7_physics_questions"),
    ("CISCEHistCivGenerator", "class11_histciv_questions"),
    ("Class9ChemistryQuestionGenerator", "class9_chem_questions"),
    ("C5Math001Generator", "class5_maths_questions"),
    ("Class3MathQuestionGenerator", "class3_maths_questions"),
]

for qtype, module_name in tests:
    print(f"\n=== {qtype} ===")
    fn = reg.get_question_gen(qtype)
    if fn is None:
        print(f"  NOT FOUND")
        continue

    # It's a class — instantiate it
    try:
        instance = fn() if isinstance(fn, type) else fn
        print(f"  Instantiated: {type(instance).__name__}")

        # Find generation methods
        methods = [m for m in dir(instance) if not m.startswith('_') and callable(getattr(instance, m, None))]
        gen_methods = [m for m in methods if 'generate' in m.lower() or 'question' in m.lower() or 'create' in m.lower()]
        print(f"  Gen methods: {gen_methods}")

        # Try generate with various signatures
        for method_name in ['generate', 'generate_questions', 'generate_question']:
            if not hasattr(instance, method_name):
                continue
            method = getattr(instance, method_name)
            sig = inspect.signature(method)
            params = list(sig.parameters.keys())
            print(f"  Trying {method_name}({params})")

            try:
                # Build kwargs based on parameter names
                kwargs = {}
                for p in params:
                    if p == 'self':
                        continue
                    elif p == 'node_id' or p == 'node':
                        kwargs[p] = 'test_node_001'
                    elif p == 'seed':
                        kwargs[p] = 42
                    elif p == 'n' or p == 'count' or p == 'num_questions':
                        kwargs[p] = 3
                    elif p == 'difficulty':
                        kwargs[p] = 'Medium'
                    elif p == 'qtype':
                        kwargs[p] = None
                    elif p == 'mix':
                        kwargs[p] = None

                result = method(**kwargs)

                if isinstance(result, list) and result:
                    print(f"  Generated {len(result)} questions!")
                    q = result[0]
                    if isinstance(q, dict):
                        print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', ''))))[:120]}")
                        print(f"  Answer: {q.get('correct_answer', q.get('answer', 'N/A'))}")
                        print(f"  Type: {q.get('question_type', q.get('type', 'N/A'))}")
                        print(f"  Difficulty: {q.get('difficulty', 'N/A')}")
                        print(f"  Keys: {list(q.keys())}")
                    elif hasattr(q, 'question_text'):
                        print(f"  Q1: {q.question_text[:120]}")
                        print(f"  Answer: {getattr(q, 'correct_answer', getattr(q, 'answer', 'N/A'))}")
                        print(f"  Type: {getattr(q, 'question_type', 'N/A')}")
                        print(f"  Difficulty: {getattr(q, 'difficulty', 'N/A')}")
                        print(f"  Attrs: {[a for a in dir(q) if not a.startswith('_')]}")
                    else:
                        print(f"  Q1: {str(q)[:200]}")
                elif isinstance(result, dict):
                    print(f"  Generated 1 question (dict)")
                    print(f"  Q: {str(result.get('question_text', result.get('text', '')))[:120]}")
                else:
                    print(f"  Result: {str(result)[:200]}")
                break
            except Exception as e:
                print(f"  {method_name} failed: {str(e)[:120]}")

    except Exception as e:
        print(f"  Instantiation failed: {str(e)[:120]}")
