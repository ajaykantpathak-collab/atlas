"""Debug why specific generators fail to produce questions."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Test specific generators that should work but don't
tests = [
    ("class3_evs_questions", "EVSClass3QuestionGenerator"),
    ("class1_physics_questions", "q_0"),
    ("class4_chem_questions", "Node1QuestionGenerator"),
    ("class11_physics_questions", "c11_phy_001"),
]

for module_name, qtype in tests:
    print(f"\n=== {module_name} / {qtype} ===")
    fn = reg.get_question_gen(qtype)
    if fn is None:
        print(f"  NOT FOUND in registry")
        # List what IS in this module
        entry = reg._question_gens.get(module_name)
        if entry:
            print(f"  Module has types: {list(entry.registry.keys())}")
        continue

    print(f"  Type: {type(fn).__name__}, is_class={isinstance(fn, type)}")

    # Instantiate
    try:
        instance = fn() if isinstance(fn, type) else fn
        print(f"  Instance: {type(instance).__name__}")
    except Exception as e:
        print(f"  Instantiation FAILED: {e}")
        continue

    # List methods
    methods = [m for m in dir(instance) if not m.startswith('_') and callable(getattr(instance, m, None))]
    print(f"  Methods: {methods[:15]}")

    # Try each generate method
    for method_name in ['generate', 'generate_questions', 'generate_question',
                        'get_questions', 'get_question', 'create_question',
                        'generate_paper', 'generate_quiz', 'generate_worksheet',
                        'generate_full_set', 'generate_all']:
        if not hasattr(instance, method_name):
            continue
        method = getattr(instance, method_name)
        try:
            sig = inspect.signature(method)
            params = list(sig.parameters.keys())
            print(f"  {method_name}({params})")

            # Try calling with various args
            kwargs = {}
            for p in params:
                if p == 'self': continue
                elif p in ('node_id', 'node'): kwargs[p] = 'test_node'
                elif p == 'seed': kwargs[p] = 42
                elif p in ('n', 'count', 'num_questions'): kwargs[p] = 3
                elif p == 'difficulty': kwargs[p] = 'Medium'
                elif p == 'qtype': kwargs[p] = None
                elif p == 'mix': kwargs[p] = None

            result = method(**kwargs)
            if isinstance(result, list) and result:
                print(f"  SUCCESS: {len(result)} questions")
                q = result[0]
                if isinstance(q, dict):
                    print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', ''))))[:120]}")
                elif hasattr(q, 'question_text'):
                    print(f"  Q1: {q.question_text[:120]}")
                else:
                    print(f"  Q1: {str(q)[:120]}")
                break
            elif isinstance(result, dict):
                print(f"  SUCCESS: 1 question")
                print(f"  Q: {str(result.get('question_text', result.get('text', '')))[:120]}")
                break
            else:
                print(f"  Result type: {type(result).__name__}, value: {str(result)[:100]}")
        except Exception as e:
            print(f"  {method_name} failed: {str(e)[:100]}")

# Special case: class1_physics q_0 etc are functions not classes
print(f"\n=== class1_physics q_0 (function?) ===")
fn = reg.get_question_gen("q_0")
if fn:
    print(f"  Type: {type(fn).__name__}, callable={callable(fn)}")
    if callable(fn) and not isinstance(fn, type):
        try:
            result = fn()
            print(f"  Direct call: {str(result)[:200]}")
        except Exception as e:
            print(f"  Direct call failed: {e}")
        # Try with seed
        try:
            result = fn(seed=42)
            print(f"  With seed: {str(result)[:200]}")
        except Exception as e:
            print(f"  With seed failed: {e}")
