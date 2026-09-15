"""Debug the matching and generation for failing subjects."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Check what matches for class 3 EVS
subject = "evs"
grade = 3
topic = "environment"

subject_aliases = {
    "evs": ["evs"],
}
aliases = subject_aliases.get(subject.lower(), [subject.lower()])
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
        subject_grade_match.append((qt, qgen_modules.get(qt, "")))
    elif matches_subject:
        subject_match.append((qt, qgen_modules.get(qt, "")))

print(f"=== Class 3 EVS matching ===")
print(f"Subject+grade matches: {len(subject_grade_match)}")
for qt, mod in subject_grade_match:
    print(f"  {qt} (module: {mod})")

print(f"Subject matches: {len(subject_match)}")
for qt, mod in subject_match[:10]:
    print(f"  {qt} (module: {mod})")

# Now try to actually generate from these
print(f"\n=== Trying to generate from matches ===")
for qt, mod in (subject_grade_match + subject_match)[:5]:
    print(f"\n--- {qt} ---")
    fn = reg.get_question_gen(qt)
    if fn is None:
        print(f"  NOT FOUND")
        continue
    print(f"  Type: {type(fn).__name__}, is_class={isinstance(fn, type)}")

    # If it's a class, instantiate
    if isinstance(fn, type):
        try:
            instance = fn()
            print(f"  Instance: {type(instance).__name__}")
        except Exception as e:
            print(f"  Instantiation failed: {e}")
            continue
    else:
        instance = fn

    # List ALL methods
    methods = [m for m in dir(instance) if not m.startswith('_') and callable(getattr(instance, m, None))]
    print(f"  All methods: {methods}")

    # Try generate with no args first
    for method_name in ['generate', 'generate_questions', 'generate_question',
                        'generate_paper', 'generate_quiz', 'generate_worksheet',
                        'generate_full_set', 'generate_all', 'generate_set',
                        'generate_batch', 'build_question_bank',
                        'generate_c3_evs_001', 'generate_c3_evs_002',
                        'generate_c3_evs_003', 'generate_c3_evs_004']:
        if not hasattr(instance, method_name):
            continue
        method = getattr(instance, method_name)
        try:
            sig = inspect.signature(method)
            params = list(sig.parameters.keys())
            print(f"  Trying {method_name}({params})")

            # Try with no args first (besides self)
            non_self = [p for p in params if p != 'self']
            if not non_self:
                result = method()
                print(f"  No-arg call: {type(result).__name__} = {str(result)[:150]}")
                continue

            # Try with seed
            kwargs = {}
            for p in non_self:
                if p == 'seed': kwargs[p] = 42
                elif p in ('n', 'count', 'num_questions'): kwargs[p] = 3
                elif p == 'difficulty': kwargs[p] = 'Medium'
                elif p in ('node_id', 'node'): kwargs[p] = 'test'
                elif p == 'qtype': kwargs[p] = None
                elif p == 'mix': kwargs[p] = None
                else: kwargs[p] = None

            result = method(**kwargs)
            if isinstance(result, list):
                print(f"  Got list of {len(result)}")
                if result:
                    first = result[0]
                    if isinstance(first, dict):
                        print(f"  First: {str(first.get('question_text', first.get('text', first.get('question', ''))))[:120]}")
                    elif hasattr(first, 'question_text'):
                        print(f"  First: {first.question_text[:120]}")
                    else:
                        print(f"  First: {str(first)[:120]}")
            elif isinstance(result, dict):
                print(f"  Got dict: {list(result.keys())[:10]}")
            else:
                print(f"  Got {type(result).__name__}: {str(result)[:150]}")
            break
        except Exception as e:
            print(f"  {method_name} failed: {str(e)[:120]}")
