"""Debug why class 1 physics, class 4 chem, class 11 physics fail now."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_selector import QuestionSelector
import asyncio

reg = SolverRegistry()
reg.initialize()

# Check what matches for class 1 physics
subject = "physics"
grade = 1
aliases = ["physics", "phy"]
grade_str = str(grade)

qgen_modules = {}
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qgen_modules[qt] = name

qgen_types = reg.list_question_gen_types()

subject_grade_match = []
subject_match = []
for qt in qgen_types:
    qt_lower = qt.lower()
    module_name = qgen_modules.get(qt, "").lower()
    matches_subject = any(a in qt_lower or a in module_name for a in aliases)
    matches_grade = grade_str in qt_lower or grade_str in module_name
    if matches_subject and matches_grade:
        subject_grade_match.append(qt)
    elif matches_subject:
        subject_match.append(qt)

print(f"=== Class 1 Physics ===")
print(f"Subject+grade: {len(subject_grade_match)}")
for qt in subject_grade_match:
    fn = reg.get_question_gen(qt)
    is_fn = callable(fn) and not isinstance(fn, type)
    print(f"  {qt} ({'function' if is_fn else 'class'})")

# Check priority sort
class MockSelector:
    def __init__(self):
        self._registry = reg
selector = MockSelector()

def gen_priority(qt):
    fn = reg.get_question_gen(qt)
    if fn is None: return 99
    is_function = callable(fn) and not isinstance(fn, type)
    has_generate = 'generate' in qt.lower()
    if is_function and has_generate: return 0
    if is_function: return 1
    return 2

matching = subject_grade_match + [s for s in subject_match if s not in subject_grade_match]
matching.sort(key=gen_priority)
print(f"\nSorted matching (first 10):")
for qt in matching[:10]:
    fn = reg.get_question_gen(qt)
    is_fn = callable(fn) and not isinstance(fn, type)
    print(f"  priority={gen_priority(qt)} {qt} ({'function' if is_fn else 'class'})")

# Try generating from first few
print(f"\nTrying to generate:")
for qt in matching[:5]:
    fn = reg.get_question_gen(qt)
    print(f"\n  {qt}:")
    if callable(fn) and not isinstance(fn, type):
        try:
            sig = inspect.signature(fn)
            params = list(sig.parameters.keys())
            kwargs = {}
            for p in params:
                if p == 'seed': kwargs[p] = 42
                elif p in ('n', 'count', 'num_questions'): kwargs[p] = 3
                elif p == 'difficulty': kwargs[p] = 'Medium'
                elif p in ('node_id', 'node'): kwargs[p] = 'test'
                elif p == 'qtype': kwargs[p] = None
                elif p == 'mix': kwargs[p] = None
            result = fn(**kwargs) if kwargs else fn()
            print(f"    Result: {type(result).__name__}")
            if isinstance(result, list):
                print(f"    List of {len(result)}")
                if result:
                    q = result[0]
                    if isinstance(q, dict):
                        if 'questions' in q:
                            print(f"    Container with {len(q['questions'])} questions")
                            if q['questions']:
                                inner = q['questions'][0]
                                print(f"    Q1: {inner.get('question_text', 'N/A')[:100]}")
                        else:
                            print(f"    Q1: {q.get('question_text', q.get('stem', q.get('question', 'N/A')))[:100]}")
            elif hasattr(result, 'questions'):
                print(f"    QuestionSet with {len(result.questions)} questions")
        except Exception as e:
            print(f"    Failed: {str(e)[:100]}")
    elif isinstance(fn, type):
        try:
            instance = fn()
            methods = [m for m in dir(instance) if not m.startswith('_') and callable(getattr(instance, m, None))]
            print(f"    Class methods: {methods[:8]}")
        except Exception as e:
            print(f"    Instantiation failed: {str(e)[:80]}")
